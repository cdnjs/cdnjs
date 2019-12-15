(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Array#filter.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Object=} self
 * @return {Array}
 * @throw TypeError
 */

module.exports = function (arr, fn, self) {
  if (arr.filter) return arr.filter(fn, self);
  if (void 0 === arr || null === arr) throw new TypeError();
  if ('function' != typeof fn) throw new TypeError();
  var ret = [];
  for (var i = 0; i < arr.length; i++) {
    if (!hasOwn.call(arr, i)) continue;
    var val = arr[i];
    if (fn.call(self, val, i, arr)) ret.push(val);
  }
  return ret;
};

var hasOwn = Object.prototype.hasOwnProperty;

},{}],2:[function(require,module,exports){
/**
 * array-foreach
 *   Array#forEach ponyfill for older browsers
 *   (Ponyfill: A polyfill that doesn't overwrite the native method)
 * 
 * https://github.com/twada/array-foreach
 *
 * Copyright (c) 2015-2016 Takuto Wada
 * Licensed under the MIT license.
 *   https://github.com/twada/array-foreach/blob/master/MIT-LICENSE
 */
'use strict';

module.exports = function forEach(ary, callback, thisArg) {
    if (ary.forEach) {
        ary.forEach(callback, thisArg);
        return;
    }
    for (var i = 0; i < ary.length; i += 1) {
        callback.call(thisArg, ary[i], i, ary);
    }
};

},{}],3:[function(require,module,exports){
"use strict";

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20170427
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in window.self) {

	// Full polyfill for browsers with no classList support
	// Including IE < Edge missing SVGElement.classList
	if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {

		(function (view) {

			"use strict";

			if (!('Element' in view)) return;

			var classListProp = "classList",
			    protoProp = "prototype",
			    elemCtrProto = view.Element[protoProp],
			    objCtr = Object,
			    strTrim = String[protoProp].trim || function () {
				return this.replace(/^\s+|\s+$/g, "");
			},
			    arrIndexOf = Array[protoProp].indexOf || function (item) {
				var i = 0,
				    len = this.length;
				for (; i < len; i++) {
					if (i in this && this[i] === item) {
						return i;
					}
				}
				return -1;
			}
			// Vendors: please allow content code to instantiate DOMExceptions
			,
			    DOMEx = function DOMEx(type, message) {
				this.name = type;
				this.code = DOMException[type];
				this.message = message;
			},
			    checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
				if (token === "") {
					throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
				}
				if (/\s/.test(token)) {
					throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
				}
				return arrIndexOf.call(classList, token);
			},
			    ClassList = function ClassList(elem) {
				var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
				    classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
				    i = 0,
				    len = classes.length;
				for (; i < len; i++) {
					this.push(classes[i]);
				}
				this._updateClassName = function () {
					elem.setAttribute("class", this.toString());
				};
			},
			    classListProto = ClassList[protoProp] = [],
			    classListGetter = function classListGetter() {
				return new ClassList(this);
			};
			// Most DOMException implementations don't allow calling DOMException's toString()
			// on non-DOMExceptions. Error's toString() is sufficient here.
			DOMEx[protoProp] = Error[protoProp];
			classListProto.item = function (i) {
				return this[i] || null;
			};
			classListProto.contains = function (token) {
				token += "";
				return checkTokenAndGetIndex(this, token) !== -1;
			};
			classListProto.add = function () {
				var tokens = arguments,
				    i = 0,
				    l = tokens.length,
				    token,
				    updated = false;
				do {
					token = tokens[i] + "";
					if (checkTokenAndGetIndex(this, token) === -1) {
						this.push(token);
						updated = true;
					}
				} while (++i < l);

				if (updated) {
					this._updateClassName();
				}
			};
			classListProto.remove = function () {
				var tokens = arguments,
				    i = 0,
				    l = tokens.length,
				    token,
				    updated = false,
				    index;
				do {
					token = tokens[i] + "";
					index = checkTokenAndGetIndex(this, token);
					while (index !== -1) {
						this.splice(index, 1);
						updated = true;
						index = checkTokenAndGetIndex(this, token);
					}
				} while (++i < l);

				if (updated) {
					this._updateClassName();
				}
			};
			classListProto.toggle = function (token, force) {
				token += "";

				var result = this.contains(token),
				    method = result ? force !== true && "remove" : force !== false && "add";

				if (method) {
					this[method](token);
				}

				if (force === true || force === false) {
					return force;
				} else {
					return !result;
				}
			};
			classListProto.toString = function () {
				return this.join(" ");
			};

			if (objCtr.defineProperty) {
				var classListPropDesc = {
					get: classListGetter,
					enumerable: true,
					configurable: true
				};
				try {
					objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
				} catch (ex) {
					// IE 8 doesn't support enumerable:true
					// adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
					// modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
					if (ex.number === undefined || ex.number === -0x7FF5EC54) {
						classListPropDesc.enumerable = false;
						objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
					}
				}
			} else if (objCtr[protoProp].__defineGetter__) {
				elemCtrProto.__defineGetter__(classListProp, classListGetter);
			}
		})(window.self);
	}

	// There is full or partial native classList support, so just check if we need
	// to normalize the add/remove and toggle APIs.

	(function () {
		"use strict";

		var testElement = document.createElement("_");

		testElement.classList.add("c1", "c2");

		// Polyfill for IE 10/11 and Firefox <26, where classList.add and
		// classList.remove exist but support only one argument at a time.
		if (!testElement.classList.contains("c2")) {
			var createMethod = function createMethod(method) {
				var original = DOMTokenList.prototype[method];

				DOMTokenList.prototype[method] = function (token) {
					var i,
					    len = arguments.length;

					for (i = 0; i < len; i++) {
						token = arguments[i];
						original.call(this, token);
					}
				};
			};
			createMethod('add');
			createMethod('remove');
		}

		testElement.classList.toggle("c3", false);

		// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
		// support the second argument.
		if (testElement.classList.contains("c3")) {
			var _toggle = DOMTokenList.prototype.toggle;

			DOMTokenList.prototype.toggle = function (token, force) {
				if (1 in arguments && !this.contains(token) === !force) {
					return force;
				} else {
					return _toggle.call(this, token);
				}
			};
		}

		testElement = null;
	})();
}

},{}],4:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition();else if (typeof define == 'function' && _typeof(define.amd) == 'object') define(definition);else this[name] = definition();
}('domready', function () {

  var fns = [],
      _listener,
      doc = document,
      hack = doc.documentElement.doScroll,
      domContentLoaded = 'DOMContentLoaded',
      loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

  if (!loaded) doc.addEventListener(domContentLoaded, _listener = function listener() {
    doc.removeEventListener(domContentLoaded, _listener);
    loaded = 1;
    while (_listener = fns.shift()) {
      _listener();
    }
  });

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn);
  };
});

},{}],5:[function(require,module,exports){
'use strict';

// <3 Modernizr
// https://raw.githubusercontent.com/Modernizr/Modernizr/master/feature-detects/dom/dataset.js

function useNative() {
	var elem = document.createElement('div');
	elem.setAttribute('data-a-b', 'c');

	return Boolean(elem.dataset && elem.dataset.aB === 'c');
}

function nativeDataset(element) {
	return element.dataset;
}

module.exports = useNative() ? nativeDataset : function (element) {
	var map = {};
	var attributes = element.attributes;

	function getter() {
		return this.value;
	}

	function setter(name, value) {
		if (typeof value === 'undefined') {
			this.removeAttribute(name);
		} else {
			this.setAttribute(name, value);
		}
	}

	for (var i = 0, j = attributes.length; i < j; i++) {
		var attribute = attributes[i];

		if (attribute) {
			var name = attribute.name;

			if (name.indexOf('data-') === 0) {
				var prop = name.slice(5).replace(/-./g, function (u) {
					return u.charAt(1).toUpperCase();
				});

				var value = attribute.value;

				Object.defineProperty(map, prop, {
					enumerable: true,
					get: getter.bind({ value: value || '' }),
					set: setter.bind(element, name)
				});
			}
		}
	}

	return map;
};

},{}],6:[function(require,module,exports){
'use strict';

// element-closest | CC0-1.0 | github.com/jonathantneal/closest

(function (ElementProto) {
	if (typeof ElementProto.matches !== 'function') {
		ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
			var element = this;
			var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
			var index = 0;

			while (elements[index] && elements[index] !== element) {
				++index;
			}

			return Boolean(elements[index]);
		};
	}

	if (typeof ElementProto.closest !== 'function') {
		ElementProto.closest = function closest(selector) {
			var element = this;

			while (element && element.nodeType === 1) {
				if (element.matches(selector)) {
					return element;
				}

				element = element.parentNode;
			}

			return null;
		};
	}
})(window.Element.prototype);

},{}],7:[function(require,module,exports){
(function (global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

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

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

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
  return !!value && (type == 'object' || type == 'function');
}

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
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

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

module.exports = debounce;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],8:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],9:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var assign = require('object-assign');
var delegate = require('../delegate');
var delegateAll = require('../delegateAll');

var DELEGATE_PATTERN = /^(.+):delegate\((.+)\)$/;
var SPACE = ' ';

var getListeners = function getListeners(type, handler) {
  var match = type.match(DELEGATE_PATTERN);
  var selector;
  if (match) {
    type = match[1];
    selector = match[2];
  }

  var options;
  if ((typeof handler === 'undefined' ? 'undefined' : _typeof(handler)) === 'object') {
    options = {
      capture: popKey(handler, 'capture'),
      passive: popKey(handler, 'passive')
    };
  }

  var listener = {
    selector: selector,
    delegate: (typeof handler === 'undefined' ? 'undefined' : _typeof(handler)) === 'object' ? delegateAll(handler) : selector ? delegate(selector, handler) : handler,
    options: options
  };

  if (type.indexOf(SPACE) > -1) {
    return type.split(SPACE).map(function (_type) {
      return assign({ type: _type }, listener);
    });
  } else {
    listener.type = type;
    return [listener];
  }
};

var popKey = function popKey(obj, key) {
  var value = obj[key];
  delete obj[key];
  return value;
};

module.exports = function behavior(events, props) {
  var listeners = Object.keys(events).reduce(function (memo, type) {
    var listeners = getListeners(type, events[type]);
    return memo.concat(listeners);
  }, []);

  return assign({
    add: function addBehavior(element) {
      listeners.forEach(function (listener) {
        element.addEventListener(listener.type, listener.delegate, listener.options);
      });
    },
    remove: function removeBehavior(element) {
      listeners.forEach(function (listener) {
        element.removeEventListener(listener.type, listener.delegate, listener.options);
      });
    }
  }, props);
};

},{"../delegate":11,"../delegateAll":12,"object-assign":8}],10:[function(require,module,exports){
"use strict";

module.exports = function compose(functions) {
  return function (e) {
    return functions.some(function (fn) {
      return fn.call(this, e) === false;
    }, this);
  };
};

},{}],11:[function(require,module,exports){
'use strict';

// polyfill Element.prototype.closest
require('element-closest');

module.exports = function delegate(selector, fn) {
  return function delegation(event) {
    var target = event.target.closest(selector);
    if (target) {
      return fn.call(target, event);
    }
  };
};

},{"element-closest":6}],12:[function(require,module,exports){
'use strict';

var delegate = require('../delegate');
var compose = require('../compose');

var SPLAT = '*';

module.exports = function delegateAll(selectors) {
  var keys = Object.keys(selectors);

  // XXX optimization: if there is only one handler and it applies to
  // all elements (the "*" CSS selector), then just return that
  // handler
  if (keys.length === 1 && keys[0] === SPLAT) {
    return selectors[SPLAT];
  }

  var delegates = keys.reduce(function (memo, selector) {
    memo.push(delegate(selector, selectors[selector]));
    return memo;
  }, []);
  return compose(delegates);
};

},{"../compose":10,"../delegate":11}],13:[function(require,module,exports){
"use strict";

module.exports = function ignore(element, fn) {
  return function ignorance(e) {
    if (element !== e.target && !element.contains(e.target)) {
      return fn.call(this, e);
    }
  };
};

},{}],14:[function(require,module,exports){
"use strict";

module.exports = function once(listener, options) {
  var wrapped = function wrappedOnce(e) {
    e.currentTarget.removeEventListener(e.type, wrapped, options);
    return listener.call(this, e);
  };
  return wrapped;
};

},{}],15:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var RE_TRIM = /(^\s+)|(\s+$)/g;
var RE_SPLIT = /\s+/;

var trim = String.prototype.trim ? function (str) {
  return str.trim();
} : function (str) {
  return str.replace(RE_TRIM, '');
};

var queryById = function queryById(id) {
  return this.querySelector('[id="' + id.replace(/"/g, '\\"') + '"]');
};

module.exports = function resolveIds(ids, doc) {
  if (typeof ids !== 'string') {
    throw new Error('Expected a string but got ' + (typeof ids === 'undefined' ? 'undefined' : _typeof(ids)));
  }

  if (!doc) {
    doc = window.document;
  }

  var getElementById = doc.getElementById ? doc.getElementById.bind(doc) : queryById.bind(doc);

  ids = trim(ids).split(RE_SPLIT);

  // XXX we can short-circuit here because trimming and splitting a
  // string of just whitespace produces an array containing a single,
  // empty string
  if (ids.length === 1 && ids[0] === '') {
    return [];
  }

  return ids.map(function (id) {
    var el = getElementById(id);
    if (!el) {
      throw new Error('no element with id: "' + id + '"');
    }
    return el;
  });
};

},{}],16:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var filter = require('array-filter');
var forEach = require('array-foreach');
var toggle = require('../utils/toggle');
var isElementInViewport = require('../utils/is-in-viewport');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix;

// XXX match .usa-accordion and .usa-accordion-bordered
var ACCORDION = '.' + PREFIX + '-accordion, .' + PREFIX + '-accordion-bordered';
var BUTTON = '.' + PREFIX + '-accordion-button[aria-controls]';
var EXPANDED = 'aria-expanded';
var MULTISELECTABLE = 'aria-multiselectable';

/**
 * Toggle a button's "pressed" state, optionally providing a target
 * state.
 *
 * @param {HTMLButtonElement} button
 * @param {boolean?} expanded If no state is provided, the current
 * state will be toggled (from false to true, and vice-versa).
 * @return {boolean} the resulting state
 */
var toggleButton = function toggleButton(button, expanded) {
  var accordion = button.closest(ACCORDION);
  if (!accordion) {
    throw new Error(BUTTON + ' is missing outer ' + ACCORDION);
  }

  expanded = toggle(button, expanded);
  // XXX multiselectable is opt-in, to preserve legacy behavior
  var multiselectable = accordion.getAttribute(MULTISELECTABLE) === 'true';

  if (expanded && !multiselectable) {
    forEach(getAccordionButtons(accordion), function (other) {
      if (other !== button) {
        toggle(other, false);
      }
    });
  }
};

/**
 * @param {HTMLButtonElement} button
 * @return {boolean} true
 */
var showButton = function showButton(button) {
  return toggleButton(button, true);
};

/**
 * @param {HTMLButtonElement} button
 * @return {boolean} false
 */
var hideButton = function hideButton(button) {
  return toggleButton(button, false);
};

/**
 * Get an Array of button elements belonging directly to the given
 * accordion element.
 * @param {HTMLElement} accordion
 * @return {array<HTMLButtonElement>}
 */
var getAccordionButtons = function getAccordionButtons(accordion) {
  return filter(accordion.querySelectorAll(BUTTON), function (button) {
    return button.closest(ACCORDION) === accordion;
  });
};

var accordion = behavior(_defineProperty({}, CLICK, _defineProperty({}, BUTTON, function (event) {
  event.preventDefault();
  toggleButton(this);

  if (this.getAttribute(EXPANDED) === 'true') {
    // We were just expanded, but if another accordion was also just
    // collapsed, we may no longer be in the viewport. This ensures
    // that we are still visible, so the user isn't confused.
    if (!isElementInViewport(this)) this.scrollIntoView();
  }
})), {
  init: function init(root) {
    forEach(root.querySelectorAll(BUTTON), function (button) {
      var expanded = button.getAttribute(EXPANDED) === 'true';
      toggleButton(button, expanded);
    });
  },
  ACCORDION: ACCORDION,
  BUTTON: BUTTON,
  show: showButton,
  hide: hideButton,
  toggle: toggleButton,
  getButtons: getAccordionButtons
});

/**
 * TODO: for 2.0, remove everything below this comment and export the
 * behavior directly:
 *
 * module.exports = behavior({...});
 */
var Accordion = function Accordion(root) {
  this.root = root;
  accordion.on(this.root);
};

// copy all of the behavior methods and props to Accordion
var assign = require('object-assign');
assign(Accordion, accordion);

Accordion.prototype.show = showButton;
Accordion.prototype.hide = hideButton;

Accordion.prototype.remove = function () {
  accordion.off(this.root);
};

module.exports = Accordion;

},{"../config":25,"../events":26,"../utils/behavior":30,"../utils/is-in-viewport":31,"../utils/toggle":35,"array-filter":1,"array-foreach":2,"object-assign":8}],17:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var toggle = require('../utils/toggle');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix;

var HEADER = '.' + PREFIX + '-banner-header';
var EXPANDED_CLASS = PREFIX + '-banner-header-expanded';

var toggleBanner = function toggleBanner(event) {
  event.preventDefault();
  this.closest(HEADER).classList.toggle(EXPANDED_CLASS);
  return false;
};

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, HEADER + ' [aria-controls]', toggleBanner)));

},{"../config":25,"../events":26,"../utils/behavior":30,"../utils/toggle":35}],18:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var accordion = require('./accordion');
var behavior = require('../utils/behavior');
var debounce = require('lodash.debounce');
var forEach = require('array-foreach');
var select = require('../utils/select');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix;

var HIDDEN = 'hidden';
var SCOPE = '.' + PREFIX + '-footer-big';
var NAV = SCOPE + ' nav';
var BUTTON = NAV + ' .' + PREFIX + '-footer-primary-link';
var LIST = NAV + ' ul';

var HIDE_MAX_WIDTH = 600;
var DEBOUNCE_RATE = 180;

var showPanel = function showPanel() {
  var list = this.closest(LIST);
  list.classList.remove(HIDDEN);

  // NB: this *should* always succeed because the button
  // selector is scoped to ".{prefix}-footer-big nav"
  var lists = list.closest(NAV).querySelectorAll('ul');

  forEach(lists, function (el) {
    if (el !== list) {
      el.classList.add(HIDDEN);
    }
  });
};

var resize = debounce(function () {
  var hidden = window.innerWidth < HIDE_MAX_WIDTH;
  forEach(select(LIST), function (list) {
    list.classList.toggle(HIDDEN, hidden);
  });
}, DEBOUNCE_RATE);

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, BUTTON, showPanel)), {
  // export for use elsewhere
  HIDE_MAX_WIDTH: HIDE_MAX_WIDTH,
  DEBOUNCE_RATE: DEBOUNCE_RATE,

  init: function init(target) {
    resize();
    window.addEventListener('resize', resize);
  },

  teardown: function teardown(target) {
    window.removeEventListener('resize', resize);
  }
});

},{"../config":25,"../events":26,"../utils/behavior":30,"../utils/select":32,"./accordion":16,"array-foreach":2,"lodash.debounce":7}],19:[function(require,module,exports){
'use strict';

module.exports = {
  accordion: require('./accordion'),
  banner: require('./banner'),
  footer: require('./footer'),
  navigation: require('./navigation'),
  password: require('./password'),
  search: require('./search'),
  skipnav: require('./skipnav'),
  validator: require('./validator')
};

},{"./accordion":16,"./banner":17,"./footer":18,"./navigation":20,"./password":21,"./search":22,"./skipnav":23,"./validator":24}],20:[function(require,module,exports){
'use strict';

var _CLICK;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var forEach = require('array-foreach');
var select = require('../utils/select');
var accordion = require('./accordion');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix;

var CONTEXT = 'header';
var NAV = '.' + PREFIX + '-nav';
var NAV_LINKS = NAV + ' a';
var OPENERS = '.' + PREFIX + '-menu-btn';
var CLOSE_BUTTON = '.' + PREFIX + '-nav-close';
var OVERLAY = '.' + PREFIX + '-overlay';
var CLOSERS = CLOSE_BUTTON + ', .' + PREFIX + '-overlay';
var TOGGLES = [NAV, OVERLAY].join(', ');

var ACTIVE_CLASS = 'usa-mobile_nav-active';
var VISIBLE_CLASS = 'is-visible';

var toggleNav = function toggleNav(active) {
  var body = document.body;
  if (typeof active !== 'boolean') {
    active = !body.classList.contains(ACTIVE_CLASS);
  }
  body.classList.toggle(ACTIVE_CLASS, active);

  var context = this.closest(CONTEXT);
  forEach(select(TOGGLES), function (el) {
    el.classList.toggle(VISIBLE_CLASS);
  });

  if (active && context) {
    var closeButton = context.querySelector(CLOSE_BUTTON);
    if (closeButton) {
      closeButton.focus();
    }
  }
  return active;
};

var navigation = behavior(_defineProperty({}, CLICK, (_CLICK = {}, _defineProperty(_CLICK, OPENERS, toggleNav), _defineProperty(_CLICK, CLOSERS, toggleNav), _defineProperty(_CLICK, NAV_LINKS, function () {
  // A navigation link has been clicked! We want to collapse any
  // hierarchical navigation UI it's a part of, so that the user
  // can focus on whatever they've just selected.

  // Some navigation links are inside accordions; when they're
  // clicked, we want to collapse those accordions.
  var acc = this.closest(accordion.ACCORDION);
  if (acc) {
    accordion.getButtons(acc).forEach(function (btn) {
      return accordion.hide(btn);
    });
  }

  // If the mobile navigation menu is active, we want to hide it.
  if (document.body.classList.contains(ACTIVE_CLASS)) {
    toggleNav.call(this);
  }
}), _CLICK)));

/**
 * TODO for 2.0, remove this statement and export `navigation` directly:
 *
 * module.exports = behavior({...});
 */
var assign = require('object-assign');
module.exports = assign(function (el) {
  return navigation.on(el);
}, navigation);

},{"../config":25,"../events":26,"../utils/behavior":30,"../utils/select":32,"./accordion":16,"array-foreach":2,"object-assign":8}],21:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var toggleFormInput = require('../utils/toggle-form-input');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix;

var LINK = '.' + PREFIX + '-show_password, .' + PREFIX + '-show_multipassword';

var toggle = function toggle(event) {
  event.preventDefault();
  toggleFormInput(this);
};

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, LINK, toggle)));

},{"../config":25,"../events":26,"../utils/behavior":30,"../utils/toggle-form-input":34}],22:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var forEach = require('array-foreach');
var ignore = require('receptor/ignore');
var select = require('../utils/select');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix;

var BUTTON = '.js-search-button';
var FORM = '.js-search-form';
var INPUT = '[type=search]';
var CONTEXT = 'header'; // XXX
var VISUALLY_HIDDEN = PREFIX + '-sr-only';

var lastButton = void 0;

var showSearch = function showSearch(event) {
  toggleSearch(this, true);
  lastButton = this;
};

var hideSearch = function hideSearch(event) {
  toggleSearch(this, false);
  lastButton = undefined;
};

var getForm = function getForm(button) {
  var context = button.closest(CONTEXT);
  return context ? context.querySelector(FORM) : document.querySelector(FORM);
};

var toggleSearch = function toggleSearch(button, active) {
  var form = getForm(button);
  if (!form) {
    throw new Error('No ' + FORM + ' found for search toggle in ' + CONTEXT + '!');
  }

  button.hidden = active;
  form.classList.toggle(VISUALLY_HIDDEN, !active);

  if (active) {
    var input = form.querySelector(INPUT);
    if (input) {
      input.focus();
    }
    // when the user clicks _outside_ of the form w/ignore(): hide the
    // search, then remove the listener
    var listener = ignore(form, function (e) {
      if (lastButton) {
        hideSearch.call(lastButton);
      }
      document.body.removeEventListener(CLICK, listener);
    });

    // Normally we would just run this code without a timeout, but
    // IE11 and Edge will actually call the listener *immediately* because
    // they are currently handling this exact type of event, so we'll
    // make sure the browser is done handling the current click event,
    // if any, before we attach the listener.
    setTimeout(function () {
      document.body.addEventListener(CLICK, listener);
    }, 0);
  }
};

var search = behavior(_defineProperty({}, CLICK, _defineProperty({}, BUTTON, showSearch)), {
  init: function init(target) {
    forEach(select(BUTTON, target), function (button) {
      toggleSearch(button, false);
    });
  },
  teardown: function teardown(target) {
    // forget the last button clicked
    lastButton = undefined;
  }
});

/**
 * TODO for 2.0, remove this statement and export `navigation` directly:
 *
 * module.exports = behavior({...});
 */
var assign = require('object-assign');
module.exports = assign(function (el) {
  return search.on(el);
}, search);

},{"../config":25,"../events":26,"../utils/behavior":30,"../utils/select":32,"array-foreach":2,"object-assign":8,"receptor/ignore":13}],23:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require('../utils/behavior');
var once = require('receptor/once');

var CLICK = require('../events').CLICK;
var PREFIX = require('../config').prefix;
var LINK = '.' + PREFIX + '-skipnav[href^="#"]';

var setTabindex = function setTabindex(event) {
  // NB: we know because of the selector we're delegating to below that the
  // href already begins with '#'
  var id = this.getAttribute('href').slice(1);
  var target = document.getElementById(id);
  if (target) {
    target.setAttribute('tabindex', 0);
    target.addEventListener('blur', once(function (event) {
      target.setAttribute('tabindex', -1);
    }));
  } else {
    // throw an error?
  }
};

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, LINK, setTabindex)));

},{"../config":25,"../events":26,"../utils/behavior":30,"receptor/once":14}],24:[function(require,module,exports){
'use strict';

var behavior = require('../utils/behavior');
var validate = require('../utils/validate-input');
var debounce = require('lodash.debounce');

var change = function change(event) {
  return validate(this);
};

var validator = behavior({
  'keyup change': {
    'input[data-validation-element]': change
  }
});

/**
 * TODO for 2.0, remove this statement and export `navigation` directly:
 *
 * module.exports = behavior({...});
 */
var assign = require('object-assign');
module.exports = assign(function (el) {
  return validator.on(el);
}, validator);

},{"../utils/behavior":30,"../utils/validate-input":36,"lodash.debounce":7,"object-assign":8}],25:[function(require,module,exports){
'use strict';

module.exports = {
  prefix: 'usa'
};

},{}],26:[function(require,module,exports){
'use strict';

module.exports = {
  // This used to be conditionally dependent on whether the
  // browser supported touch events; if it did, `CLICK` was set to
  // `touchstart`.  However, this had downsides:
  //
  // * It pre-empted mobile browsers' default behavior of detecting
  //   whether a touch turned into a scroll, thereby preventing
  //   users from using some of our components as scroll surfaces.
  //
  // * Some devices, such as the Microsoft Surface Pro, support *both*
  //   touch and clicks. This meant the conditional effectively dropped
  //   support for the user's mouse, frustrating users who preferred
  //   it on those systems.
  CLICK: 'click'
};

},{}],27:[function(require,module,exports){
'use strict';

var elproto = window.HTMLElement.prototype;
var HIDDEN = 'hidden';

if (!(HIDDEN in elproto)) {
  Object.defineProperty(elproto, HIDDEN, {
    get: function get() {
      return this.hasAttribute(HIDDEN);
    },
    set: function set(value) {
      if (value) {
        this.setAttribute(HIDDEN, '');
      } else {
        this.removeAttribute(HIDDEN);
      }
    }
  });
}

},{}],28:[function(require,module,exports){
'use strict';
// polyfills HTMLElement.prototype.classList and DOMTokenList

require('classlist-polyfill');
// polyfills HTMLElement.prototype.hidden
require('./element-hidden');

},{"./element-hidden":27,"classlist-polyfill":3}],29:[function(require,module,exports){
'use strict';

var domready = require('domready');

/**
 * The 'polyfills' define key ECMAScript 5 methods that may be missing from
 * older browsers, so must be loaded first.
 */
require('./polyfills');

var uswds = require('./config');

var components = require('./components');
uswds.components = components;

domready(function () {
  var target = document.body;
  for (var name in components) {
    var behavior = components[name];
    behavior.on(target);
  }
});

module.exports = uswds;

},{"./components":19,"./config":25,"./polyfills":28,"domready":4}],30:[function(require,module,exports){
'use strict';

var assign = require('object-assign');
var forEach = require('array-foreach');
var Behavior = require('receptor/behavior');

var sequence = function sequence() {
  var seq = [].slice.call(arguments);
  return function (target) {
    var _this = this;

    if (!target) {
      target = document.body;
    }
    forEach(seq, function (method) {
      if (typeof _this[method] === 'function') {
        _this[method].call(_this, target);
      }
    });
  };
};

/**
 * @name behavior
 * @param {object} events
 * @param {object?} props
 * @return {receptor.behavior}
 */
module.exports = function (events, props) {
  return Behavior(events, assign({
    on: sequence('init', 'add'),
    off: sequence('teardown', 'remove')
  }, props));
};

},{"array-foreach":2,"object-assign":8,"receptor/behavior":9}],31:[function(require,module,exports){
"use strict";

// https://stackoverflow.com/a/7557433
function isElementInViewport(el) {
  var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  var docEl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.documentElement;

  var rect = el.getBoundingClientRect();

  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (win.innerHeight || docEl.clientHeight) && rect.right <= (win.innerWidth || docEl.clientWidth);
}

module.exports = isElementInViewport;

},{}],32:[function(require,module,exports){
'use strict';

/**
 * @name isElement
 * @desc returns whether or not the given argument is a DOM element.
 * @param {any} value
 * @return {boolean}
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isElement = function isElement(value) {
  return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.nodeType === 1;
};

/**
 * @name select
 * @desc selects elements from the DOM by class selector or ID selector.
 * @param {string} selector - The selector to traverse the DOM with.
 * @param {Document|HTMLElement?} context - The context to traverse the DOM
 *   in. If not provided, it defaults to the document.
 * @return {HTMLElement[]} - An array of DOM nodes or an empty array.
 */
module.exports = function select(selector, context) {

  if (typeof selector !== 'string') {
    return [];
  }

  if (!context || !isElement(context)) {
    context = window.document;
  }

  var selection = context.querySelectorAll(selector);
  return Array.prototype.slice.call(selection);
};

},{}],33:[function(require,module,exports){
'use strict';

/**
 * Flips given INPUT elements between masked (hiding the field value) and unmasked
 * @param {Array.HTMLElement} fields - An array of INPUT elements
 * @param {Boolean} mask - Whether the mask should be applied, hiding the field value
 */
module.exports = function (field, mask) {
  field.setAttribute('autocapitalize', 'off');
  field.setAttribute('autocorrect', 'off');
  field.setAttribute('type', mask ? 'password' : 'text');
};

},{}],34:[function(require,module,exports){
'use strict';

var forEach = require('array-foreach');
var resolveIdRefs = require('resolve-id-refs');
var select = require('./select');
var toggleFieldMask = require('./toggle-field-mask');

var CONTROLS = 'aria-controls';
var PRESSED = 'aria-pressed';
var SHOW_ATTR = 'data-show-text';
var HIDE_ATTR = 'data-hide-text';

/**
 * Replace the word "Show" (or "show") with "Hide" (or "hide") in a string.
 * @param {string} showText
 * @return {strong} hideText
 */
var getHideText = function getHideText(showText) {
  return showText.replace(/\bShow\b/i, function (show) {
    return ('S' === show[0] ? 'H' : 'h') + 'ide';
  });
};

/**
 * Component that decorates an HTML element with the ability to toggle the
 * masked state of an input field (like a password) when clicked.
 * The ids of the fields to be masked will be pulled directly from the button's
 * `aria-controls` attribute.
 *
 * @param  {HTMLElement} el    Parent element containing the fields to be masked
 * @return {boolean}
 */
module.exports = function (el) {
  // this is the *target* state:
  // * if the element has the attr and it's !== "true", pressed is true
  // * otherwise, pressed is false
  var pressed = el.hasAttribute(PRESSED) && el.getAttribute(PRESSED) !== 'true';

  var fields = resolveIdRefs(el.getAttribute(CONTROLS));
  forEach(fields, function (field) {
    return toggleFieldMask(field, pressed);
  });

  if (!el.hasAttribute(SHOW_ATTR)) {
    el.setAttribute(SHOW_ATTR, el.textContent);
  }

  var showText = el.getAttribute(SHOW_ATTR);
  var hideText = el.getAttribute(HIDE_ATTR) || getHideText(showText);

  el.textContent = pressed ? showText : hideText;
  el.setAttribute(PRESSED, pressed);
  return pressed;
};

},{"./select":32,"./toggle-field-mask":33,"array-foreach":2,"resolve-id-refs":15}],35:[function(require,module,exports){
'use strict';

var EXPANDED = 'aria-expanded';
var CONTROLS = 'aria-controls';
var HIDDEN = 'aria-hidden';

module.exports = function (button, expanded) {

  if (typeof expanded !== 'boolean') {
    expanded = button.getAttribute(EXPANDED) === 'false';
  }
  button.setAttribute(EXPANDED, expanded);

  var id = button.getAttribute(CONTROLS);
  var controls = document.getElementById(id);
  if (!controls) {
    throw new Error('No toggle target found with id: "' + id + '"');
  }

  controls.setAttribute(HIDDEN, !expanded);
  return expanded;
};

},{}],36:[function(require,module,exports){
'use strict';

var dataset = require('elem-dataset');

var PREFIX = require('../config').prefix;
var CHECKED = 'aria-checked';
var CHECKED_CLASS = PREFIX + '-checklist-checked';

module.exports = function validate(el) {
  var data = dataset(el);
  var id = data.validationElement;
  var checkList = id.charAt(0) === '#' ? document.querySelector(id) : document.getElementById(id);

  if (!checkList) {
    throw new Error('No validation element found with id: "' + id + '"');
  }

  for (var key in data) {
    if (key.startsWith('validate')) {
      var validatorName = key.substr('validate'.length).toLowerCase();
      var validatorPattern = new RegExp(data[key]);
      var validatorSelector = '[data-validator="' + validatorName + '"]';
      var validatorCheckbox = checkList.querySelector(validatorSelector);
      if (!validatorCheckbox) {
        throw new Error('No validator checkbox found for: "' + validatorName + '"');
      }

      var checked = validatorPattern.test(el.value);
      validatorCheckbox.classList.toggle(CHECKED_CLASS, checked);
      validatorCheckbox.setAttribute(CHECKED, checked);
    }
  }
};

},{"../config":25,"elem-dataset":5}]},{},[29])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXJyYXktZmlsdGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2FycmF5LWZvcmVhY2gvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2xhc3NsaXN0LXBvbHlmaWxsL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kb21yZWFkeS9yZWFkeS5qcyIsIm5vZGVfbW9kdWxlcy9lbGVtLWRhdGFzZXQvZGlzdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lbGVtZW50LWNsb3Nlc3QvZWxlbWVudC1jbG9zZXN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5kZWJvdW5jZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2JlaGF2aW9yL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2NvbXBvc2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvZGVsZWdhdGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvZGVsZWdhdGVBbGwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvaWdub3JlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL29uY2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVzb2x2ZS1pZC1yZWZzL2luZGV4LmpzIiwic3JjL2pzL2NvbXBvbmVudHMvYWNjb3JkaW9uLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvYmFubmVyLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvZm9vdGVyLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvaW5kZXguanMiLCJzcmMvanMvY29tcG9uZW50cy9uYXZpZ2F0aW9uLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvcGFzc3dvcmQuanMiLCJzcmMvanMvY29tcG9uZW50cy9zZWFyY2guanMiLCJzcmMvanMvY29tcG9uZW50cy9za2lwbmF2LmpzIiwic3JjL2pzL2NvbXBvbmVudHMvdmFsaWRhdG9yLmpzIiwic3JjL2pzL2NvbmZpZy5qcyIsInNyYy9qcy9ldmVudHMuanMiLCJzcmMvanMvcG9seWZpbGxzL2VsZW1lbnQtaGlkZGVuLmpzIiwic3JjL2pzL3BvbHlmaWxscy9pbmRleC5qcyIsInNyYy9qcy9zdGFydC5qcyIsInNyYy9qcy91dGlscy9iZWhhdmlvci5qcyIsInNyYy9qcy91dGlscy9pcy1pbi12aWV3cG9ydC5qcyIsInNyYy9qcy91dGlscy9zZWxlY3QuanMiLCJzcmMvanMvdXRpbHMvdG9nZ2xlLWZpZWxkLW1hc2suanMiLCJzcmMvanMvdXRpbHMvdG9nZ2xlLWZvcm0taW5wdXQuanMiLCJzcmMvanMvdXRpbHMvdG9nZ2xlLmpzIiwic3JjL2pzL3V0aWxzL3ZhbGlkYXRlLWlucHV0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNDQTs7Ozs7Ozs7OztBQVVBLE9BQU8sT0FBUCxHQUFpQixVQUFVLEdBQVYsRUFBZSxFQUFmLEVBQW1CLElBQW5CLEVBQXlCO0FBQ3hDLE1BQUksSUFBSSxNQUFSLEVBQWdCLE9BQU8sSUFBSSxNQUFKLENBQVcsRUFBWCxFQUFlLElBQWYsQ0FBUDtBQUNoQixNQUFJLEtBQUssQ0FBTCxLQUFXLEdBQVgsSUFBa0IsU0FBUyxHQUEvQixFQUFvQyxNQUFNLElBQUksU0FBSixFQUFOO0FBQ3BDLE1BQUksY0FBYyxPQUFPLEVBQXpCLEVBQTZCLE1BQU0sSUFBSSxTQUFKLEVBQU47QUFDN0IsTUFBSSxNQUFNLEVBQVY7QUFDQSxPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksSUFBSSxNQUF4QixFQUFnQyxHQUFoQyxFQUFxQztBQUNuQyxRQUFJLENBQUMsT0FBTyxJQUFQLENBQVksR0FBWixFQUFpQixDQUFqQixDQUFMLEVBQTBCO0FBQzFCLFFBQUksTUFBTSxJQUFJLENBQUosQ0FBVjtBQUNBLFFBQUksR0FBRyxJQUFILENBQVEsSUFBUixF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QixFQUF1QjtBQUN0QyxNQUFNLE9BQU8sUUFBUSxFQUFSLENBQWI7QUFDQSxNQUFNLEtBQUssS0FBSyxpQkFBaEI7QUFDQSxNQUFNLFlBQVksR0FBRyxNQUFILENBQVUsQ0FBVixNQUFpQixHQUFqQixHQUNkLFNBQVMsYUFBVCxDQUF1QixFQUF2QixDQURjLEdBRWQsU0FBUyxjQUFULENBQXdCLEVBQXhCLENBRko7O0FBSUEsTUFBSSxDQUFDLFNBQUwsRUFBZ0I7QUFDZCxVQUFNLElBQUksS0FBSiw0Q0FDcUMsRUFEckMsT0FBTjtBQUdEOztBQUVELE9BQUssSUFBTSxHQUFYLElBQWtCLElBQWxCLEVBQXdCO0FBQ3RCLFFBQUksSUFBSSxVQUFKLENBQWUsVUFBZixDQUFKLEVBQWdDO0FBQzlCLFVBQU0sZ0JBQWdCLElBQUksTUFBSixDQUFXLFdBQVcsTUFBdEIsRUFBOEIsV0FBOUIsRUFBdEI7QUFDQSxVQUFNLG1CQUFtQixJQUFJLE1BQUosQ0FBVyxLQUFNLEdBQU4sQ0FBWCxDQUF6QjtBQUNBLFVBQU0sMENBQXdDLGFBQXhDLE9BQU47QUFDQSxVQUFNLG9CQUFvQixVQUFVLGFBQVYsQ0FBd0IsaUJBQXhCLENBQTFCO0FBQ0EsVUFBSSxDQUFDLGlCQUFMLEVBQXdCO0FBQ3RCLGNBQU0sSUFBSSxLQUFKLHdDQUNpQyxhQURqQyxPQUFOO0FBR0Q7O0FBRUQsVUFBTSxVQUFVLGlCQUFpQixJQUFqQixDQUFzQixHQUFHLEtBQXpCLENBQWhCO0FBQ0Esd0JBQWtCLFNBQWxCLENBQTRCLE1BQTVCLENBQW1DLGFBQW5DLEVBQWtELE9BQWxEO0FBQ0Esd0JBQWtCLFlBQWxCLENBQStCLE9BQS9CLEVBQXdDLE9BQXhDO0FBQ0Q7QUFDRjtBQUNGLENBOUJEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuLyoqXG4gKiBBcnJheSNmaWx0ZXIuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtPYmplY3Q9fSBzZWxmXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEB0aHJvdyBUeXBlRXJyb3JcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcnIsIGZuLCBzZWxmKSB7XG4gIGlmIChhcnIuZmlsdGVyKSByZXR1cm4gYXJyLmZpbHRlcihmbiwgc2VsZik7XG4gIGlmICh2b2lkIDAgPT09IGFyciB8fCBudWxsID09PSBhcnIpIHRocm93IG5ldyBUeXBlRXJyb3I7XG4gIGlmICgnZnVuY3Rpb24nICE9IHR5cGVvZiBmbikgdGhyb3cgbmV3IFR5cGVFcnJvcjtcbiAgdmFyIHJldCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmICghaGFzT3duLmNhbGwoYXJyLCBpKSkgY29udGludWU7XG4gICAgdmFyIHZhbCA9IGFycltpXTtcbiAgICBpZiAoZm4uY2FsbChzZWxmLCB2YWwsIGksIGFycikpIHJldC5wdXNoKHZhbCk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuIiwiLyoqXG4gKiBhcnJheS1mb3JlYWNoXG4gKiAgIEFycmF5I2ZvckVhY2ggcG9ueWZpbGwgZm9yIG9sZGVyIGJyb3dzZXJzXG4gKiAgIChQb255ZmlsbDogQSBwb2x5ZmlsbCB0aGF0IGRvZXNuJ3Qgb3ZlcndyaXRlIHRoZSBuYXRpdmUgbWV0aG9kKVxuICogXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdHdhZGEvYXJyYXktZm9yZWFjaFxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNS0yMDE2IFRha3V0byBXYWRhXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKiAgIGh0dHBzOi8vZ2l0aHViLmNvbS90d2FkYS9hcnJheS1mb3JlYWNoL2Jsb2IvbWFzdGVyL01JVC1MSUNFTlNFXG4gKi9cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmb3JFYWNoIChhcnksIGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgaWYgKGFyeS5mb3JFYWNoKSB7XG4gICAgICAgIGFyeS5mb3JFYWNoKGNhbGxiYWNrLCB0aGlzQXJnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyeS5sZW5ndGg7IGkrPTEpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCBhcnlbaV0sIGksIGFyeSk7XG4gICAgfVxufTtcbiIsIi8qXG4gKiBjbGFzc0xpc3QuanM6IENyb3NzLWJyb3dzZXIgZnVsbCBlbGVtZW50LmNsYXNzTGlzdCBpbXBsZW1lbnRhdGlvbi5cbiAqIDEuMS4yMDE3MDQyN1xuICpcbiAqIEJ5IEVsaSBHcmV5LCBodHRwOi8vZWxpZ3JleS5jb21cbiAqIExpY2Vuc2U6IERlZGljYXRlZCB0byB0aGUgcHVibGljIGRvbWFpbi5cbiAqICAgU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGlncmV5L2NsYXNzTGlzdC5qcy9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cblxuLypnbG9iYWwgc2VsZiwgZG9jdW1lbnQsIERPTUV4Y2VwdGlvbiAqL1xuXG4vKiEgQHNvdXJjZSBodHRwOi8vcHVybC5lbGlncmV5LmNvbS9naXRodWIvY2xhc3NMaXN0LmpzL2Jsb2IvbWFzdGVyL2NsYXNzTGlzdC5qcyAqL1xuXG5pZiAoXCJkb2N1bWVudFwiIGluIHdpbmRvdy5zZWxmKSB7XG5cbi8vIEZ1bGwgcG9seWZpbGwgZm9yIGJyb3dzZXJzIHdpdGggbm8gY2xhc3NMaXN0IHN1cHBvcnRcbi8vIEluY2x1ZGluZyBJRSA8IEVkZ2UgbWlzc2luZyBTVkdFbGVtZW50LmNsYXNzTGlzdFxuaWYgKCEoXCJjbGFzc0xpc3RcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiX1wiKSkgXG5cdHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyAmJiAhKFwiY2xhc3NMaXN0XCIgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcImdcIikpKSB7XG5cbihmdW5jdGlvbiAodmlldykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuaWYgKCEoJ0VsZW1lbnQnIGluIHZpZXcpKSByZXR1cm47XG5cbnZhclxuXHQgIGNsYXNzTGlzdFByb3AgPSBcImNsYXNzTGlzdFwiXG5cdCwgcHJvdG9Qcm9wID0gXCJwcm90b3R5cGVcIlxuXHQsIGVsZW1DdHJQcm90byA9IHZpZXcuRWxlbWVudFtwcm90b1Byb3BdXG5cdCwgb2JqQ3RyID0gT2JqZWN0XG5cdCwgc3RyVHJpbSA9IFN0cmluZ1twcm90b1Byb3BdLnRyaW0gfHwgZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpO1xuXHR9XG5cdCwgYXJySW5kZXhPZiA9IEFycmF5W3Byb3RvUHJvcF0uaW5kZXhPZiB8fCBmdW5jdGlvbiAoaXRlbSkge1xuXHRcdHZhclxuXHRcdFx0ICBpID0gMFxuXHRcdFx0LCBsZW4gPSB0aGlzLmxlbmd0aFxuXHRcdDtcblx0XHRmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRpZiAoaSBpbiB0aGlzICYmIHRoaXNbaV0gPT09IGl0ZW0pIHtcblx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiAtMTtcblx0fVxuXHQvLyBWZW5kb3JzOiBwbGVhc2UgYWxsb3cgY29udGVudCBjb2RlIHRvIGluc3RhbnRpYXRlIERPTUV4Y2VwdGlvbnNcblx0LCBET01FeCA9IGZ1bmN0aW9uICh0eXBlLCBtZXNzYWdlKSB7XG5cdFx0dGhpcy5uYW1lID0gdHlwZTtcblx0XHR0aGlzLmNvZGUgPSBET01FeGNlcHRpb25bdHlwZV07XG5cdFx0dGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblx0fVxuXHQsIGNoZWNrVG9rZW5BbmRHZXRJbmRleCA9IGZ1bmN0aW9uIChjbGFzc0xpc3QsIHRva2VuKSB7XG5cdFx0aWYgKHRva2VuID09PSBcIlwiKSB7XG5cdFx0XHR0aHJvdyBuZXcgRE9NRXgoXG5cdFx0XHRcdCAgXCJTWU5UQVhfRVJSXCJcblx0XHRcdFx0LCBcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZFwiXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoL1xccy8udGVzdCh0b2tlbikpIHtcblx0XHRcdHRocm93IG5ldyBET01FeChcblx0XHRcdFx0ICBcIklOVkFMSURfQ0hBUkFDVEVSX0VSUlwiXG5cdFx0XHRcdCwgXCJTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXJcIlxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIGFyckluZGV4T2YuY2FsbChjbGFzc0xpc3QsIHRva2VuKTtcblx0fVxuXHQsIENsYXNzTGlzdCA9IGZ1bmN0aW9uIChlbGVtKSB7XG5cdFx0dmFyXG5cdFx0XHQgIHRyaW1tZWRDbGFzc2VzID0gc3RyVHJpbS5jYWxsKGVsZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIilcblx0XHRcdCwgY2xhc3NlcyA9IHRyaW1tZWRDbGFzc2VzID8gdHJpbW1lZENsYXNzZXMuc3BsaXQoL1xccysvKSA6IFtdXG5cdFx0XHQsIGkgPSAwXG5cdFx0XHQsIGxlbiA9IGNsYXNzZXMubGVuZ3RoXG5cdFx0O1xuXHRcdGZvciAoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdHRoaXMucHVzaChjbGFzc2VzW2ldKTtcblx0XHR9XG5cdFx0dGhpcy5fdXBkYXRlQ2xhc3NOYW1lID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCB0aGlzLnRvU3RyaW5nKCkpO1xuXHRcdH07XG5cdH1cblx0LCBjbGFzc0xpc3RQcm90byA9IENsYXNzTGlzdFtwcm90b1Byb3BdID0gW11cblx0LCBjbGFzc0xpc3RHZXR0ZXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIG5ldyBDbGFzc0xpc3QodGhpcyk7XG5cdH1cbjtcbi8vIE1vc3QgRE9NRXhjZXB0aW9uIGltcGxlbWVudGF0aW9ucyBkb24ndCBhbGxvdyBjYWxsaW5nIERPTUV4Y2VwdGlvbidzIHRvU3RyaW5nKClcbi8vIG9uIG5vbi1ET01FeGNlcHRpb25zLiBFcnJvcidzIHRvU3RyaW5nKCkgaXMgc3VmZmljaWVudCBoZXJlLlxuRE9NRXhbcHJvdG9Qcm9wXSA9IEVycm9yW3Byb3RvUHJvcF07XG5jbGFzc0xpc3RQcm90by5pdGVtID0gZnVuY3Rpb24gKGkpIHtcblx0cmV0dXJuIHRoaXNbaV0gfHwgbnVsbDtcbn07XG5jbGFzc0xpc3RQcm90by5jb250YWlucyA9IGZ1bmN0aW9uICh0b2tlbikge1xuXHR0b2tlbiArPSBcIlwiO1xuXHRyZXR1cm4gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKSAhPT0gLTE7XG59O1xuY2xhc3NMaXN0UHJvdG8uYWRkID0gZnVuY3Rpb24gKCkge1xuXHR2YXJcblx0XHQgIHRva2VucyA9IGFyZ3VtZW50c1xuXHRcdCwgaSA9IDBcblx0XHQsIGwgPSB0b2tlbnMubGVuZ3RoXG5cdFx0LCB0b2tlblxuXHRcdCwgdXBkYXRlZCA9IGZhbHNlXG5cdDtcblx0ZG8ge1xuXHRcdHRva2VuID0gdG9rZW5zW2ldICsgXCJcIjtcblx0XHRpZiAoY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKSA9PT0gLTEpIHtcblx0XHRcdHRoaXMucHVzaCh0b2tlbik7XG5cdFx0XHR1cGRhdGVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cblx0d2hpbGUgKCsraSA8IGwpO1xuXG5cdGlmICh1cGRhdGVkKSB7XG5cdFx0dGhpcy5fdXBkYXRlQ2xhc3NOYW1lKCk7XG5cdH1cbn07XG5jbGFzc0xpc3RQcm90by5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdHZhclxuXHRcdCAgdG9rZW5zID0gYXJndW1lbnRzXG5cdFx0LCBpID0gMFxuXHRcdCwgbCA9IHRva2Vucy5sZW5ndGhcblx0XHQsIHRva2VuXG5cdFx0LCB1cGRhdGVkID0gZmFsc2Vcblx0XHQsIGluZGV4XG5cdDtcblx0ZG8ge1xuXHRcdHRva2VuID0gdG9rZW5zW2ldICsgXCJcIjtcblx0XHRpbmRleCA9IGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbik7XG5cdFx0d2hpbGUgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0dGhpcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0dXBkYXRlZCA9IHRydWU7XG5cdFx0XHRpbmRleCA9IGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbik7XG5cdFx0fVxuXHR9XG5cdHdoaWxlICgrK2kgPCBsKTtcblxuXHRpZiAodXBkYXRlZCkge1xuXHRcdHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSgpO1xuXHR9XG59O1xuY2xhc3NMaXN0UHJvdG8udG9nZ2xlID0gZnVuY3Rpb24gKHRva2VuLCBmb3JjZSkge1xuXHR0b2tlbiArPSBcIlwiO1xuXG5cdHZhclxuXHRcdCAgcmVzdWx0ID0gdGhpcy5jb250YWlucyh0b2tlbilcblx0XHQsIG1ldGhvZCA9IHJlc3VsdCA/XG5cdFx0XHRmb3JjZSAhPT0gdHJ1ZSAmJiBcInJlbW92ZVwiXG5cdFx0OlxuXHRcdFx0Zm9yY2UgIT09IGZhbHNlICYmIFwiYWRkXCJcblx0O1xuXG5cdGlmIChtZXRob2QpIHtcblx0XHR0aGlzW21ldGhvZF0odG9rZW4pO1xuXHR9XG5cblx0aWYgKGZvcmNlID09PSB0cnVlIHx8IGZvcmNlID09PSBmYWxzZSkge1xuXHRcdHJldHVybiBmb3JjZTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gIXJlc3VsdDtcblx0fVxufTtcbmNsYXNzTGlzdFByb3RvLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy5qb2luKFwiIFwiKTtcbn07XG5cbmlmIChvYmpDdHIuZGVmaW5lUHJvcGVydHkpIHtcblx0dmFyIGNsYXNzTGlzdFByb3BEZXNjID0ge1xuXHRcdCAgZ2V0OiBjbGFzc0xpc3RHZXR0ZXJcblx0XHQsIGVudW1lcmFibGU6IHRydWVcblx0XHQsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHR9O1xuXHR0cnkge1xuXHRcdG9iakN0ci5kZWZpbmVQcm9wZXJ0eShlbGVtQ3RyUHJvdG8sIGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdFByb3BEZXNjKTtcblx0fSBjYXRjaCAoZXgpIHsgLy8gSUUgOCBkb2Vzbid0IHN1cHBvcnQgZW51bWVyYWJsZTp0cnVlXG5cdFx0Ly8gYWRkaW5nIHVuZGVmaW5lZCB0byBmaWdodCB0aGlzIGlzc3VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGlncmV5L2NsYXNzTGlzdC5qcy9pc3N1ZXMvMzZcblx0XHQvLyBtb2Rlcm5pZSBJRTgtTVNXNyBtYWNoaW5lIGhhcyBJRTggOC4wLjYwMDEuMTg3MDIgYW5kIGlzIGFmZmVjdGVkXG5cdFx0aWYgKGV4Lm51bWJlciA9PT0gdW5kZWZpbmVkIHx8IGV4Lm51bWJlciA9PT0gLTB4N0ZGNUVDNTQpIHtcblx0XHRcdGNsYXNzTGlzdFByb3BEZXNjLmVudW1lcmFibGUgPSBmYWxzZTtcblx0XHRcdG9iakN0ci5kZWZpbmVQcm9wZXJ0eShlbGVtQ3RyUHJvdG8sIGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdFByb3BEZXNjKTtcblx0XHR9XG5cdH1cbn0gZWxzZSBpZiAob2JqQ3RyW3Byb3RvUHJvcF0uX19kZWZpbmVHZXR0ZXJfXykge1xuXHRlbGVtQ3RyUHJvdG8uX19kZWZpbmVHZXR0ZXJfXyhjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RHZXR0ZXIpO1xufVxuXG59KHdpbmRvdy5zZWxmKSk7XG5cbn1cblxuLy8gVGhlcmUgaXMgZnVsbCBvciBwYXJ0aWFsIG5hdGl2ZSBjbGFzc0xpc3Qgc3VwcG9ydCwgc28ganVzdCBjaGVjayBpZiB3ZSBuZWVkXG4vLyB0byBub3JtYWxpemUgdGhlIGFkZC9yZW1vdmUgYW5kIHRvZ2dsZSBBUElzLlxuXG4oZnVuY3Rpb24gKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHR2YXIgdGVzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiX1wiKTtcblxuXHR0ZXN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYzFcIiwgXCJjMlwiKTtcblxuXHQvLyBQb2x5ZmlsbCBmb3IgSUUgMTAvMTEgYW5kIEZpcmVmb3ggPDI2LCB3aGVyZSBjbGFzc0xpc3QuYWRkIGFuZFxuXHQvLyBjbGFzc0xpc3QucmVtb3ZlIGV4aXN0IGJ1dCBzdXBwb3J0IG9ubHkgb25lIGFyZ3VtZW50IGF0IGEgdGltZS5cblx0aWYgKCF0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjMlwiKSkge1xuXHRcdHZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbihtZXRob2QpIHtcblx0XHRcdHZhciBvcmlnaW5hbCA9IERPTVRva2VuTGlzdC5wcm90b3R5cGVbbWV0aG9kXTtcblxuXHRcdFx0RE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odG9rZW4pIHtcblx0XHRcdFx0dmFyIGksIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRcdFx0dG9rZW4gPSBhcmd1bWVudHNbaV07XG5cdFx0XHRcdFx0b3JpZ2luYWwuY2FsbCh0aGlzLCB0b2tlbik7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fTtcblx0XHRjcmVhdGVNZXRob2QoJ2FkZCcpO1xuXHRcdGNyZWF0ZU1ldGhvZCgncmVtb3ZlJyk7XG5cdH1cblxuXHR0ZXN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiYzNcIiwgZmFsc2UpO1xuXG5cdC8vIFBvbHlmaWxsIGZvciBJRSAxMCBhbmQgRmlyZWZveCA8MjQsIHdoZXJlIGNsYXNzTGlzdC50b2dnbGUgZG9lcyBub3Rcblx0Ly8gc3VwcG9ydCB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuXHRpZiAodGVzdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYzNcIikpIHtcblx0XHR2YXIgX3RvZ2dsZSA9IERPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlO1xuXG5cdFx0RE9NVG9rZW5MaXN0LnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbih0b2tlbiwgZm9yY2UpIHtcblx0XHRcdGlmICgxIGluIGFyZ3VtZW50cyAmJiAhdGhpcy5jb250YWlucyh0b2tlbikgPT09ICFmb3JjZSkge1xuXHRcdFx0XHRyZXR1cm4gZm9yY2U7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gX3RvZ2dsZS5jYWxsKHRoaXMsIHRva2VuKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdH1cblxuXHR0ZXN0RWxlbWVudCA9IG51bGw7XG59KCkpO1xuXG59XG4iLCIvKiFcbiAgKiBkb21yZWFkeSAoYykgRHVzdGluIERpYXogMjAxNCAtIExpY2Vuc2UgTUlUXG4gICovXG4hZnVuY3Rpb24gKG5hbWUsIGRlZmluaXRpb24pIHtcblxuICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKClcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnKSBkZWZpbmUoZGVmaW5pdGlvbilcbiAgZWxzZSB0aGlzW25hbWVdID0gZGVmaW5pdGlvbigpXG5cbn0oJ2RvbXJlYWR5JywgZnVuY3Rpb24gKCkge1xuXG4gIHZhciBmbnMgPSBbXSwgbGlzdGVuZXJcbiAgICAsIGRvYyA9IGRvY3VtZW50XG4gICAgLCBoYWNrID0gZG9jLmRvY3VtZW50RWxlbWVudC5kb1Njcm9sbFxuICAgICwgZG9tQ29udGVudExvYWRlZCA9ICdET01Db250ZW50TG9hZGVkJ1xuICAgICwgbG9hZGVkID0gKGhhY2sgPyAvXmxvYWRlZHxeYy8gOiAvXmxvYWRlZHxeaXxeYy8pLnRlc3QoZG9jLnJlYWR5U3RhdGUpXG5cblxuICBpZiAoIWxvYWRlZClcbiAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoZG9tQ29udGVudExvYWRlZCwgbGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoZG9tQ29udGVudExvYWRlZCwgbGlzdGVuZXIpXG4gICAgbG9hZGVkID0gMVxuICAgIHdoaWxlIChsaXN0ZW5lciA9IGZucy5zaGlmdCgpKSBsaXN0ZW5lcigpXG4gIH0pXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChmbikge1xuICAgIGxvYWRlZCA/IHNldFRpbWVvdXQoZm4sIDApIDogZm5zLnB1c2goZm4pXG4gIH1cblxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIDwzIE1vZGVybml6clxuLy8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL01vZGVybml6ci9Nb2Rlcm5penIvbWFzdGVyL2ZlYXR1cmUtZGV0ZWN0cy9kb20vZGF0YXNldC5qc1xuXG5mdW5jdGlvbiB1c2VOYXRpdmUoKSB7XG5cdHZhciBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGVsZW0uc2V0QXR0cmlidXRlKCdkYXRhLWEtYicsICdjJyk7XG5cblx0cmV0dXJuIEJvb2xlYW4oZWxlbS5kYXRhc2V0ICYmIGVsZW0uZGF0YXNldC5hQiA9PT0gJ2MnKTtcbn1cblxuZnVuY3Rpb24gbmF0aXZlRGF0YXNldChlbGVtZW50KSB7XG5cdHJldHVybiBlbGVtZW50LmRhdGFzZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXNlTmF0aXZlKCkgPyBuYXRpdmVEYXRhc2V0IDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0dmFyIG1hcCA9IHt9O1xuXHR2YXIgYXR0cmlidXRlcyA9IGVsZW1lbnQuYXR0cmlidXRlcztcblxuXHRmdW5jdGlvbiBnZXR0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMudmFsdWU7XG5cdH1cblxuXHRmdW5jdGlvbiBzZXR0ZXIobmFtZSwgdmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHRmb3IgKHZhciBpID0gMCwgaiA9IGF0dHJpYnV0ZXMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0dmFyIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbaV07XG5cblx0XHRpZiAoYXR0cmlidXRlKSB7XG5cdFx0XHR2YXIgbmFtZSA9IGF0dHJpYnV0ZS5uYW1lO1xuXG5cdFx0XHRpZiAobmFtZS5pbmRleE9mKCdkYXRhLScpID09PSAwKSB7XG5cdFx0XHRcdHZhciBwcm9wID0gbmFtZS5zbGljZSg1KS5yZXBsYWNlKC8tLi9nLCBmdW5jdGlvbiAodSkge1xuXHRcdFx0XHRcdHJldHVybiB1LmNoYXJBdCgxKS50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR2YXIgdmFsdWUgPSBhdHRyaWJ1dGUudmFsdWU7XG5cblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1hcCwgcHJvcCwge1xuXHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdFx0Z2V0OiBnZXR0ZXIuYmluZCh7IHZhbHVlOiB2YWx1ZSB8fCAnJyB9KSxcblx0XHRcdFx0XHRzZXQ6IHNldHRlci5iaW5kKGVsZW1lbnQsIG5hbWUpXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBtYXA7XG59O1xuXG4iLCIvLyBlbGVtZW50LWNsb3Nlc3QgfCBDQzAtMS4wIHwgZ2l0aHViLmNvbS9qb25hdGhhbnRuZWFsL2Nsb3Nlc3RcblxuKGZ1bmN0aW9uIChFbGVtZW50UHJvdG8pIHtcblx0aWYgKHR5cGVvZiBFbGVtZW50UHJvdG8ubWF0Y2hlcyAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdEVsZW1lbnRQcm90by5tYXRjaGVzID0gRWxlbWVudFByb3RvLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnRQcm90by5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudFByb3RvLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBmdW5jdGlvbiBtYXRjaGVzKHNlbGVjdG9yKSB7XG5cdFx0XHR2YXIgZWxlbWVudCA9IHRoaXM7XG5cdFx0XHR2YXIgZWxlbWVudHMgPSAoZWxlbWVudC5kb2N1bWVudCB8fCBlbGVtZW50Lm93bmVyRG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0dmFyIGluZGV4ID0gMDtcblxuXHRcdFx0d2hpbGUgKGVsZW1lbnRzW2luZGV4XSAmJiBlbGVtZW50c1tpbmRleF0gIT09IGVsZW1lbnQpIHtcblx0XHRcdFx0KytpbmRleDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIEJvb2xlYW4oZWxlbWVudHNbaW5kZXhdKTtcblx0XHR9O1xuXHR9XG5cblx0aWYgKHR5cGVvZiBFbGVtZW50UHJvdG8uY2xvc2VzdCAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdEVsZW1lbnRQcm90by5jbG9zZXN0ID0gZnVuY3Rpb24gY2xvc2VzdChzZWxlY3Rvcikge1xuXHRcdFx0dmFyIGVsZW1lbnQgPSB0aGlzO1xuXG5cdFx0XHR3aGlsZSAoZWxlbWVudCAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxKSB7XG5cdFx0XHRcdGlmIChlbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9O1xuXHR9XG59KSh3aW5kb3cuRWxlbWVudC5wcm90b3R5cGUpO1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBOQU4gPSAwIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heCxcbiAgICBuYXRpdmVNaW4gPSBNYXRoLm1pbjtcblxuLyoqXG4gKiBHZXRzIHRoZSB0aW1lc3RhbXAgb2YgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhhdCBoYXZlIGVsYXBzZWQgc2luY2VcbiAqIHRoZSBVbml4IGVwb2NoICgxIEphbnVhcnkgMTk3MCAwMDowMDowMCBVVEMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBEYXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSB0aW1lc3RhbXAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmZXIoZnVuY3Rpb24oc3RhbXApIHtcbiAqICAgY29uc29sZS5sb2coXy5ub3coKSAtIHN0YW1wKTtcbiAqIH0sIF8ubm93KCkpO1xuICogLy8gPT4gTG9ncyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpdCB0b29rIGZvciB0aGUgZGVmZXJyZWQgaW52b2NhdGlvbi5cbiAqL1xudmFyIG5vdyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gcm9vdC5EYXRlLm5vdygpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZGVib3VuY2VkIGZ1bmN0aW9uIHRoYXQgZGVsYXlzIGludm9raW5nIGBmdW5jYCB1bnRpbCBhZnRlciBgd2FpdGBcbiAqIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgc2luY2UgdGhlIGxhc3QgdGltZSB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHdhc1xuICogaW52b2tlZC4gVGhlIGRlYm91bmNlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGAgbWV0aG9kIHRvIGNhbmNlbFxuICogZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG8gaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uXG4gKiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYCBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGVcbiAqIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YCB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWRcbiAqIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnRcbiAqIGNhbGxzIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgXG4gKiBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLmRlYm91bmNlYCBhbmQgYF8udGhyb3R0bGVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZGVib3VuY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gZGVsYXkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz1mYWxzZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4V2FpdF1cbiAqICBUaGUgbWF4aW11bSB0aW1lIGBmdW5jYCBpcyBhbGxvd2VkIHRvIGJlIGRlbGF5ZWQgYmVmb3JlIGl0J3MgaW52b2tlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZGVib3VuY2VkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBjb3N0bHkgY2FsY3VsYXRpb25zIHdoaWxlIHRoZSB3aW5kb3cgc2l6ZSBpcyBpbiBmbHV4LlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsIF8uZGVib3VuY2UoY2FsY3VsYXRlTGF5b3V0LCAxNTApKTtcbiAqXG4gKiAvLyBJbnZva2UgYHNlbmRNYWlsYCB3aGVuIGNsaWNrZWQsIGRlYm91bmNpbmcgc3Vic2VxdWVudCBjYWxscy5cbiAqIGpRdWVyeShlbGVtZW50KS5vbignY2xpY2snLCBfLmRlYm91bmNlKHNlbmRNYWlsLCAzMDAsIHtcbiAqICAgJ2xlYWRpbmcnOiB0cnVlLFxuICogICAndHJhaWxpbmcnOiBmYWxzZVxuICogfSkpO1xuICpcbiAqIC8vIEVuc3VyZSBgYmF0Y2hMb2dgIGlzIGludm9rZWQgb25jZSBhZnRlciAxIHNlY29uZCBvZiBkZWJvdW5jZWQgY2FsbHMuXG4gKiB2YXIgZGVib3VuY2VkID0gXy5kZWJvdW5jZShiYXRjaExvZywgMjUwLCB7ICdtYXhXYWl0JzogMTAwMCB9KTtcbiAqIHZhciBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoJy9zdHJlYW0nKTtcbiAqIGpRdWVyeShzb3VyY2UpLm9uKCdtZXNzYWdlJywgZGVib3VuY2VkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIGRlYm91bmNlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgZGVib3VuY2VkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxhc3RBcmdzLFxuICAgICAgbGFzdFRoaXMsXG4gICAgICBtYXhXYWl0LFxuICAgICAgcmVzdWx0LFxuICAgICAgdGltZXJJZCxcbiAgICAgIGxhc3RDYWxsVGltZSxcbiAgICAgIGxhc3RJbnZva2VUaW1lID0gMCxcbiAgICAgIGxlYWRpbmcgPSBmYWxzZSxcbiAgICAgIG1heGluZyA9IGZhbHNlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHdhaXQgPSB0b051bWJlcih3YWl0KSB8fCAwO1xuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gISFvcHRpb25zLmxlYWRpbmc7XG4gICAgbWF4aW5nID0gJ21heFdhaXQnIGluIG9wdGlvbnM7XG4gICAgbWF4V2FpdCA9IG1heGluZyA/IG5hdGl2ZU1heCh0b051bWJlcihvcHRpb25zLm1heFdhaXQpIHx8IDAsIHdhaXQpIDogbWF4V2FpdDtcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gaW52b2tlRnVuYyh0aW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBsYXN0QXJncyxcbiAgICAgICAgdGhpc0FyZyA9IGxhc3RUaGlzO1xuXG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gbGVhZGluZ0VkZ2UodGltZSkge1xuICAgIC8vIFJlc2V0IGFueSBgbWF4V2FpdGAgdGltZXIuXG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIC8vIFN0YXJ0IHRoZSB0aW1lciBmb3IgdGhlIHRyYWlsaW5nIGVkZ2UuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAvLyBJbnZva2UgdGhlIGxlYWRpbmcgZWRnZS5cbiAgICByZXR1cm4gbGVhZGluZyA/IGludm9rZUZ1bmModGltZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiByZW1haW5pbmdXYWl0KHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lLFxuICAgICAgICByZXN1bHQgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cbiAgICByZXR1cm4gbWF4aW5nID8gbmF0aXZlTWluKHJlc3VsdCwgbWF4V2FpdCAtIHRpbWVTaW5jZUxhc3RJbnZva2UpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkSW52b2tlKHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lO1xuXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcbiAgICAvLyB0cmFpbGluZyBlZGdlLCB0aGUgc3lzdGVtIHRpbWUgaGFzIGdvbmUgYmFja3dhcmRzIGFuZCB3ZSdyZSB0cmVhdGluZ1xuICAgIC8vIGl0IGFzIHRoZSB0cmFpbGluZyBlZGdlLCBvciB3ZSd2ZSBoaXQgdGhlIGBtYXhXYWl0YCBsaW1pdC5cbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxuICAgICAgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkgfHwgKG1heGluZyAmJiB0aW1lU2luY2VMYXN0SW52b2tlID49IG1heFdhaXQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVyRXhwaXJlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpO1xuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcbiAgICAgIHJldHVybiB0cmFpbGluZ0VkZ2UodGltZSk7XG4gICAgfVxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgcmVtYWluaW5nV2FpdCh0aW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGluZ0VkZ2UodGltZSkge1xuICAgIHRpbWVySWQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGludm9rZSBpZiB3ZSBoYXZlIGBsYXN0QXJnc2Agd2hpY2ggbWVhbnMgYGZ1bmNgIGhhcyBiZWVuXG4gICAgLy8gZGVib3VuY2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XG4gICAgICByZXR1cm4gaW52b2tlRnVuYyh0aW1lKTtcbiAgICB9XG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICh0aW1lcklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICB9XG4gICAgbGFzdEludm9rZVRpbWUgPSAwO1xuICAgIGxhc3RBcmdzID0gbGFzdENhbGxUaW1lID0gbGFzdFRoaXMgPSB0aW1lcklkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgcmV0dXJuIHRpbWVySWQgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRyYWlsaW5nRWRnZShub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKSxcbiAgICAgICAgaXNJbnZva2luZyA9IHNob3VsZEludm9rZSh0aW1lKTtcblxuICAgIGxhc3RBcmdzID0gYXJndW1lbnRzO1xuICAgIGxhc3RUaGlzID0gdGhpcztcbiAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcbiAgICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgICBpZiAobWF4aW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBpbnZvY2F0aW9ucyBpbiBhIHRpZ2h0IGxvb3AuXG4gICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgICAgIHJldHVybiBpbnZva2VGdW5jKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZGVib3VuY2VkLmNhbmNlbCA9IGNhbmNlbDtcbiAgZGVib3VuY2VkLmZsdXNoID0gZmx1c2g7XG4gIHJldHVybiBkZWJvdW5jZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlYm91bmNlO1xuIiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsImNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbmNvbnN0IGRlbGVnYXRlID0gcmVxdWlyZSgnLi4vZGVsZWdhdGUnKTtcbmNvbnN0IGRlbGVnYXRlQWxsID0gcmVxdWlyZSgnLi4vZGVsZWdhdGVBbGwnKTtcblxuY29uc3QgREVMRUdBVEVfUEFUVEVSTiA9IC9eKC4rKTpkZWxlZ2F0ZVxcKCguKylcXCkkLztcbmNvbnN0IFNQQUNFID0gJyAnO1xuXG5jb25zdCBnZXRMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlLCBoYW5kbGVyKSB7XG4gIHZhciBtYXRjaCA9IHR5cGUubWF0Y2goREVMRUdBVEVfUEFUVEVSTik7XG4gIHZhciBzZWxlY3RvcjtcbiAgaWYgKG1hdGNoKSB7XG4gICAgdHlwZSA9IG1hdGNoWzFdO1xuICAgIHNlbGVjdG9yID0gbWF0Y2hbMl07XG4gIH1cblxuICB2YXIgb3B0aW9ucztcbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnb2JqZWN0Jykge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBjYXB0dXJlOiBwb3BLZXkoaGFuZGxlciwgJ2NhcHR1cmUnKSxcbiAgICAgIHBhc3NpdmU6IHBvcEtleShoYW5kbGVyLCAncGFzc2l2ZScpXG4gICAgfTtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lciA9IHtcbiAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgZGVsZWdhdGU6ICh0eXBlb2YgaGFuZGxlciA9PT0gJ29iamVjdCcpXG4gICAgICA/IGRlbGVnYXRlQWxsKGhhbmRsZXIpXG4gICAgICA6IHNlbGVjdG9yXG4gICAgICAgID8gZGVsZWdhdGUoc2VsZWN0b3IsIGhhbmRsZXIpXG4gICAgICAgIDogaGFuZGxlcixcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH07XG5cbiAgaWYgKHR5cGUuaW5kZXhPZihTUEFDRSkgPiAtMSkge1xuICAgIHJldHVybiB0eXBlLnNwbGl0KFNQQUNFKS5tYXAoZnVuY3Rpb24oX3R5cGUpIHtcbiAgICAgIHJldHVybiBhc3NpZ24oe3R5cGU6IF90eXBlfSwgbGlzdGVuZXIpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGxpc3RlbmVyLnR5cGUgPSB0eXBlO1xuICAgIHJldHVybiBbbGlzdGVuZXJdO1xuICB9XG59O1xuXG52YXIgcG9wS2V5ID0gZnVuY3Rpb24ob2JqLCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gb2JqW2tleV07XG4gIGRlbGV0ZSBvYmpba2V5XTtcbiAgcmV0dXJuIHZhbHVlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiZWhhdmlvcihldmVudHMsIHByb3BzKSB7XG4gIGNvbnN0IGxpc3RlbmVycyA9IE9iamVjdC5rZXlzKGV2ZW50cylcbiAgICAucmVkdWNlKGZ1bmN0aW9uKG1lbW8sIHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMgPSBnZXRMaXN0ZW5lcnModHlwZSwgZXZlbnRzW3R5cGVdKTtcbiAgICAgIHJldHVybiBtZW1vLmNvbmNhdChsaXN0ZW5lcnMpO1xuICAgIH0sIFtdKTtcblxuICByZXR1cm4gYXNzaWduKHtcbiAgICBhZGQ6IGZ1bmN0aW9uIGFkZEJlaGF2aW9yKGVsZW1lbnQpIHtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uKGxpc3RlbmVyKSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBsaXN0ZW5lci50eXBlLFxuICAgICAgICAgIGxpc3RlbmVyLmRlbGVnYXRlLFxuICAgICAgICAgIGxpc3RlbmVyLm9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmVCZWhhdmlvcihlbGVtZW50KSB7XG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbihsaXN0ZW5lcikge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgbGlzdGVuZXIudHlwZSxcbiAgICAgICAgICBsaXN0ZW5lci5kZWxlZ2F0ZSxcbiAgICAgICAgICBsaXN0ZW5lci5vcHRpb25zXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHByb3BzKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbXBvc2UoZnVuY3Rpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9ucy5zb21lKGZ1bmN0aW9uKGZuKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBlKSA9PT0gZmFsc2U7XG4gICAgfSwgdGhpcyk7XG4gIH07XG59O1xuIiwiLy8gcG9seWZpbGwgRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdFxucmVxdWlyZSgnZWxlbWVudC1jbG9zZXN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVsZWdhdGUoc2VsZWN0b3IsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBkZWxlZ2F0aW9uKGV2ZW50KSB7XG4gICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KHNlbGVjdG9yKTtcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0YXJnZXQsIGV2ZW50KTtcbiAgICB9XG4gIH1cbn07XG4iLCJjb25zdCBkZWxlZ2F0ZSA9IHJlcXVpcmUoJy4uL2RlbGVnYXRlJyk7XG5jb25zdCBjb21wb3NlID0gcmVxdWlyZSgnLi4vY29tcG9zZScpO1xuXG5jb25zdCBTUExBVCA9ICcqJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWxlZ2F0ZUFsbChzZWxlY3RvcnMpIHtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNlbGVjdG9ycylcblxuICAvLyBYWFggb3B0aW1pemF0aW9uOiBpZiB0aGVyZSBpcyBvbmx5IG9uZSBoYW5kbGVyIGFuZCBpdCBhcHBsaWVzIHRvXG4gIC8vIGFsbCBlbGVtZW50cyAodGhlIFwiKlwiIENTUyBzZWxlY3RvciksIHRoZW4ganVzdCByZXR1cm4gdGhhdFxuICAvLyBoYW5kbGVyXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMSAmJiBrZXlzWzBdID09PSBTUExBVCkge1xuICAgIHJldHVybiBzZWxlY3RvcnNbU1BMQVRdO1xuICB9XG5cbiAgY29uc3QgZGVsZWdhdGVzID0ga2V5cy5yZWR1Y2UoZnVuY3Rpb24obWVtbywgc2VsZWN0b3IpIHtcbiAgICBtZW1vLnB1c2goZGVsZWdhdGUoc2VsZWN0b3IsIHNlbGVjdG9yc1tzZWxlY3Rvcl0pKTtcbiAgICByZXR1cm4gbWVtbztcbiAgfSwgW10pO1xuICByZXR1cm4gY29tcG9zZShkZWxlZ2F0ZXMpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaWdub3JlKGVsZW1lbnQsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpZ25vcmFuY2UoZSkge1xuICAgIGlmIChlbGVtZW50ICE9PSBlLnRhcmdldCAmJiAhZWxlbWVudC5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGUpO1xuICAgIH1cbiAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG9uY2UobGlzdGVuZXIsIG9wdGlvbnMpIHtcbiAgdmFyIHdyYXBwZWQgPSBmdW5jdGlvbiB3cmFwcGVkT25jZShlKSB7XG4gICAgZS5jdXJyZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZS50eXBlLCB3cmFwcGVkLCBvcHRpb25zKTtcbiAgICByZXR1cm4gbGlzdGVuZXIuY2FsbCh0aGlzLCBlKTtcbiAgfTtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBSRV9UUklNID0gLyheXFxzKyl8KFxccyskKS9nO1xudmFyIFJFX1NQTElUID0gL1xccysvO1xuXG52YXIgdHJpbSA9IFN0cmluZy5wcm90b3R5cGUudHJpbVxuICA/IGZ1bmN0aW9uKHN0cikgeyByZXR1cm4gc3RyLnRyaW0oKTsgfVxuICA6IGZ1bmN0aW9uKHN0cikgeyByZXR1cm4gc3RyLnJlcGxhY2UoUkVfVFJJTSwgJycpOyB9O1xuXG52YXIgcXVlcnlCeUlkID0gZnVuY3Rpb24oaWQpIHtcbiAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignW2lkPVwiJyArIGlkLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICdcIl0nKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVzb2x2ZUlkcyhpZHMsIGRvYykge1xuICBpZiAodHlwZW9mIGlkcyAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nIGJ1dCBnb3QgJyArICh0eXBlb2YgaWRzKSk7XG4gIH1cblxuICBpZiAoIWRvYykge1xuICAgIGRvYyA9IHdpbmRvdy5kb2N1bWVudDtcbiAgfVxuXG4gIHZhciBnZXRFbGVtZW50QnlJZCA9IGRvYy5nZXRFbGVtZW50QnlJZFxuICAgID8gZG9jLmdldEVsZW1lbnRCeUlkLmJpbmQoZG9jKVxuICAgIDogcXVlcnlCeUlkLmJpbmQoZG9jKTtcblxuICBpZHMgPSB0cmltKGlkcykuc3BsaXQoUkVfU1BMSVQpO1xuXG4gIC8vIFhYWCB3ZSBjYW4gc2hvcnQtY2lyY3VpdCBoZXJlIGJlY2F1c2UgdHJpbW1pbmcgYW5kIHNwbGl0dGluZyBhXG4gIC8vIHN0cmluZyBvZiBqdXN0IHdoaXRlc3BhY2UgcHJvZHVjZXMgYW4gYXJyYXkgY29udGFpbmluZyBhIHNpbmdsZSxcbiAgLy8gZW1wdHkgc3RyaW5nXG4gIGlmIChpZHMubGVuZ3RoID09PSAxICYmIGlkc1swXSA9PT0gJycpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICByZXR1cm4gaWRzXG4gICAgLm1hcChmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIGVsID0gZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgaWYgKCFlbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGVsZW1lbnQgd2l0aCBpZDogXCInICsgaWQgKyAnXCInKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbDtcbiAgICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5jb25zdCBmaWx0ZXIgPSByZXF1aXJlKCdhcnJheS1maWx0ZXInKTtcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XG5jb25zdCB0b2dnbGUgPSByZXF1aXJlKCcuLi91dGlscy90b2dnbGUnKTtcbmNvbnN0IGlzRWxlbWVudEluVmlld3BvcnQgPSByZXF1aXJlKCcuLi91dGlscy9pcy1pbi12aWV3cG9ydCcpO1xuXG5jb25zdCBDTElDSyA9IHJlcXVpcmUoJy4uL2V2ZW50cycpLkNMSUNLO1xuY29uc3QgUFJFRklYID0gcmVxdWlyZSgnLi4vY29uZmlnJykucHJlZml4O1xuXG4vLyBYWFggbWF0Y2ggLnVzYS1hY2NvcmRpb24gYW5kIC51c2EtYWNjb3JkaW9uLWJvcmRlcmVkXG5jb25zdCBBQ0NPUkRJT04gPSBgLiR7UFJFRklYfS1hY2NvcmRpb24sIC4ke1BSRUZJWH0tYWNjb3JkaW9uLWJvcmRlcmVkYDtcbmNvbnN0IEJVVFRPTiA9IGAuJHtQUkVGSVh9LWFjY29yZGlvbi1idXR0b25bYXJpYS1jb250cm9sc11gO1xuY29uc3QgRVhQQU5ERUQgPSAnYXJpYS1leHBhbmRlZCc7XG5jb25zdCBNVUxUSVNFTEVDVEFCTEUgPSAnYXJpYS1tdWx0aXNlbGVjdGFibGUnO1xuXG4vKipcbiAqIFRvZ2dsZSBhIGJ1dHRvbidzIFwicHJlc3NlZFwiIHN0YXRlLCBvcHRpb25hbGx5IHByb3ZpZGluZyBhIHRhcmdldFxuICogc3RhdGUuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gYnV0dG9uXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBleHBhbmRlZCBJZiBubyBzdGF0ZSBpcyBwcm92aWRlZCwgdGhlIGN1cnJlbnRcbiAqIHN0YXRlIHdpbGwgYmUgdG9nZ2xlZCAoZnJvbSBmYWxzZSB0byB0cnVlLCBhbmQgdmljZS12ZXJzYSkuXG4gKiBAcmV0dXJuIHtib29sZWFufSB0aGUgcmVzdWx0aW5nIHN0YXRlXG4gKi9cbmNvbnN0IHRvZ2dsZUJ1dHRvbiA9IChidXR0b24sIGV4cGFuZGVkKSA9PiB7XG4gIHZhciBhY2NvcmRpb24gPSBidXR0b24uY2xvc2VzdChBQ0NPUkRJT04pO1xuICBpZiAoIWFjY29yZGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtCVVRUT059IGlzIG1pc3Npbmcgb3V0ZXIgJHtBQ0NPUkRJT059YCk7XG4gIH1cblxuICBleHBhbmRlZCA9IHRvZ2dsZShidXR0b24sIGV4cGFuZGVkKTtcbiAgLy8gWFhYIG11bHRpc2VsZWN0YWJsZSBpcyBvcHQtaW4sIHRvIHByZXNlcnZlIGxlZ2FjeSBiZWhhdmlvclxuICBjb25zdCBtdWx0aXNlbGVjdGFibGUgPSBhY2NvcmRpb24uZ2V0QXR0cmlidXRlKE1VTFRJU0VMRUNUQUJMRSkgPT09ICd0cnVlJztcblxuICBpZiAoZXhwYW5kZWQgJiYgIW11bHRpc2VsZWN0YWJsZSkge1xuICAgIGZvckVhY2goZ2V0QWNjb3JkaW9uQnV0dG9ucyhhY2NvcmRpb24pLCBvdGhlciA9PiB7XG4gICAgICBpZiAob3RoZXIgIT09IGJ1dHRvbikge1xuICAgICAgICB0b2dnbGUob3RoZXIsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBidXR0b25cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWVcbiAqL1xuY29uc3Qgc2hvd0J1dHRvbiA9IGJ1dHRvbiA9PiB0b2dnbGVCdXR0b24oYnV0dG9uLCB0cnVlKTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBidXR0b25cbiAqIEByZXR1cm4ge2Jvb2xlYW59IGZhbHNlXG4gKi9cbmNvbnN0IGhpZGVCdXR0b24gPSBidXR0b24gPT4gdG9nZ2xlQnV0dG9uKGJ1dHRvbiwgZmFsc2UpO1xuXG4vKipcbiAqIEdldCBhbiBBcnJheSBvZiBidXR0b24gZWxlbWVudHMgYmVsb25naW5nIGRpcmVjdGx5IHRvIHRoZSBnaXZlblxuICogYWNjb3JkaW9uIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBhY2NvcmRpb25cbiAqIEByZXR1cm4ge2FycmF5PEhUTUxCdXR0b25FbGVtZW50Pn1cbiAqL1xuY29uc3QgZ2V0QWNjb3JkaW9uQnV0dG9ucyA9IGFjY29yZGlvbiA9PiB7XG4gIHJldHVybiBmaWx0ZXIoYWNjb3JkaW9uLnF1ZXJ5U2VsZWN0b3JBbGwoQlVUVE9OKSwgYnV0dG9uID0+IHtcbiAgICByZXR1cm4gYnV0dG9uLmNsb3Nlc3QoQUNDT1JESU9OKSA9PT0gYWNjb3JkaW9uO1xuICB9KTtcbn07XG5cbmNvbnN0IGFjY29yZGlvbiA9IGJlaGF2aW9yKHtcbiAgWyBDTElDSyBdOiB7XG4gICAgWyBCVVRUT04gXTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdG9nZ2xlQnV0dG9uKHRoaXMpO1xuXG4gICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoRVhQQU5ERUQpID09PSAndHJ1ZScpIHtcbiAgICAgICAgLy8gV2Ugd2VyZSBqdXN0IGV4cGFuZGVkLCBidXQgaWYgYW5vdGhlciBhY2NvcmRpb24gd2FzIGFsc28ganVzdFxuICAgICAgICAvLyBjb2xsYXBzZWQsIHdlIG1heSBubyBsb25nZXIgYmUgaW4gdGhlIHZpZXdwb3J0LiBUaGlzIGVuc3VyZXNcbiAgICAgICAgLy8gdGhhdCB3ZSBhcmUgc3RpbGwgdmlzaWJsZSwgc28gdGhlIHVzZXIgaXNuJ3QgY29uZnVzZWQuXG4gICAgICAgIGlmICghaXNFbGVtZW50SW5WaWV3cG9ydCh0aGlzKSkgdGhpcy5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG59LCB7XG4gIGluaXQ6IHJvb3QgPT4ge1xuICAgIGZvckVhY2gocm9vdC5xdWVyeVNlbGVjdG9yQWxsKEJVVFRPTiksIGJ1dHRvbiA9PiB7XG4gICAgICBjb25zdCBleHBhbmRlZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoRVhQQU5ERUQpID09PSAndHJ1ZSc7XG4gICAgICB0b2dnbGVCdXR0b24oYnV0dG9uLCBleHBhbmRlZCk7XG4gICAgfSk7XG4gIH0sXG4gIEFDQ09SRElPTixcbiAgQlVUVE9OLFxuICBzaG93OiBzaG93QnV0dG9uLFxuICBoaWRlOiBoaWRlQnV0dG9uLFxuICB0b2dnbGU6IHRvZ2dsZUJ1dHRvbixcbiAgZ2V0QnV0dG9uczogZ2V0QWNjb3JkaW9uQnV0dG9ucyxcbn0pO1xuXG4vKipcbiAqIFRPRE86IGZvciAyLjAsIHJlbW92ZSBldmVyeXRoaW5nIGJlbG93IHRoaXMgY29tbWVudCBhbmQgZXhwb3J0IHRoZVxuICogYmVoYXZpb3IgZGlyZWN0bHk6XG4gKlxuICogbW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7Li4ufSk7XG4gKi9cbmNvbnN0IEFjY29yZGlvbiA9IGZ1bmN0aW9uIChyb290KSB7XG4gIHRoaXMucm9vdCA9IHJvb3Q7XG4gIGFjY29yZGlvbi5vbih0aGlzLnJvb3QpO1xufTtcblxuLy8gY29weSBhbGwgb2YgdGhlIGJlaGF2aW9yIG1ldGhvZHMgYW5kIHByb3BzIHRvIEFjY29yZGlvblxuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuYXNzaWduKEFjY29yZGlvbiwgYWNjb3JkaW9uKTtcblxuQWNjb3JkaW9uLnByb3RvdHlwZS5zaG93ID0gc2hvd0J1dHRvbjtcbkFjY29yZGlvbi5wcm90b3R5cGUuaGlkZSA9IGhpZGVCdXR0b247XG5cbkFjY29yZGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICBhY2NvcmRpb24ub2ZmKHRoaXMucm9vdCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFjY29yZGlvbjtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IHRvZ2dsZSA9IHJlcXVpcmUoJy4uL3V0aWxzL3RvZ2dsZScpO1xuXG5jb25zdCBDTElDSyA9IHJlcXVpcmUoJy4uL2V2ZW50cycpLkNMSUNLO1xuY29uc3QgUFJFRklYID0gcmVxdWlyZSgnLi4vY29uZmlnJykucHJlZml4O1xuXG5jb25zdCBIRUFERVIgPSBgLiR7UFJFRklYfS1iYW5uZXItaGVhZGVyYDtcbmNvbnN0IEVYUEFOREVEX0NMQVNTID0gYCR7UFJFRklYfS1iYW5uZXItaGVhZGVyLWV4cGFuZGVkYDtcblxuY29uc3QgdG9nZ2xlQmFubmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIHRoaXMuY2xvc2VzdChIRUFERVIpLmNsYXNzTGlzdC50b2dnbGUoRVhQQU5ERURfQ0xBU1MpO1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgWyBDTElDSyBdOiB7XG4gICAgWyBgJHtIRUFERVJ9IFthcmlhLWNvbnRyb2xzXWAgXTogdG9nZ2xlQmFubmVyLFxuICB9LFxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBhY2NvcmRpb24gPSByZXF1aXJlKCcuL2FjY29yZGlvbicpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3QgZGVib3VuY2UgPSByZXF1aXJlKCdsb2Rhc2guZGVib3VuY2UnKTtcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcblxuY29uc3QgQ0xJQ0sgPSByZXF1aXJlKCcuLi9ldmVudHMnKS5DTElDSztcbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcblxuY29uc3QgSElEREVOID0gJ2hpZGRlbic7XG5jb25zdCBTQ09QRSA9IGAuJHtQUkVGSVh9LWZvb3Rlci1iaWdgO1xuY29uc3QgTkFWID0gYCR7U0NPUEV9IG5hdmA7XG5jb25zdCBCVVRUT04gPSBgJHtOQVZ9IC4ke1BSRUZJWH0tZm9vdGVyLXByaW1hcnktbGlua2A7XG5jb25zdCBMSVNUID0gYCR7TkFWfSB1bGA7XG5cbmNvbnN0IEhJREVfTUFYX1dJRFRIID0gNjAwO1xuY29uc3QgREVCT1VOQ0VfUkFURSA9IDE4MDtcblxuY29uc3Qgc2hvd1BhbmVsID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBsaXN0ID0gdGhpcy5jbG9zZXN0KExJU1QpO1xuICBsaXN0LmNsYXNzTGlzdC5yZW1vdmUoSElEREVOKTtcblxuICAvLyBOQjogdGhpcyAqc2hvdWxkKiBhbHdheXMgc3VjY2VlZCBiZWNhdXNlIHRoZSBidXR0b25cbiAgLy8gc2VsZWN0b3IgaXMgc2NvcGVkIHRvIFwiLntwcmVmaXh9LWZvb3Rlci1iaWcgbmF2XCJcbiAgY29uc3QgbGlzdHMgPSBsaXN0LmNsb3Nlc3QoTkFWKVxuICAgIC5xdWVyeVNlbGVjdG9yQWxsKCd1bCcpO1xuXG4gIGZvckVhY2gobGlzdHMsIGVsID0+IHtcbiAgICBpZiAoZWwgIT09IGxpc3QpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoSElEREVOKTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgcmVzaXplID0gZGVib3VuY2UoKCkgPT4ge1xuICBjb25zdCBoaWRkZW4gPSB3aW5kb3cuaW5uZXJXaWR0aCA8IEhJREVfTUFYX1dJRFRIO1xuICBmb3JFYWNoKHNlbGVjdChMSVNUKSwgbGlzdCA9PiB7XG4gICAgbGlzdC5jbGFzc0xpc3QudG9nZ2xlKEhJRERFTiwgaGlkZGVuKTtcbiAgfSk7XG59LCBERUJPVU5DRV9SQVRFKTtcblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gIFsgQ0xJQ0sgXToge1xuICAgIFsgQlVUVE9OIF06IHNob3dQYW5lbCxcbiAgfSxcbn0sIHtcbiAgLy8gZXhwb3J0IGZvciB1c2UgZWxzZXdoZXJlXG4gIEhJREVfTUFYX1dJRFRILFxuICBERUJPVU5DRV9SQVRFLFxuXG4gIGluaXQ6IHRhcmdldCA9PiB7XG4gICAgcmVzaXplKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSk7XG4gIH0sXG5cbiAgdGVhcmRvd246IHRhcmdldCA9PiB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSk7XG4gIH0sXG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBhY2NvcmRpb246ICByZXF1aXJlKCcuL2FjY29yZGlvbicpLFxuICBiYW5uZXI6ICAgICByZXF1aXJlKCcuL2Jhbm5lcicpLFxuICBmb290ZXI6ICAgICByZXF1aXJlKCcuL2Zvb3RlcicpLFxuICBuYXZpZ2F0aW9uOiByZXF1aXJlKCcuL25hdmlnYXRpb24nKSxcbiAgcGFzc3dvcmQ6ICAgcmVxdWlyZSgnLi9wYXNzd29yZCcpLFxuICBzZWFyY2g6ICAgICByZXF1aXJlKCcuL3NlYXJjaCcpLFxuICBza2lwbmF2OiAgICByZXF1aXJlKCcuL3NraXBuYXYnKSxcbiAgdmFsaWRhdG9yOiAgcmVxdWlyZSgnLi92YWxpZGF0b3InKSxcbn07XG5cbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZSgnLi4vdXRpbHMvYmVoYXZpb3InKTtcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcbmNvbnN0IGFjY29yZGlvbiA9IHJlcXVpcmUoJy4vYWNjb3JkaW9uJyk7XG5cbmNvbnN0IENMSUNLID0gcmVxdWlyZSgnLi4vZXZlbnRzJykuQ0xJQ0s7XG5jb25zdCBQUkVGSVggPSByZXF1aXJlKCcuLi9jb25maWcnKS5wcmVmaXg7XG5cbmNvbnN0IENPTlRFWFQgPSAnaGVhZGVyJztcbmNvbnN0IE5BViA9IGAuJHtQUkVGSVh9LW5hdmA7XG5jb25zdCBOQVZfTElOS1MgPSBgJHtOQVZ9IGFgO1xuY29uc3QgT1BFTkVSUyA9IGAuJHtQUkVGSVh9LW1lbnUtYnRuYDtcbmNvbnN0IENMT1NFX0JVVFRPTiA9IGAuJHtQUkVGSVh9LW5hdi1jbG9zZWA7XG5jb25zdCBPVkVSTEFZID0gYC4ke1BSRUZJWH0tb3ZlcmxheWA7XG5jb25zdCBDTE9TRVJTID0gYCR7Q0xPU0VfQlVUVE9OfSwgLiR7UFJFRklYfS1vdmVybGF5YDtcbmNvbnN0IFRPR0dMRVMgPSBbIE5BViwgT1ZFUkxBWSBdLmpvaW4oJywgJyk7XG5cbmNvbnN0IEFDVElWRV9DTEFTUyA9ICd1c2EtbW9iaWxlX25hdi1hY3RpdmUnO1xuY29uc3QgVklTSUJMRV9DTEFTUyA9ICdpcy12aXNpYmxlJztcblxuY29uc3QgdG9nZ2xlTmF2ID0gZnVuY3Rpb24gKGFjdGl2ZSkge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgaWYgKHR5cGVvZiBhY3RpdmUgIT09ICdib29sZWFuJykge1xuICAgIGFjdGl2ZSA9ICFib2R5LmNsYXNzTGlzdC5jb250YWlucyhBQ1RJVkVfQ0xBU1MpO1xuICB9XG4gIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZShBQ1RJVkVfQ0xBU1MsIGFjdGl2ZSk7XG5cbiAgY29uc3QgY29udGV4dCA9IHRoaXMuY2xvc2VzdChDT05URVhUKTtcbiAgZm9yRWFjaChzZWxlY3QoVE9HR0xFUyksIGVsID0+IHtcbiAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKFZJU0lCTEVfQ0xBU1MpO1xuICB9KTtcblxuICBpZiAoYWN0aXZlICYmIGNvbnRleHQpIHtcbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGNvbnRleHQucXVlcnlTZWxlY3RvcihDTE9TRV9CVVRUT04pO1xuICAgIGlmIChjbG9zZUJ1dHRvbikge1xuICAgICAgY2xvc2VCdXR0b24uZm9jdXMoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFjdGl2ZTtcbn07XG5cbmNvbnN0IG5hdmlnYXRpb24gPSBiZWhhdmlvcih7XG4gIFsgQ0xJQ0sgXToge1xuICAgIFsgT1BFTkVSUyBdOiB0b2dnbGVOYXYsXG4gICAgWyBDTE9TRVJTIF06IHRvZ2dsZU5hdixcbiAgICBbIE5BVl9MSU5LUyBdOiBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBBIG5hdmlnYXRpb24gbGluayBoYXMgYmVlbiBjbGlja2VkISBXZSB3YW50IHRvIGNvbGxhcHNlIGFueVxuICAgICAgLy8gaGllcmFyY2hpY2FsIG5hdmlnYXRpb24gVUkgaXQncyBhIHBhcnQgb2YsIHNvIHRoYXQgdGhlIHVzZXJcbiAgICAgIC8vIGNhbiBmb2N1cyBvbiB3aGF0ZXZlciB0aGV5J3ZlIGp1c3Qgc2VsZWN0ZWQuXG5cbiAgICAgIC8vIFNvbWUgbmF2aWdhdGlvbiBsaW5rcyBhcmUgaW5zaWRlIGFjY29yZGlvbnM7IHdoZW4gdGhleSdyZVxuICAgICAgLy8gY2xpY2tlZCwgd2Ugd2FudCB0byBjb2xsYXBzZSB0aG9zZSBhY2NvcmRpb25zLlxuICAgICAgY29uc3QgYWNjID0gdGhpcy5jbG9zZXN0KGFjY29yZGlvbi5BQ0NPUkRJT04pO1xuICAgICAgaWYgKGFjYykge1xuICAgICAgICBhY2NvcmRpb24uZ2V0QnV0dG9ucyhhY2MpLmZvckVhY2goYnRuID0+IGFjY29yZGlvbi5oaWRlKGJ0bikpO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGUgbW9iaWxlIG5hdmlnYXRpb24gbWVudSBpcyBhY3RpdmUsIHdlIHdhbnQgdG8gaGlkZSBpdC5cbiAgICAgIGlmIChkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyhBQ1RJVkVfQ0xBU1MpKSB7XG4gICAgICAgIHRvZ2dsZU5hdi5jYWxsKHRoaXMpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG59KTtcblxuLyoqXG4gKiBUT0RPIGZvciAyLjAsIHJlbW92ZSB0aGlzIHN0YXRlbWVudCBhbmQgZXhwb3J0IGBuYXZpZ2F0aW9uYCBkaXJlY3RseTpcbiAqXG4gKiBtb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHsuLi59KTtcbiAqL1xuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ24oXG4gIGVsID0+IG5hdmlnYXRpb24ub24oZWwpLFxuICBuYXZpZ2F0aW9uXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3QgdG9nZ2xlRm9ybUlucHV0ID0gcmVxdWlyZSgnLi4vdXRpbHMvdG9nZ2xlLWZvcm0taW5wdXQnKTtcblxuY29uc3QgQ0xJQ0sgPSByZXF1aXJlKCcuLi9ldmVudHMnKS5DTElDSztcbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcblxuY29uc3QgTElOSyA9IGAuJHtQUkVGSVh9LXNob3dfcGFzc3dvcmQsIC4ke1BSRUZJWH0tc2hvd19tdWx0aXBhc3N3b3JkYDtcblxuY29uc3QgdG9nZ2xlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIHRvZ2dsZUZvcm1JbnB1dCh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICBbIENMSUNLIF06IHtcbiAgICBbIExJTksgXTogdG9nZ2xlLFxuICB9LFxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoJy4uL3V0aWxzL2JlaGF2aW9yJyk7XG5jb25zdCBmb3JFYWNoID0gcmVxdWlyZSgnYXJyYXktZm9yZWFjaCcpO1xuY29uc3QgaWdub3JlID0gcmVxdWlyZSgncmVjZXB0b3IvaWdub3JlJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcblxuY29uc3QgQ0xJQ0sgPSByZXF1aXJlKCcuLi9ldmVudHMnKS5DTElDSztcbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcblxuY29uc3QgQlVUVE9OID0gJy5qcy1zZWFyY2gtYnV0dG9uJztcbmNvbnN0IEZPUk0gPSAnLmpzLXNlYXJjaC1mb3JtJztcbmNvbnN0IElOUFVUID0gJ1t0eXBlPXNlYXJjaF0nO1xuY29uc3QgQ09OVEVYVCA9ICdoZWFkZXInOyAvLyBYWFhcbmNvbnN0IFZJU1VBTExZX0hJRERFTiA9IGAke1BSRUZJWH0tc3Itb25seWA7XG5cbmxldCBsYXN0QnV0dG9uO1xuXG5jb25zdCBzaG93U2VhcmNoID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHRvZ2dsZVNlYXJjaCh0aGlzLCB0cnVlKTtcbiAgbGFzdEJ1dHRvbiA9IHRoaXM7XG59O1xuXG5jb25zdCBoaWRlU2VhcmNoID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHRvZ2dsZVNlYXJjaCh0aGlzLCBmYWxzZSk7XG4gIGxhc3RCdXR0b24gPSB1bmRlZmluZWQ7XG59O1xuXG5jb25zdCBnZXRGb3JtID0gYnV0dG9uID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGJ1dHRvbi5jbG9zZXN0KENPTlRFWFQpO1xuICByZXR1cm4gY29udGV4dFxuICAgID8gY29udGV4dC5xdWVyeVNlbGVjdG9yKEZPUk0pXG4gICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKEZPUk0pO1xufTtcblxuY29uc3QgdG9nZ2xlU2VhcmNoID0gKGJ1dHRvbiwgYWN0aXZlKSA9PiB7XG4gIGNvbnN0IGZvcm0gPSBnZXRGb3JtKGJ1dHRvbik7XG4gIGlmICghZm9ybSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgTm8gJHtGT1JNfSBmb3VuZCBmb3Igc2VhcmNoIHRvZ2dsZSBpbiAke0NPTlRFWFR9IWApO1xuICB9XG5cbiAgYnV0dG9uLmhpZGRlbiA9IGFjdGl2ZTtcbiAgZm9ybS5jbGFzc0xpc3QudG9nZ2xlKFZJU1VBTExZX0hJRERFTiwgIWFjdGl2ZSk7XG5cbiAgaWYgKGFjdGl2ZSkge1xuICAgIGNvbnN0IGlucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKElOUFVUKTtcbiAgICBpZiAoaW5wdXQpIHtcbiAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgfVxuICAgIC8vIHdoZW4gdGhlIHVzZXIgY2xpY2tzIF9vdXRzaWRlXyBvZiB0aGUgZm9ybSB3L2lnbm9yZSgpOiBoaWRlIHRoZVxuICAgIC8vIHNlYXJjaCwgdGhlbiByZW1vdmUgdGhlIGxpc3RlbmVyXG4gICAgY29uc3QgbGlzdGVuZXIgPSBpZ25vcmUoZm9ybSwgZSA9PiB7XG4gICAgICBpZiAobGFzdEJ1dHRvbikge1xuICAgICAgICBoaWRlU2VhcmNoLmNhbGwobGFzdEJ1dHRvbik7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoQ0xJQ0ssIGxpc3RlbmVyKTtcbiAgICB9KTtcblxuICAgIC8vIE5vcm1hbGx5IHdlIHdvdWxkIGp1c3QgcnVuIHRoaXMgY29kZSB3aXRob3V0IGEgdGltZW91dCwgYnV0XG4gICAgLy8gSUUxMSBhbmQgRWRnZSB3aWxsIGFjdHVhbGx5IGNhbGwgdGhlIGxpc3RlbmVyICppbW1lZGlhdGVseSogYmVjYXVzZVxuICAgIC8vIHRoZXkgYXJlIGN1cnJlbnRseSBoYW5kbGluZyB0aGlzIGV4YWN0IHR5cGUgb2YgZXZlbnQsIHNvIHdlJ2xsXG4gICAgLy8gbWFrZSBzdXJlIHRoZSBicm93c2VyIGlzIGRvbmUgaGFuZGxpbmcgdGhlIGN1cnJlbnQgY2xpY2sgZXZlbnQsXG4gICAgLy8gaWYgYW55LCBiZWZvcmUgd2UgYXR0YWNoIHRoZSBsaXN0ZW5lci5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihDTElDSywgbGlzdGVuZXIpO1xuICAgIH0sIDApO1xuICB9XG59O1xuXG5jb25zdCBzZWFyY2ggPSBiZWhhdmlvcih7XG4gIFsgQ0xJQ0sgXToge1xuICAgIFsgQlVUVE9OIF06IHNob3dTZWFyY2gsXG4gIH0sXG59LCB7XG4gIGluaXQ6ICh0YXJnZXQpID0+IHtcbiAgICBmb3JFYWNoKHNlbGVjdChCVVRUT04sIHRhcmdldCksIGJ1dHRvbiA9PiB7XG4gICAgICB0b2dnbGVTZWFyY2goYnV0dG9uLCBmYWxzZSk7XG4gICAgfSk7XG4gIH0sXG4gIHRlYXJkb3duOiAodGFyZ2V0KSA9PiB7XG4gICAgLy8gZm9yZ2V0IHRoZSBsYXN0IGJ1dHRvbiBjbGlja2VkXG4gICAgbGFzdEJ1dHRvbiA9IHVuZGVmaW5lZDtcbiAgfSxcbn0pO1xuXG4vKipcbiAqIFRPRE8gZm9yIDIuMCwgcmVtb3ZlIHRoaXMgc3RhdGVtZW50IGFuZCBleHBvcnQgYG5hdmlnYXRpb25gIGRpcmVjdGx5OlxuICpcbiAqIG1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioey4uLn0pO1xuICovXG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbihcbiAgZWwgPT4gc2VhcmNoLm9uKGVsKSxcbiAgc2VhcmNoXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3Qgb25jZSA9IHJlcXVpcmUoJ3JlY2VwdG9yL29uY2UnKTtcblxuY29uc3QgQ0xJQ0sgPSByZXF1aXJlKCcuLi9ldmVudHMnKS5DTElDSztcbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcbmNvbnN0IExJTksgPSBgLiR7UFJFRklYfS1za2lwbmF2W2hyZWZePVwiI1wiXWA7XG5cbmNvbnN0IHNldFRhYmluZGV4ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIC8vIE5COiB3ZSBrbm93IGJlY2F1c2Ugb2YgdGhlIHNlbGVjdG9yIHdlJ3JlIGRlbGVnYXRpbmcgdG8gYmVsb3cgdGhhdCB0aGVcbiAgLy8gaHJlZiBhbHJlYWR5IGJlZ2lucyB3aXRoICcjJ1xuICBjb25zdCBpZCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJykuc2xpY2UoMSk7XG4gIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgaWYgKHRhcmdldCkge1xuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBvbmNlKGV2ZW50ID0+IHtcbiAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuICAgIH0pKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB0aHJvdyBhbiBlcnJvcj9cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gIFsgQ0xJQ0sgXToge1xuICAgIFsgTElOSyBdOiBzZXRUYWJpbmRleCxcbiAgfSxcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKCcuLi91dGlscy9iZWhhdmlvcicpO1xuY29uc3QgdmFsaWRhdGUgPSByZXF1aXJlKCcuLi91dGlscy92YWxpZGF0ZS1pbnB1dCcpO1xuY29uc3QgZGVib3VuY2UgPSByZXF1aXJlKCdsb2Rhc2guZGVib3VuY2UnKTtcblxuY29uc3QgY2hhbmdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHJldHVybiB2YWxpZGF0ZSh0aGlzKTtcbn07XG5cbmNvbnN0IHZhbGlkYXRvciA9IGJlaGF2aW9yKHtcbiAgJ2tleXVwIGNoYW5nZSc6IHtcbiAgICAnaW5wdXRbZGF0YS12YWxpZGF0aW9uLWVsZW1lbnRdJzogY2hhbmdlLFxuICB9LFxufSk7XG5cbi8qKlxuICogVE9ETyBmb3IgMi4wLCByZW1vdmUgdGhpcyBzdGF0ZW1lbnQgYW5kIGV4cG9ydCBgbmF2aWdhdGlvbmAgZGlyZWN0bHk6XG4gKlxuICogbW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7Li4ufSk7XG4gKi9cbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gYXNzaWduKFxuICBlbCA9PiB2YWxpZGF0b3Iub24oZWwpLFxuICB2YWxpZGF0b3Jcbik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHJlZml4OiAndXNhJyxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gVGhpcyB1c2VkIHRvIGJlIGNvbmRpdGlvbmFsbHkgZGVwZW5kZW50IG9uIHdoZXRoZXIgdGhlXG4gIC8vIGJyb3dzZXIgc3VwcG9ydGVkIHRvdWNoIGV2ZW50czsgaWYgaXQgZGlkLCBgQ0xJQ0tgIHdhcyBzZXQgdG9cbiAgLy8gYHRvdWNoc3RhcnRgLiAgSG93ZXZlciwgdGhpcyBoYWQgZG93bnNpZGVzOlxuICAvL1xuICAvLyAqIEl0IHByZS1lbXB0ZWQgbW9iaWxlIGJyb3dzZXJzJyBkZWZhdWx0IGJlaGF2aW9yIG9mIGRldGVjdGluZ1xuICAvLyAgIHdoZXRoZXIgYSB0b3VjaCB0dXJuZWQgaW50byBhIHNjcm9sbCwgdGhlcmVieSBwcmV2ZW50aW5nXG4gIC8vICAgdXNlcnMgZnJvbSB1c2luZyBzb21lIG9mIG91ciBjb21wb25lbnRzIGFzIHNjcm9sbCBzdXJmYWNlcy5cbiAgLy9cbiAgLy8gKiBTb21lIGRldmljZXMsIHN1Y2ggYXMgdGhlIE1pY3Jvc29mdCBTdXJmYWNlIFBybywgc3VwcG9ydCAqYm90aCpcbiAgLy8gICB0b3VjaCBhbmQgY2xpY2tzLiBUaGlzIG1lYW50IHRoZSBjb25kaXRpb25hbCBlZmZlY3RpdmVseSBkcm9wcGVkXG4gIC8vICAgc3VwcG9ydCBmb3IgdGhlIHVzZXIncyBtb3VzZSwgZnJ1c3RyYXRpbmcgdXNlcnMgd2hvIHByZWZlcnJlZFxuICAvLyAgIGl0IG9uIHRob3NlIHN5c3RlbXMuXG4gIENMSUNLOiAnY2xpY2snLFxufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGVscHJvdG8gPSB3aW5kb3cuSFRNTEVsZW1lbnQucHJvdG90eXBlO1xuY29uc3QgSElEREVOID0gJ2hpZGRlbic7XG5cbmlmICghKEhJRERFTiBpbiBlbHByb3RvKSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxwcm90bywgSElEREVOLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoSElEREVOKTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoSElEREVOLCAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShISURERU4pO1xuICAgICAgfVxuICAgIH0sXG4gIH0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gcG9seWZpbGxzIEhUTUxFbGVtZW50LnByb3RvdHlwZS5jbGFzc0xpc3QgYW5kIERPTVRva2VuTGlzdFxucmVxdWlyZSgnY2xhc3NsaXN0LXBvbHlmaWxsJyk7XG4vLyBwb2x5ZmlsbHMgSFRNTEVsZW1lbnQucHJvdG90eXBlLmhpZGRlblxucmVxdWlyZSgnLi9lbGVtZW50LWhpZGRlbicpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgZG9tcmVhZHkgPSByZXF1aXJlKCdkb21yZWFkeScpO1xuXG4vKipcbiAqIFRoZSAncG9seWZpbGxzJyBkZWZpbmUga2V5IEVDTUFTY3JpcHQgNSBtZXRob2RzIHRoYXQgbWF5IGJlIG1pc3NpbmcgZnJvbVxuICogb2xkZXIgYnJvd3NlcnMsIHNvIG11c3QgYmUgbG9hZGVkIGZpcnN0LlxuICovXG5yZXF1aXJlKCcuL3BvbHlmaWxscycpO1xuXG5jb25zdCB1c3dkcyA9IHJlcXVpcmUoJy4vY29uZmlnJyk7XG5cbmNvbnN0IGNvbXBvbmVudHMgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMnKTtcbnVzd2RzLmNvbXBvbmVudHMgPSBjb21wb25lbnRzO1xuXG5kb21yZWFkeSgoKSA9PiB7XG4gIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmJvZHk7XG4gIGZvciAobGV0IG5hbWUgaW4gY29tcG9uZW50cykge1xuICAgIGNvbnN0IGJlaGF2aW9yID0gY29tcG9uZW50c1sgbmFtZSBdO1xuICAgIGJlaGF2aW9yLm9uKHRhcmdldCk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVzd2RzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuY29uc3QgZm9yRWFjaCA9IHJlcXVpcmUoJ2FycmF5LWZvcmVhY2gnKTtcbmNvbnN0IEJlaGF2aW9yID0gcmVxdWlyZSgncmVjZXB0b3IvYmVoYXZpb3InKTtcblxuY29uc3Qgc2VxdWVuY2UgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHNlcSA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcbiAgICB9XG4gICAgZm9yRWFjaChzZXEsIG1ldGhvZCA9PiB7XG4gICAgICBpZiAodHlwZW9mIHRoaXNbIG1ldGhvZCBdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXNbIG1ldGhvZCBdLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn07XG5cbi8qKlxuICogQG5hbWUgYmVoYXZpb3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBldmVudHNcbiAqIEBwYXJhbSB7b2JqZWN0P30gcHJvcHNcbiAqIEByZXR1cm4ge3JlY2VwdG9yLmJlaGF2aW9yfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChldmVudHMsIHByb3BzKSA9PiB7XG4gIHJldHVybiBCZWhhdmlvcihldmVudHMsIGFzc2lnbih7XG4gICAgb246ICAgc2VxdWVuY2UoJ2luaXQnLCAnYWRkJyksXG4gICAgb2ZmOiAgc2VxdWVuY2UoJ3RlYXJkb3duJywgJ3JlbW92ZScpLFxuICB9LCBwcm9wcykpO1xufTtcbiIsIi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS83NTU3NDMzXG5mdW5jdGlvbiBpc0VsZW1lbnRJblZpZXdwb3J0IChlbCwgd2luPXdpbmRvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY0VsPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICB2YXIgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIHJldHVybiAoXG4gICAgcmVjdC50b3AgPj0gMCAmJlxuICAgIHJlY3QubGVmdCA+PSAwICYmXG4gICAgcmVjdC5ib3R0b20gPD0gKHdpbi5pbm5lckhlaWdodCB8fCBkb2NFbC5jbGllbnRIZWlnaHQpICYmXG4gICAgcmVjdC5yaWdodCA8PSAod2luLmlubmVyV2lkdGggfHwgZG9jRWwuY2xpZW50V2lkdGgpXG4gICk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNFbGVtZW50SW5WaWV3cG9ydDtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAbmFtZSBpc0VsZW1lbnRcbiAqIEBkZXNjIHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGEgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzRWxlbWVudCA9IHZhbHVlID0+IHtcbiAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUubm9kZVR5cGUgPT09IDE7XG59O1xuXG4vKipcbiAqIEBuYW1lIHNlbGVjdFxuICogQGRlc2Mgc2VsZWN0cyBlbGVtZW50cyBmcm9tIHRoZSBET00gYnkgY2xhc3Mgc2VsZWN0b3Igb3IgSUQgc2VsZWN0b3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgLSBUaGUgc2VsZWN0b3IgdG8gdHJhdmVyc2UgdGhlIERPTSB3aXRoLlxuICogQHBhcmFtIHtEb2N1bWVudHxIVE1MRWxlbWVudD99IGNvbnRleHQgLSBUaGUgY29udGV4dCB0byB0cmF2ZXJzZSB0aGUgRE9NXG4gKiAgIGluLiBJZiBub3QgcHJvdmlkZWQsIGl0IGRlZmF1bHRzIHRvIHRoZSBkb2N1bWVudC5cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119IC0gQW4gYXJyYXkgb2YgRE9NIG5vZGVzIG9yIGFuIGVtcHR5IGFycmF5LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNlbGVjdCAoc2VsZWN0b3IsIGNvbnRleHQpIHtcblxuICBpZiAodHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGlmICghY29udGV4dCB8fCAhaXNFbGVtZW50KGNvbnRleHQpKSB7XG4gICAgY29udGV4dCA9IHdpbmRvdy5kb2N1bWVudDtcbiAgfVxuXG4gIGNvbnN0IHNlbGVjdGlvbiA9IGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChzZWxlY3Rpb24pO1xufTtcbiIsIi8qKlxuICogRmxpcHMgZ2l2ZW4gSU5QVVQgZWxlbWVudHMgYmV0d2VlbiBtYXNrZWQgKGhpZGluZyB0aGUgZmllbGQgdmFsdWUpIGFuZCB1bm1hc2tlZFxuICogQHBhcmFtIHtBcnJheS5IVE1MRWxlbWVudH0gZmllbGRzIC0gQW4gYXJyYXkgb2YgSU5QVVQgZWxlbWVudHNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gbWFzayAtIFdoZXRoZXIgdGhlIG1hc2sgc2hvdWxkIGJlIGFwcGxpZWQsIGhpZGluZyB0aGUgZmllbGQgdmFsdWVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoZmllbGQsIG1hc2spID0+IHtcbiAgZmllbGQuc2V0QXR0cmlidXRlKCdhdXRvY2FwaXRhbGl6ZScsICdvZmYnKTtcbiAgZmllbGQuc2V0QXR0cmlidXRlKCdhdXRvY29ycmVjdCcsICdvZmYnKTtcbiAgZmllbGQuc2V0QXR0cmlidXRlKCd0eXBlJywgbWFzayA/ICdwYXNzd29yZCcgOiAndGV4dCcpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGZvckVhY2ggPSByZXF1aXJlKCdhcnJheS1mb3JlYWNoJyk7XG5jb25zdCByZXNvbHZlSWRSZWZzID0gcmVxdWlyZSgncmVzb2x2ZS1pZC1yZWZzJyk7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKCcuL3NlbGVjdCcpO1xuY29uc3QgdG9nZ2xlRmllbGRNYXNrID0gcmVxdWlyZSgnLi90b2dnbGUtZmllbGQtbWFzaycpO1xuXG5jb25zdCBDT05UUk9MUyA9ICdhcmlhLWNvbnRyb2xzJztcbmNvbnN0IFBSRVNTRUQgPSAnYXJpYS1wcmVzc2VkJztcbmNvbnN0IFNIT1dfQVRUUiA9ICdkYXRhLXNob3ctdGV4dCc7XG5jb25zdCBISURFX0FUVFIgPSAnZGF0YS1oaWRlLXRleHQnO1xuXG4vKipcbiAqIFJlcGxhY2UgdGhlIHdvcmQgXCJTaG93XCIgKG9yIFwic2hvd1wiKSB3aXRoIFwiSGlkZVwiIChvciBcImhpZGVcIikgaW4gYSBzdHJpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2hvd1RleHRcbiAqIEByZXR1cm4ge3N0cm9uZ30gaGlkZVRleHRcbiAqL1xuY29uc3QgZ2V0SGlkZVRleHQgPSBzaG93VGV4dCA9PiB7XG4gIHJldHVybiBzaG93VGV4dC5yZXBsYWNlKC9cXGJTaG93XFxiL2ksIHNob3cgPT4ge1xuICAgIHJldHVybiAoJ1MnID09PSBzaG93WyAwIF0gPyAnSCcgOiAnaCcpICsgJ2lkZSc7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBkZWNvcmF0ZXMgYW4gSFRNTCBlbGVtZW50IHdpdGggdGhlIGFiaWxpdHkgdG8gdG9nZ2xlIHRoZVxuICogbWFza2VkIHN0YXRlIG9mIGFuIGlucHV0IGZpZWxkIChsaWtlIGEgcGFzc3dvcmQpIHdoZW4gY2xpY2tlZC5cbiAqIFRoZSBpZHMgb2YgdGhlIGZpZWxkcyB0byBiZSBtYXNrZWQgd2lsbCBiZSBwdWxsZWQgZGlyZWN0bHkgZnJvbSB0aGUgYnV0dG9uJ3NcbiAqIGBhcmlhLWNvbnRyb2xzYCBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsICAgIFBhcmVudCBlbGVtZW50IGNvbnRhaW5pbmcgdGhlIGZpZWxkcyB0byBiZSBtYXNrZWRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZWwgPT4ge1xuICAvLyB0aGlzIGlzIHRoZSAqdGFyZ2V0KiBzdGF0ZTpcbiAgLy8gKiBpZiB0aGUgZWxlbWVudCBoYXMgdGhlIGF0dHIgYW5kIGl0J3MgIT09IFwidHJ1ZVwiLCBwcmVzc2VkIGlzIHRydWVcbiAgLy8gKiBvdGhlcndpc2UsIHByZXNzZWQgaXMgZmFsc2VcbiAgY29uc3QgcHJlc3NlZCA9IGVsLmhhc0F0dHJpYnV0ZShQUkVTU0VEKVxuICAgICYmIGVsLmdldEF0dHJpYnV0ZShQUkVTU0VEKSAhPT0gJ3RydWUnO1xuXG4gIGNvbnN0IGZpZWxkcyA9IHJlc29sdmVJZFJlZnMoZWwuZ2V0QXR0cmlidXRlKENPTlRST0xTKSk7XG4gIGZvckVhY2goZmllbGRzLCBmaWVsZCA9PiB0b2dnbGVGaWVsZE1hc2soZmllbGQsIHByZXNzZWQpKTtcblxuICBpZiAoIWVsLmhhc0F0dHJpYnV0ZShTSE9XX0FUVFIpKSB7XG4gICAgZWwuc2V0QXR0cmlidXRlKFNIT1dfQVRUUiwgZWwudGV4dENvbnRlbnQpO1xuICB9XG5cbiAgY29uc3Qgc2hvd1RleHQgPSBlbC5nZXRBdHRyaWJ1dGUoU0hPV19BVFRSKTtcbiAgY29uc3QgaGlkZVRleHQgPSBlbC5nZXRBdHRyaWJ1dGUoSElERV9BVFRSKSB8fCBnZXRIaWRlVGV4dChzaG93VGV4dCk7XG5cbiAgZWwudGV4dENvbnRlbnQgPSBwcmVzc2VkID8gc2hvd1RleHQgOiBoaWRlVGV4dDtcbiAgZWwuc2V0QXR0cmlidXRlKFBSRVNTRUQsIHByZXNzZWQpO1xuICByZXR1cm4gcHJlc3NlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBFWFBBTkRFRCA9ICdhcmlhLWV4cGFuZGVkJztcbmNvbnN0IENPTlRST0xTID0gJ2FyaWEtY29udHJvbHMnO1xuY29uc3QgSElEREVOID0gJ2FyaWEtaGlkZGVuJztcblxubW9kdWxlLmV4cG9ydHMgPSAoYnV0dG9uLCBleHBhbmRlZCkgPT4ge1xuXG4gIGlmICh0eXBlb2YgZXhwYW5kZWQgIT09ICdib29sZWFuJykge1xuICAgIGV4cGFuZGVkID0gYnV0dG9uLmdldEF0dHJpYnV0ZShFWFBBTkRFRCkgPT09ICdmYWxzZSc7XG4gIH1cbiAgYnV0dG9uLnNldEF0dHJpYnV0ZShFWFBBTkRFRCwgZXhwYW5kZWQpO1xuXG4gIGNvbnN0IGlkID0gYnV0dG9uLmdldEF0dHJpYnV0ZShDT05UUk9MUyk7XG4gIGNvbnN0IGNvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICBpZiAoIWNvbnRyb2xzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ05vIHRvZ2dsZSB0YXJnZXQgZm91bmQgd2l0aCBpZDogXCInICsgaWQgKyAnXCInXG4gICAgKTtcbiAgfVxuXG4gIGNvbnRyb2xzLnNldEF0dHJpYnV0ZShISURERU4sICFleHBhbmRlZCk7XG4gIHJldHVybiBleHBhbmRlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBkYXRhc2V0ID0gcmVxdWlyZSgnZWxlbS1kYXRhc2V0Jyk7XG5cbmNvbnN0IFBSRUZJWCA9IHJlcXVpcmUoJy4uL2NvbmZpZycpLnByZWZpeDtcbmNvbnN0IENIRUNLRUQgPSAnYXJpYS1jaGVja2VkJztcbmNvbnN0IENIRUNLRURfQ0xBU1MgPSBgJHtQUkVGSVh9LWNoZWNrbGlzdC1jaGVja2VkYDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB2YWxpZGF0ZSAoZWwpIHtcbiAgY29uc3QgZGF0YSA9IGRhdGFzZXQoZWwpO1xuICBjb25zdCBpZCA9IGRhdGEudmFsaWRhdGlvbkVsZW1lbnQ7XG4gIGNvbnN0IGNoZWNrTGlzdCA9IGlkLmNoYXJBdCgwKSA9PT0gJyMnXG4gICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGlkKVxuICAgIDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXG4gIGlmICghY2hlY2tMaXN0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYE5vIHZhbGlkYXRpb24gZWxlbWVudCBmb3VuZCB3aXRoIGlkOiBcIiR7aWR9XCJgXG4gICAgKTtcbiAgfVxuXG4gIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcbiAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoJ3ZhbGlkYXRlJykpIHtcbiAgICAgIGNvbnN0IHZhbGlkYXRvck5hbWUgPSBrZXkuc3Vic3RyKCd2YWxpZGF0ZScubGVuZ3RoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgdmFsaWRhdG9yUGF0dGVybiA9IG5ldyBSZWdFeHAoZGF0YVsga2V5IF0pO1xuICAgICAgY29uc3QgdmFsaWRhdG9yU2VsZWN0b3IgPSBgW2RhdGEtdmFsaWRhdG9yPVwiJHt2YWxpZGF0b3JOYW1lfVwiXWA7XG4gICAgICBjb25zdCB2YWxpZGF0b3JDaGVja2JveCA9IGNoZWNrTGlzdC5xdWVyeVNlbGVjdG9yKHZhbGlkYXRvclNlbGVjdG9yKTtcbiAgICAgIGlmICghdmFsaWRhdG9yQ2hlY2tib3gpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBObyB2YWxpZGF0b3IgY2hlY2tib3ggZm91bmQgZm9yOiBcIiR7dmFsaWRhdG9yTmFtZX1cImBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2hlY2tlZCA9IHZhbGlkYXRvclBhdHRlcm4udGVzdChlbC52YWx1ZSk7XG4gICAgICB2YWxpZGF0b3JDaGVja2JveC5jbGFzc0xpc3QudG9nZ2xlKENIRUNLRURfQ0xBU1MsIGNoZWNrZWQpO1xuICAgICAgdmFsaWRhdG9yQ2hlY2tib3guc2V0QXR0cmlidXRlKENIRUNLRUQsIGNoZWNrZWQpO1xuICAgIH1cbiAgfVxufTtcbiJdfQ==
