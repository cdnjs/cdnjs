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
'use strict';
var select = require('../utils/select');

var SELECTOR_BUTTON = 'button.usa-accordion-button';
var SELECTOR_BUTTON_EXPANDED = SELECTOR_BUTTON + '[aria-expanded=true]';

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
 * @name getTargetOf
 * @desc Get the target of an element, according to the id listed in its
 * `aria-controls` attribute.
 * @param {HTMLElement} source the source element
 * @return {Element} the target element
 * @throws {Error} an error is thrown if no such target exists
 */
function getTargetOf (source) {
  var id = source.getAttribute('aria-controls');
  var target = document.getElementById(id);
  if (target) {
    return target;
  } else {
    throw new Error('No accordion target with id "' + id + '" exists');
  }
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
  this.$(SELECTOR_BUTTON).forEach(function (button) {
    if (button.attachEvent) {
      button.attachEvent('onclick', showPanelListener.bind(self, button));
    } else {
      button.addEventListener('click', showPanelListener.bind(self, button));
    }
  });

  // find the first expanded button
  var expanded = this.select(SELECTOR_BUTTON_EXPANDED);
  this.hideAll();
  if (expanded !== undefined) {
    this.show(expanded);
  }
}

/**
 * @param {String} selector
 * @return {Element}
 */
Accordion.prototype.select = function (selector) {
  return this.$(selector)[ 0 ];
};

/**
 * @param {String} selector
 * @return {Array.HTMLElement}
 */
Accordion.prototype.$ = function (selector) {
  return select(selector, this.root);
};

/**
 * @param {HTMLElement} button
 * @param {Boolean} expanded
 */
Accordion.prototype.toggle = function (button, expanded) {
  var target = getTargetOf(button);
  button.setAttribute('aria-expanded', expanded);
  target.setAttribute('aria-hidden', !expanded);
  return this;
};

/**
 * @param {HTMLElement} button
 * @return {Accordion}
 */
Accordion.prototype.hide = function (button) {
  return this.toggle(button, false);
};

/**
 * @param {HTMLElement} button
 * @return {Accordion}
 */
Accordion.prototype.show = function (button) {
  return this.toggle(button, true);
};

/**
 * @return {Accordion}
 */
Accordion.prototype.hideAll = function () {
  var self = this;
  this.$(SELECTOR_BUTTON).forEach(function (button) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY2xhc3NsaXN0LXBvbHlmaWxsL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZGVib3VuY2UvaW5kZXguanMiLCJzcmMvanMvY29tcG9uZW50cy9hY2NvcmRpb24uanMiLCJzcmMvanMvY29tcG9uZW50cy9iYW5uZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9mb290ZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9uYXZpZ2F0aW9uLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvc2VhcmNoLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvdG9nZ2xlLWZpZWxkLW1hc2suanMiLCJzcmMvanMvY29tcG9uZW50cy90b2dnbGUtZm9ybS1pbnB1dC5qcyIsInNyYy9qcy9jb21wb25lbnRzL3ZhbGlkYXRvci5qcyIsInNyYy9qcy9pbml0aWFsaXplcnMvYWNjb3JkaW9ucy5qcyIsInNyYy9qcy9pbml0aWFsaXplcnMvYmFubmVyLmpzIiwic3JjL2pzL2luaXRpYWxpemVycy9mb290ZXIuanMiLCJzcmMvanMvaW5pdGlhbGl6ZXJzL2Zvcm1zLmpzIiwic3JjL2pzL2luaXRpYWxpemVycy9uYXZpZ2F0aW9uLmpzIiwic3JjL2pzL2luaXRpYWxpemVycy9wb2x5ZmlsbHMuanMiLCJzcmMvanMvaW5pdGlhbGl6ZXJzL3NlYXJjaC5qcyIsInNyYy9qcy9pbml0aWFsaXplcnMvc2tpcC1uYXYuanMiLCJzcmMvanMvcG9seWZpbGxzL2VsZW1lbnQtaGlkZGVuLmpzIiwic3JjL2pzL3N0YXJ0LmpzIiwic3JjL2pzL3V0aWxzL2Rpc3BhdGNoLmpzIiwic3JjL2pzL3V0aWxzL3NlbGVjdC5qcyIsInNyYy9qcy91dGlscy93aGVuLWRvbS1yZWFkeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2pQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN6WEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiBjbGFzc0xpc3QuanM6IENyb3NzLWJyb3dzZXIgZnVsbCBlbGVtZW50LmNsYXNzTGlzdCBpbXBsZW1lbnRhdGlvbi5cbiAqIDIwMTQtMDctMjNcbiAqXG4gKiBCeSBFbGkgR3JleSwgaHR0cDovL2VsaWdyZXkuY29tXG4gKiBQdWJsaWMgRG9tYWluLlxuICogTk8gV0FSUkFOVFkgRVhQUkVTU0VEIE9SIElNUExJRUQuIFVTRSBBVCBZT1VSIE9XTiBSSVNLLlxuICovXG5cbi8qZ2xvYmFsIHNlbGYsIGRvY3VtZW50LCBET01FeGNlcHRpb24gKi9cblxuLyohIEBzb3VyY2UgaHR0cDovL3B1cmwuZWxpZ3JleS5jb20vZ2l0aHViL2NsYXNzTGlzdC5qcy9ibG9iL21hc3Rlci9jbGFzc0xpc3QuanMqL1xuXG4vKiBDb3BpZWQgZnJvbSBNRE46XG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9jbGFzc0xpc3RcbiAqL1xuXG5pZiAoXCJkb2N1bWVudFwiIGluIHdpbmRvdy5zZWxmKSB7XG5cbiAgLy8gRnVsbCBwb2x5ZmlsbCBmb3IgYnJvd3NlcnMgd2l0aCBubyBjbGFzc0xpc3Qgc3VwcG9ydFxuICAvLyBJbmNsdWRpbmcgSUUgPCBFZGdlIG1pc3NpbmcgU1ZHRWxlbWVudC5jbGFzc0xpc3RcbiAgaWYgKCEoXCJjbGFzc0xpc3RcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiX1wiKSlcbiAgICB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMgJiYgIShcImNsYXNzTGlzdFwiIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXCJnXCIpKSkge1xuXG4gIChmdW5jdGlvbiAodmlldykge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAoISgnRWxlbWVudCcgaW4gdmlldykpIHJldHVybjtcblxuICAgIHZhclxuICAgICAgICBjbGFzc0xpc3RQcm9wID0gXCJjbGFzc0xpc3RcIlxuICAgICAgLCBwcm90b1Byb3AgPSBcInByb3RvdHlwZVwiXG4gICAgICAsIGVsZW1DdHJQcm90byA9IHZpZXcuRWxlbWVudFtwcm90b1Byb3BdXG4gICAgICAsIG9iakN0ciA9IE9iamVjdFxuICAgICAgLCBzdHJUcmltID0gU3RyaW5nW3Byb3RvUHJvcF0udHJpbSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpO1xuICAgICAgfVxuICAgICAgLCBhcnJJbmRleE9mID0gQXJyYXlbcHJvdG9Qcm9wXS5pbmRleE9mIHx8IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgICAgaSA9IDBcbiAgICAgICAgICAsIGxlbiA9IHRoaXMubGVuZ3RoXG4gICAgICAgIDtcbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICAgIC8vIFZlbmRvcnM6IHBsZWFzZSBhbGxvdyBjb250ZW50IGNvZGUgdG8gaW5zdGFudGlhdGUgRE9NRXhjZXB0aW9uc1xuICAgICAgLCBET01FeCA9IGZ1bmN0aW9uICh0eXBlLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuY29kZSA9IERPTUV4Y2VwdGlvblt0eXBlXTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgIH1cbiAgICAgICwgY2hlY2tUb2tlbkFuZEdldEluZGV4ID0gZnVuY3Rpb24gKGNsYXNzTGlzdCwgdG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuID09PSBcIlwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IERPTUV4KFxuICAgICAgICAgICAgICBcIlNZTlRBWF9FUlJcIlxuICAgICAgICAgICAgLCBcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZFwiXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoL1xccy8udGVzdCh0b2tlbikpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXgoXG4gICAgICAgICAgICAgIFwiSU5WQUxJRF9DSEFSQUNURVJfRVJSXCJcbiAgICAgICAgICAgICwgXCJTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXJcIlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFyckluZGV4T2YuY2FsbChjbGFzc0xpc3QsIHRva2VuKTtcbiAgICAgIH1cbiAgICAgICwgQ2xhc3NMaXN0ID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAgICB0cmltbWVkQ2xhc3NlcyA9IHN0clRyaW0uY2FsbChlbGVtLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIHx8IFwiXCIpXG4gICAgICAgICAgLCBjbGFzc2VzID0gdHJpbW1lZENsYXNzZXMgPyB0cmltbWVkQ2xhc3Nlcy5zcGxpdCgvXFxzKy8pIDogW11cbiAgICAgICAgICAsIGkgPSAwXG4gICAgICAgICAgLCBsZW4gPSBjbGFzc2VzLmxlbmd0aFxuICAgICAgICA7XG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICB0aGlzLnB1c2goY2xhc3Nlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlQ2xhc3NOYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgdGhpcy50b1N0cmluZygpKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgICwgY2xhc3NMaXN0UHJvdG8gPSBDbGFzc0xpc3RbcHJvdG9Qcm9wXSA9IFtdXG4gICAgICAsIGNsYXNzTGlzdEdldHRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDbGFzc0xpc3QodGhpcyk7XG4gICAgICB9XG4gICAgO1xuICAgIC8vIE1vc3QgRE9NRXhjZXB0aW9uIGltcGxlbWVudGF0aW9ucyBkb24ndCBhbGxvdyBjYWxsaW5nIERPTUV4Y2VwdGlvbidzIHRvU3RyaW5nKClcbiAgICAvLyBvbiBub24tRE9NRXhjZXB0aW9ucy4gRXJyb3IncyB0b1N0cmluZygpIGlzIHN1ZmZpY2llbnQgaGVyZS5cbiAgICBET01FeFtwcm90b1Byb3BdID0gRXJyb3JbcHJvdG9Qcm9wXTtcbiAgICBjbGFzc0xpc3RQcm90by5pdGVtID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgIHJldHVybiB0aGlzW2ldIHx8IG51bGw7XG4gICAgfTtcbiAgICBjbGFzc0xpc3RQcm90by5jb250YWlucyA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgdG9rZW4gKz0gXCJcIjtcbiAgICAgIHJldHVybiBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pICE9PSAtMTtcbiAgICB9O1xuICAgIGNsYXNzTGlzdFByb3RvLmFkZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhclxuICAgICAgICAgIHRva2VucyA9IGFyZ3VtZW50c1xuICAgICAgICAsIGkgPSAwXG4gICAgICAgICwgbCA9IHRva2Vucy5sZW5ndGhcbiAgICAgICAgLCB0b2tlblxuICAgICAgICAsIHVwZGF0ZWQgPSBmYWxzZVxuICAgICAgO1xuICAgICAgZG8ge1xuICAgICAgICB0b2tlbiA9IHRva2Vuc1tpXSArIFwiXCI7XG4gICAgICAgIGlmIChjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pID09PSAtMSkge1xuICAgICAgICAgIHRoaXMucHVzaCh0b2tlbik7XG4gICAgICAgICAgdXBkYXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHdoaWxlICgrK2kgPCBsKTtcblxuICAgICAgaWYgKHVwZGF0ZWQpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2xhc3NOYW1lKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBjbGFzc0xpc3RQcm90by5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXJcbiAgICAgICAgICB0b2tlbnMgPSBhcmd1bWVudHNcbiAgICAgICAgLCBpID0gMFxuICAgICAgICAsIGwgPSB0b2tlbnMubGVuZ3RoXG4gICAgICAgICwgdG9rZW5cbiAgICAgICAgLCB1cGRhdGVkID0gZmFsc2VcbiAgICAgICAgLCBpbmRleFxuICAgICAgO1xuICAgICAgZG8ge1xuICAgICAgICB0b2tlbiA9IHRva2Vuc1tpXSArIFwiXCI7XG4gICAgICAgIGluZGV4ID0gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKTtcbiAgICAgICAgd2hpbGUgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIHRoaXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICB1cGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICBpbmRleCA9IGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHdoaWxlICgrK2kgPCBsKTtcblxuICAgICAgaWYgKHVwZGF0ZWQpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2xhc3NOYW1lKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBjbGFzc0xpc3RQcm90by50b2dnbGUgPSBmdW5jdGlvbiAodG9rZW4sIGZvcmNlKSB7XG4gICAgICB0b2tlbiArPSBcIlwiO1xuXG4gICAgICB2YXJcbiAgICAgICAgICByZXN1bHQgPSB0aGlzLmNvbnRhaW5zKHRva2VuKVxuICAgICAgICAsIG1ldGhvZCA9IHJlc3VsdCA/XG4gICAgICAgICAgZm9yY2UgIT09IHRydWUgJiYgXCJyZW1vdmVcIlxuICAgICAgICA6XG4gICAgICAgICAgZm9yY2UgIT09IGZhbHNlICYmIFwiYWRkXCJcbiAgICAgIDtcblxuICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICB0aGlzW21ldGhvZF0odG9rZW4pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZm9yY2UgPT09IHRydWUgfHwgZm9yY2UgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBmb3JjZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAhcmVzdWx0O1xuICAgICAgfVxuICAgIH07XG4gICAgY2xhc3NMaXN0UHJvdG8udG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5qb2luKFwiIFwiKTtcbiAgICB9O1xuXG4gICAgaWYgKG9iakN0ci5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgdmFyIGNsYXNzTGlzdFByb3BEZXNjID0ge1xuICAgICAgICAgIGdldDogY2xhc3NMaXN0R2V0dGVyXG4gICAgICAgICwgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICAsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG9iakN0ci5kZWZpbmVQcm9wZXJ0eShlbGVtQ3RyUHJvdG8sIGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdFByb3BEZXNjKTtcbiAgICAgIH0gY2F0Y2ggKGV4KSB7IC8vIElFIDggZG9lc24ndCBzdXBwb3J0IGVudW1lcmFibGU6dHJ1ZVxuICAgICAgICBpZiAoZXgubnVtYmVyID09PSAtMHg3RkY1RUM1NCkge1xuICAgICAgICAgIGNsYXNzTGlzdFByb3BEZXNjLmVudW1lcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICBvYmpDdHIuZGVmaW5lUHJvcGVydHkoZWxlbUN0clByb3RvLCBjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RQcm9wRGVzYyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9iakN0cltwcm90b1Byb3BdLl9fZGVmaW5lR2V0dGVyX18pIHtcbiAgICAgIGVsZW1DdHJQcm90by5fX2RlZmluZUdldHRlcl9fKGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdEdldHRlcik7XG4gICAgfVxuXG4gICAgfSh3aW5kb3cuc2VsZikpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAvLyBUaGVyZSBpcyBmdWxsIG9yIHBhcnRpYWwgbmF0aXZlIGNsYXNzTGlzdCBzdXBwb3J0LCBzbyBqdXN0IGNoZWNrIGlmIHdlIG5lZWRcbiAgICAvLyB0byBub3JtYWxpemUgdGhlIGFkZC9yZW1vdmUgYW5kIHRvZ2dsZSBBUElzLlxuXG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgICB2YXIgdGVzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiX1wiKTtcblxuICAgICAgdGVzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImMxXCIsIFwiYzJcIik7XG5cbiAgICAgIC8vIFBvbHlmaWxsIGZvciBJRSAxMC8xMSBhbmQgRmlyZWZveCA8MjYsIHdoZXJlIGNsYXNzTGlzdC5hZGQgYW5kXG4gICAgICAvLyBjbGFzc0xpc3QucmVtb3ZlIGV4aXN0IGJ1dCBzdXBwb3J0IG9ubHkgb25lIGFyZ3VtZW50IGF0IGEgdGltZS5cbiAgICAgIGlmICghdGVzdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYzJcIikpIHtcbiAgICAgICAgdmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgIHZhciBvcmlnaW5hbCA9IERPTVRva2VuTGlzdC5wcm90b3R5cGVbbWV0aG9kXTtcblxuICAgICAgICAgIERPTVRva2VuTGlzdC5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICB2YXIgaSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgIHRva2VuID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgICBvcmlnaW5hbC5jYWxsKHRoaXMsIHRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBjcmVhdGVNZXRob2QoJ2FkZCcpO1xuICAgICAgICBjcmVhdGVNZXRob2QoJ3JlbW92ZScpO1xuICAgICAgfVxuXG4gICAgICB0ZXN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiYzNcIiwgZmFsc2UpO1xuXG4gICAgICAvLyBQb2x5ZmlsbCBmb3IgSUUgMTAgYW5kIEZpcmVmb3ggPDI0LCB3aGVyZSBjbGFzc0xpc3QudG9nZ2xlIGRvZXMgbm90XG4gICAgICAvLyBzdXBwb3J0IHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gICAgICBpZiAodGVzdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYzNcIikpIHtcbiAgICAgICAgdmFyIF90b2dnbGUgPSBET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZTtcblxuICAgICAgICBET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKHRva2VuLCBmb3JjZSkge1xuICAgICAgICAgIGlmICgxIGluIGFyZ3VtZW50cyAmJiAhdGhpcy5jb250YWlucyh0b2tlbikgPT09ICFmb3JjZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZvcmNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gX3RvZ2dsZS5jYWxsKHRoaXMsIHRva2VuKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgIH1cblxuICAgICAgdGVzdEVsZW1lbnQgPSBudWxsO1xuICAgIH0oKSk7XG4gIH1cbn1cbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTkFOID0gMCAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXgsXG4gICAgbmF0aXZlTWluID0gTWF0aC5taW47XG5cbi8qKlxuICogR2V0cyB0aGUgdGltZXN0YW1wIG9mIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgaGF2ZSBlbGFwc2VkIHNpbmNlXG4gKiB0aGUgVW5peCBlcG9jaCAoMSBKYW51YXJ5IDE5NzAgMDA6MDA6MDAgVVRDKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgRGF0ZVxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgdGltZXN0YW1wLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlZmVyKGZ1bmN0aW9uKHN0YW1wKSB7XG4gKiAgIGNvbnNvbGUubG9nKF8ubm93KCkgLSBzdGFtcCk7XG4gKiB9LCBfLm5vdygpKTtcbiAqIC8vID0+IExvZ3MgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaXQgdG9vayBmb3IgdGhlIGRlZmVycmVkIGludm9jYXRpb24uXG4gKi9cbnZhciBub3cgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHJvb3QuRGF0ZS5ub3coKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlYm91bmNlZCBmdW5jdGlvbiB0aGF0IGRlbGF5cyBpbnZva2luZyBgZnVuY2AgdW50aWwgYWZ0ZXIgYHdhaXRgXG4gKiBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgdGhlIGRlYm91bmNlZCBmdW5jdGlvbiB3YXNcbiAqIGludm9rZWQuIFRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgIG1ldGhvZCB0byBjYW5jZWxcbiAqIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLlxuICogUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb24gdGhlXG4gKiBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50XG4gKiBjYWxscyB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYFxuICogaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIGRlYm91bmNlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy5kZWJvdW5jZWAgYW5kIGBfLnRocm90dGxlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlYm91bmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9ZmFsc2VdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFdhaXRdXG4gKiAgVGhlIG1heGltdW0gdGltZSBgZnVuY2AgaXMgYWxsb3dlZCB0byBiZSBkZWxheWVkIGJlZm9yZSBpdCdzIGludm9rZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGRlYm91bmNlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgY29zdGx5IGNhbGN1bGF0aW9ucyB3aGlsZSB0aGUgd2luZG93IHNpemUgaXMgaW4gZmx1eC5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKGNhbGN1bGF0ZUxheW91dCwgMTUwKSk7XG4gKlxuICogLy8gSW52b2tlIGBzZW5kTWFpbGAgd2hlbiBjbGlja2VkLCBkZWJvdW5jaW5nIHN1YnNlcXVlbnQgY2FsbHMuXG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgXy5kZWJvdW5jZShzZW5kTWFpbCwgMzAwLCB7XG4gKiAgICdsZWFkaW5nJzogdHJ1ZSxcbiAqICAgJ3RyYWlsaW5nJzogZmFsc2VcbiAqIH0pKTtcbiAqXG4gKiAvLyBFbnN1cmUgYGJhdGNoTG9nYCBpcyBpbnZva2VkIG9uY2UgYWZ0ZXIgMSBzZWNvbmQgb2YgZGVib3VuY2VkIGNhbGxzLlxuICogdmFyIGRlYm91bmNlZCA9IF8uZGVib3VuY2UoYmF0Y2hMb2csIDI1MCwgeyAnbWF4V2FpdCc6IDEwMDAgfSk7XG4gKiB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvc3RyZWFtJyk7XG4gKiBqUXVlcnkoc291cmNlKS5vbignbWVzc2FnZScsIGRlYm91bmNlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyBkZWJvdW5jZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIGRlYm91bmNlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsYXN0QXJncyxcbiAgICAgIGxhc3RUaGlzLFxuICAgICAgbWF4V2FpdCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHRpbWVySWQsXG4gICAgICBsYXN0Q2FsbFRpbWUsXG4gICAgICBsYXN0SW52b2tlVGltZSA9IDAsXG4gICAgICBsZWFkaW5nID0gZmFsc2UsXG4gICAgICBtYXhpbmcgPSBmYWxzZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB3YWl0ID0gdG9OdW1iZXIod2FpdCkgfHwgMDtcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICEhb3B0aW9ucy5sZWFkaW5nO1xuICAgIG1heGluZyA9ICdtYXhXYWl0JyBpbiBvcHRpb25zO1xuICAgIG1heFdhaXQgPSBtYXhpbmcgPyBuYXRpdmVNYXgodG9OdW1iZXIob3B0aW9ucy5tYXhXYWl0KSB8fCAwLCB3YWl0KSA6IG1heFdhaXQ7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZUZ1bmModGltZSkge1xuICAgIHZhciBhcmdzID0gbGFzdEFyZ3MsXG4gICAgICAgIHRoaXNBcmcgPSBsYXN0VGhpcztcblxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxlYWRpbmdFZGdlKHRpbWUpIHtcbiAgICAvLyBSZXNldCBhbnkgYG1heFdhaXRgIHRpbWVyLlxuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICAvLyBTdGFydCB0aGUgdGltZXIgZm9yIHRoZSB0cmFpbGluZyBlZGdlLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgLy8gSW52b2tlIHRoZSBsZWFkaW5nIGVkZ2UuXG4gICAgcmV0dXJuIGxlYWRpbmcgPyBpbnZva2VGdW5jKHRpbWUpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtYWluaW5nV2FpdCh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZSxcbiAgICAgICAgcmVzdWx0ID0gd2FpdCAtIHRpbWVTaW5jZUxhc3RDYWxsO1xuXG4gICAgcmV0dXJuIG1heGluZyA/IG5hdGl2ZU1pbihyZXN1bHQsIG1heFdhaXQgLSB0aW1lU2luY2VMYXN0SW52b2tlKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZEludm9rZSh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZTtcblxuICAgIC8vIEVpdGhlciB0aGlzIGlzIHRoZSBmaXJzdCBjYWxsLCBhY3Rpdml0eSBoYXMgc3RvcHBlZCBhbmQgd2UncmUgYXQgdGhlXG4gICAgLy8gdHJhaWxpbmcgZWRnZSwgdGhlIHN5c3RlbSB0aW1lIGhhcyBnb25lIGJhY2t3YXJkcyBhbmQgd2UncmUgdHJlYXRpbmdcbiAgICAvLyBpdCBhcyB0aGUgdHJhaWxpbmcgZWRnZSwgb3Igd2UndmUgaGl0IHRoZSBgbWF4V2FpdGAgbGltaXQuXG4gICAgcmV0dXJuIChsYXN0Q2FsbFRpbWUgPT09IHVuZGVmaW5lZCB8fCAodGltZVNpbmNlTGFzdENhbGwgPj0gd2FpdCkgfHxcbiAgICAgICh0aW1lU2luY2VMYXN0Q2FsbCA8IDApIHx8IChtYXhpbmcgJiYgdGltZVNpbmNlTGFzdEludm9rZSA+PSBtYXhXYWl0KSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aW1lckV4cGlyZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKTtcbiAgICBpZiAoc2hvdWxkSW52b2tlKHRpbWUpKSB7XG4gICAgICByZXR1cm4gdHJhaWxpbmdFZGdlKHRpbWUpO1xuICAgIH1cbiAgICAvLyBSZXN0YXJ0IHRoZSB0aW1lci5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHJlbWFpbmluZ1dhaXQodGltZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhaWxpbmdFZGdlKHRpbWUpIHtcbiAgICB0aW1lcklkID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gT25seSBpbnZva2UgaWYgd2UgaGF2ZSBgbGFzdEFyZ3NgIHdoaWNoIG1lYW5zIGBmdW5jYCBoYXMgYmVlblxuICAgIC8vIGRlYm91bmNlZCBhdCBsZWFzdCBvbmNlLlxuICAgIGlmICh0cmFpbGluZyAmJiBsYXN0QXJncykge1xuICAgICAgcmV0dXJuIGludm9rZUZ1bmModGltZSk7XG4gICAgfVxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAodGltZXJJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgfVxuICAgIGxhc3RJbnZva2VUaW1lID0gMDtcbiAgICBsYXN0QXJncyA9IGxhc3RDYWxsVGltZSA9IGxhc3RUaGlzID0gdGltZXJJZCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHJldHVybiB0aW1lcklkID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiB0cmFpbGluZ0VkZ2Uobm93KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVib3VuY2VkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCksXG4gICAgICAgIGlzSW52b2tpbmcgPSBzaG91bGRJbnZva2UodGltZSk7XG5cbiAgICBsYXN0QXJncyA9IGFyZ3VtZW50cztcbiAgICBsYXN0VGhpcyA9IHRoaXM7XG4gICAgbGFzdENhbGxUaW1lID0gdGltZTtcblxuICAgIGlmIChpc0ludm9raW5nKSB7XG4gICAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBsZWFkaW5nRWRnZShsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgICAgaWYgKG1heGluZykge1xuICAgICAgICAvLyBIYW5kbGUgaW52b2NhdGlvbnMgaW4gYSB0aWdodCBsb29wLlxuICAgICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgICAgICByZXR1cm4gaW52b2tlRnVuYyhsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGRlYm91bmNlZC5jYW5jZWwgPSBjYW5jZWw7XG4gIGRlYm91bmNlZC5mbHVzaCA9IGZsdXNoO1xuICByZXR1cm4gZGVib3VuY2VkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICogLy8gPT4gSW5maW5pdHlcbiAqXG4gKiBfLnRvTnVtYmVyKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gTkFOO1xuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICB2YXIgb3RoZXIgPSB0eXBlb2YgdmFsdWUudmFsdWVPZiA9PSAnZnVuY3Rpb24nID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlVHJpbSwgJycpO1xuICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xuICByZXR1cm4gKGlzQmluYXJ5IHx8IHJlSXNPY3RhbC50ZXN0KHZhbHVlKSlcbiAgICA/IGZyZWVQYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgaXNCaW5hcnkgPyAyIDogOClcbiAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWJvdW5jZTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcblxudmFyIFNFTEVDVE9SX0JVVFRPTiA9ICdidXR0b24udXNhLWFjY29yZGlvbi1idXR0b24nO1xudmFyIFNFTEVDVE9SX0JVVFRPTl9FWFBBTkRFRCA9IFNFTEVDVE9SX0JVVFRPTiArICdbYXJpYS1leHBhbmRlZD10cnVlXSc7XG5cbi8qKlxuICogQG5hbWUgc2hvd1BhbmVsTGlzdGVuZXJcbiAqIEBkZXNjIFRoZSBldmVudCBoYW5kbGVyIGZvciBjbGlja2luZyBvbiBhIGJ1dHRvbiBpbiBhbiBhY2NvcmRpb24uXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAtIEFuIEhUTUwgZWxlbWVudCBtb3N0IGxpa2VseSBhIDxidXR0b24+LlxuICogQHBhcmFtIHtPYmplY3R9IGV2IC0gQSBET00gZXZlbnQgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBzaG93UGFuZWxMaXN0ZW5lciAoZWwsIGV2KSB7XG4gIHZhciBleHBhbmRlZCA9IGVsLmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpID09PSAndHJ1ZSc7XG4gIHRoaXMuaGlkZUFsbCgpO1xuICBpZiAoIWV4cGFuZGVkKSB7XG4gICAgdGhpcy5zaG93KGVsKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQG5hbWUgZ2V0VGFyZ2V0T2ZcbiAqIEBkZXNjIEdldCB0aGUgdGFyZ2V0IG9mIGFuIGVsZW1lbnQsIGFjY29yZGluZyB0byB0aGUgaWQgbGlzdGVkIGluIGl0c1xuICogYGFyaWEtY29udHJvbHNgIGF0dHJpYnV0ZS5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHNvdXJjZSB0aGUgc291cmNlIGVsZW1lbnRcbiAqIEByZXR1cm4ge0VsZW1lbnR9IHRoZSB0YXJnZXQgZWxlbWVudFxuICogQHRocm93cyB7RXJyb3J9IGFuIGVycm9yIGlzIHRocm93biBpZiBubyBzdWNoIHRhcmdldCBleGlzdHNcbiAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0T2YgKHNvdXJjZSkge1xuICB2YXIgaWQgPSBzb3VyY2UuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gIHZhciB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIGlmICh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gYWNjb3JkaW9uIHRhcmdldCB3aXRoIGlkIFwiJyArIGlkICsgJ1wiIGV4aXN0cycpO1xuICB9XG59XG5cbi8qKlxuICogQGNsYXNzIEFjY29yZGlvblxuICpcbiAqIEFuIGFjY29yZGlvbiBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gSFRNTEVsZW1lbnQgdG8gdHVybiBpbnRvIGFuIGFjY29yZGlvbi5cbiAqL1xuZnVuY3Rpb24gQWNjb3JkaW9uIChlbCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMucm9vdCA9IGVsO1xuXG4gIC8vIGRlbGVnYXRlIGNsaWNrIGV2ZW50cyBvbiBlYWNoIDxidXR0b24+XG4gIHRoaXMuJChTRUxFQ1RPUl9CVVRUT04pLmZvckVhY2goZnVuY3Rpb24gKGJ1dHRvbikge1xuICAgIGlmIChidXR0b24uYXR0YWNoRXZlbnQpIHtcbiAgICAgIGJ1dHRvbi5hdHRhY2hFdmVudCgnb25jbGljaycsIHNob3dQYW5lbExpc3RlbmVyLmJpbmQoc2VsZiwgYnV0dG9uKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dQYW5lbExpc3RlbmVyLmJpbmQoc2VsZiwgYnV0dG9uKSk7XG4gICAgfVxuICB9KTtcblxuICAvLyBmaW5kIHRoZSBmaXJzdCBleHBhbmRlZCBidXR0b25cbiAgdmFyIGV4cGFuZGVkID0gdGhpcy5zZWxlY3QoU0VMRUNUT1JfQlVUVE9OX0VYUEFOREVEKTtcbiAgdGhpcy5oaWRlQWxsKCk7XG4gIGlmIChleHBhbmRlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5zaG93KGV4cGFuZGVkKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICogQHJldHVybiB7RWxlbWVudH1cbiAqL1xuQWNjb3JkaW9uLnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHRoaXMuJChzZWxlY3RvcilbIDAgXTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gKiBAcmV0dXJuIHtBcnJheS5IVE1MRWxlbWVudH1cbiAqL1xuQWNjb3JkaW9uLnByb3RvdHlwZS4kID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHJldHVybiBzZWxlY3Qoc2VsZWN0b3IsIHRoaXMucm9vdCk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJ1dHRvblxuICogQHBhcmFtIHtCb29sZWFufSBleHBhbmRlZFxuICovXG5BY2NvcmRpb24ucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIChidXR0b24sIGV4cGFuZGVkKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXRPZihidXR0b24pO1xuICBidXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgZXhwYW5kZWQpO1xuICB0YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICFleHBhbmRlZCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBidXR0b25cbiAqIEByZXR1cm4ge0FjY29yZGlvbn1cbiAqL1xuQWNjb3JkaW9uLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKGJ1dHRvbikge1xuICByZXR1cm4gdGhpcy50b2dnbGUoYnV0dG9uLCBmYWxzZSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJ1dHRvblxuICogQHJldHVybiB7QWNjb3JkaW9ufVxuICovXG5BY2NvcmRpb24ucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoYnV0dG9uKSB7XG4gIHJldHVybiB0aGlzLnRvZ2dsZShidXR0b24sIHRydWUpO1xufTtcblxuLyoqXG4gKiBAcmV0dXJuIHtBY2NvcmRpb259XG4gKi9cbkFjY29yZGlvbi5wcm90b3R5cGUuaGlkZUFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLiQoU0VMRUNUT1JfQlVUVE9OKS5mb3JFYWNoKGZ1bmN0aW9uIChidXR0b24pIHtcbiAgICBzZWxmLmhpZGUoYnV0dG9uKTtcbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBY2NvcmRpb247XG4iLCJ2YXIgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG52YXIgZGlzcGF0Y2ggPSByZXF1aXJlKCcuLi91dGlscy9kaXNwYXRjaCcpO1xuXG5mdW5jdGlvbiBiYW5uZXJDbGlja0hhbmRsZXIgKGV2ZW50KSB7XG4gIChldmVudC5wcmV2ZW50RGVmYXVsdCkgPyBldmVudC5wcmV2ZW50RGVmYXVsdCgpIDogZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcblxuICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ3VzYS1iYW5uZXItaGVhZGVyLWV4cGFuZGVkJyk7XG59XG5cbmZ1bmN0aW9uIGJhbm5lckluaXQgKCkge1xuICB2YXIgYmFubmVycyA9IHNlbGVjdCgnLnVzYS1iYW5uZXItaGVhZGVyJyk7XG5cbiAgYmFubmVycy5mb3JFYWNoKGZ1bmN0aW9uIChiYW5uZXIpIHtcbiAgICB2YXIgYmFubmVyQ2xpY2sgPSBiYW5uZXJDbGlja0hhbmRsZXIuYmluZChiYW5uZXIpO1xuICAgIHNlbGVjdCgnW2FyaWEtY29udHJvbHNdJywgYmFubmVyKS5mb3JFYWNoKGZ1bmN0aW9uIChidXR0b24pIHtcbiAgICAgIGRpc3BhdGNoKGJ1dHRvbiwgJ2NsaWNrJywgYmFubmVyQ2xpY2spO1xuICAgIH0pO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYW5uZXJJbml0O1xuIiwidmFyIHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xudmFyIGRpc3BhdGNoID0gcmVxdWlyZSgnLi4vdXRpbHMvZGlzcGF0Y2gnKTtcblxuZnVuY3Rpb24gZ2V0U2libGluZ3MgKGVsKSB7XG4gIHZhciBuID0gZWwucGFyZW50Tm9kZS5maXJzdENoaWxkO1xuICB2YXIgbWF0Y2hlcyA9IFtdO1xuXG4gIHdoaWxlIChuKSB7XG4gICAgaWYgKG4ubm9kZVR5cGUgPT0gMSAmJiBuICE9IGVsKSB7XG4gICAgICBtYXRjaGVzLnB1c2gobik7XG4gICAgfVxuICAgIG4gPSBuLm5leHRTaWJsaW5nO1xuICB9XG5cbiAgcmV0dXJuIG1hdGNoZXM7XG59XG5cbnZhciBzaG93UGFuZWxMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHBhbmVsVG9TaG93ID0gdGhpcy5wYXJlbnROb2RlO1xuICB2YXIgb3RoZXJQYW5lbHMgPSBnZXRTaWJsaW5ncyhwYW5lbFRvU2hvdyk7XG4gIHBhbmVsVG9TaG93LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICBvdGhlclBhbmVscy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICB9KTtcbn07XG5cbnZhciBldmVudHMgPSBbXTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmb290ZXJBY2NvcmRpb24gKCkge1xuXG4gIHZhciBuYXZMaXN0ID0gc2VsZWN0KCcudXNhLWZvb3Rlci1iaWcgbmF2IHVsJyk7XG4gIHZhciBwcmltYXJ5TGluayA9IHNlbGVjdCgnLnVzYS1mb290ZXItYmlnIG5hdiAudXNhLWZvb3Rlci1wcmltYXJ5LWxpbmsnKTtcblxuICBpZiAoZXZlbnRzLmxlbmd0aCkge1xuICAgIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLm9mZigpO1xuICAgIH0pO1xuICAgIGV2ZW50cyA9IFtdO1xuICB9XG5cbiAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNjAwKSB7XG5cbiAgICBuYXZMaXN0LmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9KTtcblxuICAgIHByaW1hcnlMaW5rLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICBldmVudHMucHVzaChcbiAgICAgICAgZGlzcGF0Y2goZWwsICdjbGljaycsIHNob3dQYW5lbExpc3RlbmVyKVxuICAgICAgKTtcbiAgICB9KTtcblxuICB9IGVsc2Uge1xuICAgIG5hdkxpc3QuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIH0pO1xuICB9XG59O1xuIiwidmFyIHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xudmFyIGRpc3BhdGNoID0gcmVxdWlyZSgnLi4vdXRpbHMvZGlzcGF0Y2gnKTtcblxudmFyIGNsaWNrRXZlbnQgPSAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ID8gJ3RvdWNoc3RhcnQnIDogJ2NsaWNrJyk7XG52YXIgZGlzcGF0Y2hlcnMgPSBbXTtcblxuZnVuY3Rpb24gaGFuZGxlTmF2RWxlbWVudHMgKGUpIHtcblxuICB2YXIgdG9nZ2xlRWxlbWVudHMgPSBzZWxlY3QoJy51c2Etb3ZlcmxheSwgLnVzYS1uYXYnKTtcbiAgdmFyIG5hdkNsb3NlRWxlbWVudCA9IHNlbGVjdCgnLnVzYS1uYXYtY2xvc2UnKVsgMCBdO1xuXG4gIHRvZ2dsZUVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2lzLXZpc2libGUnKTtcbiAgfSk7XG5cbiAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCd1c2EtbW9iaWxlX25hdi1hY3RpdmUnKTtcbiAgbmF2Q2xvc2VFbGVtZW50LmZvY3VzKCk7XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBuYXZJbml0ICgpIHtcbiAgdmFyIG5hdkVsZW1lbnRzID0gc2VsZWN0KCcudXNhLW1lbnUtYnRuLCAudXNhLW92ZXJsYXksIC51c2EtbmF2LWNsb3NlJyk7XG5cbiAgZGlzcGF0Y2hlcnMgPSBuYXZFbGVtZW50cy5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2goZWxlbWVudCwgY2xpY2tFdmVudCwgaGFuZGxlTmF2RWxlbWVudHMpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gbmF2T2ZmICgpIHtcbiAgd2hpbGUgKGRpc3BhdGNoZXJzLmxlbmd0aCkge1xuICAgIGRpc3BhdGNoZXJzLnBvcCgpLm9mZigpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmF2SW5pdDtcbm1vZHVsZS5leHBvcnRzLm9mZiA9IG5hdk9mZjtcbiIsInZhciBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcbnZhciBkaXNwYXRjaCA9IHJlcXVpcmUoJy4uL3V0aWxzL2Rpc3BhdGNoJyk7XG5cbnZhciBWSVNVQUxMWV9ISURERU4gPSAndXNhLXNyLW9ubHknO1xuXG52YXIgY2xpY2tFdmVudCA9ICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpXG4gID8gJ3RvdWNoc3RhcnQnXG4gIDogJ2NsaWNrJztcblxudmFyIHNlYXJjaEZvcm07XG52YXIgc2VhcmNoQnV0dG9uO1xudmFyIHNlYXJjaEJ1dHRvbkNvbnRhaW5lcjtcblxudmFyIGFjdGl2YXRlRGlzcGF0Y2hlcjtcbnZhciBkZWFjdGl2YXRlRGlzcGF0Y2hlcjtcblxuZnVuY3Rpb24gc2VhcmNoQnV0dG9uQ2xpY2tIYW5kbGVyIChldmVudCkge1xuICBpZiAoc2VhcmNoRm9ybS5oaWRkZW4pIHtcbiAgICBjbG9zZVNlYXJjaCgpO1xuICB9IGVsc2Uge1xuICAgIG9wZW5TZWFyY2goKTtcbiAgICBkZWFjdGl2YXRlRGlzcGF0Y2hlciA9IGRpc3BhdGNoKGRvY3VtZW50LmJvZHksIGNsaWNrRXZlbnQsIHNlYXJjaE9wZW5DbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBzZWFyY2hPcGVuQ2xpY2tIYW5kbGVyIChldmVudCkge1xuICBpZiAoISBzZWFyY2hGb3JtQ29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgIGNsb3NlU2VhcmNoKCk7XG4gICAgZGVhY3RpdmF0ZURpc3BhdGNoZXIub2ZmKCk7XG4gICAgZGVhY3RpdmF0ZURpc3BhdGNoZXIgPSB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gb3BlblNlYXJjaCAoKSB7XG4gIHNlYXJjaEZvcm0uY2xhc3NMaXN0LnJlbW92ZShWSVNVQUxMWV9ISURERU4pO1xuICB2YXIgaW5wdXQgPSBzZWFyY2hGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1t0eXBlPXNlYXJjaF0nKTtcbiAgaWYgKGlucHV0KSB7XG4gICAgaW5wdXQuZm9jdXMoKTtcbiAgfVxuICBzZWFyY2hCdXR0b24uaGlkZGVuID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY2xvc2VTZWFyY2ggKCkge1xuICBzZWFyY2hGb3JtLmNsYXNzTGlzdC5hZGQoVklTVUFMTFlfSElEREVOKTtcbiAgc2VhcmNoQnV0dG9uLmhpZGRlbiA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBzZWFyY2hGb3JtQ29udGFpbnMgKGVsZW1lbnQpIHtcbiAgcmV0dXJuIChzZWFyY2hGb3JtICYmIHNlYXJjaEZvcm0uY29udGFpbnMoZWxlbWVudCkpIHx8XG4gICAgICAgICAoc2VhcmNoQnV0dG9uQ29udGFpbmVyICYmIHNlYXJjaEJ1dHRvbkNvbnRhaW5lci5jb250YWlucyhlbGVtZW50KSk7XG59XG5cbmZ1bmN0aW9uIHNlYXJjaEluaXQgKCkge1xuICBzZWFyY2hGb3JtID0gc2VsZWN0KCcuanMtc2VhcmNoLWZvcm0nKVsgMCBdO1xuICBzZWFyY2hCdXR0b24gPSBzZWxlY3QoJy5qcy1zZWFyY2gtYnV0dG9uJylbIDAgXTtcbiAgc2VhcmNoQnV0dG9uQ29udGFpbmVyID0gc2VsZWN0KCcuanMtc2VhcmNoLWJ1dHRvbi1jb250YWluZXInKVsgMCBdO1xuXG4gIGlmIChzZWFyY2hCdXR0b24gJiYgc2VhcmNoRm9ybSkge1xuICAgIGNsb3NlU2VhcmNoKCk7XG4gICAgYWN0aXZhdGVEaXNwYXRjaGVyID0gZGlzcGF0Y2goc2VhcmNoQnV0dG9uLCBjbGlja0V2ZW50LCBzZWFyY2hCdXR0b25DbGlja0hhbmRsZXIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNlYXJjaE9mZiAoKSB7XG4gIGlmIChhY3RpdmF0ZURpc3BhdGNoZXIpIHtcbiAgICBhY3RpdmF0ZURpc3BhdGNoZXIub2ZmKCk7XG4gIH1cbiAgaWYgKGRlYWN0aXZhdGVEaXNwYXRjaGVyKSB7XG4gICAgZGVhY3RpdmF0ZURpc3BhdGNoZXIub2ZmKCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZWFyY2hJbml0O1xubW9kdWxlLmV4cG9ydHMub2ZmID0gc2VhcmNoT2ZmO1xuIiwiLyoqXG4gKiBGbGlwcyBnaXZlbiBJTlBVVCBlbGVtZW50cyBiZXR3ZWVuIG1hc2tlZCAoaGlkaW5nIHRoZSBmaWVsZCB2YWx1ZSkgYW5kIHVubWFza2VkXG4gKiBAcGFyYW0ge0FycmF5LkhUTUxFbGVtZW50fSBmaWVsZHMgLSBBbiBhcnJheSBvZiBJTlBVVCBlbGVtZW50c1xuICogQHBhcmFtIHtCb29sZWFufSBtYXNrIC0gV2hldGhlciB0aGUgbWFzayBzaG91bGQgYmUgYXBwbGllZCwgaGlkaW5nIHRoZSBmaWVsZCB2YWx1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmaWVsZHMsIG1hc2spIHtcbiAgZmllbGRzLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgZmllbGQuc2V0QXR0cmlidXRlKCdhdXRvY2FwaXRhbGl6ZScsICdvZmYnKTtcbiAgICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ2F1dG9jb3JyZWN0JywgJ29mZicpO1xuICAgIGZpZWxkLnNldEF0dHJpYnV0ZSgndHlwZScsIG1hc2sgPyAncGFzc3dvcmQnIDogJ3RleHQnKTtcbiAgfSk7XG59O1xuIiwidmFyIHRvZ2dsZUZpZWxkTWFzayA9IHJlcXVpcmUoJy4vdG9nZ2xlLWZpZWxkLW1hc2snKTtcbnZhciBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBkZWNvcmF0ZXMgYW4gSFRNTCBlbGVtZW50IHdpdGggdGhlIGFiaWxpdHkgdG8gdG9nZ2xlIHRoZVxuICogbWFza2VkIHN0YXRlIG9mIGFuIGlucHV0IGZpZWxkIChsaWtlIGEgcGFzc3dvcmQpIHdoZW4gY2xpY2tlZC5cbiAqIFRoZSBpZHMgb2YgdGhlIGZpZWxkcyB0byBiZSBtYXNrZWQgd2lsbCBiZSBwdWxsZWQgZGlyZWN0bHkgZnJvbSB0aGUgYnV0dG9uJ3NcbiAqIGBhcmlhLWNvbnRyb2xzYCBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsICAgIFBhcmVudCBlbGVtZW50IGNvbnRhaW5pbmcgdGhlIGZpZWxkcyB0byBiZSBtYXNrZWRcbiAqIEBwYXJhbSAge1N0cmluZ30gc2hvd1RleHQgICBCdXR0b24gdGV4dCBzaG93biB3aGVuIGZpZWxkIGlzIG1hc2tlZFxuICogQHBhcmFtICB7U3RyaW5nfSBoaWRlVGV4dCAgIEJ1dHRvbiB0ZXh0IHNob3cgd2hlbiBmaWVsZCBpcyB1bm1hc2tlZFxuICogQHJldHVybiB7fVxuICovXG52YXIgdG9nZ2xlRm9ybUlucHV0ID0gZnVuY3Rpb24gKGVsLCBzaG93VGV4dCwgaGlkZVRleHQpIHtcbiAgdmFyIGRlZmF1bHRTZWxlY3RvcnMgPSBlbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcblxuICBpZiAoIWRlZmF1bHRTZWxlY3RvcnMgfHwgZGVmYXVsdFNlbGVjdG9ycy50cmltKCkubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdEaWQgeW91IGZvcmdldCB0byBkZWZpbmUgc2VsZWN0b3JzIGluIHRoZSBhcmlhLWNvbnRyb2xzIGF0dHJpYnV0ZT8gQ2hlY2sgZWxlbWVudCAnICsgZWwub3V0ZXJIVE1MKTtcbiAgfVxuXG4gIHZhciBmaWVsZFNlbGVjdG9yID0gZ2V0U2VsZWN0b3JzKGRlZmF1bHRTZWxlY3RvcnMpO1xuICB2YXIgZm9ybUVsZW1lbnQgPSBnZXRGb3JtUGFyZW50KGVsKTtcbiAgaWYgKCFmb3JtRWxlbWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndG9nZ2xlRm9ybUlucHV0KCkgbmVlZHMgdGhlIHN1cHBsaWVkIGVsZW1lbnQgdG8gYmUgaW5zaWRlIGEgPGZvcm0+LiBDaGVjayBlbGVtZW50ICcgKyBlbC5vdXRlckhUTUwpO1xuICB9XG4gIHZhciBmaWVsZHMgPSBzZWxlY3QoZmllbGRTZWxlY3RvciwgZm9ybUVsZW1lbnQpO1xuICB2YXIgbWFza2VkID0gZmFsc2U7XG5cbiAgdmFyIHRvZ2dsZUNsaWNrTGlzdGVuZXIgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRvZ2dsZUZpZWxkTWFzayhmaWVsZHMsIG1hc2tlZCk7XG4gICAgZWwudGV4dENvbnRlbnQgPSBtYXNrZWQgPyBzaG93VGV4dCA6IGhpZGVUZXh0O1xuICAgIG1hc2tlZCA9ICFtYXNrZWQ7XG4gIH07XG5cbiAgaWYgKGVsLmF0dGFjaEV2ZW50KSB7XG4gICAgZWwuYXR0YWNoRXZlbnQoJ29uY2xpY2snLCB0b2dnbGVDbGlja0xpc3RlbmVyKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUNsaWNrTGlzdGVuZXIpO1xuICB9XG59O1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byB0dXJuIGEgc3RyaW5nIG9mIGlkcyBpbnRvIHZhbGlkIHNlbGVjdG9yc1xuICogQHBhcmFtICB7U3RyaW5nfSBzZWxlY3RvcnMgU3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgaWRzIG9mIGZpZWxkcyB0byBiZSBtYXNrZWRcbiAqIEByZXR1cm4ge1N0cmluZ30gICAgICAgICAgIENvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIHNlbGVjdG9yc1xuICovXG5mdW5jdGlvbiBnZXRTZWxlY3RvcnMgKHNlbGVjdG9ycykge1xuICB2YXIgc2VsZWN0b3JzTGlzdCA9IHNlbGVjdG9ycy5zcGxpdCgnICcpO1xuXG4gIHJldHVybiBzZWxlY3RvcnNMaXN0Lm1hcChmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gJyMnICsgc2VsZWN0b3I7XG4gIH0pLmpvaW4oJywgJyk7XG59XG5cbi8qKlxuICogU2VhcmNoZXMgdXAgdGhlIHRyZWUgZnJvbSB0aGUgZWxlbWVudCB0byBmaW5kIGEgRm9ybSBlbGVtZW50LCBhbmQgcmV0dXJucyBpdCxcbiAqIG9yIG51bGwgaWYgbm8gRm9ybSBpcyBmb3VuZFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBDaGlsZCBlbGVtZW50IHRvIHN0YXJ0IHNlYXJjaFxuICovXG5mdW5jdGlvbiBnZXRGb3JtUGFyZW50IChlbCkge1xuICB3aGlsZSAoZWwgJiYgZWwudGFnTmFtZSAhPT0gJ0ZPUk0nKSB7XG4gICAgZWwgPSBlbC5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiBlbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b2dnbGVGb3JtSW5wdXQ7XG4iLCJ2YXIgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG52YXIgZGlzcGF0Y2ggPSByZXF1aXJlKCcuLi91dGlscy9kaXNwYXRjaCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHZhbGlkYXRvciAoZWwpIHtcbiAgdmFyIGRhdGEgPSBnZXREYXRhKGVsKTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbGlkYXRvck5hbWU7XG4gIHZhciB2YWxpZGF0b3JQYXR0ZXJuO1xuICB2YXIgdmFsaWRhdG9yQ2hlY2tib3g7XG4gIHZhciBjaGVja0xpc3QgPSBzZWxlY3QoZGF0YS52YWxpZGF0aW9uZWxlbWVudClbIDAgXTtcblxuICBmdW5jdGlvbiB2YWxpZGF0ZSAoKSB7XG4gICAgZm9yIChrZXkgaW4gZGF0YSkge1xuICAgICAgaWYgKGtleS5zdGFydHNXaXRoKCd2YWxpZGF0ZScpKSB7XG4gICAgICAgIHZhbGlkYXRvck5hbWUgPSBrZXkuc3BsaXQoJ3ZhbGlkYXRlJylbIDEgXTtcbiAgICAgICAgdmFsaWRhdG9yUGF0dGVybiA9IG5ldyBSZWdFeHAoZGF0YVsga2V5IF0pO1xuICAgICAgICB2YWxpZGF0b3JTZWxlY3RvciA9ICdbZGF0YS12YWxpZGF0b3I9JyArIHZhbGlkYXRvck5hbWUgKyAnXSc7XG4gICAgICAgIHZhbGlkYXRvckNoZWNrYm94ID0gc2VsZWN0KHZhbGlkYXRvclNlbGVjdG9yLCBjaGVja0xpc3QpWyAwIF07XG5cbiAgICAgICAgdmFyIGNoZWNrZWQgPSB2YWxpZGF0b3JQYXR0ZXJuLnRlc3QoZWwudmFsdWUpO1xuICAgICAgICB2YWxpZGF0b3JDaGVja2JveC5jbGFzc0xpc3QudG9nZ2xlKCd1c2EtY2hlY2tsaXN0LWNoZWNrZWQnLCBjaGVja2VkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkaXNwYXRjaChlbCwgJ2tleXVwJywgdmFsaWRhdGUpO1xufTtcblxuLyoqXG4gKiBFeHRyYWN0cyBhdHRyaWJ1dGVzIG5hbWVkIHdpdGggdGhlIHBhdHRlcm4gXCJkYXRhLVtOQU1FXVwiIGZyb20gYSBnaXZlblxuICogSFRNTEVsZW1lbnQsIHRoZW4gcmV0dXJucyBhbiBvYmplY3QgcG9wdWxhdGVkIHdpdGggdGhlIE5BTUUvdmFsdWUgcGFpcnMuXG4gKiBBbnkgaHlwaGVucyBpbiBOQU1FIGFyZSByZW1vdmVkLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiBnZXREYXRhIChlbCkge1xuICBpZiAoIWVsLmhhc0F0dHJpYnV0ZXMoKSkgcmV0dXJuO1xuICB2YXIgZGF0YSA9IHt9O1xuICB2YXIgYXR0cnMgPSBlbC5hdHRyaWJ1dGVzO1xuICBmb3IgKHZhciBpID0gYXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICB2YXIgbWF0Y2hlcyA9IGF0dHJzWyBpIF0ubmFtZS5tYXRjaCgvZGF0YS0oLiopL2kpO1xuICAgIGlmIChtYXRjaGVzICYmIG1hdGNoZXNbIDEgXSkge1xuICAgICAgdmFyIG5hbWUgPSBtYXRjaGVzWyAxIF0ucmVwbGFjZSgvLS8sICcnKTtcbiAgICAgIGRhdGFbIG5hbWUgXSA9IGF0dHJzWyBpIF0udmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBkYXRhO1xufVxuIiwidmFyIHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xudmFyIHdoZW5ET01SZWFkeSA9IHJlcXVpcmUoJy4uL3V0aWxzL3doZW4tZG9tLXJlYWR5Jyk7XG52YXIgQWNjb3JkaW9uID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9hY2NvcmRpb24nKTtcblxud2hlbkRPTVJlYWR5KGZ1bmN0aW9uIGluaXRBY2NvcmRpb25zICgpIHtcblxuICB2YXIgYWNjb3JkaW9ucyA9IHNlbGVjdCgnLnVzYS1hY2NvcmRpb24sIC51c2EtYWNjb3JkaW9uLWJvcmRlcmVkJyk7XG4gIGFjY29yZGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICBuZXcgQWNjb3JkaW9uKGVsKTtcbiAgfSk7XG59KTtcbiIsInZhciB3aGVuRE9NUmVhZHkgPSByZXF1aXJlKCcuLi91dGlscy93aGVuLWRvbS1yZWFkeScpO1xudmFyIGJhbm5lckluaXQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2Jhbm5lcicpO1xuXG53aGVuRE9NUmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gIGJhbm5lckluaXQoKTtcblxufSk7XG5cbiIsInZhciBkZWJvdW5jZSA9IHJlcXVpcmUoJ2xvZGFzaC5kZWJvdW5jZScpO1xudmFyIHdoZW5ET01SZWFkeSA9IHJlcXVpcmUoJy4uL3V0aWxzL3doZW4tZG9tLXJlYWR5Jyk7XG52YXIgZGlzcGF0Y2ggPSByZXF1aXJlKCcuLi91dGlscy9kaXNwYXRjaCcpO1xudmFyIGZvb3RlckFjY29yZGlvbiA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZm9vdGVyJyk7XG5cbndoZW5ET01SZWFkeShmdW5jdGlvbiAoKSB7XG5cbiAgZm9vdGVyQWNjb3JkaW9uKCk7XG5cbiAgZGlzcGF0Y2god2luZG93LCAncmVzaXplJywgZGVib3VuY2UoZm9vdGVyQWNjb3JkaW9uLCAxODApKTtcblxufSk7XG4iLCJ2YXIgd2hlbkRPTVJlYWR5ID0gcmVxdWlyZSgnLi4vdXRpbHMvd2hlbi1kb20tcmVhZHknKTtcbnZhciBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcbnZhciB2YWxpZGF0b3IgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3ZhbGlkYXRvcicpO1xudmFyIHRvZ2dsZUZvcm1JbnB1dCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvdG9nZ2xlLWZvcm0taW5wdXQnKTtcblxud2hlbkRPTVJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGVsU2hvd1Bhc3N3b3JkID0gc2VsZWN0KCcudXNhLXNob3dfcGFzc3dvcmQnKVsgMCBdO1xuICB2YXIgZWxGb3JtSW5wdXQgPSBzZWxlY3QoJy51c2Etc2hvd19tdWx0aXBhc3N3b3JkJylbIDAgXTtcbiAgdmFyIGVsVmFsaWRhdG9yID0gc2VsZWN0KCcuanMtdmFsaWRhdGVfcGFzc3dvcmQnKVsgMCBdO1xuXG4gIGVsU2hvd1Bhc3N3b3JkICYmIHRvZ2dsZUZvcm1JbnB1dChlbFNob3dQYXNzd29yZCwgJ1Nob3cgUGFzc3dvcmQnLCAnSGlkZSBQYXNzd29yZCcpO1xuICBlbEZvcm1JbnB1dCAmJiB0b2dnbGVGb3JtSW5wdXQoZWxGb3JtSW5wdXQsICdTaG93IG15IHR5cGluZycsICdIaWRlIG15IHR5cGluZycpO1xuICBlbFZhbGlkYXRvciAmJiB2YWxpZGF0b3IoZWxWYWxpZGF0b3IpO1xufSk7XG5cbiIsInZhciB3aGVuRE9NUmVhZHkgPSByZXF1aXJlKCcuLi91dGlscy93aGVuLWRvbS1yZWFkeScpO1xudmFyIG5hdkluaXQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL25hdmlnYXRpb24nKTtcblxud2hlbkRPTVJlYWR5KG5hdkluaXQpO1xuIiwiLy8gc3VwcG9ydCBmb3IgSFRNTEVsZW1lbnQjaGlkZGVuXG5yZXF1aXJlKCcuLi9wb2x5ZmlsbHMvZWxlbWVudC1oaWRkZW4nKTtcbi8vIHN1cHBvcnQgZm9yIEVsZW1lbnQjY2xhc3NMaXN0XG5yZXF1aXJlKCdjbGFzc2xpc3QtcG9seWZpbGwnKTtcblxuLyoqXG4gKiBUaGlzIGZpbGUgZGVmaW5lcyBrZXkgRUNNQVNjcmlwdCA1IG1ldGhvZHMgdGhhdCBhcmUgdXNlZCBieSB0aGUgU3RhbmRhcmRzXG4gKiBidXQgbWF5IGJlIG1pc3NpbmcgaW4gb2xkZXIgYnJvd3NlcnMuXG4gKi9cblxuLyoqXG4gKiBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCgpXG4gKiBUYWtlbiBmcm9tIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2ZvckVhY2hcbiAqL1xuXG4vLyBQcm9kdWN0aW9uIHN0ZXBzIG9mIEVDTUEtMjYyLCBFZGl0aW9uIDUsIDE1LjQuNC4xOFxuLy8gUmVmZXJlbmNlOiBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjQuNC4xOFxuaWYgKCFBcnJheS5wcm90b3R5cGUuZm9yRWFjaCkge1xuXG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG5cbiAgICB2YXIgVCwgaztcblxuICAgIGlmICh0aGlzID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcgdGhpcyBpcyBudWxsIG9yIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuXG4gICAgLy8gMS4gTGV0IE8gYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRvT2JqZWN0KCkgcGFzc2luZyB0aGVcbiAgICAvLyB8dGhpc3wgdmFsdWUgYXMgdGhlIGFyZ3VtZW50LlxuICAgIHZhciBPID0gT2JqZWN0KHRoaXMpO1xuXG4gICAgLy8gMi4gTGV0IGxlblZhbHVlIGJlIHRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGUgR2V0KCkgaW50ZXJuYWxcbiAgICAvLyBtZXRob2Qgb2YgTyB3aXRoIHRoZSBhcmd1bWVudCBcImxlbmd0aFwiLlxuICAgIC8vIDMuIExldCBsZW4gYmUgdG9VaW50MzIobGVuVmFsdWUpLlxuICAgIHZhciBsZW4gPSBPLmxlbmd0aCA+Pj4gMDtcblxuICAgIC8vIDQuIElmIGlzQ2FsbGFibGUoY2FsbGJhY2spIGlzIGZhbHNlLCB0aHJvdyBhIFR5cGVFcnJvciBleGNlcHRpb24uIFxuICAgIC8vIFNlZTogaHR0cDovL2VzNS5naXRodWIuY29tLyN4OS4xMVxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoY2FsbGJhY2sgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgLy8gNS4gSWYgdGhpc0FyZyB3YXMgc3VwcGxpZWQsIGxldCBUIGJlIHRoaXNBcmc7IGVsc2UgbGV0XG4gICAgLy8gVCBiZSB1bmRlZmluZWQuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICBUID0gdGhpc0FyZztcbiAgICB9XG5cbiAgICAvLyA2LiBMZXQgayBiZSAwXG4gICAgayA9IDA7XG5cbiAgICAvLyA3LiBSZXBlYXQsIHdoaWxlIGsgPCBsZW5cbiAgICB3aGlsZSAoayA8IGxlbikge1xuXG4gICAgICB2YXIga1ZhbHVlO1xuXG4gICAgICAvLyBhLiBMZXQgUGsgYmUgVG9TdHJpbmcoaykuXG4gICAgICAvLyAgICBUaGlzIGlzIGltcGxpY2l0IGZvciBMSFMgb3BlcmFuZHMgb2YgdGhlIGluIG9wZXJhdG9yXG4gICAgICAvLyBiLiBMZXQga1ByZXNlbnQgYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBIYXNQcm9wZXJ0eVxuICAgICAgLy8gICAgaW50ZXJuYWwgbWV0aG9kIG9mIE8gd2l0aCBhcmd1bWVudCBQay5cbiAgICAgIC8vICAgIFRoaXMgc3RlcCBjYW4gYmUgY29tYmluZWQgd2l0aCBjXG4gICAgICAvLyBjLiBJZiBrUHJlc2VudCBpcyB0cnVlLCB0aGVuXG4gICAgICBpZiAoayBpbiBPKSB7XG5cbiAgICAgICAgLy8gaS4gTGV0IGtWYWx1ZSBiZSB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIEdldCBpbnRlcm5hbFxuICAgICAgICAvLyBtZXRob2Qgb2YgTyB3aXRoIGFyZ3VtZW50IFBrLlxuICAgICAgICBrVmFsdWUgPSBPWyBrIF07XG5cbiAgICAgICAgLy8gaWkuIENhbGwgdGhlIENhbGwgaW50ZXJuYWwgbWV0aG9kIG9mIGNhbGxiYWNrIHdpdGggVCBhc1xuICAgICAgICAvLyB0aGUgdGhpcyB2YWx1ZSBhbmQgYXJndW1lbnQgbGlzdCBjb250YWluaW5nIGtWYWx1ZSwgaywgYW5kIE8uXG4gICAgICAgIGNhbGxiYWNrLmNhbGwoVCwga1ZhbHVlLCBrLCBPKTtcbiAgICAgIH1cbiAgICAgIC8vIGQuIEluY3JlYXNlIGsgYnkgMS5cbiAgICAgIGsrKztcbiAgICB9XG4gICAgLy8gOC4gcmV0dXJuIHVuZGVmaW5lZFxuICB9O1xufVxuXG5cbi8qKlxuICogRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQoKVxuICogVGFrZW4gZnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9GdW5jdGlvbi9iaW5kXG4gKi9cblxuLy8gUmVmZXJlbmNlOiBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjMuNC41XG5pZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSB7XG5cbiAgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAob1RoaXMpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIGNsb3Nlc3QgdGhpbmcgcG9zc2libGUgdG8gdGhlIEVDTUFTY3JpcHQgNVxuICAgICAgLy8gaW50ZXJuYWwgSXNDYWxsYWJsZSBmdW5jdGlvblxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgLSB3aGF0IGlzIHRyeWluZyB0byBiZSBib3VuZCBpcyBub3QgY2FsbGFibGUnKTtcbiAgICB9XG5cbiAgICB2YXIgYUFyZ3MgICA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICBmVG9CaW5kID0gdGhpcyxcbiAgICAgIGZOT1AgICAgPSBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIGZCb3VuZCAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmVG9CaW5kLmFwcGx5KHRoaXMgaW5zdGFuY2VvZiBmTk9QID8gdGhpcyA6IG9UaGlzLFxuICAgICAgICAgICAgICAgIGFBcmdzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICB9O1xuXG4gICAgaWYgKHRoaXMucHJvdG90eXBlKSB7XG4gICAgICAvLyBGdW5jdGlvbi5wcm90b3R5cGUgZG9lc24ndCBoYXZlIGEgcHJvdG90eXBlIHByb3BlcnR5XG4gICAgICBmTk9QLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlOyBcbiAgICB9XG4gICAgZkJvdW5kLnByb3RvdHlwZSA9IG5ldyBmTk9QKCk7XG5cbiAgICByZXR1cm4gZkJvdW5kO1xuICB9O1xuXG59XG4iLCJ2YXIgd2hlbkRPTVJlYWR5ID0gcmVxdWlyZSgnLi4vdXRpbHMvd2hlbi1kb20tcmVhZHknKTtcbnZhciBzZWFyY2hJbml0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9zZWFyY2gnKTtcblxud2hlbkRPTVJlYWR5KHNlYXJjaEluaXQpO1xuIiwidmFyIGRpc3BhdGNoID0gcmVxdWlyZSgnLi4vdXRpbHMvZGlzcGF0Y2gnKTtcbnZhciBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcbnZhciB3aGVuRE9NUmVhZHkgPSByZXF1aXJlKCcuLi91dGlscy93aGVuLWRvbS1yZWFkeScpO1xuXG53aGVuRE9NUmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gIC8vIEZpeGluZyBza2lwIG5hdiBmb2N1cyBiZWhhdmlvciBpbiBjaHJvbWVcbiAgdmFyIGVsU2tpcG5hdiA9IHNlbGVjdCgnLnNraXBuYXYnKVsgMCBdO1xuICB2YXIgZWxNYWluQ29udGVudCA9IHNlbGVjdCgnI21haW4tY29udGVudCcpWyAwIF07XG5cbiAgaWYgKGVsU2tpcG5hdikge1xuICAgIGRpc3BhdGNoKGVsU2tpcG5hdiwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgZWxNYWluQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChlbE1haW5Db250ZW50KSB7XG4gICAgZGlzcGF0Y2goZWxNYWluQ29udGVudCwgJ2JsdXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICBlbE1haW5Db250ZW50LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcbiAgICB9KTtcbiAgfVxufSk7XG4iLCJ2YXIgZWxwcm90byA9IHdpbmRvdy5IVE1MRWxlbWVudC5wcm90b3R5cGU7XG52YXIgSElEREVOID0gJ2hpZGRlbic7XG5cbmlmICghKEhJRERFTiBpbiBlbHByb3RvKSkge1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbHByb3RvLCBISURERU4sIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZShISURERU4pO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShISURERU4sICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKEhJRERFTik7XG4gICAgICB9XG4gICAgfSxcbiAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVGhlICdwb2x5ZmlsbHMnIGZpbGUgZGVmaW5lcyBrZXkgRUNNQVNjcmlwdCA1IG1ldGhvZHMgdGhhdCBtYXkgYmVcbiAqIG1pc3NpbmcgZnJvbSBvbGRlciBicm93c2Vycywgc28gbXVzdCBiZSBsb2FkZWQgZmlyc3QuXG4gKi9cbnJlcXVpcmUoJy4vaW5pdGlhbGl6ZXJzL3BvbHlmaWxscycpO1xuXG5yZXF1aXJlKCcuL2luaXRpYWxpemVycy9hY2NvcmRpb25zJyk7XG5yZXF1aXJlKCcuL2luaXRpYWxpemVycy9iYW5uZXInKTtcbnJlcXVpcmUoJy4vaW5pdGlhbGl6ZXJzL2Zvb3RlcicpO1xucmVxdWlyZSgnLi9pbml0aWFsaXplcnMvZm9ybXMnKTtcbnJlcXVpcmUoJy4vaW5pdGlhbGl6ZXJzL25hdmlnYXRpb24nKTtcbnJlcXVpcmUoJy4vaW5pdGlhbGl6ZXJzL3NlYXJjaCcpO1xucmVxdWlyZSgnLi9pbml0aWFsaXplcnMvc2tpcC1uYXYnKTtcbiIsIi8qKlxuICogQXR0YWNoZXMgYSBnaXZlbiBsaXN0ZW5lciBmdW5jdGlvbiB0byBhIGdpdmVuIGVsZW1lbnQgd2hpY2ggaXNcbiAqIHRyaWdnZXJlZCBieSBhIHNwZWNpZmllZCBsaXN0IG9mIGV2ZW50IHR5cGVzLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIHRoZSBlbGVtZW50IHRvIHdoaWNoIHRoZSBsaXN0ZW5lciB3aWxsIGJlIGF0dGFjaGVkXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRUeXBlcyAtIHNwYWNlLXNlcGFyYXRlZCBsaXN0IG9mIGV2ZW50IHR5cGVzIHdoaWNoIHdpbGwgdHJpZ2dlciB0aGUgbGlzdGVuZXJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0gdGhlIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSAtIGNvbnRhaW5pbmcgYSA8dHQ+dHJpZ2dlcigpPC90dD4gbWV0aG9kIGZvciBleGVjdXRpbmcgdGhlIGxpc3RlbmVyLCBhbmQgYW4gPHR0Pm9mZigpPC90dD4gbWV0aG9kIGZvciBkZXRhY2hpbmcgaXRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaCAoZWxlbWVudCwgZXZlbnRUeXBlcywgbGlzdGVuZXIsIG9wdGlvbnMpIHtcbiAgdmFyIGV2ZW50VHlwZUFycmF5ID0gZXZlbnRUeXBlcy5zcGxpdCgvXFxzKy8pO1xuXG4gIHZhciBhdHRhY2ggPSBmdW5jdGlvbiAoZSwgdCwgZCkge1xuICAgIGlmIChlLmF0dGFjaEV2ZW50KSB7XG4gICAgICBlLmF0dGFjaEV2ZW50KCdvbicgKyB0LCBkLCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKGUuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgZS5hZGRFdmVudExpc3RlbmVyKHQsIGQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgdHJpZ2dlciA9IGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgdmFyIGZha2VFdmVudDtcbiAgICBpZiAoJ2NyZWF0ZUV2ZW50JyBpbiBkb2N1bWVudCkge1xuICAgICAgLy8gbW9kZXJuIGJyb3dzZXJzLCBJRTkrXG4gICAgICBmYWtlRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgZmFrZUV2ZW50LmluaXRFdmVudCh0LCBmYWxzZSwgdHJ1ZSk7XG4gICAgICBlLmRpc3BhdGNoRXZlbnQoZmFrZUV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSUUgOFxuICAgICAgZmFrZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgICAgIGZha2VFdmVudC5ldmVudFR5cGUgPSB0O1xuICAgICAgZS5maXJlRXZlbnQoJ29uJytlLmV2ZW50VHlwZSwgZmFrZUV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGRldGFjaCA9IGZ1bmN0aW9uIChlLCB0LCBkKSB7XG4gICAgaWYgKGUuZGV0YWNoRXZlbnQpIHtcbiAgICAgIGUuZGV0YWNoRXZlbnQoJ29uJyArIHQsIGQsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoZS5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICBlLnJlbW92ZUV2ZW50TGlzdGVuZXIodCwgZCwgb3B0aW9ucyk7XG4gICAgfVxuICB9O1xuXG4gIGV2ZW50VHlwZUFycmF5LmZvckVhY2goZnVuY3Rpb24gKGV2ZW50VHlwZSkge1xuICAgIGF0dGFjaC5jYWxsKG51bGwsIGVsZW1lbnQsIGV2ZW50VHlwZSwgbGlzdGVuZXIpO1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIHRyaWdnZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRyaWdnZXIuY2FsbChudWxsLCBlbGVtZW50LCBldmVudFR5cGVBcnJheVsgMCBdKTtcbiAgICB9LFxuICAgIG9mZjogZnVuY3Rpb24gKCkge1xuICAgICAgZXZlbnRUeXBlQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnRUeXBlKSB7XG4gICAgICAgIGRldGFjaC5jYWxsKG51bGwsIGVsZW1lbnQsIGV2ZW50VHlwZSwgbGlzdGVuZXIpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfTtcbn07XG4iLCIvKipcbiAqIEBuYW1lIHNlbGVjdFxuICogQGRlc2Mgc2VsZWN0cyBlbGVtZW50cyBmcm9tIHRoZSBET00gYnkgY2xhc3Mgc2VsZWN0b3Igb3IgSUQgc2VsZWN0b3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgLSBUaGUgc2VsZWN0b3IgdG8gdHJhdmVyc2UgdGhlIERPTSB3aXRoLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGV4dCAtIFRoZSBjb250ZXh0IHRvIHRyYXZlcnNlIHRoZSBET00gaW4uXG4gKiBAcmV0dXJuIHtBcnJheS5IVE1MRWxlbWVudH0gLSBBbiBhcnJheSBvZiBET00gbm9kZXMgb3IgYW4gZW1wdHkgYXJyYXkuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2VsZWN0IChzZWxlY3RvciwgY29udGV4dCkge1xuXG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgaWYgKChjb250ZXh0ID09PSB1bmRlZmluZWQpIHx8ICFpc0VsZW1lbnQoY29udGV4dCkpIHtcbiAgICBjb250ZXh0ID0gd2luZG93LmRvY3VtZW50O1xuICB9XG5cbiAgdmFyIHNlbGVjdGlvbiA9IGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHNlbGVjdGlvbik7XG5cbn07XG5cbmZ1bmN0aW9uIGlzRWxlbWVudCAodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5ub2RlVHlwZSA9PT0gMTtcbn0iLCIvKlxuICogQG5hbWUgRE9NTG9hZGVkXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYiAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBydW4gd2hlbiB0aGUgRE9NIGhhcyBsb2FkZWQuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gRE9NTG9hZGVkIChjYikge1xuICAvLyBpbiBjYXNlIHRoZSBkb2N1bWVudCBpcyBhbHJlYWR5IHJlbmRlcmVkXG4gIGlmICgnbG9hZGluZycgIT09IGRvY3VtZW50LnJlYWR5U3RhdGUpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihjYikpIHtcbiAgICAgIGNiKCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHsgLy8gbW9kZXJuIGJyb3dzZXJzXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGNiKTtcbiAgfSBlbHNlIHsgLy8gSUUgPD0gOFxuICAgIGRvY3VtZW50LmF0dGFjaEV2ZW50KCdvbnJlYWR5c3RhdGVjaGFuZ2UnLCBmdW5jdGlvbiAoKXtcbiAgICAgIGlmICgnY29tcGxldGUnID09PSBkb2N1bWVudC5yZWFkeVN0YXRlKSB7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKGNiKSkge1xuICAgICAgICAgIGNiKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbiAoYXJnKSB7XG4gIHJldHVybiAodHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJyk7XG59Il19
