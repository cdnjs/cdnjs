(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.IAS = factory());
}(this, (function () { 'use strict';

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
          liveEvents.push(evts[i]);
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

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

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

var extend = function extend() {
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
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

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
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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
var nativeMax = Math.max;
var nativeMin = Math.min;

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

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function query(elementOrSelector, context) {
  context = context || document;

  if (typeof elementOrSelector !== 'string') {
    return [elementOrSelector];
  }

  var id_sel = elementOrSelector.match(/^#([\w-]*)$/);

  if (id_sel) {
    var elem = context.getElementById(id_sel[1]);

    return elem ? [elem] : [];
  }

  var elements = context.querySelectorAll(elementOrSelector);

  return Array.prototype.slice.call(elements);
}

var elements = function () {
  function elements(_elements) {
    classCallCheck(this, elements);

    this.elements = _elements;
  }

  createClass(elements, [{
    key: 'last',
    value: function last() {
      return this.elements[this.elements.length - 1];
    }
  }, {
    key: 'get',
    value: function get$$1() {
      return this.elements[0];
    }
  }, {
    key: 'all',
    value: function all() {
      return this.elements;
    }
  }]);
  return elements;
}();

function $(elementOrSelector, context) {
  return new elements(query(elementOrSelector, context));
}

// @todo notify about scroll direction?
function scrollHandler() {
  var info = this.measure();

  this.eventEmitter.emit('scrolled', info);
}

var defaults$2 = {
  element: undefined,
  hide: false
};

var Pagination = function () {
  function Pagination(ias, options) {
    classCallCheck(this, Pagination);

    if (typeof options === 'string') {
      options = {
        element: options,
        hide: true
      };
    } else if (typeof options === 'boolean') {
      options = {
        element: '',
        hide: options
      };
    }

    this.options = extend({}, defaults$2, options);

    if (!this.options.hide) {
      return;
    }

    if (!this.options.element || !$(this.options.element).get()) {
      throw new Error('Pagination element "' + this.options.element + '" not found');
    }

    var self = this;

    ias.on('binded', function () {
      self.hide();
    });

    ias.on('unbinded', function () {
      self.restore();
    });
  }

  createClass(Pagination, [{
    key: 'hide',
    value: function hide() {
      var el = $(this.options.element).get();

      this.originalDisplayStyle = window.getComputedStyle(el).display;

      $(this.options.element).get().style.display = 'none';
    }
  }, {
    key: 'restore',
    value: function restore() {
      var el = $(this.options.element).get();

      el.style.display = this.originalDisplayStyle;
    }
  }]);
  return Pagination;
}();

/**
 * Expose `Emitter`.
 */

var emitterComponent = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
var wrappy_1 = wrappy;
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k];
  });

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    var ret = fn.apply(this, args);
    var cb = args[args.length-1];
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k];
      });
    }
    return ret
  }
}

var once_1 = wrappy_1(once);
var strict = wrappy_1(onceStrict);

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  });

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  });
});

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true;
    return f.value = fn.apply(this, arguments)
  };
  f.called = false;
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true;
    return f.value = fn.apply(this, arguments)
  };
  var name = fn.name || 'Function wrapped with `once`';
  f.onceError = name + " shouldn't be called more than once";
  f.called = false;
  return f
}

once_1.strict = strict;

var apprise_1 = apprise;

function apprise(options) {
  var notifications = [];
  var wrapper = document.body.appendChild(
    document.createElement('div')
  );

  options = options || {};

  var top  = !!options.top;
  var left = !!options.left;
  if (options.right) left = false;
  if (options.bottom) top = false;
  if (options.right === false) left = true;
  if (options.bottom === false) top = true;

  wrapper.style.position = 'fixed';
  wrapper.style[left ? 'left' : 'right'] = '0px';
  wrapper.style[top  ? 'top' : 'bottom'] = '0px';

  return add = emitterComponent(add)

  function add(timeout) {
    var div = document.createElement('div');
    var exit = once_1(function() {
      var idx = notifications.indexOf(div);
      if (idx !== -1) notifications.splice(idx, 1);

      add.emit('exit', div);
      update();
    });

    if (timeout) {
      setTimeout(exit, timeout || 1000);
    }

    div.style.position = 'absolute';
    div.style[left ? 'left' : 'right'] = '0px';

    notifications.push(div);
    add.emit('enter', div, exit);
    wrapper.appendChild(div);
    update();

    return div
  }

  function update() {
    var key    = top ? 'top' : 'bottom';
    var y      = 0;

    for (var i = 0; i < notifications.length; i++) {
      var notification = notifications[i];
      var bounds = notification.getBoundingClientRect();
      var style  = getComputedStyle(notification);

      var mtop = parseFloat(style.getPropertyValue('margin-top'));
      var mbot = parseFloat(style.getPropertyValue('margin-bottom'));

      notification.style[key] = y + 'px';
      y += bounds.height;
      y += mbot;
      y += mtop;
    }
  }
}

/**
 * Returns an empty rect object. An empty rect is returned when an element
 * is not in the DOM.
 * @return {Object} The empty rect.
 */
function getEmptyRect() {
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0
  };
}

function getScroll(el) {
  if (el !== window) {
    return {
      x: el.scrollLeft,
      y: el.scrollTop
    };
  }

  var supportPageOffset = window.pageXOffset !== undefined;
  var isCSS1Compat = (document.compatMode || "") === "CSS1Compat";

  var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
  var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

  return {
    x: x,
    y: y
  };
}

/**
 * Shims the native getBoundingClientRect for compatibility with older IE.
 * @param {Element} el The element whose bounding rect to get.
 * @return {Object} The (possibly shimmed) rect of the element.
 */
function getBoundingClientRect(el) {
  var rect;

  try {
    rect = el.getBoundingClientRect();
  } catch (err) {
    // Ignore Windows 7 IE11 "Unspecified error"
    // https://github.com/w3c/IntersectionObserver/pull/205
  }

  if (!rect) return getEmptyRect();

  // Older IE
  if (!(rect.width && rect.height)) {
    rect = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };
  }

  return rect;
}

function getRootRect(el) {
  var rootRect;

  if (el !== window) {
    rootRect = getBoundingClientRect(el);
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

function appriseFactory(options) {
  var notifier = apprise_1(options);

  notifier.on('exit', function (node) {
    node.parentNode.removeChild(node);
  });
  notifier.on('enter', function (node) {
    node.style.backgroundColor = '#eee';
    node.style.borderRadius = '4px';
    node.style.padding = '4px';
    node.style.margin = '10px';
    node.style.opacity = 1;
  });

  return notifier;
}

var DebugPageProgress = function () {
  function DebugPageProgress() {
    classCallCheck(this, DebugPageProgress);

    this.el = document.createElement('div');
    this.distance = 0;

    document.body.appendChild(this.el);
    this.el.style.position = 'fixed';
    this.el.style.backgroundImage = 'linear-gradient(to right, #FA612E, #ED2173)'; //'#F33B4E';
    this.el.opacity = 1;
    this.el.style.zIndex = 9990000;
    this.el.style.top = '0px';
    this.el.style.left = '0px';
    this.el.style.width = '0px';
    this.el.style.height = '3px';
    this.el.style.transition = 'width 0.1s';
  }

  createClass(DebugPageProgress, [{
    key: 'render',
    value: function render() {
      var overlayDebug = this.el;
      overlayDebug.style.width = this.distance + 'px';
    }
  }, {
    key: 'update',
    value: function update(min, max, current) {
      var root = getRootRect(window);
      var percent = (current - min) / (max - min);

      var self = this;
      this.distance = root.width * percent;

      self.render();
    }
  }]);
  return DebugPageProgress;
}();

var Debugger = function () {
  function Debugger(ias) {
    classCallCheck(this, Debugger);

    this.ias = ias;
    this.notifier = appriseFactory({ top: true, right: true });
    this.scrollNotifier = appriseFactory({ bottom: true, right: true });
    this.scrollNode = null;

    this.progress = new DebugPageProgress();
  }

  createClass(Debugger, [{
    key: 'bind',
    value: function bind() {
      var self = this;
      var printEvent = function printEvent(label) {
        return function () {
          var node = self.notifier(3000);

          node.innerHTML = label;
        };
      };

      this.ias.on('init', function () {
        this.lastElement().style.outline = 'solid 2px red';
      });

      this.ias.on('next', printEvent('next'));
      this.ias.on('load', printEvent('load'));
      this.ias.on('loaded', printEvent('loaded'));
      this.ias.on('append', printEvent('append'));
      this.ias.on('appended', printEvent('appended'));

      this.ias.on('append', function () {
        if (!this.lastElement()) {
          return;
        }

        this.lastElement().style.outline = 'none';
      });

      this.ias.on('appended', function () {
        this.lastElement().style.outline = 'solid 2px red';
      });

      this.ias.on('scroll', function (info) {
        this.render(info);
      }.bind(this));
    }
  }, {
    key: 'render',
    value: function render(info) {
      if (!this.scrollNode) this.scrollNode = this.scrollNotifier();

      this.scrollNode.innerHTML = '<pre style="margin:0;">' + JSON.stringify(info, undefined, '  ') + '</pre>';

      this.progress.update(info.rootRect.height, info.bottom, info.scrollYBottom);
    }
  }]);
  return Debugger;
}();

var lastResponse = document;
var nextUrl = void 0;

function nextHandler(pageIndex) {
  var ias = this;

  var nextEl = $(ias.options.next, lastResponse).get();

  if (!nextEl) {
    return;
  }

  nextUrl = nextEl.href;

  return ias.load(nextUrl).then(function (data) {
    lastResponse = data.xhr.response;

    var nextEl = $(ias.options.next, lastResponse).get();
    return ias.append(data.items).then(function () {
      return !!nextEl;
    });
  });
}

var defaults$3 = {
  element: undefined,
  delay: 600,
  show: function show(element) {
    element.style.opacity = 1;
  },
  hide: function hide(element) {
    element.style.opacity = 0;
  }
};

var Spinner = function () {
  function Spinner(ias, options) {
    classCallCheck(this, Spinner);

    // no spinner wanted
    if (options === false) {
      return;
    }

    if (typeof options === 'string') {
      options = {
        element: options
      };
    }

    var self = this;

    self.ias = ias;
    self.options = extend({}, defaults$3, options);
    self.element = $(self.options.element).get(); // @todo should we really cache this?
    self.hideFn = self.options.hide;
    self.showFn = self.options.show;

    if (!self.element) {
      throw new Error('Element "' + self.options.element + '" not found');
    }

    ias.on('binded', self.bind.bind(self));
  }

  createClass(Spinner, [{
    key: 'bind',
    value: function bind() {
      var startTime = void 0,
          endTime = void 0,
          diff = void 0,
          delay = void 0,
          self = this;

      self.ias.on('next', function () {
        startTime = +new Date();

        self.show();
      });

      // setup delay
      self.ias.on('append', function (event) {
        endTime = +new Date();
        diff = endTime - startTime;

        delay = Math.max(0, self.options.delay - diff);

        // original executor
        var executor = event.executor;

        // wrap executor with delay
        event.executor = function (resolve) {
          setTimeout(function () {
            // turn hide function into promise
            Promise.resolve(self.hide()).then(function () {
              executor(resolve);
            });
          }, delay);
        };
      });

      self.hide();
    }
  }, {
    key: 'show',
    value: function show() {
      return Promise.resolve(this.showFn(this.element));
    }
  }, {
    key: 'hide',
    value: function hide() {
      return Promise.resolve(this.hideFn(this.element));
    }
  }]);
  return Spinner;
}();

var defaults = {
  item: '',
  pagination: {},
  next: '',
  responseType: 'document',
  bind: true,
  scrollContainer: window,
  spinner: false
};

var loggers = {
  hit: function hit() {
    console.log('Hit scroll threshold');
  },
  binded: function binded() {
    console.log('Binded event handlers');
  },
  unbinded: function unbinded() {
    console.log('Unbinded event handlers');
  },
  // scrolled: function() {
  //   console.log('Scrolled');
  // },
  next: function next(event) {
    console.log('Next page triggered [pageIndex=' + event.pageIndex + ']');
  },
  load: function load(url, xhr) {
    console.log('Start loading ' + url);
  },
  loaded: function loaded(url, xhr) {
    console.log('Finished loading');
  },
  append: function append() {
    console.log('Start appending new items');
  },
  appended: function appended() {
    console.log('Finished appending new items');
  },
  noneLeft: function noneLeft() {
    console.log('No more pages left to load');
  }
};

var scrollListener = void 0;
var resizeListener = void 0;

var IAS = function () {
  function IAS(container, options) {
    var _this = this;

    classCallCheck(this, IAS);

    this.eventEmitter = new tinyEmitter();
    this.options = extend({}, defaults, options);

    Object.keys(loggers).forEach(function (key) {
      _this.on(key, loggers[key]);
    });

    this.container = $(container).get();
    this.scrollContainer = $(this.options.scrollContainer).get();

    if (!this.scrollContainer) {
      throw new Error('Scroll container ' + scrollContainer + ' not found');
    }

    this.pagination = new Pagination(this, this.options.pagination);
    this.spinner = new Spinner(this, this.options.spinner);

    this.nextHandler = nextHandler;
    if (typeof this.options.next === 'function') {
      this.nextHandler = this.options.next;
    }

    this.pageIndex = 0;

    this.on('hit', this.next); // @todo find better name?

    if (this.options.bind) {
      // @todo on document.ready?
      this.bind();
    }
  }

  createClass(IAS, [{
    key: 'bind',
    value: function bind() {
      scrollListener = lodash_throttle(scrollHandler, 200).bind(this);
      resizeListener = lodash_throttle(this.measure, 200).bind(this);

      this.scrollContainer.addEventListener('scroll', scrollListener);
      this.scrollContainer.addEventListener('resize', resizeListener);

      this.eventEmitter.emit('binded');

      this.measure();
    }
  }, {
    key: 'unbind',
    value: function unbind() {
      this.scrollContainer.removeEventListener('scroll', scrollListener);
      this.scrollContainer.removeEventListener('resize', resizeListener);

      this.eventEmitter.emit('unbinded');
    }
  }, {
    key: 'next',
    value: function next() {
      var _this2 = this;

      this.pause();

      var event = {
        pageIndex: this.pageIndex
      };

      this.eventEmitter.emit('next', event);

      Promise.resolve(this.nextHandler(event.pageIndex)).then(function (result) {
        if (!result) {
          _this2.eventEmitter.emit('noneLeft');

          return;
        }

        _this2.pageIndex++;
        _this2.resume();
      });
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.paused = true;
    }
  }, {
    key: 'resume',
    value: function resume() {
      this.paused = false;

      this.measure();
    }
  }, {
    key: 'load',
    value: function load(url) {
      var ias = this;

      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              var items = [];

              if (ias.options.responseType === 'document') {
                items = $(ias.options.item, xhr.response).all();
              }

              // @todo define event variable and pass that around

              ias.eventEmitter.emit('loaded', items, url, xhr);

              resolve({ items: items, url: url, xhr: xhr });
            } else {
              console.error('Request failed');

              reject(xhr);
            }
          }
        };

        // FIXME: make no-caching configurable
        // @see https://developer.mozilla.org/nl/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
        url = url + (/\?/.test(url) ? "&" : "?") + new Date().getTime();

        xhr.open('GET', url, true);
        xhr.responseType = ias.options.responseType;
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        ias.eventEmitter.emit('load', url, xhr);

        xhr.send();
      });
    }

    /**
     * @param {array<Element>} items
     * @param {Element|null} parent
     */

  }, {
    key: 'append',
    value: function append(items, parent) {
      var ias = this;

      // @todo move fragment creation into executor?
      var insert = document.createDocumentFragment();

      items.forEach(function (item) {
        insert.appendChild(item);
      });

      var executor = function executor(resolve) {
        window.requestAnimationFrame(function () {
          var last = ias.lastElement();
          parent = parent || ias.container;
          var sibling = last ? last.nextSibling : null;

          parent.insertBefore(insert, sibling);

          resolve({ items: items, parent: parent });

          ias.eventEmitter.emit('appended', items, parent);
        });
      };

      var event = {
        items: items,
        parent: parent,
        executor: executor
      };

      ias.eventEmitter.emit('append', event);

      return new Promise(event.executor);
    }
  }, {
    key: 'lastElement',
    value: function lastElement() {
      return $(this.options.item, this.container).last();
    }
  }, {
    key: 'measure',
    value: function measure() {
      var scroll = getScroll(this.scrollContainer);
      var rootRect = getRootRect(this.scrollContainer);
      var boundingRect = getBoundingClientRect(this.lastElement());

      var scrollYBottom = scroll.y + rootRect.height;
      var bottom = scroll.y + boundingRect.bottom - rootRect.top;

      var info = {
        scroll: scroll,
        rootRect: rootRect,
        boundingRect: boundingRect,

        scrollYBottom: scrollYBottom,
        bottom: bottom,
        distanceToFold: bottom - scrollYBottom
      };

      if (!this.paused && info.distanceToFold <= 0) {
        this.eventEmitter.emit('hit', info); // @todo review values
      }
    }
  }, {
    key: 'on',
    value: function on(event, callback) {
      this.eventEmitter.on(event, callback.bind(this));
    }
  }, {
    key: 'off',
    value: function off(event, callback) {
      this.eventEmitter.off(event, callback.bind(this));
    }
  }, {
    key: 'once',
    value: function once(event, callback) {
      this.eventEmitter.once(event, callback.bind(this));
    }
  }, {
    key: 'debug',
    value: function debug() {
      this.debugger = new Debugger(this).bind();
    }
  }]);
  return IAS;
}();

return IAS;

})));
