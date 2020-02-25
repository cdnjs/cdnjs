/**
 * Infinite Ajax Scroll v3.0.0-beta.4
 * Turn your existing pagination into infinite scrolling pages with ease
 *
 * Commercial use requires one-time purchase of a commercial license
 * https://infiniteajaxscroll.com/docs/license.html
 *
 * Copyright 2014-2019 Webcreate (Jeroen Fiege)
 * https://infiniteajaxscroll.com
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.InfiniteAjaxScroll = factory());
}(this, (function () { 'use strict';

	/*! @license is-dom-node v1.0.4

		Copyright 2018 Fisssion LLC.

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.

	*/
	function isDomNode(x) {
		return typeof window.Node === 'object'
			? x instanceof window.Node
			: x !== null &&
					typeof x === 'object' &&
					typeof x.nodeType === 'number' &&
					typeof x.nodeName === 'string'
	}

	/*! @license is-dom-node-list v1.2.1

		Copyright 2018 Fisssion LLC.

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.

	*/

	function isDomNodeList(x) {
		var prototypeToString = Object.prototype.toString.call(x);
		var regex = /^\[object (HTMLCollection|NodeList|Object)\]$/;

		return typeof window.NodeList === 'object'
			? x instanceof window.NodeList
			: x !== null &&
					typeof x === 'object' &&
					typeof x.length === 'number' &&
					regex.test(prototypeToString) &&
					(x.length === 0 || isDomNode(x[0]))
	}

	/*! @license Tealight v0.3.6

		Copyright 2018 Fisssion LLC.

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.

	*/

	function tealight(target, context) {
	  if ( context === void 0 ) { context = document; }

	  if (target instanceof Array) { return target.filter(isDomNode); }
	  if (isDomNode(target)) { return [target]; }
	  if (isDomNodeList(target)) { return Array.prototype.slice.call(target); }
	  if (typeof target === "string") {
	    try {
	      var query = context.querySelectorAll(target);
	      return Array.prototype.slice.call(query);
	    } catch (err) {
	      return [];
	    }
	  }
	  return [];
	}

	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var defineProperty = Object.defineProperty;
	var gOPD = Object.getOwnPropertyDescriptor;

	var isArray = function isArray(arr) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(arr);
		}

		return toStr.call(arr) === '[object Array]';
	};

	var isPlainObject = function isPlainObject(obj) {
		if (!obj || toStr.call(obj) !== '[object Object]') {
			return false;
		}

		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) { /**/ }

		return typeof key === 'undefined' || hasOwn.call(obj, key);
	};

	// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
	var setProperty = function setProperty(target, options) {
		if (defineProperty && options.name === '__proto__') {
			defineProperty(target, options.name, {
				enumerable: true,
				configurable: true,
				value: options.newValue,
				writable: true
			});
		} else {
			target[options.name] = options.newValue;
		}
	};

	// Return undefined instead of __proto__ if '__proto__' is not an own property
	var getProperty = function getProperty(obj, name) {
		if (name === '__proto__') {
			if (!hasOwn.call(obj, name)) {
				return void 0;
			} else if (gOPD) {
				// In early versions of node, obj['__proto__'] is buggy when obj has
				// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
				return gOPD(obj, name).value;
			}
		}

		return obj[name];
	};

	var extend = function extend() {
		var arguments$1 = arguments;

		var options, name, src, copy, copyIsArray, clone;
		var target = arguments[0];
		var i = 1;
		var length = arguments.length;
		var deep = false;

		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}
		if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
			target = {};
		}

		for (; i < length; ++i) {
			options = arguments$1[i];
			// Only deal with non-null/undefined values
			if (options != null) {
				// Extend the base object
				for (name in options) {
					src = getProperty(target, name);
					copy = getProperty(options, name);

					// Prevent never-ending loop
					if (target !== copy) {
						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							setProperty(target, { name: name, newValue: extend(deep, clone, copy) });

						// Don't bring in undefined values
						} else if (typeof copy !== 'undefined') {
							setProperty(target, { name: name, newValue: copy });
						}
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

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
	var now = function() {
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
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
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
	  var type = typeof value;
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
	  return !!value && typeof value == 'object';
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
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
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
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	var lodash_throttle = throttle;

	var defaults = {
	  item: undefined,
	  next: undefined,
	  pagination: undefined,
	  responseType: 'document',
	  bind: true,
	  scrollContainer: window,
	  spinner: false,
	  logger: true,
	  loadOnScroll: true
	};

	var Assert = {
	  singleElement: function singleElement(elementOrSelector, property) {
	    var $element = tealight(elementOrSelector);

	    if ($element.length > 1) {
	      throw new Error(("Expected single element for \"" + property + "\""));
	    }
	    
	    if ($element.length === 0) {
	      throw new Error(("Element \"" + elementOrSelector + "\" not found for \"" + property + "\""));
	    }
	  }
	};

	function getScrollPosition(el) {
	  if (el !== window) {
	    return {
	      x: el.scrollLeft,
	      y: el.scrollTop,
	    };
	  }

	  var supportPageOffset = window.pageXOffset !== undefined;
	  var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

	  return {
	    x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
	    y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
	  };
	}

	function getRootRect(el) {
	  var rootRect;

	  if (el !== window) {
	    rootRect = el.getBoundingClientRect();
	  } else {
	    // Use <html>/<body> instead of window since scroll bars affect size.
	    var html = document.documentElement;
	    var body = document.body;

	    rootRect = {
	      top: 0,
	      left: 0,
	      right: html.clientWidth || body.clientWidth,
	      width: html.clientWidth || body.clientWidth,
	      bottom: html.clientHeight || body.clientHeight,
	      height: html.clientHeight || body.clientHeight
	    };
	  }

	  return rootRect;
	}

	function getDistanceToFold(el, scrollContainer) {
	  var scroll = getScrollPosition(scrollContainer);
	  var rootRect = getRootRect(scrollContainer);
	  var boundingRect = el.getBoundingClientRect();

	  var scrollYBottom = scroll.y + rootRect.height;
	  var bottom = scroll.y + boundingRect.bottom - rootRect.top;

	  return bottom - scrollYBottom;
	}

	// @todo 1) verify that this is NOT shared among multiple instances
	// @todo 2) fill in these values on bind instead of zeroing them all
	var lastScroll = {
	  y: 0,
	  x: 0,
	  deltaY: 0,
	  deltaX: 0
	};

	function calculateScroll(scrollContainer) {
	  var scroll = getScrollPosition(scrollContainer);

	  scroll.deltaY = scroll.y - (lastScroll ? lastScroll.y : scroll.y);
	  scroll.deltaX = scroll.x - (lastScroll ? lastScroll.x : scroll.x);

	  lastScroll = scroll;

	  return scroll;
	}

	function scrollHandler() {
	  var scroll = calculateScroll(this.scrollContainer);

	  this.emitter.emit('scrolled', {scroll: scroll});

	  this.measure();
	}

	function resizeHandler() {
	  var scroll = calculateScroll(this.scrollContainer);

	  this.emitter.emit('resized', {scroll: scroll});

	  this.measure();
	}

	function E () {
	  // Keep this empty so it's easier to inherit from
	  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
	}

	E.prototype = {
	  on: function (name, callback, ctx) {
	    var e = this.e || (this.e = {});

	    (e[name] || (e[name] = [])).push({
	      fn: callback,
	      ctx: ctx
	    });

	    return this;
	  },

	  once: function (name, callback, ctx) {
	    var self = this;
	    function listener () {
	      self.off(name, listener);
	      callback.apply(ctx, arguments);
	    }
	    listener._ = callback;
	    return this.on(name, listener, ctx);
	  },

	  emit: function (name) {
	    var data = [].slice.call(arguments, 1);
	    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
	    var i = 0;
	    var len = evtArr.length;

	    for (i; i < len; i++) {
	      evtArr[i].fn.apply(evtArr[i].ctx, data);
	    }

	    return this;
	  },

	  off: function (name, callback) {
	    var e = this.e || (this.e = {});
	    var evts = e[name];
	    var liveEvents = [];

	    if (evts && callback) {
	      for (var i = 0, len = evts.length; i < len; i++) {
	        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
	          { liveEvents.push(evts[i]); }
	      }
	    }

	    // Remove event from queue to prevent memory leak
	    // Suggested by https://github.com/lazd
	    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

	    (liveEvents.length)
	      ? e[name] = liveEvents
	      : delete e[name];

	    return this;
	  }
	};

	var tinyEmitter = E;
	var TinyEmitter = E;
	tinyEmitter.TinyEmitter = TinyEmitter;

	var lastResponse = document;
	var nextUrl;

	function nextHandler(pageIndex) {
	  var ias = this;

	  var nextEl = tealight(ias.options.next, lastResponse)[0];

	  if (!nextEl) {
	    return;
	  }

	  nextUrl = nextEl.href;

	  return ias.load(nextUrl)
	      .then(function (data) {
	        lastResponse = data.xhr.response;

	        var nextEl = tealight(ias.options.next, lastResponse)[0];

	        return ias.append(data.items)
	            .then(function () {
	              return !!nextEl;
	            });
	      });
	}

	var defaults$1 = {
	  element: undefined,
	  hide: false
	};

	function expand(options) {
	  if (typeof options === 'string') {
	    options = {
	      element: options,
	      hide: true,
	    };
	  } else if (typeof options === 'boolean') {
	    options = {
	      element: undefined,
	      hide: options,
	    };
	  }

	  return options;
	}

	var Pagination = function Pagination(ias, options) {
	  this.options = extend({}, defaults$1, expand(options));

	  if (!this.options.hide) {
	    return;
	  }

	  Assert.singleElement(this.options.element, 'pagination.element');

	  ias.on('binded', this.hide.bind(this));
	  ias.on('unbinded', this.restore.bind(this));
	};

	Pagination.prototype.hide = function hide () {
	  var el = tealight(this.options.element)[0];

	  this.originalDisplayStyle = window.getComputedStyle(el).display;

	  el.style.display = 'none';
	};

	Pagination.prototype.restore = function restore () {
	  var el = tealight(this.options.element)[0];

	  el.style.display = this.originalDisplayStyle;
	};

	var defaults$2 = {
	  element: undefined,
	  delay: 600,
	  show: function (element) {
	    element.style.opacity = '1';
	  },
	  hide: function (element) {
	    element.style.opacity = '0';
	  }
	};

	function expand$1(options) {
	  if (typeof options === 'string') {
	    options = {
	      element: options,
	    };
	  }

	  return options;
	}

	var Spinner = function Spinner(ias, options) {
	  // no spinner wanted
	  if (options === false) {
	    return;
	  }

	  this.ias = ias;
	  this.options = extend({}, defaults$2, expand$1(options));

	  if (this.options.element !== undefined) {
	    Assert.singleElement(this.options.element, 'spinner.element');
	  }

	  this.element = tealight(this.options.element)[0]; // @todo should we really cache this?
	  this.hideFn = this.options.hide;
	  this.showFn = this.options.show;

	  ias.on('binded', this.bind.bind(this));
	  ias.on('binded', this.hide.bind(this));
	};

	Spinner.prototype.bind = function bind () {
	  var startTime, endTime, diff, delay, self = this, ias = this.ias;

	  ias.on('next', function () {
	    startTime = +new Date();

	    self.show();
	  });

	  ias.on('last', function () {
	    self.hide();
	  });

	  // setup delay
	  ias.on('append', function (event) {
	    endTime = +new Date();
	    diff = endTime - startTime;

	    delay = Math.max(0, self.options.delay - diff);

	    // copy original append function
	    var appendFn = event.appendFn;

	    // wrap append function with delay
	    event.appendFn = function (items, parent, last) {
	      return new Promise(function (resolve) {
	        setTimeout(function () {
	          // turn hide function into promise
	          Promise.resolve(self.hide()).then(function () {
	            appendFn(items, parent, last);

	            resolve();
	          });
	        }, delay);
	      });
	    };
	  });
	};

	Spinner.prototype.show = function show () {
	  return Promise.resolve(this.showFn(this.element));
	};

	Spinner.prototype.hide = function hide () {
	  return Promise.resolve(this.hideFn(this.element));
	};

	/* eslint no-console: "off" */

	var defaultLogger = {
	  hit: function () {
	    console.log("Hit scroll threshold");
	  },
	  binded: function () {
	    console.log("Binded event handlers");
	  },
	  unbinded: function () {
	    console.log("Unbinded event handlers");
	  },
	  // scrolled: () => {
	  //   console.log('Scrolled');
	  // },
	  // resized: () => {
	  //   console.log('Resized');
	  // },
	  next: function (event) {
	    console.log(("Next page triggered [pageIndex=" + (event.pageIndex) + "]"));
	  },
	  load: function (event) {
	    console.log(("Start loading " + (event.url)));
	  },
	  loaded: function () {
	    console.log("Finished loading");
	  },
	  append: function () {
	    console.log("Start appending items");
	  },
	  appended: function (event) {
	    console.log(("Finished appending " + (event.items.length) + " item(s)"));
	  },
	  last: function () {
	    console.log("No more pages left to load");
	  },
	  page: function (event) {
	    console.log(("Page changed [pageIndex=" + (event.pageIndex) + "]"));
	  }
	};

	function expand$2(options) {
	  if (options === true) {
	    options = defaultLogger;
	  }

	  return options;
	}

	var Logger = function Logger(ias, options) {
	  // no logger wanted
	  if (options === false) {
	    return;
	  }

	  var logger = expand$2(options);

	  Object.keys(logger).forEach(function (key) {
	    ias.on(key, logger[key]);
	  });
	};

	function getPageBreak(pageBreaks, scrollTop, scrollContainer) {
	  var rootRect = getRootRect(scrollContainer);
	  var scrollBottom = scrollTop + rootRect.height;

	  for (var b = pageBreaks.length - 1; b >= 0; b--) {
	    var bottom = pageBreaks[b].sentinel.getBoundingClientRect().bottom + scrollTop;

	    if (scrollBottom > bottom) {
	      var x = Math.min(b + 1, pageBreaks.length - 1);

	      return pageBreaks[x];
	    }
	  }

	  return pageBreaks[0];
	}

	var Paging = function Paging(ias) {
	  this.ias = ias;
	  this.pageBreaks = [];
	  this.currentPageIndex = ias.pageIndex;
	  this.currentScrollTop = 0;

	  ias.on('binded', this.binded.bind(this));
	  ias.on('next', this.next.bind(this));
	  ias.on('scrolled', this.scrolled.bind(this));
	  ias.on('resized', this.scrolled.bind(this));
	};

	Paging.prototype.binded = function binded () {
	  var sentinel = this.ias.sentinel();
	  if (!sentinel) {
	    return;
	  }

	  this.pageBreaks.push({
	    pageIndex: this.currentPageIndex,
	    url: document.location.toString(),
	    title: document.title,
	    sentinel: this.ias.sentinel()
	  });
	};

	Paging.prototype.next = function next (nextEvent) {
	    var this$1 = this;

	  var url;
	  var title;

	  // @todo can be moved inside appended when eventStack is implemented
	  var loaded = function (event) {
	    url = event.url;

	    if (event.xhr.response) {
	      title = event.xhr.response.title;
	    }
	  };

	  this.ias.once('loaded', loaded);

	  this.ias.once('appended', function () {
	    this$1.pageBreaks.push({
	      pageIndex: nextEvent.pageIndex,
	      url: url,
	      title: title,
	      sentinel: this$1.ias.sentinel()
	    });

	    this$1.update();

	    // @todo can be removed when eventStack is implemented
	    this$1.ias.off('loaded', loaded);
	  });
	};

	Paging.prototype.scrolled = function scrolled (event) {
	  this.update(event.scroll.y);
	};

	Paging.prototype.update = function update (scrollTop) {
	  this.currentScrollTop = scrollTop || this.currentScrollTop;

	  var pageBreak = getPageBreak(this.pageBreaks, this.currentScrollTop, this.ias.scrollContainer);

	  if (pageBreak && pageBreak.pageIndex !== this.currentPageIndex) {
	    this.ias.emitter.emit('page', pageBreak);

	    this.currentPageIndex = pageBreak.pageIndex;
	  }
	};

	function appendFn(items, parent, last) {
	  var sibling = last ? last.nextSibling : null;
	  var insert = document.createDocumentFragment();

	  items.forEach(function (item) {
	    insert.appendChild(item);
	  });

	  parent.insertBefore(insert, sibling);
	}

	var scrollListener;
	var resizeListener;

	var InfiniteAjaxScroll = function InfiniteAjaxScroll(container, options) {
	  var this$1 = this;
	  if ( options === void 0 ) options = {};

	  Assert.singleElement(container, 'container');

	  this.container = tealight(container)[0];
	  this.options = extend({}, defaults, options);
	  this.emitter = new tinyEmitter();
	  this.scrollContainer = this.options.scrollContainer;

	  if (this.options.scrollContainer !== window) {
	    Assert.singleElement(this.options.scrollContainer, 'options.scrollContainer');

	    this.scrollContainer = tealight(this.options.scrollContainer)[0];
	  }

	  this.nextHandler = nextHandler;
	  if (typeof this.options.next === 'function') {
	    this.nextHandler = this.options.next;
	  }

	  this.binded = false;
	  this.paused = false;
	  this.loadOnScroll = this.options.loadOnScroll;
	  this.pageIndex = this.sentinel() ? 0 : -1;
	  this.lastDistance = null;

	  this.on('hit', function () {
	    if (!this$1.loadOnScroll) {
	      return;
	    }

	    this$1.next();
	  });

	  // initialize extensions
	  this.pagination = new Pagination(this, this.options.pagination);
	  this.spinner = new Spinner(this, this.options.spinner);
	  this.logger = new Logger(this, this.options.logger);
	  this.paging = new Paging(this);

	  // @todo review this logic when prefill support is added
	  this.on('binded', this.measure);

	  if (this.options.bind) {
	    // @todo on document.ready? (window.addEventListener('DOMContentLoaded'))
	    this.bind();
	  }
	};

	InfiniteAjaxScroll.prototype.bind = function bind () {
	  if (this.binded) {
	    return;
	  }

	  scrollListener = lodash_throttle(scrollHandler, 200).bind(this);
	  resizeListener = lodash_throttle(resizeHandler, 200).bind(this);

	  this.scrollContainer.addEventListener('scroll', scrollListener);
	  this.scrollContainer.addEventListener('resize', resizeListener);

	  this.binded = true;

	  this.emitter.emit('binded');
	};

	InfiniteAjaxScroll.prototype.unbind = function unbind () {
	  if (!this.binded) {
	    return;
	  }

	  this.scrollContainer.removeEventListener('resize', resizeListener);
	  this.scrollContainer.removeEventListener('scroll', scrollListener);

	  this.binded = false;

	  this.emitter.emit('unbinded');
	};

	InfiniteAjaxScroll.prototype.next = function next () {
	    var this$1 = this;

	  this.pause();

	  var event = {
	    pageIndex: this.pageIndex + 1,
	  };

	  this.emitter.emit('next', event);

	  Promise.resolve(this.nextHandler(event.pageIndex))
	      .then(function (result) {
	        this$1.pageIndex = event.pageIndex;

	        if (!result) {
	          this$1.emitter.emit('last');

	          return;
	        }

	        this$1.resume();
	      })
	  ;
	};

	InfiniteAjaxScroll.prototype.load = function load (url) {
	  var ias = this;

	  return new Promise(function (resolve, reject) {
	    var xhr = new XMLHttpRequest();

	    xhr.onreadystatechange = function() {
	      if (xhr.readyState !== XMLHttpRequest.DONE) {
	        return;
	      }

	      if (xhr.status === 200) {
	        var items = xhr.response;

	        if (ias.options.responseType === 'document') {
	          items = tealight(ias.options.item, xhr.response);
	          // @todo assert there actually are items in the response
	        }

	        ias.emitter.emit('loaded', {items: items, url: url, xhr: xhr});

	        resolve({items: items, url: url, xhr: xhr});
	      } else {
	        // @todo is console.error the best approach?
	        console.error('Request failed');

	        reject(xhr);
	      }
	    };

	    // FIXME: make no-caching configurable
	    // @see https://developer.mozilla.org/nl/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
	    var nocacheUrl = url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();

	    xhr.open('GET', nocacheUrl, true);
	    xhr.responseType = ias.options.responseType;
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

	    // @todo define event variable and pass that around so it can be manipulated

	    ias.emitter.emit('load', {url: url, xhr: xhr});

	    xhr.send();
	  });
	};

	/**
	 * @param {array<Element>} items
	 * @param {Element|null} parent
	 */
	InfiniteAjaxScroll.prototype.append = function append (items, parent) {
	  var ias = this;
	  parent = parent || ias.container;

	  var event = {
	    items: items,
	    parent: parent,
	    appendFn: appendFn
	  };

	  ias.emitter.emit('append', event);

	  var executor = function (resolve) {
	    window.requestAnimationFrame(function () {
	      Promise.resolve(event.appendFn(event.items, event.parent, ias.sentinel())).then(function () {
	        resolve({items: items, parent: parent});
	      });
	    });
	  };

	  return (new Promise(executor)).then(function (event) {
	    ias.emitter.emit('appended', event);
	  });
	};

	InfiniteAjaxScroll.prototype.sentinel = function sentinel () {
	  var items = tealight(this.options.item, this.container);

	  if (!items.length) {
	    return null;
	  }

	  return items[items.length-1];
	};

	InfiniteAjaxScroll.prototype.pause = function pause () {
	  this.paused = true;
	};

	InfiniteAjaxScroll.prototype.resume = function resume () {
	  this.paused = false;

	  this.measure();
	};

	InfiniteAjaxScroll.prototype.enableLoadOnScroll = function enableLoadOnScroll () {
	  this.loadOnScroll = true;
	};

	InfiniteAjaxScroll.prototype.disableLoadOnScroll = function disableLoadOnScroll () {
	  this.loadOnScroll = false;
	};

	InfiniteAjaxScroll.prototype.measure = function measure () {
	  if (this.paused) {
	    return;
	  }

	  var distance = 0;
	  var sentinel = this.sentinel();

	  // @todo review this logic when prefill support is added
	  if (sentinel) {
	    distance = getDistanceToFold(sentinel, this.scrollContainer);
	  }

	  if (distance <= 0 && (this.lastDistance === null || this.lastDistance > 0)) {
	    this.emitter.emit('hit', {distance: distance});
	  }

	  this.lastDistance = distance;
	};

	InfiniteAjaxScroll.prototype.on = function on (event, callback) {
	  this.emitter.on(event, callback, this);

	  if (event === 'binded' && this.binded) {
	    callback.bind(this)();
	  }
	};

	InfiniteAjaxScroll.prototype.off = function off (event, callback) {
	  this.emitter.off(event, callback, this);
	};

	InfiniteAjaxScroll.prototype.once = function once (event, callback) {
	  this.emitter.once(event, callback, this);

	  if (event === 'binded' && this.binded) {
	    callback.bind(this)();
	  }
	};

	return InfiniteAjaxScroll;

})));
