/*! (c) 2014 - present: Jason Quense | https://github.com/jquense/react-widgets/blob/master/LICENSE.md */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactWidgets"] = factory(require("react"), require("react-dom"));
	else
		root["ReactWidgets"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 63);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(66)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(68)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

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

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.message = exports.accessor = exports.disabled = exports.dateFormat = exports.numberFormat = exports.elementType = undefined;

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _elementType = __webpack_require__(84);

var _elementType2 = _interopRequireDefault(_elementType);

var _createChainableTypeChecker = __webpack_require__(57);

var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);

var _localizers = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.elementType = _elementType2.default;
var numberFormat = exports.numberFormat = (0, _createChainableTypeChecker2.default)(function () {
  return _localizers.number.propType.apply(_localizers.number, arguments);
});

var dateFormat = exports.dateFormat = (0, _createChainableTypeChecker2.default)(function () {
  return _localizers.date.propType.apply(_localizers.date, arguments);
});

var disabled = exports.disabled = (0, _createChainableTypeChecker2.default)(function () {
  return _propTypes2.default.bool.apply(_propTypes2.default, arguments);
});

disabled.acceptsArray = _propTypes2.default.oneOfType([disabled, _propTypes2.default.array]);

var accessor = exports.accessor = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]);

var message = exports.message = _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string, _propTypes2.default.func]);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.pick = pick;
exports.pickElementProps = pickElementProps;
exports.omitOwn = omitOwn;

var whitelist = ['style', 'className', 'role', 'id', 'autocomplete', 'size', 'tabIndex', 'maxLength', 'name'];

var whitelistRegex = [/^aria-/, /^data-/, /^on[A-Z]\w+/];

function pick(props, componentClass) {
  var keys = Object.keys(componentClass.propTypes);
  var result = {};
  Object.keys(props).forEach(function (key) {
    if (keys.indexOf(key) === -1) return;
    result[key] = props[key];
  });
  return result;
}

function pickElementProps(component) {
  for (var _len = arguments.length, others = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    others[_key - 1] = arguments[_key];
  }

  var props = omitOwn.apply(undefined, [component].concat(others));
  var result = {};
  Object.keys(props).forEach(function (key) {
    if (whitelist.indexOf(key) !== -1 || whitelistRegex.some(function (r) {
      return !!key.match(r);
    })) result[key] = props[key];
  });

  return result;
}

function omitOwn(component) {
  var initial = Object.keys(component.constructor.propTypes);

  for (var _len2 = arguments.length, others = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    others[_key2 - 1] = arguments[_key2];
  }

  var keys = others.reduce(function (arr, compClass) {
    return [].concat(arr, Object.keys(compClass.propTypes));
  }, initial);

  var result = {};
  Object.keys(component.props).forEach(function (key) {
    if (keys.indexOf(key) !== -1) return;
    result[key] = component.props[key];
  });
  return result;
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;
exports.setDate = exports.date = exports.setNumber = exports.number = undefined;

var _invariant = __webpack_require__(26);

var _invariant2 = _interopRequireDefault(_invariant);

var _ = __webpack_require__(8);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localePropType = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]);

var REQUIRED_NUMBER_FORMATS = ['default'];

var REQUIRED_DATE_FORMATS = ['default', 'date', 'time', 'header', 'footer', 'dayOfMonth', 'month', 'year', 'decade', 'century'];

var _numberLocalizer = createWrapper('NumberPicker');
var number = exports.number = {
  propType: function propType() {
    var _numberLocalizer2;

    return (_numberLocalizer2 = _numberLocalizer).propType.apply(_numberLocalizer2, arguments);
  },
  getFormat: function getFormat(key, format) {
    return format || _numberLocalizer.formats[key];
  },

  parse: function parse() {
    var _numberLocalizer3;

    return (_numberLocalizer3 = _numberLocalizer).parse.apply(_numberLocalizer3, arguments);
  },
  format: function format() {
    var _numberLocalizer4;

    return (_numberLocalizer4 = _numberLocalizer).format.apply(_numberLocalizer4, arguments);
  },
  decimalChar: function decimalChar() {
    var _numberLocalizer5;

    return (_numberLocalizer5 = _numberLocalizer).decimalChar.apply(_numberLocalizer5, arguments);
  },
  precision: function precision() {
    var _numberLocalizer6;

    return (_numberLocalizer6 = _numberLocalizer).precision.apply(_numberLocalizer6, arguments);
  }
};

function setNumber(_ref) {
  var format = _ref.format,
      _parse = _ref.parse,
      formats = _ref.formats,
      _ref$propType = _ref.propType,
      propType = _ref$propType === undefined ? localePropType : _ref$propType,
      _ref$decimalChar = _ref.decimalChar,
      decimalChar = _ref$decimalChar === undefined ? function () {
    return '.';
  } : _ref$decimalChar,
      _ref$precision = _ref.precision,
      precision = _ref$precision === undefined ? function () {
    return null;
  } : _ref$precision;

  checkFormats(REQUIRED_NUMBER_FORMATS, formats);

  _numberLocalizer = {
    formats: formats,
    precision: precision,
    decimalChar: decimalChar,
    propType: propType,
    format: wrapFormat(format),
    parse: function parse(value, culture, format) {
      var result = _parse.call(this, value, culture, format);
      !(result == null || typeof result === 'number') ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'number localizer `parse(..)` must return a number, null, or undefined') : (0, _invariant2.default)(false) : void 0;
      return result;
    }
  };
}

exports.setNumber = setNumber;
var _dateLocalizer = createWrapper('DateTimePicker');
var date = exports.date = {
  propType: function propType() {
    var _dateLocalizer2;

    return (_dateLocalizer2 = _dateLocalizer).propType.apply(_dateLocalizer2, arguments);
  },
  getFormat: function getFormat(key, format) {
    return format || _dateLocalizer.formats[key];
  },

  parse: function parse() {
    var _dateLocalizer3;

    return (_dateLocalizer3 = _dateLocalizer).parse.apply(_dateLocalizer3, arguments);
  },
  format: function format() {
    var _dateLocalizer4;

    return (_dateLocalizer4 = _dateLocalizer).format.apply(_dateLocalizer4, arguments);
  },
  firstOfWeek: function firstOfWeek() {
    var _dateLocalizer5;

    return (_dateLocalizer5 = _dateLocalizer).firstOfWeek.apply(_dateLocalizer5, arguments);
  }
};

function setDate(_ref2) {
  var formats = _ref2.formats,
      format = _ref2.format,
      _parse2 = _ref2.parse,
      firstOfWeek = _ref2.firstOfWeek,
      _ref2$propType = _ref2.propType,
      propType = _ref2$propType === undefined ? localePropType : _ref2$propType;

  checkFormats(REQUIRED_DATE_FORMATS, formats);
  _dateLocalizer = {
    formats: formats,
    propType: propType,
    firstOfWeek: firstOfWeek,
    format: wrapFormat(format),
    parse: function parse(value, culture) {
      var result = _parse2.call(this, value, culture);
      !(result == null || result instanceof Date && !isNaN(result.getTime())) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'date localizer `parse(..)` must return a valid Date, null, or undefined') : (0, _invariant2.default)(false) : void 0;
      return result;
    }
  };
}

exports.setDate = setDate;
var wrapFormat = function wrapFormat(formatter) {
  return function (value, format, culture) {
    var result = typeof format === 'function' ? format(value, culture, this) : formatter.call(this, value, format, culture);

    !(result == null || typeof result === 'string') ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, '`localizer format(..)` must return a string, null, or undefined') : (0, _invariant2.default)(false) : void 0;

    return result;
  };
};

function checkFormats(required, formats) {
  if (process.env.NODE_ENV !== 'production') required.forEach(function (f) {
    return !(0, _.has)(formats, f) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'localizer missing required format: `%s`', f) : (0, _invariant2.default)(false) : void 0;
  });
}

function createWrapper() {
  var dummy = {};
  if (process.env.NODE_ENV !== 'production') {
    ['formats', 'parse', 'format', 'firstOfWeek', 'precision', 'propType'].forEach(function (name) {
      return Object.defineProperty(dummy, name, {
        enumerable: true,
        get: function get() {
          throw new Error('[React Widgets] You are attempting to use a widget that requires localization ' + '(Calendar, DateTimePicker, NumberPicker). ' + 'However there is no localizer set. Please configure a localizer. \n\n' + 'see http://jquense.github.io/react-widgets/docs/#/i18n for more info.');
        }
      });
    });
  }
  return dummy;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;
exports.has = exports.makeArray = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isShallowEqual = isShallowEqual;
exports.chunk = chunk;
exports.groupBySortedKeys = groupBySortedKeys;

var _warning = __webpack_require__(65);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeArray = exports.makeArray = function makeArray(obj) {
  return obj == null ? [] : [].concat(obj);
};

var has = exports.has = function has(o, k) {
  return o ? Object.prototype.hasOwnProperty.call(o, k) : false;
};

function isShallowEqual(a, b) {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return +a === +b;
  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== 'object' && (typeof b === 'undefined' ? 'undefined' : _typeof(b)) !== 'object') return a === b;
  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== (typeof b === 'undefined' ? 'undefined' : _typeof(b))) return false;
  if (a == null || b == null) return false; // if they were both null we wouldn't be here

  var keysA = Object.keys(a);
  var keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;
  for (var i = 0; i < keysA.length; i++) {
    if (!has(b, keysA[i]) || a[keysA[i]] !== b[keysA[i]]) return false;
  }return true;
}

function chunk(array, chunkSize) {
  var index = 0,
      length = array ? array.length : 0;
  var result = [];

  chunkSize = Math.max(+chunkSize || 1, 1);
  while (index < length) {
    result.push(array.slice(index, index += chunkSize));
  }return result;
}

function groupBySortedKeys(groupBy, data, keys) {
  var iter = typeof groupBy === 'function' ? groupBy : function (item) {
    return item[groupBy];
  };

  // the keys array ensures that groups are rendered in the order they came in
  // which means that if you sort the data array it will render sorted,
  // so long as you also sorted by group
  keys = keys || [];

  process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(typeof groupBy !== 'string' || !data.length || has(data[0], groupBy), '[React Widgets] You seem to be trying to group this list by a ' + ('property `' + groupBy + '` that doesn\'t exist in the dataset items, this may be a typo')) : void 0;

  return data.reduce(function (grps, item) {
    var group = iter(item);

    if (has(grps, group)) {
      grps[group].push(item);
    } else {
      keys.push(group);
      grps[group] = [item];
    }

    return grps;
  }, {});
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.mixin = exports.spyOnComponent = exports.timeoutManager = exports.mountManager = exports.focusManager = exports.autoFocus = undefined;

var _spyOnComponent = __webpack_require__(28);

var _spyOnComponent2 = _interopRequireDefault(_spyOnComponent);

var _autoFocus = __webpack_require__(70);

var _autoFocus2 = _interopRequireDefault(_autoFocus);

var _focusManager = __webpack_require__(71);

var _focusManager2 = _interopRequireDefault(_focusManager);

var _mountManager = __webpack_require__(39);

var _mountManager2 = _interopRequireDefault(_mountManager);

var _timeoutManager = __webpack_require__(47);

var _timeoutManager2 = _interopRequireDefault(_timeoutManager);

var _mixin = __webpack_require__(72);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.autoFocus = _autoFocus2.default;
exports.focusManager = _focusManager2.default;
exports.mountManager = _mountManager2.default;
exports.timeoutManager = _timeoutManager2.default;
exports.spyOnComponent = _spyOnComponent2.default;
exports.mixin = _mixin2.default;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.notify = notify;
exports.instanceId = instanceId;
exports.isFirstFocusedRender = isFirstFocusedRender;

var idCount = 0;
function uniqueId(prefix) {
  return '' + ((prefix == null ? '' : prefix) + ++idCount);
}

function notify(handler, args) {
  handler && handler.apply(null, [].concat(args));
}

function instanceId(component) {
  var suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  component.__id || (component.__id = uniqueId('rw_'));
  return (component.props.id || component.__id) + suffix;
}

function isFirstFocusedRender(component) {
  return component._firstFocus || component.state.focused && (component._firstFocus = true);
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getMessages = getMessages;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messages = {
  moveBack: 'Navigate back',
  moveForward: 'Navigate forward',

  dateButton: 'Select date',
  timeButton: 'Select time',

  openCombobox: 'open combobox',
  openDropdown: 'open dropdown',

  placeholder: '',
  filterPlaceholder: '',

  emptyList: 'There are no items in this list',
  emptyFilter: 'The filter returned no results',

  createOption: function createOption(_ref) {
    var searchTerm = _ref.searchTerm;
    return [' Create option', searchTerm && ' ', searchTerm && _react2.default.createElement(
      'strong',
      { key: '_' },
      '"' + searchTerm + '"'
    )];
  },

  tagsLabel: 'Selected items',
  removeLabel: 'Remove selected item',
  noneSelected: 'no selected items',
  selectedItems: function selectedItems(labels) {
    return 'Selected items: ' + labels.join(', ');
  },

  // number
  increment: 'Increment value',
  decrement: 'Decrement value'
};

function getMessages() {
  var defaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var processed = {};
  Object.keys(messages).forEach(function (message) {
    var value = defaults[message];
    if (value == null) value = messages[message];

    processed[message] = typeof value === 'function' ? value : function () {
      return value;
    };
  });

  return processed;
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.disabledManager = exports.widgetEditable = exports.widgetEnabled = exports.isInDisabledFieldset = undefined;

var _reactDom = __webpack_require__(5);

var _matches = __webpack_require__(60);

var _matches2 = _interopRequireDefault(_matches);

var _reactComponentManagers = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isInDisabledFieldset = exports.isInDisabledFieldset = function isInDisabledFieldset(inst) {
  var node = void 0;
  try {
    node = (0, _reactDom.findDOMNode)(inst);
  } catch (err) {/* ignore */}

  return !!node && (0, _matches2.default)(node, 'fieldset[disabled] *');
};

var widgetEnabled = exports.widgetEnabled = interactionDecorator(true);

var widgetEditable = exports.widgetEditable = interactionDecorator(false);

function interactionDecorator(disabledOnly) {
  function wrap(method) {
    return function decoratedMethod() {
      var _props = this.props,
          disabled = _props.disabled,
          readOnly = _props.readOnly;


      disabled = isInDisabledFieldset(this) || disabled == true || !disabledOnly && readOnly === true;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (!disabled) return method.apply(this, args);
    };
  }

  return function decorate(target, key, desc) {
    if (desc.initializer) {
      var init = desc.initializer;
      desc.initializer = function () {
        return wrap(init.call(this)).bind(this);
      };
    } else desc.value = wrap(desc.value);
    return desc;
  };
}

var disabledManager = exports.disabledManager = function disabledManager(component) {
  var mounted = false;
  var isInFieldSet = false;
  var useCached = false;
  (0, _reactComponentManagers.spyOnComponent)(component, {
    componentDidMount: function componentDidMount() {
      mounted = true;
      // becasue we can't access a dom node in the first render we need to
      // render again if the component was disabled via a fieldset
      if (isInDisabledFieldset(this)) this.forceUpdate();
    },
    componentWillUpdate: function componentWillUpdate() {
      isInFieldSet = mounted && isInDisabledFieldset(component);
      useCached = mounted;
    },
    componentDidUpdate: function componentDidUpdate() {
      useCached = false;
    },
    componentWillUnmount: function componentWillUnmount() {
      component = null;
    }
  });

  return function () {
    return component.props.disabled === true || (useCached ? isInFieldSet : mounted && isInDisabledFieldset(component)) || component.props.disabled // return the prop if nothing is true in case it's an array
    ;
  };
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dateArithmetic = __webpack_require__(96);

var _dateArithmetic2 = _interopRequireDefault(_dateArithmetic);

var _constants = __webpack_require__(35);

var _localizers = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dates = _extends({}, _dateArithmetic2.default, {
  monthsInYear: function monthsInYear(year) {
    var date = new Date(year, 0, 1);
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (i) {
      return dates.month(date, i);
    });
  },
  firstVisibleDay: function firstVisibleDay(date, culture) {
    var firstOfMonth = dates.startOf(date, 'month');
    return dates.startOf(firstOfMonth, 'week', _localizers.date.firstOfWeek(culture));
  },
  lastVisibleDay: function lastVisibleDay(date, culture) {
    var endOfMonth = dates.endOf(date, 'month');

    return dates.endOf(endOfMonth, 'week', _localizers.date.firstOfWeek(culture));
  },
  visibleDays: function visibleDays(date, culture) {
    var current = dates.firstVisibleDay(date, culture);
    var last = dates.lastVisibleDay(date, culture);
    var days = [];

    while (dates.lte(current, last, 'day')) {
      days.push(current);
      current = dates.add(current, 1, 'day');
    }

    return days;
  },
  move: function move(date, min, max, unit, direction) {
    var isMonth = unit === 'month';
    var isUpOrDown = direction === _constants.directions.UP || direction === _constants.directions.DOWN;
    var rangeUnit = _constants.calendarViewUnits[unit];
    var addUnit = isMonth && isUpOrDown ? 'week' : _constants.calendarViewUnits[unit];
    var amount = isMonth || !isUpOrDown ? 1 : 4;
    var newDate = void 0;

    if (direction === _constants.directions.UP || direction === _constants.directions.LEFT) amount *= -1;

    newDate = dates.add(date, amount, addUnit);

    return dates.inRange(newDate, min, max, rangeUnit) ? newDate : date;
  },
  merge: function merge(date, time, defaultDate) {
    if (time == null && date == null) return null;

    if (time == null) time = defaultDate || new Date();
    if (date == null) date = defaultDate || new Date();

    date = dates.startOf(date, 'day');
    date = dates.hours(date, dates.hours(time));
    date = dates.minutes(date, dates.minutes(time));
    date = dates.seconds(date, dates.seconds(time));
    return dates.milliseconds(date, dates.milliseconds(time));
  },


  today: function today() {
    return dates.startOf(new Date(), 'day');
  },
  tomorrow: function tomorrow() {
    return dates.add(dates.startOf(new Date(), 'day'), 1, 'day');
  }
});

exports.default = dates;
module.exports = exports['default'];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _createUncontrollable = __webpack_require__(73);

var _createUncontrollable2 = _interopRequireDefault(_createUncontrollable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mixin = {
  shouldComponentUpdate: function shouldComponentUpdate() {
    //let the forceUpdate trigger the update
    return !this._notifying;
  }
};

function set(component, propName, handler, value, args) {
  if (handler) {
    component._notifying = true;
    handler.call.apply(handler, [component, value].concat(args));
    component._notifying = false;
  }

  component._values[propName] = value;

  if (!component.unmounted) component.forceUpdate();
}

exports.default = (0, _createUncontrollable2.default)(mixin, set);
module.exports = exports['default'];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Widget = (_temp = _class = function (_React$Component) {
  _inherits(Widget, _React$Component);

  function Widget() {
    _classCallCheck(this, Widget);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Widget.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        tabIndex = _props.tabIndex,
        focused = _props.focused,
        open = _props.open,
        dropUp = _props.dropUp,
        disabled = _props.disabled,
        readOnly = _props.readOnly,
        props = _objectWithoutProperties(_props, ['className', 'tabIndex', 'focused', 'open', 'dropUp', 'disabled', 'readOnly']);

    var isRtl = !!this.context.isRtl;
    tabIndex = tabIndex != null ? tabIndex : '-1';

    return _react2.default.createElement('div', _extends({}, props, {
      tabIndex: tabIndex,
      className: (0, _classnames2.default)(className, 'rw-widget', isRtl && 'rw-rtl', disabled && 'rw-state-disabled', readOnly && 'rw-state-readonly', focused && 'rw-state-focus', open && 'rw-open' + (dropUp ? '-up' : ''))
    }));
  };

  return Widget;
}(_react2.default.Component), _class.propTypes = {
  tabIndex: _propTypes2.default.node,
  focused: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  open: _propTypes2.default.bool,
  dropUp: _propTypes2.default.bool
}, _class.contextTypes = {
  isRtl: _propTypes2.default.bool
}, _temp);
exports.default = Widget;
module.exports = exports['default'];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createFocusManager;

var _reactComponentManagers = __webpack_require__(9);

var _interaction = __webpack_require__(13);

function createFocusManager(component, options) {
  var _didHandle = options.didHandle;

  return (0, _reactComponentManagers.focusManager)(component, _extends({}, options, {
    onChange: function onChange(focused) {
      component.setState({ focused: focused });
    },
    isDisabled: function isDisabled() {
      return (0, _interaction.isInDisabledFieldset)(component) || component.props.disabled === true;
    },
    didHandle: function didHandle(focused, event) {
      var handler = this.props[focused ? 'onFocus' : 'onBlur'];
      handler && handler(event);

      if (_didHandle && !event.isWidgetDefaultPrevented) _didHandle(focused, event);
    }
  }));
}
module.exports = exports['default'];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactComponentManagers = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reactComponentManagers.mixin)({
  propTypes: {
    isRtl: _propTypes2.default.bool
  },

  contextTypes: {
    isRtl: _propTypes2.default.bool
  },

  childContextTypes: {
    isRtl: _propTypes2.default.bool
  },

  getChildContext: function getChildContext() {
    return {
      isRtl: this.isRtl()
    };
  },
  isRtl: function isRtl() {
    return !!(this.props.isRtl || this.context && this.context.isRtl);
  }
});
module.exports = exports['default'];

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = (_temp = _class = function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Button.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        disabled = _props.disabled,
        label = _props.label,
        icon = _props.icon,
        busy = _props.busy,
        active = _props.active,
        children = _props.children,
        _props$variant = _props.variant,
        variant = _props$variant === undefined ? 'primary' : _props$variant,
        _props$component = _props.component,
        Tag = _props$component === undefined ? 'button' : _props$component,
        props = _objectWithoutProperties(_props, ['className', 'disabled', 'label', 'icon', 'busy', 'active', 'children', 'variant', 'component']);

    var type = props.type;

    if (Tag === 'button') type = type || 'button';

    return _react2.default.createElement(
      Tag,
      _extends({}, props, {
        tabIndex: '-1',
        title: label,
        type: type,
        disabled: disabled,
        'aria-disabled': disabled,
        'aria-label': label,
        className: (0, _classnames2.default)(className, 'rw-btn', active && !disabled && 'rw-state-active', variant && 'rw-btn-' + variant)
      }),
      (icon || busy) && _react2.default.createElement('span', {
        'aria-hidden': 'true',
        className: (0, _classnames2.default)('rw-i', 'rw-i-' + icon, busy && 'rw-loading')
      }),
      children
    );
  };

  return Button;
}(_react2.default.Component), _class.propTypes = {
  disabled: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  icon: _propTypes2.default.string,
  busy: _propTypes2.default.bool,
  active: _propTypes2.default.bool,
  variant: _propTypes2.default.oneOf(['primary', 'select']),
  component: _propTypes2.default.any
}, _temp);
exports.default = Button;
module.exports = exports['default'];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.normalizeComponent = normalizeComponent;
exports.defaultGetDataState = defaultGetDataState;
exports.default = listDataManager;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactComponentManagers = __webpack_require__(9);

var _Filter = __webpack_require__(32);

var _ = __webpack_require__(8);

var _accessorManager = __webpack_require__(24);

var _accessorManager2 = _interopRequireDefault(_accessorManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EMPTY_VALUE = {};

function normalizeComponent(Component) {
  return function (itemProps) {
    return Component ? _react2.default.createElement(Component, itemProps) : itemProps.text || itemProps.item;
  };
}

function defaultGetDataState(data, _ref) {
  var groupBy = _ref.groupBy;
  var lastState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (lastState.data !== data || lastState.groupBy !== groupBy) {
    if (!groupBy) return {};

    var keys = [];
    var groups = (0, _.groupBySortedKeys)(groupBy, data, keys);

    return {
      data: data,
      groupBy: groupBy,
      groups: groups,
      sortedKeys: keys,
      sequentialData: Object.keys(groups).reduce(function (flat, grp) {
        return flat.concat(groups[grp]);
      }, [])
    };
  }

  return lastState;
}

function defaultGetStateGetterFromList(_ref2) {
  var listComponent = _ref2.listComponent;

  return listComponent && listComponent.getDataState;
}

function listDataManager(component) {
  var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      getDataState = _ref3.getDataState,
      getStateGetterFromProps = _ref3.getStateGetterFromProps,
      _ref3$accessors = _ref3.accessors,
      accessors = _ref3$accessors === undefined ? (0, _accessorManager2.default)(component) : _ref3$accessors;

  var listData = void 0;
  var listState = void 0;
  var needsUpdate = true;
  var currentProps = component.props;

  if (getDataState) getStateGetterFromProps = null;else {
    if (!getStateGetterFromProps) getStateGetterFromProps = defaultGetStateGetterFromList;

    getDataState = getStateGetterFromProps(currentProps) || defaultGetDataState;
  }

  (0, _reactComponentManagers.spyOnComponent)(component, {
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if (!needsUpdate) needsUpdate = nextProps !== currentProps;

      currentProps = nextProps;

      if (needsUpdate && getStateGetterFromProps) {
        getDataState = getStateGetterFromProps(currentProps) || defaultGetDataState;
      }
    },
    componentWillUnmount: function componentWillUnmount() {
      listData = null;
      listState = null;
      currentProps = null;
      getDataState = null;
      getStateGetterFromProps = null;
    }
  });

  function isDisabled(item) {
    var disabled = currentProps.disabled;
    if (!Array.isArray(disabled)) return false;

    return disabled.some(function (disabled) {
      return accessors.value(item) === accessors.value(disabled);
    });
  }

  function getMatcher(word) {
    if (!word) return function () {
      return true;
    };

    word = word.toLowerCase();
    return function (item) {
      return _Filter.presets.startsWith(accessors.text(item).toLowerCase(), word);
    };
  }

  function getSequentialData() {
    var state = manager.getState();
    return state && state.sequentialData || listData;
  }

  var renderItem = function renderItem(_ref4) {
    var item = _ref4.item,
        rest = _objectWithoutProperties(_ref4, ['item']);

    // eslint-disable-line react/prop-types
    var Component = currentProps.itemComponent;
    return Component ? _react2.default.createElement(Component, _extends({
      item: item,
      value: accessors.value(item),
      text: accessors.text(item),
      disabled: isDisabled(item)
    }, rest)) : accessors.text(item);
  };

  var renderGroup = function renderGroup(_ref5) {
    var group = _ref5.group;
    // eslint-disable-line react/prop-types
    var Component = currentProps.groupComponent;
    return Component ? _react2.default.createElement(Component, { item: group }) : group;
  };

  var manager = {
    isDisabled: isDisabled,

    first: function first() {
      return manager.next(EMPTY_VALUE);
    },
    last: function last() {
      var data = getSequentialData();
      return manager.prevEnabled(data[data.length - 1]);
    },
    prevEnabled: function prevEnabled(item) {
      return isDisabled(item) ? manager.prev(item) : item;
    },
    prev: function prev(item, word) {
      var data = getSequentialData();
      var matches = getMatcher(word);
      var nextIdx = data.indexOf(item);

      if (nextIdx < 0 || nextIdx == null) nextIdx = 0;

      nextIdx--;

      while (nextIdx > -1 && (isDisabled(data[nextIdx]) || !matches(data[nextIdx]))) {
        nextIdx--;
      }if (nextIdx >= 0) return data[nextIdx];
      if (!manager.isDisabled(item)) return item;
    },
    next: function next(item, word) {
      var data = getSequentialData();
      var matches = getMatcher(word);
      var nextIdx = data.indexOf(item) + 1;
      var len = data.length;

      while (nextIdx < len && (isDisabled(data[nextIdx]) || !matches(data[nextIdx]))) {
        nextIdx++;
      }if (nextIdx < len) return data[nextIdx];
      if (!manager.isDisabled(item)) return item;
    },
    nextEnabled: function nextEnabled(item) {
      return isDisabled(item) ? manager.next(item) : item;
    },
    setData: function setData(data) {
      if (!needsUpdate) needsUpdate = data !== listData;

      listData = data;
    },
    getState: function getState() {
      if (needsUpdate) {
        needsUpdate = false;
        listState = getDataState(listData, currentProps, listState);
      }

      return listState;
    },
    defaultProps: function defaultProps() {
      var _currentProps = currentProps,
          groupBy = _currentProps.groupBy,
          optionComponent = _currentProps.optionComponent,
          searchTerm = _currentProps.searchTerm;


      return _extends({
        groupBy: groupBy,
        renderItem: renderItem,
        renderGroup: renderGroup,
        searchTerm: searchTerm,
        optionComponent: optionComponent,
        isDisabled: isDisabled
      }, currentProps.listProps, {
        data: listData,
        dataState: manager.getState()
      });
    }
  };

  return manager;
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WidgetPicker = (_temp = _class = function (_React$Component) {
  _inherits(WidgetPicker, _React$Component);

  function WidgetPicker() {
    _classCallCheck(this, WidgetPicker);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  WidgetPicker.prototype.render = function render() {
    var _props = this.props,
        open = _props.open,
        dropUp = _props.dropUp,
        className = _props.className,
        disabled = _props.disabled,
        readOnly = _props.readOnly,
        focused = _props.focused,
        props = _objectWithoutProperties(_props, ['open', 'dropUp', 'className', 'disabled', 'readOnly', 'focused']);

    var openClass = 'rw-open' + (dropUp ? '-up' : '');

    return _react2.default.createElement('div', _extends({}, props, {
      className: (0, _classnames2.default)(className, 'rw-widget-picker', 'rw-widget-container', open && openClass, disabled && 'rw-state-disabled', readOnly && 'rw-state-readonly', focused && 'rw-state-focus')
    }));
  };

  return WidgetPicker;
}(_react2.default.Component), _class.propTypes = {
  tabIndex: _propTypes2.default.node,
  focused: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  open: _propTypes2.default.bool,
  dropUp: _propTypes2.default.bool,
  picker: _propTypes2.default.bool
}, _temp);
exports.default = WidgetPicker;
module.exports = exports['default'];

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = __webpack_require__(19);

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = (_temp = _class = function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select() {
    _classCallCheck(this, Select);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Select.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        bordered = _props.bordered,
        children = _props.children,
        props = _objectWithoutProperties(_props, ['className', 'bordered', 'children']);

    return _react2.default.createElement(
      'span',
      {
        className: (0, _classnames2.default)(className, 'rw-select', bordered && 'rw-select-bordered')
      },
      children ? _react2.default.Children.map(children, function (child) {
        return child && _react2.default.cloneElement(child, { variant: 'select' });
      }) : _react2.default.createElement(_Button2.default, _extends({}, props, { variant: 'select' }))
    );
  };

  return Select;
}(_react2.default.Component), _class.propTypes = {
  bordered: _propTypes2.default.bool
}, _temp);
exports.default = Select;
module.exports = exports['default'];

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _PropTypes = __webpack_require__(3);

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

var _Props = __webpack_require__(4);

var Props = _interopRequireWildcard(_Props);

var _widgetHelpers = __webpack_require__(10);

var _listDataManager = __webpack_require__(20);

var _Listbox = __webpack_require__(58);

var _Listbox2 = _interopRequireDefault(_Listbox);

var _ListOption = __webpack_require__(42);

var _ListOption2 = _interopRequireDefault(_ListOption);

var _ListOptionGroup = __webpack_require__(85);

var _ListOptionGroup2 = _interopRequireDefault(_ListOptionGroup);

var _messages = __webpack_require__(12);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EMPTY_DATA_STATE = {};

var propTypes = {
  data: _propTypes2.default.array,
  dataState: _propTypes2.default.shape({
    sortedKeys: _propTypes2.default.array,
    groups: _propTypes2.default.object,
    data: _propTypes2.default.array,
    sequentialData: _propTypes2.default.array
  }),

  onSelect: _propTypes2.default.func,
  onMove: _propTypes2.default.func,

  activeId: _propTypes2.default.string,
  optionComponent: CustomPropTypes.elementType,
  renderItem: _propTypes2.default.func.isRequired,
  renderGroup: _propTypes2.default.func,

  focusedItem: _propTypes2.default.any,
  selectedItem: _propTypes2.default.any,
  searchTerm: _propTypes2.default.string,

  isDisabled: _propTypes2.default.func.isRequired,
  groupBy: CustomPropTypes.accessor,

  messages: _propTypes2.default.shape({
    emptyList: _propTypes2.default.func.isRequired
  })
};

var defaultProps = {
  onSelect: function onSelect() {},
  data: [],
  dataState: EMPTY_DATA_STATE,
  optionComponent: _ListOption2.default
};

var List = (_temp = _class = function (_React$Component) {
  _inherits(List, _React$Component);

  function List() {
    _classCallCheck(this, List);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  List.prototype.componentDidMount = function componentDidMount() {
    this.move();
  };

  List.prototype.componentDidUpdate = function componentDidUpdate() {
    this.move();
  };

  List.prototype.mapItems = function mapItems(fn) {
    var _props = this.props,
        data = _props.data,
        dataState = _props.dataState;
    var sortedKeys = dataState.sortedKeys,
        groups = dataState.groups;


    if (!groups) return data.map(function (item, idx) {
      return fn(item, idx, false);
    });

    var idx = -1;
    return sortedKeys.reduce(function (items, key) {
      var group = groups[key];

      return items.concat(fn(key, idx, true), group.map(function (item) {
        return fn(item, ++idx, false);
      }));
    }, []);
  };

  List.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props,
        className = _props2.className,
        messages = _props2.messages;


    var elementProps = Props.pickElementProps(this);

    var _getMessages = (0, _messages.getMessages)(messages),
        emptyList = _getMessages.emptyList;

    return _react2.default.createElement(
      _Listbox2.default,
      _extends({}, elementProps, {
        className: className,
        emptyListMessage: emptyList(this.props)
      }),
      this.mapItems(function (item, idx, isHeader) {
        return isHeader ? _this2.renderGroupHeader(item) : _this2.renderItem(item, idx);
      })
    );
  };

  List.prototype.renderGroupHeader = function renderGroupHeader(group) {
    var renderGroup = this.props.renderGroup;

    return _react2.default.createElement(
      _ListOptionGroup2.default,
      {
        key: 'group_' + group,
        group: group
      },
      renderGroup({ group: group })
    );
  };

  List.prototype.renderItem = function renderItem(item, index) {
    var _props3 = this.props,
        activeId = _props3.activeId,
        focusedItem = _props3.focusedItem,
        selectedItem = _props3.selectedItem,
        onSelect = _props3.onSelect,
        isDisabled = _props3.isDisabled,
        renderItem = _props3.renderItem,
        Option = _props3.optionComponent;


    var isFocused = focusedItem === item;

    return _react2.default.createElement(
      Option,
      {
        dataItem: item,
        key: 'item_' + index,
        index: index,
        activeId: activeId,
        focused: isFocused,
        onSelect: onSelect,
        disabled: isDisabled(item),
        selected: selectedItem === item
      },
      renderItem({ item: item, index: index })
    );
  };

  List.prototype.move = function move() {
    var _props4 = this.props,
        focusedItem = _props4.focusedItem,
        onMove = _props4.onMove,
        data = _props4.data,
        dataState = _props4.dataState;

    var list = (0, _reactDom.findDOMNode)(this);
    var idx = renderedIndexOf(focusedItem, list, data, dataState);
    var selectedItem = list.children[idx];

    if (selectedItem) (0, _widgetHelpers.notify)(onMove, [selectedItem, list, focusedItem]);
  };

  return List;
}(_react2.default.Component), _class.getDataState = _listDataManager.defaultGetDataState, _temp);


function renderedIndexOf(item, list, data, dataState) {
  var groups = dataState.groups,
      sortedKeys = dataState.sortedKeys;


  if (!groups) return data.indexOf(item);

  var runningIdx = -1;
  var idx = -1;

  sortedKeys.some(function (group) {
    var itemIdx = groups[group].indexOf(item);
    runningIdx++;

    if (itemIdx !== -1) {
      idx = runningIdx + itemIdx + 1;
      return true;
    }

    runningIdx += groups[group].length;
  });
  return idx;
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

exports.default = List;
module.exports = exports['default'];

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = createAccessorManager;

var _reactComponentManagers = __webpack_require__(9);

var _dataHelpers = __webpack_require__(33);

var helpers = _interopRequireWildcard(_dataHelpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createAccessorManager(component) {
  var _component$props = component.props,
      textField = _component$props.textField,
      valueField = _component$props.valueField;


  (0, _reactComponentManagers.spyOnComponent)(component, {
    componentWillReceiveProps: function componentWillReceiveProps(props) {
      textField = props.textField;
      valueField = props.valueField;
    }
  });

  return {
    text: function text(item) {
      return helpers.dataText(item, textField);
    },
    value: function value(item) {
      return helpers.dataValue(item, valueField);
    },
    indexOf: function indexOf(data, item) {
      return helpers.dataIndexOf(data, item, valueField);
    },
    matches: function matches(a, b) {
      return helpers.valueMatcher(a, b, valueField);
    },
    findOrSelf: function findOrSelf(data, item) {
      return helpers.dataItem(data, item, valueField);
    },
    find: function find(data, item) {
      var idx = helpers.dataIndexOf(data, item, valueField);
      if (~idx) {
        return data[idx];
      }
    }
  };
}
module.exports = exports['default'];

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = createScrollManager;

var _scrollTo = __webpack_require__(87);

var _scrollTo2 = _interopRequireDefault(_scrollTo);

var _reactComponentManagers = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createScrollManager(component) {
  var getScrollParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (list) {
    return list.parentNode;
  };


  var currentFocused = void 0,
      currentVisible = void 0,
      cancelScroll = void 0;

  var onMove = component.props.onMove;
  var mounted = true;

  (0, _reactComponentManagers.spyOnComponent)(component, {
    componentWillReceiveProps: function componentWillReceiveProps(_ref) {
      var nextOnMove = _ref.onMove;

      onMove = nextOnMove;
    },
    componentWillUnmount: function componentWillUnmount() {
      mounted = false;
    }
  });

  return function (selected, list, nextFocused) {
    if (!mounted) return;

    var lastVisible = currentVisible;
    var lastItem = currentFocused;
    var shown = void 0,
        changed = void 0;

    currentVisible = !(!list.offsetWidth || !list.offsetHeight);
    currentFocused = nextFocused;

    changed = lastItem !== nextFocused;
    shown = currentVisible && !lastVisible;

    if (shown || currentVisible && changed) {
      if (onMove) onMove(selected, list, nextFocused);else {
        cancelScroll && cancelScroll();
        cancelScroll = (0, _scrollTo2.default)(selected, false && getScrollParent(list));
      }
    }
  };
}
module.exports = exports['default'];

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
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

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
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

module.exports = invariant;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = activeElement;

var _ownerDocument = __webpack_require__(46);

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function activeElement() {
  var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _ownerDocument2.default)();

  try {
    return doc.activeElement;
  } catch (e) {/* ie throws if no active element */}
}
module.exports = exports['default'];

/***/ }),
/* 28 */
/***/ (function(module, exports) {


var LIFECYCLE_HOOKS = {
  componentWillMount: true,
  componentDidMount: true,
  componentWillReceiveProps: true,
  shouldComponentUpdate: true,
  componentWillUpdate: true,
  componentDidUpdate: true,
  componentWillUnmount: true,
}

function wrap(base, method) {
  var before = true;

  if (Array.isArray(method)) {
    before = method[0] !== 'after'
    method = method[1]
  }

  if (!base)
    return method;

  return function wrappedLifecyclehook() {
    before && method.apply(this, arguments)
    base.apply(this, arguments)
    !before && method.apply(this, arguments)
  }
}

module.exports = function spyOnComponent(component, hooks) {
  var originals = Object.create(null);


  for (var key in hooks) if (LIFECYCLE_HOOKS[key])
    component[key] = wrap(
      originals[key] = component[key],
      hooks[key]
    )

  return function reset(key) {
    if (key && {}.hasOwnProperty.call(originals, key))
      component[key] = originals[key]
    else for (var key in originals)
      component[key] = originals[key]
  }
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class2, _temp2;

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SlideDownTransition = __webpack_require__(48);

var _SlideDownTransition2 = _interopRequireDefault(_SlideDownTransition);

var _PropTypes = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StaticContainer = function (_React$Component) {
  _inherits(StaticContainer, _React$Component);

  function StaticContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, StaticContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.shouldComponentUpdate = function (_ref) {
      var shouldUpdate = _ref.shouldUpdate;
      return !!shouldUpdate;
    }, _this.render = function () {
      return _this.props.children;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return StaticContainer;
}(_react2.default.Component);

var Popup = (_temp2 = _class2 = function (_React$Component2) {
  _inherits(Popup, _React$Component2);

  function Popup() {
    _classCallCheck(this, Popup);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Popup.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        dropUp = _props.dropUp,
        open = _props.open,
        Transition = _props.transition,
        props = _objectWithoutProperties(_props, ['className', 'dropUp', 'open', 'transition']);

    var child = _react2.default.Children.only(this.props.children);

    return _react2.default.createElement(
      Transition,
      _extends({}, props, {
        'in': open,
        dropUp: dropUp,
        className: (0, _classnames2.default)(className, 'rw-popup-container')
      }),
      _react2.default.createElement(
        StaticContainer,
        { shouldUpdate: open },
        (0, _react.cloneElement)(child, {
          className: (0, _classnames2.default)(child.props.className, 'rw-popup')
        })
      )
    );
  };

  return Popup;
}(_react2.default.Component), _class2.propTypes = {
  open: _propTypes2.default.bool,
  dropUp: _propTypes2.default.bool,
  onEntering: _propTypes2.default.func,
  onEntered: _propTypes2.default.func,
  transition: _PropTypes.elementType
}, _class2.defaultProps = {
  open: false,
  transition: _SlideDownTransition2.default
}, _temp2);
exports.default = Popup;
module.exports = exports['default'];

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = height;

var _offset = __webpack_require__(55);

var _offset2 = _interopRequireDefault(_offset);

var _isWindow = __webpack_require__(31);

var _isWindow2 = _interopRequireDefault(_isWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function height(node, client) {
  var win = (0, _isWindow2.default)(node);
  return win ? win.innerHeight : client ? node.clientHeight : (0, _offset2.default)(node).height;
}
module.exports = exports['default'];

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWindow;
function getWindow(node) {
  return node === node.window ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : false;
}
module.exports = exports["default"];

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.propTypes = exports.presets = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.indexOf = indexOf;
exports.filter = filter;
exports.suggest = suggest;

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PropTypes = __webpack_require__(3);

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

var _dataHelpers = __webpack_require__(33);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var presets = exports.presets = {
  eq: function eq(a, b) {
    return a === b;
  },
  neq: function neq(a, b) {
    return a !== b;
  },
  gt: function gt(a, b) {
    return a > b;
  },
  gte: function gte(a, b) {
    return a >= b;
  },
  lt: function lt(a, b) {
    return a < b;
  },
  lte: function lte(a, b) {
    return a <= b;
  },
  contains: function contains(a, b) {
    return a.indexOf(b) !== -1;
  },
  startsWith: function startsWith(a, b) {
    return a.lastIndexOf(b, 0) === 0;
  },
  endsWith: function endsWith(a, b) {
    var pos = a.length - b.length;
    var lastIndex = a.indexOf(b, pos);
    return lastIndex !== -1 && lastIndex === pos;
  }
};

function normalizeFilterType(type) {
  if (type === false) return null;
  if (type === true) return 'startsWith';
  return type || 'eq';
}

function normalizeFilter(_ref) {
  var filter = _ref.filter,
      _ref$caseSensitive = _ref.caseSensitive,
      caseSensitive = _ref$caseSensitive === undefined ? false : _ref$caseSensitive,
      textField = _ref.textField;

  filter = normalizeFilterType(filter);

  if (typeof filter === 'function' || !filter) {
    return filter;
  }

  filter = presets[filter];

  return function (item, searchTerm) {
    var textValue = (0, _dataHelpers.dataText)(item, textField);

    if (!caseSensitive) {
      textValue = textValue.toLowerCase();
      searchTerm = searchTerm.toLowerCase();
    }

    return filter(textValue, searchTerm);
  };
}

function normalizeOptions(nextOptions) {
  var options = _extends({}, nextOptions);
  options.minLengh = options.minLengh || 0;
  options.filter = normalizeFilter(options);
  return options;
}

var propTypes = exports.propTypes = {
  textField: CustomPropTypes.accessor,
  caseSensitive: _propTypes2.default.bool,
  minLength: _propTypes2.default.number,
  filter: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.bool, _propTypes2.default.oneOf(Object.keys(presets))])
};

function indexOf(data, _ref2) {
  var _ref2$searchTerm = _ref2.searchTerm,
      searchTerm = _ref2$searchTerm === undefined ? '' : _ref2$searchTerm,
      options = _objectWithoutProperties(_ref2, ['searchTerm']);

  var _normalizeOptions = normalizeOptions(options),
      filter = _normalizeOptions.filter,
      minLength = _normalizeOptions.minLength;

  if (!filter || !searchTerm || !searchTerm.trim() || searchTerm.length < minLength) return -1;

  for (var idx = 0; idx < data.length; idx++) {
    if (filter(data[idx], searchTerm, idx)) return idx;
  }return -1;
}

function filter(data, _ref3) {
  var _ref3$searchTerm = _ref3.searchTerm,
      searchTerm = _ref3$searchTerm === undefined ? '' : _ref3$searchTerm,
      options = _objectWithoutProperties(_ref3, ['searchTerm']);

  var _normalizeOptions2 = normalizeOptions(options),
      filter = _normalizeOptions2.filter,
      minLength = _normalizeOptions2.minLength;

  if (!filter || !searchTerm || !searchTerm.trim() || searchTerm.length < minLength) return data;

  return data.filter(function (item, idx) {
    return filter(item, searchTerm, idx);
  });
}

function suggest(data, _ref4) {
  var _ref4$searchTerm = _ref4.searchTerm,
      searchTerm = _ref4$searchTerm === undefined ? '' : _ref4$searchTerm,
      options = _objectWithoutProperties(_ref4, ['searchTerm']);

  var _normalizeOptions3 = normalizeOptions(options),
      filter = _normalizeOptions3.filter,
      minLength = _normalizeOptions3.minLength;

  if (!filter || !searchTerm || !searchTerm.trim() || searchTerm.length < minLength) return searchTerm;

  for (var idx = 0; idx < data.length; idx++) {
    if (filter(data[idx], searchTerm, idx)) return data[idx];
  }return searchTerm;
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.dataText = exports.dataValue = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.dataIndexOf = dataIndexOf;
exports.valueMatcher = valueMatcher;
exports.dataItem = dataItem;

var _ = __webpack_require__(8);

var dataValue = exports.dataValue = function dataValue(data, field) {
  var value = data;
  if (typeof field === 'function') value = field(data);else if (data == null) value = data;else if (typeof field === 'string' && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && field in data) value = data[field];

  return value;
};

var dataText = exports.dataText = function dataText(item, textField) {
  var value = dataValue(item, textField);
  return value == null ? '' : value + '';
};

function dataIndexOf(data, item, valueField) {
  var idx = -1;
  var isValueEqual = function isValueEqual(datum) {
    return valueMatcher(item, datum, valueField);
  };

  while (++idx < data.length) {
    var datum = data[idx];
    if (datum === item || isValueEqual(datum)) return idx;
  }

  return -1;
}

/**
 * I don't know that the shallow equal makes sense here but am too afraid to
 * remove it.
 */
function valueMatcher(a, b, valueField) {
  return (0, _.isShallowEqual)(dataValue(a, valueField), dataValue(b, valueField));
}

function dataItem(data, item, valueField) {
  var idx = dataIndexOf(data, dataValue(item, valueField), valueField);
  return idx !== -1 ? data[idx] : item;
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _class2, _temp3;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

var _dates = __webpack_require__(14);

var _dates2 = _interopRequireDefault(_dates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VIEW_UNITS = ['month', 'year', 'decade', 'century'];

function clamp(date, min, max) {
  return _dates2.default.max(_dates2.default.min(date, max), min);
}

var CalendarView = (_temp = _class = function (_React$Component) {
  _inherits(CalendarView, _React$Component);

  function CalendarView() {
    _classCallCheck(this, CalendarView);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  CalendarView.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        activeId = _props.activeId,
        props = _objectWithoutProperties(_props, ['className', 'activeId']);

    return _react2.default.createElement('table', _extends({}, props, {
      role: 'grid',
      tabIndex: '-1',
      'aria-activedescendant': activeId || null,
      className: (0, _classnames2.default)(className, 'rw-nav-view', 'rw-calendar-grid')
    }));
  };

  return CalendarView;
}(_react2.default.Component), _class.propTypes = {
  activeId: _propTypes2.default.string
}, _temp);
var CalendarViewCell = (_temp3 = _class2 = function (_React$Component2) {
  _inherits(CalendarViewCell, _React$Component2);

  function CalendarViewCell() {
    var _temp2, _this2, _ret;

    _classCallCheck(this, CalendarViewCell);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp2 = (_this2 = _possibleConstructorReturn(this, _React$Component2.call.apply(_React$Component2, [this].concat(args))), _this2), _this2.handleChange = function () {
      var _this2$props = _this2.props,
          onChange = _this2$props.onChange,
          min = _this2$props.min,
          max = _this2$props.max,
          date = _this2$props.date;

      onChange(clamp(date, min, max));
    }, _temp2), _possibleConstructorReturn(_this2, _ret);
  }

  CalendarViewCell.prototype.isEqual = function isEqual(date) {
    return _dates2.default.eq(this.props.date, date, this.props.unit);
  };

  CalendarViewCell.prototype.isEmpty = function isEmpty() {
    var _props2 = this.props,
        unit = _props2.unit,
        min = _props2.min,
        max = _props2.max,
        date = _props2.date;

    return !_dates2.default.inRange(date, min, max, unit);
  };

  CalendarViewCell.prototype.isNow = function isNow() {
    return this.props.now && this.isEqual(this.props.now);
  };

  CalendarViewCell.prototype.isFocused = function isFocused() {
    return !this.props.disabled && !this.isEmpty() && this.isEqual(this.props.focused);
  };

  CalendarViewCell.prototype.isSelected = function isSelected() {
    return this.props.selected && this.isEqual(this.props.selected);
  };

  CalendarViewCell.prototype.isOffView = function isOffView() {
    var _props3 = this.props,
        viewUnit = _props3.viewUnit,
        focused = _props3.focused,
        date = _props3.date;

    return date && focused && viewUnit && _dates2.default[viewUnit](date) !== _dates2.default[viewUnit](focused);
  };

  CalendarViewCell.prototype.render = function render() {
    var _props4 = this.props,
        children = _props4.children,
        activeId = _props4.activeId,
        label = _props4.label,
        disabled = _props4.disabled;

    var isDisabled = disabled || this.isEmpty();

    return _react2.default.createElement(
      'td',
      {
        role: 'gridcell',
        id: this.isFocused() ? activeId : null,
        title: label,
        'aria-label': label,
        'aria-readonly': disabled,
        'aria-selected': this.isSelected(),
        onClick: !isDisabled ? this.handleChange : undefined,
        className: (0, _classnames2.default)('rw-cell', this.isNow() && 'rw-now', isDisabled && 'rw-state-disabled', this.isEmpty() && 'rw-cell-not-allowed', this.isOffView() && 'rw-cell-off-range', this.isFocused() && 'rw-state-focus', this.isSelected() && 'rw-state-selected')
      },
      children
    );
  };

  return CalendarViewCell;
}(_react2.default.Component), _class2.propTypes = {
  id: _propTypes2.default.string,
  activeId: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.string,
  now: _propTypes2.default.instanceOf(Date),
  date: _propTypes2.default.instanceOf(Date),
  selected: _propTypes2.default.instanceOf(Date),
  focused: _propTypes2.default.instanceOf(Date),
  min: _propTypes2.default.instanceOf(Date),
  max: _propTypes2.default.instanceOf(Date),
  unit: _propTypes2.default.oneOf(['day'].concat(VIEW_UNITS)),
  viewUnit: _propTypes2.default.oneOf(VIEW_UNITS),
  onChange: _propTypes2.default.func.isRequired,
  disabled: _propTypes2.default.bool
}, _temp3);


CalendarView.Body = function (props) {
  return _react2.default.createElement('tbody', _extends({ className: 'rw-calendar-body' }, props));
};
CalendarView.Row = function (props) {
  return _react2.default.createElement('tr', _extends({ role: 'row' }, props));
};
CalendarView.Cell = CalendarViewCell;

exports.default = CalendarView;
module.exports = exports['default'];

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _calendarViewUnits;

var views = {
  MONTH: 'month',
  YEAR: 'year',
  DECADE: 'decade',
  CENTURY: 'century'
};

var directions = exports.directions = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  UP: 'UP',
  DOWN: 'DOWN'
};

var datePopups = exports.datePopups = {
  TIME: 'time',
  DATE: 'date'
};

var calendarViews = exports.calendarViews = views;

var calendarViewUnits = exports.calendarViewUnits = (_calendarViewUnits = {}, _calendarViewUnits[views.MONTH] = 'day', _calendarViewUnits[views.YEAR] = views.MONTH, _calendarViewUnits[views.DECADE] = views.YEAR, _calendarViewUnits[views.CENTURY] = views.DECADE, _calendarViewUnits);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
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

module.exports = emptyFunction;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
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

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

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

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = spyOnMount;

var _spyOnComponent = __webpack_require__(28);

var _spyOnComponent2 = _interopRequireDefault(_spyOnComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function spyOnMount(componentInstance) {
  var mounted = true;

  (0, _spyOnComponent2.default)(componentInstance, {
    componentWillUnmount: function componentWillUnmount() {
      mounted = false;
    }
  });

  return function () {
    return mounted;
  };
}
module.exports = exports['default'];

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = style;

var _camelizeStyle = __webpack_require__(54);

var _camelizeStyle2 = _interopRequireDefault(_camelizeStyle);

var _hyphenateStyle = __webpack_require__(78);

var _hyphenateStyle2 = _interopRequireDefault(_hyphenateStyle);

var _getComputedStyle2 = __webpack_require__(80);

var _getComputedStyle3 = _interopRequireDefault(_getComputedStyle2);

var _removeStyle = __webpack_require__(81);

var _removeStyle2 = _interopRequireDefault(_removeStyle);

var _properties = __webpack_require__(41);

var _isTransform = __webpack_require__(82);

var _isTransform2 = _interopRequireDefault(_isTransform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function style(node, property, value) {
  var css = '';
  var transforms = '';
  var props = property;

  if (typeof property === 'string') {
    if (value === undefined) {
      return node.style[(0, _camelizeStyle2.default)(property)] || (0, _getComputedStyle3.default)(node).getPropertyValue((0, _hyphenateStyle2.default)(property));
    } else {
      (props = {})[property] = value;
    }
  }

  Object.keys(props).forEach(function (key) {
    var value = props[key];
    if (!value && value !== 0) {
      (0, _removeStyle2.default)(node, (0, _hyphenateStyle2.default)(key));
    } else if ((0, _isTransform2.default)(key)) {
      transforms += key + '(' + value + ') ';
    } else {
      css += (0, _hyphenateStyle2.default)(key) + ': ' + value + ';';
    }
  });

  if (transforms) {
    css += _properties.transform + ': ' + transforms + ';';
  }

  node.style.cssText += ';' + css;
}
module.exports = exports['default'];

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animationEnd = exports.animationDelay = exports.animationTiming = exports.animationDuration = exports.animationName = exports.transitionEnd = exports.transitionDuration = exports.transitionDelay = exports.transitionTiming = exports.transitionProperty = exports.transform = undefined;

var _inDOM = __webpack_require__(11);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transform = 'transform';
var prefix = void 0,
    transitionEnd = void 0,
    animationEnd = void 0;
var transitionProperty = void 0,
    transitionDuration = void 0,
    transitionTiming = void 0,
    transitionDelay = void 0;
var animationName = void 0,
    animationDuration = void 0,
    animationTiming = void 0,
    animationDelay = void 0;

if (_inDOM2.default) {
  var _getTransitionPropert = getTransitionProperties();

  prefix = _getTransitionPropert.prefix;
  exports.transitionEnd = transitionEnd = _getTransitionPropert.transitionEnd;
  exports.animationEnd = animationEnd = _getTransitionPropert.animationEnd;


  exports.transform = transform = prefix + '-' + transform;
  exports.transitionProperty = transitionProperty = prefix + '-transition-property';
  exports.transitionDuration = transitionDuration = prefix + '-transition-duration';
  exports.transitionDelay = transitionDelay = prefix + '-transition-delay';
  exports.transitionTiming = transitionTiming = prefix + '-transition-timing-function';

  exports.animationName = animationName = prefix + '-animation-name';
  exports.animationDuration = animationDuration = prefix + '-animation-duration';
  exports.animationTiming = animationTiming = prefix + '-animation-delay';
  exports.animationDelay = animationDelay = prefix + '-animation-timing-function';
}

exports.transform = transform;
exports.transitionProperty = transitionProperty;
exports.transitionTiming = transitionTiming;
exports.transitionDelay = transitionDelay;
exports.transitionDuration = transitionDuration;
exports.transitionEnd = transitionEnd;
exports.animationName = animationName;
exports.animationDuration = animationDuration;
exports.animationTiming = animationTiming;
exports.animationDelay = animationDelay;
exports.animationEnd = animationEnd;
exports.default = {
  transform: transform,
  end: transitionEnd,
  property: transitionProperty,
  timing: transitionTiming,
  delay: transitionDelay,
  duration: transitionDuration
};


function getTransitionProperties() {
  var style = document.createElement('div').style;

  var vendorMap = {
    O: function O(e) {
      return 'o' + e.toLowerCase();
    },
    Moz: function Moz(e) {
      return e.toLowerCase();
    },
    Webkit: function Webkit(e) {
      return 'webkit' + e;
    },
    ms: function ms(e) {
      return 'MS' + e;
    }
  };

  var vendors = Object.keys(vendorMap);

  var transitionEnd = void 0,
      animationEnd = void 0;
  var prefix = '';

  for (var i = 0; i < vendors.length; i++) {
    var vendor = vendors[i];

    if (vendor + 'TransitionProperty' in style) {
      prefix = '-' + vendor.toLowerCase();
      transitionEnd = vendorMap[vendor]('TransitionEnd');
      animationEnd = vendorMap[vendor]('AnimationEnd');
      break;
    }
  }

  if (!transitionEnd && 'transitionProperty' in style) transitionEnd = 'transitionend';

  if (!animationEnd && 'animationName' in style) animationEnd = 'animationend';

  style = null;

  return { animationEnd: animationEnd, transitionEnd: transitionEnd, prefix: prefix };
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

var _Props = __webpack_require__(4);

var Props = _interopRequireWildcard(_Props);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListOption = (_temp2 = _class = function (_React$Component) {
  _inherits(ListOption, _React$Component);

  function ListOption() {
    var _temp, _this, _ret;

    _classCallCheck(this, ListOption);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleSelect = function (event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          disabled = _this$props.disabled,
          dataItem = _this$props.dataItem;

      if (onSelect && !disabled) onSelect(dataItem, event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ListOption.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        children = _props.children,
        focused = _props.focused,
        selected = _props.selected,
        disabled = _props.disabled,
        activeId = _props.activeId;


    var Tag = this.props.component || 'li';
    var props = Props.omitOwn(this);

    var classes = {
      'rw-state-focus': focused,
      'rw-state-selected': selected,
      'rw-state-disabled': disabled
    };

    var id = focused ? activeId : undefined;

    return _react2.default.createElement(
      Tag,
      _extends({
        id: id,
        role: 'option',
        tabIndex: !disabled ? '-1' : undefined,
        'aria-selected': !!selected,
        className: (0, _classnames2.default)('rw-list-option', className, classes),
        onClick: this.handleSelect
      }, props),
      children
    );
  };

  return ListOption;
}(_react2.default.Component), _class.propTypes = {
  activeId: _propTypes2.default.string,
  dataItem: _propTypes2.default.any,
  index: _propTypes2.default.number,
  focused: _propTypes2.default.bool,
  selected: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  onSelect: _propTypes2.default.func,
  component: _propTypes2.default.string
}, _temp2);
exports.default = ListOption;
module.exports = exports['default'];

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = (_temp = _class = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    _classCallCheck(this, Input);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Input.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        disabled = _props.disabled,
        readOnly = _props.readOnly,
        value = _props.value,
        tabIndex = _props.tabIndex,
        _props$type = _props.type,
        type = _props$type === undefined ? 'text' : _props$type,
        _props$component = _props.component,
        Component = _props$component === undefined ? 'input' : _props$component,
        props = _objectWithoutProperties(_props, ['className', 'disabled', 'readOnly', 'value', 'tabIndex', 'type', 'component']);

    return _react2.default.createElement(Component, _extends({}, props, {
      type: type,
      tabIndex: tabIndex || 0,
      autoComplete: 'off',
      disabled: disabled,
      readOnly: readOnly,
      'aria-disabled': disabled,
      'aria-readonly': readOnly,
      value: value == null ? '' : value,
      className: (0, _classnames2.default)(className, 'rw-input')
    }));
  };

  return Input;
}(_react2.default.Component), _class.propTypes = {
  disabled: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  value: _propTypes2.default.string,
  type: _propTypes2.default.string,
  tabIndex: _propTypes2.default.string,
  component: _propTypes2.default.any
}, _temp);
exports.default = Input;
module.exports = exports['default'];

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _NEXT_VIEW, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _class3, _temp;

var _invariant = __webpack_require__(26);

var _invariant2 = _interopRequireDefault(_invariant);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _activeElement = __webpack_require__(27);

var _activeElement2 = _interopRequireDefault(_activeElement);

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

var _deprecated = __webpack_require__(103);

var _deprecated2 = _interopRequireDefault(_deprecated);

var _uncontrollable = __webpack_require__(15);

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _Widget = __webpack_require__(16);

var _Widget2 = _interopRequireDefault(_Widget);

var _WidgetPicker = __webpack_require__(21);

var _WidgetPicker2 = _interopRequireDefault(_WidgetPicker);

var _Popup = __webpack_require__(29);

var _Popup2 = _interopRequireDefault(_Popup);

var _Button = __webpack_require__(19);

var _Button2 = _interopRequireDefault(_Button);

var _Calendar = __webpack_require__(61);

var _Calendar2 = _interopRequireDefault(_Calendar);

var _DateTimePickerInput = __webpack_require__(105);

var _DateTimePickerInput2 = _interopRequireDefault(_DateTimePickerInput);

var _Select = __webpack_require__(22);

var _Select2 = _interopRequireDefault(_Select);

var _TimeList = __webpack_require__(106);

var _TimeList2 = _interopRequireDefault(_TimeList);

var _messages = __webpack_require__(12);

var _Props = __webpack_require__(4);

var Props = _interopRequireWildcard(_Props);

var _PropTypes = __webpack_require__(3);

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

var _focusManager = __webpack_require__(17);

var _focusManager2 = _interopRequireDefault(_focusManager);

var _scrollManager = __webpack_require__(25);

var _scrollManager2 = _interopRequireDefault(_scrollManager);

var _withRightToLeft = __webpack_require__(18);

var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);

var _interaction = __webpack_require__(13);

var _dates = __webpack_require__(14);

var _dates2 = _interopRequireDefault(_dates);

var _localizers = __webpack_require__(6);

var _constants = __webpack_require__(35);

var _widgetHelpers = __webpack_require__(10);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var NEXT_VIEW = (_NEXT_VIEW = {}, _NEXT_VIEW[_constants.datePopups.DATE] = _constants.datePopups.TIME, _NEXT_VIEW[_constants.datePopups.TIME] = _constants.datePopups.DATE, _NEXT_VIEW);

var isBothOrNeither = function isBothOrNeither(a, b) {
  return a && b || !a && !b;
};

var propTypes = _extends({}, _Calendar2.default.ControlledComponent.propTypes, {

  value: _propTypes2.default.instanceOf(Date),

  /**
   * @example ['onChangePicker', [ ['new Date()', null] ]]
   */
  onChange: _propTypes2.default.func,
  /**
   * @type (false | 'time' | 'date')
   */
  open: _propTypes2.default.oneOf([false, _constants.datePopups.TIME, _constants.datePopups.DATE]),
  onToggle: _propTypes2.default.func,

  /**
   * Default current date at which the calendar opens. If none is provided, opens at today's date or the `value` date (if any).
   */
  currentDate: _propTypes2.default.instanceOf(Date),

  /**
   * Change event Handler that is called when the currentDate is changed. The handler is called with the currentDate object.
   */
  onCurrentDateChange: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,

  /**
   * The minimum Date that can be selected. Min only limits selection, it doesn't constrain the date values that
   * can be typed or pasted into the widget. If you need this behavior you can constrain values via
   * the `onChange` handler.
   *
   * @example ['prop', ['min', 'new Date()']]
   */
  min: _propTypes2.default.instanceOf(Date),

  /**
   * The maximum Date that can be selected. Max only limits selection, it doesn't constrain the date values that
   * can be typed or pasted into the widget. If you need this behavior you can constrain values via
   * the `onChange` handler.
   *
   * @example ['prop', ['max', 'new Date()']]
   */
  max: _propTypes2.default.instanceOf(Date),

  /**
   * The amount of minutes between each entry in the time list.
   *
   * @example ['prop', { step: 90 }]
   */
  step: _propTypes2.default.number,

  culture: _propTypes2.default.string,

  /**
   * A formatter used to display the date value. For more information about formats
   * visit the [Localization page](/i18n)
   *
   * @example ['dateFormat', ['format', "{ raw: 'MMM dd, yyyy' }", null, { defaultValue: 'new Date()', time: 'false' }]]
   */
  format: CustomPropTypes.dateFormat,

  /**
   * A formatter used by the time dropdown to render times. For more information about formats visit
   * the [Localization page](/i18n).
   *
   * @example ['dateFormat', ['timeFormat', "{ time: 'medium' }", null, { date: 'false', open: '"time"' }]]
   */
  timeFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter to be used while the date input has focus. Useful for showing a simpler format for inputing.
   * For more information about formats visit the [Localization page](/i18n)
   *
   * @example ['dateFormat', ['editFormat', "{ date: 'short' }", null, { defaultValue: 'new Date()', format: "{ raw: 'MMM dd, yyyy' }", time: 'false' }]]
   */
  editFormat: CustomPropTypes.dateFormat,

  /**
   * Enable the calendar component of the picker.
   */
  date: _propTypes2.default.bool,

  /**
   * Enable the time list component of the picker.
   */
  time: _propTypes2.default.bool,

  /** @ignore */
  calendar: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `date` instead'),

  /**
   * A customize the rendering of times but providing a custom component.
   */
  timeComponent: CustomPropTypes.elementType,

  dropUp: _propTypes2.default.bool,
  popupTransition: CustomPropTypes.elementType,

  placeholder: _propTypes2.default.string,
  name: _propTypes2.default.string,
  autoFocus: _propTypes2.default.bool,
  disabled: CustomPropTypes.disabled,
  readOnly: CustomPropTypes.disabled,

  /**
   * Determines how the widget parses the typed date string into a Date object. You can provide an array of formats to try,
   * or provide a function that returns a date to handle parsing yourself. When `parse` is unspecified and
   * the `format` prop is a `string` parse will automatically use that format as its default.
   */
  parse: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.string, _propTypes2.default.func]),

  /** @ignore */
  tabIndex: _propTypes2.default.any,
  /** @ignore */
  'aria-labelledby': _propTypes2.default.string,
  /** @ignore */
  'aria-describedby': _propTypes2.default.string,

  onKeyDown: _propTypes2.default.func,
  onKeyPress: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,

  inputProps: _propTypes2.default.object,
  messages: _propTypes2.default.shape({
    dateButton: _propTypes2.default.string,
    timeButton: _propTypes2.default.string
  })

  /**
   * ---
   * subtitle: DatePicker, TimePicker
   * localized: true
   * shortcuts:
   *   - { key: alt + down arrow, label:  open calendar or time }
   *   - { key: alt + up arrow, label: close calendar or time }
   *   - { key: down arrow, label: move focus to next item }
   *   - { key: up arrow, label: move focus to previous item }
   *   - { key: home, label: move focus to first item }
   *   - { key: end, label: move focus to last item }
   *   - { key: enter, label: select focused item }
   *   - { key: any key, label: search list for item starting with key }
   * ---
   *
   * @public
   * @extends Calendar
  */
});
var DateTimePicker = (0, _withRightToLeft2.default)(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
  _inherits(DateTimePicker, _React$Component);

  function DateTimePicker() {
    _classCallCheck(this, DateTimePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _initDefineProp(_this, 'handleChange', _descriptor, _this);

    _initDefineProp(_this, 'handleKeyDown', _descriptor2, _this);

    _initDefineProp(_this, 'handleKeyPress', _descriptor3, _this);

    _initDefineProp(_this, 'handleDateSelect', _descriptor4, _this);

    _initDefineProp(_this, 'handleTimeSelect', _descriptor5, _this);

    _initDefineProp(_this, 'handleCalendarClick', _descriptor6, _this);

    _initDefineProp(_this, 'handleTimeClick', _descriptor7, _this);

    _this.parse = function (string) {
      var _this$props = _this.props,
          parse = _this$props.parse,
          culture = _this$props.culture,
          editFormat = _this$props.editFormat;

      var format = getFormat(_this.props, true);

      var parsers = [];

      if (format != null) parsers.push(format);
      if (editFormat != null) parsers.push(editFormat);

      !parsers.length ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'React Widgets: there are no specified `parse` formats provided and the `format` prop is a function. ' + 'the DateTimePicker is unable to parse `%s` into a dateTime, ' + 'please provide either a parse function or localizer compatible `format` prop', string) : (0, _invariant2.default)(false) : void 0;

      parsers.sort(sortFnsFirst);
      if (parse) parsers = [].concat(parse, parsers);

      var date = void 0;
      for (var i = 0; i < parsers.length; i++) {
        date = parseDate(string, parsers[i], culture);
        if (date) return date;
      }
      return null;
    };

    _this.messages = (0, _messages.getMessages)(_this.props.messages);

    _this.inputId = (0, _widgetHelpers.instanceId)(_this, '_input');
    _this.dateId = (0, _widgetHelpers.instanceId)(_this, '_date');
    _this.listId = (0, _widgetHelpers.instanceId)(_this, '_listbox');
    _this.activeCalendarId = (0, _widgetHelpers.instanceId)(_this, '_calendar_active_cell');
    _this.activeOptionId = (0, _widgetHelpers.instanceId)(_this, '_listbox_active_option');

    _this.handleScroll = (0, _scrollManager2.default)(_this);
    _this.focusManager = (0, _focusManager2.default)(_this, {
      didHandle: function didHandle(focused) {
        if (!focused) _this.close();
      }
    });

    _this.state = {
      focused: false
    };
    return _this;
  }

  DateTimePicker.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
    var messages = _ref.messages;

    this.messages = (0, _messages.getMessages)(messages);
  };

  DateTimePicker.prototype.renderInput = function renderInput(owns) {
    var _props = this.props,
        open = _props.open,
        value = _props.value,
        editFormat = _props.editFormat,
        culture = _props.culture,
        placeholder = _props.placeholder,
        disabled = _props.disabled,
        readOnly = _props.readOnly,
        name = _props.name,
        tabIndex = _props.tabIndex,
        autoFocus = _props.autoFocus,
        inputProps = _props.inputProps,
        ariaLabelledby = _props['aria-labelledby'],
        ariaDescribedby = _props['aria-describedby'];
    var focused = this.state.focused;


    var activeId = null;
    if (open === _constants.datePopups.TIME) {
      activeId = this.activeOptionId;
    } else if (open === _constants.datePopups.DATE) {
      activeId = this.activeCalendarId;
    }

    return _react2.default.createElement(_DateTimePickerInput2.default, _extends({}, inputProps, {
      id: this.inputId,
      ref: 'valueInput',
      role: 'combobox',
      name: name,
      tabIndex: tabIndex,
      autoFocus: autoFocus,
      placeholder: placeholder,
      disabled: disabled,
      readOnly: readOnly,
      value: value,
      format: getFormat(this.props),
      editFormat: editFormat,
      editing: focused,
      culture: culture,
      parse: this.parse,
      onChange: this.handleChange,
      'aria-haspopup': true,
      'aria-activedescendant': activeId,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'aria-expanded': !!open,
      'aria-owns': owns
    }));
  };

  DateTimePicker.prototype.renderButtons = function renderButtons() {
    var _props2 = this.props,
        date = _props2.date,
        time = _props2.time,
        disabled = _props2.disabled,
        readOnly = _props2.readOnly;


    if (!date && !time) {
      return null;
    }
    var messages = this.messages;

    return _react2.default.createElement(
      _Select2.default,
      { bordered: true },
      date && _react2.default.createElement(_Button2.default, {
        icon: 'calendar',
        label: messages.dateButton(),
        disabled: disabled || readOnly,
        onClick: this.handleCalendarClick
      }),
      time && _react2.default.createElement(_Button2.default, {
        icon: 'clock-o',
        label: messages.timeButton(),
        disabled: disabled || readOnly,
        onClick: this.handleTimeClick
      })
    );
  };

  DateTimePicker.prototype.renderCalendar = function renderCalendar() {
    var _this2 = this;

    var activeCalendarId = this.activeCalendarId,
        inputId = this.inputId,
        dateId = this.dateId;
    var _props3 = this.props,
        open = _props3.open,
        value = _props3.value,
        popupTransition = _props3.popupTransition,
        dropUp = _props3.dropUp,
        onCurrentDateChange = _props3.onCurrentDateChange,
        currentDate = _props3.currentDate;


    var calendarProps = Props.pick(this.props, _Calendar2.default.ControlledComponent);

    return _react2.default.createElement(
      _Popup2.default,
      {
        dropUp: dropUp,
        open: open === _constants.datePopups.DATE,
        className: 'rw-calendar-popup',
        transition: popupTransition
      },
      _react2.default.createElement(_Calendar2.default, _extends({}, calendarProps, {
        ref: 'calPopup',
        id: dateId,
        activeId: activeCalendarId,
        tabIndex: '-1',
        value: value,
        autoFocus: false,
        onChange: this.handleDateSelect
        // #75: need to aggressively reclaim focus from the calendar otherwise
        // disabled header/footer buttons will drop focus completely from the widget
        , onNavigate: function onNavigate() {
          return _this2.focus();
        },
        currentDate: currentDate,
        onCurrentDateChange: onCurrentDateChange,
        'aria-hidden': !open,
        'aria-live': 'polite',
        'aria-labelledby': inputId
      }))
    );
  };

  DateTimePicker.prototype.renderTimeList = function renderTimeList() {
    var _this3 = this;

    var activeOptionId = this.activeOptionId,
        inputId = this.inputId,
        listId = this.listId;
    var _props4 = this.props,
        open = _props4.open,
        value = _props4.value,
        min = _props4.min,
        max = _props4.max,
        step = _props4.step,
        currentDate = _props4.currentDate,
        dropUp = _props4.dropUp,
        date = _props4.date,
        culture = _props4.culture,
        timeFormat = _props4.timeFormat,
        timeComponent = _props4.timeComponent,
        popupTransition = _props4.popupTransition;


    return _react2.default.createElement(
      _Popup2.default,
      {
        dropUp: dropUp,
        transition: popupTransition,
        open: open === _constants.datePopups.TIME,
        onEntering: function onEntering() {
          return _this3.refs.timePopup.forceUpdate();
        }
      },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_TimeList2.default, {
          ref: 'timePopup',
          id: listId,
          min: min,
          max: max,
          step: step,
          currentDate: currentDate,
          activeId: activeOptionId,
          format: timeFormat,
          culture: culture,
          value: dateOrNull(value),
          onMove: this.handleScroll,
          onSelect: this.handleTimeSelect,
          preserveDate: !!date,
          itemComponent: timeComponent,
          'aria-labelledby': inputId,
          'aria-live': open && 'polite',
          'aria-hidden': !open,
          messages: this.messages
        })
      )
    );
  };

  DateTimePicker.prototype.render = function render() {
    var _props5 = this.props,
        className = _props5.className,
        date = _props5.date,
        time = _props5.time,
        open = _props5.open,
        disabled = _props5.disabled,
        readOnly = _props5.readOnly,
        dropUp = _props5.dropUp;
    var focused = this.state.focused;


    var elementProps = Props.pickElementProps(this, _Calendar2.default.ControlledComponent);

    var shouldRenderList = open || (0, _widgetHelpers.isFirstFocusedRender)(this);

    var owns = '';
    if (date) owns += this.dateId;
    if (time) owns += ' ' + this.listId;

    return _react2.default.createElement(
      _Widget2.default,
      _extends({}, elementProps, {
        open: !!open,
        dropUp: dropUp,
        focused: focused,
        disabled: disabled,
        readOnly: readOnly,
        onKeyDown: this.handleKeyDown,
        onKeyPress: this.handleKeyPress,
        onBlur: this.focusManager.handleBlur,
        onFocus: this.focusManager.handleFocus,
        className: (0, _classnames2.default)(className, 'rw-datetime-picker')
      }),
      _react2.default.createElement(
        _WidgetPicker2.default,
        null,
        this.renderInput(owns.trim()),
        this.renderButtons()
      ),
      !!(shouldRenderList && time) && this.renderTimeList(),
      !!(shouldRenderList && date) && this.renderCalendar()
    );
  };

  DateTimePicker.prototype.focus = function focus() {
    var valueInput = this.refs.valueInput;


    if (valueInput && (0, _activeElement2.default)() !== (0, _reactDom.findDOMNode)(valueInput)) valueInput.focus();
  };

  DateTimePicker.prototype.toggle = function toggle(view) {
    var open = this.props.open;


    if (!open || open !== view) this.open(view);else this.close();
  };

  DateTimePicker.prototype.open = function open(view) {
    var _props6 = this.props,
        open = _props6.open,
        date = _props6.date,
        time = _props6.time,
        onToggle = _props6.onToggle;


    if (!view) {
      if (time) view = _constants.datePopups.TIME;
      if (date) view = _constants.datePopups.DATE;
      if (isBothOrNeither(date, time)) view = NEXT_VIEW[open] || _constants.datePopups.DATE;
    }

    if (open !== view) (0, _widgetHelpers.notify)(onToggle, view);
  };

  DateTimePicker.prototype.close = function close() {
    if (this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, false);
  };

  DateTimePicker.prototype.inRangeValue = function inRangeValue(value) {
    if (value == null) return value;

    return _dates2.default.max(_dates2.default.min(value, this.props.max), this.props.min);
  };

  return DateTimePicker;
}(_react2.default.Component), _class3.displayName = 'DateTimePicker', _class3.propTypes = propTypes, _class3.defaultProps = _extends({}, _Calendar2.default.ControlledComponent.defaultProps, {
  value: null,
  min: new Date(1900, 0, 1),
  max: new Date(2099, 11, 31),
  date: true,
  time: true,
  open: false
}), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'handleChange', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (date, str, constrain) {
      var _props7 = _this4.props,
          onChange = _props7.onChange,
          value = _props7.value;


      if (constrain) date = _this4.inRangeValue(date);

      if (onChange) {
        if (date == null || value == null) {
          if (date != value //eslint-disable-line eqeqeq
          ) onChange(date, str);
        } else if (!_dates2.default.eq(date, value)) {
          onChange(date, str);
        }
      }
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (e) {
      var _props8 = _this5.props,
          open = _props8.open,
          onKeyDown = _props8.onKeyDown;


      (0, _widgetHelpers.notify)(onKeyDown, [e]);

      if (e.defaultPrevented) return;

      if (e.key === 'Escape' && open) _this5.close();else if (e.altKey) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          _this5.open();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          _this5.close();
        }
      } else if (open) {
        if (open === _constants.datePopups.DATE) _this5.refs.calPopup.refs.inner.handleKeyDown(e);
        if (open === _constants.datePopups.TIME) _this5.refs.timePopup.handleKeyDown(e);
      }
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyPress', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (e) {
      (0, _widgetHelpers.notify)(_this6.props.onKeyPress, [e]);

      if (e.defaultPrevented) return;

      if (_this6.props.open === _constants.datePopups.TIME) _this6.refs.timePopup.handleKeyPress(e);
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'handleDateSelect', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function (date) {
      var format = getFormat(_this7.props),
          dateTime = _dates2.default.merge(date, _this7.props.value, _this7.props.currentDate),
          dateStr = formatDate(date, format, _this7.props.culture);

      _this7.close();
      (0, _widgetHelpers.notify)(_this7.props.onSelect, [dateTime, dateStr]);
      _this7.handleChange(dateTime, dateStr, true);
      _this7.focus();
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'handleTimeSelect', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this8 = this;

    return function (datum) {
      var format = getFormat(_this8.props),
          dateTime = _dates2.default.merge(_this8.props.value, datum.date, _this8.props.currentDate),
          dateStr = formatDate(datum.date, format, _this8.props.culture);

      _this8.close();
      (0, _widgetHelpers.notify)(_this8.props.onSelect, [dateTime, dateStr]);
      _this8.handleChange(dateTime, dateStr, true);
      _this8.focus();
    };
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'handleCalendarClick', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this9 = this;

    return function () {
      _this9.focus();
      _this9.toggle(_constants.datePopups.DATE);
    };
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'handleTimeClick', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this10 = this;

    return function () {
      _this10.focus();
      _this10.toggle(_constants.datePopups.TIME);
    };
  }
})), _class2)) || _class;

exports.default = (0, _uncontrollable2.default)(DateTimePicker, {
  open: 'onToggle',
  value: 'onChange',
  currentDate: 'onCurrentDateChange'
}, ['focus']);


function parseDate(string, parser, culture) {
  return typeof parser === 'function' ? parser(string, culture) : _localizers.date.parse(string, parser, culture);
}

function getFormat(props) {
  var isDate = props[_constants.datePopups.DATE] != null ? props[_constants.datePopups.DATE] : true,
      isTime = props[_constants.datePopups.TIME] != null ? props[_constants.datePopups.TIME] : true;

  return props.format ? props.format : isDate && isTime || !isDate && !isTime ? _localizers.date.getFormat('default') : _localizers.date.getFormat(isDate ? 'date' : 'time');
}

function formatDate(date, format, culture) {
  var val = '';

  if (date instanceof Date && !isNaN(date.getTime())) val = _localizers.date.format(date, format, culture);

  return val;
}

function sortFnsFirst(a, b) {
  var aFn = typeof a === 'function';
  var bFn = typeof b === 'function';

  if (aFn && !bFn) return -1;
  if (!aFn && bFn) return 1;
  if (aFn && bFn || !aFn && !bFn) return 0;
}

function dateOrNull(dt) {
  if (dt && !isNaN(dt.getTime())) return dt;
  return null;
}
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(36);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
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

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ownerDocument;
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}
module.exports = exports["default"];

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = createTimeoutManager;

var _spyOnComponent = __webpack_require__(28);

var _spyOnComponent2 = _interopRequireDefault(_spyOnComponent);

var _mountManager = __webpack_require__(39);

var _mountManager2 = _interopRequireDefault(_mountManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createTimeoutManager(componentInstance) {
  var isMounted = (0, _mountManager2.default)(componentInstance);
  var timers = Object.create(null);
  var manager = void 0;

  (0, _spyOnComponent2.default)(componentInstance, {
    componentWillUnmount: function componentWillUnmount() {
      for (var k in timers) {
        clearTimeout(timers[k]);
      }timers = null;
    }
  });

  return manager = {
    clear: function clear(key) {
      clearTimeout(timers[key]);
    },
    set: function set(key, fn, ms) {
      if (!isMounted()) return;

      manager.clear(key);
      timers[key] = setTimeout(fn, ms);
    }
  };
}
module.exports = exports['default'];

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _transitionClasses;

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

var _events = __webpack_require__(49);

var _events2 = _interopRequireDefault(_events);

var _style = __webpack_require__(40);

var _style2 = _interopRequireDefault(_style);

var _height = __webpack_require__(30);

var _height2 = _interopRequireDefault(_height);

var _properties = __webpack_require__(41);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Transition = __webpack_require__(56);

var _Transition2 = _interopRequireDefault(_Transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var transitionClasses = (_transitionClasses = {}, _transitionClasses[_Transition.ENTERING] = 'rw-popup-transition-entering', _transitionClasses[_Transition.EXITING] = 'rw-popup-transition-exiting', _transitionClasses[_Transition.EXITED] = 'rw-popup-transition-exited', _transitionClasses);

var propTypes = {
  in: _propTypes2.default.bool.isRequired,
  dropUp: _propTypes2.default.bool,
  onEntering: _propTypes2.default.func,
  onEntered: _propTypes2.default.func
};

function parseDuration(node) {
  var str = (0, _style2.default)(node, _properties.transitionDuration);
  var mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}

var SlideDownTransition = function (_React$Component) {
  _inherits(SlideDownTransition, _React$Component);

  function SlideDownTransition() {
    var _temp, _this, _ret;

    _classCallCheck(this, SlideDownTransition);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleTransitionEnd = function (node, done) {
      var duration = parseDuration(node.lastChild) || 0;

      var handler = function handler() {
        _events2.default.off(node, _properties.transitionEnd, handler, false);
        done();
      };

      setTimeout(handler, duration * 1.5);
      _events2.default.on(node, _properties.transitionEnd, handler, false);
    }, _this.handleEntered = function (elem) {
      _this.clearContainerHeight(elem);

      if (_this.props.onEntered) _this.props.onEntered();
    }, _this.handleEntering = function () {
      if (_this.props.onEntering) _this.props.onEntering();
    }, _this.setContainerHeight = function (elem) {
      elem.style.height = _this.getHeight() + 'px';
    }, _this.clearContainerHeight = function (elem) {
      elem.style.height = '';
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  SlideDownTransition.prototype.getHeight = function getHeight() {
    var container = this.element;
    var content = container.firstChild;
    var margin = parseInt((0, _style2.default)(content, 'margin-top'), 10) + parseInt((0, _style2.default)(content, 'margin-bottom'), 10);

    var old = container.style.display;
    var height = void 0;

    container.style.display = 'block';
    height = ((0, _height2.default)(content) || 0) + (isNaN(margin) ? 0 : margin);
    container.style.display = old;
    return height;
  };

  SlideDownTransition.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        children = _props.children,
        className = _props.className,
        dropUp = _props.dropUp;


    return _react2.default.createElement(
      _Transition2.default,
      {
        appear: true,
        'in': this.props.in,
        timeout: 5000,
        onEnter: this.setContainerHeight,
        onEntering: this.handleEntering,
        onEntered: this.handleEntered,
        onExit: this.setContainerHeight,
        onExited: this.clearContainerHeight,
        addEndListener: this.handleTransitionEnd
      },
      function (status, innerProps) {
        return _react2.default.createElement(
          'div',
          _extends({}, innerProps, {
            ref: function ref(r) {
              return _this2.element = r;
            },
            className: (0, _classnames2.default)(className, dropUp && 'rw-dropup', transitionClasses[status])
          }),
          _react2.default.createElement(
            'div',
            { className: 'rw-popup-transition' },
            children
          )
        );
      }
    );
  };

  return SlideDownTransition;
}(_react2.default.Component);

SlideDownTransition.propTypes = propTypes;

exports.default = SlideDownTransition;
module.exports = exports['default'];

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listen = exports.filter = exports.off = exports.on = undefined;

var _on = __webpack_require__(50);

var _on2 = _interopRequireDefault(_on);

var _off = __webpack_require__(51);

var _off2 = _interopRequireDefault(_off);

var _filter = __webpack_require__(75);

var _filter2 = _interopRequireDefault(_filter);

var _listen = __webpack_require__(76);

var _listen2 = _interopRequireDefault(_listen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.on = _on2.default;
exports.off = _off2.default;
exports.filter = _filter2.default;
exports.listen = _listen2.default;
exports.default = { on: _on2.default, off: _off2.default, filter: _filter2.default, listen: _listen2.default };

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__(11);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var on = function on() {};
if (_inDOM2.default) {
  on = function () {

    if (document.addEventListener) return function (node, eventName, handler, capture) {
      return node.addEventListener(eventName, handler, capture || false);
    };else if (document.attachEvent) return function (node, eventName, handler) {
      return node.attachEvent('on' + eventName, function (e) {
        e = e || window.event;
        e.target = e.target || e.srcElement;
        e.currentTarget = node;
        handler.call(node, e);
      });
    };
  }();
}

exports.default = on;
module.exports = exports['default'];

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__(11);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var off = function off() {};
if (_inDOM2.default) {
  off = function () {
    if (document.addEventListener) return function (node, eventName, handler, capture) {
      return node.removeEventListener(eventName, handler, capture || false);
    };else if (document.attachEvent) return function (node, eventName, handler) {
      return node.detachEvent('on' + eventName, handler);
    };
  }();
}

exports.default = off;
module.exports = exports['default'];

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__(11);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  // HTML DOM and SVG DOM may have different support levels,
  // so we need to check on context instead of a document root element.
  return _inDOM2.default ? function (context, node) {
    if (context.contains) {
      return context.contains(node);
    } else if (context.compareDocumentPosition) {
      return context === node || !!(context.compareDocumentPosition(node) & 16);
    } else {
      return fallback(context, node);
    }
  } : fallback;
}();

function fallback(context, node) {
  if (node) do {
    if (node === context) return true;
  } while (node = node.parentNode);

  return false;
}
module.exports = exports['default'];

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = qsa;
// Zepto.js
// (c) 2010-2015 Thomas Fuchs
// Zepto.js may be freely distributed under the MIT license.
var simpleSelectorRE = /^[\w-]*$/;
var toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);

function qsa(element, selector) {
  var maybeID = selector[0] === '#',
      maybeClass = selector[0] === '.',
      nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
      isSimple = simpleSelectorRE.test(nameOnly),
      found;

  if (isSimple) {
    if (maybeID) {
      element = element.getElementById ? element : document;
      return (found = element.getElementById(nameOnly)) ? [found] : [];
    }

    if (element.getElementsByClassName && maybeClass) return toArray(element.getElementsByClassName(nameOnly));

    return toArray(element.getElementsByTagName(selector));
  }

  return toArray(element.querySelectorAll(selector));
}
module.exports = exports['default'];

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = camelizeStyleName;

var _camelize = __webpack_require__(77);

var _camelize2 = _interopRequireDefault(_camelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var msPattern = /^-ms-/; /**
                          * Copyright 2014-2015, Facebook, Inc.
                          * All rights reserved.
                          * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
                          */
function camelizeStyleName(string) {
  return (0, _camelize2.default)(string.replace(msPattern, 'ms-'));
}
module.exports = exports['default'];

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = offset;

var _contains = __webpack_require__(52);

var _contains2 = _interopRequireDefault(_contains);

var _isWindow = __webpack_require__(31);

var _isWindow2 = _interopRequireDefault(_isWindow);

var _ownerDocument = __webpack_require__(46);

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function offset(node) {
  var doc = (0, _ownerDocument2.default)(node),
      win = (0, _isWindow2.default)(doc),
      docElem = doc && doc.documentElement,
      box = { top: 0, left: 0, height: 0, width: 0 };

  if (!doc) return;

  // Make sure it's not a disconnected DOM node
  if (!(0, _contains2.default)(docElem, node)) return box;

  if (node.getBoundingClientRect !== undefined) box = node.getBoundingClientRect();

  // IE8 getBoundingClientRect doesn't support width & height
  box = {
    top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
    left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0),
    width: (box.width == null ? node.offsetWidth : box.width) || 0,
    height: (box.height == null ? node.offsetHeight : box.height) || 0
  };

  return box;
}
module.exports = exports['default'];

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;
exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = undefined;

var _propTypes = __webpack_require__(1);

var PropTypes = _interopRequireWildcard(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _PropTypes = __webpack_require__(83);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UNMOUNTED = exports.UNMOUNTED = 'unmounted';
var EXITED = exports.EXITED = 'exited';
var ENTERING = exports.ENTERING = 'entering';
var ENTERED = exports.ENTERED = 'entered';
var EXITING = exports.EXITING = 'exiting';

/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the components.
 * It's up to you to give meaning and effect to those states. For example we can
 * add styles to a component when it enters or exits:
 *
 * ```jsx
 * import Transition from 'react-transition-group/Transition';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 1 },
 *   entered:  { opacity: 1 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {(state) => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm A fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * As noted the `Transition` component doesn't _do_ anything by itself to its child component.
 * What it does do is track transition states over time so you can update the
 * component (such as by adding styles or classes) when it changes states.
 *
 * There are 4 main states a Transition can be in:
 *  - `ENTERING`
 *  - `ENTERED`
 *  - `EXITING`
 *  - `EXITED`
 *
 * Transition state is toggled via the `in` prop. When `true` the component begins the
 * "Enter" stage. During this stage, the component will shift from its current transition state,
 * to `'entering'` for the duration of the transition and then to the `'entered'` stage once
 * it's complete. Let's take the following example:
 *
 * ```jsx
 * state= { in: false };
 *
 * toggleEnterState = () => {
 *   this.setState({ in: true });
 * }
 *
 * render() {
 *   return (
 *     <div>
 *       <Transition in={this.state.in} timeout={500} />
 *       <button onClick={this.toggleEnterState}>Click to Enter</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state and
 * stay there for 500ms (the value of `timeout`) when finally switches to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from `'exiting'` to `'exited'`.
 */

var Transition = function (_React$Component) {
  _inherits(Transition, _React$Component);

  function Transition(props, context) {
    _classCallCheck(this, Transition);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    var parentGroup = context.transitionGroup;
    // In the context of a TransitionGroup all enters are really appears
    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;

    var initialStatus = void 0;
    _this.nextStatus = null;

    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.nextStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }

    _this.state = { status: initialStatus };

    _this.nextCallback = null;
    return _this;
  }

  Transition.prototype.getChildContext = function getChildContext() {
    return { transitionGroup: null }; // allows for nested Transitions
  };

  Transition.prototype.componentDidMount = function componentDidMount() {
    this.updateStatus(true);
  };

  Transition.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var status = this.state.status;


    if (nextProps.in) {
      if (status === UNMOUNTED) {
        this.setState({ status: EXITED });
      }
      if (status !== ENTERING && status !== ENTERED) {
        this.nextStatus = ENTERING;
      }
    } else {
      if (status === ENTERING || status === ENTERED) {
        this.nextStatus = EXITING;
      }
    }
  };

  Transition.prototype.componentDidUpdate = function componentDidUpdate() {
    this.updateStatus();
  };

  Transition.prototype.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  Transition.prototype.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;

    var exit = void 0,
        enter = void 0,
        appear = void 0;

    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter;
      appear = timeout.appear;
    }
    return { exit: exit, enter: enter, appear: appear };
  };

  Transition.prototype.updateStatus = function updateStatus() {
    var mounting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


    if (this.nextStatus !== null) {
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();
      var node = _reactDom2.default.findDOMNode(this);

      if (this.nextStatus === ENTERING) {
        this.performEnter(node, mounting);
      } else {
        this.performExit(node);
      }

      this.nextStatus = null;
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({ status: UNMOUNTED });
    }
  };

  Transition.prototype.performEnter = function performEnter(node, mounting) {
    var _this2 = this;

    var enter = this.props.enter;

    var appearing = this.context.transitionGroup ? this.context.transitionGroup.isMounting : mounting;

    var timeouts = this.getTimeouts();

    // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set
    if (!mounting && !enter) {
      this.safeSetState({ status: ENTERED }, function () {
        _this2.props.onEntered(node);
      });
      return;
    }

    this.props.onEnter(node, appearing);

    this.safeSetState({ status: ENTERING }, function () {
      _this2.props.onEntering(node, appearing);

      // FIXME: appear timeout?
      _this2.onTransitionEnd(node, timeouts.enter, function () {
        _this2.safeSetState({ status: ENTERED }, function () {
          _this2.props.onEntered(node, appearing);
        });
      });
    });
  };

  Transition.prototype.performExit = function performExit(node) {
    var _this3 = this;

    var exit = this.props.exit;

    var timeouts = this.getTimeouts();

    // no exit animation skip right to EXITED
    if (!exit) {
      this.safeSetState({ status: EXITED }, function () {
        _this3.props.onExited(node);
      });
      return;
    }
    this.props.onExit(node);

    this.safeSetState({ status: EXITING }, function () {
      _this3.props.onExiting(node);

      _this3.onTransitionEnd(node, timeouts.exit, function () {
        _this3.safeSetState({ status: EXITED }, function () {
          _this3.props.onExited(node);
        });
      });
    });
  };

  Transition.prototype.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  Transition.prototype.safeSetState = function safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    this.setState(nextState, this.setNextCallback(callback));
  };

  Transition.prototype.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;

        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  Transition.prototype.onTransitionEnd = function onTransitionEnd(node, timeout, handler) {
    this.setNextCallback(handler);

    if (node) {
      if (this.props.addEndListener) {
        this.props.addEndListener(node, this.nextCallback);
      }
      if (timeout != null) {
        setTimeout(this.nextCallback, timeout);
      }
    } else {
      setTimeout(this.nextCallback, 0);
    }
  };

  Transition.prototype.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }

    var _props = this.props,
        children = _props.children,
        childProps = _objectWithoutProperties(_props, ['children']);
    // filter props for Transtition


    delete childProps.in;
    delete childProps.mountOnEnter;
    delete childProps.unmountOnExit;
    delete childProps.appear;
    delete childProps.enter;
    delete childProps.exit;
    delete childProps.timeout;
    delete childProps.addEndListener;
    delete childProps.onEnter;
    delete childProps.onEntering;
    delete childProps.onEntered;
    delete childProps.onExit;
    delete childProps.onExiting;
    delete childProps.onExited;

    if (typeof children === 'function') {
      return children(status, childProps);
    }

    var child = _react2.default.Children.only(children);
    return _react2.default.cloneElement(child, childProps);
  };

  return Transition;
}(_react2.default.Component);

Transition.contextTypes = {
  transitionGroup: PropTypes.object
};
Transition.childContextTypes = {
  transitionGroup: function transitionGroup() {}
};


Transition.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A `function` child can be used instead of a React element.
   * This function is called with the current transition status
   * ('entering', 'entered', 'exiting', 'exited', 'unmounted'), which can used
   * to apply context specific props to a component.
   *
   * ```jsx
   * <Transition timeout={150}>
   *   {(status) => (
   *     <MyComponent className={`fade fade-${status}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.element.isRequired]).isRequired,

  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,

  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: PropTypes.bool,

  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: PropTypes.bool,

  /**
   * Normally a component is not transitioned if it shown when the `<Transition>` component mounts.
   * If you want to transition on the first mount set `appear` to `true`, and the
   * component will transition in as soon as the `<Transition>` mounts.
   *
   * > Note: there are no specific "appear" states. `apprear` only an additional `enter` transition.
   */
  appear: PropTypes.bool,

  /**
   * Enable or disable enter transitions.
   */
  enter: PropTypes.bool,

  /**
   * Enable or disable exit transitions.
   */
  exit: PropTypes.bool,

  /**
   * The duration for the transition, in milliseconds.
   * Required unless `addEventListener` is provided
   *
   * You may specify a single timeout for all transitions like: `timeout={500}`,
   * or individually like:
   *
   * ```jsx
   * timeout={{
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * @type {number | { enter?: number, exit?: number }}
   */
  timeout: function timeout(props) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var pt = _PropTypes.timeoutsShape;
    if (!props.addEndListener) pt = pt.isRequired;
    return pt.apply(undefined, [props].concat(args));
  },

  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. **Note:** Timeouts are still used as a fallback if provided.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: PropTypes.func,

  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occuring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: PropTypes.func,

  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occuring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: PropTypes.func,

  /**
   * Callback fired after the "enter" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occuring on the initial mount
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: PropTypes.func,

  /**
   * Callback fired before the "exiting" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: PropTypes.func,

  /**
   * Callback fired after the "exiting" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: PropTypes.func,

  /**
   * Callback fired after the "exited" status is applied.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: PropTypes.func
} : {};

// Name the function so it is clearer in the documentation
function noop() {}

Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,

  onEnter: noop,
  onEntering: noop,
  onEntered: noop,

  onExit: noop,
  onExiting: noop,
  onExited: noop
};

Transition.UNMOUNTED = 0;
Transition.EXITED = 1;
Transition.ENTERING = 2;
Transition.ENTERED = 3;
Transition.EXITING = 4;

exports.default = Transition;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = createChainableTypeChecker;
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

// Mostly taken from ReactPropTypes.

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;

    if (props[propName] == null) {
      if (isRequired) {
        return new Error('Required ' + location + ' `' + propFullNameSafe + '` was not specified ' + ('in `' + componentNameSafe + '`.'));
      }

      return null;
    }

    for (var _len = arguments.length, args = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
      args[_key - 6] = arguments[_key];
    }

    return validate.apply(undefined, [props, propName, componentNameSafe, location, propFullNameSafe].concat(args));
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

var _widgetHelpers = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  className: _propTypes2.default.string,
  role: _propTypes2.default.string,
  nodeRef: _propTypes2.default.func,
  emptyListMessage: _propTypes2.default.node
};

var Listbox = function (_React$Component) {
  _inherits(Listbox, _React$Component);

  function Listbox() {
    _classCallCheck(this, Listbox);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Listbox.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        role = _props.role,
        children = _props.children,
        emptyListMessage = _props.emptyListMessage,
        nodeRef = _props.nodeRef,
        props = _objectWithoutProperties(_props, ['className', 'role', 'children', 'emptyListMessage', 'nodeRef']);

    var id = (0, _widgetHelpers.instanceId)(this);

    return _react2.default.createElement(
      'ul',
      _extends({
        id: id,
        tabIndex: '-1',
        ref: nodeRef,
        className: (0, _classnames2.default)(className, 'rw-list'),
        role: role === undefined ? 'listbox' : role
      }, props),
      _react2.default.Children.count(children) ? children : _react2.default.createElement(
        'li',
        { className: 'rw-list-empty' },
        emptyListMessage
      )
    );
  };

  return Listbox;
}(_react2.default.Component);

Listbox.propTypes = propTypes;

exports.default = Listbox;
module.exports = exports['default'];

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = __webpack_require__(1);

var PropTypes = _interopRequireWildcard(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Listbox = __webpack_require__(58);

var _Listbox2 = _interopRequireDefault(_Listbox);

var _ListOption = __webpack_require__(42);

var _ListOption2 = _interopRequireDefault(_ListOption);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  searchTerm: PropTypes.string,
  focused: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  activeId: PropTypes.string
};

function AddToListOption(_ref) {
  var searchTerm = _ref.searchTerm,
      onSelect = _ref.onSelect,
      focused = _ref.focused,
      children = _ref.children,
      activeId = _ref.activeId,
      props = _objectWithoutProperties(_ref, ['searchTerm', 'onSelect', 'focused', 'children', 'activeId']);

  return _react2.default.createElement(
    _Listbox2.default,
    _extends({}, props, { className: 'rw-list-option-create' }),
    _react2.default.createElement(
      _ListOption2.default,
      {
        onSelect: onSelect,
        focused: focused,
        activeId: activeId,
        dataItem: searchTerm
      },
      children
    )
  );
}

AddToListOption.propTypes = propTypes;

exports.default = AddToListOption;
module.exports = exports['default'];

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__(11);

var _inDOM2 = _interopRequireDefault(_inDOM);

var _querySelectorAll = __webpack_require__(53);

var _querySelectorAll2 = _interopRequireDefault(_querySelectorAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matches = void 0;
if (_inDOM2.default) {
  (function () {
    var body = document.body;
    var nativeMatch = body.matches || body.matchesSelector || body.webkitMatchesSelector || body.mozMatchesSelector || body.msMatchesSelector;

    matches = nativeMatch ? function (node, selector) {
      return nativeMatch.call(node, selector);
    } : ie8MatchesSelector;
  })();
}

exports.default = matches;


function ie8MatchesSelector(node, selector) {
  var matches = (0, _querySelectorAll2.default)(node.document || node.ownerDocument, selector),
      i = 0;

  while (matches[i] && matches[i] !== node) {
    i++;
  }return !!matches[i];
}
module.exports = exports['default'];

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _VIEW, _OPPOSITE_DIRECTION, _MULTIPLIER, _class, _desc, _value2, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _class3, _temp;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

var _uncontrollable = __webpack_require__(15);

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _reactComponentManagers = __webpack_require__(9);

var _Widget = __webpack_require__(16);

var _Widget2 = _interopRequireDefault(_Widget);

var _Header = __webpack_require__(93);

var _Header2 = _interopRequireDefault(_Header);

var _Footer = __webpack_require__(94);

var _Footer2 = _interopRequireDefault(_Footer);

var _Month = __webpack_require__(95);

var _Month2 = _interopRequireDefault(_Month);

var _Year = __webpack_require__(97);

var _Year2 = _interopRequireDefault(_Year);

var _Decade = __webpack_require__(98);

var _Decade2 = _interopRequireDefault(_Decade);

var _Century = __webpack_require__(99);

var _Century2 = _interopRequireDefault(_Century);

var _messages = __webpack_require__(12);

var _SlideTransitionGroup = __webpack_require__(62);

var _SlideTransitionGroup2 = _interopRequireDefault(_SlideTransitionGroup);

var _focusManager = __webpack_require__(17);

var _focusManager2 = _interopRequireDefault(_focusManager);

var _localizers = __webpack_require__(6);

var _PropTypes = __webpack_require__(3);

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

var _constants = __webpack_require__(35);

var constants = _interopRequireWildcard(_constants);

var _Props = __webpack_require__(4);

var Props = _interopRequireWildcard(_Props);

var _dates = __webpack_require__(14);

var _dates2 = _interopRequireDefault(_dates);

var _withRightToLeft = __webpack_require__(18);

var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);

var _widgetHelpers = __webpack_require__(10);

var _interaction = __webpack_require__(13);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var _constants$directions = constants.directions,
    DOWN = _constants$directions.DOWN,
    UP = _constants$directions.UP,
    LEFT = _constants$directions.LEFT,
    RIGHT = _constants$directions.RIGHT;


var last = function last(a) {
  return a[a.length - 1];
};

var views = constants.calendarViews;
var VIEW_OPTIONS = Object.keys(views).map(function (k) {
  return views[k];
});
var VIEW_UNIT = constants.calendarViewUnits;
var VIEW = (_VIEW = {}, _VIEW[views.MONTH] = _Month2.default, _VIEW[views.YEAR] = _Year2.default, _VIEW[views.DECADE] = _Decade2.default, _VIEW[views.CENTURY] = _Century2.default, _VIEW);

var ARROWS_TO_DIRECTION = {
  ArrowDown: DOWN,
  ArrowUp: UP,
  ArrowRight: RIGHT,
  ArrowLeft: LEFT
};

var OPPOSITE_DIRECTION = (_OPPOSITE_DIRECTION = {}, _OPPOSITE_DIRECTION[LEFT] = RIGHT, _OPPOSITE_DIRECTION[RIGHT] = LEFT, _OPPOSITE_DIRECTION);

var MULTIPLIER = (_MULTIPLIER = {}, _MULTIPLIER[views.YEAR] = 1, _MULTIPLIER[views.DECADE] = 10, _MULTIPLIER[views.CENTURY] = 100, _MULTIPLIER);

var propTypes = {
  /** @ignore */
  activeId: _propTypes2.default.string,
  disabled: CustomPropTypes.disabled,
  readOnly: CustomPropTypes.disabled,

  onChange: _propTypes2.default.func,
  value: _propTypes2.default.instanceOf(Date),

  /**
   * The minimum date that the Calendar can navigate from.
   *
   * @example ['prop', ['min', 'new Date()']]
   */
  min: _propTypes2.default.instanceOf(Date).isRequired,

  /**
   * The maximum date that the Calendar can navigate to.
   *
   * @example ['prop', ['max', 'new Date()']]
   */
  max: _propTypes2.default.instanceOf(Date).isRequired,

  /**
   * Default current date at which the calendar opens. If none is provided, opens at today's date or the `value` date (if any).
   */
  currentDate: _propTypes2.default.instanceOf(Date),

  /**
   * Change event Handler that is called when the currentDate is changed. The handler is called with the currentDate object.
   */
  onCurrentDateChange: _propTypes2.default.func,

  /**
   * Controls the currently displayed calendar view. Use `defaultView` to set a unique starting view.
   *
   * @type {("month"|"year"|"decade"|"century")}
   * @controllable onViewChange
   */
  view: function view(props) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return _propTypes2.default.oneOf(props.views || VIEW_OPTIONS).apply(undefined, [props].concat(args));
  },


  /**
   * Defines a list of views the Calendar can traverse through, starting with the
   * first in the list to the last.
   *
   * @type array<"month"|"year"|"decade"|"century">
   */
  views: _propTypes2.default.arrayOf(_propTypes2.default.oneOf(VIEW_OPTIONS)).isRequired,

  /**
   * A callback fired when the `view` changes.
   *
   * @controllable view
   */
  onViewChange: _propTypes2.default.func,

  /**
   * Callback fired when the Calendar navigates between views, or forward and backwards in time.
   *
   * @type function(date: ?Date, direction: string, view: string)
   */
  onNavigate: _propTypes2.default.func,
  culture: _propTypes2.default.string,
  autoFocus: _propTypes2.default.bool,

  /**
   * Show or hide the Calendar footer.
   *
   * @example ['prop', ['footer', true]]
   */
  footer: _propTypes2.default.bool,

  /**
   * Provide a custom component to render the days of the month. The Component is provided the following props
   *
   * - `date`: a `Date` object for the day of the month to render
   * - `label`: a formatted `string` of the date to render. To adjust the format of the `label` string use the `dateFormat` prop, listed below.
   */
  dayComponent: CustomPropTypes.elementType,

  /**
   * A formatter for the header button of the month view.
   *
   * @example ['dateFormat', ['headerFormat', "{ date: 'medium' }"]]
   */
  headerFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for the Calendar footer, formats today's Date as a string.
   *
   * @example ['dateFormat', ['footerFormat', "{ date: 'medium' }", "date => 'Today is: ' + formatter(date)"]]
   */
  footerFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter calendar days of the week, the default formats each day as a Narrow name: "Mo", "Tu", etc.
   *
   * @example ['prop', { dayFormat: "day => \n['🎉', 'M', 'T','W','Th', 'F', '🎉'][day.getDay()]" }]
   */
  dayFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for day of the month
   *
   * @example ['prop', { dateFormat: "dt => String(dt.getDate())" }]
   */
  dateFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for month name.
   *
   * @example ['dateFormat', ['monthFormat', "{ raw: 'MMMM' }", null, { defaultView: '"year"' }]]
   */
  monthFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for month name.
   *
   * @example ['dateFormat', ['yearFormat', "{ raw: 'yy' }", null, { defaultView: '"decade"' }]]
   */
  yearFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for decade, the default formats the first and last year of the decade like: 2000 - 2009.
   */
  decadeFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for century, the default formats the first and last year of the century like: 1900 - 1999.
   */
  centuryFormat: CustomPropTypes.dateFormat,

  messages: _propTypes2.default.shape({
    moveBack: _propTypes2.default.string,
    moveForward: _propTypes2.default.string
  }),

  onKeyDown: _propTypes2.default.func,

  /** @ignore */
  tabIndex: _propTypes2.default.any

  /**
   * ---
   * localized: true
   * shortcuts:
   *   - { key: ctrl + down arrow, label: navigate to next view }
   *   - { key: ctrl + up arrow, label: navigate to previous view }
   *   - { key: ctrl + left arrow, label:  navigate to previous: month, year, decade, or century }
   *   - { key: ctrl + right arrow, label: navigate to next: month, year, decade, or century }
   *   - { key: left arrow, label:  move focus to previous date}
   *   - { key: right arrow, label: move focus to next date }
   *   - { key: up arrow, label: move focus up within view }
   *   - { key: down key, label: move focus down within view }
   * ---
   *
   * @public
  */
};
var Calendar = (0, _withRightToLeft2.default)(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar() {
    _classCallCheck(this, Calendar);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _this.handleFocusWillChange = function () {
      if (_this.props.tabIndex == -1) return false;
    };

    _initDefineProp(_this, 'handleViewChange', _descriptor, _this);

    _initDefineProp(_this, 'handleMoveBack', _descriptor2, _this);

    _initDefineProp(_this, 'handleMoveForward', _descriptor3, _this);

    _initDefineProp(_this, 'handleChange', _descriptor4, _this);

    _initDefineProp(_this, 'handleFooterClick', _descriptor5, _this);

    _initDefineProp(_this, 'handleKeyDown', _descriptor6, _this);

    _this.messages = (0, _messages.getMessages)(_this.props.messages);

    _this.viewId = (0, _widgetHelpers.instanceId)(_this, '_calendar');
    _this.labelId = (0, _widgetHelpers.instanceId)(_this, '_calendar_label');
    _this.activeId = _this.props.activeId || (0, _widgetHelpers.instanceId)(_this, '_calendar_active_cell');

    (0, _reactComponentManagers.autoFocus)(_this);

    _this.focusManager = (0, _focusManager2.default)(_this, {
      willHandle: _this.handleFocusWillChange
    });

    var _this$props = _this.props,
        view = _this$props.view,
        views = _this$props.views;

    _this.state = {
      selectedIndex: 0,
      view: view || views[0]
    };
    return _this;
  }

  Calendar.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
    var messages = _ref.messages,
        view = _ref.view,
        views = _ref.views,
        value = _ref.value,
        currentDate = _ref.currentDate;

    var val = this.inRangeValue(value);

    this.messages = (0, _messages.getMessages)(messages);

    view = view || views[0];

    this.setState({
      view: view,
      slideDirection: this.getSlideDirection({ view: view, views: views, currentDate: currentDate })
    });

    //if the value changes reset views to the new one
    if (!_dates2.default.eq(val, dateOrNull(this.props.value), VIEW_UNIT[view])) {
      this.setCurrentDate(val, currentDate);
    }
  };

  Calendar.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        value = _props.value,
        footerFormat = _props.footerFormat,
        disabled = _props.disabled,
        readOnly = _props.readOnly,
        footer = _props.footer,
        views = _props.views,
        min = _props.min,
        max = _props.max,
        culture = _props.culture,
        tabIndex = _props.tabIndex;
    var _state = this.state,
        view = _state.view,
        slideDirection = _state.slideDirection,
        focused = _state.focused;

    var currentDate = this.getCurrentDate();

    var View = VIEW[view],
        todaysDate = new Date(),
        todayNotInRange = !_dates2.default.inRange(todaysDate, min, max, view);

    var key = view + '_' + _dates2.default[view](currentDate);

    var elementProps = Props.pickElementProps(this),
        viewProps = Props.pick(this.props, View);

    var isDisabled = disabled || readOnly;

    return _react2.default.createElement(
      _Widget2.default,
      _extends({}, elementProps, {
        role: 'group',
        focused: focused,
        disabled: disabled,
        readOnly: readOnly,
        tabIndex: tabIndex || 0,
        onKeyDown: this.handleKeyDown,
        onBlur: this.focusManager.handleBlur,
        onFocus: this.focusManager.handleFocus,
        className: (0, _classnames2.default)(className, 'rw-calendar rw-widget-container'),
        'aria-activedescendant': this.activeId
      }),
      _react2.default.createElement(_Header2.default, {
        label: this.getHeaderLabel(),
        labelId: this.labelId,
        messages: this.messages,
        upDisabled: isDisabled || view === last(views),
        prevDisabled: isDisabled || !_dates2.default.inRange(this.nextDate(LEFT), min, max, view),
        nextDisabled: isDisabled || !_dates2.default.inRange(this.nextDate(RIGHT), min, max, view),
        onViewChange: this.handleViewChange,
        onMoveLeft: this.handleMoveBack,
        onMoveRight: this.handleMoveForward
      }),
      _react2.default.createElement(
        Calendar.Transition,
        { direction: slideDirection },
        _react2.default.createElement(View, _extends({}, viewProps, {
          key: key,
          id: this.viewId,
          activeId: this.activeId,
          value: value,
          today: todaysDate,
          disabled: disabled,
          focused: currentDate,
          onChange: this.handleChange,
          onKeyDown: this.handleKeyDown,
          'aria-labelledby': this.labelId
        }))
      ),
      footer && _react2.default.createElement(_Footer2.default, {
        value: todaysDate,
        format: footerFormat,
        culture: culture,
        disabled: disabled || todayNotInRange,
        readOnly: readOnly,
        onClick: this.handleFooterClick
      })
    );
  };

  Calendar.prototype.navigate = function navigate(direction, date) {
    var _props2 = this.props,
        views = _props2.views,
        min = _props2.min,
        max = _props2.max,
        onNavigate = _props2.onNavigate,
        onViewChange = _props2.onViewChange;
    var view = this.state.view;


    var slideDir = direction === LEFT || direction === UP ? 'right' : 'left';

    if (direction === UP) view = views[views.indexOf(view) + 1] || view;

    if (direction === DOWN) view = views[views.indexOf(view) - 1] || view;

    if (!date) date = [LEFT, RIGHT].indexOf(direction) !== -1 ? this.nextDate(direction) : this.getCurrentDate();

    if (_dates2.default.inRange(date, min, max, view)) {
      (0, _widgetHelpers.notify)(onNavigate, [date, slideDir, view]);

      this.focus(true);
      this.setCurrentDate(date);
      (0, _widgetHelpers.notify)(onViewChange, [view]);
    }
  };

  Calendar.prototype.focus = function focus() {
    if (+this.props.tabIndex > -1) (0, _reactDom.findDOMNode)(this).focus();
  };

  Calendar.prototype.getCurrentDate = function getCurrentDate() {
    return this.props.currentDate || this.props.value || new Date();
  };

  Calendar.prototype.setCurrentDate = function setCurrentDate(date) {
    var currentDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getCurrentDate();

    var inRangeDate = this.inRangeValue(date ? new Date(date) : currentDate);

    if (_dates2.default.eq(inRangeDate, dateOrNull(currentDate), VIEW_UNIT[this.state.view])) return;

    (0, _widgetHelpers.notify)(this.props.onCurrentDateChange, inRangeDate);
  };

  Calendar.prototype.nextDate = function nextDate(direction) {
    var method = direction === LEFT ? 'subtract' : 'add',
        view = this.state.view,
        unit = view === views.MONTH ? view : views.YEAR,
        multi = MULTIPLIER[view] || 1;

    return _dates2.default[method](this.getCurrentDate(), 1 * multi, unit);
  };

  Calendar.prototype.getHeaderLabel = function getHeaderLabel() {
    var _props3 = this.props,
        culture = _props3.culture,
        decadeFormat = _props3.decadeFormat,
        yearFormat = _props3.yearFormat,
        headerFormat = _props3.headerFormat,
        centuryFormat = _props3.centuryFormat,
        view = this.state.view,
        currentDate = this.getCurrentDate();


    switch (view) {
      case views.MONTH:
        headerFormat = _localizers.date.getFormat('header', headerFormat);
        return _localizers.date.format(currentDate, headerFormat, culture);

      case views.YEAR:
        yearFormat = _localizers.date.getFormat('year', yearFormat);
        return _localizers.date.format(currentDate, yearFormat, culture);

      case views.DECADE:
        decadeFormat = _localizers.date.getFormat('decade', decadeFormat);
        return _localizers.date.format(_dates2.default.startOf(currentDate, 'decade'), decadeFormat, culture);
      case views.CENTURY:
        centuryFormat = _localizers.date.getFormat('century', centuryFormat);
        return _localizers.date.format(_dates2.default.startOf(currentDate, 'century'), centuryFormat, culture);
    }
  };

  Calendar.prototype.inRangeValue = function inRangeValue(_value) {
    var value = dateOrNull(_value);

    if (value === null) return value;

    return _dates2.default.max(_dates2.default.min(value, this.props.max), this.props.min);
  };

  Calendar.prototype.isValidView = function isValidView(next) {
    var views = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.views;

    return views.indexOf(next) !== -1;
  };

  Calendar.prototype.getSlideDirection = function getSlideDirection(_ref2) {
    var view = _ref2.view,
        currentDate = _ref2.currentDate,
        views = _ref2.views;
    var lastDate = this.props.currentDate;
    var _state2 = this.state,
        slideDirection = _state2.slideDirection,
        lastView = _state2.view;


    if (lastView !== view) {
      return views.indexOf(lastView) > views.indexOf(view) ? 'top' : 'bottom';
    }
    if (lastDate !== currentDate) {
      return _dates2.default.gt(currentDate, lastDate) ? 'left' : 'right';
    }

    return slideDirection;
  };

  return Calendar;
}(_react2.default.Component), _class3.displayName = 'Calendar', _class3.propTypes = propTypes, _class3.defaultProps = {
  value: null,
  min: new Date(1900, 0, 1),
  max: new Date(2099, 11, 31),
  views: VIEW_OPTIONS,
  tabIndex: '0',
  footer: true
}, _class3.Transition = _SlideTransitionGroup2.default, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'handleViewChange', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function () {
      _this2.navigate(UP);
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'handleMoveBack', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function () {
      _this3.navigate(LEFT);
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'handleMoveForward', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function () {
      _this4.navigate(RIGHT);
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'handleChange', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (date) {
      var _props4 = _this5.props,
          views = _props4.views,
          onChange = _props4.onChange;
      var view = _this5.state.view;


      if (views[0] === view) {
        _this5.setCurrentDate(date);

        (0, _widgetHelpers.notify)(onChange, date);

        _this5.focus();
        return;
      }

      _this5.navigate(DOWN, date);
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'handleFooterClick', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (date) {
      var _props5 = _this6.props,
          views = _props5.views,
          min = _props5.min,
          max = _props5.max,
          onViewChange = _props5.onViewChange;


      var firstView = views[0];

      (0, _widgetHelpers.notify)(_this6.props.onChange, date);

      if (_dates2.default.inRange(date, min, max, firstView)) {
        _this6.focus();

        _this6.setCurrentDate(date);

        (0, _widgetHelpers.notify)(onViewChange, [firstView]);
      }
    };
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function (e) {
      var ctrl = e.ctrlKey || e.metaKey,
          key = e.key,
          direction = ARROWS_TO_DIRECTION[key],
          currentDate = _this7.getCurrentDate(),
          view = _this7.state.view,
          unit = VIEW_UNIT[view];

      if (key === 'Enter') {
        e.preventDefault();
        return _this7.handleChange(currentDate);
      }

      if (direction) {
        if (ctrl) {
          e.preventDefault();
          _this7.navigate(direction);
        } else {
          if (_this7.isRtl() && OPPOSITE_DIRECTION[direction]) direction = OPPOSITE_DIRECTION[direction];

          var nextDate = _dates2.default.move(currentDate, _this7.props.min, _this7.props.max, view, direction);

          if (!_dates2.default.eq(currentDate, nextDate, unit)) {
            e.preventDefault();

            if (_dates2.default.gt(nextDate, currentDate, view)) _this7.navigate(RIGHT, nextDate);else if (_dates2.default.lt(nextDate, currentDate, view)) _this7.navigate(LEFT, nextDate);else _this7.setCurrentDate(nextDate);
          }
        }
      }

      (0, _widgetHelpers.notify)(_this7.props.onKeyDown, [e]);
    };
  }
})), _class2)) || _class;

function dateOrNull(dt) {
  if (dt && !isNaN(dt.getTime())) return dt;
  return null;
}

exports.default = (0, _uncontrollable2.default)(Calendar, {
  value: 'onChange',
  currentDate: 'onCurrentDateChange',
  view: 'onViewChange'
}, ['focus']);
module.exports = exports['default'];

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _transitionStyle, _transitionClasses, _class, _temp2, _class2, _temp4;

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

var _events = __webpack_require__(49);

var _events2 = _interopRequireDefault(_events);

var _style = __webpack_require__(40);

var _style2 = _interopRequireDefault(_style);

var _height = __webpack_require__(30);

var _height2 = _interopRequireDefault(_height);

var _properties = __webpack_require__(41);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TransitionGroup = __webpack_require__(100);

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _Transition = __webpack_require__(56);

var _Transition2 = _interopRequireDefault(_Transition);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _Props = __webpack_require__(4);

var Props = _interopRequireWildcard(_Props);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DirectionPropType = _propTypes2.default.oneOf(['left', 'right', 'top', 'bottom']);

var transitionStyle = (_transitionStyle = {}, _transitionStyle[_Transition.ENTERING] = { position: 'absolute' }, _transitionStyle[_Transition.EXITING] = { position: 'absolute' }, _transitionStyle);

var transitionClasses = (_transitionClasses = {}, _transitionClasses[_Transition.ENTERED] = 'rw-calendar-transition-entered', _transitionClasses[_Transition.ENTERING] = 'rw-calendar-transition-entering', _transitionClasses[_Transition.EXITING] = 'rw-calendar-transition-exiting', _transitionClasses[_Transition.EXITED] = 'rw-calendar-transition-exited', _transitionClasses);

function parseDuration(node) {
  var str = (0, _style2.default)(node, _properties.transitionDuration);
  var mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}
var SlideTransition = (_temp2 = _class = function (_React$Component) {
  _inherits(SlideTransition, _React$Component);

  function SlideTransition() {
    var _temp, _this, _ret;

    _classCallCheck(this, SlideTransition);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleTransitionEnd = function (node, done) {
      var duration = parseDuration(node) || 300;

      var handler = function handler() {
        _events2.default.off(node, _properties.transitionEnd, handler, false);
        done();
      };

      setTimeout(handler, duration * 1.5);
      _events2.default.on(node, _properties.transitionEnd, handler, false);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  SlideTransition.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        props = _objectWithoutProperties(_props, ['children']);

    var direction = this.context.direction;

    var child = _react2.default.Children.only(children);

    return _react2.default.createElement(
      _Transition2.default,
      _extends({}, props, {
        timeout: 5000,
        addEndListener: this.handleTransitionEnd
      }),
      function (status, innerProps) {
        return _react2.default.cloneElement(child, _extends({}, innerProps, {
          style: transitionStyle[status],
          className: (0, _classnames2.default)(child.props.className, 'rw-calendar-transition', 'rw-calendar-transition-' + direction, transitionClasses[status])
        }));
      }
    );
  };

  return SlideTransition;
}(_react2.default.Component), _class.contextTypes = {
  direction: DirectionPropType
}, _temp2);
var SlideTransitionGroup = (_temp4 = _class2 = function (_React$Component2) {
  _inherits(SlideTransitionGroup, _React$Component2);

  function SlideTransitionGroup() {
    var _temp3, _this2, _ret2;

    _classCallCheck(this, SlideTransitionGroup);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp3 = (_this2 = _possibleConstructorReturn(this, _React$Component2.call.apply(_React$Component2, [this].concat(args))), _this2), _this2.handleEnter = function (child) {
      var node = (0, _reactDom.findDOMNode)(_this2);

      if (!child) return;
      var height = (0, _height2.default)(child) + 'px';

      (0, _style2.default)(node, {
        height: height,
        overflow: 'hidden'
      });
    }, _this2.handleExited = function () {
      var node = (0, _reactDom.findDOMNode)(_this2);
      (0, _style2.default)(node, { overflow: '', height: '' });
    }, _temp3), _possibleConstructorReturn(_this2, _ret2);
  }

  SlideTransitionGroup.prototype.getChildContext = function getChildContext() {
    return { direction: this.props.direction };
  };

  SlideTransitionGroup.prototype.render = function render() {
    var _props2 = this.props,
        children = _props2.children,
        direction = _props2.direction;


    return _react2.default.createElement(
      _TransitionGroup2.default,
      _extends({}, Props.omitOwn(this), {
        component: 'div',
        className: 'rw-calendar-transition-group'
      }),
      _react2.default.createElement(
        SlideTransition,
        {
          key: children.key,
          direction: direction,
          onEnter: this.handleEnter,
          onExited: this.handleExited
        },
        children
      )
    );
  };

  return SlideTransitionGroup;
}(_react2.default.Component), _class2.propTypes = {
  direction: DirectionPropType
}, _class2.defaultProps = {
  direction: 'left'
}, _class2.childContextTypes = {
  direction: DirectionPropType
}, _temp4);
exports.default = SlideTransitionGroup;
module.exports = exports['default'];

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* eslint-disable global-require */
var configure = __webpack_require__(64);

module.exports = _extends({}, configure, {
  DropdownList: __webpack_require__(69).default,
  Combobox: __webpack_require__(91).default,
  Calendar: __webpack_require__(61).default,
  DatePicker: __webpack_require__(102).default,
  TimePicker: __webpack_require__(107).default,
  DateTimePicker: __webpack_require__(44).default,
  NumberPicker: __webpack_require__(108).default,
  Multiselect: __webpack_require__(110).default,
  SelectList: __webpack_require__(115).default,

  utils: {
    SlideTransitionGroup: __webpack_require__(62).default,
    SlideDownTransition: __webpack_require__(48).default
  }
});

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _localizers = __webpack_require__(6);

var localizers = _interopRequireWildcard(_localizers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  setLocalizers: function setLocalizers(_ref) {
    var date = _ref.date,
        number = _ref.number;

    date && this.setDateLocalizer(date);
    number && this.setNumberLocalizer(number);
  },


  setDateLocalizer: localizers.setDate,
  setNumberLocalizer: localizers.setNumber
};
module.exports = exports['default'];

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (process.env.NODE_ENV !== 'production') {
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

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(36);
var invariant = __webpack_require__(37);
var warning = __webpack_require__(45);

var ReactPropTypesSecret = __webpack_require__(38);
var checkPropTypes = __webpack_require__(67);

module.exports = function(isValidElement, throwOnDirectAccess) {
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
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
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
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
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
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
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
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
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
        if (propValue.hasOwnProperty(key)) {
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
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
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
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(37);
  var warning = __webpack_require__(45);
  var ReactPropTypesSecret = __webpack_require__(38);
  var loggedTypeFailures = {};
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
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(36);
var invariant = __webpack_require__(37);
var ReactPropTypesSecret = __webpack_require__(38);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
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
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _activeElement = __webpack_require__(27);

var _activeElement2 = _interopRequireDefault(_activeElement);

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

var _reactComponentManagers = __webpack_require__(9);

var _uncontrollable = __webpack_require__(15);

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _Widget = __webpack_require__(16);

var _Widget2 = _interopRequireDefault(_Widget);

var _WidgetPicker = __webpack_require__(21);

var _WidgetPicker2 = _interopRequireDefault(_WidgetPicker);

var _Select = __webpack_require__(22);

var _Select2 = _interopRequireDefault(_Select);

var _Popup = __webpack_require__(29);

var _Popup2 = _interopRequireDefault(_Popup);

var _List = __webpack_require__(23);

var _List2 = _interopRequireDefault(_List);

var _AddToListOption = __webpack_require__(59);

var _AddToListOption2 = _interopRequireDefault(_AddToListOption);

var _DropdownListInput = __webpack_require__(86);

var _DropdownListInput2 = _interopRequireDefault(_DropdownListInput);

var _messages = __webpack_require__(12);

var _Props = __webpack_require__(4);

var Props = _interopRequireWildcard(_Props);

var _Filter = __webpack_require__(32);

var Filter = _interopRequireWildcard(_Filter);

var _focusManager = __webpack_require__(17);

var _focusManager2 = _interopRequireDefault(_focusManager);

var _listDataManager = __webpack_require__(20);

var _listDataManager2 = _interopRequireDefault(_listDataManager);

var _PropTypes = __webpack_require__(3);

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

var _accessorManager = __webpack_require__(24);

var _accessorManager2 = _interopRequireDefault(_accessorManager);

var _scrollManager = __webpack_require__(25);

var _scrollManager2 = _interopRequireDefault(_scrollManager);

var _withRightToLeft = __webpack_require__(18);

var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);

var _interaction = __webpack_require__(13);

var _widgetHelpers = __webpack_require__(10);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var CREATE_OPTION = {};

/**
 * ---
 * shortcuts:
 *   - { key: alt + down arrow, label: open dropdown }
 *   - { key: alt + up arrow, label: close dropdown }
 *   - { key: down arrow, label: move focus to next item }
 *   - { key: up arrow, label: move focus to previous item }
 *   - { key: home, label: move focus to first item }
 *   - { key: end, label: move focus to last item }
 *   - { key: enter, label: select focused item }
 *   - { key: ctrl + enter, label: create new option from current searchTerm }
 *   - { key: any key, label: search list for item starting with key }
 * ---
 *
 * A `<select>` replacement for single value lists.

 * @public
 */

var DropdownList = (0, _withRightToLeft2.default)(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
  _inherits(DropdownList, _React$Component);

  function DropdownList() {
    _classCallCheck(this, DropdownList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _this.handleFocusChanged = function (focused) {
      if (!focused) _this.close();
    };

    _initDefineProp(_this, 'handleSelect', _descriptor, _this);

    _initDefineProp(_this, 'handleCreate', _descriptor2, _this);

    _initDefineProp(_this, 'handleClick', _descriptor3, _this);

    _initDefineProp(_this, 'handleKeyDown', _descriptor4, _this);

    _initDefineProp(_this, 'handleKeyPress', _descriptor5, _this);

    _this.handleInputChange = function (e) {
      _this.search(e.target.value, e, 'input');
    };

    _this.focus = function (target) {
      var _this$props = _this.props,
          filter = _this$props.filter,
          open = _this$props.open;

      var inst = target || (filter && open ? _this.refs.filter : _this.refs.input);

      inst = (0, _reactDom.findDOMNode)(inst);

      if (inst && (0, _activeElement2.default)() !== inst) inst.focus();
    };

    (0, _reactComponentManagers.autoFocus)(_this);
    _this.messages = (0, _messages.getMessages)(_this.props.messages);

    _this.inputId = (0, _widgetHelpers.instanceId)(_this, '_input');
    _this.listId = (0, _widgetHelpers.instanceId)(_this, '_listbox');
    _this.activeId = (0, _widgetHelpers.instanceId)(_this, '_listbox_active_option');

    _this.list = (0, _listDataManager2.default)(_this);
    _this.mounted = (0, _reactComponentManagers.mountManager)(_this);
    _this.timeouts = (0, _reactComponentManagers.timeoutManager)(_this);
    _this.accessors = (0, _accessorManager2.default)(_this);
    _this.handleScroll = (0, _scrollManager2.default)(_this);
    _this.focusManager = (0, _focusManager2.default)(_this, {
      didHandle: _this.handleFocusChanged
    });

    _this.state = _this.getStateFromProps(_this.props);
    return _this;
  }

  DropdownList.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.messages = (0, _messages.getMessages)(nextProps.messages);
    this.setState(this.getStateFromProps(nextProps));
  };

  DropdownList.prototype.getStateFromProps = function getStateFromProps(props) {
    var open = props.open,
        value = props.value,
        data = props.data,
        searchTerm = props.searchTerm,
        filter = props.filter,
        minLength = props.minLength,
        caseSensitive = props.caseSensitive;
    var accessors = this.accessors,
        list = this.list;

    var initialIdx = accessors.indexOf(data, value);

    if (open) data = Filter.filter(data, {
      filter: filter,
      searchTerm: searchTerm,
      minLength: minLength,
      caseSensitive: caseSensitive,
      textField: this.accessors.text
    });

    list.setData(data);

    var selectedItem = data[initialIdx];

    return {
      data: data,
      selectedItem: list.nextEnabled(selectedItem),
      focusedItem: list.nextEnabled(selectedItem || data[0])
    };
  };

  DropdownList.prototype.change = function change(nextValue, originalEvent) {
    var _props = this.props,
        onChange = _props.onChange,
        searchTerm = _props.searchTerm,
        lastValue = _props.value;


    if (!this.accessors.matches(nextValue, lastValue)) {
      (0, _widgetHelpers.notify)(onChange, [nextValue, {
        originalEvent: originalEvent,
        lastValue: lastValue,
        searchTerm: searchTerm
      }]);

      this.clearSearch(originalEvent);
      this.close();
    }
  };

  DropdownList.prototype.renderList = function renderList(messages) {
    var _props2 = this.props,
        open = _props2.open,
        filter = _props2.filter,
        data = _props2.data,
        searchTerm = _props2.searchTerm;
    var _state = this.state,
        selectedItem = _state.selectedItem,
        focusedItem = _state.focusedItem;
    var _accessors = this.accessors,
        value = _accessors.value,
        text = _accessors.text;


    var List = this.props.listComponent;
    var props = this.list.defaultProps();

    return _react2.default.createElement(
      'div',
      null,
      filter && _react2.default.createElement(
        _WidgetPicker2.default,
        {
          ref: 'filterWrapper',
          className: 'rw-filter-input rw-input'
        },
        _react2.default.createElement('input', {
          ref: 'filter',
          value: searchTerm,
          className: 'rw-input-reset',
          onChange: this.handleInputChange,
          placeholder: messages.filterPlaceholder(this.props)
        }),
        _react2.default.createElement(_Select2.default, { icon: 'search', role: 'presentation', 'aria-hidden': 'true' })
      ),
      _react2.default.createElement(List, _extends({}, props, {
        ref: 'list',
        id: this.listId,
        activeId: this.activeId,
        valueAccessor: value,
        textAccessor: text,
        selectedItem: selectedItem,
        focusedItem: open ? focusedItem : null,
        onSelect: this.handleSelect,
        onMove: this.handleScroll,
        'aria-live': open && 'polite',
        'aria-labelledby': this.inputId,
        'aria-hidden': !this.props.open,
        messages: {
          emptyList: data.length ? messages.emptyFilter : messages.emptyList
        }
      })),
      this.allowCreate() && _react2.default.createElement(
        _AddToListOption2.default,
        {
          id: this.createId,
          searchTerm: searchTerm,
          onSelect: this.handleCreate,
          focused: !focusedItem || focusedItem === CREATE_OPTION
        },
        messages.createOption(this.props)
      )
    );
  };

  DropdownList.prototype.render = function render() {
    var _this2 = this;

    var _props3 = this.props,
        className = _props3.className,
        tabIndex = _props3.tabIndex,
        popupTransition = _props3.popupTransition,
        textField = _props3.textField,
        data = _props3.data,
        busy = _props3.busy,
        dropUp = _props3.dropUp,
        placeholder = _props3.placeholder,
        value = _props3.value,
        open = _props3.open,
        filter = _props3.filter,
        inputProps = _props3.inputProps,
        valueComponent = _props3.valueComponent;
    var focused = this.state.focused;


    var disabled = this.props.disabled === true,
        readOnly = this.props.readOnly === true,
        valueItem = this.accessors.findOrSelf(data, value);

    var shouldRenderPopup = open || (0, _widgetHelpers.isFirstFocusedRender)(this);

    var elementProps = _extends(Props.pickElementProps(this), {
      name: undefined,
      role: 'combobox',
      id: this.inputId,
      tabIndex: open && filter ? -1 : tabIndex || 0,
      'aria-owns': this.listId,
      'aria-activedescendant': open ? this.activeId : null,
      'aria-expanded': !!open,
      'aria-haspopup': true,
      'aria-busy': !!busy,
      'aria-live': !open && 'polite',
      'aria-autocomplete': 'list',
      'aria-disabled': disabled,
      'aria-readonly': readOnly
    });

    var messages = this.messages;

    return _react2.default.createElement(
      _Widget2.default,
      _extends({}, elementProps, {
        ref: 'input',
        open: open,
        dropUp: dropUp,
        focused: focused,
        disabled: disabled,
        readOnly: readOnly,
        onBlur: this.focusManager.handleBlur,
        onFocus: this.focusManager.handleFocus,
        onKeyDown: this.handleKeyDown,
        onKeyPress: this.handleKeyPress,
        className: (0, _classnames2.default)(className, 'rw-dropdown-list')
      }),
      _react2.default.createElement(
        _WidgetPicker2.default,
        { onClick: this.handleClick, className: 'rw-widget-input' },
        _react2.default.createElement(_DropdownListInput2.default, _extends({}, inputProps, {
          value: valueItem,
          textField: textField,
          placeholder: placeholder,
          valueComponent: valueComponent
        })),
        _react2.default.createElement(_Select2.default, {
          busy: busy,
          icon: 'caret-down',
          role: 'presentational',
          'aria-hidden': 'true',
          disabled: disabled || readOnly,
          label: messages.openDropdown(this.props)
        })
      ),
      shouldRenderPopup && _react2.default.createElement(
        _Popup2.default,
        {
          open: open,
          dropUp: dropUp,
          transition: popupTransition,
          onEntered: function onEntered() {
            return _this2.focus();
          },
          onEntering: function onEntering() {
            return _this2.refs.list.forceUpdate();
          }
        },
        this.renderList(messages)
      )
    );
  };

  DropdownList.prototype.findOption = function findOption(character, cb) {
    var _this3 = this;

    var word = ((this._currentWord || '') + character).toLowerCase();

    if (!character) return;

    this._currentWord = word;

    this.timeouts.set('search', function () {
      var list = _this3.list,
          key = _this3.props.open ? 'focusedItem' : 'selectedItem',
          item = list.next(_this3.state[key], word);

      _this3._currentWord = '';
      if (item) cb(item);
    }, this.props.delay);
  };

  DropdownList.prototype.clearSearch = function clearSearch(originalEvent) {
    this.search('', originalEvent, 'clear');
  };

  DropdownList.prototype.search = function search(searchTerm, originalEvent) {
    var action = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'input';
    var _props4 = this.props,
        onSearch = _props4.onSearch,
        lastSearchTerm = _props4.searchTerm;


    if (searchTerm !== lastSearchTerm) (0, _widgetHelpers.notify)(onSearch, [searchTerm, {
      action: action,
      lastSearchTerm: lastSearchTerm,
      originalEvent: originalEvent
    }]);
  };

  DropdownList.prototype.open = function open() {
    if (!this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, true);
  };

  DropdownList.prototype.close = function close() {
    if (this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, false);
  };

  DropdownList.prototype.toggle = function toggle() {
    this.props.open ? this.close() : this.open();
  };

  DropdownList.prototype.allowCreate = function allowCreate() {
    var _props5 = this.props,
        searchTerm = _props5.searchTerm,
        onCreate = _props5.onCreate,
        allowCreate = _props5.allowCreate;


    return !!(onCreate && (allowCreate === true || allowCreate === 'onFilter' && searchTerm) && !this.hasExtactMatch());
  };

  DropdownList.prototype.hasExtactMatch = function hasExtactMatch() {
    var _props6 = this.props,
        searchTerm = _props6.searchTerm,
        caseSensitive = _props6.caseSensitive,
        filter = _props6.filter;
    var data = this.state.data;
    var text = this.accessors.text;

    var lower = function lower(text) {
      return caseSensitive ? text : text.toLowerCase();
    };

    // if there is an exact match on textFields:
    return filter && data.some(function (v) {
      return lower(text(v)) === lower(searchTerm);
    });
  };

  return DropdownList;
}(_react2.default.Component), _class3.propTypes = _extends({}, Filter.propTypes, {

  value: _propTypes2.default.any,
  /**
  * @type {function (
  *  dataItems: ?any,
  *  metadata: {
  *    lastValue: ?any,
  *    searchTerm: ?string
  *    originalEvent: SyntheticEvent,
  *  }
  * ): void}
  */
  onChange: _propTypes2.default.func,
  open: _propTypes2.default.bool,
  onToggle: _propTypes2.default.func,

  data: _propTypes2.default.array,
  valueField: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  allowCreate: _propTypes2.default.oneOf([true, false, 'onFilter']),

  /**
   * A React component for customizing the rendering of the DropdownList
   * value
   */
  valueComponent: CustomPropTypes.elementType,
  itemComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,

  groupComponent: CustomPropTypes.elementType,
  groupBy: CustomPropTypes.accessor,

  /**
   *
   * @type {(dataItem: ?any, metadata: { originalEvent: SyntheticEvent }) => void}
   */
  onSelect: _propTypes2.default.func,

  onCreate: _propTypes2.default.func,

  /**
   * @type function(searchTerm: string, metadata: { action, lastSearchTerm, originalEvent? })
   */
  onSearch: _propTypes2.default.func,

  searchTerm: _propTypes2.default.string,
  busy: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,

  dropUp: _propTypes2.default.bool,
  popupTransition: CustomPropTypes.elementType,

  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,

  inputProps: _propTypes2.default.object,
  listProps: _propTypes2.default.object,

  messages: _propTypes2.default.shape({
    open: _propTypes2.default.string,
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message,
    filterPlaceholder: _propTypes2.default.string,
    createOption: CustomPropTypes.message
  })
}), _class3.defaultProps = {
  data: [],
  delay: 500,
  searchTerm: '',
  allowCreate: false,
  listComponent: _List2.default
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'handleSelect', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (dataItem, originalEvent) {
      if (dataItem === undefined || dataItem === CREATE_OPTION) {
        _this4.handleCreate(_this4.props.searchTerm);
        return;
      }

      (0, _widgetHelpers.notify)(_this4.props.onSelect, [dataItem, { originalEvent: originalEvent }]);

      _this4.change(dataItem, originalEvent);
      _this4.close();
      _this4.focus(_this4);
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'handleCreate', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function () {
      var searchTerm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var event = arguments[1];

      (0, _widgetHelpers.notify)(_this5.props.onCreate, searchTerm);

      _this5.clearSearch(event);
      _this5.close();
      _this5.focus(_this5);
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'handleClick', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (e) {
      _this6.focus();
      _this6.toggle();
      (0, _widgetHelpers.notify)(_this6.props.onClick, e);
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function (e) {
      var key = e.key,
          altKey = e.altKey,
          ctrlKey = e.ctrlKey;
      var list = _this7.list;
      var _props7 = _this7.props,
          open = _props7.open,
          onKeyDown = _props7.onKeyDown,
          filter = _props7.filter,
          searchTerm = _props7.searchTerm;
      var _state2 = _this7.state,
          focusedItem = _state2.focusedItem,
          selectedItem = _state2.selectedItem;


      var createIsFocused = focusedItem === CREATE_OPTION;
      var canCreate = _this7.allowCreate();

      (0, _widgetHelpers.notify)(onKeyDown, [e]);

      var closeWithFocus = function closeWithFocus() {
        _this7.close();
        (0, _reactDom.findDOMNode)(_this7).focus();
      };

      var change = function change(item) {
        return item != null && _this7.change(item, e);
      };
      var focusItem = function focusItem(item) {
        return _this7.setState({ focusedItem: item });
      };

      if (e.defaultPrevented) return;

      if (key === 'End') {
        e.preventDefault();

        if (open) focusItem(list.last());else change(list.last());
      } else if (key === 'Home') {
        e.preventDefault();

        if (open) focusItem(list.first());else change(list.first());
      } else if (key === 'Escape' && open) {
        e.preventDefault();
        closeWithFocus();
      } else if (key === 'Enter' && open && ctrlKey && canCreate) {
        e.preventDefault();
        _this7.handleCreate(searchTerm, e);
      } else if ((key === 'Enter' || key === ' ' && !filter) && open) {
        e.preventDefault();
        _this7.handleSelect(focusedItem, e);
      } else if (key === ' ' && !open) {
        e.preventDefault();
        _this7.open();
      } else if (key === 'ArrowDown') {
        e.preventDefault();

        if (altKey) return _this7.open();
        if (!open) change(list.next(selectedItem));

        var next = list.next(focusedItem);
        var creating = createIsFocused || canCreate && focusedItem === next;

        focusItem(creating ? CREATE_OPTION : next);
      } else if (key === 'ArrowUp') {
        e.preventDefault();

        if (altKey) return closeWithFocus();
        if (!open) return change(list.prev(selectedItem));

        focusItem(createIsFocused ? list.last() : list.prev(focusedItem));
      }
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyPress', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this8 = this;

    return function (e) {
      (0, _widgetHelpers.notify)(_this8.props.onKeyPress, [e]);
      if (e.defaultPrevented) return;

      if (!(_this8.props.filter && _this8.props.open)) _this8.findOption(String.fromCharCode(e.which), function (item) {
        _this8.mounted() && _this8.props.open ? _this8.setState({ focusedItem: item }) : item && _this8.change(item, e);
      });
    };
  }
})), _class2)) || _class;

exports.default = (0, _uncontrollable2.default)(DropdownList, {
  open: 'onToggle',
  value: 'onChange',
  searchTerm: 'onSearch'
}, ['focus']);
module.exports = exports['default'];

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.PropTypes = undefined;
exports.default = makeAutoFocusable;

var _propTypes = __webpack_require__(1);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _spyOnComponent = __webpack_require__(28);

var _spyOnComponent2 = _interopRequireDefault(_spyOnComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypes = exports.PropTypes = {
  autoFocus: _propTypes.bool
};

function makeAutoFocusable(instance) {
  (0, _spyOnComponent2.default)(instance, {
    componentDidMount: function componentDidMount() {
      var autoFocus = this.props.autoFocus;


      if (autoFocus) this.focus ? this.focus() : (0, _reactDom.findDOMNode)(this).focus();
    }
  });
}

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.callFocusEventHandler = callFocusEventHandler;
exports.default = createFocusManager;

var _reactDom = __webpack_require__(5);

var _timeoutManager = __webpack_require__(47);

var _timeoutManager2 = _interopRequireDefault(_timeoutManager);

var _mountManager = __webpack_require__(39);

var _mountManager2 = _interopRequireDefault(_mountManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function callFocusEventHandler(inst, focused, e) {
  var handler = inst.props[focused ? 'onFocus' : 'onBlur'];
  handler && handler(e);
}

function createFocusManager(instance, _ref) {
  var willHandle = _ref.willHandle,
      didHandle = _ref.didHandle,
      onChange = _ref.onChange,
      _ref$isDisabled = _ref.isDisabled,
      isDisabled = _ref$isDisabled === undefined ? function () {
    return !!instance.props.disabled;
  } : _ref$isDisabled;

  var lastFocused = void 0;
  var timeouts = (0, _timeoutManager2.default)(instance);
  var isMounted = (0, _mountManager2.default)(instance);

  function _handleFocus(focused, event) {
    if (event && event.persist) event.persist();

    if (willHandle && willHandle(focused, event) === false) return;

    timeouts.set('focus', function () {
      (0, _reactDom.unstable_batchedUpdates)(function () {
        if (focused !== lastFocused) {
          if (didHandle) didHandle.call(instance, focused, event);

          // only fire a change when unmounted if its a blur
          if (isMounted() || !focused) {
            lastFocused = focused;
            onChange && onChange(focused, event);
          }
        }
      });
    });
  }

  return {
    handleBlur: function handleBlur(event) {
      if (!isDisabled()) _handleFocus(false, event);
    },
    handleFocus: function handleFocus(event) {
      if (!isDisabled()) _handleFocus(true, event);
    }
  };
}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.mixin = mixin;
exports.default = mixIntoClass;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function mixin(componentClass, _ref) {
  var propTypes = _ref.propTypes,
      contextTypes = _ref.contextTypes,
      childContextTypes = _ref.childContextTypes,
      getChildContext = _ref.getChildContext,
      protoSpec = _objectWithoutProperties(_ref, ["propTypes", "contextTypes", "childContextTypes", "getChildContext"]);

  if (propTypes) componentClass.propTypes = _extends({}, componentClass.propTypes, propTypes);

  if (contextTypes) componentClass.contextTypes = _extends({}, componentClass.contextTypes, contextTypes);

  if (childContextTypes) componentClass.childContextTypes = _extends({}, componentClass.childContextTypes, childContextTypes);

  if (getChildContext) {
    var baseGCContext = componentClass.prototype.getChildContext;

    componentClass.prototype.getChildContext = function $getChildContext() {
      return _extends({}, baseGCContext && baseGCContext.call(this), getChildContext.call(this));
    };
  }

  _extends(componentClass.prototype, protoSpec);

  return componentClass;
}

function mixIntoClass(spec) {
  return function (componentClass) {
    return mixin(componentClass, spec);
  };
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createUncontrollable;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _invariant = __webpack_require__(26);

var _invariant2 = _interopRequireDefault(_invariant);

var _utils = __webpack_require__(74);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createUncontrollable(mixin, set) {

  return uncontrollable;

  function uncontrollable(Component, controlledValues) {
    var _class, _temp;

    var methods = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var displayName = Component.displayName || Component.name || 'Component',
        basePropTypes = utils.getType(Component).propTypes,
        isCompositeComponent = utils.isReactComponent(Component),
        controlledProps = Object.keys(controlledValues),
        propTypes;

    var OMIT_PROPS = ['valueLink', 'checkedLink'].concat(controlledProps.map(utils.defaultKey));

    propTypes = utils.uncontrolledPropTypes(controlledValues, basePropTypes, displayName);

    (0, _invariant2.default)(isCompositeComponent || !methods.length, '[uncontrollable] stateless function components cannot pass through methods ' + 'because they have no associated instances. Check component: ' + displayName + ', ' + 'attempting to pass through methods: ' + methods.join(', '));

    methods = utils.transform(methods, function (obj, method) {
      obj[method] = function () {
        var _refs$inner;

        return (_refs$inner = this.refs.inner)[method].apply(_refs$inner, arguments);
      };
    }, {});

    var component = (_temp = _class = function (_React$Component) {
      _inherits(component, _React$Component);

      function component() {
        _classCallCheck(this, component);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
      }

      component.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return !mixin.shouldComponentUpdate || mixin.shouldComponentUpdate.apply(this, args);
      };

      component.prototype.componentWillMount = function componentWillMount() {
        var _this2 = this;

        var props = this.props;

        this._values = {};

        controlledProps.forEach(function (key) {
          _this2._values[key] = props[utils.defaultKey(key)];
        });
      };

      /**
       * If a prop switches from controlled to Uncontrolled
       * reset its value to the defaultValue
       */


      component.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var _this3 = this;

        var props = this.props;

        if (mixin.componentWillReceiveProps) {
          mixin.componentWillReceiveProps.call(this, nextProps);
        }

        controlledProps.forEach(function (key) {
          if (utils.getValue(nextProps, key) === undefined && utils.getValue(props, key) !== undefined) {
            _this3._values[key] = nextProps[utils.defaultKey(key)];
          }
        });
      };

      component.prototype.componentWillUnmount = function componentWillUnmount() {
        this.unmounted = true;
      };

      component.prototype.getControlledInstance = function getControlledInstance() {
        return this.refs.inner;
      };

      component.prototype.render = function render() {
        var _this4 = this;

        var newProps = {},
            props = omitProps(this.props);

        utils.each(controlledValues, function (handle, propName) {
          var linkPropName = utils.getLinkName(propName),
              prop = _this4.props[propName];

          if (linkPropName && !isProp(_this4.props, propName) && isProp(_this4.props, linkPropName)) {
            prop = _this4.props[linkPropName].value;
          }

          newProps[propName] = prop !== undefined ? prop : _this4._values[propName];

          newProps[handle] = setAndNotify.bind(_this4, propName);
        });

        newProps = _extends({}, props, newProps, {
          ref: isCompositeComponent ? 'inner' : null
        });

        return _react2.default.createElement(Component, newProps);
      };

      return component;
    }(_react2.default.Component), _class.displayName = 'Uncontrolled(' + displayName + ')', _class.propTypes = propTypes, _temp);

    _extends(component.prototype, methods);

    component.ControlledComponent = Component;

    /**
     * useful when wrapping a Component and you want to control
     * everything
     */
    component.deferControlTo = function (newComponent) {
      var additions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var nextMethods = arguments[2];

      return uncontrollable(newComponent, _extends({}, controlledValues, additions), nextMethods);
    };

    return component;

    function setAndNotify(propName, value) {
      var linkName = utils.getLinkName(propName),
          handler = this.props[controlledValues[propName]];

      if (linkName && isProp(this.props, linkName) && !handler) {
        handler = this.props[linkName].requestChange;
      }

      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      set(this, propName, handler, value, args);
    }

    function isProp(props, prop) {
      return props[prop] !== undefined;
    }

    function omitProps(props) {
      var result = {};

      utils.each(props, function (value, key) {
        if (OMIT_PROPS.indexOf(key) === -1) result[key] = value;
      });

      return result;
    }
  }
}
module.exports = exports['default'];

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;
exports.version = undefined;
exports.uncontrolledPropTypes = uncontrolledPropTypes;
exports.getType = getType;
exports.getValue = getValue;
exports.getLinkName = getLinkName;
exports.defaultKey = defaultKey;
exports.chain = chain;
exports.transform = transform;
exports.each = each;
exports.has = has;
exports.isReactComponent = isReactComponent;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _invariant = __webpack_require__(26);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readOnlyPropType(handler, name) {
  return function (props, propName) {
    if (props[propName] !== undefined) {
      if (!props[handler]) {
        return new Error('You have provided a `' + propName + '` prop to ' + '`' + name + '` without an `' + handler + '` handler. This will render a read-only field. ' + 'If the field should be mutable use `' + defaultKey(propName) + '`. Otherwise, set `' + handler + '`');
      }
    }
  };
}

function uncontrolledPropTypes(controlledValues, basePropTypes, displayName) {
  var propTypes = {};

  if (process.env.NODE_ENV !== 'production' && basePropTypes) {
    transform(controlledValues, function (obj, handler, prop) {
      (0, _invariant2.default)(typeof handler === 'string' && handler.trim().length, 'Uncontrollable - [%s]: the prop `%s` needs a valid handler key name in order to make it uncontrollable', displayName, prop);

      obj[prop] = readOnlyPropType(handler, displayName);
    }, propTypes);
  }

  return propTypes;
}

var version = exports.version = _react2.default.version.split('.').map(parseFloat);

function getType(component) {
  if (version[0] >= 15 || version[0] === 0 && version[1] >= 13) return component;

  return component.type;
}

function getValue(props, name) {
  var linkPropName = getLinkName(name);

  if (linkPropName && !isProp(props, name) && isProp(props, linkPropName)) return props[linkPropName].value;

  return props[name];
}

function isProp(props, prop) {
  return props[prop] !== undefined;
}

function getLinkName(name) {
  return name === 'value' ? 'valueLink' : name === 'checked' ? 'checkedLink' : null;
}

function defaultKey(key) {
  return 'default' + key.charAt(0).toUpperCase() + key.substr(1);
}

function chain(thisArg, a, b) {
  return function chainedFunction() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    a && a.call.apply(a, [thisArg].concat(args));
    b && b.call.apply(b, [thisArg].concat(args));
  };
}

function transform(obj, cb, seed) {
  each(obj, cb.bind(null, seed = seed || (Array.isArray(obj) ? [] : {})));
  return seed;
}

function each(obj, cb, thisArg) {
  if (Array.isArray(obj)) return obj.forEach(cb, thisArg);

  for (var key in obj) {
    if (has(obj, key)) cb.call(thisArg, obj[key], key, obj);
  }
}

function has(o, k) {
  return o ? Object.prototype.hasOwnProperty.call(o, k) : false;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
function isReactComponent(component) {
  return !!(component && component.prototype && component.prototype.isReactComponent);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filterEvents;

var _contains = __webpack_require__(52);

var _contains2 = _interopRequireDefault(_contains);

var _querySelectorAll = __webpack_require__(53);

var _querySelectorAll2 = _interopRequireDefault(_querySelectorAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterEvents(selector, handler) {
  return function filterHandler(e) {
    var top = e.currentTarget,
        target = e.target,
        matches = (0, _querySelectorAll2.default)(top, selector);

    if (matches.some(function (match) {
      return (0, _contains2.default)(match, target);
    })) handler.call(this, e);
  };
}
module.exports = exports['default'];

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__(11);

var _inDOM2 = _interopRequireDefault(_inDOM);

var _on = __webpack_require__(50);

var _on2 = _interopRequireDefault(_on);

var _off = __webpack_require__(51);

var _off2 = _interopRequireDefault(_off);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listen = function listen() {};

if (_inDOM2.default) {
  listen = function listen(node, eventName, handler, capture) {
    (0, _on2.default)(node, eventName, handler, capture);
    return function () {
      (0, _off2.default)(node, eventName, handler, capture);
    };
  };
}

exports.default = listen;
module.exports = exports['default'];

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = camelize;
var rHyphen = /-(.)/g;

function camelize(string) {
  return string.replace(rHyphen, function (_, chr) {
    return chr.toUpperCase();
  });
}
module.exports = exports["default"];

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hyphenateStyleName;

var _hyphenate = __webpack_require__(79);

var _hyphenate2 = _interopRequireDefault(_hyphenate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var msPattern = /^ms-/; /**
                         * Copyright 2013-2014, Facebook, Inc.
                         * All rights reserved.
                         * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
                         */

function hyphenateStyleName(string) {
  return (0, _hyphenate2.default)(string).replace(msPattern, '-ms-');
}
module.exports = exports['default'];

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hyphenate;

var rUpper = /([A-Z])/g;

function hyphenate(string) {
  return string.replace(rUpper, '-$1').toLowerCase();
}
module.exports = exports['default'];

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _getComputedStyle;

var _camelizeStyle = __webpack_require__(54);

var _camelizeStyle2 = _interopRequireDefault(_camelizeStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rposition = /^(top|right|bottom|left)$/;
var rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;

function _getComputedStyle(node) {
  if (!node) throw new TypeError('No Element passed to `getComputedStyle()`');
  var doc = node.ownerDocument;

  return 'defaultView' in doc ? doc.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null) : {
    //ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
    getPropertyValue: function getPropertyValue(prop) {
      var style = node.style;

      prop = (0, _camelizeStyle2.default)(prop);

      if (prop == 'float') prop = 'styleFloat';

      var current = node.currentStyle[prop] || null;

      if (current == null && style && style[prop]) current = style[prop];

      if (rnumnonpx.test(current) && !rposition.test(prop)) {
        // Remember the original values
        var left = style.left;
        var runStyle = node.runtimeStyle;
        var rsLeft = runStyle && runStyle.left;

        // Put in the new values to get a computed value out
        if (rsLeft) runStyle.left = node.currentStyle.left;

        style.left = prop === 'fontSize' ? '1em' : current;
        current = style.pixelLeft + 'px';

        // Revert the changed values
        style.left = left;
        if (rsLeft) runStyle.left = rsLeft;
      }

      return current;
    }
  };
}
module.exports = exports['default'];

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeStyle;
function removeStyle(node, key) {
  return 'removeProperty' in node.style ? node.style.removeProperty(key) : node.style.removeAttribute(key);
}
module.exports = exports['default'];

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isTransform;
var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;

function isTransform(property) {
  return !!(property && supportedTransforms.test(property));
}
module.exports = exports["default"];

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.classNamesShape = exports.timeoutsShape = undefined;
exports.transitionTimeout = transitionTimeout;

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transitionTimeout(transitionType) {
  var timeoutPropName = 'transition' + transitionType + 'Timeout';
  var enabledPropName = 'transition' + transitionType;

  return function (props) {
    // If the transition is enabled
    if (props[enabledPropName]) {
      // If no timeout duration is provided
      if (props[timeoutPropName] == null) {
        return new Error(timeoutPropName + ' wasn\'t supplied to CSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');

        // If the duration isn't a number
      } else if (typeof props[timeoutPropName] !== 'number') {
        return new Error(timeoutPropName + ' must be a number (in milliseconds)');
      }
    }

    return null;
  };
}

var timeoutsShape = exports.timeoutsShape = _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.shape({
  enter: _propTypes2.default.number,
  exit: _propTypes2.default.number
}).isRequired]);

var classNamesShape = exports.classNamesShape = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  exit: _propTypes2.default.string,
  active: _propTypes2.default.string
}), _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  enterActive: _propTypes2.default.string,
  exit: _propTypes2.default.string,
  exitActive: _propTypes2.default.string
})]);

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _createChainableTypeChecker = __webpack_require__(57);

var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function elementType(props, propName, componentName, location, propFullName) {
  var propValue = props[propName];
  var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);

  if (_react2.default.isValidElement(propValue)) {
    return new Error('Invalid ' + location + ' `' + propFullName + '` of type ReactElement ' + ('supplied to `' + componentName + '`, expected an element type (a string ') + 'or a ReactClass).');
  }

  if (propType !== 'function' && propType !== 'string') {
    return new Error('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected an element type (a string ') + 'or a ReactClass).');
  }

  return null;
}

exports.default = (0, _createChainableTypeChecker2.default)(elementType);

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  component: _propTypes2.default.string
};

function ListOptionGroup(_ref) {
  var children = _ref.children,
      className = _ref.className,
      _ref$component = _ref.component,
      component = _ref$component === undefined ? 'li' : _ref$component;

  var Tag = component;
  return _react2.default.createElement(
    Tag,
    {
      tabIndex: '-1',
      role: 'separator',
      className: (0, _classnames2.default)(className, 'rw-list-optgroup')
    },
    children
  );
}

ListOptionGroup.propTypes = propTypes;

exports.default = ListOptionGroup;
module.exports = exports['default'];

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _class, _temp;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PropTypes = __webpack_require__(3);

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

var _dataHelpers = __webpack_require__(33);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownListInput = (_temp = _class = function (_React$Component) {
  _inherits(DropdownListInput, _React$Component);

  function DropdownListInput() {
    _classCallCheck(this, DropdownListInput);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DropdownListInput.prototype.render = function render() {
    var _props = this.props,
        placeholder = _props.placeholder,
        value = _props.value,
        textField = _props.textField,
        Component = _props.valueComponent;


    return _react2.default.createElement(
      'div',
      { className: 'rw-input rw-dropdown-list-input' },
      !value && placeholder ? _react2.default.createElement(
        'span',
        { className: 'rw-placeholder' },
        placeholder
      ) : Component ? _react2.default.createElement(Component, { item: value }) : (0, _dataHelpers.dataText)(value, textField)
    );
  };

  return DropdownListInput;
}(_react2.default.Component), _class.propTypes = {
  value: _propTypes2.default.any,
  placeholder: _propTypes2.default.string,
  textField: CustomPropTypes.accessor,
  valueComponent: CustomPropTypes.elementType
}, _temp);
exports.default = DropdownListInput;
module.exports = exports['default'];

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scrollTo;

var _offset = __webpack_require__(55);

var _offset2 = _interopRequireDefault(_offset);

var _height = __webpack_require__(30);

var _height2 = _interopRequireDefault(_height);

var _scrollParent = __webpack_require__(88);

var _scrollParent2 = _interopRequireDefault(_scrollParent);

var _scrollTop = __webpack_require__(89);

var _scrollTop2 = _interopRequireDefault(_scrollTop);

var _requestAnimationFrame = __webpack_require__(90);

var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);

var _isWindow = __webpack_require__(31);

var _isWindow2 = _interopRequireDefault(_isWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scrollTo(selected, scrollParent) {
  var offset = (0, _offset2.default)(selected);
  var poff = { top: 0, left: 0 };
  var list = void 0,
      listScrollTop = void 0,
      selectedTop = void 0,
      isWin = void 0;
  var selectedHeight = void 0,
      listHeight = void 0,
      bottom = void 0;

  if (!selected) return;

  list = scrollParent || (0, _scrollParent2.default)(selected);
  isWin = (0, _isWindow2.default)(list);
  listScrollTop = (0, _scrollTop2.default)(list);

  listHeight = (0, _height2.default)(list, true);
  isWin = (0, _isWindow2.default)(list);

  if (!isWin) poff = (0, _offset2.default)(list);

  offset = {
    top: offset.top - poff.top,
    left: offset.left - poff.left,
    height: offset.height,
    width: offset.width
  };

  selectedHeight = offset.height;
  selectedTop = offset.top + (isWin ? 0 : listScrollTop);
  bottom = selectedTop + selectedHeight;

  listScrollTop = listScrollTop > selectedTop ? selectedTop : bottom > listScrollTop + listHeight ? bottom - listHeight : listScrollTop;

  var id = (0, _requestAnimationFrame2.default)(function () {
    return (0, _scrollTop2.default)(list, listScrollTop);
  });
  return function () {
    return _requestAnimationFrame2.default.cancel(id);
  };
}
module.exports = exports['default'];

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scrollPrarent;

var _style = __webpack_require__(40);

var _style2 = _interopRequireDefault(_style);

var _height = __webpack_require__(30);

var _height2 = _interopRequireDefault(_height);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scrollPrarent(node) {
  var position = (0, _style2.default)(node, 'position'),
      excludeStatic = position === 'absolute',
      ownerDoc = node.ownerDocument;

  if (position === 'fixed') return ownerDoc || document;

  while ((node = node.parentNode) && node.nodeType !== 9) {

    var isStatic = excludeStatic && (0, _style2.default)(node, 'position') === 'static',
        style = (0, _style2.default)(node, 'overflow') + (0, _style2.default)(node, 'overflow-y') + (0, _style2.default)(node, 'overflow-x');

    if (isStatic) continue;

    if (/(auto|scroll)/.test(style) && (0, _height2.default)(node) < node.scrollHeight) return node;
  }

  return document;
}
module.exports = exports['default'];

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scrollTop;

var _isWindow = __webpack_require__(31);

var _isWindow2 = _interopRequireDefault(_isWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scrollTop(node, val) {
  var win = (0, _isWindow2.default)(node);

  if (val === undefined) return win ? 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop : node.scrollTop;

  if (win) win.scrollTo('pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft, val);else node.scrollTop = val;
}
module.exports = exports['default'];

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__(11);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vendors = ['', 'webkit', 'moz', 'o', 'ms'];
var cancel = 'clearTimeout';
var raf = fallback;
var compatRaf = void 0;

var getKey = function getKey(vendor, k) {
  return vendor + (!vendor ? k : k[0].toUpperCase() + k.substr(1)) + 'AnimationFrame';
};

if (_inDOM2.default) {
  vendors.some(function (vendor) {
    var rafKey = getKey(vendor, 'request');

    if (rafKey in window) {
      cancel = getKey(vendor, 'cancel');
      return raf = function raf(cb) {
        return window[rafKey](cb);
      };
    }
  });
}

/* https://github.com/component/raf */
var prev = new Date().getTime();
function fallback(fn) {
  var curr = new Date().getTime(),
      ms = Math.max(0, 16 - (curr - prev)),
      req = setTimeout(fn, ms);

  prev = curr;
  return req;
}

compatRaf = function compatRaf(cb) {
  return raf(cb);
};
compatRaf.cancel = function (id) {
  window[cancel] && typeof window[cancel] === 'function' && window[cancel](id);
};
exports.default = compatRaf;
module.exports = exports['default'];

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

var _uncontrollable = __webpack_require__(15);

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _Widget = __webpack_require__(16);

var _Widget2 = _interopRequireDefault(_Widget);

var _WidgetPicker = __webpack_require__(21);

var _WidgetPicker2 = _interopRequireDefault(_WidgetPicker);

var _List = __webpack_require__(23);

var _List2 = _interopRequireDefault(_List);

var _Popup = __webpack_require__(29);

var _Popup2 = _interopRequireDefault(_Popup);

var _Select = __webpack_require__(22);

var _Select2 = _interopRequireDefault(_Select);

var _ComboboxInput = __webpack_require__(92);

var _ComboboxInput2 = _interopRequireDefault(_ComboboxInput);

var _messages = __webpack_require__(12);

var _focusManager = __webpack_require__(17);

var _focusManager2 = _interopRequireDefault(_focusManager);

var _listDataManager = __webpack_require__(20);

var _listDataManager2 = _interopRequireDefault(_listDataManager);

var _PropTypes = __webpack_require__(3);

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

var _accessorManager = __webpack_require__(24);

var _accessorManager2 = _interopRequireDefault(_accessorManager);

var _scrollManager = __webpack_require__(25);

var _scrollManager2 = _interopRequireDefault(_scrollManager);

var _withRightToLeft = __webpack_require__(18);

var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);

var _ = __webpack_require__(8);

var _Props = __webpack_require__(4);

var Props = _interopRequireWildcard(_Props);

var _Filter = __webpack_require__(32);

var Filter = _interopRequireWildcard(_Filter);

var _interaction = __webpack_require__(13);

var _widgetHelpers = __webpack_require__(10);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var propTypes = _extends({}, Filter.propTypes, {
  value: _propTypes2.default.any,
  onChange: _propTypes2.default.func,
  open: _propTypes2.default.bool,
  onToggle: _propTypes2.default.func,

  itemComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,
  groupComponent: CustomPropTypes.elementType,
  groupBy: CustomPropTypes.accessor,

  data: _propTypes2.default.array,
  valueField: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  name: _propTypes2.default.string,

  /**
   *
   * @type {(dataItem: ?any, metadata: { originalEvent: SyntheticEvent }) => void}
   */
  onSelect: _propTypes2.default.func,

  autoFocus: _propTypes2.default.bool,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,

  /**
   * When `true` the Combobox will suggest, or fill in, values as you type. The suggestions
   * are always "startsWith", meaning it will search from the start of the `textField` property
   */
  suggest: Filter.propTypes.filter,
  busy: _propTypes2.default.bool,
  delay: _propTypes2.default.number,

  dropUp: _propTypes2.default.bool,
  popupTransition: CustomPropTypes.elementType,

  placeholder: _propTypes2.default.string,

  inputProps: _propTypes2.default.object,
  listProps: _propTypes2.default.object,
  messages: _propTypes2.default.shape({
    openCombobox: CustomPropTypes.message,
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message
  })

  /**
   * ---
   * shortcuts:
   *   - { key: alt + down arrow, label: open combobox }
   *   - { key: alt + up arrow, label: close combobox }
   *   - { key: down arrow, label: move focus to next item }
   *   - { key: up arrow, label: move focus to previous item }
   *   - { key: home, label: move focus to first item }
   *   - { key: end, label: move focus to last item }
   *   - { key: enter, label: select focused item }
   *   - { key: any key, label: search list for item starting with key }
   * ---
   *
   * Select an item from the list, or input a custom value. The Combobox can also make suggestions as you type.
  
   * @public
   */
});
var Combobox = (0, _withRightToLeft2.default)(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
  _inherits(Combobox, _React$Component);

  function Combobox(props, context) {
    _classCallCheck(this, Combobox);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.handleFocusWillChange = function (focused) {
      if (!focused && _this.refs.input) _this.refs.input.accept();
      if (focused) _this.focus();
    };

    _this.handleFocusChanged = function (focused) {
      if (!focused) _this.close();
    };

    _initDefineProp(_this, 'handleSelect', _descriptor, _this);

    _this.handleInputKeyDown = function (_ref) {
      var key = _ref.key;

      _this._deleting = key === 'Backspace' || key === 'Delete';
      _this._isTyping = true;
    };

    _this.handleInputChange = function (event) {
      var suggestion = _this.suggest(event.target.value);

      _this.change(suggestion, true, event);
      _this.open();
    };

    _initDefineProp(_this, 'handleKeyDown', _descriptor2, _this);

    _initDefineProp(_this, 'toggle', _descriptor3, _this);

    _this.messages = (0, _messages.getMessages)(props.messages);
    _this.inputId = (0, _widgetHelpers.instanceId)(_this, '_input');
    _this.listId = (0, _widgetHelpers.instanceId)(_this, '_listbox');
    _this.activeId = (0, _widgetHelpers.instanceId)(_this, '_listbox_active_option');

    _this.list = (0, _listDataManager2.default)(_this);
    _this.accessors = (0, _accessorManager2.default)(_this);
    _this.handleScroll = (0, _scrollManager2.default)(_this);
    _this.focusManager = (0, _focusManager2.default)(_this, {
      willHandle: _this.handleFocusWillChange,
      didHandle: _this.handleFocusChanged
    });

    _this.state = _extends({}, _this.getStateFromProps(props), {
      open: false
    });
    return _this;
  }

  Combobox.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    var isSuggesting = this.refs.input && this.refs.input.isSuggesting(),
        stateChanged = !(0, _.isShallowEqual)(nextState, this.state),
        valueChanged = !(0, _.isShallowEqual)(nextProps, this.props);

    return isSuggesting || stateChanged || valueChanged;
  };

  Combobox.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.messages = (0, _messages.getMessages)(nextProps.messages);
    this.setState(this.getStateFromProps(nextProps));
  };

  Combobox.prototype.getStateFromProps = function getStateFromProps(props) {
    var accessors = this.accessors,
        list = this.list;
    var value = props.value,
        data = props.data,
        filter = props.filter;


    var index = accessors.indexOf(data, value);
    var dataItem = index === -1 ? value : data[index];
    var itemText = accessors.text(dataItem);

    var searchTerm = void 0;
    // filter only when the value is not an item in the data list
    if (index === -1 || this.refs.input && this.refs.input.isSuggesting()) {
      searchTerm = itemText;
    }

    data = Filter.filter(data, _extends({ searchTerm: searchTerm }, props));

    var focusedIndex = index;
    // index may have changed after filtering
    if (index !== -1) {
      index = accessors.indexOf(data, value);
      focusedIndex = index;
    } else {
      // value isn't a dataItem so find the close match
      focusedIndex = Filter.indexOf(data, {
        searchTerm: searchTerm,
        textField: accessors.text,
        filter: filter || true
      });
    }

    list.setData(data);

    return {
      data: data,
      selectedItem: list.nextEnabled(data[index]),
      focusedItem: list.nextEnabled(~focusedIndex ? data[focusedIndex] : data[0])
    };
  };

  // has to be done early since `accept()` re-focuses the input


  Combobox.prototype.renderInput = function renderInput() {
    var _props = this.props,
        suggest = _props.suggest,
        filter = _props.filter,
        busy = _props.busy,
        name = _props.name,
        data = _props.data,
        value = _props.value,
        autoFocus = _props.autoFocus,
        tabIndex = _props.tabIndex,
        placeholder = _props.placeholder,
        inputProps = _props.inputProps,
        disabled = _props.disabled,
        readOnly = _props.readOnly,
        open = _props.open;


    var valueItem = this.accessors.findOrSelf(data, value);

    var completeType = suggest ? filter ? 'both' : 'inline' : filter ? 'list' : '';

    return _react2.default.createElement(_ComboboxInput2.default, _extends({}, inputProps, {
      ref: 'input',
      role: 'combobox',
      name: name,
      id: this.inputId,
      autoFocus: autoFocus,
      tabIndex: tabIndex,
      suggest: suggest,
      disabled: disabled === true,
      readOnly: readOnly === true,
      'aria-busy': !!busy,
      'aria-owns': this.listId,
      'aria-autocomplete': completeType,
      'aria-activedescendant': open ? this.activeId : null,
      'aria-expanded': open,
      'aria-haspopup': true,
      placeholder: placeholder,
      value: this.accessors.text(valueItem),
      onChange: this.handleInputChange,
      onKeyDown: this.handleInputKeyDown
    }));
  };

  Combobox.prototype.renderList = function renderList(messages) {
    var activeId = this.activeId,
        inputId = this.inputId,
        listId = this.listId,
        accessors = this.accessors;
    var _props2 = this.props,
        open = _props2.open,
        data = _props2.data;
    var _state = this.state,
        selectedItem = _state.selectedItem,
        focusedItem = _state.focusedItem;


    var List = this.props.listComponent;
    var props = this.list.defaultProps();

    return _react2.default.createElement(List, _extends({
      ref: 'list'
    }, props, {
      id: listId,
      activeId: activeId,
      valueAccessor: accessors.value,
      textAccessor: accessors.text,
      selectedItem: selectedItem,
      focusedItem: open ? focusedItem : null,
      'aria-hidden': !open,
      'aria-labelledby': inputId,
      'aria-live': open && 'polite',
      onSelect: this.handleSelect,
      onMove: this.handleScroll,
      messages: {
        emptyList: data.length ? messages.emptyFilter : messages.emptyList
      }
    }));
  };

  Combobox.prototype.render = function render() {
    var _this2 = this;

    var _props3 = this.props,
        className = _props3.className,
        popupTransition = _props3.popupTransition,
        busy = _props3.busy,
        dropUp = _props3.dropUp,
        open = _props3.open;
    var focused = this.state.focused;


    var disabled = this.props.disabled === true,
        readOnly = this.props.readOnly === true;

    var elementProps = Props.pickElementProps(this);
    var shouldRenderPopup = open || (0, _widgetHelpers.isFirstFocusedRender)(this);

    var messages = this.messages;

    return _react2.default.createElement(
      _Widget2.default,
      _extends({}, elementProps, {
        open: open,
        dropUp: dropUp,
        focused: focused,
        disabled: disabled,
        readOnly: readOnly,
        onBlur: this.focusManager.handleBlur,
        onFocus: this.focusManager.handleFocus,
        onKeyDown: this.handleKeyDown,
        className: (0, _classnames2.default)(className, 'rw-combobox')
      }),
      _react2.default.createElement(
        _WidgetPicker2.default,
        null,
        this.renderInput(),
        _react2.default.createElement(_Select2.default, {
          bordered: true,
          busy: busy,
          icon: 'caret-down',
          onClick: this.toggle,
          disabled: disabled || readOnly,
          label: messages.openCombobox(this.props)
        })
      ),
      shouldRenderPopup && _react2.default.createElement(
        _Popup2.default,
        {
          open: open,
          dropUp: dropUp,
          transition: popupTransition,
          onEntering: function onEntering() {
            return _this2.refs.list.forceUpdate();
          }
        },
        _react2.default.createElement(
          'div',
          null,
          this.renderList(messages)
        )
      )
    );
  };

  Combobox.prototype.focus = function focus() {
    if (this.refs.input) this.refs.input.focus();
  };

  Combobox.prototype.change = function change(nextValue, typing, originalEvent) {
    var _props4 = this.props,
        onChange = _props4.onChange,
        lastValue = _props4.value;

    this._typedChange = !!typing;
    (0, _widgetHelpers.notify)(onChange, [nextValue, {
      lastValue: lastValue,
      originalEvent: originalEvent
    }]);
  };

  Combobox.prototype.open = function open() {
    if (!this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, true);
  };

  Combobox.prototype.close = function close() {
    if (this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, false);
  };

  Combobox.prototype.suggest = function suggest(searchTerm) {
    var _props5 = this.props,
        textField = _props5.textField,
        suggest = _props5.suggest,
        minLength = _props5.minLength;
    var data = this.state.data;


    if (!this._deleting) return Filter.suggest(data, {
      minLength: minLength,
      textField: textField,
      searchTerm: searchTerm,
      filter: suggest,
      caseSensitive: false
    });

    return searchTerm;
  };

  return Combobox;
}(_react2.default.Component), _class3.propTypes = propTypes, _class3.defaultProps = {
  data: [],
  value: '',
  open: false,
  suggest: false,
  filter: false,
  delay: 500,
  listComponent: _List2.default
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'handleSelect', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (data, originalEvent) {
      _this3.close();
      (0, _widgetHelpers.notify)(_this3.props.onSelect, [data, { originalEvent: originalEvent }]);
      _this3.change(data, false, originalEvent);
      _this3.focus();
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (e) {
      var key = e.key,
          altKey = e.altKey;
      var list = _this4.list;
      var _props6 = _this4.props,
          open = _props6.open,
          onKeyDown = _props6.onKeyDown;
      var _state2 = _this4.state,
          focusedItem = _state2.focusedItem,
          selectedItem = _state2.selectedItem;


      (0, _widgetHelpers.notify)(onKeyDown, [e]);

      if (e.defaultPrevented) return;

      var select = function select(item) {
        return item != null && _this4.handleSelect(item, e);
      };
      var focusItem = function focusItem(item) {
        return _this4.setState({ focusedItem: item });
      };

      if (key === 'End' && open) {
        e.preventDefault();
        focusItem(list.last());
      } else if (key === 'Home' && open) {
        e.preventDefault();
        focusItem(list.first());
      } else if (key === 'Escape' && open) {
        e.preventDefault();
        _this4.close();
      } else if (key === 'Enter' && open) {
        e.preventDefault();
        select(_this4.state.focusedItem);
      } else if (key === 'Tab') {
        _this4.refs.input.accept();
      } else if (key === 'ArrowDown') {
        e.preventDefault();
        if (altKey) return _this4.open();

        if (open) focusItem(list.next(focusedItem));else select(list.next(selectedItem));
      } else if (key === 'ArrowUp') {
        e.preventDefault();
        if (altKey) return _this4.close();

        if (open) focusItem(list.prev(focusedItem));else select(list.prev(selectedItem));
      }
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function () {
      _this5.focus();

      _this5.props.open ? _this5.close() : _this5.open();
    };
  }
})), _class2)) || _class;

exports.default = (0, _uncontrollable2.default)(Combobox, { open: 'onToggle', value: 'onChange' }, ['focus']);
module.exports = exports['default'];

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.caretSet = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(5);

var _Input = __webpack_require__(43);

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var caretSet = exports.caretSet = function caretSet(node, start, end) {
  try {
    node.setSelectionRange(start, end);
  } catch (e) {
    /* not focused or not visible */
  }
};

var ComboboxInput = (_temp2 = _class = function (_React$Component) {
  _inherits(ComboboxInput, _React$Component);

  function ComboboxInput() {
    var _temp, _this, _ret;

    _classCallCheck(this, ComboboxInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleChange = function (e) {
      var _this$props = _this.props,
          placeholder = _this$props.placeholder,
          value = _this$props.value,
          onChange = _this$props.onChange;


      var stringValue = e.target.value;
      var hasPlaceholder = !!placeholder;

      // IE fires input events when setting/unsetting placeholders.
      // issue #112
      if (hasPlaceholder && !stringValue && stringValue === (value || '')) return;

      _this._last = stringValue;
      onChange(e, stringValue);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ComboboxInput.prototype.componentDidUpdate = function componentDidUpdate() {
    var input = (0, _reactDom.findDOMNode)(this);
    var val = this.props.value;

    if (this.isSuggesting()) {
      var start = val.toLowerCase().indexOf(this._last.toLowerCase()) + this._last.length;
      var end = val.length - start;

      if (start >= 0 && end !== 0) {
        caretSet(input, start, start + end);
      }
    }
  };

  ComboboxInput.prototype.render = function render() {
    var _props = this.props,
        onKeyDown = _props.onKeyDown,
        props = _objectWithoutProperties(_props, ['onKeyDown']);

    delete props.suggest;

    return _react2.default.createElement(_Input2.default, _extends({}, props, {
      className: 'rw-widget-input',
      onKeyDown: onKeyDown,
      onChange: this.handleChange
    }));
  };

  ComboboxInput.prototype.isSuggesting = function isSuggesting() {
    var _props2 = this.props,
        value = _props2.value,
        suggest = _props2.suggest;


    if (!suggest) return false;

    return this._last != null && value.toLowerCase().indexOf(this._last.toLowerCase()) !== -1;
  };

  ComboboxInput.prototype.accept = function accept() {
    this._last = null;
    // caretSet(node, end, end)
  };

  ComboboxInput.prototype.focus = function focus() {
    (0, _reactDom.findDOMNode)(this).focus();
  };

  return ComboboxInput;
}(_react2.default.Component), _class.propTypes = {
  value: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  suggest: _propTypes2.default.bool,
  onChange: _propTypes2.default.func.isRequired,
  onKeyDown: _propTypes2.default.func
}, _class.defaultProps = {
  value: ''
}, _temp2);
exports.default = ComboboxInput;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _class, _temp;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = __webpack_require__(19);

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = (_temp = _class = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Header.prototype.render = function render() {
    var _props = this.props,
        messages = _props.messages,
        label = _props.label,
        labelId = _props.labelId,
        onMoveRight = _props.onMoveRight,
        onMoveLeft = _props.onMoveLeft,
        onViewChange = _props.onViewChange,
        prevDisabled = _props.prevDisabled,
        upDisabled = _props.upDisabled,
        nextDisabled = _props.nextDisabled;


    var rtl = this.context.isRtl;

    return _react2.default.createElement(
      'div',
      { className: 'rw-calendar-header' },
      _react2.default.createElement(_Button2.default, {
        className: 'rw-calendar-btn-left',
        onClick: onMoveLeft,
        disabled: prevDisabled,
        label: messages.moveBack(),
        icon: 'chevron-' + (rtl ? 'right' : 'left')
      }),
      _react2.default.createElement(
        _Button2.default,
        {
          id: labelId,
          onClick: onViewChange,
          className: 'rw-calendar-btn-view',
          disabled: upDisabled,
          'aria-live': 'polite',
          'aria-atomic': 'true'
        },
        label
      ),
      _react2.default.createElement(_Button2.default, {
        className: 'rw-calendar-btn-right',
        onClick: onMoveRight,
        disabled: nextDisabled,
        label: messages.moveForward(),
        icon: 'chevron-' + (rtl ? 'left' : 'right')
      })
    );
  };

  return Header;
}(_react2.default.Component), _class.propTypes = {
  label: _propTypes2.default.string.isRequired,
  labelId: _propTypes2.default.string,

  upDisabled: _propTypes2.default.bool.isRequired,
  prevDisabled: _propTypes2.default.bool.isRequired,
  nextDisabled: _propTypes2.default.bool.isRequired,
  onViewChange: _propTypes2.default.func.isRequired,
  onMoveLeft: _propTypes2.default.func.isRequired,
  onMoveRight: _propTypes2.default.func.isRequired,

  messages: _propTypes2.default.shape({
    moveBack: _propTypes2.default.func.isRequired,
    moveForward: _propTypes2.default.func.isRequired
  })
}, _class.contextTypes = {
  isRtl: _propTypes2.default.bool
}, _temp);
exports.default = Header;
module.exports = exports['default'];

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = Footer;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = __webpack_require__(19);

var _Button2 = _interopRequireDefault(_Button);

var _localizers = __webpack_require__(6);

var _PropTypes = __webpack_require__(3);

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  disabled: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  value: _propTypes2.default.instanceOf(Date),
  onClick: _propTypes2.default.func.isRequired,
  culture: _propTypes2.default.string,
  format: CustomPropTypes.dateFormat
};

function Footer(_ref) {
  var disabled = _ref.disabled,
      readOnly = _ref.readOnly,
      value = _ref.value,
      onClick = _ref.onClick,
      culture = _ref.culture,
      format = _ref.format;

  return _react2.default.createElement(
    'div',
    { className: 'rw-calendar-footer' },
    _react2.default.createElement(
      _Button2.default,
      {
        disabled: !!(disabled || readOnly),
        onClick: onClick.bind(null, value)
      },
      _localizers.date.format(value, _localizers.date.getFormat('footer', format), culture)
    )
  );
}

Footer.propTypes = propTypes;
module.exports = exports['default'];

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _CalendarView = __webpack_require__(34);

var _CalendarView2 = _interopRequireDefault(_CalendarView);

var _dates = __webpack_require__(14);

var _dates2 = _interopRequireDefault(_dates);

var _localizers = __webpack_require__(6);

var _PropTypes = __webpack_require__(3);

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

var _ = __webpack_require__(8);

var _Props = __webpack_require__(4);

var Props = _interopRequireWildcard(_Props);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isEqual = function isEqual(dateA, dateB) {
  return _dates2.default.eq(dateA, dateB, 'day');
};

var MonthView = (_temp2 = _class = function (_React$Component) {
  _inherits(MonthView, _React$Component);

  function MonthView() {
    var _temp, _this, _ret;

    _classCallCheck(this, MonthView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.renderRow = function (row, rowIdx) {
      var _this$props = _this.props,
          focused = _this$props.focused,
          today = _this$props.today,
          activeId = _this$props.activeId,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange,
          value = _this$props.value,
          culture = _this$props.culture,
          min = _this$props.min,
          max = _this$props.max,
          footerFormat = _this$props.footerFormat,
          dateFormat = _this$props.dateFormat,
          Day = _this$props.dayComponent;


      footerFormat = _localizers.date.getFormat('footer', footerFormat);
      dateFormat = _localizers.date.getFormat('dayOfMonth', dateFormat);

      return _react2.default.createElement(
        _CalendarView2.default.Row,
        { key: rowIdx },
        row.map(function (date, colIdx) {
          var formattedDate = _localizers.date.format(date, dateFormat, culture);
          var label = _localizers.date.format(date, footerFormat, culture);

          return _react2.default.createElement(
            _CalendarView2.default.Cell,
            {
              key: colIdx,
              activeId: activeId,
              label: label,
              date: date,
              now: today,
              min: min,
              max: max,
              unit: 'day',
              viewUnit: 'month',
              onChange: onChange,
              focused: focused,
              selected: value,
              disabled: disabled
            },
            Day ? _react2.default.createElement(Day, { date: date, label: formattedDate }) : formattedDate
          );
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  MonthView.prototype.renderHeaders = function renderHeaders(week, format, culture) {
    var firstOfWeek = _localizers.date.firstOfWeek(culture);
    return week.map(function (date) {
      return _react2.default.createElement(
        'th',
        { key: 'header_' + _dates2.default.weekday(date, undefined, firstOfWeek) },
        _localizers.date.format(date, format, culture)
      );
    });
  };

  MonthView.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        focused = _props.focused,
        culture = _props.culture,
        activeId = _props.activeId,
        dayFormat = _props.dayFormat;

    var month = _dates2.default.visibleDays(focused, culture);
    var rows = (0, _.chunk)(month, 7);

    dayFormat = _localizers.date.getFormat('weekday', dayFormat);

    return _react2.default.createElement(
      _CalendarView2.default,
      _extends({}, Props.omitOwn(this), {
        activeId: activeId,
        className: (0, _classnames2.default)(className, 'rw-calendar-month')
      }),
      _react2.default.createElement(
        'thead',
        null,
        _react2.default.createElement(
          'tr',
          null,
          this.renderHeaders(rows[0], dayFormat, culture)
        )
      ),
      _react2.default.createElement(
        _CalendarView2.default.Body,
        null,
        rows.map(this.renderRow)
      )
    );
  };

  return MonthView;
}(_react2.default.Component), _class.propTypes = {
  activeId: _propTypes2.default.string,
  culture: _propTypes2.default.string,
  today: _propTypes2.default.instanceOf(Date),
  value: _propTypes2.default.instanceOf(Date),
  focused: _propTypes2.default.instanceOf(Date),
  min: _propTypes2.default.instanceOf(Date),
  max: _propTypes2.default.instanceOf(Date),
  onChange: _propTypes2.default.func.isRequired,

  dayComponent: CustomPropTypes.elementType,
  dayFormat: CustomPropTypes.dateFormat,
  dateFormat: CustomPropTypes.dateFormat,
  footerFormat: CustomPropTypes.dateFormat,
  disabled: _propTypes2.default.bool
}, _class.isEqual = isEqual, _temp2);
exports.default = MonthView;
module.exports = exports['default'];

/***/ }),
/* 96 */
/***/ (function(module, exports) {

var MILI    = 'milliseconds'
  , SECONDS = 'seconds'
  , MINUTES = 'minutes'
  , HOURS   = 'hours'
  , DAY     = 'day'
  , WEEK    = 'week'
  , MONTH   = 'month'
  , YEAR    = 'year'
  , DECADE  = 'decade'
  , CENTURY = 'century';

var dates = module.exports = {

  add: function(date, num, unit) {
    date = new Date(date)

    switch (unit){
      case MILI:
      case SECONDS:
      case MINUTES:
      case HOURS:
      case YEAR:
        return dates[unit](date, dates[unit](date) + num)
      case DAY:
        return dates.date(date, dates.date(date) + num)
      case WEEK:
        return dates.date(date, dates.date(date) + (7 * num)) 
      case MONTH:
        return monthMath(date, num)
      case DECADE:
        return dates.year(date, dates.year(date) + (num * 10))
      case CENTURY:
        return dates.year(date, dates.year(date) + (num * 100))
    }

    throw new TypeError('Invalid units: "' + unit + '"')
  },

  subtract: function(date, num, unit) {
    return dates.add(date, -num, unit)
  },

  startOf: function(date, unit, firstOfWeek) {
    date = new Date(date)

    switch (unit) {
      case 'century':
      case 'decade':
      case 'year':
          date = dates.month(date, 0);
      case 'month':
          date = dates.date(date, 1);
      case 'week':
      case 'day':
          date = dates.hours(date, 0);
      case 'hours':
          date = dates.minutes(date, 0);
      case 'minutes':
          date = dates.seconds(date, 0);
      case 'seconds':
          date = dates.milliseconds(date, 0);
    }

    if (unit === DECADE) 
      date = dates.subtract(date, dates.year(date) % 10, 'year')
    
    if (unit === CENTURY) 
      date = dates.subtract(date, dates.year(date) % 100, 'year')

    if (unit === WEEK) 
      date = dates.weekday(date, 0, firstOfWeek);

    return date
  },


  endOf: function(date, unit, firstOfWeek){
    date = new Date(date)
    date = dates.startOf(date, unit, firstOfWeek)
    date = dates.add(date, 1, unit)
    date = dates.subtract(date, 1, MILI)
    return date
  },

  eq:  createComparer(function(a, b){ return a === b }),
  neq: createComparer(function(a, b){ return a !== b }),
  gt:  createComparer(function(a, b){ return a > b }),
  gte: createComparer(function(a, b){ return a >= b }),
  lt:  createComparer(function(a, b){ return a < b }),
  lte: createComparer(function(a, b){ return a <= b }),

  min: function(){
    return new Date(Math.min.apply(Math, arguments))
  },

  max: function(){
    return new Date(Math.max.apply(Math, arguments))
  },
  
  inRange: function(day, min, max, unit){
    unit = unit || 'day'

    return (!min || dates.gte(day, min, unit))
        && (!max || dates.lte(day, max, unit))
  },

  milliseconds:   createAccessor('Milliseconds'),
  seconds:        createAccessor('Seconds'),
  minutes:        createAccessor('Minutes'),
  hours:          createAccessor('Hours'),
  day:            createAccessor('Day'),
  date:           createAccessor('Date'),
  month:          createAccessor('Month'),
  year:           createAccessor('FullYear'),

  decade: function (date, val) {
    return val === undefined 
      ? dates.year(dates.startOf(date, DECADE))
      : dates.add(date, val + 10, YEAR);
  },

  century: function (date, val) {
    return val === undefined 
      ? dates.year(dates.startOf(date, CENTURY))
      : dates.add(date, val + 100, YEAR);
  },

  weekday: function (date, val, firstDay) {
      var weekday = (dates.day(date) + 7 - (firstDay || 0) ) % 7;

      return val === undefined 
        ? weekday 
        : dates.add(date, val - weekday, DAY);
  },

  diff: function (date1, date2, unit, asFloat) {
    var dividend, divisor, result;

    switch (unit) {
      case MILI:
      case SECONDS:
      case MINUTES:
      case HOURS:
      case DAY:
      case WEEK:
        dividend = date2.getTime() - date1.getTime(); break;
      case MONTH:
      case YEAR:
      case DECADE:
      case CENTURY:
        dividend = (dates.year(date2) - dates.year(date1)) * 12 + dates.month(date2) - dates.month(date1); break;
      default:
        throw new TypeError('Invalid units: "' + unit + '"');
    }

    switch (unit) {
      case MILI:
          divisor = 1; break;
      case SECONDS:
          divisor = 1000; break;
      case MINUTES:
          divisor = 1000 * 60; break;
      case HOURS:
          divisor = 1000 * 60 * 60; break;
      case DAY:
          divisor = 1000 * 60 * 60 * 24; break;
      case WEEK:
          divisor = 1000 * 60 * 60 * 24 * 7; break;
      case MONTH:
          divisor = 1; break;
      case YEAR:
          divisor = 12; break;
      case DECADE:
          divisor = 120; break;
      case CENTURY:
          divisor = 1200; break;
      default:
        throw new TypeError('Invalid units: "' + unit + '"');
    }

    result = dividend / divisor;

    return asFloat ? result : absoluteFloor(result);
  }
};

function absoluteFloor(number) {
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

function monthMath(date, val){
  var current = dates.month(date)
    , newMonth  = (current + val);

    date = dates.month(date, newMonth)

    while (newMonth < 0 ) newMonth = 12 + newMonth
      
    //month rollover
    if ( dates.month(date) !== ( newMonth % 12))
      date = dates.date(date, 0) //move to last of month

    return date
}

function createAccessor(method){
  return function(date, val){
    if (val === undefined)
      return date['get' + method]()

    date = new Date(date)
    date['set' + method](val)
    return date
  }
}

function createComparer(operator) {
  return function (a, b, unit) {
    return operator(+dates.startOf(a, unit), +dates.startOf(b, unit))
  };
}


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CalendarView = __webpack_require__(34);

var _CalendarView2 = _interopRequireDefault(_CalendarView);

var _dates = __webpack_require__(14);

var _dates2 = _interopRequireDefault(_dates);

var _localizers = __webpack_require__(6);

var _ = __webpack_require__(8);

var _Props = __webpack_require__(4);

var Props = _interopRequireWildcard(_Props);

var _PropTypes = __webpack_require__(3);

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YearView = (_temp2 = _class = function (_React$Component) {
  _inherits(YearView, _React$Component);

  function YearView() {
    var _temp, _this, _ret;

    _classCallCheck(this, YearView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.renderRow = function (row, rowIdx) {
      var _this$props = _this.props,
          focused = _this$props.focused,
          activeId = _this$props.activeId,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange,
          value = _this$props.value,
          today = _this$props.today,
          culture = _this$props.culture,
          headerFormat = _this$props.headerFormat,
          monthFormat = _this$props.monthFormat,
          min = _this$props.min,
          max = _this$props.max;


      headerFormat = _localizers.date.getFormat('header', headerFormat);
      monthFormat = _localizers.date.getFormat('month', monthFormat);

      return _react2.default.createElement(
        _CalendarView2.default.Row,
        { key: rowIdx },
        row.map(function (date, colIdx) {
          var label = _localizers.date.format(date, headerFormat, culture);

          return _react2.default.createElement(
            _CalendarView2.default.Cell,
            {
              key: colIdx,
              activeId: activeId,
              label: label,
              date: date,
              now: today,
              min: min,
              max: max,
              unit: 'month',
              onChange: onChange,
              focused: focused,
              selected: value,
              disabled: disabled
            },
            _localizers.date.format(date, monthFormat, culture)
          );
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  YearView.prototype.render = function render() {
    var _props = this.props,
        focused = _props.focused,
        activeId = _props.activeId,
        months = _dates2.default.monthsInYear(_dates2.default.year(focused));

    return _react2.default.createElement(
      _CalendarView2.default,
      _extends({}, Props.omitOwn(this), {
        activeId: activeId
      }),
      _react2.default.createElement(
        _CalendarView2.default.Body,
        null,
        (0, _.chunk)(months, 4).map(this.renderRow)
      )
    );
  };

  return YearView;
}(_react2.default.Component), _class.propTypes = {
  activeId: _propTypes2.default.string,
  culture: _propTypes2.default.string,
  today: _propTypes2.default.instanceOf(Date),
  value: _propTypes2.default.instanceOf(Date),
  focused: _propTypes2.default.instanceOf(Date),
  min: _propTypes2.default.instanceOf(Date),
  max: _propTypes2.default.instanceOf(Date),
  onChange: _propTypes2.default.func.isRequired,

  headerFormat: CustomPropTypes.dateFormat,
  monthFormat: CustomPropTypes.dateFormat,
  disabled: _propTypes2.default.bool
}, _temp2);
exports.default = YearView;
module.exports = exports['default'];

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CalendarView = __webpack_require__(34);

var _CalendarView2 = _interopRequireDefault(_CalendarView);

var _dates = __webpack_require__(14);

var _dates2 = _interopRequireDefault(_dates);

var _localizers = __webpack_require__(6);

var _ = __webpack_require__(8);

var _Props = __webpack_require__(4);

var Props = _interopRequireWildcard(_Props);

var _PropTypes = __webpack_require__(3);

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DecadeView = (_temp2 = _class = function (_React$Component) {
  _inherits(DecadeView, _React$Component);

  function DecadeView() {
    var _temp, _this, _ret;

    _classCallCheck(this, DecadeView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.renderRow = function (row, rowIdx) {
      var _this$props = _this.props,
          focused = _this$props.focused,
          activeId = _this$props.activeId,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange,
          yearFormat = _this$props.yearFormat,
          value = _this$props.value,
          today = _this$props.today,
          culture = _this$props.culture,
          min = _this$props.min,
          max = _this$props.max;


      return _react2.default.createElement(
        _CalendarView2.default.Row,
        { key: rowIdx },
        row.map(function (date, colIdx) {
          var label = _localizers.date.format(date, _localizers.date.getFormat('year', yearFormat), culture);

          return _react2.default.createElement(
            _CalendarView2.default.Cell,
            {
              key: colIdx,
              unit: 'year',
              activeId: activeId,
              label: label,
              date: date,
              now: today,
              min: min,
              max: max,
              onChange: onChange,
              focused: focused,
              selected: value,
              disabled: disabled
            },
            label
          );
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  DecadeView.prototype.render = function render() {
    var _props = this.props,
        focused = _props.focused,
        activeId = _props.activeId;


    return _react2.default.createElement(
      _CalendarView2.default,
      _extends({}, Props.omitOwn(this), {
        activeId: activeId
      }),
      _react2.default.createElement(
        _CalendarView2.default.Body,
        null,
        (0, _.chunk)(getDecadeYears(focused), 4).map(this.renderRow)
      )
    );
  };

  return DecadeView;
}(_react2.default.Component), _class.propTypes = {
  activeId: _propTypes2.default.string,
  culture: _propTypes2.default.string,
  today: _propTypes2.default.instanceOf(Date),
  value: _propTypes2.default.instanceOf(Date),
  focused: _propTypes2.default.instanceOf(Date),
  min: _propTypes2.default.instanceOf(Date),
  max: _propTypes2.default.instanceOf(Date),
  onChange: _propTypes2.default.func.isRequired,

  yearFormat: CustomPropTypes.dateFormat,
  disabled: _propTypes2.default.bool
}, _temp2);


function getDecadeYears(_date) {
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      date = _dates2.default.add(_dates2.default.startOf(_date, 'decade'), -2, 'year');

  return days.map(function () {
    return date = _dates2.default.add(date, 1, 'year');
  });
}

exports.default = DecadeView;
module.exports = exports['default'];

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CalendarView = __webpack_require__(34);

var _CalendarView2 = _interopRequireDefault(_CalendarView);

var _dates = __webpack_require__(14);

var _dates2 = _interopRequireDefault(_dates);

var _localizers = __webpack_require__(6);

var _ = __webpack_require__(8);

var _Props = __webpack_require__(4);

var Props = _interopRequireWildcard(_Props);

var _PropTypes = __webpack_require__(3);

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CenturyView = (_temp2 = _class = function (_React$Component) {
  _inherits(CenturyView, _React$Component);

  function CenturyView() {
    var _temp, _this, _ret;

    _classCallCheck(this, CenturyView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.renderRow = function (row, rowIdx) {
      var _this$props = _this.props,
          focused = _this$props.focused,
          activeId = _this$props.activeId,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange,
          value = _this$props.value,
          today = _this$props.today,
          culture = _this$props.culture,
          min = _this$props.min,
          decadeFormat = _this$props.decadeFormat,
          max = _this$props.max;


      decadeFormat = _localizers.date.getFormat('decade', decadeFormat);

      return _react2.default.createElement(
        _CalendarView2.default.Row,
        { key: rowIdx },
        row.map(function (date, colIdx) {
          var label = _localizers.date.format(_dates2.default.startOf(date, 'decade'), decadeFormat, culture);

          return _react2.default.createElement(
            _CalendarView2.default.Cell,
            {
              key: colIdx,
              unit: 'decade',
              activeId: activeId,
              label: label,
              date: date,
              now: today,
              min: min,
              max: max,
              onChange: onChange,
              focused: focused,
              selected: value,
              disabled: disabled
            },
            label
          );
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  CenturyView.prototype.render = function render() {
    var _props = this.props,
        focused = _props.focused,
        activeId = _props.activeId;


    return _react2.default.createElement(
      _CalendarView2.default,
      _extends({}, Props.omitOwn(this), {
        activeId: activeId
      }),
      _react2.default.createElement(
        _CalendarView2.default.Body,
        null,
        (0, _.chunk)(getCenturyDecades(focused), 4).map(this.renderRow)
      )
    );
  };

  return CenturyView;
}(_react2.default.Component), _class.propTypes = {
  activeId: _propTypes2.default.string,
  culture: _propTypes2.default.string,
  today: _propTypes2.default.instanceOf(Date),
  value: _propTypes2.default.instanceOf(Date),
  focused: _propTypes2.default.instanceOf(Date),
  min: _propTypes2.default.instanceOf(Date),
  max: _propTypes2.default.instanceOf(Date),
  onChange: _propTypes2.default.func.isRequired,
  decadeFormat: CustomPropTypes.dateFormat,
  disabled: _propTypes2.default.bool
}, _temp2);


function getCenturyDecades(_date) {
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      date = _dates2.default.add(_dates2.default.startOf(_date, 'century'), -20, 'year');

  return days.map(function () {
    return date = _dates2.default.add(date, 10, 'year');
  });
}

exports.default = CenturyView;
module.exports = exports['default'];

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ChildMapping = __webpack_require__(101);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var values = Object.values || function (obj) {
  return Object.keys(obj).map(function (k) {
    return obj[k];
  });
};

var propTypes = {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   */
  component: _propTypes2.default.any,
  /**
   * A set of `<Transition>` components, that are toggled `in` and out as they
   * leave. the `<TransitionGroup>` will inject specific transition props, so
   * remember to spread them throguh if you are wrapping the `<Transition>` as
   * with our `<Fade>` example.
   */
  children: _propTypes2.default.node,

  /**
   * A convenience prop that enables or disabled appear animations
   * for all children. Note that specifiying this will override any defaults set
   * on individual children Transitions.
   */
  appear: _propTypes2.default.bool,
  /**
   * A convenience prop that enables or disabled enter animations
   * for all children. Note that specifiying this will override any defaults set
   * on individual children Transitions.
   */
  enter: _propTypes2.default.bool,
  /**
    * A convenience prop that enables or disabled exit animations
    * for all children. Note that specifiying this will override any defaults set
    * on individual children Transitions.
    */
  exit: _propTypes2.default.bool,

  /**
   * You may need to apply reactive updates to a child as it is exiting.
   * This is generally done by using `cloneElement` however in the case of an exiting
   * child the element has already been removed and not accessible to the consumer.
   *
   * If you do need to update a child as it leaves you can provide a `childFactory`
   * to wrap every child, even the ones that are leaving.
   *
   * @type Function(child: ReactElement) -> ReactElement
   */
  childFactory: _propTypes2.default.func
};

var defaultProps = {
  component: 'div',
  childFactory: function childFactory(child) {
    return child;
  }
};

/**
 * The `<TransitionGroup>` component manages a set of `<Transition>` components
 * in a list. Like with the `<Transition>` component, `<TransitionGroup>`, is a
 * state machine for managing the mounting and unmounting of components over
 * time.
 *
 * Consider the example below using the `Fade` CSS transition from before.
 * As items are removed or added to the TodoList the `in` prop is toggled
 * automatically by the `<TransitionGroup>`. You can use _any_ `<Transition>`
 * component in a `<TransitionGroup>`, not just css.
 *
 * ```jsx
 * import TransitionGroup from 'react-transition-group/TransitionGroup';
 *
 * class TodoList extends React.Component {
 *   constructor(props) {
 *     super(props)
 *     this.state = {items: ['hello', 'world', 'click', 'me']}
 *   }
 *   handleAdd() {
 *     const newItems = this.state.items.concat([
 *       prompt('Enter some text')
 *     ]);
 *     this.setState({ items: newItems });
 *   }
 *   handleRemove(i) {
 *     let newItems = this.state.items.slice();
 *     newItems.splice(i, 1);
 *     this.setState({items: newItems});
 *   }
 *   render() {
 *     return (
 *       <div>
 *         <button onClick={() => this.handleAdd()}>Add Item</button>
 *         <TransitionGroup>
 *           {this.state.items.map((item, i) => (
 *             <FadeTransition key={item}>
 *               <div>
 *                 {item}{' '}
 *                 <button onClick={() => this.handleRemove(i)}>
 *                   remove
 *                 </button>
 *               </div>
 *             </FadeTransition>
 *           ))}
 *         </TransitionGroup>
 *       </div>
 *     );
 *   }
 * }
 * ```
 *
 * Note that `<TransitionGroup>`  does not define any animation behavior!
 * Exactly _how_ a list item animates is up to the individual `<Transition>`
 * components. This means you can mix and match animations across different
 * list items.
 */

var TransitionGroup = function (_React$Component) {
  _inherits(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    _classCallCheck(this, TransitionGroup);

    // Initial children should all be entering, dependent on appear
    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.handleExited = function (key, node, originalHandler) {
      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (key in currentChildMapping) return;

      if (originalHandler) originalHandler(node);

      _this.setState(function (state) {
        var children = _extends({}, state.children);

        delete children[key];
        return { children: children };
      });
    };

    _this.state = {
      children: (0, _ChildMapping.getChildMapping)(props.children, function (child) {
        var onExited = function onExited(node) {
          _this.handleExited(child.key, node, child.props.onExited);
        };

        return (0, _react.cloneElement)(child, {
          onExited: onExited,
          in: true,
          appear: _this.getProp(child, 'appear'),
          enter: _this.getProp(child, 'enter'),
          exit: _this.getProp(child, 'exit')
        });
      })
    };
    return _this;
  }

  TransitionGroup.prototype.getChildContext = function getChildContext() {
    return {
      transitionGroup: { isMounting: !this.appeared }
    };
  };
  // use child config unless explictly set by the Group


  TransitionGroup.prototype.getProp = function getProp(child, prop) {
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props;

    return props[prop] != null ? props[prop] : child.props[prop];
  };

  TransitionGroup.prototype.componentDidMount = function componentDidMount() {
    this.appeared = true;
  };

  TransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    var prevChildMapping = this.state.children;
    var nextChildMapping = (0, _ChildMapping.getChildMapping)(nextProps.children);

    var children = (0, _ChildMapping.mergeChildMappings)(prevChildMapping, nextChildMapping);

    Object.keys(children).forEach(function (key) {
      var child = children[key];

      if (!(0, _react.isValidElement)(child)) return;

      var onExited = function onExited(node) {
        _this2.handleExited(child.key, node, child.props.onExited);
      };

      var hasPrev = key in prevChildMapping;
      var hasNext = key in nextChildMapping;

      var prevChild = prevChildMapping[key];
      var isLeaving = (0, _react.isValidElement)(prevChild) && !prevChild.props.in;

      // item is new (entering)
      if (hasNext && (!hasPrev || isLeaving)) {
        // console.log('entering', key)
        children[key] = (0, _react.cloneElement)(child, {
          onExited: onExited,
          in: true,
          exit: _this2.getProp(child, 'exit', nextProps),
          enter: _this2.getProp(child, 'enter', nextProps)
        });
      }
      // item is old (exiting)
      else if (!hasNext && hasPrev && !isLeaving) {
          // console.log('leaving', key)
          children[key] = (0, _react.cloneElement)(child, { in: false });
        }
        // item hasn't changed transition states
        // copy over the last transition props;
        else if (hasNext && hasPrev && (0, _react.isValidElement)(prevChild)) {
            // console.log('unchanged', key)
            children[key] = (0, _react.cloneElement)(child, {
              onExited: onExited,
              in: prevChild.props.in,
              exit: _this2.getProp(child, 'exit', nextProps),
              enter: _this2.getProp(child, 'enter', nextProps)
            });
          }
    });

    this.setState({ children: children });
  };

  TransitionGroup.prototype.render = function render() {
    var _props = this.props,
        Component = _props.component,
        childFactory = _props.childFactory,
        props = _objectWithoutProperties(_props, ['component', 'childFactory']);

    var children = this.state.children;


    delete props.appear;
    delete props.enter;
    delete props.exit;

    return _react2.default.createElement(
      Component,
      props,
      values(children).map(childFactory)
    );
  };

  return TransitionGroup;
}(_react2.default.Component);

TransitionGroup.childContextTypes = {
  transitionGroup: _propTypes2.default.object.isRequired
};


TransitionGroup.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
TransitionGroup.defaultProps = defaultProps;

exports.default = TransitionGroup;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getChildMapping = getChildMapping;
exports.mergeChildMappings = mergeChildMappings;

var _react = __webpack_require__(0);

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */
function getChildMapping(children, mapFn) {
  var mapper = function mapper(child) {
    return mapFn && (0, _react.isValidElement)(child) ? mapFn(child) : child;
  };

  var result = Object.create(null);
  if (children) _react.Children.map(children, function (c) {
    return c;
  }).forEach(function (child) {
    // run the map function here instead so that the key is the computed one
    result[child.key] = mapper(child);
  });
  return result;
}

/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  }

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextKeysPending = Object.create(null);

  var pendingKeys = [];
  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i = void 0;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }

  // Finally, add the keys which didn't appear before any key in `next`
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DateTimePicker = __webpack_require__(44);

var _DateTimePicker2 = _interopRequireDefault(_DateTimePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  open: _propTypes2.default.bool,
  defaultOpen: _propTypes2.default.bool,
  onToggle: _propTypes2.default.func
};

var DatePicker = function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  function DatePicker(props, context) {
    _classCallCheck(this, DatePicker);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.handleToggle = function (open) {
      _this.toggleState = !!open;

      if (_this.props.onToggle) _this.props.onToggle(_this.toggleState);else _this.forceUpdate();
    };

    _this.toggleState = props.defaultOpen;
    return _this;
  }

  DatePicker.prototype.render = function render() {
    var open = this.props.open;

    open = open === undefined ? this.toggleState : open;

    return _react2.default.createElement(_DateTimePicker2.default, _extends({}, this.props, {
      time: false,
      open: open ? 'date' : open,
      onToggle: this.handleToggle
    }));
  };

  return DatePicker;
}(_react2.default.Component);

DatePicker.propTypes = propTypes;

exports.default = DatePicker;
module.exports = exports['default'];

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = deprecated;

var _warning = __webpack_require__(104);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var warned = {};

function deprecated(validator, reason) {
  return function validate(props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;

    if (props[propName] != null) {
      var messageKey = componentName + '.' + propName;

      (0, _warning2.default)(warned[messageKey], 'The ' + location + ' `' + propFullNameSafe + '` of ' + ('`' + componentNameSafe + '` is deprecated. ' + reason + '.'));

      warned[messageKey] = true;
    }

    for (var _len = arguments.length, args = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
      args[_key - 5] = arguments[_key];
    }

    return validator.apply(undefined, [props, propName, componentName, location, propFullName].concat(args));
  };
}

/* eslint-disable no-underscore-dangle */
function _resetWarned() {
  warned = {};
}

deprecated._resetWarned = _resetWarned;
/* eslint-enable no-underscore-dangle */

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (process.env.NODE_ENV !== 'production') {
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

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _Input = __webpack_require__(43);

var _Input2 = _interopRequireDefault(_Input);

var _localizers = __webpack_require__(6);

var _PropTypes = __webpack_require__(3);

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

var _Props = __webpack_require__(4);

var Props = _interopRequireWildcard(_Props);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTimePickerInput = (_temp = _class = function (_React$Component) {
  _inherits(DateTimePickerInput, _React$Component);

  function DateTimePickerInput() {
    _classCallCheck(this, DateTimePickerInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _initialiseProps.call(_this);

    var _this$props = _this.props,
        value = _this$props.value,
        editing = _this$props.editing,
        editFormat = _this$props.editFormat,
        format = _this$props.format,
        culture = _this$props.culture;


    _this.state = {
      textValue: formatDate(value, editing && editFormat ? editFormat : format, culture)
    };
    return _this;
  }

  DateTimePickerInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var value = nextProps.value,
        editing = nextProps.editing,
        editFormat = nextProps.editFormat,
        format = nextProps.format,
        culture = nextProps.culture;


    this.setState({
      textValue: formatDate(value, editing && editFormat ? editFormat : format, culture)
    });
  };

  DateTimePickerInput.prototype.render = function render() {
    var _props = this.props,
        disabled = _props.disabled,
        readOnly = _props.readOnly;
    var textValue = this.state.textValue;


    var props = Props.omitOwn(this);

    return _react2.default.createElement(_Input2.default, _extends({}, props, {
      type: 'text',
      className: 'rw-widget-input',
      value: textValue,
      disabled: disabled,
      readOnly: readOnly,
      onChange: this.handleChange,
      onBlur: this.handleBlur
    }));
  };

  DateTimePickerInput.prototype.focus = function focus() {
    (0, _reactDom.findDOMNode)(this).focus();
  };

  return DateTimePickerInput;
}(_react2.default.Component), _class.propTypes = {
  format: CustomPropTypes.dateFormat.isRequired,
  editing: _propTypes2.default.bool,
  editFormat: CustomPropTypes.dateFormat,
  parse: _propTypes2.default.func.isRequired,

  value: _propTypes2.default.instanceOf(Date),
  onChange: _propTypes2.default.func.isRequired,
  onBlur: _propTypes2.default.func,
  culture: _propTypes2.default.string,

  disabled: CustomPropTypes.disabled,
  readOnly: CustomPropTypes.disabled
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleChange = function (_ref) {
    var value = _ref.target.value;

    _this2._needsFlush = true;
    _this2.setState({ textValue: value });
  };

  this.handleBlur = function (event) {
    var _props2 = _this2.props,
        format = _props2.format,
        culture = _props2.culture,
        parse = _props2.parse,
        onChange = _props2.onChange,
        onBlur = _props2.onBlur;


    onBlur && onBlur(event);

    if (_this2._needsFlush) {
      var date = parse(event.target.value);

      _this2._needsFlush = false;
      onChange(date, formatDate(date, format, culture));
    }
  };
}, _temp);
exports.default = DateTimePickerInput;


function isValid(d) {
  return !isNaN(d.getTime());
}

function formatDate(date, format, culture) {
  var val = '';

  if (date instanceof Date && isValid(date)) val = _localizers.date.format(date, format, culture);

  return val;
}
module.exports = exports['default'];

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactComponentManagers = __webpack_require__(9);

var _List = __webpack_require__(23);

var _List2 = _interopRequireDefault(_List);

var _dates = __webpack_require__(14);

var _dates2 = _interopRequireDefault(_dates);

var _listDataManager = __webpack_require__(20);

var _listDataManager2 = _interopRequireDefault(_listDataManager);

var _localizers = __webpack_require__(6);

var _PropTypes = __webpack_require__(3);

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

var _Props = __webpack_require__(4);

var Props = _interopRequireWildcard(_Props);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var format = function format(props) {
  return _localizers.date.getFormat('time', props.format);
};

var TimeList = (_temp = _class = function (_React$Component) {
  _inherits(TimeList, _React$Component);

  function TimeList() {
    _classCallCheck(this, TimeList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _this.handleKeyDown = function (e) {
      var key = e.key;
      var focusedItem = _this.state.focusedItem;
      var list = _this.list;

      if (key === 'End') {
        e.preventDefault();
        _this.setState({ focusedItem: list.last() });
      } else if (key === 'Home') {
        e.preventDefault();
        _this.setState({ focusedItem: list.first() });
      } else if (key === 'Enter') {
        _this.props.onSelect(focusedItem);
      } else if (key === 'ArrowDown') {
        e.preventDefault();
        _this.setState({ focusedItem: list.next(focusedItem) });
      } else if (key === 'ArrowUp') {
        e.preventDefault();
        _this.setState({ focusedItem: list.prev(focusedItem) });
      }
    };

    _this.handleKeyPress = function (e) {
      e.preventDefault();

      _this.search(String.fromCharCode(e.which), function (item) {
        !_this.unmounted && _this.setState({ focusedItem: item });
      });
    };

    _this.scrollTo = function () {
      _this.refs.list.move && _this.refs.list.move();
    };

    _this.accessors = {
      text: function text(item) {
        return item.label;
      },
      value: function value(item) {
        return item.date;
      }
    };

    _this.timeouts = (0, _reactComponentManagers.timeoutManager)(_this);
    _this.list = (0, _listDataManager2.default)(_this, {
      getListDataState: _List2.default.getListDataState,
      accessors: _this.accessors
    });

    _this.state = _this.getStateFromProps(_this.props);
    return _this;
  }

  TimeList.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromProps(nextProps));
  };

  TimeList.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unmounted = true;
  };

  TimeList.prototype.getStateFromProps = function getStateFromProps() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
    var value = props.value,
        currentDate = props.currentDate;

    var data = this.getDates(props);
    var selectedItem = this.getClosestDate(data, value || currentDate);

    this.list.setData(data);

    return {
      dates: data,
      selectedItem: this.list.nextEnabled(selectedItem),
      focusedItem: this.list.nextEnabled(selectedItem || data[0])
    };
  };

  TimeList.prototype.render = function render() {
    var onSelect = this.props.onSelect;
    var _state = this.state,
        selectedItem = _state.selectedItem,
        focusedItem = _state.focusedItem;


    var props = Props.omitOwn(this);
    var listProps = this.list.defaultProps();

    return _react2.default.createElement(_List2.default, _extends({
      ref: 'list'
    }, props, listProps, {
      onSelect: onSelect,
      textAccessor: this.accessors.text,
      valueAccessor: this.accessors.value,
      selectedItem: selectedItem,
      focusedItem: focusedItem
    }));
  };

  TimeList.prototype.getClosestDate = function getClosestDate(times, date) {
    var roundTo = 1000 * 60 * this.props.step,
        inst = null,
        label;

    if (!date) return null;

    date = new Date(Math.floor(date.getTime() / roundTo) * roundTo);
    label = _localizers.date.format(date, format(this.props), this.props.culture);

    times.some(function (time) {
      if (time.label === label) return inst = time;
    });

    return inst;
  };

  TimeList.prototype.getDates = function getDates() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

    var times = [];
    var values = this.getBounds(props);
    var start = values.min;
    var startDay = _dates2.default.date(start);

    while (_dates2.default.date(start) === startDay && _dates2.default.lte(start, values.max)) {
      times.push({
        date: start,
        label: _localizers.date.format(start, format(props), props.culture)
      });
      start = _dates2.default.add(start, props.step || 30, 'minutes');
    }
    return times;
  };

  TimeList.prototype.getBounds = function getBounds(props) {
    var value = props.value || props.currentDate || _dates2.default.today(),
        useDate = props.preserveDate,
        min = props.min,
        max = props.max,
        start,
        end;

    //compare just the time regradless of whether they fall on the same day
    if (!useDate) {
      start = _dates2.default.startOf(_dates2.default.merge(new Date(), min, props.currentDate), 'minutes');
      end = _dates2.default.startOf(_dates2.default.merge(new Date(), max, props.currentDate), 'minutes');

      if (_dates2.default.lte(end, start) && _dates2.default.gt(max, min, 'day')) end = _dates2.default.tomorrow();

      return {
        min: start,
        max: end
      };
    }

    start = _dates2.default.today();
    end = _dates2.default.tomorrow();
    //date parts are equal
    return {
      min: _dates2.default.eq(value, min, 'day') ? _dates2.default.merge(start, min, props.currentDate) : start,
      max: _dates2.default.eq(value, max, 'day') ? _dates2.default.merge(start, max, props.currentDate) : end
    };
  };

  TimeList.prototype.search = function search(character, cb) {
    var _this2 = this;

    var word = ((this._searchTerm || '') + character).toLowerCase();

    this._searchTerm = word;
    this.timeouts.set('search', function () {
      var item = _this2.list.next(_this2.state.focusedItem, word);

      _this2._searchTerm = '';
      if (item) cb(item);
    }, this.props.delay);
  };

  return TimeList;
}(_react2.default.Component), _class.propTypes = {
  value: _propTypes2.default.instanceOf(Date),
  step: _propTypes2.default.number,
  min: _propTypes2.default.instanceOf(Date),
  max: _propTypes2.default.instanceOf(Date),
  currentDate: _propTypes2.default.instanceOf(Date),

  itemComponent: CustomPropTypes.elementType,
  format: CustomPropTypes.dateFormat,
  onSelect: _propTypes2.default.func,
  preserveDate: _propTypes2.default.bool,
  culture: _propTypes2.default.string,
  delay: _propTypes2.default.number
}, _class.defaultProps = {
  step: 30,
  onSelect: function onSelect() {},
  min: new Date(1900, 0, 1),
  max: new Date(2099, 11, 31),
  preserveDate: true,
  delay: 300
}, _temp);
exports.default = TimeList;
module.exports = exports['default'];

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DateTimePicker = __webpack_require__(44);

var _DateTimePicker2 = _interopRequireDefault(_DateTimePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  open: _propTypes2.default.bool,
  defaultOpen: _propTypes2.default.bool,
  onToggle: _propTypes2.default.func
};

var TimePicker = function (_React$Component) {
  _inherits(TimePicker, _React$Component);

  function TimePicker(props, context) {
    _classCallCheck(this, TimePicker);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.handleToggle = function (open) {
      _this.toggleState = !!open;

      if (_this.props.onToggle) _this.props.onToggle(_this.toggleState);else _this.forceUpdate();
    };

    _this.toggleState = props.defaultOpen;
    return _this;
  }

  TimePicker.prototype.render = function render() {
    var open = this.props.open;

    open = open === undefined ? this.toggleState : open;

    return _react2.default.createElement(_DateTimePicker2.default, _extends({}, this.props, {
      date: false,
      open: open ? 'time' : open,
      onToggle: this.handleToggle
    }));
  };

  return TimePicker;
}(_react2.default.Component);

TimePicker.propTypes = propTypes;

exports.default = TimePicker;
module.exports = exports['default'];

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp;

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _uncontrollable = __webpack_require__(15);

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _Widget = __webpack_require__(16);

var _Widget2 = _interopRequireDefault(_Widget);

var _WidgetPicker = __webpack_require__(21);

var _WidgetPicker2 = _interopRequireDefault(_WidgetPicker);

var _Select = __webpack_require__(22);

var _Select2 = _interopRequireDefault(_Select);

var _NumberInput = __webpack_require__(109);

var _NumberInput2 = _interopRequireDefault(_NumberInput);

var _Button = __webpack_require__(19);

var _Button2 = _interopRequireDefault(_Button);

var _messages = __webpack_require__(12);

var _Props = __webpack_require__(4);

var Props = _interopRequireWildcard(_Props);

var _focusManager = __webpack_require__(17);

var _focusManager2 = _interopRequireDefault(_focusManager);

var _interaction = __webpack_require__(13);

var _widgetHelpers = __webpack_require__(10);

var _PropTypes = __webpack_require__(3);

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

var _constants = __webpack_require__(35);

var _withRightToLeft = __webpack_require__(18);

var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);

var _localizers = __webpack_require__(6);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var format = function format(props) {
  return _localizers.number.getFormat('default', props.format);
};

// my tests in ie11/chrome/FF indicate that keyDown repeats
// at about 35ms+/- 5ms after an initial 500ms delay. callback fires on the leading edge
function createInterval(callback) {
  var _fn = void 0;
  var id,
      cancel = function cancel() {
    return clearTimeout(id);
  };

  id = setTimeout(_fn = function fn() {
    id = setTimeout(_fn, 35);
    callback(); //fire after everything in case the user cancels on the first call
  }, 500);

  return cancel;
}

function clamp(value, min, max) {
  max = max == null ? Infinity : max;
  min = min == null ? -Infinity : min;

  if (value == null || value === '') return null;

  return Math.max(Math.min(value, max), min);
}

/**
 * ---
 * localized: true,
 * shortcuts:
 *   - { key: down arrow, label: decrement value }
 *   - { key: up arrow, label: increment value }
 *   - { key: home, label: set value to minimum value, if finite }
 *   - { key: end, label: set value to maximum value, if finite }
 * ---
 *
 * @public
 */

var NumberPicker = (0, _withRightToLeft2.default)(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
  _inherits(NumberPicker, _React$Component);

  function NumberPicker() {
    _classCallCheck(this, NumberPicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _initDefineProp(_this, 'handleMouseDown', _descriptor, _this);

    _initDefineProp(_this, 'handleMouseUp', _descriptor2, _this);

    _initDefineProp(_this, 'handleKeyDown', _descriptor3, _this);

    _this.handleChange = function (rawValue) {
      var originalEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          lastValue = _this$props.value,
          min = _this$props.min,
          max = _this$props.max;


      var nextValue = clamp(rawValue, min, max);

      if (lastValue !== nextValue) (0, _widgetHelpers.notify)(onChange, [nextValue, {
        rawValue: rawValue,
        lastValue: lastValue,
        originalEvent: originalEvent
      }]);
    };

    _this.messages = (0, _messages.getMessages)(_this.props.messages);
    _this.focusManager = (0, _focusManager2.default)(_this, {
      willHandle: function willHandle(focused) {
        if (focused) _this.focus();
      }
    });

    _this.state = {
      focused: false
    };
    return _this;
  }

  NumberPicker.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
    var messages = _ref.messages;

    this.messages = (0, _messages.getMessages)(messages);
  };

  NumberPicker.prototype.renderInput = function renderInput(value) {
    var _props = this.props,
        placeholder = _props.placeholder,
        autoFocus = _props.autoFocus,
        tabIndex = _props.tabIndex,
        parse = _props.parse,
        name = _props.name,
        onKeyPress = _props.onKeyPress,
        onKeyUp = _props.onKeyUp,
        min = _props.min,
        max = _props.max,
        disabled = _props.disabled,
        readOnly = _props.readOnly,
        inputProps = _props.inputProps,
        format = _props.format,
        culture = _props.culture;


    return _react2.default.createElement(_NumberInput2.default, _extends({}, inputProps, {
      ref: 'input',
      role: 'spinbutton',
      tabIndex: tabIndex,
      value: value,
      placeholder: placeholder,
      autoFocus: autoFocus,
      editing: this.state.focused,
      format: format,
      culture: culture,
      parse: parse,
      name: name,
      min: min,
      max: max,
      disabled: disabled,
      readOnly: readOnly,
      onChange: this.handleChange,
      onKeyPress: onKeyPress,
      onKeyUp: onKeyUp
    }));
  };

  NumberPicker.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props,
        className = _props2.className,
        disabled = _props2.disabled,
        readOnly = _props2.readOnly,
        value = _props2.value,
        min = _props2.min,
        max = _props2.max;
    var focused = this.state.focused;

    var elementProps = Props.pickElementProps(this);

    value = clamp(value, min, max);

    return _react2.default.createElement(
      _Widget2.default,
      _extends({}, elementProps, {
        focused: focused,
        disabled: disabled,
        readOnly: readOnly,
        onKeyDown: this.handleKeyDown,
        onBlur: this.focusManager.handleBlur,
        onFocus: this.focusManager.handleFocus,
        className: (0, _classnames2.default)(className, 'rw-number-picker')
      }),
      _react2.default.createElement(
        _WidgetPicker2.default,
        null,
        this.renderInput(value),
        _react2.default.createElement(
          _Select2.default,
          { bordered: true },
          _react2.default.createElement(_Button2.default, {
            icon: 'caret-up',
            onClick: this.handleFocus,
            disabled: value === max || disabled,
            label: this.messages.increment({ value: value, min: min, max: max }),
            onMouseUp: function onMouseUp(e) {
              return _this2.handleMouseUp(_constants.directions.UP, e);
            },
            onMouseDown: function onMouseDown(e) {
              return _this2.handleMouseDown(_constants.directions.UP, e);
            },
            onMouseLeave: function onMouseLeave(e) {
              return _this2.handleMouseUp(_constants.directions.UP, e);
            }
          }),
          _react2.default.createElement(_Button2.default, {
            icon: 'caret-down',
            onClick: this.handleFocus,
            disabled: value === min || disabled,
            label: this.messages.decrement({ value: value, min: min, max: max }),
            onMouseUp: function onMouseUp(e) {
              return _this2.handleMouseUp(_constants.directions.DOWN, e);
            },
            onMouseDown: function onMouseDown(e) {
              return _this2.handleMouseDown(_constants.directions.DOWN, e);
            },
            onMouseLeave: function onMouseLeave(e) {
              return _this2.handleMouseUp(_constants.directions.DOWN, e);
            }
          })
        )
      )
    );
  };

  NumberPicker.prototype.focus = function focus() {
    (0, _reactDom.findDOMNode)(this.refs.input).focus();
  };

  NumberPicker.prototype.increment = function increment(event) {
    return this.step(this.props.step, event);
  };

  NumberPicker.prototype.decrement = function decrement(event) {
    return this.step(-this.props.step, event);
  };

  NumberPicker.prototype.step = function step(amount, event) {
    var value = (this.props.value || 0) + amount;

    var decimals = this.props.precision != null ? this.props.precision : _localizers.number.precision(format(this.props));

    this.handleChange(decimals != null ? round(value, decimals) : value, event);

    return value;
  };

  return NumberPicker;
}(_react2.default.Component), _class3.propTypes = {

  value: _propTypes2.default.number,

  /**
   * @example ['onChangePicker', [ [1, null] ]]
   */
  onChange: _propTypes2.default.func,

  /**
   * The minimum number that the NumberPicker value.
   * @example ['prop', ['min', 0]]
   */
  min: _propTypes2.default.number,

  /**
   * The maximum number that the NumberPicker value.
   *
   * @example ['prop', ['max', 0]]
   */
  max: _propTypes2.default.number,

  /**
   * Amount to increase or decrease value when using the spinner buttons.
   *
   * @example ['prop', ['step', 5]]
   */
  step: _propTypes2.default.number,

  /**
   * Specify how precise the `value` should be when typing, incrementing, or decrementing the value.
   * When empty, precision is parsed from the current `format` and culture.
   */
  precision: _propTypes2.default.number,

  culture: _propTypes2.default.string,

  /**
   * A format string used to display the number value. Localizer dependent, read [localization](/i18n) for more info.
   *
   * @example ['prop', { max: 1, min: -1 , defaultValue: 0.2585, format: "{ style: 'percent' }" }]
   */
  format: CustomPropTypes.numberFormat,

  /**
   * Determines how the NumberPicker parses a number from the localized string representation.
   * You can also provide a parser `function` to pair with a custom `format`.
   */
  parse: _propTypes2.default.func,

  /** @ignore */
  tabIndex: _propTypes2.default.any,
  name: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  onKeyDown: _propTypes2.default.func,
  onKeyPress: _propTypes2.default.func,
  onKeyUp: _propTypes2.default.func,
  autoFocus: _propTypes2.default.bool,
  disabled: CustomPropTypes.disabled,
  readOnly: CustomPropTypes.disabled,

  inputProps: _propTypes2.default.object,
  messages: _propTypes2.default.shape({
    increment: _propTypes2.default.string,
    decrement: _propTypes2.default.string
  })
}, _class3.defaultProps = {
  value: null,
  open: false,

  min: -Infinity,
  max: Infinity,
  step: 1
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'handleMouseDown', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (direction, event) {
      var _props3 = _this3.props,
          min = _props3.min,
          max = _props3.max;


      event && event.persist();

      var method = direction === _constants.directions.UP ? _this3.increment : _this3.decrement;

      var value = method.call(_this3, event),
          atTop = direction === _constants.directions.UP && value === max,
          atBottom = direction === _constants.directions.DOWN && value === min;

      if (atTop || atBottom) _this3.handleMouseUp();else if (!_this3._cancelRepeater) {
        _this3._cancelRepeater = createInterval(function () {
          _this3.handleMouseDown(direction, event);
        });
      }
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'handleMouseUp', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function () {
      _this4._cancelRepeater && _this4._cancelRepeater();
      _this4._cancelRepeater = null;
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (event) {
      var _props4 = _this5.props,
          min = _props4.min,
          max = _props4.max,
          onKeyDown = _props4.onKeyDown;

      var key = event.key;

      (0, _widgetHelpers.notify)(onKeyDown, [event]);

      if (event.defaultPrevented) return;

      if (key === 'End' && isFinite(max)) _this5.handleChange(max, event);else if (key === 'Home' && isFinite(min)) _this5.handleChange(min, event);else if (key === 'ArrowDown') {
        event.preventDefault();
        _this5.decrement(event);
      } else if (key === 'ArrowUp') {
        event.preventDefault();
        _this5.increment(event);
      }
    };
  }
})), _class2)) || _class;

exports.default = (0, _uncontrollable2.default)(NumberPicker, {
  value: 'onChange'
}, ['focus']);

// thank you kendo ui core
// https://github.com/telerik/kendo-ui-core/blob/master/src/kendo.core.js#L1036

function round(value, precision) {
  precision = precision || 0;

  value = ('' + value).split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? +value[1] + precision : precision)));

  value = ('' + value).split('e');
  value = +(value[0] + 'e' + (value[1] ? +value[1] - precision : -precision));

  return value.toFixed(precision);
}
module.exports = exports['default'];

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _inDOM = __webpack_require__(11);

var _inDOM2 = _interopRequireDefault(_inDOM);

var _activeElement = __webpack_require__(27);

var _activeElement2 = _interopRequireDefault(_activeElement);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _Input = __webpack_require__(43);

var _Input2 = _interopRequireDefault(_Input);

var _Props = __webpack_require__(4);

var Props = _interopRequireWildcard(_Props);

var _PropTypes = __webpack_require__(3);

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

var _localizers = __webpack_require__(6);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getFormat = function getFormat(props) {
  return _localizers.number.getFormat('default', props.format);
};

var isSign = function isSign(val) {
  return (val || '').trim() === '-';
};

function isPaddedZeros(str, culture) {
  var localeChar = _localizers.number.decimalChar(null, culture);

  var _str$split = str.split(localeChar),
      _ = _str$split[0],
      decimals = _str$split[1];

  return !!(decimals && decimals.match(/0+$/));
}

function isAtDelimiter(num, str, culture) {
  var localeChar = _localizers.number.decimalChar(null, culture),
      lastIndex = str.length - 1,
      char = void 0;

  if (str.length < 1) return false;

  char = str[lastIndex];

  return !!(char === localeChar && str.indexOf(char) === lastIndex);
}

var NumberPickerInput = (_temp = _class = function (_React$Component) {
  _inherits(NumberPickerInput, _React$Component);

  function NumberPickerInput() {
    _classCallCheck(this, NumberPickerInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _this.handleChange = function (event) {
      var _this$props = _this.props,
          value = _this$props.value,
          onChange = _this$props.onChange;


      var stringValue = event.target.value,
          numberValue = _this.parseNumber(stringValue);

      var isIntermediate = _this.isIntermediateValue(numberValue, stringValue);

      if (stringValue == null || stringValue.trim() === '') {
        _this.setStringValue('');
        onChange(null, event);

        return;
      }
      // order here matters a lot
      if (isIntermediate) {
        _this.setStringValue(stringValue);
      } else if (numberValue !== value) {
        onChange(numberValue, event);
      } else if (stringValue != _this.state.stringValue) {
        _this.setStringValue(stringValue);
      }
    };

    _this.handleBlur = function (event) {
      var str = _this.state.stringValue,
          number = _this.parseNumber(str);

      // if number is below the min
      // we need to flush low values and decimal stops, onBlur means i'm done inputing
      if (_this.isIntermediateValue(number, str)) {
        if (isNaN(number)) {
          number = null;
        }
        _this.props.onChange(number, event);
      }
    };

    _this.state = _this.getDefaultState();
    return _this;
  }

  NumberPickerInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (_inDOM2.default) {
      this.tabbedSelection = this.isSelectingAllText();
    }
    this.setState(this.getDefaultState(nextProps));
  };

  NumberPickerInput.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.tabbedSelection && !prevProps.editing && this.props.editing) {
      (0, _reactDom.findDOMNode)(this).select();
    }
  };

  NumberPickerInput.prototype.getDefaultState = function getDefaultState() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
    var value = props.value,
        culture = props.culture,
        editing = props.editing;


    var decimal = _localizers.number.decimalChar(null, culture),
        format = getFormat(props);

    if (value == null || isNaN(value)) value = '';else value = editing ? ('' + value).replace('.', decimal) : _localizers.number.format(value, format, culture);

    return {
      stringValue: '' + value
    };
  };

  NumberPickerInput.prototype.isSelectingAllText = function isSelectingAllText() {
    var node = (0, _reactDom.findDOMNode)(this);
    return (0, _activeElement2.default)() === node && node.selectionStart === 0 && node.selectionEnd === node.value.length;
  };

  NumberPickerInput.prototype.parseNumber = function parseNumber(strVal) {
    var _props = this.props,
        culture = _props.culture,
        userParse = _props.parse;


    var delimChar = _localizers.number.decimalChar(null, culture);

    if (userParse) return userParse(strVal, culture);

    strVal = strVal.replace(delimChar, '.');
    strVal = parseFloat(strVal);

    return strVal;
  };

  NumberPickerInput.prototype.isIntermediateValue = function isIntermediateValue(num, str) {
    var _props2 = this.props,
        culture = _props2.culture,
        min = _props2.min;


    return !!(num < min || isSign(str) || isAtDelimiter(num, str, culture) || isPaddedZeros(str, culture));
  };

  // this intermediate state is for when one runs into
  // the decimal or are typing the number


  NumberPickerInput.prototype.setStringValue = function setStringValue(stringValue) {
    this.setState({ stringValue: stringValue });
  };

  NumberPickerInput.prototype.render = function render() {
    var _props3 = this.props,
        disabled = _props3.disabled,
        readOnly = _props3.readOnly,
        placeholder = _props3.placeholder,
        min = _props3.min,
        max = _props3.max;


    var value = this.state.stringValue;
    var props = Props.omitOwn(this);

    return _react2.default.createElement(_Input2.default, _extends({}, props, {
      className: 'rw-widget-input',
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      'aria-valuenow': value,
      'aria-valuemin': isFinite(min) ? min : null,
      'aria-valuemax': isFinite(max) ? max : null,
      disabled: disabled,
      readOnly: readOnly,
      placeholder: placeholder,
      value: value
    }));
  };

  return NumberPickerInput;
}(_react2.default.Component), _class.propTypes = {
  value: _propTypes2.default.number,
  editing: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,

  format: CustomPropTypes.numberFormat,

  parse: _propTypes2.default.func,
  culture: _propTypes2.default.string,

  min: _propTypes2.default.number,
  max: _propTypes2.default.number,

  disabled: CustomPropTypes.disabled,
  readOnly: CustomPropTypes.disabled,

  onChange: _propTypes2.default.func.isRequired
}, _class.defaultProps = {
  value: null,
  editing: false
}, _temp);
exports.default = NumberPickerInput;
module.exports = exports['default'];

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

var _closest = __webpack_require__(111);

var _closest2 = _interopRequireDefault(_closest);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _uncontrollable = __webpack_require__(15);

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _Widget = __webpack_require__(16);

var _Widget2 = _interopRequireDefault(_Widget);

var _WidgetPicker = __webpack_require__(21);

var _WidgetPicker2 = _interopRequireDefault(_WidgetPicker);

var _Select = __webpack_require__(22);

var _Select2 = _interopRequireDefault(_Select);

var _Popup = __webpack_require__(29);

var _Popup2 = _interopRequireDefault(_Popup);

var _MultiselectInput = __webpack_require__(112);

var _MultiselectInput2 = _interopRequireDefault(_MultiselectInput);

var _MultiselectTagList = __webpack_require__(113);

var _MultiselectTagList2 = _interopRequireDefault(_MultiselectTagList);

var _List = __webpack_require__(23);

var _List2 = _interopRequireDefault(_List);

var _AddToListOption = __webpack_require__(59);

var _AddToListOption2 = _interopRequireDefault(_AddToListOption);

var _ = __webpack_require__(8);

var _Filter = __webpack_require__(32);

var Filter = _interopRequireWildcard(_Filter);

var _Props = __webpack_require__(4);

var Props = _interopRequireWildcard(_Props);

var _messages = __webpack_require__(12);

var _PropTypes = __webpack_require__(3);

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

var _accessorManager = __webpack_require__(24);

var _accessorManager2 = _interopRequireDefault(_accessorManager);

var _focusManager = __webpack_require__(17);

var _focusManager2 = _interopRequireDefault(_focusManager);

var _listDataManager = __webpack_require__(20);

var _listDataManager2 = _interopRequireDefault(_listDataManager);

var _scrollManager = __webpack_require__(25);

var _scrollManager2 = _interopRequireDefault(_scrollManager);

var _withRightToLeft = __webpack_require__(18);

var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);

var _interaction = __webpack_require__(13);

var _widgetHelpers = __webpack_require__(10);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var CREATE_OPTION = {};
var ENTER = 13;

var INSERT = 'insert';
var REMOVE = 'remove';

var propTypes = _extends({}, Filter.propTypes, {

  data: _propTypes2.default.array,
  //-- controlled props --
  value: _propTypes2.default.array,

  /**
   * @type {function (
   *  dataItems: ?any[],
   *  metadata: {
   *    dataItem: any,
   *    action: 'insert' | 'remove',
   *    originalEvent: SyntheticEvent,
   *    lastValue: ?any[],
   *    searchTerm: ?string
   *  }
   * ): void}
   */
  onChange: _propTypes2.default.func,

  searchTerm: _propTypes2.default.string,
  /**
   * @type {function (
   *  searchTerm: ?string,
   *  metadata: {
   *    action: 'clear' | 'input',
   *    lastSearchTerm: ?string,
   *    originalEvent: SyntheticEvent,
   *  }
   * ): void}
   */
  onSearch: _propTypes2.default.func,

  open: _propTypes2.default.bool,
  onToggle: _propTypes2.default.func,
  //-------------------------------------------

  valueField: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,

  tagComponent: CustomPropTypes.elementType,
  itemComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,

  groupComponent: CustomPropTypes.elementType,
  groupBy: CustomPropTypes.accessor,

  allowCreate: _propTypes2.default.oneOf([true, false, 'onFilter']),

  /**
   *
   * @type { (dataItem: ?any, metadata: { originalEvent: SyntheticEvent }) => void }
   */
  onSelect: _propTypes2.default.func,

  /**
   * @type { (searchTerm: string) => void }
   */
  onCreate: _propTypes2.default.func,

  busy: _propTypes2.default.bool,
  dropUp: _propTypes2.default.bool,
  popupTransition: CustomPropTypes.elementType,

  inputProps: _propTypes2.default.object,
  listProps: _propTypes2.default.object,

  autoFocus: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,

  messages: _propTypes2.default.shape({
    open: CustomPropTypes.message,
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message,
    createOption: CustomPropTypes.message,

    tagsLabel: CustomPropTypes.message,
    selectedItems: CustomPropTypes.message,
    noneSelected: CustomPropTypes.message,
    removeLabel: CustomPropTypes.message
  })
});

/**
 * ---
 * shortcuts:
 *   - { key: left arrow, label: move focus to previous tag }
 *   - { key: right arrow, label: move focus to next tag }
 *   - { key: delete, deselect focused tag }
 *   - { key: backspace, deselect next tag }
 *   - { key: alt + up arrow, label: close Multiselect }
 *   - { key: down arrow, label: open Multiselect, and move focus to next item }
 *   - { key: up arrow, label: move focus to previous item }
 *   - { key: home, label: move focus to first item }
 *   - { key: end, label: move focus to last item }
 *   - { key: enter, label: select focused item }
 *   - { key: ctrl + enter, label: create new tag from current searchTerm }
 *   - { key: any key, label: search list for item starting with key }
 * ---
 *
 * A select listbox alternative.
 *
 * @public
 */

var Multiselect = (0, _withRightToLeft2.default)(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
  _inherits(Multiselect, _React$Component);

  function Multiselect() {
    _classCallCheck(this, Multiselect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _this.handleFocusDidChange = function (focused) {
      if (focused) return _this.focus();

      _this.close();
      _this.clearSearch();

      if (_this.refs.tagList) _this.setState({ focusedTag: null });
    };

    _this.handleDelete = function (dataItem, event) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          readOnly = _this$props.readOnly;


      if (disabled == true || readOnly) return;

      _this.focus();
      _this.change(dataItem, event, REMOVE);
    };

    _this.handleSearchKeyDown = function (e) {
      if (e.key === 'Backspace' && e.target.value && !_this._deletingText) _this._deletingText = true;
    };

    _this.handleSearchKeyUp = function (e) {
      if (e.key === 'Backspace' && _this._deletingText) _this._deletingText = false;
    };

    _this.handleInputChange = function (e) {
      _this.search(e.target.value, e, 'input');
      _this.open();
    };

    _initDefineProp(_this, 'handleClick', _descriptor, _this);

    _initDefineProp(_this, 'handleDoubleClick', _descriptor2, _this);

    _initDefineProp(_this, 'handleSelect', _descriptor3, _this);

    _initDefineProp(_this, 'handleCreate', _descriptor4, _this);

    _initDefineProp(_this, 'handleKeyDown', _descriptor5, _this);

    _this.messages = (0, _messages.getMessages)(_this.props.messages);

    _this.inputId = (0, _widgetHelpers.instanceId)(_this, '_input');
    _this.tagsId = (0, _widgetHelpers.instanceId)(_this, '_taglist');
    _this.notifyId = (0, _widgetHelpers.instanceId)(_this, '_notify_area');
    _this.listId = (0, _widgetHelpers.instanceId)(_this, '_listbox');
    _this.createId = (0, _widgetHelpers.instanceId)(_this, '_createlist_option');
    _this.activeTagId = (0, _widgetHelpers.instanceId)(_this, '_taglist_active_tag');
    _this.activeOptionId = (0, _widgetHelpers.instanceId)(_this, '_listbox_active_option');

    _this.list = (0, _listDataManager2.default)(_this);
    _this.tagList = (0, _listDataManager2.default)(_this, { getStateGetterFromProps: null });

    _this.accessors = (0, _accessorManager2.default)(_this);
    _this.handleScroll = (0, _scrollManager2.default)(_this);
    _this.focusManager = (0, _focusManager2.default)(_this, {
      didHandle: _this.handleFocusDidChange
    });

    _this.isDisabled = (0, _interaction.disabledManager)(_this);

    _this.state = _extends({
      focusedTag: null
    }, _this.getStateFromProps(_this.props));
    return _this;
  }

  Multiselect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.messages = (0, _messages.getMessages)(nextProps.messages);
    this.setState(this.getStateFromProps(nextProps));
  };

  Multiselect.prototype.getStateFromProps = function getStateFromProps(props) {
    var accessors = this.accessors,
        list = this.list,
        tagList = this.tagList;
    var data = props.data,
        searchTerm = props.searchTerm,
        minLength = props.minLength,
        caseSensitive = props.caseSensitive,
        filter = props.filter;


    var values = (0, _.makeArray)(props.value);
    var dataItems = values.map(function (item) {
      return accessors.findOrSelf(data, item);
    });

    data = data.filter(function (i) {
      return !values.some(function (v) {
        return accessors.matches(i, v);
      });
    });

    this._lengthWithoutValues = data.length;

    data = Filter.filter(data, {
      filter: filter,
      searchTerm: searchTerm,
      minLength: minLength,
      caseSensitive: caseSensitive,
      textField: accessors.text
    });

    list.setData(data);
    tagList.setData(dataItems);

    var _ref = this.state || {},
        focusedItem = _ref.focusedItem,
        focusedTag = _ref.focusedTag;

    return {
      data: data,
      dataItems: dataItems,
      focusedTag: list.nextEnabled(~dataItems.indexOf(focusedTag) ? focusedTag : null),
      focusedItem: list.nextEnabled(~data.indexOf(focusedItem) ? focusedItem : data[0])
    };
  };

  Multiselect.prototype.renderInput = function renderInput(ownedIds) {
    var _props = this.props,
        searchTerm = _props.searchTerm,
        maxLength = _props.maxLength,
        tabIndex = _props.tabIndex,
        busy = _props.busy,
        autoFocus = _props.autoFocus,
        inputProps = _props.inputProps,
        open = _props.open;
    var _state = this.state,
        focusedItem = _state.focusedItem,
        focusedTag = _state.focusedTag;


    var disabled = this.props.disabled === true;
    var readOnly = this.props.readOnly === true;

    var active = void 0;

    if (!open) active = focusedTag ? this.activeTagId : '';else if (focusedItem || this.allowCreate()) active = this.activeOptionId;

    return _react2.default.createElement(_MultiselectInput2.default, _extends({
      ref: 'input'
    }, inputProps, {
      autoFocus: autoFocus,
      tabIndex: tabIndex || 0,
      role: 'listbox',
      'aria-expanded': !!open,
      'aria-busy': !!busy,
      'aria-owns': ownedIds,
      'aria-haspopup': true,
      'aria-activedescendant': active || null,
      value: searchTerm,
      maxLength: maxLength,
      disabled: disabled,
      readOnly: readOnly,
      placeholder: this.getPlaceholder(),
      onKeyDown: this.handleSearchKeyDown,
      onKeyUp: this.handleSearchKeyUp,
      onChange: this.handleInputChange
    }));
  };

  Multiselect.prototype.renderList = function renderList(messages) {
    var inputId = this.inputId,
        activeOptionId = this.activeOptionId,
        listId = this.listId,
        accessors = this.accessors;
    var open = this.props.open;
    var focusedItem = this.state.focusedItem;


    var List = this.props.listComponent;
    var props = this.list.defaultProps();

    return _react2.default.createElement(List, _extends({}, props, {
      ref: 'list',
      id: listId,
      activeId: activeOptionId,
      valueAccessor: accessors.value,
      textAccessor: accessors.text,
      focusedItem: focusedItem,
      onSelect: this.handleSelect,
      onMove: this.handleScroll,
      'aria-live': 'polite',
      'aria-labelledby': inputId,
      'aria-hidden': !open,
      messages: {
        emptyList: this._lengthWithoutValues ? messages.emptyFilter : messages.emptyList
      }
    }));
  };

  Multiselect.prototype.renderNotificationArea = function renderNotificationArea(messages) {
    var _this2 = this;

    var _state2 = this.state,
        focused = _state2.focused,
        dataItems = _state2.dataItems;


    var itemLabels = dataItems.map(function (item) {
      return _this2.accessors.text(item);
    });

    return _react2.default.createElement(
      'span',
      {
        id: this.notifyId,
        role: 'status',
        className: 'rw-sr',
        'aria-live': 'assertive',
        'aria-atomic': 'true',
        'aria-relevant': 'additions removals text'
      },
      focused && (dataItems.length ? messages.selectedItems(itemLabels) : messages.noneSelected())
    );
  };

  Multiselect.prototype.renderTags = function renderTags(messages) {
    var readOnly = this.props.readOnly;
    var _state3 = this.state,
        focusedTag = _state3.focusedTag,
        dataItems = _state3.dataItems;


    var Component = this.props.tagComponent;

    return _react2.default.createElement(_MultiselectTagList2.default, {
      ref: 'tagList',
      id: this.tagsId,
      activeId: this.activeTagId,
      textAccessor: this.accessors.text,
      valueAccessor: this.accessors.value,
      label: messages.tagsLabel(),
      value: dataItems,
      readOnly: readOnly,
      disabled: this.isDisabled(),
      focusedItem: focusedTag,
      onDelete: this.handleDelete,
      valueComponent: Component
    });
  };

  Multiselect.prototype.render = function render() {
    var _this3 = this;

    var _props2 = this.props,
        className = _props2.className,
        busy = _props2.busy,
        dropUp = _props2.dropUp,
        open = _props2.open,
        searchTerm = _props2.searchTerm,
        popupTransition = _props2.popupTransition;
    var _state4 = this.state,
        focused = _state4.focused,
        focusedItem = _state4.focusedItem,
        dataItems = _state4.dataItems;


    var elementProps = Props.pickElementProps(this);

    var shouldRenderTags = !!dataItems.length,
        shouldRenderPopup = (0, _widgetHelpers.isFirstFocusedRender)(this) || open,
        allowCreate = this.allowCreate();

    var inputOwns = this.listId + ' ' + this.notifyId + ' ' + (shouldRenderTags ? this.tagsId : '') + (allowCreate ? this.createId : '');

    var disabled = this.isDisabled() === true;
    var readOnly = this.props.readOnly === true;

    var messages = this.messages;

    return _react2.default.createElement(
      _Widget2.default,
      _extends({}, elementProps, {
        open: open,
        dropUp: dropUp,
        focused: focused,
        disabled: disabled,
        readOnly: readOnly,
        onKeyDown: this.handleKeyDown,
        onBlur: this.focusManager.handleBlur,
        onFocus: this.focusManager.handleFocus,
        className: (0, _classnames2.default)(className, 'rw-multiselect')
      }),
      this.renderNotificationArea(messages),
      _react2.default.createElement(
        _WidgetPicker2.default,
        {
          className: 'rw-widget-input',
          onClick: this.handleClick,
          onDoubleClick: this.handleDoubleClick,
          onTouchEnd: this.handleClick
        },
        _react2.default.createElement(
          'div',
          null,
          shouldRenderTags && this.renderTags(messages),
          this.renderInput(inputOwns)
        ),
        _react2.default.createElement(_Select2.default, {
          busy: busy,
          icon: focused ? 'caret-down' : '',
          'aria-hidden': 'true',
          role: 'presentational',
          disabled: disabled || readOnly
        })
      ),
      shouldRenderPopup && _react2.default.createElement(
        _Popup2.default,
        {
          dropUp: dropUp,
          open: open,
          transition: popupTransition,
          onEntering: function onEntering() {
            return _this3.refs.list.forceUpdate();
          }
        },
        _react2.default.createElement(
          'div',
          null,
          this.renderList(messages),
          allowCreate && _react2.default.createElement(
            _AddToListOption2.default,
            {
              id: this.createId,
              searchTerm: searchTerm,
              onSelect: this.handleCreate,
              focused: !focusedItem || focusedItem === CREATE_OPTION
            },
            messages.createOption(this.props)
          )
        )
      )
    );
  };

  Multiselect.prototype.change = function change(dataItem, originalEvent, action) {
    var _props3 = this.props,
        onChange = _props3.onChange,
        searchTerm = _props3.searchTerm,
        lastValue = _props3.value;
    var dataItems = this.state.dataItems;


    switch (action) {
      case INSERT:
        dataItems = dataItems.concat(dataItem);
        break;
      case REMOVE:
        dataItems = dataItems.filter(function (d) {
          return d !== dataItem;
        });
        break;
    }

    (0, _widgetHelpers.notify)(onChange, [dataItems, {
      action: action,
      dataItem: dataItem,
      originalEvent: originalEvent,
      lastValue: lastValue,
      searchTerm: searchTerm
    }]);

    this.clearSearch(originalEvent);
  };

  Multiselect.prototype.clearSearch = function clearSearch(originalEvent) {
    this.search('', originalEvent, 'clear');
  };

  Multiselect.prototype.search = function search(searchTerm, originalEvent) {
    var action = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'input';
    var _props4 = this.props,
        onSearch = _props4.onSearch,
        lastSearchTerm = _props4.searchTerm;


    if (searchTerm !== lastSearchTerm) (0, _widgetHelpers.notify)(onSearch, [searchTerm, {
      action: action,
      lastSearchTerm: lastSearchTerm,
      originalEvent: originalEvent
    }]);
  };

  Multiselect.prototype.focus = function focus() {
    if (this.refs.input) this.refs.input.focus();
  };

  Multiselect.prototype.toggle = function toggle() {
    this.props.open ? this.close() : this.open();
  };

  Multiselect.prototype.open = function open() {
    if (!this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, true);
  };

  Multiselect.prototype.close = function close() {
    if (this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, false);
  };

  Multiselect.prototype.allowCreate = function allowCreate() {
    var _props5 = this.props,
        searchTerm = _props5.searchTerm,
        onCreate = _props5.onCreate,
        allowCreate = _props5.allowCreate;


    return !!(onCreate && (allowCreate === true || allowCreate === 'onFilter' && searchTerm) && !this.hasExtactMatch());
  };

  Multiselect.prototype.hasExtactMatch = function hasExtactMatch() {
    var _props6 = this.props,
        searchTerm = _props6.searchTerm,
        caseSensitive = _props6.caseSensitive;
    var _state5 = this.state,
        data = _state5.data,
        dataItems = _state5.dataItems;
    var text = this.accessors.text;


    var lower = function lower(text) {
      return caseSensitive ? text : text.toLowerCase();
    };
    var eq = function eq(v) {
      return lower(text(v)) === lower(searchTerm);
    };

    // if there is an exact match on textFields:
    // "john" => { name: "john" }, don't show
    return dataItems.some(eq) || data.some(eq);
  };

  Multiselect.prototype.getPlaceholder = function getPlaceholder() {
    var _props7 = this.props,
        value = _props7.value,
        placeholder = _props7.placeholder;

    return (value && value.length ? '' : placeholder) || '';
  };

  return Multiselect;
}(_react2.default.Component), _class3.propTypes = propTypes, _class3.defaultProps = {
  data: [],
  allowCreate: 'onFilter',
  filter: 'startsWith',
  value: [],
  searchTerm: '',
  listComponent: _List2.default
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'handleClick', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (_ref2) {
      var target = _ref2.target;

      _this4.focus();

      if ((0, _closest2.default)(target, '.rw-select')) _this4.toggle();else _this4.open();
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'handleDoubleClick', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function () {
      if (!_this5.refs.input) return;

      _this5.focus();
      _this5.refs.input.select();
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'handleSelect', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (dataItem, originalEvent) {
      if (dataItem === undefined || dataItem === CREATE_OPTION) {
        _this6.handleCreate(_this6.props.searchTerm, originalEvent);
        return;
      }

      (0, _widgetHelpers.notify)(_this6.props.onSelect, [dataItem, { originalEvent: originalEvent }]);

      _this6.change(dataItem, originalEvent, INSERT);
      _this6.focus();
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'handleCreate', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function () {
      var searchTerm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var event = arguments[1];

      (0, _widgetHelpers.notify)(_this7.props.onCreate, searchTerm);

      _this7.clearSearch(event);
      _this7.focus();
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this8 = this;

    return function (event) {
      var _props8 = _this8.props,
          open = _props8.open,
          searchTerm = _props8.searchTerm,
          onKeyDown = _props8.onKeyDown;
      var key = event.key,
          keyCode = event.keyCode,
          altKey = event.altKey,
          ctrlKey = event.ctrlKey;
      var _state6 = _this8.state,
          focusedTag = _state6.focusedTag,
          focusedItem = _state6.focusedItem;
      var list = _this8.list,
          tagList = _this8.tagList;


      var createIsFocused = focusedItem === CREATE_OPTION;
      var canCreate = _this8.allowCreate();

      var focusTag = function focusTag(tag) {
        return _this8.setState({ focusedTag: tag });
      };
      var focusItem = function focusItem(item) {
        return _this8.setState({ focusedItem: item, focusedTag: null });
      };

      (0, _widgetHelpers.notify)(onKeyDown, [event]);

      if (event.defaultPrevented) return;

      if (key === 'ArrowDown') {
        event.preventDefault();

        if (!open) return _this8.open();

        var next = list.next(focusedItem);
        var creating = createIsFocused || canCreate && focusedItem === next;

        focusItem(creating ? CREATE_OPTION : next);
      } else if (key === 'ArrowUp' && (open || altKey)) {
        event.preventDefault();

        if (altKey) return _this8.close();
        focusItem(createIsFocused ? list.last() : list.prev(focusedItem));
      } else if (key === 'End') {
        event.preventDefault();

        if (open) focusItem(list.last());else focusTag(tagList.last());
      } else if (key === 'Home') {
        event.preventDefault();
        if (open) focusItem(list.first());else focusTag(tagList.first());
      }
      // using keyCode to ignore enter for japanese IME
      else if (open && keyCode === ENTER) {
          event.preventDefault();

          if (ctrlKey && canCreate) return _this8.handleCreate(searchTerm, event);

          _this8.handleSelect(focusedItem, event);
        } else if (key === 'Escape') {
          open ? _this8.close() : tagList && focusTag(null);
        } else if (!searchTerm && !_this8._deletingText) {
          if (key === 'ArrowLeft') {
            focusTag(tagList.prev(focusedTag) || tagList.last());
          } else if (key === 'ArrowRight' && focusedTag) {
            var nextTag = tagList.next(focusedTag);
            focusTag(nextTag === focusedTag ? null : nextTag);
          } else if (key === 'Delete' && !tagList.isDisabled(focusedTag)) {
            _this8.handleDelete(focusedTag, event);
          } else if (key === 'Backspace') {
            _this8.handleDelete(tagList.last(), event);
          } else if (key === ' ' && !open) {
            event.preventDefault();
            _this8.open();
          }
        }
    };
  }
})), _class2)) || _class;

exports.default = (0, _uncontrollable2.default)(Multiselect, {
  open: 'onToggle',
  value: 'onChange',
  searchTerm: 'onSearch'
}, ['focus']);
module.exports = exports['default'];

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = closest;

var _matches = __webpack_require__(60);

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDoc = function isDoc(obj) {
  return obj != null && obj.nodeType === obj.DOCUMENT_NODE;
};

function closest(node, selector, context) {
  while (node && (isDoc(node) || !(0, _matches2.default)(node, selector))) {
    node = node !== context && !isDoc(node) ? node.parentNode : undefined;
  }
  return node;
}
module.exports = exports['default'];

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _activeElement = __webpack_require__(27);

var _activeElement2 = _interopRequireDefault(_activeElement);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _PropTypes = __webpack_require__(3);

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiselectInput = (_temp = _class = function (_React$Component) {
  _inherits(MultiselectInput, _React$Component);

  function MultiselectInput() {
    _classCallCheck(this, MultiselectInput);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  MultiselectInput.prototype.render = function render() {
    var _props = this.props,
        disabled = _props.disabled,
        readOnly = _props.readOnly,
        props = _objectWithoutProperties(_props, ['disabled', 'readOnly']);

    var size = Math.max((props.value || props.placeholder).length, 1) + 1;

    return _react2.default.createElement('input', _extends({}, props, {
      size: size,
      className: 'rw-input-reset',
      autoComplete: 'off',
      'aria-disabled': disabled,
      'aria-readonly': readOnly,
      disabled: disabled,
      readOnly: readOnly
    }));
  };

  MultiselectInput.prototype.select = function select() {
    (0, _reactDom.findDOMNode)(this).select();
  };

  MultiselectInput.prototype.focus = function focus() {
    var node = (0, _reactDom.findDOMNode)(this);

    if ((0, _activeElement2.default)() === node) return;
    node.focus();
  };

  return MultiselectInput;
}(_react2.default.Component), _class.propTypes = {
  value: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  maxLength: _propTypes2.default.number,
  onChange: _propTypes2.default.func.isRequired,

  disabled: CustomPropTypes.disabled,
  readOnly: CustomPropTypes.disabled
}, _temp);
exports.default = MultiselectInput;
module.exports = exports['default'];

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _class, _temp2;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MultiselectTag = __webpack_require__(114);

var _MultiselectTag2 = _interopRequireDefault(_MultiselectTag);

var _PropTypes = __webpack_require__(3);

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

var _dataHelpers = __webpack_require__(33);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// disabled === true || [1, 2, 3, etc]
var isDisabled = function isDisabled(item, list, value) {
  return !!(Array.isArray(list) ? ~(0, _dataHelpers.dataIndexOf)(list, item, value) : list);
};

var MultiselectTagList = (_temp2 = _class = function (_React$Component) {
  _inherits(MultiselectTagList, _React$Component);

  function MultiselectTagList() {
    var _temp, _this, _ret;

    _classCallCheck(this, MultiselectTagList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleDelete = function (item, event) {
      if (_this.props.disabled !== true) _this.props.onDelete(item, event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  MultiselectTagList.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        id = _props.id,
        value = _props.value,
        activeId = _props.activeId,
        valueAccessor = _props.valueAccessor,
        textAccessor = _props.textAccessor,
        label = _props.label,
        disabled = _props.disabled,
        focusedItem = _props.focusedItem,
        ValueComponent = _props.valueComponent;


    return _react2.default.createElement(
      'ul',
      {
        id: id,
        tabIndex: '-1',
        role: 'listbox',
        'aria-label': label,
        className: 'rw-multiselect-taglist'
      },
      value.map(function (item, i) {
        var isFocused = focusedItem === item;

        return _react2.default.createElement(
          _MultiselectTag2.default,
          {
            key: i,
            id: isFocused ? activeId : null,
            value: item,
            focused: isFocused,
            onClick: _this2.handleDelete,
            disabled: isDisabled(item, disabled, valueAccessor)
          },
          ValueComponent ? _react2.default.createElement(ValueComponent, { item: item }) : _react2.default.createElement(
            'span',
            null,
            textAccessor(item)
          )
        );
      })
    );
  };

  return MultiselectTagList;
}(_react2.default.Component), _class.propTypes = {
  id: _propTypes2.default.string.isRequired,
  activeId: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.string,

  value: _propTypes2.default.array,
  focusedItem: _propTypes2.default.any,

  valueAccessor: _propTypes2.default.func.isRequired,
  textAccessor: _propTypes2.default.func.isRequired,

  onDelete: _propTypes2.default.func.isRequired,
  valueComponent: _propTypes2.default.func,

  disabled: CustomPropTypes.disabled.acceptsArray
}, _temp2);
exports.default = MultiselectTagList;
module.exports = exports['default'];

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _class, _temp2;

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = __webpack_require__(19);

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiselectTag = (_temp2 = _class = function (_React$Component) {
  _inherits(MultiselectTag, _React$Component);

  function MultiselectTag() {
    var _temp, _this, _ret;

    _classCallCheck(this, MultiselectTag);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.onClick = function (event) {
      var _this$props = _this.props,
          value = _this$props.value,
          disabled = _this$props.disabled,
          onClick = _this$props.onClick;

      if (!disabled) onClick(value, event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  MultiselectTag.prototype.renderDelete = function renderDelete() {
    var _props = this.props,
        label = _props.label,
        disabled = _props.disabled,
        readOnly = _props.readOnly;


    return _react2.default.createElement(
      _Button2.default,
      {
        variant: 'select',
        onClick: this.onClick,
        className: 'rw-multiselect-tag-btn',
        disabled: disabled || readOnly,
        'aria-label': label || 'Remove item'
      },
      _react2.default.createElement(
        'span',
        { 'aria-hidden': 'true' },
        '\xD7'
      )
    );
  };

  MultiselectTag.prototype.render = function render() {
    var _props2 = this.props,
        id = _props2.id,
        children = _props2.children,
        focused = _props2.focused,
        disabled = _props2.disabled;

    var tabIndex = disabled ? undefined : '-1';

    return _react2.default.createElement(
      'li',
      {
        id: id,
        role: 'option',
        tabIndex: tabIndex,
        className: (0, _classnames2.default)('rw-multiselect-tag', disabled && 'rw-state-disabled', focused && !disabled && 'rw-state-focus')
      },
      children,
      _react2.default.createElement(
        'div',
        null,
        this.renderDelete()
      )
    );
  };

  return MultiselectTag;
}(_react2.default.Component), _class.propTypes = {
  id: _propTypes2.default.string,
  onClick: _propTypes2.default.func.isRequired,
  focused: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  value: _propTypes2.default.any
}, _temp2);
exports.default = MultiselectTag;
module.exports = exports['default'];

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _desc, _value, _class2, _descriptor, _descriptor2, _class3, _temp;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(2);

var _classnames2 = _interopRequireDefault(_classnames);

var _reactComponentManagers = __webpack_require__(9);

var _uncontrollable = __webpack_require__(15);

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _List = __webpack_require__(23);

var _List2 = _interopRequireDefault(_List);

var _Widget = __webpack_require__(16);

var _Widget2 = _interopRequireDefault(_Widget);

var _SelectListItem = __webpack_require__(116);

var _SelectListItem2 = _interopRequireDefault(_SelectListItem);

var _messages = __webpack_require__(12);

var _ = __webpack_require__(8);

var _Props = __webpack_require__(4);

var Props = _interopRequireWildcard(_Props);

var _PropTypes = __webpack_require__(3);

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

var _listDataManager = __webpack_require__(20);

var _listDataManager2 = _interopRequireDefault(_listDataManager);

var _accessorManager = __webpack_require__(24);

var _accessorManager2 = _interopRequireDefault(_accessorManager);

var _focusManager = __webpack_require__(17);

var _focusManager2 = _interopRequireDefault(_focusManager);

var _scrollManager = __webpack_require__(25);

var _scrollManager2 = _interopRequireDefault(_scrollManager);

var _withRightToLeft = __webpack_require__(18);

var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);

var _interaction = __webpack_require__(13);

var _widgetHelpers = __webpack_require__(10);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

function getFirstValue(data, values) {
  if (!values.length) return null;

  for (var idx = 0; idx < data.length; idx++) {
    if (~values.indexOf(data[idx])) return data[idx];
  }return null;
}

/**
 * ---
 * shortcuts:
 *   - { key: down arrow, label: move focus, or select previous option }
 *   - { key: up arrow, label: move focus, or select next option }
 *   - { key: home, label: move focus to first option }
 *   - { key: end, label: move focus to last option }
 *   - { key: spacebar, label: toggle focused option }
 *   - { key: ctrl + a, label: ctoggle select all/select none }
 *   - { key: any key, label: search list for option starting with key }
 * ---
 *
 * A group of radio buttons or checkboxes bound to a dataset.
 *
 * @public
 */

var SelectList = (0, _withRightToLeft2.default)(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
  _inherits(SelectList, _React$Component);

  function SelectList() {
    _classCallCheck(this, SelectList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _this.handleMouseDown = function () {
      _this._clicking = true;
    };

    _this.handleFocusChanged = function (focused) {
      var _this$props = _this.props,
          data = _this$props.data,
          disabled = _this$props.disabled;
      var dataItems = _this.state.dataItems;

      // the rigamarole here is to avoid flicker went clicking an item and
      // gaining focus at the same time.

      if (focused !== _this.state.focused) {
        if (!focused) _this.setState({ focusedItem: null });else if (focused && !_this._clicking) {
          var allowed = Array.isArray(disabled) ? dataItems.filter(function (v) {
            return !_this.accessors.find(disabled, v);
          }) : dataItems;

          _this.setState({
            focusedItem: getFirstValue(data, allowed) || _this.list.nextEnabled(data[0])
          });
        }
        _this._clicking = false;
      }
    };

    _initDefineProp(_this, 'handleKeyDown', _descriptor, _this);

    _initDefineProp(_this, 'handleKeyPress', _descriptor2, _this);

    _this.handleChange = function (item, checked, originalEvent) {
      var _this$props2 = _this.props,
          multiple = _this$props2.multiple,
          onChange = _this$props2.onChange;

      var lastValue = _this.state.dataItems;

      _this.setState({ focusedItem: item });

      if (!multiple) return (0, _widgetHelpers.notify)(onChange, [checked ? item : null, {
        originalEvent: originalEvent,
        lastValue: lastValue,
        checked: checked
      }]);

      var nextValue = checked ? lastValue.concat(item) : lastValue.filter(function (v) {
        return v !== item;
      });

      (0, _widgetHelpers.notify)(onChange, [nextValue || [], {
        checked: checked,
        lastValue: lastValue,
        originalEvent: originalEvent,
        dataItem: item
      }]);
    };

    _this.renderListItem = function (itemProps) {
      var _this$props3 = _this.props,
          name = _this$props3.name,
          multiple = _this$props3.multiple,
          disabled = _this$props3.disabled,
          readOnly = _this$props3.readOnly;
      var dataItems = _this.state.dataItems;

      return _react2.default.createElement(_SelectListItem2.default, _extends({}, itemProps, {
        name: name || _this.itemName,
        type: multiple ? 'checkbox' : 'radio',
        readOnly: disabled === true || readOnly,
        onChange: _this.handleChange,
        onMouseDown: _this.handleMouseDown,
        checked: !!_this.accessors.find(dataItems, itemProps.dataItem)
      }));
    };

    (0, _reactComponentManagers.autoFocus)(_this);

    _this.messages = (0, _messages.getMessages)(_this.props.messages);

    _this.widgetId = (0, _widgetHelpers.instanceId)(_this, '_widget');
    _this.listId = (0, _widgetHelpers.instanceId)(_this, '_listbox');
    _this.activeId = (0, _widgetHelpers.instanceId)(_this, '_listbox_active_option');
    _this.itemName = (0, _widgetHelpers.instanceId)(_this, '_name');

    _this.list = (0, _listDataManager2.default)(_this);
    _this.accessors = (0, _accessorManager2.default)(_this);
    _this.timeouts = (0, _reactComponentManagers.timeoutManager)(_this);
    _this.handleScroll = (0, _scrollManager2.default)(_this, false);
    _this.focusManager = (0, _focusManager2.default)(_this, {
      didHandle: _this.handleFocusChanged
    });

    _this.state = _this.getStateFromProps(_this.props);
    return _this;
  }

  SelectList.prototype.getStateFromProps = function getStateFromProps(props) {
    var accessors = this.accessors,
        list = this.list;
    var data = props.data,
        value = props.value;


    list.setData(data);

    return {
      dataItems: (0, _.makeArray)(value).map(function (item) {
        return accessors.findOrSelf(data, item);
      })
    };
  };

  SelectList.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.messages = (0, _messages.getMessages)(nextProps.messages);
    return this.setState(this.getStateFromProps(nextProps));
  };

  SelectList.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        tabIndex = _props.tabIndex,
        busy = _props.busy;


    var elementProps = Props.pickElementProps(this);

    var _state = this.state,
        focusedItem = _state.focusedItem,
        focused = _state.focused;
    var _accessors = this.accessors,
        value = _accessors.value,
        text = _accessors.text;


    var List = this.props.listComponent;
    var listProps = this.list.defaultProps();

    var disabled = this.props.disabled === true,
        readOnly = this.props.readOnly === true;

    focusedItem = focused && !disabled && !readOnly && focusedItem;

    return _react2.default.createElement(
      _Widget2.default,
      _extends({}, elementProps, {
        id: this.widgetId,
        onBlur: this.focusManager.handleBlur,
        onFocus: this.focusManager.handleFocus,
        onKeyDown: this.handleKeyDown,
        onKeyPress: this.handleKeyPress,
        focused: focused,
        disabled: disabled,
        readOnly: readOnly,
        role: 'radiogroup',
        'aria-busy': !!busy,
        'aria-activedescendant': this.activeId,
        className: (0, _classnames2.default)(className, 'rw-select-list', 'rw-widget-input', 'rw-widget-container', busy && 'rw-loading-mask')
      }),
      _react2.default.createElement(List, _extends({}, listProps, {
        ref: 'list',
        role: 'radiogroup',
        tabIndex: tabIndex || '0',
        id: this.listId,
        activeId: this.activeId,
        valueAccessor: value,
        textAccessor: text,
        focusedItem: focusedItem,
        onMove: this.handleScroll,
        optionComponent: this.renderListItem,
        messages: { emptyList: this.messages.emptyList }
      }))
    );
  };

  SelectList.prototype.focus = function focus() {
    (0, _reactDom.findDOMNode)(this.refs.list).focus();
  };

  SelectList.prototype.selectAll = function selectAll() {
    var accessors = this.accessors;
    var _props2 = this.props,
        data = _props2.data,
        disabled = _props2.disabled,
        onChange = _props2.onChange;

    var values = this.state.dataItems;

    disabled = Array.isArray(disabled) ? disabled : [];

    var disabledValues = void 0;
    var enabledData = data;

    if (disabled.length) {
      disabledValues = values.filter(function (v) {
        return accessors.find(disabled, v);
      });
      enabledData = data.filter(function (v) {
        return !accessors.find(disabled, v);
      });
    }

    var nextValues = values.length >= enabledData.length ? values.filter(function (v) {
      return accessors.find(disabled, v);
    }) : enabledData.concat(disabledValues);

    (0, _widgetHelpers.notify)(onChange, [nextValues]);
  };

  SelectList.prototype.search = function search(character, originalEvent) {
    var _this2 = this;

    var _searchTerm = this._searchTerm,
        list = this.list;


    var word = ((_searchTerm || '') + character).toLowerCase();
    var multiple = this.props.multiple;

    if (!multiple) originalEvent.persist();

    if (!character) return;

    this._searchTerm = word;

    this.timeouts.set('search', function () {
      var focusedItem = list.next(_this2.state.focusedItem, word);

      _this2._searchTerm = '';

      if (focusedItem) {
        !multiple ? _this2.handleChange(focusedItem, true, originalEvent) : _this2.setState({ focusedItem: focusedItem });
      }
    }, this.props.delay);
  };

  return SelectList;
}(_react2.default.Component), _class3.propTypes = {
  data: _propTypes2.default.array,
  value: _propTypes2.default.oneOfType([_propTypes2.default.any, _propTypes2.default.array]),
  onChange: _propTypes2.default.func,

  /**
   * A handler called when focus shifts on the SelectList. Internally this is used to ensure the focused item is in view.
   * If you want to define your own "scrollTo" behavior or just disable the default one specify an `onMove` handler.
   * The handler is called with the relevant DOM nodes needed to implement scroll behavior: the list element,
   * the element that is currently focused, and a focused value.
   *
   * @type {function(list: HTMLELement, focusedNode: HTMLElement, focusedItem: any)}
   */
  onMove: _propTypes2.default.func,

  /**
   * Whether or not the SelectList allows multiple selection or not. when `false` the SelectList will
   * render as a list of radio buttons, and checkboxes when `true`.
   */
  multiple: _propTypes2.default.bool,

  onKeyDown: _propTypes2.default.func,
  onKeyPress: _propTypes2.default.func,

  itemComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,

  valueField: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  busy: _propTypes2.default.bool,
  delay: _propTypes2.default.number,

  autoFocus: _propTypes2.default.bool,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,

  listProps: _propTypes2.default.object,
  messages: _propTypes2.default.shape({
    emptyList: CustomPropTypes.message
  }),

  tabIndex: _propTypes2.default.any,

  /**
   * The HTML `name` attribute used to group checkboxes and radio buttons
   * together.
   */
  name: _propTypes2.default.string
}, _class3.defaultProps = {
  delay: 250,
  value: [],
  data: [],
  listComponent: _List2.default
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (event) {
      var list = _this3.list,
          accessors = _this3.accessors;
      var multiple = _this3.props.multiple;
      var _state2 = _this3.state,
          dataItems = _state2.dataItems,
          focusedItem = _state2.focusedItem;
      var keyCode = event.keyCode,
          key = event.key,
          ctrlKey = event.ctrlKey;


      var change = function change(item) {
        if (!item) return;

        var checked = multiple ? !accessors.find(dataItems, item) // toggle value
        : true;

        _this3.handleChange(item, checked, event);
      };

      (0, _widgetHelpers.notify)(_this3.props.onKeyDown, [event]);

      if (event.defaultPrevented) return;

      if (key === 'End') {
        event.preventDefault();
        focusedItem = list.last();

        _this3.setState({ focusedItem: focusedItem });
        if (!multiple) change(focusedItem);
      } else if (key === 'Home') {
        event.preventDefault();
        focusedItem = list.first();

        _this3.setState({ focusedItem: focusedItem });
        if (!multiple) change(focusedItem);
      } else if (key === 'Enter' || key === ' ') {
        event.preventDefault();
        change(focusedItem);
      } else if (key === 'ArrowDown' || key === 'ArrowRight') {
        event.preventDefault();
        focusedItem = list.next(focusedItem);

        _this3.setState({ focusedItem: focusedItem });
        if (!multiple) change(focusedItem);
      } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
        event.preventDefault();
        focusedItem = list.prev(focusedItem);

        _this3.setState({ focusedItem: focusedItem });
        if (!multiple) change(focusedItem);
      } else if (multiple && keyCode === 65 && ctrlKey) {
        event.preventDefault();
        _this3.selectAll();
      }
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyPress', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (event) {
      (0, _widgetHelpers.notify)(_this4.props.onKeyPress, [event]);

      if (event.defaultPrevented) return;

      _this4.search(String.fromCharCode(event.which), event);
    };
  }
})), _class2)) || _class;

exports.default = (0, _uncontrollable2.default)(SelectList, {
  value: 'onChange'
}, ['selectAll', 'focus']);
module.exports = exports['default'];

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ListOption = __webpack_require__(42);

var _ListOption2 = _interopRequireDefault(_ListOption);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectListItem = (_temp2 = _class = function (_React$Component) {
  _inherits(SelectListItem, _React$Component);

  function SelectListItem() {
    var _temp, _this, _ret;

    _classCallCheck(this, SelectListItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleChange = function (e) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          disabled = _this$props.disabled,
          dataItem = _this$props.dataItem;


      if (!disabled) onChange(dataItem, e.target.checked);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  SelectListItem.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        disabled = _props.disabled,
        readOnly = _props.readOnly,
        name = _props.name,
        type = _props.type,
        checked = _props.checked,
        onMouseDown = _props.onMouseDown,
        props = _objectWithoutProperties(_props, ['children', 'disabled', 'readOnly', 'name', 'type', 'checked', 'onMouseDown']);

    delete props.onChange;

    return _react2.default.createElement(
      _ListOption2.default,
      _extends({}, props, {
        role: type,
        disabled: disabled,
        'aria-checked': !!checked
      }),
      _react2.default.createElement(
        'label',
        {
          onMouseDown: onMouseDown,
          className: 'rw-select-list-label'
        },
        _react2.default.createElement('input', {
          name: name,
          type: type,
          tabIndex: '-1',
          checked: checked,
          disabled: disabled || !!readOnly,
          role: 'presentation',
          className: 'rw-select-list-input',
          onChange: this.handleChange
        }),
        children
      )
    );
  };

  return SelectListItem;
}(_react2.default.Component), _class.propTypes = {
  type: _propTypes2.default.string.isRequired,
  name: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  dataItem: _propTypes2.default.any,
  checked: _propTypes2.default.bool.isRequired,

  onChange: _propTypes2.default.func.isRequired,
  onMouseDown: _propTypes2.default.func.isRequired
}, _temp2);
exports.default = SelectListItem;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=react-widgets.js.map