/*!
 * Inspire Tree v1.12.4
 * https://github.com/helion3/inspire-tree
 * 
 * Copyright 2015 Helion3, and other contributors
 * Licensed under MIT. https://github.com/helion3/inspire-tree/blob/master/LICENSE
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["InspireTree"] = factory();
	else
		root["InspireTree"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 232);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
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
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isFunction = __webpack_require__(5),
    isLength = __webpack_require__(95);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
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
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var baseMatches = __webpack_require__(138),
    baseMatchesProperty = __webpack_require__(139),
    identity = __webpack_require__(34),
    isArray = __webpack_require__(0),
    property = __webpack_require__(202);

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
    return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(193);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGetTag = __webpack_require__(12),
    isObject = __webpack_require__(1);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
    if (!isObject(value)) {
        return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assignValue = __webpack_require__(28),
    baseAssignValue = __webpack_require__(47);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isSymbol = __webpack_require__(15);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

module.exports = toKey;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
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
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

module.exports = isObjectLike;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var overArg = __webpack_require__(32);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = isWidget;

function isWidget(w) {
    return w && w.type === "Widget";
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var identity = __webpack_require__(34),
    overRest = __webpack_require__(183),
    setToString = __webpack_require__(184);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = __webpack_require__(0),
    isKey = __webpack_require__(55),
    stringToPath = __webpack_require__(185),
    toString = __webpack_require__(58);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toFinite = __webpack_require__(206);

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? remainder ? result - remainder : result : 0;
}

module.exports = toInteger;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var freeGlobal = __webpack_require__(85);

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var version = __webpack_require__(20);

module.exports = isVirtualNode;

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version;
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "2";

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.0
 */

(function (global, factory) {
  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.ES6Promise = factory();
})(undefined, function () {
  'use strict';

  function objectOrFunction(x) {
    return typeof x === 'function' || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
  }

  function isFunction(x) {
    return typeof x === 'function';
  }

  var _isArray = undefined;
  if (!Array.isArray) {
    _isArray = function _isArray(x) {
      return Object.prototype.toString.call(x) === '[object Array]';
    };
  } else {
    _isArray = Array.isArray;
  }

  var isArray = _isArray;

  var len = 0;
  var vertxNext = undefined;
  var customSchedulerFn = undefined;

  var asap = function asap(callback, arg) {
    queue[len] = callback;
    queue[len + 1] = arg;
    len += 2;
    if (len === 2) {
      // If len is 2, that means that we need to schedule an async flush.
      // If additional callbacks are queued before the queue is flushed, they
      // will be processed by this flush that we are scheduling.
      if (customSchedulerFn) {
        customSchedulerFn(flush);
      } else {
        scheduleFlush();
      }
    }
  };

  function setScheduler(scheduleFn) {
    customSchedulerFn = scheduleFn;
  }

  function setAsap(asapFn) {
    asap = asapFn;
  }

  var browserWindow = typeof window !== 'undefined' ? window : undefined;
  var browserGlobal = browserWindow || {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

  // test for web worker but not in IE10
  var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

  // node
  function useNextTick() {
    // node version 0.10.x displays a deprecation warning when nextTick is used recursively
    // see https://github.com/cujojs/when/issues/410 for details
    return function () {
      return process.nextTick(flush);
    };
  }

  // vertx
  function useVertxTimer() {
    if (typeof vertxNext !== 'undefined') {
      return function () {
        vertxNext(flush);
      };
    }

    return useSetTimeout();
  }

  function useMutationObserver() {
    var iterations = 0;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, { characterData: true });

    return function () {
      node.data = iterations = ++iterations % 2;
    };
  }

  // web worker
  function useMessageChannel() {
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    return function () {
      return channel.port2.postMessage(0);
    };
  }

  function useSetTimeout() {
    // Store setTimeout reference so es6-promise will be unaffected by
    // other code modifying setTimeout (like sinon.useFakeTimers())
    var globalSetTimeout = setTimeout;
    return function () {
      return globalSetTimeout(flush, 1);
    };
  }

  var queue = new Array(1000);
  function flush() {
    for (var i = 0; i < len; i += 2) {
      var callback = queue[i];
      var arg = queue[i + 1];

      callback(arg);

      queue[i] = undefined;
      queue[i + 1] = undefined;
    }

    len = 0;
  }

  function attemptVertx() {
    try {
      var r = require;
      var vertx = __webpack_require__(233);
      vertxNext = vertx.runOnLoop || vertx.runOnContext;
      return useVertxTimer();
    } catch (e) {
      return useSetTimeout();
    }
  }

  var scheduleFlush = undefined;
  // Decide what async method to use to triggering processing of queued callbacks:
  if (isNode) {
    scheduleFlush = useNextTick();
  } else if (BrowserMutationObserver) {
    scheduleFlush = useMutationObserver();
  } else if (isWorker) {
    scheduleFlush = useMessageChannel();
  } else if (browserWindow === undefined && "function" === 'function') {
    scheduleFlush = attemptVertx();
  } else {
    scheduleFlush = useSetTimeout();
  }

  function then(onFulfillment, onRejection) {
    var _arguments = arguments;

    var parent = this;

    var child = new this.constructor(noop);

    if (child[PROMISE_ID] === undefined) {
      makePromise(child);
    }

    var _state = parent._state;

    if (_state) {
      (function () {
        var callback = _arguments[_state - 1];
        asap(function () {
          return invokeCallback(_state, child, callback, parent._result);
        });
      })();
    } else {
      subscribe(parent, child, onFulfillment, onRejection);
    }

    return child;
  }

  /**
    `Promise.resolve` returns a promise that will become resolved with the
    passed `value`. It is shorthand for the following:
  
    ```javascript
    let promise = new Promise(function(resolve, reject){
      resolve(1);
    });
  
    promise.then(function(value){
      // value === 1
    });
    ```
  
    Instead of writing the above, your code now simply becomes the following:
  
    ```javascript
    let promise = Promise.resolve(1);
  
    promise.then(function(value){
      // value === 1
    });
    ```
  
    @method resolve
    @static
    @param {Any} value value that the returned promise will be resolved with
    Useful for tooling.
    @return {Promise} a promise that will become fulfilled with the given
    `value`
  */
  function resolve(object) {
    /*jshint validthis:true */
    var Constructor = this;

    if (object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.constructor === Constructor) {
      return object;
    }

    var promise = new Constructor(noop);
    _resolve(promise, object);
    return promise;
  }

  var PROMISE_ID = Math.random().toString(36).substring(16);

  function noop() {}

  var PENDING = void 0;
  var FULFILLED = 1;
  var REJECTED = 2;

  var GET_THEN_ERROR = new ErrorObject();

  function selfFulfillment() {
    return new TypeError("You cannot resolve a promise with itself");
  }

  function cannotReturnOwn() {
    return new TypeError('A promises callback cannot return that same promise.');
  }

  function getThen(promise) {
    try {
      return promise.then;
    } catch (error) {
      GET_THEN_ERROR.error = error;
      return GET_THEN_ERROR;
    }
  }

  function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
    try {
      then.call(value, fulfillmentHandler, rejectionHandler);
    } catch (e) {
      return e;
    }
  }

  function handleForeignThenable(promise, thenable, then) {
    asap(function (promise) {
      var sealed = false;
      var error = tryThen(then, thenable, function (value) {
        if (sealed) {
          return;
        }
        sealed = true;
        if (thenable !== value) {
          _resolve(promise, value);
        } else {
          fulfill(promise, value);
        }
      }, function (reason) {
        if (sealed) {
          return;
        }
        sealed = true;

        _reject(promise, reason);
      }, 'Settle: ' + (promise._label || ' unknown promise'));

      if (!sealed && error) {
        sealed = true;
        _reject(promise, error);
      }
    }, promise);
  }

  function handleOwnThenable(promise, thenable) {
    if (thenable._state === FULFILLED) {
      fulfill(promise, thenable._result);
    } else if (thenable._state === REJECTED) {
      _reject(promise, thenable._result);
    } else {
      subscribe(thenable, undefined, function (value) {
        return _resolve(promise, value);
      }, function (reason) {
        return _reject(promise, reason);
      });
    }
  }

  function handleMaybeThenable(promise, maybeThenable, then$$) {
    if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
      handleOwnThenable(promise, maybeThenable);
    } else {
      if (then$$ === GET_THEN_ERROR) {
        _reject(promise, GET_THEN_ERROR.error);
        GET_THEN_ERROR.error = null;
      } else if (then$$ === undefined) {
        fulfill(promise, maybeThenable);
      } else if (isFunction(then$$)) {
        handleForeignThenable(promise, maybeThenable, then$$);
      } else {
        fulfill(promise, maybeThenable);
      }
    }
  }

  function _resolve(promise, value) {
    if (promise === value) {
      _reject(promise, selfFulfillment());
    } else if (objectOrFunction(value)) {
      handleMaybeThenable(promise, value, getThen(value));
    } else {
      fulfill(promise, value);
    }
  }

  function publishRejection(promise) {
    if (promise._onerror) {
      promise._onerror(promise._result);
    }

    publish(promise);
  }

  function fulfill(promise, value) {
    if (promise._state !== PENDING) {
      return;
    }

    promise._result = value;
    promise._state = FULFILLED;

    if (promise._subscribers.length !== 0) {
      asap(publish, promise);
    }
  }

  function _reject(promise, reason) {
    if (promise._state !== PENDING) {
      return;
    }
    promise._state = REJECTED;
    promise._result = reason;

    asap(publishRejection, promise);
  }

  function subscribe(parent, child, onFulfillment, onRejection) {
    var _subscribers = parent._subscribers;
    var length = _subscribers.length;

    parent._onerror = null;

    _subscribers[length] = child;
    _subscribers[length + FULFILLED] = onFulfillment;
    _subscribers[length + REJECTED] = onRejection;

    if (length === 0 && parent._state) {
      asap(publish, parent);
    }
  }

  function publish(promise) {
    var subscribers = promise._subscribers;
    var settled = promise._state;

    if (subscribers.length === 0) {
      return;
    }

    var child = undefined,
        callback = undefined,
        detail = promise._result;

    for (var i = 0; i < subscribers.length; i += 3) {
      child = subscribers[i];
      callback = subscribers[i + settled];

      if (child) {
        invokeCallback(settled, child, callback, detail);
      } else {
        callback(detail);
      }
    }

    promise._subscribers.length = 0;
  }

  function ErrorObject() {
    this.error = null;
  }

  var TRY_CATCH_ERROR = new ErrorObject();

  function tryCatch(callback, detail) {
    try {
      return callback(detail);
    } catch (e) {
      TRY_CATCH_ERROR.error = e;
      return TRY_CATCH_ERROR;
    }
  }

  function invokeCallback(settled, promise, callback, detail) {
    var hasCallback = isFunction(callback),
        value = undefined,
        error = undefined,
        succeeded = undefined,
        failed = undefined;

    if (hasCallback) {
      value = tryCatch(callback, detail);

      if (value === TRY_CATCH_ERROR) {
        failed = true;
        error = value.error;
        value.error = null;
      } else {
        succeeded = true;
      }

      if (promise === value) {
        _reject(promise, cannotReturnOwn());
        return;
      }
    } else {
      value = detail;
      succeeded = true;
    }

    if (promise._state !== PENDING) {
      // noop
    } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
  }

  function initializePromise(promise, resolver) {
    try {
      resolver(function resolvePromise(value) {
        _resolve(promise, value);
      }, function rejectPromise(reason) {
        _reject(promise, reason);
      });
    } catch (e) {
      _reject(promise, e);
    }
  }

  var id = 0;
  function nextId() {
    return id++;
  }

  function makePromise(promise) {
    promise[PROMISE_ID] = id++;
    promise._state = undefined;
    promise._result = undefined;
    promise._subscribers = [];
  }

  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this._input = input;
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate();
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      _reject(this.promise, validationError());
    }
  }

  function validationError() {
    return new Error('Array Methods must be provided an Array');
  };

  Enumerator.prototype._enumerate = function () {
    var length = this.length;
    var _input = this._input;

    for (var i = 0; this._state === PENDING && i < length; i++) {
      this._eachEntry(_input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function (entry, i) {
    var c = this._instanceConstructor;
    var resolve$$ = c.resolve;

    if (resolve$$ === resolve) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$) {
          return resolve$$(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function (state, i, value) {
    var promise = this.promise;

    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        _reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function (promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  /**
    `Promise.all` accepts an array of promises, and returns a new promise which
    is fulfilled with an array of fulfillment values for the passed promises, or
    rejected with the reason of the first passed promise to be rejected. It casts all
    elements of the passed iterable to promises as it runs this algorithm.
  
    Example:
  
    ```javascript
    let promise1 = resolve(1);
    let promise2 = resolve(2);
    let promise3 = resolve(3);
    let promises = [ promise1, promise2, promise3 ];
  
    Promise.all(promises).then(function(array){
      // The array here would be [ 1, 2, 3 ];
    });
    ```
  
    If any of the `promises` given to `all` are rejected, the first promise
    that is rejected will be given as an argument to the returned promises's
    rejection handler. For example:
  
    Example:
  
    ```javascript
    let promise1 = resolve(1);
    let promise2 = reject(new Error("2"));
    let promise3 = reject(new Error("3"));
    let promises = [ promise1, promise2, promise3 ];
  
    Promise.all(promises).then(function(array){
      // Code here never runs because there are rejected promises!
    }, function(error) {
      // error.message === "2"
    });
    ```
  
    @method all
    @static
    @param {Array} entries array of promises
    @param {String} label optional string for labeling the promise.
    Useful for tooling.
    @return {Promise} promise that is fulfilled when all `promises` have been
    fulfilled, or rejected if any of them become rejected.
    @static
  */
  function all(entries) {
    return new Enumerator(this, entries).promise;
  }

  /**
    `Promise.race` returns a new promise which is settled in the same way as the
    first passed promise to settle.
  
    Example:
  
    ```javascript
    let promise1 = new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve('promise 1');
      }, 200);
    });
  
    let promise2 = new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve('promise 2');
      }, 100);
    });
  
    Promise.race([promise1, promise2]).then(function(result){
      // result === 'promise 2' because it was resolved before promise1
      // was resolved.
    });
    ```
  
    `Promise.race` is deterministic in that only the state of the first
    settled promise matters. For example, even if other promises given to the
    `promises` array argument are resolved, but the first settled promise has
    become rejected before the other promises became fulfilled, the returned
    promise will become rejected:
  
    ```javascript
    let promise1 = new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve('promise 1');
      }, 200);
    });
  
    let promise2 = new Promise(function(resolve, reject){
      setTimeout(function(){
        reject(new Error('promise 2'));
      }, 100);
    });
  
    Promise.race([promise1, promise2]).then(function(result){
      // Code here never runs
    }, function(reason){
      // reason.message === 'promise 2' because promise 2 became rejected before
      // promise 1 became fulfilled
    });
    ```
  
    An example real-world use case is implementing timeouts:
  
    ```javascript
    Promise.race([ajax('foo.json'), timeout(5000)])
    ```
  
    @method race
    @static
    @param {Array} promises array of promises to observe
    Useful for tooling.
    @return {Promise} a promise which settles in the same way as the first passed
    promise to settle.
  */
  function race(entries) {
    /*jshint validthis:true */
    var Constructor = this;

    if (!isArray(entries)) {
      return new Constructor(function (_, reject) {
        return reject(new TypeError('You must pass an array to race.'));
      });
    } else {
      return new Constructor(function (resolve, reject) {
        var length = entries.length;
        for (var i = 0; i < length; i++) {
          Constructor.resolve(entries[i]).then(resolve, reject);
        }
      });
    }
  }

  /**
    `Promise.reject` returns a promise rejected with the passed `reason`.
    It is shorthand for the following:
  
    ```javascript
    let promise = new Promise(function(resolve, reject){
      reject(new Error('WHOOPS'));
    });
  
    promise.then(function(value){
      // Code here doesn't run because the promise is rejected!
    }, function(reason){
      // reason.message === 'WHOOPS'
    });
    ```
  
    Instead of writing the above, your code now simply becomes the following:
  
    ```javascript
    let promise = Promise.reject(new Error('WHOOPS'));
  
    promise.then(function(value){
      // Code here doesn't run because the promise is rejected!
    }, function(reason){
      // reason.message === 'WHOOPS'
    });
    ```
  
    @method reject
    @static
    @param {Any} reason value that the returned promise will be rejected with.
    Useful for tooling.
    @return {Promise} a promise rejected with the given `reason`.
  */
  function reject(reason) {
    /*jshint validthis:true */
    var Constructor = this;
    var promise = new Constructor(noop);
    _reject(promise, reason);
    return promise;
  }

  function needsResolver() {
    throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
  }

  function needsNew() {
    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
  }

  /**
    Promise objects represent the eventual result of an asynchronous operation. The
    primary way of interacting with a promise is through its `then` method, which
    registers callbacks to receive either a promise's eventual value or the reason
    why the promise cannot be fulfilled.
  
    Terminology
    -----------
  
    - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
    - `thenable` is an object or function that defines a `then` method.
    - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
    - `exception` is a value that is thrown using the throw statement.
    - `reason` is a value that indicates why a promise was rejected.
    - `settled` the final resting state of a promise, fulfilled or rejected.
  
    A promise can be in one of three states: pending, fulfilled, or rejected.
  
    Promises that are fulfilled have a fulfillment value and are in the fulfilled
    state.  Promises that are rejected have a rejection reason and are in the
    rejected state.  A fulfillment value is never a thenable.
  
    Promises can also be said to *resolve* a value.  If this value is also a
    promise, then the original promise's settled state will match the value's
    settled state.  So a promise that *resolves* a promise that rejects will
    itself reject, and a promise that *resolves* a promise that fulfills will
    itself fulfill.
  
  
    Basic Usage:
    ------------
  
    ```js
    let promise = new Promise(function(resolve, reject) {
      // on success
      resolve(value);
  
      // on failure
      reject(reason);
    });
  
    promise.then(function(value) {
      // on fulfillment
    }, function(reason) {
      // on rejection
    });
    ```
  
    Advanced Usage:
    ---------------
  
    Promises shine when abstracting away asynchronous interactions such as
    `XMLHttpRequest`s.
  
    ```js
    function getJSON(url) {
      return new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
  
        xhr.open('GET', url);
        xhr.onreadystatechange = handler;
        xhr.responseType = 'json';
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send();
  
        function handler() {
          if (this.readyState === this.DONE) {
            if (this.status === 200) {
              resolve(this.response);
            } else {
              reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
            }
          }
        };
      });
    }
  
    getJSON('/posts.json').then(function(json) {
      // on fulfillment
    }, function(reason) {
      // on rejection
    });
    ```
  
    Unlike callbacks, promises are great composable primitives.
  
    ```js
    Promise.all([
      getJSON('/posts'),
      getJSON('/comments')
    ]).then(function(values){
      values[0] // => postsJSON
      values[1] // => commentsJSON
  
      return values;
    });
    ```
  
    @class Promise
    @param {function} resolver
    Useful for tooling.
    @constructor
  */
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  Promise.all = all;
  Promise.race = race;
  Promise.resolve = resolve;
  Promise.reject = reject;
  Promise._setScheduler = setScheduler;
  Promise._setAsap = setAsap;
  Promise._asap = asap;

  Promise.prototype = {
    constructor: Promise,

    /**
      The primary way of interacting with a promise is through its `then` method,
      which registers callbacks to receive either a promise's eventual value or the
      reason why the promise cannot be fulfilled.
    
      ```js
      findUser().then(function(user){
        // user is available
      }, function(reason){
        // user is unavailable, and you are given the reason why
      });
      ```
    
      Chaining
      --------
    
      The return value of `then` is itself a promise.  This second, 'downstream'
      promise is resolved with the return value of the first promise's fulfillment
      or rejection handler, or rejected if the handler throws an exception.
    
      ```js
      findUser().then(function (user) {
        return user.name;
      }, function (reason) {
        return 'default name';
      }).then(function (userName) {
        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
        // will be `'default name'`
      });
    
      findUser().then(function (user) {
        throw new Error('Found user, but still unhappy');
      }, function (reason) {
        throw new Error('`findUser` rejected and we're unhappy');
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
      });
      ```
      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
    
      ```js
      findUser().then(function (user) {
        throw new PedagogicalException('Upstream error');
      }).then(function (value) {
        // never reached
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // The `PedgagocialException` is propagated all the way down to here
      });
      ```
    
      Assimilation
      ------------
    
      Sometimes the value you want to propagate to a downstream promise can only be
      retrieved asynchronously. This can be achieved by returning a promise in the
      fulfillment or rejection handler. The downstream promise will then be pending
      until the returned promise is settled. This is called *assimilation*.
    
      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // The user's comments are now available
      });
      ```
    
      If the assimliated promise rejects, then the downstream promise will also reject.
    
      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // If `findCommentsByAuthor` fulfills, we'll have the value here
      }, function (reason) {
        // If `findCommentsByAuthor` rejects, we'll have the reason here
      });
      ```
    
      Simple Example
      --------------
    
      Synchronous Example
    
      ```javascript
      let result;
    
      try {
        result = findResult();
        // success
      } catch(reason) {
        // failure
      }
      ```
    
      Errback Example
    
      ```js
      findResult(function(result, err){
        if (err) {
          // failure
        } else {
          // success
        }
      });
      ```
    
      Promise Example;
    
      ```javascript
      findResult().then(function(result){
        // success
      }, function(reason){
        // failure
      });
      ```
    
      Advanced Example
      --------------
    
      Synchronous Example
    
      ```javascript
      let author, books;
    
      try {
        author = findAuthor();
        books  = findBooksByAuthor(author);
        // success
      } catch(reason) {
        // failure
      }
      ```
    
      Errback Example
    
      ```js
    
      function foundBooks(books) {
    
      }
    
      function failure(reason) {
    
      }
    
      findAuthor(function(author, err){
        if (err) {
          failure(err);
          // failure
        } else {
          try {
            findBoooksByAuthor(author, function(books, err) {
              if (err) {
                failure(err);
              } else {
                try {
                  foundBooks(books);
                } catch(reason) {
                  failure(reason);
                }
              }
            });
          } catch(error) {
            failure(err);
          }
          // success
        }
      });
      ```
    
      Promise Example;
    
      ```javascript
      findAuthor().
        then(findBooksByAuthor).
        then(function(books){
          // found books
      }).catch(function(reason){
        // something went wrong
      });
      ```
    
      @method then
      @param {Function} onFulfilled
      @param {Function} onRejected
      Useful for tooling.
      @return {Promise}
    */
    then: then,

    /**
      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
      as the catch block of a try/catch statement.
    
      ```js
      function findAuthor(){
        throw new Error('couldn't find that author');
      }
    
      // synchronous
      try {
        findAuthor();
      } catch(reason) {
        // something went wrong
      }
    
      // async with promises
      findAuthor().catch(function(reason){
        // something went wrong
      });
      ```
    
      @method catch
      @param {Function} onRejection
      Useful for tooling.
      @return {Promise}
    */
    'catch': function _catch(onRejection) {
      return this.then(null, onRejection);
    }
  };

  function polyfill() {
    var local = undefined;

    if (typeof global !== 'undefined') {
      local = global;
    } else if (typeof self !== 'undefined') {
      local = self;
    } else {
      try {
        local = Function('return this')();
      } catch (e) {
        throw new Error('polyfill failed because global object is unavailable in this environment');
      }
    }

    var P = local.Promise;

    if (P) {
      var promiseToString = null;
      try {
        promiseToString = Object.prototype.toString.call(P.resolve());
      } catch (e) {
        // silently ignored
      }

      if (promiseToString === '[object Promise]' && !P.cast) {
        return;
      }
    }

    local.Promise = Promise;
  }

  // Strange compat..
  Promise.polyfill = polyfill;
  Promise.Promise = Promise;

  return Promise;
});
//# sourceMappingURL=es6-promise.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(209), __webpack_require__(21)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGetTag = __webpack_require__(12),
    isArray = __webpack_require__(0),
    isObjectLike = __webpack_require__(8);

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
    return typeof value == 'string' || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
}

module.exports = isString;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Libs

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeNode = undefined;

var _slice2 = __webpack_require__(97);

var _slice3 = _interopRequireDefault(_slice2);

var _findIndex2 = __webpack_require__(93);

var _findIndex3 = _interopRequireDefault(_findIndex2);

var _find2 = __webpack_require__(92);

var _find3 = _interopRequireDefault(_find2);

var _parseInt2 = __webpack_require__(64);

var _parseInt3 = _interopRequireDefault(_parseInt2);

var _findLast2 = __webpack_require__(191);

var _findLast3 = _interopRequireDefault(_findLast2);

var _indexOf2 = __webpack_require__(195);

var _indexOf3 = _interopRequireDefault(_indexOf2);

var _isFunction2 = __webpack_require__(5);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isArrayLike2 = __webpack_require__(2);

var _isArrayLike3 = _interopRequireDefault(_isArrayLike2);

var _isArray2 = __webpack_require__(0);

var _isArray3 = _interopRequireDefault(_isArray2);

var _isObject2 = __webpack_require__(1);

var _isObject3 = _interopRequireDefault(_isObject2);

var _cloneDeep2 = __webpack_require__(189);

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

var _includes2 = __webpack_require__(61);

var _includes3 = _interopRequireDefault(_includes2);

var _each2 = __webpack_require__(4);

var _each3 = _interopRequireDefault(_each2);

var _castArray2 = __webpack_require__(41);

var _castArray3 = _interopRequireDefault(_castArray2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseStateChange = __webpack_require__(231);

var _collectionToModel = __webpack_require__(45);

var _objectToNode = __webpack_require__(60);

var _es6Promise = __webpack_require__(22);

var _recurseDown2 = __webpack_require__(108);

var _standardizePromise = __webpack_require__(66);

var _treenodes = __webpack_require__(25);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Helper method to clone an ITree config object.
 *
 * Rejects non-clonable properties like ref.
 *
 * @private
 * @param {object} itree ITree configuration object
 * @param {array} excludeKeys Keys to exclude, if any
 * @return {object} Cloned ITree.
 */
function cloneItree(itree, excludeKeys) {
    var clone = {};
    excludeKeys = (0, _castArray3.default)(excludeKeys);
    excludeKeys.push('ref');

    (0, _each3.default)(itree, function (v, k) {
        if (!(0, _includes3.default)(excludeKeys, k)) {
            clone[k] = (0, _cloneDeep3.default)(v);
        }
    });

    return clone;
}

/**
 * Represents a singe node object within the tree.
 *
 * @category TreeNode
 * @param {TreeNode} source TreeNode to copy.
 * @return {TreeNode} Tree node object.
 */

var TreeNode = exports.TreeNode = function () {
    function TreeNode(tree, source, excludeKeys) {
        _classCallCheck(this, TreeNode);

        var node = this;
        node._tree = tree;

        if (source instanceof TreeNode) {
            excludeKeys = (0, _castArray3.default)(excludeKeys);
            excludeKeys.push('_tree');

            // Iterate manually for better perf
            (0, _each3.default)(source, function (value, key) {
                // Skip vars
                if (!(0, _includes3.default)(excludeKeys, key)) {
                    if ((0, _isObject3.default)(value)) {
                        if (value instanceof _treenodes.TreeNodes) {
                            node[key] = value.clone();
                        } else if (key === 'itree') {
                            node[key] = cloneItree(value);
                        } else {
                            node[key] = (0, _cloneDeep3.default)(value);
                        }
                    } else {
                        // Copy primitives
                        node[key] = value;
                    }
                }
            });
        }
    }

    /**
     * Add a child to this node.
     *
     * @category TreeNode
     * @param {object} child Node object.
     * @return {TreeNode} Node object.
     */


    _createClass(TreeNode, [{
        key: 'addChild',
        value: function addChild(child) {
            if ((0, _isArray3.default)(this.children) || !(0, _isArrayLike3.default)(this.children)) {
                this.children = new _treenodes.TreeNodes(this._tree);
                this.children._context = this;
            }

            return this.children.addNode(child);
        }

        /**
         * Add multiple children to this node.
         *
         * @category TreeNode
         * @param {object} children Array of nodes.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'addChildren',
        value: function addChildren(children) {
            var _this = this;

            var nodes = new _treenodes.TreeNodes();

            this._tree.dom.batch();
            (0, _each3.default)(children, function (child) {
                nodes.push(_this.addChild(child));
            });
            this._tree.dom.end();

            return nodes;
        }

        /**
         * Get if node available.
         *
         * @category TreeNode
         * @return {boolean} If available.
         */

    }, {
        key: 'available',
        value: function available() {
            return !this.hidden() && !this.removed();
        }

        /**
         * Blur focus from this node.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'blur',
        value: function blur() {
            this.state('editing', false);

            return (0, _baseStateChange.baseStateChange)('focused', false, 'blurred', this);
        }
    }, {
        key: 'check',


        /**
         * Marks this node as checked.
         *
         * @category TreeNode
         * @param {boolean} shallow Skip auto-checking children.
         * @return {TreeNode} Node object.
         */
        value: function check(shallow) {
            this._tree.dom.batch();

            // Will we automatically apply state changes to our children
            var deep = !shallow && this._tree.config.checkbox.autoCheckChildren;

            (0, _baseStateChange.baseStateChange)('checked', true, 'checked', this, deep);

            // Refresh parent
            if (this.hasParent()) {
                this.getParent().refreshIndeterminateState();
            }

            this._tree.dom.end();

            return this;
        }
    }, {
        key: 'checked',


        /**
         * Get whether this node is checked.
         *
         * @category TreeNode
         * @return {boolean} Get if node checked.
         */
        value: function checked() {
            return this.state('checked');
        }

        /**
         * Hides parents without any visible children.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'clean',
        value: function clean() {
            this.recurseUp(function (node) {
                if (node.hasParent()) {
                    var parent = node.getParent();
                    if (!parent.hasVisibleChildren()) {
                        parent.hide();
                    }
                }
            });

            return this;
        }

        /**
         * Clones this node.
         *
         * @category TreeNode
         * @param {array} excludeKeys Keys to exclude from the clone.
         * @return {TreeNode} New node object.
         */

    }, {
        key: 'clone',
        value: function clone(excludeKeys) {
            return new TreeNode(this._tree, this, excludeKeys);
        }

        /**
         * Collapse this node.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'collapse',
        value: function collapse() {
            return (0, _baseStateChange.baseStateChange)('collapsed', true, 'collapsed', this);
        }

        /**
         * Get whether this node is collapsed.
         *
         * @category TreeNode
         * @return {boolean} Get if node collapsed.
         */

    }, {
        key: 'collapsed',
        value: function collapsed() {
            return this.state('collapsed');
        }

        /**
         * Get the containing context. If no parent present, the root context is returned.
         *
         * @category TreeNode
         * @return {TreeNodes} Node array object.
         */

    }, {
        key: 'context',
        value: function context() {
            return this.hasParent() ? this.getParent().children : this._tree.model;
        }

        /**
         * Copies node to a new tree instance.
         *
         * @category TreeNode
         * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
         * @return {object} Property "to" for defining destination.
         */

    }, {
        key: 'copy',
        value: function copy(hierarchy) {
            var node = this;

            if (hierarchy) {
                node = node.copyHierarchy();
            }

            return {

                /**
                 * Sets a destination.
                 *
                 * @category CopyNode
                 * @param {object} dest Destination Inspire Tree.
                 * @return {object} New node object.
                 */
                to: function to(dest) {
                    if (!(0, _isFunction3.default)(dest.addNode)) {
                        throw new Error('Destination must be an Inspire Tree instance.');
                    }

                    return dest.addNode(node.toObject());
                }
            };
        }

        /**
         * Copies all parents of a node.
         *
         * @category TreeNode
         * @param {boolean} excludeNode Exclude given node from hierarchy.
         * @return {TreeNode} Root node object with hierarchy.
         */

    }, {
        key: 'copyHierarchy',
        value: function copyHierarchy(excludeNode) {
            var node = this;
            var nodes = [];
            var parents = node.getParents();

            // Remove old hierarchy data
            (0, _each3.default)(parents, function (node) {
                nodes.push(node.toObject(excludeNode));
            });

            parents = nodes.reverse();

            if (!excludeNode) {
                var clone = node.toObject(true);

                // Filter out hidden children
                if (node.hasChildren()) {
                    clone.children = node.children.filter(function (n) {
                        return !n.state('hidden');
                    }).toArray();

                    clone.children._context = clone;
                }

                nodes.push(clone);
            }

            var hierarchy = nodes[0];
            var pointer = hierarchy;
            var l = nodes.length;
            (0, _each3.default)(nodes, function (parent, key) {
                var children = [];

                if (key + 1 < l) {
                    children.push(nodes[key + 1]);
                    pointer.children = children;

                    pointer = pointer.children[0];
                }
            });

            return (0, _objectToNode.objectToNode)(this._tree, hierarchy);
        }
    }, {
        key: 'deselect',


        /**
         * Deselect this node.
         *
         * If selection.require is true and this is the last selected
         * node, the node will remain in a selected state.
         *
         * @category TreeNode
         * @param {boolean} shallow Skip auto-deselecting children.
         * @return {TreeNode} Node object.
         */
        value: function deselect(shallow) {
            if (this.selected() && (!this._tree.config.selection.require || this._tree.selected().length > 1)) {
                this._tree.dom.batch();

                // Will we apply this state change to our children?
                var deep = !shallow && this._tree.config.selection.autoSelectChildren;

                this.state('indeterminate', false);
                (0, _baseStateChange.baseStateChange)('selected', false, 'deselected', this, deep);

                this._tree.dom.end();
            }

            return this;
        }

        /**
         * Get if node editable. Required editing.edit to be enable via config.
         *
         * @category TreeNode
         * @return {boolean} If node editable.
         */

    }, {
        key: 'editable',
        value: function editable() {
            return this._tree.config.editable && this._tree.config.editing.edit && this.state('editable');
        }

        /**
         * Get if node is currently in edit mode.
         *
         * @category TreeNode
         * @return {boolean} If node in edit mode.
         */

    }, {
        key: 'editing',
        value: function editing() {
            return this.state('editing');
        }

        /**
         * Expand this node.
         *
         * @category TreeNode
         * @return {Promise} Promise resolved on successful load and expand of children.
         */

    }, {
        key: 'expand',
        value: function expand() {
            var node = this;

            return new _es6Promise.Promise(function (resolve, reject) {
                var allow = node.hasChildren() || node._tree.isDynamic && node.children === true;

                if (allow && (node.collapsed() || node.hidden())) {
                    node.state('collapsed', false);
                    node.state('hidden', false);

                    node._tree.emit('node.expanded', node);

                    if (node._tree.isDynamic && node.children === true) {
                        node.loadChildren().then(resolve).catch(reject);
                    } else {
                        node.markDirty();
                        node._tree.dom.applyChanges();
                        resolve(node);
                    }
                } else {
                    // Resolve immediately
                    resolve(node);
                }
            });
        }

        /**
         * Get if node expanded.
         *
         * @category TreeNode
         * @return {boolean} If expanded.
         */

    }, {
        key: 'expanded',
        value: function expanded() {
            return !this.collapsed();
        }

        /**
         * Expand parent nodes.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'expandParents',
        value: function expandParents() {
            if (this.hasParent()) {
                this.getParent().recurseUp(function (node) {
                    node.expand();
                });
            }

            return this;
        }

        /**
         * Focus a node without changing its selection.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'focus',
        value: function focus() {
            var node = this;

            if (!node.focused()) {
                // Batch selection changes
                this._tree.dom.batch();
                this._tree.blurDeep();
                node.state('focused', true);

                // Emit this event
                this._tree.emit('node.focused', node);

                // Mark hierarchy dirty and apply
                node.markDirty();
                this._tree.dom.end();
            }

            return node;
        }

        /**
         * Get whether this node is focused.
         *
         * @category TreeNode
         * @return {boolean} Get if node focused.
         */

    }, {
        key: 'focused',
        value: function focused() {
            return this.state('focused');
        }

        /**
         * Get children for this node. If no children exist, an empty TreeNodes
         * collection is returned for safe chaining.
         *
         * @category TreeNode
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'getChildren',
        value: function getChildren() {
            return this.hasChildren() ? this.children : new _treenodes.TreeNodes(this._tree);
        }

        /**
         * Get the immediate parent, if any.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'getParent',
        value: function getParent() {
            return this.itree.parent;
        }

        /**
         * Returns parent nodes. Excludes any siblings.
         *
         * @category TreeNode
         * @return {TreeNodes} Node objects.
         */

    }, {
        key: 'getParents',
        value: function getParents() {
            var parents = new _treenodes.TreeNodes(this._tree);

            if (this.hasParent()) {
                this.getParent().recurseUp(function (node) {
                    parents.push(node);
                });
            }

            return parents;
        }

        /**
         * Get a textual hierarchy for a given node. An array
         * of text from this node's root ancestor to the given node.
         *
         * @category TreeNode
         * @return {array} Array of node texts.
         */

    }, {
        key: 'getTextualHierarchy',
        value: function getTextualHierarchy() {
            var paths = [];

            this.recurseUp(function (node) {
                paths.unshift(node.text);
            });

            return paths;
        }

        /**
         * If node has any children.
         *
         * @category TreeNode
         * @return {boolean} If children.
         */

    }, {
        key: 'hasChildren',
        value: function hasChildren() {
            return (0, _isArrayLike3.default)(this.children) && this.children.length > 0;
        }

        /**
         * If children loading method has completed. Will always be true for non-dynamic nodes.
         *
         * @category TreeNode
         * @return {boolean} If we've attempted to load children.
         */

    }, {
        key: 'hasLoadedChildren',
        value: function hasLoadedChildren() {
            return (0, _isArrayLike3.default)(this.children);
        }

        /**
         * If node has a parent.
         *
         * @category TreeNode
         * @return {boolean} If parent.
         */

    }, {
        key: 'hasParent',
        value: function hasParent() {
            return Boolean(this.itree.parent);
        }

        /**
         * If node has any visible children.
         *
         * @category TreeNode
         * @return {boolean} If visible children.
         */

    }, {
        key: 'hasVisibleChildren',
        value: function hasVisibleChildren() {
            var hasVisibleChildren = false;

            if (this.hasChildren()) {
                hasVisibleChildren = this.children.filter('available').length > 0;
            }

            return hasVisibleChildren;
        }

        /**
         * Hide this node.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'hide',
        value: function hide() {
            var node = (0, _baseStateChange.baseStateChange)('hidden', true, 'hidden', this);

            // Update children
            if (node.hasChildren()) {
                node.children.hide();
            }

            return node;
        }

        /**
         * Get whether this node is hidden.
         *
         * @category TreeNode
         * @return {boolean} Get if node hidden.
         */

    }, {
        key: 'hidden',
        value: function hidden() {
            return this.state('hidden');
        }

        /**
         * Returns a "path" of indices, values which map this node's location within all parent contexts.
         *
         * @category TreeNode
         * @return {string} Index path
         */

    }, {
        key: 'indexPath',
        value: function indexPath() {
            var indices = [];

            this.recurseUp(function (node) {
                indices.push((0, _indexOf3.default)(node.context(), node));
            });

            return indices.reverse().join('.');
        }

        /**
         * Get whether this node is indeterminate.
         *
         * @category TreeNode
         * @return {boolean} Get if node indeterminate.
         */

    }, {
        key: 'indeterminate',
        value: function indeterminate() {
            return this.state('indeterminate');
        }

        /**
         * Find the last + deepest visible child of the previous sibling.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'lastDeepestVisibleChild',
        value: function lastDeepestVisibleChild() {
            var found;

            if (this.hasChildren() && !this.collapsed()) {
                found = (0, _findLast3.default)(this.children, function (node) {
                    return node.visible();
                });

                var res = found.lastDeepestVisibleChild();
                if (res) {
                    found = res;
                }
            }

            return found;
        }

        /**
         * Initiate a dynamic load of children for a given node.
         *
         * This requires `tree.config.data` to be a function which accepts
         * three arguments: node, resolve, reject.
         *
         * Use the `node` to filter results.
         *
         * On load success, pass the result array to `resolve`.
         * On error, pass the Error to `reject`.
         *
         * @category TreeNode
         * @return {Promise} Promise resolving children nodes.
         */

    }, {
        key: 'loadChildren',
        value: function loadChildren() {
            var node = this;

            return new _es6Promise.Promise(function (resolve, reject) {
                if (!node._tree.isDynamic || !(0, _isArrayLike3.default)(node.children) && node.children !== true) {
                    reject(new Error('Node does not have or support dynamic children.'));
                }

                node.state('loading', true);
                node.markDirty();
                node._tree.dom.applyChanges();

                var complete = function complete(nodes, totalNodes) {
                    if ((0, _parseInt3.default)(totalNodes) > nodes.length) {
                        node.itree.pagination.total = (0, _parseInt3.default)(totalNodes);
                    }

                    node._tree.dom.batch();
                    node.state('loading', false);

                    var model = (0, _collectionToModel.collectionToModel)(node._tree, nodes, node);
                    if ((0, _isArrayLike3.default)(node.children)) {
                        node.children = node.children.concat(model);
                    } else {
                        node.children = model;
                    }

                    // If using checkbox mode, share selection with newly loaded children
                    if (node._tree.config.selection.mode === 'checkbox' && node.selected()) {
                        node.children.select();
                    }

                    node.markDirty();
                    node._tree.dom.end();

                    resolve(node.children);

                    node._tree.emit('children.loaded', node);
                };

                var error = function error(err) {
                    node.state('loading', false);
                    node.children = new _treenodes.TreeNodes(node._tree);
                    node.children._context = node;
                    node.markDirty();
                    node._tree.dom.applyChanges();

                    reject(err);

                    node._tree.emit('tree.loaderror', err);
                };

                var loader = node._tree.config.data(node, complete, error, node.itree.pagination);

                // Data loader is likely a promise
                if ((0, _isObject3.default)(loader)) {
                    (0, _standardizePromise.standardizePromise)(loader).then(complete).catch(error);
                }
            });
        }

        /**
         * Get whether this node is loading child data.
         *
         * @category TreeNode
         * @return {boolean} Get if node loading.
         */

    }, {
        key: 'loading',
        value: function loading() {
            return this.state('loading');
        }

        /**
         * Mark a node as dirty, rebuilding this node in the virtual DOM
         * and rerendering to the live DOM, next time applyChanges is called.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'markDirty',
        value: function markDirty() {
            if (!this.itree.dirty) {
                this.itree.dirty = true;

                if (this.hasParent()) {
                    this.getParent().markDirty();
                }
            }

            return this;
        }

        /**
         * Get whether this node was matched during the last search.
         *
         * @category TreeNode
         * @return {boolean} Get if node matched.
         */

    }, {
        key: 'matched',
        value: function matched() {
            return this.state('matched');
        }

        /**
         * Find the next visible sibling of our ancestor. Continues
         * seeking up the tree until a valid node is found or we
         * reach the root node.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'nextVisibleAncestralSiblingNode',
        value: function nextVisibleAncestralSiblingNode() {
            var next;

            if (this.hasParent()) {
                var parent = this.getParent();
                next = parent.nextVisibleSiblingNode();

                if (!next) {
                    next = parent.nextVisibleAncestralSiblingNode();
                }
            }

            return next;
        }

        /**
         * Find next visible child node.
         *
         * @category TreeNode
         * @return {TreeNode} Node object, if any.
         */

    }, {
        key: 'nextVisibleChildNode',
        value: function nextVisibleChildNode() {
            var startingNode = this;
            var next;

            if (startingNode.hasChildren()) {
                next = (0, _find3.default)(startingNode.children, function (child) {
                    return child.visible();
                });
            }

            return next;
        }

        /**
         * Get the next visible node.
         *
         * @category TreeNode
         * @return {TreeNode} Node object if any.
         */

    }, {
        key: 'nextVisibleNode',
        value: function nextVisibleNode() {
            var startingNode = this;
            var next;

            // 1. Any visible children
            next = startingNode.nextVisibleChildNode();

            // 2. Any Siblings
            if (!next) {
                next = startingNode.nextVisibleSiblingNode();
            }

            // 3. Find sibling of ancestor(s)
            if (!next) {
                next = startingNode.nextVisibleAncestralSiblingNode();
            }

            return next;
        }

        /**
         * Find the next visible sibling node.
         *
         * @category TreeNode
         * @return {TreeNode} Node object, if any.
         */

    }, {
        key: 'nextVisibleSiblingNode',
        value: function nextVisibleSiblingNode() {
            var startingNode = this;
            var context = startingNode.hasParent() ? startingNode.getParent().children : this._tree.nodes();
            var i = (0, _findIndex3.default)(context, { id: startingNode.id });

            return (0, _find3.default)((0, _slice3.default)(context, i + 1), function (node) {
                return node.visible();
            });
        }

        /**
         * Find the previous visible node.
         *
         * @category TreeNode
         * @return {TreeNode} Node object, if any.
         */

    }, {
        key: 'previousVisibleNode',
        value: function previousVisibleNode() {
            var startingNode = this;
            var prev;

            // 1. Any Siblings
            prev = startingNode.previousVisibleSiblingNode();

            // 2. If that sibling has children though, go there
            if (prev && prev.hasChildren() && !prev.collapsed()) {
                prev = prev.lastDeepestVisibleChild();
            }

            // 3. Parent
            if (!prev && startingNode.hasParent()) {
                prev = startingNode.getParent();
            }

            return prev;
        }

        /**
         * Find the previous visible sibling node.
         *
         * @category TreeNode
         * @return {TreeNode} Node object, if any.
         */

    }, {
        key: 'previousVisibleSiblingNode',
        value: function previousVisibleSiblingNode() {
            var context = this.hasParent() ? this.getParent().children : this._tree.nodes();
            var i = (0, _findIndex3.default)(context, { id: this.id });
            return (0, _findLast3.default)((0, _slice3.default)(context, 0, i), function (node) {
                return node.visible();
            });
        }

        /**
         * Iterate down node and any children.
         *
         * @category TreeNode
         * @param {function} iteratee Iteratee function.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'recurseDown',
        value: function recurseDown(iteratee) {
            (0, _recurseDown2.recurseDown)(this, iteratee);

            return this;
        }

        /**
         * Iterate up a node and its parents.
         *
         * @category TreeNode
         * @param {function} iteratee Iteratee function.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'recurseUp',
        value: function recurseUp(iteratee) {
            var result = iteratee(this);

            if (result !== false && this.hasParent()) {
                this.getParent().recurseUp(iteratee);
            }

            return this;
        }

        /**
         * Updates the indeterminate state of this node.
         *
         * Only available when dom.showCheckboxes=true.
         * True if some, but not all children are checked.
         * False if no children are checked.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'refreshIndeterminateState',
        value: function refreshIndeterminateState() {
            var node = this;
            var oldValue = node.indeterminate();
            node.state('indeterminate', false);

            if (this._tree.config.dom.showCheckboxes) {
                if (node.hasChildren()) {
                    var childrenCount = node.children.length;
                    var indeterminate = 0;
                    var checked = 0;

                    node.children.each(function (n) {
                        if (n.checked()) {
                            checked++;
                        }

                        if (n.indeterminate()) {
                            indeterminate++;
                        }
                    });

                    // Set selected if all children are
                    if (checked === childrenCount) {
                        (0, _baseStateChange.baseStateChange)('checked', true, 'checked', node);
                    } else {
                        (0, _baseStateChange.baseStateChange)('checked', false, 'unchecked', node);
                    }

                    // Set indeterminate if any children are, or some children are selected
                    if (!node.checked()) {
                        node.state('indeterminate', indeterminate > 0 || childrenCount > 0 && checked > 0 && checked < childrenCount);
                    }
                }

                if (node.hasParent()) {
                    node.getParent().refreshIndeterminateState();
                }

                if (oldValue !== node.state('indeterminate')) {
                    node.markDirty();
                }
            }

            return node;
        }

        /**
         * Remove a node from the tree.
         *
         * @category TreeNode
         * @return {object} Removed tree node object.
         */

    }, {
        key: 'remove',
        value: function remove() {
            // Cache parent before we remove the node
            var parent = this.getParent();

            // Remove self
            this.context().remove(this);

            // Refresh parent states
            if (parent) {
                parent.refreshIndeterminateState();
            }

            // Export/event
            var exported = this.toObject();
            this._tree.emit('node.removed', exported);

            return exported;
        }

        /**
         * Get whether this node is soft-removed.
         *
         * @category TreeNode
         * @return {boolean} Get if node removed.
         */

    }, {
        key: 'removed',
        value: function removed() {
            return this.state('removed');
        }

        /**
         * Get whether this node has been rendered.
         *
         * Will be false if deferred rendering is enable and the node has
         * not yet been loaded, or if a custom DOM renderer is used.
         *
         * @category TreeNode
         * @return {boolean} Get if node rendered.
         */

    }, {
        key: 'rendered',
        value: function rendered() {
            return this.state('rendered');
        }

        /**
         * Restore state if soft-removed.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'restore',
        value: function restore() {
            return (0, _baseStateChange.baseStateChange)('removed', false, 'restored', this);
        }

        /**
         * Select this node.
         *
         * @category TreeNode
         * @param {boolean} shallow Skip auto-selecting children.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'select',
        value: function select(shallow) {
            var node = this;

            if (!node.selected() && node.selectable()) {
                // Batch selection changes
                node._tree.dom.batch();

                if (node._tree.canAutoDeselect()) {
                    var oldVal = node._tree.config.selection.require;
                    node._tree.config.selection.require = false;
                    node._tree.deselectDeep();
                    node._tree.config.selection.require = oldVal;
                }

                // Will we apply this state change to our children?
                var deep = !shallow && node._tree.config.selection.autoSelectChildren;

                (0, _baseStateChange.baseStateChange)('selected', true, 'selected', this, deep);

                // Cache as the last selected node
                node._tree._lastSelectedNode = node;

                // Mark hierarchy dirty and apply
                node.markDirty();
                node._tree.dom.end();
            }

            return node;
        }

        /**
         * Get if node selectable.
         *
         * @category TreeNode
         * @return {boolean} If node selectable.
         */

    }, {
        key: 'selectable',
        value: function selectable() {
            var allow = this._tree.config.selection.allow(this);
            return typeof allow === 'boolean' ? allow : this.state('selectable');
        }

        /**
         * Get whether this node is selected.
         *
         * @category TreeNode
         * @return {boolean} Get if node selected.
         */

    }, {
        key: 'selected',
        value: function selected() {
            return this.state('selected');
        }

        /**
         * Set a root property on this node.
         *
         * @category TreeNode
         * @param {string|number} property Property name.
         * @param {*} value New value.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'set',
        value: function set(property, value) {
            this[property] = value;
            this.markDirty();

            return this;
        }

        /**
         * Show this node.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'show',
        value: function show() {
            return (0, _baseStateChange.baseStateChange)('hidden', false, 'shown', this);
        }

        /**
         * Get or set a state value.
         *
         * This is a base method and will not invoke related changes, for example
         * setting selected=false will not trigger any deselection logic.
         *
         * @category TreeNode
         * @param {string} name Property name.
         * @param {boolean} newVal New value, if setting.
         * @return {boolean} Current value on read, old value on set.
         */

    }, {
        key: 'state',
        value: function state(name, newVal) {
            var currentVal = this.itree.state[name];

            if (typeof newVal !== 'undefined' && currentVal !== newVal) {
                // Update values
                this.itree.state[name] = newVal;

                if (name !== 'rendered') {
                    this.markDirty();
                }

                // Emit an event
                this._tree.emit('node.state.changed', this, name, currentVal, newVal);
            }

            return currentVal;
        }

        /**
         * Mark this node as "removed" without actually removing it.
         *
         * Expand/show methods will never reveal this node until restored.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'softRemove',
        value: function softRemove() {
            return (0, _baseStateChange.baseStateChange)('removed', true, 'softremoved', this, 'softRemove');
        }

        /**
         * Toggles checked state.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'toggleCheck',
        value: function toggleCheck() {
            return this.checked() ? this.uncheck() : this.check();
        }

        /**
         * Toggles collapsed state.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'toggleCollapse',
        value: function toggleCollapse() {
            return this.collapsed() ? this.expand() : this.collapse();
        }

        /**
         * Toggles editing state.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'toggleEditing',
        value: function toggleEditing() {
            this.state('editing', !this.state('editing'));

            this.markDirty();
            this._tree.dom.applyChanges();

            return this;
        }

        /**
         * Toggles selected state.
         *
         * @category TreeNode
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'toggleSelect',
        value: function toggleSelect() {
            return this.selected() ? this.deselect() : this.select();
        }

        /**
         * Export this node as a native Object.
         *
         * @category TreeNode
         * @param {boolean} excludeChildren Exclude children.
         * @return {object} Node object.
         */

    }, {
        key: 'toObject',
        value: function toObject(excludeChildren) {
            var object = {};

            (0, _each3.default)(this, function (v, k) {
                if (k !== '_tree' && k !== 'children' && k !== 'itree') {
                    object[k] = v;
                }
            });

            if (!excludeChildren && this.hasChildren() && (0, _isFunction3.default)(this.children.toArray)) {
                object.children = this.children.toArray();
            }

            return object;
        }

        /**
         * Unchecks this node.
         *
         * @category TreeNode
         * @param {boolean} shallow Skip auto-unchecking children.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'uncheck',
        value: function uncheck(shallow) {
            this._tree.dom.batch();

            // Will we apply this state change to our children?
            var deep = !shallow && this._tree.config.checkbox.autoCheckChildren;

            (0, _baseStateChange.baseStateChange)('checked', false, 'unchecked', this, deep);

            // Refresh our parent
            if (this.hasParent()) {
                this.getParent().refreshIndeterminateState();
            }

            this._tree.dom.end();

            return this;
        }
    }, {
        key: 'visible',


        /**
         * Checks whether a node is visible to a user. Returns false
         * if it's hidden, or if any ancestor is hidden or collapsed.
         *
         * @category TreeNode
         * @return {boolean} Whether visible.
         */
        value: function visible() {
            var node = this;

            var isVisible = true;
            if (node.hidden() || node.removed() || this._tree.usesNativeDOM && !node.rendered()) {
                isVisible = false;
            } else if (node.hasParent()) {
                if (node.getParent().collapsed()) {
                    isVisible = false;
                } else {
                    isVisible = node.getParent().visible();
                }
            } else {
                isVisible = true;
            }

            return isVisible;
        }
    }]);

    return TreeNode;
}();

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Libs

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeNodes = undefined;

var _sortBy2 = __webpack_require__(44);

var _sortBy3 = _interopRequireDefault(_sortBy2);

var _remove2 = __webpack_require__(203);

var _remove3 = _interopRequireDefault(_remove2);

var _map2 = __webpack_require__(43);

var _map3 = _interopRequireDefault(_map2);

var _isNumber2 = __webpack_require__(197);

var _isNumber3 = _interopRequireDefault(_isNumber2);

var _isBoolean2 = __webpack_require__(62);

var _isBoolean3 = _interopRequireDefault(_isBoolean2);

var _isArrayLike2 = __webpack_require__(2);

var _isArrayLike3 = _interopRequireDefault(_isArrayLike2);

var _sortedIndexBy2 = __webpack_require__(204);

var _sortedIndexBy3 = _interopRequireDefault(_sortedIndexBy2);

var _isArray2 = __webpack_require__(0);

var _isArray3 = _interopRequireDefault(_isArray2);

var _isString2 = __webpack_require__(23);

var _isString3 = _interopRequireDefault(_isString2);

var _isFunction2 = __webpack_require__(5);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _each2 = __webpack_require__(4);

var _each3 = _interopRequireDefault(_each2);

var _castArray2 = __webpack_require__(41);

var _castArray3 = _interopRequireDefault(_castArray2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _objectToNode = __webpack_require__(60);

var _es6Promise = __webpack_require__(22);

var _recurseDown2 = __webpack_require__(108);

var _treenode = __webpack_require__(24);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
    function ExtendableBuiltin() {
        cls.apply(this, arguments);
    }

    ExtendableBuiltin.prototype = Object.create(cls.prototype, {
        constructor: {
            value: cls,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(ExtendableBuiltin, cls);
    } else {
        ExtendableBuiltin.__proto__ = cls;
    }

    return ExtendableBuiltin;
}

/**
 * Base function to filter nodes by state value.
 *
 * @private
 * @param {string} state State property
 * @param {boolean} full Return a non-flat hierarchy
 * @return {TreeNodes} Array of matching nodes.
 */
function baseStatePredicate(state, full) {
    if (full) {
        return this.extract(state);
    }

    // Cache a state predicate function
    var fn = getPredicateFunction(state);

    return this.flatten(function (node) {
        // Never include removed nodes unless specifically requested
        if (state !== 'removed' && node.removed()) {
            return false;
        }

        return fn(node);
    });
};

/**
 * Base function to invoke given method(s) on tree nodes.
 *
 * @private
 * @param {TreeNode} nodes Array of node objects.
 * @param {string|array} methods Method names.
 * @param {array|Arguments} args Array of arguments to proxy.
 * @param {boolean} deep Invoke deeply.
 * @return {TreeNodes} Array of node objects.
 */
function baseInvoke(nodes, methods, args, deep) {
    methods = (0, _castArray3.default)(methods);

    nodes._tree.dom.batch();

    nodes[deep ? 'recurseDown' : 'each'](function (node) {
        (0, _each3.default)(methods, function (method) {
            if ((0, _isFunction3.default)(node[method])) {
                node[method].apply(node, args);
            }
        });
    });

    nodes._tree.dom.end();

    return nodes;
}

/**
 * Creates a predicate function.
 *
 * @private
 * @param {string|function} predicate Property name or custom function.
 * @return {function} Predicate function.
 */
function getPredicateFunction(predicate) {
    var fn = predicate;
    if ((0, _isString3.default)(predicate)) {
        fn = function fn(node) {
            return (0, _isFunction3.default)(node[predicate]) ? node[predicate]() : node[predicate];
        };
    }

    return fn;
}

/**
 * An Array-like collection of TreeNodes.
 *
 * Note: Due to issue in many javascript environments,
 * native objects are problematic to extend correctly
 * so we mimic it, not actually extend it.
 *
 * @category TreeNodes
 * @param {array} array Array of TreeNode objects.
 * @return {TreeNodes} Collection of TreeNode
 */

var TreeNodes = exports.TreeNodes = function (_extendableBuiltin2) {
    _inherits(TreeNodes, _extendableBuiltin2);

    function TreeNodes(tree, array) {
        _classCallCheck(this, TreeNodes);

        var _this = _possibleConstructorReturn(this, (TreeNodes.__proto__ || Object.getPrototypeOf(TreeNodes)).call(this));

        _this._tree = tree;
        _this.length = 0;

        var treeNodes = _this;
        if ((0, _isArray3.default)(array) || array instanceof TreeNodes) {
            (0, _each3.default)(array, function (node) {
                if (node instanceof _treenode.TreeNode) {
                    treeNodes.push(node.clone());
                } else {
                    treeNodes.addNode(node);
                }
            });
        }
        return _this;
    }

    /**
     * Adds a new node to this collection. If a sort
     * method is configured, the node will be added
     * in the appropriate order.
     *
     * @category TreeNodes
     * @param {object} object Node
     * @return {TreeNode} Node object.
     */


    _createClass(TreeNodes, [{
        key: 'addNode',
        value: function addNode(object) {
            // Base insertion index
            var index = this.length;

            // If tree is sorted, insert in correct position
            if (this._tree.config.sort) {
                index = (0, _sortedIndexBy3.default)(this, object, this._tree.config.sort);
            }

            return this.insertAt(index, object);
        }

        /**
         * Query for all available nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'available',
        value: function available(full) {
            return baseStatePredicate.call(this, 'available', full);
        }

        /**
         * Blur children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'blur',
        value: function blur() {
            return this.invoke('blur');
        }

        /**
         * Blur all children (deeply) in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'blurDeep',
        value: function blurDeep() {
            return this.invokeDeep('blur');
        }

        /**
         * Query for all checked nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'checked',
        value: function checked(full) {
            return baseStatePredicate.call(this, 'checked', full);
        }

        /**
         * Clean children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'clean',
        value: function clean() {
            return this.invoke('clean');
        }

        /**
         * Clones (deep) the array of nodes.
         *
         * Note: Cloning will *not* clone the context pointer.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of cloned nodes.
         */

    }, {
        key: 'clone',
        value: function clone() {
            return new TreeNodes(this._tree, this);
        }

        /**
         * Collapse children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'collapse',
        value: function collapse() {
            return this.invoke('collapse');
        }

        /**
         * Query for all collapsed nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'collapsed',
        value: function collapsed(full) {
            return baseStatePredicate.call(this, 'collapsed', full);
        }

        /**
         * Collapse all children (deeply) in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'collapseDeep',
        value: function collapseDeep() {
            return this.invokeDeep('collapse');
        }

        /**
         * Concat nodes like an Array would.
         *
         * @category TreeNodes
         * @param {TreeNodes} nodes Array of nodes.
         * @return {TreeNodes} Resulting node array.
         */

    }, {
        key: 'concat',
        value: function concat(nodes) {
            var newNodes = new TreeNodes(this._tree);
            newNodes._context = this._context;

            var pusher = function pusher(node) {
                if (node instanceof _treenode.TreeNode) {
                    newNodes.push(node);
                }
            };

            (0, _each3.default)(this, pusher);
            (0, _each3.default)(nodes, pusher);

            return newNodes;
        }

        /**
         * Get the context of this collection. If a collection
         * of children, context is the parent node. Otherwise
         * the context is the tree itself.
         *
         * @category TreeNodes
         * @return {TreeNode|object} Node object or tree instance.
         */

    }, {
        key: 'context',
        value: function context() {
            return this._context || this._tree;
        }

        /**
         * Copies nodes to a new tree instance.
         *
         * @category TreeNodes
         * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
         * @return {object} Methods to perform action on copied nodes.
         */

    }, {
        key: 'copy',
        value: function copy(hierarchy) {
            var nodes = this;

            return {

                /**
                 * Sets a destination.
                 *
                 * @category CopyNode
                 * @param {object} dest Destination Inspire Tree.
                 * @return {array} Array of new nodes.
                 */
                to: function to(dest) {
                    if (!(0, _isFunction3.default)(dest.addNodes)) {
                        throw new Error('Destination must be an Inspire Tree instance.');
                    }

                    var newNodes = new TreeNodes(this._tree);

                    (0, _each3.default)(nodes, function (node) {
                        newNodes.push(node.copy(hierarchy).to(dest));
                    });

                    return newNodes;
                }
            };
        }

        /**
         * Returns deepest nodes from this array.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'deepest',
        value: function deepest() {
            var matches = new TreeNodes(this._tree);

            this.recurseDown(function (node) {
                if (!node.children) {
                    matches.push(node);
                }
            });

            return matches;
        }

        /**
         * Deselect children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'deselect',
        value: function deselect() {
            return this.invoke('deselect');
        }

        /**
         * Deselect all children (deeply) in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'deselectDeep',
        value: function deselectDeep() {
            return this.invokeDeep('deselect');
        }

        /**
         * Iterate every TreeNode in this collection.
         *
         * @category TreeNodes
         * @param {function} iteratee Iteratee invoke for each node.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'each',
        value: function each(iteratee) {
            (0, _each3.default)(this, iteratee);

            return this;
        }

        /**
         * Query for all editable nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'editable',
        value: function editable(full) {
            return baseStatePredicate.call(this, 'editable', full);
        }

        /**
         * Query for all nodes in editing mode.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'editing',
        value: function editing(full) {
            return baseStatePredicate.call(this, 'editing', full);
        }

        /**
         * Expand children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'expand',
        value: function expand() {
            return this.invoke('expand');
        }

        /**
         * Query for all expanded nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'expanded',
        value: function expanded(full) {
            return baseStatePredicate.call(this, 'expanded', full);
        }

        /**
         * Recursively expands all nodes, loading all dynamic calls.
         *
         * @category TreeNodes
         * @return {Promise} Promise resolved only when all children have loaded and expanded.
         */

    }, {
        key: 'expandDeep',
        value: function expandDeep() {
            var nodes = this;

            return new _es6Promise.Promise(function (resolve) {
                var waitCount = 0;

                var done = function done() {
                    if (--waitCount === 0) {
                        resolve(nodes);
                    }
                };

                nodes.recurseDown(function (node) {
                    waitCount++;

                    // Ignore nodes without children
                    if (node.children) {
                        node.expand().catch(done).then(function () {
                            // Manually trigger expansion on newly loaded children
                            node.children.expandDeep().catch(done).then(done);
                        });
                    } else {
                        done();
                    }
                });
            });
        }

        /**
         * Expand parents of children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'expandParents',
        value: function expandParents() {
            return this.invoke('expandParents');
        }

        /**
         * Returns a cloned hierarchy of all nodes matching a predicate.
         *
         * Because it filters deeply, we must clone all nodes so that we
         * don't affect the actual node array.
         *
         * @category TreeNodes
         * @param {string|function} predicate State flag or custom function.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'extract',
        value: function extract(predicate) {
            var flat = this.flatten(predicate);
            var matches = new TreeNodes(this._tree);

            (0, _each3.default)(flat, function (node) {
                matches.addNode(node.copyHierarchy());
            });

            return matches;
        }

        /**
         * Returns nodes which match a predicate.
         *
         * @category TreeNodes
         * @param {string|function} predicate State flag or custom function.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'filter',
        value: function filter(predicate) {
            var fn = getPredicateFunction(predicate);
            var matches = new TreeNodes(this._tree);

            (0, _each3.default)(this, function (node) {
                if (fn(node)) {
                    matches.push(node);
                }
            });

            return matches;
        }

        /**
         * Flattens a hierarchy, returning only node(s) matching the
         * expected state or predicate function.
         *
         * @category TreeNodes
         * @param {string|function} predicate State property or custom function.
         * @return {TreeNodes} Flat array of matching nodes.
         */

    }, {
        key: 'flatten',
        value: function flatten(predicate) {
            var flat = new TreeNodes(this._tree);

            var fn = getPredicateFunction(predicate);
            this.recurseDown(function (node) {
                if (fn(node)) {
                    flat.push(node);
                }
            });

            return flat;
        }

        /**
         * Query for all focused nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'focused',
        value: function focused(full) {
            return baseStatePredicate.call(this, 'focused', full);
        }

        /**
         * Get a specific node in the collection, or undefined if it doesn't exist.
         *
         * @category TreeNodes
         * @param {int} index Numeric index of requested node.
         * @return {TreeNode} Node object. Undefined if invalid index.
         */

    }, {
        key: 'get',
        value: function get(index) {
            return this[index];
        }

        /**
         * Query for all hidden nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'hidden',
        value: function hidden(full) {
            return baseStatePredicate.call(this, 'hidden', full);
        }

        /**
         * Hide children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'hide',
        value: function hide() {
            return this.invoke('hide');
        }

        /**
         * Hide all children (deeply) in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'hideDeep',
        value: function hideDeep() {
            return this.invokeDeep('hide');
        }

        /**
         * Query for all indeterminate nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'indeterminate',
        value: function indeterminate(full) {
            return baseStatePredicate.call(this, 'indeterminate', full);
        }

        /**
         * Insert a new node at a given position.
         *
         * @category TreeNodes
         * @param {integer} index Index at which to insert the node.
         * @param {object} object Raw node object or TreeNode.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'insertAt',
        value: function insertAt(index, object) {
            // If node has a pre-existing ID
            if (object.id) {
                // Is it already in the tree?
                var existingNode = this.node(object.id);
                if (existingNode) {
                    existingNode.restore().show();

                    // Merge children
                    if ((0, _isArrayLike3.default)(object.children)) {
                        // Setup existing node's children property if needed
                        if (!(0, _isArrayLike3.default)(existingNode.children)) {
                            existingNode.children = new TreeNodes(this._tree);
                            existingNode.children._context = existingNode;
                        }

                        // Copy each child (using addNode, which uses insertAt)
                        (0, _each3.default)(object.children, function (child) {
                            existingNode.children.addNode(child);
                        });
                    }

                    // Merge truthy children
                    else if (object.children && (0, _isBoolean3.default)(existingNode.children)) {
                            existingNode.children = object.children;
                        }

                    existingNode.markDirty();
                    this._tree.dom.applyChanges();

                    // Node merged, return it.
                    return existingNode;
                }
            }

            // Node is new, insert at given location.
            var node = this._tree.isNode(object) ? object : (0, _objectToNode.objectToNode)(this._tree, object);

            // Grab remaining nodes
            this.splice(index, 0, node);

            // Refresh parent state and mark dirty
            if (this._context) {
                node.itree.parent = this._context;
                this._context.refreshIndeterminateState().markDirty();
            }

            // Event
            this._tree.emit('node.added', node);

            // Always mark this node as dirty
            node.markDirty();

            // If pushing this node anywhere but the end, other nodes may change.
            if (this.length - 1 !== index) {
                this.invoke('markDirty');
            }

            this._tree.dom.applyChanges();

            return node;
        }

        /**
         * Invoke method(s) on each node.
         *
         * @category TreeNodes
         * @param {string|array} methods Method name(s).
         * @param {array|Arguments} args Array of arguments to proxy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'invoke',
        value: function invoke(methods, args) {
            return baseInvoke(this, methods, args);
        }

        /**
         * Invoke method(s) deeply.
         *
         * @category TreeNodes
         * @param {string|array} methods Method name(s).
         *  @param {array|Arguments} args Array of arguments to proxy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'invokeDeep',
        value: function invokeDeep(methods, args) {
            return baseInvoke(this, methods, args, true);
        }

        /**
         * Query for all loading nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'loading',
        value: function loading(full) {
            return baseStatePredicate.call(this, 'loading', full);
        }

        /**
         * Query for all nodes which matched the last search.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'matched',
        value: function matched(full) {
            return baseStatePredicate.call(this, 'matched', full);
        }

        /**
         * Get a node.
         *
         * @category TreeNodes
         * @param {string|number} id ID of node.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'node',
        value: function node(id) {
            var match;

            if ((0, _isNumber3.default)(id)) {
                id = id.toString();
            }

            this.recurseDown(function (node) {
                if (node.id === id) {
                    match = node;

                    return false;
                }
            });

            return match;
        }

        /**
         * Get all nodes in a tree, or nodes for an array of IDs.
         *
         * @category TreeNodes
         * @param {array} refs Array of ID references.
         * @return {TreeNodes} Array of node objects.
         * @example
         *
         * var all = tree.nodes()
         * var some = tree.nodes([1, 2, 3])
         */

    }, {
        key: 'nodes',
        value: function nodes(refs) {
            var results;

            if ((0, _isArray3.default)(refs)) {
                // Ensure incoming IDs are strings
                refs = (0, _map3.default)(refs, function (element) {
                    if ((0, _isNumber3.default)(element)) {
                        element = element.toString();
                    }

                    return element;
                });

                results = new TreeNodes(this._tree);

                this.recurseDown(function (node) {
                    if (refs.indexOf(node.id) > -1) {
                        results.push(node);
                    }
                });
            }

            return (0, _isArray3.default)(refs) ? results : this;
        }

        /**
         * Iterate down all nodes and any children.
         *
         * @category TreeNodes
         * @param {function} iteratee Iteratee function.
         * @return {TreeNodes} Resulting nodes.
         */

    }, {
        key: 'recurseDown',
        value: function recurseDown(iteratee) {
            (0, _recurseDown2.recurseDown)(this, iteratee);

            return this;
        }

        /**
         * Removes a node from this list.
         *
         * @category TreeNodes
         * @param {TreeNode} node Node object.
         * @return {TreeNodes} Resulting nodes.
         */

    }, {
        key: 'remove',
        value: function remove(node) {
            (0, _remove3.default)(this, { id: node.id });

            if (this._context) {
                this._context.markDirty();
            }

            this._tree.dom.applyChanges();

            return this;
        }

        /**
         * Query for all soft-removed nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'removed',
        value: function removed(full) {
            return baseStatePredicate.call(this, 'removed', full);
        }

        /**
         * Restore children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'restore',
        value: function restore() {
            return this.invoke('restore');
        }

        /**
         * Restore all children (deeply) in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'restoreDeep',
        value: function restoreDeep() {
            return this.invokeDeep('restore');
        }

        /**
         * Select children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'select',
        value: function select() {
            return this.invoke('select');
        }

        /**
         * Query for all selectable nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'selectable',
        value: function selectable(full) {
            return baseStatePredicate.call(this, 'selectable', full);
        }

        /**
         * Select all children (deeply) in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'selectDeep',
        value: function selectDeep() {
            return this.invokeDeep('select');
        }

        /**
         * Query for all selected nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'selected',
        value: function selected(full) {
            return baseStatePredicate.call(this, 'selected', full);
        }

        /**
         * Show children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'show',
        value: function show() {
            return this.invoke('show');
        }

        /**
         * Show all children (deeply) in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'showDeep',
        value: function showDeep() {
            return this.invokeDeep('show');
        }

        /**
         * Soft-remove children in this collection.
         *
         * @category TreeNodes
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'softRemove',
        value: function softRemove() {
            return this.invoke('softRemove');
        }

        /**
         * Sorts all TreeNode objects in this collection.
         *
         * If no custom sorter given, the configured "sort" value will be used.
         *
         * @category TreeNodes
         * @param {string|function} sorter Sort function or property name.
         * @return {TreeNodes} Array of node obejcts.
         */

    }, {
        key: 'sort',
        value: function sort(sorter) {
            var nodes = this;
            sorter = sorter || this._tree.config.sort;

            // Only apply sort if one provided
            if (sorter) {
                var sorted = (0, _sortBy3.default)(nodes, sorter);

                nodes.length = 0;
                (0, _each3.default)(sorted, function (node) {
                    nodes.push(node);
                });
            }

            return nodes;
        }

        /**
         * Set state values for nodes in this collection.
         *
         * @category TreeNodes
         * @param {string} name Property name.
         * @param {boolean} newVal New value, if setting.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'state',
        value: function state() {
            return this.invoke('state', arguments);
        }

        /**
         * Set state values recursively.
         *
         * @category TreeNodes
         * @param {string} name Property name.
         * @param {boolean} newVal New value, if setting.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'stateDeep',
        value: function stateDeep() {
            return this.invokeDeep('state', arguments);
        }

        /**
         * Chained method for returning a chain to the tree context.
         *
         * @category TreeNodes
         * @return {[type]} [description]
         */

    }, {
        key: 'tree',
        value: function tree() {
            return this._tree;
        }

        /**
         * Returns a native Array of nodes.
         *
         * @category TreeNodes
         * @return {array} Array of node objects.
         */

    }, {
        key: 'toArray',
        value: function toArray() {
            var array = [];

            (0, _each3.default)(this, function (node) {
                array.push(node.toObject());
            });

            return array;
        }

        /**
         * Query for all visible nodes.
         *
         * @category TreeNodes
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'visible',
        value: function visible(full) {
            return baseStatePredicate.call(this, 'visible', full);
        }
    }]);

    return TreeNodes;
}(_extendableBuiltin(Array));

;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var listCacheClear = __webpack_require__(176),
    listCacheDelete = __webpack_require__(177),
    listCacheGet = __webpack_require__(178),
    listCacheHas = __webpack_require__(179),
    listCacheSet = __webpack_require__(180);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseAssignValue = __webpack_require__(47),
    eq = __webpack_require__(33);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var eq = __webpack_require__(33);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var castPath = __webpack_require__(14),
    toKey = __webpack_require__(7);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return index && index == length ? object : undefined;
}

module.exports = baseGet;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

module.exports = eq;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = isThunk;

function isThunk(t) {
    return t && t.type === "Thunk";
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = isHook;

function isHook(hook) {
  return hook && (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") || typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"));
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var version = __webpack_require__(20);

module.exports = isVirtualText;

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version;
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = __webpack_require__(0);

/**
 * Casts `value` as an array if it's not one.
 *
 * @static
 * @memberOf _
 * @since 4.4.0
 * @category Lang
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast array.
 * @example
 *
 * _.castArray(1);
 * // => [1]
 *
 * _.castArray({ 'a': 1 });
 * // => [{ 'a': 1 }]
 *
 * _.castArray('abc');
 * // => ['abc']
 *
 * _.castArray(null);
 * // => [null]
 *
 * _.castArray(undefined);
 * // => [undefined]
 *
 * _.castArray();
 * // => []
 *
 * var array = [1, 2, 3];
 * console.log(_.castArray(array) === array);
 * // => true
 */
function castArray() {
  if (!arguments.length) {
    return [];
  }
  var value = arguments[0];
  return isArray(value) ? value : [value];
}

module.exports = castArray;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGet = __webpack_require__(30);

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
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
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayMap = __webpack_require__(11),
    baseIteratee = __webpack_require__(3),
    baseMap = __webpack_require__(79),
    isArray = __webpack_require__(0);

/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map([4, 8], square);
 * // => [16, 64]
 *
 * _.map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee) {
  var func = isArray(collection) ? arrayMap : baseMap;
  return func(collection, baseIteratee(iteratee, 3));
}

module.exports = map;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseFlatten = __webpack_require__(75),
    baseOrderBy = __webpack_require__(141),
    baseRest = __webpack_require__(13),
    isIterateeCall = __webpack_require__(54);

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, [function(o) { return o.user; }]);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
 */
var sortBy = baseRest(function (collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
});

module.exports = sortBy;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _each2 = __webpack_require__(4);

var _each3 = _interopRequireDefault(_each2);

var _sortBy2 = __webpack_require__(44);

var _sortBy3 = _interopRequireDefault(_sortBy2);

exports.collectionToModel = collectionToModel;

var _objectToNode = __webpack_require__(60);

var _treenodes = __webpack_require__(25);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parses a raw collection of objects into a model used
 * within a tree. Adds state and other internal properties.
 *
 * @private
 * @param {object} tree Tree instance.
 * @param {array} array Array of nodes
 * @param {object} parent Pointer to parent object
 * @return {array|object} Object model.
 */
function collectionToModel(tree, array, parent) {
    var collection = new _treenodes.TreeNodes(tree);

    // Sort
    if (tree.config.sort) {
        array = (0, _sortBy3.default)(array, tree.config.sort);
    }

    (0, _each3.default)(array, function (node) {
        collection.push((0, _objectToNode.objectToNode)(tree, node, parent));
    });

    collection._context = parent;

    return collection;
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineProperty = __webpack_require__(164);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

module.exports = baseUnary;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseRest = __webpack_require__(13),
    isIterateeCall = __webpack_require__(54);

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function (object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var overArg = __webpack_require__(32);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isArray = __webpack_require__(0),
    isSymbol = __webpack_require__(15);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

module.exports = isKey;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(1),
    isSymbol = __webpack_require__(15);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

module.exports = toNumber;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseToString = __webpack_require__(149);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nativeIsArray = Array.isArray;
var toString = Object.prototype.toString;

module.exports = nativeIsArray || isArray;

function isArray(obj) {
    return toString.call(obj) === "[object Array]";
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _each2 = __webpack_require__(4);

var _each3 = _interopRequireDefault(_each2);

var _assign2 = __webpack_require__(186);

var _assign3 = _interopRequireDefault(_assign2);

var _isArray2 = __webpack_require__(0);

var _isArray3 = _interopRequireDefault(_isArray2);

exports.objectToNode = objectToNode;

var _collectionToModel = __webpack_require__(45);

var _uuid = __webpack_require__(98);

var _uuid2 = _interopRequireDefault(_uuid);

var _treenode = __webpack_require__(24);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parse a raw object into a TreeNode used within a tree.
 *
 * Note: Uses native js over lodash where performance
 * benefits most, since this handles every node.
 *
 * @private
 * @param {object} tree Tree instance.
 * @param {object} object Source object
 * @param {object} parent Pointer to parent object.
 * @return {object} Final object
 */
function objectToNode(tree, object, parent) {
    // Create or type-ensure ID
    object.id = object.id || (0, _uuid2.default)();
    if (typeof object.id !== 'string') {
        object.id = object.id.toString();
    }

    // High-performance default assignments
    var itree = object.itree = object.itree || {};
    itree.icon = itree.icon || false;

    var li = itree.li = itree.li || {};
    li.attributes = li.attributes || {};

    var a = itree.a = itree.a || {};
    a.attributes = a.attributes || {};

    var pagination = itree.pagination = {};
    pagination.limit = tree.config.pagination.limit;
    pagination.total = (0, _isArray3.default)(object.children) ? object.children.length : -1;

    var state = itree.state = itree.state || {};

    // Enabled by default
    state.collapsed = typeof state.collapsed === 'boolean' ? state.collapsed : tree.defaultState.collapsed;
    state.selectable = typeof state.selectable === 'boolean' ? state.selectable : tree.defaultState.selectable;

    // Disabled by default
    state.checked = typeof state.checked === 'boolean' ? state.checked : false;
    state.editable = typeof state.editable === 'boolean' ? state.editable : tree.defaultState.editable;
    state.editing = typeof state.editing === 'boolean' ? state.editing : tree.defaultState.editing;
    state.focused = state.focused || tree.defaultState.focused;
    state.hidden = state.hidden || tree.defaultState.hidden;
    state.indeterminate = state.indeterminate || tree.defaultState.indeterminate;
    state.loading = state.loading || tree.defaultState.loading;
    state.removed = state.removed || tree.defaultState.removed;
    state.rendered = state.rendered || tree.defaultState.rendered;
    state.selected = state.selected || tree.defaultState.selected;

    // Save parent, if any.
    object.itree.parent = parent;

    // Wrap
    object = (0, _assign3.default)(new _treenode.TreeNode(tree), object);

    if (object.hasChildren()) {
        object.children = (0, _collectionToModel.collectionToModel)(tree, object.children, object);
    }

    // Fire events for pre-set states, if enabled
    if (tree.allowsLoadEvents) {
        (0, _each3.default)(tree.config.allowLoadEvents, function (eventName) {
            if (state[eventName]) {
                tree.emit('node.' + eventName, object);
            }
        });
    }

    return object;
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIndexOf = __webpack_require__(31),
    isArrayLike = __webpack_require__(2),
    isString = __webpack_require__(23),
    toInteger = __webpack_require__(16),
    values = __webpack_require__(208);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring of `value`, otherwise
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * is used for equality comparisons. If `fromIndex` is negative, it's used as
 * the offset from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 * _.includes('abcd', 'bc');
 * // => true
 */
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike(collection) ? collection : values(collection);
  fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;

  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax(length + fromIndex, 0);
  }
  return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
}

module.exports = includes;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGetTag = __webpack_require__(12),
    isObjectLike = __webpack_require__(8);

/** `Object#toString` result references. */
var boolTag = '[object Boolean]';

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */
function isBoolean(value) {
    return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
}

module.exports = isBoolean;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseKeys = __webpack_require__(137),
    getTag = __webpack_require__(52),
    isArguments = __webpack_require__(35),
    isArray = __webpack_require__(0),
    isArrayLike = __webpack_require__(2),
    isBuffer = __webpack_require__(18),
    isPrototype = __webpack_require__(56),
    isTypedArray = __webpack_require__(36);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) && (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

module.exports = isEmpty;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var root = __webpack_require__(17),
    toString = __webpack_require__(58);

/** Used to match leading and trailing whitespace. */
var reTrimStart = /^\s+/;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeParseInt = root.parseInt;

/**
 * Converts `string` to an integer of the specified radix. If `radix` is
 * `undefined` or `0`, a `radix` of `10` is used unless `value` is a
 * hexadecimal, in which case a `radix` of `16` is used.
 *
 * **Note:** This method aligns with the
 * [ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category String
 * @param {string} string The string to convert.
 * @param {number} [radix=10] The radix to interpret `value` by.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.parseInt('08');
 * // => 8
 *
 * _.map(['6', '08', '10'], _.parseInt);
 * // => [6, 8, 10]
 */
function parseInt(string, radix, guard) {
  if (guard || radix == null) {
    radix = 0;
  } else if (radix) {
    radix = +radix;
  }
  return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
}

module.exports = parseInt;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayEach = __webpack_require__(46),
    baseCreate = __webpack_require__(72),
    baseForOwn = __webpack_require__(77),
    baseIteratee = __webpack_require__(3),
    getPrototype = __webpack_require__(51),
    isArray = __webpack_require__(0),
    isBuffer = __webpack_require__(18),
    isFunction = __webpack_require__(5),
    isObject = __webpack_require__(1),
    isTypedArray = __webpack_require__(36);

/**
 * An alternative to `_.reduce`; this method transforms `object` to a new
 * `accumulator` object which is the result of running each of its own
 * enumerable string keyed properties thru `iteratee`, with each invocation
 * potentially mutating the `accumulator` object. If `accumulator` is not
 * provided, a new object with the same `[[Prototype]]` will be used. The
 * iteratee is invoked with four arguments: (accumulator, value, key, object).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @since 1.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The custom accumulator value.
 * @returns {*} Returns the accumulated value.
 * @example
 *
 * _.transform([2, 3, 4], function(result, n) {
 *   result.push(n *= n);
 *   return n % 2 == 0;
 * }, []);
 * // => [4, 9]
 *
 * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
 *   (result[value] || (result[value] = [])).push(key);
 * }, {});
 * // => { '1': ['a', 'c'], '2': ['b'] }
 */
function transform(object, iteratee, accumulator) {
  var isArr = isArray(object),
      isArrLike = isArr || isBuffer(object) || isTypedArray(object);

  iteratee = baseIteratee(iteratee, 4);
  if (accumulator == null) {
    var Ctor = object && object.constructor;
    if (isArrLike) {
      accumulator = isArr ? new Ctor() : [];
    } else if (isObject(object)) {
      accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
    } else {
      accumulator = {};
    }
  }
  (isArrLike ? arrayEach : baseForOwn)(object, function (value, index, object) {
    return iteratee(accumulator, value, index, object);
  });
  return accumulator;
}

module.exports = transform;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isFunction2 = __webpack_require__(5);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isObject2 = __webpack_require__(1);

var _isObject3 = _interopRequireDefault(_isObject2);

exports.standardizePromise = standardizePromise;

var _es6Promise = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Resolve promise-like objects consistently.
 *
 * @private
 * @param {object} promise Promise-like object.
 * @returns {Promise} Promise
 */
function standardizePromise(promise) {
    return new _es6Promise.Promise(function (resolve, reject) {
        if (!(0, _isObject3.default)(promise)) {
            return reject(new Error('Invalid Promise'));
        }

        if ((0, _isFunction3.default)(promise.then)) {
            promise.then(resolve);
        }

        // jQuery promises use "error"
        if ((0, _isFunction3.default)(promise.error)) {
            promise.error(reject);
        } else if ((0, _isFunction3.default)(promise.catch)) {
            promise.catch(reject);
        }
    });
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var topLevel = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
var minDoc = __webpack_require__(234);

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21)))

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function isObject(x) {
	return (typeof x === "undefined" ? "undefined" : _typeof(x)) === "object" && x !== null;
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = __webpack_require__(0);

/**
 * Casts `value` as an array if it's not one.
 *
 * @static
 * @memberOf _
 * @since 4.4.0
 * @category Lang
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast array.
 * @example
 *
 * _.castArray(1);
 * // => [1]
 *
 * _.castArray({ 'a': 1 });
 * // => [{ 'a': 1 }]
 *
 * _.castArray('abc');
 * // => ['abc']
 *
 * _.castArray(null);
 * // => [null]
 *
 * _.castArray(undefined);
 * // => [undefined]
 *
 * _.castArray();
 * // => []
 *
 * var array = [1, 2, 3];
 * console.log(_.castArray(array) === array);
 * // => true
 */
function castArray() {
  if (!arguments.length) {
    return [];
  }
  var value = arguments[0];
  return isArray(value) ? value : [value];
}

module.exports = castArray;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var root = __webpack_require__(17);

/** Built-in value references. */
var _Symbol = root.Symbol;

module.exports = _Symbol;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseAssignValue = __webpack_require__(47),
    eq = __webpack_require__(33);

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignMergeValue;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(1);

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = function () {
  function object() {}
  return function (proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = undefined;
    return result;
  };
}();

module.exports = baseCreate;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseForOwn = __webpack_require__(77),
    createBaseEach = __webpack_require__(159);

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayPush = __webpack_require__(126),
    isFlattenable = __webpack_require__(175);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createBaseFor = __webpack_require__(160);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseFor = __webpack_require__(76),
    keys = __webpack_require__(9);

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIsEqualDeep = __webpack_require__(134),
    isObjectLike = __webpack_require__(8);

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseEach = __webpack_require__(73),
    isArrayLike = __webpack_require__(2);

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function (value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

module.exports = baseMap;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Stack = __webpack_require__(26),
    assignMergeValue = __webpack_require__(71),
    baseFor = __webpack_require__(76),
    baseMergeDeep = __webpack_require__(140),
    isObject = __webpack_require__(1),
    keysIn = __webpack_require__(37);

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function (srcValue, key) {
    if (isObject(srcValue)) {
      stack || (stack = new Stack());
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(object[key], srcValue, key + '', object, source, stack) : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

module.exports = baseMerge;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIndexOf = __webpack_require__(31);

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var root = __webpack_require__(17);

/** Detect free variable `exports`. */
var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(107)(module)))

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIteratee = __webpack_require__(3),
    isArrayLike = __webpack_require__(2),
    keys = __webpack_require__(9);

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */
function createFind(findIndexFunc) {
  return function (collection, predicate, fromIndex) {
    var iterable = Object(collection);
    if (!isArrayLike(collection)) {
      var iteratee = baseIteratee(predicate, 3);
      collection = keys(collection);
      predicate = function predicate(key) {
        return iteratee(iterable[key], key, iterable);
      };
    }
    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
  };
}

module.exports = createFind;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21)))

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var overArg = __webpack_require__(32);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseCreate = __webpack_require__(72),
    getPrototype = __webpack_require__(51),
    isPrototype = __webpack_require__(56);

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
    return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}

module.exports = initCloneObject;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(1);

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

module.exports = isStrictComparable;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function (object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
  };
}

module.exports = matchesStrictComparable;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGet = __webpack_require__(30),
    baseSlice = __webpack_require__(48);

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent(object, path) {
  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
}

module.exports = parent;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createFind = __webpack_require__(84),
    findIndex = __webpack_require__(93);

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.find(users, function(o) { return o.age < 40; });
 * // => object for 'barney'
 *
 * // The `_.matches` iteratee shorthand.
 * _.find(users, { 'age': 1, 'active': true });
 * // => object for 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.find(users, ['active', false]);
 * // => object for 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.find(users, 'active');
 * // => object for 'barney'
 */
var find = createFind(findIndex);

module.exports = find;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseFindIndex = __webpack_require__(74),
    baseIteratee = __webpack_require__(3),
    toInteger = __webpack_require__(16);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseFindIndex(array, baseIteratee(predicate, 3), index);
}

module.exports = findIndex;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArrayLike = __webpack_require__(2),
    isObjectLike = __webpack_require__(8);

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
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

module.exports = isArrayLikeObject;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
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

module.exports = isLength;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

module.exports = last;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseSlice = __webpack_require__(48),
    isIterateeCall = __webpack_require__(54),
    toInteger = __webpack_require__(16);

/**
 * Creates a slice of `array` from `start` up to, but not including, `end`.
 *
 * **Note:** This method is used instead of
 * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
 * returned.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function slice(array, start, end) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
    start = 0;
    end = length;
  } else {
    start = start == null ? 0 : toInteger(start);
    end = end === undefined ? length : toInteger(end);
  }
  return baseSlice(array, start, end);
}

module.exports = slice;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var v1 = __webpack_require__(210);
var v4 = __webpack_require__(211);

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function rng() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21)))

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(68);
var isHook = __webpack_require__(39);

module.exports = applyProperties;

function applyProperties(node, props, previous) {
    for (var propName in props) {
        var propValue = props[propName];

        if (propValue === undefined) {
            removeProperty(node, propName, propValue, previous);
        } else if (isHook(propValue)) {
            removeProperty(node, propName, propValue, previous);
            if (propValue.hook) {
                propValue.hook(node, propName, previous ? previous[propName] : undefined);
            }
        } else {
            if (isObject(propValue)) {
                patchObject(node, props, previous, propName, propValue);
            } else {
                node[propName] = propValue;
            }
        }
    }
}

function removeProperty(node, propName, propValue, previous) {
    if (previous) {
        var previousValue = previous[propName];

        if (!isHook(previousValue)) {
            if (propName === "attributes") {
                for (var attrName in previousValue) {
                    node.removeAttribute(attrName);
                }
            } else if (propName === "style") {
                for (var i in previousValue) {
                    node.style[i] = "";
                }
            } else if (typeof previousValue === "string") {
                node[propName] = "";
            } else {
                node[propName] = null;
            }
        } else if (previousValue.unhook) {
            previousValue.unhook(node, propName, propValue);
        }
    }
}

function patchObject(node, props, previous, propName, propValue) {
    var previousValue = previous ? previous[propName] : undefined;

    // Set attributes
    if (propName === "attributes") {
        for (var attrName in propValue) {
            var attrValue = propValue[attrName];

            if (attrValue === undefined) {
                node.removeAttribute(attrName);
            } else {
                node.setAttribute(attrName, attrValue);
            }
        }

        return;
    }

    if (previousValue && isObject(previousValue) && getPrototype(previousValue) !== getPrototype(propValue)) {
        node[propName] = propValue;
        return;
    }

    if (!isObject(node[propName])) {
        node[propName] = {};
    }

    var replacer = propName === "style" ? "" : undefined;

    for (var k in propValue) {
        var value = propValue[k];
        node[propName][k] = value === undefined ? replacer : value;
    }
}

function getPrototype(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value);
    } else if (value.__proto__) {
        return value.__proto__;
    } else if (value.constructor) {
        return value.constructor.prototype;
    }
}

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var document = __webpack_require__(67);

var applyProperties = __webpack_require__(101);

var isVNode = __webpack_require__(19);
var isVText = __webpack_require__(40);
var isWidget = __webpack_require__(10);
var handleThunk = __webpack_require__(103);

module.exports = createElement;

function createElement(vnode, opts) {
    var doc = opts ? opts.document || document : document;
    var warn = opts ? opts.warn : null;

    vnode = handleThunk(vnode).a;

    if (isWidget(vnode)) {
        return vnode.init();
    } else if (isVText(vnode)) {
        return doc.createTextNode(vnode.text);
    } else if (!isVNode(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode);
        }
        return null;
    }

    var node = vnode.namespace === null ? doc.createElement(vnode.tagName) : doc.createElementNS(vnode.namespace, vnode.tagName);

    var props = vnode.properties;
    applyProperties(node, props);

    var children = vnode.children;

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts);
        if (childNode) {
            node.appendChild(childNode);
        }
    }

    return node;
}

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isVNode = __webpack_require__(19);
var isVText = __webpack_require__(40);
var isWidget = __webpack_require__(10);
var isThunk = __webpack_require__(38);

module.exports = handleThunk;

function handleThunk(a, b) {
    var renderedA = a;
    var renderedB = b;

    if (isThunk(b)) {
        renderedB = renderThunk(b, a);
    }

    if (isThunk(a)) {
        renderedA = renderThunk(a, null);
    }

    return {
        a: renderedA,
        b: renderedB
    };
}

function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode;

    if (!renderedThunk) {
        renderedThunk = thunk.vnode = thunk.render(previous);
    }

    if (!(isVNode(renderedThunk) || isVText(renderedThunk) || isWidget(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
    }

    return renderedThunk;
}

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var version = __webpack_require__(20);
var isVNode = __webpack_require__(19);
var isWidget = __webpack_require__(10);
var isThunk = __webpack_require__(38);
var isVHook = __webpack_require__(39);

module.exports = VirtualNode;

var noProperties = {};
var noChildren = [];

function VirtualNode(tagName, properties, children, key, namespace) {
    this.tagName = tagName;
    this.properties = properties || noProperties;
    this.children = children || noChildren;
    this.key = key != null ? String(key) : undefined;
    this.namespace = typeof namespace === "string" ? namespace : null;

    var count = children && children.length || 0;
    var descendants = 0;
    var hasWidgets = false;
    var hasThunks = false;
    var descendantHooks = false;
    var hooks;

    for (var propName in properties) {
        if (properties.hasOwnProperty(propName)) {
            var property = properties[propName];
            if (isVHook(property) && property.unhook) {
                if (!hooks) {
                    hooks = {};
                }

                hooks[propName] = property;
            }
        }
    }

    for (var i = 0; i < count; i++) {
        var child = children[i];
        if (isVNode(child)) {
            descendants += child.count || 0;

            if (!hasWidgets && child.hasWidgets) {
                hasWidgets = true;
            }

            if (!hasThunks && child.hasThunks) {
                hasThunks = true;
            }

            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
                descendantHooks = true;
            }
        } else if (!hasWidgets && isWidget(child)) {
            if (typeof child.destroy === "function") {
                hasWidgets = true;
            }
        } else if (!hasThunks && isThunk(child)) {
            hasThunks = true;
        }
    }

    this.count = count + descendants;
    this.hasWidgets = hasWidgets;
    this.hasThunks = hasThunks;
    this.hooks = hooks;
    this.descendantHooks = descendantHooks;
}

VirtualNode.prototype.version = version;
VirtualNode.prototype.type = "VirtualNode";

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var version = __webpack_require__(20);

VirtualPatch.NONE = 0;
VirtualPatch.VTEXT = 1;
VirtualPatch.VNODE = 2;
VirtualPatch.WIDGET = 3;
VirtualPatch.PROPS = 4;
VirtualPatch.ORDER = 5;
VirtualPatch.INSERT = 6;
VirtualPatch.REMOVE = 7;
VirtualPatch.THUNK = 8;

module.exports = VirtualPatch;

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type);
    this.vNode = vNode;
    this.patch = patch;
}

VirtualPatch.prototype.version = version;
VirtualPatch.prototype.type = "VirtualPatch";

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var version = __webpack_require__(20);

module.exports = VirtualText;

function VirtualText(text) {
    this.text = String(text);
}

VirtualText.prototype.version = version;
VirtualText.prototype.type = "VirtualText";

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _each2 = __webpack_require__(4);

var _each3 = _interopRequireDefault(_each2);

exports.recurseDown = recurseDown;

var _treenode = __webpack_require__(24);

var _treenodes = __webpack_require__(25);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base recursion function for a collection or node.
 *
 * Returns false if execution should cease.
 *
 * @private
 * @param {TreeNode|TreeNodes} obj Node or collection.
 * @param {function} iteratee Iteratee function
 * @return {boolean} Cease iteration.
 */
function recurseDown(obj, iteratee) {
    var res;

    if (obj instanceof _treenodes.TreeNodes) {
        (0, _each3.default)(obj, function (node) {
            res = recurseDown(node, iteratee);

            return res;
        });
    } else if (obj instanceof _treenode.TreeNode) {
        res = iteratee(obj);

        // Recurse children
        if (res !== false && obj.hasChildren()) {
            res = recurseDown(obj.children, iteratee);
        }
    }

    return res;
}

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
;!function (undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {
      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      this._maxListeners = conf.maxListeners !== undefined ? conf.maxListeners : defaultMaxListeners;

      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this.newListener = conf.newListener);
      conf.verboseMemoryLeak && (this.verboseMemoryLeak = conf.verboseMemoryLeak);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    } else {
      this._maxListeners = defaultMaxListeners;
    }
  }

  function logPossibleMemoryLeak(count, eventName) {
    var errorMsg = '(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.';

    if (this.verboseMemoryLeak) {
      errorMsg += ' Event name: %s.';
      console.error(errorMsg, count, eventName);
    } else {
      console.error(errorMsg, count);
    }

    if (console.trace) {
      console.trace();
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this.newListener = false;
    this.verboseMemoryLeak = false;
    configure.call(this, conf);
  }
  EventEmitter.EventEmitter2 = EventEmitter; // backwards compatibility for exporting EventEmitter property

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners = [],
        leaf,
        len,
        branch,
        xTree,
        xxTree,
        isolatedBranch,
        endReached,
        typeLength = type.length,
        currentType = type[i],
        nextType = type[i + 1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if (currentType === '*' || currentType === '**' || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i + 1));
          }
        }
        return listeners;
      } else if (currentType === '**') {
        endReached = i + 1 === typeLength || i + 2 === typeLength && nextType === '*';
        if (endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if (branch === '*' || branch === '**') {
              if (tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if (branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i + 2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i + 1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i + 1);
    }

    xxTree = tree['**'];
    if (xxTree) {
      if (i < typeLength) {
        if (xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for (branch in xxTree) {
          if (branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if (branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i + 2);
            } else if (branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i + 1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i + 1);
            }
          }
        }
      } else if (xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if (xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for (var i = 0, len = type.length; i + 1 < len; i++) {
      if (type[i] === '**' && type[i + 1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name !== undefined) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        } else {
          if (typeof tree._listeners === 'function') {
            tree._listeners = [tree._listeners];
          }

          tree._listeners.push(listener);

          if (!tree._listeners.warned && this._maxListeners > 0 && tree._listeners.length > this._maxListeners) {
            tree._listeners.warned = true;
            logPossibleMemoryLeak.call(this, tree._listeners.length, name);
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function (n) {
    if (n !== undefined) {
      this._maxListeners = n;
      if (!this._conf) this._conf = {};
      this._conf.maxListeners = n;
    }
  };

  EventEmitter.prototype.event = '';

  EventEmitter.prototype.once = function (event, fn) {
    return this._once(event, fn, false);
  };

  EventEmitter.prototype.prependOnceListener = function (event, fn) {
    return this._once(event, fn, true);
  };

  EventEmitter.prototype._once = function (event, fn, prepend) {
    this._many(event, 1, fn, prepend);
    return this;
  };

  EventEmitter.prototype.many = function (event, ttl, fn) {
    return this._many(event, ttl, fn, false);
  };

  EventEmitter.prototype.prependMany = function (event, ttl, fn) {
    return this._many(event, ttl, fn, true);
  };

  EventEmitter.prototype._many = function (event, ttl, fn, prepend) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      return fn.apply(this, arguments);
    }

    listener._origin = fn;

    this._on(event, listener, prepend);

    return self;
  };

  EventEmitter.prototype.emit = function () {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) {
        return false;
      }
    }

    var al = arguments.length;
    var args, l, i, j;
    var handler;

    if (this._all && this._all.length) {
      handler = this._all.slice();
      if (al > 3) {
        args = new Array(al);
        for (j = 0; j < al; j++) {
          args[j] = arguments[j];
        }
      }

      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
          case 1:
            handler[i].call(this, type);
            break;
          case 2:
            handler[i].call(this, type, arguments[1]);
            break;
          case 3:
            handler[i].call(this, type, arguments[1], arguments[2]);
            break;
          default:
            handler[i].apply(this, args);
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
      if (typeof handler === 'function') {
        this.event = type;
        switch (al) {
          case 1:
            handler.call(this);
            break;
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          default:
            args = new Array(al - 1);
            for (j = 1; j < al; j++) {
              args[j - 1] = arguments[j];
            }handler.apply(this, args);
        }
        return true;
      } else if (handler) {
        // need to make copy of handlers because list can change in the middle
        // of emit call
        handler = handler.slice();
      }
    }

    if (handler && handler.length) {
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) {
          args[j - 1] = arguments[j];
        }
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
          case 1:
            handler[i].call(this);
            break;
          case 2:
            handler[i].call(this, arguments[1]);
            break;
          case 3:
            handler[i].call(this, arguments[1], arguments[2]);
            break;
          default:
            handler[i].apply(this, args);
        }
      }
      return true;
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }

    return !!this._all;
  };

  EventEmitter.prototype.emitAsync = function () {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) {
        return Promise.resolve([false]);
      }
    }

    var promises = [];

    var al = arguments.length;
    var args, l, i, j;
    var handler;

    if (this._all) {
      if (al > 3) {
        args = new Array(al);
        for (j = 1; j < al; j++) {
          args[j] = arguments[j];
        }
      }
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        switch (al) {
          case 1:
            promises.push(this._all[i].call(this, type));
            break;
          case 2:
            promises.push(this._all[i].call(this, type, arguments[1]));
            break;
          case 3:
            promises.push(this._all[i].call(this, type, arguments[1], arguments[2]));
            break;
          default:
            promises.push(this._all[i].apply(this, args));
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      switch (al) {
        case 1:
          promises.push(handler.call(this));
          break;
        case 2:
          promises.push(handler.call(this, arguments[1]));
          break;
        case 3:
          promises.push(handler.call(this, arguments[1], arguments[2]));
          break;
        default:
          args = new Array(al - 1);
          for (j = 1; j < al; j++) {
            args[j - 1] = arguments[j];
          }promises.push(handler.apply(this, args));
      }
    } else if (handler && handler.length) {
      handler = handler.slice();
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) {
          args[j - 1] = arguments[j];
        }
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
          case 1:
            promises.push(handler[i].call(this));
            break;
          case 2:
            promises.push(handler[i].call(this, arguments[1]));
            break;
          case 3:
            promises.push(handler[i].call(this, arguments[1], arguments[2]));
            break;
          default:
            promises.push(handler[i].apply(this, args));
        }
      }
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        return Promise.reject(arguments[1]); // Unhandled 'error' event
      } else {
        return Promise.reject("Uncaught, unspecified 'error' event.");
      }
    }

    return Promise.all(promises);
  };

  EventEmitter.prototype.on = function (type, listener) {
    return this._on(type, listener, false);
  };

  EventEmitter.prototype.prependListener = function (type, listener) {
    return this._on(type, listener, true);
  };

  EventEmitter.prototype.onAny = function (fn) {
    return this._onAny(fn, false);
  };

  EventEmitter.prototype.prependAny = function (fn) {
    return this._onAny(fn, true);
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype._onAny = function (fn, prepend) {
    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if (!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    if (prepend) {
      this._all.unshift(fn);
    } else {
      this._all.push(fn);
    }

    return this;
  };

  EventEmitter.prototype._on = function (type, listener, prepend) {
    if (typeof type === 'function') {
      this._onAny(type, listener);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    this.emit('newListener', type, listener);

    if (this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    } else {
      if (typeof this._events[type] === 'function') {
        // Change to array.
        this._events[type] = [this._events[type]];
      }

      // If we've already got an array, just add
      if (prepend) {
        this._events[type].unshift(listener);
      } else {
        this._events[type].push(listener);
      }

      // Check for listener leak
      if (!this._events[type].warned && this._maxListeners > 0 && this._events[type].length > this._maxListeners) {
        this._events[type].warned = true;
        logPossibleMemoryLeak.call(this, this._events[type].length, type);
      }
    }

    return this;
  };

  EventEmitter.prototype.off = function (type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,
        leafs = [];

    if (this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    } else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({ _listeners: handlers });
    }

    for (var iLeaf = 0; iLeaf < leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener || handlers[i].listener && handlers[i].listener === listener || handlers[i]._origin && handlers[i]._origin === listener) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if (this.wildcard) {
          leaf._listeners.splice(position, 1);
        } else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if (this.wildcard) {
            delete leaf._listeners;
          } else {
            delete this._events[type];
          }
        }

        this.emit("removeListener", type, listener);

        return this;
      } else if (handlers === listener || handlers.listener && handlers.listener === listener || handlers._origin && handlers._origin === listener) {
        if (this.wildcard) {
          delete leaf._listeners;
        } else {
          delete this._events[type];
        }

        this.emit("removeListener", type, listener);
      }
    }

    function recursivelyGarbageCollect(root) {
      if (root === undefined) {
        return;
      }
      var keys = Object.keys(root);
      for (var i in keys) {
        var key = keys[i];
        var obj = root[key];
        if (obj instanceof Function || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== "object" || obj === null) continue;
        if (Object.keys(obj).length > 0) {
          recursivelyGarbageCollect(root[key]);
        }
        if (Object.keys(obj).length === 0) {
          delete root[key];
        }
      }
    }
    recursivelyGarbageCollect(this.listenerTree);

    return this;
  };

  EventEmitter.prototype.offAny = function (fn) {
    var i = 0,
        l = 0,
        fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for (i = 0, l = fns.length; i < l; i++) {
        if (fn === fns[i]) {
          fns.splice(i, 1);
          this.emit("removeListenerAny", fn);
          return this;
        }
      }
    } else {
      fns = this._all;
      for (i = 0, l = fns.length; i < l; i++) {
        this.emit("removeListenerAny", fns[i]);
      }this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function (type) {
    if (arguments.length === 0) {
      !this._events || init.call(this);
      return this;
    }

    if (this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf = 0; iLeaf < leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    } else if (this._events) {
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function (type) {
    if (this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.eventNames = function () {
    return Object.keys(this._events);
  };

  EventEmitter.prototype.listenerCount = function (type) {
    return this.listeners(type).length;
  };

  EventEmitter.prototype.listenersAny = function () {

    if (this._all) {
      return this._all;
    } else {
      return [];
    }
  };

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return EventEmitter;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    // CommonJS
    module.exports = EventEmitter;
  } else {
    // Browser global.
    window.EventEmitter2 = EventEmitter;
  }
}();

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// removed by extract-text-webpack-plugin


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apply = __webpack_require__(27),
    assignInWith = __webpack_require__(187),
    baseRest = __webpack_require__(13),
    customDefaultsAssignIn = __webpack_require__(162);

/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaultsDeep
 * @example
 *
 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var defaults = baseRest(function (args) {
  args.push(undefined, customDefaultsAssignIn);
  return apply(assignInWith, undefined, args);
});

module.exports = defaults;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apply = __webpack_require__(27),
    baseRest = __webpack_require__(13),
    customDefaultsMerge = __webpack_require__(163),
    mergeWith = __webpack_require__(199);

/**
 * This method is like `_.defaults` except that it recursively assigns
 * default properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaults
 * @example
 *
 * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
 * // => { 'a': { 'b': 2, 'c': 3 } }
 */
var defaultsDeep = baseRest(function (args) {
  args.push(undefined, customDefaultsMerge);
  return apply(mergeWith, undefined, args);
});

module.exports = defaultsDeep;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseDifference = __webpack_require__(131),
    baseFlatten = __webpack_require__(75),
    baseRest = __webpack_require__(13),
    isArrayLikeObject = __webpack_require__(94);

/**
 * Creates an array of `array` values not included in the other given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * **Note:** Unlike `_.pullAll`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...Array} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.without, _.xor
 * @example
 *
 * _.difference([2, 1], [2, 3]);
 * // => [1]
 */
var difference = baseRest(function (array, values) {
    return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true)) : [];
});

module.exports = difference;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Gets the first element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias first
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the first element of `array`.
 * @example
 *
 * _.head([1, 2, 3]);
 * // => 1
 *
 * _.head([]);
 * // => undefined
 */
function head(array) {
  return array && array.length ? array[0] : undefined;
}

module.exports = head;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIsRegExp = __webpack_require__(136),
    baseUnary = __webpack_require__(49),
    nodeUtil = __webpack_require__(182);

/* Node.js helper references. */
var nodeIsRegExp = nodeUtil && nodeUtil.isRegExp;

/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 * @example
 *
 * _.isRegExp(/abc/);
 * // => true
 *
 * _.isRegExp('/abc/');
 * // => false
 */
var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

module.exports = isRegExp;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseSlice = __webpack_require__(48);

/**
 * Gets all but the first element of `array`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.tail([1, 2, 3]);
 * // => [2, 3]
 */
function tail(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseSlice(array, 1, length) : [];
}

module.exports = tail;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Libs

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isArrayLike2 = __webpack_require__(2);

var _isArrayLike3 = _interopRequireDefault(_isArrayLike2);

var _invoke2 = __webpack_require__(196);

var _invoke3 = _interopRequireDefault(_invoke2);

var _isObject2 = __webpack_require__(1);

var _isObject3 = _interopRequireDefault(_isObject2);

var _get2 = __webpack_require__(42);

var _get3 = _interopRequireDefault(_get2);

var _slice2 = __webpack_require__(97);

var _slice3 = _interopRequireDefault(_slice2);

var _map2 = __webpack_require__(43);

var _map3 = _interopRequireDefault(_map2);

var _isArray2 = __webpack_require__(0);

var _isArray3 = _interopRequireDefault(_isArray2);

var _isString2 = __webpack_require__(23);

var _isString3 = _interopRequireDefault(_isString2);

var _transform2 = __webpack_require__(65);

var _transform3 = _interopRequireDefault(_transform2);

var _throttle2 = __webpack_require__(205);

var _throttle3 = _interopRequireDefault(_throttle2);

var _ceil2 = __webpack_require__(188);

var _ceil3 = _interopRequireDefault(_ceil2);

var _isEmpty2 = __webpack_require__(63);

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _identity2 = __webpack_require__(34);

var _identity3 = _interopRequireDefault(_identity2);

var _pickBy2 = __webpack_require__(201);

var _pickBy3 = _interopRequireDefault(_pickBy2);

var _each2 = __webpack_require__(4);

var _each3 = _interopRequireDefault(_each2);

var _isFunction2 = __webpack_require__(5);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _virtualDom = __webpack_require__(215);

var _DOMReference = __webpack_require__(227);

var _uuid = __webpack_require__(98);

var _uuid2 = _interopRequireDefault(_uuid);

var _VCache = __webpack_require__(229);

var _VArrayDirtyCompare = __webpack_require__(228);

var _VStateCompare = __webpack_require__(230);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Helper method to create an object for a new node.
 *
 * @private
 * @return {void}
 */
function blankNode() {
    return {
        text: 'New Node',
        itree: {
            state: {
                editing: true,
                focused: true
            }
        }
    };
}

/**
 * Default InspireTree rendering logic.
 *
 * @category DOM
 * @return {InspireDOM} Default renderer.
 */

var InspireDOM = function () {
    function InspireDOM(tree) {
        _classCallCheck(this, InspireDOM);

        // Init properties
        this._tree = tree;
        this.batching = 0;
        this.dropTargets = [];
        this.$scrollLayer;

        // Cache because we use in loops
        this.isDynamic = (0, _isFunction3.default)(this._tree.config.data);
        this.contextMenuChoices = this._tree.config.contextMenu;
    }

    /**
     * Apply pending data changes to the DOM.
     *
     * Will skip rendering as long as any calls
     * to `batch` have yet to be resolved,
     *
     * @category DOM
     * @private
     * @return {void}
     */


    _createClass(InspireDOM, [{
        key: 'applyChanges',
        value: function applyChanges() {
            // Never rerender when until batch complete
            if (this.batching > 0) {
                return;
            }

            this.renderNodes();
        }

        /**
         * Attaches to the DOM element for rendering.
         *
         * @category DOM
         * @private
         * @param {HTMLElement} target Element, selector, or jQuery-like object.
         * @return {void}
         */

    }, {
        key: 'attach',
        value: function attach(target) {
            var dom = this;
            dom.$target = dom.getElement(target);
            dom.$scrollLayer = dom.getScrollableAncestor(dom.$target);

            if (!dom.$target) {
                throw new Error('No valid element to attach to.');
            }

            // Set classnames
            var classNames = dom.$target.className.split(' ');
            classNames.push('inspire-tree');

            if (dom._tree.config.editable) {
                classNames.push('editable');

                (0, _each3.default)((0, _pickBy3.default)(dom._tree.config.editing, _identity3.default), function (v, key) {
                    classNames.push('editable-' + key);
                });
            }

            dom.$target.className = classNames.join(' ');
            dom.$target.setAttribute('tabindex', dom._tree.config.tabindex || 0);

            // Handle keyboard interaction
            dom.$target.addEventListener('keyup', dom.keyboardListener.bind(dom));

            if (dom.contextMenuChoices) {
                document.body.addEventListener('click', function () {
                    dom.closeContextMenu();
                });
            }

            var dragTargetSelectors = dom._tree.config.dragTargets;
            if (!(0, _isEmpty3.default)(dragTargetSelectors)) {
                (0, _each3.default)(dragTargetSelectors, function (selector) {
                    var dropTarget = dom.getElement(selector);

                    if (dropTarget) {
                        dom.dropTargets.push(dropTarget);
                    } else {
                        throw new Error('No valid element found for drop target ' + selector);
                    }
                });
            }

            dom.isDragDropEnabled = dom.dropTargets.length > 0;

            if (dom.isDragDropEnabled) {
                document.addEventListener('mouseup', dom.mouseUpListener.bind(dom));
                document.addEventListener('mousemove', dom.mouseMoveListener.bind(dom));
            }

            // Sync browser focus to focus state
            dom._tree.on('node.focused', function (node) {
                var elem = node.itree.ref.node.querySelector('.title');
                if (elem !== document.activeElement) {
                    elem.focus();
                }
            });

            if (this._tree.config.dom.deferredRendering || this._tree.config.deferredLoading) {
                // Force valid pagination limit
                var limit = this._tree.config.pagination.limit;
                this._tree.config.pagination.limit = limit > 0 ? limit : (0, _ceil3.default)(this.$scrollLayer.clientHeight / this._tree.config.dom.nodeHeight);

                // Set pagination limits
                this.pagination = {
                    limit: this._tree.config.pagination.limit
                };

                // Listen for scrolls for automatic loading
                if (this._tree.config.dom.autoLoadMore) {
                    this.$target.addEventListener('scroll', (0, _throttle3.default)(this.scrollListener.bind(this), 20));
                }
            }

            dom.$target.inspireTree = dom._tree;
        }

        /**
         * Disable rendering in preparation for multiple changes.
         *
         * @category DOM
         * @private
         * @return {void}
         */

    }, {
        key: 'batch',
        value: function batch() {
            if (this.batching < 0) {
                this.batching = 0;
            }

            this.batching++;
        }

        /**
         * Clear page text selection, primarily after a click event which
         * natively selects a range of text.
         *
         * @category DOM
         * @private
         * @return {void}
         */

    }, {
        key: 'clearSelection',
        value: function clearSelection() {
            if (document.selection && document.selection.empty) {
                document.selection.empty();
            } else if (window.getSelection) {
                window.getSelection().removeAllRanges();
            }
        }

        /**
         * Closes any open context menu.
         *
         * @category DOM
         * @private
         * @return {void}
         */

    }, {
        key: 'closeContextMenu',
        value: function closeContextMenu() {
            if (this.contextMenuNode) {
                this.contextMenuNode.parentNode.removeChild(this.contextMenuNode);
                this.contextMenuNode = null;
            }
        }

        /**
         * Creates a tri-state checkbox input.
         *
         * @param {TreeNode} node Node object.
         * @return {object} Input node element.
         */

    }, {
        key: 'createCheckbox',
        value: function createCheckbox(node) {
            var dom = this;

            return new _VCache.VCache({
                checked: node.checked(),
                indeterminate: node.indeterminate()
            }, _VStateCompare.VStateCompare, function () {
                return (0, _virtualDom.h)('input', {
                    attributes: {
                        type: 'checkbox'
                    },
                    checked: node.checked(),
                    indeterminate: node.indeterminate(),
                    onclick: function onclick(event) {
                        // Define our default handler
                        var handler = function handler() {
                            node.toggleCheck();
                        };

                        // Emit an event with our forwarded MouseEvent, node, and default handler
                        dom._tree.emit('node.click', event, node, handler);

                        // Unless default is prevented, auto call our default handler
                        if (!event.treeDefaultPrevented) {
                            handler();
                        }
                    }
                }, []);
            });
        }

        /**
         * Creates a context menu unordered list.
         *
         * @private
         * @param {array} choices Array of choice objects.
         * @param {object} node Clicked node.
         * @return {object} Unordered list node.
         */

    }, {
        key: 'createContextMenu',
        value: function createContextMenu(choices, node) {
            var dom = this;

            return (0, _virtualDom.h)('ul.itree-menu', {
                onclick: function onclick(event) {
                    event.stopPropagation();
                }
            }, (0, _transform3.default)(choices, function (contents, choice) {
                contents.push(dom.createContextMenuListItem(choice, node));
            }, []));
        }

        /**
         * Creates a context menu list item.
         *
         * @private
         * @param {object} choice Choice object.
         * @param {object} node Node object.
         * @return {object} List item node.
         */

    }, {
        key: 'createContextMenuListItem',
        value: function createContextMenuListItem(choice, node) {
            var dom = this;

            return (0, _virtualDom.h)('li', [[(0, _virtualDom.h)('a', {
                onclick: function onclick(event) {
                    choice.handler(event, node, dom.closeContextMenu);
                }
            }, choice.text)]]);
        }

        /**
         * Creates a draggable element by cloning a target,
         * registers a listener for mousemove.
         *
         * @private
         * @param {HTMLElement} element DOM Element.
         * @param {Event} event Click event to use.
         * @return {void}
         */

    }, {
        key: 'createDraggableElement',
        value: function createDraggableElement(element, event) {
            this.$dragNode = this.nodeFromTitleDOMElement(element);

            var rect = element.getBoundingClientRect();
            var diffX = event.clientX - rect.left;
            var diffY = event.clientY - rect.top;

            this.dragHandleOffset = { left: diffX, top: diffY };

            this.$dragElement = element.cloneNode(true);
            this.$dragElement.className += ' dragging';
            this.$dragElement.style.top = rect.top + 'px';
            this.$dragElement.style.left = rect.left + 'px';
            this.$target.appendChild(this.$dragElement);
        }

        /**
         * Creates an input field for editing node text.
         *
         * @private
         * @param {TreeNode} node Node object.
         * @return {object} Input element and buttons
         */

    }, {
        key: 'createEditField',
        value: function createEditField(node) {
            var dom = this;

            return new _VCache.VCache({}, _VStateCompare.VStateCompare, function () {
                var input = new _DOMReference.DOMReference();

                var save = function save() {
                    var originalText = node.text;

                    // Update the text
                    node.set('text', input.node.value);

                    // Disable editing and update
                    node.state('editing', false);
                    node.markDirty();
                    dom.applyChanges();

                    if (originalText !== node.text) {
                        dom._tree.emit('node.edited', node, originalText, node.text);
                    }
                };

                return (0, _virtualDom.h)('form', {
                    onsubmit: function onsubmit(event) {
                        event.preventDefault();
                    }
                }, [(0, _virtualDom.h)('input', {
                    ref: input,
                    value: node.text,
                    onclick: function onclick(event) {
                        // Prevent node click event from firing
                        event.stopPropagation();
                    },
                    onkeypress: function onkeypress(event) {
                        if (event.which === 13) {
                            save();
                        }
                    }
                }), (0, _virtualDom.h)('span.btn-group', [(0, _virtualDom.h)('button.btn.icon.icon-check', {
                    attributes: {
                        title: 'Save',
                        type: 'button'
                    },
                    onclick: function onclick(event) {
                        event.stopPropagation();

                        save();
                    }
                }), (0, _virtualDom.h)('button.btn.icon.icon-cross', {
                    attributes: {
                        title: 'Cancel',
                        type: 'button'
                    },
                    onclick: function onclick(event) {
                        event.stopPropagation();

                        node.toggleEditing();
                    }
                })])]);
            });
        }
    }, {
        key: 'createEmptyListItemNode',


        /**
         * Creates a list item node when a dynamic node returns no children.
         *
         * Cannot be clicked or expanded.
         *
         * @private
         * @param {boolean} unloaded If data has yet to load.
         * @return {object} List Item node.
         */
        value: function createEmptyListItemNode(unloaded) {
            return new _VCache.VCache({
                unloaded: unloaded
            }, _VStateCompare.VStateCompare, function () {
                return (0, _virtualDom.h)('ol', [(0, _virtualDom.h)('li.leaf', [(0, _virtualDom.h)('span.title.icon.icon-file-empty.empty', [unloaded ? 'Loading...' : 'No Results'])])]);
            });
        }

        /**
         * Creates a list item node for a specific data node.
         *
         * @private
         * @param {object} node Data node.
         * @return {object} List Item node.
         */

    }, {
        key: 'createListItemNode',
        value: function createListItemNode(node) {
            var dom = this;

            return new _VCache.VCache({
                dirty: node.itree.dirty,
                text: node.text
            }, _VStateCompare.VStateCompare, function () {
                // Mark as rendered
                node.state('rendered', true);

                var attributes = node.itree.li.attributes || {};
                node.itree.ref = new _DOMReference.DOMReference();

                var buttons = [];
                var contents = [];

                // Add inline edit controls
                if (!node.editing() && dom._tree.config.editing.edit) {
                    buttons.push((0, _virtualDom.h)('a.btn.icon.icon-pencil', {
                        attributes: {
                            title: 'Edit this node'
                        },
                        onclick: function onclick(event) {
                            event.stopPropagation();

                            node.toggleEditing();
                        }
                    }));
                }

                if (!node.editing() && dom._tree.config.editing.add) {
                    buttons.push((0, _virtualDom.h)('a.btn.icon.icon-plus', {
                        attributes: {
                            title: 'Add a child node'
                        },
                        onclick: function onclick(event) {
                            event.stopPropagation();

                            node.addChild(blankNode());
                            node.expand();
                        }
                    }));
                }

                if (!node.editing() && dom._tree.config.editing.remove) {
                    buttons.push((0, _virtualDom.h)('a.btn.icon.icon-minus', {
                        attributes: {
                            title: 'Remove this node'
                        },
                        onclick: function onclick(event) {
                            event.stopPropagation();

                            node.remove();
                        }
                    }));
                }

                if (buttons.length) {
                    contents.push((0, _virtualDom.h)('span.btn-group', buttons));
                }

                contents.push(dom.createTitleContainer(node));
                contents.push((0, _virtualDom.h)('div.wholerow'));

                if (node.hasChildren()) {
                    contents.push(dom.createOrderedList(node.children, node));
                } else if (dom.isDynamic && node.children) {
                    if (!node.hasLoadedChildren()) {
                        contents.push(dom.createEmptyListItemNode(true));
                    } else {
                        contents.push(dom.createEmptyListItemNode());
                    }
                }

                // Add classes for any enabled states
                // http://jsperf.com/object-keys-to-classnames
                var classNames = '.';
                var state = node.itree.state;
                (0, _each3.default)(state, function (value, key) {
                    if (state[key]) {
                        classNames += '.' + key;
                    }
                });

                // Inverse and additional classes
                if (!node.hidden() && node.removed()) {
                    classNames += '.hidden';
                }

                if (node.expanded()) {
                    classNames += '.expanded';
                }

                classNames += node.children ? '.folder' : '.leaf';

                // Append any custom class names
                var customClasses = attributes.class || attributes.className;
                if ((0, _isFunction3.default)(customClasses)) {
                    customClasses = customClasses(node);
                }

                // Append content correctly
                if (customClasses) {
                    if ((0, _isString3.default)(customClasses)) {
                        classNames += '.' + customClasses.replace(' ', '.');
                    } else if ((0, _isArray3.default)(customClasses)) {
                        classNames += '.' + customClasses.join('.');
                    }
                }

                // Force internal-use attributes
                attributes['data-uid'] = node.id;

                // Clear dirty bool only after everything has been generated
                node.itree.dirty = false;

                return (0, _virtualDom.h)('li' + classNames, {
                    attributes: attributes,
                    ref: node.itree.ref
                }, contents);
            });
        }

        /**
         * Creates list item nodes for an array of data nodes.
         *
         * @private
         * @param {array} nodes Data nodes.
         * @return {array} Array of List Item nodes.
         */

    }, {
        key: 'createListItemNodes',
        value: function createListItemNodes(nodes) {
            var _this = this;

            return (0, _map3.default)(nodes, function (node) {
                // We can't just remove the node if soft-removed
                // https://github.com/Matt-Esch/virtual-dom/issues/333
                return _this.createListItemNode(node);
            });
        }

        /**
         * Creates a list item node when a dynamic node returns no children.
         *
         * Cannot be clicked or expanded.
         *
         * @private
         * @param {boolean} unloaded If data has yet to load.
         * @return {object} List Item node.
         */

    }, {
        key: 'createLoadingTextNode',
        value: function createLoadingTextNode() {
            return new _VCache.VCache({
                text: (0, _uuid2.default)()
            }, _VStateCompare.VStateCompare, function () {
                return (0, _virtualDom.h)('li.leaf', [(0, _virtualDom.h)('span.title.icon.icon-more', ['Loading...'])]);
            });
        }

        /**
         * Creates an anchor that loads more nodes when clicked.
         *
         * Cannot be selected or expanded.
         *
         * @private
         * @param {TreeNode} context Parent node or undefined for root.
         * @return {object} List Item node.
         */

    }, {
        key: 'createLoadMoreNode',
        value: function createLoadMoreNode(context) {
            var dom = this;

            return new _VCache.VCache({
                text: (0, _uuid2.default)()
            }, _VStateCompare.VStateCompare, function () {
                return (0, _virtualDom.h)('li.leaf.detached', [(0, _virtualDom.h)('a.title.icon.icon-more.load-more', {
                    onclick: function onclick(event) {
                        event.preventDefault();

                        dom.loadMore(context, event);
                    }
                }, ['Load More'])]);
            });
        }

        /**
         * Creates an ordered list containing list item for
         * provided data nodes.
         *
         * @private
         * @param {TreeNodes} nodes Data nodes.
         * @param {TreeNode} context Parent node, if any.
         * @return {object} Oredered List node.
         */

    }, {
        key: 'createOrderedList',
        value: function createOrderedList(nodes, context) {
            var _this2 = this;

            var opts = {};
            var renderNodes = nodes;
            var pagination = this.getContextPagination(context);

            // If rendering deferred, chunk the nodes client-side
            if (this._tree.config.dom.deferredRendering) {
                // Determine the limit. Either for our current context or for the root level
                var limit = pagination.limit || this._tree.config.pagination.limit;

                // Slice the current nodes by this context's pagination
                renderNodes = (0, _slice3.default)(nodes, 0, limit);
            }

            return new _VCache.VCache({
                nodes: renderNodes,
                nodeCount: renderNodes.length,
                loading: this.loading
            }, _VArrayDirtyCompare.VArrayDirtyCompare, function () {
                var contents = [_this2.createListItemNodes(renderNodes)];

                // If deferred rendering and we have nodes remaining, show a Load More... link
                if ((_this2._tree.config.dom.deferredRendering || _this2._tree.config.deferredLoading) && pagination.limit < pagination.total) {
                    if (!_this2.loading) {
                        contents.push(_this2.createLoadMoreNode(context));
                    } else {
                        contents.push(_this2.createLoadingTextNode());
                    }
                }

                return (0, _virtualDom.h)('ol', opts, contents);
            });
        }

        /**
         * Creates an anchor around the node title.
         *
         * @private
         * @param {object} node Node object.
         * @param {boolean} hasOrWillHaveChildren If this node has children.
         * @return {object} Anchor node.
         */

    }, {
        key: 'createTitleAnchor',
        value: function createTitleAnchor(node, hasOrWillHaveChildren) {
            var dom = this;

            return new _VCache.VCache({
                editing: node.editing(),
                expanded: node.expanded(),
                icon: node.itree.icon,
                text: node.text,
                hasOrWillHaveChildren: hasOrWillHaveChildren
            }, _VStateCompare.VStateCompare, function (previous, current) {
                var attributes = node.itree.a.attributes || {};
                var classNames = ['title', 'icon'];

                if (!dom._tree.config.dom.showCheckboxes) {
                    var folder = node.expanded() ? 'icon-folder-open' : 'icon-folder';
                    classNames.push(current.state.icon || (hasOrWillHaveChildren ? folder : 'icon-file-empty'));
                }

                attributes.tabindex = 1;
                attributes.unselectable = 'on';

                var contents = [node.editing() ? dom.createEditField(node) : current.state.text];

                return (0, _virtualDom.h)('a.' + classNames.join('.'), {
                    attributes: attributes,
                    onblur: function onblur() {
                        node.blur();
                    },
                    oncontextmenu: function oncontextmenu(event) {
                        if (dom.contextMenuChoices) {
                            // Define our default handler
                            var handler = function handler() {
                                dom.renderContextMenu(event, node);
                            };

                            // Emit an event with our forwarded MouseEvent, node, and default handler
                            dom._tree.emit('node.contextmenu', event, node, handler);

                            // Unless default is prevented, auto call our default handler
                            if (!event.treeDefaultPrevented) {
                                handler();
                            }
                        }
                    },
                    onclick: function onclick(event) {
                        // Define our default handler
                        var handler = function handler() {
                            event.preventDefault();

                            if (node.editing()) {
                                return;
                            }

                            if (event.metaKey || event.ctrlKey || event.shiftKey) {
                                dom._tree.disableDeselection();
                            }

                            if (event.shiftKey) {
                                dom.clearSelection();

                                var selected = dom._tree.lastSelectedNode();
                                if (selected) {
                                    dom._tree.selectBetween.apply(dom._tree, dom._tree.boundingNodes(selected, node));
                                }
                            }

                            if (node.selected()) {
                                if (!dom._tree.config.selection.disableDirectDeselection) {
                                    node.deselect();
                                }
                            } else {
                                node.select();
                            }

                            dom._tree.enableDeselection();
                        };

                        // Emit an event with our forwarded MouseEvent, node, and default handler
                        dom._tree.emit('node.click', event, node, handler);

                        // Unless default is prevented, auto call our default handler
                        if (!event.treeDefaultPrevented) {
                            handler();
                        }
                    },
                    ondblclick: function ondblclick(event) {
                        // Define our default handler
                        var handler = function handler() {
                            // Clear text selection which occurs on double click
                            dom.clearSelection();

                            node.toggleCollapse();
                        };

                        // Emit an event with our forwarded MouseEvent, node, and default handler
                        dom._tree.emit('node.dblclick', event, node, handler);

                        // Unless default is prevented, auto call our default handler
                        if (!event.treeDefaultPrevented) {
                            handler();
                        }
                    },
                    onfocus: function onfocus() {
                        node.focus();
                    },
                    onmousedown: function onmousedown() {
                        if (dom.isDragDropEnabled) {
                            dom.isMouseHeld = true;
                        }
                    }
                }, contents);
            });
        }

        /**
         * Creates a container element for the title/toggle/icons.
         *
         * @private
         * @param {string} node Node object.
         * @return {object} Container node.
         */

    }, {
        key: 'createTitleContainer',
        value: function createTitleContainer(node) {
            var dom = this;
            var hasVisibleChildren = !dom.isDynamic ? node.hasVisibleChildren() : Boolean(node.children);

            return new _VCache.VCache({
                checked: node.checked(),
                collapsed: node.collapsed(),
                dirty: node.itree.dirty,
                editing: node.editing(),
                hasVisibleChildren: hasVisibleChildren,
                indeterminate: node.indeterminate(),
                selected: node.selected(),
                text: node.text
            }, _VStateCompare.VStateCompare, function () {
                var contents = [];

                if (hasVisibleChildren) {
                    contents.push(dom.createToggleAnchor(node));
                }

                if (dom._tree.config.dom.showCheckboxes) {
                    contents.push(dom.createCheckbox(node));
                }

                contents.push(dom.createTitleAnchor(node, Boolean(node.children)));

                return (0, _virtualDom.h)('div.title-wrap', contents);
            });
        }

        /**
         * Creates an anchor used for expanding and collapsing a node.
         *
         * @private
         * @param {object} node Node object.
         * @return {object} Anchor node.
         */

    }, {
        key: 'createToggleAnchor',
        value: function createToggleAnchor(node) {
            return new _VCache.VCache({
                collapsed: node.collapsed()
            }, _VStateCompare.VStateCompare, function (previous, current) {
                var icon = current.state.collapsed ? '.icon-expand' : '.icon-collapse';

                return (0, _virtualDom.h)('a.toggle.icon' + icon, {
                    onclick: function onclick() {
                        node.toggleCollapse();
                    }
                }, []);
            });
        }

        /**
         * Permit rerendering of batched changes.
         *
         * @category DOM
         * @private
         * @return {void}
         */

    }, {
        key: 'end',
        value: function end() {
            this.batching--;

            if (this.batching === 0) {
                this.applyChanges();
            }
        }

        /**
         * Get the pagination for the given context node, or root if undefined.
         *
         * @param {TreeNode} context Context node.
         * @return {object} Pagination configuration object.
         */

    }, {
        key: 'getContextPagination',
        value: function getContextPagination(context) {
            return context ? (0, _get3.default)(context, 'itree.pagination') : this.pagination;
        }

        /**
         * Get an HTMLElement through various means:
         * An element, jquery object, or a selector.
         *
         * @private
         * @param {mixed} target Element, jQuery selector, selector.
         * @return {HTMLElement} Matching element.
         */

    }, {
        key: 'getElement',
        value: function getElement(target) {
            var $element;

            if (target instanceof HTMLElement) {
                $element = target;
            } else if ((0, _isObject3.default)(target) && (0, _isObject3.default)(target[0])) {
                $element = target[0];
            } else if ((0, _isString3.default)(target)) {
                var match = document.querySelector(target);
                if (match) {
                    $element = match;
                }
            }

            return $element;
        }

        /**
         * Helper method to find a scrollable ancestor element.
         *
         * @param  {HTMLElement} $element Starting element.
         * @return {HTMLElement} Scrollable element.
         */

    }, {
        key: 'getScrollableAncestor',
        value: function getScrollableAncestor($element) {
            if ($element instanceof Element) {
                var style = getComputedStyle($element);
                if (style.overflow !== 'auto' && $element.parentNode) {
                    $element = this.getScrollableAncestor($element.parentNode);
                }
            }

            return $element;
        }

        /**
         * Listen to keyboard event for navigation.
         *
         * @private
         * @param {Event} event Keyboard event.
         * @return {void}
         */

    }, {
        key: 'keyboardListener',
        value: function keyboardListener(event) {
            // Navigation
            var focusedNode = this._tree.focused();
            if (focusedNode) {
                focusedNode = focusedNode[0];
                switch (event.which) {
                    case 40:
                        this.moveFocusDownFrom(focusedNode);
                        break;
                    case 13:
                        focusedNode.toggleSelect();
                        break;
                    case 37:
                        focusedNode.collapse();
                        break;
                    case 39:
                        focusedNode.expand();
                        break;
                    case 38:
                        this.moveFocusUpFrom(focusedNode);
                        break;
                    default:
                }
            }
        }

        /**
         * Loads/renders additional nodes for a given context, or the root.
         *
         * @private
         * @param {TreeNode} context Parent node, or none for root.
         * @param {Event} event Click or scroll event which triggered this call.
         * @return {Promise} Resolves with request results.
         */

    }, {
        key: 'loadMore',
        value: function loadMore(context, event) {
            var _this3 = this;

            if (this.loading) {
                return;
            }

            var pagination = this.getContextPagination(context);
            var promise;

            // Set loading flag, prevents repeat requests
            this.loading = true;
            this.batch();

            // Mark this context as dirty since we'll update text/tree nodes
            (0, _invoke3.default)(context, 'markDirty');

            // Increment the pagination
            pagination.limit += this._tree.config.pagination.limit;

            this._tree.emit('node.paginate', context, pagination, event);

            if (this._tree.config.deferredLoading) {
                if (context) {
                    promise = context.loadChildren();
                } else {
                    promise = this._tree.load(this._tree.config.data);
                }
            } else {
                this.loading = false;
            }

            this.end();

            // Clear the loading flag
            if (this._tree.config.deferredLoading) {
                promise.then(function () {
                    _this3.loading = false;
                    _this3.applyChanges();
                }).catch(function () {
                    this.loading = false;
                    this.applyChanges();
                });
            }

            return promise;
        }

        /**
         * Listener for mouse move events for drag and drop.
         * Is removed automatically on mouse up.
         *
         * @private
         * @param {Event} event Mouse move event.
         * @return {void}
         */

    }, {
        key: 'mouseMoveListener',
        value: function mouseMoveListener(event) {
            if (this.isMouseHeld && !this.$dragElement) {
                this.createDraggableElement(event.target, event);
            } else if (this.$dragElement) {
                event.preventDefault();
                event.stopPropagation();

                var x = event.clientX - this.dragHandleOffset.left;
                var y = event.clientY - this.dragHandleOffset.top;

                this.$dragElement.style.left = x + 'px';
                this.$dragElement.style.top = y + 'px';

                var validTarget;
                (0, _each3.default)(this.dropTargets, function (target) {
                    var rect = target.getBoundingClientRect();

                    if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
                        validTarget = target;
                        return false;
                    }
                });

                // If new target found for the first time
                if (!this.$activeDropTarget && validTarget && validTarget.className.indexOf('itree-active-drop-target') === -1) {
                    validTarget.className += ' itree-active-drop-target';
                }

                this.$activeDropTarget = validTarget;
            }
        }

        /**
         * Handle mouse up events for dragged elements.
         *
         * @return {void}
         */

    }, {
        key: 'mouseUpListener',
        value: function mouseUpListener() {
            this.isMouseHeld = false;

            if (this.$dragElement) {
                this.$dragElement.parentNode.removeChild(this.$dragElement);

                if (this.$activeDropTarget) {
                    var targetIsTree = (0, _isFunction3.default)((0, _get3.default)(this.$activeDropTarget, 'inspireTree.addNode'));

                    // Notify that the node was "dropped out" of this tree
                    this._tree.emit('node.dropout', this.$dragNode, this.$activeDropTarget, targetIsTree);

                    // If drop target supports the addNode method, invoke it
                    if (targetIsTree) {
                        var newNode = this.$activeDropTarget.inspireTree.addNode(this.$dragNode.copyHierarchy().toObject());

                        // Notify that the node was "dropped out"
                        this.$activeDropTarget.inspireTree.emit('node.dropin', newNode);
                    }
                }
            }

            if (this.$activeDropTarget) {
                this.$activeDropTarget.className = this.$activeDropTarget.className.replace('itree-active-drop-target', '');
            }

            this.$dragNode = null;
            this.$dragElement = null;
            this.$activeDropTarget = null;
        }

        /**
         * Move select down the visible tree from a starting node.
         *
         * @private
         * @param {object} startingNode Node object.
         * @return {void}
         */

    }, {
        key: 'moveFocusDownFrom',
        value: function moveFocusDownFrom(startingNode) {
            var next = startingNode.nextVisibleNode();
            if (next) {
                next.focus();
            }
        }

        /**
         * Move select up the visible tree from a starting node.
         *
         * @private
         * @param {object} startingNode Node object.
         * @return {void}
         */

    }, {
        key: 'moveFocusUpFrom',
        value: function moveFocusUpFrom(startingNode) {
            var prev = startingNode.previousVisibleNode();
            if (prev) {
                prev.focus();
            }
        }

        /**
         * Helper method for obtaining the data-uid from a DOM element.
         *
         * @private
         * @param {HTMLElement} element HTML Element.
         * @return {object} Node object
         */

    }, {
        key: 'nodeFromTitleDOMElement',
        value: function nodeFromTitleDOMElement(element) {
            var uid = element.parentNode.parentNode.getAttribute('data-uid');
            return this._tree.node(uid);
        }

        /**
         * Renders a context menu for a given contextmenu click and node.
         *
         * @private
         * @param {object} event Click event.
         * @param {object} node Clicked node object.
         * @return {void}
         */

    }, {
        key: 'renderContextMenu',
        value: function renderContextMenu(event, node) {
            var choices = this.contextMenuChoices;

            if ((0, _isArrayLike3.default)(choices)) {
                event.preventDefault();

                if (!this.contextMenuNode) {
                    var ul = this.createContextMenu(choices, node);
                    this.contextMenuNode = (0, _virtualDom.create)(ul);
                    document.body.appendChild(this.contextMenuNode);
                }

                this.contextMenuNode.style.top = event.clientY + 'px';
                this.contextMenuNode.style.left = event.clientX + 'px';
            }
        }

        /**
         * Triggers rendering for the given node array.
         *
         * @category DOM
         * @private
         * @param {array} nodes Array of node objects.
         * @return {void}
         */

    }, {
        key: 'renderNodes',
        value: function renderNodes(nodes) {
            var _this4 = this;

            if (this.rendering) {
                return;
            }

            this.rendering = true;

            var newOl = this.createOrderedList(nodes || this._tree.nodes());

            if (!this.rootNode) {
                this.rootNode = (0, _virtualDom.create)(newOl);
                this.$target.appendChild(this.rootNode);

                if (this._tree.config.editing.add) {
                    this.$target.appendChild((0, _virtualDom.create)(new _VCache.VCache({}, _VArrayDirtyCompare.VArrayDirtyCompare, function () {
                        return (0, _virtualDom.h)('a.btn.icon.icon-plus', {
                            attributes: {
                                title: 'Add a new root node'
                            },
                            onclick: function onclick() {
                                _this4._tree.focused().blur();

                                _this4._tree.addNode(blankNode());
                            }
                        });
                    })));
                }
            } else {
                var patches = (0, _virtualDom.diff)(this.ol, newOl);
                this.rootNode = (0, _virtualDom.patch)(this.rootNode, patches);
            }

            this.ol = newOl;
            this.rendering = false;
        }
    }, {
        key: 'scrollListener',


        /**
         * Listens for scroll events, to automatically trigger
         * Load More links when they're scrolled into view.
         *
         * @category DOM
         * @private
         * @param {Event} event Scroll event.
         * @return {void}
         */
        value: function scrollListener(event) {
            var _this5 = this;

            if (!this.rendering && !this.loading) {
                // Get the bounding rect of the scroll layer
                var rect = this.$scrollLayer.getBoundingClientRect();

                // Find all load-more links
                var links = document.querySelectorAll('.load-more');
                (0, _each3.default)(links, function (link) {
                    // Look for load-more links which overlap our "viewport"
                    var r = link.getBoundingClientRect();
                    var overlap = !(rect.right < r.left || rect.left > r.right || rect.bottom < r.top || rect.top > r.bottom);

                    if (overlap) {
                        // Auto-trigger Load More links
                        var context;

                        var $parent = link.parentNode.parentNode.parentNode;
                        if ($parent.tagName === 'LI') {
                            context = _this5._tree.node($parent.getAttribute('data-uid'));
                        }

                        _this5.loadMore(context, event);
                    }
                });
            }
        }

        /**
         * Scroll the first selected node into view.
         *
         * @category DOM
         * @private
         * @return {void}
         */

    }, {
        key: 'scrollSelectedIntoView',
        value: function scrollSelectedIntoView() {
            var $tree = document.querySelector('.inspire-tree');
            var $selected = $tree.querySelector('.selected');

            if ($selected && this.$scrollLayer) {
                this.$scrollLayer.scrollTop = $selected.offsetTop;
            }
        }
    }]);

    return InspireDOM;
}();

exports.default = InspireDOM;
module.exports = exports['default'];

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */
module.exports = function split(undef) {

  var nativeSplit = String.prototype.split,
      compliantExecNpcg = /()??/.exec("")[1] === undef,

  // NPCG: nonparticipating capturing group
  self;

  self = function self(str, separator, limit) {
    // If `separator` is not a regex, use `nativeSplit`
    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
      return nativeSplit.call(str, separator, limit);
    }
    var output = [],
        flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + ( // Proposed for ES6
    separator.sticky ? "y" : ""),

    // Firefox 3+
    lastLastIndex = 0,

    // Make `global` and avoid `lastIndex` issues by working with a copy
    separator = new RegExp(separator.source, flags + "g"),
        separator2,
        match,
        lastIndex,
        lastLength;
    str += ""; // Type-convert
    if (!compliantExecNpcg) {
      // Doesn't need flags gy, but they don't hurt
      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */
    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
    limit >>> 0; // ToUint32(limit)
    while (match = separator.exec(str)) {
      // `separator.lastIndex` is not reliable cross-browser
      lastIndex = match.index + match[0].length;
      if (lastIndex > lastLastIndex) {
        output.push(str.slice(lastLastIndex, match.index));
        // Fix browsers whose `exec` methods don't consistently return `undefined` for
        // nonparticipating capturing groups
        if (!compliantExecNpcg && match.length > 1) {
          match[0].replace(separator2, function () {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undef) {
                match[i] = undef;
              }
            }
          });
        }
        if (match.length > 1 && match.index < str.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = lastIndex;
        if (output.length >= limit) {
          break;
        }
      }
      if (separator.lastIndex === match.index) {
        separator.lastIndex++; // Avoid an infinite loop
      }
    }
    if (lastLastIndex === str.length) {
      if (lastLength || !separator.test("")) {
        output.push("");
      }
    } else {
      output.push(str.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
  };

  return self;
}();

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var OneVersionConstraint = __webpack_require__(122);

var MY_VERSION = '7';
OneVersionConstraint('ev-store', MY_VERSION);

var hashKey = '__EV_STORE_KEY@' + MY_VERSION;

module.exports = EvStore;

function EvStore(elem) {
    var hash = elem[hashKey];

    if (!hash) {
        hash = elem[hashKey] = {};
    }

    return hash;
}

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

/*global window, global*/

var root = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};

module.exports = Individual;

function Individual(key, value) {
    if (key in root) {
        return root[key];
    }

    root[key] = value;

    return value;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21)))

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Individual = __webpack_require__(121);

module.exports = OneVersion;

function OneVersion(moduleName, version, defaultValue) {
    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
    var enforceKey = key + '_ENFORCE_SINGLETON';

    var versionValue = Individual(enforceKey, version);

    if (versionValue !== version) {
        throw new Error('Can only have one copy of ' + moduleName + '.\n' + 'You already have version ' + versionValue + ' installed.\n' + 'This means you cannot install version ' + version);
    }

    return Individual(key, defaultValue);
}

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var root = __webpack_require__(17);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIndexOf = __webpack_require__(31);

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

module.exports = arrayPush;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var copyObject = __webpack_require__(6),
    keys = __webpack_require__(9);

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var copyObject = __webpack_require__(6),
    keysIn = __webpack_require__(37);

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Stack = __webpack_require__(26),
    arrayEach = __webpack_require__(46),
    assignValue = __webpack_require__(28),
    baseAssign = __webpack_require__(128),
    baseAssignIn = __webpack_require__(129),
    cloneBuffer = __webpack_require__(82),
    copyArray = __webpack_require__(83),
    copySymbols = __webpack_require__(157),
    copySymbolsIn = __webpack_require__(158),
    getAllKeys = __webpack_require__(86),
    getAllKeysIn = __webpack_require__(87),
    getTag = __webpack_require__(52),
    initCloneArray = __webpack_require__(173),
    initCloneByTag = __webpack_require__(174),
    initCloneObject = __webpack_require__(88),
    isArray = __webpack_require__(0),
    isBuffer = __webpack_require__(18),
    isObject = __webpack_require__(1),
    keys = __webpack_require__(9);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function (subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SetCache = __webpack_require__(69),
    arrayIncludes = __webpack_require__(124),
    arrayIncludesWith = __webpack_require__(125),
    arrayMap = __webpack_require__(11),
    baseUnary = __webpack_require__(49),
    cacheHas = __webpack_require__(81);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  } else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer: while (++index < length) {
    var value = array[index],
        computed = iteratee == null ? value : iteratee(value);

    value = comparator || value !== 0 ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    } else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apply = __webpack_require__(27),
    castPath = __webpack_require__(14),
    last = __webpack_require__(96),
    parent = __webpack_require__(91),
    toKey = __webpack_require__(7);

/**
 * The base implementation of `_.invoke` without support for individual
 * method arguments.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the method to invoke.
 * @param {Array} args The arguments to invoke the method with.
 * @returns {*} Returns the result of the invoked method.
 */
function baseInvoke(object, path, args) {
  path = castPath(path, object);
  object = parent(object, path);
  var func = object == null ? object : object[toKey(last(path))];
  return func == null ? undefined : apply(func, object, args);
}

module.exports = baseInvoke;

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Stack = __webpack_require__(26),
    equalArrays = __webpack_require__(165),
    equalByTag = __webpack_require__(166),
    equalObjects = __webpack_require__(167),
    getTag = __webpack_require__(52),
    isArray = __webpack_require__(0),
    isBuffer = __webpack_require__(18),
    isTypedArray = __webpack_require__(36);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Stack = __webpack_require__(26),
    baseIsEqual = __webpack_require__(78);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGetTag = __webpack_require__(12),
    isObjectLike = __webpack_require__(8);

/** `Object#toString` result references. */
var regexpTag = '[object RegExp]';

/**
 * The base implementation of `_.isRegExp` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 */
function baseIsRegExp(value) {
  return isObjectLike(value) && baseGetTag(value) == regexpTag;
}

module.exports = baseIsRegExp;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var overArg = __webpack_require__(32);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIsMatch = __webpack_require__(135),
    getMatchData = __webpack_require__(168),
    matchesStrictComparable = __webpack_require__(90);

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function (object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIsEqual = __webpack_require__(78),
    get = __webpack_require__(42),
    hasIn = __webpack_require__(194),
    isKey = __webpack_require__(55),
    isStrictComparable = __webpack_require__(89),
    matchesStrictComparable = __webpack_require__(90),
    toKey = __webpack_require__(7);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function (object) {
    var objValue = get(object, path);
    return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assignMergeValue = __webpack_require__(71),
    cloneBuffer = __webpack_require__(82),
    cloneTypedArray = __webpack_require__(154),
    copyArray = __webpack_require__(83),
    initCloneObject = __webpack_require__(88),
    isArguments = __webpack_require__(35),
    isArray = __webpack_require__(0),
    isArrayLikeObject = __webpack_require__(94),
    isBuffer = __webpack_require__(18),
    isFunction = __webpack_require__(5),
    isObject = __webpack_require__(1),
    isPlainObject = __webpack_require__(198),
    isTypedArray = __webpack_require__(36),
    toPlainObject = __webpack_require__(207);

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = object[key],
      srcValue = source[key],
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject(objValue) || srcIndex && isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayMap = __webpack_require__(11),
    baseIteratee = __webpack_require__(3),
    baseMap = __webpack_require__(79),
    baseSortBy = __webpack_require__(147),
    baseUnary = __webpack_require__(49),
    compareMultiple = __webpack_require__(156),
    identity = __webpack_require__(34);

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  var index = -1;
  iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(baseIteratee));

  var result = baseMap(collection, function (value, key, collection) {
    var criteria = arrayMap(iteratees, function (iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return baseSortBy(result, function (object, other) {
    return compareMultiple(object, other, orders);
  });
}

module.exports = baseOrderBy;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGet = __webpack_require__(30),
    baseSet = __webpack_require__(146),
    castPath = __webpack_require__(14);

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
    var index = -1,
        length = paths.length,
        result = {};

    while (++index < length) {
        var path = paths[index],
            value = baseGet(object, path);

        if (predicate(value, path)) {
            baseSet(result, castPath(path, object), value);
        }
    }
    return result;
}

module.exports = basePickBy;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function (object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGet = __webpack_require__(30);

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function (object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseUnset = __webpack_require__(150),
    isIndex = __webpack_require__(53);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * The base implementation of `_.pullAt` without support for individual
 * indexes or capturing the removed elements.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {number[]} indexes The indexes of elements to remove.
 * @returns {Array} Returns `array`.
 */
function basePullAt(array, indexes) {
  var length = array ? indexes.length : 0,
      lastIndex = length - 1;

  while (length--) {
    var index = indexes[length];
    if (length == lastIndex || index !== previous) {
      var previous = index;
      if (isIndex(index)) {
        splice.call(array, index, 1);
      } else {
        baseUnset(array, index);
      }
    }
  }
  return array;
}

module.exports = basePullAt;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assignValue = __webpack_require__(28),
    castPath = __webpack_require__(14),
    isIndex = __webpack_require__(53),
    isObject = __webpack_require__(1),
    toKey = __webpack_require__(7);

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

module.exports = baseSet;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

module.exports = baseSortBy;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isSymbol = __webpack_require__(15);

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295,
    MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeFloor = Math.floor,
    nativeMin = Math.min;

/**
 * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
 * which invokes `iteratee` for `value` and each element of `array` to compute
 * their sort ranking. The iteratee is invoked with one argument; (value).
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} iteratee The iteratee invoked per element.
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function baseSortedIndexBy(array, value, iteratee, retHighest) {
  value = iteratee(value);

  var low = 0,
      high = array == null ? 0 : array.length,
      valIsNaN = value !== value,
      valIsNull = value === null,
      valIsSymbol = isSymbol(value),
      valIsUndefined = value === undefined;

  while (low < high) {
    var mid = nativeFloor((low + high) / 2),
        computed = iteratee(array[mid]),
        othIsDefined = computed !== undefined,
        othIsNull = computed === null,
        othIsReflexive = computed === computed,
        othIsSymbol = isSymbol(computed);

    if (valIsNaN) {
      var setLow = retHighest || othIsReflexive;
    } else if (valIsUndefined) {
      setLow = othIsReflexive && (retHighest || othIsDefined);
    } else if (valIsNull) {
      setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
    } else if (valIsSymbol) {
      setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
    } else if (othIsNull || othIsSymbol) {
      setLow = false;
    } else {
      setLow = retHighest ? computed <= value : computed < value;
    }
    if (setLow) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return nativeMin(high, MAX_ARRAY_INDEX);
}

module.exports = baseSortedIndexBy;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Symbol = __webpack_require__(70),
    arrayMap = __webpack_require__(11),
    isArray = __webpack_require__(0),
    isSymbol = __webpack_require__(15);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

module.exports = baseToString;

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var castPath = __webpack_require__(14),
    last = __webpack_require__(96),
    parent = __webpack_require__(91),
    toKey = __webpack_require__(7);

/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset(object, path) {
  path = castPath(path, object);
  object = parent(object, path);
  return object == null || delete object[toKey(last(path))];
}

module.exports = baseUnset;

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayMap = __webpack_require__(11);

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function (key) {
    return object[key];
  });
}

module.exports = baseValues;

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Uint8Array = __webpack_require__(123);

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cloneArrayBuffer = __webpack_require__(153);

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isSymbol = __webpack_require__(15);

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol(other);

    if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
      return 1;
    }
    if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

module.exports = compareAscending;

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var compareAscending = __webpack_require__(155);

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

module.exports = compareMultiple;

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var copyObject = __webpack_require__(6),
    getSymbols = __webpack_require__(170);

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var copyObject = __webpack_require__(6),
    getSymbolsIn = __webpack_require__(171);

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArrayLike = __webpack_require__(2);

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function (collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function (object, iteratee, keysFunc) {
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

module.exports = createBaseFor;

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(16),
    toNumber = __webpack_require__(57),
    toString = __webpack_require__(58);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Creates a function like `_.round`.
 *
 * @private
 * @param {string} methodName The name of the `Math` method to use when rounding.
 * @returns {Function} Returns the new round function.
 */
function createRound(methodName) {
  var func = Math[methodName];
  return function (number, precision) {
    number = toNumber(number);
    precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
    if (precision) {
      // Shift with exponential notation to avoid floating-point issues.
      // See [MDN](https://mdn.io/round#Examples) for more details.
      var pair = (toString(number) + 'e').split('e'),
          value = func(pair[0] + 'e' + (+pair[1] + precision));

      pair = (toString(value) + 'e').split('e');
      return +(pair[0] + 'e' + (+pair[1] - precision));
    }
    return func(number);
  };
}

module.exports = createRound;

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var eq = __webpack_require__(33);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
 * of source objects to the destination object for all destination properties
 * that resolve to `undefined`.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to assign.
 * @param {Object} object The parent object of `objValue`.
 * @returns {*} Returns the value to assign.
 */
function customDefaultsAssignIn(objValue, srcValue, key, object) {
  if (objValue === undefined || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
    return srcValue;
  }
  return objValue;
}

module.exports = customDefaultsAssignIn;

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseMerge = __webpack_require__(80),
    isObject = __webpack_require__(1);

/**
 * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
 * objects into destination objects that are passed thru.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to merge.
 * @param {Object} object The parent object of `objValue`.
 * @param {Object} source The parent object of `srcValue`.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 * @returns {*} Returns the value to assign.
 */
function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
  if (isObject(objValue) && isObject(srcValue)) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, objValue);
    baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
    stack['delete'](srcValue);
  }
  return objValue;
}

module.exports = customDefaultsMerge;

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getNative = __webpack_require__(169);

var defineProperty = function () {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}();

module.exports = defineProperty;

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SetCache = __webpack_require__(69),
    arraySome = __webpack_require__(127),
    cacheHas = __webpack_require__(81);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function (othValue, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

module.exports = eq;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getAllKeys = __webpack_require__(86);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isStrictComparable = __webpack_require__(89),
    keys = __webpack_require__(9);

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
    var result = keys(object),
        length = result.length;

    while (length--) {
        var key = result[length],
            value = object[key];

        result[length] = [key, value, isStrictComparable(value)];
    }
    return result;
}

module.exports = getMatchData;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var castPath = __webpack_require__(14),
    isArguments = __webpack_require__(35),
    isArray = __webpack_require__(0),
    isIndex = __webpack_require__(53),
    isLength = __webpack_require__(95),
    toKey = __webpack_require__(7);

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
}

module.exports = hasPath;

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Symbol = __webpack_require__(70),
    isArguments = __webpack_require__(35),
    isArray = __webpack_require__(0);

/** Built-in value references. */
var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
    return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assocIndexOf = __webpack_require__(29);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assocIndexOf = __webpack_require__(29);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assocIndexOf = __webpack_require__(29);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assocIndexOf = __webpack_require__(29);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var freeGlobal = __webpack_require__(85);

/** Detect free variable `exports`. */
var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = function () {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}();

module.exports = nodeUtil;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(107)(module)))

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apply = __webpack_require__(27);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var memoizeCapped = __webpack_require__(181);

/** Used to match property names within property paths. */
var reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function (string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function (match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});

module.exports = stringToPath;

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assignValue = __webpack_require__(28),
    copyObject = __webpack_require__(6),
    createAssigner = __webpack_require__(50),
    isArrayLike = __webpack_require__(2),
    isPrototype = __webpack_require__(56),
    keys = __webpack_require__(9);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */
var assign = createAssigner(function (object, source) {
  if (isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});

module.exports = assign;

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var copyObject = __webpack_require__(6),
    createAssigner = __webpack_require__(50),
    keysIn = __webpack_require__(37);

/**
 * This method is like `_.assignIn` except that it accepts `customizer`
 * which is invoked to produce the assigned values. If `customizer` returns
 * `undefined`, assignment is handled by the method instead. The `customizer`
 * is invoked with five arguments: (objValue, srcValue, key, object, source).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extendWith
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @see _.assignWith
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   return _.isUndefined(objValue) ? srcValue : objValue;
 * }
 *
 * var defaults = _.partialRight(_.assignInWith, customizer);
 *
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var assignInWith = createAssigner(function (object, source, srcIndex, customizer) {
  copyObject(source, keysIn(source), object, customizer);
});

module.exports = assignInWith;

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createRound = __webpack_require__(161);

/**
 * Computes `number` rounded up to `precision`.
 *
 * @static
 * @memberOf _
 * @since 3.10.0
 * @category Math
 * @param {number} number The number to round up.
 * @param {number} [precision=0] The precision to round up to.
 * @returns {number} Returns the rounded up number.
 * @example
 *
 * _.ceil(4.006);
 * // => 5
 *
 * _.ceil(6.004, 2);
 * // => 6.01
 *
 * _.ceil(6040, -2);
 * // => 6100
 */
var ceil = createRound('ceil');

module.exports = ceil;

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseClone = __webpack_require__(130);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

module.exports = cloneDeep;

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(1),
    now = __webpack_require__(200),
    toNumber = __webpack_require__(57);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createFind = __webpack_require__(84),
    findLastIndex = __webpack_require__(192);

/**
 * This method is like `_.find` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=collection.length-1] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * _.findLast([1, 2, 3, 4], function(n) {
 *   return n % 2 == 1;
 * });
 * // => 3
 */
var findLast = createFind(findLastIndex);

module.exports = findLast;

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseFindIndex = __webpack_require__(74),
    baseIteratee = __webpack_require__(3),
    toInteger = __webpack_require__(16);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * This method is like `_.findIndex` except that it iterates over elements
 * of `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=array.length-1] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ];
 *
 * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
 * // => 2
 *
 * // The `_.matches` iteratee shorthand.
 * _.findLastIndex(users, { 'user': 'barney', 'active': true });
 * // => 0
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findLastIndex(users, ['active', false]);
 * // => 2
 *
 * // The `_.property` iteratee shorthand.
 * _.findLastIndex(users, 'active');
 * // => 0
 */
function findLastIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = length - 1;
  if (fromIndex !== undefined) {
    index = toInteger(fromIndex);
    index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
  }
  return baseFindIndex(array, baseIteratee(predicate, 3), index, true);
}

module.exports = findLastIndex;

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayEach = __webpack_require__(46),
    baseEach = __webpack_require__(73),
    castFunction = __webpack_require__(152),
    isArray = __webpack_require__(0);

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, castFunction(iteratee));
}

module.exports = forEach;

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseHasIn = __webpack_require__(132),
    hasPath = __webpack_require__(172);

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIndexOf = __webpack_require__(31),
    toInteger = __webpack_require__(16);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Gets the index at which the first occurrence of `value` is found in `array`
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. If `fromIndex` is negative, it's used as the
 * offset from the end of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * _.indexOf([1, 2, 1, 2], 2);
 * // => 1
 *
 * // Search from the `fromIndex`.
 * _.indexOf([1, 2, 1, 2], 2, 2);
 * // => 3
 */
function indexOf(array, value, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseIndexOf(array, value, index);
}

module.exports = indexOf;

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseInvoke = __webpack_require__(133),
    baseRest = __webpack_require__(13);

/**
 * Invokes the method at `path` of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the method to invoke.
 * @param {...*} [args] The arguments to invoke the method with.
 * @returns {*} Returns the result of the invoked method.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
 *
 * _.invoke(object, 'a[0].b.c.slice', 1, 3);
 * // => [2, 3]
 */
var invoke = baseRest(baseInvoke);

module.exports = invoke;

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGetTag = __webpack_require__(12),
    isObjectLike = __webpack_require__(8);

/** `Object#toString` result references. */
var numberTag = '[object Number]';

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
 * classified as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
 * @example
 *
 * _.isNumber(3);
 * // => true
 *
 * _.isNumber(Number.MIN_VALUE);
 * // => true
 *
 * _.isNumber(Infinity);
 * // => true
 *
 * _.isNumber('3');
 * // => false
 */
function isNumber(value) {
    return typeof value == 'number' || isObjectLike(value) && baseGetTag(value) == numberTag;
}

module.exports = isNumber;

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGetTag = __webpack_require__(12),
    getPrototype = __webpack_require__(51),
    isObjectLike = __webpack_require__(8);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseMerge = __webpack_require__(80),
    createAssigner = __webpack_require__(50);

/**
 * This method is like `_.merge` except that it accepts `customizer` which
 * is invoked to produce the merged values of the destination and source
 * properties. If `customizer` returns `undefined`, merging is handled by the
 * method instead. The `customizer` is invoked with six arguments:
 * (objValue, srcValue, key, object, source, stack).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   if (_.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * var object = { 'a': [1], 'b': [2] };
 * var other = { 'a': [3], 'b': [4] };
 *
 * _.mergeWith(object, other, customizer);
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */
var mergeWith = createAssigner(function (object, source, srcIndex, customizer) {
  baseMerge(object, source, srcIndex, customizer);
});

module.exports = mergeWith;

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var root = __webpack_require__(17);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function now() {
  return root.Date.now();
};

module.exports = now;

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayMap = __webpack_require__(11),
    baseIteratee = __webpack_require__(3),
    basePickBy = __webpack_require__(142),
    getAllKeysIn = __webpack_require__(87);

/**
 * Creates an object composed of the `object` properties `predicate` returns
 * truthy for. The predicate is invoked with two arguments: (value, key).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The source object.
 * @param {Function} [predicate=_.identity] The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pickBy(object, _.isNumber);
 * // => { 'a': 1, 'c': 3 }
 */
function pickBy(object, predicate) {
  if (object == null) {
    return {};
  }
  var props = arrayMap(getAllKeysIn(object), function (prop) {
    return [prop];
  });
  predicate = baseIteratee(predicate);
  return basePickBy(object, props, function (value, path) {
    return predicate(value, path[0]);
  });
}

module.exports = pickBy;

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseProperty = __webpack_require__(143),
    basePropertyDeep = __webpack_require__(144),
    isKey = __webpack_require__(55),
    toKey = __webpack_require__(7);

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIteratee = __webpack_require__(3),
    basePullAt = __webpack_require__(145);

/**
 * Removes all elements from `array` that `predicate` returns truthy for
 * and returns an array of the removed elements. The predicate is invoked
 * with three arguments: (value, index, array).
 *
 * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
 * to pull elements from an array by value.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new array of removed elements.
 * @example
 *
 * var array = [1, 2, 3, 4];
 * var evens = _.remove(array, function(n) {
 *   return n % 2 == 0;
 * });
 *
 * console.log(array);
 * // => [1, 3]
 *
 * console.log(evens);
 * // => [2, 4]
 */
function remove(array, predicate) {
  var result = [];
  if (!(array && array.length)) {
    return result;
  }
  var index = -1,
      indexes = [],
      length = array.length;

  predicate = baseIteratee(predicate, 3);
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result.push(value);
      indexes.push(index);
    }
  }
  basePullAt(array, indexes);
  return result;
}

module.exports = remove;

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIteratee = __webpack_require__(3),
    baseSortedIndexBy = __webpack_require__(148);

/**
 * This method is like `_.sortedIndex` except that it accepts `iteratee`
 * which is invoked for `value` and each element of `array` to compute their
 * sort ranking. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 *
 * var objects = [{ 'x': 4 }, { 'x': 5 }];
 *
 * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
 * // => 0
 */
function sortedIndexBy(array, value, iteratee) {
  return baseSortedIndexBy(array, value, baseIteratee(iteratee, 2));
}

module.exports = sortedIndexBy;

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var debounce = __webpack_require__(190),
    isObject = __webpack_require__(1);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toNumber = __webpack_require__(57);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var copyObject = __webpack_require__(6),
    keysIn = __webpack_require__(37);

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

module.exports = toPlainObject;

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseValues = __webpack_require__(151),
    keys = __webpack_require__(9);

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object == null ? [] : baseValues(object, keys(object));
}

module.exports = values;

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

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

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Unique ID creation requires a high quality random # generator.  We feature
// detect to determine the best RNG source, normalizing to a function that
// returns 128-bits of randomness, since that's what's usually required
var rng = __webpack_require__(100);
var bytesToUuid = __webpack_require__(99);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [_seedBytes[0] | 0x01, _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0,
    _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var rng = __webpack_require__(100);
var bytesToUuid = __webpack_require__(99);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof options == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createElement = __webpack_require__(102);

module.exports = createElement;

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var diff = __webpack_require__(226);

module.exports = diff;

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var h = __webpack_require__(223);

module.exports = h;

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var diff = __webpack_require__(213);
var patch = __webpack_require__(216);
var h = __webpack_require__(214);
var create = __webpack_require__(212);
var VNode = __webpack_require__(104);
var VText = __webpack_require__(106);

module.exports = {
    diff: diff,
    patch: patch,
    h: h,
    create: create,
    VNode: VNode,
    VText: VText
};

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var patch = __webpack_require__(219);

module.exports = patch;

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
// We don't want to read all of the DOM nodes in the tree so we use
// the in-order tree indexing to eliminate recursion down certain branches.
// We only recurse into a DOM node if we know that it contains a child of
// interest.

var noChild = {};

module.exports = domIndex;

function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || indices.length === 0) {
        return {};
    } else {
        indices.sort(ascending);
        return recurse(rootNode, tree, indices, nodes, 0);
    }
}

function recurse(rootNode, tree, indices, nodes, rootIndex) {
    nodes = nodes || {};

    if (rootNode) {
        if (indexInRange(indices, rootIndex, rootIndex)) {
            nodes[rootIndex] = rootNode;
        }

        var vChildren = tree.children;

        if (vChildren) {

            var childNodes = rootNode.childNodes;

            for (var i = 0; i < tree.children.length; i++) {
                rootIndex += 1;

                var vChild = vChildren[i] || noChild;
                var nextIndex = rootIndex + (vChild.count || 0);

                // skip recursion down the tree if there are no nodes down here
                if (indexInRange(indices, rootIndex, nextIndex)) {
                    recurse(childNodes[i], vChild, indices, nodes, rootIndex);
                }

                rootIndex = nextIndex;
            }
        }
    }

    return nodes;
}

// Binary search for an index in the interval [left, right]
function indexInRange(indices, left, right) {
    if (indices.length === 0) {
        return false;
    }

    var minIndex = 0;
    var maxIndex = indices.length - 1;
    var currentIndex;
    var currentItem;

    while (minIndex <= maxIndex) {
        currentIndex = (maxIndex + minIndex) / 2 >> 0;
        currentItem = indices[currentIndex];

        if (minIndex === maxIndex) {
            return currentItem >= left && currentItem <= right;
        } else if (currentItem < left) {
            minIndex = currentIndex + 1;
        } else if (currentItem > right) {
            maxIndex = currentIndex - 1;
        } else {
            return true;
        }
    }

    return false;
}

function ascending(a, b) {
    return a > b ? 1 : -1;
}

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var applyProperties = __webpack_require__(101);

var isWidget = __webpack_require__(10);
var VPatch = __webpack_require__(105);

var updateWidget = __webpack_require__(220);

module.exports = applyPatch;

function applyPatch(vpatch, domNode, renderOptions) {
    var type = vpatch.type;
    var vNode = vpatch.vNode;
    var patch = vpatch.patch;

    switch (type) {
        case VPatch.REMOVE:
            return removeNode(domNode, vNode);
        case VPatch.INSERT:
            return insertNode(domNode, patch, renderOptions);
        case VPatch.VTEXT:
            return stringPatch(domNode, vNode, patch, renderOptions);
        case VPatch.WIDGET:
            return widgetPatch(domNode, vNode, patch, renderOptions);
        case VPatch.VNODE:
            return vNodePatch(domNode, vNode, patch, renderOptions);
        case VPatch.ORDER:
            reorderChildren(domNode, patch);
            return domNode;
        case VPatch.PROPS:
            applyProperties(domNode, patch, vNode.properties);
            return domNode;
        case VPatch.THUNK:
            return replaceRoot(domNode, renderOptions.patch(domNode, patch, renderOptions));
        default:
            return domNode;
    }
}

function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode;

    if (parentNode) {
        parentNode.removeChild(domNode);
    }

    destroyWidget(domNode, vNode);

    return null;
}

function insertNode(parentNode, vNode, renderOptions) {
    var newNode = renderOptions.render(vNode, renderOptions);

    if (parentNode) {
        parentNode.appendChild(newNode);
    }

    return parentNode;
}

function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode;

    if (domNode.nodeType === 3) {
        domNode.replaceData(0, domNode.length, vText.text);
        newNode = domNode;
    } else {
        var parentNode = domNode.parentNode;
        newNode = renderOptions.render(vText, renderOptions);

        if (parentNode && newNode !== domNode) {
            parentNode.replaceChild(newNode, domNode);
        }
    }

    return newNode;
}

function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    var updating = updateWidget(leftVNode, widget);
    var newNode;

    if (updating) {
        newNode = widget.update(leftVNode, domNode) || domNode;
    } else {
        newNode = renderOptions.render(widget, renderOptions);
    }

    var parentNode = domNode.parentNode;

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode);
    }

    if (!updating) {
        destroyWidget(domNode, leftVNode);
    }

    return newNode;
}

function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode;
    var newNode = renderOptions.render(vNode, renderOptions);

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode);
    }

    return newNode;
}

function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && isWidget(w)) {
        w.destroy(domNode);
    }
}

function reorderChildren(domNode, moves) {
    var childNodes = domNode.childNodes;
    var keyMap = {};
    var node;
    var remove;
    var insert;

    for (var i = 0; i < moves.removes.length; i++) {
        remove = moves.removes[i];
        node = childNodes[remove.from];
        if (remove.key) {
            keyMap[remove.key] = node;
        }
        domNode.removeChild(node);
    }

    var length = childNodes.length;
    for (var j = 0; j < moves.inserts.length; j++) {
        insert = moves.inserts[j];
        node = keyMap[insert.key];
        // this is the weirdest bug i've ever seen in webkit
        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to]);
    }
}

function replaceRoot(oldRoot, newRoot) {
    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
        oldRoot.parentNode.replaceChild(newRoot, oldRoot);
    }

    return newRoot;
}

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var document = __webpack_require__(67);
var isArray = __webpack_require__(59);

var render = __webpack_require__(102);
var domIndex = __webpack_require__(217);
var patchOp = __webpack_require__(218);
module.exports = patch;

function patch(rootNode, patches, renderOptions) {
    renderOptions = renderOptions || {};
    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch ? renderOptions.patch : patchRecursive;
    renderOptions.render = renderOptions.render || render;

    return renderOptions.patch(rootNode, patches, renderOptions);
}

function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches);

    if (indices.length === 0) {
        return rootNode;
    }

    var index = domIndex(rootNode, patches.a, indices);
    var ownerDocument = rootNode.ownerDocument;

    if (!renderOptions.document && ownerDocument !== document) {
        renderOptions.document = ownerDocument;
    }

    for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i];
        rootNode = applyPatch(rootNode, index[nodeIndex], patches[nodeIndex], renderOptions);
    }

    return rootNode;
}

function applyPatch(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
        return rootNode;
    }

    var newNode;

    if (isArray(patchList)) {
        for (var i = 0; i < patchList.length; i++) {
            newNode = patchOp(patchList[i], domNode, renderOptions);

            if (domNode === rootNode) {
                rootNode = newNode;
            }
        }
    } else {
        newNode = patchOp(patchList, domNode, renderOptions);

        if (domNode === rootNode) {
            rootNode = newNode;
        }
    }

    return rootNode;
}

function patchIndices(patches) {
    var indices = [];

    for (var key in patches) {
        if (key !== "a") {
            indices.push(Number(key));
        }
    }

    return indices;
}

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isWidget = __webpack_require__(10);

module.exports = updateWidget;

function updateWidget(a, b) {
    if (isWidget(a) && isWidget(b)) {
        if ("name" in a && "name" in b) {
            return a.id === b.id;
        } else {
            return a.init === b.init;
        }
    }

    return false;
}

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EvStore = __webpack_require__(120);

module.exports = EvHook;

function EvHook(value) {
    if (!(this instanceof EvHook)) {
        return new EvHook(value);
    }

    this.value = value;
}

EvHook.prototype.hook = function (node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = this.value;
};

EvHook.prototype.unhook = function (node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = undefined;
};

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = SoftSetHook;

function SoftSetHook(value) {
    if (!(this instanceof SoftSetHook)) {
        return new SoftSetHook(value);
    }

    this.value = value;
}

SoftSetHook.prototype.hook = function (node, propertyName) {
    if (node[propertyName] !== this.value) {
        node[propertyName] = this.value;
    }
};

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = __webpack_require__(59);

var VNode = __webpack_require__(104);
var VText = __webpack_require__(106);
var isVNode = __webpack_require__(19);
var isVText = __webpack_require__(40);
var isWidget = __webpack_require__(10);
var isHook = __webpack_require__(39);
var isVThunk = __webpack_require__(38);

var parseTag = __webpack_require__(224);
var softSetHook = __webpack_require__(222);
var evHook = __webpack_require__(221);

module.exports = h;

function h(tagName, properties, children) {
    var childNodes = [];
    var tag, props, key, namespace;

    if (!children && isChildren(properties)) {
        children = properties;
        props = {};
    }

    props = props || properties || {};
    tag = parseTag(tagName, props);

    // support keys
    if (props.hasOwnProperty('key')) {
        key = props.key;
        props.key = undefined;
    }

    // support namespace
    if (props.hasOwnProperty('namespace')) {
        namespace = props.namespace;
        props.namespace = undefined;
    }

    // fix cursor bug
    if (tag === 'INPUT' && !namespace && props.hasOwnProperty('value') && props.value !== undefined && !isHook(props.value)) {
        props.value = softSetHook(props.value);
    }

    transformProperties(props);

    if (children !== undefined && children !== null) {
        addChild(children, childNodes, tag, props);
    }

    return new VNode(tag, props, childNodes, key, namespace);
}

function addChild(c, childNodes, tag, props) {
    if (typeof c === 'string') {
        childNodes.push(new VText(c));
    } else if (typeof c === 'number') {
        childNodes.push(new VText(String(c)));
    } else if (isChild(c)) {
        childNodes.push(c);
    } else if (isArray(c)) {
        for (var i = 0; i < c.length; i++) {
            addChild(c[i], childNodes, tag, props);
        }
    } else if (c === null || c === undefined) {
        return;
    } else {
        throw UnexpectedVirtualElement({
            foreignObject: c,
            parentVnode: {
                tagName: tag,
                properties: props
            }
        });
    }
}

function transformProperties(props) {
    for (var propName in props) {
        if (props.hasOwnProperty(propName)) {
            var value = props[propName];

            if (isHook(value)) {
                continue;
            }

            if (propName.substr(0, 3) === 'ev-') {
                // add ev-foo support
                props[propName] = evHook(value);
            }
        }
    }
}

function isChild(x) {
    return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
}

function isChildren(x) {
    return typeof x === 'string' || isArray(x) || isChild(x);
}

function UnexpectedVirtualElement(data) {
    var err = new Error();

    err.type = 'virtual-hyperscript.unexpected.virtual-element';
    err.message = 'Unexpected virtual child passed to h().\n' + 'Expected a VNode / Vthunk / VWidget / string but:\n' + 'got:\n' + errorString(data.foreignObject) + '.\n' + 'The parent vnode is:\n' + errorString(data.parentVnode);
    '\n' + 'Suggested fix: change your `h(..., [ ... ])` callsite.';
    err.foreignObject = data.foreignObject;
    err.parentVnode = data.parentVnode;

    return err;
}

function errorString(obj) {
    try {
        return JSON.stringify(obj, null, '    ');
    } catch (e) {
        return String(obj);
    }
}

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var split = __webpack_require__(119);

var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
var notClassId = /^\.|#/;

module.exports = parseTag;

function parseTag(tag, props) {
    if (!tag) {
        return 'DIV';
    }

    var noId = !props.hasOwnProperty('id');

    var tagParts = split(tag, classIdSplit);
    var tagName = null;

    if (notClassId.test(tagParts[1])) {
        tagName = 'DIV';
    }

    var classes, part, type, i;

    for (i = 0; i < tagParts.length; i++) {
        part = tagParts[i];

        if (!part) {
            continue;
        }

        type = part.charAt(0);

        if (!tagName) {
            tagName = part;
        } else if (type === '.') {
            classes = classes || [];
            classes.push(part.substring(1, part.length));
        } else if (type === '#' && noId) {
            props.id = part.substring(1, part.length);
        }
    }

    if (classes) {
        if (props.className) {
            classes.push(props.className);
        }

        props.className = classes.join(' ');
    }

    return props.namespace ? tagName : tagName.toUpperCase();
}

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(68);
var isHook = __webpack_require__(39);

module.exports = diffProps;

function diffProps(a, b) {
    var diff;

    for (var aKey in a) {
        if (!(aKey in b)) {
            diff = diff || {};
            diff[aKey] = undefined;
        }

        var aValue = a[aKey];
        var bValue = b[aKey];

        if (aValue === bValue) {
            continue;
        } else if (isObject(aValue) && isObject(bValue)) {
            if (getPrototype(bValue) !== getPrototype(aValue)) {
                diff = diff || {};
                diff[aKey] = bValue;
            } else if (isHook(bValue)) {
                diff = diff || {};
                diff[aKey] = bValue;
            } else {
                var objectDiff = diffProps(aValue, bValue);
                if (objectDiff) {
                    diff = diff || {};
                    diff[aKey] = objectDiff;
                }
            }
        } else {
            diff = diff || {};
            diff[aKey] = bValue;
        }
    }

    for (var bKey in b) {
        if (!(bKey in a)) {
            diff = diff || {};
            diff[bKey] = b[bKey];
        }
    }

    return diff;
}

function getPrototype(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value);
    } else if (value.__proto__) {
        return value.__proto__;
    } else if (value.constructor) {
        return value.constructor.prototype;
    }
}

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = __webpack_require__(59);

var VPatch = __webpack_require__(105);
var isVNode = __webpack_require__(19);
var isVText = __webpack_require__(40);
var isWidget = __webpack_require__(10);
var isThunk = __webpack_require__(38);
var handleThunk = __webpack_require__(103);

var diffProps = __webpack_require__(225);

module.exports = diff;

function diff(a, b) {
    var patch = { a: a };
    walk(a, b, patch, 0);
    return patch;
}

function walk(a, b, patch, index) {
    if (a === b) {
        return;
    }

    var apply = patch[index];
    var applyClear = false;

    if (isThunk(a) || isThunk(b)) {
        thunks(a, b, patch, index);
    } else if (b == null) {

        // If a is a widget we will add a remove patch for it
        // Otherwise any child widgets/hooks must be destroyed.
        // This prevents adding two remove patches for a widget.
        if (!isWidget(a)) {
            clearState(a, patch, index);
            apply = patch[index];
        }

        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b));
    } else if (isVNode(b)) {
        if (isVNode(a)) {
            if (a.tagName === b.tagName && a.namespace === b.namespace && a.key === b.key) {
                var propsPatch = diffProps(a.properties, b.properties);
                if (propsPatch) {
                    apply = appendPatch(apply, new VPatch(VPatch.PROPS, a, propsPatch));
                }
                apply = diffChildren(a, b, patch, apply, index);
            } else {
                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
                applyClear = true;
            }
        } else {
            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
            applyClear = true;
        }
    } else if (isVText(b)) {
        if (!isVText(a)) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
            applyClear = true;
        } else if (a.text !== b.text) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
        }
    } else if (isWidget(b)) {
        if (!isWidget(a)) {
            applyClear = true;
        }

        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b));
    }

    if (apply) {
        patch[index] = apply;
    }

    if (applyClear) {
        clearState(a, patch, index);
    }
}

function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children;
    var orderedSet = reorder(aChildren, b.children);
    var bChildren = orderedSet.children;

    var aLen = aChildren.length;
    var bLen = bChildren.length;
    var len = aLen > bLen ? aLen : bLen;

    for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i];
        var rightNode = bChildren[i];
        index += 1;

        if (!leftNode) {
            if (rightNode) {
                // Excess nodes in b need to be added
                apply = appendPatch(apply, new VPatch(VPatch.INSERT, null, rightNode));
            }
        } else {
            walk(leftNode, rightNode, patch, index);
        }

        if (isVNode(leftNode) && leftNode.count) {
            index += leftNode.count;
        }
    }

    if (orderedSet.moves) {
        // Reorder nodes last
        apply = appendPatch(apply, new VPatch(VPatch.ORDER, a, orderedSet.moves));
    }

    return apply;
}

function clearState(vNode, patch, index) {
    // TODO: Make this a single walk, not two
    unhook(vNode, patch, index);
    destroyWidgets(vNode, patch, index);
}

// Patch records for all destroyed widgets must be added because we need
// a DOM node reference for the destroy function
function destroyWidgets(vNode, patch, index) {
    if (isWidget(vNode)) {
        if (typeof vNode.destroy === "function") {
            patch[index] = appendPatch(patch[index], new VPatch(VPatch.REMOVE, vNode, null));
        }
    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
        var children = vNode.children;
        var len = children.length;
        for (var i = 0; i < len; i++) {
            var child = children[i];
            index += 1;

            destroyWidgets(child, patch, index);

            if (isVNode(child) && child.count) {
                index += child.count;
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index);
    }
}

// Create a sub-patch for thunks
function thunks(a, b, patch, index) {
    var nodes = handleThunk(a, b);
    var thunkPatch = diff(nodes.a, nodes.b);
    if (hasPatches(thunkPatch)) {
        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch);
    }
}

function hasPatches(patch) {
    for (var index in patch) {
        if (index !== "a") {
            return true;
        }
    }

    return false;
}

// Execute hooks when two nodes are identical
function unhook(vNode, patch, index) {
    if (isVNode(vNode)) {
        if (vNode.hooks) {
            patch[index] = appendPatch(patch[index], new VPatch(VPatch.PROPS, vNode, undefinedKeys(vNode.hooks)));
        }

        if (vNode.descendantHooks || vNode.hasThunks) {
            var children = vNode.children;
            var len = children.length;
            for (var i = 0; i < len; i++) {
                var child = children[i];
                index += 1;

                unhook(child, patch, index);

                if (isVNode(child) && child.count) {
                    index += child.count;
                }
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index);
    }
}

function undefinedKeys(obj) {
    var result = {};

    for (var key in obj) {
        result[key] = undefined;
    }

    return result;
}

// List diff, naive left to right reordering
function reorder(aChildren, bChildren) {
    // O(M) time, O(M) memory
    var bChildIndex = keyIndex(bChildren);
    var bKeys = bChildIndex.keys;
    var bFree = bChildIndex.free;

    if (bFree.length === bChildren.length) {
        return {
            children: bChildren,
            moves: null
        };
    }

    // O(N) time, O(N) memory
    var aChildIndex = keyIndex(aChildren);
    var aKeys = aChildIndex.keys;
    var aFree = aChildIndex.free;

    if (aFree.length === aChildren.length) {
        return {
            children: bChildren,
            moves: null
        };
    }

    // O(MAX(N, M)) memory
    var newChildren = [];

    var freeIndex = 0;
    var freeCount = bFree.length;
    var deletedItems = 0;

    // Iterate through a and match a node in b
    // O(N) time,
    for (var i = 0; i < aChildren.length; i++) {
        var aItem = aChildren[i];
        var itemIndex;

        if (aItem.key) {
            if (bKeys.hasOwnProperty(aItem.key)) {
                // Match up the old keys
                itemIndex = bKeys[aItem.key];
                newChildren.push(bChildren[itemIndex]);
            } else {
                // Remove old keyed items
                itemIndex = i - deletedItems++;
                newChildren.push(null);
            }
        } else {
            // Match the item in a with the next free item in b
            if (freeIndex < freeCount) {
                itemIndex = bFree[freeIndex++];
                newChildren.push(bChildren[itemIndex]);
            } else {
                // There are no free items in b to match with
                // the free items in a, so the extra free nodes
                // are deleted.
                itemIndex = i - deletedItems++;
                newChildren.push(null);
            }
        }
    }

    var lastFreeIndex = freeIndex >= bFree.length ? bChildren.length : bFree[freeIndex];

    // Iterate through b and append any new keys
    // O(M) time
    for (var j = 0; j < bChildren.length; j++) {
        var newItem = bChildren[j];

        if (newItem.key) {
            if (!aKeys.hasOwnProperty(newItem.key)) {
                // Add any new keyed items
                // We are adding new items to the end and then sorting them
                // in place. In future we should insert new items in place.
                newChildren.push(newItem);
            }
        } else if (j >= lastFreeIndex) {
            // Add any leftover non-keyed items
            newChildren.push(newItem);
        }
    }

    var simulate = newChildren.slice();
    var simulateIndex = 0;
    var removes = [];
    var inserts = [];
    var simulateItem;

    for (var k = 0; k < bChildren.length;) {
        var wantedItem = bChildren[k];
        simulateItem = simulate[simulateIndex];

        // remove items
        while (simulateItem === null && simulate.length) {
            removes.push(remove(simulate, simulateIndex, null));
            simulateItem = simulate[simulateIndex];
        }

        if (!simulateItem || simulateItem.key !== wantedItem.key) {
            // if we need a key in this position...
            if (wantedItem.key) {
                if (simulateItem && simulateItem.key) {
                    // if an insert doesn't put this key in place, it needs to move
                    if (bKeys[simulateItem.key] !== k + 1) {
                        removes.push(remove(simulate, simulateIndex, simulateItem.key));
                        simulateItem = simulate[simulateIndex];
                        // if the remove didn't put the wanted item in place, we need to insert it
                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
                            inserts.push({ key: wantedItem.key, to: k });
                        }
                        // items are matching, so skip ahead
                        else {
                                simulateIndex++;
                            }
                    } else {
                        inserts.push({ key: wantedItem.key, to: k });
                    }
                } else {
                    inserts.push({ key: wantedItem.key, to: k });
                }
                k++;
            }
            // a key in simulate has no matching wanted key, remove it
            else if (simulateItem && simulateItem.key) {
                    removes.push(remove(simulate, simulateIndex, simulateItem.key));
                }
        } else {
            simulateIndex++;
            k++;
        }
    }

    // remove all the remaining nodes from simulate
    while (simulateIndex < simulate.length) {
        simulateItem = simulate[simulateIndex];
        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key));
    }

    // If the only moves we have are deletes then we can just
    // let the delete patch remove these items.
    if (removes.length === deletedItems && !inserts.length) {
        return {
            children: newChildren,
            moves: null
        };
    }

    return {
        children: newChildren,
        moves: {
            removes: removes,
            inserts: inserts
        }
    };
}

function remove(arr, index, key) {
    arr.splice(index, 1);

    return {
        from: index,
        key: key
    };
}

function keyIndex(children) {
    var keys = {};
    var free = [];
    var length = children.length;

    for (var i = 0; i < length; i++) {
        var child = children[i];

        if (child.key) {
            keys[child.key] = i;
        } else {
            free.push(i);
        }
    }

    return {
        keys: keys, // A hash of key name to index
        free: free // An array of unkeyed item indices
    };
}

function appendPatch(apply, patch) {
    if (apply) {
        if (isArray(apply)) {
            apply.push(patch);
        } else {
            apply = [apply, patch];
        }

        return apply;
    } else {
        return patch;
    }
}

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Accepts and holds a reference to a final DOM element.
 *
 * @private
 * @category DOM
 * @return {object} Object holding the final node.
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DOMReference = exports.DOMReference = function () {
    function DOMReference() {
        _classCallCheck(this, DOMReference);
    }

    _createClass(DOMReference, [{
        key: 'hook',
        value: function hook(node) {
            this.node = node;
        }
    }]);

    return DOMReference;
}();

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _find2 = __webpack_require__(92);

var _find3 = _interopRequireDefault(_find2);

exports.VArrayDirtyCompare = VArrayDirtyCompare;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns whether or not a state is marked as dirty in
 * any object inside the given currentState.nodes collection.
 *
 * @private
 * @category DOM
 * @param {object} previousState Previous state.
 * @param {object} currentState  Current state.
 * @return {boolean} Any state is dirty.
 */
function VArrayDirtyCompare(previousState, currentState) {
    var diff = false;

    if (currentState.force) {
        diff = true;
    } else if (previousState.nodeCount !== currentState.nodeCount) {
        diff = true;
    } else if (previousState.loading !== currentState.loading) {
        diff = true;
    } else {
        diff = (0, _find3.default)(currentState.nodes, 'itree.dirty');
    }

    return diff;
};

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Used for caching VNodes.
 *
 * If a given state fails comparison with the previous state,
 * the node will be created via the provided rendering method.
 *
 * @param {object} state State object.
 * @param {function} cmpFn Comparison function.
 * @param {function} renderFn Rendering function. Must return a VNode.
 * @return {VNode} New or cached node.
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VCache = exports.VCache = function () {
    function VCache(state, cmpFn, renderFn) {
        _classCallCheck(this, VCache);

        this.type = 'Thunk';
        this.renderFn = renderFn;
        this.cmpFn = cmpFn;
        this.state = state;
    }

    _createClass(VCache, [{
        key: 'render',
        value: function render(previous) {
            // The first time the Thunk renders, there will be no previous state
            var previousState = previous ? previous.state : null;

            // We run the comparison function to see if the state has changed enough
            // for us to re-render. If it returns truthy, then we call the render
            // function to give us a new VNode
            if (!previousState || !this.state || this.cmpFn(previousState, this.state)) {
                return this.renderFn(previous, this);
            } else {
                // vnode will be set automatically when a thunk has been created
                // it contains the VNode, VText, Thunk, or Widget generated by
                // our render function.
                return previous.vnode;
            }
        }
    }]);

    return VCache;
}();

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _each2 = __webpack_require__(4);

var _each3 = _interopRequireDefault(_each2);

exports.VStateCompare = VStateCompare;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Compares all keys on the given state. Returns true if any difference exists.
 *
 * @private
 * @category DOM
 * @param {object} previousState Previous state.
 * @param {object} currentState  Current state.
 * @return {boolean} Difference was found.
 */
function VStateCompare(previousState, currentState) {
    // Always treat dirty flag as a state difference
    var isDirty = currentState.dirty || false;

    if (!isDirty) {
        (0, _each3.default)(currentState, function (val, key) {
            if (key !== 'dirty' && val !== previousState[key]) {
                isDirty = true;
                return false;
            }
        });
    }

    return isDirty;
};

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.baseStateChange = baseStateChange;
/**
 * Reset a node's state to the tree default.
 *
 * @private
 * @param {TreeNode} node Node object.
 * @returns {TreeNode} Node object.
 */
function resetState(node) {
    _.each(node._tree.defaultState, function (val, prop) {
        node.state(prop, val);
    });

    return node;
}

/**
 * Stores repetitive state change logic for most state methods.
 *
 * @private
 * @param {string} prop State property name.
 * @param {boolean} value New state value.
 * @param {string} verb Verb used for events.
 * @param {TreeNode} node Node object.
 * @param {string} deep Optional name of state method to call recursively.
 * @return {TreeNode} Node object.
 */
function baseStateChange(prop, value, verb, node, deep) {
    if (node.state(prop) !== value) {
        node._tree.dom.batch();

        if (node._tree.config.nodes.resetStateOnRestore && verb === 'restored') {
            resetState(node);
        }

        node.state(prop, value);

        node._tree.emit('node.' + verb, node);

        if (deep && node.hasChildren()) {
            node.children.recurseDown(function (child) {
                baseStateChange(prop, value, verb, child);
            });
        }

        node.markDirty();
        node._tree.dom.end();
    }

    return node;
};

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Libs

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _difference2 = __webpack_require__(113);

var _difference3 = _interopRequireDefault(_difference2);

var _map2 = __webpack_require__(43);

var _map3 = _interopRequireDefault(_map2);

var _isRegExp2 = __webpack_require__(115);

var _isRegExp3 = _interopRequireDefault(_isRegExp2);

var _isEmpty2 = __webpack_require__(63);

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _castArray2 = __webpack_require__(41);

var _castArray3 = _interopRequireDefault(_castArray2);

var _isString2 = __webpack_require__(23);

var _isString3 = _interopRequireDefault(_isString2);

var _isArrayLike2 = __webpack_require__(2);

var _isArrayLike3 = _interopRequireDefault(_isArrayLike2);

var _parseInt2 = __webpack_require__(64);

var _parseInt3 = _interopRequireDefault(_parseInt2);

var _includes2 = __webpack_require__(61);

var _includes3 = _interopRequireDefault(_includes2);

var _tail2 = __webpack_require__(117);

var _tail3 = _interopRequireDefault(_tail2);

var _head2 = __webpack_require__(114);

var _head3 = _interopRequireDefault(_head2);

var _sortBy2 = __webpack_require__(44);

var _sortBy3 = _interopRequireDefault(_sortBy2);

var _transform2 = __webpack_require__(65);

var _transform3 = _interopRequireDefault(_transform2);

var _each2 = __webpack_require__(4);

var _each3 = _interopRequireDefault(_each2);

var _defaults2 = __webpack_require__(111);

var _defaults3 = _interopRequireDefault(_defaults2);

var _isObject2 = __webpack_require__(1);

var _isObject3 = _interopRequireDefault(_isObject2);

var _isArray2 = __webpack_require__(0);

var _isArray3 = _interopRequireDefault(_isArray2);

var _isFunction2 = __webpack_require__(5);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _get2 = __webpack_require__(42);

var _get3 = _interopRequireDefault(_get2);

var _isBoolean2 = __webpack_require__(62);

var _isBoolean3 = _interopRequireDefault(_isBoolean2);

var _noop2 = __webpack_require__(116);

var _noop3 = _interopRequireDefault(_noop2);

var _defaultsDeep2 = __webpack_require__(112);

var _defaultsDeep3 = _interopRequireDefault(_defaultsDeep2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _collectionToModel = __webpack_require__(45);

var _eventemitter = __webpack_require__(109);

var _es6Promise = __webpack_require__(22);

var _standardizePromise = __webpack_require__(66);

var _treenode = __webpack_require__(24);

var _treenodes = __webpack_require__(25);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// CSS
__webpack_require__(110);

/**
 * Maps a method to the root TreeNodes collection.
 *
 * @private
 * @param {InspireTree} tree Tree instance.
 * @param {string} method Method name.
 * @param {arguments} args Proxied arguments.
 * @return {mixed} Proxied return value.
 */
function map(tree, method, args) {
    return tree.model[method].apply(tree.model, args);
}

/**
 * Represents a singe tree instance.
 *
 * @category Tree
 * @return {InspireTree} Tree instance.
 */

var InspireTree = function (_EventEmitter) {
    _inherits(InspireTree, _EventEmitter);

    function InspireTree(opts) {
        _classCallCheck(this, InspireTree);

        var _this = _possibleConstructorReturn(this, (InspireTree.__proto__ || Object.getPrototypeOf(InspireTree)).call(this));

        var tree = _this;

        // Init properties
        tree._lastSelectedNode;
        tree._muted = false;
        tree.allowsLoadEvents = false;
        tree.dom = false;
        tree.initialized = false;
        tree.isDynamic = false;
        tree.model = new _treenodes.TreeNodes(tree);
        tree.opts = opts;
        tree.preventDeselection = false;

        // Assign defaults
        tree.config = (0, _defaultsDeep3.default)({}, opts, {
            allowLoadEvents: [],
            checkbox: {
                autoCheckChildren: true
            },
            contextMenu: false,
            data: false,
            dom: {
                autoLoadMore: true,
                deferredRendering: false,
                nodeHeight: 25,
                showCheckboxes: false
            },
            dragTargets: false,
            editable: false,
            editing: {
                add: false,
                edit: false,
                remove: false
            },
            nodes: {
                resetStateOnRestore: true
            },
            pagination: {
                limit: -1
            },
            renderer: false,
            search: {
                matcher: false,
                matchProcessor: false
            },
            selection: {
                allow: _noop3.default,
                autoDeselect: true,
                autoSelectChildren: false,
                disableDirectDeselection: false,
                mode: 'default',
                multiple: false,
                require: false
            },
            showCheckboxes: false,
            sort: false,
            tabindex: -1,
            target: false
        });

        // If checkbox mode, we must force auto-selecting children
        if (tree.config.selection.mode === 'checkbox') {
            tree.config.selection.autoSelectChildren = true;

            // If user didn't specify showCheckboxes,
            // but is using checkbox selection mode,
            // enable it automatically.
            if (!(0, _isBoolean3.default)((0, _get3.default)(opts, 'dom.showCheckboxes'))) {
                tree.config.dom.showCheckboxes = true;
            }

            // In checkbox mode, checked=selected
            tree.on('node.checked', function (node) {
                if (!node.selected()) {
                    node.select(true);
                }
            });

            tree.on('node.selected', function (node) {
                if (!node.checked()) {
                    node.check(true);
                }
            });

            tree.on('node.unchecked', function (node) {
                if (node.selected()) {
                    node.deselect(true);
                }
            });

            tree.on('node.deselected', function (node) {
                if (node.checked()) {
                    node.uncheck(true);
                }
            });
        }

        // If auto-selecting children, we must force multiselect
        if (tree.config.selection.autoSelectChildren) {
            tree.config.selection.multiple = true;
            tree.config.selection.autoDeselect = false;
        }

        // Treat editable as full edit mode
        if (opts.editable && !opts.editing) {
            tree.config.editing.add = true;
            tree.config.editing.edit = true;
            tree.config.editing.remove = true;
        }

        // Support simple config for search
        if ((0, _isFunction3.default)(opts.search)) {
            tree.config.search = {
                matcher: opts.search,
                matchProcessor: false
            };
        }

        // Init the default state for nodes
        tree.defaultState = {
            collapsed: true,
            editable: (0, _get3.default)(tree, 'config.editing.edit'),
            editing: false,
            focused: false,
            hidden: false,
            indeterminate: false,
            loading: false,
            matched: false,
            removed: false,
            rendered: false,
            selectable: true,
            selected: false
        };

        // Cache some configs
        tree.allowsLoadEvents = (0, _isArray3.default)(tree.config.allowLoadEvents) && tree.config.allowLoadEvents.length > 0;
        tree.isDynamic = (0, _isFunction3.default)(tree.config.data);
        tree.usesNativeDOM = true;

        // Override emitter so we can better control flow
        var emit = tree.emit;
        tree.emit = function (eventName) {
            if (!tree.isEventMuted(eventName)) {
                // Duck-type for a DOM event
                if ((0, _isFunction3.default)((0, _get3.default)(arguments, '[1].preventDefault'))) {
                    var event = arguments[1];
                    event.treeDefaultPrevented = false;
                    event.preventTreeDefault = function () {
                        event.treeDefaultPrevented = true;
                    };
                }

                emit.apply(tree, arguments);
            }
        };

        // Webpack has a DOM boolean that when false,
        // allows us to exclude this library from our build.
        // For those doing their own rendering, it's useless.
        if (true) {
            tree.dom = new (__webpack_require__(118))(tree);
        }

        // Validation
        if (tree.dom && (!(0, _isObject3.default)(opts) || !opts.target)) {
            throw new TypeError('Property "target" is required, either an element or a selector.');
        }

        // Load custom/empty renderer
        if (!tree.dom) {
            var renderer = (0, _isFunction3.default)(tree.config.renderer) ? tree.config.renderer(tree) : {};
            tree.dom = (0, _defaults3.default)(renderer, {
                applyChanges: _noop3.default,
                attach: _noop3.default,
                batch: _noop3.default,
                end: _noop3.default
            });
        }

        // Connect to our target DOM element
        tree.dom.attach(tree.config.target);

        // Load initial user data
        if (tree.config.data) {
            tree.load(tree.config.data).catch(function (err) {
                // Proxy initial errors. At this point we should never consume them
                setTimeout(function () {
                    throw err;
                });
            });
        }

        tree.initialized = true;
        return _this;
    }

    /**
     * Adds a new node to this collection. If a sort
     * method is configured, the node will be added
     * in the appropriate order.
     *
     * @category Tree
     * @param {object} node Node
     * @return {TreeNode} Node object.
     */


    _createClass(InspireTree, [{
        key: 'addNode',
        value: function addNode() {
            return map(this, 'addNode', arguments);
        }

        /**
         * Add nodes.
         *
         * @category Tree
         * @param {array} nodes Array of node objects.
         * @return {TreeNodes} Added node objects.
         */

    }, {
        key: 'addNodes',
        value: function addNodes(nodes) {
            var tree = this;
            tree.dom.batch();

            var newNodes = new _treenodes.TreeNodes(this);
            (0, _each3.default)(nodes, function (node) {
                newNodes.push(tree.addNode(node));
            });

            tree.dom.end();

            return newNodes;
        }

        /**
         * Query for all available nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'available',
        value: function available() {
            return map(this, 'available', arguments);
        }

        /**
         * Blur children in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'blur',
        value: function blur() {
            return map(this, 'blur', arguments);
        }

        /**
         * Blur all children (deeply) in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'blurDeep',
        value: function blurDeep() {
            return map(this, 'blurDeep', arguments);
        }

        /**
         * Compares any number of TreeNode objects and returns
         * the minimum and maximum (starting/ending) nodes.
         *
         * @category Tree
         * @return {array} Array with two TreeNode objects.
         */

    }, {
        key: 'boundingNodes',
        value: function boundingNodes() {
            var pathMap = (0, _transform3.default)(arguments, function (map, node) {
                map[node.indexPath().replace(/\./g, '')] = node;
            }, {});

            var paths = (0, _sortBy3.default)(Object.keys(pathMap));
            return [(0, _get3.default)(pathMap, (0, _head3.default)(paths)), (0, _get3.default)(pathMap, (0, _tail3.default)(paths))];
        }

        /**
         * Get if the tree will auto-deselect currently selected nodes
         * when a new selection is made.
         *
         * @category Tree
         * @return {boolean} If tree will auto-deselect nodes.
         */

    }, {
        key: 'canAutoDeselect',
        value: function canAutoDeselect() {
            return this.config.selection.autoDeselect && !this.preventDeselection;
        }

        /**
         * Query for all checked nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'checked',
        value: function checked() {
            return map(this, 'checked', arguments);
        }

        /**
         * Clean children in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'clean',
        value: function clean() {
            return map(this, 'clean', arguments);
        }

        /**
         * Clears matched nodes, shows all nodes and collapses parents.
         *
         * @category Tree
         * @return {Tree} Tree instance.
         */

    }, {
        key: 'clearSearch',
        value: function clearSearch() {
            this.matched().state('matched', false);
            return this.showDeep().collapseDeep().tree();
        }

        /**
         * Clones (deep) the array of nodes.
         *
         * Note: Cloning will *not* clone the context pointer.
         *
         * @category Tree
         * @return {TreeNodes} Array of cloned nodes.
         */

    }, {
        key: 'clone',
        value: function clone() {
            return map(this, 'clone', arguments);
        }

        /**
         * Collapse children in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'collapse',
        value: function collapse() {
            return map(this, 'collapse', arguments);
        }

        /**
         * Query for all collapsed nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'collapsed',
        value: function collapsed() {
            return map(this, 'collapsed', arguments);
        }

        /**
         * Collapse all children (deeply) in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'collapseDeep',
        value: function collapseDeep() {
            return map(this, 'collapseDeep', arguments);
        }

        /**
         * Concat nodes like an Array would.
         *
         * @category Tree
         * @param {TreeNodes} nodes Array of nodes.
         * @return {TreeNodes} Resulting node array.
         */

    }, {
        key: 'concat',
        value: function concat() {
            return map(this, 'concat', arguments);
        }

        /**
         * Copies nodes to a new tree instance.
         *
         * @category Tree
         * @param {boolean} hierarchy Include necessary ancestors to match hierarchy.
         * @return {object} Methods to perform action on copied nodes.
         */

    }, {
        key: 'copy',
        value: function copy() {
            return map(this, 'copy', arguments);
        }

        /**
         * Returns deepest nodes from this array.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'deepest',
        value: function deepest() {
            return map(this, 'deepest', arguments);
        }

        /**
         * Deselect children in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'deselect',
        value: function deselect() {
            return map(this, 'deselect', arguments);
        }

        /**
         * Deselect all children (deeply) in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'deselectDeep',
        value: function deselectDeep() {
            return map(this, 'deselectDeep', arguments);
        }

        /**
         * Disable auto-deselection of currently selected nodes.
         *
         * @category Tree
         * @return {Tree} Tree instance.
         */

    }, {
        key: 'disableDeselection',
        value: function disableDeselection() {
            if (this.config.selection.multiple) {
                this.preventDeselection = true;
            }

            return this;
        }

        /**
         * Iterate every TreeNode in this collection.
         *
         * @category Tree
         * @param {function} iteratee Iteratee invoke for each node.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'each',
        value: function each() {
            return map(this, 'each', arguments);
        }

        /**
         * Query for all editable nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'editable',
        value: function editable() {
            return map(this, 'editable', arguments);
        }

        /**
         * Query for all nodes in editing mode.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'editing',
        value: function editing() {
            return map(this, 'editing', arguments);
        }

        /**
         * Enable auto-deselection of currently selected nodes.
         *
         * @category Tree
         * @return {Tree} Tree instance.
         */

    }, {
        key: 'enableDeselection',
        value: function enableDeselection() {
            this.preventDeselection = false;

            return this;
        }

        /**
         * Expand children in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'expand',
        value: function expand() {
            return map(this, 'expand', arguments);
        }

        /**
         * Recursively expands all nodes, loading all dynamic calls.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'expandDeep',
        value: function expandDeep() {
            return map(this, 'expandDeep', arguments);
        }

        /**
         * Query for all expanded nodes.
         *
         * @category Tree
         * @return {Promise} Promise resolved only when all children have loaded and expanded.
         */

    }, {
        key: 'expanded',
        value: function expanded() {
            return map(this, 'expanded', arguments);
        }

        /**
         * Returns a cloned hierarchy of all nodes matching a predicate.
         *
         * Because it filters deeply, we must clone all nodes so that we
         * don't affect the actual node array.
         *
         * @category Tree
         * @param {string|function} predicate State flag or custom function.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'extract',
        value: function extract() {
            return map(this, 'extract', arguments);
        }

        /**
         * Returns nodes which match a predicate.
         *
         * @category Tree
         * @param {string|function} predicate State flag or custom function.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'filter',
        value: function filter() {
            return map(this, 'filter', arguments);
        }

        /**
         * Flattens a hierarchy, returning only node(s) matching the
         * expected state or predicate function.
         *
         * @category Tree
         * @param {string|function} predicate State property or custom function.
         * @return {TreeNodes} Flat array of matching nodes.
         */

    }, {
        key: 'flatten',
        value: function flatten() {
            return map(this, 'flatten', arguments);
        }

        /**
         * Query for all focused nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'focused',
        value: function focused() {
            return map(this, 'focused', arguments);
        }

        /**
         * Get a specific node in the collection, or undefined if it doesn't exist.
         *
         * @category Tree
         * @param {int} index Numeric index of requested node.
         * @return {TreeNode} Node object. Undefined if invalid index.
         */

    }, {
        key: 'get',
        value: function get() {
            return map(this, 'get', arguments);
        }

        /**
         * Query for all hidden nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'hidden',
        value: function hidden() {
            return map(this, 'hidden', arguments);
        }

        /**
         * Hide children in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'hide',
        value: function hide() {
            return map(this, 'hide', arguments);
        }

        /**
         * Hide all children (deeply) in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'hideDeep',
        value: function hideDeep() {
            return map(this, 'hideDeep', arguments);
        }

        /**
         * Query for all indeterminate nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'indeterminate',
        value: function indeterminate() {
            return map(this, 'indeterminate', arguments);
        }

        /**
         * Insert a new node at a given position.
         *
         * @category Tree
         * @param {integer} index Index at which to insert the node.
         * @param {object} object Raw node object or TreeNode.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'insertAt',
        value: function insertAt() {
            return map(this, 'insertAt', arguments);
        }

        /**
         * Invoke method(s) on each node.
         *
         * @category Tree
         * @param {string|array} methods Method name(s).
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'invoke',
        value: function invoke() {
            return map(this, 'invoke', arguments);
        }

        /**
         * Invoke method(s) deeply.
         *
         * @category Tree
         * @param {string|array} methods Method name(s).
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'invokeDeep',
        value: function invokeDeep() {
            return map(this, 'invokeDeep', arguments);
        }

        /**
         * Check if an event is currently muted.
         *
         * @category Tree
         * @param {string} eventName Event name.
         * @return {boolean} If event is muted.
         */

    }, {
        key: 'isEventMuted',
        value: function isEventMuted(eventName) {
            if ((0, _isBoolean3.default)(this.muted())) {
                return this.muted();
            }

            return (0, _includes3.default)(this.muted(), eventName);
        }

        /**
         * Check if an object is a TreeNode.
         *
         * @category Tree
         * @param {object} object Object
         * @return {boolean} If object is a TreeNode.
         */

    }, {
        key: 'isNode',
        value: function isNode(object) {
            return object instanceof _treenode.TreeNode;
        }

        /**
         * Check if an object is a TreeNodes array.
         *
         * @category Tree
         * @param {object} object Object
         * @return {boolean} If object is a TreeNodes array.
         */

    }, {
        key: 'isTreeNodes',
        value: function isTreeNodes(object) {
            return object instanceof _treenodes.TreeNodes;
        }

        /**
         * Get the most recently selected node, if any.
         *
         * @category Tree
         * @return {TreeNode} Last selected node, or undefined.
         */

    }, {
        key: 'lastSelectedNode',
        value: function lastSelectedNode() {
            return this._lastSelectedNode;
        }

        /**
         * Loads tree. Accepts an array or a promise.
         *
         * @category Tree
         * @param {array|function} loader Array of nodes, or promise resolving an array of nodes.
         * @return {Promise} Promise resolved upon successful load, rejected on error.
         * @example
         *
         * tree.load($.getJSON('nodes.json'));
         */

    }, {
        key: 'load',
        value: function load(loader) {
            var tree = this;

            var promise = new _es6Promise.Promise(function (resolve, reject) {
                var complete = function complete(nodes, totalNodes) {
                    if ((0, _get3.default)(tree, 'dom.pagination')) {
                        tree.dom.pagination.total = nodes.length;

                        if ((0, _parseInt3.default)(totalNodes) > nodes.length) {
                            tree.dom.pagination.total = (0, _parseInt3.default)(totalNodes);
                        }
                    }

                    // Delay event for synchronous loader. Otherwise it fires
                    // before the user has a chance to listen.
                    if (!tree.initialized && (0, _isArray3.default)(nodes)) {
                        setTimeout(function () {
                            tree.emit('data.loaded', nodes);
                        });
                    } else {
                        tree.emit('data.loaded', nodes);
                    }

                    // Concat newly loaded nodes
                    tree.model = tree.model.concat((0, _collectionToModel.collectionToModel)(tree, nodes));

                    if (tree.config.selection.require && !tree.selected().length) {
                        tree.selectFirstAvailableNode();
                    }

                    // Delay event for synchronous loader
                    if (!tree.initialized && (0, _isArray3.default)(nodes)) {
                        setTimeout(function () {
                            tree.emit('model.loaded', tree.model);
                        });
                    } else {
                        tree.emit('model.loaded', tree.model);
                    }

                    resolve(tree.model);

                    tree.dom.applyChanges();

                    if ((0, _isFunction3.default)(tree.dom.scrollSelectedIntoView)) {
                        tree.dom.scrollSelectedIntoView();
                    }
                };

                // Data given already as an array
                if ((0, _isArrayLike3.default)(loader)) {
                    complete(loader);
                }

                // Data loader requires a caller/callback
                else if ((0, _isFunction3.default)(loader)) {
                        var resp = loader(null, complete, reject, (0, _get3.default)(tree, 'dom.pagination'));

                        // Loader returned its own object
                        if (resp) {
                            loader = resp;
                        }
                    }

                // Data loader is likely a promise
                if ((0, _isObject3.default)(loader)) {
                    (0, _standardizePromise.standardizePromise)(loader).then(complete).catch(reject);
                } else {
                    error(new Error('Invalid data loader.'));
                }
            });

            // Copy to event listeners
            promise.catch(function (err) {
                tree.emit('data.loaderror', err);
            });

            return promise;
        }

        /**
         * Query for all loading nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'loading',
        value: function loading() {
            return map(this, 'loading', arguments);
        }

        /**
         * Query for all nodes matched in the last search.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'matched',
        value: function matched() {
            return map(this, 'matched', arguments);
        }

        /*
         * Pause events.
         *
         * @category Tree
         * @param {array} events Event names to mute.
         * @return {Tree} Tree instance.
         */

    }, {
        key: 'mute',
        value: function mute(events) {
            if ((0, _isString3.default)(events) || (0, _isArray3.default)(events)) {
                this._muted = (0, _castArray3.default)(events);
            } else {
                this._muted = true;
            }

            return this;
        }

        /**
         * Get current mute settings.
         *
         * @category Tree
         * @return {boolean|array} Muted events. If all, true.
         */

    }, {
        key: 'muted',
        value: function muted() {
            return this._muted;
        }

        /**
         * Get a node.
         *
         * @category Tree
         * @param {string|number} id ID of node.
         * @return {TreeNode} Node object.
         */

    }, {
        key: 'node',
        value: function node() {
            return map(this, 'node', arguments);
        }

        /**
         * Get all nodes in a tree, or nodes for an array of IDs.
         *
         * @category Tree
         * @param {array} refs Array of ID references.
         * @return {TreeNodes} Array of node objects.
         * @example
         *
         * var all = tree.nodes()
         * var some = tree.nodes([1, 2, 3])
         */

    }, {
        key: 'nodes',
        value: function nodes() {
            return map(this, 'nodes', arguments);
        }

        /**
         * Base recursion function for a collection or node.
         *
         * Returns false if execution should cease.
         *
         * @private
         * @param {function} iteratee Iteratee function
         * @return {TreeNodes} Resulting nodes.
         */

    }, {
        key: 'recurseDown',
        value: function recurseDown() {
            return map(this, 'recurseDown', arguments);
        }

        /**
         * Reloads/re-executes the original data loader.
         *
         * @category Tree
         * @return {Promise} Load method promise.
         */

    }, {
        key: 'reload',
        value: function reload() {
            this.removeAll();

            return this.load(this.opts.data || this.config.data);
        }

        /**
         * Removes a direct descendant node.
         *
         * @category Tree
         * @param {TreeNode} node Node object.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'remove',
        value: function remove() {
            return map(this, 'remove', arguments);
        }

        /**
         * Removes all nodes.
         *
         * @category Tree
         * @return {Tree} Tree instance.
         */

    }, {
        key: 'removeAll',
        value: function removeAll() {
            this.model = new _treenodes.TreeNodes(this);
            this.dom.applyChanges();

            return this;
        }

        /**
         * Query for all soft-removed nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'removed',
        value: function removed() {
            return map(this, 'removed', arguments);
        }

        /**
         * Restore children in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'restore',
        value: function restore() {
            return map(this, 'restore', arguments);
        }

        /**
         * Restore all children (deeply) in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'restoreDeep',
        value: function restoreDeep() {
            return map(this, 'restoreDeep', arguments);
        }

        /**
         * Search nodes, showing only those that match and the necessary hierarchy.
         *
         * @category Tree
         * @param {*} query Search string, RegExp, or function.
         * @return {TreeNodes} Array of matching node objects.
         */

    }, {
        key: 'search',
        value: function search(query) {
            var _this2 = this;

            var tree = this;
            var customMatcher = tree.config.search.matcher;
            var customMatchProcessor = tree.config.search.matchProcessor;

            // Don't search if query empty
            if (!query || (0, _isString3.default)(query) && (0, _isEmpty3.default)(query)) {
                return _es6Promise.Promise.resolve(tree.clearSearch());
            }

            tree.dom.batch();

            // Reset states
            tree.recurseDown(function (node) {
                node.state('hidden', true);
                node.state('matched', false);
            });

            tree.dom.end();

            // Query nodes for any matching the query
            var matcher = (0, _isFunction3.default)(customMatcher) ? customMatcher : function (query, resolve) {
                var matches = new _treenodes.TreeNodes(_this2._tree);

                // Convery the query into a usable predicate
                if ((0, _isString3.default)(query)) {
                    query = new RegExp(query, 'i');
                }

                var predicate;
                if ((0, _isRegExp3.default)(query)) {
                    predicate = function predicate(node) {
                        return query.test(node.text);
                    };
                } else {
                    predicate = query;
                }

                // Recurse down and find all matches
                tree.model.recurseDown(function (node) {
                    if (!node.removed()) {
                        if (predicate(node)) {
                            // Return as a match
                            matches.push(node);
                        }
                    }
                });

                resolve(matches);
            };

            // Process all matching nodes.
            var matchProcessor = (0, _isFunction3.default)(customMatchProcessor) ? customMatchProcessor : function (matches) {
                matches.each(function (node) {
                    node.show().state('matched', true);

                    node.expandParents().collapse();

                    if (node.hasChildren()) {
                        node.children.showDeep();
                    }
                });
            };

            // Wrap the search matcher with a promise since it could require async requests
            return new _es6Promise.Promise(function (resolve, reject) {
                // Execute the matcher and pipe results to the processor
                matcher(query, function (matches) {
                    // Convert to a TreeNodes array if we're receiving external nodes
                    if (!tree.isTreeNodes(matches)) {
                        matches = tree.nodes((0, _map3.default)(matches, 'id'));
                    }

                    tree.dom.batch();

                    matchProcessor(matches);

                    tree.dom.end();

                    resolve(matches);
                }, reject);
            });
        }

        /**
         * Select children in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'select',
        value: function select() {
            return map(this, 'select', arguments);
        }

        /**
         * Query for all selectable nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'selectable',
        value: function selectable() {
            return map(this, 'selectable', arguments);
        }

        /**
         * Select all nodes between a start and end node.
         * Starting node must have a higher index path so we can work down to endNode.
         *
         * @category Tree
         * @param {TreeNode} startNode Starting node
         * @param {TreeNode} endNode Ending node
         * @return {Tree} Tree instance.
         */

    }, {
        key: 'selectBetween',
        value: function selectBetween(startNode, endNode) {
            this.dom.batch();

            var node = startNode.nextVisibleNode();
            while (node) {
                if (node.id === endNode.id) {
                    break;
                }

                node.select();

                node = node.nextVisibleNode();
            }

            this.dom.end();

            return this;
        }
    }, {
        key: 'selectDeep',


        /**
         * Select all children (deeply) in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */
        value: function selectDeep() {
            return map(this, 'selectDeep', arguments);
        }

        /**
         * Query for all selected nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'selected',
        value: function selected() {
            return map(this, 'selected', arguments);
        }

        /**
         * Select the first available node at the root level.
         *
         * @category Tree
         * @return {TreeNode} Selected node object.
         */

    }, {
        key: 'selectFirstAvailableNode',
        value: function selectFirstAvailableNode() {
            var node = this.model.filter('available').get(0);
            if (node) {
                node.select();
            }

            return node;
        }
    }, {
        key: 'show',


        /**
         * Show children in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */
        value: function show() {
            return map(this, 'show', arguments);
        }

        /**
         * Show all children (deeply) in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'showDeep',
        value: function showDeep() {
            return map(this, 'showDeep', arguments);
        }

        /**
         * Soft-remove children in this collection.
         *
         * @category Tree
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'softRemove',
        value: function softRemove() {
            return map(this, 'softRemove', arguments);
        }

        /**
         * Sorts all TreeNode objects in this collection.
         *
         * If no custom sorter given, the configured "sort" value will be used.
         *
         * @category Tree
         * @param {string|function} sorter Sort function or property name.
         * @return {TreeNodes} Array of node obejcts.
         */

    }, {
        key: 'sort',
        value: function sort() {
            return map(this, 'sort', arguments);
        }

        /**
         * Set state values for nodes in this collection.
         *
         * @category Tree
         * @param {string} name Property name.
         * @param {boolean} newVal New value, if setting.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'state',
        value: function state() {
            return map(this, 'state', arguments);
        }

        /**
         * Set state values for nodes in this collection.
         *
         * @category Tree
         * @param {string} name Property name.
         * @param {boolean} newVal New value, if setting.
         * @return {TreeNodes} Array of node objects.
         */

    }, {
        key: 'stateDeep',
        value: function stateDeep() {
            return map(this, 'stateDeep', arguments);
        }

        /**
         * Returns a native Array of nodes.
         *
         * @category Tree
         * @return {array} Array of node objects.
         */

    }, {
        key: 'toArray',
        value: function toArray() {
            return map(this, 'toArray', arguments);
        }

        /**
         * Resume events.
         *
         * @category Tree
         * @param {array} events Events to unmute.
         * @return {Tree} Tree instance.
         */

    }, {
        key: 'unmute',
        value: function unmute(events) {
            // Diff array and set to false if we're now empty
            if ((0, _isString3.default)(events) || (0, _isArray3.default)(events)) {
                this._muted = (0, _difference3.default)(this._muted, (0, _castArray3.default)(events));
                if (!this._muted.length) {
                    this._muted = false;
                }
            } else {
                this._muted = false;
            }

            return this;
        }
    }, {
        key: 'visible',


        /**
         * Query for all visible nodes.
         *
         * @category Tree
         * @param {boolean} full Retain full hiearchy.
         * @return {TreeNodes} Array of node objects.
         */
        value: function visible() {
            return map(this, 'visible', arguments);
        }
    }]);

    return InspireTree;
}(_eventemitter.EventEmitter2);

exports.default = InspireTree;
module.exports = exports['default'];

/***/ }),
/* 233 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 234 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
});