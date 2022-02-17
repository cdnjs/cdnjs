(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactBootstrapTypeahead = {}, global.React, global.ReactDOM));
}(this, (function (exports, React, ReactDOM) { 'use strict';

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
            get: function () {
              return e[k];
            }
          });
        }
      });
    }
    n['default'] = e;
    return Object.freeze(n);
  }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var React__namespace = /*#__PURE__*/_interopNamespace(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty$1(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
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
    return Constructor;
  }

  function _defineProperty$1(obj, key, value) {
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

  function _extends$2() {
    _extends$2 = Object.assign || function (target) {
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

    return _extends$2.apply(this, arguments);
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
    if (superClass) _setPrototypeOf$1(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf$1(o, p) {
    _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf$1(o, p);
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

  function _objectWithoutPropertiesLoose$1(source, excluded) {
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

    var target = _objectWithoutPropertiesLoose$1(source, excluded);

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

  function _assertThisInitialized$1(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$1(self);
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

  {
    reactIs.exports = reactIs_development;
  }

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
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

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
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

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactPropTypesSecret$2 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  var ReactPropTypesSecret_1 = ReactPropTypesSecret$2;

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var printWarning$2 = function() {};

  {
    var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
    var loggedTypeFailures = {};
    var has$3 = Function.call.bind(Object.prototype.hasOwnProperty);

    printWarning$2 = function(text) {
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
  function checkPropTypes$1(typeSpecs, values, location, componentName, getStack) {
    {
      for (var typeSpecName in typeSpecs) {
        if (has$3(typeSpecs, typeSpecName)) {
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
                'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
              );
              err.name = 'Invariant Violation';
              throw err;
            }
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error)) {
            printWarning$2(
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

            printWarning$2(
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
  checkPropTypes$1.resetWarningCache = function() {
    {
      loggedTypeFailures = {};
    }
  };

  var checkPropTypes_1 = checkPropTypes$1;

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactIs$1 = reactIs.exports;
  var assign = objectAssign;

  var ReactPropTypesSecret = ReactPropTypesSecret_1;
  var checkPropTypes = checkPropTypes_1;

  var has$2 = Function.call.bind(Object.prototype.hasOwnProperty);
  var printWarning$1 = function() {};

  {
    printWarning$1 = function(text) {
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

  var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
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
    function PropTypeError(message) {
      this.message = message;
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
              printWarning$1(
                'You are manually calling a React.PropTypes validation ' +
                'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
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

          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
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
        if (!ReactIs$1.isValidElementType(propValue)) {
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
            printWarning$1(
              'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
              'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
            );
          } else {
            printWarning$1('Invalid argument supplied to oneOf, expected an array.');
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
          if (has$2(propValue, key)) {
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
        printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.') ;
        return emptyFunctionThatReturnsNull;
      }

      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (typeof checker !== 'function') {
          printWarning$1(
            'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
            'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
          );
          return emptyFunctionThatReturnsNull;
        }
      }

      function validate(props, propName, componentName, location, propFullName) {
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
            return null;
          }
        }

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
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

    function createShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        for (var key in shapeTypes) {
          var checker = shapeTypes[key];
          if (!checker) {
            continue;
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
        // We need to check all keys in case some are required but missing from
        // props.
        var allKeys = assign({}, props[propName], shapeTypes);
        for (var key in allKeys) {
          var checker = shapeTypes[key];
          if (!checker) {
            return new PropTypeError(
              'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
              '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
              '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
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

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    var ReactIs = reactIs.exports;

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    propTypes$b.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
  }

  var PropTypes = propTypes$b.exports;

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

  /**
   * Common (non-printable) keycodes for `keydown` and `keyup` events. Note that
   * `keypress` handles things differently and may not return the same values.
   */
  var BACKSPACE = 8;
  var TAB = 9;
  var RETURN = 13;
  var ESC = 27;
  var UP = 38;
  var RIGHT = 39;
  var DOWN = 40;
  var DEFAULT_LABELKEY = 'label';
  var ALIGN = {
    JUSTIFY: 'justify',
    LEFT: 'left',
    RIGHT: 'right'
  };
  var SIZE = {
    LARGE: 'large',
    LG: 'lg',
    SM: 'sm',
    SMALL: 'small'
  };

  function getStringLabelKey(labelKey) {
    return typeof labelKey === 'string' ? labelKey : DEFAULT_LABELKEY;
  }

  var idCounter = 0;
  function head(arr) {
    return Array.isArray(arr) && arr.length ? arr[0] : undefined;
  }
  function isFunction$2(value) {
    return typeof value === 'function';
  }
  function isString(value) {
    return typeof value === 'string';
  }
  function noop$1() {}
  function pick(obj, keys) {
    var result = {};
    keys.forEach(function (k) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) {
        result[k] = obj[k];
      }
    });
    return result;
  }
  function uniqueId(prefix) {
    idCounter += 1;
    return (prefix == null ? '' : String(prefix)) + idCounter;
  } // Export for testing purposes.

  function valuesPolyfill(obj) {
    return Object.keys(obj).reduce(function (accum, key) {
      if (Object.prototype.propertyIsEnumerable.call(obj, key)) {
        accum.push(obj[key]);
      }

      return accum;
    }, []);
  }
  function values(obj) {
    return isFunction$2(Object.values) ? Object.values(obj) : valuesPolyfill(obj);
  }

  /**
   * Retrieves the display string from an option. Options can be the string
   * themselves, or an object with a defined display string. Anything else throws
   * an error.
   */
  function getOptionLabel(option, labelKey) {
    // Handle internally created options first.
    if (!isString(option) && (option.paginationOption || option.customOption)) {
      return option[getStringLabelKey(labelKey)];
    }

    var optionLabel;

    if (isFunction$2(labelKey)) {
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


    if (typeof allowNew === 'function') {
      return allowNew(results, props);
    } // By default, don't add the custom option if there is an exact text match
    // with an existing option.


    return !results.some(function (o) {
      return getOptionLabel(o, labelKey) === text;
    });
  }

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

  /* eslint-disable max-len */
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
  }];
  /* eslint-enable max-len */

  var diacriticsMap = {};

  for (var ii = 0; ii < map.length; ii++) {
    var letters = map[ii].letters;

    for (var jj = 0; jj < letters.length; jj++) {
      diacriticsMap[letters[jj]] = map[ii].base;
    }
  } // "what?" version ... http://jsperf.com/diacritics/12


  function stripDiacritics(str) {
    return str.replace(/[\u0300-\u036F]/g, '') // Remove combining diacritics

    /* eslint-disable-next-line no-control-regex */
    .replace(/[^\u0000-\u007E]/g, function (a) {
      return diacriticsMap[a] || a;
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

    if (isFunction$2(labelKey) && isMatch(text, labelKey(option), props)) {
      return true;
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

  function getHintText(props) {
    var activeIndex = props.activeIndex,
        initialItem = props.initialItem,
        isFocused = props.isFocused,
        isMenuShown = props.isMenuShown,
        labelKey = props.labelKey,
        multiple = props.multiple,
        selected = props.selected,
        text = props.text; // Don't display a hint under the following conditions:

    if ( // No text entered.
    !text || // The input is not focused.
    !isFocused || // The menu is hidden.
    !isMenuShown || // No item in the menu.
    !initialItem || // The initial item is a custom option.
    initialItem.customOption || // One of the menu items is active.
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
  }(classnames));

  var cx = classnames.exports;

  function getMenuItemId(id, position) {
    return "".concat(id || '', "-item-").concat(position);
  }

  var _excluded$e = ["activeIndex", "id", "isFocused", "isMenuShown", "multiple", "onFocus", "placeholder"],
      _excluded2$2 = ["className"];

  var getInputProps = function getInputProps(_ref) {
    var activeIndex = _ref.activeIndex,
        id = _ref.id,
        isFocused = _ref.isFocused,
        isMenuShown = _ref.isMenuShown,
        multiple = _ref.multiple,
        onFocus = _ref.onFocus,
        placeholder = _ref.placeholder,
        rest = _objectWithoutProperties(_ref, _excluded$e);

    return function () {
      var _cx;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          className = _ref2.className,
          inputProps = _objectWithoutProperties(_ref2, _excluded2$2);

      var props = _objectSpread2(_objectSpread2(_objectSpread2({
        /* eslint-disable sort-keys */
        // These props can be overridden by values in `inputProps`.
        autoComplete: 'off',
        placeholder: placeholder,
        type: 'text'
      }, inputProps), rest), {}, {
        'aria-activedescendant': activeIndex >= 0 ? getMenuItemId(id, activeIndex) : undefined,
        'aria-autocomplete': 'both',
        'aria-expanded': isMenuShown,
        'aria-haspopup': 'listbox',
        'aria-owns': isMenuShown ? id : undefined,
        className: cx((_cx = {}, _defineProperty$1(_cx, className || '', !multiple), _defineProperty$1(_cx, "focus", isFocused), _cx)),
        onClick: function onClick(e) {
          // Re-open the menu if it's closed, eg: via ESC.
          onFocus && onFocus(e);
          inputProps.onClick && inputProps.onClick(e);
        },
        onFocus: onFocus,
        // Comboboxes are single-select by definition:
        // https://www.w3.org/TR/wai-aria-practices-1.1/#combobox
        role: 'combobox'
        /* eslint-enable sort-keys */

      });

      if (!multiple) {
        return props;
      }

      return _objectSpread2(_objectSpread2({}, props), {}, {
        'aria-autocomplete': 'list',
        'aria-expanded': undefined,
        inputClassName: className,
        role: undefined
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

    var selectedItem = !multiple && !!selected.length && head(selected);

    if (selectedItem) {
      return getOptionLabel(selectedItem, labelKey);
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

    return results.length === 1 && !getOptionProperty(head(results), 'disabled');
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

  function skipDisabledOptions(currentIndex, keyCode, items) {
    var newIndex = currentIndex;

    while (items[newIndex] && items[newIndex].disabled) {
      newIndex += keyCode === UP ? -1 : 1;
    }

    return newIndex;
  }

  function getUpdatedActiveIndex(currentIndex, keyCode, items) {
    var newIndex = currentIndex; // Increment or decrement index based on user keystroke.

    newIndex += keyCode === UP ? -1 : 1; // Skip over any disabled options.

    newIndex = skipDisabledOptions(newIndex, keyCode, items); // If we've reached the end, go back to the beginning or vice-versa.

    if (newIndex === items.length) {
      newIndex = -1;
    } else if (newIndex === -2) {
      newIndex = items.length - 1; // Skip over any disabled options.

      newIndex = skipDisabledOptions(newIndex, keyCode, items);
    }

    return newIndex;
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

  function isShown(props) {
    var open = props.open,
        minLength = props.minLength,
        showMenu = props.showMenu,
        text = props.text; // If menu visibility is controlled via props, that value takes precedence.

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
    return size === 'large' || size === 'lg';
  }
  function isSizeSmall(size) {
    return size === 'small' || size === 'sm';
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

  var TypeaheadContext = /*#__PURE__*/React.createContext({
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
    selectHintOnEnter: undefined,
    setItem: noop$1
  });
  var useTypeaheadContext = function useTypeaheadContext() {
    return React.useContext(TypeaheadContext);
  };

  var inputPropKeys = ['activeIndex', 'disabled', 'id', 'inputRef', 'isFocused', 'isMenuShown', 'multiple', 'onBlur', 'onChange', 'onFocus', 'onKeyDown', 'placeholder'];
  var propKeys = ['activeIndex', 'hideMenu', 'isMenuShown', 'labelKey', 'onClear', 'onHide', 'onRemove', 'results', 'selected', 'text', 'toggleMenu'];
  var contextKeys = ['activeIndex', 'id', 'initialItem', 'inputNode', 'onActiveItemChange', 'onAdd', 'onInitialItemChange', 'onMenuItemClick', 'selectHintOnEnter', 'setItem'];

  var TypeaheadManager = function TypeaheadManager(props) {
    var allowNew = props.allowNew,
        children = props.children,
        initialItem = props.initialItem,
        isMenuShown = props.isMenuShown,
        onAdd = props.onAdd,
        onInitialItemChange = props.onInitialItemChange,
        onKeyDown = props.onKeyDown,
        onMenuToggle = props.onMenuToggle,
        results = props.results;
    var prevProps = usePrevious(props);
    React.useEffect(function () {
      // Clear the initial item when there are no results.
      if (!(allowNew || results.length)) {
        onInitialItemChange(null);
      }
    });
    React.useEffect(function () {
      if (prevProps && prevProps.isMenuShown !== isMenuShown) {
        onMenuToggle(isMenuShown);
      }
    });

    var handleKeyDown = function handleKeyDown(e) {
      switch (e.keyCode) {
        case RETURN:
          if (initialItem && getIsOnlyResult(props)) {
            onAdd(initialItem);
          }

          break;
      }

      onKeyDown(e);
    };

    var childProps = _objectSpread2(_objectSpread2({}, pick(props, propKeys)), {}, {
      getInputProps: getInputProps(_objectSpread2(_objectSpread2({}, pick(props, inputPropKeys)), {}, {
        onKeyDown: handleKeyDown,
        value: getInputText(props)
      }))
    });

    var contextValue = _objectSpread2(_objectSpread2({}, pick(props, contextKeys)), {}, {
      hintText: getHintText(props),
      isOnlyResult: getIsOnlyResult(props)
    });

    return /*#__PURE__*/React__default['default'].createElement(TypeaheadContext.Provider, {
      value: contextValue
    }, children(childProps));
  };

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
  var sizeType = PropTypes.oneOf(values(SIZE));
  /**
   * Allows additional warnings or messaging related to prop validation.
   */

  function checkPropType(validator, callback) {
    return function (props, propName, componentName) {
      PropTypes.checkPropTypes(_defineProperty$1({}, propName, validator), props, 'prop', componentName);
      isFunction$2(callback) && callback(props, propName, componentName);
    };
  }
  function caseSensitiveType(props, propName, componentName) {
    var caseSensitive = props.caseSensitive,
        filterBy = props.filterBy;
    warn(!caseSensitive || typeof filterBy !== 'function', 'Your `filterBy` function will override the `caseSensitive` prop.');
  }
  function deprecated(validator, reason) {
    return function (props, propName, componentName) {
      if (props[propName] != null) {
        warn(false, "The `".concat(propName, "` prop is deprecated. ").concat(reason));
      }

      return PropTypes.checkPropTypes(_defineProperty$1({}, propName, validator), props, 'prop', componentName);
    };
  }
  function defaultInputValueType(props, propName, componentName) {
    var defaultInputValue = props.defaultInputValue,
        defaultSelected = props.defaultSelected,
        multiple = props.multiple,
        selected = props.selected;
    var name = defaultSelected.length ? 'defaultSelected' : 'selected';
    warn(!(!multiple && defaultInputValue && (defaultSelected.length || selected && selected.length)), "`defaultInputValue` will be overridden by the value from `".concat(name, "`."));
  }
  function defaultSelectedType(props, propName, componentName) {
    var defaultSelected = props.defaultSelected,
        multiple = props.multiple;
    warn(multiple || defaultSelected.length <= 1, 'You are passing multiple options to the `defaultSelected` prop of a ' + 'Typeahead in single-select mode. The selections will be truncated to a ' + 'single selection.');
  }
  function highlightOnlyResultType(props, propName, componentName) {
    var allowNew = props.allowNew,
        highlightOnlyResult = props.highlightOnlyResult;
    warn(!(highlightOnlyResult && allowNew), '`highlightOnlyResult` will not work with `allowNew`.');
  }
  function ignoreDiacriticsType(props, propName, componentName) {
    var filterBy = props.filterBy,
        ignoreDiacritics = props.ignoreDiacritics;
    warn(ignoreDiacritics || typeof filterBy !== 'function', 'Your `filterBy` function will override the `ignoreDiacritics` prop.');
  }
  function inputPropsType(props, propName, componentName) {
    var inputProps = props.inputProps;

    if (!(inputProps && Object.prototype.toString.call(inputProps) === '[object Object]')) {
      return;
    } // Blacklisted properties.


    INPUT_PROPS_BLACKLIST.forEach(function (_ref) {
      var alt = _ref.alt,
          prop = _ref.prop;
      var msg = alt ? " Use the top-level `".concat(alt, "` prop instead.") : null;
      warn(!inputProps[prop], "The `".concat(prop, "` property of `inputProps` will be ignored.").concat(msg));
    });
  }
  function isRequiredForA11y(props, propName, componentName) {
    warn(props[propName] != null, "The prop `".concat(propName, "` is required to make `").concat(componentName, "` ") + 'accessible for users of assistive technologies such as screen readers.');
  }
  function labelKeyType(props, propName, componentName) {
    var allowNew = props.allowNew,
        labelKey = props.labelKey;
    warn(!(isFunction$2(labelKey) && allowNew), '`labelKey` must be a string when `allowNew={true}`.');
  }
  var optionType = PropTypes.oneOfType([PropTypes.object, PropTypes.string]);
  function selectedType(props, propName, componentName) {
    var multiple = props.multiple,
        onChange = props.onChange,
        selected = props.selected;
    warn(multiple || !selected || selected.length <= 1, 'You are passing multiple options to the `selected` prop of a Typeahead ' + 'in single-select mode. This may lead to unexpected behaviors or errors.');
    warn(!selected || selected && isFunction$2(onChange), 'You provided a `selected` prop without an `onChange` handler. If you ' + 'want the typeahead to be uncontrolled, use `defaultSelected`. ' + 'Otherwise, set `onChange`.');
  }

  var _excluded$d = ["onChange"];
  var propTypes$a = {
    /**
     * Allows the creation of new selections on the fly. Note that any new items
     * will be added to the list of selections, but not the list of original
     * options unless handled as such by `Typeahead`'s parent.
     *
     * If a function is specified, it will be used to determine whether a custom
     * option should be included. The return value should be true or false.
     */
    allowNew: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),

    /**
     * Autofocus the input when the component initially mounts.
     */
    autoFocus: PropTypes.bool,

    /**
     * Whether or not filtering should be case-sensitive.
     */
    caseSensitive: checkPropType(PropTypes.bool, caseSensitiveType),

    /**
     * The initial value displayed in the text input.
     */
    defaultInputValue: checkPropType(PropTypes.string, defaultInputValueType),

    /**
     * Whether or not the menu is displayed upon initial render.
     */
    defaultOpen: PropTypes.bool,

    /**
     * Specify any pre-selected options. Use only if you want the component to
     * be uncontrolled.
     */
    defaultSelected: checkPropType(PropTypes.arrayOf(optionType), defaultSelectedType),

    /**
     * Either an array of fields in `option` to search, or a custom filtering
     * callback.
     */
    filterBy: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string.isRequired), PropTypes.func]),

    /**
     * Highlights the menu item if there is only one result and allows selecting
     * that item by hitting enter. Does not work with `allowNew`.
     */
    highlightOnlyResult: checkPropType(PropTypes.bool, highlightOnlyResultType),

    /**
     * An html id attribute, required for assistive technologies such as screen
     * readers.
     */
    id: checkPropType(PropTypes.oneOfType([PropTypes.number, PropTypes.string]), isRequiredForA11y),

    /**
     * Whether the filter should ignore accents and other diacritical marks.
     */
    ignoreDiacritics: checkPropType(PropTypes.bool, ignoreDiacriticsType),

    /**
     * Specify the option key to use for display or a function returning the
     * display string. By default, the selector will use the `label` key.
     */
    labelKey: checkPropType(PropTypes.oneOfType([PropTypes.string, PropTypes.func]), labelKeyType),

    /**
     * Maximum number of results to display by default. Mostly done for
     * performance reasons so as not to render too many DOM nodes in the case of
     * large data sets.
     */
    maxResults: PropTypes.number,

    /**
     * Number of input characters that must be entered before showing results.
     */
    minLength: PropTypes.number,

    /**
     * Whether or not multiple selections are allowed.
     */
    multiple: PropTypes.bool,

    /**
     * Invoked when the input is blurred. Receives an event.
     */
    onBlur: PropTypes.func,

    /**
     * Invoked whenever items are added or removed. Receives an array of the
     * selected options.
     */
    onChange: PropTypes.func,

    /**
     * Invoked when the input is focused. Receives an event.
     */
    onFocus: PropTypes.func,

    /**
     * Invoked when the input value changes. Receives the string value of the
     * input.
     */
    onInputChange: PropTypes.func,

    /**
     * Invoked when a key is pressed. Receives an event.
     */
    onKeyDown: PropTypes.func,

    /**
     * Invoked when menu visibility changes.
     */
    onMenuToggle: PropTypes.func,

    /**
     * Invoked when the pagination menu item is clicked. Receives an event.
     */
    onPaginate: PropTypes.func,

    /**
     * Whether or not the menu should be displayed. `undefined` allows the
     * component to control visibility, while `true` and `false` show and hide
     * the menu, respectively.
     */
    open: PropTypes.bool,

    /**
     * Full set of options, including pre-selected options. Must either be an
     * array of objects (recommended) or strings.
     */
    options: PropTypes.arrayOf(optionType).isRequired,

    /**
     * Give user the ability to display additional results if the number of
     * results exceeds `maxResults`.
     */
    paginate: PropTypes.bool,

    /**
     * The selected option(s) displayed in the input. Use this prop if you want
     * to control the component via its parent.
     */
    selected: checkPropType(PropTypes.arrayOf(optionType), selectedType),

    /**
     * Allows selecting the hinted result by pressing enter.
     */
    selectHintOnEnter: deprecated(PropTypes.bool, 'Use the `shouldSelect` prop on the `Hint` component to define which ' + 'keystrokes can select the hint.')
  };
  var defaultProps$8 = {
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
      text = getOptionLabel(head(selected), props.labelKey);

      if (selected.length > 1) {
        // Limit to 1 selection in single-select mode.
        selected = selected.slice(0, 1);
      }
    }

    return {
      activeIndex: -1,
      activeItem: null,
      initialItem: null,
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
  function hideMenu(state, props) {
    var _getInitialState = getInitialState(props),
        activeIndex = _getInitialState.activeIndex,
        activeItem = _getInitialState.activeItem,
        initialItem = _getInitialState.initialItem,
        shownResults = _getInitialState.shownResults;

    return {
      activeIndex: activeIndex,
      activeItem: activeItem,
      initialItem: initialItem,
      showMenu: false,
      shownResults: shownResults
    };
  }
  function toggleMenu(state, props) {
    return state.showMenu ? hideMenu(state, props) : {
      showMenu: true
    };
  }
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

  var Typeahead$1 = /*#__PURE__*/function (_React$Component) {
    _inherits(Typeahead, _React$Component);

    var _super = _createSuper(Typeahead);

    function Typeahead() {
      var _this;

      _classCallCheck(this, Typeahead);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty$1(_assertThisInitialized$1(_this), "state", getInitialState(_this.props));

      _defineProperty$1(_assertThisInitialized$1(_this), "inputNode", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "isMenuShown", false);

      _defineProperty$1(_assertThisInitialized$1(_this), "items", []);

      _defineProperty$1(_assertThisInitialized$1(_this), "blur", function () {
        _this.inputNode && _this.inputNode.blur();

        _this.hideMenu();
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "clear", function () {
        _this.setState(clearTypeahead);
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "focus", function () {
        _this.inputNode && _this.inputNode.focus();
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "getInput", function () {
        return _this.inputNode;
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "inputRef", function (inputNode) {
        _this.inputNode = inputNode;
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "setItem", function (item, position) {
        _this.items[position] = item;
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "hideMenu", function () {
        _this.setState(hideMenu);
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "toggleMenu", function () {
        _this.setState(toggleMenu);
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "_handleActiveIndexChange", function (activeIndex) {
        _this.setState(function (state) {
          return {
            activeIndex: activeIndex,
            activeItem: activeIndex === -1 ? null : state.activeItem
          };
        });
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "_handleActiveItemChange", function (activeItem) {
        // Don't update the active item if it hasn't changed.
        if (!fastDeepEqual(activeItem, _this.state.activeItem)) {
          _this.setState({
            activeItem: activeItem
          });
        }
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "_handleBlur", function (e) {
        e.persist();

        _this.setState({
          isFocused: false
        }, function () {
          return _this.props.onBlur(e);
        });
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "_handleChange", function (selected) {
        _this.props.onChange && _this.props.onChange(selected);
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "_handleClear", function () {
        _this.inputNode && triggerInputChange(_this.inputNode, '');

        _this.setState(clearTypeahead, function () {
          // Change handler is automatically triggered for single selections but
          // not multi-selections.
          if (_this.props.multiple) {
            _this._handleChange([]);
          }
        });
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "_handleFocus", function (e) {
        e.persist();

        _this.setState({
          isFocused: true,
          showMenu: true
        }, function () {
          return _this.props.onFocus(e);
        });
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "_handleInitialItemChange", function (initialItem) {
        // Don't update the initial item if it hasn't changed.
        if (!fastDeepEqual(initialItem, _this.state.initialItem)) {
          _this.setState({
            initialItem: initialItem
          });
        }
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "_handleInputChange", function (e) {
        e.persist();
        var text = e.currentTarget.value;
        var _this$props = _this.props,
            multiple = _this$props.multiple,
            onInputChange = _this$props.onInputChange; // Clear selections when the input value changes in single-select mode.

        var shouldClearSelections = _this.state.selected.length && !multiple;

        _this.setState(function (state, props) {
          var _getInitialState2 = getInitialState(props),
              activeIndex = _getInitialState2.activeIndex,
              activeItem = _getInitialState2.activeItem,
              shownResults = _getInitialState2.shownResults;

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

      _defineProperty$1(_assertThisInitialized$1(_this), "_handleKeyDown", function (e) {
        var activeItem = _this.state.activeItem; // Skip most actions when the menu is hidden.

        if (!_this.isMenuShown) {
          if (e.keyCode === UP || e.keyCode === DOWN) {
            _this.setState({
              showMenu: true
            });
          }

          _this.props.onKeyDown(e);

          return;
        }

        switch (e.keyCode) {
          case UP:
          case DOWN:
            // Prevent input cursor from going to the beginning when pressing up.
            e.preventDefault();

            _this._handleActiveIndexChange(getUpdatedActiveIndex(_this.state.activeIndex, e.keyCode, _this.items));

            break;

          case RETURN:
            // Prevent form submission while menu is open.
            e.preventDefault();
            activeItem && _this._handleMenuItemSelect(activeItem, e);
            break;

          case ESC:
          case TAB:
            // ESC simply hides the menu. TAB will blur the input and move focus to
            // the next item; hide the menu so it doesn't gain focus.
            _this.hideMenu();

            break;
        }

        _this.props.onKeyDown(e);
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "_handleMenuItemSelect", function (option, e) {
        if (option.paginationOption) {
          _this._handlePaginate(e);
        } else {
          _this._handleSelectionAdd(option);
        }
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "_handlePaginate", function (e) {
        e.persist();

        _this.setState(function (state, props) {
          return {
            shownResults: state.shownResults + props.maxResults
          };
        }, function () {
          return _this.props.onPaginate(e, _this.state.shownResults);
        });
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "_handleSelectionAdd", function (option) {
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

      _defineProperty$1(_assertThisInitialized$1(_this), "_handleSelectionRemove", function (selection) {
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
              text: selected.length ? getOptionLabel(head(selected), labelKey) : ''
            });
          }
        }
      }
    }, {
      key: "render",
      value: function render() {
        // Omit `onChange` so Flow doesn't complain.
        var _this$props4 = this.props;
            _this$props4.onChange;
            var otherProps = _objectWithoutProperties(_this$props4, _excluded$d);

        var mergedPropsAndState = _objectSpread2(_objectSpread2({}, otherProps), this.state);

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
          var cb = typeof filterBy === 'function' ? filterBy : defaultFilterBy;
          results = options.filter(function (option) {
            return cb(option, mergedPropsAndState);
          }); // This must come before results are truncated.

          var shouldPaginate = paginate && results.length > shownResults; // Truncate results if necessary.

          results = getTruncatedOptions(results, shownResults); // Add the custom option if necessary.

          if (addCustomOption(results, mergedPropsAndState)) {
            results.push(_defineProperty$1({
              customOption: true
            }, getStringLabelKey(labelKey), text));
          } // Add the pagination item if necessary.


          if (shouldPaginate) {
            var _results$push2;

            results.push((_results$push2 = {}, _defineProperty$1(_results$push2, getStringLabelKey(labelKey), ''), _defineProperty$1(_results$push2, "paginationOption", true), _results$push2));
          }
        }

        return /*#__PURE__*/React__default['default'].createElement(TypeaheadManager, _extends$2({}, mergedPropsAndState, {
          hideMenu: this.hideMenu,
          inputNode: this.inputNode,
          inputRef: this.inputRef,
          isMenuShown: this.isMenuShown,
          onActiveItemChange: this._handleActiveItemChange,
          onAdd: this._handleSelectionAdd,
          onBlur: this._handleBlur,
          onChange: this._handleInputChange,
          onClear: this._handleClear,
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
  }(React__default['default'].Component);

  _defineProperty$1(Typeahead$1, "propTypes", propTypes$a);

  _defineProperty$1(Typeahead$1, "defaultProps", defaultProps$8);

  var _excluded$c = ["allowNew", "delay", "emptyLabel", "isLoading", "minLength", "onInputChange", "onSearch", "options", "promptText", "searchText", "useCache"];
  var propTypes$9 = {
    /**
     * Delay, in milliseconds, before performing search.
     */
    delay: PropTypes.number,

    /**
     * Whether or not a request is currently pending. Necessary for the
     * container to know when new results are available.
     */
    isLoading: PropTypes.bool.isRequired,

    /**
     * Number of input characters that must be entered before showing results.
     */
    minLength: PropTypes.number,

    /**
     * Callback to perform when the search is executed.
     */
    onSearch: PropTypes.func.isRequired,

    /**
     * Options to be passed to the typeahead. Will typically be the query
     * results, but can also be initial default options.
     */
    options: PropTypes.arrayOf(optionType),

    /**
     * Message displayed in the menu when there is no user input.
     */
    promptText: PropTypes.node,

    /**
     * Message displayed in the menu while the request is pending.
     */
    searchText: PropTypes.node,

    /**
     * Whether or not the component should cache query results.
     */
    useCache: PropTypes.bool
  };
  var defaultProps$7 = {
    delay: 200,
    minLength: 2,
    options: [],
    promptText: 'Type to search...',
    searchText: 'Searching...',
    useCache: true
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
        delay = props.delay,
        emptyLabel = props.emptyLabel,
        isLoading = props.isLoading,
        minLength = props.minLength,
        onInputChange = props.onInputChange,
        onSearch = props.onSearch,
        options = props.options,
        promptText = props.promptText,
        searchText = props.searchText,
        useCache = props.useCache,
        otherProps = _objectWithoutProperties(props, _excluded$c);

    var cacheRef = React.useRef({});
    var handleSearchDebouncedRef = React.useRef();
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
      allowNew: isFunction$2(allowNew) ? allowNew : allowNew && !isLoading,
      emptyLabel: getEmptyLabel(),
      isLoading: isLoading,
      minLength: minLength,
      onInputChange: handleInputChange,
      options: useCache && cachedQuery ? cachedQuery : options
    });
  }
  function withAsync(Component) {
    var AsyncTypeahead = /*#__PURE__*/React.forwardRef(function (props, ref) {
      return /*#__PURE__*/React__default['default'].createElement(Component, _extends$2({}, useAsync(props), {
        ref: ref
      }));
    });
    AsyncTypeahead.displayName = "withAsync(".concat(getDisplayName(Component), ")"); // $FlowFixMe

    AsyncTypeahead.propTypes = propTypes$9; // $FlowFixMe

    AsyncTypeahead.defaultProps = defaultProps$7;
    return AsyncTypeahead;
  }
  function asyncContainer(Component) {
    /* istanbul ignore next */
    warn(false, 'The `asyncContainer` export is deprecated; use `withAsync` instead.');
    /* istanbul ignore next */

    return withAsync(Component);
  }

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
   * where previous work in `render()` may be discarded befor being used.
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
      return ReactDOM__default['default'].findDOMNode(componentOrElement);
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
  function useRootClose(ref, onRootClose, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        disabled = _ref.disabled,
        _ref$clickTrigger = _ref.clickTrigger,
        clickTrigger = _ref$clickTrigger === void 0 ? 'click' : _ref$clickTrigger;

    var preventMouseRootCloseRef = React.useRef(false);
    var onClose = onRootClose || noop;
    var handleMouseCapture = React.useCallback(function (e) {
      var currentTarget = getRefTarget(ref);
      warning_1(!!currentTarget, 'RootClose captured a close event but does not have a ref to compare it to. ' + 'useRootClose(), should be passed a ref that resolves to a DOM node');
      preventMouseRootCloseRef.current = !currentTarget || isModifiedEvent(e) || !isLeftClickEvent(e) || !!contains(currentTarget, e.target);
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

  var _excluded$b = ["className", "label", "onClick", "onKeyDown", "size"];
  var propTypes$8 = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    size: sizeType
  };
  var defaultProps$6 = {
    label: 'Clear',
    onClick: noop$1,
    onKeyDown: noop$1
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
        props = _objectWithoutProperties(_ref, _excluded$b);

    return /*#__PURE__*/React__default['default'].createElement("button", _extends$2({}, props, {
      "aria-label": label,
      className: cx('close', 'rbt-close', {
        'rbt-close-lg': isSizeLarge(size)
      }, className),
      onClick: function onClick(e) {
        e.stopPropagation();

        _onClick(e);
      },
      onKeyDown: function onKeyDown(e) {
        // Prevent browser from navigating back.
        if (e.keyCode === BACKSPACE) {
          e.preventDefault();
        }

        _onKeyDown(e);
      },
      type: "button"
    }), /*#__PURE__*/React__default['default'].createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"), /*#__PURE__*/React__default['default'].createElement("span", {
      className: "sr-only visually-hidden"
    }, label));
  };

  ClearButton.propTypes = propTypes$8;
  ClearButton.defaultProps = defaultProps$6;

  var propTypes$7 = {
    label: PropTypes.string
  };
  var defaultProps$5 = {
    label: 'Loading...'
  };

  var Loader = function Loader(_ref) {
    var label = _ref.label;
    return /*#__PURE__*/React__default['default'].createElement("div", {
      className: "rbt-loader spinner-border spinner-border-sm",
      role: "status"
    }, /*#__PURE__*/React__default['default'].createElement("span", {
      className: "sr-only visually-hidden"
    }, label));
  };

  Loader.propTypes = propTypes$7;
  Loader.defaultProps = defaultProps$5;

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

  function _extends$1() {
    _extends$1 = Object.assign || function (target) {
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

    return _extends$1.apply(this, arguments);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
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

  var toStr$4 = Object.prototype.toString;

  var isArguments$2 = function isArguments(value) {
  	var str = toStr$4.call(value);
  	var isArgs = str === '[object Arguments]';
  	if (!isArgs) {
  		isArgs = str !== '[object Array]' &&
  			value !== null &&
  			typeof value === 'object' &&
  			typeof value.length === 'number' &&
  			value.length >= 0 &&
  			toStr$4.call(value.callee) === '[object Function]';
  	}
  	return isArgs;
  };

  var keysShim$1;
  if (!Object.keys) {
  	// modified from https://github.com/es-shims/es5-shim
  	var has$1 = Object.prototype.hasOwnProperty;
  	var toStr$3 = Object.prototype.toString;
  	var isArgs$1 = isArguments$2; // eslint-disable-line global-require
  	var isEnumerable = Object.prototype.propertyIsEnumerable;
  	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
  	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
  	var dontEnums = [
  		'toString',
  		'toLocaleString',
  		'valueOf',
  		'hasOwnProperty',
  		'isPrototypeOf',
  		'propertyIsEnumerable',
  		'constructor'
  	];
  	var equalsConstructorPrototype = function (o) {
  		var ctor = o.constructor;
  		return ctor && ctor.prototype === o;
  	};
  	var excludedKeys = {
  		$applicationCache: true,
  		$console: true,
  		$external: true,
  		$frame: true,
  		$frameElement: true,
  		$frames: true,
  		$innerHeight: true,
  		$innerWidth: true,
  		$onmozfullscreenchange: true,
  		$onmozfullscreenerror: true,
  		$outerHeight: true,
  		$outerWidth: true,
  		$pageXOffset: true,
  		$pageYOffset: true,
  		$parent: true,
  		$scrollLeft: true,
  		$scrollTop: true,
  		$scrollX: true,
  		$scrollY: true,
  		$self: true,
  		$webkitIndexedDB: true,
  		$webkitStorageInfo: true,
  		$window: true
  	};
  	var hasAutomationEqualityBug = (function () {
  		/* global window */
  		if (typeof window === 'undefined') { return false; }
  		for (var k in window) {
  			try {
  				if (!excludedKeys['$' + k] && has$1.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
  					try {
  						equalsConstructorPrototype(window[k]);
  					} catch (e) {
  						return true;
  					}
  				}
  			} catch (e) {
  				return true;
  			}
  		}
  		return false;
  	}());
  	var equalsConstructorPrototypeIfNotBuggy = function (o) {
  		/* global window */
  		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
  			return equalsConstructorPrototype(o);
  		}
  		try {
  			return equalsConstructorPrototype(o);
  		} catch (e) {
  			return false;
  		}
  	};

  	keysShim$1 = function keys(object) {
  		var isObject = object !== null && typeof object === 'object';
  		var isFunction = toStr$3.call(object) === '[object Function]';
  		var isArguments = isArgs$1(object);
  		var isString = isObject && toStr$3.call(object) === '[object String]';
  		var theKeys = [];

  		if (!isObject && !isFunction && !isArguments) {
  			throw new TypeError('Object.keys called on a non-object');
  		}

  		var skipProto = hasProtoEnumBug && isFunction;
  		if (isString && object.length > 0 && !has$1.call(object, 0)) {
  			for (var i = 0; i < object.length; ++i) {
  				theKeys.push(String(i));
  			}
  		}

  		if (isArguments && object.length > 0) {
  			for (var j = 0; j < object.length; ++j) {
  				theKeys.push(String(j));
  			}
  		} else {
  			for (var name in object) {
  				if (!(skipProto && name === 'prototype') && has$1.call(object, name)) {
  					theKeys.push(String(name));
  				}
  			}
  		}

  		if (hasDontEnumBug) {
  			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

  			for (var k = 0; k < dontEnums.length; ++k) {
  				if (!(skipConstructor && dontEnums[k] === 'constructor') && has$1.call(object, dontEnums[k])) {
  					theKeys.push(dontEnums[k]);
  				}
  			}
  		}
  		return theKeys;
  	};
  }
  var implementation$9 = keysShim$1;

  var slice$1 = Array.prototype.slice;
  var isArgs = isArguments$2;

  var origKeys = Object.keys;
  var keysShim = origKeys ? function keys(o) { return origKeys(o); } : implementation$9;

  var originalKeys = Object.keys;

  keysShim.shim = function shimObjectKeys() {
  	if (Object.keys) {
  		var keysWorksWithArguments = (function () {
  			// Safari 5.0 bug
  			var args = Object.keys(arguments);
  			return args && args.length === arguments.length;
  		}(1, 2));
  		if (!keysWorksWithArguments) {
  			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
  				if (isArgs(object)) {
  					return originalKeys(slice$1.call(object));
  				}
  				return originalKeys(object);
  			};
  		}
  	} else {
  		Object.keys = keysShim;
  	}
  	return Object.keys || keysShim;
  };

  var objectKeys$1 = keysShim;

  /* eslint complexity: [2, 18], max-statements: [2, 33] */
  var shams = function hasSymbols() {
  	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
  	if (typeof Symbol.iterator === 'symbol') { return true; }

  	var obj = {};
  	var sym = Symbol('test');
  	var symObj = Object(sym);
  	if (typeof sym === 'string') { return false; }

  	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
  	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

  	// temp disabled per https://github.com/ljharb/object.assign/issues/17
  	// if (sym instanceof Symbol) { return false; }
  	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
  	// if (!(symObj instanceof Symbol)) { return false; }

  	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
  	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

  	var symVal = 42;
  	obj[sym] = symVal;
  	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
  	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

  	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

  	var syms = Object.getOwnPropertySymbols(obj);
  	if (syms.length !== 1 || syms[0] !== sym) { return false; }

  	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

  	if (typeof Object.getOwnPropertyDescriptor === 'function') {
  		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
  		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
  	}

  	return true;
  };

  var origSymbol = typeof Symbol !== 'undefined' && Symbol;
  var hasSymbolSham = shams;

  var hasSymbols$3 = function hasNativeSymbols() {
  	if (typeof origSymbol !== 'function') { return false; }
  	if (typeof Symbol !== 'function') { return false; }
  	if (typeof origSymbol('foo') !== 'symbol') { return false; }
  	if (typeof Symbol('bar') !== 'symbol') { return false; }

  	return hasSymbolSham();
  };

  /* eslint no-invalid-this: 1 */

  var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
  var slice = Array.prototype.slice;
  var toStr$2 = Object.prototype.toString;
  var funcType = '[object Function]';

  var implementation$8 = function bind(that) {
      var target = this;
      if (typeof target !== 'function' || toStr$2.call(target) !== funcType) {
          throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slice.call(arguments, 1);

      var bound;
      var binder = function () {
          if (this instanceof bound) {
              var result = target.apply(
                  this,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return this;
          } else {
              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );
          }
      };

      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
          boundArgs.push('$' + i);
      }

      bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

      if (target.prototype) {
          var Empty = function Empty() {};
          Empty.prototype = target.prototype;
          bound.prototype = new Empty();
          Empty.prototype = null;
      }

      return bound;
  };

  var implementation$7 = implementation$8;

  var functionBind = Function.prototype.bind || implementation$7;

  var bind$1 = functionBind;

  var src = bind$1.call(Function.call, Object.prototype.hasOwnProperty);

  var undefined$1;

  var $SyntaxError = SyntaxError;
  var $Function = Function;
  var $TypeError$2 = TypeError;

  // eslint-disable-next-line consistent-return
  var getEvalledConstructor = function (expressionSyntax) {
  	try {
  		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
  	} catch (e) {}
  };

  var $gOPD$1 = Object.getOwnPropertyDescriptor;
  if ($gOPD$1) {
  	try {
  		$gOPD$1({}, '');
  	} catch (e) {
  		$gOPD$1 = null; // this is IE 8, which has a broken gOPD
  	}
  }

  var throwTypeError = function () {
  	throw new $TypeError$2();
  };
  var ThrowTypeError = $gOPD$1
  	? (function () {
  		try {
  			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
  			arguments.callee; // IE 8 does not throw here
  			return throwTypeError;
  		} catch (calleeThrows) {
  			try {
  				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
  				return $gOPD$1(arguments, 'callee').get;
  			} catch (gOPDthrows) {
  				return throwTypeError;
  			}
  		}
  	}())
  	: throwTypeError;

  var hasSymbols$2 = hasSymbols$3();

  var getProto$1 = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

  var needsEval = {};

  var TypedArray = typeof Uint8Array === 'undefined' ? undefined$1 : getProto$1(Uint8Array);

  var INTRINSICS = {
  	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
  	'%Array%': Array,
  	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
  	'%ArrayIteratorPrototype%': hasSymbols$2 ? getProto$1([][Symbol.iterator]()) : undefined$1,
  	'%AsyncFromSyncIteratorPrototype%': undefined$1,
  	'%AsyncFunction%': needsEval,
  	'%AsyncGenerator%': needsEval,
  	'%AsyncGeneratorFunction%': needsEval,
  	'%AsyncIteratorPrototype%': needsEval,
  	'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
  	'%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
  	'%Boolean%': Boolean,
  	'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
  	'%Date%': Date,
  	'%decodeURI%': decodeURI,
  	'%decodeURIComponent%': decodeURIComponent,
  	'%encodeURI%': encodeURI,
  	'%encodeURIComponent%': encodeURIComponent,
  	'%Error%': Error,
  	'%eval%': eval, // eslint-disable-line no-eval
  	'%EvalError%': EvalError,
  	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
  	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
  	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
  	'%Function%': $Function,
  	'%GeneratorFunction%': needsEval,
  	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
  	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
  	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
  	'%isFinite%': isFinite,
  	'%isNaN%': isNaN,
  	'%IteratorPrototype%': hasSymbols$2 ? getProto$1(getProto$1([][Symbol.iterator]())) : undefined$1,
  	'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
  	'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
  	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$2 ? undefined$1 : getProto$1(new Map()[Symbol.iterator]()),
  	'%Math%': Math,
  	'%Number%': Number,
  	'%Object%': Object,
  	'%parseFloat%': parseFloat,
  	'%parseInt%': parseInt,
  	'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
  	'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
  	'%RangeError%': RangeError,
  	'%ReferenceError%': ReferenceError,
  	'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
  	'%RegExp%': RegExp,
  	'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
  	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$2 ? undefined$1 : getProto$1(new Set()[Symbol.iterator]()),
  	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
  	'%String%': String,
  	'%StringIteratorPrototype%': hasSymbols$2 ? getProto$1(''[Symbol.iterator]()) : undefined$1,
  	'%Symbol%': hasSymbols$2 ? Symbol : undefined$1,
  	'%SyntaxError%': $SyntaxError,
  	'%ThrowTypeError%': ThrowTypeError,
  	'%TypedArray%': TypedArray,
  	'%TypeError%': $TypeError$2,
  	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
  	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
  	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
  	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
  	'%URIError%': URIError,
  	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
  	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
  	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
  };

  var doEval = function doEval(name) {
  	var value;
  	if (name === '%AsyncFunction%') {
  		value = getEvalledConstructor('async function () {}');
  	} else if (name === '%GeneratorFunction%') {
  		value = getEvalledConstructor('function* () {}');
  	} else if (name === '%AsyncGeneratorFunction%') {
  		value = getEvalledConstructor('async function* () {}');
  	} else if (name === '%AsyncGenerator%') {
  		var fn = doEval('%AsyncGeneratorFunction%');
  		if (fn) {
  			value = fn.prototype;
  		}
  	} else if (name === '%AsyncIteratorPrototype%') {
  		var gen = doEval('%AsyncGenerator%');
  		if (gen) {
  			value = getProto$1(gen.prototype);
  		}
  	}

  	INTRINSICS[name] = value;

  	return value;
  };

  var LEGACY_ALIASES = {
  	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
  	'%ArrayPrototype%': ['Array', 'prototype'],
  	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
  	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
  	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
  	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
  	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
  	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
  	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
  	'%BooleanPrototype%': ['Boolean', 'prototype'],
  	'%DataViewPrototype%': ['DataView', 'prototype'],
  	'%DatePrototype%': ['Date', 'prototype'],
  	'%ErrorPrototype%': ['Error', 'prototype'],
  	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
  	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
  	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
  	'%FunctionPrototype%': ['Function', 'prototype'],
  	'%Generator%': ['GeneratorFunction', 'prototype'],
  	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
  	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
  	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
  	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
  	'%JSONParse%': ['JSON', 'parse'],
  	'%JSONStringify%': ['JSON', 'stringify'],
  	'%MapPrototype%': ['Map', 'prototype'],
  	'%NumberPrototype%': ['Number', 'prototype'],
  	'%ObjectPrototype%': ['Object', 'prototype'],
  	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
  	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
  	'%PromisePrototype%': ['Promise', 'prototype'],
  	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
  	'%Promise_all%': ['Promise', 'all'],
  	'%Promise_reject%': ['Promise', 'reject'],
  	'%Promise_resolve%': ['Promise', 'resolve'],
  	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
  	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
  	'%RegExpPrototype%': ['RegExp', 'prototype'],
  	'%SetPrototype%': ['Set', 'prototype'],
  	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
  	'%StringPrototype%': ['String', 'prototype'],
  	'%SymbolPrototype%': ['Symbol', 'prototype'],
  	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
  	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
  	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
  	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
  	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
  	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
  	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
  	'%URIErrorPrototype%': ['URIError', 'prototype'],
  	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
  	'%WeakSetPrototype%': ['WeakSet', 'prototype']
  };

  var bind = functionBind;
  var hasOwn = src;
  var $concat = bind.call(Function.call, Array.prototype.concat);
  var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
  var $replace = bind.call(Function.call, String.prototype.replace);
  var $strSlice = bind.call(Function.call, String.prototype.slice);

  /* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
  var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
  var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
  var stringToPath = function stringToPath(string) {
  	var first = $strSlice(string, 0, 1);
  	var last = $strSlice(string, -1);
  	if (first === '%' && last !== '%') {
  		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
  	} else if (last === '%' && first !== '%') {
  		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
  	}
  	var result = [];
  	$replace(string, rePropName, function (match, number, quote, subString) {
  		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
  	});
  	return result;
  };
  /* end adaptation */

  var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
  	var intrinsicName = name;
  	var alias;
  	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
  		alias = LEGACY_ALIASES[intrinsicName];
  		intrinsicName = '%' + alias[0] + '%';
  	}

  	if (hasOwn(INTRINSICS, intrinsicName)) {
  		var value = INTRINSICS[intrinsicName];
  		if (value === needsEval) {
  			value = doEval(intrinsicName);
  		}
  		if (typeof value === 'undefined' && !allowMissing) {
  			throw new $TypeError$2('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
  		}

  		return {
  			alias: alias,
  			name: intrinsicName,
  			value: value
  		};
  	}

  	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
  };

  var getIntrinsic = function GetIntrinsic(name, allowMissing) {
  	if (typeof name !== 'string' || name.length === 0) {
  		throw new $TypeError$2('intrinsic name must be a non-empty string');
  	}
  	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
  		throw new $TypeError$2('"allowMissing" argument must be a boolean');
  	}

  	var parts = stringToPath(name);
  	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

  	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
  	var intrinsicRealName = intrinsic.name;
  	var value = intrinsic.value;
  	var skipFurtherCaching = false;

  	var alias = intrinsic.alias;
  	if (alias) {
  		intrinsicBaseName = alias[0];
  		$spliceApply(parts, $concat([0, 1], alias));
  	}

  	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
  		var part = parts[i];
  		var first = $strSlice(part, 0, 1);
  		var last = $strSlice(part, -1);
  		if (
  			(
  				(first === '"' || first === "'" || first === '`')
  				|| (last === '"' || last === "'" || last === '`')
  			)
  			&& first !== last
  		) {
  			throw new $SyntaxError('property names with quotes must have matching quotes');
  		}
  		if (part === 'constructor' || !isOwn) {
  			skipFurtherCaching = true;
  		}

  		intrinsicBaseName += '.' + part;
  		intrinsicRealName = '%' + intrinsicBaseName + '%';

  		if (hasOwn(INTRINSICS, intrinsicRealName)) {
  			value = INTRINSICS[intrinsicRealName];
  		} else if (value != null) {
  			if (!(part in value)) {
  				if (!allowMissing) {
  					throw new $TypeError$2('base intrinsic for ' + name + ' exists, but the property is not available.');
  				}
  				return void undefined$1;
  			}
  			if ($gOPD$1 && (i + 1) >= parts.length) {
  				var desc = $gOPD$1(value, part);
  				isOwn = !!desc;

  				// By convention, when a data property is converted to an accessor
  				// property to emulate a data property that does not suffer from
  				// the override mistake, that accessor's getter is marked with
  				// an `originalValue` property. Here, when we detect this, we
  				// uphold the illusion by pretending to see that original data
  				// property, i.e., returning the value rather than the getter
  				// itself.
  				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
  					value = desc.get;
  				} else {
  					value = value[part];
  				}
  			} else {
  				isOwn = hasOwn(value, part);
  				value = value[part];
  			}

  			if (isOwn && !skipFurtherCaching) {
  				INTRINSICS[intrinsicRealName] = value;
  			}
  		}
  	}
  	return value;
  };

  var callBind$3 = {exports: {}};

  (function (module) {

  var bind = functionBind;
  var GetIntrinsic = getIntrinsic;

  var $apply = GetIntrinsic('%Function.prototype.apply%');
  var $call = GetIntrinsic('%Function.prototype.call%');
  var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

  var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
  var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
  var $max = GetIntrinsic('%Math.max%');

  if ($defineProperty) {
  	try {
  		$defineProperty({}, 'a', { value: 1 });
  	} catch (e) {
  		// IE 8 has a broken defineProperty
  		$defineProperty = null;
  	}
  }

  module.exports = function callBind(originalFunction) {
  	var func = $reflectApply(bind, $call, arguments);
  	if ($gOPD && $defineProperty) {
  		var desc = $gOPD(func, 'length');
  		if (desc.configurable) {
  			// original length, plus the receiver, minus any additional arguments (after the receiver)
  			$defineProperty(
  				func,
  				'length',
  				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
  			);
  		}
  	}
  	return func;
  };

  var applyBind = function applyBind() {
  	return $reflectApply(bind, $apply, arguments);
  };

  if ($defineProperty) {
  	$defineProperty(module.exports, 'apply', { value: applyBind });
  } else {
  	module.exports.apply = applyBind;
  }
  }(callBind$3));

  var GetIntrinsic = getIntrinsic;

  var callBind$2 = callBind$3.exports;

  var $indexOf = callBind$2(GetIntrinsic('String.prototype.indexOf'));

  var callBound$2 = function callBoundIntrinsic(name, allowMissing) {
  	var intrinsic = GetIntrinsic(name, !!allowMissing);
  	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
  		return callBind$2(intrinsic);
  	}
  	return intrinsic;
  };

  var hasToStringTag$2 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
  var callBound$1 = callBound$2;

  var $toString$1 = callBound$1('Object.prototype.toString');

  var isStandardArguments = function isArguments(value) {
  	if (hasToStringTag$2 && value && typeof value === 'object' && Symbol.toStringTag in value) {
  		return false;
  	}
  	return $toString$1(value) === '[object Arguments]';
  };

  var isLegacyArguments = function isArguments(value) {
  	if (isStandardArguments(value)) {
  		return true;
  	}
  	return value !== null &&
  		typeof value === 'object' &&
  		typeof value.length === 'number' &&
  		value.length >= 0 &&
  		$toString$1(value) !== '[object Array]' &&
  		$toString$1(value.callee) === '[object Function]';
  };

  var supportsStandardArguments = (function () {
  	return isStandardArguments(arguments);
  }());

  isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

  var isArguments$1 = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

  var keys = objectKeys$1;
  var hasSymbols$1 = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

  var toStr$1 = Object.prototype.toString;
  var concat = Array.prototype.concat;
  var origDefineProperty = Object.defineProperty;

  var isFunction$1 = function (fn) {
  	return typeof fn === 'function' && toStr$1.call(fn) === '[object Function]';
  };

  var arePropertyDescriptorsSupported = function () {
  	var obj = {};
  	try {
  		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
  		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
  		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
  			return false;
  		}
  		return obj.x === obj;
  	} catch (e) { /* this is IE 8. */
  		return false;
  	}
  };
  var supportsDescriptors$2 = origDefineProperty && arePropertyDescriptorsSupported();

  var defineProperty$2 = function (object, name, value, predicate) {
  	if (name in object && (!isFunction$1(predicate) || !predicate())) {
  		return;
  	}
  	if (supportsDescriptors$2) {
  		origDefineProperty(object, name, {
  			configurable: true,
  			enumerable: false,
  			value: value,
  			writable: true
  		});
  	} else {
  		object[name] = value;
  	}
  };

  var defineProperties = function (object, map) {
  	var predicates = arguments.length > 2 ? arguments[2] : {};
  	var props = keys(map);
  	if (hasSymbols$1) {
  		props = concat.call(props, Object.getOwnPropertySymbols(map));
  	}
  	for (var i = 0; i < props.length; i += 1) {
  		defineProperty$2(object, props[i], map[props[i]], predicates[props[i]]);
  	}
  };

  defineProperties.supportsDescriptors = !!supportsDescriptors$2;

  var defineProperties_1 = defineProperties;

  var numberIsNaN = function (value) {
  	return value !== value;
  };

  var implementation$6 = function is(a, b) {
  	if (a === 0 && b === 0) {
  		return 1 / a === 1 / b;
  	}
  	if (a === b) {
  		return true;
  	}
  	if (numberIsNaN(a) && numberIsNaN(b)) {
  		return true;
  	}
  	return false;
  };

  var implementation$5 = implementation$6;

  var polyfill$2 = function getPolyfill() {
  	return typeof Object.is === 'function' ? Object.is : implementation$5;
  };

  var getPolyfill$3 = polyfill$2;
  var define$2 = defineProperties_1;

  var shim$3 = function shimObjectIs() {
  	var polyfill = getPolyfill$3();
  	define$2(Object, { is: polyfill }, {
  		is: function testObjectIs() {
  			return Object.is !== polyfill;
  		}
  	});
  	return polyfill;
  };

  var define$1 = defineProperties_1;
  var callBind$1 = callBind$3.exports;

  var implementation$4 = implementation$6;
  var getPolyfill$2 = polyfill$2;
  var shim$2 = shim$3;

  var polyfill$1 = callBind$1(getPolyfill$2(), Object);

  define$1(polyfill$1, {
  	getPolyfill: getPolyfill$2,
  	implementation: implementation$4,
  	shim: shim$2
  });

  var objectIs = polyfill$1;

  var callBound = callBound$2;
  var hasSymbols = shams();
  var hasToStringTag$1 = hasSymbols && !!Symbol.toStringTag;
  var has;
  var $exec;
  var isRegexMarker;
  var badStringifier;

  if (hasToStringTag$1) {
  	has = callBound('Object.prototype.hasOwnProperty');
  	$exec = callBound('RegExp.prototype.exec');
  	isRegexMarker = {};

  	var throwRegexMarker = function () {
  		throw isRegexMarker;
  	};
  	badStringifier = {
  		toString: throwRegexMarker,
  		valueOf: throwRegexMarker
  	};

  	if (typeof Symbol.toPrimitive === 'symbol') {
  		badStringifier[Symbol.toPrimitive] = throwRegexMarker;
  	}
  }

  var $toString = callBound('Object.prototype.toString');
  var gOPD$1 = Object.getOwnPropertyDescriptor;
  var regexClass = '[object RegExp]';

  var isRegex$1 = hasToStringTag$1
  	// eslint-disable-next-line consistent-return
  	? function isRegex(value) {
  		if (!value || typeof value !== 'object') {
  			return false;
  		}

  		var descriptor = gOPD$1(value, 'lastIndex');
  		var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');
  		if (!hasLastIndexDataProperty) {
  			return false;
  		}

  		try {
  			$exec(value, badStringifier);
  		} catch (e) {
  			return e === isRegexMarker;
  		}
  	}
  	: function isRegex(value) {
  		// In older browsers, typeof regex incorrectly returns 'function'
  		if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
  			return false;
  		}

  		return $toString(value) === regexClass;
  	};

  var $Object = Object;
  var $TypeError$1 = TypeError;

  var implementation$3 = function flags() {
  	if (this != null && this !== $Object(this)) {
  		throw new $TypeError$1('RegExp.prototype.flags getter called on non-object');
  	}
  	var result = '';
  	if (this.global) {
  		result += 'g';
  	}
  	if (this.ignoreCase) {
  		result += 'i';
  	}
  	if (this.multiline) {
  		result += 'm';
  	}
  	if (this.dotAll) {
  		result += 's';
  	}
  	if (this.unicode) {
  		result += 'u';
  	}
  	if (this.sticky) {
  		result += 'y';
  	}
  	return result;
  };

  var implementation$2 = implementation$3;

  var supportsDescriptors$1 = defineProperties_1.supportsDescriptors;
  var $gOPD = Object.getOwnPropertyDescriptor;
  var $TypeError = TypeError;

  var polyfill = function getPolyfill() {
  	if (!supportsDescriptors$1) {
  		throw new $TypeError('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
  	}
  	if ((/a/mig).flags === 'gim') {
  		var descriptor = $gOPD(RegExp.prototype, 'flags');
  		if (descriptor && typeof descriptor.get === 'function' && typeof (/a/).dotAll === 'boolean') {
  			return descriptor.get;
  		}
  	}
  	return implementation$2;
  };

  var supportsDescriptors = defineProperties_1.supportsDescriptors;
  var getPolyfill$1 = polyfill;
  var gOPD = Object.getOwnPropertyDescriptor;
  var defineProperty$1 = Object.defineProperty;
  var TypeErr = TypeError;
  var getProto = Object.getPrototypeOf;
  var regex = /a/;

  var shim$1 = function shimFlags() {
  	if (!supportsDescriptors || !getProto) {
  		throw new TypeErr('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
  	}
  	var polyfill = getPolyfill$1();
  	var proto = getProto(regex);
  	var descriptor = gOPD(proto, 'flags');
  	if (!descriptor || descriptor.get !== polyfill) {
  		defineProperty$1(proto, 'flags', {
  			configurable: true,
  			enumerable: false,
  			get: polyfill
  		});
  	}
  	return polyfill;
  };

  var define = defineProperties_1;
  var callBind = callBind$3.exports;

  var implementation$1 = implementation$3;
  var getPolyfill = polyfill;
  var shim = shim$1;

  var flagsBound = callBind(implementation$1);

  define(flagsBound, {
  	getPolyfill: getPolyfill,
  	implementation: implementation$1,
  	shim: shim
  });

  var regexp_prototype_flags = flagsBound;

  var getDay = Date.prototype.getDay;
  var tryDateObject = function tryDateGetDayCall(value) {
  	try {
  		getDay.call(value);
  		return true;
  	} catch (e) {
  		return false;
  	}
  };

  var toStr = Object.prototype.toString;
  var dateClass = '[object Date]';
  var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag;

  var isDateObject = function isDateObject(value) {
  	if (typeof value !== 'object' || value === null) {
  		return false;
  	}
  	return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
  };

  var objectKeys = objectKeys$1;
  var isArguments = isArguments$1;
  var is = objectIs;
  var isRegex = isRegex$1;
  var flags = regexp_prototype_flags;
  var isDate = isDateObject;

  var getTime = Date.prototype.getTime;

  function deepEqual(actual, expected, options) {
    var opts = options || {};

    // 7.1. All identical values are equivalent, as determined by ===.
    if (opts.strict ? is(actual, expected) : actual === expected) {
      return true;
    }

    // 7.3. Other pairs that do not both pass typeof value == 'object', equivalence is determined by ==.
    if (!actual || !expected || (typeof actual !== 'object' && typeof expected !== 'object')) {
      return opts.strict ? is(actual, expected) : actual == expected;
    }

    /*
     * 7.4. For all other Object pairs, including Array objects, equivalence is
     * determined by having the same number of owned properties (as verified
     * with Object.prototype.hasOwnProperty.call), the same set of keys
     * (although not necessarily the same order), equivalent values for every
     * corresponding key, and an identical 'prototype' property. Note: this
     * accounts for both named and indexed properties on Arrays.
     */
    // eslint-disable-next-line no-use-before-define
    return objEquiv(actual, expected, opts);
  }

  function isUndefinedOrNull(value) {
    return value === null || value === undefined;
  }

  function isBuffer(x) {
    if (!x || typeof x !== 'object' || typeof x.length !== 'number') {
      return false;
    }
    if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
      return false;
    }
    if (x.length > 0 && typeof x[0] !== 'number') {
      return false;
    }
    return true;
  }

  function objEquiv(a, b, opts) {
    /* eslint max-statements: [2, 50] */
    var i, key;
    if (typeof a !== typeof b) { return false; }
    if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) { return false; }

    // an identical 'prototype' property.
    if (a.prototype !== b.prototype) { return false; }

    if (isArguments(a) !== isArguments(b)) { return false; }

    var aIsRegex = isRegex(a);
    var bIsRegex = isRegex(b);
    if (aIsRegex !== bIsRegex) { return false; }
    if (aIsRegex || bIsRegex) {
      return a.source === b.source && flags(a) === flags(b);
    }

    if (isDate(a) && isDate(b)) {
      return getTime.call(a) === getTime.call(b);
    }

    var aIsBuffer = isBuffer(a);
    var bIsBuffer = isBuffer(b);
    if (aIsBuffer !== bIsBuffer) { return false; }
    if (aIsBuffer || bIsBuffer) { // && would work too, because both are true or both false here
      if (a.length !== b.length) { return false; }
      for (i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) { return false; }
      }
      return true;
    }

    if (typeof a !== typeof b) { return false; }

    try {
      var ka = objectKeys(a);
      var kb = objectKeys(b);
    } catch (e) { // happens when one is a string literal and the other isn't
      return false;
    }
    // having the same number of owned properties (keys incorporates hasOwnProperty)
    if (ka.length !== kb.length) { return false; }

    // the same set of keys (although not necessarily the same order),
    ka.sort();
    kb.sort();
    // ~~~cheap key test
    for (i = ka.length - 1; i >= 0; i--) {
      if (ka[i] != kb[i]) { return false; }
    }
    // equivalent values for every corresponding key, and ~~~possibly expensive deep test
    for (i = ka.length - 1; i >= 0; i--) {
      key = ka[i];
      if (!deepEqual(a[key], b[key], opts)) { return false; }
    }

    return true;
  }

  var deepEqual_1 = deepEqual;

  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.16.1
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

  var timeoutDuration = function () {
    var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
    for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
      if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
        return 1;
      }
    }
    return 0;
  }();

  function microtaskDebounce(fn) {
    var called = false;
    return function () {
      if (called) {
        return;
      }
      called = true;
      window.Promise.resolve().then(function () {
        called = false;
        fn();
      });
    };
  }

  function taskDebounce(fn) {
    var scheduled = false;
    return function () {
      if (!scheduled) {
        scheduled = true;
        setTimeout(function () {
          scheduled = false;
          fn();
        }, timeoutDuration);
      }
    };
  }

  var supportsMicroTasks = isBrowser && window.Promise;

  /**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument {Function} fn
  * @returns {Function}
  */
  var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

  /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */
  function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  /**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */
  function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
      return [];
    }
    // NOTE: 1 DOM access here
    var window = element.ownerDocument.defaultView;
    var css = window.getComputedStyle(element, null);
    return property ? css[property] : css;
  }

  /**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */
  function getParentNode(element) {
    if (element.nodeName === 'HTML') {
      return element;
    }
    return element.parentNode || element.host;
  }

  /**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */
  function getScrollParent(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element) {
      return document.body;
    }

    switch (element.nodeName) {
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;
      case '#document':
        return element.body;
    }

    // Firefox want us to check `-x` and `-y` variations as well

    var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return element;
    }

    return getScrollParent(getParentNode(element));
  }

  /**
   * Returns the reference node of the reference object, or the reference object itself.
   * @method
   * @memberof Popper.Utils
   * @param {Element|Object} reference - the reference element (the popper will be relative to this)
   * @returns {Element} parent
   */
  function getReferenceNode(reference) {
    return reference && reference.referenceNode ? reference.referenceNode : reference;
  }

  var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
  var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

  /**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */
  function isIE(version) {
    if (version === 11) {
      return isIE11;
    }
    if (version === 10) {
      return isIE10;
    }
    return isIE11 || isIE10;
  }

  /**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */
  function getOffsetParent(element) {
    if (!element) {
      return document.documentElement;
    }

    var noOffsetParent = isIE(10) ? document.body : null;

    // NOTE: 1 DOM access here
    var offsetParent = element.offsetParent || null;
    // Skip hidden elements which don't have an offsetParent
    while (offsetParent === noOffsetParent && element.nextElementSibling) {
      offsetParent = (element = element.nextElementSibling).offsetParent;
    }

    var nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
      return element ? element.ownerDocument.documentElement : document.documentElement;
    }

    // .offsetParent will return the closest TH, TD or TABLE in case
    // no offsetParent is present, I hate this job...
    if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
      return getOffsetParent(offsetParent);
    }

    return offsetParent;
  }

  function isOffsetContainer(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY') {
      return false;
    }
    return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
  }

  /**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */
  function getRoot(node) {
    if (node.parentNode !== null) {
      return getRoot(node.parentNode);
    }

    return node;
  }

  /**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */
  function findCommonOffsetParent(element1, element2) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
      return document.documentElement;
    }

    // Here we make sure to give as "start" the element that comes first in the DOM
    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    var start = order ? element1 : element2;
    var end = order ? element2 : element1;

    // Get common ancestor container
    var range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    var commonAncestorContainer = range.commonAncestorContainer;

    // Both nodes are inside #document

    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
      if (isOffsetContainer(commonAncestorContainer)) {
        return commonAncestorContainer;
      }

      return getOffsetParent(commonAncestorContainer);
    }

    // one of the nodes is inside shadowDOM, find which one
    var element1root = getRoot(element1);
    if (element1root.host) {
      return findCommonOffsetParent(element1root.host, element2);
    } else {
      return findCommonOffsetParent(element1, getRoot(element2).host);
    }
  }

  /**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */
  function getScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      var html = element.ownerDocument.documentElement;
      var scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
    }

    return element[upperSide];
  }

  /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */
  function includeScroll(rect, element) {
    var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var scrollTop = getScroll(element, 'top');
    var scrollLeft = getScroll(element, 'left');
    var modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
  }

  /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */

  function getBordersSize(styles, axis) {
    var sideA = axis === 'x' ? 'Left' : 'Top';
    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

    return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
  }

  function getSize(axis, body, html, computedStyle) {
    return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
  }

  function getWindowSizes(document) {
    var body = document.body;
    var html = document.documentElement;
    var computedStyle = isIE(10) && getComputedStyle(html);

    return {
      height: getSize('Height', body, html, computedStyle),
      width: getSize('Width', body, html, computedStyle)
    };
  }

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





  var defineProperty = function (obj, key, value) {
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
  };

  var _extends = Object.assign || function (target) {
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

  /**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */
  function getClientRect(offsets) {
    return _extends({}, offsets, {
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
    });
  }

  /**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */
  function getBoundingClientRect(element) {
    var rect = {};

    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    try {
      if (isIE(10)) {
        rect = element.getBoundingClientRect();
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
      } else {
        rect = element.getBoundingClientRect();
      }
    } catch (e) {}

    var result = {
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };

    // subtract scrollbar size from sizes
    var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
    var width = sizes.width || element.clientWidth || result.width;
    var height = sizes.height || element.clientHeight || result.height;

    var horizScrollbar = element.offsetWidth - width;
    var vertScrollbar = element.offsetHeight - height;

    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) {
      var styles = getStyleComputedProperty(element);
      horizScrollbar -= getBordersSize(styles, 'x');
      vertScrollbar -= getBordersSize(styles, 'y');

      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
    }

    return getClientRect(result);
  }

  function getOffsetRectRelativeToArbitraryNode(children, parent) {
    var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var isIE10 = isIE(10);
    var isHTML = parent.nodeName === 'HTML';
    var childrenRect = getBoundingClientRect(children);
    var parentRect = getBoundingClientRect(parent);
    var scrollParent = getScrollParent(children);

    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = parseFloat(styles.borderTopWidth);
    var borderLeftWidth = parseFloat(styles.borderLeftWidth);

    // In cases where the parent is fixed, we must ignore negative scroll in offset calc
    if (fixedPosition && isHTML) {
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
    }
    var offsets = getClientRect({
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
    });
    offsets.marginTop = 0;
    offsets.marginLeft = 0;

    // Subtract margins of documentElement in case it's being used as parent
    // we do this only on HTML because it's the only element that behaves
    // differently when margins are applied to it. The margins are included in
    // the box of the documentElement, in the other cases not.
    if (!isIE10 && isHTML) {
      var marginTop = parseFloat(styles.marginTop);
      var marginLeft = parseFloat(styles.marginLeft);

      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft;

      // Attach marginTop and marginLeft because in some circumstances we may need them
      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
    }

    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
      offsets = includeScroll(offsets, parent);
    }

    return offsets;
  }

  function getViewportOffsetRectRelativeToArtbitraryNode(element) {
    var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var html = element.ownerDocument.documentElement;
    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
    var width = Math.max(html.clientWidth, window.innerWidth || 0);
    var height = Math.max(html.clientHeight, window.innerHeight || 0);

    var scrollTop = !excludeScroll ? getScroll(html) : 0;
    var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

    var offset = {
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width: width,
      height: height
    };

    return getClientRect(offset);
  }

  /**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */
  function isFixed(element) {
    var nodeName = element.nodeName;
    if (nodeName === 'BODY' || nodeName === 'HTML') {
      return false;
    }
    if (getStyleComputedProperty(element, 'position') === 'fixed') {
      return true;
    }
    var parentNode = getParentNode(element);
    if (!parentNode) {
      return false;
    }
    return isFixed(parentNode);
  }

  /**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */

  function getFixedPositionOffsetParent(element) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element || !element.parentElement || isIE()) {
      return document.documentElement;
    }
    var el = element.parentElement;
    while (el && getStyleComputedProperty(el, 'transform') === 'none') {
      el = el.parentElement;
    }
    return el || document.documentElement;
  }

  /**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */
  function getBoundaries(popper, reference, padding, boundariesElement) {
    var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    // NOTE: 1 DOM access here

    var boundaries = { top: 0, left: 0 };
    var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

    // Handle viewport case
    if (boundariesElement === 'viewport') {
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    } else {
      // Handle other cases based on DOM element used as boundaries
      var boundariesNode = void 0;
      if (boundariesElement === 'scrollParent') {
        boundariesNode = getScrollParent(getParentNode(reference));
        if (boundariesNode.nodeName === 'BODY') {
          boundariesNode = popper.ownerDocument.documentElement;
        }
      } else if (boundariesElement === 'window') {
        boundariesNode = popper.ownerDocument.documentElement;
      } else {
        boundariesNode = boundariesElement;
      }

      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

      // In case of HTML, we need a different computation
      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
        var _getWindowSizes = getWindowSizes(popper.ownerDocument),
            height = _getWindowSizes.height,
            width = _getWindowSizes.width;

        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
      } else {
        // for all the other DOM elements, this one is good
        boundaries = offsets;
      }
    }

    // Add paddings
    padding = padding || 0;
    var isPaddingNumber = typeof padding === 'number';
    boundaries.left += isPaddingNumber ? padding : padding.left || 0;
    boundaries.top += isPaddingNumber ? padding : padding.top || 0;
    boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
    boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

    return boundaries;
  }

  function getArea(_ref) {
    var width = _ref.width,
        height = _ref.height;

    return width * height;
  }

  /**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    if (placement.indexOf('auto') === -1) {
      return placement;
    }

    var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

    var rects = {
      top: {
        width: boundaries.width,
        height: refRect.top - boundaries.top
      },
      right: {
        width: boundaries.right - refRect.right,
        height: boundaries.height
      },
      bottom: {
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
      },
      left: {
        width: refRect.left - boundaries.left,
        height: boundaries.height
      }
    };

    var sortedAreas = Object.keys(rects).map(function (key) {
      return _extends({
        key: key
      }, rects[key], {
        area: getArea(rects[key])
      });
    }).sort(function (a, b) {
      return b.area - a.area;
    });

    var filteredAreas = sortedAreas.filter(function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      return width >= popper.clientWidth && height >= popper.clientHeight;
    });

    var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

    var variation = placement.split('-')[1];

    return computedPlacement + (variation ? '-' + variation : '');
  }

  /**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */
  function getReferenceOffsets(state, popper, reference) {
    var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
  }

  /**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */
  function getOuterSizes(element) {
    var window = element.ownerDocument.defaultView;
    var styles = window.getComputedStyle(element);
    var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
    var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
    var result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
    };
    return result;
  }

  /**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */
  function getOppositePlacement(placement) {
    var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }

  /**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */
  function getPopperOffsets(popper, referenceOffsets, placement) {
    placement = placement.split('-')[0];

    // Get popper node sizes
    var popperRect = getOuterSizes(popper);

    // Add position, width and height to our offsets object
    var popperOffsets = {
      width: popperRect.width,
      height: popperRect.height
    };

    // depending by the popper placement we have to compute its offsets slightly differently
    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';

    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
    if (placement === secondarySide) {
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }

    return popperOffsets;
  }

  /**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function find(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
      return arr.find(check);
    }

    // use `filter` to obtain the same behavior of `find`
    return arr.filter(check)[0];
  }

  /**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function findIndex(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
      return arr.findIndex(function (cur) {
        return cur[prop] === value;
      });
    }

    // use `find` + `indexOf` if `findIndex` isn't supported
    var match = find(arr, function (obj) {
      return obj[prop] === value;
    });
    return arr.indexOf(match);
  }

  /**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */
  function runModifiers(modifiers, data, ends) {
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

    modifiersToRun.forEach(function (modifier) {
      if (modifier['function']) {
        // eslint-disable-line dot-notation
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      }
      var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
      if (modifier.enabled && isFunction(fn)) {
        // Add properties to offsets to make them a complete clientRect object
        // we do this before each modifier to make sure the previous one doesn't
        // mess with these values
        data.offsets.popper = getClientRect(data.offsets.popper);
        data.offsets.reference = getClientRect(data.offsets.reference);

        data = fn(data, modifier);
      }
    });

    return data;
  }

  /**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */
  function update() {
    // if popper is destroyed, don't perform any further update
    if (this.state.isDestroyed) {
      return;
    }

    var data = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: false,
      offsets: {}
    };

    // compute reference element offsets
    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

    // store the computed placement inside `originalPlacement`
    data.originalPlacement = data.placement;

    data.positionFixed = this.options.positionFixed;

    // compute the popper offsets
    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

    // run the modifiers
    data = runModifiers(this.modifiers, data);

    // the first `update` will call `onCreate` callback
    // the other ones will call `onUpdate` callback
    if (!this.state.isCreated) {
      this.state.isCreated = true;
      this.options.onCreate(data);
    } else {
      this.options.onUpdate(data);
    }
  }

  /**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */
  function isModifierEnabled(modifiers, modifierName) {
    return modifiers.some(function (_ref) {
      var name = _ref.name,
          enabled = _ref.enabled;
      return enabled && name === modifierName;
    });
  }

  /**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */
  function getSupportedPropertyName(property) {
    var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var toCheck = prefix ? '' + prefix + upperProp : property;
      if (typeof document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }
    return null;
  }

  /**
   * Destroys the popper.
   * @method
   * @memberof Popper
   */
  function destroy() {
    this.state.isDestroyed = true;

    // touch DOM only if `applyStyle` modifier is enabled
    if (isModifierEnabled(this.modifiers, 'applyStyle')) {
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName('transform')] = '';
    }

    this.disableEventListeners();

    // remove the popper if user explicitly asked for the deletion on destroy
    // do not use `remove` because IE11 doesn't support it
    if (this.options.removeOnDestroy) {
      this.popper.parentNode.removeChild(this.popper);
    }
    return this;
  }

  /**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */
  function getWindow(element) {
    var ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  function attachToScrollParents(scrollParent, event, callback, scrollParents) {
    var isBody = scrollParent.nodeName === 'BODY';
    var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, { passive: true });

    if (!isBody) {
      attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
    }
    scrollParents.push(target);
  }

  /**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function setupEventListeners(reference, options, state, updateBound) {
    // Resize event listener on window
    state.updateBound = updateBound;
    getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

    // Scroll event listener on scroll parents
    var scrollElement = getScrollParent(reference);
    attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;

    return state;
  }

  /**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */
  function enableEventListeners() {
    if (!this.state.eventsEnabled) {
      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
    }
  }

  /**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function removeEventListeners(reference, state) {
    // Remove resize event listener on window
    getWindow(reference).removeEventListener('resize', state.updateBound);

    // Remove scroll event listener on scroll parents
    state.scrollParents.forEach(function (target) {
      target.removeEventListener('scroll', state.updateBound);
    });

    // Reset state
    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
  }

  /**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger `onUpdate` callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */
  function disableEventListeners() {
    if (this.state.eventsEnabled) {
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners(this.reference, this.state);
    }
  }

  /**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */
  function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
      var unit = '';
      // add unit if the value is numeric and is one of the following
      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }
      element.style[prop] = styles[prop] + unit;
    });
  }

  /**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
      var value = attributes[prop];
      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */
  function applyStyle(data) {
    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, data.styles);

    // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element
    setAttributes(data.instance.popper, data.attributes);

    // if arrowElement is defined and arrowStyles has some properties
    if (data.arrowElement && Object.keys(data.arrowStyles).length) {
      setStyles(data.arrowElement, data.arrowStyles);
    }

    return data;
  }

  /**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */
  function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

    popper.setAttribute('x-placement', placement);

    // Apply `position` to popper before anything else because
    // without the position applied we can't guarantee correct computations
    setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

    return options;
  }

  /**
   * @function
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Boolean} shouldRound - If the offsets should be rounded at all
   * @returns {Object} The popper's position offsets rounded
   *
   * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
   * good as it can be within reason.
   * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
   *
   * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
   * as well on High DPI screens).
   *
   * Firefox prefers no rounding for positioning and does not have blurriness on
   * high DPI screens.
   *
   * Only horizontal placement and left/right values need to be considered.
   */
  function getRoundedOffsets(data, shouldRound) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var round = Math.round,
        floor = Math.floor;

    var noRound = function noRound(v) {
      return v;
    };

    var referenceWidth = round(reference.width);
    var popperWidth = round(popper.width);

    var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
    var isVariation = data.placement.indexOf('-') !== -1;
    var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
    var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

    var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
    var verticalToInteger = !shouldRound ? noRound : round;

    return {
      left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
      top: verticalToInteger(popper.top),
      bottom: verticalToInteger(popper.bottom),
      right: horizontalToInteger(popper.right)
    };
  }

  var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeStyle(data, options) {
    var x = options.x,
        y = options.y;
    var popper = data.offsets.popper;

    // Remove this legacy support in Popper.js v2

    var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'applyStyle';
    }).gpuAcceleration;
    if (legacyGpuAccelerationOption !== undefined) {
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
    }
    var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

    var offsetParent = getOffsetParent(data.instance.popper);
    var offsetParentRect = getBoundingClientRect(offsetParent);

    // Styles
    var styles = {
      position: popper.position
    };

    var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

    var sideA = x === 'bottom' ? 'top' : 'bottom';
    var sideB = y === 'right' ? 'left' : 'right';

    // if gpuAcceleration is set to `true` and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed
    var prefixedProperty = getSupportedPropertyName('transform');

    // now, let's make a step back and look at this code closely (wtf?)
    // If the content of the popper grows once it's been positioned, it
    // may happen that the popper gets misplaced because of the new content
    // overflowing its reference element
    // To avoid this problem, we provide two options (x and y), which allow
    // the consumer to define the offset origin.
    // If we position a popper on top of a reference element, we can set
    // `x` to `top` to make the popper grow towards its top instead of
    // its bottom.
    var left = void 0,
        top = void 0;
    if (sideA === 'bottom') {
      // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
      // and not the bottom of the html element
      if (offsetParent.nodeName === 'HTML') {
        top = -offsetParent.clientHeight + offsets.bottom;
      } else {
        top = -offsetParentRect.height + offsets.bottom;
      }
    } else {
      top = offsets.top;
    }
    if (sideB === 'right') {
      if (offsetParent.nodeName === 'HTML') {
        left = -offsetParent.clientWidth + offsets.right;
      } else {
        left = -offsetParentRect.width + offsets.right;
      }
    } else {
      left = offsets.left;
    }
    if (gpuAcceleration && prefixedProperty) {
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
    } else {
      // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
      var invertTop = sideA === 'bottom' ? -1 : 1;
      var invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = sideA + ', ' + sideB;
    }

    // Attributes
    var attributes = {
      'x-placement': data.placement
    };

    // Update `data` attributes, styles and arrowStyles
    data.attributes = _extends({}, attributes, data.attributes);
    data.styles = _extends({}, styles, data.styles);
    data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

    return data;
  }

  /**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */
  function isModifierRequired(modifiers, requestingName, requestedName) {
    var requesting = find(modifiers, function (_ref) {
      var name = _ref.name;
      return name === requestingName;
    });

    var isRequired = !!requesting && modifiers.some(function (modifier) {
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
    });

    if (!isRequired) {
      var _requesting = '`' + requestingName + '`';
      var requested = '`' + requestedName + '`';
      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
    }
    return isRequired;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function arrow(data, options) {
    var _data$offsets$arrow;

    // arrow depends on keepTogether in order to work
    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
      return data;
    }

    var arrowElement = options.element;

    // if arrowElement is a string, suppose it's a CSS selector
    if (typeof arrowElement === 'string') {
      arrowElement = data.instance.popper.querySelector(arrowElement);

      // if arrowElement is not found, don't run the modifier
      if (!arrowElement) {
        return data;
      }
    } else {
      // if the arrowElement isn't a query selector we must check that the
      // provided DOM node is child of its popper node
      if (!data.instance.popper.contains(arrowElement)) {
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
      }
    }

    var placement = data.placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isVertical = ['left', 'right'].indexOf(placement) !== -1;

    var len = isVertical ? 'height' : 'width';
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    var side = sideCapitalized.toLowerCase();
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len];

    //
    // extends keepTogether behavior making sure the popper and its
    // reference have enough pixels in conjunction
    //

    // top/left side
    if (reference[opSide] - arrowElementSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    }
    // bottom/right side
    if (reference[side] + arrowElementSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }
    data.offsets.popper = getClientRect(data.offsets.popper);

    // compute center of the popper
    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

    // Compute the sideValue using the updated popper offsets
    // take popper margin in account because we don't have this info available
    var css = getStyleComputedProperty(data.instance.popper);
    var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
    var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
    var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

    // prevent arrowElement from being placed not contiguously to its popper
    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

    data.arrowElement = arrowElement;
    data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

    return data;
  }

  /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */
  function getOppositeVariation(variation) {
    if (variation === 'end') {
      return 'start';
    } else if (variation === 'start') {
      return 'end';
    }
    return variation;
  }

  /**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-end` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type {Array}
   * @enum {String}
   * @readonly
   * @method placements
   * @memberof Popper
   */
  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

  // Get rid of `auto` `auto-start` and `auto-end`
  var validPlacements = placements.slice(3);

  /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */
  function clockwise(placement) {
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var index = validPlacements.indexOf(placement);
    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
    return counter ? arr.reverse() : arr;
  }

  var BEHAVIORS = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  };

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function flip(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
      return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
      // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
      return data;
    }

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';

    var flipOrder = [];

    switch (options.behavior) {
      case BEHAVIORS.FLIP:
        flipOrder = [placement, placementOpposite];
        break;
      case BEHAVIORS.CLOCKWISE:
        flipOrder = clockwise(placement);
        break;
      case BEHAVIORS.COUNTERCLOCKWISE:
        flipOrder = clockwise(placement, true);
        break;
      default:
        flipOrder = options.behavior;
    }

    flipOrder.forEach(function (step, index) {
      if (placement !== step || flipOrder.length === index + 1) {
        return data;
      }

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);

      var popperOffsets = data.offsets.popper;
      var refOffsets = data.offsets.reference;

      // using floor because the reference offsets may contain decimals we are not going to consider here
      var floor = Math.floor;
      var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

      var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

      var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

      // flip the variation if required
      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

      // flips variation if reference element overflows boundaries
      var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

      // flips variation if popper content overflows boundaries
      var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

      var flippedVariation = flippedVariationByRef || flippedVariationByContent;

      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        // this boolean to detect any flip loop
        data.flipped = true;

        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }

        if (flippedVariation) {
          variation = getOppositeVariation(variation);
        }

        data.placement = placement + (variation ? '-' + variation : '');

        // this object contains `position`, we want to preserve it along with
        // any additional property we may add in the future
        data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

        data = runModifiers(data.instance.modifiers, data, 'flip');
      }
    });
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function keepTogether(data) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var placement = data.placement.split('-')[0];
    var floor = Math.floor;
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var side = isVertical ? 'right' : 'bottom';
    var opSide = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    if (popper[side] < floor(reference[opSide])) {
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
    }
    if (popper[opSide] > floor(reference[side])) {
      data.offsets.popper[opSide] = floor(reference[side]);
    }

    return data;
  }

  /**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} str - Value + unit string
   * @argument {String} measurement - `height` or `width`
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @returns {Number|String}
   * Value in pixels, or original string if no values were extracted
   */
  function toValue(str, measurement, popperOffsets, referenceOffsets) {
    // separate value from unit
    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    var value = +split[1];
    var unit = split[2];

    // If it's not a number it's an operator, I guess
    if (!value) {
      return str;
    }

    if (unit.indexOf('%') === 0) {
      var element = void 0;
      switch (unit) {
        case '%p':
          element = popperOffsets;
          break;
        case '%':
        case '%r':
        default:
          element = referenceOffsets;
      }

      var rect = getClientRect(element);
      return rect[measurement] / 100 * value;
    } else if (unit === 'vh' || unit === 'vw') {
      // if is a vh or vw, we calculate the size based on the viewport
      var size = void 0;
      if (unit === 'vh') {
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      } else {
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }
      return size / 100 * value;
    } else {
      // if is an explicit pixel unit, we get rid of the unit and keep the value
      // if is an implicit unit, it's px, and we return just the value
      return value;
    }
  }

  /**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */
  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
    var offsets = [0, 0];

    // Use height if placement is left or right and index is 0 otherwise use width
    // in this way the first offset will use an axis and the second one
    // will use the other one
    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

    // Split the offset string to obtain a list of values and operands
    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
    var fragments = offset.split(/(\+|\-)/).map(function (frag) {
      return frag.trim();
    });

    // Detect if the offset string contains a pair of values or a single one
    // they could be separated by comma or space
    var divider = fragments.indexOf(find(fragments, function (frag) {
      return frag.search(/,|\s/) !== -1;
    }));

    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    }

    // If divider is found, we divide the list of values and operands to divide
    // them by ofset X and Y.
    var splitRegex = /\s*,\s*|\s+/;
    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

    // Convert the values with units to absolute pixels to allow our computations
    ops = ops.map(function (op, index) {
      // Most of the units rely on the orientation of the popper
      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      var mergeWithPrevious = false;
      return op
      // This aggregates any `+` or `-` sign that aren't considered operators
      // e.g.: 10 + +5 => [10, +, +5]
      .reduce(function (a, b) {
        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
          a[a.length - 1] = b;
          mergeWithPrevious = true;
          return a;
        } else if (mergeWithPrevious) {
          a[a.length - 1] += b;
          mergeWithPrevious = false;
          return a;
        } else {
          return a.concat(b);
        }
      }, [])
      // Here we convert the string values into number values (in px)
      .map(function (str) {
        return toValue(str, measurement, popperOffsets, referenceOffsets);
      });
    });

    // Loop trough the offsets arrays and execute the operations
    ops.forEach(function (op, index) {
      op.forEach(function (frag, index2) {
        if (isNumeric(frag)) {
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
        }
      });
    });
    return offsets;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */
  function offset(data, _ref) {
    var offset = _ref.offset;
    var placement = data.placement,
        _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var basePlacement = placement.split('-')[0];

    var offsets = void 0;
    if (isNumeric(+offset)) {
      offsets = [+offset, 0];
    } else {
      offsets = parseOffset(offset, popper, reference, basePlacement);
    }

    if (basePlacement === 'left') {
      popper.top += offsets[0];
      popper.left -= offsets[1];
    } else if (basePlacement === 'right') {
      popper.top += offsets[0];
      popper.left += offsets[1];
    } else if (basePlacement === 'top') {
      popper.left += offsets[0];
      popper.top -= offsets[1];
    } else if (basePlacement === 'bottom') {
      popper.left += offsets[0];
      popper.top += offsets[1];
    }

    data.popper = popper;
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function preventOverflow(data, options) {
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

    // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken
    if (data.instance.reference === boundariesElement) {
      boundariesElement = getOffsetParent(boundariesElement);
    }

    // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself
    var transformProp = getSupportedPropertyName('transform');
    var popperStyles = data.instance.popper.style; // assignment to help minification
    var top = popperStyles.top,
        left = popperStyles.left,
        transform = popperStyles[transformProp];

    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

    // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed
    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;

    options.boundaries = boundaries;

    var order = options.priority;
    var popper = data.offsets.popper;

    var check = {
      primary: function primary(placement) {
        var value = popper[placement];
        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
          value = Math.max(popper[placement], boundaries[placement]);
        }
        return defineProperty({}, placement, value);
      },
      secondary: function secondary(placement) {
        var mainSide = placement === 'right' ? 'left' : 'top';
        var value = popper[mainSide];
        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
        }
        return defineProperty({}, mainSide, value);
      }
    };

    order.forEach(function (placement) {
      var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends({}, popper, check[side](placement));
    });

    data.offsets.popper = popper;

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function shift(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1];

    // if shift shiftvariation is specified, run the modifier
    if (shiftvariation) {
      var _data$offsets = data.offsets,
          reference = _data$offsets.reference,
          popper = _data$offsets.popper;

      var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      var side = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';

      var shiftOffsets = {
        start: defineProperty({}, side, reference[side]),
        end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
      };

      data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
      return data;
    }

    var refRect = data.offsets.reference;
    var bound = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'preventOverflow';
    }).boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === true) {
        return data;
      }

      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
    } else {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === false) {
        return data;
      }

      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function inner(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);

    return data;
  }

  /**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */

  /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */
  var modifiers = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: shift
    },

    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unit-less, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the `height`.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
     *
     * @memberof modifiers
     * @inner
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: offset,
      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },

    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * A scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: preventOverflow,
      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ['left', 'right', 'top', 'bottom'],
      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper. This makes sure the popper always has a little padding
       * between the edges of its container
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier. Can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: 'scrollParent'
    },

    /**
     * Modifier used to make sure the reference and its popper stay near each other
     * without leaving any gap between the two. Especially useful when the arrow is
     * enabled and you want to ensure that it points to its reference element.
     * It cares only about the first axis. You can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: keepTogether
    },

    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjunction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: arrow,
      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: '[x-arrow]'
    },

    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: flip,
      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations)
       */
      behavior: 'flip',
      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position.
       * The popper will never be placed outside of the defined boundaries
       * (except if `keepTogether` is enabled)
       */
      boundariesElement: 'viewport',
      /**
       * @prop {Boolean} flipVariations=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the reference element overlaps its boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariations: false,
      /**
       * @prop {Boolean} flipVariationsByContent=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the popper element overlaps its reference boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariationsByContent: false
    },

    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,
      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: false,
      /** @prop {ModifierFn} */
      fn: inner
    },

    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: hide
    },

    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: computeStyle,
      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: true,
      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: 'bottom',
      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: 'right'
    },

    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define your own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: applyStyle,
      /** @prop {Function} */
      onLoad: applyStyleOnLoad,
      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: undefined
    }
  };

  /**
   * The `dataObject` is an object containing all the information used by Popper.js.
   * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
   * @name dataObject
   * @property {Object} data.instance The Popper.js instance
   * @property {String} data.placement Placement applied to popper
   * @property {String} data.originalPlacement Placement originally defined on init
   * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
   * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
   * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
   * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.boundaries Offsets of the popper boundaries
   * @property {Object} data.offsets The measurements of popper, reference and arrow elements
   * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
   */

  /**
   * Default options provided to Popper.js constructor.<br />
   * These can be overridden using the `options` argument of Popper.js.<br />
   * To override an option, simply pass an object with the same
   * structure of the `options` object, as the 3rd argument. For example:
   * ```
   * new Popper(ref, pop, {
   *   modifiers: {
   *     preventOverflow: { enabled: false }
   *   }
   * })
   * ```
   * @type {Object}
   * @static
   * @memberof Popper
   */
  var Defaults = {
    /**
     * Popper's placement.
     * @prop {Popper.placements} placement='bottom'
     */
    placement: 'bottom',

    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: false,

    /**
     * Whether events (resize, scroll) are initially enabled.
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: true,

    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: false,

    /**
     * Callback called when the popper is created.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: function onCreate() {},

    /**
     * Callback called when the popper is updated. This callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: function onUpdate() {},

    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * @prop {modifiers}
     */
    modifiers: modifiers
  };

  /**
   * @callback onCreate
   * @param {dataObject} data
   */

  /**
   * @callback onUpdate
   * @param {dataObject} data
   */

  // Utils
  // Methods
  var Popper$1 = function () {
    /**
     * Creates a new Popper.js instance.
     * @class Popper
     * @param {Element|referenceObject} reference - The reference element used to position the popper
     * @param {Element} popper - The HTML / XML element used as the popper
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */
    function Popper(reference, popper) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck(this, Popper);

      this.scheduleUpdate = function () {
        return requestAnimationFrame(_this.update);
      };

      // make update() debounced, so that it only runs at most once-per-tick
      this.update = debounce(this.update.bind(this));

      // with {} we create a new object with the options inside it
      this.options = _extends({}, Popper.Defaults, options);

      // init state
      this.state = {
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
      };

      // get reference and popper elements (allow jQuery wrappers)
      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper;

      // Deep merge modifiers options
      this.options.modifiers = {};
      Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
        _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      });

      // Refactoring modifiers' list (Object => Array)
      this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
        return _extends({
          name: name
        }, _this.options.modifiers[name]);
      })
      // sort the modifiers by order
      .sort(function (a, b) {
        return a.order - b.order;
      });

      // modifiers have the ability to execute arbitrary code when Popper.js get inited
      // such code is executed in the same order of its modifier
      // they could add new properties to their options configuration
      // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
      this.modifiers.forEach(function (modifierOptions) {
        if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
          modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
        }
      });

      // fire the first update to position the popper in the right place
      this.update();

      var eventsEnabled = this.options.eventsEnabled;
      if (eventsEnabled) {
        // setup event listeners, they will take care of update the position in specific situations
        this.enableEventListeners();
      }

      this.state.eventsEnabled = eventsEnabled;
    }

    // We can't use class properties because they don't get listed in the
    // class prototype and break stuff like Sinon stubs


    createClass(Popper, [{
      key: 'update',
      value: function update$$1() {
        return update.call(this);
      }
    }, {
      key: 'destroy',
      value: function destroy$$1() {
        return destroy.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function enableEventListeners$$1() {
        return enableEventListeners.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function disableEventListeners$$1() {
        return disableEventListeners.call(this);
      }

      /**
       * Schedules an update. It will run on the next UI update available.
       * @method scheduleUpdate
       * @memberof Popper
       */


      /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */

    }]);
    return Popper;
  }();

  /**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10.
   * @name referenceObject
   * @property {Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property {number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property {number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */


  Popper$1.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
  Popper$1.placements = placements;
  Popper$1.Defaults = Defaults;

  var lib = {exports: {}};

  var implementation = {exports: {}};

  var key = '__global_unique_id__';

  var gud = function() {
    return commonjsGlobal[key] = (commonjsGlobal[key] || 0) + 1;
  };

  (function (module, exports) {

  exports.__esModule = true;

  var _react = React__default['default'];

  _interopRequireDefault(_react);

  var _propTypes = propTypes$b.exports;

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _gud = gud;

  var _gud2 = _interopRequireDefault(_gud);

  var _warning = warning_1;

  var _warning2 = _interopRequireDefault(_warning);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var MAX_SIGNED_31_BIT_INT = 1073741823;

  // Inlined Object.is polyfill.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
  function objectIs(x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  }

  function createEventEmitter(value) {
    var handlers = [];
    return {
      on: function on(handler) {
        handlers.push(handler);
      },
      off: function off(handler) {
        handlers = handlers.filter(function (h) {
          return h !== handler;
        });
      },
      get: function get() {
        return value;
      },
      set: function set(newValue, changedBits) {
        value = newValue;
        handlers.forEach(function (handler) {
          return handler(value, changedBits);
        });
      }
    };
  }

  function onlyChild(children) {
    return Array.isArray(children) ? children[0] : children;
  }

  function createReactContext(defaultValue, calculateChangedBits) {
    var _Provider$childContex, _Consumer$contextType;

    var contextProp = '__create-react-context-' + (0, _gud2.default)() + '__';

    var Provider = function (_Component) {
      _inherits(Provider, _Component);

      function Provider() {
        var _temp, _this, _ret;

        _classCallCheck(this, Provider);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.emitter = createEventEmitter(_this.props.value), _temp), _possibleConstructorReturn(_this, _ret);
      }

      Provider.prototype.getChildContext = function getChildContext() {
        var _ref;

        return _ref = {}, _ref[contextProp] = this.emitter, _ref;
      };

      Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
          var oldValue = this.props.value;
          var newValue = nextProps.value;
          var changedBits = void 0;

          if (objectIs(oldValue, newValue)) {
            changedBits = 0; // No change
          } else {
            changedBits = typeof calculateChangedBits === 'function' ? calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;
            {
              (0, _warning2.default)((changedBits & MAX_SIGNED_31_BIT_INT) === changedBits, 'calculateChangedBits: Expected the return value to be a ' + '31-bit integer. Instead received: %s', changedBits);
            }

            changedBits |= 0;

            if (changedBits !== 0) {
              this.emitter.set(nextProps.value, changedBits);
            }
          }
        }
      };

      Provider.prototype.render = function render() {
        return this.props.children;
      };

      return Provider;
    }(_react.Component);

    Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[contextProp] = _propTypes2.default.object.isRequired, _Provider$childContex);

    var Consumer = function (_Component2) {
      _inherits(Consumer, _Component2);

      function Consumer() {
        var _temp2, _this2, _ret2;

        _classCallCheck(this, Consumer);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, _Component2.call.apply(_Component2, [this].concat(args))), _this2), _this2.state = {
          value: _this2.getValue()
        }, _this2.onUpdate = function (newValue, changedBits) {
          var observedBits = _this2.observedBits | 0;
          if ((observedBits & changedBits) !== 0) {
            _this2.setState({ value: _this2.getValue() });
          }
        }, _temp2), _possibleConstructorReturn(_this2, _ret2);
      }

      Consumer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var observedBits = nextProps.observedBits;

        this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default
        : observedBits;
      };

      Consumer.prototype.componentDidMount = function componentDidMount() {
        if (this.context[contextProp]) {
          this.context[contextProp].on(this.onUpdate);
        }
        var observedBits = this.props.observedBits;

        this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default
        : observedBits;
      };

      Consumer.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.context[contextProp]) {
          this.context[contextProp].off(this.onUpdate);
        }
      };

      Consumer.prototype.getValue = function getValue() {
        if (this.context[contextProp]) {
          return this.context[contextProp].get();
        } else {
          return defaultValue;
        }
      };

      Consumer.prototype.render = function render() {
        return onlyChild(this.props.children)(this.state.value);
      };

      return Consumer;
    }(_react.Component);

    Consumer.contextTypes = (_Consumer$contextType = {}, _Consumer$contextType[contextProp] = _propTypes2.default.object, _Consumer$contextType);


    return {
      Provider: Provider,
      Consumer: Consumer
    };
  }

  exports.default = createReactContext;
  module.exports = exports['default'];
  }(implementation, implementation.exports));

  (function (module, exports) {

  exports.__esModule = true;

  var _react = React__default['default'];

  var _react2 = _interopRequireDefault(_react);

  var _implementation = implementation.exports;

  var _implementation2 = _interopRequireDefault(_implementation);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = _react2.default.createContext || _implementation2.default;
  module.exports = exports['default'];
  }(lib, lib.exports));

  var createContext = /*@__PURE__*/getDefaultExportFromCjs(lib.exports);

  var ManagerReferenceNodeContext = createContext();
  createContext();

  /**
   * Takes an argument and if it's an array, returns the first item in the array,
   * otherwise returns the argument. Used for Preact compatibility.
   */
  var unwrapArray = function unwrapArray(arg) {
    return Array.isArray(arg) ? arg[0] : arg;
  };
  /**
   * Takes a maybe-undefined function and arbitrary args and invokes the function
   * only if it is defined.
   */

  var safeInvoke = function safeInvoke(fn) {
    if (typeof fn === "function") {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return fn.apply(void 0, args);
    }
  };
  /**
   * Does a shallow equality check of two objects by comparing the reference
   * equality of each value.
   */

  var shallowEqual = function shallowEqual(objA, objB) {
    var aKeys = Object.keys(objA);
    var bKeys = Object.keys(objB);

    if (bKeys.length !== aKeys.length) {
      return false;
    }

    for (var i = 0; i < bKeys.length; i++) {
      var key = aKeys[i];

      if (objA[key] !== objB[key]) {
        return false;
      }
    }

    return true;
  };
  /**
   * Sets a ref using either a ref callback or a ref object
   */

  var setRef = function setRef(ref, node) {
    // if its a function call it
    if (typeof ref === "function") {
      return safeInvoke(ref, node);
    } // otherwise we should treat it as a ref object
    else if (ref != null) {
        ref.current = node;
      }
  };

  var initialStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    pointerEvents: 'none'
  };
  var initialArrowStyle = {};
  var InnerPopper =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(InnerPopper, _React$Component);

    function InnerPopper() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        data: undefined,
        placement: undefined
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "popperInstance", void 0);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "popperNode", null);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "arrowNode", null);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setPopperNode", function (popperNode) {
        if (!popperNode || _this.popperNode === popperNode) return;
        setRef(_this.props.innerRef, popperNode);
        _this.popperNode = popperNode;

        _this.updatePopperInstance();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setArrowNode", function (arrowNode) {
        _this.arrowNode = arrowNode;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateStateModifier", {
        enabled: true,
        order: 900,
        fn: function fn(data) {
          var placement = data.placement;

          _this.setState({
            data: data,
            placement: placement
          });

          return data;
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOptions", function () {
        return {
          placement: _this.props.placement,
          eventsEnabled: _this.props.eventsEnabled,
          positionFixed: _this.props.positionFixed,
          modifiers: _extends$1({}, _this.props.modifiers, {
            arrow: _extends$1({}, _this.props.modifiers && _this.props.modifiers.arrow, {
              enabled: !!_this.arrowNode,
              element: _this.arrowNode
            }),
            applyStyle: {
              enabled: false
            },
            updateStateModifier: _this.updateStateModifier
          })
        };
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPopperStyle", function () {
        return !_this.popperNode || !_this.state.data ? initialStyle : _extends$1({
          position: _this.state.data.offsets.popper.position
        }, _this.state.data.styles);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPopperPlacement", function () {
        return !_this.state.data ? undefined : _this.state.placement;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getArrowStyle", function () {
        return !_this.arrowNode || !_this.state.data ? initialArrowStyle : _this.state.data.arrowStyles;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOutOfBoundariesState", function () {
        return _this.state.data ? _this.state.data.hide : undefined;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "destroyPopperInstance", function () {
        if (!_this.popperInstance) return;

        _this.popperInstance.destroy();

        _this.popperInstance = null;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updatePopperInstance", function () {
        _this.destroyPopperInstance();

        var _assertThisInitialize = _assertThisInitialized(_assertThisInitialized(_this)),
            popperNode = _assertThisInitialize.popperNode;

        var referenceElement = _this.props.referenceElement;
        if (!referenceElement || !popperNode) return;
        _this.popperInstance = new Popper$1(referenceElement, popperNode, _this.getOptions());
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scheduleUpdate", function () {
        if (_this.popperInstance) {
          _this.popperInstance.scheduleUpdate();
        }
      });

      return _this;
    }

    var _proto = InnerPopper.prototype;

    _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
      // If the Popper.js options have changed, update the instance (destroy + create)
      if (this.props.placement !== prevProps.placement || this.props.referenceElement !== prevProps.referenceElement || this.props.positionFixed !== prevProps.positionFixed || !deepEqual_1(this.props.modifiers, prevProps.modifiers, {
        strict: true
      })) {
        // develop only check that modifiers isn't being updated needlessly
        {
          if (this.props.modifiers !== prevProps.modifiers && this.props.modifiers != null && prevProps.modifiers != null && shallowEqual(this.props.modifiers, prevProps.modifiers)) {
            console.warn("'modifiers' prop reference updated even though all values appear the same.\nConsider memoizing the 'modifiers' object to avoid needless rendering.");
          }
        }

        this.updatePopperInstance();
      } else if (this.props.eventsEnabled !== prevProps.eventsEnabled && this.popperInstance) {
        this.props.eventsEnabled ? this.popperInstance.enableEventListeners() : this.popperInstance.disableEventListeners();
      } // A placement difference in state means popper determined a new placement
      // apart from the props value. By the time the popper element is rendered with
      // the new position Popper has already measured it, if the place change triggers
      // a size change it will result in a misaligned popper. So we schedule an update to be sure.


      if (prevState.placement !== this.state.placement) {
        this.scheduleUpdate();
      }
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      setRef(this.props.innerRef, null);
      this.destroyPopperInstance();
    };

    _proto.render = function render() {
      return unwrapArray(this.props.children)({
        ref: this.setPopperNode,
        style: this.getPopperStyle(),
        placement: this.getPopperPlacement(),
        outOfBoundaries: this.getOutOfBoundariesState(),
        scheduleUpdate: this.scheduleUpdate,
        arrowProps: {
          ref: this.setArrowNode,
          style: this.getArrowStyle()
        }
      });
    };

    return InnerPopper;
  }(React__namespace.Component);

  _defineProperty(InnerPopper, "defaultProps", {
    placement: 'bottom',
    eventsEnabled: true,
    referenceElement: undefined,
    positionFixed: false
  });

  Popper$1.placements;
  function Popper(_ref) {
    var referenceElement = _ref.referenceElement,
        props = _objectWithoutPropertiesLoose(_ref, ["referenceElement"]);

    return React__namespace.createElement(ManagerReferenceNodeContext.Consumer, null, function (referenceNode) {
      return React__namespace.createElement(InnerPopper, _extends$1({
        referenceElement: referenceElement !== undefined ? referenceElement : referenceNode
      }, props));
    });
  }

  var _excluded$a = ["styles"],
      _excluded2$1 = ["ref"];
  // `Element` is not defined during server-side rendering, so shim it here.

  /* istanbul ignore next */
  var SafeElement = typeof Element === 'undefined' ? function () {} : Element;
  var propTypes$6 = {
    /**
     * Specify menu alignment. The default value is `justify`, which makes the
     * menu as wide as the input and truncates long values. Specifying `left`
     * or `right` will align the menu to that side and the width will be
     * determined by the length of menu item values.
     */
    align: PropTypes.oneOf(values(ALIGN)),
    children: PropTypes.func.isRequired,

    /**
     * Specify whether the menu should appear above the input.
     */
    dropup: PropTypes.bool,

    /**
     * Whether or not to automatically adjust the position of the menu when it
     * reaches the viewport boundaries.
     */
    flip: PropTypes.bool,
    isMenuShown: PropTypes.bool,
    positionFixed: PropTypes.bool,
    referenceElement: PropTypes.instanceOf(SafeElement)
  };
  var defaultProps$4 = {
    align: ALIGN.JUSTIFY,
    dropup: false,
    flip: false,
    isMenuShown: false,
    positionFixed: false
  };

  function getModifiers(_ref) {
    var align = _ref.align,
        flip = _ref.flip;
    return {
      computeStyles: {
        enabled: true,
        fn: function fn(_ref2) {
          var styles = _ref2.styles,
              data = _objectWithoutProperties(_ref2, _excluded$a);

          return _objectSpread2(_objectSpread2({}, data), {}, {
            styles: _objectSpread2(_objectSpread2({}, styles), {}, {
              // Use the following condition instead of `align === 'justify'`
              // since it allows the component to fall back to justifying the
              // menu width if `align` is undefined.
              width: align !== ALIGN.RIGHT && align !== ALIGN.LEFT ? // Set the popper width to match the target width.
              data.offsets.reference.width : styles.width
            })
          });
        }
      },
      flip: {
        enabled: flip
      },
      preventOverflow: {
        escapeWithReference: true
      }
    };
  } // Flow expects a string literal value for `placement`.


  var PLACEMENT = {
    bottom: {
      end: 'bottom-end',
      start: 'bottom-start'
    },
    top: {
      end: 'top-end',
      start: 'top-start'
    }
  };
  function getPlacement(_ref3) {
    var align = _ref3.align,
        dropup = _ref3.dropup;
    var x = align === ALIGN.RIGHT ? 'end' : 'start';
    var y = dropup ? 'top' : 'bottom';
    return PLACEMENT[y][x];
  }

  var Overlay = function Overlay(props) {
    var children = props.children,
        isMenuShown = props.isMenuShown,
        positionFixed = props.positionFixed,
        referenceElement = props.referenceElement;

    if (!isMenuShown) {
      return null;
    }

    return /*#__PURE__*/React__namespace.createElement(Popper, {
      modifiers: getModifiers(props),
      placement: getPlacement(props),
      positionFixed: positionFixed,
      referenceElement: referenceElement
    }, function (_ref4) {
      var ref = _ref4.ref,
          popperProps = _objectWithoutProperties(_ref4, _excluded2$1);

      return children(_objectSpread2(_objectSpread2({}, popperProps), {}, {
        innerRef: ref,
        inputHeight: referenceElement ? referenceElement.offsetHeight : 0
      }));
    });
  };

  Overlay.propTypes = propTypes$6;
  Overlay.defaultProps = defaultProps$4;

  var _excluded$9 = ["onBlur", "onClick", "onFocus", "onRemove", "option"];
  var propTypes$5 = {
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onRemove: PropTypes.func,
    option: optionType.isRequired
  };
  var useToken = function useToken(_ref) {
    var onBlur = _ref.onBlur,
        onClick = _ref.onClick,
        onFocus = _ref.onFocus,
        onRemove = _ref.onRemove,
        option = _ref.option,
        props = _objectWithoutProperties(_ref, _excluded$9);

    var _useState = React.useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        active = _useState2[0],
        setActive = _useState2[1];

    var _useState3 = React.useState(null),
        _useState4 = _slicedToArray(_useState3, 2),
        rootElement = _useState4[0],
        attachRef = _useState4[1];

    var handleActiveChange = function handleActiveChange(e, isActive, callback) {
      setActive(isActive);
      typeof callback === 'function' && callback(e);
    };

    var handleBlur = function handleBlur(e) {
      handleActiveChange(e, false, onBlur);
    };

    var handleClick = function handleClick(e) {
      handleActiveChange(e, true, onClick);
    };

    var handleFocus = function handleFocus(e) {
      handleActiveChange(e, true, onFocus);
    };

    var handleRemove = function handleRemove() {
      onRemove && onRemove(option);
    };

    var handleKeyDown = function handleKeyDown(e) {
      switch (e.keyCode) {
        case BACKSPACE:
          if (active) {
            // Prevent backspace keypress from triggering the browser "back"
            // action.
            e.preventDefault();
            handleRemove();
          }

          break;
      }
    };

    useRootClose(rootElement, handleBlur, _objectSpread2(_objectSpread2({}, props), {}, {
      disabled: !active
    }));
    return _objectSpread2(_objectSpread2({}, props), {}, {
      active: active,
      onBlur: handleBlur,
      onClick: handleClick,
      onFocus: handleFocus,
      onKeyDown: handleKeyDown,
      onRemove: isFunction$2(onRemove) ? handleRemove : undefined,
      ref: attachRef
    });
  };
  var withToken = function withToken(Component) {
    var displayName = "withToken(".concat(getDisplayName(Component), ")");

    var WrappedToken = function WrappedToken(props) {
      return /*#__PURE__*/React__default['default'].createElement(Component, useToken(props));
    };

    WrappedToken.displayName = displayName;
    WrappedToken.propTypes = propTypes$5;
    return WrappedToken;
  };
  function tokenContainer(Component) {
    /* istanbul ignore next */
    warn(false, 'The `tokenContainer` export is deprecated; use `withToken` instead.');
    /* istanbul ignore next */

    return withToken(Component);
  }

  var _excluded$8 = ["active", "children", "className", "onRemove", "tabIndex"];
  var InteractiveToken = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
    var active = _ref.active,
        children = _ref.children,
        className = _ref.className,
        onRemove = _ref.onRemove,
        tabIndex = _ref.tabIndex,
        props = _objectWithoutProperties(_ref, _excluded$8);

    return /*#__PURE__*/React__default['default'].createElement("div", _extends$2({}, props, {
      className: cx('rbt-token', 'rbt-token-removeable', {
        'rbt-token-active': !!active
      }, className),
      ref: ref,
      tabIndex: tabIndex || 0
    }), children, /*#__PURE__*/React__default['default'].createElement(ClearButton, {
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
      return /*#__PURE__*/React__default['default'].createElement("a", {
        className: classnames,
        href: href
      }, children);
    }

    return /*#__PURE__*/React__default['default'].createElement("div", {
      className: classnames
    }, children);
  };
  /**
   * Token
   *
   * Individual token component, generally displayed within the TokenizerInput
   * component, but can also be rendered on its own.
   */


  var Token = /*#__PURE__*/React.forwardRef(function (props, ref) {
    var disabled = props.disabled,
        onRemove = props.onRemove,
        readOnly = props.readOnly;
    return !disabled && !readOnly && isFunction$2(onRemove) ? /*#__PURE__*/React__default['default'].createElement(InteractiveToken, _extends$2({}, props, {
      ref: ref
    })) : /*#__PURE__*/React__default['default'].createElement(StaticToken, props);
  });
  var Token$1 = withToken(Token);

  var _excluded$7 = ["className"];

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
      return styles[attr + dir + subattr];
    }).join(' ');
  }

  function copyStyles(inputNode, hintNode) {
    if (!inputNode || !hintNode) {
      return;
    }

    var inputStyle = window.getComputedStyle(inputNode);
    /* eslint-disable no-param-reassign */

    hintNode.style.borderStyle = interpolateStyle(inputStyle, 'border', 'style');
    hintNode.style.borderWidth = interpolateStyle(inputStyle, 'border', 'width');
    hintNode.style.fontSize = inputStyle.fontSize;
    hintNode.style.height = inputStyle.height;
    hintNode.style.lineHeight = inputStyle.lineHeight;
    hintNode.style.margin = interpolateStyle(inputStyle, 'margin');
    hintNode.style.padding = interpolateStyle(inputStyle, 'padding');
    /* eslint-enable no-param-reassign */
  }

  function defaultShouldSelect(e, state) {
    var shouldSelectHint = false;
    var currentTarget = e.currentTarget,
        keyCode = e.keyCode;

    if (keyCode === RIGHT) {
      // For selectable input types ("text", "search"), only select the hint if
      // it's at the end of the input value. For non-selectable types ("email",
      // "number"), always select the hint.
      shouldSelectHint = isSelectable(currentTarget) ? currentTarget.selectionStart === currentTarget.value.length : true;
    }

    if (keyCode === TAB) {
      // Prevent input from blurring on TAB.
      e.preventDefault();
      shouldSelectHint = true;
    }

    if (keyCode === RETURN) {
      shouldSelectHint = !!state.selectHintOnEnter;
    }

    return typeof state.shouldSelect === 'function' ? state.shouldSelect(shouldSelectHint, e) : shouldSelectHint;
  }
  var useHint = function useHint(_ref) {
    var children = _ref.children,
        shouldSelect = _ref.shouldSelect;
    !(React__default['default'].Children.count(children) === 1) ? invariant_1(false, '`useHint` expects one child.')  : void 0;

    var _useTypeaheadContext = useTypeaheadContext(),
        hintText = _useTypeaheadContext.hintText,
        initialItem = _useTypeaheadContext.initialItem,
        inputNode = _useTypeaheadContext.inputNode,
        onAdd = _useTypeaheadContext.onAdd,
        selectHintOnEnter = _useTypeaheadContext.selectHintOnEnter;

    var hintRef = React.useRef(null);

    var onKeyDown = function onKeyDown(e) {
      if (hintText && initialItem && defaultShouldSelect(e, {
        selectHintOnEnter: selectHintOnEnter,
        shouldSelect: shouldSelect
      })) {
        onAdd(initialItem);
      }

      children.props.onKeyDown && children.props.onKeyDown(e);
    };

    React.useEffect(function () {
      copyStyles(inputNode, hintRef.current);
    });
    return {
      child: /*#__PURE__*/React.cloneElement(children, _objectSpread2(_objectSpread2({}, children.props), {}, {
        onKeyDown: onKeyDown
      })),
      hintRef: hintRef,
      hintText: hintText
    };
  };

  var Hint = function Hint(_ref2) {
    var className = _ref2.className,
        props = _objectWithoutProperties(_ref2, _excluded$7);

    var _useHint = useHint(props),
        child = _useHint.child,
        hintRef = _useHint.hintRef,
        hintText = _useHint.hintText;

    return /*#__PURE__*/React__default['default'].createElement("div", {
      className: className,
      style: {
        display: 'flex',
        flex: 1,
        height: '100%',
        position: 'relative'
      }
    }, child, /*#__PURE__*/React__default['default'].createElement("input", {
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

  var Input = /*#__PURE__*/React__default['default'].forwardRef(function (props, ref) {
    return /*#__PURE__*/React__default['default'].createElement("input", _extends$2({}, props, {
      className: cx('rbt-input-main', props.className),
      ref: ref
    }));
  });

  var _excluded$6 = ["className", "isInvalid", "isValid", "size"];

  function withClassNames(Component) {
    // Use a class instead of function component to support refs.

    /* eslint-disable-next-line react/prefer-stateless-function */
    var WrappedComponent = /*#__PURE__*/function (_React$Component) {
      _inherits(WrappedComponent, _React$Component);

      var _super = _createSuper(WrappedComponent);

      function WrappedComponent() {
        _classCallCheck(this, WrappedComponent);

        return _super.apply(this, arguments);
      }

      _createClass(WrappedComponent, [{
        key: "render",
        value: function render() {
          var _this$props = this.props,
              className = _this$props.className,
              isInvalid = _this$props.isInvalid,
              isValid = _this$props.isValid,
              size = _this$props.size,
              props = _objectWithoutProperties(_this$props, _excluded$6);

          return /*#__PURE__*/React__default['default'].createElement(Component, _extends$2({}, props, {
            className: cx('form-control', 'rbt-input', {
              'form-control-lg': isSizeLarge(size),
              'form-control-sm': isSizeSmall(size),
              'is-invalid': isInvalid,
              'is-valid': isValid
            }, className)
          }));
        }
      }]);

      return WrappedComponent;
    }(React__default['default'].Component);

    _defineProperty$1(WrappedComponent, "displayName", "withClassNames(".concat(getDisplayName(Component), ")"));

    return WrappedComponent;
  }

  var _excluded$5 = ["children", "className", "inputClassName", "inputRef", "placeholder", "referenceElementRef", "selected", "shouldSelectHint"];

  var TypeaheadInputMulti = /*#__PURE__*/function (_React$Component) {
    _inherits(TypeaheadInputMulti, _React$Component);

    var _super = _createSuper(TypeaheadInputMulti);

    function TypeaheadInputMulti() {
      var _this;

      _classCallCheck(this, TypeaheadInputMulti);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty$1(_assertThisInitialized$1(_this), "wrapperRef", /*#__PURE__*/React__default['default'].createRef());

      _defineProperty$1(_assertThisInitialized$1(_this), "_input", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "getInputRef", function (input) {
        _this._input = input;

        _this.props.inputRef(input);
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "_handleContainerClickOrFocus", function (e) {
        // Don't focus the input if it's disabled.
        if (_this.props.disabled) {
          e.currentTarget.blur();
          return;
        } // Move cursor to the end if the user clicks outside the actual input.


        var inputNode = _this._input;

        if (!inputNode || // $FlowFixMe
        e.currentTarget.contains(e.target) && e.currentTarget !== e.target) {
          return;
        }

        if (isSelectable(inputNode)) {
          inputNode.selectionStart = inputNode.value.length;
        }

        inputNode.focus();
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "_handleKeyDown", function (e) {
        var _this$props = _this.props,
            onKeyDown = _this$props.onKeyDown,
            selected = _this$props.selected,
            value = _this$props.value;

        switch (e.keyCode) {
          case BACKSPACE:
            if (e.currentTarget === _this._input && selected.length && !value) {
              // Prevent browser from going back.
              e.preventDefault(); // If the input is selected and there is no text, focus the last
              // token when the user hits backspace.

              if (_this.wrapperRef.current) {
                var children = _this.wrapperRef.current.children;
                var lastToken = children[children.length - 2];
                lastToken && lastToken.focus();
              }
            }

            break;
        }

        onKeyDown(e);
      });

      return _this;
    }

    _createClass(TypeaheadInputMulti, [{
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            children = _this$props2.children,
            className = _this$props2.className,
            inputClassName = _this$props2.inputClassName;
            _this$props2.inputRef;
            var placeholder = _this$props2.placeholder,
            referenceElementRef = _this$props2.referenceElementRef,
            selected = _this$props2.selected,
            shouldSelectHint = _this$props2.shouldSelectHint,
            props = _objectWithoutProperties(_this$props2, _excluded$5);

        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: cx('rbt-input-multi', className),
          disabled: props.disabled,
          onClick: this._handleContainerClickOrFocus,
          onFocus: this._handleContainerClickOrFocus,
          ref: referenceElementRef,
          tabIndex: -1
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          className: "rbt-input-wrapper",
          ref: this.wrapperRef
        }, children, /*#__PURE__*/React__default['default'].createElement(Hint, {
          shouldSelect: shouldSelectHint
        }, /*#__PURE__*/React__default['default'].createElement(Input, _extends$2({}, props, {
          className: inputClassName,
          onKeyDown: this._handleKeyDown,
          placeholder: selected.length ? '' : placeholder,
          ref: this.getInputRef,
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
    }]);

    return TypeaheadInputMulti;
  }(React__default['default'].Component);

  var TypeaheadInputMulti$1 = withClassNames(TypeaheadInputMulti);

  var _excluded$4 = ["inputRef", "referenceElementRef", "shouldSelectHint"];
  var TypeaheadInputSingle = withClassNames(function (_ref) {
    var inputRef = _ref.inputRef,
        referenceElementRef = _ref.referenceElementRef,
        shouldSelectHint = _ref.shouldSelectHint,
        props = _objectWithoutProperties(_ref, _excluded$4);

    return /*#__PURE__*/React__default['default'].createElement(Hint, {
      shouldSelect: shouldSelectHint
    }, /*#__PURE__*/React__default['default'].createElement(Input, _extends$2({}, props, {
      ref: function ref(node) {
        inputRef(node);
        referenceElementRef(node);
      }
    })));
  });

  var propTypes$4 = {
    children: PropTypes.string.isRequired,
    highlightClassName: PropTypes.string,
    search: PropTypes.string.isRequired
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
  var Highlighter = /*#__PURE__*/function (_React$PureComponent) {
    _inherits(Highlighter, _React$PureComponent);

    var _super = _createSuper(Highlighter);

    function Highlighter() {
      _classCallCheck(this, Highlighter);

      return _super.apply(this, arguments);
    }

    _createClass(Highlighter, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            children = _this$props.children,
            highlightClassName = _this$props.highlightClassName,
            search = _this$props.search;

        if (!search || !children) {
          return children;
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
          highlighterChildren.push( /*#__PURE__*/React__default['default'].createElement("mark", {
            className: highlightClassName,
            key: matchCount
          }, match));
          matchCount += 1; // And if there's anything left over, continue the loop.

          remaining = remaining.slice(bounds.end);
        }

        return highlighterChildren;
      }
    }]);

    return Highlighter;
  }(React__default['default'].PureComponent);

  _defineProperty$1(Highlighter, "propTypes", propTypes$4);

  _defineProperty$1(Highlighter, "defaultProps", defaultProps$3);

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
    var targetIsDetached = !target.ownerDocument.documentElement.contains(target);

    if (isOptionsObject(options) && typeof options.behavior === 'function') {
      return options.behavior(targetIsDetached ? [] : compute(target, options));
    }

    if (targetIsDetached) {
      return;
    }

    var computeOptions = getOptions(options);
    return defaultBehavior(compute(target, computeOptions), computeOptions.behavior);
  }

  var _excluded$3 = ["label", "onClick", "option", "position"];
  var propTypes$3 = {
    option: optionType.isRequired,
    position: PropTypes.number
  };
  var useItem = function useItem(_ref) {
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
  };
  var withItem = function withItem(Component) {
    var displayName = "withItem(".concat(getDisplayName(Component), ")");

    var WrappedMenuItem = function WrappedMenuItem(props) {
      return /*#__PURE__*/React__default['default'].createElement(Component, useItem(props));
    };

    WrappedMenuItem.displayName = displayName;
    WrappedMenuItem.propTypes = propTypes$3;
    return WrappedMenuItem;
  };
  function menuItemContainer(Component) {
    /* istanbul ignore next */
    warn(false, 'The `menuItemContainer` export is deprecated; use `withItem` instead.');
    /* istanbul ignore next */

    return withItem(Component);
  }

  var _excluded$2 = ["active", "children", "className", "disabled", "onClick"];
  var BaseMenuItem = /*#__PURE__*/React__default['default'].forwardRef(function (_ref, ref) {
    var active = _ref.active,
        children = _ref.children,
        className = _ref.className,
        disabled = _ref.disabled,
        _onClick = _ref.onClick,
        props = _objectWithoutProperties(_ref, _excluded$2);

    return /*#__PURE__*/React__default['default'].createElement("a", _extends$2({}, props, {
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
  var MenuItem = withItem(BaseMenuItem);

  var MenuDivider = function MenuDivider(props) {
    return /*#__PURE__*/React__default['default'].createElement("div", {
      className: "dropdown-divider",
      role: "separator"
    });
  };

  var MenuHeader = function MenuHeader(props) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
      React__default['default'].createElement("div", _extends$2({}, props, {
        className: "dropdown-header",
        role: "heading"
      }))
    );
  };

  var propTypes$2 = {
    'aria-label': PropTypes.string,

    /**
     * Message to display in the menu if there are no valid results.
     */
    emptyLabel: PropTypes.node,

    /**
     * Needed for accessibility.
     */
    id: checkPropType(PropTypes.oneOfType([PropTypes.number, PropTypes.string]), isRequiredForA11y),

    /**
     * Maximum height of the dropdown menu.
     */
    maxHeight: PropTypes.string
  };
  var defaultProps$2 = {
    'aria-label': 'menu-options',
    emptyLabel: 'No matches found.',
    maxHeight: '300px'
  };

  /**
   * Menu component that handles empty state when passed a set of results.
   */
  var Menu = /*#__PURE__*/function (_React$Component) {
    _inherits(Menu, _React$Component);

    var _super = _createSuper(Menu);

    function Menu() {
      _classCallCheck(this, Menu);

      return _super.apply(this, arguments);
    }

    _createClass(Menu, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var _this$props = this.props,
            inputHeight = _this$props.inputHeight,
            scheduleUpdate = _this$props.scheduleUpdate; // Update the menu position if the height of the input changes.

        if (inputHeight !== prevProps.inputHeight) {
          scheduleUpdate();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            children = _this$props2.children,
            className = _this$props2.className,
            emptyLabel = _this$props2.emptyLabel,
            id = _this$props2.id,
            innerRef = _this$props2.innerRef,
            maxHeight = _this$props2.maxHeight,
            style = _this$props2.style,
            text = _this$props2.text;
        var contents = React.Children.count(children) === 0 ? /*#__PURE__*/React__default['default'].createElement(BaseMenuItem, {
          disabled: true,
          role: "option"
        }, emptyLabel) : children;
        return (
          /*#__PURE__*/

          /* eslint-disable jsx-a11y/interactive-supports-focus */
          React__default['default'].createElement("div", {
            "aria-label": this.props['aria-label'],
            className: cx('rbt-menu', 'dropdown-menu', 'show', className),
            id: id,
            key: // Force a re-render if the text changes to ensure that menu
            // positioning updates correctly.
            text,
            onMouseDown: // Prevent input from blurring when clicking on the menu scrollbar.
            preventInputBlur,
            ref: innerRef,
            role: "listbox",
            style: _objectSpread2(_objectSpread2({}, style), {}, {
              display: 'block',
              maxHeight: maxHeight,
              overflow: 'auto'
            })
          }, contents)
          /* eslint-enable jsx-a11y/interactive-supports-focus */

        );
      }
    }]);

    return Menu;
  }(React__default['default'].Component);

  _defineProperty$1(Menu, "propTypes", propTypes$2);

  _defineProperty$1(Menu, "defaultProps", defaultProps$2);

  _defineProperty$1(Menu, "Divider", MenuDivider);

  _defineProperty$1(Menu, "Header", MenuHeader);

  var _excluded$1 = ["labelKey", "newSelectionPrefix", "options", "paginationText", "renderMenuItemChildren", "text"];
  var propTypes$1 = {
    /**
     * Provides the ability to specify a prefix before the user-entered text to
     * indicate that the selection will be new. No-op unless `allowNew={true}`.
     */
    newSelectionPrefix: PropTypes.node,

    /**
     * Prompt displayed when large data sets are paginated.
     */
    paginationText: PropTypes.node,

    /**
     * Provides a hook for customized rendering of menu item contents.
     */
    renderMenuItemChildren: PropTypes.func
  };
  var defaultProps$1 = {
    newSelectionPrefix: 'New selection: ',
    paginationText: 'Display additional results...',
    renderMenuItemChildren: function renderMenuItemChildren(option, props, idx) {
      return /*#__PURE__*/React__default['default'].createElement(Highlighter, {
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
        menuProps = _objectWithoutProperties(props, _excluded$1);

    var renderMenuItem = function renderMenuItem(option, position) {
      var label = getOptionLabel(option, labelKey);
      var menuItemProps = {
        disabled: getOptionProperty(option, 'disabled'),
        label: label,
        option: option,
        position: position
      };

      if (option.customOption) {
        return /*#__PURE__*/React__default['default'].createElement(MenuItem, _extends$2({}, menuItemProps, {
          className: "rbt-menu-custom-option",
          key: position,
          label: label
        }), newSelectionPrefix, /*#__PURE__*/React__default['default'].createElement(Highlighter, {
          search: text
        }, label));
      }

      if (option.paginationOption) {
        return /*#__PURE__*/React__default['default'].createElement(React.Fragment, {
          key: "pagination-item"
        }, /*#__PURE__*/React__default['default'].createElement(Menu.Divider, null), /*#__PURE__*/React__default['default'].createElement(MenuItem, _extends$2({}, menuItemProps, {
          className: "rbt-menu-pagination-option",
          label: paginationText
        }), paginationText));
      }

      return /*#__PURE__*/React__default['default'].createElement(MenuItem, _extends$2({}, menuItemProps, {
        key: position
      }), renderMenuItemChildren(option, props, position));
    };

    return (
      /*#__PURE__*/
      // Explictly pass `text` so Flow doesn't complain...
      React__default['default'].createElement(Menu, _extends$2({}, menuProps, {
        text: text
      }), options.map(renderMenuItem))
    );
  };

  TypeaheadMenu.propTypes = propTypes$1;
  TypeaheadMenu.defaultProps = defaultProps$1;

  var _excluded = ["children", "onRootClose"],
      _excluded2 = ["getInputProps"];
  var propTypes = {
    /**
     * Displays a button to clear the input when there are selections.
     */
    clearButton: PropTypes.bool,

    /**
     * Props to be applied directly to the input. `onBlur`, `onChange`,
     * `onFocus`, and `onKeyDown` are ignored.
     */
    inputProps: checkPropType(PropTypes.object, inputPropsType),

    /**
     * Bootstrap 4 only. Adds the `is-invalid` classname to the `form-control`.
     */
    isInvalid: PropTypes.bool,

    /**
     * Indicate whether an asynchronous data fetch is happening.
     */
    isLoading: PropTypes.bool,

    /**
     * Bootstrap 4 only. Adds the `is-valid` classname to the `form-control`.
     */
    isValid: PropTypes.bool,

    /**
     * Callback for custom input rendering.
     */
    renderInput: PropTypes.func,

    /**
     * Callback for custom menu rendering.
     */
    renderMenu: PropTypes.func,

    /**
     * Callback for custom menu rendering.
     */
    renderToken: PropTypes.func,

    /**
     * Specifies the size of the input.
     */
    size: sizeType
  };
  var defaultProps = {
    clearButton: false,
    inputProps: {},
    isInvalid: false,
    isLoading: false,
    isValid: false,
    renderMenu: function renderMenu(results, menuProps, props) {
      return /*#__PURE__*/React__default['default'].createElement(TypeaheadMenu, _extends$2({}, menuProps, {
        labelKey: props.labelKey,
        options: results,
        text: props.text
      }));
    },
    renderToken: function renderToken(option, props, idx) {
      return /*#__PURE__*/React__default['default'].createElement(Token$1, {
        disabled: props.disabled,
        key: idx,
        onRemove: props.onRemove,
        option: option,
        tabIndex: props.tabIndex
      }, getOptionLabel(option, props.labelKey));
    }
  };

  function getOverlayProps(props) {
    return pick(props, ['align', 'dropup', 'flip', 'positionFixed']);
  }

  var RootClose = function RootClose(_ref) {
    var children = _ref.children,
        onRootClose = _ref.onRootClose,
        props = _objectWithoutProperties(_ref, _excluded);

    var _useState = React.useState(null),
        _useState2 = _slicedToArray(_useState, 2),
        rootElement = _useState2[0],
        attachRef = _useState2[1];

    useRootClose(rootElement, onRootClose, props);
    return children(attachRef);
  };

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

      _defineProperty$1(_assertThisInitialized$1(_this), "_referenceElement", void 0);

      _defineProperty$1(_assertThisInitialized$1(_this), "referenceElementRef", function (referenceElement) {
        _this._referenceElement = referenceElement;
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "_renderInput", function (inputProps, props) {
        var _this$props = _this.props,
            isInvalid = _this$props.isInvalid,
            isValid = _this$props.isValid,
            multiple = _this$props.multiple,
            renderInput = _this$props.renderInput,
            renderToken = _this$props.renderToken,
            size = _this$props.size;

        if (isFunction$2(renderInput)) {
          return renderInput(inputProps, props);
        }

        var commonProps = _objectSpread2(_objectSpread2({}, inputProps), {}, {
          isInvalid: isInvalid,
          isValid: isValid,
          size: size
        });

        if (!multiple) {
          return /*#__PURE__*/React__default['default'].createElement(TypeaheadInputSingle, commonProps);
        }

        var labelKey = props.labelKey,
            onRemove = props.onRemove,
            selected = props.selected;
        return /*#__PURE__*/React__default['default'].createElement(TypeaheadInputMulti$1, _extends$2({}, commonProps, {
          selected: selected
        }), selected.map(function (option, idx) {
          return renderToken(option, _objectSpread2(_objectSpread2({}, commonProps), {}, {
            labelKey: labelKey,
            onRemove: onRemove
          }), idx);
        }));
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "_renderMenu", function (results, menuProps, props) {
        var _this$props2 = _this.props,
            emptyLabel = _this$props2.emptyLabel,
            id = _this$props2.id,
            maxHeight = _this$props2.maxHeight,
            newSelectionPrefix = _this$props2.newSelectionPrefix,
            paginationText = _this$props2.paginationText,
            renderMenu = _this$props2.renderMenu,
            renderMenuItemChildren = _this$props2.renderMenuItemChildren;
        return renderMenu(results, _objectSpread2(_objectSpread2({}, menuProps), {}, {
          emptyLabel: emptyLabel,
          id: id,
          maxHeight: maxHeight,
          newSelectionPrefix: newSelectionPrefix,
          paginationText: paginationText,
          renderMenuItemChildren: renderMenuItemChildren
        }), props);
      });

      _defineProperty$1(_assertThisInitialized$1(_this), "_renderAux", function (_ref2) {
        var onClear = _ref2.onClear,
            selected = _ref2.selected;
        var _this$props3 = _this.props,
            clearButton = _this$props3.clearButton,
            disabled = _this$props3.disabled,
            isLoading = _this$props3.isLoading,
            size = _this$props3.size;
        var content;

        if (isLoading) {
          content = /*#__PURE__*/React__default['default'].createElement(Loader, null);
        } else if (clearButton && !disabled && selected.length) {
          content = /*#__PURE__*/React__default['default'].createElement(ClearButton, {
            onClick: onClear,
            onFocus: function onFocus(e) {
              // Prevent the main input from auto-focusing again.
              e.stopPropagation();
            },
            onMouseDown: preventInputBlur,
            size: size
          });
        }

        return content ? /*#__PURE__*/React__default['default'].createElement("div", {
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
        return /*#__PURE__*/React__default['default'].createElement(Typeahead$1, _extends$2({}, this.props, {
          options: options,
          ref: instanceRef
        }), function (_ref3) {
          var getInputProps = _ref3.getInputProps,
              props = _objectWithoutProperties(_ref3, _excluded2);

          var hideMenu = props.hideMenu,
              isMenuShown = props.isMenuShown,
              results = props.results;

          var auxContent = _this2._renderAux(props);

          return /*#__PURE__*/React__default['default'].createElement(RootClose, {
            disabled: open || !isMenuShown,
            onRootClose: hideMenu
          }, function (ref) {
            return /*#__PURE__*/React__default['default'].createElement("div", {
              className: cx('rbt', {
                'has-aux': !!auxContent
              }, className),
              ref: ref,
              style: _objectSpread2(_objectSpread2({}, style), {}, {
                outline: 'none',
                position: 'relative'
              }),
              tabIndex: -1
            }, _this2._renderInput(_objectSpread2(_objectSpread2({}, getInputProps(_this2.props.inputProps)), {}, {
              referenceElementRef: _this2.referenceElementRef
            }), props), /*#__PURE__*/React__default['default'].createElement(Overlay, _extends$2({}, getOverlayProps(_this2.props), {
              isMenuShown: isMenuShown,
              referenceElement: _this2._referenceElement
            }), function (menuProps) {
              return _this2._renderMenu(results, menuProps, props);
            }), auxContent, isFunction$2(children) ? children(props) : children);
          });
        });
      }
    }]);

    return TypeaheadComponent;
  }(React__default['default'].Component);

  _defineProperty$1(TypeaheadComponent, "propTypes", propTypes);

  _defineProperty$1(TypeaheadComponent, "defaultProps", defaultProps);

  var Typeahead = /*#__PURE__*/React.forwardRef(function (props, ref) {
    return /*#__PURE__*/React__default['default'].createElement(TypeaheadComponent, _extends$2({}, props, {
      instanceRef: ref
    }));
  });

  var AsyncTypeahead = withAsync(Typeahead);

  exports.AsyncTypeahead = AsyncTypeahead;
  exports.ClearButton = ClearButton;
  exports.Highlighter = Highlighter;
  exports.Hint = Hint;
  exports.Input = Input;
  exports.Loader = Loader;
  exports.Menu = Menu;
  exports.MenuItem = MenuItem;
  exports.Token = Token$1;
  exports.Typeahead = Typeahead;
  exports.TypeaheadInputMulti = TypeaheadInputMulti$1;
  exports.TypeaheadInputSingle = TypeaheadInputSingle;
  exports.TypeaheadMenu = TypeaheadMenu;
  exports.asyncContainer = asyncContainer;
  exports.menuItemContainer = menuItemContainer;
  exports.tokenContainer = tokenContainer;
  exports.useAsync = useAsync;
  exports.useHint = useHint;
  exports.useItem = useItem;
  exports.useToken = useToken;
  exports.withAsync = withAsync;
  exports.withItem = withItem;
  exports.withToken = withToken;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
