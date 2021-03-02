/**
 * simplebar - v6.0.0-beta.10
 * Scrollbars, simpler.
 * https://grsmto.github.io/simplebar/
 *
 * Made by Adrien Denat from a fork by Jonathan Nicol
 * Under MIT License
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.SimpleBar = factory());
}(this, (function () { 'use strict';

  var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  var canUseDom = canUseDOM;

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

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  /** Detect free variable `self`. */

  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
  /** Used as a reference to the global object. */

  var root = freeGlobal || freeSelf || Function('return this')();

  /** Built-in value references. */

  var Symbol = root.Symbol;

  /** Used for built-in method references. */

  var objectProto = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty = objectProto.hasOwnProperty;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var nativeObjectToString = objectProto.toString;
  /** Built-in value references. */

  var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */

  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);

    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }

    return result;
  }

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var nativeObjectToString$1 = objectProto$1.toString;
  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */

  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  /** `Object#toString` result references. */

  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';
  /** Built-in value references. */

  var symToStringTag$1 = Symbol ? Symbol.toStringTag : undefined;
  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */

  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }

    return symToStringTag$1 && symToStringTag$1 in Object(value) ? getRawTag(value) : objectToString(value);
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
    return value != null && typeof value == 'object';
  }

  /** `Object#toString` result references. */

  var symbolTag = '[object Symbol]';
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
    return typeof value == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
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
    return value != null && (type == 'object' || type == 'function');
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

  var now = function () {
    return root.Date.now();
  };

  /** Error message constants. */

  var FUNC_ERROR_TEXT = 'Expected a function';
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeMax = Math.max,
      nativeMin = Math.min;
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
      lastInvokeTime = time; // Start the timer for the trailing edge.

      timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          timeWaiting = wait - timeSinceLastCall;
      return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.

      return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }

    function timerExpired() {
      var time = now();

      if (shouldInvoke(time)) {
        return trailingEdge(time);
      } // Restart the timer.


      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
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
          clearTimeout(timerId);
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

  var cachedScrollbarWidth = null;
  var cachedDevicePixelRatio = null;

  if (canUseDom) {
    window.addEventListener('resize', function () {
      if (cachedDevicePixelRatio !== window.devicePixelRatio) {
        cachedDevicePixelRatio = window.devicePixelRatio;
        cachedScrollbarWidth = null;
      }
    });
  }

  function scrollbarWidth() {
    if (cachedScrollbarWidth === null) {
      if (typeof document === 'undefined') {
        cachedScrollbarWidth = 0;
        return cachedScrollbarWidth;
      }

      var body = document.body;
      var box = document.createElement('div');
      box.classList.add('simplebar-hide-scrollbar');
      body.appendChild(box);
      var width = box.getBoundingClientRect().right;
      body.removeChild(box);
      cachedScrollbarWidth = width;
    }

    return cachedScrollbarWidth;
  }

  function getElementWindow(element) {
    if (!element || !element.ownerDocument || !element.ownerDocument.defaultView) {
      return window;
    }

    return element.ownerDocument.defaultView;
  }

  function getElementDocument(element) {
    if (!element || !element.ownerDocument) {
      return document;
    }

    return element.ownerDocument;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
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

  var SimpleBar = /*#__PURE__*/function () {
    function SimpleBar(element) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, SimpleBar);

      this.onScroll = function () {
        var elWindow = getElementWindow(_this.el);

        if (!_this.scrollXTicking) {
          elWindow.requestAnimationFrame(_this.scrollX);
          _this.scrollXTicking = true;
        }

        if (!_this.scrollYTicking) {
          elWindow.requestAnimationFrame(_this.scrollY);
          _this.scrollYTicking = true;
        }

        if (!_this.isScrolling) {
          _this.isScrolling = true;

          _this.el.classList.add(_this.classNames.scrolling);
        }

        _this.onStopScrolling();
      };

      this.scrollX = function () {
        if (_this.axis.x.isOverflowing) {
          _this.positionScrollbar('x');
        }

        _this.scrollXTicking = false;
      };

      this.scrollY = function () {
        if (_this.axis.y.isOverflowing) {
          _this.positionScrollbar('y');
        }

        _this.scrollYTicking = false;
      };

      this.onStopScrolling = function () {
        _this.el.classList.remove(_this.classNames.scrolling);

        _this.isScrolling = false;
      };

      this.onMouseEnter = function () {
        if (!_this.isMouseEntering) {
          _this.el.classList.add(_this.classNames.mouseEntered);

          _this.isMouseEntering = true;
        }

        _this.onMouseEntered();
      };

      this.onMouseEntered = function () {
        _this.el.classList.remove(_this.classNames.mouseEntered);

        _this.isMouseEntering = false;
      };

      this.onMouseMove = function (e) {
        _this.mouseX = e.clientX;
        _this.mouseY = e.clientY;

        if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
          _this.onMouseMoveForAxis('x');
        }

        if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
          _this.onMouseMoveForAxis('y');
        }
      };

      this.onMouseLeave = function () {
        _this.onMouseMove.cancel();

        if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
          _this.onMouseLeaveForAxis('x');
        }

        if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
          _this.onMouseLeaveForAxis('y');
        }

        _this.mouseX = -1;
        _this.mouseY = -1;
      };

      this.onWindowResize = function () {
        // Recalculate scrollbarWidth in case it's a zoom
        _this.scrollbarWidth = SimpleBar.getScrollbarWidth();

        _this.hideNativeScrollbar();
      };

      this.onPointerEvent = function (e) {
        var isWithinTrackXBounds, isWithinTrackYBounds;
        _this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect();
        _this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect();

        if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
          isWithinTrackXBounds = _this.isWithinBounds(_this.axis.x.track.rect);
        }

        if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
          isWithinTrackYBounds = _this.isWithinBounds(_this.axis.y.track.rect);
        } // If any pointer event is called on the scrollbar


        if (isWithinTrackXBounds || isWithinTrackYBounds) {
          // Prevent event leaking
          e.stopPropagation();

          if (e.type === 'pointerdown' && e.pointerType !== 'touch') {
            if (isWithinTrackXBounds) {
              _this.axis.x.scrollbar.rect = _this.axis.x.scrollbar.el.getBoundingClientRect();

              if (_this.isWithinBounds(_this.axis.x.scrollbar.rect)) {
                _this.onDragStart(e, 'x');
              } else {
                _this.onTrackClick(e, 'x');
              }
            }

            if (isWithinTrackYBounds) {
              _this.axis.y.scrollbar.rect = _this.axis.y.scrollbar.el.getBoundingClientRect();

              if (_this.isWithinBounds(_this.axis.y.scrollbar.rect)) {
                _this.onDragStart(e, 'y');
              } else {
                _this.onTrackClick(e, 'y');
              }
            }
          }
        }
      };

      this.drag = function (e) {
        var eventOffset;
        var track = _this.axis[_this.draggedAxis].track;
        var trackSize = track.rect[_this.axis[_this.draggedAxis].sizeAttr];
        var scrollbar = _this.axis[_this.draggedAxis].scrollbar;
        var contentSize = _this.contentWrapperEl[_this.axis[_this.draggedAxis].scrollSizeAttr];
        var hostSize = parseInt(_this.elStyles[_this.axis[_this.draggedAxis].sizeAttr], 10);
        e.preventDefault();
        e.stopPropagation();

        if (_this.draggedAxis === 'y') {
          eventOffset = e.pageY;
        } else {
          eventOffset = e.pageX;
        } // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).


        var dragPos = eventOffset - track.rect[_this.axis[_this.draggedAxis].offsetAttr] - _this.axis[_this.draggedAxis].dragOffset; // Convert the mouse position into a percentage of the scrollbar height/width.

        var dragPerc = dragPos / (trackSize - scrollbar.size); // Scroll the content by the same percentage.

        var scrollPos = dragPerc * (contentSize - hostSize); // Fix browsers inconsistency on RTL

        if (_this.draggedAxis === 'x') {
          scrollPos = _this.isRtl && SimpleBar.getRtlHelpers().isScrollOriginAtZero ? scrollPos - (trackSize + scrollbar.size) : scrollPos;
        }

        _this.contentWrapperEl[_this.axis[_this.draggedAxis].scrollOffsetAttr] = scrollPos;
      };

      this.onEndDrag = function (e) {
        var elDocument = getElementDocument(_this.el);
        var elWindow = getElementWindow(_this.el);
        e.preventDefault();
        e.stopPropagation();

        _this.el.classList.remove(_this.classNames.dragging);

        elDocument.removeEventListener('mousemove', _this.drag, true);
        elDocument.removeEventListener('mouseup', _this.onEndDrag, true);
        _this.removePreventClickId = elWindow.setTimeout(function () {
          // Remove these asynchronously so we still suppress click events
          // generated simultaneously with mouseup.
          elDocument.removeEventListener('click', _this.preventClick, true);
          elDocument.removeEventListener('dblclick', _this.preventClick, true);
          _this.removePreventClickId = null;
        });
      };

      this.preventClick = function (e) {
        e.preventDefault();
        e.stopPropagation();
      };

      this.el = element;
      this.minScrollbarWidth = 20;
      this.stopScrollDelay = 175;
      this.options = _objectSpread(_objectSpread({}, SimpleBar.defaultOptions), options);
      this.classNames = _objectSpread({
        contentEl: 'simplebar-content',
        contentWrapper: 'simplebar-content-wrapper',
        offset: 'simplebar-offset',
        mask: 'simplebar-mask',
        wrapper: 'simplebar-wrapper',
        placeholder: 'simplebar-placeholder',
        scrollbar: 'simplebar-scrollbar',
        track: 'simplebar-track',
        heightAutoObserverWrapperEl: 'simplebar-height-auto-observer-wrapper',
        heightAutoObserverEl: 'simplebar-height-auto-observer',
        visible: 'simplebar-visible',
        horizontal: 'simplebar-horizontal',
        vertical: 'simplebar-vertical',
        hover: 'simplebar-hover',
        dragging: 'simplebar-dragging',
        scrolling: 'simplebar-scrolling',
        scrollable: 'simplebar-scrollable',
        mouseEntered: 'simplebar-mouse-entered'
      }, this.options.classNames);
      this.axis = {
        x: {
          scrollOffsetAttr: 'scrollLeft',
          sizeAttr: 'width',
          scrollSizeAttr: 'scrollWidth',
          offsetSizeAttr: 'offsetWidth',
          offsetAttr: 'left',
          overflowAttr: 'overflowX',
          dragOffset: 0,
          isOverflowing: true,
          isVisible: false,
          forceVisible: false,
          track: {},
          scrollbar: {}
        },
        y: {
          scrollOffsetAttr: 'scrollTop',
          sizeAttr: 'height',
          scrollSizeAttr: 'scrollHeight',
          offsetSizeAttr: 'offsetHeight',
          offsetAttr: 'top',
          overflowAttr: 'overflowY',
          dragOffset: 0,
          isOverflowing: true,
          isVisible: false,
          forceVisible: false,
          track: {},
          scrollbar: {}
        }
      };
      this.removePreventClickId = null;
      this.isScrolling = false;
      this.isMouseEntering = false; // Don't re-instantiate over an existing one

      if (SimpleBar.instances.has(this.el)) {
        return;
      }

      if (options.classNames) {
        console.warn('simplebar: classNames option is deprecated. Please override the styles with CSS instead.');
      }

      if (options.autoHide) {
        console.warn("simplebar: autoHide option is deprecated. Please use CSS instead: '.simplebar-scrollbar::before { opacity: 0.5 };' for autoHide: false");
      }

      this.onMouseMove = throttle(this.onMouseMove, 64);
      this.onWindowResize = debounce(this.onWindowResize, 64, {
        leading: true
      });
      this.onStopScrolling = debounce(this.onStopScrolling, this.stopScrollDelay);
      this.onMouseEntered = debounce(this.onMouseEntered, this.stopScrollDelay);
      this.init();
    }
    /**
     * Static properties
     */

    /**
     * Helper to fix browsers inconsistency on RTL:
     *  - Firefox inverts the scrollbar initial position
     *  - IE11 inverts both scrollbar position and scrolling offset
     * Directly inspired by @KingSora's OverlayScrollbars https://github.com/KingSora/OverlayScrollbars/blob/master/js/OverlayScrollbars.js#L1634
     */


    _createClass(SimpleBar, [{
      key: "init",
      value: function init() {
        // Save a reference to the instance, so we know this DOM node has already been instancied
        SimpleBar.instances.set(this.el, this); // We stop here on server-side

        if (canUseDom) {
          this.initDOM();
          this.rtlHelpers = SimpleBar.getRtlHelpers();
          this.scrollbarWidth = SimpleBar.getScrollbarWidth();
          this.recalculate();
          this.initListeners();
        }
      }
    }, {
      key: "initDOM",
      value: function initDOM() {
        var _this2 = this; // make sure this element doesn't have the elements yet


        if (Array.prototype.filter.call(this.el.children, function (child) {
          return child.classList.contains(_this2.classNames.wrapper);
        }).length) {
          // assume that element has his DOM already initiated
          this.wrapperEl = this.el.querySelector(".".concat(this.classNames.wrapper));
          this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector(".".concat(this.classNames.contentWrapper));
          this.contentEl = this.options.contentNode || this.el.querySelector(".".concat(this.classNames.contentEl));
          this.offsetEl = this.el.querySelector(".".concat(this.classNames.offset));
          this.maskEl = this.el.querySelector(".".concat(this.classNames.mask));
          this.placeholderEl = this.findChild(this.wrapperEl, ".".concat(this.classNames.placeholder));
          this.heightAutoObserverWrapperEl = this.el.querySelector(".".concat(this.classNames.heightAutoObserverWrapperEl));
          this.heightAutoObserverEl = this.el.querySelector(".".concat(this.classNames.heightAutoObserverEl));
          this.axis.x.track.el = this.findChild(this.el, ".".concat(this.classNames.track, ".").concat(this.classNames.horizontal));
          this.axis.y.track.el = this.findChild(this.el, ".".concat(this.classNames.track, ".").concat(this.classNames.vertical));
        } else {
          // Prepare DOM
          this.wrapperEl = document.createElement('div');
          this.contentWrapperEl = document.createElement('div');
          this.offsetEl = document.createElement('div');
          this.maskEl = document.createElement('div');
          this.contentEl = document.createElement('div');
          this.placeholderEl = document.createElement('div');
          this.heightAutoObserverWrapperEl = document.createElement('div');
          this.heightAutoObserverEl = document.createElement('div');
          this.wrapperEl.classList.add(this.classNames.wrapper);
          this.contentWrapperEl.classList.add(this.classNames.contentWrapper);
          this.offsetEl.classList.add(this.classNames.offset);
          this.maskEl.classList.add(this.classNames.mask);
          this.contentEl.classList.add(this.classNames.contentEl);
          this.placeholderEl.classList.add(this.classNames.placeholder);
          this.heightAutoObserverWrapperEl.classList.add(this.classNames.heightAutoObserverWrapperEl);
          this.heightAutoObserverEl.classList.add(this.classNames.heightAutoObserverEl);

          while (this.el.firstChild) {
            this.contentEl.appendChild(this.el.firstChild);
          }

          this.contentWrapperEl.appendChild(this.contentEl);
          this.offsetEl.appendChild(this.contentWrapperEl);
          this.maskEl.appendChild(this.offsetEl);
          this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl);
          this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);
          this.wrapperEl.appendChild(this.maskEl);
          this.wrapperEl.appendChild(this.placeholderEl);
          this.el.appendChild(this.wrapperEl);
        }

        if (!this.axis.x.track.el || !this.axis.y.track.el) {
          var track = document.createElement('div');
          var scrollbar = document.createElement('div');
          track.classList.add(this.classNames.track);
          scrollbar.classList.add(this.classNames.scrollbar);
          track.appendChild(scrollbar);
          this.axis.x.track.el = track.cloneNode(true);
          this.axis.x.track.el.classList.add(this.classNames.horizontal);
          this.axis.y.track.el = track.cloneNode(true);
          this.axis.y.track.el.classList.add(this.classNames.vertical);
          this.el.appendChild(this.axis.x.track.el);
          this.el.appendChild(this.axis.y.track.el);
        }

        this.axis.x.scrollbar.el = this.axis.x.track.el.querySelector(".".concat(this.classNames.scrollbar));
        this.axis.y.scrollbar.el = this.axis.y.track.el.querySelector(".".concat(this.classNames.scrollbar));

        if (!this.options.autoHide) {
          this.axis.x.scrollbar.el.classList.add(this.classNames.visible);
          this.axis.y.scrollbar.el.classList.add(this.classNames.visible);
        }

        this.el.setAttribute('data-simplebar', 'init');
      }
    }, {
      key: "initListeners",
      value: function initListeners() {
        var _this3 = this;

        var elWindow = getElementWindow(this.el); // Event listeners

        this.el.addEventListener('mouseenter', this.onMouseEnter);
        this.el.addEventListener('pointerdown', this.onPointerEvent, true);
        this.el.addEventListener('mousemove', this.onMouseMove);
        this.el.addEventListener('mouseleave', this.onMouseLeave);
        this.contentWrapperEl.addEventListener('scroll', this.onScroll); // Browser zoom triggers a window resize

        elWindow.addEventListener('resize', this.onWindowResize);

        if (window.ResizeObserver) {
          // Hack for https://github.com/WICG/ResizeObserver/issues/38
          var resizeObserverStarted = false;
          var resizeObserver = elWindow.ResizeObserver || ResizeObserver;
          this.resizeObserver = new resizeObserver(function () {
            if (!resizeObserverStarted) return;
            elWindow.requestAnimationFrame(function () {
              _this3.recalculate();
            });
          });
          this.resizeObserver.observe(this.el);
          this.resizeObserver.observe(this.contentEl);
          elWindow.requestAnimationFrame(function () {
            resizeObserverStarted = true;
          });
        } // This is required to detect horizontal scroll. Vertical scroll only needs the resizeObserver.


        this.mutationObserver = new elWindow.MutationObserver(function () {
          elWindow.requestAnimationFrame(function () {
            _this3.recalculate();
          });
        });
        this.mutationObserver.observe(this.contentEl, {
          childList: true,
          subtree: true,
          characterData: true
        });
      }
    }, {
      key: "recalculate",
      value: function recalculate() {
        var elWindow = getElementWindow(this.el);
        this.elStyles = elWindow.getComputedStyle(this.el);
        this.isRtl = this.elStyles.direction === 'rtl';
        var contentElOffsetWidth = this.contentEl.offsetWidth;
        var isHeightAuto = this.heightAutoObserverEl.offsetHeight <= 1;
        var isWidthAuto = this.heightAutoObserverEl.offsetWidth <= 1 || contentElOffsetWidth > 0;
        var contentWrapperElOffsetWidth = this.contentWrapperEl.offsetWidth;
        var elOverflowX = this.elStyles.overflowX;
        var elOverflowY = this.elStyles.overflowY;
        this.contentEl.style.padding = "".concat(this.elStyles.paddingTop, " ").concat(this.elStyles.paddingRight, " ").concat(this.elStyles.paddingBottom, " ").concat(this.elStyles.paddingLeft);
        this.wrapperEl.style.margin = "-".concat(this.elStyles.paddingTop, " -").concat(this.elStyles.paddingRight, " -").concat(this.elStyles.paddingBottom, " -").concat(this.elStyles.paddingLeft);
        var contentElScrollHeight = this.contentEl.scrollHeight;
        var contentElScrollWidth = this.contentEl.scrollWidth;
        this.contentWrapperEl.style.height = isHeightAuto ? 'auto' : '100%'; // Determine placeholder size

        this.placeholderEl.style.width = isWidthAuto ? "".concat(contentElOffsetWidth || contentElScrollWidth, "px") : 'auto';
        this.placeholderEl.style.height = "".concat(contentElScrollHeight, "px");
        var contentWrapperElOffsetHeight = this.contentWrapperEl.offsetHeight;
        this.axis.x.isOverflowing = contentElOffsetWidth !== 0 && contentElScrollWidth > contentElOffsetWidth;
        this.axis.y.isOverflowing = contentElScrollHeight > contentWrapperElOffsetHeight; // Set isOverflowing to false if user explicitely set hidden overflow

        this.axis.x.isOverflowing = elOverflowX === 'hidden' ? false : this.axis.x.isOverflowing;
        this.axis.y.isOverflowing = elOverflowY === 'hidden' ? false : this.axis.y.isOverflowing;
        this.axis.x.forceVisible = this.options.forceVisible === 'x' || this.options.forceVisible === true;
        this.axis.y.forceVisible = this.options.forceVisible === 'y' || this.options.forceVisible === true;
        this.hideNativeScrollbar(); // Set isOverflowing to false if scrollbar is not necessary (content is shorter than offset)

        var offsetForXScrollbar = this.axis.x.isOverflowing ? this.scrollbarWidth : 0;
        var offsetForYScrollbar = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
        this.axis.x.isOverflowing = this.axis.x.isOverflowing && contentElScrollWidth > contentWrapperElOffsetWidth - offsetForYScrollbar;
        this.axis.y.isOverflowing = this.axis.y.isOverflowing && contentElScrollHeight > contentWrapperElOffsetHeight - offsetForXScrollbar;
        this.axis.x.scrollbar.size = this.getScrollbarSize('x');
        this.axis.y.scrollbar.size = this.getScrollbarSize('y');
        this.axis.x.scrollbar.el.style.width = "".concat(this.axis.x.scrollbar.size, "px");
        this.axis.y.scrollbar.el.style.height = "".concat(this.axis.y.scrollbar.size, "px");
        this.positionScrollbar('x');
        this.positionScrollbar('y');
        this.toggleTrackVisibility('x');
        this.toggleTrackVisibility('y');
      }
      /**
       * Calculate scrollbar size
       */

    }, {
      key: "getScrollbarSize",
      value: function getScrollbarSize() {
        var axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'y';

        if (!this.axis[axis].isOverflowing) {
          return 0;
        }

        var contentSize = this.contentEl[this.axis[axis].scrollSizeAttr];
        var trackSize = this.axis[axis].track.el[this.axis[axis].offsetSizeAttr];
        var scrollbarSize;
        var scrollbarRatio = trackSize / contentSize; // Calculate new height/position of drag handle.

        scrollbarSize = Math.max(~~(scrollbarRatio * trackSize), this.options.scrollbarMinSize);

        if (this.options.scrollbarMaxSize) {
          scrollbarSize = Math.min(scrollbarSize, this.options.scrollbarMaxSize);
        }

        return scrollbarSize;
      }
    }, {
      key: "positionScrollbar",
      value: function positionScrollbar() {
        var axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'y';

        if (!this.axis[axis].isOverflowing) {
          return;
        }

        var contentSize = this.contentWrapperEl[this.axis[axis].scrollSizeAttr];
        var trackSize = this.axis[axis].track.el[this.axis[axis].offsetSizeAttr];
        var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
        var scrollbar = this.axis[axis].scrollbar;
        var scrollOffset = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
        scrollOffset = axis === 'x' && this.isRtl && SimpleBar.getRtlHelpers().isScrollOriginAtZero ? -scrollOffset : scrollOffset;
        var scrollPourcent = scrollOffset / (contentSize - hostSize);
        var handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);
        handleOffset = axis === 'x' && this.isRtl && SimpleBar.getRtlHelpers().isScrollingToNegative ? -handleOffset + (trackSize - scrollbar.size) : handleOffset;
        scrollbar.el.style.transform = axis === 'x' ? "translate3d(".concat(handleOffset, "px, 0, 0)") : "translate3d(0, ".concat(handleOffset, "px, 0)");
      }
    }, {
      key: "toggleTrackVisibility",
      value: function toggleTrackVisibility() {
        var axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'y';
        var track = this.axis[axis].track.el;
        var scrollbar = this.axis[axis].scrollbar.el;

        if (this.axis[axis].isOverflowing || this.axis[axis].forceVisible) {
          track.style.visibility = 'visible';
          this.contentWrapperEl.style[this.axis[axis].overflowAttr] = 'scroll';
          this.el.classList.add("".concat(this.classNames.scrollable, "-").concat(axis));
        } else {
          track.style.visibility = 'hidden';
          this.contentWrapperEl.style[this.axis[axis].overflowAttr] = 'hidden';
          this.el.classList.remove("".concat(this.classNames.scrollable, "-").concat(axis));
        } // Even if forceVisible is enabled, scrollbar itself should be hidden


        if (this.axis[axis].isOverflowing) {
          scrollbar.style.display = 'block';
        } else {
          scrollbar.style.display = 'none';
        }
      }
    }, {
      key: "hideNativeScrollbar",
      value: function hideNativeScrollbar() {
        this.offsetEl.style[this.isRtl ? 'left' : 'right'] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-".concat(this.scrollbarWidth, "px") : 0;
        this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-".concat(this.scrollbarWidth, "px") : 0;
      }
      /**
       * On scroll event handling
       */

    }, {
      key: "onMouseMoveForAxis",
      value: function onMouseMoveForAxis() {
        var axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'y';
        this.axis[axis].track.rect = this.axis[axis].track.el.getBoundingClientRect();
        this.axis[axis].scrollbar.rect = this.axis[axis].scrollbar.el.getBoundingClientRect();
        var isWithinScrollbarBoundsX = this.isWithinBounds(this.axis[axis].scrollbar.rect);

        if (isWithinScrollbarBoundsX) {
          this.axis[axis].scrollbar.el.classList.add(this.classNames.hover);
        } else {
          this.axis[axis].scrollbar.el.classList.remove(this.classNames.hover);
        }

        if (this.isWithinBounds(this.axis[axis].track.rect)) {
          this.axis[axis].track.el.classList.add(this.classNames.hover);
        } else {
          this.axis[axis].track.el.classList.remove(this.classNames.hover);
        }
      }
    }, {
      key: "onMouseLeaveForAxis",
      value: function onMouseLeaveForAxis() {
        var axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'y';
        this.axis[axis].track.el.classList.remove(this.classNames.hover);
        this.axis[axis].scrollbar.el.classList.remove(this.classNames.hover);
      }
    }, {
      key: "onDragStart",

      /**
       * on scrollbar handle drag movement starts
       */
      value: function onDragStart(e) {
        var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'y';
        var elDocument = getElementDocument(this.el);
        var elWindow = getElementWindow(this.el);
        var scrollbar = this.axis[axis].scrollbar; // Measure how far the user's mouse is from the top of the scrollbar drag handle.

        var eventOffset = axis === 'y' ? e.pageY : e.pageX;
        this.axis[axis].dragOffset = eventOffset - scrollbar.rect[this.axis[axis].offsetAttr];
        this.draggedAxis = axis;
        this.el.classList.add(this.classNames.dragging);
        elDocument.addEventListener('mousemove', this.drag, true);
        elDocument.addEventListener('mouseup', this.onEndDrag, true);

        if (this.removePreventClickId === null) {
          elDocument.addEventListener('click', this.preventClick, true);
          elDocument.addEventListener('dblclick', this.preventClick, true);
        } else {
          elWindow.clearTimeout(this.removePreventClickId);
          this.removePreventClickId = null;
        }
      }
      /**
       * Drag scrollbar handle
       */

    }, {
      key: "onTrackClick",
      value: function onTrackClick(e) {
        var _this4 = this;

        var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'y';
        if (!this.options.clickOnTrack) return; // Preventing the event's default to trigger click underneath

        e.preventDefault();
        var elWindow = getElementWindow(this.el);
        this.axis[axis].scrollbar.rect = this.axis[axis].scrollbar.el.getBoundingClientRect();
        var scrollbar = this.axis[axis].scrollbar;
        var scrollbarOffset = scrollbar.rect[this.axis[axis].offsetAttr];
        var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
        var scrolled = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
        var t = axis === 'y' ? this.mouseY - scrollbarOffset : this.mouseX - scrollbarOffset;
        var dir = t < 0 ? -1 : 1;
        var scrollSize = dir === -1 ? scrolled - hostSize : scrolled + hostSize;
        var speed = 40;

        var scrollTo = function scrollTo() {
          if (dir === -1) {
            if (scrolled > scrollSize) {
              scrolled -= speed;
              _this4.contentWrapperEl[_this4.axis[axis].scrollOffsetAttr] = scrolled;
              elWindow.requestAnimationFrame(scrollTo);
            }
          } else {
            if (scrolled < scrollSize) {
              scrolled += speed;
              _this4.contentWrapperEl[_this4.axis[axis].scrollOffsetAttr] = scrolled;
              elWindow.requestAnimationFrame(scrollTo);
            }
          }
        };

        scrollTo();
      }
      /**
       * Getter for content element
       */

    }, {
      key: "getContentElement",
      value: function getContentElement() {
        return this.contentEl;
      }
      /**
       * Getter for original scrolling element
       */

    }, {
      key: "getScrollElement",
      value: function getScrollElement() {
        return this.contentWrapperEl;
      }
    }, {
      key: "removeListeners",
      value: function removeListeners() {
        var elWindow = getElementWindow(this.el); // Event listeners

        this.el.removeEventListener('mouseenter', this.onMouseEnter);
        this.el.removeEventListener('pointerdown', this.onPointerEvent, true);
        this.el.removeEventListener('mousemove', this.onMouseMove);
        this.el.removeEventListener('mouseleave', this.onMouseLeave);

        if (this.contentWrapperEl) {
          this.contentWrapperEl.removeEventListener('scroll', this.onScroll);
        }

        elWindow.removeEventListener('resize', this.onWindowResize);

        if (this.mutationObserver) {
          this.mutationObserver.disconnect();
        }

        if (this.resizeObserver) {
          this.resizeObserver.disconnect();
        } // Cancel all debounced functions


        this.onMouseMove.cancel();
        this.onWindowResize.cancel();
        this.onStopScrolling.cancel();
        this.onMouseEntered.cancel();
      }
      /**
       * UnMount mutation observer and delete SimpleBar instance from DOM element
       */

    }, {
      key: "unMount",
      value: function unMount() {
        this.removeListeners();
        SimpleBar.instances.delete(this.el);
      }
      /**
       * Check if mouse is within bounds
       */

    }, {
      key: "isWithinBounds",
      value: function isWithinBounds(bbox) {
        return this.mouseX >= bbox.left && this.mouseX <= bbox.left + bbox.width && this.mouseY >= bbox.top && this.mouseY <= bbox.top + bbox.height;
      }
      /**
       * Find element children matches query
       */

    }, {
      key: "findChild",
      value: function findChild(el, query) {
        var matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
        return Array.prototype.filter.call(el.children, function (child) {
          return matches.call(child, query);
        })[0];
      }
    }], [{
      key: "getRtlHelpers",
      value: function getRtlHelpers() {
        if (SimpleBar.rtlHelpers) {
          return SimpleBar.rtlHelpers;
        }

        var dummyDiv = document.createElement('div');
        dummyDiv.innerHTML = '<div class="simplebar-dummy-scrollbar-size"><div></div></div>';
        var scrollbarDummyEl = dummyDiv.firstElementChild;
        var dummyChild = scrollbarDummyEl.firstElementChild;
        document.body.appendChild(scrollbarDummyEl);
        scrollbarDummyEl.scrollLeft = 0;
        var dummyContainerOffset = SimpleBar.getOffset(scrollbarDummyEl);
        var dummyChildOffset = SimpleBar.getOffset(dummyChild);
        scrollbarDummyEl.scrollLeft = -999;
        var dummyChildOffsetAfterScroll = SimpleBar.getOffset(dummyChild);
        document.body.removeChild(scrollbarDummyEl);
        SimpleBar.rtlHelpers = {
          // determines if the scrolling is responding with negative values
          isScrollOriginAtZero: dummyContainerOffset.left !== dummyChildOffset.left,
          // determines if the origin scrollbar position is inverted or not (positioned on left or right)
          isScrollingToNegative: dummyChildOffset.left !== dummyChildOffsetAfterScroll.left
        };
        return SimpleBar.rtlHelpers;
      }
    }, {
      key: "getScrollbarWidth",
      value: function getScrollbarWidth() {
        // Try/catch for FF 56 throwing on undefined computedStyles
        try {
          // Detect browsers supporting CSS scrollbar styling and do not calculate
          if (getComputedStyle(this.contentWrapperEl, '::-webkit-scrollbar').display === 'none' || 'scrollbarWidth' in document.documentElement.style || '-ms-overflow-style' in document.documentElement.style) {
            return 0;
          } else {
            return scrollbarWidth();
          }
        } catch (e) {
          return scrollbarWidth();
        }
      }
    }, {
      key: "getOffset",
      value: function getOffset(el) {
        var rect = el.getBoundingClientRect();
        var elDocument = getElementDocument(el);
        var elWindow = getElementWindow(el);
        return {
          top: rect.top + (elWindow.pageYOffset || elDocument.documentElement.scrollTop),
          left: rect.left + (elWindow.pageXOffset || elDocument.documentElement.scrollLeft)
        };
      }
    }]);

    return SimpleBar;
  }();

  SimpleBar.defaultOptions = {
    autoHide: true,
    forceVisible: false,
    clickOnTrack: true,
    scrollbarMinSize: 25,
    scrollbarMaxSize: 0
  };
  SimpleBar.instances = new WeakMap();

  // Helper function to retrieve options from element attributes
  var getOptions = function getOptions(obj) {
    var options = Array.prototype.reduce.call(obj, function (acc, attribute) {
      var option = attribute.name.match(/data-simplebar-(.+)/);

      if (option) {
        var key = option[1].replace(/\W+(.)/g, function (x, chr) {
          return chr.toUpperCase();
        });

        switch (attribute.value) {
          case 'true':
            acc[key] = true;
            break;

          case 'false':
            acc[key] = false;
            break;

          case undefined:
            acc[key] = true;
            break;

          default:
            acc[key] = attribute.value;
        }
      }

      return acc;
    }, {});
    return options;
  };

  SimpleBar.initDOMLoadedElements = function () {
    document.removeEventListener('DOMContentLoaded', this.initDOMLoadedElements);
    window.removeEventListener('load', this.initDOMLoadedElements);
    Array.prototype.forEach.call(document.querySelectorAll('[data-simplebar]'), function (el) {
      if (el.getAttribute('data-simplebar') !== 'init' && !SimpleBar.instances.has(el)) new SimpleBar(el, getOptions(el.attributes));
    });
  };

  SimpleBar.removeObserver = function () {
    this.globalObserver.disconnect();
  };

  SimpleBar.initHtmlApi = function () {
    this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this); // MutationObserver is IE11+

    if (typeof MutationObserver !== 'undefined') {
      // Mutation observer to observe dynamically added elements
      this.globalObserver = new MutationObserver(SimpleBar.handleMutations);
      this.globalObserver.observe(document, {
        childList: true,
        subtree: true
      });
    } // Taken from jQuery `ready` function
    // Instantiate elements already present on the page


    if (document.readyState === 'complete' || document.readyState !== 'loading' && !document.documentElement.doScroll) {
      // Handle it asynchronously to allow scripts the opportunity to delay init
      window.setTimeout(this.initDOMLoadedElements);
    } else {
      document.addEventListener('DOMContentLoaded', this.initDOMLoadedElements);
      window.addEventListener('load', this.initDOMLoadedElements);
    }
  };

  SimpleBar.handleMutations = function (mutations) {
    mutations.forEach(function (mutation) {
      Array.prototype.forEach.call(mutation.addedNodes, function (addedNode) {
        if (addedNode.nodeType === 1) {
          if (addedNode.hasAttribute('data-simplebar')) {
            !SimpleBar.instances.has(addedNode) && new SimpleBar(addedNode, getOptions(addedNode.attributes));
          } else {
            Array.prototype.forEach.call(addedNode.querySelectorAll('[data-simplebar]'), function (el) {
              if (el.getAttribute('data-simplebar') !== 'init' && !SimpleBar.instances.has(el)) new SimpleBar(el, getOptions(el.attributes));
            });
          }
        }
      });
      Array.prototype.forEach.call(mutation.removedNodes, function (removedNode) {
        if (removedNode.nodeType === 1) {
          if (removedNode.hasAttribute('data-simplebar')) {
            SimpleBar.instances.has(removedNode) && SimpleBar.instances.get(removedNode).unMount();
          } else {
            Array.prototype.forEach.call(removedNode.querySelectorAll('[data-simplebar="init"]'), function (el) {
              SimpleBar.instances.has(el) && SimpleBar.instances.get(el).unMount();
            });
          }
        }
      });
    });
  };

  SimpleBar.getOptions = getOptions;
  SimpleBar.default = SimpleBar;
  /**
   * HTML API
   * Called only in a browser env.
   */

  if (canUseDom) {
    SimpleBar.initHtmlApi();
  }

  return SimpleBar;

})));
