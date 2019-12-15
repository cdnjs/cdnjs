(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom'), require('react-popper'), require('react-transition-group/Transition')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom', 'react-popper', 'react-transition-group/Transition'], factory) :
	(factory((global.Reactstrap = global.Reactstrap || {}),global.React,global.ReactDOM,global.ReactPopper || undefined,global.ReactTransitionGroup && global.ReactTransitionGroup.Transition || undefined));
}(this, (function (exports,React,ReactDOM,reactPopper,Transition) { 'use strict';

var React__default = 'default' in React ? React['default'] : React;
ReactDOM = ReactDOM && 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;
Transition = Transition && 'default' in Transition ? Transition['default'] : Transition;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var invariant_1 = invariant;

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
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
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
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
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

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var factoryWithThrowingShims = function factoryWithThrowingShims() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    invariant_1(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes$1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    // By explicitly using `prop-types` you are opting into new production behavior.
    // http://fb.me/prop-types-in-prod
    module.exports = factoryWithThrowingShims();
  }
});

var classnames = createCommonjsModule(function (module) {
	/*!
   Copyright (c) 2016 Jed Watson.
   Licensed under the MIT License (MIT), see
   http://jedwatson.github.io/classnames
 */
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames() {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if ('object' !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (typeof undefined === 'function' && _typeof(undefined.amd) === 'object' && undefined.amd) {
			// register as 'classnames', consistent with npm package name
			undefined('classnames', [], function () {
				return classNames;
			});
		} else {
			window.classNames = classNames;
		}
	})();
});

/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]';
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var nullTag = '[object Null]';
var proxyTag = '[object Proxy]';
var undefinedTag = '[object Undefined]';

/** Detect free variable `global` from Node.js. */
var freeGlobal = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var _Symbol = root.Symbol;
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

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
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$1.call(value, symToStringTag),
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

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

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
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
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
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return value != null && (type == 'object' || type == 'function');
}

var lodash_isfunction = isFunction;

// https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/js/src/modal.js#L436-L443
function getScrollbarWidth() {
  var scrollDiv = document.createElement('div');
  // .modal-scrollbar-measure styles // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/scss/_modal.scss#L106-L113
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}

function setScrollbarWidth(padding) {
  document.body.style.paddingRight = padding > 0 ? padding + 'px' : null;
}

function isBodyOverflowing() {
  return document.body.clientWidth < window.innerWidth;
}

function getOriginalBodyPadding() {
  var style = window.getComputedStyle(document.body, null);

  return parseInt(style && style.getPropertyValue('padding-right') || 0, 10);
}

function conditionallyUpdateScrollbar() {
  var scrollbarWidth = getScrollbarWidth();
  // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.6/js/src/modal.js#L433
  var fixedContent = document.querySelectorAll('.fixed-top, .fixed-bottom, .is-fixed, .sticky-top')[0];
  var bodyPadding = fixedContent ? parseInt(fixedContent.style.paddingRight || 0, 10) : 0;

  if (isBodyOverflowing()) {
    setScrollbarWidth(bodyPadding + scrollbarWidth);
  }
}

var globalCssModule = void 0;

function setGlobalCssModule(cssModule) {
  globalCssModule = cssModule;
}

function mapToCssModules() {
  var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var cssModule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalCssModule;

  if (!cssModule) return className;
  return className.split(' ').map(function (c) {
    return cssModule[c] || c;
  }).join(' ');
}

/**
 * Returns a new object with the key/value pairs from `obj` that are not in the array `omitKeys`.
 */
function omit(obj, omitKeys) {
  var result = {};
  Object.keys(obj).forEach(function (key) {
    if (omitKeys.indexOf(key) === -1) {
      result[key] = obj[key];
    }
  });
  return result;
}

/**
 * Returns a filtered copy of an object with only the specified keys.
 */
function pick(obj, keys) {
  var pickKeys = Array.isArray(keys) ? keys : [keys];
  var length = pickKeys.length;
  var key = void 0;
  var result = {};

  while (length > 0) {
    length -= 1;
    key = pickKeys[length];
    result[key] = obj[key];
  }
  return result;
}

var warned = {};

function warnOnce(message) {
  if (!warned[message]) {
    /* istanbul ignore else */
    if (typeof console !== 'undefined') {
      console.error(message); // eslint-disable-line no-console
    }
    warned[message] = true;
  }
}

function deprecated(propType, explanation) {
  return function validate(props, propName, componentName) {
    if (props[propName] !== null && typeof props[propName] !== 'undefined') {
      warnOnce('"' + propName + '" property of "' + componentName + '" has been deprecated.\n' + explanation);
    }

    for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      rest[_key - 3] = arguments[_key];
    }

    return propType.apply(undefined, [props, propName, componentName].concat(rest));
  };
}

function DOMElement(props, propName, componentName) {
  if (!(props[propName] instanceof Element)) {
    return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`. Expected prop to be an instance of Element. Validation failed.');
  }
}

function getTarget(target) {
  if (lodash_isfunction(target)) {
    return target();
  }

  if (typeof target === 'string' && document) {
    var selection = document.querySelector(target);
    if (selection === null) {
      selection = document.querySelector('#' + target);
    }
    if (selection === null) {
      throw new Error('The target \'' + target + '\' could not be identified in the dom, tip: check spelling');
    }
    return selection;
  }

  return target;
}

/* eslint key-spacing: ["error", { afterColon: true, align: "value" }] */
// These are all setup to match what is in the bootstrap _variables.scss
// https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss
var TransitionTimeouts = {
  Fade: 150, // $transition-fade
  Collapse: 350, // $transition-collapse
  Modal: 300, // $modal-transition
  Carousel: 600 // $carousel-transition
};

// Duplicated Transition.propType keys to ensure that Reactstrap builds
// for distribution properly exclude these keys for nested child HTML attributes
// since `react-transition-group` removes propTypes in production builds.
var TransitionPropTypeKeys = ['in', 'mountOnEnter', 'unmountOnExit', 'appear', 'enter', 'exit', 'timeout', 'onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];

var TransitionStatuses = {
  ENTERING: 'entering',
  ENTERED: 'entered',
  EXITING: 'exiting',
  EXITED: 'exited'
};

var keyCodes = {
  esc: 27,
  space: 32,
  tab: 9,
  up: 38,
  down: 40
};

var PopperPlacements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var utils = Object.freeze({
	getScrollbarWidth: getScrollbarWidth,
	setScrollbarWidth: setScrollbarWidth,
	isBodyOverflowing: isBodyOverflowing,
	getOriginalBodyPadding: getOriginalBodyPadding,
	conditionallyUpdateScrollbar: conditionallyUpdateScrollbar,
	setGlobalCssModule: setGlobalCssModule,
	mapToCssModules: mapToCssModules,
	omit: omit,
	pick: pick,
	warnOnce: warnOnce,
	deprecated: deprecated,
	DOMElement: DOMElement,
	getTarget: getTarget,
	TransitionTimeouts: TransitionTimeouts,
	TransitionPropTypeKeys: TransitionPropTypeKeys,
	TransitionStatuses: TransitionStatuses,
	keyCodes: keyCodes,
	PopperPlacements: PopperPlacements,
	canUseDOM: canUseDOM
});

var propTypes = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  fluid: propTypes$1.bool,
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps = {
  tag: 'div'
};

var Container = function Container(props) {
  var className = props.className,
      cssModule = props.cssModule,
      fluid = props.fluid,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'fluid', 'tag']);


  var classes = mapToCssModules(classnames(className, fluid ? 'container-fluid' : 'container'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

var propTypes$2 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  noGutters: propTypes$1.bool,
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$1 = {
  tag: 'div'
};

var Row = function Row(props) {
  var className = props.className,
      cssModule = props.cssModule,
      noGutters = props.noGutters,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'noGutters', 'tag']);


  var classes = mapToCssModules(classnames(className, noGutters ? 'no-gutters' : null, 'row'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

Row.propTypes = propTypes$2;
Row.defaultProps = defaultProps$1;

/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
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
 * _.isObject(1);
 * // => false
 */
function isObject$1(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return !!value && (type == 'object' || type == 'function');
}

var lodash_isobject = isObject$1;

var colWidths = ['xs', 'sm', 'md', 'lg', 'xl'];
var stringOrNumberProp = propTypes$1.oneOfType([propTypes$1.number, propTypes$1.string]);

var columnProps = propTypes$1.oneOfType([propTypes$1.bool, propTypes$1.number, propTypes$1.string, propTypes$1.shape({
  size: propTypes$1.oneOfType([propTypes$1.bool, propTypes$1.number, propTypes$1.string]),
  push: deprecated(stringOrNumberProp, 'Please use the prop "order"'),
  pull: deprecated(stringOrNumberProp, 'Please use the prop "order"'),
  order: stringOrNumberProp,
  offset: stringOrNumberProp
})]);

var propTypes$3 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  xs: columnProps,
  sm: columnProps,
  md: columnProps,
  lg: columnProps,
  xl: columnProps,
  className: propTypes$1.string,
  cssModule: propTypes$1.object,
  widths: propTypes$1.array
};

var defaultProps$2 = {
  tag: 'div',
  widths: colWidths
};

var getColumnSizeClass = function getColumnSizeClass(isXs, colWidth, colSize) {
  if (colSize === true || colSize === '') {
    return isXs ? 'col' : 'col-' + colWidth;
  } else if (colSize === 'auto') {
    return isXs ? 'col-auto' : 'col-' + colWidth + '-auto';
  }

  return isXs ? 'col-' + colSize : 'col-' + colWidth + '-' + colSize;
};

var Col = function Col(props) {
  var className = props.className,
      cssModule = props.cssModule,
      widths = props.widths,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'widths', 'tag']);

  var colClasses = [];

  widths.forEach(function (colWidth, i) {
    var columnProp = props[colWidth];

    delete attributes[colWidth];

    if (!columnProp && columnProp !== '') {
      return;
    }

    var isXs = !i;

    if (lodash_isobject(columnProp)) {
      var _classNames;

      var colSizeInterfix = isXs ? '-' : '-' + colWidth + '-';
      var colClass = getColumnSizeClass(isXs, colWidth, columnProp.size);

      colClasses.push(mapToCssModules(classnames((_classNames = {}, defineProperty(_classNames, colClass, columnProp.size || columnProp.size === ''), defineProperty(_classNames, 'order' + colSizeInterfix + columnProp.order, columnProp.order || columnProp.order === 0), defineProperty(_classNames, 'offset' + colSizeInterfix + columnProp.offset, columnProp.offset || columnProp.offset === 0), _classNames)), cssModule));
    } else {
      var _colClass = getColumnSizeClass(isXs, colWidth, columnProp);
      colClasses.push(_colClass);
    }
  });

  if (!colClasses.length) {
    colClasses.push('col');
  }

  var classes = mapToCssModules(classnames(className, colClasses), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

Col.propTypes = propTypes$3;
Col.defaultProps = defaultProps$2;

var propTypes$4 = {
  light: propTypes$1.bool,
  dark: propTypes$1.bool,
  inverse: deprecated(propTypes$1.bool, 'Please use the prop "dark"'),
  full: propTypes$1.bool,
  fixed: propTypes$1.string,
  sticky: propTypes$1.string,
  color: propTypes$1.string,
  role: propTypes$1.string,
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object,
  toggleable: deprecated(propTypes$1.oneOfType([propTypes$1.bool, propTypes$1.string]), 'Please use the prop "expand"'),
  expand: propTypes$1.oneOfType([propTypes$1.bool, propTypes$1.string])
};

var defaultProps$3 = {
  tag: 'nav',
  expand: false
};

var getExpandClass = function getExpandClass(expand) {
  if (expand === false) {
    return false;
  } else if (expand === true || expand === 'xs') {
    return 'navbar-expand';
  }

  return 'navbar-expand-' + expand;
};

// To better maintain backwards compatibility while toggleable is deprecated.
// We must map breakpoints to the next breakpoint so that toggleable and expand do the same things at the same breakpoint.
var toggleableToExpand = {
  xs: 'sm',
  sm: 'md',
  md: 'lg',
  lg: 'xl'
};

var getToggleableClass = function getToggleableClass(toggleable) {
  if (toggleable === undefined || toggleable === 'xl') {
    return false;
  } else if (toggleable === false) {
    return 'navbar-expand';
  }

  return 'navbar-expand-' + (toggleable === true ? 'sm' : toggleableToExpand[toggleable] || toggleable);
};

var Navbar = function Navbar(props) {
  var _classNames;

  var toggleable = props.toggleable,
      expand = props.expand,
      className = props.className,
      cssModule = props.cssModule,
      light = props.light,
      dark = props.dark,
      inverse = props.inverse,
      fixed = props.fixed,
      sticky = props.sticky,
      color = props.color,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['toggleable', 'expand', 'className', 'cssModule', 'light', 'dark', 'inverse', 'fixed', 'sticky', 'color', 'tag']);


  var classes = mapToCssModules(classnames(className, 'navbar', getExpandClass(expand) || getToggleableClass(toggleable), (_classNames = {
    'navbar-light': light,
    'navbar-dark': inverse || dark
  }, defineProperty(_classNames, 'bg-' + color, color), defineProperty(_classNames, 'fixed-' + fixed, fixed), defineProperty(_classNames, 'sticky-' + sticky, sticky), _classNames)), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

Navbar.propTypes = propTypes$4;
Navbar.defaultProps = defaultProps$3;

var propTypes$5 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$4 = {
  tag: 'a'
};

var NavbarBrand = function NavbarBrand(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);


  var classes = mapToCssModules(classnames(className, 'navbar-brand'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

NavbarBrand.propTypes = propTypes$5;
NavbarBrand.defaultProps = defaultProps$4;

var propTypes$6 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  type: propTypes$1.string,
  className: propTypes$1.string,
  cssModule: propTypes$1.object,
  children: propTypes$1.node
};

var defaultProps$5 = {
  tag: 'button',
  type: 'button'
};

var NavbarToggler = function NavbarToggler(props) {
  var className = props.className,
      cssModule = props.cssModule,
      children = props.children,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'children', 'tag']);


  var classes = mapToCssModules(classnames(className, 'navbar-toggler'), cssModule);

  return React__default.createElement(
    Tag,
    _extends({}, attributes, { className: classes }),
    children || React__default.createElement('span', { className: mapToCssModules('navbar-toggler-icon', cssModule) })
  );
};

NavbarToggler.propTypes = propTypes$6;
NavbarToggler.defaultProps = defaultProps$5;

var propTypes$7 = {
  tabs: propTypes$1.bool,
  pills: propTypes$1.bool,
  vertical: propTypes$1.oneOfType([propTypes$1.bool, propTypes$1.string]),
  horizontal: propTypes$1.string,
  justified: propTypes$1.bool,
  fill: propTypes$1.bool,
  navbar: propTypes$1.bool,
  card: propTypes$1.bool,
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$6 = {
  tag: 'ul',
  vertical: false
};

var getVerticalClass = function getVerticalClass(vertical) {
  if (vertical === false) {
    return false;
  } else if (vertical === true || vertical === 'xs') {
    return 'flex-column';
  }

  return 'flex-' + vertical + '-column';
};

var Nav = function Nav(props) {
  var className = props.className,
      cssModule = props.cssModule,
      tabs = props.tabs,
      pills = props.pills,
      vertical = props.vertical,
      horizontal = props.horizontal,
      justified = props.justified,
      fill = props.fill,
      navbar = props.navbar,
      card = props.card,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tabs', 'pills', 'vertical', 'horizontal', 'justified', 'fill', 'navbar', 'card', 'tag']);


  var classes = mapToCssModules(classnames(className, navbar ? 'navbar-nav' : 'nav', horizontal ? 'justify-content-' + horizontal : false, getVerticalClass(vertical), {
    'nav-tabs': tabs,
    'card-header-tabs': card && tabs,
    'nav-pills': pills,
    'card-header-pills': card && pills,
    'nav-justified': justified,
    'nav-fill': fill
  }), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

Nav.propTypes = propTypes$7;
Nav.defaultProps = defaultProps$6;

var propTypes$8 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  active: propTypes$1.bool,
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$7 = {
  tag: 'li'
};

var NavItem = function NavItem(props) {
  var className = props.className,
      cssModule = props.cssModule,
      active = props.active,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'active', 'tag']);


  var classes = mapToCssModules(classnames(className, 'nav-item', active ? 'active' : false), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

NavItem.propTypes = propTypes$8;
NavItem.defaultProps = defaultProps$7;

/* eslint react/no-find-dom-node: 0 */
// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md

var propTypes$9 = {
  disabled: propTypes$1.bool,
  dropup: deprecated(propTypes$1.bool, 'Please use the prop "direction" with the value "up".'),
  direction: propTypes$1.oneOf(['up', 'down', 'left', 'right']),
  group: propTypes$1.bool,
  isOpen: propTypes$1.bool,
  nav: propTypes$1.bool,
  active: propTypes$1.bool,
  addonType: propTypes$1.oneOfType([propTypes$1.bool, propTypes$1.oneOf(['prepend', 'append'])]),
  size: propTypes$1.string,
  tag: propTypes$1.string,
  toggle: propTypes$1.func,
  children: propTypes$1.node,
  className: propTypes$1.string,
  cssModule: propTypes$1.object,
  inNavbar: propTypes$1.bool,
  setActiveFromChild: propTypes$1.bool
};

var defaultProps$8 = {
  isOpen: false,
  direction: 'down',
  nav: false,
  active: false,
  addonType: false,
  inNavbar: false,
  setActiveFromChild: false
};

var childContextTypes = {
  toggle: propTypes$1.func.isRequired,
  isOpen: propTypes$1.bool.isRequired,
  direction: propTypes$1.oneOf(['up', 'down', 'left', 'right']).isRequired,
  inNavbar: propTypes$1.bool.isRequired
};

var Dropdown = function (_React$Component) {
  inherits(Dropdown, _React$Component);

  function Dropdown(props) {
    classCallCheck(this, Dropdown);

    var _this = possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this.addEvents = _this.addEvents.bind(_this);
    _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.removeEvents = _this.removeEvents.bind(_this);
    _this.toggle = _this.toggle.bind(_this);
    return _this;
  }

  createClass(Dropdown, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        toggle: this.props.toggle,
        isOpen: this.props.isOpen,
        direction: this.props.direction === 'down' && this.props.dropup ? 'up' : this.props.direction,
        inNavbar: this.props.inNavbar
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleProps();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.isOpen !== prevProps.isOpen) {
        this.handleProps();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeEvents();
    }
  }, {
    key: 'getContainer',
    value: function getContainer() {
      return ReactDOM.findDOMNode(this);
    }
  }, {
    key: 'addEvents',
    value: function addEvents() {
      var _this2 = this;

      ['click', 'touchstart', 'keyup'].forEach(function (event) {
        return document.addEventListener(event, _this2.handleDocumentClick, true);
      });
    }
  }, {
    key: 'removeEvents',
    value: function removeEvents() {
      var _this3 = this;

      ['click', 'touchstart', 'keyup'].forEach(function (event) {
        return document.removeEventListener(event, _this3.handleDocumentClick, true);
      });
    }
  }, {
    key: 'handleDocumentClick',
    value: function handleDocumentClick(e) {
      if (e && (e.which === 3 || e.type === 'keyup' && e.which !== keyCodes.tab)) return;
      var container = this.getContainer();

      if (container.contains(e.target) && container !== e.target && (e.type !== 'keyup' || e.which === keyCodes.tab)) {
        return;
      }

      this.toggle(e);
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      if ([keyCodes.esc, keyCodes.up, keyCodes.down, keyCodes.space].indexOf(e.which) === -1 || /button/i.test(e.target.tagName) && e.which === keyCodes.space || /input|textarea/i.test(e.target.tagName)) {
        return;
      }

      e.preventDefault();
      if (this.props.disabled) return;

      var container = this.getContainer();

      if (e.which === keyCodes.space && this.props.isOpen && container !== e.target) {
        e.target.click();
      }

      if (e.which === keyCodes.esc || !this.props.isOpen) {
        this.toggle(e);
        container.querySelector('[aria-expanded]').focus();
        return;
      }

      var menuClass = mapToCssModules('dropdown-menu', this.props.cssModule);
      var itemClass = mapToCssModules('dropdown-item', this.props.cssModule);
      var disabledClass = mapToCssModules('disabled', this.props.cssModule);

      var items = container.querySelectorAll('.' + menuClass + ' .' + itemClass + ':not(.' + disabledClass + ')');

      if (!items.length) return;

      var index = -1;
      for (var i = 0; i < items.length; i += 1) {
        if (items[i] === e.target) {
          index = i;
          break;
        }
      }

      if (e.which === keyCodes.up && index > 0) {
        index -= 1;
      }

      if (e.which === keyCodes.down && index < items.length - 1) {
        index += 1;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    }
  }, {
    key: 'handleProps',
    value: function handleProps() {
      if (this.props.isOpen) {
        this.addEvents();
      } else {
        this.removeEvents();
      }
    }
  }, {
    key: 'toggle',
    value: function toggle(e) {
      if (this.props.disabled) {
        return e && e.preventDefault();
      }

      return this.props.toggle(e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _omit = omit(this.props, ['toggle', 'disabled', 'inNavbar', 'direction']),
          className = _omit.className,
          cssModule = _omit.cssModule,
          dropup = _omit.dropup,
          isOpen = _omit.isOpen,
          group = _omit.group,
          size = _omit.size,
          nav = _omit.nav,
          setActiveFromChild = _omit.setActiveFromChild,
          active = _omit.active,
          addonType = _omit.addonType,
          attrs = objectWithoutProperties(_omit, ['className', 'cssModule', 'dropup', 'isOpen', 'group', 'size', 'nav', 'setActiveFromChild', 'active', 'addonType']);

      var direction = this.props.direction === 'down' && dropup ? 'up' : this.props.direction;

      attrs.tag = attrs.tag || (nav ? 'li' : 'div');

      var subItemIsActive = false;
      if (setActiveFromChild) {
        React__default.Children.map(this.props.children[1].props.children, function (dropdownItem) {
          if (dropdownItem.props.active) subItemIsActive = true;
        });
      }

      var classes = mapToCssModules(classnames(className, direction !== 'down' && 'drop' + direction, nav && active ? 'active' : false, setActiveFromChild && subItemIsActive ? 'active' : false, (_classNames = {}, defineProperty(_classNames, 'input-group-' + addonType, addonType), defineProperty(_classNames, 'btn-group', group), defineProperty(_classNames, 'btn-group-' + size, !!size), defineProperty(_classNames, 'dropdown', !group && !addonType), defineProperty(_classNames, 'show', isOpen), defineProperty(_classNames, 'nav-item', nav), _classNames)), cssModule);

      return React__default.createElement(reactPopper.Manager, _extends({}, attrs, { className: classes, onKeyDown: this.handleKeyDown }));
    }
  }]);
  return Dropdown;
}(React__default.Component);

Dropdown.propTypes = propTypes$9;
Dropdown.defaultProps = defaultProps$8;
Dropdown.childContextTypes = childContextTypes;

function NavDropdown(props) {
  warnOnce('The "NavDropdown" component has been deprecated.\nPlease use component "Dropdown" with nav prop.');
  return React__default.createElement(Dropdown, _extends({ nav: true }, props));
}

var propTypes$10 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  innerRef: propTypes$1.oneOfType([propTypes$1.object, propTypes$1.func, propTypes$1.string]),
  disabled: propTypes$1.bool,
  active: propTypes$1.bool,
  className: propTypes$1.string,
  cssModule: propTypes$1.object,
  onClick: propTypes$1.func,
  href: propTypes$1.any
};

var defaultProps$9 = {
  tag: 'a'
};

var NavLink = function (_React$Component) {
  inherits(NavLink, _React$Component);

  function NavLink(props) {
    classCallCheck(this, NavLink);

    var _this = possibleConstructorReturn(this, (NavLink.__proto__ || Object.getPrototypeOf(NavLink)).call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  createClass(NavLink, [{
    key: 'onClick',
    value: function onClick(e) {
      if (this.props.disabled) {
        e.preventDefault();
        return;
      }

      if (this.props.href === '#') {
        e.preventDefault();
      }

      if (this.props.onClick) {
        this.props.onClick(e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          cssModule = _props.cssModule,
          active = _props.active,
          Tag = _props.tag,
          innerRef = _props.innerRef,
          attributes = objectWithoutProperties(_props, ['className', 'cssModule', 'active', 'tag', 'innerRef']);


      var classes = mapToCssModules(classnames(className, 'nav-link', {
        disabled: attributes.disabled,
        active: active
      }), cssModule);

      return React__default.createElement(Tag, _extends({}, attributes, { ref: innerRef, onClick: this.onClick, className: classes }));
    }
  }]);
  return NavLink;
}(React__default.Component);

NavLink.propTypes = propTypes$10;
NavLink.defaultProps = defaultProps$9;

var propTypes$11 = {
  tag: propTypes$1.string,
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$10 = {
  tag: 'ol'
};

var Breadcrumb = function Breadcrumb(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

  var classes = mapToCssModules(classnames(className, 'breadcrumb'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

Breadcrumb.propTypes = propTypes$11;
Breadcrumb.defaultProps = defaultProps$10;

var propTypes$12 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  active: propTypes$1.bool,
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$11 = {
  tag: 'li'
};

var BreadcrumbItem = function BreadcrumbItem(props) {
  var className = props.className,
      cssModule = props.cssModule,
      active = props.active,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'active', 'tag']);

  var classes = mapToCssModules(classnames(className, active ? 'active' : false, 'breadcrumb-item'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

BreadcrumbItem.propTypes = propTypes$12;
BreadcrumbItem.defaultProps = defaultProps$11;

var propTypes$13 = {
  active: propTypes$1.bool,
  block: propTypes$1.bool,
  color: propTypes$1.string,
  disabled: propTypes$1.bool,
  outline: propTypes$1.bool,
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  innerRef: propTypes$1.oneOfType([propTypes$1.object, propTypes$1.func, propTypes$1.string]),
  onClick: propTypes$1.func,
  size: propTypes$1.string,
  children: propTypes$1.node,
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$12 = {
  color: 'secondary',
  tag: 'button'
};

var Button = function (_React$Component) {
  inherits(Button, _React$Component);

  function Button(props) {
    classCallCheck(this, Button);

    var _this = possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  createClass(Button, [{
    key: 'onClick',
    value: function onClick(e) {
      if (this.props.disabled) {
        e.preventDefault();
        return;
      }

      if (this.props.onClick) {
        this.props.onClick(e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          active = _props.active,
          block = _props.block,
          className = _props.className,
          cssModule = _props.cssModule,
          color = _props.color,
          outline = _props.outline,
          size = _props.size,
          Tag = _props.tag,
          innerRef = _props.innerRef,
          attributes = objectWithoutProperties(_props, ['active', 'block', 'className', 'cssModule', 'color', 'outline', 'size', 'tag', 'innerRef']);


      var classes = mapToCssModules(classnames(className, 'btn', 'btn' + (outline ? '-outline' : '') + '-' + color, size ? 'btn-' + size : false, block ? 'btn-block' : false, { active: active, disabled: this.props.disabled }), cssModule);

      if (attributes.href && Tag === 'button') {
        Tag = 'a';
      }

      return React__default.createElement(Tag, _extends({
        type: Tag === 'button' && attributes.onClick ? 'button' : undefined
      }, attributes, {
        className: classes,
        ref: innerRef,
        onClick: this.onClick
      }));
    }
  }]);
  return Button;
}(React__default.Component);

Button.propTypes = propTypes$13;
Button.defaultProps = defaultProps$12;

var propTypes$14 = {
  children: propTypes$1.node
};

var ButtonDropdown = function ButtonDropdown(props) {
  return React__default.createElement(Dropdown, _extends({ group: true }, props));
};

ButtonDropdown.propTypes = propTypes$14;

var propTypes$15 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  'aria-label': propTypes$1.string,
  className: propTypes$1.string,
  cssModule: propTypes$1.object,
  role: propTypes$1.string,
  size: propTypes$1.string,
  vertical: propTypes$1.bool
};

var defaultProps$13 = {
  tag: 'div',
  role: 'group'
};

var ButtonGroup = function ButtonGroup(props) {
  var className = props.className,
      cssModule = props.cssModule,
      size = props.size,
      vertical = props.vertical,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'size', 'vertical', 'tag']);


  var classes = mapToCssModules(classnames(className, size ? 'btn-group-' + size : false, vertical ? 'btn-group-vertical' : 'btn-group'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

ButtonGroup.propTypes = propTypes$15;
ButtonGroup.defaultProps = defaultProps$13;

var propTypes$16 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  'aria-label': propTypes$1.string,
  className: propTypes$1.string,
  cssModule: propTypes$1.object,
  role: propTypes$1.string
};

var defaultProps$14 = {
  tag: 'div',
  role: 'toolbar'
};

var ButtonToolbar = function ButtonToolbar(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);


  var classes = mapToCssModules(classnames(className, 'btn-toolbar'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

ButtonToolbar.propTypes = propTypes$16;
ButtonToolbar.defaultProps = defaultProps$14;

var propTypes$17 = {
  children: propTypes$1.node,
  active: propTypes$1.bool,
  disabled: propTypes$1.bool,
  divider: propTypes$1.bool,
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  header: propTypes$1.bool,
  onClick: propTypes$1.func,
  className: propTypes$1.string,
  cssModule: propTypes$1.object,
  toggle: propTypes$1.bool
};

var contextTypes = {
  toggle: propTypes$1.func
};

var defaultProps$15 = {
  tag: 'button',
  toggle: true
};

var DropdownItem = function (_React$Component) {
  inherits(DropdownItem, _React$Component);

  function DropdownItem(props) {
    classCallCheck(this, DropdownItem);

    var _this = possibleConstructorReturn(this, (DropdownItem.__proto__ || Object.getPrototypeOf(DropdownItem)).call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    _this.getTabIndex = _this.getTabIndex.bind(_this);
    return _this;
  }

  createClass(DropdownItem, [{
    key: 'onClick',
    value: function onClick(e) {
      if (this.props.disabled || this.props.header || this.props.divider) {
        e.preventDefault();
        return;
      }

      if (this.props.onClick) {
        this.props.onClick(e);
      }

      if (this.props.toggle) {
        this.context.toggle(e);
      }
    }
  }, {
    key: 'getTabIndex',
    value: function getTabIndex() {
      if (this.props.disabled || this.props.header || this.props.divider) {
        return '-1';
      }

      return '0';
    }
  }, {
    key: 'render',
    value: function render() {
      var tabIndex = this.getTabIndex();

      var _omit = omit(this.props, ['toggle']),
          className = _omit.className,
          cssModule = _omit.cssModule,
          divider = _omit.divider,
          Tag = _omit.tag,
          header = _omit.header,
          active = _omit.active,
          props = objectWithoutProperties(_omit, ['className', 'cssModule', 'divider', 'tag', 'header', 'active']);

      var classes = mapToCssModules(classnames(className, {
        disabled: props.disabled,
        'dropdown-item': !divider && !header,
        active: active,
        'dropdown-header': header,
        'dropdown-divider': divider
      }), cssModule);

      if (Tag === 'button') {
        if (header) {
          Tag = 'h6';
        } else if (divider) {
          Tag = 'div';
        } else if (props.href) {
          Tag = 'a';
        }
      }

      return React__default.createElement(Tag, _extends({
        type: Tag === 'button' && (props.onClick || this.props.toggle) ? 'button' : undefined
      }, props, {
        tabIndex: tabIndex,
        className: classes,
        onClick: this.onClick
      }));
    }
  }]);
  return DropdownItem;
}(React__default.Component);

DropdownItem.propTypes = propTypes$17;
DropdownItem.defaultProps = defaultProps$15;
DropdownItem.contextTypes = contextTypes;

var propTypes$18 = {
  tag: propTypes$1.string,
  children: propTypes$1.node.isRequired,
  right: propTypes$1.bool,
  flip: propTypes$1.bool,
  modifiers: propTypes$1.object,
  className: propTypes$1.string,
  cssModule: propTypes$1.object,
  persist: propTypes$1.bool
};

var defaultProps$16 = {
  tag: 'div',
  flip: true
};

var contextTypes$1 = {
  isOpen: propTypes$1.bool.isRequired,
  direction: propTypes$1.oneOf(['up', 'down', 'left', 'right']).isRequired,
  inNavbar: propTypes$1.bool.isRequired
};

var noFlipModifier = { flip: { enabled: false } };

var directionPositionMap = {
  up: 'top',
  left: 'left',
  right: 'right',
  down: 'bottom'
};

var DropdownMenu = function DropdownMenu(props, context) {
  var className = props.className,
      cssModule = props.cssModule,
      right = props.right,
      tag = props.tag,
      flip = props.flip,
      modifiers = props.modifiers,
      persist = props.persist,
      attrs = objectWithoutProperties(props, ['className', 'cssModule', 'right', 'tag', 'flip', 'modifiers', 'persist']);

  var classes = mapToCssModules(classnames(className, 'dropdown-menu', {
    'dropdown-menu-right': right,
    show: context.isOpen
  }), cssModule);

  var Tag = tag;

  if (persist || context.isOpen && !context.inNavbar) {
    Tag = reactPopper.Popper;

    var position1 = directionPositionMap[context.direction] || 'bottom';
    var position2 = right ? 'end' : 'start';
    attrs.placement = position1 + '-' + position2;
    attrs.component = tag;
    attrs.modifiers = !flip ? _extends({}, modifiers, noFlipModifier) : modifiers;
  }

  return React__default.createElement(Tag, _extends({
    tabIndex: '-1',
    role: 'menu'
  }, attrs, {
    'aria-hidden': !context.isOpen,
    className: classes,
    'x-placement': attrs.placement
  }));
};

DropdownMenu.propTypes = propTypes$18;
DropdownMenu.defaultProps = defaultProps$16;
DropdownMenu.contextTypes = contextTypes$1;

var propTypes$19 = {
  caret: propTypes$1.bool,
  color: propTypes$1.string,
  children: propTypes$1.node,
  className: propTypes$1.string,
  cssModule: propTypes$1.object,
  disabled: propTypes$1.bool,
  onClick: propTypes$1.func,
  'aria-haspopup': propTypes$1.bool,
  split: propTypes$1.bool,
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  nav: propTypes$1.bool
};

var defaultProps$17 = {
  'aria-haspopup': true,
  color: 'secondary'
};

var contextTypes$2 = {
  isOpen: propTypes$1.bool.isRequired,
  toggle: propTypes$1.func.isRequired,
  inNavbar: propTypes$1.bool.isRequired
};

var DropdownToggle = function (_React$Component) {
  inherits(DropdownToggle, _React$Component);

  function DropdownToggle(props) {
    classCallCheck(this, DropdownToggle);

    var _this = possibleConstructorReturn(this, (DropdownToggle.__proto__ || Object.getPrototypeOf(DropdownToggle)).call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  createClass(DropdownToggle, [{
    key: 'onClick',
    value: function onClick(e) {
      if (this.props.disabled) {
        e.preventDefault();
        return;
      }

      if (this.props.nav && !this.props.tag) {
        e.preventDefault();
      }

      if (this.props.onClick) {
        this.props.onClick(e);
      }

      this.context.toggle(e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          color = _props.color,
          cssModule = _props.cssModule,
          caret = _props.caret,
          split = _props.split,
          nav = _props.nav,
          tag = _props.tag,
          props = objectWithoutProperties(_props, ['className', 'color', 'cssModule', 'caret', 'split', 'nav', 'tag']);

      var ariaLabel = props['aria-label'] || 'Toggle Dropdown';
      var classes = mapToCssModules(classnames(className, {
        'dropdown-toggle': caret || split,
        'dropdown-toggle-split': split,
        'nav-link': nav
      }), cssModule);
      var children = props.children || React__default.createElement(
        'span',
        { className: 'sr-only' },
        ariaLabel
      );

      var Tag = void 0;

      if (nav && !tag) {
        Tag = 'a';
        props.href = '#';
      } else if (!tag) {
        Tag = Button;
        props.color = color;
        props.cssModule = cssModule;
      } else {
        Tag = tag;
      }

      if (this.context.inNavbar) {
        return React__default.createElement(Tag, _extends({}, props, {
          className: classes,
          onClick: this.onClick,
          'aria-expanded': this.context.isOpen,
          children: children
        }));
      }

      return React__default.createElement(reactPopper.Target, _extends({}, props, {
        className: classes,
        component: Tag,
        onClick: this.onClick,
        'aria-expanded': this.context.isOpen,
        children: children
      }));
    }
  }]);
  return DropdownToggle;
}(React__default.Component);

DropdownToggle.propTypes = propTypes$19;
DropdownToggle.defaultProps = defaultProps$17;
DropdownToggle.contextTypes = contextTypes$2;

var propTypes$20 = _extends({}, Transition.propTypes, {
  children: propTypes$1.oneOfType([propTypes$1.arrayOf(propTypes$1.node), propTypes$1.node]),
  tag: propTypes$1.oneOfType([propTypes$1.string, propTypes$1.func]),
  baseClass: propTypes$1.string,
  baseClassActive: propTypes$1.string,
  className: propTypes$1.string,
  cssModule: propTypes$1.object
});

var defaultProps$18 = _extends({}, Transition.defaultProps, {
  tag: 'div',
  baseClass: 'fade',
  baseClassActive: 'show',
  timeout: TransitionTimeouts.Fade,
  appear: true,
  enter: true,
  exit: true,
  in: true
});

function Fade(props) {
  var Tag = props.tag,
      baseClass = props.baseClass,
      baseClassActive = props.baseClassActive,
      className = props.className,
      cssModule = props.cssModule,
      children = props.children,
      otherProps = objectWithoutProperties(props, ['tag', 'baseClass', 'baseClassActive', 'className', 'cssModule', 'children']);

  // In NODE_ENV=production the Transition.propTypes are wrapped which results in an
  // empty object "{}". This is the result of the `react-transition-group` babel
  // configuration settings. Therefore, to ensure that production builds work without
  // error, we can either explicitly define keys or use the Transition.defaultProps.
  // Using the Transition.defaultProps excludes any required props. Thus, the best
  // solution is to explicitly define required props in our utilities and reference these.
  // This also gives us more flexibility in the future to remove the prop-types
  // dependency in distribution builds (Similar to how `react-transition-group` does).
  // Note: Without omitting the `react-transition-group` props, the resulting child
  // Tag component would inherit the Transition properties as attributes for the HTML
  // element which results in errors/warnings for non-valid attributes.

  var transitionProps = pick(otherProps, TransitionPropTypeKeys);
  var childProps = omit(otherProps, TransitionPropTypeKeys);

  return React__default.createElement(
    Transition,
    transitionProps,
    function (status) {
      var isActive = status === 'entered';
      var classes = mapToCssModules(classnames(className, baseClass, isActive && baseClassActive), cssModule);
      return React__default.createElement(
        Tag,
        _extends({ className: classes }, childProps),
        children
      );
    }
  );
}

Fade.propTypes = propTypes$20;
Fade.defaultProps = defaultProps$18;

var propTypes$21 = {
  color: propTypes$1.string,
  pill: propTypes$1.bool,
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  children: propTypes$1.node,
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$19 = {
  color: 'secondary',
  pill: false,
  tag: 'span'
};

var Badge = function Badge(props) {
  var className = props.className,
      cssModule = props.cssModule,
      color = props.color,
      pill = props.pill,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'color', 'pill', 'tag']);


  var classes = mapToCssModules(classnames(className, 'badge', 'badge-' + color, pill ? 'badge-pill' : false), cssModule);

  if (attributes.href && Tag === 'span') {
    Tag = 'a';
  }

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

Badge.propTypes = propTypes$21;
Badge.defaultProps = defaultProps$19;

var propTypes$22 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  inverse: propTypes$1.bool,
  color: propTypes$1.string,
  block: deprecated(propTypes$1.bool, 'Please use the props "body"'),
  body: propTypes$1.bool,
  outline: propTypes$1.bool,
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$20 = {
  tag: 'div'
};

var Card = function Card(props) {
  var className = props.className,
      cssModule = props.cssModule,
      color = props.color,
      block = props.block,
      body = props.body,
      inverse = props.inverse,
      outline = props.outline,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'color', 'block', 'body', 'inverse', 'outline', 'tag']);

  var classes = mapToCssModules(classnames(className, 'card', inverse ? 'text-white' : false, block || body ? 'card-body' : false, color ? (outline ? 'border' : 'bg') + '-' + color : false), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

Card.propTypes = propTypes$22;
Card.defaultProps = defaultProps$20;

var propTypes$23 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$21 = {
  tag: 'div'
};

var CardGroup = function CardGroup(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

  var classes = mapToCssModules(classnames(className, 'card-group'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

CardGroup.propTypes = propTypes$23;
CardGroup.defaultProps = defaultProps$21;

var propTypes$24 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$22 = {
  tag: 'div'
};

var CardDeck = function CardDeck(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

  var classes = mapToCssModules(classnames(className, 'card-deck'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

CardDeck.propTypes = propTypes$24;
CardDeck.defaultProps = defaultProps$22;

var propTypes$25 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$23 = {
  tag: 'div'
};

var CardColumns = function CardColumns(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

  var classes = mapToCssModules(classnames(className, 'card-columns'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

CardColumns.propTypes = propTypes$25;
CardColumns.defaultProps = defaultProps$23;

var propTypes$26 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$24 = {
  tag: 'div'
};

var CardBody = function CardBody(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

  var classes = mapToCssModules(classnames(className, 'card-body'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

CardBody.propTypes = propTypes$26;
CardBody.defaultProps = defaultProps$24;

function CardBlock(props) {
  warnOnce('The "CardBlock" component has been deprecated.\nPlease use component "CardBody".');
  return React__default.createElement(CardBody, props);
}

var propTypes$27 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  innerRef: propTypes$1.oneOfType([propTypes$1.object, propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$25 = {
  tag: 'a'
};

var CardLink = function CardLink(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      innerRef = props.innerRef,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag', 'innerRef']);

  var classes = mapToCssModules(classnames(className, 'card-link'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { ref: innerRef, className: classes }));
};

CardLink.propTypes = propTypes$27;
CardLink.defaultProps = defaultProps$25;

var propTypes$28 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$26 = {
  tag: 'div'
};

var CardFooter = function CardFooter(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

  var classes = mapToCssModules(classnames(className, 'card-footer'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

CardFooter.propTypes = propTypes$28;
CardFooter.defaultProps = defaultProps$26;

var propTypes$29 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$27 = {
  tag: 'div'
};

var CardHeader = function CardHeader(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

  var classes = mapToCssModules(classnames(className, 'card-header'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

CardHeader.propTypes = propTypes$29;
CardHeader.defaultProps = defaultProps$27;

var propTypes$30 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  top: propTypes$1.bool,
  bottom: propTypes$1.bool,
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$28 = {
  tag: 'img'
};

var CardImg = function CardImg(props) {
  var className = props.className,
      cssModule = props.cssModule,
      top = props.top,
      bottom = props.bottom,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'top', 'bottom', 'tag']);


  var cardImgClassName = 'card-img';
  if (top) {
    cardImgClassName = 'card-img-top';
  }
  if (bottom) {
    cardImgClassName = 'card-img-bottom';
  }

  var classes = mapToCssModules(classnames(className, cardImgClassName), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

CardImg.propTypes = propTypes$30;
CardImg.defaultProps = defaultProps$28;

var propTypes$31 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$29 = {
  tag: 'div'
};

var CardImgOverlay = function CardImgOverlay(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

  var classes = mapToCssModules(classnames(className, 'card-img-overlay'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

CardImgOverlay.propTypes = propTypes$31;
CardImgOverlay.defaultProps = defaultProps$29;

var CarouselItem = function (_React$Component) {
  inherits(CarouselItem, _React$Component);

  function CarouselItem(props) {
    classCallCheck(this, CarouselItem);

    var _this = possibleConstructorReturn(this, (CarouselItem.__proto__ || Object.getPrototypeOf(CarouselItem)).call(this, props));

    _this.state = {
      startAnimation: false
    };

    _this.onEnter = _this.onEnter.bind(_this);
    _this.onEntering = _this.onEntering.bind(_this);
    _this.onExit = _this.onExit.bind(_this);
    _this.onExiting = _this.onExiting.bind(_this);
    _this.onExited = _this.onExited.bind(_this);
    return _this;
  }

  createClass(CarouselItem, [{
    key: 'onEnter',
    value: function onEnter(node, isAppearing) {
      this.setState({ startAnimation: false });
      this.props.onEnter(node, isAppearing);
    }
  }, {
    key: 'onEntering',
    value: function onEntering(node, isAppearing) {
      // getting this variable triggers a reflow
      var offsetHeight = node.offsetHeight;
      this.setState({ startAnimation: true });
      this.props.onEntering(node, isAppearing);
      return offsetHeight;
    }
  }, {
    key: 'onExit',
    value: function onExit(node) {
      this.setState({ startAnimation: false });
      this.props.onExit(node);
    }
  }, {
    key: 'onExiting',
    value: function onExiting(node) {
      this.setState({ startAnimation: true });
      node.dispatchEvent(new CustomEvent('slide.bs.carousel'));
      this.props.onExiting(node);
    }
  }, {
    key: 'onExited',
    value: function onExited(node) {
      node.dispatchEvent(new CustomEvent('slid.bs.carousel'));
      this.props.onExited(node);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          isIn = _props.in,
          children = _props.children,
          cssModule = _props.cssModule,
          slide = _props.slide,
          Tag = _props.tag,
          className = _props.className,
          transitionProps = objectWithoutProperties(_props, ['in', 'children', 'cssModule', 'slide', 'tag', 'className']);


      return React__default.createElement(
        Transition,
        _extends({}, transitionProps, {
          enter: slide,
          exit: slide,
          'in': isIn,
          onEnter: this.onEnter,
          onEntering: this.onEntering,
          onExit: this.onExit,
          onExiting: this.onExiting,
          onExited: this.onExited
        }),
        function (status) {
          var direction = _this2.context.direction;

          var isActive = status === TransitionStatuses.ENTERED || status === TransitionStatuses.EXITING;
          var directionClassName = (status === TransitionStatuses.ENTERING || status === TransitionStatuses.EXITING) && _this2.state.startAnimation && (direction === 'right' ? 'carousel-item-left' : 'carousel-item-right');
          var orderClassName = status === TransitionStatuses.ENTERING && (direction === 'right' ? 'carousel-item-next' : 'carousel-item-prev');
          var itemClasses = mapToCssModules(classnames(className, 'carousel-item', isActive && 'active', directionClassName, orderClassName), cssModule);

          return React__default.createElement(
            Tag,
            { className: itemClasses },
            children
          );
        }
      );
    }
  }]);
  return CarouselItem;
}(React__default.Component);

CarouselItem.propTypes = _extends({}, Transition.propTypes, {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  in: propTypes$1.bool,
  cssModule: propTypes$1.object,
  children: propTypes$1.node,
  slide: propTypes$1.bool,
  className: propTypes$1.string
});

CarouselItem.defaultProps = _extends({}, Transition.defaultProps, {
  tag: 'div',
  timeout: TransitionTimeouts.Carousel,
  slide: true
});

CarouselItem.contextTypes = {
  direction: propTypes$1.string
};

var Carousel = function (_React$Component) {
  inherits(Carousel, _React$Component);

  function Carousel(props) {
    classCallCheck(this, Carousel);

    var _this = possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    _this.renderItems = _this.renderItems.bind(_this);
    _this.hoverStart = _this.hoverStart.bind(_this);
    _this.hoverEnd = _this.hoverEnd.bind(_this);
    _this.state = {
      direction: 'right',
      indicatorClicked: false
    };
    return _this;
  }

  createClass(Carousel, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { direction: this.state.direction };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Set up the cycle
      if (this.props.ride === 'carousel') {
        this.setInterval();
      }

      // TODO: move this to the specific carousel like bootstrap. Currently it will trigger ALL carousels on the page.
      document.addEventListener('keyup', this.handleKeyPress);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setInterval(nextProps);
      // Calculate the direction to turn
      if (this.props.activeIndex + 1 === nextProps.activeIndex) {
        this.setState({ direction: 'right' });
      } else if (this.props.activeIndex - 1 === nextProps.activeIndex) {
        this.setState({ direction: 'left' });
      } else if (this.props.activeIndex > nextProps.activeIndex) {
        this.setState({ direction: this.state.indicatorClicked ? 'left' : 'right' });
      } else if (this.props.activeIndex !== nextProps.activeIndex) {
        this.setState({ direction: this.state.indicatorClicked ? 'right' : 'left' });
      }
      this.setState({ indicatorClicked: false });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearInterval();
      document.removeEventListener('keyup', this.handleKeyPress);
    }
  }, {
    key: 'setInterval',
    value: function (_setInterval) {
      function setInterval() {
        return _setInterval.apply(this, arguments);
      }

      setInterval.toString = function () {
        return _setInterval.toString();
      };

      return setInterval;
    }(function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      // make sure not to have multiple intervals going...
      this.clearInterval();
      if (props.interval) {
        this.cycleInterval = setInterval(function () {
          props.next();
        }, parseInt(props.interval, 10));
      }
    })
  }, {
    key: 'clearInterval',
    value: function (_clearInterval) {
      function clearInterval() {
        return _clearInterval.apply(this, arguments);
      }

      clearInterval.toString = function () {
        return _clearInterval.toString();
      };

      return clearInterval;
    }(function () {
      clearInterval(this.cycleInterval);
    })
  }, {
    key: 'hoverStart',
    value: function hoverStart() {
      if (this.props.pause === 'hover') {
        this.clearInterval();
      }
      if (this.props.mouseEnter) {
        var _props;

        (_props = this.props).mouseEnter.apply(_props, arguments);
      }
    }
  }, {
    key: 'hoverEnd',
    value: function hoverEnd() {
      if (this.props.pause === 'hover') {
        this.setInterval();
      }
      if (this.props.mouseLeave) {
        var _props2;

        (_props2 = this.props).mouseLeave.apply(_props2, arguments);
      }
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(evt) {
      if (this.props.keyboard) {
        if (evt.keyCode === 37) {
          this.props.previous();
        } else if (evt.keyCode === 39) {
          this.props.next();
        }
      }
    }
  }, {
    key: 'renderItems',
    value: function renderItems(carouselItems, className) {
      var _this2 = this;

      var slide = this.props.slide;

      return React__default.createElement(
        'div',
        { role: 'listbox', className: className },
        carouselItems.map(function (item, index) {
          var isIn = index === _this2.props.activeIndex;
          return React__default.cloneElement(item, {
            in: isIn,
            slide: slide
          });
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props3 = this.props,
          children = _props3.children,
          cssModule = _props3.cssModule,
          slide = _props3.slide,
          className = _props3.className;

      var outerClasses = mapToCssModules(classnames(className, 'carousel', slide && 'slide'), cssModule);

      var innerClasses = mapToCssModules(classnames('carousel-inner'), cssModule);

      var slidesOnly = children.every(function (child) {
        return child.type === CarouselItem;
      });

      // Rendering only slides
      if (slidesOnly) {
        return React__default.createElement(
          'div',
          { className: outerClasses, onMouseEnter: this.hoverStart, onMouseLeave: this.hoverEnd },
          this.renderItems(children, innerClasses)
        );
      }

      // Rendering slides and controls
      if (children[0] instanceof Array) {
        var _carouselItems = children[0];
        var _controlLeft = children[1];
        var _controlRight = children[2];

        return React__default.createElement(
          'div',
          { className: outerClasses, onMouseEnter: this.hoverStart, onMouseLeave: this.hoverEnd },
          this.renderItems(_carouselItems, innerClasses),
          _controlLeft,
          _controlRight
        );
      }

      // Rendering indicators, slides and controls
      var indicators = children[0];
      var wrappedOnClick = function wrappedOnClick(e) {
        if (typeof indicators.props.onClickHandler === 'function') {
          _this3.setState({ indicatorClicked: true }, function () {
            return indicators.props.onClickHandler(e);
          });
        }
      };
      var wrappedIndicators = React__default.cloneElement(indicators, { onClickHandler: wrappedOnClick });
      var carouselItems = children[1];
      var controlLeft = children[2];
      var controlRight = children[3];

      return React__default.createElement(
        'div',
        { className: outerClasses, onMouseEnter: this.hoverStart, onMouseLeave: this.hoverEnd },
        wrappedIndicators,
        this.renderItems(carouselItems, innerClasses),
        controlLeft,
        controlRight
      );
    }
  }]);
  return Carousel;
}(React__default.Component);

Carousel.propTypes = {
  // the current active slide of the carousel
  activeIndex: propTypes$1.number,
  // a function which should advance the carousel to the next slide (via activeIndex)
  next: propTypes$1.func.isRequired,
  // a function which should advance the carousel to the previous slide (via activeIndex)
  previous: propTypes$1.func.isRequired,
  // controls if the left and right arrow keys should control the carousel
  keyboard: propTypes$1.bool,
  /* If set to "hover", pauses the cycling of the carousel on mouseenter and resumes the cycling of the carousel on
   * mouseleave. If set to false, hovering over the carousel won't pause it. (default: "hover")
   */
  pause: propTypes$1.oneOf(['hover', false]),
  // Autoplays the carousel after the user manually cycles the first item. If "carousel", autoplays the carousel on load.
  // This is how bootstrap defines it... I would prefer a bool named autoplay or something...
  ride: propTypes$1.oneOf(['carousel']),
  // the interval at which the carousel automatically cycles (default: 5000)
  // eslint-disable-next-line react/no-unused-prop-types
  interval: propTypes$1.oneOfType([propTypes$1.number, propTypes$1.string, propTypes$1.bool]),
  children: propTypes$1.array,
  // called when the mouse enters the Carousel
  mouseEnter: propTypes$1.func,
  // called when the mouse exits the Carousel
  mouseLeave: propTypes$1.func,
  // controls whether the slide animation on the Carousel works or not
  slide: propTypes$1.bool,
  cssModule: propTypes$1.object,
  className: propTypes$1.string
};

Carousel.defaultProps = {
  interval: 5000,
  pause: 'hover',
  keyboard: true,
  slide: true
};

Carousel.childContextTypes = {
  direction: propTypes$1.string
};

var CarouselControl = function CarouselControl(props) {
  var direction = props.direction,
      onClickHandler = props.onClickHandler,
      cssModule = props.cssModule,
      directionText = props.directionText,
      className = props.className;


  var anchorClasses = mapToCssModules(classnames(className, 'carousel-control-' + direction), cssModule);

  var iconClasses = mapToCssModules(classnames('carousel-control-' + direction + '-icon'), cssModule);

  var screenReaderClasses = mapToCssModules(classnames('sr-only'), cssModule);

  return React__default.createElement(
    'a',
    {
      className: anchorClasses,
      role: 'button',
      tabIndex: '0',
      onClick: function onClick(e) {
        e.preventDefault();
        onClickHandler();
      }
    },
    React__default.createElement('span', { className: iconClasses, 'aria-hidden': 'true' }),
    React__default.createElement(
      'span',
      { className: screenReaderClasses },
      directionText || direction
    )
  );
};

CarouselControl.propTypes = {
  direction: propTypes$1.oneOf(['prev', 'next']).isRequired,
  onClickHandler: propTypes$1.func.isRequired,
  cssModule: propTypes$1.object,
  directionText: propTypes$1.string,
  className: propTypes$1.string
};

var CarouselIndicators = function CarouselIndicators(props) {
  var items = props.items,
      activeIndex = props.activeIndex,
      cssModule = props.cssModule,
      onClickHandler = props.onClickHandler,
      className = props.className;


  var listClasses = mapToCssModules(classnames(className, 'carousel-indicators'), cssModule);
  var indicators = items.map(function (item, idx) {
    var indicatorClasses = mapToCssModules(classnames({ active: activeIndex === idx }), cssModule);
    return React__default.createElement('li', {
      key: '' + (item.key || item.src) + item.caption + item.altText,
      onClick: function onClick(e) {
        e.preventDefault();
        onClickHandler(idx);
      },
      className: indicatorClasses
    });
  });

  return React__default.createElement(
    'ol',
    { className: listClasses },
    indicators
  );
};

CarouselIndicators.propTypes = {
  items: propTypes$1.array.isRequired,
  activeIndex: propTypes$1.number.isRequired,
  cssModule: propTypes$1.object,
  onClickHandler: propTypes$1.func.isRequired,
  className: propTypes$1.string
};

var CarouselCaption = function CarouselCaption(props) {
  var captionHeader = props.captionHeader,
      captionText = props.captionText,
      cssModule = props.cssModule,
      className = props.className;

  var classes = mapToCssModules(classnames(className, 'carousel-caption', 'd-none', 'd-md-block'), cssModule);

  return React__default.createElement(
    'div',
    { className: classes },
    React__default.createElement(
      'h3',
      null,
      captionHeader
    ),
    React__default.createElement(
      'p',
      null,
      captionText
    )
  );
};

CarouselCaption.propTypes = {
  captionHeader: propTypes$1.string,
  captionText: propTypes$1.string.isRequired,
  cssModule: propTypes$1.object,
  className: propTypes$1.string
};

var propTypes$32 = {
  items: propTypes$1.array.isRequired,
  indicators: propTypes$1.bool,
  controls: propTypes$1.bool,
  autoPlay: propTypes$1.bool,
  activeIndex: propTypes$1.number,
  next: propTypes$1.func,
  previous: propTypes$1.func,
  goToIndex: propTypes$1.func
};

var UncontrolledCarousel = function (_Component) {
  inherits(UncontrolledCarousel, _Component);

  function UncontrolledCarousel(props) {
    classCallCheck(this, UncontrolledCarousel);

    var _this = possibleConstructorReturn(this, (UncontrolledCarousel.__proto__ || Object.getPrototypeOf(UncontrolledCarousel)).call(this, props));

    _this.animating = false;
    _this.state = { activeIndex: 0 };
    _this.next = _this.next.bind(_this);
    _this.previous = _this.previous.bind(_this);
    _this.goToIndex = _this.goToIndex.bind(_this);
    _this.onExiting = _this.onExiting.bind(_this);
    _this.onExited = _this.onExited.bind(_this);
    return _this;
  }

  createClass(UncontrolledCarousel, [{
    key: 'onExiting',
    value: function onExiting() {
      this.animating = true;
    }
  }, {
    key: 'onExited',
    value: function onExited() {
      this.animating = false;
    }
  }, {
    key: 'next',
    value: function next() {
      if (this.animating) return;
      var nextIndex = this.state.activeIndex === this.props.items.length - 1 ? 0 : this.state.activeIndex + 1;
      this.setState({ activeIndex: nextIndex });
    }
  }, {
    key: 'previous',
    value: function previous() {
      if (this.animating) return;
      var nextIndex = this.state.activeIndex === 0 ? this.props.items.length - 1 : this.state.activeIndex - 1;
      this.setState({ activeIndex: nextIndex });
    }
  }, {
    key: 'goToIndex',
    value: function goToIndex(newIndex) {
      if (this.animating) return;
      this.setState({ activeIndex: newIndex });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          autoPlay = _props.autoPlay,
          indicators = _props.indicators,
          controls = _props.controls,
          items = _props.items,
          goToIndex = _props.goToIndex,
          props = objectWithoutProperties(_props, ['autoPlay', 'indicators', 'controls', 'items', 'goToIndex']);
      var activeIndex = this.state.activeIndex;


      var slides = items.map(function (item) {
        return React__default.createElement(
          CarouselItem,
          {
            onExiting: _this2.onExiting,
            onExited: _this2.onExited,
            key: item.src
          },
          React__default.createElement('img', { className: 'd-block w-100', src: item.src, alt: item.altText }),
          React__default.createElement(CarouselCaption, { captionText: item.caption, captionHeader: item.header || item.caption })
        );
      });

      return React__default.createElement(
        Carousel,
        _extends({
          activeIndex: activeIndex,
          next: this.next,
          previous: this.previous,
          ride: autoPlay ? 'carousel' : undefined
        }, props),
        indicators && React__default.createElement(CarouselIndicators, {
          items: items,
          activeIndex: props.activeIndex || activeIndex,
          onClickHandler: goToIndex || this.goToIndex
        }),
        slides,
        controls && React__default.createElement(CarouselControl, {
          direction: 'prev',
          directionText: 'Previous',
          onClickHandler: props.previous || this.previous
        }),
        controls && React__default.createElement(CarouselControl, {
          direction: 'next',
          directionText: 'Next',
          onClickHandler: props.next || this.next
        })
      );
    }
  }]);
  return UncontrolledCarousel;
}(React.Component);

UncontrolledCarousel.propTypes = propTypes$32;
UncontrolledCarousel.defaultProps = {
  controls: true,
  indicators: true,
  autoPlay: true
};

var propTypes$33 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$30 = {
  tag: 'h6'
};

var CardSubtitle = function CardSubtitle(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

  var classes = mapToCssModules(classnames(className, 'card-subtitle'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

CardSubtitle.propTypes = propTypes$33;
CardSubtitle.defaultProps = defaultProps$30;

var propTypes$34 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$31 = {
  tag: 'p'
};

var CardText = function CardText(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

  var classes = mapToCssModules(classnames(className, 'card-text'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

CardText.propTypes = propTypes$34;
CardText.defaultProps = defaultProps$31;

var propTypes$35 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$32 = {
  tag: 'h5'
};

var CardTitle = function CardTitle(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

  var classes = mapToCssModules(classnames(className, 'card-title'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

CardTitle.propTypes = propTypes$35;
CardTitle.defaultProps = defaultProps$32;

var propTypes$36 = {
  className: propTypes$1.string,
  id: propTypes$1.oneOfType([propTypes$1.string, propTypes$1.number]).isRequired,
  type: propTypes$1.string.isRequired,
  label: propTypes$1.string,
  inline: propTypes$1.bool,
  valid: propTypes$1.bool,
  invalid: propTypes$1.bool,
  bsSize: propTypes$1.string,
  cssModule: propTypes$1.object,
  children: propTypes$1.oneOfType([propTypes$1.node, propTypes$1.array, propTypes$1.func])
};

function CustomInput(props) {
  var className = props.className,
      label = props.label,
      inline = props.inline,
      valid = props.valid,
      invalid = props.invalid,
      cssModule = props.cssModule,
      children = props.children,
      bsSize = props.bsSize,
      attributes = objectWithoutProperties(props, ['className', 'label', 'inline', 'valid', 'invalid', 'cssModule', 'children', 'bsSize']);


  var type = attributes.type;

  var customClass = mapToCssModules(classnames(className, 'custom-' + type, bsSize ? 'custom-' + type + '-' + bsSize : false), cssModule);

  var validationClassNames = mapToCssModules(classnames(invalid && 'is-invalid', valid && 'is-valid'), cssModule);

  if (type === 'select') {
    return React__default.createElement(
      'select',
      _extends({}, attributes, { className: classnames(validationClassNames, customClass) }),
      children
    );
  }

  if (type === 'file') {
    return React__default.createElement(
      'div',
      { className: customClass },
      React__default.createElement('input', _extends({}, attributes, { className: classnames(validationClassNames, mapToCssModules('custom-file-input', cssModule)) })),
      React__default.createElement(
        'label',
        { className: mapToCssModules('custom-file-label', cssModule), htmlFor: attributes.id },
        label || 'Choose file'
      )
    );
  }

  if (type !== 'checkbox' && type !== 'radio') {
    return React__default.createElement('input', _extends({}, attributes, { className: classnames(validationClassNames, customClass) }));
  }

  var wrapperClasses = classnames(customClass, mapToCssModules(classnames('custom-control', { 'custom-control-inline': inline }), cssModule));

  return React__default.createElement(
    'div',
    { className: wrapperClasses },
    React__default.createElement('input', _extends({}, attributes, {
      className: classnames(validationClassNames, mapToCssModules('custom-control-input', cssModule))
    })),
    React__default.createElement(
      'label',
      { className: mapToCssModules('custom-control-label', cssModule), htmlFor: attributes.id },
      label
    ),
    children
  );
}

CustomInput.propTypes = propTypes$36;

var propTypes$37 = {
  children: propTypes$1.node.isRequired,
  className: propTypes$1.string,
  placement: propTypes$1.string,
  placementPrefix: propTypes$1.string,
  hideArrow: propTypes$1.bool,
  tag: propTypes$1.string,
  isOpen: propTypes$1.bool.isRequired,
  cssModule: propTypes$1.object,
  offset: propTypes$1.oneOfType([propTypes$1.string, propTypes$1.number]),
  fallbackPlacement: propTypes$1.oneOfType([propTypes$1.string, propTypes$1.array]),
  flip: propTypes$1.bool,
  container: propTypes$1.oneOfType([propTypes$1.string, propTypes$1.func, DOMElement]),
  target: propTypes$1.oneOfType([propTypes$1.string, propTypes$1.func, DOMElement]).isRequired,
  modifiers: propTypes$1.object
};

var defaultProps$33 = {
  placement: 'auto',
  hideArrow: false,
  isOpen: false,
  offset: 0,
  fallbackPlacement: 'flip',
  flip: true,
  container: 'body',
  modifiers: {}
};

var childContextTypes$1 = {
  popperManager: propTypes$1.object.isRequired
};

var PopperContent = function (_React$Component) {
  inherits(PopperContent, _React$Component);

  function PopperContent(props) {
    classCallCheck(this, PopperContent);

    var _this = possibleConstructorReturn(this, (PopperContent.__proto__ || Object.getPrototypeOf(PopperContent)).call(this, props));

    _this.handlePlacementChange = _this.handlePlacementChange.bind(_this);
    _this.setTargetNode = _this.setTargetNode.bind(_this);
    _this.getTargetNode = _this.getTargetNode.bind(_this);
    _this.state = {};
    return _this;
  }

  createClass(PopperContent, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        popperManager: {
          setTargetNode: this.setTargetNode,
          getTargetNode: this.getTargetNode
        }
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleProps();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.isOpen !== prevProps.isOpen) {
        this.handleProps();
      } else if (this._element) {
        // rerender
        this.renderIntoSubtree();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.hide();
    }
  }, {
    key: 'setTargetNode',
    value: function setTargetNode(node) {
      this.targetNode = node;
    }
  }, {
    key: 'getTargetNode',
    value: function getTargetNode() {
      return this.targetNode;
    }
  }, {
    key: 'getContainerNode',
    value: function getContainerNode() {
      return getTarget(this.props.container);
    }
  }, {
    key: 'handlePlacementChange',
    value: function handlePlacementChange(data) {
      if (this.state.placement !== data.placement) {
        this.setState({ placement: data.placement });
      }
      return data;
    }
  }, {
    key: 'handleProps',
    value: function handleProps() {
      if (this.props.container !== 'inline') {
        if (this.props.isOpen) {
          this.show();
        } else {
          this.hide();
        }
      }
    }
  }, {
    key: 'hide',
    value: function hide() {
      if (this._element) {
        this.getContainerNode().removeChild(this._element);
        ReactDOM.unmountComponentAtNode(this._element);
        this._element = null;
      }
    }
  }, {
    key: 'show',
    value: function show() {
      this._element = document.createElement('div');
      this.getContainerNode().appendChild(this._element);
      this.renderIntoSubtree();
      if (this._element.childNodes && this._element.childNodes[0] && this._element.childNodes[0].focus) {
        this._element.childNodes[0].focus();
      }
    }
  }, {
    key: 'renderIntoSubtree',
    value: function renderIntoSubtree() {
      ReactDOM.unstable_renderSubtreeIntoContainer(this, this.renderChildren(), this._element);
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _props = this.props,
          cssModule = _props.cssModule,
          children = _props.children,
          isOpen = _props.isOpen,
          flip = _props.flip,
          target = _props.target,
          offset = _props.offset,
          fallbackPlacement = _props.fallbackPlacement,
          placementPrefix = _props.placementPrefix,
          hideArrow = _props.hideArrow,
          className = _props.className,
          tag = _props.tag,
          container = _props.container,
          modifiers = _props.modifiers,
          attrs = objectWithoutProperties(_props, ['cssModule', 'children', 'isOpen', 'flip', 'target', 'offset', 'fallbackPlacement', 'placementPrefix', 'hideArrow', 'className', 'tag', 'container', 'modifiers']);

      var arrowClassName = mapToCssModules('arrow', cssModule);
      var placement = (this.state.placement || attrs.placement).split('-')[0];
      var popperClassName = mapToCssModules(classnames(className, placementPrefix ? placementPrefix + '-' + placement : placement), this.props.cssModule);

      var extendedModifiers = _extends({
        offset: { offset: offset },
        flip: { enabled: flip, behavior: fallbackPlacement },
        update: {
          enabled: true,
          order: 950,
          fn: this.handlePlacementChange
        }
      }, modifiers);

      return React__default.createElement(
        reactPopper.Popper,
        _extends({ modifiers: extendedModifiers }, attrs, { component: tag, className: popperClassName, 'x-placement': this.state.placement || attrs.placement }),
        children,
        !hideArrow && React__default.createElement(reactPopper.Arrow, { className: arrowClassName })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      this.setTargetNode(getTarget(this.props.target));

      if (this.props.container === 'inline') {
        return this.props.isOpen ? this.renderChildren() : null;
      }

      return null;
    }
  }]);
  return PopperContent;
}(React__default.Component);

PopperContent.propTypes = propTypes$37;
PopperContent.defaultProps = defaultProps$33;
PopperContent.childContextTypes = childContextTypes$1;

var PopperTargetHelper = function PopperTargetHelper(props, context) {
  context.popperManager.setTargetNode(getTarget(props.target));
  return null;
};

PopperTargetHelper.contextTypes = {
  popperManager: propTypes$1.object.isRequired
};

PopperTargetHelper.propTypes = {
  target: propTypes$1.oneOfType([propTypes$1.string, propTypes$1.func, DOMElement]).isRequired
};

var propTypes$38 = {
  placement: propTypes$1.oneOf(PopperPlacements),
  target: propTypes$1.oneOfType([propTypes$1.string, propTypes$1.func, DOMElement]).isRequired,
  container: propTypes$1.oneOfType([propTypes$1.string, propTypes$1.func, DOMElement]),
  isOpen: propTypes$1.bool,
  disabled: propTypes$1.bool,
  hideArrow: propTypes$1.bool,
  className: propTypes$1.string,
  innerClassName: propTypes$1.string,
  placementPrefix: propTypes$1.string,
  cssModule: propTypes$1.object,
  toggle: propTypes$1.func,
  delay: propTypes$1.oneOfType([propTypes$1.shape({ show: propTypes$1.number, hide: propTypes$1.number }), propTypes$1.number]),
  modifiers: propTypes$1.object
};

var DEFAULT_DELAYS = {
  show: 0,
  hide: 0
};

var defaultProps$34 = {
  isOpen: false,
  hideArrow: false,
  placement: 'right',
  placementPrefix: 'bs-popover',
  delay: DEFAULT_DELAYS,
  toggle: function toggle() {}
};

var Popover = function (_React$Component) {
  inherits(Popover, _React$Component);

  function Popover(props) {
    classCallCheck(this, Popover);

    var _this = possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).call(this, props));

    _this.addTargetEvents = _this.addTargetEvents.bind(_this);
    _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
    _this.removeTargetEvents = _this.removeTargetEvents.bind(_this);
    _this.getRef = _this.getRef.bind(_this);
    _this.toggle = _this.toggle.bind(_this);
    _this.show = _this.show.bind(_this);
    _this.hide = _this.hide.bind(_this);
    return _this;
  }

  createClass(Popover, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._target = getTarget(this.props.target);
      this.handleProps();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.handleProps();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearShowTimeout();
      this.clearHideTimeout();
      this.removeTargetEvents();
    }
  }, {
    key: 'getRef',
    value: function getRef(ref) {
      this._popover = ref;
    }
  }, {
    key: 'getDelay',
    value: function getDelay(key) {
      var delay = this.props.delay;

      if ((typeof delay === 'undefined' ? 'undefined' : _typeof(delay)) === 'object') {
        return isNaN(delay[key]) ? DEFAULT_DELAYS[key] : delay[key];
      }
      return delay;
    }
  }, {
    key: 'handleProps',
    value: function handleProps() {
      if (this.props.isOpen) {
        this.show();
      } else {
        this.hide();
      }
    }
  }, {
    key: 'show',
    value: function show() {
      this.clearHideTimeout();
      this.addTargetEvents();
      if (!this.props.isOpen) {
        this.clearShowTimeout();
        this._showTimeout = setTimeout(this.toggle, this.getDelay('show'));
      }
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.clearShowTimeout();
      this.removeTargetEvents();
      if (this.props.isOpen) {
        this.clearHideTimeout();
        this._hideTimeout = setTimeout(this.toggle, this.getDelay('hide'));
      }
    }
  }, {
    key: 'clearShowTimeout',
    value: function clearShowTimeout() {
      clearTimeout(this._showTimeout);
      this._showTimeout = undefined;
    }
  }, {
    key: 'clearHideTimeout',
    value: function clearHideTimeout() {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = undefined;
    }
  }, {
    key: 'handleDocumentClick',
    value: function handleDocumentClick(e) {
      if (e.target !== this._target && !this._target.contains(e.target) && e.target !== this._popover && !(this._popover && this._popover.contains(e.target))) {
        if (this._hideTimeout) {
          this.clearHideTimeout();
        }

        if (this.props.isOpen) {
          this.toggle(e);
        }
      }
    }
  }, {
    key: 'addTargetEvents',
    value: function addTargetEvents() {
      var _this2 = this;

      ['click', 'touchstart'].forEach(function (event) {
        return document.addEventListener(event, _this2.handleDocumentClick, true);
      });
    }
  }, {
    key: 'removeTargetEvents',
    value: function removeTargetEvents() {
      var _this3 = this;

      ['click', 'touchstart'].forEach(function (event) {
        return document.removeEventListener(event, _this3.handleDocumentClick, true);
      });
    }
  }, {
    key: 'toggle',
    value: function toggle(e) {
      if (this.props.disabled) {
        return e && e.preventDefault();
      }

      return this.props.toggle(e);
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.isOpen) {
        return null;
      }

      var attributes = omit(this.props, Object.keys(propTypes$38));
      var classes = mapToCssModules(classnames('popover-inner', this.props.innerClassName), this.props.cssModule);

      var popperClasses = mapToCssModules(classnames('popover', 'show', this.props.className), this.props.cssModule);

      return React__default.createElement(
        PopperContent,
        {
          className: popperClasses,
          target: this.props.target,
          isOpen: this.props.isOpen,
          hideArrow: this.props.hideArrow,
          placement: this.props.placement,
          placementPrefix: this.props.placementPrefix,
          container: this.props.container,
          modifiers: this.props.modifiers
        },
        React__default.createElement('div', _extends({}, attributes, { className: classes, ref: this.getRef }))
      );
    }
  }]);
  return Popover;
}(React__default.Component);

Popover.propTypes = propTypes$38;
Popover.defaultProps = defaultProps$34;

var propTypes$39 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$35 = {
  tag: 'h3'
};

var PopoverHeader = function PopoverHeader(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);


  var classes = mapToCssModules(classnames(className, 'popover-header'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

PopoverHeader.propTypes = propTypes$39;
PopoverHeader.defaultProps = defaultProps$35;

function PopoverTitle(props) {
  warnOnce('The "PopoverTitle" component has been deprecated.\nPlease use component "PopoverHeader".');
  return React__default.createElement(PopoverHeader, props);
}

var propTypes$40 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$36 = {
  tag: 'div'
};

var PopoverBody = function PopoverBody(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);


  var classes = mapToCssModules(classnames(className, 'popover-body'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

PopoverBody.propTypes = propTypes$40;
PopoverBody.defaultProps = defaultProps$36;

function PopoverContent(props) {
  warnOnce('The "PopoverContent" component has been deprecated.\nPlease use component "PopoverBody".');
  return React__default.createElement(PopoverBody, props);
}

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

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

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$1 = objectProto$1.toString;

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
function isObject$2(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
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
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
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
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString$1.call(value) == symbolTag;
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
  if (isObject$2(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$2(other) ? other + '' : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

var lodash_tonumber = toNumber;

var propTypes$41 = {
  children: propTypes$1.node,
  bar: propTypes$1.bool,
  multi: propTypes$1.bool,
  tag: propTypes$1.string,
  value: propTypes$1.oneOfType([propTypes$1.string, propTypes$1.number]),
  max: propTypes$1.oneOfType([propTypes$1.string, propTypes$1.number]),
  animated: propTypes$1.bool,
  striped: propTypes$1.bool,
  color: propTypes$1.string,
  className: propTypes$1.string,
  barClassName: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$37 = {
  tag: 'div',
  value: 0,
  max: 100
};

var Progress = function Progress(props) {
  var children = props.children,
      className = props.className,
      barClassName = props.barClassName,
      cssModule = props.cssModule,
      value = props.value,
      max = props.max,
      animated = props.animated,
      striped = props.striped,
      color = props.color,
      bar = props.bar,
      multi = props.multi,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['children', 'className', 'barClassName', 'cssModule', 'value', 'max', 'animated', 'striped', 'color', 'bar', 'multi', 'tag']);


  var percent = lodash_tonumber(value) / lodash_tonumber(max) * 100;

  var progressClasses = mapToCssModules(classnames(className, 'progress'), cssModule);

  var progressBarClasses = mapToCssModules(classnames('progress-bar', bar ? className || barClassName : barClassName, animated ? 'progress-bar-animated' : null, color ? 'bg-' + color : null, striped || animated ? 'progress-bar-striped' : null), cssModule);

  var ProgressBar = multi ? children : React__default.createElement('div', {
    className: progressBarClasses,
    style: { width: percent + '%' },
    role: 'progressbar',
    'aria-valuenow': value,
    'aria-valuemin': '0',
    'aria-valuemax': max,
    children: children
  });

  if (bar) {
    return ProgressBar;
  }

  return React__default.createElement(Tag, _extends({}, attributes, { className: progressClasses, children: ProgressBar }));
};

Progress.propTypes = propTypes$41;
Progress.defaultProps = defaultProps$37;

var propTypes$43 = {
  children: propTypes$1.node.isRequired,
  node: propTypes$1.any
};

var Portal = function (_React$Component) {
  inherits(Portal, _React$Component);

  function Portal() {
    classCallCheck(this, Portal);
    return possibleConstructorReturn(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).apply(this, arguments));
  }

  createClass(Portal, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.defaultNode) {
        document.body.removeChild(this.defaultNode);
      }
      this.defaultNode = null;
    }
  }, {
    key: 'render',
    value: function render() {
      if (!canUseDOM) {
        return null;
      }

      if (!this.props.node && !this.defaultNode) {
        this.defaultNode = document.createElement('div');
        document.body.appendChild(this.defaultNode);
      }

      return ReactDOM.createPortal(this.props.children, this.props.node || this.defaultNode);
    }
  }]);
  return Portal;
}(React__default.Component);

Portal.propTypes = propTypes$43;

function noop() {}

var FadePropTypes = propTypes$1.shape(Fade.propTypes);

var propTypes$42 = {
  isOpen: propTypes$1.bool,
  autoFocus: propTypes$1.bool,
  centered: propTypes$1.bool,
  size: propTypes$1.string,
  toggle: propTypes$1.func,
  keyboard: propTypes$1.bool,
  role: propTypes$1.string,
  labelledBy: propTypes$1.string,
  backdrop: propTypes$1.oneOfType([propTypes$1.bool, propTypes$1.oneOf(['static'])]),
  onEnter: propTypes$1.func,
  onExit: propTypes$1.func,
  onOpened: propTypes$1.func,
  onClosed: propTypes$1.func,
  children: propTypes$1.node,
  className: propTypes$1.string,
  wrapClassName: propTypes$1.string,
  modalClassName: propTypes$1.string,
  backdropClassName: propTypes$1.string,
  contentClassName: propTypes$1.string,
  external: propTypes$1.node,
  fade: propTypes$1.bool,
  cssModule: propTypes$1.object,
  zIndex: propTypes$1.oneOfType([propTypes$1.number, propTypes$1.string]),
  backdropTransition: FadePropTypes,
  modalTransition: FadePropTypes
};

var propsToOmit = Object.keys(propTypes$42);

var defaultProps$38 = {
  isOpen: false,
  autoFocus: true,
  centered: false,
  role: 'dialog',
  backdrop: true,
  keyboard: true,
  zIndex: 1050,
  fade: true,
  onOpened: noop,
  onClosed: noop,
  modalTransition: {
    timeout: TransitionTimeouts.Modal
  },
  backdropTransition: {
    mountOnEnter: true,
    timeout: TransitionTimeouts.Fade // uses standard fade transition
  }
};

var Modal = function (_React$Component) {
  inherits(Modal, _React$Component);

  function Modal(props) {
    classCallCheck(this, Modal);

    var _this = possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this._element = null;
    _this._originalBodyPadding = null;
    _this.handleBackdropClick = _this.handleBackdropClick.bind(_this);
    _this.handleEscape = _this.handleEscape.bind(_this);
    _this.onOpened = _this.onOpened.bind(_this);
    _this.onClosed = _this.onClosed.bind(_this);

    _this.state = {
      isOpen: props.isOpen
    };

    if (props.isOpen) {
      _this.init();
    }
    return _this;
  }

  createClass(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.onEnter) {
        this.props.onEnter();
      }

      if (this.state.isOpen && this.props.autoFocus) {
        this.setFocus();
      }

      this._isMounted = true;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.isOpen && !this.props.isOpen) {
        this.setState({ isOpen: nextProps.isOpen });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextState.isOpen && !this.state.isOpen) {
        this.init();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.autoFocus && this.state.isOpen && !prevState.isOpen) {
        this.setFocus();
      }

      if (this._element && prevProps.zIndex !== this.props.zIndex) {
        this._element.style.zIndex = this.props.zIndex;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.onExit) {
        this.props.onExit();
      }

      if (this.state.isOpen) {
        this.destroy();
      }

      this._isMounted = false;
    }
  }, {
    key: 'onOpened',
    value: function onOpened(node, isAppearing) {
      this.props.onOpened();
      (this.props.modalTransition.onEntered || noop)(node, isAppearing);
    }
  }, {
    key: 'onClosed',
    value: function onClosed(node) {
      // so all methods get called before it is unmounted
      this.props.onClosed();
      (this.props.modalTransition.onExited || noop)(node);
      this.destroy();

      if (this._isMounted) {
        this.setState({ isOpen: false });
      }
    }
  }, {
    key: 'setFocus',
    value: function setFocus() {
      if (this._dialog && this._dialog.parentNode && typeof this._dialog.parentNode.focus === 'function') {
        this._dialog.parentNode.focus();
      }
    }
  }, {
    key: 'handleBackdropClick',
    value: function handleBackdropClick(e) {
      e.stopPropagation();
      if (!this.props.isOpen || this.props.backdrop !== true) return;

      var container = this._dialog;

      if (e.target && !container.contains(e.target) && this.props.toggle) {
        this.props.toggle(e);
      }
    }
  }, {
    key: 'handleEscape',
    value: function handleEscape(e) {
      if (this.props.isOpen && this.props.keyboard && e.keyCode === 27 && this.props.toggle) {
        this.props.toggle(e);
      }
    }
  }, {
    key: 'init',
    value: function init() {
      this._element = document.createElement('div');
      this._element.setAttribute('tabindex', '-1');
      this._element.style.position = 'relative';
      this._element.style.zIndex = this.props.zIndex;
      this._originalBodyPadding = getOriginalBodyPadding();

      conditionallyUpdateScrollbar();

      document.body.appendChild(this._element);

      if (!this.bodyClassAdded) {
        document.body.className = classnames(document.body.className, mapToCssModules('modal-open', this.props.cssModule));
        this.bodyClassAdded = true;
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this._element) {
        document.body.removeChild(this._element);
        this._element = null;
      }

      if (this.bodyClassAdded) {
        var modalOpenClassName = mapToCssModules('modal-open', this.props.cssModule);
        // Use regex to prevent matching `modal-open` as part of a different class, e.g. `my-modal-opened`
        var modalOpenClassNameRegex = new RegExp('(^| )' + modalOpenClassName + '( |$)');
        document.body.className = document.body.className.replace(modalOpenClassNameRegex, ' ').trim();
        this.bodyClassAdded = false;
      }

      setScrollbarWidth(this._originalBodyPadding);
    }
  }, {
    key: 'renderModalDialog',
    value: function renderModalDialog() {
      var _classNames,
          _this2 = this;

      var attributes = omit(this.props, propsToOmit);
      var dialogBaseClass = 'modal-dialog';

      return React__default.createElement(
        'div',
        _extends({}, attributes, {
          className: mapToCssModules(classnames(dialogBaseClass, this.props.className, (_classNames = {}, defineProperty(_classNames, 'modal-' + this.props.size, this.props.size), defineProperty(_classNames, dialogBaseClass + '-centered', this.props.centered), _classNames)), this.props.cssModule),
          role: 'document',
          ref: function ref(c) {
            _this2._dialog = c;
          }
        }),
        React__default.createElement(
          'div',
          {
            className: mapToCssModules(classnames('modal-content', this.props.contentClassName), this.props.cssModule)
          },
          this.props.children
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.isOpen) {
        var _props = this.props,
            wrapClassName = _props.wrapClassName,
            modalClassName = _props.modalClassName,
            backdropClassName = _props.backdropClassName,
            cssModule = _props.cssModule,
            isOpen = _props.isOpen,
            backdrop = _props.backdrop,
            role = _props.role,
            labelledBy = _props.labelledBy,
            external = _props.external;


        var modalAttributes = {
          onClick: this.handleBackdropClick,
          onKeyUp: this.handleEscape,
          style: { display: 'block' },
          'aria-labelledby': labelledBy,
          role: role,
          tabIndex: '-1'
        };

        var hasTransition = this.props.fade;
        var modalTransition = _extends({}, Fade.defaultProps, this.props.modalTransition, {
          baseClass: hasTransition ? this.props.modalTransition.baseClass : '',
          timeout: hasTransition ? this.props.modalTransition.timeout : 0
        });
        var backdropTransition = _extends({}, Fade.defaultProps, this.props.backdropTransition, {
          baseClass: hasTransition ? this.props.backdropTransition.baseClass : '',
          timeout: hasTransition ? this.props.backdropTransition.timeout : 0
        });

        return React__default.createElement(
          Portal,
          { node: this._element },
          React__default.createElement(
            'div',
            { className: mapToCssModules(wrapClassName) },
            React__default.createElement(
              Fade,
              _extends({}, modalAttributes, modalTransition, {
                'in': isOpen,
                onEntered: this.onOpened,
                onExited: this.onClosed,
                cssModule: cssModule,
                className: mapToCssModules(classnames('modal', modalClassName), cssModule)
              }),
              external,
              this.renderModalDialog()
            ),
            React__default.createElement(Fade, _extends({}, backdropTransition, {
              'in': isOpen && !!backdrop,
              cssModule: cssModule,
              className: mapToCssModules(classnames('modal-backdrop', backdropClassName), cssModule)
            }))
          )
        );
      }

      return null;
    }
  }]);
  return Modal;
}(React__default.Component);

Modal.propTypes = propTypes$42;
Modal.defaultProps = defaultProps$38;

var propTypes$44 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  wrapTag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  toggle: propTypes$1.func,
  className: propTypes$1.string,
  cssModule: propTypes$1.object,
  children: propTypes$1.node,
  closeAriaLabel: propTypes$1.string
};

var defaultProps$39 = {
  tag: 'h5',
  wrapTag: 'div',
  closeAriaLabel: 'Close'
};

var ModalHeader = function ModalHeader(props) {
  var closeButton = void 0;
  var className = props.className,
      cssModule = props.cssModule,
      children = props.children,
      toggle = props.toggle,
      Tag = props.tag,
      WrapTag = props.wrapTag,
      closeAriaLabel = props.closeAriaLabel,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'children', 'toggle', 'tag', 'wrapTag', 'closeAriaLabel']);


  var classes = mapToCssModules(classnames(className, 'modal-header'), cssModule);

  if (toggle) {
    closeButton = React__default.createElement(
      'button',
      { type: 'button', onClick: toggle, className: mapToCssModules('close', cssModule), 'aria-label': closeAriaLabel },
      React__default.createElement(
        'span',
        { 'aria-hidden': 'true' },
        String.fromCharCode(215)
      )
    );
  }

  return React__default.createElement(
    WrapTag,
    _extends({}, attributes, { className: classes }),
    React__default.createElement(
      Tag,
      { className: mapToCssModules('modal-title', cssModule) },
      children
    ),
    closeButton
  );
};

ModalHeader.propTypes = propTypes$44;
ModalHeader.defaultProps = defaultProps$39;

var propTypes$45 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$40 = {
  tag: 'div'
};

var ModalBody = function ModalBody(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

  var classes = mapToCssModules(classnames(className, 'modal-body'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

ModalBody.propTypes = propTypes$45;
ModalBody.defaultProps = defaultProps$40;

var propTypes$46 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$41 = {
  tag: 'div'
};

var ModalFooter = function ModalFooter(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

  var classes = mapToCssModules(classnames(className, 'modal-footer'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

ModalFooter.propTypes = propTypes$46;
ModalFooter.defaultProps = defaultProps$41;

var propTypes$47 = {
  placement: propTypes$1.oneOf(PopperPlacements),
  target: propTypes$1.oneOfType([propTypes$1.string, propTypes$1.func, DOMElement]).isRequired,
  container: propTypes$1.oneOfType([propTypes$1.string, propTypes$1.func, DOMElement]),
  isOpen: propTypes$1.bool,
  disabled: propTypes$1.bool,
  hideArrow: propTypes$1.bool,
  className: propTypes$1.string,
  innerClassName: propTypes$1.string,
  cssModule: propTypes$1.object,
  toggle: propTypes$1.func,
  autohide: propTypes$1.bool,
  placementPrefix: propTypes$1.string,
  delay: propTypes$1.oneOfType([propTypes$1.shape({ show: propTypes$1.number, hide: propTypes$1.number }), propTypes$1.number]),
  modifiers: propTypes$1.object
};

var DEFAULT_DELAYS$1 = {
  show: 0,
  hide: 250
};

var defaultProps$42 = {
  isOpen: false,
  hideArrow: false,
  placement: 'top',
  placementPrefix: 'bs-tooltip',
  delay: DEFAULT_DELAYS$1,
  autohide: true,
  toggle: function toggle() {}
};

var Tooltip = function (_React$Component) {
  inherits(Tooltip, _React$Component);

  function Tooltip(props) {
    classCallCheck(this, Tooltip);

    var _this = possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, props));

    _this.addTargetEvents = _this.addTargetEvents.bind(_this);
    _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
    _this.removeTargetEvents = _this.removeTargetEvents.bind(_this);
    _this.toggle = _this.toggle.bind(_this);
    _this.onMouseOverTooltip = _this.onMouseOverTooltip.bind(_this);
    _this.onMouseLeaveTooltip = _this.onMouseLeaveTooltip.bind(_this);
    _this.onMouseOverTooltipContent = _this.onMouseOverTooltipContent.bind(_this);
    _this.onMouseLeaveTooltipContent = _this.onMouseLeaveTooltipContent.bind(_this);
    _this.show = _this.show.bind(_this);
    _this.hide = _this.hide.bind(_this);
    return _this;
  }

  createClass(Tooltip, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._target = getTarget(this.props.target);
      this.addTargetEvents();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeTargetEvents();
    }
  }, {
    key: 'onMouseOverTooltip',
    value: function onMouseOverTooltip() {
      if (this._hideTimeout) {
        this.clearHideTimeout();
      }
      this._showTimeout = setTimeout(this.show, this.getDelay('show'));
    }
  }, {
    key: 'onMouseLeaveTooltip',
    value: function onMouseLeaveTooltip() {
      if (this._showTimeout) {
        this.clearShowTimeout();
      }
      this._hideTimeout = setTimeout(this.hide, this.getDelay('hide'));
    }
  }, {
    key: 'onMouseOverTooltipContent',
    value: function onMouseOverTooltipContent() {
      if (this.props.autohide) {
        return;
      }
      if (this._hideTimeout) {
        this.clearHideTimeout();
      }
    }
  }, {
    key: 'onMouseLeaveTooltipContent',
    value: function onMouseLeaveTooltipContent() {
      if (this.props.autohide) {
        return;
      }
      if (this._showTimeout) {
        this.clearShowTimeout();
      }
      this._hideTimeout = setTimeout(this.hide, this.getDelay('hide'));
    }
  }, {
    key: 'getDelay',
    value: function getDelay(key) {
      var delay = this.props.delay;

      if ((typeof delay === 'undefined' ? 'undefined' : _typeof(delay)) === 'object') {
        return isNaN(delay[key]) ? DEFAULT_DELAYS$1[key] : delay[key];
      }
      return delay;
    }
  }, {
    key: 'show',
    value: function show() {
      if (!this.props.isOpen) {
        this.clearShowTimeout();
        this.toggle();
      }
    }
  }, {
    key: 'hide',
    value: function hide() {
      if (this.props.isOpen) {
        this.clearHideTimeout();
        this.toggle();
      }
    }
  }, {
    key: 'clearShowTimeout',
    value: function clearShowTimeout() {
      clearTimeout(this._showTimeout);
      this._showTimeout = undefined;
    }
  }, {
    key: 'clearHideTimeout',
    value: function clearHideTimeout() {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = undefined;
    }
  }, {
    key: 'handleDocumentClick',
    value: function handleDocumentClick(e) {
      if (e.target === this._target || this._target.contains(e.target)) {
        if (this._hideTimeout) {
          this.clearHideTimeout();
        }

        if (!this.props.isOpen) {
          this.toggle();
        }
      }
    }
  }, {
    key: 'addTargetEvents',
    value: function addTargetEvents() {
      var _this2 = this;

      this._target.addEventListener('mouseover', this.onMouseOverTooltip, true);
      this._target.addEventListener('mouseout', this.onMouseLeaveTooltip, true);
      ['click', 'touchstart'].forEach(function (event) {
        return document.addEventListener(event, _this2.handleDocumentClick, true);
      });
    }
  }, {
    key: 'removeTargetEvents',
    value: function removeTargetEvents() {
      var _this3 = this;

      this._target.removeEventListener('mouseover', this.onMouseOverTooltip, true);
      this._target.removeEventListener('mouseout', this.onMouseLeaveTooltip, true);
      ['click', 'touchstart'].forEach(function (event) {
        return document.removeEventListener(event, _this3.handleDocumentClick, true);
      });
    }
  }, {
    key: 'toggle',
    value: function toggle(e) {
      if (this.props.disabled) {
        return e && e.preventDefault();
      }

      return this.props.toggle();
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.isOpen) {
        return null;
      }

      var attributes = omit(this.props, Object.keys(propTypes$47));
      var classes = mapToCssModules(classnames('tooltip-inner', this.props.innerClassName), this.props.cssModule);

      var popperClasses = mapToCssModules(classnames('tooltip', 'show', this.props.className), this.props.cssModule);

      return React__default.createElement(
        PopperContent,
        {
          className: popperClasses,
          target: this.props.target,
          isOpen: this.props.isOpen,
          hideArrow: this.props.hideArrow,
          placement: this.props.placement,
          placementPrefix: this.props.placementPrefix,
          container: this.props.container,
          modifiers: this.props.modifiers
        },
        React__default.createElement('div', _extends({}, attributes, {
          className: classes,
          onMouseOver: this.onMouseOverTooltipContent,
          onMouseLeave: this.onMouseLeaveTooltipContent
        }))
      );
    }
  }]);
  return Tooltip;
}(React__default.Component);

Tooltip.propTypes = propTypes$47;
Tooltip.defaultProps = defaultProps$42;

var propTypes$48 = {
  className: propTypes$1.string,
  cssModule: propTypes$1.object,
  size: propTypes$1.string,
  bordered: propTypes$1.bool,
  borderless: propTypes$1.bool,
  striped: propTypes$1.bool,
  inverse: deprecated(propTypes$1.bool, 'Please use the prop "dark"'),
  dark: propTypes$1.bool,
  hover: propTypes$1.bool,
  responsive: propTypes$1.oneOfType([propTypes$1.bool, propTypes$1.string]),
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  responsiveTag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string])
};

var defaultProps$43 = {
  tag: 'table',
  responsiveTag: 'div'
};

var Table = function Table(props) {
  var className = props.className,
      cssModule = props.cssModule,
      size = props.size,
      bordered = props.bordered,
      borderless = props.borderless,
      striped = props.striped,
      inverse = props.inverse,
      dark = props.dark,
      hover = props.hover,
      responsive = props.responsive,
      Tag = props.tag,
      ResponsiveTag = props.responsiveTag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'size', 'bordered', 'borderless', 'striped', 'inverse', 'dark', 'hover', 'responsive', 'tag', 'responsiveTag']);


  var classes = mapToCssModules(classnames(className, 'table', size ? 'table-' + size : false, bordered ? 'table-bordered' : false, borderless ? 'table-borderless' : false, striped ? 'table-striped' : false, dark || inverse ? 'table-dark' : false, hover ? 'table-hover' : false), cssModule);

  var table = React__default.createElement(Tag, _extends({}, attributes, { className: classes }));

  if (responsive) {
    var responsiveClassName = responsive === true ? 'table-responsive' : 'table-responsive-' + responsive;

    return React__default.createElement(
      ResponsiveTag,
      { className: responsiveClassName },
      table
    );
  }

  return table;
};

Table.propTypes = propTypes$48;
Table.defaultProps = defaultProps$43;

var propTypes$49 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  flush: propTypes$1.bool,
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$44 = {
  tag: 'ul'
};

var ListGroup = function ListGroup(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      flush = props.flush,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag', 'flush']);

  var classes = mapToCssModules(classnames(className, 'list-group', flush ? 'list-group-flush' : false), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

ListGroup.propTypes = propTypes$49;
ListGroup.defaultProps = defaultProps$44;

var propTypes$50 = {
  children: propTypes$1.node,
  inline: propTypes$1.bool,
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  innerRef: propTypes$1.oneOfType([propTypes$1.object, propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$45 = {
  tag: 'form'
};

var Form = function Form(props) {
  var className = props.className,
      cssModule = props.cssModule,
      inline = props.inline,
      Tag = props.tag,
      innerRef = props.innerRef,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'inline', 'tag', 'innerRef']);


  var classes = mapToCssModules(classnames(className, inline ? 'form-inline' : false), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { ref: innerRef, className: classes }));
};

Form.propTypes = propTypes$50;
Form.defaultProps = defaultProps$45;

var propTypes$51 = {
  children: propTypes$1.node,
  tag: propTypes$1.string,
  className: propTypes$1.string,
  cssModule: propTypes$1.object,
  valid: propTypes$1.bool
};

var defaultProps$46 = {
  tag: 'div',
  valid: undefined
};

var FormFeedback = function FormFeedback(props) {
  var className = props.className,
      cssModule = props.cssModule,
      valid = props.valid,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'valid', 'tag']);


  var classes = mapToCssModules(classnames(className, valid ? 'valid-feedback' : 'invalid-feedback'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

FormFeedback.propTypes = propTypes$51;
FormFeedback.defaultProps = defaultProps$46;

var propTypes$52 = {
  children: propTypes$1.node,
  row: propTypes$1.bool,
  check: propTypes$1.bool,
  inline: propTypes$1.bool,
  disabled: propTypes$1.bool,
  tag: propTypes$1.string,
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$47 = {
  tag: 'div'
};

var FormGroup = function FormGroup(props) {
  var className = props.className,
      cssModule = props.cssModule,
      row = props.row,
      disabled = props.disabled,
      check = props.check,
      inline = props.inline,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'row', 'disabled', 'check', 'inline', 'tag']);


  var classes = mapToCssModules(classnames(className, row ? 'row' : false, check ? 'form-check' : 'form-group', check && inline ? 'form-check-inline' : false, check && disabled ? 'disabled' : false), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

FormGroup.propTypes = propTypes$52;
FormGroup.defaultProps = defaultProps$47;

var propTypes$53 = {
  children: propTypes$1.node,
  inline: propTypes$1.bool,
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  color: propTypes$1.string,
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$48 = {
  tag: 'small',
  color: 'muted'
};

var FormText = function FormText(props) {
  var className = props.className,
      cssModule = props.cssModule,
      inline = props.inline,
      color = props.color,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'inline', 'color', 'tag']);


  var classes = mapToCssModules(classnames(className, !inline ? 'form-text' : false, color ? 'text-' + color : false), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

FormText.propTypes = propTypes$53;
FormText.defaultProps = defaultProps$48;

/* eslint react/prefer-stateless-function: 0 */

var propTypes$54 = {
  children: propTypes$1.node,
  type: propTypes$1.string,
  size: propTypes$1.string,
  bsSize: propTypes$1.string,
  state: deprecated(propTypes$1.string, 'Please use the props "valid" and "invalid" to indicate the state.'),
  valid: propTypes$1.bool,
  invalid: propTypes$1.bool,
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  innerRef: propTypes$1.oneOfType([propTypes$1.object, propTypes$1.func, propTypes$1.string]),
  static: deprecated(propTypes$1.bool, 'Please use the prop "plaintext"'),
  plaintext: propTypes$1.bool,
  addon: propTypes$1.bool,
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$49 = {
  type: 'text'
};

var Input = function (_React$Component) {
  inherits(Input, _React$Component);

  function Input() {
    classCallCheck(this, Input);
    return possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));
  }

  createClass(Input, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          cssModule = _props.cssModule,
          type = _props.type,
          bsSize = _props.bsSize,
          state = _props.state,
          valid = _props.valid,
          invalid = _props.invalid,
          tag = _props.tag,
          addon = _props.addon,
          staticInput = _props.static,
          plaintext = _props.plaintext,
          innerRef = _props.innerRef,
          attributes = objectWithoutProperties(_props, ['className', 'cssModule', 'type', 'bsSize', 'state', 'valid', 'invalid', 'tag', 'addon', 'static', 'plaintext', 'innerRef']);


      var checkInput = ['radio', 'checkbox'].indexOf(type) > -1;
      var isNotaNumber = new RegExp('\\D', 'g');

      var fileInput = type === 'file';
      var textareaInput = type === 'textarea';
      var selectInput = type === 'select';
      var Tag = tag || (selectInput || textareaInput ? type : 'input');

      var formControlClass = 'form-control';

      if (plaintext || staticInput) {
        formControlClass = formControlClass + '-plaintext';
        Tag = tag || 'p';
      } else if (fileInput) {
        formControlClass = formControlClass + '-file';
      } else if (checkInput) {
        if (addon) {
          formControlClass = null;
        } else {
          formControlClass = 'form-check-input';
        }
      }

      if (state && typeof valid === 'undefined' && typeof invalid === 'undefined') {
        if (state === 'danger') {
          invalid = true;
        } else if (state === 'success') {
          valid = true;
        }
      }

      if (attributes.size && isNotaNumber.test(attributes.size)) {
        warnOnce('Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.');
        bsSize = attributes.size;
        delete attributes.size;
      }

      var classes = mapToCssModules(classnames(className, invalid && 'is-invalid', valid && 'is-valid', bsSize ? 'form-control-' + bsSize : false, formControlClass), cssModule);

      if (Tag === 'input' || typeof tag !== 'string') {
        attributes.type = type;
      }

      if (attributes.children && !(plaintext || staticInput || type === 'select' || typeof Tag !== 'string' || Tag === 'select')) {
        warnOnce('Input with a type of "' + type + '" cannot have children. Please use "value"/"defaultValue" instead.');
        delete attributes.children;
      }

      return React__default.createElement(Tag, _extends({}, attributes, { ref: innerRef, className: classes }));
    }
  }]);
  return Input;
}(React__default.Component);

Input.propTypes = propTypes$54;
Input.defaultProps = defaultProps$49;

var propTypes$55 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  size: propTypes$1.string,
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$50 = {
  tag: 'div'
};

var InputGroup = function InputGroup(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      size = props.size,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag', 'size']);

  var classes = mapToCssModules(classnames(className, 'input-group', size ? 'input-group-' + size : null), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

InputGroup.propTypes = propTypes$55;
InputGroup.defaultProps = defaultProps$50;

var propTypes$57 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$52 = {
  tag: 'span'
};

var InputGroupText = function InputGroupText(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);


  var classes = mapToCssModules(classnames(className, 'input-group-text'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

InputGroupText.propTypes = propTypes$57;
InputGroupText.defaultProps = defaultProps$52;

var propTypes$56 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  addonType: propTypes$1.oneOf(['prepend', 'append']).isRequired,
  children: propTypes$1.node,
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$51 = {
  tag: 'div'
};

var InputGroupAddon = function InputGroupAddon(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      addonType = props.addonType,
      children = props.children,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag', 'addonType', 'children']);


  var classes = mapToCssModules(classnames(className, 'input-group-' + addonType), cssModule);

  // Convenience to assist with transition
  if (typeof children === 'string') {
    return React__default.createElement(
      Tag,
      _extends({}, attributes, { className: classes }),
      React__default.createElement(InputGroupText, { children: children })
    );
  }

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes, children: children }));
};

InputGroupAddon.propTypes = propTypes$56;
InputGroupAddon.defaultProps = defaultProps$51;

var propTypes$58 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  addonType: propTypes$1.oneOf(['prepend', 'append']).isRequired,
  children: propTypes$1.node,
  groupClassName: propTypes$1.string,
  groupAttributes: propTypes$1.object,
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var InputGroupButton = function InputGroupButton(props) {
  warnOnce('The "InputGroupButton" component has been deprecated.\nPlease use component "InputGroupAddon".');

  var children = props.children,
      groupClassName = props.groupClassName,
      groupAttributes = props.groupAttributes,
      propsWithoutGroup = objectWithoutProperties(props, ['children', 'groupClassName', 'groupAttributes']);


  if (typeof children === 'string') {
    var cssModule = propsWithoutGroup.cssModule,
        tag = propsWithoutGroup.tag,
        addonType = propsWithoutGroup.addonType,
        attributes = objectWithoutProperties(propsWithoutGroup, ['cssModule', 'tag', 'addonType']);


    var allGroupAttributes = _extends({}, groupAttributes, {
      cssModule: cssModule,
      tag: tag,
      addonType: addonType
    });

    return React__default.createElement(
      InputGroupAddon,
      _extends({}, allGroupAttributes, { className: groupClassName }),
      React__default.createElement(Button, _extends({}, attributes, { children: children }))
    );
  }

  return React__default.createElement(InputGroupAddon, _extends({}, props, { children: children }));
};

InputGroupButton.propTypes = propTypes$58;

var propTypes$59 = {
  addonType: propTypes$1.oneOf(['prepend', 'append']).isRequired,
  children: propTypes$1.node
};

var InputGroupButtonDropdown = function InputGroupButtonDropdown(props) {
  return React__default.createElement(Dropdown, props);
};

InputGroupButtonDropdown.propTypes = propTypes$59;

var colWidths$1 = ['xs', 'sm', 'md', 'lg', 'xl'];

var stringOrNumberProp$1 = propTypes$1.oneOfType([propTypes$1.number, propTypes$1.string]);

var columnProps$1 = propTypes$1.oneOfType([propTypes$1.string, propTypes$1.number, propTypes$1.shape({
  size: stringOrNumberProp$1,
  push: deprecated(stringOrNumberProp$1, 'Please use the prop "order"'),
  pull: deprecated(stringOrNumberProp$1, 'Please use the prop "order"'),
  order: stringOrNumberProp$1,
  offset: stringOrNumberProp$1
})]);

var propTypes$60 = {
  children: propTypes$1.node,
  hidden: propTypes$1.bool,
  check: propTypes$1.bool,
  size: propTypes$1.string,
  for: propTypes$1.string,
  tag: propTypes$1.string,
  className: propTypes$1.string,
  cssModule: propTypes$1.object,
  xs: columnProps$1,
  sm: columnProps$1,
  md: columnProps$1,
  lg: columnProps$1,
  xl: columnProps$1,
  widths: propTypes$1.array
};

var defaultProps$53 = {
  tag: 'label',
  widths: colWidths$1
};

var getColumnSizeClass$1 = function getColumnSizeClass(isXs, colWidth, colSize) {
  if (colSize === true || colSize === '') {
    return isXs ? 'col' : 'col-' + colWidth;
  } else if (colSize === 'auto') {
    return isXs ? 'col-auto' : 'col-' + colWidth + '-auto';
  }

  return isXs ? 'col-' + colSize : 'col-' + colWidth + '-' + colSize;
};

var Label = function Label(props) {
  var className = props.className,
      cssModule = props.cssModule,
      hidden = props.hidden,
      widths = props.widths,
      Tag = props.tag,
      check = props.check,
      size = props.size,
      htmlFor = props.for,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'hidden', 'widths', 'tag', 'check', 'size', 'for']);


  var colClasses = [];

  widths.forEach(function (colWidth, i) {
    var columnProp = props[colWidth];

    delete attributes[colWidth];

    if (!columnProp && columnProp !== '') {
      return;
    }

    var isXs = !i;
    var colClass = void 0;

    if (lodash_isobject(columnProp)) {
      var _classNames;

      var colSizeInterfix = isXs ? '-' : '-' + colWidth + '-';
      colClass = getColumnSizeClass$1(isXs, colWidth, columnProp.size);

      colClasses.push(mapToCssModules(classnames((_classNames = {}, defineProperty(_classNames, colClass, columnProp.size || columnProp.size === ''), defineProperty(_classNames, 'order' + colSizeInterfix + columnProp.order, columnProp.order || columnProp.order === 0), defineProperty(_classNames, 'offset' + colSizeInterfix + columnProp.offset, columnProp.offset || columnProp.offset === 0), _classNames))), cssModule);
    } else {
      colClass = getColumnSizeClass$1(isXs, colWidth, columnProp);
      colClasses.push(colClass);
    }
  });

  var classes = mapToCssModules(classnames(className, hidden ? 'sr-only' : false, check ? 'form-check-label' : false, size ? 'col-form-label-' + size : false, colClasses, colClasses.length ? 'col-form-label' : false), cssModule);

  return React__default.createElement(Tag, _extends({ htmlFor: htmlFor }, attributes, { className: classes }));
};

Label.propTypes = propTypes$60;
Label.defaultProps = defaultProps$53;

var propTypes$61 = {
  body: propTypes$1.bool,
  bottom: propTypes$1.bool,
  children: propTypes$1.node,
  className: propTypes$1.string,
  cssModule: propTypes$1.object,
  heading: propTypes$1.bool,
  left: propTypes$1.bool,
  list: propTypes$1.bool,
  middle: propTypes$1.bool,
  object: propTypes$1.bool,
  right: propTypes$1.bool,
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  top: propTypes$1.bool
};

var Media = function Media(props) {
  var body = props.body,
      bottom = props.bottom,
      className = props.className,
      cssModule = props.cssModule,
      heading = props.heading,
      left = props.left,
      list = props.list,
      middle = props.middle,
      object = props.object,
      right = props.right,
      tag = props.tag,
      top = props.top,
      attributes = objectWithoutProperties(props, ['body', 'bottom', 'className', 'cssModule', 'heading', 'left', 'list', 'middle', 'object', 'right', 'tag', 'top']);


  var defaultTag = void 0;
  if (heading) {
    defaultTag = 'h4';
  } else if (left || right) {
    defaultTag = 'a';
  } else if (object) {
    defaultTag = 'img';
  } else if (list) {
    defaultTag = 'ul';
  } else {
    defaultTag = 'div';
  }
  var Tag = tag || defaultTag;

  var classes = mapToCssModules(classnames(className, {
    'media-body': body,
    'media-heading': heading,
    'media-left': left,
    'media-right': right,
    'media-top': top,
    'media-bottom': bottom,
    'media-middle': middle,
    'media-object': object,
    'media-list': list,
    media: !body && !heading && !left && !right && !top && !bottom && !middle && !object && !list
  }), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

Media.propTypes = propTypes$61;

var propTypes$62 = {
  children: propTypes$1.node,
  className: propTypes$1.string,
  cssModule: propTypes$1.object,
  size: propTypes$1.string,
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string])
};

var defaultProps$54 = {
  tag: 'ul'
};

var Pagination = function Pagination(props) {
  var className = props.className,
      cssModule = props.cssModule,
      size = props.size,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'size', 'tag']);


  var classes = mapToCssModules(classnames(className, 'pagination', defineProperty({}, 'pagination-' + size, !!size)), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

Pagination.propTypes = propTypes$62;
Pagination.defaultProps = defaultProps$54;

var propTypes$63 = {
  active: propTypes$1.bool,
  children: propTypes$1.node,
  className: propTypes$1.string,
  cssModule: propTypes$1.object,
  disabled: propTypes$1.bool,
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string])
};

var defaultProps$55 = {
  tag: 'li'
};

var PaginationItem = function PaginationItem(props) {
  var active = props.active,
      className = props.className,
      cssModule = props.cssModule,
      disabled = props.disabled,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['active', 'className', 'cssModule', 'disabled', 'tag']);


  var classes = mapToCssModules(classnames(className, 'page-item', {
    active: active,
    disabled: disabled
  }), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

PaginationItem.propTypes = propTypes$63;
PaginationItem.defaultProps = defaultProps$55;

var propTypes$64 = {
  'aria-label': propTypes$1.string,
  children: propTypes$1.node,
  className: propTypes$1.string,
  cssModule: propTypes$1.object,
  next: propTypes$1.bool,
  previous: propTypes$1.bool,
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string])
};

var defaultProps$56 = {
  tag: 'a'
};

var PaginationLink = function PaginationLink(props) {
  var className = props.className,
      cssModule = props.cssModule,
      next = props.next,
      previous = props.previous,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'next', 'previous', 'tag']);


  var classes = mapToCssModules(classnames(className, 'page-link'), cssModule);

  var defaultAriaLabel = void 0;
  if (previous) {
    defaultAriaLabel = 'Previous';
  } else if (next) {
    defaultAriaLabel = 'Next';
  }
  var ariaLabel = props['aria-label'] || defaultAriaLabel;

  var defaultCaret = void 0;
  if (previous) {
    defaultCaret = '\xAB';
  } else if (next) {
    defaultCaret = '\xBB';
  }

  var children = props.children;
  if (children && Array.isArray(children) && children.length === 0) {
    children = null;
  }

  if (previous || next) {
    children = [React__default.createElement(
      'span',
      {
        'aria-hidden': 'true',
        key: 'caret'
      },
      children || defaultCaret
    ), React__default.createElement(
      'span',
      {
        className: 'sr-only',
        key: 'sr'
      },
      ariaLabel
    )];
  }

  return React__default.createElement(
    Tag,
    _extends({}, attributes, {
      className: classes,
      'aria-label': ariaLabel
    }),
    children
  );
};

PaginationLink.propTypes = propTypes$64;
PaginationLink.defaultProps = defaultProps$56;

var propTypes$65 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  activeTab: propTypes$1.any,
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$57 = {
  tag: 'div'
};

var childContextTypes$2 = {
  activeTabId: propTypes$1.any
};

var TabContent = function (_Component) {
  inherits(TabContent, _Component);

  function TabContent(props) {
    classCallCheck(this, TabContent);

    var _this = possibleConstructorReturn(this, (TabContent.__proto__ || Object.getPrototypeOf(TabContent)).call(this, props));

    _this.state = {
      activeTab: _this.props.activeTab
    };
    return _this;
  }

  createClass(TabContent, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        activeTabId: this.state.activeTab
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.state.activeTab !== nextProps.activeTab) {
        this.setState({
          activeTab: nextProps.activeTab
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          cssModule = _props.cssModule,
          Tag = _props.tag;


      var attributes = omit(this.props, Object.keys(propTypes$65));

      var classes = mapToCssModules(classnames('tab-content', className), cssModule);

      return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
    }
  }]);
  return TabContent;
}(React.Component);

TabContent.propTypes = propTypes$65;
TabContent.defaultProps = defaultProps$57;
TabContent.childContextTypes = childContextTypes$2;

var propTypes$66 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.string,
  cssModule: propTypes$1.object,
  tabId: propTypes$1.any
};

var defaultProps$58 = {
  tag: 'div'
};

var contextTypes$3 = {
  activeTabId: propTypes$1.any
};

function TabPane(props, context) {
  var className = props.className,
      cssModule = props.cssModule,
      tabId = props.tabId,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tabId', 'tag']);

  var classes = mapToCssModules(classnames('tab-pane', className, { active: tabId === context.activeTabId }), cssModule);
  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
}
TabPane.propTypes = propTypes$66;
TabPane.defaultProps = defaultProps$58;
TabPane.contextTypes = contextTypes$3;

var propTypes$67 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  fluid: propTypes$1.bool,
  className: propTypes$1.string,
  cssModule: propTypes$1.object
};

var defaultProps$59 = {
  tag: 'div'
};

var Jumbotron = function Jumbotron(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      fluid = props.fluid,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag', 'fluid']);


  var classes = mapToCssModules(classnames(className, 'jumbotron', fluid ? 'jumbotron-fluid' : false), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

Jumbotron.propTypes = propTypes$67;
Jumbotron.defaultProps = defaultProps$59;

var propTypes$68 = {
  children: propTypes$1.node,
  className: propTypes$1.string,
  closeClassName: propTypes$1.string,
  closeAriaLabel: propTypes$1.string,
  cssModule: propTypes$1.object,
  color: propTypes$1.string,
  isOpen: propTypes$1.bool,
  toggle: propTypes$1.func,
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  transition: propTypes$1.shape(Fade.propTypes)
};

var defaultProps$60 = {
  color: 'success',
  isOpen: true,
  tag: 'div',
  closeAriaLabel: 'Close',
  transition: _extends({}, Fade.defaultProps, {
    unmountOnExit: true
  })
};

function Alert(props) {
  var className = props.className,
      closeClassName = props.closeClassName,
      closeAriaLabel = props.closeAriaLabel,
      cssModule = props.cssModule,
      Tag = props.tag,
      color = props.color,
      isOpen = props.isOpen,
      toggle = props.toggle,
      children = props.children,
      transition = props.transition,
      attributes = objectWithoutProperties(props, ['className', 'closeClassName', 'closeAriaLabel', 'cssModule', 'tag', 'color', 'isOpen', 'toggle', 'children', 'transition']);


  var classes = mapToCssModules(classnames(className, 'alert', 'alert-' + color, { 'alert-dismissible': toggle }), cssModule);

  var closeClasses = mapToCssModules(classnames('close', closeClassName), cssModule);

  return React__default.createElement(
    Fade,
    _extends({}, attributes, transition, { tag: Tag, className: classes, 'in': isOpen, role: 'alert' }),
    toggle ? React__default.createElement(
      'button',
      { type: 'button', className: closeClasses, 'aria-label': closeAriaLabel, onClick: toggle },
      React__default.createElement(
        'span',
        { 'aria-hidden': 'true' },
        '\xD7'
      )
    ) : null,
    children
  );
}

Alert.propTypes = propTypes$68;
Alert.defaultProps = defaultProps$60;

var _transitionStatusToCl;

var propTypes$69 = _extends({}, Transition.propTypes, {
  isOpen: propTypes$1.bool,
  children: propTypes$1.oneOfType([propTypes$1.arrayOf(propTypes$1.node), propTypes$1.node]),
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.node,
  navbar: propTypes$1.bool,
  cssModule: propTypes$1.object
});

var defaultProps$61 = _extends({}, Transition.defaultProps, {
  isOpen: false,
  appear: false,
  enter: true,
  exit: true,
  tag: 'div',
  timeout: TransitionTimeouts.Collapse
});

var transitionStatusToClassHash = (_transitionStatusToCl = {}, defineProperty(_transitionStatusToCl, TransitionStatuses.ENTERING, 'collapsing'), defineProperty(_transitionStatusToCl, TransitionStatuses.ENTERED, 'collapse show'), defineProperty(_transitionStatusToCl, TransitionStatuses.EXITING, 'collapsing'), defineProperty(_transitionStatusToCl, TransitionStatuses.EXITED, 'collapse'), _transitionStatusToCl);

function getTransitionClass(status) {
  return transitionStatusToClassHash[status] || 'collapse';
}

function getHeight(node) {
  return node.scrollHeight;
}

var Collapse = function (_Component) {
  inherits(Collapse, _Component);

  function Collapse(props) {
    classCallCheck(this, Collapse);

    var _this = possibleConstructorReturn(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).call(this, props));

    _this.state = {
      height: null
    };

    ['onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'].forEach(function (name) {
      _this[name] = _this[name].bind(_this);
    });
    return _this;
  }

  createClass(Collapse, [{
    key: 'onEntering',
    value: function onEntering(node, isAppearing) {
      this.setState({ height: getHeight(node) });
      this.props.onEntering(node, isAppearing);
    }
  }, {
    key: 'onEntered',
    value: function onEntered(node, isAppearing) {
      this.setState({ height: null });
      this.props.onEntered(node, isAppearing);
    }
  }, {
    key: 'onExit',
    value: function onExit(node) {
      this.setState({ height: getHeight(node) });
      this.props.onExit(node);
    }
  }, {
    key: 'onExiting',
    value: function onExiting(node) {
      // getting this variable triggers a reflow
      var _unused = node.offsetHeight; // eslint-disable-line no-unused-vars
      this.setState({ height: 0 });
      this.props.onExiting(node);
    }
  }, {
    key: 'onExited',
    value: function onExited(node) {
      this.setState({ height: null });
      this.props.onExited(node);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          Tag = _props.tag,
          isOpen = _props.isOpen,
          className = _props.className,
          navbar = _props.navbar,
          cssModule = _props.cssModule,
          children = _props.children,
          otherProps = objectWithoutProperties(_props, ['tag', 'isOpen', 'className', 'navbar', 'cssModule', 'children']);
      var height = this.state.height;

      // In NODE_ENV=production the Transition.propTypes are wrapped which results in an
      // empty object "{}". This is the result of the `react-transition-group` babel
      // configuration settings. Therefore, to ensure that production builds work without
      // error, we can either explicitly define keys or use the Transition.defaultProps.
      // Using the Transition.defaultProps excludes any required props. Thus, the best
      // solution is to explicitly define required props in our utilities and reference these.
      // This also gives us more flexibility in the future to remove the prop-types
      // dependency in distribution builds (Similar to how `react-transition-group` does).
      // Note: Without omitting the `react-transition-group` props, the resulting child
      // Tag component would inherit the Transition properties as attributes for the HTML
      // element which results in errors/warnings for non-valid attributes.

      var transitionProps = pick(otherProps, TransitionPropTypeKeys);
      var childProps = omit(otherProps, TransitionPropTypeKeys);

      return React__default.createElement(
        Transition,
        _extends({}, transitionProps, {
          'in': isOpen,
          onEntering: this.onEntering,
          onEntered: this.onEntered,
          onExit: this.onExit,
          onExiting: this.onExiting,
          onExited: this.onExited
        }),
        function (status) {
          var collapseClass = getTransitionClass(status);
          var classes = mapToCssModules(classnames(className, collapseClass, navbar && 'navbar-collapse'), cssModule);
          var style = height === null ? null : { height: height };
          return React__default.createElement(
            Tag,
            _extends({}, childProps, {
              style: _extends({}, childProps.style, style),
              className: classes
            }),
            children
          );
        }
      );
    }
  }]);
  return Collapse;
}(React.Component);

Collapse.propTypes = propTypes$69;
Collapse.defaultProps = defaultProps$61;

var propTypes$70 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  active: propTypes$1.bool,
  disabled: propTypes$1.bool,
  color: propTypes$1.string,
  action: propTypes$1.bool,
  className: propTypes$1.any,
  cssModule: propTypes$1.object
};

var defaultProps$62 = {
  tag: 'li'
};

var handleDisabledOnClick = function handleDisabledOnClick(e) {
  e.preventDefault();
};

var ListGroupItem = function ListGroupItem(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      active = props.active,
      disabled = props.disabled,
      action = props.action,
      color = props.color,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag', 'active', 'disabled', 'action', 'color']);

  var classes = mapToCssModules(classnames(className, active ? 'active' : false, disabled ? 'disabled' : false, action ? 'list-group-item-action' : false, color ? 'list-group-item-' + color : false, 'list-group-item'), cssModule);

  // Prevent click event when disabled.
  if (disabled) {
    attributes.onClick = handleDisabledOnClick;
  }
  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

ListGroupItem.propTypes = propTypes$70;
ListGroupItem.defaultProps = defaultProps$62;

var propTypes$71 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.any,
  cssModule: propTypes$1.object
};

var defaultProps$63 = {
  tag: 'h5'
};

var ListGroupItemHeading = function ListGroupItemHeading(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

  var classes = mapToCssModules(classnames(className, 'list-group-item-heading'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

ListGroupItemHeading.propTypes = propTypes$71;
ListGroupItemHeading.defaultProps = defaultProps$63;

var propTypes$72 = {
  tag: propTypes$1.oneOfType([propTypes$1.func, propTypes$1.string]),
  className: propTypes$1.any,
  cssModule: propTypes$1.object
};

var defaultProps$64 = {
  tag: 'p'
};

var ListGroupItemText = function ListGroupItemText(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

  var classes = mapToCssModules(classnames(className, 'list-group-item-text'), cssModule);

  return React__default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

ListGroupItemText.propTypes = propTypes$72;
ListGroupItemText.defaultProps = defaultProps$64;

var UncontrolledAlert = function (_Component) {
  inherits(UncontrolledAlert, _Component);

  function UncontrolledAlert(props) {
    classCallCheck(this, UncontrolledAlert);

    var _this = possibleConstructorReturn(this, (UncontrolledAlert.__proto__ || Object.getPrototypeOf(UncontrolledAlert)).call(this, props));

    _this.state = { isOpen: true };
    _this.toggle = _this.toggle.bind(_this);
    return _this;
  }

  createClass(UncontrolledAlert, [{
    key: 'toggle',
    value: function toggle() {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }, {
    key: 'render',
    value: function render() {
      return React__default.createElement(Alert, _extends({ isOpen: this.state.isOpen, toggle: this.toggle }, this.props));
    }
  }]);
  return UncontrolledAlert;
}(React.Component);

var UncontrolledButtonDropdown = function (_Component) {
  inherits(UncontrolledButtonDropdown, _Component);

  function UncontrolledButtonDropdown(props) {
    classCallCheck(this, UncontrolledButtonDropdown);

    var _this = possibleConstructorReturn(this, (UncontrolledButtonDropdown.__proto__ || Object.getPrototypeOf(UncontrolledButtonDropdown)).call(this, props));

    _this.state = { isOpen: false };
    _this.toggle = _this.toggle.bind(_this);
    return _this;
  }

  createClass(UncontrolledButtonDropdown, [{
    key: 'toggle',
    value: function toggle() {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }, {
    key: 'render',
    value: function render() {
      return React__default.createElement(ButtonDropdown, _extends({ isOpen: this.state.isOpen, toggle: this.toggle }, this.props));
    }
  }]);
  return UncontrolledButtonDropdown;
}(React.Component);

var UncontrolledDropdown = function (_Component) {
  inherits(UncontrolledDropdown, _Component);

  function UncontrolledDropdown(props) {
    classCallCheck(this, UncontrolledDropdown);

    var _this = possibleConstructorReturn(this, (UncontrolledDropdown.__proto__ || Object.getPrototypeOf(UncontrolledDropdown)).call(this, props));

    _this.state = { isOpen: false };
    _this.toggle = _this.toggle.bind(_this);
    return _this;
  }

  createClass(UncontrolledDropdown, [{
    key: 'toggle',
    value: function toggle() {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }, {
    key: 'render',
    value: function render() {
      return React__default.createElement(Dropdown, _extends({ isOpen: this.state.isOpen, toggle: this.toggle }, this.props));
    }
  }]);
  return UncontrolledDropdown;
}(React.Component);

var UncontrolledNavDropdown = function UncontrolledNavDropdown(props) {
  warnOnce('The "UncontrolledNavDropdown" component has been deprecated.\nPlease use component "UncontrolledDropdown" with nav prop.');

  return React__default.createElement(UncontrolledDropdown, _extends({ nav: true }, props));
};

var UncontrolledTooltip = function (_Component) {
  inherits(UncontrolledTooltip, _Component);

  function UncontrolledTooltip(props) {
    classCallCheck(this, UncontrolledTooltip);

    var _this = possibleConstructorReturn(this, (UncontrolledTooltip.__proto__ || Object.getPrototypeOf(UncontrolledTooltip)).call(this, props));

    _this.state = { isOpen: false };
    _this.toggle = _this.toggle.bind(_this);
    return _this;
  }

  createClass(UncontrolledTooltip, [{
    key: 'toggle',
    value: function toggle() {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }, {
    key: 'render',
    value: function render() {
      return React__default.createElement(Tooltip, _extends({ isOpen: this.state.isOpen, toggle: this.toggle }, this.props));
    }
  }]);
  return UncontrolledTooltip;
}(React.Component);

exports.Alert = Alert;
exports.Container = Container;
exports.Row = Row;
exports.Col = Col;
exports.Navbar = Navbar;
exports.NavbarBrand = NavbarBrand;
exports.NavbarToggler = NavbarToggler;
exports.Nav = Nav;
exports.NavItem = NavItem;
exports.NavDropdown = NavDropdown;
exports.NavLink = NavLink;
exports.Breadcrumb = Breadcrumb;
exports.BreadcrumbItem = BreadcrumbItem;
exports.Button = Button;
exports.ButtonDropdown = ButtonDropdown;
exports.ButtonGroup = ButtonGroup;
exports.ButtonToolbar = ButtonToolbar;
exports.Dropdown = Dropdown;
exports.DropdownItem = DropdownItem;
exports.DropdownMenu = DropdownMenu;
exports.DropdownToggle = DropdownToggle;
exports.Fade = Fade;
exports.Badge = Badge;
exports.Card = Card;
exports.CardLink = CardLink;
exports.CardGroup = CardGroup;
exports.CardDeck = CardDeck;
exports.CardColumns = CardColumns;
exports.CardBody = CardBody;
exports.CardBlock = CardBlock;
exports.CardFooter = CardFooter;
exports.CardHeader = CardHeader;
exports.CardImg = CardImg;
exports.CardImgOverlay = CardImgOverlay;
exports.Carousel = Carousel;
exports.UncontrolledCarousel = UncontrolledCarousel;
exports.CarouselControl = CarouselControl;
exports.CarouselItem = CarouselItem;
exports.CarouselIndicators = CarouselIndicators;
exports.CarouselCaption = CarouselCaption;
exports.CardSubtitle = CardSubtitle;
exports.CardText = CardText;
exports.CardTitle = CardTitle;
exports.Popover = Popover;
exports.PopoverContent = PopoverContent;
exports.PopoverBody = PopoverBody;
exports.PopoverTitle = PopoverTitle;
exports.PopoverHeader = PopoverHeader;
exports.Progress = Progress;
exports.Modal = Modal;
exports.ModalHeader = ModalHeader;
exports.ModalBody = ModalBody;
exports.ModalFooter = ModalFooter;
exports.PopperContent = PopperContent;
exports.PopperTargetHelper = PopperTargetHelper;
exports.Tooltip = Tooltip;
exports.Table = Table;
exports.ListGroup = ListGroup;
exports.Form = Form;
exports.FormFeedback = FormFeedback;
exports.FormGroup = FormGroup;
exports.FormText = FormText;
exports.Input = Input;
exports.InputGroup = InputGroup;
exports.InputGroupAddon = InputGroupAddon;
exports.InputGroupButton = InputGroupButton;
exports.InputGroupButtonDropdown = InputGroupButtonDropdown;
exports.InputGroupText = InputGroupText;
exports.Label = Label;
exports.CustomInput = CustomInput;
exports.Media = Media;
exports.Pagination = Pagination;
exports.PaginationItem = PaginationItem;
exports.PaginationLink = PaginationLink;
exports.TabContent = TabContent;
exports.TabPane = TabPane;
exports.Jumbotron = Jumbotron;
exports.Collapse = Collapse;
exports.ListGroupItem = ListGroupItem;
exports.ListGroupItemText = ListGroupItemText;
exports.ListGroupItemHeading = ListGroupItemHeading;
exports.UncontrolledAlert = UncontrolledAlert;
exports.UncontrolledButtonDropdown = UncontrolledButtonDropdown;
exports.UncontrolledDropdown = UncontrolledDropdown;
exports.UncontrolledNavDropdown = UncontrolledNavDropdown;
exports.UncontrolledTooltip = UncontrolledTooltip;
exports.Util = utils;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=reactstrap.js.map
