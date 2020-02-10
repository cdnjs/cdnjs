(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
      } // Vendors: please allow content code to instantiate DOMExceptions
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
      }; // Most DOMException implementations don't allow calling DOMException's toString()
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
  } // There is full or partial native classList support, so just check if we need
  // to normalize the add/remove and toggle APIs.


  (function () {
    "use strict";

    var testElement = document.createElement("_");
    testElement.classList.add("c1", "c2"); // Polyfill for IE 10/11 and Firefox <26, where classList.add and
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

    testElement.classList.toggle("c3", false); // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
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

},{}],2:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

},{}],3:[function(require,module,exports){
'use strict'; // <3 Modernizr
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
          get: getter.bind({
            value: value || ''
          }),
          set: setter.bind(element, name)
        });
      }
    }
  }

  return map;
};

},{}],4:[function(require,module,exports){
"use strict";

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

},{}],5:[function(require,module,exports){
"use strict";

/* global define, KeyboardEvent, module */
(function () {
  var keyboardeventKeyPolyfill = {
    polyfill: polyfill,
    keys: {
      3: 'Cancel',
      6: 'Help',
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      28: 'Convert',
      29: 'NonConvert',
      30: 'Accept',
      31: 'ModeChange',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      41: 'Select',
      42: 'Print',
      43: 'Execute',
      44: 'PrintScreen',
      45: 'Insert',
      46: 'Delete',
      48: ['0', ')'],
      49: ['1', '!'],
      50: ['2', '@'],
      51: ['3', '#'],
      52: ['4', '$'],
      53: ['5', '%'],
      54: ['6', '^'],
      55: ['7', '&'],
      56: ['8', '*'],
      57: ['9', '('],
      91: 'OS',
      93: 'ContextMenu',
      144: 'NumLock',
      145: 'ScrollLock',
      181: 'VolumeMute',
      182: 'VolumeDown',
      183: 'VolumeUp',
      186: [';', ':'],
      187: ['=', '+'],
      188: [',', '<'],
      189: ['-', '_'],
      190: ['.', '>'],
      191: ['/', '?'],
      192: ['`', '~'],
      219: ['[', '{'],
      220: ['\\', '|'],
      221: [']', '}'],
      222: ["'", '"'],
      224: 'Meta',
      225: 'AltGraph',
      246: 'Attn',
      247: 'CrSel',
      248: 'ExSel',
      249: 'EraseEof',
      250: 'Play',
      251: 'ZoomOut'
    }
  }; // Function keys (F1-24).

  var i;

  for (i = 1; i < 25; i++) {
    keyboardeventKeyPolyfill.keys[111 + i] = 'F' + i;
  } // Printable ASCII characters.


  var letter = '';

  for (i = 65; i < 91; i++) {
    letter = String.fromCharCode(i);
    keyboardeventKeyPolyfill.keys[i] = [letter.toLowerCase(), letter.toUpperCase()];
  }

  function polyfill() {
    if (!('KeyboardEvent' in window) || 'key' in KeyboardEvent.prototype) {
      return false;
    } // Polyfill `key` on `KeyboardEvent`.


    var proto = {
      get: function get(x) {
        var key = keyboardeventKeyPolyfill.keys[this.which || this.keyCode];

        if (Array.isArray(key)) {
          key = key[+this.shiftKey];
        }

        return key;
      }
    };
    Object.defineProperty(KeyboardEvent.prototype, 'key', proto);
    return proto;
  }

  if (typeof define === 'function' && define.amd) {
    define('keyboardevent-key-polyfill', keyboardeventKeyPolyfill);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    module.exports = keyboardeventKeyPolyfill;
  } else if (window) {
    window.keyboardeventKeyPolyfill = keyboardeventKeyPolyfill;
  }
})();

},{}],6:[function(require,module,exports){
(function (global){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var freeGlobal = (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global && global.Object === Object && global;
/** Detect free variable `self`. */

var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
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
    lastInvokeTime = time; // Start the timer for the trailing edge.

    timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

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
  var type = _typeof(value);

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
  return !!value && _typeof(value) == 'object';
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
  return _typeof(value) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
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

},{}],7:[function(require,module,exports){
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
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


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

},{}],8:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

  if (_typeof(handler) === 'object') {
    options = {
      capture: popKey(handler, 'capture'),
      passive: popKey(handler, 'passive')
    };
  }

  var listener = {
    selector: selector,
    delegate: _typeof(handler) === 'object' ? delegateAll(handler) : selector ? delegate(selector, handler) : handler,
    options: options
  };

  if (type.indexOf(SPACE) > -1) {
    return type.split(SPACE).map(function (_type) {
      return assign({
        type: _type
      }, listener);
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

},{"../delegate":10,"../delegateAll":11,"object-assign":7}],9:[function(require,module,exports){
"use strict";

module.exports = function compose(functions) {
  return function (e) {
    return functions.some(function (fn) {
      return fn.call(this, e) === false;
    }, this);
  };
};

},{}],10:[function(require,module,exports){
"use strict";

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

},{"element-closest":4}],11:[function(require,module,exports){
"use strict";

var delegate = require('../delegate');

var compose = require('../compose');

var SPLAT = '*';

module.exports = function delegateAll(selectors) {
  var keys = Object.keys(selectors); // XXX optimization: if there is only one handler and it applies to
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

},{"../compose":9,"../delegate":10}],12:[function(require,module,exports){
"use strict";

module.exports = function ignore(element, fn) {
  return function ignorance(e) {
    if (element !== e.target && !element.contains(e.target)) {
      return fn.call(this, e);
    }
  };
};

},{}],13:[function(require,module,exports){
"use strict";

module.exports = {
  behavior: require('./behavior'),
  delegate: require('./delegate'),
  delegateAll: require('./delegateAll'),
  ignore: require('./ignore'),
  keymap: require('./keymap')
};

},{"./behavior":8,"./delegate":10,"./delegateAll":11,"./ignore":12,"./keymap":14}],14:[function(require,module,exports){
"use strict";

require('keyboardevent-key-polyfill'); // these are the only relevant modifiers supported on all platforms,
// according to MDN:
// <https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState>


var MODIFIERS = {
  'Alt': 'altKey',
  'Control': 'ctrlKey',
  'Ctrl': 'ctrlKey',
  'Shift': 'shiftKey'
};
var MODIFIER_SEPARATOR = '+';

var getEventKey = function getEventKey(event, hasModifiers) {
  var key = event.key;

  if (hasModifiers) {
    for (var modifier in MODIFIERS) {
      if (event[MODIFIERS[modifier]] === true) {
        key = [modifier, key].join(MODIFIER_SEPARATOR);
      }
    }
  }

  return key;
};

module.exports = function keymap(keys) {
  var hasModifiers = Object.keys(keys).some(function (key) {
    return key.indexOf(MODIFIER_SEPARATOR) > -1;
  });
  return function (event) {
    var key = getEventKey(event, hasModifiers);
    return [key, key.toLowerCase()].reduce(function (result, _key) {
      if (_key in keys) {
        result = keys[key].call(this, event);
      }

      return result;
    }, undefined);
  };
};

module.exports.MODIFIERS = MODIFIERS;

},{"keyboardevent-key-polyfill":5}],15:[function(require,module,exports){
"use strict";

module.exports = function once(listener, options) {
  var wrapped = function wrappedOnce(e) {
    e.currentTarget.removeEventListener(e.type, wrapped, options);
    return listener.call(this, e);
  };

  return wrapped;
};

},{}],16:[function(require,module,exports){
'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
    throw new Error('Expected a string but got ' + _typeof(ids));
  }

  if (!doc) {
    doc = window.document;
  }

  var getElementById = doc.getElementById ? doc.getElementById.bind(doc) : queryById.bind(doc);
  ids = trim(ids).split(RE_SPLIT); // XXX we can short-circuit here because trimming and splitting a
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

},{}],17:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var select = require("../utils/select");

var behavior = require("../utils/behavior");

var toggle = require("../utils/toggle");

var isElementInViewport = require("../utils/is-in-viewport");

var _require = require("../events"),
    CLICK = _require.CLICK;

var _require2 = require("../config"),
    PREFIX = _require2.prefix;

var ACCORDION = ".".concat(PREFIX, "-accordion, .").concat(PREFIX, "-accordion--bordered");
var BUTTON = ".".concat(PREFIX, "-accordion__button[aria-controls]");
var EXPANDED = "aria-expanded";
var MULTISELECTABLE = "aria-multiselectable";
/**
 * Get an Array of button elements belonging directly to the given
 * accordion element.
 * @param {HTMLElement} accordion
 * @return {array<HTMLButtonElement>}
 */

var getAccordionButtons = function getAccordionButtons(accordion) {
  var buttons = select(BUTTON, accordion);
  return buttons.filter(function (button) {
    return button.closest(ACCORDION) === accordion;
  });
};
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
  var safeExpanded = expanded;

  if (!accordion) {
    throw new Error("".concat(BUTTON, " is missing outer ").concat(ACCORDION));
  }

  safeExpanded = toggle(button, expanded); // XXX multiselectable is opt-in, to preserve legacy behavior

  var multiselectable = accordion.getAttribute(MULTISELECTABLE) === "true";

  if (safeExpanded && !multiselectable) {
    getAccordionButtons(accordion).forEach(function (other) {
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

var accordion = behavior(_defineProperty({}, CLICK, _defineProperty({}, BUTTON, function (event) {
  event.preventDefault();
  toggleButton(this);

  if (this.getAttribute(EXPANDED) === "true") {
    // We were just expanded, but if another accordion was also just
    // collapsed, we may no longer be in the viewport. This ensures
    // that we are still visible, so the user isn't confused.
    if (!isElementInViewport(this)) this.scrollIntoView();
  }
})), {
  init: function init(root) {
    select(BUTTON, root).forEach(function (button) {
      var expanded = button.getAttribute(EXPANDED) === "true";
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
module.exports = accordion;

},{"../config":26,"../events":27,"../utils/behavior":32,"../utils/is-in-viewport":34,"../utils/select":35,"../utils/toggle":38}],18:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require("../utils/behavior");

var _require = require("../events"),
    CLICK = _require.CLICK;

var _require2 = require("../config"),
    PREFIX = _require2.prefix;

var HEADER = ".".concat(PREFIX, "-banner__header");
var EXPANDED_CLASS = "".concat(PREFIX, "-banner__header--expanded");

var toggleBanner = function toggleEl(event) {
  event.preventDefault();
  this.closest(HEADER).classList.toggle(EXPANDED_CLASS);
};

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, "".concat(HEADER, " [aria-controls]"), toggleBanner)));

},{"../config":26,"../events":27,"../utils/behavior":32}],19:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var debounce = require("lodash.debounce");

var behavior = require("../utils/behavior");

var select = require("../utils/select");

var _require = require("../events"),
    CLICK = _require.CLICK;

var _require2 = require("../config"),
    PREFIX = _require2.prefix;

var HIDDEN = "hidden";
var SCOPE = ".".concat(PREFIX, "-footer--big");
var NAV = "".concat(SCOPE, " nav");
var BUTTON = "".concat(NAV, " .").concat(PREFIX, "-footer__primary-link");
var COLLAPSIBLE = ".".concat(PREFIX, "-footer__primary-content--collapsible");
var HIDE_MAX_WIDTH = 480;
var DEBOUNCE_RATE = 180;

function showPanel() {
  if (window.innerWidth < HIDE_MAX_WIDTH) {
    var collapseEl = this.closest(COLLAPSIBLE);
    collapseEl.classList.toggle(HIDDEN); // NB: this *should* always succeed because the button
    // selector is scoped to ".{prefix}-footer-big nav"

    var collapsibleEls = select(COLLAPSIBLE, collapseEl.closest(NAV));
    collapsibleEls.forEach(function (el) {
      if (el !== collapseEl) {
        el.classList.add(HIDDEN);
      }
    });
  }
}

var lastInnerWidth;
var resize = debounce(function () {
  if (lastInnerWidth === window.innerWidth) return;
  lastInnerWidth = window.innerWidth;
  var hidden = window.innerWidth < HIDE_MAX_WIDTH;
  select(COLLAPSIBLE).forEach(function (list) {
    return list.classList.toggle(HIDDEN, hidden);
  });
}, DEBOUNCE_RATE);
module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, BUTTON, showPanel)), {
  // export for use elsewhere
  HIDE_MAX_WIDTH: HIDE_MAX_WIDTH,
  DEBOUNCE_RATE: DEBOUNCE_RATE,
  init: function init() {
    resize();
    window.addEventListener("resize", resize);
  },
  teardown: function teardown() {
    window.removeEventListener("resize", resize);
  }
});

},{"../config":26,"../events":27,"../utils/behavior":32,"../utils/select":35,"lodash.debounce":6}],20:[function(require,module,exports){
"use strict";

var accordion = require("./accordion");

var banner = require("./banner");

var footer = require("./footer");

var navigation = require("./navigation");

var password = require("./password");

var search = require("./search");

var skipnav = require("./skipnav");

var validator = require("./validator");

module.exports = {
  accordion: accordion,
  banner: banner,
  footer: footer,
  navigation: navigation,
  password: password,
  search: search,
  skipnav: skipnav,
  validator: validator
};

},{"./accordion":17,"./banner":18,"./footer":19,"./navigation":21,"./password":22,"./search":23,"./skipnav":24,"./validator":25}],21:[function(require,module,exports){
"use strict";

var _CLICK;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require("../utils/behavior");

var select = require("../utils/select");

var toggle = require("../utils/toggle");

var FocusTrap = require("../utils/focus-trap");

var accordion = require("./accordion");

var _require = require("../events"),
    CLICK = _require.CLICK;

var _require2 = require("../config"),
    PREFIX = _require2.prefix;

var BODY = "body";
var NAV = ".".concat(PREFIX, "-nav");
var NAV_LINKS = "".concat(NAV, " a");
var NAV_CONTROL = "button.".concat(PREFIX, "-nav__link");
var OPENERS = ".".concat(PREFIX, "-menu-btn");
var CLOSE_BUTTON = ".".concat(PREFIX, "-nav__close");
var OVERLAY = ".".concat(PREFIX, "-overlay");
var CLOSERS = "".concat(CLOSE_BUTTON, ", .").concat(PREFIX, "-overlay");
var TOGGLES = [NAV, OVERLAY].join(", ");
var ACTIVE_CLASS = "usa-js-mobile-nav--active";
var VISIBLE_CLASS = "is-visible";
var navigation;
var navActive;

var isActive = function isActive() {
  return document.body.classList.contains(ACTIVE_CLASS);
};

var toggleNav = function toggleNav(active) {
  var _document = document,
      body = _document.body;
  var safeActive = typeof active === "boolean" ? active : !isActive();
  body.classList.toggle(ACTIVE_CLASS, safeActive);
  select(TOGGLES).forEach(function (el) {
    return el.classList.toggle(VISIBLE_CLASS, safeActive);
  });
  navigation.focusTrap.update(safeActive);
  var closeButton = body.querySelector(CLOSE_BUTTON);
  var menuButton = body.querySelector(OPENERS);

  if (safeActive && closeButton) {
    // The mobile nav was just activated, so focus on the close button,
    // which is just before all the nav elements in the tab order.
    closeButton.focus();
  } else if (!safeActive && document.activeElement === closeButton && menuButton) {
    // The mobile nav was just deactivated, and focus was on the close
    // button, which is no longer visible. We don't want the focus to
    // disappear into the void, so focus on the menu button if it's
    // visible (this may have been what the user was just focused on,
    // if they triggered the mobile nav by mistake).
    menuButton.focus();
  }

  return safeActive;
};

var resize = function resize() {
  var closer = document.body.querySelector(CLOSE_BUTTON);

  if (isActive() && closer && closer.getBoundingClientRect().width === 0) {
    // When the mobile nav is active, and the close box isn't visible,
    // we know the user's viewport has been resized to be larger.
    // Let's make the page state consistent by deactivating the mobile nav.
    navigation.toggleNav.call(closer, false);
  }
};

var onMenuClose = function onMenuClose() {
  return navigation.toggleNav.call(navigation, false);
};

var hideActiveNavDropdown = function hideActiveNavDropdown() {
  toggle(navActive, false);
  navActive = null;
};

navigation = behavior(_defineProperty({}, CLICK, (_CLICK = {}, _defineProperty(_CLICK, NAV_CONTROL, function () {
  // If another nav is open, close it
  if (navActive && navActive !== this) {
    hideActiveNavDropdown();
  } // store a reference to the last clicked nav link element, so we
  // can hide the dropdown if another element on the page is clicked


  if (navActive) {
    hideActiveNavDropdown();
  } else {
    navActive = this;
    toggle(navActive, true);
  } // Do this so the event handler on the body doesn't fire


  return false;
}), _defineProperty(_CLICK, BODY, function () {
  if (navActive) {
    hideActiveNavDropdown();
  }
}), _defineProperty(_CLICK, OPENERS, toggleNav), _defineProperty(_CLICK, CLOSERS, toggleNav), _defineProperty(_CLICK, NAV_LINKS, function () {
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
  } // If the mobile navigation menu is active, we want to hide it.


  if (isActive()) {
    navigation.toggleNav.call(navigation, false);
  }
}), _CLICK)), {
  init: function init(root) {
    var trapContainer = root.querySelector(NAV);

    if (trapContainer) {
      navigation.focusTrap = FocusTrap(trapContainer, {
        Escape: onMenuClose
      });
    }

    resize();
    window.addEventListener("resize", resize, false);
  },
  teardown: function teardown() {
    window.removeEventListener("resize", resize, false);
    navActive = false;
  },
  focusTrap: null,
  toggleNav: toggleNav
});
module.exports = navigation;

},{"../config":26,"../events":27,"../utils/behavior":32,"../utils/focus-trap":33,"../utils/select":35,"../utils/toggle":38,"./accordion":17}],22:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require("../utils/behavior");

var toggleFormInput = require("../utils/toggle-form-input");

var _require = require("../events"),
    CLICK = _require.CLICK;

var _require2 = require("../config"),
    PREFIX = _require2.prefix;

var LINK = ".".concat(PREFIX, "-show-password, .").concat(PREFIX, "-show-multipassword");

function toggle(event) {
  event.preventDefault();
  toggleFormInput(this);
}

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, LINK, toggle)));

},{"../config":26,"../events":27,"../utils/behavior":32,"../utils/toggle-form-input":37}],23:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ignore = require("receptor/ignore");

var behavior = require("../utils/behavior");

var select = require("../utils/select");

var _require = require("../events"),
    CLICK = _require.CLICK;

var BUTTON = ".js-search-button";
var FORM = ".js-search-form";
var INPUT = "[type=search]";
var CONTEXT = "header"; // XXX

var lastButton;

var getForm = function getForm(button) {
  var context = button.closest(CONTEXT);
  return context ? context.querySelector(FORM) : document.querySelector(FORM);
};

var toggleSearch = function toggleSearch(button, active) {
  var form = getForm(button);

  if (!form) {
    throw new Error("No ".concat(FORM, " found for search toggle in ").concat(CONTEXT, "!"));
  }
  /* eslint-disable no-param-reassign */


  button.hidden = active;
  form.hidden = !active;
  /* eslint-enable */

  if (!active) {
    return;
  }

  var input = form.querySelector(INPUT);

  if (input) {
    input.focus();
  } // when the user clicks _outside_ of the form w/ignore(): hide the
  // search, then remove the listener


  var listener = ignore(form, function () {
    if (lastButton) {
      hideSearch.call(lastButton); // eslint-disable-line no-use-before-define
    }

    document.body.removeEventListener(CLICK, listener);
  }); // Normally we would just run this code without a timeout, but
  // IE11 and Edge will actually call the listener *immediately* because
  // they are currently handling this exact type of event, so we'll
  // make sure the browser is done handling the current click event,
  // if any, before we attach the listener.

  setTimeout(function () {
    document.body.addEventListener(CLICK, listener);
  }, 0);
};

function showSearch() {
  toggleSearch(this, true);
  lastButton = this;
}

function hideSearch() {
  toggleSearch(this, false);
  lastButton = undefined;
}

var search = behavior(_defineProperty({}, CLICK, _defineProperty({}, BUTTON, showSearch)), {
  init: function init(target) {
    select(BUTTON, target).forEach(function (button) {
      toggleSearch(button, false);
    });
  },
  teardown: function teardown() {
    // forget the last button clicked
    lastButton = undefined;
  }
});
module.exports = search;

},{"../events":27,"../utils/behavior":32,"../utils/select":35,"receptor/ignore":12}],24:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var once = require("receptor/once");

var behavior = require("../utils/behavior");

var _require = require("../events"),
    CLICK = _require.CLICK;

var _require2 = require("../config"),
    PREFIX = _require2.prefix;

var LINK = ".".concat(PREFIX, "-skipnav[href^=\"#\"], .").concat(PREFIX, "-footer__return-to-top [href^=\"#\"]");
var MAINCONTENT = "main-content";

function setTabindex() {
  // NB: we know because of the selector we're delegating to below that the
  // href already begins with '#'
  var id = this.getAttribute("href");
  var target = document.getElementById(id === "#" ? MAINCONTENT : id.slice(1));

  if (target) {
    target.style.outline = "0";
    target.setAttribute("tabindex", 0);
    target.focus();
    target.addEventListener("blur", once(function () {
      target.setAttribute("tabindex", -1);
    }));
  } else {// throw an error?
  }
}

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, LINK, setTabindex)));

},{"../config":26,"../events":27,"../utils/behavior":32,"receptor/once":15}],25:[function(require,module,exports){
"use strict";

var behavior = require("../utils/behavior");

var validate = require("../utils/validate-input");

function change() {
  validate(this);
}

var validator = behavior({
  "keyup change": {
    "input[data-validation-element]": change
  }
});
module.exports = validator;

},{"../utils/behavior":32,"../utils/validate-input":39}],26:[function(require,module,exports){
"use strict";

module.exports = {
  prefix: "usa"
};

},{}],27:[function(require,module,exports){
"use strict";

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
  CLICK: "click"
};

},{}],28:[function(require,module,exports){
"use strict";

var elproto = window.HTMLElement.prototype;
var HIDDEN = "hidden";

if (!(HIDDEN in elproto)) {
  Object.defineProperty(elproto, HIDDEN, {
    get: function get() {
      return this.hasAttribute(HIDDEN);
    },
    set: function set(value) {
      if (value) {
        this.setAttribute(HIDDEN, "");
      } else {
        this.removeAttribute(HIDDEN);
      }
    }
  });
}

},{}],29:[function(require,module,exports){
"use strict";

// polyfills HTMLElement.prototype.classList and DOMTokenList
require("classlist-polyfill"); // polyfills HTMLElement.prototype.hidden


require("./element-hidden");

},{"./element-hidden":28,"classlist-polyfill":1}],30:[function(require,module,exports){
"use strict";

var domready = require("domready");
/**
 * The 'polyfills' define key ECMAScript 5 methods that may be missing from
 * older browsers, so must be loaded first.
 */


require("./polyfills");

var uswds = require("./config");

var components = require("./components");

uswds.components = components;
domready(function () {
  var target = document.body;
  Object.keys(components).forEach(function (key) {
    var behavior = components[key];
    behavior.on(target);
  });
});
module.exports = uswds;

},{"./components":20,"./config":26,"./polyfills":29,"domready":2}],31:[function(require,module,exports){
"use strict";

module.exports = function () {
  var htmlDocument = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  return htmlDocument.activeElement;
};

},{}],32:[function(require,module,exports){
"use strict";

var assign = require("object-assign");

var Behavior = require("receptor/behavior");
/**
 * @name sequence
 * @param {...Function} seq an array of functions
 * @return { closure } callHooks
 */
// We use a named function here because we want it to inherit its lexical scope
// from the behavior props object, not from the module


var sequence = function sequence() {
  for (var _len = arguments.length, seq = new Array(_len), _key = 0; _key < _len; _key++) {
    seq[_key] = arguments[_key];
  }

  return function callHooks() {
    var _this = this;

    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    seq.forEach(function (method) {
      if (typeof _this[method] === "function") {
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
    on: sequence("init", "add"),
    off: sequence("teardown", "remove")
  }, props));
};

},{"object-assign":7,"receptor/behavior":8}],33:[function(require,module,exports){
"use strict";

var assign = require("object-assign");

var _require = require("receptor"),
    keymap = _require.keymap;

var behavior = require("./behavior");

var select = require("./select");

var activeElement = require("./active-element");

var FOCUSABLE = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

var tabHandler = function tabHandler(context) {
  var focusableElements = select(FOCUSABLE, context);
  var firstTabStop = focusableElements[0];
  var lastTabStop = focusableElements[focusableElements.length - 1]; // Special rules for when the user is tabbing forward from the last focusable element,
  // or when tabbing backwards from the first focusable element

  function tabAhead(event) {
    if (activeElement() === lastTabStop) {
      event.preventDefault();
      firstTabStop.focus();
    }
  }

  function tabBack(event) {
    if (activeElement() === firstTabStop) {
      event.preventDefault();
      lastTabStop.focus();
    }
  }

  return {
    firstTabStop: firstTabStop,
    lastTabStop: lastTabStop,
    tabAhead: tabAhead,
    tabBack: tabBack
  };
};

module.exports = function (context) {
  var additionalKeyBindings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var tabEventHandler = tabHandler(context); //  TODO: In the future, loop over additional keybindings and pass an array
  // of functions, if necessary, to the map keys. Then people implementing
  // the focus trap could pass callbacks to fire when tabbing

  var keyMappings = keymap(assign({
    Tab: tabEventHandler.tabAhead,
    "Shift+Tab": tabEventHandler.tabBack
  }, additionalKeyBindings));
  var focusTrap = behavior({
    keydown: keyMappings
  }, {
    init: function init() {
      // TODO: is this desireable behavior? Should the trap always do this by default or should
      // the component getting decorated handle this?
      tabEventHandler.firstTabStop.focus();
    },
    update: function update(isActive) {
      if (isActive) {
        this.on();
      } else {
        this.off();
      }
    }
  });
  return focusTrap;
};

},{"./active-element":31,"./behavior":32,"./select":35,"object-assign":7,"receptor":13}],34:[function(require,module,exports){
"use strict";

// https://stackoverflow.com/a/7557433
function isElementInViewport(el) {
  var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  var docEl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.documentElement;
  var rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (win.innerHeight || docEl.clientHeight) && rect.right <= (win.innerWidth || docEl.clientWidth);
}

module.exports = isElementInViewport;

},{}],35:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * @name isElement
 * @desc returns whether or not the given argument is a DOM element.
 * @param {any} value
 * @return {boolean}
 */
var isElement = function isElement(value) {
  return value && _typeof(value) === "object" && value.nodeType === 1;
};
/**
 * @name select
 * @desc selects elements from the DOM by class selector or ID selector.
 * @param {string} selector - The selector to traverse the DOM with.
 * @param {Document|HTMLElement?} context - The context to traverse the DOM
 *   in. If not provided, it defaults to the document.
 * @return {HTMLElement[]} - An array of DOM nodes or an empty array.
 */


module.exports = function (selector, context) {
  if (typeof selector !== "string") {
    return [];
  }

  if (!context || !isElement(context)) {
    context = window.document; // eslint-disable-line no-param-reassign
  }

  var selection = context.querySelectorAll(selector);
  return Array.prototype.slice.call(selection);
};

},{}],36:[function(require,module,exports){
"use strict";

/**
 * Flips given INPUT elements between masked (hiding the field value) and unmasked
 * @param {Array.HTMLElement} fields - An array of INPUT elements
 * @param {Boolean} mask - Whether the mask should be applied, hiding the field value
 */
module.exports = function (field, mask) {
  field.setAttribute("autocapitalize", "off");
  field.setAttribute("autocorrect", "off");
  field.setAttribute("type", mask ? "password" : "text");
};

},{}],37:[function(require,module,exports){
"use strict";

var resolveIdRefs = require("resolve-id-refs");

var toggleFieldMask = require("./toggle-field-mask");

var CONTROLS = "aria-controls";
var PRESSED = "aria-pressed";
var SHOW_ATTR = "data-show-text";
var HIDE_ATTR = "data-hide-text";
/**
 * Replace the word "Show" (or "show") with "Hide" (or "hide") in a string.
 * @param {string} showText
 * @return {strong} hideText
 */

var getHideText = function getHideText(showText) {
  return showText.replace(/\bShow\b/i, function (show) {
    return "".concat(show[0] === "S" ? "H" : "h", "ide");
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
  var pressed = el.hasAttribute(PRESSED) && el.getAttribute(PRESSED) !== "true";
  var fields = resolveIdRefs(el.getAttribute(CONTROLS));
  fields.forEach(function (field) {
    return toggleFieldMask(field, pressed);
  });

  if (!el.hasAttribute(SHOW_ATTR)) {
    el.setAttribute(SHOW_ATTR, el.textContent);
  }

  var showText = el.getAttribute(SHOW_ATTR);
  var hideText = el.getAttribute(HIDE_ATTR) || getHideText(showText);
  el.textContent = pressed ? showText : hideText; // eslint-disable-line no-param-reassign

  el.setAttribute(PRESSED, pressed);
  return pressed;
};

},{"./toggle-field-mask":36,"resolve-id-refs":16}],38:[function(require,module,exports){
"use strict";

var EXPANDED = "aria-expanded";
var CONTROLS = "aria-controls";
var HIDDEN = "hidden";

module.exports = function (button, expanded) {
  var safeExpanded = expanded;

  if (typeof safeExpanded !== "boolean") {
    safeExpanded = button.getAttribute(EXPANDED) === "false";
  }

  button.setAttribute(EXPANDED, safeExpanded);
  var id = button.getAttribute(CONTROLS);
  var controls = document.getElementById(id);

  if (!controls) {
    throw new Error("No toggle target found with id: \"".concat(id, "\""));
  }

  if (safeExpanded) {
    controls.removeAttribute(HIDDEN);
  } else {
    controls.setAttribute(HIDDEN, "");
  }

  return safeExpanded;
};

},{}],39:[function(require,module,exports){
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var dataset = require("elem-dataset");

var _require = require("../config"),
    PREFIX = _require.prefix;

var CHECKED = "aria-checked";
var CHECKED_CLASS = "".concat(PREFIX, "-checklist__item--checked");

module.exports = function validate(el) {
  var data = dataset(el);
  var id = data.validationElement;
  var checkList = id.charAt(0) === "#" ? document.querySelector(id) : document.getElementById(id);

  if (!checkList) {
    throw new Error("No validation element found with id: \"".concat(id, "\""));
  }

  Object.entries(data).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (key.startsWith("validate")) {
      var validatorName = key.substr("validate".length).toLowerCase();
      var validatorPattern = new RegExp(value);
      var validatorSelector = "[data-validator=\"".concat(validatorName, "\"]");
      var validatorCheckbox = checkList.querySelector(validatorSelector);

      if (!validatorCheckbox) {
        throw new Error("No validator checkbox found for: \"".concat(validatorName, "\""));
      }

      var checked = validatorPattern.test(el.value);
      validatorCheckbox.classList.toggle(CHECKED_CLASS, checked);
      validatorCheckbox.setAttribute(CHECKED, checked);
    }
  });
};

},{"../config":26,"elem-dataset":3}]},{},[30])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY2xhc3NsaXN0LXBvbHlmaWxsL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kb21yZWFkeS9yZWFkeS5qcyIsIm5vZGVfbW9kdWxlcy9lbGVtLWRhdGFzZXQvZGlzdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lbGVtZW50LWNsb3Nlc3QvZWxlbWVudC1jbG9zZXN0LmpzIiwibm9kZV9tb2R1bGVzL2tleWJvYXJkZXZlbnQta2V5LXBvbHlmaWxsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5kZWJvdW5jZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2JlaGF2aW9yL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2NvbXBvc2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvZGVsZWdhdGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvZGVsZWdhdGVBbGwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvaWdub3JlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2tleW1hcC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9vbmNlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Jlc29sdmUtaWQtcmVmcy9pbmRleC5qcyIsInNyYy9qcy9jb21wb25lbnRzL2FjY29yZGlvbi5qcyIsInNyYy9qcy9jb21wb25lbnRzL2Jhbm5lci5qcyIsInNyYy9qcy9jb21wb25lbnRzL2Zvb3Rlci5qcyIsInNyYy9qcy9jb21wb25lbnRzL2luZGV4LmpzIiwic3JjL2pzL2NvbXBvbmVudHMvbmF2aWdhdGlvbi5qcyIsInNyYy9qcy9jb21wb25lbnRzL3Bhc3N3b3JkLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvc2VhcmNoLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvc2tpcG5hdi5qcyIsInNyYy9qcy9jb21wb25lbnRzL3ZhbGlkYXRvci5qcyIsInNyYy9qcy9jb25maWcuanMiLCJzcmMvanMvZXZlbnRzLmpzIiwic3JjL2pzL3BvbHlmaWxscy9lbGVtZW50LWhpZGRlbi5qcyIsInNyYy9qcy9wb2x5ZmlsbHMvaW5kZXguanMiLCJzcmMvanMvc3RhcnQuanMiLCJzcmMvanMvdXRpbHMvYWN0aXZlLWVsZW1lbnQuanMiLCJzcmMvanMvdXRpbHMvYmVoYXZpb3IuanMiLCJzcmMvanMvdXRpbHMvZm9jdXMtdHJhcC5qcyIsInNyYy9qcy91dGlscy9pcy1pbi12aWV3cG9ydC5qcyIsInNyYy9qcy91dGlscy9zZWxlY3QuanMiLCJzcmMvanMvdXRpbHMvdG9nZ2xlLWZpZWxkLW1hc2suanMiLCJzcmMvanMvdXRpbHMvdG9nZ2xlLWZvcm0taW5wdXQuanMiLCJzcmMvanMvdXRpbHMvdG9nZ2xlLmpzIiwic3JjL2pzL3V0aWxzL3ZhbGlkYXRlLWlucHV0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7Ozs7O0FBU0E7O0FBRUE7QUFFQSxJQUFJLGNBQWMsTUFBTSxDQUFDLElBQXpCLEVBQStCO0FBRS9CO0FBQ0E7QUFDQSxNQUFJLEVBQUUsZUFBZSxRQUFRLENBQUMsYUFBVCxDQUF1QixHQUF2QixDQUFqQixLQUNBLFFBQVEsQ0FBQyxlQUFULElBQTRCLEVBQUUsZUFBZSxRQUFRLENBQUMsZUFBVCxDQUF5Qiw0QkFBekIsRUFBc0QsR0FBdEQsQ0FBakIsQ0FEaEMsRUFDOEc7QUFFN0csZUFBVSxJQUFWLEVBQWdCO0FBRWpCOztBQUVBLFVBQUksRUFBRSxhQUFhLElBQWYsQ0FBSixFQUEwQjs7QUFFMUIsVUFDRyxhQUFhLEdBQUcsV0FEbkI7QUFBQSxVQUVHLFNBQVMsR0FBRyxXQUZmO0FBQUEsVUFHRyxZQUFZLEdBQUcsSUFBSSxD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QUgsQ0FBVSxDQUFWLE1BQWlCLEdBQWpCLEdBQ0ksUUFBUSxDQUFDLGFBQVQsQ0FBdUIsRUFBdkIsQ0FESixHQUVJLFFBQVEsQ0FBQyxjQUFULENBQXdCLEVBQXhCLENBSE47O0FBS0EsTUFBSSxDQUFDLFNBQUwsRUFBZ0I7QUFDZCxVQUFNLElBQUksS0FBSixrREFBbUQsRUFBbkQsUUFBTjtBQUNEOztBQUVELEVBQUEsTUFBTSxDQUFDLE9BQVAsQ0FBZSxJQUFmLEVBQXFCLE9BQXJCLENBQTZCLGdCQUFrQjtBQUFBO0FBQUEsUUFBaEIsR0FBZ0I7QUFBQSxRQUFYLEtBQVc7O0FBQzdDLFFBQUksR0FBRyxDQUFDLFVBQUosQ0FBZSxVQUFmLENBQUosRUFBZ0M7QUFDOUIsVUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLE1BQUosQ0FBVyxXQUFXLE1BQXRCLEVBQThCLFdBQTlCLEVBQXRCO0FBQ0EsVUFBTSxnQkFBZ0IsR0FBRyxJQUFJLE1BQUosQ0FBVyxLQUFYLENBQXpCO0FBQ0EsVUFBTSxpQkFBaUIsK0JBQXVCLGFBQXZCLFFBQXZCO0FBQ0EsVUFBTSxpQkFBaUIsR0FBRyxTQUFTLENBQUMsYUFBVixDQUF3QixpQkFBeEIsQ0FBMUI7O0FBRUEsVUFBSSxDQUFDLGlCQUFMLEVBQXdCO0FBQ3RCLGNBQU0sSUFBSSxLQUFKLDhDQUErQyxhQUEvQyxRQUFOO0FBQ0Q7O0FBRUQsVUFBTSxPQUFPLEdBQUcsZ0JBQWdCLENBQUMsSUFBakIsQ0FBc0IsRUFBRSxDQUFDLEtBQXpCLENBQWhCO0FBQ0EsTUFBQSxpQkFBaUIsQ0FBQyxTQUFsQixDQUE0QixNQUE1QixDQUFtQyxhQUFuQyxFQUFrRCxPQUFsRDtBQUNBLE1BQUEsaUJBQWlCLENBQUMsWUFBbEIsQ0FBK0IsT0FBL0IsRUFBd0MsT0FBeEM7QUFDRDtBQUNGLEdBZkQ7QUFnQkQsQ0E1QkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKlxuICogY2xhc3NMaXN0LmpzOiBDcm9zcy1icm93c2VyIGZ1bGwgZWxlbWVudC5jbGFzc0xpc3QgaW1wbGVtZW50YXRpb24uXG4gKiAxLjEuMjAxNzA0MjdcbiAqXG4gKiBCeSBFbGkgR3JleSwgaHR0cDovL2VsaWdyZXkuY29tXG4gKiBMaWNlbnNlOiBEZWRpY2F0ZWQgdG8gdGhlIHB1YmxpYyBkb21haW4uXG4gKiAgIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9jbGFzc0xpc3QuanMvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5cbi8qZ2xvYmFsIHNlbGYsIGRvY3VtZW50LCBET01FeGNlcHRpb24gKi9cblxuLyohIEBzb3VyY2UgaHR0cDovL3B1cmwuZWxpZ3JleS5jb20vZ2l0aHViL2NsYXNzTGlzdC5qcy9ibG9iL21hc3Rlci9jbGFzc0xpc3QuanMgKi9cblxuaWYgKFwiZG9jdW1lbnRcIiBpbiB3aW5kb3cuc2VsZikge1xuXG4vLyBGdWxsIHBvbHlmaWxsIGZvciBicm93c2VycyB3aXRoIG5vIGNsYXNzTGlzdCBzdXBwb3J0XG4vLyBJbmNsdWRpbmcgSUUgPCBFZGdlIG1pc3NpbmcgU1ZHRWxlbWVudC5jbGFzc0xpc3RcbmlmICghKFwiY2xhc3NMaXN0XCIgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIl9cIikpIFxuXHR8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMgJiYgIShcImNsYXNzTGlzdFwiIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXCJnXCIpKSkge1xuXG4oZnVuY3Rpb24gKHZpZXcpIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmlmICghKCdFbGVtZW50JyBpbiB2aWV3KSkgcmV0dXJuO1xuXG52YXJcblx0ICBjbGFzc0xpc3RQcm9wID0gXCJjbGFzc0xpc3RcIlxuXHQsIHByb3RvUHJvcCA9IFwicHJvdG90eXBlXCJcblx0LCBlbGVtQ3RyUHJvdG8gPSB2aWV3LkVsZW1lbnRbcHJvdG9Qcm9wXVxuXHQsIG9iakN0ciA9IE9iamVjdFxuXHQsIHN0clRyaW0gPSBTdHJpbmdbcHJvdG9Qcm9wXS50cmltIHx8IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcblx0fVxuXHQsIGFyckluZGV4T2YgPSBBcnJheVtwcm90b1Byb3BdLmluZGV4T2YgfHwgZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHR2YXJcblx0XHRcdCAgaSA9IDBcblx0XHRcdCwgbGVuID0gdGhpcy5sZW5ndGhcblx0XHQ7XG5cdFx0Zm9yICg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0aWYgKGkgaW4gdGhpcyAmJiB0aGlzW2ldID09PSBpdGVtKSB7XG5cdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gLTE7XG5cdH1cblx0Ly8gVmVuZG9yczogcGxlYXNlIGFsbG93IGNvbnRlbnQgY29kZSB0byBpbnN0YW50aWF0ZSBET01FeGNlcHRpb25zXG5cdCwgRE9NRXggPSBmdW5jdGlvbiAodHlwZSwgbWVzc2FnZSkge1xuXHRcdHRoaXMubmFtZSA9IHR5cGU7XG5cdFx0dGhpcy5jb2RlID0gRE9NRXhjZXB0aW9uW3R5cGVdO1xuXHRcdHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cdH1cblx0LCBjaGVja1Rva2VuQW5kR2V0SW5kZXggPSBmdW5jdGlvbiAoY2xhc3NMaXN0LCB0b2tlbikge1xuXHRcdGlmICh0b2tlbiA9PT0gXCJcIikge1xuXHRcdFx0dGhyb3cgbmV3IERPTUV4KFxuXHRcdFx0XHQgIFwiU1lOVEFYX0VSUlwiXG5cdFx0XHRcdCwgXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWRcIlxuXHRcdFx0KTtcblx0XHR9XG5cdFx0aWYgKC9cXHMvLnRlc3QodG9rZW4pKSB7XG5cdFx0XHR0aHJvdyBuZXcgRE9NRXgoXG5cdFx0XHRcdCAgXCJJTlZBTElEX0NIQVJBQ1RFUl9FUlJcIlxuXHRcdFx0XHQsIFwiU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyXCJcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiBhcnJJbmRleE9mLmNhbGwoY2xhc3NMaXN0LCB0b2tlbik7XG5cdH1cblx0LCBDbGFzc0xpc3QgPSBmdW5jdGlvbiAoZWxlbSkge1xuXHRcdHZhclxuXHRcdFx0ICB0cmltbWVkQ2xhc3NlcyA9IHN0clRyaW0uY2FsbChlbGVtLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIHx8IFwiXCIpXG5cdFx0XHQsIGNsYXNzZXMgPSB0cmltbWVkQ2xhc3NlcyA/IHRyaW1tZWRDbGFzc2VzLnNwbGl0KC9cXHMrLykgOiBbXVxuXHRcdFx0LCBpID0gMFxuXHRcdFx0LCBsZW4gPSBjbGFzc2VzLmxlbmd0aFxuXHRcdDtcblx0XHRmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHR0aGlzLnB1c2goY2xhc3Nlc1tpXSk7XG5cdFx0fVxuXHRcdHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgdGhpcy50b1N0cmluZygpKTtcblx0XHR9O1xuXHR9XG5cdCwgY2xhc3NMaXN0UHJvdG8gPSBDbGFzc0xpc3RbcHJvdG9Qcm9wXSA9IFtdXG5cdCwgY2xhc3NMaXN0R2V0dGVyID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBuZXcgQ2xhc3NMaXN0KHRoaXMpO1xuXHR9XG47XG4vLyBNb3N0IERPTUV4Y2VwdGlvbiBpbXBsZW1lbnRhdGlvbnMgZG9uJ3QgYWxsb3cgY2FsbGluZyBET01FeGNlcHRpb24ncyB0b1N0cmluZygpXG4vLyBvbiBub24tRE9NRXhjZXB0aW9ucy4gRXJyb3IncyB0b1N0cmluZygpIGlzIHN1ZmZpY2llbnQgaGVyZS5cbkRPTUV4W3Byb3RvUHJvcF0gPSBFcnJvcltwcm90b1Byb3BdO1xuY2xhc3NMaXN0UHJvdG8uaXRlbSA9IGZ1bmN0aW9uIChpKSB7XG5cdHJldHVybiB0aGlzW2ldIHx8IG51bGw7XG59O1xuY2xhc3NMaXN0UHJvdG8uY29udGFpbnMgPSBmdW5jdGlvbiAodG9rZW4pIHtcblx0dG9rZW4gKz0gXCJcIjtcblx0cmV0dXJuIGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgIT09IC0xO1xufTtcbmNsYXNzTGlzdFByb3RvLmFkZCA9IGZ1bmN0aW9uICgpIHtcblx0dmFyXG5cdFx0ICB0b2tlbnMgPSBhcmd1bWVudHNcblx0XHQsIGkgPSAwXG5cdFx0LCBsID0gdG9rZW5zLmxlbmd0aFxuXHRcdCwgdG9rZW5cblx0XHQsIHVwZGF0ZWQgPSBmYWxzZVxuXHQ7XG5cdGRvIHtcblx0XHR0b2tlbiA9IHRva2Vuc1tpXSArIFwiXCI7XG5cdFx0aWYgKGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgPT09IC0xKSB7XG5cdFx0XHR0aGlzLnB1c2godG9rZW4pO1xuXHRcdFx0dXBkYXRlZCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cdHdoaWxlICgrK2kgPCBsKTtcblxuXHRpZiAodXBkYXRlZCkge1xuXHRcdHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSgpO1xuXHR9XG59O1xuY2xhc3NMaXN0UHJvdG8ucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHR2YXJcblx0XHQgIHRva2VucyA9IGFyZ3VtZW50c1xuXHRcdCwgaSA9IDBcblx0XHQsIGwgPSB0b2tlbnMubGVuZ3RoXG5cdFx0LCB0b2tlblxuXHRcdCwgdXBkYXRlZCA9IGZhbHNlXG5cdFx0LCBpbmRleFxuXHQ7XG5cdGRvIHtcblx0XHR0b2tlbiA9IHRva2Vuc1tpXSArIFwiXCI7XG5cdFx0aW5kZXggPSBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pO1xuXHRcdHdoaWxlIChpbmRleCAhPT0gLTEpIHtcblx0XHRcdHRoaXMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdHVwZGF0ZWQgPSB0cnVlO1xuXHRcdFx0aW5kZXggPSBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pO1xuXHRcdH1cblx0fVxuXHR3aGlsZSAoKytpIDwgbCk7XG5cblx0aWYgKHVwZGF0ZWQpIHtcblx0XHR0aGlzLl91cGRhdGVDbGFzc05hbWUoKTtcblx0fVxufTtcbmNsYXNzTGlzdFByb3RvLnRvZ2dsZSA9IGZ1bmN0aW9uICh0b2tlbiwgZm9yY2UpIHtcblx0dG9rZW4gKz0gXCJcIjtcblxuXHR2YXJcblx0XHQgIHJlc3VsdCA9IHRoaXMuY29udGFpbnModG9rZW4pXG5cdFx0LCBtZXRob2QgPSByZXN1bHQgP1xuXHRcdFx0Zm9yY2UgIT09IHRydWUgJiYgXCJyZW1vdmVcIlxuXHRcdDpcblx0XHRcdGZvcmNlICE9PSBmYWxzZSAmJiBcImFkZFwiXG5cdDtcblxuXHRpZiAobWV0aG9kKSB7XG5cdFx0dGhpc1ttZXRob2RdKHRva2VuKTtcblx0fVxuXG5cdGlmIChmb3JjZSA9PT0gdHJ1ZSB8fCBmb3JjZSA9PT0gZmFsc2UpIHtcblx0XHRyZXR1cm4gZm9yY2U7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuICFyZXN1bHQ7XG5cdH1cbn07XG5jbGFzc0xpc3RQcm90by50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHRoaXMuam9pbihcIiBcIik7XG59O1xuXG5pZiAob2JqQ3RyLmRlZmluZVByb3BlcnR5KSB7XG5cdHZhciBjbGFzc0xpc3RQcm9wRGVzYyA9IHtcblx0XHQgIGdldDogY2xhc3NMaXN0R2V0dGVyXG5cdFx0LCBlbnVtZXJhYmxlOiB0cnVlXG5cdFx0LCBjb25maWd1cmFibGU6IHRydWVcblx0fTtcblx0dHJ5IHtcblx0XHRvYmpDdHIuZGVmaW5lUHJvcGVydHkoZWxlbUN0clByb3RvLCBjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RQcm9wRGVzYyk7XG5cdH0gY2F0Y2ggKGV4KSB7IC8vIElFIDggZG9lc24ndCBzdXBwb3J0IGVudW1lcmFibGU6dHJ1ZVxuXHRcdC8vIGFkZGluZyB1bmRlZmluZWQgdG8gZmlnaHQgdGhpcyBpc3N1ZSBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9jbGFzc0xpc3QuanMvaXNzdWVzLzM2XG5cdFx0Ly8gbW9kZXJuaWUgSUU4LU1TVzcgbWFjaGluZSBoYXMgSUU4IDguMC42MDAxLjE4NzAyIGFuZCBpcyBhZmZlY3RlZFxuXHRcdGlmIChleC5udW1iZXIgPT09IHVuZGVmaW5lZCB8fCBleC5udW1iZXIgPT09IC0weDdGRjVFQzU0KSB7XG5cdFx0XHRjbGFzc0xpc3RQcm9wRGVzYy5lbnVtZXJhYmxlID0gZmFsc2U7XG5cdFx0XHRvYmpDdHIuZGVmaW5lUHJvcGVydHkoZWxlbUN0clByb3RvLCBjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RQcm9wRGVzYyk7XG5cdFx0fVxuXHR9XG59IGVsc2UgaWYgKG9iakN0cltwcm90b1Byb3BdLl9fZGVmaW5lR2V0dGVyX18pIHtcblx0ZWxlbUN0clByb3RvLl9fZGVmaW5lR2V0dGVyX18oY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0R2V0dGVyKTtcbn1cblxufSh3aW5kb3cuc2VsZikpO1xuXG59XG5cbi8vIFRoZXJlIGlzIGZ1bGwgb3IgcGFydGlhbCBuYXRpdmUgY2xhc3NMaXN0IHN1cHBvcnQsIHNvIGp1c3QgY2hlY2sgaWYgd2UgbmVlZFxuLy8gdG8gbm9ybWFsaXplIHRoZSBhZGQvcmVtb3ZlIGFuZCB0b2dnbGUgQVBJcy5cblxuKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0dmFyIHRlc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIl9cIik7XG5cblx0dGVzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImMxXCIsIFwiYzJcIik7XG5cblx0Ly8gUG9seWZpbGwgZm9yIElFIDEwLzExIGFuZCBGaXJlZm94IDwyNiwgd2hlcmUgY2xhc3NMaXN0LmFkZCBhbmRcblx0Ly8gY2xhc3NMaXN0LnJlbW92ZSBleGlzdCBidXQgc3VwcG9ydCBvbmx5IG9uZSBhcmd1bWVudCBhdCBhIHRpbWUuXG5cdGlmICghdGVzdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYzJcIikpIHtcblx0XHR2YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24obWV0aG9kKSB7XG5cdFx0XHR2YXIgb3JpZ2luYWwgPSBET01Ub2tlbkxpc3QucHJvdG90eXBlW21ldGhvZF07XG5cblx0XHRcdERPTVRva2VuTGlzdC5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHRva2VuKSB7XG5cdFx0XHRcdHZhciBpLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuXG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHRcdHRva2VuID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0XHRcdG9yaWdpbmFsLmNhbGwodGhpcywgdG9rZW4pO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH07XG5cdFx0Y3JlYXRlTWV0aG9kKCdhZGQnKTtcblx0XHRjcmVhdGVNZXRob2QoJ3JlbW92ZScpO1xuXHR9XG5cblx0dGVzdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcImMzXCIsIGZhbHNlKTtcblxuXHQvLyBQb2x5ZmlsbCBmb3IgSUUgMTAgYW5kIEZpcmVmb3ggPDI0LCB3aGVyZSBjbGFzc0xpc3QudG9nZ2xlIGRvZXMgbm90XG5cdC8vIHN1cHBvcnQgdGhlIHNlY29uZCBhcmd1bWVudC5cblx0aWYgKHRlc3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImMzXCIpKSB7XG5cdFx0dmFyIF90b2dnbGUgPSBET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZTtcblxuXHRcdERPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24odG9rZW4sIGZvcmNlKSB7XG5cdFx0XHRpZiAoMSBpbiBhcmd1bWVudHMgJiYgIXRoaXMuY29udGFpbnModG9rZW4pID09PSAhZm9yY2UpIHtcblx0XHRcdFx0cmV0dXJuIGZvcmNlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIF90b2dnbGUuY2FsbCh0aGlzLCB0b2tlbik7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHR9XG5cblx0dGVzdEVsZW1lbnQgPSBudWxsO1xufSgpKTtcblxufVxuIiwiLyohXG4gICogZG9tcmVhZHkgKGMpIER1c3RpbiBEaWF6IDIwMTQgLSBMaWNlbnNlIE1JVFxuICAqL1xuIWZ1bmN0aW9uIChuYW1lLCBkZWZpbml0aW9uKSB7XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcpIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JykgZGVmaW5lKGRlZmluaXRpb24pXG4gIGVsc2UgdGhpc1tuYW1lXSA9IGRlZmluaXRpb24oKVxuXG59KCdkb21yZWFkeScsIGZ1bmN0aW9uICgpIHtcblxuICB2YXIgZm5zID0gW10sIGxpc3RlbmVyXG4gICAgLCBkb2MgPSBkb2N1bWVudFxuICAgICwgaGFjayA9IGRvYy5kb2N1bWVudEVsZW1lbnQuZG9TY3JvbGxcbiAgICAsIGRvbUNvbnRlbnRMb2FkZWQgPSAnRE9NQ29udGVudExvYWRlZCdcbiAgICAsIGxvYWRlZCA9IChoYWNrID8gL15sb2FkZWR8XmMvIDogL15sb2FkZWR8Xml8XmMvKS50ZXN0KGRvYy5yZWFkeVN0YXRlKVxuXG5cbiAgaWYgKCFsb2FkZWQpXG4gIGRvYy5hZGRFdmVudExpc3RlbmVyKGRvbUNvbnRlbnRMb2FkZWQsIGxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKGRvbUNvbnRlbnRMb2FkZWQsIGxpc3RlbmVyKVxuICAgIGxvYWRlZCA9IDFcbiAgICB3aGlsZSAobGlzdGVuZXIgPSBmbnMuc2hpZnQoKSkgbGlzdGVuZXIoKVxuICB9KVxuXG4gIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcbiAgICBsb2FkZWQgPyBzZXRUaW1lb3V0KGZuLCAwKSA6IGZucy5wdXNoKGZuKVxuICB9XG5cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyA8MyBNb2Rlcm5penJcbi8vIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvZG9tL2RhdGFzZXQuanNcblxuZnVuY3Rpb24gdXNlTmF0aXZlKCkge1xuXHR2YXIgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRlbGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1hLWInLCAnYycpO1xuXG5cdHJldHVybiBCb29sZWFuKGVsZW0uZGF0YXNldCAmJiBlbGVtLmRhdGFzZXQuYUIgPT09ICdjJyk7XG59XG5cbmZ1bmN0aW9uIG5hdGl2ZURhdGFzZXQoZWxlbWVudCkge1xuXHRyZXR1cm4gZWxlbWVudC5kYXRhc2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVzZU5hdGl2ZSgpID8gbmF0aXZlRGF0YXNldCA6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdHZhciBtYXAgPSB7fTtcblx0dmFyIGF0dHJpYnV0ZXMgPSBlbGVtZW50LmF0dHJpYnV0ZXM7XG5cblx0ZnVuY3Rpb24gZ2V0dGVyKCkge1xuXHRcdHJldHVybiB0aGlzLnZhbHVlO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2V0dGVyKG5hbWUsIHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG5cdFx0fVxuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDAsIGogPSBhdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdHZhciBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2ldO1xuXG5cdFx0aWYgKGF0dHJpYnV0ZSkge1xuXHRcdFx0dmFyIG5hbWUgPSBhdHRyaWJ1dGUubmFtZTtcblxuXHRcdFx0aWYgKG5hbWUuaW5kZXhPZignZGF0YS0nKSA9PT0gMCkge1xuXHRcdFx0XHR2YXIgcHJvcCA9IG5hbWUuc2xpY2UoNSkucmVwbGFjZSgvLS4vZywgZnVuY3Rpb24gKHUpIHtcblx0XHRcdFx0XHRyZXR1cm4gdS5jaGFyQXQoMSkudG9VcHBlckNhc2UoKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dmFyIHZhbHVlID0gYXR0cmlidXRlLnZhbHVlO1xuXG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtYXAsIHByb3AsIHtcblx0XHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdGdldDogZ2V0dGVyLmJpbmQoeyB2YWx1ZTogdmFsdWUgfHwgJycgfSksXG5cdFx0XHRcdFx0c2V0OiBzZXR0ZXIuYmluZChlbGVtZW50LCBuYW1lKVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbWFwO1xufTtcblxuIiwiLy8gZWxlbWVudC1jbG9zZXN0IHwgQ0MwLTEuMCB8IGdpdGh1Yi5jb20vam9uYXRoYW50bmVhbC9jbG9zZXN0XG5cbihmdW5jdGlvbiAoRWxlbWVudFByb3RvKSB7XG5cdGlmICh0eXBlb2YgRWxlbWVudFByb3RvLm1hdGNoZXMgIT09ICdmdW5jdGlvbicpIHtcblx0XHRFbGVtZW50UHJvdG8ubWF0Y2hlcyA9IEVsZW1lbnRQcm90by5tc01hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50UHJvdG8ubW96TWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnRQcm90by53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZnVuY3Rpb24gbWF0Y2hlcyhzZWxlY3Rvcikge1xuXHRcdFx0dmFyIGVsZW1lbnQgPSB0aGlzO1xuXHRcdFx0dmFyIGVsZW1lbnRzID0gKGVsZW1lbnQuZG9jdW1lbnQgfHwgZWxlbWVudC5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdHZhciBpbmRleCA9IDA7XG5cblx0XHRcdHdoaWxlIChlbGVtZW50c1tpbmRleF0gJiYgZWxlbWVudHNbaW5kZXhdICE9PSBlbGVtZW50KSB7XG5cdFx0XHRcdCsraW5kZXg7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBCb29sZWFuKGVsZW1lbnRzW2luZGV4XSk7XG5cdFx0fTtcblx0fVxuXG5cdGlmICh0eXBlb2YgRWxlbWVudFByb3RvLmNsb3Nlc3QgIT09ICdmdW5jdGlvbicpIHtcblx0XHRFbGVtZW50UHJvdG8uY2xvc2VzdCA9IGZ1bmN0aW9uIGNsb3Nlc3Qoc2VsZWN0b3IpIHtcblx0XHRcdHZhciBlbGVtZW50ID0gdGhpcztcblxuXHRcdFx0d2hpbGUgKGVsZW1lbnQgJiYgZWxlbWVudC5ub2RlVHlwZSA9PT0gMSkge1xuXHRcdFx0XHRpZiAoZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuXHRcdFx0XHRcdHJldHVybiBlbGVtZW50O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fTtcblx0fVxufSkod2luZG93LkVsZW1lbnQucHJvdG90eXBlKTtcbiIsIi8qIGdsb2JhbCBkZWZpbmUsIEtleWJvYXJkRXZlbnQsIG1vZHVsZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXG4gIHZhciBrZXlib2FyZGV2ZW50S2V5UG9seWZpbGwgPSB7XG4gICAgcG9seWZpbGw6IHBvbHlmaWxsLFxuICAgIGtleXM6IHtcbiAgICAgIDM6ICdDYW5jZWwnLFxuICAgICAgNjogJ0hlbHAnLFxuICAgICAgODogJ0JhY2tzcGFjZScsXG4gICAgICA5OiAnVGFiJyxcbiAgICAgIDEyOiAnQ2xlYXInLFxuICAgICAgMTM6ICdFbnRlcicsXG4gICAgICAxNjogJ1NoaWZ0JyxcbiAgICAgIDE3OiAnQ29udHJvbCcsXG4gICAgICAxODogJ0FsdCcsXG4gICAgICAxOTogJ1BhdXNlJyxcbiAgICAgIDIwOiAnQ2Fwc0xvY2snLFxuICAgICAgMjc6ICdFc2NhcGUnLFxuICAgICAgMjg6ICdDb252ZXJ0JyxcbiAgICAgIDI5OiAnTm9uQ29udmVydCcsXG4gICAgICAzMDogJ0FjY2VwdCcsXG4gICAgICAzMTogJ01vZGVDaGFuZ2UnLFxuICAgICAgMzI6ICcgJyxcbiAgICAgIDMzOiAnUGFnZVVwJyxcbiAgICAgIDM0OiAnUGFnZURvd24nLFxuICAgICAgMzU6ICdFbmQnLFxuICAgICAgMzY6ICdIb21lJyxcbiAgICAgIDM3OiAnQXJyb3dMZWZ0JyxcbiAgICAgIDM4OiAnQXJyb3dVcCcsXG4gICAgICAzOTogJ0Fycm93UmlnaHQnLFxuICAgICAgNDA6ICdBcnJvd0Rvd24nLFxuICAgICAgNDE6ICdTZWxlY3QnLFxuICAgICAgNDI6ICdQcmludCcsXG4gICAgICA0MzogJ0V4ZWN1dGUnLFxuICAgICAgNDQ6ICdQcmludFNjcmVlbicsXG4gICAgICA0NTogJ0luc2VydCcsXG4gICAgICA0NjogJ0RlbGV0ZScsXG4gICAgICA0ODogWycwJywgJyknXSxcbiAgICAgIDQ5OiBbJzEnLCAnISddLFxuICAgICAgNTA6IFsnMicsICdAJ10sXG4gICAgICA1MTogWyczJywgJyMnXSxcbiAgICAgIDUyOiBbJzQnLCAnJCddLFxuICAgICAgNTM6IFsnNScsICclJ10sXG4gICAgICA1NDogWyc2JywgJ14nXSxcbiAgICAgIDU1OiBbJzcnLCAnJiddLFxuICAgICAgNTY6IFsnOCcsICcqJ10sXG4gICAgICA1NzogWyc5JywgJygnXSxcbiAgICAgIDkxOiAnT1MnLFxuICAgICAgOTM6ICdDb250ZXh0TWVudScsXG4gICAgICAxNDQ6ICdOdW1Mb2NrJyxcbiAgICAgIDE0NTogJ1Njcm9sbExvY2snLFxuICAgICAgMTgxOiAnVm9sdW1lTXV0ZScsXG4gICAgICAxODI6ICdWb2x1bWVEb3duJyxcbiAgICAgIDE4MzogJ1ZvbHVtZVVwJyxcbiAgICAgIDE4NjogWyc7JywgJzonXSxcbiAgICAgIDE4NzogWyc9JywgJysnXSxcbiAgICAgIDE4ODogWycsJywgJzwnXSxcbiAgICAgIDE4OTogWyctJywgJ18nXSxcbiAgICAgIDE5MDogWycuJywgJz4nXSxcbiAgICAgIDE5MTogWycvJywgJz8nXSxcbiAgICAgIDE5MjogWydgJywgJ34nXSxcbiAgICAgIDIxOTogWydbJywgJ3snXSxcbiAgICAgIDIyMDogWydcXFxcJywgJ3wnXSxcbiAgICAgIDIyMTogWyddJywgJ30nXSxcbiAgICAgIDIyMjogW1wiJ1wiLCAnXCInXSxcbiAgICAgIDIyNDogJ01ldGEnLFxuICAgICAgMjI1OiAnQWx0R3JhcGgnLFxuICAgICAgMjQ2OiAnQXR0bicsXG4gICAgICAyNDc6ICdDclNlbCcsXG4gICAgICAyNDg6ICdFeFNlbCcsXG4gICAgICAyNDk6ICdFcmFzZUVvZicsXG4gICAgICAyNTA6ICdQbGF5JyxcbiAgICAgIDI1MTogJ1pvb21PdXQnXG4gICAgfVxuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIGtleXMgKEYxLTI0KS5cbiAgdmFyIGk7XG4gIGZvciAoaSA9IDE7IGkgPCAyNTsgaSsrKSB7XG4gICAga2V5Ym9hcmRldmVudEtleVBvbHlmaWxsLmtleXNbMTExICsgaV0gPSAnRicgKyBpO1xuICB9XG5cbiAgLy8gUHJpbnRhYmxlIEFTQ0lJIGNoYXJhY3RlcnMuXG4gIHZhciBsZXR0ZXIgPSAnJztcbiAgZm9yIChpID0gNjU7IGkgPCA5MTsgaSsrKSB7XG4gICAgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShpKTtcbiAgICBrZXlib2FyZGV2ZW50S2V5UG9seWZpbGwua2V5c1tpXSA9IFtsZXR0ZXIudG9Mb3dlckNhc2UoKSwgbGV0dGVyLnRvVXBwZXJDYXNlKCldO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9seWZpbGwgKCkge1xuICAgIGlmICghKCdLZXlib2FyZEV2ZW50JyBpbiB3aW5kb3cpIHx8XG4gICAgICAgICdrZXknIGluIEtleWJvYXJkRXZlbnQucHJvdG90eXBlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gUG9seWZpbGwgYGtleWAgb24gYEtleWJvYXJkRXZlbnRgLlxuICAgIHZhciBwcm90byA9IHtcbiAgICAgIGdldDogZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleWJvYXJkZXZlbnRLZXlQb2x5ZmlsbC5rZXlzW3RoaXMud2hpY2ggfHwgdGhpcy5rZXlDb2RlXTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShrZXkpKSB7XG4gICAgICAgICAga2V5ID0ga2V5Wyt0aGlzLnNoaWZ0S2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgICB9XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoS2V5Ym9hcmRFdmVudC5wcm90b3R5cGUsICdrZXknLCBwcm90byk7XG4gICAgcmV0dXJuIHByb3RvO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZSgna2V5Ym9hcmRldmVudC1rZXktcG9seWZpbGwnLCBrZXlib2FyZGV2ZW50S2V5UG9seWZpbGwpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZS5leHBvcnRzID0ga2V5Ym9hcmRldmVudEtleVBvbHlmaWxsO1xuICB9IGVsc2UgaWYgKHdpbmRvdykge1xuICAgIHdpbmRvdy5rZXlib2FyZGV2ZW50S2V5UG9seWZpbGwgPSBrZXlib2FyZGV2ZW50S2V5UG9seWZpbGw7XG4gIH1cblxufSkoKTtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTkFOID0gMCAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXgsXG4gICAgbmF0aXZlTWluID0gTWF0aC5taW47XG5cbi8qKlxuICogR2V0cyB0aGUgdGltZXN0YW1wIG9mIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgaGF2ZSBlbGFwc2VkIHNpbmNlXG4gKiB0aGUgVW5peCBlcG9jaCAoMSBKYW51YXJ5IDE5NzAgMDA6MDA6MDAgVVRDKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgRGF0ZVxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgdGltZXN0YW1wLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlZmVyKGZ1bmN0aW9uKHN0YW1wKSB7XG4gKiAgIGNvbnNvbGUubG9nKF8ubm93KCkgLSBzdGFtcCk7XG4gKiB9LCBfLm5vdygpKTtcbiAqIC8vID0+IExvZ3MgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaXQgdG9vayBmb3IgdGhlIGRlZmVycmVkIGludm9jYXRpb24uXG4gKi9cbnZhciBub3cgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHJvb3QuRGF0ZS5ub3coKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlYm91bmNlZCBmdW5jdGlvbiB0aGF0IGRlbGF5cyBpbnZva2luZyBgZnVuY2AgdW50aWwgYWZ0ZXIgYHdhaXRgXG4gKiBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgdGhlIGRlYm91bmNlZCBmdW5jdGlvbiB3YXNcbiAqIGludm9rZWQuIFRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgIG1ldGhvZCB0byBjYW5jZWxcbiAqIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLlxuICogUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb24gdGhlXG4gKiBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50XG4gKiBjYWxscyB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYFxuICogaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIGRlYm91bmNlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy5kZWJvdW5jZWAgYW5kIGBfLnRocm90dGxlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlYm91bmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9ZmFsc2VdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFdhaXRdXG4gKiAgVGhlIG1heGltdW0gdGltZSBgZnVuY2AgaXMgYWxsb3dlZCB0byBiZSBkZWxheWVkIGJlZm9yZSBpdCdzIGludm9rZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGRlYm91bmNlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgY29zdGx5IGNhbGN1bGF0aW9ucyB3aGlsZSB0aGUgd2luZG93IHNpemUgaXMgaW4gZmx1eC5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKGNhbGN1bGF0ZUxheW91dCwgMTUwKSk7XG4gKlxuICogLy8gSW52b2tlIGBzZW5kTWFpbGAgd2hlbiBjbGlja2VkLCBkZWJvdW5jaW5nIHN1YnNlcXVlbnQgY2FsbHMuXG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgXy5kZWJvdW5jZShzZW5kTWFpbCwgMzAwLCB7XG4gKiAgICdsZWFkaW5nJzogdHJ1ZSxcbiAqICAgJ3RyYWlsaW5nJzogZmFsc2VcbiAqIH0pKTtcbiAqXG4gKiAvLyBFbnN1cmUgYGJhdGNoTG9nYCBpcyBpbnZva2VkIG9uY2UgYWZ0ZXIgMSBzZWNvbmQgb2YgZGVib3VuY2VkIGNhbGxzLlxuICogdmFyIGRlYm91bmNlZCA9IF8uZGVib3VuY2UoYmF0Y2hMb2csIDI1MCwgeyAnbWF4V2FpdCc6IDEwMDAgfSk7XG4gKiB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvc3RyZWFtJyk7XG4gKiBqUXVlcnkoc291cmNlKS5vbignbWVzc2FnZScsIGRlYm91bmNlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyBkZWJvdW5jZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIGRlYm91bmNlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsYXN0QXJncyxcbiAgICAgIGxhc3RUaGlzLFxuICAgICAgbWF4V2FpdCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHRpbWVySWQsXG4gICAgICBsYXN0Q2FsbFRpbWUsXG4gICAgICBsYXN0SW52b2tlVGltZSA9IDAsXG4gICAgICBsZWFkaW5nID0gZmFsc2UsXG4gICAgICBtYXhpbmcgPSBmYWxzZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB3YWl0ID0gdG9OdW1iZXIod2FpdCkgfHwgMDtcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICEhb3B0aW9ucy5sZWFkaW5nO1xuICAgIG1heGluZyA9ICdtYXhXYWl0JyBpbiBvcHRpb25zO1xuICAgIG1heFdhaXQgPSBtYXhpbmcgPyBuYXRpdmVNYXgodG9OdW1iZXIob3B0aW9ucy5tYXhXYWl0KSB8fCAwLCB3YWl0KSA6IG1heFdhaXQ7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZUZ1bmModGltZSkge1xuICAgIHZhciBhcmdzID0gbGFzdEFyZ3MsXG4gICAgICAgIHRoaXNBcmcgPSBsYXN0VGhpcztcblxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxlYWRpbmdFZGdlKHRpbWUpIHtcbiAgICAvLyBSZXNldCBhbnkgYG1heFdhaXRgIHRpbWVyLlxuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICAvLyBTdGFydCB0aGUgdGltZXIgZm9yIHRoZSB0cmFpbGluZyBlZGdlLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgLy8gSW52b2tlIHRoZSBsZWFkaW5nIGVkZ2UuXG4gICAgcmV0dXJuIGxlYWRpbmcgPyBpbnZva2VGdW5jKHRpbWUpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtYWluaW5nV2FpdCh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZSxcbiAgICAgICAgcmVzdWx0ID0gd2FpdCAtIHRpbWVTaW5jZUxhc3RDYWxsO1xuXG4gICAgcmV0dXJuIG1heGluZyA/IG5hdGl2ZU1pbihyZXN1bHQsIG1heFdhaXQgLSB0aW1lU2luY2VMYXN0SW52b2tlKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZEludm9rZSh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZTtcblxuICAgIC8vIEVpdGhlciB0aGlzIGlzIHRoZSBmaXJzdCBjYWxsLCBhY3Rpdml0eSBoYXMgc3RvcHBlZCBhbmQgd2UncmUgYXQgdGhlXG4gICAgLy8gdHJhaWxpbmcgZWRnZSwgdGhlIHN5c3RlbSB0aW1lIGhhcyBnb25lIGJhY2t3YXJkcyBhbmQgd2UncmUgdHJlYXRpbmdcbiAgICAvLyBpdCBhcyB0aGUgdHJhaWxpbmcgZWRnZSwgb3Igd2UndmUgaGl0IHRoZSBgbWF4V2FpdGAgbGltaXQuXG4gICAgcmV0dXJuIChsYXN0Q2FsbFRpbWUgPT09IHVuZGVmaW5lZCB8fCAodGltZVNpbmNlTGFzdENhbGwgPj0gd2FpdCkgfHxcbiAgICAgICh0aW1lU2luY2VMYXN0Q2FsbCA8IDApIHx8IChtYXhpbmcgJiYgdGltZVNpbmNlTGFzdEludm9rZSA+PSBtYXhXYWl0KSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aW1lckV4cGlyZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKTtcbiAgICBpZiAoc2hvdWxkSW52b2tlKHRpbWUpKSB7XG4gICAgICByZXR1cm4gdHJhaWxpbmdFZGdlKHRpbWUpO1xuICAgIH1cbiAgICAvLyBSZXN0YXJ0IHRoZSB0aW1lci5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHJlbWFpbmluZ1dhaXQodGltZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhaWxpbmdFZGdlKHRpbWUpIHtcbiAgICB0aW1lcklkID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gT25seSBpbnZva2UgaWYgd2UgaGF2ZSBgbGFzdEFyZ3NgIHdoaWNoIG1lYW5zIGBmdW5jYCBoYXMgYmVlblxuICAgIC8vIGRlYm91bmNlZCBhdCBsZWFzdCBvbmNlLlxuICAgIGlmICh0cmFpbGluZyAmJiBsYXN0QXJncykge1xuICAgICAgcmV0dXJuIGludm9rZUZ1bmModGltZSk7XG4gICAgfVxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAodGltZXJJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgfVxuICAgIGxhc3RJbnZva2VUaW1lID0gMDtcbiAgICBsYXN0QXJncyA9IGxhc3RDYWxsVGltZSA9IGxhc3RUaGlzID0gdGltZXJJZCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHJldHVybiB0aW1lcklkID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiB0cmFpbGluZ0VkZ2Uobm93KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVib3VuY2VkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCksXG4gICAgICAgIGlzSW52b2tpbmcgPSBzaG91bGRJbnZva2UodGltZSk7XG5cbiAgICBsYXN0QXJncyA9IGFyZ3VtZW50cztcbiAgICBsYXN0VGhpcyA9IHRoaXM7XG4gICAgbGFzdENhbGxUaW1lID0gdGltZTtcblxuICAgIGlmIChpc0ludm9raW5nKSB7XG4gICAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBsZWFkaW5nRWRnZShsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgICAgaWYgKG1heGluZykge1xuICAgICAgICAvLyBIYW5kbGUgaW52b2NhdGlvbnMgaW4gYSB0aWdodCBsb29wLlxuICAgICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgICAgICByZXR1cm4gaW52b2tlRnVuYyhsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGRlYm91bmNlZC5jYW5jZWwgPSBjYW5jZWw7XG4gIGRlYm91bmNlZC5mbHVzaCA9IGZsdXNoO1xuICByZXR1cm4gZGVib3VuY2VkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICogLy8gPT4gSW5maW5pdHlcbiAqXG4gKiBfLnRvTnVtYmVyKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gTkFOO1xuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICB2YXIgb3RoZXIgPSB0eXBlb2YgdmFsdWUudmFsdWVPZiA9PSAnZnVuY3Rpb24nID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlVHJpbSwgJycpO1xuICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xuICByZXR1cm4gKGlzQmluYXJ5IHx8IHJlSXNPY3RhbC50ZXN0KHZhbHVlKSlcbiAgICA/IGZyZWVQYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgaXNCaW5hcnkgPyAyIDogOClcbiAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWJvdW5jZTtcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCJjb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5jb25zdCBkZWxlZ2F0ZSA9IHJlcXVpcmUoJy4uL2RlbGVnYXRlJyk7XG5jb25zdCBkZWxlZ2F0ZUFsbCA9IHJlcXVpcmUoJy4uL2RlbGVnYXRlQWxsJyk7XG5cbmNvbnN0IERFTEVHQVRFX1BBVFRFUk4gPSAvXiguKyk6ZGVsZWdhdGVcXCgoLispXFwpJC87XG5jb25zdCBTUEFDRSA9ICcgJztcblxuY29uc3QgZ2V0TGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSwgaGFuZGxlcikge1xuICB2YXIgbWF0Y2ggPSB0eXBlLm1hdGNoKERFTEVHQVRFX1BBVFRFUk4pO1xuICB2YXIgc2VsZWN0b3I7XG4gIGlmIChtYXRjaCkge1xuICAgIHR5cGUgPSBtYXRjaFsxXTtcbiAgICBzZWxlY3RvciA9IG1hdGNoWzJdO1xuICB9XG5cbiAgdmFyIG9wdGlvbnM7XG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgY2FwdHVyZTogcG9wS2V5KGhhbmRsZXIsICdjYXB0dXJlJyksXG4gICAgICBwYXNzaXZlOiBwb3BLZXkoaGFuZGxlciwgJ3Bhc3NpdmUnKVxuICAgIH07XG4gIH1cblxuICB2YXIgbGlzdGVuZXIgPSB7XG4gICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgIGRlbGVnYXRlOiAodHlwZW9mIGhhbmRsZXIgPT09ICdvYmplY3QnKVxuICAgICAgPyBkZWxlZ2F0ZUFsbChoYW5kbGVyKVxuICAgICAgOiBzZWxlY3RvclxuICAgICAgICA/IGRlbGVnYXRlKHNlbGVjdG9yLCBoYW5kbGVyKVxuICAgICAgICA6IGhhbmRsZXIsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9O1xuXG4gIGlmICh0eXBlLmluZGV4T2YoU1BBQ0UpID4gLTEpIHtcbiAgICByZXR1cm4gdHlwZS5zcGxpdChTUEFDRSkubWFwKGZ1bmN0aW9uKF90eXBlKSB7XG4gICAgICByZXR1cm4gYXNzaWduKHt0eXBlOiBfdHlwZX0sIGxpc3RlbmVyKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBsaXN0ZW5lci50eXBlID0gdHlwZTtcbiAgICByZXR1cm4gW2xpc3RlbmVyXTtcbiAgfVxufTtcblxudmFyIHBvcEtleSA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IG9ialtrZXldO1xuICBkZWxldGUgb2JqW2tleV07XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmVoYXZpb3IoZXZlbnRzLCBwcm9wcykge1xuICBjb25zdCBsaXN0ZW5lcnMgPSBPYmplY3Qua2V5cyhldmVudHMpXG4gICAgLnJlZHVjZShmdW5jdGlvbihtZW1vLCB0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzID0gZ2V0TGlzdGVuZXJzKHR5cGUsIGV2ZW50c1t0eXBlXSk7XG4gICAgICByZXR1cm4gbWVtby5jb25jYXQobGlzdGVuZXJzKTtcbiAgICB9LCBbXSk7XG5cbiAgcmV0dXJuIGFzc2lnbih7XG4gICAgYWRkOiBmdW5jdGlvbiBhZGRCZWhhdmlvcihlbGVtZW50KSB7XG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbihsaXN0ZW5lcikge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgbGlzdGVuZXIudHlwZSxcbiAgICAgICAgICBsaXN0ZW5lci5kZWxlZ2F0ZSxcbiAgICAgICAgICBsaXN0ZW5lci5vcHRpb25zXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlQmVoYXZpb3IoZWxlbWVudCkge1xuICAgICAgbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgIGxpc3RlbmVyLnR5cGUsXG4gICAgICAgICAgbGlzdGVuZXIuZGVsZWdhdGUsXG4gICAgICAgICAgbGlzdGVuZXIub3B0aW9uc1xuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCBwcm9wcyk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21wb3NlKGZ1bmN0aW9ucykge1xuICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiBmdW5jdGlvbnMuc29tZShmdW5jdGlvbihmbikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZSkgPT09IGZhbHNlO1xuICAgIH0sIHRoaXMpO1xuICB9O1xufTtcbiIsIi8vIHBvbHlmaWxsIEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3RcbnJlcXVpcmUoJ2VsZW1lbnQtY2xvc2VzdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlbGVnYXRlKHNlbGVjdG9yLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gZGVsZWdhdGlvbihldmVudCkge1xuICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQuY2xvc2VzdChzZWxlY3Rvcik7XG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGFyZ2V0LCBldmVudCk7XG4gICAgfVxuICB9XG59O1xuIiwiY29uc3QgZGVsZWdhdGUgPSByZXF1aXJlKCcuLi9kZWxlZ2F0ZScpO1xuY29uc3QgY29tcG9zZSA9IHJlcXVpcmUoJy4uL2NvbXBvc2UnKTtcblxuY29uc3QgU1BMQVQgPSAnKic7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVsZWdhdGVBbGwoc2VsZWN0b3JzKSB7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzZWxlY3RvcnMpXG5cbiAgLy8gWFhYIG9wdGltaXphdGlvbjogaWYgdGhlcmUgaXMgb25seSBvbmUgaGFuZGxlciBhbmQgaXQgYXBwbGllcyB0b1xuICAvLyBhbGwgZWxlbWVudHMgKHRoZSBcIipcIiBDU1Mgc2VsZWN0b3IpLCB0aGVuIGp1c3QgcmV0dXJuIHRoYXRcbiAgLy8gaGFuZGxlclxuICBpZiAoa2V5cy5sZW5ndGggPT09IDEgJiYga2V5c1swXSA9PT0gU1BMQVQpIHtcbiAgICByZXR1cm4gc2VsZWN0b3JzW1NQTEFUXTtcbiAgfVxuXG4gIGNvbnN0IGRlbGVnYXRlcyA9IGtleXMucmVkdWNlKGZ1bmN0aW9uKG1lbW8sIHNlbGVjdG9yKSB7XG4gICAgbWVtby5wdXNoKGRlbGVnYXRlKHNlbGVjdG9yLCBzZWxlY3RvcnNbc2VsZWN0b3JdKSk7XG4gICAgcmV0dXJuIG1lbW87XG4gIH0sIFtdKTtcbiAgcmV0dXJuIGNvbXBvc2UoZGVsZWdhdGVzKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlnbm9yZShlbGVtZW50LCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gaWdub3JhbmNlKGUpIHtcbiAgICBpZiAoZWxlbWVudCAhPT0gZS50YXJnZXQgJiYgIWVsZW1lbnQuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBlKTtcbiAgICB9XG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGJlaGF2aW9yOiAgICAgcmVxdWlyZSgnLi9iZWhhdmlvcicpLFxuICBkZWxlZ2F0ZTogICAgIHJlcXVpcmUoJy4vZGVsZWdhdGUnKSxcbiAgZGVsZWdhdGVBbGw6ICByZXF1aXJlKCcuL2RlbGVnYXRlQWxsJyksXG4gIGlnbm9yZTogICAgICAgcmVxdWlyZSgnLi9pZ25vcmUnKSxcbiAga2V5bWFwOiAgICAgICByZXF1aXJlKCcuL2tleW1hcCcpLFxufTtcbiIsInJlcXVpcmUoJ2tleWJvYXJkZXZlbnQta2V5LXBvbHlmaWxsJyk7XG5cbi8vIHRoZXNlIGFyZSB0aGUgb25seSByZWxldmFudCBtb2RpZmllcnMgc3VwcG9ydGVkIG9uIGFsbCBwbGF0Zm9ybXMsXG4vLyBhY2NvcmRpbmcgdG8gTUROOlxuLy8gPGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9LZXlib2FyZEV2ZW50L2dldE1vZGlmaWVyU3RhdGU+XG5jb25zdCBNT0RJRklFUlMgPSB7XG4gICdBbHQnOiAgICAgICdhbHRLZXknLFxuICAnQ29udHJvbCc6ICAnY3RybEtleScsXG4gICdDdHJsJzogICAgICdjdHJsS2V5JyxcbiAgJ1NoaWZ0JzogICAgJ3NoaWZ0S2V5J1xufTtcblxuY29uc3QgTU9ESUZJRVJfU0VQQVJBVE9SID0gJysnO1xuXG5jb25zdCBnZXRFdmVudEtleSA9IGZ1bmN0aW9uKGV2ZW50LCBoYXNNb2RpZmllcnMpIHtcbiAgdmFyIGtleSA9IGV2ZW50LmtleTtcbiAgaWYgKGhhc01vZGlmaWVycykge1xuICAgIGZvciAodmFyIG1vZGlmaWVyIGluIE1PRElGSUVSUykge1xuICAgICAgaWYgKGV2ZW50W01PRElGSUVSU1ttb2RpZmllcl1dID09PSB0cnVlKSB7XG4gICAgICAgIGtleSA9IFttb2RpZmllciwga2V5XS5qb2luKE1PRElGSUVSX1NFUEFSQVRPUik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBrZXk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGtleW1hcChrZXlzKSB7XG4gIGNvbnN0IGhhc01vZGlmaWVycyA9IE9iamVjdC5rZXlzKGtleXMpLnNvbWUoZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIGtleS5pbmRleE9mKE1PRElGSUVSX1NFUEFSQVRPUikgPiAtMTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciBrZXkgPSBnZXRFdmVudEtleShldmVudCwgaGFzTW9kaWZpZXJzKTtcbiAgICByZXR1cm4gW2tleSwga2V5LnRvTG93ZXJDYXNlKCldXG4gICAgICAucmVkdWNlKGZ1bmN0aW9uKHJlc3VsdCwgX2tleSkge1xuICAgICAgICBpZiAoX2tleSBpbiBrZXlzKSB7XG4gICAgICAgICAgcmVzdWx0ID0ga2V5c1trZXldLmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LCB1bmRlZmluZWQpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMuTU9ESUZJRVJTID0gTU9ESUZJRVJTO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBvbmNlKGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gIHZhciB3cmFwcGVkID0gZnVuY3Rpb24gd3JhcHBlZE9uY2UoZSkge1xuICAgIGUuY3VycmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGUudHlwZSwgd3JhcHBlZCwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIGxpc3RlbmVyLmNhbGwodGhpcywgZSk7XG4gIH07XG4gIHJldHVybiB3cmFwcGVkO1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUkVfVFJJTSA9IC8oXlxccyspfChcXHMrJCkvZztcbnZhciBSRV9TUExJVCA9IC9cXHMrLztcblxudmFyIHRyaW0gPSBTdHJpbmcucHJvdG90eXBlLnRyaW1cbiAgPyBmdW5jdGlvbihzdHIpIHsgcmV0dXJuIHN0ci50cmltKCk7IH1cbiAgOiBmdW5jdGlvbihzdHIpIHsgcmV0dXJuIHN0ci5yZXBsYWNlKFJFX1RSSU0sICcnKTsgfTtcblxudmFyIHF1ZXJ5QnlJZCA9IGZ1bmN0aW9uKGlkKSB7XG4gIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ1tpZD1cIicgKyBpZC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXCJdJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlc29sdmVJZHMoaWRzLCBkb2MpIHtcbiAgaWYgKHR5cGVvZiBpZHMgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhIHN0cmluZyBidXQgZ290ICcgKyAodHlwZW9mIGlkcykpO1xuICB9XG5cbiAgaWYgKCFkb2MpIHtcbiAgICBkb2MgPSB3aW5kb3cuZG9jdW1lbnQ7XG4gIH1cblxuICB2YXIgZ2V0RWxlbWVudEJ5SWQgPSBkb2MuZ2V0RWxlbWVudEJ5SWRcbiAgICA/IGRvYy5nZXRFbGVtZW50QnlJZC5iaW5kKGRvYylcbiAgICA6IHF1ZXJ5QnlJZC5iaW5kKGRvYyk7XG5cbiAgaWRzID0gdHJpbShpZHMpLnNwbGl0KFJFX1NQTElUKTtcblxuICAvLyBYWFggd2UgY2FuIHNob3J0LWNpcmN1aXQgaGVyZSBiZWNhdXNlIHRyaW1taW5nIGFuZCBzcGxpdHRpbmcgYVxuICAvLyBzdHJpbmcgb2YganVzdCB3aGl0ZXNwYWNlIHByb2R1Y2VzIGFuIGFycmF5IGNvbnRhaW5pbmcgYSBzaW5nbGUsXG4gIC8vIGVtcHR5IHN0cmluZ1xuICBpZiAoaWRzLmxlbmd0aCA9PT0gMSAmJiBpZHNbMF0gPT09ICcnKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcmV0dXJuIGlkc1xuICAgIC5tYXAoZnVuY3Rpb24oaWQpIHtcbiAgICAgIHZhciBlbCA9IGdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgIGlmICghZWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBlbGVtZW50IHdpdGggaWQ6IFwiJyArIGlkICsgJ1wiJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWw7XG4gICAgfSk7XG59O1xuIiwiY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4uL3V0aWxzL3NlbGVjdFwiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgdG9nZ2xlID0gcmVxdWlyZShcIi4uL3V0aWxzL3RvZ2dsZVwiKTtcbmNvbnN0IGlzRWxlbWVudEluVmlld3BvcnQgPSByZXF1aXJlKFwiLi4vdXRpbHMvaXMtaW4tdmlld3BvcnRcIik7XG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vZXZlbnRzXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKTtcblxuY29uc3QgQUNDT1JESU9OID0gYC4ke1BSRUZJWH0tYWNjb3JkaW9uLCAuJHtQUkVGSVh9LWFjY29yZGlvbi0tYm9yZGVyZWRgO1xuY29uc3QgQlVUVE9OID0gYC4ke1BSRUZJWH0tYWNjb3JkaW9uX19idXR0b25bYXJpYS1jb250cm9sc11gO1xuY29uc3QgRVhQQU5ERUQgPSBcImFyaWEtZXhwYW5kZWRcIjtcbmNvbnN0IE1VTFRJU0VMRUNUQUJMRSA9IFwiYXJpYS1tdWx0aXNlbGVjdGFibGVcIjtcblxuLyoqXG4gKiBHZXQgYW4gQXJyYXkgb2YgYnV0dG9uIGVsZW1lbnRzIGJlbG9uZ2luZyBkaXJlY3RseSB0byB0aGUgZ2l2ZW5cbiAqIGFjY29yZGlvbiBlbGVtZW50LlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYWNjb3JkaW9uXG4gKiBAcmV0dXJuIHthcnJheTxIVE1MQnV0dG9uRWxlbWVudD59XG4gKi9cbmNvbnN0IGdldEFjY29yZGlvbkJ1dHRvbnMgPSBhY2NvcmRpb24gPT4ge1xuICBjb25zdCBidXR0b25zID0gc2VsZWN0KEJVVFRPTiwgYWNjb3JkaW9uKTtcblxuICByZXR1cm4gYnV0dG9ucy5maWx0ZXIoYnV0dG9uID0+IGJ1dHRvbi5jbG9zZXN0KEFDQ09SRElPTikgPT09IGFjY29yZGlvbik7XG59O1xuXG4vKipcbiAqIFRvZ2dsZSBhIGJ1dHRvbidzIFwicHJlc3NlZFwiIHN0YXRlLCBvcHRpb25hbGx5IHByb3ZpZGluZyBhIHRhcmdldFxuICogc3RhdGUuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gYnV0dG9uXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBleHBhbmRlZCBJZiBubyBzdGF0ZSBpcyBwcm92aWRlZCwgdGhlIGN1cnJlbnRcbiAqIHN0YXRlIHdpbGwgYmUgdG9nZ2xlZCAoZnJvbSBmYWxzZSB0byB0cnVlLCBhbmQgdmljZS12ZXJzYSkuXG4gKiBAcmV0dXJuIHtib29sZWFufSB0aGUgcmVzdWx0aW5nIHN0YXRlXG4gKi9cbmNvbnN0IHRvZ2dsZUJ1dHRvbiA9IChidXR0b24sIGV4cGFuZGVkKSA9PiB7XG4gIGNvbnN0IGFjY29yZGlvbiA9IGJ1dHRvbi5jbG9zZXN0KEFDQ09SRElPTik7XG4gIGxldCBzYWZlRXhwYW5kZWQgPSBleHBhbmRlZDtcblxuICBpZiAoIWFjY29yZGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtCVVRUT059IGlzIG1pc3Npbmcgb3V0ZXIgJHtBQ0NPUkRJT059YCk7XG4gIH1cblxuICBzYWZlRXhwYW5kZWQgPSB0b2dnbGUoYnV0dG9uLCBleHBhbmRlZCk7XG5cbiAgLy8gWFhYIG11bHRpc2VsZWN0YWJsZSBpcyBvcHQtaW4sIHRvIHByZXNlcnZlIGxlZ2FjeSBiZWhhdmlvclxuICBjb25zdCBtdWx0aXNlbGVjdGFibGUgPSBhY2NvcmRpb24uZ2V0QXR0cmlidXRlKE1VTFRJU0VMRUNUQUJMRSkgPT09IFwidHJ1ZVwiO1xuXG4gIGlmIChzYWZlRXhwYW5kZWQgJiYgIW11bHRpc2VsZWN0YWJsZSkge1xuICAgIGdldEFjY29yZGlvbkJ1dHRvbnMoYWNjb3JkaW9uKS5mb3JFYWNoKG90aGVyID0+IHtcbiAgICAgIGlmIChvdGhlciAhPT0gYnV0dG9uKSB7XG4gICAgICAgIHRvZ2dsZShvdGhlciwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGJ1dHRvblxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZVxuICovXG5jb25zdCBzaG93QnV0dG9uID0gYnV0dG9uID0+IHRvZ2dsZUJ1dHRvbihidXR0b24sIHRydWUpO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGJ1dHRvblxuICogQHJldHVybiB7Ym9vbGVhbn0gZmFsc2VcbiAqL1xuY29uc3QgaGlkZUJ1dHRvbiA9IGJ1dHRvbiA9PiB0b2dnbGVCdXR0b24oYnV0dG9uLCBmYWxzZSk7XG5cbmNvbnN0IGFjY29yZGlvbiA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW0JVVFRPTl0oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0b2dnbGVCdXR0b24odGhpcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKEVYUEFOREVEKSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAvLyBXZSB3ZXJlIGp1c3QgZXhwYW5kZWQsIGJ1dCBpZiBhbm90aGVyIGFjY29yZGlvbiB3YXMgYWxzbyBqdXN0XG4gICAgICAgICAgLy8gY29sbGFwc2VkLCB3ZSBtYXkgbm8gbG9uZ2VyIGJlIGluIHRoZSB2aWV3cG9ydC4gVGhpcyBlbnN1cmVzXG4gICAgICAgICAgLy8gdGhhdCB3ZSBhcmUgc3RpbGwgdmlzaWJsZSwgc28gdGhlIHVzZXIgaXNuJ3QgY29uZnVzZWQuXG4gICAgICAgICAgaWYgKCFpc0VsZW1lbnRJblZpZXdwb3J0KHRoaXMpKSB0aGlzLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdChCVVRUT04sIHJvb3QpLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgY29uc3QgZXhwYW5kZWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKEVYUEFOREVEKSA9PT0gXCJ0cnVlXCI7XG4gICAgICAgIHRvZ2dsZUJ1dHRvbihidXR0b24sIGV4cGFuZGVkKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgQUNDT1JESU9OLFxuICAgIEJVVFRPTixcbiAgICBzaG93OiBzaG93QnV0dG9uLFxuICAgIGhpZGU6IGhpZGVCdXR0b24sXG4gICAgdG9nZ2xlOiB0b2dnbGVCdXR0b24sXG4gICAgZ2V0QnV0dG9uczogZ2V0QWNjb3JkaW9uQnV0dG9uc1xuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFjY29yZGlvbjtcbiIsImNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG5cbmNvbnN0IEhFQURFUiA9IGAuJHtQUkVGSVh9LWJhbm5lcl9faGVhZGVyYDtcbmNvbnN0IEVYUEFOREVEX0NMQVNTID0gYCR7UFJFRklYfS1iYW5uZXJfX2hlYWRlci0tZXhwYW5kZWRgO1xuXG5jb25zdCB0b2dnbGVCYW5uZXIgPSBmdW5jdGlvbiB0b2dnbGVFbChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB0aGlzLmNsb3Nlc3QoSEVBREVSKS5jbGFzc0xpc3QudG9nZ2xlKEVYUEFOREVEX0NMQVNTKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICBbQ0xJQ0tdOiB7XG4gICAgW2Ake0hFQURFUn0gW2FyaWEtY29udHJvbHNdYF06IHRvZ2dsZUJhbm5lclxuICB9XG59KTtcbiIsImNvbnN0IGRlYm91bmNlID0gcmVxdWlyZShcImxvZGFzaC5kZWJvdW5jZVwiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4uL3V0aWxzL3NlbGVjdFwiKTtcbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi9ldmVudHNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vY29uZmlnXCIpO1xuXG5jb25zdCBISURERU4gPSBcImhpZGRlblwiO1xuY29uc3QgU0NPUEUgPSBgLiR7UFJFRklYfS1mb290ZXItLWJpZ2A7XG5jb25zdCBOQVYgPSBgJHtTQ09QRX0gbmF2YDtcbmNvbnN0IEJVVFRPTiA9IGAke05BVn0gLiR7UFJFRklYfS1mb290ZXJfX3ByaW1hcnktbGlua2A7XG5jb25zdCBDT0xMQVBTSUJMRSA9IGAuJHtQUkVGSVh9LWZvb3Rlcl9fcHJpbWFyeS1jb250ZW50LS1jb2xsYXBzaWJsZWA7XG5cbmNvbnN0IEhJREVfTUFYX1dJRFRIID0gNDgwO1xuY29uc3QgREVCT1VOQ0VfUkFURSA9IDE4MDtcblxuZnVuY3Rpb24gc2hvd1BhbmVsKCkge1xuICBpZiAod2luZG93LmlubmVyV2lkdGggPCBISURFX01BWF9XSURUSCkge1xuICAgIGNvbnN0IGNvbGxhcHNlRWwgPSB0aGlzLmNsb3Nlc3QoQ09MTEFQU0lCTEUpO1xuICAgIGNvbGxhcHNlRWwuY2xhc3NMaXN0LnRvZ2dsZShISURERU4pO1xuXG4gICAgLy8gTkI6IHRoaXMgKnNob3VsZCogYWx3YXlzIHN1Y2NlZWQgYmVjYXVzZSB0aGUgYnV0dG9uXG4gICAgLy8gc2VsZWN0b3IgaXMgc2NvcGVkIHRvIFwiLntwcmVmaXh9LWZvb3Rlci1iaWcgbmF2XCJcbiAgICBjb25zdCBjb2xsYXBzaWJsZUVscyA9IHNlbGVjdChDT0xMQVBTSUJMRSwgY29sbGFwc2VFbC5jbG9zZXN0KE5BVikpO1xuXG4gICAgY29sbGFwc2libGVFbHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICBpZiAoZWwgIT09IGNvbGxhcHNlRWwpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChISURERU4pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmxldCBsYXN0SW5uZXJXaWR0aDtcblxuY29uc3QgcmVzaXplID0gZGVib3VuY2UoKCkgPT4ge1xuICBpZiAobGFzdElubmVyV2lkdGggPT09IHdpbmRvdy5pbm5lcldpZHRoKSByZXR1cm47XG4gIGxhc3RJbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gIGNvbnN0IGhpZGRlbiA9IHdpbmRvdy5pbm5lcldpZHRoIDwgSElERV9NQVhfV0lEVEg7XG4gIHNlbGVjdChDT0xMQVBTSUJMRSkuZm9yRWFjaChsaXN0ID0+IGxpc3QuY2xhc3NMaXN0LnRvZ2dsZShISURERU4sIGhpZGRlbikpO1xufSwgREVCT1VOQ0VfUkFURSk7XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3IoXG4gIHtcbiAgICBbQ0xJQ0tdOiB7XG4gICAgICBbQlVUVE9OXTogc2hvd1BhbmVsXG4gICAgfVxuICB9LFxuICB7XG4gICAgLy8gZXhwb3J0IGZvciB1c2UgZWxzZXdoZXJlXG4gICAgSElERV9NQVhfV0lEVEgsXG4gICAgREVCT1VOQ0VfUkFURSxcblxuICAgIGluaXQoKSB7XG4gICAgICByZXNpemUoKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlc2l6ZSk7XG4gICAgfSxcblxuICAgIHRlYXJkb3duKCkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVzaXplKTtcbiAgICB9XG4gIH1cbik7XG4iLCJjb25zdCBhY2NvcmRpb24gPSByZXF1aXJlKFwiLi9hY2NvcmRpb25cIik7XG5jb25zdCBiYW5uZXIgPSByZXF1aXJlKFwiLi9iYW5uZXJcIik7XG5jb25zdCBmb290ZXIgPSByZXF1aXJlKFwiLi9mb290ZXJcIik7XG5jb25zdCBuYXZpZ2F0aW9uID0gcmVxdWlyZShcIi4vbmF2aWdhdGlvblwiKTtcbmNvbnN0IHBhc3N3b3JkID0gcmVxdWlyZShcIi4vcGFzc3dvcmRcIik7XG5jb25zdCBzZWFyY2ggPSByZXF1aXJlKFwiLi9zZWFyY2hcIik7XG5jb25zdCBza2lwbmF2ID0gcmVxdWlyZShcIi4vc2tpcG5hdlwiKTtcbmNvbnN0IHZhbGlkYXRvciA9IHJlcXVpcmUoXCIuL3ZhbGlkYXRvclwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFjY29yZGlvbixcbiAgYmFubmVyLFxuICBmb290ZXIsXG4gIG5hdmlnYXRpb24sXG4gIHBhc3N3b3JkLFxuICBzZWFyY2gsXG4gIHNraXBuYXYsXG4gIHZhbGlkYXRvclxufTtcbiIsImNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4uL3V0aWxzL3NlbGVjdFwiKTtcbmNvbnN0IHRvZ2dsZSA9IHJlcXVpcmUoXCIuLi91dGlscy90b2dnbGVcIik7XG5jb25zdCBGb2N1c1RyYXAgPSByZXF1aXJlKFwiLi4vdXRpbHMvZm9jdXMtdHJhcFwiKTtcbmNvbnN0IGFjY29yZGlvbiA9IHJlcXVpcmUoXCIuL2FjY29yZGlvblwiKTtcblxuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG5cbmNvbnN0IEJPRFkgPSBcImJvZHlcIjtcbmNvbnN0IE5BViA9IGAuJHtQUkVGSVh9LW5hdmA7XG5jb25zdCBOQVZfTElOS1MgPSBgJHtOQVZ9IGFgO1xuY29uc3QgTkFWX0NPTlRST0wgPSBgYnV0dG9uLiR7UFJFRklYfS1uYXZfX2xpbmtgO1xuY29uc3QgT1BFTkVSUyA9IGAuJHtQUkVGSVh9LW1lbnUtYnRuYDtcbmNvbnN0IENMT1NFX0JVVFRPTiA9IGAuJHtQUkVGSVh9LW5hdl9fY2xvc2VgO1xuY29uc3QgT1ZFUkxBWSA9IGAuJHtQUkVGSVh9LW92ZXJsYXlgO1xuY29uc3QgQ0xPU0VSUyA9IGAke0NMT1NFX0JVVFRPTn0sIC4ke1BSRUZJWH0tb3ZlcmxheWA7XG5jb25zdCBUT0dHTEVTID0gW05BViwgT1ZFUkxBWV0uam9pbihcIiwgXCIpO1xuXG5jb25zdCBBQ1RJVkVfQ0xBU1MgPSBcInVzYS1qcy1tb2JpbGUtbmF2LS1hY3RpdmVcIjtcbmNvbnN0IFZJU0lCTEVfQ0xBU1MgPSBcImlzLXZpc2libGVcIjtcblxubGV0IG5hdmlnYXRpb247XG5sZXQgbmF2QWN0aXZlO1xuXG5jb25zdCBpc0FjdGl2ZSA9ICgpID0+IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKEFDVElWRV9DTEFTUyk7XG5cbmNvbnN0IHRvZ2dsZU5hdiA9IGFjdGl2ZSA9PiB7XG4gIGNvbnN0IHsgYm9keSB9ID0gZG9jdW1lbnQ7XG4gIGNvbnN0IHNhZmVBY3RpdmUgPSB0eXBlb2YgYWN0aXZlID09PSBcImJvb2xlYW5cIiA/IGFjdGl2ZSA6ICFpc0FjdGl2ZSgpO1xuXG4gIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZShBQ1RJVkVfQ0xBU1MsIHNhZmVBY3RpdmUpO1xuXG4gIHNlbGVjdChUT0dHTEVTKS5mb3JFYWNoKGVsID0+IGVsLmNsYXNzTGlzdC50b2dnbGUoVklTSUJMRV9DTEFTUywgc2FmZUFjdGl2ZSkpO1xuXG4gIG5hdmlnYXRpb24uZm9jdXNUcmFwLnVwZGF0ZShzYWZlQWN0aXZlKTtcblxuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGJvZHkucXVlcnlTZWxlY3RvcihDTE9TRV9CVVRUT04pO1xuICBjb25zdCBtZW51QnV0dG9uID0gYm9keS5xdWVyeVNlbGVjdG9yKE9QRU5FUlMpO1xuXG4gIGlmIChzYWZlQWN0aXZlICYmIGNsb3NlQnV0dG9uKSB7XG4gICAgLy8gVGhlIG1vYmlsZSBuYXYgd2FzIGp1c3QgYWN0aXZhdGVkLCBzbyBmb2N1cyBvbiB0aGUgY2xvc2UgYnV0dG9uLFxuICAgIC8vIHdoaWNoIGlzIGp1c3QgYmVmb3JlIGFsbCB0aGUgbmF2IGVsZW1lbnRzIGluIHRoZSB0YWIgb3JkZXIuXG4gICAgY2xvc2VCdXR0b24uZm9jdXMoKTtcbiAgfSBlbHNlIGlmIChcbiAgICAhc2FmZUFjdGl2ZSAmJlxuICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGNsb3NlQnV0dG9uICYmXG4gICAgbWVudUJ1dHRvblxuICApIHtcbiAgICAvLyBUaGUgbW9iaWxlIG5hdiB3YXMganVzdCBkZWFjdGl2YXRlZCwgYW5kIGZvY3VzIHdhcyBvbiB0aGUgY2xvc2VcbiAgICAvLyBidXR0b24sIHdoaWNoIGlzIG5vIGxvbmdlciB2aXNpYmxlLiBXZSBkb24ndCB3YW50IHRoZSBmb2N1cyB0b1xuICAgIC8vIGRpc2FwcGVhciBpbnRvIHRoZSB2b2lkLCBzbyBmb2N1cyBvbiB0aGUgbWVudSBidXR0b24gaWYgaXQnc1xuICAgIC8vIHZpc2libGUgKHRoaXMgbWF5IGhhdmUgYmVlbiB3aGF0IHRoZSB1c2VyIHdhcyBqdXN0IGZvY3VzZWQgb24sXG4gICAgLy8gaWYgdGhleSB0cmlnZ2VyZWQgdGhlIG1vYmlsZSBuYXYgYnkgbWlzdGFrZSkuXG4gICAgbWVudUJ1dHRvbi5mb2N1cygpO1xuICB9XG5cbiAgcmV0dXJuIHNhZmVBY3RpdmU7XG59O1xuXG5jb25zdCByZXNpemUgPSAoKSA9PiB7XG4gIGNvbnN0IGNsb3NlciA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcihDTE9TRV9CVVRUT04pO1xuXG4gIGlmIChpc0FjdGl2ZSgpICYmIGNsb3NlciAmJiBjbG9zZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggPT09IDApIHtcbiAgICAvLyBXaGVuIHRoZSBtb2JpbGUgbmF2IGlzIGFjdGl2ZSwgYW5kIHRoZSBjbG9zZSBib3ggaXNuJ3QgdmlzaWJsZSxcbiAgICAvLyB3ZSBrbm93IHRoZSB1c2VyJ3Mgdmlld3BvcnQgaGFzIGJlZW4gcmVzaXplZCB0byBiZSBsYXJnZXIuXG4gICAgLy8gTGV0J3MgbWFrZSB0aGUgcGFnZSBzdGF0ZSBjb25zaXN0ZW50IGJ5IGRlYWN0aXZhdGluZyB0aGUgbW9iaWxlIG5hdi5cbiAgICBuYXZpZ2F0aW9uLnRvZ2dsZU5hdi5jYWxsKGNsb3NlciwgZmFsc2UpO1xuICB9XG59O1xuXG5jb25zdCBvbk1lbnVDbG9zZSA9ICgpID0+IG5hdmlnYXRpb24udG9nZ2xlTmF2LmNhbGwobmF2aWdhdGlvbiwgZmFsc2UpO1xuY29uc3QgaGlkZUFjdGl2ZU5hdkRyb3Bkb3duID0gKCkgPT4ge1xuICB0b2dnbGUobmF2QWN0aXZlLCBmYWxzZSk7XG4gIG5hdkFjdGl2ZSA9IG51bGw7XG59O1xuXG5uYXZpZ2F0aW9uID0gYmVoYXZpb3IoXG4gIHtcbiAgICBbQ0xJQ0tdOiB7XG4gICAgICBbTkFWX0NPTlRST0xdKCkge1xuICAgICAgICAvLyBJZiBhbm90aGVyIG5hdiBpcyBvcGVuLCBjbG9zZSBpdFxuICAgICAgICBpZiAobmF2QWN0aXZlICYmIG5hdkFjdGl2ZSAhPT0gdGhpcykge1xuICAgICAgICAgIGhpZGVBY3RpdmVOYXZEcm9wZG93bigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3JlIGEgcmVmZXJlbmNlIHRvIHRoZSBsYXN0IGNsaWNrZWQgbmF2IGxpbmsgZWxlbWVudCwgc28gd2VcbiAgICAgICAgLy8gY2FuIGhpZGUgdGhlIGRyb3Bkb3duIGlmIGFub3RoZXIgZWxlbWVudCBvbiB0aGUgcGFnZSBpcyBjbGlja2VkXG4gICAgICAgIGlmIChuYXZBY3RpdmUpIHtcbiAgICAgICAgICBoaWRlQWN0aXZlTmF2RHJvcGRvd24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuYXZBY3RpdmUgPSB0aGlzO1xuICAgICAgICAgIHRvZ2dsZShuYXZBY3RpdmUsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRG8gdGhpcyBzbyB0aGUgZXZlbnQgaGFuZGxlciBvbiB0aGUgYm9keSBkb2Vzbid0IGZpcmVcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcbiAgICAgIFtCT0RZXSgpIHtcbiAgICAgICAgaWYgKG5hdkFjdGl2ZSkge1xuICAgICAgICAgIGhpZGVBY3RpdmVOYXZEcm9wZG93bigpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgW09QRU5FUlNdOiB0b2dnbGVOYXYsXG4gICAgICBbQ0xPU0VSU106IHRvZ2dsZU5hdixcbiAgICAgIFtOQVZfTElOS1NdKCkge1xuICAgICAgICAvLyBBIG5hdmlnYXRpb24gbGluayBoYXMgYmVlbiBjbGlja2VkISBXZSB3YW50IHRvIGNvbGxhcHNlIGFueVxuICAgICAgICAvLyBoaWVyYXJjaGljYWwgbmF2aWdhdGlvbiBVSSBpdCdzIGEgcGFydCBvZiwgc28gdGhhdCB0aGUgdXNlclxuICAgICAgICAvLyBjYW4gZm9jdXMgb24gd2hhdGV2ZXIgdGhleSd2ZSBqdXN0IHNlbGVjdGVkLlxuXG4gICAgICAgIC8vIFNvbWUgbmF2aWdhdGlvbiBsaW5rcyBhcmUgaW5zaWRlIGFjY29yZGlvbnM7IHdoZW4gdGhleSdyZVxuICAgICAgICAvLyBjbGlja2VkLCB3ZSB3YW50IHRvIGNvbGxhcHNlIHRob3NlIGFjY29yZGlvbnMuXG4gICAgICAgIGNvbnN0IGFjYyA9IHRoaXMuY2xvc2VzdChhY2NvcmRpb24uQUNDT1JESU9OKTtcblxuICAgICAgICBpZiAoYWNjKSB7XG4gICAgICAgICAgYWNjb3JkaW9uLmdldEJ1dHRvbnMoYWNjKS5mb3JFYWNoKGJ0biA9PiBhY2NvcmRpb24uaGlkZShidG4pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZSBtb2JpbGUgbmF2aWdhdGlvbiBtZW51IGlzIGFjdGl2ZSwgd2Ugd2FudCB0byBoaWRlIGl0LlxuICAgICAgICBpZiAoaXNBY3RpdmUoKSkge1xuICAgICAgICAgIG5hdmlnYXRpb24udG9nZ2xlTmF2LmNhbGwobmF2aWdhdGlvbiwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBjb25zdCB0cmFwQ29udGFpbmVyID0gcm9vdC5xdWVyeVNlbGVjdG9yKE5BVik7XG5cbiAgICAgIGlmICh0cmFwQ29udGFpbmVyKSB7XG4gICAgICAgIG5hdmlnYXRpb24uZm9jdXNUcmFwID0gRm9jdXNUcmFwKHRyYXBDb250YWluZXIsIHtcbiAgICAgICAgICBFc2NhcGU6IG9uTWVudUNsb3NlXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXNpemUoKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlc2l6ZSwgZmFsc2UpO1xuICAgIH0sXG4gICAgdGVhcmRvd24oKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZXNpemUsIGZhbHNlKTtcbiAgICAgIG5hdkFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG4gICAgZm9jdXNUcmFwOiBudWxsLFxuICAgIHRvZ2dsZU5hdlxuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdmlnYXRpb247XG4iLCJjb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHRvZ2dsZUZvcm1JbnB1dCA9IHJlcXVpcmUoXCIuLi91dGlscy90b2dnbGUtZm9ybS1pbnB1dFwiKTtcblxuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG5cbmNvbnN0IExJTksgPSBgLiR7UFJFRklYfS1zaG93LXBhc3N3b3JkLCAuJHtQUkVGSVh9LXNob3ctbXVsdGlwYXNzd29yZGA7XG5cbmZ1bmN0aW9uIHRvZ2dsZShldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB0b2dnbGVGb3JtSW5wdXQodGhpcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICBbQ0xJQ0tdOiB7XG4gICAgW0xJTktdOiB0b2dnbGVcbiAgfVxufSk7XG4iLCJjb25zdCBpZ25vcmUgPSByZXF1aXJlKFwicmVjZXB0b3IvaWdub3JlXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKFwiLi4vdXRpbHMvc2VsZWN0XCIpO1xuXG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vZXZlbnRzXCIpO1xuXG5jb25zdCBCVVRUT04gPSBcIi5qcy1zZWFyY2gtYnV0dG9uXCI7XG5jb25zdCBGT1JNID0gXCIuanMtc2VhcmNoLWZvcm1cIjtcbmNvbnN0IElOUFVUID0gXCJbdHlwZT1zZWFyY2hdXCI7XG5jb25zdCBDT05URVhUID0gXCJoZWFkZXJcIjsgLy8gWFhYXG5cbmxldCBsYXN0QnV0dG9uO1xuXG5jb25zdCBnZXRGb3JtID0gYnV0dG9uID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGJ1dHRvbi5jbG9zZXN0KENPTlRFWFQpO1xuICByZXR1cm4gY29udGV4dCA/IGNvbnRleHQucXVlcnlTZWxlY3RvcihGT1JNKSA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoRk9STSk7XG59O1xuXG5jb25zdCB0b2dnbGVTZWFyY2ggPSAoYnV0dG9uLCBhY3RpdmUpID0+IHtcbiAgY29uc3QgZm9ybSA9IGdldEZvcm0oYnV0dG9uKTtcblxuICBpZiAoIWZvcm0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vICR7Rk9STX0gZm91bmQgZm9yIHNlYXJjaCB0b2dnbGUgaW4gJHtDT05URVhUfSFgKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gIGJ1dHRvbi5oaWRkZW4gPSBhY3RpdmU7XG4gIGZvcm0uaGlkZGVuID0gIWFjdGl2ZTtcbiAgLyogZXNsaW50LWVuYWJsZSAqL1xuXG4gIGlmICghYWN0aXZlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgaW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoSU5QVVQpO1xuXG4gIGlmIChpbnB1dCkge1xuICAgIGlucHV0LmZvY3VzKCk7XG4gIH1cbiAgLy8gd2hlbiB0aGUgdXNlciBjbGlja3MgX291dHNpZGVfIG9mIHRoZSBmb3JtIHcvaWdub3JlKCk6IGhpZGUgdGhlXG4gIC8vIHNlYXJjaCwgdGhlbiByZW1vdmUgdGhlIGxpc3RlbmVyXG4gIGNvbnN0IGxpc3RlbmVyID0gaWdub3JlKGZvcm0sICgpID0+IHtcbiAgICBpZiAobGFzdEJ1dHRvbikge1xuICAgICAgaGlkZVNlYXJjaC5jYWxsKGxhc3RCdXR0b24pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKENMSUNLLCBsaXN0ZW5lcik7XG4gIH0pO1xuXG4gIC8vIE5vcm1hbGx5IHdlIHdvdWxkIGp1c3QgcnVuIHRoaXMgY29kZSB3aXRob3V0IGEgdGltZW91dCwgYnV0XG4gIC8vIElFMTEgYW5kIEVkZ2Ugd2lsbCBhY3R1YWxseSBjYWxsIHRoZSBsaXN0ZW5lciAqaW1tZWRpYXRlbHkqIGJlY2F1c2VcbiAgLy8gdGhleSBhcmUgY3VycmVudGx5IGhhbmRsaW5nIHRoaXMgZXhhY3QgdHlwZSBvZiBldmVudCwgc28gd2UnbGxcbiAgLy8gbWFrZSBzdXJlIHRoZSBicm93c2VyIGlzIGRvbmUgaGFuZGxpbmcgdGhlIGN1cnJlbnQgY2xpY2sgZXZlbnQsXG4gIC8vIGlmIGFueSwgYmVmb3JlIHdlIGF0dGFjaCB0aGUgbGlzdGVuZXIuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihDTElDSywgbGlzdGVuZXIpO1xuICB9LCAwKTtcbn07XG5cbmZ1bmN0aW9uIHNob3dTZWFyY2goKSB7XG4gIHRvZ2dsZVNlYXJjaCh0aGlzLCB0cnVlKTtcbiAgbGFzdEJ1dHRvbiA9IHRoaXM7XG59XG5cbmZ1bmN0aW9uIGhpZGVTZWFyY2goKSB7XG4gIHRvZ2dsZVNlYXJjaCh0aGlzLCBmYWxzZSk7XG4gIGxhc3RCdXR0b24gPSB1bmRlZmluZWQ7XG59XG5cbmNvbnN0IHNlYXJjaCA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW0JVVFRPTl06IHNob3dTZWFyY2hcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBpbml0KHRhcmdldCkge1xuICAgICAgc2VsZWN0KEJVVFRPTiwgdGFyZ2V0KS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIHRvZ2dsZVNlYXJjaChidXR0b24sIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgdGVhcmRvd24oKSB7XG4gICAgICAvLyBmb3JnZXQgdGhlIGxhc3QgYnV0dG9uIGNsaWNrZWRcbiAgICAgIGxhc3RCdXR0b24gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlYXJjaDtcbiIsImNvbnN0IG9uY2UgPSByZXF1aXJlKFwicmVjZXB0b3Ivb25jZVwiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG5cbmNvbnN0IExJTksgPSBgLiR7UFJFRklYfS1za2lwbmF2W2hyZWZePVwiI1wiXSwgLiR7UFJFRklYfS1mb290ZXJfX3JldHVybi10by10b3AgW2hyZWZePVwiI1wiXWA7XG5jb25zdCBNQUlOQ09OVEVOVCA9IFwibWFpbi1jb250ZW50XCI7XG5cbmZ1bmN0aW9uIHNldFRhYmluZGV4KCkge1xuICAvLyBOQjogd2Uga25vdyBiZWNhdXNlIG9mIHRoZSBzZWxlY3RvciB3ZSdyZSBkZWxlZ2F0aW5nIHRvIGJlbG93IHRoYXQgdGhlXG4gIC8vIGhyZWYgYWxyZWFkeSBiZWdpbnMgd2l0aCAnIydcbiAgY29uc3QgaWQgPSB0aGlzLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgIGlkID09PSBcIiNcIiA/IE1BSU5DT05URU5UIDogaWQuc2xpY2UoMSlcbiAgKTtcblxuICBpZiAodGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnN0eWxlLm91dGxpbmUgPSBcIjBcIjtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgMCk7XG4gICAgdGFyZ2V0LmZvY3VzKCk7XG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcImJsdXJcIixcbiAgICAgIG9uY2UoKCkgPT4ge1xuICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgLTEpO1xuICAgICAgfSlcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIHRocm93IGFuIGVycm9yP1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICBbQ0xJQ0tdOiB7XG4gICAgW0xJTktdOiBzZXRUYWJpbmRleFxuICB9XG59KTtcbiIsImNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgdmFsaWRhdGUgPSByZXF1aXJlKFwiLi4vdXRpbHMvdmFsaWRhdGUtaW5wdXRcIik7XG5cbmZ1bmN0aW9uIGNoYW5nZSgpIHtcbiAgdmFsaWRhdGUodGhpcyk7XG59XG5cbmNvbnN0IHZhbGlkYXRvciA9IGJlaGF2aW9yKHtcbiAgXCJrZXl1cCBjaGFuZ2VcIjoge1xuICAgIFwiaW5wdXRbZGF0YS12YWxpZGF0aW9uLWVsZW1lbnRdXCI6IGNoYW5nZVxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSB2YWxpZGF0b3I7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHJlZml4OiBcInVzYVwiXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIFRoaXMgdXNlZCB0byBiZSBjb25kaXRpb25hbGx5IGRlcGVuZGVudCBvbiB3aGV0aGVyIHRoZVxuICAvLyBicm93c2VyIHN1cHBvcnRlZCB0b3VjaCBldmVudHM7IGlmIGl0IGRpZCwgYENMSUNLYCB3YXMgc2V0IHRvXG4gIC8vIGB0b3VjaHN0YXJ0YC4gIEhvd2V2ZXIsIHRoaXMgaGFkIGRvd25zaWRlczpcbiAgLy9cbiAgLy8gKiBJdCBwcmUtZW1wdGVkIG1vYmlsZSBicm93c2VycycgZGVmYXVsdCBiZWhhdmlvciBvZiBkZXRlY3RpbmdcbiAgLy8gICB3aGV0aGVyIGEgdG91Y2ggdHVybmVkIGludG8gYSBzY3JvbGwsIHRoZXJlYnkgcHJldmVudGluZ1xuICAvLyAgIHVzZXJzIGZyb20gdXNpbmcgc29tZSBvZiBvdXIgY29tcG9uZW50cyBhcyBzY3JvbGwgc3VyZmFjZXMuXG4gIC8vXG4gIC8vICogU29tZSBkZXZpY2VzLCBzdWNoIGFzIHRoZSBNaWNyb3NvZnQgU3VyZmFjZSBQcm8sIHN1cHBvcnQgKmJvdGgqXG4gIC8vICAgdG91Y2ggYW5kIGNsaWNrcy4gVGhpcyBtZWFudCB0aGUgY29uZGl0aW9uYWwgZWZmZWN0aXZlbHkgZHJvcHBlZFxuICAvLyAgIHN1cHBvcnQgZm9yIHRoZSB1c2VyJ3MgbW91c2UsIGZydXN0cmF0aW5nIHVzZXJzIHdobyBwcmVmZXJyZWRcbiAgLy8gICBpdCBvbiB0aG9zZSBzeXN0ZW1zLlxuICBDTElDSzogXCJjbGlja1wiXG59O1xuIiwiY29uc3QgZWxwcm90byA9IHdpbmRvdy5IVE1MRWxlbWVudC5wcm90b3R5cGU7XG5jb25zdCBISURERU4gPSBcImhpZGRlblwiO1xuXG5pZiAoIShISURERU4gaW4gZWxwcm90bykpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVscHJvdG8sIEhJRERFTiwge1xuICAgIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShISURERU4pO1xuICAgIH0sXG4gICAgc2V0KHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoSElEREVOLCBcIlwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKEhJRERFTik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cbiIsIi8vIHBvbHlmaWxscyBIVE1MRWxlbWVudC5wcm90b3R5cGUuY2xhc3NMaXN0IGFuZCBET01Ub2tlbkxpc3RcbnJlcXVpcmUoXCJjbGFzc2xpc3QtcG9seWZpbGxcIik7XG4vLyBwb2x5ZmlsbHMgSFRNTEVsZW1lbnQucHJvdG90eXBlLmhpZGRlblxucmVxdWlyZShcIi4vZWxlbWVudC1oaWRkZW5cIik7XG4iLCJjb25zdCBkb21yZWFkeSA9IHJlcXVpcmUoXCJkb21yZWFkeVwiKTtcblxuLyoqXG4gKiBUaGUgJ3BvbHlmaWxscycgZGVmaW5lIGtleSBFQ01BU2NyaXB0IDUgbWV0aG9kcyB0aGF0IG1heSBiZSBtaXNzaW5nIGZyb21cbiAqIG9sZGVyIGJyb3dzZXJzLCBzbyBtdXN0IGJlIGxvYWRlZCBmaXJzdC5cbiAqL1xucmVxdWlyZShcIi4vcG9seWZpbGxzXCIpO1xuXG5jb25zdCB1c3dkcyA9IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKTtcblxuY29uc3QgY29tcG9uZW50cyA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHNcIik7XG5cbnVzd2RzLmNvbXBvbmVudHMgPSBjb21wb25lbnRzO1xuXG5kb21yZWFkeSgoKSA9PiB7XG4gIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmJvZHk7XG4gIE9iamVjdC5rZXlzKGNvbXBvbmVudHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICBjb25zdCBiZWhhdmlvciA9IGNvbXBvbmVudHNba2V5XTtcbiAgICBiZWhhdmlvci5vbih0YXJnZXQpO1xuICB9KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVzd2RzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSAoaHRtbERvY3VtZW50ID0gZG9jdW1lbnQpID0+IGh0bWxEb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuIiwiY29uc3QgYXNzaWduID0gcmVxdWlyZShcIm9iamVjdC1hc3NpZ25cIik7XG5jb25zdCBCZWhhdmlvciA9IHJlcXVpcmUoXCJyZWNlcHRvci9iZWhhdmlvclwiKTtcblxuLyoqXG4gKiBAbmFtZSBzZXF1ZW5jZVxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gc2VxIGFuIGFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybiB7IGNsb3N1cmUgfSBjYWxsSG9va3NcbiAqL1xuLy8gV2UgdXNlIGEgbmFtZWQgZnVuY3Rpb24gaGVyZSBiZWNhdXNlIHdlIHdhbnQgaXQgdG8gaW5oZXJpdCBpdHMgbGV4aWNhbCBzY29wZVxuLy8gZnJvbSB0aGUgYmVoYXZpb3IgcHJvcHMgb2JqZWN0LCBub3QgZnJvbSB0aGUgbW9kdWxlXG5jb25zdCBzZXF1ZW5jZSA9ICguLi5zZXEpID0+XG4gIGZ1bmN0aW9uIGNhbGxIb29rcyh0YXJnZXQgPSBkb2N1bWVudC5ib2R5KSB7XG4gICAgc2VxLmZvckVhY2gobWV0aG9kID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdGhpc1ttZXRob2RdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhpc1ttZXRob2RdLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuLyoqXG4gKiBAbmFtZSBiZWhhdmlvclxuICogQHBhcmFtIHtvYmplY3R9IGV2ZW50c1xuICogQHBhcmFtIHtvYmplY3Q/fSBwcm9wc1xuICogQHJldHVybiB7cmVjZXB0b3IuYmVoYXZpb3J9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGV2ZW50cywgcHJvcHMpID0+XG4gIEJlaGF2aW9yKFxuICAgIGV2ZW50cyxcbiAgICBhc3NpZ24oXG4gICAgICB7XG4gICAgICAgIG9uOiBzZXF1ZW5jZShcImluaXRcIiwgXCJhZGRcIiksXG4gICAgICAgIG9mZjogc2VxdWVuY2UoXCJ0ZWFyZG93blwiLCBcInJlbW92ZVwiKVxuICAgICAgfSxcbiAgICAgIHByb3BzXG4gICAgKVxuICApO1xuIiwiY29uc3QgYXNzaWduID0gcmVxdWlyZShcIm9iamVjdC1hc3NpZ25cIik7XG5jb25zdCB7IGtleW1hcCB9ID0gcmVxdWlyZShcInJlY2VwdG9yXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi9iZWhhdmlvclwiKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuL3NlbGVjdFwiKTtcbmNvbnN0IGFjdGl2ZUVsZW1lbnQgPSByZXF1aXJlKFwiLi9hY3RpdmUtZWxlbWVudFwiKTtcblxuY29uc3QgRk9DVVNBQkxFID1cbiAgJ2FbaHJlZl0sIGFyZWFbaHJlZl0sIGlucHV0Om5vdChbZGlzYWJsZWRdKSwgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSwgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLCBidXR0b246bm90KFtkaXNhYmxlZF0pLCBpZnJhbWUsIG9iamVjdCwgZW1iZWQsIFt0YWJpbmRleD1cIjBcIl0sIFtjb250ZW50ZWRpdGFibGVdJztcblxuY29uc3QgdGFiSGFuZGxlciA9IGNvbnRleHQgPT4ge1xuICBjb25zdCBmb2N1c2FibGVFbGVtZW50cyA9IHNlbGVjdChGT0NVU0FCTEUsIGNvbnRleHQpO1xuICBjb25zdCBmaXJzdFRhYlN0b3AgPSBmb2N1c2FibGVFbGVtZW50c1swXTtcbiAgY29uc3QgbGFzdFRhYlN0b3AgPSBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxXTtcblxuICAvLyBTcGVjaWFsIHJ1bGVzIGZvciB3aGVuIHRoZSB1c2VyIGlzIHRhYmJpbmcgZm9yd2FyZCBmcm9tIHRoZSBsYXN0IGZvY3VzYWJsZSBlbGVtZW50LFxuICAvLyBvciB3aGVuIHRhYmJpbmcgYmFja3dhcmRzIGZyb20gdGhlIGZpcnN0IGZvY3VzYWJsZSBlbGVtZW50XG4gIGZ1bmN0aW9uIHRhYkFoZWFkKGV2ZW50KSB7XG4gICAgaWYgKGFjdGl2ZUVsZW1lbnQoKSA9PT0gbGFzdFRhYlN0b3ApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBmaXJzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0YWJCYWNrKGV2ZW50KSB7XG4gICAgaWYgKGFjdGl2ZUVsZW1lbnQoKSA9PT0gZmlyc3RUYWJTdG9wKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGFzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGZpcnN0VGFiU3RvcCxcbiAgICBsYXN0VGFiU3RvcCxcbiAgICB0YWJBaGVhZCxcbiAgICB0YWJCYWNrXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChjb250ZXh0LCBhZGRpdGlvbmFsS2V5QmluZGluZ3MgPSB7fSkgPT4ge1xuICBjb25zdCB0YWJFdmVudEhhbmRsZXIgPSB0YWJIYW5kbGVyKGNvbnRleHQpO1xuXG4gIC8vICBUT0RPOiBJbiB0aGUgZnV0dXJlLCBsb29wIG92ZXIgYWRkaXRpb25hbCBrZXliaW5kaW5ncyBhbmQgcGFzcyBhbiBhcnJheVxuICAvLyBvZiBmdW5jdGlvbnMsIGlmIG5lY2Vzc2FyeSwgdG8gdGhlIG1hcCBrZXlzLiBUaGVuIHBlb3BsZSBpbXBsZW1lbnRpbmdcbiAgLy8gdGhlIGZvY3VzIHRyYXAgY291bGQgcGFzcyBjYWxsYmFja3MgdG8gZmlyZSB3aGVuIHRhYmJpbmdcbiAgY29uc3Qga2V5TWFwcGluZ3MgPSBrZXltYXAoXG4gICAgYXNzaWduKFxuICAgICAge1xuICAgICAgICBUYWI6IHRhYkV2ZW50SGFuZGxlci50YWJBaGVhZCxcbiAgICAgICAgXCJTaGlmdCtUYWJcIjogdGFiRXZlbnRIYW5kbGVyLnRhYkJhY2tcbiAgICAgIH0sXG4gICAgICBhZGRpdGlvbmFsS2V5QmluZGluZ3NcbiAgICApXG4gICk7XG5cbiAgY29uc3QgZm9jdXNUcmFwID0gYmVoYXZpb3IoXG4gICAge1xuICAgICAga2V5ZG93bjoga2V5TWFwcGluZ3NcbiAgICB9LFxuICAgIHtcbiAgICAgIGluaXQoKSB7XG4gICAgICAgIC8vIFRPRE86IGlzIHRoaXMgZGVzaXJlYWJsZSBiZWhhdmlvcj8gU2hvdWxkIHRoZSB0cmFwIGFsd2F5cyBkbyB0aGlzIGJ5IGRlZmF1bHQgb3Igc2hvdWxkXG4gICAgICAgIC8vIHRoZSBjb21wb25lbnQgZ2V0dGluZyBkZWNvcmF0ZWQgaGFuZGxlIHRoaXM/XG4gICAgICAgIHRhYkV2ZW50SGFuZGxlci5maXJzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICAgIH0sXG4gICAgICB1cGRhdGUoaXNBY3RpdmUpIHtcbiAgICAgICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICAgICAgdGhpcy5vbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub2ZmKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIGZvY3VzVHJhcDtcbn07XG4iLCIvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNzU1NzQzM1xuZnVuY3Rpb24gaXNFbGVtZW50SW5WaWV3cG9ydChcbiAgZWwsXG4gIHdpbiA9IHdpbmRvdyxcbiAgZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcbikge1xuICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgcmV0dXJuIChcbiAgICByZWN0LnRvcCA+PSAwICYmXG4gICAgcmVjdC5sZWZ0ID49IDAgJiZcbiAgICByZWN0LmJvdHRvbSA8PSAod2luLmlubmVySGVpZ2h0IHx8IGRvY0VsLmNsaWVudEhlaWdodCkgJiZcbiAgICByZWN0LnJpZ2h0IDw9ICh3aW4uaW5uZXJXaWR0aCB8fCBkb2NFbC5jbGllbnRXaWR0aClcbiAgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0VsZW1lbnRJblZpZXdwb3J0O1xuIiwiLyoqXG4gKiBAbmFtZSBpc0VsZW1lbnRcbiAqIEBkZXNjIHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGEgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzRWxlbWVudCA9IHZhbHVlID0+XG4gIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZS5ub2RlVHlwZSA9PT0gMTtcblxuLyoqXG4gKiBAbmFtZSBzZWxlY3RcbiAqIEBkZXNjIHNlbGVjdHMgZWxlbWVudHMgZnJvbSB0aGUgRE9NIGJ5IGNsYXNzIHNlbGVjdG9yIG9yIElEIHNlbGVjdG9yLlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIC0gVGhlIHNlbGVjdG9yIHRvIHRyYXZlcnNlIHRoZSBET00gd2l0aC5cbiAqIEBwYXJhbSB7RG9jdW1lbnR8SFRNTEVsZW1lbnQ/fSBjb250ZXh0IC0gVGhlIGNvbnRleHQgdG8gdHJhdmVyc2UgdGhlIERPTVxuICogICBpbi4gSWYgbm90IHByb3ZpZGVkLCBpdCBkZWZhdWx0cyB0byB0aGUgZG9jdW1lbnQuXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudFtdfSAtIEFuIGFycmF5IG9mIERPTSBub2RlcyBvciBhbiBlbXB0eSBhcnJheS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoc2VsZWN0b3IsIGNvbnRleHQpID0+IHtcbiAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGlmICghY29udGV4dCB8fCAhaXNFbGVtZW50KGNvbnRleHQpKSB7XG4gICAgY29udGV4dCA9IHdpbmRvdy5kb2N1bWVudDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICB9XG5cbiAgY29uc3Qgc2VsZWN0aW9uID0gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHNlbGVjdGlvbik7XG59O1xuIiwiLyoqXG4gKiBGbGlwcyBnaXZlbiBJTlBVVCBlbGVtZW50cyBiZXR3ZWVuIG1hc2tlZCAoaGlkaW5nIHRoZSBmaWVsZCB2YWx1ZSkgYW5kIHVubWFza2VkXG4gKiBAcGFyYW0ge0FycmF5LkhUTUxFbGVtZW50fSBmaWVsZHMgLSBBbiBhcnJheSBvZiBJTlBVVCBlbGVtZW50c1xuICogQHBhcmFtIHtCb29sZWFufSBtYXNrIC0gV2hldGhlciB0aGUgbWFzayBzaG91bGQgYmUgYXBwbGllZCwgaGlkaW5nIHRoZSBmaWVsZCB2YWx1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChmaWVsZCwgbWFzaykgPT4ge1xuICBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJhdXRvY2FwaXRhbGl6ZVwiLCBcIm9mZlwiKTtcbiAgZmllbGQuc2V0QXR0cmlidXRlKFwiYXV0b2NvcnJlY3RcIiwgXCJvZmZcIik7XG4gIGZpZWxkLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgbWFzayA/IFwicGFzc3dvcmRcIiA6IFwidGV4dFwiKTtcbn07XG4iLCJjb25zdCByZXNvbHZlSWRSZWZzID0gcmVxdWlyZShcInJlc29sdmUtaWQtcmVmc1wiKTtcbmNvbnN0IHRvZ2dsZUZpZWxkTWFzayA9IHJlcXVpcmUoXCIuL3RvZ2dsZS1maWVsZC1tYXNrXCIpO1xuXG5jb25zdCBDT05UUk9MUyA9IFwiYXJpYS1jb250cm9sc1wiO1xuY29uc3QgUFJFU1NFRCA9IFwiYXJpYS1wcmVzc2VkXCI7XG5jb25zdCBTSE9XX0FUVFIgPSBcImRhdGEtc2hvdy10ZXh0XCI7XG5jb25zdCBISURFX0FUVFIgPSBcImRhdGEtaGlkZS10ZXh0XCI7XG5cbi8qKlxuICogUmVwbGFjZSB0aGUgd29yZCBcIlNob3dcIiAob3IgXCJzaG93XCIpIHdpdGggXCJIaWRlXCIgKG9yIFwiaGlkZVwiKSBpbiBhIHN0cmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzaG93VGV4dFxuICogQHJldHVybiB7c3Ryb25nfSBoaWRlVGV4dFxuICovXG5jb25zdCBnZXRIaWRlVGV4dCA9IHNob3dUZXh0ID0+XG4gIHNob3dUZXh0LnJlcGxhY2UoL1xcYlNob3dcXGIvaSwgc2hvdyA9PiBgJHtzaG93WzBdID09PSBcIlNcIiA/IFwiSFwiIDogXCJoXCJ9aWRlYCk7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgZGVjb3JhdGVzIGFuIEhUTUwgZWxlbWVudCB3aXRoIHRoZSBhYmlsaXR5IHRvIHRvZ2dsZSB0aGVcbiAqIG1hc2tlZCBzdGF0ZSBvZiBhbiBpbnB1dCBmaWVsZCAobGlrZSBhIHBhc3N3b3JkKSB3aGVuIGNsaWNrZWQuXG4gKiBUaGUgaWRzIG9mIHRoZSBmaWVsZHMgdG8gYmUgbWFza2VkIHdpbGwgYmUgcHVsbGVkIGRpcmVjdGx5IGZyb20gdGhlIGJ1dHRvbidzXG4gKiBgYXJpYS1jb250cm9sc2AgYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbCAgICBQYXJlbnQgZWxlbWVudCBjb250YWluaW5nIHRoZSBmaWVsZHMgdG8gYmUgbWFza2VkXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGVsID0+IHtcbiAgLy8gdGhpcyBpcyB0aGUgKnRhcmdldCogc3RhdGU6XG4gIC8vICogaWYgdGhlIGVsZW1lbnQgaGFzIHRoZSBhdHRyIGFuZCBpdCdzICE9PSBcInRydWVcIiwgcHJlc3NlZCBpcyB0cnVlXG4gIC8vICogb3RoZXJ3aXNlLCBwcmVzc2VkIGlzIGZhbHNlXG4gIGNvbnN0IHByZXNzZWQgPVxuICAgIGVsLmhhc0F0dHJpYnV0ZShQUkVTU0VEKSAmJiBlbC5nZXRBdHRyaWJ1dGUoUFJFU1NFRCkgIT09IFwidHJ1ZVwiO1xuXG4gIGNvbnN0IGZpZWxkcyA9IHJlc29sdmVJZFJlZnMoZWwuZ2V0QXR0cmlidXRlKENPTlRST0xTKSk7XG4gIGZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHRvZ2dsZUZpZWxkTWFzayhmaWVsZCwgcHJlc3NlZCkpO1xuXG4gIGlmICghZWwuaGFzQXR0cmlidXRlKFNIT1dfQVRUUikpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoU0hPV19BVFRSLCBlbC50ZXh0Q29udGVudCk7XG4gIH1cblxuICBjb25zdCBzaG93VGV4dCA9IGVsLmdldEF0dHJpYnV0ZShTSE9XX0FUVFIpO1xuICBjb25zdCBoaWRlVGV4dCA9IGVsLmdldEF0dHJpYnV0ZShISURFX0FUVFIpIHx8IGdldEhpZGVUZXh0KHNob3dUZXh0KTtcblxuICBlbC50ZXh0Q29udGVudCA9IHByZXNzZWQgPyBzaG93VGV4dCA6IGhpZGVUZXh0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGVsLnNldEF0dHJpYnV0ZShQUkVTU0VELCBwcmVzc2VkKTtcbiAgcmV0dXJuIHByZXNzZWQ7XG59O1xuIiwiY29uc3QgRVhQQU5ERUQgPSBcImFyaWEtZXhwYW5kZWRcIjtcbmNvbnN0IENPTlRST0xTID0gXCJhcmlhLWNvbnRyb2xzXCI7XG5jb25zdCBISURERU4gPSBcImhpZGRlblwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChidXR0b24sIGV4cGFuZGVkKSA9PiB7XG4gIGxldCBzYWZlRXhwYW5kZWQgPSBleHBhbmRlZDtcblxuICBpZiAodHlwZW9mIHNhZmVFeHBhbmRlZCAhPT0gXCJib29sZWFuXCIpIHtcbiAgICBzYWZlRXhwYW5kZWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKEVYUEFOREVEKSA9PT0gXCJmYWxzZVwiO1xuICB9XG5cbiAgYnV0dG9uLnNldEF0dHJpYnV0ZShFWFBBTkRFRCwgc2FmZUV4cGFuZGVkKTtcblxuICBjb25zdCBpZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoQ09OVFJPTFMpO1xuICBjb25zdCBjb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgaWYgKCFjb250cm9scykge1xuICAgIHRocm93IG5ldyBFcnJvcihgTm8gdG9nZ2xlIHRhcmdldCBmb3VuZCB3aXRoIGlkOiBcIiR7aWR9XCJgKTtcbiAgfVxuXG4gIGlmIChzYWZlRXhwYW5kZWQpIHtcbiAgICBjb250cm9scy5yZW1vdmVBdHRyaWJ1dGUoSElEREVOKTtcbiAgfSBlbHNlIHtcbiAgICBjb250cm9scy5zZXRBdHRyaWJ1dGUoSElEREVOLCBcIlwiKTtcbiAgfVxuXG4gIHJldHVybiBzYWZlRXhwYW5kZWQ7XG59O1xuIiwiY29uc3QgZGF0YXNldCA9IHJlcXVpcmUoXCJlbGVtLWRhdGFzZXRcIik7XG5cbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG5cbmNvbnN0IENIRUNLRUQgPSBcImFyaWEtY2hlY2tlZFwiO1xuY29uc3QgQ0hFQ0tFRF9DTEFTUyA9IGAke1BSRUZJWH0tY2hlY2tsaXN0X19pdGVtLS1jaGVja2VkYDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB2YWxpZGF0ZShlbCkge1xuICBjb25zdCBkYXRhID0gZGF0YXNldChlbCk7XG4gIGNvbnN0IGlkID0gZGF0YS52YWxpZGF0aW9uRWxlbWVudDtcbiAgY29uc3QgY2hlY2tMaXN0ID1cbiAgICBpZC5jaGFyQXQoMCkgPT09IFwiI1wiXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaWQpXG4gICAgICA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICBpZiAoIWNoZWNrTGlzdCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgTm8gdmFsaWRhdGlvbiBlbGVtZW50IGZvdW5kIHdpdGggaWQ6IFwiJHtpZH1cImApO1xuICB9XG5cbiAgT2JqZWN0LmVudHJpZXMoZGF0YSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgaWYgKGtleS5zdGFydHNXaXRoKFwidmFsaWRhdGVcIikpIHtcbiAgICAgIGNvbnN0IHZhbGlkYXRvck5hbWUgPSBrZXkuc3Vic3RyKFwidmFsaWRhdGVcIi5sZW5ndGgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCB2YWxpZGF0b3JQYXR0ZXJuID0gbmV3IFJlZ0V4cCh2YWx1ZSk7XG4gICAgICBjb25zdCB2YWxpZGF0b3JTZWxlY3RvciA9IGBbZGF0YS12YWxpZGF0b3I9XCIke3ZhbGlkYXRvck5hbWV9XCJdYDtcbiAgICAgIGNvbnN0IHZhbGlkYXRvckNoZWNrYm94ID0gY2hlY2tMaXN0LnF1ZXJ5U2VsZWN0b3IodmFsaWRhdG9yU2VsZWN0b3IpO1xuXG4gICAgICBpZiAoIXZhbGlkYXRvckNoZWNrYm94KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gdmFsaWRhdG9yIGNoZWNrYm94IGZvdW5kIGZvcjogXCIke3ZhbGlkYXRvck5hbWV9XCJgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2hlY2tlZCA9IHZhbGlkYXRvclBhdHRlcm4udGVzdChlbC52YWx1ZSk7XG4gICAgICB2YWxpZGF0b3JDaGVja2JveC5jbGFzc0xpc3QudG9nZ2xlKENIRUNLRURfQ0xBU1MsIGNoZWNrZWQpO1xuICAgICAgdmFsaWRhdG9yQ2hlY2tib3guc2V0QXR0cmlidXRlKENIRUNLRUQsIGNoZWNrZWQpO1xuICAgIH1cbiAgfSk7XG59O1xuIl19
