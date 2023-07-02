(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactBootstrapTypeahead = {}, global.React, global.ReactDOM));
})(this, (function (exports, React, ReactDOM) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
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
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var React__namespace = /*#__PURE__*/_interopNamespace(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

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
  function debounce$1(func, wait, options) {
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

  var lodash_debounce = debounce$1;

  var propTypes$b = {exports: {}};

  var reactIs = {exports: {}};

  var reactIs_development = {};

  /** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var hasRequiredReactIs_development;

  function requireReactIs_development () {
  	if (hasRequiredReactIs_development) return reactIs_development;
  	hasRequiredReactIs_development = 1;



  	{
  	  (function() {

  	// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  	// nor polyfill, then a plain number is used for performance.
  	var hasSymbol = typeof Symbol === 'function' && Symbol.for;
  	var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  	var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
  	var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  	var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
  	var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
  	var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
  	var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
  	// (unstable) APIs that have been removed. Can we remove the symbols?

  	var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
  	var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
  	var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
  	var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
  	var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
  	var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
  	var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
  	var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
  	var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
  	var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
  	var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

  	function isValidElementType(type) {
  	  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  	  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
  	}

  	function typeOf(object) {
  	  if (typeof object === 'object' && object !== null) {
  	    var $$typeof = object.$$typeof;

  	    switch ($$typeof) {
  	      case REACT_ELEMENT_TYPE:
  	        var type = object.type;

  	        switch (type) {
  	          case REACT_ASYNC_MODE_TYPE:
  	          case REACT_CONCURRENT_MODE_TYPE:
  	          case REACT_FRAGMENT_TYPE:
  	          case REACT_PROFILER_TYPE:
  	          case REACT_STRICT_MODE_TYPE:
  	          case REACT_SUSPENSE_TYPE:
  	            return type;

  	          default:
  	            var $$typeofType = type && type.$$typeof;

  	            switch ($$typeofType) {
  	              case REACT_CONTEXT_TYPE:
  	              case REACT_FORWARD_REF_TYPE:
  	              case REACT_LAZY_TYPE:
  	              case REACT_MEMO_TYPE:
  	              case REACT_PROVIDER_TYPE:
  	                return $$typeofType;

  	              default:
  	                return $$typeof;
  	            }

  	        }

  	      case REACT_PORTAL_TYPE:
  	        return $$typeof;
  	    }
  	  }

  	  return undefined;
  	} // AsyncMode is deprecated along with isAsyncMode

  	var AsyncMode = REACT_ASYNC_MODE_TYPE;
  	var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  	var ContextConsumer = REACT_CONTEXT_TYPE;
  	var ContextProvider = REACT_PROVIDER_TYPE;
  	var Element = REACT_ELEMENT_TYPE;
  	var ForwardRef = REACT_FORWARD_REF_TYPE;
  	var Fragment = REACT_FRAGMENT_TYPE;
  	var Lazy = REACT_LAZY_TYPE;
  	var Memo = REACT_MEMO_TYPE;
  	var Portal = REACT_PORTAL_TYPE;
  	var Profiler = REACT_PROFILER_TYPE;
  	var StrictMode = REACT_STRICT_MODE_TYPE;
  	var Suspense = REACT_SUSPENSE_TYPE;
  	var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

  	function isAsyncMode(object) {
  	  {
  	    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
  	      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

  	      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
  	    }
  	  }

  	  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
  	}
  	function isConcurrentMode(object) {
  	  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
  	}
  	function isContextConsumer(object) {
  	  return typeOf(object) === REACT_CONTEXT_TYPE;
  	}
  	function isContextProvider(object) {
  	  return typeOf(object) === REACT_PROVIDER_TYPE;
  	}
  	function isElement(object) {
  	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  	}
  	function isForwardRef(object) {
  	  return typeOf(object) === REACT_FORWARD_REF_TYPE;
  	}
  	function isFragment(object) {
  	  return typeOf(object) === REACT_FRAGMENT_TYPE;
  	}
  	function isLazy(object) {
  	  return typeOf(object) === REACT_LAZY_TYPE;
  	}
  	function isMemo(object) {
  	  return typeOf(object) === REACT_MEMO_TYPE;
  	}
  	function isPortal(object) {
  	  return typeOf(object) === REACT_PORTAL_TYPE;
  	}
  	function isProfiler(object) {
  	  return typeOf(object) === REACT_PROFILER_TYPE;
  	}
  	function isStrictMode(object) {
  	  return typeOf(object) === REACT_STRICT_MODE_TYPE;
  	}
  	function isSuspense(object) {
  	  return typeOf(object) === REACT_SUSPENSE_TYPE;
  	}

  	reactIs_development.AsyncMode = AsyncMode;
  	reactIs_development.ConcurrentMode = ConcurrentMode;
  	reactIs_development.ContextConsumer = ContextConsumer;
  	reactIs_development.ContextProvider = ContextProvider;
  	reactIs_development.Element = Element;
  	reactIs_development.ForwardRef = ForwardRef;
  	reactIs_development.Fragment = Fragment;
  	reactIs_development.Lazy = Lazy;
  	reactIs_development.Memo = Memo;
  	reactIs_development.Portal = Portal;
  	reactIs_development.Profiler = Profiler;
  	reactIs_development.StrictMode = StrictMode;
  	reactIs_development.Suspense = Suspense;
  	reactIs_development.isAsyncMode = isAsyncMode;
  	reactIs_development.isConcurrentMode = isConcurrentMode;
  	reactIs_development.isContextConsumer = isContextConsumer;
  	reactIs_development.isContextProvider = isContextProvider;
  	reactIs_development.isElement = isElement;
  	reactIs_development.isForwardRef = isForwardRef;
  	reactIs_development.isFragment = isFragment;
  	reactIs_development.isLazy = isLazy;
  	reactIs_development.isMemo = isMemo;
  	reactIs_development.isPortal = isPortal;
  	reactIs_development.isProfiler = isProfiler;
  	reactIs_development.isStrictMode = isStrictMode;
  	reactIs_development.isSuspense = isSuspense;
  	reactIs_development.isValidElementType = isValidElementType;
  	reactIs_development.typeOf = typeOf;
  	  })();
  	}
  	return reactIs_development;
  }

  var hasRequiredReactIs;

  function requireReactIs () {
  	if (hasRequiredReactIs) return reactIs.exports;
  	hasRequiredReactIs = 1;
  	(function (module) {

  		{
  		  module.exports = requireReactIs_development();
  		}
  } (reactIs));
  	return reactIs.exports;
  }

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */

  var objectAssign;
  var hasRequiredObjectAssign;

  function requireObjectAssign () {
  	if (hasRequiredObjectAssign) return objectAssign;
  	hasRequiredObjectAssign = 1;
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
  			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
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
  			if (Object.keys(Object.assign({}, test3)).join('') !==
  					'abcdefghijklmnopqrst') {
  				return false;
  			}

  			return true;
  		} catch (err) {
  			// We don't expect any of the above to throw, but better to be safe.
  			return false;
  		}
  	}

  	objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
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
  	return objectAssign;
  }

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactPropTypesSecret_1;
  var hasRequiredReactPropTypesSecret;

  function requireReactPropTypesSecret () {
  	if (hasRequiredReactPropTypesSecret) return ReactPropTypesSecret_1;
  	hasRequiredReactPropTypesSecret = 1;

  	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  	ReactPropTypesSecret_1 = ReactPropTypesSecret;
  	return ReactPropTypesSecret_1;
  }

  var has;
  var hasRequiredHas;

  function requireHas () {
  	if (hasRequiredHas) return has;
  	hasRequiredHas = 1;
  	has = Function.call.bind(Object.prototype.hasOwnProperty);
  	return has;
  }

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var checkPropTypes_1;
  var hasRequiredCheckPropTypes;

  function requireCheckPropTypes () {
  	if (hasRequiredCheckPropTypes) return checkPropTypes_1;
  	hasRequiredCheckPropTypes = 1;

  	var printWarning = function() {};

  	{
  	  var ReactPropTypesSecret = requireReactPropTypesSecret();
  	  var loggedTypeFailures = {};
  	  var has = requireHas();

  	  printWarning = function(text) {
  	    var message = 'Warning: ' + text;
  	    if (typeof console !== 'undefined') {
  	      console.error(message);
  	    }
  	    try {
  	      // --- Welcome to debugging React ---
  	      // This error was thrown as a convenience so that you can use this stack
  	      // to find the callsite that caused this warning to fire.
  	      throw new Error(message);
  	    } catch (x) { /**/ }
  	  };
  	}

  	/**
  	 * Assert that the values match with the type specs.
  	 * Error messages are memorized and will only be shown once.
  	 *
  	 * @param {object} typeSpecs Map of name to a ReactPropType
  	 * @param {object} values Runtime values that need to be type-checked
  	 * @param {string} location e.g. "prop", "context", "child context"
  	 * @param {string} componentName Name of the component for error messages.
  	 * @param {?Function} getStack Returns the component stack.
  	 * @private
  	 */
  	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  	  {
  	    for (var typeSpecName in typeSpecs) {
  	      if (has(typeSpecs, typeSpecName)) {
  	        var error;
  	        // Prop type validation may throw. In case they do, we don't want to
  	        // fail the render phase where it didn't fail before. So we log it.
  	        // After these have been cleaned up, we'll let them throw.
  	        try {
  	          // This is intentionally an invariant that gets caught. It's the same
  	          // behavior as without this statement except with a better message.
  	          if (typeof typeSpecs[typeSpecName] !== 'function') {
  	            var err = Error(
  	              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
  	              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
  	              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
  	            );
  	            err.name = 'Invariant Violation';
  	            throw err;
  	          }
  	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
  	        } catch (ex) {
  	          error = ex;
  	        }
  	        if (error && !(error instanceof Error)) {
  	          printWarning(
  	            (componentName || 'React class') + ': type specification of ' +
  	            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
  	            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
  	            'You may have forgotten to pass an argument to the type checker ' +
  	            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
  	            'shape all require an argument).'
  	          );
  	        }
  	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
  	          // Only monitor this failure once because there tends to be a lot of the
  	          // same error.
  	          loggedTypeFailures[error.message] = true;

  	          var stack = getStack ? getStack() : '';

  	          printWarning(
  	            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
  	          );
  	        }
  	      }
  	    }
  	  }
  	}

  	/**
  	 * Resets warning cache when testing.
  	 *
  	 * @private
  	 */
  	checkPropTypes.resetWarningCache = function() {
  	  {
  	    loggedTypeFailures = {};
  	  }
  	};

  	checkPropTypes_1 = checkPropTypes;
  	return checkPropTypes_1;
  }

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var factoryWithTypeCheckers;
  var hasRequiredFactoryWithTypeCheckers;

  function requireFactoryWithTypeCheckers () {
  	if (hasRequiredFactoryWithTypeCheckers) return factoryWithTypeCheckers;
  	hasRequiredFactoryWithTypeCheckers = 1;

  	var ReactIs = requireReactIs();
  	var assign = requireObjectAssign();

  	var ReactPropTypesSecret = requireReactPropTypesSecret();
  	var has = requireHas();
  	var checkPropTypes = requireCheckPropTypes();

  	var printWarning = function() {};

  	{
  	  printWarning = function(text) {
  	    var message = 'Warning: ' + text;
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
  	}

  	function emptyFunctionThatReturnsNull() {
  	  return null;
  	}

  	factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  	  /* global Symbol */
  	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  	  /**
  	   * Returns the iterator method function contained on the iterable object.
  	   *
  	   * Be sure to invoke the function with the iterable as context:
  	   *
  	   *     var iteratorFn = getIteratorFn(myIterable);
  	   *     if (iteratorFn) {
  	   *       var iterator = iteratorFn.call(myIterable);
  	   *       ...
  	   *     }
  	   *
  	   * @param {?object} maybeIterable
  	   * @return {?function}
  	   */
  	  function getIteratorFn(maybeIterable) {
  	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  	    if (typeof iteratorFn === 'function') {
  	      return iteratorFn;
  	    }
  	  }

  	  /**
  	   * Collection of methods that allow declaration and validation of props that are
  	   * supplied to React components. Example usage:
  	   *
  	   *   var Props = require('ReactPropTypes');
  	   *   var MyArticle = React.createClass({
  	   *     propTypes: {
  	   *       // An optional string prop named "description".
  	   *       description: Props.string,
  	   *
  	   *       // A required enum prop named "category".
  	   *       category: Props.oneOf(['News','Photos']).isRequired,
  	   *
  	   *       // A prop named "dialog" that requires an instance of Dialog.
  	   *       dialog: Props.instanceOf(Dialog).isRequired
  	   *     },
  	   *     render: function() { ... }
  	   *   });
  	   *
  	   * A more formal specification of how these methods are used:
  	   *
  	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
  	   *   decl := ReactPropTypes.{type}(.isRequired)?
  	   *
  	   * Each and every declaration produces a function with the same signature. This
  	   * allows the creation of custom validation functions. For example:
  	   *
  	   *  var MyLink = React.createClass({
  	   *    propTypes: {
  	   *      // An optional string or URI prop named "href".
  	   *      href: function(props, propName, componentName) {
  	   *        var propValue = props[propName];
  	   *        if (propValue != null && typeof propValue !== 'string' &&
  	   *            !(propValue instanceof URI)) {
  	   *          return new Error(
  	   *            'Expected a string or an URI for ' + propName + ' in ' +
  	   *            componentName
  	   *          );
  	   *        }
  	   *      }
  	   *    },
  	   *    render: function() {...}
  	   *  });
  	   *
  	   * @internal
  	   */

  	  var ANONYMOUS = '<<anonymous>>';

  	  // Important!
  	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  	  var ReactPropTypes = {
  	    array: createPrimitiveTypeChecker('array'),
  	    bigint: createPrimitiveTypeChecker('bigint'),
  	    bool: createPrimitiveTypeChecker('boolean'),
  	    func: createPrimitiveTypeChecker('function'),
  	    number: createPrimitiveTypeChecker('number'),
  	    object: createPrimitiveTypeChecker('object'),
  	    string: createPrimitiveTypeChecker('string'),
  	    symbol: createPrimitiveTypeChecker('symbol'),

  	    any: createAnyTypeChecker(),
  	    arrayOf: createArrayOfTypeChecker,
  	    element: createElementTypeChecker(),
  	    elementType: createElementTypeTypeChecker(),
  	    instanceOf: createInstanceTypeChecker,
  	    node: createNodeChecker(),
  	    objectOf: createObjectOfTypeChecker,
  	    oneOf: createEnumTypeChecker,
  	    oneOfType: createUnionTypeChecker,
  	    shape: createShapeTypeChecker,
  	    exact: createStrictShapeTypeChecker,
  	  };

  	  /**
  	   * inlined Object.is polyfill to avoid requiring consumers ship their own
  	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
  	   */
  	  /*eslint-disable no-self-compare*/
  	  function is(x, y) {
  	    // SameValue algorithm
  	    if (x === y) {
  	      // Steps 1-5, 7-10
  	      // Steps 6.b-6.e: +0 != -0
  	      return x !== 0 || 1 / x === 1 / y;
  	    } else {
  	      // Step 6.a: NaN == NaN
  	      return x !== x && y !== y;
  	    }
  	  }
  	  /*eslint-enable no-self-compare*/

  	  /**
  	   * We use an Error-like object for backward compatibility as people may call
  	   * PropTypes directly and inspect their output. However, we don't use real
  	   * Errors anymore. We don't inspect their stack anyway, and creating them
  	   * is prohibitively expensive if they are created too often, such as what
  	   * happens in oneOfType() for any type before the one that matched.
  	   */
  	  function PropTypeError(message, data) {
  	    this.message = message;
  	    this.data = data && typeof data === 'object' ? data: {};
  	    this.stack = '';
  	  }
  	  // Make `instanceof Error` still work for returned errors.
  	  PropTypeError.prototype = Error.prototype;

  	  function createChainableTypeChecker(validate) {
  	    {
  	      var manualPropTypeCallCache = {};
  	      var manualPropTypeWarningCount = 0;
  	    }
  	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
  	      componentName = componentName || ANONYMOUS;
  	      propFullName = propFullName || propName;

  	      if (secret !== ReactPropTypesSecret) {
  	        if (throwOnDirectAccess) {
  	          // New behavior only for users of `prop-types` package
  	          var err = new Error(
  	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
  	            'Use `PropTypes.checkPropTypes()` to call them. ' +
  	            'Read more at http://fb.me/use-check-prop-types'
  	          );
  	          err.name = 'Invariant Violation';
  	          throw err;
  	        } else if (typeof console !== 'undefined') {
  	          // Old behavior for people using React.PropTypes
  	          var cacheKey = componentName + ':' + propName;
  	          if (
  	            !manualPropTypeCallCache[cacheKey] &&
  	            // Avoid spamming the console because they are often not actionable except for lib authors
  	            manualPropTypeWarningCount < 3
  	          ) {
  	            printWarning(
  	              'You are manually calling a React.PropTypes validation ' +
  	              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
  	              'and will throw in the standalone `prop-types` package. ' +
  	              'You may be seeing this warning due to a third-party PropTypes ' +
  	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
  	            );
  	            manualPropTypeCallCache[cacheKey] = true;
  	            manualPropTypeWarningCount++;
  	          }
  	        }
  	      }
  	      if (props[propName] == null) {
  	        if (isRequired) {
  	          if (props[propName] === null) {
  	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
  	          }
  	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
  	        }
  	        return null;
  	      } else {
  	        return validate(props, propName, componentName, location, propFullName);
  	      }
  	    }

  	    var chainedCheckType = checkType.bind(null, false);
  	    chainedCheckType.isRequired = checkType.bind(null, true);

  	    return chainedCheckType;
  	  }

  	  function createPrimitiveTypeChecker(expectedType) {
  	    function validate(props, propName, componentName, location, propFullName, secret) {
  	      var propValue = props[propName];
  	      var propType = getPropType(propValue);
  	      if (propType !== expectedType) {
  	        // `propValue` being instance of, say, date/regexp, pass the 'object'
  	        // check, but we can offer a more precise error message here rather than
  	        // 'of type `object`'.
  	        var preciseType = getPreciseType(propValue);

  	        return new PropTypeError(
  	          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
  	          {expectedType: expectedType}
  	        );
  	      }
  	      return null;
  	    }
  	    return createChainableTypeChecker(validate);
  	  }

  	  function createAnyTypeChecker() {
  	    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  	  }

  	  function createArrayOfTypeChecker(typeChecker) {
  	    function validate(props, propName, componentName, location, propFullName) {
  	      if (typeof typeChecker !== 'function') {
  	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
  	      }
  	      var propValue = props[propName];
  	      if (!Array.isArray(propValue)) {
  	        var propType = getPropType(propValue);
  	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
  	      }
  	      for (var i = 0; i < propValue.length; i++) {
  	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
  	        if (error instanceof Error) {
  	          return error;
  	        }
  	      }
  	      return null;
  	    }
  	    return createChainableTypeChecker(validate);
  	  }

  	  function createElementTypeChecker() {
  	    function validate(props, propName, componentName, location, propFullName) {
  	      var propValue = props[propName];
  	      if (!isValidElement(propValue)) {
  	        var propType = getPropType(propValue);
  	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
  	      }
  	      return null;
  	    }
  	    return createChainableTypeChecker(validate);
  	  }

  	  function createElementTypeTypeChecker() {
  	    function validate(props, propName, componentName, location, propFullName) {
  	      var propValue = props[propName];
  	      if (!ReactIs.isValidElementType(propValue)) {
  	        var propType = getPropType(propValue);
  	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
  	      }
  	      return null;
  	    }
  	    return createChainableTypeChecker(validate);
  	  }

  	  function createInstanceTypeChecker(expectedClass) {
  	    function validate(props, propName, componentName, location, propFullName) {
  	      if (!(props[propName] instanceof expectedClass)) {
  	        var expectedClassName = expectedClass.name || ANONYMOUS;
  	        var actualClassName = getClassName(props[propName]);
  	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
  	      }
  	      return null;
  	    }
  	    return createChainableTypeChecker(validate);
  	  }

  	  function createEnumTypeChecker(expectedValues) {
  	    if (!Array.isArray(expectedValues)) {
  	      {
  	        if (arguments.length > 1) {
  	          printWarning(
  	            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
  	            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
  	          );
  	        } else {
  	          printWarning('Invalid argument supplied to oneOf, expected an array.');
  	        }
  	      }
  	      return emptyFunctionThatReturnsNull;
  	    }

  	    function validate(props, propName, componentName, location, propFullName) {
  	      var propValue = props[propName];
  	      for (var i = 0; i < expectedValues.length; i++) {
  	        if (is(propValue, expectedValues[i])) {
  	          return null;
  	        }
  	      }

  	      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
  	        var type = getPreciseType(value);
  	        if (type === 'symbol') {
  	          return String(value);
  	        }
  	        return value;
  	      });
  	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
  	    }
  	    return createChainableTypeChecker(validate);
  	  }

  	  function createObjectOfTypeChecker(typeChecker) {
  	    function validate(props, propName, componentName, location, propFullName) {
  	      if (typeof typeChecker !== 'function') {
  	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
  	      }
  	      var propValue = props[propName];
  	      var propType = getPropType(propValue);
  	      if (propType !== 'object') {
  	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
  	      }
  	      for (var key in propValue) {
  	        if (has(propValue, key)) {
  	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
  	          if (error instanceof Error) {
  	            return error;
  	          }
  	        }
  	      }
  	      return null;
  	    }
  	    return createChainableTypeChecker(validate);
  	  }

  	  function createUnionTypeChecker(arrayOfTypeCheckers) {
  	    if (!Array.isArray(arrayOfTypeCheckers)) {
  	      printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') ;
  	      return emptyFunctionThatReturnsNull;
  	    }

  	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
  	      var checker = arrayOfTypeCheckers[i];
  	      if (typeof checker !== 'function') {
  	        printWarning(
  	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
  	          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
  	        );
  	        return emptyFunctionThatReturnsNull;
  	      }
  	    }

  	    function validate(props, propName, componentName, location, propFullName) {
  	      var expectedTypes = [];
  	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
  	        var checker = arrayOfTypeCheckers[i];
  	        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
  	        if (checkerResult == null) {
  	          return null;
  	        }
  	        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
  	          expectedTypes.push(checkerResult.data.expectedType);
  	        }
  	      }
  	      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
  	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
  	    }
  	    return createChainableTypeChecker(validate);
  	  }

  	  function createNodeChecker() {
  	    function validate(props, propName, componentName, location, propFullName) {
  	      if (!isNode(props[propName])) {
  	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
  	      }
  	      return null;
  	    }
  	    return createChainableTypeChecker(validate);
  	  }

  	  function invalidValidatorError(componentName, location, propFullName, key, type) {
  	    return new PropTypeError(
  	      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
  	      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
  	    );
  	  }

  	  function createShapeTypeChecker(shapeTypes) {
  	    function validate(props, propName, componentName, location, propFullName) {
  	      var propValue = props[propName];
  	      var propType = getPropType(propValue);
  	      if (propType !== 'object') {
  	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
  	      }
  	      for (var key in shapeTypes) {
  	        var checker = shapeTypes[key];
  	        if (typeof checker !== 'function') {
  	          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
  	        }
  	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
  	        if (error) {
  	          return error;
  	        }
  	      }
  	      return null;
  	    }
  	    return createChainableTypeChecker(validate);
  	  }

  	  function createStrictShapeTypeChecker(shapeTypes) {
  	    function validate(props, propName, componentName, location, propFullName) {
  	      var propValue = props[propName];
  	      var propType = getPropType(propValue);
  	      if (propType !== 'object') {
  	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
  	      }
  	      // We need to check all keys in case some are required but missing from props.
  	      var allKeys = assign({}, props[propName], shapeTypes);
  	      for (var key in allKeys) {
  	        var checker = shapeTypes[key];
  	        if (has(shapeTypes, key) && typeof checker !== 'function') {
  	          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
  	        }
  	        if (!checker) {
  	          return new PropTypeError(
  	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
  	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
  	            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
  	          );
  	        }
  	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
  	        if (error) {
  	          return error;
  	        }
  	      }
  	      return null;
  	    }

  	    return createChainableTypeChecker(validate);
  	  }

  	  function isNode(propValue) {
  	    switch (typeof propValue) {
  	      case 'number':
  	      case 'string':
  	      case 'undefined':
  	        return true;
  	      case 'boolean':
  	        return !propValue;
  	      case 'object':
  	        if (Array.isArray(propValue)) {
  	          return propValue.every(isNode);
  	        }
  	        if (propValue === null || isValidElement(propValue)) {
  	          return true;
  	        }

  	        var iteratorFn = getIteratorFn(propValue);
  	        if (iteratorFn) {
  	          var iterator = iteratorFn.call(propValue);
  	          var step;
  	          if (iteratorFn !== propValue.entries) {
  	            while (!(step = iterator.next()).done) {
  	              if (!isNode(step.value)) {
  	                return false;
  	              }
  	            }
  	          } else {
  	            // Iterator will provide entry [k,v] tuples rather than values.
  	            while (!(step = iterator.next()).done) {
  	              var entry = step.value;
  	              if (entry) {
  	                if (!isNode(entry[1])) {
  	                  return false;
  	                }
  	              }
  	            }
  	          }
  	        } else {
  	          return false;
  	        }

  	        return true;
  	      default:
  	        return false;
  	    }
  	  }

  	  function isSymbol(propType, propValue) {
  	    // Native Symbol.
  	    if (propType === 'symbol') {
  	      return true;
  	    }

  	    // falsy value can't be a Symbol
  	    if (!propValue) {
  	      return false;
  	    }

  	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
  	    if (propValue['@@toStringTag'] === 'Symbol') {
  	      return true;
  	    }

  	    // Fallback for non-spec compliant Symbols which are polyfilled.
  	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
  	      return true;
  	    }

  	    return false;
  	  }

  	  // Equivalent of `typeof` but with special handling for array and regexp.
  	  function getPropType(propValue) {
  	    var propType = typeof propValue;
  	    if (Array.isArray(propValue)) {
  	      return 'array';
  	    }
  	    if (propValue instanceof RegExp) {
  	      // Old webkits (at least until Android 4.0) return 'function' rather than
  	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
  	      // passes PropTypes.object.
  	      return 'object';
  	    }
  	    if (isSymbol(propType, propValue)) {
  	      return 'symbol';
  	    }
  	    return propType;
  	  }

  	  // This handles more types than `getPropType`. Only used for error messages.
  	  // See `createPrimitiveTypeChecker`.
  	  function getPreciseType(propValue) {
  	    if (typeof propValue === 'undefined' || propValue === null) {
  	      return '' + propValue;
  	    }
  	    var propType = getPropType(propValue);
  	    if (propType === 'object') {
  	      if (propValue instanceof Date) {
  	        return 'date';
  	      } else if (propValue instanceof RegExp) {
  	        return 'regexp';
  	      }
  	    }
  	    return propType;
  	  }

  	  // Returns a string that is postfixed to a warning about an invalid type.
  	  // For example, "undefined" or "of type array"
  	  function getPostfixForTypeWarning(value) {
  	    var type = getPreciseType(value);
  	    switch (type) {
  	      case 'array':
  	      case 'object':
  	        return 'an ' + type;
  	      case 'boolean':
  	      case 'date':
  	      case 'regexp':
  	        return 'a ' + type;
  	      default:
  	        return type;
  	    }
  	  }

  	  // Returns class name of the object, if any.
  	  function getClassName(propValue) {
  	    if (!propValue.constructor || !propValue.constructor.name) {
  	      return ANONYMOUS;
  	    }
  	    return propValue.constructor.name;
  	  }

  	  ReactPropTypes.checkPropTypes = checkPropTypes;
  	  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  	  ReactPropTypes.PropTypes = ReactPropTypes;

  	  return ReactPropTypes;
  	};
  	return factoryWithTypeCheckers;
  }

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    var ReactIs = requireReactIs();

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    propTypes$b.exports = requireFactoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
  }

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
    // updates when they are stricting equal to the last state value
    var _useReducer = React.useReducer(function (state) {
      return !state;
    }, false),
        dispatch = _useReducer[1];

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
    var ref = React.useRef(null);
    React.useEffect(function () {
      ref.current = value;
    });
    return ref.current;
  }

  var ALIGN_VALUES = ['justify', 'left', 'right'];
  var DEFAULT_LABELKEY = 'label';
  var SIZES = ['lg', 'sm'];

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

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

  var invariant_1 = invariant;

  function getStringLabelKey(labelKey) {
    return typeof labelKey === 'string' ? labelKey : DEFAULT_LABELKEY;
  }

  /**
   * Check if an object has the given property in a type-safe way.
   */
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  var idCounter = 0; // eslint-disable-next-line @typescript-eslint/ban-types

  function isFunction(value) {
    return typeof value === 'function';
  }
  function isString(value) {
    return typeof value === 'string';
  } // eslint-disable-next-line @typescript-eslint/no-empty-function

  function noop$1() {}
  function pick(obj, keys) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var result = {};
    keys.forEach(function (key) {
      result[key] = obj[key];
    });
    return result;
  }
  function uniqueId(prefix) {
    idCounter += 1;
    return (prefix == null ? '' : String(prefix)) + idCounter;
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

    !isString(optionLabel) ? invariant_1(false, 'One or more options does not have a valid label string. Check the ' + '`labelKey` prop to ensure that it matches the correct option key and ' + 'provides a string for filtering and display.')  : void 0;
    return optionLabel;
  }

  function addCustomOption(results, props) {
    var allowNew = props.allowNew,
        labelKey = props.labelKey,
        text = props.text;

    if (!allowNew || !text.trim()) {
      return false;
    } // If the consumer has provided a callback, use that to determine whether or
    // not to add the custom option.


    if (isFunction(allowNew)) {
      return allowNew(results, props);
    } // By default, don't add the custom option if there is an exact text match
    // with an existing option.


    return !results.some(function (o) {
      return getOptionLabel(o, labelKey) === text;
    });
  }

  // do not edit .js files directly - edit src/index.jst



  var fastDeepEqual = function equal(a, b) {
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

  function getOptionProperty(option, key) {
    if (isString(option)) {
      return undefined;
    }

    return option[key];
  }

  /**
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * Taken from: http://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript/18391901#18391901
   */
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
  }, {}); // "what?" version ... http://jsperf.com/diacritics/12

  function stripDiacritics(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036F]/g, '') // Remove combining diacritics

    /* eslint-disable-next-line no-control-regex */
    .replace(/[^\u0000-\u007E]/g, function (a) {
      return map[a] || a;
    });
  }

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

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

  var warning_1 = warning;

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

    warning_1.apply(void 0, [falseToWarn, "[react-bootstrap-typeahead] ".concat(message)].concat(args));
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
        text = props.text; // Don't show selected options in the menu for the multi-select case.

    if (multiple && selected.some(function (o) {
      return fastDeepEqual(o, option);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
  }

  var CASE_INSENSITIVE = 'i';
  var COMBINING_MARKS = /[\u0300-\u036F]/;
  // Export for testing.
  function escapeStringRegexp(str) {
    !(typeof str === 'string') ? invariant_1(false, '`escapeStringRegexp` expected a string.')  : void 0; // Escape characters with special meaning either inside or outside character
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
    var matchLength = matches[0].length; // Account for combining marks, which changes the indices.

    if (COMBINING_MARKS.test(subject)) {
      // Starting at the beginning of the subject string, check for the number of
      // combining marks and increment the start index whenever one is found.
      for (var ii = 0; ii <= start; ii++) {
        if (COMBINING_MARKS.test(subject[ii])) {
          start += 1;
        }
      } // Similarly, increment the length of the match string if it contains a
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
    if ( // No text entered.
    !text || // The input is not focused.
    !isFocused || // The menu is hidden.
    !isMenuShown || // No item in the menu.
    !initialItem || // The initial item is a custom option.
    !isString(initialItem) && hasOwnProperty(initialItem, 'customOption') || // One of the menu items is active.
    activeIndex > -1 || // There's already a selection in single-select mode.
    !!selected.length && !multiple) {
      return '';
    }

    var initialItemStr = getOptionLabel(initialItem, labelKey);
    var bounds = getMatchBounds(initialItemStr.toLowerCase(), text.toLowerCase());

    if (!(bounds && bounds.start === 0)) {
      return '';
    } // Text matching is case- and accent-insensitive, so to display the hint
    // correctly, splice the input string with the hint string.


    return text + initialItemStr.slice(bounds.end, initialItemStr.length);
  }

  var classnames = {exports: {}};

  /*!
    Copyright (c) 2018 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  */

  (function (module) {
  	/* global define */

  	(function () {

  		var hasOwn = {}.hasOwnProperty;

  		function classNames() {
  			var classes = [];

  			for (var i = 0; i < arguments.length; i++) {
  				var arg = arguments[i];
  				if (!arg) continue;

  				var argType = typeof arg;

  				if (argType === 'string' || argType === 'number') {
  					classes.push(arg);
  				} else if (Array.isArray(arg)) {
  					if (arg.length) {
  						var inner = classNames.apply(null, arg);
  						if (inner) {
  							classes.push(inner);
  						}
  					}
  				} else if (argType === 'object') {
  					if (arg.toString === Object.prototype.toString) {
  						for (var key in arg) {
  							if (hasOwn.call(arg, key) && arg[key]) {
  								classes.push(key);
  							}
  						}
  					} else {
  						classes.push(arg.toString());
  					}
  				}
  			}

  			return classes.join(' ');
  		}

  		if (module.exports) {
  			classNames.default = classNames;
  			module.exports = classNames;
  		} else {
  			window.classNames = classNames;
  		}
  	}());
  } (classnames));

  var cx = classnames.exports;

  function getMenuItemId() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var position = arguments.length > 1 ? arguments[1] : undefined;
    return "".concat(id, "-item-").concat(position);
  }

  var _excluded$e = ["activeIndex", "id", "isFocused", "isMenuShown", "multiple", "onClick", "onFocus", "placeholder"];

  var getInputProps = function getInputProps(_ref) {
    var activeIndex = _ref.activeIndex,
        id = _ref.id,
        isFocused = _ref.isFocused,
        isMenuShown = _ref.isMenuShown,
        multiple = _ref.multiple,
        onClick = _ref.onClick,
        onFocus = _ref.onFocus,
        placeholder = _ref.placeholder,
        props = _objectWithoutProperties(_ref, _excluded$e);

    return function () {
      var _cx;

      var inputProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var className = hasOwnProperty(inputProps, 'className') ? String(inputProps.className) : undefined;
      return _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({
        // These props can be overridden by values in `inputProps`.
        autoComplete: 'off',
        placeholder: placeholder,
        type: 'text'
      }, inputProps), props), {}, {
        'aria-activedescendant': activeIndex >= 0 ? getMenuItemId(id, activeIndex) : undefined,
        'aria-autocomplete': 'both',
        'aria-expanded': isMenuShown,
        'aria-haspopup': 'listbox',
        'aria-multiselectable': multiple || undefined,
        'aria-owns': isMenuShown ? id : undefined,
        className: cx((_cx = {}, _defineProperty(_cx, className || '', !multiple), _defineProperty(_cx, "focus", isFocused), _cx))
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
    return !!option && !isString(option) && hasOwnProperty(option, 'disabled');
  }
  function skipDisabledOptions(currentIndex, key, items) {
    var newIndex = currentIndex;

    while (isDisabledOption(newIndex, items)) {
      newIndex += key === 'ArrowUp' ? -1 : 1;
    }

    return newIndex;
  }
  function getUpdatedActiveIndex(currentIndex, key, items) {
    var newIndex = currentIndex; // Increment or decrement index based on user keystroke.

    newIndex += key === 'ArrowUp' ? -1 : 1; // Skip over any disabled options.

    newIndex = skipDisabledOptions(newIndex, key, items); // If we've reached the end, go back to the beginning or vice-versa.

    if (newIndex === items.length) {
      newIndex = -1;
    } else if (newIndex === -2) {
      newIndex = items.length - 1; // Skip over any disabled options.

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

  var _excluded$d = ["className", "isInvalid", "isValid", "size"];

  /**
   * Returns Bootstrap classnames from `size` and validation props, along
   * with pass-through props.
   */
  function propsWithBsClassName(_ref) {
    var className = _ref.className,
        isInvalid = _ref.isInvalid,
        isValid = _ref.isValid,
        size = _ref.size,
        props = _objectWithoutProperties(_ref, _excluded$d);

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
  var sizeType = propTypes$b.exports.oneOf(SIZES);

  /**
   * Allows additional warnings or messaging related to prop validation.
   */
  function checkPropType(validator, callback) {
    return function (props, propName, componentName) {
      propTypes$b.exports.checkPropTypes(_defineProperty({}, propName, validator), props, 'prop', componentName);
      isFunction(callback) && callback(props, propName, componentName);
    };
  }
  function caseSensitiveType(props) {
    var caseSensitive = props.caseSensitive,
        filterBy = props.filterBy;
    warn(!caseSensitive || typeof filterBy !== 'function', 'Your `filterBy` function will override the `caseSensitive` prop.');
  }
  function defaultInputValueType(props) {
    var defaultInputValue = props.defaultInputValue,
        defaultSelected = props.defaultSelected,
        multiple = props.multiple,
        selected = props.selected;
    var name = defaultSelected.length ? 'defaultSelected' : 'selected';
    warn(!(!multiple && defaultInputValue && (defaultSelected.length || selected && selected.length)), "`defaultInputValue` will be overridden by the value from `".concat(name, "`."));
  }
  function defaultSelectedType(props) {
    var defaultSelected = props.defaultSelected,
        multiple = props.multiple;
    warn(multiple || defaultSelected.length <= 1, 'You are passing multiple options to the `defaultSelected` prop of a ' + 'Typeahead in single-select mode. The selections will be truncated to a ' + 'single selection.');
  }
  function highlightOnlyResultType(_ref) {
    var allowNew = _ref.allowNew,
        highlightOnlyResult = _ref.highlightOnlyResult;
    warn(!(highlightOnlyResult && allowNew), '`highlightOnlyResult` will not work with `allowNew`.');
  }
  function ignoreDiacriticsType(props) {
    var filterBy = props.filterBy,
        ignoreDiacritics = props.ignoreDiacritics;
    warn(ignoreDiacritics || typeof filterBy !== 'function', 'Your `filterBy` function will override the `ignoreDiacritics` prop.');
  }
  function inputPropsType(_ref2) {
    var inputProps = _ref2.inputProps;

    if (!(inputProps && Object.prototype.toString.call(inputProps) === '[object Object]')) {
      return;
    } // Blacklisted properties.


    INPUT_PROPS_BLACKLIST.forEach(function (_ref3) {
      var alt = _ref3.alt,
          prop = _ref3.prop;
      var msg = alt ? " Use the top-level `".concat(alt, "` prop instead.") : null;
      warn(!inputProps[prop], "The `".concat(prop, "` property of `inputProps` will be ignored.").concat(msg));
    });
  }
  function isRequiredForA11y(props, propName, componentName) {
    warn(props[propName] != null, "The prop `".concat(propName, "` is required to make `").concat(componentName, "` ") + 'accessible for users of assistive technologies such as screen readers.');
  }
  function labelKeyType(_ref4) {
    var allowNew = _ref4.allowNew,
        labelKey = _ref4.labelKey;
    warn(!(isFunction(labelKey) && allowNew), '`labelKey` must be a string when `allowNew={true}`.');
  }
  var optionType = propTypes$b.exports.oneOfType([propTypes$b.exports.object, propTypes$b.exports.string]);
  function selectedType(_ref5) {
    var multiple = _ref5.multiple,
        onChange = _ref5.onChange,
        selected = _ref5.selected;
    warn(multiple || !selected || selected.length <= 1, 'You are passing multiple options to the `selected` prop of a Typeahead ' + 'in single-select mode. This may lead to unexpected behaviors or errors.');
    warn(!selected || selected && isFunction(onChange), 'You provided a `selected` prop without an `onChange` handler. If you ' + 'want the typeahead to be uncontrolled, use `defaultSelected`. ' + 'Otherwise, set `onChange`.');
  }

  var _excluded$c = ["allowNew", "delay", "emptyLabel", "isLoading", "minLength", "onInputChange", "onSearch", "options", "promptText", "searchText", "useCache"];
  var propTypes$a = {
    /**
     * Delay, in milliseconds, before performing search.
     */
    delay: propTypes$b.exports.number,

    /**
     * Whether or not a request is currently pending. Necessary for the
     * container to know when new results are available.
     */
    isLoading: propTypes$b.exports.bool.isRequired,

    /**
     * Number of input characters that must be entered before showing results.
     */
    minLength: propTypes$b.exports.number,

    /**
     * Callback to perform when the search is executed.
     */
    onSearch: propTypes$b.exports.func.isRequired,

    /**
     * Options to be passed to the typeahead. Will typically be the query
     * results, but can also be initial default options.
     */
    options: propTypes$b.exports.arrayOf(optionType),

    /**
     * Message displayed in the menu when there is no user input.
     */
    promptText: propTypes$b.exports.node,

    /**
     * Message displayed in the menu while the request is pending.
     */
    searchText: propTypes$b.exports.node,

    /**
     * Whether or not the component should cache query results.
     */
    useCache: propTypes$b.exports.bool
  };

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
        delay = _props$delay === void 0 ? 200 : _props$delay,
        emptyLabel = props.emptyLabel,
        isLoading = props.isLoading,
        _props$minLength = props.minLength,
        minLength = _props$minLength === void 0 ? 2 : _props$minLength,
        onInputChange = props.onInputChange,
        onSearch = props.onSearch,
        _props$options = props.options,
        options = _props$options === void 0 ? [] : _props$options,
        _props$promptText = props.promptText,
        promptText = _props$promptText === void 0 ? 'Type to search...' : _props$promptText,
        _props$searchText = props.searchText,
        searchText = _props$searchText === void 0 ? 'Searching...' : _props$searchText,
        _props$useCache = props.useCache,
        useCache = _props$useCache === void 0 ? true : _props$useCache,
        otherProps = _objectWithoutProperties(props, _excluded$c);

    var cacheRef = React.useRef({});
    var handleSearchDebouncedRef = React.useRef(null);
    var queryRef = React.useRef(props.defaultInputValue || '');
    var forceUpdate = useForceUpdate();
    var prevProps = usePrevious(props);
    var handleSearch = React.useCallback(function (query) {
      queryRef.current = query;

      if (!query || minLength && query.length < minLength) {
        return;
      } // Use cached results, if applicable.


      if (useCache && cacheRef.current[query]) {
        // Re-render the component with the cached results.
        forceUpdate();
        return;
      } // Perform the search.


      onSearch(query);
    }, [forceUpdate, minLength, onSearch, useCache]); // Set the debounced search function.

    React.useEffect(function () {
      handleSearchDebouncedRef.current = lodash_debounce(handleSearch, delay);
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

    var getEmptyLabel = function getEmptyLabel() {
      if (!queryRef.current.length) {
        return promptText;
      }

      if (isLoading) {
        return searchText;
      }

      return emptyLabel;
    };

    var handleInputChange = React.useCallback(function (query, e) {
      onInputChange && onInputChange(query, e);
      handleSearchDebouncedRef.current && handleSearchDebouncedRef.current(query);
    }, [onInputChange]);
    var cachedQuery = cacheRef.current[queryRef.current];
    return _objectSpread2(_objectSpread2({}, otherProps), {}, {
      // Disable custom selections during a search if `allowNew` isn't a function.
      allowNew: isFunction(allowNew) ? allowNew : allowNew && !isLoading,
      emptyLabel: getEmptyLabel(),
      isLoading: isLoading,
      minLength: minLength,
      onInputChange: handleInputChange,
      options: useCache && cachedQuery ? cachedQuery : options
    });
  }
  /* istanbul ignore next */

  function withAsync(Component) {
    warn(false, 'Warning: `withAsync` is deprecated and will be removed in the next ' + 'major version. Use `useAsync` instead.');
    var AsyncTypeahead = /*#__PURE__*/React.forwardRef(function (props, ref) {
      return /*#__PURE__*/React__default["default"].createElement(Component, _extends({}, props, useAsync(props), {
        ref: ref
      }));
    });
    AsyncTypeahead.displayName = "withAsync(".concat(getDisplayName(Component), ")"); // @ts-ignore

    AsyncTypeahead.propTypes = propTypes$a;
    return AsyncTypeahead;
  }

  var defaultContext = {
    activeIndex: -1,
    hintText: '',
    id: '',
    initialItem: null,
    inputNode: null,
    isOnlyResult: false,
    onActiveItemChange: noop$1,
    onAdd: noop$1,
    onInitialItemChange: noop$1,
    onMenuItemClick: noop$1,
    setItem: noop$1
  };
  var TypeaheadContext = /*#__PURE__*/React.createContext(defaultContext);
  var useTypeaheadContext = function useTypeaheadContext() {
    return React.useContext(TypeaheadContext);
  };

  var inputPropKeys = ['activeIndex', 'disabled', 'id', 'inputRef', 'isFocused', 'isMenuShown', 'multiple', 'onBlur', 'onChange', 'onClick', 'onFocus', 'onKeyDown', 'placeholder'];
  var propKeys = ['activeIndex', 'hideMenu', 'isMenuShown', 'labelKey', 'onClear', 'onHide', 'onRemove', 'results', 'selected', 'text', 'toggleMenu'];
  var contextKeys = ['activeIndex', 'id', 'initialItem', 'inputNode', 'onActiveItemChange', 'onAdd', 'onInitialItemChange', 'onMenuItemClick', 'setItem'];

  var TypeaheadManager = function TypeaheadManager(props) {
    var allowNew = props.allowNew,
        children = props.children,
        initialItem = props.initialItem,
        isMenuShown = props.isMenuShown,
        onAdd = props.onAdd,
        onInitialItemChange = props.onInitialItemChange,
        onKeyDown = props.onKeyDown,
        onMenuToggle = props.onMenuToggle,
        results = props.results,
        selectHint = props.selectHint;
    var hintText = getHintText(props);
    React.useEffect(function () {
      // Clear the initial item when there are no results.
      if (!(allowNew || results.length)) {
        onInitialItemChange();
      }
    });
    var isInitialRender = React.useRef(true);
    React.useEffect(function () {
      if (isInitialRender.current) {
        isInitialRender.current = false;
        return;
      }

      onMenuToggle(isMenuShown);
    }, [isMenuShown, onMenuToggle]);

    var handleKeyDown = function handleKeyDown(e) {
      onKeyDown(e);

      if (!initialItem) {
        return;
      }

      var addOnlyResult = e.key === 'Enter' && getIsOnlyResult(props);
      var shouldSelectHint = hintText && defaultSelectHint(e, selectHint);

      if (addOnlyResult || shouldSelectHint) {
        onAdd(initialItem);
      }
    };

    var childProps = _objectSpread2(_objectSpread2({}, pick(props, propKeys)), {}, {
      getInputProps: getInputProps(_objectSpread2(_objectSpread2({}, pick(props, inputPropKeys)), {}, {
        onKeyDown: handleKeyDown,
        value: getInputText(props)
      }))
    });

    var contextValue = _objectSpread2(_objectSpread2({}, pick(props, contextKeys)), {}, {
      hintText: hintText,
      isOnlyResult: getIsOnlyResult(props)
    });

    return /*#__PURE__*/React__default["default"].createElement(TypeaheadContext.Provider, {
      value: contextValue
    }, isFunction(children) ? children(childProps) : children);
  };

  function getInitialState(props) {
    var defaultInputValue = props.defaultInputValue,
        defaultOpen = props.defaultOpen,
        defaultSelected = props.defaultSelected,
        maxResults = props.maxResults,
        multiple = props.multiple;
    var selected = props.selected ? props.selected.slice() : defaultSelected.slice();
    var text = defaultInputValue;

    if (!multiple && selected.length) {
      // Set the text if an initial selection is passed in.
      text = getOptionLabel(selected[0], props.labelKey);

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
      shownResults: maxResults,
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
        initialItem = _getInitialState.initialItem,
        shownResults = _getInitialState.shownResults;

    return _objectSpread2(_objectSpread2({}, state), {}, {
      activeIndex: activeIndex,
      activeItem: activeItem,
      initialItem: initialItem,
      showMenu: false,
      shownResults: shownResults
    });
  }
  function toggleMenu(state, props) {
    return state.showMenu ? hideMenu(state, props) : _objectSpread2(_objectSpread2({}, state), {}, {
      showMenu: true
    });
  }

  var _excluded$b = ["onChange"];
  var propTypes$9 = {
    /**
     * Allows the creation of new selections on the fly. Note that any new items
     * will be added to the list of selections, but not the list of original
     * options unless handled as such by `Typeahead`'s parent.
     *
     * If a function is specified, it will be used to determine whether a custom
     * option should be included. The return value should be true or false.
     */
    allowNew: propTypes$b.exports.oneOfType([propTypes$b.exports.bool, propTypes$b.exports.func]),

    /**
     * Autofocus the input when the component initially mounts.
     */
    autoFocus: propTypes$b.exports.bool,

    /**
     * Whether or not filtering should be case-sensitive.
     */
    caseSensitive: checkPropType(propTypes$b.exports.bool, caseSensitiveType),

    /**
     * The initial value displayed in the text input.
     */
    defaultInputValue: checkPropType(propTypes$b.exports.string, defaultInputValueType),

    /**
     * Whether or not the menu is displayed upon initial render.
     */
    defaultOpen: propTypes$b.exports.bool,

    /**
     * Specify any pre-selected options. Use only if you want the component to
     * be uncontrolled.
     */
    defaultSelected: checkPropType(propTypes$b.exports.arrayOf(optionType), defaultSelectedType),

    /**
     * Either an array of fields in `option` to search, or a custom filtering
     * callback.
     */
    filterBy: propTypes$b.exports.oneOfType([propTypes$b.exports.arrayOf(propTypes$b.exports.string.isRequired), propTypes$b.exports.func]),

    /**
     * Highlights the menu item if there is only one result and allows selecting
     * that item by hitting enter. Does not work with `allowNew`.
     */
    highlightOnlyResult: checkPropType(propTypes$b.exports.bool, highlightOnlyResultType),

    /**
     * An html id attribute, required for assistive technologies such as screen
     * readers.
     */
    id: checkPropType(propTypes$b.exports.oneOfType([propTypes$b.exports.number, propTypes$b.exports.string]), isRequiredForA11y),

    /**
     * Whether the filter should ignore accents and other diacritical marks.
     */
    ignoreDiacritics: checkPropType(propTypes$b.exports.bool, ignoreDiacriticsType),

    /**
     * Specify the option key to use for display or a function returning the
     * display string. By default, the selector will use the `label` key.
     */
    labelKey: checkPropType(propTypes$b.exports.oneOfType([propTypes$b.exports.string, propTypes$b.exports.func]), labelKeyType),

    /**
     * Maximum number of results to display by default. Mostly done for
     * performance reasons so as not to render too many DOM nodes in the case of
     * large data sets.
     */
    maxResults: propTypes$b.exports.number,

    /**
     * Number of input characters that must be entered before showing results.
     */
    minLength: propTypes$b.exports.number,

    /**
     * Whether or not multiple selections are allowed.
     */
    multiple: propTypes$b.exports.bool,

    /**
     * Invoked when the input is blurred. Receives an event.
     */
    onBlur: propTypes$b.exports.func,

    /**
     * Invoked whenever items are added or removed. Receives an array of the
     * selected options.
     */
    onChange: propTypes$b.exports.func,

    /**
     * Invoked when the input is focused. Receives an event.
     */
    onFocus: propTypes$b.exports.func,

    /**
     * Invoked when the input value changes. Receives the string value of the
     * input.
     */
    onInputChange: propTypes$b.exports.func,

    /**
     * Invoked when a key is pressed. Receives an event.
     */
    onKeyDown: propTypes$b.exports.func,

    /**
     * Invoked when menu visibility changes.
     */
    onMenuToggle: propTypes$b.exports.func,

    /**
     * Invoked when the pagination menu item is clicked. Receives an event.
     */
    onPaginate: propTypes$b.exports.func,

    /**
     * Whether or not the menu should be displayed. `undefined` allows the
     * component to control visibility, while `true` and `false` show and hide
     * the menu, respectively.
     */
    open: propTypes$b.exports.bool,

    /**
     * Full set of options, including pre-selected options. Must either be an
     * array of objects (recommended) or strings.
     */
    options: propTypes$b.exports.arrayOf(optionType).isRequired,

    /**
     * Give user the ability to display additional results if the number of
     * results exceeds `maxResults`.
     */
    paginate: propTypes$b.exports.bool,

    /**
     * The selected option(s) displayed in the input. Use this prop if you want
     * to control the component via its parent.
     */
    selected: checkPropType(propTypes$b.exports.arrayOf(optionType), selectedType)
  };
  var defaultProps$6 = {
    allowNew: false,
    autoFocus: false,
    caseSensitive: false,
    defaultInputValue: '',
    defaultOpen: false,
    defaultSelected: [],
    filterBy: [],
    highlightOnlyResult: false,
    ignoreDiacritics: true,
    labelKey: DEFAULT_LABELKEY,
    maxResults: 100,
    minLength: 0,
    multiple: false,
    onBlur: noop$1,
    onFocus: noop$1,
    onInputChange: noop$1,
    onKeyDown: noop$1,
    onMenuToggle: noop$1,
    onPaginate: noop$1,
    paginate: true
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

  var Typeahead = /*#__PURE__*/function (_React$Component) {
    _inherits(Typeahead, _React$Component);

    var _super = _createSuper(Typeahead);

    function Typeahead() {
      var _this;

      _classCallCheck(this, Typeahead);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty(_assertThisInitialized(_this), "state", getInitialState(_this.props));

      _defineProperty(_assertThisInitialized(_this), "inputNode", null);

      _defineProperty(_assertThisInitialized(_this), "isMenuShown", false);

      _defineProperty(_assertThisInitialized(_this), "items", []);

      _defineProperty(_assertThisInitialized(_this), "blur", function () {
        _this.inputNode && _this.inputNode.blur();

        _this.hideMenu();
      });

      _defineProperty(_assertThisInitialized(_this), "clear", function () {
        _this.setState(clearTypeahead);
      });

      _defineProperty(_assertThisInitialized(_this), "focus", function () {
        _this.inputNode && _this.inputNode.focus();
      });

      _defineProperty(_assertThisInitialized(_this), "getInput", function () {
        return _this.inputNode;
      });

      _defineProperty(_assertThisInitialized(_this), "inputRef", function (inputNode) {
        _this.inputNode = inputNode;
      });

      _defineProperty(_assertThisInitialized(_this), "setItem", function (item, position) {
        _this.items[position] = item;
      });

      _defineProperty(_assertThisInitialized(_this), "hideMenu", function () {
        _this.setState(hideMenu);
      });

      _defineProperty(_assertThisInitialized(_this), "toggleMenu", function () {
        _this.setState(toggleMenu);
      });

      _defineProperty(_assertThisInitialized(_this), "_handleActiveIndexChange", function (activeIndex) {
        _this.setState(function (state) {
          return {
            activeIndex: activeIndex,
            activeItem: activeIndex >= 0 ? state.activeItem : undefined
          };
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_handleActiveItemChange", function (activeItem) {
        // Don't update the active item if it hasn't changed.
        if (!fastDeepEqual(activeItem, _this.state.activeItem)) {
          _this.setState({
            activeItem: activeItem
          });
        }
      });

      _defineProperty(_assertThisInitialized(_this), "_handleBlur", function (e) {
        e.persist();

        _this.setState({
          isFocused: false
        }, function () {
          return _this.props.onBlur(e);
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_handleChange", function (selected) {
        _this.props.onChange && _this.props.onChange(selected);
      });

      _defineProperty(_assertThisInitialized(_this), "_handleClear", function () {
        _this.inputNode && triggerInputChange(_this.inputNode, '');

        _this.setState(clearTypeahead, function () {
          // Change handler is automatically triggered for single selections but
          // not multi-selections.
          if (_this.props.multiple) {
            _this._handleChange([]);
          }
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_handleClick", function (e) {
        var _this$props$inputProp;

        e.persist();
        var onClick = (_this$props$inputProp = _this.props.inputProps) === null || _this$props$inputProp === void 0 ? void 0 : _this$props$inputProp.onClick;

        _this.setState(clickOrFocusInput, function () {
          return isFunction(onClick) && onClick(e);
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_handleFocus", function (e) {
        e.persist();

        _this.setState(clickOrFocusInput, function () {
          return _this.props.onFocus(e);
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_handleInitialItemChange", function (initialItem) {
        // Don't update the initial item if it hasn't changed.
        if (!fastDeepEqual(initialItem, _this.state.initialItem)) {
          _this.setState({
            initialItem: initialItem
          });
        }
      });

      _defineProperty(_assertThisInitialized(_this), "_handleInputChange", function (e) {
        e.persist();
        var text = e.currentTarget.value;
        var _this$props = _this.props,
            multiple = _this$props.multiple,
            onInputChange = _this$props.onInputChange; // Clear selections when the input value changes in single-select mode.

        var shouldClearSelections = _this.state.selected.length && !multiple;

        _this.setState(function (state, props) {
          var _getInitialState = getInitialState(props),
              activeIndex = _getInitialState.activeIndex,
              activeItem = _getInitialState.activeItem,
              shownResults = _getInitialState.shownResults;

          return {
            activeIndex: activeIndex,
            activeItem: activeItem,
            selected: shouldClearSelections ? [] : state.selected,
            showMenu: true,
            shownResults: shownResults,
            text: text
          };
        }, function () {
          onInputChange(text, e);
          shouldClearSelections && _this._handleChange([]);
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_handleKeyDown", function (e) {
        var activeItem = _this.state.activeItem; // Skip most actions when the menu is hidden.

        if (!_this.isMenuShown) {
          if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            _this.setState({
              showMenu: true
            });
          }

          _this.props.onKeyDown(e);

          return;
        }

        switch (e.key) {
          case 'ArrowUp':
          case 'ArrowDown':
            // Prevent input cursor from going to the beginning when pressing up.
            e.preventDefault();

            _this._handleActiveIndexChange(getUpdatedActiveIndex(_this.state.activeIndex, e.key, _this.items));

            break;

          case 'Enter':
            // Prevent form submission while menu is open.
            e.preventDefault();
            activeItem && _this._handleMenuItemSelect(activeItem, e);
            break;

          case 'Escape':
          case 'Tab':
            // ESC simply hides the menu. TAB will blur the input and move focus to
            // the next item; hide the menu so it doesn't gain focus.
            _this.hideMenu();

            break;
        }

        _this.props.onKeyDown(e);
      });

      _defineProperty(_assertThisInitialized(_this), "_handleMenuItemSelect", function (option, e) {
        if (getOptionProperty(option, 'paginationOption')) {
          _this._handlePaginate(e);
        } else {
          _this._handleSelectionAdd(option);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "_handlePaginate", function (e) {
        e.persist();

        _this.setState(function (state, props) {
          return {
            shownResults: state.shownResults + props.maxResults
          };
        }, function () {
          return _this.props.onPaginate(e, _this.state.shownResults);
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_handleSelectionAdd", function (option) {
        var _this$props2 = _this.props,
            multiple = _this$props2.multiple,
            labelKey = _this$props2.labelKey;
        var selected;
        var selection = option;
        var text; // Add a unique id to the custom selection. Avoid doing this in `render` so
        // the id doesn't increment every time.

        if (!isString(selection) && selection.customOption) {
          selection = _objectSpread2(_objectSpread2({}, selection), {}, {
            id: uniqueId('new-id-')
          });
        }

        if (multiple) {
          // If multiple selections are allowed, add the new selection to the
          // existing selections.
          selected = _this.state.selected.concat(selection);
          text = '';
        } else {
          // If only a single selection is allowed, replace the existing selection
          // with the new one.
          selected = [selection];
          text = getOptionLabel(selection, labelKey);
        }

        _this.setState(function (state, props) {
          return _objectSpread2(_objectSpread2({}, hideMenu(state, props)), {}, {
            initialItem: selection,
            selected: selected,
            text: text
          });
        }, function () {
          return _this._handleChange(selected);
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_handleSelectionRemove", function (selection) {
        var selected = _this.state.selected.filter(function (option) {
          return !fastDeepEqual(option, selection);
        }); // Make sure the input stays focused after the item is removed.


        _this.focus();

        _this.setState(function (state, props) {
          return _objectSpread2(_objectSpread2({}, hideMenu(state, props)), {}, {
            selected: selected
          });
        }, function () {
          return _this._handleChange(selected);
        });
      });

      return _this;
    }

    _createClass(Typeahead, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.props.autoFocus && this.focus();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this$props3 = this.props,
            labelKey = _this$props3.labelKey,
            multiple = _this$props3.multiple,
            selected = _this$props3.selected;
        validateSelectedPropChange(selected, prevProps.selected); // Sync selections in state with those in props.

        if (selected && !fastDeepEqual(selected, prevState.selected)) {
          this.setState({
            selected: selected
          });

          if (!multiple) {
            this.setState({
              text: selected.length ? getOptionLabel(selected[0], labelKey) : ''
            });
          }
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props4 = this.props;
            _this$props4.onChange;
            var props = _objectWithoutProperties(_this$props4, _excluded$b);

        var mergedPropsAndState = _objectSpread2(_objectSpread2({}, props), this.state);

        var filterBy = mergedPropsAndState.filterBy,
            labelKey = mergedPropsAndState.labelKey,
            options = mergedPropsAndState.options,
            paginate = mergedPropsAndState.paginate,
            shownResults = mergedPropsAndState.shownResults,
            text = mergedPropsAndState.text;
        this.isMenuShown = isShown(mergedPropsAndState);
        this.items = []; // Reset items on re-render.

        var results = [];

        if (this.isMenuShown) {
          var cb = isFunction(filterBy) ? filterBy : defaultFilterBy;
          results = options.filter(function (option) {
            return cb(option, mergedPropsAndState);
          }); // This must come before results are truncated.

          var shouldPaginate = paginate && results.length > shownResults; // Truncate results if necessary.

          results = getTruncatedOptions(results, shownResults); // Add the custom option if necessary.

          if (addCustomOption(results, mergedPropsAndState)) {
            results.push(_defineProperty({
              customOption: true
            }, getStringLabelKey(labelKey), text));
          } // Add the pagination item if necessary.


          if (shouldPaginate) {
            var _results$push2;

            results.push((_results$push2 = {}, _defineProperty(_results$push2, getStringLabelKey(labelKey), ''), _defineProperty(_results$push2, "paginationOption", true), _results$push2));
          }
        }

        return /*#__PURE__*/React__default["default"].createElement(TypeaheadManager, _extends({}, mergedPropsAndState, {
          hideMenu: this.hideMenu,
          inputNode: this.inputNode,
          inputRef: this.inputRef,
          isMenuShown: this.isMenuShown,
          onActiveItemChange: this._handleActiveItemChange,
          onAdd: this._handleSelectionAdd,
          onBlur: this._handleBlur,
          onChange: this._handleInputChange,
          onClear: this._handleClear,
          onClick: this._handleClick,
          onFocus: this._handleFocus,
          onHide: this.hideMenu,
          onInitialItemChange: this._handleInitialItemChange,
          onKeyDown: this._handleKeyDown,
          onMenuItemClick: this._handleMenuItemSelect,
          onRemove: this._handleSelectionRemove,
          results: results,
          setItem: this.setItem,
          toggleMenu: this.toggleMenu
        }));
      }
    }]);

    return Typeahead;
  }(React__default["default"].Component);

  _defineProperty(Typeahead, "propTypes", propTypes$9);

  _defineProperty(Typeahead, "defaultProps", defaultProps$6);

  var _excluded$a = ["className", "label", "onClick", "onKeyDown", "size"];
  var propTypes$8 = {
    label: propTypes$b.exports.string,
    onClick: propTypes$b.exports.func,
    onKeyDown: propTypes$b.exports.func,
    size: sizeType
  };
  var defaultProps$5 = {
    label: 'Clear'
  };

  /**
   * ClearButton
   *
   * http://getbootstrap.com/css/#helper-classes-close
   */
  var ClearButton = function ClearButton(_ref) {
    var className = _ref.className,
        label = _ref.label,
        _onClick = _ref.onClick,
        _onKeyDown = _ref.onKeyDown,
        size = _ref.size,
        props = _objectWithoutProperties(_ref, _excluded$a);

    return /*#__PURE__*/React__default["default"].createElement("button", _extends({}, props, {
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
    }), /*#__PURE__*/React__default["default"].createElement("span", {
      "aria-hidden": "true",
      className: "rbt-close-content"
    }, "\xD7"), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "sr-only visually-hidden"
    }, label));
  };

  ClearButton.propTypes = propTypes$8;
  ClearButton.defaultProps = defaultProps$5;

  var propTypes$7 = {
    label: propTypes$b.exports.string
  };
  var defaultProps$4 = {
    label: 'Loading...'
  };

  var Loader = function Loader(_ref) {
    var label = _ref.label;
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "rbt-loader spinner-border spinner-border-sm",
      role: "status"
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      className: "sr-only visually-hidden"
    }, label));
  };

  Loader.propTypes = propTypes$7;
  Loader.defaultProps = defaultProps$4;

  React__namespace.createContext();
  React__namespace.createContext();

  /**
   * Simple ponyfill for Object.fromEntries
   */

  var fromEntries = function fromEntries(entries) {
    return entries.reduce(function (acc, _ref) {
      var key = _ref[0],
          value = _ref[1];
      acc[key] = value;
      return acc;
    }, {});
  };
  /**
   * Small wrapper around `useLayoutEffect` to get rid of the warning on SSR envs
   */

  var useIsomorphicLayoutEffect = typeof window !== 'undefined' && window.document && window.document.createElement ? React__namespace.useLayoutEffect : React__namespace.useEffect;

  var top = 'top';
  var bottom = 'bottom';
  var right = 'right';
  var left = 'left';
  var auto = 'auto';
  var basePlacements = [top, bottom, right, left];
  var start = 'start';
  var end = 'end';
  var clippingParents = 'clippingParents';
  var viewport = 'viewport';
  var popper = 'popper';
  var reference = 'reference';
  var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []); // modifiers that need to read the DOM

  var beforeRead = 'beforeRead';
  var read = 'read';
  var afterRead = 'afterRead'; // pure-logic modifiers

  var beforeMain = 'beforeMain';
  var main = 'main';
  var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

  var beforeWrite = 'beforeWrite';
  var write = 'write';
  var afterWrite = 'afterWrite';
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

  function getNodeName(element) {
    return element ? (element.nodeName || '').toLowerCase() : null;
  }

  function getWindow(node) {
    if (node == null) {
      return window;
    }

    if (node.toString() !== '[object Window]') {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }

    return node;
  }

  function isElement(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }

  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }

  function isShadowRoot(node) {
    // IE 11 has no ShadowRoot
    if (typeof ShadowRoot === 'undefined') {
      return false;
    }

    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }

  // and applies them to the HTMLElements such as popper and arrow

  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function (name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name]; // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe[cannot-write]


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (name) {
        var value = attributes[name];

        if (value === false) {
          element.removeAttribute(name);
        } else {
          element.setAttribute(name, value === true ? '' : value);
        }
      });
    });
  }

  function effect$2(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }

    return function () {
      Object.keys(state.elements).forEach(function (name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

        var style = styleProperties.reduce(function (style, property) {
          style[property] = '';
          return style;
        }, {}); // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }

        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  } // eslint-disable-next-line import/no-unused-modules


  var applyStyles$1 = {
    name: 'applyStyles',
    enabled: true,
    phase: 'write',
    fn: applyStyles,
    effect: effect$2,
    requires: ['computeStyles']
  };

  function getBasePlacement(placement) {
    return placement.split('-')[0];
  }

  var max = Math.max;
  var min = Math.min;
  var round = Math.round;

  function getBoundingClientRect(element, includeScale) {
    if (includeScale === void 0) {
      includeScale = false;
    }

    var rect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1;

    if (isHTMLElement(element) && includeScale) {
      var offsetHeight = element.offsetHeight;
      var offsetWidth = element.offsetWidth; // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
      // Fallback to 1 in case both values are `0`

      if (offsetWidth > 0) {
        scaleX = round(rect.width) / offsetWidth || 1;
      }

      if (offsetHeight > 0) {
        scaleY = round(rect.height) / offsetHeight || 1;
      }
    }

    return {
      width: rect.width / scaleX,
      height: rect.height / scaleY,
      top: rect.top / scaleY,
      right: rect.right / scaleX,
      bottom: rect.bottom / scaleY,
      left: rect.left / scaleX,
      x: rect.left / scaleX,
      y: rect.top / scaleY
    };
  }

  // means it doesn't take into account transforms.

  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
    // Fixes https://github.com/popperjs/popper-core/issues/1223

    var width = element.offsetWidth;
    var height = element.offsetHeight;

    if (Math.abs(clientRect.width - width) <= 1) {
      width = clientRect.width;
    }

    if (Math.abs(clientRect.height - height) <= 1) {
      height = clientRect.height;
    }

    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width: width,
      height: height
    };
  }

  function contains$1(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

    if (parent.contains(child)) {
      return true;
    } // then fallback to custom implementation with Shadow DOM support
    else if (rootNode && isShadowRoot(rootNode)) {
        var next = child;

        do {
          if (next && parent.isSameNode(next)) {
            return true;
          } // $FlowFixMe[prop-missing]: need a better way to handle this...


          next = next.parentNode || next.host;
        } while (next);
      } // Give up, the result is false


    return false;
  }

  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }

  function isTableElement(element) {
    return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
  }

  function getDocumentElement(element) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
    element.document) || window.document).documentElement;
  }

  function getParentNode(element) {
    if (getNodeName(element) === 'html') {
      return element;
    }

    return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      element.parentNode || ( // DOM Element detected
      isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
      // $FlowFixMe[incompatible-call]: HTMLElement is a Node
      getDocumentElement(element) // fallback

    );
  }

  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
    getComputedStyle$1(element).position === 'fixed') {
      return null;
    }

    return element.offsetParent;
  } // `.offsetParent` reports `null` for fixed elements, while absolute elements
  // return the containing block


  function getContainingBlock(element) {
    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
    var isIE = navigator.userAgent.indexOf('Trident') !== -1;

    if (isIE && isHTMLElement(element)) {
      // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
      var elementCss = getComputedStyle$1(element);

      if (elementCss.position === 'fixed') {
        return null;
      }
    }

    var currentNode = getParentNode(element);

    while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
      // create a containing block.
      // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

      if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }

    return null;
  } // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.


  function getOffsetParent(element) {
    var window = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);

    while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
      offsetParent = getTrueOffsetParent(offsetParent);
    }

    if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
      return window;
    }

    return offsetParent || getContainingBlock(element) || window;
  }

  function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
  }

  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }
  function withinMaxClamp(min, value, max) {
    var v = within(min, value, max);
    return v > max ? max : v;
  }

  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }

  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), paddingObject);
  }

  function expandToHashMap(value, keys) {
    return keys.reduce(function (hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }

  var toPaddingObject = function toPaddingObject(padding, state) {
    padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
      placement: state.placement
    })) : padding;
    return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  };

  function arrow(_ref) {
    var _state$modifiersData$;

    var state = _ref.state,
        name = _ref.name,
        options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? 'height' : 'width';

    if (!arrowElement || !popperOffsets) {
      return;
    }

    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === 'y' ? top : left;
    var maxProp = axis === 'y' ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
    var startDiff = popperOffsets[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
    // outside of the popper bounds

    var min = paddingObject[minProp];
    var max = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset = within(min, center, max); // Prevents breaking syntax highlighting...

    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
  }

  function effect$1(_ref2) {
    var state = _ref2.state,
        options = _ref2.options;
    var _options$element = options.element,
        arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

    if (arrowElement == null) {
      return;
    } // CSS selector


    if (typeof arrowElement === 'string') {
      arrowElement = state.elements.popper.querySelector(arrowElement);

      if (!arrowElement) {
        return;
      }
    }

    {
      if (!isHTMLElement(arrowElement)) {
        console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
      }
    }

    if (!contains$1(state.elements.popper, arrowElement)) {
      {
        console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
      }

      return;
    }

    state.elements.arrow = arrowElement;
  } // eslint-disable-next-line import/no-unused-modules


  var arrow$1 = {
    name: 'arrow',
    enabled: true,
    phase: 'main',
    fn: arrow,
    effect: effect$1,
    requires: ['popperOffsets'],
    requiresIfExists: ['preventOverflow']
  };

  function getVariation(placement) {
    return placement.split('-')[1];
  }

  var unsetSides = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto'
  }; // Round the offsets to the nearest suitable subpixel based on the DPR.
  // Zooming can change the DPR, but it seems to report a value that will
  // cleanly divide the values into the appropriate subpixels.

  function roundOffsetsByDPR(_ref) {
    var x = _ref.x,
        y = _ref.y;
    var win = window;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(x * dpr) / dpr || 0,
      y: round(y * dpr) / dpr || 0
    };
  }

  function mapToStyles(_ref2) {
    var _Object$assign2;

    var popper = _ref2.popper,
        popperRect = _ref2.popperRect,
        placement = _ref2.placement,
        variation = _ref2.variation,
        offsets = _ref2.offsets,
        position = _ref2.position,
        gpuAcceleration = _ref2.gpuAcceleration,
        adaptive = _ref2.adaptive,
        roundOffsets = _ref2.roundOffsets,
        isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x,
        x = _offsets$x === void 0 ? 0 : _offsets$x,
        _offsets$y = offsets.y,
        y = _offsets$y === void 0 ? 0 : _offsets$y;

    var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
      x: x,
      y: y
    }) : {
      x: x,
      y: y
    };

    x = _ref3.x;
    y = _ref3.y;
    var hasX = offsets.hasOwnProperty('x');
    var hasY = offsets.hasOwnProperty('y');
    var sideX = left;
    var sideY = top;
    var win = window;

    if (adaptive) {
      var offsetParent = getOffsetParent(popper);
      var heightProp = 'clientHeight';
      var widthProp = 'clientWidth';

      if (offsetParent === getWindow(popper)) {
        offsetParent = getDocumentElement(popper);

        if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
          heightProp = 'scrollHeight';
          widthProp = 'scrollWidth';
        }
      } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


      offsetParent = offsetParent;

      if (placement === top || (placement === left || placement === right) && variation === end) {
        sideY = bottom;
        var offsetY = isFixed && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
        offsetParent[heightProp];
        y -= offsetY - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }

      if (placement === left || (placement === top || placement === bottom) && variation === end) {
        sideX = right;
        var offsetX = isFixed && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
        offsetParent[widthProp];
        x -= offsetX - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }

    var commonStyles = Object.assign({
      position: position
    }, adaptive && unsetSides);

    var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
      x: x,
      y: y
    }) : {
      x: x,
      y: y
    };

    x = _ref4.x;
    y = _ref4.y;

    if (gpuAcceleration) {
      var _Object$assign;

      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }

    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
  }

  function computeStyles(_ref5) {
    var state = _ref5.state,
        options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration,
        gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
        _options$adaptive = options.adaptive,
        adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
        _options$roundOffsets = options.roundOffsets,
        roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

    {
      var transitionProperty = getComputedStyle$1(state.elements.popper).transitionProperty || '';

      if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
        return transitionProperty.indexOf(property) >= 0;
      })) {
        console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
      }
    }

    var commonStyles = {
      placement: getBasePlacement(state.placement),
      variation: getVariation(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration: gpuAcceleration,
      isFixed: state.options.strategy === 'fixed'
    };

    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive: adaptive,
        roundOffsets: roundOffsets
      })));
    }

    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: 'absolute',
        adaptive: false,
        roundOffsets: roundOffsets
      })));
    }

    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-placement': state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  var computeStyles$1 = {
    name: 'computeStyles',
    enabled: true,
    phase: 'beforeWrite',
    fn: computeStyles,
    data: {}
  };

  var passive = {
    passive: true
  };

  function effect(_ref) {
    var state = _ref.state,
        instance = _ref.instance,
        options = _ref.options;
    var _options$scroll = options.scroll,
        scroll = _options$scroll === void 0 ? true : _options$scroll,
        _options$resize = options.resize,
        resize = _options$resize === void 0 ? true : _options$resize;
    var window = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.addEventListener('resize', instance.update, passive);
    }

    return function () {
      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.removeEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.removeEventListener('resize', instance.update, passive);
      }
    };
  } // eslint-disable-next-line import/no-unused-modules


  var eventListeners = {
    name: 'eventListeners',
    enabled: true,
    phase: 'write',
    fn: function fn() {},
    effect: effect,
    data: {}
  };

  var hash$1 = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash$1[matched];
    });
  }

  var hash = {
    start: 'end',
    end: 'start'
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function (matched) {
      return hash[matched];
    });
  }

  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft: scrollLeft,
      scrollTop: scrollTop
    };
  }

  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    // Popper 1 is broken in this case and never had a bug report so let's assume
    // it's not an issue. I don't think anyone ever specifies width on <html>
    // anyway.
    // Browsers where the left scrollbar doesn't cause an issue report `0` for
    // this (e.g. Edge 2019, IE11, Safari)
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
  }

  function getViewportRect(element) {
    var win = getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
    // can be obscured underneath it.
    // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
    // if it isn't open, so if this isn't available, the popper will be detected
    // to overflow the bottom of the screen too early.

    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
      // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
      // errors due to floating point numbers, so we need to check precision.
      // Safari returns a number <= 0, usually < -1 when pinch-zoomed
      // Feature detection fails in mobile emulation mode in Chrome.
      // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
      // 0.001
      // Fallback here: "Not Safari" userAgent

      if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }

    return {
      width: width,
      height: height,
      x: x + getWindowScrollBarX(element),
      y: y
    };
  }

  // of the `<html>` and `<body>` rect bounds if horizontally scrollable

  function getDocumentRect(element) {
    var _element$ownerDocumen;

    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;

    if (getComputedStyle$1(body || html).direction === 'rtl') {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }

    return {
      width: width,
      height: height,
      x: x,
      y: y
    };
  }

  function isScrollParent(element) {
    // Firefox wants us to check `-x` and `-y` variations as well
    var _getComputedStyle = getComputedStyle$1(element),
        overflow = _getComputedStyle.overflow,
        overflowX = _getComputedStyle.overflowX,
        overflowY = _getComputedStyle.overflowY;

    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }

  function getScrollParent(node) {
    if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return node.ownerDocument.body;
    }

    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }

    return getScrollParent(getParentNode(node));
  }

  /*
  given a DOM element, return the list of all scroll parents, up the list of ancesors
  until we get to the top window object. This list is what we attach scroll listeners
  to, because if any of these parent elements scroll, we'll need to re-calculate the
  reference element's position.
  */

  function listScrollParents(element, list) {
    var _element$ownerDocumen;

    if (list === void 0) {
      list = [];
    }

    var scrollParent = getScrollParent(element);
    var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)));
  }

  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }

  function getInnerBoundingClientRect(element) {
    var rect = getBoundingClientRect(element);
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }

  function getClientRectFromMixedType(element, clippingParent) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
  } // A "clipping parent" is an overflowable container with the characteristic of
  // clipping (or hiding) overflowing elements with a position different from
  // `initial`


  function getClippingParents(element) {
    var clippingParents = listScrollParents(getParentNode(element));
    var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

    if (!isElement(clipperElement)) {
      return [];
    } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


    return clippingParents.filter(function (clippingParent) {
      return isElement(clippingParent) && contains$1(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
    });
  } // Gets the maximum area that the element is visible in due to any number of
  // clipping parents


  function getClippingRect(element, boundary, rootBoundary) {
    var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
    var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents[0];
    var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element, clippingParent);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }

  function computeOffsets(_ref) {
    var reference = _ref.reference,
        element = _ref.element,
        placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference.x + reference.width / 2 - element.width / 2;
    var commonY = reference.y + reference.height / 2 - element.height / 2;
    var offsets;

    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference.y - element.height
        };
        break;

      case bottom:
        offsets = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;

      case right:
        offsets = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;

      case left:
        offsets = {
          x: reference.x - element.width,
          y: commonY
        };
        break;

      default:
        offsets = {
          x: reference.x,
          y: reference.y
        };
    }

    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

    if (mainAxis != null) {
      var len = mainAxis === 'y' ? 'height' : 'width';

      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
          break;

        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
          break;
      }
    }

    return offsets;
  }

  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$placement = _options.placement,
        placement = _options$placement === void 0 ? state.placement : _options$placement,
        _options$boundary = _options.boundary,
        boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
        _options$rootBoundary = _options.rootBoundary,
        rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
        _options$elementConte = _options.elementContext,
        elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
        _options$altBoundary = _options.altBoundary,
        altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
        _options$padding = _options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
    var referenceClientRect = getBoundingClientRect(state.elements.reference);
    var popperOffsets = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      strategy: 'absolute',
      placement: placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
    // 0 or negative = within the clipping rect

    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

    if (elementContext === popper && offsetData) {
      var offset = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function (key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
        overflowOffsets[key] += offset[axis] * multiply;
      });
    }

    return overflowOffsets;
  }

  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        placement = _options.placement,
        boundary = _options.boundary,
        rootBoundary = _options.rootBoundary,
        padding = _options.padding,
        flipVariations = _options.flipVariations,
        _options$allowedAutoP = _options.allowedAutoPlacements,
        allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
      return getVariation(placement) === variation;
    }) : basePlacements;
    var allowedPlacements = placements$1.filter(function (placement) {
      return allowedAutoPlacements.indexOf(placement) >= 0;
    });

    if (allowedPlacements.length === 0) {
      allowedPlacements = placements$1;

      {
        console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
      }
    } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


    var overflows = allowedPlacements.reduce(function (acc, placement) {
      acc[placement] = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding
      })[getBasePlacement(placement)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function (a, b) {
      return overflows[a] - overflows[b];
    });
  }

  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
      return [];
    }

    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
  }

  function flip(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;

    if (state.modifiersData[name]._skip) {
      return;
    }

    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
        specifiedFallbackPlacements = options.fallbackPlacements,
        padding = options.padding,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        _options$flipVariatio = options.flipVariations,
        flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
        allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
      return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        flipVariations: flipVariations,
        allowedAutoPlacements: allowedAutoPlacements
      }) : placement);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements[0];

    for (var i = 0; i < placements.length; i++) {
      var placement = placements[i];

      var _basePlacement = getBasePlacement(placement);

      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? 'width' : 'height';
      var overflow = detectOverflow(state, {
        placement: placement,
        boundary: boundary,
        rootBoundary: rootBoundary,
        altBoundary: altBoundary,
        padding: padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide);
      }

      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];

      if (checkMainAxis) {
        checks.push(overflow[_basePlacement] <= 0);
      }

      if (checkAltAxis) {
        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
      }

      if (checks.every(function (check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }

      checksMap.set(placement, checks);
    }

    if (makeFallbackChecks) {
      // `2` may be desired in some cases – research later
      var numberOfChecks = flipVariations ? 3 : 1;

      var _loop = function _loop(_i) {
        var fittingPlacement = placements.find(function (placement) {
          var checks = checksMap.get(placement);

          if (checks) {
            return checks.slice(0, _i).every(function (check) {
              return check;
            });
          }
        });

        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };

      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);

        if (_ret === "break") break;
      }
    }

    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  } // eslint-disable-next-line import/no-unused-modules


  var flip$1 = {
    name: 'flip',
    enabled: true,
    phase: 'main',
    fn: flip,
    requiresIfExists: ['offset'],
    data: {
      _skip: false
    }
  };

  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      };
    }

    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    };
  }

  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function (side) {
      return overflow[side] >= 0;
    });
  }

  function hide(_ref) {
    var state = _ref.state,
        name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: 'reference'
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets: referenceClippingOffsets,
      popperEscapeOffsets: popperEscapeOffsets,
      isReferenceHidden: isReferenceHidden,
      hasPopperEscaped: hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      'data-popper-reference-hidden': isReferenceHidden,
      'data-popper-escaped': hasPopperEscaped
    });
  } // eslint-disable-next-line import/no-unused-modules


  var hide$1 = {
    name: 'hide',
    enabled: true,
    phase: 'main',
    requiresIfExists: ['preventOverflow'],
    fn: hide
  };

  function distanceAndSkiddingToXY(placement, rects, offset) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

    var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
      placement: placement
    })) : offset,
        skidding = _ref[0],
        distance = _ref[1];

    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }

  function offset(_ref2) {
    var state = _ref2.state,
        options = _ref2.options,
        name = _ref2.name;
    var _options$offset = options.offset,
        offset = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function (acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement],
        x = _data$state$placement.x,
        y = _data$state$placement.y;

    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  var offset$1 = {
    name: 'offset',
    enabled: true,
    phase: 'main',
    requires: ['popperOffsets'],
    fn: offset
  };

  function popperOffsets(_ref) {
    var state = _ref.state,
        name = _ref.name;
    // Offsets are the actual position the popper needs to have to be
    // properly positioned near its reference element
    // This is the most basic placement, and will be adjusted by
    // the modifiers in the next step
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      strategy: 'absolute',
      placement: state.placement
    });
  } // eslint-disable-next-line import/no-unused-modules


  var popperOffsets$1 = {
    name: 'popperOffsets',
    enabled: true,
    phase: 'read',
    fn: popperOffsets,
    data: {}
  };

  function getAltAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }

  function preventOverflow(_ref) {
    var state = _ref.state,
        options = _ref.options,
        name = _ref.name;
    var _options$mainAxis = options.mainAxis,
        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
        _options$altAxis = options.altAxis,
        checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
        boundary = options.boundary,
        rootBoundary = options.rootBoundary,
        altBoundary = options.altBoundary,
        padding = options.padding,
        _options$tether = options.tether,
        tether = _options$tether === void 0 ? true : _options$tether,
        _options$tetherOffset = options.tetherOffset,
        tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      altBoundary: altBoundary
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
      mainAxis: tetherOffsetValue,
      altAxis: tetherOffsetValue
    } : Object.assign({
      mainAxis: 0,
      altAxis: 0
    }, tetherOffsetValue);
    var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
    var data = {
      x: 0,
      y: 0
    };

    if (!popperOffsets) {
      return;
    }

    if (checkMainAxis) {
      var _offsetModifierState$;

      var mainSide = mainAxis === 'y' ? top : left;
      var altSide = mainAxis === 'y' ? bottom : right;
      var len = mainAxis === 'y' ? 'height' : 'width';
      var offset = popperOffsets[mainAxis];
      var min$1 = offset + overflow[mainSide];
      var max$1 = offset - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
      // outside the reference bounds

      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
      // to include its full size in the calculation. If the reference is small
      // and near the edge of a boundary, the popper can overflow even if the
      // reference is not overflowing as well (e.g. virtual elements with no
      // width or height)

      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
      var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = offset + maxOffset - offsetModifierValue;
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _offsetModifierState$2;

      var _mainSide = mainAxis === 'x' ? top : left;

      var _altSide = mainAxis === 'x' ? bottom : right;

      var _offset = popperOffsets[altAxis];

      var _len = altAxis === 'y' ? 'height' : 'width';

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

      var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

      var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

      var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

      var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }

    state.modifiersData[name] = data;
  } // eslint-disable-next-line import/no-unused-modules


  var preventOverflow$1 = {
    name: 'preventOverflow',
    enabled: true,
    phase: 'main',
    fn: preventOverflow,
    requiresIfExists: ['offset']
  };

  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }

  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  }

  function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = round(rect.width) / element.offsetWidth || 1;
    var scaleY = round(rect.height) / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
  } // Returns the composite rect of an element relative to its offsetParent.
  // Composite means it takes into account transforms as well as layout.


  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }

    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };

    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
      isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }

      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent, true);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }

    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  function order(modifiers) {
    var map = new Map();
    var visited = new Set();
    var result = [];
    modifiers.forEach(function (modifier) {
      map.set(modifier.name, modifier);
    }); // On visiting object, check for its dependencies and visit them recursively

    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function (dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);

          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }

    modifiers.forEach(function (modifier) {
      if (!visited.has(modifier.name)) {
        // check for visited object
        sort(modifier);
      }
    });
    return result;
  }

  function orderModifiers(modifiers) {
    // order based on dependencies
    var orderedModifiers = order(modifiers); // order based on phase

    return modifierPhases.reduce(function (acc, phase) {
      return acc.concat(orderedModifiers.filter(function (modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }

  function debounce(fn) {
    var pending;
    return function () {
      if (!pending) {
        pending = new Promise(function (resolve) {
          Promise.resolve().then(function () {
            pending = undefined;
            resolve(fn());
          });
        });
      }

      return pending;
    };
  }

  function format(str) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return [].concat(args).reduce(function (p, c) {
      return p.replace(/%s/, c);
    }, str);
  }

  var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
  var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
  var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
  function validateModifiers(modifiers) {
    modifiers.forEach(function (modifier) {
      [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
      .filter(function (value, index, self) {
        return self.indexOf(value) === index;
      }).forEach(function (key) {
        switch (key) {
          case 'name':
            if (typeof modifier.name !== 'string') {
              console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
            }

            break;

          case 'enabled':
            if (typeof modifier.enabled !== 'boolean') {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
            }

            break;

          case 'phase':
            if (modifierPhases.indexOf(modifier.phase) < 0) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
            }

            break;

          case 'fn':
            if (typeof modifier.fn !== 'function') {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
            }

            break;

          case 'effect':
            if (modifier.effect != null && typeof modifier.effect !== 'function') {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
            }

            break;

          case 'requires':
            if (modifier.requires != null && !Array.isArray(modifier.requires)) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
            }

            break;

          case 'requiresIfExists':
            if (!Array.isArray(modifier.requiresIfExists)) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
            }

            break;

          case 'options':
          case 'data':
            break;

          default:
            console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
              return "\"" + s + "\"";
            }).join(', ') + "; but \"" + key + "\" was provided.");
        }

        modifier.requires && modifier.requires.forEach(function (requirement) {
          if (modifiers.find(function (mod) {
            return mod.name === requirement;
          }) == null) {
            console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
          }
        });
      });
    });
  }

  function uniqueBy(arr, fn) {
    var identifiers = new Set();
    return arr.filter(function (item) {
      var identifier = fn(item);

      if (!identifiers.has(identifier)) {
        identifiers.add(identifier);
        return true;
      }
    });
  }

  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function (merged, current) {
      var existing = merged[current.name];
      merged[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged;
    }, {}); // IE11 does not support Object.values

    return Object.keys(merged).map(function (key) {
      return merged[key];
    });
  }

  var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
  var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
  var DEFAULT_OPTIONS = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute'
  };

  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !args.some(function (element) {
      return !(element && typeof element.getBoundingClientRect === 'function');
    });
  }

  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }

    var _generatorOptions = generatorOptions,
        _generatorOptions$def = _generatorOptions.defaultModifiers,
        defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
        _generatorOptions$def2 = _generatorOptions.defaultOptions,
        defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper(reference, popper, options) {
      if (options === void 0) {
        options = defaultOptions;
      }

      var state = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference,
          popper: popper
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state: state,
        setOptions: function setOptions(setOptionsAction) {
          var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions, state.options, options);
          state.scrollParents = {
            reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
            popper: listScrollParents(popper)
          }; // Orders the modifiers based on their dependencies and `phase`
          // properties

          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

          state.orderedModifiers = orderedModifiers.filter(function (m) {
            return m.enabled;
          }); // Validate the provided modifiers so that the consumer will get warned
          // if one of the modifiers is invalid for any reason

          {
            var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
              var name = _ref.name;
              return name;
            });
            validateModifiers(modifiers);

            if (getBasePlacement(state.options.placement) === auto) {
              var flipModifier = state.orderedModifiers.find(function (_ref2) {
                var name = _ref2.name;
                return name === 'flip';
              });

              if (!flipModifier) {
                console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
              }
            }

            var _getComputedStyle = getComputedStyle$1(popper),
                marginTop = _getComputedStyle.marginTop,
                marginRight = _getComputedStyle.marginRight,
                marginBottom = _getComputedStyle.marginBottom,
                marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
            // cause bugs with positioning, so we'll warn the consumer


            if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
              return parseFloat(margin);
            })) {
              console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
            }
          }

          runModifierEffects();
          return instance.update();
        },
        // Sync update – it will always be executed, even if not necessary. This
        // is useful for low frequency updates where sync behavior simplifies the
        // logic.
        // For high frequency updates (e.g. `resize` and `scroll` events), always
        // prefer the async Popper#update method
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }

          var _state$elements = state.elements,
              reference = _state$elements.reference,
              popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
          // anymore

          if (!areValidElements(reference, popper)) {
            {
              console.error(INVALID_ELEMENT_ERROR);
            }

            return;
          } // Store the reference and popper rects to be read by modifiers


          state.rects = {
            reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
            popper: getLayoutRect(popper)
          }; // Modifiers have the ability to reset the current update cycle. The
          // most common use case for this is the `flip` modifier changing the
          // placement, which then needs to re-run all the modifiers, because the
          // logic was previously ran for the previous placement and is therefore
          // stale/incorrect

          state.reset = false;
          state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
          // is filled with the initial data specified by the modifier. This means
          // it doesn't persist and is fresh on each update.
          // To ensure persistent data, use `${name}#persistent`

          state.orderedModifiers.forEach(function (modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });
          var __debug_loops__ = 0;

          for (var index = 0; index < state.orderedModifiers.length; index++) {
            {
              __debug_loops__ += 1;

              if (__debug_loops__ > 100) {
                console.error(INFINITE_LOOP_ERROR);
                break;
              }
            }

            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }

            var _state$orderedModifie = state.orderedModifiers[index],
                fn = _state$orderedModifie.fn,
                _state$orderedModifie2 = _state$orderedModifie.options,
                _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                name = _state$orderedModifie.name;

            if (typeof fn === 'function') {
              state = fn({
                state: state,
                options: _options,
                name: name,
                instance: instance
              }) || state;
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: debounce(function () {
          return new Promise(function (resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };

      if (!areValidElements(reference, popper)) {
        {
          console.error(INVALID_ELEMENT_ERROR);
        }

        return instance;
      }

      instance.setOptions(options).then(function (state) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state);
        }
      }); // Modifiers have the ability to execute arbitrary code before the first
      // update cycle runs. They will be executed in the same order as the update
      // cycle. This is useful when a modifier adds some persistent data that
      // other modifiers need to use, but the modifier is run after the dependent
      // one.

      function runModifierEffects() {
        state.orderedModifiers.forEach(function (_ref3) {
          var name = _ref3.name,
              _ref3$options = _ref3.options,
              options = _ref3$options === void 0 ? {} : _ref3$options,
              effect = _ref3.effect;

          if (typeof effect === 'function') {
            var cleanupFn = effect({
              state: state,
              name: name,
              instance: instance,
              options: options
            });

            var noopFn = function noopFn() {};

            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }

      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function (fn) {
          return fn();
        });
        effectCleanupFns = [];
      }

      return instance;
    };
  }

  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper = /*#__PURE__*/popperGenerator({
    defaultModifiers: defaultModifiers
  }); // eslint-disable-next-line import/no-unused-modules

  /* global Map:readonly, Set:readonly, ArrayBuffer:readonly */

  var hasElementType = typeof Element !== 'undefined';
  var hasMap = typeof Map === 'function';
  var hasSet = typeof Set === 'function';
  var hasArrayBuffer = typeof ArrayBuffer === 'function' && !!ArrayBuffer.isView;

  // Note: We **don't** need `envHasBigInt64Array` in fde es6/index.js

  function equal(a, b) {
    // START: fast-deep-equal es6/index.js 3.1.1
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

      // START: Modifications:
      // 1. Extra `has<Type> &&` helpers in initial condition allow es6 code
      //    to co-exist with es5.
      // 2. Replace `for of` with es5 compliant iteration using `for`.
      //    Basically, take:
      //
      //    ```js
      //    for (i of a.entries())
      //      if (!b.has(i[0])) return false;
      //    ```
      //
      //    ... and convert to:
      //
      //    ```js
      //    it = a.entries();
      //    while (!(i = it.next()).done)
      //      if (!b.has(i.value[0])) return false;
      //    ```
      //
      //    **Note**: `i` access switches to `i.value`.
      var it;
      if (hasMap && (a instanceof Map) && (b instanceof Map)) {
        if (a.size !== b.size) return false;
        it = a.entries();
        while (!(i = it.next()).done)
          if (!b.has(i.value[0])) return false;
        it = a.entries();
        while (!(i = it.next()).done)
          if (!equal(i.value[1], b.get(i.value[0]))) return false;
        return true;
      }

      if (hasSet && (a instanceof Set) && (b instanceof Set)) {
        if (a.size !== b.size) return false;
        it = a.entries();
        while (!(i = it.next()).done)
          if (!b.has(i.value[0])) return false;
        return true;
      }
      // END: Modifications

      if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
        length = a.length;
        if (length != b.length) return false;
        for (i = length; i-- !== 0;)
          if (a[i] !== b[i]) return false;
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
      // END: fast-deep-equal

      // START: react-fast-compare
      // custom handling for DOM elements
      if (hasElementType && a instanceof Element) return false;

      // custom handling for React/Preact
      for (i = length; i-- !== 0;) {
        if ((keys[i] === '_owner' || keys[i] === '__v' || keys[i] === '__o') && a.$$typeof) {
          // React-specific: avoid traversing React elements' _owner
          // Preact-specific: avoid traversing Preact elements' __v and __o
          //    __v = $_original / $_vnode
          //    __o = $_owner
          // These properties contain circular references and are not needed when
          // comparing the actual elements (and not their owners)
          // .$$typeof and ._store on just reasonable markers of elements

          continue;
        }

        // all other properties should be traversed as usual
        if (!equal(a[keys[i]], b[keys[i]])) return false;
      }
      // END: react-fast-compare

      // START: fast-deep-equal
      return true;
    }

    return a !== a && b !== b;
  }
  // end fast-deep-equal

  var reactFastCompare = function isEqual(a, b) {
    try {
      return equal(a, b);
    } catch (error) {
      if (((error.message || '').match(/stack|recursion/i))) {
        // warn on circular references, don't crash
        // browsers give this different errors name and messages:
        // chrome/safari: "RangeError", "Maximum call stack size exceeded"
        // firefox: "InternalError", too much recursion"
        // edge: "Error", "Out of stack space"
        console.warn('react-fast-compare cannot handle circular refs');
        return false;
      }
      // some other error. we should definitely know about these
      throw error;
    }
  };

  var EMPTY_MODIFIERS = [];
  var usePopper = function usePopper(referenceElement, popperElement, options) {
    if (options === void 0) {
      options = {};
    }

    var prevOptions = React__namespace.useRef(null);
    var optionsWithDefaults = {
      onFirstUpdate: options.onFirstUpdate,
      placement: options.placement || 'bottom',
      strategy: options.strategy || 'absolute',
      modifiers: options.modifiers || EMPTY_MODIFIERS
    };

    var _React$useState = React__namespace.useState({
      styles: {
        popper: {
          position: optionsWithDefaults.strategy,
          left: '0',
          top: '0'
        },
        arrow: {
          position: 'absolute'
        }
      },
      attributes: {}
    }),
        state = _React$useState[0],
        setState = _React$useState[1];

    var updateStateModifier = React__namespace.useMemo(function () {
      return {
        name: 'updateState',
        enabled: true,
        phase: 'write',
        fn: function fn(_ref) {
          var state = _ref.state;
          var elements = Object.keys(state.elements);
          setState({
            styles: fromEntries(elements.map(function (element) {
              return [element, state.styles[element] || {}];
            })),
            attributes: fromEntries(elements.map(function (element) {
              return [element, state.attributes[element]];
            }))
          });
        },
        requires: ['computeStyles']
      };
    }, []);
    var popperOptions = React__namespace.useMemo(function () {
      var newOptions = {
        onFirstUpdate: optionsWithDefaults.onFirstUpdate,
        placement: optionsWithDefaults.placement,
        strategy: optionsWithDefaults.strategy,
        modifiers: [].concat(optionsWithDefaults.modifiers, [updateStateModifier, {
          name: 'applyStyles',
          enabled: false
        }])
      };

      if (reactFastCompare(prevOptions.current, newOptions)) {
        return prevOptions.current || newOptions;
      } else {
        prevOptions.current = newOptions;
        return newOptions;
      }
    }, [optionsWithDefaults.onFirstUpdate, optionsWithDefaults.placement, optionsWithDefaults.strategy, optionsWithDefaults.modifiers, updateStateModifier]);
    var popperInstanceRef = React__namespace.useRef();
    useIsomorphicLayoutEffect(function () {
      if (popperInstanceRef.current) {
        popperInstanceRef.current.setOptions(popperOptions);
      }
    }, [popperOptions]);
    useIsomorphicLayoutEffect(function () {
      if (referenceElement == null || popperElement == null) {
        return;
      }

      var createPopper$1 = options.createPopper || createPopper;
      var popperInstance = createPopper$1(referenceElement, popperElement, popperOptions);
      popperInstanceRef.current = popperInstance;
      return function () {
        popperInstance.destroy();
        popperInstanceRef.current = null;
      };
    }, [referenceElement, popperElement, options.createPopper]);
    return {
      state: popperInstanceRef.current ? popperInstanceRef.current.state : null,
      styles: state.styles,
      attributes: state.attributes,
      update: popperInstanceRef.current ? popperInstanceRef.current.update : null,
      forceUpdate: popperInstanceRef.current ? popperInstanceRef.current.forceUpdate : null
    };
  };

  var setPopperWidth = {
    enabled: true,
    fn: function fn(data) {
      // eslint-disable-next-line no-param-reassign
      data.state.styles.popper.width = "".concat(data.state.rects.reference.width, "px");
    },
    name: 'setPopperWidth',
    phase: 'write'
  };
  function getModifiers(props) {
    var modifiers = [{
      enabled: !!props.flip,
      name: 'flip'
    }];

    if (props.align !== 'right' && props.align !== 'left') {
      modifiers.push(setPopperWidth);
    }

    return modifiers;
  }
  function getPlacement(props) {
    var x = props.align === 'right' ? 'end' : 'start';
    var y = props.dropup ? 'top' : 'bottom';
    return "".concat(y, "-").concat(x);
  }
  function useOverlay(referenceElement, options) {
    var _useState = React.useState(null),
        _useState2 = _slicedToArray(_useState, 2),
        popperElement = _useState2[0],
        attachRef = _useState2[1];

    var _usePopper = usePopper(referenceElement, popperElement, {
      modifiers: getModifiers(options),
      placement: getPlacement(options),
      strategy: options.positionFixed ? 'fixed' : 'absolute'
    }),
        attributes = _usePopper.attributes,
        styles = _usePopper.styles,
        forceUpdate = _usePopper.forceUpdate;

    var refElementHeight = referenceElement === null || referenceElement === void 0 ? void 0 : referenceElement.offsetHeight; // Re-position the popper if the height of the reference element changes.
    // Exclude `forceUpdate` from dependencies since it changes with each render.

    React.useEffect(function () {
      forceUpdate && forceUpdate();
    }, [refElementHeight]); // eslint-disable-line

    return _objectSpread2(_objectSpread2({}, attributes.popper), {}, {
      innerRef: attachRef,
      style: styles.popper
    });
  }

  var _excluded$9 = ["referenceElement", "isMenuShown"];

  /* istanbul ignore next */

  var SafeElement = typeof Element === 'undefined' ? noop$1 : Element;
  var propTypes$6 = {
    /**
     * Specify menu alignment. The default value is `justify`, which makes the
     * menu as wide as the input and truncates long values. Specifying `left`
     * or `right` will align the menu to that side and the width will be
     * determined by the length of menu item values.
     */
    align: propTypes$b.exports.oneOf(ALIGN_VALUES),
    children: propTypes$b.exports.func.isRequired,

    /**
     * Specify whether the menu should appear above the input.
     */
    dropup: propTypes$b.exports.bool,

    /**
     * Whether or not to automatically adjust the position of the menu when it
     * reaches the viewport boundaries.
     */
    flip: propTypes$b.exports.bool,
    isMenuShown: propTypes$b.exports.bool,
    positionFixed: propTypes$b.exports.bool,
    // @ts-ignore
    referenceElement: propTypes$b.exports.instanceOf(SafeElement)
  };

  var Overlay = function Overlay(_ref) {
    var referenceElement = _ref.referenceElement,
        isMenuShown = _ref.isMenuShown,
        props = _objectWithoutProperties(_ref, _excluded$9);

    var overlayProps = useOverlay(referenceElement, props);

    if (!isMenuShown) {
      return null;
    }

    return props.children(overlayProps);
  };

  Overlay.propTypes = propTypes$6;

  /* eslint-disable no-bitwise, no-cond-assign */

  /**
   * Checks if an element contains another given element.
   * 
   * @param context the context element
   * @param node the element to check
   */
  function contains(context, node) {
    // HTML DOM and SVG DOM may have different support levels,
    // so we need to check on context instead of a document root element.
    if (context.contains) return context.contains(node);
    if (context.compareDocumentPosition) return context === node || !!(context.compareDocumentPosition(node) & 16);
  }

  var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

  /* eslint-disable no-return-assign */
  var optionsSupported = false;
  var onceSupported = false;

  try {
    var options = {
      get passive() {
        return optionsSupported = true;
      },

      get once() {
        // eslint-disable-next-line no-multi-assign
        return onceSupported = optionsSupported = true;
      }

    };

    if (canUseDOM) {
      window.addEventListener('test', options, options);
      window.removeEventListener('test', options, true);
    }
  } catch (e) {
    /* */
  }

  /**
   * An `addEventListener` ponyfill, supports the `once` option
   * 
   * @param node the element
   * @param eventName the event name
   * @param handle the handler
   * @param options event options
   */
  function addEventListener(node, eventName, handler, options) {
    if (options && typeof options !== 'boolean' && !onceSupported) {
      var once = options.once,
          capture = options.capture;
      var wrappedHandler = handler;

      if (!onceSupported && once) {
        wrappedHandler = handler.__once || function onceHandler(event) {
          this.removeEventListener(eventName, onceHandler, capture);
          handler.call(this, event);
        };

        handler.__once = wrappedHandler;
      }

      node.addEventListener(eventName, wrappedHandler, optionsSupported ? options : capture);
    }

    node.addEventListener(eventName, handler, options);
  }

  /**
   * A `removeEventListener` ponyfill
   * 
   * @param node the element
   * @param eventName the event name
   * @param handle the handler
   * @param options event options
   */
  function removeEventListener(node, eventName, handler, options) {
    var capture = options && typeof options !== 'boolean' ? options.capture : options;
    node.removeEventListener(eventName, handler, capture);

    if (handler.__once) {
      node.removeEventListener(eventName, handler.__once, capture);
    }
  }

  function listen(node, eventName, handler, options) {
    addEventListener(node, eventName, handler, options);
    return function () {
      removeEventListener(node, eventName, handler, options);
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
    var ref = React.useRef(value);
    React.useEffect(function () {
      ref.current = value;
    }, [value]);
    return ref;
  }

  function useEventCallback(fn) {
    var ref = useCommittedRef(fn);
    return React.useCallback(function () {
      return ref.current && ref.current.apply(ref, arguments);
    }, [ref]);
  }

  /**
   * Returns the owner document of a given element.
   * 
   * @param node the element
   */
  function ownerDocument$1(node) {
    return node && node.ownerDocument || document;
  }

  function safeFindDOMNode(componentOrElement) {
    if (componentOrElement && 'setState' in componentOrElement) {
      return ReactDOM__default["default"].findDOMNode(componentOrElement);
    }

    return componentOrElement != null ? componentOrElement : null;
  }

  var ownerDocument = (function (componentOrElement) {
    return ownerDocument$1(safeFindDOMNode(componentOrElement));
  });

  var escapeKeyCode = 27;

  var noop = function noop() {};

  function isLeftClickEvent(event) {
    return event.button === 0;
  }

  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }

  var getRefTarget = function getRefTarget(ref) {
    return ref && ('current' in ref ? ref.current : ref);
  };

  /**
   * The `useRootClose` hook registers your callback on the document
   * when rendered. Powers the `<Overlay/>` component. This is used achieve modal
   * style behavior where your callback is triggered when the user tries to
   * interact with the rest of the document or hits the `esc` key.
   *
   * @param {Ref<HTMLElement>| HTMLElement} ref  The element boundary
   * @param {function} onRootClose
   * @param {object=}  options
   * @param {boolean=} options.disabled
   * @param {string=}  options.clickTrigger The DOM event name (click, mousedown, etc) to attach listeners on
   */
  function useRootClose$1(ref, onRootClose, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        disabled = _ref.disabled,
        _ref$clickTrigger = _ref.clickTrigger,
        clickTrigger = _ref$clickTrigger === void 0 ? 'click' : _ref$clickTrigger;

    var preventMouseRootCloseRef = React.useRef(false);
    var onClose = onRootClose || noop;
    var handleMouseCapture = React.useCallback(function (e) {
      var _e$composedPath$;

      var currentTarget = getRefTarget(ref);
      warning_1(!!currentTarget, 'RootClose captured a close event but does not have a ref to compare it to. ' + 'useRootClose(), should be passed a ref that resolves to a DOM node');
      preventMouseRootCloseRef.current = !currentTarget || isModifiedEvent(e) || !isLeftClickEvent(e) || !!contains(currentTarget, (_e$composedPath$ = e.composedPath == null ? void 0 : e.composedPath()[0]) != null ? _e$composedPath$ : e.target);
    }, [ref]);
    var handleMouse = useEventCallback(function (e) {
      if (!preventMouseRootCloseRef.current) {
        onClose(e);
      }
    });
    var handleKeyUp = useEventCallback(function (e) {
      if (e.keyCode === escapeKeyCode) {
        onClose(e);
      }
    });
    React.useEffect(function () {
      if (disabled || ref == null) return undefined; // Store the current event to avoid triggering handlers immediately
      // https://github.com/facebook/react/issues/20074

      var currentEvent = window.event;
      var doc = ownerDocument(getRefTarget(ref)); // Use capture for this listener so it fires before React's listener, to
      // avoid false positives in the contains() check below if the target DOM
      // element is removed in the React mouse callback.

      var removeMouseCaptureListener = listen(doc, clickTrigger, handleMouseCapture, true);
      var removeMouseListener = listen(doc, clickTrigger, function (e) {
        // skip if this event is the same as the one running when we added the handlers
        if (e === currentEvent) {
          currentEvent = undefined;
          return;
        }

        handleMouse(e);
      });
      var removeKeyupListener = listen(doc, 'keyup', function (e) {
        // skip if this event is the same as the one running when we added the handlers
        if (e === currentEvent) {
          currentEvent = undefined;
          return;
        }

        handleKeyUp(e);
      });
      var mobileSafariHackListeners = [];

      if ('ontouchstart' in doc.documentElement) {
        mobileSafariHackListeners = [].slice.call(doc.body.children).map(function (el) {
          return listen(el, 'mousemove', noop);
        });
      }

      return function () {
        removeMouseCaptureListener();
        removeMouseListener();
        removeKeyupListener();
        mobileSafariHackListeners.forEach(function (remove) {
          return remove();
        });
      };
    }, [ref, disabled, clickTrigger, handleMouseCapture, handleMouse, handleKeyUp]);
  }

  function useRootClose(onRootClose, options) {
    var rootElementRef = React.useRef(null);

    useRootClose$1(rootElementRef.current, onRootClose, options);

    return rootElementRef;
  }

  var _excluded$8 = ["children", "onRootClose"];

  function RootClose(_ref) {
    var children = _ref.children,
        onRootClose = _ref.onRootClose,
        props = _objectWithoutProperties(_ref, _excluded$8);

    var rootRef = useRootClose(onRootClose, props);
    return children(rootRef);
  }

  var _excluded$7 = ["onBlur", "onClick", "onFocus", "onRemove", "option"];
  var propTypes$5 = {
    onBlur: propTypes$b.exports.func,
    onClick: propTypes$b.exports.func,
    onFocus: propTypes$b.exports.func,
    onRemove: propTypes$b.exports.func,
    option: optionType.isRequired
  };
  function useToken(_ref) {
    var onBlur = _ref.onBlur,
        onClick = _ref.onClick,
        onFocus = _ref.onFocus,
        onRemove = _ref.onRemove,
        option = _ref.option,
        props = _objectWithoutProperties(_ref, _excluded$7);

    var _useState = React.useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        active = _useState2[0],
        setActive = _useState2[1];

    var _useState3 = React.useState(null),
        _useState4 = _slicedToArray(_useState3, 2),
        rootElement = _useState4[0],
        attachRef = _useState4[1];

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

    useRootClose$1(rootElement, handleBlur, _objectSpread2(_objectSpread2({}, props), {}, {
      disabled: !active
    }));
    return {
      active: active,
      onBlur: handleBlur,
      onClick: handleClick,
      onFocus: handleFocus,
      onKeyDown: handleKeyDown,
      onRemove: isFunction(onRemove) ? handleRemove : undefined,
      ref: attachRef
    };
  }
  /* istanbul ignore next */

  function withToken(Component) {
    warn(false, 'Warning: `withToken` is deprecated and will be removed in the next ' + 'major version. Use `useToken` instead.');
    var displayName = "withToken(".concat(getDisplayName(Component), ")");

    var WrappedToken = function WrappedToken(props) {
      return /*#__PURE__*/React__default["default"].createElement(Component, _extends({}, props, useToken(props)));
    };

    WrappedToken.displayName = displayName;
    WrappedToken.propTypes = propTypes$5;
    return WrappedToken;
  }

  var _excluded$6 = ["active", "children", "className", "onRemove", "tabIndex"],
      _excluded2 = ["children", "option", "readOnly"],
      _excluded3 = ["ref"];
  var InteractiveToken = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
    var active = _ref.active,
        children = _ref.children,
        className = _ref.className,
        onRemove = _ref.onRemove,
        tabIndex = _ref.tabIndex,
        props = _objectWithoutProperties(_ref, _excluded$6);

    return /*#__PURE__*/React__default["default"].createElement("div", _extends({}, props, {
      className: cx('rbt-token', 'rbt-token-removeable', {
        'rbt-token-active': !!active
      }, className),
      ref: ref,
      tabIndex: tabIndex || 0
    }), children, /*#__PURE__*/React__default["default"].createElement(ClearButton, {
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
      return /*#__PURE__*/React__default["default"].createElement("a", {
        className: classnames,
        href: href
      }, children);
    }

    return /*#__PURE__*/React__default["default"].createElement("div", {
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

    var child = /*#__PURE__*/React__default["default"].createElement("div", {
      className: "rbt-token-label"
    }, children);
    return !props.disabled && !readOnly && isFunction(tokenProps.onRemove) ? /*#__PURE__*/React__default["default"].createElement(InteractiveToken, _extends({}, props, tokenProps, {
      ref: ref
    }), child) : /*#__PURE__*/React__default["default"].createElement(StaticToken, props, child);
  };

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

  var useHint = function useHint() {
    var _useTypeaheadContext = useTypeaheadContext(),
        hintText = _useTypeaheadContext.hintText,
        inputNode = _useTypeaheadContext.inputNode;

    var hintRef = React.useRef(null);
    React.useEffect(function () {
      if (inputNode && hintRef.current) {
        copyStyles(inputNode, hintRef.current);
      }
    });
    return {
      hintRef: hintRef,
      hintText: hintText
    };
  };

  var Hint = function Hint(_ref) {
    var children = _ref.children,
        className = _ref.className;

    var _useHint = useHint(),
        hintRef = _useHint.hintRef,
        hintText = _useHint.hintText;

    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: className,
      style: {
        display: 'flex',
        flex: 1,
        height: '100%',
        position: 'relative'
      }
    }, children, /*#__PURE__*/React__default["default"].createElement("input", {
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
    return /*#__PURE__*/React__default["default"].createElement("input", _extends({}, props, {
      className: cx('rbt-input-main', props.className),
      ref: ref
    }));
  });

  var _excluded$5 = ["children", "className", "inputClassName", "inputRef", "referenceElementRef", "selected"];

  function TypeaheadInputMulti(props) {
    var wrapperRef = React__default["default"].useRef(null);
    var inputElem = React__default["default"].useRef(null);

    var _propsWithBsClassName = propsWithBsClassName(props),
        children = _propsWithBsClassName.children,
        className = _propsWithBsClassName.className,
        inputClassName = _propsWithBsClassName.inputClassName;
        _propsWithBsClassName.inputRef;
        var referenceElementRef = _propsWithBsClassName.referenceElementRef,
        selected = _propsWithBsClassName.selected,
        rest = _objectWithoutProperties(_propsWithBsClassName, _excluded$5);

    function getInputRef(input) {
      inputElem.current = input;
      props.inputRef(input);
    }
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

      if (!inputNode || // Ignore if the clicked element is a child of the container, ie: a token
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
        e.preventDefault(); // If the input is selected and there is no text, focus the last
        // token when the user hits backspace.

        var wrapperChildren = (_wrapperRef$current = wrapperRef.current) === null || _wrapperRef$current === void 0 ? void 0 : _wrapperRef$current.children;

        if (wrapperChildren !== null && wrapperChildren !== void 0 && wrapperChildren.length) {
          var lastToken = wrapperChildren[wrapperChildren.length - 2];
          lastToken === null || lastToken === void 0 ? void 0 : lastToken.focus();
        }
      }

      props.onKeyDown && props.onKeyDown(e);
    }

    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: cx('rbt-input-multi', {
        disabled: props.disabled
      }, className),
      onClick: handleContainerClickOrFocus,
      onFocus: handleContainerClickOrFocus,
      ref: referenceElementRef,
      tabIndex: -1
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "rbt-input-wrapper",
      ref: wrapperRef
    }, children, /*#__PURE__*/React__default["default"].createElement(Hint, null, /*#__PURE__*/React__default["default"].createElement(Input, _extends({}, rest, {
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

  var _excluded$4 = ["inputRef", "referenceElementRef"];

  var TypeaheadInputSingle = function TypeaheadInputSingle(_ref) {
    var inputRef = _ref.inputRef,
        referenceElementRef = _ref.referenceElementRef,
        props = _objectWithoutProperties(_ref, _excluded$4);

    return /*#__PURE__*/React__default["default"].createElement(Hint, null, /*#__PURE__*/React__default["default"].createElement(Input, _extends({}, propsWithBsClassName(props), {
      ref: function ref(node) {
        inputRef(node);
        referenceElementRef(node);
      }
    })));
  };

  var propTypes$4 = {
    children: propTypes$b.exports.string.isRequired,
    highlightClassName: propTypes$b.exports.string,
    search: propTypes$b.exports.string.isRequired
  };
  var defaultProps$3 = {
    highlightClassName: 'rbt-highlight-text'
  };

  /**
   * Stripped-down version of https://github.com/helior/react-highlighter
   *
   * Results are already filtered by the time the component is used internally so
   * we can safely ignore case and diacritical marks for the purposes of matching.
   */
  var Highlighter = function Highlighter(_ref) {
    var children = _ref.children,
        highlightClassName = _ref.highlightClassName,
        search = _ref.search;

    if (!search || !children) {
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, children);
    }

    var matchCount = 0;
    var remaining = children;
    var highlighterChildren = [];

    while (remaining) {
      var bounds = getMatchBounds(remaining, search); // No match anywhere in the remaining string, stop.

      if (!bounds) {
        highlighterChildren.push(remaining);
        break;
      } // Capture the string that leads up to a match.


      var nonMatch = remaining.slice(0, bounds.start);

      if (nonMatch) {
        highlighterChildren.push(nonMatch);
      } // Capture the matching string.


      var match = remaining.slice(bounds.start, bounds.end);
      highlighterChildren.push( /*#__PURE__*/React__default["default"].createElement("mark", {
        className: highlightClassName,
        key: matchCount
      }, match));
      matchCount += 1; // And if there's anything left over, continue the loop.

      remaining = remaining.slice(bounds.end);
    }

    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, highlighterChildren);
  };

  Highlighter.propTypes = propTypes$4;
  Highlighter.defaultProps = defaultProps$3;

  function t(t){return "object"==typeof t&&null!=t&&1===t.nodeType}function e(t,e){return (!e||"hidden"!==t)&&"visible"!==t&&"clip"!==t}function n(t,n){if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){var r=getComputedStyle(t,null);return e(r.overflowY,n)||e(r.overflowX,n)||function(t){var e=function(t){if(!t.ownerDocument||!t.ownerDocument.defaultView)return null;try{return t.ownerDocument.defaultView.frameElement}catch(t){return null}}(t);return !!e&&(e.clientHeight<t.scrollHeight||e.clientWidth<t.scrollWidth)}(t)}return !1}function r(t,e,n,r,i,o,l,d){return o<t&&l>e||o>t&&l<e?0:o<=t&&d<=n||l>=e&&d>=n?o-t-r:l>e&&d<n||o<t&&d>n?l-e+i:0}function compute(e,i){var o=window,l=i.scrollMode,d=i.block,u=i.inline,h=i.boundary,a=i.skipOverflowHiddenElements,c="function"==typeof h?h:function(t){return t!==h};if(!t(e))throw new TypeError("Invalid target");for(var f=document.scrollingElement||document.documentElement,s=[],p=e;t(p)&&c(p);){if((p=p.parentElement)===f){s.push(p);break}null!=p&&p===document.body&&n(p)&&!n(document.documentElement)||null!=p&&n(p,a)&&s.push(p);}for(var m=o.visualViewport?o.visualViewport.width:innerWidth,g=o.visualViewport?o.visualViewport.height:innerHeight,w=window.scrollX||pageXOffset,v=window.scrollY||pageYOffset,W=e.getBoundingClientRect(),b=W.height,H=W.width,y=W.top,E=W.right,M=W.bottom,V=W.left,x="start"===d||"nearest"===d?y:"end"===d?M:y+b/2,I="center"===u?V+H/2:"end"===u?E:V,C=[],T=0;T<s.length;T++){var k=s[T],B=k.getBoundingClientRect(),D=B.height,O=B.width,R=B.top,X=B.right,Y=B.bottom,L=B.left;if("if-needed"===l&&y>=0&&V>=0&&M<=g&&E<=m&&y>=R&&M<=Y&&V>=L&&E<=X)return C;var S=getComputedStyle(k),j=parseInt(S.borderLeftWidth,10),q=parseInt(S.borderTopWidth,10),z=parseInt(S.borderRightWidth,10),A=parseInt(S.borderBottomWidth,10),F=0,G=0,J="offsetWidth"in k?k.offsetWidth-k.clientWidth-j-z:0,K="offsetHeight"in k?k.offsetHeight-k.clientHeight-q-A:0;if(f===k)F="start"===d?x:"end"===d?x-g:"nearest"===d?r(v,v+g,g,q,A,v+x,v+x+b,b):x-g/2,G="start"===u?I:"center"===u?I-m/2:"end"===u?I-m:r(w,w+m,m,j,z,w+I,w+I+H,H),F=Math.max(0,F+v),G=Math.max(0,G+w);else {F="start"===d?x-R-q:"end"===d?x-Y+A+K:"nearest"===d?r(R,Y,D,q,A+K,x,x+b,b):x-(R+D/2)+K/2,G="start"===u?I-L-j:"center"===u?I-(L+O/2)+J/2:"end"===u?I-X+z+J:r(L,X,O,j,z+J,I,I+H,H);var N=k.scrollLeft,P=k.scrollTop;x+=P-(F=Math.max(0,Math.min(P+F,k.scrollHeight-D+K))),I+=N-(G=Math.max(0,Math.min(N+G,k.scrollWidth-O+J)));}C.push({el:k,top:F,left:G});}return C}

  function isOptionsObject(options) {
    return options === Object(options) && Object.keys(options).length !== 0;
  }

  function defaultBehavior(actions, behavior) {
    if (behavior === void 0) {
      behavior = 'auto';
    }

    var canSmoothScroll = ('scrollBehavior' in document.body.style);
    actions.forEach(function (_ref) {
      var el = _ref.el,
          top = _ref.top,
          left = _ref.left;

      if (el.scroll && canSmoothScroll) {
        el.scroll({
          top: top,
          left: left,
          behavior: behavior
        });
      } else {
        el.scrollTop = top;
        el.scrollLeft = left;
      }
    });
  }

  function getOptions(options) {
    if (options === false) {
      return {
        block: 'end',
        inline: 'nearest'
      };
    }

    if (isOptionsObject(options)) {
      return options;
    }

    return {
      block: 'start',
      inline: 'nearest'
    };
  }

  function scrollIntoView(target, options) {
    var isTargetAttached = target.isConnected || target.ownerDocument.documentElement.contains(target);

    if (isOptionsObject(options) && typeof options.behavior === 'function') {
      return options.behavior(isTargetAttached ? compute(target, options) : []);
    }

    if (!isTargetAttached) {
      return;
    }

    var computeOptions = getOptions(options);
    return defaultBehavior(compute(target, computeOptions), computeOptions.behavior);
  }

  var _excluded$3 = ["label", "onClick", "option", "position"];
  var propTypes$3 = {
    option: optionType.isRequired,
    position: propTypes$b.exports.number
  };
  function useItem(_ref) {
    var label = _ref.label,
        onClick = _ref.onClick,
        option = _ref.option,
        position = _ref.position,
        props = _objectWithoutProperties(_ref, _excluded$3);

    var _useTypeaheadContext = useTypeaheadContext(),
        activeIndex = _useTypeaheadContext.activeIndex,
        id = _useTypeaheadContext.id,
        isOnlyResult = _useTypeaheadContext.isOnlyResult,
        onActiveItemChange = _useTypeaheadContext.onActiveItemChange,
        onInitialItemChange = _useTypeaheadContext.onInitialItemChange,
        onMenuItemClick = _useTypeaheadContext.onMenuItemClick,
        setItem = _useTypeaheadContext.setItem;

    var itemRef = React.useRef(null);
    React.useEffect(function () {
      if (position === 0) {
        onInitialItemChange(option);
      }
    });
    React.useEffect(function () {
      if (position === activeIndex) {
        onActiveItemChange(option); // Automatically scroll the menu as the user keys through it.

        var node = itemRef.current;
        node && scrollIntoView(node, {
          block: 'nearest',
          boundary: node.parentNode,
          inline: 'nearest',
          scrollMode: 'if-needed'
        });
      }
    });
    var handleClick = React.useCallback(function (e) {
      onMenuItemClick(option, e);
      onClick && onClick(e);
    }, [onClick, onMenuItemClick, option]);
    var active = isOnlyResult || activeIndex === position; // Update the item's position in the item stack.

    setItem(option, position);
    return _objectSpread2(_objectSpread2({}, props), {}, {
      active: active,
      'aria-label': label,
      'aria-selected': active,
      id: getMenuItemId(id, position),
      onClick: handleClick,
      onMouseDown: preventInputBlur,
      ref: itemRef,
      role: 'option'
    });
  }
  /* istanbul ignore next */

  function withItem(Component) {
    warn(false, 'Warning: `withItem` is deprecated and will be removed in the next ' + 'major version. Use `useItem` instead.');

    var WrappedMenuItem = function WrappedMenuItem(props) {
      return /*#__PURE__*/React__default["default"].createElement(Component, _extends({}, props, useItem(props)));
    };

    WrappedMenuItem.displayName = "withItem(".concat(getDisplayName(Component), ")");
    WrappedMenuItem.propTypes = propTypes$3;
    return WrappedMenuItem;
  }

  var _excluded$2 = ["active", "children", "className", "disabled", "onClick"];
  var BaseMenuItem = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
    var active = _ref.active,
        children = _ref.children,
        className = _ref.className,
        disabled = _ref.disabled,
        _onClick = _ref.onClick,
        props = _objectWithoutProperties(_ref, _excluded$2);

    return /*#__PURE__*/React__default["default"].createElement("a", _extends({}, props, {
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
    return /*#__PURE__*/React__default["default"].createElement(BaseMenuItem, useItem(props));
  }

  var _excluded$1 = ["emptyLabel", "innerRef", "maxHeight", "style"];

  var MenuDivider = function MenuDivider() {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "dropdown-divider",
      role: "separator"
    });
  };

  var MenuHeader = function MenuHeader(props) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
      React__default["default"].createElement("div", _extends({}, props, {
        className: "dropdown-header",
        role: "heading"
      }))
    );
  };

  var propTypes$2 = {
    'aria-label': propTypes$b.exports.string,

    /**
     * Message to display in the menu if there are no valid results.
     */
    emptyLabel: propTypes$b.exports.node,

    /**
     * Needed for accessibility.
     */
    id: checkPropType(propTypes$b.exports.oneOfType([propTypes$b.exports.number, propTypes$b.exports.string]), isRequiredForA11y),

    /**
     * Maximum height of the dropdown menu.
     */
    maxHeight: propTypes$b.exports.string
  };
  var defaultProps$2 = {
    'aria-label': 'menu-options'
  };

  /**
   * Menu component that handles empty state when passed a set of results.
   */
  var Menu = function Menu(_ref) {
    var _ref$emptyLabel = _ref.emptyLabel,
        emptyLabel = _ref$emptyLabel === void 0 ? 'No matches found.' : _ref$emptyLabel,
        innerRef = _ref.innerRef,
        _ref$maxHeight = _ref.maxHeight,
        maxHeight = _ref$maxHeight === void 0 ? '300px' : _ref$maxHeight,
        style = _ref.style,
        props = _objectWithoutProperties(_ref, _excluded$1);

    var children = React.Children.count(props.children) === 0 ? /*#__PURE__*/React__default["default"].createElement(BaseMenuItem, {
      disabled: true,
      role: "option"
    }, emptyLabel) : props.children;
    return (
      /*#__PURE__*/

      /* eslint-disable jsx-a11y/interactive-supports-focus */
      React__default["default"].createElement("div", _extends({}, props, {
        className: cx('rbt-menu', 'dropdown-menu', 'show', props.className),
        onMouseDown: // Prevent input from blurring when clicking on the menu scrollbar.
        preventInputBlur,
        ref: innerRef,
        role: "listbox",
        style: _objectSpread2(_objectSpread2({}, style), {}, {
          display: 'block',
          maxHeight: maxHeight,
          overflow: 'auto'
        })
      }), children)
      /* eslint-enable jsx-a11y/interactive-supports-focus */

    );
  };

  Menu.propTypes = propTypes$2;
  Menu.defaultProps = defaultProps$2;
  Menu.Divider = MenuDivider;
  Menu.Header = MenuHeader;

  var _excluded = ["labelKey", "newSelectionPrefix", "options", "paginationText", "renderMenuItemChildren", "text"];
  var propTypes$1 = {
    /**
     * Provides the ability to specify a prefix before the user-entered text to
     * indicate that the selection will be new. No-op unless `allowNew={true}`.
     */
    newSelectionPrefix: propTypes$b.exports.node,

    /**
     * Prompt displayed when large data sets are paginated.
     */
    paginationText: propTypes$b.exports.node,

    /**
     * Provides a hook for customized rendering of menu item contents.
     */
    renderMenuItemChildren: propTypes$b.exports.func
  };
  var defaultProps$1 = {
    newSelectionPrefix: 'New selection: ',
    paginationText: 'Display additional results...',
    renderMenuItemChildren: function renderMenuItemChildren(option, props) {
      return /*#__PURE__*/React__default["default"].createElement(Highlighter, {
        search: props.text
      }, getOptionLabel(option, props.labelKey));
    }
  };

  var TypeaheadMenu = function TypeaheadMenu(props) {
    var labelKey = props.labelKey,
        newSelectionPrefix = props.newSelectionPrefix,
        options = props.options,
        paginationText = props.paginationText,
        renderMenuItemChildren = props.renderMenuItemChildren,
        text = props.text,
        menuProps = _objectWithoutProperties(props, _excluded);

    var renderMenuItem = function renderMenuItem(option, position) {
      var label = getOptionLabel(option, labelKey);
      var menuItemProps = {
        disabled: !!getOptionProperty(option, 'disabled'),
        label: label,
        option: option,
        position: position
      };

      if (getOptionProperty(option, 'customOption')) {
        return /*#__PURE__*/React__default["default"].createElement(MenuItem, _extends({}, menuItemProps, {
          className: "rbt-menu-custom-option",
          key: position,
          label: label
        }), newSelectionPrefix, /*#__PURE__*/React__default["default"].createElement(Highlighter, {
          search: text
        }, label));
      }

      if (getOptionProperty(option, 'paginationOption')) {
        return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, {
          key: "pagination-option-divider"
        }, /*#__PURE__*/React__default["default"].createElement(Menu.Divider, null), /*#__PURE__*/React__default["default"].createElement(MenuItem, _extends({}, menuItemProps, {
          className: "rbt-menu-pagination-option",
          label: // TODO: Fix how (aria-)labels are passed to `MenuItem`.
          // `paginationText` can be a ReactNode.
          isString(paginationText) ? paginationText : ''
        }), paginationText));
      }

      return /*#__PURE__*/React__default["default"].createElement(MenuItem, _extends({}, menuItemProps, {
        key: position
      }), renderMenuItemChildren(option, props, position));
    };

    return /*#__PURE__*/React__default["default"].createElement(Menu, _extends({}, menuProps, {
      key: // Force a re-render if the text changes to ensure that menu
      // positioning updates correctly.
      text
    }), options.map(renderMenuItem));
  };

  TypeaheadMenu.propTypes = propTypes$1;
  TypeaheadMenu.defaultProps = defaultProps$1;

  var propTypes = {
    /**
     * Displays a button to clear the input when there are selections.
     */
    clearButton: propTypes$b.exports.bool,

    /**
     * Props to be applied directly to the input. `onBlur`, `onChange`,
     * `onFocus`, and `onKeyDown` are ignored.
     */
    inputProps: checkPropType(propTypes$b.exports.object, inputPropsType),

    /**
     * Bootstrap 4 only. Adds the `is-invalid` classname to the `form-control`.
     */
    isInvalid: propTypes$b.exports.bool,

    /**
     * Indicate whether an asynchronous data fetch is happening.
     */
    isLoading: propTypes$b.exports.bool,

    /**
     * Bootstrap 4 only. Adds the `is-valid` classname to the `form-control`.
     */
    isValid: propTypes$b.exports.bool,

    /**
     * Callback for custom input rendering.
     */
    renderInput: propTypes$b.exports.func,

    /**
     * Callback for custom menu rendering.
     */
    renderMenu: propTypes$b.exports.func,

    /**
     * Callback for custom menu rendering.
     */
    renderToken: propTypes$b.exports.func,

    /**
     * Specifies the size of the input.
     */
    size: sizeType
  };
  var defaultProps = {
    isLoading: false
  };

  var defaultRenderMenu = function defaultRenderMenu(results, menuProps, props) {
    return /*#__PURE__*/React__default["default"].createElement(TypeaheadMenu, _extends({}, menuProps, {
      labelKey: props.labelKey,
      options: results,
      text: props.text
    }));
  };

  var defaultRenderToken = function defaultRenderToken(option, props, idx) {
    return /*#__PURE__*/React__default["default"].createElement(Token, {
      disabled: props.disabled,
      key: idx,
      onRemove: props.onRemove,
      option: option,
      tabIndex: props.tabIndex
    }, getOptionLabel(option, props.labelKey));
  };

  var overlayPropKeys = ['align', 'dropup', 'flip', 'positionFixed'];

  function getOverlayProps(props) {
    return pick(props, overlayPropKeys);
  }

  var TypeaheadComponent = /*#__PURE__*/function (_React$Component) {
    _inherits(TypeaheadComponent, _React$Component);

    var _super = _createSuper(TypeaheadComponent);

    function TypeaheadComponent() {
      var _this;

      _classCallCheck(this, TypeaheadComponent);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty(_assertThisInitialized(_this), "_referenceElement", null);

      _defineProperty(_assertThisInitialized(_this), "referenceElementRef", function (referenceElement) {
        _this._referenceElement = referenceElement;
      });

      _defineProperty(_assertThisInitialized(_this), "_renderInput", function (inputProps, props) {
        var _this$props = _this.props,
            isInvalid = _this$props.isInvalid,
            isValid = _this$props.isValid,
            multiple = _this$props.multiple,
            renderInput = _this$props.renderInput,
            renderToken = _this$props.renderToken,
            size = _this$props.size;

        if (isFunction(renderInput)) {
          return renderInput(inputProps, props);
        }

        var commonProps = _objectSpread2(_objectSpread2({}, inputProps), {}, {
          isInvalid: isInvalid,
          isValid: isValid,
          size: size
        });

        if (!multiple) {
          return /*#__PURE__*/React__default["default"].createElement(TypeaheadInputSingle, commonProps);
        }

        var labelKey = props.labelKey,
            onRemove = props.onRemove,
            selected = props.selected;
        return /*#__PURE__*/React__default["default"].createElement(TypeaheadInputMulti, _extends({}, commonProps, {
          placeholder: selected.length ? '' : inputProps.placeholder,
          selected: selected
        }), selected.map(function (option, idx) {
          return (renderToken || defaultRenderToken)(option, _objectSpread2(_objectSpread2({}, commonProps), {}, {
            labelKey: labelKey,
            onRemove: onRemove
          }), idx);
        }));
      });

      _defineProperty(_assertThisInitialized(_this), "_renderMenu", function (results, menuProps, props) {
        var _this$props2 = _this.props,
            emptyLabel = _this$props2.emptyLabel,
            id = _this$props2.id,
            maxHeight = _this$props2.maxHeight,
            newSelectionPrefix = _this$props2.newSelectionPrefix,
            paginationText = _this$props2.paginationText,
            renderMenu = _this$props2.renderMenu,
            renderMenuItemChildren = _this$props2.renderMenuItemChildren;
        return (renderMenu || defaultRenderMenu)(results, _objectSpread2(_objectSpread2({}, menuProps), {}, {
          emptyLabel: emptyLabel,
          id: id,
          maxHeight: maxHeight,
          newSelectionPrefix: newSelectionPrefix,
          paginationText: paginationText,
          renderMenuItemChildren: renderMenuItemChildren
        }), props);
      });

      _defineProperty(_assertThisInitialized(_this), "_renderAux", function (_ref) {
        var onClear = _ref.onClear,
            selected = _ref.selected;
        var _this$props3 = _this.props,
            clearButton = _this$props3.clearButton,
            disabled = _this$props3.disabled,
            isLoading = _this$props3.isLoading,
            size = _this$props3.size;
        var content;

        if (isLoading) {
          content = /*#__PURE__*/React__default["default"].createElement(Loader, null);
        } else if (clearButton && !disabled && selected.length) {
          content = /*#__PURE__*/React__default["default"].createElement(ClearButton, {
            onClick: onClear,
            onMouseDown: preventInputBlur,
            size: size
          });
        }

        return content ? /*#__PURE__*/React__default["default"].createElement("div", {
          className: cx('rbt-aux', {
            'rbt-aux-lg': isSizeLarge(size)
          })
        }, content) : null;
      });

      return _this;
    }

    _createClass(TypeaheadComponent, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props4 = this.props,
            children = _this$props4.children,
            className = _this$props4.className,
            instanceRef = _this$props4.instanceRef,
            open = _this$props4.open,
            options = _this$props4.options,
            style = _this$props4.style;
        return /*#__PURE__*/React__default["default"].createElement(Typeahead, _extends({}, this.props, {
          options: options,
          ref: instanceRef
        }), function (props) {
          var hideMenu = props.hideMenu,
              isMenuShown = props.isMenuShown,
              results = props.results;

          var auxContent = _this2._renderAux(props);

          return /*#__PURE__*/React__default["default"].createElement(RootClose, {
            disabled: open || !isMenuShown,
            onRootClose: hideMenu
          }, function (ref) {
            return /*#__PURE__*/React__default["default"].createElement("div", {
              className: cx('rbt', {
                'has-aux': !!auxContent,
                'is-invalid': _this2.props.isInvalid,
                'is-valid': _this2.props.isValid
              }, className),
              ref: ref,
              style: _objectSpread2(_objectSpread2({}, style), {}, {
                outline: 'none',
                position: 'relative'
              }),
              tabIndex: -1
            }, _this2._renderInput(_objectSpread2(_objectSpread2({}, props.getInputProps(_this2.props.inputProps)), {}, {
              referenceElementRef: _this2.referenceElementRef
            }), props), /*#__PURE__*/React__default["default"].createElement(Overlay, _extends({}, getOverlayProps(_this2.props), {
              isMenuShown: isMenuShown,
              referenceElement: _this2._referenceElement
            }), function (menuProps) {
              return _this2._renderMenu(results, menuProps, props);
            }), auxContent, isFunction(children) ? children(props) : children);
          });
        });
      }
    }]);

    return TypeaheadComponent;
  }(React__default["default"].Component);

  _defineProperty(TypeaheadComponent, "propTypes", propTypes);

  _defineProperty(TypeaheadComponent, "defaultProps", defaultProps);

  var TypeaheadComponent$1 = /*#__PURE__*/React.forwardRef(function (props, ref) {
    return /*#__PURE__*/React__default["default"].createElement(TypeaheadComponent, _extends({}, props, {
      instanceRef: ref
    }));
  });

  var AsyncTypeahead = /*#__PURE__*/React.forwardRef(function (props, ref) {
    return /*#__PURE__*/React__default["default"].createElement(TypeaheadComponent$1, _extends({}, useAsync(props), {
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
  exports.Typeahead = TypeaheadComponent$1;
  exports.TypeaheadInputMulti = TypeaheadInputMulti;
  exports.TypeaheadInputSingle = TypeaheadInputSingle;
  exports.TypeaheadMenu = TypeaheadMenu;
  exports.TypeaheadRef = Typeahead;
  exports.useAsync = useAsync;
  exports.useHint = useHint;
  exports.useItem = useItem;
  exports.useToken = useToken;
  exports.withAsync = withAsync;
  exports.withItem = withItem;
  exports.withToken = withToken;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
