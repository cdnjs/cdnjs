import { select } from 'd3-selection';
import { dispatch } from 'd3-dispatch';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

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

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

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
  return value != null && (type == 'object' || type == 'function');
}

var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var proxyTag = '[object Proxy]';
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag || tag == proxyTag;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

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
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$1 = objectProto$1.toString;

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
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString$1.call(value) == symbolTag;
}

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

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

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;
var nativeMin = Math.min;
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

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

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
    throw new TypeError(FUNC_ERROR_TEXT$1);
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

//---------------------------------------------------
// From underscore.string
//---------------------------------------------------
/* jshint ignore:start */

var nativeTrim = String.prototype.trim;

function escapeRegExp(str) {
  if (str == null) return '';
  return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
}

function defaultToWhiteSpace(characters) {
  if (characters == null) {
    return '\\s';
  } else if (characters.source) {
    return characters.source;
  }
  return '[' + escapeRegExp(characters) + ']';
}

function trim(str, characters) {
  if (str == null) return '';
  if (!characters && nativeTrim) return nativeTrim.call(str);
  var chars = defaultToWhiteSpace(characters);
  var pattern = new RegExp('^' + chars + '+|' + chars + '+$', 'g');
  return String(str).replace(pattern, '');
}

function kebabCase(str) {
  return trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
}

//---------------------------------------------------
// From http://youmightnotneedjquery.com/
//---------------------------------------------------

function deepExtend(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj) continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var value = obj[key];
        if (isObject(value) && !Array.isArray(value) && !isFunction(value)) {
          out[key] = deepExtend(out[key], value);
        } else out[key] = value;
      }
    }
  }

  return out;
}

function extend(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i]) continue;

    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
    }
  }

  return out;
}

//---------------------------------------------------
// From D3 v3
//---------------------------------------------------

// Method is assumed to be a standard D3 getter-setter:
// If passed with no arguments, gets the value.
// If passed with arguments, sets the value and returns the target.
function d3Rebind(target, source, method) {
  return function () {
    var value = method.apply(source, arguments);
    return value === source ? target : value;
  };
}

// Copies a variable number of methods from source to target.
function rebind(target, source) {
  var i = 1,
      n = arguments.length,
      method = void 0;
  while (++i < n) {
    target[method = arguments[i]] = d3Rebind(target, source, source[method]);
  }return target;
}

function functor(v) {
  return isFunction(v) ? v : function () {
    return v;
  };
}

var helper = Object.freeze({
  isObject: isObject,
  isFunction: isFunction,
  kebabCase: kebabCase,
  deepExtend: deepExtend,
  extend: extend,
  rebind: rebind,
  functor: functor,
  debounce: debounce,
  throttle: throttle
});

function isRequired(name) {
  throw new Error('Missing parameter ' + name);
}

function isDefined(x) {
  return x !== null && x !== undefined;
}

function isNotDefined(x) {
  return x === null || x === undefined;
}

function isElement(obj) {
  return !!(obj && obj.nodeType === 1);
}

function parseModifier(value) {
  // Return current value
  if (isNotDefined(value)) {
    return function (x, cx) {
      return Math.min(x, cx);
    };
  }
  // Return percent of container
  var str = ('' + value).trim().toLowerCase();
  if (str.indexOf('%') > -1) {
    var _ret = function () {
      var percent = +str.replace('%', '') / 100;
      return {
        v: function v(x, cx) {
          return cx * percent;
        }
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
  // Return fixed value
  return function () {
    return +str.replace('px', '');
  };
}

var Dimension = function () {
  function Dimension() {
    classCallCheck(this, Dimension);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 1) {
      var inputOrGetter = args[0];
      var input = isFunction(inputOrGetter) ? inputOrGetter() : inputOrGetter;

      if (input instanceof Dimension) {
        this.width = input.width;
        this.height = input.height;
      } else if (isElement(input)) {
        this.width = input.clientWidth;
        this.height = input.clientHeight;
      } else if (Array.isArray(input)) {
        this.width = input[0];
        this.height = input[1];
      } else if (isDefined(input) && isDefined(input.width) && isDefined(input.height)) {
        this.width = input.width;
        this.height = input.height;
      } else {
        var err = new Error('Unsupported input. Must be either\n  DOMNode, Array or Object with field width and height,\n  or a function that returns any of the above.');
        err.value = inputOrGetter;
        throw err;
      }
    } else {
      var width = args[0];
      var height = args[1];

      this.width = width;
      this.height = height;
    }
  }

  createClass(Dimension, [{
    key: 'isEqual',
    value: function isEqual(x) {
      if (x instanceof Dimension) {
        return this.width === x.width && this.height === x.height;
      }
      var dim2 = new Dimension(x);
      return this.width === dim2.width && this.height === dim2.height;
    }
  }, {
    key: 'toArray',
    value: function toArray() {
      return [this.width, this.height];
    }
  }, {
    key: 'toObject',
    value: function toObject() {
      return {
        width: this.width,
        height: this.height
      };
    }
  }]);
  return Dimension;
}();

var Fitter = function () {
  function Fitter() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    classCallCheck(this, Fitter);

    var _ref = options || {};

    var _ref$mode = _ref.mode;
    var mode = _ref$mode === undefined ? Fitter.MODE_BASIC : _ref$mode;
    var _ref$width = _ref.width;
    var width = _ref$width === undefined ? '100%' : _ref$width;
    var _ref$height = _ref.height;
    var height = _ref$height === undefined ? null : _ref$height;
    var _ref$ratio = _ref.ratio;
    var ratio = _ref$ratio === undefined ? 1 : _ref$ratio;
    var _ref$maxWidth = _ref.maxWidth;
    var maxWidth = _ref$maxWidth === undefined ? null : _ref$maxWidth;
    var _ref$maxHeight = _ref.maxHeight;
    var maxHeight = _ref$maxHeight === undefined ? null : _ref$maxHeight;


    if (mode === Fitter.MODE_ASPECT_RATIO) {
      this.wFn = parseModifier(maxWidth);
      this.hFn = parseModifier(maxHeight);
      this.options = {
        mode: mode,
        ratio: ratio,
        maxWidth: maxWidth,
        maxHeight: maxHeight
      };
    } else {
      this.wFn = parseModifier(width);
      this.hFn = parseModifier(height);
      this.options = {
        mode: mode,
        width: width,
        height: height
      };
    }
  }

  createClass(Fitter, [{
    key: 'fit',
    value: function fit() {
      var box = arguments.length <= 0 || arguments[0] === undefined ? isRequired('box') : arguments[0];
      var container = arguments.length <= 1 || arguments[1] === undefined ? isRequired('container') : arguments[1];

      var boxDim = new Dimension(box);
      var w = boxDim.width;
      var h = boxDim.height;
      var containerDim = new Dimension(container);
      var cw = containerDim.width;
      var ch = containerDim.height;

      var dim = void 0;
      if (this.options.mode === Fitter.MODE_ASPECT_RATIO) {
        var ratio = this.options.ratio;
        var maxW = this.wFn(cw, cw);
        var maxH = this.hFn(ch, ch);
        var newWFromHeight = Math.floor(ratio * maxH);
        if (newWFromHeight <= maxW) {
          dim = new Dimension(newWFromHeight, maxH);
        } else {
          dim = new Dimension(maxW, Math.floor(maxW / ratio));
        }
      } else {
        dim = new Dimension(this.wFn(w, cw), this.hFn(h, ch));
      }

      return {
        dimension: dim,
        changed: !dim.isEqual(boxDim)
      };
    }
  }]);
  return Fitter;
}();

Fitter.MODE_BASIC = 'basic';
Fitter.MODE_ASPECT_RATIO = 'aspectRatio';

var Watcher = function () {
  function Watcher() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    classCallCheck(this, Watcher);

    var _ref = options || {};

    var _ref$mode = _ref.mode;
    var mode = _ref$mode === undefined ? Watcher.MODE_WINDOW : _ref$mode;
    var _ref$target = _ref.target;
    var target = _ref$target === undefined ? null : _ref$target;
    var _ref$interval = _ref.interval;
    var interval = _ref$interval === undefined ? 200 : _ref$interval;


    if (mode === Watcher.MODE_POLLING && !target) {
      isRequired('options.target');
    }

    this.mode = mode;
    this.target = target;
    this.interval = interval;

    this.check = this.check.bind(this);
    this.throttledCheck = throttle(this.check, this.interval);
    this.isWatching = false;

    this.listeners = { change: [] };
  }

  createClass(Watcher, [{
    key: 'hasTargetChanged',
    value: function hasTargetChanged() {
      if (!this.target) {
        return true;
      }
      var newDim = new Dimension(this.target);
      if (!this.currentDim || !newDim.isEqual(this.currentDim)) {
        this.currentDim = newDim;
        return true;
      }
      return false;
    }
  }, {
    key: 'check',
    value: function check() {
      if (this.hasTargetChanged()) {
        this.dispatch('change', this.currentDim);
      }
      return this;
    }
  }, {
    key: 'dispatch',
    value: function dispatch(name) {
      var _this = this;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this.listeners[name].forEach(function (l) {
        return l.apply(_this, args);
      });
      return this;
    }
  }, {
    key: 'on',
    value: function on(name, listener) {
      if (this.listeners[name].indexOf(listener) === -1) {
        this.listeners[name].push(listener);
      }
      return this;
    }
  }, {
    key: 'off',
    value: function off(name, listener) {
      this.listeners[name] = this.listeners[name].filter(function (l) {
        return l !== listener;
      });
      return this;
    }
  }, {
    key: 'start',
    value: function start() {
      if (!this.isWatching) {
        if (this.target) {
          this.currentDim = new Dimension(this.target);
        }
        if (this.mode === Watcher.MODE_WINDOW) {
          window.addEventListener('resize', this.throttledCheck);
        } else if (this.mode === Watcher.MODE_POLLING) {
          this.intervalId = window.setInterval(this.check, this.interval);
        }
        this.isWatching = true;
      }
      return this;
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this.isWatching) {
        if (this.mode === Watcher.MODE_WINDOW) {
          window.removeEventListener('resize', this.throttledCheck);
        } else if (this.mode === Watcher.MODE_POLLING && this.intervalId) {
          window.clearInterval(this.intervalId);
          this.intervalId = null;
        }
        this.isWatching = false;
      }
      return this;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.stop();
      this.listeners.change = [];
      return this;
    }
  }]);
  return Watcher;
}();

Watcher.MODE_WINDOW = 'window';
Watcher.MODE_POLLING = 'polling';

var FitWatcher = function (_Watcher) {
  inherits(FitWatcher, _Watcher);

  function FitWatcher() {
    var box = arguments.length <= 0 || arguments[0] === undefined ? isRequired('box') : arguments[0];
    var container = arguments.length <= 1 || arguments[1] === undefined ? isRequired('container') : arguments[1];
    var fitterOptions = arguments[2];
    var watcherOptions = arguments[3];
    classCallCheck(this, FitWatcher);

    var _this = possibleConstructorReturn(this, Object.getPrototypeOf(FitWatcher).call(this, watcherOptions));

    var fitter = new Fitter(fitterOptions);
    _this.fit = function () {
      return fitter.fit(box, container);
    };
    return _this;
  }

  createClass(FitWatcher, [{
    key: 'check',
    value: function check() {
      if (this.hasTargetChanged()) {
        var _fit = this.fit();

        var changed = _fit.changed;
        var dimension = _fit.dimension;

        if (changed) {
          this.dispatch('change', dimension);
        }
      }
      return this;
    }
  }]);
  return FitWatcher;
}(Watcher);

var AbstractChart = function () {
  createClass(AbstractChart, null, [{
    key: 'getDefaultOptions',
    value: function getDefaultOptions() {
      for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      return deepExtend.apply(undefined, [{
        initialWidth: 720,
        initialHeight: 500,
        margin: {
          top: 30,
          right: 30,
          bottom: 30,
          left: 30
        },
        offset: [0.5, 0.5]
      }].concat(options));
    }
  }, {
    key: 'getCustomEventNames',
    value: function getCustomEventNames() {
      return [];
    }
  }]);

  function AbstractChart(selector) {
    classCallCheck(this, AbstractChart);

    for (var _len2 = arguments.length, options = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      options[_key2 - 1] = arguments[_key2];
    }

    var mergedOptions = deepExtend.apply(undefined, [this.constructor.getDefaultOptions()].concat(options));

    this._state = {
      width: mergedOptions.initialWidth,
      height: mergedOptions.initialHeight,
      innerWidth: 0,
      innerHeight: 0,
      fitOptions: null,
      options: mergedOptions,
      data: null
    };

    this.container = select(selector);
    // Enforce line-height = 0 to fix issue with height resizing
    // https://github.com/twitter/d3kit/issues/13
    this.container.style('line-height', 0);

    var customEvents = this.constructor.getCustomEventNames();
    this.setupDispatcher(customEvents);

    this._dispatchData = debounce(this._dispatchData.bind(this), 1);
    this._dispatchOptions = debounce(this._dispatchOptions.bind(this), 1);
    this._dispatchResize = debounce(this._dispatchResize.bind(this), 1);
    this._updateDimension = debounce(this._updateDimension.bind(this), 1);
  }

  createClass(AbstractChart, [{
    key: 'setupDispatcher',
    value: function setupDispatcher() {
      var customEventNames = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      this._customEventNames = customEventNames;
      this._eventNames = AbstractChart.DEFAULT_EVENTS.concat(customEventNames);
      this.dispatcher = dispatch.apply(this, this._eventNames);
    }
  }, {
    key: 'getCustomEventNames',
    value: function getCustomEventNames() {
      return this._customEventNames;
    }
  }, {
    key: 'getInnerWidth',
    value: function getInnerWidth() {
      return this._state.innerWidth;
    }
  }, {
    key: 'getInnerHeight',
    value: function getInnerHeight() {
      return this._state.innerHeight;
    }
  }, {
    key: 'width',
    value: function width() {
      if (arguments.length === 0) return this._state.width;
      var newValue = Math.floor(+(arguments.length <= 0 ? undefined : arguments[0]));
      if (newValue !== this._state.width) {
        this._state.width = newValue;
        this._updateDimension();
        this._dispatchResize();
      }
      return this;
    }
  }, {
    key: 'height',
    value: function height() {
      if (arguments.length === 0) return this._state.height;
      var newValue = Math.floor(+(arguments.length <= 0 ? undefined : arguments[0]));
      if (newValue !== this._state.height) {
        this._state.height = newValue;
        this._updateDimension();
        this._dispatchResize();
      }
      return this;
    }
  }, {
    key: 'dimension',
    value: function dimension() {
      if (arguments.length === 0) {
        return [this._state.width, this._state.height];
      }

      var _ref = arguments.length <= 0 ? undefined : arguments[0];

      var _ref2 = slicedToArray(_ref, 2);

      var w = _ref2[0];
      var h = _ref2[1];

      this.width(w).height(h);
      return this;
    }
  }, {
    key: 'data',
    value: function data() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      if (args.length === 0) return this._state.data;
      var newData = args[0];

      this._state.data = newData;
      this._dispatchData();
      return this;
    }
  }, {
    key: 'margin',
    value: function margin() {
      if (arguments.length === 0) return this._state.options.margin;
      var oldMargin = this._state.options.margin;
      var newMargin = extend({}, this._state.options.margin, arguments.length <= 0 ? undefined : arguments[0]);
      var changed = Object.keys(oldMargin).some(function (field) {
        return oldMargin[field] !== newMargin[field];
      });
      if (changed) {
        this._state.options.margin = newMargin;
        this._updateDimension();
        this._dispatchResize();
      }
      return this;
    }
  }, {
    key: 'offset',
    value: function offset() {
      if (arguments.length === 0) return this._state.options.offset;
      var newOffset = arguments.length <= 0 ? undefined : arguments[0];

      var _state$options$offset = slicedToArray(this._state.options.offset, 2);

      var ox = _state$options$offset[0];
      var oy = _state$options$offset[1];

      var _newOffset = slicedToArray(newOffset, 2);

      var nx = _newOffset[0];
      var ny = _newOffset[1];

      if (ox !== nx || oy !== ny) {
        this._state.options.offset = newOffset;
        this._updateDimension();
        this._dispatchResize();
      }
      return this;
    }
  }, {
    key: 'options',
    value: function options() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      if (args.length === 0) return this._state.options;
      var newOptions = args[0];

      if (newOptions.margin) {
        this.margin(newOptions.margin);
      }
      if (newOptions.offset) {
        this.offset(newOptions.offset);
      }
      this._state.options = deepExtend(this._state.options, newOptions);
      this._dispatchOptions();
      return this;
    }
  }, {
    key: '_updateDimension',
    value: function _updateDimension() {
      var _state = this._state;
      var width = _state.width;
      var height = _state.height;
      var margin = this._state.options.margin;
      var top = margin.top;
      var right = margin.right;
      var bottom = margin.bottom;
      var left = margin.left;


      this._state.innerWidth = width - left - right;
      this._state.innerHeight = height - top - bottom;

      return this;
    }
  }, {
    key: 'updateDimensionNow',
    value: function updateDimensionNow() {
      this._updateDimension();
      this._updateDimension.flush();
      return this;
    }
  }, {
    key: 'hasData',
    value: function hasData() {
      var data = this._state.data;

      return data !== null && data !== undefined;
    }
  }, {
    key: 'hasNonZeroArea',
    value: function hasNonZeroArea() {
      var _state2 = this._state;
      var innerWidth = _state2.innerWidth;
      var innerHeight = _state2.innerHeight;

      return innerWidth > 0 && innerHeight > 0;
    }
  }, {
    key: 'fit',
    value: function fit(fitOptions) {
      var _this = this;

      var watchOptions = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      if (fitOptions) {
        this._state.fitOptions = fitOptions;
      }

      // Fit once
      var fitter = new Fitter(this._state.fitOptions);

      var _fitter$fit = fitter.fit(this.dimension(), this.container.node());

      var changed = _fitter$fit.changed;
      var dimension = _fitter$fit.dimension;


      if (changed) {
        this.dimension([dimension.width, dimension.height]);
      }

      // Setup watcher
      var enable = !!watchOptions;
      if (enable) {
        if (this.fitWatcher) {
          this.fitWatcher.destroy();
        }
        this.fitWatcher = new FitWatcher(
        // pass getter instead of value
        // because the value may change when time the watcher checks
        function () {
          return _this.dimension();
        }, this.container.node(), this._state.fitOptions, isObject(watchOptions) ? watchOptions : null).on('change', function (dim) {
          return _this.dimension([dim.width, dim.height]);
        }).start();
      }

      return this;
    }
  }, {
    key: 'stopFitWatcher',
    value: function stopFitWatcher() {
      if (this.fitWatcher) {
        this.fitWatcher.destroy();
        this.fitWatcher = null;
      }
      return this;
    }
  }, {
    key: '_dispatchData',
    value: function _dispatchData() {
      this.dispatcher.call('data', this, this._state.data);
      return this;
    }
  }, {
    key: '_dispatchOptions',
    value: function _dispatchOptions() {
      this.dispatcher.call('options', this, this._state.options);
      return this;
    }
  }, {
    key: '_dispatchResize',
    value: function _dispatchResize() {
      var _state3 = this._state;
      var width = _state3.width;
      var height = _state3.height;
      var innerWidth = _state3.innerWidth;
      var innerHeight = _state3.innerHeight;

      this.dispatcher.apply('resize', this, [width, height, innerWidth, innerHeight]);
      return this;
    }
  }, {
    key: 'on',
    value: function on(name, listener) {
      this.dispatcher.on(name, listener);
      return this;
    }
  }, {
    key: 'off',
    value: function off(name) {
      this.dispatcher.on(name, null);
      return this;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this2 = this;

      this._eventNames.forEach(function (name) {
        _this2.off(name);
      });
      this.stopFitWatcher();
    }
  }]);
  return AbstractChart;
}();

AbstractChart.DEFAULT_EVENTS = ['data', 'options', 'resize'];

var CanvasChart = function (_AbstractChart) {
  inherits(CanvasChart, _AbstractChart);
  createClass(CanvasChart, null, [{
    key: 'getDefaultOptions',
    value: function getDefaultOptions() {
      return deepExtend(get(Object.getPrototypeOf(CanvasChart), 'getDefaultOptions', this).call(this), {
        pixelRatio: window.devicePixelRatio
      });
    }
  }]);

  function CanvasChart(selector) {
    var _Object$getPrototypeO;

    classCallCheck(this, CanvasChart);

    for (var _len = arguments.length, options = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      options[_key - 1] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(CanvasChart)).call.apply(_Object$getPrototypeO, [this, selector].concat(options)));

    _this.canvas = _this.container.append('canvas');
    _this.updateDimensionNow();
    return _this;
  }

  createClass(CanvasChart, [{
    key: 'getContext2d',
    value: function getContext2d() {
      var _options = this.options();

      var pixelRatio = _options.pixelRatio;
      var margin = _options.margin;
      var offset = _options.offset;

      var _offset = slicedToArray(offset, 2);

      var x = _offset[0];
      var y = _offset[1];

      var ctx = this.canvas.node().getContext('2d');
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(pixelRatio, pixelRatio);
      ctx.translate(margin.left + x, margin.top + y);
      return ctx;
    }
  }, {
    key: 'clear',
    value: function clear() {
      var _options2 = this.options();

      var pixelRatio = _options2.pixelRatio;

      var ctx = this.canvas.node().getContext('2d');
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(pixelRatio, pixelRatio);
      ctx.clearRect(0, 0, this.width(), this.height());
      return this;
    }
  }, {
    key: '_updateDimension',
    value: function _updateDimension() {
      get(Object.getPrototypeOf(CanvasChart.prototype), '_updateDimension', this).call(this);

      var _state = this._state;
      var width = _state.width;
      var height = _state.height;
      var pixelRatio = this._state.options.pixelRatio;


      this.canvas.style('width', width + 'px').style('height', height + 'px').attr('width', width * pixelRatio).attr('height', height * pixelRatio);

      return this;
    }
  }]);
  return CanvasChart;
}(AbstractChart);

// EXAMPLE USAGE:
//
// var layers = new d3LayerOrganizer(vis);
// layers.create([
//   {'axis': ['bar', 'mark']},
//   'glass',
//   'label'
// ]);
//
// Then access the layers via
// layers.get('axis'),
// layers.get('axis/bar'),
// layers.get('axis/mark'),
// layers.get('glass'),
// layers.get('label')

function LayerOrganizer (mainContainer) {
  var defaultTag = arguments.length <= 1 || arguments[1] === undefined ? 'g' : arguments[1];

  var layers = {};

  function createLayerFromName(container, layerName) {
    var prefix = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

    var chunks = layerName.split('.');
    var name = void 0;
    var tag = void 0;
    if (chunks.length > 1) {
      tag = chunks[0].length > 0 ? chunks[0] : defaultTag;
      name = chunks[1];
    } else {
      tag = defaultTag;
      name = chunks[0];
    }

    var id = '' + prefix + name;
    if (layers.hasOwnProperty(id)) {
      throw new Error('invalid or duplicate layer id: ' + id);
    }
    var className = kebabCase(name) + '-layer';
    var layer = container.append(tag).classed(className, true);

    layers[id] = layer;
    return layer;
  }

  function createLayerFromConfig(container, config) {
    var prefix = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

    if (Array.isArray(config)) {
      return config.map(function (info) {
        return createLayerFromConfig(container, info, prefix);
      });
    } else if (isObject(config)) {
      var _Object$keys = Object.keys(config);

      var _Object$keys2 = slicedToArray(_Object$keys, 1);

      var parentKey = _Object$keys2[0];

      var parentLayer = createLayerFromName(container, parentKey, prefix);
      createLayerFromConfig(parentLayer, config[parentKey], '' + prefix + parentKey + '/');
      return parentLayer;
    }

    return createLayerFromName(container, config, prefix);
  }

  function createLayer(config) {
    return createLayerFromConfig(mainContainer, config);
  }

  function create(layerNames) {
    return Array.isArray(layerNames) ? layerNames.map(createLayer) : createLayer(layerNames);
  }

  function get(layerName) {
    return layers[layerName];
  }

  function has(layerName) {
    return !!layers[layerName];
  }

  return {
    create: create,
    get: get,
    has: has
  };
}

var SvgChart = function (_AbstractChart) {
  inherits(SvgChart, _AbstractChart);

  function SvgChart(selector) {
    var _Object$getPrototypeO;

    classCallCheck(this, SvgChart);

    for (var _len = arguments.length, options = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      options[_key - 1] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SvgChart)).call.apply(_Object$getPrototypeO, [this, selector].concat(options)));

    _this.svg = _this.container.append('svg');
    _this.rootG = _this.svg.append('g');
    _this.layers = new LayerOrganizer(_this.rootG);
    _this.updateDimensionNow();
    return _this;
  }

  createClass(SvgChart, [{
    key: '_updateDimension',
    value: function _updateDimension() {
      get(Object.getPrototypeOf(SvgChart.prototype), '_updateDimension', this).call(this);

      var _state = this._state;
      var width = _state.width;
      var height = _state.height;
      var _state$options = this._state.options;
      var offset = _state$options.offset;
      var margin = _state$options.margin;
      var top = margin.top;
      var left = margin.left;

      var _offset = slicedToArray(offset, 2);

      var x = _offset[0];
      var y = _offset[1];


      this.svg.attr('width', width).attr('height', height);

      this.rootG.attr('transform', 'translate(' + (left + x) + ',' + (top + y) + ')');

      return this;
    }
  }]);
  return SvgChart;
}(AbstractChart);

export { helper, AbstractChart, CanvasChart, SvgChart, LayerOrganizer };