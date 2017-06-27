// Copyright 2009-2012 by contributors, MIT License
// vim: ts=4 sts=4 sw=4 expandtab

(function () {
setTimeout(function(){
	webshims.isReady('es5', true);
});
	/**
	 * Brings an environment as close to ECMAScript 5 compliance
	 * as is possible with the facilities of erstwhile engines.
	 *
	 * Annotated ES5: http://es5.github.com/ (specific links below)
	 * ES5 Spec: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
	 * Required reading: http://javascriptweblog.wordpress.com/2011/12/05/extending-javascript-natives/
	 */

// Shortcut to an often accessed properties, in order to avoid multiple
// dereference that costs universally.
	var call = Function.prototype.call;
	var prototypeOfArray = Array.prototype;
	var prototypeOfObject = Object.prototype;
	var _Array_slice_ = prototypeOfArray.slice;
	var array_splice = Array.prototype.splice;
	var array_push = Array.prototype.push;
	var array_unshift = Array.prototype.unshift;

// Having a toString local variable name breaks in Opera so use _toString.
	var _toString = prototypeOfObject.toString;

	var isFunction = function (val) {
		return prototypeOfObject.toString.call(val) === '[object Function]';
	};
	var isRegex = function (val) {
		return prototypeOfObject.toString.call(val) === '[object RegExp]';
	};
	var isArray = function isArray(obj) {
		return _toString.call(obj) === "[object Array]";
	};
	var isArguments = function isArguments(value) {
		var str = _toString.call(value);
		var isArgs = str === '[object Arguments]';
		if (!isArgs) {
			isArgs = !isArray(str)
				&& value !== null
				&& typeof value === 'object'
				&& typeof value.length === 'number'
				&& value.length >= 0
				&& isFunction(value.callee);
		}
		return isArgs;
	};

//
// Function
// ========
//

// ES-5 15.3.4.5
// http://es5.github.com/#x15.3.4.5

	function Empty() {}

	if (!Function.prototype.bind) {
		Function.prototype.bind = function bind(that) { // .length is 1
			// 1. Let Target be the this value.
			var target = this;
			// 2. If IsCallable(Target) is false, throw a TypeError exception.
			if (!isFunction(target)) {
				throw new TypeError("Function.prototype.bind called on incompatible " + target);
			}
			// 3. Let A be a new (possibly empty) internal list of all of the
			// argument values provided after thisArg (arg1, arg2 etc), in order.
			// XXX slicedArgs will stand in for "A" if used
			var args = _Array_slice_.call(arguments, 1); // for normal call
			// 4. Let F be a new native ECMAScript object.
			// 11. Set the [[Prototype]] internal property of F to the standard
			// built-in Function prototype object as specified in 15.3.3.1.
			// 12. Set the [[Call]] internal property of F as described in
			// 15.3.4.5.1.
			// 13. Set the [[Construct]] internal property of F as described in
			// 15.3.4.5.2.
			// 14. Set the [[HasInstance]] internal property of F as described in
			// 15.3.4.5.3.
			var binder = function () {

				if (this instanceof bound) {
					// 15.3.4.5.2 [[Construct]]
					// When the [[Construct]] internal method of a function object,
					// F that was created using the bind function is called with a
					// list of arguments ExtraArgs, the following steps are taken:
					// 1. Let target be the value of F's [[TargetFunction]]
					// internal property.
					// 2. If target has no [[Construct]] internal method, a
					// TypeError exception is thrown.
					// 3. Let boundArgs be the value of F's [[BoundArgs]] internal
					// property.
					// 4. Let args be a new list containing the same values as the
					// list boundArgs in the same order followed by the same
					// values as the list ExtraArgs in the same order.
					// 5. Return the result of calling the [[Construct]] internal
					// method of target providing args as the arguments.

					var result = target.apply(
						this,
						args.concat(_Array_slice_.call(arguments))
					);
					if (Object(result) === result) {
						return result;
					}
					return this;

				} else {
					// 15.3.4.5.1 [[Call]]
					// When the [[Call]] internal method of a function object, F,
					// which was created using the bind function is called with a
					// this value and a list of arguments ExtraArgs, the following
					// steps are taken:
					// 1. Let boundArgs be the value of F's [[BoundArgs]] internal
					// property.
					// 2. Let boundThis be the value of F's [[BoundThis]] internal
					// property.
					// 3. Let target be the value of F's [[TargetFunction]] internal
					// property.
					// 4. Let args be a new list containing the same values as the
					// list boundArgs in the same order followed by the same
					// values as the list ExtraArgs in the same order.
					// 5. Return the result of calling the [[Call]] internal method
					// of target providing boundThis as the this value and
					// providing args as the arguments.

					// equiv: target.call(this, ...boundArgs, ...args)
					return target.apply(
						that,
						args.concat(_Array_slice_.call(arguments))
					);

				}

			};

			// 15. If the [[Class]] internal property of Target is "Function", then
			// a. Let L be the length property of Target minus the length of A.
			// b. Set the length own property of F to either 0 or L, whichever is
			// larger.
			// 16. Else set the length own property of F to 0.

			var boundLength = Math.max(0, target.length - args.length);

			// 17. Set the attributes of the length own property of F to the values
			// specified in 15.3.5.1.
			var boundArgs = [];
			for (var i = 0; i < boundLength; i++) {
				boundArgs.push("$" + i);
			}

			// XXX Build a dynamic function with desired amount of arguments is the only
			// way to set the length property of a function.
			// In environments where Content Security Policies enabled (Chrome extensions,
			// for ex.) all use of eval or Function costructor throws an exception.
			// However in all of these environments Function.prototype.bind exists
			// and so this code will never be executed.
			var bound = Function("binder", "return function (" + boundArgs.join(",") + "){return binder.apply(this,arguments)}")(binder);

			if (target.prototype) {
				Empty.prototype = target.prototype;
				bound.prototype = new Empty();
				// Clean up dangling references.
				Empty.prototype = null;
			}

			// TODO
			// 18. Set the [[Extensible]] internal property of F to true.

			// TODO
			// 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
			// 20. Call the [[DefineOwnProperty]] internal method of F with
			// arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
			// thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
			// false.
			// 21. Call the [[DefineOwnProperty]] internal method of F with
			// arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
			// [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
			// and false.

			// TODO
			// NOTE Function objects created using Function.prototype.bind do not
			// have a prototype property or the [[Code]], [[FormalParameters]], and
			// [[Scope]] internal properties.
			// XXX can't delete prototype in pure-js.

			// 22. Return F.
			return bound;
		};
	}

// _Please note: Shortcuts are defined after `Function.prototype.bind` as we
// us it in defining shortcuts.
	var owns = call.bind(prototypeOfObject.hasOwnProperty);

// If JS engine supports accessors creating shortcuts.
	var defineGetter;
	var defineSetter;
	var lookupGetter;
	var lookupSetter;
	var supportsAccessors;
	if ((supportsAccessors = owns(prototypeOfObject, "__defineGetter__"))) {
		defineGetter = call.bind(prototypeOfObject.__defineGetter__);
		defineSetter = call.bind(prototypeOfObject.__defineSetter__);
		lookupGetter = call.bind(prototypeOfObject.__lookupGetter__);
		lookupSetter = call.bind(prototypeOfObject.__lookupSetter__);
	}

//
// Array
// =====
//

// ES5 15.4.4.12
// http://es5.github.com/#x15.4.4.12
	var spliceWorksWithEmptyObject = (function () {
		var obj = {};
		Array.prototype.splice.call(obj, 0, 0, 1);
		return obj.length === 1;
	}());
	var omittingSecondSpliceArgIsNoop = [1].splice(0).length === 0;
	var spliceNoopReturnsEmptyArray = (function () {
		var a = [1, 2];
		var result = a.splice();
		return a.length === 2 && isArray(result) && result.length === 0;
	}());
	if (spliceNoopReturnsEmptyArray) {
		// Safari 5.0 bug where .split() returns undefined
		Array.prototype.splice = function splice(start, deleteCount) {
			if (arguments.length === 0) { return []; }
			else { return array_splice.apply(this, arguments); }
		};
	}
	if (!omittingSecondSpliceArgIsNoop || !spliceWorksWithEmptyObject) {
		Array.prototype.splice = function splice(start, deleteCount) {
			if (arguments.length === 0) { return []; }
			var args = arguments;
			this.length = Math.max(toInteger(this.length), 0);
			if (arguments.length > 0 && typeof deleteCount !== 'number') {
				args = _Array_slice_.call(arguments);
				if (args.length < 2) { args.push(toInteger(deleteCount)); }
				else { args[1] = toInteger(deleteCount); }
			}
			return array_splice.apply(this, args);
		};
	}

// ES5 15.4.4.12
// http://es5.github.com/#x15.4.4.13
// Return len+argCount.
// [bugfix, ielt8]
// IE < 8 bug: [].unshift(0) === undefined but should be "1"
	if ([].unshift(0) !== 1) {
		Array.prototype.unshift = function () {
			array_unshift.apply(this, arguments);
			return this.length;
		};
	}

// ES5 15.4.3.2
// http://es5.github.com/#x15.4.3.2
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
	if (!Array.isArray) {
		Array.isArray = isArray;
	}

// The IsCallable() check in the Array functions
// has been replaced with a strict check on the
// internal class of the object to trap cases where
// the provided function was actually a regular
// expression literal, which in V8 and
// JavaScriptCore is a typeof "function". Only in
// V8 are regular expression literals permitted as
// reduce parameters, so it is desirable in the
// general case for the shim to match the more
// strict and common behavior of rejecting regular
// expressions.

// ES5 15.4.4.18
// http://es5.github.com/#x15.4.4.18
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/forEach

// Check failure of by-index access of string characters (IE < 9)
// and failure of `0 in boxedString` (Rhino)
	var boxedString = Object("a");
	var splitString = boxedString[0] !== "a" || !(0 in boxedString);

	var properlyBoxesContext = function properlyBoxed(method) {
		// Check node 0.6.21 bug where third parameter is not boxed
		var properlyBoxesNonStrict = true;
		var properlyBoxesStrict = true;
		if (method) {
			method.call('foo', function (_, __, context) {
				if (typeof context !== 'object') { properlyBoxesNonStrict = false; }
			});

			method.call([1], function () {
				'use strict';
				properlyBoxesStrict = typeof this === 'string';
			}, 'x');
		}
		return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
	};

	if (!Array.prototype.forEach || !properlyBoxesContext(Array.prototype.forEach)) {
		Array.prototype.forEach = function forEach(fun /*, thisp*/) {
			var object = toObject(this),
				self = splitString && _toString.call(this) === "[object String]" ?
					this.split("") :
					object,
				thisp = arguments[1],
				i = -1,
				length = self.length >>> 0;

			// If no callback function or if callback is not a callable function
			if (!isFunction(fun)) {
				throw new TypeError(); // TODO message
			}

			while (++i < length) {
				if (i in self) {
					// Invoke the callback function with call, passing arguments:
					// context, property value, property key, thisArg object
					// context
					fun.call(thisp, self[i], i, object);
				}
			}
		};
	}

// ES5 15.4.4.19
// http://es5.github.com/#x15.4.4.19
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
	if (!Array.prototype.map || !properlyBoxesContext(Array.prototype.map)) {
		Array.prototype.map = function map(fun /*, thisp*/) {
			var object = toObject(this),
				self = splitString && _toString.call(this) === "[object String]" ?
					this.split("") :
					object,
				length = self.length >>> 0,
				result = Array(length),
				thisp = arguments[1];

			// If no callback function or if callback is not a callable function
			if (!isFunction(fun)) {
				throw new TypeError(fun + " is not a function");
			}

			for (var i = 0; i < length; i++) {
				if (i in self) {
					result[i] = fun.call(thisp, self[i], i, object);
				}
			}
			return result;
		};
	}

// ES5 15.4.4.20
// http://es5.github.com/#x15.4.4.20
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
	if (!Array.prototype.filter || !properlyBoxesContext(Array.prototype.filter)) {
		Array.prototype.filter = function filter(fun /*, thisp */) {
			var object = toObject(this),
				self = splitString && _toString.call(this) === "[object String]" ?
					this.split("") :
					object,
				length = self.length >>> 0,
				result = [],
				value,
				thisp = arguments[1];

			// If no callback function or if callback is not a callable function
			if (!isFunction(fun)) {
				throw new TypeError(fun + " is not a function");
			}

			for (var i = 0; i < length; i++) {
				if (i in self) {
					value = self[i];
					if (fun.call(thisp, value, i, object)) {
						result.push(value);
					}
				}
			}
			return result;
		};
	}

// ES5 15.4.4.16
// http://es5.github.com/#x15.4.4.16
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
	if (!Array.prototype.every || !properlyBoxesContext(Array.prototype.every)) {
		Array.prototype.every = function every(fun /*, thisp */) {
			var object = toObject(this),
				self = splitString && _toString.call(this) === "[object String]" ?
					this.split("") :
					object,
				length = self.length >>> 0,
				thisp = arguments[1];

			// If no callback function or if callback is not a callable function
			if (!isFunction(fun)) {
				throw new TypeError(fun + " is not a function");
			}

			for (var i = 0; i < length; i++) {
				if (i in self && !fun.call(thisp, self[i], i, object)) {
					return false;
				}
			}
			return true;
		};
	}

// ES5 15.4.4.17
// http://es5.github.com/#x15.4.4.17
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
	if (!Array.prototype.some || !properlyBoxesContext(Array.prototype.some)) {
		Array.prototype.some = function some(fun /*, thisp */) {
			var object = toObject(this),
				self = splitString && _toString.call(this) === "[object String]" ?
					this.split("") :
					object,
				length = self.length >>> 0,
				thisp = arguments[1];

			// If no callback function or if callback is not a callable function
			if (!isFunction(fun)) {
				throw new TypeError(fun + " is not a function");
			}

			for (var i = 0; i < length; i++) {
				if (i in self && fun.call(thisp, self[i], i, object)) {
					return true;
				}
			}
			return false;
		};
	}

// ES5 15.4.4.21
// http://es5.github.com/#x15.4.4.21
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
	var reduceCoercesToObject = false;
	if (Array.prototype.reduce) {
		reduceCoercesToObject = typeof Array.prototype.reduce.call('es5', function (_, __, ___, list) { return list; }) === 'object';
	}
	if (!Array.prototype.reduce || !reduceCoercesToObject) {
		Array.prototype.reduce = function reduce(fun /*, initial*/) {
			var object = toObject(this),
				self = splitString && _toString.call(this) === "[object String]" ?
					this.split("") :
					object,
				length = self.length >>> 0;

			// If no callback function or if callback is not a callable function
			if (!isFunction(fun)) {
				throw new TypeError(fun + " is not a function");
			}

			// no value to return if no initial value and an empty array
			if (!length && arguments.length === 1) {
				throw new TypeError("reduce of empty array with no initial value");
			}

			var i = 0;
			var result;
			if (arguments.length >= 2) {
				result = arguments[1];
			} else {
				do {
					if (i in self) {
						result = self[i++];
						break;
					}

					// if array contains no values, no initial value to return
					if (++i >= length) {
						throw new TypeError("reduce of empty array with no initial value");
					}
				} while (true);
			}

			for (; i < length; i++) {
				if (i in self) {
					result = fun.call(void 0, result, self[i], i, object);
				}
			}

			return result;
		};
	}

// ES5 15.4.4.22
// http://es5.github.com/#x15.4.4.22
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight
	var reduceRightCoercesToObject = false;
	if (Array.prototype.reduceRight) {
		reduceRightCoercesToObject = typeof Array.prototype.reduceRight.call('es5', function (_, __, ___, list) { return list; }) === 'object';
	}
	if (!Array.prototype.reduceRight || !reduceRightCoercesToObject) {
		Array.prototype.reduceRight = function reduceRight(fun /*, initial*/) {
			var object = toObject(this),
				self = splitString && _toString.call(this) === "[object String]" ?
					this.split("") :
					object,
				length = self.length >>> 0;

			// If no callback function or if callback is not a callable function
			if (!isFunction(fun)) {
				throw new TypeError(fun + " is not a function");
			}

			// no value to return if no initial value, empty array
			if (!length && arguments.length === 1) {
				throw new TypeError("reduceRight of empty array with no initial value");
			}

			var result, i = length - 1;
			if (arguments.length >= 2) {
				result = arguments[1];
			} else {
				do {
					if (i in self) {
						result = self[i--];
						break;
					}

					// if array contains no values, no initial value to return
					if (--i < 0) {
						throw new TypeError("reduceRight of empty array with no initial value");
					}
				} while (true);
			}

			if (i < 0) {
				return result;
			}

			do {
				if (i in self) {
					result = fun.call(void 0, result, self[i], i, object);
				}
			} while (i--);

			return result;
		};
	}

// ES5 15.4.4.14
// http://es5.github.com/#x15.4.4.14
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
	if (!Array.prototype.indexOf || ([0, 1].indexOf(1, 2) !== -1)) {
		Array.prototype.indexOf = function indexOf(sought /*, fromIndex */ ) {
			var self = splitString && _toString.call(this) === "[object String]" ?
					this.split("") :
					toObject(this),
				length = self.length >>> 0;

			if (!length) {
				return -1;
			}

			var i = 0;
			if (arguments.length > 1) {
				i = toInteger(arguments[1]);
			}

			// handle negative indices
			i = i >= 0 ? i : Math.max(0, length + i);
			for (; i < length; i++) {
				if (i in self && self[i] === sought) {
					return i;
				}
			}
			return -1;
		};
	}

// ES5 15.4.4.15
// http://es5.github.com/#x15.4.4.15
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
	if (!Array.prototype.lastIndexOf || ([0, 1].lastIndexOf(0, -3) !== -1)) {
		Array.prototype.lastIndexOf = function lastIndexOf(sought /*, fromIndex */) {
			var self = splitString && _toString.call(this) === "[object String]" ?
					this.split("") :
					toObject(this),
				length = self.length >>> 0;

			if (!length) {
				return -1;
			}
			var i = length - 1;
			if (arguments.length > 1) {
				i = Math.min(i, toInteger(arguments[1]));
			}
			// handle negative indices
			i = i >= 0 ? i : length - Math.abs(i);
			for (; i >= 0; i--) {
				if (i in self && sought === self[i]) {
					return i;
				}
			}
			return -1;
		};
	}

//
// Object
// ======
//

// ES5 15.2.3.14
// http://es5.github.com/#x15.2.3.14
	var keysWorksWithArguments = Object.keys && (function () {
		return Object.keys(arguments).length === 2;
	}(1, 2));
	if (!Object.keys) {
		// http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
		var hasDontEnumBug = !({'toString': null}).propertyIsEnumerable('toString'),
			hasProtoEnumBug = (function () {}).propertyIsEnumerable('prototype'),
			dontEnums = [
				"toString",
				"toLocaleString",
				"valueOf",
				"hasOwnProperty",
				"isPrototypeOf",
				"propertyIsEnumerable",
				"constructor"
			],
			dontEnumsLength = dontEnums.length;

		Object.keys = function keys(object) {
			var isFn = isFunction(object),
				isArgs = isArguments(object),
				isObject = object !== null && typeof object === 'object',
				isString = isObject && _toString.call(object) === '[object String]';

			if (!isObject && !isFn && !isArgs) {
				throw new TypeError("Object.keys called on a non-object");
			}

			var theKeys = [];
			var skipProto = hasProtoEnumBug && isFn;
			if (isString || isArgs) {
				for (var i = 0; i < object.length; ++i) {
					theKeys.push(String(i));
				}
			} else {
				for (var name in object) {
					if (!(skipProto && name === 'prototype') && owns(object, name)) {
						theKeys.push(String(name));
					}
				}
			}

			if (hasDontEnumBug) {
				var ctor = object.constructor,
					skipConstructor = ctor && ctor.prototype === object;
				for (var j = 0; j < dontEnumsLength; j++) {
					var dontEnum = dontEnums[j];
					if (!(skipConstructor && dontEnum === 'constructor') && owns(object, dontEnum)) {
						theKeys.push(dontEnum);
					}
				}
			}
			return theKeys;
		};
	} else if (!keysWorksWithArguments) {
		// Safari 5.0 bug
		var originalKeys = Object.keys;
		Object.keys = function keys(object) {
			if (isArguments(object)) {
				return originalKeys(Array.prototype.slice.call(object));
			} else {
				return originalKeys(object);
			}
		};
	}

//
// Date
// ====
//

// ES5 15.9.5.43
// http://es5.github.com/#x15.9.5.43
// This function returns a String value represent the instance in time
// represented by this Date object. The format of the String is the Date Time
// string format defined in 15.9.1.15. All fields are present in the String.
// The time zone is always UTC, denoted by the suffix Z. If the time value of
// this object is not a finite Number a RangeError exception is thrown.
	var negativeDate = -62198755200000,
		negativeYearString = "-000001";
	if (
		!Date.prototype.toISOString ||
			(new Date(negativeDate).toISOString().indexOf(negativeYearString) === -1)
		) {
		Date.prototype.toISOString = function toISOString() {
			var result, length, value, year, month;
			if (!isFinite(this)) {
				throw new RangeError("Date.prototype.toISOString called on non-finite value.");
			}

			year = this.getUTCFullYear();

			month = this.getUTCMonth();
			// see https://github.com/es-shims/es5-shim/issues/111
			year += Math.floor(month / 12);
			month = (month % 12 + 12) % 12;

			// the date time string format is specified in 15.9.1.15.
			result = [month + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()];
			year = (
				(year < 0 ? "-" : (year > 9999 ? "+" : "")) +
					("00000" + Math.abs(year)).slice(0 <= year && year <= 9999 ? -4 : -6)
				);

			length = result.length;
			while (length--) {
				value = result[length];
				// pad months, days, hours, minutes, and seconds to have two
				// digits.
				if (value < 10) {
					result[length] = "0" + value;
				}
			}
			// pad milliseconds to have three digits.
			return (
				year + "-" + result.slice(0, 2).join("-") +
					"T" + result.slice(2).join(":") + "." +
					("000" + this.getUTCMilliseconds()).slice(-3) + "Z"
				);
		};
	}


// ES5 15.9.5.44
// http://es5.github.com/#x15.9.5.44
// This function provides a String representation of a Date object for use by
// JSON.stringify (15.12.3).
	var dateToJSONIsSupported = false;
	try {
		dateToJSONIsSupported = (
			Date.prototype.toJSON &&
				new Date(NaN).toJSON() === null &&
				new Date(negativeDate).toJSON().indexOf(negativeYearString) !== -1 &&
				Date.prototype.toJSON.call({ // generic
					toISOString: function () {
						return true;
					}
				})
			);
	} catch (e) {
	}
	if (!dateToJSONIsSupported) {
		Date.prototype.toJSON = function toJSON(key) {
			// When the toJSON method is called with argument key, the following
			// steps are taken:

			// 1. Let O be the result of calling ToObject, giving it the this
			// value as its argument.
			// 2. Let tv be toPrimitive(O, hint Number).
			var o = Object(this),
				tv = toPrimitive(o),
				toISO;
			// 3. If tv is a Number and is not finite, return null.
			if (typeof tv === "number" && !isFinite(tv)) {
				return null;
			}
			// 4. Let toISO be the result of calling the [[Get]] internal method of
			// O with argument "toISOString".
			toISO = o.toISOString;
			// 5. If IsCallable(toISO) is false, throw a TypeError exception.
			if (typeof toISO !== "function") {
				throw new TypeError("toISOString property is not callable");
			}
			// 6. Return the result of calling the [[Call]] internal method of
			// toISO with O as the this value and an empty argument list.
			return toISO.call(o);

			// NOTE 1 The argument is ignored.

			// NOTE 2 The toJSON function is intentionally generic; it does not
			// require that its this value be a Date object. Therefore, it can be
			// transferred to other kinds of objects for use as a method. However,
			// it does require that any such object have a toISOString method. An
			// object is free to use the argument key to filter its
			// stringification.
		};
	}

// ES5 15.9.4.2
// http://es5.github.com/#x15.9.4.2
// based on work shared by Daniel Friesen (dantman)
// http://gist.github.com/303249
	var supportsExtendedYears = Date.parse('+033658-09-27T01:46:40.000Z') === 1e15;
	var acceptsInvalidDates = !isNaN(Date.parse('2012-04-04T24:00:00.500Z')) || !isNaN(Date.parse('2012-11-31T23:59:59.000Z'));
	var doesNotParseY2KNewYear = isNaN(Date.parse("2000-01-01T00:00:00.000Z"));
	if (!Date.parse || doesNotParseY2KNewYear || acceptsInvalidDates || !supportsExtendedYears) {
		// XXX global assignment won't work in embeddings that use
		// an alternate object for the context.
		Date = (function (NativeDate) {

			// Date.length === 7
			function Date(Y, M, D, h, m, s, ms) {
				var length = arguments.length;
				if (this instanceof NativeDate) {
					var date = length === 1 && String(Y) === Y ? // isString(Y)
						// We explicitly pass it through parse:
						new NativeDate(Date.parse(Y)) :
						// We have to manually make calls depending on argument
						// length here
						length >= 7 ? new NativeDate(Y, M, D, h, m, s, ms) :
							length >= 6 ? new NativeDate(Y, M, D, h, m, s) :
								length >= 5 ? new NativeDate(Y, M, D, h, m) :
									length >= 4 ? new NativeDate(Y, M, D, h) :
										length >= 3 ? new NativeDate(Y, M, D) :
											length >= 2 ? new NativeDate(Y, M) :
												length >= 1 ? new NativeDate(Y) :
													new NativeDate();
					// Prevent mixups with unfixed Date object
					date.constructor = Date;
					return date;
				}
				return NativeDate.apply(this, arguments);
			}

			// 15.9.1.15 Date Time String Format.
			var isoDateExpression = new RegExp("^" +
				"(\\d{4}|[\+\-]\\d{6})" + // four-digit year capture or sign +
				// 6-digit extended year
				"(?:-(\\d{2})" + // optional month capture
				"(?:-(\\d{2})" + // optional day capture
				"(?:" + // capture hours:minutes:seconds.milliseconds
				"T(\\d{2})" + // hours capture
				":(\\d{2})" + // minutes capture
				"(?:" + // optional :seconds.milliseconds
				":(\\d{2})" + // seconds capture
				"(?:(\\.\\d{1,}))?" + // milliseconds capture
				")?" +
				"(" + // capture UTC offset component
				"Z|" + // UTC capture
				"(?:" + // offset specifier +/-hours:minutes
				"([-+])" + // sign capture
				"(\\d{2})" + // hours offset capture
				":(\\d{2})" + // minutes offset capture
				")" +
				")?)?)?)?" +
				"$");

			var months = [
				0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365
			];

			function dayFromMonth(year, month) {
				var t = month > 1 ? 1 : 0;
				return (
					months[month] +
						Math.floor((year - 1969 + t) / 4) -
						Math.floor((year - 1901 + t) / 100) +
						Math.floor((year - 1601 + t) / 400) +
						365 * (year - 1970)
					);
			}

			function toUTC(t) {
				return Number(new NativeDate(1970, 0, 1, 0, 0, 0, t));
			}

			// Copy any custom methods a 3rd party library may have added
			for (var key in NativeDate) {
				Date[key] = NativeDate[key];
			}

			// Copy "native" methods explicitly; they may be non-enumerable
			Date.now = NativeDate.now;
			Date.UTC = NativeDate.UTC;
			Date.prototype = NativeDate.prototype;
			Date.prototype.constructor = Date;

			// Upgrade Date.parse to handle simplified ISO 8601 strings
			Date.parse = function parse(string) {
				var match = isoDateExpression.exec(string);
				if (match) {
					// parse months, days, hours, minutes, seconds, and milliseconds
					// provide default values if necessary
					// parse the UTC offset component
					var year = Number(match[1]),
						month = Number(match[2] || 1) - 1,
						day = Number(match[3] || 1) - 1,
						hour = Number(match[4] || 0),
						minute = Number(match[5] || 0),
						second = Number(match[6] || 0),
						millisecond = Math.floor(Number(match[7] || 0) * 1000),
					// When time zone is missed, local offset should be used
					// (ES 5.1 bug)
					// see https://bugs.ecmascript.org/show_bug.cgi?id=112
						isLocalTime = Boolean(match[4] && !match[8]),
						signOffset = match[9] === "-" ? 1 : -1,
						hourOffset = Number(match[10] || 0),
						minuteOffset = Number(match[11] || 0),
						result;
					if (
						hour < (
							minute > 0 || second > 0 || millisecond > 0 ?
								24 : 25
							) &&
							minute < 60 && second < 60 && millisecond < 1000 &&
							month > -1 && month < 12 && hourOffset < 24 &&
							minuteOffset < 60 && // detect invalid offsets
							day > -1 &&
							day < (
								dayFromMonth(year, month + 1) -
									dayFromMonth(year, month)
								)
						) {
						result = (
							(dayFromMonth(year, month) + day) * 24 +
								hour +
								hourOffset * signOffset
							) * 60;
						result = (
							(result + minute + minuteOffset * signOffset) * 60 +
								second
							) * 1000 + millisecond;
						if (isLocalTime) {
							result = toUTC(result);
						}
						if (-8.64e15 <= result && result <= 8.64e15) {
							return result;
						}
					}
					return NaN;
				}
				return NativeDate.parse.apply(this, arguments);
			};

			return Date;
		})(Date);
	}

// ES5 15.9.4.4
// http://es5.github.com/#x15.9.4.4
	if (!Date.now) {
		Date.now = function now() {
			return new Date().getTime();
		};
	}


//
// Number
// ======
//

// ES5.1 15.7.4.5
// http://es5.github.com/#x15.7.4.5
	if (!Number.prototype.toFixed || (0.00008).toFixed(3) !== '0.000' || (0.9).toFixed(0) === '0' || (1.255).toFixed(2) !== '1.25' || (1000000000000000128).toFixed(0) !== "1000000000000000128") {
		// Hide these variables and functions
		(function () {
			var base, size, data, i;

			base = 1e7;
			size = 6;
			data = [0, 0, 0, 0, 0, 0];

			function multiply(n, c) {
				var i = -1;
				while (++i < size) {
					c += n * data[i];
					data[i] = c % base;
					c = Math.floor(c / base);
				}
			}

			function divide(n) {
				var i = size, c = 0;
				while (--i >= 0) {
					c += data[i];
					data[i] = Math.floor(c / n);
					c = (c % n) * base;
				}
			}

			function numToString() {
				var i = size;
				var s = '';
				while (--i >= 0) {
					if (s !== '' || i === 0 || data[i] !== 0) {
						var t = String(data[i]);
						if (s === '') {
							s = t;
						} else {
							s += '0000000'.slice(0, 7 - t.length) + t;
						}
					}
				}
				return s;
			}

			function pow(x, n, acc) {
				return (n === 0 ? acc : (n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc)));
			}

			function log(x) {
				var n = 0;
				while (x >= 4096) {
					n += 12;
					x /= 4096;
				}
				while (x >= 2) {
					n += 1;
					x /= 2;
				}
				return n;
			}

			Number.prototype.toFixed = function toFixed(fractionDigits) {
				var f, x, s, m, e, z, j, k;

				// Test for NaN and round fractionDigits down
				f = Number(fractionDigits);
				f = f !== f ? 0 : Math.floor(f);

				if (f < 0 || f > 20) {
					throw new RangeError("Number.toFixed called with invalid number of decimals");
				}

				x = Number(this);

				// Test for NaN
				if (x !== x) {
					return "NaN";
				}

				// If it is too big or small, return the string value of the number
				if (x <= -1e21 || x >= 1e21) {
					return String(x);
				}

				s = "";

				if (x < 0) {
					s = "-";
					x = -x;
				}

				m = "0";

				if (x > 1e-21) {
					// 1e-21 < x < 1e21
					// -70 < log2(x) < 70
					e = log(x * pow(2, 69, 1)) - 69;
					z = (e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1));
					z *= 0x10000000000000; // Math.pow(2, 52);
					e = 52 - e;

					// -18 < e < 122
					// x = z / 2 ^ e
					if (e > 0) {
						multiply(0, z);
						j = f;

						while (j >= 7) {
							multiply(1e7, 0);
							j -= 7;
						}

						multiply(pow(10, j, 1), 0);
						j = e - 1;

						while (j >= 23) {
							divide(1 << 23);
							j -= 23;
						}

						divide(1 << j);
						multiply(1, 1);
						divide(2);
						m = numToString();
					} else {
						multiply(0, z);
						multiply(1 << (-e), 0);
						m = numToString() + '0.00000000000000000000'.slice(2, 2 + f);
					}
				}

				if (f > 0) {
					k = m.length;

					if (k <= f) {
						m = s + '0.0000000000000000000'.slice(0, f - k + 2) + m;
					} else {
						m = s + m.slice(0, k - f) + '.' + m.slice(k - f);
					}
				} else {
					m = s + m;
				}

				return m;
			};
		}());
	}


//
// String
// ======
//

// ES5 15.5.4.14
// http://es5.github.com/#x15.5.4.14

// [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
// Many browsers do not split properly with regular expressions or they
// do not perform the split correctly under obscure conditions.
// See http://blog.stevenlevithan.com/archives/cross-browser-split
// I've tested in many browsers and this seems to cover the deviant ones:
// 'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
// '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
// 'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
// [undefined, "t", undefined, "e", ...]
// ''.split(/.?/) should be [], not [""]
// '.'.split(/()()/) should be ["."], not ["", "", "."]

	var string_split = String.prototype.split;
	if (
		'ab'.split(/(?:ab)*/).length !== 2 ||
			'.'.split(/(.?)(.?)/).length !== 4 ||
			'tesst'.split(/(s)*/)[1] === "t" ||
			'test'.split(/(?:)/, -1).length !== 4 ||
			''.split(/.?/).length ||
			'.'.split(/()()/).length > 1
		) {
		(function () {
			var compliantExecNpcg = /()??/.exec("")[1] === void 0; // NPCG: nonparticipating capturing group

			String.prototype.split = function (separator, limit) {
				var string = this;
				if (separator === void 0 && limit === 0) {
					return [];
				}

				// If `separator` is not a regex, use native split
				if (_toString.call(separator) !== "[object RegExp]") {
					return string_split.call(this, separator, limit);
				}

				var output = [],
					flags = (separator.ignoreCase ? "i" : "") +
						(separator.multiline ? "m" : "") +
						(separator.extended ? "x" : "") + // Proposed for ES6
						(separator.sticky ? "y" : ""), // Firefox 3+
					lastLastIndex = 0,
				// Make `global` and avoid `lastIndex` issues by working with a copy
					separator2, match, lastIndex, lastLength;
				separator = new RegExp(separator.source, flags + "g");
				string += ""; // Type-convert
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
				limit = limit === void 0 ?
					-1 >>> 0 : // Math.pow(2, 32) - 1
					ToUint32(limit);
				while (match = separator.exec(string)) {
					// `separator.lastIndex` is not reliable cross-browser
					lastIndex = match.index + match[0].length;
					if (lastIndex > lastLastIndex) {
						output.push(string.slice(lastLastIndex, match.index));
						// Fix browsers whose `exec` methods don't consistently return `undefined` for
						// nonparticipating capturing groups
						if (!compliantExecNpcg && match.length > 1) {
							match[0].replace(separator2, function () {
								for (var i = 1; i < arguments.length - 2; i++) {
									if (arguments[i] === void 0) {
										match[i] = void 0;
									}
								}
							});
						}
						if (match.length > 1 && match.index < string.length) {
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
				if (lastLastIndex === string.length) {
					if (lastLength || !separator.test("")) {
						output.push("");
					}
				} else {
					output.push(string.slice(lastLastIndex));
				}
				return output.length > limit ? output.slice(0, limit) : output;
			};
		}());

// [bugfix, chrome]
// If separator is undefined, then the result array contains just one String,
// which is the this value (converted to a String). If limit is not undefined,
// then the output array is truncated so that it contains no more than limit
// elements.
// "0".split(undefined, 0) -> []
	} else if ("0".split(void 0, 0).length) {
		String.prototype.split = function split(separator, limit) {
			if (separator === void 0 && limit === 0) { return []; }
			return string_split.call(this, separator, limit);
		};
	}

	var str_replace = String.prototype.replace;
	var replaceReportsGroupsCorrectly = (function () {
		var groups = [];
		'x'.replace(/x(.)?/g, function (match, group) {
			groups.push(group);
		});
		return groups.length === 1 && typeof groups[0] === 'undefined';
	}());

	if (!replaceReportsGroupsCorrectly) {
		String.prototype.replace = function replace(searchValue, replaceValue) {
			var isFn = isFunction(replaceValue);
			var hasCapturingGroups = isRegex(searchValue) && (/\)[*?]/).test(searchValue.source);
			if (!isFn || !hasCapturingGroups) {
				return str_replace.call(this, searchValue, replaceValue);
			} else {
				var wrappedReplaceValue = function (match) {
					var length = arguments.length;
					var originalLastIndex = searchValue.lastIndex;
					searchValue.lastIndex = 0;
					var args = searchValue.exec(match);
					searchValue.lastIndex = originalLastIndex;
					args.push(arguments[length - 2], arguments[length - 1]);
					return replaceValue.apply(this, args);
				};
				return str_replace.call(this, searchValue, wrappedReplaceValue);
			}
		};
	}

// ECMA-262, 3rd B.2.3
// Not an ECMAScript standard, although ECMAScript 3rd Edition has a
// non-normative section suggesting uniform semantics and it should be
// normalized across all browsers
// [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
	if ("".substr && "0b".substr(-1) !== "b") {
		var string_substr = String.prototype.substr;
		/**
		 * Get the substring of a string
		 * @param {integer} start where to start the substring
		 * @param {integer} length how many characters to return
		 * @return {string}
		 */
		String.prototype.substr = function substr(start, length) {
			return string_substr.call(
				this,
				start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,
				length
			);
		};
	}

// ES5 15.5.4.20
// whitespace from: http://es5.github.io/#x15.5.4.20
	var ws = "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003" +
		"\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028" +
		"\u2029\uFEFF";
	var zeroWidth = '\u200b';
	if (!String.prototype.trim || ws.trim() || !zeroWidth.trim()) {
		// http://blog.stevenlevithan.com/archives/faster-trim-javascript
		// http://perfectionkills.com/whitespace-deviations/
		ws = "[" + ws + "]";
		var trimBeginRegexp = new RegExp("^" + ws + ws + "*"),
			trimEndRegexp = new RegExp(ws + ws + "*$");
		String.prototype.trim = function trim() {
			if (this === void 0 || this === null) {
				throw new TypeError("can't convert " + this + " to object");
			}
			return String(this)
				.replace(trimBeginRegexp, "")
				.replace(trimEndRegexp, "");
		};
	}

// ES-5 15.1.2.2
	if (parseInt(ws + '08') !== 8 || parseInt(ws + '0x16') !== 22) {
		parseInt = (function (origParseInt) {
			var hexRegex = /^0[xX]/;
			return function parseIntES5(str, radix) {
				str = String(str).trim();
				if (!Number(radix)) {
					radix = hexRegex.test(str) ? 16 : 10;
				}
				return origParseInt(str, radix);
			};
		}(parseInt));
	}

//
// Util
// ======
//

// ES5 9.4
// http://es5.github.com/#x9.4
// http://jsperf.com/to-integer

	function toInteger(n) {
		n = +n;
		if (n !== n) { // isNaN
			n = 0;
		} else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
			n = (n > 0 || -1) * Math.floor(Math.abs(n));
		}
		return n;
	}

	function isPrimitive(input) {
		var type = typeof input;
		return (
			input === null ||
				type === "undefined" ||
				type === "boolean" ||
				type === "number" ||
				type === "string"
			);
	}

	function toPrimitive(input) {
		var val, valueOf, toStr;
		if (isPrimitive(input)) {
			return input;
		}
		valueOf = input.valueOf;
		if (isFunction(valueOf)) {
			val = valueOf.call(input);
			if (isPrimitive(val)) {
				return val;
			}
		}
		toStr = input.toString;
		if (isFunction(toStr)) {
			val = toStr.call(input);
			if (isPrimitive(val)) {
				return val;
			}
		}
		throw new TypeError();
	}

// ES5 9.9
// http://es5.github.com/#x9.9
	var toObject = function (o) {
		if (o == null) { // this matches both null and undefined
			throw new TypeError("can't convert " + o + " to object");
		}
		return Object(o);
	};

	var ToUint32 = function ToUint32(x) {
		return x >>> 0;
	};

})();




(function($, shims){
	var defineProperty = 'defineProperty';
	var advancedObjectProperties = !!(Object.create && Object.defineProperties && Object.getOwnPropertyDescriptor);
	//safari5 has defineProperty-interface, but it can't be used on dom-object
	//only do this test in non-IE browsers, because this hurts dhtml-behavior in some IE8 versions
	if (advancedObjectProperties && Object[defineProperty] && Object.prototype.__defineGetter__) {
		(function(){
			try {
				var foo = document.createElement('foo');
				Object[defineProperty](foo, 'bar', {
					get: function(){
						return true;
					}
				});
				advancedObjectProperties = !!foo.bar;
			} 
			catch (e) {
				advancedObjectProperties = false;
			}
			foo = null;
		})();
	}
	
	Modernizr.objectAccessor = !!((advancedObjectProperties || (Object.prototype.__defineGetter__ && Object.prototype.__lookupSetter__)));
	Modernizr.advancedObjectProperties = advancedObjectProperties;
	
if((!advancedObjectProperties || !Object.create || !Object.defineProperties || !Object.getOwnPropertyDescriptor  || !Object.defineProperty)){
	var call = Function.prototype.call;
	var prototypeOfObject = Object.prototype;
	var owns = call.bind(prototypeOfObject.hasOwnProperty);
	
	shims.objectCreate = function(proto, props, opts, no__proto__){
		var o;
		var f = function(){};
		
		f.prototype = proto;
		o = new f();
		
		if(!no__proto__ && !('__proto__' in o) && !Modernizr.objectAccessor){
			o.__proto__ = proto;
		}
		
		if(props){
			shims.defineProperties(o, props);
		}
		
		if(opts){
			o.options = $.extend(true, {}, o.options || {}, opts);
			opts = o.options;
		}
		
		if(o._create && $.isFunction(o._create)){
			o._create(opts);
		}
		return o;
	};
	
	shims.defineProperties = function(object, props){
		for (var name in props) {
			if (owns(props, name)) {
				shims.defineProperty(object, name, props[name]);
			}
		}
		return object;
	};
	
	var descProps = ['configurable', 'enumerable', 'writable'];
	shims.defineProperty = function(proto, property, descriptor){
		if(typeof descriptor != "object" || descriptor === null){return proto;}
		
		if(owns(descriptor, "value")){
			proto[property] = descriptor.value;
			return proto;
		}
		
		if(proto.__defineGetter__){
            if (typeof descriptor.get == "function") {
				proto.__defineGetter__(property, descriptor.get);
			}
            if (typeof descriptor.set == "function"){
                proto.__defineSetter__(property, descriptor.set);
			}
        }
		return proto;
	};
	
	shims.getPrototypeOf = function (object) {
        return Object.getPrototypeOf && Object.getPrototypeOf(object) || object.__proto__ || object.constructor && object.constructor.prototype;
    };
	
	//based on http://www.refactory.org/s/object_getownpropertydescriptor/view/latest 
	shims.getOwnPropertyDescriptor = function(obj, prop){
		if (typeof obj !== "object" && typeof obj !== "function" || obj === null){
            throw new TypeError("Object.getOwnPropertyDescriptor called on a non-object");
		}
		var descriptor;
		if(Object.defineProperty && Object.getOwnPropertyDescriptor){
			try{
				descriptor = Object.getOwnPropertyDescriptor(obj, prop);
				return descriptor;
			} catch(e){}
		}
        descriptor = {
            configurable: true,
            enumerable: true,
            writable: true,
            value: undefined
        };
		var getter = obj.__lookupGetter__ && obj.__lookupGetter__(prop), 
			setter = obj.__lookupSetter__ && obj.__lookupSetter__(prop)
		;
        
        if (!getter && !setter) { // not an accessor so return prop
        	if(!owns(obj, prop)){
				return;
			}
            descriptor.value = obj[prop];
            return descriptor;
        }
        
        // there is an accessor, remove descriptor.writable; populate descriptor.get and descriptor.set
        delete descriptor.writable;
        delete descriptor.value;
        descriptor.get = descriptor.set = undefined;
        
        if(getter){
			descriptor.get = getter;
		}
        
        if(setter){
            descriptor.set = setter;
		}
        
        return descriptor;
    };

}
webshims.isReady('es5', true);
})(webshims.$, webshims);


;webshims.register('form-number-date-api', function($, webshims, window, document, undefined, options){
	"use strict";
	if(!webshims.addInputType){
		webshims.error("you can not call forms-ext feature after calling forms feature. call both at once instead: $.webshims.polyfill('forms forms-ext')");
	}
	
	if(!webshims.getStep){
		webshims.getStep = function(elem, type){
			var step = $.attr(elem, 'step');
			if(step === 'any'){
				return step;
			}
			type = type || getType(elem);
			if(!typeModels[type] || !typeModels[type].step){
				return step;
			}
			step = typeProtos.number.asNumber(step);
			return ((!isNaN(step) && step > 0) ? step : typeModels[type].step) * (typeModels[type].stepScaleFactor || 1);
		};
	}
	if(!webshims.addMinMaxNumberToCache){
		webshims.addMinMaxNumberToCache = function(attr, elem, cache){
			if (!(attr+'AsNumber' in cache)) {
				cache[attr+'AsNumber'] = typeModels[cache.type].asNumber(elem.attr(attr));
				if(isNaN(cache[attr+'AsNumber']) && (attr+'Default' in typeModels[cache.type])){
					cache[attr+'AsNumber'] = typeModels[cache.type][attr+'Default'];
				}
			}
		};
	}
	
	var nan = parseInt('NaN', 10),
		doc = document,
		typeModels = webshims.inputTypes,
		isNumber = function(string){
			return (typeof string == 'number' || (string && string == string * 1));
		},
		supportsType = function(type){
			return ($('<input type="'+type+'" />').prop('type') === type);
		},
		getType = function(elem){
			return (elem.getAttribute('type') || '').toLowerCase();
		},
		isDateTimePart = function(string){
			return (string && !(isNaN(string * 1)));
		},
		addMinMaxNumberToCache = webshims.addMinMaxNumberToCache,
		addleadingZero = function(val, len){
			val = ''+val;
			len = len - val.length;
			for(var i = 0; i < len; i++){
				val = '0'+val;
			}
			return val;
		},
		EPS = 1e-7,
		typeBugs = webshims.bugs.bustedValidity
	;
	
	webshims.addValidityRule('stepMismatch', function(input, val, cache, validityState){
		if(val === ''){return false;}
		if(!('type' in cache)){
			cache.type = getType(input[0]);
		}
		if(cache.type == 'week'){return false;}
		var base, attrVal;
		var ret = (validityState || {}).stepMismatch || false;
		if(typeModels[cache.type] && typeModels[cache.type].step){
			if( !('step' in cache) ){
				cache.step = webshims.getStep(input[0], cache.type);
			}
			
			if(cache.step == 'any'){return false;}
			
			if(!('valueAsNumber' in cache)){
				cache.valueAsNumber = typeModels[cache.type].asNumber( val );
			}
			if(isNaN(cache.valueAsNumber)){return false;}
			
			addMinMaxNumberToCache('min', input, cache);
			base = cache.minAsNumber;
			
			if(isNaN(base) && (attrVal = input.prop('defaultValue'))){
				base = typeModels[cache.type].asNumber( attrVal );
			}
			
			if(isNaN(base)){
				base = typeModels[cache.type].stepBase || 0;
			}
			
			ret =  Math.abs((cache.valueAsNumber - base) % cache.step);
							
			ret = !(  ret <= EPS || Math.abs(ret - cache.step) <= EPS  );
		}
		return ret;
	});
	
	
	
	[{name: 'rangeOverflow', attr: 'max', factor: 1}, {name: 'rangeUnderflow', attr: 'min', factor: -1}].forEach(function(data, i){
		webshims.addValidityRule(data.name, function(input, val, cache, validityState) {
			var ret = (validityState || {})[data.name] || false;
			if(val === ''){return ret;}
			if (!('type' in cache)) {
				cache.type = getType(input[0]);
			}
			if (typeModels[cache.type] && typeModels[cache.type].asNumber) {
				if(!('valueAsNumber' in cache)){
					cache.valueAsNumber = typeModels[cache.type].asNumber( val );
				}
				if(isNaN(cache.valueAsNumber)){
					return false;
				}
				
				addMinMaxNumberToCache(data.attr, input, cache);
				
				if(isNaN(cache[data.attr+'AsNumber'])){
					return ret;
				}
				ret = ( cache[data.attr+'AsNumber'] * data.factor <  cache.valueAsNumber * data.factor - EPS );
			}
			return ret;
		});
	});
	
	webshims.reflectProperties(['input'], ['max', 'min', 'step']);
	
	
	//IDLs and methods, that aren't part of constrain validation, but strongly tight to it
	var valueAsNumberDescriptor = webshims.defineNodeNameProperty('input', 'valueAsNumber', {
		prop: {
			get: function(){
				var elem = this;
				var type = getType(elem);
				var ret = (typeModels[type] && typeModels[type].asNumber) ? 
					typeModels[type].asNumber($.prop(elem, 'value')) :
					(valueAsNumberDescriptor.prop._supget && valueAsNumberDescriptor.prop._supget.apply(elem, arguments));
				if(ret == null){
					ret = nan;
				}
				return ret;
			},
			set: function(val){
				var elem = this;
				var type = getType(elem);
				if(typeModels[type] && typeModels[type].numberToString){
					//is NaN a number?
					if(isNaN(val)){
						$.prop(elem, 'value', '');
						return;
					}
					var set = typeModels[type].numberToString(val);
					if(set !==  false){
						$.prop(elem, 'value', set);
					} else {
						webshims.error('INVALID_STATE_ERR: DOM Exception 11');
					}
				} else if(valueAsNumberDescriptor.prop._supset) {
					 valueAsNumberDescriptor.prop._supset.apply(elem, arguments);
				}
			}
		}
	});
	
	var valueAsDateDescriptor = webshims.defineNodeNameProperty('input', 'valueAsDate', {
		prop: {
			get: function(){
				var elem = this;
				var type = getType(elem);
				return (typeModels[type] && typeModels[type].asDate && !typeModels[type].noAsDate) ? 
					typeModels[type].asDate($.prop(elem, 'value')) :
					valueAsDateDescriptor.prop._supget && valueAsDateDescriptor.prop._supget.call(elem) || null;
			},
			set: function(value){
				var elem = this;
				var type = getType(elem);
				if(typeModels[type] && typeModels[type].dateToString && !typeModels[type].noAsDate){
					
					if(value === null){
						$.prop(elem, 'value', '');
						return '';
					}
					var set = typeModels[type].dateToString(value);
					if(set !== false){
						$.prop(elem, 'value', set);
						return set;
					} else {
						webshims.error('INVALID_STATE_ERR: DOM Exception 11');
					}
				} else {
					return valueAsDateDescriptor.prop._supset && valueAsDateDescriptor.prop._supset.apply(elem, arguments) || null;
				}
			}
		}
	});
	
	$.each({stepUp: 1, stepDown: -1}, function(name, stepFactor){
		var stepDescriptor = webshims.defineNodeNameProperty('input', name, {
			prop: {
				value: function(factor){
					var step, val, valModStep, alignValue, cache, base, attrVal;
					var type = getType(this);
					if(typeModels[type] && typeModels[type].asNumber){
						cache = {type: type};
						if(!factor){
							factor = 1;
							webshims.warn("you should always use a factor for stepUp/stepDown");
						}
						factor *= stepFactor;
						

						

						
						step = webshims.getStep(this, type);
						
						if(step == 'any'){
							webshims.info("step is 'any' can't apply stepUp/stepDown");
							throw('invalid state error');
						}
						
						webshims.addMinMaxNumberToCache('min', $(this), cache);
						webshims.addMinMaxNumberToCache('max', $(this), cache);

						val = $.prop(this, 'valueAsNumber');

						if(factor > 0 && !isNaN(cache.minAsNumber) && (isNaN(val) || cache.minAsNumber > val)){
							$.prop(this, 'valueAsNumber', cache.minAsNumber);
							return;
						} else if(factor < 0 && !isNaN(cache.maxAsNumber) && (isNaN(val) || cache.maxAsNumber < val)){
							$.prop(this, 'valueAsNumber', cache.maxAsNumber);
							return;
						}

						if(isNaN(val)){
							val = 0;
						}

						base = cache.minAsNumber;
						
						if(isNaN(base) && (attrVal = $.prop(this, 'defaultValue'))){
							base = typeModels[type].asNumber( attrVal );
						}
						
						if(!base){
							base = 0;
						}
						
						step *= factor;
						
						val = (val + step).toFixed(5) * 1;
						
						valModStep = (val - base) % step;
						
						if ( valModStep && (Math.abs(valModStep) > EPS) ) {
							alignValue = val - valModStep;
							alignValue += ( valModStep > 0 ) ? step : ( -step );
							val = alignValue.toFixed(5) * 1;
						}
						
						if( (!isNaN(cache.maxAsNumber) && val > cache.maxAsNumber) || (!isNaN(cache.minAsNumber) && val < cache.minAsNumber) ){
							webshims.info("max/min overflow can't apply stepUp/stepDown");
							return;
						}
						
						$.prop(this, 'valueAsNumber', val);
						
					} else if(stepDescriptor.prop && stepDescriptor.prop._supvalue){
						return stepDescriptor.prop._supvalue.apply(this, arguments);
					} else {
						webshims.info("no step method for type: "+ type);
						throw('invalid state error');
					}
				}
			}
		});
	});
	
	/*
	 * ToDO: WEEK
	 */
//	var getWeek = function(date){
//		var time;
//		var checkDate = new Date(date.getTime());
//
//		checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
//
//		time = checkDate.getTime();
//		checkDate.setMonth(0);
//		checkDate.setDate(1);
//		return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
//	};
//	
//	var setWeek = function(year, week){
//		var date = new Date(year, 0, 1);
//		
//		week = (week - 1) * 86400000 * 7;
//		date = new Date(date.getTime() + week);
//		date.setDate(date.getDate() + 1 - (date.getDay() || 7));
//		return date;
//	};
	
	var typeProtos = {
		
		number: {
			bad: function(val){
				return !(isNumber(val));
			},
			step: 1,
			//stepBase: 0, 0 = default
			stepScaleFactor: 1,
			asNumber: function(str){
				return (isNumber(str)) ? str * 1 : nan;
			},
			numberToString: function(num){
				return (isNumber(num)) ? num : false;
			}
		},
		
		range: {
			minDefault: 0,
			maxDefault: 100
		},
		color: {
			bad: (function(){
				var cReg = /^\u0023[a-f0-9]{6}$/;
				return function(val){
					return (!val || val.length != 7 || !(cReg.test(val)));
				};
			})()
		},
		date: {
			bad: function(val){
				if(!val || !val.split || !(/\d$/.test(val))){return true;}
				var i;
				var valA = val.split(/\u002D/);
				if(valA.length !== 3){return true;}
				var ret = false;
				
				
				if(valA[0].length < 4 || valA[1].length != 2 || valA[1] > 12 || valA[2].length != 2 || valA[2] > 33){
					ret = true;
				} else {
					for(i = 0; i < 3; i++){
						if(!isDateTimePart(valA[i])){
							ret = true;
							break;
						}
					}
				}
				
				return ret || (val !== this.dateToString( this.asDate(val, true) ) );
			},
			step: 1,
			//stepBase: 0, 0 = default
			stepScaleFactor:  86400000,
			asDate: function(val, _noMismatch){
				if(!_noMismatch && this.bad(val)){
					return null;
				}
				return new Date(this.asNumber(val, true));
			},
			asNumber: function(str, _noMismatch){
				var ret = nan;
				if(_noMismatch || !this.bad(str)){
					str = str.split(/\u002D/);
					ret = Date.UTC(str[0], str[1] - 1, str[2]);
				}
				return ret;
			},
			numberToString: function(num){
				return (isNumber(num)) ? this.dateToString(new Date( num * 1)) : false;
			},
			dateToString: function(date){
				return (date && date.getFullYear) ? addleadingZero(date.getUTCFullYear(), 4) +'-'+ addleadingZero(date.getUTCMonth()+1, 2) +'-'+ addleadingZero(date.getUTCDate(), 2) : false;
			}
		},
		/*
		 * ToDO: WEEK
		 */
//		week: {
//			bad: function(val){
//				if(!val || !val.split){return true;}
//				var valA = val.split('-W');
//				var ret = true;
//				if(valA.length == 2 && valA[0].length > 3 && valA.length == 2){
//					ret = this.dateToString(setWeek(valA[0], valA[1])) != val;
//				}
//				return ret;
//			},
//			step: 1,
//			stepScaleFactor: 604800000,
//			stepBase: -259200000,
//			asDate: function(str, _noMismatch){
//				var ret = null;
//				if(_noMismatch || !this.bad(str)){
//					ret = str.split('-W');
//					ret = setWeek(ret[0], ret[1]);
//				}
//				return ret;
//			},
//			asNumber: function(str, _noMismatch){
//				var ret = nan;
//				var date = this.asDate(str, _noMismatch);
//				if(date && date.getUTCFullYear){
//					ret = date.getTime();
//				}
//				return ret;
//			},
//			dateToString: function(date){
//				var week, checkDate;
//				var ret = false;
//				if(date && date.getFullYear){
//					week = getWeek(date);
//					if(week == 1){
//						checkDate = new Date(date.getTime());
//						checkDate.setDate(checkDate.getDate() + 7);
//						date.setUTCFullYear(checkDate.getUTCFullYear());
//					}
//					ret = addleadingZero(date.getUTCFullYear(), 4) +'-W'+addleadingZero(week, 2);
//				}
//				return ret;
//			},
//			numberToString: function(num){
//				return (isNumber(num)) ? this.dateToString(new Date( num * 1)) : false;
//			}
//		},
		time: {
			bad: function(val, _getParsed){
				if(!val || !val.split || !(/\d$/.test(val))){return true;}
				val = val.split(/\u003A/);
				if(val.length < 2 || val.length > 3){return true;}
				var ret = false,
					sFraction;
				if(val[2]){
					val[2] = val[2].split(/\u002E/);
					sFraction = parseInt(val[2][1], 10);
					val[2] = val[2][0];
				}
				$.each(val, function(i, part){
					if(!isDateTimePart(part) || part.length !== 2){
						ret = true;
						return false;
					}
				});
				if(ret){return true;}
				if(val[0] > 23 || val[0] < 0 || val[1] > 59 || val[1] < 0){
					return true;
				}
				if(val[2] && (val[2] > 59 || val[2] < 0 )){
					return true;
				}
				if(sFraction && isNaN(sFraction)){
					return true;
				}
				if(sFraction){
					if(sFraction < 100){
						sFraction *= 100;
					} else if(sFraction < 10){
						sFraction *= 10;
					}
				}
				return (_getParsed === true) ? [val, sFraction] : false;
			},
			step: 60,
			stepBase: 0,
			stepScaleFactor:  1000,
			asDate: function(val){
				val = new Date(this.asNumber(val));
				return (isNaN(val)) ? null : val;
			},
			asNumber: function(val){
				var ret = nan;
				val = this.bad(val, true);
				if(val !== true){
					ret = Date.UTC('1970', 0, 1, val[0][0], val[0][1], val[0][2] || 0);
					if(val[1]){
						ret += val[1];
					}
				}
				return ret;
			},
			dateToString: function(date){
				if(date && date.getUTCHours){
					var str = addleadingZero(date.getUTCHours(), 2) +':'+ addleadingZero(date.getUTCMinutes(), 2),
						tmp = date.getSeconds()
					;
					if(tmp != "0"){
						str += ':'+ addleadingZero(tmp, 2);
					}
					tmp = date.getUTCMilliseconds();
					if(tmp != "0"){
						str += '.'+ addleadingZero(tmp, 3);
					}
					return str;
				} else {
					return false;
				}
			}
		},
		month: {
			bad: function(val){
				return typeProtos.date.bad(val+'-01');
			},
			step: 1,
			stepScaleFactor:  false,
			//stepBase: 0, 0 = default
			asDate: function(val){
				return new Date(typeProtos.date.asNumber(val+'-01'));
			},
			asNumber: function(val){
				//1970-01
				var ret = nan;
				if(val && !this.bad(val)){
					val = val.split(/\u002D/);
					val[0] = (val[0] * 1) - 1970;
					val[1] = (val[1] * 1) - 1;
					ret = (val[0] * 12) + val[1];
				}
				return ret;
			},
			numberToString: function(num){
				var mod;
				var ret = false;
				if(isNumber(num)){
					mod = (num % 12);
					num = ((num - mod) / 12) + 1970;
					mod += 1;
					if(mod < 1){
						num -= 1;
						mod += 12;
					}
					ret = addleadingZero(num, 4)+'-'+addleadingZero(mod, 2);
					
				}
				
				return ret;
			},
			dateToString: function(date){
				if(date && date.getUTCHours){
					var str = typeProtos.date.dateToString(date);
					return (str.split && (str = str.split(/\u002D/))) ? str[0]+'-'+str[1] : false;
				} else {
					return false;
				}
			}
		}
		,'datetime-local': {
			bad: function(val, _getParsed){
				if(!val || !val.split || (val+'special').split(/\u0054/).length !== 2){return true;}
				val = val.split(/\u0054/);
				return ( typeProtos.date.bad(val[0]) || typeProtos.time.bad(val[1], _getParsed) );
			},
			noAsDate: true,
			asDate: function(val){
				val = new Date(this.asNumber(val));
				
				return (isNaN(val)) ? null : val;
			},
			asNumber: function(val){
				var ret = nan;
				var time = this.bad(val, true);
				if(time !== true){
					val = val.split(/\u0054/)[0].split(/\u002D/);
					
					ret = Date.UTC(val[0], val[1] - 1, val[2], time[0][0], time[0][1], time[0][2] || 0);
					if(time[1]){
						ret += time[1];
					}
				}
				return ret;
			},
			dateToString: function(date, _getParsed){
				return typeProtos.date.dateToString(date) +'T'+ typeProtos.time.dateToString(date, _getParsed);
			}
		}
	};
	
	if(typeBugs || !supportsType('range') || !supportsType('time') || !supportsType('month') || !supportsType('datetime-local')){
		typeProtos.range = $.extend({}, typeProtos.number, typeProtos.range);
		typeProtos.time = $.extend({}, typeProtos.date, typeProtos.time);
		typeProtos.month = $.extend({}, typeProtos.date, typeProtos.month);
		typeProtos['datetime-local'] = $.extend({}, typeProtos.date, typeProtos.time, typeProtos['datetime-local']);
	}
	
	//
	['number', 'month', 'range', 'date', 'time', 'color', 'datetime-local'].forEach(function(type){
		if(typeBugs || !supportsType(type)){
			webshims.addInputType(type, typeProtos[type]);
		}
	});
	
	if($('<input />').prop('labels') == null){
		webshims.defineNodeNamesProperty('button, input, keygen, meter, output, progress, select, textarea', 'labels', {
			prop: {
				get: function(){
					if(this.type == 'hidden'){return null;}
					var id = this.id;
					var labels = $(this)
						.closest('label')
						.filter(function(){
							var hFor = (this.attributes['for'] || {});
							return (!hFor.specified || hFor.value == id);
						})
					;
					
					if(id) {
						labels = labels.add('label[for="'+ id +'"]');
					}
					return labels.get();
				},
				writeable: false
			}
		});
	}
	
});
;webshims.register('form-datalist', function($, webshims, window, document, undefined, options){
	"use strict";
	var lazyLoad = function(name){
		if(!name || typeof name != 'string'){
			name = 'DOM';
		}
		if(!lazyLoad[name+'Loaded']){
			lazyLoad[name+'Loaded'] = true;
			webshims.ready(name, function(){
				webshims.loader.loadList(['form-datalist-lazy']);
			});
		}
	};
	var noDatalistSupport = {
		submit: 1,
		button: 1,
		reset: 1, 
		hidden: 1,
		
		range: 1,
		date: 1,
		month: 1
	};
	if(webshims.modules["form-number-date-ui"].loaded){
		$.extend(noDatalistSupport, {
			number: 1,
			time: 1
		});
	}
	

	/*
	 * implement propType "element" currently only used for list-attribute (will be moved to dom-extend, if needed)
	 */
	webshims.propTypes.element = function(descs, name){
		webshims.createPropDefault(descs, 'attr');
		if(descs.prop){return;}
		descs.prop = {
			get: function(){
				var elem = $.attr(this, name);
				if(elem){
					elem = document.getElementById(elem);
					if(elem && descs.propNodeName && !$.nodeName(elem, descs.propNodeName)){
						elem = null;
					}
				}
				return elem || null;
			},
			writeable: false
		};
	};
	
	
	/*
	 * Implements datalist element and list attribute
	 */
	
	(function(){
		var formsCFG = $.webshims.cfg.forms;
		var listSupport = Modernizr.input.list;
		if(listSupport && !formsCFG.customDatalist){return;}
		
			var initializeDatalist =  function(){
			
			var updateDatlistAndOptions = function(){
				var id;
				if(!$.data(this, 'datalistWidgetData') && (id = $.prop(this, 'id'))){
					$('input[list="'+ id +'"], input[data-wslist="'+ id +'"]').eq(0).attr('list', id);
				} else {
					$(this).triggerHandler('updateDatalist');
				}
			};
				
			var inputListProto = {
				//override autocomplete
				autocomplete: {
					attr: {
						get: function(){
							var elem = this;
							var data = $.data(elem, 'datalistWidget');
							if(data){
								return data._autocomplete;
							}
							return ('autocomplete' in elem) ? elem.autocomplete : elem.getAttribute('autocomplete');
						},
						set: function(value){
							var elem = this;
							var data = $.data(elem, 'datalistWidget');
							if(data){
								data._autocomplete = value;
								if(value == 'off'){
									data.hideList();
								}
							} else {
								if('autocomplete' in elem){
									elem.autocomplete = value;
								} else {
									elem.setAttribute('autocomplete', value);
								}
							}
						}
					}
				}
			};
			
			if(listSupport){
				//options only return options, if option-elements are rooted: but this makes this part of HTML5 less backwards compatible
				if(!($('<datalist><select><option></option></select></datalist>').prop('options') || []).length ){
					webshims.defineNodeNameProperty('datalist', 'options', {
						prop: {
							writeable: false,
							get: function(){
								var options = this.options || [];
								if(!options.length){
									var elem = this;
									var select = $('select', elem);
									if(select[0] && select[0].options && select[0].options.length){
										options = select[0].options;
									}
								}
								return options;
							}
						}
					});
				}
				inputListProto.list = {
					attr: {
						get: function(){
							var val = webshims.contentAttr(this, 'list');
							if(val != null){
								$.data(this, 'datalistListAttr', val);
								if(!noDatalistSupport[$.prop(this, 'type')] && !noDatalistSupport[$.attr(this, 'type')]){
									this.removeAttribute('list');
								}
							} else {
								val = $.data(this, 'datalistListAttr');
							}
							
							return (val == null) ? undefined : val;
						},
						set: function(value){
							var elem = this;
							$.data(elem, 'datalistListAttr', value);
							if (!noDatalistSupport[$.prop(this, 'type')] && !noDatalistSupport[$.attr(this, 'type')]) {
								webshims.objectCreate(shadowListProto, undefined, {
									input: elem,
									id: value,
									datalist: $.prop(elem, 'list')
								});
								elem.setAttribute('data-wslist', value);
							} else {
								elem.setAttribute('list', value);
							}
							$(elem).triggerHandler('listdatalistchange');
						}
					},
					initAttr: true,
					reflect: true,
					propType: 'element',
					propNodeName: 'datalist'
				};
			} else {
				webshims.defineNodeNameProperties('input', {
					list: {
						attr: {
							get: function(){
								var val = webshims.contentAttr(this, 'list');
								return (val == null) ? undefined : val;
							},
							set: function(value){
								var elem = this;
								webshims.contentAttr(elem, 'list', value);
								webshims.objectCreate(options.shadowListProto, undefined, {input: elem, id: value, datalist: $.prop(elem, 'list')});
								$(elem).triggerHandler('listdatalistchange');
							}
						},
						initAttr: true,
						reflect: true,
						propType: 'element',
						propNodeName: 'datalist'
					}
				});
			}
			
			webshims.defineNodeNameProperties('input', inputListProto);
			
			webshims.addReady(function(context, contextElem){
				contextElem
					.filter('datalist > select, datalist, datalist > option, datalist > select > option')
					.closest('datalist')
					.each(updateDatlistAndOptions)
				;
			});
		};
		
		
		/*
		 * ShadowList
		 */
		
		var shadowListProto = {
			_create: function(opts){
				
				if(noDatalistSupport[$.prop(opts.input, 'type')] || noDatalistSupport[$.attr(opts.input, 'type')]){return;}
				var datalist = opts.datalist;
				var data = $.data(opts.input, 'datalistWidget');
				var that = this;
				if(datalist && data && data.datalist !== datalist){
					data.datalist = datalist;
					data.id = opts.id;
					
					
					$(data.datalist)
						.off('updateDatalist.datalistWidget')
						.on('updateDatalist.datalistWidget', $.proxy(data, '_resetListCached'))
					;
					
					data._resetListCached();
					return;
				} else if(!datalist){
					if(data){
						data.destroy();
					}
					return;
				} else if(data && data.datalist === datalist){
					return;
				}
				
				
				
				this.datalist = datalist;
				this.id = opts.id;
				this.hasViewableData = true;
				this._autocomplete = $.attr(opts.input, 'autocomplete');
				$.data(opts.input, 'datalistWidget', this);
				$.data(datalist, 'datalistWidgetData', this);
				
				lazyLoad('WINDOWLOAD');
				
				if(webshims.isReady('form-datalist-lazy')){
					if(window.QUnit){
						that._lazyCreate(opts);
					} else {
						setTimeout(function(){
							that._lazyCreate(opts);
						}, 9);
					}
				} else {
					$(opts.input).one('focus', lazyLoad);
					webshims.ready('form-datalist-lazy', function(){
						if(!that._destroyed){
							that._lazyCreate(opts);
						}
					});
				}
			},
			destroy: function(e){
				var input;
				var autocomplete = $.attr(this.input, 'autocomplete');
				$(this.input)
					.off('.datalistWidget')
					.removeData('datalistWidget')
				;
				this.shadowList.remove();
				$(document).off('.datalist'+this.id);
				$(window).off('.datalist'+this.id);
				if(this.input.form && this.input.id){
					$(this.input.form).off('submit.datalistWidget'+this.input.id);
				}
				this.input.removeAttribute('aria-haspopup');
				if(autocomplete === undefined){
					this.input.removeAttribute('autocomplete');
				} else {
					$(this.input).attr('autocomplete', autocomplete);
				}
				if(e && e.type == 'beforeunload'){
					input = this.input;
					setTimeout(function(){
						$.attr(input, 'list', $.attr(input, 'list'));
					}, 9);
				}
				this._destroyed = true;
			}
		};
		
		webshims.loader.addModule('form-datalist-lazy', {
			noAutoCallback: true,
			options: $.extend(options, {shadowListProto: shadowListProto})
		});
		if(!options.list){
			options.list = {};
		}
		//init datalist update
		initializeDatalist();
	})();
	
});
