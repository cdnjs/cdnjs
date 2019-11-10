(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * classList.js: Cross-browser full element.classList implementation.
 * 2014-07-23
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

/* Copied from MDN:
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 */

if ("document" in window.self) {

  // Full polyfill for browsers with no classList support
  // Including IE < Edge missing SVGElement.classList
  if (!("classList" in document.createElement("_"))
    || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {

  (function (view) {

    "use strict";

    if (!('Element' in view)) return;

    var
        classListProp = "classList"
      , protoProp = "prototype"
      , elemCtrProto = view.Element[protoProp]
      , objCtr = Object
      , strTrim = String[protoProp].trim || function () {
        return this.replace(/^\s+|\s+$/g, "");
      }
      , arrIndexOf = Array[protoProp].indexOf || function (item) {
        var
            i = 0
          , len = this.length
        ;
        for (; i < len; i++) {
          if (i in this && this[i] === item) {
            return i;
          }
        }
        return -1;
      }
      // Vendors: please allow content code to instantiate DOMExceptions
      , DOMEx = function (type, message) {
        this.name = type;
        this.code = DOMException[type];
        this.message = message;
      }
      , checkTokenAndGetIndex = function (classList, token) {
        if (token === "") {
          throw new DOMEx(
              "SYNTAX_ERR"
            , "An invalid or illegal string was specified"
          );
        }
        if (/\s/.test(token)) {
          throw new DOMEx(
              "INVALID_CHARACTER_ERR"
            , "String contains an invalid character"
          );
        }
        return arrIndexOf.call(classList, token);
      }
      , ClassList = function (elem) {
        var
            trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
          , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
          , i = 0
          , len = classes.length
        ;
        for (; i < len; i++) {
          this.push(classes[i]);
        }
        this._updateClassName = function () {
          elem.setAttribute("class", this.toString());
        };
      }
      , classListProto = ClassList[protoProp] = []
      , classListGetter = function () {
        return new ClassList(this);
      }
    ;
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
      var
          tokens = arguments
        , i = 0
        , l = tokens.length
        , token
        , updated = false
      ;
      do {
        token = tokens[i] + "";
        if (checkTokenAndGetIndex(this, token) === -1) {
          this.push(token);
          updated = true;
        }
      }
      while (++i < l);

      if (updated) {
        this._updateClassName();
      }
    };
    classListProto.remove = function () {
      var
          tokens = arguments
        , i = 0
        , l = tokens.length
        , token
        , updated = false
        , index
      ;
      do {
        token = tokens[i] + "";
        index = checkTokenAndGetIndex(this, token);
        while (index !== -1) {
          this.splice(index, 1);
          updated = true;
          index = checkTokenAndGetIndex(this, token);
        }
      }
      while (++i < l);

      if (updated) {
        this._updateClassName();
      }
    };
    classListProto.toggle = function (token, force) {
      token += "";

      var
          result = this.contains(token)
        , method = result ?
          force !== true && "remove"
        :
          force !== false && "add"
      ;

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
          get: classListGetter
        , enumerable: true
        , configurable: true
      };
      try {
        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
      } catch (ex) { // IE 8 doesn't support enumerable:true
        if (ex.number === -0x7FF5EC54) {
          classListPropDesc.enumerable = false;
          objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        }
      }
    } else if (objCtr[protoProp].__defineGetter__) {
      elemCtrProto.__defineGetter__(classListProp, classListGetter);
    }

    }(window.self));

    } else {
    // There is full or partial native classList support, so just check if we need
    // to normalize the add/remove and toggle APIs.

    (function () {
      "use strict";

      var testElement = document.createElement("_");

      testElement.classList.add("c1", "c2");

      // Polyfill for IE 10/11 and Firefox <26, where classList.add and
      // classList.remove exist but support only one argument at a time.
      if (!testElement.classList.contains("c2")) {
        var createMethod = function(method) {
          var original = DOMTokenList.prototype[method];

          DOMTokenList.prototype[method] = function(token) {
            var i, len = arguments.length;

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

        DOMTokenList.prototype.toggle = function(token, force) {
          if (1 in arguments && !this.contains(token) === !force) {
            return force;
          } else {
            return _toggle.call(this, token);
          }
        };

      }

      testElement = null;
    }());
  }
}

},{}],2:[function(require,module,exports){
(function (global){
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
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

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

module.exports = debounce;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
var select = require('../utils/select');

/**
 * @name showPanelListener
 * @desc The event handler for clicking on a button in an accordion.
 * @param {HTMLElement} el - An HTML element most likely a <button>.
 * @param {Object} ev - A DOM event object.
 */
function showPanelListener (el, ev) {
  var expanded = el.getAttribute('aria-expanded') === 'true';
  this.hideAll();
  if (!expanded) {
    this.show(el);
  }
  return false;
}

/**
 * @class Accordion
 *
 * An accordion component.
 *
 * @param {HTMLElement} el An HTMLElement to turn into an accordion.
 */
function Accordion (el) {
  var self = this;
  this.root = el;

  // delegate click events on each <button>
  var buttons = select('button', this.root);
  buttons.forEach(function (el) {
    if (el.attachEvent) {
      el.attachEvent('onclick', showPanelListener.bind(self, el));
    } else {
      el.addEventListener('click', showPanelListener.bind(self, el));
    }
  });

  // find the first expanded button
  var expanded = this.$('button[aria-expanded=true]')[ 0 ];
  this.hideAll();
  if (expanded !== undefined) {
    this.show(expanded);
  }
}

/**
 * @param {String} selector
 * @return {Array}
 */
Accordion.prototype.$ = function (selector) {
  return select(selector, this.root);
};

/**
 * @param {HTMLElement} button
 * @return {Accordion}
 */
Accordion.prototype.hide = function (button) {
  var selector = button.getAttribute('aria-controls'),
    content = this.$('#' + selector)[ 0 ];

  button.setAttribute('aria-expanded', false);
  content.setAttribute('aria-hidden', true);
  return this;
};

/**
 * @param {HTMLElement} button
 * @return {Accordion}
 */
Accordion.prototype.show = function (button) {
  var selector = button.getAttribute('aria-controls'),
    content = this.$('#' + selector)[ 0 ];

  button.setAttribute('aria-expanded', true);
  content.setAttribute('aria-hidden', false);
  return this;
};

/**
 * @return {Accordion}
 */
Accordion.prototype.hideAll = function () {
  var self = this;
  var buttons = this.$('ul > li > button, .usa-accordion-button');
  buttons.forEach(function (button) {
    self.hide(button);
  });
  return this;
};

module.exports = Accordion;

},{"../utils/select":22}],4:[function(require,module,exports){
var select = require('../utils/select');
var dispatch = require('../utils/dispatch');

function bannerClickHandler (event) {
  (event.preventDefault) ? event.preventDefault() : event.returnValue = false;

  this.classList.toggle('usa-banner-header-expanded');
}

function bannerInit () {
  var banners = select('.usa-banner-header');

  banners.forEach(function (banner) {
    var bannerClick = bannerClickHandler.bind(banner);
    select('[aria-controls]', banner).forEach(function (button) {
      dispatch(button, 'click', bannerClick);
    });
  });
}

module.exports = bannerInit;

},{"../utils/dispatch":21,"../utils/select":22}],5:[function(require,module,exports){
var select = require('../utils/select');
var dispatch = require('../utils/dispatch');

function getSiblings (el) {
  var n = el.parentNode.firstChild;
  var matches = [];

  while (n) {
    if (n.nodeType == 1 && n != el) {
      matches.push(n);
    }
    n = n.nextSibling;
  }

  return matches;
}

var showPanelListener = function () {
  var panelToShow = this.parentNode;
  var otherPanels = getSiblings(panelToShow);
  panelToShow.classList.remove('hidden');
  otherPanels.forEach(function (el) {
    el.classList.add('hidden');
  });
};

var events = [];

module.exports = function footerAccordion () {

  var navList = select('.usa-footer-big nav ul');
  var primaryLink = select('.usa-footer-big nav .usa-footer-primary-link');

  if (events.length) {
    events.forEach(function (e) {
      e.off();
    });
    events = [];
  }

  if (window.innerWidth < 600) {

    navList.forEach(function (el) {
      el.classList.add('hidden');
    });

    primaryLink.forEach(function (el) {
      events.push(
        dispatch(el, 'click', showPanelListener)
      );
    });

  } else {
    navList.forEach(function (el) {
      el.classList.remove('hidden');
    });
  }
};

},{"../utils/dispatch":21,"../utils/select":22}],6:[function(require,module,exports){
var select = require('../utils/select');
var dispatch = require('../utils/dispatch');

var clickEvent = ('ontouchstart' in document.documentElement ? 'touchstart' : 'click');
var dispatchers = [];

function handleNavElements (e) {

  var toggleElements = select('.usa-overlay, .usa-nav');
  var navCloseElement = select('.usa-nav-close')[ 0 ];

  toggleElements.forEach(function (element) {
    element.classList.toggle('is-visible');
  });

  document.body.classList.toggle('usa-mobile_nav-active');
  navCloseElement.focus();

  return false;
}

function navInit () {
  var navElements = select('.usa-menu-btn, .usa-overlay, .usa-nav-close');

  dispatchers = navElements.map(function (element) {
    return dispatch(element, clickEvent, handleNavElements);
  });
}

function navOff () {
  while (dispatchers.length) {
    dispatchers.pop().off();
  }
}

module.exports = navInit;
module.exports.off = navOff;

},{"../utils/dispatch":21,"../utils/select":22}],7:[function(require,module,exports){
var select = require('../utils/select');
var dispatch = require('../utils/dispatch');

var VISUALLY_HIDDEN = 'usa-sr-only';

var clickEvent = ('ontouchstart' in document.documentElement)
  ? 'touchstart'
  : 'click';

var searchForm;
var searchButton;
var searchButtonContainer;

var activateDispatcher;
var deactivateDispatcher;

function searchButtonClickHandler (event) {
  if (searchForm.hidden) {
    closeSearch();
  } else {
    openSearch();
    deactivateDispatcher = dispatch(document.body, clickEvent, searchOpenClickHandler);
  }

  return false;
}

function searchOpenClickHandler (event) {
  if (! searchFormContains(event.target)) {
    closeSearch();
    deactivateDispatcher.off();
    deactivateDispatcher = undefined;
  }
}

function openSearch () {
  searchForm.classList.remove(VISUALLY_HIDDEN);
  var input = searchForm.querySelector('[type=search]');
  if (input) {
    input.focus();
  }
  searchButton.hidden = true;
}

function closeSearch () {
  searchForm.classList.add(VISUALLY_HIDDEN);
  searchButton.hidden = false;
}

function searchFormContains (element) {
  return (searchForm && searchForm.contains(element)) ||
         (searchButtonContainer && searchButtonContainer.contains(element));
}

function searchInit () {
  searchForm = select('.js-search-form')[ 0 ];
  searchButton = select('.js-search-button')[ 0 ];
  searchButtonContainer = select('.js-search-button-container')[ 0 ];

  if (searchButton && searchForm) {
    closeSearch();
    activateDispatcher = dispatch(searchButton, clickEvent, searchButtonClickHandler);
  }
}

function searchOff () {
  if (activateDispatcher) {
    activateDispatcher.off();
  }
  if (deactivateDispatcher) {
    deactivateDispatcher.off();
  }
}

module.exports = searchInit;
module.exports.off = searchOff;

},{"../utils/dispatch":21,"../utils/select":22}],8:[function(require,module,exports){
/**
 * Flips given INPUT elements between masked (hiding the field value) and unmasked
 * @param {Array.HTMLElement} fields - An array of INPUT elements
 * @param {Boolean} mask - Whether the mask should be applied, hiding the field value
 */
module.exports = function (fields, mask) {
  fields.forEach(function (field) {
    field.setAttribute('autocapitalize', 'off');
    field.setAttribute('autocorrect', 'off');
    field.setAttribute('type', mask ? 'password' : 'text');
  });
};

},{}],9:[function(require,module,exports){
var toggleFieldMask = require('./toggle-field-mask');
var select = require('../utils/select');

/**
 * Component that decorates an HTML element with the ability to toggle the
 * masked state of an input field (like a password) when clicked.
 * The ids of the fields to be masked will be pulled directly from the button's
 * `aria-controls` attribute.
 *
 * @param  {HTMLElement} el    Parent element containing the fields to be masked
 * @param  {String} showText   Button text shown when field is masked
 * @param  {String} hideText   Button text show when field is unmasked
 * @return {}
 */
var toggleFormInput = function (el, showText, hideText) {
  var defaultSelectors = el.getAttribute('aria-controls');

  if (!defaultSelectors || defaultSelectors.trim().length === 0) {
    throw new Error('Did you forget to define selectors in the aria-controls attribute? Check element ' + el.outerHTML);
  }

  var fieldSelector = getSelectors(defaultSelectors);
  var formElement = getFormParent(el);
  if (!formElement) {
    throw new Error('toggleFormInput() needs the supplied element to be inside a <form>. Check element ' + el.outerHTML);
  }
  var fields = select(fieldSelector, formElement);
  var masked = false;

  var toggleClickListener = function (ev) {
    ev.preventDefault();
    toggleFieldMask(fields, masked);
    el.textContent = masked ? showText : hideText;
    masked = !masked;
  };

  if (el.attachEvent) {
    el.attachEvent('onclick', toggleClickListener);
  } else {
    el.addEventListener('click', toggleClickListener);
  }
};

/**
 * Helper function to turn a string of ids into valid selectors
 * @param  {String} selectors Space separated list of ids of fields to be masked
 * @return {String}           Comma separated list of selectors
 */
function getSelectors (selectors) {
  var selectorsList = selectors.split(' ');

  return selectorsList.map(function (selector) {
    return '#' + selector;
  }).join(', ');
}

/**
 * Searches up the tree from the element to find a Form element, and returns it,
 * or null if no Form is found
 * @param {HTMLElement} el - Child element to start search
 */
function getFormParent (el) {
  while (el && el.tagName !== 'FORM') {
    el = el.parentNode;
  }
  return el;
}

module.exports = toggleFormInput;

},{"../utils/select":22,"./toggle-field-mask":8}],10:[function(require,module,exports){
var select = require('../utils/select');
var dispatch = require('../utils/dispatch');

module.exports = function validator (el) {
  var data = getData(el);
  var key;
  var validatorName;
  var validatorPattern;
  var validatorCheckbox;
  var checkList = select(data.validationelement)[ 0 ];

  function validate () {
    for (key in data) {
      if (key.startsWith('validate')) {
        validatorName = key.split('validate')[ 1 ];
        validatorPattern = new RegExp(data[ key ]);
        validatorSelector = '[data-validator=' + validatorName + ']';
        validatorCheckbox = select(validatorSelector, checkList)[ 0 ];

        var checked = validatorPattern.test(el.value);
        validatorCheckbox.classList.toggle('usa-checklist-checked', checked);
      }
    }
  }

  dispatch(el, 'keyup', validate);
};

/**
 * Extracts attributes named with the pattern "data-[NAME]" from a given
 * HTMLElement, then returns an object populated with the NAME/value pairs.
 * Any hyphens in NAME are removed.
 * @param {HTMLElement} el
 * @return {Object}
 */

function getData (el) {
  if (!el.hasAttributes()) return;
  var data = {};
  var attrs = el.attributes;
  for (var i = attrs.length - 1; i >= 0; i--) {
    var matches = attrs[ i ].name.match(/data-(.*)/i);
    if (matches && matches[ 1 ]) {
      var name = matches[ 1 ].replace(/-/, '');
      data[ name ] = attrs[ i ].value;
    }
  }
  return data;
}

},{"../utils/dispatch":21,"../utils/select":22}],11:[function(require,module,exports){
var select = require('../utils/select');
var whenDOMReady = require('../utils/when-dom-ready');
var Accordion = require('../components/accordion');

whenDOMReady(function initAccordions () {

  var accordions = select('.usa-accordion, .usa-accordion-bordered');
  accordions.forEach(function (el) {
    new Accordion(el);
  });
});

},{"../components/accordion":3,"../utils/select":22,"../utils/when-dom-ready":23}],12:[function(require,module,exports){
var whenDOMReady = require('../utils/when-dom-ready');
var bannerInit = require('../components/banner');

whenDOMReady(function () {

  bannerInit();

});


},{"../components/banner":4,"../utils/when-dom-ready":23}],13:[function(require,module,exports){
var debounce = require('lodash.debounce');
var whenDOMReady = require('../utils/when-dom-ready');
var dispatch = require('../utils/dispatch');
var footerAccordion = require('../components/footer');

whenDOMReady(function () {

  footerAccordion();

  dispatch(window, 'resize', debounce(footerAccordion, 180));

});

},{"../components/footer":5,"../utils/dispatch":21,"../utils/when-dom-ready":23,"lodash.debounce":2}],14:[function(require,module,exports){
var whenDOMReady = require('../utils/when-dom-ready');
var select = require('../utils/select');
var validator = require('../components/validator');
var toggleFormInput = require('../components/toggle-form-input');

whenDOMReady(function () {
  var elShowPassword = select('.usa-show_password')[ 0 ];
  var elFormInput = select('.usa-show_multipassword')[ 0 ];
  var elValidator = select('.js-validate_password')[ 0 ];

  elShowPassword && toggleFormInput(elShowPassword, 'Show Password', 'Hide Password');
  elFormInput && toggleFormInput(elFormInput, 'Show my typing', 'Hide my typing');
  elValidator && validator(elValidator);
});


},{"../components/toggle-form-input":9,"../components/validator":10,"../utils/select":22,"../utils/when-dom-ready":23}],15:[function(require,module,exports){
var whenDOMReady = require('../utils/when-dom-ready');
var navInit = require('../components/navigation');

whenDOMReady(navInit);

},{"../components/navigation":6,"../utils/when-dom-ready":23}],16:[function(require,module,exports){
// support for HTMLElement#hidden
require('../polyfills/element-hidden');
// support for Element#classList
require('classlist-polyfill');

/**
 * This file defines key ECMAScript 5 methods that are used by the Standards
 * but may be missing in older browsers.
 */

/**
 * Array.prototype.forEach()
 * Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 */

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function (callback, thisArg) {

    var T, k;

    if (this === null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling toObject() passing the
    // |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get() internal
    // method of O with the argument "length".
    // 3. Let len be toUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If isCallable(callback) is false, throw a TypeError exception. 
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let
    // T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //    This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty
      //    internal method of O with argument Pk.
      //    This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        // method of O with argument Pk.
        kValue = O[ k ];

        // ii. Call the Call internal method of callback with T as
        // the this value and argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}


/**
 * Function.prototype.bind()
 * Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
 */

// Reference: http://es5.github.io/#x15.3.4.5
if (!Function.prototype.bind) {

  Function.prototype.bind = function (oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP    = function () {},
      fBound  = function () {
        return fToBind.apply(this instanceof fNOP ? this : oThis,
                aArgs.concat(Array.prototype.slice.call(arguments)));
      };

    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype; 
    }
    fBound.prototype = new fNOP();

    return fBound;
  };

}

},{"../polyfills/element-hidden":19,"classlist-polyfill":1}],17:[function(require,module,exports){
var whenDOMReady = require('../utils/when-dom-ready');
var searchInit = require('../components/search');

whenDOMReady(searchInit);

},{"../components/search":7,"../utils/when-dom-ready":23}],18:[function(require,module,exports){
var dispatch = require('../utils/dispatch');
var select = require('../utils/select');
var whenDOMReady = require('../utils/when-dom-ready');

whenDOMReady(function () {

  // Fixing skip nav focus behavior in chrome
  var elSkipnav = select('.skipnav')[ 0 ];
  var elMainContent = select('#main-content')[ 0 ];

  if (elSkipnav) {
    dispatch(elSkipnav, 'click', function () {
      elMainContent.setAttribute('tabindex', '0');
    });
  }

  if (elMainContent) {
    dispatch(elMainContent, 'blur', function () {
      elMainContent.setAttribute('tabindex', '-1');
    });
  }
});

},{"../utils/dispatch":21,"../utils/select":22,"../utils/when-dom-ready":23}],19:[function(require,module,exports){
var elproto = window.HTMLElement.prototype;
var HIDDEN = 'hidden';

if (!(HIDDEN in elproto)) {

  Object.defineProperty(elproto, HIDDEN, {
    get: function () {
      return this.hasAttribute(HIDDEN);
    },
    set: function (value) {
      if (value) {
        this.setAttribute(HIDDEN, '');
      } else {
        this.removeAttribute(HIDDEN);
      }
    },
  });
}

},{}],20:[function(require,module,exports){
'use strict';

/**
 * The 'polyfills' file defines key ECMAScript 5 methods that may be
 * missing from older browsers, so must be loaded first.
 */
require('./initializers/polyfills');

require('./initializers/accordions');
require('./initializers/banner');
require('./initializers/footer');
require('./initializers/forms');
require('./initializers/navigation');
require('./initializers/search');
require('./initializers/skip-nav');

},{"./initializers/accordions":11,"./initializers/banner":12,"./initializers/footer":13,"./initializers/forms":14,"./initializers/navigation":15,"./initializers/polyfills":16,"./initializers/search":17,"./initializers/skip-nav":18}],21:[function(require,module,exports){
/**
 * Attaches a given listener function to a given element which is
 * triggered by a specified list of event types.
 * @param {HTMLElement} element - the element to which the listener will be attached
 * @param {String} eventTypes - space-separated list of event types which will trigger the listener
 * @param {Function} listener - the function to be executed
 * @returns {Object} - containing a <tt>trigger()</tt> method for executing the listener, and an <tt>off()</tt> method for detaching it
 */
module.exports = function dispatch (element, eventTypes, listener, options) {
  var eventTypeArray = eventTypes.split(/\s+/);

  var attach = function (e, t, d) {
    if (e.attachEvent) {
      e.attachEvent('on' + t, d, options);
    }
    if (e.addEventListener) {
      e.addEventListener(t, d, options);
    }
  };

  var trigger = function (e, t) {
    var fakeEvent;
    if ('createEvent' in document) {
      // modern browsers, IE9+
      fakeEvent = document.createEvent('HTMLEvents');
      fakeEvent.initEvent(t, false, true);
      e.dispatchEvent(fakeEvent);
    } else {
      // IE 8
      fakeEvent = document.createEventObject();
      fakeEvent.eventType = t;
      e.fireEvent('on'+e.eventType, fakeEvent);
    }
  };

  var detach = function (e, t, d) {
    if (e.detachEvent) {
      e.detachEvent('on' + t, d, options);
    }
    if (e.removeEventListener) {
      e.removeEventListener(t, d, options);
    }
  };

  eventTypeArray.forEach(function (eventType) {
    attach.call(null, element, eventType, listener);
  });

  return {
    trigger: function () {
      trigger.call(null, element, eventTypeArray[ 0 ]);
    },
    off: function () {
      eventTypeArray.forEach(function (eventType) {
        detach.call(null, element, eventType, listener);
      });
    },
  };
};

},{}],22:[function(require,module,exports){
/**
 * @name select
 * @desc selects elements from the DOM by class selector or ID selector.
 * @param {string} selector - The selector to traverse the DOM with.
 * @param {HTMLElement} context - The context to traverse the DOM in.
 * @return {Array.HTMLElement} - An array of DOM nodes or an empty array.
 */
module.exports = function select (selector, context) {

  if (typeof selector !== 'string') {
    return [];
  }

  if ((context === undefined) || !isElement(context)) {
    context = window.document;
  }

  var selection = context.querySelectorAll(selector);

  return Array.prototype.slice.call(selection);

};

function isElement (value) {
  return !!value && typeof value === 'object' && value.nodeType === 1;
}
},{}],23:[function(require,module,exports){
/*
 * @name DOMLoaded
 * @param {function} cb - The callback function to run when the DOM has loaded.
 */
module.exports = function DOMLoaded (cb) {
  // in case the document is already rendered
  if ('loading' !== document.readyState) {
    if (isFunction(cb)) {
      cb();
    }
  } else if (document.addEventListener) { // modern browsers
    document.addEventListener('DOMContentLoaded', cb);
  } else { // IE <= 8
    document.attachEvent('onreadystatechange', function (){
      if ('complete' === document.readyState) {
        if (isFunction(cb)) {
          cb();
        }
      }
    });
  }
};

function isFunction (arg) {
  return (typeof arg === 'function');
}
},{}]},{},[20])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY2xhc3NsaXN0LXBvbHlmaWxsL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZGVib3VuY2UvaW5kZXguanMiLCJzcmMvanMvY29tcG9uZW50cy9hY2NvcmRpb24uanMiLCJzcmMvanMvY29tcG9uZW50cy9iYW5uZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9mb290ZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9uYXZpZ2F0aW9uLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvc2VhcmNoLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvdG9nZ2xlLWZpZWxkLW1hc2suanMiLCJzcmMvanMvY29tcG9uZW50cy90b2dnbGUtZm9ybS1pbnB1dC5qcyIsInNyYy9qcy9jb21wb25lbnRzL3ZhbGlkYXRvci5qcyIsInNyYy9qcy9pbml0aWFsaXplcnMvYWNjb3JkaW9ucy5qcyIsInNyYy9qcy9pbml0aWFsaXplcnMvYmFubmVyLmpzIiwic3JjL2pzL2luaXRpYWxpemVycy9mb290ZXIuanMiLCJzcmMvanMvaW5pdGlhbGl6ZXJzL2Zvcm1zLmpzIiwic3JjL2pzL2luaXRpYWxpemVycy9uYXZpZ2F0aW9uLmpzIiwic3JjL2pzL2luaXRpYWxpemVycy9wb2x5ZmlsbHMuanMiLCJzcmMvanMvaW5pdGlhbGl6ZXJzL3NlYXJjaC5qcyIsInNyYy9qcy9pbml0aWFsaXplcnMvc2tpcC1uYXYuanMiLCJzcmMvanMvcG9seWZpbGxzL2VsZW1lbnQtaGlkZGVuLmpzIiwic3JjL2pzL3N0YXJ0LmpzIiwic3JjL2pzL3V0aWxzL2Rpc3BhdGNoLmpzIiwic3JjL2pzL3V0aWxzL3NlbGVjdC5qcyIsInNyYy9qcy91dGlscy93aGVuLWRvbS1yZWFkeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2pQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN6WEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypcbiAqIGNsYXNzTGlzdC5qczogQ3Jvc3MtYnJvd3NlciBmdWxsIGVsZW1lbnQuY2xhc3NMaXN0IGltcGxlbWVudGF0aW9uLlxuICogMjAxNC0wNy0yM1xuICpcbiAqIEJ5IEVsaSBHcmV5LCBodHRwOi8vZWxpZ3JleS5jb21cbiAqIFB1YmxpYyBEb21haW4uXG4gKiBOTyBXQVJSQU5UWSBFWFBSRVNTRUQgT1IgSU1QTElFRC4gVVNFIEFUIFlPVVIgT1dOIFJJU0suXG4gKi9cblxuLypnbG9iYWwgc2VsZiwgZG9jdW1lbnQsIERPTUV4Y2VwdGlvbiAqL1xuXG4vKiEgQHNvdXJjZSBodHRwOi8vcHVybC5lbGlncmV5LmNvbS9naXRodWIvY2xhc3NMaXN0LmpzL2Jsb2IvbWFzdGVyL2NsYXNzTGlzdC5qcyovXG5cbi8qIENvcGllZCBmcm9tIE1ETjpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L2NsYXNzTGlzdFxuICovXG5cbmlmIChcImRvY3VtZW50XCIgaW4gd2luZG93LnNlbGYpIHtcblxuICAvLyBGdWxsIHBvbHlmaWxsIGZvciBicm93c2VycyB3aXRoIG5vIGNsYXNzTGlzdCBzdXBwb3J0XG4gIC8vIEluY2x1ZGluZyBJRSA8IEVkZ2UgbWlzc2luZyBTVkdFbGVtZW50LmNsYXNzTGlzdFxuICBpZiAoIShcImNsYXNzTGlzdFwiIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJfXCIpKVxuICAgIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyAmJiAhKFwiY2xhc3NMaXN0XCIgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcImdcIikpKSB7XG5cbiAgKGZ1bmN0aW9uICh2aWV3KSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmICghKCdFbGVtZW50JyBpbiB2aWV3KSkgcmV0dXJuO1xuXG4gICAgdmFyXG4gICAgICAgIGNsYXNzTGlzdFByb3AgPSBcImNsYXNzTGlzdFwiXG4gICAgICAsIHByb3RvUHJvcCA9IFwicHJvdG90eXBlXCJcbiAgICAgICwgZWxlbUN0clByb3RvID0gdmlldy5FbGVtZW50W3Byb3RvUHJvcF1cbiAgICAgICwgb2JqQ3RyID0gT2JqZWN0XG4gICAgICAsIHN0clRyaW0gPSBTdHJpbmdbcHJvdG9Qcm9wXS50cmltIHx8IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7XG4gICAgICB9XG4gICAgICAsIGFyckluZGV4T2YgPSBBcnJheVtwcm90b1Byb3BdLmluZGV4T2YgfHwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAgICBpID0gMFxuICAgICAgICAgICwgbGVuID0gdGhpcy5sZW5ndGhcbiAgICAgICAgO1xuICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgaWYgKGkgaW4gdGhpcyAmJiB0aGlzW2ldID09PSBpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgICAgLy8gVmVuZG9yczogcGxlYXNlIGFsbG93IGNvbnRlbnQgY29kZSB0byBpbnN0YW50aWF0ZSBET01FeGNlcHRpb25zXG4gICAgICAsIERPTUV4ID0gZnVuY3Rpb24gKHR5cGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gdHlwZTtcbiAgICAgICAgdGhpcy5jb2RlID0gRE9NRXhjZXB0aW9uW3R5cGVdO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgfVxuICAgICAgLCBjaGVja1Rva2VuQW5kR2V0SW5kZXggPSBmdW5jdGlvbiAoY2xhc3NMaXN0LCB0b2tlbikge1xuICAgICAgICBpZiAodG9rZW4gPT09IFwiXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXgoXG4gICAgICAgICAgICAgIFwiU1lOVEFYX0VSUlwiXG4gICAgICAgICAgICAsIFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkXCJcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICgvXFxzLy50ZXN0KHRva2VuKSkge1xuICAgICAgICAgIHRocm93IG5ldyBET01FeChcbiAgICAgICAgICAgICAgXCJJTlZBTElEX0NIQVJBQ1RFUl9FUlJcIlxuICAgICAgICAgICAgLCBcIlN0cmluZyBjb250YWlucyBhbiBpbnZhbGlkIGNoYXJhY3RlclwiXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJySW5kZXhPZi5jYWxsKGNsYXNzTGlzdCwgdG9rZW4pO1xuICAgICAgfVxuICAgICAgLCBDbGFzc0xpc3QgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICB2YXJcbiAgICAgICAgICAgIHRyaW1tZWRDbGFzc2VzID0gc3RyVHJpbS5jYWxsKGVsZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIilcbiAgICAgICAgICAsIGNsYXNzZXMgPSB0cmltbWVkQ2xhc3NlcyA/IHRyaW1tZWRDbGFzc2VzLnNwbGl0KC9cXHMrLykgOiBbXVxuICAgICAgICAgICwgaSA9IDBcbiAgICAgICAgICAsIGxlbiA9IGNsYXNzZXMubGVuZ3RoXG4gICAgICAgIDtcbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIHRoaXMucHVzaChjbGFzc2VzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVDbGFzc05hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCB0aGlzLnRvU3RyaW5nKCkpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgLCBjbGFzc0xpc3RQcm90byA9IENsYXNzTGlzdFtwcm90b1Byb3BdID0gW11cbiAgICAgICwgY2xhc3NMaXN0R2V0dGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IENsYXNzTGlzdCh0aGlzKTtcbiAgICAgIH1cbiAgICA7XG4gICAgLy8gTW9zdCBET01FeGNlcHRpb24gaW1wbGVtZW50YXRpb25zIGRvbid0IGFsbG93IGNhbGxpbmcgRE9NRXhjZXB0aW9uJ3MgdG9TdHJpbmcoKVxuICAgIC8vIG9uIG5vbi1ET01FeGNlcHRpb25zLiBFcnJvcidzIHRvU3RyaW5nKCkgaXMgc3VmZmljaWVudCBoZXJlLlxuICAgIERPTUV4W3Byb3RvUHJvcF0gPSBFcnJvcltwcm90b1Byb3BdO1xuICAgIGNsYXNzTGlzdFByb3RvLml0ZW0gPSBmdW5jdGlvbiAoaSkge1xuICAgICAgcmV0dXJuIHRoaXNbaV0gfHwgbnVsbDtcbiAgICB9O1xuICAgIGNsYXNzTGlzdFByb3RvLmNvbnRhaW5zID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICB0b2tlbiArPSBcIlwiO1xuICAgICAgcmV0dXJuIGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgIT09IC0xO1xuICAgIH07XG4gICAgY2xhc3NMaXN0UHJvdG8uYWRkID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyXG4gICAgICAgICAgdG9rZW5zID0gYXJndW1lbnRzXG4gICAgICAgICwgaSA9IDBcbiAgICAgICAgLCBsID0gdG9rZW5zLmxlbmd0aFxuICAgICAgICAsIHRva2VuXG4gICAgICAgICwgdXBkYXRlZCA9IGZhbHNlXG4gICAgICA7XG4gICAgICBkbyB7XG4gICAgICAgIHRva2VuID0gdG9rZW5zW2ldICsgXCJcIjtcbiAgICAgICAgaWYgKGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgPT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5wdXNoKHRva2VuKTtcbiAgICAgICAgICB1cGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgd2hpbGUgKCsraSA8IGwpO1xuXG4gICAgICBpZiAodXBkYXRlZCkge1xuICAgICAgICB0aGlzLl91cGRhdGVDbGFzc05hbWUoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNsYXNzTGlzdFByb3RvLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhclxuICAgICAgICAgIHRva2VucyA9IGFyZ3VtZW50c1xuICAgICAgICAsIGkgPSAwXG4gICAgICAgICwgbCA9IHRva2Vucy5sZW5ndGhcbiAgICAgICAgLCB0b2tlblxuICAgICAgICAsIHVwZGF0ZWQgPSBmYWxzZVxuICAgICAgICAsIGluZGV4XG4gICAgICA7XG4gICAgICBkbyB7XG4gICAgICAgIHRva2VuID0gdG9rZW5zW2ldICsgXCJcIjtcbiAgICAgICAgaW5kZXggPSBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pO1xuICAgICAgICB3aGlsZSAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgIHVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgIGluZGV4ID0gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgd2hpbGUgKCsraSA8IGwpO1xuXG4gICAgICBpZiAodXBkYXRlZCkge1xuICAgICAgICB0aGlzLl91cGRhdGVDbGFzc05hbWUoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNsYXNzTGlzdFByb3RvLnRvZ2dsZSA9IGZ1bmN0aW9uICh0b2tlbiwgZm9yY2UpIHtcbiAgICAgIHRva2VuICs9IFwiXCI7XG5cbiAgICAgIHZhclxuICAgICAgICAgIHJlc3VsdCA9IHRoaXMuY29udGFpbnModG9rZW4pXG4gICAgICAgICwgbWV0aG9kID0gcmVzdWx0ID9cbiAgICAgICAgICBmb3JjZSAhPT0gdHJ1ZSAmJiBcInJlbW92ZVwiXG4gICAgICAgIDpcbiAgICAgICAgICBmb3JjZSAhPT0gZmFsc2UgJiYgXCJhZGRcIlxuICAgICAgO1xuXG4gICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgIHRoaXNbbWV0aG9kXSh0b2tlbik7XG4gICAgICB9XG5cbiAgICAgIGlmIChmb3JjZSA9PT0gdHJ1ZSB8fCBmb3JjZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGZvcmNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICFyZXN1bHQ7XG4gICAgICB9XG4gICAgfTtcbiAgICBjbGFzc0xpc3RQcm90by50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmpvaW4oXCIgXCIpO1xuICAgIH07XG5cbiAgICBpZiAob2JqQ3RyLmRlZmluZVByb3BlcnR5KSB7XG4gICAgICB2YXIgY2xhc3NMaXN0UHJvcERlc2MgPSB7XG4gICAgICAgICAgZ2V0OiBjbGFzc0xpc3RHZXR0ZXJcbiAgICAgICAgLCBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICwgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9O1xuICAgICAgdHJ5IHtcbiAgICAgICAgb2JqQ3RyLmRlZmluZVByb3BlcnR5KGVsZW1DdHJQcm90bywgY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0UHJvcERlc2MpO1xuICAgICAgfSBjYXRjaCAoZXgpIHsgLy8gSUUgOCBkb2Vzbid0IHN1cHBvcnQgZW51bWVyYWJsZTp0cnVlXG4gICAgICAgIGlmIChleC5udW1iZXIgPT09IC0weDdGRjVFQzU0KSB7XG4gICAgICAgICAgY2xhc3NMaXN0UHJvcERlc2MuZW51bWVyYWJsZSA9IGZhbHNlO1xuICAgICAgICAgIG9iakN0ci5kZWZpbmVQcm9wZXJ0eShlbGVtQ3RyUHJvdG8sIGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdFByb3BEZXNjKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob2JqQ3RyW3Byb3RvUHJvcF0uX19kZWZpbmVHZXR0ZXJfXykge1xuICAgICAgZWxlbUN0clByb3RvLl9fZGVmaW5lR2V0dGVyX18oY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0R2V0dGVyKTtcbiAgICB9XG5cbiAgICB9KHdpbmRvdy5zZWxmKSk7XG5cbiAgICB9IGVsc2Uge1xuICAgIC8vIFRoZXJlIGlzIGZ1bGwgb3IgcGFydGlhbCBuYXRpdmUgY2xhc3NMaXN0IHN1cHBvcnQsIHNvIGp1c3QgY2hlY2sgaWYgd2UgbmVlZFxuICAgIC8vIHRvIG5vcm1hbGl6ZSB0aGUgYWRkL3JlbW92ZSBhbmQgdG9nZ2xlIEFQSXMuXG5cbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAgIHZhciB0ZXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJfXCIpO1xuXG4gICAgICB0ZXN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYzFcIiwgXCJjMlwiKTtcblxuICAgICAgLy8gUG9seWZpbGwgZm9yIElFIDEwLzExIGFuZCBGaXJlZm94IDwyNiwgd2hlcmUgY2xhc3NMaXN0LmFkZCBhbmRcbiAgICAgIC8vIGNsYXNzTGlzdC5yZW1vdmUgZXhpc3QgYnV0IHN1cHBvcnQgb25seSBvbmUgYXJndW1lbnQgYXQgYSB0aW1lLlxuICAgICAgaWYgKCF0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjMlwiKSkge1xuICAgICAgICB2YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgdmFyIG9yaWdpbmFsID0gRE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdO1xuXG4gICAgICAgICAgRE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgIHZhciBpLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgdG9rZW4gPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICAgIG9yaWdpbmFsLmNhbGwodGhpcywgdG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIGNyZWF0ZU1ldGhvZCgnYWRkJyk7XG4gICAgICAgIGNyZWF0ZU1ldGhvZCgncmVtb3ZlJyk7XG4gICAgICB9XG5cbiAgICAgIHRlc3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJjM1wiLCBmYWxzZSk7XG5cbiAgICAgIC8vIFBvbHlmaWxsIGZvciBJRSAxMCBhbmQgRmlyZWZveCA8MjQsIHdoZXJlIGNsYXNzTGlzdC50b2dnbGUgZG9lcyBub3RcbiAgICAgIC8vIHN1cHBvcnQgdGhlIHNlY29uZCBhcmd1bWVudC5cbiAgICAgIGlmICh0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjM1wiKSkge1xuICAgICAgICB2YXIgX3RvZ2dsZSA9IERPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlO1xuXG4gICAgICAgIERPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24odG9rZW4sIGZvcmNlKSB7XG4gICAgICAgICAgaWYgKDEgaW4gYXJndW1lbnRzICYmICF0aGlzLmNvbnRhaW5zKHRva2VuKSA9PT0gIWZvcmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9yY2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBfdG9nZ2xlLmNhbGwodGhpcywgdG9rZW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgfVxuXG4gICAgICB0ZXN0RWxlbWVudCA9IG51bGw7XG4gICAgfSgpKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBOQU4gPSAwIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heCxcbiAgICBuYXRpdmVNaW4gPSBNYXRoLm1pbjtcblxuLyoqXG4gKiBHZXRzIHRoZSB0aW1lc3RhbXAgb2YgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhhdCBoYXZlIGVsYXBzZWQgc2luY2VcbiAqIHRoZSBVbml4IGVwb2NoICgxIEphbnVhcnkgMTk3MCAwMDowMDowMCBVVEMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBEYXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSB0aW1lc3RhbXAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmZXIoZnVuY3Rpb24oc3RhbXApIHtcbiAqICAgY29uc29sZS5sb2coXy5ub3coKSAtIHN0YW1wKTtcbiAqIH0sIF8ubm93KCkpO1xuICogLy8gPT4gTG9ncyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpdCB0b29rIGZvciB0aGUgZGVmZXJyZWQgaW52b2NhdGlvbi5cbiAqL1xudmFyIG5vdyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gcm9vdC5EYXRlLm5vdygpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZGVib3VuY2VkIGZ1bmN0aW9uIHRoYXQgZGVsYXlzIGludm9raW5nIGBmdW5jYCB1bnRpbCBhZnRlciBgd2FpdGBcbiAqIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgc2luY2UgdGhlIGxhc3QgdGltZSB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHdhc1xuICogaW52b2tlZC4gVGhlIGRlYm91bmNlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGAgbWV0aG9kIHRvIGNhbmNlbFxuICogZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG8gaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uXG4gKiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYCBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGVcbiAqIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YCB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWRcbiAqIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnRcbiAqIGNhbGxzIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgXG4gKiBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLmRlYm91bmNlYCBhbmQgYF8udGhyb3R0bGVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZGVib3VuY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gZGVsYXkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz1mYWxzZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4V2FpdF1cbiAqICBUaGUgbWF4aW11bSB0aW1lIGBmdW5jYCBpcyBhbGxvd2VkIHRvIGJlIGRlbGF5ZWQgYmVmb3JlIGl0J3MgaW52b2tlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZGVib3VuY2VkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBjb3N0bHkgY2FsY3VsYXRpb25zIHdoaWxlIHRoZSB3aW5kb3cgc2l6ZSBpcyBpbiBmbHV4LlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsIF8uZGVib3VuY2UoY2FsY3VsYXRlTGF5b3V0LCAxNTApKTtcbiAqXG4gKiAvLyBJbnZva2UgYHNlbmRNYWlsYCB3aGVuIGNsaWNrZWQsIGRlYm91bmNpbmcgc3Vic2VxdWVudCBjYWxscy5cbiAqIGpRdWVyeShlbGVtZW50KS5vbignY2xpY2snLCBfLmRlYm91bmNlKHNlbmRNYWlsLCAzMDAsIHtcbiAqICAgJ2xlYWRpbmcnOiB0cnVlLFxuICogICAndHJhaWxpbmcnOiBmYWxzZVxuICogfSkpO1xuICpcbiAqIC8vIEVuc3VyZSBgYmF0Y2hMb2dgIGlzIGludm9rZWQgb25jZSBhZnRlciAxIHNlY29uZCBvZiBkZWJvdW5jZWQgY2FsbHMuXG4gKiB2YXIgZGVib3VuY2VkID0gXy5kZWJvdW5jZShiYXRjaExvZywgMjUwLCB7ICdtYXhXYWl0JzogMTAwMCB9KTtcbiAqIHZhciBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoJy9zdHJlYW0nKTtcbiAqIGpRdWVyeShzb3VyY2UpLm9uKCdtZXNzYWdlJywgZGVib3VuY2VkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIGRlYm91bmNlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgZGVib3VuY2VkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxhc3RBcmdzLFxuICAgICAgbGFzdFRoaXMsXG4gICAgICBtYXhXYWl0LFxuICAgICAgcmVzdWx0LFxuICAgICAgdGltZXJJZCxcbiAgICAgIGxhc3RDYWxsVGltZSxcbiAgICAgIGxhc3RJbnZva2VUaW1lID0gMCxcbiAgICAgIGxlYWRpbmcgPSBmYWxzZSxcbiAgICAgIG1heGluZyA9IGZhbHNlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHdhaXQgPSB0b051bWJlcih3YWl0KSB8fCAwO1xuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gISFvcHRpb25zLmxlYWRpbmc7XG4gICAgbWF4aW5nID0gJ21heFdhaXQnIGluIG9wdGlvbnM7XG4gICAgbWF4V2FpdCA9IG1heGluZyA/IG5hdGl2ZU1heCh0b051bWJlcihvcHRpb25zLm1heFdhaXQpIHx8IDAsIHdhaXQpIDogbWF4V2FpdDtcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gaW52b2tlRnVuYyh0aW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBsYXN0QXJncyxcbiAgICAgICAgdGhpc0FyZyA9IGxhc3RUaGlzO1xuXG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gbGVhZGluZ0VkZ2UodGltZSkge1xuICAgIC8vIFJlc2V0IGFueSBgbWF4V2FpdGAgdGltZXIuXG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIC8vIFN0YXJ0IHRoZSB0aW1lciBmb3IgdGhlIHRyYWlsaW5nIGVkZ2UuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAvLyBJbnZva2UgdGhlIGxlYWRpbmcgZWRnZS5cbiAgICByZXR1cm4gbGVhZGluZyA/IGludm9rZUZ1bmModGltZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiByZW1haW5pbmdXYWl0KHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lLFxuICAgICAgICByZXN1bHQgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cbiAgICByZXR1cm4gbWF4aW5nID8gbmF0aXZlTWluKHJlc3VsdCwgbWF4V2FpdCAtIHRpbWVTaW5jZUxhc3RJbnZva2UpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkSW52b2tlKHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lO1xuXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcbiAgICAvLyB0cmFpbGluZyBlZGdlLCB0aGUgc3lzdGVtIHRpbWUgaGFzIGdvbmUgYmFja3dhcmRzIGFuZCB3ZSdyZSB0cmVhdGluZ1xuICAgIC8vIGl0IGFzIHRoZSB0cmFpbGluZyBlZGdlLCBvciB3ZSd2ZSBoaXQgdGhlIGBtYXhXYWl0YCBsaW1pdC5cbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxuICAgICAgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkgfHwgKG1heGluZyAmJiB0aW1lU2luY2VMYXN0SW52b2tlID49IG1heFdhaXQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVyRXhwaXJlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpO1xuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcbiAgICAgIHJldHVybiB0cmFpbGluZ0VkZ2UodGltZSk7XG4gICAgfVxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgcmVtYWluaW5nV2FpdCh0aW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGluZ0VkZ2UodGltZSkge1xuICAgIHRpbWVySWQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGludm9rZSBpZiB3ZSBoYXZlIGBsYXN0QXJnc2Agd2hpY2ggbWVhbnMgYGZ1bmNgIGhhcyBiZWVuXG4gICAgLy8gZGVib3VuY2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XG4gICAgICByZXR1cm4gaW52b2tlRnVuYyh0aW1lKTtcbiAgICB9XG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICh0aW1lcklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICB9XG4gICAgbGFzdEludm9rZVRpbWUgPSAwO1xuICAgIGxhc3RBcmdzID0gbGFzdENhbGxUaW1lID0gbGFzdFRoaXMgPSB0aW1lcklkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgcmV0dXJuIHRpbWVySWQgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRyYWlsaW5nRWRnZShub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKSxcbiAgICAgICAgaXNJbnZva2luZyA9IHNob3VsZEludm9rZSh0aW1lKTtcblxuICAgIGxhc3RBcmdzID0gYXJndW1lbnRzO1xuICAgIGxhc3RUaGlzID0gdGhpcztcbiAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcbiAgICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgICBpZiAobWF4aW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBpbnZvY2F0aW9ucyBpbiBhIHRpZ2h0IGxvb3AuXG4gICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgICAgIHJldHVybiBpbnZva2VGdW5jKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZGVib3VuY2VkLmNhbmNlbCA9IGNhbmNlbDtcbiAgZGVib3VuY2VkLmZsdXNoID0gZmx1c2g7XG4gIHJldHVybiBkZWJvdW5jZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlYm91bmNlO1xuIiwidmFyIHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xuXG4vKipcbiAqIEBuYW1lIHNob3dQYW5lbExpc3RlbmVyXG4gKiBAZGVzYyBUaGUgZXZlbnQgaGFuZGxlciBmb3IgY2xpY2tpbmcgb24gYSBidXR0b24gaW4gYW4gYWNjb3JkaW9uLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBBbiBIVE1MIGVsZW1lbnQgbW9zdCBsaWtlbHkgYSA8YnV0dG9uPi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBldiAtIEEgRE9NIGV2ZW50IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gc2hvd1BhbmVsTGlzdGVuZXIgKGVsLCBldikge1xuICB2YXIgZXhwYW5kZWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKSA9PT0gJ3RydWUnO1xuICB0aGlzLmhpZGVBbGwoKTtcbiAgaWYgKCFleHBhbmRlZCkge1xuICAgIHRoaXMuc2hvdyhlbCk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEBjbGFzcyBBY2NvcmRpb25cbiAqXG4gKiBBbiBhY2NvcmRpb24gY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIEhUTUxFbGVtZW50IHRvIHR1cm4gaW50byBhbiBhY2NvcmRpb24uXG4gKi9cbmZ1bmN0aW9uIEFjY29yZGlvbiAoZWwpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLnJvb3QgPSBlbDtcblxuICAvLyBkZWxlZ2F0ZSBjbGljayBldmVudHMgb24gZWFjaCA8YnV0dG9uPlxuICB2YXIgYnV0dG9ucyA9IHNlbGVjdCgnYnV0dG9uJywgdGhpcy5yb290KTtcbiAgYnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgIGlmIChlbC5hdHRhY2hFdmVudCkge1xuICAgICAgZWwuYXR0YWNoRXZlbnQoJ29uY2xpY2snLCBzaG93UGFuZWxMaXN0ZW5lci5iaW5kKHNlbGYsIGVsKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd1BhbmVsTGlzdGVuZXIuYmluZChzZWxmLCBlbCkpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gZmluZCB0aGUgZmlyc3QgZXhwYW5kZWQgYnV0dG9uXG4gIHZhciBleHBhbmRlZCA9IHRoaXMuJCgnYnV0dG9uW2FyaWEtZXhwYW5kZWQ9dHJ1ZV0nKVsgMCBdO1xuICB0aGlzLmhpZGVBbGwoKTtcbiAgaWYgKGV4cGFuZGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnNob3coZXhwYW5kZWQpO1xuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqL1xuQWNjb3JkaW9uLnByb3RvdHlwZS4kID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHJldHVybiBzZWxlY3Qoc2VsZWN0b3IsIHRoaXMucm9vdCk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJ1dHRvblxuICogQHJldHVybiB7QWNjb3JkaW9ufVxuICovXG5BY2NvcmRpb24ucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoYnV0dG9uKSB7XG4gIHZhciBzZWxlY3RvciA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKSxcbiAgICBjb250ZW50ID0gdGhpcy4kKCcjJyArIHNlbGVjdG9yKVsgMCBdO1xuXG4gIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG4gIGNvbnRlbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYnV0dG9uXG4gKiBAcmV0dXJuIHtBY2NvcmRpb259XG4gKi9cbkFjY29yZGlvbi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uIChidXR0b24pIHtcbiAgdmFyIHNlbGVjdG9yID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpLFxuICAgIGNvbnRlbnQgPSB0aGlzLiQoJyMnICsgc2VsZWN0b3IpWyAwIF07XG5cbiAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuICBjb250ZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBmYWxzZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBAcmV0dXJuIHtBY2NvcmRpb259XG4gKi9cbkFjY29yZGlvbi5wcm90b3R5cGUuaGlkZUFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgYnV0dG9ucyA9IHRoaXMuJCgndWwgPiBsaSA+IGJ1dHRvbiwgLnVzYS1hY2NvcmRpb24tYnV0dG9uJyk7XG4gIGJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbiAoYnV0dG9uKSB7XG4gICAgc2VsZi5oaWRlKGJ1dHRvbik7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQWNjb3JkaW9uO1xuIiwidmFyIHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xudmFyIGRpc3BhdGNoID0gcmVxdWlyZSgnLi4vdXRpbHMvZGlzcGF0Y2gnKTtcblxuZnVuY3Rpb24gYmFubmVyQ2xpY2tIYW5kbGVyIChldmVudCkge1xuICAoZXZlbnQucHJldmVudERlZmF1bHQpID8gZXZlbnQucHJldmVudERlZmF1bHQoKSA6IGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG5cbiAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCd1c2EtYmFubmVyLWhlYWRlci1leHBhbmRlZCcpO1xufVxuXG5mdW5jdGlvbiBiYW5uZXJJbml0ICgpIHtcbiAgdmFyIGJhbm5lcnMgPSBzZWxlY3QoJy51c2EtYmFubmVyLWhlYWRlcicpO1xuXG4gIGJhbm5lcnMuZm9yRWFjaChmdW5jdGlvbiAoYmFubmVyKSB7XG4gICAgdmFyIGJhbm5lckNsaWNrID0gYmFubmVyQ2xpY2tIYW5kbGVyLmJpbmQoYmFubmVyKTtcbiAgICBzZWxlY3QoJ1thcmlhLWNvbnRyb2xzXScsIGJhbm5lcikuZm9yRWFjaChmdW5jdGlvbiAoYnV0dG9uKSB7XG4gICAgICBkaXNwYXRjaChidXR0b24sICdjbGljaycsIGJhbm5lckNsaWNrKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFubmVySW5pdDtcbiIsInZhciBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcbnZhciBkaXNwYXRjaCA9IHJlcXVpcmUoJy4uL3V0aWxzL2Rpc3BhdGNoJyk7XG5cbmZ1bmN0aW9uIGdldFNpYmxpbmdzIChlbCkge1xuICB2YXIgbiA9IGVsLnBhcmVudE5vZGUuZmlyc3RDaGlsZDtcbiAgdmFyIG1hdGNoZXMgPSBbXTtcblxuICB3aGlsZSAobikge1xuICAgIGlmIChuLm5vZGVUeXBlID09IDEgJiYgbiAhPSBlbCkge1xuICAgICAgbWF0Y2hlcy5wdXNoKG4pO1xuICAgIH1cbiAgICBuID0gbi5uZXh0U2libGluZztcbiAgfVxuXG4gIHJldHVybiBtYXRjaGVzO1xufVxuXG52YXIgc2hvd1BhbmVsTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBwYW5lbFRvU2hvdyA9IHRoaXMucGFyZW50Tm9kZTtcbiAgdmFyIG90aGVyUGFuZWxzID0gZ2V0U2libGluZ3MocGFuZWxUb1Nob3cpO1xuICBwYW5lbFRvU2hvdy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgb3RoZXJQYW5lbHMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgfSk7XG59O1xuXG52YXIgZXZlbnRzID0gW107XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZm9vdGVyQWNjb3JkaW9uICgpIHtcblxuICB2YXIgbmF2TGlzdCA9IHNlbGVjdCgnLnVzYS1mb290ZXItYmlnIG5hdiB1bCcpO1xuICB2YXIgcHJpbWFyeUxpbmsgPSBzZWxlY3QoJy51c2EtZm9vdGVyLWJpZyBuYXYgLnVzYS1mb290ZXItcHJpbWFyeS1saW5rJyk7XG5cbiAgaWYgKGV2ZW50cy5sZW5ndGgpIHtcbiAgICBldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgZS5vZmYoKTtcbiAgICB9KTtcbiAgICBldmVudHMgPSBbXTtcbiAgfVxuXG4gIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDYwMCkge1xuXG4gICAgbmF2TGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfSk7XG5cbiAgICBwcmltYXJ5TGluay5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgZXZlbnRzLnB1c2goXG4gICAgICAgIGRpc3BhdGNoKGVsLCAnY2xpY2snLCBzaG93UGFuZWxMaXN0ZW5lcilcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgfSBlbHNlIHtcbiAgICBuYXZMaXN0LmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICB9KTtcbiAgfVxufTtcbiIsInZhciBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcbnZhciBkaXNwYXRjaCA9IHJlcXVpcmUoJy4uL3V0aWxzL2Rpc3BhdGNoJyk7XG5cbnZhciBjbGlja0V2ZW50ID0gKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA/ICd0b3VjaHN0YXJ0JyA6ICdjbGljaycpO1xudmFyIGRpc3BhdGNoZXJzID0gW107XG5cbmZ1bmN0aW9uIGhhbmRsZU5hdkVsZW1lbnRzIChlKSB7XG5cbiAgdmFyIHRvZ2dsZUVsZW1lbnRzID0gc2VsZWN0KCcudXNhLW92ZXJsYXksIC51c2EtbmF2Jyk7XG4gIHZhciBuYXZDbG9zZUVsZW1lbnQgPSBzZWxlY3QoJy51c2EtbmF2LWNsb3NlJylbIDAgXTtcblxuICB0b2dnbGVFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdpcy12aXNpYmxlJyk7XG4gIH0pO1xuXG4gIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgndXNhLW1vYmlsZV9uYXYtYWN0aXZlJyk7XG4gIG5hdkNsb3NlRWxlbWVudC5mb2N1cygpO1xuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gbmF2SW5pdCAoKSB7XG4gIHZhciBuYXZFbGVtZW50cyA9IHNlbGVjdCgnLnVzYS1tZW51LWJ0biwgLnVzYS1vdmVybGF5LCAudXNhLW5hdi1jbG9zZScpO1xuXG4gIGRpc3BhdGNoZXJzID0gbmF2RWxlbWVudHMubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoKGVsZW1lbnQsIGNsaWNrRXZlbnQsIGhhbmRsZU5hdkVsZW1lbnRzKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG5hdk9mZiAoKSB7XG4gIHdoaWxlIChkaXNwYXRjaGVycy5sZW5ndGgpIHtcbiAgICBkaXNwYXRjaGVycy5wb3AoKS5vZmYoKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdkluaXQ7XG5tb2R1bGUuZXhwb3J0cy5vZmYgPSBuYXZPZmY7XG4iLCJ2YXIgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG52YXIgZGlzcGF0Y2ggPSByZXF1aXJlKCcuLi91dGlscy9kaXNwYXRjaCcpO1xuXG52YXIgVklTVUFMTFlfSElEREVOID0gJ3VzYS1zci1vbmx5JztcblxudmFyIGNsaWNrRXZlbnQgPSAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KVxuICA/ICd0b3VjaHN0YXJ0J1xuICA6ICdjbGljayc7XG5cbnZhciBzZWFyY2hGb3JtO1xudmFyIHNlYXJjaEJ1dHRvbjtcbnZhciBzZWFyY2hCdXR0b25Db250YWluZXI7XG5cbnZhciBhY3RpdmF0ZURpc3BhdGNoZXI7XG52YXIgZGVhY3RpdmF0ZURpc3BhdGNoZXI7XG5cbmZ1bmN0aW9uIHNlYXJjaEJ1dHRvbkNsaWNrSGFuZGxlciAoZXZlbnQpIHtcbiAgaWYgKHNlYXJjaEZvcm0uaGlkZGVuKSB7XG4gICAgY2xvc2VTZWFyY2goKTtcbiAgfSBlbHNlIHtcbiAgICBvcGVuU2VhcmNoKCk7XG4gICAgZGVhY3RpdmF0ZURpc3BhdGNoZXIgPSBkaXNwYXRjaChkb2N1bWVudC5ib2R5LCBjbGlja0V2ZW50LCBzZWFyY2hPcGVuQ2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gc2VhcmNoT3BlbkNsaWNrSGFuZGxlciAoZXZlbnQpIHtcbiAgaWYgKCEgc2VhcmNoRm9ybUNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICBjbG9zZVNlYXJjaCgpO1xuICAgIGRlYWN0aXZhdGVEaXNwYXRjaGVyLm9mZigpO1xuICAgIGRlYWN0aXZhdGVEaXNwYXRjaGVyID0gdW5kZWZpbmVkO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9wZW5TZWFyY2ggKCkge1xuICBzZWFyY2hGb3JtLmNsYXNzTGlzdC5yZW1vdmUoVklTVUFMTFlfSElEREVOKTtcbiAgdmFyIGlucHV0ID0gc2VhcmNoRm9ybS5xdWVyeVNlbGVjdG9yKCdbdHlwZT1zZWFyY2hdJyk7XG4gIGlmIChpbnB1dCkge1xuICAgIGlucHV0LmZvY3VzKCk7XG4gIH1cbiAgc2VhcmNoQnV0dG9uLmhpZGRlbiA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIGNsb3NlU2VhcmNoICgpIHtcbiAgc2VhcmNoRm9ybS5jbGFzc0xpc3QuYWRkKFZJU1VBTExZX0hJRERFTik7XG4gIHNlYXJjaEJ1dHRvbi5oaWRkZW4gPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gc2VhcmNoRm9ybUNvbnRhaW5zIChlbGVtZW50KSB7XG4gIHJldHVybiAoc2VhcmNoRm9ybSAmJiBzZWFyY2hGb3JtLmNvbnRhaW5zKGVsZW1lbnQpKSB8fFxuICAgICAgICAgKHNlYXJjaEJ1dHRvbkNvbnRhaW5lciAmJiBzZWFyY2hCdXR0b25Db250YWluZXIuY29udGFpbnMoZWxlbWVudCkpO1xufVxuXG5mdW5jdGlvbiBzZWFyY2hJbml0ICgpIHtcbiAgc2VhcmNoRm9ybSA9IHNlbGVjdCgnLmpzLXNlYXJjaC1mb3JtJylbIDAgXTtcbiAgc2VhcmNoQnV0dG9uID0gc2VsZWN0KCcuanMtc2VhcmNoLWJ1dHRvbicpWyAwIF07XG4gIHNlYXJjaEJ1dHRvbkNvbnRhaW5lciA9IHNlbGVjdCgnLmpzLXNlYXJjaC1idXR0b24tY29udGFpbmVyJylbIDAgXTtcblxuICBpZiAoc2VhcmNoQnV0dG9uICYmIHNlYXJjaEZvcm0pIHtcbiAgICBjbG9zZVNlYXJjaCgpO1xuICAgIGFjdGl2YXRlRGlzcGF0Y2hlciA9IGRpc3BhdGNoKHNlYXJjaEJ1dHRvbiwgY2xpY2tFdmVudCwgc2VhcmNoQnV0dG9uQ2xpY2tIYW5kbGVyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZWFyY2hPZmYgKCkge1xuICBpZiAoYWN0aXZhdGVEaXNwYXRjaGVyKSB7XG4gICAgYWN0aXZhdGVEaXNwYXRjaGVyLm9mZigpO1xuICB9XG4gIGlmIChkZWFjdGl2YXRlRGlzcGF0Y2hlcikge1xuICAgIGRlYWN0aXZhdGVEaXNwYXRjaGVyLm9mZigpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2VhcmNoSW5pdDtcbm1vZHVsZS5leHBvcnRzLm9mZiA9IHNlYXJjaE9mZjtcbiIsIi8qKlxuICogRmxpcHMgZ2l2ZW4gSU5QVVQgZWxlbWVudHMgYmV0d2VlbiBtYXNrZWQgKGhpZGluZyB0aGUgZmllbGQgdmFsdWUpIGFuZCB1bm1hc2tlZFxuICogQHBhcmFtIHtBcnJheS5IVE1MRWxlbWVudH0gZmllbGRzIC0gQW4gYXJyYXkgb2YgSU5QVVQgZWxlbWVudHNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gbWFzayAtIFdoZXRoZXIgdGhlIG1hc2sgc2hvdWxkIGJlIGFwcGxpZWQsIGhpZGluZyB0aGUgZmllbGQgdmFsdWVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZmllbGRzLCBtYXNrKSB7XG4gIGZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgIGZpZWxkLnNldEF0dHJpYnV0ZSgnYXV0b2NhcGl0YWxpemUnLCAnb2ZmJyk7XG4gICAgZmllbGQuc2V0QXR0cmlidXRlKCdhdXRvY29ycmVjdCcsICdvZmYnKTtcbiAgICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCBtYXNrID8gJ3Bhc3N3b3JkJyA6ICd0ZXh0Jyk7XG4gIH0pO1xufTtcbiIsInZhciB0b2dnbGVGaWVsZE1hc2sgPSByZXF1aXJlKCcuL3RvZ2dsZS1maWVsZC1tYXNrJyk7XG52YXIgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgZGVjb3JhdGVzIGFuIEhUTUwgZWxlbWVudCB3aXRoIHRoZSBhYmlsaXR5IHRvIHRvZ2dsZSB0aGVcbiAqIG1hc2tlZCBzdGF0ZSBvZiBhbiBpbnB1dCBmaWVsZCAobGlrZSBhIHBhc3N3b3JkKSB3aGVuIGNsaWNrZWQuXG4gKiBUaGUgaWRzIG9mIHRoZSBmaWVsZHMgdG8gYmUgbWFza2VkIHdpbGwgYmUgcHVsbGVkIGRpcmVjdGx5IGZyb20gdGhlIGJ1dHRvbidzXG4gKiBgYXJpYS1jb250cm9sc2AgYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbCAgICBQYXJlbnQgZWxlbWVudCBjb250YWluaW5nIHRoZSBmaWVsZHMgdG8gYmUgbWFza2VkXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHNob3dUZXh0ICAgQnV0dG9uIHRleHQgc2hvd24gd2hlbiBmaWVsZCBpcyBtYXNrZWRcbiAqIEBwYXJhbSAge1N0cmluZ30gaGlkZVRleHQgICBCdXR0b24gdGV4dCBzaG93IHdoZW4gZmllbGQgaXMgdW5tYXNrZWRcbiAqIEByZXR1cm4ge31cbiAqL1xudmFyIHRvZ2dsZUZvcm1JbnB1dCA9IGZ1bmN0aW9uIChlbCwgc2hvd1RleHQsIGhpZGVUZXh0KSB7XG4gIHZhciBkZWZhdWx0U2VsZWN0b3JzID0gZWwuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG5cbiAgaWYgKCFkZWZhdWx0U2VsZWN0b3JzIHx8IGRlZmF1bHRTZWxlY3RvcnMudHJpbSgpLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignRGlkIHlvdSBmb3JnZXQgdG8gZGVmaW5lIHNlbGVjdG9ycyBpbiB0aGUgYXJpYS1jb250cm9scyBhdHRyaWJ1dGU/IENoZWNrIGVsZW1lbnQgJyArIGVsLm91dGVySFRNTCk7XG4gIH1cblxuICB2YXIgZmllbGRTZWxlY3RvciA9IGdldFNlbGVjdG9ycyhkZWZhdWx0U2VsZWN0b3JzKTtcbiAgdmFyIGZvcm1FbGVtZW50ID0gZ2V0Rm9ybVBhcmVudChlbCk7XG4gIGlmICghZm9ybUVsZW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3RvZ2dsZUZvcm1JbnB1dCgpIG5lZWRzIHRoZSBzdXBwbGllZCBlbGVtZW50IHRvIGJlIGluc2lkZSBhIDxmb3JtPi4gQ2hlY2sgZWxlbWVudCAnICsgZWwub3V0ZXJIVE1MKTtcbiAgfVxuICB2YXIgZmllbGRzID0gc2VsZWN0KGZpZWxkU2VsZWN0b3IsIGZvcm1FbGVtZW50KTtcbiAgdmFyIG1hc2tlZCA9IGZhbHNlO1xuXG4gIHZhciB0b2dnbGVDbGlja0xpc3RlbmVyID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICB0b2dnbGVGaWVsZE1hc2soZmllbGRzLCBtYXNrZWQpO1xuICAgIGVsLnRleHRDb250ZW50ID0gbWFza2VkID8gc2hvd1RleHQgOiBoaWRlVGV4dDtcbiAgICBtYXNrZWQgPSAhbWFza2VkO1xuICB9O1xuXG4gIGlmIChlbC5hdHRhY2hFdmVudCkge1xuICAgIGVsLmF0dGFjaEV2ZW50KCdvbmNsaWNrJywgdG9nZ2xlQ2xpY2tMaXN0ZW5lcik7XG4gIH0gZWxzZSB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVDbGlja0xpc3RlbmVyKTtcbiAgfVxufTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gdHVybiBhIHN0cmluZyBvZiBpZHMgaW50byB2YWxpZCBzZWxlY3RvcnNcbiAqIEBwYXJhbSAge1N0cmluZ30gc2VsZWN0b3JzIFNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIGlkcyBvZiBmaWVsZHMgdG8gYmUgbWFza2VkXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAgICBDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBzZWxlY3RvcnNcbiAqL1xuZnVuY3Rpb24gZ2V0U2VsZWN0b3JzIChzZWxlY3RvcnMpIHtcbiAgdmFyIHNlbGVjdG9yc0xpc3QgPSBzZWxlY3RvcnMuc3BsaXQoJyAnKTtcblxuICByZXR1cm4gc2VsZWN0b3JzTGlzdC5tYXAoZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuICcjJyArIHNlbGVjdG9yO1xuICB9KS5qb2luKCcsICcpO1xufVxuXG4vKipcbiAqIFNlYXJjaGVzIHVwIHRoZSB0cmVlIGZyb20gdGhlIGVsZW1lbnQgdG8gZmluZCBhIEZvcm0gZWxlbWVudCwgYW5kIHJldHVybnMgaXQsXG4gKiBvciBudWxsIGlmIG5vIEZvcm0gaXMgZm91bmRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC0gQ2hpbGQgZWxlbWVudCB0byBzdGFydCBzZWFyY2hcbiAqL1xuZnVuY3Rpb24gZ2V0Rm9ybVBhcmVudCAoZWwpIHtcbiAgd2hpbGUgKGVsICYmIGVsLnRhZ05hbWUgIT09ICdGT1JNJykge1xuICAgIGVsID0gZWwucGFyZW50Tm9kZTtcbiAgfVxuICByZXR1cm4gZWw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9nZ2xlRm9ybUlucHV0O1xuIiwidmFyIHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xudmFyIGRpc3BhdGNoID0gcmVxdWlyZSgnLi4vdXRpbHMvZGlzcGF0Y2gnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB2YWxpZGF0b3IgKGVsKSB7XG4gIHZhciBkYXRhID0gZ2V0RGF0YShlbCk7XG4gIHZhciBrZXk7XG4gIHZhciB2YWxpZGF0b3JOYW1lO1xuICB2YXIgdmFsaWRhdG9yUGF0dGVybjtcbiAgdmFyIHZhbGlkYXRvckNoZWNrYm94O1xuICB2YXIgY2hlY2tMaXN0ID0gc2VsZWN0KGRhdGEudmFsaWRhdGlvbmVsZW1lbnQpWyAwIF07XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGUgKCkge1xuICAgIGZvciAoa2V5IGluIGRhdGEpIHtcbiAgICAgIGlmIChrZXkuc3RhcnRzV2l0aCgndmFsaWRhdGUnKSkge1xuICAgICAgICB2YWxpZGF0b3JOYW1lID0ga2V5LnNwbGl0KCd2YWxpZGF0ZScpWyAxIF07XG4gICAgICAgIHZhbGlkYXRvclBhdHRlcm4gPSBuZXcgUmVnRXhwKGRhdGFbIGtleSBdKTtcbiAgICAgICAgdmFsaWRhdG9yU2VsZWN0b3IgPSAnW2RhdGEtdmFsaWRhdG9yPScgKyB2YWxpZGF0b3JOYW1lICsgJ10nO1xuICAgICAgICB2YWxpZGF0b3JDaGVja2JveCA9IHNlbGVjdCh2YWxpZGF0b3JTZWxlY3RvciwgY2hlY2tMaXN0KVsgMCBdO1xuXG4gICAgICAgIHZhciBjaGVja2VkID0gdmFsaWRhdG9yUGF0dGVybi50ZXN0KGVsLnZhbHVlKTtcbiAgICAgICAgdmFsaWRhdG9yQ2hlY2tib3guY2xhc3NMaXN0LnRvZ2dsZSgndXNhLWNoZWNrbGlzdC1jaGVja2VkJywgY2hlY2tlZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGlzcGF0Y2goZWwsICdrZXl1cCcsIHZhbGlkYXRlKTtcbn07XG5cbi8qKlxuICogRXh0cmFjdHMgYXR0cmlidXRlcyBuYW1lZCB3aXRoIHRoZSBwYXR0ZXJuIFwiZGF0YS1bTkFNRV1cIiBmcm9tIGEgZ2l2ZW5cbiAqIEhUTUxFbGVtZW50LCB0aGVuIHJldHVybnMgYW4gb2JqZWN0IHBvcHVsYXRlZCB3aXRoIHRoZSBOQU1FL3ZhbHVlIHBhaXJzLlxuICogQW55IGh5cGhlbnMgaW4gTkFNRSBhcmUgcmVtb3ZlZC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cblxuZnVuY3Rpb24gZ2V0RGF0YSAoZWwpIHtcbiAgaWYgKCFlbC5oYXNBdHRyaWJ1dGVzKCkpIHJldHVybjtcbiAgdmFyIGRhdGEgPSB7fTtcbiAgdmFyIGF0dHJzID0gZWwuYXR0cmlidXRlcztcbiAgZm9yICh2YXIgaSA9IGF0dHJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdmFyIG1hdGNoZXMgPSBhdHRyc1sgaSBdLm5hbWUubWF0Y2goL2RhdGEtKC4qKS9pKTtcbiAgICBpZiAobWF0Y2hlcyAmJiBtYXRjaGVzWyAxIF0pIHtcbiAgICAgIHZhciBuYW1lID0gbWF0Y2hlc1sgMSBdLnJlcGxhY2UoLy0vLCAnJyk7XG4gICAgICBkYXRhWyBuYW1lIF0gPSBhdHRyc1sgaSBdLnZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGF0YTtcbn1cbiIsInZhciBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcbnZhciB3aGVuRE9NUmVhZHkgPSByZXF1aXJlKCcuLi91dGlscy93aGVuLWRvbS1yZWFkeScpO1xudmFyIEFjY29yZGlvbiA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvYWNjb3JkaW9uJyk7XG5cbndoZW5ET01SZWFkeShmdW5jdGlvbiBpbml0QWNjb3JkaW9ucyAoKSB7XG5cbiAgdmFyIGFjY29yZGlvbnMgPSBzZWxlY3QoJy51c2EtYWNjb3JkaW9uLCAudXNhLWFjY29yZGlvbi1ib3JkZXJlZCcpO1xuICBhY2NvcmRpb25zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgbmV3IEFjY29yZGlvbihlbCk7XG4gIH0pO1xufSk7XG4iLCJ2YXIgd2hlbkRPTVJlYWR5ID0gcmVxdWlyZSgnLi4vdXRpbHMvd2hlbi1kb20tcmVhZHknKTtcbnZhciBiYW5uZXJJbml0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9iYW5uZXInKTtcblxud2hlbkRPTVJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICBiYW5uZXJJbml0KCk7XG5cbn0pO1xuXG4iLCJ2YXIgZGVib3VuY2UgPSByZXF1aXJlKCdsb2Rhc2guZGVib3VuY2UnKTtcbnZhciB3aGVuRE9NUmVhZHkgPSByZXF1aXJlKCcuLi91dGlscy93aGVuLWRvbS1yZWFkeScpO1xudmFyIGRpc3BhdGNoID0gcmVxdWlyZSgnLi4vdXRpbHMvZGlzcGF0Y2gnKTtcbnZhciBmb290ZXJBY2NvcmRpb24gPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2Zvb3RlcicpO1xuXG53aGVuRE9NUmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gIGZvb3RlckFjY29yZGlvbigpO1xuXG4gIGRpc3BhdGNoKHdpbmRvdywgJ3Jlc2l6ZScsIGRlYm91bmNlKGZvb3RlckFjY29yZGlvbiwgMTgwKSk7XG5cbn0pO1xuIiwidmFyIHdoZW5ET01SZWFkeSA9IHJlcXVpcmUoJy4uL3V0aWxzL3doZW4tZG9tLXJlYWR5Jyk7XG52YXIgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG52YXIgdmFsaWRhdG9yID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy92YWxpZGF0b3InKTtcbnZhciB0b2dnbGVGb3JtSW5wdXQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3RvZ2dsZS1mb3JtLWlucHV0Jyk7XG5cbndoZW5ET01SZWFkeShmdW5jdGlvbiAoKSB7XG4gIHZhciBlbFNob3dQYXNzd29yZCA9IHNlbGVjdCgnLnVzYS1zaG93X3Bhc3N3b3JkJylbIDAgXTtcbiAgdmFyIGVsRm9ybUlucHV0ID0gc2VsZWN0KCcudXNhLXNob3dfbXVsdGlwYXNzd29yZCcpWyAwIF07XG4gIHZhciBlbFZhbGlkYXRvciA9IHNlbGVjdCgnLmpzLXZhbGlkYXRlX3Bhc3N3b3JkJylbIDAgXTtcblxuICBlbFNob3dQYXNzd29yZCAmJiB0b2dnbGVGb3JtSW5wdXQoZWxTaG93UGFzc3dvcmQsICdTaG93IFBhc3N3b3JkJywgJ0hpZGUgUGFzc3dvcmQnKTtcbiAgZWxGb3JtSW5wdXQgJiYgdG9nZ2xlRm9ybUlucHV0KGVsRm9ybUlucHV0LCAnU2hvdyBteSB0eXBpbmcnLCAnSGlkZSBteSB0eXBpbmcnKTtcbiAgZWxWYWxpZGF0b3IgJiYgdmFsaWRhdG9yKGVsVmFsaWRhdG9yKTtcbn0pO1xuXG4iLCJ2YXIgd2hlbkRPTVJlYWR5ID0gcmVxdWlyZSgnLi4vdXRpbHMvd2hlbi1kb20tcmVhZHknKTtcbnZhciBuYXZJbml0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9uYXZpZ2F0aW9uJyk7XG5cbndoZW5ET01SZWFkeShuYXZJbml0KTtcbiIsIi8vIHN1cHBvcnQgZm9yIEhUTUxFbGVtZW50I2hpZGRlblxucmVxdWlyZSgnLi4vcG9seWZpbGxzL2VsZW1lbnQtaGlkZGVuJyk7XG4vLyBzdXBwb3J0IGZvciBFbGVtZW50I2NsYXNzTGlzdFxucmVxdWlyZSgnY2xhc3NsaXN0LXBvbHlmaWxsJyk7XG5cbi8qKlxuICogVGhpcyBmaWxlIGRlZmluZXMga2V5IEVDTUFTY3JpcHQgNSBtZXRob2RzIHRoYXQgYXJlIHVzZWQgYnkgdGhlIFN0YW5kYXJkc1xuICogYnV0IG1heSBiZSBtaXNzaW5nIGluIG9sZGVyIGJyb3dzZXJzLlxuICovXG5cbi8qKlxuICogQXJyYXkucHJvdG90eXBlLmZvckVhY2goKVxuICogVGFrZW4gZnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9mb3JFYWNoXG4gKi9cblxuLy8gUHJvZHVjdGlvbiBzdGVwcyBvZiBFQ01BLTI2MiwgRWRpdGlvbiA1LCAxNS40LjQuMThcbi8vIFJlZmVyZW5jZTogaHR0cDovL2VzNS5naXRodWIuaW8vI3gxNS40LjQuMThcbmlmICghQXJyYXkucHJvdG90eXBlLmZvckVhY2gpIHtcblxuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgdGhpc0FyZykge1xuXG4gICAgdmFyIFQsIGs7XG5cbiAgICBpZiAodGhpcyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignIHRoaXMgaXMgbnVsbCBvciBub3QgZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIC8vIDEuIExldCBPIGJlIHRoZSByZXN1bHQgb2YgY2FsbGluZyB0b09iamVjdCgpIHBhc3NpbmcgdGhlXG4gICAgLy8gfHRoaXN8IHZhbHVlIGFzIHRoZSBhcmd1bWVudC5cbiAgICB2YXIgTyA9IE9iamVjdCh0aGlzKTtcblxuICAgIC8vIDIuIExldCBsZW5WYWx1ZSBiZSB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIEdldCgpIGludGVybmFsXG4gICAgLy8gbWV0aG9kIG9mIE8gd2l0aCB0aGUgYXJndW1lbnQgXCJsZW5ndGhcIi5cbiAgICAvLyAzLiBMZXQgbGVuIGJlIHRvVWludDMyKGxlblZhbHVlKS5cbiAgICB2YXIgbGVuID0gTy5sZW5ndGggPj4+IDA7XG5cbiAgICAvLyA0LiBJZiBpc0NhbGxhYmxlKGNhbGxiYWNrKSBpcyBmYWxzZSwgdGhyb3cgYSBUeXBlRXJyb3IgZXhjZXB0aW9uLiBcbiAgICAvLyBTZWU6IGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDkuMTFcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGNhbGxiYWNrICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgIH1cblxuICAgIC8vIDUuIElmIHRoaXNBcmcgd2FzIHN1cHBsaWVkLCBsZXQgVCBiZSB0aGlzQXJnOyBlbHNlIGxldFxuICAgIC8vIFQgYmUgdW5kZWZpbmVkLlxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgVCA9IHRoaXNBcmc7XG4gICAgfVxuXG4gICAgLy8gNi4gTGV0IGsgYmUgMFxuICAgIGsgPSAwO1xuXG4gICAgLy8gNy4gUmVwZWF0LCB3aGlsZSBrIDwgbGVuXG4gICAgd2hpbGUgKGsgPCBsZW4pIHtcblxuICAgICAgdmFyIGtWYWx1ZTtcblxuICAgICAgLy8gYS4gTGV0IFBrIGJlIFRvU3RyaW5nKGspLlxuICAgICAgLy8gICAgVGhpcyBpcyBpbXBsaWNpdCBmb3IgTEhTIG9wZXJhbmRzIG9mIHRoZSBpbiBvcGVyYXRvclxuICAgICAgLy8gYi4gTGV0IGtQcmVzZW50IGJlIHRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGUgSGFzUHJvcGVydHlcbiAgICAgIC8vICAgIGludGVybmFsIG1ldGhvZCBvZiBPIHdpdGggYXJndW1lbnQgUGsuXG4gICAgICAvLyAgICBUaGlzIHN0ZXAgY2FuIGJlIGNvbWJpbmVkIHdpdGggY1xuICAgICAgLy8gYy4gSWYga1ByZXNlbnQgaXMgdHJ1ZSwgdGhlblxuICAgICAgaWYgKGsgaW4gTykge1xuXG4gICAgICAgIC8vIGkuIExldCBrVmFsdWUgYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBHZXQgaW50ZXJuYWxcbiAgICAgICAgLy8gbWV0aG9kIG9mIE8gd2l0aCBhcmd1bWVudCBQay5cbiAgICAgICAga1ZhbHVlID0gT1sgayBdO1xuXG4gICAgICAgIC8vIGlpLiBDYWxsIHRoZSBDYWxsIGludGVybmFsIG1ldGhvZCBvZiBjYWxsYmFjayB3aXRoIFQgYXNcbiAgICAgICAgLy8gdGhlIHRoaXMgdmFsdWUgYW5kIGFyZ3VtZW50IGxpc3QgY29udGFpbmluZyBrVmFsdWUsIGssIGFuZCBPLlxuICAgICAgICBjYWxsYmFjay5jYWxsKFQsIGtWYWx1ZSwgaywgTyk7XG4gICAgICB9XG4gICAgICAvLyBkLiBJbmNyZWFzZSBrIGJ5IDEuXG4gICAgICBrKys7XG4gICAgfVxuICAgIC8vIDguIHJldHVybiB1bmRlZmluZWRcbiAgfTtcbn1cblxuXG4vKipcbiAqIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKClcbiAqIFRha2VuIGZyb20gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRnVuY3Rpb24vYmluZFxuICovXG5cbi8vIFJlZmVyZW5jZTogaHR0cDovL2VzNS5naXRodWIuaW8vI3gxNS4zLjQuNVxuaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xuXG4gIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKG9UaGlzKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBjbG9zZXN0IHRoaW5nIHBvc3NpYmxlIHRvIHRoZSBFQ01BU2NyaXB0IDVcbiAgICAgIC8vIGludGVybmFsIElzQ2FsbGFibGUgZnVuY3Rpb25cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kIC0gd2hhdCBpcyB0cnlpbmcgdG8gYmUgYm91bmQgaXMgbm90IGNhbGxhYmxlJyk7XG4gICAgfVxuXG4gICAgdmFyIGFBcmdzICAgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgZlRvQmluZCA9IHRoaXMsXG4gICAgICBmTk9QICAgID0gZnVuY3Rpb24gKCkge30sXG4gICAgICBmQm91bmQgID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZlRvQmluZC5hcHBseSh0aGlzIGluc3RhbmNlb2YgZk5PUCA/IHRoaXMgOiBvVGhpcyxcbiAgICAgICAgICAgICAgICBhQXJncy5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgfTtcblxuICAgIGlmICh0aGlzLnByb3RvdHlwZSkge1xuICAgICAgLy8gRnVuY3Rpb24ucHJvdG90eXBlIGRvZXNuJ3QgaGF2ZSBhIHByb3RvdHlwZSBwcm9wZXJ0eVxuICAgICAgZk5PUC5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTsgXG4gICAgfVxuICAgIGZCb3VuZC5wcm90b3R5cGUgPSBuZXcgZk5PUCgpO1xuXG4gICAgcmV0dXJuIGZCb3VuZDtcbiAgfTtcblxufVxuIiwidmFyIHdoZW5ET01SZWFkeSA9IHJlcXVpcmUoJy4uL3V0aWxzL3doZW4tZG9tLXJlYWR5Jyk7XG52YXIgc2VhcmNoSW5pdCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvc2VhcmNoJyk7XG5cbndoZW5ET01SZWFkeShzZWFyY2hJbml0KTtcbiIsInZhciBkaXNwYXRjaCA9IHJlcXVpcmUoJy4uL3V0aWxzL2Rpc3BhdGNoJyk7XG52YXIgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG52YXIgd2hlbkRPTVJlYWR5ID0gcmVxdWlyZSgnLi4vdXRpbHMvd2hlbi1kb20tcmVhZHknKTtcblxud2hlbkRPTVJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICAvLyBGaXhpbmcgc2tpcCBuYXYgZm9jdXMgYmVoYXZpb3IgaW4gY2hyb21lXG4gIHZhciBlbFNraXBuYXYgPSBzZWxlY3QoJy5za2lwbmF2JylbIDAgXTtcbiAgdmFyIGVsTWFpbkNvbnRlbnQgPSBzZWxlY3QoJyNtYWluLWNvbnRlbnQnKVsgMCBdO1xuXG4gIGlmIChlbFNraXBuYXYpIHtcbiAgICBkaXNwYXRjaChlbFNraXBuYXYsICdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGVsTWFpbkNvbnRlbnQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoZWxNYWluQ29udGVudCkge1xuICAgIGRpc3BhdGNoKGVsTWFpbkNvbnRlbnQsICdibHVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgZWxNYWluQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgfSk7XG4gIH1cbn0pO1xuIiwidmFyIGVscHJvdG8gPSB3aW5kb3cuSFRNTEVsZW1lbnQucHJvdG90eXBlO1xudmFyIEhJRERFTiA9ICdoaWRkZW4nO1xuXG5pZiAoIShISURERU4gaW4gZWxwcm90bykpIHtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxwcm90bywgSElEREVOLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoSElEREVOKTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoSElEREVOLCAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShISURERU4pO1xuICAgICAgfVxuICAgIH0sXG4gIH0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFRoZSAncG9seWZpbGxzJyBmaWxlIGRlZmluZXMga2V5IEVDTUFTY3JpcHQgNSBtZXRob2RzIHRoYXQgbWF5IGJlXG4gKiBtaXNzaW5nIGZyb20gb2xkZXIgYnJvd3NlcnMsIHNvIG11c3QgYmUgbG9hZGVkIGZpcnN0LlxuICovXG5yZXF1aXJlKCcuL2luaXRpYWxpemVycy9wb2x5ZmlsbHMnKTtcblxucmVxdWlyZSgnLi9pbml0aWFsaXplcnMvYWNjb3JkaW9ucycpO1xucmVxdWlyZSgnLi9pbml0aWFsaXplcnMvYmFubmVyJyk7XG5yZXF1aXJlKCcuL2luaXRpYWxpemVycy9mb290ZXInKTtcbnJlcXVpcmUoJy4vaW5pdGlhbGl6ZXJzL2Zvcm1zJyk7XG5yZXF1aXJlKCcuL2luaXRpYWxpemVycy9uYXZpZ2F0aW9uJyk7XG5yZXF1aXJlKCcuL2luaXRpYWxpemVycy9zZWFyY2gnKTtcbnJlcXVpcmUoJy4vaW5pdGlhbGl6ZXJzL3NraXAtbmF2Jyk7XG4iLCIvKipcbiAqIEF0dGFjaGVzIGEgZ2l2ZW4gbGlzdGVuZXIgZnVuY3Rpb24gdG8gYSBnaXZlbiBlbGVtZW50IHdoaWNoIGlzXG4gKiB0cmlnZ2VyZWQgYnkgYSBzcGVjaWZpZWQgbGlzdCBvZiBldmVudCB0eXBlcy5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSB0aGUgZWxlbWVudCB0byB3aGljaCB0aGUgbGlzdGVuZXIgd2lsbCBiZSBhdHRhY2hlZFxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZXMgLSBzcGFjZS1zZXBhcmF0ZWQgbGlzdCBvZiBldmVudCB0eXBlcyB3aGljaCB3aWxsIHRyaWdnZXIgdGhlIGxpc3RlbmVyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciAtIHRoZSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZFxuICogQHJldHVybnMge09iamVjdH0gLSBjb250YWluaW5nIGEgPHR0PnRyaWdnZXIoKTwvdHQ+IG1ldGhvZCBmb3IgZXhlY3V0aW5nIHRoZSBsaXN0ZW5lciwgYW5kIGFuIDx0dD5vZmYoKTwvdHQ+IG1ldGhvZCBmb3IgZGV0YWNoaW5nIGl0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2ggKGVsZW1lbnQsIGV2ZW50VHlwZXMsIGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gIHZhciBldmVudFR5cGVBcnJheSA9IGV2ZW50VHlwZXMuc3BsaXQoL1xccysvKTtcblxuICB2YXIgYXR0YWNoID0gZnVuY3Rpb24gKGUsIHQsIGQpIHtcbiAgICBpZiAoZS5hdHRhY2hFdmVudCkge1xuICAgICAgZS5hdHRhY2hFdmVudCgnb24nICsgdCwgZCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChlLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIGUuYWRkRXZlbnRMaXN0ZW5lcih0LCBkLCBvcHRpb25zKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIHRyaWdnZXIgPSBmdW5jdGlvbiAoZSwgdCkge1xuICAgIHZhciBmYWtlRXZlbnQ7XG4gICAgaWYgKCdjcmVhdGVFdmVudCcgaW4gZG9jdW1lbnQpIHtcbiAgICAgIC8vIG1vZGVybiBicm93c2VycywgSUU5K1xuICAgICAgZmFrZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgIGZha2VFdmVudC5pbml0RXZlbnQodCwgZmFsc2UsIHRydWUpO1xuICAgICAgZS5kaXNwYXRjaEV2ZW50KGZha2VFdmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElFIDhcbiAgICAgIGZha2VFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gICAgICBmYWtlRXZlbnQuZXZlbnRUeXBlID0gdDtcbiAgICAgIGUuZmlyZUV2ZW50KCdvbicrZS5ldmVudFR5cGUsIGZha2VFdmVudCk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBkZXRhY2ggPSBmdW5jdGlvbiAoZSwgdCwgZCkge1xuICAgIGlmIChlLmRldGFjaEV2ZW50KSB7XG4gICAgICBlLmRldGFjaEV2ZW50KCdvbicgKyB0LCBkLCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKGUucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgZS5yZW1vdmVFdmVudExpc3RlbmVyKHQsIGQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfTtcblxuICBldmVudFR5cGVBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudFR5cGUpIHtcbiAgICBhdHRhY2guY2FsbChudWxsLCBlbGVtZW50LCBldmVudFR5cGUsIGxpc3RlbmVyKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICB0cmlnZ2VyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0cmlnZ2VyLmNhbGwobnVsbCwgZWxlbWVudCwgZXZlbnRUeXBlQXJyYXlbIDAgXSk7XG4gICAgfSxcbiAgICBvZmY6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGV2ZW50VHlwZUFycmF5LmZvckVhY2goZnVuY3Rpb24gKGV2ZW50VHlwZSkge1xuICAgICAgICBkZXRhY2guY2FsbChudWxsLCBlbGVtZW50LCBldmVudFR5cGUsIGxpc3RlbmVyKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH07XG59O1xuIiwiLyoqXG4gKiBAbmFtZSBzZWxlY3RcbiAqIEBkZXNjIHNlbGVjdHMgZWxlbWVudHMgZnJvbSB0aGUgRE9NIGJ5IGNsYXNzIHNlbGVjdG9yIG9yIElEIHNlbGVjdG9yLlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIC0gVGhlIHNlbGVjdG9yIHRvIHRyYXZlcnNlIHRoZSBET00gd2l0aC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRleHQgLSBUaGUgY29udGV4dCB0byB0cmF2ZXJzZSB0aGUgRE9NIGluLlxuICogQHJldHVybiB7QXJyYXkuSFRNTEVsZW1lbnR9IC0gQW4gYXJyYXkgb2YgRE9NIG5vZGVzIG9yIGFuIGVtcHR5IGFycmF5LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNlbGVjdCAoc2VsZWN0b3IsIGNvbnRleHQpIHtcblxuICBpZiAodHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGlmICgoY29udGV4dCA9PT0gdW5kZWZpbmVkKSB8fCAhaXNFbGVtZW50KGNvbnRleHQpKSB7XG4gICAgY29udGV4dCA9IHdpbmRvdy5kb2N1bWVudDtcbiAgfVxuXG4gIHZhciBzZWxlY3Rpb24gPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChzZWxlY3Rpb24pO1xuXG59O1xuXG5mdW5jdGlvbiBpc0VsZW1lbnQgKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUubm9kZVR5cGUgPT09IDE7XG59IiwiLypcbiAqIEBuYW1lIERPTUxvYWRlZFxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2IgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gcnVuIHdoZW4gdGhlIERPTSBoYXMgbG9hZGVkLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIERPTUxvYWRlZCAoY2IpIHtcbiAgLy8gaW4gY2FzZSB0aGUgZG9jdW1lbnQgaXMgYWxyZWFkeSByZW5kZXJlZFxuICBpZiAoJ2xvYWRpbmcnICE9PSBkb2N1bWVudC5yZWFkeVN0YXRlKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY2IpKSB7XG4gICAgICBjYigpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7IC8vIG1vZGVybiBicm93c2Vyc1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBjYik7XG4gIH0gZWxzZSB7IC8vIElFIDw9IDhcbiAgICBkb2N1bWVudC5hdHRhY2hFdmVudCgnb25yZWFkeXN0YXRlY2hhbmdlJywgZnVuY3Rpb24gKCl7XG4gICAgICBpZiAoJ2NvbXBsZXRlJyA9PT0gZG9jdW1lbnQucmVhZHlTdGF0ZSkge1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihjYikpIHtcbiAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24gKGFyZykge1xuICByZXR1cm4gKHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbicpO1xufSJdfQ==
