/*!
 * @license Copyright 2021, Ably
 * 
 * Ably JavaScript Library v1.2.5
 * https://github.com/ably/ably-js
 * 
 * Ably Realtime Messaging
 * https://www.ably.io
 * 
 * Released under the Apache Licence v2.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Ably"] = factory();
	else
		root["Ably"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


var Logger = (function() {
	var consoleLogger, errorLogger;

	/* Can't just check for console && console.log; fails in IE <=9 */
	if((typeof Window === 'undefined' && typeof WorkerGlobalScope === 'undefined') /* node */ ||
		 (global.console && global.console.log && (typeof global.console.log.apply === 'function')) /* sensible browsers */) {
		consoleLogger = function() { console.log.apply(console, arguments); };
		errorLogger = console.warn ? function() { console.warn.apply(console, arguments); } : consoleLogger;
	} else if(global.console && global.console.log) {
		/* IE <= 9 with the console open -- console.log does not
		 * inherit from Function, so has no apply method */
		consoleLogger = errorLogger = function() { Function.prototype.apply.call(console.log, console, arguments); };
	} else {
		/* IE <= 9 when dev tools are closed - window.console not even defined */
		consoleLogger = errorLogger = function() {};
	}

	function pad(str, three) {
		return ('000' + str).slice(-2-(three || 0));
	}

	var LOG_NONE  = 0,
	LOG_ERROR = 1,
	LOG_MAJOR = 2,
	LOG_MINOR = 3,
	LOG_MICRO = 4;

	var LOG_DEFAULT = LOG_ERROR,
	LOG_DEBUG   = LOG_MICRO;

	var logLevel = LOG_DEFAULT;

	function getHandler(logger) {
		return platform__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].logTimestamps ?
			function(msg) {
				var time = new Date();
				logger(pad(time.getHours()) + ':' + pad(time.getMinutes()) + ':' + pad(time.getSeconds()) + '.' + pad(time.getMilliseconds(), true) + ' ' + msg);
			} : logger;
	}

	var logHandler = getHandler(consoleLogger),
		logErrorHandler = getHandler(errorLogger);

	/* public constructor */
	function Logger(args) {}

	/* public constants */
	Logger.LOG_NONE    = LOG_NONE,
	Logger.LOG_ERROR   = LOG_ERROR,
	Logger.LOG_MAJOR   = LOG_MAJOR,
	Logger.LOG_MINOR   = LOG_MINOR,
	Logger.LOG_MICRO   = LOG_MICRO;

	Logger.LOG_DEFAULT = LOG_DEFAULT,
	Logger.LOG_DEBUG   = LOG_DEBUG;

	/* public static functions */
	Logger.logAction = function(level, action, message) {
		if (Logger.shouldLog(level)) {
			(level === LOG_ERROR ? logErrorHandler : logHandler)('Ably: ' + action + ': ' + message);
		}
	};

	Logger.deprecated = function(original, replacement) {
		Logger.deprecatedWithMsg(original, "Please use '" + replacement + "' instead.");
	}

	Logger.deprecatedWithMsg = function(funcName, msg) {
		if (Logger.shouldLog(LOG_ERROR)) {
			logErrorHandler("Ably: Deprecation warning - '" + funcName + "' is deprecated and will be removed from a future version. " + msg);
		}
	}

	/* Where a logging operation is expensive, such as serialisation of data, use shouldLog will prevent
	   the object being serialised if the log level will not output the message */
	Logger.shouldLog = function(level) {
		return level <= logLevel;
	};

	Logger.setLog = function(level, handler) {
		if(level !== undefined) logLevel = level;
		if(handler !== undefined) logHandler = logErrorHandler = handler;
	};

	return Logger;
})();

/* harmony default export */ __webpack_exports__["a"] = (Logger);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(20)))

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var platform_bufferutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);




var Utils = (function() {
	var msgpack = platform__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].msgpack;

	function Utils() {}

	function randomPosn(arrOrStr) {
		return Math.floor(Math.random() * arrOrStr.length);
	}

	/*
	 * Add a set of properties to a target object
	 * target: the target object
	 * props:  an object whose enumerable properties are
	 *         added, by reference only
	 */
	Utils.mixin = function(target) {
		for(var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			if(!source) { break; }
			var hasOwnProperty = source.hasOwnProperty;
			for(var key in source) {
				if(!hasOwnProperty || hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}
		return target;
	};

	/*
	 * Add a set of properties to a target object
	 * target: the target object
	 * props:  an object whose enumerable properties are
	 *         added, by reference only
	 */
	Utils.copy = function(src) {
		return Utils.mixin({}, src);
	};

	/*
	 * Determine whether or not a given object is
	 * an array.
	 */
	Utils.isArray = Array.isArray || function(ob) {
		return Object.prototype.toString.call(ob) == '[object Array]';
	};

	/*
	 * Ensures that an Array object is always returned
	 * returning the original Array of obj is an Array
	 * else wrapping the obj in a single element Array
	 */
	Utils.ensureArray = function(obj) {
		if(Utils.isEmptyArg(obj)) {
			return [];
		}
		if(Utils.isArray(obj)) {
			return obj;
		}
		return [obj];
	}

	/* ...Or an Object (in the narrow sense) */
	Utils.isObject = function(ob) {
		return Object.prototype.toString.call(ob) == '[object Object]';
	};

	/*
	 * Determine whether or not an object contains
	 * any enumerable properties.
	 * ob: the object
	 */
	Utils.isEmpty = function(ob) {
		for(var prop in ob)
			return false;
		return true;
	};

	Utils.isOnlyPropIn = function(ob, property) {
		for(var prop in ob) {
			if(prop !== property) {
				return false;
			}
		}
		return true;
	};

	/*
	 * Determine whether or not an argument to an overloaded function is
	 * undefined (missing) or null.
	 * This method is useful when constructing functions such as (WebIDL terminology):
	 *   off([TreatUndefinedAs=Null] DOMString? event)
	 * as you can then confirm the argument using:
	 *   Utils.isEmptyArg(event)
	 */

	Utils.isEmptyArg = function(arg) {
		return arg === null || arg === undefined;
	}

	/*
	 * Perform a simple shallow clone of an object.
	 * Result is an object irrespective of whether
	 * the input is an object or array. All
	 * enumerable properties are copied.
	 * ob: the object
	 */
	Utils.shallowClone = function(ob) {
		var result = new Object();
		for(var prop in ob)
			result[prop] = ob[prop];
		return result;
	};

	/*
	 * Clone an object by creating a new object with the
	 * given object as its prototype. Optionally
	 * a set of additional own properties can be
	 * supplied to be added to the newly created clone.
	 * ob:            the object to be cloned
	 * ownProperties: optional object with additional
	 *                properties to add
	 */
	Utils.prototypicalClone = function(ob, ownProperties) {
		function F() {}
		F.prototype = ob;
		var result = new F();
		if(ownProperties)
			Utils.mixin(result, ownProperties);
		return result;
	};

	/*
	 * Declare a constructor to represent a subclass
	 * of another constructor
	 * If platform has a built-in version we use that from Platform, else we
	 * define here (so can make use of other Utils fns)
	 * See node.js util.inherits
	 */
	Utils.inherits = platform__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].inherits || function(ctor, superCtor) {
		ctor.super_ = superCtor;
		ctor.prototype = Utils.prototypicalClone(superCtor.prototype, { constructor: ctor });
	};

	/*
	 * Determine whether or not an object has an enumerable
	 * property whose value equals a given value.
	 * ob:  the object
	 * val: the value to find
	 */
	Utils.containsValue = function(ob, val) {
		for(var i in ob) {
			if(ob[i] == val)
				return true;
		}
		return false;
	};

	Utils.intersect = function(arr, ob) { return Utils.isArray(ob) ? Utils.arrIntersect(arr, ob) : Utils.arrIntersectOb(arr, ob); };

	Utils.arrIntersect = function(arr1, arr2) {
		var result = [];
		for(var i = 0; i < arr1.length; i++) {
			var member = arr1[i];
			if(Utils.arrIndexOf(arr2, member) != -1)
				result.push(member);
		}
		return result;
	};

	Utils.arrIntersectOb = function(arr, ob) {
		var result = [];
		for(var i = 0; i < arr.length; i++) {
			var member = arr[i];
			if(member in ob)
				result.push(member);
		}
		return result;
	};

	Utils.arrSubtract = function(arr1, arr2) {
		var result = [];
		for(var i = 0; i < arr1.length; i++) {
			var element = arr1[i];
			if(Utils.arrIndexOf(arr2, element) == -1)
				result.push(element);
		}
		return result;
	};

	Utils.arrIndexOf = Array.prototype.indexOf
		? function(arr, elem, fromIndex) {
			return arr.indexOf(elem,  fromIndex);
		}
		: function(arr, elem, fromIndex) {
			fromIndex = fromIndex || 0;
			var len = arr.length;
			for(;fromIndex < len; fromIndex++) {
				if(arr[fromIndex] === elem) {
					return fromIndex;
				}
			}
			return -1;
		};

	Utils.arrIn = function(arr, val) {
		return Utils.arrIndexOf(arr, val) !== -1;
	};

	Utils.arrDeleteValue = function(arr, val) {
		var idx = Utils.arrIndexOf(arr, val);
		var res = (idx != -1);
		if(res)
			arr.splice(idx, 1);
		return res;
	};

	Utils.arrWithoutValue = function(arr, val) {
		var newArr = arr.slice();
		Utils.arrDeleteValue(newArr, val);
		return newArr;
	};

	/*
	 * Construct an array of the keys of the enumerable
	 * properties of a given object, optionally limited
	 * to only the own properties.
	 * ob:      the object
	 * ownOnly: boolean, get own properties only
	 */
	Utils.keysArray = function(ob, ownOnly) {
		var result = [];
		for(var prop in ob) {
			if(ownOnly && !ob.hasOwnProperty(prop)) continue;
			result.push(prop);
		}
		return result;
	};

	/*
	 * Construct an array of the values of the enumerable
	 * properties of a given object, optionally limited
	 * to only the own properties.
	 * ob:      the object
	 * ownOnly: boolean, get own properties only
	 */
	Utils.valuesArray = function(ob, ownOnly) {
		var result = [];
		for(var prop in ob) {
			if(ownOnly && !ob.hasOwnProperty(prop)) continue;
			result.push(ob[prop]);
		}
		return result;
	};

	Utils.forInOwnNonNullProps = function(ob, fn) {
		for (var prop in ob) {
			if (Object.prototype.hasOwnProperty.call(ob, prop) && ob[prop]) {
				fn(prop);
			}
		}
	};

	Utils.arrForEach = Array.prototype.forEach ?
		function(arr, fn) {
			arr.forEach(fn);
		} :
		function(arr, fn) {
			var len = arr.length;
			for(var i = 0; i < len; i++) {
				fn(arr[i], i, arr);
			}
		};

	/* Useful when the function may mutate the array */
	Utils.safeArrForEach = function(arr, fn) {
		return Utils.arrForEach(arr.slice(), fn);
	};

	Utils.arrMap = Array.prototype.map ?
		function(arr, fn) {
			return arr.map(fn);
		} :
		function(arr, fn)	{
			var result = [],
				len = arr.length;
			for(var i = 0; i < len; i++) {
				result.push(fn(arr[i], i, arr));
			}
			return result;
		};

	Utils.arrFilter = Array.prototype.filter ?
		function(arr, fn) {
			return arr.filter(fn);
		} :
		function(arr, fn)	{
			var result = [],
				len = arr.length;
			for(var i = 0; i < len; i++) {
				if(fn(arr[i])) {
					result.push(arr[i]);
				}
			}
			return result;
		};

	Utils.arrEvery = Array.prototype.every ?
		function(arr, fn) {
			return arr.every(fn);
		} : function(arr, fn) {
			var len = arr.length;
			for(var i = 0; i < len; i++) {
				if(!fn(arr[i], i, arr)) {
					return false;
				};
			}
			return true;
		};

	Utils.allSame = function(arr, prop) {
		if(arr.length === 0) {
			return true;
		}
		var first = arr[0][prop];
		return Utils.arrEvery(arr, function(item) {
			return item[prop] === first;
		});
	};

	Utils.nextTick = platform__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].nextTick;

	var contentTypes = {
		json:   'application/json',
		jsonp:  'application/javascript',
		xml:    'application/xml',
		html:   'text/html',
		msgpack: 'application/x-msgpack'
	};

	Utils.defaultGetHeaders = function(format) {
		var accept = contentTypes[format || 'json'];
		return {
			accept: accept,
			'X-Ably-Version': _defaults__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].apiVersion,
			'X-Ably-Lib': _defaults__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].libstring
		};
	};

	Utils.defaultPostHeaders = function(format) {
		var accept, contentType;
		accept = contentType = contentTypes[format || 'json'];

		return {
			accept: accept,
			'content-type': contentType,
			'X-Ably-Version': _defaults__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].apiVersion,
			'X-Ably-Lib': _defaults__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].libstring
		};
	};

	Utils.arrPopRandomElement = function(arr) {
		return arr.splice(randomPosn(arr), 1)[0];
	};

	Utils.toQueryString = function(params) {
		var parts = [];
		if(params) {
			for(var key in params)
				parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
		}
		return parts.length ? '?' + parts.join('&') : '';
	};

	Utils.parseQueryString = function(query) {
		var match,
			search = /([^?&=]+)=?([^&]*)/g,
			result = {};

		while (match = search.exec(query))
			result[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);

 		return result;
	};

	Utils.now = Date.now || function() {
		/* IE 8 */
		return new Date().getTime();
	};

	Utils.inspect = platform__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].inspect;

	Utils.isErrorInfo = function(err) {
		return err.constructor.name == 'ErrorInfo'
	};

	Utils.inspectError = function(x) {
		/* redundant, but node vmcontext issue makes instanceof unreliable, and
		 * can't use just constructor test as could be a TypeError constructor etc. */
		return (x && (Utils.isErrorInfo(x) ||
			x.constructor.name == 'Error' ||
			x instanceof Error)) ?
			x.toString() :
			Utils.inspect(x);
	};

	Utils.inspectBody = function(body) {
		if(platform_bufferutils__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].isBuffer(body)) {
			return body.toString();
		} else if(typeof body === 'string') {
			return body;
		} else {
			return platform__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].inspect(body);
		}
	};

	/* Data is assumed to be either a string or a buffer. */
	Utils.dataSizeBytes = function(data) {
		if(platform_bufferutils__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].isBuffer(data)) {
			return platform_bufferutils__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].byteLength(data);
		}
		if(typeof data === 'string') {
			return platform__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].stringByteSize(data);
		}
		throw new Error("Expected input of Utils.dataSizeBytes to be a buffer or string, but was: " + (typeof data));
	};

	Utils.cheapRandStr = function() {
		return String(Math.random()).substr(2);
	};

	/* Takes param the minimum number of bytes of entropy the string must
	 * include, not the length of the string. String length produced is not
	 * guaranteed. */
	Utils.randomString = (platform__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].getRandomValues && typeof Uint8Array !== 'undefined') ?
		function(numBytes) {
			var uIntArr = new Uint8Array(numBytes);
			platform__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].getRandomValues(uIntArr);
			return platform_bufferutils__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].base64Encode(uIntArr);
		} : function(numBytes) {
			/* Old browser; fall back to Math.random. Could just use a
			 * CryptoJS version of the above, but want this to still work in nocrypto
			 * versions of the library */
			var charset = platform_bufferutils__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].base64CharSet;
			/* base64 has 33% overhead; round length up */
			var length = Math.round(numBytes * 4/3);
			var result = '';
			for(var i=0; i<length; i++) {
				result += charset[randomPosn(charset)];
			}
			return result;
		};

	Utils.randomHexString = (platform__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].getRandomValues && typeof Uint8Array !== 'undefined') ?
		function(numBytes) {
			var uIntArr = new Uint8Array(numBytes);
			platform__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].getRandomValues(uIntArr);
			return platform_bufferutils__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].hexEncode(uIntArr);
		} : function(numBytes) {
			var charset = platform_bufferutils__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].hexCharSet;
			var length = numBytes * 2;
			var result = '';
			for(var i=0; i<length; i++) {
				result += charset[randomPosn(charset)];
			}
			return result;
		};

	/* Pick n elements at random without replacement from an array */
	Utils.arrChooseN = function(arr, n) {
		var numItems = Math.min(n, arr.length),
			mutableArr = arr.slice(),
			result = [];
		for(var i = 0; i < numItems; i++) {
			result.push(Utils.arrPopRandomElement(mutableArr));
		}
		return result;
	};

	Utils.trim = String.prototype.trim ? function(str) {
		return str.trim();
	} : function(str) {
		return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};

	Utils.promisify = function(ob, fnName, args) {
		return new Promise(function(resolve, reject) {
			ob[fnName].apply(ob, Array.prototype.slice.call(args).concat(function(err, res) {
				err ? reject(err) : resolve(res);
			}));
		});
	};

	Utils.decodeBody = function(body, format) {
		return (format == 'msgpack') ? msgpack.decode(body) : JSON.parse(String(body));
	};

	Utils.encodeBody = function(body, format) {
		return (format == 'msgpack') ? msgpack.encode(body, true) : JSON.stringify(body);
	};

	Utils.allToLowerCase = function(arr) {
		return Utils.arrMap(arr, function(element) {
			return element && element.toLowerCase();
		});
	};

	Utils.allToUpperCase = function(arr) {
		return Utils.arrMap(arr, function(element) {
			return element && element.toUpperCase();
		});
	};

	return Utils;
})();

/* harmony default export */ __webpack_exports__["a"] = (Utils);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _util_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


var ErrorInfo = (function() {

	function ErrorInfo(message, code, statusCode, cause) {
		this.message = message;
		this.code = code;
		this.statusCode = statusCode;
		this.cause = cause;
		this.href = undefined;
	}

	ErrorInfo.prototype.toString = function() {
		var result = '[' + this.constructor.name;
		if(this.message) result += ': ' + this.message;
		if(this.statusCode) result += '; statusCode=' + this.statusCode;
		if(this.code) result += '; code=' + this.code;
		if(this.cause) result += '; cause=' + _util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].inspectError(this.cause);
		if(this.href && !(this.message && this.message.indexOf('help.ably.io') > -1)) result += '; see ' + this.href + ' ';
		result += ']';
		return result;
	};

	ErrorInfo.fromValues = function(values) {
		var result = _util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].mixin(new ErrorInfo(), values);
		if (values instanceof Error) {
			/* Error.message is not enumerable, so mixin loses the message */
			result.message = values.message;
		}
		if(result.code && !result.href) {
			result.href = 'https://help.ably.io/error/' + result.code;
		}
		return result;
	};

	return ErrorInfo;
})();

/* harmony default export */ __webpack_exports__["a"] = (ErrorInfo);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _lib_util_msgpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);


if(typeof Window === 'undefined' && typeof WorkerGlobalScope === 'undefined') {
	console.log("Warning: this distribution of Ably is intended for browsers. On nodejs, please use the 'ably' package on npm");
}

function allowComet() {
	/* xhr requests from local files are unreliable in some browsers, such as Chrome 65 and higher -- see eg
	 * https://stackoverflow.com/questions/49256429/chrome-65-unable-to-make-post-requests-from-local-files-to-flask
	 * So if websockets are supported, then just forget about comet transports and use that */
	var loc = global.location;
	return (!global.WebSocket || !loc || !loc.origin || loc.origin.indexOf("http") > -1);
}

var userAgent = global.navigator && global.navigator.userAgent.toString();
var currentUrl = global.location && global.location.href;

var Platform = {
	libver: 'js-web',
	logTimestamps: true,
	userAgent: userAgent,
	currentUrl: currentUrl,
	noUpgrade: userAgent && userAgent.match(/MSIE\s8\.0/),
	binaryType: 'arraybuffer',
	WebSocket: global.WebSocket || global.MozWebSocket,
	xhrSupported: global.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest(),
	jsonpSupported: typeof(document) !== 'undefined',
	allowComet: allowComet(),
	streamingSupported: true,
	useProtocolHeartbeats: true,
	createHmac: null,
	msgpack: _lib_util_msgpack__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"],
	supportsBinary: !!global.TextDecoder,
	preferBinary: false,
	ArrayBuffer: global.ArrayBuffer,
	atob: global.atob,
	nextTick: function(f) { setTimeout(f, 0); },
	addEventListener: global.addEventListener,
	inspect: JSON.stringify,
	stringByteSize: function(str) {
		/* str.length will be an underestimate for non-ascii strings. But if we're
		 * in a browser too old to support TextDecoder, not much we can do. Better
		 * to underestimate, so if we do go over-size, the server will reject the
		 * message */
		return global.TextDecoder &&
			(new global.TextEncoder().encode(str)).length ||
			str.length;
	},
	TextEncoder: global.TextEncoder,
	TextDecoder: global.TextDecoder,
	Promise: global.Promise,
	getRandomValues: (function(crypto) {
		if (crypto === undefined) {
			return undefined;
		}
		return function(arr, callback) {
			crypto.getRandomValues(arr);
			if(callback) {
				callback(null);
			}
		};
	})(global.crypto || global.msCrypto) // mscrypto for IE11
};

/* harmony default export */ __webpack_exports__["a"] = (Platform);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(20)))

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var crypto_js_build_enc_hex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var crypto_js_build_enc_hex__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto_js_build_enc_hex__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var crypto_js_build_enc_utf8__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var crypto_js_build_enc_utf8__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto_js_build_enc_utf8__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var crypto_js_build_enc_base64__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var crypto_js_build_enc_base64__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(crypto_js_build_enc_base64__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);






var BufferUtils = (function() {
	var ArrayBuffer = platform__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].ArrayBuffer;
	var atob = platform__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].atob;
	var TextEncoder = platform__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].TextEncoder;
	var TextDecoder = platform__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].TextDecoder;
	var base64CharSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	var hexCharSet = '0123456789abcdef';

	function isWordArray(ob) { return ob !== null && ob !== undefined && ob.sigBytes !== undefined; }
	function isArrayBuffer(ob) { return ob !== null && ob !== undefined && ob.constructor === ArrayBuffer; }
	function isTypedArray(ob) { return ArrayBuffer && ArrayBuffer.isView && ArrayBuffer.isView(ob); }

	// https://gist.githubusercontent.com/jonleighton/958841/raw/f200e30dfe95212c0165ccf1ae000ca51e9de803/gistfile1.js
	function uint8ViewToBase64(bytes) {
		var base64    = ''
		var encodings = base64CharSet;

		var byteLength    = bytes.byteLength
		var byteRemainder = byteLength % 3
		var mainLength    = byteLength - byteRemainder

		var a, b, c, d
		var chunk

		// Main loop deals with bytes in chunks of 3
		for (var i = 0; i < mainLength; i = i + 3) {
			// Combine the three bytes into a single integer
			chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

			// Use bitmasks to extract 6-bit segments from the triplet
			a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
			b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
			c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
			d = chunk & 63               // 63       = 2^6 - 1

			// Convert the raw binary segments to the appropriate ASCII encoding
			base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
		}

		// Deal with the remaining bytes and padding
		if (byteRemainder == 1) {
			chunk = bytes[mainLength]

			a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

			// Set the 4 least significant bits to zero
			b = (chunk & 3)   << 4 // 3   = 2^2 - 1

			base64 += encodings[a] + encodings[b] + '=='
		} else if (byteRemainder == 2) {
			chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

			a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
			b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4

			// Set the 2 least significant bits to zero
			c = (chunk & 15)    <<  2 // 15    = 2^4 - 1

			base64 += encodings[a] + encodings[b] + encodings[c] + '='
		}

		return base64
	}

	function base64ToArrayBuffer(base64) {
		var binary_string =  atob(base64);
		var len = binary_string.length;
		var bytes = new Uint8Array( len );
		for (var i = 0; i < len; i++)        {
			var ascii = binary_string.charCodeAt(i);
			bytes[i] = ascii;
		}
		return bytes.buffer;
	}

	/* Most BufferUtils methods that return a binary object return an ArrayBuffer
	 * if supported, else a CryptoJS WordArray. The exception is toBuffer, which
	 * returns a Uint8Array (and won't work on browsers too old to support it) */
	function BufferUtils() {}

	BufferUtils.base64CharSet = base64CharSet;
	BufferUtils.hexCharSet = hexCharSet;

	var isBuffer = BufferUtils.isBuffer = function(buf) { return isArrayBuffer(buf) || isWordArray(buf) || isTypedArray(buf); };

	/* In browsers, returns a Uint8Array */
	var toBuffer = BufferUtils.toBuffer = function(buf) {
		if(!ArrayBuffer) {
			throw new Error("Can't convert to Buffer: browser does not support the necessary types");
		}

		if(isArrayBuffer(buf)) {
			return new Uint8Array(buf);
		}

		if(isTypedArray(buf)) {
			return new Uint8Array(buf.buffer);
		}

		if(isWordArray(buf)) {
			/* Backported from unreleased CryptoJS
			* https://code.google.com/p/crypto-js/source/browse/branches/3.x/src/lib-typedarrays.js?r=661 */
			var arrayBuffer = new ArrayBuffer(buf.sigBytes);
			var uint8View = new Uint8Array(arrayBuffer);

			for (var i = 0; i < buf.sigBytes; i++) {
				uint8View[i] = (buf.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
			}

			return uint8View;
		};

		throw new Error("BufferUtils.toBuffer expected an arraybuffer, typed array, or CryptoJS wordarray");
	};

	BufferUtils.toArrayBuffer = function(buf) {
		if(isArrayBuffer(buf)) {
			return buf;
		}
		return toBuffer(buf).buffer;
	};

	BufferUtils.toWordArray = function(buf) {
		if(isTypedArray(buf)) {
			buf = buf.buffer;
		}
		return isWordArray(buf) ? buf : crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_3___default.a.create(buf);
	};

	BufferUtils.base64Encode = function(buf) {
		if(isWordArray(buf)) {
			return Object(crypto_js_build_enc_base64__WEBPACK_IMPORTED_MODULE_2__["stringify"])(buf);
		}
		return uint8ViewToBase64(toBuffer(buf));
	};

	BufferUtils.base64Decode = function(str) {
		if(ArrayBuffer && atob) {
			return base64ToArrayBuffer(str);
		}
		return Object(crypto_js_build_enc_base64__WEBPACK_IMPORTED_MODULE_2__["parse"])(str);
	};

	BufferUtils.hexEncode = function(buf) {
		buf = BufferUtils.toWordArray(buf);
		return Object(crypto_js_build_enc_hex__WEBPACK_IMPORTED_MODULE_0__["stringify"])(buf);
	};

	BufferUtils.hexDecode = function(string) {
		var wordArray = Object(crypto_js_build_enc_hex__WEBPACK_IMPORTED_MODULE_0__["parse"])(string);
		return ArrayBuffer ? BufferUtils.toArrayBuffer(wordArray) : wordArray;
	};

	BufferUtils.utf8Encode = function(string) {
		if(TextEncoder) {
			return (new TextEncoder()).encode(string).buffer;
		}
		return Object(crypto_js_build_enc_utf8__WEBPACK_IMPORTED_MODULE_1__["parse"])(string);
	};

	/* For utf8 decoding we apply slightly stricter input validation than to
	 * hexEncode/base64Encode/etc: in those we accept anything that Buffer.from
	 * can take (in particular allowing strings, which are just interpreted as
	 * binary); here we ensure that the input is actually a buffer since trying
	 * to utf8-decode a string to another string is almost certainly a mistake */
	BufferUtils.utf8Decode = function(buf) {
		if(!isBuffer(buf)) {
			throw new Error("Expected input of utf8decode to be an arraybuffer, typed array, or CryptoJS wordarray");
		}
		if(TextDecoder && !isWordArray(buf)) {
			return (new TextDecoder()).decode(buf);
		}
		buf = BufferUtils.toWordArray(buf);
		return Object(crypto_js_build_enc_utf8__WEBPACK_IMPORTED_MODULE_1__["stringify"])(buf);
	};

	BufferUtils.bufferCompare = function(buf1, buf2) {
		if(!buf1) return -1;
		if(!buf2) return 1;
		buf1 = BufferUtils.toWordArray(buf1);
		buf2 = BufferUtils.toWordArray(buf2);
		buf1.clamp(); buf2.clamp();

		var cmp = buf1.sigBytes - buf2.sigBytes;
		if(cmp != 0) return cmp;
		buf1 = buf1.words; buf2 = buf2.words;
		for(var i = 0; i < buf1.length; i++) {
			cmp = buf1[i] - buf2[i];
			if(cmp != 0) return cmp;
		}
		return 0;
	};

	BufferUtils.byteLength = function(buf) {
		if(isArrayBuffer(buf) || isTypedArray(buf)) {
			return buf.byteLength
		} else if(isWordArray(buf)) {
			return buf.sigBytes;
		}
	};

	/* Returns ArrayBuffer on browser and Buffer on Node.js */
	BufferUtils.typedArrayToBuffer = function(typedArray) {
		return typedArray.buffer;
	};

	return BufferUtils;
})();

/* harmony default export */ __webpack_exports__["a"] = (BufferUtils);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./browser/fragments/platform-browser.js
var platform_browser = __webpack_require__(3);

// CONCATENATED MODULE: ./browser/lib/util/defaults.js


var Defaults = {
	internetUpUrl: 'https://internet-up.ably-realtime.com/is-the-internet-up.txt',
	jsonpInternetUpUrl: 'https://internet-up.ably-realtime.com/is-the-internet-up-0-9.js',
	/* Order matters here: the base transport is the leftmost one in the
	 * intersection of baseTransportOrder and the transports clientOption that's
	 * supported.  This is not quite the same as the preference order -- e.g.
	 * xhr_polling is preferred to jsonp, but for browsers that support it we want
	 * the base transport to be xhr_polling, not jsonp */
	defaultTransports: ['xhr_polling', 'xhr_streaming', 'jsonp', 'web_socket'],
	baseTransportOrder: ['xhr_polling', 'xhr_streaming', 'jsonp', 'web_socket'],
	transportPreferenceOrder: ['jsonp', 'xhr_polling', 'xhr_streaming', 'web_socket'],
	upgradeTransports: ['xhr_streaming', 'web_socket']
};

/* If using IE8, don't attempt to upgrade from xhr_polling to xhr_streaming -
* while it can do streaming, the low max http-connections-per-host limit means
* that the polling transport is crippled during the upgrade process. So just
* leave it at the base transport */
if(platform_browser["a" /* default */].noUpgrade) {
	Defaults.upgradeTransports = [];
}

/* harmony default export */ var defaults = (Defaults);

// EXTERNAL MODULE: ./common/lib/util/utils.js
var utils = __webpack_require__(1);

// EXTERNAL MODULE: ./browser/lib/util/bufferutils.js
var bufferutils = __webpack_require__(4);

// EXTERNAL MODULE: ./common/lib/util/logger.js
var logger = __webpack_require__(0);

// EXTERNAL MODULE: ./common/lib/types/errorinfo.js
var errorinfo = __webpack_require__(2);

// CONCATENATED MODULE: ./common/lib/util/defaults.js







defaults.ENVIRONMENT              = '';
defaults.REST_HOST                = 'rest.ably.io';
defaults.REALTIME_HOST            = 'realtime.ably.io';
defaults.FALLBACK_HOSTS           = ['A.ably-realtime.com', 'B.ably-realtime.com', 'C.ably-realtime.com', 'D.ably-realtime.com', 'E.ably-realtime.com'];
defaults.PORT                     = 80;
defaults.TLS_PORT                 = 443;
defaults.TIMEOUTS = {
	/* Documented as options params: */
	disconnectedRetryTimeout   : 15000,
	suspendedRetryTimeout      : 30000,
	/* Undocumented, but part of the api and can be used by customers: */
	httpRequestTimeout         : 15000,
	channelRetryTimeout        : 15000,
	fallbackRetryTimeout       : 600000,
	/* For internal / test use only: */
	connectionStateTtl         : 120000,
	realtimeRequestTimeout     : 10000,
	recvTimeout                : 90000,
	preferenceConnectTimeout   : 6000,
	parallelUpgradeDelay       : 6000
};
defaults.httpMaxRetryCount = 3;
defaults.maxMessageSize    = 65536;

defaults.errorReportingUrl = 'https://errors.ably.io/api/15/store/';
defaults.errorReportingHeaders = {
	"X-Sentry-Auth": "Sentry sentry_version=7, sentry_key=a04e33c8674c451f8a310fbec029acf5, sentry_client=ably-js/0.1",
	"Content-Type": "application/json"
};

defaults.version          = '1.2.5';
defaults.libstring        = platform_browser["a" /* default */].libver + '-' + defaults.version;
defaults.apiVersion       = '1.2';

defaults.getHost = function(options, host, ws) {
	if(ws)
		host = ((host == options.restHost) && options.realtimeHost) || host || options.realtimeHost;
	else
		host = host || options.restHost;

	return host;
};

defaults.getPort = function(options, tls) {
	return (tls || options.tls) ? options.tlsPort : options.port;
};

defaults.getHttpScheme = function(options) {
	return options.tls ? 'https://' : 'http://';
};

// construct environment fallback hosts as per RSC15i
defaults.environmentFallbackHosts = function(environment) {
	return [
		environment + '-a-fallback.ably-realtime.com',
		environment + '-b-fallback.ably-realtime.com',
		environment + '-c-fallback.ably-realtime.com',
		environment + '-d-fallback.ably-realtime.com',
		environment + '-e-fallback.ably-realtime.com'
	];
};

defaults.getFallbackHosts = function(options) {
	var fallbackHosts = options.fallbackHosts,
		httpMaxRetryCount = typeof(options.httpMaxRetryCount) !== 'undefined' ? options.httpMaxRetryCount : defaults.httpMaxRetryCount;

	return fallbackHosts ? utils["a" /* default */].arrChooseN(fallbackHosts, httpMaxRetryCount) : [];
};

defaults.getHosts = function(options) {
	return [options.restHost].concat(defaults.getFallbackHosts(options));
};

function checkHost(host) {
	if(typeof host !== 'string') {
		throw new errorinfo["a" /* default */]('host must be a string; was a ' + typeof host, 40000, 400);
	};
	if(!host.length) {
		throw new errorinfo["a" /* default */]('host must not be zero-length', 40000, 400);
	};
}

defaults.objectifyOptions = function(options) {
	if(typeof options == 'string') {
		return (options.indexOf(':') == -1) ? {token: options} : {key: options};
	}
	return options;
};

defaults.normaliseOptions = function(options) {
	/* Deprecated options */
	if(options.host) {
		logger["a" /* default */].deprecated('host', 'restHost');
		options.restHost = options.host;
	}
	if(options.wsHost) {
		logger["a" /* default */].deprecated('wsHost', 'realtimeHost');
		options.realtimeHost = options.wsHost;
	}
	if(options.queueEvents) {
		logger["a" /* default */].deprecated('queueEvents', 'queueMessages');
		options.queueMessages = options.queueEvents;
	}

	if(options.fallbackHostsUseDefault) {
		/* fallbackHostsUseDefault and fallbackHosts are mutually exclusive as per TO3k7 */
		if(options.fallbackHosts) {
			var msg = 'fallbackHosts and fallbackHostsUseDefault cannot both be set';
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Defaults.normaliseOptions', msg);
			throw new errorinfo["a" /* default */](msg, 40000, 400);
		}

		/* default fallbacks can't be used with custom ports */
		if(options.port || options.tlsPort) {
			var msg = 'fallbackHostsUseDefault cannot be set when port or tlsPort are set';
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Defaults.normaliseOptions', msg);
			throw new errorinfo["a" /* default */](msg, 40000, 400);
		}

		/* emit an appropriate deprecation warning */
		if(options.environment) {
			logger["a" /* default */].deprecatedWithMsg('fallbackHostsUseDefault', 'There is no longer a need to set this when the environment option is also set since the library will now generate the correct fallback hosts using the environment option.');
		} else {
			logger["a" /* default */].deprecated('fallbackHostsUseDefault', 'fallbackHosts: Ably.Defaults.FALLBACK_HOSTS');
		}

		/* use the default fallback hosts as requested */
		options.fallbackHosts = defaults.FALLBACK_HOSTS;
	}

	if(options.recover === true) {
		logger["a" /* default */].deprecated('{recover: true}', '{recover: function(lastConnectionDetails, cb) { cb(true); }}');
		options.recover = function(lastConnectionDetails, cb) { cb(true); };
	}

	if(typeof options.recover === 'function' && options.closeOnUnload === true) {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Defaults.normaliseOptions', 'closeOnUnload was true and a session recovery function was set - these are mutually exclusive, so unsetting the latter');
		options.recover = null;
	}

	if(!('closeOnUnload' in options)) {
		/* Have closeOnUnload default to true unless we have any indication that
		 * the user may want to recover the connection */
		options.closeOnUnload = !options.recover;
	}

	if(options.transports && utils["a" /* default */].arrIn(options.transports, 'xhr')) {
		logger["a" /* default */].deprecated('transports: ["xhr"]', 'transports: ["xhr_streaming"]');
		utils["a" /* default */].arrDeleteValue(options.transports, 'xhr');
		options.transports.push('xhr_streaming');
	}

	if(!('queueMessages' in options))
		options.queueMessages = true;

	/* infer hosts and fallbacks based on the configured environment */
	var environment = (options.environment && String(options.environment).toLowerCase()) || defaults.ENVIRONMENT;
	var production = !environment || (environment === 'production');

	if(!options.fallbackHosts && !options.restHost && !options.realtimeHost && !options.port && !options.tlsPort) {
		options.fallbackHosts = production ? defaults.FALLBACK_HOSTS : defaults.environmentFallbackHosts(environment);
	}

	if(!options.realtimeHost) {
		/* prefer setting realtimeHost to restHost as a custom restHost typically indicates
		 * a development environment is being used that can't be inferred by the library */
		if(options.restHost) {
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_WARN, 'Defaults.normaliseOptions', 'restHost is set to "' + options.restHost + '" but realtimeHost is not set, so setting realtimeHost to "' + options.restHost + '" too. If this is not what you want, please set realtimeHost explicitly.');
			options.realtimeHost = options.restHost
		} else {
			options.realtimeHost = production ? defaults.REALTIME_HOST : environment + '-' + defaults.REALTIME_HOST;
		}
	}

	if(!options.restHost) {
		options.restHost = production ? defaults.REST_HOST : environment + '-' + defaults.REST_HOST;
	}

	utils["a" /* default */].arrForEach((options.fallbackHosts || []).concat(options.restHost, options.realtimeHost), checkHost);

	options.port = options.port || defaults.PORT;
	options.tlsPort = options.tlsPort || defaults.TLS_PORT;
	options.maxMessageSize = options.maxMessageSize || defaults.maxMessageSize;
	if(!('tls' in options)) options.tls = true;

	/* Allow values passed in options to override default timeouts */
	options.timeouts = {};
	for(var prop in defaults.TIMEOUTS) {
		options.timeouts[prop] = options[prop] || defaults.TIMEOUTS[prop];
	};

	if('useBinaryProtocol' in options) {
		options.useBinaryProtocol = platform_browser["a" /* default */].supportsBinary && options.useBinaryProtocol;
	} else {
		options.useBinaryProtocol = platform_browser["a" /* default */].preferBinary;
	}

	if(options.clientId) {
		var headers = options.headers = options.headers || {};
		headers['X-Ably-ClientId'] = bufferutils["a" /* default */].base64Encode(bufferutils["a" /* default */].utf8Encode(options.clientId));
	}

	if(!('idempotentRestPublishing' in options)) {
		options.idempotentRestPublishing = true;
	}

	if(options.promises && !platform_browser["a" /* default */].Promise) {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Defaults.normaliseOptions', '{promises: true} was specified, but no Promise constructor found; disabling promises');
		options.promises = false;
	}

	return options;
};

/* harmony default export */ var util_defaults = __webpack_exports__["a"] = (defaults);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _common_lib_util_defaults__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);



var Http = (function() {
	var noop = function() {};

	function Http() {}

	var now = Date.now || function() {
		/* IE 8 */
		return new Date().getTime();
	};

	function shouldFallback(err) {
		var statusCode = err.statusCode;
		/* 400 + no code = a generic xhr onerror. Browser doesn't give us enough
		 * detail to know whether it's fallback-fixable, but it may be (eg if a
		 * network issue), so try just in case */
		return (statusCode === 408 && !err.code) ||
			(statusCode === 400 && !err.code)      ||
			(statusCode >= 500 && statusCode <= 504);
	}

	function getHosts(client) {
		/* If we're a connected realtime client, try the endpoint we're connected
		 * to first -- but still have fallbacks, being connected is not an absolute
		 * guarantee that a datacenter has free capacity to service REST requests. */
		var connection = client.connection,
			connectionHost = connection && connection.connectionManager.host;

		if(connectionHost) {
			return [connectionHost].concat(_common_lib_util_defaults__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].getFallbackHosts(client.options));
		}

		return _common_lib_util_defaults__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].getHosts(client.options);
	}
	Http._getHosts = getHosts;

	Http.methods = ['get', 'delete', 'post', 'put', 'patch'];
	Http.methodsWithoutBody = ['get', 'delete'];
	Http.methodsWithBody = _common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].arrSubtract(Http.methods, Http.methodsWithoutBody);

	/* - Http.get, Http.post, Http.put, ...
	 * Perform an HTTP request for a given path against prime and fallback Ably hosts
	 * @param rest
	 * @param path the full path
	 * @param headers optional hash of headers
	 * [only for methods with body: @param body object or buffer containing request body]
	 * @param params optional hash of params
	 * @param callback (err, response)
	 *
	 * - Http.getUri, Http.postUri, Http.putUri, ...
	 * Perform an HTTP request for a given full URI
	 * @param rest
	 * @param uri the full URI
	 * @param headers optional hash of headers
	 * [only for methods with body: @param body object or buffer containing request body]
	 * @param params optional hash of params
	 * @param callback (err, response)
	 */
	_common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].arrForEach(Http.methodsWithoutBody, function(method) {
		Http[method] = function(rest, path, headers, params, callback) {
			Http['do'](method, rest, path, headers, null, params, callback);
		};
		Http[method + 'Uri'] = function(rest, uri, headers, params, callback) {
			Http.doUri(method, rest, uri, headers, null, params, callback);
		};
	});

	_common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].arrForEach(Http.methodsWithBody, function(method) {
		Http[method] = function(rest, path, headers, body, params, callback) {
			Http['do'](method, rest, path, headers, body, params, callback);
		};
		Http[method + 'Uri'] = function(rest, uri, headers, body, params, callback) {
			Http.doUri(method, rest, uri, headers, body, params, callback);
		};
	});

	/* Unlike for doUri, the 'rest' param here is mandatory, as it's used to generate the hosts */
	Http['do'] = function(method, rest, path, headers, body, params, callback) {
		callback = callback || noop;
		var uriFromHost = (typeof(path) == 'function') ? path : function(host) { return rest.baseUri(host) + path; };
		var binary = (headers && headers.accept != 'application/json');
		var doArgs = arguments;

		var currentFallback = rest._currentFallback;
		if(currentFallback) {
			if(currentFallback.validUntil > now()) {
				/* Use stored fallback */
				Http.Request(method, rest, uriFromHost(currentFallback.host), headers, params, body, function(err) {
					if(err && shouldFallback(err)) {
						/* unstore the fallback and start from the top with the default sequence */
						rest._currentFallback = null;
						Http['do'].apply(Http, doArgs);
						return;
					}
					callback.apply(null, arguments);
				});
				return;
			} else {
				/* Fallback expired; remove it and fallthrough to normal sequence */
				rest._currentFallback = null;
			}
		}

		var hosts = getHosts(rest);

		/* if there is only one host do it */
		if(hosts.length == 1) {
			Http.doUri(method, rest, uriFromHost(hosts[0]), headers, body, params, callback);
			return;
		}

		/* hosts is an array with preferred host plus at least one fallback */
		var tryAHost = function(candidateHosts, persistOnSuccess) {
			var host = candidateHosts.shift();
			Http.doUri(method, rest, uriFromHost(host), headers, body, params, function(err) {
				if(err && shouldFallback(err) && candidateHosts.length) {
					tryAHost(candidateHosts, true);
					return;
				}
				if(persistOnSuccess) {
					/* RSC15f */
					rest._currentFallback = {
						host: host,
						validUntil: now() + rest.options.timeouts.fallbackRetryTimeout
					};
				}
				callback.apply(null, arguments);
			});
		};
		tryAHost(hosts);
	};

	Http.doUri = function(method, rest, uri, headers, body, params, callback) {
		Http.Request(method, rest, uri, headers, params, body, callback);
	};

	Http.supportsAuthHeaders = false;
	Http.supportsLinkHeaders = false;
	return Http;
})();

/* harmony default export */ __webpack_exports__["a"] = (Http);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);




var EventEmitter = (function() {

	/* public constructor */
	function EventEmitter() {
		this.any = [];
		this.events = {};
		this.anyOnce = [];
		this.eventsOnce = {};
	}

	/* Call the listener, catch any exceptions and log, but continue operation*/
	function callListener(eventThis, listener, args) {
		try {
			listener.apply(eventThis, args);
		} catch(e) {
			_logger__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].logAction(_logger__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].LOG_ERROR, 'EventEmitter.emit()', 'Unexpected listener exception: ' + e + '; stack = ' + (e && e.stack));
		}
	}

	/**
	 * Remove listeners that match listener
	 * @param targetListeners is an array of listener arrays or event objects with arrays of listeners
	 * @param listener the listener callback to remove
	 * @param eventFilter (optional) event name instructing the function to only remove listeners for the specified event
	 */
	function removeListener(targetListeners, listener, eventFilter) {
		var listeners, idx, eventName, targetListenersIndex;

		for (targetListenersIndex = 0; targetListenersIndex < targetListeners.length; targetListenersIndex++) {
			listeners = targetListeners[targetListenersIndex];
			if (eventFilter) { listeners = listeners[eventFilter]; }

			if (_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isArray(listeners)) {
				while ((idx = _utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].arrIndexOf(listeners, listener)) !== -1) {
					listeners.splice(idx, 1);
				}
				/* If events object has an event name key with no listeners then
				   remove the key to stop the list growing indefinitely */
				if (eventFilter && (listeners.length === 0)) {
					delete targetListeners[targetListenersIndex][eventFilter];
				}
			} else if (_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isObject(listeners)) {
				/* events */
				for (eventName in listeners) {
					if (listeners.hasOwnProperty(eventName) && _utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isArray(listeners[eventName])) {
						removeListener([listeners], listener, eventName);
					}
				}
			}
		}
	}

	/**
	 * Add an event listener
	 * @param event (optional) the name of the event to listen to
	 *        if not supplied, all events trigger a call to the listener
	 * @param listener the listener to be called
	 */
	EventEmitter.prototype.on = function(event, listener) {
		if(arguments.length == 1 && typeof(event) == 'function') {
			this.any.push(event);
		} else if(_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isEmptyArg(event)) {
			this.any.push(listener);
		} else if(_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isArray(event)) {
			var self = this;
			_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].arrForEach(event, function(ev) {
				self.on(ev, listener);
			});
		} else {
			var listeners = (this.events[event] || (this.events[event] = []));
			listeners.push(listener);
		}
	};

	/**
	 * Remove one or more event listeners
	 * @param event (optional) the name of the event whose listener
	 *        is to be removed. If not supplied, the listener is
	 *        treated as an 'any' listener
	 * @param listener (optional) the listener to remove. If not
	 *        supplied, all listeners are removed.
	 */
	EventEmitter.prototype.off = function(event, listener) {
		if(arguments.length == 0 || (_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isEmptyArg(event) && _utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isEmptyArg(listener))) {
			this.any = [];
			this.events = {};
			this.anyOnce = [];
			this.eventsOnce = {};
			return;
		}
		if(arguments.length == 1) {
			if(typeof(event) == 'function') {
				/* we take this to be the listener and treat the event as "any" .. */
				listener = event;
				event = null;
			}
			/* ... or we take event to be the actual event name and listener to be all */
		}

		if(listener && _utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isEmptyArg(event)) {
			removeListener([this.any, this.events, this.anyOnce, this.eventsOnce], listener);
			return;
		}

		if(_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isArray(event)) {
			var self = this;
			_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].arrForEach(event, function(ev) {
				self.off(ev, listener);
			});
		}

		/* "normal" case where event is an actual event */
		if(listener) {
			removeListener([this.events, this.eventsOnce], listener, event);
		} else {
			delete this.events[event];
			delete this.eventsOnce[event];
		}
	};

	/**
	 * Get the array of listeners for a given event; excludes once events
	 * @param event (optional) the name of the event, or none for 'any'
	 * @return array of events, or null if none
	 */
	EventEmitter.prototype.listeners = function(event) {
		if(event) {
			var listeners = (this.events[event] || []);
			if(this.eventsOnce[event])
				Array.prototype.push.apply(listeners, this.eventsOnce[event]);
			return listeners.length ? listeners : null;
		}
		return this.any.length ? this.any : null;
	};

	/**
	 * Emit an event
	 * @param event the event name
	 * @param args the arguments to pass to the listener
	 */
	EventEmitter.prototype.emit = function(event  /* , args... */) {
		var args = Array.prototype.slice.call(arguments, 1);
		var eventThis = {event:event};
		var listeners = [];

		if(this.anyOnce.length) {
			Array.prototype.push.apply(listeners, this.anyOnce);
			this.anyOnce = [];
		}
		if(this.any.length) {
			Array.prototype.push.apply(listeners, this.any);
		}
		var eventsOnceListeners = this.eventsOnce[event];
		if(eventsOnceListeners) {
			Array.prototype.push.apply(listeners, eventsOnceListeners);
			delete this.eventsOnce[event];
		}
		var eventsListeners = this.events[event];
		if(eventsListeners) {
			Array.prototype.push.apply(listeners, eventsListeners);
		}

		_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].arrForEach(listeners, function(listener) {
			callListener(eventThis, listener, args);
		});
	};

	/**
	 * Listen for a single occurrence of an event
	 * @param event the name of the event to listen to
	 * @param listener the listener to be called
	 */
	EventEmitter.prototype.once = function(event, listener) {
		var argCount = arguments.length, self = this;
		if((argCount === 0 || (argCount === 1 && typeof event !== 'function')) && platform__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Promise) {
			return new platform__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Promise(function(resolve) {
				self.once(event, resolve);
			});
		}
		if(arguments.length == 1 && typeof(event) == 'function') {
			this.anyOnce.push(event);
		} else if(_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isEmptyArg(event)) {
			this.anyOnce.push(listener);
		} else if(_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isArray(event)){
			throw("Arrays of events can only be used with on(), not once()");
		} else {
			var listeners = (this.eventsOnce[event] || (this.eventsOnce[event] = []));
			listeners.push(listener);
		}
	};

	/**
	 * Private API
	 *
	 * Listen for a single occurrence of a state event and fire immediately if currentState matches targetState
	 * @param targetState the name of the state event to listen to
	 * @param currentState the name of the current state of this object
	 * @param listener the listener to be called
	 */
	EventEmitter.prototype.whenState = function(targetState, currentState, listener /* ...listenerArgs */) {
		var eventThis = {event:targetState},
			self = this,
			listenerArgs = Array.prototype.slice.call(arguments, 3);

		if((typeof(targetState) !== 'string') || (typeof(currentState) !== 'string')) {
			throw("whenState requires a valid event String argument");
		}
		if(typeof listener !== 'function' && platform__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Promise) {
			return new platform__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Promise(function(resolve) {
				EventEmitter.prototype.whenState.apply(self, [targetState, currentState, resolve].concat(listenerArgs));
			});
		}
		if(targetState === currentState) {
			callListener(eventThis, listener, listenerArgs);
		} else {
			this.once(targetState, listener);
		}
	}

	return EventEmitter;
})();

/* harmony default export */ __webpack_exports__["a"] = (EventEmitter);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _util_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _errorinfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _presencemessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);





var ProtocolMessage = (function() {

	function ProtocolMessage() {
		this.action = undefined;
		this.flags = undefined;
		this.id = undefined;
		this.timestamp = undefined;
		this.count = undefined;
		this.error = undefined;
		this.connectionId = undefined;
		this.connectionKey = undefined;
		this.connectionSerial = undefined;
		this.channel = undefined;
		this.channelSerial = undefined;
		this.msgSerial = undefined;
		this.messages = undefined;
		this.presence = undefined;
		this.auth = undefined;
		this.params = undefined;
	}

	var actions = ProtocolMessage.Action = {
		'HEARTBEAT' : 0,
		'ACK' : 1,
		'NACK' : 2,
		'CONNECT' : 3,
		'CONNECTED' : 4,
		'DISCONNECT' : 5,
		'DISCONNECTED' : 6,
		'CLOSE' : 7,
		'CLOSED' : 8,
		'ERROR' : 9,
		'ATTACH' : 10,
		'ATTACHED' : 11,
		'DETACH' : 12,
		'DETACHED' : 13,
		'PRESENCE' : 14,
		'MESSAGE' : 15,
		'SYNC' : 16,
		'AUTH' : 17
	};

	ProtocolMessage.channelModes = [ 'PRESENCE', 'PUBLISH', 'SUBSCRIBE', 'PRESENCE_SUBSCRIBE' ];

	ProtocolMessage.ActionName = [];
	_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].arrForEach(_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].keysArray(ProtocolMessage.Action, true), function(name) {
		ProtocolMessage.ActionName[actions[name]] = name;
	});

	var flags = {
		/* Channel attach state flags */
		'HAS_PRESENCE':       1 << 0,
		'HAS_BACKLOG':        1 << 1,
		'RESUMED':            1 << 2,
		'TRANSIENT':          1 << 4,
		'ATTACH_RESUME':      1 << 5,
		/* Channel mode flags */
		'PRESENCE':           1 << 16,
		'PUBLISH':            1 << 17,
		'SUBSCRIBE':          1 << 18,
		'PRESENCE_SUBSCRIBE': 1 << 19
	};
	var flagNames = _util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].keysArray(flags);
	flags.MODE_ALL = flags.PRESENCE | flags.PUBLISH | flags.SUBSCRIBE | flags.PRESENCE_SUBSCRIBE;

	ProtocolMessage.prototype.hasFlag = function(flag) {
		return ((this.flags & flags[flag]) > 0);
	};

	ProtocolMessage.prototype.setFlag = function(flag) {
		return this.flags = this.flags | flags[flag];
	};

	ProtocolMessage.prototype.getMode = function() {
		return this.flags && (this.flags & flags.MODE_ALL);
	};

	ProtocolMessage.prototype.encodeModesToFlags = function(modes) {
		var self = this;
		_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].arrForEach(modes, function(mode) {
			self.setFlag(mode);
		});
	};

	ProtocolMessage.prototype.decodeModesFromFlags = function() {
		var modes = [],
			self = this;
		_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].arrForEach(ProtocolMessage.channelModes, function(mode) {
			if(self.hasFlag(mode)) {
				modes.push(mode);
			}
		});
		return modes.length > 0 ? modes : undefined;
	};

	ProtocolMessage.serialize = _util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].encodeBody;

	ProtocolMessage.deserialize = function(serialized, format) {
		var deserialized = _util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].decodeBody(serialized, format);
		return ProtocolMessage.fromDeserialized(deserialized);
	};

	ProtocolMessage.fromDeserialized = function(deserialized) {
		var error = deserialized.error;
		if(error) deserialized.error = _errorinfo__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].fromValues(error);
		var messages = deserialized.messages;
		if(messages) for(var i = 0; i < messages.length; i++) messages[i] = _message__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].fromValues(messages[i]);
		var presence = deserialized.presence;
		if(presence) for(var i = 0; i < presence.length; i++) presence[i] = _presencemessage__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].fromValues(presence[i], true);
		return _util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].mixin(new ProtocolMessage(), deserialized);
	};

	ProtocolMessage.fromValues = function(values) {
		return _util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].mixin(new ProtocolMessage(), values);
	};

	function toStringArray(array) {
		var result = [];
		if (array) {
			for (var i = 0; i < array.length; i++) {
				result.push(array[i].toString());
			}
		}
		return '[ ' + result.join(', ') + ' ]';
	}

	var simpleAttributes = 'id channel channelSerial connectionId connectionKey connectionSerial count msgSerial timestamp'.split(' ');

	ProtocolMessage.stringify = function(msg) {
		var result = '[ProtocolMessage';
		if(msg.action !== undefined)
			result += '; action=' + ProtocolMessage.ActionName[msg.action] || false;

		var attribute;
		for (var attribIndex = 0; attribIndex < simpleAttributes.length; attribIndex++) {
			attribute = simpleAttributes[attribIndex];
			if(msg[attribute] !== undefined)
				result += '; ' + attribute + '=' + msg[attribute];
		}

		if(msg.messages)
			result += '; messages=' + toStringArray(_message__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].fromValuesArray(msg.messages));
		if(msg.presence)
			result += '; presence=' + toStringArray(_presencemessage__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].fromValuesArray(msg.presence));
		if(msg.error)
			result += '; error=' + _errorinfo__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].fromValues(msg.error).toString();
		if(msg.auth && msg.auth.accessToken)
			result += '; token=' + msg.auth.accessToken;
		if(msg.flags)
			result += '; flags=' + _util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].arrFilter(flagNames, function(flag) {
				return msg.hasFlag(flag);
			}).join(',');
		if(msg.params) {
			var stringifiedParams = '';
			_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].forInOwnNonNullProps(msg.params, function(prop) {
				if (stringifiedParams.length > 0) {
					stringifiedParams += '; ';
				}
				stringifiedParams += prop + '=' + msg.params[prop];
			});
			if (stringifiedParams.length > 0) {
				result += '; params=[' + stringifiedParams + ']';
			}
		}
		result += ']';
		return result;
	};

	/* Only valid for channel messages */
	ProtocolMessage.isDuplicate = function(a, b) {
		if (a && b) {
			if ((a.action === actions.MESSAGE || a.action === actions.PRESENCE) &&
				(a.action === b.action) &&
				(a.channel === b.channel) &&
				(a.id === b.id)) {
				if (a.action === actions.PRESENCE) {
					return true;
				} else if (a.messages.length === b.messages.length) {
					for (var i = 0; i < a.messages.length; i++) {
						var aMessage = a.messages[i];
						var bMessage = b.messages[i];
						if ((aMessage.extras && aMessage.extras.delta && aMessage.extras.delta.format) !==
							(bMessage.extras && bMessage.extras.delta && bMessage.extras.delta.format)) {
							return false;
						}
					}

					return true;
				}
			}
		}

		return false;
	};

	return ProtocolMessage;
})();

/* harmony default export */ __webpack_exports__["a"] = (ProtocolMessage);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var platform_bufferutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _util_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var platform_crypto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);
/* harmony import */ var _errorinfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);






var Message = (function() {

	function Message() {
		this.name = undefined;
		this.id = undefined;
		this.timestamp = undefined;
		this.clientId = undefined;
		this.connectionId = undefined;
		this.connectionKey = undefined;
		this.data = undefined;
		this.encoding = undefined;
		this.extras = undefined;
		this.size = undefined;
	}

	/**
	 * Overload toJSON() to intercept JSON.stringify()
	 * @return {*}
	 */
	Message.prototype.toJSON = function() {
		var result = {
			name: this.name,
			id: this.id,
			clientId: this.clientId,
			connectionId: this.connectionId,
			connectionKey: this.connectionKey,
			encoding: this.encoding,
			extras: this.extras
		};

		/* encode data to base64 if present and we're returning real JSON;
		 * although msgpack calls toJSON(), we know it is a stringify()
		 * call if it has a non-empty arguments list */
		var data = this.data;
		if(data && platform_bufferutils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isBuffer(data)) {
			if(arguments.length > 0) {
				/* stringify call */
				var encoding = this.encoding;
				result.encoding = encoding ? (encoding + '/base64') : 'base64';
				data = platform_bufferutils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].base64Encode(data);
			} else {
				/* Called by msgpack. toBuffer returns a datatype understandable by
				 * that platform's msgpack implementation (Buffer in node, Uint8Array
				 * in browsers) */
				data = platform_bufferutils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].toBuffer(data);
			}
		}
		result.data = data;
		return result;
	};

	Message.prototype.toString = function() {
		var result = '[Message';
		if(this.name)
			result += '; name=' + this.name;
		if(this.id)
			result += '; id=' + this.id;
		if(this.timestamp)
			result += '; timestamp=' + this.timestamp;
		if(this.clientId)
			result += '; clientId=' + this.clientId;
		if(this.connectionId)
			result += '; connectionId=' + this.connectionId;
		if(this.encoding)
			result += '; encoding=' + this.encoding;
		if(this.extras)
			result += '; extras =' + JSON.stringify(this.extras);
		if(this.data) {
			if (typeof(this.data) == 'string')
				result += '; data=' + this.data;
			else if (platform_bufferutils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isBuffer(this.data))
				result += '; data (buffer)=' + platform_bufferutils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].base64Encode(this.data);
			else
				result += '; data (json)=' + JSON.stringify(this.data);
		}
		if(this.extras)
			result += '; extras=' + JSON.stringify(this.extras);
		result += ']';
		return result;
	};

	Message.encrypt = function(msg, options, callback) {
		var data = msg.data,
			encoding = msg.encoding,
			cipher = options.channelCipher;

		encoding = encoding ? (encoding + '/') : '';
		if(!platform_bufferutils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isBuffer(data)) {
			data = platform_bufferutils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].utf8Encode(String(data));
			encoding = encoding + 'utf-8/';
		}
		cipher.encrypt(data, function(err, data) {
			if (err) {
				callback(err);
				return;
			}
			msg.data = data;
			msg.encoding = encoding + 'cipher+' + cipher.algorithm;
			callback(null, msg);
		});
	};

	Message.encode = function(msg, options, callback) {
		var data = msg.data, encoding,
			nativeDataType = typeof(data) == 'string' || platform_bufferutils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isBuffer(data) || data === null || data === undefined;

		if (!nativeDataType) {
			if (_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].isObject(data) || _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].isArray(data)) {
				msg.data = JSON.stringify(data);
				msg.encoding = (encoding = msg.encoding) ? (encoding + '/json') : 'json';
			} else {
				throw new _errorinfo__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]('Data type is unsupported', 40013, 400);
			}
		}

		if(options != null && options.cipher) {
			Message.encrypt(msg, options, callback);
		} else {
			callback(null, msg);
		}
	};

	Message.encodeArray = function(messages, options, callback) {
		var processed = 0;
		for (var i = 0; i < messages.length; i++) {
			Message.encode(messages[i], options, function(err, msg) {
				if (err) {
					callback(err);
					return;
				}
				processed++;
				if (processed == messages.length) {
					callback(null, messages);
				}
			});
		}
	};

	Message.serialize = _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].encodeBody;

	Message.decode = function(message, context) {
		/* The second argument could be either EncodingDecodingContext that contains ChannelOptions or ChannelOptions */
		if(!context || !context.channelOptions) {
			var channelOptions = context;
			context = {
				channelOptions: channelOptions,
				plugins: { },
				baseEncodedPreviousPayload: undefined
			};
		}

		var lastPayload = message.data;
		var encoding = message.encoding;
		if(encoding) {
			var xforms = encoding.split('/'),
				lastProcessedEncodingIndex, encodingsToProcess = xforms.length,
				data = message.data;

			try {
				while((lastProcessedEncodingIndex = encodingsToProcess) > 0) {
					var match = xforms[--encodingsToProcess].match(/([\-\w]+)(\+([\w\-]+))?/);
					if(!match) break;
					var xform = match[1];
					switch(xform) {
						case 'base64':
							data = platform_bufferutils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].base64Decode(String(data));
							if(lastProcessedEncodingIndex == xforms.length) {
								lastPayload = data;
							}
							continue;
						case 'utf-8':
							data = platform_bufferutils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].utf8Decode(data);
							continue;
						case 'json':
							data = JSON.parse(data);
							continue;
						case 'cipher':
							if(context.channelOptions != null && context.channelOptions.cipher) {
								var xformAlgorithm = match[3], cipher = context.channelOptions.channelCipher;
								/* don't attempt to decrypt unless the cipher params are compatible */
								if(xformAlgorithm != cipher.algorithm) {
									throw new Error('Unable to decrypt message with given cipher; incompatible cipher params');
								}
								data = cipher.decrypt(data);
								continue;
							} else {
								throw new Error('Unable to decrypt message; not an encrypted channel');
							}
						case 'vcdiff':
							if(!context.plugins || !context.plugins.vcdiff) {
								throw new _errorinfo__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]('Missing Vcdiff decoder (https://github.com/ably-forks/vcdiff-decoder)', 40019, 400);
							}
							if(typeof Uint8Array === 'undefined') {
								throw new _errorinfo__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]('Delta decoding not supported on this browser (need ArrayBuffer & Uint8Array)', 40020, 400);
							}
							try {
								var deltaBase = context.baseEncodedPreviousPayload;
								if(typeof deltaBase === 'string') {
									deltaBase = platform_bufferutils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].utf8Encode(deltaBase);
								}

								/* vcdiff expects Uint8Arrays, can't copy with ArrayBuffers. (also, if we
								 * don't have a TextDecoder, deltaBase might be a WordArray here, so need
								 * to process it into a buffer anyway) */
								deltaBase = platform_bufferutils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].toBuffer(deltaBase);
								data = platform_bufferutils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].toBuffer(data);

								data = platform_bufferutils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].typedArrayToBuffer(context.plugins.vcdiff.decode(data, deltaBase));
								lastPayload = data;
							} catch(e) {
								throw new _errorinfo__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]('Vcdiff delta decode failed with ' + e, 40018, 400);
							}
							continue;
						default:
							throw new Error("Unknown encoding");
					}
					break;
				}
			} catch(e) {
				throw new _errorinfo__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]('Error processing the ' + xform + ' encoding, decoder returned ‘' + e.message + '’', e.code || 40013, 400);
			} finally {
				message.encoding = (lastProcessedEncodingIndex <= 0) ? null : xforms.slice(0, lastProcessedEncodingIndex).join('/');
				message.data = data;
			}
		}
		context.baseEncodedPreviousPayload = lastPayload;
	};

	Message.fromResponseBody = function(body, options, format) {
		if(format) {
			body = _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].decodeBody(body, format);
		}

		for(var i = 0; i < body.length; i++) {
			var msg = body[i] = Message.fromValues(body[i]);
			try {
				Message.decode(msg, options);
			} catch (e) {
				_util_logger__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].LOG_ERROR, 'Message.fromResponseBody()', e.toString());
			}
		}
		return body;
	};

	Message.fromValues = function(values) {
		return _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].mixin(new Message(), values);
	};

	Message.fromValuesArray = function(values) {
		var count = values.length, result = new Array(count);
		for(var i = 0; i < count; i++) result[i] = Message.fromValues(values[i]);
		return result;
	};

	function normalizeCipherOptions(options) {
		if(options && options.cipher && !options.cipher.channelCipher) {
			if(!platform_crypto__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]) throw new Error('Encryption not enabled; use ably.encryption.js instead');
			var cipher = platform_crypto__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].getCipher(options.cipher);
			options.cipher = cipher.cipherParams;
			options.channelCipher = cipher.cipher;
		}
	}

	Message.fromEncoded = function(encoded, options) {
		var msg = Message.fromValues(encoded);
		normalizeCipherOptions(options);
		/* if decoding fails at any point, catch and return the message decoded to
		 * the fullest extent possible */
		try {
			Message.decode(msg, options);
		} catch(e) {
			_util_logger__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].LOG_ERROR, 'Message.fromEncoded()', e.toString());
		}
		return msg;
	};

	Message.fromEncodedArray = function(encodedArray, options) {
		normalizeCipherOptions(options);
		return _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrMap(encodedArray, function(encoded) {
			return Message.fromEncoded(encoded, options);
		});
	};

	function getMessageSize(msg) {
		var size = 0;
		if(msg.name) {
			size += msg.name.length;
		}
		if(msg.clientId) {
			size += msg.clientId.length;
		}
		if(msg.extras) {
			size += JSON.stringify(msg.extras).length;
		}
		if(msg.data) {
			size += _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].dataSizeBytes(msg.data);
		}
		return size;
	};

	/* This should be called on encode()d (and encrypt()d) Messages (as it
	 * assumes the data is a string or buffer) */
	Message.getMessagesSize = function(messages) {
		var msg, total = 0;
		for(var i=0; i<messages.length; i++) {
			msg = messages[i];
			total += (msg.size || (msg.size = getMessageSize(msg)))
		}
		return total;
	};

	return Message;
})();

/* harmony default export */ __webpack_exports__["a"] = (Message);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(12));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Check if typed arrays are supported
	    if (typeof ArrayBuffer != 'function') {
	        return;
	    }

	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;

	    // Reference original init
	    var superInit = WordArray.init;

	    // Augment WordArray.init to handle typed arrays
	    var subInit = WordArray.init = function (typedArray) {
	        // Convert buffers to uint8
	        if (typedArray instanceof ArrayBuffer) {
	            typedArray = new Uint8Array(typedArray);
	        }

	        // Convert other array views to uint8
	        if (
	            typedArray instanceof Int8Array ||
	            (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray) ||
	            typedArray instanceof Int16Array ||
	            typedArray instanceof Uint16Array ||
	            typedArray instanceof Int32Array ||
	            typedArray instanceof Uint32Array ||
	            typedArray instanceof Float32Array ||
	            typedArray instanceof Float64Array
	        ) {
	            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
	        }

	        // Handle Uint8Array
	        if (typedArray instanceof Uint8Array) {
	            // Shortcut
	            var typedArrayByteLength = typedArray.byteLength;

	            // Extract bytes
	            var words = [];
	            for (var i = 0; i < typedArrayByteLength; i++) {
	                words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
	            }

	            // Initialize this word array
	            superInit.call(this, words, typedArrayByteLength);
	        } else {
	            // Else call normal init
	            superInit.apply(this, arguments);
	        }
	    };

	    subInit.prototype = WordArray;
	}());


	return CryptoJS.lib.WordArray;

}));

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var platform_bufferutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _util_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);






var PresenceMessage = (function() {
	var msgpack = platform__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].msgpack;

	function toActionValue(actionString) {
		return _util_utils__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].arrIndexOf(PresenceMessage.Actions, actionString)
	}

	function PresenceMessage() {
		this.action = undefined;
		this.id = undefined;
		this.timestamp = undefined;
		this.clientId = undefined;
		this.connectionId = undefined;
		this.data = undefined;
		this.encoding = undefined;
		this.size = undefined;
	}

	PresenceMessage.Actions = [
		'absent',
		'present',
		'enter',
		'leave',
		'update'
	];

	/* Returns whether this presenceMessage is synthesized, i.e. was not actually
	 * sent by the connection (usually means a leave event sent 15s after a
	 * disconnection). This is useful because synthesized messages cannot be
	 * compared for newness by id lexicographically - RTP2b1
	 */
	PresenceMessage.prototype.isSynthesized = function() {
		return this.id.substring(this.connectionId.length, 0) !== this.connectionId;
	};

	/* RTP2b2 */
	PresenceMessage.prototype.parseId = function() {
		var parts = this.id.split(':');
		return {
			connectionId: parts[0],
			msgSerial: parseInt(parts[1], 10),
			index: parseInt(parts[2], 10)
		};
	};

	/**
	 * Overload toJSON() to intercept JSON.stringify()
	 * @return {*}
	 */
	PresenceMessage.prototype.toJSON = function() {
		var result = {
			clientId: this.clientId,
			/* Convert presence action back to an int for sending to Ably */
			action: toActionValue(this.action),
			encoding: this.encoding
		};

		/* encode data to base64 if present and we're returning real JSON;
		 * although msgpack calls toJSON(), we know it is a stringify()
		 * call if it has a non-empty arguments list */
		var data = this.data;
		if(data && platform_bufferutils__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].isBuffer(data)) {
			if(arguments.length > 0) {
				/* stringify call */
				var encoding = this.encoding;
				result.encoding = encoding ? (encoding + '/base64') : 'base64';
				data = platform_bufferutils__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].base64Encode(data);
			} else {
				/* Called by msgpack. toBuffer returns a datatype understandable by
				 * that platform's msgpack implementation (Buffer in node, Uint8Array
				 * in browsers) */
				data = platform_bufferutils__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].toBuffer(data);
			}
		}
		result.data = data;
		return result;
	};

	PresenceMessage.prototype.toString = function() {
		var result = '[PresenceMessage';
		result += '; action=' + this.action;
		if(this.id)
			result += '; id=' + this.id;
		if(this.timestamp)
			result += '; timestamp=' + this.timestamp;
		if(this.clientId)
			result += '; clientId=' + this.clientId;
		if(this.connectionId)
			result += '; connectionId=' + this.connectionId;
		if(this.encoding)
			result += '; encoding=' + this.encoding;
		if(this.data) {
			if (typeof(this.data) == 'string')
				result += '; data=' + this.data;
			else if (platform_bufferutils__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].isBuffer(this.data))
				result += '; data (buffer)=' + platform_bufferutils__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].base64Encode(this.data);
			else
				result += '; data (json)=' + JSON.stringify(this.data);
		}
		result += ']';
		return result;
	};
	PresenceMessage.encode = _message__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].encode;
	PresenceMessage.decode = _message__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].decode;

	PresenceMessage.fromResponseBody = function(body, options, format) {
		if(format) {
			body = _util_utils__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].decodeBody(body, format);
		}

		for(var i = 0; i < body.length; i++) {
			var msg = body[i] = PresenceMessage.fromValues(body[i], true);
			try {
				PresenceMessage.decode(msg, options);
			} catch (e) {
				_util_logger__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].LOG_ERROR, 'PresenceMessage.fromResponseBody()', e.toString());
			}
		}
		return body;
	};

	/* Creates a PresenceMessage from specified values, with a string presence action */
	PresenceMessage.fromValues = function(values, stringifyAction) {
		if(stringifyAction) {
			values.action = PresenceMessage.Actions[values.action]
		}
		return _util_utils__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].mixin(new PresenceMessage(), values);
	};

	PresenceMessage.fromValuesArray = function(values) {
		var count = values.length, result = new Array(count);
		for(var i = 0; i < count; i++) result[i] = PresenceMessage.fromValues(values[i]);
		return result;
	};

	PresenceMessage.fromEncoded = function(encoded, options) {
		var msg = PresenceMessage.fromValues(encoded, true);
		/* if decoding fails at any point, catch and return the message decoded to
		 * the fullest extent possible */
		try {
			PresenceMessage.decode(msg, options);
		} catch(e) {
			_util_logger__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].LOG_ERROR, 'PresenceMessage.fromEncoded()', e.toString());
		}
		return msg;
	};

	PresenceMessage.fromEncodedArray = function(encodedArray, options) {
		return _util_utils__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].arrMap(encodedArray, function(encoded) {
			return PresenceMessage.fromEncoded(encoded, options);
		});
	};

	PresenceMessage.getMessagesSize = _message__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].getMessagesSize;

	return PresenceMessage;
})();

/* harmony default export */ __webpack_exports__["a"] = (PresenceMessage);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory();
	}
	else {}
}(this, function () {

	/*globals window, global, require*/

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {

	    var crypto;

	    // Native crypto from window (Browser)
	    if (typeof window !== 'undefined' && window.crypto) {
	        crypto = window.crypto;
	    }

	    // Native (experimental IE 11) crypto from window (Browser)
	    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
	        crypto = window.msCrypto;
	    }

	    // Native crypto from global (NodeJS)
	    if (!crypto && typeof global !== 'undefined' && global.crypto) {
	        crypto = global.crypto;
	    }

	    // Native crypto import via require (NodeJS)
	    if (!crypto && "function" === 'function') {
	        try {
	            crypto = __webpack_require__(42);
	        } catch (err) {}
	    }

	    /*
	     * Cryptographically secure pseudorandom number generator
	     *
	     * As Math.random() is cryptographically not safe to use
	     */
	    var cryptoSecureRandomInt = function () {
	        if (crypto) {
	            // Use getRandomValues method (Browser)
	            if (typeof crypto.getRandomValues === 'function') {
	                try {
	                    return crypto.getRandomValues(new Uint32Array(1))[0];
	                } catch (err) {}
	            }

	            // Use randomBytes method (NodeJS)
	            if (typeof crypto.randomBytes === 'function') {
	                try {
	                    return crypto.randomBytes(4).readInt32LE();
	                } catch (err) {}
	            }
	        }

	        throw new Error('Native crypto module could not be used to get secure random number.');
	    };

	    /*
	     * Local polyfill of Object.create

	     */
	    var create = Object.create || (function () {
	        function F() {}

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }())

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            for (var i = 0; i < nBytes; i += 4) {
	                words.push(cryptoSecureRandomInt());
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            var processedWords;

	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(20)))

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _types_errorinfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


var ConnectionError = {
	disconnected: _types_errorinfo__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].fromValues({
		statusCode: 400,
		code: 80003,
		message: 'Connection to server temporarily unavailable'
	}),
	suspended: _types_errorinfo__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].fromValues({
		statusCode: 400,
		code: 80002,
		message: 'Connection to server unavailable'
	}),
	failed: _types_errorinfo__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].fromValues({
		statusCode: 400,
		code: 80000,
		message: 'Connection failed or disconnected by server'
	}),
	closing: _types_errorinfo__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].fromValues({
		statusCode: 400,
		code: 80017,
		message: 'Connection closing'
	}),
	closed: _types_errorinfo__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].fromValues({
		statusCode: 400,
		code: 80017,
		message: 'Connection closed'
	}),
	unknownConnectionErr: _types_errorinfo__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].fromValues({
		statusCode: 500,
		code: 50002,
		message: 'Internal connection error'
	}),
	unknownChannelErr: _types_errorinfo__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].fromValues({
		statusCode: 500,
		code: 50001,
		message: 'Internal channel error'
	})
};

/* harmony default export */ __webpack_exports__["a"] = (ConnectionError);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./common/lib/util/logger.js
var logger = __webpack_require__(0);

// EXTERNAL MODULE: ./browser/fragments/platform-browser.js
var platform_browser = __webpack_require__(3);

// EXTERNAL MODULE: ./common/lib/util/utils.js
var utils = __webpack_require__(1);

// EXTERNAL MODULE: ./browser/lib/util/http.js
var http = __webpack_require__(6);

// EXTERNAL MODULE: ./common/lib/util/multicaster.js
var multicaster = __webpack_require__(22);

// EXTERNAL MODULE: ./browser/lib/util/bufferutils.js
var bufferutils = __webpack_require__(4);

// EXTERNAL MODULE: ./common/lib/types/errorinfo.js
var errorinfo = __webpack_require__(2);

// CONCATENATED MODULE: ./browser/lib/util/base64.js
/*
 Copyright (c) 2008 Fred Palmer fred.palmer_at_gmail.com

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
 */
var Base64 = (function() {
	function StringBuffer()
	{
		this.buffer = [];
	}

	StringBuffer.prototype.append = function append(string)
	{
		this.buffer.push(string);
		return this;
	};

	StringBuffer.prototype.toString = function toString()
	{
		return this.buffer.join("");
	};

	var Base64 =
	{
		codex : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

		encode : function (input)
		{
			var output = new StringBuffer();
			var codex = Base64.codex;

			var enumerator = new Utf8EncodeEnumerator(input);
			while (enumerator.moveNext())
			{
				var chr1 = enumerator.current;

				enumerator.moveNext();
				var chr2 = enumerator.current;

				enumerator.moveNext();
				var chr3 = enumerator.current;

				var enc1 = chr1 >> 2;
				var enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				var enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				var enc4 = chr3 & 63;

				if (isNaN(chr2))
				{
					enc3 = enc4 = 64;
				}
				else if (isNaN(chr3))
				{
					enc4 = 64;
				}

				output.append(codex.charAt(enc1) + codex.charAt(enc2) + codex.charAt(enc3) + codex.charAt(enc4));
			}

			return output.toString();
		},

		decode : function (input)
		{
			var output = new StringBuffer();

			var enumerator = new Base64DecodeEnumerator(input);
			while (enumerator.moveNext())
			{
				var charCode = enumerator.current;

				if (charCode < 128)
					output.append(String.fromCharCode(charCode));
				else if ((charCode > 191) && (charCode < 224))
				{
					enumerator.moveNext();
					var charCode2 = enumerator.current;

					output.append(String.fromCharCode(((charCode & 31) << 6) | (charCode2 & 63)));
				}
				else
				{
					enumerator.moveNext();
					var charCode2 = enumerator.current;

					enumerator.moveNext();
					var charCode3 = enumerator.current;

					output.append(String.fromCharCode(((charCode & 15) << 12) | ((charCode2 & 63) << 6) | (charCode3 & 63)));
				}
			}

			return output.toString();
		}
	};

	function Utf8EncodeEnumerator(input)
	{
		this._input = input;
		this._index = -1;
		this._buffer = [];
	}

	Utf8EncodeEnumerator.prototype =
	{
		current: Number.NaN,

		moveNext: function()
		{
			if (this._buffer.length > 0)
			{
				this.current = this._buffer.shift();
				return true;
			}
			else if (this._index >= (this._input.length - 1))
			{
				this.current = Number.NaN;
				return false;
			}
			else
			{
				var charCode = this._input.charCodeAt(++this._index);

				// "\r\n" -> "\n"
				//
				if ((charCode == 13) && (this._input.charCodeAt(this._index + 1) == 10))
				{
					charCode = 10;
					this._index += 2;
				}

				if (charCode < 128)
				{
					this.current = charCode;
				}
				else if ((charCode > 127) && (charCode < 2048))
				{
					this.current = (charCode >> 6) | 192;
					this._buffer.push((charCode & 63) | 128);
				}
				else
				{
					this.current = (charCode >> 12) | 224;
					this._buffer.push(((charCode >> 6) & 63) | 128);
					this._buffer.push((charCode & 63) | 128);
				}

				return true;
			}
		}
	};

	function Base64DecodeEnumerator(input)
	{
		this._input = input;
		this._index = -1;
		this._buffer = [];
	}

	Base64DecodeEnumerator.prototype =
	{
		current: 64,

		moveNext: function()
		{
			if (this._buffer.length > 0)
			{
				this.current = this._buffer.shift();
				return true;
			}
			else if (this._index >= (this._input.length - 1))
			{
				this.current = 64;
				return false;
			}
			else
			{
				var enc1 = Base64.codex.indexOf(this._input.charAt(++this._index));
				var enc2 = Base64.codex.indexOf(this._input.charAt(++this._index));
				var enc3 = Base64.codex.indexOf(this._input.charAt(++this._index));
				var enc4 = Base64.codex.indexOf(this._input.charAt(++this._index));

				var chr1 = (enc1 << 2) | (enc2 >> 4);
				var chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				var chr3 = ((enc3 & 3) << 6) | enc4;

				this.current = chr1;

				if (enc3 != 64)
					this._buffer.push(chr2);

				if (enc4 != 64)
					this._buffer.push(chr3);

				return true;
			}
		}
	};

	return Base64;
})();

/* harmony default export */ var base64 = (Base64);

// EXTERNAL MODULE: ./node_modules/crypto-js/build/hmac-sha256.js
var hmac_sha256 = __webpack_require__(38);
var hmac_sha256_default = /*#__PURE__*/__webpack_require__.n(hmac_sha256);

// EXTERNAL MODULE: ./node_modules/crypto-js/build/enc-base64.js
var enc_base64 = __webpack_require__(17);

// CONCATENATED MODULE: ./common/lib/client/auth.js











var auth_Auth = (function() {
	var MAX_TOKEN_LENGTH = Math.pow(2, 17);
	function noop() {}
	function random() { return ('000000' + Math.floor(Math.random() * 1E16)).slice(-16); }
	function normaliseAuthcallbackError(err) {
		/* A client auth callback may give errors in any number of formats; normalise to an errorinfo */
		if(!utils["a" /* default */].isErrorInfo(err)) {
			return new errorinfo["a" /* default */](utils["a" /* default */].inspectError(err), err.code || 40170, err.statusCode || 401);
		}
		/* network errors will not have an inherent error code */
		if(!err.code) {
			if(err.statusCode === 403) {
				err.code = 40300;
			} else {
				err.code = 40170;
				/* normalise statusCode to 401 per RSA4e */
				err.statusCode = 401;
			}
		}
		return err;
	}

	var hmac, toBase64;
	if(platform_browser["a" /* default */].createHmac) {
		toBase64 = function(str) { return (Buffer.from(str, 'ascii')).toString('base64'); };
		hmac = function(text, key) {
			var inst = platform_browser["a" /* default */].createHmac('SHA256', key);
			inst.update(text);
			return inst.digest('base64');
		};
	} else {
		toBase64 = base64.encode;
		hmac = function(text, key) {
			return Object(enc_base64["stringify"])(hmac_sha256_default()(text, key));
		};
	}

	function c14n(capability) {
		if(!capability)
			return '';

		if(typeof(capability) == 'string')
			capability = JSON.parse(capability);

		var c14nCapability = {};
		var keys = utils["a" /* default */].keysArray(capability, true);
		if(!keys)
			return '';
		keys.sort();
		for(var i = 0; i < keys.length; i++) {
			c14nCapability[keys[i]] = capability[keys[i]].sort();
		}
		return JSON.stringify(c14nCapability);
	}

	function logAndValidateTokenAuthMethod(authOptions) {
		if(authOptions.authCallback) {
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Auth()', 'using token auth with authCallback');
		} else if(authOptions.authUrl) {
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Auth()', 'using token auth with authUrl');
		} else if(authOptions.key) {
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Auth()', 'using token auth with client-side signing');
		} else if(authOptions.tokenDetails) {
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Auth()', 'using token auth with supplied token only');
		} else {
			var msg = 'authOptions must include valid authentication parameters';
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Auth()', msg);
			throw new Error(msg);
		}
	}

	function basicAuthForced(options) {
		return 'useTokenAuth' in options && !options.useTokenAuth;
	}

	/* RSA4 */
	function useTokenAuth(options) {
		return options.useTokenAuth ||
			(!basicAuthForced(options) &&
			 (options.authCallback ||
			  options.authUrl      ||
			  options.token        ||
			  options.tokenDetails))
	}

	/* RSA4a */
	function noWayToRenew(options) {
		return !options.key &&
			!options.authCallback &&
			!options.authUrl;
	}

	var trId = 0;
	function getTokenRequestId() {
		return trId++;
	}

	function Auth(client, options) {
		this.client = client;
		this.tokenParams = options.defaultTokenParams || {};
		/* The id of the current token request if one is in progress, else null */
		this.currentTokenRequestId = null;
		this.waitingForTokenRequest = null;

		if(useTokenAuth(options)) {
			/* Token auth */
			if(options.key && !hmac) {
				var msg = 'client-side token request signing not supported';
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Auth()', msg);
				throw new Error(msg);
			}
			if(noWayToRenew(options)) {
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Auth()', 'Warning: library initialized with a token literal without any way to renew the token when it expires (no authUrl, authCallback, or key). See https://help.ably.io/error/40171 for help');
			}
			this._saveTokenOptions(options.defaultTokenParams, options);
			logAndValidateTokenAuthMethod(this.authOptions);
		} else {
			/* Basic auth */
			if(!options.key) {
				var msg = 'No authentication options provided; need one of: key, authUrl, or authCallback (or for testing only, token or tokenDetails)';
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Auth()', msg);
				throw new errorinfo["a" /* default */](msg, 40160, 401);
			}
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Auth()', 'anonymous, using basic auth');
			this._saveBasicOptions(options);
		}
	}

	/**
	 * Instructs the library to get a token immediately and ensures Token Auth
	 * is used for all future requests, storing the tokenParams and authOptions
	 * given as the new defaults for subsequent use.
	 *
	 * @param tokenParams
	 * an object containing the parameters for the requested token:
	 *
	 * - ttl:        (optional) the requested life of any new token in ms. If none
	 *               is specified a default of 1 hour is provided. The maximum lifetime
	 *               is 24hours; any request exceeeding that lifetime will be rejected
	 *               with an error.
	 *
	 * - capability: (optional) the capability to associate with the access token.
	 *               If none is specified, a token will be requested with all of the
	 *               capabilities of the specified key.
	 *
	 * - clientId:   (optional) a client Id to associate with the token
	 *
	 * - timestamp:  (optional) the time in ms since the epoch. If none is specified,
	 *               the system will be queried for a time value to use.
	 *
	 * @param authOptions
	 * an object containing auth options relevant to token auth:
	 *
	 * - queryTime   (optional) boolean indicating that the Ably system should be
	 *               queried for the current time when none is specified explicitly.
	 *
	 * - tokenDetails: (optional) object: An authenticated TokenDetails object.
	 *
	 * - token:        (optional) string: the `token` property of a tokenDetails object
	 *
	 * - authCallback:  (optional) a JavaScript callback to be called to get auth information.
	 *                  authCallback should be a function of (tokenParams, callback) that calls
	 *                  the callback with (err, result), where result is any of:
	 *                  - a tokenRequest object (ie the result of a rest.auth.createTokenRequest call),
	 *                  - a tokenDetails object (ie the result of a rest.auth.requestToken call),
	 *                  - a token string
	 *
	 * - authUrl:       (optional) a URL to be used to GET or POST a set of token request
	 *                  params, to obtain a signed token request.
	 *
	 * - authHeaders:   (optional) a set of application-specific headers to be added to any request
	 *                  made to the authUrl.
	 *
	 * - authParams:    (optional) a set of application-specific query params to be added to any
	 *                  request made to the authUrl.
	 *
	 *
	 * - requestHeaders (optional, unsupported, for testing only) extra headers to add to the
	 *                  requestToken request
	 *
	 * @param callback (err, tokenDetails)
	 */
	Auth.prototype.authorize = function(tokenParams, authOptions, callback) {
		/* shuffle and normalise arguments as necessary */
		if(typeof(tokenParams) == 'function' && !callback) {
			callback = tokenParams;
			authOptions = tokenParams = null;
		} else if(typeof(authOptions) == 'function' && !callback) {
			callback = authOptions;
			authOptions = null;
		}
		if(!callback) {
			if(this.client.options.promises) {
				return utils["a" /* default */].promisify(this, 'authorize', arguments);
			}
			callback = noop;
		}
		var self = this;

		/* RSA10a: authorize() call implies token auth. If a key is passed it, we
		 * just check if it doesn't clash and assume we're generating a token from it */
		if(authOptions && authOptions.key && (this.authOptions.key !== authOptions.key)) {
			throw new errorinfo["a" /* default */]('Unable to update auth options with incompatible key', 40102, 401);
		}

		if(authOptions && ('force' in authOptions)) {
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Auth.authorize', 'Deprecation warning: specifying {force: true} in authOptions is no longer necessary, authorize() now always gets a new token. Please remove this, as in version 1.0 and later, having a non-null authOptions will overwrite stored library authOptions, which may not be what you want');
			/* Emulate the old behaviour: if 'force' was the only member of authOptions,
			 * set it to null so it doesn't overwrite stored. TODO: remove in version 1.0 */
			if(utils["a" /* default */].isOnlyPropIn(authOptions, 'force')) {
				authOptions = null;
			}
		}

		this._forceNewToken(tokenParams, authOptions, function(err, tokenDetails) {
			if(err) {
				if(self.client.connection) {
					/* We interpret RSA4d as including requests made by a client lib to
					 * authenticate triggered by an explicit authorize() or an AUTH received from
					 * ably, not just connect-sequence-triggered token fetches */
					self.client.connection.connectionManager.actOnErrorFromAuthorize(err);
				}
				callback(err);
				return;
			}

			/* RTC8
			 * - When authorize called by an end user and have a realtime connection,
			 * don't call back till new token has taken effect.
			 * - Use self.client.connection as a proxy for (self.client instanceof Realtime),
			 * which doesn't work in node as Realtime isn't part of the vm context for Rest clients */
			if(self.client.connection) {
				self.client.connection.connectionManager.onAuthUpdated(tokenDetails, callback);
			} else {
				callback(null, tokenDetails);
			}
		})
	};

	Auth.prototype.authorise = function() {
		logger["a" /* default */].deprecated('Auth.authorise', 'Auth.authorize');
		this.authorize.apply(this, arguments);
	};

	/* For internal use, eg by connectionManager - useful when want to call back
	 * as soon as we have the new token, rather than waiting for it to take
	 * effect on the connection as #authorize does */
	Auth.prototype._forceNewToken = function(tokenParams, authOptions, callback) {
		var self = this;

		/* get rid of current token even if still valid */
		this.tokenDetails = null;

		/* _save normalises the tokenParams and authOptions and updates the auth
		 * object. All subsequent operations should use the values on `this`,
		 * not the passed in ones. */
		this._saveTokenOptions(tokenParams, authOptions);

		logAndValidateTokenAuthMethod(this.authOptions);

		this._ensureValidAuthCredentials(true, function(err, tokenDetails) {
			/* RSA10g */
			delete self.tokenParams.timestamp;
			delete self.authOptions.queryTime;
			callback(err, tokenDetails);
		});
	}

	/**
	 * Request an access token
	 * @param authOptions
	 * an object containing the request options:
	 * - key:           the key to use.
	 *
	 * - authCallback:  (optional) a JavaScript callback to be called to get auth information.
	 *                  authCallback should be a function of (tokenParams, callback) that calls
	 *                  the callback with (err, result), where result is any of:
	 *                  - a tokenRequest object (ie the result of a rest.auth.createTokenRequest call),
	 *                  - a tokenDetails object (ie the result of a rest.auth.requestToken call),
	 *                  - a token string
	 *
	 * - authUrl:       (optional) a URL to be used to GET or POST a set of token request
	 *                  params, to obtain a signed token request.
	 *
	 * - authHeaders:   (optional) a set of application-specific headers to be added to any request
	 *                  made to the authUrl.
	 *
	 * - authParams:    (optional) a set of application-specific query params to be added to any
	 *                  request made to the authUrl.
	 *
	 * - queryTime      (optional) boolean indicating that the ably system should be
	 *                  queried for the current time when none is specified explicitly
	 *
	 * - requestHeaders (optional, unsupported, for testing only) extra headers to add to the
	 *                  requestToken request
	 *
	 * @param tokenParams
	 * an object containing the parameters for the requested token:
	 * - ttl:          (optional) the requested life of the token in milliseconds. If none is specified
	 *                  a default of 1 hour is provided. The maximum lifetime is 24hours; any request
	 *                  exceeeding that lifetime will be rejected with an error.
	 *
	 * - capability:    (optional) the capability to associate with the access token.
	 *                  If none is specified, a token will be requested with all of the
	 *                  capabilities of the specified key.
	 *
	 * - clientId:      (optional) a client Id to associate with the token; if not
	 *                  specified, a clientId passed in constructing the Rest interface will be used
	 *
	 * - timestamp:     (optional) the time in ms since the epoch. If none is specified,
	 *                  the system will be queried for a time value to use.
	 *
	 * @param callback (err, tokenDetails)
	 */
	Auth.prototype.requestToken = function(tokenParams, authOptions, callback) {
		/* shuffle and normalise arguments as necessary */
		if(typeof(tokenParams) == 'function' && !callback) {
			callback = tokenParams;
			authOptions = tokenParams = null;
		}
		else if(typeof(authOptions) == 'function' && !callback) {
			callback = authOptions;
			authOptions = null;
		}
		if(!callback && this.client.options.promises) {
			return utils["a" /* default */].promisify(this, 'requestToken', arguments);
		}

		/* RSA8e: if authOptions passed in, they're used instead of stored, don't merge them */
		authOptions = authOptions || this.authOptions;
		tokenParams = tokenParams || utils["a" /* default */].copy(this.tokenParams);
		callback = callback || noop;

		/* first set up whatever callback will be used to get signed
		 * token requests */
		var tokenRequestCallback, client = this.client;

		if(authOptions.authCallback) {
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Auth.requestToken()', 'using token auth with authCallback');
			tokenRequestCallback = authOptions.authCallback;
		} else if(authOptions.authUrl) {
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Auth.requestToken()', 'using token auth with authUrl');
			tokenRequestCallback = function(params, cb) {
				var authHeaders = utils["a" /* default */].mixin({accept: 'application/json, text/plain'}, authOptions.authHeaders),
					usePost = authOptions.authMethod && authOptions.authMethod.toLowerCase() === 'post';
				if(!usePost) {
					/* Combine authParams with any qs params given in the authUrl */
					var queryIdx = authOptions.authUrl.indexOf('?');
					if(queryIdx > -1) {
						var providedQsParams = utils["a" /* default */].parseQueryString(authOptions.authUrl.slice(queryIdx));
						authOptions.authUrl = authOptions.authUrl.slice(0, queryIdx);
						/* In case of conflict, authParams take precedence over qs params in the authUrl */
						authOptions.authParams = utils["a" /* default */].mixin(providedQsParams, authOptions.authParams);
					}
				}
				/* RSA8c2 */
				var authParams = utils["a" /* default */].mixin({}, authOptions.authParams || {}, params);
				var authUrlRequestCallback = function(err, body, headers, unpacked) {
					var contentType;
					if (err) {
						logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'Auth.requestToken().tokenRequestCallback', 'Received Error: ' + utils["a" /* default */].inspectError(err));
					} else {
						contentType = headers['content-type'];
						logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'Auth.requestToken().tokenRequestCallback', 'Received; content-type: ' + contentType + '; body: ' + utils["a" /* default */].inspectBody(body));
					}
					if(err || unpacked) return cb(err, body);
					if(bufferutils["a" /* default */].isBuffer(body)) body = body.toString();
					if(!contentType) {
						cb(new errorinfo["a" /* default */]('authUrl response is missing a content-type header', 40170, 401));
						return;
					}
					var json = contentType.indexOf('application/json') > -1,
						text = contentType.indexOf('text/plain') > -1 || contentType.indexOf('application/jwt') > -1;
					if(!json && !text) {
						cb(new errorinfo["a" /* default */]('authUrl responded with unacceptable content-type ' + contentType + ', should be either text/plain, application/jwt or application/json', 40170, 401));
						return;
					}
					if(json) {
						if(body.length > MAX_TOKEN_LENGTH) {
							cb(new errorinfo["a" /* default */]('authUrl response exceeded max permitted length', 40170, 401));
							return;
						}
						try {
							body = JSON.parse(body);
						} catch(e) {
							cb(new errorinfo["a" /* default */]('Unexpected error processing authURL response; err = ' + e.message, 40170, 401));
							return;
						}
					}
					cb(null, body, contentType);
				};
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'Auth.requestToken().tokenRequestCallback', 'Requesting token from ' + authOptions.authUrl + '; Params: ' + JSON.stringify(authParams) + '; method: ' + (usePost ? 'POST' : 'GET'));
				if(usePost) {
					/* send body form-encoded */
					var headers = authHeaders || {};
					headers['content-type'] = 'application/x-www-form-urlencoded';
					var body = utils["a" /* default */].toQueryString(authParams).slice(1); /* slice is to remove the initial '?' */
					http["a" /* default */].postUri(client, authOptions.authUrl, headers, body, {}, authUrlRequestCallback);
				} else {
					http["a" /* default */].getUri(client, authOptions.authUrl, authHeaders || {}, authParams, authUrlRequestCallback);
				}
			};
		} else if(authOptions.key) {
			var self = this;
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Auth.requestToken()', 'using token auth with client-side signing');
			tokenRequestCallback = function(params, cb) { self.createTokenRequest(params, authOptions, cb); };
		} else {
			var msg = "Need a new token, but authOptions does not include any way to request one (no authUrl, authCallback, or key)";
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Auth()', 'library initialized with a token literal without any way to renew the token when it expires (no authUrl, authCallback, or key). See https://help.ably.io/error/40171 for help');
			callback(new errorinfo["a" /* default */](msg, 40171, 403));
			return;
		}

		/* normalise token params */
		if('capability' in tokenParams)
			tokenParams.capability = c14n(tokenParams.capability);

		var tokenRequest = function(signedTokenParams, tokenCb) {
			var keyName = signedTokenParams.keyName,
				path = '/keys/' + keyName + '/requestToken',
				tokenUri = function(host) { return client.baseUri(host) + path; };

			var requestHeaders = utils["a" /* default */].defaultPostHeaders();
			if(authOptions.requestHeaders) utils["a" /* default */].mixin(requestHeaders, authOptions.requestHeaders);
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'Auth.requestToken().requestToken', 'Sending POST to ' + path + '; Token params: ' + JSON.stringify(signedTokenParams));
			signedTokenParams = JSON.stringify(signedTokenParams);
			http["a" /* default */].post(client, tokenUri, requestHeaders, signedTokenParams, null, tokenCb);
		};

		var tokenRequestCallbackTimeoutExpired = false,
			timeoutLength = this.client.options.timeouts.realtimeRequestTimeout,
			tokenRequestCallbackTimeout = setTimeout(function() {
				tokenRequestCallbackTimeoutExpired = true;
				var msg = 'Token request callback timed out after ' + (timeoutLength / 1000) + ' seconds';
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Auth.requestToken()', msg);
				callback(new errorinfo["a" /* default */](msg, 40170, 401));
			}, timeoutLength);

		tokenRequestCallback(tokenParams, function(err, tokenRequestOrDetails, contentType) {
			if(tokenRequestCallbackTimeoutExpired) return;
			clearTimeout(tokenRequestCallbackTimeout);

			if(err) {
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Auth.requestToken()', 'token request signing call returned error; err = ' + utils["a" /* default */].inspectError(err));
				callback(normaliseAuthcallbackError(err));
				return;
			}
			/* the response from the callback might be a token string, a signed request or a token details */
			if(typeof(tokenRequestOrDetails) === 'string') {
				if(tokenRequestOrDetails.length === 0) {
					callback(new errorinfo["a" /* default */]('Token string is empty', 40170, 401));
				} else if(tokenRequestOrDetails.length > MAX_TOKEN_LENGTH) {
					callback(new errorinfo["a" /* default */]('Token string exceeded max permitted length (was ' + tokenRequestOrDetails.length + ' bytes)', 40170, 401));
				} else if(tokenRequestOrDetails === 'undefined' || tokenRequestOrDetails === 'null') {
					/* common failure mode with poorly-implemented authCallbacks */
					callback(new errorinfo["a" /* default */]('Token string was literal null/undefined', 40170, 401));
				} else if((tokenRequestOrDetails[0] === '{') && !(contentType && contentType.indexOf('application/jwt') > -1)) {
					callback(new errorinfo["a" /* default */]('Token was double-encoded; make sure you\'re not JSON-encoding an already encoded token request or details', 40170, 401));
				} else {
					callback(null, {token: tokenRequestOrDetails});
				}
				return;
			}
			if(typeof(tokenRequestOrDetails) !== 'object') {
				var msg = 'Expected token request callback to call back with a token string or token request/details object, but got a ' + typeof(tokenRequestOrDetails);
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Auth.requestToken()', msg);
				callback(new errorinfo["a" /* default */](msg, 40170, 401));
				return;
			}
			var objectSize = JSON.stringify(tokenRequestOrDetails).length;
			if(objectSize > MAX_TOKEN_LENGTH && !authOptions.suppressMaxLengthCheck) {
				callback(new errorinfo["a" /* default */]('Token request/details object exceeded max permitted stringified size (was ' + objectSize + ' bytes)', 40170, 401));
				return;
			}
			if('issued' in tokenRequestOrDetails) {
				/* a tokenDetails object */
				callback(null, tokenRequestOrDetails);
				return;
			}
			if(!('keyName' in tokenRequestOrDetails)) {
				var msg = 'Expected token request callback to call back with a token string, token request object, or token details object';
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Auth.requestToken()', msg);
				callback(new errorinfo["a" /* default */](msg, 40170, 401));
				return;
			}
			/* it's a token request, so make the request */
			tokenRequest(tokenRequestOrDetails, function(err, tokenResponse, headers, unpacked) {
				if(err) {
					logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Auth.requestToken()', 'token request API call returned error; err = ' + utils["a" /* default */].inspectError(err));
					callback(normaliseAuthcallbackError(err));
					return;
				}
				if(!unpacked) tokenResponse = JSON.parse(tokenResponse);
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Auth.getToken()', 'token received');
				callback(null, tokenResponse);
			});
		});
	};

	/**
	 * Create and sign a token request based on the given options.
	 * NOTE this can only be used when the key value is available locally.
	 * Otherwise, signed token requests must be obtained from the key
	 * owner (either using the token request callback or url).
	 *
	 * @param authOptions
	 * an object containing the request options:
	 * - key:           the key to use. If not specified, a key passed in constructing
	 *                  the Rest interface will be used
	 *
	 * - queryTime      (optional) boolean indicating that the ably system should be
	 *                  queried for the current time when none is specified explicitly
	 *
	 * - requestHeaders (optional, unsupported, for testing only) extra headers to add to the
	 *                  requestToken request
	 *
	 * @param tokenParams
	 * an object containing the parameters for the requested token:
	 * - ttl:       (optional) the requested life of the token in ms. If none is specified
	 *                  a default of 1 hour is provided. The maximum lifetime is 24hours; any request
	 *                  exceeeding that lifetime will be rejected with an error.
	 *
	 * - capability:    (optional) the capability to associate with the access token.
	 *                  If none is specified, a token will be requested with all of the
	 *                  capabilities of the specified key.
	 *
	 * - clientId:      (optional) a client Id to associate with the token; if not
	 *                  specified, a clientId passed in constructing the Rest interface will be used
	 *
	 * - timestamp:     (optional) the time in ms since the epoch. If none is specified,
	 *                  the system will be queried for a time value to use.
	 *
	 */
	Auth.prototype.createTokenRequest = function(tokenParams, authOptions, callback) {
		/* shuffle and normalise arguments as necessary */
		if(typeof(tokenParams) == 'function' && !callback) {
			callback = tokenParams;
			authOptions = tokenParams = null;
		} else if(typeof(authOptions) == 'function' && !callback) {
			callback = authOptions;
			authOptions = null;
		}
		if(!callback && this.client.options.promises) {
			return utils["a" /* default */].promisify(this, 'createTokenRequest', arguments);
		}

		/* RSA9h: if authOptions passed in, they're used instead of stored, don't merge them */
		authOptions = authOptions || this.authOptions;
		tokenParams = tokenParams || utils["a" /* default */].copy(this.tokenParams);

		var key = authOptions.key;
		if(!key) {
			callback(new errorinfo["a" /* default */]('No key specified', 40101, 403));
			return;
		}
		var keyParts = key.split(':'),
			keyName = keyParts[0],
			keySecret = keyParts[1];

		if(!keySecret) {
			callback(new errorinfo["a" /* default */]('Invalid key specified', 40101, 403));
			return;
		}

		if(tokenParams.clientId === '') {
			callback(new errorinfo["a" /* default */]('clientId can’t be an empty string', 40012, 400));
			return;
		}

		if('capability' in tokenParams) {
			tokenParams.capability = c14n(tokenParams.capability);
		}

		var request = utils["a" /* default */].mixin({ keyName: keyName }, tokenParams),
			clientId = tokenParams.clientId || '',
			ttl = tokenParams.ttl || '',
			capability = tokenParams.capability || '',
			self = this;

		(function(authoriseCb) {
			if(request.timestamp) {
				authoriseCb();
				return;
			};
			self.getTimestamp(authOptions && authOptions.queryTime, function(err, time) {
				if(err) {callback(err); return;}
				request.timestamp = time;
				authoriseCb();
			});
		})(function() {
			/* nonce */
			/* NOTE: there is no expectation that the client
			 * specifies the nonce; this is done by the library
			 * However, this can be overridden by the client
			 * simply for testing purposes. */
			var nonce = request.nonce || (request.nonce = random()),
				timestamp = request.timestamp;

			var signText
			=	request.keyName + '\n'
			+	ttl + '\n'
			+	capability + '\n'
			+	clientId + '\n'
			+	timestamp + '\n'
			+	nonce + '\n';

			/* mac */
			/* NOTE: there is no expectation that the client
			 * specifies the mac; this is done by the library
			 * However, this can be overridden by the client
			 * simply for testing purposes. */
			request.mac = request.mac || hmac(signText, keySecret);

			logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Auth.getTokenRequest()', 'generated signed request');
			callback(null, request);
		});
	};

	/**
	 * Get the auth query params to use for a websocket connection,
	 * based on the current auth parameters
	 */
	Auth.prototype.getAuthParams = function(callback) {
		if(this.method == 'basic')
			callback(null, {key: this.key});
		else
			this._ensureValidAuthCredentials(false, function(err, tokenDetails) {
				if(err) {
					callback(err);
					return;
				}
				callback(null, {access_token: tokenDetails.token});
			});
	};

	/**
	 * Get the authorization header to use for a REST or comet request,
	 * based on the current auth parameters
	 */
	Auth.prototype.getAuthHeaders = function(callback) {
		if(this.method == 'basic') {
			callback(null, {authorization: 'Basic ' + this.basicKey});
		} else {
			this._ensureValidAuthCredentials(false, function(err, tokenDetails) {
				if(err) {
					callback(err);
					return;
				}
				callback(null, {authorization: 'Bearer ' + toBase64(tokenDetails.token)});
			});
		}
	};

	/**
	 * Get the current time based on the local clock,
	 * or if the option queryTime is true, return the server time.
	 * The server time offset from the local time is stored so that
	 * only one request to the server to get the time is ever needed
	 */
	Auth.prototype.getTimestamp = function(queryTime, callback) {
		if (!this.isTimeOffsetSet() && (queryTime || this.authOptions.queryTime)) {
			this.client.time(callback);
		} else {
			callback(null, this.getTimestampUsingOffset());
		}
	};

	Auth.prototype.getTimestampUsingOffset = function() {
		return utils["a" /* default */].now() + (this.client.serverTimeOffset || 0);
	};

	Auth.prototype.isTimeOffsetSet = function() {
		return this.client.serverTimeOffset !== null;
	};

	Auth.prototype._saveBasicOptions = function(authOptions) {
		this.method = 'basic';
		this.key = authOptions.key;
		this.basicKey = toBase64(authOptions.key);
		this.authOptions = authOptions || {};
		if('clientId' in authOptions) {
			this._userSetClientId(authOptions.clientId);
		}
	}

	Auth.prototype._saveTokenOptions = function(tokenParams, authOptions) {
		this.method = 'token';

		if(tokenParams) {
			/* We temporarily persist tokenParams.timestamp in case a new token needs
			 * to be requested, then null it out in the callback of
			 * _ensureValidAuthCredentials for RSA10g compliance */
			this.tokenParams = tokenParams;
		}

		if(authOptions) {
			/* normalise */
			if(authOptions.token) {
				/* options.token may contain a token string or, for convenience, a TokenDetails */
				authOptions.tokenDetails = (typeof(authOptions.token) === 'string') ? {token: authOptions.token} : authOptions.token;
			}

			if(authOptions.tokenDetails) {
				this.tokenDetails = authOptions.tokenDetails;
			}

			if('clientId' in authOptions) {
				this._userSetClientId(authOptions.clientId);
			}

			this.authOptions = authOptions;
		}
	};

	/* @param forceSupersede: force a new token request even if there's one in
	 * progress, making all pending callbacks wait for the new one */
	Auth.prototype._ensureValidAuthCredentials = function(forceSupersede, callback) {
		var self = this,
			token = this.tokenDetails;

		if(token) {
			if(this._tokenClientIdMismatch(token.clientId)) {
				/* 403 to trigger a permanently failed client - RSA15c */
				callback(new errorinfo["a" /* default */]('Mismatch between clientId in token (' + token.clientId + ') and current clientId (' + this.clientId + ')', 40102, 403));
				return;
			}
			/* RSA4b1 -- if we have a server time offset set already, we can
			 * autoremove expired tokens. Else just use the cached token. If it is
			 * expired Ably will tell us and we'll discard it then. */
			if(!this.isTimeOffsetSet() || !token.expires || (token.expires >= this.getTimestampUsingOffset())) {
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Auth.getToken()', 'using cached token; expires = ' + token.expires);
				callback(null, token);
				return;
			}
			/* expired, so remove and fallthrough to getting a new one */
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Auth.getToken()', 'deleting expired token');
			this.tokenDetails = null;
		}

		(this.waitingForTokenRequest || (this.waitingForTokenRequest = Object(multicaster["a" /* default */])())).push(callback);
		if(this.currentTokenRequestId !== null && !forceSupersede) {
			return;
		}

		/* Request a new token */
		var tokenRequestId = this.currentTokenRequestId = getTokenRequestId();
		this.requestToken(this.tokenParams, this.authOptions, function(err, tokenResponse) {
			if(self.currentTokenRequestId > tokenRequestId) {
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Auth._ensureValidAuthCredentials()', 'Discarding token request response; overtaken by newer one');
				return;
			}
			self.currentTokenRequestId = null;
			var callbacks = self.waitingForTokenRequest || noop;
			self.waitingForTokenRequest = null;
			if(err) {
				callbacks(err);
				return;
			}
			callbacks(null, (self.tokenDetails = tokenResponse));
		});
	};


	/* User-set: check types, '*' is disallowed, throw any errors */
	Auth.prototype._userSetClientId = function(clientId) {
		if(!(typeof(clientId) === 'string' || clientId === null)) {
			throw new errorinfo["a" /* default */]('clientId must be either a string or null', 40012, 400);
		} else if(clientId === '*') {
			throw new errorinfo["a" /* default */]('Can’t use "*" as a clientId as that string is reserved. (To change the default token request behaviour to use a wildcard clientId, instantiate the library with {defaultTokenParams: {clientId: "*"}}), or if calling authorize(), pass it in as a tokenParam: authorize({clientId: "*"}, authOptions)', 40012, 400);
		} else {
			var err = this._uncheckedSetClientId(clientId);
			if(err) throw err;
		}
	};

	/* Ably-set: no typechecking, '*' is allowed but not set on this.clientId), return errors to the caller */
	Auth.prototype._uncheckedSetClientId = function(clientId) {
		if(this._tokenClientIdMismatch(clientId)) {
			/* Should never happen in normal circumstances as realtime should
			 * recognise mismatch and return an error */
			var msg = 'Unexpected clientId mismatch: client has ' + this.clientId + ', requested ' + clientId;
			var err = new errorinfo["a" /* default */](msg, 40102, 401);
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Auth._uncheckedSetClientId()', msg);
			return err;
		} else {
			/* RSA7a4: if options.clientId is provided and is not
			 * null, it overrides defaultTokenParams.clientId */
			this.clientId = this.tokenParams.clientId = clientId;
			return null;
		}
	};

	Auth.prototype._tokenClientIdMismatch = function(tokenClientId) {
		return this.clientId &&
			(this.clientId !== '*') &&
			tokenClientId &&
			(tokenClientId !== '*') &&
			(this.clientId !== tokenClientId);
	};

	Auth.isTokenErr = function(error) {
		return error.code && (error.code >= 40140) && (error.code < 40150);
	};

	return Auth;
})();

/* harmony default export */ var auth = __webpack_exports__["a"] = (auth_Auth);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _util_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _types_protocolmessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _transport_transport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var _util_defaults__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _connectionerror__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
/* harmony import */ var _client_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _types_errorinfo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2);









var CometTransport = (function() {

	var REQ_SEND = 0,
		REQ_RECV = 1,
		REQ_RECV_POLL = 2,
		REQ_RECV_STREAM = 3;

	/* TODO: can remove once realtime sends protocol message responses for comet errors */
	function shouldBeErrorAction(err) {
		var UNRESOLVABLE_ERROR_CODES = [80015, 80017, 80030];
		if(err.code) {
			if(_client_auth__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].isTokenErr(err)) return false;
			if(_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].arrIn(UNRESOLVABLE_ERROR_CODES, err.code)) return true;
			return (err.code >= 40000 && err.code < 50000);
		} else {
			/* Likely a network or transport error of some kind. Certainly not fatal to the connection */
			return false;
		}
	}

	function protocolMessageFromRawError(err) {
		/* err will be either a legacy (non-protocolmessage) comet error response
		 * (which will have an err.code), or a xhr/network error (which won't). */
		if(shouldBeErrorAction(err)) {
			return [_types_protocolmessage__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].fromValues({action: _types_protocolmessage__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Action.ERROR, error: err})];
		} else {
			return [_types_protocolmessage__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].fromValues({action: _types_protocolmessage__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].Action.DISCONNECTED, error: err})];
		}
	}

	/*
	 * A base comet transport class
	 */
	function CometTransport(connectionManager, auth, params) {
		/* binary not supported for comet, so just fall back to default */
		params.format = undefined;
		params.heartbeats = true;
		_transport_transport__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].call(this, connectionManager, auth, params);
		/* streaming defaults to true */
		this.stream = ('stream' in params) ? params.stream : true;
		this.sendRequest = null;
		this.recvRequest = null;
		this.pendingCallback = null;
		this.pendingItems = null;
	}
	_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].inherits(CometTransport, _transport_transport__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);

	CometTransport.REQ_SEND = REQ_SEND;
	CometTransport.REQ_RECV = REQ_RECV;
	CometTransport.REQ_RECV_POLL = REQ_RECV_POLL;
	CometTransport.REQ_RECV_STREAM = REQ_RECV_STREAM;

	/* public instance methods */
	CometTransport.prototype.connect = function() {
		_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MINOR, 'CometTransport.connect()', 'starting');
		_transport_transport__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].prototype.connect.call(this);
		var self = this, params = this.params, options = params.options;
		var host = _util_defaults__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].getHost(options, params.host);
		var port = _util_defaults__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].getPort(options);
		var cometScheme = options.tls ? 'https://' : 'http://';

		this.baseUri = cometScheme + host + ':' + port + '/comet/';
		var connectUri = this.baseUri + 'connect';
		_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MINOR, 'CometTransport.connect()', 'uri: ' + connectUri);
		this.auth.getAuthParams(function(err, authParams) {
			if(err) {
				self.disconnect(err);
				return;
			}
			if(self.isDisposed) {
				return;
			}
			self.authParams = authParams;
			var connectParams = self.params.getConnectParams(authParams);
			if('stream' in connectParams) self.stream = connectParams.stream;
			_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MINOR, 'CometTransport.connect()', 'connectParams:' + _util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].toQueryString(connectParams));

			/* this will be the 'recvRequest' so this connection can stream messages */
			var preconnected = false,
				connectRequest = self.recvRequest = self.createRequest(connectUri, null, connectParams, null, (self.stream ? REQ_RECV_STREAM : REQ_RECV));

			connectRequest.on('data', function(data) {
				if(!self.recvRequest) {
					/* the transport was disposed before we connected */
					return;
				}
				if(!preconnected) {
					preconnected = true;
					self.emit('preconnect');
				}
				self.onData(data);
			});
			connectRequest.on('complete', function(err, _body, headers) {
				if(!self.recvRequest) {
					/* the transport was disposed before we connected */
					err = err || new _types_errorinfo__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"]('Request cancelled', 80003, 400);
				}
				self.recvRequest = null;
				/* Connect request may complete without a emitting 'data' event since that is not
				 * emitted for e.g. a non-streamed error response. Still implies preconnect. */
				if(!preconnected && !err) {
					preconnected = true;
					self.emit('preconnect');
				}
				self.onActivity();
				if(err) {
					if(err.code) {
						/* A protocol error received from realtime. TODO: once realtime
						 * consistendly sends errors wrapped in protocol messages, should be
						 * able to remove this */
						self.onData(protocolMessageFromRawError(err));
					} else {
						/* A network/xhr error. Don't bother wrapping in a protocol message,
						 * just disconnect the transport */
						self.disconnect(err);
					}
					return;
				}
				_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].nextTick(function() {
					self.recv();
				});
			});
			connectRequest.exec();
		});
	};

	CometTransport.prototype.requestClose = function() {
		_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MINOR, 'CometTransport.requestClose()');
		this._requestCloseOrDisconnect(true);
	};

	CometTransport.prototype.requestDisconnect = function() {
		_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MINOR, 'CometTransport.requestDisconnect()');
		this._requestCloseOrDisconnect(false);
	};

	CometTransport.prototype._requestCloseOrDisconnect = function(closing) {
		var closeOrDisconnectUri = closing ? this.closeUri : this.disconnectUri;
		if(closeOrDisconnectUri) {
			var self = this,
				request = this.createRequest(closeOrDisconnectUri, null, this.authParams, null, REQ_SEND);

			request.on('complete', function (err) {
				if(err) {
					_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_ERROR, 'CometTransport.request' + (closing ? 'Close()' : 'Disconnect()'), 'request returned err = ' + _util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].inspectError(err));
					self.finish('disconnected', err);
				}
			});
			request.exec();
		}
	};

	CometTransport.prototype.dispose = function() {
		_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MINOR, 'CometTransport.dispose()', '');
		if(!this.isDisposed) {
			this.isDisposed = true;
			if(this.recvRequest) {
				_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MINOR, 'CometTransport.dispose()', 'aborting recv request');
				this.recvRequest.abort();
				this.recvRequest = null;
			}
			/* In almost all cases the transport will be finished before it's
			 * disposed. Finish here just to make sure. */
			this.finish('disconnected', _connectionerror__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].disconnected);
			var self = this;
			_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].nextTick(function() {
				self.emit('disposed');
			});
		}
	};

	CometTransport.prototype.onConnect = function(message) {
		/* if this transport has been disposed whilst awaiting connection, do nothing */
		if(this.isDisposed) {
			return;
		}

		/* the connectionKey in a comet connected response is really
		 * <instId>-<connectionKey> */
		var connectionStr = message.connectionKey;
		_transport_transport__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].prototype.onConnect.call(this, message);

		var baseConnectionUri =  this.baseUri + connectionStr;
		_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MICRO, 'CometTransport.onConnect()', 'baseUri = ' + baseConnectionUri + '; connectionKey = ' + message.connectionKey);
		this.sendUri = baseConnectionUri + '/send';
		this.recvUri = baseConnectionUri + '/recv';
		this.closeUri = baseConnectionUri + '/close';
		this.disconnectUri = baseConnectionUri + '/disconnect';
	};

	CometTransport.prototype.send = function(message) {
		if(this.sendRequest) {
			/* there is a pending send, so queue this message */
			this.pendingItems = this.pendingItems || [];
			this.pendingItems.push(message);
			return;
		}
		/* send this, plus any pending, now */
		var pendingItems = this.pendingItems || [];
		pendingItems.push(message);
		this.pendingItems = null;

		this.sendItems(pendingItems);
	};

	CometTransport.prototype.sendAnyPending = function() {
		var pendingItems = this.pendingItems;

		if(!pendingItems) {
			return;
		}

		this.pendingItems = null;
		this.sendItems(pendingItems);
	}

	CometTransport.prototype.sendItems = function(items) {
		var self = this,
			sendRequest = this.sendRequest = self.createRequest(self.sendUri, null, self.authParams, this.encodeRequest(items), REQ_SEND);

		sendRequest.on('complete', function(err, data) {
			if(err) _util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_ERROR, 'CometTransport.sendItems()', 'on complete: err = ' + _util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].inspectError(err));
			self.sendRequest = null;

			/* the result of the request, even if a nack, is usually a protocol response
			 * contained in the data. An err is anomolous, and indicates some issue with the
			 * network,transport, or connection */
			if(err) {
				if(err.code) {
					/* A protocol error received from realtime. TODO: once realtime
					 * consistendly sends errors wrapped in protocol messages, should be
					 * able to remove this */
					self.onData(protocolMessageFromRawError(err));
				} else {
					/* A network/xhr error. Don't bother wrapping in a protocol message,
					 * just disconnect the transport */
					self.disconnect(err);
				}
				return;
			}

			if(data) {
				self.onData(data);
			}

			if(self.pendingItems) {
				_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].nextTick(function() {
					/* If there's a new send request by now, any pending items will have
					 * been picked up by that; any new ones added since then will be
					 * picked up after that one completes */
					if(!self.sendRequest) {
						self.sendAnyPending();
					}
				});
			}
		});
		sendRequest.exec();
	};

	CometTransport.prototype.recv = function() {
		/* do nothing if there is an active request, which might be streaming */
		if(this.recvRequest)
			return;

		/* If we're no longer connected, do nothing */
		if(!this.isConnected)
			return;

		var self = this,
			recvRequest = this.recvRequest = this.createRequest(this.recvUri, null, this.authParams, null, (self.stream ? REQ_RECV_STREAM : REQ_RECV_POLL));

		recvRequest.on('data', function(data) {
			self.onData(data);
		});
		recvRequest.on('complete', function(err) {
			self.recvRequest = null;
			/* A request completing must be considered activity, as realtime sends
			 * heartbeats every 15s since a request began, not every 15s absolutely */
			self.onActivity();
			if(err) {
				if(err.code) {
					/* A protocol error received from realtime. TODO: once realtime
					 * consistendly sends errors wrapped in protocol messages, should be
					 * able to remove this */
					self.onData(protocolMessageFromRawError(err));
				} else {
					/* A network/xhr error. Don't bother wrapping in a protocol message,
					 * just disconnect the transport */
					self.disconnect(err);
				}
				return;
			}
			_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].nextTick(function() {
				self.recv();
			});
		});
		recvRequest.exec();
	};

	CometTransport.prototype.onData = function(responseData) {
		try {
			var items = this.decodeResponse(responseData);
			if(items && items.length)
				for(var i = 0; i < items.length; i++)
					this.onProtocolMessage(_types_protocolmessage__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].fromDeserialized(items[i]));
		} catch (e) {
			_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_ERROR, 'CometTransport.onData()', 'Unexpected exception handing channel event: ' + e.stack);
		}
	};

	CometTransport.prototype.encodeRequest = function(requestItems) {
		return JSON.stringify(requestItems);
	};

	CometTransport.prototype.decodeResponse = function(responseData) {
		if(typeof(responseData) == 'string')
			responseData = JSON.parse(responseData);
		return responseData;
	};

	/* For comet, we could do the auth update by aborting the current recv and
	 * starting a new one with the new token, that'd be sufficient for realtime.
	 * Problem is JSONP - you can't cancel truly abort a recv once started. So
	 * we need to send an AUTH for jsonp. In which case it's simpler to keep all
	 * comet transports the same and do it for all of them. So we send the AUTH
	 * instead, and don't need to abort the recv */
	CometTransport.prototype.onAuthUpdated = function(tokenDetails) {
		this.authParams = {access_token: tokenDetails.token};
	};

	return CometTransport;
})();

/* harmony default export */ __webpack_exports__["a"] = (CometTransport);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


var WebStorage = (function() {
	var sessionSupported,
		localSupported,
		test = 'ablyjs-storage-test';

	/* Even just accessing the session/localStorage object can throw a
	 * security exception in some circumstances with some browsers. In
	 * others, calling setItem will throw. So have to check in this
	 * somewhat roundabout way. (If unsupported or no global object,
	 * will throw on accessing a property of undefined) */
	try {
		global.sessionStorage.setItem(test, test);
		global.sessionStorage.removeItem(test);
		sessionSupported = true;
	} catch(e) {
		sessionSupported = false;
	}

	try {
		global.localStorage.setItem(test, test);
		global.localStorage.removeItem(test);
		localSupported = true;
	} catch(e) {
		localSupported = false;
	}

	function WebStorage() {}

	function storageInterface(session) {
		return session ? global.sessionStorage : global.localStorage;
	}

	function set(name, value, ttl, session) {
		var wrappedValue = {value: value};
		if(ttl) {
			wrappedValue.expires = _common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].now() + ttl;
		}
		return storageInterface(session).setItem(name, JSON.stringify(wrappedValue));
	}

	function get(name, session) {
		var rawItem = storageInterface(session).getItem(name);
		if(!rawItem) return null;
		var wrappedValue = JSON.parse(rawItem);
		if(wrappedValue.expires && (wrappedValue.expires < _common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].now())) {
			storageInterface(session).removeItem(name);
			return null;
		}
		return wrappedValue.value;
	}

	function remove(name, session) {
		return storageInterface(session).removeItem(name);
	}

	if(localSupported) {
		WebStorage.set    = function(name, value, ttl) { return set(name, value, ttl, false); };
		WebStorage.get    = function(name) { return get(name, false); };
		WebStorage.remove = function(name) { return remove(name, false); };
	}

	if(sessionSupported) {
		WebStorage.setSession    = function(name, value, ttl) { return set(name, value, ttl, true); };
		WebStorage.getSession    = function(name) { return get(name, true); };
		WebStorage.removeSession = function(name) { return remove(name, true); };
	}

	return WebStorage;
})();

/* harmony default export */ __webpack_exports__["a"] = (WebStorage);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(20)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(12));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * Base64 encoding strategy.
	     */
	    var Base64 = C_enc.Base64 = {
	        /**
	         * Converts a word array to a Base64 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Base64 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	            // Clamp excess bits
	            wordArray.clamp();

	            // Convert
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }

	            // Add padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }

	            return base64Chars.join('');
	        },

	        /**
	         * Converts a Base64 string to a word array.
	         *
	         * @param {string} base64Str The Base64 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
	         */
	        parse: function (base64Str) {
	            // Shortcuts
	            var base64StrLength = base64Str.length;
	            var map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	            var reverseMap = this._reverseMap;

	            if (!reverseMap) {
	                    reverseMap = this._reverseMap = [];
	                    for (var j = 0; j < map.length; j++) {
	                        reverseMap[map.charCodeAt(j)] = j;
	                    }
	            }

	            // Ignore padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex !== -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }

	            // Convert
	            return parseLoop(base64Str, base64StrLength, reverseMap);

	        }
	    };

	    function parseLoop(base64Str, base64StrLength, reverseMap) {
	      var words = [];
	      var nBytes = 0;
	      for (var i = 0; i < base64StrLength; i++) {
	          if (i % 4) {
	              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
	              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
	              var bitsCombined = bits1 | bits2;
	              words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
	              nBytes++;
	          }
	      }
	      return WordArray.create(words, nBytes);
	    }
	}());


	return CryptoJS.enc.Base64;

}));

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var crypto_js_build_enc_base64__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var crypto_js_build_enc_base64__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto_js_build_enc_base64__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var crypto_js_build__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28);
/* harmony import */ var crypto_js_build__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(crypto_js_build__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var platform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var _common_lib_util_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var platform_bufferutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4);







var Crypto = (function() {
	var DEFAULT_ALGORITHM = 'aes';
	var DEFAULT_KEYLENGTH = 256; // bits
	var DEFAULT_MODE = 'cbc';
	var DEFAULT_BLOCKLENGTH = 16; // bytes
	var DEFAULT_BLOCKLENGTH_WORDS = 4; // 32-bit words
	var UINT32_SUP = 0x100000000;
	var INT32_SUP = 0x80000000;

	/**
	 * Internal: generate an array of secure random words corresponding to the given length of bytes
	 * @param bytes
	 * @param callback
	 */
	var generateRandom;
	if(platform__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].getRandomWordArray) {
		generateRandom = platform__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].getRandomWordArray;
	} else if(typeof Uint32Array !== 'undefined' && platform__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].getRandomValues) {
		var blockRandomArray = new Uint32Array(DEFAULT_BLOCKLENGTH_WORDS);
		generateRandom = function(bytes, callback) {
			var words = bytes / 4, nativeArray = (words == DEFAULT_BLOCKLENGTH_WORDS) ? blockRandomArray : new Uint32Array(words);
			platform__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].getRandomValues(nativeArray, function(err) {
				callback(err, platform_bufferutils__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].toWordArray(nativeArray))
			});
		};
	} else {
		generateRandom = function(bytes, callback) {
			_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].logAction(_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].LOG_MAJOR, 'Ably.Crypto.generateRandom()', 'Warning: the browser you are using does not support secure cryptographically secure randomness generation; falling back to insecure Math.random()');
			var words = bytes / 4, array = new Array(words);
			for(var i = 0; i < words; i++) {
				/* cryptojs wordarrays use signed ints. When WordArray.create is fed a
				* Uint32Array unsigned are converted to signed automatically, but when
				* fed a normal array they aren't, so need to do so ourselves by
				* subtracting INT32_SUP */
				array[i] = Math.floor(Math.random() * UINT32_SUP) - INT32_SUP;
			}

			callback(null, crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create(array));
		};
	}

	/**
	 * Internal: calculate the padded length of a given plaintext
	 * using PKCS5.
	 * @param plaintextLength
	 * @return
	 */
	function getPaddedLength(plaintextLength) {
		return (plaintextLength + DEFAULT_BLOCKLENGTH) & -DEFAULT_BLOCKLENGTH;
	}

	/**
	 * Internal: checks that the cipherParams are a valid combination. Currently
	 * just checks that the calculated keyLength is a valid one for aes-cbc
	 */
	function validateCipherParams(params) {
		if(params.algorithm === 'aes' && params.mode === 'cbc') {
			if(params.keyLength === 128 || params.keyLength === 256) {
				return;
			}
			throw new Error('Unsupported key length ' + params.keyLength + ' for aes-cbc encryption. Encryption key must be 128 or 256 bits (16 or 32 ASCII characters)');
		}
	}

	function normaliseBase64(string) {
		/* url-safe base64 strings use _ and - instread of / and + */
		return string.replace('_', '/').replace('-', '+');
	}

	/**
	 * Internal: a block containing zeros
	 */
	var emptyBlock = crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create([0,0,0,0]);

	/**
	 * Internal: obtain the pkcs5 padding string for a given padded length;
	 */
	var pkcs5Padding = [
		crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create([0x10101010,0x10101010,0x10101010,0x10101010], 16),
		crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create([0x01000000], 1),
		crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create([0x02020000], 2),
		crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create([0x03030300], 3),
		crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create([0x04040404], 4),
		crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create([0x05050505,0x05000000], 5),
		crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create([0x06060606,0x06060000], 6),
		crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create([0x07070707,0x07070700], 7),
		crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create([0x08080808,0x08080808], 8),
		crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create([0x09090909,0x09090909,0x09000000], 9),
		crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create([0x0a0a0a0a,0x0a0a0a0a,0x0a0a0000], 10),
		crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create([0x0b0b0b0b,0x0b0b0b0b,0x0b0b0b00], 11),
		crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create([0x0c0c0c0c,0x0c0c0c0c,0x0c0c0c0c], 12),
		crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create([0x0d0d0d0d,0x0d0d0d0d,0x0d0d0d0d,0x0d000000], 13),
		crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create([0x0e0e0e0e,0x0e0e0e0e,0x0e0e0e0e,0x0e0e0000], 14),
		crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create([0x0f0f0f0f,0x0f0f0f0f,0x0f0f0f0f,0x0f0f0f0f], 15),
		crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create([0x10101010,0x10101010,0x10101010,0x10101010], 16)
	];

	/**
	 * Utility classes and interfaces for message payload encryption.
	 *
	 * This class supports AES/CBC/PKCS5 with a default keylength of 128 bits
	 * but supporting other keylengths. Other algorithms and chaining modes are
	 * not supported directly, but supportable by extending/implementing the base
	 * classes and interfaces here.
	 *
	 * Secure random data for creation of Initialization Vectors (IVs) and keys
	 * is obtained from window.crypto.getRandomValues if available, or from
	 * Math.random() if not. Clients who do not want to depend on Math.random()
	 * should polyfill window.crypto.getRandomValues with a library that seeds
	 * a PRNG with real entropy.
	 *
	 * Each message payload is encrypted with an IV in CBC mode, and the IV is
	 * concatenated with the resulting raw ciphertext to construct the "ciphertext"
	 * data passed to the recipient.
	 */
	function Crypto() {}

	/**
	 * A class encapsulating the client-specifiable parameters for
	 * the cipher.
	 *
	 * algorithm is the name of the algorithm in the default system provider,
	 * or the lower-cased version of it; eg "aes" or "AES".
	 *
	 * Clients are recommended to not call this directly, but instead to use the
	 * Crypto.getDefaultParams helper, which will fill in any fields not supplied
	 * with default values and validation the result.
	 */
	function CipherParams() {
		this.algorithm = null;
		this.keyLength = null;
		this.mode = null;
		this.key = null;
	}
	Crypto.CipherParams = CipherParams;

	/**
	 * Obtain a complete CipherParams instance from the provided params, filling
	 * in any not provided with default values, calculating a keyLength from
	 * the supplied key, and validating the result.
	 * @param params an object containing at a minimum a `key` key with value the
	 * key, as either a binary (ArrayBuffer, Array, WordArray) or a
	 * base64-encoded string. May optionally also contain: algorithm (defaults to
	 * AES), mode (defaults to 'cbc')
	 */
	Crypto.getDefaultParams = function(params) {
		var key;
		/* Backward compatibility */
		if((typeof(params) === 'function') || (typeof(params) === 'string')) {
			_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].deprecated('Crypto.getDefaultParams(key, callback)', 'Crypto.getDefaultParams({key: key})');
			if(typeof(params) === 'function') {
				Crypto.generateRandomKey(function(key) {
					params(null, Crypto.getDefaultParams({key: key}));
				})
			} else if(typeof arguments[1] === 'function') {
				arguments[1](null, Crypto.getDefaultParams({key: params}));
			} else {
				throw new Error('Invalid arguments for Crypto.getDefaultParams');
			}
			return;
		}

		if(!params.key) {
			throw new Error('Crypto.getDefaultParams: a key is required');
		}

		if (typeof(params.key) === 'string') {
			key = Object(crypto_js_build_enc_base64__WEBPACK_IMPORTED_MODULE_1__["parse"])(normaliseBase64(params.key));
		} else {
			key = platform_bufferutils__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].toWordArray(params.key); // Expect key to be an Array, ArrayBuffer, or WordArray at this point
		}

		var cipherParams = new CipherParams();
		cipherParams.key = key;
		cipherParams.algorithm = params.algorithm || DEFAULT_ALGORITHM;
		cipherParams.keyLength = key.words.length * (4 * 8);
		cipherParams.mode = params.mode || DEFAULT_MODE;

		if(params.keyLength && params.keyLength !== cipherParams.keyLength) {
			throw new Error('Crypto.getDefaultParams: a keyLength of ' + params.keyLength + ' was specified, but the key actually has length ' + cipherParams.keyLength);
		}

		validateCipherParams(cipherParams);
		return cipherParams;
	};

	/**
	 * Generate a random encryption key from the supplied keylength (or the
	 * default keyLength if none supplied) as a CryptoJS WordArray
	 * @param keyLength (optional) the required keyLength in bits
	 * @param callback (err, key)
	 */
	Crypto.generateRandomKey = function(keyLength, callback) {
		if(arguments.length == 1 && typeof(keyLength) == 'function') {
			callback = keyLength;
			keyLength = undefined;
		}
		generateRandom((keyLength || DEFAULT_KEYLENGTH) / 8, callback);
	};

	/**
	 * Internal; get a ChannelCipher instance based on the given cipherParams
	 * @param params either a CipherParams instance or some subset of its
	 * fields that includes a key
	 */
	Crypto.getCipher = function(params) {
		var cipherParams = (params instanceof CipherParams) ?
		                   params :
		                   Crypto.getDefaultParams(params);

		return {cipherParams: cipherParams, cipher: new CBCCipher(cipherParams, DEFAULT_BLOCKLENGTH_WORDS, params.iv)};
	};

	function CBCCipher(params, blockLengthWords, iv) {
		this.algorithm = params.algorithm + '-' + String(params.keyLength) + '-' + params.mode;
		this.cjsAlgorithm = params.algorithm.toUpperCase().replace(/-\d+$/, '');
		this.key = platform_bufferutils__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].toWordArray(params.key);
		if(iv) {
			this.iv = platform_bufferutils__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].toWordArray(iv).clone();
		}
		this.blockLengthWords = blockLengthWords;
	}

	CBCCipher.prototype.encrypt = function(plaintext, callback) {
		_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].logAction(_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].LOG_MICRO, 'CBCCipher.encrypt()', '');
		plaintext = platform_bufferutils__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].toWordArray(plaintext);
		var plaintextLength = plaintext.sigBytes,
			paddedLength = getPaddedLength(plaintextLength),
			self = this;

		var then = function() {
			self.getIv(function(err, iv) {
				if (err) {
					callback(err);
					return;
				}
				var cipherOut = self.encryptCipher.process(plaintext.concat(pkcs5Padding[paddedLength - plaintextLength]));
				var ciphertext = iv.concat(cipherOut);
				callback(null, ciphertext);
			});
		};

		if (!this.encryptCipher) {
			if(this.iv) {
				this.encryptCipher = crypto_js_build__WEBPACK_IMPORTED_MODULE_2___default.a.algo[this.cjsAlgorithm].createEncryptor(this.key, { iv: this.iv });
				then();
			} else {
				generateRandom(DEFAULT_BLOCKLENGTH, function(err, iv) {
					if (err) {
						callback(err);
						return;
					}
					self.encryptCipher = crypto_js_build__WEBPACK_IMPORTED_MODULE_2___default.a.algo[self.cjsAlgorithm].createEncryptor(self.key, { iv: iv });
					self.iv = iv;
					then();
				});
			}
		} else {
			then();
		}
	};

	CBCCipher.prototype.decrypt = function(ciphertext) {
		_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].logAction(_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].LOG_MICRO, 'CBCCipher.decrypt()', '');
		ciphertext = platform_bufferutils__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].toWordArray(ciphertext);
		var blockLengthWords = this.blockLengthWords,
			ciphertextWords = ciphertext.words,
			iv = crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create(ciphertextWords.slice(0, blockLengthWords)),
			ciphertextBody = crypto_js_build_lib_typedarrays__WEBPACK_IMPORTED_MODULE_0___default.a.create(ciphertextWords.slice(blockLengthWords));

		var decryptCipher = crypto_js_build__WEBPACK_IMPORTED_MODULE_2___default.a.algo[this.cjsAlgorithm].createDecryptor(this.key, { iv: iv });
		var plaintext = decryptCipher.process(ciphertextBody);
		var epilogue = decryptCipher.finalize();
		decryptCipher.reset();
		if(epilogue && epilogue.sigBytes) plaintext.concat(epilogue);
		return plaintext;
	};

	CBCCipher.prototype.getIv = function(callback) {
		if(this.iv) {
			var iv = this.iv;
			this.iv = null;
			callback(null, iv);
			return;
		}

		/* Since the iv for a new block is the ciphertext of the last, this
		* sets a new iv (= aes(randomBlock XOR lastCipherText)) as well as
		* returning it */
		var self = this;
		generateRandom(DEFAULT_BLOCKLENGTH, function(err, randomBlock) {
			if (err) {
				callback(err);
				return;
			} 
			callback(null, self.encryptCipher.process(randomBlock));
		});
	};

	return Crypto;
})();

/* harmony default export */ __webpack_exports__["a"] = (Crypto);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _types_protocolmessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _util_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _util_eventemitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var _transport_connectionerror__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _types_errorinfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2);







var Transport = (function() {
	var actions = _types_protocolmessage__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].Action;
	var closeMessage = _types_protocolmessage__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].fromValues({action: actions.CLOSE});
	var disconnectMessage = _types_protocolmessage__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].fromValues({action: actions.DISCONNECT});
	var noop = function() {};

	/*
	 * EventEmitter, generates the following events:
	 *
	 * event name       data
	 * closed           error
	 * failed           error
	 * disposed
	 * connected        null error, connectionSerial, connectionId, connectionDetails
	 * sync             connectionSerial, connectionId
	 * event            channel message object
	 */

	/* public constructor */
	function Transport(connectionManager, auth, params) {
		_util_eventemitter__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].call(this);
		this.connectionManager = connectionManager;
		connectionManager.registerProposedTransport(this);
		this.auth = auth;
		this.params = params;
		this.timeouts = params.options.timeouts;
		this.format = params.format;
		this.isConnected = false;
		this.isFinished = false;
		this.isDisposed = false;
		this.maxIdleInterval = null;
		this.idleTimer = null;
		this.lastActivity = null;
	}
	_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].inherits(Transport, _util_eventemitter__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);

	Transport.prototype.connect = function() {};

	Transport.prototype.close = function() {
		if(this.isConnected) {
			this.requestClose();
		}
		this.finish('closed', _transport_connectionerror__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].closed);
	};

	Transport.prototype.disconnect = function(err) {
		/* Used for network/transport issues that need to result in the transport
		 * being disconnected, but should not affect the connection */
		if(this.isConnected) {
			this.requestDisconnect();
		}
		this.finish('disconnected', err || _transport_connectionerror__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].disconnected);
	};

	Transport.prototype.fail = function(err) {
		/* Used for client-side-detected fatal connection issues */
		if(this.isConnected) {
			this.requestDisconnect();
		}
		this.finish('failed', err || _transport_connectionerror__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].failed);
	};

	Transport.prototype.finish = function(event, err) {
		if(this.isFinished) {
			return;
		}

		this.isFinished = true;
		this.isConnected = false;
		this.maxIdleInterval = null;
		clearTimeout(this.idleTimer);
		this.idleTimer = null;
		this.emit(event, err);
		this.dispose();
	};

	Transport.prototype.onProtocolMessage = function(message) {
		if (_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].shouldLog(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MICRO)) {
			_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MICRO, 'Transport.onProtocolMessage()', 'received on ' + this.shortName + ': ' + _types_protocolmessage__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].stringify(message) + '; connectionId = ' + this.connectionManager.connectionId);
		}
		this.onActivity();

		switch(message.action) {
		case actions.HEARTBEAT:
			_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MICRO, 'Transport.onProtocolMessage()', this.shortName + ' heartbeat; connectionId = ' + this.connectionManager.connectionId);
			this.emit('heartbeat', message.id);
			break;
		case actions.CONNECTED:
			this.onConnect(message);
			this.emit('connected', message.error, message.connectionId, message.connectionDetails, message);
			break;
		case actions.CLOSED:
			this.onClose(message);
			break;
		case actions.DISCONNECTED:
			this.onDisconnect(message);
			break;
		case actions.ACK:
			this.emit('ack', message.msgSerial, message.count);
			break;
		case actions.NACK:
			this.emit('nack', message.msgSerial, message.count, message.error);
			break;
		case actions.SYNC:
			if(message.connectionId !== undefined) {
				/* a transport SYNC */
				this.emit('sync', message.connectionId, message);
				break;
			}
			/* otherwise it's a channel SYNC, so handle it in the channel */
			this.connectionManager.onChannelMessage(message, this);
			break;
		case actions.AUTH:
			this.auth.authorize(function(err) {
				if(err) {
					_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_ERROR, 'Transport.onProtocolMessage()', 'Ably requested re-authentication, but unable to obtain a new token: ' + _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].inspectError(err));
				}
			});
			break;
		case actions.ERROR:
			_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MINOR, 'Transport.onProtocolMessage()', 'received error action; connectionId = ' + this.connectionManager.connectionId + '; err = ' + _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].inspect(message.error) + (message.channel ? (', channel: ' +  message.channel) : ''));
			if(message.channel === undefined) {
				this.onFatalError(message);
				break;
			}
			/* otherwise it's a channel-specific error, so handle it in the channel */
			this.connectionManager.onChannelMessage(message, this);
			break;
		default:
			/* all other actions are channel-specific */
			this.connectionManager.onChannelMessage(message, this);
		}
	};

	Transport.prototype.onConnect = function(message) {
		this.isConnected = true;
		var maxPromisedIdle = message.connectionDetails.maxIdleInterval;
		if(maxPromisedIdle) {
			this.maxIdleInterval = maxPromisedIdle + this.timeouts.realtimeRequestTimeout;
			this.onActivity();
		}
		/* else Realtime declines to guarantee any maximum idle interval - CD2h */
	};

	Transport.prototype.onDisconnect = function(message) {
		/* Used for when the server has disconnected the client (usually with a
		 * DISCONNECTED action) */
		var err = message && message.error;
		_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MINOR, 'Transport.onDisconnect()', 'err = ' + _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].inspectError(err));
		this.finish('disconnected', err);
	};

	Transport.prototype.onFatalError = function(message) {
		/* On receipt of a fatal connection error, we can assume that the server
		 * will close the connection and the transport, and do not need to request
		 * a disconnection - RTN15i */
		var err = message && message.error;
		_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MINOR, 'Transport.onFatalError()', 'err = ' + _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].inspectError(err));
		this.finish('failed', err);
	};

	Transport.prototype.onClose = function(message) {
		var err = message && message.error;
		_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MINOR, 'Transport.onClose()', 'err = ' + _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].inspectError(err));
		this.finish('closed', err);
	};

	Transport.prototype.requestClose = function() {
		_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MINOR, 'Transport.requestClose()', '');
		this.send(closeMessage);
	};

	Transport.prototype.requestDisconnect = function() {
		_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MINOR, 'Transport.requestDisconnect()', '');
		this.send(disconnectMessage);
	};

	Transport.prototype.ping = function(id) {
		var msg = {action: _types_protocolmessage__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].Action.HEARTBEAT};
		if(id) msg.id = id;
		this.send(_types_protocolmessage__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].fromValues(msg));
	};

	Transport.prototype.dispose = function() {
		_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MINOR, 'Transport.dispose()', '');
		this.isDisposed = true;
		this.off();
	};

	Transport.prototype.onActivity = function() {
		if(!this.maxIdleInterval) { return; }
		this.lastActivity = this.connectionManager.lastActivity = _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].now();
		this.setIdleTimer(this.maxIdleInterval + 100);
	};

	Transport.prototype.setIdleTimer = function(timeout) {
		var self = this;
		if(!this.idleTimer) {
			this.idleTimer = setTimeout(function() {
				self.onIdleTimerExpire();
			}, timeout);
		}
	};

	Transport.prototype.onIdleTimerExpire = function() {
		this.idleTimer = null;
		var sinceLast = _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].now() - this.lastActivity,
			timeRemaining = this.maxIdleInterval - sinceLast;
		if(timeRemaining <= 0) {
			var msg = 'No activity seen from realtime in ' + sinceLast + 'ms; assuming connection has dropped';
			_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_ERROR, 'Transport.onIdleTimerExpire()', msg);
			this.disconnect(new _types_errorinfo__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"](msg, 80003, 408));
		} else {
			this.setIdleTimer(timeRemaining + 100);
		}
	};

	Transport.prototype.onAuthUpdated = function() {};

	return Transport;
})();

/* harmony default export */ __webpack_exports__["a"] = (Transport);


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var ConnectionStateChange = (function() {

	/* public constructor */
	function ConnectionStateChange(previous, current, retryIn, reason) {
		this.previous = previous;
		this.current = current;
		if(retryIn) this.retryIn = retryIn;
		if(reason) this.reason = reason;
	}

	return ConnectionStateChange;
})();

/* harmony default export */ __webpack_exports__["a"] = (ConnectionStateChange);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


var Multicaster = (function() {

	function Multicaster(members) {
		members = members || [];

		var handler = function() {
			for(var i = 0; i < members.length; i++) {
				var member = members[i];
				if(member) {
					try {
						member.apply(null, arguments);
					} catch(e){
						_logger__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].logAction(_logger__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].LOG_ERROR, 'Multicaster multiple callback handler', 'Unexpected exception: ' + e + '; stack = ' + e.stack);
					}
				}
			}
		};

		handler.push = function() {
			Array.prototype.push.apply(members, arguments);
		};
		return handler;
	}

	return Multicaster;
})();

/* harmony default export */ __webpack_exports__["a"] = (Multicaster);


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _util_defaults__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var platform_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);






var ErrorReporter = (function() {
	function ErrorReporter() {}

	var levels = ErrorReporter.levels = [
		'fatal',
		'error',
		'warning',
		'info',
		'debug'
	];

	/* (level: typeof ErrorReporter.levels[number], message: string, fingerprint?: string, tags?: {[key: string]: string}): void */
	ErrorReporter.report = function(level, message, fingerprint, tags) {
		var eventId = _utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].randomHexString(16);

		var event = {
			event_id: eventId,
			tags: _utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].mixin({
				lib: platform__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].libver
			}, tags),
			platform: 'javascript',
			level: level,
			release: _util_defaults__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].version,
			fingerprint: fingerprint && [ fingerprint ],
			message: message,
			request: {
				headers: {
					'User-Agent': platform__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].userAgent
				},
				url: platform__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].currentUrl
			}
		};

		_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MICRO, 'ErrorReporter', 'POSTing to error reporter: ' + message);
		platform_http__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].postUri(null, _util_defaults__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].errorReportingUrl, _util_defaults__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].errorReportingHeaders, JSON.stringify(event), {}, function(err, res) {
			_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MICRO, 'ErrorReporter', 'POSTing to error reporter resulted in: ' +
				(err ? _utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].inspectError(err) : _utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].inspectBody(res))
			);
		});
	};

	return ErrorReporter;
})();

/* harmony default export */ __webpack_exports__["a"] = (ErrorReporter);


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var msgpack = (function() {
	"use strict";

	var exports = {};

	exports.inspect = inspect;
	function inspect(buffer) {
		if (buffer === undefined)
			return "undefined";
		var view;
		var type;
		if ( buffer instanceof ArrayBuffer) {
			type = "ArrayBuffer";
			view = new DataView(buffer);
		} else if ( buffer instanceof DataView) {
			type = "DataView";
			view = buffer;
		}
		if (!view)
			return JSON.stringify(buffer);
		var bytes = [];
		for (var i = 0; i < buffer.byteLength; i++) {
			if (i > 20) {
				bytes.push("...");
				break;
			}
			var byte_ = view.getUint8(i).toString(16);
			if (byte_.length === 1)
				byte_ = "0" + byte_;
			bytes.push(byte_);
		}
		return "<" + type + " " + bytes.join(" ") + ">";
	}

	// Encode string as utf8 into dataview at offset
	exports.utf8Write = utf8Write;
	function utf8Write(view, offset, string) {
		var byteLength = view.byteLength;
		for (var i = 0, l = string.length; i < l; i++) {
			var codePoint = string.charCodeAt(i);

			// One byte of UTF-8
			if (codePoint < 0x80) {
				view.setUint8(offset++, codePoint >>> 0 & 0x7f | 0x00);
				continue;
			}

			// Two bytes of UTF-8
			if (codePoint < 0x800) {
				view.setUint8(offset++, codePoint >>> 6 & 0x1f | 0xc0);
				view.setUint8(offset++, codePoint >>> 0 & 0x3f | 0x80);
				continue;
			}

			// Three bytes of UTF-8.
			if (codePoint < 0x10000) {
				view.setUint8(offset++, codePoint >>> 12 & 0x0f | 0xe0);
				view.setUint8(offset++, codePoint >>> 6 & 0x3f | 0x80);
				view.setUint8(offset++, codePoint >>> 0 & 0x3f | 0x80);
				continue;
			}

			// Four bytes of UTF-8
			if (codePoint < 0x110000) {
				view.setUint8(offset++, codePoint >>> 18 & 0x07 | 0xf0);
				view.setUint8(offset++, codePoint >>> 12 & 0x3f | 0x80);
				view.setUint8(offset++, codePoint >>> 6 & 0x3f | 0x80);
				view.setUint8(offset++, codePoint >>> 0 & 0x3f | 0x80);
				continue;
			}
			throw new Error("bad codepoint " + codePoint);
		}
	}


	exports.utf8Read = utf8Read;
	function utf8Read(view, offset, length) {
		var string = "";
		for (var i = offset, end = offset + length; i < end; i++) {
			var byte_ = view.getUint8(i);
			// One byte character
			if ((byte_ & 0x80) === 0x00) {
				string += String.fromCharCode(byte_);
				continue;
			}
			// Two byte character
			if ((byte_ & 0xe0) === 0xc0) {
				string += String.fromCharCode(((byte_ & 0x0f) << 6) | (view.getUint8(++i) & 0x3f));
				continue;
			}
			// Three byte character
			if ((byte_ & 0xf0) === 0xe0) {
				string += String.fromCharCode(((byte_ & 0x0f) << 12) | ((view.getUint8(++i) & 0x3f) << 6) | ((view.getUint8(++i) & 0x3f) << 0));
				continue;
			}
			// Four byte character
			if ((byte_ & 0xf8) === 0xf0) {
				string += String.fromCharCode(((byte_ & 0x07) << 18) | ((view.getUint8(++i) & 0x3f) << 12) | ((view.getUint8(++i) & 0x3f) << 6) | ((view.getUint8(++i) & 0x3f) << 0));
				continue;
			}
			throw new Error("Invalid byte " + byte_.toString(16));
		}
		return string;
	}


	exports.utf8ByteCount = utf8ByteCount;
	function utf8ByteCount(string) {
		var count = 0;
		for (var i = 0, l = string.length; i < l; i++) {
			var codePoint = string.charCodeAt(i);
			if (codePoint < 0x80) {
				count += 1;
				continue;
			}
			if (codePoint < 0x800) {
				count += 2;
				continue;
			}
			if (codePoint < 0x10000) {
				count += 3;
				continue;
			}
			if (codePoint < 0x110000) {
				count += 4;
				continue;
			}
			throw new Error("bad codepoint " + codePoint);
		}
		return count;
	}


	exports.encode = function(value, sparse) {
		var size = sizeof(value, sparse);
		if(size == 0)
			return undefined;
		var buffer = new ArrayBuffer(size);
		var view = new DataView(buffer);
		encode(value, view, 0, sparse);
		return buffer;
	};

	exports.decode = decode;

	var SH_L_32 = (1 << 16) * (1 << 16), SH_R_32 = 1 / SH_L_32;
	function getInt64(view, offset) {
		offset = offset || 0;
		return view.getInt32(offset) * SH_L_32 + view.getUint32(offset + 4);
	}

	function getUint64(view, offset) {
		offset = offset || 0;
		return view.getUint32(offset) * SH_L_32 + view.getUint32(offset + 4);
	}

	function setInt64(view, offset, val) {
		if (val < 0x8000000000000000) {
			view.setInt32(offset, Math.floor(val * SH_R_32));
			view.setInt32(offset + 4, val & -1);
		} else {
			view.setUint32(offset, 0x7fffffff);
			view.setUint32(offset + 4, 0x7fffffff);
		}
	}

	function setUint64(view, offset, val) {
		if (val < 0x10000000000000000) {
			view.setUint32(offset, Math.floor(val * SH_R_32));
			view.setInt32(offset + 4, val & -1);
		} else {
			view.setUint32(offset, 0xffffffff);
			view.setUint32(offset + 4, 0xffffffff);
		}
	}

// https://gist.github.com/frsyuki/5432559 - v5 spec
//
// I've used one extension point from `fixext 1` to store `undefined`. On the wire this
// should translate to exactly 0xd40000
//
// +--------+--------+--------+
// |  0xd4  |  0x00  |  0x00  |
// +--------+--------+--------+
//    ^ fixext |        ^ value part unused (fixed to be 0)
//             ^ indicates undefined value
//

	function Decoder(view, offset) {
		this.offset = offset || 0;
		this.view = view;
	}


	Decoder.prototype.map = function(length) {
		var value = {};
		for (var i = 0; i < length; i++) {
			var key = this.parse();
			value[key] = this.parse();
		}
		return value;
	};

	Decoder.prototype.bin = Decoder.prototype.buf = function(length) {
		var value = new ArrayBuffer(length);
		(new Uint8Array(value)).set(new Uint8Array(this.view.buffer, this.offset, length), 0);
		this.offset += length;
		return value;
	};

	Decoder.prototype.str = function(length) {
		var value = utf8Read(this.view, this.offset, length);
		this.offset += length;
		return value;
	};

	Decoder.prototype.array = function(length) {
		var value = new Array(length);
		for (var i = 0; i < length; i++) {
			value[i] = this.parse();
		}
		return value;
	};

	Decoder.prototype.ext = function(length) {
		var value = {};
		// Get the type byte
		value['type'] = this.view.getInt8(this.offset);
		this.offset++;
		// Get the data array (length)
		value['data'] = this.buf(length);
		this.offset += length;
		return value;
	};

	Decoder.prototype.parse = function() {
		var type = this.view.getUint8(this.offset);
		var value, length;

		// Positive FixInt - 0xxxxxxx
		if ((type & 0x80) === 0x00) {
			this.offset++;
			return type;
		}

		// FixMap - 1000xxxx
		if ((type & 0xf0) === 0x80) {
			length = type & 0x0f;
			this.offset++;
			return this.map(length);
		}

		// FixArray - 1001xxxx
		if ((type & 0xf0) === 0x90) {
			length = type & 0x0f;
			this.offset++;
			return this.array(length);
		}

		// FixStr - 101xxxxx
		if ((type & 0xe0) === 0xa0) {
			length = type & 0x1f;
			this.offset++;
			return this.str(length);
		}

		// Negative FixInt - 111xxxxx
		if ((type & 0xe0) === 0xe0) {
			value = this.view.getInt8(this.offset);
			this.offset++;
			return value;
		}

		switch (type) {

			// nil
			case 0xc0:
				this.offset++;
				return null;

			// 0xc1 never used - use for undefined (NON-STANDARD)
			case 0xc1:
				this.offset++;
				return undefined;

			// false
			case 0xc2:
				this.offset++;
				return false;

			// true
			case 0xc3:
				this.offset++;
				return true;

			// bin 8
			case 0xc4:
				length = this.view.getUint8(this.offset + 1);
				this.offset += 2;
				return this.bin(length);

			// bin 16
			case 0xc5:
				length = this.view.getUint16(this.offset + 1);
				this.offset += 3;
				return this.bin(length);

			// bin 32
			case 0xc6:
				length = this.view.getUint32(this.offset + 1);
				this.offset += 5;
				return this.bin(length);

			// ext 8
			case 0xc7:
				length = this.view.getUint8(this.offset + 1);
				this.offset += 2;
				return this.ext(length);

			// ext 16
			case 0xc8:
				length = this.view.getUint16(this.offset + 1);
				this.offset += 3;
				return this.ext(length);

			// ext 32
			case 0xc9:
				length = this.view.getUint32(this.offset + 1);
				this.offset += 5;
				return this.ext(length);

			// float 32
			case 0xca:
				value = this.view.getFloat32(this.offset + 1);
				this.offset += 5;
				return value;

			// float 64
			case 0xcb:
				value = this.view.getFloat64(this.offset + 1);
				this.offset += 9;
				return value;

			// uint8
			case 0xcc:
				value = this.view.getUint8(this.offset + 1);
				this.offset += 2;
				return value;

			// uint 16
			case 0xcd:
				value = this.view.getUint16(this.offset + 1);
				this.offset += 3;
				return value;

			// uint 32
			case 0xce:
				value = this.view.getUint32(this.offset + 1);
				this.offset += 5;
				return value;

			// uint 64
			case 0xcf:
				value = getUint64(this.view, this.offset + 1);
				this.offset += 9;
				return value;

			// int 8
			case 0xd0:
				value = this.view.getInt8(this.offset + 1);
				this.offset += 2;
				return value;

			// int 16
			case 0xd1:
				value = this.view.getInt16(this.offset + 1);
				this.offset += 3;
				return value;

			// int 32
			case 0xd2:
				value = this.view.getInt32(this.offset + 1);
				this.offset += 5;
				return value;

			// int 64
			case 0xd3:
				value = getInt64(this.view, this.offset + 1);
				this.offset += 9;
				return value;

			// fixext 1
			case 0xd4:
				length = 1;
				this.offset++;
				return this.ext(length);

			// fixext 2
			case 0xd5:
				length = 2;
				this.offset++;
				return this.ext(length);

			// fixext 4
			case 0xd6:
				length = 4;
				this.offset++;
				return this.ext(length);

			// fixext 8
			case 0xd7:
				length = 8;
				this.offset++;
				return this.ext(length);

			// fixext 16
			case 0xd8:
				length = 16;
				this.offset++;
				return this.ext(length);

			// str8
			case 0xd9:
				length = this.view.getUint8(this.offset + 1);
				this.offset += 2;
				return this.str(length);

			// str 16
			case 0xda:
				length = this.view.getUint16(this.offset + 1);
				this.offset += 3;
				return this.str(length);

			// str 32
			case 0xdb:
				length = this.view.getUint32(this.offset + 1);
				this.offset += 5;
				return this.str(length);

			// array 16
			case 0xdc:
				length = this.view.getUint16(this.offset + 1);
				this.offset += 3;
				return this.array(length);

			// array 32
			case 0xdd:
				length = this.view.getUint32(this.offset + 1);
				this.offset += 5;
				return this.array(length);

			// map 16
			case 0xde:
				length = this.view.getUint16(this.offset + 1);
				this.offset += 3;
				return this.map(length);

			// map 32
			case 0xdf:
				length = this.view.getUint32(this.offset + 1);
				this.offset += 5;
				return this.map(length);
		}
		throw new Error("Unknown type 0x" + type.toString(16));
	};

	function decode(buffer) {
		var view = new DataView(buffer);
		var decoder = new Decoder(view);
		var value = decoder.parse();
		if (decoder.offset !== buffer.byteLength)
			throw new Error((buffer.byteLength - decoder.offset) + " trailing bytes");
		return value;
	}

	function encodeableKeys(value, sparse) {
		var keys = []; // TODO: use Object.keys when we are able to transpile to ES3
		for (var key in value) {
			if (!value.hasOwnProperty(key)) continue;
			keys.push(key);
		}
		return keys.filter(function (e) {
			var val = value[e], type = typeof(val);
			return (!sparse || (val !== undefined && val !== null)) && ('function' !== type || !!val.toJSON);
		})
	}

	function encode(value, view, offset, sparse) {
		var type = typeof value;

		// Strings Bytes
		// There are four string types: fixstr/str8/str16/str32
		if (type === "string") {
			var length = utf8ByteCount(value);

			// fixstr
			if (length < 0x20) {
				view.setUint8(offset, length | 0xa0);
				utf8Write(view, offset + 1, value);
				return 1 + length;
			}

			// str8
			if (length < 0x100) {
				view.setUint8(offset, 0xd9);
				view.setUint8(offset + 1, length);
				utf8Write(view, offset + 2, value);
				return 2 + length;
			}

			// str16
			if (length < 0x10000) {
				view.setUint8(offset, 0xda);
				view.setUint16(offset + 1, length);
				utf8Write(view, offset + 3, value);
				return 3 + length;
			}
			// str32
			if (length < 0x100000000) {
				view.setUint8(offset, 0xdb);
				view.setUint32(offset + 1, length);
				utf8Write(view, offset + 5, value);
				return 5 + length;
			}
		}

		if(ArrayBuffer.isView && ArrayBuffer.isView(value)) {
			// extract the arraybuffer and fallthrough
			value = value.buffer;
		}

		// There are three bin types: bin8/bin16/bin32
		if (value instanceof ArrayBuffer) {
			var length = value.byteLength;

			// bin8
			if (length < 0x100) {
				view.setUint8(offset, 0xc4);
				view.setUint8(offset + 1, length);
				(new Uint8Array(view.buffer)).set(new Uint8Array(value), offset + 2);
				return 2 + length;
			}

			// bin16
			if (length < 0x10000) {
				view.setUint8(offset, 0xc5);
				view.setUint16(offset + 1, length);
				(new Uint8Array(view.buffer)).set(new Uint8Array(value), offset + 3);
				return 3 + length;
			}

			// bin 32
			if (length < 0x100000000) {
				view.setUint8(offset, 0xc6);
				view.setUint32(offset + 1, length);
				(new Uint8Array(view.buffer)).set(new Uint8Array(value), offset + 5);
				return 5 + length;
			}
		}

		if (type === "number") {

			// Floating Point
			// NOTE: We're always using float64
			if (Math.floor(value) !== value) {
				view.setUint8(offset, 0xcb);
				view.setFloat64(offset + 1, value);
				return 9;
			}

			// Integers
			if (value >= 0) {
				// positive fixnum
				if (value < 0x80) {
					view.setUint8(offset, value);
					return 1;
				}
				// uint 8
				if (value < 0x100) {
					view.setUint8(offset, 0xcc);
					view.setUint8(offset + 1, value);
					return 2;
				}
				// uint 16
				if (value < 0x10000) {
					view.setUint8(offset, 0xcd);
					view.setUint16(offset + 1, value);
					return 3;
				}
				// uint 32
				if (value < 0x100000000) {
					view.setUint8(offset, 0xce);
					view.setUint32(offset + 1, value);
					return 5;
				}
				// uint 64
				if (value < 0x10000000000000000) {
					view.setUint8(offset, 0xcf);
					setUint64(view, offset + 1, value);
					return 9;
				}
				throw new Error("Number too big 0x" + value.toString(16));
			}

			// negative fixnum
			if (value >= -0x20) {
				view.setInt8(offset, value);
				return 1;
			}
			// int 8
			if (value >= -0x80) {
				view.setUint8(offset, 0xd0);
				view.setInt8(offset + 1, value);
				return 2;
			}
			// int 16
			if (value >= -0x8000) {
				view.setUint8(offset, 0xd1);
				view.setInt16(offset + 1, value);
				return 3;
			}
			// int 32
			if (value >= -0x80000000) {
				view.setUint8(offset, 0xd2);
				view.setInt32(offset + 1, value);
				return 5;
			}
			// int 64
			if (value >= -0x8000000000000000) {
				view.setUint8(offset, 0xd3);
				setInt64(view, offset + 1, value);
				return 9;
			}
			throw new Error("Number too small -0x" + (-value).toString(16).substr(1));
		}

		// undefined - use d4 (NON-STANDARD)
		if (type === "undefined") {
			if(sparse) return 0;
			view.setUint8(offset, 0xd4);
			view.setUint8(offset + 1, 0x00);
			view.setUint8(offset + 2, 0x00);
			return 3;
		}

		// null
		if (value === null) {
			if(sparse) return 0;
			view.setUint8(offset, 0xc0);
			return 1;
		}

		// Boolean
		if (type === "boolean") {
			view.setUint8(offset, value ? 0xc3 : 0xc2);
			return 1;
		}

		if('function' === typeof value.toJSON)
			return encode(value.toJSON(), view, offset, sparse);

		// Container Types
		if (type === "object") {
			var length, size = 0;
			var isArray = Array.isArray(value);

			if (isArray) {
				length = value.length;
			} else {
				var keys = encodeableKeys(value, sparse);
				length = keys.length;
			}

			var size;
			if (length < 0x10) {
				view.setUint8(offset, length | ( isArray ? 0x90 : 0x80));
				size = 1;
			} else if (length < 0x10000) {
				view.setUint8(offset, isArray ? 0xdc : 0xde);
				view.setUint16(offset + 1, length);
				size = 3;
			} else if (length < 0x100000000) {
				view.setUint8(offset, isArray ? 0xdd : 0xdf);
				view.setUint32(offset + 1, length);
				size = 5;
			}

			if (isArray) {
				for (var i = 0; i < length; i++) {
					size += encode(value[i], view, offset + size, sparse);
				}
			} else {
				for (var i = 0; i < length; i++) {
					var key = keys[i];
					size += encode(key, view, offset + size);
					size += encode(value[key], view, offset + size, sparse);
				}
			}

			return size;
		}
		if(type === "function")
			return 0;

		throw new Error("Unknown type " + type);
	}

	function sizeof(value, sparse) {
		var type = typeof value;

		// fixstr or str8 or str16 or str32
		if (type === "string") {
			var length = utf8ByteCount(value);
			if (length < 0x20) {
				return 1 + length;
			}
			if (length < 0x100) {
				return 2 + length;
			}
			if (length < 0x10000) {
				return 3 + length;
			}
			if (length < 0x100000000) {
				return 5 + length;
			}
		}

		if(ArrayBuffer.isView && ArrayBuffer.isView(value)) {
			// extract the arraybuffer and fallthrough
			value = value.buffer;
		}

		// bin8 or bin16 or bin32
		if (value instanceof ArrayBuffer) {
			var length = value.byteLength;
			if (length < 0x100) {
				return 2 + length;
			}
			if (length < 0x10000) {
				return 3 + length;
			}
			if (length < 0x100000000) {
				return 5 + length;
			}
		}

		if (type === "number") {
			// Floating Point (32 bits)
			// double
			if (Math.floor(value) !== value)
				return 9;

			// Integers
			if (value >= 0) {
				// positive fixint
				if (value < 0x80)
					return 1;
				// uint 8
				if (value < 0x100)
					return 2;
				// uint 16
				if (value < 0x10000)
					return 3;
				// uint 32
				if (value < 0x100000000)
					return 5;
				// uint 64
				if (value < 0x10000000000000000)
					return 9;
				// Too big
				throw new Error("Number too big 0x" + value.toString(16));
			}
			// negative fixint
			if (value >= -0x20)
				return 1;
			// int 8
			if (value >= -0x80)
				return 2;
			// int 16
			if (value >= -0x8000)
				return 3;
			// int 32
			if (value >= -0x80000000)
				return 5;
			// int 64
			if (value >= -0x8000000000000000)
				return 9;
			// Too small
			throw new Error("Number too small -0x" + value.toString(16).substr(1));
		}

		// Boolean
		if (type === "boolean") return 1;

		// undefined, null
		if (value === null) return sparse ? 0 : 1;
		if (value === undefined) return sparse ? 0 : 3;

		if('function' === typeof value.toJSON)
			return sizeof(value.toJSON(), sparse);

		// Container Types
		if (type === "object") {
			var length, size = 0;
			if (Array.isArray(value)) {
				length = value.length;
				for (var i = 0; i < length; i++) {
					size += sizeof(value[i], sparse);
				}
			} else {
				var keys = encodeableKeys(value, sparse)
				length = keys.length;
				for (var i = 0; i < length; i++) {
					var key = keys[i];
					size += sizeof(key) + sizeof(value[key], sparse);
				}
			}
			if (length < 0x10) {
				return 1 + size;
			}
			if (length < 0x10000) {
				return 3 + size;
			}
			if (length < 0x100000000) {
				return 5 + size;
			}
			throw new Error("Array or object too long 0x" + length.toString(16));
		}
		if(type === "function")
			return 0;

		throw new Error("Unknown type " + type);
	}

	return exports;
})();

/* harmony default export */ __webpack_exports__["a"] = (msgpack);


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _types_protocolmessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _util_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _protocol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var _util_defaults__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);
/* harmony import */ var _util_eventemitter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _messagequeue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(26);
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(0);
/* harmony import */ var _client_connectionstatechange__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(21);
/* harmony import */ var _transport_connectionerror__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(13);
/* harmony import */ var _types_errorinfo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2);
/* harmony import */ var _client_auth__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(14);
/* harmony import */ var platform_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(6);
/* harmony import */ var _types_message__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9);
/* harmony import */ var _util_multicaster__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(22);
/* harmony import */ var _util_errorreporter__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(23);
/* harmony import */ var platform_webstorage__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(16);
/* harmony import */ var platform_transports__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(41);
/* harmony import */ var _websockettransport__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(40);




















var ConnectionManager = (function() {
	var haveWebStorage = !!(typeof(platform_webstorage__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"]) !== 'undefined' && platform_webstorage__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].get);
	var haveSessionStorage = !!(typeof(platform_webstorage__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"]) !== 'undefined' && platform_webstorage__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].getSession);
	var actions = _types_protocolmessage__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].Action;
	var PendingMessage = _protocol__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].PendingMessage;
	var noop = function() {};
	var transportPreferenceOrder = _util_defaults__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].transportPreferenceOrder;
	var optimalTransport = transportPreferenceOrder[transportPreferenceOrder.length - 1];
	var transportPreferenceName = 'ably-transport-preference';

	var sessionRecoveryName = 'ably-connection-recovery';
	function getSessionRecoverData() {
		return haveSessionStorage && platform_webstorage__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].getSession(sessionRecoveryName);
	}
	function setSessionRecoverData(value) {
		return haveSessionStorage && platform_webstorage__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].setSession(sessionRecoveryName, value);
	}
	function clearSessionRecoverData() {
		return haveSessionStorage && platform_webstorage__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].removeSession(sessionRecoveryName);
	}

	function betterTransportThan(a, b) {
		return _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrIndexOf(transportPreferenceOrder, a.shortName) >
		   _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrIndexOf(transportPreferenceOrder, b.shortName);
	}

	function TransportParams(options, host, mode, connectionKey) {
		this.options = options;
		this.host = host;
		this.mode = mode;
		this.connectionKey = connectionKey;
		this.format = options.useBinaryProtocol ? 'msgpack' : 'json';

		this.connectionSerial = undefined;
		this.timeSerial = undefined;
	}

	TransportParams.prototype.getConnectParams = function(authParams) {
		var params = authParams ? _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].copy(authParams) : {};
		var options = this.options;
		switch(this.mode) {
			case 'upgrade':
				params.upgrade = this.connectionKey;
				break;
			case 'resume':
				params.resume = this.connectionKey;
				if(this.timeSerial !== undefined) {
					params.timeSerial = this.timeSerial;
				} else if(this.connectionSerial !== undefined) {
					params.connectionSerial = this.connectionSerial;
				}
				break;
			case 'recover':
				var match = options.recover.split(':');
				if(match) {
					params.recover = match[0];
					var recoverSerial = match[1];
					if(isNaN(recoverSerial)) {
						params.timeSerial = recoverSerial;
					} else {
						params.connectionSerial = recoverSerial;
					}
				}
				break;
			default:
		}
		if(options.clientId !== undefined) {
			params.clientId = options.clientId;
		}
		if(options.echoMessages === false) {
			params.echo = 'false';
		}
		if(this.format !== undefined) {
			params.format = this.format;
		}
		if(this.stream !== undefined) {
			params.stream = this.stream;
		}
		if(this.heartbeats !== undefined) {
			params.heartbeats = this.heartbeats;
		}
		params.v = _util_defaults__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].apiVersion;
		params.lib = _util_defaults__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].libstring;
		if(options.transportParams !== undefined) {
			_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].mixin(params, options.transportParams);
		}
		return params;
	};

	TransportParams.prototype.toString = function() {
		var result = '[mode=' + this.mode;
		if(this.host) { result += (',host=' + this.host); }
		if(this.connectionKey) { result += (',connectionKey=' + this.connectionKey); }
		if(this.connectionSerial !== undefined) { result += (',connectionSerial=' + this.connectionSerial); }
		if(this.timeSerial) { result += (',timeSerial=' + this.timeSerial); }
		if(this.format) { result += (',format=' + this.format); }
		result += ']';

		return result;
	};

	/* public constructor */
	function ConnectionManager(realtime, options) {
		_util_eventemitter__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].call(this);
		this.realtime = realtime;
		this.options = options;
		var timeouts = options.timeouts;
		var self = this;
		/* connectingTimeout: leave preferenceConnectTimeout (~6s) to try the
		 * preference transport, then realtimeRequestTimeout (~10s) to establish
		 * the base transport in case that fails */
		var connectingTimeout = timeouts.preferenceConnectTimeout + timeouts.realtimeRequestTimeout;
		this.states = {
			initialized:   {state: 'initialized',   terminal: false, queueEvents: true,  sendEvents: false, failState: 'disconnected'},
			connecting:    {state: 'connecting',    terminal: false, queueEvents: true,  sendEvents: false, retryDelay: connectingTimeout, failState: 'disconnected'},
			connected:     {state: 'connected',     terminal: false, queueEvents: false, sendEvents: true,  failState: 'disconnected'},
			synchronizing: {state: 'connected',     terminal: false, queueEvents: true,  sendEvents: false, forceQueueEvents: true, failState: 'disconnected'},
			disconnected:  {state: 'disconnected',  terminal: false, queueEvents: true,  sendEvents: false, retryDelay: timeouts.disconnectedRetryTimeout, failState: 'disconnected'},
			suspended:     {state: 'suspended',     terminal: false, queueEvents: false, sendEvents: false, retryDelay: timeouts.suspendedRetryTimeout, failState: 'suspended'},
			closing:       {state: 'closing',       terminal: false, queueEvents: false, sendEvents: false, retryDelay: timeouts.realtimeRequestTimeout, failState: 'closed'},
			closed:        {state: 'closed',        terminal: true,  queueEvents: false, sendEvents: false, failState: 'closed'},
			failed:        {state: 'failed',        terminal: true,  queueEvents: false, sendEvents: false, failState: 'failed'}
		};
		this.state = this.states.initialized;
		this.errorReason = null;

		this.queuedMessages = new _messagequeue__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]();
		this.msgSerial = 0;
		this.connectionDetails = undefined;
		this.connectionId = undefined;
		this.connectionKey = undefined;
		this.timeSerial = undefined;
		this.connectionSerial = undefined;
		this.connectionStateTtl = timeouts.connectionStateTtl;
		this.maxIdleInterval = null;

		this.transports = _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].intersect((options.transports || _util_defaults__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].defaultTransports), ConnectionManager.supportedTransports);
		/* baseTransports selects the leftmost transport in the Defaults.baseTransportOrder list
		* that's both requested and supported. Normally this will be xhr_polling;
		* if xhr isn't supported it will be jsonp. If the user has forced a
		* transport, it'll just be that one. */
		this.baseTransport = _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].intersect(_util_defaults__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].baseTransportOrder, this.transports)[0];
		this.upgradeTransports = _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].intersect(this.transports, _util_defaults__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].upgradeTransports);
		this.transportPreference = null;

		this.httpHosts = _util_defaults__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].getHosts(options);
		this.activeProtocol = null;
		this.proposedTransports = [];
		this.pendingTransports = [];
		this.host = null;
		this.lastAutoReconnectAttempt = null;
		this.lastActivity = null;
		this.mostRecentMsg = null;
		this.forceFallbackHost = false;
		this.connectCounter = 0;

		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'Realtime.ConnectionManager()', 'started');
		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'Realtime.ConnectionManager()', 'requested transports = [' + (options.transports || _util_defaults__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].defaultTransports) + ']');
		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'Realtime.ConnectionManager()', 'available transports = [' + this.transports + ']');
		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'Realtime.ConnectionManager()', 'http hosts = [' + this.httpHosts + ']');

		if(!this.transports.length) {
			var msg = 'no requested transports available';
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_ERROR, 'realtime.ConnectionManager()', msg);
			throw new Error(msg);
		}

		var addEventListener = platform__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].addEventListener;
		if(addEventListener) {
			/* intercept close event in browser to persist connection id if requested */
			if(haveSessionStorage && typeof options.recover === 'function') {
				/* Usually can't use bind as not supported in IE8, but IE doesn't support sessionStorage, so... */
				addEventListener('beforeunload', this.persistConnection.bind(this));
			}

			if(options.closeOnUnload === true) {
				addEventListener('beforeunload', function() {
					_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MAJOR, 'Realtime.ConnectionManager()', 'beforeunload event has triggered the connection to close as closeOnUnload is true');
					self.requestState({state: 'closing'});
				});
			}

			/* Listen for online and offline events */
			addEventListener('online', function() {
				if(self.state == self.states.disconnected || self.state == self.states.suspended) {
					_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager caught browser ‘online’ event', 'reattempting connection');
					self.requestState({state: 'connecting'});
				}
			});
			addEventListener('offline', function() {
				if(self.state == self.states.connected) {
					_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager caught browser ‘offline’ event', 'disconnecting active transport');
					// Not sufficient to just go to the 'disconnected' state, want to
					// force all transports to reattempt the connection. Will immediately
					// retry.
					self.disconnectAllTransports();
				}
			});
		}
	}
	_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].inherits(ConnectionManager, _util_eventemitter__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]);

	/*********************
	 * transport management
	 *********************/

	ConnectionManager.supportedTransports = {};

	Object(_websockettransport__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"])(ConnectionManager);
	_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrForEach(platform_transports__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"], function (initFn) {
		initFn(ConnectionManager);
	});

	ConnectionManager.prototype.createTransportParams = function(host, mode) {
		var params = new TransportParams(this.options, host, mode, this.connectionKey);
		if(this.timeSerial) {
			params.timeSerial = this.timeSerial;
		} else if(this.connectionSerial !== undefined) {
			params.connectionSerial = this.connectionSerial;
		}
		return params;
	};

	ConnectionManager.prototype.getTransportParams = function(callback) {
		var self = this;

		function decideMode(modeCb) {
			if(self.connectionKey) {
				modeCb('resume');
				return;
			}

			if(typeof self.options.recover === 'string') {
				modeCb('recover');
				return;
			}

			var recoverFn = self.options.recover,
				lastSessionData = getSessionRecoverData();
			if(lastSessionData && typeof(recoverFn) === 'function') {
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.getTransportParams()', 'Calling clientOptions-provided recover function with last session data');
				recoverFn(lastSessionData, function(shouldRecover) {
					if(shouldRecover) {
						self.options.recover = lastSessionData.recoveryKey;
						modeCb('recover');
					} else {
						modeCb('clean');
					}
				});
				return;
			}
			modeCb('clean');
		}

		decideMode(function(mode) {
			var transportParams = self.createTransportParams(null, mode);
			if(mode === 'recover') {
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.getTransportParams()', 'Transport recovery mode = recover; recoveryKey = ' + self.options.recover);
				var match = self.options.recover.split(':');
				if(match && match[2]) {
					self.msgSerial = match[2];
				}
			} else {
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.getTransportParams()', 'Transport params = ' + transportParams.toString());
			}
			callback(transportParams);
		});
	};

	/**
	 * Attempt to connect using a given transport
	 * @param transportParams
	 * @param candidate, the transport to try
	 * @param callback
	 */
	ConnectionManager.prototype.tryATransport = function(transportParams, candidate, callback) {
		var self = this, host = transportParams.host;
		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.tryATransport()', 'trying ' + candidate);
		(ConnectionManager.supportedTransports[candidate]).tryConnect(this, this.realtime.auth, transportParams, function(wrappedErr, transport) {
			var state = self.state;
			if(state == self.states.closing || state == self.states.closed || state == self.states.failed) {
				if(transport) {
					_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.tryATransport()', 'connection ' + state.state + ' while we were attempting the transport; closing ' + transport);
					transport.close();
				}
				callback(true);
				return;
			}

			if(wrappedErr) {
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.tryATransport()', 'transport ' + candidate + ' ' + wrappedErr.event + ', err: ' + wrappedErr.error.toString());

				/* Comet transport onconnect token errors can be dealt with here.
				* Websocket ones only happen after the transport claims to be viable,
				* so are dealt with as non-onconnect token errors */
				if(_client_auth__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].isTokenErr(wrappedErr.error) && !(self.errorReason && _client_auth__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].isTokenErr(self.errorReason))) {
					self.errorReason = wrappedErr.error;
					/* re-get a token and try again */
					self.realtime.auth._forceNewToken(null, null, function(err) {
						if(err) {
							self.actOnErrorFromAuthorize(err);
							return;
						}
						self.tryATransport(transportParams, candidate, callback);
					});
				} else if(wrappedErr.event === 'failed') {
					/* Error that's fatal to the connection */
					self.notifyState({state: 'failed', error: wrappedErr.error});
					callback(true);
				} else if(wrappedErr.event === 'disconnected') {
					/* Error with that transport only */
					callback(false);
				}
				return;
			}

			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.tryATransport()', 'viable transport ' + candidate + '; setting pending');
			self.setTransportPending(transport, transportParams);
			callback(null, transport);
		});
	};


	/**
	 * Called when a transport is indicated to be viable, and the connectionmanager
	 * expects to activate this transport as soon as it is connected.
	 * @param host
	 * @param transportParams
	 */
	ConnectionManager.prototype.setTransportPending = function(transport, transportParams) {
		var mode = transportParams.mode;
		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.setTransportPending()', 'transport = ' + transport + '; mode = ' + mode);

		_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrDeleteValue(this.proposedTransports, transport);
		this.pendingTransports.push(transport);

		var self = this;
		transport.once('connected', function(error, connectionId, connectionDetails, connectionPosition) {
			if(mode == 'upgrade' && self.activeProtocol) {
				/*  if ws and xhrs are connecting in parallel, delay xhrs activation to let ws go ahead */
				if(transport.shortName !== optimalTransport && _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrIn(self.getUpgradePossibilities(), optimalTransport)) {
					setTimeout(function() {
						self.scheduleTransportActivation(error, transport, connectionId, connectionDetails, connectionPosition);
					}, self.options.timeouts.parallelUpgradeDelay);
				} else {
					self.scheduleTransportActivation(error, transport, connectionId, connectionDetails, connectionPosition);
				}
			} else {
				self.activateTransport(error, transport, connectionId, connectionDetails, connectionPosition);

				/* allow connectImpl to start the upgrade process if needed, but allow
				 * other event handlers, including activating the transport, to run first */
				_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].nextTick(function() {
					self.connectImpl(transportParams);
				});
			}

			if(mode === 'recover' && self.options.recover) {
				/* After a successful recovery, we unpersist, as a recovery key cannot
				* be used more than once */
				self.options.recover = null;
				self.unpersistConnection();
			}
		});

		transport.on(['disconnected', 'closed', 'failed'], function(error) {
			self.deactivateTransport(transport, this.event, error);
		});

		this.emit('transport.pending', transport);
	};

	/**
	 * Called when an upgrade transport is connected,
	 * to schedule the activation of that transport.
	 * @param error
	 * @param transport
	 * @param connectionId
	 * @param connectionDetails
	 * @param connectedMessage
	 */
	ConnectionManager.prototype.scheduleTransportActivation = function(error, transport, connectionId, connectionDetails, upgradeConnectionPosition) {
		var self = this,
			currentTransport = this.activeProtocol && this.activeProtocol.getTransport(),
			abandon = function() {
				transport.disconnect();
				_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrDeleteValue(self.pendingTransports, transport);
			};

		if(this.state !== this.states.connected && this.state !== this.states.connecting) {
			/* This is most likely to happen for the delayed xhrs, when xhrs and ws are scheduled in parallel*/
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.scheduleTransportActivation()', 'Current connection state (' + this.state.state + (this.state === this.states.synchronizing ? ', but with an upgrade already in progress' : '') + ') is not valid to upgrade in; abandoning upgrade to ' + transport.shortName);
			abandon();
			return;
		}

		if(currentTransport && !betterTransportThan(transport, currentTransport)) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.scheduleTransportActivation()', 'Proposed transport ' + transport.shortName + ' is no better than current active transport ' + currentTransport.shortName + ' - abandoning upgrade');
			abandon();
			return;
		}

		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.scheduleTransportActivation()', 'Scheduling transport upgrade; transport = ' + transport);

		this.realtime.channels.onceNopending(function(err) {
			var oldProtocol;
			if(err) {
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_ERROR, 'ConnectionManager.scheduleTransportActivation()', 'Unable to activate transport; transport = ' + transport + '; err = ' + err);
				return;
			}

			if(!transport.isConnected) {
				/* This is only possible if the xhr streaming transport was disconnected during the parallelUpgradeDelay */
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.scheduleTransportActivation()', 'Proposed transport ' + transport.shortName + 'is no longer connected; abandoning upgrade');
				abandon();
				return;
			}

			if(self.state === self.states.connected) {
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.scheduleTransportActivation()', 'Currently connected, so temporarily pausing events until the upgrade is complete');
				self.state = self.states.synchronizing;
				oldProtocol = self.activeProtocol;
			} else if(self.state !== self.states.connecting) {
				/* Note: upgrading from the connecting state is valid if the old active
				* transport was deactivated after the upgrade transport first connected;
				* see logic in deactivateTransport */
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.scheduleTransportActivation()', 'Current connection state (' + self.state.state + (self.state === self.states.synchronizing ? ', but with an upgrade already in progress' : '') + ') is not valid to upgrade in; abandoning upgrade to ' + transport.shortName);
				abandon();
				return;
			}

			/* If the connectionId has changed, the upgrade hasn't worked. But as
			* it's still an upgrade, realtime still expects a sync - it just needs to
			* be a sync with the new connection position. (And it
			* needs to be set in the library, which is done by activateTransport). */
			var connectionReset = connectionId !== self.connectionId,
				syncPosition = connectionReset ? upgradeConnectionPosition : self;

			if(connectionReset) {
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_ERROR, 'ConnectionManager.scheduleTransportActivation()', 'Upgrade resulted in new connectionId; resetting library connection position from ' + (self.timeSerial || self.connectionSerial) + ' to ' + (syncPosition.timeSerial || syncPosition.connectionSerial) + '; upgrade error was ' + error);
			}

			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.scheduleTransportActivation()', 'Syncing transport; transport = ' + transport);
			self.sync(transport, syncPosition, function(syncErr, connectionId, postSyncPosition) {
				/* If there's been some problem with syncing (and the connection hasn't
				 * closed or something in the meantime), we have a problem -- we can't
				 * just fall back on the old transport, as we don't know whether
				 * realtime got the sync -- if it did, the old transport is no longer
				 * valid. To be safe, we disconnect both and start again from scratch. */
				if(syncErr) {
					if(self.state === self.states.synchronizing) {
						_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_ERROR, 'ConnectionManager.scheduleTransportActivation()', 'Unexpected error attempting to sync transport; transport = ' + transport + '; err = ' + syncErr);
						self.disconnectAllTransports();
					}
					return;
				}
				var finishUpgrade = function() {
					_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.scheduleTransportActivation()', 'Activating transport; transport = ' + transport);
					self.activateTransport(error, transport, connectionId, connectionDetails, postSyncPosition);
					/* Restore pre-sync state. If state has changed in the meantime,
					 * don't touch it -- since the websocket transport waits a tick before
					 * disposing itself, it's possible for it to have happily synced
					 * without err while, unknown to it, the connection has closed in the
					 * meantime and the ws transport is scheduled for death */
					if(self.state === self.states.synchronizing) {
						_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.scheduleTransportActivation()', 'Pre-upgrade protocol idle, sending queued messages on upgraded transport; transport = ' + transport);
						self.state = self.states.connected;
					} else {
						_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.scheduleTransportActivation()', 'Pre-upgrade protocol idle, but state is now ' + self.state.state + ', so leaving unchanged');
					}
					if(self.state.sendEvents) {
						self.sendQueuedMessages();
					}
				};

				/* Wait until sync is done and old transport is idle before activating new transport. This
				 * guarantees that messages arrive at realtime in the same order they are sent.
				 *
				 * If a message times out on the old transport, since it's still the active transport the
				 * message will be requeued. deactivateTransport will see the pending transport and notify
				 * the `connecting` state without starting a new connection, so the new transport can take
				 * over once deactivateTransport clears the old protocol's queue.
				 *
				 * If there is no old protocol, that meant that we weren't in the connected state at the
				 * beginning of the sync - likely the base transport died just before the sync. So can just
				 * finish the upgrade. If we're actually in closing/failed rather than connecting, that's
				 * fine, activatetransport will deal with that. */
				if(oldProtocol) {
				 /* Most of the time this will be already true: the new-transport sync will have given
				 * enough time for in-flight messages on the old transport to complete. */
					oldProtocol.onceIdle(finishUpgrade);
				} else {
					finishUpgrade();
				}
			});
		});
	};

	/**
	 * Called when a transport is connected, and the connectionmanager decides that
	 * it will now be the active transport. Returns whether or not it activated
	 * the transport (if the connection is closing/closed it will choose not to).
	 * @param transport the transport instance
	 * @param connectionId the id of the new active connection
	 * @param connectionDetails the details of the new active connection
	 * @param connectionPosition the position at the point activation; either {connectionSerial: <serial>} or {timeSerial: <serial>}
	 */
	ConnectionManager.prototype.activateTransport = function(error, transport, connectionId, connectionDetails, connectionPosition) {
		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.activateTransport()', 'transport = ' + transport);
		if(error) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_ERROR, 'ConnectionManager.activateTransport()', 'error = ' + error);
		}
		if(connectionId) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.activateTransport()', 'connectionId =  ' + connectionId);
		}
		if(connectionDetails) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.activateTransport()', 'connectionDetails =  ' + JSON.stringify(connectionDetails));
		}
		if(connectionPosition) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.activateTransport()', 'serial =  ' + (connectionPosition.timeSerial || connectionPosition.connectionSerial));
		}

		this.persistTransportPreference(transport);

		/* if the connectionmanager moved to the closing/closed state before this
		 * connection event, then we won't activate this transport */
		var existingState = this.state,
			connectedState = this.states.connected.state;
		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.activateTransport()', 'current state = ' + existingState.state);
		if(existingState.state == this.states.closing.state || existingState.state == this.states.closed.state || existingState.state == this.states.failed.state) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.activateTransport()', 'Disconnecting transport and abandoning');
			transport.disconnect();
			return false;
		}

		/* remove this transport from pending transports */
		_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrDeleteValue(this.pendingTransports, transport);

		/* if the transport is not connected (eg because it failed during a
		 * scheduleTransportActivation#onceNoPending wait) then don't activate it */
		if(!transport.isConnected) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.activateTransport()', 'Declining to activate transport ' + transport + ' since it appears to no longer be connected');
			return false;
		}

		/* the given transport is connected; this will immediately
		 * take over as the active transport */
		var existingActiveProtocol = this.activeProtocol;
		this.activeProtocol = new _protocol__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"](transport);
		this.host = transport.params.host;

		var connectionKey = connectionDetails.connectionKey;
		if(connectionKey && this.connectionKey != connectionKey)  {
			this.setConnection(connectionId, connectionDetails, connectionPosition, !!error);
		}

		/* Rebroadcast any new connectionDetails from the active transport, which
		 * can come at any time (eg following a reauth), and emit an RTN24 UPDATE
		 * event. (Listener added on nextTick because we're in a transport.on('connected')
		 * callback at the moment; if we add it now we'll be adding it to the end
		 * of the listeners array and it'll be called immediately) */
		this.onConnectionDetailsUpdate(connectionDetails, transport);
		var self = this;
		_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].nextTick(function() {
			transport.on('connected', function(connectedErr, _connectionId, connectionDetails) {
				self.onConnectionDetailsUpdate(connectionDetails, transport);
				self.emit('update', new _client_connectionstatechange__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"](connectedState, connectedState, null, connectedErr));
			});
		})

		/* If previously not connected, notify the state change (including any
		 * error). */
		if(existingState.state === this.states.connected.state) {
			if(error) {
				/* if upgrading without error, leave any existing errorReason alone */
				this.errorReason = this.realtime.connection.errorReason = error;
				/* Only bother emitting an upgrade if there's an error; otherwise it's
				 * just a transport upgrade, so auth details won't have changed */
				this.emit('update', new _client_connectionstatechange__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"](connectedState, connectedState, null, error));
			}
		} else {
			this.notifyState({state: 'connected', error: error});
			this.errorReason = this.realtime.connection.errorReason = error || null;
		}

		/* Send after the connection state update, as Channels hooks into this to
		 * resend attaches on a new transport if necessary */
		this.emit('transport.active', transport);

		/* Gracefully terminate existing protocol */
		if(existingActiveProtocol) {
			if(existingActiveProtocol.messageQueue.count() > 0) {
				/* We could just requeue pending messages on the new transport, but
				 * actually this should never happen: transports should only take over
				 * from other active transports when upgrading, and upgrading waits for
				 * the old transport to be idle. So log an error. */
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_ERROR, 'ConnectionManager.activateTransport()', 'Previous active protocol (for transport ' + existingActiveProtocol.transport.shortName + ', new one is ' + transport.shortName + ') finishing with ' + existingActiveProtocol.messageQueue.count() + ' messages still pending');
			}
			if(existingActiveProtocol.transport === transport) {
				var msg = 'Assumption violated: activating a transport that was also the transport for the previous active protocol; transport = ' + transport.shortName + '; stack = ' + new Error().stack;
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_ERROR, 'ConnectionManager.activateTransport()', msg);
				_util_errorreporter__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"].report('error', msg, 'transport-previously-active');
			} else {
				existingActiveProtocol.finish();
			}
		}

		/* Terminate any other pending transport(s), and
		 * abort any not-yet-pending transport attempts */
		_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].safeArrForEach(this.pendingTransports, function(pendingTransport) {
			if(pendingTransport === transport) {
				var msg = 'Assumption violated: activating a transport that is still marked as a pending transport; transport = ' + transport.shortName + '; stack = ' + new Error().stack;
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_ERROR, 'ConnectionManager.activateTransport()', msg);
				_util_errorreporter__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"].report('error', msg, 'transport-activating-pending');
				_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrDeleteValue(self.pendingTransports, transport);
			} else {
				pendingTransport.disconnect();
			}
		});
		_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].safeArrForEach(this.proposedTransports, function(proposedTransport) {
			if(proposedTransport === transport) {
				var msg = 'Assumption violated: activating a transport that is still marked as a proposed transport; transport = ' + transport.shortName + '; stack = ' + new Error().stack;
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_ERROR, 'ConnectionManager.activateTransport()', msg);
				_util_errorreporter__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"].report('error', msg, 'transport-activating-proposed');
				_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrDeleteValue(self.proposedTransports, transport);
			} else {
				proposedTransport.dispose();
			}
		});

		return true;
	};

	/**
	 * Called when a transport is no longer the active transport. This can occur
	 * in any transport connection state.
	 * @param transport
	 */
	ConnectionManager.prototype.deactivateTransport = function(transport, state, error) {
		var currentProtocol = this.activeProtocol,
			wasActive = currentProtocol && currentProtocol.getTransport() === transport,
			wasPending = _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrDeleteValue(this.pendingTransports, transport),
			wasProposed = _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrDeleteValue(this.proposedTransports, transport),
			noTransportsScheduledForActivation = this.noTransportsScheduledForActivation();

		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.deactivateTransport()', 'transport = ' + transport);
		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.deactivateTransport()', 'state = ' + state + (wasActive ? '; was active' : wasPending ? '; was pending' : wasProposed ? '; was proposed' : '') + (noTransportsScheduledForActivation ? '' : '; another transport is scheduled for activation'));
		if(error && error.message)
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.deactivateTransport()', 'reason =  ' + error.message);

		if(wasActive) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.deactivateTransport()', 'Getting, clearing, and requeuing ' + this.activeProtocol.messageQueue.count() + ' pending messages');
			this.queuePendingMessages(currentProtocol.getPendingMessages());
			/* Clear any messages we requeue to allow the protocol to become idle.
			 * In case of an upgrade, this will trigger an immediate activation of
			 * the upgrade transport, so delay a tick so this transport can finish
			 * deactivating */
			_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].nextTick(function() {
				currentProtocol.clearPendingMessages();
			});
			this.activeProtocol = this.host = null;
			clearTimeout(this.channelResumeCheckTimer);
		}

		this.emit('transport.inactive', transport);

		/* this transport state change is a state change for the connectionmanager if
		 * - the transport was the active transport and there are no transports
		 *   which are connected and scheduled for activation, just waiting for the
		 *   active transport to finish what its doing; or
		 * - the transport was the active transport and the error was fatal (so
		 *   unhealable by another transport); or
		 * - there is no active transport, and this is the last remaining
		 *   pending transport (so we were in the connecting state)
		 */
		if((wasActive && noTransportsScheduledForActivation) ||
			(wasActive && (state === 'failed') || (state === 'closed')) ||
			(currentProtocol === null && wasPending && this.pendingTransports.length === 0)) {

			/* If we're disconnected with a 5xx we need to try fallback hosts
			 * (RTN14d), but (a) due to how the upgrade sequence works, the
			 * host/transport selection sequence only cares about getting to
			 * `preconnect` (eg establishing a websocket) getting a `disconnected`
			 * protocol message afterwards is too late; and (b) host retry only
			 * applies to connectBase unless the stored preference transport doesn't
			 * work. We solve this by unpersisting the transport preference and
			 * setting an instance variable to force fallback hosts to be used (if
			 * any) here. Bit of a kludge, but no real better alternatives without
			 * rewriting the entire thing */
			if(state === 'disconnected' && error && error.statusCode > 500 && this.httpHosts.length > 1) {
				this.unpersistTransportPreference();
				this.forceFallbackHost = true;
				/* and try to connect again to try a fallback host without waiting for the usual 15s disconnectedRetryTimeout */
				this.notifyState({state: state, error: error, retryImmediately: true});
				return;
			}

			/* TODO remove below line once realtime sends token errors as DISCONNECTEDs */
			var newConnectionState = (state === 'failed' && _client_auth__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].isTokenErr(error)) ? 'disconnected' : state;
			this.notifyState({state: newConnectionState, error: error});
			return;
		}

		if(wasActive && (state === 'disconnected') && (this.state !== this.states.synchronizing)) {
			/* If we were active but there is another transport scheduled for
			* activation, go into to the connecting state until that transport
			* activates and sets us back to connected. (manually starting the
			* transition timers in case that never happens). (If we were in the
			* synchronizing state, then that's fine, the old transport just got its
			* disconnected before the new one got the sync -- ignore it and keep
			* waiting for the sync. If it fails we have a separate sync timer that
			* will expire). */
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.deactivateTransport()', 'wasActive but another transport is connected and scheduled for activation, so going into the connecting state until it activates');
			this.startSuspendTimer();
			this.startTransitionTimer(this.states.connecting);
			this.notifyState({state: 'connecting', error: error});
		}
	};

	/* Helper that returns true if there are no transports which are pending,
	* have been connected, and are just waiting for onceNoPending to fire before
	* being activated */
	ConnectionManager.prototype.noTransportsScheduledForActivation = function() {
		return _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].isEmpty(this.pendingTransports) ||
			this.pendingTransports.every(function(transport) {
				return !transport.isConnected;
			});
	};

	/**
	 * Called when activating a new transport, to ensure message delivery
	 * on the new transport synchronises with the messages already received
	 */
	ConnectionManager.prototype.sync = function(transport, requestedSyncPosition, callback) {
		var timeout = setTimeout(function () {
			transport.off('sync');
			callback(new _types_errorinfo__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"]('Timeout waiting for sync response', 50000, 500));
		}, this.options.timeouts.realtimeRequestTimeout);

		/* send sync request */
		var syncMessage = _types_protocolmessage__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].fromValues({
			action: actions.SYNC,
			connectionKey: this.connectionKey
		});

		if(requestedSyncPosition.timeSerial) {
			syncMessage.timeSerial = requestedSyncPosition.timeSerial;
		} else if(requestedSyncPosition.connectionSerial !== undefined) {
			syncMessage.connectionSerial = requestedSyncPosition.connectionSerial;
		}
		transport.send(syncMessage);

		transport.once('sync', function(connectionId, syncPosition) {
			clearTimeout(timeout);
			callback(null, connectionId, syncPosition);
		});
	};

	ConnectionManager.prototype.setConnection = function(connectionId, connectionDetails, connectionPosition, hasConnectionError) {
		/* if connectionKey changes but connectionId stays the same, then just a
		 * transport change on the same connection. If connectionId changes, we're
		 * on a new connection, with implications for msgSerial and channel state,
		 * and resetting the connectionSerial position */
		var self = this;
		/* If no previous connectionId, don't reset the msgSerial as it may have
		 * been set by recover data (unless the recover failed) */
		var prevConnId = this.connectionid,
			connIdChanged = prevConnId && (prevConnId !== connectionId),
			recoverFailure = !prevConnId && hasConnectionError;
		if(connIdChanged || recoverFailure)  {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.setConnection()', 'Resetting msgSerial');
			this.msgSerial = 0;
		}
		/* but do need to reattach channels, for channels that were previously in
		 * the attached state even though the connection mode was 'clean' due to a
		 * freshness check - see https://github.com/ably/ably-js/issues/394 */
		if(this.connectionId !== connectionId)  {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.setConnection()', 'New connectionId; reattaching any attached channels');
			/* Wait till next tick before reattaching channels, so that connection
			 * state will be updated and so that it will be applied after
			 * Channels#onTransportUpdate, else channels will not have an ATTACHED
			 * sent twice (once from this and once from that). */
			_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].nextTick(function() {
				self.realtime.channels.reattach();
			});
		} else if(this.options.checkChannelsOnResume) {
			/* For attached channels, set the attached msg indicator variable to false,
			 * wait 30s, and check we got an attached for each one.
			 * 30s was chosen to be 5s longer than the transport idle timeout expire
			 * time, in an attempt to avoid false positives due to a transport
			 * silently failing immediately after a resume */
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.setConnection()', 'Same connectionId; checkChannelsOnResume is enabled');
			clearTimeout(this.channelResumeCheckTimer);
			this.realtime.channels.resetAttachedMsgIndicators();
			this.channelResumeCheckTimer = setTimeout(function() {
				self.realtime.channels.checkAttachedMsgIndicators(connectionId);
			}, 30000);
		}
		this.realtime.connection.id = this.connectionId = connectionId;
		this.realtime.connection.key = this.connectionKey = connectionDetails.connectionKey;
		var forceResetMessageSerial = connIdChanged || !prevConnId;
		this.setConnectionSerial(connectionPosition, forceResetMessageSerial);
	};

	ConnectionManager.prototype.clearConnection = function() {
		this.realtime.connection.id = this.connectionId = undefined;
		this.realtime.connection.key = this.connectionKey = undefined;
		this.clearConnectionSerial();
		this.msgSerial = 0;
		this.unpersistConnection();
	};

	/* force: set the connectionSerial even if it's less than the current
	 * connectionSerial. Used for new connections.
	 * Returns true iff the message was rejected as a duplicate. */
	ConnectionManager.prototype.setConnectionSerial = function(connectionPosition, force) {
		var timeSerial = connectionPosition.timeSerial,
			connectionSerial = connectionPosition.connectionSerial;
		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.setConnectionSerial()', 'Updating connection serial; serial = ' + connectionSerial + '; timeSerial = ' + timeSerial + '; force = ' + force + '; previous = ' + this.connectionSerial);
		if(timeSerial !== undefined) {
			if(timeSerial <= this.timeSerial && !force) {
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_ERROR, 'ConnectionManager.setConnectionSerial()', 'received message with timeSerial ' + timeSerial + ', but current timeSerial is ' + this.timeSerial + '; assuming message is a duplicate and discarding it');
				return true;
			}
			this.realtime.connection.timeSerial = this.timeSerial = timeSerial;
			this.setRecoveryKey();
			return;
		}
		if(connectionSerial !== undefined) {
			if(connectionSerial <= this.connectionSerial && !force) {
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_ERROR, 'ConnectionManager.setConnectionSerial()', 'received message with connectionSerial ' + connectionSerial + ', but current connectionSerial is ' + this.connectionSerial + '; assuming message is a duplicate and discarding it');
				return true;
			}
			this.realtime.connection.serial = this.connectionSerial = connectionSerial;
			this.setRecoveryKey();
		}
	};

	ConnectionManager.prototype.clearConnectionSerial = function() {
		this.realtime.connection.serial = this.connectionSerial = undefined;
		this.realtime.connection.timeSerial = this.timeSerial = undefined;
		this.clearRecoveryKey();
	};

	ConnectionManager.prototype.setRecoveryKey = function() {
		this.realtime.connection.recoveryKey = this.connectionKey + ':' + (this.timeSerial || this.connectionSerial) + ':' + this.msgSerial;
	};

	ConnectionManager.prototype.clearRecoveryKey = function() {
		this.realtime.connection.recoveryKey = null;
	};

	ConnectionManager.prototype.checkConnectionStateFreshness = function() {
		if(!this.lastActivity || !this.connectionId) { return; }

		var sinceLast = _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].now() - this.lastActivity;
		if(sinceLast > this.connectionStateTtl + this.maxIdleInterval) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.checkConnectionStateFreshness()', 'Last known activity from realtime was ' + sinceLast + 'ms ago; discarding connection state');
			this.clearConnection();
			this.states.connecting.failState = 'suspended';
			this.states.connecting.queueEvents = false;
		}
	};

	/**
	 * Called when the connectionmanager wants to persist transport
	 * state for later recovery. Only applicable in the browser context.
	 */
	ConnectionManager.prototype.persistConnection = function() {
		if(haveSessionStorage) {
			var recoveryKey = this.realtime.connection.recoveryKey;
			if(recoveryKey) {
				setSessionRecoverData({
					recoveryKey: recoveryKey,
					disconnectedAt: _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].now(),
					location: global.location,
					clientId: this.realtime.auth.clientId
				}, this.connectionStateTtl);
			}
		}
	};

	/**
	 * Called when the connectionmanager wants to persist transport
	 * state for later recovery. Only applicable in the browser context.
	 */
	ConnectionManager.prototype.unpersistConnection = function() {
		clearSessionRecoverData();
	};

	/*********************
	 * state management
	 *********************/

	ConnectionManager.prototype.getError = function() {
		return this.errorReason || this.getStateError();
	};

	ConnectionManager.prototype.getStateError = function() {
		return _transport_connectionerror__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"][this.state.state];
	};

	ConnectionManager.prototype.activeState = function() {
		return this.state.queueEvents || this.state.sendEvents;
	};

	ConnectionManager.prototype.enactStateChange = function(stateChange) {
		var logLevel = stateChange.current === 'failed' ? _util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_ERROR : _util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MAJOR;
		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(logLevel, 'Connection state', stateChange.current + (stateChange.reason ? ('; reason: ' + stateChange.reason) : ''));
		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.enactStateChange', 'setting new state: ' + stateChange.current + '; reason = ' + (stateChange.reason && stateChange.reason.message));
		var newState = this.state = this.states[stateChange.current];
		if(stateChange.reason) {
			this.errorReason = stateChange.reason;
			this.realtime.connection.errorReason = stateChange.reason;
		}
		if(newState.terminal || newState.state === 'suspended') {
			/* suspended is nonterminal, but once in the suspended state, realtime
			 * will have discarded our connection state, so futher connection
			 * attempts should start from scratch */
			this.clearConnection();
		}
		this.emit('connectionstate', stateChange);
	};

	/****************************************
	 * ConnectionManager connection lifecycle
	 ****************************************/

	ConnectionManager.prototype.startTransitionTimer = function(transitionState) {
		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.startTransitionTimer()', 'transitionState: ' + transitionState.state);

		if(this.transitionTimer) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.startTransitionTimer()', 'clearing already-running timer');
			clearTimeout(this.transitionTimer);
		}

		var self = this;
		this.transitionTimer = setTimeout(function() {
			if(self.transitionTimer) {
				self.transitionTimer = null;
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager ' + transitionState.state + ' timer expired', 'requesting new state: ' + transitionState.failState);
				self.notifyState({state: transitionState.failState});
			}
		}, transitionState.retryDelay);
	};

	ConnectionManager.prototype.cancelTransitionTimer = function() {
		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.cancelTransitionTimer()', '');
		if(this.transitionTimer) {
			clearTimeout(this.transitionTimer);
			this.transitionTimer = null;
		}
	};

	ConnectionManager.prototype.startSuspendTimer = function() {
		var self = this;
		if(this.suspendTimer)
			return;
		this.suspendTimer = setTimeout(function() {
			if(self.suspendTimer) {
				self.suspendTimer = null;
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager suspend timer expired', 'requesting new state: suspended');
				self.states.connecting.failState = 'suspended';
				self.states.connecting.queueEvents = false;
				self.notifyState({state: 'suspended'});
			}
		}, this.connectionStateTtl);
	};

	ConnectionManager.prototype.checkSuspendTimer = function(state) {
		if(state !== 'disconnected' && state !== 'suspended' && state !== 'connecting')
			this.cancelSuspendTimer();
	};

	ConnectionManager.prototype.cancelSuspendTimer = function() {
		this.states.connecting.failState = 'disconnected';
		this.states.connecting.queueEvents = true;
		if(this.suspendTimer) {
			clearTimeout(this.suspendTimer);
			this.suspendTimer = null;
		}
	};

	ConnectionManager.prototype.startRetryTimer = function(interval) {
		var self = this;
		this.retryTimer = setTimeout(function() {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager retry timer expired', 'retrying');
			self.retryTimer = null;
			self.requestState({state: 'connecting'});
		}, interval);
	};

	ConnectionManager.prototype.cancelRetryTimer = function() {
		if(this.retryTimer) {
			clearTimeout(this.retryTimer);
			this.retryTimer = null;
		}
	};

	ConnectionManager.prototype.notifyState = function(indicated) {
		var state = indicated.state,
			self = this;

		/* We retry immediately if:
		 * - something disconnects us while we're connected, or
		 * - a viable (but not yet active) transport fails due to a token error (so
		 *   this.errorReason will be set, and startConnect will do a forced
		 *   authorize). If this.errorReason is already set (to a token error),
		 *   then there has been at least one previous attempt to connect that also
		 *   failed for a token error, so by RTN14b we go to DISCONNECTED and wait
		 *   before trying again */
		var retryImmediately = (state === 'disconnected' &&
			(this.state === this.states.connected     ||
			 this.state === this.states.synchronizing ||
			 indicated.retryImmediately               ||
				(this.state === this.states.connecting &&
					indicated.error && _client_auth__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].isTokenErr(indicated.error) &&
					!(this.errorReason && _client_auth__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].isTokenErr(this.errorReason)))));

		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.notifyState()', 'new state: ' + state + (retryImmediately ? '; will retry connection immediately' : ''));
		/* do nothing if we're already in the indicated state */
		if(state == this.state.state)
			return;

		/* kill timers (possibly excepting suspend timer depending on the notified
		* state), as these are superseded by this notification */
		this.cancelTransitionTimer();
		this.cancelRetryTimer();
		this.checkSuspendTimer(indicated.state);

		/* do nothing if we're unable to move from the current state */
		if(this.state.terminal)
			return;

		/* process new state */
		var newState = this.states[indicated.state],
			change = new _client_connectionstatechange__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"](this.state.state, newState.state, newState.retryDelay, (indicated.error || _transport_connectionerror__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"][newState.state]));

		if(retryImmediately) {
			var autoReconnect = function() {
				if(self.state === self.states.disconnected) {
					self.lastAutoReconnectAttempt = _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].now();
					self.requestState({state: 'connecting'});
				}
			};
			var sinceLast = this.lastAutoReconnectAttempt && (_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].now() - this.lastAutoReconnectAttempt + 1);
			if(sinceLast && (sinceLast < 1000)) {
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.notifyState()', 'Last reconnect attempt was only ' + sinceLast + 'ms ago, waiting another ' + (1000 - sinceLast) + 'ms before trying again');
				setTimeout(autoReconnect, 1000 - sinceLast);
			} else {
				_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].nextTick(autoReconnect);
			}
		} else if(state === 'disconnected' || state === 'suspended') {
			this.startRetryTimer(newState.retryDelay);
		}

		 /* If going into disconnect/suspended (and not retrying immediately), or a
			* terminal state, ensure there are no orphaned transports hanging around. */
		if((state === 'disconnected' && !retryImmediately) ||
			 (state === 'suspended') ||
			 newState.terminal) {
				 /* Wait till the next tick so the connection state change is enacted,
				 * so aborting transports doesn't trigger redundant state changes */
				 _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].nextTick(function() {
					 self.disconnectAllTransports();
				 });
		 }

		if(state == 'connected' && !this.activeProtocol) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_ERROR, 'ConnectionManager.notifyState()', 'Broken invariant: attempted to go into connected state, but there is no active protocol');
		}

		/* implement the change and notify */
		this.enactStateChange(change);
		if(this.state.sendEvents) {
			this.sendQueuedMessages();
		} else if(!this.state.queueEvents) {
			this.realtime.channels.propogateConnectionInterruption(state, change.reason);
			this.failQueuedMessages(change.reason); // RTN7c
		}
	};

	ConnectionManager.prototype.requestState = function(request) {
		var state = request.state, self = this;
		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.requestState()', 'requested state: ' + state + '; current state: ' + this.state.state);
		if(state == this.state.state)
			return; /* silently do nothing */

		/* kill running timers, as this request supersedes them */
		this.cancelTransitionTimer();
		this.cancelRetryTimer();
		/* for suspend timer check rather than cancel -- eg requesting a connecting
		* state should not reset the suspend timer */
		this.checkSuspendTimer(state);

		if(state == 'connecting' && this.state.state == 'connected') return;
		if(state == 'closing' && this.state.state == 'closed') return;

		var newState = this.states[state],
			change = new _client_connectionstatechange__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"](this.state.state, newState.state, null, (request.error || _transport_connectionerror__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"][newState.state]));

		this.enactStateChange(change);

		if(state == 'connecting') {
			_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].nextTick(function() { self.startConnect(); });
		}
		if(state == 'closing') {
			this.closeImpl();
		}
	};


	ConnectionManager.prototype.startConnect = function() {
		if(this.state !== this.states.connecting) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.startConnect()', 'Must be in connecting state to connect, but was ' + this.state.state);
			return;
		}

		var auth = this.realtime.auth,
			self = this;

		/* The point of the connectCounter mechanism is to ensure that the
		 * connection procedure can be cancelled. We want disconnectAllTransports
		 * to be able to stop any in-progress connection, even before it gets to
		 * the stage of having a pending (or even a proposed) transport that it can
		 * dispose() of. So we check that it's still current after any async stage,
		 * up until the stage that is synchronous with instantiating a transport */
		var connectCount = ++this.connectCounter;

		var connect = function() {
			self.checkConnectionStateFreshness();
			self.getTransportParams(function(transportParams) {
				if(connectCount !== self.connectCounter) {
					return;
				}
				self.connectImpl(transportParams, connectCount);
			});
		};

		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.startConnect()', 'starting connection');
		this.startSuspendTimer();
		this.startTransitionTimer(this.states.connecting);

		if(auth.method === 'basic') {
			connect();
		} else {
			var authCb = function(err) {
				if(connectCount !== self.connectCounter) {
					return;
				}
				if(err) {
					self.actOnErrorFromAuthorize(err);
				} else {
					connect();
				}
			};
			if(this.errorReason && _client_auth__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].isTokenErr(this.errorReason)) {
				/* Force a refetch of a new token */
				auth._forceNewToken(null, null, authCb);
			} else {
				auth._ensureValidAuthCredentials(false, authCb);
			}
		}
	};

	/**
	 * There are three stages in connecting:
	 * - preference: if there is a cached transport preference, we try to connect
	 *   on that. If that fails or times out we abort the attempt, remove the
	 *   preference and fall back to base. If it succeeds, we try upgrading it if
	 *   needed (will only be in the case where the preference is xhrs and the
	 *   browser supports ws).
	 * - base: we try to connect with the best transport that we think will
	 *   never fail for this browser (usually this is xhr_polling; for very old
	 *   browsers will be jsonp, for node will be comet). If it doesn't work, we
	 *   try fallback hosts.
	 * - upgrade: given a connected transport, we see if there are any better
	 *   ones, and if so, try to upgrade to them.
	 *
	 * connectImpl works out what stage you're at (which is purely a function of
	 * the current connection state and whether there are any stored preferences),
	 * and dispatches accordingly. After a transport has been set pending,
	 * tryATransport calls connectImpl to see if there's another stage to be done.
	 * */
	ConnectionManager.prototype.connectImpl = function(transportParams, connectCount) {
		var state = this.state.state;

		if(state !== this.states.connecting.state && state !== this.states.connected.state) {
			/* Only keep trying as long as in the 'connecting' state (or 'connected'
			 * for upgrading). Any operation can put us into 'disconnected' to cancel
			 * connection attempts and wait before retrying, or 'failed' to fail. */
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.connectImpl()', 'Must be in connecting state to connect (or connected to upgrade), but was ' + state);
		} else if(this.pendingTransports.length) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.connectImpl()', 'Transports ' + this.pendingTransports[0].toString() + ' currently pending; taking no action');
		} else if(state == this.states.connected.state) {
			this.upgradeIfNeeded(transportParams);
		} else if(this.transports.length > 1 && this.getTransportPreference()) {
			this.connectPreference(transportParams);
		} else {
			this.connectBase(transportParams, connectCount);
		}
	};


	ConnectionManager.prototype.connectPreference = function(transportParams) {
		var preference = this.getTransportPreference(),
			self = this,
			preferenceTimeoutExpired = false;

		if(!_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrIn(this.transports, preference)) {
			this.unpersistTransportPreference();
			this.connectImpl(transportParams);
		}

		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.connectPreference()', 'Trying to connect with stored transport preference ' + preference);

		var preferenceTimeout = setTimeout(function() {
			preferenceTimeoutExpired = true;
			if(!(self.state.state === self.states.connected.state)) {
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.connectPreference()', 'Shortcircuit connection attempt with ' + preference + ' failed; clearing preference and trying from scratch');
				/* Abort all connection attempts. (This also disconnects the active
				 * protocol, but none exists if we're not in the connected state) */
				self.disconnectAllTransports();
				/* Be quite agressive about clearing the stored preference if ever it doesn't work */
				self.unpersistTransportPreference();
			}
			self.connectImpl(transportParams);
		}, this.options.timeouts.preferenceConnectTimeout);

		/* For connectPreference, just use the main host. If host fallback is needed, do it in connectBase.
		 * The wstransport it will substitute the httphost for an appropriate wshost */
		transportParams.host = self.httpHosts[0];
		self.tryATransport(transportParams, preference, function(fatal, transport) {
			clearTimeout(preferenceTimeout);
			if(preferenceTimeoutExpired && transport) {
				/* Viable, but too late - connectImpl() will already be trying
				* connectBase, and we weren't in upgrade mode. Just remove the
				* onconnected listener and get rid of it */
				transport.off();
				transport.disconnect();
				_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrDeleteValue(this.pendingTransports, transport);
			} else if(!transport && !fatal) {
				/* Preference failed in a transport-specific way. Try more */
				self.unpersistTransportPreference();
				self.connectImpl(transportParams);
			}
			/* If suceeded, or failed fatally, nothing to do */
		});
	};


	/**
	 * Try to establish a transport on the base transport (the best transport
	 * such that if it doesn't work, nothing will work) as determined through
	 * static feature detection, checking for network connectivity and trying
	 * fallback hosts if applicable.
	 * @param transportParams
	 */
	ConnectionManager.prototype.connectBase = function(transportParams, connectCount) {
		var self = this,
			giveUp = function(err) {
				self.notifyState({state: self.states.connecting.failState, error: err});
			},
			candidateHosts = this.httpHosts.slice(),
			hostAttemptCb = function(fatal, transport) {
				if(connectCount !== self.connectCounter) {
					return;
				}
				if(!transport && !fatal) {
					tryFallbackHosts();
				}
			};

		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.connectBase()', 'Trying to connect with base transport ' + this.baseTransport);

		/* first try to establish a connection with the priority host with http transport */
		var host = candidateHosts.shift();
		if(!host) {
			giveUp(new _types_errorinfo__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"]('Unable to connect (no available host)', 80003, 404));
			return;
		}
		transportParams.host = host;

		/* this is what we'll be doing if the attempt for the main host fails */
		function tryFallbackHosts() {
			/* if there aren't any fallback hosts, fail */
			if(!candidateHosts.length) {
				giveUp(new _types_errorinfo__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"]('Unable to connect (and no more fallback hosts to try)', 80003, 404));
				return;
			}
			/* before trying any fallback (or any remaining fallback) we decide if
			 * there is a problem with the ably host, or there is a general connectivity
			 * problem */
			platform_http__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].checkConnectivity(function(err, connectivity) {
				if(connectCount !== self.connectCounter) {
					return;
				}
				/* we know err won't happen but handle it here anyway */
				if(err) {
					giveUp(err);
					return;
				}
				if(!connectivity) {
					/* the internet isn't reachable, so don't try the fallback hosts */
					giveUp(new _types_errorinfo__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"]('Unable to connect (network unreachable)', 80003, 404));
					return;
				}
				/* the network is there, so there's a problem with the main host, or
				 * its dns. Try the fallback hosts. We could try them simultaneously but
				 * that would potentially cause a huge spike in load on the load balancer */
				transportParams.host = _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrPopRandomElement(candidateHosts);
				self.tryATransport(transportParams, self.baseTransport, hostAttemptCb);
			});
		}

		if(this.forceFallbackHost && candidateHosts.length) {
			this.forceFallbackHost = false;
			tryFallbackHosts();
			return;
		}

		this.tryATransport(transportParams, this.baseTransport, hostAttemptCb);
	};


	ConnectionManager.prototype.getUpgradePossibilities = function() {
		/* returns the subset of upgradeTransports to the right of the current
		 * transport in upgradeTransports (if it's in there - if not, currentPosition
		 * will be -1, so return upgradeTransports.slice(0) == upgradeTransports */
		var current = this.activeProtocol.getTransport().shortName;
		var currentPosition = _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrIndexOf(this.upgradeTransports, current);
		return this.upgradeTransports.slice(currentPosition + 1);
	};


	ConnectionManager.prototype.upgradeIfNeeded = function(transportParams) {
		var upgradePossibilities = this.getUpgradePossibilities(),
			self = this;
		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.upgradeIfNeeded()', 'upgrade possibilities: ' + _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].inspect(upgradePossibilities));

		if(!upgradePossibilities.length) {
			return;
		}

		_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrForEach(upgradePossibilities, function(upgradeTransport) {
			/* Note: the transport may mutate the params, so give each transport a fresh one */
			var upgradeTransportParams = self.createTransportParams(transportParams.host, 'upgrade');
			self.tryATransport(upgradeTransportParams, upgradeTransport, noop);
		});
	};


	ConnectionManager.prototype.closeImpl = function() {
		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.closeImpl()', 'closing connection');
		this.cancelSuspendTimer();
		this.startTransitionTimer(this.states.closing);

		_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].safeArrForEach(this.pendingTransports, function(transport) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.closeImpl()', 'Closing pending transport: ' + transport);
			if(transport) transport.close();
		});

		_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].safeArrForEach(this.proposedTransports, function(transport) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.closeImpl()', 'Disposing of proposed transport: ' + transport);
			if(transport) transport.dispose();
		});

		if(this.activeProtocol) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.closeImpl()', 'Closing active transport: ' + this.activeProtocol.getTransport());
			this.activeProtocol.getTransport().close();
		}

		/* If there was an active transport, this will probably be
		 * preempted by the notifyState call in deactivateTransport */
		this.notifyState({state: 'closed'});
	};

	ConnectionManager.prototype.onAuthUpdated = function(tokenDetails, callback) {
		var self = this;
		switch(this.state.state) {
			case 'connected':
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.onAuthUpdated()', 'Sending AUTH message on active transport');
				/* If there are any proposed/pending transports (eg an upgrade that
				 * isn't yet scheduled for activation) that hasn't yet started syncing,
				 * just to get rid of them & restart the upgrade with the new token, to
				 * avoid a race condition. (If it has started syncing, the AUTH will be
				 * queued until the upgrade is complete, so everything's fine) */
				if((this.pendingTransports.length || this.proposedTransports.length) &&
					self.state !== self.states.synchronizing) {
					this.disconnectAllTransports(/* exceptActive: */true);
					var transportParams = this.activeProtocol.getTransport().params;
					_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].nextTick(function() {
						if(self.state.state === 'connected') {
							self.upgradeIfNeeded(transportParams);
						}
					});
				}

				/* Do any transport-specific new-token action */
				this.activeProtocol.getTransport().onAuthUpdated(tokenDetails);

				var authMsg = _types_protocolmessage__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].fromValues({
					action: actions.AUTH,
					auth: {
						accessToken: tokenDetails.token
					}
				});
				this.send(authMsg);

				/* The answer will come back as either a connectiondetails event
				 * (realtime sends a CONNECTED to asknowledge the reauth) or a
				 * statechange to failed */
				var successListener = function() {
					self.off(failureListener);
					callback(null, tokenDetails);
				};
				var failureListener = function(stateChange) {
					if(stateChange.current === 'failed') {
						self.off(successListener);
						self.off(failureListener);
						callback(stateChange.reason || self.getStateError());
					}
				};
				this.once('connectiondetails', successListener);
				this.on('connectionstate', failureListener);
				break;

			case 'connecting':
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.onAuthUpdated()',
					'Aborting current connection attempts in order to start again with the new auth details');
				this.disconnectAllTransports();
				/* fallthrough to add statechange listener */

			default:
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.onAuthUpdated()',
					'Connection state is ' + this.state.state + '; waiting until either connected or failed');
				var listener = function(stateChange) {
					switch(stateChange.current) {
						case 'connected':
							self.off(listener);
							callback(null, tokenDetails);
							break;
						case 'failed':
						case 'closed':
						case 'suspended':
							self.off(listener);
							callback(stateChange.reason || self.getStateError());
							break;
						default:
							/* ignore till we get either connected or failed */
							break;
					}
				};
				self.on('connectionstate', listener);
				if(this.state.state === 'connecting') {
					/* can happen if in the connecting state but no transport was pending
					 * yet, so disconnectAllTransports did not trigger a disconnected state */
					self.startConnect();
				} else {
					self.requestState({state: 'connecting'});
				}
		}
	};

	ConnectionManager.prototype.disconnectAllTransports = function(exceptActive) {
		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.disconnectAllTransports()', 'Disconnecting all transports' + (exceptActive ? ' except the active transport' : ''));

		/* This will prevent any connection procedure in an async part of one of its early stages from continuing */
		this.connectCounter++;

		_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].safeArrForEach(this.pendingTransports, function(transport) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.disconnectAllTransports()', 'Disconnecting pending transport: ' + transport);
			if(transport) transport.disconnect();
		});
		this.pendingTransports = [];

		_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].safeArrForEach(this.proposedTransports, function(transport) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.disconnectAllTransports()', 'Disposing of proposed transport: ' + transport);
			if(transport) transport.dispose();
		});
		this.proposedTransports = [];

		if(this.activeProtocol && !exceptActive) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.disconnectAllTransports()', 'Disconnecting active transport: ' + this.activeProtocol.getTransport());
			this.activeProtocol.getTransport().disconnect();
		}
		/* No need to notify state disconnected; disconnecting the active transport
		 * will have that effect */
	};

	/******************
	 * event queueing
	 ******************/

	ConnectionManager.prototype.send = function(msg, queueEvent, callback) {
		callback = callback || noop;
		var state = this.state;

		if(state.sendEvents) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.send()', 'sending event');
			this.sendImpl(new PendingMessage(msg, callback));
			return;
		}
		var shouldQueue = (queueEvent && state.queueEvents) || state.forceQueueEvents;
		if(!shouldQueue) {
			var err = 'rejecting event, queueEvent was ' + queueEvent + ', state was ' + state.state;
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.send()', err);
			callback(this.errorReason || new _types_errorinfo__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"](err, 90000, 400));
			return;
		}
		if(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].shouldLog(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO)) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.send()', 'queueing msg; ' + _types_protocolmessage__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].stringify(msg));
		}
		this.queue(msg, callback);
	};

	ConnectionManager.prototype.sendImpl = function(pendingMessage) {
		var msg = pendingMessage.message;
		/* If have already attempted to send this, resend with the same msgSerial,
		 * so Ably can dedup if the previous send succeeded */
		if(pendingMessage.ackRequired && !pendingMessage.sendAttempted) {
			msg.msgSerial = this.msgSerial++;
			this.setRecoveryKey();
		}
		try {
			this.activeProtocol.send(pendingMessage);
		} catch(e) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_ERROR, 'ConnectionManager.sendImpl()', 'Unexpected exception in transport.send(): ' + e.stack);
		}
	};

	function bundleWith(dest, src, maxSize) {
		var action;
		if(dest.channel !== src.channel) {
			/* RTL6d3 */
			return false;
		}
		if((action = dest.action) !== actions.PRESENCE && action !== actions.MESSAGE) {
			/* RTL6d - can only bundle messages or presence */
			return false;
		}
		if(action !== src.action) {
			/* RTL6d4 */
			return false;
		}
		var kind = (action === actions.PRESENCE) ? 'presence' : 'messages',
			proposed = dest[kind].concat(src[kind]),
			size = _types_message__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"].getMessagesSize(proposed);
		if(size > maxSize) {
			/* RTL6d1 */
			return false;
		}
		if(!_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].allSame(proposed, 'clientId')) {
			/* RTL6d2 */
			return false;
		}
		if(!_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrEvery(proposed, function(msg) {
			return !msg.id;
		})) {
			/* RTL6d7 */
			return false;
		}
		/* we're good to go! */
		dest[kind] = proposed;
		return true;
	};

	ConnectionManager.prototype.queue = function(msg, callback) {
		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.queue()', 'queueing event');
		var lastQueued = this.queuedMessages.last();
		var maxSize = this.options.maxMessageSize;
		/* If have already attempted to send a message, don't merge more messages
		 * into it, as if the previous send actually succeeded and realtime ignores
		 * the dup, they'll be lost */
		if(lastQueued && !lastQueued.sendAttempted && bundleWith(lastQueued.message, msg, maxSize)) {
			if(!lastQueued.merged) {
				lastQueued.callback = Object(_util_multicaster__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])([lastQueued.callback]);
				lastQueued.merged = true;
			}
			lastQueued.callback.push(callback);
		} else {
			this.queuedMessages.push(new PendingMessage(msg, callback));
		}
	};

	ConnectionManager.prototype.sendQueuedMessages = function() {
		_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.sendQueuedMessages()', 'sending ' + this.queuedMessages.count() + ' queued messages');
		var pendingMessage;
		while(pendingMessage = this.queuedMessages.shift())
			this.sendImpl(pendingMessage);
	};

	ConnectionManager.prototype.queuePendingMessages = function(pendingMessages) {
		if(pendingMessages && pendingMessages.length) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.queuePendingMessages()', 'queueing ' + pendingMessages.length + ' pending messages');
			this.queuedMessages.prepend(pendingMessages);
		}
	};

	ConnectionManager.prototype.failQueuedMessages = function(err) {
		var numQueued = this.queuedMessages.count();
		if(numQueued > 0) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_ERROR, 'ConnectionManager.failQueuedMessages()', 'failing ' + numQueued + ' queued messages, err = ' + _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].inspectError(err));
			this.queuedMessages.completeAllMessages(err);
		}
	};

	ConnectionManager.prototype.onChannelMessage = function(message, transport) {
		var onActiveTransport = this.activeProtocol && transport === this.activeProtocol.getTransport(),
			onUpgradeTransport = _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrIn(this.pendingTransports, transport) && this.state == this.states.synchronizing,
			notControlMsg = message.action === actions.MESSAGE || message.action === actions.PRESENCE;

		/* As the lib now has a period where the upgrade transport is synced but
		 * before it's become active (while waiting for the old one to become
		 * idle), message can validly arrive on it even though it isn't active */
		if(onActiveTransport || onUpgradeTransport) {
			if(notControlMsg) {
				var suppressed = this.setConnectionSerial(message);
				if(suppressed) {
					return;
				}
				if(_types_protocolmessage__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isDuplicate(message, this.mostRecentMsg)) {
					_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_ERROR, 'ConnectionManager.onChannelMessage()', 'received message with different connectionSerial, but same message id as a previous; discarding; id = ' + message.id);
					return;
				}
				this.mostRecentMsg = message;
			}
			this.realtime.channels.onChannelMessage(message);
		} else {
			// Message came in on a defunct transport. Allow only acks, nacks, & errors for outstanding
			// messages,  no new messages (as sync has been sent on new transport so new messages will
			// be resent there, or connection has been closed so don't want new messages)
			if(_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrIndexOf([actions.ACK, actions.NACK, actions.ERROR], message.action) > -1) {
				this.realtime.channels.onChannelMessage(message);
			} else {
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, 'ConnectionManager.onChannelMessage()', 'received message ' + JSON.stringify(message) + 'on defunct transport; discarding');
			}
		}
	};

	ConnectionManager.prototype.ping = function(transport, callback) {
		/* if transport is specified, try that */
		if(transport) {
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.ping()', 'transport = ' + transport);

			var onTimeout = function () {
				transport.off('heartbeat', onHeartbeat);
				callback(new _types_errorinfo__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"]('Timeout waiting for heartbeat response', 50000, 500));
			};

			var pingStart = _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].now(),
				id = _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].cheapRandStr();

			var onHeartbeat = function (responseId) {
				if(responseId === id) {
					transport.off('heartbeat', onHeartbeat);
					clearTimeout(timer);
					var responseTime = _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].now() - pingStart;
					callback(null, responseTime);
				}
			};

			var timer = setTimeout(onTimeout, this.options.timeouts.realtimeRequestTimeout);

			transport.on('heartbeat', onHeartbeat);
			transport.ping(id);
			return;
		}

		/* if we're not connected, don't attempt */
		if(this.state.state !== 'connected') {
			callback(new _types_errorinfo__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"]('Unable to ping service; not connected', 40000, 400));
			return;
		}

		/* no transport was specified, so use the current (connected) one
		 * but ensure that we retry if the transport is superseded before we complete */
		var completed = false, self = this;

		var onPingComplete = function(err, responseTime) {
			self.off('transport.active', onTransportActive);
			if(!completed) {
				completed = true;
				callback(err, responseTime);
			}
		};

		var onTransportActive = function() {
			if(!completed) {
				/* ensure that no callback happens for the currently outstanding operation */
				completed = true;
				/* repeat but picking up the new transport */
				_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].nextTick(function() {
					self.ping(null, callback);
				});
			}
		};

		this.on('transport.active', onTransportActive);
		this.ping(this.activeProtocol.getTransport(), onPingComplete);
	};

	ConnectionManager.prototype.abort = function(error) {
		this.activeProtocol.getTransport().fail(error);
	};

	ConnectionManager.prototype.registerProposedTransport = function(transport) {
		this.proposedTransports.push(transport);
	};

	ConnectionManager.prototype.getTransportPreference = function() {
		return this.transportPreference || (haveWebStorage && platform_webstorage__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].get(transportPreferenceName));
	};

	ConnectionManager.prototype.persistTransportPreference = function(transport) {
		if(_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].arrIn(_util_defaults__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].upgradeTransports, transport.shortName)) {
			this.transportPreference = transport.shortName;
			if(haveWebStorage) {
				platform_webstorage__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].set(transportPreferenceName, transport.shortName);
			}
		}
	};

	ConnectionManager.prototype.unpersistTransportPreference = function() {
		this.transportPreference = null;
		if(haveWebStorage) {
			platform_webstorage__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].remove(transportPreferenceName);
		}
	};

	/* This method is only used during connection attempts, so implements RSA4c1,
	 * RSA4c2, and RSA4d. In particular it is not invoked for
	 * serverside-triggered reauths or manual reauths, so RSA4c3 does not apply */
	ConnectionManager.prototype.actOnErrorFromAuthorize = function(err) {
		if(err.code === 40171) {
			/* No way to reauth */
			this.notifyState({state: 'failed', error: err});
		} else if(err.statusCode === 403) {
			var msg = 'Client configured authentication provider returned 403; failing the connection';
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_ERROR, 'ConnectionManager.actOnErrorFromAuthorize()', msg);
			this.notifyState({state: 'failed', error: new _types_errorinfo__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"](msg, 80019, 403, err)});
		} else {
			var msg = 'Client configured authentication provider request failed';
			_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'ConnectionManager.actOnErrorFromAuthorize', msg);
			this.notifyState({state: this.state.failState, error: new _types_errorinfo__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"](msg, 80019, 401, err)});
		}
	};

	ConnectionManager.prototype.onConnectionDetailsUpdate = function(connectionDetails, transport) {
		if(!connectionDetails) {
			return;
		}
		this.connectionDetails = connectionDetails;
		if(connectionDetails.maxMessageSize) {
			this.options.maxMessageSize = connectionDetails.maxMessageSize;
		}
		var clientId = connectionDetails.clientId;
		if(clientId) {
			var err = this.realtime.auth._uncheckedSetClientId(clientId);
			if(err) {
				_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_ERROR, 'ConnectionManager.onConnectionDetailsUpdate()', err.message);
				/* Errors setting the clientId are fatal to the connection */
				transport.fail(err);
				return;
			}
		}
		var connectionStateTtl = connectionDetails.connectionStateTtl;
		if(connectionStateTtl) {
			this.connectionStateTtl = connectionStateTtl;
		}
		this.maxIdleInterval = connectionDetails.maxIdleInterval;
		this.emit('connectiondetails', connectionDetails);
	};

	return ConnectionManager;
})();

/* harmony default export */ __webpack_exports__["a"] = (ConnectionManager);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(20)))

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _util_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _util_eventemitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);




var MessageQueue = (function() {
	function MessageQueue() {
		_util_eventemitter__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].call(this);
		this.messages = [];
	}
	_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].inherits(MessageQueue, _util_eventemitter__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);

	MessageQueue.prototype.count = function() {
		return this.messages.length;
	};

	MessageQueue.prototype.push = function(message) {
		this.messages.push(message);
	};

	MessageQueue.prototype.shift = function() {
		return this.messages.shift();
	};

	MessageQueue.prototype.last = function() {
		return this.messages[this.messages.length - 1];
	};

	MessageQueue.prototype.copyAll = function() {
		return this.messages.slice();
	};

	MessageQueue.prototype.append = function(messages) {
		this.messages.push.apply(this.messages, messages);
	};

	MessageQueue.prototype.prepend = function(messages) {
		this.messages.unshift.apply(this.messages, messages);
	};

	MessageQueue.prototype.completeMessages = function(serial, count, err) {
		_util_logger__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].LOG_MICRO, 'MessageQueue.completeMessages()', 'serial = ' + serial + '; count = ' + count);
		err = err || null;
		var messages = this.messages;
		var first = messages[0];
		if(first) {
			var startSerial = first.message.msgSerial;
			var endSerial = serial + count; /* the serial of the first message that is *not* the subject of this call */
			if(endSerial > startSerial) {
				var completeMessages = messages.splice(0, (endSerial - startSerial));
				for(var i = 0; i < completeMessages.length; i++) {
					completeMessages[i].callback(err);
				}
			}
			if(messages.length == 0)
				this.emit('idle');
		}
	};

	MessageQueue.prototype.completeAllMessages = function(err) {
		this.completeMessages(0, Number.MAX_SAFE_INTEGER || Number.MAX_VALUE, err);
	};

	MessageQueue.prototype.clear = function() {
		_util_logger__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].LOG_MICRO, 'MessageQueue.clear()', 'clearing ' + this.messages.length + ' messages');
		this.messages = [];
		this.emit('idle');
	};

	return MessageQueue;
})();

/* harmony default export */ __webpack_exports__["a"] = (MessageQueue);


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _common_lib_util_eventemitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _common_lib_types_errorinfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var platform_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _common_lib_util_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(0);
/* harmony import */ var _common_lib_util_defaults__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5);
/* harmony import */ var platform_bufferutils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4);
/* harmony import */ var _util_domevent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(35);










var XHRRequest = (function() {
	var noop = function() {};
	var idCounter = 0;
	var pendingRequests = {};

	var REQ_SEND = 0,
		REQ_RECV = 1,
		REQ_RECV_POLL = 2,
		REQ_RECV_STREAM = 3;

	function clearPendingRequests() {
		for(var id in pendingRequests)
			pendingRequests[id].dispose();
	}

	var isIE = typeof global !== 'undefined' && global.XDomainRequest;

	function ieVersion() {
		var match = navigator.userAgent.toString().match(/MSIE\s([\d.]+)/);
		return match && Number(match[1]);
	}

	function needJsonEnvelope() {
		/* IE 10 xhr bug: http://stackoverflow.com/a/16320339 */
		var version;
		return isIE && (version = ieVersion()) && version === 10;
	}

	function getHeader(xhr, header) {
		return xhr.getResponseHeader && xhr.getResponseHeader(header);
	}

	/* Safari mysteriously returns 'Identity' for transfer-encoding when in fact
	 * it is 'chunked'. So instead, decide that it is chunked when
	 * transfer-encoding is present or content-length is absent.  ('or' because
	 * when using http2 streaming, there's no transfer-encoding header, but can
	 * still deduce streaming from lack of content-length) */
	function isEncodingChunked(xhr) {
		return xhr.getResponseHeader
			&& (xhr.getResponseHeader('transfer-encoding')
			|| !xhr.getResponseHeader('content-length'));
	}

	function getHeadersAsObject(xhr) {
		var headerPairs = _common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].trim(xhr.getAllResponseHeaders()).split('\r\n'),
			headers = {};
		for (var i = 0; i < headerPairs.length; i++) {
			var parts = _common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].arrMap(headerPairs[i].split(':'), _common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].trim);
			headers[parts[0].toLowerCase()] = parts[1];
		}
		return headers;
	}

	function XHRRequest(uri, headers, params, body, requestMode, timeouts, method) {
		_common_lib_util_eventemitter__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].call(this);
		params = params || {};
		params.rnd = _common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].cheapRandStr();
		if(needJsonEnvelope() && !params.envelope)
			params.envelope = 'json';
		this.uri = uri + _common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].toQueryString(params);
		this.headers = headers || {};
		this.body = body;
		this.method = method ? method.toUpperCase() : (_common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isEmptyArg(body) ? 'GET' : 'POST');
		this.requestMode = requestMode;
		this.timeouts = timeouts;
		this.timedOut = false;
		this.requestComplete = false;
		pendingRequests[this.id = String(++idCounter)] = this;
	}
	_common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].inherits(XHRRequest, _common_lib_util_eventemitter__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);

	var createRequest = XHRRequest.createRequest = function(uri, headers, params, body, requestMode, timeouts, method) {
		/* XHR requests are used either with the context being a realtime
		 * transport, or with timeouts passed in (for when used by a rest client),
		 * or completely standalone.  Use the appropriate timeouts in each case */
		timeouts = timeouts || _common_lib_util_defaults__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].TIMEOUTS;
		return new XHRRequest(uri, headers, _common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].copy(params), body, requestMode, timeouts, method);
	};

	XHRRequest.prototype.complete = function(err, body, headers, unpacked, statusCode) {
		if(!this.requestComplete) {
			this.requestComplete = true;
			if(!err && body) {
				this.emit('data', body);
			}
			this.emit('complete', err, body, headers, unpacked, statusCode);
			this.dispose();
		}
	};

	XHRRequest.prototype.abort = function() {
		this.dispose();
	};

	XHRRequest.prototype.exec = function() {
		var timeout = (this.requestMode == REQ_SEND) ? this.timeouts.httpRequestTimeout : this.timeouts.recvTimeout,
			self = this,
			timer = this.timer = setTimeout(function() {
				self.timedOut = true;
				xhr.abort();
			}, timeout),
			body = this.body,
			method = this.method,
			headers = this.headers,
			xhr = this.xhr = new XMLHttpRequest(),
			accept = headers['accept'],
			responseType = 'text';

		if(!accept) {
			headers['accept'] = 'application/json';
		} else if(accept.indexOf('application/x-msgpack') === 0) {
			responseType = 'arraybuffer';
		}

		if(body) {
			var contentType = headers['content-type'] || (headers['content-type'] = 'application/json');
			if(contentType.indexOf('application/json') > -1 && typeof(body) != 'string')
				body = JSON.stringify(body);
		}

		xhr.open(method, this.uri, true);
		xhr.responseType = responseType;

		if ('authorization' in headers) {
			xhr.withCredentials = true;
		}

		for(var h in headers)
			xhr.setRequestHeader(h, headers[h]);

		var errorHandler = function(errorEvent, message, code, statusCode) {
			var errorMessage = message + ' (event type: ' + errorEvent.type + ')' + (self.xhr.statusText ? ', current statusText is ' + self.xhr.statusText : '');
			_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].logAction(_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].LOG_ERROR, 'Request.on' + errorEvent.type + '()', errorMessage);
			self.complete(new _common_lib_types_errorinfo__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"](errorMessage, code, statusCode));
		};
		xhr.onerror = function(errorEvent) {
			errorHandler(errorEvent, 'XHR error occurred', null, 400);
		}
		xhr.onabort = function(errorEvent) {
			if(self.timedOut) {
				errorHandler(errorEvent, 'Request aborted due to request timeout expiring', null, 408);
			} else {
				errorHandler(errorEvent, 'Request cancelled', null, 400);
			}
		};
		xhr.ontimeout = function(errorEvent) {
			errorHandler(errorEvent, 'Request timed out', null, 408);
		};

		var streaming,
			statusCode,
			responseBody,
			contentType,
			successResponse,
			streamPos = 0,
			unpacked = false;

		function onResponse() {
			clearTimeout(timer);
			successResponse = (statusCode < 400);
			if(statusCode == 204) {
				self.complete(null, null, null, null, statusCode);
				return;
			}
			streaming = (self.requestMode == REQ_RECV_STREAM && successResponse && isEncodingChunked(xhr));
		}

		function onEnd() {
			try {
				var contentType = getHeader(xhr, 'content-type'),
					headers,
					responseBody,
					/* Be liberal in what we accept; buggy auth servers may respond
					 * without the correct contenttype, but assume they're still
					 * responding with json */
					json = contentType ? (contentType.indexOf('application/json') >= 0) : (xhr.responseType == 'text');

				if(json) {
					/* If we requested msgpack but server responded with json, then since
					 * we set the responseType expecting msgpack, the response will be
					 * an ArrayBuffer containing json */
					responseBody = (xhr.responseType === 'arraybuffer') ? platform_bufferutils__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].utf8Decode(xhr.response) : String(xhr.responseText);
					if(responseBody.length) {
						responseBody = JSON.parse(responseBody);
					}
					unpacked = true;
				} else {
					responseBody = xhr.response;
				}

				if(responseBody.response !== undefined) {
					/* unwrap JSON envelope */
					statusCode = responseBody.statusCode;
					successResponse = (statusCode < 400);
					headers = responseBody.headers;
					responseBody = responseBody.response;
				} else {
					headers = getHeadersAsObject(xhr);
				}
			} catch(e) {
				self.complete(new _common_lib_types_errorinfo__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]('Malformed response body from server: ' + e.message, null, 400));
				return;
			}

			/* If response is an array, it's an array of protocol messages -- even if
			 * is contains an error action (hence the nonsuccess statuscode), we can
			 * consider the request to have succeeded, just pass it on to
			 * onProtocolMessage to decide what to do */
			if(successResponse || _common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isArray(responseBody)) {
				self.complete(null, responseBody, headers, unpacked, statusCode);
				return;
			}

			var err = responseBody.error && _common_lib_types_errorinfo__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].fromValues(responseBody.error);
			if(!err) {
				err = new _common_lib_types_errorinfo__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]('Error response received from server: ' + statusCode + ' body was: ' + _common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].inspect(responseBody), null, statusCode);
			}
			self.complete(err, responseBody, headers, unpacked, statusCode);
		}

		function onProgress() {
			responseBody = xhr.responseText;
			var bodyEnd = responseBody.length - 1, idx, chunk;
			while((streamPos < bodyEnd) && (idx = responseBody.indexOf('\n', streamPos)) > -1) {
				chunk = responseBody.slice(streamPos, idx);
				streamPos = idx + 1;
				onChunk(chunk);
			}
		}

		function onChunk(chunk) {
			try {
				chunk = JSON.parse(chunk);
			} catch(e) {
				self.complete(new _common_lib_types_errorinfo__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]('Malformed response body from server: ' + e.message, null, 400));
				return;
			}
			self.emit('data', chunk);
		}

		function onStreamEnd() {
			onProgress();
			self.streamComplete = true;
			_common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].nextTick(function() {
				self.complete();
			});
		}

		xhr.onreadystatechange = function() {
			var readyState = xhr.readyState;
			if(readyState < 3) return;
			if(xhr.status !== 0) {
				if(statusCode === undefined) {
					statusCode = xhr.status;
					/* IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450 */
					if(statusCode === 1223) statusCode = 204;
					onResponse();
				}
				if(readyState == 3 && streaming) {
					onProgress();
				} else if(readyState == 4) {
					if(streaming)
						onStreamEnd();
					else
						onEnd();
				}
			}
		};
		xhr.send(body);
	};

	XHRRequest.prototype.dispose = function() {
		var xhr = this.xhr;
		if(xhr) {
			xhr.onreadystatechange = xhr.onerror = xhr.onabort = xhr.ontimeout = noop;
			this.xhr = null;
			var timer = this.timer;
			if(timer) {
				clearTimeout(timer);
				this.timer = null;
			}
			if(!this.requestComplete)
				xhr.abort();
		}
		delete pendingRequests[this.id];
	};

	if(platform__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].xhrSupported) {
		if(typeof _util_domevent__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"] === 'object') {
			_util_domevent__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].addUnloadListener(clearPendingRequests);
		}
		if(typeof(platform_http__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]) !== 'undefined') {
			platform_http__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].supportsAuthHeaders = true;
			platform_http__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].Request = function(method, rest, uri, headers, params, body, callback) {
				var req = createRequest(uri, headers, params, body, REQ_SEND, rest && rest.options.timeouts, method);
				req.once('complete', callback);
				req.exec();
				return req;
			};

			platform_http__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].checkConnectivity = function(callback) {
				var upUrl = _common_lib_util_defaults__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].internetUpUrl;
				_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].logAction(_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].LOG_MICRO, '(XHRRequest)Http.checkConnectivity()', 'Sending; ' + upUrl);
				platform_http__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].getUri(null, upUrl, null, null, function(err, responseText) {
					var result = (!err && responseText.replace(/\n/, '') == 'yes');
					_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].logAction(_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].LOG_MICRO, '(XHRRequest)Http.checkConnectivity()', 'Result: ' + result);
					callback(null, result);
				});
			};
		}
	}

	return XHRRequest;
})();

/* harmony default export */ __webpack_exports__["a"] = (XHRRequest);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(20)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(12), __webpack_require__(10), __webpack_require__(43), __webpack_require__(17), __webpack_require__(37), __webpack_require__(36), __webpack_require__(29), __webpack_require__(30), __webpack_require__(31), __webpack_require__(44), __webpack_require__(45));
	}
	else {}
}(this, function (CryptoJS) {

	return CryptoJS;

}));

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(12));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var C_algo = C.algo;

	    /**
	     * HMAC algorithm.
	     */
	    var HMAC = C_algo.HMAC = Base.extend({
	        /**
	         * Initializes a newly created HMAC.
	         *
	         * @param {Hasher} hasher The hash algorithm to use.
	         * @param {WordArray|string} key The secret key.
	         *
	         * @example
	         *
	         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
	         */
	        init: function (hasher, key) {
	            // Init hasher
	            hasher = this._hasher = new hasher.init();

	            // Convert string to WordArray, else assume WordArray already
	            if (typeof key == 'string') {
	                key = Utf8.parse(key);
	            }

	            // Shortcuts
	            var hasherBlockSize = hasher.blockSize;
	            var hasherBlockSizeBytes = hasherBlockSize * 4;

	            // Allow arbitrary length keys
	            if (key.sigBytes > hasherBlockSizeBytes) {
	                key = hasher.finalize(key);
	            }

	            // Clamp excess bits
	            key.clamp();

	            // Clone key for inner and outer pads
	            var oKey = this._oKey = key.clone();
	            var iKey = this._iKey = key.clone();

	            // Shortcuts
	            var oKeyWords = oKey.words;
	            var iKeyWords = iKey.words;

	            // XOR keys with pad constants
	            for (var i = 0; i < hasherBlockSize; i++) {
	                oKeyWords[i] ^= 0x5c5c5c5c;
	                iKeyWords[i] ^= 0x36363636;
	            }
	            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this HMAC to its initial state.
	         *
	         * @example
	         *
	         *     hmacHasher.reset();
	         */
	        reset: function () {
	            // Shortcut
	            var hasher = this._hasher;

	            // Reset
	            hasher.reset();
	            hasher.update(this._iKey);
	        },

	        /**
	         * Updates this HMAC with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {HMAC} This HMAC instance.
	         *
	         * @example
	         *
	         *     hmacHasher.update('message');
	         *     hmacHasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            this._hasher.update(messageUpdate);

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the HMAC computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The HMAC.
	         *
	         * @example
	         *
	         *     var hmac = hmacHasher.finalize();
	         *     var hmac = hmacHasher.finalize('message');
	         *     var hmac = hmacHasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Shortcut
	            var hasher = this._hasher;

	            // Compute HMAC
	            var innerHash = hasher.finalize(messageUpdate);
	            hasher.reset();
	            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

	            return hmac;
	        }
	    });
	}());


}));

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(12), __webpack_require__(37), __webpack_require__(29));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var MD5 = C_algo.MD5;

	    /**
	     * This key derivation function is meant to conform with EVP_BytesToKey.
	     * www.openssl.org/docs/crypto/EVP_BytesToKey.html
	     */
	    var EvpKDF = C_algo.EvpKDF = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
	         * @property {Hasher} hasher The hash algorithm to use. Default: MD5
	         * @property {number} iterations The number of iterations to perform. Default: 1
	         */
	        cfg: Base.extend({
	            keySize: 128/32,
	            hasher: MD5,
	            iterations: 1
	        }),

	        /**
	         * Initializes a newly created key derivation function.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
	         *
	         * @example
	         *
	         *     var kdf = CryptoJS.algo.EvpKDF.create();
	         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
	         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
	         */
	        init: function (cfg) {
	            this.cfg = this.cfg.extend(cfg);
	        },

	        /**
	         * Derives a key from a password.
	         *
	         * @param {WordArray|string} password The password.
	         * @param {WordArray|string} salt A salt.
	         *
	         * @return {WordArray} The derived key.
	         *
	         * @example
	         *
	         *     var key = kdf.compute(password, salt);
	         */
	        compute: function (password, salt) {
	            var block;

	            // Shortcut
	            var cfg = this.cfg;

	            // Init hasher
	            var hasher = cfg.hasher.create();

	            // Initial values
	            var derivedKey = WordArray.create();

	            // Shortcuts
	            var derivedKeyWords = derivedKey.words;
	            var keySize = cfg.keySize;
	            var iterations = cfg.iterations;

	            // Generate key
	            while (derivedKeyWords.length < keySize) {
	                if (block) {
	                    hasher.update(block);
	                }
	                block = hasher.update(password).finalize(salt);
	                hasher.reset();

	                // Iterations
	                for (var i = 1; i < iterations; i++) {
	                    block = hasher.finalize(block);
	                    hasher.reset();
	                }

	                derivedKey.concat(block);
	            }
	            derivedKey.sigBytes = keySize * 4;

	            return derivedKey;
	        }
	    });

	    /**
	     * Derives a key from a password.
	     *
	     * @param {WordArray|string} password The password.
	     * @param {WordArray|string} salt A salt.
	     * @param {Object} cfg (Optional) The configuration options to use for this computation.
	     *
	     * @return {WordArray} The derived key.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var key = CryptoJS.EvpKDF(password, salt);
	     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
	     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
	     */
	    C.EvpKDF = function (password, salt, cfg) {
	        return EvpKDF.create(cfg).compute(password, salt);
	    };
	}());


	return CryptoJS.EvpKDF;

}));

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(12), __webpack_require__(30));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * Cipher core components.
	 */
	CryptoJS.lib.Cipher || (function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var Base64 = C_enc.Base64;
	    var C_algo = C.algo;
	    var EvpKDF = C_algo.EvpKDF;

	    /**
	     * Abstract base cipher template.
	     *
	     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
	     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
	     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
	     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
	     */
	    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {WordArray} iv The IV to use for this operation.
	         */
	        cfg: Base.extend(),

	        /**
	         * Creates this cipher in encryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createEncryptor: function (key, cfg) {
	            return this.create(this._ENC_XFORM_MODE, key, cfg);
	        },

	        /**
	         * Creates this cipher in decryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createDecryptor: function (key, cfg) {
	            return this.create(this._DEC_XFORM_MODE, key, cfg);
	        },

	        /**
	         * Initializes a newly created cipher.
	         *
	         * @param {number} xformMode Either the encryption or decryption transormation mode constant.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
	         */
	        init: function (xformMode, key, cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Store transform mode and key
	            this._xformMode = xformMode;
	            this._key = key;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this cipher to its initial state.
	         *
	         * @example
	         *
	         *     cipher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-cipher logic
	            this._doReset();
	        },

	        /**
	         * Adds data to be encrypted or decrypted.
	         *
	         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.process('data');
	         *     var encrypted = cipher.process(wordArray);
	         */
	        process: function (dataUpdate) {
	            // Append
	            this._append(dataUpdate);

	            // Process available blocks
	            return this._process();
	        },

	        /**
	         * Finalizes the encryption or decryption process.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after final processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.finalize();
	         *     var encrypted = cipher.finalize('data');
	         *     var encrypted = cipher.finalize(wordArray);
	         */
	        finalize: function (dataUpdate) {
	            // Final data update
	            if (dataUpdate) {
	                this._append(dataUpdate);
	            }

	            // Perform concrete-cipher logic
	            var finalProcessedData = this._doFinalize();

	            return finalProcessedData;
	        },

	        keySize: 128/32,

	        ivSize: 128/32,

	        _ENC_XFORM_MODE: 1,

	        _DEC_XFORM_MODE: 2,

	        /**
	         * Creates shortcut functions to a cipher's object interface.
	         *
	         * @param {Cipher} cipher The cipher to create a helper for.
	         *
	         * @return {Object} An object with encrypt and decrypt shortcut functions.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
	         */
	        _createHelper: (function () {
	            function selectCipherStrategy(key) {
	                if (typeof key == 'string') {
	                    return PasswordBasedCipher;
	                } else {
	                    return SerializableCipher;
	                }
	            }

	            return function (cipher) {
	                return {
	                    encrypt: function (message, key, cfg) {
	                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
	                    },

	                    decrypt: function (ciphertext, key, cfg) {
	                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
	                    }
	                };
	            };
	        }())
	    });

	    /**
	     * Abstract base stream cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
	     */
	    var StreamCipher = C_lib.StreamCipher = Cipher.extend({
	        _doFinalize: function () {
	            // Process partial blocks
	            var finalProcessedBlocks = this._process(!!'flush');

	            return finalProcessedBlocks;
	        },

	        blockSize: 1
	    });

	    /**
	     * Mode namespace.
	     */
	    var C_mode = C.mode = {};

	    /**
	     * Abstract base block cipher mode template.
	     */
	    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
	        /**
	         * Creates this mode for encryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
	         */
	        createEncryptor: function (cipher, iv) {
	            return this.Encryptor.create(cipher, iv);
	        },

	        /**
	         * Creates this mode for decryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
	         */
	        createDecryptor: function (cipher, iv) {
	            return this.Decryptor.create(cipher, iv);
	        },

	        /**
	         * Initializes a newly created mode.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
	         */
	        init: function (cipher, iv) {
	            this._cipher = cipher;
	            this._iv = iv;
	        }
	    });

	    /**
	     * Cipher Block Chaining mode.
	     */
	    var CBC = C_mode.CBC = (function () {
	        /**
	         * Abstract base CBC mode.
	         */
	        var CBC = BlockCipherMode.extend();

	        /**
	         * CBC encryptor.
	         */
	        CBC.Encryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                // Shortcuts
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;

	                // XOR and encrypt
	                xorBlock.call(this, words, offset, blockSize);
	                cipher.encryptBlock(words, offset);

	                // Remember this block to use with next block
	                this._prevBlock = words.slice(offset, offset + blockSize);
	            }
	        });

	        /**
	         * CBC decryptor.
	         */
	        CBC.Decryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                // Shortcuts
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;

	                // Remember this block to use with next block
	                var thisBlock = words.slice(offset, offset + blockSize);

	                // Decrypt and XOR
	                cipher.decryptBlock(words, offset);
	                xorBlock.call(this, words, offset, blockSize);

	                // This block becomes the previous block
	                this._prevBlock = thisBlock;
	            }
	        });

	        function xorBlock(words, offset, blockSize) {
	            var block;

	            // Shortcut
	            var iv = this._iv;

	            // Choose mixing block
	            if (iv) {
	                block = iv;

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            } else {
	                block = this._prevBlock;
	            }

	            // XOR blocks
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= block[i];
	            }
	        }

	        return CBC;
	    }());

	    /**
	     * Padding namespace.
	     */
	    var C_pad = C.pad = {};

	    /**
	     * PKCS #5/7 padding strategy.
	     */
	    var Pkcs7 = C_pad.Pkcs7 = {
	        /**
	         * Pads data using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to pad.
	         * @param {number} blockSize The multiple that the data should be padded to.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
	         */
	        pad: function (data, blockSize) {
	            // Shortcut
	            var blockSizeBytes = blockSize * 4;

	            // Count padding bytes
	            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

	            // Create padding word
	            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;

	            // Create padding
	            var paddingWords = [];
	            for (var i = 0; i < nPaddingBytes; i += 4) {
	                paddingWords.push(paddingWord);
	            }
	            var padding = WordArray.create(paddingWords, nPaddingBytes);

	            // Add padding
	            data.concat(padding);
	        },

	        /**
	         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to unpad.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.unpad(wordArray);
	         */
	        unpad: function (data) {
	            // Get number of padding bytes from last byte
	            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	            // Remove padding
	            data.sigBytes -= nPaddingBytes;
	        }
	    };

	    /**
	     * Abstract base block cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
	     */
	    var BlockCipher = C_lib.BlockCipher = Cipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Mode} mode The block mode to use. Default: CBC
	         * @property {Padding} padding The padding strategy to use. Default: Pkcs7
	         */
	        cfg: Cipher.cfg.extend({
	            mode: CBC,
	            padding: Pkcs7
	        }),

	        reset: function () {
	            var modeCreator;

	            // Reset cipher
	            Cipher.reset.call(this);

	            // Shortcuts
	            var cfg = this.cfg;
	            var iv = cfg.iv;
	            var mode = cfg.mode;

	            // Reset block mode
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                modeCreator = mode.createEncryptor;
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                modeCreator = mode.createDecryptor;
	                // Keep at least one block in the buffer for unpadding
	                this._minBufferSize = 1;
	            }

	            if (this._mode && this._mode.__creator == modeCreator) {
	                this._mode.init(this, iv && iv.words);
	            } else {
	                this._mode = modeCreator.call(mode, this, iv && iv.words);
	                this._mode.__creator = modeCreator;
	            }
	        },

	        _doProcessBlock: function (words, offset) {
	            this._mode.processBlock(words, offset);
	        },

	        _doFinalize: function () {
	            var finalProcessedBlocks;

	            // Shortcut
	            var padding = this.cfg.padding;

	            // Finalize
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                // Pad data
	                padding.pad(this._data, this.blockSize);

	                // Process final blocks
	                finalProcessedBlocks = this._process(!!'flush');
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                // Process final blocks
	                finalProcessedBlocks = this._process(!!'flush');

	                // Unpad data
	                padding.unpad(finalProcessedBlocks);
	            }

	            return finalProcessedBlocks;
	        },

	        blockSize: 128/32
	    });

	    /**
	     * A collection of cipher parameters.
	     *
	     * @property {WordArray} ciphertext The raw ciphertext.
	     * @property {WordArray} key The key to this ciphertext.
	     * @property {WordArray} iv The IV used in the ciphering operation.
	     * @property {WordArray} salt The salt used with a key derivation function.
	     * @property {Cipher} algorithm The cipher algorithm.
	     * @property {Mode} mode The block mode used in the ciphering operation.
	     * @property {Padding} padding The padding scheme used in the ciphering operation.
	     * @property {number} blockSize The block size of the cipher.
	     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
	     */
	    var CipherParams = C_lib.CipherParams = Base.extend({
	        /**
	         * Initializes a newly created cipher params object.
	         *
	         * @param {Object} cipherParams An object with any of the possible cipher parameters.
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.lib.CipherParams.create({
	         *         ciphertext: ciphertextWordArray,
	         *         key: keyWordArray,
	         *         iv: ivWordArray,
	         *         salt: saltWordArray,
	         *         algorithm: CryptoJS.algo.AES,
	         *         mode: CryptoJS.mode.CBC,
	         *         padding: CryptoJS.pad.PKCS7,
	         *         blockSize: 4,
	         *         formatter: CryptoJS.format.OpenSSL
	         *     });
	         */
	        init: function (cipherParams) {
	            this.mixIn(cipherParams);
	        },

	        /**
	         * Converts this cipher params object to a string.
	         *
	         * @param {Format} formatter (Optional) The formatting strategy to use.
	         *
	         * @return {string} The stringified cipher params.
	         *
	         * @throws Error If neither the formatter nor the default formatter is set.
	         *
	         * @example
	         *
	         *     var string = cipherParams + '';
	         *     var string = cipherParams.toString();
	         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
	         */
	        toString: function (formatter) {
	            return (formatter || this.formatter).stringify(this);
	        }
	    });

	    /**
	     * Format namespace.
	     */
	    var C_format = C.format = {};

	    /**
	     * OpenSSL formatting strategy.
	     */
	    var OpenSSLFormatter = C_format.OpenSSL = {
	        /**
	         * Converts a cipher params object to an OpenSSL-compatible string.
	         *
	         * @param {CipherParams} cipherParams The cipher params object.
	         *
	         * @return {string} The OpenSSL-compatible string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
	         */
	        stringify: function (cipherParams) {
	            var wordArray;

	            // Shortcuts
	            var ciphertext = cipherParams.ciphertext;
	            var salt = cipherParams.salt;

	            // Format
	            if (salt) {
	                wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
	            } else {
	                wordArray = ciphertext;
	            }

	            return wordArray.toString(Base64);
	        },

	        /**
	         * Converts an OpenSSL-compatible string to a cipher params object.
	         *
	         * @param {string} openSSLStr The OpenSSL-compatible string.
	         *
	         * @return {CipherParams} The cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
	         */
	        parse: function (openSSLStr) {
	            var salt;

	            // Parse base64
	            var ciphertext = Base64.parse(openSSLStr);

	            // Shortcut
	            var ciphertextWords = ciphertext.words;

	            // Test for salt
	            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
	                // Extract salt
	                salt = WordArray.create(ciphertextWords.slice(2, 4));

	                // Remove salt from ciphertext
	                ciphertextWords.splice(0, 4);
	                ciphertext.sigBytes -= 16;
	            }

	            return CipherParams.create({ ciphertext: ciphertext, salt: salt });
	        }
	    };

	    /**
	     * A cipher wrapper that returns ciphertext as a serializable cipher params object.
	     */
	    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
	         */
	        cfg: Base.extend({
	            format: OpenSSLFormatter
	        }),

	        /**
	         * Encrypts a message.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, key, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Encrypt
	            var encryptor = cipher.createEncryptor(key, cfg);
	            var ciphertext = encryptor.finalize(message);

	            // Shortcut
	            var cipherCfg = encryptor.cfg;

	            // Create and return serializable cipher params
	            return CipherParams.create({
	                ciphertext: ciphertext,
	                key: key,
	                iv: cipherCfg.iv,
	                algorithm: cipher,
	                mode: cipherCfg.mode,
	                padding: cipherCfg.padding,
	                blockSize: cipher.blockSize,
	                formatter: cfg.format
	            });
	        },

	        /**
	         * Decrypts serialized ciphertext.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, key, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Convert string to CipherParams
	            ciphertext = this._parse(ciphertext, cfg.format);

	            // Decrypt
	            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

	            return plaintext;
	        },

	        /**
	         * Converts serialized ciphertext to CipherParams,
	         * else assumed CipherParams already and returns ciphertext unchanged.
	         *
	         * @param {CipherParams|string} ciphertext The ciphertext.
	         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
	         *
	         * @return {CipherParams} The unserialized ciphertext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
	         */
	        _parse: function (ciphertext, format) {
	            if (typeof ciphertext == 'string') {
	                return format.parse(ciphertext, this);
	            } else {
	                return ciphertext;
	            }
	        }
	    });

	    /**
	     * Key derivation function namespace.
	     */
	    var C_kdf = C.kdf = {};

	    /**
	     * OpenSSL key derivation function.
	     */
	    var OpenSSLKdf = C_kdf.OpenSSL = {
	        /**
	         * Derives a key and IV from a password.
	         *
	         * @param {string} password The password to derive from.
	         * @param {number} keySize The size in words of the key to generate.
	         * @param {number} ivSize The size in words of the IV to generate.
	         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
	         *
	         * @return {CipherParams} A cipher params object with the key, IV, and salt.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
	         */
	        execute: function (password, keySize, ivSize, salt) {
	            // Generate random salt
	            if (!salt) {
	                salt = WordArray.random(64/8);
	            }

	            // Derive key and IV
	            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

	            // Separate key and IV
	            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
	            key.sigBytes = keySize * 4;

	            // Return params
	            return CipherParams.create({ key: key, iv: iv, salt: salt });
	        }
	    };

	    /**
	     * A serializable cipher wrapper that derives the key from a password,
	     * and returns ciphertext as a serializable cipher params object.
	     */
	    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
	         */
	        cfg: SerializableCipher.cfg.extend({
	            kdf: OpenSSLKdf
	        }),

	        /**
	         * Encrypts a message using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, password, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Derive key and other params
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

	            // Add IV to config
	            cfg.iv = derivedParams.iv;

	            // Encrypt
	            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

	            // Mix in derived params
	            ciphertext.mixIn(derivedParams);

	            return ciphertext;
	        },

	        /**
	         * Decrypts serialized ciphertext using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, password, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Convert string to CipherParams
	            ciphertext = this._parse(ciphertext, cfg.format);

	            // Derive key and other params
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

	            // Add IV to config
	            cfg.iv = derivedParams.iv;

	            // Decrypt
	            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

	            return plaintext;
	        }
	    });
	}());


}));

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(12));
	}
	else {}
}(this, function (CryptoJS) {

	return CryptoJS.enc.Hex;

}));

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(12));
	}
	else {}
}(this, function (CryptoJS) {

	return CryptoJS.enc.Utf8;

}));

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _types_protocolmessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _util_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _util_eventemitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var _messagequeue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(26);
/* harmony import */ var _types_errorinfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2);







var Protocol = (function() {
	var actions = _types_protocolmessage__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].Action;

	function Protocol(transport) {
		_util_eventemitter__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].call(this);
		this.transport = transport;
		this.messageQueue = new _messagequeue__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]();
		var self = this;
		transport.on('ack', function(serial, count) { self.onAck(serial, count); });
		transport.on('nack', function(serial, count, err) { self.onNack(serial, count, err); });
	}
	_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].inherits(Protocol, _util_eventemitter__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);

	Protocol.prototype.onAck = function(serial, count) {
		_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MICRO, 'Protocol.onAck()', 'serial = ' + serial + '; count = ' + count);
		this.messageQueue.completeMessages(serial, count);
	};

	Protocol.prototype.onNack = function(serial, count, err) {
		_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_ERROR, 'Protocol.onNack()', 'serial = ' + serial + '; count = ' + count + '; err = ' + _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].inspectError(err));
		if(!err) {
			err = new _types_errorinfo__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]('Unable to send message; channel not responding', 50001, 500);
		}
		this.messageQueue.completeMessages(serial, count, err);
	};

	Protocol.prototype.onceIdle = function(listener) {
		var messageQueue = this.messageQueue;
		if(messageQueue.count() === 0) {
			listener();
			return;
		}
		messageQueue.once('idle', listener);
	};

	Protocol.prototype.send = function(pendingMessage) {
		if(pendingMessage.ackRequired) {
			this.messageQueue.push(pendingMessage);
		}
		if (_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].shouldLog(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MICRO)) {
			_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].LOG_MICRO, 'Protocol.send()', 'sending msg; ' + _types_protocolmessage__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].stringify(pendingMessage.message));
		}
		pendingMessage.sendAttempted = true;
		this.transport.send(pendingMessage.message);
	};

	Protocol.prototype.getTransport = function() {
		return this.transport;
	};

	Protocol.prototype.getPendingMessages = function() {
		return this.messageQueue.copyAll();
	};

	Protocol.prototype.clearPendingMessages = function() {
		return this.messageQueue.clear();
	};

	Protocol.prototype.finish = function() {
		var transport = this.transport;
		this.onceIdle(function() {
			transport.disconnect();
		});
	};

	function PendingMessage(message, callback) {
		this.message = message;
		this.callback = callback;
		this.merged = false;
		var action = message.action;
		this.sendAttempted = false;
		this.ackRequired = (action == actions.MESSAGE || action == actions.PRESENCE);
	}
	Protocol.PendingMessage = PendingMessage;

	return Protocol;
})();

/* harmony default export */ __webpack_exports__["a"] = (Protocol);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {var DomEvent = (function() {
	function DomEvent() {}

	DomEvent.addListener = function(target, event, listener) {
		if(target.addEventListener) {
			target.addEventListener(event, listener, false);
		} else {
			target.attachEvent('on'+event, function() { listener.apply(target, arguments); });
		}
	};

	DomEvent.removeListener = function(target, event, listener) {
		if(target.removeEventListener) {
			target.removeEventListener(event, listener, false);
		} else {
			target.detachEvent('on'+event, function() { listener.apply(target, arguments); });
		}
	};

	DomEvent.addMessageListener = function(target, listener) {
		DomEvent.addListener(target, 'message', listener);
	};

	DomEvent.removeMessageListener = function(target, listener) {
		DomEvent.removeListener(target, 'message', listener);
	};

	DomEvent.addUnloadListener = function(listener) {
		DomEvent.addListener(global, 'unload', listener);
	};

	return DomEvent;
})();

/* harmony default export */ __webpack_exports__["a"] = (DomEvent);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(20)))

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(12));
	}
	else {}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	return CryptoJS.SHA256;

}));

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(12));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-1 hash algorithm.
	     */
	    var SHA1 = C_algo.SHA1 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476,
	                0xc3d2e1f0
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];

	            // Computation
	            for (var i = 0; i < 80; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
	                    W[i] = (n << 1) | (n >>> 31);
	                }

	                var t = ((a << 5) | (a >>> 27)) + e + W[i];
	                if (i < 20) {
	                    t += ((b & c) | (~b & d)) + 0x5a827999;
	                } else if (i < 40) {
	                    t += (b ^ c ^ d) + 0x6ed9eba1;
	                } else if (i < 60) {
	                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
	                } else /* if (i < 80) */ {
	                    t += (b ^ c ^ d) - 0x359d3e2a;
	                }

	                e = d;
	                d = c;
	                c = (b << 30) | (b >>> 2);
	                b = a;
	                a = t;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA1('message');
	     *     var hash = CryptoJS.SHA1(wordArray);
	     */
	    C.SHA1 = Hasher._createHelper(SHA1);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA1(message, key);
	     */
	    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
	}());


	return CryptoJS.SHA1;

}));

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(12), __webpack_require__(36), __webpack_require__(29));
	}
	else {}
}(this, function (CryptoJS) {

	return CryptoJS.HmacSHA256;

}));

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _common_lib_transport_comettransport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _common_lib_util_eventemitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var platform_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _common_lib_types_errorinfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2);
/* harmony import */ var _common_lib_util_defaults__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5);
/* harmony import */ var _common_lib_util_logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(0);









var JSONPTransport = function(connectionManager) {
	var noop = function() {};
	/* Can't just use window.Ably, as that won't exist if using the commonjs version. */
	var _ = global._ablyjs_jsonp = {};

	/* express strips out parantheses from the callback!
	 * Kludge to still alow its responses to work, while not keeping the
	 * function form for normal use and not cluttering window.Ably
	 * https://github.com/expressjs/express/blob/5b4d4b4ab1324743534fbcd4709f4e75bb4b4e9d/lib/response.js#L305
	 */
	_._ = function(id) { return _['_' + id] || noop; };
	var idCounter = 1;
	var head = null;
	var shortName = 'jsonp';

	/* public constructor */
	function JSONPTransport(connectionManager, auth, params) {
		params.stream = false;
		_common_lib_transport_comettransport__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].call(this, connectionManager, auth, params);
		this.shortName = shortName;
	}
	_common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].inherits(JSONPTransport, _common_lib_transport_comettransport__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);

	JSONPTransport.isAvailable = function() {
		return platform__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].jsonpSupported && platform__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].allowComet;
	};
	if(JSONPTransport.isAvailable()) {
		connectionManager.supportedTransports[shortName] = JSONPTransport;
	}
	if(platform__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].jsonpSupported) {
		head = document.getElementsByTagName('head')[0];
	}

	/* connectivity check; since this has a hard-coded callback id,
	 * we just make sure that we handle concurrent requests (but the
	 * connectionmanager should ensure this doesn't happen anyway */
	var checksInProgress = null;
	global.JSONPTransport = JSONPTransport

	JSONPTransport.tryConnect = function(connectionManager, auth, params, callback) {
		var transport = new JSONPTransport(connectionManager, auth, params);
		var errorCb = function(err) { callback({event: this.event, error: err}); };
		transport.on(['failed', 'disconnected'], errorCb);
		transport.on('preconnect', function() {
			_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MINOR, 'JSONPTransport.tryConnect()', 'viable transport ' + transport);
			transport.off(['failed', 'disconnected'], errorCb);
			callback(null, transport);
		});
		transport.connect();
	};

	JSONPTransport.prototype.toString = function() {
		return 'JSONPTransport; uri=' + this.baseUri + '; isConnected=' + this.isConnected;
	};

	var createRequest = JSONPTransport.prototype.createRequest = function(uri, headers, params, body, requestMode, timeouts, method) {
		/* JSONP requests are used either with the context being a realtime
		 * transport, or with timeouts passed in (for when used by a rest client),
		 * or completely standalone.  Use the appropriate timeouts in each case */
		timeouts = (this && this.timeouts) || timeouts || _common_lib_util_defaults__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].TIMEOUTS;
		return new Request(undefined, uri, headers, _common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].copy(params), body, requestMode, timeouts, method);
	};

	function Request(id, uri, headers, params, body, requestMode, timeouts, method) {
		_common_lib_util_eventemitter__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].call(this);
		if(id === undefined) id = idCounter++;
		this.id = id;
		this.uri = uri;
		this.params = params || {};
		this.params.rnd = _common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].cheapRandStr();
		if(headers) {
			/* JSONP doesn't allow headers. Cherry-pick a couple to turn into qs params */
			if(headers['X-Ably-Version']) this.params.v = headers['X-Ably-Version'];
			if(headers['X-Ably-Lib']) this.params.lib = headers['X-Ably-Lib'];
		}
		this.body = body;
		this.method = method;
		this.requestMode = requestMode;
		this.timeouts = timeouts;
		this.requestComplete = false;
	}
	_common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].inherits(Request, _common_lib_util_eventemitter__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]);

	Request.prototype.exec = function() {
		var id = this.id,
			body = this.body,
			method = this.method,
			uri = this.uri,
			params = this.params,
			self = this;

		params.callback = '_ablyjs_jsonp._(' + id + ')';

		params.envelope = 'jsonp';
		if(body) {
			params.body = body;
		}
		if(method && method !== 'get') {
			params.method = method;
		}

		var script = this.script = document.createElement('script');
		var src = uri + _common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].toQueryString(params);
		script.src = src;
		if(script.src.split('/').slice(-1)[0] !== src.split('/').slice(-1)[0]) {
			/* The src has been truncated. Can't abort, but can at least emit an
			 * error so the user knows what's gone wrong. (Can't compare strings
			 * directly as src may have a port, script.src won't) */
			_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_ERROR, 'JSONP Request.exec()', 'Warning: the browser appears to have truncated the script URI. This will likely result in the request failing due to an unparseable body param');
		}
		script.async = true;
		script.type = 'text/javascript';
		script.charset = 'UTF-8';
		script.onerror = function(err) {
			self.complete(new _common_lib_types_errorinfo__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]('JSONP script error (event: ' + _common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].inspect(err) + ')', null, 400));
		};

		_['_' + id] = function(message) {
			if(message.statusCode) {
				/* Handle as enveloped jsonp, as all jsonp transport uses should be */
				var response = message.response;
				if(message.statusCode == 204) {
					self.complete(null, null, null, message.statusCode);
				} else if(!response) {
					self.complete(new _common_lib_types_errorinfo__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]('Invalid server response: no envelope detected', null, 500));
				} else if(message.statusCode < 400 || _common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isArray(response)) {
					/* If response is an array, it's an array of protocol messages -- even if
					 * it contains an error action (hence the nonsuccess statuscode), we can
					 * consider the request to have succeeded, just pass it on to
					 * onProtocolMessage to decide what to do */
					self.complete(null, response, message.headers, message.statusCode);
				} else {
					var err = response.error || new _common_lib_types_errorinfo__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]('Error response received from server', null, message.statusCode);
					self.complete(err);
				}
			} else {
				/* Handle as non-enveloped -- as will be eg from a customer's authUrl server */
				self.complete(null, message);
			}
		};

		var timeout = (this.requestMode == _common_lib_transport_comettransport__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].REQ_SEND) ? this.timeouts.httpRequestTimeout : this.timeouts.recvTimeout;
		this.timer = setTimeout(function() { self.abort(); }, timeout);
		head.insertBefore(script, head.firstChild);
	};

	Request.prototype.complete = function(err, body, headers, statusCode) {
		headers = headers || {};
		if(!this.requestComplete) {
			this.requestComplete = true;
			var contentType;
			if(body) {
				contentType = (typeof(body) == 'string') ? 'text/plain' : 'application/json';
				headers['content-type'] = contentType;
				this.emit('data', body);
			}

			this.emit('complete', err, body, headers, /* unpacked: */ true, statusCode);
			this.dispose();
		}
	};

	Request.prototype.abort = function() {
		this.dispose();
	};

	Request.prototype.dispose = function() {
		var timer = this.timer;
		if(timer) {
			clearTimeout(timer);
			this.timer = null;
		}
		var script = this.script;
		if(script.parentNode) script.parentNode.removeChild(script);
		delete _[this.id];
		this.emit('disposed');
	};

	if(platform__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].jsonpSupported && !platform_http__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].Request) {
		platform_http__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].Request = function(method, rest, uri, headers, params, body, callback) {
			var req = createRequest(uri, headers, params, body, _common_lib_transport_comettransport__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].REQ_SEND, rest && rest.options.timeouts, method);
			req.once('complete', callback);
			_common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].nextTick(function() {
				req.exec();
			});
			return req;
		};

		platform_http__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].checkConnectivity = function(callback) {
			var upUrl = _common_lib_util_defaults__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].jsonpInternetUpUrl;

			if(checksInProgress) {
				checksInProgress.push(callback);
				return;
			}
			checksInProgress = [callback];
			_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, '(JSONP)Http.checkConnectivity()', 'Sending; ' + upUrl);

			var req = new Request('isTheInternetUp', upUrl, null, null, null, _common_lib_transport_comettransport__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].REQ_SEND, _common_lib_util_defaults__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].TIMEOUTS);
			req.once('complete', function(err, response) {
				var result = !err && response;
				_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].logAction(_common_lib_util_logger__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].LOG_MICRO, '(JSONP)Http.checkConnectivity()', 'Result: ' + result);
				for(var i = 0; i < checksInProgress.length; i++) checksInProgress[i](null, result);
				checksInProgress = null;
			});
			_common_lib_util_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].nextTick(function() {
				req.exec();
			});
		};
	}

	return JSONPTransport;
};

/* harmony default export */ __webpack_exports__["a"] = (JSONPTransport);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(20)))

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _util_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _transport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _util_defaults__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var _types_protocolmessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _types_errorinfo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2);








var WebSocketTransport = function(connectionManager) {
	var WebSocket = platform__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].WebSocket;
	var shortName = 'web_socket';

	/* public constructor */
	function WebSocketTransport(connectionManager, auth, params) {
		this.shortName = shortName;
		/* If is a browser, can't detect pings, so request protocol heartbeats */
		params.heartbeats = platform__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].useProtocolHeartbeats;
		_transport__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].call(this, connectionManager, auth, params);
		this.wsHost = _util_defaults__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].getHost(params.options, params.host, true);
	}
	_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].inherits(WebSocketTransport, _transport__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);

	WebSocketTransport.isAvailable = function() {
		return !!WebSocket;
	};

	if(WebSocketTransport.isAvailable())
		connectionManager.supportedTransports[shortName] = WebSocketTransport;

	WebSocketTransport.tryConnect = function(connectionManager, auth, params, callback) {
		var transport = new WebSocketTransport(connectionManager, auth, params);
		var errorCb = function(err) { callback({event: this.event, error: err}); };
		transport.on(['failed', 'disconnected'], errorCb);
		transport.on('wsopen', function() {
			_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].LOG_MINOR, 'WebSocketTransport.tryConnect()', 'viable transport ' + transport);
			transport.off(['failed', 'disconnected'], errorCb);
			callback(null, transport);
		});
		transport.connect();
	};

	WebSocketTransport.prototype.createWebSocket = function(uri, connectParams) {
		var paramCount = 0;
		if(connectParams) {
			for(var key in connectParams)
				uri += (paramCount++ ? '&' : '?') + key + '=' + connectParams[key];
		}
		this.uri = uri;
		return new WebSocket(uri);
	};

	WebSocketTransport.prototype.toString = function() {
		return 'WebSocketTransport; uri=' + this.uri;
	};

	WebSocketTransport.prototype.connect = function() {
		_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].LOG_MINOR, 'WebSocketTransport.connect()', 'starting');
		_transport__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].prototype.connect.call(this);
		var self = this, params = this.params, options = params.options;
		var wsScheme = options.tls ? 'wss://' : 'ws://';
		var wsUri = wsScheme + this.wsHost + ':' + _util_defaults__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].getPort(options) + '/';
		_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].LOG_MINOR, 'WebSocketTransport.connect()', 'uri: ' + wsUri);
		this.auth.getAuthParams(function(err, authParams) {
			if(self.isDisposed) {
				return;
			}
			var paramStr = ''; for(var param in authParams) paramStr += ' ' + param + ': ' + authParams[param] + ';';
			_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].LOG_MINOR, 'WebSocketTransport.connect()', 'authParams:' + paramStr + ' err: ' + err);
			if(err) {
				self.disconnect(err);
				return;
			}
			var connectParams = params.getConnectParams(authParams);
			try {
				var wsConnection = self.wsConnection = self.createWebSocket(wsUri, connectParams);
				wsConnection.binaryType = platform__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].binaryType;
				wsConnection.onopen = function() { self.onWsOpen(); };
				wsConnection.onclose = function(ev) { self.onWsClose(ev); };
				wsConnection.onmessage = function(ev) { self.onWsData(ev.data); };
				wsConnection.onerror = function(ev) { self.onWsError(ev); };
				if(wsConnection.on) {
					/* node; browsers currently don't have a general eventemitter and can't detect
					 * pings. Also, no need to reply with a pong explicitly, ws lib handles that */
					wsConnection.on('ping', function() { self.onActivity(); });
				}
			} catch(e) {
				_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].LOG_ERROR, 'WebSocketTransport.connect()', 'Unexpected exception creating websocket: err = ' + (e.stack || e.message));
				self.disconnect(e);
			}
		});
	};

	WebSocketTransport.prototype.send = function(message) {
		var wsConnection = this.wsConnection;
		if(!wsConnection) {
			_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].LOG_ERROR, 'WebSocketTransport.send()', 'No socket connection');
			return;
		}
		try {
			wsConnection.send(_types_protocolmessage__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].serialize(message, this.params.format));
		} catch (e) {
			var msg = 'Exception from ws connection when trying to send: ' + _util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].inspectError(e);
			_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].LOG_ERROR, 'WebSocketTransport.send()', msg);
			/* Don't try to request a disconnect, that'll just involve sending data
			 * down the websocket again. Just finish the transport. */
			this.finish('disconnected', new _types_errorinfo__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"](msg, 50000, 500));
		}
	};

	WebSocketTransport.prototype.onWsData = function(data) {
		_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].LOG_MICRO, 'WebSocketTransport.onWsData()', 'data received; length = ' + data.length + '; type = ' + typeof(data));
		try {
			this.onProtocolMessage(_types_protocolmessage__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].deserialize(data, this.format));
		} catch (e) {
			_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].LOG_ERROR, 'WebSocketTransport.onWsData()', 'Unexpected exception handing channel message: ' + e.stack);
		}
	};

	WebSocketTransport.prototype.onWsOpen = function() {
		_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].LOG_MINOR, 'WebSocketTransport.onWsOpen()', 'opened WebSocket');
		this.emit('wsopen');
	};

	WebSocketTransport.prototype.onWsClose = function(ev) {
		var wasClean, code, reason;
		if(typeof(ev) == 'object') {
			/* W3C spec-compatible */
			wasClean = ev.wasClean;
			code = ev.code;
		} else /*if(typeof(ev) == 'number')*/ {
			/* ws in node */
			code = ev;
			wasClean = (code == 1000);
		}
		delete this.wsConnection;
		if(wasClean) {
			_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].LOG_MINOR, 'WebSocketTransport.onWsClose()', 'Cleanly closed WebSocket');
			var err = new _types_errorinfo__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]('Websocket closed', 80003, 400);
			this.finish('disconnected', err);
		} else {
			var msg = 'Unclean disconnection of WebSocket ; code = ' + code,
				err = new _types_errorinfo__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"](msg, 80003, 400);
			_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].LOG_MINOR, 'WebSocketTransport.onWsClose()', msg);
			this.finish('disconnected', err);
		}
		this.emit('disposed');
	};

	WebSocketTransport.prototype.onWsError = function(err) {
		_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].LOG_MINOR, 'WebSocketTransport.onError()', 'Error from WebSocket: ' + err.message);
		/* Wait a tick before aborting: if the websocket was connected, this event
		 * will be immediately followed by an onclose event with a close code. Allow
		 * that to close it (so we see the close code) rather than anticipating it */
		var self = this;
		_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].nextTick(function() {
			self.disconnect(err);
		});
	};

	WebSocketTransport.prototype.dispose = function() {
		_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].LOG_MINOR, 'WebSocketTransport.dispose()', '');
		this.isDisposed = true;
		var wsConnection = this.wsConnection;
		if(wsConnection) {
			/* Ignore any messages that come through after dispose() is called but before
			 * websocket is actually closed. (mostly would be harmless, but if it's a
			 * CONNECTED, it'll re-tick isConnected and cause all sorts of havoc) */
			wsConnection.onmessage = function() {};
			delete this.wsConnection;
			/* defer until the next event loop cycle before closing the socket,
			 * giving some implementations the opportunity to send any outstanding close message */
			_util_utils__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].nextTick(function() {
				_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].logAction(_util_logger__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].LOG_MICRO, 'WebSocketTransport.dispose()', 'closing websocket');
				wsConnection.close();
			});
		}
	};

	return WebSocketTransport;
};

/* harmony default export */ __webpack_exports__["a"] = (WebSocketTransport);


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./browser/lib/transport/jsonptransport.js
var jsonptransport = __webpack_require__(39);

// EXTERNAL MODULE: ./common/lib/util/utils.js
var utils = __webpack_require__(1);

// EXTERNAL MODULE: ./common/lib/util/logger.js
var logger = __webpack_require__(0);

// EXTERNAL MODULE: ./browser/fragments/platform-browser.js
var platform_browser = __webpack_require__(3);

// EXTERNAL MODULE: ./common/lib/transport/comettransport.js
var comettransport = __webpack_require__(15);

// EXTERNAL MODULE: ./browser/lib/transport/xhrrequest.js
var xhrrequest = __webpack_require__(27);

// CONCATENATED MODULE: ./browser/lib/transport/xhrpollingtransport.js






var xhrpollingtransport_XHRPollingTransport = function(connectionManager) {
	var shortName = 'xhr_polling';

	function XHRPollingTransport(connectionManager, auth, params) {
		params.stream = false;
		comettransport["a" /* default */].call(this, connectionManager, auth, params);
		this.shortName = shortName;
	}
	utils["a" /* default */].inherits(XHRPollingTransport, comettransport["a" /* default */]);

	XHRPollingTransport.isAvailable = function() {
		return platform_browser["a" /* default */].xhrSupported && platform_browser["a" /* default */].allowComet;
	};

	XHRPollingTransport.tryConnect = function(connectionManager, auth, params, callback) {
		var transport = new XHRPollingTransport(connectionManager, auth, params);
		var errorCb = function(err) { callback({event: this.event, error: err}); };
		transport.on(['failed', 'disconnected'], errorCb);
		transport.on('preconnect', function() {
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'XHRPollingTransport.tryConnect()', 'viable transport ' + transport);
			transport.off(['failed', 'disconnected'], errorCb);
			callback(null, transport);
		});
		transport.connect();
	};

	XHRPollingTransport.prototype.toString = function() {
		return 'XHRPollingTransport; uri=' + this.baseUri + '; isConnected=' + this.isConnected;
	};

	XHRPollingTransport.prototype.createRequest = function(uri, headers, params, body, requestMode) {
		return xhrrequest["a" /* default */].createRequest(uri, headers, params, body, requestMode, this.timeouts);
	};

	if(typeof(connectionManager) !== 'undefined' && XHRPollingTransport.isAvailable()) {
		connectionManager.supportedTransports[shortName] = XHRPollingTransport;
	}

	return XHRPollingTransport;
};

/* harmony default export */ var xhrpollingtransport = (xhrpollingtransport_XHRPollingTransport);

// CONCATENATED MODULE: ./browser/lib/transport/xhrstreamingtransport.js






var xhrstreamingtransport_XHRStreamingTransport = function(connectionManager) {
	var shortName = 'xhr_streaming';

	/* public constructor */
	function XHRStreamingTransport(connectionManager, auth, params) {
		comettransport["a" /* default */].call(this, connectionManager, auth, params);
		this.shortName = shortName;
	}
	utils["a" /* default */].inherits(XHRStreamingTransport, comettransport["a" /* default */]);

	XHRStreamingTransport.isAvailable = function() {
		return platform_browser["a" /* default */].xhrSupported && platform_browser["a" /* default */].streamingSupported && platform_browser["a" /* default */].allowComet;
	};

	XHRStreamingTransport.tryConnect = function(connectionManager, auth, params, callback) {
		var transport = new XHRStreamingTransport(connectionManager, auth, params);
		var errorCb = function(err) { callback({event: this.event, error: err}); };
		transport.on(['failed', 'disconnected'], errorCb);
		transport.on('preconnect', function() {
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'XHRStreamingTransport.tryConnect()', 'viable transport ' + transport);
			transport.off(['failed', 'disconnected'], errorCb);
			callback(null, transport);
		});
		transport.connect();
	};

	XHRStreamingTransport.prototype.toString = function() {
		return 'XHRStreamingTransport; uri=' + this.baseUri + '; isConnected=' + this.isConnected;
	};

	XHRStreamingTransport.prototype.createRequest = function(uri, headers, params, body, requestMode) {
		return xhrrequest["a" /* default */].createRequest(uri, headers, params, body, requestMode, this.timeouts);
	};

	if(typeof(connectionManager) !== 'undefined' && XHRStreamingTransport.isAvailable()) {
		connectionManager.supportedTransports[shortName] = XHRStreamingTransport;
	}

	return XHRStreamingTransport;
};

/* harmony default export */ var xhrstreamingtransport = (xhrstreamingtransport_XHRStreamingTransport);

// CONCATENATED MODULE: ./browser/lib/transport/index.js




/* harmony default export */ var lib_transport = __webpack_exports__["a"] = ([
  jsonptransport["a" /* default */],
  xhrpollingtransport,
  xhrstreamingtransport
]);


/***/ }),
/* 42 */
/***/ (function(module, exports) {



/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(12));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * UTF-16 BE encoding strategy.
	     */
	    var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
	        /**
	         * Converts a word array to a UTF-16 BE string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-16 BE string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var utf16Chars = [];
	            for (var i = 0; i < sigBytes; i += 2) {
	                var codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
	                utf16Chars.push(String.fromCharCode(codePoint));
	            }

	            return utf16Chars.join('');
	        },

	        /**
	         * Converts a UTF-16 BE string to a word array.
	         *
	         * @param {string} utf16Str The UTF-16 BE string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
	         */
	        parse: function (utf16Str) {
	            // Shortcut
	            var utf16StrLength = utf16Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < utf16StrLength; i++) {
	                words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
	            }

	            return WordArray.create(words, utf16StrLength * 2);
	        }
	    };

	    /**
	     * UTF-16 LE encoding strategy.
	     */
	    C_enc.Utf16LE = {
	        /**
	         * Converts a word array to a UTF-16 LE string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-16 LE string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var utf16Chars = [];
	            for (var i = 0; i < sigBytes; i += 2) {
	                var codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
	                utf16Chars.push(String.fromCharCode(codePoint));
	            }

	            return utf16Chars.join('');
	        },

	        /**
	         * Converts a UTF-16 LE string to a word array.
	         *
	         * @param {string} utf16Str The UTF-16 LE string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
	         */
	        parse: function (utf16Str) {
	            // Shortcut
	            var utf16StrLength = utf16Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < utf16StrLength; i++) {
	                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
	            }

	            return WordArray.create(words, utf16StrLength * 2);
	        }
	    };

	    function swapEndian(word) {
	        return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
	    }
	}());


	return CryptoJS.enc.Utf16;

}));

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(12), __webpack_require__(31));
	}
	else {}
}(this, function (CryptoJS) {

	(function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var CipherParams = C_lib.CipherParams;
	    var C_enc = C.enc;
	    var Hex = C_enc.Hex;
	    var C_format = C.format;

	    var HexFormatter = C_format.Hex = {
	        /**
	         * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
	         *
	         * @param {CipherParams} cipherParams The cipher params object.
	         *
	         * @return {string} The hexadecimally encoded string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
	         */
	        stringify: function (cipherParams) {
	            return cipherParams.ciphertext.toString(Hex);
	        },

	        /**
	         * Converts a hexadecimally encoded ciphertext string to a cipher params object.
	         *
	         * @param {string} input The hexadecimally encoded string.
	         *
	         * @return {CipherParams} The cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
	         */
	        parse: function (input) {
	            var ciphertext = Hex.parse(input);
	            return CipherParams.create({ ciphertext: ciphertext });
	        }
	    };
	}());


	return CryptoJS.format.Hex;

}));

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(12), __webpack_require__(17), __webpack_require__(46), __webpack_require__(30), __webpack_require__(31));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var BlockCipher = C_lib.BlockCipher;
	    var C_algo = C.algo;

	    // Lookup tables
	    var SBOX = [];
	    var INV_SBOX = [];
	    var SUB_MIX_0 = [];
	    var SUB_MIX_1 = [];
	    var SUB_MIX_2 = [];
	    var SUB_MIX_3 = [];
	    var INV_SUB_MIX_0 = [];
	    var INV_SUB_MIX_1 = [];
	    var INV_SUB_MIX_2 = [];
	    var INV_SUB_MIX_3 = [];

	    // Compute lookup tables
	    (function () {
	        // Compute double table
	        var d = [];
	        for (var i = 0; i < 256; i++) {
	            if (i < 128) {
	                d[i] = i << 1;
	            } else {
	                d[i] = (i << 1) ^ 0x11b;
	            }
	        }

	        // Walk GF(2^8)
	        var x = 0;
	        var xi = 0;
	        for (var i = 0; i < 256; i++) {
	            // Compute sbox
	            var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
	            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
	            SBOX[x] = sx;
	            INV_SBOX[sx] = x;

	            // Compute multiplication
	            var x2 = d[x];
	            var x4 = d[x2];
	            var x8 = d[x4];

	            // Compute sub bytes, mix columns tables
	            var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
	            SUB_MIX_0[x] = (t << 24) | (t >>> 8);
	            SUB_MIX_1[x] = (t << 16) | (t >>> 16);
	            SUB_MIX_2[x] = (t << 8)  | (t >>> 24);
	            SUB_MIX_3[x] = t;

	            // Compute inv sub bytes, inv mix columns tables
	            var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
	            INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
	            INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
	            INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);
	            INV_SUB_MIX_3[sx] = t;

	            // Compute next counter
	            if (!x) {
	                x = xi = 1;
	            } else {
	                x = x2 ^ d[d[d[x8 ^ x2]]];
	                xi ^= d[d[xi]];
	            }
	        }
	    }());

	    // Precomputed Rcon lookup
	    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

	    /**
	     * AES block cipher algorithm.
	     */
	    var AES = C_algo.AES = BlockCipher.extend({
	        _doReset: function () {
	            var t;

	            // Skip reset of nRounds has been set before and key did not change
	            if (this._nRounds && this._keyPriorReset === this._key) {
	                return;
	            }

	            // Shortcuts
	            var key = this._keyPriorReset = this._key;
	            var keyWords = key.words;
	            var keySize = key.sigBytes / 4;

	            // Compute number of rounds
	            var nRounds = this._nRounds = keySize + 6;

	            // Compute number of key schedule rows
	            var ksRows = (nRounds + 1) * 4;

	            // Compute key schedule
	            var keySchedule = this._keySchedule = [];
	            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
	                if (ksRow < keySize) {
	                    keySchedule[ksRow] = keyWords[ksRow];
	                } else {
	                    t = keySchedule[ksRow - 1];

	                    if (!(ksRow % keySize)) {
	                        // Rot word
	                        t = (t << 8) | (t >>> 24);

	                        // Sub word
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];

	                        // Mix Rcon
	                        t ^= RCON[(ksRow / keySize) | 0] << 24;
	                    } else if (keySize > 6 && ksRow % keySize == 4) {
	                        // Sub word
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
	                    }

	                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
	                }
	            }

	            // Compute inv key schedule
	            var invKeySchedule = this._invKeySchedule = [];
	            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
	                var ksRow = ksRows - invKsRow;

	                if (invKsRow % 4) {
	                    var t = keySchedule[ksRow];
	                } else {
	                    var t = keySchedule[ksRow - 4];
	                }

	                if (invKsRow < 4 || ksRow <= 4) {
	                    invKeySchedule[invKsRow] = t;
	                } else {
	                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
	                                               INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
	                }
	            }
	        },

	        encryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
	        },

	        decryptBlock: function (M, offset) {
	            // Swap 2nd and 4th rows
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;

	            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

	            // Inv swap 2nd and 4th rows
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;
	        },

	        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
	            // Shortcut
	            var nRounds = this._nRounds;

	            // Get input, add round key
	            var s0 = M[offset]     ^ keySchedule[0];
	            var s1 = M[offset + 1] ^ keySchedule[1];
	            var s2 = M[offset + 2] ^ keySchedule[2];
	            var s3 = M[offset + 3] ^ keySchedule[3];

	            // Key schedule row counter
	            var ksRow = 4;

	            // Rounds
	            for (var round = 1; round < nRounds; round++) {
	                // Shift rows, sub bytes, mix columns, add round key
	                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
	                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
	                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
	                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

	                // Update state
	                s0 = t0;
	                s1 = t1;
	                s2 = t2;
	                s3 = t3;
	            }

	            // Shift rows, sub bytes, add round key
	            var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
	            var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
	            var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
	            var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

	            // Set output
	            M[offset]     = t0;
	            M[offset + 1] = t1;
	            M[offset + 2] = t2;
	            M[offset + 3] = t3;
	        },

	        keySize: 256/32
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
	     */
	    C.AES = BlockCipher._createHelper(AES);
	}());


	return CryptoJS.AES;

}));

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(12));
	}
	else {}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var T = [];

	    // Compute constants
	    (function () {
	        for (var i = 0; i < 64; i++) {
	            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
	        }
	    }());

	    /**
	     * MD5 hash algorithm.
	     */
	    var MD5 = C_algo.MD5 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }

	            // Shortcuts
	            var H = this._hash.words;

	            var M_offset_0  = M[offset + 0];
	            var M_offset_1  = M[offset + 1];
	            var M_offset_2  = M[offset + 2];
	            var M_offset_3  = M[offset + 3];
	            var M_offset_4  = M[offset + 4];
	            var M_offset_5  = M[offset + 5];
	            var M_offset_6  = M[offset + 6];
	            var M_offset_7  = M[offset + 7];
	            var M_offset_8  = M[offset + 8];
	            var M_offset_9  = M[offset + 9];
	            var M_offset_10 = M[offset + 10];
	            var M_offset_11 = M[offset + 11];
	            var M_offset_12 = M[offset + 12];
	            var M_offset_13 = M[offset + 13];
	            var M_offset_14 = M[offset + 14];
	            var M_offset_15 = M[offset + 15];

	            // Working varialbes
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];

	            // Computation
	            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
	            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
	            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
	            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
	            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
	            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
	            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
	            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
	            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
	            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
	            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
	            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
	            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
	            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
	            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
	            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

	            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
	            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
	            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
	            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
	            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
	            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
	            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
	            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
	            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
	            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
	            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
	            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
	            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
	            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
	            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
	            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

	            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
	            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
	            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
	            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
	            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
	            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
	            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
	            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
	            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
	            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
	            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
	            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
	            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
	            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
	            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
	            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

	            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
	            d = II(d, a, b, c, M_offset_7,  10, T[49]);
	            c = II(c, d, a, b, M_offset_14, 15, T[50]);
	            b = II(b, c, d, a, M_offset_5,  21, T[51]);
	            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
	            d = II(d, a, b, c, M_offset_3,  10, T[53]);
	            c = II(c, d, a, b, M_offset_10, 15, T[54]);
	            b = II(b, c, d, a, M_offset_1,  21, T[55]);
	            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
	            d = II(d, a, b, c, M_offset_15, 10, T[57]);
	            c = II(c, d, a, b, M_offset_6,  15, T[58]);
	            b = II(b, c, d, a, M_offset_13, 21, T[59]);
	            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
	            d = II(d, a, b, c, M_offset_11, 10, T[61]);
	            c = II(c, d, a, b, M_offset_2,  15, T[62]);
	            b = II(b, c, d, a, M_offset_9,  21, T[63]);

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

	            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
	            var nBitsTotalL = nBitsTotal;
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
	                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
	            );
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
	            );

	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                // Shortcut
	                var H_i = H[i];

	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    function FF(a, b, c, d, x, s, t) {
	        var n = a + ((b & c) | (~b & d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function GG(a, b, c, d, x, s, t) {
	        var n = a + ((b & d) | (c & ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function HH(a, b, c, d, x, s, t) {
	        var n = a + (b ^ c ^ d) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function II(a, b, c, d, x, s, t) {
	        var n = a + (c ^ (b | ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.MD5('message');
	     *     var hash = CryptoJS.MD5(wordArray);
	     */
	    C.MD5 = Hasher._createHelper(MD5);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacMD5(message, key);
	     */
	    C.HmacMD5 = Hasher._createHmacHelper(MD5);
	}(Math));


	return CryptoJS.MD5;

}));

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./browser/fragments/platform-browser.js
var platform_browser = __webpack_require__(3);

// EXTERNAL MODULE: ./common/lib/util/utils.js
var utils = __webpack_require__(1);

// EXTERNAL MODULE: ./common/lib/util/logger.js
var logger = __webpack_require__(0);

// EXTERNAL MODULE: ./common/lib/util/defaults.js + 1 modules
var defaults = __webpack_require__(5);

// EXTERNAL MODULE: ./common/lib/client/auth.js + 1 modules
var auth = __webpack_require__(14);

// CONCATENATED MODULE: ./common/lib/types/devicedetails.js


var devicedetails_DeviceDetails = (function() {

	function DeviceDetails() {
		this.id = undefined;
		this.deviceSecret = undefined;
		this.platform = undefined;
		this.formFactor = undefined;
		this.clientId = undefined;
		this.metadata = undefined;
		this.deviceIdentityToken = undefined;
		this.push = {
			recipient: undefined,
			state: undefined,
			error: undefined
		};
	}

	/**
	 * Overload toJSON() to intercept JSON.stringify()
	 * @return {*}
	 */
	DeviceDetails.prototype.toJSON = function() {
		return {
			id: this.id,
			deviceSecret: this.deviceSecret,
			platform: this.platform,
			formFactor: this.formFactor,
			clientId: this.clientId,
			metadata: this.metadata,
			deviceIdentityToken: this.deviceIdentityToken,
			push: {
				recipient: this.push.recipient,
				state: this.push.state,
				error: this.push.error
			}
		};
	};

	DeviceDetails.prototype.toString = function() {
		var result = '[DeviceDetails';
		if(this.id)
			result += '; id=' + this.id;
		if(this.platform)
			result += '; platform=' + this.platform;
		if(this.formFactor)
			result += '; formFactor=' + this.formFactor;
		if(this.clientId)
			result += '; clientId=' + this.clientId;
		if(this.metadata)
			result += '; metadata=' + this.metadata;
		if(this.deviceIdentityToken)
			result += '; deviceIdentityToken=' + JSON.stringify(this.deviceIdentityToken);
		if(this.push.recipient)
			result += '; push.recipient=' + JSON.stringify(this.push.recipient);
		if(this.push.state)
			result += '; push.state=' + this.push.state;
		if(this.push.error)
			result += '; push.error=' + JSON.stringify(this.push.error);
		if(this.push.metadata)
			result += '; push.metadata=' + this.push.metadata;
		result += ']';
		return result;
	};

	DeviceDetails.toRequestBody = utils["a" /* default */].encodeBody;

	DeviceDetails.fromResponseBody = function(body, format) {
		if(format) {
			body = utils["a" /* default */].decodeBody(body, format);
		}

		if(utils["a" /* default */].isArray(body)) {
			return DeviceDetails.fromValuesArray(body);
		} else {
			return DeviceDetails.fromValues(body);
		}
	};

	DeviceDetails.fromValues = function(values) {
		values.error = values.error && ErrorInfo.fromValues(values.error); 
		return utils["a" /* default */].mixin(new DeviceDetails(), values);
	};

	DeviceDetails.fromValuesArray = function(values) {
		var count = values.length, result = new Array(count);
		for(var i = 0; i < count; i++) result[i] = DeviceDetails.fromValues(values[i]);
		return result;
	};

	return DeviceDetails;
})();

/* harmony default export */ var devicedetails = (devicedetails_DeviceDetails);

// EXTERNAL MODULE: ./browser/lib/util/http.js
var http = __webpack_require__(6);

// EXTERNAL MODULE: ./browser/lib/util/bufferutils.js
var bufferutils = __webpack_require__(4);

// CONCATENATED MODULE: ./common/lib/client/resource.js







var resource_Resource = (function() {
	var msgpack = platform_browser["a" /* default */].msgpack;

	function Resource() {}

	function withAuthDetails(rest, headers, params, errCallback, opCallback) {
		if (http["a" /* default */].supportsAuthHeaders) {
			rest.auth.getAuthHeaders(function(err, authHeaders) {
				if(err)
					errCallback(err);
				else
					opCallback(utils["a" /* default */].mixin(authHeaders, headers), params);
			});
		} else {
			rest.auth.getAuthParams(function(err, authParams) {
				if(err)
					errCallback(err);
				else
					opCallback(headers, utils["a" /* default */].mixin(authParams, params));
			});
		}
	}

	function unenvelope(callback, format) {
		return function(err, body, outerHeaders, unpacked, outerStatusCode) {
			if(err && !body) {
				callback(err);
				return;
			}

			if(!unpacked) {
				try {
					body = utils["a" /* default */].decodeBody(body, format);
				} catch(e) {
					callback(e);
					return;
				}
			}

			if(body.statusCode === undefined) {
				/* Envelope already unwrapped by the transport */
				callback(err, body, outerHeaders, true, outerStatusCode);
				return;
			}

			var wrappedStatusCode = body.statusCode,
				response = body.response,
				wrappedHeaders = body.headers;

			if(wrappedStatusCode < 200 || wrappedStatusCode >= 300) {
				/* handle wrapped errors */
				var wrappedErr = (response && response.error) || err;
				if(!wrappedErr) {
					wrappedErr = new Error("Error in unenveloping " + body);
					wrappedErr.statusCode = wrappedStatusCode;
				}
				callback(wrappedErr, response, wrappedHeaders, true, wrappedStatusCode);
				return;
			}

			callback(err, response, wrappedHeaders, true, wrappedStatusCode);
		};
	}

	function paramString(params) {
		var paramPairs = [];
		if (params) {
			for (var needle in params) {
				paramPairs.push(needle + '=' + params[needle]);
			}
		}
		return paramPairs.join('&');
	}

	function urlFromPathAndParams(path, params) {
		return path + (params ? '?' : '') + paramString(params);
	}

	function logResponseHandler(callback, method, path, params) {
		return function(err, body, headers, unpacked, statusCode) {
			if (err) {
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'Resource.' + method + '()', 'Received Error; ' + urlFromPathAndParams(path, params) + '; Error: ' + utils["a" /* default */].inspectError(err));
			} else {
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'Resource.' + method + '()',
					'Received; ' + urlFromPathAndParams(path, params) + '; Headers: ' + paramString(headers) + '; StatusCode: ' + statusCode + '; Body: ' + (bufferutils["a" /* default */].isBuffer(body) ? body.toString() : body));
			}
			if (callback) { callback(err, body, headers, unpacked, statusCode); }
		}
	}

	utils["a" /* default */].arrForEach(http["a" /* default */].methodsWithoutBody, function(method) {
		Resource[method] = function(rest, path, origheaders, origparams, envelope, callback) {
			Resource['do'](method, rest, path, null, origheaders, origparams, envelope, callback);
		};
	});

	utils["a" /* default */].arrForEach(http["a" /* default */].methodsWithBody, function(method) {
		Resource[method] = function(rest, path, body, origheaders, origparams, envelope, callback) {
			Resource['do'](method, rest, path, body, origheaders, origparams, envelope, callback);
		};
	});

	Resource['do'] = function(method, rest, path, body, origheaders, origparams, envelope, callback) {
		if (logger["a" /* default */].shouldLog(logger["a" /* default */].LOG_MICRO)) {
			callback = logResponseHandler(callback, method, path, origparams);
		}

		if(envelope) {
			callback = (callback && unenvelope(callback, envelope));
			(origparams = (origparams || {}))['envelope'] = envelope;
		}

		function doRequest(headers, params) {
			if (logger["a" /* default */].shouldLog(logger["a" /* default */].LOG_MICRO)) {
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'Resource.' + method + '()', 'Sending; ' + urlFromPathAndParams(path, params));
			}

			var args = [rest, path, headers, body, params, function(err, res, headers, unpacked, statusCode) {
				if(err && auth["a" /* default */].isTokenErr(err)) {
					/* token has expired, so get a new one */
					rest.auth.authorize(null, null, function(err) {
						if(err) {
							callback(err);
							return;
						}
						/* retry ... */
						withAuthDetails(rest, origheaders, origparams, callback, doRequest);
					});
					return;
				}
				callback(err, res, headers, unpacked, statusCode);
			}];
			if (!body) {
				args.splice(3, 1);
			}

			if (logger["a" /* default */].shouldLog(logger["a" /* default */].LOG_MICRO)) {
				var decodedBody = body;
				if ((headers['content-type'] || '').indexOf('msgpack') > 0) {
					try {
						decodedBody = msgpack.decode(body);
					} catch (decodeErr) {
						logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'Resource.' + method + '()', 'Sending MsgPack Decoding Error: ' + utils["a" /* default */].inspectError(decodeErr));
					}
				}
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'Resource.' + method + '()', 'Sending; ' + urlFromPathAndParams(path, params) + '; Body: ' + decodedBody);
			}
			http["a" /* default */][method].apply(this, args);
		}

		withAuthDetails(rest, origheaders, origparams, callback, doRequest);
	};

	return Resource;
})();

/* harmony default export */ var client_resource = (resource_Resource);

// CONCATENATED MODULE: ./common/lib/client/paginatedresource.js





var paginatedresource_PaginatedResource = (function() {

	function getRelParams(linkUrl) {
		var urlMatch = linkUrl.match(/^\.\/(\w+)\?(.*)$/);
		return urlMatch && utils["a" /* default */].parseQueryString(urlMatch[2]);
	}

	function parseRelLinks(linkHeader) {
		if(typeof(linkHeader) == 'string')
			linkHeader = linkHeader.split(',');

		var relParams = {};
		for(var i = 0; i < linkHeader.length; i++) {
			var linkMatch = linkHeader[i].match(/^\s*<(.+)>;\s*rel="(\w+)"$/);
			if(linkMatch) {
				var params = getRelParams(linkMatch[1]);
				if(params)
					relParams[linkMatch[2]] = params;
			}
		}
		return relParams;
	}

	function PaginatedResource(rest, path, headers, envelope, bodyHandler, useHttpPaginatedResponse) {
		this.rest = rest;
		this.path = path;
		this.headers = headers;
		this.envelope = envelope;
		this.bodyHandler = bodyHandler;
		this.useHttpPaginatedResponse = useHttpPaginatedResponse || false;
	}

	utils["a" /* default */].arrForEach(http["a" /* default */].methodsWithoutBody, function(method) {
		PaginatedResource.prototype[method] = function(params, callback) {
			var self = this;
			client_resource[method](self.rest, self.path, self.headers, params, self.envelope, function(err, body, headers, unpacked, statusCode) {
				self.handlePage(err, body, headers, unpacked, statusCode, callback);
			});
		};
	})

	utils["a" /* default */].arrForEach(http["a" /* default */].methodsWithBody, function(method) {
		PaginatedResource.prototype[method] = function(params, body, callback) {
			var self = this;
			client_resource[method](self.rest, self.path, body, self.headers, params, self.envelope, function(err, resbody, headers, unpacked, statusCode) {
				if(callback) {
					self.handlePage(err, resbody, headers, unpacked, statusCode, callback);
				}
			});
		};
	});

	function returnErrOnly(err, body, useHPR) {
		/* If using httpPaginatedResponse, errors from Ably are returned as part of
		 * the HPR, only do callback(err) for network errors etc. which don't
		 * return a body and/or have no ably-originated error code (non-numeric
		 * error codes originate from node) */
		return !(useHPR && (body || typeof err.code === 'number'));
	}

	PaginatedResource.prototype.handlePage = function(err, body, headers, unpacked, statusCode, callback) {
		if(err && returnErrOnly(err, body, this.useHttpPaginatedResponse)) {
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'PaginatedResource.handlePage()', 'Unexpected error getting resource: err = ' + utils["a" /* default */].inspectError(err));
			callback(err);
			return;
		}
		var items, linkHeader, relParams;
		try {
			items = this.bodyHandler(body, headers, unpacked);
		} catch(e) {
			/* If we got an error, the failure to parse the body is almost certainly
			 * due to that, so cb with that in preference to the parse error */
			callback(err || e);
			return;
		}

		if(headers && (linkHeader = (headers['Link'] || headers['link']))) {
			relParams = parseRelLinks(linkHeader);
		}

		if(this.useHttpPaginatedResponse) {
			callback(null, new HttpPaginatedResponse(this, items, headers, statusCode, relParams, err));
		} else {
			callback(null, new PaginatedResult(this, items, relParams));
		}
	};

	function PaginatedResult(resource, items, relParams) {
		this.resource = resource;
		this.items = items;

		if(relParams) {
			var self = this;
			if('first' in relParams) {
				this.first = function(cb) {
					if(!cb && self.resource.rest.options.promises) {
						return utils["a" /* default */].promisify(self, 'first', []);
					}
					self.get(relParams.first, cb);
				};
			}
			if('current' in relParams) {
				this.current = function(cb) {
					if(!cb && self.resource.rest.options.promises) {
						return utils["a" /* default */].promisify(self, 'current', []);
					}
					self.get(relParams.current, cb);
				};
			}
			this.next = function(cb) {
				if(!cb && self.resource.rest.options.promises) {
					return utils["a" /* default */].promisify(self, 'next', []);
				}
				if('next' in relParams) {
					self.get(relParams.next, cb);
				} else {
					cb(null, null);
				}
			};

			this.hasNext = function() { return ('next' in relParams) };
			this.isLast = function() { return !this.hasNext(); }
		}
	}

	/* We assume that only the initial request can be a POST, and that accessing
	 * the rest of a multipage set of results can always be done with GET */
	PaginatedResult.prototype.get = function(params, callback) {
		var res = this.resource;
		client_resource.get(res.rest, res.path, res.headers, params, res.envelope, function(err, body, headers, unpacked, statusCode) {
			res.handlePage(err, body, headers, unpacked, statusCode, callback);
		});
	};

	function HttpPaginatedResponse(resource, items, headers, statusCode, relParams, err) {
		PaginatedResult.call(this, resource, items, relParams);
		this.statusCode = statusCode;
		this.success = statusCode < 300 && statusCode >= 200;
		this.headers = headers;
		this.errorCode = err && err.code;
		this.errorMessage = err && err.message;
	}
	utils["a" /* default */].inherits(HttpPaginatedResponse, PaginatedResult);

	return PaginatedResource;
})();

/* harmony default export */ var paginatedresource = (paginatedresource_PaginatedResource);

// EXTERNAL MODULE: ./common/lib/types/errorinfo.js
var errorinfo = __webpack_require__(2);

// CONCATENATED MODULE: ./common/lib/types/pushchannelsubscription.js


var pushchannelsubscription_PushChannelSubscription = (function() {

	function PushChannelSubscription() {
		this.channel = undefined;
		this.deviceId = undefined;
		this.clientId = undefined;
	}

	/**
	 * Overload toJSON() to intercept JSON.stringify()
	 * @return {*}
	 */
	PushChannelSubscription.prototype.toJSON = function() {
		return {
			channel: this.channel,
			deviceId: this.deviceId,
			clientId: this.clientId
		};
	};

	PushChannelSubscription.prototype.toString = function() {
		var result = '[PushChannelSubscription';
		if(this.channel)
			result += '; channel=' + this.channel;
		if(this.deviceId)
			result += '; deviceId=' + this.deviceId;
		if(this.clientId)
			result += '; clientId=' + this.clientId;
		result += ']';
		return result;
	};

	PushChannelSubscription.toRequestBody = utils["a" /* default */].encodeBody;

	PushChannelSubscription.fromResponseBody = function(body, format) {
		if(format) {
			body = utils["a" /* default */].decodeBody(body, format);
		}

		if(utils["a" /* default */].isArray(body)) {
			return PushChannelSubscription.fromValuesArray(body);
		} else {
			return PushChannelSubscription.fromValues(body);
		}
	};

	PushChannelSubscription.fromValues = function(values) {
		return utils["a" /* default */].mixin(new PushChannelSubscription(), values);
	};

	PushChannelSubscription.fromValuesArray = function(values) {
		var count = values.length, result = new Array(count);
		for(var i = 0; i < count; i++) result[i] = PushChannelSubscription.fromValues(values[i]);
		return result;
	};

	return PushChannelSubscription;
})();

/* harmony default export */ var pushchannelsubscription = (pushchannelsubscription_PushChannelSubscription);

// CONCATENATED MODULE: ./common/lib/client/push.js








var push_Push = (function() {
	var noop = function() {};

	function Push(rest) {
		this.rest = rest;
		this.admin = new Admin(rest);
	}

	function Admin(rest) {
		this.rest = rest;
		this.deviceRegistrations = new DeviceRegistrations(rest);
		this.channelSubscriptions = new ChannelSubscriptions(rest);
	}

	Admin.prototype.publish = function(recipient, payload, callback) {
		var rest = this.rest;
		var format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
			requestBody = utils["a" /* default */].mixin({recipient: recipient}, payload),
			headers = utils["a" /* default */].defaultPostHeaders(format),
			params = {};

		if(typeof callback !== 'function') {
			if(this.rest.options.promises) {
				return utils["a" /* default */].promisify(this, 'publish', arguments);
			}
			callback = noop;
		}

		if(rest.options.headers)
			utils["a" /* default */].mixin(headers, rest.options.headers);

		if(rest.options.pushFullWait)
			utils["a" /* default */].mixin(params, {fullWait: 'true'});

		requestBody = utils["a" /* default */].encodeBody(requestBody, format);
		client_resource.post(rest, '/push/publish', requestBody, headers, params, false, function(err) { callback(err); });
	};

	function DeviceRegistrations(rest) {
		this.rest = rest;
	}

	DeviceRegistrations.prototype.save = function(device, callback) {
		var rest = this.rest;
		var format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
			requestBody = devicedetails.fromValues(device),
			headers = utils["a" /* default */].defaultPostHeaders(format),
			params = {};

		if(typeof callback !== 'function') {
			if(this.rest.options.promises) {
				return utils["a" /* default */].promisify(this, 'save', arguments);
			}
			callback = noop;
		}

		if(rest.options.headers)
			utils["a" /* default */].mixin(headers, rest.options.headers);

		if(rest.options.pushFullWait)
			utils["a" /* default */].mixin(params, {fullWait: 'true'});

		requestBody = utils["a" /* default */].encodeBody(requestBody, format);
		client_resource.put(rest, '/push/deviceRegistrations/' + encodeURIComponent(device.id), requestBody, headers, params, false, function(err, body, headers, unpacked) {
			callback(err, !err && devicedetails.fromResponseBody(body, !unpacked && format));
		});
	};

	DeviceRegistrations.prototype.get = function(deviceIdOrDetails, callback) {
		var rest = this.rest,
			format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
			headers = utils["a" /* default */].defaultGetHeaders(format),
			deviceId = deviceIdOrDetails.id || deviceIdOrDetails;

		if(typeof callback !== 'function') {
			if(this.rest.options.promises) {
				return utils["a" /* default */].promisify(this, 'get', arguments);
			}
			callback = noop;
		}

		if(typeof deviceId !== 'string' || !deviceId.length) {
			callback(new errorinfo["a" /* default */]('First argument to DeviceRegistrations#get must be a deviceId string or DeviceDetails', 40000, 400));
			return;
		}

		if(rest.options.headers)
			utils["a" /* default */].mixin(headers, rest.options.headers);

		client_resource.get(rest, '/push/deviceRegistrations/' + encodeURIComponent(deviceId), headers, {}, false, function(err, body, headers, unpacked) {
			callback(err, !err && devicedetails.fromResponseBody(body, !unpacked && format));
		});
	};

	DeviceRegistrations.prototype.list = function(params, callback) {
		var rest = this.rest,
			format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
			envelope = http["a" /* default */].supportsLinkHeaders ? undefined : format,
			headers = utils["a" /* default */].defaultGetHeaders(format);

		if(typeof callback !== 'function') {
			if(this.rest.options.promises) {
				return utils["a" /* default */].promisify(this, 'list', arguments);
			}
			callback = noop;
		}

		if(rest.options.headers)
			utils["a" /* default */].mixin(headers, rest.options.headers);

		(new paginatedresource(rest, '/push/deviceRegistrations', headers, envelope, function(body, headers, unpacked) {
			return devicedetails.fromResponseBody(body, !unpacked && format);
		})).get(params, callback);
	};

	DeviceRegistrations.prototype.remove = function(deviceIdOrDetails, callback) {
		var rest = this.rest,
			format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
			headers = utils["a" /* default */].defaultGetHeaders(format),
			params = {},
			deviceId = deviceIdOrDetails.id || deviceIdOrDetails;

		if(typeof callback !== 'function') {
			if(this.rest.options.promises) {
				return utils["a" /* default */].promisify(this, 'remove', arguments);
			}
			callback = noop;
		}

		if(typeof deviceId !== 'string' || !deviceId.length) {
			callback(new errorinfo["a" /* default */]('First argument to DeviceRegistrations#remove must be a deviceId string or DeviceDetails', 40000, 400));
			return;
		}

		if(rest.options.headers)
			utils["a" /* default */].mixin(headers, rest.options.headers);

		if(rest.options.pushFullWait)
			utils["a" /* default */].mixin(params, {fullWait: 'true'});

		client_resource['delete'](rest, '/push/deviceRegistrations/' + encodeURIComponent(deviceId), headers, params, false, function(err) { callback(err); });
	};

	DeviceRegistrations.prototype.removeWhere = function(params, callback) {
		var rest = this.rest,
			format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
			headers = utils["a" /* default */].defaultGetHeaders(format);

		if(typeof callback !== 'function') {
			if(this.rest.options.promises) {
				return utils["a" /* default */].promisify(this, 'removeWhere', arguments);
			}
			callback = noop;
		}

		if(rest.options.headers)
			utils["a" /* default */].mixin(headers, rest.options.headers);

		if(rest.options.pushFullWait)
			utils["a" /* default */].mixin(params, {fullWait: 'true'});

		client_resource['delete'](rest, '/push/deviceRegistrations', headers, params, false, function(err) { callback(err); });
	};

	function ChannelSubscriptions(rest) {
		this.rest = rest;
	}

	ChannelSubscriptions.prototype.save = function(subscription, callback) {
		var rest = this.rest;
		var format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
			requestBody = pushchannelsubscription.fromValues(subscription),
			headers = utils["a" /* default */].defaultPostHeaders(format),
			params = {};

		if(typeof callback !== 'function') {
			if(this.rest.options.promises) {
				return utils["a" /* default */].promisify(this, 'save', arguments);
			}
			callback = noop;
		}

		if(rest.options.headers)
			utils["a" /* default */].mixin(headers, rest.options.headers);

		if(rest.options.pushFullWait)
			utils["a" /* default */].mixin(params, {fullWait: 'true'});

		requestBody = utils["a" /* default */].encodeBody(requestBody, format);
		client_resource.post(rest, '/push/channelSubscriptions', requestBody, headers, params, false, function(err, body, headers, unpacked) {
			callback(err, !err && pushchannelsubscription.fromResponseBody(body, !unpacked && format));
		});
	};

	ChannelSubscriptions.prototype.list = function(params, callback) {
		var rest = this.rest,
			format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
			envelope = http["a" /* default */].supportsLinkHeaders ? undefined : format,
			headers = utils["a" /* default */].defaultGetHeaders(format);

		if(typeof callback !== 'function') {
			if(this.rest.options.promises) {
				return utils["a" /* default */].promisify(this, 'list', arguments);
			}
			callback = noop;
		}

		if(rest.options.headers)
			utils["a" /* default */].mixin(headers, rest.options.headers);

		(new paginatedresource(rest, '/push/channelSubscriptions', headers, envelope, function(body, headers, unpacked) {
			return pushchannelsubscription.fromResponseBody(body, !unpacked && format);
		})).get(params, callback);
	};

	ChannelSubscriptions.prototype.removeWhere = function(params, callback) {
		var rest = this.rest,
			format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
			headers = utils["a" /* default */].defaultGetHeaders(format);

		if(typeof callback !== 'function') {
			if(this.rest.options.promises) {
				return utils["a" /* default */].promisify(this, 'removeWhere', arguments);
			}
			callback = noop;
		}

		if(rest.options.headers)
			utils["a" /* default */].mixin(headers, rest.options.headers);

		if(rest.options.pushFullWait)
			utils["a" /* default */].mixin(params, {fullWait: 'true'});

		client_resource['delete'](rest, '/push/channelSubscriptions', headers, params, false, function(err) { callback(err); });
	};

	/* ChannelSubscriptions have no unique id; removing one is equivalent to removeWhere by its properties */
	ChannelSubscriptions.prototype.remove = ChannelSubscriptions.prototype.removeWhere;

	ChannelSubscriptions.prototype.listChannels = function(params, callback) {
		var rest = this.rest,
			format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
			envelope = http["a" /* default */].supportsLinkHeaders ? undefined : format,
			headers = utils["a" /* default */].defaultGetHeaders(format);

		if(typeof callback !== 'function') {
			if(this.rest.options.promises) {
				return utils["a" /* default */].promisify(this, 'listChannels', arguments);
			}
			callback = noop;
		}

		if(rest.options.headers)
			utils["a" /* default */].mixin(headers, rest.options.headers);

		if(rest.options.pushFullWait)
			utils["a" /* default */].mixin(params, {fullWait: 'true'});

		(new paginatedresource(rest, '/push/channels', headers, envelope, function(body, headers, unpacked) {
			var f = !unpacked && format;

			if(f) {
				body = utils["a" /* default */].decodeBody(body, format);
			}

			for(var i = 0; i < body.length; i++) {
				body[i] = String(body[i]);
			}
			return body;
		})).get(params, callback);
	};

	return Push;
})();

/* harmony default export */ var push = (push_Push);

// EXTERNAL MODULE: ./common/lib/util/eventemitter.js
var eventemitter = __webpack_require__(7);

// EXTERNAL MODULE: ./common/lib/types/presencemessage.js
var presencemessage = __webpack_require__(11);

// CONCATENATED MODULE: ./common/lib/client/presence.js







var presence_Presence = (function() {
	function noop() {}
	function Presence(channel) {
		this.channel = channel;
		this.basePath = channel.basePath + '/presence';
	}
	utils["a" /* default */].inherits(Presence, eventemitter["a" /* default */]);

	Presence.prototype.get = function(params, callback) {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'Presence.get()', 'channel = ' + this.channel.name);
		/* params and callback are optional; see if params contains the callback */
		if(callback === undefined) {
			if(typeof(params) == 'function') {
				callback = params;
				params = null;
			} else {
				if(this.channel.rest.options.promises) {
					return utils["a" /* default */].promisify(this, 'get', arguments);
				}
				callback = noop;
			}
		}
		var rest = this.channel.rest,
			format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
			envelope = http["a" /* default */].supportsLinkHeaders ? undefined : format,
			headers = utils["a" /* default */].defaultGetHeaders(format);

		if(rest.options.headers)
			utils["a" /* default */].mixin(headers, rest.options.headers);

		var options = this.channel.channelOptions;
		(new paginatedresource(rest, this.basePath, headers, envelope, function(body, headers, unpacked) {
			return presencemessage["a" /* default */].fromResponseBody(body, options, !unpacked && format);
		})).get(params, callback);
	};

	Presence.prototype.history = function(params, callback) {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'Presence.history()', 'channel = ' + this.channel.name);
		this._history(params, callback);
	};

	Presence.prototype._history = function(params, callback) {
		/* params and callback are optional; see if params contains the callback */
		if(callback === undefined) {
			if(typeof(params) == 'function') {
				callback = params;
				params = null;
			} else {
				if(this.channel.rest.options.promises) {
					return utils["a" /* default */].promisify(this, '_history', arguments);
				}
				callback = noop;
			}
		}
		var rest = this.channel.rest,
			format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
			envelope = http["a" /* default */].supportsLinkHeaders ? undefined : format,
			headers = utils["a" /* default */].defaultGetHeaders(format),
			channel = this.channel;

		if(rest.options.headers)
			utils["a" /* default */].mixin(headers, rest.options.headers);

		var options = this.channel.channelOptions;
		(new paginatedresource(rest, this.basePath + '/history', headers, envelope, function(body, headers, unpacked) {
			return presencemessage["a" /* default */].fromResponseBody(body, options, !unpacked && format);
		})).get(params, callback);
	};

	return Presence;
})();

/* harmony default export */ var client_presence = (presence_Presence);

// EXTERNAL MODULE: ./browser/lib/util/crypto.js
var util_crypto = __webpack_require__(18);

// EXTERNAL MODULE: ./common/lib/types/message.js
var types_message = __webpack_require__(9);

// CONCATENATED MODULE: ./common/lib/client/channel.js











var channel_Channel = (function() {
	function noop() {}
	var MSG_ID_ENTROPY_BYTES = 9;

	/* public constructor */
	function Channel(rest, name, channelOptions) {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Channel()', 'started; name = ' + name);
		eventemitter["a" /* default */].call(this);
		this.rest = rest;
		this.name = name;
		this.basePath = '/channels/' + encodeURIComponent(name);
		this.presence = new client_presence(this);
		this.setOptions(channelOptions);
	}
	utils["a" /* default */].inherits(Channel, eventemitter["a" /* default */]);

	Channel.prototype.setOptions = function(options) {
		this.channelOptions = options = options || {};
		if(options.cipher) {
			if(!util_crypto["a" /* default */]) throw new Error('Encryption not enabled; use ably.encryption.js instead');
			var cipher = util_crypto["a" /* default */].getCipher(options.cipher);
			options.cipher = cipher.cipherParams;
			options.channelCipher = cipher.cipher;
		} else if('cipher' in options) {
			/* Don't deactivate an existing cipher unless options
			 * has a 'cipher' key that's falsey */
			options.cipher = null;
			options.channelCipher = null;
		}
	};

	Channel.prototype.history = function(params, callback) {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'Channel.history()', 'channel = ' + this.name);
		/* params and callback are optional; see if params contains the callback */
		if(callback === undefined) {
			if(typeof(params) == 'function') {
				callback = params;
				params = null;
			} else {
				if(this.rest.options.promises) {
					return utils["a" /* default */].promisify(this, 'history', arguments);
				}
				callback = noop;
			}
		}

		this._history(params, callback);
	};

	Channel.prototype._history = function(params, callback) {
		var rest = this.rest,
			format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
			envelope = http["a" /* default */].supportsLinkHeaders ? undefined : format,
			headers = utils["a" /* default */].defaultGetHeaders(format),
			channel = this;

		if(rest.options.headers)
			utils["a" /* default */].mixin(headers, rest.options.headers);

		var options = this.channelOptions;
		(new paginatedresource(rest, this.basePath + '/messages', headers, envelope, function(body, headers, unpacked) {
			return types_message["a" /* default */].fromResponseBody(body, options, !unpacked && format);
		})).get(params, callback);
	};

	function allEmptyIds(messages) {
		return utils["a" /* default */].arrEvery(messages, function(message) {
			return !message.id;
		});
	}

	Channel.prototype.publish = function() {
		var argCount = arguments.length,
			first = arguments[0],
			second = arguments[1],
			callback = arguments[argCount - 1],
			messages,
			params,
			self = this;

		if(typeof(callback) !== 'function') {
			if(this.rest.options.promises) {
				return utils["a" /* default */].promisify(this, 'publish', arguments);
			}
			callback = noop;
		}

		if(typeof first === 'string' || first === null) {
			/* (name, data, ...) */
			messages = [types_message["a" /* default */].fromValues({name: first, data: second})];
			params = arguments[2];
		} else if(utils["a" /* default */].isObject(first)) {
			messages = [types_message["a" /* default */].fromValues(first)];
			params = arguments[1];
		} else if(utils["a" /* default */].isArray(first)) {
			messages = types_message["a" /* default */].fromValuesArray(first);
			params = arguments[1];
		} else {
			throw new errorinfo["a" /* default */]('The single-argument form of publish() expects a message object or an array of message objects', 40013, 400);
		}

		if(typeof params !== 'object' || !params) {
			/* No params supplied (so after-message argument is just the callback or undefined) */
			params = {};
		}

		var rest = this.rest,
			options = rest.options,
			format = options.useBinaryProtocol ? 'msgpack' : 'json',
			idempotentRestPublishing = rest.options.idempotentRestPublishing,
			headers = utils["a" /* default */].defaultPostHeaders(format);

		if(options.headers)
			utils["a" /* default */].mixin(headers, options.headers);

		if(idempotentRestPublishing && allEmptyIds(messages)) {
			var msgIdBase = utils["a" /* default */].randomString(MSG_ID_ENTROPY_BYTES);
			utils["a" /* default */].arrForEach(messages, function(message, index) {
				message.id = msgIdBase + ':' + index.toString();
			});
		}

		types_message["a" /* default */].encodeArray(messages, this.channelOptions, function(err) {
			if(err) {
				callback(err);
				return;
			}

			/* RSL1i */
			var size = types_message["a" /* default */].getMessagesSize(messages),
				maxMessageSize = options.maxMessageSize;
			if(size > maxMessageSize) {
				callback(new errorinfo["a" /* default */]('Maximum size of messages that can be published at once exceeded ( was ' + size + ' bytes; limit is ' + maxMessageSize + ' bytes)', 40009, 400));
				return;
			}

			self._publish(types_message["a" /* default */].serialize(messages, format), headers, params, callback);
		});
	};

	Channel.prototype._publish = function(requestBody, headers, params, callback) {
		client_resource.post(this.rest, this.basePath + '/messages', requestBody, headers, params, false, callback);
	};

	return Channel;
})();

/* harmony default export */ var client_channel = (channel_Channel);

// CONCATENATED MODULE: ./common/lib/types/stats.js


var stats_Stats = (function() {

	function MessageCount(values) {
		this.count = (values && values.count) || 0;
		this.data = (values && values.data) || 0;
		this.uncompressedData = (values && values.uncompressedData) || 0;
		this.failed = (values && values.failed) || 0;
		this.refused = (values && values.refused) || 0;
	}

	function MessageCategory(values) {
		var self = this;
		MessageCount.call(this, values);
		this.category = undefined;
		if (values && values.category) {
			this.category = { };
			utils["a" /* default */].forInOwnNonNullProps(values.category, function(prop) {
				self.category[prop] = new MessageCount(values.category[prop]);
			});
		}
	}

	function ResourceCount(values) {
		this.peak = (values && values.peak) || 0;
		this.min = (values && values.min) || 0;
		this.mean = (values && values.mean) || 0;
		this.opened = (values && values.opened) || 0;
		this.refused = (values && values.refused) || 0;
	}

	function RequestCount(values) {
		this.succeeded = (values && values.succeeded) || 0;
		this.failed = (values && values.failed) || 0;
		this.refused = (values && values.refused) || 0;
	}

	function ConnectionTypes(values) {
		this.plain = new ResourceCount(values && values.plain);
		this.tls = new ResourceCount(values && values.tls);
		this.all = new ResourceCount(values && values.all);
	}

	function MessageTypes(values) {
		this.messages = new MessageCategory(values && values.messages);
		this.presence = new MessageCategory(values && values.presence);
		this.all = new MessageCategory(values && values.all);
	}

	function MessageTraffic(values) {
		this.realtime = new MessageTypes(values && values.realtime);
		this.rest = new MessageTypes(values && values.rest);
		this.webhook = new MessageTypes(values && values.webhook);
		this.sharedQueue = new MessageTypes(values && values.sharedQueue);
		this.externalQueue = new MessageTypes(values && values.externalQueue);
		this.httpEvent = new MessageTypes(values && values.httpEvent);
		this.push = new MessageTypes(values && values.push);
		this.all = new MessageTypes(values && values.all);
	}

	function MessageDirections(values) {
		this.all           = new MessageTypes(values && values.all);
		this.inbound       = new MessageTraffic(values && values.inbound);
		this.outbound      = new MessageTraffic(values && values.outbound);
	}

	function XchgMessages(values) {
		this.all           = new MessageTypes(values && values.all);
		this.producerPaid  = new MessageDirections(values && values.producerPaid);
		this.consumerPaid  = new MessageDirections(values && values.consumerPaid);
	}

	function PushStats(values) {
		this.messages = (values && values.messages) || 0;
		var notifications = values && values.notifications;
		this.notifications = {
			invalid: notifications && notifications.invalid || 0,
			attempted: notifications && notifications.attempted || 0,
			successful: notifications && notifications.successful || 0,
			failed: notifications && notifications.failed || 0
		};
		this.directPublishes = (values && values.directPublishes) || 0;
	}

	function ProcessedCount(values) {
		this.succeeded = (values && values.succeeded) || 0;
		this.skipped = (values && values.skipped) || 0;
		this.failed = (values && values.failed) || 0;
	}

	function ProcessedMessages(values) {
		var self = this;
		this.delta = undefined;
		if (values && values.delta) {
			this.delta = { };
			utils["a" /* default */].forInOwnNonNullProps(values.delta, function(prop) {
				self.delta[prop] = new ProcessedCount(values.delta[prop]);
			});
		}
	}

	function Stats(values) {
		MessageDirections.call(this, values);
		this.persisted     = new MessageTypes(values && values.persisted);
		this.connections   = new ConnectionTypes(values && values.connections);
		this.channels      = new ResourceCount(values && values.channels);
		this.apiRequests   = new RequestCount(values && values.apiRequests);
		this.tokenRequests = new RequestCount(values && values.tokenRequests);
		this.xchgProducer  = new XchgMessages(values && values.xchgProducer);
		this.xchgConsumer  = new XchgMessages(values && values.xchgConsumer);
		this.push          = new PushStats(values && values.pushStats);
		this.processed     = new ProcessedMessages(values && values.processed);
		this.inProgress    = (values && values.inProgress) || undefined;
		this.unit          = (values && values.unit) || undefined;
		this.intervalId    = (values && values.intervalId) || undefined;
	}

	Stats.fromValues = function(values) {
		return new Stats(values);
	};

	return Stats;
})();

/* harmony default export */ var stats = (stats_Stats);

// CONCATENATED MODULE: ./common/lib/client/rest.js












var rest_Rest = (function() {
	var noop = function() {};
	var msgpack = platform_browser["a" /* default */].msgpack;

	function Rest(options) {
		if(!(this instanceof Rest)){
			return new Rest(options);
		}

		/* normalise options */
		if(!options) {
			var msg = 'no options provided';
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Rest()', msg);
			throw new Error(msg);
		}
		options = defaults["a" /* default */].objectifyOptions(options);

		if(options.log) {
			logger["a" /* default */].setLog(options.log.level, options.log.handler);
		}
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'Rest()', 'initialized with clientOptions ' + utils["a" /* default */].inspect(options));

		this.options = defaults["a" /* default */].normaliseOptions(options);

		/* process options */
		if(options.key) {
			var keyMatch = options.key.match(/^([^:\s]+):([^:.\s]+)$/);
			if(!keyMatch) {
				var msg = 'invalid key parameter';
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Rest()', msg);
				throw new Error(msg);
			}
			options.keyName = keyMatch[1];
			options.keySecret = keyMatch[2];
		}

		if('clientId' in options) {
			if(!(typeof(options.clientId) === 'string' || options.clientId === null))
				throw new errorinfo["a" /* default */]('clientId must be either a string or null', 40012, 400);
			else if(options.clientId === '*')
				throw new errorinfo["a" /* default */]('Can’t use "*" as a clientId as that string is reserved. (To change the default token request behaviour to use a wildcard clientId, use {defaultTokenParams: {clientId: "*"}})', 40012, 400);
		}

		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Rest()', 'started; version = ' + defaults["a" /* default */].libstring);

		this.baseUri = this.authority = function(host) { return defaults["a" /* default */].getHttpScheme(options) + host + ':' + defaults["a" /* default */].getPort(options, false); };
		this._currentFallback = null;

		this.serverTimeOffset = null;
		this.auth = new auth["a" /* default */](this, options);
		this.channels = new Channels(this);
		this.push = new push(this);
	}

	Rest.prototype.stats = function(params, callback) {
		/* params and callback are optional; see if params contains the callback */
		if(callback === undefined) {
			if(typeof(params) == 'function') {
				callback = params;
				params = null;
			} else {
				if(this.options.promises) {
					return utils["a" /* default */].promisify(this, 'stats', arguments);
				}
				callback = noop;
			}
		}
		var headers = utils["a" /* default */].defaultGetHeaders(),
			format = this.options.useBinaryProtocol ? 'msgpack' : 'json',
			envelope = http["a" /* default */].supportsLinkHeaders ? undefined : format;

		if(this.options.headers)
			utils["a" /* default */].mixin(headers, this.options.headers);

		(new paginatedresource(this, '/stats', headers, envelope, function(body, headers, unpacked) {
			var statsValues = (unpacked ? body : JSON.parse(body));
			for(var i = 0; i < statsValues.length; i++) statsValues[i] = stats.fromValues(statsValues[i]);
			return statsValues;
		})).get(params, callback);
	};

	Rest.prototype.time = function(params, callback) {
		/* params and callback are optional; see if params contains the callback */
		if(callback === undefined) {
			if(typeof(params) == 'function') {
				callback = params;
				params = null;
			} else {
				if(this.options.promises) {
					return utils["a" /* default */].promisify(this, 'time', arguments);
				}
				callback = noop;
			}
		}
		var headers = utils["a" /* default */].defaultGetHeaders();
		if(this.options.headers)
			utils["a" /* default */].mixin(headers, this.options.headers);
		var self = this;
		var timeUri = function(host) { return self.authority(host) + '/time' };
		http["a" /* default */].get(this, timeUri, headers, params, function(err, res, headers, unpacked) {
			if(err) {
				callback(err);
				return;
			}
			if(!unpacked) res = JSON.parse(res);
			var time = res[0];
			if(!time) {
				err = new Error('Internal error (unexpected result type from GET /time)');
				err.statusCode = 500;
				callback(err);
				return;
			}
			/* calculate time offset only once for this device by adding to the prototype */
			self.serverTimeOffset = (time - utils["a" /* default */].now());
			callback(null, time);
		});
	};

	Rest.prototype.request = function(method, path, params, body, customHeaders, callback) {
		var useBinary = this.options.useBinaryProtocol,
			encoder = useBinary ? msgpack.encode: JSON.stringify,
			decoder = useBinary ? msgpack.decode : JSON.parse,
			format = useBinary ? 'msgpack' : 'json',
			envelope = http["a" /* default */].supportsLinkHeaders ? undefined : format;
		params = params || {};
		method = method.toLowerCase();
		var headers = method == 'get' ? utils["a" /* default */].defaultGetHeaders(format) : utils["a" /* default */].defaultPostHeaders(format);

		if(callback === undefined) {
			if(this.options.promises) {
				return utils["a" /* default */].promisify(this, 'request', [method, path, params, body, customHeaders]);
			}
			callback = noop;
		}

		if(typeof body !== 'string') {
			body = encoder(body);
		}
		if(this.options.headers) {
			utils["a" /* default */].mixin(headers, this.options.headers);
		}
		if(customHeaders) {
			utils["a" /* default */].mixin(headers, customHeaders);
		}
		var paginatedResource = new paginatedresource(this, path, headers, envelope, function(resbody, headers, unpacked) {
			return utils["a" /* default */].ensureArray(unpacked ? resbody : decoder(resbody));
		}, /* useHttpPaginatedResponse: */ true);

		if(!utils["a" /* default */].arrIn(http["a" /* default */].methods, method)) {
			throw new errorinfo["a" /* default */]('Unsupported method ' + method, 40500, 405);
		}

		if(utils["a" /* default */].arrIn(http["a" /* default */].methodsWithBody, method)) {
			paginatedResource[method](params, body, callback);
		} else {
			paginatedResource[method](params, callback);
		}
	};

	Rest.prototype.setLog = function(logOptions) {
		logger["a" /* default */].setLog(logOptions.level, logOptions.handler);
	};

	function Channels(rest) {
		this.rest = rest;
		this.all = {};
	}

	Channels.prototype.get = function(name, channelOptions) {
		name = String(name);
		var channel = this.all[name];
		if(!channel) {
			this.all[name] = channel = new client_channel(this.rest, name, channelOptions);
		} else if(channelOptions) {
			channel.setOptions(channelOptions);
		}

		return channel;
	};

	/* Included to support certain niche use-cases; most users should ignore this.
	 * Please do not use this unless you know what you're doing */
	Channels.prototype.release = function(name) {
		delete this.all[String(name)];
	};

	return Rest;
})();

rest_Rest.Promise = function(options) {
	options = defaults["a" /* default */].objectifyOptions(options);
	options.promises = true;
	return new rest_Rest(options);
};

rest_Rest.Callbacks = rest_Rest;

/* harmony default export */ var client_rest = (rest_Rest);

// EXTERNAL MODULE: ./common/lib/transport/connectionmanager.js
var connectionmanager = __webpack_require__(25);

// EXTERNAL MODULE: ./common/lib/client/connectionstatechange.js
var connectionstatechange = __webpack_require__(21);

// CONCATENATED MODULE: ./common/lib/client/connection.js






var connection_Connection = (function() {
	function noop() {}

	/* public constructor */
	function Connection(ably, options) {
		eventemitter["a" /* default */].call(this);
		this.ably = ably;
		this.connectionManager = new connectionmanager["a" /* default */](ably, options);
		this.state = this.connectionManager.state.state;
		this.key = undefined;
		this.id = undefined;
		this.serial = undefined;
		this.timeSerial = undefined;
		this.recoveryKey = undefined;
		this.errorReason = null;

		var self = this;
		this.connectionManager.on('connectionstate', function(stateChange) {
			var state = self.state = stateChange.current;
			utils["a" /* default */].nextTick(function() {
				self.emit(state, stateChange);
			});
		});
		this.connectionManager.on('update', function(stateChange) {
			utils["a" /* default */].nextTick(function() {
				self.emit('update', stateChange);
			});
		});
	}
	utils["a" /* default */].inherits(Connection, eventemitter["a" /* default */]);

	Connection.prototype.whenState = function(state, listener) {
		return eventemitter["a" /* default */].prototype.whenState.call(this, state, this.state, listener, new connectionstatechange["a" /* default */](undefined, state));
	}

	Connection.prototype.connect = function() {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Connection.connect()', '');
		this.connectionManager.requestState({state: 'connecting'});
	};

	Connection.prototype.ping = function(callback) {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Connection.ping()', '');
		if(!callback) {
			if(this.ably.options.promises) {
				return utils["a" /* default */].promisify(this, 'ping', arguments);
			}
			callback = noop;
		}
		this.connectionManager.ping(null, callback);
	};

	Connection.prototype.close = function() {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Connection.close()', 'connectionKey = ' + this.key);
		this.connectionManager.requestState({state: 'closing'});
	};

	return Connection;
})();

/* harmony default export */ var connection = (connection_Connection);

// EXTERNAL MODULE: ./common/lib/types/protocolmessage.js
var protocolmessage = __webpack_require__(8);

// EXTERNAL MODULE: ./common/lib/transport/connectionerror.js
var connectionerror = __webpack_require__(13);

// EXTERNAL MODULE: ./common/lib/util/multicaster.js
var util_multicaster = __webpack_require__(22);

// CONCATENATED MODULE: ./common/lib/client/channelstatechange.js
var ChannelStateChange = (function() {

	/* public constructor */
	function ChannelStateChange(previous, current, resumed, reason) {
		this.previous = previous;
		this.current = current;
		if(current === 'attached') this.resumed = resumed;
		if(reason) this.reason = reason;
	}

	return ChannelStateChange;
})();

/* harmony default export */ var channelstatechange = (ChannelStateChange);

// CONCATENATED MODULE: ./common/lib/client/realtimepresence.js











var realtimepresence_RealtimePresence = (function() {
	var noop = function() {};

	function memberKey(item) {
		return item.clientId + ':' + item.connectionId;
	}

	function getClientId(realtimePresence) {
		return realtimePresence.channel.realtime.auth.clientId;
	}

	function isAnonymousOrWildcard(realtimePresence) {
		var realtime = realtimePresence.channel.realtime;
		/* If not currently connected, we can't assume that we're an anonymous
		 * client, as realtime may inform us of our clientId in the CONNECTED
		 * message. So assume we're not anonymous and leave it to realtime to
		 * return an error if we are */
		var clientId = realtime.auth.clientId;
		return (!clientId || (clientId === '*')) && realtime.connection.state === 'connected';
	}

	/* Callback is called only in the event of an error */
	function waitAttached(channel, callback, action) {
		switch(channel.state) {
			case 'attached':
			case 'suspended':
				action();
				break;
			case 'initialized':
			case 'detached':
			case 'detaching':
			case 'attaching':
				channel.attach(function(err) {
					if(err) callback(err);
					else action();
				});
				break;
			default:
				callback(errorinfo["a" /* default */].fromValues(realtimechannel.invalidStateError(channel.state)));
		}
	}

	function RealtimePresence(channel, options) {
		client_presence.call(this, channel);
		this.syncComplete = false;
		this.members = new PresenceMap(this);
		this._myMembers = new PresenceMap(this);
		this.subscriptions = new eventemitter["a" /* default */]();
		this.pendingPresence = [];
	}
	utils["a" /* default */].inherits(RealtimePresence, client_presence);

	RealtimePresence.prototype.enter = function(data, callback) {
		if(isAnonymousOrWildcard(this)) {
			throw new errorinfo["a" /* default */]('clientId must be specified to enter a presence channel', 40012, 400);
		}
		return this._enterOrUpdateClient(undefined, data, 'enter', callback);
	};

	RealtimePresence.prototype.update = function(data, callback) {
		if(isAnonymousOrWildcard(this)) {
			throw new errorinfo["a" /* default */]('clientId must be specified to update presence data', 40012, 400);
		}
		return this._enterOrUpdateClient(undefined, data, 'update', callback);
	};

	RealtimePresence.prototype.enterClient = function(clientId, data, callback) {
		return this._enterOrUpdateClient(clientId, data, 'enter', callback);
	};

	RealtimePresence.prototype.updateClient = function(clientId, data, callback) {
		return this._enterOrUpdateClient(clientId, data, 'update', callback);
	};

	RealtimePresence.prototype._enterOrUpdateClient = function(clientId, data, action, callback) {
		if (!callback) {
			if (typeof(data)==='function') {
				callback = data;
				data = null;
			} else {
				if(this.channel.realtime.options.promises) {
					return utils["a" /* default */].promisify(this, '_enterOrUpdateClient', [clientId, data, action]);
				}
				callback = noop;
			}
		}

		var channel = this.channel;
		if(!channel.connectionManager.activeState()) {
			callback(channel.connectionManager.getError());
			return;
		}

		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'RealtimePresence.' + action + 'Client()',
		  'channel = ' + channel.name + ', client = ' + (clientId || '(implicit) ' + getClientId(this)));

		var presence = presencemessage["a" /* default */].fromValues({
			action : action,
			data   : data
		});
		if (clientId) {
			presence.clientId = clientId;
		}

		var self = this;
		presencemessage["a" /* default */].encode(presence, channel.channelOptions, function(err) {
			if (err) {
				callback(err);
				return;
			}
			switch(channel.state) {
				case 'attached':
					channel.sendPresence(presence, callback);
					break;
				case 'initialized':
				case 'detached':
					channel.attach();
				case 'attaching':
					self.pendingPresence.push({
						presence : presence,
						callback : callback
					});
					break;
				default:
					err = new errorinfo["a" /* default */]('Unable to ' + action + ' presence channel while in ' + channel.state + ' state', 90001);
					err.code = 90001;
					callback(err);
			}
		});
	};

	RealtimePresence.prototype.leave = function(data, callback) {
		if(isAnonymousOrWildcard(this)) {
			throw new errorinfo["a" /* default */]('clientId must have been specified to enter or leave a presence channel', 40012, 400);
		}
		return this.leaveClient(undefined, data, callback);
	};

	RealtimePresence.prototype.leaveClient = function(clientId, data, callback) {
		if (!callback) {
			if (typeof(data)==='function') {
				callback = data;
				data = null;
			} else {
				if(this.channel.realtime.options.promises) {
					return utils["a" /* default */].promisify(this, 'leaveClient', [clientId, data]);
				}
				callback = noop;
			}
		}

		var channel = this.channel;
		if(!channel.connectionManager.activeState()) {
			callback(channel.connectionManager.getError());
			return;
		}

		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'RealtimePresence.leaveClient()', 'leaving; channel = ' + this.channel.name + ', client = ' + clientId);
		var presence = presencemessage["a" /* default */].fromValues({
			action : 'leave',
			data   : data
		});
		if (clientId) { presence.clientId = clientId; }

		switch(channel.state) {
			case 'attached':
				channel.sendPresence(presence, callback);
				break;
			case 'attaching':
				this.pendingPresence.push({
					presence : presence,
					callback : callback
				});
				break;
			case 'initialized':
			case 'failed':
				/* we're not attached; therefore we let any entered status
				 * timeout by itself instead of attaching just in order to leave */
				var err = new errorinfo["a" /* default */]('Unable to leave presence channel (incompatible state)', 90001);
				callback(err);
				break;
			default:
				/* there is no connection; therefore we let
				 * any entered status timeout by itself */
				callback(connectionerror["a" /* default */].failed);
		}
	};

	RealtimePresence.prototype.get = function(/* params, callback */) {
		var args = Array.prototype.slice.call(arguments);
		if(args.length == 1 && typeof(args[0]) == 'function')
			args.unshift(null);

		var params = args[0],
			callback = args[1],
			waitForSync = !params || ('waitForSync' in params ? params.waitForSync : true);

		if(!callback) {
			if(this.channel.realtime.options.promises) {
				return utils["a" /* default */].promisify(this, 'get', args);
			}
			callback = noop;
		}

		function returnMembers(members) {
			callback(null, params ? members.list(params) : members.values());
		}

		/* Special-case the suspended state: can still get (stale) presence set if waitForSync is false */
		if(this.channel.state === 'suspended') {
			if(waitForSync) {
				callback(errorinfo["a" /* default */].fromValues({
					statusCode: 400,
					code: 91005,
					message: 'Presence state is out of sync due to channel being in the SUSPENDED state'
				}));
			} else {
				returnMembers(this.members);
			}
			return;
		}

		var self = this;
		waitAttached(this.channel, callback, function() {
			var members = self.members;
			if(waitForSync) {
				members.waitSync(function() {
					returnMembers(members);
				});
			} else {
				returnMembers(members);
			}
		});
	};

	RealtimePresence.prototype.history = function(params, callback) {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'RealtimePresence.history()', 'channel = ' + this.name);
		/* params and callback are optional; see if params contains the callback */
		if(callback === undefined) {
			if(typeof(params) == 'function') {
				callback = params;
				params = null;
			} else {
				if(this.channel.realtime.options.promises) {
					return utils["a" /* default */].promisify(this, 'history', arguments);
				}
				callback = noop;
			}
		}

		if(params && params.untilAttach) {
			if(this.channel.state === 'attached') {
				delete params.untilAttach;
				params.from_serial = this.channel.properties.attachSerial;
			} else {
				callback(new errorinfo["a" /* default */]("option untilAttach requires the channel to be attached, was: " + this.channel.state, 40000, 400));
			}
		}

		client_presence.prototype._history.call(this, params, callback);
	};

	RealtimePresence.prototype.setPresence = function(presenceSet, isSync, syncChannelSerial) {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'RealtimePresence.setPresence()', 'received presence for ' + presenceSet.length + ' participants; syncChannelSerial = ' + syncChannelSerial);
		var syncCursor, match, members = this.members, myMembers = this._myMembers,
			broadcastMessages = [], connId = this.channel.connectionManager.connectionId;

		if(isSync) {
			this.members.startSync();
			if(syncChannelSerial && (match = syncChannelSerial.match(/^[\w\-]+:(.*)$/))) {
				syncCursor = match[1];
			}
		}

		for(var i = 0; i < presenceSet.length; i++) {
			var presence = presencemessage["a" /* default */].fromValues(presenceSet[i]);
			switch(presence.action) {
				case 'leave':
					if(members.remove(presence)) {
						broadcastMessages.push(presence);
					}
					if(presence.connectionId === connId && !presence.isSynthesized()) {
						myMembers.remove(presence);
					}
					break;
				case 'enter':
				case 'present':
				case 'update':
					if(members.put(presence)) {
						broadcastMessages.push(presence);
					}
					if(presence.connectionId === connId) {
						myMembers.put(presence);
					}
					break;
			}
		}
		/* if this is the last (or only) message in a sequence of sync updates, end the sync */
		if(isSync && !syncCursor) {
			members.endSync();
			/* RTP5c2: re-enter our own members if they haven't shown up in the sync */
			this._ensureMyMembersPresent();
			this.channel.setInProgress(realtimechannel.progressOps.sync, false);
			this.channel.syncChannelSerial = null;
		}

		/* broadcast to listeners */
		for(var i = 0; i < broadcastMessages.length; i++) {
			var presence = broadcastMessages[i];
			this.subscriptions.emit(presence.action, presence);
		}
	};

	RealtimePresence.prototype.onAttached = function(hasPresence) {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'RealtimePresence.onAttached()', 'channel = ' + this.channel.name + ', hasPresence = ' + hasPresence);

		if(hasPresence) {
			this.members.startSync();
		} else {
			this._synthesizeLeaves(this.members.values());
			this.members.clear();
			this._ensureMyMembersPresent();
		}

		/* NB this must be after the _ensureMyMembersPresent call, which may add items to pendingPresence */
		var pendingPresence = this.pendingPresence,
			pendingPresCount = pendingPresence.length;

		if(pendingPresCount) {
			this.pendingPresence = [];
			var presenceArray = [];
			var multicaster = Object(util_multicaster["a" /* default */])();
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'RealtimePresence.onAttached', 'sending ' + pendingPresCount + ' queued presence messages');
			for(var i = 0; i < pendingPresCount; i++) {
				var event = pendingPresence[i];
				presenceArray.push(event.presence);
				multicaster.push(event.callback);
			}
			this.channel.sendPresence(presenceArray, multicaster);
		}
	};

	RealtimePresence.prototype.actOnChannelState = function(state, hasPresence, err) {
		switch(state) {
			case 'attached':
				this.onAttached(hasPresence);
				break;
			case 'detached':
			case 'failed':
				this._clearMyMembers();
				this.members.clear();
				/* falls through */
			case 'suspended':
				this.failPendingPresence(err);
				break;
		}
	};

	RealtimePresence.prototype.failPendingPresence = function(err) {
		if(this.pendingPresence.length) {
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'RealtimeChannel.failPendingPresence', 'channel; name = ' + this.channel.name + ', err = ' + utils["a" /* default */].inspectError(err));
			for(var i = 0; i < this.pendingPresence.length; i++)
				try {
					this.pendingPresence[i].callback(err);
				} catch(e) {}
			this.pendingPresence = [];
		}
	};

	RealtimePresence.prototype._clearMyMembers = function() {
		this._myMembers.clear();
	};

	RealtimePresence.prototype._ensureMyMembersPresent = function() {
		var self = this, members = this.members, myMembers = this._myMembers,
			reenterCb = function(err) {
				if(err) {
					var msg = 'Presence auto-re-enter failed: ' + err.toString();
					var wrappedErr = new errorinfo["a" /* default */](msg, 91004, 400);
					logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'RealtimePresence._ensureMyMembersPresent()', msg);
					var change = new channelstatechange(self.channel.state, self.channel.state, true, wrappedErr);
					self.channel.emit('update', change);
				}
			};

		for(var memberKey in myMembers.map) {
			if(!(memberKey in members.map)) {
				var entry = myMembers.map[memberKey];
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'RealtimePresence._ensureMyMembersPresent()', 'Auto-reentering clientId "' + entry.clientId + '" into the presence set');
				this._enterOrUpdateClient(entry.clientId, entry.data, 'enter', reenterCb);
				delete myMembers.map[memberKey];
			}
		}
	};

	RealtimePresence.prototype._synthesizeLeaves = function(items) {
		var subscriptions = this.subscriptions;
		utils["a" /* default */].arrForEach(items, function(item) {
			var presence = presencemessage["a" /* default */].fromValues({
				action: 'leave',
				connectionId: item.connectionId,
				clientId: item.clientId,
				data: item.data,
				encoding: item.encoding,
				timestamp: utils["a" /* default */].now()
			});
			subscriptions.emit('leave', presence);
		});
	};

	/* Deprecated */
	RealtimePresence.prototype.on = function() {
		logger["a" /* default */].deprecated('presence.on', 'presence.subscribe');
		this.subscribe.apply(this, arguments);
	};

	/* Deprecated */
	RealtimePresence.prototype.off = function() {
		logger["a" /* default */].deprecated('presence.off', 'presence.unsubscribe');
		this.unsubscribe.apply(this, arguments);
	};

	RealtimePresence.prototype.subscribe = function(/* [event], listener, [callback] */) {
		var args = realtimechannel.processListenerArgs(arguments);
		var event = args[0];
		var listener = args[1];
		var callback = args[2];
		var channel = this.channel;
		var self = this;

		if(!callback) {
			if(this.channel.realtime.options.promises) {
				return utils["a" /* default */].promisify(this, 'subscribe', [event, listener]);
			}
			callback = noop;
		}

		if(channel.state === 'failed') {
			callback(errorinfo["a" /* default */].fromValues(realtimechannel.invalidStateError('failed')));
			return;
		}

		this.subscriptions.on(event, listener);
		channel.attach(callback);
	};

	RealtimePresence.prototype.unsubscribe = function(/* [event], listener */) {
		var args = realtimechannel.processListenerArgs(arguments);
		var event = args[0];
		var listener = args[1];
		this.subscriptions.off(event, listener);
	};

	function PresenceMap(presence) {
		eventemitter["a" /* default */].call(this);
		this.presence = presence;
		this.map = {};
		this.syncInProgress = false;
		this.residualMembers = null;
	}
	utils["a" /* default */].inherits(PresenceMap, eventemitter["a" /* default */]);

	PresenceMap.prototype.get = function(key) {
		return this.map[key];
	};

	PresenceMap.prototype.getClient = function(clientId) {
		var map = this.map, result = [];
		for(var key in map) {
			var item = map[key];
			if(item.clientId == clientId && item.action != 'absent')
				result.push(item);
		}
		return result;
	};

	PresenceMap.prototype.list = function(params) {
		var map = this.map,
			clientId = params && params.clientId,
			connectionId = params && params.connectionId,
			result = [];

		for(var key in map) {
			var item = map[key];
			if(item.action === 'absent') continue;
			if(clientId && clientId != item.clientId) continue;
			if(connectionId && connectionId != item.connectionId) continue;
			result.push(item);
		}
		return result;
	};

	function newerThan(item, existing) {
		/* RTP2b1: if either is synthesised, compare by timestamp */
		if(item.isSynthesized() || existing.isSynthesized()) {
			return item.timestamp > existing.timestamp;
		}

		/* RTP2b2 */
		var itemOrderings = item.parseId(),
			existingOrderings = existing.parseId();
		if(itemOrderings.msgSerial === existingOrderings.msgSerial) {
			return itemOrderings.index > existingOrderings.index;
		} else {
			return itemOrderings.msgSerial > existingOrderings.msgSerial;
		}
	}

	PresenceMap.prototype.put = function(item) {
		if(item.action === 'enter' || item.action === 'update') {
			item = presencemessage["a" /* default */].fromValues(item);
			item.action = 'present';
		}
		var map = this.map, key = memberKey(item);
		/* we've seen this member, so do not remove it at the end of sync */
		if(this.residualMembers)
			delete this.residualMembers[key];

		/* compare the timestamp of the new item with any existing member (or ABSENT witness) */
		var existingItem = map[key];
		if(existingItem && !newerThan(item, existingItem)) {
			return false;
		}
		map[key] = item;
		return true;

	};

	PresenceMap.prototype.values = function() {
		var map = this.map, result = [];
		for(var key in map) {
			var item = map[key];
			if(item.action != 'absent')
				result.push(item);
		}
		return result;
	};

	PresenceMap.prototype.remove = function(item) {
		var map = this.map, key = memberKey(item);
		var existingItem = map[key];

		if(existingItem && !newerThan(item, existingItem)) {
			return false;
		}

		/* RTP2f */
		if(this.syncInProgress) {
			item = presencemessage["a" /* default */].fromValues(item);
			item.action = 'absent';
			map[key] = item;
		} else {
			delete map[key];
		}

		return true;
	};

	PresenceMap.prototype.startSync = function() {
		var map = this.map, syncInProgress = this.syncInProgress;
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'PresenceMap.startSync()', 'channel = ' + this.presence.channel.name + '; syncInProgress = ' + syncInProgress);
		/* we might be called multiple times while a sync is in progress */
		if(!this.syncInProgress) {
			this.residualMembers = utils["a" /* default */].copy(map);
			this.setInProgress(true);
		}
	};

	PresenceMap.prototype.endSync = function() {
		var map = this.map, syncInProgress = this.syncInProgress;
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'PresenceMap.endSync()', 'channel = ' + this.presence.channel.name + '; syncInProgress = ' + syncInProgress);
		if(syncInProgress) {
			/* we can now strip out the ABSENT members, as we have
			 * received all of the out-of-order sync messages */
			for(var memberKey in map) {
				var entry = map[memberKey];
				if(entry.action === 'absent') {
					delete map[memberKey];
				}
			}
			/* any members that were present at the start of the sync,
			 * and have not been seen in sync, can be removed, and leave events emitted */
			this.presence._synthesizeLeaves(utils["a" /* default */].valuesArray(this.residualMembers));
			for(var memberKey in this.residualMembers) {
				delete map[memberKey];
			}
			this.residualMembers = null;

			/* finish, notifying any waiters */
			this.setInProgress(false);
		}
		this.emit('sync');
	};

	PresenceMap.prototype.waitSync = function(callback) {
		var syncInProgress = this.syncInProgress;
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'PresenceMap.waitSync()', 'channel = ' + this.presence.channel.name + '; syncInProgress = ' + syncInProgress);
		if(!syncInProgress) {
			callback();
			return;
		}
		this.once('sync', callback);
	};

	PresenceMap.prototype.clear = function(callback) {
		this.map = {};
		this.setInProgress(false);
		this.residualMembers = null;
	};

	PresenceMap.prototype.setInProgress = function(inProgress) {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'PresenceMap.setInProgress()', 'inProgress = ' + inProgress);
		this.syncInProgress = inProgress;
		this.presence.syncComplete = !inProgress;
	};

	return RealtimePresence;
})();

/* harmony default export */ var realtimepresence = (realtimepresence_RealtimePresence);

// CONCATENATED MODULE: ./common/lib/client/realtimechannel.js












var realtimechannel_RealtimeChannel = (function() {
	var actions = protocolmessage["a" /* default */].Action;
	var noop = function() {};
	var statechangeOp = 'statechange';
	var syncOp = 'sync';

	/* public constructor */
	function RealtimeChannel(realtime, name, options) {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'RealtimeChannel()', 'started; name = ' + name);
		client_channel.call(this, realtime, name, options);
		this.realtime = realtime;
		this.presence = new realtimepresence(this, realtime.options);
		this.connectionManager = realtime.connection.connectionManager;
		this.state = 'initialized';
		this.subscriptions = new eventemitter["a" /* default */]();
		this.syncChannelSerial = undefined;
		this.properties = {
			attachSerial: undefined
		};
		this.setOptions(options);
		this.errorReason = null;
		this._requestedFlags = null;
		this._mode = null;
		/* Temporary; only used for the checkChannelsOnResume option */
		this._attachedMsgIndicator = false;
		this._attachResume = false;
		this._decodingContext = {
			channelOptions: this.channelOptions,
			plugins: realtime.options.plugins || { },
			baseEncodedPreviousPayload: undefined
		};
		this._lastPayload = {
			messageId: null,
			protocolMessageChannelSerial: null,
			decodeFailureRecoveryInProgress: null
		};
		/* Only differences between this and the public event emitter is that this emits an
		 * update event for all ATTACHEDs, whether resumed or not */
		this._allChannelChanges = new eventemitter["a" /* default */]();
	}
	utils["a" /* default */].inherits(RealtimeChannel, client_channel);

	RealtimeChannel.invalidStateError = function(state) {
		return {
			statusCode: 400,
			code: 90001,
			message: 'Channel operation failed as channel state is ' + state
		};
	};

	RealtimeChannel.progressOps = {
		statechange: statechangeOp,
		sync: syncOp
	};

	RealtimeChannel.processListenerArgs = function(args) {
		/* [event], listener, [callback] */
		args = Array.prototype.slice.call(args);
		if(typeof args[0] === 'function') {
			args.unshift(null);
		}
		if(args[args.length - 1] == undefined) {
			args.pop();
		}
		return args;
	};

	RealtimeChannel.prototype.setOptions = function(options, callback) {
		if(!callback) {
			if (this.rest.options.promises) {
				return utils["a" /* default */].promisify(this, 'setOptions', arguments);
			}

			callback = function(err){
				if(err) {
					logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'RealtimeChannel.setOptions()', 'Set options failed: ' + err.toString());
				}
			};
		}
		var err = validateChannelOptions(options);
		if(err) {
			callback(err);
			return;
		}
		client_channel.prototype.setOptions.call(this, options);
		if (this._decodingContext)
			this._decodingContext.channelOptions = this.channelOptions;
		if(this._shouldReattachToSetOptions(options)) {
			/* This does not just do _attach(true, null, callback) because that would put us
			 * into the 'attaching' state until we receive the new attached, which is
			 * conceptually incorrect: we are still attached, we just have a pending request to
			 * change some channel params. Per RTL17 going into the attaching state would mean
			 * rejecting messages until we have confirmation that the options have changed,
			 * which would unnecessarily lose message continuity. */
			this.attachImpl();
			this._allChannelChanges.once(function(stateChange) {
				switch(this.event) {
					case 'update':
					case 'attached':
						callback(null);
						return;
					default:
						callback(stateChange.reason);
						return;
				}
			});
		} else {
			callback();
		}
	};

	function validateChannelOptions(options) {
		if(options && 'params' in options && !utils["a" /* default */].isObject(options.params)) {
			return new errorinfo["a" /* default */]('options.params must be an object', 40000, 400);
		}
		if(options && 'modes' in options){
			if(!utils["a" /* default */].isArray(options.modes)){
				return new errorinfo["a" /* default */]('options.modes must be an array', 40000, 400);
			}
			for(var i = 0; i < options.modes.length; i++){
				var currentMode = options.modes[i];
				if(!currentMode || typeof currentMode !== 'string' || !utils["a" /* default */].arrIn(protocolmessage["a" /* default */].channelModes, String.prototype.toUpperCase.call(currentMode))){
					return new errorinfo["a" /* default */]('Invalid channel mode: ' + currentMode, 40000, 400);
				}
			}
		}
	}

	RealtimeChannel.prototype._shouldReattachToSetOptions = function(options) {
		return (this.state === 'attached' || this.state === 'attaching') && (options.params || options.modes);
	};

	RealtimeChannel.prototype.publish = function() {
		var argCount = arguments.length,
			messages = arguments[0],
			callback = arguments[argCount - 1];

		if(typeof(callback) !== 'function') {
			if(this.realtime.options.promises) {
				return utils["a" /* default */].promisify(this, 'publish', arguments);
			}
			callback = noop;
			++argCount;
		}
		if(!this.connectionManager.activeState()) {
			callback(this.connectionManager.getError());
			return;
		}
		if(argCount == 2) {
			if(utils["a" /* default */].isObject(messages))
				messages = [types_message["a" /* default */].fromValues(messages)];
			else if(utils["a" /* default */].isArray(messages))
				messages = types_message["a" /* default */].fromValuesArray(messages);
			else
				throw new errorinfo["a" /* default */]('The single-argument form of publish() expects a message object or an array of message objects', 40013, 400);
		} else {
			messages = [types_message["a" /* default */].fromValues({name: arguments[0], data: arguments[1]})];
		}
		var self = this,
			maxMessageSize = this.realtime.options.maxMessageSize;
		types_message["a" /* default */].encodeArray(messages, this.channelOptions, function(err) {
			if (err) {
				callback(err);
				return;
			}
			/* RSL1i */
			var size = types_message["a" /* default */].getMessagesSize(messages);
			if(size > maxMessageSize) {
				callback(new errorinfo["a" /* default */]('Maximum size of messages that can be published at once exceeded ( was ' + size + ' bytes; limit is ' + maxMessageSize + ' bytes)', 40009, 400));
				return;
			}
			self._publish(messages, callback);
		});
	};

	RealtimeChannel.prototype._publish = function(messages, callback) {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'RealtimeChannel.publish()', 'message count = ' + messages.length);
		var state = this.state;
		switch(state) {
			case 'failed':
			case 'suspended':
				callback(errorinfo["a" /* default */].fromValues(RealtimeChannel.invalidStateError(state)));
				break;
			default:
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'RealtimeChannel.publish()', 'sending message; channel state is ' + state);
				var msg = new protocolmessage["a" /* default */]();
				msg.action = actions.MESSAGE;
				msg.channel = this.name;
				msg.messages = messages;
				this.sendMessage(msg, callback);
				break;
		}
	};

	RealtimeChannel.prototype.onEvent = function(messages) {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'RealtimeChannel.onEvent()', 'received message');
		var subscriptions = this.subscriptions;
		for(var i = 0; i < messages.length; i++) {
			var message = messages[i];
			subscriptions.emit(message.name, message);
		}
	};

	RealtimeChannel.prototype.attach = function(flags, callback) {
		if(typeof(flags) === 'function') {
			callback = flags;
			flags = null;
		}
		if(!callback) {
			if(this.realtime.options.promises) {
				return utils["a" /* default */].promisify(this, 'attach', arguments);
			}
			callback = function(err) {
				if(err) {
					logger["a" /* default */].logAction(logger["a" /* default */].LOG_MAJOR, 'RealtimeChannel.attach()', 'Channel attach failed: ' + err.toString());
				}
			}
		}
		if(flags) {
			logger["a" /* default */].deprecated('channel.attach() with flags', 'channel.setOptions() with channelOptions.params');
			/* If flags requested, always do a re-attach. TODO only do this if
			 * current mode differs from requested mode */
			this._requestedFlags = flags;
		} else if (this.state === 'attached') {
			callback();
			return;
		}

		this._attach(false, null, callback);
	};

	RealtimeChannel.prototype._attach = function(forceReattach, attachReason, callback) {
		if(!callback) {
			callback = function(err) {
				if (err) {
					logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'RealtimeChannel._attach()', 'Channel attach failed: ' + err.toString());
				}
			}
		}

		var connectionManager = this.connectionManager;
		if(!connectionManager.activeState()) {
			callback(connectionManager.getError());
			return;
		}

		if (this.state !== 'attaching' || forceReattach) {
			this.requestState('attaching', attachReason);
		}

		this.once(function(stateChange) {
			switch(this.event) {
				case 'attached':
					callback();
					break;
				case 'detached':
				case 'suspended':
				case 'failed':
					callback(stateChange.reason || connectionManager.getError());
					break;
				case 'detaching':
					callback(new errorinfo["a" /* default */]('Attach request superseded by a subsequent detach request', 90000, 409));
					break;
			}
		});
	};

	RealtimeChannel.prototype.attachImpl = function() {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'RealtimeChannel.attachImpl()', 'sending ATTACH message');
		this.setInProgress(statechangeOp, true);
		var attachMsg = protocolmessage["a" /* default */].fromValues({action: actions.ATTACH, channel: this.name, params: this.channelOptions.params});
		if(this._requestedFlags) {
			attachMsg.encodeModesToFlags(this._requestedFlags);
		} else if(this.channelOptions.modes) {
			attachMsg.encodeModesToFlags(utils["a" /* default */].allToUpperCase(this.channelOptions.modes));
		}
		if(this._attachResume) {
			attachMsg.setFlag('ATTACH_RESUME');
		}
		if(this._lastPayload.decodeFailureRecoveryInProgress) {
			attachMsg.channelSerial = this._lastPayload.protocolMessageChannelSerial;
		}
		this.sendMessage(attachMsg, noop);
	};

	RealtimeChannel.prototype.detach = function(callback) {
		if(!callback) {
			if(this.realtime.options.promises) {
				return utils["a" /* default */].promisify(this, 'detach', arguments);
			}
			callback = noop;
		}
		var connectionManager = this.connectionManager;
		if(!connectionManager.activeState()) {
			callback(connectionManager.getError());
			return;
		}
		switch(this.state) {
			case 'detached':
			case 'failed':
				callback();
				break;
			default:
				this.requestState('detaching');
			case 'detaching':
				this.once(function(stateChange) {
					switch(this.event) {
						case 'detached':
							callback();
							break;
						case 'attached':
						case 'suspended':
						case 'failed':
							callback(stateChange.reason || connectionManager.getError());
							break;
						case 'attaching':
							callback(new errorinfo["a" /* default */]('Detach request superseded by a subsequent attach request', 90000, 409));
							break;
					}
				});
		}
	};

	RealtimeChannel.prototype.detachImpl = function(callback) {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'RealtimeChannel.detach()', 'sending DETACH message');
		this.setInProgress(statechangeOp, true);
		var msg = protocolmessage["a" /* default */].fromValues({action: actions.DETACH, channel: this.name});
		this.sendMessage(msg, (callback || noop));
	};

	RealtimeChannel.prototype.subscribe = function(/* [event], listener, [callback] */) {
		var args = RealtimeChannel.processListenerArgs(arguments);
		var event = args[0];
		var listener = args[1];
		var callback = args[2];

		if(!callback) {
			if(this.realtime.options.promises) {
				return utils["a" /* default */].promisify(this, 'subscribe', [event, listener]);
			}
			callback = noop;
		}

		if(this.state === 'failed') {
			callback(errorinfo["a" /* default */].fromValues(RealtimeChannel.invalidStateError('failed')));
			return;
		}

		this.subscriptions.on(event, listener);

		return this.attach(callback);
	};

	RealtimeChannel.prototype.unsubscribe = function(/* [event], listener */) {
		var args = RealtimeChannel.processListenerArgs(arguments);
		var event = args[0];
		var listener = args[1];
		this.subscriptions.off(event, listener);
	};

	RealtimeChannel.prototype.sync = function() {
		/* check preconditions */
		switch(this.state) {
			case 'initialized':
			case 'detaching':
			case 'detached':
				throw new errorinfo["a" /* default */]("Unable to sync to channel; not attached", 40000);
			default:
		}
		var connectionManager = this.connectionManager;
		if(!connectionManager.activeState()) {
			throw connectionManager.getError();
		}

		/* send sync request */
		var syncMessage = protocolmessage["a" /* default */].fromValues({action: actions.SYNC, channel: this.name});
		if(this.syncChannelSerial) {
			syncMessage.channelSerial = this.syncChannelSerial;
		}
		connectionManager.send(syncMessage);
	};

	RealtimeChannel.prototype.sendMessage = function(msg, callback) {
		this.connectionManager.send(msg, this.realtime.options.queueMessages, callback);
	};

	RealtimeChannel.prototype.sendPresence = function(presence, callback) {
		var msg = protocolmessage["a" /* default */].fromValues({
			action: actions.PRESENCE,
			channel: this.name,
			presence: (utils["a" /* default */].isArray(presence) ?
				presencemessage["a" /* default */].fromValuesArray(presence) :
				[presencemessage["a" /* default */].fromValues(presence)])
		});
		this.sendMessage(msg, callback);
	};

	RealtimeChannel.prototype.onMessage = function(message) {
		var syncChannelSerial, isSync = false;
		switch(message.action) {
		case actions.ATTACHED:
			this._attachedMsgIndicator = true;
			this.properties.attachSerial = message.channelSerial;
			this._mode = message.getMode();
			this.params = message.params || {};
			var modesFromFlags = message.decodeModesFromFlags();
			this.modes = (modesFromFlags && utils["a" /* default */].allToLowerCase(modesFromFlags)) || undefined;
			var resumed = message.hasFlag('RESUMED');
			var hasPresence = message.hasFlag('HAS_PRESENCE');
			if(this.state === 'attached') {
				/* attached operations to change options set the inprogress mutex, but leave
				 * channel in the attached state */
				this.setInProgress(statechangeOp, false);
				if(!resumed) {
					/* On a loss of continuity, the presence set needs to be re-synced */
					this.presence.onAttached(hasPresence);
				}
				var change = new channelstatechange(this.state, this.state, resumed, message.error);
				this._allChannelChanges.emit('update', change);
				if(!resumed || this.channelOptions.updateOnAttached) {
					this.emit('update', change);
				}
			} else {
				this.notifyState('attached', message.error, resumed, hasPresence);
			}
			break;

		case actions.DETACHED:
			var err = message.error ? errorinfo["a" /* default */].fromValues(message.error) : new errorinfo["a" /* default */]('Channel detached', 90001, 404);
			if(this.state === 'detaching') {
				this.notifyState('detached', err);
			} else if(this.state === 'attaching') {
				/* Only retry immediately if we were previously attached. If we were
				 * attaching, go into suspended, fail messages, and wait a few seconds
				 * before retrying */
				this.notifyState('suspended', err);
			} else {
				this.requestState('attaching', err);
			}
			break;

		case actions.SYNC:
			/* syncs can have channelSerials, but might not if the sync is one page long */
			isSync = true;
			syncChannelSerial = this.syncChannelSerial = message.channelSerial;
			/* syncs can happen on channels with no presence data as part of connection
			 * resuming, in which case protocol message has no presence property */
			if(!message.presence) break;
		case actions.PRESENCE:
			var presence = message.presence,
				id = message.id,
				connectionId = message.connectionId,
				timestamp = message.timestamp;

			var options = this.channelOptions;
			for(var i = 0; i < presence.length; i++) {
				try {
					var presenceMsg = presence[i];
					presencemessage["a" /* default */].decode(presenceMsg, options);
				} catch (e) {
					logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'RealtimeChannel.onMessage()', e.toString());
				}
				if(!presenceMsg.connectionId) presenceMsg.connectionId = connectionId;
				if(!presenceMsg.timestamp) presenceMsg.timestamp = timestamp;
				if(!presenceMsg.id) presenceMsg.id = id + ':' + i;
			}
			this.presence.setPresence(presence, isSync, syncChannelSerial);
			break;

		case actions.MESSAGE:

			//RTL17
			if(this.state !== 'attached') {
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_MAJOR, 'RealtimeChannel.onMessage()', 'Message "' + message.id + '" skipped as this channel "' + this.name + '" state is not "attached" (state is "' + this.state + '").');
				return;
			}

			var messages = message.messages,
				firstMessage = messages[0],
				lastMessage = messages[messages.length - 1],
				id = message.id,
				connectionId = message.connectionId,
				timestamp = message.timestamp;

			if(firstMessage.extras && firstMessage.extras.delta && firstMessage.extras.delta.from !== this._lastPayload.messageId) {
				var msg = 'Delta message decode failure - previous message not available for message "' + message.id + '" on this channel "' + this.name + '".';
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'RealtimeChannel.onMessage()', msg);
				this._startDecodeFailureRecovery(new errorinfo["a" /* default */](msg, 40018, 400));
				break;
			}

			for(var i = 0; i < messages.length; i++) {
				var msg = messages[i];
				try {
					types_message["a" /* default */].decode(msg, this._decodingContext);
				} catch (e) {
					/* decrypt failed .. the most likely cause is that we have the wrong key */
					logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'RealtimeChannel.onMessage()', e.toString());
					switch(e.code) {
						case 40018:
							/* decode failure */
							this._startDecodeFailureRecovery(e);
							return;
						case 40019:
							/* No vcdiff plugin passed in - no point recovering, give up */
						case 40021:
							/* Browser does not support deltas, similarly no point recovering */
							this.notifyState('failed', e);
							return;
					}
				}
				if(!msg.connectionId) msg.connectionId = connectionId;
				if(!msg.timestamp) msg.timestamp = timestamp;
				if(!msg.id) msg.id = id + ':' + i;
			}
			this._lastPayload.messageId = lastMessage.id;
			this._lastPayload.protocolMessageChannelSerial = message.channelSerial;
			this.onEvent(messages);
			break;

		case actions.ERROR:
			/* there was a channel-specific error */
			var err = message.error;
			if(err && err.code == 80016) {
				/* attach/detach operation attempted on superseded transport handle */
				this.checkPendingState();
			} else {
				this.notifyState('failed', errorinfo["a" /* default */].fromValues(err));
			}
			break;

		default:
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'RealtimeChannel.onMessage()', 'Fatal protocol error: unrecognised action (' + message.action + ')');
			this.connectionManager.abort(connectionerror["a" /* default */].unknownChannelErr);
		}
	};

	RealtimeChannel.prototype._startDecodeFailureRecovery = function(reason) {
		var self = this;
		if(!this._lastPayload.decodeFailureRecoveryInProgress) {
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_MAJOR, 'RealtimeChannel.onMessage()', 'Starting decode failure recovery process.');
			this._lastPayload.decodeFailureRecoveryInProgress = true;
			this._attach(true, reason, function() {
				self._lastPayload.decodeFailureRecoveryInProgress = false;
			});
		}
	};

	RealtimeChannel.prototype.onAttached = function() {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'RealtimeChannel.onAttached', 'activating channel; name = ' + this.name);
	};

	RealtimeChannel.prototype.notifyState = function(state, reason, resumed, hasPresence) {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'RealtimeChannel.notifyState', 'name = ' + this.name + ', current state = ' + this.state + ', notifying state ' + state);
		this.clearStateTimer();

		if(state === this.state) {
			return;
		}
		this.presence.actOnChannelState(state, hasPresence, reason);
		if(state === 'suspended' && this.connectionManager.state.sendEvents) {
			this.startRetryTimer();
		} else {
			this.cancelRetryTimer();
		}
		if(reason) {
			this.errorReason = reason;
		}
		var change = new channelstatechange(this.state, state, resumed, reason);
		var logLevel = state === 'failed' ? logger["a" /* default */].LOG_ERROR : logger["a" /* default */].LOG_MAJOR;
		logger["a" /* default */].logAction(logLevel, 'Channel state for channel "' + this.name + '"', state + (reason ? ('; reason: ' + reason) : ''));

		/* Note: we don't set inProgress for pending states until the request is actually in progress */
		if(state === 'attached') {
			this.onAttached();
			this.setInProgress(syncOp, hasPresence);
			this.setInProgress(statechangeOp, false);
		} else if(state === 'detached' || state === 'failed' || state === 'suspended') {
			this.setInProgress(statechangeOp, false);
			this.setInProgress(syncOp, false);
		}

		if(state === 'attached') {
			this._attachResume = true;
		} else if(state === 'detaching' || state === 'failed') {
			this._attachResume = false;
		}

		this.state = state;
		this._allChannelChanges.emit(state, change);
		this.emit(state, change);
	};

	RealtimeChannel.prototype.requestState = function(state, reason) {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'RealtimeChannel.requestState', 'name = ' + this.name + ', state = ' + state);
		this.notifyState(state, reason);
		/* send the event and await response */
		this.checkPendingState();
	};

	RealtimeChannel.prototype.checkPendingState = function() {
		/* if can't send events, do nothing */
		var cmState = this.connectionManager.state;
		/* Allow attach messages to queue up when synchronizing, since this will be
		 * the state we'll be in when upgrade transport.active triggers a checkpendingstate */
		if(!(cmState.sendEvents || cmState.forceQueueEvents)) {
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'RealtimeChannel.checkPendingState', 'sendEvents is false; state is ' + this.connectionManager.state.state);
			return;
		}

		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'RealtimeChannel.checkPendingState', 'name = ' + this.name + ', state = ' + this.state);
		/* Only start the state timer running when actually sending the event */
		switch(this.state) {
			case 'attaching':
				this.startStateTimerIfNotRunning();
				this.attachImpl();
				break;
			case 'detaching':
				this.startStateTimerIfNotRunning();
				this.detachImpl();
				break;
			case 'attached':
				/* resume any sync operation that was in progress */
				this.sync();
			default:
				break;
		}
	};

	RealtimeChannel.prototype.timeoutPendingState = function() {
		switch(this.state) {
			case 'attaching':
				var err = new errorinfo["a" /* default */]('Channel attach timed out', 90007, 408);
				this.notifyState('suspended', err);
				break;
			case 'detaching':
				var err = new errorinfo["a" /* default */]('Channel detach timed out', 90007, 408);
				this.notifyState('attached', err);
				break;
			default:
				this.checkPendingState();
				break;
		}
	};

	RealtimeChannel.prototype.startStateTimerIfNotRunning = function() {
		var self = this;
		if(!this.stateTimer) {
			this.stateTimer = setTimeout(function() {
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'RealtimeChannel.startStateTimerIfNotRunning', 'timer expired');
				self.stateTimer = null;
				self.timeoutPendingState();
			}, this.realtime.options.timeouts.realtimeRequestTimeout);
		}
	};

	RealtimeChannel.prototype.clearStateTimer = function() {
		var stateTimer = this.stateTimer;
		if(stateTimer) {
			clearTimeout(stateTimer);
			this.stateTimer = null;
		}
	};

	RealtimeChannel.prototype.startRetryTimer = function() {
		var self = this;
		if(this.retryTimer) return;

		this.retryTimer = setTimeout(function() {
			/* If connection is not connected, just leave in suspended, a reattach
			 * will be triggered once it connects again */
			if(self.state === 'suspended' && self.connectionManager.state.sendEvents) {
				self.retryTimer = null;
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'RealtimeChannel retry timer expired', 'attempting a new attach');
				self.requestState('attaching');
			}
		}, this.realtime.options.timeouts.channelRetryTimeout);
	};

	RealtimeChannel.prototype.cancelRetryTimer = function() {
		if(this.retryTimer) {
			clearTimeout(this.retryTimer);
			this.suspendTimer = null;
		}
	};

	RealtimeChannel.prototype.setInProgress = function(operation, value) {
		this.rest.channels.setInProgress(this, operation, value);
	};

	RealtimeChannel.prototype.history = function(params, callback) {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MICRO, 'RealtimeChannel.history()', 'channel = ' + this.name);
		/* params and callback are optional; see if params contains the callback */
		if(callback === undefined) {
			if(typeof(params) == 'function') {
				callback = params;
				params = null;
			} else {
				if(this.rest.options.promises) {
					return utils["a" /* default */].promisify(this, 'history', arguments);
				}
				callback = noop;
			}
		}

		if(params && params.untilAttach) {
			if(this.state !== 'attached') {
				callback(new errorinfo["a" /* default */]("option untilAttach requires the channel to be attached", 40000, 400));
				return;
			}
			if(!this.properties.attachSerial) {
				callback(new errorinfo["a" /* default */]("untilAttach was specified and channel is attached, but attachSerial is not defined", 40000, 400));
				return;
			}
			delete params.untilAttach;
			params.from_serial = this.properties.attachSerial;
		}

		client_channel.prototype._history.call(this, params, callback);
	};

	RealtimeChannel.prototype.whenState = function(state, listener) {
		return eventemitter["a" /* default */].prototype.whenState.call(this, state, this.state, listener);
	}

	/* @returns null (if can safely be released) | ErrorInfo (if cannot) */
	RealtimeChannel.prototype.getReleaseErr = function() {
		var s = this.state;
		if(s === 'initialized' || s === 'detached' || s === 'failed') {
			return null;
		}
		return new errorinfo["a" /* default */]('Can only release a channel in a state where there is no possibility of further updates from the server being received (initialized, detached, or failed); was ' + s, 90001, 400);
	}

	return RealtimeChannel;
})();

/* harmony default export */ var realtimechannel = (realtimechannel_RealtimeChannel);

// EXTERNAL MODULE: ./common/lib/util/errorreporter.js
var errorreporter = __webpack_require__(23);

// CONCATENATED MODULE: ./common/lib/client/realtime.js










var realtime_Realtime = (function() {

	function Realtime(options) {
		if(!(this instanceof Realtime)){
			return new Realtime(options);
		}

		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Realtime()', '');
		client_rest.call(this, options);
		this.connection = new connection(this, this.options);
		this.channels = new Channels(this);
		if(options.autoConnect !== false)
			this.connect();
	}
	utils["a" /* default */].inherits(Realtime, client_rest);

	Realtime.prototype.connect = function() {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Realtime.connect()', '');
		this.connection.connect();
	};

	Realtime.prototype.close = function() {
		logger["a" /* default */].logAction(logger["a" /* default */].LOG_MINOR, 'Realtime.close()', '');
		this.connection.close();
	};

	function Channels(realtime) {
		eventemitter["a" /* default */].call(this);
		this.realtime = realtime;
		this.all = {};
		this.inProgress = {};
		var self = this;
		realtime.connection.connectionManager.on('transport.active', function() {
			self.onTransportActive();
		});
	}
	utils["a" /* default */].inherits(Channels, eventemitter["a" /* default */]);

	Channels.prototype.onChannelMessage = function(msg) {
		var channelName = msg.channel;
		if(channelName === undefined) {
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Channels.onChannelMessage()', 'received event unspecified channel, action = ' + msg.action);
			return;
		}
		var channel = this.all[channelName];
		if(!channel) {
			logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Channels.onChannelMessage()', 'received event for non-existent channel: ' + channelName);
			return;
		}
		channel.onMessage(msg);
	};

	/* called when a transport becomes connected; reattempt attach/detach
	 * for channels that are attaching or detaching.
	 * Note that this does not use inProgress as inProgress is only channels which have already made
	* at least one attempt to attach/detach */
	Channels.prototype.onTransportActive = function() {
		for(var channelName in this.all) {
			var channel = this.all[channelName];
			if(channel.state === 'attaching' || channel.state === 'detaching') {
				channel.checkPendingState();
			} else if(channel.state === 'suspended') {
				channel.attach();
			}
		}
	};

	Channels.prototype.reattach = function(reason) {
		for(var channelId in this.all) {
			var channel = this.all[channelId];
			/* NB this should not trigger for merely attaching channels, as they will
			 * be reattached anyway through the onTransportActive checkPendingState */
			if(channel.state === 'attached') {
				channel.requestState('attaching', reason);
			}
		}
	};

	Channels.prototype.resetAttachedMsgIndicators = function() {
		for(var channelId in this.all) {
			var channel = this.all[channelId];
			if(channel.state === 'attached') {
			channel._attachedMsgIndicator = false;
			}
		}
	};

	Channels.prototype.checkAttachedMsgIndicators = function(connectionId) {
		for(var channelId in this.all) {
			var channel = this.all[channelId];
			if(channel.state === 'attached' && channel._attachedMsgIndicator === false) {
				var msg = '30s after a resume, found channel which has not received an attached; channelId = ' + channelId + '; connectionId = ' + connectionId;
				logger["a" /* default */].logAction(logger["a" /* default */].LOG_ERROR, 'Channels.checkAttachedMsgIndicators()', msg);
				errorreporter["a" /* default */].report('error', msg, 'channel-no-attached-after-resume');
				channel.requestState('attaching');
			};
		}
	};

	/* Connection interruptions (ie when the connection will no longer queue
	 * events) imply connection state changes for any channel which is either
	 * attached, pending, or will attempt to become attached in the future */
	Channels.prototype.propogateConnectionInterruption = function(connectionState, reason) {
		var connectionStateToChannelState = {
			'closing'  : 'detached',
			'closed'   : 'detached',
			'failed'   : 'failed',
			'suspended': 'suspended'
		};
		var fromChannelStates = ['attaching', 'attached', 'detaching', 'suspended'];
		var toChannelState = connectionStateToChannelState[connectionState];

		for(var channelId in this.all) {
			var channel = this.all[channelId];
			if(utils["a" /* default */].arrIn(fromChannelStates, channel.state)) {
				 channel.notifyState(toChannelState, reason);
			}
		}
	};

	Channels.prototype.get = function(name, channelOptions) {
		name = String(name);
		var channel = this.all[name];
		if(!channel) {
			channel = this.all[name] = new realtimechannel(this.realtime, name, channelOptions);
		} else if(channelOptions) {
			if (channel._shouldReattachToSetOptions(channelOptions)) {
				throw new errorinfo["a" /* default */]("Channels.get() cannot be used to set channel options that would cause the channel to reattach. Please, use RealtimeChannel.setOptions() instead.", 40000, 400);
			}
			channel.setOptions(channelOptions);
		}
		return channel;
	};

	/* Included to support certain niche use-cases; most users should ignore this.
	 * Please do not use this unless you know what you're doing */
	Channels.prototype.release = function(name) {
		name = String(name);
		var channel = this.all[name];
		if(!channel) {
			return;
		}
		var releaseErr = channel.getReleaseErr();
		if(releaseErr) {
			throw releaseErr;
		}
		delete this.all[name];
		delete this.inProgress[name];
	};

	/* Records operations currently pending on a transport; used by connectionManager to decide when
	 * it's safe to upgrade. Note that a channel might be in the attaching state without any pending
	 * operations (eg if attached while the connection state is connecting) - such a channel must not
	 * hold up an upgrade, so is not considered inProgress.
	 * Operation is currently one of either 'statechange' or 'sync' */
	Channels.prototype.setInProgress = function(channel, operation, inProgress) {
		this.inProgress[channel.name] = this.inProgress[channel.name] || {};
		this.inProgress[channel.name][operation] = inProgress;
		if(!inProgress && this.hasNopending()) {
			this.emit('nopending');
		}
	};

	Channels.prototype.onceNopending = function(listener) {
		if(this.hasNopending()) {
			listener();
			return;
		}
		this.once('nopending', listener);
	};

	Channels.prototype.hasNopending = function() {
		return utils["a" /* default */].arrEvery(utils["a" /* default */].valuesArray(this.inProgress, true), function(operations) {
			return !utils["a" /* default */].containsValue(operations, true);
		});
	};

	return Realtime;
})();

realtime_Realtime.Promise = function(options) {
	options = defaults["a" /* default */].objectifyOptions(options);
	options.promises = true;
	return new realtime_Realtime(options);
};

realtime_Realtime.Callbacks = realtime_Realtime;

/* harmony default export */ var client_realtime = (realtime_Realtime);

// EXTERNAL MODULE: ./browser/lib/util/msgpack.js
var util_msgpack = __webpack_require__(24);

// CONCATENATED MODULE: ./common/lib/index.js














client_rest.Utils = utils["a" /* default */];
client_rest.BufferUtils = bufferutils["a" /* default */];
client_rest.Crypto = util_crypto["a" /* default */];
client_rest.Defaults = defaults["a" /* default */];
client_rest.Http = http["a" /* default */];
client_rest.Resource = client_resource;
client_rest.Message = types_message["a" /* default */];
client_rest.PresenceMessage = presencemessage["a" /* default */];

client_realtime.Utils = utils["a" /* default */];
client_realtime.BufferUtils = bufferutils["a" /* default */];
client_realtime.Crypto = util_crypto["a" /* default */];
client_realtime.Defaults = defaults["a" /* default */];
client_realtime.Http = http["a" /* default */];
client_realtime.Message = types_message["a" /* default */];
client_realtime.PresenceMessage = presencemessage["a" /* default */];
client_realtime.ProtocolMessage = protocolmessage["a" /* default */];
client_realtime.ConnectionManager = connectionmanager["a" /* default */];

/* harmony default export */ var lib = __webpack_exports__["default"] = ({
  Rest: client_rest,
  Realtime: client_realtime,
  msgpack: util_msgpack["a" /* default */]
});


/***/ })
/******/ ])["default"];
});