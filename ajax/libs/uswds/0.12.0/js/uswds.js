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

},{"../utils/select":21}],4:[function(require,module,exports){
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

},{"../utils/add-class":18,"../utils/dispatch":19,"../utils/remove-class":20,"../utils/select":21}],5:[function(require,module,exports){
var select = require('../../utils/select');
var addClass = require('../../utils/add-class');
var removeClass = require('../../utils/remove-class');
var dispatch = require('../../utils/dispatch');

var navElements = select('.usa-menu-btn, .usa-overlay, .usa-nav-close');
var toggleElements = select('.usa-overlay, .usa-nav');
var navCloseElement = select('.usa-nav-close')[ 0 ];

navElements.forEach(function (element) {
  dispatch(element, 'click touchstart', function (e) {
    toggleElements.forEach(function (element) {
      toggleClass(element, 'is-visible');
    });
    toggleClass(document.body, 'usa-mobile_nav-active');
    navCloseElement.focus();
    return false;
  });
});

function toggleClass (element, className) {
  if (element.classList) {
    element.classList.toggle(className);
  }
}

},{"../../utils/add-class":18,"../../utils/dispatch":19,"../../utils/remove-class":20,"../../utils/select":21}],6:[function(require,module,exports){
var select = require('../../utils/select');
var addClass = require('../../utils/add-class');
var removeClass = require('../../utils/remove-class');
var dispatch = require('../../utils/dispatch');

var searchForm = select('.js-search-form')[ 0 ];
var searchButton = select('.js-search-button')[ 0 ];
var searchButtonContainer = select('.js-search-button-container')[ 0 ];
var searchDispatcher;

if (searchButton && searchForm) {
  dispatch(searchButton, 'click touchstart', searchButtonClickHandler);
}

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

},{"../../utils/add-class":18,"../../utils/dispatch":19,"../../utils/remove-class":20,"../../utils/select":21}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"../utils/select":21,"./toggle-field-mask":7}],9:[function(require,module,exports){
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

},{"../utils/add-class":18,"../utils/dispatch":19,"../utils/remove-class":20,"../utils/select":21}],10:[function(require,module,exports){
var select = require('../utils/select');
var whenDOMReady = require('../utils/when-dom-ready');
var Accordion = require('../components/accordion');

whenDOMReady(function initAccordions () {

  var accordions = select('.usa-accordion, .usa-accordion-bordered');
  accordions.forEach(function (el) {
    new Accordion(el);
  });
});

},{"../components/accordion":3,"../utils/select":21,"../utils/when-dom-ready":23}],11:[function(require,module,exports){
var debounce = require('lodash.debounce');
var whenDOMReady = require('../utils/when-dom-ready');
var dispatch = require('../utils/dispatch');
var footerAccordion = require('../components/footer');

whenDOMReady(function () {

  footerAccordion();

  dispatch(window, 'resize', debounce(footerAccordion, 180));

});

},{"../components/footer":4,"../utils/dispatch":19,"../utils/when-dom-ready":23,"lodash.debounce":1}],12:[function(require,module,exports){
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


},{"../components/toggle-form-input":8,"../components/validator":9,"../utils/select":21,"../utils/when-dom-ready":23}],13:[function(require,module,exports){
var whenDOMReady = require('../utils/when-dom-ready');

whenDOMReady(function initHeaders () {

  // Search Toggle
  require('../components/header/search');

  // Mobile Navigation
  require('../components/header/mobile');

});


},{"../components/header/mobile":5,"../components/header/search":6,"../utils/when-dom-ready":23}],14:[function(require,module,exports){
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

},{"../../../node_modules/politespace/src/politespace":2,"../utils/verify-jquery":22}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{"../utils/dispatch":19,"../utils/select":21,"../utils/when-dom-ready":23}],17:[function(require,module,exports){
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

},{"./initializers/accordions":10,"./initializers/footer":11,"./initializers/forms":12,"./initializers/header":13,"./initializers/politespace":14,"./initializers/polyfills":15,"./initializers/skip-nav":16}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
/**
 * Attaches a given listener function to a given element which is
 * triggered by a specified list of event types.
 * @param {HTMLElement} element - the element to which the listener will be attached
 * @param {String} eventTypes - space-separated list of event types which will trigger the listener
 * @param {Function} listener - the function to be executed
 * @returns {Object} - containing a <tt>trigger()</tt> method for executing the listener, and an <tt>off()</tt> method for detaching it
 */
module.exports = function dispatch (element, eventTypes, listener) {
  var eventTypeArray = eventTypes.split(/\s+/);

  var attach = function (e, t, d) {
    if (e.attachEvent) {
      e.attachEvent('on' + t, d);
    }
    if (e.addEventListener) {
      e.addEventListener(t, d);
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
      e.detachEvent('on' + t, d);
    }
    if (e.removeEventListener) {
      e.removeEventListener(t, d);
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

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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
},{}],22:[function(require,module,exports){
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
},{}]},{},[17])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmRlYm91bmNlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3BvbGl0ZXNwYWNlL3NyYy9wb2xpdGVzcGFjZS5qcyIsInNyYy9qcy9jb21wb25lbnRzL2FjY29yZGlvbi5qcyIsInNyYy9qcy9jb21wb25lbnRzL2Zvb3Rlci5qcyIsInNyYy9qcy9jb21wb25lbnRzL2hlYWRlci9tb2JpbGUuanMiLCJzcmMvanMvY29tcG9uZW50cy9oZWFkZXIvc2VhcmNoLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvdG9nZ2xlLWZpZWxkLW1hc2suanMiLCJzcmMvanMvY29tcG9uZW50cy90b2dnbGUtZm9ybS1pbnB1dC5qcyIsInNyYy9qcy9jb21wb25lbnRzL3ZhbGlkYXRvci5qcyIsInNyYy9qcy9pbml0aWFsaXplcnMvYWNjb3JkaW9ucy5qcyIsInNyYy9qcy9pbml0aWFsaXplcnMvZm9vdGVyLmpzIiwic3JjL2pzL2luaXRpYWxpemVycy9mb3Jtcy5qcyIsInNyYy9qcy9pbml0aWFsaXplcnMvaGVhZGVyLmpzIiwic3JjL2pzL2luaXRpYWxpemVycy9wb2xpdGVzcGFjZS5qcyIsInNyYy9qcy9pbml0aWFsaXplcnMvcG9seWZpbGxzLmpzIiwic3JjL2pzL2luaXRpYWxpemVycy9za2lwLW5hdi5qcyIsInNyYy9qcy9zdGFydC5qcyIsInNyYy9qcy91dGlscy9hZGQtY2xhc3MuanMiLCJzcmMvanMvdXRpbHMvZGlzcGF0Y2guanMiLCJzcmMvanMvdXRpbHMvcmVtb3ZlLWNsYXNzLmpzIiwic3JjL2pzL3V0aWxzL3NlbGVjdC5qcyIsInNyYy9qcy91dGlscy92ZXJpZnktanF1ZXJ5LmpzIiwic3JjL2pzL3V0aWxzL3doZW4tZG9tLXJlYWR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3pYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTkFOID0gMCAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXgsXG4gICAgbmF0aXZlTWluID0gTWF0aC5taW47XG5cbi8qKlxuICogR2V0cyB0aGUgdGltZXN0YW1wIG9mIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgaGF2ZSBlbGFwc2VkIHNpbmNlXG4gKiB0aGUgVW5peCBlcG9jaCAoMSBKYW51YXJ5IDE5NzAgMDA6MDA6MDAgVVRDKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgRGF0ZVxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgdGltZXN0YW1wLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlZmVyKGZ1bmN0aW9uKHN0YW1wKSB7XG4gKiAgIGNvbnNvbGUubG9nKF8ubm93KCkgLSBzdGFtcCk7XG4gKiB9LCBfLm5vdygpKTtcbiAqIC8vID0+IExvZ3MgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaXQgdG9vayBmb3IgdGhlIGRlZmVycmVkIGludm9jYXRpb24uXG4gKi9cbnZhciBub3cgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHJvb3QuRGF0ZS5ub3coKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlYm91bmNlZCBmdW5jdGlvbiB0aGF0IGRlbGF5cyBpbnZva2luZyBgZnVuY2AgdW50aWwgYWZ0ZXIgYHdhaXRgXG4gKiBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgdGhlIGRlYm91bmNlZCBmdW5jdGlvbiB3YXNcbiAqIGludm9rZWQuIFRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgIG1ldGhvZCB0byBjYW5jZWxcbiAqIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLlxuICogUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb24gdGhlXG4gKiBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50XG4gKiBjYWxscyB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYFxuICogaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIGRlYm91bmNlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy5kZWJvdW5jZWAgYW5kIGBfLnRocm90dGxlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlYm91bmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9ZmFsc2VdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFdhaXRdXG4gKiAgVGhlIG1heGltdW0gdGltZSBgZnVuY2AgaXMgYWxsb3dlZCB0byBiZSBkZWxheWVkIGJlZm9yZSBpdCdzIGludm9rZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGRlYm91bmNlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgY29zdGx5IGNhbGN1bGF0aW9ucyB3aGlsZSB0aGUgd2luZG93IHNpemUgaXMgaW4gZmx1eC5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKGNhbGN1bGF0ZUxheW91dCwgMTUwKSk7XG4gKlxuICogLy8gSW52b2tlIGBzZW5kTWFpbGAgd2hlbiBjbGlja2VkLCBkZWJvdW5jaW5nIHN1YnNlcXVlbnQgY2FsbHMuXG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgXy5kZWJvdW5jZShzZW5kTWFpbCwgMzAwLCB7XG4gKiAgICdsZWFkaW5nJzogdHJ1ZSxcbiAqICAgJ3RyYWlsaW5nJzogZmFsc2VcbiAqIH0pKTtcbiAqXG4gKiAvLyBFbnN1cmUgYGJhdGNoTG9nYCBpcyBpbnZva2VkIG9uY2UgYWZ0ZXIgMSBzZWNvbmQgb2YgZGVib3VuY2VkIGNhbGxzLlxuICogdmFyIGRlYm91bmNlZCA9IF8uZGVib3VuY2UoYmF0Y2hMb2csIDI1MCwgeyAnbWF4V2FpdCc6IDEwMDAgfSk7XG4gKiB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvc3RyZWFtJyk7XG4gKiBqUXVlcnkoc291cmNlKS5vbignbWVzc2FnZScsIGRlYm91bmNlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyBkZWJvdW5jZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIGRlYm91bmNlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsYXN0QXJncyxcbiAgICAgIGxhc3RUaGlzLFxuICAgICAgbWF4V2FpdCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHRpbWVySWQsXG4gICAgICBsYXN0Q2FsbFRpbWUsXG4gICAgICBsYXN0SW52b2tlVGltZSA9IDAsXG4gICAgICBsZWFkaW5nID0gZmFsc2UsXG4gICAgICBtYXhpbmcgPSBmYWxzZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB3YWl0ID0gdG9OdW1iZXIod2FpdCkgfHwgMDtcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICEhb3B0aW9ucy5sZWFkaW5nO1xuICAgIG1heGluZyA9ICdtYXhXYWl0JyBpbiBvcHRpb25zO1xuICAgIG1heFdhaXQgPSBtYXhpbmcgPyBuYXRpdmVNYXgodG9OdW1iZXIob3B0aW9ucy5tYXhXYWl0KSB8fCAwLCB3YWl0KSA6IG1heFdhaXQ7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZUZ1bmModGltZSkge1xuICAgIHZhciBhcmdzID0gbGFzdEFyZ3MsXG4gICAgICAgIHRoaXNBcmcgPSBsYXN0VGhpcztcblxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxlYWRpbmdFZGdlKHRpbWUpIHtcbiAgICAvLyBSZXNldCBhbnkgYG1heFdhaXRgIHRpbWVyLlxuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICAvLyBTdGFydCB0aGUgdGltZXIgZm9yIHRoZSB0cmFpbGluZyBlZGdlLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgLy8gSW52b2tlIHRoZSBsZWFkaW5nIGVkZ2UuXG4gICAgcmV0dXJuIGxlYWRpbmcgPyBpbnZva2VGdW5jKHRpbWUpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtYWluaW5nV2FpdCh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZSxcbiAgICAgICAgcmVzdWx0ID0gd2FpdCAtIHRpbWVTaW5jZUxhc3RDYWxsO1xuXG4gICAgcmV0dXJuIG1heGluZyA/IG5hdGl2ZU1pbihyZXN1bHQsIG1heFdhaXQgLSB0aW1lU2luY2VMYXN0SW52b2tlKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZEludm9rZSh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZTtcblxuICAgIC8vIEVpdGhlciB0aGlzIGlzIHRoZSBmaXJzdCBjYWxsLCBhY3Rpdml0eSBoYXMgc3RvcHBlZCBhbmQgd2UncmUgYXQgdGhlXG4gICAgLy8gdHJhaWxpbmcgZWRnZSwgdGhlIHN5c3RlbSB0aW1lIGhhcyBnb25lIGJhY2t3YXJkcyBhbmQgd2UncmUgdHJlYXRpbmdcbiAgICAvLyBpdCBhcyB0aGUgdHJhaWxpbmcgZWRnZSwgb3Igd2UndmUgaGl0IHRoZSBgbWF4V2FpdGAgbGltaXQuXG4gICAgcmV0dXJuIChsYXN0Q2FsbFRpbWUgPT09IHVuZGVmaW5lZCB8fCAodGltZVNpbmNlTGFzdENhbGwgPj0gd2FpdCkgfHxcbiAgICAgICh0aW1lU2luY2VMYXN0Q2FsbCA8IDApIHx8IChtYXhpbmcgJiYgdGltZVNpbmNlTGFzdEludm9rZSA+PSBtYXhXYWl0KSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aW1lckV4cGlyZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKTtcbiAgICBpZiAoc2hvdWxkSW52b2tlKHRpbWUpKSB7XG4gICAgICByZXR1cm4gdHJhaWxpbmdFZGdlKHRpbWUpO1xuICAgIH1cbiAgICAvLyBSZXN0YXJ0IHRoZSB0aW1lci5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHJlbWFpbmluZ1dhaXQodGltZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhaWxpbmdFZGdlKHRpbWUpIHtcbiAgICB0aW1lcklkID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gT25seSBpbnZva2UgaWYgd2UgaGF2ZSBgbGFzdEFyZ3NgIHdoaWNoIG1lYW5zIGBmdW5jYCBoYXMgYmVlblxuICAgIC8vIGRlYm91bmNlZCBhdCBsZWFzdCBvbmNlLlxuICAgIGlmICh0cmFpbGluZyAmJiBsYXN0QXJncykge1xuICAgICAgcmV0dXJuIGludm9rZUZ1bmModGltZSk7XG4gICAgfVxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAodGltZXJJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgfVxuICAgIGxhc3RJbnZva2VUaW1lID0gMDtcbiAgICBsYXN0QXJncyA9IGxhc3RDYWxsVGltZSA9IGxhc3RUaGlzID0gdGltZXJJZCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHJldHVybiB0aW1lcklkID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiB0cmFpbGluZ0VkZ2Uobm93KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVib3VuY2VkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCksXG4gICAgICAgIGlzSW52b2tpbmcgPSBzaG91bGRJbnZva2UodGltZSk7XG5cbiAgICBsYXN0QXJncyA9IGFyZ3VtZW50cztcbiAgICBsYXN0VGhpcyA9IHRoaXM7XG4gICAgbGFzdENhbGxUaW1lID0gdGltZTtcblxuICAgIGlmIChpc0ludm9raW5nKSB7XG4gICAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBsZWFkaW5nRWRnZShsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgICAgaWYgKG1heGluZykge1xuICAgICAgICAvLyBIYW5kbGUgaW52b2NhdGlvbnMgaW4gYSB0aWdodCBsb29wLlxuICAgICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgICAgICByZXR1cm4gaW52b2tlRnVuYyhsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGRlYm91bmNlZC5jYW5jZWwgPSBjYW5jZWw7XG4gIGRlYm91bmNlZC5mbHVzaCA9IGZsdXNoO1xuICByZXR1cm4gZGVib3VuY2VkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICogLy8gPT4gSW5maW5pdHlcbiAqXG4gKiBfLnRvTnVtYmVyKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gTkFOO1xuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICB2YXIgb3RoZXIgPSB0eXBlb2YgdmFsdWUudmFsdWVPZiA9PSAnZnVuY3Rpb24nID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlVHJpbSwgJycpO1xuICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xuICByZXR1cm4gKGlzQmluYXJ5IHx8IHJlSXNPY3RhbC50ZXN0KHZhbHVlKSlcbiAgICA/IGZyZWVQYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgaXNCaW5hcnkgPyAyIDogOClcbiAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWJvdW5jZTtcbiIsIihmdW5jdGlvbiggdyApe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHR2YXIgUG9saXRlc3BhY2UgPSBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHRpZiggIWVsZW1lbnQgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiUG9saXRlc3BhY2UgcmVxdWlyZXMgYW4gZWxlbWVudCBhcmd1bWVudC5cIiApO1xuXHRcdH1cblxuXHRcdGlmKCAhZWxlbWVudC5nZXRBdHRyaWJ1dGUgKSB7XG5cdFx0XHQvLyBDdXQgdGhlIG11c3RhcmRcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXHRcdHRoaXMudHlwZSA9IHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoIFwidHlwZVwiICk7XG5cdFx0dGhpcy5kZWxpbWl0ZXIgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCBcImRhdGEtZGVsaW1pdGVyXCIgKSB8fCBcIiBcIjtcblx0XHR0aGlzLnJldmVyc2UgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCBcImRhdGEtcmV2ZXJzZVwiICkgIT09IG51bGw7XG5cdFx0dGhpcy5ncm91cExlbmd0aCA9IHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoIFwiZGF0YS1ncm91cGxlbmd0aFwiICkgfHwgMztcblx0fTtcblxuXHRQb2xpdGVzcGFjZS5wcm90b3R5cGUuX2RpdmlkZUludG9BcnJheSA9IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHR2YXIgc3BsaXQgPSAoICcnICsgdGhpcy5ncm91cExlbmd0aCApLnNwbGl0KCAnLCcgKSxcblx0XHRcdGlzVW5pZm9ybVNwbGl0ID0gc3BsaXQubGVuZ3RoID09PSAxLFxuXHRcdFx0ZGl2aWRlZFZhbHVlID0gW10sXG5cdFx0XHRsb29wSW5kZXggPSAwLFxuXHRcdFx0Z3JvdXBMZW5ndGgsXG5cdFx0XHRzdWJzdHJTdGFydCxcblx0XHRcdHVzZUNoYXJDb3VudDtcblxuXHRcdHdoaWxlKCBzcGxpdC5sZW5ndGggJiYgbG9vcEluZGV4IDwgdmFsdWUubGVuZ3RoICkge1xuXHRcdFx0aWYoIGlzVW5pZm9ybVNwbGl0ICkge1xuXHRcdFx0XHRncm91cExlbmd0aCA9IHNwbGl0WyAwIF07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyB1c2UgdGhlIG5leHQgc3BsaXQgb3IgdGhlIHJlc3Qgb2YgdGhlIHN0cmluZyBpZiBvcGVuIGVuZGVkLCBhbGEgXCIzLDMsXCJcblx0XHRcdFx0Z3JvdXBMZW5ndGggPSBzcGxpdC5zaGlmdCgpIHx8IHZhbHVlLmxlbmd0aCAtIGxvb3BJbmRleDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVXNlIG1pbiBpZiB3ZeKAmXJlIGF0IHRoZSBlbmQgb2YgYSByZXZlcnNlZCBzdHJpbmdcblx0XHRcdC8vIChzdWJzdHJTdGFydCBiZWxvdyBncm93cyBsYXJnZXIgdGhhbiB0aGUgc3RyaW5nIGxlbmd0aClcblx0XHRcdHVzZUNoYXJDb3VudCA9IE1hdGgubWluKCBwYXJzZUludCggZ3JvdXBMZW5ndGgsIDEwICksIHZhbHVlLmxlbmd0aCAtIGxvb3BJbmRleCApO1xuXG5cdFx0XHRpZiggdGhpcy5yZXZlcnNlICkge1xuXHRcdFx0XHRzdWJzdHJTdGFydCA9IC0xICogKHVzZUNoYXJDb3VudCArIGxvb3BJbmRleCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzdWJzdHJTdGFydCA9IGxvb3BJbmRleDtcblx0XHRcdH1cblx0XHRcdGRpdmlkZWRWYWx1ZS5wdXNoKCB2YWx1ZS5zdWJzdHIoIHN1YnN0clN0YXJ0LCB1c2VDaGFyQ291bnQgKSApO1xuXHRcdFx0bG9vcEluZGV4ICs9IHVzZUNoYXJDb3VudDtcblx0XHR9XG5cblx0XHRpZiggdGhpcy5yZXZlcnNlICkge1xuXHRcdFx0ZGl2aWRlZFZhbHVlLnJldmVyc2UoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGl2aWRlZFZhbHVlO1xuXHR9O1xuXG5cdFBvbGl0ZXNwYWNlLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0dmFyIHZhbCA9IHRoaXMudW5mb3JtYXQoIHZhbHVlICk7XG5cblx0XHRyZXR1cm4gdGhpcy5fZGl2aWRlSW50b0FycmF5KCB2YWwgKS5qb2luKCB0aGlzLmRlbGltaXRlciApO1xuXHR9O1xuXG5cdFBvbGl0ZXNwYWNlLnByb3RvdHlwZS50cmltTWF4bGVuZ3RoID0gZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHZhciBtYXhsZW5ndGggPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCBcIm1heGxlbmd0aFwiICk7XG5cdFx0Ly8gTm90ZSBpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWF4bGVuZ3RoIGRvZXMgbm90aGluZ1xuXHRcdGlmKCBtYXhsZW5ndGggKSB7XG5cdFx0XHR2YWx1ZSA9IHZhbHVlLnN1YnN0ciggMCwgbWF4bGVuZ3RoICk7XG5cdFx0fVxuXHRcdHJldHVybiB2YWx1ZTtcblx0fTtcblxuXHRQb2xpdGVzcGFjZS5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy50cmltTWF4bGVuZ3RoKCB0aGlzLmVsZW1lbnQudmFsdWUgKTtcblx0fTtcblxuXHRQb2xpdGVzcGFjZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5lbGVtZW50LnZhbHVlID0gdGhpcy51c2VQcm94eSgpID8gdGhpcy5nZXRWYWx1ZSgpIDogdGhpcy5mb3JtYXQoIHRoaXMuZ2V0VmFsdWUoKSApO1xuXHR9O1xuXG5cdFBvbGl0ZXNwYWNlLnByb3RvdHlwZS51bmZvcm1hdCA9IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZSggbmV3IFJlZ0V4cCggIHRoaXMuZGVsaW1pdGVyLCAnZycgKSwgJycgKTtcblx0fTtcblxuXHRQb2xpdGVzcGFjZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmVsZW1lbnQudmFsdWUgPSB0aGlzLnVuZm9ybWF0KCB0aGlzLmVsZW1lbnQudmFsdWUgKTtcblx0fTtcblxuXHRQb2xpdGVzcGFjZS5wcm90b3R5cGUudXNlUHJveHkgPSBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy50eXBlID09PSBcIm51bWJlclwiO1xuXHR9O1xuXG5cdFBvbGl0ZXNwYWNlLnByb3RvdHlwZS51cGRhdGVQcm94eSA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBwcm94eTtcblx0XHRpZiggdGhpcy51c2VQcm94eSgpICkge1xuXHRcdFx0cHJveHkgPSB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZS5maXJzdENoaWxkO1xuXHRcdFx0cHJveHkuaW5uZXJIVE1MID0gdGhpcy5mb3JtYXQoIHRoaXMuZ2V0VmFsdWUoKSApO1xuXHRcdFx0cHJveHkuc3R5bGUud2lkdGggPSB0aGlzLmVsZW1lbnQub2Zmc2V0V2lkdGggKyBcInB4XCI7XG5cdFx0fVxuXHR9O1xuXG5cdFBvbGl0ZXNwYWNlLnByb3RvdHlwZS5jcmVhdGVQcm94eSA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCAhdGhpcy51c2VQcm94eSgpICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldFN0eWxlKCBlbCwgcHJvcCApIHtcblx0XHRcdHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSggZWwsIG51bGwgKS5nZXRQcm9wZXJ0eVZhbHVlKCBwcm9wICk7XG5cdFx0fVxuXHRcdGZ1bmN0aW9uIHN1bVN0eWxlcyggZWwsIHByb3BzICkge1xuXHRcdFx0dmFyIHRvdGFsID0gMDtcblx0XHRcdGZvciggdmFyIGo9MCwgaz1wcm9wcy5sZW5ndGg7IGo8azsgaisrICkge1xuXHRcdFx0XHR0b3RhbCArPSBwYXJzZUZsb2F0KCBnZXRTdHlsZSggZWwsIHByb3BzWyBqIF0gKSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRvdGFsO1xuXHRcdH1cblxuXHRcdHZhciBwYXJlbnQgPSB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZTtcblx0XHR2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICk7XG5cdFx0dmFyIHByb3h5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xuXHRcdHByb3h5LnN0eWxlLmZvbnQgPSBnZXRTdHlsZSggdGhpcy5lbGVtZW50LCBcImZvbnRcIiApO1xuXHRcdHByb3h5LnN0eWxlLnBhZGRpbmdMZWZ0ID0gc3VtU3R5bGVzKCB0aGlzLmVsZW1lbnQsIFsgXCJwYWRkaW5nLWxlZnRcIiwgXCJib3JkZXItbGVmdC13aWR0aFwiIF0gKSArIFwicHhcIjtcblx0XHRwcm94eS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBzdW1TdHlsZXMoIHRoaXMuZWxlbWVudCwgWyBcInBhZGRpbmctcmlnaHRcIiwgXCJib3JkZXItcmlnaHQtd2lkdGhcIiBdICkgKyBcInB4XCI7XG5cdFx0cHJveHkuc3R5bGUudG9wID0gc3VtU3R5bGVzKCB0aGlzLmVsZW1lbnQsIFsgXCJwYWRkaW5nLXRvcFwiLCBcImJvcmRlci10b3Atd2lkdGhcIiwgXCJtYXJnaW4tdG9wXCIgXSApICsgXCJweFwiO1xuXG5cdFx0ZWwuYXBwZW5kQ2hpbGQoIHByb3h5ICk7XG5cdFx0ZWwuY2xhc3NOYW1lID0gXCJwb2xpdGVzcGFjZS1wcm94eSBhY3RpdmVcIjtcblx0XHR2YXIgZm9ybUVsID0gcGFyZW50LnJlcGxhY2VDaGlsZCggZWwsIHRoaXMuZWxlbWVudCApO1xuXHRcdGVsLmFwcGVuZENoaWxkKCBmb3JtRWwgKTtcblxuXHRcdHRoaXMudXBkYXRlUHJveHkoKTtcblx0fTtcblxuXHR3LlBvbGl0ZXNwYWNlID0gUG9saXRlc3BhY2U7XG5cbn0oIHRoaXMgKSk7XG4iLCJ2YXIgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG5cbi8qKlxuICogQG5hbWUgc2hvd1BhbmVsTGlzdGVuZXJcbiAqIEBkZXNjIFRoZSBldmVudCBoYW5kbGVyIGZvciBjbGlja2luZyBvbiBhIGJ1dHRvbiBpbiBhbiBhY2NvcmRpb24uXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAtIEFuIEhUTUwgZWxlbWVudCBtb3N0IGxpa2VseSBhIDxidXR0b24+LlxuICogQHBhcmFtIHtPYmplY3R9IGV2IC0gQSBET00gZXZlbnQgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBzaG93UGFuZWxMaXN0ZW5lciAoZWwsIGV2KSB7XG4gIHZhciBleHBhbmRlZCA9IGVsLmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpID09PSAndHJ1ZSc7XG4gIHRoaXMuaGlkZUFsbCgpO1xuICBpZiAoIWV4cGFuZGVkKSB7XG4gICAgdGhpcy5zaG93KGVsKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQGNsYXNzIEFjY29yZGlvblxuICpcbiAqIEFuIGFjY29yZGlvbiBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gSFRNTEVsZW1lbnQgdG8gdHVybiBpbnRvIGFuIGFjY29yZGlvbi5cbiAqL1xuZnVuY3Rpb24gQWNjb3JkaW9uIChlbCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMucm9vdCA9IGVsO1xuXG4gIC8vIGRlbGVnYXRlIGNsaWNrIGV2ZW50cyBvbiBlYWNoIDxidXR0b24+XG4gIHZhciBidXR0b25zID0gc2VsZWN0KCdidXR0b24nLCB0aGlzLnJvb3QpO1xuICBidXR0b25zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgaWYgKGVsLmF0dGFjaEV2ZW50KSB7XG4gICAgICBlbC5hdHRhY2hFdmVudCgnb25jbGljaycsIHNob3dQYW5lbExpc3RlbmVyLmJpbmQoc2VsZiwgZWwpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93UGFuZWxMaXN0ZW5lci5iaW5kKHNlbGYsIGVsKSk7XG4gICAgfVxuICB9KTtcblxuICAvLyBmaW5kIHRoZSBmaXJzdCBleHBhbmRlZCBidXR0b25cbiAgdmFyIGV4cGFuZGVkID0gdGhpcy4kKCdidXR0b25bYXJpYS1leHBhbmRlZD10cnVlXScpWyAwIF07XG4gIHRoaXMuaGlkZUFsbCgpO1xuICBpZiAoZXhwYW5kZWQgIT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuc2hvdyhleHBhbmRlZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5BY2NvcmRpb24ucHJvdG90eXBlLiQgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHNlbGVjdChzZWxlY3RvciwgdGhpcy5yb290KTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYnV0dG9uXG4gKiBAcmV0dXJuIHtBY2NvcmRpb259XG4gKi9cbkFjY29yZGlvbi5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uIChidXR0b24pIHtcbiAgdmFyIHNlbGVjdG9yID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpLFxuICAgIGNvbnRlbnQgPSB0aGlzLiQoJyMnICsgc2VsZWN0b3IpWyAwIF07XG5cbiAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcbiAgY29udGVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBidXR0b25cbiAqIEByZXR1cm4ge0FjY29yZGlvbn1cbiAqL1xuQWNjb3JkaW9uLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKGJ1dHRvbikge1xuICB2YXIgc2VsZWN0b3IgPSBidXR0b24uZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyksXG4gICAgY29udGVudCA9IHRoaXMuJCgnIycgKyBzZWxlY3RvcilbIDAgXTtcblxuICBidXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG4gIGNvbnRlbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGZhbHNlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEByZXR1cm4ge0FjY29yZGlvbn1cbiAqL1xuQWNjb3JkaW9uLnByb3RvdHlwZS5oaWRlQWxsID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBidXR0b25zID0gdGhpcy4kKCd1bCA+IGxpID4gYnV0dG9uLCAudXNhLWFjY29yZGlvbi1idXR0b24nKTtcbiAgYnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uIChidXR0b24pIHtcbiAgICBzZWxmLmhpZGUoYnV0dG9uKTtcbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBY2NvcmRpb247XG4iLCJ2YXIgc2VsZWN0ID0gcmVxdWlyZSgnLi4vdXRpbHMvc2VsZWN0Jyk7XG52YXIgYWRkQ2xhc3MgPSByZXF1aXJlKCcuLi91dGlscy9hZGQtY2xhc3MnKTtcbnZhciByZW1vdmVDbGFzcyA9IHJlcXVpcmUoJy4uL3V0aWxzL3JlbW92ZS1jbGFzcycpO1xudmFyIGRpc3BhdGNoID0gcmVxdWlyZSgnLi4vdXRpbHMvZGlzcGF0Y2gnKTtcblxuZnVuY3Rpb24gZ2V0U2libGluZ3MgKGVsKSB7XG4gIHZhciBuID0gZWwucGFyZW50Tm9kZS5maXJzdENoaWxkO1xuICB2YXIgbWF0Y2hlcyA9IFtdO1xuXG4gIHdoaWxlIChuKSB7XG4gICAgaWYgKG4ubm9kZVR5cGUgPT0gMSAmJiBuICE9IGVsKSB7XG4gICAgICBtYXRjaGVzLnB1c2gobik7XG4gICAgfVxuICAgIG4gPSBuLm5leHRTaWJsaW5nO1xuICB9XG5cbiAgcmV0dXJuIG1hdGNoZXM7XG59XG5cbnZhciBzaG93UGFuZWxMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHBhbmVsVG9TaG93ID0gdGhpcy5wYXJlbnROb2RlO1xuICB2YXIgb3RoZXJQYW5lbHMgPSBnZXRTaWJsaW5ncyhwYW5lbFRvU2hvdyk7XG4gIHJlbW92ZUNsYXNzKHBhbmVsVG9TaG93LCAnaGlkZGVuJyk7XG4gIG90aGVyUGFuZWxzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgYWRkQ2xhc3MoZWwsICdoaWRkZW4nKTtcbiAgfSk7XG59O1xuXG52YXIgZXZlbnRzPSBbXTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmb290ZXJBY2NvcmRpb24gKCkge1xuXG4gIHZhciBuYXZMaXN0ID0gc2VsZWN0KCcudXNhLWZvb3Rlci1iaWcgbmF2IHVsJyk7XG4gIHZhciBwcmltYXJ5TGluayA9IHNlbGVjdCgnLnVzYS1mb290ZXItYmlnIG5hdiAudXNhLWZvb3Rlci1wcmltYXJ5LWxpbmsnKTtcblxuICBpZiAoZXZlbnRzLmxlbmd0aCkge1xuICAgIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLm9mZigpO1xuICAgIH0pO1xuICAgIGV2ZW50cyA9IFtdO1xuICB9XG5cbiAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNjAwKSB7XG5cbiAgICBuYXZMaXN0LmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICBhZGRDbGFzcyhlbCwgJ2hpZGRlbicpO1xuICAgIH0pO1xuXG4gICAgcHJpbWFyeUxpbmsuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgIGV2ZW50cy5wdXNoKFxuICAgICAgICBkaXNwYXRjaChlbCwgJ2NsaWNrJywgc2hvd1BhbmVsTGlzdGVuZXIpXG4gICAgICApO1xuICAgIH0pO1xuXG4gIH0gZWxzZSB7XG4gICAgbmF2TGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgcmVtb3ZlQ2xhc3MoZWwsICdoaWRkZW4nKTtcbiAgICB9KTtcbiAgfVxufTtcbiIsInZhciBzZWxlY3QgPSByZXF1aXJlKCcuLi8uLi91dGlscy9zZWxlY3QnKTtcbnZhciBhZGRDbGFzcyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2FkZC1jbGFzcycpO1xudmFyIHJlbW92ZUNsYXNzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvcmVtb3ZlLWNsYXNzJyk7XG52YXIgZGlzcGF0Y2ggPSByZXF1aXJlKCcuLi8uLi91dGlscy9kaXNwYXRjaCcpO1xuXG52YXIgbmF2RWxlbWVudHMgPSBzZWxlY3QoJy51c2EtbWVudS1idG4sIC51c2Etb3ZlcmxheSwgLnVzYS1uYXYtY2xvc2UnKTtcbnZhciB0b2dnbGVFbGVtZW50cyA9IHNlbGVjdCgnLnVzYS1vdmVybGF5LCAudXNhLW5hdicpO1xudmFyIG5hdkNsb3NlRWxlbWVudCA9IHNlbGVjdCgnLnVzYS1uYXYtY2xvc2UnKVsgMCBdO1xuXG5uYXZFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIGRpc3BhdGNoKGVsZW1lbnQsICdjbGljayB0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGUpIHtcbiAgICB0b2dnbGVFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICB0b2dnbGVDbGFzcyhlbGVtZW50LCAnaXMtdmlzaWJsZScpO1xuICAgIH0pO1xuICAgIHRvZ2dsZUNsYXNzKGRvY3VtZW50LmJvZHksICd1c2EtbW9iaWxlX25hdi1hY3RpdmUnKTtcbiAgICBuYXZDbG9zZUVsZW1lbnQuZm9jdXMoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzIChlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSk7XG4gIH1cbn1cbiIsInZhciBzZWxlY3QgPSByZXF1aXJlKCcuLi8uLi91dGlscy9zZWxlY3QnKTtcbnZhciBhZGRDbGFzcyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2FkZC1jbGFzcycpO1xudmFyIHJlbW92ZUNsYXNzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvcmVtb3ZlLWNsYXNzJyk7XG52YXIgZGlzcGF0Y2ggPSByZXF1aXJlKCcuLi8uLi91dGlscy9kaXNwYXRjaCcpO1xuXG52YXIgc2VhcmNoRm9ybSA9IHNlbGVjdCgnLmpzLXNlYXJjaC1mb3JtJylbIDAgXTtcbnZhciBzZWFyY2hCdXR0b24gPSBzZWxlY3QoJy5qcy1zZWFyY2gtYnV0dG9uJylbIDAgXTtcbnZhciBzZWFyY2hCdXR0b25Db250YWluZXIgPSBzZWxlY3QoJy5qcy1zZWFyY2gtYnV0dG9uLWNvbnRhaW5lcicpWyAwIF07XG52YXIgc2VhcmNoRGlzcGF0Y2hlcjtcblxuaWYgKHNlYXJjaEJ1dHRvbiAmJiBzZWFyY2hGb3JtKSB7XG4gIGRpc3BhdGNoKHNlYXJjaEJ1dHRvbiwgJ2NsaWNrIHRvdWNoc3RhcnQnLCBzZWFyY2hCdXR0b25DbGlja0hhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBzZWFyY2hCdXR0b25DbGlja0hhbmRsZXIgKGV2ZW50KSB7XG4gIGlmIChpc09wZW4oc2VhcmNoRm9ybSkpIHtcbiAgICBjbG9zZVNlYXJjaCgpO1xuICB9IGVsc2Uge1xuICAgIG9wZW5TZWFyY2goKTtcbiAgICBzZWFyY2hEaXNwYXRjaGVyID0gZGlzcGF0Y2goZG9jdW1lbnQuYm9keSwgJ2NsaWNrIHRvdWNoc3RhcnQnLCBzZWFyY2hPcGVuQ2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gc2VhcmNoT3BlbkNsaWNrSGFuZGxlciAoZXZlbnQpIHtcbiAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgaWYgKCEgc2VhcmNoRm9ybUNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICBjbG9zZVNlYXJjaCgpO1xuICAgIHNlYXJjaERpc3BhdGNoZXIub2ZmKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gb3BlblNlYXJjaCAoKSB7XG4gIGFkZENsYXNzKHNlYXJjaEZvcm0sICdpcy12aXNpYmxlJyk7XG4gIGFkZENsYXNzKHNlYXJjaEJ1dHRvbiwgJ2lzLWhpZGRlbicpO1xufVxuXG5mdW5jdGlvbiBjbG9zZVNlYXJjaCAoKSB7XG4gIHJlbW92ZUNsYXNzKHNlYXJjaEZvcm0sICdpcy12aXNpYmxlJyk7XG4gIHJlbW92ZUNsYXNzKHNlYXJjaEJ1dHRvbiwgJ2lzLWhpZGRlbicpO1xufVxuXG5mdW5jdGlvbiBpc09wZW4gKGVsZW1lbnQpIHtcbiAgdmFyIGNsYXNzUmVnZXhwID0gbmV3IFJlZ0V4cCgnKF58IClpcy12aXNpYmxlKCB8JCknLCAnZ2knKTtcbiAgcmV0dXJuIGNsYXNzUmVnZXhwLnRlc3QoZWxlbWVudC5jbGFzc05hbWUpO1xufVxuXG5mdW5jdGlvbiBzZWFyY2hGb3JtQ29udGFpbnMgKGVsZW1lbnQpIHtcbiAgcmV0dXJuIChzZWFyY2hGb3JtICYmIHNlYXJjaEZvcm0uY29udGFpbnMoZWxlbWVudCkpIHx8XG4gICAgICAgICAoc2VhcmNoQnV0dG9uQ29udGFpbmVyICYmIHNlYXJjaEJ1dHRvbkNvbnRhaW5lci5jb250YWlucyhlbGVtZW50KSk7XG59XG4iLCIvKipcbiAqIEZsaXBzIGdpdmVuIElOUFVUIGVsZW1lbnRzIGJldHdlZW4gbWFza2VkIChoaWRpbmcgdGhlIGZpZWxkIHZhbHVlKSBhbmQgdW5tYXNrZWRcbiAqIEBwYXJhbSB7QXJyYXkuSFRNTEVsZW1lbnR9IGZpZWxkcyAtIEFuIGFycmF5IG9mIElOUFVUIGVsZW1lbnRzXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG1hc2sgLSBXaGV0aGVyIHRoZSBtYXNrIHNob3VsZCBiZSBhcHBsaWVkLCBoaWRpbmcgdGhlIGZpZWxkIHZhbHVlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZpZWxkcywgbWFzaykge1xuICBmaWVsZHMuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ2F1dG9jYXBpdGFsaXplJywgJ29mZicpO1xuICAgIGZpZWxkLnNldEF0dHJpYnV0ZSgnYXV0b2NvcnJlY3QnLCAnb2ZmJyk7XG4gICAgZmllbGQuc2V0QXR0cmlidXRlKCd0eXBlJywgbWFzayA/ICdwYXNzd29yZCcgOiAndGV4dCcpO1xuICB9KTtcbn07XG4iLCJ2YXIgdG9nZ2xlRmllbGRNYXNrID0gcmVxdWlyZSgnLi90b2dnbGUtZmllbGQtbWFzaycpO1xudmFyIHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGRlY29yYXRlcyBhbiBIVE1MIGVsZW1lbnQgd2l0aCB0aGUgYWJpbGl0eSB0byB0b2dnbGUgdGhlXG4gKiBtYXNrZWQgc3RhdGUgb2YgYW4gaW5wdXQgZmllbGQgKGxpa2UgYSBwYXNzd29yZCkgd2hlbiBjbGlja2VkLlxuICogVGhlIGlkcyBvZiB0aGUgZmllbGRzIHRvIGJlIG1hc2tlZCB3aWxsIGJlIHB1bGxlZCBkaXJlY3RseSBmcm9tIHRoZSBidXR0b24nc1xuICogYGFyaWEtY29udHJvbHNgIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWwgICAgUGFyZW50IGVsZW1lbnQgY29udGFpbmluZyB0aGUgZmllbGRzIHRvIGJlIG1hc2tlZFxuICogQHBhcmFtICB7U3RyaW5nfSBzaG93VGV4dCAgIEJ1dHRvbiB0ZXh0IHNob3duIHdoZW4gZmllbGQgaXMgbWFza2VkXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGhpZGVUZXh0ICAgQnV0dG9uIHRleHQgc2hvdyB3aGVuIGZpZWxkIGlzIHVubWFza2VkXG4gKiBAcmV0dXJuIHt9XG4gKi9cbnZhciB0b2dnbGVGb3JtSW5wdXQgPSBmdW5jdGlvbiAoZWwsIHNob3dUZXh0LCBoaWRlVGV4dCkge1xuICB2YXIgZGVmYXVsdFNlbGVjdG9ycyA9IGVsLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuXG4gIGlmICghZGVmYXVsdFNlbGVjdG9ycyB8fCBkZWZhdWx0U2VsZWN0b3JzLnRyaW0oKS5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0RpZCB5b3UgZm9yZ2V0IHRvIGRlZmluZSBzZWxlY3RvcnMgaW4gdGhlIGFyaWEtY29udHJvbHMgYXR0cmlidXRlPyBDaGVjayBlbGVtZW50ICcgKyBlbC5vdXRlckhUTUwpO1xuICB9XG5cbiAgdmFyIGZpZWxkU2VsZWN0b3IgPSBnZXRTZWxlY3RvcnMoZGVmYXVsdFNlbGVjdG9ycyk7XG4gIHZhciBmb3JtRWxlbWVudCA9IGdldEZvcm1QYXJlbnQoZWwpO1xuICBpZiAoIWZvcm1FbGVtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd0b2dnbGVGb3JtSW5wdXQoKSBuZWVkcyB0aGUgc3VwcGxpZWQgZWxlbWVudCB0byBiZSBpbnNpZGUgYSA8Zm9ybT4uIENoZWNrIGVsZW1lbnQgJyArIGVsLm91dGVySFRNTCk7XG4gIH1cbiAgdmFyIGZpZWxkcyA9IHNlbGVjdChmaWVsZFNlbGVjdG9yLCBmb3JtRWxlbWVudCk7XG4gIHZhciBtYXNrZWQgPSBmYWxzZTtcblxuICB2YXIgdG9nZ2xlQ2xpY2tMaXN0ZW5lciA9IGZ1bmN0aW9uIChldikge1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdG9nZ2xlRmllbGRNYXNrKGZpZWxkcywgbWFza2VkKTtcbiAgICBlbC50ZXh0Q29udGVudCA9IG1hc2tlZCA/IHNob3dUZXh0IDogaGlkZVRleHQ7XG4gICAgbWFza2VkID0gIW1hc2tlZDtcbiAgfTtcblxuICBpZiAoZWwuYXR0YWNoRXZlbnQpIHtcbiAgICBlbC5hdHRhY2hFdmVudCgnb25jbGljaycsIHRvZ2dsZUNsaWNrTGlzdGVuZXIpO1xuICB9IGVsc2Uge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlQ2xpY2tMaXN0ZW5lcik7XG4gIH1cbn07XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHR1cm4gYSBzdHJpbmcgb2YgaWRzIGludG8gdmFsaWQgc2VsZWN0b3JzXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHNlbGVjdG9ycyBTcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiBpZHMgb2YgZmllbGRzIHRvIGJlIG1hc2tlZFxuICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgICAgQ29tbWEgc2VwYXJhdGVkIGxpc3Qgb2Ygc2VsZWN0b3JzXG4gKi9cbmZ1bmN0aW9uIGdldFNlbGVjdG9ycyAoc2VsZWN0b3JzKSB7XG4gIHZhciBzZWxlY3RvcnNMaXN0ID0gc2VsZWN0b3JzLnNwbGl0KCcgJyk7XG5cbiAgcmV0dXJuIHNlbGVjdG9yc0xpc3QubWFwKGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgIHJldHVybiAnIycgKyBzZWxlY3RvcjtcbiAgfSkuam9pbignLCAnKTtcbn1cblxuLyoqXG4gKiBTZWFyY2hlcyB1cCB0aGUgdHJlZSBmcm9tIHRoZSBlbGVtZW50IHRvIGZpbmQgYSBGb3JtIGVsZW1lbnQsIGFuZCByZXR1cm5zIGl0LFxuICogb3IgbnVsbCBpZiBubyBGb3JtIGlzIGZvdW5kXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAtIENoaWxkIGVsZW1lbnQgdG8gc3RhcnQgc2VhcmNoXG4gKi9cbmZ1bmN0aW9uIGdldEZvcm1QYXJlbnQgKGVsKSB7XG4gIHdoaWxlIChlbCAmJiBlbC50YWdOYW1lICE9PSAnRk9STScpIHtcbiAgICBlbCA9IGVsLnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIGVsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvZ2dsZUZvcm1JbnB1dDtcbiIsInZhciBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcbnZhciBhZGRDbGFzcyA9IHJlcXVpcmUoJy4uL3V0aWxzL2FkZC1jbGFzcycpO1xudmFyIHJlbW92ZUNsYXNzID0gcmVxdWlyZSgnLi4vdXRpbHMvcmVtb3ZlLWNsYXNzJyk7XG52YXIgZGlzcGF0Y2ggPSByZXF1aXJlKCcuLi91dGlscy9kaXNwYXRjaCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHZhbGlkYXRvciAoZWwpIHtcbiAgdmFyIGRhdGEgPSBnZXREYXRhKGVsKSxcbiAgICBrZXksXG4gICAgdmFsaWRhdG9yTmFtZSxcbiAgICB2YWxpZGF0b3JQYXR0ZXJuLFxuICAgIHZhbGlkYXRvckNoZWNrYm94LFxuICAgIGNoZWNrTGlzdCA9IHNlbGVjdChkYXRhLnZhbGlkYXRpb25lbGVtZW50KVsgMCBdO1xuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlICgpIHtcbiAgICBmb3IgKGtleSBpbiBkYXRhKSB7XG4gICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoJ3ZhbGlkYXRlJykpIHtcbiAgICAgICAgdmFsaWRhdG9yTmFtZSA9IGtleS5zcGxpdCgndmFsaWRhdGUnKVsgMSBdO1xuICAgICAgICB2YWxpZGF0b3JQYXR0ZXJuID0gbmV3IFJlZ0V4cChkYXRhWyBrZXkgXSk7XG4gICAgICAgIHZhbGlkYXRvclNlbGVjdG9yID0gJ1tkYXRhLXZhbGlkYXRvcj0nICsgdmFsaWRhdG9yTmFtZSArICddJztcbiAgICAgICAgdmFsaWRhdG9yQ2hlY2tib3ggPSBzZWxlY3QodmFsaWRhdG9yU2VsZWN0b3IsIGNoZWNrTGlzdClbIDAgXTtcblxuICAgICAgICBpZiAoIXZhbGlkYXRvclBhdHRlcm4udGVzdChlbC52YWx1ZSkpIHtcbiAgICAgICAgICByZW1vdmVDbGFzcyh2YWxpZGF0b3JDaGVja2JveCwgJ3VzYS1jaGVja2xpc3QtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGFkZENsYXNzKHZhbGlkYXRvckNoZWNrYm94LCAndXNhLWNoZWNrbGlzdC1jaGVja2VkJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkaXNwYXRjaChlbCwgJ2tleXVwJywgdmFsaWRhdGUpO1xufTtcblxuLyoqXG4gKiBFeHRyYWN0cyBhdHRyaWJ1dGVzIG5hbWVkIHdpdGggdGhlIHBhdHRlcm4gXCJkYXRhLVtOQU1FXVwiIGZyb20gYSBnaXZlblxuICogSFRNTEVsZW1lbnQsIHRoZW4gcmV0dXJucyBhbiBvYmplY3QgcG9wdWxhdGVkIHdpdGggdGhlIE5BTUUvdmFsdWUgcGFpcnMuXG4gKiBBbnkgaHlwaGVucyBpbiBOQU1FIGFyZSByZW1vdmVkLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiBnZXREYXRhIChlbCkge1xuICBpZiAoIWVsLmhhc0F0dHJpYnV0ZXMoKSkgcmV0dXJuO1xuICB2YXIgZGF0YSA9IHt9O1xuICB2YXIgYXR0cnMgPSBlbC5hdHRyaWJ1dGVzO1xuICBmb3IgKHZhciBpID0gYXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICB2YXIgbWF0Y2hlcyA9IGF0dHJzWyBpIF0ubmFtZS5tYXRjaCgvZGF0YS0oLiopL2kpO1xuICAgIGlmIChtYXRjaGVzICYmIG1hdGNoZXNbIDEgXSkge1xuICAgICAgdmFyIG5hbWUgPSBtYXRjaGVzWyAxIF0ucmVwbGFjZSgvLS8sICcnKTtcbiAgICAgIGRhdGFbIG5hbWUgXSA9IGF0dHJzWyBpIF0udmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBkYXRhO1xufVxuIiwidmFyIHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xudmFyIHdoZW5ET01SZWFkeSA9IHJlcXVpcmUoJy4uL3V0aWxzL3doZW4tZG9tLXJlYWR5Jyk7XG52YXIgQWNjb3JkaW9uID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9hY2NvcmRpb24nKTtcblxud2hlbkRPTVJlYWR5KGZ1bmN0aW9uIGluaXRBY2NvcmRpb25zICgpIHtcblxuICB2YXIgYWNjb3JkaW9ucyA9IHNlbGVjdCgnLnVzYS1hY2NvcmRpb24sIC51c2EtYWNjb3JkaW9uLWJvcmRlcmVkJyk7XG4gIGFjY29yZGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICBuZXcgQWNjb3JkaW9uKGVsKTtcbiAgfSk7XG59KTtcbiIsInZhciBkZWJvdW5jZSA9IHJlcXVpcmUoJ2xvZGFzaC5kZWJvdW5jZScpO1xudmFyIHdoZW5ET01SZWFkeSA9IHJlcXVpcmUoJy4uL3V0aWxzL3doZW4tZG9tLXJlYWR5Jyk7XG52YXIgZGlzcGF0Y2ggPSByZXF1aXJlKCcuLi91dGlscy9kaXNwYXRjaCcpO1xudmFyIGZvb3RlckFjY29yZGlvbiA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZm9vdGVyJyk7XG5cbndoZW5ET01SZWFkeShmdW5jdGlvbiAoKSB7XG5cbiAgZm9vdGVyQWNjb3JkaW9uKCk7XG5cbiAgZGlzcGF0Y2god2luZG93LCAncmVzaXplJywgZGVib3VuY2UoZm9vdGVyQWNjb3JkaW9uLCAxODApKTtcblxufSk7XG4iLCJ2YXIgd2hlbkRPTVJlYWR5ID0gcmVxdWlyZSgnLi4vdXRpbHMvd2hlbi1kb20tcmVhZHknKTtcbnZhciBzZWxlY3QgPSByZXF1aXJlKCcuLi91dGlscy9zZWxlY3QnKTtcbnZhciB2YWxpZGF0b3IgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3ZhbGlkYXRvcicpO1xudmFyIHRvZ2dsZUZvcm1JbnB1dCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvdG9nZ2xlLWZvcm0taW5wdXQnKTtcblxud2hlbkRPTVJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGVsU2hvd1Bhc3N3b3JkID0gc2VsZWN0KCcudXNhLXNob3dfcGFzc3dvcmQnKVsgMCBdO1xuICB2YXIgZWxGb3JtSW5wdXQgPSBzZWxlY3QoJy51c2Etc2hvd19tdWx0aXBhc3N3b3JkJylbIDAgXTtcbiAgdmFyIGVsVmFsaWRhdG9yID0gc2VsZWN0KCcuanMtdmFsaWRhdGVfcGFzc3dvcmQnKVsgMCBdO1xuXG4gIGVsU2hvd1Bhc3N3b3JkICYmIHRvZ2dsZUZvcm1JbnB1dChlbFNob3dQYXNzd29yZCwgJ1Nob3cgUGFzc3dvcmQnLCAnSGlkZSBQYXNzd29yZCcpO1xuICBlbEZvcm1JbnB1dCAmJiB0b2dnbGVGb3JtSW5wdXQoZWxGb3JtSW5wdXQsICdTaG93IG15IHR5cGluZycsICdIaWRlIG15IHR5cGluZycpO1xuICBlbFZhbGlkYXRvciAmJiB2YWxpZGF0b3IoZWxWYWxpZGF0b3IpO1xufSk7XG5cbiIsInZhciB3aGVuRE9NUmVhZHkgPSByZXF1aXJlKCcuLi91dGlscy93aGVuLWRvbS1yZWFkeScpO1xuXG53aGVuRE9NUmVhZHkoZnVuY3Rpb24gaW5pdEhlYWRlcnMgKCkge1xuXG4gIC8vIFNlYXJjaCBUb2dnbGVcbiAgcmVxdWlyZSgnLi4vY29tcG9uZW50cy9oZWFkZXIvc2VhcmNoJyk7XG5cbiAgLy8gTW9iaWxlIE5hdmlnYXRpb25cbiAgcmVxdWlyZSgnLi4vY29tcG9uZW50cy9oZWFkZXIvbW9iaWxlJyk7XG5cbn0pO1xuXG4iLCJ2YXIgdmVyaWZ5alF1ZXJ5ID0gcmVxdWlyZSgnLi4vdXRpbHMvdmVyaWZ5LWpxdWVyeScpO1xuXG4vLyBqUXVlcnkgUGx1Z2luXG5cbmlmICh2ZXJpZnlqUXVlcnkod2luZG93KSkge1xuXG4gIHZhciAkID0gd2luZG93LmpRdWVyeTtcblxuICAvLyBSRUFETUU6IFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgcG9saXRlc3BhY2UgZG9lc24ndCBwcm9wZXJseSBleHBvcnQgYW55dGhpbmdcbiAgLy8gaW4gaXRzIHBhY2thZ2UuanNvbi4gVE9ETzogTGV0J3Mgb3BlbiBhIFBSIHJlbGF0ZWQgdG8gdGhpcyBzbyB3ZSBjYW4gZml4IGl0IGluIFBvbGl0ZXNwYWNlLmpzXG4gIC8vXG4gIHZhciBQb2xpdGVzcGFjZSA9IHJlcXVpcmUoJy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb2xpdGVzcGFjZS9zcmMvcG9saXRlc3BhY2UnKS5Qb2xpdGVzcGFjZTtcblxuICB2YXIgY29tcG9uZW50TmFtZSA9ICdwb2xpdGVzcGFjZScsXG4gICAgZW5oYW5jZWRBdHRyID0gJ2RhdGEtZW5oYW5jZWQnLFxuICAgIGluaXRTZWxlY3RvciA9ICdbZGF0YS1cIiArIGNvbXBvbmVudE5hbWUgKyBcIl06bm90KFtcIiArIGVuaGFuY2VkQXR0ciArIFwiXSknO1xuXG4gICQuZm5bIGNvbXBvbmVudE5hbWUgXSA9IGZ1bmN0aW9uICgpe1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCl7XG4gICAgICB2YXIgcG9saXRlID0gbmV3IFBvbGl0ZXNwYWNlKHRoaXMpO1xuICAgICAgaWYocG9saXRlLnR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHBvbGl0ZS5jcmVhdGVQcm94eSgpO1xuICAgICAgfVxuXG4gICAgICAkKHRoaXMpXG4gICAgICAgIC5iaW5kKCdpbnB1dCBrZXlkb3duJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHBvbGl0ZS51cGRhdGVQcm94eSgpO1xuICAgICAgICB9KVxuICAgICAgICAuYmluZCgnYmx1cicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5wb2xpdGVzcGFjZS1wcm94eScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICBwb2xpdGUudXBkYXRlKCk7XG4gICAgICAgICAgcG9saXRlLnVwZGF0ZVByb3h5KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5iaW5kKCdmb2N1cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5wb2xpdGVzcGFjZS1wcm94eScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICBwb2xpdGUucmVzZXQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmRhdGEoY29tcG9uZW50TmFtZSwgcG9saXRlKTtcblxuICAgICAgcG9saXRlLnVwZGF0ZSgpO1xuICAgIH0pO1xuICB9O1xuXG5cdC8vIGF1dG8taW5pdCBvbiBlbmhhbmNlICh3aGljaCBpcyBjYWxsZWQgb24gZG9tcmVhZHkpXG4gICQoZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLScgKyBjb21wb25lbnROYW1lICsgJ10nKS5wb2xpdGVzcGFjZSgpO1xuICB9KTtcblxufVxuIiwiLyoqXG4gKiBUaGlzIGZpbGUgZGVmaW5lcyBrZXkgRUNNQVNjcmlwdCA1IG1ldGhvZHMgdGhhdCBhcmUgdXNlZCBieSB0aGUgU3RhbmRhcmRzXG4gKiBidXQgbWF5IGJlIG1pc3NpbmcgaW4gb2xkZXIgYnJvd3NlcnMuXG4gKi9cblxuLyoqXG4gKiBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCgpXG4gKiBUYWtlbiBmcm9tIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2ZvckVhY2hcbiAqL1xuXG4vLyBQcm9kdWN0aW9uIHN0ZXBzIG9mIEVDTUEtMjYyLCBFZGl0aW9uIDUsIDE1LjQuNC4xOFxuLy8gUmVmZXJlbmNlOiBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjQuNC4xOFxuaWYgKCFBcnJheS5wcm90b3R5cGUuZm9yRWFjaCkge1xuXG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG5cbiAgICB2YXIgVCwgaztcblxuICAgIGlmICh0aGlzID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcgdGhpcyBpcyBudWxsIG9yIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuXG4gICAgLy8gMS4gTGV0IE8gYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRvT2JqZWN0KCkgcGFzc2luZyB0aGVcbiAgICAvLyB8dGhpc3wgdmFsdWUgYXMgdGhlIGFyZ3VtZW50LlxuICAgIHZhciBPID0gT2JqZWN0KHRoaXMpO1xuXG4gICAgLy8gMi4gTGV0IGxlblZhbHVlIGJlIHRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGUgR2V0KCkgaW50ZXJuYWxcbiAgICAvLyBtZXRob2Qgb2YgTyB3aXRoIHRoZSBhcmd1bWVudCBcImxlbmd0aFwiLlxuICAgIC8vIDMuIExldCBsZW4gYmUgdG9VaW50MzIobGVuVmFsdWUpLlxuICAgIHZhciBsZW4gPSBPLmxlbmd0aCA+Pj4gMDtcblxuICAgIC8vIDQuIElmIGlzQ2FsbGFibGUoY2FsbGJhY2spIGlzIGZhbHNlLCB0aHJvdyBhIFR5cGVFcnJvciBleGNlcHRpb24uIFxuICAgIC8vIFNlZTogaHR0cDovL2VzNS5naXRodWIuY29tLyN4OS4xMVxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoY2FsbGJhY2sgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgLy8gNS4gSWYgdGhpc0FyZyB3YXMgc3VwcGxpZWQsIGxldCBUIGJlIHRoaXNBcmc7IGVsc2UgbGV0XG4gICAgLy8gVCBiZSB1bmRlZmluZWQuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICBUID0gdGhpc0FyZztcbiAgICB9XG5cbiAgICAvLyA2LiBMZXQgayBiZSAwXG4gICAgayA9IDA7XG5cbiAgICAvLyA3LiBSZXBlYXQsIHdoaWxlIGsgPCBsZW5cbiAgICB3aGlsZSAoayA8IGxlbikge1xuXG4gICAgICB2YXIga1ZhbHVlO1xuXG4gICAgICAvLyBhLiBMZXQgUGsgYmUgVG9TdHJpbmcoaykuXG4gICAgICAvLyAgICBUaGlzIGlzIGltcGxpY2l0IGZvciBMSFMgb3BlcmFuZHMgb2YgdGhlIGluIG9wZXJhdG9yXG4gICAgICAvLyBiLiBMZXQga1ByZXNlbnQgYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBIYXNQcm9wZXJ0eVxuICAgICAgLy8gICAgaW50ZXJuYWwgbWV0aG9kIG9mIE8gd2l0aCBhcmd1bWVudCBQay5cbiAgICAgIC8vICAgIFRoaXMgc3RlcCBjYW4gYmUgY29tYmluZWQgd2l0aCBjXG4gICAgICAvLyBjLiBJZiBrUHJlc2VudCBpcyB0cnVlLCB0aGVuXG4gICAgICBpZiAoayBpbiBPKSB7XG5cbiAgICAgICAgLy8gaS4gTGV0IGtWYWx1ZSBiZSB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIEdldCBpbnRlcm5hbFxuICAgICAgICAvLyBtZXRob2Qgb2YgTyB3aXRoIGFyZ3VtZW50IFBrLlxuICAgICAgICBrVmFsdWUgPSBPWyBrIF07XG5cbiAgICAgICAgLy8gaWkuIENhbGwgdGhlIENhbGwgaW50ZXJuYWwgbWV0aG9kIG9mIGNhbGxiYWNrIHdpdGggVCBhc1xuICAgICAgICAvLyB0aGUgdGhpcyB2YWx1ZSBhbmQgYXJndW1lbnQgbGlzdCBjb250YWluaW5nIGtWYWx1ZSwgaywgYW5kIE8uXG4gICAgICAgIGNhbGxiYWNrLmNhbGwoVCwga1ZhbHVlLCBrLCBPKTtcbiAgICAgIH1cbiAgICAgIC8vIGQuIEluY3JlYXNlIGsgYnkgMS5cbiAgICAgIGsrKztcbiAgICB9XG4gICAgLy8gOC4gcmV0dXJuIHVuZGVmaW5lZFxuICB9O1xufVxuXG5cbi8qKlxuICogRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQoKVxuICogVGFrZW4gZnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9GdW5jdGlvbi9iaW5kXG4gKi9cblxuLy8gUmVmZXJlbmNlOiBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjMuNC41XG5pZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSB7XG5cbiAgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAob1RoaXMpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIGNsb3Nlc3QgdGhpbmcgcG9zc2libGUgdG8gdGhlIEVDTUFTY3JpcHQgNVxuICAgICAgLy8gaW50ZXJuYWwgSXNDYWxsYWJsZSBmdW5jdGlvblxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgLSB3aGF0IGlzIHRyeWluZyB0byBiZSBib3VuZCBpcyBub3QgY2FsbGFibGUnKTtcbiAgICB9XG5cbiAgICB2YXIgYUFyZ3MgICA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICBmVG9CaW5kID0gdGhpcyxcbiAgICAgIGZOT1AgICAgPSBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIGZCb3VuZCAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmVG9CaW5kLmFwcGx5KHRoaXMgaW5zdGFuY2VvZiBmTk9QID8gdGhpcyA6IG9UaGlzLFxuICAgICAgICAgICAgICAgIGFBcmdzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICB9O1xuXG4gICAgaWYgKHRoaXMucHJvdG90eXBlKSB7XG4gICAgICAvLyBGdW5jdGlvbi5wcm90b3R5cGUgZG9lc24ndCBoYXZlIGEgcHJvdG90eXBlIHByb3BlcnR5XG4gICAgICBmTk9QLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlOyBcbiAgICB9XG4gICAgZkJvdW5kLnByb3RvdHlwZSA9IG5ldyBmTk9QKCk7XG5cbiAgICByZXR1cm4gZkJvdW5kO1xuICB9O1xuXG59XG4iLCJ2YXIgZGlzcGF0Y2ggPSByZXF1aXJlKCcuLi91dGlscy9kaXNwYXRjaCcpO1xudmFyIHNlbGVjdCA9IHJlcXVpcmUoJy4uL3V0aWxzL3NlbGVjdCcpO1xudmFyIHdoZW5ET01SZWFkeSA9IHJlcXVpcmUoJy4uL3V0aWxzL3doZW4tZG9tLXJlYWR5Jyk7XG5cbndoZW5ET01SZWFkeShmdW5jdGlvbiAoKSB7XG5cbiAgLy8gRml4aW5nIHNraXAgbmF2IGZvY3VzIGJlaGF2aW9yIGluIGNocm9tZVxuICB2YXIgZWxTa2lwbmF2ID0gc2VsZWN0KCcuc2tpcG5hdicpWyAwIF07XG4gIHZhciBlbE1haW5Db250ZW50ID0gc2VsZWN0KCcjbWFpbi1jb250ZW50JylbIDAgXTtcblxuICBpZiAoZWxTa2lwbmF2KSB7XG4gICAgZGlzcGF0Y2goZWxTa2lwbmF2LCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBlbE1haW5Db250ZW50LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKGVsTWFpbkNvbnRlbnQpIHtcbiAgICBkaXNwYXRjaChlbE1haW5Db250ZW50LCAnYmx1cicsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGVsTWFpbkNvbnRlbnQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xuICAgIH0pO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBUaGUgJ3BvbHlmaWxscycgZmlsZSBkZWZpbmVzIGtleSBFQ01BU2NyaXB0IDUgbWV0aG9kcyB0aGF0IG1heSBiZVxuICogbWlzc2luZyBmcm9tIG9sZGVyIGJyb3dzZXJzLCBzbyBtdXN0IGJlIGxvYWRlZCBmaXJzdC5cbiAqL1xucmVxdWlyZSgnLi9pbml0aWFsaXplcnMvcG9seWZpbGxzJyk7XG5yZXF1aXJlKCcuL2luaXRpYWxpemVycy9oZWFkZXInKTtcbnJlcXVpcmUoJy4vaW5pdGlhbGl6ZXJzL2FjY29yZGlvbnMnKTtcbnJlcXVpcmUoJy4vaW5pdGlhbGl6ZXJzL2Zvb3RlcicpO1xucmVxdWlyZSgnLi9pbml0aWFsaXplcnMvc2tpcC1uYXYnKTtcbnJlcXVpcmUoJy4vaW5pdGlhbGl6ZXJzL2Zvcm1zJyk7XG5yZXF1aXJlKCcuL2luaXRpYWxpemVycy9wb2xpdGVzcGFjZScpO1xuIiwiLyoqXG4gKiBBZGRzIGEgY2xhc3MgdG8gYSBnaXZlbiBIVE1MIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gVGhlIGVsZW1lbnQgdG8gd2hpY2ggdGhlIGNsYXNzIHdpbGwgYmUgYWRkZWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY2xhc3MgdG8gYWRkXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhZGRDbGFzcyAoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzTmFtZTtcbiAgfVxufTsiLCIvKipcbiAqIEF0dGFjaGVzIGEgZ2l2ZW4gbGlzdGVuZXIgZnVuY3Rpb24gdG8gYSBnaXZlbiBlbGVtZW50IHdoaWNoIGlzXG4gKiB0cmlnZ2VyZWQgYnkgYSBzcGVjaWZpZWQgbGlzdCBvZiBldmVudCB0eXBlcy5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSB0aGUgZWxlbWVudCB0byB3aGljaCB0aGUgbGlzdGVuZXIgd2lsbCBiZSBhdHRhY2hlZFxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZXMgLSBzcGFjZS1zZXBhcmF0ZWQgbGlzdCBvZiBldmVudCB0eXBlcyB3aGljaCB3aWxsIHRyaWdnZXIgdGhlIGxpc3RlbmVyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciAtIHRoZSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZFxuICogQHJldHVybnMge09iamVjdH0gLSBjb250YWluaW5nIGEgPHR0PnRyaWdnZXIoKTwvdHQ+IG1ldGhvZCBmb3IgZXhlY3V0aW5nIHRoZSBsaXN0ZW5lciwgYW5kIGFuIDx0dD5vZmYoKTwvdHQ+IG1ldGhvZCBmb3IgZGV0YWNoaW5nIGl0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2ggKGVsZW1lbnQsIGV2ZW50VHlwZXMsIGxpc3RlbmVyKSB7XG4gIHZhciBldmVudFR5cGVBcnJheSA9IGV2ZW50VHlwZXMuc3BsaXQoL1xccysvKTtcblxuICB2YXIgYXR0YWNoID0gZnVuY3Rpb24gKGUsIHQsIGQpIHtcbiAgICBpZiAoZS5hdHRhY2hFdmVudCkge1xuICAgICAgZS5hdHRhY2hFdmVudCgnb24nICsgdCwgZCk7XG4gICAgfVxuICAgIGlmIChlLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIGUuYWRkRXZlbnRMaXN0ZW5lcih0LCBkKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIHRyaWdnZXIgPSBmdW5jdGlvbiAoZSwgdCkge1xuICAgIHZhciBmYWtlRXZlbnQ7XG4gICAgaWYgKCdjcmVhdGVFdmVudCcgaW4gZG9jdW1lbnQpIHtcbiAgICAgIC8vIG1vZGVybiBicm93c2VycywgSUU5K1xuICAgICAgZmFrZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgIGZha2VFdmVudC5pbml0RXZlbnQodCwgZmFsc2UsIHRydWUpO1xuICAgICAgZS5kaXNwYXRjaEV2ZW50KGZha2VFdmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElFIDhcbiAgICAgIGZha2VFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gICAgICBmYWtlRXZlbnQuZXZlbnRUeXBlID0gdDtcbiAgICAgIGUuZmlyZUV2ZW50KCdvbicrZS5ldmVudFR5cGUsIGZha2VFdmVudCk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBkZXRhY2ggPSBmdW5jdGlvbiAoZSwgdCwgZCkge1xuICAgIGlmIChlLmRldGFjaEV2ZW50KSB7XG4gICAgICBlLmRldGFjaEV2ZW50KCdvbicgKyB0LCBkKTtcbiAgICB9XG4gICAgaWYgKGUucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgZS5yZW1vdmVFdmVudExpc3RlbmVyKHQsIGQpO1xuICAgIH1cbiAgfTtcblxuICBldmVudFR5cGVBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudFR5cGUpIHtcbiAgICBhdHRhY2guY2FsbChudWxsLCBlbGVtZW50LCBldmVudFR5cGUsIGxpc3RlbmVyKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICB0cmlnZ2VyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0cmlnZ2VyLmNhbGwobnVsbCwgZWxlbWVudCwgZXZlbnRUeXBlQXJyYXlbIDAgXSk7XG4gICAgfSxcbiAgICBvZmY6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGV2ZW50VHlwZUFycmF5LmZvckVhY2goZnVuY3Rpb24gKGV2ZW50VHlwZSkge1xuICAgICAgICBkZXRhY2guY2FsbChudWxsLCBlbGVtZW50LCBldmVudFR5cGUsIGxpc3RlbmVyKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH07XG59O1xuIiwiLyoqXG4gKiBSZW1vdmVzIGEgY2xhc3MgZnJvbSBhIGdpdmVuIEhUTUwgZWxlbWVudGVtZW50LlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIFRoZSBlbGVtZW50IGZyb20gd2hpY2ggdGhlIGNsYXNzIHdpbGwgYmUgcmVtb3ZlZFxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjbGFzcyB0byByZW1vdmVcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlbW92ZUNsYXNzIChlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgdmFyIGNsYXNzTGlzdCA9IGVsZW1lbnQuY2xhc3NMaXN0O1xuXG4gIGlmIChjbGFzc0xpc3QgIT09IHVuZGVmaW5lZCkge1xuICAgIGNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICBjbGFzc0xpc3QgPSBlbGVtZW50LmNsYXNzTmFtZS5zcGxpdCgvXFxzKy8pO1xuICAgIHZhciBuZXdDbGFzc0xpc3QgPSBbXTtcbiAgICBjbGFzc0xpc3QuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgaWYgKGMgIT09IGNsYXNzTmFtZSkge1xuICAgICAgICBuZXdDbGFzc0xpc3QucHVzaChjKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9IG5ld0NsYXNzTGlzdC5qb2luKCcgJyk7XG4gIH1cbn07XG4iLCIvKipcbiAqIEBuYW1lIHNlbGVjdFxuICogQGRlc2Mgc2VsZWN0cyBlbGVtZW50cyBmcm9tIHRoZSBET00gYnkgY2xhc3Mgc2VsZWN0b3Igb3IgSUQgc2VsZWN0b3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgLSBUaGUgc2VsZWN0b3IgdG8gdHJhdmVyc2UgdGhlIERPTSB3aXRoLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGV4dCAtIFRoZSBjb250ZXh0IHRvIHRyYXZlcnNlIHRoZSBET00gaW4uXG4gKiBAcmV0dXJuIHtBcnJheS5IVE1MRWxlbWVudH0gLSBBbiBhcnJheSBvZiBET00gbm9kZXMgb3IgYW4gZW1wdHkgYXJyYXkuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2VsZWN0IChzZWxlY3RvciwgY29udGV4dCkge1xuXG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgaWYgKChjb250ZXh0ID09PSB1bmRlZmluZWQpIHx8ICFpc0VsZW1lbnQoY29udGV4dCkpIHtcbiAgICBjb250ZXh0ID0gd2luZG93LmRvY3VtZW50O1xuICB9XG5cbiAgdmFyIHNlbGVjdGlvbiA9IGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHNlbGVjdGlvbik7XG5cbn07XG5cbmZ1bmN0aW9uIGlzRWxlbWVudCAodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5ub2RlVHlwZSA9PT0gMTtcbn0iLCIvKlxuICogQG5hbWUgdmVyaWZ5alF1ZXJ5XG4gKiBAZGVzYyBUZXN0cyB0aGUgZ2l2ZW4gaG9zdCBvYmplY3QgZm9yIHRoZSBwcmVzZW5jZSBvZiBqUXVlcnkuIElmIG5vXG4gKiAgICAgICBvYmplY3QgaXMgZ2l2ZW4sIHRoZSA8dHQ+d2luZG93PC90dD4gb2JqZWN0IGlzIHVzZWQuXG4gKiBAcGFyYW0ge29iamVjdH0gdyAtIE9iamVjdCB0byB0ZXN0IGZvciBqUXVlcnkuXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGpRdWVyeSBleGlzdHMgb24gdGhlIG9iamVjdC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB2ZXJpZnlqUXVlcnkgKHcpIHtcbiAgdyA9IHcgfHwgd2luZG93O1xuICByZXR1cm4gISEody5qUXVlcnkgJiYgdy5qUXVlcnkuZm4gJiYgdy5qUXVlcnkuZm4uanF1ZXJ5KTtcbn07IiwiLypcbiAqIEBuYW1lIERPTUxvYWRlZFxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2IgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gcnVuIHdoZW4gdGhlIERPTSBoYXMgbG9hZGVkLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIERPTUxvYWRlZCAoY2IpIHtcbiAgLy8gaW4gY2FzZSB0aGUgZG9jdW1lbnQgaXMgYWxyZWFkeSByZW5kZXJlZFxuICBpZiAoJ2xvYWRpbmcnICE9PSBkb2N1bWVudC5yZWFkeVN0YXRlKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY2IpKSB7XG4gICAgICBjYigpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7IC8vIG1vZGVybiBicm93c2Vyc1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBjYik7XG4gIH0gZWxzZSB7IC8vIElFIDw9IDhcbiAgICBkb2N1bWVudC5hdHRhY2hFdmVudCgnb25yZWFkeXN0YXRlY2hhbmdlJywgZnVuY3Rpb24gKCl7XG4gICAgICBpZiAoJ2NvbXBsZXRlJyA9PT0gZG9jdW1lbnQucmVhZHlTdGF0ZSkge1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihjYikpIHtcbiAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24gKGFyZykge1xuICByZXR1cm4gKHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbicpO1xufSJdfQ==
