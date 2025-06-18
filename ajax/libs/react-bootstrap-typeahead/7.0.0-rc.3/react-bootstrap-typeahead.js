(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactBootstrapTypeahead = {}, global.React, global.ReactDOM));
})(this, (function (exports, React, ReactDOM) { 'use strict';

  function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n.default = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);
  var ReactDOM__namespace = /*#__PURE__*/_interopNamespaceDefault(ReactDOM);

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[r] = t, e;
  }
  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = true,
        o = false;
      try {
        if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = true, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o,
      r,
      i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
  }
  function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
      if (-1 !== e.indexOf(n)) continue;
      t[n] = r[n];
    }
    return t;
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (undefined !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : undefined;
    }
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  /**
   * lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  var lodash_debounce;
  var hasRequiredLodash_debounce;

  function requireLodash_debounce () {
  	if (hasRequiredLodash_debounce) return lodash_debounce;
  	hasRequiredLodash_debounce = 1;
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

  	lodash_debounce = debounce;
  	return lodash_debounce;
  }

  var lodash_debounceExports = requireLodash_debounce();
  var debounce = /*@__PURE__*/getDefaultExportFromCjs(lodash_debounceExports);

  /**
   * Returns a function that triggers a component update. the hook equivalent to
   * `this.forceUpdate()` in a class component. In most cases using a state value directly
   * is preferable but may be required in some advanced usages of refs for interop or
   * when direct DOM manipulation is required.
   *
   * ```ts
   * const forceUpdate = useForceUpdate();
   *
   * const updateOnClick = useCallback(() => {
   *  forceUpdate()
   * }, [forceUpdate])
   *
   * return <button type="button" onClick={updateOnClick}>Hi there</button>
   * ```
   */
  function useForceUpdate() {
    // The toggling state value is designed to defeat React optimizations for skipping
    // updates when they are strictly equal to the last state value
    const [, dispatch] = React.useReducer(revision => revision + 1, 0);
    return dispatch;
  }

  /**
   * Store the last of some value. Tracked via a `Ref` only updating it
   * after the component renders.
   *
   * Helpful if you need to compare a prop value to it's previous value during render.
   *
   * ```ts
   * function Component(props) {
   *   const lastProps = usePrevious(props)
   *
   *   if (lastProps.foo !== props.foo)
   *     resetValueFromProps(props.foo)
   * }
   * ```
   *
   * @param value the value to track
   */
  function usePrevious(value) {
    const ref = React.useRef(null);
    React.useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var invariant_1;
  var hasRequiredInvariant;

  function requireInvariant () {
  	if (hasRequiredInvariant) return invariant_1;
  	hasRequiredInvariant = 1;

  	var invariant = function(condition, format, a, b, c, d, e, f) {
  	  {
  	    if (format === undefined) {
  	      throw new Error('invariant requires an error message argument');
  	    }
  	  }

  	  if (!condition) {
  	    var error;
  	    if (format === undefined) {
  	      error = new Error(
  	        'Minified exception occurred; use the non-minified dev environment ' +
  	        'for the full error message and additional helpful warnings.'
  	      );
  	    } else {
  	      var args = [a, b, c, d, e, f];
  	      var argIndex = 0;
  	      error = new Error(
  	        format.replace(/%s/g, function() { return args[argIndex++]; })
  	      );
  	      error.name = 'Invariant Violation';
  	    }

  	    error.framesToPop = 1; // we don't care about invariant's own frame
  	    throw error;
  	  }
  	};

  	invariant_1 = invariant;
  	return invariant_1;
  }

  var invariantExports = requireInvariant();
  var invariant = /*@__PURE__*/getDefaultExportFromCjs(invariantExports);

  var DEFAULT_LABELKEY = 'label';

  function getStringLabelKey(labelKey) {
    return typeof labelKey === 'string' ? labelKey : DEFAULT_LABELKEY;
  }

  /**
   * Check if an object has the given property in a type-safe way.
   */
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  var idCounter = 0;

  // eslint-disable-next-line @typescript-eslint/ban-types
  function isFunction(value) {
    return typeof value === 'function';
  }
  function isString(value) {
    return typeof value === 'string';
  }
  function noop() {}
  function uniqueId(prefix) {
    idCounter += 1;
    return (String(prefix)) + idCounter;
  }

  /**
   * Retrieves the display string from an option. Options can be the string
   * themselves, or an object with a defined display string. Anything else throws
   * an error.
   */
  function getOptionLabel(option, labelKey) {
    // Handle internally created options first.
    if (!isString(option) && (hasOwnProperty(option, 'paginationOption') || hasOwnProperty(option, 'customOption'))) {
      return option[getStringLabelKey(labelKey)];
    }
    var optionLabel;
    if (isFunction(labelKey)) {
      optionLabel = labelKey(option);
    } else if (isString(option)) {
      optionLabel = option;
    } else {
      // `option` is an object and `labelKey` is a string.
      optionLabel = option[labelKey];
    }
    !isString(optionLabel) ? invariant(false, 'One or more options does not have a valid label string. Check the ' + '`labelKey` prop to ensure that it matches the correct option key and ' + 'provides a string for filtering and display.')  : undefined;
    return optionLabel;
  }

  var _excluded$i = ["allowNew", "labelKey"];
  function addCustomOption(results, _ref) {
    var allowNew = _ref.allowNew,
      labelKey = _ref.labelKey,
      state = _objectWithoutProperties(_ref, _excluded$i);
    if (!allowNew || !state.text.trim()) {
      return false;
    }

    // If the consumer has provided a callback, use that to determine whether or
    // not to add the custom option.
    if (isFunction(allowNew)) {
      return allowNew(results, state);
    }

    // By default, don't add the custom option if there is an exact text match
    // with an existing option.
    return !results.some(function (o) {
      return getOptionLabel(o, labelKey) === state.text;
    });
  }

  var fastDeepEqual;
  var hasRequiredFastDeepEqual;

  function requireFastDeepEqual () {
  	if (hasRequiredFastDeepEqual) return fastDeepEqual;
  	hasRequiredFastDeepEqual = 1;

  	// do not edit .js files directly - edit src/index.jst



  	fastDeepEqual = function equal(a, b) {
  	  if (a === b) return true;

  	  if (a && b && typeof a == 'object' && typeof b == 'object') {
  	    if (a.constructor !== b.constructor) return false;

  	    var length, i, keys;
  	    if (Array.isArray(a)) {
  	      length = a.length;
  	      if (length != b.length) return false;
  	      for (i = length; i-- !== 0;)
  	        if (!equal(a[i], b[i])) return false;
  	      return true;
  	    }



  	    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
  	    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
  	    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

  	    keys = Object.keys(a);
  	    length = keys.length;
  	    if (length !== Object.keys(b).length) return false;

  	    for (i = length; i-- !== 0;)
  	      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

  	    for (i = length; i-- !== 0;) {
  	      var key = keys[i];

  	      if (!equal(a[key], b[key])) return false;
  	    }

  	    return true;
  	  }

  	  // true if both NaN, false otherwise
  	  return a!==a && b!==b;
  	};
  	return fastDeepEqual;
  }

  var fastDeepEqualExports = requireFastDeepEqual();
  var isEqual = /*@__PURE__*/getDefaultExportFromCjs(fastDeepEqualExports);

  function getOptionProperty(option, key) {
    if (isString(option)) {
      return undefined;
    }
    return option[key];
  }

  // prettier-ignore

  var map = [{
    base: 'A',
    letters: "A\u24B6\uFF21\xC0\xC1\xC2\u1EA6\u1EA4\u1EAA\u1EA8\xC3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\xC4\u01DE\u1EA2\xC5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F"
  }, {
    base: 'AA',
    letters: "\uA732"
  }, {
    base: 'AE',
    letters: "\xC6\u01FC\u01E2"
  }, {
    base: 'AO',
    letters: "\uA734"
  }, {
    base: 'AU',
    letters: "\uA736"
  }, {
    base: 'AV',
    letters: "\uA738\uA73A"
  }, {
    base: 'AY',
    letters: "\uA73C"
  }, {
    base: 'B',
    letters: "B\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181"
  }, {
    base: 'C',
    letters: "C\u24B8\uFF23\u0106\u0108\u010A\u010C\xC7\u1E08\u0187\u023B\uA73E"
  }, {
    base: 'D',
    letters: "D\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779\xD0"
  }, {
    base: 'DZ',
    letters: "\u01F1\u01C4"
  }, {
    base: 'Dz',
    letters: "\u01F2\u01C5"
  }, {
    base: 'E',
    letters: "E\u24BA\uFF25\xC8\xC9\xCA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\xCB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E"
  }, {
    base: 'F',
    letters: "F\u24BB\uFF26\u1E1E\u0191\uA77B"
  }, {
    base: 'G',
    letters: "G\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E"
  }, {
    base: 'H',
    letters: "H\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D"
  }, {
    base: 'I',
    letters: "I\u24BE\uFF29\xCC\xCD\xCE\u0128\u012A\u012C\u0130\xCF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197"
  }, {
    base: 'J',
    letters: "J\u24BF\uFF2A\u0134\u0248"
  }, {
    base: 'K',
    letters: "K\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2"
  }, {
    base: 'L',
    letters: "L\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780"
  }, {
    base: 'LJ',
    letters: "\u01C7"
  }, {
    base: 'Lj',
    letters: "\u01C8"
  }, {
    base: 'M',
    letters: "M\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C"
  }, {
    base: 'N',
    letters: "N\u24C3\uFF2E\u01F8\u0143\xD1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4"
  }, {
    base: 'NJ',
    letters: "\u01CA"
  }, {
    base: 'Nj',
    letters: "\u01CB"
  }, {
    base: 'O',
    letters: "O\u24C4\uFF2F\xD2\xD3\xD4\u1ED2\u1ED0\u1ED6\u1ED4\xD5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\xD6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\xD8\u01FE\u0186\u019F\uA74A\uA74C"
  }, {
    base: 'OI',
    letters: "\u01A2"
  }, {
    base: 'OO',
    letters: "\uA74E"
  }, {
    base: 'OU',
    letters: "\u0222"
  }, {
    base: 'OE',
    letters: "\x8C\u0152"
  }, {
    base: 'oe',
    letters: "\x9C\u0153"
  }, {
    base: 'P',
    letters: "P\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754"
  }, {
    base: 'Q',
    letters: "Q\u24C6\uFF31\uA756\uA758\u024A"
  }, {
    base: 'R',
    letters: "R\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782"
  }, {
    base: 'S',
    letters: "S\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784"
  }, {
    base: 'T',
    letters: "T\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786"
  }, {
    base: 'TZ',
    letters: "\uA728"
  }, {
    base: 'U',
    letters: "U\u24CA\uFF35\xD9\xDA\xDB\u0168\u1E78\u016A\u1E7A\u016C\xDC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244"
  }, {
    base: 'V',
    letters: "V\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245"
  }, {
    base: 'VY',
    letters: "\uA760"
  }, {
    base: 'W',
    letters: "W\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72"
  }, {
    base: 'X',
    letters: "X\u24CD\uFF38\u1E8A\u1E8C"
  }, {
    base: 'Y',
    letters: "Y\u24CE\uFF39\u1EF2\xDD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE"
  }, {
    base: 'Z',
    letters: "Z\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762"
  }, {
    base: 'a',
    letters: "a\u24D0\uFF41\u1E9A\xE0\xE1\xE2\u1EA7\u1EA5\u1EAB\u1EA9\xE3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\xE4\u01DF\u1EA3\xE5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250"
  }, {
    base: 'aa',
    letters: "\uA733"
  }, {
    base: 'ae',
    letters: "\xE6\u01FD\u01E3"
  }, {
    base: 'ao',
    letters: "\uA735"
  }, {
    base: 'au',
    letters: "\uA737"
  }, {
    base: 'av',
    letters: "\uA739\uA73B"
  }, {
    base: 'ay',
    letters: "\uA73D"
  }, {
    base: 'b',
    letters: "b\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253"
  }, {
    base: 'c',
    letters: "c\u24D2\uFF43\u0107\u0109\u010B\u010D\xE7\u1E09\u0188\u023C\uA73F\u2184"
  }, {
    base: 'd',
    letters: "d\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A"
  }, {
    base: 'dz',
    letters: "\u01F3\u01C6"
  }, {
    base: 'e',
    letters: "e\u24D4\uFF45\xE8\xE9\xEA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\xEB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD"
  }, {
    base: 'f',
    letters: "f\u24D5\uFF46\u1E1F\u0192\uA77C"
  }, {
    base: 'g',
    letters: "g\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F"
  }, {
    base: 'h',
    letters: "h\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265"
  }, {
    base: 'hv',
    letters: "\u0195"
  }, {
    base: 'i',
    letters: "i\u24D8\uFF49\xEC\xED\xEE\u0129\u012B\u012D\xEF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131"
  }, {
    base: 'j',
    letters: "j\u24D9\uFF4A\u0135\u01F0\u0249"
  }, {
    base: 'k',
    letters: "k\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3"
  }, {
    base: 'l',
    letters: "l\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747"
  }, {
    base: 'lj',
    letters: "\u01C9"
  }, {
    base: 'm',
    letters: "m\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F"
  }, {
    base: 'n',
    letters: "n\u24DD\uFF4E\u01F9\u0144\xF1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5"
  }, {
    base: 'nj',
    letters: "\u01CC"
  }, {
    base: 'o',
    letters: "o\u24DE\uFF4F\xF2\xF3\xF4\u1ED3\u1ED1\u1ED7\u1ED5\xF5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\xF6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\xF8\u01FF\u0254\uA74B\uA74D\u0275"
  }, {
    base: 'oi',
    letters: "\u01A3"
  }, {
    base: 'ou',
    letters: "\u0223"
  }, {
    base: 'oo',
    letters: "\uA74F"
  }, {
    base: 'p',
    letters: "p\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755"
  }, {
    base: 'q',
    letters: "q\u24E0\uFF51\u024B\uA757\uA759"
  }, {
    base: 'r',
    letters: "r\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783"
  }, {
    base: 's',
    letters: "s\u24E2\uFF53\xDF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B"
  }, {
    base: 't',
    letters: "t\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787"
  }, {
    base: 'tz',
    letters: "\uA729"
  }, {
    base: 'u',
    letters: "u\u24E4\uFF55\xF9\xFA\xFB\u0169\u1E79\u016B\u1E7B\u016D\xFC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289"
  }, {
    base: 'v',
    letters: "v\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C"
  }, {
    base: 'vy',
    letters: "\uA761"
  }, {
    base: 'w',
    letters: "w\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73"
  }, {
    base: 'x',
    letters: "x\u24E7\uFF58\u1E8B\u1E8D"
  }, {
    base: 'y',
    letters: "y\u24E8\uFF59\u1EF3\xFD\u0177\u1EF9\u0233\u1E8F\xFF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF"
  }, {
    base: 'z',
    letters: "z\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763"
  }].reduce(function (acc, _ref) {
    var base = _ref.base,
      letters = _ref.letters;
    letters.split('').forEach(function (letter) {
      acc[letter] = base;
    });
    return acc;
  }, {});

  // Combining marks
  var latin = "\u0300-\u036F";
  var japanese = "\u3099\u309A";
  function stripDiacritics(str) {
    return str.normalize('NFD')
    // Remove combining diacritics
    .replace(new RegExp("[".concat(latin).concat(japanese, "]"), 'g'), '')
    /* eslint-disable-next-line no-control-regex */.replace(/[^\u0000-\u007E]/g, function (a) {
      return map[a] || a;
    });
  }

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var warning_1;
  var hasRequiredWarning;

  function requireWarning () {
  	if (hasRequiredWarning) return warning_1;
  	hasRequiredWarning = 1;

  	var warning = function() {};

  	{
  	  var printWarning = function printWarning(format, args) {
  	    var len = arguments.length;
  	    args = new Array(len > 1 ? len - 1 : 0);
  	    for (var key = 1; key < len; key++) {
  	      args[key - 1] = arguments[key];
  	    }
  	    var argIndex = 0;
  	    var message = 'Warning: ' +
  	      format.replace(/%s/g, function() {
  	        return args[argIndex++];
  	      });
  	    if (typeof console !== 'undefined') {
  	      console.error(message);
  	    }
  	    try {
  	      // --- Welcome to debugging React ---
  	      // This error was thrown as a convenience so that you can use this stack
  	      // to find the callsite that caused this warning to fire.
  	      throw new Error(message);
  	    } catch (x) {}
  	  };

  	  warning = function(condition, format, args) {
  	    var len = arguments.length;
  	    args = new Array(len > 2 ? len - 2 : 0);
  	    for (var key = 2; key < len; key++) {
  	      args[key - 2] = arguments[key];
  	    }
  	    if (format === undefined) {
  	      throw new Error(
  	          '`warning(condition, format, ...args)` requires a warning ' +
  	          'message argument'
  	      );
  	    }
  	    if (!condition) {
  	      printWarning.apply(null, [format].concat(args));
  	    }
  	  };
  	}

  	warning_1 = warning;
  	return warning_1;
  }

  var warningExports = requireWarning();
  var warning = /*@__PURE__*/getDefaultExportFromCjs(warningExports);

  var warned = {};

  /**
   * Copied from: https://github.com/ReactTraining/react-router/blob/master/modules/routerWarning.js
   */
  function warn(falseToWarn, message) {
    // Only issue deprecation warnings once.
    if (!falseToWarn && message.indexOf('deprecated') !== -1) {
      if (warned[message]) {
        return;
      }
      warned[message] = true;
    }
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    warning.apply(undefined, [falseToWarn, "[react-bootstrap-typeahead] ".concat(message)].concat(args));
  }

  function isMatch(input, string, props) {
    var searchStr = input;
    var str = string;
    if (!props.caseSensitive) {
      searchStr = searchStr.toLowerCase();
      str = str.toLowerCase();
    }
    if (props.ignoreDiacritics) {
      searchStr = stripDiacritics(searchStr);
      str = stripDiacritics(str);
    }
    return str.indexOf(searchStr) !== -1;
  }

  /**
   * Default algorithm for filtering results.
   */
  function defaultFilterBy(option, props) {
    var filterBy = props.filterBy,
      labelKey = props.labelKey,
      multiple = props.multiple,
      selected = props.selected,
      text = props.text;

    // Don't show selected options in the menu for the multi-select case.
    if (multiple && selected.some(function (o) {
      return isEqual(o, option);
    })) {
      return false;
    }
    if (isFunction(labelKey)) {
      return isMatch(text, labelKey(option), props);
    }
    var fields = filterBy.slice();
    if (isString(labelKey)) {
      // Add the `labelKey` field to the list of fields if it isn't already there.
      if (fields.indexOf(labelKey) === -1) {
        fields.unshift(labelKey);
      }
    }
    if (isString(option)) {
      warn(fields.length <= 1, 'You cannot filter by properties when `option` is a string.');
      return isMatch(text, option, props);
    }
    return fields.some(function (field) {
      var value = getOptionProperty(option, field);
      if (!isString(value)) {
        warn(false, 'Fields passed to `filterBy` should have string values. Value will ' + 'be converted to a string; results may be unexpected.');
        value = String(value);
      }
      return isMatch(text, value, props);
    });
  }

  /**
   * Check if an input type is selectable, based on WHATWG spec.
   *
   * See:
   *  - https://stackoverflow.com/questions/21177489/selectionstart-selectionend-on-input-type-number-no-longer-allowed-in-chrome/24175357
   *  - https://html.spec.whatwg.org/multipage/input.html#do-not-apply
   */
  function isSelectable(inputNode) {
    return inputNode.selectionStart != null;
  }

  function defaultSelectHint(e, selectHint) {
    var shouldSelectHint = false;
    if (e.key === 'ArrowRight') {
      // For selectable input types ("text", "search"), only select the hint if
      // it's at the end of the input value. For non-selectable types ("email",
      // "number"), always select the hint.
      shouldSelectHint = isSelectable(e.currentTarget) ? e.currentTarget.selectionStart === e.currentTarget.value.length : true;
    }
    if (e.key === 'Tab') {
      // Prevent input from blurring on TAB.
      e.preventDefault();
      shouldSelectHint = true;
    }
    return selectHint ? selectHint(shouldSelectHint, e) : shouldSelectHint;
  }

  var CASE_INSENSITIVE = 'i';
  var COMBINING_MARKS = /[\u0300-\u036F]/;
  // Export for testing.
  function escapeStringRegexp(str) {
    !(typeof str === 'string') ? invariant(false, '`escapeStringRegexp` expected a string.')  : undefined;

    // Escape characters with special meaning either inside or outside character
    // sets. Use a simple backslash escape when it’s always valid, and a \unnnn
    // escape when the simpler form would be disallowed by Unicode patterns’
    // stricter grammar.
    return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
  }
  function getMatchBounds(subject, str) {
    var search = new RegExp(escapeStringRegexp(stripDiacritics(str)), CASE_INSENSITIVE);
    var matches = search.exec(stripDiacritics(subject));
    if (!matches) {
      return null;
    }
    var start = matches.index;
    var matchLength = matches[0].length;

    // Account for combining marks, which changes the indices.
    if (COMBINING_MARKS.test(subject)) {
      // Starting at the beginning of the subject string, check for the number of
      // combining marks and increment the start index whenever one is found.
      for (var ii = 0; ii <= start; ii++) {
        if (COMBINING_MARKS.test(subject[ii])) {
          start += 1;
        }
      }

      // Similarly, increment the length of the match string if it contains a
      // combining mark.
      for (var _ii = start; _ii <= start + matchLength; _ii++) {
        if (COMBINING_MARKS.test(subject[_ii])) {
          matchLength += 1;
        }
      }
    }
    return {
      end: start + matchLength,
      start: start
    };
  }

  function getHintText(_ref) {
    var activeIndex = _ref.activeIndex,
      initialItem = _ref.initialItem,
      isFocused = _ref.isFocused,
      isMenuShown = _ref.isMenuShown,
      labelKey = _ref.labelKey,
      multiple = _ref.multiple,
      selected = _ref.selected,
      text = _ref.text;
    // Don't display a hint under the following conditions:
    if (
    // No text entered.
    !text ||
    // The input is not focused.
    !isFocused ||
    // The menu is hidden.
    !isMenuShown ||
    // No item in the menu.
    !initialItem ||
    // The initial item is a custom option.
    !isString(initialItem) && hasOwnProperty(initialItem, 'customOption') ||
    // The initial item is disabled
    !isString(initialItem) && initialItem.disabled ||
    // One of the menu items is active.
    activeIndex > -1 ||
    // There's already a selection in single-select mode.
    !!selected.length && !multiple) {
      return '';
    }
    var initialItemStr = getOptionLabel(initialItem, labelKey);
    var bounds = getMatchBounds(initialItemStr.toLowerCase(), text.toLowerCase());
    if (!(bounds && bounds.start === 0)) {
      return '';
    }

    // Text matching is case- and accent-insensitive, so to display the hint
    // correctly, splice the input string with the hint string.
    return text + initialItemStr.slice(bounds.end, initialItemStr.length);
  }

  var classnames = {exports: {}};

  /*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  */

  var hasRequiredClassnames;

  function requireClassnames () {
  	if (hasRequiredClassnames) return classnames.exports;
  	hasRequiredClassnames = 1;
  	(function (module) {
  		/* global define */

  		(function () {

  			var hasOwn = {}.hasOwnProperty;

  			function classNames () {
  				var classes = '';

  				for (var i = 0; i < arguments.length; i++) {
  					var arg = arguments[i];
  					if (arg) {
  						classes = appendClass(classes, parseValue(arg));
  					}
  				}

  				return classes;
  			}

  			function parseValue (arg) {
  				if (typeof arg === 'string' || typeof arg === 'number') {
  					return arg;
  				}

  				if (typeof arg !== 'object') {
  					return '';
  				}

  				if (Array.isArray(arg)) {
  					return classNames.apply(null, arg);
  				}

  				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
  					return arg.toString();
  				}

  				var classes = '';

  				for (var key in arg) {
  					if (hasOwn.call(arg, key) && arg[key]) {
  						classes = appendClass(classes, key);
  					}
  				}

  				return classes;
  			}

  			function appendClass (value, newClass) {
  				if (!newClass) {
  					return value;
  				}
  			
  				if (value) {
  					return value + ' ' + newClass;
  				}
  			
  				return value + newClass;
  			}

  			if (module.exports) {
  				classNames.default = classNames;
  				module.exports = classNames;
  			} else {
  				window.classNames = classNames;
  			}
  		}()); 
  	} (classnames));
  	return classnames.exports;
  }

  var classnamesExports = requireClassnames();
  var cx = /*@__PURE__*/getDefaultExportFromCjs(classnamesExports);

  function getMenuItemId() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var position = arguments.length > 1 ? arguments[1] : undefined;
    return "".concat(id, "-item-").concat(position);
  }

  var _excluded$h = ["activeIndex", "id", "isFocused", "isMenuShown", "multiple", "onClick", "onFocus"],
    _excluded2$1 = ["className"];
  var getInputProps = function getInputProps(_ref) {
    var activeIndex = _ref.activeIndex,
      id = _ref.id,
      isFocused = _ref.isFocused,
      isMenuShown = _ref.isMenuShown,
      multiple = _ref.multiple,
      onClick = _ref.onClick,
      onFocus = _ref.onFocus,
      props = _objectWithoutProperties(_ref, _excluded$h);
    return function () {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        className = _ref2.className,
        inputProps = _objectWithoutProperties(_ref2, _excluded2$1);
      return _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({
        // These props can be overridden by values in `inputProps`.
        autoComplete: 'off',
        type: 'text'
      }, inputProps), props), {}, {
        'aria-activedescendant': activeIndex >= 0 ? getMenuItemId(id, activeIndex) : undefined,
        'aria-autocomplete': 'both',
        'aria-expanded': isMenuShown,
        'aria-haspopup': 'listbox',
        'aria-multiselectable': multiple || undefined,
        'aria-owns': isMenuShown ? id : undefined,
        className: cx(_defineProperty(_defineProperty({}, className || '', !multiple), "focus", isFocused))
      }, multiple && {
        inputClassName: className
      }), {}, {
        onClick: onClick,
        onFocus: onFocus,
        role: 'combobox'
      });
    };
  };

  function getInputText(props) {
    var activeItem = props.activeItem,
      labelKey = props.labelKey,
      multiple = props.multiple,
      selected = props.selected,
      text = props.text;
    if (activeItem) {
      // Display the input value if the pagination item is active.
      return getOptionLabel(activeItem, labelKey);
    }
    if (!multiple && selected.length && selected[0]) {
      return getOptionLabel(selected[0], labelKey);
    }
    return text;
  }

  function getIsOnlyResult(props) {
    var allowNew = props.allowNew,
      highlightOnlyResult = props.highlightOnlyResult,
      results = props.results;
    if (!highlightOnlyResult || allowNew) {
      return false;
    }
    return results.length === 1 && !getOptionProperty(results[0], 'disabled');
  }

  var _excluded$g = ["aria-label"];
  function getMenuProps(props) {
    return function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$ariaLabel = _ref['aria-label'],
        ariaLabel = _ref$ariaLabel === undefined ? 'menu-options' : _ref$ariaLabel,
        userMenuProps = _objectWithoutProperties(_ref, _excluded$g);
      return _objectSpread2(_objectSpread2({}, userMenuProps), {}, {
        'aria-label': ariaLabel,
        id: props.id,
        role: 'listbox'
      });
    };
  }

  /**
   * Truncates the result set based on `maxResults` and returns the new set.
   */
  function getTruncatedOptions(options, maxResults) {
    if (!maxResults || maxResults >= options.length) {
      return options;
    }
    return options.slice(0, maxResults);
  }

  function isDisabledOption(index, items) {
    var option = items[index];
    return !!option && !!getOptionProperty(option, 'disabled');
  }
  function skipDisabledOptions(currentIndex, key, items) {
    var newIndex = currentIndex;
    while (isDisabledOption(newIndex, items)) {
      newIndex += key === 'ArrowUp' ? -1 : 1;
    }
    return newIndex;
  }
  function getUpdatedActiveIndex(currentIndex, key, items) {
    var newIndex = currentIndex;

    // Increment or decrement index based on user keystroke.
    newIndex += key === 'ArrowUp' ? -1 : 1;

    // Skip over any disabled options.
    newIndex = skipDisabledOptions(newIndex, key, items);

    // If we've reached the end, go back to the beginning or vice-versa.
    if (newIndex === items.length) {
      newIndex = -1;
    } else if (newIndex === -2) {
      newIndex = items.length - 1;

      // Skip over any disabled options.
      newIndex = skipDisabledOptions(newIndex, key, items);
    }
    return newIndex;
  }

  function isShown(_ref) {
    var open = _ref.open,
      minLength = _ref.minLength,
      showMenu = _ref.showMenu,
      text = _ref.text;
    // If menu visibility is controlled via props, that value takes precedence.
    if (open || open === false) {
      return open;
    }
    if (text.length < minLength) {
      return false;
    }
    return showMenu;
  }

  /**
   * Prevent the main input from blurring when a menu item or the clear button is
   * clicked. (#226 & #310)
   */
  function preventInputBlur(e) {
    e.preventDefault();
  }

  function isSizeLarge(size) {
    return size === 'lg';
  }
  function isSizeSmall(size) {
    return size === 'sm';
  }

  var _excluded$f = ["className", "isInvalid", "isValid", "size"];
  /**
   * Returns Bootstrap classnames from `size` and validation props, along
   * with pass-through props.
   */
  function propsWithBsClassName(_ref) {
    var className = _ref.className,
      isInvalid = _ref.isInvalid,
      isValid = _ref.isValid,
      size = _ref.size,
      props = _objectWithoutProperties(_ref, _excluded$f);
    return _objectSpread2(_objectSpread2({}, props), {}, {
      className: cx('form-control', 'rbt-input', {
        'form-control-lg': isSizeLarge(size),
        'form-control-sm': isSizeSmall(size),
        'is-invalid': isInvalid,
        'is-valid': isValid
      }, className)
    });
  }

  function validateSelectedPropChange(prevSelected, selected) {
    var uncontrolledToControlled = !prevSelected && selected;
    var controlledToUncontrolled = prevSelected && !selected;
    var from, to, precedent;
    if (uncontrolledToControlled) {
      from = 'uncontrolled';
      to = 'controlled';
      precedent = 'an';
    } else {
      from = 'controlled';
      to = 'uncontrolled';
      precedent = 'a';
    }
    var message = "You are changing ".concat(precedent, " ").concat(from, " typeahead to be ").concat(to, ". ") + "Input elements should not switch from ".concat(from, " to ").concat(to, " (or vice versa). ") + 'Decide between using a controlled or uncontrolled element for the ' + 'lifetime of the component.';
    warn(!(uncontrolledToControlled || controlledToUncontrolled), message);
  }

  var _excluded$e = ["allowNew", "delay", "isLoading", "minLength", "onInputChange", "onSearch", "options", "useCache"];
  /**
   * Logic that encapsulates common behavior and functionality around
   * asynchronous searches, including:
   *
   *  - Debouncing user input
   *  - Optional query caching
   *  - Search prompt and empty results behaviors
   */
  function useAsync(props) {
    var allowNew = props.allowNew,
      _props$delay = props.delay,
      delay = _props$delay === undefined ? 200 : _props$delay,
      isLoading = props.isLoading,
      _props$minLength = props.minLength,
      minLength = _props$minLength === undefined ? 2 : _props$minLength,
      onInputChange = props.onInputChange,
      onSearch = props.onSearch,
      _props$options = props.options,
      options = _props$options === undefined ? [] : _props$options,
      _props$useCache = props.useCache,
      useCache = _props$useCache === undefined ? true : _props$useCache,
      otherProps = _objectWithoutProperties(props, _excluded$e);
    var cacheRef = React.useRef({});
    var handleSearchDebouncedRef = React.useRef(null);
    var queryRef = React.useRef(props.defaultInputValue || '');
    var forceUpdate = useForceUpdate();
    var prevProps = usePrevious(props);
    var handleSearch = React.useCallback(function (query) {
      queryRef.current = query;
      if (!query || minLength && query.length < minLength) {
        return;
      }

      // Use cached results, if applicable.
      if (useCache && cacheRef.current[query]) {
        // Re-render the component with the cached results.
        forceUpdate();
        return;
      }

      // Perform the search.
      onSearch(query);
    }, [forceUpdate, minLength, onSearch, useCache]);

    // Set the debounced search function.
    React.useEffect(function () {
      handleSearchDebouncedRef.current = debounce(handleSearch, delay);
      return function () {
        handleSearchDebouncedRef.current && handleSearchDebouncedRef.current.cancel();
      };
    }, [delay, handleSearch]);
    React.useEffect(function () {
      // Ensure that we've gone from a loading to a completed state. Otherwise
      // an empty response could get cached if the component updates during the
      // request (eg: if the parent re-renders for some reason).
      if (!isLoading && prevProps && prevProps.isLoading && useCache) {
        cacheRef.current[queryRef.current] = options;
      }
    });
    var handleInputChange = React.useCallback(function (query, e) {
      onInputChange && onInputChange(query, e);
      handleSearchDebouncedRef.current && handleSearchDebouncedRef.current(query);
    }, [onInputChange]);
    var cachedQuery = cacheRef.current[queryRef.current];
    return _objectSpread2(_objectSpread2({}, otherProps), {}, {
      // Disable custom selections during a search if `allowNew` isn't a function.
      allowNew: isFunction(allowNew) ? allowNew : allowNew && !isLoading,
      isLoading: isLoading,
      minLength: minLength,
      onInputChange: handleInputChange,
      options: useCache && cachedQuery ? cachedQuery : options,
      query: queryRef.current
    });
  }

  var defaultContext = {
    activeIndex: -1,
    hintText: '',
    id: '',
    initialItem: undefined,
    inputNode: null,
    isOnlyResult: false,
    onInitialItemChange: noop,
    setItem: noop
  };
  var TypeaheadContext = /*#__PURE__*/React.createContext(defaultContext);
  var useTypeaheadContext = function useTypeaheadContext() {
    return React.useContext(TypeaheadContext);
  };

  // IE doesn't seem to get the composite computed value (eg: 'padding',
  // 'borderStyle', etc.), so generate these from the individual values.
  function interpolateStyle(styles, attr) {
    var subattr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    // Title-case the sub-attribute.
    if (subattr) {
      /* eslint-disable-next-line no-param-reassign */
      subattr = subattr.replace(subattr[0], subattr[0].toUpperCase());
    }
    return ['Top', 'Right', 'Bottom', 'Left'].map(function (dir) {
      return styles["".concat(attr).concat(dir).concat(subattr)];
    }).join(' ');
  }
  function copyStyles(inputNode, hintNode) {
    var inputStyle = window.getComputedStyle(inputNode);

    /* eslint-disable no-param-reassign */
    hintNode.style.borderStyle = interpolateStyle(inputStyle, 'border', 'style');
    hintNode.style.borderWidth = interpolateStyle(inputStyle, 'border', 'width');
    hintNode.style.fontSize = inputStyle.fontSize;
    hintNode.style.fontWeight = inputStyle.fontWeight;
    hintNode.style.height = inputStyle.height;
    hintNode.style.lineHeight = inputStyle.lineHeight;
    hintNode.style.margin = interpolateStyle(inputStyle, 'margin');
    hintNode.style.padding = interpolateStyle(inputStyle, 'padding');
    /* eslint-enable no-param-reassign */
  }
  function useHint() {
    var _useTypeaheadContext = useTypeaheadContext(),
      hintText = _useTypeaheadContext.hintText,
      inputNode = _useTypeaheadContext.inputNode;
    var hintRef = React.useRef(null);
    React.useEffect(function () {
      // Scroll hint input when the text input is scrolling.
      var handleInputScroll = function handleInputScroll() {
        if (hintRef.current && inputNode) {
          hintRef.current.scrollLeft = inputNode.scrollLeft;
        }
      };
      inputNode === null || inputNode === undefined || inputNode.addEventListener('scroll', handleInputScroll);
      return function () {
        inputNode === null || inputNode === undefined || inputNode.removeEventListener('scroll', handleInputScroll);
      };
    }, [inputNode]);
    React.useEffect(function () {
      if (inputNode && hintRef.current) {
        copyStyles(inputNode, hintRef.current);
      }
    });
    return {
      hintRef: hintRef,
      hintText: hintText
    };
  }

  const t=t=>"object"==typeof t&&null!=t&&1===t.nodeType,e$1=(t,e)=>(!e||"hidden"!==t)&&("visible"!==t&&"clip"!==t),n=(t,n)=>{if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){const o=getComputedStyle(t,null);return e$1(o.overflowY,n)||e$1(o.overflowX,n)||(t=>{const e=(t=>{if(!t.ownerDocument||!t.ownerDocument.defaultView)return null;try{return t.ownerDocument.defaultView.frameElement}catch(t){return null}})(t);return !!e&&(e.clientHeight<t.scrollHeight||e.clientWidth<t.scrollWidth)})(t)}return  false},o$1=(t,e,n,o,l,r,i,s)=>r<t&&i>e||r>t&&i<e?0:r<=t&&s<=n||i>=e&&s>=n?r-t-o:i>e&&s<n||r<t&&s>n?i-e+l:0,l=t=>{const e=t.parentElement;return null==e?t.getRootNode().host||null:e},r=(e,r)=>{var i,s,d,h;if("undefined"==typeof document)return [];const{scrollMode:c,block:f,inline:u,boundary:a,skipOverflowHiddenElements:g}=r,p="function"==typeof a?a:t=>t!==a;if(!t(e))throw new TypeError("Invalid target");const m=document.scrollingElement||document.documentElement,w=[];let W=e;for(;t(W)&&p(W);){if(W=l(W),W===m){w.push(W);break}null!=W&&W===document.body&&n(W)&&!n(document.documentElement)||null!=W&&n(W,g)&&w.push(W);}const b=null!=(s=null==(i=window.visualViewport)?undefined:i.width)?s:innerWidth,H=null!=(h=null==(d=window.visualViewport)?undefined:d.height)?h:innerHeight,{scrollX:y,scrollY:M}=window,{height:v,width:E,top:x,right:C,bottom:I,left:R}=e.getBoundingClientRect(),{top:T,right:B,bottom:F,left:V}=(t=>{const e=window.getComputedStyle(t);return {top:parseFloat(e.scrollMarginTop)||0,right:parseFloat(e.scrollMarginRight)||0,bottom:parseFloat(e.scrollMarginBottom)||0,left:parseFloat(e.scrollMarginLeft)||0}})(e);let k="start"===f||"nearest"===f?x-T:"end"===f?I+F:x+v/2-T+F,D="center"===u?R+E/2-V+B:"end"===u?C+B:R-V;const L=[];for(let t=0;t<w.length;t++){const e=w[t],{height:l,width:r,top:i,right:s,bottom:d,left:h}=e.getBoundingClientRect();if("if-needed"===c&&x>=0&&R>=0&&I<=H&&C<=b&&(e===m&&!n(e)||x>=i&&I<=d&&R>=h&&C<=s))return L;const a=getComputedStyle(e),g=parseInt(a.borderLeftWidth,10),p=parseInt(a.borderTopWidth,10),W=parseInt(a.borderRightWidth,10),T=parseInt(a.borderBottomWidth,10);let B=0,F=0;const V="offsetWidth"in e?e.offsetWidth-e.clientWidth-g-W:0,S="offsetHeight"in e?e.offsetHeight-e.clientHeight-p-T:0,X="offsetWidth"in e?0===e.offsetWidth?0:r/e.offsetWidth:0,Y="offsetHeight"in e?0===e.offsetHeight?0:l/e.offsetHeight:0;if(m===e)B="start"===f?k:"end"===f?k-H:"nearest"===f?o$1(M,M+H,H,p,T,M+k,M+k+v,v):k-H/2,F="start"===u?D:"center"===u?D-b/2:"end"===u?D-b:o$1(y,y+b,b,g,W,y+D,y+D+E,E),B=Math.max(0,B+M),F=Math.max(0,F+y);else {B="start"===f?k-i-p:"end"===f?k-d+T+S:"nearest"===f?o$1(i,d,l,p,T+S,k,k+v,v):k-(i+l/2)+S/2,F="start"===u?D-h-g:"center"===u?D-(h+r/2)+V/2:"end"===u?D-s+W+V:o$1(h,s,r,g,W+V,D,D+E,E);const{scrollLeft:t,scrollTop:n}=e;B=0===Y?0:Math.max(0,Math.min(n+B/Y,e.scrollHeight-l/Y+S)),F=0===X?0:Math.max(0,Math.min(t+F/X,e.scrollWidth-r/X+V)),k+=n-B,D+=t-F;}L.push({el:e,top:B,left:F});}return L};

  const o=t=>false===t?{block:"end",inline:"nearest"}:(t=>t===Object(t)&&0!==Object.keys(t).length)(t)?t:{block:"start",inline:"nearest"};function e(e,r$1){if(!e.isConnected||!(t=>{let o=t;for(;o&&o.parentNode;){if(o.parentNode===document)return  true;o=o.parentNode instanceof ShadowRoot?o.parentNode.host:o.parentNode;}return  false})(e))return;const n=(t=>{const o=window.getComputedStyle(t);return {top:parseFloat(o.scrollMarginTop)||0,right:parseFloat(o.scrollMarginRight)||0,bottom:parseFloat(o.scrollMarginBottom)||0,left:parseFloat(o.scrollMarginLeft)||0}})(e);if((t=>"object"==typeof t&&"function"==typeof t.behavior)(r$1))return r$1.behavior(r(e,r$1));const l="boolean"==typeof r$1||null==r$1?undefined:r$1.behavior;for(const{el:a,top:i,left:s}of r(e,o(r$1))){const t=i-n.top+n.bottom,o=s-n.left+n.right;a.scroll({top:t,left:o,behavior:l});}}

  var _excluded$d = ["label", "option", "position"];
  function useItem(_ref) {
    var label = _ref.label,
      option = _ref.option,
      position = _ref.position,
      props = _objectWithoutProperties(_ref, _excluded$d);
    var _useTypeaheadContext = useTypeaheadContext(),
      activeIndex = _useTypeaheadContext.activeIndex,
      id = _useTypeaheadContext.id,
      isOnlyResult = _useTypeaheadContext.isOnlyResult,
      onInitialItemChange = _useTypeaheadContext.onInitialItemChange,
      setItem = _useTypeaheadContext.setItem;
    var itemRef = React.useRef(null);
    React.useEffect(function () {
      if (position === 0) {
        onInitialItemChange(option);
      }
    });
    React.useEffect(function () {
      if (position === activeIndex) {
        // Automatically scroll the menu as the user keys through it.
        var node = itemRef.current;
        node && e(node, {
          boundary: node.parentNode,
          scrollMode: 'if-needed'
        });
      }
    }, [activeIndex, option, position]);
    var active = isOnlyResult || activeIndex === position;

    // Update the item's position in the item stack.
    setItem(option, position, itemRef.current);
    return _objectSpread2(_objectSpread2({}, props), {}, {
      active: active,
      'aria-label': label,
      'aria-selected': active,
      id: getMenuItemId(id, position),
      onMouseDown: preventInputBlur,
      ref: itemRef,
      role: 'option'
    });
  }

  /**
   * Custom positioning reference element.
   * @see https://floating-ui.com/docs/virtual-elements
   */

  const min = Math.min;
  const max = Math.max;
  const round = Math.round;
  const floor = Math.floor;
  const createCoords = v => ({
    x: v,
    y: v
  });
  const oppositeSideMap = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  const oppositeAlignmentMap = {
    start: 'end',
    end: 'start'
  };
  function evaluate(value, param) {
    return typeof value === 'function' ? value(param) : value;
  }
  function getSide(placement) {
    return placement.split('-')[0];
  }
  function getAlignment(placement) {
    return placement.split('-')[1];
  }
  function getOppositeAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }
  function getAxisLength(axis) {
    return axis === 'y' ? 'height' : 'width';
  }
  function getSideAxis(placement) {
    return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
  }
  function getAlignmentAxis(placement) {
    return getOppositeAxis(getSideAxis(placement));
  }
  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === undefined) {
      rtl = false;
    }
    const alignment = getAlignment(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const length = getAxisLength(alignmentAxis);
    let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
  }
  function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }
  function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
  }
  function getSideList(side, isStart, rtl) {
    const lr = ['left', 'right'];
    const rl = ['right', 'left'];
    const tb = ['top', 'bottom'];
    const bt = ['bottom', 'top'];
    switch (side) {
      case 'top':
      case 'bottom':
        if (rtl) return isStart ? rl : lr;
        return isStart ? lr : rl;
      case 'left':
      case 'right':
        return isStart ? tb : bt;
      default:
        return [];
    }
  }
  function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    const alignment = getAlignment(placement);
    let list = getSideList(getSide(placement), direction === 'start', rtl);
    if (alignment) {
      list = list.map(side => side + "-" + alignment);
      if (flipAlignment) {
        list = list.concat(list.map(getOppositeAlignmentPlacement));
      }
    }
    return list;
  }
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
  }
  function expandPaddingObject(padding) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...padding
    };
  }
  function getPaddingObject(padding) {
    return typeof padding !== 'number' ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }
  function rectToClientRect(rect) {
    const {
      x,
      y,
      width,
      height
    } = rect;
    return {
      width,
      height,
      top: y,
      left: x,
      right: x + width,
      bottom: y + height,
      x,
      y
    };
  }

  function computeCoordsFromPlacement(_ref, placement, rtl) {
    let {
      reference,
      floating
    } = _ref;
    const sideAxis = getSideAxis(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const alignLength = getAxisLength(alignmentAxis);
    const side = getSide(placement);
    const isVertical = sideAxis === 'y';
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
    let coords;
    switch (side) {
      case 'top':
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case 'bottom':
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case 'right':
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case 'left':
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    switch (getAlignment(placement)) {
      case 'start':
        coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
        break;
      case 'end':
        coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
        break;
    }
    return coords;
  }

  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a given reference element.
   *
   * This export does not have any `platform` interface logic. You will need to
   * write one for the platform you are using Floating UI with.
   */
  const computePosition$1 = async (reference, floating, config) => {
    const {
      placement = 'bottom',
      strategy = 'absolute',
      middleware = [],
      platform
    } = config;
    const validMiddleware = middleware.filter(Boolean);
    const rtl = await (platform.isRTL == null ? undefined : platform.isRTL(floating));
    let rects = await platform.getElementRects({
      reference,
      floating,
      strategy
    });
    let {
      x,
      y
    } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let middlewareData = {};
    let resetCount = 0;
    for (let i = 0; i < validMiddleware.length; i++) {
      const {
        name,
        fn
      } = validMiddleware[i];
      const {
        x: nextX,
        y: nextY,
        data,
        reset
      } = await fn({
        x,
        y,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform,
        elements: {
          reference,
          floating
        }
      });
      x = nextX != null ? nextX : x;
      y = nextY != null ? nextY : y;
      middlewareData = {
        ...middlewareData,
        [name]: {
          ...middlewareData[name],
          ...data
        }
      };
      if (reset && resetCount <= 50) {
        resetCount++;
        if (typeof reset === 'object') {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }
          if (reset.rects) {
            rects = reset.rects === true ? await platform.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }
          ({
            x,
            y
          } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
        }
        i = -1;
      }
    }
    return {
      x,
      y,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  };

  /**
   * Resolves with an object of overflow side offsets that determine how much the
   * element is overflowing a given clipping boundary on each side.
   * - positive = overflowing the boundary by that number of pixels
   * - negative = how many pixels left before it will overflow
   * - 0 = lies flush with the boundary
   * @see https://floating-ui.com/docs/detectOverflow
   */
  async function detectOverflow(state, options) {
    var _await$platform$isEle;
    if (options === undefined) {
      options = {};
    }
    const {
      x,
      y,
      platform,
      rects,
      elements,
      strategy
    } = state;
    const {
      boundary = 'clippingAncestors',
      rootBoundary = 'viewport',
      elementContext = 'floating',
      altBoundary = false,
      padding = 0
    } = evaluate(options, state);
    const paddingObject = getPaddingObject(padding);
    const altContext = elementContext === 'floating' ? 'reference' : 'floating';
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(await platform.getClippingRect({
      element: ((_await$platform$isEle = await (platform.isElement == null ? undefined : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? undefined : platform.getDocumentElement(elements.floating))),
      boundary,
      rootBoundary,
      strategy
    }));
    const rect = elementContext === 'floating' ? {
      x,
      y,
      width: rects.floating.width,
      height: rects.floating.height
    } : rects.reference;
    const offsetParent = await (platform.getOffsetParent == null ? undefined : platform.getOffsetParent(elements.floating));
    const offsetScale = (await (platform.isElement == null ? undefined : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? undefined : platform.getScale(offsetParent))) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    };
    const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements,
      rect,
      offsetParent,
      strategy
    }) : rect);
    return {
      top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
      bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
      left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
      right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
  }

  /**
   * Optimizes the visibility of the floating element by flipping the `placement`
   * in order to keep it in view when the preferred placement(s) will overflow the
   * clipping boundary. Alternative to `autoPlacement`.
   * @see https://floating-ui.com/docs/flip
   */
  const flip$2 = function (options) {
    if (options === undefined) {
      options = {};
    }
    return {
      name: 'flip',
      options,
      async fn(state) {
        var _middlewareData$arrow, _middlewareData$flip;
        const {
          placement,
          middlewareData,
          rects,
          initialPlacement,
          platform,
          elements
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = 'bestFit',
          fallbackAxisSideDirection = 'none',
          flipAlignment = true,
          ...detectOverflowOptions
        } = evaluate(options, state);

        // If a reset by the arrow was caused due to an alignment offset being
        // added, we should skip any logic now since `flip()` has already done its
        // work.
        // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
        if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        const side = getSide(placement);
        const initialSideAxis = getSideAxis(initialPlacement);
        const isBasePlacement = getSide(initialPlacement) === initialPlacement;
        const rtl = await (platform.isRTL == null ? undefined : platform.isRTL(elements.floating));
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
        const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
        if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
          fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
        }
        const placements = [initialPlacement, ...fallbackPlacements];
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? undefined : _middlewareData$flip.overflows) || [];
        if (checkMainAxis) {
          overflows.push(overflow[side]);
        }
        if (checkCrossAxis) {
          const sides = getAlignmentSides(placement, rects, rtl);
          overflows.push(overflow[sides[0]], overflow[sides[1]]);
        }
        overflowsData = [...overflowsData, {
          placement,
          overflows
        }];

        // One or more sides is overflowing.
        if (!overflows.every(side => side <= 0)) {
          var _middlewareData$flip2, _overflowsData$filter;
          const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? undefined : _middlewareData$flip2.index) || 0) + 1;
          const nextPlacement = placements[nextIndex];
          if (nextPlacement) {
            // Try next placement and re-run the lifecycle.
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }

          // First, find the candidates that fit on the mainAxis side of overflow,
          // then find the placement that fits the best on the main crossAxis side.
          let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? undefined : _overflowsData$filter.placement;

          // Otherwise fallback.
          if (!resetPlacement) {
            switch (fallbackStrategy) {
              case 'bestFit':
                {
                  var _overflowsData$filter2;
                  const placement = (_overflowsData$filter2 = overflowsData.filter(d => {
                    if (hasFallbackAxisSideDirection) {
                      const currentSideAxis = getSideAxis(d.placement);
                      return currentSideAxis === initialSideAxis ||
                      // Create a bias to the `y` side axis due to horizontal
                      // reading directions favoring greater width.
                      currentSideAxis === 'y';
                    }
                    return true;
                  }).map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? undefined : _overflowsData$filter2[0];
                  if (placement) {
                    resetPlacement = placement;
                  }
                  break;
                }
              case 'initialPlacement':
                resetPlacement = initialPlacement;
                break;
            }
          }
          if (placement !== resetPlacement) {
            return {
              reset: {
                placement: resetPlacement
              }
            };
          }
        }
        return {};
      }
    };
  };

  /**
   * Provides data that allows you to change the size of the floating element —
   * for instance, prevent it from overflowing the clipping boundary or match the
   * width of the reference element.
   * @see https://floating-ui.com/docs/size
   */
  const size$2 = function (options) {
    if (options === undefined) {
      options = {};
    }
    return {
      name: 'size',
      options,
      async fn(state) {
        var _state$middlewareData, _state$middlewareData2;
        const {
          placement,
          rects,
          platform,
          elements
        } = state;
        const {
          apply = () => {},
          ...detectOverflowOptions
        } = evaluate(options, state);
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const side = getSide(placement);
        const alignment = getAlignment(placement);
        const isYAxis = getSideAxis(placement) === 'y';
        const {
          width,
          height
        } = rects.floating;
        let heightSide;
        let widthSide;
        if (side === 'top' || side === 'bottom') {
          heightSide = side;
          widthSide = alignment === ((await (platform.isRTL == null ? undefined : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
        } else {
          widthSide = side;
          heightSide = alignment === 'end' ? 'top' : 'bottom';
        }
        const maximumClippingHeight = height - overflow.top - overflow.bottom;
        const maximumClippingWidth = width - overflow.left - overflow.right;
        const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
        const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
        const noShift = !state.middlewareData.shift;
        let availableHeight = overflowAvailableHeight;
        let availableWidth = overflowAvailableWidth;
        if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
          availableWidth = maximumClippingWidth;
        }
        if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
          availableHeight = maximumClippingHeight;
        }
        if (noShift && !alignment) {
          const xMin = max(overflow.left, 0);
          const xMax = max(overflow.right, 0);
          const yMin = max(overflow.top, 0);
          const yMax = max(overflow.bottom, 0);
          if (isYAxis) {
            availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
          } else {
            availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
          }
        }
        await apply({
          ...state,
          availableWidth,
          availableHeight
        });
        const nextDimensions = await platform.getDimensions(elements.floating);
        if (width !== nextDimensions.width || height !== nextDimensions.height) {
          return {
            reset: {
              rects: true
            }
          };
        }
        return {};
      }
    };
  };

  function hasWindow() {
    return typeof window !== 'undefined';
  }
  function getNodeName(node) {
    if (isNode(node)) {
      return (node.nodeName || '').toLowerCase();
    }
    // Mocked nodes in testing environments may not be instances of Node. By
    // returning `#document` an infinite loop won't occur.
    // https://github.com/floating-ui/floating-ui/issues/2317
    return '#document';
  }
  function getWindow(node) {
    var _node$ownerDocument;
    return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? undefined : _node$ownerDocument.defaultView) || window;
  }
  function getDocumentElement(node) {
    var _ref;
    return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? undefined : _ref.documentElement;
  }
  function isNode(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Node || value instanceof getWindow(value).Node;
  }
  function isElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Element || value instanceof getWindow(value).Element;
  }
  function isHTMLElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
  }
  function isShadowRoot(value) {
    if (!hasWindow() || typeof ShadowRoot === 'undefined') {
      return false;
    }
    return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
  }
  function isOverflowElement(element) {
    const {
      overflow,
      overflowX,
      overflowY,
      display
    } = getComputedStyle$1(element);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
  }
  function isTableElement(element) {
    return ['table', 'td', 'th'].includes(getNodeName(element));
  }
  function isTopLayer(element) {
    return [':popover-open', ':modal'].some(selector => {
      try {
        return element.matches(selector);
      } catch (e) {
        return false;
      }
    });
  }
  function isContainingBlock(elementOrCss) {
    const webkit = isWebKit();
    const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    // https://drafts.csswg.org/css-transforms-2/#individual-transforms
    return ['transform', 'translate', 'scale', 'rotate', 'perspective'].some(value => css[value] ? css[value] !== 'none' : false) || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
  }
  function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else if (isTopLayer(currentNode)) {
        return null;
      }
      currentNode = getParentNode(currentNode);
    }
    return null;
  }
  function isWebKit() {
    if (typeof CSS === 'undefined' || !CSS.supports) return false;
    return CSS.supports('-webkit-backdrop-filter', 'none');
  }
  function isLastTraversableNode(node) {
    return ['html', 'body', '#document'].includes(getNodeName(node));
  }
  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function getNodeScroll(element) {
    if (isElement(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    return {
      scrollLeft: element.scrollX,
      scrollTop: element.scrollY
    };
  }
  function getParentNode(node) {
    if (getNodeName(node) === 'html') {
      return node;
    }
    const result =
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot ||
    // DOM Element detected.
    node.parentNode ||
    // ShadowRoot detected.
    isShadowRoot(node) && node.host ||
    // Fallback.
    getDocumentElement(node);
    return isShadowRoot(result) ? result.host : result;
  }
  function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
      return node.ownerDocument ? node.ownerDocument.body : node.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }
  function getOverflowAncestors(node, list, traverseIframes) {
    var _node$ownerDocument2;
    if (list === undefined) {
      list = [];
    }
    if (traverseIframes === undefined) {
      traverseIframes = true;
    }
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? undefined : _node$ownerDocument2.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
      const frameElement = getFrameElement(win);
      return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
    }
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
  function getFrameElement(win) {
    return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
  }

  function getCssDimensions(element) {
    const css = getComputedStyle$1(element);
    // In testing environments, the `width` and `height` properties are empty
    // strings for SVG elements, returning NaN. Fallback to `0` in this case.
    let width = parseFloat(css.width) || 0;
    let height = parseFloat(css.height) || 0;
    const hasOffset = isHTMLElement(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
      width = offsetWidth;
      height = offsetHeight;
    }
    return {
      width,
      height,
      $: shouldFallback
    };
  }

  function unwrapElement(element) {
    return !isElement(element) ? element.contextElement : element;
  }

  function getScale(element) {
    const domElement = unwrapElement(element);
    if (!isHTMLElement(domElement)) {
      return createCoords(1);
    }
    const rect = domElement.getBoundingClientRect();
    const {
      width,
      height,
      $
    } = getCssDimensions(domElement);
    let x = ($ ? round(rect.width) : rect.width) / width;
    let y = ($ ? round(rect.height) : rect.height) / height;

    // 0, NaN, or Infinity should always fallback to 1.

    if (!x || !Number.isFinite(x)) {
      x = 1;
    }
    if (!y || !Number.isFinite(y)) {
      y = 1;
    }
    return {
      x,
      y
    };
  }

  const noOffsets = /*#__PURE__*/createCoords(0);
  function getVisualOffsets(element) {
    const win = getWindow(element);
    if (!isWebKit() || !win.visualViewport) {
      return noOffsets;
    }
    return {
      x: win.visualViewport.offsetLeft,
      y: win.visualViewport.offsetTop
    };
  }
  function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
    if (isFixed === undefined) {
      isFixed = false;
    }
    if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
      return false;
    }
    return isFixed;
  }

  function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === undefined) {
      includeScale = false;
    }
    if (isFixedStrategy === undefined) {
      isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement(element);
    let scale = createCoords(1);
    if (includeScale) {
      if (offsetParent) {
        if (isElement(offsetParent)) {
          scale = getScale(offsetParent);
        }
      } else {
        scale = getScale(element);
      }
    }
    const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
    let x = (clientRect.left + visualOffsets.x) / scale.x;
    let y = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;
    if (domElement) {
      const win = getWindow(domElement);
      const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
      let currentWin = win;
      let currentIFrame = getFrameElement(currentWin);
      while (currentIFrame && offsetParent && offsetWin !== currentWin) {
        const iframeScale = getScale(currentIFrame);
        const iframeRect = currentIFrame.getBoundingClientRect();
        const css = getComputedStyle$1(currentIFrame);
        const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
        const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
        x *= iframeScale.x;
        y *= iframeScale.y;
        width *= iframeScale.x;
        height *= iframeScale.y;
        x += left;
        y += top;
        currentWin = getWindow(currentIFrame);
        currentIFrame = getFrameElement(currentWin);
      }
    }
    return rectToClientRect({
      width,
      height,
      x,
      y
    });
  }

  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  function getWindowScrollBarX(element, rect) {
    const leftScroll = getNodeScroll(element).scrollLeft;
    if (!rect) {
      return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
    }
    return rect.left + leftScroll;
  }

  function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
    if (ignoreScrollbarX === undefined) {
      ignoreScrollbarX = false;
    }
    const htmlRect = documentElement.getBoundingClientRect();
    const x = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 :
    // RTL <body> scrollbar.
    getWindowScrollBarX(documentElement, htmlRect));
    const y = htmlRect.top + scroll.scrollTop;
    return {
      x,
      y
    };
  }

  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
      elements,
      rect,
      offsetParent,
      strategy
    } = _ref;
    const isFixed = strategy === 'fixed';
    const documentElement = getDocumentElement(offsetParent);
    const topLayer = elements ? isTopLayer(elements.floating) : false;
    if (offsetParent === documentElement || topLayer && isFixed) {
      return rect;
    }
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    let scale = createCoords(1);
    const offsets = createCoords(0);
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent);
        scale = getScale(offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
    return {
      width: rect.width * scale.x,
      height: rect.height * scale.y,
      x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
      y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
    };
  }

  function getClientRects(element) {
    return Array.from(element.getClientRects());
  }

  // Gets the entire size of the scrollable document area, even extending outside
  // of the `<html>` and `<body>` rect bounds if horizontally scrollable.
  function getDocumentRect(element) {
    const html = getDocumentElement(element);
    const scroll = getNodeScroll(element);
    const body = element.ownerDocument.body;
    const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    let x = -scroll.scrollLeft + getWindowScrollBarX(element);
    const y = -scroll.scrollTop;
    if (getComputedStyle$1(body).direction === 'rtl') {
      x += max(html.clientWidth, body.clientWidth) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }

  function getViewportRect(element, strategy) {
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x = 0;
    let y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      const visualViewportBased = isWebKit();
      if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x,
      y
    };
  }

  // Returns the inner client rect, subtracting scrollbars if present.
  function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
    const width = element.clientWidth * scale.x;
    const height = element.clientHeight * scale.y;
    const x = left * scale.x;
    const y = top * scale.y;
    return {
      width,
      height,
      x,
      y
    };
  }
  function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    let rect;
    if (clippingAncestor === 'viewport') {
      rect = getViewportRect(element, strategy);
    } else if (clippingAncestor === 'document') {
      rect = getDocumentRect(getDocumentElement(element));
    } else if (isElement(clippingAncestor)) {
      rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
      const visualOffsets = getVisualOffsets(element);
      rect = {
        x: clippingAncestor.x - visualOffsets.x,
        y: clippingAncestor.y - visualOffsets.y,
        width: clippingAncestor.width,
        height: clippingAncestor.height
      };
    }
    return rectToClientRect(rect);
  }
  function hasFixedPositionAncestor(element, stopNode) {
    const parentNode = getParentNode(element);
    if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
      return false;
    }
    return getComputedStyle$1(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
  }

  // A "clipping ancestor" is an `overflow` element with the characteristic of
  // clipping (or hiding) child elements. This returns all clipping ancestors
  // of the given element up the tree.
  function getClippingElementAncestors(element, cache) {
    const cachedResult = cache.get(element);
    if (cachedResult) {
      return cachedResult;
    }
    let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
    let currentContainingBlockComputedStyle = null;
    const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
    let currentNode = elementIsFixed ? getParentNode(element) : element;

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
      const computedStyle = getComputedStyle$1(currentNode);
      const currentNodeIsContaining = isContainingBlock(currentNode);
      if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
        currentContainingBlockComputedStyle = null;
      }
      const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
      if (shouldDropCurrentNode) {
        // Drop non-containing blocks.
        result = result.filter(ancestor => ancestor !== currentNode);
      } else {
        // Record last containing block for next iteration.
        currentContainingBlockComputedStyle = computedStyle;
      }
      currentNode = getParentNode(currentNode);
    }
    cache.set(element, result);
    return result;
  }

  // Gets the maximum area that the element is visible in due to any number of
  // clipping ancestors.
  function getClippingRect(_ref) {
    let {
      element,
      boundary,
      rootBoundary,
      strategy
    } = _ref;
    const elementClippingAncestors = boundary === 'clippingAncestors' ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
    const clippingAncestors = [...elementClippingAncestors, rootBoundary];
    const firstClippingAncestor = clippingAncestors[0];
    const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
    return {
      width: clippingRect.right - clippingRect.left,
      height: clippingRect.bottom - clippingRect.top,
      x: clippingRect.left,
      y: clippingRect.top
    };
  }

  function getDimensions(element) {
    const {
      width,
      height
    } = getCssDimensions(element);
    return {
      width,
      height
    };
  }

  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const isFixed = strategy === 'fixed';
    const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = createCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isOffsetParentAnElement) {
        const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } else if (documentElement) {
        // If the <body> scrollbar appears on the left (e.g. RTL systems). Use
        // Firefox with layout.scrollbar.side = 3 in about:config to test this.
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }
    const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
    const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
    const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
    return {
      x,
      y,
      width: rect.width,
      height: rect.height
    };
  }

  function isStaticPositioned(element) {
    return getComputedStyle$1(element).position === 'static';
  }

  function getTrueOffsetParent(element, polyfill) {
    if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') {
      return null;
    }
    if (polyfill) {
      return polyfill(element);
    }
    let rawOffsetParent = element.offsetParent;

    // Firefox returns the <html> element as the offsetParent if it's non-static,
    // while Chrome and Safari return the <body> element. The <body> element must
    // be used to perform the correct calculations even if the <html> element is
    // non-static.
    if (getDocumentElement(element) === rawOffsetParent) {
      rawOffsetParent = rawOffsetParent.ownerDocument.body;
    }
    return rawOffsetParent;
  }

  // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.
  function getOffsetParent(element, polyfill) {
    const win = getWindow(element);
    if (isTopLayer(element)) {
      return win;
    }
    if (!isHTMLElement(element)) {
      let svgOffsetParent = getParentNode(element);
      while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
        if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
          return svgOffsetParent;
        }
        svgOffsetParent = getParentNode(svgOffsetParent);
      }
      return win;
    }
    let offsetParent = getTrueOffsetParent(element, polyfill);
    while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
      offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
      return win;
    }
    return offsetParent || getContainingBlock(element) || win;
  }

  const getElementRects = async function (data) {
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    const floatingDimensions = await getDimensionsFn(data.floating);
    return {
      reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
      floating: {
        x: 0,
        y: 0,
        width: floatingDimensions.width,
        height: floatingDimensions.height
      }
    };
  };

  function isRTL(element) {
    return getComputedStyle$1(element).direction === 'rtl';
  }

  const platform = {
    convertOffsetParentRelativeRectToViewportRelativeRect,
    getDocumentElement,
    getClippingRect,
    getOffsetParent,
    getElementRects,
    getClientRects,
    getDimensions,
    getScale,
    isElement,
    isRTL
  };

  function rectsAreEqual(a, b) {
    return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
  }

  // https://samthor.au/2021/observing-dom/
  function observeMove(element, onMove) {
    let io = null;
    let timeoutId;
    const root = getDocumentElement(element);
    function cleanup() {
      var _io;
      clearTimeout(timeoutId);
      (_io = io) == null || _io.disconnect();
      io = null;
    }
    function refresh(skip, threshold) {
      if (skip === undefined) {
        skip = false;
      }
      if (threshold === undefined) {
        threshold = 1;
      }
      cleanup();
      const elementRectForRootMargin = element.getBoundingClientRect();
      const {
        left,
        top,
        width,
        height
      } = elementRectForRootMargin;
      if (!skip) {
        onMove();
      }
      if (!width || !height) {
        return;
      }
      const insetTop = floor(top);
      const insetRight = floor(root.clientWidth - (left + width));
      const insetBottom = floor(root.clientHeight - (top + height));
      const insetLeft = floor(left);
      const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
      const options = {
        rootMargin,
        threshold: max(0, min(1, threshold)) || 1
      };
      let isFirstUpdate = true;
      function handleObserve(entries) {
        const ratio = entries[0].intersectionRatio;
        if (ratio !== threshold) {
          if (!isFirstUpdate) {
            return refresh();
          }
          if (!ratio) {
            // If the reference is clipped, the ratio is 0. Throttle the refresh
            // to prevent an infinite loop of updates.
            timeoutId = setTimeout(() => {
              refresh(false, 1e-7);
            }, 1000);
          } else {
            refresh(false, ratio);
          }
        }
        if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
          // It's possible that even though the ratio is reported as 1, the
          // element is not actually fully within the IntersectionObserver's root
          // area anymore. This can happen under performance constraints. This may
          // be a bug in the browser's IntersectionObserver implementation. To
          // work around this, we compare the element's bounding rect now with
          // what it was at the time we created the IntersectionObserver. If they
          // are not equal then the element moved, so we refresh.
          refresh();
        }
        isFirstUpdate = false;
      }

      // Older browsers don't support a `document` as the root and will throw an
      // error.
      try {
        io = new IntersectionObserver(handleObserve, {
          ...options,
          // Handle <iframe>s
          root: root.ownerDocument
        });
      } catch (e) {
        io = new IntersectionObserver(handleObserve, options);
      }
      io.observe(element);
    }
    refresh(true);
    return cleanup;
  }

  /**
   * Automatically updates the position of the floating element when necessary.
   * Should only be called when the floating element is mounted on the DOM or
   * visible on the screen.
   * @returns cleanup function that should be invoked when the floating element is
   * removed from the DOM or hidden from the screen.
   * @see https://floating-ui.com/docs/autoUpdate
   */
  function autoUpdate(reference, floating, update, options) {
    if (options === undefined) {
      options = {};
    }
    const {
      ancestorScroll = true,
      ancestorResize = true,
      elementResize = typeof ResizeObserver === 'function',
      layoutShift = typeof IntersectionObserver === 'function',
      animationFrame = false
    } = options;
    const referenceEl = unwrapElement(reference);
    const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.addEventListener('scroll', update, {
        passive: true
      });
      ancestorResize && ancestor.addEventListener('resize', update);
    });
    const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
    let reobserveFrame = -1;
    let resizeObserver = null;
    if (elementResize) {
      resizeObserver = new ResizeObserver(_ref => {
        let [firstEntry] = _ref;
        if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
          // Prevent update loops when using the `size` middleware.
          // https://github.com/floating-ui/floating-ui/issues/1740
          resizeObserver.unobserve(floating);
          cancelAnimationFrame(reobserveFrame);
          reobserveFrame = requestAnimationFrame(() => {
            var _resizeObserver;
            (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
          });
        }
        update();
      });
      if (referenceEl && !animationFrame) {
        resizeObserver.observe(referenceEl);
      }
      resizeObserver.observe(floating);
    }
    let frameId;
    let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
    if (animationFrame) {
      frameLoop();
    }
    function frameLoop() {
      const nextRefRect = getBoundingClientRect(reference);
      if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
        update();
      }
      prevRefRect = nextRefRect;
      frameId = requestAnimationFrame(frameLoop);
    }
    update();
    return () => {
      var _resizeObserver2;
      ancestors.forEach(ancestor => {
        ancestorScroll && ancestor.removeEventListener('scroll', update);
        ancestorResize && ancestor.removeEventListener('resize', update);
      });
      cleanupIo == null || cleanupIo();
      (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
      resizeObserver = null;
      if (animationFrame) {
        cancelAnimationFrame(frameId);
      }
    };
  }

  /**
   * Optimizes the visibility of the floating element by flipping the `placement`
   * in order to keep it in view when the preferred placement(s) will overflow the
   * clipping boundary. Alternative to `autoPlacement`.
   * @see https://floating-ui.com/docs/flip
   */
  const flip$1 = flip$2;

  /**
   * Provides data that allows you to change the size of the floating element —
   * for instance, prevent it from overflowing the clipping boundary or match the
   * width of the reference element.
   * @see https://floating-ui.com/docs/size
   */
  const size$1 = size$2;

  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a given reference element.
   */
  const computePosition = (reference, floating, options) => {
    // This caches the expensive `getClippingElementAncestors` function so that
    // multiple lifecycle resets re-use the same result. It only lives for a
    // single call. If other functions become expensive, we can add them as well.
    const cache = new Map();
    const mergedOptions = {
      platform,
      ...options
    };
    const platformWithCache = {
      ...mergedOptions.platform,
      _c: cache
    };
    return computePosition$1(reference, floating, {
      ...mergedOptions,
      platform: platformWithCache
    });
  };

  var index = typeof document !== 'undefined' ? React.useLayoutEffect : React.useEffect;

  // Fork of `fast-deep-equal` that only does the comparisons we need and compares
  // functions
  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }
    if (typeof a !== typeof b) {
      return false;
    }
    if (typeof a === 'function' && a.toString() === b.toString()) {
      return true;
    }
    let length;
    let i;
    let keys;
    if (a && b && typeof a === 'object') {
      if (Array.isArray(a)) {
        length = a.length;
        if (length !== b.length) return false;
        for (i = length; i-- !== 0;) {
          if (!deepEqual(a[i], b[i])) {
            return false;
          }
        }
        return true;
      }
      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) {
        return false;
      }
      for (i = length; i-- !== 0;) {
        if (!{}.hasOwnProperty.call(b, keys[i])) {
          return false;
        }
      }
      for (i = length; i-- !== 0;) {
        const key = keys[i];
        if (key === '_owner' && a.$$typeof) {
          continue;
        }
        if (!deepEqual(a[key], b[key])) {
          return false;
        }
      }
      return true;
    }
    return a !== a && b !== b;
  }

  function getDPR(element) {
    if (typeof window === 'undefined') {
      return 1;
    }
    const win = element.ownerDocument.defaultView || window;
    return win.devicePixelRatio || 1;
  }

  function roundByDPR(element, value) {
    const dpr = getDPR(element);
    return Math.round(value * dpr) / dpr;
  }

  function useLatestRef(value) {
    const ref = React__namespace.useRef(value);
    index(() => {
      ref.current = value;
    });
    return ref;
  }

  /**
   * Provides data to position a floating element.
   * @see https://floating-ui.com/docs/useFloating
   */
  function useFloating(options) {
    if (options === undefined) {
      options = {};
    }
    const {
      placement = 'bottom',
      strategy = 'absolute',
      middleware = [],
      platform,
      elements: {
        reference: externalReference,
        floating: externalFloating
      } = {},
      transform = true,
      whileElementsMounted,
      open
    } = options;
    const [data, setData] = React__namespace.useState({
      x: 0,
      y: 0,
      strategy,
      placement,
      middlewareData: {},
      isPositioned: false
    });
    const [latestMiddleware, setLatestMiddleware] = React__namespace.useState(middleware);
    if (!deepEqual(latestMiddleware, middleware)) {
      setLatestMiddleware(middleware);
    }
    const [_reference, _setReference] = React__namespace.useState(null);
    const [_floating, _setFloating] = React__namespace.useState(null);
    const setReference = React__namespace.useCallback(node => {
      if (node !== referenceRef.current) {
        referenceRef.current = node;
        _setReference(node);
      }
    }, []);
    const setFloating = React__namespace.useCallback(node => {
      if (node !== floatingRef.current) {
        floatingRef.current = node;
        _setFloating(node);
      }
    }, []);
    const referenceEl = externalReference || _reference;
    const floatingEl = externalFloating || _floating;
    const referenceRef = React__namespace.useRef(null);
    const floatingRef = React__namespace.useRef(null);
    const dataRef = React__namespace.useRef(data);
    const hasWhileElementsMounted = whileElementsMounted != null;
    const whileElementsMountedRef = useLatestRef(whileElementsMounted);
    const platformRef = useLatestRef(platform);
    const openRef = useLatestRef(open);
    const update = React__namespace.useCallback(() => {
      if (!referenceRef.current || !floatingRef.current) {
        return;
      }
      const config = {
        placement,
        strategy,
        middleware: latestMiddleware
      };
      if (platformRef.current) {
        config.platform = platformRef.current;
      }
      computePosition(referenceRef.current, floatingRef.current, config).then(data => {
        const fullData = {
          ...data,
          // The floating element's position may be recomputed while it's closed
          // but still mounted (such as when transitioning out). To ensure
          // `isPositioned` will be `false` initially on the next open, avoid
          // setting it to `true` when `open === false` (must be specified).
          isPositioned: openRef.current !== false
        };
        if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
          dataRef.current = fullData;
          ReactDOM__namespace.flushSync(() => {
            setData(fullData);
          });
        }
      });
    }, [latestMiddleware, placement, strategy, platformRef, openRef]);
    index(() => {
      if (open === false && dataRef.current.isPositioned) {
        dataRef.current.isPositioned = false;
        setData(data => ({
          ...data,
          isPositioned: false
        }));
      }
    }, [open]);
    const isMountedRef = React__namespace.useRef(false);
    index(() => {
      isMountedRef.current = true;
      return () => {
        isMountedRef.current = false;
      };
    }, []);
    index(() => {
      if (referenceEl) referenceRef.current = referenceEl;
      if (floatingEl) floatingRef.current = floatingEl;
      if (referenceEl && floatingEl) {
        if (whileElementsMountedRef.current) {
          return whileElementsMountedRef.current(referenceEl, floatingEl, update);
        }
        update();
      }
    }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
    const refs = React__namespace.useMemo(() => ({
      reference: referenceRef,
      floating: floatingRef,
      setReference,
      setFloating
    }), [setReference, setFloating]);
    const elements = React__namespace.useMemo(() => ({
      reference: referenceEl,
      floating: floatingEl
    }), [referenceEl, floatingEl]);
    const floatingStyles = React__namespace.useMemo(() => {
      const initialStyles = {
        position: strategy,
        left: 0,
        top: 0
      };
      if (!elements.floating) {
        return initialStyles;
      }
      const x = roundByDPR(elements.floating, data.x);
      const y = roundByDPR(elements.floating, data.y);
      if (transform) {
        return {
          ...initialStyles,
          transform: "translate(" + x + "px, " + y + "px)",
          ...(getDPR(elements.floating) >= 1.5 && {
            willChange: 'transform'
          })
        };
      }
      return {
        position: strategy,
        left: x,
        top: y
      };
    }, [strategy, transform, elements.floating, data.x, data.y]);
    return React__namespace.useMemo(() => ({
      ...data,
      update,
      refs,
      elements,
      floatingStyles
    }), [data, update, refs, elements, floatingStyles]);
  }

  /**
   * Optimizes the visibility of the floating element by flipping the `placement`
   * in order to keep it in view when the preferred placement(s) will overflow the
   * clipping boundary. Alternative to `autoPlacement`.
   * @see https://floating-ui.com/docs/flip
   */
  const flip = (options, deps) => ({
    ...flip$1(options),
    options: [options, deps]
  });

  /**
   * Provides data that allows you to change the size of the floating element —
   * for instance, prevent it from overflowing the clipping boundary or match the
   * width of the reference element.
   * @see https://floating-ui.com/docs/size
   */
  const size = (options, deps) => ({
    ...size$1(options),
    options: [options, deps]
  });

  function getMiddleware(props) {
    var middleware = [];
    if (props.flip) {
      middleware.push(flip());
    }
    if (props.align !== 'right' && props.align !== 'left') {
      middleware.push(size({
        apply: function apply(_ref) {
          var rects = _ref.rects,
            elements = _ref.elements;
          Object.assign(elements.floating.style, {
            width: "".concat(rects.reference.width, "px")
          });
        }
      }));
    }
    return middleware;
  }
  function getPlacement(props) {
    var x = props.align === 'right' ? 'end' : 'start';
    var y = props.dropup ? 'top' : 'bottom';
    return "".concat(y, "-").concat(x);
  }
  function useOverlay(referenceElement, options) {
    var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      floatingElement = _useState2[0],
      attachRef = _useState2[1];
    var _useFloating = useFloating({
        elements: {
          floating: floatingElement,
          reference: referenceElement
        },
        middleware: getMiddleware(options),
        placement: getPlacement(options),
        strategy: options.positionFixed ? 'fixed' : 'absolute',
        whileElementsMounted: autoUpdate
      }),
      floatingStyles = _useFloating.floatingStyles;
    return {
      innerRef: attachRef,
      style: floatingStyles
    };
  }

  /**
   * Creates a `Ref` whose value is updated in an effect, ensuring the most recent
   * value is the one rendered with. Generally only required for Concurrent mode usage
   * where previous work in `render()` may be discarded before being used.
   *
   * This is safe to access in an event handler.
   *
   * @param value The `Ref` value
   */
  function useCommittedRef(value) {
    const ref = React.useRef(value);
    React.useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref;
  }

  function useEventCallback(fn) {
    const ref = useCommittedRef(fn);
    return React.useCallback(function (...args) {
      return ref.current && ref.current(...args);
    }, [ref]);
  }

  function isLeftClickEvent(event) {
    return event.button === 0;
  }
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  var InitialTriggerEvents = {
    click: 'mousedown',
    mouseup: 'mousedown',
    pointerup: 'pointerdown'
  };

  /**
   * The `useClickOutside` hook registers your callback on the document that fires
   * when a pointer event is registered outside of the provided ref or element.
   */
  function useClickOutside(ref) {
    var onClickOutside = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      disabled = _ref.disabled,
      _ref$clickTrigger = _ref.clickTrigger,
      clickTrigger = _ref$clickTrigger === undefined ? 'click' : _ref$clickTrigger;
    var preventMouseClickOutsideRef = React.useRef(false);
    var waitingForTrigger = React.useRef(false);
    var handleMouseCapture = React.useCallback(function (e) {
      var currentTarget = ref.current;
      warn(!!currentTarget, 'ClickOutside captured a close event but does not have a ref to compare it to. ' + 'useClickOutside(), should be passed a ref that resolves to a DOM node');
      preventMouseClickOutsideRef.current = !currentTarget || isModifiedEvent(e) || !isLeftClickEvent(e) || !!currentTarget.contains(e.target) || waitingForTrigger.current;
      waitingForTrigger.current = false;
    }, [ref]);
    var handleInitialMouse = useEventCallback(function (e) {
      var currentTarget = ref.current;
      if (currentTarget !== null && currentTarget !== undefined && currentTarget.contains(e.target)) {
        waitingForTrigger.current = true;
      } else {
        // When clicking on scrollbars within current target, click events are not
        // triggered, so this ref is never reset inside `handleMouseCapture`. This
        // would cause a bug where it requires 2 clicks to close the overlay.
        waitingForTrigger.current = false;
      }
    });
    var handleMouse = useEventCallback(function (e) {
      if (!preventMouseClickOutsideRef.current) {
        onClickOutside(e);
      }
    });
    React.useEffect(function () {
      var _ref$current, _ownerWindow$event, _ownerWindow$parent;
      if (disabled || ref == null) return undefined;
      var doc = ((_ref$current = ref.current) === null || _ref$current === undefined ? undefined : _ref$current.ownerDocument) || document;
      var ownerWindow = doc.defaultView || window;

      // Store the current event to avoid triggering handlers immediately
      // For things rendered in an iframe, the event might originate on the parent window
      // so we should fall back to that global event if the local one doesn't exist
      // https://github.com/facebook/react/issues/20074
      var currentEvent = (_ownerWindow$event = ownerWindow.event) !== null && _ownerWindow$event !== undefined ? _ownerWindow$event : (_ownerWindow$parent = ownerWindow.parent) === null || _ownerWindow$parent === undefined ? undefined : _ownerWindow$parent.event;
      var removeInitialTriggerListener = null;
      if (InitialTriggerEvents[clickTrigger]) {
        doc.addEventListener(InitialTriggerEvents[clickTrigger], handleInitialMouse, true);
        removeInitialTriggerListener = function removeInitialTriggerListener() {
          doc.removeEventListener(InitialTriggerEvents[clickTrigger], handleInitialMouse);
        };
      }
      var handleMouseTrigger = function handleMouseTrigger(e) {
        // skip if this event is the same as the one running when we added the handlers
        if (e === currentEvent) {
          currentEvent = undefined;
          return;
        }
        handleMouse(e);
      };

      // Use capture for this listener so it fires before React's listener, to
      // avoid false positives in the contains() check below if the target DOM
      // element is removed in the React mouse callback.
      doc.addEventListener(clickTrigger, handleMouseCapture, true);
      doc.addEventListener(clickTrigger, handleMouseTrigger, true);
      return function () {
        var _removeInitialTrigger;
        (_removeInitialTrigger = removeInitialTriggerListener) === null || _removeInitialTrigger === undefined || _removeInitialTrigger();
        doc.removeEventListener(clickTrigger, handleMouseCapture);
        doc.removeEventListener(clickTrigger, handleMouseTrigger);
      };
    }, [ref, disabled, clickTrigger, handleMouseCapture, handleInitialMouse, handleMouse]);
  }

  function useRootClose(onRootClose, options) {
    var ref = React.useRef(null);
    var onClose = onRootClose;
    useClickOutside(ref, onClose, options);
    var handleKeyUp = useEventCallback(function (e) {
      if (e.key === 'Escape') {
        onClose(e);
      }
    });
    React.useEffect(function () {
      var _ref$current;
      if (options.disabled || ref == null) return undefined;
      var doc = ((_ref$current = ref.current) === null || _ref$current === undefined ? undefined : _ref$current.ownerDocument) || document;

      // Store the current event to avoid triggering handlers immediately
      // https://github.com/facebook/react/issues/20074
      var currentEvent = (doc.defaultView || window).event;
      var onKeyUp = function onKeyUp(e) {
        // skip if this event is the same as the one running when we added the handlers
        if (e === currentEvent) {
          currentEvent = undefined;
          return;
        }
        handleKeyUp(e);
      };
      doc.addEventListener('keyup', onKeyUp);
      return function () {
        doc.removeEventListener('keyup', onKeyUp);
      };
    }, [ref, options.disabled, handleKeyUp]);
    return ref;
  }

  var _excluded$c = ["onBlur", "onClick", "onFocus", "onRemove", "option"];
  function useToken(_ref) {
    var onBlur = _ref.onBlur,
      onClick = _ref.onClick,
      onFocus = _ref.onFocus,
      onRemove = _ref.onRemove,
      option = _ref.option,
      props = _objectWithoutProperties(_ref, _excluded$c);
    var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      active = _useState2[0],
      setActive = _useState2[1];
    var handleBlur = function handleBlur(e) {
      setActive(false);
      onBlur && onBlur(e);
    };
    var handleClick = function handleClick(e) {
      setActive(true);
      onClick && onClick(e);
    };
    var handleFocus = function handleFocus(e) {
      setActive(true);
      onFocus && onFocus(e);
    };
    var handleRemove = function handleRemove() {
      onRemove && onRemove(option);
    };
    var handleKeyDown = function handleKeyDown(e) {
      if (e.key === 'Backspace' && active) {
        // Prevent browser from going back.
        e.preventDefault();
        handleRemove();
      }
    };
    var rootElementRef = useRootClose(handleBlur, _objectSpread2(_objectSpread2({}, props), {}, {
      disabled: !active
    }));
    return {
      active: active,
      onBlur: handleBlur,
      onClick: handleClick,
      onFocus: handleFocus,
      onKeyDown: handleKeyDown,
      onRemove: isFunction(onRemove) ? handleRemove : undefined,
      ref: rootElementRef
    };
  }

  var _excluded$b = ["defaultInputValue", "defaultOpen", "defaultSelected", "labelKey", "multiple"];
  function getInitialState(_ref) {
    var defaultInputValue = _ref.defaultInputValue,
      defaultOpen = _ref.defaultOpen,
      defaultSelected = _ref.defaultSelected,
      labelKey = _ref.labelKey,
      multiple = _ref.multiple,
      props = _objectWithoutProperties(_ref, _excluded$b);
    var selected = props.selected ? props.selected.slice() : defaultSelected.slice();
    var text = defaultInputValue;
    if (!multiple && selected.length) {
      // Set the text if an initial selection is passed in.
      text = getOptionLabel(selected[0], labelKey);
      if (selected.length > 1) {
        // Limit to 1 selection in single-select mode.
        selected = selected.slice(0, 1);
      }
    }
    return {
      activeIndex: -1,
      activeItem: undefined,
      initialItem: undefined,
      isFocused: false,
      selected: selected,
      showMenu: defaultOpen,
      text: text
    };
  }
  function clearTypeahead(state, props) {
    return _objectSpread2(_objectSpread2({}, getInitialState(props)), {}, {
      isFocused: state.isFocused,
      selected: [],
      text: ''
    });
  }
  function clickOrFocusInput(state) {
    return _objectSpread2(_objectSpread2({}, state), {}, {
      isFocused: true,
      showMenu: true
    });
  }
  function hideMenu(state, props) {
    var _getInitialState = getInitialState(props),
      activeIndex = _getInitialState.activeIndex,
      activeItem = _getInitialState.activeItem,
      initialItem = _getInitialState.initialItem;
    return _objectSpread2(_objectSpread2({}, state), {}, {
      activeIndex: activeIndex,
      activeItem: activeItem,
      initialItem: initialItem,
      showMenu: false
    });
  }
  function toggleMenu(state, props) {
    return state.showMenu ? hideMenu(state, props) : _objectSpread2(_objectSpread2({}, state), {}, {
      showMenu: true
    });
  }
  function reducer(state, newState) {
    return _objectSpread2(_objectSpread2({}, state), newState);
  }
  function useTypeaheadState(props) {
    var initialState = getInitialState(props);
    var _useReducer = React.useReducer(reducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];
    var callbackQueue = React.useRef([]);
    React.useEffect(function () {
      // Trigger any post-state-change callbacks.
      if (callbackQueue.current.length) {
        callbackQueue.current.forEach(function (callback) {
          callback(state);
        });
      }
      // Reset the queue.
      callbackQueue.current = [];
    }, [state]);
    function setState(stateObjOrFn, cb) {
      var newState = isFunction(stateObjOrFn) ? stateObjOrFn(state, props) : stateObjOrFn;
      cb && callbackQueue.current.push(cb);
      dispatch(newState);
    }
    return [state, setState];
  }

  var INPUT_PROPS_BLACKLIST = [{
    alt: 'onBlur',
    prop: 'onBlur'
  }, {
    alt: 'onInputChange',
    prop: 'onChange'
  }, {
    alt: 'onFocus',
    prop: 'onFocus'
  }, {
    alt: 'onKeyDown',
    prop: 'onKeyDown'
  }];
  function useValidateProps(_ref) {
    var allowNew = _ref.allowNew,
      caseSensitive = _ref.caseSensitive,
      defaultInputValue = _ref.defaultInputValue,
      _ref$defaultSelected = _ref.defaultSelected,
      defaultSelected = _ref$defaultSelected === undefined ? [] : _ref$defaultSelected,
      filterBy = _ref.filterBy,
      highlightOnlyResult = _ref.highlightOnlyResult,
      id = _ref.id,
      ignoreDiacritics = _ref.ignoreDiacritics,
      inputProps = _ref.inputProps,
      labelKey = _ref.labelKey,
      multiple = _ref.multiple,
      onChange = _ref.onChange,
      selected = _ref.selected;
    React.useEffect(function () {
      var name = defaultSelected.length ? 'defaultSelected' : 'selected';
      warn(id != null, 'The `id` prop is required to make `Menu` accessible for users of ' + 'assistive technologies such as screen readers.');
      warn(!(!multiple && defaultInputValue && (defaultSelected.length || selected && selected.length)), "`defaultInputValue` will be overridden by the value from `".concat(name, "`."));
      warn(multiple || defaultSelected.length <= 1, 'You are passing multiple options to the `defaultSelected` prop of a ' + 'Typeahead in single-select mode. The selections will be truncated to a ' + 'single selection.');
      warn(!(highlightOnlyResult && allowNew), '`highlightOnlyResult` will not work with `allowNew`.');
      warn(!caseSensitive || typeof filterBy !== 'function', 'Your `filterBy` function will override the `caseSensitive` prop.');
      warn(ignoreDiacritics || typeof filterBy !== 'function', 'Your `filterBy` function will override the `ignoreDiacritics` prop.');
      if (!(inputProps && Object.prototype.toString.call(inputProps) === '[object Object]')) {
        return;
      }

      // Blacklisted properties.
      INPUT_PROPS_BLACKLIST.forEach(function (_ref2) {
        var alt = _ref2.alt,
          prop = _ref2.prop;
        var msg = alt ? " Use the top-level `".concat(alt, "` prop instead.") : null;
        warn(!inputProps[prop], "The `".concat(prop, "` property of `inputProps` will be ignored.").concat(msg));
      });
      warn(!(isFunction(labelKey) && allowNew), '`labelKey` must be a string when using `allowNew`.');
      warn(multiple || !selected || selected.length <= 1, 'You are passing multiple options to the `selected` prop of a Typeahead ' + 'in single-select mode. This may lead to unexpected behaviors or errors.');
      warn(!selected || selected && isFunction(onChange), 'You provided a `selected` prop without an `onChange` handler. If you ' + 'want the typeahead to be uncontrolled, use `defaultSelected`. ' + 'Otherwise, set `onChange`.');
    }, [allowNew, caseSensitive, defaultInputValue, defaultSelected, filterBy, highlightOnlyResult, id, ignoreDiacritics, inputProps, labelKey, multiple, onChange, selected]);
  }

  var _excluded$a = ["onChange"];
  var defaultProps = {
    allowNew: false,
    autoFocus: false,
    caseSensitive: false,
    defaultInputValue: '',
    defaultOpen: false,
    defaultSelected: [],
    filterBy: [],
    highlightOnlyResult: false,
    ignoreDiacritics: true,
    inputProps: {},
    labelKey: DEFAULT_LABELKEY,
    minLength: 0,
    multiple: false,
    onBlur: noop,
    onFocus: noop,
    onInputChange: noop,
    onKeyDown: noop,
    onMenuToggle: noop
  };

  /**
   * Manually trigger the input's change event.
   * https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js/46012210#46012210
   */
  function triggerInputChange(input, value) {
    var inputValue = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
    inputValue && inputValue.set && inputValue.set.call(input, value);
    var e = new Event('input', {
      bubbles: true
    });
    input.dispatchEvent(e);
  }
  function useDidUpdate(props, state, setState) {
    var prevProps = usePrevious(props);
    var isInitialRender = React.useRef(true);
    React.useEffect(function () {
      if (isInitialRender.current) {
        isInitialRender.current = false;
        return;
      }
      validateSelectedPropChange(props.selected, prevProps === null || prevProps === undefined ? undefined : prevProps.selected);

      // Sync selections in state with those in props.
      if (props.selected && !isEqual(props.selected, state.selected)) {
        setState({
          selected: props.selected
        });
        if (!props.multiple) {
          setState({
            text: props.selected.length ? getOptionLabel(props.selected[0], props.labelKey) : ''
          });
        }
      }
    }, [props.labelKey, props.multiple, props.selected, prevProps === null || prevProps === undefined ? undefined : prevProps.selected, setState, state.selected]);
  }
  function useOnMenuToggle(isMenuShown, onMenuToggle) {
    var isInitialRender = React.useRef(true);
    React.useEffect(function () {
      if (isInitialRender.current) {
        isInitialRender.current = false;
        return;
      }
      onMenuToggle === null || onMenuToggle === undefined || onMenuToggle(isMenuShown);
    }, [isMenuShown, onMenuToggle]);
  }

  /**
   * Most props used internally become "required" since they're given default
   * values.
   */

  function useTypeahead(_ref, ref) {
    var onChange = _ref.onChange,
      partialProps = _objectWithoutProperties(_ref, _excluded$a);
    var props = _objectSpread2(_objectSpread2({}, defaultProps), partialProps);
    var _useTypeaheadState = useTypeaheadState(props),
      _useTypeaheadState2 = _slicedToArray(_useTypeaheadState, 2),
      state = _useTypeaheadState2[0],
      setState = _useTypeaheadState2[1];
    var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      inputNode = _useState2[0],
      setInputNode = _useState2[1];
    var mergedPropsAndState = _objectSpread2(_objectSpread2({}, props), state);
    var filterBy = mergedPropsAndState.filterBy,
      labelKey = mergedPropsAndState.labelKey,
      options = mergedPropsAndState.options;
    var isMenuShown = isShown(mergedPropsAndState);
    var items = [];
    var itemNodes = [];
    var hintText = getHintText(_objectSpread2(_objectSpread2({}, mergedPropsAndState), {}, {
      isMenuShown: isMenuShown
    }));
    useValidateProps(props);
    useDidUpdate(props, state, setState);
    useOnMenuToggle(isMenuShown, props.onMenuToggle);

    // Imperative methods
    function hideMenu$1() {
      setState(hideMenu);
    }
    function blur() {
      inputNode === null || inputNode === undefined || inputNode.blur();
      hideMenu$1();
    }
    function clear() {
      setState(clearTypeahead);
    }
    var focus = React.useCallback(function () {
      inputNode === null || inputNode === undefined || inputNode.focus();
    }, [inputNode]);
    function getInput() {
      return inputNode;
    }
    function toggleMenu$1() {
      setState(toggleMenu);
    }
    React.useImperativeHandle(ref, function () {
      return {
        blur: blur,
        clear: clear,
        focus: focus,
        getInput: getInput,
        hideMenu: hideMenu$1,
        toggleMenu: toggleMenu$1
      };
    });
    React.useEffect(function () {
      props.autoFocus && focus();
    }, [props.autoFocus, focus]);
    var results = [];
    if (isMenuShown) {
      var cb = isFunction(filterBy) ? filterBy : defaultFilterBy;
      results = options.filter(function (option) {
        return cb(option, mergedPropsAndState);
      });

      // Add the custom option if necessary.
      if (addCustomOption(results, mergedPropsAndState)) {
        results.push(_defineProperty({
          customOption: true
        }, getStringLabelKey(labelKey), state.text));
      }
    }
    var isOnlyResult = getIsOnlyResult(_objectSpread2(_objectSpread2({}, props), {}, {
      results: results
    }));
    function setItem(item, position, node) {
      items[position] = item;
      itemNodes[position] = node;
    }
    function onActiveIndexChange(index) {
      setState({
        activeIndex: index,
        activeItem: index >= 0 ? items[index] : undefined
      });
    }
    function onBlur(e) {
      setState(_objectSpread2(_objectSpread2({}, hideMenu(state, props)), {}, {
        isFocused: false
      }), function () {
        return props.onBlur(e);
      });
    }
    function onSelect(newSelected) {
      onChange && onChange(newSelected);
    }
    function onClear() {
      inputNode && triggerInputChange(inputNode, '');
      setState(clearTypeahead, function () {
        // Change handler is automatically triggered for single selections but
        // not multi-selections.
        if (props.multiple) {
          onSelect([]);
        }
      });
    }
    function onClick(e) {
      // TODO: Make `onClick` a top-level prop?
      setState(clickOrFocusInput, function () {
        var _props$inputProps, _props$inputProps$onC;
        return (_props$inputProps = props.inputProps) === null || _props$inputProps === undefined || (_props$inputProps$onC = _props$inputProps.onClick) === null || _props$inputProps$onC === undefined ? undefined : _props$inputProps$onC.call(_props$inputProps, e);
      });
    }
    function onFocus(e) {
      setState(clickOrFocusInput, function () {
        return props.onFocus(e);
      });
    }
    function onInitialItemChange(initialItem) {
      // Don't update the initial item if it hasn't changed.
      if (!isEqual(initialItem, state.initialItem)) {
        setState({
          initialItem: initialItem
        });
      }
    }
    function onInputChange(e) {
      var value = e.currentTarget.value;

      // Clear selections when the input value changes in single-select mode.
      var shouldClearSelections = state.selected.length && !props.multiple;
      var _getInitialState = getInitialState(props),
        activeIndex = _getInitialState.activeIndex,
        activeItem = _getInitialState.activeItem;
      setState({
        activeIndex: activeIndex,
        activeItem: activeItem,
        selected: shouldClearSelections ? [] : state.selected,
        showMenu: true,
        text: value
      });
      props.onInputChange(value, e);
      shouldClearSelections && onSelect([]);
    }
    function onAdd(option) {
      var selected;
      var selection = option;
      var text = '';

      // Add a unique id to the custom selection. Avoid doing this in `render` so
      // the id doesn't increment every time.
      if (!isString(selection) && selection.customOption) {
        selection = _objectSpread2(_objectSpread2({}, selection), {}, {
          id: uniqueId('new-id-')
        });
      }
      if (props.multiple) {
        // If multiple selections are allowed, add the new selection to the
        // existing selections.
        selected = [].concat(_toConsumableArray(state.selected), [selection]);
      } else {
        // If only a single selection is allowed, replace the existing selection
        // with the new one.
        selected = [selection];
        text = getOptionLabel(selection, props.labelKey);
      }
      setState(_objectSpread2(_objectSpread2({}, hideMenu(state, props)), {}, {
        initialItem: selection,
        selected: selected,
        text: text
      }), function (newState) {
        return onSelect(newState.selected);
      });
    }
    function onKeyDown(e) {
      var _itemNodes$state$acti;
      props.onKeyDown(e);

      // Skip most actions when the menu is hidden.
      if (!isMenuShown) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          setState({
            showMenu: true
          });
        }
        return;
      }
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
          // Prevent input cursor from going to the beginning when pressing up.
          e.preventDefault();
          onActiveIndexChange(getUpdatedActiveIndex(state.activeIndex, e.key, items));
          break;
        case 'Enter':
          // Prevent form submission while menu is open.
          e.preventDefault();
          (_itemNodes$state$acti = itemNodes[state.activeIndex]) === null || _itemNodes$state$acti === undefined || _itemNodes$state$acti.click();
          break;
        case 'Escape':
        case 'Tab':
          // ESC simply hides the menu. TAB will blur the input and move focus to
          // the next item; hide the menu so it doesn't gain focus.
          hideMenu$1();
          break;
      }
      if (!state.initialItem) {
        return;
      }
      var addOnlyResult = e.key === 'Enter' && isOnlyResult;
      var shouldSelectHint = hintText && defaultSelectHint(e, props.selectHint);
      if (addOnlyResult || shouldSelectHint) {
        onAdd(state.initialItem);
      }
    }
    function onRemove(selection) {
      var selected = state.selected.filter(function (option) {
        return !isEqual(option, selection);
      });

      // Make sure the input stays focused after the item is removed.
      focus();
      setState(_objectSpread2(_objectSpread2({}, hideMenu(state, props)), {}, {
        selected: selected
      }), function () {
        return onSelect(selected);
      });
    }
    React.useEffect(function () {
      // Clear the initial item when there are no results.
      if (!(props.allowNew || results.length)) {
        onInitialItemChange();
      }
    });
    var context = {
      activeIndex: state.activeIndex,
      hintText: hintText,
      id: props.id,
      initialItem: state.initialItem,
      inputNode: inputNode,
      isOnlyResult: isOnlyResult,
      onInitialItemChange: onInitialItemChange,
      setItem: setItem
    };
    return _objectSpread2(_objectSpread2({}, mergedPropsAndState), {}, {
      context: context,
      getInputProps: getInputProps({
        activeIndex: state.activeIndex,
        id: props.id,
        inputRef: setInputNode,
        isFocused: state.isFocused,
        isMenuShown: isMenuShown,
        multiple: props.multiple,
        onBlur: onBlur,
        onChange: onInputChange,
        onClick: onClick,
        onFocus: onFocus,
        onKeyDown: onKeyDown,
        value: getInputText(mergedPropsAndState)
      }),
      getMenuProps: getMenuProps({
        id: props.id
      }),
      hideMenu: hideMenu$1,
      inputNode: inputNode,
      isMenuShown: isMenuShown,
      onClear: onClear,
      onHide: hideMenu$1,
      onItemSelect: onAdd,
      onRemove: onRemove,
      results: results,
      toggleMenu: toggleMenu$1
    });
  }

  var _excluded$9 = ["className", "label", "onClick", "onKeyDown", "size"];
  /**
   * ClearButton
   */
  var ClearButton = function ClearButton(_ref) {
    var className = _ref.className,
      _ref$label = _ref.label,
      label = _ref$label === undefined ? 'Clear' : _ref$label,
      _onClick = _ref.onClick,
      _onKeyDown = _ref.onKeyDown,
      size = _ref.size,
      props = _objectWithoutProperties(_ref, _excluded$9);
    return /*#__PURE__*/React.createElement("button", _extends({}, props, {
      "aria-label": label,
      className: cx('close', 'btn-close', 'rbt-close', {
        'rbt-close-lg': isSizeLarge(size),
        'rbt-close-sm': isSizeSmall(size)
      }, className),
      onClick: function onClick(e) {
        e.stopPropagation();
        _onClick && _onClick(e);
      },
      onKeyDown: function onKeyDown(e) {
        // Prevent browser from navigating back.
        if (e.key === 'Backspace') {
          e.preventDefault();
        }
        _onKeyDown && _onKeyDown(e);
      },
      type: "button"
    }), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      className: "rbt-close-content"
    }, "\xD7"), /*#__PURE__*/React.createElement("span", {
      className: "sr-only visually-hidden"
    }, label));
  };

  var Loader = function Loader(_ref) {
    var _ref$label = _ref.label,
      label = _ref$label === undefined ? 'Loading...' : _ref$label;
    return /*#__PURE__*/React.createElement("div", {
      className: "rbt-loader spinner-border spinner-border-sm",
      role: "status"
    }, /*#__PURE__*/React.createElement("span", {
      className: "sr-only visually-hidden"
    }, label));
  };

  var _excluded$8 = ["active", "children", "className", "onRemove", "tabIndex"],
    _excluded2 = ["children", "option", "readOnly"],
    _excluded3 = ["ref"];
  var InteractiveToken = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
    var active = _ref.active,
      children = _ref.children,
      className = _ref.className,
      onRemove = _ref.onRemove,
      tabIndex = _ref.tabIndex,
      props = _objectWithoutProperties(_ref, _excluded$8);
    return /*#__PURE__*/React.createElement("div", _extends({}, props, {
      className: cx('rbt-token', 'rbt-token-removeable', {
        'rbt-token-active': !!active
      }, className),
      ref: ref,
      tabIndex: tabIndex || 0
    }), children, /*#__PURE__*/React.createElement(ClearButton, {
      className: "rbt-token-remove-button",
      label: "Remove",
      onClick: onRemove,
      tabIndex: -1
    }));
  });
  var StaticToken = function StaticToken(_ref2) {
    var children = _ref2.children,
      className = _ref2.className,
      disabled = _ref2.disabled,
      href = _ref2.href;
    var classnames = cx('rbt-token', {
      'rbt-token-disabled': disabled
    }, className);
    if (href && !disabled) {
      return /*#__PURE__*/React.createElement("a", {
        className: classnames,
        href: href
      }, children);
    }
    return /*#__PURE__*/React.createElement("div", {
      className: classnames
    }, children);
  };
  /**
   * Individual token component, generally displayed within the
   * `TypeaheadInputMulti` component, but can also be rendered on its own.
   */
  var Token = function Token(_ref3) {
    var children = _ref3.children,
      option = _ref3.option,
      readOnly = _ref3.readOnly,
      props = _objectWithoutProperties(_ref3, _excluded2);
    var _useToken = useToken(_objectSpread2(_objectSpread2({}, props), {}, {
        option: option
      })),
      ref = _useToken.ref,
      tokenProps = _objectWithoutProperties(_useToken, _excluded3);
    var child = /*#__PURE__*/React.createElement("div", {
      className: "rbt-token-label"
    }, children);
    return !props.disabled && !readOnly && isFunction(tokenProps.onRemove) ? /*#__PURE__*/React.createElement(InteractiveToken, _extends({}, props, tokenProps, {
      ref: ref
    }), child) : /*#__PURE__*/React.createElement(StaticToken, props, child);
  };

  var Hint = function Hint(_ref) {
    var children = _ref.children,
      className = _ref.className;
    var _useHint = useHint(),
      hintRef = _useHint.hintRef,
      hintText = _useHint.hintText;
    return /*#__PURE__*/React.createElement("div", {
      className: className,
      style: {
        display: 'flex',
        flex: 1,
        height: '100%',
        position: 'relative'
      }
    }, children, /*#__PURE__*/React.createElement("input", {
      "aria-hidden": true,
      className: "rbt-input-hint",
      ref: hintRef,
      readOnly: true,
      style: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        boxShadow: 'none',
        color: 'rgba(0, 0, 0, 0.54)',
        left: 0,
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        width: '100%'
      },
      tabIndex: -1,
      value: hintText
    }));
  };

  var Input = /*#__PURE__*/React.forwardRef(function (props, ref) {
    return /*#__PURE__*/React.createElement("input", _extends({}, props, {
      className: cx('rbt-input-main', props.className),
      ref: ref
    }));
  });

  var _excluded$7 = ["children", "className", "inputClassName", "inputRef", "referenceElementRef", "selected"];
  function TypeaheadInputMulti(props) {
    var wrapperRef = React.useRef(null);
    var inputElem = React.useRef(null);
    var _propsWithBsClassName = propsWithBsClassName(props),
      children = _propsWithBsClassName.children,
      className = _propsWithBsClassName.className,
      inputClassName = _propsWithBsClassName.inputClassName,
      inputRef = _propsWithBsClassName.inputRef,
      referenceElementRef = _propsWithBsClassName.referenceElementRef,
      selected = _propsWithBsClassName.selected,
      rest = _objectWithoutProperties(_propsWithBsClassName, _excluded$7);
    var getInputRef = React.useCallback(function (input) {
      inputElem.current = input;
      inputRef(input);
    }, [inputRef]);

    /**
     * Forward click or focus events on the container element to the input.
     */
    function handleContainerClickOrFocus(e) {
      // Don't focus the input if it's disabled.
      if (props.disabled) {
        e.currentTarget.blur();
        return;
      }
      var inputNode = inputElem.current;
      if (!inputNode ||
      // Ignore if the clicked element is a child of the container, ie: a token
      // or the input itself.
      e.currentTarget.contains(e.target) && e.currentTarget !== e.target) {
        return;
      }
      if (isSelectable(inputNode)) {
        // Move cursor to the end if the user clicks outside the actual input.
        inputNode.selectionStart = inputNode.value.length;
      }
      inputNode.focus();
    }
    function handleKeyDown(e) {
      if (e.key === 'Backspace' && selected.length && !props.value) {
        var _wrapperRef$current;
        // Prevent browser from going back.
        e.preventDefault();

        // If the input is selected and there is no text, focus the last
        // token when the user hits backspace.

        var wrapperChildren = (_wrapperRef$current = wrapperRef.current) === null || _wrapperRef$current === undefined ? undefined : _wrapperRef$current.children;
        if (wrapperChildren !== null && wrapperChildren !== undefined && wrapperChildren.length) {
          var lastToken = wrapperChildren[wrapperChildren.length - 2];
          lastToken === null || lastToken === undefined || lastToken.focus();
        }
      }
      props.onKeyDown && props.onKeyDown(e);
    }
    return /*#__PURE__*/React.createElement("div", {
      className: cx('rbt-input-multi', {
        disabled: props.disabled
      }, className),
      onClick: handleContainerClickOrFocus,
      onFocus: handleContainerClickOrFocus,
      ref: referenceElementRef,
      tabIndex: -1
    }, /*#__PURE__*/React.createElement("div", {
      className: "rbt-input-wrapper",
      ref: wrapperRef
    }, children, /*#__PURE__*/React.createElement(Hint, null, /*#__PURE__*/React.createElement(Input, _extends({}, rest, {
      className: inputClassName,
      onKeyDown: handleKeyDown,
      ref: getInputRef,
      style: {
        backgroundColor: 'transparent',
        border: 0,
        boxShadow: 'none',
        cursor: 'inherit',
        outline: 'none',
        padding: 0,
        width: '100%',
        zIndex: 1
      }
    })))));
  }

  var _excluded$6 = ["inputRef", "referenceElementRef"];
  var TypeaheadInputSingle = function TypeaheadInputSingle(_ref) {
    var inputRef = _ref.inputRef,
      referenceElementRef = _ref.referenceElementRef,
      props = _objectWithoutProperties(_ref, _excluded$6);
    var ref = React.useCallback(function (node) {
      inputRef(node);
      referenceElementRef(node);
    }, [inputRef, referenceElementRef]);
    return /*#__PURE__*/React.createElement(Hint, null, /*#__PURE__*/React.createElement(Input, _extends({}, propsWithBsClassName(props), {
      ref: ref
    })));
  };

  /**
   * Results are already filtered by the time the component is used internally so
   * we can safely ignore case and diacritical marks for the purposes of matching.
   */
  var Highlighter = function Highlighter(_ref) {
    var children = _ref.children,
      _ref$highlightClassNa = _ref.highlightClassName,
      highlightClassName = _ref$highlightClassNa === undefined ? 'rbt-highlight-text' : _ref$highlightClassNa,
      search = _ref.search;
    if (!search || !children) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, children);
    }
    var matchCount = 0;
    var remaining = children;
    var highlighterChildren = [];
    while (remaining) {
      var bounds = getMatchBounds(remaining, search);

      // No match anywhere in the remaining string, stop.
      if (!bounds) {
        highlighterChildren.push(remaining);
        break;
      }

      // Capture the string that leads up to a match.
      var nonMatch = remaining.slice(0, bounds.start);
      if (nonMatch) {
        highlighterChildren.push(nonMatch);
      }

      // Capture the matching string.
      var match = remaining.slice(bounds.start, bounds.end);
      highlighterChildren.push(/*#__PURE__*/React.createElement("mark", {
        className: highlightClassName,
        key: matchCount
      }, match));
      matchCount += 1;

      // And if there's anything left over, continue the loop.
      remaining = remaining.slice(bounds.end);
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, highlighterChildren);
  };

  var _excluded$5 = ["active", "children", "className", "disabled", "onClick"];
  var BaseMenuItem = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
    var active = _ref.active,
      children = _ref.children,
      className = _ref.className,
      disabled = _ref.disabled,
      _onClick = _ref.onClick,
      props = _objectWithoutProperties(_ref, _excluded$5);
    return /*#__PURE__*/React.createElement("a", _extends({}, props, {
      className: cx('dropdown-item', {
        active: active,
        disabled: disabled
      }, className),
      href: props.href || '#',
      onClick: function onClick(e) {
        e.preventDefault();
        !disabled && _onClick && _onClick(e);
      },
      ref: ref
    }), children);
  });
  function MenuItem(props) {
    return /*#__PURE__*/React.createElement(BaseMenuItem, useItem(props));
  }

  var _excluded$4 = ["emptyLabel", "innerRef", "maxHeight", "style"];
  var MenuDivider = function MenuDivider() {
    return /*#__PURE__*/React.createElement("div", {
      className: "dropdown-divider",
      role: "separator"
    });
  };
  var MenuHeader = function MenuHeader(props) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
      React.createElement("div", _extends({}, props, {
        className: "dropdown-header",
        role: "heading"
      }))
    );
  };
  /**
   * Menu component that handles empty state when passed a set of results.
   */
  var Menu = function Menu(_ref) {
    var _ref$emptyLabel = _ref.emptyLabel,
      emptyLabel = _ref$emptyLabel === undefined ? 'No matches found.' : _ref$emptyLabel,
      innerRef = _ref.innerRef,
      _ref$maxHeight = _ref.maxHeight,
      maxHeight = _ref$maxHeight === undefined ? '300px' : _ref$maxHeight,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, _excluded$4);
    var children = React.Children.count(props.children) === 0 ? /*#__PURE__*/React.createElement(BaseMenuItem, {
      disabled: true,
      role: "option"
    }, emptyLabel) : props.children;
    return /*#__PURE__*/ /* eslint-disable jsx-a11y/interactive-supports-focus */React.createElement("div", _extends({}, props, {
      "aria-label": props['aria-label'] || 'menu-options',
      className: cx('rbt-menu', 'dropdown-menu', 'show', props.className),
      onMouseDown:
      // Prevent input from blurring when clicking on the menu scrollbar.
      preventInputBlur,
      ref: innerRef,
      role: "listbox",
      style: _objectSpread2(_objectSpread2({}, style), {}, {
        display: 'block',
        maxHeight: maxHeight,
        overflow: 'auto'
      })
    }), children)
    /* eslint-enable jsx-a11y/interactive-supports-focus */;
  };
  Menu.Divider = MenuDivider;
  Menu.Header = MenuHeader;

  var _excluded$3 = ["labelKey", "newSelectionPrefix", "onItemSelect", "onPaginate", "options", "paginationText", "renderMenuItemChildren", "text"];
  function defaultRenderMenuItemChildren(option, props) {
    return /*#__PURE__*/React.createElement(Highlighter, {
      search: props.text
    }, getOptionLabel(option, props.labelKey));
  }
  var TypeaheadMenu = function TypeaheadMenu(props) {
    var labelKey = props.labelKey,
      _props$newSelectionPr = props.newSelectionPrefix,
      newSelectionPrefix = _props$newSelectionPr === undefined ? 'New selection: ' : _props$newSelectionPr,
      onItemSelect = props.onItemSelect,
      onPaginate = props.onPaginate,
      options = props.options,
      _props$paginationText = props.paginationText,
      paginationText = _props$paginationText === undefined ? 'Display additional results...' : _props$paginationText,
      _props$renderMenuItem = props.renderMenuItemChildren,
      renderMenuItemChildren = _props$renderMenuItem === undefined ? defaultRenderMenuItemChildren : _props$renderMenuItem,
      text = props.text,
      menuProps = _objectWithoutProperties(props, _excluded$3);
    var renderMenuItem = function renderMenuItem(option, position) {
      var label = getOptionLabel(option, labelKey);
      var menuItemProps = {
        disabled: !!getOptionProperty(option, 'disabled'),
        label: label,
        onClick: function onClick(e) {
          return onItemSelect(option, e);
        },
        option: option,
        position: position
      };
      if (getOptionProperty(option, 'customOption')) {
        return /*#__PURE__*/React.createElement(MenuItem, _extends({}, menuItemProps, {
          className: "rbt-menu-custom-option",
          key: position,
          label: label
        }), newSelectionPrefix, /*#__PURE__*/React.createElement(Highlighter, {
          search: text
        }, label));
      }
      if (getOptionProperty(option, 'paginationOption')) {
        return /*#__PURE__*/React.createElement(React.Fragment, {
          key: "pagination-option-divider"
        }, /*#__PURE__*/React.createElement(Menu.Divider, null), /*#__PURE__*/React.createElement(MenuItem, _extends({}, menuItemProps, {
          className: "rbt-menu-pagination-option",
          label:
          // TODO: Fix how (aria-)labels are passed to `MenuItem`.
          // `paginationText` can be a ReactNode.
          isString(paginationText) ? paginationText : '',
          onClick: onPaginate
        }), paginationText));
      }
      return /*#__PURE__*/React.createElement(MenuItem, _extends({}, menuItemProps, {
        key: position
      }), renderMenuItemChildren(option, props, position));
    };
    return /*#__PURE__*/React.createElement(Menu, _extends({}, menuProps, {
      key:
      // Force a re-render if the text changes to ensure that menu
      // positioning updates correctly.
      text
    }), options.map(renderMenuItem));
  };

  var _excluded$2 = ["isMenuShown", "labelKey", "maxResults", "paginate", "text"];
  function usePagination(_ref) {
    var isMenuShown = _ref.isMenuShown,
      labelKey = _ref.labelKey,
      maxResults = _ref.maxResults,
      paginate = _ref.paginate,
      text = _ref.text,
      props = _objectWithoutProperties(_ref, _excluded$2);
    var results = _toConsumableArray(props.results);
    var _useState = React.useState(maxResults),
      _useState2 = _slicedToArray(_useState, 2),
      shownResults = _useState2[0],
      setShownResults = _useState2[1];

    // Reset shown results when the menu closes or the input text changes
    React.useEffect(function () {
      setShownResults(maxResults);
    }, [isMenuShown, maxResults, text]);
    function onPaginate(e) {
      setShownResults(function (prevShownResults) {
        var _props$onPaginate;
        var newShownResults = prevShownResults + maxResults;
        (_props$onPaginate = props.onPaginate) === null || _props$onPaginate === undefined || _props$onPaginate.call(props, e, newShownResults);
        return newShownResults;
      });
    }

    // This must come before results are truncated.
    var shouldPaginate = paginate && results.length > shownResults;
    results = getTruncatedOptions(results, shownResults);

    // Add the pagination item if necessary.
    if (shouldPaginate) {
      results.push(_defineProperty(_defineProperty({}, getStringLabelKey(labelKey), ''), "paginationOption", true));
    }
    return {
      onPaginate: onPaginate,
      results: results
    };
  }

  var _excluded$1 = ["context"];
  var defaultRenderMenu = function defaultRenderMenu(results, menuProps, props) {
    return /*#__PURE__*/React.createElement(TypeaheadMenu, _extends({}, menuProps, {
      labelKey: props.labelKey,
      options: results,
      text: props.text
    }));
  };
  var defaultRenderToken = function defaultRenderToken(option, props, idx) {
    return /*#__PURE__*/React.createElement(Token, {
      disabled: props.disabled,
      key: idx,
      onRemove: props.onRemove,
      option: option,
      tabIndex: props.tabIndex
    }, getOptionLabel(option, props.labelKey));
  };
  var Typeahead = /*#__PURE__*/React.forwardRef(function (props, ref) {
    var _useTypeahead = useTypeahead(props, ref),
      context = _useTypeahead.context,
      rest = _objectWithoutProperties(_useTypeahead, _excluded$1);
    var children = props.children,
      clearButton = props.clearButton,
      disabled = props.disabled,
      emptyLabel = props.emptyLabel,
      isLoading = props.isLoading,
      isInvalid = props.isInvalid,
      isValid = props.isValid,
      maxHeight = props.maxHeight,
      _props$maxResults = props.maxResults,
      maxResults = _props$maxResults === undefined ? 100 : _props$maxResults,
      multiple = props.multiple,
      newSelectionPrefix = props.newSelectionPrefix,
      _props$paginate = props.paginate,
      paginate = _props$paginate === undefined ? true : _props$paginate,
      paginationText = props.paginationText,
      placeholder = props.placeholder,
      renderMenuItemChildren = props.renderMenuItemChildren,
      size = props.size;
    var getInputProps = rest.getInputProps,
      getMenuProps = rest.getMenuProps,
      isMenuShown = rest.isMenuShown,
      labelKey = rest.labelKey,
      onClear = rest.onClear,
      onItemSelect = rest.onItemSelect,
      onRemove = rest.onRemove,
      selected = rest.selected,
      text = rest.text;
    var _usePagination = usePagination({
        isMenuShown: isMenuShown,
        labelKey: labelKey,
        maxResults: maxResults,
        onPaginate: props.onPaginate,
        paginate: paginate,
        results: rest.results,
        text: text
      }),
      onPaginate = _usePagination.onPaginate,
      results = _usePagination.results;
    var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      referenceElement = _useState2[0],
      setReferenceElement = _useState2[1];

    // Menu
    var overlayProps = useOverlay(referenceElement, props);
    var renderMenu = props.renderMenu || defaultRenderMenu;
    var menuProps = _objectSpread2(_objectSpread2({
      emptyLabel: emptyLabel,
      maxHeight: maxHeight,
      newSelectionPrefix: newSelectionPrefix,
      onItemSelect: onItemSelect,
      onPaginate: onPaginate,
      paginationText: paginationText,
      renderMenuItemChildren: renderMenuItemChildren
    }, overlayProps), getMenuProps());
    function renderInput() {
      // TODO: Add warnings for conflicting input props.
      var inputProps = _objectSpread2(_objectSpread2({}, getInputProps(_objectSpread2(_objectSpread2({}, props.inputProps), {}, {
        disabled: disabled,
        placeholder: placeholder
      }))), {}, {
        referenceElementRef: setReferenceElement
      });
      if (props.renderInput) {
        return props.renderInput(inputProps, rest);
      }
      var commonProps = _objectSpread2(_objectSpread2({}, inputProps), {}, {
        isInvalid: isInvalid,
        isValid: isValid,
        size: size
      });
      if (!multiple) {
        return /*#__PURE__*/React.createElement(TypeaheadInputSingle, commonProps);
      }
      var renderToken = props.renderToken || defaultRenderToken;
      var tokenProps = _objectSpread2(_objectSpread2({}, commonProps), {}, {
        labelKey: labelKey,
        onRemove: onRemove
      });
      return /*#__PURE__*/React.createElement(TypeaheadInputMulti, _extends({}, commonProps, {
        placeholder: selected.length ? '' : inputProps.placeholder,
        selected: selected
      }), selected.map(function (option, idx) {
        return renderToken(option, tokenProps, idx);
      }));
    }
    var auxContent;
    if (isLoading) {
      auxContent = /*#__PURE__*/React.createElement(Loader, null);
    } else if (clearButton && !disabled && selected !== null && selected !== undefined && selected.length) {
      auxContent = /*#__PURE__*/React.createElement(ClearButton, {
        onClick: onClear,
        onMouseDown: preventInputBlur,
        size: size
      });
    }
    return /*#__PURE__*/React.createElement(TypeaheadContext.Provider, {
      value: context
    }, /*#__PURE__*/React.createElement("div", {
      className: cx('rbt', {
        'has-aux': !!auxContent,
        'is-invalid': isInvalid,
        'is-valid': isValid
      }, props.className),
      style: _objectSpread2(_objectSpread2({}, props.style), {}, {
        outline: 'none',
        position: 'relative'
      }),
      tabIndex: -1
    }, renderInput(), isMenuShown && renderMenu(results, menuProps, rest), auxContent && /*#__PURE__*/React.createElement("div", {
      className: cx('rbt-aux', {
        'rbt-aux-lg': isSizeLarge(size)
      })
    }, auxContent), isFunction(children) ? children(rest) : children));
  });

  var _excluded = ["query"];
  var AsyncTypeahead = /*#__PURE__*/React.forwardRef(function (props, ref) {
    var emptyLabel = props.emptyLabel,
      isLoading = props.isLoading,
      _props$promptText = props.promptText,
      promptText = _props$promptText === undefined ? 'Type to search...' : _props$promptText,
      _props$searchText = props.searchText,
      searchText = _props$searchText === undefined ? 'Searching...' : _props$searchText;
    var _useAsync = useAsync(props),
      query = _useAsync.query,
      asyncProps = _objectWithoutProperties(_useAsync, _excluded);
    function getEmptyLabel() {
      if (!query.length) {
        return promptText;
      }
      if (isLoading) {
        return searchText;
      }
      return emptyLabel;
    }
    return /*#__PURE__*/React.createElement(Typeahead, _extends({}, props, asyncProps, {
      emptyLabel: getEmptyLabel(),
      ref: ref
    }));
  });

  exports.AsyncTypeahead = AsyncTypeahead;
  exports.BaseMenuItem = BaseMenuItem;
  exports.ClearButton = ClearButton;
  exports.Highlighter = Highlighter;
  exports.Hint = Hint;
  exports.Input = Input;
  exports.Loader = Loader;
  exports.Menu = Menu;
  exports.MenuItem = MenuItem;
  exports.Token = Token;
  exports.Typeahead = Typeahead;
  exports.TypeaheadInputMulti = TypeaheadInputMulti;
  exports.TypeaheadInputSingle = TypeaheadInputSingle;
  exports.TypeaheadMenu = TypeaheadMenu;
  exports.useAsync = useAsync;
  exports.useHint = useHint;
  exports.useItem = useItem;
  exports.useOverlay = useOverlay;
  exports.useToken = useToken;

}));
