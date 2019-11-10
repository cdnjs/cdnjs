(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["expect"] = factory();
	else
		root["expect"] = factory();
})(this, function() {
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

	var expect = __webpack_require__(1);

	expect.createSpy = __webpack_require__(13).createSpy;
	expect.spyOn = __webpack_require__(13).spyOn;

	module.exports = expect;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var deepEqual = __webpack_require__(2);
	var isRegExp = __webpack_require__(5);
	var invariant = __webpack_require__(6);
	var isFunction = __webpack_require__(8);
	var functionThrows = __webpack_require__(9);
	var stringContains = __webpack_require__(10);
	var arrayContains = __webpack_require__(11);
	var isA = __webpack_require__(12);
	var isArray = Array.isArray;

	/**
	 * An Expectation is a wrapper around an assertion that allows it to be written
	 * in a more natural style, without the need to remember the order of arguments.
	 * This helps prevent you from making mistakes when writing tests.
	 */
	function Expectation(actual) {
	  if (!(this instanceof Expectation)) return new Expectation(actual);

	  this.actual = actual;

	  if (isFunction(actual)) {
	    this.context = null;
	    this.args = [];
	  }
	}

	Expectation.prototype.toExist = function (message) {
	  invariant(this.actual, message || 'Expected %s to exist', this.actual);

	  return this;
	};

	Expectation.prototype.toNotExist = function (message) {
	  invariant(!this.actual, message || 'Expected %s to not exist', this.actual);

	  return this;
	};

	Expectation.prototype.toBe = function (value, message) {
	  invariant(this.actual === value, message || 'Expected %s to be %s', this.actual, value);

	  return this;
	};

	Expectation.prototype.toNotBe = function (value, message) {
	  invariant(this.actual !== value, message || 'Expected %s to not be %s', this.actual, value);

	  return this;
	};

	Expectation.prototype.toEqual = function (value, message) {
	  invariant(deepEqual(this.actual, value), message || 'Expected %s to equal %s', this.actual, value);

	  return this;
	};

	Expectation.prototype.toNotEqual = function (value, message) {
	  invariant(!deepEqual(this.actual, value), message || 'Expected %s to not equal %s', this.actual, value);

	  return this;
	};

	Expectation.prototype.toThrow = function (value, message) {
	  invariant(isFunction(this.actual), 'The "actual" argument in expect(actual).toThrow() must be a function, %s was given', this.actual);

	  invariant(functionThrows(this.actual, this.context, this.args, value), message || 'Expected %s to throw %s', this.actual, value);

	  return this;
	};

	Expectation.prototype.toNotThrow = function (value, message) {
	  invariant(isFunction(this.actual), 'The "actual" argument in expect(actual).toNotThrow() must be a function, %s was given', this.actual);

	  invariant(!functionThrows(this.actual, this.context, this.args, value), message || 'Expected %s to not throw %s', this.actual, value);

	  return this;
	};

	Expectation.prototype.toBeA = function (value, message) {
	  invariant(isFunction(value) || typeof value === 'string', 'The "value" argument in toBeA(value) must be a function or a string');

	  invariant(isA(this.actual, value), message || 'Expected %s to be a %s', this.actual, value);

	  return this;
	};

	Expectation.prototype.toNotBeA = function (value, message) {
	  invariant(isFunction(value) || typeof value === 'string', 'The "value" argument in toNotBeA(value) must be a function or a string');

	  invariant(!isA(this.actual, value), message || 'Expected %s to be a %s', this.actual, value);

	  return this;
	};

	Expectation.prototype.toMatch = function (pattern, message) {
	  invariant(typeof this.actual === 'string', 'The "actual" argument in expect(actual).toMatch() must be a string');

	  invariant(isRegExp(pattern), 'The "value" argument in toMatch(value) must be a RegExp');

	  invariant(pattern.test(this.actual), message || 'Expected %s to match %s', this.actual, pattern);

	  return this;
	};

	Expectation.prototype.toNotMatch = function (pattern, message) {
	  invariant(typeof this.actual === 'string', 'The "actual" argument in expect(actual).toNotMatch() must be a string');

	  invariant(isRegExp(pattern), 'The "value" argument in toNotMatch(value) must be a RegExp');

	  invariant(!pattern.test(this.actual), message || 'Expected %s to not match %s', this.actual, pattern);

	  return this;
	};

	Expectation.prototype.toBeLessThan = function (value, message) {
	  invariant(typeof this.actual === 'number', 'The "actual" argument in expect(actual).toBeLessThan() must be a number');

	  invariant(typeof value === 'number', 'The "value" argument in toBeLessThan(value) must be a number');

	  invariant(this.actual < value, message || 'Expected %s to be less than %s', this.actual, value);

	  return this;
	};

	Expectation.prototype.toBeGreaterThan = function (value, message) {
	  invariant(typeof this.actual === 'number', 'The "actual" argument in expect(actual).toBeGreaterThan() must be a number');

	  invariant(typeof value === 'number', 'The "value" argument in toBeGreaterThan(value) must be a number');

	  invariant(this.actual > value, message || 'Expected %s to be greater than %s', this.actual, value);

	  return this;
	};

	Expectation.prototype.toInclude = function (value, comparator, message) {
	  invariant(isArray(this.actual) || typeof this.actual === 'string', 'The "actual" argument in expect(actual).toInclude() must be an array or a string');

	  if (typeof comparator === 'string') {
	    message = comparator;
	    comparator = null;
	  }

	  message = message || 'Expected %s to include %s';

	  if (isArray(this.actual)) {
	    invariant(arrayContains(this.actual, value, comparator), message, this.actual, value);
	  } else {
	    invariant(stringContains(this.actual, value), message, this.actual, value);
	  }

	  return this;
	};

	Expectation.prototype.toExclude = function (value, comparator, message) {
	  invariant(isArray(this.actual) || typeof this.actual === 'string', 'The "actual" argument in expect(actual).toExclude() must be an array or a string');

	  if (typeof comparator === 'string') {
	    message = comparator;
	    comparator = null;
	  }

	  message = message || 'Expected %s to exclude %s';

	  if (isArray(this.actual)) {
	    invariant(!arrayContains(this.actual, value, comparator), message, this.actual, value);
	  } else {
	    invariant(!stringContains(this.actual, value), message, this.actual, value);
	  }

	  return this;
	};

	Expectation.prototype.toHaveBeenCalled = function (message) {
	  var spy = this.actual;

	  invariant(spy && spy.__isSpy, 'The "actual" argument in expect(actual).toHaveBeenCalled() must be a spy');

	  invariant(spy.calls.length > 0, message || 'spy was not called');

	  return this;
	};

	Expectation.prototype.toHaveBeenCalledWith = function () {
	  var spy = this.actual;

	  invariant(spy && spy.__isSpy, 'The "actual" argument in expect(actual).toHaveBeenCalledWith() must be a spy');

	  var expectedArgs = Array.prototype.slice.call(arguments, 0);

	  invariant(spy.calls.some(function (call) {
	    return deepEqual(call.arguments, expectedArgs);
	  }), 'spy was never called with %s', expectedArgs);

	  return this;
	};

	Expectation.prototype.toNotHaveBeenCalled = function (message) {
	  var spy = this.actual;

	  invariant(spy && spy.__isSpy, 'The "actual" argument in expect(actual).toNotHaveBeenCalled() must be a spy');

	  invariant(spy.calls.length === 0, message || 'spy was not supposed to be called');

	  return this;
	};

	Expectation.prototype.withContext = function (context) {
	  invariant(isFunction(this.actual), 'The "actual" argument in expect(actual).withContext() must be a function');

	  this.context = context;

	  return this;
	};

	Expectation.prototype.withArgs = function () {
	  invariant(isFunction(this.actual), 'The "actual" argument in expect(actual).withArgs() must be a function');

	  if (arguments.length) this.args = this.args.concat(Array.prototype.slice.call(arguments, 0));

	  return this;
	};

	var aliases = {
	  toBeAn: 'toBeA',
	  toNotBeAn: 'toNotBeA',
	  toBeTruthy: 'toExist',
	  toBeFalsy: 'toNotExist',
	  toBeFewerThan: 'toBeLessThan',
	  toBeMoreThan: 'toBeGreaterThan',
	  toContain: 'toInclude',
	  toNotContain: 'toExclude'
	};

	for (var alias in aliases) Expectation.prototype[alias] = Expectation.prototype[aliases[alias]];

	module.exports = Expectation;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(3);
	var isArguments = __webpack_require__(4);

	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};

	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (re) {
		return Object.prototype.toString.call(re) === '[object RegExp]';
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var inspect = __webpack_require__(7);

	function invariant(condition, messageFormat) {
	  if (condition) return;

	  var extraArgs = Array.prototype.slice.call(arguments, 2);
	  var index = 0;

	  var message = messageFormat.replace(/%s/g, function () {
	    return inspect(extraArgs[index++]);
	  });

	  throw new Error(message);
	}

	module.exports = invariant;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function inspect_ (obj, opts, depth, seen) {
	    if (!opts) opts = {};
	    
	    var maxDepth = opts.depth === undefined ? 5 : opts.depth;
	    if (depth === undefined) depth = 0;
	    if (depth >= maxDepth && maxDepth > 0
	    && obj && typeof obj === 'object') {
	        return '[Object]';
	    }
	    
	    if (seen === undefined) seen = [];
	    else if (indexOf(seen, obj) >= 0) {
	        return '[Circular]';
	    }
	    
	    function inspect (value, from) {
	        if (from) {
	            seen = seen.slice();
	            seen.push(from);
	        }
	        return inspect_(value, opts, depth + 1, seen);
	    }
	    
	    if (typeof obj === 'string') {
	        return inspectString(obj);
	    }
	    else if (typeof obj === 'function') {
	        var name = nameOf(obj);
	        return '[Function' + (name ? ': ' + name : '') + ']';
	    }
	    else if (obj === null) {
	        return 'null';
	    }
	    else if (isSymbol(obj)) {
	        var symString = Symbol.prototype.toString.call(obj);
	        return typeof obj === 'object' ? 'Object(' + symString + ')' : symString;
	    }
	    else if (isElement(obj)) {
	        var s = '<' + String(obj.nodeName).toLowerCase();
	        var attrs = obj.attributes || [];
	        for (var i = 0; i < attrs.length; i++) {
	            s += ' ' + attrs[i].name + '="' + quote(attrs[i].value) + '"';
	        }
	        s += '>';
	        if (obj.childNodes && obj.childNodes.length) s += '...';
	        s += '</' + String(obj.nodeName).toLowerCase() + '>';
	        return s;
	    }
	    else if (isArray(obj)) {
	        if (obj.length === 0) return '[]';
	        var xs = Array(obj.length);
	        for (var i = 0; i < obj.length; i++) {
	            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
	        }
	        return '[ ' + xs.join(', ') + ' ]';
	    }
	    else if (isError(obj)) {
	        var parts = [];
	        for (var key in obj) {
	            if (!has(obj, key)) continue;
	            
	            if (/[^\w$]/.test(key)) {
	                parts.push(inspect(key) + ': ' + inspect(obj[key]));
	            }
	            else {
	                parts.push(key + ': ' + inspect(obj[key]));
	            }
	        }
	        if (parts.length === 0) return '[' + obj + ']';
	        return '{ [' + obj + '] ' + parts.join(', ') + ' }';
	    }
	    else if (typeof obj === 'object' && typeof obj.inspect === 'function') {
	        return obj.inspect();
	    }
	    else if (typeof obj === 'object' && !isDate(obj) && !isRegExp(obj)) {
	        var xs = [], keys = [];
	        for (var key in obj) {
	            if (has(obj, key)) keys.push(key);
	        }
	        keys.sort();
	        for (var i = 0; i < keys.length; i++) {
	            var key = keys[i];
	            if (/[^\w$]/.test(key)) {
	                xs.push(inspect(key) + ': ' + inspect(obj[key], obj));
	            }
	            else xs.push(key + ': ' + inspect(obj[key], obj));
	        }
	        if (xs.length === 0) return '{}';
	        return '{ ' + xs.join(', ') + ' }';
	    }
	    else return String(obj);
	};

	function quote (s) {
	    return String(s).replace(/"/g, '&quot;');
	}

	function isArray (obj) { return toStr(obj) === '[object Array]' }
	function isDate (obj) { return toStr(obj) === '[object Date]' }
	function isRegExp (obj) { return toStr(obj) === '[object RegExp]' }
	function isError (obj) { return toStr(obj) === '[object Error]' }
	function isSymbol (obj) { return toStr(obj) === '[object Symbol]' }

	var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
	function has (obj, key) {
	    return hasOwn.call(obj, key);
	}

	function toStr (obj) {
	    return Object.prototype.toString.call(obj);
	}

	function nameOf (f) {
	    if (f.name) return f.name;
	    var m = f.toString().match(/^function\s*([\w$]+)/);
	    if (m) return m[1];
	}

	function indexOf (xs, x) {
	    if (xs.indexOf) return xs.indexOf(x);
	    for (var i = 0, l = xs.length; i < l; i++) {
	        if (xs[i] === x) return i;
	    }
	    return -1;
	}

	function isElement (x) {
	    if (!x || typeof x !== 'object') return false;
	    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
	        return true;
	    }
	    return typeof x.nodeName === 'string'
	        && typeof x.getAttribute === 'function'
	    ;
	}

	function inspectString (str) {
	    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
	    return "'" + s + "'";
	    
	    function lowbyte (c) {
	        var n = c.charCodeAt(0);
	        var x = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[n];
	        if (x) return '\\' + x;
	        return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
	    }
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Returns true if the given object is a function.
	 */
	'use strict';

	function isFunction(object) {
	  return typeof object === 'function';
	}

	module.exports = isFunction;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isRegExp = __webpack_require__(5);
	var isFunction = __webpack_require__(8);

	/**
	 * Returns true if the given function throws the given value
	 * when invoked. The value may be:
	 *
	 * - undefined, to merely assert there was a throw
	 * - a constructor function, for comparing using instanceof
	 * - a regular expression, to compare with the error message
	 * - a string, to find in the error message
	 */
	function functionThrows(fn, context, args, value) {
	  try {
	    fn.apply(context, args);
	  } catch (error) {
	    if (value == null) return true;

	    if (isFunction(value) && error instanceof value) return true;

	    var message = error.message || error;

	    if (typeof message === 'string') {
	      if (isRegExp(value) && value.test(error.message)) return true;

	      if (typeof value === 'string' && message.indexOf(value) !== -1) return true;
	    }
	  }

	  return false;
	}

	module.exports = functionThrows;

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Returns true if the given string contains the value, false otherwise.
	 */
	"use strict";

	function stringContains(string, value) {
	  return string.indexOf(value) !== -1;
	}

	module.exports = stringContains;

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Returns true if the given array contains the value, false
	 * otherwise. The comparator function must return false to
	 * indicate a non-match.
	 */
	"use strict";

	function arrayContains(array, value, comparator) {
	  if (comparator == null) return array.indexOf(value) !== -1;

	  return array.some(function (item) {
	    return comparator(item, value) !== false;
	  });
	}

	module.exports = arrayContains;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isFunction = __webpack_require__(8);

	/**
	 * Returns true if the given object is an instanceof value
	 * or its typeof is the given value.
	 */
	function isA(object, value) {
	  if (isFunction(value)) return object instanceof value;

	  if (value === 'array') return Array.isArray(object);

	  return typeof object === value;
	}

	module.exports = isA;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var invariant = __webpack_require__(6);
	var isFunction = __webpack_require__(8);

	function noop() {}

	function createSpy(fn) {
	  if (fn == null) fn = noop;

	  invariant(isFunction(fn), 'createSpy needs a function');

	  var targetFn, thrownValue, returnValue;

	  var spy = function spy() {
	    spy.calls.push({
	      context: this,
	      arguments: Array.prototype.slice.call(arguments, 0)
	    });

	    if (targetFn) return targetFn.apply(this, arguments);

	    if (thrownValue) throw thrownValue;

	    return returnValue;
	  };

	  spy.calls = [];

	  spy.andCall = function (fn) {
	    targetFn = fn;
	    return spy;
	  };

	  spy.andCallThrough = function () {
	    return spy.andCall(fn);
	  };

	  spy.andThrow = function (object) {
	    thrownValue = object;
	    return spy;
	  };

	  spy.andReturn = function (value) {
	    returnValue = value;
	    return spy;
	  };

	  spy.getLastCall = function () {
	    return spy.calls[spy.calls.length - 1];
	  };

	  spy.__isSpy = true;

	  return spy;
	}

	function spyOn(object, methodName) {
	  var original = object[methodName];

	  if (original == null || !original.__isSpy) {
	    var spy = createSpy(original);

	    spy.restore = spy.destroy = function () {
	      object[methodName] = original;
	    };

	    object[methodName] = spy;
	  }

	  return object[methodName];
	}

	module.exports = {
	  createSpy: createSpy,
	  spyOn: spyOn
	};

/***/ }
/******/ ])
});
;