(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
(function( w ){
	"use strict";

	var Politespace = function( element ) {
		if( !element ) {
			throw new Error( "Politespace requires an element argument." );
		}

		if( !element.getAttribute ) {
			// Cut the mustard
			return;
		}

		this.element = element;
		this.type = this.element.getAttribute( "type" );
		this.delimiter = this.element.getAttribute( "data-delimiter" ) || " ";
		this.reverse = this.element.getAttribute( "data-reverse" ) !== null;
		this.groupLength = this.element.getAttribute( "data-grouplength" ) || 3;
	};

	Politespace.prototype._divideIntoArray = function( value ) {
		var split = ( '' + this.groupLength ).split( ',' ),
			isUniformSplit = split.length === 1,
			dividedValue = [],
			loopIndex = 0,
			groupLength,
			substrStart,
			useCharCount;

		while( split.length && loopIndex < value.length ) {
			if( isUniformSplit ) {
				groupLength = split[ 0 ];
			} else {
				// use the next split or the rest of the string if open ended, ala "3,3,"
				groupLength = split.shift() || value.length - loopIndex;
			}

			// Use min if we’re at the end of a reversed string
			// (substrStart below grows larger than the string length)
			useCharCount = Math.min( parseInt( groupLength, 10 ), value.length - loopIndex );

			if( this.reverse ) {
				substrStart = -1 * (useCharCount + loopIndex);
			} else {
				substrStart = loopIndex;
			}
			dividedValue.push( value.substr( substrStart, useCharCount ) );
			loopIndex += useCharCount;
		}

		if( this.reverse ) {
			dividedValue.reverse();
		}

		return dividedValue;
	};

	Politespace.prototype.format = function( value ) {
		var val = this.unformat( value );

		return this._divideIntoArray( val ).join( this.delimiter );
	};

	Politespace.prototype.trimMaxlength = function( value ) {
		var maxlength = this.element.getAttribute( "maxlength" );
		// Note input type="number" maxlength does nothing
		if( maxlength ) {
			value = value.substr( 0, maxlength );
		}
		return value;
	};

	Politespace.prototype.getValue = function() {
		return this.trimMaxlength( this.element.value );
	};

	Politespace.prototype.update = function() {
		this.element.value = this.useProxy() ? this.getValue() : this.format( this.getValue() );
	};

	Politespace.prototype.unformat = function( value ) {
		return value.replace( new RegExp(  this.delimiter, 'g' ), '' );
	};

	Politespace.prototype.reset = function() {
		this.element.value = this.unformat( this.element.value );
	};

	Politespace.prototype.useProxy = function() {
		return this.type === "number";
	};

	Politespace.prototype.updateProxy = function() {
		var proxy;
		if( this.useProxy() ) {
			proxy = this.element.parentNode.firstChild;
			proxy.innerHTML = this.format( this.getValue() );
			proxy.style.width = this.element.offsetWidth + "px";
		}
	};

	Politespace.prototype.createProxy = function() {
		if( !this.useProxy() ) {
			return;
		}

		function getStyle( el, prop ) {
			return window.getComputedStyle( el, null ).getPropertyValue( prop );
		}
		function sumStyles( el, props ) {
			var total = 0;
			for( var j=0, k=props.length; j<k; j++ ) {
				total += parseFloat( getStyle( el, props[ j ] ) );
			}
			return total;
		}

		var parent = this.element.parentNode;
		var el = document.createElement( "div" );
		var proxy = document.createElement( "div" );
		proxy.style.font = getStyle( this.element, "font" );
		proxy.style.paddingLeft = sumStyles( this.element, [ "padding-left", "border-left-width" ] ) + "px";
		proxy.style.paddingRight = sumStyles( this.element, [ "padding-right", "border-right-width" ] ) + "px";
		proxy.style.top = sumStyles( this.element, [ "padding-top", "border-top-width", "margin-top" ] ) + "px";

		el.appendChild( proxy );
		el.className = "politespace-proxy active";
		var formEl = parent.replaceChild( el, this.element );
		el.appendChild( formEl );

		this.updateProxy();
	};

	w.Politespace = Politespace;

}( this ));

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

},{"../utils/select":23}],4:[function(require,module,exports){
var select = require('../utils/select');
var addClass = require('../utils/add-class');
var removeClass = require('../utils/remove-class');
var dispatch = require('../utils/dispatch');

function headerClickHandler (event) {
  (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
  
  var expanded = event.target.getAttribute('aria-expanded') === 'true';
  var toggleClass = expanded ? addClass : removeClass;
  toggleClass(this, 'usa-banner-header-expanded');
}

function bannerInit () {
  var headers = select('.usa-banner-header');

  headers.forEach(function (header) {
    var headerClick = headerClickHandler.bind(header);
    select('[aria-controls]').forEach(function (button) {
      dispatch(button, 'click', headerClick);
    });
  });
}

module.exports = bannerInit;
},{"../utils/add-class":20,"../utils/dispatch":21,"../utils/remove-class":22,"../utils/select":23}],5:[function(require,module,exports){
var select = require('../utils/select');
var addClass = require('../utils/add-class');
var removeClass = require('../utils/remove-class');
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
  removeClass(panelToShow, 'hidden');
  otherPanels.forEach(function (el) {
    addClass(el, 'hidden');
  });
};

var events= [];

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
      addClass(el, 'hidden');
    });

    primaryLink.forEach(function (el) {
      events.push(
        dispatch(el, 'click', showPanelListener)
      );
    });

  } else {
    navList.forEach(function (el) {
      removeClass(el, 'hidden');
    });
  }
};

},{"../utils/add-class":20,"../utils/dispatch":21,"../utils/remove-class":22,"../utils/select":23}],6:[function(require,module,exports){
var select = require('../../utils/select');
var addClass = require('../../utils/add-class');
var removeClass = require('../../utils/remove-class');
var dispatch = require('../../utils/dispatch');

var clickHandler = ('ontouchstart' in document.documentElement ? 'touchstart' : 'click');

function toggleClass (element, className) {
  if (element.classList) {
    element.classList.toggle(className);
  }
}

function handleNavElements (e) {

  var toggleElements = select('.usa-overlay, .usa-nav');
  var navCloseElement = select('.usa-nav-close')[ 0 ];

  toggleElements.forEach(function (element) {
    toggleClass(element, 'is-visible');
  });
  toggleClass(document.body, 'usa-mobile_nav-active');
  navCloseElement.focus();
  shouldTrigger = false;
  return false;
}

function mobileInit () {
  var navElements = select('.usa-menu-btn, .usa-overlay, .usa-nav-close');

  navElements.forEach(function (element) {
    dispatch(element, clickHandler, handleNavElements);
  });
}

module.exports = mobileInit;
},{"../../utils/add-class":20,"../../utils/dispatch":21,"../../utils/remove-class":22,"../../utils/select":23}],7:[function(require,module,exports){
var select = require('../../utils/select');
var addClass = require('../../utils/add-class');
var removeClass = require('../../utils/remove-class');
var dispatch = require('../../utils/dispatch');

var searchForm, searchButton, searchButtonContainer, searchDispatcher;

function searchButtonClickHandler (event) {
  if (isOpen(searchForm)) {
    closeSearch();
  } else {
    openSearch();
    searchDispatcher = dispatch(document.body, 'click touchstart', searchOpenClickHandler);
  }

  return false;
}

function searchOpenClickHandler (event) {
  var target = event.target;
  if (! searchFormContains(target)) {
    closeSearch();
    searchDispatcher.off();
  }
}

function openSearch () {
  addClass(searchForm, 'is-visible');
  addClass(searchButton, 'is-hidden');
}

function closeSearch () {
  removeClass(searchForm, 'is-visible');
  removeClass(searchButton, 'is-hidden');
}

function isOpen (element) {
  var classRegexp = new RegExp('(^| )is-visible( |$)', 'gi');
  return classRegexp.test(element.className);
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
    dispatch(searchButton, 'click touchstart', searchButtonClickHandler);
  }
}

module.exports = searchInit;
},{"../../utils/add-class":20,"../../utils/dispatch":21,"../../utils/remove-class":22,"../../utils/select":23}],8:[function(require,module,exports){
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

},{"../utils/select":23,"./toggle-field-mask":8}],10:[function(require,module,exports){
var select = require('../utils/select');
var addClass = require('../utils/add-class');
var removeClass = require('../utils/remove-class');
var dispatch = require('../utils/dispatch');

module.exports = function validator (el) {
  var data = getData(el),
    key,
    validatorName,
    validatorPattern,
    validatorCheckbox,
    checkList = select(data.validationelement)[ 0 ];

  function validate () {
    for (key in data) {
      if (key.startsWith('validate')) {
        validatorName = key.split('validate')[ 1 ];
        validatorPattern = new RegExp(data[ key ]);
        validatorSelector = '[data-validator=' + validatorName + ']';
        validatorCheckbox = select(validatorSelector, checkList)[ 0 ];

        if (!validatorPattern.test(el.value)) {
          removeClass(validatorCheckbox, 'usa-checklist-checked');
        }
        else {
          addClass(validatorCheckbox, 'usa-checklist-checked');
        }
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

},{"../utils/add-class":20,"../utils/dispatch":21,"../utils/remove-class":22,"../utils/select":23}],11:[function(require,module,exports){
var select = require('../utils/select');
var whenDOMReady = require('../utils/when-dom-ready');
var Accordion = require('../components/accordion');

whenDOMReady(function initAccordions () {

  var accordions = select('.usa-accordion, .usa-accordion-bordered');
  accordions.forEach(function (el) {
    new Accordion(el);
  });
});

},{"../components/accordion":3,"../utils/select":23,"../utils/when-dom-ready":25}],12:[function(require,module,exports){
var whenDOMReady = require('../utils/when-dom-ready');
var bannerInit = require('../components/banner');

whenDOMReady(function () {

  bannerInit();

});


},{"../components/banner":4,"../utils/when-dom-ready":25}],13:[function(require,module,exports){
var debounce = require('lodash.debounce');
var whenDOMReady = require('../utils/when-dom-ready');
var dispatch = require('../utils/dispatch');
var footerAccordion = require('../components/footer');

whenDOMReady(function () {

  footerAccordion();

  dispatch(window, 'resize', debounce(footerAccordion, 180));

});

},{"../components/footer":5,"../utils/dispatch":21,"../utils/when-dom-ready":25,"lodash.debounce":1}],14:[function(require,module,exports){
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


},{"../components/toggle-form-input":9,"../components/validator":10,"../utils/select":23,"../utils/when-dom-ready":25}],15:[function(require,module,exports){
var whenDOMReady = require('../utils/when-dom-ready');
var searchInit = require('../components/header/search');
var mobileInit = require('../components/header/mobile');

whenDOMReady(function initHeaders () {

  // Search Toggle
  searchInit();

  // Mobile Navigation
  mobileInit();

});


},{"../components/header/mobile":6,"../components/header/search":7,"../utils/when-dom-ready":25}],16:[function(require,module,exports){
var verifyjQuery = require('../utils/verify-jquery');

// jQuery Plugin

if (verifyjQuery(window)) {

  var $ = window.jQuery;

  // README: This is necessary because politespace doesn't properly export anything
  // in its package.json. TODO: Let's open a PR related to this so we can fix it in Politespace.js
  //
  var Politespace = require('../../../node_modules/politespace/src/politespace').Politespace;

  var componentName = 'politespace',
    enhancedAttr = 'data-enhanced',
    initSelector = '[data-" + componentName + "]:not([" + enhancedAttr + "])';

  $.fn[ componentName ] = function (){
    return this.each(function (){
      var polite = new Politespace(this);
      if(polite.type === 'number') {
        polite.createProxy();
      }

      $(this)
        .bind('input keydown', function () {
          polite.updateProxy();
        })
        .bind('blur', function () {
          $(this).closest('.politespace-proxy').addClass('active');
          polite.update();
          polite.updateProxy();
        })
        .bind('focus', function () {
          $(this).closest('.politespace-proxy').removeClass('active');
          polite.reset();
        })
        .data(componentName, polite);

      polite.update();
    });
  };

	// auto-init on enhance (which is called on domready)
  $(function () {
    $('[data-' + componentName + ']').politespace();
  });

}

},{"../../../node_modules/politespace/src/politespace":2,"../utils/verify-jquery":24}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{"../utils/dispatch":21,"../utils/select":23,"../utils/when-dom-ready":25}],19:[function(require,module,exports){
'use strict';

/**
 * The 'polyfills' file defines key ECMAScript 5 methods that may be
 * missing from older browsers, so must be loaded first.
 */
require('./initializers/polyfills');
require('./initializers/header');
require('./initializers/accordions');
require('./initializers/footer');
require('./initializers/skip-nav');
require('./initializers/forms');
require('./initializers/politespace');
require('./initializers/banner');

},{"./initializers/accordions":11,"./initializers/banner":12,"./initializers/footer":13,"./initializers/forms":14,"./initializers/header":15,"./initializers/politespace":16,"./initializers/polyfills":17,"./initializers/skip-nav":18}],20:[function(require,module,exports){
/**
 * Adds a class to a given HTML element.
 * @param {HTMLElement} element - The element to which the class will be added
 * @param {String} className - The name of the class to add
 */

module.exports = function addClass (element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ' ' + className;
  }
};
},{}],21:[function(require,module,exports){
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
 * Removes a class from a given HTML elementement.
 * @param {HTMLElement} element - The element from which the class will be removed
 * @param {String} className - The name of the class to remove
 */

module.exports = function removeClass (element, className) {
  var classList = element.classList;

  if (classList !== undefined) {
    classList.remove(className);
  }
  else
  {
    classList = element.className.split(/\s+/);
    var newClassList = [];
    classList.forEach(function (c) {
      if (c !== className) {
        newClassList.push(c);
      }
    });
    element.className = newClassList.join(' ');
  }
};

},{}],23:[function(require,module,exports){
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
},{}],24:[function(require,module,exports){
/*
 * @name verifyjQuery
 * @desc Tests the given host object for the presence of jQuery. If no
 *       object is given, the <tt>window</tt> object is used.
 * @param {object} w - Object to test for jQuery.
 * @return {boolean} True if jQuery exists on the object.
 */
module.exports = function verifyjQuery (w) {
  w = w || window;
  return !!(w.jQuery && w.jQuery.fn && w.jQuery.fn.jquery);
};
},{}],25:[function(require,module,exports){
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
},{}]},{},[19])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmRlYm91bmNlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3BvbGl0ZXNwYWNlL3NyYy9wb2xpdGVzcGFjZS5qcyIsInNyYy9qcy9jb21wb25lbnRzL2FjY29yZGlvbi5qcyIsInNyYy9qcy9jb21wb25lbnRzL2Jhbm5lci5qcyIsInNyYy9qcy9jb21wb25lbnRzL2Zvb3Rlci5qcyIsInNyYy9qcy9jb21wb25lbnRzL2hlYWRlci9tb2JpbGUuanMiLCJzcmMvanMvY29tcG9uZW50cy9oZWFkZXIvc2VhcmNoLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvdG9nZ2xlLWZpZWxkLW1hc2suanMiLCJzcmMvanMvY29tcG9uZW50cy90b2dnbGUtZm9ybS1pbnB1dC5qcyIsInNyYy9qcy9jb21wb25lbnRzL3ZhbGlkYXRvci5qcyIsInNyYy9qcy9pbml0aWFsaXplcnMvYWNjb3JkaW9ucy5qcyIsInNyYy9qcy9pbml0aWFsaXplcnMvYmFubmVyLmpzIiwic3JjL2pzL2luaXRpYWxpemVycy9mb290ZXIuanMiLCJzcmMvanMvaW5pdGlhbGl6ZXJzL2Zvcm1zLmpzIiwic3JjL2pzL2luaXRpYWxpemVycy9oZWFkZXIuanMiLCJzcmMvanMvaW5pdGlhbGl6ZXJzL3BvbGl0ZXNwYWNlLmpzIiwic3JjL2pzL2luaXRpYWxpemVycy9wb2x5ZmlsbHMuanMiLCJzcmMvanMvaW5pdGlhbGl6ZXJzL3NraXAtbmF2LmpzIiwic3JjL2pzL3N0YXJ0LmpzIiwic3JjL2pzL3V0aWxzL2FkZC1jbGFzcy5qcyIsInNyYy9qcy91dGlscy9kaXNwYXRjaC5qcyIsInNyYy9qcy91dGlscy9yZW1vdmUtY2xhc3MuanMiLCJzcmMvanMvdXRpbHMvc2VsZWN0LmpzIiwic3JjL2pzL3V0aWxzL3ZlcmlmeS1qcXVlcnkuanMiLCJzcmMvanMvdXRpbHMvd2hlbi1kb20tcmVhZHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDelhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIEdldHMgdGhlIHRpbWVzdGFtcCBvZiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZVxuICogdGhlIFVuaXggZXBvY2ggKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVzdGFtcC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbihzdGFtcCkge1xuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xuICogfSwgXy5ub3coKSk7XG4gKiAvLyA9PiBMb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBpbnZvY2F0aW9uLlxuICovXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiByb290LkRhdGUubm93KCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxuICogbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2FzXG4gKiBpbnZva2VkLiBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2QgdG8gY2FuY2VsXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cbiAqIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZVxuICogbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2BcbiAqIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XVxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCkpO1xuICpcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKlxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cbiAqIHZhciBkZWJvdW5jZWQgPSBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHsgJ21heFdhaXQnOiAxMDAwIH0pO1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgZGVib3VuY2VkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGFzdEFyZ3MsXG4gICAgICBsYXN0VGhpcyxcbiAgICAgIG1heFdhaXQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lcklkLFxuICAgICAgbGFzdENhbGxUaW1lLFxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxuICAgICAgbGVhZGluZyA9IGZhbHNlLFxuICAgICAgbWF4aW5nID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgd2FpdCA9IHRvTnVtYmVyKHdhaXQpIHx8IDA7XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAhIW9wdGlvbnMubGVhZGluZztcbiAgICBtYXhpbmcgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucztcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VGdW5jKHRpbWUpIHtcbiAgICB2YXIgYXJncyA9IGxhc3RBcmdzLFxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XG5cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkaW5nRWRnZSh0aW1lKSB7XG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgLy8gU3RhcnQgdGhlIHRpbWVyIGZvciB0aGUgdHJhaWxpbmcgZWRnZS5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIC8vIEludm9rZSB0aGUgbGVhZGluZyBlZGdlLlxuICAgIHJldHVybiBsZWFkaW5nID8gaW52b2tlRnVuYyh0aW1lKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbWFpbmluZ1dhaXQodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWUsXG4gICAgICAgIHJlc3VsdCA9IHdhaXQgLSB0aW1lU2luY2VMYXN0Q2FsbDtcblxuICAgIHJldHVybiBtYXhpbmcgPyBuYXRpdmVNaW4ocmVzdWx0LCBtYXhXYWl0IC0gdGltZVNpbmNlTGFzdEludm9rZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRJbnZva2UodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWU7XG5cbiAgICAvLyBFaXRoZXIgdGhpcyBpcyB0aGUgZmlyc3QgY2FsbCwgYWN0aXZpdHkgaGFzIHN0b3BwZWQgYW5kIHdlJ3JlIGF0IHRoZVxuICAgIC8vIHRyYWlsaW5nIGVkZ2UsIHRoZSBzeXN0ZW0gdGltZSBoYXMgZ29uZSBiYWNrd2FyZHMgYW5kIHdlJ3JlIHRyZWF0aW5nXG4gICAgLy8gaXQgYXMgdGhlIHRyYWlsaW5nIGVkZ2UsIG9yIHdlJ3ZlIGhpdCB0aGUgYG1heFdhaXRgIGxpbWl0LlxuICAgIHJldHVybiAobGFzdENhbGxUaW1lID09PSB1bmRlZmluZWQgfHwgKHRpbWVTaW5jZUxhc3RDYWxsID49IHdhaXQpIHx8XG4gICAgICAodGltZVNpbmNlTGFzdENhbGwgPCAwKSB8fCAobWF4aW5nICYmIHRpbWVTaW5jZUxhc3RJbnZva2UgPj0gbWF4V2FpdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCk7XG4gICAgaWYgKHNob3VsZEludm9rZSh0aW1lKSkge1xuICAgICAgcmV0dXJuIHRyYWlsaW5nRWRnZSh0aW1lKTtcbiAgICB9XG4gICAgLy8gUmVzdGFydCB0aGUgdGltZXIuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCByZW1haW5pbmdXYWl0KHRpbWUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWlsaW5nRWRnZSh0aW1lKSB7XG4gICAgdGltZXJJZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIE9ubHkgaW52b2tlIGlmIHdlIGhhdmUgYGxhc3RBcmdzYCB3aGljaCBtZWFucyBgZnVuY2AgaGFzIGJlZW5cbiAgICAvLyBkZWJvdW5jZWQgYXQgbGVhc3Qgb25jZS5cbiAgICBpZiAodHJhaWxpbmcgJiYgbGFzdEFyZ3MpIHtcbiAgICAgIHJldHVybiBpbnZva2VGdW5jKHRpbWUpO1xuICAgIH1cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKHRpbWVySWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgIH1cbiAgICBsYXN0SW52b2tlVGltZSA9IDA7XG4gICAgbGFzdEFyZ3MgPSBsYXN0Q2FsbFRpbWUgPSBsYXN0VGhpcyA9IHRpbWVySWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICByZXR1cm4gdGltZXJJZCA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogdHJhaWxpbmdFZGdlKG5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpLFxuICAgICAgICBpc0ludm9raW5nID0gc2hvdWxkSW52b2tlKHRpbWUpO1xuXG4gICAgbGFzdEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGFzdFRoaXMgPSB0aGlzO1xuICAgIGxhc3RDYWxsVGltZSA9IHRpbWU7XG5cbiAgICBpZiAoaXNJbnZva2luZykge1xuICAgICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbGVhZGluZ0VkZ2UobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChtYXhpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGludm9jYXRpb25zIGluIGEgdGlnaHQgbG9vcC5cbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVib3VuY2U7XG4iLCIoZnVuY3Rpb24oIHcgKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0dmFyIFBvbGl0ZXNwYWNlID0gZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0aWYoICFlbGVtZW50ICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCBcIlBvbGl0ZXNwYWNlIHJlcXVpcmVzIGFuIGVsZW1lbnQgYXJndW1lbnQuXCIgKTtcblx0XHR9XG5cblx0XHRpZiggIWVsZW1lbnQuZ2V0QXR0cmlidXRlICkge1xuXHRcdFx0Ly8gQ3V0IHRoZSBtdXN0YXJkXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblx0XHR0aGlzLnR5cGUgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCBcInR5cGVcIiApO1xuXHRcdHRoaXMuZGVsaW1pdGVyID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSggXCJkYXRhLWRlbGltaXRlclwiICkgfHwgXCIgXCI7XG5cdFx0dGhpcy5yZXZlcnNlID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSggXCJkYXRhLXJldmVyc2VcIiApICE9PSBudWxsO1xuXHRcdHRoaXMuZ3JvdXBMZW5ndGggPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCBcImRhdGEtZ3JvdXBsZW5ndGhcIiApIHx8IDM7XG5cdH07XG5cblx0UG9saXRlc3BhY2UucHJvdG90eXBlLl9kaXZpZGVJbnRvQXJyYXkgPSBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0dmFyIHNwbGl0ID0gKCAnJyArIHRoaXMuZ3JvdXBMZW5ndGggKS5zcGxpdCggJywnICksXG5cdFx0XHRpc1VuaWZvcm1TcGxpdCA9IHNwbGl0Lmxlbmd0aCA9PT0gMSxcblx0XHRcdGRpdmlkZWRWYWx1ZSA9IFtdLFxuXHRcdFx0bG9vcEluZGV4ID0gMCxcblx0XHRcdGdyb3VwTGVuZ3RoLFxuXHRcdFx0c3Vic3RyU3RhcnQsXG5cdFx0XHR1c2VDaGFyQ291bnQ7XG5cblx0XHR3aGlsZSggc3BsaXQubGVuZ3RoICYmIGxvb3BJbmRleCA8IHZhbHVlLmxlbmd0aCApIHtcblx0XHRcdGlmKCBpc1VuaWZvcm1TcGxpdCApIHtcblx0XHRcdFx0Z3JvdXBMZW5ndGggPSBzcGxpdFsgMCBdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gdXNlIHRoZSBuZXh0IHNwbGl0IG9yIHRoZSByZXN0IG9mIHRoZSBzdHJpbmcgaWYgb3BlbiBlbmRlZCwgYWxhIFwiMywzLFwiXG5cdFx0XHRcdGdyb3VwTGVuZ3RoID0gc3BsaXQuc2hpZnQoKSB8fCB2YWx1ZS5sZW5ndGggLSBsb29wSW5kZXg7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFVzZSBtaW4gaWYgd2XigJlyZSBhdCB0aGUgZW5kIG9mIGEgcmV2ZXJzZWQgc3RyaW5nXG5cdFx0XHQvLyAoc3Vic3RyU3RhcnQgYmVsb3cgZ3Jvd3MgbGFyZ2VyIHRoYW4gdGhlIHN0cmluZyBsZW5ndGgpXG5cdFx0XHR1c2VDaGFyQ291bnQgPSBNYXRoLm1pbiggcGFyc2VJbnQoIGdyb3VwTGVuZ3RoLCAxMCApLCB2YWx1ZS5sZW5ndGggLSBsb29wSW5kZXggKTtcblxuXHRcdFx0aWYoIHRoaXMucmV2ZXJzZSApIHtcblx0XHRcdFx0c3Vic3RyU3RhcnQgPSAtMSAqICh1c2VDaGFyQ291bnQgKyBsb29wSW5kZXgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c3Vic3RyU3RhcnQgPSBsb29wSW5kZXg7XG5cdFx0XHR9XG5cdFx0XHRkaXZpZGVkVmFsdWUucHVzaCggdmFsdWUuc3Vic3RyKCBzdWJzdHJTdGFydCwgdXNlQ2hhckNvdW50ICkgKTtcblx0XHRcdGxvb3BJbmRleCArPSB1c2VDaGFyQ291bnQ7XG5cdFx0fVxuXG5cdFx0aWYoIHRoaXMucmV2ZXJzZSApIHtcblx0XHRcdGRpdmlkZWRWYWx1ZS5yZXZlcnNlKCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRpdmlkZWRWYWx1ZTtcblx0fTtcblxuXHRQb2xpdGVzcGFjZS5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHZhciB2YWwgPSB0aGlzLnVuZm9ybWF0KCB2YWx1ZSApO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2RpdmlkZUludG9BcnJheSggdmFsICkuam9pbiggdGhpcy5kZWxpbWl0ZXIgKTtcblx0fTtcblxuXHRQb2xpdGVzcGFjZS5wcm90b3R5cGUudHJpbU1heGxlbmd0aCA9IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHR2YXIgbWF4bGVuZ3RoID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSggXCJtYXhsZW5ndGhcIiApO1xuXHRcdC8vIE5vdGUgaW5wdXQgdHlwZT1cIm51bWJlclwiIG1heGxlbmd0aCBkb2VzIG5vdGhpbmdcblx0XHRpZiggbWF4bGVuZ3RoICkge1xuXHRcdFx0dmFsdWUgPSB2YWx1ZS5zdWJzdHIoIDAsIG1heGxlbmd0aCApO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWU7XG5cdH07XG5cblx0UG9saXRlc3BhY2UucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMudHJpbU1heGxlbmd0aCggdGhpcy5lbGVtZW50LnZhbHVlICk7XG5cdH07XG5cblx0UG9saXRlc3BhY2UucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuZWxlbWVudC52YWx1ZSA9IHRoaXMudXNlUHJveHkoKSA/IHRoaXMuZ2V0VmFsdWUoKSA6IHRoaXMuZm9ybWF0KCB0aGlzLmdldFZhbHVlKCkgKTtcblx0fTtcblxuXHRQb2xpdGVzcGFjZS5wcm90b3R5cGUudW5mb3JtYXQgPSBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoIG5ldyBSZWdFeHAoICB0aGlzLmRlbGltaXRlciwgJ2cnICksICcnICk7XG5cdH07XG5cblx0UG9saXRlc3BhY2UucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5lbGVtZW50LnZhbHVlID0gdGhpcy51bmZvcm1hdCggdGhpcy5lbGVtZW50LnZhbHVlICk7XG5cdH07XG5cblx0UG9saXRlc3BhY2UucHJvdG90eXBlLnVzZVByb3h5ID0gZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMudHlwZSA9PT0gXCJudW1iZXJcIjtcblx0fTtcblxuXHRQb2xpdGVzcGFjZS5wcm90b3R5cGUudXBkYXRlUHJveHkgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgcHJveHk7XG5cdFx0aWYoIHRoaXMudXNlUHJveHkoKSApIHtcblx0XHRcdHByb3h5ID0gdGhpcy5lbGVtZW50LnBhcmVudE5vZGUuZmlyc3RDaGlsZDtcblx0XHRcdHByb3h5LmlubmVySFRNTCA9IHRoaXMuZm9ybWF0KCB0aGlzLmdldFZhbHVlKCkgKTtcblx0XHRcdHByb3h5LnN0eWxlLndpZHRoID0gdGhpcy5lbGVtZW50Lm9mZnNldFdpZHRoICsgXCJweFwiO1xuXHRcdH1cblx0fTtcblxuXHRQb2xpdGVzcGFjZS5wcm90b3R5cGUuY3JlYXRlUHJveHkgPSBmdW5jdGlvbigpIHtcblx0XHRpZiggIXRoaXMudXNlUHJveHkoKSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRTdHlsZSggZWwsIHByb3AgKSB7XG5cdFx0XHRyZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoIGVsLCBudWxsICkuZ2V0UHJvcGVydHlWYWx1ZSggcHJvcCApO1xuXHRcdH1cblx0XHRmdW5jdGlvbiBzdW1TdHlsZXMoIGVsLCBwcm9wcyApIHtcblx0XHRcdHZhciB0b3RhbCA9IDA7XG5cdFx0XHRmb3IoIHZhciBqPTAsIGs9cHJvcHMubGVuZ3RoOyBqPGs7IGorKyApIHtcblx0XHRcdFx0dG90YWwgKz0gcGFyc2VGbG9hdCggZ2V0U3R5bGUoIGVsLCBwcm9wc1sgaiBdICkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0b3RhbDtcblx0XHR9XG5cblx0XHR2YXIgcGFyZW50ID0gdGhpcy5lbGVtZW50LnBhcmVudE5vZGU7XG5cdFx0dmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xuXHRcdHZhciBwcm94eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcblx0XHRwcm94eS5zdHlsZS5mb250ID0gZ2V0U3R5bGUoIHRoaXMuZWxlbWVudCwgXCJmb250XCIgKTtcblx0XHRwcm94eS5zdHlsZS5wYWRkaW5nTGVmdCA9IHN1bVN0eWxlcyggdGhpcy5lbGVtZW50LCBbIFwicGFkZGluZy1sZWZ0XCIsIFwiYm9yZGVyLWxlZnQtd2lkdGhcIiBdICkgKyBcInB4XCI7XG5cdFx0cHJveHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gc3VtU3R5bGVzKCB0aGlzLmVsZW1lbnQsIFsgXCJwYWRkaW5nLXJpZ2h0XCIsIFwiYm9yZGVyLXJpZ2h0LXdpZHRoXCIgXSApICsgXCJweFwiO1xuXHRcdHByb3h5LnN0eWxlLnRvcCA9IHN1bVN0eWxlcyggdGhpcy5lbGVtZW50LCBbIFwicGFkZGluZy10b3BcIiwgXCJib3JkZXItdG9wLXdpZHRoXCIsIFwibWFyZ2luLXRvcFwiIF0gKSArIFwicHhcIjtcblxuXHRcdGVsLmFwcGVuZENoaWxkKCBwcm94eSApO1xuXHRcdGVsLmNsYXNzTmFtZSA9IFwicG9saXRlc3BhY2UtcHJveHkgYWN0aXZlXCI7XG5cdFx0dmFyIGZvcm1FbCA9IHBhcmVudC5yZXBsYWNlQ2hpbGQoIGVsLCB0aGlzLmVsZW1lbnQgKTtcblx0XHRlbC5hcHBlbmRDaGlsZCggZm9ybUVsICk7XG5cblx0XHR0aGlzLnVwZGF0ZVByb3h5KCk7XG5cdH07XG5cblx0dy5Qb2xpdGVzcGFjZSA9IFBvbGl0ZXNwYWNlO1xuXG59KCB0aGlzICkpO1xuIiwidmFyIHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xuXG4vKipcbiAqIEBuYW1lIHNob3dQYW5lbExpc3RlbmVyXG4gKiBAZGVzYyBUaGUgZXZlbnQgaGFuZGxlciBmb3IgY2xpY2tpbmcgb24gYSBidXR0b24gaW4gYW4gYWNjb3JkaW9uLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBBbiBIVE1MIGVsZW1lbnQgbW9zdCBsaWtlbHkgYSA8YnV0dG9uPi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBldiAtIEEgRE9NIGV2ZW50IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gc2hvd1BhbmVsTGlzdGVuZXIgKGVsLCBldikge1xuICB2YXIgZXhwYW5kZWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKSA9PT0gJ3RydWUnO1xuICB0aGlzLmhpZGVBbGwoKTtcbiAgaWYgKCFleHBhbmRlZCkge1xuICAgIHRoaXMuc2hvdyhlbCk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEBjbGFzcyBBY2NvcmRpb25cbiAqXG4gKiBBbiBhY2NvcmRpb24gY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIEhUTUxFbGVtZW50IHRvIHR1cm4gaW50byBhbiBhY2NvcmRpb24uXG4gKi9cbmZ1bmN0aW9uIEFjY29yZGlvbiAoZWwpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLnJvb3QgPSBlbDtcblxuICAvLyBkZWxlZ2F0ZSBjbGljayBldmVudHMgb24gZWFjaCA8YnV0dG9uPlxuICB2YXIgYnV0dG9ucyA9IHNlbGVjdCgnYnV0dG9uJywgdGhpcy5yb290KTtcbiAgYnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgIGlmIChlbC5hdHRhY2hFdmVudCkge1xuICAgICAgZWwuYXR0YWNoRXZlbnQoJ29uY2xpY2snLCBzaG93UGFuZWxMaXN0ZW5lci5iaW5kKHNlbGYsIGVsKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd1BhbmVsTGlzdGVuZXIuYmluZChzZWxmLCBlbCkpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gZmluZCB0aGUgZmlyc3QgZXhwYW5kZWQgYnV0dG9uXG4gIHZhciBleHBhbmRlZCA9IHRoaXMuJCgnYnV0dG9uW2FyaWEtZXhwYW5kZWQ9dHJ1ZV0nKVsgMCBdO1xuICB0aGlzLmhpZGVBbGwoKTtcbiAgaWYgKGV4cGFuZGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnNob3coZXhwYW5kZWQpO1xuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqL1xuQWNjb3JkaW9uLnByb3RvdHlwZS4kID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHJldHVybiBzZWxlY3Qoc2VsZWN0b3IsIHRoaXMucm9vdCk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJ1dHRvblxuICogQHJldHVybiB7QWNjb3JkaW9ufVxuICovXG5BY2NvcmRpb24ucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoYnV0dG9uKSB7XG4gIHZhciBzZWxlY3RvciA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKSxcbiAgICBjb250ZW50ID0gdGhpcy4kKCcjJyArIHNlbGVjdG9yKVsgMCBdO1xuXG4gIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG4gIGNvbnRlbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYnV0dG9uXG4gKiBAcmV0dXJuIHtBY2NvcmRpb259XG4gKi9cbkFjY29yZGlvbi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uIChidXR0b24pIHtcbiAgdmFyIHNlbGVjdG9yID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpLFxuICAgIGNvbnRlbnQgPSB0aGlzLiQoJyMnICsgc2VsZWN0b3IpWyAwIF07XG5cbiAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuICBjb250ZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBmYWxzZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBAcmV0dXJuIHtBY2NvcmRpb259XG4gKi9cbkFjY29yZGlvbi5wcm90b3R5cGUuaGlkZUFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgYnV0dG9ucyA9IHRoaXMuJCgndWwgPiBsaSA+IGJ1dHRvbiwgLnVzYS1hY2NvcmRpb24tYnV0dG9uJyk7XG4gIGJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbiAoYnV0dG9uKSB7XG4gICAgc2VsZi5oaWRlKGJ1dHRvbik7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQWNjb3JkaW9uO1xuIiwidmFyIHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xudmFyIGFkZENsYXNzID0gcmVxdWlyZSgnLi4vdXRpbHMvYWRkLWNsYXNzJyk7XG52YXIgcmVtb3ZlQ2xhc3MgPSByZXF1aXJlKCcuLi91dGlscy9yZW1vdmUtY2xhc3MnKTtcbnZhciBkaXNwYXRjaCA9IHJlcXVpcmUoJy4uL3V0aWxzL2Rpc3BhdGNoJyk7XG5cbmZ1bmN0aW9uIGhlYWRlckNsaWNrSGFuZGxlciAoZXZlbnQpIHtcbiAgKGV2ZW50LnByZXZlbnREZWZhdWx0KSA/IGV2ZW50LnByZXZlbnREZWZhdWx0KCkgOiBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICBcbiAgdmFyIGV4cGFuZGVkID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpID09PSAndHJ1ZSc7XG4gIHZhciB0b2dnbGVDbGFzcyA9IGV4cGFuZGVkID8gYWRkQ2xhc3MgOiByZW1vdmVDbGFzcztcbiAgdG9nZ2xlQ2xhc3ModGhpcywgJ3VzYS1iYW5uZXItaGVhZGVyLWV4cGFuZGVkJyk7XG59XG5cbmZ1bmN0aW9uIGJhbm5lckluaXQgKCkge1xuICB2YXIgaGVhZGVycyA9IHNlbGVjdCgnLnVzYS1iYW5uZXItaGVhZGVyJyk7XG5cbiAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChoZWFkZXIpIHtcbiAgICB2YXIgaGVhZGVyQ2xpY2sgPSBoZWFkZXJDbGlja0hhbmRsZXIuYmluZChoZWFkZXIpO1xuICAgIHNlbGVjdCgnW2FyaWEtY29udHJvbHNdJykuZm9yRWFjaChmdW5jdGlvbiAoYnV0dG9uKSB7XG4gICAgICBkaXNwYXRjaChidXR0b24sICdjbGljaycsIGhlYWRlckNsaWNrKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFubmVySW5pdDsiLCJ2YXIgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG52YXIgYWRkQ2xhc3MgPSByZXF1aXJlKCcuLi91dGlscy9hZGQtY2xhc3MnKTtcbnZhciByZW1vdmVDbGFzcyA9IHJlcXVpcmUoJy4uL3V0aWxzL3JlbW92ZS1jbGFzcycpO1xudmFyIGRpc3BhdGNoID0gcmVxdWlyZSgnLi4vdXRpbHMvZGlzcGF0Y2gnKTtcblxuZnVuY3Rpb24gZ2V0U2libGluZ3MgKGVsKSB7XG4gIHZhciBuID0gZWwucGFyZW50Tm9kZS5maXJzdENoaWxkO1xuICB2YXIgbWF0Y2hlcyA9IFtdO1xuXG4gIHdoaWxlIChuKSB7XG4gICAgaWYgKG4ubm9kZVR5cGUgPT0gMSAmJiBuICE9IGVsKSB7XG4gICAgICBtYXRjaGVzLnB1c2gobik7XG4gICAgfVxuICAgIG4gPSBuLm5leHRTaWJsaW5nO1xuICB9XG5cbiAgcmV0dXJuIG1hdGNoZXM7XG59XG5cbnZhciBzaG93UGFuZWxMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHBhbmVsVG9TaG93ID0gdGhpcy5wYXJlbnROb2RlO1xuICB2YXIgb3RoZXJQYW5lbHMgPSBnZXRTaWJsaW5ncyhwYW5lbFRvU2hvdyk7XG4gIHJlbW92ZUNsYXNzKHBhbmVsVG9TaG93LCAnaGlkZGVuJyk7XG4gIG90aGVyUGFuZWxzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgYWRkQ2xhc3MoZWwsICdoaWRkZW4nKTtcbiAgfSk7XG59O1xuXG52YXIgZXZlbnRzPSBbXTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmb290ZXJBY2NvcmRpb24gKCkge1xuXG4gIHZhciBuYXZMaXN0ID0gc2VsZWN0KCcudXNhLWZvb3Rlci1iaWcgbmF2IHVsJyk7XG4gIHZhciBwcmltYXJ5TGluayA9IHNlbGVjdCgnLnVzYS1mb290ZXItYmlnIG5hdiAudXNhLWZvb3Rlci1wcmltYXJ5LWxpbmsnKTtcblxuICBpZiAoZXZlbnRzLmxlbmd0aCkge1xuICAgIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLm9mZigpO1xuICAgIH0pO1xuICAgIGV2ZW50cyA9IFtdO1xuICB9XG5cbiAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNjAwKSB7XG5cbiAgICBuYXZMaXN0LmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICBhZGRDbGFzcyhlbCwgJ2hpZGRlbicpO1xuICAgIH0pO1xuXG4gICAgcHJpbWFyeUxpbmsuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgIGV2ZW50cy5wdXNoKFxuICAgICAgICBkaXNwYXRjaChlbCwgJ2NsaWNrJywgc2hvd1BhbmVsTGlzdGVuZXIpXG4gICAgICApO1xuICAgIH0pO1xuXG4gIH0gZWxzZSB7XG4gICAgbmF2TGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgcmVtb3ZlQ2xhc3MoZWwsICdoaWRkZW4nKTtcbiAgICB9KTtcbiAgfVxufTtcbiIsInZhciBzZWxlY3QgPSByZXF1aXJlKCcuLi8uLi91dGlscy9zZWxlY3QnKTtcbnZhciBhZGRDbGFzcyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2FkZC1jbGFzcycpO1xudmFyIHJlbW92ZUNsYXNzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvcmVtb3ZlLWNsYXNzJyk7XG52YXIgZGlzcGF0Y2ggPSByZXF1aXJlKCcuLi8uLi91dGlscy9kaXNwYXRjaCcpO1xuXG52YXIgY2xpY2tIYW5kbGVyID0gKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA/ICd0b3VjaHN0YXJ0JyA6ICdjbGljaycpO1xuXG5mdW5jdGlvbiB0b2dnbGVDbGFzcyAoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU5hdkVsZW1lbnRzIChlKSB7XG5cbiAgdmFyIHRvZ2dsZUVsZW1lbnRzID0gc2VsZWN0KCcudXNhLW92ZXJsYXksIC51c2EtbmF2Jyk7XG4gIHZhciBuYXZDbG9zZUVsZW1lbnQgPSBzZWxlY3QoJy51c2EtbmF2LWNsb3NlJylbIDAgXTtcblxuICB0b2dnbGVFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgdG9nZ2xlQ2xhc3MoZWxlbWVudCwgJ2lzLXZpc2libGUnKTtcbiAgfSk7XG4gIHRvZ2dsZUNsYXNzKGRvY3VtZW50LmJvZHksICd1c2EtbW9iaWxlX25hdi1hY3RpdmUnKTtcbiAgbmF2Q2xvc2VFbGVtZW50LmZvY3VzKCk7XG4gIHNob3VsZFRyaWdnZXIgPSBmYWxzZTtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBtb2JpbGVJbml0ICgpIHtcbiAgdmFyIG5hdkVsZW1lbnRzID0gc2VsZWN0KCcudXNhLW1lbnUtYnRuLCAudXNhLW92ZXJsYXksIC51c2EtbmF2LWNsb3NlJyk7XG5cbiAgbmF2RWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGRpc3BhdGNoKGVsZW1lbnQsIGNsaWNrSGFuZGxlciwgaGFuZGxlTmF2RWxlbWVudHMpO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtb2JpbGVJbml0OyIsInZhciBzZWxlY3QgPSByZXF1aXJlKCcuLi8uLi91dGlscy9zZWxlY3QnKTtcbnZhciBhZGRDbGFzcyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2FkZC1jbGFzcycpO1xudmFyIHJlbW92ZUNsYXNzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvcmVtb3ZlLWNsYXNzJyk7XG52YXIgZGlzcGF0Y2ggPSByZXF1aXJlKCcuLi8uLi91dGlscy9kaXNwYXRjaCcpO1xuXG52YXIgc2VhcmNoRm9ybSwgc2VhcmNoQnV0dG9uLCBzZWFyY2hCdXR0b25Db250YWluZXIsIHNlYXJjaERpc3BhdGNoZXI7XG5cbmZ1bmN0aW9uIHNlYXJjaEJ1dHRvbkNsaWNrSGFuZGxlciAoZXZlbnQpIHtcbiAgaWYgKGlzT3BlbihzZWFyY2hGb3JtKSkge1xuICAgIGNsb3NlU2VhcmNoKCk7XG4gIH0gZWxzZSB7XG4gICAgb3BlblNlYXJjaCgpO1xuICAgIHNlYXJjaERpc3BhdGNoZXIgPSBkaXNwYXRjaChkb2N1bWVudC5ib2R5LCAnY2xpY2sgdG91Y2hzdGFydCcsIHNlYXJjaE9wZW5DbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBzZWFyY2hPcGVuQ2xpY2tIYW5kbGVyIChldmVudCkge1xuICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICBpZiAoISBzZWFyY2hGb3JtQ29udGFpbnModGFyZ2V0KSkge1xuICAgIGNsb3NlU2VhcmNoKCk7XG4gICAgc2VhcmNoRGlzcGF0Y2hlci5vZmYoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvcGVuU2VhcmNoICgpIHtcbiAgYWRkQ2xhc3Moc2VhcmNoRm9ybSwgJ2lzLXZpc2libGUnKTtcbiAgYWRkQ2xhc3Moc2VhcmNoQnV0dG9uLCAnaXMtaGlkZGVuJyk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlU2VhcmNoICgpIHtcbiAgcmVtb3ZlQ2xhc3Moc2VhcmNoRm9ybSwgJ2lzLXZpc2libGUnKTtcbiAgcmVtb3ZlQ2xhc3Moc2VhcmNoQnV0dG9uLCAnaXMtaGlkZGVuJyk7XG59XG5cbmZ1bmN0aW9uIGlzT3BlbiAoZWxlbWVudCkge1xuICB2YXIgY2xhc3NSZWdleHAgPSBuZXcgUmVnRXhwKCcoXnwgKWlzLXZpc2libGUoIHwkKScsICdnaScpO1xuICByZXR1cm4gY2xhc3NSZWdleHAudGVzdChlbGVtZW50LmNsYXNzTmFtZSk7XG59XG5cbmZ1bmN0aW9uIHNlYXJjaEZvcm1Db250YWlucyAoZWxlbWVudCkge1xuICByZXR1cm4gKHNlYXJjaEZvcm0gJiYgc2VhcmNoRm9ybS5jb250YWlucyhlbGVtZW50KSkgfHxcbiAgICAgICAgIChzZWFyY2hCdXR0b25Db250YWluZXIgJiYgc2VhcmNoQnV0dG9uQ29udGFpbmVyLmNvbnRhaW5zKGVsZW1lbnQpKTtcbn1cblxuZnVuY3Rpb24gc2VhcmNoSW5pdCAoKSB7XG4gIHNlYXJjaEZvcm0gPSBzZWxlY3QoJy5qcy1zZWFyY2gtZm9ybScpWyAwIF07XG4gIHNlYXJjaEJ1dHRvbiA9IHNlbGVjdCgnLmpzLXNlYXJjaC1idXR0b24nKVsgMCBdO1xuICBzZWFyY2hCdXR0b25Db250YWluZXIgPSBzZWxlY3QoJy5qcy1zZWFyY2gtYnV0dG9uLWNvbnRhaW5lcicpWyAwIF07XG5cbiAgaWYgKHNlYXJjaEJ1dHRvbiAmJiBzZWFyY2hGb3JtKSB7XG4gICAgZGlzcGF0Y2goc2VhcmNoQnV0dG9uLCAnY2xpY2sgdG91Y2hzdGFydCcsIHNlYXJjaEJ1dHRvbkNsaWNrSGFuZGxlcik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZWFyY2hJbml0OyIsIi8qKlxuICogRmxpcHMgZ2l2ZW4gSU5QVVQgZWxlbWVudHMgYmV0d2VlbiBtYXNrZWQgKGhpZGluZyB0aGUgZmllbGQgdmFsdWUpIGFuZCB1bm1hc2tlZFxuICogQHBhcmFtIHtBcnJheS5IVE1MRWxlbWVudH0gZmllbGRzIC0gQW4gYXJyYXkgb2YgSU5QVVQgZWxlbWVudHNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gbWFzayAtIFdoZXRoZXIgdGhlIG1hc2sgc2hvdWxkIGJlIGFwcGxpZWQsIGhpZGluZyB0aGUgZmllbGQgdmFsdWVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZmllbGRzLCBtYXNrKSB7XG4gIGZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgIGZpZWxkLnNldEF0dHJpYnV0ZSgnYXV0b2NhcGl0YWxpemUnLCAnb2ZmJyk7XG4gICAgZmllbGQuc2V0QXR0cmlidXRlKCdhdXRvY29ycmVjdCcsICdvZmYnKTtcbiAgICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCBtYXNrID8gJ3Bhc3N3b3JkJyA6ICd0ZXh0Jyk7XG4gIH0pO1xufTtcbiIsInZhciB0b2dnbGVGaWVsZE1hc2sgPSByZXF1aXJlKCcuL3RvZ2dsZS1maWVsZC1tYXNrJyk7XG52YXIgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgZGVjb3JhdGVzIGFuIEhUTUwgZWxlbWVudCB3aXRoIHRoZSBhYmlsaXR5IHRvIHRvZ2dsZSB0aGVcbiAqIG1hc2tlZCBzdGF0ZSBvZiBhbiBpbnB1dCBmaWVsZCAobGlrZSBhIHBhc3N3b3JkKSB3aGVuIGNsaWNrZWQuXG4gKiBUaGUgaWRzIG9mIHRoZSBmaWVsZHMgdG8gYmUgbWFza2VkIHdpbGwgYmUgcHVsbGVkIGRpcmVjdGx5IGZyb20gdGhlIGJ1dHRvbidzXG4gKiBgYXJpYS1jb250cm9sc2AgYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbCAgICBQYXJlbnQgZWxlbWVudCBjb250YWluaW5nIHRoZSBmaWVsZHMgdG8gYmUgbWFza2VkXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHNob3dUZXh0ICAgQnV0dG9uIHRleHQgc2hvd24gd2hlbiBmaWVsZCBpcyBtYXNrZWRcbiAqIEBwYXJhbSAge1N0cmluZ30gaGlkZVRleHQgICBCdXR0b24gdGV4dCBzaG93IHdoZW4gZmllbGQgaXMgdW5tYXNrZWRcbiAqIEByZXR1cm4ge31cbiAqL1xudmFyIHRvZ2dsZUZvcm1JbnB1dCA9IGZ1bmN0aW9uIChlbCwgc2hvd1RleHQsIGhpZGVUZXh0KSB7XG4gIHZhciBkZWZhdWx0U2VsZWN0b3JzID0gZWwuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG5cbiAgaWYgKCFkZWZhdWx0U2VsZWN0b3JzIHx8IGRlZmF1bHRTZWxlY3RvcnMudHJpbSgpLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignRGlkIHlvdSBmb3JnZXQgdG8gZGVmaW5lIHNlbGVjdG9ycyBpbiB0aGUgYXJpYS1jb250cm9scyBhdHRyaWJ1dGU/IENoZWNrIGVsZW1lbnQgJyArIGVsLm91dGVySFRNTCk7XG4gIH1cblxuICB2YXIgZmllbGRTZWxlY3RvciA9IGdldFNlbGVjdG9ycyhkZWZhdWx0U2VsZWN0b3JzKTtcbiAgdmFyIGZvcm1FbGVtZW50ID0gZ2V0Rm9ybVBhcmVudChlbCk7XG4gIGlmICghZm9ybUVsZW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3RvZ2dsZUZvcm1JbnB1dCgpIG5lZWRzIHRoZSBzdXBwbGllZCBlbGVtZW50IHRvIGJlIGluc2lkZSBhIDxmb3JtPi4gQ2hlY2sgZWxlbWVudCAnICsgZWwub3V0ZXJIVE1MKTtcbiAgfVxuICB2YXIgZmllbGRzID0gc2VsZWN0KGZpZWxkU2VsZWN0b3IsIGZvcm1FbGVtZW50KTtcbiAgdmFyIG1hc2tlZCA9IGZhbHNlO1xuXG4gIHZhciB0b2dnbGVDbGlja0xpc3RlbmVyID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICB0b2dnbGVGaWVsZE1hc2soZmllbGRzLCBtYXNrZWQpO1xuICAgIGVsLnRleHRDb250ZW50ID0gbWFza2VkID8gc2hvd1RleHQgOiBoaWRlVGV4dDtcbiAgICBtYXNrZWQgPSAhbWFza2VkO1xuICB9O1xuXG4gIGlmIChlbC5hdHRhY2hFdmVudCkge1xuICAgIGVsLmF0dGFjaEV2ZW50KCdvbmNsaWNrJywgdG9nZ2xlQ2xpY2tMaXN0ZW5lcik7XG4gIH0gZWxzZSB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVDbGlja0xpc3RlbmVyKTtcbiAgfVxufTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gdHVybiBhIHN0cmluZyBvZiBpZHMgaW50byB2YWxpZCBzZWxlY3RvcnNcbiAqIEBwYXJhbSAge1N0cmluZ30gc2VsZWN0b3JzIFNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIGlkcyBvZiBmaWVsZHMgdG8gYmUgbWFza2VkXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAgICBDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBzZWxlY3RvcnNcbiAqL1xuZnVuY3Rpb24gZ2V0U2VsZWN0b3JzIChzZWxlY3RvcnMpIHtcbiAgdmFyIHNlbGVjdG9yc0xpc3QgPSBzZWxlY3RvcnMuc3BsaXQoJyAnKTtcblxuICByZXR1cm4gc2VsZWN0b3JzTGlzdC5tYXAoZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuICcjJyArIHNlbGVjdG9yO1xuICB9KS5qb2luKCcsICcpO1xufVxuXG4vKipcbiAqIFNlYXJjaGVzIHVwIHRoZSB0cmVlIGZyb20gdGhlIGVsZW1lbnQgdG8gZmluZCBhIEZvcm0gZWxlbWVudCwgYW5kIHJldHVybnMgaXQsXG4gKiBvciBudWxsIGlmIG5vIEZvcm0gaXMgZm91bmRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC0gQ2hpbGQgZWxlbWVudCB0byBzdGFydCBzZWFyY2hcbiAqL1xuZnVuY3Rpb24gZ2V0Rm9ybVBhcmVudCAoZWwpIHtcbiAgd2hpbGUgKGVsICYmIGVsLnRhZ05hbWUgIT09ICdGT1JNJykge1xuICAgIGVsID0gZWwucGFyZW50Tm9kZTtcbiAgfVxuICByZXR1cm4gZWw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9nZ2xlRm9ybUlucHV0O1xuIiwidmFyIHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xudmFyIGFkZENsYXNzID0gcmVxdWlyZSgnLi4vdXRpbHMvYWRkLWNsYXNzJyk7XG52YXIgcmVtb3ZlQ2xhc3MgPSByZXF1aXJlKCcuLi91dGlscy9yZW1vdmUtY2xhc3MnKTtcbnZhciBkaXNwYXRjaCA9IHJlcXVpcmUoJy4uL3V0aWxzL2Rpc3BhdGNoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdmFsaWRhdG9yIChlbCkge1xuICB2YXIgZGF0YSA9IGdldERhdGEoZWwpLFxuICAgIGtleSxcbiAgICB2YWxpZGF0b3JOYW1lLFxuICAgIHZhbGlkYXRvclBhdHRlcm4sXG4gICAgdmFsaWRhdG9yQ2hlY2tib3gsXG4gICAgY2hlY2tMaXN0ID0gc2VsZWN0KGRhdGEudmFsaWRhdGlvbmVsZW1lbnQpWyAwIF07XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGUgKCkge1xuICAgIGZvciAoa2V5IGluIGRhdGEpIHtcbiAgICAgIGlmIChrZXkuc3RhcnRzV2l0aCgndmFsaWRhdGUnKSkge1xuICAgICAgICB2YWxpZGF0b3JOYW1lID0ga2V5LnNwbGl0KCd2YWxpZGF0ZScpWyAxIF07XG4gICAgICAgIHZhbGlkYXRvclBhdHRlcm4gPSBuZXcgUmVnRXhwKGRhdGFbIGtleSBdKTtcbiAgICAgICAgdmFsaWRhdG9yU2VsZWN0b3IgPSAnW2RhdGEtdmFsaWRhdG9yPScgKyB2YWxpZGF0b3JOYW1lICsgJ10nO1xuICAgICAgICB2YWxpZGF0b3JDaGVja2JveCA9IHNlbGVjdCh2YWxpZGF0b3JTZWxlY3RvciwgY2hlY2tMaXN0KVsgMCBdO1xuXG4gICAgICAgIGlmICghdmFsaWRhdG9yUGF0dGVybi50ZXN0KGVsLnZhbHVlKSkge1xuICAgICAgICAgIHJlbW92ZUNsYXNzKHZhbGlkYXRvckNoZWNrYm94LCAndXNhLWNoZWNrbGlzdC1jaGVja2VkJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgYWRkQ2xhc3ModmFsaWRhdG9yQ2hlY2tib3gsICd1c2EtY2hlY2tsaXN0LWNoZWNrZWQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRpc3BhdGNoKGVsLCAna2V5dXAnLCB2YWxpZGF0ZSk7XG59O1xuXG4vKipcbiAqIEV4dHJhY3RzIGF0dHJpYnV0ZXMgbmFtZWQgd2l0aCB0aGUgcGF0dGVybiBcImRhdGEtW05BTUVdXCIgZnJvbSBhIGdpdmVuXG4gKiBIVE1MRWxlbWVudCwgdGhlbiByZXR1cm5zIGFuIG9iamVjdCBwb3B1bGF0ZWQgd2l0aCB0aGUgTkFNRS92YWx1ZSBwYWlycy5cbiAqIEFueSBoeXBoZW5zIGluIE5BTUUgYXJlIHJlbW92ZWQuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5cbmZ1bmN0aW9uIGdldERhdGEgKGVsKSB7XG4gIGlmICghZWwuaGFzQXR0cmlidXRlcygpKSByZXR1cm47XG4gIHZhciBkYXRhID0ge307XG4gIHZhciBhdHRycyA9IGVsLmF0dHJpYnV0ZXM7XG4gIGZvciAodmFyIGkgPSBhdHRycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHZhciBtYXRjaGVzID0gYXR0cnNbIGkgXS5uYW1lLm1hdGNoKC9kYXRhLSguKikvaSk7XG4gICAgaWYgKG1hdGNoZXMgJiYgbWF0Y2hlc1sgMSBdKSB7XG4gICAgICB2YXIgbmFtZSA9IG1hdGNoZXNbIDEgXS5yZXBsYWNlKC8tLywgJycpO1xuICAgICAgZGF0YVsgbmFtZSBdID0gYXR0cnNbIGkgXS52YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRhdGE7XG59XG4iLCJ2YXIgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG52YXIgd2hlbkRPTVJlYWR5ID0gcmVxdWlyZSgnLi4vdXRpbHMvd2hlbi1kb20tcmVhZHknKTtcbnZhciBBY2NvcmRpb24gPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2FjY29yZGlvbicpO1xuXG53aGVuRE9NUmVhZHkoZnVuY3Rpb24gaW5pdEFjY29yZGlvbnMgKCkge1xuXG4gIHZhciBhY2NvcmRpb25zID0gc2VsZWN0KCcudXNhLWFjY29yZGlvbiwgLnVzYS1hY2NvcmRpb24tYm9yZGVyZWQnKTtcbiAgYWNjb3JkaW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgIG5ldyBBY2NvcmRpb24oZWwpO1xuICB9KTtcbn0pO1xuIiwidmFyIHdoZW5ET01SZWFkeSA9IHJlcXVpcmUoJy4uL3V0aWxzL3doZW4tZG9tLXJlYWR5Jyk7XG52YXIgYmFubmVySW5pdCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvYmFubmVyJyk7XG5cbndoZW5ET01SZWFkeShmdW5jdGlvbiAoKSB7XG5cbiAgYmFubmVySW5pdCgpO1xuXG59KTtcblxuIiwidmFyIGRlYm91bmNlID0gcmVxdWlyZSgnbG9kYXNoLmRlYm91bmNlJyk7XG52YXIgd2hlbkRPTVJlYWR5ID0gcmVxdWlyZSgnLi4vdXRpbHMvd2hlbi1kb20tcmVhZHknKTtcbnZhciBkaXNwYXRjaCA9IHJlcXVpcmUoJy4uL3V0aWxzL2Rpc3BhdGNoJyk7XG52YXIgZm9vdGVyQWNjb3JkaW9uID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9mb290ZXInKTtcblxud2hlbkRPTVJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICBmb290ZXJBY2NvcmRpb24oKTtcblxuICBkaXNwYXRjaCh3aW5kb3csICdyZXNpemUnLCBkZWJvdW5jZShmb290ZXJBY2NvcmRpb24sIDE4MCkpO1xuXG59KTtcbiIsInZhciB3aGVuRE9NUmVhZHkgPSByZXF1aXJlKCcuLi91dGlscy93aGVuLWRvbS1yZWFkeScpO1xudmFyIHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xudmFyIHZhbGlkYXRvciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvdmFsaWRhdG9yJyk7XG52YXIgdG9nZ2xlRm9ybUlucHV0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy90b2dnbGUtZm9ybS1pbnB1dCcpO1xuXG53aGVuRE9NUmVhZHkoZnVuY3Rpb24gKCkge1xuICB2YXIgZWxTaG93UGFzc3dvcmQgPSBzZWxlY3QoJy51c2Etc2hvd19wYXNzd29yZCcpWyAwIF07XG4gIHZhciBlbEZvcm1JbnB1dCA9IHNlbGVjdCgnLnVzYS1zaG93X211bHRpcGFzc3dvcmQnKVsgMCBdO1xuICB2YXIgZWxWYWxpZGF0b3IgPSBzZWxlY3QoJy5qcy12YWxpZGF0ZV9wYXNzd29yZCcpWyAwIF07XG5cbiAgZWxTaG93UGFzc3dvcmQgJiYgdG9nZ2xlRm9ybUlucHV0KGVsU2hvd1Bhc3N3b3JkLCAnU2hvdyBQYXNzd29yZCcsICdIaWRlIFBhc3N3b3JkJyk7XG4gIGVsRm9ybUlucHV0ICYmIHRvZ2dsZUZvcm1JbnB1dChlbEZvcm1JbnB1dCwgJ1Nob3cgbXkgdHlwaW5nJywgJ0hpZGUgbXkgdHlwaW5nJyk7XG4gIGVsVmFsaWRhdG9yICYmIHZhbGlkYXRvcihlbFZhbGlkYXRvcik7XG59KTtcblxuIiwidmFyIHdoZW5ET01SZWFkeSA9IHJlcXVpcmUoJy4uL3V0aWxzL3doZW4tZG9tLXJlYWR5Jyk7XG52YXIgc2VhcmNoSW5pdCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvaGVhZGVyL3NlYXJjaCcpO1xudmFyIG1vYmlsZUluaXQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2hlYWRlci9tb2JpbGUnKTtcblxud2hlbkRPTVJlYWR5KGZ1bmN0aW9uIGluaXRIZWFkZXJzICgpIHtcblxuICAvLyBTZWFyY2ggVG9nZ2xlXG4gIHNlYXJjaEluaXQoKTtcblxuICAvLyBNb2JpbGUgTmF2aWdhdGlvblxuICBtb2JpbGVJbml0KCk7XG5cbn0pO1xuXG4iLCJ2YXIgdmVyaWZ5alF1ZXJ5ID0gcmVxdWlyZSgnLi4vdXRpbHMvdmVyaWZ5LWpxdWVyeScpO1xuXG4vLyBqUXVlcnkgUGx1Z2luXG5cbmlmICh2ZXJpZnlqUXVlcnkod2luZG93KSkge1xuXG4gIHZhciAkID0gd2luZG93LmpRdWVyeTtcblxuICAvLyBSRUFETUU6IFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgcG9saXRlc3BhY2UgZG9lc24ndCBwcm9wZXJseSBleHBvcnQgYW55dGhpbmdcbiAgLy8gaW4gaXRzIHBhY2thZ2UuanNvbi4gVE9ETzogTGV0J3Mgb3BlbiBhIFBSIHJlbGF0ZWQgdG8gdGhpcyBzbyB3ZSBjYW4gZml4IGl0IGluIFBvbGl0ZXNwYWNlLmpzXG4gIC8vXG4gIHZhciBQb2xpdGVzcGFjZSA9IHJlcXVpcmUoJy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb2xpdGVzcGFjZS9zcmMvcG9saXRlc3BhY2UnKS5Qb2xpdGVzcGFjZTtcblxuICB2YXIgY29tcG9uZW50TmFtZSA9ICdwb2xpdGVzcGFjZScsXG4gICAgZW5oYW5jZWRBdHRyID0gJ2RhdGEtZW5oYW5jZWQnLFxuICAgIGluaXRTZWxlY3RvciA9ICdbZGF0YS1cIiArIGNvbXBvbmVudE5hbWUgKyBcIl06bm90KFtcIiArIGVuaGFuY2VkQXR0ciArIFwiXSknO1xuXG4gICQuZm5bIGNvbXBvbmVudE5hbWUgXSA9IGZ1bmN0aW9uICgpe1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCl7XG4gICAgICB2YXIgcG9saXRlID0gbmV3IFBvbGl0ZXNwYWNlKHRoaXMpO1xuICAgICAgaWYocG9saXRlLnR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHBvbGl0ZS5jcmVhdGVQcm94eSgpO1xuICAgICAgfVxuXG4gICAgICAkKHRoaXMpXG4gICAgICAgIC5iaW5kKCdpbnB1dCBrZXlkb3duJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHBvbGl0ZS51cGRhdGVQcm94eSgpO1xuICAgICAgICB9KVxuICAgICAgICAuYmluZCgnYmx1cicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5wb2xpdGVzcGFjZS1wcm94eScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICBwb2xpdGUudXBkYXRlKCk7XG4gICAgICAgICAgcG9saXRlLnVwZGF0ZVByb3h5KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5iaW5kKCdmb2N1cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5wb2xpdGVzcGFjZS1wcm94eScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICBwb2xpdGUucmVzZXQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmRhdGEoY29tcG9uZW50TmFtZSwgcG9saXRlKTtcblxuICAgICAgcG9saXRlLnVwZGF0ZSgpO1xuICAgIH0pO1xuICB9O1xuXG5cdC8vIGF1dG8taW5pdCBvbiBlbmhhbmNlICh3aGljaCBpcyBjYWxsZWQgb24gZG9tcmVhZHkpXG4gICQoZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLScgKyBjb21wb25lbnROYW1lICsgJ10nKS5wb2xpdGVzcGFjZSgpO1xuICB9KTtcblxufVxuIiwiLyoqXG4gKiBUaGlzIGZpbGUgZGVmaW5lcyBrZXkgRUNNQVNjcmlwdCA1IG1ldGhvZHMgdGhhdCBhcmUgdXNlZCBieSB0aGUgU3RhbmRhcmRzXG4gKiBidXQgbWF5IGJlIG1pc3NpbmcgaW4gb2xkZXIgYnJvd3NlcnMuXG4gKi9cblxuLyoqXG4gKiBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCgpXG4gKiBUYWtlbiBmcm9tIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2ZvckVhY2hcbiAqL1xuXG4vLyBQcm9kdWN0aW9uIHN0ZXBzIG9mIEVDTUEtMjYyLCBFZGl0aW9uIDUsIDE1LjQuNC4xOFxuLy8gUmVmZXJlbmNlOiBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjQuNC4xOFxuaWYgKCFBcnJheS5wcm90b3R5cGUuZm9yRWFjaCkge1xuXG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG5cbiAgICB2YXIgVCwgaztcblxuICAgIGlmICh0aGlzID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcgdGhpcyBpcyBudWxsIG9yIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuXG4gICAgLy8gMS4gTGV0IE8gYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRvT2JqZWN0KCkgcGFzc2luZyB0aGVcbiAgICAvLyB8dGhpc3wgdmFsdWUgYXMgdGhlIGFyZ3VtZW50LlxuICAgIHZhciBPID0gT2JqZWN0KHRoaXMpO1xuXG4gICAgLy8gMi4gTGV0IGxlblZhbHVlIGJlIHRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGUgR2V0KCkgaW50ZXJuYWxcbiAgICAvLyBtZXRob2Qgb2YgTyB3aXRoIHRoZSBhcmd1bWVudCBcImxlbmd0aFwiLlxuICAgIC8vIDMuIExldCBsZW4gYmUgdG9VaW50MzIobGVuVmFsdWUpLlxuICAgIHZhciBsZW4gPSBPLmxlbmd0aCA+Pj4gMDtcblxuICAgIC8vIDQuIElmIGlzQ2FsbGFibGUoY2FsbGJhY2spIGlzIGZhbHNlLCB0aHJvdyBhIFR5cGVFcnJvciBleGNlcHRpb24uIFxuICAgIC8vIFNlZTogaHR0cDovL2VzNS5naXRodWIuY29tLyN4OS4xMVxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoY2FsbGJhY2sgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgLy8gNS4gSWYgdGhpc0FyZyB3YXMgc3VwcGxpZWQsIGxldCBUIGJlIHRoaXNBcmc7IGVsc2UgbGV0XG4gICAgLy8gVCBiZSB1bmRlZmluZWQuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICBUID0gdGhpc0FyZztcbiAgICB9XG5cbiAgICAvLyA2LiBMZXQgayBiZSAwXG4gICAgayA9IDA7XG5cbiAgICAvLyA3LiBSZXBlYXQsIHdoaWxlIGsgPCBsZW5cbiAgICB3aGlsZSAoayA8IGxlbikge1xuXG4gICAgICB2YXIga1ZhbHVlO1xuXG4gICAgICAvLyBhLiBMZXQgUGsgYmUgVG9TdHJpbmcoaykuXG4gICAgICAvLyAgICBUaGlzIGlzIGltcGxpY2l0IGZvciBMSFMgb3BlcmFuZHMgb2YgdGhlIGluIG9wZXJhdG9yXG4gICAgICAvLyBiLiBMZXQga1ByZXNlbnQgYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBIYXNQcm9wZXJ0eVxuICAgICAgLy8gICAgaW50ZXJuYWwgbWV0aG9kIG9mIE8gd2l0aCBhcmd1bWVudCBQay5cbiAgICAgIC8vICAgIFRoaXMgc3RlcCBjYW4gYmUgY29tYmluZWQgd2l0aCBjXG4gICAgICAvLyBjLiBJZiBrUHJlc2VudCBpcyB0cnVlLCB0aGVuXG4gICAgICBpZiAoayBpbiBPKSB7XG5cbiAgICAgICAgLy8gaS4gTGV0IGtWYWx1ZSBiZSB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIEdldCBpbnRlcm5hbFxuICAgICAgICAvLyBtZXRob2Qgb2YgTyB3aXRoIGFyZ3VtZW50IFBrLlxuICAgICAgICBrVmFsdWUgPSBPWyBrIF07XG5cbiAgICAgICAgLy8gaWkuIENhbGwgdGhlIENhbGwgaW50ZXJuYWwgbWV0aG9kIG9mIGNhbGxiYWNrIHdpdGggVCBhc1xuICAgICAgICAvLyB0aGUgdGhpcyB2YWx1ZSBhbmQgYXJndW1lbnQgbGlzdCBjb250YWluaW5nIGtWYWx1ZSwgaywgYW5kIE8uXG4gICAgICAgIGNhbGxiYWNrLmNhbGwoVCwga1ZhbHVlLCBrLCBPKTtcbiAgICAgIH1cbiAgICAgIC8vIGQuIEluY3JlYXNlIGsgYnkgMS5cbiAgICAgIGsrKztcbiAgICB9XG4gICAgLy8gOC4gcmV0dXJuIHVuZGVmaW5lZFxuICB9O1xufVxuXG5cbi8qKlxuICogRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQoKVxuICogVGFrZW4gZnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9GdW5jdGlvbi9iaW5kXG4gKi9cblxuLy8gUmVmZXJlbmNlOiBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjMuNC41XG5pZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSB7XG5cbiAgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAob1RoaXMpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIGNsb3Nlc3QgdGhpbmcgcG9zc2libGUgdG8gdGhlIEVDTUFTY3JpcHQgNVxuICAgICAgLy8gaW50ZXJuYWwgSXNDYWxsYWJsZSBmdW5jdGlvblxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgLSB3aGF0IGlzIHRyeWluZyB0byBiZSBib3VuZCBpcyBub3QgY2FsbGFibGUnKTtcbiAgICB9XG5cbiAgICB2YXIgYUFyZ3MgICA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICBmVG9CaW5kID0gdGhpcyxcbiAgICAgIGZOT1AgICAgPSBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIGZCb3VuZCAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmVG9CaW5kLmFwcGx5KHRoaXMgaW5zdGFuY2VvZiBmTk9QID8gdGhpcyA6IG9UaGlzLFxuICAgICAgICAgICAgICAgIGFBcmdzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICB9O1xuXG4gICAgaWYgKHRoaXMucHJvdG90eXBlKSB7XG4gICAgICAvLyBGdW5jdGlvbi5wcm90b3R5cGUgZG9lc24ndCBoYXZlIGEgcHJvdG90eXBlIHByb3BlcnR5XG4gICAgICBmTk9QLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlOyBcbiAgICB9XG4gICAgZkJvdW5kLnByb3RvdHlwZSA9IG5ldyBmTk9QKCk7XG5cbiAgICByZXR1cm4gZkJvdW5kO1xuICB9O1xuXG59XG4iLCJ2YXIgZGlzcGF0Y2ggPSByZXF1aXJlKCcuLi91dGlscy9kaXNwYXRjaCcpO1xudmFyIHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xudmFyIHdoZW5ET01SZWFkeSA9IHJlcXVpcmUoJy4uL3V0aWxzL3doZW4tZG9tLXJlYWR5Jyk7XG5cbndoZW5ET01SZWFkeShmdW5jdGlvbiAoKSB7XG5cbiAgLy8gRml4aW5nIHNraXAgbmF2IGZvY3VzIGJlaGF2aW9yIGluIGNocm9tZVxuICB2YXIgZWxTa2lwbmF2ID0gc2VsZWN0KCcuc2tpcG5hdicpWyAwIF07XG4gIHZhciBlbE1haW5Db250ZW50ID0gc2VsZWN0KCcjbWFpbi1jb250ZW50JylbIDAgXTtcblxuICBpZiAoZWxTa2lwbmF2KSB7XG4gICAgZGlzcGF0Y2goZWxTa2lwbmF2LCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBlbE1haW5Db250ZW50LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKGVsTWFpbkNvbnRlbnQpIHtcbiAgICBkaXNwYXRjaChlbE1haW5Db250ZW50LCAnYmx1cicsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGVsTWFpbkNvbnRlbnQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xuICAgIH0pO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBUaGUgJ3BvbHlmaWxscycgZmlsZSBkZWZpbmVzIGtleSBFQ01BU2NyaXB0IDUgbWV0aG9kcyB0aGF0IG1heSBiZVxuICogbWlzc2luZyBmcm9tIG9sZGVyIGJyb3dzZXJzLCBzbyBtdXN0IGJlIGxvYWRlZCBmaXJzdC5cbiAqL1xucmVxdWlyZSgnLi9pbml0aWFsaXplcnMvcG9seWZpbGxzJyk7XG5yZXF1aXJlKCcuL2luaXRpYWxpemVycy9oZWFkZXInKTtcbnJlcXVpcmUoJy4vaW5pdGlhbGl6ZXJzL2FjY29yZGlvbnMnKTtcbnJlcXVpcmUoJy4vaW5pdGlhbGl6ZXJzL2Zvb3RlcicpO1xucmVxdWlyZSgnLi9pbml0aWFsaXplcnMvc2tpcC1uYXYnKTtcbnJlcXVpcmUoJy4vaW5pdGlhbGl6ZXJzL2Zvcm1zJyk7XG5yZXF1aXJlKCcuL2luaXRpYWxpemVycy9wb2xpdGVzcGFjZScpO1xucmVxdWlyZSgnLi9pbml0aWFsaXplcnMvYmFubmVyJyk7XG4iLCIvKipcbiAqIEFkZHMgYSBjbGFzcyB0byBhIGdpdmVuIEhUTUwgZWxlbWVudC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBUaGUgZWxlbWVudCB0byB3aGljaCB0aGUgY2xhc3Mgd2lsbCBiZSBhZGRlZFxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjbGFzcyB0byBhZGRcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFkZENsYXNzIChlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICB9XG59OyIsIi8qKlxuICogQXR0YWNoZXMgYSBnaXZlbiBsaXN0ZW5lciBmdW5jdGlvbiB0byBhIGdpdmVuIGVsZW1lbnQgd2hpY2ggaXNcbiAqIHRyaWdnZXJlZCBieSBhIHNwZWNpZmllZCBsaXN0IG9mIGV2ZW50IHR5cGVzLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIHRoZSBlbGVtZW50IHRvIHdoaWNoIHRoZSBsaXN0ZW5lciB3aWxsIGJlIGF0dGFjaGVkXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRUeXBlcyAtIHNwYWNlLXNlcGFyYXRlZCBsaXN0IG9mIGV2ZW50IHR5cGVzIHdoaWNoIHdpbGwgdHJpZ2dlciB0aGUgbGlzdGVuZXJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0gdGhlIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSAtIGNvbnRhaW5pbmcgYSA8dHQ+dHJpZ2dlcigpPC90dD4gbWV0aG9kIGZvciBleGVjdXRpbmcgdGhlIGxpc3RlbmVyLCBhbmQgYW4gPHR0Pm9mZigpPC90dD4gbWV0aG9kIGZvciBkZXRhY2hpbmcgaXRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaCAoZWxlbWVudCwgZXZlbnRUeXBlcywgbGlzdGVuZXIsIG9wdGlvbnMpIHtcbiAgdmFyIGV2ZW50VHlwZUFycmF5ID0gZXZlbnRUeXBlcy5zcGxpdCgvXFxzKy8pO1xuXG4gIHZhciBhdHRhY2ggPSBmdW5jdGlvbiAoZSwgdCwgZCkge1xuICAgIGlmIChlLmF0dGFjaEV2ZW50KSB7XG4gICAgICBlLmF0dGFjaEV2ZW50KCdvbicgKyB0LCBkLCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKGUuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgZS5hZGRFdmVudExpc3RlbmVyKHQsIGQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgdHJpZ2dlciA9IGZ1bmN0aW9uIChlLCB0KSB7XG4gICAgdmFyIGZha2VFdmVudDtcbiAgICBpZiAoJ2NyZWF0ZUV2ZW50JyBpbiBkb2N1bWVudCkge1xuICAgICAgLy8gbW9kZXJuIGJyb3dzZXJzLCBJRTkrXG4gICAgICBmYWtlRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgZmFrZUV2ZW50LmluaXRFdmVudCh0LCBmYWxzZSwgdHJ1ZSk7XG4gICAgICBlLmRpc3BhdGNoRXZlbnQoZmFrZUV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSUUgOFxuICAgICAgZmFrZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgICAgIGZha2VFdmVudC5ldmVudFR5cGUgPSB0O1xuICAgICAgZS5maXJlRXZlbnQoJ29uJytlLmV2ZW50VHlwZSwgZmFrZUV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGRldGFjaCA9IGZ1bmN0aW9uIChlLCB0LCBkKSB7XG4gICAgaWYgKGUuZGV0YWNoRXZlbnQpIHtcbiAgICAgIGUuZGV0YWNoRXZlbnQoJ29uJyArIHQsIGQsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoZS5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICBlLnJlbW92ZUV2ZW50TGlzdGVuZXIodCwgZCwgb3B0aW9ucyk7XG4gICAgfVxuICB9O1xuXG4gIGV2ZW50VHlwZUFycmF5LmZvckVhY2goZnVuY3Rpb24gKGV2ZW50VHlwZSkge1xuICAgIGF0dGFjaC5jYWxsKG51bGwsIGVsZW1lbnQsIGV2ZW50VHlwZSwgbGlzdGVuZXIpO1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIHRyaWdnZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRyaWdnZXIuY2FsbChudWxsLCBlbGVtZW50LCBldmVudFR5cGVBcnJheVsgMCBdKTtcbiAgICB9LFxuICAgIG9mZjogZnVuY3Rpb24gKCkge1xuICAgICAgZXZlbnRUeXBlQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnRUeXBlKSB7XG4gICAgICAgIGRldGFjaC5jYWxsKG51bGwsIGVsZW1lbnQsIGV2ZW50VHlwZSwgbGlzdGVuZXIpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfTtcbn07XG4iLCIvKipcbiAqIFJlbW92ZXMgYSBjbGFzcyBmcm9tIGEgZ2l2ZW4gSFRNTCBlbGVtZW50ZW1lbnQuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gVGhlIGVsZW1lbnQgZnJvbSB3aGljaCB0aGUgY2xhc3Mgd2lsbCBiZSByZW1vdmVkXG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNsYXNzIHRvIHJlbW92ZVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVtb3ZlQ2xhc3MgKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICB2YXIgY2xhc3NMaXN0ID0gZWxlbWVudC5jbGFzc0xpc3Q7XG5cbiAgaWYgKGNsYXNzTGlzdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICB9XG4gIGVsc2VcbiAge1xuICAgIGNsYXNzTGlzdCA9IGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KC9cXHMrLyk7XG4gICAgdmFyIG5ld0NsYXNzTGlzdCA9IFtdO1xuICAgIGNsYXNzTGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICBpZiAoYyAhPT0gY2xhc3NOYW1lKSB7XG4gICAgICAgIG5ld0NsYXNzTGlzdC5wdXNoKGMpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gbmV3Q2xhc3NMaXN0LmpvaW4oJyAnKTtcbiAgfVxufTtcbiIsIi8qKlxuICogQG5hbWUgc2VsZWN0XG4gKiBAZGVzYyBzZWxlY3RzIGVsZW1lbnRzIGZyb20gdGhlIERPTSBieSBjbGFzcyBzZWxlY3RvciBvciBJRCBzZWxlY3Rvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciAtIFRoZSBzZWxlY3RvciB0byB0cmF2ZXJzZSB0aGUgRE9NIHdpdGguXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250ZXh0IC0gVGhlIGNvbnRleHQgdG8gdHJhdmVyc2UgdGhlIERPTSBpbi5cbiAqIEByZXR1cm4ge0FycmF5LkhUTUxFbGVtZW50fSAtIEFuIGFycmF5IG9mIERPTSBub2RlcyBvciBhbiBlbXB0eSBhcnJheS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZWxlY3QgKHNlbGVjdG9yLCBjb250ZXh0KSB7XG5cbiAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBpZiAoKGNvbnRleHQgPT09IHVuZGVmaW5lZCkgfHwgIWlzRWxlbWVudChjb250ZXh0KSkge1xuICAgIGNvbnRleHQgPSB3aW5kb3cuZG9jdW1lbnQ7XG4gIH1cblxuICB2YXIgc2VsZWN0aW9uID0gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblxuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoc2VsZWN0aW9uKTtcblxufTtcblxuZnVuY3Rpb24gaXNFbGVtZW50ICh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLm5vZGVUeXBlID09PSAxO1xufSIsIi8qXG4gKiBAbmFtZSB2ZXJpZnlqUXVlcnlcbiAqIEBkZXNjIFRlc3RzIHRoZSBnaXZlbiBob3N0IG9iamVjdCBmb3IgdGhlIHByZXNlbmNlIG9mIGpRdWVyeS4gSWYgbm9cbiAqICAgICAgIG9iamVjdCBpcyBnaXZlbiwgdGhlIDx0dD53aW5kb3c8L3R0PiBvYmplY3QgaXMgdXNlZC5cbiAqIEBwYXJhbSB7b2JqZWN0fSB3IC0gT2JqZWN0IHRvIHRlc3QgZm9yIGpRdWVyeS5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgalF1ZXJ5IGV4aXN0cyBvbiB0aGUgb2JqZWN0LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHZlcmlmeWpRdWVyeSAodykge1xuICB3ID0gdyB8fCB3aW5kb3c7XG4gIHJldHVybiAhISh3LmpRdWVyeSAmJiB3LmpRdWVyeS5mbiAmJiB3LmpRdWVyeS5mbi5qcXVlcnkpO1xufTsiLCIvKlxuICogQG5hbWUgRE9NTG9hZGVkXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYiAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBydW4gd2hlbiB0aGUgRE9NIGhhcyBsb2FkZWQuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gRE9NTG9hZGVkIChjYikge1xuICAvLyBpbiBjYXNlIHRoZSBkb2N1bWVudCBpcyBhbHJlYWR5IHJlbmRlcmVkXG4gIGlmICgnbG9hZGluZycgIT09IGRvY3VtZW50LnJlYWR5U3RhdGUpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihjYikpIHtcbiAgICAgIGNiKCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHsgLy8gbW9kZXJuIGJyb3dzZXJzXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGNiKTtcbiAgfSBlbHNlIHsgLy8gSUUgPD0gOFxuICAgIGRvY3VtZW50LmF0dGFjaEV2ZW50KCdvbnJlYWR5c3RhdGVjaGFuZ2UnLCBmdW5jdGlvbiAoKXtcbiAgICAgIGlmICgnY29tcGxldGUnID09PSBkb2N1bWVudC5yZWFkeVN0YXRlKSB7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKGNiKSkge1xuICAgICAgICAgIGNiKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbiAoYXJnKSB7XG4gIHJldHVybiAodHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJyk7XG59Il19
