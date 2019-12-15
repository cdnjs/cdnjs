/*! (c) 2017 Jason Quense | https://github.com/jquense/react-widgets/blob/master/License.txt */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define([, ], factory);
	else if(typeof exports === 'object')
		exports["ReactWidgets"] = factory(require("react"), require("react-dom"));
	else
		root["ReactWidgets"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_29__, __WEBPACK_EXTERNAL_MODULE_51__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var configure = __webpack_require__(2);

	if (process.env.NODE_ENV !== 'production') {
	  [Array.prototype.some, Array.prototype.filter, Array.prototype.reduce].forEach(function (method) {
	    if (!method) throw new Error('One or more ES5 features is not available to ReactWidgets: http://jquense.github.io/react-widgets/docs/#/getting-started/browser');
	  });
	}

	module.exports = _extends({}, configure, {
	  DropdownList: __webpack_require__(28),
	  Combobox: __webpack_require__(75),
	  Calendar: __webpack_require__(78),
	  DateTimePicker: __webpack_require__(93),
	  NumberPicker: __webpack_require__(96),
	  Multiselect: __webpack_require__(99),
	  SelectList: __webpack_require__(102),

	  utils: {
	    ReplaceTransitionGroup: __webpack_require__(91),
	    SlideTransition: __webpack_require__(90)
	  }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _configuration = __webpack_require__(3);

	var _configuration2 = _interopRequireDefault(_configuration);

	var _localizers = __webpack_require__(17);

	var localizers = _interopRequireWildcard(_localizers);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  setAnimate: function setAnimate(animatefn) {
	    _configuration2.default.animate = animatefn;
	  },
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _animate = __webpack_require__(4);

	var _animate2 = _interopRequireDefault(_animate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = { animate: _animate2.default };
	module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = animate;

	var _hyphenate = __webpack_require__(5);

	var _hyphenate2 = _interopRequireDefault(_hyphenate);

	var _style = __webpack_require__(6);

	var _style2 = _interopRequireDefault(_style);

	var _on = __webpack_require__(13);

	var _on2 = _interopRequireDefault(_on);

	var _off = __webpack_require__(15);

	var _off2 = _interopRequireDefault(_off);

	var _properties = __webpack_require__(16);

	var _properties2 = _interopRequireDefault(_properties);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var has = Object.prototype.hasOwnProperty,
	    reset = {},
	    TRANSLATION_MAP = {
	  left: 'translateX',
	  right: 'translateX',
	  top: 'translateY',
	  bottom: 'translateY'
	};

	reset[_properties2.default.property] = reset[_properties2.default.duration] = reset[_properties2.default.delay] = reset[_properties2.default.timing] = '';

	animate.endEvent = _properties2.default.end;
	animate.transform = _properties2.default.transform;
	animate.TRANSLATION_MAP = TRANSLATION_MAP;

	// super lean animate function for transitions
	// doesn't support all translations to keep it matching the jquery API
	/**
	 * code in part from: Zepto 1.1.4 | zeptojs.com/license
	 */
	function animate(node, properties, duration, easing, callback) {
	  var cssProperties = [],
	      fakeEvent = { target: node, currentTarget: node },
	      cssValues = {},
	      transforms = '',
	      fired;

	  if (typeof easing === 'function') callback = easing, easing = null;

	  if (!_properties2.default.end) duration = 0;
	  if (duration === undefined) duration = 200;

	  for (var key in properties) {
	    if (has.call(properties, key)) {
	      if (/(top|bottom)/.test(key)) transforms += TRANSLATION_MAP[key] + '(' + properties[key] + ') ';else {
	        cssValues[key] = properties[key];
	        cssProperties.push((0, _hyphenate2.default)(key));
	      }
	    }
	  }if (transforms) {
	    cssValues[_properties2.default.transform] = transforms;
	    cssProperties.push(_properties2.default.transform);
	  }

	  if (duration > 0) {
	    cssValues[_properties2.default.property] = cssProperties.join(', ');
	    cssValues[_properties2.default.duration] = duration / 1000 + 's';
	    cssValues[_properties2.default.delay] = 0 + 's';
	    cssValues[_properties2.default.timing] = easing || 'linear';

	    (0, _on2.default)(node, _properties2.default.end, done);

	    setTimeout(function () {
	      if (!fired) done(fakeEvent);
	    }, duration + 500);
	  }

	  node.clientLeft; // trigger page reflow
	  (0, _style2.default)(node, cssValues);

	  if (duration <= 0) setTimeout(done.bind(null, fakeEvent), 0);

	  return {
	    cancel: function cancel() {
	      if (fired) return;
	      fired = true;
	      (0, _off2.default)(node, _properties2.default.end, done);
	      (0, _style2.default)(node, reset);
	    }
	  };

	  function done(event) {
	    if (event.target !== event.currentTarget) return;

	    fired = true;
	    (0, _off2.default)(event.target, _properties2.default.end, done);
	    (0, _style2.default)(node, reset);
	    callback && callback.call(this);
	  }
	}
	module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	var rUpper = /([A-Z])/g;

	module.exports = function hyphenate(string) {
	  return string.replace(rUpper, '-$1').toLowerCase();
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var camelize = __webpack_require__(7),
	    hyphenate = __webpack_require__(9),
	    _getComputedStyle = __webpack_require__(10),
	    removeStyle = __webpack_require__(12);

	var has = Object.prototype.hasOwnProperty;

	module.exports = function style(node, property, value) {
	  var css = '',
	      props = property;

	  if (typeof property === 'string') {

	    if (value === undefined) return node.style[camelize(property)] || _getComputedStyle(node).getPropertyValue(hyphenate(property));else (props = {})[property] = value;
	  }

	  for (var key in props) if (has.call(props, key)) {
	    !props[key] && props[key] !== 0 ? removeStyle(node, hyphenate(key)) : css += hyphenate(key) + ':' + props[key] + ';';
	  }

	  node.style.cssText += ';' + css;
	};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
	 */

	'use strict';
	var camelize = __webpack_require__(8);
	var msPattern = /^-ms-/;

	module.exports = function camelizeStyleName(string) {
	  return camelize(string.replace(msPattern, 'ms-'));
	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";

	var rHyphen = /-(.)/g;

	module.exports = function camelize(string) {
	  return string.replace(rHyphen, function (_, chr) {
	    return chr.toUpperCase();
	  });
	};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
	 */

	"use strict";

	var hyphenate = __webpack_require__(5);
	var msPattern = /^ms-/;

	module.exports = function hyphenateStyleName(string) {
	  return hyphenate(string).replace(msPattern, "-ms-");
	};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(11);

	var _utilCamelizeStyle = __webpack_require__(7);

	var _utilCamelizeStyle2 = babelHelpers.interopRequireDefault(_utilCamelizeStyle);

	var rposition = /^(top|right|bottom|left)$/;
	var rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;

	module.exports = function _getComputedStyle(node) {
	  if (!node) throw new TypeError('No Element passed to `getComputedStyle()`');
	  var doc = node.ownerDocument;

	  return 'defaultView' in doc ? doc.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null) : { //ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
	    getPropertyValue: function getPropertyValue(prop) {
	      var style = node.style;

	      prop = (0, _utilCamelizeStyle2['default'])(prop);

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
	};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === "object") {
	    factory(exports);
	  } else {
	    factory(root.babelHelpers = {});
	  }
	})(this, function (global) {
	  var babelHelpers = global;

	  babelHelpers.interopRequireDefault = function (obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  };

	  babelHelpers._extends = Object.assign || function (target) {
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
	})

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function removeStyle(node, key) {
	  return 'removeProperty' in node.style ? node.style.removeProperty(key) : node.style.removeAttribute(key);
	};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(14);
	var on = function on() {};

	if (canUseDOM) {
	  on = (function () {

	    if (document.addEventListener) return function (node, eventName, handler, capture) {
	      return node.addEventListener(eventName, handler, capture || false);
	    };else if (document.attachEvent) return function (node, eventName, handler) {
	      return node.attachEvent('on' + eventName, handler);
	    };
	  })();
	}

	module.exports = on;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	'use strict';
	module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(14);
	var off = function off() {};

	if (canUseDOM) {

	  off = (function () {

	    if (document.addEventListener) return function (node, eventName, handler, capture) {
	      return node.removeEventListener(eventName, handler, capture || false);
	    };else if (document.attachEvent) return function (node, eventName, handler) {
	      return node.detachEvent('on' + eventName, handler);
	    };
	  })();
	}

	module.exports = off;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(14);

	var has = Object.prototype.hasOwnProperty,
	    transform = 'transform',
	    transition = {},
	    transitionTiming,
	    transitionDuration,
	    transitionProperty,
	    transitionDelay;

	if (canUseDOM) {
	  transition = getTransitionProperties();

	  transform = transition.prefix + transform;

	  transitionProperty = transition.prefix + 'transition-property';
	  transitionDuration = transition.prefix + 'transition-duration';
	  transitionDelay = transition.prefix + 'transition-delay';
	  transitionTiming = transition.prefix + 'transition-timing-function';
	}

	module.exports = {
	  transform: transform,
	  end: transition.end,
	  property: transitionProperty,
	  timing: transitionTiming,
	  delay: transitionDelay,
	  duration: transitionDuration
	};

	function getTransitionProperties() {
	  var endEvent,
	      prefix = '',
	      transitions = {
	    O: 'otransitionend',
	    Moz: 'transitionend',
	    Webkit: 'webkitTransitionEnd',
	    ms: 'MSTransitionEnd'
	  };

	  var element = document.createElement('div');

	  for (var vendor in transitions) if (has.call(transitions, vendor)) {
	    if (element.style[vendor + 'TransitionProperty'] !== undefined) {
	      prefix = '-' + vendor.toLowerCase() + '-';
	      endEvent = transitions[vendor];
	      break;
	    }
	  }

	  if (!endEvent && element.style.transitionProperty !== undefined) endEvent = 'transitionend';

	  return { end: endEvent, prefix: prefix };
	}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.date = exports.number = exports.setNumber = undefined;
	exports.setDate = setDate;

	var _invariant = __webpack_require__(18);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _ = __webpack_require__(19);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var localePropType = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]);

	var REQUIRED_NUMBER_FORMATS = ['default'];

	var REQUIRED_DATE_FORMATS = ['default', 'date', 'time', 'header', 'footer', 'dayOfMonth', 'month', 'year', 'decade', 'century'];

	function _format(localizer, formatter, value, format, culture) {
	  var result = typeof format === 'function' ? format(value, culture, localizer) : formatter.call(localizer, value, format, culture);

	  (0, _invariant2.default)(result == null || typeof result === 'string', '`localizer format(..)` must return a string, null, or undefined');

	  return result;
	}

	function checkFormats(requiredFormats, formats) {
	  if (process.env.NODE_ENV !== 'production') requiredFormats.forEach(function (f) {
	    return (0, _invariant2.default)((0, _.has)(formats, f), 'localizer missing required format: `%s`', f);
	  });
	}

	var _numberLocalizer = createWrapper('NumberPicker');

	function setNumber(_ref) {
	  var _format2 = _ref.format,
	      _parse = _ref.parse,
	      _ref$decimalChar = _ref.decimalChar,
	      decimalChar = _ref$decimalChar === undefined ? function () {
	    return '.';
	  } : _ref$decimalChar,
	      _ref$precision = _ref.precision,
	      precision = _ref$precision === undefined ? function () {
	    return null;
	  } : _ref$precision,
	      formats = _ref.formats,
	      propType = _ref.propType;

	  (0, _invariant2.default)(typeof _format2 === 'function', 'number localizer `format(..)` must be a function');
	  (0, _invariant2.default)(typeof _parse === 'function', 'number localizer `parse(..)` must be a function');

	  checkFormats(REQUIRED_NUMBER_FORMATS, formats);

	  formats.editFormat = formats.editFormat || function (str) {
	    return parseFloat(str);
	  };

	  _numberLocalizer = {
	    formats: formats,
	    precision: precision,
	    decimalChar: decimalChar,
	    propType: propType || localePropType,

	    format: function format(value, str, culture) {
	      return _format(this, _format2, value, str, culture);
	    },
	    parse: function parse(value, culture, format) {
	      var result = _parse.call(this, value, culture, format);
	      (0, _invariant2.default)(result == null || typeof result === 'number', 'number localizer `parse(..)` must return a number, null, or undefined');
	      return result;
	    }
	  };
	}

	exports.setNumber = setNumber;
	var _dateLocalizer = createWrapper('DateTimePicker');

	function setDate(spec) {
	  (0, _invariant2.default)(typeof spec.format === 'function', 'date localizer `format(..)` must be a function');
	  (0, _invariant2.default)(typeof spec.parse === 'function', 'date localizer `parse(..)` must be a function');
	  (0, _invariant2.default)(typeof spec.firstOfWeek === 'function', 'date localizer `firstOfWeek(..)` must be a function');
	  checkFormats(REQUIRED_DATE_FORMATS, spec.formats);

	  _dateLocalizer = {
	    formats: spec.formats,
	    propType: spec.propType || localePropType,
	    startOfWeek: spec.firstOfWeek,
	    format: function format(value, str, culture) {
	      return _format(this, spec.format, value, str, culture);
	    },
	    parse: function parse(value, culture) {
	      var result = spec.parse.call(this, value, culture);
	      (0, _invariant2.default)(result == null || result instanceof Date && !isNaN(result.getTime()), 'date localizer `parse(..)` must return a valid Date, null, or undefined');
	      return result;
	    }
	  };
	}

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
	  startOfWeek: function startOfWeek() {
	    var _dateLocalizer5;

	    return (_dateLocalizer5 = _dateLocalizer).startOfWeek.apply(_dateLocalizer5, arguments);
	  }
	};

	exports.default = { number: number, date: date };


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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var idCount = 0;

	var _ = module.exports = {

	  has: has,

	  result: function result(value) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    return typeof value === 'function' ? value.apply(undefined, args) : value;
	  },

	  isShallowEqual: function isShallowEqual(a, b) {
	    if (a === b) return true;
	    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();

	    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== 'object' && (typeof b === 'undefined' ? 'undefined' : _typeof(b)) !== 'object') return a === b;

	    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== (typeof b === 'undefined' ? 'undefined' : _typeof(b))) return false;

	    return shallowEqual(a, b);
	  },
	  transform: function transform(obj, cb, seed) {
	    _.each(obj, cb.bind(null, seed = seed || (Array.isArray(obj) ? [] : {})));
	    return seed;
	  },
	  each: function each(obj, cb, thisArg) {
	    if (Array.isArray(obj)) return obj.forEach(cb, thisArg);

	    for (var key in obj) {
	      if (has(obj, key)) cb.call(thisArg, obj[key], key, obj);
	    }
	  },
	  pick: function pick(obj, keys) {
	    keys = [].concat(keys);
	    return _.transform(obj, function (mapped, val, key) {
	      if (keys.indexOf(key) !== -1) mapped[key] = val;
	    }, {});
	  },
	  pickProps: function pickProps(props, componentClass) {
	    return _.pick(props, Object.keys(componentClass.propTypes));
	  },
	  omit: function omit(obj, keys) {
	    keys = [].concat(keys);
	    return _.transform(obj, function (mapped, val, key) {
	      if (keys.indexOf(key) === -1) mapped[key] = val;
	    }, {});
	  },
	  omitOwnProps: function omitOwnProps(component) {
	    for (var _len2 = arguments.length, others = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      others[_key2 - 1] = arguments[_key2];
	    }

	    var keys = others.reduce(function (arr, compClass) {
	      return arr.concat(Object.keys(compClass.propTypes));
	    }, Object.keys(component.constructor.propTypes));

	    return _.omit(component.props, keys);
	  },
	  find: function find(arr, cb, thisArg) {
	    var result;
	    if (Array.isArray(arr)) {
	      arr.every(function (val, idx) {
	        if (cb.call(thisArg, val, idx, arr)) return result = val, false;
	        return true;
	      });
	      return result;
	    } else for (var key in arr) {
	      if (has(arr, key)) if (cb.call(thisArg, arr[key], key, arr)) return arr[key];
	    }
	  },
	  chunk: function chunk(array, chunkSize) {
	    var index = 0,
	        length = array ? array.length : 0,
	        result = [];

	    chunkSize = Math.max(+chunkSize || 1, 1);

	    while (index < length) {
	      result.push(array.slice(index, index += chunkSize));
	    }return result;
	  },
	  splat: function splat(obj) {
	    return obj == null ? [] : [].concat(obj);
	  },
	  noop: function noop() {},
	  uniqueId: function uniqueId(prefix) {
	    return '' + ((prefix == null ? '' : prefix) + ++idCount);
	  }
	};

	function has(o, k) {
	  return o ? Object.prototype.hasOwnProperty.call(o, k) : false;
	}

	function eql(a, b) {
	  return a === b;
	}

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 */
	function shallowEqual(objA, objB) {

	  if (objA == null || objB == null) return false;

	  var keysA = Object.keys(objA),
	      keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) return false;

	  for (var i = 0; i < keysA.length; i++) {
	    if (!has(objB, keysA[i]) || !eql(objA[keysA[i]], objB[keysA[i]])) return false;
	  }return true;
	}

/***/ }),
/* 20 */
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
	  module.exports = __webpack_require__(21)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(27)();
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(22);
	var invariant = __webpack_require__(23);
	var warning = __webpack_require__(24);

	var ReactPropTypesSecret = __webpack_require__(25);
	var checkPropTypes = __webpack_require__(26);

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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 22 */
/***/ (function(module, exports) {

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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(22);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	if (process.env.NODE_ENV !== 'production') {
	  var invariant = __webpack_require__(23);
	  var warning = __webpack_require__(24);
	  var ReactPropTypesSecret = __webpack_require__(25);
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(22);
	var invariant = __webpack_require__(23);
	var ReactPropTypesSecret = __webpack_require__(25);

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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _desc, _value, _obj;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _activeElement = __webpack_require__(34);

	var _activeElement2 = _interopRequireDefault(_activeElement);

	var _contains = __webpack_require__(36);

	var _contains2 = _interopRequireDefault(_contains);

	var _classnames = __webpack_require__(37);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	var _Widget = __webpack_require__(38);

	var _Widget2 = _interopRequireDefault(_Widget);

	var _Input = __webpack_require__(39);

	var _Input2 = _interopRequireDefault(_Input);

	var _Select = __webpack_require__(40);

	var _Select2 = _interopRequireDefault(_Select);

	var _DropdownListInput = __webpack_require__(42);

	var _DropdownListInput2 = _interopRequireDefault(_DropdownListInput);

	var _Popup = __webpack_require__(46);

	var _Popup2 = _interopRequireDefault(_Popup);

	var _compat = __webpack_require__(50);

	var _compat2 = _interopRequireDefault(_compat);

	var _propTypes3 = __webpack_require__(43);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

	var _List = __webpack_require__(52);

	var _List2 = _interopRequireDefault(_List);

	var _ListGroupable = __webpack_require__(58);

	var _ListGroupable2 = _interopRequireDefault(_ListGroupable);

	var _validateListInterface = __webpack_require__(60);

	var _validateListInterface2 = _interopRequireDefault(_validateListInterface);

	var _uncontrollable = __webpack_require__(61);

	var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

	var _dataHelpers = __webpack_require__(45);

	var _interaction = __webpack_require__(55);

	var _widgetHelpers = __webpack_require__(54);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	var result = _3.default.result;


	var propTypes = _extends({}, _Popup2.default.propTypes, {

	  //-- controlled props -----------
	  value: _propTypes2.default.any,
	  onChange: _propTypes2.default.func,
	  open: _propTypes2.default.bool,
	  onToggle: _propTypes2.default.func,
	  //------------------------------------

	  data: _propTypes2.default.array,
	  valueField: _propTypes2.default.string,
	  textField: _propTypes4.default.accessor,

	  valueComponent: _propTypes4.default.elementType,
	  itemComponent: _propTypes4.default.elementType,
	  listComponent: _propTypes4.default.elementType,

	  groupComponent: _propTypes4.default.elementType,
	  groupBy: _propTypes4.default.accessor,

	  onSelect: _propTypes2.default.func,
	  searchTerm: _propTypes2.default.string,
	  onSearch: _propTypes2.default.func,
	  busy: _propTypes2.default.bool,
	  delay: _propTypes2.default.number,
	  dropUp: _propTypes2.default.bool,
	  duration: _propTypes2.default.number, //popup

	  disabled: _propTypes4.default.disabled.acceptsArray,
	  readOnly: _propTypes4.default.readOnly.acceptsArray,

	  messages: _propTypes2.default.shape({
	    open: _propTypes4.default.message,
	    emptyList: _propTypes4.default.message,
	    emptyFilter: _propTypes4.default.message,
	    filterPlaceholder: _propTypes4.default.message
	  })
	});

	var DropdownList = (0, _createReactClass2.default)((_obj = {

	  displayName: 'DropdownList',

	  mixins: [__webpack_require__(64), __webpack_require__(65), __webpack_require__(66), __webpack_require__(67), __webpack_require__(68), __webpack_require__(73), __webpack_require__(57)(), __webpack_require__(74)({
	    didHandle: function didHandle(focused) {
	      if (!focused) this.close();
	    }
	  })],

	  propTypes: propTypes,

	  getDefaultProps: function getDefaultProps() {
	    return {
	      delay: 500,
	      value: '',
	      open: false,
	      data: [],
	      searchTerm: '',
	      messages: msgs(),
	      ariaActiveDescendantKey: 'dropdownlist'
	    };
	  },
	  getInitialState: function getInitialState() {
	    var _props = this.props,
	        open = _props.open,
	        filter = _props.filter,
	        value = _props.value,
	        data = _props.data,
	        searchTerm = _props.searchTerm,
	        valueField = _props.valueField;


	    var processed = filter ? this.filter(data, searchTerm) : data,
	        initialIdx = (0, _dataHelpers.dataIndexOf)(data, value, valueField);

	    return {
	      filteredData: open && filter ? processed : null,
	      selectedItem: processed[initialIdx],
	      focusedItem: processed[initialIdx] || data[0]
	    };
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    this.refs.list && (0, _validateListInterface2.default)(this.refs.list);
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(props) {
	    var open = props.open,
	        filter = props.filter,
	        value = props.value,
	        data = props.data,
	        searchTerm = props.searchTerm,
	        valueField = props.valueField;


	    var processed = filter ? this.filter(data, searchTerm) : data,
	        idx = (0, _dataHelpers.dataIndexOf)(data, value, valueField);

	    this.setState({
	      filteredData: open && filter ? processed : null,
	      selectedItem: processed[idx],
	      focusedItem: processed[!~idx ? 0 : idx]
	    });
	  },
	  renderFilter: function renderFilter(messages) {
	    var _this = this;

	    return _react2.default.createElement(
	      'div',
	      { ref: 'filterWrapper', className: 'rw-filter-input' },
	      _react2.default.createElement(_Select2.default, { component: 'span', icon: 'search' }),
	      _react2.default.createElement(_Input2.default, {
	        ref: 'filter',
	        value: this.props.searchTerm,
	        placeholder: _3.default.result(messages.filterPlaceholder, this.props),
	        onChange: function onChange(e) {
	          return (0, _widgetHelpers.notify)(_this.props.onSearch, e.target.value);
	        }
	      })
	    );
	  },
	  renderList: function renderList(List, id, messages) {
	    var _props2 = this.props,
	        open = _props2.open,
	        filter = _props2.filter,
	        data = _props2.data;
	    var _state = this.state,
	        selectedItem = _state.selectedItem,
	        focusedItem = _state.focusedItem;


	    var listProps = _3.default.pickProps(this.props, List);
	    var items = this._data();

	    return _react2.default.createElement(
	      'div',
	      null,
	      filter && this.renderFilter(messages),
	      _react2.default.createElement(List, _extends({}, listProps, {
	        ref: 'list',
	        id: id,
	        data: items,
	        'aria-live': open && 'polite',
	        'aria-labelledby': (0, _widgetHelpers.instanceId)(this),
	        'aria-hidden': !this.props.open,
	        selected: selectedItem,
	        focused: open ? focusedItem : null,
	        onSelect: this.handleSelect,
	        onMove: this._scrollTo,
	        messages: {
	          emptyList: data.length ? messages.emptyFilter : messages.emptyList
	        } }))
	    );
	  },
	  render: function render() {
	    var _this2 = this;

	    var _props3 = this.props,
	        className = _props3.className,
	        tabIndex = _props3.tabIndex,
	        duration = _props3.duration,
	        valueField = _props3.valueField,
	        textField = _props3.textField,
	        groupBy = _props3.groupBy,
	        messages = _props3.messages,
	        data = _props3.data,
	        busy = _props3.busy,
	        dropUp = _props3.dropUp,
	        placeholder = _props3.placeholder,
	        value = _props3.value,
	        open = _props3.open,
	        valueComponent = _props3.valueComponent,
	        List = _props3.listComponent;


	    List = List || groupBy && _ListGroupable2.default || _List2.default;

	    var focused = this.state.focused;


	    var disabled = (0, _interaction.isDisabled)(this.props),
	        readOnly = (0, _interaction.isReadOnly)(this.props),
	        valueItem = (0, _dataHelpers.dataItem)(data, value, valueField) // take value from the raw data
	    ,
	        listID = (0, _widgetHelpers.instanceId)(this, '__listbox');

	    var elementProps = _extends(_3.default.omitOwnProps(this, List), {
	      role: 'combobox',
	      tabIndex: tabIndex || 0,
	      'aria-owns': listID,
	      'aria-expanded': !!open,
	      'aria-haspopup': true,
	      'aria-busy': !!busy,
	      'aria-live': !open && 'polite',
	      'aria-autocomplete': 'list',
	      'aria-disabled': disabled,
	      'aria-readonly': readOnly
	    });

	    var shouldRenderPopup = open || (0, _widgetHelpers.isFirstFocusedRender)(this);

	    messages = msgs(messages);

	    return _react2.default.createElement(
	      _Widget2.default,
	      _extends({}, elementProps, {
	        ref: 'input',
	        className: (0, _classnames2.default)(className, 'rw-dropdownlist'),
	        open: open,
	        dropUp: dropUp,
	        focused: focused,
	        disabled: disabled,
	        readOnly: readOnly,
	        onBlur: this.handleBlur,
	        onFocus: this.handleFocus,
	        onClick: this.handleClick,
	        onKeyDown: this.handleKeyDown,
	        onKeyPress: this.handleKeyPress
	      }),
	      _react2.default.createElement(_Select2.default, {
	        busy: busy,
	        icon: 'caret-down',
	        component: 'span',
	        className: 'rw-dropdownlist-picker',
	        label: result(messages.open, this.props)
	      }),
	      _react2.default.createElement(_DropdownListInput2.default, {
	        value: valueItem,
	        textField: textField,
	        placeholder: placeholder,
	        valueComponent: valueComponent
	      }),
	      shouldRenderPopup && _react2.default.createElement(
	        _Popup2.default,
	        {
	          open: open,
	          dropUp: dropUp,
	          duration: duration,
	          onOpen: function onOpen() {
	            return _this2.focus();
	          },
	          onOpening: function onOpening() {
	            return _this2.refs.list.forceUpdate();
	          }
	        },
	        this.renderList(List, listID, messages)
	      )
	    );
	  },
	  handleSelect: function handleSelect(data) {
	    this.close();
	    (0, _widgetHelpers.notify)(this.props.onSelect, data);
	    this.change(data);
	    this.focus(this);
	  },
	  handleClick: function handleClick(e) {
	    var wrapper = this.refs.filterWrapper;

	    if (!this.props.filter || !this.props.open) this.toggle();else if (!(0, _contains2.default)(_compat2.default.findDOMNode(wrapper), e.target)) this.close();

	    (0, _widgetHelpers.notify)(this.props.onClick, e);
	  },
	  handleKeyDown: function handleKeyDown(e) {
	    var _this3 = this;

	    var key = e.key,
	        alt = e.altKey,
	        list = this.refs.list,
	        filtering = this.props.filter,
	        focusedItem = this.state.focusedItem,
	        selectedItem = this.state.selectedItem,
	        isOpen = this.props.open,
	        closeWithFocus = function closeWithFocus() {
	      _this3.close(), _compat2.default.findDOMNode(_this3).focus();
	    };

	    (0, _widgetHelpers.notify)(this.props.onKeyDown, [e]);

	    var change = function change(item, fromList) {
	      if (item == null) return;
	      fromList ? _this3.handleSelect(item) : _this3.change(item);
	    };

	    if (e.defaultPrevented) return;

	    if (key === 'End') {
	      e.preventDefault();

	      if (isOpen) this.setState({ focusedItem: list.last() });else change(list.last());
	    } else if (key === 'Home') {
	      e.preventDefault();

	      if (isOpen) this.setState({ focusedItem: list.first() });else change(list.first());
	    } else if (key === 'Escape' && isOpen) {
	      e.preventDefault();
	      closeWithFocus();
	    } else if ((key === 'Enter' || key === ' ' && !filtering) && isOpen) {
	      e.preventDefault();
	      change(this.state.focusedItem, true);
	    } else if (key === ' ' && !filtering && !isOpen) {
	      e.preventDefault();
	      this.open();
	    } else if (key === 'ArrowDown') {
	      if (alt) this.open();else if (isOpen) this.setState({ focusedItem: list.next(focusedItem) });else change(list.next(selectedItem));
	      e.preventDefault();
	    } else if (key === 'ArrowUp') {
	      if (alt) closeWithFocus();else if (isOpen) this.setState({ focusedItem: list.prev(focusedItem) });else change(list.prev(selectedItem));
	      e.preventDefault();
	    }
	  },
	  handleKeyPress: function handleKeyPress(e) {
	    var _this4 = this;

	    (0, _widgetHelpers.notify)(this.props.onKeyPress, [e]);

	    if (e.defaultPrevented) return;

	    if (!(this.props.filter && this.props.open)) this.search(String.fromCharCode(e.which), function (item) {
	      _this4._mounted && _this4.props.open ? _this4.setState({ focusedItem: item }) : item && _this4.change(item);
	    });
	  },
	  change: function change(data) {
	    if (!(0, _dataHelpers.valueMatcher)(data, this.props.value, this.props.valueField)) {
	      (0, _widgetHelpers.notify)(this.props.onChange, data);
	      (0, _widgetHelpers.notify)(this.props.onSearch, '');
	      this.close();
	    }
	  },
	  focus: function focus(target) {
	    var _props4 = this.props,
	        filter = _props4.filter,
	        open = _props4.open;

	    var inst = target || (filter && open ? this.refs.filter : this.refs.input);

	    inst = _compat2.default.findDOMNode(inst);

	    if ((0, _activeElement2.default)() !== inst) inst.focus();
	  },
	  _data: function _data() {
	    return this.state.filteredData || this.props.data.concat();
	  },
	  search: function search(character, cb) {
	    var _this5 = this;

	    var word = ((this._searchTerm || '') + character).toLowerCase();

	    if (!character) return;

	    this._searchTerm = word;

	    this.setTimeout('search', function () {
	      var list = _this5.refs.list,
	          key = _this5.props.open ? 'focusedItem' : 'selectedItem',
	          item = list.next(_this5.state[key], word);

	      _this5._searchTerm = '';
	      if (item) cb(item);
	    }, this.props.delay);
	  },
	  open: function open() {
	    (0, _widgetHelpers.notify)(this.props.onToggle, true);
	  },
	  close: function close() {
	    (0, _widgetHelpers.notify)(this.props.onToggle, false);
	  },
	  toggle: function toggle() {
	    this.props.open ? this.close() : this.open();
	  }
	}, (_applyDecoratedDescriptor(_obj, 'handleSelect', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleSelect'), _obj), _applyDecoratedDescriptor(_obj, 'handleClick', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleClick'), _obj), _applyDecoratedDescriptor(_obj, 'handleKeyDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleKeyDown'), _obj), _applyDecoratedDescriptor(_obj, 'handleKeyPress', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleKeyPress'), _obj)), _obj));

	function msgs(msgs) {
	  return _extends({
	    open: 'open dropdown',
	    filterPlaceholder: '',
	    emptyList: 'There are no items in this list',
	    emptyFilter: 'The filter returned no results'
	  }, msgs);
	}

	exports.default = (0, _uncontrollable2.default)(DropdownList, { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' }, ['focus']);
	module.exports = exports['default'];

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_29__;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var React = __webpack_require__(29);
	var factory = __webpack_require__(31);

	if (typeof React === 'undefined') {
	  throw Error(
	    'create-react-class could not find the React object. If you are using script tags, ' +
	      'make sure that React is being loaded before create-react-class.'
	  );
	}

	// Hack to grab NoopUpdateQueue from isomorphic React
	var ReactNoopUpdateQueue = new React.Component().updater;

	module.exports = factory(
	  React.Component,
	  React.isValidElement,
	  ReactNoopUpdateQueue
	);


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _assign = __webpack_require__(32);

	var emptyObject = __webpack_require__(33);
	var _invariant = __webpack_require__(23);

	if (process.env.NODE_ENV !== 'production') {
	  var warning = __webpack_require__(24);
	}

	var MIXINS_KEY = 'mixins';

	// Helper function to allow the creation of anonymous functions which do not
	// have .name set to the name of the variable being assigned to.
	function identity(fn) {
	  return fn;
	}

	var ReactPropTypeLocationNames;
	if (process.env.NODE_ENV !== 'production') {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	} else {
	  ReactPropTypeLocationNames = {};
	}

	function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
	  /**
	   * Policies that describe methods in `ReactClassInterface`.
	   */

	  var injectedMixins = [];

	  /**
	   * Composite components are higher-level components that compose other composite
	   * or host components.
	   *
	   * To create a new type of `ReactClass`, pass a specification of
	   * your new class to `React.createClass`. The only requirement of your class
	   * specification is that you implement a `render` method.
	   *
	   *   var MyComponent = React.createClass({
	   *     render: function() {
	   *       return <div>Hello World</div>;
	   *     }
	   *   });
	   *
	   * The class specification supports a specific protocol of methods that have
	   * special meaning (e.g. `render`). See `ReactClassInterface` for
	   * more the comprehensive protocol. Any other properties and methods in the
	   * class specification will be available on the prototype.
	   *
	   * @interface ReactClassInterface
	   * @internal
	   */
	  var ReactClassInterface = {
	    /**
	     * An array of Mixin objects to include when defining your component.
	     *
	     * @type {array}
	     * @optional
	     */
	    mixins: 'DEFINE_MANY',

	    /**
	     * An object containing properties and methods that should be defined on
	     * the component's constructor instead of its prototype (static methods).
	     *
	     * @type {object}
	     * @optional
	     */
	    statics: 'DEFINE_MANY',

	    /**
	     * Definition of prop types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    propTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    contextTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types this component sets for its children.
	     *
	     * @type {object}
	     * @optional
	     */
	    childContextTypes: 'DEFINE_MANY',

	    // ==== Definition methods ====

	    /**
	     * Invoked when the component is mounted. Values in the mapping will be set on
	     * `this.props` if that prop is not specified (i.e. using an `in` check).
	     *
	     * This method is invoked before `getInitialState` and therefore cannot rely
	     * on `this.state` or use `this.setState`.
	     *
	     * @return {object}
	     * @optional
	     */
	    getDefaultProps: 'DEFINE_MANY_MERGED',

	    /**
	     * Invoked once before the component is mounted. The return value will be used
	     * as the initial value of `this.state`.
	     *
	     *   getInitialState: function() {
	     *     return {
	     *       isOn: false,
	     *       fooBaz: new BazFoo()
	     *     }
	     *   }
	     *
	     * @return {object}
	     * @optional
	     */
	    getInitialState: 'DEFINE_MANY_MERGED',

	    /**
	     * @return {object}
	     * @optional
	     */
	    getChildContext: 'DEFINE_MANY_MERGED',

	    /**
	     * Uses props from `this.props` and state from `this.state` to render the
	     * structure of the component.
	     *
	     * No guarantees are made about when or how often this method is invoked, so
	     * it must not have side effects.
	     *
	     *   render: function() {
	     *     var name = this.props.name;
	     *     return <div>Hello, {name}!</div>;
	     *   }
	     *
	     * @return {ReactComponent}
	     * @required
	     */
	    render: 'DEFINE_ONCE',

	    // ==== Delegate methods ====

	    /**
	     * Invoked when the component is initially created and about to be mounted.
	     * This may have side effects, but any external subscriptions or data created
	     * by this method must be cleaned up in `componentWillUnmount`.
	     *
	     * @optional
	     */
	    componentWillMount: 'DEFINE_MANY',

	    /**
	     * Invoked when the component has been mounted and has a DOM representation.
	     * However, there is no guarantee that the DOM node is in the document.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been mounted (initialized and rendered) for the first time.
	     *
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidMount: 'DEFINE_MANY',

	    /**
	     * Invoked before the component receives new props.
	     *
	     * Use this as an opportunity to react to a prop transition by updating the
	     * state using `this.setState`. Current props are accessed via `this.props`.
	     *
	     *   componentWillReceiveProps: function(nextProps, nextContext) {
	     *     this.setState({
	     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	     *     });
	     *   }
	     *
	     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	     * transition may cause a state change, but the opposite is not true. If you
	     * need it, you are probably looking for `componentWillUpdate`.
	     *
	     * @param {object} nextProps
	     * @optional
	     */
	    componentWillReceiveProps: 'DEFINE_MANY',

	    /**
	     * Invoked while deciding if the component should be updated as a result of
	     * receiving new props, state and/or context.
	     *
	     * Use this as an opportunity to `return false` when you're certain that the
	     * transition to the new props/state/context will not require a component
	     * update.
	     *
	     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	     *     return !equal(nextProps, this.props) ||
	     *       !equal(nextState, this.state) ||
	     *       !equal(nextContext, this.context);
	     *   }
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @return {boolean} True if the component should update.
	     * @optional
	     */
	    shouldComponentUpdate: 'DEFINE_ONCE',

	    /**
	     * Invoked when the component is about to update due to a transition from
	     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	     * and `nextContext`.
	     *
	     * Use this as an opportunity to perform preparation before an update occurs.
	     *
	     * NOTE: You **cannot** use `this.setState()` in this method.
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @param {ReactReconcileTransaction} transaction
	     * @optional
	     */
	    componentWillUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component's DOM representation has been updated.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been updated.
	     *
	     * @param {object} prevProps
	     * @param {?object} prevState
	     * @param {?object} prevContext
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component is about to be removed from its parent and have
	     * its DOM representation destroyed.
	     *
	     * Use this as an opportunity to deallocate any external resources.
	     *
	     * NOTE: There is no `componentDidUnmount` since your component will have been
	     * destroyed by that point.
	     *
	     * @optional
	     */
	    componentWillUnmount: 'DEFINE_MANY',

	    // ==== Advanced methods ====

	    /**
	     * Updates the component's currently mounted DOM representation.
	     *
	     * By default, this implements React's rendering and reconciliation algorithm.
	     * Sophisticated clients may wish to override this.
	     *
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     * @overridable
	     */
	    updateComponent: 'OVERRIDE_BASE'
	  };

	  /**
	   * Mapping from class specification keys to special processing functions.
	   *
	   * Although these are declared like instance properties in the specification
	   * when defining classes using `React.createClass`, they are actually static
	   * and are accessible on the constructor instead of the prototype. Despite
	   * being static, they must be defined outside of the "statics" key under
	   * which all other static methods are defined.
	   */
	  var RESERVED_SPEC_KEYS = {
	    displayName: function(Constructor, displayName) {
	      Constructor.displayName = displayName;
	    },
	    mixins: function(Constructor, mixins) {
	      if (mixins) {
	        for (var i = 0; i < mixins.length; i++) {
	          mixSpecIntoComponent(Constructor, mixins[i]);
	        }
	      }
	    },
	    childContextTypes: function(Constructor, childContextTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, childContextTypes, 'childContext');
	      }
	      Constructor.childContextTypes = _assign(
	        {},
	        Constructor.childContextTypes,
	        childContextTypes
	      );
	    },
	    contextTypes: function(Constructor, contextTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, contextTypes, 'context');
	      }
	      Constructor.contextTypes = _assign(
	        {},
	        Constructor.contextTypes,
	        contextTypes
	      );
	    },
	    /**
	     * Special case getDefaultProps which should move into statics but requires
	     * automatic merging.
	     */
	    getDefaultProps: function(Constructor, getDefaultProps) {
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps = createMergedResultFunction(
	          Constructor.getDefaultProps,
	          getDefaultProps
	        );
	      } else {
	        Constructor.getDefaultProps = getDefaultProps;
	      }
	    },
	    propTypes: function(Constructor, propTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, propTypes, 'prop');
	      }
	      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	    },
	    statics: function(Constructor, statics) {
	      mixStaticSpecIntoComponent(Constructor, statics);
	    },
	    autobind: function() {}
	  };

	  function validateTypeDef(Constructor, typeDef, location) {
	    for (var propName in typeDef) {
	      if (typeDef.hasOwnProperty(propName)) {
	        // use a warning instead of an _invariant so components
	        // don't show up in prod but only in __DEV__
	        if (process.env.NODE_ENV !== 'production') {
	          warning(
	            typeof typeDef[propName] === 'function',
	            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
	              'React.PropTypes.',
	            Constructor.displayName || 'ReactClass',
	            ReactPropTypeLocationNames[location],
	            propName
	          );
	        }
	      }
	    }
	  }

	  function validateMethodOverride(isAlreadyDefined, name) {
	    var specPolicy = ReactClassInterface.hasOwnProperty(name)
	      ? ReactClassInterface[name]
	      : null;

	    // Disallow overriding of base class methods unless explicitly allowed.
	    if (ReactClassMixin.hasOwnProperty(name)) {
	      _invariant(
	        specPolicy === 'OVERRIDE_BASE',
	        'ReactClassInterface: You are attempting to override ' +
	          '`%s` from your class specification. Ensure that your method names ' +
	          'do not overlap with React methods.',
	        name
	      );
	    }

	    // Disallow defining methods more than once unless explicitly allowed.
	    if (isAlreadyDefined) {
	      _invariant(
	        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
	        'ReactClassInterface: You are attempting to define ' +
	          '`%s` on your component more than once. This conflict may be due ' +
	          'to a mixin.',
	        name
	      );
	    }
	  }

	  /**
	   * Mixin helper which handles policy validation and reserved
	   * specification keys when building React classes.
	   */
	  function mixSpecIntoComponent(Constructor, spec) {
	    if (!spec) {
	      if (process.env.NODE_ENV !== 'production') {
	        var typeofSpec = typeof spec;
	        var isMixinValid = typeofSpec === 'object' && spec !== null;

	        if (process.env.NODE_ENV !== 'production') {
	          warning(
	            isMixinValid,
	            "%s: You're attempting to include a mixin that is either null " +
	              'or not an object. Check the mixins included by the component, ' +
	              'as well as any mixins they include themselves. ' +
	              'Expected object but got %s.',
	            Constructor.displayName || 'ReactClass',
	            spec === null ? null : typeofSpec
	          );
	        }
	      }

	      return;
	    }

	    _invariant(
	      typeof spec !== 'function',
	      "ReactClass: You're attempting to " +
	        'use a component class or function as a mixin. Instead, just use a ' +
	        'regular object.'
	    );
	    _invariant(
	      !isValidElement(spec),
	      "ReactClass: You're attempting to " +
	        'use a component as a mixin. Instead, just use a regular object.'
	    );

	    var proto = Constructor.prototype;
	    var autoBindPairs = proto.__reactAutoBindPairs;

	    // By handling mixins before any other properties, we ensure the same
	    // chaining order is applied to methods with DEFINE_MANY policy, whether
	    // mixins are listed before or after these methods in the spec.
	    if (spec.hasOwnProperty(MIXINS_KEY)) {
	      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	    }

	    for (var name in spec) {
	      if (!spec.hasOwnProperty(name)) {
	        continue;
	      }

	      if (name === MIXINS_KEY) {
	        // We have already handled mixins in a special case above.
	        continue;
	      }

	      var property = spec[name];
	      var isAlreadyDefined = proto.hasOwnProperty(name);
	      validateMethodOverride(isAlreadyDefined, name);

	      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	        RESERVED_SPEC_KEYS[name](Constructor, property);
	      } else {
	        // Setup methods on prototype:
	        // The following member methods should not be automatically bound:
	        // 1. Expected ReactClass methods (in the "interface").
	        // 2. Overridden methods (that were mixed in).
	        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	        var isFunction = typeof property === 'function';
	        var shouldAutoBind =
	          isFunction &&
	          !isReactClassMethod &&
	          !isAlreadyDefined &&
	          spec.autobind !== false;

	        if (shouldAutoBind) {
	          autoBindPairs.push(name, property);
	          proto[name] = property;
	        } else {
	          if (isAlreadyDefined) {
	            var specPolicy = ReactClassInterface[name];

	            // These cases should already be caught by validateMethodOverride.
	            _invariant(
	              isReactClassMethod &&
	                (specPolicy === 'DEFINE_MANY_MERGED' ||
	                  specPolicy === 'DEFINE_MANY'),
	              'ReactClass: Unexpected spec policy %s for key %s ' +
	                'when mixing in component specs.',
	              specPolicy,
	              name
	            );

	            // For methods which are defined more than once, call the existing
	            // methods before calling the new property, merging if appropriate.
	            if (specPolicy === 'DEFINE_MANY_MERGED') {
	              proto[name] = createMergedResultFunction(proto[name], property);
	            } else if (specPolicy === 'DEFINE_MANY') {
	              proto[name] = createChainedFunction(proto[name], property);
	            }
	          } else {
	            proto[name] = property;
	            if (process.env.NODE_ENV !== 'production') {
	              // Add verbose displayName to the function, which helps when looking
	              // at profiling tools.
	              if (typeof property === 'function' && spec.displayName) {
	                proto[name].displayName = spec.displayName + '_' + name;
	              }
	            }
	          }
	        }
	      }
	    }
	  }

	  function mixStaticSpecIntoComponent(Constructor, statics) {
	    if (!statics) {
	      return;
	    }
	    for (var name in statics) {
	      var property = statics[name];
	      if (!statics.hasOwnProperty(name)) {
	        continue;
	      }

	      var isReserved = name in RESERVED_SPEC_KEYS;
	      _invariant(
	        !isReserved,
	        'ReactClass: You are attempting to define a reserved ' +
	          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
	          'as an instance property instead; it will still be accessible on the ' +
	          'constructor.',
	        name
	      );

	      var isInherited = name in Constructor;
	      _invariant(
	        !isInherited,
	        'ReactClass: You are attempting to define ' +
	          '`%s` on your component more than once. This conflict may be ' +
	          'due to a mixin.',
	        name
	      );
	      Constructor[name] = property;
	    }
	  }

	  /**
	   * Merge two objects, but throw if both contain the same key.
	   *
	   * @param {object} one The first object, which is mutated.
	   * @param {object} two The second object
	   * @return {object} one after it has been mutated to contain everything in two.
	   */
	  function mergeIntoWithNoDuplicateKeys(one, two) {
	    _invariant(
	      one && two && typeof one === 'object' && typeof two === 'object',
	      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
	    );

	    for (var key in two) {
	      if (two.hasOwnProperty(key)) {
	        _invariant(
	          one[key] === undefined,
	          'mergeIntoWithNoDuplicateKeys(): ' +
	            'Tried to merge two objects with the same key: `%s`. This conflict ' +
	            'may be due to a mixin; in particular, this may be caused by two ' +
	            'getInitialState() or getDefaultProps() methods returning objects ' +
	            'with clashing keys.',
	          key
	        );
	        one[key] = two[key];
	      }
	    }
	    return one;
	  }

	  /**
	   * Creates a function that invokes two functions and merges their return values.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createMergedResultFunction(one, two) {
	    return function mergedResult() {
	      var a = one.apply(this, arguments);
	      var b = two.apply(this, arguments);
	      if (a == null) {
	        return b;
	      } else if (b == null) {
	        return a;
	      }
	      var c = {};
	      mergeIntoWithNoDuplicateKeys(c, a);
	      mergeIntoWithNoDuplicateKeys(c, b);
	      return c;
	    };
	  }

	  /**
	   * Creates a function that invokes two functions and ignores their return vales.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createChainedFunction(one, two) {
	    return function chainedFunction() {
	      one.apply(this, arguments);
	      two.apply(this, arguments);
	    };
	  }

	  /**
	   * Binds a method to the component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   * @param {function} method Method to be bound.
	   * @return {function} The bound method.
	   */
	  function bindAutoBindMethod(component, method) {
	    var boundMethod = method.bind(component);
	    if (process.env.NODE_ENV !== 'production') {
	      boundMethod.__reactBoundContext = component;
	      boundMethod.__reactBoundMethod = method;
	      boundMethod.__reactBoundArguments = null;
	      var componentName = component.constructor.displayName;
	      var _bind = boundMethod.bind;
	      boundMethod.bind = function(newThis) {
	        for (
	          var _len = arguments.length,
	            args = Array(_len > 1 ? _len - 1 : 0),
	            _key = 1;
	          _key < _len;
	          _key++
	        ) {
	          args[_key - 1] = arguments[_key];
	        }

	        // User is trying to bind() an autobound method; we effectively will
	        // ignore the value of "this" that the user is trying to use, so
	        // let's warn.
	        if (newThis !== component && newThis !== null) {
	          if (process.env.NODE_ENV !== 'production') {
	            warning(
	              false,
	              'bind(): React component methods may only be bound to the ' +
	                'component instance. See %s',
	              componentName
	            );
	          }
	        } else if (!args.length) {
	          if (process.env.NODE_ENV !== 'production') {
	            warning(
	              false,
	              'bind(): You are binding a component method to the component. ' +
	                'React does this for you automatically in a high-performance ' +
	                'way, so you can safely remove this call. See %s',
	              componentName
	            );
	          }
	          return boundMethod;
	        }
	        var reboundMethod = _bind.apply(boundMethod, arguments);
	        reboundMethod.__reactBoundContext = component;
	        reboundMethod.__reactBoundMethod = method;
	        reboundMethod.__reactBoundArguments = args;
	        return reboundMethod;
	      };
	    }
	    return boundMethod;
	  }

	  /**
	   * Binds all auto-bound methods in a component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   */
	  function bindAutoBindMethods(component) {
	    var pairs = component.__reactAutoBindPairs;
	    for (var i = 0; i < pairs.length; i += 2) {
	      var autoBindKey = pairs[i];
	      var method = pairs[i + 1];
	      component[autoBindKey] = bindAutoBindMethod(component, method);
	    }
	  }

	  var IsMountedPreMixin = {
	    componentDidMount: function() {
	      this.__isMounted = true;
	    }
	  };

	  var IsMountedPostMixin = {
	    componentWillUnmount: function() {
	      this.__isMounted = false;
	    }
	  };

	  /**
	   * Add more to the ReactClass base class. These are all legacy features and
	   * therefore not already part of the modern ReactComponent.
	   */
	  var ReactClassMixin = {
	    /**
	     * TODO: This will be deprecated because state should always keep a consistent
	     * type signature and the only use case for this, is to avoid that.
	     */
	    replaceState: function(newState, callback) {
	      this.updater.enqueueReplaceState(this, newState, callback);
	    },

	    /**
	     * Checks whether or not this composite component is mounted.
	     * @return {boolean} True if mounted, false otherwise.
	     * @protected
	     * @final
	     */
	    isMounted: function() {
	      if (process.env.NODE_ENV !== 'production') {
	        warning(
	          this.__didWarnIsMounted,
	          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
	            'subscriptions and pending requests in componentWillUnmount to ' +
	            'prevent memory leaks.',
	          (this.constructor && this.constructor.displayName) ||
	            this.name ||
	            'Component'
	        );
	        this.__didWarnIsMounted = true;
	      }
	      return !!this.__isMounted;
	    }
	  };

	  var ReactClassComponent = function() {};
	  _assign(
	    ReactClassComponent.prototype,
	    ReactComponent.prototype,
	    ReactClassMixin
	  );

	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  function createClass(spec) {
	    // To keep our warnings more understandable, we'll use a little hack here to
	    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
	    // unnecessarily identify a class without displayName as 'Constructor'.
	    var Constructor = identity(function(props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.

	      if (process.env.NODE_ENV !== 'production') {
	        warning(
	          this instanceof Constructor,
	          'Something is calling a React component directly. Use a factory or ' +
	            'JSX instead. See: https://fb.me/react-legacyfactory'
	        );
	      }

	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;

	      this.state = null;

	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (process.env.NODE_ENV !== 'production') {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (
	          initialState === undefined &&
	          this.getInitialState._isMockFunction
	        ) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      _invariant(
	        typeof initialState === 'object' && !Array.isArray(initialState),
	        '%s.getInitialState(): must return an object or null',
	        Constructor.displayName || 'ReactCompositeComponent'
	      );

	      this.state = initialState;
	    });
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];

	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

	    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
	    mixSpecIntoComponent(Constructor, spec);
	    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }

	    _invariant(
	      Constructor.prototype.render,
	      'createClass(...): Class specification must implement a `render` method.'
	    );

	    if (process.env.NODE_ENV !== 'production') {
	      warning(
	        !Constructor.prototype.componentShouldUpdate,
	        '%s has a method called ' +
	          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
	          'The name is phrased as a question because the function is ' +
	          'expected to return a value.',
	        spec.displayName || 'A component'
	      );
	      warning(
	        !Constructor.prototype.componentWillRecieveProps,
	        '%s has a method called ' +
	          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
	        spec.displayName || 'A component'
	      );
	    }

	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    return Constructor;
	  }

	  return createClass;
	}

	module.exports = factory;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 32 */
/***/ (function(module, exports) {

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


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyObject = {};

	if (process.env.NODE_ENV !== 'production') {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(11);

	exports.__esModule = true;

	/**
	 * document.activeElement
	 */
	exports['default'] = activeElement;

	var _ownerDocument = __webpack_require__(35);

	var _ownerDocument2 = babelHelpers.interopRequireDefault(_ownerDocument);

	function activeElement() {
	  var doc = arguments[0] === undefined ? document : arguments[0];

	  try {
	    return doc.activeElement;
	  } catch (e) {}
	}

	module.exports = exports['default'];

/***/ }),
/* 35 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = ownerDocument;

	function ownerDocument(node) {
	  return node && node.ownerDocument || document;
	}

	module.exports = exports["default"];

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(14);

	var contains = (function () {
	  var root = canUseDOM && document.documentElement;

	  return root && root.contains ? function (context, node) {
	    return context.contains(node);
	  } : root && root.compareDocumentPosition ? function (context, node) {
	    return context === node || !!(context.compareDocumentPosition(node) & 16);
	  } : function (context, node) {
	    if (node) do {
	      if (node === context) return true;
	    } while (node = node.parentNode);

	    return false;
	  };
	})();

	module.exports = contains;

/***/ }),
/* 37 */
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
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _class, _temp;

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(37);

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
	        open = _props.open,
	        dropUp = _props.dropUp,
	        disabled = _props.disabled,
	        readOnly = _props.readOnly,
	        focused = _props.focused,
	        props = _objectWithoutProperties(_props, ['className', 'tabIndex', 'open', 'dropUp', 'disabled', 'readOnly', 'focused']);

	    var isRtl = !!this.context.isRtl;
	    var openClass = 'rw-open' + (dropUp ? '-up' : '');

	    tabIndex = tabIndex != null ? tabIndex : '-1';

	    return _react2.default.createElement('div', _extends({}, props, {
	      tabIndex: tabIndex,
	      className: (0, _classnames2.default)(className, 'rw-widget', isRtl && 'rw-rtl', open && openClass, focused && 'rw-state-focus', disabled && 'rw-state-disabled', readOnly && 'rw-state-readonly')
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(37);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Input = function (_React$Component) {
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
	        _props$component = _props.component,
	        Component = _props$component === undefined ? 'input' : _props$component,
	        props = _objectWithoutProperties(_props, ['className', 'disabled', 'readOnly', 'value', 'tabIndex', 'component']);

	    return _react2.default.createElement(Component, _extends({}, props, {
	      type: 'text',
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
	}(_react2.default.Component);

	exports.default = Input;
	module.exports = exports['default'];

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(37);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _Button = __webpack_require__(41);

	var _Button2 = _interopRequireDefault(_Button);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Select = function (_React$Component) {
	  _inherits(Select, _React$Component);

	  function Select() {
	    _classCallCheck(this, Select);

	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }

	  Select.prototype.render = function render() {
	    var _props = this.props,
	        className = _props.className,
	        props = _objectWithoutProperties(_props, ['className']);

	    return _react2.default.createElement(_Button2.default, _extends({}, props, {
	      className: (0, _classnames2.default)(className, 'rw-select')
	    }));
	  };

	  return Select;
	}(_react2.default.Component);

	exports.default = Select;
	module.exports = exports['default'];

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(37);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Button = function (_React$Component) {
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
	        _props$component = _props.component,
	        Tag = _props$component === undefined ? 'button' : _props$component,
	        props = _objectWithoutProperties(_props, ['className', 'disabled', 'label', 'icon', 'busy', 'active', 'children', 'component']);

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
	        className: (0, _classnames2.default)(className, 'rw-btn', active && !disabled && 'rw-state-active')
	      }),
	      icon && _react2.default.createElement('span', {
	        'aria-hidden': true,
	        className: (0, _classnames2.default)('rw-i', 'rw-i-' + icon, busy && 'rw-loading')
	      }),
	      children
	    );
	  };

	  return Button;
	}(_react2.default.Component);

	exports.default = Button;
	module.exports = exports['default'];

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _class, _temp;

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _propTypes3 = __webpack_require__(43);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

	var _dataHelpers = __webpack_require__(45);

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
	      { className: 'rw-input' },
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
	  textField: _propTypes4.default.accessor,
	  valueComponent: _propTypes4.default.elementType
	}, _temp);
	exports.default = DropdownListInput;
	module.exports = exports['default'];

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _localizers = __webpack_require__(17);

	var _localizers2 = _interopRequireDefault(_localizers);

	var _filter = __webpack_require__(44);

	var _filter2 = _interopRequireDefault(_filter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var filterTypes = Object.keys(_filter2.default).filter(function (i) {
	  return i !== 'filter';
	});

	function getInteractionPropType(key) {
	  var types = [_propTypes2.default.bool, _propTypes2.default.oneOf([key])],
	      propType = _propTypes2.default.oneOfType(types);

	  propType.acceptsArray = _propTypes2.default.oneOfType(types.concat(_propTypes2.default.array));

	  return propType;
	}

	module.exports = {

	  elementType: createChainableTypeChecker(function (props, propName, componentName) {

	    if (typeof props[propName] !== 'function') {
	      if (_react2.default.isValidElement(props[propName])) return new Error('Invalid prop `' + propName + '` specified in  `' + componentName + '`.' + ' Expected an Element `type`, not an actual Element');

	      if (typeof props[propName] !== 'string') return new Error('Invalid prop `' + propName + '` specified in  `' + componentName + '`.' + ' Expected an Element `type` such as a tag name or return value of createReactClass(...)');
	    }
	    return null;
	  }),

	  numberFormat: createChainableTypeChecker(function () {
	    var _localizers$number;

	    return (_localizers$number = _localizers2.default.number).propType.apply(_localizers$number, arguments);
	  }),

	  dateFormat: createChainableTypeChecker(function () {
	    var _localizers$date;

	    return (_localizers$date = _localizers2.default.date).propType.apply(_localizers$date, arguments);
	  }),

	  disabled: getInteractionPropType('disabled'),
	  readOnly: getInteractionPropType('readOnly'),

	  accessor: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),

	  message: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),

	  filter: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.bool, _propTypes2.default.oneOf(filterTypes)])
	};

	function createChainableTypeChecker(validate) {

	  function checkType(isRequired, props, propName, componentName) {
	    componentName = componentName || '<<anonymous>>';

	    for (var _len = arguments.length, args = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
	      args[_key - 4] = arguments[_key];
	    }

	    if (props[propName] == null) {
	      if (isRequired) {
	        return new Error('Required prop `' + propName + '` was not specified in  `' + componentName + '`.');
	      }
	    } else return validate.apply(undefined, [props, propName, componentName].concat(args));
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);

	  return chainedCheckType;
	}

/***/ }),
/* 44 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var common = {
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
	    var pos = a.length - b.length,
	        lastIndex = a.indexOf(b, pos);

	    return lastIndex !== -1 && lastIndex === pos;
	  }
	};

	exports.default = common;
	module.exports = exports['default'];

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.dataValue = dataValue;
	exports.dataText = dataText;
	exports.dataIndexOf = dataIndexOf;
	exports.valueMatcher = valueMatcher;
	exports.dataItem = dataItem;

	var _ = __webpack_require__(19);

	function accessor(data, field) {
	  var value = data;

	  if (typeof field === 'function') value = field(data);else if (data == null) value = data;else if (typeof field === 'string' && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && field in data) value = data[field];

	  return value;
	}

	function dataValue(item, valueField) {
	  return valueField && item && (0, _.has)(item, valueField) ? item[valueField] : item;
	}

	function dataText(item, textField) {
	  var value = accessor(item, textField);
	  return value == null ? '' : value + '';
	}

	function dataIndexOf(data, item, valueField) {
	  var idx = -1,
	      len = data.length,
	      isValueEqual = function isValueEqual(datum) {
	    return valueMatcher(item, datum, valueField);
	  };

	  while (++idx < len) {
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

	  if (idx !== -1) return data[idx];

	  return item;
	}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _OVERFLOW;

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	var _style = __webpack_require__(6);

	var _style2 = _interopRequireDefault(_style);

	var _height = __webpack_require__(47);

	var _height2 = _interopRequireDefault(_height);

	var _camelizeStyle = __webpack_require__(7);

	var _camelizeStyle2 = _interopRequireDefault(_camelizeStyle);

	var _configuration = __webpack_require__(3);

	var _configuration2 = _interopRequireDefault(_configuration);

	var _classnames = __webpack_require__(37);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _compat = __webpack_require__(50);

	var _compat2 = _interopRequireDefault(_compat);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var transform = (0, _camelizeStyle2.default)(_configuration2.default.animate.transform);

	var CLOSING = 0,
	    CLOSED = 1,
	    OPENING = 2,
	    OPEN = 3;

	function properties(prop, value) {
	  var _ref, _ref2;

	  var TRANSLATION_MAP = _configuration2.default.animate.TRANSLATION_MAP;

	  if (TRANSLATION_MAP && TRANSLATION_MAP[prop]) return _ref = {}, _ref[transform] = TRANSLATION_MAP[prop] + '(' + value + ')', _ref;

	  return _ref2 = {}, _ref2[prop] = value, _ref2;
	}

	var OVERFLOW = (_OVERFLOW = {}, _OVERFLOW[CLOSED] = 'hidden', _OVERFLOW[CLOSING] = 'hidden', _OVERFLOW[OPENING] = 'hidden', _OVERFLOW);

	var propTypes = {
	  open: _propTypes2.default.bool,
	  dropUp: _propTypes2.default.bool,
	  duration: _propTypes2.default.number,

	  onClosing: _propTypes2.default.func,
	  onOpening: _propTypes2.default.func,
	  onClose: _propTypes2.default.func,
	  onOpen: _propTypes2.default.func
	};

	exports.default = (0, _createReactClass2.default)({

	  displayName: 'Popup',

	  propTypes: propTypes,

	  getInitialState: function getInitialState() {
	    return {
	      initialRender: true,
	      status: this.props.open ? OPENING : CLOSED
	    };
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      duration: 200,
	      open: false,
	      onClosing: function onClosing() {},
	      onOpening: function onOpening() {},
	      onClose: function onClose() {},
	      onOpen: function onOpen() {}
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState({
	      contentChanged: childKey(nextProps.children) !== childKey(this.props.children)
	    });
	  },
	  componentDidMount: function componentDidMount() {
	    var _this = this;

	    var isOpen = this.state.status === OPENING;

	    _compat2.default.batchedUpdates(function () {
	      _this.setState({ initialRender: false });
	      if (isOpen) {
	        _this.open();
	      }
	    });
	  },
	  componentDidUpdate: function componentDidUpdate(pvProps) {
	    var closing = pvProps.open && !this.props.open,
	        opening = !pvProps.open && this.props.open,
	        open = this.props.open,
	        status = this.state.status;

	    if (!!pvProps.dropUp !== !!this.props.dropUp) {
	      this.cancelNextCallback();
	      if (status === OPENING) this.open();
	      if (status === CLOSING) this.close();
	      return;
	    }

	    if (opening) this.open();else if (closing) this.close();else if (open) {
	      // this.height() returns a floating point number with the desired height
	      // for this popup. Because of potential rounding errors in floating point
	      // aritmetic we must allow an error margin when comparing to the current
	      // state, otherwise we can end up in an infinite loop where the height
	      // is never exactly equal to our target value.
	      var height = this.height(),
	          diff = Math.abs(height - this.state.height);
	      if (isNaN(diff) || diff > 0.1) this.setState({ height: height });
	    }
	  },
	  render: function render() {
	    var _props = this.props,
	        className = _props.className,
	        dropUp = _props.dropUp,
	        style = _props.style,
	        _state = this.state,
	        status = _state.status,
	        height = _state.height;


	    var overflow = OVERFLOW[status] || 'visible',
	        display = status === CLOSED ? 'none' : 'block';

	    return _react2.default.createElement(
	      'div',
	      {
	        style: _extends({
	          display: display,
	          overflow: overflow,
	          height: height
	        }, style),
	        className: (0, _classnames2.default)(className, 'rw-popup-container', dropUp && 'rw-dropup', this.isTransitioning() && 'rw-popup-animating')
	      },
	      this.renderChildren()
	    );
	  },
	  renderChildren: function renderChildren() {
	    if (!this.props.children) return _react2.default.createElement('span', { className: 'rw-popup rw-widget' });

	    var offset = this.getOffsetForStatus(this.state.status),
	        child = _react2.default.Children.only(this.props.children);

	    return (0, _react.cloneElement)(child, {
	      style: _extends({}, child.props.style, offset, {
	        position: this.isTransitioning() ? 'absolute' : undefined
	      }),
	      className: (0, _classnames2.default)(child.props.className, 'rw-popup rw-widget')
	    });
	  },
	  open: function open() {
	    var _this2 = this;

	    this.cancelNextCallback();
	    var el = _compat2.default.findDOMNode(this).firstChild,
	        height = this.height();

	    this.props.onOpening();

	    this.safeSetState({ status: OPENING, height: height }, function () {
	      var offset = _this2.getOffsetForStatus(OPEN),
	          duration = _this2.props.duration;

	      _this2.animate(el, offset, duration, 'ease', function () {
	        _this2.safeSetState({ status: OPEN }, function () {
	          _this2.props.onOpen();
	        });
	      });
	    });
	  },
	  close: function close() {
	    var _this3 = this;

	    this.cancelNextCallback();
	    var el = _compat2.default.findDOMNode(this).firstChild,
	        height = this.height();

	    this.props.onClosing();

	    this.safeSetState({ status: CLOSING, height: height }, function () {
	      var offset = _this3.getOffsetForStatus(CLOSED),
	          duration = _this3.props.duration;

	      _this3.animate(el, offset, duration, 'ease', function () {
	        return _this3.safeSetState({ status: CLOSED }, function () {
	          _this3.props.onClose();
	        });
	      });
	    });
	  },
	  getOffsetForStatus: function getOffsetForStatus(status) {
	    var _CLOSED$CLOSING$OPENI;

	    if (this.state.initialRender) return {};

	    var _in = properties('top', this.props.dropUp ? '100%' : '-100%'),
	        out = properties('top', 0);
	    return (_CLOSED$CLOSING$OPENI = {}, _CLOSED$CLOSING$OPENI[CLOSED] = _in, _CLOSED$CLOSING$OPENI[CLOSING] = out, _CLOSED$CLOSING$OPENI[OPENING] = _in, _CLOSED$CLOSING$OPENI[OPEN] = out, _CLOSED$CLOSING$OPENI)[status] || {};
	  },
	  height: function height() {
	    var container = _compat2.default.findDOMNode(this),
	        content = container.firstChild,
	        margin = parseInt((0, _style2.default)(content, 'margin-top'), 10) + parseInt((0, _style2.default)(content, 'margin-bottom'), 10);

	    var old = container.style.display,
	        height = void 0;

	    container.style.display = 'block';
	    height = ((0, _height2.default)(content) || 0) + (isNaN(margin) ? 0 : margin);
	    container.style.display = old;
	    return height;
	  },
	  isTransitioning: function isTransitioning() {
	    return this.state.status === OPENING || this.state.status === CLOSED;
	  },
	  animate: function animate(el, props, dur, easing, cb) {
	    this._transition = _configuration2.default.animate(el, props, dur, easing, this.setNextCallback(cb));
	  },
	  cancelNextCallback: function cancelNextCallback() {
	    if (this._transition && this._transition.cancel) {
	      this._transition.cancel();
	      this._transition = null;
	    }
	    if (this.nextCallback) {
	      this.nextCallback.cancel();
	      this.nextCallback = null;
	    }
	  },
	  safeSetState: function safeSetState(nextState, callback) {
	    this.setState(nextState, this.setNextCallback(callback));
	  },
	  setNextCallback: function setNextCallback(callback) {
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
	      return active = false;
	    };
	    return this.nextCallback;
	  }
	});


	function childKey(children) {
	  var nextChildMapping = _react2.default.Children.map(children, function (c) {
	    return c;
	  });
	  for (var key in nextChildMapping) {
	    return key;
	  }
	}
	module.exports = exports['default'];

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var offset = __webpack_require__(48),
	    getWindow = __webpack_require__(49);

	module.exports = function height(node, client) {
	  var win = getWindow(node);
	  return win ? win.innerHeight : client ? node.clientHeight : offset(node).height;
	};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var contains = __webpack_require__(36),
	    getWindow = __webpack_require__(49),
	    ownerDocument = __webpack_require__(35);

	module.exports = function offset(node) {
	  var doc = ownerDocument(node),
	      win = getWindow(doc),
	      docElem = doc && doc.documentElement,
	      box = { top: 0, left: 0, height: 0, width: 0 };

	  if (!doc) return;

	  // Make sure it's not a disconnected DOM node
	  if (!contains(docElem, node)) return box;

	  if (node.getBoundingClientRect !== undefined) box = node.getBoundingClientRect();

	  if (box.width || box.height) {

	    box = {
	      top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
	      left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0),
	      width: (box.width == null ? node.offsetWidth : box.width) || 0,
	      height: (box.height == null ? node.offsetHeight : box.height) || 0
	    };
	  }

	  return box;
	};

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function getWindow(node) {
	  return node === node.window ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : false;
	};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(51);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _version = _react2.default.version.split('.').map(parseFloat);

	module.exports = {
	  version: function version() {
	    return _version;
	  },
	  findDOMNode: function findDOMNode(component) {
	    return _reactDom2.default.findDOMNode(component);
	  },
	  batchedUpdates: function batchedUpdates(cb) {
	    _reactDom2.default.unstable_batchedUpdates(cb);
	  }
	};

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_51__;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _ListOption = __webpack_require__(53);

	var _ListOption2 = _interopRequireDefault(_ListOption);

	var _propTypes3 = __webpack_require__(43);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

	var _compat = __webpack_require__(50);

	var _compat2 = _interopRequireDefault(_compat);

	var _classnames = __webpack_require__(37);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	var _dataHelpers = __webpack_require__(45);

	var _widgetHelpers = __webpack_require__(54);

	var _interaction = __webpack_require__(55);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var optionId = function optionId(id, idx) {
	  return id + '__option__' + idx;
	};

	exports.default = (0, _createReactClass2.default)({

	  displayName: 'List',

	  mixins: [__webpack_require__(56), __webpack_require__(57)()],

	  propTypes: {
	    data: _propTypes2.default.array,
	    onSelect: _propTypes2.default.func,
	    onMove: _propTypes2.default.func,

	    optionComponent: _propTypes4.default.elementType,
	    itemComponent: _propTypes4.default.elementType,

	    selected: _propTypes2.default.any,
	    focused: _propTypes2.default.any,
	    valueField: _propTypes4.default.accessor,
	    textField: _propTypes4.default.accessor,

	    disabled: _propTypes4.default.disabled.acceptsArray,
	    readOnly: _propTypes4.default.readOnly.acceptsArray,

	    messages: _propTypes2.default.shape({
	      emptyList: _propTypes4.default.message
	    })
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      onSelect: function onSelect() {},
	      optionComponent: _ListOption2.default,
	      ariaActiveDescendantKey: 'list',
	      data: [],
	      messages: {
	        emptyList: 'There are no items in this list'
	      }
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    this.move();
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    var _props = this.props,
	        data = _props.data,
	        focused = _props.focused,
	        idx = data.indexOf(focused),
	        activeId = optionId((0, _widgetHelpers.instanceId)(this), idx);


	    this.ariaActiveDescendant(idx !== -1 ? activeId : null);

	    this.move();
	  },
	  render: function render() {
	    var _this = this;

	    var _props2 = this.props,
	        className = _props2.className,
	        role = _props2.role,
	        data = _props2.data,
	        textField = _props2.textField,
	        valueField = _props2.valueField,
	        focused = _props2.focused,
	        selected = _props2.selected,
	        messages = _props2.messages,
	        onSelect = _props2.onSelect,
	        ItemComponent = _props2.itemComponent,
	        Option = _props2.optionComponent;


	    var id = (0, _widgetHelpers.instanceId)(this),
	        items = void 0;

	    var elementProps = _3.default.omitOwnProps(this);

	    items = !data.length ? _react2.default.createElement(
	      'li',
	      { className: 'rw-list-empty' },
	      _3.default.result(messages.emptyList, this.props)
	    ) : data.map(function (item, idx) {
	      var currentId = optionId(id, idx),
	          isDisabled = (0, _interaction.isDisabledItem)(item, _this.props),
	          isReadOnly = (0, _interaction.isReadOnlyItem)(item, _this.props);

	      return _react2.default.createElement(
	        Option,
	        {
	          key: 'item_' + idx,
	          id: currentId,
	          dataItem: item,
	          disabled: isDisabled,
	          readOnly: isReadOnly,
	          focused: focused === item,
	          selected: selected === item,
	          onClick: isDisabled || isReadOnly ? undefined : onSelect.bind(null, item)
	        },
	        ItemComponent ? _react2.default.createElement(ItemComponent, {
	          item: item,
	          value: (0, _dataHelpers.dataValue)(item, valueField),
	          text: (0, _dataHelpers.dataText)(item, textField),
	          disabled: isDisabled,
	          readOnly: isReadOnly
	        }) : (0, _dataHelpers.dataText)(item, textField)
	      );
	    });

	    return _react2.default.createElement(
	      'ul',
	      _extends({
	        id: id,
	        tabIndex: '-1',
	        className: (0, _classnames2.default)(className, 'rw-list'),
	        role: role === undefined ? 'listbox' : role
	      }, elementProps),
	      items
	    );
	  },
	  _data: function _data() {
	    return this.props.data;
	  },
	  move: function move() {
	    var list = _compat2.default.findDOMNode(this),
	        idx = this._data().indexOf(this.props.focused),
	        selected = list.children[idx];

	    if (!selected) return;

	    (0, _widgetHelpers.notify)(this.props.onMove, [selected, list, this.props.focused]);
	  }
	});
	module.exports = exports['default'];

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _classnames = __webpack_require__(37);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ListOption = (0, _createReactClass2.default)({
	  displayName: 'ListOption',

	  propTypes: {
	    dataItem: _propTypes2.default.any,
	    focused: _propTypes2.default.bool,
	    selected: _propTypes2.default.bool,
	    disabled: _propTypes2.default.bool,
	    readOnly: _propTypes2.default.bool
	  },

	  render: function render() {
	    var _props = this.props,
	        className = _props.className,
	        children = _props.children,
	        focused = _props.focused,
	        selected = _props.selected,
	        disabled = _props.disabled,
	        readOnly = _props.readOnly;


	    var props = _3.default.omitOwnProps(this);

	    var classes = {
	      'rw-state-focus': focused,
	      'rw-state-selected': selected,
	      'rw-state-disabled': disabled,
	      'rw-state-readonly': readOnly
	    };

	    return _react2.default.createElement(
	      'li',
	      _extends({
	        role: 'option',
	        tabIndex: !(disabled || readOnly) ? '-1' : undefined,
	        'aria-selected': !!selected,
	        className: (0, _classnames2.default)('rw-list-option', className, classes)
	      }, props),
	      children
	    );
	  }
	});

	exports.default = ListOption;
	module.exports = exports['default'];

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.notify = notify;
	exports.instanceId = instanceId;
	exports.isFirstFocusedRender = isFirstFocusedRender;

	var _ = __webpack_require__(19);

	function notify(handler, args) {
	  handler && handler.apply(null, [].concat(args));
	}

	function instanceId(component) {
	  var suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	  component.__id || (component.__id = (0, _.uniqueId)('rw_'));
	  return (component.props.id || component.__id) + suffix;
	}

	function isFirstFocusedRender(component) {
	  return component._firstFocus || component.state.focused && (component._firstFocus = true);
	}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.widgetEditable = exports.widgetEnabled = undefined;
	exports.isDisabled = isDisabled;
	exports.isReadOnly = isReadOnly;
	exports.isDisabledItem = isDisabledItem;
	exports.isReadOnlyItem = isReadOnlyItem;
	exports.contains = contains;
	exports.move = move;

	var _dataHelpers = __webpack_require__(45);

	function isDisabled(props) {
	  return props.disabled === true || props.disabled === 'disabled';
	}

	function isReadOnly(props) {
	  return props.readOnly === true || props.readOnly === 'readOnly';
	}

	function isDisabledItem(item, props) {
	  return isDisabled(props) || contains(item, props.disabled, props.valueField);
	}

	function isReadOnlyItem(item, props) {
	  return isReadOnly(props) || contains(item, props.readOnly, props.valueField);
	}

	function contains(item, values, valueField) {
	  return Array.isArray(values) ? values.some(function (value) {
	    return (0, _dataHelpers.valueMatcher)(item, value, valueField);
	  }) : (0, _dataHelpers.valueMatcher)(item, values, valueField);
	}

	function move(dir, item, props, list) {
	  var isDisabledOrReadonly = function isDisabledOrReadonly(item) {
	    return isDisabledItem(item, props) || isReadOnlyItem(item, props);
	  },
	      stop = dir === 'next' ? list.last() : list.first(),
	      next = list[dir](item);

	  while (next !== stop && isDisabledOrReadonly(next)) {
	    next = list[dir](next);
	  }return isDisabledOrReadonly(next) ? item : next;
	}

	var widgetEnabled = exports.widgetEnabled = interactionDecorator(true);

	var widgetEditable = exports.widgetEditable = interactionDecorator(false);

	function interactionDecorator(disabledOnly) {
	  function wrap(method) {
	    return function decoratedMethod() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      if (!(isDisabled(this.props) || !disabledOnly && isReadOnly(this.props))) return method.apply(this, args);
	    };
	  }

	  return function decorate(target, key, desc) {
	    if (desc.initializer) {
	      var init = desc.initializer;
	      desc.initializer = function () {
	        return wrap(init());
	      };
	    } else desc.value = wrap(desc.value);
	    return desc;
	  };
	}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _filter = __webpack_require__(44);

	var _filter2 = _interopRequireDefault(_filter);

	var _dataHelpers = __webpack_require__(45);

	var _propTypes = __webpack_require__(43);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _interaction = __webpack_require__(55);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EMPTY_VALUE = {};

	var isDisabledOrReadonly = function isDisabledOrReadonly(item, props) {
	  return (0, _interaction.isDisabledItem)(item, props) || (0, _interaction.isReadOnlyItem)(item, props);
	};

	exports.default = {

	  propTypes: {
	    textField: _propTypes2.default.accessor,
	    valueField: _propTypes2.default.accessor,
	    disabled: _propTypes2.default.disabled.acceptsArray,
	    readOnly: _propTypes2.default.readOnly.acceptsArray
	  },

	  first: function first() {
	    return this.next(EMPTY_VALUE);
	  },
	  last: function last() {
	    var data = this._data(),
	        item = data[data.length - 1];

	    return isDisabledOrReadonly(item, this.props) ? this.prev(item) : item;
	  },
	  prev: function prev(item, word) {
	    var data = this._data(),
	        nextIdx = data.indexOf(item),
	        matches = matcher(word, item, this.props.textField);

	    if (nextIdx < 0 || nextIdx == null) nextIdx = 0;

	    nextIdx--;

	    while (nextIdx > -1 && (isDisabledOrReadonly(data[nextIdx], this.props) || !matches(data[nextIdx]))) {
	      nextIdx--;
	    }return nextIdx >= 0 ? data[nextIdx] : item;
	  },
	  next: function next(item, word) {
	    var data = this._data(),
	        nextIdx = data.indexOf(item) + 1,
	        len = data.length,
	        matches = matcher(word, item, this.props.textField);

	    while (nextIdx < len && (isDisabledOrReadonly(data[nextIdx], this.props) || !matches(data[nextIdx]))) {
	      nextIdx++;
	    }return nextIdx < len ? data[nextIdx] : item;
	  }
	};


	function matcher(word, item, textField) {
	  if (!word) return function () {
	    return true;
	  };

	  word = word.toLowerCase();
	  return function (item) {
	    return _filter2.default.startsWith((0, _dataHelpers.dataText)(item, textField).toLowerCase(), word);
	  };
	}
	module.exports = exports['default'];

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	exports.default = function (nodeOrComponent) {
	  var reconcileChildren = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultReconcile;


	  return {
	    propTypes: {
	      ariaActiveDescendantKey: _propTypes2.default.string.isRequired
	    },

	    contextTypes: {
	      activeDescendants: shape
	    },

	    childContextTypes: {
	      activeDescendants: shape
	    },

	    ariaActiveDescendant: function ariaActiveDescendant(id) {
	      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.ariaActiveDescendantKey;
	      var activeDescendants = this.context.activeDescendants;

	      var current = this.__ariaActiveDescendantId;

	      if (id === undefined) return current;

	      id = reconcileChildren.call(this, key, id);

	      if (id === undefined) id = current;else {
	        this.__ariaActiveDescendantId = id;
	        flushAriaToNode(id, nodeOrComponent, this);
	      }

	      activeDescendants && activeDescendants.reconcile(key, id);
	    },
	    getChildContext: function getChildContext() {
	      var _this = this;

	      return this._context || (this._context = {
	        activeDescendants: {
	          reconcile: function reconcile(key, id) {
	            return _this.ariaActiveDescendant(id, key);
	          }
	        }
	      });
	    }
	  };
	};

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _compat = __webpack_require__(50);

	var _compat2 = _interopRequireDefault(_compat);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var shape = _propTypes2.default.shape({
	  //setActive: PropTypes.func,
	  reconcile: _propTypes2.default.func
	});

	function defaultReconcile(key, id) {
	  return id;
	}

	function flushAriaToNode(id, nodeOrComponent, ctx) {
	  var node = typeof nodeOrComponent === 'function' ? nodeOrComponent(ctx) : typeof nodeOrComponent === 'string' ? ctx.refs[nodeOrComponent] : ctx;

	  if (node) {
	    if (id) _compat2.default.findDOMNode(node).setAttribute('aria-activedescendant', id);else _compat2.default.findDOMNode(node).removeAttribute('aria-activedescendant');
	  }
	}

	module.exports = exports['default'];

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _ListOption = __webpack_require__(53);

	var _ListOption2 = _interopRequireDefault(_ListOption);

	var _propTypes3 = __webpack_require__(43);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

	var _compat = __webpack_require__(50);

	var _compat2 = _interopRequireDefault(_compat);

	var _classnames = __webpack_require__(37);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	var _warning = __webpack_require__(59);

	var _warning2 = _interopRequireDefault(_warning);

	var _dataHelpers = __webpack_require__(45);

	var _widgetHelpers = __webpack_require__(54);

	var _interaction = __webpack_require__(55);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var optionId = function optionId(id, idx) {
	  return id + '__option__' + idx;
	};

	exports.default = (0, _createReactClass2.default)({

	  displayName: 'List',

	  mixins: [__webpack_require__(56), __webpack_require__(57)()],

	  propTypes: {
	    data: _propTypes2.default.array,
	    onSelect: _propTypes2.default.func,
	    onMove: _propTypes2.default.func,

	    optionComponent: _propTypes4.default.elementType,
	    itemComponent: _propTypes4.default.elementType,
	    groupComponent: _propTypes4.default.elementType,

	    selected: _propTypes2.default.any,
	    focused: _propTypes2.default.any,

	    valueField: _propTypes4.default.accessor,
	    textField: _propTypes4.default.accessor,

	    disabled: _propTypes4.default.disabled.acceptsArray,
	    readOnly: _propTypes4.default.readOnly.acceptsArray,

	    groupBy: _propTypes4.default.accessor,

	    messages: _propTypes2.default.shape({
	      emptyList: _propTypes4.default.message
	    })
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      onSelect: function onSelect() {},
	      data: [],
	      optionComponent: _ListOption2.default,
	      ariaActiveDescendantKey: 'groupedList',
	      messages: {
	        emptyList: 'There are no items in this list'
	      }
	    };
	  },
	  getInitialState: function getInitialState() {
	    var keys = [];

	    return {
	      groups: this._group(this.props.groupBy, this.props.data, keys),

	      sortedKeys: keys
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var keys = [];

	    if (nextProps.data !== this.props.data || nextProps.groupBy !== this.props.groupBy) this.setState({
	      groups: this._group(nextProps.groupBy, nextProps.data, keys),
	      sortedKeys: keys
	    });
	  },
	  componentDidMount: function componentDidMount() {
	    this.move();
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    this.ariaActiveDescendant(this._currentActiveID);
	    this.move();
	  },
	  render: function render() {
	    var _this = this;

	    var _props = this.props,
	        className = _props.className,
	        role = _props.role,
	        data = _props.data,
	        messages = _props.messages;
	    var _state = this.state,
	        sortedKeys = _state.sortedKeys,
	        groups = _state.groups;


	    var elementProps = _3.default.omitOwnProps(this);

	    var items = [],
	        idx = -1,
	        group = void 0;

	    var id = (0, _widgetHelpers.instanceId)(this);

	    this._currentActiveID = null;

	    if (data.length) {
	      items = sortedKeys.reduce(function (items, key) {
	        group = groups[key];
	        items.push(_this._renderGroupHeader(key));

	        for (var itemIdx = 0; itemIdx < group.length; itemIdx++) {
	          items.push(_this._renderItem(key, group[itemIdx], ++idx));
	        }return items;
	      }, []);
	    } else items = _react2.default.createElement(
	      'li',
	      { className: 'rw-list-empty' },
	      _3.default.result(messages.emptyList, this.props)
	    );

	    return _react2.default.createElement(
	      'ul',
	      _extends({
	        ref: 'scrollable',
	        id: id,
	        tabIndex: '-1',
	        className: (0, _classnames2.default)(className, 'rw-list', 'rw-list-grouped'),
	        role: role === undefined ? 'listbox' : role
	      }, elementProps),
	      items
	    );
	  },
	  _renderGroupHeader: function _renderGroupHeader(group) {
	    var GroupComponent = this.props.groupComponent,
	        id = (0, _widgetHelpers.instanceId)(this);

	    return _react2.default.createElement(
	      'li',
	      {
	        key: 'item_' + group,
	        tabIndex: '-1',
	        role: 'separator',
	        id: id + '_group_' + group,
	        className: 'rw-list-optgroup'
	      },
	      GroupComponent ? _react2.default.createElement(GroupComponent, { item: group }) : group
	    );
	  },
	  _renderItem: function _renderItem(group, item, idx) {
	    var _props2 = this.props,
	        focused = _props2.focused,
	        selected = _props2.selected,
	        onSelect = _props2.onSelect,
	        textField = _props2.textField,
	        valueField = _props2.valueField,
	        ItemComponent = _props2.itemComponent,
	        Option = _props2.optionComponent;


	    var currentID = optionId((0, _widgetHelpers.instanceId)(this), idx),
	        isDisabled = (0, _interaction.isDisabledItem)(item, this.props),
	        isReadOnly = (0, _interaction.isReadOnlyItem)(item, this.props);

	    if (focused === item) this._currentActiveID = currentID;

	    return _react2.default.createElement(
	      Option,
	      {
	        key: 'item_' + group + '_' + idx,
	        id: currentID,
	        dataItem: item,
	        focused: focused === item,
	        selected: selected === item,
	        disabled: isDisabled,
	        readOnly: isReadOnly,
	        onClick: isDisabled || isReadOnly ? undefined : onSelect.bind(null, item)
	      },
	      ItemComponent ? _react2.default.createElement(ItemComponent, {
	        item: item,
	        value: (0, _dataHelpers.dataValue)(item, valueField),
	        text: (0, _dataHelpers.dataText)(item, textField),
	        disabled: isDisabled,
	        readOnly: isReadOnly
	      }) : (0, _dataHelpers.dataText)(item, textField)
	    );
	  },
	  _isIndexOf: function _isIndexOf(idx, item) {
	    return this.props.data[idx] === item;
	  },
	  _group: function _group(groupBy, data, keys) {
	    var iter = typeof groupBy === 'function' ? groupBy : function (item) {
	      return item[groupBy];
	    };

	    // the keys array ensures that groups are rendered in the order they came in
	    // which means that if you sort the data array it will render sorted,
	    // so long as you also sorted by group
	    keys = keys || [];

	    (0, _warning2.default)(typeof groupBy !== 'string' || !data.length || _3.default.has(data[0], groupBy), '[React Widgets] You seem to be trying to group this list by a ' + ('property `' + groupBy + '` that doesn\'t exist in the dataset items, this may be a typo'));

	    return data.reduce(function (grps, item) {
	      var group = iter(item);

	      _3.default.has(grps, group) ? grps[group].push(item) : (keys.push(group), grps[group] = [item]);

	      return grps;
	    }, {});
	  },
	  _data: function _data() {
	    var groups = this.state.groups;

	    return this.state.sortedKeys.reduce(function (flat, grp) {
	      return flat.concat(groups[grp]);
	    }, []);
	  },
	  move: function move() {
	    var selected = this.getItemDOMNode(this.props.focused);

	    if (!selected) return;

	    (0, _widgetHelpers.notify)(this.props.onMove, [selected, _compat2.default.findDOMNode(this), this.props.focused]);
	  },
	  getItemDOMNode: function getItemDOMNode(item) {
	    var list = _compat2.default.findDOMNode(this),
	        groups = this.state.groups,
	        idx = -1,
	        itemIdx,
	        child;

	    this.state.sortedKeys.some(function (group) {
	      itemIdx = groups[group].indexOf(item);
	      idx++;

	      if (itemIdx !== -1) return !!(child = list.children[idx + itemIdx + 1]);

	      idx += groups[group].length;
	    });

	    return child;
	  }
	});
	module.exports = exports['default'];

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.default = validateListComponent;

	var _invariant = __webpack_require__(18);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var METHODS = ['next', 'prev', 'first', 'last'];

	function validateListComponent(list) {
	  if (process.env.NODE_ENV !== 'production') {
	    METHODS.forEach(function (method) {
	      return (0, _invariant2.default)(typeof list[method] === 'function', 'List components must implement a `' + method + '()` method');
	    });
	  }
	}
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createUncontrollable = __webpack_require__(62);

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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = createUncontrollable;

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(18);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _utils = __webpack_require__(63);

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
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

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

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(18);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(19),
	    has = _require.has;

	module.exports = {
	  componentWillUnmount: function componentWillUnmount() {
	    var timers = this._timers || {};

	    this._unmounted = true;

	    for (var k in timers) {
	      if (has(timers, k)) this.clearTimeout(k);
	    }
	  },
	  clearTimeout: function clearTimeout(key) {
	    var timers = this._timers || {};
	    window.clearTimeout(timers[key]);
	  },
	  setTimeout: function setTimeout(key, cb, duration) {
	    var _this = this;

	    var timers = this._timers || (this._timers = Object.create(null));

	    if (this._unmounted) return;

	    this.clearTimeout(key);
	    timers[key] = window.setTimeout(function () {
	      if (!_this._unmounted) cb();
	    }, duration);
	  }
	};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactDom = __webpack_require__(51);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  propTypes: {
	    autoFocus: _propTypes2.default.bool
	  },

	  componentDidMount: function componentDidMount() {
	    var autoFocus = this.props.autoFocus;


	    if (autoFocus) this.focus ? this.focus() : (0, _reactDom.findDOMNode)(this).focus();
	  }
	};
	module.exports = exports['default'];

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(19);

	//backport PureRenderEqual
	module.exports = {
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return !_.isShallowEqual(this.props, nextProps) || !_.isShallowEqual(this.state, nextState);
	  }
	};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _filter = __webpack_require__(44);

	var _filter2 = _interopRequireDefault(_filter);

	var _propTypes3 = __webpack_require__(43);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

	var _dataHelpers = __webpack_require__(45);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var dflt = function dflt(f) {
	  return f === true ? 'startsWith' : f ? f : 'eq';
	};

	module.exports = {

	  propTypes: {
	    data: _propTypes2.default.array,
	    value: _propTypes2.default.any,
	    filter: _propTypes4.default.filter,
	    caseSensitive: _propTypes2.default.bool,
	    minLength: _propTypes2.default.number
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      caseSensitive: false,
	      minLength: 1
	    };
	  },
	  filterIndexOf: function filterIndexOf(items, searchTerm) {
	    var idx = -1,
	        matches = typeof this.props.filter === 'function' ? this.props.filter : getFilter(_filter2.default[dflt(this.props.filter)], searchTerm, this);

	    if (!searchTerm || !searchTerm.trim() || this.props.filter && searchTerm.length < (this.props.minLength || 1)) return -1;

	    items.every(function (item, i) {
	      if (matches(item, searchTerm, i)) return idx = i, false;

	      return true;
	    });

	    return idx;
	  },
	  filter: function filter(items, searchTerm) {
	    var matches = typeof this.props.filter === 'string' ? getFilter(_filter2.default[this.props.filter], searchTerm, this) : this.props.filter;

	    if (!matches || !searchTerm || !searchTerm.trim() || searchTerm.length < (this.props.minLength || 1)) return items;

	    return items.filter(function (item, idx) {
	      return matches(item, searchTerm, idx);
	    });
	  }
	};

	function getFilter(matcher, searchTerm, ctx) {
	  searchTerm = !ctx.props.caseSensitive ? searchTerm.toLowerCase() : searchTerm;

	  return function (item) {
	    var val = (0, _dataHelpers.dataText)(item, ctx.props.textField);

	    if (!ctx.props.caseSensitive) val = val.toLowerCase();

	    return matcher(val, searchTerm);
	  };
	}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _scrollTo2 = __webpack_require__(69);

	var _scrollTo3 = _interopRequireDefault(_scrollTo2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  _scrollTo: function _scrollTo(selected, list, focused) {
	    var state = this._scrollState || (this._scrollState = {}),
	        handler = this.props.onMove,
	        lastVisible = state.visible,
	        lastItem = state.focused,
	        shown,
	        changed;

	    state.visible = !(!list.offsetWidth || !list.offsetHeight);
	    state.focused = focused;

	    changed = lastItem !== focused;
	    shown = state.visible && !lastVisible;

	    if (shown || state.visible && changed) {
	      if (handler) handler(selected, list, focused);else {
	        state.scrollCancel && state.scrollCancel();
	        state.scrollCancel = (0, _scrollTo3.default)(selected, list);
	      }
	    }
	  }
	};
	module.exports = exports['default'];

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var getOffset = __webpack_require__(48),
	    height = __webpack_require__(47),
	    getScrollParent = __webpack_require__(70),
	    scrollTop = __webpack_require__(71),
	    raf = __webpack_require__(72),
	    getWindow = __webpack_require__(49);

	module.exports = function scrollTo(selected, scrollParent) {
	    var offset = getOffset(selected),
	        poff = { top: 0, left: 0 },
	        list,
	        listScrollTop,
	        selectedTop,
	        isWin,
	        selectedHeight,
	        listHeight,
	        bottom;

	    if (!selected) return;

	    list = scrollParent || getScrollParent(selected);
	    isWin = getWindow(list);
	    listScrollTop = scrollTop(list);

	    listHeight = height(list, true);
	    isWin = getWindow(list);

	    if (!isWin) poff = getOffset(list);

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

	    var id = raf(function () {
	        return scrollTop(list, listScrollTop);
	    });

	    return function () {
	        return raf.cancel(id);
	    };
	};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var css = __webpack_require__(6),
	    height = __webpack_require__(47);

	module.exports = function scrollPrarent(node) {
	  var position = css(node, 'position'),
	      excludeStatic = position === 'absolute',
	      ownerDoc = node.ownerDocument;

	  if (position === 'fixed') return ownerDoc || document;

	  while ((node = node.parentNode) && node.nodeType !== 9) {

	    var isStatic = excludeStatic && css(node, 'position') === 'static',
	        style = css(node, 'overflow') + css(node, 'overflow-y') + css(node, 'overflow-x');

	    if (isStatic) continue;

	    if (/(auto|scroll)/.test(style) && height(node) < node.scrollHeight) return node;
	  }

	  return document;
	};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var getWindow = __webpack_require__(49);

	module.exports = function scrollTop(node, val) {
	  var win = getWindow(node);

	  if (val === undefined) return win ? 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop : node.scrollTop;

	  if (win) win.scrollTo('pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft, val);else node.scrollTop = val;
	};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var canUseDOM = __webpack_require__(14);

	var vendors = ['', 'webkit', 'moz', 'o', 'ms'],
	    cancel = 'clearTimeout',
	    raf = fallback,
	    compatRaf;

	var getKey = function getKey(vendor, k) {
	  return vendor + (!vendor ? k : k[0].toUpperCase() + k.substr(1)) + 'AnimationFrame';
	};

	if (canUseDOM) {
	  vendors.some(function (vendor) {
	    var rafKey = getKey(vendor, 'request');

	    if (rafKey in window) {
	      cancel = getKey(vendor, 'cancel');
	      return raf = function (cb) {
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

	compatRaf = function (cb) {
	  return raf(cb);
	};
	compatRaf.cancel = function (id) {
	  return window[cancel](id);
	};

	module.exports = compatRaf;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var PropTypes = __webpack_require__(20);

	module.exports = {

	  propTypes: {
	    isRtl: PropTypes.bool
	  },

	  contextTypes: {
	    isRtl: PropTypes.bool
	  },

	  childContextTypes: {
	    isRtl: PropTypes.bool
	  },

	  getChildContext: function getChildContext() {
	    return {
	      isRtl: !!(this.props.isRtl || this.context && this.context.isRtl)
	    };
	  },
	  isRtl: function isRtl() {
	    return !!(this.props.isRtl || this.context && this.context.isRtl);
	  }
	};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = FocusMixin;

	var _widgetHelpers = __webpack_require__(54);

	var _interaction = __webpack_require__(55);

	var _compat = __webpack_require__(50);

	var _compat2 = _interopRequireDefault(_compat);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	function FocusMixin(_ref) {
	  var _desc, _value, _obj;

	  var willHandle = _ref.willHandle,
	      didHandle = _ref.didHandle;

	  function _handleFocus(inst, focused, event) {
	    var handler = inst.props[focused ? 'onFocus' : 'onBlur'];

	    if (handler && event) event.persist();

	    if (willHandle && willHandle.call(inst, focused, event) === false) return;

	    inst.setTimeout('focus', function () {
	      _compat2.default.batchedUpdates(function () {
	        if (didHandle) didHandle.call(inst, focused, event);

	        if (focused !== inst.state.focused) {
	          (0, _widgetHelpers.notify)(handler, event);
	          if (inst._mounted) inst.setState({ focused: focused });
	        }
	      });
	    });
	  }

	  return _obj = {
	    handleBlur: function handleBlur(event) {
	      _handleFocus(this, false, event);
	    },
	    handleFocus: function handleFocus(event) {
	      _handleFocus(this, true, event);
	    },
	    componentDidMount: function componentDidMount() {
	      this._mounted = true;
	    },
	    componentWillUnmount: function componentWillUnmount() {
	      this._mounted = false;
	    }
	  }, (_applyDecoratedDescriptor(_obj, 'handleBlur', [_interaction.widgetEnabled], Object.getOwnPropertyDescriptor(_obj, 'handleBlur'), _obj), _applyDecoratedDescriptor(_obj, 'handleFocus', [_interaction.widgetEnabled], Object.getOwnPropertyDescriptor(_obj, 'handleFocus'), _obj)), _obj;
	}
	module.exports = exports['default'];

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _desc, _value, _obj;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _classnames = __webpack_require__(37);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	var _filter = __webpack_require__(44);

	var _filter2 = _interopRequireDefault(_filter);

	var _Widget = __webpack_require__(38);

	var _Widget2 = _interopRequireDefault(_Widget);

	var _Popup = __webpack_require__(46);

	var _Popup2 = _interopRequireDefault(_Popup);

	var _Select = __webpack_require__(40);

	var _Select2 = _interopRequireDefault(_Select);

	var _ComboboxInput = __webpack_require__(76);

	var _ComboboxInput2 = _interopRequireDefault(_ComboboxInput);

	var _compat = __webpack_require__(50);

	var _compat2 = _interopRequireDefault(_compat);

	var _propTypes3 = __webpack_require__(43);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

	var _List = __webpack_require__(52);

	var _List2 = _interopRequireDefault(_List);

	var _ListGroupable = __webpack_require__(58);

	var _ListGroupable2 = _interopRequireDefault(_ListGroupable);

	var _validateListInterface = __webpack_require__(60);

	var _validateListInterface2 = _interopRequireDefault(_validateListInterface);

	var _uncontrollable = __webpack_require__(61);

	var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

	var _dataHelpers = __webpack_require__(45);

	var _interaction = __webpack_require__(55);

	var _widgetHelpers = __webpack_require__(54);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	var defaultSuggest = function defaultSuggest(f) {
	  return f === true ? 'startsWith' : f ? f : 'eq';
	};

	var propTypes = _extends({}, _Popup2.default.propTypes, {

	  //-- controlled props -----------
	  value: _propTypes2.default.any,
	  onChange: _propTypes2.default.func,
	  open: _propTypes2.default.bool,
	  onToggle: _propTypes2.default.func,
	  //------------------------------------

	  itemComponent: _propTypes4.default.elementType,
	  listComponent: _propTypes4.default.elementType,

	  groupComponent: _propTypes4.default.elementType,
	  groupBy: _propTypes4.default.accessor,

	  data: _propTypes2.default.array,
	  valueField: _propTypes2.default.string,
	  textField: _propTypes4.default.accessor,
	  name: _propTypes2.default.string,

	  onSelect: _propTypes2.default.func,

	  autoFocus: _propTypes2.default.bool,
	  disabled: _propTypes4.default.disabled.acceptsArray,
	  readOnly: _propTypes4.default.readOnly.acceptsArray,

	  suggest: _propTypes4.default.filter,
	  filter: _propTypes4.default.filter,

	  busy: _propTypes2.default.bool,

	  dropUp: _propTypes2.default.bool,
	  duration: _propTypes2.default.number,
	  delay: _propTypes2.default.number,

	  placeholder: _propTypes2.default.string,

	  'aria-labelledby': _propTypes2.default.string,
	  'aria-describedby': _propTypes2.default.string,

	  messages: _propTypes2.default.shape({
	    open: _propTypes4.default.message,
	    emptyList: _propTypes4.default.message,
	    emptyFilter: _propTypes4.default.message
	  })
	});

	var ComboBox = (0, _createReactClass2.default)((_obj = {

	  displayName: 'ComboBox',

	  mixins: [__webpack_require__(64), __webpack_require__(67), __webpack_require__(68), __webpack_require__(73), __webpack_require__(57)('input'), __webpack_require__(74)({
	    willHandle: function willHandle(focused) {
	      // not suggesting anymore
	      !focused && this.refs.input.accept();
	    },
	    didHandle: function didHandle(focused) {
	      if (!focused) this.close();
	    }
	  })],

	  propTypes: propTypes,

	  getInitialState: function getInitialState() {
	    var _props = this.props,
	        value = _props.value,
	        data = _props.data,
	        valueField = _props.valueField,
	        items = this.process(data, value),
	        idx = (0, _dataHelpers.dataIndexOf)(items, value, valueField);


	    return {
	      selectedItem: items[idx],
	      focusedItem: items[!~idx ? 0 : idx],
	      processedData: items,
	      open: false
	    };
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      data: [],
	      value: '',
	      open: false,
	      suggest: false,
	      filter: false,
	      delay: 500,

	      messages: msgs(),
	      ariaActiveDescendantKey: 'combobox'
	    };
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    this.refs.list && (0, _validateListInterface2.default)(this.refs.list);
	  },
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    var isSuggesting = this.refs.input && this.refs.input.isSuggesting(),
	        stateChanged = !_3.default.isShallowEqual(nextState, this.state),
	        valueChanged = !_3.default.isShallowEqual(nextProps, this.props);

	    return isSuggesting || stateChanged || valueChanged;
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var value = nextProps.value,
	        data = nextProps.data,
	        valueField = nextProps.valueField,
	        textField = nextProps.textField;


	    var rawIdx = (0, _dataHelpers.dataIndexOf)(data, value, valueField),
	        valueItem = rawIdx === -1 ? nextProps.value : nextProps.data[rawIdx],
	        isSuggesting = this.refs.input && this.refs.input.isSuggesting();

	    var items = this.process(nextProps.data, nextProps.value, (rawIdx === -1 || isSuggesting) && (0, _dataHelpers.dataText)(valueItem, textField));

	    var idx = (0, _dataHelpers.dataIndexOf)(items, value, valueField),
	        focused = this.filterIndexOf(items, (0, _dataHelpers.dataText)(valueItem, textField));

	    this._searchTerm = '';

	    this.setState({
	      processedData: items,
	      selectedItem: items[idx],
	      focusedItem: items[idx === -1 ? focused !== -1 ? focused : 0 // focus the closest match
	      : idx]
	    });
	  },
	  renderInput: function renderInput(listID) {
	    var _props2 = this.props,
	        suggest = _props2.suggest,
	        filter = _props2.filter,
	        textField = _props2.textField,
	        busy = _props2.busy,
	        name = _props2.name,
	        data = _props2.data,
	        value = _props2.value,
	        valueField = _props2.valueField,
	        autoFocus = _props2.autoFocus,
	        tabIndex = _props2.tabIndex,
	        disabled = _props2.disabled,
	        readOnly = _props2.readOnly,
	        placeholder = _props2.placeholder,
	        open = _props2.open,
	        ariaLabelledby = _props2['aria-labelledby'],
	        ariaDescribedby = _props2['aria-describedby'];


	    var valueItem = (0, _dataHelpers.dataItem)(data, value, valueField); // take value from the raw data

	    var completeType = suggest ? filter ? 'both' : 'inline' : filter ? 'list' : '';

	    return _react2.default.createElement(_ComboboxInput2.default, {
	      ref: 'input',
	      id: (0, _widgetHelpers.instanceId)(this, '_input'),
	      autoFocus: autoFocus,
	      tabIndex: tabIndex,
	      suggest: suggest,
	      name: name,
	      role: 'combobox',
	      disabled: disabled,
	      readOnly: readOnly,
	      'aria-owns': listID,
	      'aria-busy': !!busy,
	      'aria-autocomplete': completeType,
	      'aria-expanded': open,
	      'aria-haspopup': true,
	      'aria-describedby': ariaDescribedby,
	      'aria-labelledby': ariaLabelledby,
	      placeholder: placeholder,
	      value: (0, _dataHelpers.dataText)(valueItem, textField),
	      onChange: this.handleInputChange,
	      onKeyDown: this.handleInputKeyDown
	    });
	  },
	  renderList: function renderList(List, id, messages) {
	    var _props3 = this.props,
	        open = _props3.open,
	        data = _props3.data;
	    var _state = this.state,
	        selectedItem = _state.selectedItem,
	        focusedItem = _state.focusedItem;


	    var listProps = _3.default.pickProps(this.props, List);
	    var items = this._data();

	    return _react2.default.createElement(List, _extends({ ref: 'list'
	    }, listProps, {
	      id: id,
	      data: items,
	      selected: selectedItem,
	      focused: focusedItem,
	      'aria-hidden': !open,
	      'aria-labelledby': (0, _widgetHelpers.instanceId)(this),
	      'aria-live': open && 'polite',
	      onSelect: this.handleSelect,
	      onMove: this._scrollTo,
	      messages: {
	        emptyList: data.length ? messages.emptyFilter : messages.emptyList
	      }
	    }));
	  },
	  render: function render() {
	    var _this = this;

	    var _props4 = this.props,
	        className = _props4.className,
	        duration = _props4.duration,
	        groupBy = _props4.groupBy,
	        messages = _props4.messages,
	        busy = _props4.busy,
	        dropUp = _props4.dropUp,
	        open = _props4.open,
	        List = _props4.listComponent;
	    var focused = this.state.focused;


	    var disabled = (0, _interaction.isDisabled)(this.props),
	        readOnly = (0, _interaction.isReadOnly)(this.props),
	        listID = (0, _widgetHelpers.instanceId)(this, '_listbox');

	    List = List || groupBy && _ListGroupable2.default || _List2.default;

	    var elementProps = _3.default.omitOwnProps(this, List);
	    var shouldRenderPopup = open || (0, _widgetHelpers.isFirstFocusedRender)(this);

	    messages = msgs(messages);

	    return _react2.default.createElement(
	      _Widget2.default,
	      _extends({}, elementProps, {
	        open: open,
	        dropUp: dropUp,
	        focused: focused,
	        disabled: disabled,
	        readOnly: readOnly,
	        onBlur: this.handleBlur,
	        onFocus: this.handleFocus,
	        onKeyDown: this.handleKeyDown,
	        className: (0, _classnames2.default)(className, 'rw-combobox')
	      }),
	      _react2.default.createElement(_Select2.default, {
	        onClick: this.toggle,
	        disabled: !!(disabled || readOnly),
	        busy: busy,
	        icon: 'caret-down',
	        label: _3.default.result(messages.open, this.props)
	      }),
	      this.renderInput(listID),
	      shouldRenderPopup && _react2.default.createElement(
	        _Popup2.default,
	        {
	          open: open,
	          dropUp: dropUp,
	          duration: duration,
	          onOpening: function onOpening() {
	            return _this.refs.list.forceUpdate();
	          }
	        },
	        _react2.default.createElement(
	          'div',
	          null,
	          this.renderList(List, listID, messages)
	        )
	      )
	    );
	  },
	  handleSelect: function handleSelect(data) {
	    this.close();
	    (0, _widgetHelpers.notify)(this.props.onSelect, data);
	    this.change(data);
	    this.focus();
	  },
	  handleInputKeyDown: function handleInputKeyDown(e) {
	    this._deleting = e.key === 'Backspace' || e.key === 'Delete';
	    this._isTyping = true;
	  },
	  handleInputChange: function handleInputChange(e) {
	    var _props5 = this.props,
	        data = _props5.data,
	        textField = _props5.textField;


	    var shouldSuggest = !!this.props.suggest,
	        strVal = e.target.value,
	        suggestion;

	    suggestion = this._deleting || !shouldSuggest ? strVal : this.suggest(this._data(), strVal);

	    suggestion = suggestion || strVal;

	    data = _3.default.find(data, function (item) {
	      return (0, _dataHelpers.dataText)(item, textField).toLowerCase() === suggestion.toLowerCase();
	    });

	    this.change(!this._deleting && data ? data : strVal, true);

	    this.open();
	  },
	  focus: function focus() {
	    this.refs.input && this.refs.input.focus();
	  },
	  handleKeyDown: function handleKeyDown(e) {
	    var self = this,
	        key = e.key,
	        alt = e.altKey,
	        list = this.refs.list,
	        focusedItem = this.state.focusedItem,
	        selectedItem = this.state.selectedItem,
	        isOpen = this.props.open;

	    (0, _widgetHelpers.notify)(this.props.onKeyDown, [e]);
	    if (e.defaultPrevented) return;

	    if (key === 'End') {
	      if (isOpen) this.setState({ focusedItem: list.last() });else select(list.last(), true);
	    } else if (key === 'Home') {
	      if (isOpen) this.setState({ focusedItem: list.first() });else select(list.first(), true);
	    } else if (key === 'Escape' && isOpen) this.close();else if (key === 'Enter' && isOpen) {
	      e.preventDefault();
	      select(this.state.focusedItem, true);
	    } else if (key === 'ArrowDown') {
	      if (alt) this.open();else {
	        if (isOpen) this.setState({ focusedItem: list.next(focusedItem) });else select(list.next(selectedItem), true);
	      }
	    } else if (key === 'ArrowUp') {
	      if (alt) this.close();else {
	        if (isOpen) this.setState({ focusedItem: list.prev(focusedItem) });else select(list.prev(selectedItem), true);
	      }
	    }

	    function select(item, fromList) {
	      if (!item) return self.change(_compat2.default.findDOMNode(self.refs.input).value, false);

	      self.refs.input.accept(true); //removes caret

	      if (fromList) return self.handleSelect(item);

	      self.change(item, false);
	    }
	  },
	  change: function change(data, typing) {
	    this._typedChange = !!typing;
	    (0, _widgetHelpers.notify)(this.props.onChange, data);
	  },
	  open: function open() {
	    if (!this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, true);
	  },
	  close: function close() {
	    if (this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, false);
	  },
	  toggle: function toggle() {
	    this.focus();

	    this.props.open ? this.close() : this.open();
	  },
	  suggest: function suggest(data, value) {
	    var _props6 = this.props,
	        textField = _props6.textField,
	        suggest = _props6.suggest,
	        minLength = _props6.minLength;


	    var word = (0, _dataHelpers.dataText)(value, textField),
	        suggestion;

	    suggest = defaultSuggest(suggest);

	    if (!(word || '').trim() || word.length < (minLength || 1)) return '';

	    suggestion = typeof value === 'string' ? _3.default.find(data, getFilter(suggest, word, textField)) : value;

	    if (suggestion && (!this.state || !this.state.deleting)) return (0, _dataHelpers.dataText)(suggestion, textField);

	    return '';
	  },
	  _data: function _data() {
	    return this.state.processedData;
	  },
	  process: function process(data, values, searchTerm) {
	    if (this.props.filter && searchTerm) data = this.filter(data, searchTerm);

	    return data;
	  }
	}, (_applyDecoratedDescriptor(_obj, 'handleSelect', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleSelect'), _obj), _applyDecoratedDescriptor(_obj, 'handleKeyDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleKeyDown'), _obj), _applyDecoratedDescriptor(_obj, 'toggle', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'toggle'), _obj)), _obj));

	exports.default = (0, _uncontrollable2.default)(ComboBox, { open: 'onToggle', value: 'onChange' }, ['focus']);


	function msgs(msgs) {
	  return _extends({
	    open: 'open combobox',
	    emptyList: 'There are no items in this list',
	    emptyFilter: 'The filter returned no results'
	  }, msgs);
	}

	function getFilter(suggest, word, textField) {
	  return typeof suggest === 'string' ? function (item) {
	    return _filter2.default[suggest]((0, _dataHelpers.dataText)(item, textField).toLowerCase(), word.toLowerCase());
	  } : function (item) {
	    return suggest(item, word);
	  };
	}
	module.exports = exports['default'];

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	var _caret = __webpack_require__(77);

	var _caret2 = _interopRequireDefault(_caret);

	var _compat = __webpack_require__(50);

	var _compat2 = _interopRequireDefault(_compat);

	var _Input = __webpack_require__(39);

	var _Input2 = _interopRequireDefault(_Input);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	exports.default = (0, _createReactClass2.default)({

	  displayName: 'ComboboxInput',

	  propTypes: {
	    value: _propTypes2.default.string,
	    suggest: _propTypes2.default.bool,
	    onChange: _propTypes2.default.func.isRequired
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    var input = _compat2.default.findDOMNode(this),
	        val = this.props.value;

	    if (this.isSuggesting()) {
	      var start = val.toLowerCase().indexOf(this._last.toLowerCase()) + this._last.length,
	          end = val.length - start;

	      if (start >= 0) {
	        (0, _caret2.default)(input, start, start + end);
	      }
	    }
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      value: ''
	    };
	  },
	  render: function render() {
	    var _props = this.props,
	        onKeyDown = _props.onKeyDown,
	        props = _objectWithoutProperties(_props, ['onKeyDown']);

	    delete props.suggest;

	    return _react2.default.createElement(_Input2.default, _extends({}, props, {
	      onKeyDown: onKeyDown,
	      onChange: this.handleChange
	    }));
	  },
	  isSuggesting: function isSuggesting() {
	    var val = this.props.value,
	        isSuggestion = this._last != null && val.toLowerCase().indexOf(this._last.toLowerCase()) !== -1;

	    return this.props.suggest && isSuggestion;
	  },
	  accept: function accept(removeCaret) {
	    var val = _compat2.default.findDOMNode(this).value || '',
	        end = val.length;

	    this._last = null;
	    removeCaret && (0, _caret2.default)(_compat2.default.findDOMNode(this), end, end);
	  },
	  handleChange: function handleChange(e) {
	    var val = e.target.value,
	        pl = !!this.props.placeholder;

	    // IE fires input events when setting/unsetting placeholders.
	    // issue #112
	    if (pl && !val && val === (this.props.value || '')) return;

	    this._last = val;
	    this.props.onChange(e, val);
	  },
	  focus: function focus() {
	    _compat2.default.findDOMNode(this).focus();
	  }
	});
	module.exports = exports['default'];

/***/ }),
/* 77 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = caret;
	/*eslint-disable no-empty */
	function caret(el, start, end) {
	  if (start === undefined) return get(el);

	  set(el, start, end);
	}

	function get(el) {
	  var start, end, rangeEl, clone;

	  if (el.selectionStart !== undefined) {
	    start = el.selectionStart;
	    end = el.selectionEnd;
	  } else {
	    try {
	      el.focus();
	      rangeEl = el.createTextRange();
	      clone = rangeEl.duplicate();

	      rangeEl.moveToBookmark(document.selection.createRange().getBookmark());
	      clone.setEndPoint('EndToStart', rangeEl);

	      start = clone.text.length;
	      end = start + rangeEl.text.length;
	    } catch (e) {/* not focused or not visible */}
	  }

	  return { start: start, end: end };
	}

	function set(el, start, end) {
	  var rangeEl;

	  try {
	    if (el.selectionStart !== undefined) {
	      el.focus();
	      el.setSelectionRange(start, end);
	    } else {
	      el.focus();
	      rangeEl = el.createTextRange();
	      rangeEl.collapse(true);
	      rangeEl.moveStart('character', start);
	      rangeEl.moveEnd('character', end - start);
	      rangeEl.select();
	    }
	  } catch (e) {/* not focused or not visible */}
	}
	module.exports = exports['default'];

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _VIEW, _OPPOSITE_DIRECTION, _MULTIPLIER, _desc, _value2, _obj; //values, omit


	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _classnames = __webpack_require__(37);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _compat = __webpack_require__(50);

	var _compat2 = _interopRequireDefault(_compat);

	var _Widget = __webpack_require__(38);

	var _Widget2 = _interopRequireDefault(_Widget);

	var _Header = __webpack_require__(79);

	var _Header2 = _interopRequireDefault(_Header);

	var _Footer = __webpack_require__(81);

	var _Footer2 = _interopRequireDefault(_Footer);

	var _Month = __webpack_require__(82);

	var _Month2 = _interopRequireDefault(_Month);

	var _Year = __webpack_require__(87);

	var _Year2 = _interopRequireDefault(_Year);

	var _Decade = __webpack_require__(88);

	var _Decade2 = _interopRequireDefault(_Decade);

	var _Century = __webpack_require__(89);

	var _Century2 = _interopRequireDefault(_Century);

	var _localizers = __webpack_require__(17);

	var _propTypes3 = __webpack_require__(43);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

	var _uncontrollable = __webpack_require__(61);

	var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

	var _SlideTransition = __webpack_require__(90);

	var _SlideTransition2 = _interopRequireDefault(_SlideTransition);

	var _dates = __webpack_require__(84);

	var _dates2 = _interopRequireDefault(_dates);

	var _constants = __webpack_require__(86);

	var constants = _interopRequireWildcard(_constants);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	var _widgetHelpers = __webpack_require__(54);

	var _interaction = __webpack_require__(55);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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

	var dir = constants.directions,
	    values = function values(obj) {
	  return Object.keys(obj).map(function (k) {
	    return obj[k];
	  });
	},
	    invert = function invert(obj) {
	  return _3.default.transform(obj, function (o, val, key) {
	    o[val] = key;
	  }, {});
	};

	var views = constants.calendarViews,
	    VIEW_OPTIONS = values(views),
	    ALT_VIEW = invert(constants.calendarViewHierarchy),
	    NEXT_VIEW = constants.calendarViewHierarchy,
	    VIEW_UNIT = constants.calendarViewUnits,
	    VIEW = (_VIEW = {}, _VIEW[views.MONTH] = _Month2.default, _VIEW[views.YEAR] = _Year2.default, _VIEW[views.DECADE] = _Decade2.default, _VIEW[views.CENTURY] = _Century2.default, _VIEW);

	var ARROWS_TO_DIRECTION = {
	  ArrowDown: dir.DOWN,
	  ArrowUp: dir.UP,
	  ArrowRight: dir.RIGHT,
	  ArrowLeft: dir.LEFT
	};

	var OPPOSITE_DIRECTION = (_OPPOSITE_DIRECTION = {}, _OPPOSITE_DIRECTION[dir.LEFT] = dir.RIGHT, _OPPOSITE_DIRECTION[dir.RIGHT] = dir.LEFT, _OPPOSITE_DIRECTION);

	var MULTIPLIER = (_MULTIPLIER = {}, _MULTIPLIER[views.YEAR] = 1, _MULTIPLIER[views.DECADE] = 10, _MULTIPLIER[views.CENTURY] = 100, _MULTIPLIER);

	var format = function format(props, f) {
	  return _localizers.date.getFormat(f, props[f + 'Format']);
	};

	var propTypes = {

	  disabled: _propTypes4.default.disabled,
	  readOnly: _propTypes4.default.readOnly,

	  onChange: _propTypes2.default.func,
	  value: _propTypes2.default.instanceOf(Date),

	  min: _propTypes2.default.instanceOf(Date),
	  max: _propTypes2.default.instanceOf(Date),

	  currentDate: _propTypes2.default.instanceOf(Date),
	  onCurrentDateChange: _propTypes2.default.func,

	  view: _propTypes2.default.oneOf(VIEW_OPTIONS),
	  initialView: _propTypes2.default.oneOf(VIEW_OPTIONS),

	  finalView: function finalView(props, propName, componentName) {
	    for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
	      args[_key - 3] = arguments[_key];
	    }

	    var err = _propTypes2.default.oneOf(VIEW_OPTIONS).apply(undefined, [props, propName, componentName].concat(args));

	    if (err) return err;
	    if (VIEW_OPTIONS.indexOf(props[propName]) < VIEW_OPTIONS.indexOf(props.initialView)) return new Error(('The `' + propName + '` prop: `' + props[propName] + '` cannot be \'lower\' than the `initialView`\n        prop. This creates a range that cannot be rendered.').replace(/\n\t/g, ''));
	  },


	  onViewChange: _propTypes2.default.func,
	  onNavigate: _propTypes2.default.func,
	  culture: _propTypes2.default.string,
	  footer: _propTypes2.default.bool,

	  dayComponent: _propTypes4.default.elementType,
	  headerFormat: _propTypes4.default.dateFormat,
	  footerFormat: _propTypes4.default.dateFormat,

	  dayFormat: _propTypes4.default.dateFormat,
	  dateFormat: _propTypes4.default.dateFormat,
	  monthFormat: _propTypes4.default.dateFormat,
	  yearFormat: _propTypes4.default.dateFormat,
	  decadeFormat: _propTypes4.default.dateFormat,
	  centuryFormat: _propTypes4.default.dateFormat,

	  messages: _propTypes2.default.shape({
	    moveBack: _propTypes2.default.string,
	    moveForward: _propTypes2.default.string
	  })
	};

	var Calendar = (0, _createReactClass2.default)((_obj = {

	  displayName: 'Calendar',

	  mixins: [__webpack_require__(64), __webpack_require__(65), __webpack_require__(66), __webpack_require__(73), __webpack_require__(57)(), __webpack_require__(74)({
	    willHandle: function willHandle() {
	      if (+this.props.tabIndex === -1) return false;
	    }
	  })],

	  propTypes: propTypes,

	  getInitialState: function getInitialState() {
	    return {
	      selectedIndex: 0,
	      view: this.props.initialView || 'month'
	    };
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {

	      value: null,
	      min: new Date(1900, 0, 1),
	      max: new Date(2099, 11, 31),
	      currentDate: new Date(),

	      initialView: 'month',
	      finalView: 'century',

	      tabIndex: '0',
	      footer: false,

	      ariaActiveDescendantKey: 'calendar',
	      messages: msgs({})
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    this.changeCurrentDate(this.props.value);
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var bottom = VIEW_OPTIONS.indexOf(nextProps.initialView),
	        top = VIEW_OPTIONS.indexOf(nextProps.finalView),
	        current = VIEW_OPTIONS.indexOf(this.state.view),
	        view = this.state.view,
	        val = this.inRangeValue(nextProps.value);

	    if (current < bottom) this.setState({ view: view = nextProps.initialView });else if (current > top) this.setState({ view: view = nextProps.finalView });

	    //if the value changes reset views to the new one
	    if (!_dates2.default.eq(val, dateOrNull(this.props.value), VIEW_UNIT[view])) {
	      this.changeCurrentDate(val, nextProps.currentDate);
	    }
	  },
	  render: function render() {
	    var _this = this;

	    var _props = this.props,
	        className = _props.className,
	        value = _props.value,
	        footerFormat = _props.footerFormat,
	        disabled = _props.disabled,
	        readOnly = _props.readOnly,
	        finalView = _props.finalView,
	        footer = _props.footer,
	        messages = _props.messages,
	        min = _props.min,
	        max = _props.max,
	        culture = _props.culture,
	        duration = _props.duration,
	        tabIndex = _props.tabIndex,
	        currentDate = _props.currentDate;
	    var _state = this.state,
	        view = _state.view,
	        slideDirection = _state.slideDirection,
	        focused = _state.focused;


	    var View = VIEW[view],
	        unit = VIEW_UNIT[view],
	        todaysDate = new Date(),
	        todayNotInRange = !_dates2.default.inRange(todaysDate, min, max, view);

	    unit = unit === 'day' ? 'date' : unit;

	    var viewID = (0, _widgetHelpers.instanceId)(this, '_calendar'),
	        labelID = (0, _widgetHelpers.instanceId)(this, '_calendar_label'),
	        key = view + '_' + _dates2.default[view](currentDate);

	    var elementProps = _3.default.omitOwnProps(this),
	        viewProps = _3.default.pickProps(this.props, View);

	    var isDisabled = disabled || readOnly;

	    messages = msgs(this.props.messages);

	    return _react2.default.createElement(
	      _Widget2.default,
	      _extends({}, elementProps, {
	        role: 'group',
	        focused: focused,
	        disabled: disabled,
	        readOnly: readOnly,
	        tabIndex: tabIndex || 0,
	        onBlur: this.handleBlur,
	        onFocus: this.handleFocus,
	        onKeyDown: this.handleKeyDown,
	        className: (0, _classnames2.default)(className, 'rw-calendar')
	      }),
	      _react2.default.createElement(_Header2.default, {
	        label: this._label(),
	        labelId: labelID,
	        messages: messages,
	        upDisabled: isDisabled || view === finalView,
	        prevDisabled: isDisabled || !_dates2.default.inRange(this.nextDate(dir.LEFT), min, max, view),
	        nextDisabled: isDisabled || !_dates2.default.inRange(this.nextDate(dir.RIGHT), min, max, view),
	        onViewChange: this.navigate.bind(null, dir.UP, null),
	        onMoveLeft: this.navigate.bind(null, dir.LEFT, null),
	        onMoveRight: this.navigate.bind(null, dir.RIGHT, null)
	      }),
	      _react2.default.createElement(
	        _SlideTransition2.default,
	        {
	          ref: 'animation',
	          duration: duration,
	          direction: slideDirection,
	          onAnimate: function onAnimate() {
	            return focused && _this.focus();
	          }
	        },
	        _react2.default.createElement(View, _extends({}, viewProps, {
	          key: key,
	          id: viewID,
	          value: value,
	          today: todaysDate,
	          focused: currentDate,
	          onChange: this.change,
	          onKeyDown: this.handleKeyDown,
	          'aria-labelledby': labelID,
	          ariaActiveDescendantKey: 'calendarView'
	        }))
	      ),
	      footer && _react2.default.createElement(_Footer2.default, {
	        value: todaysDate,
	        format: footerFormat,
	        culture: culture,
	        disabled: disabled || todayNotInRange,
	        readOnly: readOnly,
	        onClick: this.select
	      })
	    );
	  },
	  navigate: function navigate(direction, date) {
	    var view = this.state.view,
	        slideDir = direction === dir.LEFT || direction === dir.UP ? 'right' : 'left';

	    if (!date) date = [dir.LEFT, dir.RIGHT].indexOf(direction) !== -1 ? this.nextDate(direction) : this.props.currentDate;

	    if (direction === dir.DOWN) view = ALT_VIEW[view] || view;

	    if (direction === dir.UP) view = NEXT_VIEW[view] || view;

	    if (this.isValidView(view) && _dates2.default.inRange(date, this.props.min, this.props.max, view)) {
	      (0, _widgetHelpers.notify)(this.props.onNavigate, [date, slideDir, view]);
	      this.focus(true);

	      this.changeCurrentDate(date);

	      this.setState({
	        slideDirection: slideDir,
	        view: view
	      });
	    }
	  },
	  focus: function focus() {
	    if (+this.props.tabIndex > -1) _compat2.default.findDOMNode(this).focus();
	  },
	  change: function change(date) {
	    if (this.state.view === this.props.initialView) {
	      this.changeCurrentDate(date);
	      (0, _widgetHelpers.notify)(this.props.onChange, date);
	      this.focus();
	      return;
	    }

	    this.navigate(dir.DOWN, date);
	  },
	  changeCurrentDate: function changeCurrentDate(date) {
	    var currentDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.currentDate;

	    var inRangeDate = this.inRangeValue(date ? new Date(date) : currentDate);
	    if (_dates2.default.eq(inRangeDate, dateOrNull(currentDate), VIEW_UNIT[this.state.view])) return;
	    (0, _widgetHelpers.notify)(this.props.onCurrentDateChange, inRangeDate);
	  },
	  select: function select(date) {
	    var view = this.props.initialView,
	        slideDir = view !== this.state.view || _dates2.default.gt(date, this.state.currentDate) ? 'left' // move down to a the view
	    : 'right';

	    (0, _widgetHelpers.notify)(this.props.onChange, date);

	    if (this.isValidView(view) && _dates2.default.inRange(date, this.props.min, this.props.max, view)) {
	      this.focus();

	      this.changeCurrentDate(date);

	      this.setState({
	        slideDirection: slideDir,
	        view: view
	      });
	    }
	  },
	  nextDate: function nextDate(direction) {
	    var method = direction === dir.LEFT ? 'subtract' : 'add',
	        view = this.state.view,
	        unit = view === views.MONTH ? view : views.YEAR,
	        multi = MULTIPLIER[view] || 1;

	    return _dates2.default[method](this.props.currentDate, 1 * multi, unit);
	  },
	  handleKeyDown: function handleKeyDown(e) {
	    var ctrl = e.ctrlKey,
	        key = e.key,
	        direction = ARROWS_TO_DIRECTION[key],
	        current = this.props.currentDate,
	        view = this.state.view,
	        unit = VIEW_UNIT[view],
	        currentDate = current;

	    if (key === 'Enter') {
	      e.preventDefault();
	      return this.change(current);
	    }

	    if (direction) {
	      if (ctrl) {
	        e.preventDefault();
	        this.navigate(direction);
	      } else {
	        if (this.isRtl() && OPPOSITE_DIRECTION[direction]) direction = OPPOSITE_DIRECTION[direction];

	        currentDate = _dates2.default.move(currentDate, this.props.min, this.props.max, view, direction);

	        if (!_dates2.default.eq(current, currentDate, unit)) {
	          e.preventDefault();

	          if (_dates2.default.gt(currentDate, current, view)) this.navigate(dir.RIGHT, currentDate);else if (_dates2.default.lt(currentDate, current, view)) this.navigate(dir.LEFT, currentDate);else this.changeCurrentDate(currentDate);
	        }
	      }
	    }

	    (0, _widgetHelpers.notify)(this.props.onKeyDown, [e]);
	  },
	  _label: function _label() {
	    var _props2 = this.props,
	        culture = _props2.culture,
	        props = _objectWithoutProperties(_props2, ['culture']),
	        view = this.state.view,
	        dt = this.props.currentDate;

	    if (view === 'month') return _localizers.date.format(dt, format(props, 'header'), culture);else if (view === 'year') return _localizers.date.format(dt, format(props, 'year'), culture);else if (view === 'decade') return _localizers.date.format(_dates2.default.startOf(dt, 'decade'), format(props, 'decade'), culture);else if (view === 'century') return _localizers.date.format(_dates2.default.startOf(dt, 'century'), format(props, 'century'), culture);
	  },
	  inRangeValue: function inRangeValue(_value) {
	    var value = dateOrNull(_value);

	    if (value === null) return value;

	    return _dates2.default.max(_dates2.default.min(value, this.props.max), this.props.min);
	  },
	  isValidView: function isValidView(next) {
	    var bottom = VIEW_OPTIONS.indexOf(this.props.initialView),
	        top = VIEW_OPTIONS.indexOf(this.props.finalView),
	        current = VIEW_OPTIONS.indexOf(next);

	    return current >= bottom && current <= top;
	  }
	}, (_applyDecoratedDescriptor(_obj, 'navigate', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'navigate'), _obj), _applyDecoratedDescriptor(_obj, 'change', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'change'), _obj), _applyDecoratedDescriptor(_obj, 'select', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'select'), _obj), _applyDecoratedDescriptor(_obj, 'handleKeyDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleKeyDown'), _obj)), _obj));

	function dateOrNull(dt) {
	  if (dt && !isNaN(dt.getTime())) return dt;
	  return null;
	}

	function msgs(msgs) {
	  return _extends({
	    moveBack: 'navigate back',
	    moveForward: 'navigate forward'
	  }, msgs);
	}

	exports.default = (0, _uncontrollable2.default)(Calendar, {
	  value: 'onChange',
	  currentDate: 'onCurrentDateChange',
	  view: 'onViewChange'
	}, ['focus']);
	module.exports = exports['default'];

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _Button = __webpack_require__(41);

	var _Button2 = _interopRequireDefault(_Button);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _createReactClass2.default)({
	  displayName: 'Header',
	  propTypes: {
	    label: _propTypes2.default.string.isRequired,
	    labelId: _propTypes2.default.string,

	    upDisabled: _propTypes2.default.bool.isRequired,
	    prevDisabled: _propTypes2.default.bool.isRequired,
	    nextDisabled: _propTypes2.default.bool.isRequired,
	    onViewChange: _propTypes2.default.func.isRequired,
	    onMoveLeft: _propTypes2.default.func.isRequired,
	    onMoveRight: _propTypes2.default.func.isRequired,

	    messages: _propTypes2.default.shape({
	      moveBack: _propTypes2.default.string,
	      moveForward: _propTypes2.default.string
	    })
	  },

	  mixins: [__webpack_require__(66), __webpack_require__(80)],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      messages: {
	        moveBack: 'navigate back',
	        moveForward: 'navigate forward'
	      }
	    };
	  },
	  render: function render() {
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


	    var rtl = this.isRtl();

	    return _react2.default.createElement(
	      'div',
	      { className: 'rw-header' },
	      _react2.default.createElement(_Button2.default, {
	        className: 'rw-btn-left',
	        onClick: onMoveLeft,
	        disabled: prevDisabled,
	        label: messages.moveBack,
	        icon: 'caret-' + (rtl ? 'right' : 'left')
	      }),
	      _react2.default.createElement(
	        _Button2.default,
	        {
	          id: labelId,
	          onClick: onViewChange,
	          className: 'rw-btn-view',
	          disabled: upDisabled,
	          'aria-live': 'polite',
	          'aria-atomic': 'true'
	        },
	        label
	      ),
	      _react2.default.createElement(_Button2.default, {
	        className: 'rw-btn-right',
	        onClick: onMoveRight,
	        disabled: nextDisabled,
	        label: messages.moveForward,
	        icon: 'caret-' + (rtl ? 'left' : 'right')
	      })
	    );
	  }
	});
	module.exports = exports['default'];

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

	  contextTypes: {
	    isRtl: _propTypes2.default.bool
	  },

	  isRtl: function isRtl() {
	    return !!this.context.isRtl;
	  }
	};
	module.exports = exports['default'];

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _Button = __webpack_require__(41);

	var _Button2 = _interopRequireDefault(_Button);

	var _localizers = __webpack_require__(17);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var format = function format(props) {
	  return _localizers.date.getFormat('footer', props.format);
	};

	module.exports = (0, _createReactClass2.default)({

	  displayName: 'Footer',

	  render: function render() {
	    var _props = this.props,
	        disabled = _props.disabled,
	        readOnly = _props.readOnly,
	        value = _props.value;


	    return _react2.default.createElement(
	      'div',
	      { className: 'rw-footer' },
	      _react2.default.createElement(
	        _Button2.default,
	        {
	          disabled: !!(disabled || readOnly),
	          onClick: this.props.onClick.bind(null, value)
	        },
	        _localizers.date.format(value, format(this.props), this.props.culture)
	      )
	    );
	  }
	});

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _CalendarView = __webpack_require__(83);

	var _CalendarView2 = _interopRequireDefault(_CalendarView);

	var _dates = __webpack_require__(84);

	var _dates2 = _interopRequireDefault(_dates);

	var _localizers = __webpack_require__(17);

	var _propTypes3 = __webpack_require__(43);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	var _widgetHelpers = __webpack_require__(54);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var dayFormat = function dayFormat(props) {
	  return _localizers.date.getFormat('weekday', props.dayFormat);
	},
	    dateFormat = function dateFormat(props) {
	  return _localizers.date.getFormat('dayOfMonth', props.dateFormat);
	};

	var optionId = function optionId(id, date) {
	  return id + '__month_' + _dates2.default.month(date) + '-' + _dates2.default.date(date);
	};

	var propTypes = {
	  culture: _propTypes2.default.string,
	  today: _propTypes2.default.instanceOf(Date),
	  value: _propTypes2.default.instanceOf(Date),
	  focused: _propTypes2.default.instanceOf(Date),
	  min: _propTypes2.default.instanceOf(Date),
	  max: _propTypes2.default.instanceOf(Date),
	  onChange: _propTypes2.default.func.isRequired,

	  dayComponent: _propTypes4.default.elementType,
	  dayFormat: _propTypes4.default.dateFormat,
	  dateFormat: _propTypes4.default.dateFormat
	};

	var isEqual = function isEqual(dateA, dateB) {
	  return _dates2.default.eq(dateA, dateB, 'day');
	};

	var MonthView = (0, _createReactClass2.default)({

	  displayName: 'MonthView',

	  statics: {
	    isEqual: isEqual
	  },

	  mixins: [__webpack_require__(80), __webpack_require__(57)()],

	  propTypes: propTypes,

	  componentDidUpdate: function componentDidUpdate() {
	    var activeId = optionId((0, _widgetHelpers.instanceId)(this), this.props.focused);
	    this.ariaActiveDescendant(activeId, null);
	  },
	  render: function render() {
	    var _props = this.props,
	        focused = _props.focused,
	        culture = _props.culture,
	        month = _dates2.default.visibleDays(focused, culture),
	        rows = _3.default.chunk(month, 7);

	    return _react2.default.createElement(
	      _CalendarView2.default,
	      _3.default.omitOwnProps(this),
	      _react2.default.createElement(
	        'thead',
	        null,
	        _react2.default.createElement(
	          'tr',
	          null,
	          this.renderHeaders(rows[0], dayFormat(this.props), culture)
	        )
	      ),
	      _react2.default.createElement(
	        'tbody',
	        null,
	        rows.map(this.renderRow)
	      )
	    );
	  },
	  renderRow: function renderRow(row, rowIdx) {
	    var _this = this;

	    var _props2 = this.props,
	        focused = _props2.focused,
	        today = _props2.today,
	        disabled = _props2.disabled,
	        onChange = _props2.onChange,
	        value = _props2.value,
	        culture = _props2.culture,
	        min = _props2.min,
	        max = _props2.max,
	        Day = _props2.dayComponent,
	        id = (0, _widgetHelpers.instanceId)(this),
	        labelFormat = _localizers.date.getFormat('footer');

	    return _react2.default.createElement(
	      _CalendarView2.default.Row,
	      { key: rowIdx },
	      row.map(function (date, colIdx) {
	        var formattedDate = _localizers.date.format(date, dateFormat(_this.props), culture),
	            label = _localizers.date.format(date, labelFormat, culture);

	        return _react2.default.createElement(
	          _CalendarView2.default.Cell,
	          {
	            key: colIdx,
	            id: optionId(id, date),
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
	  },
	  renderHeaders: function renderHeaders(week, format, culture) {
	    return week.map(function (date) {
	      return _react2.default.createElement(
	        'th',
	        { key: 'header_' + _dates2.default.weekday(date, undefined, _localizers.date.startOfWeek(culture)) },
	        _localizers.date.format(date, format, culture)
	      );
	    });
	  }
	});

	exports.default = MonthView;
	module.exports = exports['default'];

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _class, _temp2;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(37);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _dates = __webpack_require__(84);

	var _dates2 = _interopRequireDefault(_dates);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var VIEW_UNITS = ['month', 'year', 'decade', 'century'];

	function clamp(date, min, max) {
	  return _dates2.default.max(_dates2.default.min(date, max), min);
	}

	var CalendarView = function (_React$Component) {
	  _inherits(CalendarView, _React$Component);

	  function CalendarView() {
	    _classCallCheck(this, CalendarView);

	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }

	  CalendarView.prototype.render = function render() {
	    var className = this.props.className;


	    return _react2.default.createElement('table', _extends({}, this.props, {
	      role: 'grid',
	      tabIndex: '-1',
	      className: (0, _classnames2.default)(className, 'rw-nav-view', 'rw-calendar-grid')
	    }));
	  };

	  return CalendarView;
	}(_react2.default.Component);

	var CalendarViewCell = (_temp2 = _class = function (_React$Component2) {
	  _inherits(CalendarViewCell, _React$Component2);

	  function CalendarViewCell() {
	    var _temp, _this2, _ret;

	    _classCallCheck(this, CalendarViewCell);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, _React$Component2.call.apply(_React$Component2, [this].concat(args))), _this2), _this2.handleChange = function () {
	      var _this2$props = _this2.props,
	          onChange = _this2$props.onChange,
	          min = _this2$props.min,
	          max = _this2$props.max,
	          date = _this2$props.date;

	      onChange(clamp(date, min, max));
	    }, _temp), _possibleConstructorReturn(_this2, _ret);
	  }

	  CalendarViewCell.prototype.isEqual = function isEqual(date) {
	    return _dates2.default.eq(this.props.date, date, this.props.unit);
	  };

	  CalendarViewCell.prototype.isEmpty = function isEmpty() {
	    var _props = this.props,
	        unit = _props.unit,
	        min = _props.min,
	        max = _props.max,
	        date = _props.date;

	    return !_dates2.default.inRange(date, min, max, unit);
	  };

	  CalendarViewCell.prototype.isNow = function isNow() {
	    return this.isEqual(this.props.now);
	  };

	  CalendarViewCell.prototype.isFocused = function isFocused() {
	    return this.isEqual(this.props.focused);
	  };

	  CalendarViewCell.prototype.isSelected = function isSelected() {
	    return this.isEqual(this.props.selected);
	  };

	  CalendarViewCell.prototype.isOffView = function isOffView() {
	    var _props2 = this.props,
	        viewUnit = _props2.viewUnit,
	        focused = _props2.focused,
	        date = _props2.date;

	    return viewUnit && _dates2.default[viewUnit](date) !== _dates2.default[viewUnit](focused);
	  };

	  CalendarViewCell.prototype.render = function render() {
	    var _props3 = this.props,
	        children = _props3.children,
	        id = _props3.id,
	        label = _props3.label,
	        disabled = _props3.disabled;


	    if (this.isEmpty()) {
	      return _react2.default.createElement(
	        'td',
	        { className: 'rw-empty-cell', role: 'presentation' },
	        '\xA0'
	      );
	    }

	    return _react2.default.createElement(
	      'td',
	      {
	        role: 'gridcell',
	        id: id,
	        title: label,
	        'aria-label': label,
	        'aria-readonly': disabled,
	        'aria-selected': this.isSelected()
	      },
	      _react2.default.createElement(
	        'span',
	        {
	          'aria-labelledby': id,
	          onClick: this.handleChange,
	          className: (0, _classnames2.default)('rw-btn', this.isNow() && 'rw-now', this.isOffView() && 'rw-off-range', this.isFocused() && 'rw-state-focus', this.isSelected() && 'rw-state-selected')
	        },
	        children
	      )
	    );
	  };

	  return CalendarViewCell;
	}(_react2.default.Component), _class.propTypes = {
	  id: _propTypes2.default.string,
	  label: _propTypes2.default.string,
	  today: _propTypes2.default.instanceOf(Date),
	  selected: _propTypes2.default.instanceOf(Date),
	  focused: _propTypes2.default.instanceOf(Date),
	  min: _propTypes2.default.instanceOf(Date),
	  max: _propTypes2.default.instanceOf(Date),
	  unit: _propTypes2.default.oneOf(['day'].concat(VIEW_UNITS)),
	  viewUnit: _propTypes2.default.oneOf(VIEW_UNITS),
	  onChange: _propTypes2.default.func.isRequired
	}, _temp2);


	CalendarView.Row = function (props) {
	  return _react2.default.createElement('tr', _extends({ role: 'row' }, props));
	};
	CalendarView.Cell = CalendarViewCell;

	exports.default = CalendarView;
	module.exports = exports['default'];

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _dateArithmetic = __webpack_require__(85);

	var _dateArithmetic2 = _interopRequireDefault(_dateArithmetic);

	var _constants = __webpack_require__(86);

	var _localizers = __webpack_require__(17);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var dates = _extends({}, _dateArithmetic2.default, {
	  parse: function parse(date, format, culture) {
	    return _localizers.date.parse(date, format, culture);
	  },
	  format: function format(date, _format, culture) {
	    return _localizers.date.format(date, _format, culture);
	  },
	  monthsInYear: function monthsInYear(year) {
	    var months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
	        date = new Date(year, 0, 1);

	    return months.map(function (i) {
	      return dates.month(date, i);
	    });
	  },
	  firstVisibleDay: function firstVisibleDay(date, culture) {
	    var firstOfMonth = dates.startOf(date, 'month');
	    return dates.startOf(firstOfMonth, 'week', _localizers.date.startOfWeek(culture));
	  },
	  lastVisibleDay: function lastVisibleDay(date, culture) {
	    var endOfMonth = dates.endOf(date, 'month');

	    return dates.endOf(endOfMonth, 'week', _localizers.date.startOfWeek(culture));
	  },
	  visibleDays: function visibleDays(date, culture) {
	    var current = dates.firstVisibleDay(date, culture),
	        last = dates.lastVisibleDay(date, culture),
	        days = [];

	    while (dates.lte(current, last, 'day')) {
	      days.push(current);
	      current = dates.add(current, 1, 'day');
	    }

	    return days;
	  },
	  move: function move(date, min, max, unit, direction) {
	    var isMonth = unit === 'month',
	        isUpOrDown = direction === _constants.directions.UP || direction === _constants.directions.DOWN,
	        rangeUnit = _constants.calendarViewUnits[unit],
	        addUnit = isMonth && isUpOrDown ? 'week' : _constants.calendarViewUnits[unit],
	        amount = isMonth || !isUpOrDown ? 1 : 4,
	        newDate;

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
	  sameMonth: function sameMonth(dateA, dateB) {
	    return dates.eq(dateA, dateB, 'month');
	  },
	  today: function today() {
	    return this.startOf(new Date(), 'day');
	  },
	  yesterday: function yesterday() {
	    return this.add(this.startOf(new Date(), 'day'), -1, 'day');
	  },
	  tomorrow: function tomorrow() {
	    return this.add(this.startOf(new Date(), 'day'), 1, 'day');
	  }
	});

	exports.default = dates;
	module.exports = exports['default'];

/***/ }),
/* 85 */
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
/* 86 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var _calendarViewHierarch, _calendarViewUnits;

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
	  CALENDAR: 'calendar'
	};

	var calendarViews = exports.calendarViews = views;

	var calendarViewHierarchy = exports.calendarViewHierarchy = (_calendarViewHierarch = {}, _calendarViewHierarch[views.MONTH] = views.YEAR, _calendarViewHierarch[views.YEAR] = views.DECADE, _calendarViewHierarch[views.DECADE] = views.CENTURY, _calendarViewHierarch);

	var calendarViewUnits = exports.calendarViewUnits = (_calendarViewUnits = {}, _calendarViewUnits[views.MONTH] = 'day', _calendarViewUnits[views.YEAR] = views.MONTH, _calendarViewUnits[views.DECADE] = views.YEAR, _calendarViewUnits[views.CENTURY] = views.DECADE, _calendarViewUnits);

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _CalendarView = __webpack_require__(83);

	var _CalendarView2 = _interopRequireDefault(_CalendarView);

	var _dates = __webpack_require__(84);

	var _dates2 = _interopRequireDefault(_dates);

	var _localizers = __webpack_require__(17);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	var _propTypes3 = __webpack_require__(43);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

	var _widgetHelpers = __webpack_require__(54);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var format = function format(props) {
	  return _localizers.date.getFormat('month', props.monthFormat);
	};

	var propTypes = {
	  culture: _propTypes2.default.string,
	  today: _propTypes2.default.instanceOf(Date),
	  value: _propTypes2.default.instanceOf(Date),
	  focused: _propTypes2.default.instanceOf(Date),
	  min: _propTypes2.default.instanceOf(Date),
	  max: _propTypes2.default.instanceOf(Date),
	  onChange: _propTypes2.default.func.isRequired,

	  monthFormat: _propTypes4.default.dateFormat
	};

	var optionId = function optionId(id, date) {
	  return id + '__year_' + _dates2.default.year(date) + '-' + _dates2.default.month(date);
	};

	var YearView = (0, _createReactClass2.default)({

	  displayName: 'YearView',

	  mixins: [__webpack_require__(80), __webpack_require__(57)()],

	  propTypes: propTypes,

	  componentDidUpdate: function componentDidUpdate() {
	    var activeId = optionId((0, _widgetHelpers.instanceId)(this), this.props.focused);
	    this.ariaActiveDescendant(activeId);
	  },
	  render: function render() {
	    var focused = this.props.focused,
	        months = _dates2.default.monthsInYear(_dates2.default.year(focused));


	    return _react2.default.createElement(
	      _CalendarView2.default,
	      _3.default.omitOwnProps(this),
	      _react2.default.createElement(
	        'tbody',
	        null,
	        _3.default.chunk(months, 4).map(this.renderRow)
	      )
	    );
	  },
	  renderRow: function renderRow(row, rowIdx) {
	    var _this = this;

	    var _props = this.props,
	        focused = _props.focused,
	        disabled = _props.disabled,
	        onChange = _props.onChange,
	        value = _props.value,
	        today = _props.today,
	        culture = _props.culture,
	        min = _props.min,
	        max = _props.max;


	    var id = (0, _widgetHelpers.instanceId)(this),
	        labelFormat = _localizers.date.getFormat('header');

	    return _react2.default.createElement(
	      _CalendarView2.default.Row,
	      { key: rowIdx },
	      row.map(function (date, colIdx) {
	        var label = _localizers.date.format(date, labelFormat, culture);

	        return _react2.default.createElement(
	          _CalendarView2.default.Cell,
	          {
	            key: colIdx,
	            id: optionId(id, date),
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
	          _localizers.date.format(date, format(_this.props), culture)
	        );
	      })
	    );
	  }
	});

	exports.default = YearView;
	module.exports = exports['default'];

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _CalendarView = __webpack_require__(83);

	var _CalendarView2 = _interopRequireDefault(_CalendarView);

	var _dates = __webpack_require__(84);

	var _dates2 = _interopRequireDefault(_dates);

	var _localizers = __webpack_require__(17);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	var _propTypes3 = __webpack_require__(43);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

	var _widgetHelpers = __webpack_require__(54);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var propTypes = {
	  culture: _propTypes2.default.string,
	  today: _propTypes2.default.instanceOf(Date),
	  value: _propTypes2.default.instanceOf(Date),
	  focused: _propTypes2.default.instanceOf(Date),
	  min: _propTypes2.default.instanceOf(Date),
	  max: _propTypes2.default.instanceOf(Date),
	  onChange: _propTypes2.default.func.isRequired,

	  yearFormat: _propTypes4.default.dateFormat
	};

	var optionId = function optionId(id, date) {
	  return id + '__decade_' + _dates2.default.year(date);
	};

	exports.default = (0, _createReactClass2.default)({

	  displayName: 'DecadeView',

	  mixins: [__webpack_require__(66), __webpack_require__(80), __webpack_require__(57)()],

	  propTypes: propTypes,

	  componentDidUpdate: function componentDidUpdate() {
	    var activeId = optionId((0, _widgetHelpers.instanceId)(this), this.props.focused);
	    this.ariaActiveDescendant(activeId);
	  },
	  render: function render() {
	    var focused = this.props.focused;


	    return _react2.default.createElement(
	      _CalendarView2.default,
	      _3.default.omitOwnProps(this),
	      _react2.default.createElement(
	        'tbody',
	        null,
	        _3.default.chunk(getDecadeYears(focused), 4).map(this.renderRow)
	      )
	    );
	  },
	  renderRow: function renderRow(row, rowIdx) {
	    var _props = this.props,
	        focused = _props.focused,
	        disabled = _props.disabled,
	        onChange = _props.onChange,
	        yearFormat = _props.yearFormat,
	        value = _props.value,
	        today = _props.today,
	        culture = _props.culture,
	        min = _props.min,
	        max = _props.max;


	    var id = (0, _widgetHelpers.instanceId)(this);

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
	            id: optionId(id, date),
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
	  }
	});


	function getDecadeYears(_date) {
	  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	      date = _dates2.default.add(_dates2.default.startOf(_date, 'decade'), -2, 'year');

	  return days.map(function () {
	    return date = _dates2.default.add(date, 1, 'year');
	  });
	}
	module.exports = exports['default'];

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _CalendarView = __webpack_require__(83);

	var _CalendarView2 = _interopRequireDefault(_CalendarView);

	var _dates = __webpack_require__(84);

	var _dates2 = _interopRequireDefault(_dates);

	var _localizers = __webpack_require__(17);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	var _propTypes3 = __webpack_require__(43);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

	var _widgetHelpers = __webpack_require__(54);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var format = function format(props) {
	  return _localizers.date.getFormat('decade', props.decadeFormat);
	};

	var optionId = function optionId(id, date) {
	  return id + '__century_' + _dates2.default.year(date);
	};

	var propTypes = {
	  culture: _propTypes2.default.string,
	  today: _propTypes2.default.instanceOf(Date),
	  value: _propTypes2.default.instanceOf(Date),
	  focused: _propTypes2.default.instanceOf(Date),
	  min: _propTypes2.default.instanceOf(Date),
	  max: _propTypes2.default.instanceOf(Date),
	  onChange: _propTypes2.default.func.isRequired,
	  decadeFormat: _propTypes4.default.dateFormat
	};

	exports.default = (0, _createReactClass2.default)({

	  displayName: 'CenturyView',

	  mixins: [__webpack_require__(66), __webpack_require__(80), __webpack_require__(57)()],

	  propTypes: propTypes,

	  componentDidUpdate: function componentDidUpdate() {
	    var activeId = optionId((0, _widgetHelpers.instanceId)(this), this.props.focused);
	    this.ariaActiveDescendant(activeId);
	  },
	  render: function render() {
	    var focused = this.props.focused;


	    return _react2.default.createElement(
	      _CalendarView2.default,
	      _3.default.omitOwnProps(this),
	      _react2.default.createElement(
	        'tbody',
	        null,
	        _3.default.chunk(getCenturyDecades(focused), 4).map(this.renderRow)
	      )
	    );
	  },
	  renderRow: function renderRow(row, rowIdx) {
	    var _this = this;

	    var _props = this.props,
	        focused = _props.focused,
	        disabled = _props.disabled,
	        onChange = _props.onChange,
	        value = _props.value,
	        today = _props.today,
	        culture = _props.culture,
	        min = _props.min,
	        max = _props.max;


	    var id = (0, _widgetHelpers.instanceId)(this, '_century');

	    return _react2.default.createElement(
	      _CalendarView2.default.Row,
	      { key: rowIdx },
	      row.map(function (date, colIdx) {
	        var label = _localizers.date.format(_dates2.default.startOf(date, 'decade'), format(_this.props), culture);

	        return _react2.default.createElement(
	          _CalendarView2.default.Cell,
	          {
	            key: colIdx,
	            unit: 'decade',
	            id: optionId(id, date),
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
	  }
	});


	function getCenturyDecades(_date) {
	  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	      date = _dates2.default.add(_dates2.default.startOf(_date, 'century'), -20, 'year');

	  return days.map(function () {
	    return date = _dates2.default.add(date, 10, 'year');
	  });
	}
	module.exports = exports['default'];

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _ReplaceTransitionGroup = __webpack_require__(91);

	var _ReplaceTransitionGroup2 = _interopRequireDefault(_ReplaceTransitionGroup);

	var _compat = __webpack_require__(50);

	var _compat2 = _interopRequireDefault(_compat);

	var _style = __webpack_require__(6);

	var _style2 = _interopRequireDefault(_style);

	var _width = __webpack_require__(92);

	var _width2 = _interopRequireDefault(_width);

	var _configuration = __webpack_require__(3);

	var _configuration2 = _interopRequireDefault(_configuration);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SlideChildGroup = (0, _createReactClass2.default)({
	  displayName: 'SlideChildGroup',


	  propTypes: {
	    direction: _propTypes2.default.oneOf(['left', 'right']),
	    duration: _propTypes2.default.number
	  },

	  componentWillEnter: function componentWillEnter(done) {
	    var _this = this;

	    var node = _compat2.default.findDOMNode(this),
	        width = (0, _width2.default)(node),
	        direction = this.props.direction;

	    width = direction === 'left' ? width : -width;

	    this.ORGINAL_POSITION = node.style.position;

	    (0, _style2.default)(node, { position: 'absolute', left: width + 'px', top: 0 });

	    _configuration2.default.animate(node, { left: 0 }, this.props.duration, function () {

	      (0, _style2.default)(node, {
	        position: _this.ORGINAL_POSITION,
	        overflow: 'hidden'
	      });

	      _this.ORGINAL_POSITION = null;
	      done && done();
	    });
	  },
	  componentWillLeave: function componentWillLeave(done) {
	    var _this2 = this;

	    var node = _compat2.default.findDOMNode(this),
	        width = (0, _width2.default)(node),
	        direction = this.props.direction;

	    width = direction === 'left' ? -width : width;

	    this.ORGINAL_POSITION = node.style.position;

	    (0, _style2.default)(node, { position: 'absolute', top: 0, left: 0 });

	    _configuration2.default.animate(node, { left: width + 'px' }, this.props.duration, function () {
	      (0, _style2.default)(node, {
	        position: _this2.ORGINAL_POSITION,
	        overflow: 'hidden'
	      });

	      _this2.ORGINAL_POSITION = null;
	      done && done();
	    });
	  },
	  render: function render() {
	    return _react2.default.Children.only(this.props.children);
	  }
	});

	module.exports = (0, _createReactClass2.default)({
	  displayName: 'exports',


	  propTypes: {
	    direction: _propTypes2.default.oneOf(['left', 'right']),
	    duration: _propTypes2.default.number
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      direction: 'left',
	      duration: 250
	    };
	  },
	  _wrapChild: function _wrapChild(child, ref) {
	    return _react2.default.createElement(
	      SlideChildGroup,
	      { key: child.key, ref: ref,
	        direction: this.props.direction,
	        duration: this.props.duration },
	      child
	    );
	  },
	  render: function render() {
	    var _props = this.props,
	        style = _props.style,
	        children = _props.children;


	    style = _extends({}, style, {
	      position: 'relative',
	      overflow: 'hidden'
	    });

	    return _react2.default.createElement(
	      _ReplaceTransitionGroup2.default,
	      _extends({}, _3.default.omitOwnProps(this), {
	        ref: 'container',
	        component: 'div',
	        childFactory: this._wrapChild,
	        style: style
	      }),
	      children
	    );
	  }
	});

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _style = __webpack_require__(6);

	var _style2 = _interopRequireDefault(_style);

	var _height = __webpack_require__(47);

	var _height2 = _interopRequireDefault(_height);

	var _width = __webpack_require__(92);

	var _width2 = _interopRequireDefault(_width);

	var _compat = __webpack_require__(50);

	var _compat2 = _interopRequireDefault(_compat);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * A streamlined version of TransitionGroup built for managing at most two active children
	 * also provides additional hooks for animation start/end
	 * https://github.com/facebook/react/blob/master/src/addons/transitions/ReactTransitionGroup.js
	 * relevent code is licensed accordingly
	 */
	function getChild(children) {
	  return _react2.default.Children.only(children);
	}

	function key(child) {
	  return child && child.key;
	}

	exports.default = (0, _createReactClass2.default)({

	  displayName: 'ReplaceTransitionGroup',

	  propTypes: {
	    component: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string]),
	    childFactory: _propTypes2.default.func,
	    onAnimating: _propTypes2.default.func,
	    onAnimate: _propTypes2.default.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      component: 'span',
	      childFactory: function childFactory(a) {
	        return a;
	      },
	      onAnimating: _3.default.noop,
	      onAnimate: _3.default.noop
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      children: _3.default.splat(this.props.children)
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var nextChild = getChild(nextProps.children),
	        stack = this.state.children.slice(),
	        next = stack[1],
	        last = stack[0];

	    var isLastChild = last && key(last) === key(nextChild),
	        isNextChild = next && key(next) === key(nextChild);

	    //no children
	    if (!last) {
	      stack.push(nextChild);
	      this.entering = nextChild;
	    } else if (last && !next && !isLastChild) {
	      //new child
	      stack.push(nextChild);
	      this.leaving = last;
	      this.entering = nextChild;
	    } else if (last && next && !isLastChild && !isNextChild) {
	      // the child is not the current one, exit the current one, add the new one
	      //  - shift the stack down
	      stack.shift();
	      stack.push(nextChild);
	      this.leaving = next;
	      this.entering = nextChild;
	    }
	    //new child that just needs to be re-rendered
	    else if (isLastChild) stack.splice(0, 1, nextChild);else if (isNextChild) stack.splice(1, 1, nextChild);

	    if (this.state.children[0] !== stack[0] || this.state.children[1] !== stack[1]) this.setState({ children: stack });
	  },
	  componentWillMount: function componentWillMount() {
	    this.animatingKeys = {};
	    this.leaving = null;
	    this.entering = null;
	  },
	  componentDidMount: function componentDidMount() {
	    this._mounted = true;
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this._mounted = false;
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    var entering = this.entering,
	        leaving = this.leaving,
	        first = this.refs[key(entering) || key(leaving)],
	        node = _compat2.default.findDOMNode(this),
	        el = first && _compat2.default.findDOMNode(first);

	    if (el) (0, _style2.default)(node, {
	      overflow: 'hidden',
	      height: (0, _height2.default)(el) + 'px',
	      width: (0, _width2.default)(el) + 'px'
	    });

	    this.props.onAnimating();

	    this.entering = null;
	    this.leaving = null;

	    if (entering) this.performEnter(key(entering));
	    if (leaving) this.performLeave(key(leaving));
	  },
	  performEnter: function performEnter(key) {
	    var component = this.refs[key];

	    if (!component) return;

	    this.animatingKeys[key] = true;

	    if (component.componentWillEnter) component.componentWillEnter(this._handleDoneEntering.bind(this, key));else this._handleDoneEntering(key);
	  },
	  _tryFinish: function _tryFinish() {

	    if (this.isTransitioning()) return;

	    if (this._mounted) (0, _style2.default)(_compat2.default.findDOMNode(this), { overflow: 'visible', height: '', width: '' });

	    this.props.onAnimate();
	  },
	  _handleDoneEntering: function _handleDoneEntering(enterkey) {
	    var component = this.refs[enterkey];

	    if (component && component.componentDidEnter) component.componentDidEnter();

	    delete this.animatingKeys[enterkey];

	    if (key(this.props.children) !== enterkey) this.performLeave(enterkey); // This was removed before it had fully entered. Remove it.

	    this._tryFinish();
	  },
	  performLeave: function performLeave(key) {
	    var component = this.refs[key];

	    if (!component) return;

	    this.animatingKeys[key] = true;

	    if (component.componentWillLeave) component.componentWillLeave(this._handleDoneLeaving.bind(this, key));else this._handleDoneLeaving(key);
	  },
	  _handleDoneLeaving: function _handleDoneLeaving(leavekey) {
	    var component = this.refs[leavekey];

	    if (component && component.componentDidLeave) component.componentDidLeave();

	    delete this.animatingKeys[leavekey];

	    if (key(this.props.children) === leavekey) this.performEnter(leavekey); // This entered again before it fully left. Add it again.

	    else if (this._mounted) this.setState({
	        children: this.state.children.filter(function (c) {
	          return key(c) !== leavekey;
	        })
	      });

	    this._tryFinish();
	  },
	  isTransitioning: function isTransitioning() {
	    return !!Object.keys(this.animatingKeys).length;
	  },
	  render: function render() {
	    var _this = this;

	    var Component = this.props.component;

	    return _react2.default.createElement(
	      Component,
	      _3.default.omitOwnProps(this),
	      this.state.children.map(function (c) {
	        return _this.props.childFactory(c, key(c));
	      })
	    );
	  }
	});
	module.exports = exports['default'];

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var offset = __webpack_require__(48),
	    getWindow = __webpack_require__(49);

	module.exports = function width(node, client) {
	  var win = getWindow(node);
	  return win ? win.innerWidth : client ? node.clientWidth : offset(node).width;
	};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _desc, _value, _obj;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //pick, omit, has

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _invariant = __webpack_require__(18);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _activeElement = __webpack_require__(34);

	var _activeElement2 = _interopRequireDefault(_activeElement);

	var _classnames = __webpack_require__(37);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _compat = __webpack_require__(50);

	var _compat2 = _interopRequireDefault(_compat);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	var _dates = __webpack_require__(84);

	var _dates2 = _interopRequireDefault(_dates);

	var _localizers = __webpack_require__(17);

	var _constants = __webpack_require__(86);

	var _Widget = __webpack_require__(38);

	var _Widget2 = _interopRequireDefault(_Widget);

	var _Popup = __webpack_require__(46);

	var _Popup2 = _interopRequireDefault(_Popup);

	var _Calendar = __webpack_require__(78);

	var _Calendar2 = _interopRequireDefault(_Calendar);

	var _TimeList = __webpack_require__(94);

	var _TimeList2 = _interopRequireDefault(_TimeList);

	var _DateTimePickerInput = __webpack_require__(95);

	var _DateTimePickerInput2 = _interopRequireDefault(_DateTimePickerInput);

	var _Button = __webpack_require__(41);

	var _Button2 = _interopRequireDefault(_Button);

	var _propTypes3 = __webpack_require__(43);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

	var _uncontrollable = __webpack_require__(61);

	var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

	var _interaction = __webpack_require__(55);

	var _widgetHelpers = __webpack_require__(54);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	var Calendar = _Calendar2.default.ControlledComponent;

	var viewEnum = Object.keys(_constants.calendarViews).map(function (k) {
	  return _constants.calendarViews[k];
	});

	var propTypes = _extends({}, Calendar.propTypes, {

	  //-- controlled props -----------
	  value: _propTypes2.default.instanceOf(Date),
	  onChange: _propTypes2.default.func,
	  open: _propTypes2.default.oneOf([false, _constants.datePopups.TIME, _constants.datePopups.CALENDAR]),
	  onToggle: _propTypes2.default.func,
	  currentDate: _propTypes2.default.instanceOf(Date),
	  onCurrentDateChange: _propTypes2.default.func,
	  //------------------------------------

	  onSelect: _propTypes2.default.func,

	  min: _propTypes2.default.instanceOf(Date),
	  max: _propTypes2.default.instanceOf(Date),

	  culture: _propTypes2.default.string,

	  format: _propTypes4.default.dateFormat,
	  timeFormat: _propTypes4.default.dateFormat,
	  editFormat: _propTypes4.default.dateFormat,

	  calendar: _propTypes2.default.bool,
	  time: _propTypes2.default.bool,

	  timeComponent: _propTypes4.default.elementType,

	  //popup
	  dropUp: _propTypes2.default.bool,
	  duration: _propTypes2.default.number,

	  placeholder: _propTypes2.default.string,
	  name: _propTypes2.default.string,

	  initialView: _propTypes2.default.oneOf(viewEnum),
	  finalView: _propTypes2.default.oneOf(viewEnum),

	  autoFocus: _propTypes2.default.bool,
	  disabled: _propTypes4.default.disabled,
	  readOnly: _propTypes4.default.readOnly,

	  parse: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.string, _propTypes2.default.func]),

	  'aria-labelledby': _propTypes2.default.string,
	  'aria-describedby': _propTypes2.default.string,

	  messages: _propTypes2.default.shape({
	    calendarButton: _propTypes2.default.string,
	    timeButton: _propTypes2.default.string
	  })
	});

	var DateTimePicker = (0, _createReactClass2.default)((_obj = {

	  displayName: 'DateTimePicker',

	  mixins: [__webpack_require__(64), __webpack_require__(66), __webpack_require__(68), __webpack_require__(73), __webpack_require__(74)({
	    didHandle: function didHandle(focused) {
	      if (!focused) this.close();
	    }
	  }), __webpack_require__(57)('valueInput', function (key, id) {
	    var open = this.props.open,
	        current = this.ariaActiveDescendant(),
	        calIsActive = open === _constants.datePopups.CALENDAR && key === 'calendar',
	        timeIsActive = open === _constants.datePopups.TIME && key === 'timelist';


	    if (!current || timeIsActive || calIsActive) return id;
	  })],

	  propTypes: propTypes,

	  getInitialState: function getInitialState() {
	    return {
	      focused: false
	    };
	  },
	  getDefaultProps: function getDefaultProps() {

	    return {
	      value: null,
	      currentDate: new Date(),
	      min: new Date(1900, 0, 1),
	      max: new Date(2099, 11, 31),
	      calendar: true,
	      time: true,
	      open: false,

	      //calendar override
	      footer: true,

	      messages: {
	        calendarButton: 'Select Date',
	        timeButton: 'Select Time'
	      },

	      ariaActiveDescendantKey: 'dropdownlist'
	    };
	  },
	  renderInput: function renderInput(id, owns) {
	    var _props = this.props,
	        open = _props.open,
	        value = _props.value,
	        editFormat = _props.editFormat,
	        culture = _props.culture,
	        busy = _props.busy,
	        placeholder = _props.placeholder,
	        disabled = _props.disabled,
	        readOnly = _props.readOnly,
	        name = _props.name,
	        tabIndex = _props.tabIndex,
	        autoFocus = _props.autoFocus,
	        ariaLabelledby = _props['aria-labelledby'],
	        ariaDescribedby = _props['aria-describedby'];
	    var focused = this.state.focused;


	    return _react2.default.createElement(_DateTimePickerInput2.default, {
	      id: id,
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
	      parse: this._parse,
	      onChange: this.handleChange,
	      'aria-haspopup': true,
	      'aria-labelledby': ariaLabelledby,
	      'aria-describedby': ariaDescribedby,
	      'aria-expanded': !!open,
	      'aria-busy': !!busy,
	      'aria-owns': owns
	    });
	  },
	  renderButtons: function renderButtons(messages) {
	    var _props2 = this.props,
	        calendar = _props2.calendar,
	        time = _props2.time,
	        disabled = _props2.disabled,
	        readOnly = _props2.readOnly;


	    if (!calendar && !time) {
	      return null;
	    }

	    return _react2.default.createElement(
	      'span',
	      { className: 'rw-select' },
	      calendar && _react2.default.createElement(_Button2.default, {
	        icon: 'calendar',
	        className: 'rw-btn-calendar',
	        label: messages.calendarButton,
	        disabled: !!(disabled || readOnly),
	        onClick: this._click.bind(null, _constants.datePopups.CALENDAR)
	      }),
	      time && _react2.default.createElement(_Button2.default, {
	        icon: 'clock-o',
	        className: 'rw-btn-time',
	        label: messages.timeButton,
	        disabled: !!(disabled || readOnly),
	        onClick: this._click.bind(null, _constants.datePopups.TIME)
	      })
	    );
	  },
	  renderCalendar: function renderCalendar(id, inputID) {
	    var _this = this;

	    var _props3 = this.props,
	        open = _props3.open,
	        value = _props3.value,
	        duration = _props3.duration,
	        dropUp = _props3.dropUp;


	    var calendarProps = _3.default.pickProps(this.props, Calendar);

	    return _react2.default.createElement(
	      _Popup2.default,
	      {
	        dropUp: dropUp,
	        duration: duration,
	        open: open === _constants.datePopups.CALENDAR,
	        className: 'rw-calendar-popup'
	      },
	      _react2.default.createElement(Calendar, _extends({}, calendarProps, {
	        ref: 'calPopup',
	        id: id,
	        tabIndex: '-1',
	        value: value,
	        autoFocus: false,
	        onChange: this.handleDateSelect
	        // #75: need to aggressively reclaim focus from the calendar otherwise
	        // disabled header/footer buttons will drop focus completely from the widget
	        , onNavigate: function onNavigate() {
	          return _this.focus();
	        },
	        currentDate: this.props.currentDate,
	        onCurrentDateChange: this.props.onCurrentDateChange,
	        'aria-hidden': !open,
	        'aria-live': 'polite',
	        'aria-labelledby': inputID,
	        ariaActiveDescendantKey: 'calendar'
	      }))
	    );
	  },
	  renderTimeList: function renderTimeList(id, inputID) {
	    var _this2 = this;

	    var _props4 = this.props,
	        open = _props4.open,
	        value = _props4.value,
	        duration = _props4.duration,
	        dropUp = _props4.dropUp,
	        calendar = _props4.calendar,
	        timeFormat = _props4.timeFormat,
	        timeComponent = _props4.timeComponent;


	    var timeListProps = _3.default.pickProps(this.props, _TimeList2.default);

	    return _react2.default.createElement(
	      _Popup2.default,
	      {
	        dropUp: dropUp,
	        duration: duration,
	        open: open === _constants.datePopups.TIME,
	        onOpening: function onOpening() {
	          return _this2.refs.timePopup.forceUpdate();
	        }
	      },
	      _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_TimeList2.default, _extends({}, timeListProps, {
	          ref: 'timePopup',
	          id: id,
	          format: timeFormat,
	          value: dateOrNull(value),
	          onMove: this._scrollTo,
	          onSelect: this.handleTimeSelect,
	          preserveDate: !!calendar,
	          itemComponent: timeComponent,
	          'aria-labelledby': inputID,
	          'aria-live': open && 'polite',
	          'aria-hidden': !open,
	          ariaActiveDescendantKey: 'timelist'
	        }))
	      )
	    );
	  },
	  render: function render() {
	    var _props5 = this.props,
	        className = _props5.className,
	        calendar = _props5.calendar,
	        time = _props5.time,
	        open = _props5.open,
	        messages = _props5.messages,
	        disabled = _props5.disabled,
	        readOnly = _props5.readOnly,
	        dropUp = _props5.dropUp;
	    var focused = this.state.focused;


	    var inputID = (0, _widgetHelpers.instanceId)(this, '_input'),
	        timeListID = (0, _widgetHelpers.instanceId)(this, '_time_listbox'),
	        dateListID = (0, _widgetHelpers.instanceId)(this, '_cal'),
	        owns = '';

	    var elementProps = _3.default.omitOwnProps(this, Calendar, _TimeList2.default);

	    var shouldRenderList = open || (0, _widgetHelpers.isFirstFocusedRender)(this);

	    if (calendar) owns += dateListID;
	    if (time) owns += ' ' + timeListID;

	    return _react2.default.createElement(
	      _Widget2.default,
	      _extends({}, elementProps, {
	        open: !!open,
	        dropUp: dropUp,
	        focused: focused,
	        disabled: disabled,
	        readOnly: readOnly,
	        onBlur: this.handleBlur,
	        onFocus: this.handleFocus,
	        onKeyDown: this.handleKeyDown,
	        onKeyPress: this.handleKeyPress,
	        className: (0, _classnames2.default)(className, 'rw-datetimepicker', calendar && time && 'rw-has-both', !calendar && !time && 'rw-has-neither')
	      }),
	      this.renderInput(inputID, owns.trim()),
	      this.renderButtons(messages),
	      shouldRenderList && this.renderTimeList(timeListID, inputID),
	      shouldRenderList && this.renderCalendar(dateListID, inputID)
	    );
	  },
	  handleChange: function handleChange(date, str, constrain) {
	    var _props6 = this.props,
	        onChange = _props6.onChange,
	        value = _props6.value;


	    if (constrain) date = this.inRangeValue(date);

	    if (onChange) {
	      if (date == null || value == null) {
	        if (date != value) //eslint-disable-line eqeqeq
	          onChange(date, str);
	      } else if (!_dates2.default.eq(date, value)) {
	        onChange(date, str);
	      }
	    }
	  },
	  handleKeyDown: function handleKeyDown(e) {
	    var _props7 = this.props,
	        open = _props7.open,
	        calendar = _props7.calendar,
	        time = _props7.time;


	    (0, _widgetHelpers.notify)(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (e.key === 'Escape' && open) this.close();else if (e.altKey) {
	      e.preventDefault();

	      if (e.key === 'ArrowDown') {
	        if (calendar && time) this.open(open === _constants.datePopups.CALENDAR ? _constants.datePopups.TIME : _constants.datePopups.CALENDAR);else if (time) this.open(_constants.datePopups.TIME);else if (calendar) this.open(_constants.datePopups.CALENDAR);
	      } else if (e.key === 'ArrowUp') this.close();
	    } else if (open) {
	      if (open === _constants.datePopups.CALENDAR) this.refs.calPopup.handleKeyDown(e);
	      if (open === _constants.datePopups.TIME) this.refs.timePopup.handleKeyDown(e);
	    }
	  },
	  handleKeyPress: function handleKeyPress(e) {
	    (0, _widgetHelpers.notify)(this.props.onKeyPress, [e]);

	    if (e.defaultPrevented) return;

	    if (this.props.open === _constants.datePopups.TIME) this.refs.timePopup.handleKeyPress(e);
	  },
	  focus: function focus() {
	    var valueInput = this.refs.valueInput;


	    if (valueInput && (0, _activeElement2.default)() !== _compat2.default.findDOMNode(valueInput)) valueInput.focus();
	  },
	  handleDateSelect: function handleDateSelect(date) {
	    var format = getFormat(this.props),
	        dateTime = _dates2.default.merge(date, this.props.value, this.props.currentDate),
	        dateStr = formatDate(date, format, this.props.culture);

	    this.close();
	    (0, _widgetHelpers.notify)(this.props.onSelect, [dateTime, dateStr]);
	    this.handleChange(dateTime, dateStr, true);
	    this.focus();
	  },
	  handleTimeSelect: function handleTimeSelect(datum) {
	    var format = getFormat(this.props),
	        dateTime = _dates2.default.merge(this.props.value, datum.date, this.props.currentDate),
	        dateStr = formatDate(datum.date, format, this.props.culture);

	    this.close();
	    (0, _widgetHelpers.notify)(this.props.onSelect, [dateTime, dateStr]);
	    this.handleChange(dateTime, dateStr, true);
	    this.focus();
	  },
	  _click: function _click(view, e) {
	    this.focus();
	    this.toggle(view, e);
	  },
	  _parse: function _parse(string) {
	    var format = getFormat(this.props, true),
	        editFormat = this.props.editFormat,
	        parse = this.props.parse,
	        formats = [];

	    if (typeof parse === 'function') return parse(string, this.props.culture);

	    if (typeof format === 'string') formats.push(format);

	    if (typeof editFormat === 'string') formats.push(editFormat);

	    if (parse) formats = formats.concat(this.props.parse);

	    (0, _invariant2.default)(formats.length, 'React Widgets: there are no specified `parse` formats provided and the `format` prop is a function. ' + 'the DateTimePicker is unable to parse `%s` into a dateTime, ' + 'please provide either a parse function or Globalize.js compatible string for `format`', string);

	    return formatsParser(formats, this.props.culture, string);
	  },
	  toggle: function toggle(view) {
	    this.props.open ? this.props.open !== view ? this.open(view) : this.close(view) : this.open(view);
	  },
	  open: function open(view) {
	    if (this.props.open !== view && this.props[view] === true) (0, _widgetHelpers.notify)(this.props.onToggle, view);
	  },
	  close: function close() {
	    if (this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, false);
	  },
	  inRangeValue: function inRangeValue(value) {
	    if (value == null) return value;

	    return _dates2.default.max(_dates2.default.min(value, this.props.max), this.props.min);
	  }
	}, (_applyDecoratedDescriptor(_obj, 'handleChange', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleChange'), _obj), _applyDecoratedDescriptor(_obj, 'handleKeyDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleKeyDown'), _obj), _applyDecoratedDescriptor(_obj, 'handleKeyPress', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleKeyPress'), _obj), _applyDecoratedDescriptor(_obj, 'handleDateSelect', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleDateSelect'), _obj), _applyDecoratedDescriptor(_obj, 'handleTimeSelect', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleTimeSelect'), _obj), _applyDecoratedDescriptor(_obj, '_click', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, '_click'), _obj)), _obj));

	exports.default = (0, _uncontrollable2.default)(DateTimePicker, {
	  open: 'onToggle',
	  value: 'onChange',
	  currentDate: 'onCurrentDateChange'
	}, ['focus']);


	function getFormat(props) {
	  var cal = props[_constants.datePopups.CALENDAR] != null ? props.calendar : true,
	      time = props[_constants.datePopups.TIME] != null ? props.time : true;

	  return props.format ? props.format : cal && time || !cal && !time ? _localizers.date.getFormat('default') : _localizers.date.getFormat(cal ? 'date' : 'time');
	}

	function formatDate(date, format, culture) {
	  var val = '';

	  if (date instanceof Date && !isNaN(date.getTime())) val = _localizers.date.format(date, format, culture);

	  return val;
	}

	function formatsParser(formats, culture, str) {
	  var date;

	  for (var i = 0; i < formats.length; i++) {
	    date = _localizers.date.parse(str, formats[i], culture);
	    if (date) return date;
	  }
	  return null;
	}

	function dateOrNull(dt) {
	  if (dt && !isNaN(dt.getTime())) return dt;
	  return null;
	}
	module.exports = exports['default'];

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _dates2 = __webpack_require__(84);

	var _dates3 = _interopRequireDefault(_dates2);

	var _List = __webpack_require__(52);

	var _List2 = _interopRequireDefault(_List);

	var _localizers = __webpack_require__(17);

	var _propTypes3 = __webpack_require__(43);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var format = function format(props) {
	  return _localizers.date.getFormat('time', props.format);
	};

	exports.default = (0, _createReactClass2.default)({

	  displayName: 'TimeList',

	  propTypes: {
	    value: _propTypes2.default.instanceOf(Date),
	    step: _propTypes2.default.number,
	    min: _propTypes2.default.instanceOf(Date),
	    max: _propTypes2.default.instanceOf(Date),
	    currentDate: _propTypes2.default.instanceOf(Date),

	    itemComponent: _propTypes4.default.elementType,
	    format: _propTypes4.default.dateFormat,
	    onSelect: _propTypes2.default.func,
	    preserveDate: _propTypes2.default.bool,
	    culture: _propTypes2.default.string,
	    delay: _propTypes2.default.number
	  },

	  mixins: [__webpack_require__(64)],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      step: 30,
	      onSelect: function onSelect() {},
	      min: new Date(1900, 0, 1),
	      max: new Date(2099, 11, 31),
	      preserveDate: true,
	      delay: 300,
	      ariaActiveDescendantKey: 'timelist'
	    };
	  },
	  getInitialState: function getInitialState() {
	    var data = this._dates(this.props),
	        focusedItem = this._closestDate(data, this.props.value || this.props.currentDate);

	    return {
	      focusedItem: focusedItem || data[0],
	      dates: data
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    this._mounted = true;
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this._mounted = false;
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var data = this._dates(nextProps),
	        focusedItem = this._closestDate(data, nextProps.value || this.props.currentDate),
	        valChanged = !_dates3.default.eq(nextProps.value, this.props.value, 'minutes'),
	        minChanged = !_dates3.default.eq(nextProps.min, this.props.min, 'minutes'),
	        maxChanged = !_dates3.default.eq(nextProps.max, this.props.max, 'minutes'),
	        localeChanged = this.props.format !== nextProps.format || this.props.culture !== nextProps.culture;

	    if (valChanged || minChanged || maxChanged || localeChanged) {
	      this.setState({
	        focusedItem: focusedItem || data[0],
	        dates: data
	      });
	    }
	  },
	  render: function render() {
	    var _props = this.props,
	        value = _props.value,
	        onSelect = _props.onSelect,
	        itemComponent = _props.itemComponent;


	    var times = this.state.dates,
	        date = this._closestDate(times, value);

	    return _react2.default.createElement(_List2.default, _extends({}, _3.default.omitOwnProps(this), {
	      ref: 'list',
	      data: times,
	      textField: 'label',
	      valueField: 'date',
	      selected: date,
	      onSelect: onSelect,
	      focused: this.state.focusedItem,
	      itemComponent: itemComponent
	    }));
	  },
	  _closestDate: function _closestDate(times, date) {
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
	  },
	  _data: function _data() {
	    return this.state.dates;
	  },
	  _dates: function _dates(props) {
	    var times = [],
	        i = 0,
	        values = this._dateValues(props),
	        start = values.min,
	        startDay = _dates3.default.date(start);

	    while (_dates3.default.date(start) === startDay && _dates3.default.lte(start, values.max)) {
	      i++;
	      times.push({ date: start, label: _localizers.date.format(start, format(props), props.culture) });
	      start = _dates3.default.add(start, props.step || 30, 'minutes');
	    }
	    return times;
	  },
	  _dateValues: function _dateValues(props) {
	    var value = props.value || props.currentDate || _dates3.default.today(),
	        useDate = props.preserveDate,
	        min = props.min,
	        max = props.max,
	        start,
	        end;

	    //compare just the time regradless of whether they fall on the same day
	    if (!useDate) {
	      start = _dates3.default.startOf(_dates3.default.merge(new Date(), min, props.currentDate), 'minutes');
	      end = _dates3.default.startOf(_dates3.default.merge(new Date(), max, props.currentDate), 'minutes');

	      if (_dates3.default.lte(end, start) && _dates3.default.gt(max, min, 'day')) end = _dates3.default.tomorrow();

	      return {
	        min: start,
	        max: end
	      };
	    }

	    start = _dates3.default.today();
	    end = _dates3.default.tomorrow();
	    //date parts are equal
	    return {
	      min: _dates3.default.eq(value, min, 'day') ? _dates3.default.merge(start, min, props.currentDate) : start,
	      max: _dates3.default.eq(value, max, 'day') ? _dates3.default.merge(start, max, props.currentDate) : end
	    };
	  },
	  handleKeyDown: function handleKeyDown(e) {
	    var key = e.key,
	        focusedItem = this.state.focusedItem,
	        list = this.refs.list;

	    if (key === 'End') {
	      e.preventDefault();
	      this.setState({ focusedItem: list.last() });
	    } else if (key === 'Home') {
	      e.preventDefault();
	      this.setState({ focusedItem: list.first() });
	    } else if (key === 'Enter') this.props.onSelect(focusedItem);else if (key === 'ArrowDown') {
	      e.preventDefault();
	      this.setState({ focusedItem: list.next(focusedItem) });
	    } else if (key === 'ArrowUp') {
	      e.preventDefault();
	      this.setState({ focusedItem: list.prev(focusedItem) });
	    }
	  },
	  handleKeyPress: function handleKeyPress(e) {
	    var _this = this;

	    e.preventDefault();

	    this.search(String.fromCharCode(e.which), function (item) {
	      _this._mounted && _this.setState({ focusedItem: item });
	    });
	  },
	  scrollTo: function scrollTo() {
	    this.refs.list.move && this.refs.list.move();
	  },
	  search: function search(character, cb) {
	    var _this2 = this;

	    var word = ((this._searchTerm || '') + character).toLowerCase();

	    this._searchTerm = word;

	    this.setTimeout('search', function () {
	      var list = _this2.refs.list,
	          item = list.next(_this2.state.focusedItem, word);

	      _this2._searchTerm = '';
	      if (item) cb(item);
	    }, this.props.delay);
	  }
	});
	module.exports = exports['default'];

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	var _Input = __webpack_require__(39);

	var _Input2 = _interopRequireDefault(_Input);

	var _compat = __webpack_require__(50);

	var _compat2 = _interopRequireDefault(_compat);

	var _localizers = __webpack_require__(17);

	var _propTypes3 = __webpack_require__(43);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _createReactClass2.default)({

	  displayName: 'DateTimePickerInput',

	  propTypes: {
	    format: _propTypes4.default.dateFormat.isRequired,
	    editing: _propTypes2.default.bool,
	    editFormat: _propTypes4.default.dateFormat,
	    parse: _propTypes2.default.func.isRequired,

	    value: _propTypes2.default.instanceOf(Date),
	    onChange: _propTypes2.default.func.isRequired,
	    culture: _propTypes2.default.string
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var value = nextProps.value,
	        editing = nextProps.editing,
	        editFormat = nextProps.editFormat,
	        format = nextProps.format,
	        culture = nextProps.culture;


	    this.setState({
	      textValue: formatDate(value, editing && editFormat ? editFormat : format, culture)
	    });
	  },
	  getInitialState: function getInitialState() {
	    var _props = this.props,
	        value = _props.value,
	        editing = _props.editing,
	        editFormat = _props.editFormat,
	        format = _props.format,
	        culture = _props.culture;


	    return {
	      textValue: formatDate(value, editing && editFormat ? editFormat : format, culture)
	    };
	  },
	  render: function render() {
	    var _props2 = this.props,
	        disabled = _props2.disabled,
	        readOnly = _props2.readOnly;
	    var textValue = this.state.textValue;


	    var props = _3.default.omitOwnProps(this);

	    return _react2.default.createElement(_Input2.default, _extends({}, props, {
	      type: 'text',
	      value: textValue,
	      disabled: disabled,
	      readOnly: readOnly,
	      onChange: this.handleChange,
	      onBlur: this.handleBlur
	    }));
	  },
	  handleChange: function handleChange(_ref) {
	    var value = _ref.target.value;

	    this._needsFlush = true;
	    this.setState({ textValue: value });
	  },
	  handleBlur: function handleBlur(event) {
	    var _props3 = this.props,
	        format = _props3.format,
	        culture = _props3.culture,
	        parse = _props3.parse,
	        onChange = _props3.onChange,
	        onBlur = _props3.onBlur;


	    onBlur && onBlur(event);

	    if (this._needsFlush) {
	      var date = parse(event.target.value);

	      this._needsFlush = false;
	      onChange(date, formatDate(date, format, culture));
	    }
	  },
	  focus: function focus() {
	    _compat2.default.findDOMNode(this).focus();
	  }
	});


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
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _desc, _value, _obj;

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _classnames = __webpack_require__(37);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	var _compat = __webpack_require__(50);

	var _compat2 = _interopRequireDefault(_compat);

	var _propTypes3 = __webpack_require__(43);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

	var _uncontrollable = __webpack_require__(61);

	var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

	var _constants = __webpack_require__(86);

	var _repeater = __webpack_require__(97);

	var _repeater2 = _interopRequireDefault(_repeater);

	var _localizers = __webpack_require__(17);

	var _NumberInput = __webpack_require__(98);

	var _NumberInput2 = _interopRequireDefault(_NumberInput);

	var _Button = __webpack_require__(41);

	var _Button2 = _interopRequireDefault(_Button);

	var _interaction = __webpack_require__(55);

	var _widgetHelpers = __webpack_require__(54);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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

	var format = function format(props) {
	  return _localizers.number.getFormat('default', props.format);
	};

	var propTypes = {

	  // -- controlled props -----------
	  value: _propTypes2.default.number,
	  onChange: _propTypes2.default.func,
	  //------------------------------------

	  min: _propTypes2.default.number,
	  max: _propTypes2.default.number,
	  step: _propTypes2.default.number,

	  precision: _propTypes2.default.number,

	  culture: _propTypes2.default.string,

	  format: _propTypes4.default.numberFormat,

	  name: _propTypes2.default.string,

	  parse: _propTypes2.default.func,

	  autoFocus: _propTypes2.default.bool,
	  disabled: _propTypes4.default.disabled,
	  readOnly: _propTypes4.default.readOnly,

	  messages: _propTypes2.default.shape({
	    increment: _propTypes2.default.string,
	    decrement: _propTypes2.default.string
	  }),

	  placeholder: _propTypes2.default.string
	};

	var NumberPicker = (0, _createReactClass2.default)((_obj = {

	  displayName: 'NumberPicker',

	  mixins: [__webpack_require__(64), __webpack_require__(66), __webpack_require__(73), __webpack_require__(74)({
	    willHandle: function willHandle(focused) {
	      if (focused) this.focus();
	    }
	  })],

	  propTypes: propTypes,

	  getDefaultProps: function getDefaultProps() {
	    return {
	      value: null,
	      open: false,

	      min: -Infinity,
	      max: Infinity,
	      step: 1,

	      messages: {
	        increment: 'increment value',
	        decrement: 'decrement value'
	      }
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      focused: false,
	      active: false
	    };
	  },
	  render: function render() {
	    var _this = this;

	    var _$omitOwnProps = _3.default.omitOwnProps(this),
	        className = _$omitOwnProps.className,
	        onKeyPress = _$omitOwnProps.onKeyPress,
	        onKeyUp = _$omitOwnProps.onKeyUp,
	        props = _objectWithoutProperties(_$omitOwnProps, ['className', 'onKeyPress', 'onKeyUp']);

	    var val = this.constrainValue(this.props.value);

	    return _react2.default.createElement(
	      'div',
	      _extends({}, props, {
	        ref: 'element',
	        onKeyDown: this._keyDown,
	        onFocus: this.handleFocus,
	        onBlur: this.handleBlur,
	        tabIndex: '-1',
	        className: (0, _classnames2.default)(className, 'rw-numberpicker', 'rw-widget', {
	          'rw-state-focus': this.state.focused,
	          'rw-state-disabled': this.props.disabled,
	          'rw-state-readonly': this.props.readOnly,
	          'rw-rtl': this.isRtl()
	        }) }),
	      _react2.default.createElement(
	        'span',
	        { className: 'rw-select' },
	        _react2.default.createElement(_Button2.default, {
	          icon: 'caret-up',
	          onClick: this.handleFocus,
	          label: this.props.messages.increment,
	          active: this.state.active === _constants.directions.UP,
	          disabled: val === this.props.max || this.props.disabled,
	          onMouseUp: function onMouseUp() {
	            return _this.handleMouseUp(_constants.directions.UP);
	          },
	          onMouseDown: function onMouseDown() {
	            return _this.handleMouseDown(_constants.directions.UP);
	          },
	          onMouseLeave: function onMouseLeave() {
	            return _this.handleMouseUp(_constants.directions.UP);
	          }
	        }),
	        _react2.default.createElement(_Button2.default, {
	          icon: 'caret-down',
	          onClick: this.handleFocus,
	          label: this.props.messages.decrement,
	          active: this.state.active === _constants.directions.DOWN,
	          disabled: val === this.props.min || this.props.disabled,
	          onMouseUp: function onMouseUp() {
	            return _this.handleMouseUp(_constants.directions.DOWN);
	          },
	          onMouseDown: function onMouseDown() {
	            return _this.handleMouseDown(_constants.directions.DOWN);
	          },
	          onMouseLeave: function onMouseLeave() {
	            return _this.handleMouseUp(_constants.directions.DOWN);
	          }
	        })
	      ),
	      _react2.default.createElement(_NumberInput2.default, {
	        ref: 'input',
	        tabIndex: props.tabIndex,
	        placeholder: this.props.placeholder,
	        value: val,
	        autoFocus: this.props.autoFocus,
	        editing: this.state.focused,
	        format: this.props.format,
	        parse: this.props.parse,
	        name: this.props.name,
	        role: 'spinbutton',
	        min: this.props.min,
	        'aria-valuenow': val,
	        'aria-valuemin': isFinite(this.props.min) ? this.props.min : null,
	        'aria-valuemax': isFinite(this.props.max) ? this.props.max : null,
	        'aria-disabled': this.props.disabled,
	        'aria-readonly': this.props.readonly,
	        disabled: this.props.disabled,
	        readOnly: this.props.readOnly,
	        onChange: this.change,
	        onKeyPress: onKeyPress,
	        onKeyUp: onKeyUp })
	    );
	  },
	  handleMouseDown: function handleMouseDown(dir) {
	    var method = dir === _constants.directions.UP ? this.increment : this.decrement;

	    this.setState({ active: dir });

	    var val = method.call(this);

	    if (!(dir === _constants.directions.UP && val === this.props.max || dir === _constants.directions.DOWN && val === this.props.min)) {
	      if (!this._cancelRepeater) this._cancelRepeater = (0, _repeater2.default)(this.handleMouseDown.bind(null, dir));
	    } else this.handleMouseUp();
	  },
	  handleMouseUp: function handleMouseUp() {
	    this.setState({ active: false });
	    this._cancelRepeater && this._cancelRepeater();
	    this._cancelRepeater = null;
	  },
	  _keyDown: function _keyDown(e) {
	    var key = e.key;

	    (0, _widgetHelpers.notify)(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (key === 'End' && isFinite(this.props.max)) this.change(this.props.max);else if (key === 'Home' && isFinite(this.props.min)) this.change(this.props.min);else if (key === 'ArrowDown') {
	      e.preventDefault();
	      this.decrement();
	    } else if (key === 'ArrowUp') {
	      e.preventDefault();
	      this.increment();
	    }
	  },
	  focus: function focus() {
	    _compat2.default.findDOMNode(this.refs.input).focus();
	  },
	  increment: function increment() {
	    return this.step(this.props.step);
	  },
	  decrement: function decrement() {
	    return this.step(-this.props.step);
	  },
	  step: function step(amount) {
	    var value = (this.props.value || 0) + amount;

	    var decimals = this.props.precision != null ? this.props.precision : _localizers.number.precision(format(this.props));

	    this.change(decimals != null ? round(value, decimals) : value);

	    return value;
	  },
	  change: function change(val) {
	    val = this.constrainValue(val);

	    if (this.props.value !== val) (0, _widgetHelpers.notify)(this.props.onChange, val);
	  },
	  constrainValue: function constrainValue(value) {
	    var max = this.props.max == null ? Infinity : this.props.max,
	        min = this.props.min == null ? -Infinity : this.props.min;

	    if (value == null || value === '') return null;

	    return Math.max(Math.min(value, max), min);
	  }
	}, (_applyDecoratedDescriptor(_obj, 'handleMouseDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleMouseDown'), _obj), _applyDecoratedDescriptor(_obj, 'handleMouseUp', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleMouseUp'), _obj), _applyDecoratedDescriptor(_obj, '_keyDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, '_keyDown'), _obj)), _obj));

	exports.default = (0, _uncontrollable2.default)(NumberPicker, { value: 'onChange' }, ['focus']);

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
/* 97 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.default = Repeater;
	// my tests in ie11/chrome/FF indicate that keyDown repeats
	// at about 35ms+/- 5ms after an initial 500ms delay. callback fires on the leading edge
	function Repeater(callback) {
	  var id,
	      cancel = function cancel() {
	    return clearInterval(id);
	  };

	  id = setInterval(function () {
	    cancel();
	    id = setInterval(callback, 35);
	    callback(); //fire after everything in case the user cancels on the first call
	  }, 500);

	  return cancel;
	}
	module.exports = exports['default'];

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	var _propTypes3 = __webpack_require__(43);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

	var _localizers = __webpack_require__(17);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getFormat = function getFormat(props) {
	  return _localizers.number.getFormat('default', props.format);
	};

	var propTypes = {
	  value: _propTypes2.default.number,
	  editing: _propTypes2.default.bool,
	  placeholder: _propTypes2.default.string,

	  format: _propTypes4.default.numberFormat,

	  parse: _propTypes2.default.func,
	  culture: _propTypes2.default.string,

	  min: _propTypes2.default.number,

	  onChange: _propTypes2.default.func.isRequired,
	  onKeyDown: _propTypes2.default.func
	};

	exports.default = (0, _createReactClass2.default)({

	  displayName: 'NumberPickerInput',

	  propTypes: propTypes,

	  getDefaultProps: function getDefaultProps() {
	    return {
	      value: null,
	      editing: false
	    };
	  },
	  getDefaultState: function getDefaultState() {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

	    var value = props.value,
	        decimal = _localizers.number.decimalChar(null, props.culture),
	        format = getFormat(props);

	    if (value == null || isNaN(props.value)) value = '';else value = props.editing ? ('' + value).replace('.', decimal) : _localizers.number.format(value, format, props.culture);

	    return {
	      stringValue: '' + value
	    };
	  },
	  getInitialState: function getInitialState() {
	    return this.getDefaultState();
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState(this.getDefaultState(nextProps));
	  },
	  render: function render() {
	    var value = this.state.stringValue;
	    var props = _3.default.omitOwnProps(this);

	    return _react2.default.createElement('input', _extends({}, props, {
	      type: 'text',
	      className: 'rw-input',
	      onChange: this._change,
	      onBlur: this._finish,
	      'aria-disabled': this.props.disabled,
	      'aria-readonly': this.props.readOnly,
	      disabled: this.props.disabled,
	      readOnly: this.props.readOnly,
	      placeholder: this.props.placeholder,
	      value: value
	    }));
	  },
	  _change: function _change(e) {
	    var val = e.target.value,
	        number = this._parse(e.target.value);

	    var isIntermediate = this.isIntermediateValue(number, val);

	    if (val == null || val.trim() === '') {
	      this.current('');
	      return this.props.onChange(null);
	    }

	    if (!isIntermediate) {
	      if (number !== this.props.value) {
	        return this.props.onChange(number);
	      }
	    } else {
	      this.current(e.target.value);
	    }
	  },
	  _finish: function _finish() {
	    var str = this.state.stringValue,
	        number = this._parse(str);

	    // if number is below the min
	    // we need to flush low values and decimal stops, onBlur means i'm done inputing
	    if (this.isIntermediateValue(number, str)) {
	      if (isNaN(number)) {
	        number = null;
	      }
	      this.props.onChange(number);
	    }
	  },
	  _parse: function _parse(strVal) {
	    var culture = this.props.culture,
	        delimChar = _localizers.number.decimalChar(null, culture),
	        userParse = this.props.parse;

	    if (userParse) return userParse(strVal, culture);

	    strVal = strVal.replace(delimChar, '.');
	    strVal = parseFloat(strVal);

	    return strVal;
	  },
	  isIntermediateValue: function isIntermediateValue(num, str) {
	    return !!(num < this.props.min || this.isSign(str) || this.isAtDelimiter(num, str) || this.isPaddedZeros(str));
	  },
	  isSign: function isSign(val) {
	    return (val || '').trim() === '-';
	  },
	  isPaddedZeros: function isPaddedZeros(str) {
	    var localeChar = _localizers.number.decimalChar(null, this.props.culture);

	    var _str$split = str.split(localeChar),
	        _ = _str$split[0],
	        decimals = _str$split[1];

	    return !!(decimals && decimals.match(/0+$/));
	  },
	  isAtDelimiter: function isAtDelimiter(num, str) {
	    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props;

	    var localeChar = _localizers.number.decimalChar(null, props.culture),
	        lastIndex = str.length - 1,
	        char;

	    if (str.length < 1) return false;

	    char = str[lastIndex];

	    return !!(char === localeChar && str.indexOf(char) === lastIndex);
	  },
	  isValid: function isValid(num) {
	    if (typeof num !== 'number' || isNaN(num)) return false;
	    return num >= this.props.min;
	  },


	  //this intermediate state is for when one runs into the decimal or are typing the number
	  current: function current(stringValue) {
	    this.setState({ stringValue: stringValue });
	  }
	});
	module.exports = exports['default'];

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _desc, _value, _obj;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _classnames = __webpack_require__(37);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	var _uncontrollable = __webpack_require__(61);

	var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

	var _Widget = __webpack_require__(38);

	var _Widget2 = _interopRequireDefault(_Widget);

	var _Popup = __webpack_require__(46);

	var _Popup2 = _interopRequireDefault(_Popup);

	var _MultiselectInput = __webpack_require__(100);

	var _MultiselectInput2 = _interopRequireDefault(_MultiselectInput);

	var _MultiselectTagList = __webpack_require__(101);

	var _MultiselectTagList2 = _interopRequireDefault(_MultiselectTagList);

	var _propTypes3 = __webpack_require__(43);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

	var _List = __webpack_require__(52);

	var _List2 = _interopRequireDefault(_List);

	var _ListGroupable = __webpack_require__(58);

	var _ListGroupable2 = _interopRequireDefault(_ListGroupable);

	var _validateListInterface = __webpack_require__(60);

	var _validateListInterface2 = _interopRequireDefault(_validateListInterface);

	var _dataHelpers = __webpack_require__(45);

	var _interaction = __webpack_require__(55);

	var _widgetHelpers = __webpack_require__(54);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	var compatCreate = function compatCreate(props, msgs) {
	  return typeof msgs.createNew === 'function' ? msgs.createNew(props) : [_react2.default.createElement(
	    'strong',
	    { key: 'dumb' },
	    '"' + props.searchTerm + '"'
	  ), ' ' + msgs.createNew];
	};

	var splat = _3.default.splat;


	var propTypes = _extends({}, _Popup2.default.propTypes, {

	  data: _propTypes2.default.array,
	  //-- controlled props --
	  value: _propTypes2.default.array,
	  onChange: _propTypes2.default.func,

	  searchTerm: _propTypes2.default.string,
	  onSearch: _propTypes2.default.func,

	  open: _propTypes2.default.bool,
	  onToggle: _propTypes2.default.func,
	  //-------------------------------------------

	  valueField: _propTypes2.default.string,
	  textField: _propTypes4.default.accessor,

	  tagComponent: _propTypes4.default.elementType,
	  itemComponent: _propTypes4.default.elementType,
	  listComponent: _propTypes4.default.elementType,

	  groupComponent: _propTypes4.default.elementType,
	  groupBy: _propTypes4.default.accessor,

	  createComponent: _propTypes4.default.elementType,

	  onSelect: _propTypes2.default.func,
	  onCreate: _propTypes2.default.oneOfType([_propTypes2.default.oneOf([false]), _propTypes2.default.func]),

	  inputSize: _propTypes2.default.func,

	  busy: _propTypes2.default.bool,
	  dropUp: _propTypes2.default.bool,

	  placeholder: _propTypes2.default.string,

	  autoFocus: _propTypes2.default.bool,
	  disabled: _propTypes4.default.disabled.acceptsArray,
	  readOnly: _propTypes4.default.readOnly.acceptsArray,

	  messages: _propTypes2.default.shape({
	    open: _propTypes4.default.message,
	    emptyList: _propTypes4.default.message,
	    emptyFilter: _propTypes4.default.message,
	    createNew: _propTypes4.default.message
	  })
	});

	var Multiselect = (0, _createReactClass2.default)((_obj = {

	  displayName: 'Multiselect',

	  mixins: [__webpack_require__(64), __webpack_require__(67), __webpack_require__(68), __webpack_require__(73), __webpack_require__(74)({
	    willHandle: function willHandle(focused) {
	      focused && this.focus();
	    },
	    didHandle: function didHandle(focused) {
	      if (!focused) this.close();

	      if (!focused && this.refs.tagList) this.setState({ focusedTag: null });

	      if (focused && !this.props.open) this.open();
	    }
	  }), __webpack_require__(57)('input', function (key, id) {
	    var myKey = this.props.ariaActiveDescendantKey;


	    var createIsActive = (!this._data().length || this.state.focusedItem === null) && key === myKey;

	    var tagIsActive = this.state.focusedTag != null && key === 'taglist';
	    var listIsActive = this.state.focusedTag == null && key === 'list';

	    if (createIsActive || tagIsActive || listIsActive) return id;
	  })],

	  propTypes: propTypes,

	  getDefaultProps: function getDefaultProps() {
	    return {
	      data: [],
	      filter: 'startsWith',
	      value: [],
	      open: false,
	      searchTerm: '',
	      ariaActiveDescendantKey: 'multiselect',
	      messages: {
	        createNew: '(create new tag)',
	        emptyList: 'There are no items in this list',
	        emptyFilter: 'The filter returned no results',
	        tagsLabel: 'selected items',
	        selectedItems: 'selected items',
	        noneSelected: 'no selected items',
	        removeLabel: 'remove selected item'
	      }
	    };
	  },
	  getInitialState: function getInitialState() {
	    var _props = this.props,
	        data = _props.data,
	        value = _props.value,
	        valueField = _props.valueField,
	        searchTerm = _props.searchTerm,
	        dataItems = splat(value).map(function (item) {
	      return (0, _dataHelpers.dataItem)(data, item, valueField);
	    }),
	        processedData = this.process(data, dataItems, searchTerm);


	    return {
	      focusedTag: null,
	      focusedItem: processedData[0],
	      processedData: processedData,
	      dataItems: dataItems
	    };
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    this.ariaActiveDescendant((0, _widgetHelpers.instanceId)(this, '__createlist_option'));

	    this.refs.list && (0, _validateListInterface2.default)(this.refs.list);
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var data = nextProps.data,
	        value = nextProps.value,
	        valueField = nextProps.valueField,
	        searchTerm = nextProps.searchTerm,
	        values = _3.default.splat(value),
	        current = this.state.focusedItem,
	        items = this.process(data, values, searchTerm);

	    this.setState({
	      processedData: items,
	      focusedItem: items.indexOf(current) === -1 ? items[0] : current,
	      dataItems: values.map(function (item) {
	        return (0, _dataHelpers.dataItem)(data, item, valueField);
	      })
	    });
	  },
	  renderCreateItem: function renderCreateItem(id, messages) {
	    var _this = this;

	    var searchTerm = this.props.searchTerm;
	    var focusedItem = this.state.focusedItem;


	    var createIsFocused = !this._data().length || focusedItem === null;
	    var optionID = (0, _widgetHelpers.instanceId)(this, '__createlist_option');

	    return _react2.default.createElement(
	      'ul',
	      {
	        id: id,
	        role: 'listbox',
	        className: 'rw-list rw-multiselect-create-tag'
	      },
	      _react2.default.createElement(
	        'li',
	        {
	          id: optionID,
	          role: 'option',
	          onClick: function onClick() {
	            return _this.handleCreate(searchTerm);
	          },
	          className: (0, _classnames2.default)('rw-list-option', 'rw-create-list-option', createIsFocused && 'rw-state-focus')
	        },
	        compatCreate(this.props, messages)
	      )
	    );
	  },
	  renderInput: function renderInput(owns) {
	    var _props2 = this.props,
	        searchTerm = _props2.searchTerm,
	        maxLength = _props2.maxLength,
	        tabIndex = _props2.tabIndex,
	        busy = _props2.busy,
	        open = _props2.open,
	        disabled = _props2.disabled,
	        readOnly = _props2.readOnly;


	    return _react2.default.createElement(_MultiselectInput2.default, {
	      ref: 'input',
	      tabIndex: tabIndex || 0,
	      role: 'listbox',
	      'aria-expanded': !!open,
	      'aria-busy': !!busy,
	      autoFocus: this.props.autoFocus,
	      'aria-owns': owns,
	      'aria-haspopup': true,
	      value: searchTerm,
	      maxLength: maxLength,
	      disabled: disabled === true,
	      readOnly: readOnly === true,
	      placeholder: this.getPlaceholder(),
	      inputSize: this.props.inputSize,
	      onKeyDown: this.handleSearchKeyDown,
	      onKeyUp: this.handleSearchKeyUp,
	      onChange: this.handleInputChange,
	      onClick: this.handleInputInteraction,
	      onTouchEnd: this.handleInputInteraction
	    });
	  },
	  renderList: function renderList(List, id, messages) {
	    var _props3 = this.props,
	        open = _props3.open,
	        disabled = _props3.disabled,
	        readOnly = _props3.readOnly;
	    var focusedItem = this.state.focusedItem;


	    var listProps = _3.default.pickProps(this.props, List);
	    var items = this._data();

	    return _react2.default.createElement(List, _extends({ ref: 'list',
	      key: 0
	    }, listProps, {
	      readOnly: readOnly,
	      disabled: disabled,
	      id: id,
	      'aria-live': 'polite',
	      'aria-labelledby': (0, _widgetHelpers.instanceId)(this),
	      'aria-hidden': !open,
	      ariaActiveDescendantKey: 'list',
	      data: items,
	      focused: focusedItem,
	      onSelect: this.handleSelect,
	      onMove: this._scrollTo,
	      messages: {
	        emptyList: this._lengthWithoutValues ? messages.emptyFilter : messages.emptyList
	      }
	    }));
	  },
	  renderNotificationArea: function renderNotificationArea(id, messages) {
	    var textField = this.props.textField;
	    var _state = this.state,
	        focused = _state.focused,
	        dataItems = _state.dataItems;


	    return _react2.default.createElement(
	      'span',
	      {
	        id: id,
	        role: 'status',
	        className: 'rw-sr',
	        'aria-live': 'assertive',
	        'aria-atomic': 'true',
	        'aria-relevant': 'additions removals text'
	      },
	      focused && (dataItems.length ? messages.selectedItems + ': ' + dataItems.map(function (item) {
	        return (0, _dataHelpers.dataText)(item, textField);
	      }).join(', ') : messages.noneSelected)
	    );
	  },
	  renderTags: function renderTags(id, messages) {
	    var _props4 = this.props,
	        disabled = _props4.disabled,
	        readOnly = _props4.readOnly,
	        valueField = _props4.valueField,
	        textField = _props4.textField;
	    var _state2 = this.state,
	        focusedTag = _state2.focusedTag,
	        dataItems = _state2.dataItems;


	    var Component = this.props.tagComponent;

	    return _react2.default.createElement(_MultiselectTagList2.default, {
	      ref: 'tagList',
	      id: id,
	      valueField: valueField,
	      textField: textField,
	      'aria-label': messages.tagsLabel,
	      value: dataItems,
	      focused: focusedTag,
	      disabled: disabled,
	      readOnly: readOnly,
	      onDelete: this.handleDelete,
	      valueComponent: Component,
	      ariaActiveDescendantKey: 'taglist'
	    });
	  },
	  render: function render() {
	    var _this2 = this;

	    var _props5 = this.props,
	        className = _props5.className,
	        groupBy = _props5.groupBy,
	        messages = _props5.messages,
	        busy = _props5.busy,
	        dropUp = _props5.dropUp,
	        open = _props5.open,
	        duration = _props5.duration,
	        disabled = _props5.disabled,
	        readOnly = _props5.readOnly,
	        List = _props5.listComponent;
	    var _state3 = this.state,
	        focused = _state3.focused,
	        dataItems = _state3.dataItems;


	    List = List || groupBy && _ListGroupable2.default || _List2.default;

	    var elementProps = _3.default.omitOwnProps(this, List);

	    var shouldRenderTags = !!dataItems.length,
	        shouldRenderPopup = (0, _widgetHelpers.isFirstFocusedRender)(this) || open,
	        shouldShowCreate = this.shouldShowCreate();

	    var tagsID = (0, _widgetHelpers.instanceId)(this, '_taglist'),
	        listID = (0, _widgetHelpers.instanceId)(this, '__listbox'),
	        createID = (0, _widgetHelpers.instanceId)(this, '__createlist'),
	        notifyID = (0, _widgetHelpers.instanceId)(this, '__notify');

	    var inputOwns = listID + ' ' + notifyID + ' ' + (shouldRenderTags ? tagsID : '') + (shouldShowCreate ? createID : '');

	    messages = msgs(messages);

	    return _react2.default.createElement(
	      _Widget2.default,
	      _extends({}, elementProps, {
	        id: (0, _widgetHelpers.instanceId)(this),
	        open: open,
	        dropUp: dropUp,
	        focused: focused,
	        disabled: disabled === true,
	        readOnly: readOnly === true,
	        onKeyDown: this.handleKeyDown,
	        onBlur: this.handleBlur,
	        onFocus: this.handleFocus,
	        onTouchEnd: this.handleFocus,
	        className: (0, _classnames2.default)(className, 'rw-multiselect')
	      }),
	      this.renderNotificationArea(notifyID, messages),
	      _react2.default.createElement(
	        'div',
	        { className: 'rw-multiselect-wrapper' },
	        busy && _react2.default.createElement('span', { className: 'rw-i rw-loading' }),
	        shouldRenderTags && this.renderTags(tagsID, messages),
	        this.renderInput(inputOwns)
	      ),
	      shouldRenderPopup && _react2.default.createElement(
	        _Popup2.default,
	        {
	          dropUp: dropUp,
	          open: open,
	          duration: duration,
	          onOpening: function onOpening() {
	            return _this2.refs.list.forceUpdate();
	          }
	        },
	        _react2.default.createElement(
	          'div',
	          null,
	          this.renderList(List, listID, messages),
	          shouldShowCreate && this.renderCreateItem(createID, messages)
	        )
	      )
	    );
	  },
	  _data: function _data() {
	    return this.state.processedData;
	  },
	  handleDelete: function handleDelete(value) {
	    this.focus();
	    this.change(this.state.dataItems.filter(function (d) {
	      return d !== value;
	    }));
	  },
	  handleSearchKeyDown: function handleSearchKeyDown(e) {
	    if (e.key === 'Backspace' && e.target.value && !this._deletingText) this._deletingText = true;
	  },
	  handleSearchKeyUp: function handleSearchKeyUp(e) {
	    if (e.key === 'Backspace' && this._deletingText) this._deletingText = false;
	  },
	  handleInputChange: function handleInputChange(e) {
	    (0, _widgetHelpers.notify)(this.props.onSearch, [e.target.value]);
	    this.open();
	  },
	  handleInputInteraction: function handleInputInteraction() {
	    this.open();
	  },
	  handleSelect: function handleSelect(data) {
	    if (data === undefined) {
	      if (this.props.onCreate) this.handleCreate(this.props.searchTerm);

	      return;
	    }
	    (0, _widgetHelpers.notify)(this.props.onSelect, data);
	    this.change(this.state.dataItems.concat(data));

	    this.close();
	    this.focus();
	  },
	  handleCreate: function handleCreate(tag) {
	    if (tag.trim() === '') return;

	    (0, _widgetHelpers.notify)(this.props.onCreate, tag);
	    this.props.searchTerm && (0, _widgetHelpers.notify)(this.props.onSearch, ['']);

	    this.close();
	    this.focus();
	  },
	  handleKeyDown: function handleKeyDown(e) {
	    var key = e.key,
	        keyCode = e.keyCode,
	        altKey = e.altKey,
	        ctrlKey = e.ctrlKey,
	        noSearch = !this.props.searchTerm && !this._deletingText,
	        isOpen = this.props.open;
	    var _state4 = this.state,
	        focusedTag = _state4.focusedTag,
	        focusedItem = _state4.focusedItem;
	    var _refs = this.refs,
	        list = _refs.list,
	        tagList = _refs.tagList;

	    var nullTag = { focusedTag: null };

	    (0, _widgetHelpers.notify)(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (key === 'ArrowDown') {
	      var next = list.next(focusedItem),
	          creating = this.shouldShowCreate() && focusedItem === next || focusedItem === null;

	      next = creating ? null : next;

	      e.preventDefault();
	      if (isOpen) this.setState(_extends({ focusedItem: next }, nullTag));else this.open();
	    } else if (key === 'ArrowUp') {
	      var prev = focusedItem === null ? list.last() : list.prev(focusedItem);

	      e.preventDefault();

	      if (altKey) this.close();else if (isOpen) this.setState(_extends({ focusedItem: prev }, nullTag));
	    } else if (key === 'End') {
	      e.preventDefault();
	      if (isOpen) this.setState(_extends({ focusedItem: list.last() }, nullTag));else tagList && this.setState({ focusedTag: tagList.last() });
	    } else if (key === 'Home') {
	      e.preventDefault();
	      if (isOpen) this.setState(_extends({ focusedItem: list.first() }, nullTag));else tagList && this.setState({ focusedTag: tagList.first() });
	    } else if (isOpen && keyCode === 13) {
	      // using keyCode to ignore enter for japanese IME
	      e.preventDefault();
	      ctrlKey && this.props.onCreate || focusedItem === null ? this.handleCreate(this.props.searchTerm) : this.handleSelect(this.state.focusedItem);
	    } else if (key === 'Escape') isOpen ? this.close() : tagList && this.setState(nullTag);else if (noSearch && key === 'ArrowLeft') tagList && this.setState({ focusedTag: tagList.prev(focusedTag) });else if (noSearch && key === 'ArrowRight') tagList && this.setState({ focusedTag: tagList.next(focusedTag) });else if (noSearch && key === 'Delete') tagList && tagList.remove(focusedTag);else if (noSearch && key === 'Backspace') tagList && tagList.removeNext();
	  },
	  change: function change(data) {
	    (0, _widgetHelpers.notify)(this.props.onChange, [data]);
	    (0, _widgetHelpers.notify)(this.props.onSearch, ['']);
	  },
	  focus: function focus() {
	    this.refs.input && this.refs.input.focus();
	  },
	  open: function open() {
	    if (!this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, true);
	  },
	  close: function close() {
	    (0, _widgetHelpers.notify)(this.props.onToggle, false);
	  },
	  toggle: function toggle() {
	    this.props.open ? this.close() : this.open();
	  },
	  process: function process(data, values, searchTerm) {
	    var valueField = this.props.valueField;

	    var items = data.filter(function (i) {
	      return !values.some(function (v) {
	        return (0, _dataHelpers.valueMatcher)(i, v, valueField);
	      });
	    });

	    this._lengthWithoutValues = items.length;

	    if (searchTerm) items = this.filter(items, searchTerm);

	    return items;
	  },
	  shouldShowCreate: function shouldShowCreate() {
	    var _props6 = this.props,
	        textField = _props6.textField,
	        searchTerm = _props6.searchTerm,
	        onCreate = _props6.onCreate,
	        caseSensitive = _props6.caseSensitive;


	    if (!onCreate || !searchTerm) return false;

	    var lower = function lower(text) {
	      return caseSensitive ? text : text.toLowerCase();
	    };
	    var eq = function eq(v) {
	      return lower((0, _dataHelpers.dataText)(v, textField)) === lower(searchTerm);
	    };

	    // if there is an exact match on textFields: "john" => { name: "john" }, don't show
	    return !this._data().some(eq) && !this.state.dataItems.some(eq);
	  },
	  getPlaceholder: function getPlaceholder() {
	    return (this.props.value || []).length ? '' : this.props.placeholder || '';
	  }
	}, (_applyDecoratedDescriptor(_obj, 'handleInputInteraction', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleInputInteraction'), _obj), _applyDecoratedDescriptor(_obj, 'handleSelect', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleSelect'), _obj), _applyDecoratedDescriptor(_obj, 'handleCreate', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleCreate'), _obj), _applyDecoratedDescriptor(_obj, 'handleKeyDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleKeyDown'), _obj), _applyDecoratedDescriptor(_obj, 'change', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'change'), _obj)), _obj));

	function msgs(msgs) {
	  return _extends({
	    createNew: '(create new tag)',
	    emptyList: 'There are no items in this list',
	    emptyFilter: 'The filter returned no results',
	    tagsLabel: 'selected items',
	    selectedItems: 'selected items',
	    removeLabel: 'remove selected item'
	  }, msgs);
	}

	exports.default = (0, _uncontrollable2.default)(Multiselect, { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' }, ['focus']);
	module.exports = exports['default'];

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _class, _temp;

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	var _compat = __webpack_require__(50);

	var _compat2 = _interopRequireDefault(_compat);

	var _propTypes3 = __webpack_require__(43);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

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
	        placeholder = _props.placeholder,
	        onChange = _props.onChange,
	        value = _props.value,
	        props = _objectWithoutProperties(_props, ['disabled', 'readOnly', 'placeholder', 'onChange', 'value']);

	    var size = props.inputSize ? props.inputSize(value || placeholder) : Math.max((value || placeholder).length, 1) + 1;

	    var elementProps = _3.default.omitOwnProps(this);

	    return _react2.default.createElement('input', _extends({}, elementProps, {
	      size: size,
	      className: 'rw-input',
	      autoComplete: 'off',
	      'aria-disabled': disabled,
	      'aria-readonly': readOnly,
	      disabled: disabled,
	      readOnly: readOnly,
	      placeholder: placeholder,
	      onChange: onChange,
	      value: value
	    }));
	  };

	  MultiselectInput.prototype.focus = function focus() {
	    _compat2.default.findDOMNode(this).focus();
	  };

	  return MultiselectInput;
	}(_react2.default.Component), _class.propTypes = {
	  value: _propTypes2.default.string,
	  placeholder: _propTypes2.default.string,
	  maxLength: _propTypes2.default.number,
	  inputSize: _propTypes2.default.func,
	  onChange: _propTypes2.default.func.isRequired,

	  disabled: _propTypes4.default.disabled,
	  readOnly: _propTypes4.default.readOnly
	}, _temp);
	exports.default = MultiselectInput;
	module.exports = exports['default'];

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	var _classnames = __webpack_require__(37);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _propTypes3 = __webpack_require__(43);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

	var _widgetHelpers = __webpack_require__(54);

	var _dataHelpers = __webpack_require__(45);

	var _interaction = __webpack_require__(55);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var optionId = function optionId(id, idx) {
	  return id + '__option__' + idx;
	};

	exports.default = (0, _createReactClass2.default)({
	  displayName: 'MultiselectTagList',


	  mixins: [__webpack_require__(66), __webpack_require__(57)()],

	  propTypes: {
	    value: _propTypes2.default.array,
	    focused: _propTypes2.default.number,

	    valueField: _propTypes2.default.string,
	    textField: _propTypes4.default.accessor,

	    onDelete: _propTypes2.default.func.isRequired,
	    valueComponent: _propTypes2.default.func,

	    disabled: _propTypes4.default.disabled.acceptsArray,
	    readOnly: _propTypes4.default.readOnly.acceptsArray
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      ariaActiveDescendantKey: 'taglist'
	    };
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    var focused = this.props.focused,
	        activeId = optionId((0, _widgetHelpers.instanceId)(this), focused);


	    this.ariaActiveDescendant(focused == null || (0, _interaction.isDisabledItem)(focused, this.props) ? null : activeId);
	  },
	  render: function render() {
	    var _this = this;

	    var _props = this.props,
	        focused = _props.focused,
	        value = _props.value,
	        textField = _props.textField,
	        ValueComponent = _props.valueComponent;


	    var id = (0, _widgetHelpers.instanceId)(this);
	    var props = _3.default.omitOwnProps(this);

	    return _react2.default.createElement(
	      'ul',
	      _extends({}, props, {
	        role: 'listbox',
	        tabIndex: '-1',
	        className: 'rw-multiselect-taglist'
	      }),
	      value.map(function (item, i) {
	        var isDisabled = (0, _interaction.isDisabledItem)(item, _this.props),
	            isReadonly = (0, _interaction.isReadOnlyItem)(item, _this.props),
	            isFocused = !isDisabled && focused === i,
	            currentID = optionId(id, i);

	        return _react2.default.createElement(
	          'li',
	          {
	            key: i,
	            id: currentID,
	            tabIndex: '-1',
	            role: 'option',
	            className: (0, _classnames2.default)({
	              'rw-state-focus': isFocused,
	              'rw-state-disabled': isDisabled,
	              'rw-state-readonly': isReadonly
	            })
	          },
	          ValueComponent ? _react2.default.createElement(ValueComponent, { item: item }) : (0, _dataHelpers.dataText)(item, textField),
	          _react2.default.createElement(
	            'span',
	            {
	              tabIndex: '-1',
	              onClick: !(isDisabled || isReadonly) ? _this._delete.bind(null, item) : undefined,
	              'aria-disabled': isDisabled,
	              'aria-label': 'Unselect',
	              disabled: isDisabled
	            },
	            _react2.default.createElement(
	              'span',
	              { className: 'rw-tag-btn', 'aria-hidden': 'true' },
	              '\xD7'
	            )
	          )
	        );
	      })
	    );
	  },
	  _delete: function _delete(val) {
	    this.props.onDelete(val);
	  },
	  remove: function remove(idx) {
	    var val = this.props.value[idx];

	    if (val && !((0, _interaction.isDisabledItem)(val, this.props) || (0, _interaction.isReadOnlyItem)(val, this.props))) this.props.onDelete(val);
	  },
	  removeNext: function removeNext() {
	    var val = this.props.value[this.props.value.length - 1];

	    if (val && !((0, _interaction.isDisabledItem)(val, this.props) || (0, _interaction.isReadOnlyItem)(val, this.props))) this.props.onDelete(val);
	  },
	  clear: function clear() {
	    this.setState({ focused: null });
	  },
	  first: function first() {
	    var idx = 0,
	        value = this.props.value,
	        l = value.length;

	    while (idx < l && (0, _interaction.isDisabledItem)(value[idx], this.props)) {
	      idx++;
	    }return idx !== l ? idx : null;
	  },
	  last: function last() {
	    var value = this.props.value,
	        idx = value.length - 1;

	    while (idx > -1 && (0, _interaction.isDisabledItem)(value[idx], this.props)) {
	      idx--;
	    }return idx >= 0 ? idx : null;
	  },
	  next: function next(current) {
	    var nextIdx = current + 1,
	        value = this.props.value,
	        l = value.length;

	    while (nextIdx < l && (0, _interaction.isDisabledItem)(nextIdx, this.props)) {
	      nextIdx++;
	    }if (current === null || nextIdx >= l) return null;

	    return nextIdx;
	  },
	  prev: function prev(current) {
	    var nextIdx = current,
	        value = this.props.value;

	    if (nextIdx === null || nextIdx === 0) nextIdx = value.length;

	    nextIdx--;

	    while (nextIdx > -1 && (0, _interaction.isDisabledItem)(value[nextIdx], this.props)) {
	      nextIdx--;
	    }return nextIdx >= 0 ? nextIdx : null;
	  }
	});
	module.exports = exports['default'];

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _desc, _value, _obj;

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(20);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(30);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _2 = __webpack_require__(19);

	var _3 = _interopRequireDefault(_2);

	var _classnames = __webpack_require__(37);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _uncontrollable = __webpack_require__(61);

	var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

	var _compat = __webpack_require__(50);

	var _compat2 = _interopRequireDefault(_compat);

	var _propTypes3 = __webpack_require__(43);

	var _propTypes4 = _interopRequireDefault(_propTypes3);

	var _List = __webpack_require__(52);

	var _List2 = _interopRequireDefault(_List);

	var _ListGroupable = __webpack_require__(58);

	var _ListGroupable2 = _interopRequireDefault(_ListGroupable);

	var _ListOption = __webpack_require__(53);

	var _ListOption2 = _interopRequireDefault(_ListOption);

	var _Widget = __webpack_require__(38);

	var _Widget2 = _interopRequireDefault(_Widget);

	var _validateListInterface = __webpack_require__(60);

	var _validateListInterface2 = _interopRequireDefault(_validateListInterface);

	var _scrollTo2 = __webpack_require__(69);

	var _scrollTo3 = _interopRequireDefault(_scrollTo2);

	var _dataHelpers = __webpack_require__(45);

	var _interaction = __webpack_require__(55);

	var _widgetHelpers = __webpack_require__(54);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	var find = _3.default.find;


	var propTypes = {

	  data: _propTypes2.default.array,
	  value: _propTypes2.default.oneOfType([_propTypes2.default.any, _propTypes2.default.array]),
	  onChange: _propTypes2.default.func,
	  onMove: _propTypes2.default.func,

	  multiple: _propTypes2.default.bool,

	  itemComponent: _propTypes4.default.elementType,
	  listComponent: _propTypes4.default.elementType,

	  valueField: _propTypes2.default.string,
	  textField: _propTypes4.default.accessor,

	  busy: _propTypes2.default.bool,

	  filter: _propTypes2.default.string,
	  delay: _propTypes2.default.number,

	  disabled: _propTypes4.default.disabled.acceptsArray,
	  readOnly: _propTypes4.default.readOnly.acceptsArray,

	  messages: _propTypes2.default.shape({
	    emptyList: _propTypes2.default.string
	  })
	};

	function getFirstValue(props) {
	  var data = props.data,
	      value = props.value,
	      valueField = props.valueField;

	  value = _3.default.splat(value);

	  if (value.length) return find(data, function (d) {
	    return (0, _dataHelpers.dataIndexOf)(value, d, valueField) !== -1;
	  }) || null;

	  return null;
	}

	var SelectList = (0, _createReactClass2.default)((_obj = {
	  displayName: 'SelectList',


	  propTypes: propTypes,

	  mixins: [__webpack_require__(64), __webpack_require__(65), __webpack_require__(73), __webpack_require__(57)(), __webpack_require__(74)({
	    didHandle: function didHandle(focused) {
	      // the rigamarole here is to avoid flicker went clicking an item and
	      // gaining focus at the same time.
	      if (focused !== this.state.focused) {
	        if (!focused) this.setState({ focusedItem: null });else if (focused && !this._clicking) this.setState({
	          focusedItem: getFirstValue(this.props)
	        });
	        this._clicking = false;
	      }
	    }
	  })],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      delay: 250,
	      value: [],
	      data: [],
	      ariaActiveDescendantKey: 'selectlist',
	      messages: {
	        emptyList: 'There are no items in this list'
	      }
	    };
	  },
	  getDefaultState: function getDefaultState(props) {
	    var data = props.data,
	        value = props.value,
	        valueField = props.valueField,
	        multiple = props.multiple;


	    return {
	      dataItems: multiple && _3.default.splat(value).map(function (item) {
	        return (0, _dataHelpers.dataItem)(data, item, valueField);
	      })
	    };
	  },
	  getInitialState: function getInitialState() {
	    var state = this.getDefaultState(this.props);

	    state.ListItem = getListItem(this);

	    return state;
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    return this.setState(this.getDefaultState(nextProps));
	  },
	  componentDidMount: function componentDidMount() {
	    (0, _validateListInterface2.default)(this.refs.list);
	  },
	  render: function render() {
	    var _props = this.props,
	        className = _props.className,
	        tabIndex = _props.tabIndex,
	        busy = _props.busy,
	        groupBy = _props.groupBy,
	        List = _props.listComponent;


	    List = List || groupBy && _ListGroupable2.default || _List2.default;

	    var elementProps = _3.default.omitOwnProps(this, List);
	    var listProps = _3.default.pickProps(this.props, List);

	    var _state = this.state,
	        ListItem = _state.ListItem,
	        focusedItem = _state.focusedItem,
	        focused = _state.focused;


	    var items = this._data();

	    focusedItem = focused && !(0, _interaction.isDisabled)(this.props) && !(0, _interaction.isReadOnly)(this.props) && focusedItem;

	    return _react2.default.createElement(
	      _Widget2.default,
	      _extends({}, elementProps, {
	        onBlur: this.handleBlur,
	        onFocus: this.handleFocus,
	        onKeyDown: this.handleKeyDown,
	        onKeyPress: this.handleKeyPress,
	        disabled: (0, _interaction.isDisabled)(this.props),
	        readOnly: (0, _interaction.isReadOnly)(this.props),
	        role: 'radiogroup',
	        'aria-busy': !!busy,
	        className: (0, _classnames2.default)(className, 'rw-selectlist', busy && 'rw-loading-mask')
	      }),
	      _react2.default.createElement(List, _extends({}, listProps, {
	        ref: 'list',
	        role: 'radiogroup',
	        tabIndex: tabIndex || '0',
	        id: (0, _widgetHelpers.instanceId)(this, '_listbox'),
	        data: items,
	        focused: focusedItem,
	        optionComponent: ListItem,
	        itemComponent: this.props.itemComponent,
	        onMove: this._scrollTo
	      }))
	    );
	  },
	  _scrollTo: function _scrollTo(selected, list) {
	    var handler = this.props.onMove;

	    if (handler) handler(selected, list);else {
	      this._scrollCancel && this._scrollCancel();
	      // default behavior is to scroll the whole page not just the widget
	      this._scrollCancel = (0, _scrollTo3.default)(selected);
	    }
	  },
	  handleKeyDown: function handleKeyDown(e) {
	    var _this = this;

	    var key = e.key,
	        _props2 = this.props,
	        valueField = _props2.valueField,
	        multiple = _props2.multiple,
	        list = this.refs.list,
	        focusedItem = this.state.focusedItem;


	    var change = function change(item) {
	      if (item) _this.handleChange(item, multiple ? !(0, _interaction.contains)(item, _this._values(), valueField) // toggle value
	      : true);
	    };

	    (0, _widgetHelpers.notify)(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (key === 'End') {
	      e.preventDefault();
	      focusedItem = list.last();

	      this.setState({ focusedItem: focusedItem });
	      if (!multiple) change(focusedItem);
	    } else if (key === 'Home') {
	      e.preventDefault();
	      focusedItem = list.first();

	      this.setState({ focusedItem: focusedItem });
	      if (!multiple) change(focusedItem);
	    } else if (key === 'Enter' || key === ' ') {
	      e.preventDefault();
	      change(focusedItem);
	    } else if (key === 'ArrowDown' || key === 'ArrowRight') {
	      e.preventDefault();
	      focusedItem = list.next(focusedItem);

	      this.setState({ focusedItem: focusedItem });
	      if (!multiple) change(focusedItem);
	    } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
	      e.preventDefault();
	      focusedItem = list.prev(focusedItem);

	      this.setState({ focusedItem: focusedItem });
	      if (!multiple) change(focusedItem);
	    } else if (multiple && e.keyCode === 65 && e.ctrlKey) {
	      e.preventDefault();
	      this.selectAll();
	    }
	  },
	  handleKeyPress: function handleKeyPress(e) {
	    (0, _widgetHelpers.notify)(this.props.onKeyPress, [e]);

	    if (e.defaultPrevented) return;

	    this.search(String.fromCharCode(e.which));
	  },
	  focus: function focus() {
	    _compat2.default.findDOMNode(this.refs.list).focus();
	  },
	  selectAll: function selectAll() {
	    var _this2 = this;

	    var _props3 = this.props,
	        disabled = _props3.disabled,
	        readOnly = _props3.readOnly,
	        valueField = _props3.valueField,
	        values = this.state.dataItems,
	        data = this._data(),
	        blacklist;

	    disabled = disabled || readOnly;
	    disabled = Array.isArray(disabled) ? disabled : [];
	    //disabled values that are not selected
	    blacklist = disabled.filter(function (v) {
	      return !(0, _interaction.contains)(v, values, valueField);
	    });
	    data = data.filter(function (v) {
	      return !(0, _interaction.contains)(v, blacklist, valueField);
	    });

	    if (data.length === values.length) {
	      data = disabled.filter(function (item) {
	        return (0, _interaction.contains)(item, values, valueField);
	      });
	      data = data.map(function (item) {
	        return (0, _dataHelpers.dataItem)(_this2._data(), item, valueField);
	      });
	    }

	    (0, _widgetHelpers.notify)(this.props.onChange, [data]);
	  },
	  handleChange: function handleChange(item, checked) {
	    var multiple = this.props.multiple,
	        values = this.state.dataItems;


	    multiple = !!multiple;

	    this.clearTimeout('focusedItem');
	    this.setState({ focusedItem: item });

	    if (!multiple) return (0, _widgetHelpers.notify)(this.props.onChange, checked ? item : null);

	    values = checked ? values.concat(item) : values.filter(function (v) {
	      return v !== item;
	    });

	    (0, _widgetHelpers.notify)(this.props.onChange, [values || []]);
	  },
	  search: function search(character) {
	    var _this3 = this;

	    var word = ((this._searchTerm || '') + character).toLowerCase(),
	        list = this.refs.list,
	        multiple = this.props.multiple;

	    if (!character) return;

	    this._searchTerm = word;

	    this.setTimeout('search', function () {
	      var focusedItem = list.next(_this3.state.focusedItem, word);

	      _this3._searchTerm = '';

	      if (focusedItem) {
	        !multiple ? _this3.handleChange(focusedItem, true) : _this3.setState({ focusedItem: focusedItem });
	      }
	    }, this.props.delay);
	  },
	  _data: function _data() {
	    return this.props.data;
	  },
	  _values: function _values() {
	    return this.props.multiple ? this.state.dataItems : this.props.value;
	  }
	}, (_applyDecoratedDescriptor(_obj, 'handleKeyDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleKeyDown'), _obj), _applyDecoratedDescriptor(_obj, 'handleKeyPress', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleKeyPress'), _obj)), _obj));

	function getListItem(parent) {

	  return (0, _createReactClass2.default)({

	    displayName: 'SelectItem',

	    handleChange: function handleChange(e) {
	      var _props4 = this.props,
	          disabled = _props4.disabled,
	          readonly = _props4.readonly,
	          dataItem = _props4.dataItem;


	      if (!disabled && !readonly) parent.handleChange(dataItem, e.target.checked);
	    },
	    handleMouseDown: function handleMouseDown() {
	      parent._clicking = true;
	    },
	    render: function render() {
	      var _props5 = this.props,
	          children = _props5.children,
	          disabled = _props5.disabled,
	          readonly = _props5.readonly,
	          item = _props5.dataItem;
	      var _parent$props = parent.props,
	          multiple = _parent$props.multiple,
	          _parent$props$name = _parent$props.name,
	          name = _parent$props$name === undefined ? (0, _widgetHelpers.instanceId)(parent, '_name') : _parent$props$name;


	      var checked = (0, _interaction.contains)(item, parent._values(), parent.props.valueField),
	          type = multiple ? 'checkbox' : 'radio';

	      return _react2.default.createElement(
	        _ListOption2.default,
	        _extends({}, this.props, {
	          role: type,
	          'aria-checked': !!checked
	        }),
	        _react2.default.createElement(
	          'label',
	          { onMouseDown: this.handleMouseDown },
	          _react2.default.createElement('input', {
	            name: name,
	            type: type,
	            tabIndex: '-1',
	            role: 'presentation',
	            checked: checked,
	            disabled: disabled || readonly,
	            onChange: this.handleChange
	          }),
	          children
	        )
	      );
	    }
	  });
	}

	exports.default = (0, _uncontrollable2.default)(SelectList, { value: 'onChange' }, ['selectAll', 'focus']);
	module.exports = exports['default'];

/***/ })
/******/ ])
});
;