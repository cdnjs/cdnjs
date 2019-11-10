/*!
 * State-based routing for AngularJS
 * @version v1.0.0-beta.2
 * @link https://ui-router.github.io
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("angular-ui-router", [], factory);
	else if(typeof exports === 'object')
		exports["angular-ui-router"] = factory();
	else
		root["angular-ui-router"] = factory();
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Main entry point for angular 1.x build
	 * @module ng1
	 */
	/** for typedoc */
	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(1));
	__export(__webpack_require__(54));
	__export(__webpack_require__(56));
	__webpack_require__(59);
	__webpack_require__(60);
	__webpack_require__(61);
	__webpack_require__(62);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "ui.router";


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/** @module common */ /** */
	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(2));
	__export(__webpack_require__(47));
	__export(__webpack_require__(48));
	__export(__webpack_require__(49));
	__export(__webpack_require__(50));
	__export(__webpack_require__(51));
	__export(__webpack_require__(52));
	__export(__webpack_require__(53));
	__export(__webpack_require__(45));
	var router_1 = __webpack_require__(25);
	exports.UIRouter = router_1.UIRouter;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/** @module common */ /** for typedoc */
	__export(__webpack_require__(3));
	__export(__webpack_require__(6));
	__export(__webpack_require__(7));
	__export(__webpack_require__(5));
	__export(__webpack_require__(4));
	__export(__webpack_require__(8));
	__export(__webpack_require__(9));
	__export(__webpack_require__(12));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Random utility functions used in the UI-Router code
	 *
	 * @preferred @module common
	 */ /** for typedoc */
	"use strict";
	var predicates_1 = __webpack_require__(4);
	var hof_1 = __webpack_require__(5);
	var coreservices_1 = __webpack_require__(6);
	var w = typeof window === 'undefined' ? {} : window;
	var angular = w.angular || {};
	exports.fromJson = angular.fromJson || JSON.parse.bind(JSON);
	exports.toJson = angular.toJson || JSON.stringify.bind(JSON);
	exports.copy = angular.copy || _copy;
	exports.forEach = angular.forEach || _forEach;
	exports.extend = angular.extend || _extend;
	exports.equals = angular.equals || _equals;
	exports.identity = function (x) { return x; };
	exports.noop = function () { return undefined; };
	/**
	 * Binds and copies functions onto an object
	 *
	 * Takes functions from the 'from' object, binds those functions to the _this object, and puts the bound functions
	 * on the 'to' object.
	 *
	 * This example creates an new class instance whose functions are prebound to the new'd object.
	 * @example
	 * ```
	 *
	 * class Foo {
	 *   constructor(data) {
	 *     // Binds all functions from Foo.prototype to 'this',
	 *     // then copies them to 'this'
	 *     bindFunctions(Foo.prototype, this, this);
	 *     this.data = data;
	 *   }
	 *
	 *   log() {
	 *     console.log(this.data);
	 *   }
	 * }
	 *
	 * let myFoo = new Foo([1,2,3]);
	 * var logit = myFoo.log;
	 * logit(); // logs [1, 2, 3] from the myFoo 'this' instance
	 * ```
	 *
	 * This example creates a bound version of a service function, and copies it to another object
	 * @example
	 * ```
	 *
	 * var SomeService = {
	 *   this.data = [3, 4, 5];
	 *   this.log = function() {
	 *     console.log(this.data);
	 *   }
	 * }
	 *
	 * // Constructor fn
	 * function OtherThing() {
	 *   // Binds all functions from SomeService to SomeService,
	 *   // then copies them to 'this'
	 *   bindFunctions(SomeService, this, SomeService);
	 * }
	 *
	 * let myOtherThing = new OtherThing();
	 * myOtherThing.log(); // logs [3, 4, 5] from SomeService's 'this'
	 * ```
	 *
	 * @param from The object which contains the functions to be bound
	 * @param to The object which will receive the bound functions
	 * @param bindTo The object which the functions will be bound to
	 * @param fnNames The function names which will be bound (Defaults to all the functions found on the 'from' object)
	 */
	function bindFunctions(from, to, bindTo, fnNames) {
	    if (fnNames === void 0) { fnNames = Object.keys(from); }
	    return fnNames.filter(function (name) { return typeof from[name] === 'function'; })
	        .forEach(function (name) { return to[name] = from[name].bind(bindTo); });
	}
	exports.bindFunctions = bindFunctions;
	/**
	 * prototypal inheritance helper.
	 * Creates a new object which has `parent` object as its prototype, and then copies the properties from `extra` onto it
	 */
	exports.inherit = function (parent, extra) {
	    return exports.extend(new (exports.extend(function () { }, { prototype: parent }))(), extra);
	};
	/**
	 * Given an arguments object, converts the arguments at index idx and above to an array.
	 * This is similar to es6 rest parameters.
	 *
	 * Optionally, the argument at index idx may itself already be an array.
	 *
	 * For example,
	 * given either:
	 *        arguments = [ obj, "foo", "bar" ]
	 * or:
	 *        arguments = [ obj, ["foo", "bar"] ]
	 * then:
	 *        restArgs(arguments, 1) == ["foo", "bar"]
	 *
	 * This allows functions like pick() to be implemented such that it allows either a bunch
	 * of string arguments (like es6 rest parameters), or a single array of strings:
	 *
	 * given:
	 *        var obj = { foo: 1, bar: 2, baz: 3 };
	 * then:
	 *        pick(obj, "foo", "bar");   // returns { foo: 1, bar: 2 }
	 *        pick(obj, ["foo", "bar"]); // returns { foo: 1, bar: 2 }
	 */
	var restArgs = function (args, idx) {
	    if (idx === void 0) { idx = 0; }
	    return Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(args, idx));
	};
	/** Given an array, returns true if the object is found in the array, (using indexOf) */
	exports.inArray = function (array, obj) {
	    return array.indexOf(obj) !== -1;
	};
	/** Given an array, and an item, if the item is found in the array, it removes it (in-place).  The same array is returned */
	exports.removeFrom = hof_1.curry(function (array, obj) {
	    var idx = array.indexOf(obj);
	    if (idx >= 0)
	        array.splice(idx, 1);
	    return array;
	});
	/**
	 * Applies a set of defaults to an options object.  The options object is filtered
	 * to only those properties of the objects in the defaultsList.
	 * Earlier objects in the defaultsList take precedence when applying defaults.
	 */
	function defaults(opts) {
	    if (opts === void 0) { opts = {}; }
	    var defaultsList = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        defaultsList[_i - 1] = arguments[_i];
	    }
	    var defaults = merge.apply(null, [{}].concat(defaultsList));
	    return exports.extend({}, defaults, pick(opts || {}, Object.keys(defaults)));
	}
	exports.defaults = defaults;
	/**
	 * Merges properties from the list of objects to the destination object.
	 * If a property already exists in the destination object, then it is not overwritten.
	 */
	function merge(dst) {
	    var objs = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        objs[_i - 1] = arguments[_i];
	    }
	    exports.forEach(objs, function (obj) {
	        exports.forEach(obj, function (value, key) {
	            if (!dst.hasOwnProperty(key))
	                dst[key] = value;
	        });
	    });
	    return dst;
	}
	exports.merge = merge;
	/** Reduce function that merges each element of the list into a single object, using extend */
	exports.mergeR = function (memo, item) { return exports.extend(memo, item); };
	/**
	 * Finds the common ancestor path between two states.
	 *
	 * @param {Object} first The first state.
	 * @param {Object} second The second state.
	 * @return {Array} Returns an array of state names in descending order, not including the root.
	 */
	function ancestors(first, second) {
	    var path = [];
	    for (var n in first.path) {
	        if (first.path[n] !== second.path[n])
	            break;
	        path.push(first.path[n]);
	    }
	    return path;
	}
	exports.ancestors = ancestors;
	/**
	 * Performs a non-strict comparison of the subset of two objects, defined by a list of keys.
	 *
	 * @param {Object} a The first object.
	 * @param {Object} b The second object.
	 * @param {Array} keys The list of keys within each object to compare. If the list is empty or not specified,
	 *                     it defaults to the list of keys in `a`.
	 * @return {Boolean} Returns `true` if the keys match, otherwise `false`.
	 */
	function equalForKeys(a, b, keys) {
	    if (keys === void 0) { keys = Object.keys(a); }
	    for (var i = 0; i < keys.length; i++) {
	        var k = keys[i];
	        if (a[k] != b[k])
	            return false; // Not '===', values aren't necessarily normalized
	    }
	    return true;
	}
	exports.equalForKeys = equalForKeys;
	function pickOmitImpl(predicate, obj) {
	    var keys = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        keys[_i - 2] = arguments[_i];
	    }
	    var objCopy = {};
	    for (var key in obj) {
	        if (predicate(keys, key))
	            objCopy[key] = obj[key];
	    }
	    return objCopy;
	}
	/** Return a copy of the object only containing the whitelisted properties. */
	function pick(obj) {
	    return pickOmitImpl.apply(null, [exports.inArray].concat(restArgs(arguments)));
	}
	exports.pick = pick;
	/** Return a copy of the object omitting the blacklisted properties. */
	function omit(obj) {
	    var notInArray = function (array, item) { return !exports.inArray(array, item); };
	    return pickOmitImpl.apply(null, [notInArray].concat(restArgs(arguments)));
	}
	exports.omit = omit;
	/**
	 * Maps an array, or object to a property (by name)
	 */
	function pluck(collection, propName) {
	    return map(collection, hof_1.prop(propName));
	}
	exports.pluck = pluck;
	/** Filters an Array or an Object's properties based on a predicate */
	function filter(collection, callback) {
	    var arr = predicates_1.isArray(collection), result = arr ? [] : {};
	    var accept = arr ? function (x) { return result.push(x); } : function (x, key) { return result[key] = x; };
	    exports.forEach(collection, function (item, i) {
	        if (callback(item, i))
	            accept(item, i);
	    });
	    return result;
	}
	exports.filter = filter;
	/** Finds an object from an array, or a property of an object, that matches a predicate */
	function find(collection, callback) {
	    var result;
	    exports.forEach(collection, function (item, i) {
	        if (result)
	            return;
	        if (callback(item, i))
	            result = item;
	    });
	    return result;
	}
	exports.find = find;
	/** Given an object, returns a new object, where each property is transformed by the callback function */
	exports.mapObj = map;
	/** Maps an array or object properties using a callback function */
	function map(collection, callback) {
	    var result = predicates_1.isArray(collection) ? [] : {};
	    exports.forEach(collection, function (item, i) { return result[i] = callback(item, i); });
	    return result;
	}
	exports.map = map;
	/**
	 * Given an object, return its enumerable property values
	 *
	 * @example
	 * ```
	 *
	 * let foo = { a: 1, b: 2, c: 3 }
	 * let vals = values(foo); // [ 1, 2, 3 ]
	 * ```
	 */
	exports.values = function (obj) {
	    return Object.keys(obj).map(function (key) { return obj[key]; });
	};
	/**
	 * Reduce function that returns true if all of the values are truthy.
	 *
	 * @example
	 * ```
	 *
	 * let vals = [ 1, true, {}, "hello world"];
	 * vals.reduce(allTrueR, true); // true
	 *
	 * vals.push(0);
	 * vals.reduce(allTrueR, true); // false
	 * ```
	 */
	exports.allTrueR = function (memo, elem) { return memo && elem; };
	/**
	 * Reduce function that returns true if any of the values are truthy.
	 *
	 *  * @example
	 * ```
	 *
	 * let vals = [ 0, null, undefined ];
	 * vals.reduce(anyTrueR, true); // false
	 *
	 * vals.push("hello world");
	 * vals.reduce(anyTrueR, true); // true
	 * ```
	 */
	exports.anyTrueR = function (memo, elem) { return memo || elem; };
	/**
	 * Reduce function which un-nests a single level of arrays
	 * @example
	 * ```
	 *
	 * let input = [ [ "a", "b" ], [ "c", "d" ], [ [ "double", "nested" ] ] ];
	 * input.reduce(unnestR, []) // [ "a", "b", "c", "d", [ "double, "nested" ] ]
	 * ```
	 */
	exports.unnestR = function (memo, elem) { return memo.concat(elem); };
	/**
	 * Reduce function which recursively un-nests all arrays
	 *
	 * @example
	 * ```
	 *
	 * let input = [ [ "a", "b" ], [ "c", "d" ], [ [ "double", "nested" ] ] ];
	 * input.reduce(unnestR, []) // [ "a", "b", "c", "d", "double, "nested" ]
	 * ```
	 */
	exports.flattenR = function (memo, elem) {
	    return predicates_1.isArray(elem) ? memo.concat(elem.reduce(exports.flattenR, [])) : pushR(memo, elem);
	};
	/**
	 * Reduce function that pushes an object to an array, then returns the array.
	 * Mostly just for [[flattenR]] and [[uniqR]]
	 */
	function pushR(arr, obj) {
	    arr.push(obj);
	    return arr;
	}
	exports.pushR = pushR;
	/** Reduce function that filters out duplicates */
	exports.uniqR = function (acc, token) {
	    return exports.inArray(acc, token) ? acc : pushR(acc, token);
	};
	/**
	 * Return a new array with a single level of arrays unnested.
	 *
	 * @example
	 * ```
	 *
	 * let input = [ [ "a", "b" ], [ "c", "d" ], [ [ "double", "nested" ] ] ];
	 * unnest(input) // [ "a", "b", "c", "d", [ "double, "nested" ] ]
	 * ```
	 */
	exports.unnest = function (arr) { return arr.reduce(exports.unnestR, []); };
	/**
	 * Return a completely flattened version of an array.
	 *
	 * @example
	 * ```
	 *
	 * let input = [ [ "a", "b" ], [ "c", "d" ], [ [ "double", "nested" ] ] ];
	 * flatten(input) // [ "a", "b", "c", "d", "double, "nested" ]
	 * ```
	 */
	exports.flatten = function (arr) { return arr.reduce(exports.flattenR, []); };
	/**
	 * Given a .filter Predicate, builds a .filter Predicate which throws an error if any elements do not pass.
	 * @example
	 * ```
	 *
	 * let isNumber = (obj) => typeof(obj) === 'number';
	 * let allNumbers = [ 1, 2, 3, 4, 5 ];
	 * allNumbers.filter(assertPredicate(isNumber)); //OK
	 *
	 * let oneString = [ 1, 2, 3, 4, "5" ];
	 * oneString.filter(assertPredicate(isNumber, "Not all numbers")); // throws Error(""Not all numbers"");
	 * ```
	 */
	function assertPredicate(predicate, errMsg) {
	    if (errMsg === void 0) { errMsg = "assert failure"; }
	    return function (obj) {
	        if (!predicate(obj)) {
	            throw new Error(predicates_1.isFunction(errMsg) ? errMsg(obj) : errMsg);
	        }
	        return true;
	    };
	}
	exports.assertPredicate = assertPredicate;
	/**
	 * Like _.pairs: Given an object, returns an array of key/value pairs
	 *
	 * @example
	 * ```
	 *
	 * pairs({ foo: "FOO", bar: "BAR }) // [ [ "foo", "FOO" ], [ "bar": "BAR" ] ]
	 * ```
	 */
	exports.pairs = function (obj) {
	    return Object.keys(obj).map(function (key) { return [key, obj[key]]; });
	};
	/**
	 * Given two or more parallel arrays, returns an array of tuples where
	 * each tuple is composed of [ a[i], b[i], ... z[i] ]
	 *
	 * @example
	 * ```
	 *
	 * let foo = [ 0, 2, 4, 6 ];
	 * let bar = [ 1, 3, 5, 7 ];
	 * let baz = [ 10, 30, 50, 70 ];
	 * arrayTuples(foo, bar);       // [ [0, 1], [2, 3], [4, 5], [6, 7] ]
	 * arrayTuples(foo, bar, baz);  // [ [0, 1, 10], [2, 3, 30], [4, 5, 50], [6, 7, 70] ]
	 * ```
	 */
	function arrayTuples() {
	    var arrayArgs = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        arrayArgs[_i - 0] = arguments[_i];
	    }
	    if (arrayArgs.length === 0)
	        return [];
	    var length = arrayArgs.reduce(function (min, arr) { return Math.min(arr.length, min); }, 9007199254740991); // aka 2^53 − 1 aka Number.MAX_SAFE_INTEGER
	    return Array.apply(null, Array(length)).map(function (ignored, idx) { return arrayArgs.map(function (arr) { return arr[idx]; }); });
	}
	exports.arrayTuples = arrayTuples;
	/**
	 * Reduce function which builds an object from an array of [key, value] pairs.
	 *
	 * Each iteration sets the key/val pair on the memo object, then returns the memo for the next iteration.
	 *
	 * Each keyValueTuple should be an array with values [ key: string, value: any ]
	 *
	 * @example
	 * ```
	 *
	 * var pairs = [ ["fookey", "fooval"], ["barkey", "barval"] ]
	 *
	 * var pairsToObj = pairs.reduce((memo, pair) => applyPairs(memo, pair), {})
	 * // pairsToObj == { fookey: "fooval", barkey: "barval" }
	 *
	 * // Or, more simply:
	 * var pairsToObj = pairs.reduce(applyPairs, {})
	 * // pairsToObj == { fookey: "fooval", barkey: "barval" }
	 * ```
	 */
	function applyPairs(memo, keyValTuple) {
	    var key, value;
	    if (predicates_1.isArray(keyValTuple))
	        key = keyValTuple[0], value = keyValTuple[1];
	    if (!predicates_1.isString(key))
	        throw new Error("invalid parameters to applyPairs");
	    memo[key] = value;
	    return memo;
	}
	exports.applyPairs = applyPairs;
	/** Get the last element of an array */
	function tail(arr) {
	    return arr.length && arr[arr.length - 1] || undefined;
	}
	exports.tail = tail;
	/**
	 * shallow copy from src to dest
	 *
	 * note: This is a shallow copy, while angular.copy is a deep copy.
	 * ui-router uses `copy` only to make copies of state parameters.
	 */
	function _copy(src, dest) {
	    if (dest)
	        Object.keys(dest).forEach(function (key) { return delete dest[key]; });
	    if (!dest)
	        dest = {};
	    return exports.extend(dest, src);
	}
	/** Naive forEach implementation works with Objects or Arrays */
	function _forEach(obj, cb, _this) {
	    if (predicates_1.isArray(obj))
	        return obj.forEach(cb, _this);
	    Object.keys(obj).forEach(function (key) { return cb(obj[key], key); });
	}
	function _copyProps(to, from) {
	    Object.keys(from).forEach(function (key) { return to[key] = from[key]; });
	    return to;
	}
	function _extend(toObj) {
	    return restArgs(arguments, 1).filter(exports.identity).reduce(_copyProps, toObj);
	}
	function _equals(o1, o2) {
	    if (o1 === o2)
	        return true;
	    if (o1 === null || o2 === null)
	        return false;
	    if (o1 !== o1 && o2 !== o2)
	        return true; // NaN === NaN
	    var t1 = typeof o1, t2 = typeof o2;
	    if (t1 !== t2 || t1 !== 'object')
	        return false;
	    var tup = [o1, o2];
	    if (hof_1.all(predicates_1.isArray)(tup))
	        return _arraysEq(o1, o2);
	    if (hof_1.all(predicates_1.isDate)(tup))
	        return o1.getTime() === o2.getTime();
	    if (hof_1.all(predicates_1.isRegExp)(tup))
	        return o1.toString() === o2.toString();
	    if (hof_1.all(predicates_1.isFunction)(tup))
	        return true; // meh
	    var predicates = [predicates_1.isFunction, predicates_1.isArray, predicates_1.isDate, predicates_1.isRegExp];
	    if (predicates.map(hof_1.any).reduce(function (b, fn) { return b || !!fn(tup); }, false))
	        return false;
	    var key, keys = {};
	    for (key in o1) {
	        if (!_equals(o1[key], o2[key]))
	            return false;
	        keys[key] = true;
	    }
	    for (key in o2) {
	        if (!keys[key])
	            return false;
	    }
	    return true;
	}
	function _arraysEq(a1, a2) {
	    if (a1.length !== a2.length)
	        return false;
	    return arrayTuples(a1, a2).reduce(function (b, t) { return b && _equals(t[0], t[1]); }, true);
	}
	// issue #2676
	exports.silenceUncaughtInPromise = function (promise) {
	    return promise.catch(function (e) { return 0; }) && promise;
	};
	exports.silentRejection = function (error) {
	    return exports.silenceUncaughtInPromise(coreservices_1.services.$q.reject(error));
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** Predicates @module common_predicates */ /** */
	var hof_1 = __webpack_require__(5);
	var toStr = Object.prototype.toString;
	var tis = function (t) { return function (x) { return typeof (x) === t; }; };
	exports.isUndefined = tis('undefined');
	exports.isDefined = hof_1.not(exports.isUndefined);
	exports.isNull = function (o) { return o === null; };
	exports.isFunction = tis('function');
	exports.isNumber = tis('number');
	exports.isString = tis('string');
	exports.isObject = function (x) { return x !== null && typeof x === 'object'; };
	exports.isArray = Array.isArray;
	exports.isDate = (function (x) { return toStr.call(x) === '[object Date]'; });
	exports.isRegExp = (function (x) { return toStr.call(x) === '[object RegExp]'; });
	/**
	 * Predicate which checks if a value is injectable
	 *
	 * A value is "injectable" if it is a function, or if it is an ng1 array-notation-style array
	 * where all the elements in the array are Strings, except the last one, which is a Function
	 */
	function isInjectable(val) {
	    if (exports.isArray(val) && val.length) {
	        var head = val.slice(0, -1), tail = val.slice(-1);
	        return !(head.filter(hof_1.not(exports.isString)).length || tail.filter(hof_1.not(exports.isFunction)).length);
	    }
	    return exports.isFunction(val);
	}
	exports.isInjectable = isInjectable;
	/**
	 * Predicate which checks if a value looks like a Promise
	 *
	 * It is probably a Promise if it's an object, and it has a `then` property which is a Function
	 */
	exports.isPromise = hof_1.and(exports.isObject, hof_1.pipe(hof_1.prop('then'), exports.isFunction));


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Higher order functions
	 *
	 * @module common_hof
	 */ /** */
	"use strict";
	/**
	 * Returns a new function for [Partial Application](https://en.wikipedia.org/wiki/Partial_application) of the original function.
	 *
	 * Given a function with N parameters, returns a new function that supports partial application.
	 * The new function accepts anywhere from 1 to N parameters.  When that function is called with M parameters,
	 * where M is less than N, it returns a new function that accepts the remaining parameters.  It continues to
	 * accept more parameters until all N parameters have been supplied.
	 *
	 *
	 * This contrived example uses a partially applied function as an predicate, which returns true
	 * if an object is found in both arrays.
	 * @example
	 * ```
	 * // returns true if an object is in both of the two arrays
	 * function inBoth(array1, array2, object) {
	 *   return array1.indexOf(object) !== -1 &&
	 *          array2.indexOf(object) !== 1;
	 * }
	 * let obj1, obj2, obj3, obj4, obj5, obj6, obj7
	 * let foos = [obj1, obj3]
	 * let bars = [obj3, obj4, obj5]
	 *
	 * // A curried "copy" of inBoth
	 * let curriedInBoth = curry(inBoth);
	 * // Partially apply both the array1 and array2
	 * let inFoosAndBars = curriedInBoth(foos, bars);
	 *
	 * // Supply the final argument; since all arguments are
	 * // supplied, the original inBoth function is then called.
	 * let obj1InBoth = inFoosAndBars(obj1); // false
	 *
	 * // Use the inFoosAndBars as a predicate.
	 * // Filter, on each iteration, supplies the final argument
	 * let allObjs = [ obj1, obj2, obj3, obj4, obj5, obj6, obj7 ];
	 * let foundInBoth = allObjs.filter(inFoosAndBars); // [ obj3 ]
	 *
	 * ```
	 *
	 * Stolen from: http://stackoverflow.com/questions/4394747/javascript-curry-function
	 *
	 * @param fn
	 * @returns {*|function(): (*|any)}
	 */
	function curry(fn) {
	    var initial_args = [].slice.apply(arguments, [1]);
	    var func_args_length = fn.length;
	    function curried(args) {
	        if (args.length >= func_args_length)
	            return fn.apply(null, args);
	        return function () {
	            return curried(args.concat([].slice.apply(arguments)));
	        };
	    }
	    return curried(initial_args);
	}
	exports.curry = curry;
	/**
	 * Given a varargs list of functions, returns a function that composes the argument functions, right-to-left
	 * given: f(x), g(x), h(x)
	 * let composed = compose(f,g,h)
	 * then, composed is: f(g(h(x)))
	 */
	function compose() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function () {
	        var i = start, result = args[start].apply(this, arguments);
	        while (i--)
	            result = args[i].call(this, result);
	        return result;
	    };
	}
	exports.compose = compose;
	/**
	 * Given a varargs list of functions, returns a function that is composes the argument functions, left-to-right
	 * given: f(x), g(x), h(x)
	 * let piped = pipe(f,g,h);
	 * then, piped is: h(g(f(x)))
	 */
	function pipe() {
	    var funcs = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        funcs[_i - 0] = arguments[_i];
	    }
	    return compose.apply(null, [].slice.call(arguments).reverse());
	}
	exports.pipe = pipe;
	/**
	 * Given a property name, returns a function that returns that property from an object
	 * let obj = { foo: 1, name: "blarg" };
	 * let getName = prop("name");
	 * getName(obj) === "blarg"
	 */
	exports.prop = function (name) {
	    return function (obj) { return obj && obj[name]; };
	};
	/**
	 * Given a property name and a value, returns a function that returns a boolean based on whether
	 * the passed object has a property that matches the value
	 * let obj = { foo: 1, name: "blarg" };
	 * let getName = propEq("name", "blarg");
	 * getName(obj) === true
	 */
	exports.propEq = curry(function (name, val, obj) { return obj && obj[name] === val; });
	/**
	 * Given a dotted property name, returns a function that returns a nested property from an object, or undefined
	 * let obj = { id: 1, nestedObj: { foo: 1, name: "blarg" }, };
	 * let getName = prop("nestedObj.name");
	 * getName(obj) === "blarg"
	 * let propNotFound = prop("this.property.doesnt.exist");
	 * propNotFound(obj) === undefined
	 */
	exports.parse = function (name) {
	    return pipe.apply(null, name.split(".").map(exports.prop));
	};
	/**
	 * Given a function that returns a truthy or falsey value, returns a
	 * function that returns the opposite (falsey or truthy) value given the same inputs
	 */
	exports.not = function (fn) {
	    return function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        return !fn.apply(null, args);
	    };
	};
	/**
	 * Given two functions that return truthy or falsey values, returns a function that returns truthy
	 * if both functions return truthy for the given arguments
	 */
	function and(fn1, fn2) {
	    return function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        return fn1.apply(null, args) && fn2.apply(null, args);
	    };
	}
	exports.and = and;
	/**
	 * Given two functions that return truthy or falsey values, returns a function that returns truthy
	 * if at least one of the functions returns truthy for the given arguments
	 */
	function or(fn1, fn2) {
	    return function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        return fn1.apply(null, args) || fn2.apply(null, args);
	    };
	}
	exports.or = or;
	/**
	 * Check if all the elements of an array match a predicate function
	 *
	 * @param fn1 a predicate function `fn1`
	 * @returns a function which takes an array and returns true if `fn1` is true for all elements of the array
	 */
	exports.all = function (fn1) {
	    return function (arr) { return arr.reduce(function (b, x) { return b && !!fn1(x); }, true); };
	};
	exports.any = function (fn1) {
	    return function (arr) { return arr.reduce(function (b, x) { return b || !!fn1(x); }, false); };
	};
	/** Given a class, returns a Predicate function that returns true if the object is of that class */
	exports.is = function (ctor) { return function (obj) {
	    return (obj != null && obj.constructor === ctor || obj instanceof ctor);
	}; };
	/** Given a value, returns a Predicate function that returns true if another value is === equal to the original value */
	exports.eq = function (val) { return function (other) {
	    return val === other;
	}; };
	/** Given a value, returns a function which returns the value */
	exports.val = function (v) { return function () { return v; }; };
	function invoke(fnName, args) {
	    return function (obj) {
	        return obj[fnName].apply(obj, args);
	    };
	}
	exports.invoke = invoke;
	/**
	 * Sorta like Pattern Matching (a functional programming conditional construct)
	 *
	 * See http://c2.com/cgi/wiki?PatternMatching
	 *
	 * This is a conditional construct which allows a series of predicates and output functions
	 * to be checked and then applied.  Each predicate receives the input.  If the predicate
	 * returns truthy, then its matching output function (mapping function) is provided with
	 * the input and, then the result is returned.
	 *
	 * Each combination (2-tuple) of predicate + output function should be placed in an array
	 * of size 2: [ predicate, mapFn ]
	 *
	 * These 2-tuples should be put in an outer array.
	 *
	 * @example
	 * ```
	 *
	 * // Here's a 2-tuple where the first element is the isString predicate
	 * // and the second element is a function that returns a description of the input
	 * let firstTuple = [ angular.isString, (input) => `Heres your string ${input}` ];
	 *
	 * // Second tuple: predicate "isNumber", mapfn returns a description
	 * let secondTuple = [ angular.isNumber, (input) => `(${input}) That's a number!` ];
	 *
	 * let third = [ (input) => input === null,  (input) => `Oh, null...` ];
	 *
	 * let fourth = [ (input) => input === undefined,  (input) => `notdefined` ];
	 *
	 * let descriptionOf = pattern([ firstTuple, secondTuple, third, fourth ]);
	 *
	 * console.log(descriptionOf(undefined)); // 'notdefined'
	 * console.log(descriptionOf(55)); // '(55) That's a number!'
	 * console.log(descriptionOf("foo")); // 'Here's your string foo'
	 * ```
	 *
	 * @param struct A 2D array.  Each element of the array should be an array, a 2-tuple,
	 * with a Predicate and a mapping/output function
	 * @returns {function(any): *}
	 */
	function pattern(struct) {
	    return function (x) {
	        for (var i = 0; i < struct.length; i++) {
	            if (struct[i][0](x))
	                return struct[i][1](x);
	        }
	    };
	}
	exports.pattern = pattern;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	var notImplemented = function (fnname) { return function () {
	    throw new Error(fnname + "(): No coreservices implementation for UI-Router is loaded. You should include one of: ['angular1.js']");
	}; };
	var services = {
	    $q: undefined,
	    $injector: undefined,
	    location: {},
	    locationConfig: {},
	    template: {}
	};
	exports.services = services;
	["setUrl", "path", "search", "hash", "onChange"]
	    .forEach(function (key) { return services.location[key] = notImplemented(key); });
	["port", "protocol", "host", "baseHref", "html5Mode", "hashPrefix"]
	    .forEach(function (key) { return services.locationConfig[key] = notImplemented(key); });


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	/** @module common */
	/**
	 * Matches state names using glob-like pattern strings.
	 *
	 * Globs can be used in specific APIs including:
	 *
	 * - [[StateService.is]]
	 * - [[StateService.includes]]
	 * - [[HookMatchCriteria.to]]
	 * - [[HookMatchCriteria.from]]
	 * - [[HookMatchCriteria.exiting]]
	 * - [[HookMatchCriteria.retained]]
	 * - [[HookMatchCriteria.entering]]
	 *
	 * A `Glob` string is a pattern which matches state names.
	 * Nested state names are split into segments (separated by a dot) when processing.
	 * The state named `foo.bar.baz` is split into three segments ['foo', 'bar', 'baz']
	 *
	 * Globs work according to the following rules:
	 *
	 * ### Exact match:
	 *
	 * The glob `'A.B'` matches the state named exactly `'A.B'`.
	 *
	 * | Glob        |Matches states named|Does not match state named|
	 * |:------------|:--------------------|:---------------------|
	 * | `'A'`       | `'A'`               | `'B'` , `'A.C'`      |
	 * | `'A.B'`     | `'A.B'`             | `'A'` , `'A.B.C'`    |
	 * | `'foo'`     | `'foo'`             | `'FOO'` , `'foo.bar'`|
	 *
	 * ### Single star (`*`)
	 *
	 * A single star (`*`) is a wildcard that matches exactly one segment.
	 *
	 * | Glob        |Matches states named  |Does not match state named |
	 * |:------------|:---------------------|:--------------------------|
	 * | `'*'`       | `'A'` , `'Z'`        | `'A.B'` , `'Z.Y.X'`       |
	 * | `'A.*'`     | `'A.B'` , `'A.C'`    | `'A'` , `'A.B.C'`         |
	 * | `'A.*.*'`   | `'A.B.C'` , `'A.X.Y'`| `'A'`, `'A.B'` , `'Z.Y.X'`|
	 *
	 * ### Double star (`**`)
	 *
	 * A double star (`'**'`) is a wildcard that matches *zero or more segments*
	 *
	 * | Glob        |Matches states named                           |Does not match state named         |
	 * |:------------|:----------------------------------------------|:----------------------------------|
	 * | `'**'`      | `'A'` , `'A.B'`, `'Z.Y.X'`                    | (matches all states)              |
	 * | `'A.**'`    | `'A'` , `'A.B'` , `'A.C.X'`                   | `'Z.Y.X'`                         |
	 * | `'**.X'`    | `'X'` , `'A.X'` , `'Z.Y.X'`                   | `'A'` , `'A.login.Z'`             |
	 * | `'A.**.X'`  | `'A.X'` , `'A.B.X'` , `'A.B.C.X'`             | `'A'` , `'A.B.C'`                 |
	 *
	 */
	var Glob = (function () {
	    function Glob(text) {
	        this.text = text;
	        this.glob = text.split('.');
	        var regexpString = this.text.split('.')
	            .map(function (seg) {
	            if (seg === '**')
	                return '(?:|(?:\\.[^.]*)*)';
	            if (seg === '*')
	                return '\\.[^.]*';
	            return '\\.' + seg;
	        }).join('');
	        this.regexp = new RegExp("^" + regexpString + "$");
	    }
	    Glob.prototype.matches = function (name) {
	        return this.regexp.test('.' + name);
	    };
	    /** @deprecated whats the point? */
	    Glob.is = function (text) {
	        return text.indexOf('*') > -1;
	    };
	    /** @deprecated whats the point? */
	    Glob.fromString = function (text) {
	        if (!this.is(text))
	            return null;
	        return new Glob(text);
	    };
	    return Glob;
	}());
	exports.Glob = Glob;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/** @module common */ /** for typedoc */
	"use strict";
	var Queue = (function () {
	    function Queue(_items, _limit) {
	        if (_items === void 0) { _items = []; }
	        if (_limit === void 0) { _limit = null; }
	        this._items = _items;
	        this._limit = _limit;
	    }
	    Queue.prototype.enqueue = function (item) {
	        var items = this._items;
	        items.push(item);
	        if (this._limit && items.length > this._limit)
	            items.shift();
	        return item;
	    };
	    Queue.prototype.dequeue = function () {
	        if (this.size())
	            return this._items.splice(0, 1)[0];
	    };
	    Queue.prototype.clear = function () {
	        var current = this._items;
	        this._items = [];
	        return current;
	    };
	    Queue.prototype.size = function () {
	        return this._items.length;
	    };
	    Queue.prototype.remove = function (item) {
	        var idx = this._items.indexOf(item);
	        return idx > -1 && this._items.splice(idx, 1)[0];
	    };
	    Queue.prototype.peekTail = function () {
	        return this._items[this._items.length - 1];
	    };
	    Queue.prototype.peekHead = function () {
	        if (this.size())
	            return this._items[0];
	    };
	    return Queue;
	}());
	exports.Queue = Queue;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/** @module common_strings */ /** */
	"use strict";
	var predicates_1 = __webpack_require__(4);
	var rejectFactory_1 = __webpack_require__(10);
	var common_1 = __webpack_require__(3);
	var hof_1 = __webpack_require__(5);
	var transition_1 = __webpack_require__(11);
	var resolvable_1 = __webpack_require__(19);
	/**
	 * Returns a string shortened to a maximum length
	 *
	 * If the string is already less than the `max` length, return the string.
	 * Else return the string, shortened to `max - 3` and append three dots ("...").
	 *
	 * @param max the maximum length of the string to return
	 * @param str the input string
	 */
	function maxLength(max, str) {
	    if (str.length <= max)
	        return str;
	    return str.substr(0, max - 3) + "...";
	}
	exports.maxLength = maxLength;
	/**
	 * Returns a string, with spaces added to the end, up to a desired str length
	 *
	 * If the string is already longer than the desired length, return the string.
	 * Else returns the string, with extra spaces on the end, such that it reaches `length` characters.
	 *
	 * @param length the desired length of the string to return
	 * @param str the input string
	 */
	function padString(length, str) {
	    while (str.length < length)
	        str += " ";
	    return str;
	}
	exports.padString = padString;
	function kebobString(camelCase) {
	    return camelCase
	        .replace(/^([A-Z])/, function ($1) { return $1.toLowerCase(); }) // replace first char
	        .replace(/([A-Z])/g, function ($1) { return "-" + $1.toLowerCase(); }); // replace rest
	}
	exports.kebobString = kebobString;
	function _toJson(obj) {
	    return JSON.stringify(obj);
	}
	function _fromJson(json) {
	    return predicates_1.isString(json) ? JSON.parse(json) : json;
	}
	function promiseToString(p) {
	    return "Promise(" + JSON.stringify(p) + ")";
	}
	function functionToString(fn) {
	    var fnStr = fnToString(fn);
	    var namedFunctionMatch = fnStr.match(/^(function [^ ]+\([^)]*\))/);
	    return namedFunctionMatch ? namedFunctionMatch[1] : fnStr;
	}
	exports.functionToString = functionToString;
	function fnToString(fn) {
	    var _fn = predicates_1.isArray(fn) ? fn.slice(-1)[0] : fn;
	    return _fn && _fn.toString() || "undefined";
	}
	exports.fnToString = fnToString;
	var stringifyPatternFn = null;
	var stringifyPattern = function (value) {
	    var isTransitionRejectionPromise = rejectFactory_1.Rejection.isTransitionRejectionPromise;
	    stringifyPatternFn = stringifyPatternFn || hof_1.pattern([
	        [hof_1.not(predicates_1.isDefined), hof_1.val("undefined")],
	        [predicates_1.isNull, hof_1.val("null")],
	        [predicates_1.isPromise, hof_1.val("[Promise]")],
	        [isTransitionRejectionPromise, function (x) { return x._transitionRejection.toString(); }],
	        [hof_1.is(rejectFactory_1.Rejection), hof_1.invoke("toString")],
	        [hof_1.is(transition_1.Transition), hof_1.invoke("toString")],
	        [hof_1.is(resolvable_1.Resolvable), hof_1.invoke("toString")],
	        [predicates_1.isInjectable, functionToString],
	        [hof_1.val(true), common_1.identity]
	    ]);
	    return stringifyPatternFn(value);
	};
	function stringify(o) {
	    var seen = [];
	    function format(val) {
	        if (predicates_1.isObject(val)) {
	            if (seen.indexOf(val) !== -1)
	                return '[circular ref]';
	            seen.push(val);
	        }
	        return stringifyPattern(val);
	    }
	    return JSON.stringify(o, function (key, val) { return format(val); }).replace(/\\"/g, '"');
	}
	exports.stringify = stringify;
	/** Returns a function that splits a string on a character or substring */
	exports.beforeAfterSubstr = function (char) { return function (str) {
	    if (!str)
	        return ["", ""];
	    var idx = str.indexOf(char);
	    if (idx === -1)
	        return [str, ""];
	    return [str.substr(0, idx), str.substr(idx + 1)];
	}; };


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/** @module transition */ /** for typedoc */
	"use strict";
	var common_1 = __webpack_require__(3);
	var strings_1 = __webpack_require__(9);
	(function (RejectType) {
	    RejectType[RejectType["SUPERSEDED"] = 2] = "SUPERSEDED";
	    RejectType[RejectType["ABORTED"] = 3] = "ABORTED";
	    RejectType[RejectType["INVALID"] = 4] = "INVALID";
	    RejectType[RejectType["IGNORED"] = 5] = "IGNORED";
	    RejectType[RejectType["ERROR"] = 6] = "ERROR";
	})(exports.RejectType || (exports.RejectType = {}));
	var RejectType = exports.RejectType;
	var Rejection = (function () {
	    function Rejection(type, message, detail) {
	        this.type = type;
	        this.message = message;
	        this.detail = detail;
	    }
	    Rejection.prototype.toString = function () {
	        var detailString = function (d) {
	            return d && d.toString !== Object.prototype.toString ? d.toString() : strings_1.stringify(d);
	        };
	        var type = this.type, message = this.message, detail = detailString(this.detail);
	        return "TransitionRejection(type: " + type + ", message: " + message + ", detail: " + detail + ")";
	    };
	    Rejection.prototype.toPromise = function () {
	        return common_1.extend(common_1.silentRejection(this), { _transitionRejection: this });
	    };
	    /** Returns true if the obj is a rejected promise created from the `asPromise` factory */
	    Rejection.isTransitionRejectionPromise = function (obj) {
	        return obj && (typeof obj.then === 'function') && obj._transitionRejection instanceof Rejection;
	    };
	    /** Returns a TransitionRejection due to transition superseded */
	    Rejection.superseded = function (detail, options) {
	        var message = "The transition has been superseded by a different transition";
	        var rejection = new Rejection(RejectType.SUPERSEDED, message, detail);
	        if (options && options.redirected) {
	            rejection.redirected = true;
	        }
	        return rejection;
	    };
	    /** Returns a TransitionRejection due to redirected transition */
	    Rejection.redirected = function (detail) {
	        return Rejection.superseded(detail, { redirected: true });
	    };
	    /** Returns a TransitionRejection due to invalid transition */
	    Rejection.invalid = function (detail) {
	        var message = "This transition is invalid";
	        return new Rejection(RejectType.INVALID, message, detail);
	    };
	    /** Returns a TransitionRejection due to ignored transition */
	    Rejection.ignored = function (detail) {
	        var message = "The transition was ignored";
	        return new Rejection(RejectType.IGNORED, message, detail);
	    };
	    /** Returns a TransitionRejection due to aborted transition */
	    Rejection.aborted = function (detail) {
	        // TODO think about how to encapsulate an Error() object
	        var message = "The transition has been aborted";
	        return new Rejection(RejectType.ABORTED, message, detail);
	    };
	    /** Returns a TransitionRejection due to aborted transition */
	    Rejection.errored = function (detail) {
	        // TODO think about how to encapsulate an Error() object
	        var message = "The transition errored";
	        return new Rejection(RejectType.ERROR, message, detail);
	    };
	    return Rejection;
	}());
	exports.Rejection = Rejection;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module transition */ /** for typedoc */
	var strings_1 = __webpack_require__(9);
	var trace_1 = __webpack_require__(12);
	var coreservices_1 = __webpack_require__(6);
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var hof_1 = __webpack_require__(5);
	var transitionHook_1 = __webpack_require__(13);
	var hookRegistry_1 = __webpack_require__(15);
	var hookBuilder_1 = __webpack_require__(16);
	var node_1 = __webpack_require__(21);
	var pathFactory_1 = __webpack_require__(20);
	var targetState_1 = __webpack_require__(14);
	var param_1 = __webpack_require__(22);
	var resolvable_1 = __webpack_require__(19);
	var rejectFactory_1 = __webpack_require__(10);
	var resolveContext_1 = __webpack_require__(17);
	var router_1 = __webpack_require__(25);
	var transitionCount = 0;
	var stateSelf = hof_1.prop("self");
	/**
	 * Represents a transition between two states.
	 *
	 * When navigating to a state, we are transitioning **from** the current state **to** the new state.
	 *
	 * This object contains all contextual information about the to/from states, parameters, resolves.
	 * It has information about all states being entered and exited as a result of the transition.
	 */
	var Transition = (function () {
	    /**
	     * Creates a new Transition object.
	     *
	     * If the target state is not valid, an error is thrown.
	     *
	     * @param fromPath The path of [[PathNode]]s from which the transition is leaving.  The last node in the `fromPath`
	     *        encapsulates the "from state".
	     * @param targetState The target state and parameters being transitioned to (also, the transition options)
	     * @param router The [[UIRouter]] instance
	     */
	    function Transition(fromPath, targetState, router) {
	        var _this = this;
	        /** @hidden */
	        this._deferred = coreservices_1.services.$q.defer();
	        /**
	         * This promise is resolved or rejected based on the outcome of the Transition.
	         *
	         * When the transition is successful, the promise is resolved
	         * When the transition is unsuccessful, the promise is rejected with the [[TransitionRejection]] or javascript error
	         */
	        this.promise = this._deferred.promise;
	        this.treeChanges = function () { return _this._treeChanges; };
	        this.isActive = function () { return _this === _this._options.current(); };
	        this.router = router;
	        this._targetState = targetState;
	        if (!targetState.valid()) {
	            throw new Error(targetState.error());
	        }
	        // Makes the Transition instance a hook registry (onStart, etc)
	        hookRegistry_1.HookRegistry.mixin(new hookRegistry_1.HookRegistry(), this);
	        // current() is assumed to come from targetState.options, but provide a naive implementation otherwise.
	        this._options = common_1.extend({ current: hof_1.val(this) }, targetState.options());
	        this.$id = transitionCount++;
	        var toPath = pathFactory_1.PathFactory.buildToPath(fromPath, targetState);
	        this._treeChanges = pathFactory_1.PathFactory.treeChanges(fromPath, toPath, this._options.reloadState);
	        var enteringStates = this._treeChanges.entering.map(function (node) { return node.state; });
	        pathFactory_1.PathFactory.applyViewConfigs(router.transitionService.$view, this._treeChanges.to, enteringStates);
	        var rootResolvables = [
	            new resolvable_1.Resolvable(router_1.UIRouter, function () { return router; }, [], undefined, router),
	            new resolvable_1.Resolvable(Transition, function () { return _this; }, [], undefined, this),
	            new resolvable_1.Resolvable('$transition$', function () { return _this; }, [], undefined, this),
	            new resolvable_1.Resolvable('$stateParams', function () { return _this.params(); }, [], undefined, this.params())
	        ];
	        var rootNode = this._treeChanges.to[0];
	        var context = new resolveContext_1.ResolveContext(this._treeChanges.to);
	        context.addResolvables(rootResolvables, rootNode.state);
	    }
	    /** @inheritdoc */
	    Transition.prototype.onBefore = function (matchCriteria, callback, options) { throw ""; };
	    ;
	    /** @inheritdoc */
	    Transition.prototype.onStart = function (matchCriteria, callback, options) { throw ""; };
	    ;
	    /** @inheritdoc */
	    Transition.prototype.onExit = function (matchCriteria, callback, options) { throw ""; };
	    ;
	    /** @inheritdoc */
	    Transition.prototype.onRetain = function (matchCriteria, callback, options) { throw ""; };
	    ;
	    /** @inheritdoc */
	    Transition.prototype.onEnter = function (matchCriteria, callback, options) { throw ""; };
	    ;
	    /** @inheritdoc */
	    Transition.prototype.onFinish = function (matchCriteria, callback, options) { throw ""; };
	    ;
	    /** @inheritdoc */
	    Transition.prototype.onSuccess = function (matchCriteria, callback, options) { throw ""; };
	    ;
	    /** @inheritdoc */
	    Transition.prototype.onError = function (matchCriteria, callback, options) { throw ""; };
	    ;
	    Transition.prototype.$from = function () {
	        return common_1.tail(this._treeChanges.from).state;
	    };
	    Transition.prototype.$to = function () {
	        return common_1.tail(this._treeChanges.to).state;
	    };
	    /**
	     * Returns the "from state"
	     *
	     * @returns The state object for the Transition's "from state".
	     */
	    Transition.prototype.from = function () {
	        return this.$from().self;
	    };
	    /**
	     * Returns the "to state"
	     *
	     * @returns The state object for the Transition's target state ("to state").
	     */
	    Transition.prototype.to = function () {
	        return this.$to().self;
	    };
	    /**
	     * Gets the Target State
	     *
	     * A transition's [[TargetState]] encapsulates the [[to]] state, the [[params]], and the [[options]].
	     *
	     * @returns the [[TargetState]] of this Transition
	     */
	    Transition.prototype.targetState = function () {
	        return this._targetState;
	    };
	    /**
	     * Determines whether two transitions are equivalent.
	     */
	    Transition.prototype.is = function (compare) {
	        if (compare instanceof Transition) {
	            // TODO: Also compare parameters
	            return this.is({ to: compare.$to().name, from: compare.$from().name });
	        }
	        return !((compare.to && !hookRegistry_1.matchState(this.$to(), compare.to)) ||
	            (compare.from && !hookRegistry_1.matchState(this.$from(), compare.from)));
	    };
	    /**
	     * Gets transition parameter values
	     *
	     * @param pathname Pick which treeChanges path to get parameters for:
	     *   (`'to'`, `'from'`, `'entering'`, `'exiting'`, `'retained'`)
	     * @returns transition parameter values for the desired path.
	     */
	    Transition.prototype.params = function (pathname) {
	        if (pathname === void 0) { pathname = "to"; }
	        return this._treeChanges[pathname].map(hof_1.prop("paramValues")).reduce(common_1.mergeR, {});
	    };
	    /**
	     * Creates a [[UIInjector]] Dependency Injector
	     *
	     * Returns a Dependency Injector for the Transition's target state (to state).
	     * The injector provides resolve values which the target state has access to.
	     *
	     * The `UIInjector` can also provide values from the native root/global injector (ng1/ng2).
	     *
	     * If a `state` is provided, the injector that is returned will be limited to resolve values that the provided state has access to.
	     *
	     * @param state Limits the resolves provided to only the resolves the provided state has access to.
	     * @returns a [[UIInjector]]
	     */
	    Transition.prototype.injector = function (state) {
	        var path = this.treeChanges().to;
	        if (state)
	            path = pathFactory_1.PathFactory.subPath(path, function (node) { return node.state === state || node.state.name === state; });
	        return new resolveContext_1.ResolveContext(path).injector();
	    };
	    /**
	     * Gets all available resolve tokens (keys)
	     *
	     * This method can be used in conjunction with [[getResolve]] to inspect the resolve values
	     * available to the Transition.
	     *
	     * The returned tokens include those defined on [[StateDeclaration.resolve]] blocks, for the states
	     * in the Transition's [[TreeChanges.to]] path.
	     *
	     * @returns an array of resolve tokens (keys)
	     */
	    Transition.prototype.getResolveTokens = function () {
	        return new resolveContext_1.ResolveContext(this._treeChanges.to).getTokens();
	    };
	    /**
	     * Gets resolved values
	     *
	     * This method can be used in conjunction with [[getResolveTokens]] to inspect what resolve values
	     * are available to the Transition.
	     *
	     * Given a token, returns the resolved data for that token.
	     * Given an array of tokens, returns an array of resolved data for those tokens.
	     *
	     * If a resolvable hasn't yet been fetched, returns `undefined` for that token
	     * If a resolvable doesn't exist for the token, throws an error.
	     *
	     * @param token the token (or array of tokens)
	     *
	     * @returns an array of resolve tokens (keys)
	     */
	    Transition.prototype.getResolveValue = function (token) {
	        var resolveContext = new resolveContext_1.ResolveContext(this._treeChanges.to);
	        var getData = function (token) {
	            var resolvable = resolveContext.getResolvable(token);
	            if (resolvable === undefined) {
	                throw new Error("Dependency Injection token not found: " + strings_1.stringify(token));
	            }
	            return resolvable.data;
	        };
	        if (predicates_1.isArray(token)) {
	            return token.map(getData);
	        }
	        return getData(token);
	    };
	    /**
	     * Gets a [[Resolvable]] primitive
	     *
	     * This is a lower level API that returns a [[Resolvable]] from the Transition for a given token.
	     *
	     * @param token the DI token
	     *
	     * @returns the [[Resolvable]] in the transition's to path, or undefined
	     */
	    Transition.prototype.getResolvable = function (token) {
	        return new resolveContext_1.ResolveContext(this._treeChanges.to).getResolvable(token);
	    };
	    /**
	     * Dynamically adds a new [[Resolvable]] (`resolve`) to this transition.
	     *
	     * @param resolvable an [[Resolvable]] object
	     * @param state the state in the "to path" which should receive the new resolve (otherwise, the root state)
	     */
	    Transition.prototype.addResolvable = function (resolvable, state) {
	        if (state === void 0) { state = ""; }
	        var stateName = (typeof state === "string") ? state : state.name;
	        var topath = this._treeChanges.to;
	        var targetNode = common_1.find(topath, function (node) { return node.state.name === stateName; });
	        var resolveContext = new resolveContext_1.ResolveContext(topath);
	        resolveContext.addResolvables([resolvable], targetNode.state);
	    };
	    /**
	     * If the current transition is a redirect, returns the transition that was redirected.
	     *
	     * Gets the transition from which this transition was redirected.
	     *
	     *
	     * @example
	     * ```js
	     *
	     * let transitionA = $state.go('A').transitionA
	     * transitionA.onStart({}, () => $state.target('B'));
	     * $transitions.onSuccess({ to: 'B' }, (trans) => {
	     *   trans.to().name === 'B'; // true
	     *   trans.redirectedFrom() === transitionA; // true
	     * });
	     * ```
	     *
	     * @returns The previous Transition, or null if this Transition is not the result of a redirection
	     */
	    Transition.prototype.redirectedFrom = function () {
	        return this._options.redirectedFrom || null;
	    };
	    /**
	     * Get the transition options
	     *
	     * @returns the options for this Transition.
	     */
	    Transition.prototype.options = function () {
	        return this._options;
	    };
	    /**
	     * Gets the states being entered.
	     *
	     * @returns an array of states that will be entered during this transition.
	     */
	    Transition.prototype.entering = function () {
	        return common_1.map(this._treeChanges.entering, hof_1.prop('state')).map(stateSelf);
	    };
	    /**
	     * Gets the states being exited.
	     *
	     * @returns an array of states that will be exited during this transition.
	     */
	    Transition.prototype.exiting = function () {
	        return common_1.map(this._treeChanges.exiting, hof_1.prop('state')).map(stateSelf).reverse();
	    };
	    /**
	     * Gets the states being retained.
	     *
	     * @returns an array of states that are already entered from a previous Transition, that will not be
	     *    exited during this Transition
	     */
	    Transition.prototype.retained = function () {
	        return common_1.map(this._treeChanges.retained, hof_1.prop('state')).map(stateSelf);
	    };
	    /**
	     * Get the [[ViewConfig]]s associated with this Transition
	     *
	     * Each state can define one or more views (template/controller), which are encapsulated as `ViewConfig` objects.
	     * This method fetches the `ViewConfigs` for a given path in the Transition (e.g., "to" or "entering").
	     *
	     * @param pathname the name of the path to fetch views for:
	     *   (`'to'`, `'from'`, `'entering'`, `'exiting'`, `'retained'`)
	     * @param state If provided, only returns the `ViewConfig`s for a single state in the path
	     *
	     * @returns a list of ViewConfig objects for the given path.
	     */
	    Transition.prototype.views = function (pathname, state) {
	        if (pathname === void 0) { pathname = "entering"; }
	        var path = this._treeChanges[pathname];
	        path = !state ? path : path.filter(hof_1.propEq('state', state));
	        return path.map(hof_1.prop("views")).filter(common_1.identity).reduce(common_1.unnestR, []);
	    };
	    /**
	     * Creates a new transition that is a redirection of the current one.
	     *
	     * This transition can be returned from a [[TransitionService]] hook to
	     * redirect a transition to a new state and/or set of parameters.
	     *
	     * @returns Returns a new [[Transition]] instance.
	     */
	    Transition.prototype.redirect = function (targetState) {
	        var newOptions = common_1.extend({}, this.options(), targetState.options(), { redirectedFrom: this, source: "redirect" });
	        targetState = new targetState_1.TargetState(targetState.identifier(), targetState.$state(), targetState.params(), newOptions);
	        var newTransition = this.router.transitionService.create(this._treeChanges.from, targetState);
	        var originalEnteringNodes = this.treeChanges().entering;
	        var redirectEnteringNodes = newTransition.treeChanges().entering;
	        // --- Re-use resolve data from original transition ---
	        // When redirecting from a parent state to a child state where the parent parameter values haven't changed
	        // (because of the redirect), the resolves fetched by the original transition are still valid in the
	        // redirected transition.
	        //
	        // This allows you to define a redirect on a parent state which depends on an async resolve value.
	        // You can wait for the resolve, then redirect to a child state based on the result.
	        // The redirected transition does not have to re-fetch the resolve.
	        // ---------------------------------------------------------
	        var nodeIsReloading = function (reloadState) { return function (node) {
	            return reloadState && node.state.includes[reloadState.name];
	        }; };
	        // Find any "entering" nodes in the redirect path that match the original path and aren't being reloaded
	        var matchingEnteringNodes = node_1.PathNode.matching(redirectEnteringNodes, originalEnteringNodes)
	            .filter(hof_1.not(nodeIsReloading(targetState.options().reloadState)));
	        // Use the existing (possibly pre-resolved) resolvables for the matching entering nodes.
	        matchingEnteringNodes.forEach(function (node, idx) {
	            node.resolvables = originalEnteringNodes[idx].resolvables;
	        });
	        return newTransition;
	    };
	    /** @hidden If a transition doesn't exit/enter any states, returns any [[Param]] whose value changed */
	    Transition.prototype._changedParams = function () {
	        var _a = this._treeChanges, to = _a.to, from = _a.from;
	        if (this._options.reload || common_1.tail(to).state !== common_1.tail(from).state)
	            return undefined;
	        var nodeSchemas = to.map(function (node) { return node.paramSchema; });
	        var _b = [to, from].map(function (path) { return path.map(function (x) { return x.paramValues; }); }), toValues = _b[0], fromValues = _b[1];
	        var tuples = common_1.arrayTuples(nodeSchemas, toValues, fromValues);
	        return tuples.map(function (_a) {
	            var schema = _a[0], toVals = _a[1], fromVals = _a[2];
	            return param_1.Param.changed(schema, toVals, fromVals);
	        }).reduce(common_1.unnestR, []);
	    };
	    /**
	     * Returns true if the transition is dynamic.
	     *
	     * A transition is dynamic if no states are entered nor exited, but at least one dynamic parameter has changed.
	     *
	     * @returns true if the Transition is dynamic
	     */
	    Transition.prototype.dynamic = function () {
	        var changes = this._changedParams();
	        return !changes ? false : changes.map(function (x) { return x.dynamic; }).reduce(common_1.anyTrueR, false);
	    };
	    /**
	     * Returns true if the transition is ignored.
	     *
	     * A transition is ignored if no states are entered nor exited, and no parameter values have changed.
	     *
	     * @returns true if the Transition is ignored.
	     */
	    Transition.prototype.ignored = function () {
	        var changes = this._changedParams();
	        return !changes ? false : changes.length === 0;
	    };
	    /**
	     * @hidden
	     */
	    Transition.prototype.hookBuilder = function () {
	        return new hookBuilder_1.HookBuilder(this.router.transitionService, this, {
	            transition: this,
	            current: this._options.current
	        });
	    };
	    /**
	     * Runs the transition
	     *
	     * This method is generally called from the [[StateService.transitionTo]]
	     *
	     * @returns a promise for a successful transition.
	     */
	    Transition.prototype.run = function () {
	        var _this = this;
	        var runSynchronousHooks = transitionHook_1.TransitionHook.runSynchronousHooks;
	        var hookBuilder = this.hookBuilder();
	        var globals = this.router.globals;
	        globals.transitionHistory.enqueue(this);
	        var syncResult = runSynchronousHooks(hookBuilder.getOnBeforeHooks());
	        if (rejectFactory_1.Rejection.isTransitionRejectionPromise(syncResult)) {
	            syncResult.catch(function () { return 0; }); // issue #2676
	            var rejectReason = syncResult._transitionRejection;
	            this._deferred.reject(rejectReason);
	            return this.promise;
	        }
	        if (!this.valid()) {
	            var error = new Error(this.error());
	            this._deferred.reject(error);
	            return this.promise;
	        }
	        if (this.ignored()) {
	            trace_1.trace.traceTransitionIgnored(this);
	            this._deferred.reject(rejectFactory_1.Rejection.ignored());
	            return this.promise;
	        }
	        // When the chain is complete, then resolve or reject the deferred
	        var transitionSuccess = function () {
	            trace_1.trace.traceSuccess(_this.$to(), _this);
	            _this.success = true;
	            _this._deferred.resolve(_this.to());
	            runSynchronousHooks(hookBuilder.getOnSuccessHooks(), true);
	        };
	        var transitionError = function (reason) {
	            trace_1.trace.traceError(reason, _this);
	            _this.success = false;
	            _this._deferred.reject(reason);
	            _this._error = reason;
	            runSynchronousHooks(hookBuilder.getOnErrorHooks(), true);
	        };
	        trace_1.trace.traceTransitionStart(this);
	        // Chain the next hook off the previous
	        var appendHookToChain = function (prev, nextHook) {
	            return prev.then(function () { return nextHook.invokeHook(); });
	        };
	        // Run the hooks, then resolve or reject the overall deferred in the .then() handler
	        hookBuilder.asyncHooks()
	            .reduce(appendHookToChain, syncResult)
	            .then(transitionSuccess, transitionError);
	        return this.promise;
	    };
	    /**
	     * Checks if the Transition is valid
	     *
	     * @returns true if the Transition is valid
	     */
	    Transition.prototype.valid = function () {
	        return !this.error() || this.success !== undefined;
	    };
	    /**
	     * The Transition error reason.
	     *
	     * If the transition is invalid (and could not be run), returns the reason the transition is invalid.
	     * If the transition was valid and ran, but was not successful, returns the reason the transition failed.
	     *
	     * @returns an error message explaining why the transition is invalid, or the reason the transition failed.
	     */
	    Transition.prototype.error = function () {
	        var state = this.$to();
	        var redirects = 0, trans = this;
	        while ((trans = trans.redirectedFrom()) != null) {
	            if (++redirects > 20)
	                return "Too many Transition redirects (20+)";
	        }
	        if (state.self.abstract)
	            return "Cannot transition to abstract state '" + state.name + "'";
	        if (!param_1.Param.validates(state.parameters(), this.params()))
	            return "Param values not valid for state '" + state.name + "'";
	        if (this.success === false)
	            return this._error;
	    };
	    /**
	     * A string representation of the Transition
	     *
	     * @returns A string representation of the Transition
	     */
	    Transition.prototype.toString = function () {
	        var fromStateOrName = this.from();
	        var toStateOrName = this.to();
	        var avoidEmptyHash = function (params) {
	            return (params["#"] !== null && params["#"] !== undefined) ? params : common_1.omit(params, "#");
	        };
	        // (X) means the to state is invalid.
	        var id = this.$id, from = predicates_1.isObject(fromStateOrName) ? fromStateOrName.name : fromStateOrName, fromParams = common_1.toJson(avoidEmptyHash(this._treeChanges.from.map(hof_1.prop('paramValues')).reduce(common_1.mergeR, {}))), toValid = this.valid() ? "" : "(X) ", to = predicates_1.isObject(toStateOrName) ? toStateOrName.name : toStateOrName, toParams = common_1.toJson(avoidEmptyHash(this.params()));
	        return "Transition#" + id + "( '" + from + "'" + fromParams + " -> " + toValid + "'" + to + "'" + toParams + " )";
	    };
	    Transition.diToken = Transition;
	    return Transition;
	}());
	exports.Transition = Transition;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * UI-Router Transition Tracing
	 *
	 * Enable transition tracing to print transition information to the console, in order to help debug your application.
	 * Tracing logs detailed information about each Transition to your console.
	 *
	 * To enable tracing, import the [[trace]] singleton and enable one or more categories.
	 *
	 * ES6
	 * ```
	 *
	 * import {trace} from "ui-router-ng2"; // or "angular-ui-router"
	 * trace.enable(1, 5); // TRANSITION and VIEWCONFIG
	 * ```
	 *
	 * CJS
	 * ```
	 *
	 * let trace = require("angular-ui-router").trace; // or "ui-router-ng2"
	 * trace.enable("TRANSITION", "VIEWCONFIG");
	 * ```
	 *
	 * Globals
	 * ```
	 *
	 * let trace = window["angular-ui-router"].trace; // or "ui-router-ng2"
	 * trace.enable(); // Trace everything (very verbose)
	 * ```
	 *
	 * @module trace
	 */ /** for typedoc */
	var hof_1 = __webpack_require__(5);
	var predicates_1 = __webpack_require__(4);
	var strings_1 = __webpack_require__(9);
	/** @hidden */
	function uiViewString(viewData) {
	    if (!viewData)
	        return 'ui-view (defunct)';
	    return ("[ui-view#" + viewData.id + " tag ") +
	        ("in template from '" + (viewData.creationContext && viewData.creationContext.name || '(root)') + "' state]: ") +
	        ("fqn: '" + viewData.fqn + "', ") +
	        ("name: '" + viewData.name + "@" + viewData.creationContext + "')");
	}
	/** @hidden */
	var viewConfigString = function (viewConfig) {
	    return ("[ViewConfig#" + viewConfig.$id + " from '" + (viewConfig.viewDecl.$context.name || '(root)') + "' state]: target ui-view: '" + viewConfig.viewDecl.$uiViewName + "@" + viewConfig.viewDecl.$uiViewContextAnchor + "'");
	};
	/** @hidden */
	function normalizedCat(input) {
	    return predicates_1.isNumber(input) ? Category[input] : Category[Category[input]];
	}
	/**
	 * Trace categories
	 *
	 * [[Trace.enable]] or [[Trace.disable]] a category
	 *
	 * `trace.enable(Category.TRANSITION)`
	 *
	 * These can also be provided using a matching string, or position ordinal
	 *
	 * `trace.enable("TRANSITION")`
	 *
	 * `trace.enable(1)`
	 */
	(function (Category) {
	    Category[Category["RESOLVE"] = 0] = "RESOLVE";
	    Category[Category["TRANSITION"] = 1] = "TRANSITION";
	    Category[Category["HOOK"] = 2] = "HOOK";
	    Category[Category["UIVIEW"] = 3] = "UIVIEW";
	    Category[Category["VIEWCONFIG"] = 4] = "VIEWCONFIG";
	})(exports.Category || (exports.Category = {}));
	var Category = exports.Category;
	/**
	 * Prints UI-Router Transition trace information to the console.
	 */
	var Trace = (function () {
	    function Trace() {
	        /** @hidden */
	        this._enabled = {};
	        this.approximateDigests = 0;
	    }
	    /** @hidden */
	    Trace.prototype._set = function (enabled, categories) {
	        var _this = this;
	        if (!categories.length) {
	            categories = Object.keys(Category)
	                .map(function (k) { return parseInt(k, 10); })
	                .filter(function (k) { return !isNaN(k); })
	                .map(function (key) { return Category[key]; });
	        }
	        categories.map(normalizedCat).forEach(function (category) { return _this._enabled[category] = enabled; });
	    };
	    /**
	     * Enables a trace [[Category]]
	     *
	     * ```
	     * trace.enable("TRANSITION");
	     * ```
	     *
	     * @param categories categories to enable. If `categories` is omitted, all categories are enabled.
	     *        Also takes strings (category name) or ordinal (category position)
	     */
	    Trace.prototype.enable = function () {
	        var categories = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            categories[_i - 0] = arguments[_i];
	        }
	        this._set(true, categories);
	    };
	    /**
	     * Disables a trace [[Category]]
	     *
	     * ```
	     * trace.disable("VIEWCONFIG");
	     * ```
	     *
	     * @param categories categories to disable. If `categories` is omitted, all categories are disabled.
	     *        Also takes strings (category name) or ordinal (category position)
	     */
	    Trace.prototype.disable = function () {
	        var categories = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            categories[_i - 0] = arguments[_i];
	        }
	        this._set(false, categories);
	    };
	    /**
	     * Retrieves the enabled stateus of a [[Category]]
	     *
	     * ```
	     * trace.enabled("VIEWCONFIG"); // true or false
	     * ```
	     *
	     * @returns boolean true if the category is enabled
	     */
	    Trace.prototype.enabled = function (category) {
	        return !!this._enabled[normalizedCat(category)];
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceTransitionStart = function (transition) {
	        if (!this.enabled(Category.TRANSITION))
	            return;
	        var tid = transition.$id, digest = this.approximateDigests, transitionStr = strings_1.stringify(transition);
	        console.log("Transition #" + tid + " Digest #" + digest + ": Started  -> " + transitionStr);
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceTransitionIgnored = function (trans) {
	        if (!this.enabled(Category.TRANSITION))
	            return;
	        var tid = trans && trans.$id, digest = this.approximateDigests, transitionStr = strings_1.stringify(trans);
	        console.log("Transition #" + tid + " Digest #" + digest + ": Ignored  <> " + transitionStr);
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceHookInvocation = function (step, options) {
	        if (!this.enabled(Category.HOOK))
	            return;
	        var tid = hof_1.parse("transition.$id")(options), digest = this.approximateDigests, event = hof_1.parse("traceData.hookType")(options) || "internal", context = hof_1.parse("traceData.context.state.name")(options) || hof_1.parse("traceData.context")(options) || "unknown", name = strings_1.functionToString(step.hookFn);
	        console.log("Transition #" + tid + " Digest #" + digest + ":   Hook -> " + event + " context: " + context + ", " + strings_1.maxLength(200, name));
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceHookResult = function (hookResult, transitionResult, transitionOptions) {
	        if (!this.enabled(Category.HOOK))
	            return;
	        var tid = hof_1.parse("transition.$id")(transitionOptions), digest = this.approximateDigests, hookResultStr = strings_1.stringify(hookResult), transitionResultStr = strings_1.stringify(transitionResult);
	        console.log("Transition #" + tid + " Digest #" + digest + ":   <- Hook returned: " + strings_1.maxLength(200, hookResultStr) + ", transition result: " + strings_1.maxLength(200, transitionResultStr));
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceResolvePath = function (path, when, trans) {
	        if (!this.enabled(Category.RESOLVE))
	            return;
	        var tid = trans && trans.$id, digest = this.approximateDigests, pathStr = path && path.toString();
	        console.log("Transition #" + tid + " Digest #" + digest + ":         Resolving " + pathStr + " (" + when + ")");
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceResolvableResolved = function (resolvable, trans) {
	        if (!this.enabled(Category.RESOLVE))
	            return;
	        var tid = trans && trans.$id, digest = this.approximateDigests, resolvableStr = resolvable && resolvable.toString(), result = strings_1.stringify(resolvable.data);
	        console.log("Transition #" + tid + " Digest #" + digest + ":               <- Resolved  " + resolvableStr + " to: " + strings_1.maxLength(200, result));
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceError = function (reason, trans) {
	        if (!this.enabled(Category.TRANSITION))
	            return;
	        var tid = trans && trans.$id, digest = this.approximateDigests, transitionStr = strings_1.stringify(trans);
	        console.log("Transition #" + tid + " Digest #" + digest + ": <- Rejected " + transitionStr + ", reason: " + reason);
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceSuccess = function (finalState, trans) {
	        if (!this.enabled(Category.TRANSITION))
	            return;
	        var tid = trans && trans.$id, digest = this.approximateDigests, state = finalState.name, transitionStr = strings_1.stringify(trans);
	        console.log("Transition #" + tid + " Digest #" + digest + ": <- Success  " + transitionStr + ", final state: " + state);
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceUIViewEvent = function (event, viewData, extra) {
	        if (extra === void 0) { extra = ""; }
	        if (!this.enabled(Category.UIVIEW))
	            return;
	        console.log("ui-view: " + strings_1.padString(30, event) + " " + uiViewString(viewData) + extra);
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceUIViewConfigUpdated = function (viewData, context) {
	        if (!this.enabled(Category.UIVIEW))
	            return;
	        this.traceUIViewEvent("Updating", viewData, " with ViewConfig from context='" + context + "'");
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceUIViewFill = function (viewData, html) {
	        if (!this.enabled(Category.UIVIEW))
	            return;
	        this.traceUIViewEvent("Fill", viewData, " with: " + strings_1.maxLength(200, html));
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceViewServiceEvent = function (event, viewConfig) {
	        if (!this.enabled(Category.VIEWCONFIG))
	            return;
	        console.log("VIEWCONFIG: " + event + " " + viewConfigString(viewConfig));
	    };
	    /** called by ui-router code */
	    Trace.prototype.traceViewServiceUIViewEvent = function (event, viewData) {
	        if (!this.enabled(Category.VIEWCONFIG))
	            return;
	        console.log("VIEWCONFIG: " + event + " " + uiViewString(viewData));
	    };
	    return Trace;
	}());
	exports.Trace = Trace;
	/**
	 * The [[Trace]] singleton
	 *
	 * @example
	 * ```js
	 *
	 * import {trace} from "angular-ui-router";
	 * trace.enable(1, 5);
	 * ```
	 */
	var trace = new Trace();
	exports.trace = trace;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(3);
	var strings_1 = __webpack_require__(9);
	var predicates_1 = __webpack_require__(4);
	var hof_1 = __webpack_require__(5);
	var trace_1 = __webpack_require__(12);
	var coreservices_1 = __webpack_require__(6);
	var rejectFactory_1 = __webpack_require__(10);
	var targetState_1 = __webpack_require__(14);
	var defaultOptions = {
	    async: true,
	    rejectIfSuperseded: true,
	    current: common_1.noop,
	    transition: null,
	    traceData: {},
	    bind: null
	};
	/** @hidden */
	var TransitionHook = (function () {
	    function TransitionHook(transition, stateContext, eventHook, options) {
	        var _this = this;
	        this.transition = transition;
	        this.stateContext = stateContext;
	        this.eventHook = eventHook;
	        this.options = options;
	        this.isSuperseded = function () { return _this.options.current() !== _this.options.transition; };
	        this.options = common_1.defaults(options, defaultOptions);
	    }
	    TransitionHook.prototype.invokeHook = function () {
	        var _a = this, options = _a.options, eventHook = _a.eventHook;
	        trace_1.trace.traceHookInvocation(this, options);
	        if (options.rejectIfSuperseded && this.isSuperseded()) {
	            return rejectFactory_1.Rejection.superseded(options.current()).toPromise();
	        }
	        var hookResult = !eventHook._deregistered
	            ? eventHook.callback.call(options.bind, this.transition, this.stateContext)
	            : undefined;
	        return this.handleHookResult(hookResult);
	    };
	    /**
	     * This method handles the return value of a Transition Hook.
	     *
	     * A hook can return false, a redirect (TargetState), or a promise (which may resolve to false or a redirect)
	     */
	    TransitionHook.prototype.handleHookResult = function (hookResult) {
	        var _this = this;
	        if (!predicates_1.isDefined(hookResult))
	            return undefined;
	        /**
	         * Handles transition superseded, transition aborted and transition redirect.
	         */
	        var mapHookResult = hof_1.pattern([
	            // Transition is no longer current
	            [this.isSuperseded, function () { return rejectFactory_1.Rejection.superseded(_this.options.current()).toPromise(); }],
	            // If the hook returns false, abort the current Transition
	            [hof_1.eq(false), function () { return rejectFactory_1.Rejection.aborted("Hook aborted transition").toPromise(); }],
	            // If the hook returns a Transition, halt the current Transition and redirect to that Transition.
	            [hof_1.is(targetState_1.TargetState), function (target) { return rejectFactory_1.Rejection.redirected(target).toPromise(); }],
	            // A promise was returned, wait for the promise and then chain another hookHandler
	            [predicates_1.isPromise, function (promise) { return promise.then(_this.handleHookResult.bind(_this)); }]
	        ]);
	        var transitionResult = mapHookResult(hookResult);
	        if (transitionResult)
	            trace_1.trace.traceHookResult(hookResult, transitionResult, this.options);
	        return transitionResult;
	    };
	    TransitionHook.prototype.toString = function () {
	        var _a = this, options = _a.options, eventHook = _a.eventHook;
	        var event = hof_1.parse("traceData.hookType")(options) || "internal", context = hof_1.parse("traceData.context.state.name")(options) || hof_1.parse("traceData.context")(options) || "unknown", name = strings_1.fnToString(eventHook.callback);
	        return event + " context: " + context + ", " + strings_1.maxLength(200, name);
	    };
	    /**
	     * Given an array of TransitionHooks, runs each one synchronously and sequentially.
	     *
	     * Returns a promise chain composed of any promises returned from each hook.invokeStep() call
	     */
	    TransitionHook.runSynchronousHooks = function (hooks, swallowExceptions) {
	        if (swallowExceptions === void 0) { swallowExceptions = false; }
	        var results = [];
	        for (var i = 0; i < hooks.length; i++) {
	            var hook = hooks[i];
	            try {
	                results.push(hook.invokeHook());
	            }
	            catch (exception) {
	                if (!swallowExceptions) {
	                    return rejectFactory_1.Rejection.errored(exception).toPromise();
	                }
	                var errorHandler = hook.transition.router.stateService.defaultErrorHandler();
	                errorHandler(exception);
	            }
	        }
	        var rejections = results.filter(rejectFactory_1.Rejection.isTransitionRejectionPromise);
	        if (rejections.length)
	            return rejections[0];
	        return results
	            .filter(predicates_1.isPromise)
	            .reduce(function (chain, promise) { return chain.then(hof_1.val(promise)); }, coreservices_1.services.$q.when());
	    };
	    return TransitionHook;
	}());
	exports.TransitionHook = TransitionHook;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/** @module state */ /** for typedoc */
	"use strict";
	var common_1 = __webpack_require__(3);
	/**
	 * @ngdoc object
	 * @name ui.router.state.type:TargetState
	 *
	 * @description
	 * Encapsulate the desired target of a transition.
	 * Wraps an identifier for a state, a set of parameters, and transition options with the definition of the state.
	 *
	 * @param {StateOrName} _identifier  An identifier for a state. Either a fully-qualified path, or the object
	 *            used to define the state.
	 * @param {IState} _definition The `State` object definition.
	 * @param {ParamsOrArray} _params Parameters for the target state
	 * @param {TransitionOptions} _options Transition options.
	 */
	var TargetState = (function () {
	    function TargetState(_identifier, _definition, _params, _options) {
	        if (_params === void 0) { _params = {}; }
	        if (_options === void 0) { _options = {}; }
	        this._identifier = _identifier;
	        this._definition = _definition;
	        this._options = _options;
	        this._params = _params || {};
	    }
	    TargetState.prototype.name = function () {
	        return this._definition && this._definition.name || this._identifier;
	    };
	    TargetState.prototype.identifier = function () {
	        return this._identifier;
	    };
	    TargetState.prototype.params = function () {
	        return this._params;
	    };
	    TargetState.prototype.$state = function () {
	        return this._definition;
	    };
	    TargetState.prototype.state = function () {
	        return this._definition && this._definition.self;
	    };
	    TargetState.prototype.options = function () {
	        return this._options;
	    };
	    TargetState.prototype.exists = function () {
	        return !!(this._definition && this._definition.self);
	    };
	    TargetState.prototype.valid = function () {
	        return !this.error();
	    };
	    TargetState.prototype.error = function () {
	        var base = this.options().relative;
	        if (!this._definition && !!base) {
	            var stateName = base.name ? base.name : base;
	            return "Could not resolve '" + this.name() + "' from state '" + stateName + "'";
	        }
	        if (!this._definition)
	            return "No such state '" + this.name() + "'";
	        if (!this._definition.self)
	            return "State '" + this.name() + "' has an invalid definition";
	    };
	    TargetState.prototype.toString = function () {
	        return "'" + this.name() + "'" + common_1.toJson(this.params());
	    };
	    return TargetState;
	}());
	exports.TargetState = TargetState;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module transition */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var glob_1 = __webpack_require__(7);
	/**
	 * Determines if the given state matches the matchCriteria
	 *
	 * @hidden
	 *
	 * @param state a State Object to test against
	 * @param criterion
	 * - If a string, matchState uses the string as a glob-matcher against the state name
	 * - If an array (of strings), matchState uses each string in the array as a glob-matchers against the state name
	 *   and returns a positive match if any of the globs match.
	 * - If a function, matchState calls the function with the state and returns true if the function's result is truthy.
	 * @returns {boolean}
	 */
	function matchState(state, criterion) {
	    var toMatch = predicates_1.isString(criterion) ? [criterion] : criterion;
	    function matchGlobs(_state) {
	        var globStrings = toMatch;
	        for (var i = 0; i < globStrings.length; i++) {
	            var glob = glob_1.Glob.fromString(globStrings[i]);
	            if ((glob && glob.matches(_state.name)) || (!glob && globStrings[i] === _state.name)) {
	                return true;
	            }
	        }
	        return false;
	    }
	    var matchFn = (predicates_1.isFunction(toMatch) ? toMatch : matchGlobs);
	    return !!matchFn(state);
	}
	exports.matchState = matchState;
	/** @hidden */
	var EventHook = (function () {
	    function EventHook(matchCriteria, callback, options) {
	        if (options === void 0) { options = {}; }
	        this.callback = callback;
	        this.matchCriteria = common_1.extend({ to: true, from: true, exiting: true, retained: true, entering: true }, matchCriteria);
	        this.priority = options.priority || 0;
	        this.bind = options.bind || null;
	        this._deregistered = false;
	    }
	    EventHook._matchingNodes = function (nodes, criterion) {
	        if (criterion === true)
	            return nodes;
	        var matching = nodes.filter(function (node) { return matchState(node.state, criterion); });
	        return matching.length ? matching : null;
	    };
	    /**
	     * Determines if this hook's [[matchCriteria]] match the given [[TreeChanges]]
	     *
	     * @returns an IMatchingNodes object, or null. If an IMatchingNodes object is returned, its values
	     * are the matching [[PathNode]]s for each [[HookMatchCriterion]] (to, from, exiting, retained, entering)
	     */
	    EventHook.prototype.matches = function (treeChanges) {
	        var mc = this.matchCriteria, _matchingNodes = EventHook._matchingNodes;
	        var matches = {
	            to: _matchingNodes([common_1.tail(treeChanges.to)], mc.to),
	            from: _matchingNodes([common_1.tail(treeChanges.from)], mc.from),
	            exiting: _matchingNodes(treeChanges.exiting, mc.exiting),
	            retained: _matchingNodes(treeChanges.retained, mc.retained),
	            entering: _matchingNodes(treeChanges.entering, mc.entering),
	        };
	        // Check if all the criteria matched the TreeChanges object
	        var allMatched = ["to", "from", "exiting", "retained", "entering"]
	            .map(function (prop) { return matches[prop]; })
	            .reduce(common_1.allTrueR, true);
	        return allMatched ? matches : null;
	    };
	    return EventHook;
	}());
	exports.EventHook = EventHook;
	/** @hidden Return a registration function of the requested type. */
	function makeHookRegistrationFn(hooks, name) {
	    return function (matchObject, callback, options) {
	        if (options === void 0) { options = {}; }
	        var eventHook = new EventHook(matchObject, callback, options);
	        hooks[name].push(eventHook);
	        return function deregisterEventHook() {
	            eventHook._deregistered = true;
	            common_1.removeFrom(hooks[name])(eventHook);
	        };
	    };
	}
	/**
	 * Mixin class acts as a Transition Hook registry.
	 *
	 * Holds the registered [[HookFn]] objects.
	 * Exposes functions to register new hooks.
	 *
	 * This is a Mixin class which can be applied to other objects.
	 *
	 * The hook registration functions are [[onBefore]], [[onStart]], [[onEnter]], [[onRetain]], [[onExit]], [[onFinish]], [[onSuccess]], [[onError]].
	 *
	 * This class is mixed into both the [[TransitionService]] and every [[Transition]] object.
	 * Global hooks are added to the [[TransitionService]].
	 * Since each [[Transition]] is itself a `HookRegistry`, hooks can also be added to individual Transitions
	 * (note: the hook criteria still must match the Transition).
	 */
	var HookRegistry = (function () {
	    function HookRegistry() {
	        var _this = this;
	        this._transitionEvents = {
	            onBefore: [], onStart: [], onEnter: [], onRetain: [], onExit: [], onFinish: [], onSuccess: [], onError: []
	        };
	        this.getHooks = function (name) { return _this._transitionEvents[name]; };
	        /** @inheritdoc */
	        this.onBefore = makeHookRegistrationFn(this._transitionEvents, "onBefore");
	        /** @inheritdoc */
	        this.onStart = makeHookRegistrationFn(this._transitionEvents, "onStart");
	        /** @inheritdoc */
	        this.onEnter = makeHookRegistrationFn(this._transitionEvents, "onEnter");
	        /** @inheritdoc */
	        this.onRetain = makeHookRegistrationFn(this._transitionEvents, "onRetain");
	        /** @inheritdoc */
	        this.onExit = makeHookRegistrationFn(this._transitionEvents, "onExit");
	        /** @inheritdoc */
	        this.onFinish = makeHookRegistrationFn(this._transitionEvents, "onFinish");
	        /** @inheritdoc */
	        this.onSuccess = makeHookRegistrationFn(this._transitionEvents, "onSuccess");
	        /** @inheritdoc */
	        this.onError = makeHookRegistrationFn(this._transitionEvents, "onError");
	    }
	    HookRegistry.mixin = function (source, target) {
	        Object.keys(source._transitionEvents).concat(["getHooks"]).forEach(function (key) { return target[key] = source[key]; });
	    };
	    return HookRegistry;
	}());
	exports.HookRegistry = HookRegistry;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/** @module transition */ /** for typedoc */
	"use strict";
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var transitionHook_1 = __webpack_require__(13);
	var resolveContext_1 = __webpack_require__(17);
	/**
	 * This class returns applicable TransitionHooks for a specific Transition instance.
	 *
	 * Hooks (IEventHook) may be registered globally, e.g., $transitions.onEnter(...), or locally, e.g.
	 * myTransition.onEnter(...).  The HookBuilder finds matching IEventHooks (where the match criteria is
	 * determined by the type of hook)
	 *
	 * The HookBuilder also converts IEventHooks objects to TransitionHook objects, which are used to run a Transition.
	 *
	 * The HookBuilder constructor is given the $transitions service and a Transition instance.  Thus, a HookBuilder
	 * instance may only be used for one specific Transition object. (side note: the _treeChanges accessor is private
	 * in the Transition class, so we must also provide the Transition's _treeChanges)
	 *
	 */
	var HookBuilder = (function () {
	    function HookBuilder($transitions, transition, baseHookOptions) {
	        var _this = this;
	        this.$transitions = $transitions;
	        this.transition = transition;
	        this.baseHookOptions = baseHookOptions;
	        this.getOnBeforeHooks = function () { return _this._buildNodeHooks("onBefore", "to", tupleSort(), { async: false }); };
	        this.getOnStartHooks = function () { return _this._buildNodeHooks("onStart", "to", tupleSort()); };
	        this.getOnExitHooks = function () { return _this._buildNodeHooks("onExit", "exiting", tupleSort(true), { stateHook: true }); };
	        this.getOnRetainHooks = function () { return _this._buildNodeHooks("onRetain", "retained", tupleSort(false), { stateHook: true }); };
	        this.getOnEnterHooks = function () { return _this._buildNodeHooks("onEnter", "entering", tupleSort(false), { stateHook: true }); };
	        this.getOnFinishHooks = function () { return _this._buildNodeHooks("onFinish", "to", tupleSort()); };
	        this.getOnSuccessHooks = function () { return _this._buildNodeHooks("onSuccess", "to", tupleSort(), { async: false, rejectIfSuperseded: false }); };
	        this.getOnErrorHooks = function () { return _this._buildNodeHooks("onError", "to", tupleSort(), { async: false, rejectIfSuperseded: false }); };
	        this.treeChanges = transition.treeChanges();
	        this.toState = common_1.tail(this.treeChanges.to).state;
	        this.fromState = common_1.tail(this.treeChanges.from).state;
	        this.transitionOptions = transition.options();
	    }
	    HookBuilder.prototype.asyncHooks = function () {
	        var onStartHooks = this.getOnStartHooks();
	        var onExitHooks = this.getOnExitHooks();
	        var onRetainHooks = this.getOnRetainHooks();
	        var onEnterHooks = this.getOnEnterHooks();
	        var onFinishHooks = this.getOnFinishHooks();
	        var asyncHooks = [onStartHooks, onExitHooks, onRetainHooks, onEnterHooks, onFinishHooks];
	        return asyncHooks.reduce(common_1.unnestR, []).filter(common_1.identity);
	    };
	    /**
	     * Returns an array of newly built TransitionHook objects.
	     *
	     * - Finds all IEventHooks registered for the given `hookType` which matched the transition's [[TreeChanges]].
	     * - Finds [[PathNode]] (or `PathNode[]`) to use as the TransitionHook context(s)
	     * - For each of the [[PathNode]]s, creates a TransitionHook
	     *
	     * @param hookType the name of the hook registration function, e.g., 'onEnter', 'onFinish'.
	     * @param matchingNodesProp selects which [[PathNode]]s from the [[IMatchingNodes]] object to create hooks for.
	     * @param getLocals a function which accepts a [[PathNode]] and returns additional locals to provide to the hook as injectables
	     * @param sortHooksFn a function which compares two HookTuple and returns <1, 0, or >1
	     * @param options any specific Transition Hook Options
	     */
	    HookBuilder.prototype._buildNodeHooks = function (hookType, matchingNodesProp, sortHooksFn, options) {
	        var _this = this;
	        // Find all the matching registered hooks for a given hook type
	        var matchingHooks = this._matchingHooks(hookType, this.treeChanges);
	        if (!matchingHooks)
	            return [];
	        var makeTransitionHooks = function (hook) {
	            // Fetch the Nodes that caused this hook to match.
	            var matches = hook.matches(_this.treeChanges);
	            // Select the PathNode[] that will be used as TransitionHook context objects
	            var matchingNodes = matches[matchingNodesProp];
	            // When invoking 'exiting' hooks, give them the "from path" for resolve data.
	            // Everything else gets the "to path"
	            var resolvePath = matchingNodesProp === 'exiting' ? _this.treeChanges.from : _this.treeChanges.to;
	            var resolveContext = new resolveContext_1.ResolveContext(resolvePath);
	            // Return an array of HookTuples
	            return matchingNodes.map(function (node) {
	                var _options = common_1.extend({ bind: hook.bind, traceData: { hookType: hookType, context: node } }, _this.baseHookOptions, options);
	                var state = _options.stateHook ? node.state : null;
	                var transitionHook = new transitionHook_1.TransitionHook(_this.transition, state, hook, _options);
	                return { hook: hook, node: node, transitionHook: transitionHook };
	            });
	        };
	        return matchingHooks.map(makeTransitionHooks)
	            .reduce(common_1.unnestR, [])
	            .sort(sortHooksFn)
	            .map(function (tuple) { return tuple.transitionHook; });
	    };
	    /**
	     * Finds all IEventHooks from:
	     * - The Transition object instance hook registry
	     * - The TransitionService ($transitions) global hook registry
	     *
	     * which matched:
	     * - the eventType
	     * - the matchCriteria (to, from, exiting, retained, entering)
	     *
	     * @returns an array of matched [[IEventHook]]s
	     */
	    HookBuilder.prototype._matchingHooks = function (hookName, treeChanges) {
	        return [this.transition, this.$transitions] // Instance and Global hook registries
	            .map(function (reg) { return reg.getHooks(hookName); }) // Get named hooks from registries
	            .filter(common_1.assertPredicate(predicates_1.isArray, "broken event named: " + hookName)) // Sanity check
	            .reduce(common_1.unnestR, []) // Un-nest IEventHook[][] to IEventHook[] array
	            .filter(function (hook) { return hook.matches(treeChanges); }); // Only those satisfying matchCriteria
	    };
	    return HookBuilder;
	}());
	exports.HookBuilder = HookBuilder;
	/**
	 * A factory for a sort function for HookTuples.
	 *
	 * The sort function first compares the PathNode depth (how deep in the state tree a node is), then compares
	 * the EventHook priority.
	 *
	 * @param reverseDepthSort a boolean, when true, reverses the sort order for the node depth
	 * @returns a tuple sort function
	 */
	function tupleSort(reverseDepthSort) {
	    if (reverseDepthSort === void 0) { reverseDepthSort = false; }
	    return function nodeDepthThenPriority(l, r) {
	        var factor = reverseDepthSort ? -1 : 1;
	        var depthDelta = (l.node.state.path.length - r.node.state.path.length) * factor;
	        return depthDelta !== 0 ? depthDelta : r.hook.priority - l.hook.priority;
	    };
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module resolve */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var hof_1 = __webpack_require__(5);
	var trace_1 = __webpack_require__(12);
	var coreservices_1 = __webpack_require__(6);
	var interface_1 = __webpack_require__(18);
	var resolvable_1 = __webpack_require__(19);
	var pathFactory_1 = __webpack_require__(20);
	var strings_1 = __webpack_require__(9);
	var when = interface_1.resolvePolicies.when;
	var ALL_WHENS = [when.EAGER, when.LAZY];
	var EAGER_WHENS = [when.EAGER];
	/**
	 * Encapsulates Depenency Injection for a path of nodes
	 *
	 * UI-Router states are organized as a tree.
	 * A nested state has a path of ancestors to the root of the tree.
	 * When a state is being activated, each element in the path is wrapped as a [[PathNode]].
	 * A `PathNode` is a stateful object that holds things like parameters and resolvables for the state being activated.
	 *
	 * The ResolveContext closes over the [[PathNode]]s, and provides DI for the last node in the path.
	 */
	var ResolveContext = (function () {
	    function ResolveContext(_path) {
	        this._path = _path;
	    }
	    /** Gets all the tokens found in the resolve context, de-duplicated */
	    ResolveContext.prototype.getTokens = function () {
	        return this._path.reduce(function (acc, node) { return acc.concat(node.resolvables.map(function (r) { return r.token; })); }, []).reduce(common_1.uniqR, []);
	    };
	    /**
	     * Gets the Resolvable that matches the token
	     *
	     * Gets the last Resolvable that matches the token in this context, or undefined.
	     * Throws an error if it doesn't exist in the ResolveContext
	     */
	    ResolveContext.prototype.getResolvable = function (token) {
	        var matching = this._path.map(function (node) { return node.resolvables; })
	            .reduce(common_1.unnestR, [])
	            .filter(function (r) { return r.token === token; });
	        return common_1.tail(matching);
	    };
	    /**
	     * Returns a ResolveContext that includes a portion of this one
	     *
	     * Given a state, this method creates a new ResolveContext from this one.
	     * The new context starts at the first node (root) and stops at the node for the `state` parameter.
	     *
	     * #### Why
	     *
	     * When a transition is created, the nodes in the "To Path" are injected from a ResolveContext.
	     * A ResolveContext closes over a path of [[PathNode]]s and processes the resolvables.
	     * The "To State" can inject values from its own resolvables, as well as those from all its ancestor state's (node's).
	     * This method is used to create a narrower context when injecting ancestor nodes.
	     *
	     * @example
	     * `let ABCD = new ResolveContext([A, B, C, D]);`
	     *
	     * Given a path `[A, B, C, D]`, where `A`, `B`, `C` and `D` are nodes for states `a`, `b`, `c`, `d`:
	     * When injecting `D`, `D` should have access to all resolvables from `A`, `B`, `C`, `D`.
	     * However, `B` should only be able to access resolvables from `A`, `B`.
	     *
	     * When resolving for the `B` node, first take the full "To Path" Context `[A,B,C,D]` and limit to the subpath `[A,B]`.
	     * `let AB = ABCD.subcontext(a)`
	     */
	    ResolveContext.prototype.subContext = function (state) {
	        return new ResolveContext(pathFactory_1.PathFactory.subPath(this._path, function (node) { return node.state === state; }));
	    };
	    /**
	     * Adds Resolvables to the node that matches the state
	     *
	     * This adds a [[Resolvable]] (generally one created on the fly; not declared on a [[StateDeclaration.resolve]] block).
	     * The resolvable is added to the node matching the `state` parameter.
	     *
	     * These new resolvables are not automatically fetched.
	     * The calling code should either fetch them, fetch something that depends on them,
	     * or rely on [[resolvePath]] being called when some state is being entered.
	     *
	     * Note: each resolvable's [[ResolvePolicy]] is merged with the state's policy, and the global default.
	     *
	     * @param newResolvables the new Resolvables
	     * @param state Used to find the node to put the resolvable on
	     */
	    ResolveContext.prototype.addResolvables = function (newResolvables, state) {
	        var node = common_1.find(this._path, hof_1.propEq('state', state));
	        var keys = newResolvables.map(function (r) { return r.token; });
	        node.resolvables = node.resolvables.filter(function (r) { return keys.indexOf(r.token) === -1; }).concat(newResolvables);
	    };
	    /**
	     * Returns a promise for an array of resolved path Element promises
	     *
	     * @param when
	     * @param trans
	     * @returns {Promise<any>|any}
	     */
	    ResolveContext.prototype.resolvePath = function (when, trans) {
	        var _this = this;
	        if (when === void 0) { when = "LAZY"; }
	        // This option determines which 'when' policy Resolvables we are about to fetch.
	        var whenOption = common_1.inArray(ALL_WHENS, when) ? when : "LAZY";
	        // If the caller specified EAGER, only the EAGER Resolvables are fetched.
	        // if the caller specified LAZY, both EAGER and LAZY Resolvables are fetched.`
	        var matchedWhens = whenOption === interface_1.resolvePolicies.when.EAGER ? EAGER_WHENS : ALL_WHENS;
	        // get the subpath to the state argument, if provided
	        trace_1.trace.traceResolvePath(this._path, when, trans);
	        var promises = this._path.reduce(function (acc, node) {
	            var matchesRequestedPolicy = function (resolvable) {
	                return common_1.inArray(matchedWhens, resolvable.getPolicy(node.state).when);
	            };
	            var nodeResolvables = node.resolvables.filter(matchesRequestedPolicy);
	            var subContext = _this.subContext(node.state);
	            // For the matching Resolvables, start their async fetch process.
	            var getResult = function (r) { return r.get(subContext, trans)
	                .then(function (value) { return ({ token: r.token, value: value }); }); };
	            return acc.concat(nodeResolvables.map(getResult));
	        }, []);
	        return coreservices_1.services.$q.all(promises);
	    };
	    ResolveContext.prototype.injector = function () {
	        return new UIInjectorImpl(this);
	    };
	    ResolveContext.prototype.findNode = function (resolvable) {
	        return common_1.find(this._path, function (node) { return common_1.inArray(node.resolvables, resolvable); });
	    };
	    /**
	     * Gets the async dependencies of a Resolvable
	     *
	     * Given a Resolvable, returns its dependencies as a Resolvable[]
	     */
	    ResolveContext.prototype.getDependencies = function (resolvable) {
	        var node = this.findNode(resolvable);
	        // Find which other resolvables are "visible" to the `resolvable` argument
	        // subpath stopping at resolvable's node, or the whole path (if the resolvable isn't in the path)
	        var subPath = pathFactory_1.PathFactory.subPath(this._path, function (x) { return x === node; }) || this._path;
	        var availableResolvables = subPath
	            .reduce(function (acc, node) { return acc.concat(node.resolvables); }, []) //all of subpath's resolvables
	            .filter(function (res) { return res !== resolvable; }); // filter out the `resolvable` argument
	        var getDependency = function (token) {
	            var matching = availableResolvables.filter(function (r) { return r.token === token; });
	            if (matching.length)
	                return common_1.tail(matching);
	            var fromInjector = coreservices_1.services.$injector.get(token);
	            if (!fromInjector) {
	                throw new Error("Could not find Dependency Injection token: " + strings_1.stringify(token));
	            }
	            return new resolvable_1.Resolvable(token, function () { return fromInjector; }, [], fromInjector);
	        };
	        return resolvable.deps.map(getDependency);
	    };
	    return ResolveContext;
	}());
	exports.ResolveContext = ResolveContext;
	var UIInjectorImpl = (function () {
	    function UIInjectorImpl(context) {
	        this.context = context;
	        /** The native injector ($injector on ng1, Root Injector on ng2, justjs injector for everything else) */
	        this.native = coreservices_1.services.$injector;
	    }
	    UIInjectorImpl.prototype.get = function (token) {
	        var resolvable = this.context.getResolvable(token);
	        if (resolvable) {
	            if (!resolvable.resolved) {
	                throw new Error("Resolvable async .get() not complete:" + strings_1.stringify(resolvable.token));
	            }
	            return resolvable.data;
	        }
	        return coreservices_1.services.$injector.get(token);
	    };
	    UIInjectorImpl.prototype.getAsync = function (token) {
	        var resolvable = this.context.getResolvable(token);
	        if (resolvable)
	            return resolvable.get(this.context);
	        return coreservices_1.services.$q.when(coreservices_1.services.$injector.get(token));
	    };
	    return UIInjectorImpl;
	}());


/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	exports.resolvePolicies = {
	    when: {
	        LAZY: "LAZY",
	        EAGER: "EAGER"
	    },
	    async: {
	        WAIT: "WAIT",
	        NOWAIT: "NOWAIT",
	        RXWAIT: "RXWAIT"
	    }
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module resolve */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var coreservices_1 = __webpack_require__(6);
	var trace_1 = __webpack_require__(12);
	var strings_1 = __webpack_require__(9);
	var predicates_1 = __webpack_require__(4);
	// TODO: explicitly make this user configurable
	exports.defaultResolvePolicy = {
	    when: "LAZY",
	    async: "WAIT"
	};
	/**
	 * The basic building block for the resolve system.
	 *
	 * Resolvables encapsulate a state's resolve's resolveFn, the resolveFn's declared dependencies, the wrapped (.promise),
	 * and the unwrapped-when-complete (.data) result of the resolveFn.
	 *
	 * Resolvable.get() either retrieves the Resolvable's existing promise, or else invokes resolve() (which invokes the
	 * resolveFn) and returns the resulting promise.
	 *
	 * Resolvable.get() and Resolvable.resolve() both execute within a context path, which is passed as the first
	 * parameter to those fns.
	 */
	var Resolvable = (function () {
	    function Resolvable(arg1, resolveFn, deps, policy, data) {
	        this.resolved = false;
	        this.promise = undefined;
	        if (arg1 instanceof Resolvable) {
	            common_1.extend(this, arg1);
	        }
	        else if (predicates_1.isFunction(resolveFn)) {
	            if (arg1 == null || arg1 == undefined)
	                throw new Error("new Resolvable(): token argument is required");
	            if (!predicates_1.isFunction(resolveFn))
	                throw new Error("new Resolvable(): resolveFn argument must be a function");
	            this.token = arg1;
	            this.policy = policy;
	            this.resolveFn = resolveFn;
	            this.deps = deps || [];
	            this.data = data;
	            this.resolved = data !== undefined;
	            this.promise = this.resolved ? coreservices_1.services.$q.when(this.data) : undefined;
	        }
	        else if (predicates_1.isObject(arg1) && arg1.token && predicates_1.isFunction(arg1.resolveFn)) {
	            var literal = arg1;
	            return new Resolvable(literal.token, literal.resolveFn, literal.deps, literal.policy, literal.data);
	        }
	    }
	    Resolvable.prototype.getPolicy = function (state) {
	        var thisPolicy = this.policy || {};
	        var statePolicy = state && state.resolvePolicy || {};
	        return {
	            when: thisPolicy.when || statePolicy.when || exports.defaultResolvePolicy.when,
	            async: thisPolicy.async || statePolicy.async || exports.defaultResolvePolicy.async,
	        };
	    };
	    /**
	     * Asynchronously resolve this Resolvable's data
	     *
	     * Given a ResolveContext that this Resolvable is found in:
	     * Wait for this Resolvable's dependencies, then invoke this Resolvable's function
	     * and update the Resolvable's state
	     */
	    Resolvable.prototype.resolve = function (resolveContext, trans) {
	        var _this = this;
	        var $q = coreservices_1.services.$q;
	        // Gets all dependencies from ResolveContext and wait for them to be resolved
	        var getResolvableDependencies = function () {
	            return $q.all(resolveContext.getDependencies(_this).map(function (r) {
	                return r.get(resolveContext, trans);
	            }));
	        };
	        // Invokes the resolve function passing the resolved dependencies as arguments
	        var invokeResolveFn = function (resolvedDeps) {
	            return _this.resolveFn.apply(null, resolvedDeps);
	        };
	        /**
	         * For RXWAIT policy:
	         *
	         * Given an observable returned from a resolve function:
	         * - enables .cache() mode (this allows multicast subscribers)
	         * - then calls toPromise() (this triggers subscribe() and thus fetches)
	         * - Waits for the promise, then return the cached observable (not the first emitted value).
	         */
	        var waitForRx = function (observable$) {
	            var cached = observable$.cache(1);
	            return cached.take(1).toPromise().then(function () { return cached; });
	        };
	        // If the resolve policy is RXWAIT, wait for the observable to emit something. otherwise pass through.
	        var node = resolveContext.findNode(this);
	        var state = node && node.state;
	        var maybeWaitForRx = this.getPolicy(state).async === "RXWAIT" ? waitForRx : common_1.identity;
	        // After the final value has been resolved, update the state of the Resolvable
	        var applyResolvedValue = function (resolvedValue) {
	            _this.data = resolvedValue;
	            _this.resolved = true;
	            trace_1.trace.traceResolvableResolved(_this, trans);
	            return _this.data;
	        };
	        // Sets the promise property first, then getsResolvableDependencies in the context of the promise chain. Always waits one tick.
	        return this.promise = $q.when()
	            .then(getResolvableDependencies)
	            .then(invokeResolveFn)
	            .then(maybeWaitForRx)
	            .then(applyResolvedValue);
	    };
	    /**
	     * Gets a promise for this Resolvable's data.
	     *
	     * Fetches the data and returns a promise.
	     * Returns the existing promise if it has already been fetched once.
	     */
	    Resolvable.prototype.get = function (resolveContext, trans) {
	        return this.promise || this.resolve(resolveContext, trans);
	    };
	    Resolvable.prototype.toString = function () {
	        return "Resolvable(token: " + strings_1.stringify(this.token) + ", requires: [" + this.deps.map(strings_1.stringify) + "])";
	    };
	    Resolvable.prototype.clone = function () {
	        return new Resolvable(this);
	    };
	    Resolvable.fromData = function (token, data) {
	        return new Resolvable(token, function () { return data; }, null, null, data);
	    };
	    return Resolvable;
	}());
	exports.Resolvable = Resolvable;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/** @module path */ /** for typedoc */
	"use strict";
	var common_1 = __webpack_require__(3);
	var hof_1 = __webpack_require__(5);
	var targetState_1 = __webpack_require__(14);
	var node_1 = __webpack_require__(21);
	/**
	 * This class contains functions which convert TargetStates, Nodes and paths from one type to another.
	 */
	var PathFactory = (function () {
	    function PathFactory() {
	    }
	    /** Given a PathNode[], create an TargetState */
	    PathFactory.makeTargetState = function (path) {
	        var state = common_1.tail(path).state;
	        return new targetState_1.TargetState(state, state, path.map(hof_1.prop("paramValues")).reduce(common_1.mergeR, {}));
	    };
	    PathFactory.buildPath = function (targetState) {
	        var toParams = targetState.params();
	        return targetState.$state().path.map(function (state) { return new node_1.PathNode(state).applyRawParams(toParams); });
	    };
	    /** Given a fromPath: PathNode[] and a TargetState, builds a toPath: PathNode[] */
	    PathFactory.buildToPath = function (fromPath, targetState) {
	        var toPath = PathFactory.buildPath(targetState);
	        if (targetState.options().inherit) {
	            return PathFactory.inheritParams(fromPath, toPath, Object.keys(targetState.params()));
	        }
	        return toPath;
	    };
	    /**
	     * Creates ViewConfig objects and adds to nodes.
	     *
	     * On each [[PathNode]], creates ViewConfig objects from the views: property of the node's state
	     */
	    PathFactory.applyViewConfigs = function ($view, path, states) {
	        // Only apply the viewConfigs to the nodes for the given states
	        path.filter(function (node) { return common_1.inArray(states, node.state); }).forEach(function (node) {
	            var viewDecls = common_1.values(node.state.views || {});
	            var subPath = PathFactory.subPath(path, function (n) { return n === node; });
	            var viewConfigs = viewDecls.map(function (view) { return $view.createViewConfig(subPath, view); });
	            node.views = viewConfigs.reduce(common_1.unnestR, []);
	        });
	    };
	    /**
	     * Given a fromPath and a toPath, returns a new to path which inherits parameters from the fromPath
	     *
	     * For a parameter in a node to be inherited from the from path:
	     * - The toPath's node must have a matching node in the fromPath (by state).
	     * - The parameter name must not be found in the toKeys parameter array.
	     *
	     * Note: the keys provided in toKeys are intended to be those param keys explicitly specified by some
	     * caller, for instance, $state.transitionTo(..., toParams).  If a key was found in toParams,
	     * it is not inherited from the fromPath.
	     */
	    PathFactory.inheritParams = function (fromPath, toPath, toKeys) {
	        if (toKeys === void 0) { toKeys = []; }
	        function nodeParamVals(path, state) {
	            var node = common_1.find(path, hof_1.propEq('state', state));
	            return common_1.extend({}, node && node.paramValues);
	        }
	        /**
	         * Given an [[PathNode]] "toNode", return a new [[PathNode]] with param values inherited from the
	         * matching node in fromPath.  Only inherit keys that aren't found in "toKeys" from the node in "fromPath""
	         */
	        function makeInheritedParamsNode(toNode) {
	            // All param values for the node (may include default key/vals, when key was not found in toParams)
	            var toParamVals = common_1.extend({}, toNode && toNode.paramValues);
	            // limited to only those keys found in toParams
	            var incomingParamVals = common_1.pick(toParamVals, toKeys);
	            toParamVals = common_1.omit(toParamVals, toKeys);
	            var fromParamVals = nodeParamVals(fromPath, toNode.state) || {};
	            // extend toParamVals with any fromParamVals, then override any of those those with incomingParamVals
	            var ownParamVals = common_1.extend(toParamVals, fromParamVals, incomingParamVals);
	            return new node_1.PathNode(toNode.state).applyRawParams(ownParamVals);
	        }
	        // The param keys specified by the incoming toParams
	        return toPath.map(makeInheritedParamsNode);
	    };
	    /**
	     * Computes the tree changes (entering, exiting) between a fromPath and toPath.
	     */
	    PathFactory.treeChanges = function (fromPath, toPath, reloadState) {
	        var keep = 0, max = Math.min(fromPath.length, toPath.length);
	        var staticParams = function (state) {
	            return state.parameters({ inherit: false }).filter(hof_1.not(hof_1.prop('dynamic'))).map(hof_1.prop('id'));
	        };
	        var nodesMatch = function (node1, node2) {
	            return node1.equals(node2, staticParams(node1.state));
	        };
	        while (keep < max && fromPath[keep].state !== reloadState && nodesMatch(fromPath[keep], toPath[keep])) {
	            keep++;
	        }
	        /** Given a retained node, return a new node which uses the to node's param values */
	        function applyToParams(retainedNode, idx) {
	            var cloned = node_1.PathNode.clone(retainedNode);
	            cloned.paramValues = toPath[idx].paramValues;
	            return cloned;
	        }
	        var from, retained, exiting, entering, to;
	        from = fromPath;
	        retained = from.slice(0, keep);
	        exiting = from.slice(keep);
	        // Create a new retained path (with shallow copies of nodes) which have the params of the toPath mapped
	        var retainedWithToParams = retained.map(applyToParams);
	        entering = toPath.slice(keep);
	        to = (retainedWithToParams).concat(entering);
	        return { from: from, to: to, retained: retained, exiting: exiting, entering: entering };
	    };
	    /**
	     * Return a subpath of a path, which stops at the first matching node
	     *
	     * Given an array of nodes, returns a subset of the array starting from the first node,
	     * stopping when the first node matches the predicate.
	     *
	     * @param path a path of [[PathNode]]s
	     * @param predicate a [[Predicate]] fn that matches [[PathNode]]s
	     * @returns a subpath up to the matching node, or undefined if no match is found
	     */
	    PathFactory.subPath = function (path, predicate) {
	        var node = common_1.find(path, predicate);
	        var elementIdx = path.indexOf(node);
	        return elementIdx === -1 ? undefined : path.slice(0, elementIdx + 1);
	    };
	    /** Gets the raw parameter values from a path */
	    PathFactory.paramValues = function (path) { return path.reduce(function (acc, node) { return common_1.extend(acc, node.paramValues); }, {}); };
	    return PathFactory;
	}());
	exports.PathFactory = PathFactory;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module path */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var hof_1 = __webpack_require__(5);
	var param_1 = __webpack_require__(22);
	/**
	 * A node in a [[TreeChanges]] path
	 *
	 * For a [[TreeChanges]] path, this class holds the stateful information for a single node in the path.
	 * Each PathNode corresponds to a state being entered, exited, or retained.
	 * The stateful information includes parameter values and resolve data.
	 */
	var PathNode = (function () {
	    function PathNode(stateOrPath) {
	        if (stateOrPath instanceof PathNode) {
	            var node = stateOrPath;
	            this.state = node.state;
	            this.paramSchema = node.paramSchema.slice();
	            this.paramValues = common_1.extend({}, node.paramValues);
	            this.resolvables = node.resolvables.slice();
	            this.views = node.views && node.views.slice();
	        }
	        else {
	            var state = stateOrPath;
	            this.state = state;
	            this.paramSchema = state.parameters({ inherit: false });
	            this.paramValues = {};
	            this.resolvables = state.resolvables.map(function (res) { return res.clone(); });
	        }
	    }
	    /** Sets [[paramValues]] for the node, from the values of an object hash */
	    PathNode.prototype.applyRawParams = function (params) {
	        var getParamVal = function (paramDef) { return [paramDef.id, paramDef.value(params[paramDef.id])]; };
	        this.paramValues = this.paramSchema.reduce(function (memo, pDef) { return common_1.applyPairs(memo, getParamVal(pDef)); }, {});
	        return this;
	    };
	    /** Gets a specific [[Param]] metadata that belongs to the node */
	    PathNode.prototype.parameter = function (name) {
	        return common_1.find(this.paramSchema, hof_1.propEq("id", name));
	    };
	    /**
	     * @returns true if the state and parameter values for another PathNode are
	     * equal to the state and param values for this PathNode
	     */
	    PathNode.prototype.equals = function (node, keys) {
	        var _this = this;
	        if (keys === void 0) { keys = this.paramSchema.map(function (p) { return p.id; }); }
	        var paramValsEq = function (key) {
	            return _this.parameter(key).type.equals(_this.paramValues[key], node.paramValues[key]);
	        };
	        return this.state === node.state && keys.map(paramValsEq).reduce(common_1.allTrueR, true);
	    };
	    /** Returns a clone of the PathNode */
	    PathNode.clone = function (node) {
	        return new PathNode(node);
	    };
	    /**
	     * Returns a new path which is a subpath of the first path which matched the second path.
	     *
	     * The new path starts from root and contains any nodes that match the nodes in the second path.
	     * Nodes are compared using their state property and parameter values.
	     */
	    PathNode.matching = function (pathA, pathB) {
	        var matching = [];
	        for (var i = 0; i < pathA.length && i < pathB.length; i++) {
	            var a = pathA[i], b = pathB[i];
	            if (a.state !== b.state)
	                break;
	            if (!param_1.Param.equals(a.paramSchema, a.paramValues, b.paramValues))
	                break;
	            matching.push(a);
	        }
	        return matching;
	    };
	    return PathNode;
	}());
	exports.PathNode = PathNode;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module params */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var hof_1 = __webpack_require__(5);
	var predicates_1 = __webpack_require__(4);
	var coreservices_1 = __webpack_require__(6);
	var urlMatcherConfig_1 = __webpack_require__(23);
	var type_1 = __webpack_require__(24);
	var hasOwn = Object.prototype.hasOwnProperty;
	var isShorthand = function (cfg) {
	    return ["value", "type", "squash", "array", "dynamic"].filter(hasOwn.bind(cfg || {})).length === 0;
	};
	(function (DefType) {
	    DefType[DefType["PATH"] = 0] = "PATH";
	    DefType[DefType["SEARCH"] = 1] = "SEARCH";
	    DefType[DefType["CONFIG"] = 2] = "CONFIG";
	})(exports.DefType || (exports.DefType = {}));
	var DefType = exports.DefType;
	function unwrapShorthand(cfg) {
	    cfg = isShorthand(cfg) && { value: cfg } || cfg;
	    return common_1.extend(cfg, {
	        $$fn: predicates_1.isInjectable(cfg.value) ? cfg.value : function () { return cfg.value; }
	    });
	}
	function getType(cfg, urlType, location, id, paramTypes) {
	    if (cfg.type && urlType && urlType.name !== 'string')
	        throw new Error("Param '" + id + "' has two type configurations.");
	    if (cfg.type && urlType && urlType.name === 'string' && paramTypes.type(cfg.type))
	        return paramTypes.type(cfg.type);
	    if (urlType)
	        return urlType;
	    if (!cfg.type)
	        return (location === DefType.CONFIG ? paramTypes.type("any") : paramTypes.type("string"));
	    return cfg.type instanceof type_1.ParamType ? cfg.type : paramTypes.type(cfg.type);
	}
	/**
	 * returns false, true, or the squash value to indicate the "default parameter url squash policy".
	 */
	function getSquashPolicy(config, isOptional) {
	    var squash = config.squash;
	    if (!isOptional || squash === false)
	        return false;
	    if (!predicates_1.isDefined(squash) || squash == null)
	        return urlMatcherConfig_1.matcherConfig.defaultSquashPolicy();
	    if (squash === true || predicates_1.isString(squash))
	        return squash;
	    throw new Error("Invalid squash policy: '" + squash + "'. Valid policies: false, true, or arbitrary string");
	}
	function getReplace(config, arrayMode, isOptional, squash) {
	    var replace, configuredKeys, defaultPolicy = [
	        { from: "", to: (isOptional || arrayMode ? undefined : "") },
	        { from: null, to: (isOptional || arrayMode ? undefined : "") }
	    ];
	    replace = predicates_1.isArray(config.replace) ? config.replace : [];
	    if (predicates_1.isString(squash))
	        replace.push({ from: squash, to: undefined });
	    configuredKeys = common_1.map(replace, hof_1.prop("from"));
	    return common_1.filter(defaultPolicy, function (item) { return configuredKeys.indexOf(item.from) === -1; }).concat(replace);
	}
	var Param = (function () {
	    function Param(id, type, config, location, paramTypes) {
	        config = unwrapShorthand(config);
	        type = getType(config, type, location, id, paramTypes);
	        var arrayMode = getArrayMode();
	        type = arrayMode ? type.$asArray(arrayMode, location === DefType.SEARCH) : type;
	        var isOptional = config.value !== undefined;
	        var dynamic = predicates_1.isDefined(config.dynamic) ? !!config.dynamic : !!type.dynamic;
	        var squash = getSquashPolicy(config, isOptional);
	        var replace = getReplace(config, arrayMode, isOptional, squash);
	        // array config: param name (param[]) overrides default settings.  explicit config overrides param name.
	        function getArrayMode() {
	            var arrayDefaults = { array: (location === DefType.SEARCH ? "auto" : false) };
	            var arrayParamNomenclature = id.match(/\[\]$/) ? { array: true } : {};
	            return common_1.extend(arrayDefaults, arrayParamNomenclature, config).array;
	        }
	        common_1.extend(this, { id: id, type: type, location: location, squash: squash, replace: replace, isOptional: isOptional, dynamic: dynamic, config: config, array: arrayMode });
	    }
	    Param.prototype.isDefaultValue = function (value) {
	        return this.isOptional && this.type.equals(this.value(), value);
	    };
	    /**
	     * [Internal] Gets the decoded representation of a value if the value is defined, otherwise, returns the
	     * default value, which may be the result of an injectable function.
	     */
	    Param.prototype.value = function (value) {
	        var _this = this;
	        /**
	         * [Internal] Get the default value of a parameter, which may be an injectable function.
	         */
	        var $$getDefaultValue = function () {
	            if (!coreservices_1.services.$injector)
	                throw new Error("Injectable functions cannot be called at configuration time");
	            var defaultValue = coreservices_1.services.$injector.invoke(_this.config.$$fn);
	            if (defaultValue !== null && defaultValue !== undefined && !_this.type.is(defaultValue))
	                throw new Error("Default value (" + defaultValue + ") for parameter '" + _this.id + "' is not an instance of ParamType (" + _this.type.name + ")");
	            return defaultValue;
	        };
	        var $replace = function (val) {
	            var replacement = common_1.map(common_1.filter(_this.replace, hof_1.propEq('from', val)), hof_1.prop("to"));
	            return replacement.length ? replacement[0] : val;
	        };
	        value = $replace(value);
	        return !predicates_1.isDefined(value) ? $$getDefaultValue() : this.type.$normalize(value);
	    };
	    Param.prototype.isSearch = function () {
	        return this.location === DefType.SEARCH;
	    };
	    Param.prototype.validates = function (value) {
	        // There was no parameter value, but the param is optional
	        if ((!predicates_1.isDefined(value) || value === null) && this.isOptional)
	            return true;
	        // The value was not of the correct ParamType, and could not be decoded to the correct ParamType
	        var normalized = this.type.$normalize(value);
	        if (!this.type.is(normalized))
	            return false;
	        // The value was of the correct type, but when encoded, did not match the ParamType's regexp
	        var encoded = this.type.encode(normalized);
	        return !(predicates_1.isString(encoded) && !this.type.pattern.exec(encoded));
	    };
	    Param.prototype.toString = function () {
	        return "{Param:" + this.id + " " + this.type + " squash: '" + this.squash + "' optional: " + this.isOptional + "}";
	    };
	    /** Creates a new [[Param]] from a CONFIG block */
	    Param.fromConfig = function (id, type, config, paramTypes) {
	        return new Param(id, type, config, DefType.CONFIG, paramTypes);
	    };
	    /** Creates a new [[Param]] from a url PATH */
	    Param.fromPath = function (id, type, config, paramTypes) {
	        return new Param(id, type, config, DefType.PATH, paramTypes);
	    };
	    /** Creates a new [[Param]] from a url SEARCH */
	    Param.fromSearch = function (id, type, config, paramTypes) {
	        return new Param(id, type, config, DefType.SEARCH, paramTypes);
	    };
	    Param.values = function (params, values) {
	        if (values === void 0) { values = {}; }
	        return params.map(function (param) { return [param.id, param.value(values[param.id])]; }).reduce(common_1.applyPairs, {});
	    };
	    /**
	     * Finds [[Param]] objects which have different param values
	     *
	     * Filters a list of [[Param]] objects to only those whose parameter values differ in two param value objects
	     *
	     * @param params: The list of Param objects to filter
	     * @param values1: The first set of parameter values
	     * @param values2: the second set of parameter values
	     *
	     * @returns any Param objects whose values were different between values1 and values2
	     */
	    Param.changed = function (params, values1, values2) {
	        if (values1 === void 0) { values1 = {}; }
	        if (values2 === void 0) { values2 = {}; }
	        return params.filter(function (param) { return !param.type.equals(values1[param.id], values2[param.id]); });
	    };
	    /**
	     * Checks if two param value objects are equal (for a set of [[Param]] objects)
	     *
	     * @param params The list of [[Param]] objects to check
	     * @param values1 The first set of param values
	     * @param values2 The second set of param values
	     *
	     * @returns true if the param values in values1 and values2 are equal
	     */
	    Param.equals = function (params, values1, values2) {
	        if (values1 === void 0) { values1 = {}; }
	        if (values2 === void 0) { values2 = {}; }
	        return Param.changed(params, values1, values2).length === 0;
	    };
	    /** Returns true if a the parameter values are valid, according to the Param definitions */
	    Param.validates = function (params, values) {
	        if (values === void 0) { values = {}; }
	        return params.map(function (param) { return param.validates(values[param.id]); }).reduce(common_1.allTrueR, true);
	    };
	    return Param;
	}());
	exports.Param = Param;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module url */ /** for typedoc */
	var predicates_1 = __webpack_require__(4);
	var MatcherConfig = (function () {
	    function MatcherConfig() {
	        this._isCaseInsensitive = false;
	        this._isStrictMode = true;
	        this._defaultSquashPolicy = false;
	    }
	    MatcherConfig.prototype.caseInsensitive = function (value) {
	        return this._isCaseInsensitive = predicates_1.isDefined(value) ? value : this._isCaseInsensitive;
	    };
	    MatcherConfig.prototype.strictMode = function (value) {
	        return this._isStrictMode = predicates_1.isDefined(value) ? value : this._isStrictMode;
	    };
	    MatcherConfig.prototype.defaultSquashPolicy = function (value) {
	        if (predicates_1.isDefined(value) && value !== true && value !== false && !predicates_1.isString(value))
	            throw new Error("Invalid squash policy: " + value + ". Valid policies: false, true, arbitrary-string");
	        return this._defaultSquashPolicy = predicates_1.isDefined(value) ? value : this._defaultSquashPolicy;
	    };
	    return MatcherConfig;
	}());
	exports.MatcherConfig = MatcherConfig;
	// TODO: Do not export global instance; create one in UIRouter() constructor
	exports.matcherConfig = new MatcherConfig();


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module params */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	/**
	 * Wraps up a `ParamType` object to handle array values.
	 */
	function ArrayType(type, mode) {
	    var _this = this;
	    // Wrap non-array value as array
	    function arrayWrap(val) {
	        return predicates_1.isArray(val) ? val : (predicates_1.isDefined(val) ? [val] : []);
	    }
	    // Unwrap array value for "auto" mode. Return undefined for empty array.
	    function arrayUnwrap(val) {
	        switch (val.length) {
	            case 0: return undefined;
	            case 1: return mode === "auto" ? val[0] : val;
	            default: return val;
	        }
	    }
	    // Wraps type (.is/.encode/.decode) functions to operate on each value of an array
	    function arrayHandler(callback, allTruthyMode) {
	        return function handleArray(val) {
	            if (predicates_1.isArray(val) && val.length === 0)
	                return val;
	            var arr = arrayWrap(val);
	            var result = common_1.map(arr, callback);
	            return (allTruthyMode === true) ? common_1.filter(result, function (x) { return !x; }).length === 0 : arrayUnwrap(result);
	        };
	    }
	    // Wraps type (.equals) functions to operate on each value of an array
	    function arrayEqualsHandler(callback) {
	        return function handleArray(val1, val2) {
	            var left = arrayWrap(val1), right = arrayWrap(val2);
	            if (left.length !== right.length)
	                return false;
	            for (var i = 0; i < left.length; i++) {
	                if (!callback(left[i], right[i]))
	                    return false;
	            }
	            return true;
	        };
	    }
	    ['encode', 'decode', 'equals', '$normalize'].forEach(function (name) {
	        var paramTypeFn = type[name].bind(type);
	        var wrapperFn = name === 'equals' ? arrayEqualsHandler : arrayHandler;
	        _this[name] = wrapperFn(paramTypeFn);
	    });
	    common_1.extend(this, {
	        dynamic: type.dynamic,
	        name: type.name,
	        pattern: type.pattern,
	        is: arrayHandler(type.is.bind(type), true),
	        $arrayMode: mode
	    });
	}
	/**
	 * A class that implements Custom Parameter Type functionality.
	 *
	 * This class has naive implementations for all the [[ParamTypeDefinition]] methods.
	 *
	 * An instance of this class is created when a custom [[ParamTypeDefinition]] object is registered with the [[UrlMatcherFactory.type]].
	 *
	 * Used by [[UrlMatcher]] when matching or formatting URLs, or comparing and validating parameter values.
	 *
	 * @example
	 * ```
	 *
	 * {
	 *   decode: function(val) { return parseInt(val, 10); },
	 *   encode: function(val) { return val && val.toString(); },
	 *   equals: function(a, b) { return this.is(a) && a === b; },
	 *   is: function(val) { return angular.isNumber(val) && isFinite(val) && val % 1 === 0; },
	 *   pattern: /\d+/
	 * }
	 * ```
	 */
	var ParamType = (function () {
	    /**
	     * @param def  A configuration object which contains the custom type definition.  The object's
	     *        properties will override the default methods and/or pattern in `ParamType`'s public interface.
	     * @returns a new ParamType object
	     */
	    function ParamType(def) {
	        this.pattern = /.*/;
	        common_1.extend(this, def);
	    }
	    // consider these four methods to be "abstract methods" that should be overridden
	    /** @inheritdoc */
	    ParamType.prototype.is = function (val, key) { return true; };
	    /** @inheritdoc */
	    ParamType.prototype.encode = function (val, key) { return val; };
	    /** @inheritdoc */
	    ParamType.prototype.decode = function (val, key) { return val; };
	    /** @inheritdoc */
	    ParamType.prototype.equals = function (a, b) { return a == b; };
	    ParamType.prototype.$subPattern = function () {
	        var sub = this.pattern.toString();
	        return sub.substr(1, sub.length - 2);
	    };
	    ParamType.prototype.toString = function () {
	        return "{ParamType:" + this.name + "}";
	    };
	    /** Given an encoded string, or a decoded object, returns a decoded object */
	    ParamType.prototype.$normalize = function (val) {
	        return this.is(val) ? val : this.decode(val);
	    };
	    /**
	     * Wraps an existing custom ParamType as an array of ParamType, depending on 'mode'.
	     * e.g.:
	     * - urlmatcher pattern "/path?{queryParam[]:int}"
	     * - url: "/path?queryParam=1&queryParam=2
	     * - $stateParams.queryParam will be [1, 2]
	     * if `mode` is "auto", then
	     * - url: "/path?queryParam=1 will create $stateParams.queryParam: 1
	     * - url: "/path?queryParam=1&queryParam=2 will create $stateParams.queryParam: [1, 2]
	     */
	    ParamType.prototype.$asArray = function (mode, isSearch) {
	        if (!mode)
	            return this;
	        if (mode === "auto" && !isSearch)
	            throw new Error("'auto' array mode is for query parameters only");
	        return new ArrayType(this, mode);
	    };
	    return ParamType;
	}());
	exports.ParamType = ParamType;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module core */ /** */
	var urlMatcherFactory_1 = __webpack_require__(26);
	var urlRouter_1 = __webpack_require__(29);
	var state_1 = __webpack_require__(30);
	var urlRouter_2 = __webpack_require__(29);
	var transitionService_1 = __webpack_require__(31);
	var view_1 = __webpack_require__(38);
	var stateRegistry_1 = __webpack_require__(39);
	var stateService_1 = __webpack_require__(44);
	var globals_1 = __webpack_require__(45);
	/**
	 * The master class used to instantiate an instance of UI-Router.
	 *
	 * This class instantiates and wires the global UI-Router services.
	 *
	 * After instantiating a new instance of the Router class, configure it for your app.  For instance, register
	 * your app states with the [[stateRegistry]] (and set url options using ...).  Then, tell UI-Router to monitor
	 * the URL by calling `urlRouter.listen()` ([[URLRouter.listen]])
	 */
	var UIRouter = (function () {
	    function UIRouter() {
	        this.viewService = new view_1.ViewService();
	        this.transitionService = new transitionService_1.TransitionService(this);
	        this.globals = new globals_1.Globals(this.transitionService);
	        this.urlMatcherFactory = new urlMatcherFactory_1.UrlMatcherFactory();
	        this.urlRouterProvider = new urlRouter_1.UrlRouterProvider(this.urlMatcherFactory, this.globals.params);
	        this.urlRouter = new urlRouter_2.UrlRouter(this.urlRouterProvider);
	        this.stateRegistry = new stateRegistry_1.StateRegistry(this.urlMatcherFactory, this.urlRouterProvider);
	        /** @hidden TODO: move this to ng1.ts */
	        this.stateProvider = new state_1.StateProvider(this.stateRegistry);
	        this.stateService = new stateService_1.StateService(this);
	        this.viewService.rootContext(this.stateRegistry.root());
	        this.globals.$current = this.stateRegistry.root();
	        this.globals.current = this.globals.$current.self;
	    }
	    return UIRouter;
	}());
	exports.UIRouter = UIRouter;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module url */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var urlMatcher_1 = __webpack_require__(27);
	var urlMatcherConfig_1 = __webpack_require__(23);
	var param_1 = __webpack_require__(22);
	var paramTypes_1 = __webpack_require__(28);
	/** @hidden */
	function getDefaultConfig() {
	    return {
	        strict: urlMatcherConfig_1.matcherConfig.strictMode(),
	        caseInsensitive: urlMatcherConfig_1.matcherConfig.caseInsensitive()
	    };
	}
	/**
	 * Factory for [[UrlMatcher]] instances.
	 *
	 * The factory is available to ng1 services as
	 * `$urlMatcherFactor` or ng1 providers as `$urlMatcherFactoryProvider`.
	 */
	var UrlMatcherFactory = (function () {
	    function UrlMatcherFactory() {
	        this.paramTypes = new paramTypes_1.ParamTypes();
	        common_1.extend(this, { UrlMatcher: urlMatcher_1.UrlMatcher, Param: param_1.Param });
	    }
	    /**
	     * Defines whether URL matching should be case sensitive (the default behavior), or not.
	     *
	     * @param value `false` to match URL in a case sensitive manner; otherwise `true`;
	     * @returns the current value of caseInsensitive
	     */
	    UrlMatcherFactory.prototype.caseInsensitive = function (value) {
	        return urlMatcherConfig_1.matcherConfig.caseInsensitive(value);
	    };
	    /**
	     * Defines whether URLs should match trailing slashes, or not (the default behavior).
	     *
	     * @param value `false` to match trailing slashes in URLs, otherwise `true`.
	     * @returns the current value of strictMode
	     */
	    UrlMatcherFactory.prototype.strictMode = function (value) {
	        return urlMatcherConfig_1.matcherConfig.strictMode(value);
	    };
	    /**
	     * Sets the default behavior when generating or matching URLs with default parameter values.
	     *
	     * @param value A string that defines the default parameter URL squashing behavior.
	     *    - `nosquash`: When generating an href with a default parameter value, do not squash the parameter value from the URL
	     *    - `slash`: When generating an href with a default parameter value, squash (remove) the parameter value, and, if the
	     *             parameter is surrounded by slashes, squash (remove) one slash from the URL
	     *    - any other string, e.g. "~": When generating an href with a default parameter value, squash (remove)
	     *             the parameter value from the URL and replace it with this string.
	     * @returns the current value of defaultSquashPolicy
	     */
	    UrlMatcherFactory.prototype.defaultSquashPolicy = function (value) {
	        return urlMatcherConfig_1.matcherConfig.defaultSquashPolicy(value);
	    };
	    /**
	     * Creates a [[UrlMatcher]] for the specified pattern.
	     *
	     * @param pattern  The URL pattern.
	     * @param config  The config object hash.
	     * @returns The UrlMatcher.
	     */
	    UrlMatcherFactory.prototype.compile = function (pattern, config) {
	        return new urlMatcher_1.UrlMatcher(pattern, this.paramTypes, common_1.extend(getDefaultConfig(), config));
	    };
	    /**
	     * Returns true if the specified object is a [[UrlMatcher]], or false otherwise.
	     *
	     * @param object  The object to perform the type check against.
	     * @returns `true` if the object matches the `UrlMatcher` interface, by
	     *          implementing all the same methods.
	     */
	    UrlMatcherFactory.prototype.isMatcher = function (object) {
	        // TODO: typeof?
	        if (!predicates_1.isObject(object))
	            return false;
	        var result = true;
	        common_1.forEach(urlMatcher_1.UrlMatcher.prototype, function (val, name) {
	            if (predicates_1.isFunction(val))
	                result = result && (predicates_1.isDefined(object[name]) && predicates_1.isFunction(object[name]));
	        });
	        return result;
	    };
	    ;
	    /**
	     * Creates and registers a custom [[ParamType]] object
	     *
	     * A [[ParamType]] can be used to generate URLs with typed parameters.
	     *
	     * @param name  The type name.
	     * @param definition The type definition. See [[ParamTypeDefinition]] for information on the values accepted.
	     * @param definitionFn A function that is injected before the app runtime starts.
	     *        The result of this function should be a [[ParamTypeDefinition]].
	     *        The result is merged into the existing `definition`.
	     *        See [[ParamType]] for information on the values accepted.
	     *
	     * @returns - if a type was registered: the [[UrlMatcherFactory]]
	     *   - if only the `name` parameter was specified: the currently registered [[ParamType]] object, or undefined
	     *
	     * Note: Register custom types *before using them* in a state definition.
	     *
	     * See [[ParamTypeDefinition]] for examples
	     */
	    UrlMatcherFactory.prototype.type = function (name, definition, definitionFn) {
	        var type = this.paramTypes.type(name, definition, definitionFn);
	        return !predicates_1.isDefined(definition) ? type : this;
	    };
	    ;
	    /** @hidden */
	    UrlMatcherFactory.prototype.$get = function () {
	        this.paramTypes.enqueue = false;
	        this.paramTypes._flushTypeQueue();
	        return this;
	    };
	    ;
	    return UrlMatcherFactory;
	}());
	exports.UrlMatcherFactory = UrlMatcherFactory;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module url */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var hof_1 = __webpack_require__(5);
	var predicates_1 = __webpack_require__(4);
	var param_1 = __webpack_require__(22);
	var predicates_2 = __webpack_require__(4);
	var param_2 = __webpack_require__(22);
	var common_2 = __webpack_require__(3);
	var common_3 = __webpack_require__(3);
	/** @hidden */
	function quoteRegExp(string, param) {
	    var surroundPattern = ['', ''], result = string.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
	    if (!param)
	        return result;
	    switch (param.squash) {
	        case false:
	            surroundPattern = ['(', ')' + (param.isOptional ? '?' : '')];
	            break;
	        case true:
	            result = result.replace(/\/$/, '');
	            surroundPattern = ['(?:\/(', ')|\/)?'];
	            break;
	        default:
	            surroundPattern = [("(" + param.squash + "|"), ')?'];
	            break;
	    }
	    return result + surroundPattern[0] + param.type.pattern.source + surroundPattern[1];
	}
	/** @hidden */
	var memoizeTo = function (obj, prop, fn) {
	    return obj[prop] = obj[prop] || fn();
	};
	/**
	 * Matches URLs against patterns.
	 *
	 * Matches URLs against patterns and extracts named parameters from the path or the search
	 * part of the URL.
	 *
	 * A URL pattern consists of a path pattern, optionally followed by '?' and a list of search (query)
	 * parameters. Multiple search parameter names are separated by '&'. Search parameters
	 * do not influence whether or not a URL is matched, but their values are passed through into
	 * the matched parameters returned by [[UrlMatcher.exec]].
	 *
	 * - *Path parameters* are defined using curly brace placeholders (`/somepath/{param}`)
	 * or colon placeholders (`/somePath/:param`).
	 *
	 * - *A parameter RegExp* may be defined for a param after a colon
	 * (`/somePath/{param:[a-zA-Z0-9]+}`) in a curly brace placeholder.
	 * The regexp must match for the url to be matched.
	 * Should the regexp itself contain curly braces, they must be in matched pairs or escaped with a backslash.
	 *
	 * - *Custom parameter types* may also be specified after a colon (`/somePath/{param:int}`)
	 * in curly brace parameters.  See [[UrlMatcherFactory.type]] for more information.
	 *
	 * - *Catch-all parameters* are defined using an asterisk placeholder (`/somepath/*catchallparam`).  A catch-all
	 * parameter value will contain the remainder of the URL.
	 *
	 * ---
	 *
	 * Parameter names may contain only word characters (latin letters, digits, and underscore) and
	 * must be unique within the pattern (across both path and search parameters).
	 * A path parameter matches any number of characters other than '/'. For catch-all
	 * placeholders the path parameter matches any number of characters.
	 *
	 * Examples:
	 *
	 * * `'/hello/'` - Matches only if the path is exactly '/hello/'. There is no special treatment for
	 *   trailing slashes, and patterns have to match the entire path, not just a prefix.
	 * * `'/user/:id'` - Matches '/user/bob' or '/user/1234!!!' or even '/user/' but not '/user' or
	 *   '/user/bob/details'. The second path segment will be captured as the parameter 'id'.
	 * * `'/user/{id}'` - Same as the previous example, but using curly brace syntax.
	 * * `'/user/{id:[^/]*}'` - Same as the previous example.
	 * * `'/user/{id:[0-9a-fA-F]{1,8}}'` - Similar to the previous example, but only matches if the id
	 *   parameter consists of 1 to 8 hex digits.
	 * * `'/files/{path:.*}'` - Matches any URL starting with '/files/' and captures the rest of the
	 *   path into the parameter 'path'.
	 * * `'/files/*path'` - ditto.
	 * * `'/calendar/{start:date}'` - Matches "/calendar/2014-11-12" (because the pattern defined
	 *   in the built-in  `date` ParamType matches `2014-11-12`) and provides a Date object in $stateParams.start
	 *
	 */
	var UrlMatcher = (function () {
	    /**
	     * @param pattern The pattern to compile into a matcher.
	     * @param paramTypes The [[ParamTypes]] registry
	     * @param config  A configuration object
	     * - `caseInsensitive` - `true` if URL matching should be case insensitive, otherwise `false`, the default value (for backward compatibility) is `false`.
	     * - `strict` - `false` if matching against a URL with a trailing slash should be treated as equivalent to a URL without a trailing slash, the default value is `true`.
	     */
	    function UrlMatcher(pattern, paramTypes, config) {
	        var _this = this;
	        this.config = config;
	        /** @hidden */
	        this._cache = { path: [], pattern: null };
	        /** @hidden */
	        this._children = [];
	        /** @hidden */
	        this._params = [];
	        /** @hidden */
	        this._segments = [];
	        /** @hidden */
	        this._compiled = [];
	        this.pattern = pattern;
	        this.config = common_1.defaults(this.config, {
	            params: {},
	            strict: true,
	            caseInsensitive: false,
	            paramMap: common_1.identity
	        });
	        // Find all placeholders and create a compiled pattern, using either classic or curly syntax:
	        //   '*' name
	        //   ':' name
	        //   '{' name '}'
	        //   '{' name ':' regexp '}'
	        // The regular expression is somewhat complicated due to the need to allow curly braces
	        // inside the regular expression. The placeholder regexp breaks down as follows:
	        //    ([:*])([\w\[\]]+)              - classic placeholder ($1 / $2) (search version has - for snake-case)
	        //    \{([\w\[\]]+)(?:\:\s*( ... ))?\}  - curly brace placeholder ($3) with optional regexp/type ... ($4) (search version has - for snake-case
	        //    (?: ... | ... | ... )+         - the regexp consists of any number of atoms, an atom being either
	        //    [^{}\\]+                       - anything other than curly braces or backslash
	        //    \\.                            - a backslash escape
	        //    \{(?:[^{}\\]+|\\.)*\}          - a matched set of curly braces containing other atoms
	        var placeholder = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, searchPlaceholder = /([:]?)([\w\[\].-]+)|\{([\w\[\].-]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, last = 0, m, patterns = [];
	        var checkParamErrors = function (id) {
	            if (!UrlMatcher.nameValidator.test(id))
	                throw new Error("Invalid parameter name '" + id + "' in pattern '" + pattern + "'");
	            if (common_1.find(_this._params, hof_1.propEq('id', id)))
	                throw new Error("Duplicate parameter name '" + id + "' in pattern '" + pattern + "'");
	        };
	        // Split into static segments separated by path parameter placeholders.
	        // The number of segments is always 1 more than the number of parameters.
	        var matchDetails = function (m, isSearch) {
	            // IE[78] returns '' for unmatched groups instead of null
	            var id = m[2] || m[3], regexp = isSearch ? m[4] : m[4] || (m[1] === '*' ? '.*' : null);
	            return {
	                id: id,
	                regexp: regexp,
	                cfg: _this.config.params[id],
	                segment: pattern.substring(last, m.index),
	                type: !regexp ? null : paramTypes.type(regexp || "string") || common_1.inherit(paramTypes.type("string"), {
	                    pattern: new RegExp(regexp, _this.config.caseInsensitive ? 'i' : undefined)
	                })
	            };
	        };
	        var p, segment;
	        while ((m = placeholder.exec(pattern))) {
	            p = matchDetails(m, false);
	            if (p.segment.indexOf('?') >= 0)
	                break; // we're into the search part
	            checkParamErrors(p.id);
	            this._params.push(param_1.Param.fromPath(p.id, p.type, this.config.paramMap(p.cfg, false), paramTypes));
	            this._segments.push(p.segment);
	            patterns.push([p.segment, common_1.tail(this._params)]);
	            last = placeholder.lastIndex;
	        }
	        segment = pattern.substring(last);
	        // Find any search parameter names and remove them from the last segment
	        var i = segment.indexOf('?');
	        if (i >= 0) {
	            var search = segment.substring(i);
	            segment = segment.substring(0, i);
	            if (search.length > 0) {
	                last = 0;
	                while ((m = searchPlaceholder.exec(search))) {
	                    p = matchDetails(m, true);
	                    checkParamErrors(p.id);
	                    this._params.push(param_1.Param.fromSearch(p.id, p.type, this.config.paramMap(p.cfg, true), paramTypes));
	                    last = placeholder.lastIndex;
	                }
	            }
	        }
	        this._segments.push(segment);
	        common_1.extend(this, {
	            _compiled: patterns.map(function (pattern) { return quoteRegExp.apply(null, pattern); }).concat(quoteRegExp(segment)),
	            prefix: this._segments[0]
	        });
	        Object.freeze(this);
	    }
	    /**
	     * Creates a new concatenated UrlMatcher
	     *
	     * Builds a new UrlMatcher by appending another UrlMatcher to this one.
	     *
	     * @param url A `UrlMatcher` instance to append as a child of the current `UrlMatcher`.
	     */
	    UrlMatcher.prototype.append = function (url) {
	        this._children.push(url);
	        common_1.forEach(url._cache, function (val, key) { return url._cache[key] = predicates_1.isArray(val) ? [] : null; });
	        url._cache.path = this._cache.path.concat(this);
	        return url;
	    };
	    /** @hidden */
	    UrlMatcher.prototype.isRoot = function () {
	        return this._cache.path.length === 0;
	    };
	    /** Returns the input pattern string */
	    UrlMatcher.prototype.toString = function () {
	        return this.pattern;
	    };
	    /**
	     * Tests the specified url/path against this matcher.
	     *
	     * Tests if the given url matches this matcher's pattern, and returns an object containing the captured
	     * parameter values.  Returns null if the path does not match.
	     *
	     * The returned object contains the values
	     * of any search parameters that are mentioned in the pattern, but their value may be null if
	     * they are not present in `search`. This means that search parameters are always treated
	     * as optional.
	     *
	     * @example
	     * ```js
	     *
	     * new UrlMatcher('/user/{id}?q&r').exec('/user/bob', {
	     *   x: '1', q: 'hello'
	     * });
	     * // returns { id: 'bob', q: 'hello', r: null }
	     * ```
	     *
	     * @param path    The URL path to match, e.g. `$location.path()`.
	     * @param search  URL search parameters, e.g. `$location.search()`.
	     * @param hash    URL hash e.g. `$location.hash()`.
	     * @param options
	     *
	     * @returns The captured parameter values.
	     */
	    UrlMatcher.prototype.exec = function (path, search, hash, options) {
	        var _this = this;
	        if (search === void 0) { search = {}; }
	        if (options === void 0) { options = {}; }
	        var match = memoizeTo(this._cache, 'pattern', function () {
	            return new RegExp([
	                '^',
	                common_1.unnest(_this._cache.path.concat(_this).map(hof_1.prop('_compiled'))).join(''),
	                _this.config.strict === false ? '\/?' : '',
	                '$'
	            ].join(''), _this.config.caseInsensitive ? 'i' : undefined);
	        }).exec(path);
	        if (!match)
	            return null;
	        //options = defaults(options, { isolate: false });
	        var allParams = this.parameters(), pathParams = allParams.filter(function (param) { return !param.isSearch(); }), searchParams = allParams.filter(function (param) { return param.isSearch(); }), nPathSegments = this._cache.path.concat(this).map(function (urlm) { return urlm._segments.length - 1; }).reduce(function (a, x) { return a + x; }), values = {};
	        if (nPathSegments !== match.length - 1)
	            throw new Error("Unbalanced capture group in route '" + this.pattern + "'");
	        function decodePathArray(string) {
	            var reverseString = function (str) { return str.split("").reverse().join(""); };
	            var unquoteDashes = function (str) { return str.replace(/\\-/g, "-"); };
	            var split = reverseString(string).split(/-(?!\\)/);
	            var allReversed = common_1.map(split, reverseString);
	            return common_1.map(allReversed, unquoteDashes).reverse();
	        }
	        for (var i = 0; i < nPathSegments; i++) {
	            var param = pathParams[i];
	            var value = match[i + 1];
	            // if the param value matches a pre-replace pair, replace the value before decoding.
	            for (var j = 0; j < param.replace.length; j++) {
	                if (param.replace[j].from === value)
	                    value = param.replace[j].to;
	            }
	            if (value && param.array === true)
	                value = decodePathArray(value);
	            if (predicates_2.isDefined(value))
	                value = param.type.decode(value);
	            values[param.id] = param.value(value);
	        }
	        searchParams.forEach(function (param) {
	            var value = search[param.id];
	            for (var j = 0; j < param.replace.length; j++) {
	                if (param.replace[j].from === value)
	                    value = param.replace[j].to;
	            }
	            if (predicates_2.isDefined(value))
	                value = param.type.decode(value);
	            values[param.id] = param.value(value);
	        });
	        if (hash)
	            values["#"] = hash;
	        return values;
	    };
	    /**
	     * @hidden
	     * Returns all the [[Param]] objects of all path and search parameters of this pattern in order of appearance.
	     *
	     * @returns {Array.<Param>}  An array of [[Param]] objects. Must be treated as read-only. If the
	     *    pattern has no parameters, an empty array is returned.
	     */
	    UrlMatcher.prototype.parameters = function (opts) {
	        if (opts === void 0) { opts = {}; }
	        if (opts.inherit === false)
	            return this._params;
	        return common_1.unnest(this._cache.path.concat(this).map(hof_1.prop('_params')));
	    };
	    /**
	     * @hidden
	     * Returns a single parameter from this UrlMatcher by id
	     *
	     * @param id
	     * @param opts
	     * @returns {T|Param|any|boolean|UrlMatcher|null}
	     */
	    UrlMatcher.prototype.parameter = function (id, opts) {
	        if (opts === void 0) { opts = {}; }
	        var parent = common_1.tail(this._cache.path);
	        return (common_1.find(this._params, hof_1.propEq('id', id)) ||
	            (opts.inherit !== false && parent && parent.parameter(id)) ||
	            null);
	    };
	    /**
	     * Validates the input parameter values against this UrlMatcher
	     *
	     * Checks an object hash of parameters to validate their correctness according to the parameter
	     * types of this `UrlMatcher`.
	     *
	     * @param params The object hash of parameters to validate.
	     * @returns Returns `true` if `params` validates, otherwise `false`.
	     */
	    UrlMatcher.prototype.validates = function (params) {
	        var _this = this;
	        var validParamVal = function (param, val) {
	            return !param || param.validates(val);
	        };
	        return common_1.pairs(params || {}).map(function (_a) {
	            var key = _a[0], val = _a[1];
	            return validParamVal(_this.parameter(key), val);
	        }).reduce(common_1.allTrueR, true);
	    };
	    /**
	     * Given a set of parameter values, creates a URL from this UrlMatcher.
	     *
	     * Creates a URL that matches this pattern by substituting the specified values
	     * for the path and search parameters.
	     *
	     * @example
	     * ```js
	     *
	     * new UrlMatcher('/user/{id}?q').format({ id:'bob', q:'yes' });
	     * // returns '/user/bob?q=yes'
	     * ```
	     *
	     * @param values  the values to substitute for the parameters in this pattern.
	     * @returns the formatted URL (path and optionally search part).
	     */
	    UrlMatcher.prototype.format = function (values) {
	        if (values === void 0) { values = {}; }
	        if (!this.validates(values))
	            return null;
	        // Build the full path of UrlMatchers (including all parent UrlMatchers)
	        var urlMatchers = this._cache.path.slice().concat(this);
	        // Extract all the static segments and Params into an ordered array
	        var pathSegmentsAndParams = urlMatchers.map(UrlMatcher.pathSegmentsAndParams).reduce(common_2.unnestR, []);
	        // Extract the query params into a separate array
	        var queryParams = urlMatchers.map(UrlMatcher.queryParams).reduce(common_2.unnestR, []);
	        /**
	         * Given a Param,
	         * Applies the parameter value, then returns details about it
	         */
	        function getDetails(param) {
	            // Normalize to typed value
	            var value = param.value(values[param.id]);
	            var isDefaultValue = param.isDefaultValue(value);
	            // Check if we're in squash mode for the parameter
	            var squash = isDefaultValue ? param.squash : false;
	            // Allow the Parameter's Type to encode the value
	            var encoded = param.type.encode(value);
	            return { param: param, value: value, isDefaultValue: isDefaultValue, squash: squash, encoded: encoded };
	        }
	        // Build up the path-portion from the list of static segments and parameters
	        var pathString = pathSegmentsAndParams.reduce(function (acc, x) {
	            // The element is a static segment (a raw string); just append it
	            if (predicates_1.isString(x))
	                return acc + x;
	            // Otherwise, it's a Param.  Fetch details about the parameter value
	            var _a = getDetails(x), squash = _a.squash, encoded = _a.encoded, param = _a.param;
	            // If squash is === true, try to remove a slash from the path
	            if (squash === true)
	                return (acc.match(/\/$/)) ? acc.slice(0, -1) : acc;
	            // If squash is a string, use the string for the param value
	            if (predicates_1.isString(squash))
	                return acc + squash;
	            if (squash !== false)
	                return acc; // ?
	            if (encoded == null)
	                return acc;
	            // If this parameter value is an array, encode the value using encodeDashes
	            if (predicates_1.isArray(encoded))
	                return acc + common_1.map(encoded, UrlMatcher.encodeDashes).join("-");
	            // If the parameter type is "raw", then do not encodeURIComponent
	            if (param.type.raw)
	                return acc + encoded;
	            // Encode the value
	            return acc + encodeURIComponent(encoded);
	        }, "");
	        // Build the query string by applying parameter values (array or regular)
	        // then mapping to key=value, then flattening and joining using "&"
	        var queryString = queryParams.map(function (param) {
	            var _a = getDetails(param), squash = _a.squash, encoded = _a.encoded, isDefaultValue = _a.isDefaultValue;
	            if (encoded == null || (isDefaultValue && squash !== false))
	                return;
	            if (!predicates_1.isArray(encoded))
	                encoded = [encoded];
	            if (encoded.length === 0)
	                return;
	            if (!param.type.raw)
	                encoded = common_1.map(encoded, encodeURIComponent);
	            return encoded.map(function (val) { return (param.id + "=" + val); });
	        }).filter(common_1.identity).reduce(common_2.unnestR, []).join("&");
	        // Concat the pathstring with the queryString (if exists) and the hashString (if exists)
	        return pathString + (queryString ? "?" + queryString : "") + (values["#"] ? "#" + values["#"] : "");
	    };
	    /** @hidden */
	    UrlMatcher.encodeDashes = function (str) {
	        return encodeURIComponent(str).replace(/-/g, function (c) { return ("%5C%" + c.charCodeAt(0).toString(16).toUpperCase()); });
	    };
	    /** @hidden Given a matcher, return an array with the matcher's path segments and path params, in order */
	    UrlMatcher.pathSegmentsAndParams = function (matcher) {
	        var staticSegments = matcher._segments;
	        var pathParams = matcher._params.filter(function (p) { return p.location === param_2.DefType.PATH; });
	        return common_3.arrayTuples(staticSegments, pathParams.concat(undefined)).reduce(common_2.unnestR, []).filter(function (x) { return x !== "" && predicates_2.isDefined(x); });
	    };
	    /** @hidden Given a matcher, return an array with the matcher's query params */
	    UrlMatcher.queryParams = function (matcher) {
	        return matcher._params.filter(function (p) { return p.location === param_2.DefType.SEARCH; });
	    };
	    /** @hidden */
	    UrlMatcher.nameValidator = /^\w+([-.]+\w+)*(?:\[\])?$/;
	    return UrlMatcher;
	}());
	exports.UrlMatcher = UrlMatcher;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module params */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var hof_1 = __webpack_require__(5);
	var coreservices_1 = __webpack_require__(6);
	var type_1 = __webpack_require__(24);
	// Use tildes to pre-encode slashes.
	// If the slashes are simply URLEncoded, the browser can choose to pre-decode them,
	// and bidirectional encoding/decoding fails.
	// Tilde was chosen because it's not a RFC 3986 section 2.2 Reserved Character
	function valToString(val) { return val != null ? val.toString().replace(/~/g, "~~").replace(/\//g, "~2F") : val; }
	function valFromString(val) { return val != null ? val.toString().replace(/~2F/g, "/").replace(/~~/g, "~") : val; }
	var ParamTypes = (function () {
	    function ParamTypes() {
	        this.enqueue = true;
	        this.typeQueue = [];
	        this.defaultTypes = {
	            "hash": {
	                encode: valToString,
	                decode: valFromString,
	                is: hof_1.is(String),
	                pattern: /.*/,
	                equals: function (a, b) { return a == b; } // allow coersion for null/undefined/""
	            },
	            "string": {
	                encode: valToString,
	                decode: valFromString,
	                is: hof_1.is(String),
	                pattern: /[^/]*/
	            },
	            "int": {
	                encode: valToString,
	                decode: function (val) { return parseInt(val, 10); },
	                is: function (val) { return predicates_1.isDefined(val) && this.decode(val.toString()) === val; },
	                pattern: /-?\d+/
	            },
	            "bool": {
	                encode: function (val) { return val && 1 || 0; },
	                decode: function (val) { return parseInt(val, 10) !== 0; },
	                is: hof_1.is(Boolean),
	                pattern: /0|1/
	            },
	            "date": {
	                encode: function (val) {
	                    return !this.is(val) ? undefined : [
	                        val.getFullYear(),
	                        ('0' + (val.getMonth() + 1)).slice(-2),
	                        ('0' + val.getDate()).slice(-2)
	                    ].join("-");
	                },
	                decode: function (val) {
	                    if (this.is(val))
	                        return val;
	                    var match = this.capture.exec(val);
	                    return match ? new Date(match[1], match[2] - 1, match[3]) : undefined;
	                },
	                is: function (val) { return val instanceof Date && !isNaN(val.valueOf()); },
	                equals: function (l, r) {
	                    return ['getFullYear', 'getMonth', 'getDate']
	                        .reduce(function (acc, fn) { return acc && l[fn]() === r[fn](); }, true);
	                },
	                pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
	                capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
	            },
	            "json": {
	                encode: common_1.toJson,
	                decode: common_1.fromJson,
	                is: hof_1.is(Object),
	                equals: common_1.equals,
	                pattern: /[^/]*/
	            },
	            "any": {
	                encode: common_1.identity,
	                decode: common_1.identity,
	                equals: common_1.equals,
	                pattern: /.*/
	            }
	        };
	        // Register default types. Store them in the prototype of this.types.
	        var makeType = function (definition, name) { return new type_1.ParamType(common_1.extend({ name: name }, definition)); };
	        this.types = common_1.inherit(common_1.map(this.defaultTypes, makeType), {});
	    }
	    ParamTypes.prototype.type = function (name, definition, definitionFn) {
	        if (!predicates_1.isDefined(definition))
	            return this.types[name];
	        if (this.types.hasOwnProperty(name))
	            throw new Error("A type named '" + name + "' has already been defined.");
	        this.types[name] = new type_1.ParamType(common_1.extend({ name: name }, definition));
	        if (definitionFn) {
	            this.typeQueue.push({ name: name, def: definitionFn });
	            if (!this.enqueue)
	                this._flushTypeQueue();
	        }
	        return this;
	    };
	    ParamTypes.prototype._flushTypeQueue = function () {
	        while (this.typeQueue.length) {
	            var type = this.typeQueue.shift();
	            if (type.pattern)
	                throw new Error("You cannot override a type's .pattern at runtime.");
	            common_1.extend(this.types[type.name], coreservices_1.services.$injector.invoke(type.def));
	        }
	    };
	    return ParamTypes;
	}());
	exports.ParamTypes = ParamTypes;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module url */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var coreservices_1 = __webpack_require__(6);
	/** @hidden */
	var $location = coreservices_1.services.location;
	/** @hidden Returns a string that is a prefix of all strings matching the RegExp */
	function regExpPrefix(re) {
	    var prefix = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(re.source);
	    return (prefix != null) ? prefix[1].replace(/\\(.)/g, "$1") : '';
	}
	/** @hidden Interpolates matched values into a String.replace()-style pattern */
	function interpolate(pattern, match) {
	    return pattern.replace(/\$(\$|\d{1,2})/, function (m, what) {
	        return match[what === '$' ? 0 : Number(what)];
	    });
	}
	/** @hidden */
	function handleIfMatch($injector, $stateParams, handler, match) {
	    if (!match)
	        return false;
	    var result = $injector.invoke(handler, handler, { $match: match, $stateParams: $stateParams });
	    return predicates_1.isDefined(result) ? result : true;
	}
	/** @hidden */
	function appendBasePath(url, isHtml5, absolute) {
	    var baseHref = coreservices_1.services.locationConfig.baseHref();
	    if (baseHref === '/')
	        return url;
	    if (isHtml5)
	        return baseHref.slice(0, -1) + url;
	    if (absolute)
	        return baseHref.slice(1) + url;
	    return url;
	}
	// TODO: Optimize groups of rules with non-empty prefix into some sort of decision tree
	/** @hidden */
	function update(rules, otherwiseFn, evt) {
	    if (evt && evt.defaultPrevented)
	        return;
	    function check(rule) {
	        var handled = rule(coreservices_1.services.$injector, $location);
	        if (!handled)
	            return false;
	        if (predicates_1.isString(handled)) {
	            $location.setUrl(handled, true);
	        }
	        return true;
	    }
	    var n = rules.length;
	    for (var i = 0; i < n; i++) {
	        if (check(rules[i]))
	            return;
	    }
	    // always check otherwise last to allow dynamic updates to the set of rules
	    if (otherwiseFn)
	        check(otherwiseFn);
	}
	/**
	 * Manages rules for client-side URL
	 *
	 * This class manages the router rules for what to do when the URL changes.
	 */
	var UrlRouterProvider = (function () {
	    function UrlRouterProvider($urlMatcherFactory, $stateParams) {
	        /** @hidden */
	        this.rules = [];
	        /** @hidden */
	        this.interceptDeferred = false;
	        this.$urlMatcherFactory = $urlMatcherFactory;
	        this.$stateParams = $stateParams;
	    }
	    /**
	     * Registers a url handler function.
	     *
	     * Registers a low level url handler (a `rule`). A rule detects specific URL patterns and returns
	     * a redirect, or performs some action.
	     *
	     * If a rule returns a string, the URL is replaced with the string, and all rules are fired again.
	     *
	     * @example
	     * ```js
	     *
	     * var app = angular.module('app', ['ui.router.router']);
	     *
	     * app.config(function ($urlRouterProvider) {
	     *   // Here's an example of how you might allow case insensitive urls
	     *   $urlRouterProvider.rule(function ($injector, $location) {
	     *     var path = $location.path(),
	     *         normalized = path.toLowerCase();
	     *
	     *     if (path !== normalized) {
	     *       return normalized;
	     *     }
	     *   });
	     * });
	     * ```
	     *
	     * @param rule
	     * Handler function that takes `$injector` and `$location` services as arguments.
	     * You can use them to detect a url and return a different url as a string.
	     *
	     * @return [[$urlRouterProvider]] (`this`)
	     */
	    UrlRouterProvider.prototype.rule = function (rule) {
	        if (!predicates_1.isFunction(rule))
	            throw new Error("'rule' must be a function");
	        this.rules.push(rule);
	        return this;
	    };
	    ;
	    /**
	     * Remove a rule previously registered
	     *
	     * @param rule the matcher rule that was previously registered using [[rule]]
	     * @return true if the rule was found (and removed)
	     */
	    UrlRouterProvider.prototype.removeRule = function (rule) {
	        return this.rules.length !== common_1.removeFrom(this.rules, rule).length;
	    };
	    /**
	     * Defines the path or behavior to use when no url can be matched.
	     *
	     * @example
	     * ```js
	     *
	     * var app = angular.module('app', ['ui.router.router']);
	     *
	     * app.config(function ($urlRouterProvider) {
	     *   // if the path doesn't match any of the urls you configured
	     *   // otherwise will take care of routing the user to the
	     *   // specified url
	     *   $urlRouterProvider.otherwise('/index');
	     *
	     *   // Example of using function rule as param
	     *   $urlRouterProvider.otherwise(function ($injector, $location) {
	     *     return '/a/valid/url';
	     *   });
	     * });
	     * ```
	     *
	     * @param rule
	     * The url path you want to redirect to or a function rule that returns the url path or performs a `$state.go()`.
	     * The function version is passed two params: `$injector` and `$location` services, and should return a url string.
	     *
	     * @return {object} `$urlRouterProvider` - `$urlRouterProvider` instance
	     */
	    UrlRouterProvider.prototype.otherwise = function (rule) {
	        if (!predicates_1.isFunction(rule) && !predicates_1.isString(rule))
	            throw new Error("'rule' must be a string or function");
	        this.otherwiseFn = predicates_1.isString(rule) ? function () { return rule; } : rule;
	        return this;
	    };
	    ;
	    /**
	     * Registers a handler for a given url matching.
	     *
	     * If the handler is a string, it is
	     * treated as a redirect, and is interpolated according to the syntax of match
	     * (i.e. like `String.replace()` for `RegExp`, or like a `UrlMatcher` pattern otherwise).
	     *
	     * If the handler is a function, it is injectable.
	     * It gets invoked if `$location` matches.
	     * You have the option of inject the match object as `$match`.
	     *
	     * The handler can return
	     *
	     * - **falsy** to indicate that the rule didn't match after all, then `$urlRouter`
	     *   will continue trying to find another one that matches.
	     * - **string** which is treated as a redirect and passed to `$location.url()`
	     * - **void** or any **truthy** value tells `$urlRouter` that the url was handled.
	     *
	     * @example
	     * ```js
	     *
	     * var app = angular.module('app', ['ui.router.router']);
	     *
	     * app.config(function ($urlRouterProvider) {
	     *   $urlRouterProvider.when($state.url, function ($match, $stateParams) {
	     *     if ($state.$current.navigable !== state ||
	     *         !equalForKeys($match, $stateParams) {
	     *      $state.transitionTo(state, $match, false);
	     *     }
	     *   });
	     * });
	     * ```
	     *
	     * @param what A pattern string to match, compiled as a [[UrlMatcher]].
	     * @param handler The path (or function that returns a path) that you want to redirect your user to.
	     * @param ruleCallback [optional] A callback that receives the `rule` registered with [[UrlMatcher.rule]]
	     *
	     * Note: the handler may also invoke arbitrary code, such as `$state.go()`
	     */
	    UrlRouterProvider.prototype.when = function (what, handler, ruleCallback) {
	        if (ruleCallback === void 0) { ruleCallback = function (rule) { }; }
	        var _a = this, $urlMatcherFactory = _a.$urlMatcherFactory, $stateParams = _a.$stateParams;
	        var redirect, handlerIsString = predicates_1.isString(handler);
	        // @todo Queue this
	        if (predicates_1.isString(what))
	            what = $urlMatcherFactory.compile(what);
	        if (!handlerIsString && !predicates_1.isFunction(handler) && !predicates_1.isArray(handler))
	            throw new Error("invalid 'handler' in when()");
	        var strategies = {
	            matcher: function (_what, _handler) {
	                if (handlerIsString) {
	                    redirect = $urlMatcherFactory.compile(_handler);
	                    _handler = ['$match', redirect.format.bind(redirect)];
	                }
	                return common_1.extend(function () {
	                    return handleIfMatch(coreservices_1.services.$injector, $stateParams, _handler, _what.exec($location.path(), $location.search(), $location.hash()));
	                }, {
	                    prefix: predicates_1.isString(_what.prefix) ? _what.prefix : ''
	                });
	            },
	            regex: function (_what, _handler) {
	                if (_what.global || _what.sticky)
	                    throw new Error("when() RegExp must not be global or sticky");
	                if (handlerIsString) {
	                    redirect = _handler;
	                    _handler = ['$match', function ($match) { return interpolate(redirect, $match); }];
	                }
	                return common_1.extend(function () {
	                    return handleIfMatch(coreservices_1.services.$injector, $stateParams, _handler, _what.exec($location.path()));
	                }, {
	                    prefix: regExpPrefix(_what)
	                });
	            }
	        };
	        var check = {
	            matcher: $urlMatcherFactory.isMatcher(what),
	            regex: what instanceof RegExp
	        };
	        for (var n in check) {
	            if (check[n]) {
	                var rule = strategies[n](what, handler);
	                ruleCallback(rule);
	                return this.rule(rule);
	            }
	        }
	        throw new Error("invalid 'what' in when()");
	    };
	    ;
	    /**
	     * Disables monitoring of the URL.
	     *
	     * Call this method before UI-Router has bootstrapped.
	     * It will stop UI-Router from performing the initial url sync.
	     *
	     * This can be useful to perform some asynchronous initialization before the router starts.
	     * Once the initialization is complete, call [[listen]] to tell UI-Router to start watching and synchronizing the URL.
	     *
	     * @example
	     * ```js
	     *
	     * var app = angular.module('app', ['ui.router']);
	     *
	     * app.config(function ($urlRouterProvider) {
	     *   // Prevent $urlRouter from automatically intercepting URL changes;
	     *   $urlRouterProvider.deferIntercept();
	     * })
	     *
	     * app.run(function (MyService, $urlRouter, $http) {
	     *   $http.get("/stuff").then(function(resp) {
	     *     MyService.doStuff(resp.data);
	     *     $urlRouter.listen();
	     *     $urlRouter.sync();
	     *   });
	     * });
	     * ```
	     *
	     * @param defer Indicates whether to defer location change interception. Passing
	     *        no parameter is equivalent to `true`.
	     */
	    UrlRouterProvider.prototype.deferIntercept = function (defer) {
	        if (defer === undefined)
	            defer = true;
	        this.interceptDeferred = defer;
	    };
	    ;
	    return UrlRouterProvider;
	}());
	exports.UrlRouterProvider = UrlRouterProvider;
	var UrlRouter = (function () {
	    /** @hidden */
	    function UrlRouter(urlRouterProvider) {
	        this.urlRouterProvider = urlRouterProvider;
	        common_1.bindFunctions(UrlRouter.prototype, this, this);
	    }
	    /**
	     * Checks the current URL for a matching rule
	     *
	     * Triggers an update; the same update that happens when the address bar url changes, aka `$locationChangeSuccess`.
	     * This method is useful when you need to use `preventDefault()` on the `$locationChangeSuccess` event,
	     * perform some custom logic (route protection, auth, config, redirection, etc) and then finally proceed
	     * with the transition by calling `$urlRouter.sync()`.
	     *
	     * @example
	     * ```js
	     *
	     * angular.module('app', ['ui.router'])
	     *   .run(function($rootScope, $urlRouter) {
	     *     $rootScope.$on('$locationChangeSuccess', function(evt) {
	     *       // Halt state change from even starting
	     *       evt.preventDefault();
	     *       // Perform custom logic
	     *       var meetsRequirement = ...
	     *       // Continue with the update and state transition if logic allows
	     *       if (meetsRequirement) $urlRouter.sync();
	     *     });
	     * });
	     * ```
	     */
	    UrlRouter.prototype.sync = function () {
	        update(this.urlRouterProvider.rules, this.urlRouterProvider.otherwiseFn);
	    };
	    /**
	     * Starts listening for URL changes
	     *
	     * Call this sometime after calling [[deferIntercept]] to start monitoring the url.
	     * This causes [[UrlRouter]] to start listening for changes to the URL, if it wasn't already listening.
	     */
	    UrlRouter.prototype.listen = function () {
	        var _this = this;
	        return this.listener = this.listener || $location.onChange(function (evt) { return update(_this.urlRouterProvider.rules, _this.urlRouterProvider.otherwiseFn, evt); });
	    };
	    /**
	     * Internal API.
	     */
	    UrlRouter.prototype.update = function (read) {
	        if (read) {
	            this.location = $location.path();
	            return;
	        }
	        if ($location.path() === this.location)
	            return;
	        $location.setUrl(this.location, true);
	    };
	    /**
	     * Internal API.
	     *
	     * Pushes a new location to the browser history.
	     *
	     * @param urlMatcher
	     * @param params
	     * @param options
	     */
	    UrlRouter.prototype.push = function (urlMatcher, params, options) {
	        var replace = options && !!options.replace;
	        $location.setUrl(urlMatcher.format(params || {}), replace);
	    };
	    /**
	     * Builds and returns a URL with interpolated parameters
	     *
	     * @example
	     * ```js
	     *
	     * $bob = $urlRouter.href(new UrlMatcher("/about/:person"), {
	     *   person: "bob"
	     * });
	     * // $bob == "/about/bob";
	     * ```
	     *
	     * @param urlMatcher The [[UrlMatcher]] object which is used as the template of the URL to generate.
	     * @param params An object of parameter values to fill the matcher's required parameters.
	     * @param options Options object. The options are:
	     *
	     * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
	     *
	     * @returns Returns the fully compiled URL, or `null` if `params` fail validation against `urlMatcher`
	     */
	    UrlRouter.prototype.href = function (urlMatcher, params, options) {
	        if (!urlMatcher.validates(params))
	            return null;
	        var url = urlMatcher.format(params);
	        options = options || { absolute: false };
	        var cfg = coreservices_1.services.locationConfig;
	        var isHtml5 = cfg.html5Mode();
	        if (!isHtml5 && url !== null) {
	            url = "#" + cfg.hashPrefix() + url;
	        }
	        url = appendBasePath(url, isHtml5, options.absolute);
	        if (!options.absolute || !url) {
	            return url;
	        }
	        var slash = (!isHtml5 && url ? '/' : ''), port = cfg.port();
	        port = (port === 80 || port === 443 ? '' : ':' + port);
	        return [cfg.protocol(), '://', cfg.host(), port, slash, url].join('');
	    };
	    return UrlRouter;
	}());
	exports.UrlRouter = UrlRouter;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module state */ /** for typedoc */
	var predicates_1 = __webpack_require__(4);
	var common_1 = __webpack_require__(3);
	/**
	 * @ngdoc object
	 * @name ui.router.state.$stateProvider
	 *
	 * @requires ui.router.router.$urlRouterProvider
	 * @requires ui.router.util.$urlMatcherFactoryProvider
	 *
	 * @description
	 * The new `$stateProvider` works similar to Angular's v1 router, but it focuses purely
	 * on state.
	 *
	 * A state corresponds to a "place" in the application in terms of the overall UI and
	 * navigation. A state describes (via the controller / template / view properties) what
	 * the UI looks like and does at that place.
	 *
	 * States often have things in common, and the primary way of factoring out these
	 * commonalities in this model is via the state hierarchy, i.e. parent/child states aka
	 * nested states.
	 *
	 * The `$stateProvider` provides interfaces to declare these states for your app.
	 */
	var StateProvider = (function () {
	    function StateProvider(stateRegistry) {
	        this.stateRegistry = stateRegistry;
	        this.invalidCallbacks = [];
	        common_1.bindFunctions(StateProvider.prototype, this, this);
	    }
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$stateProvider#decorator
	     * @methodOf ui.router.state.$stateProvider
	     *
	     * @description
	     * Allows you to extend (carefully) or override (at your own peril) the
	     * `stateBuilder` object used internally by `$stateProvider`. This can be used
	     * to add custom functionality to ui-router, for example inferring templateUrl
	     * based on the state name.
	     *
	     * When passing only a name, it returns the current (original or decorated) builder
	     * function that matches `name`.
	     *
	     * The builder functions that can be decorated are listed below. Though not all
	     * necessarily have a good use case for decoration, that is up to you to decide.
	     *
	     * In addition, users can attach custom decorators, which will generate new
	     * properties within the state's internal definition. There is currently no clear
	     * use-case for this beyond accessing internal states (i.e. $state.$current),
	     * however, expect this to become increasingly relevant as we introduce additional
	     * meta-programming features.
	     *
	     * **Warning**: Decorators should not be interdependent because the order of
	     * execution of the builder functions in non-deterministic. Builder functions
	     * should only be dependent on the state definition object and super function.
	     *
	     *
	     * Existing builder functions and current return values:
	     *
	     * - **parent** `{object}` - returns the parent state object.
	     * - **data** `{object}` - returns state data, including any inherited data that is not
	     *   overridden by own values (if any).
	     * - **url** `{object}` - returns a {@link ui.router.util.type:UrlMatcher UrlMatcher}
	     *   or `null`.
	     * - **navigable** `{object}` - returns closest ancestor state that has a URL (aka is
	     *   navigable).
	     * - **params** `{object}` - returns an array of state params that are ensured to
	     *   be a super-set of parent's params.
	     * - **views** `{object}` - returns a views object where each key is an absolute view
	     *   name (i.e. "viewName@stateName") and each value is the config object
	     *   (template, controller) for the view. Even when you don't use the views object
	     *   explicitly on a state config, one is still created for you internally.
	     *   So by decorating this builder function you have access to decorating template
	     *   and controller properties.
	     * - **ownParams** `{object}` - returns an array of params that belong to the state,
	     *   not including any params defined by ancestor states.
	     * - **path** `{string}` - returns the full path from the root down to this state.
	     *   Needed for state activation.
	     * - **includes** `{object}` - returns an object that includes every state that
	     *   would pass a `$state.includes()` test.
	     *
	     * @example
	     * <pre>
	     * // Override the internal 'views' builder with a function that takes the state
	     * // definition, and a reference to the internal function being overridden:
	     * $stateProvider.decorator('views', function (state, parent) {
	     *   let result = {},
	     *       views = parent(state);
	     *
	     *   angular.forEach(views, function (config, name) {
	     *     let autoName = (state.name + '.' + name).replace('.', '/');
	     *     config.templateUrl = config.templateUrl || '/partials/' + autoName + '.html';
	     *     result[name] = config;
	     *   });
	     *   return result;
	     * });
	     *
	     * $stateProvider.state('home', {
	     *   views: {
	     *     'contact.list': { controller: 'ListController' },
	     *     'contact.item': { controller: 'ItemController' }
	     *   }
	     * });
	     *
	     * // ...
	     *
	     * $state.go('home');
	     * // Auto-populates list and item views with /partials/home/contact/list.html,
	     * // and /partials/home/contact/item.html, respectively.
	     * </pre>
	     *
	     * @param {string} name The name of the builder function to decorate.
	     * @param {object} func A function that is responsible for decorating the original
	     * builder function. The function receives two parameters:
	     *
	     *   - `{object}` - state - The state config object.
	     *   - `{object}` - super - The original builder function.
	     *
	     * @return {object} $stateProvider - $stateProvider instance
	     */
	    StateProvider.prototype.decorator = function (name, func) {
	        return this.stateRegistry.decorator(name, func) || this;
	    };
	    StateProvider.prototype.state = function (name, definition) {
	        if (predicates_1.isObject(name)) {
	            definition = name;
	        }
	        else {
	            definition.name = name;
	        }
	        this.stateRegistry.register(definition);
	        return this;
	    };
	    /**
	     * Registers an invalid state handler
	     *
	     * Registers a function to be injected and invoked when [[StateService.transitionTo]] has been called with an invalid
	     * state reference parameter
	     *
	     * This function can be injected with one some special values:
	     * - **`$to$`**: TargetState
	     * - **`$from$`**: TargetState
	     *
	     * Note: This API is subject to change.
	     * Replacement of dependency injection support with some alternative is likely.
	     *
	     * @param {function} callback
	     *   The function which will be injected and invoked, when a matching transition is started.
	     *   The function may optionally return a {TargetState} or a Promise for a TargetState.  If one
	     *   is returned, it is treated as a redirect.
	     */
	    StateProvider.prototype.onInvalid = function (callback) {
	        this.invalidCallbacks.push(callback);
	    };
	    return StateProvider;
	}());
	exports.StateProvider = StateProvider;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var transition_1 = __webpack_require__(11);
	var hookRegistry_1 = __webpack_require__(15);
	var resolve_1 = __webpack_require__(32);
	var views_1 = __webpack_require__(33);
	var url_1 = __webpack_require__(34);
	var redirectTo_1 = __webpack_require__(35);
	var onEnterExitRetain_1 = __webpack_require__(36);
	var lazyLoadStates_1 = __webpack_require__(37);
	/**
	 * The default [[Transition]] options.
	 *
	 * Include this object when applying custom defaults:
	 * let reloadOpts = { reload: true, notify: true }
	 * let options = defaults(theirOpts, customDefaults, defaultOptions);
	 */
	exports.defaultTransOpts = {
	    location: true,
	    relative: null,
	    inherit: false,
	    notify: true,
	    reload: false,
	    custom: {},
	    current: function () { return null; },
	    source: "unknown"
	};
	/**
	 * This class provides services related to Transitions.
	 *
	 * - Most importantly, it allows global Transition Hooks to be registered.
	 * - It allows the default transition error handler to be set.
	 * - It also has a factory function for creating new [[Transition]] objects, (used internally by the [[StateService]]).
	 *
	 * At bootstrap, [[UIRouter]] creates a single instance (singleton) of this class.
	 */
	var TransitionService = (function () {
	    function TransitionService(_router) {
	        this._router = _router;
	        this.$view = _router.viewService;
	        hookRegistry_1.HookRegistry.mixin(new hookRegistry_1.HookRegistry(), this);
	        this._deregisterHookFns = {};
	        this.registerTransitionHooks();
	    }
	    /** @hidden */
	    TransitionService.prototype.registerTransitionHooks = function () {
	        var fns = this._deregisterHookFns;
	        // Wire up redirectTo hook
	        fns.redirectTo = redirectTo_1.registerRedirectToHook(this);
	        // Wire up onExit/Retain/Enter state hooks
	        fns.onExit = onEnterExitRetain_1.registerOnExitHook(this);
	        fns.onRetain = onEnterExitRetain_1.registerOnRetainHook(this);
	        fns.onEnter = onEnterExitRetain_1.registerOnEnterHook(this);
	        // Wire up Resolve hooks
	        fns.eagerResolve = resolve_1.registerEagerResolvePath(this);
	        fns.lazyResolve = resolve_1.registerLazyResolveState(this);
	        // Wire up the View management hooks
	        fns.loadViews = views_1.registerLoadEnteringViews(this);
	        fns.activateViews = views_1.registerActivateViews(this);
	        // After globals.current is updated at priority: 10000
	        fns.updateUrl = url_1.registerUpdateUrl(this);
	        // Lazy load state trees
	        fns.lazyLoad = lazyLoadStates_1.registerLazyLoadHook(this);
	    };
	    /** @inheritdoc */
	    TransitionService.prototype.onBefore = function (matchCriteria, callback, options) { throw ""; };
	    ;
	    /** @inheritdoc */
	    TransitionService.prototype.onStart = function (matchCriteria, callback, options) { throw ""; };
	    ;
	    /** @inheritdoc */
	    TransitionService.prototype.onExit = function (matchCriteria, callback, options) { throw ""; };
	    ;
	    /** @inheritdoc */
	    TransitionService.prototype.onRetain = function (matchCriteria, callback, options) { throw ""; };
	    ;
	    /** @inheritdoc */
	    TransitionService.prototype.onEnter = function (matchCriteria, callback, options) { throw ""; };
	    ;
	    /** @inheritdoc */
	    TransitionService.prototype.onFinish = function (matchCriteria, callback, options) { throw ""; };
	    ;
	    /** @inheritdoc */
	    TransitionService.prototype.onSuccess = function (matchCriteria, callback, options) { throw ""; };
	    ;
	    /** @inheritdoc */
	    TransitionService.prototype.onError = function (matchCriteria, callback, options) { throw ""; };
	    ;
	    /**
	     * Creates a new [[Transition]] object
	     *
	     * This is a factory function for creating new Transition objects.
	     * It is used internally by the [[StateService]] and should generally not be called by application code.
	     *
	     * @param fromPath the path to the current state (the from state)
	     * @param targetState the target state (destination)
	     * @returns a Transition
	     */
	    TransitionService.prototype.create = function (fromPath, targetState) {
	        return new transition_1.Transition(fromPath, targetState, this._router);
	    };
	    return TransitionService;
	}());
	exports.TransitionService = TransitionService;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module hooks */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var resolveContext_1 = __webpack_require__(17);
	var hof_1 = __webpack_require__(5);
	/**
	 * A [[TransitionHookFn]] which resolves all EAGER Resolvables in the To Path
	 *
	 * Registered using `transitionService.onStart({}, eagerResolvePath);`
	 *
	 * When a Transition starts, this hook resolves all the EAGER Resolvables, which the transition then waits for.
	 *
	 * See [[StateDeclaration.resolve]]
	 */
	var eagerResolvePath = function (trans) {
	    return new resolveContext_1.ResolveContext(trans.treeChanges().to)
	        .resolvePath("EAGER", trans)
	        .then(common_1.noop);
	};
	exports.registerEagerResolvePath = function (transitionService) {
	    return transitionService.onStart({}, eagerResolvePath, { priority: 1000 });
	};
	/**
	 * A [[TransitionHookFn]] which resolves all LAZY Resolvables for the state (and all its ancestors) in the To Path
	 *
	 * Registered using `transitionService.onEnter({ entering: () => true }, lazyResolveState);`
	 *
	 * When a State is being entered, this hook resolves all the Resolvables for this state, which the transition then waits for.
	 *
	 * See [[StateDeclaration.resolve]]
	 */
	var lazyResolveState = function (trans, state) {
	    return new resolveContext_1.ResolveContext(trans.treeChanges().to)
	        .subContext(state)
	        .resolvePath("LAZY", trans)
	        .then(common_1.noop);
	};
	exports.registerLazyResolveState = function (transitionService) {
	    return transitionService.onEnter({ entering: hof_1.val(true) }, lazyResolveState, { priority: 1000 });
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module hooks */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var coreservices_1 = __webpack_require__(6);
	/**
	 * A [[TransitionHookFn]] which waits for the views to load
	 *
	 * Registered using `transitionService.onStart({}, loadEnteringViews);`
	 *
	 * Allows the views to do async work in [[ViewConfig.load]] before the transition continues.
	 * In angular 1, this includes loading the templates.
	 */
	var loadEnteringViews = function (transition) {
	    var enteringViews = transition.views("entering");
	    if (!enteringViews.length)
	        return;
	    return coreservices_1.services.$q.all(enteringViews.map(function (view) { return view.load(); })).then(common_1.noop);
	};
	exports.registerLoadEnteringViews = function (transitionService) {
	    return transitionService.onStart({}, loadEnteringViews);
	};
	/**
	 * A [[TransitionHookFn]] which activates the new views when a transition is successful.
	 *
	 * Registered using `transitionService.onSuccess({}, activateViews);`
	 *
	 * After a transition is complete, this hook deactivates the old views from the previous state,
	 * and activates the new views from the destination state.
	 *
	 * See [[ViewService]]
	 */
	var activateViews = function (transition) {
	    var enteringViews = transition.views("entering");
	    var exitingViews = transition.views("exiting");
	    if (!enteringViews.length && !exitingViews.length)
	        return;
	    var $view = transition.router.viewService;
	    exitingViews.forEach(function (vc) { return $view.deactivateViewConfig(vc); });
	    enteringViews.forEach(function (vc) { return $view.activateViewConfig(vc); });
	    $view.sync();
	};
	exports.registerActivateViews = function (transitionService) {
	    return transitionService.onSuccess({}, activateViews);
	};


/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * A [[TransitionHookFn]] which updates the URL after a successful transition
	 *
	 * Registered using `transitionService.onSuccess({}, updateUrl);`
	 */
	var updateUrl = function (transition) {
	    var options = transition.options();
	    var $state = transition.router.stateService;
	    var $urlRouter = transition.router.urlRouter;
	    // Dont update the url in these situations:
	    // The transition was triggered by a URL sync (options.source === 'url')
	    // The user doesn't want the url to update (options.location === false)
	    // The destination state, and all parents have no navigable url
	    if (options.source !== 'url' && options.location && $state.$current.navigable) {
	        var urlOptions = { replace: options.location === 'replace' };
	        $urlRouter.push($state.$current.navigable.url, $state.params, urlOptions);
	    }
	    $urlRouter.update(true);
	};
	exports.registerUpdateUrl = function (transitionService) {
	    return transitionService.onSuccess({}, updateUrl, { priority: 9999 });
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module hooks */ /** */
	var predicates_1 = __webpack_require__(4);
	var coreservices_1 = __webpack_require__(6);
	var targetState_1 = __webpack_require__(14);
	/**
	 * A [[TransitionHookFn]] that redirects to a different state or params
	 *
	 * Registered using `transitionService.onStart({ to: (state) => !!state.redirectTo }, redirectHook);`
	 *
	 * See [[StateDeclaration.redirectTo]]
	 */
	var redirectToHook = function (trans) {
	    var redirect = trans.to().redirectTo;
	    if (!redirect)
	        return;
	    function handleResult(result) {
	        var $state = trans.router.stateService;
	        if (result instanceof targetState_1.TargetState)
	            return result;
	        if (predicates_1.isString(result))
	            return $state.target(result, trans.params(), trans.options());
	        if (result['state'] || result['params'])
	            return $state.target(result['state'] || trans.to(), result['params'] || trans.params(), trans.options());
	    }
	    if (predicates_1.isFunction(redirect)) {
	        return coreservices_1.services.$q.when(redirect(trans)).then(handleResult);
	    }
	    return handleResult(redirect);
	};
	exports.registerRedirectToHook = function (transitionService) {
	    return transitionService.onStart({ to: function (state) { return !!state.redirectTo; } }, redirectToHook);
	};


/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * A factory which creates an onEnter, onExit or onRetain transition hook function
	 *
	 * The returned function invokes the (for instance) state.onEnter hook when the
	 * state is being entered.
	 *
	 * @hidden
	 */
	function makeEnterExitRetainHook(hookName) {
	    return function (transition, state) {
	        var hookFn = state[hookName];
	        return hookFn(transition, state);
	    };
	}
	/**
	 * The [[TransitionStateHookFn]] for onExit
	 *
	 * When the state is being exited, the state's .onExit function is invoked.
	 *
	 * Registered using `transitionService.onExit({ exiting: (state) => !!state.onExit }, onExitHook);`
	 *
	 * See: [[IHookRegistry.onExit]]
	 */
	var onExitHook = makeEnterExitRetainHook('onExit');
	exports.registerOnExitHook = function (transitionService) {
	    return transitionService.onExit({ exiting: function (state) { return !!state.onExit; } }, onExitHook);
	};
	/**
	 * The [[TransitionStateHookFn]] for onRetain
	 *
	 * When the state was already entered, and is not being exited or re-entered, the state's .onRetain function is invoked.
	 *
	 * Registered using `transitionService.onRetain({ retained: (state) => !!state.onRetain }, onRetainHook);`
	 *
	 * See: [[IHookRegistry.onRetain]]
	 */
	var onRetainHook = makeEnterExitRetainHook('onRetain');
	exports.registerOnRetainHook = function (transitionService) {
	    return transitionService.onRetain({ retained: function (state) { return !!state.onRetain; } }, onRetainHook);
	};
	/**
	 * The [[TransitionStateHookFn]] for onEnter
	 *
	 * When the state is being entered, the state's .onEnter function is invoked.
	 *
	 * Registered using `transitionService.onEnter({ entering: (state) => !!state.onEnter }, onEnterHook);`
	 *
	 * See: [[IHookRegistry.onEnter]]
	 */
	var onEnterHook = makeEnterExitRetainHook('onEnter');
	exports.registerOnEnterHook = function (transitionService) {
	    return transitionService.onEnter({ entering: function (state) { return !!state.onEnter; } }, onEnterHook);
	};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var coreservices_1 = __webpack_require__(6);
	/**
	 * A [[TransitionHookFn]] that lazy loads a state tree.
	 *
	 * When transitioning to a state "abc" which has a `lazyLoad` function defined:
	 * - Invoke the `lazyLoad` function
	 *   - The function should return a promise for an array of lazy loaded [[StateDeclaration]]s
	 * - Wait for the promise to resolve
	 * - Deregister the original state "abc"
	 *   - The original state definition is a placeholder for the lazy loaded states
	 * - Register the new states
	 * - Retry the transition
	 *
	 * See [[StateDeclaration.lazyLoad]]
	 */
	var lazyLoadHook = function (transition) {
	    var toState = transition.to();
	    var registry = transition.router.stateRegistry;
	    function retryOriginalTransition() {
	        if (transition.options().source === 'url') {
	            var loc = coreservices_1.services.location, path_1 = loc.path(), search_1 = loc.search(), hash_1 = loc.hash();
	            var matchState = function (state) { return [state, state.url && state.url.exec(path_1, search_1, hash_1)]; };
	            var matches = registry.get().map(function (s) { return s.$$state(); }).map(matchState).filter(function (_a) {
	                var state = _a[0], params = _a[1];
	                return !!params;
	            });
	            if (matches.length) {
	                var _a = matches[0], state = _a[0], params = _a[1];
	                return transition.router.stateService.target(state, params, transition.options());
	            }
	            transition.router.urlRouter.sync();
	        }
	        // The original transition was not triggered via url sync
	        // The lazy state should be loaded now, so re-try the original transition
	        var orig = transition.targetState();
	        return transition.router.stateService.target(orig.identifier(), orig.params(), orig.options());
	    }
	    /**
	     * Replace the placeholder state with the newly loaded states from the NgModule.
	     */
	    function updateStateRegistry(result) {
	        // deregister placeholder state
	        registry.deregister(transition.$to());
	        if (result && Array.isArray(result.states)) {
	            result.states.forEach(function (state) { return registry.register(state); });
	        }
	    }
	    var hook = toState.lazyLoad;
	    // Store/get the lazy load promise on/from the hookfn so it doesn't get re-invoked
	    var promise = hook['_promise'];
	    if (!promise) {
	        promise = hook['_promise'] = hook(transition).then(updateStateRegistry);
	        var cleanup = function () { return delete hook['_promise']; };
	        promise.catch(cleanup, cleanup);
	    }
	    return promise.then(retryOriginalTransition);
	};
	exports.registerLazyLoadHook = function (transitionService) {
	    return transitionService.onBefore({ to: function (state) { return !!state.lazyLoad; } }, lazyLoadHook);
	};


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module view */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var hof_1 = __webpack_require__(5);
	var predicates_1 = __webpack_require__(4);
	var trace_1 = __webpack_require__(12);
	/**
	 * The View service
	 */
	var ViewService = (function () {
	    function ViewService() {
	        var _this = this;
	        this.uiViews = [];
	        this.viewConfigs = [];
	        this._viewConfigFactories = {};
	        this.sync = function () {
	            var uiViewsByFqn = _this.uiViews.map(function (uiv) { return [uiv.fqn, uiv]; }).reduce(common_1.applyPairs, {});
	            /**
	             * Given a ui-view and a ViewConfig, determines if they "match".
	             *
	             * A ui-view has a fully qualified name (fqn) and a context object.  The fqn is built from its overall location in
	             * the DOM, describing its nesting relationship to any parent ui-view tags it is nested inside of.
	             *
	             * A ViewConfig has a target ui-view name and a context anchor.  The ui-view name can be a simple name, or
	             * can be a segmented ui-view path, describing a portion of a ui-view fqn.
	             *
	             * In order for a ui-view to match ViewConfig, ui-view's $type must match the ViewConfig's $type
	             *
	             * If the ViewConfig's target ui-view name is a simple name (no dots), then a ui-view matches if:
	             * - the ui-view's name matches the ViewConfig's target name
	             * - the ui-view's context matches the ViewConfig's anchor
	             *
	             * If the ViewConfig's target ui-view name is a segmented name (with dots), then a ui-view matches if:
	             * - There exists a parent ui-view where:
	             *    - the parent ui-view's name matches the first segment (index 0) of the ViewConfig's target name
	             *    - the parent ui-view's context matches the ViewConfig's anchor
	             * - And the remaining segments (index 1..n) of the ViewConfig's target name match the tail of the ui-view's fqn
	             *
	             * Example:
	             *
	             * DOM:
	             * <div ui-view>                        <!-- created in the root context (name: "") -->
	             *   <div ui-view="foo">                <!-- created in the context named: "A"      -->
	             *     <div ui-view>                    <!-- created in the context named: "A.B"    -->
	             *       <div ui-view="bar">            <!-- created in the context named: "A.B.C"  -->
	             *       </div>
	             *     </div>
	             *   </div>
	             * </div>
	             *
	             * uiViews: [
	             *  { fqn: "$default",                  creationContext: { name: "" } },
	             *  { fqn: "$default.foo",              creationContext: { name: "A" } },
	             *  { fqn: "$default.foo.$default",     creationContext: { name: "A.B" } }
	             *  { fqn: "$default.foo.$default.bar", creationContext: { name: "A.B.C" } }
	             * ]
	             *
	             * These four view configs all match the ui-view with the fqn: "$default.foo.$default.bar":
	             *
	             * - ViewConfig1: { uiViewName: "bar",                       uiViewContextAnchor: "A.B.C" }
	             * - ViewConfig2: { uiViewName: "$default.bar",              uiViewContextAnchor: "A.B" }
	             * - ViewConfig3: { uiViewName: "foo.$default.bar",          uiViewContextAnchor: "A" }
	             * - ViewConfig4: { uiViewName: "$default.foo.$default.bar", uiViewContextAnchor: "" }
	             *
	             * Using ViewConfig3 as an example, it matches the ui-view with fqn "$default.foo.$default.bar" because:
	             * - The ViewConfig's segmented target name is: [ "foo", "$default", "bar" ]
	             * - There exists a parent ui-view (which has fqn: "$default.foo") where:
	             *    - the parent ui-view's name "foo" matches the first segment "foo" of the ViewConfig's target name
	             *    - the parent ui-view's context "A" matches the ViewConfig's anchor context "A"
	             * - And the remaining segments [ "$default", "bar" ].join("."_ of the ViewConfig's target name match
	             *   the tail of the ui-view's fqn "default.bar"
	             */
	            var matches = function (uiView) { return function (viewConfig) {
	                // Don't supply an ng1 ui-view with an ng2 ViewConfig, etc
	                if (uiView.$type !== viewConfig.viewDecl.$type)
	                    return false;
	                // Split names apart from both viewConfig and uiView into segments
	                var vc = viewConfig.viewDecl;
	                var vcSegments = vc.$uiViewName.split(".");
	                var uivSegments = uiView.fqn.split(".");
	                // Check if the tails of the segment arrays match. ex, these arrays' tails match:
	                // vc: ["foo", "bar"], uiv fqn: ["$default", "foo", "bar"]
	                if (!common_1.equals(vcSegments, uivSegments.slice(0 - vcSegments.length)))
	                    return false;
	                // Now check if the fqn ending at the first segment of the viewConfig matches the context:
	                // ["$default", "foo"].join(".") == "$default.foo", does the ui-view $default.foo context match?
	                var negOffset = (1 - vcSegments.length) || undefined;
	                var fqnToFirstSegment = uivSegments.slice(0, negOffset).join(".");
	                var uiViewContext = uiViewsByFqn[fqnToFirstSegment].creationContext;
	                return vc.$uiViewContextAnchor === (uiViewContext && uiViewContext.name);
	            }; };
	            // Return the number of dots in the fully qualified name
	            function uiViewDepth(uiView) {
	                return uiView.fqn.split(".").length;
	            }
	            // Return the ViewConfig's context's depth in the context tree.
	            function viewConfigDepth(config) {
	                var context = config.viewDecl.$context, count = 0;
	                while (++count && context.parent)
	                    context = context.parent;
	                return count;
	            }
	            // Given a depth function, returns a compare function which can return either ascending or descending order
	            var depthCompare = hof_1.curry(function (depthFn, posNeg, left, right) { return posNeg * (depthFn(left) - depthFn(right)); });
	            var matchingConfigPair = function (uiView) {
	                var matchingConfigs = _this.viewConfigs.filter(matches(uiView));
	                if (matchingConfigs.length > 1)
	                    matchingConfigs.sort(depthCompare(viewConfigDepth, -1)); // descending
	                return [uiView, matchingConfigs[0]];
	            };
	            var configureUIView = function (_a) {
	                var uiView = _a[0], viewConfig = _a[1];
	                // If a parent ui-view is reconfigured, it could destroy child ui-views.
	                // Before configuring a child ui-view, make sure it's still in the active uiViews array.
	                if (_this.uiViews.indexOf(uiView) !== -1)
	                    uiView.configUpdated(viewConfig);
	            };
	            _this.uiViews.sort(depthCompare(uiViewDepth, 1)).map(matchingConfigPair).forEach(configureUIView);
	        };
	    }
	    ViewService.prototype.rootContext = function (context) {
	        return this._rootContext = context || this._rootContext;
	    };
	    ;
	    ViewService.prototype.viewConfigFactory = function (viewType, factory) {
	        this._viewConfigFactories[viewType] = factory;
	    };
	    ViewService.prototype.createViewConfig = function (path, decl) {
	        var cfgFactory = this._viewConfigFactories[decl.$type];
	        if (!cfgFactory)
	            throw new Error("ViewService: No view config factory registered for type " + decl.$type);
	        var cfgs = cfgFactory(path, decl);
	        return predicates_1.isArray(cfgs) ? cfgs : [cfgs];
	    };
	    /**
	     * De-registers a ViewConfig.
	     *
	     * @param viewConfig The ViewConfig view to deregister.
	     */
	    ViewService.prototype.deactivateViewConfig = function (viewConfig) {
	        trace_1.trace.traceViewServiceEvent("<- Removing", viewConfig);
	        common_1.removeFrom(this.viewConfigs, viewConfig);
	    };
	    ;
	    ViewService.prototype.activateViewConfig = function (viewConfig) {
	        trace_1.trace.traceViewServiceEvent("-> Registering", viewConfig);
	        this.viewConfigs.push(viewConfig);
	    };
	    ;
	    /**
	     * Allows a `ui-view` element to register its canonical name with a callback that allows it to
	     * be updated with a template, controller, and local variables.
	     *
	     * @param {String} name The fully-qualified name of the `ui-view` object being registered.
	     * @param {Function} configUpdatedCallback A callback that receives updates to the content & configuration
	     *                   of the view.
	     * @return {Function} Returns a de-registration function used when the view is destroyed.
	     */
	    ViewService.prototype.registerUIView = function (uiView) {
	        trace_1.trace.traceViewServiceUIViewEvent("-> Registering", uiView);
	        var uiViews = this.uiViews;
	        var fqnMatches = function (uiv) { return uiv.fqn === uiView.fqn; };
	        if (uiViews.filter(fqnMatches).length)
	            trace_1.trace.traceViewServiceUIViewEvent("!!!! duplicate uiView named:", uiView);
	        uiViews.push(uiView);
	        this.sync();
	        return function () {
	            var idx = uiViews.indexOf(uiView);
	            if (idx <= 0) {
	                trace_1.trace.traceViewServiceUIViewEvent("Tried removing non-registered uiView", uiView);
	                return;
	            }
	            trace_1.trace.traceViewServiceUIViewEvent("<- Deregistering", uiView);
	            common_1.removeFrom(uiViews)(uiView);
	        };
	    };
	    ;
	    /**
	     * Returns the list of views currently available on the page, by fully-qualified name.
	     *
	     * @return {Array} Returns an array of fully-qualified view names.
	     */
	    ViewService.prototype.available = function () {
	        return this.uiViews.map(hof_1.prop("fqn"));
	    };
	    /**
	     * Returns the list of views on the page containing loaded content.
	     *
	     * @return {Array} Returns an array of fully-qualified view names.
	     */
	    ViewService.prototype.active = function () {
	        return this.uiViews.filter(hof_1.prop("$config")).map(hof_1.prop("name"));
	    };
	    /**
	     * Normalizes a view's name from a state.views configuration block.
	     *
	     * @param context the context object (state declaration) that the view belongs to
	     * @param rawViewName the name of the view, as declared in the [[StateDeclaration.views]]
	     *
	     * @returns the normalized uiViewName and uiViewContextAnchor that the view targets
	     */
	    ViewService.normalizeUIViewTarget = function (context, rawViewName) {
	        if (rawViewName === void 0) { rawViewName = ""; }
	        // TODO: Validate incoming view name with a regexp to allow:
	        // ex: "view.name@foo.bar" , "^.^.view.name" , "view.name@^.^" , "" ,
	        // "@" , "$default@^" , "!$default.$default" , "!foo.bar"
	        var viewAtContext = rawViewName.split("@");
	        var uiViewName = viewAtContext[0] || "$default"; // default to unnamed view
	        var uiViewContextAnchor = predicates_1.isString(viewAtContext[1]) ? viewAtContext[1] : "^"; // default to parent context
	        // Handle relative view-name sugar syntax.
	        // Matches rawViewName "^.^.^.foo.bar" into array: ["^.^.^.foo.bar", "^.^.^", "foo.bar"],
	        var relativeViewNameSugar = /^(\^(?:\.\^)*)\.(.*$)/.exec(uiViewName);
	        if (relativeViewNameSugar) {
	            // Clobbers existing contextAnchor (rawViewName validation will fix this)
	            uiViewContextAnchor = relativeViewNameSugar[1]; // set anchor to "^.^.^"
	            uiViewName = relativeViewNameSugar[2]; // set view-name to "foo.bar"
	        }
	        if (uiViewName.charAt(0) === '!') {
	            uiViewName = uiViewName.substr(1);
	            uiViewContextAnchor = ""; // target absolutely from root
	        }
	        // handle parent relative targeting "^.^.^"
	        var relativeMatch = /^(\^(?:\.\^)*)$/;
	        if (relativeMatch.exec(uiViewContextAnchor)) {
	            var anchor = uiViewContextAnchor.split(".").reduce((function (anchor, x) { return anchor.parent; }), context);
	            uiViewContextAnchor = anchor.name;
	        }
	        return { uiViewName: uiViewName, uiViewContextAnchor: uiViewContextAnchor };
	    };
	    return ViewService;
	}());
	exports.ViewService = ViewService;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/** @module state */ /** for typedoc */
	"use strict";
	var stateMatcher_1 = __webpack_require__(40);
	var stateBuilder_1 = __webpack_require__(41);
	var stateQueueManager_1 = __webpack_require__(42);
	var common_1 = __webpack_require__(3);
	var StateRegistry = (function () {
	    function StateRegistry(urlMatcherFactory, urlRouterProvider) {
	        this.urlRouterProvider = urlRouterProvider;
	        this.states = {};
	        this.listeners = [];
	        this.matcher = new stateMatcher_1.StateMatcher(this.states);
	        this.builder = new stateBuilder_1.StateBuilder(this.matcher, urlMatcherFactory);
	        this.stateQueue = new stateQueueManager_1.StateQueueManager(this.states, this.builder, urlRouterProvider, this.listeners);
	        var rootStateDef = {
	            name: '',
	            url: '^',
	            views: null,
	            params: {
	                '#': { value: null, type: 'hash', dynamic: true }
	            },
	            abstract: true
	        };
	        var _root = this._root = this.stateQueue.register(rootStateDef);
	        _root.navigable = null;
	    }
	    /**
	     * Listen for a State Registry events
	     *
	     * Adds a callback that is invoked when states are registered or deregistered with the StateRegistry.
	     *
	     * @example
	     * ```js
	     *
	     * let allStates = registry.get();
	     *
	     * // Later, invoke deregisterFn() to remove the listener
	     * let deregisterFn = registry.onStatesChanged((event, states) => {
	     *   switch(event) {
	     *     case: 'registered':
	     *       states.forEach(state => allStates.push(state));
	     *       break;
	     *     case: 'deregistered':
	     *       states.forEach(state => {
	     *         let idx = allStates.indexOf(state);
	     *         if (idx !== -1) allStates.splice(idx, 1);
	     *       });
	     *       break;
	     *   }
	     * });
	     * ```
	     *
	     * @param listener a callback function invoked when the registered states changes.
	     *        The function receives two parameters, `event` and `state`.
	     *        See [[StateRegistryListener]]
	     * @return a function that deregisters the listener
	     */
	    StateRegistry.prototype.onStatesChanged = function (listener) {
	        this.listeners.push(listener);
	        return function deregisterListener() {
	            common_1.removeFrom(this.listeners)(listener);
	        }.bind(this);
	    };
	    /**
	     * Gets the implicit root state
	     *
	     * Gets the root of the state tree.
	     * The root state is implicitly created by UI-Router.
	     * Note: this returns the internal [[State]] representation, not a [[StateDeclaration]]
	     *
	     * @return the root [[State]]
	     */
	    StateRegistry.prototype.root = function () {
	        return this._root;
	    };
	    /**
	     * Adds a state to the registry
	     *
	     * Registers a [[StateDefinition]] or queues it for registration.
	     *
	     * Note: a state will be queued if the state's parent isn't yet registered.
	     * It will also be queued if the queue is not yet in [[StateQueueManager.autoFlush]] mode.
	     *
	     * @param stateDefinition the definition of the state to register.
	     * @returns the internal [[State]] object.
	     *          If the state was successfully registered, then the object is fully built (See: [[StateBuilder]]).
	     *          If the state was only queued, then the object is not fully built.
	     */
	    StateRegistry.prototype.register = function (stateDefinition) {
	        return this.stateQueue.register(stateDefinition);
	    };
	    /** @hidden */
	    StateRegistry.prototype._deregisterTree = function (state) {
	        var _this = this;
	        var all = this.get().map(function (s) { return s.$$state(); });
	        var getChildren = function (states) {
	            var children = all.filter(function (s) { return states.indexOf(s.parent) !== -1; });
	            return children.length === 0 ? children : children.concat(getChildren(children));
	        };
	        var children = getChildren([state]);
	        var deregistered = [state].concat(children).reverse();
	        deregistered.forEach(function (state) {
	            _this.urlRouterProvider.removeRule(state._urlRule);
	            delete _this.states[state.name];
	        });
	        return deregistered;
	    };
	    /**
	     * Removes a state from the registry
	     *
	     * This removes a state from the registry.
	     * If the state has children, they are are also removed from the registry.
	     *
	     * @param stateOrName the state's name or object representation
	     * @returns {State[]} a list of removed states
	     */
	    StateRegistry.prototype.deregister = function (stateOrName) {
	        var _state = this.get(stateOrName);
	        if (!_state)
	            throw new Error("Can't deregister state; not found: " + stateOrName);
	        var deregisteredStates = this._deregisterTree(_state.$$state());
	        this.listeners.forEach(function (listener) { return listener("deregistered", deregisteredStates.map(function (s) { return s.self; })); });
	        return deregisteredStates;
	    };
	    StateRegistry.prototype.get = function (stateOrName, base) {
	        var _this = this;
	        if (arguments.length === 0)
	            return Object.keys(this.states).map(function (name) { return _this.states[name].self; });
	        var found = this.matcher.find(stateOrName, base);
	        return found && found.self || null;
	    };
	    StateRegistry.prototype.decorator = function (name, func) {
	        return this.builder.builder(name, func);
	    };
	    return StateRegistry;
	}());
	exports.StateRegistry = StateRegistry;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module state */ /** for typedoc */
	var predicates_1 = __webpack_require__(4);
	var glob_1 = __webpack_require__(7);
	var common_1 = __webpack_require__(3);
	var StateMatcher = (function () {
	    function StateMatcher(_states) {
	        this._states = _states;
	    }
	    StateMatcher.prototype.isRelative = function (stateName) {
	        stateName = stateName || "";
	        return stateName.indexOf(".") === 0 || stateName.indexOf("^") === 0;
	    };
	    StateMatcher.prototype.find = function (stateOrName, base) {
	        if (!stateOrName && stateOrName !== "")
	            return undefined;
	        var isStr = predicates_1.isString(stateOrName);
	        var name = isStr ? stateOrName : stateOrName.name;
	        if (this.isRelative(name))
	            name = this.resolvePath(name, base);
	        var state = this._states[name];
	        if (state && (isStr || (!isStr && (state === stateOrName || state.self === stateOrName)))) {
	            return state;
	        }
	        else if (isStr) {
	            var matches = common_1.values(this._states)
	                .map(function (state) { return ({ state: state, glob: new glob_1.Glob(state.name) }); })
	                .filter(function (_a) {
	                var state = _a.state, glob = _a.glob;
	                return glob.matches(name);
	            })
	                .map(function (_a) {
	                var state = _a.state, glob = _a.glob;
	                return state;
	            });
	            if (matches.length > 1) {
	                console.log("stateMatcher.find: Found multiple matches for " + name + " using glob: ", matches.map(function (match) { return match.name; }));
	            }
	            return matches[0];
	        }
	        return undefined;
	    };
	    StateMatcher.prototype.resolvePath = function (name, base) {
	        if (!base)
	            throw new Error("No reference point given for path '" + name + "'");
	        var baseState = this.find(base);
	        var splitName = name.split("."), i = 0, pathLength = splitName.length, current = baseState;
	        for (; i < pathLength; i++) {
	            if (splitName[i] === "" && i === 0) {
	                current = baseState;
	                continue;
	            }
	            if (splitName[i] === "^") {
	                if (!current.parent)
	                    throw new Error("Path '" + name + "' not valid for state '" + baseState.name + "'");
	                current = current.parent;
	                continue;
	            }
	            break;
	        }
	        var relName = splitName.slice(i).join(".");
	        return current.name + (current.name && relName ? "." : "") + relName;
	    };
	    return StateMatcher;
	}());
	exports.StateMatcher = StateMatcher;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module state */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var strings_1 = __webpack_require__(9);
	var hof_1 = __webpack_require__(5);
	var param_1 = __webpack_require__(22);
	var resolvable_1 = __webpack_require__(19);
	var coreservices_1 = __webpack_require__(6);
	var parseUrl = function (url) {
	    if (!predicates_1.isString(url))
	        return false;
	    var root = url.charAt(0) === '^';
	    return { val: root ? url.substring(1) : url, root: root };
	};
	function nameBuilder(state) {
	    if (state.lazyLoad)
	        state.name = state.self.name + ".**";
	    return state.name;
	}
	function selfBuilder(state) {
	    state.self.$$state = function () { return state; };
	    return state.self;
	}
	function dataBuilder(state) {
	    if (state.parent && state.parent.data) {
	        state.data = state.self.data = common_1.inherit(state.parent.data, state.data);
	    }
	    return state.data;
	}
	var getUrlBuilder = function ($urlMatcherFactoryProvider, root) {
	    return function urlBuilder(state) {
	        var stateDec = state;
	        if (stateDec && stateDec.url && stateDec.lazyLoad) {
	            stateDec.url += "{remainder:any}"; // match any path (.*)
	        }
	        var parsed = parseUrl(stateDec.url), parent = state.parent;
	        var url = !parsed ? stateDec.url : $urlMatcherFactoryProvider.compile(parsed.val, {
	            params: state.params || {},
	            paramMap: function (paramConfig, isSearch) {
	                if (stateDec.reloadOnSearch === false && isSearch)
	                    paramConfig = common_1.extend(paramConfig || {}, { dynamic: true });
	                return paramConfig;
	            }
	        });
	        if (!url)
	            return null;
	        if (!$urlMatcherFactoryProvider.isMatcher(url))
	            throw new Error("Invalid url '" + url + "' in state '" + state + "'");
	        return (parsed && parsed.root) ? url : ((parent && parent.navigable) || root()).url.append(url);
	    };
	};
	var getNavigableBuilder = function (isRoot) {
	    return function navigableBuilder(state) {
	        return !isRoot(state) && state.url ? state : (state.parent ? state.parent.navigable : null);
	    };
	};
	var getParamsBuilder = function (paramTypes) {
	    return function paramsBuilder(state) {
	        var makeConfigParam = function (config, id) { return param_1.Param.fromConfig(id, null, config, paramTypes); };
	        var urlParams = (state.url && state.url.parameters({ inherit: false })) || [];
	        var nonUrlParams = common_1.values(common_1.mapObj(common_1.omit(state.params || {}, urlParams.map(hof_1.prop('id'))), makeConfigParam));
	        return urlParams.concat(nonUrlParams).map(function (p) { return [p.id, p]; }).reduce(common_1.applyPairs, {});
	    };
	};
	function pathBuilder(state) {
	    return state.parent ? state.parent.path.concat(state) : [state];
	}
	function includesBuilder(state) {
	    var includes = state.parent ? common_1.extend({}, state.parent.includes) : {};
	    includes[state.name] = true;
	    return includes;
	}
	/**
	 * This is a [[StateBuilder.builder]] function for the `resolve:` block on a [[StateDeclaration]].
	 *
	 * When the [[StateBuilder]] builds a [[State]] object from a raw [[StateDeclaration]], this builder
	 * validates the `resolve` property and converts it to a [[Resolvable]] array.
	 *
	 * resolve: input value can be:
	 *
	 * {
	 *   // analyzed but not injected
	 *   myFooResolve: function() { return "myFooData"; },
	 *
	 *   // function.toString() parsed, "DependencyName" dep as string (not min-safe)
	 *   myBarResolve: function(DependencyName) { return DependencyName.fetchSomethingAsPromise() },
	 *
	 *   // Array split; "DependencyName" dep as string
	 *   myBazResolve: [ "DependencyName", function(dep) { return dep.fetchSomethingAsPromise() },
	 *
	 *   // Array split; DependencyType dep as token (compared using ===)
	 *   myQuxResolve: [ DependencyType, function(dep) { return dep.fetchSometingAsPromise() },
	 *
	 *   // val.$inject used as deps
	 *   // where:
	 *   //     corgeResolve.$inject = ["DependencyName"];
	 *   //     function corgeResolve(dep) { dep.fetchSometingAsPromise() }
	 *   // then "DependencyName" dep as string
	 *   myCorgeResolve: corgeResolve,
	 *
	 *  // inject service by name
	 *  // When a string is found, desugar creating a resolve that injects the named service
	 *   myGraultResolve: "SomeService"
	 * }
	 *
	 * or:
	 *
	 * [
	 *   new Resolvable("myFooResolve", function() { return "myFooData" }),
	 *   new Resolvable("myBarResolve", function(dep) { return dep.fetchSomethingAsPromise() }, [ "DependencyName" ]),
	 *   { provide: "myBazResolve", useFactory: function(dep) { dep.fetchSomethingAsPromise() }, deps: [ "DependencyName" ] }
	 * ]
	 */
	function resolvablesBuilder(state) {
	    /** convert resolve: {} and resolvePolicy: {} objects to an array of tuples */
	    var objects2Tuples = function (resolveObj, resolvePolicies) {
	        return Object.keys(resolveObj || {}).map(function (token) { return ({ token: token, val: resolveObj[token], deps: undefined, policy: resolvePolicies[token] }); });
	    };
	    /** fetch DI annotations from a function or ng1-style array */
	    var annotate = function (fn) {
	        return fn['$inject'] || coreservices_1.services.$injector.annotate(fn, coreservices_1.services.$injector.strictDi);
	    };
	    /** true if the object has both `token` and `resolveFn`, and is probably a [[ResolveLiteral]] */
	    var isResolveLiteral = function (obj) { return !!(obj.token && obj.resolveFn); };
	    /** true if the object looks like a provide literal, or a ng2 Provider */
	    var isLikeNg2Provider = function (obj) { return !!((obj.provide || obj.token) && (obj.useValue || obj.useFactory || obj.useExisting || obj.useClass)); };
	    /** true if the object looks like a tuple from obj2Tuples */
	    var isTupleFromObj = function (obj) { return !!(obj && obj.val && (predicates_1.isString(obj.val) || predicates_1.isArray(obj.val) || predicates_1.isFunction(obj.val))); };
	    /** extracts the token from a Provider or provide literal */
	    var token = function (p) { return p.provide || p.token; };
	    /** Given a literal resolve or provider object, returns a Resolvable */
	    var literal2Resolvable = hof_1.pattern([
	        [hof_1.prop('resolveFn'), function (p) { return new resolvable_1.Resolvable(token(p), p.resolveFn, p.deps, p.policy); }],
	        [hof_1.prop('useFactory'), function (p) { return new resolvable_1.Resolvable(token(p), p.useFactory, (p.deps || p.dependencies), p.policy); }],
	        [hof_1.prop('useClass'), function (p) { return new resolvable_1.Resolvable(token(p), function () { return new p.useClass(); }, [], p.policy); }],
	        [hof_1.prop('useValue'), function (p) { return new resolvable_1.Resolvable(token(p), function () { return p.useValue; }, [], p.policy, p.useValue); }],
	        [hof_1.prop('useExisting'), function (p) { return new resolvable_1.Resolvable(token(p), common_1.identity, [p.useExisting], p.policy); }],
	    ]);
	    var tuple2Resolvable = hof_1.pattern([
	        [hof_1.pipe(hof_1.prop("val"), predicates_1.isString), function (tuple) { return new resolvable_1.Resolvable(tuple.token, common_1.identity, [tuple.val], tuple.policy); }],
	        [hof_1.pipe(hof_1.prop("val"), predicates_1.isArray), function (tuple) { return new resolvable_1.Resolvable(tuple.token, common_1.tail(tuple.val), tuple.val.slice(0, -1), tuple.policy); }],
	        [hof_1.pipe(hof_1.prop("val"), predicates_1.isFunction), function (tuple) { return new resolvable_1.Resolvable(tuple.token, tuple.val, annotate(tuple.val), tuple.policy); }],
	    ]);
	    var item2Resolvable = hof_1.pattern([
	        [hof_1.is(resolvable_1.Resolvable), function (r) { return r; }],
	        [isResolveLiteral, literal2Resolvable],
	        [isLikeNg2Provider, literal2Resolvable],
	        [isTupleFromObj, tuple2Resolvable],
	        [hof_1.val(true), function (obj) { throw new Error("Invalid resolve value: " + strings_1.stringify(obj)); }]
	    ]);
	    // If resolveBlock is already an array, use it as-is.
	    // Otherwise, assume it's an object and convert to an Array of tuples
	    var decl = state.resolve;
	    var items = predicates_1.isArray(decl) ? decl : objects2Tuples(decl, state.resolvePolicy || {});
	    return items.map(item2Resolvable);
	}
	exports.resolvablesBuilder = resolvablesBuilder;
	/**
	 * @internalapi A internal global service
	 *
	 * StateBuilder is a factory for the internal [[State]] objects.
	 *
	 * When you register a state with the [[StateRegistry]], you register a plain old javascript object which
	 * conforms to the [[StateDeclaration]] interface.  This factory takes that object and builds the corresponding
	 * [[State]] object, which has an API and is used internally.
	 *
	 * Custom properties or API may be added to the internal [[State]] object by registering a decorator function
	 * using the [[builder]] method.
	 */
	var StateBuilder = (function () {
	    function StateBuilder(matcher, $urlMatcherFactoryProvider) {
	        this.matcher = matcher;
	        var self = this;
	        var root = function () { return matcher.find(""); };
	        var isRoot = function (state) { return state.name === ""; };
	        function parentBuilder(state) {
	            if (isRoot(state))
	                return null;
	            return matcher.find(self.parentName(state)) || root();
	        }
	        this.builders = {
	            name: [nameBuilder],
	            self: [selfBuilder],
	            parent: [parentBuilder],
	            data: [dataBuilder],
	            // Build a URLMatcher if necessary, either via a relative or absolute URL
	            url: [getUrlBuilder($urlMatcherFactoryProvider, root)],
	            // Keep track of the closest ancestor state that has a URL (i.e. is navigable)
	            navigable: [getNavigableBuilder(isRoot)],
	            params: [getParamsBuilder($urlMatcherFactoryProvider.paramTypes)],
	            // Each framework-specific ui-router implementation should define its own `views` builder
	            // e.g., src/ng1/statebuilders/views.ts
	            views: [],
	            // Keep a full path from the root down to this state as this is needed for state activation.
	            path: [pathBuilder],
	            // Speed up $state.includes() as it's used a lot
	            includes: [includesBuilder],
	            resolvables: [resolvablesBuilder]
	        };
	    }
	    /**
	     * Registers a [[BuilderFunction]] for a specific [[State]] property (e.g., `parent`, `url`, or `path`).
	     * More than one BuilderFunction can be registered for a given property.
	     *
	     * The BuilderFunction(s) will be used to define the property on any subsequently built [[State]] objects.
	     *
	     * @param name The name of the State property being registered for.
	     * @param fn The BuilderFunction which will be used to build the State property
	     * @returns a function which deregisters the BuilderFunction
	     */
	    StateBuilder.prototype.builder = function (name, fn) {
	        var builders = this.builders;
	        var array = builders[name] || [];
	        // Backwards compat: if only one builder exists, return it, else return whole arary.
	        if (predicates_1.isString(name) && !predicates_1.isDefined(fn))
	            return array.length > 1 ? array : array[0];
	        if (!predicates_1.isString(name) || !predicates_1.isFunction(fn))
	            return;
	        builders[name] = array;
	        builders[name].push(fn);
	        return function () { return builders[name].splice(builders[name].indexOf(fn, 1)) && null; };
	    };
	    /**
	     * Builds all of the properties on an essentially blank State object, returning a State object which has all its
	     * properties and API built.
	     *
	     * @param state an uninitialized State object
	     * @returns the built State object
	     */
	    StateBuilder.prototype.build = function (state) {
	        var _a = this, matcher = _a.matcher, builders = _a.builders;
	        var parent = this.parentName(state);
	        if (parent && !matcher.find(parent))
	            return null;
	        for (var key in builders) {
	            if (!builders.hasOwnProperty(key))
	                continue;
	            var chain = builders[key].reduce(function (parentFn, step) { return function (_state) { return step(_state, parentFn); }; }, common_1.noop);
	            state[key] = chain(state);
	        }
	        return state;
	    };
	    StateBuilder.prototype.parentName = function (state) {
	        var name = state.name || "";
	        if (name.indexOf('.') !== -1)
	            return name.substring(0, name.lastIndexOf('.'));
	        if (!state.parent)
	            return "";
	        return predicates_1.isString(state.parent) ? state.parent : state.parent.name;
	    };
	    StateBuilder.prototype.name = function (state) {
	        var name = state.name;
	        if (name.indexOf('.') !== -1 || !state.parent)
	            return name;
	        var parentName = predicates_1.isString(state.parent) ? state.parent : state.parent.name;
	        return parentName ? parentName + "." + name : name;
	    };
	    return StateBuilder;
	}());
	exports.StateBuilder = StateBuilder;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module state */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var stateObject_1 = __webpack_require__(43);
	var StateQueueManager = (function () {
	    function StateQueueManager(states, builder, $urlRouterProvider, listeners) {
	        this.states = states;
	        this.builder = builder;
	        this.$urlRouterProvider = $urlRouterProvider;
	        this.listeners = listeners;
	        this.queue = [];
	    }
	    StateQueueManager.prototype.register = function (config) {
	        var _a = this, states = _a.states, queue = _a.queue, $state = _a.$state;
	        // Wrap a new object around the state so we can store our private details easily.
	        // @TODO: state = new State(extend({}, config, { ... }))
	        var state = common_1.inherit(new stateObject_1.State(), common_1.extend({}, config, {
	            self: config,
	            resolve: config.resolve || [],
	            toString: function () { return config.name; }
	        }));
	        if (!predicates_1.isString(state.name))
	            throw new Error("State must have a valid name");
	        if (states.hasOwnProperty(state.name) || common_1.pluck(queue, 'name').indexOf(state.name) !== -1)
	            throw new Error("State '" + state.name + "' is already defined");
	        queue.push(state);
	        if (this.$state) {
	            this.flush($state);
	        }
	        return state;
	    };
	    StateQueueManager.prototype.flush = function ($state) {
	        var _a = this, queue = _a.queue, states = _a.states, builder = _a.builder;
	        var registered = [], // states that got registered
	        orphans = [], // states that dodn't yet have a parent registered
	        previousQueueLength = {}; // keep track of how long the queue when an orphan was first encountered
	        while (queue.length > 0) {
	            var state = queue.shift();
	            var result = builder.build(state);
	            var orphanIdx = orphans.indexOf(state);
	            if (result) {
	                if (states.hasOwnProperty(state.name))
	                    throw new Error("State '" + name + "' is already defined");
	                states[state.name] = state;
	                this.attachRoute($state, state);
	                if (orphanIdx >= 0)
	                    orphans.splice(orphanIdx, 1);
	                registered.push(state);
	                continue;
	            }
	            var prev = previousQueueLength[state.name];
	            previousQueueLength[state.name] = queue.length;
	            if (orphanIdx >= 0 && prev === queue.length) {
	                // Wait until two consecutive iterations where no additional states were dequeued successfully.
	                // throw new Error(`Cannot register orphaned state '${state.name}'`);
	                queue.push(state);
	                return states;
	            }
	            else if (orphanIdx < 0) {
	                orphans.push(state);
	            }
	            queue.push(state);
	        }
	        if (registered.length) {
	            this.listeners.forEach(function (listener) { return listener("registered", registered.map(function (s) { return s.self; })); });
	        }
	        return states;
	    };
	    StateQueueManager.prototype.autoFlush = function ($state) {
	        this.$state = $state;
	        this.flush($state);
	    };
	    StateQueueManager.prototype.attachRoute = function ($state, state) {
	        var $urlRouterProvider = this.$urlRouterProvider;
	        if (state.abstract || !state.url)
	            return;
	        $urlRouterProvider.when(state.url, ['$match', '$stateParams', function ($match, $stateParams) {
	                if ($state.$current.navigable !== state || !common_1.equalForKeys($match, $stateParams)) {
	                    $state.transitionTo(state, $match, { inherit: true, source: "url" });
	                }
	            }], function (rule) { return state._urlRule = rule; });
	    };
	    return StateQueueManager;
	}());
	exports.StateQueueManager = StateQueueManager;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/** @module state */ /** for typedoc */
	"use strict";
	var common_1 = __webpack_require__(3);
	var hof_1 = __webpack_require__(5);
	/**
	 * @ngdoc object
	 * @name ui.router.state.type:State
	 *
	 * @description
	 * Definition object for states. Includes methods for manipulating the state heirarchy.
	 *
	 * @param {Object} config  A configuration object hash that includes the results of user-supplied
	 *        values, as well as values from `StateBuilder`.
	 *
	 * @returns {Object}  Returns a new `State` object.
	 */
	var State = (function () {
	    function State(config) {
	        common_1.extend(this, config);
	        // Object.freeze(this);
	    }
	    /**
	     * @ngdoc function
	     * @name ui.router.state.type:State#is
	     * @methodOf ui.router.state.type:State
	     *
	     * @description
	     * Compares the identity of the state against the passed value, which is either an object
	     * reference to the actual `State` instance, the original definition object passed to
	     * `$stateProvider.state()`, or the fully-qualified name.
	     *
	     * @param {Object} ref Can be one of (a) a `State` instance, (b) an object that was passed
	     *        into `$stateProvider.state()`, (c) the fully-qualified name of a state as a string.
	     * @returns {boolean} Returns `true` if `ref` matches the current `State` instance.
	     */
	    State.prototype.is = function (ref) {
	        return this === ref || this.self === ref || this.fqn() === ref;
	    };
	    /**
	     * @ngdoc function
	     * @name ui.router.state.type:State#fqn
	     * @methodOf ui.router.state.type:State
	     *
	     * @description
	     * Returns the fully-qualified name of the state, based on its current position in the tree.
	     *
	     * @returns {string} Returns a dot-separated name of the state.
	     */
	    State.prototype.fqn = function () {
	        if (!this.parent || !(this.parent instanceof this.constructor))
	            return this.name;
	        var name = this.parent.fqn();
	        return name ? name + "." + this.name : this.name;
	    };
	    /**
	     * @ngdoc function
	     * @name ui.router.state.type:State#root
	     * @methodOf ui.router.state.type:State
	     *
	     * @description
	     * Returns the root node of this state's tree.
	     *
	     * @returns {State} The root of this state's tree.
	     */
	    State.prototype.root = function () {
	        return this.parent && this.parent.root() || this;
	    };
	    State.prototype.parameters = function (opts) {
	        opts = common_1.defaults(opts, { inherit: true });
	        var inherited = opts.inherit && this.parent && this.parent.parameters() || [];
	        return inherited.concat(common_1.values(this.params));
	    };
	    State.prototype.parameter = function (id, opts) {
	        if (opts === void 0) { opts = {}; }
	        return (this.url && this.url.parameter(id, opts) ||
	            common_1.find(common_1.values(this.params), hof_1.propEq('id', id)) ||
	            opts.inherit && this.parent && this.parent.parameter(id));
	    };
	    State.prototype.toString = function () {
	        return this.fqn();
	    };
	    return State;
	}());
	exports.State = State;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module state */ /** */
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var queue_1 = __webpack_require__(8);
	var coreservices_1 = __webpack_require__(6);
	var pathFactory_1 = __webpack_require__(20);
	var node_1 = __webpack_require__(21);
	var transitionService_1 = __webpack_require__(31);
	var rejectFactory_1 = __webpack_require__(10);
	var targetState_1 = __webpack_require__(14);
	var param_1 = __webpack_require__(22);
	var glob_1 = __webpack_require__(7);
	var common_2 = __webpack_require__(3);
	var common_3 = __webpack_require__(3);
	var StateService = (function () {
	    /** @hidden */
	    function StateService(router) {
	        this.router = router;
	        /** @hidden */
	        this._defaultErrorHandler = function $defaultErrorHandler($error$) {
	            if ($error$ instanceof Error && $error$.stack) {
	                console.error($error$);
	                console.error($error$.stack);
	            }
	            else if ($error$ instanceof rejectFactory_1.Rejection) {
	                console.error($error$.toString());
	                if ($error$.detail && $error$.detail.stack)
	                    console.error($error$.detail.stack);
	            }
	            else {
	                console.error($error$);
	            }
	        };
	        var getters = ['current', '$current', 'params', 'transition'];
	        var boundFns = Object.keys(StateService.prototype).filter(function (key) { return getters.indexOf(key) === -1; });
	        common_3.bindFunctions(StateService.prototype, this, this, boundFns);
	    }
	    Object.defineProperty(StateService.prototype, "transition", {
	        get: function () { return this.router.globals.transition; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(StateService.prototype, "params", {
	        get: function () { return this.router.globals.params; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(StateService.prototype, "current", {
	        get: function () { return this.router.globals.current; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(StateService.prototype, "$current", {
	        get: function () { return this.router.globals.$current; },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Handler for when [[transitionTo]] is called with an invalid state.
	     *
	     * Invokes the [[onInvalid]] callbacks, in natural order.
	     * Each callback's return value is checked in sequence until one of them returns an instance of TargetState.
	     * The results of the callbacks are wrapped in $q.when(), so the callbacks may return promises.
	     *
	     * If a callback returns an TargetState, then it is used as arguments to $state.transitionTo() and the result returned.
	     */
	    StateService.prototype._handleInvalidTargetState = function (fromPath, $to$) {
	        var _this = this;
	        var globals = this.router.globals;
	        var latestThing = function () { return globals.transitionHistory.peekTail(); };
	        var latest = latestThing();
	        var $from$ = pathFactory_1.PathFactory.makeTargetState(fromPath);
	        var callbackQueue = new queue_1.Queue(this.router.stateProvider.invalidCallbacks.slice());
	        var $q = coreservices_1.services.$q, $injector = coreservices_1.services.$injector;
	        var invokeCallback = function (callback) {
	            return $q.when($injector.invoke(callback, null, { $to$: $to$, $from$: $from$ }));
	        };
	        var checkForRedirect = function (result) {
	            if (!(result instanceof targetState_1.TargetState)) {
	                return;
	            }
	            var target = result;
	            // Recreate the TargetState, in case the state is now defined.
	            target = _this.target(target.identifier(), target.params(), target.options());
	            if (!target.valid())
	                return rejectFactory_1.Rejection.invalid(target.error()).toPromise();
	            if (latestThing() !== latest)
	                return rejectFactory_1.Rejection.superseded().toPromise();
	            return _this.transitionTo(target.identifier(), target.params(), target.options());
	        };
	        function invokeNextCallback() {
	            var nextCallback = callbackQueue.dequeue();
	            if (nextCallback === undefined)
	                return rejectFactory_1.Rejection.invalid($to$.error()).toPromise();
	            return invokeCallback(nextCallback).then(checkForRedirect).then(function (result) { return result || invokeNextCallback(); });
	        }
	        return invokeNextCallback();
	    };
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$state#reload
	     * @methodOf ui.router.state.$state
	     *
	     * @description
	     * A method that force reloads the current state, or a partial state hierarchy. All resolves are re-resolved,
	     * controllers reinstantiated, and events re-fired.
	     *
	     * @example
	     * <pre>
	     * let app angular.module('app', ['ui.router']);
	     *
	     * app.controller('ctrl', function ($scope, $state) {
	     *   $scope.reload = function(){
	     *     $state.reload();
	     *   }
	     * });
	     * </pre>
	     *
	     * `reload()` is just an alias for:
	     * <pre>
	     * $state.transitionTo($state.current, $stateParams, {
	     *   reload: true, inherit: false, notify: true
	     * });
	     * </pre>
	     *
	     * @param {string=|object=} reloadState - A state name or a state object, which is the root of the resolves to be re-resolved.
	     * @example
	     * <pre>
	     * //assuming app application consists of 3 states: 'contacts', 'contacts.detail', 'contacts.detail.item'
	     * //and current state is 'contacts.detail.item'
	     * let app angular.module('app', ['ui.router']);
	     *
	     * app.controller('ctrl', function ($scope, $state) {
	     *   $scope.reload = function(){
	     *     //will reload 'contact.detail' and nested 'contact.detail.item' states
	     *     $state.reload('contact.detail');
	     *   }
	     * });
	     * </pre>
	     *
	     * @returns {promise} A promise representing the state of the new transition. See
	     * {@link ui.router.state.$state#methods_go $state.go}.
	     */
	    StateService.prototype.reload = function (reloadState) {
	        return this.transitionTo(this.current, this.params, {
	            reload: predicates_1.isDefined(reloadState) ? reloadState : true,
	            inherit: false,
	            notify: false
	        });
	    };
	    ;
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$state#go
	     * @methodOf ui.router.state.$state
	     *
	     * @description
	     * Convenience method for transitioning to a new state. `$state.go` calls
	     * `$state.transitionTo` internally but automatically sets options to
	     * `{ location: true, inherit: true, relative: $state.$current, notify: true }`.
	     * This allows you to easily use an absolute or relative to path and specify
	     * only the parameters you'd like to update (while letting unspecified parameters
	     * inherit from the currently active ancestor states).
	     *
	     * @example
	     * <pre>
	     * let app = angular.module('app', ['ui.router']);
	     *
	     * app.controller('ctrl', function ($scope, $state) {
	     *   $scope.changeState = function () {
	     *     $state.go('contact.detail');
	     *   };
	     * });
	     * </pre>
	     * <img src='../ngdoc_assets/StateGoExamples.png'/>
	     *
	     * @param {string|object} to Absolute state name, state object, or relative state path. Some examples:
	     *
	     * - `$state.go('contact.detail')` - will go to the `contact.detail` state
	     * - `$state.go('^')` - will go to a parent state
	     * - `$state.go('^.sibling')` - will go to a sibling state
	     * - `$state.go('.child.grandchild')` - will go to grandchild state
	     *
	     * @param {object=} params A map of the parameters that will be sent to the state,
	     * will populate $stateParams. Any parameters that are not specified will be inherited from currently
	     * defined parameters. This allows, for example, going to a sibling state that shares parameters
	     * specified in a parent state. Parameter inheritance only works between common ancestor states, I.e.
	     * transitioning to a sibling will get you the parameters for all parents, transitioning to a child
	     * will get you all current parameters, etc.
	     * @param {object=} options Options object. The options are:
	     *
	     * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
	     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
	     * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.
	     * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'),
	     *    defines which state to be relative from.
	     * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
	     * - **`reload`** (v0.2.5) - {boolean=false}, If `true` will force transition even if the state or params
	     *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
	     *    use this when you want to force a reload when *everything* is the same, including search params.
	     *
	     * @returns {promise} A promise representing the state of the new transition.
	     *
	     * Possible success values:
	     *
	     * - $state.current
	     *
	     * <br/>Possible rejection values:
	     *
	     * - 'transition superseded' - when a newer transition has been started after this one
	     * - 'transition prevented' - when `event.preventDefault()` has been called in a `$stateChangeStart` listener
	     * - 'transition aborted' - when `event.preventDefault()` has been called in a `$stateNotFound` listener or
	     *   when a `$stateNotFound` `event.retry` promise errors.
	     * - 'transition failed' - when a state has been unsuccessfully found after 2 tries.
	     * - *resolve error* - when an error has occurred with a `resolve`
	     *
	     */
	    StateService.prototype.go = function (to, params, options) {
	        var defautGoOpts = { relative: this.$current, inherit: true };
	        var transOpts = common_1.defaults(options, defautGoOpts, transitionService_1.defaultTransOpts);
	        return this.transitionTo(to, params, transOpts);
	    };
	    ;
	    /** Factory method for creating a TargetState */
	    StateService.prototype.target = function (identifier, params, options) {
	        if (options === void 0) { options = {}; }
	        // If we're reloading, find the state object to reload from
	        if (predicates_1.isObject(options.reload) && !options.reload.name)
	            throw new Error('Invalid reload state object');
	        var reg = this.router.stateRegistry;
	        options.reloadState = options.reload === true ? reg.root() : reg.matcher.find(options.reload, options.relative);
	        if (options.reload && !options.reloadState)
	            throw new Error("No such reload state '" + (predicates_1.isString(options.reload) ? options.reload : options.reload.name) + "'");
	        var stateDefinition = reg.matcher.find(identifier, options.relative);
	        return new targetState_1.TargetState(identifier, stateDefinition, params, options);
	    };
	    ;
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$state#transitionTo
	     * @methodOf ui.router.state.$state
	     *
	     * @description
	     * Low-level method for transitioning to a new state. {@link ui.router.state.$state#methods_go $state.go}
	     * uses `transitionTo` internally. `$state.go` is recommended in most situations.
	     *
	     * @example
	     * <pre>
	     * let app = angular.module('app', ['ui.router']);
	     *
	     * app.controller('ctrl', function ($scope, $state) {
	     *   $scope.changeState = function () {
	     *     $state.transitionTo('contact.detail');
	     *   };
	     * });
	     * </pre>
	     *
	     * @param {string|object} to State name or state object.
	     * @param {object=} toParams A map of the parameters that will be sent to the state,
	     * will populate $stateParams.
	     * @param {object=} options Options object. The options are:
	     *
	     * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
	     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
	     * - **`inherit`** - {boolean=false}, If `true` will inherit url parameters from current url.
	     * - **`relative`** - {object=}, When transitioning with relative path (e.g '^'),
	     *    defines which state to be relative from.
	     * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
	     * - **`reload`** (v0.2.5) - {boolean=false}, If `true` will force transition even if the state or params
	     *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
	     *    use this when you want to force a reload when *everything* is the same, including search params.
	     *
	     * @returns {promise} A promise representing the state of the new transition. See
	     * {@link ui.router.state.$state#methods_go $state.go}.
	     */
	    StateService.prototype.transitionTo = function (to, toParams, options) {
	        var _this = this;
	        if (toParams === void 0) { toParams = {}; }
	        if (options === void 0) { options = {}; }
	        var router = this.router;
	        var globals = router.globals;
	        var transHistory = globals.transitionHistory;
	        options = common_1.defaults(options, transitionService_1.defaultTransOpts);
	        options = common_1.extend(options, { current: transHistory.peekTail.bind(transHistory) });
	        var ref = this.target(to, toParams, options);
	        var latestSuccess = globals.successfulTransitions.peekTail();
	        var rootPath = function () { return [new node_1.PathNode(_this.router.stateRegistry.root())]; };
	        var currentPath = latestSuccess ? latestSuccess.treeChanges().to : rootPath();
	        if (!ref.exists())
	            return this._handleInvalidTargetState(currentPath, ref);
	        if (!ref.valid())
	            return common_1.silentRejection(ref.error());
	        /**
	         * Special handling for Ignored, Aborted, and Redirected transitions
	         *
	         * The semantics for the transition.run() promise and the StateService.transitionTo()
	         * promise differ. For instance, the run() promise may be rejected because it was
	         * IGNORED, but the transitionTo() promise is resolved because from the user perspective
	         * no error occurred.  Likewise, the transition.run() promise may be rejected because of
	         * a Redirect, but the transitionTo() promise is chained to the new Transition's promise.
	         */
	        var rejectedTransitionHandler = function (transition) { return function (error) {
	            if (error instanceof rejectFactory_1.Rejection) {
	                if (error.type === rejectFactory_1.RejectType.IGNORED) {
	                    // Consider ignored `Transition.run()` as a successful `transitionTo`
	                    router.urlRouter.update();
	                    return coreservices_1.services.$q.when(globals.current);
	                }
	                if (error.type === rejectFactory_1.RejectType.SUPERSEDED && error.redirected && error.detail instanceof targetState_1.TargetState) {
	                    // If `Transition.run()` was redirected, allow the `transitionTo()` promise to resolve successfully
	                    // by returning the promise for the new (redirect) `Transition.run()`.
	                    var redirect = transition.redirect(error.detail);
	                    return redirect.run().catch(rejectedTransitionHandler(redirect));
	                }
	                if (error.type === rejectFactory_1.RejectType.ABORTED) {
	                    router.urlRouter.update();
	                }
	            }
	            var errorHandler = _this.defaultErrorHandler();
	            errorHandler(error);
	            return coreservices_1.services.$q.reject(error);
	        }; };
	        var transition = this.router.transitionService.create(currentPath, ref);
	        var transitionToPromise = transition.run().catch(rejectedTransitionHandler(transition));
	        common_1.silenceUncaughtInPromise(transitionToPromise); // issue #2676
	        // Return a promise for the transition, which also has the transition object on it.
	        return common_1.extend(transitionToPromise, { transition: transition });
	    };
	    ;
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$state#is
	     * @methodOf ui.router.state.$state
	     *
	     * @description
	     * Similar to {@link ui.router.state.$state#methods_includes $state.includes},
	     * but only checks for the full state name. If params is supplied then it will be
	     * tested for strict equality against the current active params object, so all params
	     * must match with none missing and no extras.
	     *
	     * @example
	     * <pre>
	     * $state.$current.name = 'contacts.details.item';
	     *
	     * // absolute name
	     * $state.is('contact.details.item'); // returns true
	     * $state.is(contactDetailItemStateObject); // returns true
	     *
	     * // relative name (. and ^), typically from a template
	     * // E.g. from the 'contacts.details' template
	     * <div ng-class="{highlighted: $state.is('.item')}">Item</div>
	     * </pre>
	     *
	     * @param {string|object} stateOrName The state name (absolute or relative) or state object you'd like to check.
	     * @param {object=} params A param object, e.g. `{sectionId: section.id}`, that you'd like
	     * to test against the current active state.
	     * @param {object=} options An options object.  The options are:
	     *
	     * - **`relative`** - {string|object} -  If `stateOrName` is a relative state name and `options.relative` is set, .is will
	     * test relative to `options.relative` state (or name).
	     *
	     * @returns {boolean} Returns true if it is the state.
	     */
	    StateService.prototype.is = function (stateOrName, params, options) {
	        options = common_1.defaults(options, { relative: this.$current });
	        var state = this.router.stateRegistry.matcher.find(stateOrName, options.relative);
	        if (!predicates_1.isDefined(state))
	            return undefined;
	        if (this.$current !== state)
	            return false;
	        return predicates_1.isDefined(params) && params !== null ? param_1.Param.equals(state.parameters(), this.params, params) : true;
	    };
	    ;
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$state#includes
	     * @methodOf ui.router.state.$state
	     *
	     * @description
	     * A method to determine if the current active state is equal to or is the child of the
	     * state stateName. If any params are passed then they will be tested for a match as well.
	     * Not all the parameters need to be passed, just the ones you'd like to test for equality.
	     *
	     * @example
	     * Partial and relative names
	     * <pre>
	     * $state.$current.name = 'contacts.details.item';
	     *
	     * // Using partial names
	     * $state.includes("contacts"); // returns true
	     * $state.includes("contacts.details"); // returns true
	     * $state.includes("contacts.details.item"); // returns true
	     * $state.includes("contacts.list"); // returns false
	     * $state.includes("about"); // returns false
	     *
	     * // Using relative names (. and ^), typically from a template
	     * // E.g. from the 'contacts.details' template
	     * <div ng-class="{highlighted: $state.includes('.item')}">Item</div>
	     * </pre>
	     *
	     * Basic globbing patterns
	     * <pre>
	     * $state.$current.name = 'contacts.details.item.url';
	     *
	     * $state.includes("*.details.*.*"); // returns true
	     * $state.includes("*.details.**"); // returns true
	     * $state.includes("**.item.**"); // returns true
	     * $state.includes("*.details.item.url"); // returns true
	     * $state.includes("*.details.*.url"); // returns true
	     * $state.includes("*.details.*"); // returns false
	     * $state.includes("item.**"); // returns false
	     * </pre>
	     *
	     * @param {string|object} stateOrName A partial name, relative name, glob pattern,
	     * or state object to be searched for within the current state name.
	     * @param {object=} params A param object, e.g. `{sectionId: section.id}`,
	     * that you'd like to test against the current active state.
	     * @param {object=} options An options object.  The options are:
	     *
	     * - **`relative`** - {string|object=} -  If `stateOrName` is a relative state reference and `options.relative` is set,
	     * .includes will test relative to `options.relative` state (or name).
	     *
	     * @returns {boolean} Returns true if it does include the state
	     */
	    StateService.prototype.includes = function (stateOrName, params, options) {
	        options = common_1.defaults(options, { relative: this.$current });
	        var glob = predicates_1.isString(stateOrName) && glob_1.Glob.fromString(stateOrName);
	        if (glob) {
	            if (!glob.matches(this.$current.name))
	                return false;
	            stateOrName = this.$current.name;
	        }
	        var state = this.router.stateRegistry.matcher.find(stateOrName, options.relative), include = this.$current.includes;
	        if (!predicates_1.isDefined(state))
	            return undefined;
	        if (!predicates_1.isDefined(include[state.name]))
	            return false;
	        // @TODO Replace with Param.equals() ?
	        return params ? common_2.equalForKeys(param_1.Param.values(state.parameters(), params), this.params, Object.keys(params)) : true;
	    };
	    ;
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$state#href
	     * @methodOf ui.router.state.$state
	     *
	     * @description
	     * A url generation method that returns the compiled url for the given state populated with the given params.
	     *
	     * @example
	     * <pre>
	     * expect($state.href("about.person", { person: "bob" })).toEqual("/about/bob");
	     * </pre>
	     *
	     * @param {string|object} stateOrName The state name or state object you'd like to generate a url from.
	     * @param {object=} params An object of parameter values to fill the state's required parameters.
	     * @param {object=} options Options object. The options are:
	     *
	     * - **`lossy`** - {boolean=true} -  If true, and if there is no url associated with the state provided in the
	     *    first parameter, then the constructed href url will be built from the first navigable ancestor (aka
	     *    ancestor with a valid url).
	     * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.
	     * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'),
	     *    defines which state to be relative from.
	     * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
	     *
	     * @returns {string} compiled state url
	     */
	    StateService.prototype.href = function (stateOrName, params, options) {
	        var defaultHrefOpts = {
	            lossy: true,
	            inherit: true,
	            absolute: false,
	            relative: this.$current
	        };
	        options = common_1.defaults(options, defaultHrefOpts);
	        params = params || {};
	        var state = this.router.stateRegistry.matcher.find(stateOrName, options.relative);
	        if (!predicates_1.isDefined(state))
	            return null;
	        if (options.inherit)
	            params = this.params.$inherit(params, this.$current, state);
	        var nav = (state && options.lossy) ? state.navigable : state;
	        if (!nav || nav.url === undefined || nav.url === null) {
	            return null;
	        }
	        return this.router.urlRouter.href(nav.url, param_1.Param.values(state.parameters(), params), {
	            absolute: options.absolute
	        });
	    };
	    ;
	    /**
	     * Sets or gets the default [[transitionTo]] error handler.
	     *
	     * The error handler is called when a [[Transition]] is rejected or when any error occurred during the Transition.
	     * This includes errors caused by resolves and transition hooks.
	     *
	     * Note:
	     * This handler does not receive certain Transition rejections.
	     * Redirected and Ignored Transitions are not considered to be errors by [[StateService.transitionTo]].
	     *
	     * The built-in default error handler logs the error to the console.
	     *
	     * You can provide your own custom handler.
	     *
	     * @example
	     * ```js
	     *
	     * stateService.defaultErrorHandler(function() {
	     *   // Do not log transitionTo errors
	     * });
	     * ```
	     *
	     * @param handler a global error handler function
	     * @returns the current global error handler
	     */
	    StateService.prototype.defaultErrorHandler = function (handler) {
	        return this._defaultErrorHandler = handler || this._defaultErrorHandler;
	    };
	    StateService.prototype.get = function (stateOrName, base) {
	        var reg = this.router.stateRegistry;
	        if (arguments.length === 0)
	            return reg.get();
	        return reg.get(stateOrName, base || this.$current);
	    };
	    return StateService;
	}());
	exports.StateService = StateService;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module core */ /** */
	var stateParams_1 = __webpack_require__(46);
	var queue_1 = __webpack_require__(8);
	var common_1 = __webpack_require__(3);
	/**
	 * Global mutable state
	 */
	var Globals = (function () {
	    function Globals(transitionService) {
	        var _this = this;
	        this.params = new stateParams_1.StateParams();
	        this.transitionHistory = new queue_1.Queue([], 1);
	        this.successfulTransitions = new queue_1.Queue([], 1);
	        var beforeNewTransition = function ($transition$) {
	            _this.transition = $transition$;
	            _this.transitionHistory.enqueue($transition$);
	            var updateGlobalState = function () {
	                _this.successfulTransitions.enqueue($transition$);
	                _this.$current = $transition$.$to();
	                _this.current = _this.$current.self;
	                common_1.copy($transition$.params(), _this.params);
	            };
	            $transition$.onSuccess({}, updateGlobalState, { priority: 10000 });
	            var clearCurrentTransition = function () { if (_this.transition === $transition$)
	                _this.transition = null; };
	            $transition$.promise.then(clearCurrentTransition, clearCurrentTransition);
	        };
	        transitionService.onBefore({}, beforeNewTransition);
	    }
	    return Globals;
	}());
	exports.Globals = Globals;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module params */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var StateParams = (function () {
	    function StateParams(params) {
	        if (params === void 0) { params = {}; }
	        common_1.extend(this, params);
	    }
	    /**
	     * Merges a set of parameters with all parameters inherited between the common parents of the
	     * current state and a given destination state.
	     *
	     * @param {Object} newParams The set of parameters which will be composited with inherited params.
	     * @param {Object} $current Internal definition of object representing the current state.
	     * @param {Object} $to Internal definition of object representing state to transition to.
	     */
	    StateParams.prototype.$inherit = function (newParams, $current, $to) {
	        var parents = common_1.ancestors($current, $to), parentParams, inherited = {}, inheritList = [];
	        for (var i in parents) {
	            if (!parents[i] || !parents[i].params)
	                continue;
	            parentParams = Object.keys(parents[i].params);
	            if (!parentParams.length)
	                continue;
	            for (var j in parentParams) {
	                if (inheritList.indexOf(parentParams[j]) >= 0)
	                    continue;
	                inheritList.push(parentParams[j]);
	                inherited[parentParams[j]] = this[parentParams[j]];
	            }
	        }
	        return common_1.extend({}, inherited, newParams);
	    };
	    ;
	    return StateParams;
	}());
	exports.StateParams = StateParams;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/**
	 * This module contains code for State Parameters.
	 *
	 * See [[ParamDeclaration]]
	 * @module params
	 * @preferred doc
	 */
	/** for typedoc */
	__export(__webpack_require__(22));
	__export(__webpack_require__(28));
	__export(__webpack_require__(46));
	__export(__webpack_require__(24));


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/** @module path */ /** for typedoc */
	__export(__webpack_require__(21));
	__export(__webpack_require__(20));


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/** @module resolve */ /** for typedoc */
	__export(__webpack_require__(18));
	__export(__webpack_require__(19));
	__export(__webpack_require__(17));


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/** @module state */ /** for typedoc */
	__export(__webpack_require__(30));
	__export(__webpack_require__(41));
	__export(__webpack_require__(43));
	__export(__webpack_require__(40));
	__export(__webpack_require__(42));
	__export(__webpack_require__(39));
	__export(__webpack_require__(44));
	__export(__webpack_require__(14));


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/**
	 * This module contains APIs related to a Transition.
	 *
	 * See [[Transition]], [[$transitions]]
	 *
	 * @module transition
	 * @preferred
	 */
	/** for typedoc */
	__export(__webpack_require__(16));
	__export(__webpack_require__(15));
	__export(__webpack_require__(10));
	__export(__webpack_require__(11));
	__export(__webpack_require__(13));
	__export(__webpack_require__(31));


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/** @module url */ /** for typedoc */
	__export(__webpack_require__(27));
	__export(__webpack_require__(23));
	__export(__webpack_require__(26));
	__export(__webpack_require__(29));


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/** @module view */ /** for typedoc */
	__export(__webpack_require__(38));


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * # UI-Router for Angular 1
	 *
	 * - Provides an implementation for the [[CoreServices]] API, based on angular 1 services.
	 * - Also registers some services with the angular 1 injector.
	 * - Creates and bootstraps a new [[UIRouter]] object.  Ties it to the the angular 1 lifecycle.
	 *
	 * @module ng1
	 * @preferred
	 */
	"use strict";
	/** for typedoc */
	var router_1 = __webpack_require__(25);
	var coreservices_1 = __webpack_require__(6);
	var common_1 = __webpack_require__(3);
	var hof_1 = __webpack_require__(5);
	var predicates_1 = __webpack_require__(4);
	var resolveService_1 = __webpack_require__(55);
	var trace_1 = __webpack_require__(12);
	var views_1 = __webpack_require__(56);
	var templateFactory_1 = __webpack_require__(57);
	var onEnterExitRetain_1 = __webpack_require__(58);
	/** @hidden */
	var app = angular.module("ui.router.angular1", []);
	/**
	 * @ngdoc overview
	 * @name ui.router.util
	 *
	 * @description
	 * # ui.router.util sub-module
	 *
	 * This module is a dependency of other sub-modules. Do not include this module as a dependency
	 * in your angular app (use {@link ui.router} module instead).
	 *
	 */
	angular.module('ui.router.util', ['ng', 'ui.router.init']);
	/**
	 * @ngdoc overview
	 * @name ui.router.router
	 *
	 * @requires ui.router.util
	 *
	 * @description
	 * # ui.router.router sub-module
	 *
	 * This module is a dependency of other sub-modules. Do not include this module as a dependency
	 * in your angular app (use {@link ui.router} module instead).
	 */
	angular.module('ui.router.router', ['ui.router.util']);
	/**
	 * @ngdoc overview
	 * @name ui.router.state
	 *
	 * @requires ui.router.router
	 * @requires ui.router.util
	 *
	 * @description
	 * # ui.router.state sub-module
	 *
	 * This module is a dependency of the main ui.router module. Do not include this module as a dependency
	 * in your angular app (use {@link ui.router} module instead).
	 *
	 */
	angular.module('ui.router.state', ['ui.router.router', 'ui.router.util', 'ui.router.angular1']);
	/**
	 * @ngdoc overview
	 * @name ui.router
	 *
	 * @requires ui.router.state
	 *
	 * @description
	 * # ui.router
	 *
	 * ## The main module for ui.router
	 * There are several sub-modules included with the ui.router module, however only this module is needed
	 * as a dependency within your angular app. The other modules are for organization purposes.
	 *
	 * The modules are:
	 * * ui.router - the main "umbrella" module
	 * * ui.router.router -
	 *
	 * *You'll need to include **only** this module as the dependency within your angular app.*
	 *
	 * <pre>
	 * <!doctype html>
	 * <html ng-app="myApp">
	 * <head>
	 *   <script src="js/angular.js"></script>
	 *   <!-- Include the ui-router script -->
	 *   <script src="js/angular-ui-router.min.js"></script>
	 *   <script>
	 *     // ...and add 'ui.router' as a dependency
	 *     var myApp = angular.module('myApp', ['ui.router']);
	 *   </script>
	 * </head>
	 * <body>
	 * </body>
	 * </html>
	 * </pre>
	 */
	angular.module('ui.router', ['ui.router.init', 'ui.router.state', 'ui.router.angular1']);
	angular.module('ui.router.compat', ['ui.router']);
	/**
	 * Annotates a controller expression (may be a controller function(), a "controllername",
	 * or "controllername as name")
	 *
	 * - Temporarily decorates $injector.instantiate.
	 * - Invokes $controller() service
	 *   - Calls $injector.instantiate with controller constructor
	 * - Annotate constructor
	 * - Undecorate $injector
	 *
	 * returns an array of strings, which are the arguments of the controller expression
	 */
	function annotateController(controllerExpression) {
	    var $injector = coreservices_1.services.$injector;
	    var $controller = $injector.get("$controller");
	    var oldInstantiate = $injector.instantiate;
	    try {
	        var deps_1;
	        $injector.instantiate = function fakeInstantiate(constructorFunction) {
	            $injector.instantiate = oldInstantiate; // Un-decorate ASAP
	            deps_1 = $injector.annotate(constructorFunction);
	        };
	        $controller(controllerExpression, { $scope: {} });
	        return deps_1;
	    }
	    finally {
	        $injector.instantiate = oldInstantiate;
	    }
	}
	exports.annotateController = annotateController;
	var router = null;
	$uiRouter.$inject = ['$locationProvider'];
	/** This angular 1 provider instantiates a Router and exposes its services via the angular injector */
	function $uiRouter($locationProvider) {
	    // Create a new instance of the Router when the $uiRouterProvider is initialized
	    router = new router_1.UIRouter();
	    // Apply ng1 specific StateBuilder code for `views`, `resolve`, and `onExit/Retain/Enter` properties
	    router.stateRegistry.decorator("views", views_1.ng1ViewsBuilder);
	    router.stateRegistry.decorator("onExit", onEnterExitRetain_1.getStateHookBuilder("onExit"));
	    router.stateRegistry.decorator("onRetain", onEnterExitRetain_1.getStateHookBuilder("onRetain"));
	    router.stateRegistry.decorator("onEnter", onEnterExitRetain_1.getStateHookBuilder("onEnter"));
	    router.viewService.viewConfigFactory('ng1', views_1.ng1ViewConfigFactory);
	    // Bind LocationConfig.hashPrefix to $locationProvider.hashPrefix
	    common_1.bindFunctions($locationProvider, coreservices_1.services.locationConfig, $locationProvider, ['hashPrefix']);
	    // Create a LocationService.onChange registry
	    var urlListeners = [];
	    coreservices_1.services.location.onChange = function (callback) {
	        urlListeners.push(callback);
	        return function () { return common_1.removeFrom(urlListeners)(callback); };
	    };
	    this.$get = $get;
	    $get.$inject = ['$location', '$browser', '$sniffer', '$rootScope', '$http', '$templateCache'];
	    function $get($location, $browser, $sniffer, $rootScope, $http, $templateCache) {
	        // Bind $locationChangeSuccess to the listeners registered in LocationService.onChange
	        $rootScope.$on("$locationChangeSuccess", function (evt) { return urlListeners.forEach(function (fn) { return fn(evt); }); });
	        // Bind LocationConfig.html5Mode to $locationProvider.html5Mode and $sniffer.history
	        coreservices_1.services.locationConfig.html5Mode = function () {
	            var html5Mode = $locationProvider.html5Mode();
	            html5Mode = predicates_1.isObject(html5Mode) ? html5Mode.enabled : html5Mode;
	            return html5Mode && $sniffer.history;
	        };
	        coreservices_1.services.location.setUrl = function (newUrl, replace) {
	            if (replace === void 0) { replace = false; }
	            $location.url(newUrl);
	            if (replace)
	                $location.replace();
	        };
	        coreservices_1.services.template.get = function (url) {
	            return $http.get(url, { cache: $templateCache, headers: { Accept: 'text/html' } }).then(hof_1.prop("data"));
	        };
	        // Bind these LocationService functions to $location
	        common_1.bindFunctions($location, coreservices_1.services.location, $location, ["replace", "url", "path", "search", "hash"]);
	        // Bind these LocationConfig functions to $location
	        common_1.bindFunctions($location, coreservices_1.services.locationConfig, $location, ['port', 'protocol', 'host']);
	        // Bind these LocationConfig functions to $browser
	        common_1.bindFunctions($browser, coreservices_1.services.locationConfig, $browser, ['baseHref']);
	        return router;
	    }
	}
	// The 'ui.router' ng1 module depends on 'ui.router.init' module.
	angular.module('ui.router.init', []).provider("$uiRouter", $uiRouter);
	runBlock.$inject = ['$injector', '$q'];
	function runBlock($injector, $q) {
	    coreservices_1.services.$injector = $injector;
	    coreservices_1.services.$q = $q;
	}
	angular.module('ui.router.init').run(runBlock);
	// This effectively calls $get() to init when we enter runtime
	angular.module('ui.router.init').run(['$uiRouter', function ($uiRouter) { }]);
	// $urlMatcherFactory service and $urlMatcherFactoryProvider
	angular.module('ui.router.util').provider('$urlMatcherFactory', ['$uiRouterProvider', function () { return router.urlMatcherFactory; }]);
	angular.module('ui.router.util').run(['$urlMatcherFactory', function ($urlMatcherFactory) { }]);
	// $urlRouter service and $urlRouterProvider
	function getUrlRouterProvider() {
	    router.urlRouterProvider["$get"] = function () {
	        router.urlRouter.update(true);
	        if (!this.interceptDeferred)
	            router.urlRouter.listen();
	        return router.urlRouter;
	    };
	    return router.urlRouterProvider;
	}
	angular.module('ui.router.router').provider('$urlRouter', ['$uiRouterProvider', getUrlRouterProvider]);
	angular.module('ui.router.router').run(['$urlRouter', function ($urlRouter) { }]);
	// $state service and $stateProvider
	// $urlRouter service and $urlRouterProvider
	function getStateProvider() {
	    router.stateProvider["$get"] = function () {
	        // Autoflush once we are in runtime
	        router.stateRegistry.stateQueue.autoFlush(router.stateService);
	        return router.stateService;
	    };
	    return router.stateProvider;
	}
	angular.module('ui.router.state').provider('$state', ['$uiRouterProvider', getStateProvider]);
	angular.module('ui.router.state').run(['$state', function ($state) { }]);
	// $stateParams service
	angular.module('ui.router.state').factory('$stateParams', ['$uiRouter', function ($uiRouter) {
	        return $uiRouter.globals.params;
	    }]);
	// $transitions service and $transitionsProvider
	function getTransitionsProvider() {
	    router.transitionService["$get"] = function () { return router.transitionService; };
	    return router.transitionService;
	}
	angular.module('ui.router.state').provider('$transitions', ['$uiRouterProvider', getTransitionsProvider]);
	// $templateFactory service
	angular.module('ui.router.util').factory('$templateFactory', ['$uiRouter', function () { return new templateFactory_1.TemplateFactory(); }]);
	// The $view service
	angular.module('ui.router').factory('$view', function () { return router.viewService; });
	// The old $resolve service
	angular.module('ui.router').factory('$resolve', resolveService_1.resolveFactory);
	// $trace service
	angular.module("ui.router").service("$trace", function () { return trace_1.trace; });
	watchDigests.$inject = ['$rootScope'];
	function watchDigests($rootScope) {
	    $rootScope.$watch(function () { trace_1.trace.approximateDigests++; });
	}
	exports.watchDigests = watchDigests;
	angular.module("ui.router").run(watchDigests);
	exports.getLocals = function (ctx) {
	    var tokens = ctx.getTokens().filter(predicates_1.isString);
	    var tuples = tokens.map(function (key) { return [key, ctx.getResolvable(key).data]; });
	    return tuples.reduce(common_1.applyPairs, {});
	};
	/** Injectable services */
	/**
	 * An injectable service object which has the current state parameters
	 *
	 * This angular service (singleton object) holds the current state parameters.
	 * The values in `$stateParams` are not updated until *after* a [[Transition]] successfully completes.
	 *
	 * This object can be injected into other services.
	 *
	 * @example
	 * ```js
	 *
	 * SomeService.$inject = ['$http', '$stateParams'];
	 * function SomeService($http, $stateParams) {
	 *   return {
	 *     getUser: function() {
	 *       return $http.get('/api/users/' + $stateParams.username);
	 *     }
	 *   }
	 * };
	 * angular.service('SomeService', SomeService);
	 * ```
	 *
	 * ### Deprecation warning:
	 *
	 * When `$stateParams` is injected into transition hooks, resolves and view controllers, they receive a different
	 * object than this global service object.  In those cases, the injected object has the parameter values for the
	 * *pending* Transition.
	 *
	 * Because of these confusing details, this service is deprecated.
	 *
	 * @deprecated Instead of using `$stateParams, inject the current [[Transition]] as `$transition$` and use [[Transition.params]]
	 * ```js
	 * MyController.$inject = ['$transition$'];
	 * function MyController($transition$) {
	 *   var username = $transition$.params().username;
	 *   // .. do something with username
	 * }
	 * ```
	 */
	var $stateParams;
	/**
	 * An injectable service primarily used to register transition hooks
	 *
	 * This angular service exposes the [[TransitionService]] singleton, which is primarily used to add transition hooks.
	 *
	 * The same object is also exposed as [[$transitionsProvider]] for injection during angular config time.
	 */
	var $transitions;
	/**
	 * A config-time injectable provider primarily used to register transition hooks
	 *
	 * This angular provider exposes the [[TransitionService]] singleton, which is primarily used to add transition hooks.
	 *
	 * The same object is also exposed as [[$transitions]] for injection at runtime.
	 */
	var $transitionsProvider;
	/**
	 * An injectable service used to query for current state information.
	 *
	 * This angular service exposes the [[StateService]] singleton.
	 */
	var $state;
	/**
	 * A config-time injectable provider used to register states.
	 *
	 * This angular service exposes the [[StateProvider]] singleton.
	 */
	var $stateProvider;
	/**
	 * A config-time injectable provider used to manage the URL.
	 *
	 * This angular service exposes the [[UrlRouterProvider]] singleton.
	 */
	var $urlRouterProvider;
	/**
	 * An injectable service used to configure URL redirects.
	 *
	 * This angular service exposes the [[UrlRouter]] singleton.
	 */
	var $urlRouter;
	/**
	 * An injectable service used to configure the URL.
	 *
	 * This service is used to set url mapping options, and create [[UrlMatcher]] objects.
	 *
	 * This angular service exposes the [[UrlMatcherFactory]] singleton.
	 * The singleton is also exposed at config-time as the [[$urlMatcherFactoryProvider]].
	 */
	var $urlMatcherFactory;
	/**
	 * An injectable service used to configure the URL.
	 *
	 * This service is used to set url mapping options, and create [[UrlMatcher]] objects.
	 *
	 * This angular service exposes the [[UrlMatcherFactory]] singleton at config-time.
	 * The singleton is also exposed at runtime as the [[$urlMatcherFactory]].
	 */
	var $urlMatcherFactoryProvider;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module ng1 */ /** */
	var stateObject_1 = __webpack_require__(43);
	var node_1 = __webpack_require__(21);
	var resolveContext_1 = __webpack_require__(17);
	var common_1 = __webpack_require__(3);
	var stateBuilder_1 = __webpack_require__(41);
	/**
	 * Implementation of the legacy `$resolve` service for angular 1.
	 */
	var $resolve = {
	    /**
	     * Asynchronously injects a resolve block.
	     *
	     * This emulates most of the behavior of the ui-router 0.2.x $resolve.resolve() service API.
	     *
	     * Given an object `invocables`, where keys are strings and values are injectable functions,
	     * injects each function, and waits for the resulting promise to resolve.
	     * When all resulting promises are resolved, returns the results as an object.
	     *
	     * @example
	     * ```js
	     *
	     * let invocables = {
	     *   foo: [ '$http', ($http) =>
	     *            $http.get('/api/foo').then(resp => resp.data) ],
	     *   bar: [ 'foo', '$http', (foo, $http) =>
	     *            $http.get('/api/bar/' + foo.barId).then(resp => resp.data) ]
	     * }
	     * $resolve.resolve(invocables)
	     *     .then(results => console.log(results.foo, results.bar))
	     * // Logs foo and bar:
	     * // { id: 123, barId: 456, fooData: 'foo data' }
	     * // { id: 456, barData: 'bar data' }
	     * ```
	     *
	     * @param invocables an object which looks like an [[StateDefinition.resolve]] object; keys are resolve names and values are injectable functions
	     * @param locals key/value pre-resolved data (locals)
	     * @param parent a promise for a "parent resolve"
	     */
	    resolve: function (invocables, locals, parent) {
	        if (locals === void 0) { locals = {}; }
	        var parentNode = new node_1.PathNode(new stateObject_1.State({ params: {}, resolvables: [] }));
	        var node = new node_1.PathNode(new stateObject_1.State({ params: {}, resolvables: [] }));
	        var context = new resolveContext_1.ResolveContext([parentNode, node]);
	        context.addResolvables(stateBuilder_1.resolvablesBuilder({ resolve: invocables }), node.state);
	        var resolveData = function (parentLocals) {
	            var rewrap = function (_locals) { return stateBuilder_1.resolvablesBuilder({ resolve: common_1.mapObj(_locals, function (local) { return function () { return local; }; }) }); };
	            context.addResolvables(rewrap(parentLocals), parentNode.state);
	            context.addResolvables(rewrap(locals), node.state);
	            var tuples2ObjR = function (acc, tuple) {
	                acc[tuple.token] = tuple.value;
	                return acc;
	            };
	            return context.resolvePath().then(function (results) { return results.reduce(tuples2ObjR, {}); });
	        };
	        return parent ? parent.then(resolveData) : resolveData({});
	    }
	};
	/** @hidden */
	exports.resolveFactory = function () { return $resolve; };


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(3);
	var strings_1 = __webpack_require__(9);
	var view_1 = __webpack_require__(38);
	var predicates_1 = __webpack_require__(4);
	var coreservices_1 = __webpack_require__(6);
	var trace_1 = __webpack_require__(12);
	var templateFactory_1 = __webpack_require__(57);
	var resolveContext_1 = __webpack_require__(17);
	var resolvable_1 = __webpack_require__(19);
	exports.ng1ViewConfigFactory = function (path, view) {
	    return [new Ng1ViewConfig(path, view)];
	};
	/**
	 * This is a [[StateBuilder.builder]] function for angular1 `views`.
	 *
	 * When the [[StateBuilder]] builds a [[State]] object from a raw [[StateDeclaration]], this builder
	 * handles the `views` property with logic specific to angular-ui-router (ng1).
	 *
	 * If no `views: {}` property exists on the [[StateDeclaration]], then it creates the `views` object
	 * and applies the state-level configuration to a view named `$default`.
	 */
	function ng1ViewsBuilder(state) {
	    var tplKeys = ['templateProvider', 'templateUrl', 'template', 'notify', 'async'], ctrlKeys = ['controller', 'controllerProvider', 'controllerAs', 'resolveAs'], compKeys = ['component', 'bindings'], nonCompKeys = tplKeys.concat(ctrlKeys), allKeys = compKeys.concat(nonCompKeys);
	    var views = {}, viewsObject = state.views || { "$default": common_1.pick(state, allKeys) };
	    common_1.forEach(viewsObject, function (config, name) {
	        // Account for views: { "": { template... } }
	        name = name || "$default";
	        // Account for views: { header: "headerComponent" }
	        if (predicates_1.isString(config))
	            config = { component: config };
	        if (!Object.keys(config).length)
	            return;
	        // Configure this view for routing to an angular 1.5+ style .component (or any directive, really)
	        if (config.component) {
	            if (nonCompKeys.map(function (key) { return predicates_1.isDefined(config[key]); }).reduce(common_1.anyTrueR, false)) {
	                throw new Error("Cannot combine: " + compKeys.join("|") + " with: " + nonCompKeys.join("|") + " in stateview: 'name@" + state.name + "'");
	            }
	            // Dynamically build a template like "<component-name input1='::$resolve.foo'></component-name>"
	            config.templateProvider = ['$injector', function ($injector) {
	                    var resolveFor = function (key) {
	                        return config.bindings && config.bindings[key] || key;
	                    };
	                    var prefix = angular.version.minor >= 3 ? "::" : "";
	                    var attributeTpl = function (input) {
	                        var attrName = strings_1.kebobString(input.name);
	                        var resolveName = resolveFor(input.name);
	                        if (input.type === '@')
	                            return attrName + "='{{" + prefix + "$resolve." + resolveName + "}}'";
	                        return attrName + "='" + prefix + "$resolve." + resolveName + "'";
	                    };
	                    var attrs = getComponentInputs($injector, config.component).map(attributeTpl).join(" ");
	                    var kebobName = strings_1.kebobString(config.component);
	                    return "<" + kebobName + " " + attrs + "></" + kebobName + ">";
	                }];
	        }
	        config.resolveAs = config.resolveAs || '$resolve';
	        config.$type = "ng1";
	        config.$context = state;
	        config.$name = name;
	        var normalized = view_1.ViewService.normalizeUIViewTarget(config.$context, config.$name);
	        config.$uiViewName = normalized.uiViewName;
	        config.$uiViewContextAnchor = normalized.uiViewContextAnchor;
	        views[name] = config;
	    });
	    return views;
	}
	exports.ng1ViewsBuilder = ng1ViewsBuilder;
	// for ng 1.2 style, process the scope: { input: "=foo" }
	// for ng 1.3 through ng 1.5, process the component's bindToController: { input: "=foo" } object
	var scopeBindings = function (bindingsObj) { return Object.keys(bindingsObj || {})
	    .map(function (key) { return [key, /^([=<@])[?]?(.*)/.exec(bindingsObj[key])]; }) // [ 'input', [ '=foo', '=', 'foo' ] ]
	    .filter(function (tuple) { return predicates_1.isDefined(tuple) && predicates_1.isDefined(tuple[1]); }) // skip malformed values
	    .map(function (tuple) { return ({ name: tuple[1][2] || tuple[0], type: tuple[1][1] }); }); }; // { name: ('foo' || 'input'), type: '=' }
	// Given a directive definition, find its object input attributes
	// Use different properties, depending on the type of directive (component, bindToController, normal)
	var getBindings = function (def) {
	    if (predicates_1.isObject(def.bindToController))
	        return scopeBindings(def.bindToController);
	    return scopeBindings(def.scope);
	};
	// Gets all the directive(s)' inputs ('@', '=', and '<')
	function getComponentInputs($injector, name) {
	    var cmpDefs = $injector.get(name + "Directive"); // could be multiple
	    if (!cmpDefs || !cmpDefs.length)
	        throw new Error("Unable to find component named '" + name + "'");
	    return cmpDefs.map(getBindings).reduce(common_1.unnestR, []);
	}
	var id = 0;
	var Ng1ViewConfig = (function () {
	    function Ng1ViewConfig(path, viewDecl) {
	        this.path = path;
	        this.viewDecl = viewDecl;
	        this.$id = id++;
	        this.loaded = false;
	    }
	    Ng1ViewConfig.prototype.load = function () {
	        var _this = this;
	        var $q = coreservices_1.services.$q;
	        if (!this.hasTemplate())
	            throw new Error("No template configuration specified for '" + this.viewDecl.$uiViewName + "@" + this.viewDecl.$uiViewContextAnchor + "'");
	        var context = new resolveContext_1.ResolveContext(this.path);
	        var params = this.path.reduce(function (acc, node) { return common_1.extend(acc, node.paramValues); }, {});
	        var promises = {
	            template: $q.when(this.getTemplate(params, new templateFactory_1.TemplateFactory(), context)),
	            controller: $q.when(this.getController(context))
	        };
	        return $q.all(promises).then(function (results) {
	            trace_1.trace.traceViewServiceEvent("Loaded", _this);
	            _this.controller = results.controller;
	            _this.template = results.template;
	            return _this;
	        });
	    };
	    /**
	     * Checks a view configuration to ensure that it specifies a template.
	     *
	     * @return {boolean} Returns `true` if the configuration contains a valid template, otherwise `false`.
	     */
	    Ng1ViewConfig.prototype.hasTemplate = function () {
	        return !!(this.viewDecl.template || this.viewDecl.templateUrl || this.viewDecl.templateProvider);
	    };
	    Ng1ViewConfig.prototype.getTemplate = function (params, $factory, context) {
	        return $factory.fromConfig(this.viewDecl, params, context);
	    };
	    /**
	     * Gets the controller for a view configuration.
	     *
	     * @returns {Function|Promise.<Function>} Returns a controller, or a promise that resolves to a controller.
	     */
	    Ng1ViewConfig.prototype.getController = function (context) {
	        var provider = this.viewDecl.controllerProvider;
	        if (!predicates_1.isInjectable(provider))
	            return this.viewDecl.controller;
	        var deps = coreservices_1.services.$injector.annotate(provider);
	        var providerFn = predicates_1.isArray(provider) ? common_1.tail(provider) : provider;
	        var resolvable = new resolvable_1.Resolvable("", providerFn, deps);
	        return resolvable.get(context);
	    };
	    return Ng1ViewConfig;
	}());
	exports.Ng1ViewConfig = Ng1ViewConfig;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/** @module view */ /** for typedoc */
	var predicates_1 = __webpack_require__(4);
	var coreservices_1 = __webpack_require__(6);
	var common_1 = __webpack_require__(3);
	var resolvable_1 = __webpack_require__(19);
	/**
	 * Service which manages loading of templates from a ViewConfig.
	 */
	var TemplateFactory = (function () {
	    function TemplateFactory() {
	    }
	    /**
	     * Creates a template from a configuration object.
	     *
	     * @param config Configuration object for which to load a template.
	     * The following properties are search in the specified order, and the first one
	     * that is defined is used to create the template:
	     *
	     * @param params  Parameters to pass to the template function.
	     * @param context The resolve context associated with the template's view
	     *
	     * @return {string|object}  The template html as a string, or a promise for
	     * that string,or `null` if no template is configured.
	     */
	    TemplateFactory.prototype.fromConfig = function (config, params, context) {
	        return (predicates_1.isDefined(config.template) ? this.fromString(config.template, params) :
	            predicates_1.isDefined(config.templateUrl) ? this.fromUrl(config.templateUrl, params) :
	                predicates_1.isDefined(config.templateProvider) ? this.fromProvider(config.templateProvider, params, context) :
	                    null);
	    };
	    ;
	    /**
	     * Creates a template from a string or a function returning a string.
	     *
	     * @param template html template as a string or function that returns an html template as a string.
	     * @param params Parameters to pass to the template function.
	     *
	     * @return {string|object} The template html as a string, or a promise for that
	     * string.
	     */
	    TemplateFactory.prototype.fromString = function (template, params) {
	        return predicates_1.isFunction(template) ? template(params) : template;
	    };
	    ;
	    /**
	     * Loads a template from the a URL via `$http` and `$templateCache`.
	     *
	     * @param {string|Function} url url of the template to load, or a function
	     * that returns a url.
	     * @param {Object} params Parameters to pass to the url function.
	     * @return {string|Promise.<string>} The template html as a string, or a promise
	     * for that string.
	     */
	    TemplateFactory.prototype.fromUrl = function (url, params) {
	        if (predicates_1.isFunction(url))
	            url = url(params);
	        if (url == null)
	            return null;
	        return coreservices_1.services.template.get(url);
	    };
	    ;
	    /**
	     * Creates a template by invoking an injectable provider function.
	     *
	     * @param provider Function to invoke via `locals`
	     * @param {Function} injectFn a function used to invoke the template provider
	     * @return {string|Promise.<string>} The template html as a string, or a promise
	     * for that string.
	     */
	    TemplateFactory.prototype.fromProvider = function (provider, params, context) {
	        var deps = coreservices_1.services.$injector.annotate(provider);
	        var providerFn = predicates_1.isArray(provider) ? common_1.tail(provider) : provider;
	        var resolvable = new resolvable_1.Resolvable("", providerFn, deps);
	        return resolvable.get(context);
	    };
	    ;
	    return TemplateFactory;
	}());
	exports.TemplateFactory = TemplateFactory;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var coreservices_1 = __webpack_require__(6);
	var services_1 = __webpack_require__(54);
	var resolveContext_1 = __webpack_require__(17);
	var common_1 = __webpack_require__(3);
	/**
	 * This is a [[StateBuilder.builder]] function for angular1 `onEnter`, `onExit`,
	 * `onRetain` callback hooks on a [[Ng1StateDeclaration]].
	 *
	 * When the [[StateBuilder]] builds a [[State]] object from a raw [[StateDeclaration]], this builder
	 * ensures that those hooks are injectable for angular-ui-router (ng1).
	 */
	exports.getStateHookBuilder = function (hookName) {
	    return function stateHookBuilder(state, parentFn) {
	        var hook = state[hookName];
	        function decoratedNg1Hook(trans, state) {
	            var resolveContext = new resolveContext_1.ResolveContext(trans.treeChanges().to);
	            return coreservices_1.services.$injector.invoke(hook, this, common_1.extend({ $state$: state }, services_1.getLocals(resolveContext)));
	        }
	        return hook ? decoratedNg1Hook : undefined;
	    };
	};


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * These are the UI-Router angular 1 directives.
	 *
	 * These directives are used in templates to create viewports and navigate to states
	 *
	 * @preferred @module ng1_directives
	 */ /** for typedoc */
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var hof_1 = __webpack_require__(5);
	/** @hidden */
	function parseStateRef(ref, current) {
	    var preparsed = ref.match(/^\s*({[^}]*})\s*$/), parsed;
	    if (preparsed)
	        ref = current + '(' + preparsed[1] + ')';
	    parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
	    if (!parsed || parsed.length !== 4)
	        throw new Error("Invalid state ref '" + ref + "'");
	    return { state: parsed[1], paramExpr: parsed[3] || null };
	}
	/** @hidden */
	function stateContext(el) {
	    var $uiView = el.parent().inheritedData('$uiView');
	    var path = hof_1.parse('$cfg.path')($uiView);
	    return path ? common_1.tail(path).state.name : undefined;
	}
	/** @hidden */
	function getTypeInfo(el) {
	    // SVGAElement does not use the href attribute, but rather the 'xlinkHref' attribute.
	    var isSvg = Object.prototype.toString.call(el.prop('href')) === '[object SVGAnimatedString]';
	    var isForm = el[0].nodeName === "FORM";
	    return {
	        attr: isForm ? "action" : (isSvg ? 'xlink:href' : 'href'),
	        isAnchor: el.prop("tagName").toUpperCase() === "A",
	        clickable: !isForm
	    };
	}
	/** @hidden */
	function clickHook(el, $state, $timeout, type, current) {
	    return function (e) {
	        var button = e.which || e.button, target = current();
	        if (!(button > 1 || e.ctrlKey || e.metaKey || e.shiftKey || el.attr('target'))) {
	            // HACK: This is to allow ng-clicks to be processed before the transition is initiated:
	            var transition = $timeout(function () {
	                $state.go(target.state, target.params, target.options);
	            });
	            e.preventDefault();
	            e.stopPropagation();
	            // if the state has no URL, ignore one preventDefault from the <a> directive.
	            var ignorePreventDefaultCount = type.isAnchor && !target.href ? 1 : 0;
	            e.preventDefault = function () {
	                if (ignorePreventDefaultCount-- <= 0)
	                    $timeout.cancel(transition);
	            };
	        }
	    };
	}
	/** @hidden */
	function defaultOpts(el, $state) {
	    return {
	        relative: stateContext(el) || $state.$current,
	        inherit: true,
	        source: "sref"
	    };
	}
	/**
	 * `ui-sref`: A directive for linking to a state
	 *
	 * A directive that binds a link (`<a>` tag) to a state.
	 * If the state has an associated URL, the directive will automatically generate and
	 * update the `href` attribute via the [[StateService.href]]  method.
	 * Clicking the link will trigger a state transition with optional parameters.
	 *
	 * Also middle-clicking, right-clicking, and ctrl-clicking on the link will be
	 * handled natively by the browser.
	 *
	 * You can also use relative state paths within ui-sref, just like the relative
	 * paths passed to `$state.go()`.
	 * You just need to be aware that the path is relative to the state that the link lives in.
	 * In other words, the state that created the view containing the link.
	 *
	 * You can specify options to pass to [[StateService.go]] using the `ui-sref-opts` attribute.
	 * Options are restricted to `location`, `inherit`, and `reload`.
	 *
	 * Here's an example of how you'd use ui-sref and how it would compile.
	 * If you have the following template:
	 *
	 * @example
	 * ```html
	 *
	 * <pre>
	 * <a ui-sref="home">Home</a> | <a ui-sref="about">About</a> | <a ui-sref="{page: 2}">Next page</a>
	 *
	 * <ul>
	 *     <li ng-repeat="contact in contacts">
	 *         <a ui-sref="contacts.detail({ id: contact.id })">{{ contact.name }}</a>
	 *     </li>
	 * </ul>
	 * </pre>
	 * ```
	 *
	 * Then the compiled html would be (assuming Html5Mode is off and current state is contacts):
	 *
	 * ```html
	 *
	 * <pre>
	 * <a href="#/home" ui-sref="home">Home</a> | <a href="#/about" ui-sref="about">About</a> | <a href="#/contacts?page=2" ui-sref="{page: 2}">Next page</a>
	 *
	 * <ul>
	 *     <li ng-repeat="contact in contacts">
	 *         <a href="#/contacts/1" ui-sref="contacts.detail({ id: contact.id })">Joe</a>
	 *     </li>
	 *     <li ng-repeat="contact in contacts">
	 *         <a href="#/contacts/2" ui-sref="contacts.detail({ id: contact.id })">Alice</a>
	 *     </li>
	 *     <li ng-repeat="contact in contacts">
	 *         <a href="#/contacts/3" ui-sref="contacts.detail({ id: contact.id })">Bob</a>
	 *     </li>
	 * </ul>
	 *
	 * <a ui-sref="home" ui-sref-opts="{reload: true}">Home</a>
	 * </pre>
	 * ```
	 *
	 * @param {string} ui-sref 'stateName' can be any valid absolute or relative state
	 * @param {Object} ui-sref-opts options to pass to [[StateService.go]]
	 */
	var uiSref = ['$state', '$timeout',
	    function $StateRefDirective($state, $timeout) {
	        return {
	            restrict: 'A',
	            require: ['?^uiSrefActive', '?^uiSrefActiveEq'],
	            link: function (scope, element, attrs, uiSrefActive) {
	                var ref = parseStateRef(attrs.uiSref, $state.current.name);
	                var def = { state: ref.state, href: null, params: null, options: null };
	                var type = getTypeInfo(element);
	                var active = uiSrefActive[1] || uiSrefActive[0];
	                var unlinkInfoFn = null;
	                var hookFn;
	                def.options = common_1.extend(defaultOpts(element, $state), attrs.uiSrefOpts ? scope.$eval(attrs.uiSrefOpts) : {});
	                var update = function (val) {
	                    if (val)
	                        def.params = angular.copy(val);
	                    def.href = $state.href(ref.state, def.params, def.options);
	                    if (unlinkInfoFn)
	                        unlinkInfoFn();
	                    if (active)
	                        unlinkInfoFn = active.$$addStateInfo(ref.state, def.params);
	                    if (def.href !== null)
	                        attrs.$set(type.attr, def.href);
	                };
	                if (ref.paramExpr) {
	                    scope.$watch(ref.paramExpr, function (val) { if (val !== def.params)
	                        update(val); }, true);
	                    def.params = angular.copy(scope.$eval(ref.paramExpr));
	                }
	                update();
	                if (!type.clickable)
	                    return;
	                hookFn = clickHook(element, $state, $timeout, type, function () { return def; });
	                element.bind("click", hookFn);
	                scope.$on('$destroy', function () {
	                    element.unbind("click", hookFn);
	                });
	            }
	        };
	    }];
	/**
	 * `ui-state`: A dynamic version of `ui-sref`
	 *
	 * Much like ui-sref, but will accept named $scope properties to evaluate for a state definition,
	 * params and override options.
	 *
	 * @example
	 * ```html
	 *
	 * <li ng-repeat="nav in navlinks">
	 *   <a ui-state="nav.statename">{{nav.description}}</a>
	 * </li>
	 *
	 * @param {string} ui-state 'stateName' can be any valid absolute or relative state
	 * @param {Object} ui-state-params params to pass to [[StateService.href]]
	 * @param {Object} ui-state-opts options to pass to [[StateService.go]]
	 */
	var uiState = ['$state', '$timeout',
	    function $StateRefDynamicDirective($state, $timeout) {
	        return {
	            restrict: 'A',
	            require: ['?^uiSrefActive', '?^uiSrefActiveEq'],
	            link: function (scope, element, attrs, uiSrefActive) {
	                var type = getTypeInfo(element);
	                var active = uiSrefActive[1] || uiSrefActive[0];
	                var group = [attrs.uiState, attrs.uiStateParams || null, attrs.uiStateOpts || null];
	                var watch = '[' + group.map(function (val) { return val || 'null'; }).join(', ') + ']';
	                var def = { state: null, params: null, options: null, href: null };
	                var unlinkInfoFn = null;
	                var hookFn;
	                function runStateRefLink(group) {
	                    def.state = group[0];
	                    def.params = group[1];
	                    def.options = group[2];
	                    def.href = $state.href(def.state, def.params, def.options);
	                    if (unlinkInfoFn)
	                        unlinkInfoFn();
	                    if (active)
	                        unlinkInfoFn = active.$$addStateInfo(def.state, def.params);
	                    if (def.href)
	                        attrs.$set(type.attr, def.href);
	                }
	                scope.$watch(watch, runStateRefLink, true);
	                runStateRefLink(scope.$eval(watch));
	                if (!type.clickable)
	                    return;
	                hookFn = clickHook(element, $state, $timeout, type, function () { return def; });
	                element.bind("click", hookFn);
	                scope.$on('$destroy', function () {
	                    element.unbind("click", hookFn);
	                });
	            }
	        };
	    }];
	/**
	 * `ui-sref-active` and `ui-sref-active-eq`: A directive that adds a CSS class when a `ui-sref` is active
	 *
	 * A directive working alongside ui-sref to add classes to an element when the
	 * related ui-sref directive's state is active, and removing them when it is inactive.
	 * The primary use-case is to simplify the special appearance of navigation menus
	 * relying on `ui-sref`, by having the "active" state's menu button appear different,
	 * distinguishing it from the inactive menu items.
	 *
	 * ui-sref-active can live on the same element as ui-sref or on a parent element. The first
	 * ui-sref-active found at the same level or above the ui-sref will be used.
	 *
	 * Will activate when the ui-sref's target state or any child state is active. If you
	 * need to activate only when the ui-sref target state is active and *not* any of
	 * it's children, then you will use ui-sref-active-eq
	 *
	 * Given the following template:
	 * @example
	 * ```html
	 *
	 * <pre>
	 * <ul>
	 *   <li ui-sref-active="active" class="item">
	 *     <a href ui-sref="app.user({user: 'bilbobaggins'})">@bilbobaggins</a>
	 *   </li>
	 * </ul>
	 * </pre>
	 * ```
	 *
	 *
	 * When the app state is "app.user" (or any children states), and contains the state parameter "user" with value "bilbobaggins",
	 * the resulting HTML will appear as (note the 'active' class):
	 *
	 * ```html
	 *
	 * <pre>
	 * <ul>
	 *   <li ui-sref-active="active" class="item active">
	 *     <a ui-sref="app.user({user: 'bilbobaggins'})" href="/users/bilbobaggins">@bilbobaggins</a>
	 *   </li>
	 * </ul>
	 * </pre>
	 * ```
	 *
	 * The class name is interpolated **once** during the directives link time (any further changes to the
	 * interpolated value are ignored).
	 *
	 * Multiple classes may be specified in a space-separated format:
	 *
	 * ```html
	 * <pre>
	 * <ul>
	 *   <li ui-sref-active='class1 class2 class3'>
	 *     <a ui-sref="app.user">link</a>
	 *   </li>
	 * </ul>
	 * </pre>
	 * ```
	 *
	 * It is also possible to pass ui-sref-active an expression that evaluates
	 * to an object hash, whose keys represent active class names and whose
	 * values represent the respective state names/globs.
	 * ui-sref-active will match if the current active state **includes** any of
	 * the specified state names/globs, even the abstract ones.
	 *
	 * Given the following template, with "admin" being an abstract state:
	 * @example
	 * ```html
	 *
	 * <pre>
	 * <div ui-sref-active="{'active': 'admin.*'}">
	 *   <a ui-sref-active="active" ui-sref="admin.roles">Roles</a>
	 * </div>
	 * </pre>
	 * ```
	 *
	 * When the current state is "admin.roles" the "active" class will be applied
	 * to both the <div> and <a> elements. It is important to note that the state
	 * names/globs passed to ui-sref-active shadow the state provided by ui-sref.
	 */
	var uiSrefActive = ['$state', '$stateParams', '$interpolate', '$transitions', '$uiRouter',
	    function $StateRefActiveDirective($state, $stateParams, $interpolate, $transitions, $uiRouter) {
	        return {
	            restrict: "A",
	            controller: ['$scope', '$element', '$attrs', '$timeout',
	                function ($scope, $element, $attrs, $timeout) {
	                    var states = [], activeClasses = {}, activeEqClass, uiSrefActive;
	                    // There probably isn't much point in $observing this
	                    // uiSrefActive and uiSrefActiveEq share the same directive object with some
	                    // slight difference in logic routing
	                    activeEqClass = $interpolate($attrs.uiSrefActiveEq || '', false)($scope);
	                    try {
	                        uiSrefActive = $scope.$eval($attrs.uiSrefActive);
	                    }
	                    catch (e) {
	                    }
	                    uiSrefActive = uiSrefActive || $interpolate($attrs.uiSrefActive || '', false)($scope);
	                    if (predicates_1.isObject(uiSrefActive)) {
	                        common_1.forEach(uiSrefActive, function (stateOrName, activeClass) {
	                            if (predicates_1.isString(stateOrName)) {
	                                var ref = parseStateRef(stateOrName, $state.current.name);
	                                addState(ref.state, $scope.$eval(ref.paramExpr), activeClass);
	                            }
	                        });
	                    }
	                    // Allow uiSref to communicate with uiSrefActive[Equals]
	                    this.$$addStateInfo = function (newState, newParams) {
	                        // we already got an explicit state provided by ui-sref-active, so we
	                        // shadow the one that comes from ui-sref
	                        if (predicates_1.isObject(uiSrefActive) && states.length > 0) {
	                            return;
	                        }
	                        var deregister = addState(newState, newParams, uiSrefActive);
	                        update();
	                        return deregister;
	                    };
	                    function updateAfterTransition(trans) { trans.promise.then(update); }
	                    $scope.$on('$stateChangeSuccess', update);
	                    $scope.$on('$destroy', $transitions.onStart({}, updateAfterTransition));
	                    if ($uiRouter.globals.transition) {
	                        updateAfterTransition($uiRouter.globals.transition);
	                    }
	                    function addState(stateName, stateParams, activeClass) {
	                        var state = $state.get(stateName, stateContext($element));
	                        var stateHash = createStateHash(stateName, stateParams);
	                        var stateInfo = {
	                            state: state || { name: stateName },
	                            params: stateParams,
	                            hash: stateHash
	                        };
	                        states.push(stateInfo);
	                        activeClasses[stateHash] = activeClass;
	                        return function removeState() {
	                            var idx = states.indexOf(stateInfo);
	                            if (idx !== -1)
	                                states.splice(idx, 1);
	                        };
	                    }
	                    /**
	                     * @param {string} state
	                     * @param {Object|string} [params]
	                     * @return {string}
	                     */
	                    function createStateHash(state, params) {
	                        if (!predicates_1.isString(state)) {
	                            throw new Error('state should be a string');
	                        }
	                        if (predicates_1.isObject(params)) {
	                            return state + common_1.toJson(params);
	                        }
	                        params = $scope.$eval(params);
	                        if (predicates_1.isObject(params)) {
	                            return state + common_1.toJson(params);
	                        }
	                        return state;
	                    }
	                    // Update route state
	                    function update() {
	                        for (var i = 0; i < states.length; i++) {
	                            if (anyMatch(states[i].state, states[i].params)) {
	                                addClass($element, activeClasses[states[i].hash]);
	                            }
	                            else {
	                                removeClass($element, activeClasses[states[i].hash]);
	                            }
	                            if (exactMatch(states[i].state, states[i].params)) {
	                                addClass($element, activeEqClass);
	                            }
	                            else {
	                                removeClass($element, activeEqClass);
	                            }
	                        }
	                    }
	                    function addClass(el, className) { $timeout(function () { el.addClass(className); }); }
	                    function removeClass(el, className) { el.removeClass(className); }
	                    function anyMatch(state, params) { return $state.includes(state.name, params); }
	                    function exactMatch(state, params) { return $state.is(state.name, params); }
	                    update();
	                }]
	        };
	    }];
	angular.module('ui.router.state')
	    .directive('uiSref', uiSref)
	    .directive('uiSrefActive', uiSrefActive)
	    .directive('uiSrefActiveEq', uiSrefActive)
	    .directive('uiState', uiState);


/***/ },
/* 60 */
/***/ function(module, exports) {

	/** @module state */ /** for typedoc */
	"use strict";
	/**
	 * @ngdoc filter
	 * @name ui.router.state.filter:isState
	 *
	 * @requires ui.router.state.$state
	 *
	 * @description
	 * Translates to {@link ui.router.state.$state#methods_is $state.is("stateName")}.
	 */
	$IsStateFilter.$inject = ['$state'];
	function $IsStateFilter($state) {
	    var isFilter = function (state, params, options) {
	        return $state.is(state, params, options);
	    };
	    isFilter.$stateful = true;
	    return isFilter;
	}
	exports.$IsStateFilter = $IsStateFilter;
	/**
	 * @ngdoc filter
	 * @name ui.router.state.filter:includedByState
	 *
	 * @requires ui.router.state.$state
	 *
	 * @description
	 * Translates to {@link ui.router.state.$state#methods_includes $state.includes('fullOrPartialStateName')}.
	 */
	$IncludedByStateFilter.$inject = ['$state'];
	function $IncludedByStateFilter($state) {
	    var includesFilter = function (state, params, options) {
	        return $state.includes(state, params, options);
	    };
	    includesFilter.$stateful = true;
	    return includesFilter;
	}
	exports.$IncludedByStateFilter = $IncludedByStateFilter;
	angular.module('ui.router.state')
	    .filter('isState', $IsStateFilter)
	    .filter('includedByState', $IncludedByStateFilter);


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/** @module ng1_directives */ /** for typedoc */
	"use strict";
	var common_1 = __webpack_require__(3);
	var predicates_1 = __webpack_require__(4);
	var trace_1 = __webpack_require__(12);
	var views_1 = __webpack_require__(56);
	var hof_1 = __webpack_require__(5);
	var resolveContext_1 = __webpack_require__(17);
	var strings_1 = __webpack_require__(9);
	var services_1 = __webpack_require__(54);
	/**
	 * `ui-view`: A viewport directive which is filled in by a view from the active state.
	 *
	 * @param {string=} name A view name. The name should be unique amongst the other views in the
	 * same state. You can have views of the same name that live in different states.
	 *
	 * @param {string=} autoscroll It allows you to set the scroll behavior of the browser window
	 * when a view is populated. By default, $anchorScroll is overridden by ui-router's custom scroll
	 * service, {@link ui.router.state.$uiViewScroll}. This custom service let's you
	 * scroll ui-view elements into view when they are populated during a state activation.
	 *
	 * *Note: To revert back to old [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll)
	 * functionality, call `$uiViewScrollProvider.useAnchorScroll()`.*
	 *
	 * @param {string=} onload Expression to evaluate whenever the view updates.
	 *
	 * A view can be unnamed or named.
	 * @example
	 * ```html
	 *
	 * <!-- Unnamed -->
	 * <div ui-view></div>
	 *
	 * <!-- Named -->
	 * <div ui-view="viewName"></div>
	 * ```
	 *
	 * You can only have one unnamed view within any template (or root html). If you are only using a
	 * single view and it is unnamed then you can populate it like so:
	 * ```
	 *
	 * <div ui-view></div>
	 * $stateProvider.state("home", {
	 *   template: "<h1>HELLO!</h1>"
	 * })
	 * ```
	 *
	 * The above is a convenient shortcut equivalent to specifying your view explicitly with the {@link ui.router.state.$stateProvider#views `views`}
	 * config property, by name, in this case an empty name:
	 * ```js
	 *
	 * $stateProvider.state("home", {
	 *   views: {
	 *     "": {
	 *       template: "<h1>HELLO!</h1>"
	 *     }
	 *   }
	 * })
	 * ```
	 *
	 * But typically you'll only use the views property if you name your view or have more than one view
	 * in the same template. There's not really a compelling reason to name a view if its the only one,
	 * but you could if you wanted, like so:
	 *
	 * ```html
	 *
	 * <div ui-view="main"></div>
	 * ```
	 *
	 * ```js
	 *
	 * $stateProvider.state("home", {
	 *   views: {
	 *     "main": {
	 *       template: "<h1>HELLO!</h1>"
	 *     }
	 *   }
	 * })
	 * ```
	 *
	 * Really though, you'll use views to set up multiple views:
	 * ```html
	 *
	 * <div ui-view></div>
	 * <div ui-view="chart"></div>
	 * <div ui-view="data"></div>
	 * ```
	 *
	 * ```js
	 * $stateProvider.state("home", {
	 *   views: {
	 *     "": {
	 *       template: "<h1>HELLO!</h1>"
	 *     },
	 *     "chart": {
	 *       template: "<chart_thing/>"
	 *     },
	 *     "data": {
	 *       template: "<data_thing/>"
	 *     }
	 *   }
	 * })
	 * ```
	 *
	 * Examples for `autoscroll`:
	 *
	 * ```html
	 *
	 * <!-- If autoscroll present with no expression,
	 *      then scroll ui-view into view -->
	 * <ui-view autoscroll/>
	 *
	 * <!-- If autoscroll present with valid expression,
	 *      then scroll ui-view into view if expression evaluates to true -->
	 * <ui-view autoscroll='true'/>
	 * <ui-view autoscroll='false'/>
	 * <ui-view autoscroll='scopeVariable'/>
	 * ```
	 *
	 * Resolve data:
	 *
	 * The resolved data from the state's `resolve` block is placed on the scope as `$resolve` (this
	 * can be customized using [[ViewDeclaration.resolveAs]]).  This can be then accessed from the template.
	 *
	 * Note that when `controllerAs` is being used, `$resolve` is set on the controller instance *after* the
	 * controller is instantiated.  The `$onInit()` hook can be used to perform initialization code which
	 * depends on `$resolve` data.
	 *
	 * @example
	 * ```js
	 *
	 * $stateProvider.state('home', {
	 *   template: '<my-component user="$resolve.user"></my-component>',
	 *   resolve: {
	 *     user: function(UserService) { return UserService.fetchUser(); }
	 *   }
	 * });
	 * ```
	 */
	var uiView = ['$view', '$animate', '$uiViewScroll', '$interpolate', '$q',
	    function $ViewDirective($view, $animate, $uiViewScroll, $interpolate, $q) {
	        function getRenderer(attrs, scope) {
	            return {
	                enter: function (element, target, cb) {
	                    if (angular.version.minor > 2) {
	                        $animate.enter(element, null, target).then(cb);
	                    }
	                    else {
	                        $animate.enter(element, null, target, cb);
	                    }
	                },
	                leave: function (element, cb) {
	                    if (angular.version.minor > 2) {
	                        $animate.leave(element).then(cb);
	                    }
	                    else {
	                        $animate.leave(element, cb);
	                    }
	                }
	            };
	        }
	        function configsEqual(config1, config2) {
	            return config1 === config2;
	        }
	        var rootData = {
	            $cfg: { viewDecl: { $context: $view.rootContext() } },
	            $uiView: {}
	        };
	        var directive = {
	            count: 0,
	            restrict: 'ECA',
	            terminal: true,
	            priority: 400,
	            transclude: 'element',
	            compile: function (tElement, tAttrs, $transclude) {
	                return function (scope, $element, attrs) {
	                    var previousEl, currentEl, currentScope, unregister, onloadExp = attrs['onload'] || '', autoScrollExp = attrs['autoscroll'], renderer = getRenderer(attrs, scope), viewConfig = undefined, inherited = $element.inheritedData('$uiView') || rootData, name = $interpolate(attrs['uiView'] || attrs['name'] || '')(scope) || '$default';
	                    var activeUIView = {
	                        $type: 'ng1',
	                        id: directive.count++,
	                        name: name,
	                        fqn: inherited.$uiView.fqn ? inherited.$uiView.fqn + "." + name : name,
	                        config: null,
	                        configUpdated: configUpdatedCallback,
	                        get creationContext() {
	                            return hof_1.parse('$cfg.viewDecl.$context')(inherited);
	                        }
	                    };
	                    trace_1.trace.traceUIViewEvent("Linking", activeUIView);
	                    function configUpdatedCallback(config) {
	                        if (config && !(config instanceof views_1.Ng1ViewConfig))
	                            return;
	                        if (configsEqual(viewConfig, config))
	                            return;
	                        trace_1.trace.traceUIViewConfigUpdated(activeUIView, config && config.viewDecl && config.viewDecl.$context);
	                        viewConfig = config;
	                        updateView(config);
	                    }
	                    $element.data('$uiView', { $uiView: activeUIView });
	                    updateView();
	                    unregister = $view.registerUIView(activeUIView);
	                    scope.$on("$destroy", function () {
	                        trace_1.trace.traceUIViewEvent("Destroying/Unregistering", activeUIView);
	                        unregister();
	                    });
	                    function cleanupLastView() {
	                        if (previousEl) {
	                            trace_1.trace.traceUIViewEvent("Removing (previous) el", previousEl.data('$uiView'));
	                            previousEl.remove();
	                            previousEl = null;
	                        }
	                        if (currentScope) {
	                            trace_1.trace.traceUIViewEvent("Destroying scope", activeUIView);
	                            currentScope.$destroy();
	                            currentScope = null;
	                        }
	                        if (currentEl) {
	                            var _viewData_1 = currentEl.data('$uiViewAnim');
	                            trace_1.trace.traceUIViewEvent("Animate out", _viewData_1);
	                            renderer.leave(currentEl, function () {
	                                _viewData_1.$$animLeave.resolve();
	                                previousEl = null;
	                            });
	                            previousEl = currentEl;
	                            currentEl = null;
	                        }
	                    }
	                    function updateView(config) {
	                        var newScope = scope.$new();
	                        var animEnter = $q.defer(), animLeave = $q.defer();
	                        var $uiViewData = {
	                            $cfg: config,
	                            $uiView: activeUIView,
	                        };
	                        var $uiViewAnim = {
	                            $animEnter: animEnter.promise,
	                            $animLeave: animLeave.promise,
	                            $$animLeave: animLeave
	                        };
	                        var cloned = $transclude(newScope, function (clone) {
	                            clone.data('$uiViewAnim', $uiViewAnim);
	                            clone.data('$uiView', $uiViewData);
	                            renderer.enter(clone, $element, function onUIViewEnter() {
	                                animEnter.resolve();
	                                if (currentScope)
	                                    currentScope.$emit('$viewContentAnimationEnded');
	                                if (predicates_1.isDefined(autoScrollExp) && !autoScrollExp || scope.$eval(autoScrollExp)) {
	                                    $uiViewScroll(clone);
	                                }
	                            });
	                            cleanupLastView();
	                        });
	                        currentEl = cloned;
	                        currentScope = newScope;
	                        /**
	                         * @ngdoc event
	                         * @name ui.router.state.directive:ui-view#$viewContentLoaded
	                         * @eventOf ui.router.state.directive:ui-view
	                         * @eventType emits on ui-view directive scope
	                         * @description           *
	                         * Fired once the view is **loaded**, *after* the DOM is rendered.
	                         *
	                         * @param {Object} event Event object.
	                         */
	                        currentScope.$emit('$viewContentLoaded', config || viewConfig);
	                        currentScope.$eval(onloadExp);
	                    }
	                };
	            }
	        };
	        return directive;
	    }];
	$ViewDirectiveFill.$inject = ['$compile', '$controller', '$transitions', '$view', '$timeout'];
	/** @hidden */
	function $ViewDirectiveFill($compile, $controller, $transitions, $view, $timeout) {
	    var getControllerAs = hof_1.parse('viewDecl.controllerAs');
	    var getResolveAs = hof_1.parse('viewDecl.resolveAs');
	    return {
	        restrict: 'ECA',
	        priority: -400,
	        compile: function (tElement) {
	            var initial = tElement.html();
	            return function (scope, $element) {
	                var data = $element.data('$uiView');
	                if (!data)
	                    return;
	                var cfg = data.$cfg || { viewDecl: {} };
	                $element.html(cfg.template || initial);
	                trace_1.trace.traceUIViewFill(data.$uiView, $element.html());
	                var link = $compile($element.contents());
	                var controller = cfg.controller;
	                var controllerAs = getControllerAs(cfg);
	                var resolveAs = getResolveAs(cfg);
	                var resolveCtx = cfg.path && new resolveContext_1.ResolveContext(cfg.path);
	                var locals = resolveCtx && services_1.getLocals(resolveCtx);
	                scope[resolveAs] = locals;
	                if (controller) {
	                    var controllerInstance = $controller(controller, common_1.extend({}, locals, { $scope: scope, $element: $element }));
	                    if (controllerAs) {
	                        scope[controllerAs] = controllerInstance;
	                        scope[controllerAs][resolveAs] = locals;
	                    }
	                    // TODO: Use $view service as a central point for registering component-level hooks
	                    // Then, when a component is created, tell the $view service, so it can invoke hooks
	                    // $view.componentLoaded(controllerInstance, { $scope: scope, $element: $element });
	                    // scope.$on('$destroy', () => $view.componentUnloaded(controllerInstance, { $scope: scope, $element: $element }));
	                    $element.data('$ngControllerController', controllerInstance);
	                    $element.children().data('$ngControllerController', controllerInstance);
	                    registerControllerCallbacks($transitions, controllerInstance, scope, cfg);
	                }
	                // Wait for the component to appear in the DOM
	                if (predicates_1.isString(cfg.viewDecl.component)) {
	                    var cmp_1 = cfg.viewDecl.component;
	                    var kebobName_1 = strings_1.kebobString(cmp_1);
	                    var getComponentController = function () {
	                        var directiveEl = [].slice.call($element[0].children)
	                            .filter(function (el) { return el && el.tagName && el.tagName.toLowerCase() === kebobName_1; });
	                        return directiveEl && angular.element(directiveEl).data("$" + cmp_1 + "Controller");
	                    };
	                    var deregisterWatch_1 = scope.$watch(getComponentController, function (ctrlInstance) {
	                        if (!ctrlInstance)
	                            return;
	                        registerControllerCallbacks($transitions, ctrlInstance, scope, cfg);
	                        deregisterWatch_1();
	                    });
	                }
	                link(scope);
	            };
	        }
	    };
	}
	/** @hidden */
	var hasComponentImpl = typeof angular.module('ui.router')['component'] === 'function';
	/** @hidden TODO: move these callbacks to $view and/or `/hooks/components.ts` or something */
	function registerControllerCallbacks($transitions, controllerInstance, $scope, cfg) {
	    // Call $onInit() ASAP
	    if (predicates_1.isFunction(controllerInstance.$onInit) && !(cfg.viewDecl.component && hasComponentImpl))
	        controllerInstance.$onInit();
	    var viewState = common_1.tail(cfg.path).state.self;
	    var hookOptions = { bind: controllerInstance };
	    // Add component-level hook for onParamsChange
	    if (predicates_1.isFunction(controllerInstance.uiOnParamsChanged)) {
	        var resolveContext = new resolveContext_1.ResolveContext(cfg.path);
	        var viewCreationTrans_1 = resolveContext.getResolvable('$transition$').data;
	        // Fire callback on any successful transition
	        var paramsUpdated = function ($transition$) {
	            // Exit early if the $transition$ is the same as the view was created within.
	            // Exit early if the $transition$ will exit the state the view is for.
	            if ($transition$ === viewCreationTrans_1 || $transition$.exiting().indexOf(viewState) !== -1)
	                return;
	            var toParams = $transition$.params("to");
	            var fromParams = $transition$.params("from");
	            var toSchema = $transition$.treeChanges().to.map(function (node) { return node.paramSchema; }).reduce(common_1.unnestR, []);
	            var fromSchema = $transition$.treeChanges().from.map(function (node) { return node.paramSchema; }).reduce(common_1.unnestR, []);
	            // Find the to params that have different values than the from params
	            var changedToParams = toSchema.filter(function (param) {
	                var idx = fromSchema.indexOf(param);
	                return idx === -1 || !fromSchema[idx].type.equals(toParams[param.id], fromParams[param.id]);
	            });
	            // Only trigger callback if a to param has changed or is new
	            if (changedToParams.length) {
	                var changedKeys_1 = changedToParams.map(function (x) { return x.id; });
	                // Filter the params to only changed/new to params.  `$transition$.params()` may be used to get all params.
	                controllerInstance.uiOnParamsChanged(common_1.filter(toParams, function (val, key) { return changedKeys_1.indexOf(key) !== -1; }), $transition$);
	            }
	        };
	        $scope.$on('$destroy', $transitions.onSuccess({}, paramsUpdated, hookOptions));
	    }
	    // Add component-level hook for uiCanExit
	    if (predicates_1.isFunction(controllerInstance.uiCanExit)) {
	        var criteria = { exiting: viewState.name };
	        $scope.$on('$destroy', $transitions.onBefore(criteria, controllerInstance.uiCanExit, hookOptions));
	    }
	}
	angular.module('ui.router.state').directive('uiView', uiView);
	angular.module('ui.router.state').directive('uiView', $ViewDirectiveFill);


/***/ },
/* 62 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @ngdoc object
	 * @name ui.router.state.$uiViewScrollProvider
	 *
	 * @description
	 * Provider that returns the {@link ui.router.state.$uiViewScroll} service function.
	 */
	function $ViewScrollProvider() {
	    var useAnchorScroll = false;
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$uiViewScrollProvider#useAnchorScroll
	     * @methodOf ui.router.state.$uiViewScrollProvider
	     *
	     * @description
	     * Reverts back to using the core [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll) service for
	     * scrolling based on the url anchor.
	     */
	    this.useAnchorScroll = function () {
	        useAnchorScroll = true;
	    };
	    /**
	     * @ngdoc object
	     * @name ui.router.state.$uiViewScroll
	     *
	     * @requires $anchorScroll
	     * @requires $timeout
	     *
	     * @description
	     * When called with a jqLite element, it scrolls the element into view (after a
	     * `$timeout` so the DOM has time to refresh).
	     *
	     * If you prefer to rely on `$anchorScroll` to scroll the view to the anchor,
	     * this can be enabled by calling {@link ui.router.state.$uiViewScrollProvider#methods_useAnchorScroll `$uiViewScrollProvider.useAnchorScroll()`}.
	     */
	    this.$get = ['$anchorScroll', '$timeout', function ($anchorScroll, $timeout) {
	            if (useAnchorScroll) {
	                return $anchorScroll;
	            }
	            return function ($element) {
	                return $timeout(function () {
	                    $element[0].scrollIntoView();
	                }, 0, false);
	            };
	        }];
	}
	angular.module('ui.router.state').provider('$uiViewScroll', $ViewScrollProvider);


/***/ }
/******/ ])
});
;
//# sourceMappingURL=angular-ui-router.js.map