/*! (c) 2016 Jason Quense | https://github.com/jquense/react-widgets/blob/master/License.txt */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define([, ], factory);
	else if(typeof exports === 'object')
		exports["ReactWidgets"] = factory(require("react"), require("react-dom"));
	else
		root["ReactWidgets"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_21__, __WEBPACK_EXTERNAL_MODULE_32__) {
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
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var babelHelpers = __webpack_require__(2);

	var configure = __webpack_require__(3);

	if (process.env.NODE_ENV !== 'production') {
	  [Array.prototype.some, Array.prototype.filter, Array.prototype.reduce].forEach(function (method) {
	    if (!method) throw new Error('One or more ES5 features is not available to ReactWidgets: http://jquense.github.io/react-widgets/docs/#/getting-started/browser');
	  });
	}

	module.exports = babelHelpers._extends({}, configure, {
	  DropdownList: __webpack_require__(22),
	  Combobox: __webpack_require__(58),
	  Calendar: __webpack_require__(62),
	  DateTimePicker: __webpack_require__(76),
	  NumberPicker: __webpack_require__(79),
	  Multiselect: __webpack_require__(82),
	  SelectList: __webpack_require__(85),

	  utils: {
	    ReplaceTransitionGroup: __webpack_require__(74),
	    SlideTransition: __webpack_require__(73)
	  }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
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
	    var timeout = setTimeout(cleanUpNextTick);
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
	    clearTimeout(timeout);
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
	        setTimeout(drainQueue, 0);
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

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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

	  babelHelpers.createDecoratedObject = function (descriptors) {
	    var target = {};

	    for (var i = 0; i < descriptors.length; i++) {
	      var descriptor = descriptors[i];
	      var decorators = descriptor.decorators;
	      var key = descriptor.key;
	      delete descriptor.key;
	      delete descriptor.decorators;
	      descriptor.enumerable = true;
	      descriptor.configurable = true;
	      if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

	      if (decorators) {
	        for (var f = 0; f < decorators.length; f++) {
	          var decorator = decorators[f];

	          if (typeof decorator === "function") {
	            descriptor = decorator(target, key, descriptor) || descriptor;
	          } else {
	            throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
	          }
	        }
	      }

	      if (descriptor.initializer) {
	        descriptor.value = descriptor.initializer.call(target);
	      }

	      Object.defineProperty(target, key, descriptor);
	    }

	    return target;
	  };

	  babelHelpers.objectWithoutProperties = function (obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  };

	  babelHelpers.interopRequireWildcard = function (obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj["default"] = obj;
	      return newObj;
	    }
	  };

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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _utilConfiguration = __webpack_require__(4);

	var _utilConfiguration2 = babelHelpers.interopRequireDefault(_utilConfiguration);

	var _utilLocalizers = __webpack_require__(18);

	var localizers = babelHelpers.interopRequireWildcard(_utilLocalizers);
	exports['default'] = {

	  setAnimate: function setAnimate(animatefn) {
	    _utilConfiguration2['default'].animate = animatefn;
	  },

	  setLocalizers: function setLocalizers(_ref) {
	    var date = _ref.date;
	    var number = _ref.number;

	    date && this.setDateLocalizer(date);
	    number && this.setNumberLocalizer(number);
	  },

	  setDateLocalizer: localizers.setDate,

	  setNumberLocalizer: localizers.setNumber
	};
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _domAnimate = __webpack_require__(5);

	var _domAnimate2 = babelHelpers.interopRequireDefault(_domAnimate);

	exports['default'] = { animate: _domAnimate2['default'] };
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;
	exports['default'] = animate;

	var _domHelpersUtilHyphenate = __webpack_require__(6);

	var _domHelpersUtilHyphenate2 = babelHelpers.interopRequireDefault(_domHelpersUtilHyphenate);

	var _domHelpersStyle = __webpack_require__(7);

	var _domHelpersStyle2 = babelHelpers.interopRequireDefault(_domHelpersStyle);

	var _domHelpersEventsOn = __webpack_require__(14);

	var _domHelpersEventsOn2 = babelHelpers.interopRequireDefault(_domHelpersEventsOn);

	var _domHelpersEventsOff = __webpack_require__(16);

	var _domHelpersEventsOff2 = babelHelpers.interopRequireDefault(_domHelpersEventsOff);

	var _domHelpersTransitionProperties = __webpack_require__(17);

	var _domHelpersTransitionProperties2 = babelHelpers.interopRequireDefault(_domHelpersTransitionProperties);

	var has = Object.prototype.hasOwnProperty,
	    reset = {},
	    TRANSLATION_MAP = {
	  left: 'translateX',
	  right: 'translateX',
	  top: 'translateY',
	  bottom: 'translateY'
	};

	reset[_domHelpersTransitionProperties2['default'].property] = reset[_domHelpersTransitionProperties2['default'].duration] = reset[_domHelpersTransitionProperties2['default'].delay] = reset[_domHelpersTransitionProperties2['default'].timing] = '';

	animate.endEvent = _domHelpersTransitionProperties2['default'].end;
	animate.transform = _domHelpersTransitionProperties2['default'].transform;
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

	  if (!_domHelpersTransitionProperties2['default'].end) duration = 0;
	  if (duration === undefined) duration = 200;

	  for (var key in properties) if (has.call(properties, key)) {
	    if (/(top|bottom)/.test(key)) transforms += TRANSLATION_MAP[key] + '(' + properties[key] + ') ';else {
	      cssValues[key] = properties[key];
	      cssProperties.push(_domHelpersUtilHyphenate2['default'](key));
	    }
	  }

	  if (transforms) {
	    cssValues[_domHelpersTransitionProperties2['default'].transform] = transforms;
	    cssProperties.push(_domHelpersTransitionProperties2['default'].transform);
	  }

	  if (duration > 0) {
	    cssValues[_domHelpersTransitionProperties2['default'].property] = cssProperties.join(', ');
	    cssValues[_domHelpersTransitionProperties2['default'].duration] = duration / 1000 + 's';
	    cssValues[_domHelpersTransitionProperties2['default'].delay] = 0 + 's';
	    cssValues[_domHelpersTransitionProperties2['default'].timing] = easing || 'linear';

	    _domHelpersEventsOn2['default'](node, _domHelpersTransitionProperties2['default'].end, done);

	    setTimeout(function () {
	      if (!fired) done(fakeEvent);
	    }, duration + 500);
	  }

	  node.clientLeft; // trigger page reflow
	  _domHelpersStyle2['default'](node, cssValues);

	  if (duration <= 0) setTimeout(done.bind(null, fakeEvent), 0);

	  return {
	    cancel: function cancel() {
	      if (fired) return;
	      fired = true;
	      _domHelpersEventsOff2['default'](node, _domHelpersTransitionProperties2['default'].end, done);
	      _domHelpersStyle2['default'](node, reset);
	    }
	  };

	  function done(event) {
	    if (event.target !== event.currentTarget) return;

	    fired = true;
	    _domHelpersEventsOff2['default'](event.target, _domHelpersTransitionProperties2['default'].end, done);
	    _domHelpersStyle2['default'](node, reset);
	    callback && callback.call(this);
	  }
	}

	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var rUpper = /([A-Z])/g;

	module.exports = function hyphenate(string) {
	  return string.replace(rUpper, '-$1').toLowerCase();
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var camelize = __webpack_require__(8),
	    hyphenate = __webpack_require__(10),
	    _getComputedStyle = __webpack_require__(11),
	    removeStyle = __webpack_require__(13);

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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
	 */

	'use strict';
	var camelize = __webpack_require__(9);
	var msPattern = /^-ms-/;

	module.exports = function camelizeStyleName(string) {
	  return camelize(string.replace(msPattern, 'ms-'));
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	var rHyphen = /-(.)/g;

	module.exports = function camelize(string) {
	  return string.replace(rHyphen, function (_, chr) {
	    return chr.toUpperCase();
	  });
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
	 */

	"use strict";

	var hyphenate = __webpack_require__(6);
	var msPattern = /^ms-/;

	module.exports = function hyphenateStyleName(string) {
	  return hyphenate(string).replace(msPattern, "-ms-");
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(12);

	var _utilCamelizeStyle = __webpack_require__(8);

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

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function removeStyle(node, key) {
	  return 'removeProperty' in node.style ? node.style.removeProperty(key) : node.style.removeAttribute(key);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(15);
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

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(15);
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

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(15);

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

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;
	exports.setNumber = setNumber;
	exports.setDate = setDate;

	var _invariant = __webpack_require__(19);

	var _invariant2 = babelHelpers.interopRequireDefault(_invariant);

	var _ = __webpack_require__(20);

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var localePropType = _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.func]);

	var REQUIRED_NUMBER_FORMATS = ['default'];

	var REQUIRED_DATE_FORMATS = ['default', 'date', 'time', 'header', 'footer', 'dayOfMonth', 'month', 'year', 'decade', 'century'];

	function _format(localizer, formatter, value, format, culture) {
	  var result = typeof format === 'function' ? format(value, culture, localizer) : formatter.call(localizer, value, format, culture);

	  _invariant2['default'](result == null || typeof result === 'string', '`localizer format(..)` must return a string, null, or undefined');

	  return result;
	}

	function checkFormats(requiredFormats, formats) {
	  if (process.env.NODE_ENV !== 'production') requiredFormats.forEach(function (f) {
	    return _invariant2['default'](_.has(formats, f), 'localizer missing required format: `%s`', f);
	  });
	}

	var _numberLocalizer = createWrapper('NumberPicker');

	function setNumber(_ref) {
	  var _format2 = _ref.format;
	  var _parse = _ref.parse;
	  var _ref$decimalChar = _ref.decimalChar;
	  var decimalChar = _ref$decimalChar === undefined ? function () {
	    return '.';
	  } : _ref$decimalChar;
	  var _ref$precision = _ref.precision;
	  var precision = _ref$precision === undefined ? function () {
	    return null;
	  } : _ref$precision;
	  var formats = _ref.formats;
	  var propType = _ref.propType;

	  _invariant2['default'](typeof _format2 === 'function', 'number localizer `format(..)` must be a function');
	  _invariant2['default'](typeof _parse === 'function', 'number localizer `parse(..)` must be a function');

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
	      _invariant2['default'](result == null || typeof result === 'number', 'number localizer `parse(..)` must return a number, null, or undefined');
	      return result;
	    }
	  };
	}

	var _dateLocalizer = createWrapper('DateTimePicker');

	function setDate(spec) {
	  _invariant2['default'](typeof spec.format === 'function', 'date localizer `format(..)` must be a function');
	  _invariant2['default'](typeof spec.parse === 'function', 'date localizer `parse(..)` must be a function');
	  _invariant2['default'](typeof spec.firstOfWeek === 'function', 'date localizer `firstOfWeek(..)` must be a function');
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
	      _invariant2['default'](result == null || result instanceof Date && !isNaN(result.getTime()), 'date localizer `parse(..)` must return a valid Date, null, or undefined');
	      return result;
	    }
	  };
	}

	var number = {
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

	exports.number = number;
	var date = {
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

	exports.date = date;
	exports['default'] = { number: number, date: date };

	function createWrapper() {
	  var dummy = {};

	  if (process.env.NODE_ENV !== 'production') {
	    ['formats', 'parse', 'format', 'firstOfWeek', 'precision'].forEach(function (name) {
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

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
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

	    if (typeof a !== 'object' && typeof b !== 'object') return a === b;

	    if (typeof a !== typeof b) return false;

	    return shallowEqual(a, b);
	  },

	  transform: function transform(obj, cb, seed) {
	    _.each(obj, cb.bind(null, seed = seed || (Array.isArray(obj) ? [] : {})));
	    return seed;
	  },

	  each: function each(obj, cb, thisArg) {
	    if (Array.isArray(obj)) return obj.forEach(cb, thisArg);

	    for (var key in obj) if (has(obj, key)) cb.call(thisArg, obj[key], key, obj);
	  },

	  pick: function pick(obj, keys) {
	    keys = [].concat(keys);
	    return _.transform(obj, function (mapped, val, key) {
	      if (keys.indexOf(key) !== -1) mapped[key] = val;
	    }, {});
	  },

	  omit: function omit(obj, keys) {
	    keys = [].concat(keys);
	    return _.transform(obj, function (mapped, val, key) {
	      if (keys.indexOf(key) === -1) mapped[key] = val;
	    }, {});
	  },

	  find: function find(arr, cb, thisArg) {
	    var result;
	    if (Array.isArray(arr)) {
	      arr.every(function (val, idx) {
	        if (cb.call(thisArg, val, idx, arr)) return result = val, false;
	        return true;
	      });
	      return result;
	    } else for (var key in arr) if (has(arr, key)) if (cb.call(thisArg, arr[key], key, arr)) return arr[key];
	  },

	  chunk: function chunk(array, chunkSize) {
	    var index = 0,
	        length = array ? array.length : 0,
	        result = [];

	    chunkSize = Math.max(+chunkSize || 1, 1);

	    while (index < length) result.push(array.slice(index, index += chunkSize));

	    return result;
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

	  for (var i = 0; i < keysA.length; i++) if (!has(objB, keysA[i]) || !eql(objA[keysA[i]], objB[keysA[i]])) return false;

	  return true;
	}

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_21__;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _domHelpersActiveElement = __webpack_require__(23);

	var _domHelpersActiveElement2 = babelHelpers.interopRequireDefault(_domHelpersActiveElement);

	var _domHelpersQueryContains = __webpack_require__(25);

	var _domHelpersQueryContains2 = babelHelpers.interopRequireDefault(_domHelpersQueryContains);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _Popup = __webpack_require__(27);

	var _Popup2 = babelHelpers.interopRequireDefault(_Popup);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _List = __webpack_require__(35);

	var _List2 = babelHelpers.interopRequireDefault(_List);

	var _ListGroupable = __webpack_require__(42);

	var _ListGroupable2 = babelHelpers.interopRequireDefault(_ListGroupable);

	var _utilValidateListInterface = __webpack_require__(44);

	var _utilValidateListInterface2 = babelHelpers.interopRequireDefault(_utilValidateListInterface);

	var _uncontrollable = __webpack_require__(45);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _utilDataHelpers = __webpack_require__(37);

	var _utilInteraction = __webpack_require__(39);

	var _utilWidgetHelpers = __webpack_require__(38);

	var omit = _util_2['default'].omit;
	var pick = _util_2['default'].pick;
	var result = _util_2['default'].result;

	var propTypes = {
	  //-- controlled props -----------
	  value: _react2['default'].PropTypes.any,
	  onChange: _react2['default'].PropTypes.func,
	  open: _react2['default'].PropTypes.bool,
	  onToggle: _react2['default'].PropTypes.func,
	  //------------------------------------

	  data: _react2['default'].PropTypes.array,
	  valueField: _react2['default'].PropTypes.string,
	  textField: _utilPropTypes2['default'].accessor,

	  valueComponent: _utilPropTypes2['default'].elementType,
	  itemComponent: _utilPropTypes2['default'].elementType,
	  listComponent: _utilPropTypes2['default'].elementType,

	  groupComponent: _utilPropTypes2['default'].elementType,
	  groupBy: _utilPropTypes2['default'].accessor,

	  onSelect: _react2['default'].PropTypes.func,

	  searchTerm: _react2['default'].PropTypes.string,
	  onSearch: _react2['default'].PropTypes.func,

	  busy: _react2['default'].PropTypes.bool,

	  delay: _react2['default'].PropTypes.number,

	  dropUp: _react2['default'].PropTypes.bool,
	  duration: _react2['default'].PropTypes.number, //popup

	  disabled: _utilPropTypes2['default'].disabled.acceptsArray,
	  readOnly: _utilPropTypes2['default'].readOnly.acceptsArray,

	  messages: _react2['default'].PropTypes.shape({
	    open: _utilPropTypes2['default'].message,
	    emptyList: _utilPropTypes2['default'].message,
	    emptyFilter: _utilPropTypes2['default'].message,
	    filterPlaceholder: _utilPropTypes2['default'].message
	  })
	};

	var DropdownList = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
	  key: 'displayName',
	  initializer: function initializer() {
	    return 'DropdownList';
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(48), __webpack_require__(49), __webpack_require__(50), __webpack_require__(51), __webpack_require__(56), __webpack_require__(41)(), __webpack_require__(57)({
	      didHandle: function didHandle(focused) {
	        if (!focused) this.close();
	      }
	    })];
	  }
	}, {
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {
	    return {
	      delay: 500,
	      value: '',
	      open: false,
	      data: [],
	      searchTerm: '',
	      messages: msgs(),
	      ariaActiveDescendantKey: 'dropdownlist'
	    };
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    var _props = this.props;
	    var open = _props.open;
	    var filter = _props.filter;
	    var value = _props.value;
	    var data = _props.data;
	    var searchTerm = _props.searchTerm;
	    var valueField = _props.valueField;

	    var processed = filter ? this.filter(data, searchTerm) : data,
	        initialIdx = _utilDataHelpers.dataIndexOf(data, value, valueField);

	    return {
	      filteredData: open && filter ? processed : null,
	      selectedItem: processed[initialIdx],
	      focusedItem: processed[initialIdx] || data[0]
	    };
	  }
	}, {
	  key: 'componentDidUpdate',
	  value: function componentDidUpdate() {
	    this.refs.list && _utilValidateListInterface2['default'](this.refs.list);
	  }
	}, {
	  key: 'componentWillReceiveProps',
	  value: function componentWillReceiveProps(props) {
	    var open = props.open;
	    var filter = props.filter;
	    var value = props.value;
	    var data = props.data;
	    var searchTerm = props.searchTerm;
	    var valueField = props.valueField;

	    var processed = filter ? this.filter(data, searchTerm) : data,
	        idx = _utilDataHelpers.dataIndexOf(data, value, valueField);

	    this.setState({
	      filteredData: open && filter ? processed : null,
	      selectedItem: processed[idx],
	      focusedItem: processed[! ~idx ? 0 : idx]
	    });
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _cx,
	        _this = this;

	    var _props2 = this.props;
	    var className = _props2.className;
	    var tabIndex = _props2.tabIndex;
	    var filter = _props2.filter;
	    var valueField = _props2.valueField;
	    var textField = _props2.textField;
	    var groupBy = _props2.groupBy;
	    var messages = _props2.messages;
	    var data = _props2.data;
	    var busy = _props2.busy;
	    var dropUp = _props2.dropUp;
	    var placeholder = _props2.placeholder;
	    var value = _props2.value;
	    var open = _props2.open;
	    var ValueComponent = _props2.valueComponent;
	    var List = _props2.listComponent;

	    List = List || groupBy && _ListGroupable2['default'] || _List2['default'];

	    var elementProps = omit(this.props, Object.keys(propTypes));
	    var listProps = pick(this.props, Object.keys(List.propTypes));
	    var popupProps = pick(this.props, Object.keys(_Popup2['default'].propTypes));

	    var _state = this.state;
	    var focusedItem = _state.focusedItem;
	    var selectedItem = _state.selectedItem;
	    var focused = _state.focused;

	    var items = this._data(),
	        disabled = _utilInteraction.isDisabled(this.props),
	        readOnly = _utilInteraction.isReadOnly(this.props),
	        valueItem = _utilDataHelpers.dataItem(data, value, valueField),
	        // take value from the raw data
	    listID = _utilWidgetHelpers.instanceId(this, '__listbox');

	    var shouldRenderList = _utilWidgetHelpers.isFirstFocusedRender(this) || open;

	    messages = msgs(messages);

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, elementProps, {
	        ref: 'input',
	        role: 'combobox',
	        tabIndex: tabIndex || '0',
	        'aria-expanded': open,
	        'aria-haspopup': true,
	        'aria-owns': listID,
	        'aria-busy': !!busy,
	        'aria-live': !open && 'polite',
	        'aria-autocomplete': 'list',
	        'aria-disabled': disabled,
	        'aria-readonly': readOnly,
	        onKeyDown: this._keyDown,
	        onKeyPress: this._keyPress,
	        onClick: this._click,
	        onBlur: this.handleBlur,
	        onFocus: this.handleFocus,
	        className: _classnames2['default'](className, 'rw-dropdownlist', 'rw-widget', (_cx = {
	          'rw-state-disabled': disabled,
	          'rw-state-readonly': readOnly,
	          'rw-state-focus': focused,
	          'rw-rtl': this.isRtl()

	        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx)) }),
	      _react2['default'].createElement(
	        'span',
	        { className: 'rw-dropdownlist-picker rw-select rw-btn' },
	        _react2['default'].createElement(
	          'i',
	          { className: 'rw-i rw-i-caret-down' + (busy ? ' rw-loading' : '') },
	          _react2['default'].createElement(
	            'span',
	            { className: 'rw-sr' },
	            result(messages.open, this.props)
	          )
	        )
	      ),
	      _react2['default'].createElement(
	        'div',
	        {
	          className: 'rw-input'
	        },
	        !valueItem && placeholder ? _react2['default'].createElement(
	          'span',
	          { className: 'rw-placeholder' },
	          placeholder
	        ) : this.props.valueComponent ? _react2['default'].createElement(ValueComponent, { item: valueItem }) : _utilDataHelpers.dataText(valueItem, textField)
	      ),
	      _react2['default'].createElement(
	        _Popup2['default'],
	        babelHelpers._extends({}, popupProps, {
	          onOpen: function () {
	            return _this.focus();
	          },
	          onOpening: function () {
	            return _this.refs.list.forceUpdate();
	          }
	        }),
	        _react2['default'].createElement(
	          'div',
	          null,
	          filter && this._renderFilter(messages),
	          shouldRenderList && _react2['default'].createElement(List, babelHelpers._extends({ ref: 'list'
	          }, listProps, {
	            data: items,
	            id: listID,
	            'aria-live': open && 'polite',
	            'aria-labelledby': _utilWidgetHelpers.instanceId(this),
	            'aria-hidden': !this.props.open,
	            selected: selectedItem,
	            focused: open ? focusedItem : null,
	            onSelect: this._onSelect,
	            onMove: this._scrollTo,
	            messages: {
	              emptyList: data.length ? messages.emptyFilter : messages.emptyList
	            } }))
	        )
	      )
	    );
	  }
	}, {
	  key: '_renderFilter',
	  value: function _renderFilter(messages) {
	    var _this2 = this;

	    return _react2['default'].createElement(
	      'div',
	      { ref: 'filterWrapper', className: 'rw-filter-input' },
	      _react2['default'].createElement(
	        'span',
	        { className: 'rw-select rw-btn' },
	        _react2['default'].createElement('i', { className: 'rw-i rw-i-search' })
	      ),
	      _react2['default'].createElement('input', { ref: 'filter', className: 'rw-input',
	        autoComplete: 'off',
	        placeholder: _util_2['default'].result(messages.filterPlaceholder, this.props),
	        value: this.props.searchTerm,
	        onChange: function (e) {
	          return _utilWidgetHelpers.notify(_this2.props.onSearch, e.target.value);
	        } })
	    );
	  }
	}, {
	  key: '_onSelect',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _onSelect(data) {
	    this.close();
	    _utilWidgetHelpers.notify(this.props.onSelect, data);
	    this.change(data);
	    this.focus(this);
	  }
	}, {
	  key: '_click',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _click(e) {
	    var wrapper = this.refs.filterWrapper;

	    if (!this.props.filter || !this.props.open) this.toggle();else if (!_domHelpersQueryContains2['default'](_utilCompat2['default'].findDOMNode(wrapper), e.target)) this.close();

	    _utilWidgetHelpers.notify(this.props.onClick, e);
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
	    var _this3 = this;

	    var self = this,
	        key = e.key,
	        alt = e.altKey,
	        list = this.refs.list,
	        filtering = this.props.filter,
	        focusedItem = this.state.focusedItem,
	        selectedItem = this.state.selectedItem,
	        isOpen = this.props.open,
	        closeWithFocus = function closeWithFocus() {
	      _this3.close(), _utilCompat2['default'].findDOMNode(_this3).focus();
	    };

	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (key === 'End') {
	      if (isOpen) this.setState({ focusedItem: list.last() });else change(list.last());
	      e.preventDefault();
	    } else if (key === 'Home') {
	      if (isOpen) this.setState({ focusedItem: list.first() });else change(list.first());
	      e.preventDefault();
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

	    function change(item, fromList) {
	      if (!item) return;
	      fromList ? self._onSelect(item) : self.change(item);
	    }
	  }
	}, {
	  key: '_keyPress',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyPress(e) {
	    var _this4 = this;

	    _utilWidgetHelpers.notify(this.props.onKeyPress, [e]);

	    if (e.defaultPrevented) return;

	    if (!(this.props.filter && this.props.open)) this.search(String.fromCharCode(e.which), function (item) {
	      _this4.isMounted() && _this4.props.open ? _this4.setState({ focusedItem: item }) : item && _this4.change(item);
	    });
	  }
	}, {
	  key: 'change',
	  value: function change(data) {
	    if (!_utilDataHelpers.valueMatcher(data, this.props.value, this.props.valueField)) {
	      _utilWidgetHelpers.notify(this.props.onChange, data);
	      _utilWidgetHelpers.notify(this.props.onSearch, '');
	      this.close();
	    }
	  }
	}, {
	  key: 'focus',
	  value: function focus(target) {
	    var inst = target || (this.props.filter && this.props.open ? this.refs.filter : this.refs.input);

	    if (_domHelpersActiveElement2['default']() !== _utilCompat2['default'].findDOMNode(inst)) _utilCompat2['default'].findDOMNode(inst).focus();
	  }
	}, {
	  key: '_data',
	  value: function _data() {
	    return this.state.filteredData || this.props.data.concat();
	  }
	}, {
	  key: 'search',
	  value: function search(character, cb) {
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
	  }
	}, {
	  key: 'open',
	  value: function open() {
	    _utilWidgetHelpers.notify(this.props.onToggle, true);
	  }
	}, {
	  key: 'close',
	  value: function close() {
	    _utilWidgetHelpers.notify(this.props.onToggle, false);
	  }
	}, {
	  key: 'toggle',
	  value: function toggle() {
	    this.props.open ? this.close() : this.open();
	  }
	}]));

	function msgs(msgs) {
	  return babelHelpers._extends({
	    open: 'open dropdown',
	    filterPlaceholder: '',
	    emptyList: 'There are no items in this list',
	    emptyFilter: 'The filter returned no results'
	  }, msgs);
	}

	exports['default'] = _uncontrollable2['default'](DropdownList, { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' }, ['focus']);
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(12);

	exports.__esModule = true;

	/**
	 * document.activeElement
	 */
	exports['default'] = activeElement;

	var _ownerDocument = __webpack_require__(24);

	var _ownerDocument2 = babelHelpers.interopRequireDefault(_ownerDocument);

	function activeElement() {
	  var doc = arguments[0] === undefined ? document : arguments[0];

	  try {
	    return doc.activeElement;
	  } catch (e) {}
	}

	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = ownerDocument;

	function ownerDocument(node) {
	  return node && node.ownerDocument || document;
	}

	module.exports = exports["default"];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(15);

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

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var _OVERFLOW;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _domHelpersStyle = __webpack_require__(7);

	var _domHelpersStyle2 = babelHelpers.interopRequireDefault(_domHelpersStyle);

	var _domHelpersQueryHeight = __webpack_require__(28);

	var _domHelpersQueryHeight2 = babelHelpers.interopRequireDefault(_domHelpersQueryHeight);

	var _domHelpersUtilCamelizeStyle = __webpack_require__(8);

	var _domHelpersUtilCamelizeStyle2 = babelHelpers.interopRequireDefault(_domHelpersUtilCamelizeStyle);

	var _utilConfiguration = __webpack_require__(4);

	var _utilConfiguration2 = babelHelpers.interopRequireDefault(_utilConfiguration);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var transform = _domHelpersUtilCamelizeStyle2['default'](_utilConfiguration2['default'].animate.transform);

	var CLOSING = 0,
	    CLOSED = 1,
	    OPENING = 2,
	    OPEN = 3;

	function properties(prop, value) {
	  var _ref, _ref2;

	  var TRANSLATION_MAP = _utilConfiguration2['default'].animate.TRANSLATION_MAP;

	  if (TRANSLATION_MAP && TRANSLATION_MAP[prop]) return _ref = {}, _ref[transform] = TRANSLATION_MAP[prop] + '(' + value + ')', _ref;

	  return _ref2 = {}, _ref2[prop] = value, _ref2;
	}

	var OVERFLOW = (_OVERFLOW = {}, _OVERFLOW[CLOSED] = 'hidden', _OVERFLOW[CLOSING] = 'hidden', _OVERFLOW[OPENING] = 'hidden', _OVERFLOW);

	module.exports = _react2['default'].createClass({

	  displayName: 'Popup',

	  propTypes: {
	    open: _react2['default'].PropTypes.bool,
	    dropUp: _react2['default'].PropTypes.bool,
	    duration: _react2['default'].PropTypes.number,

	    onClosing: _react2['default'].PropTypes.func,
	    onOpening: _react2['default'].PropTypes.func,
	    onClose: _react2['default'].PropTypes.func,
	    onOpen: _react2['default'].PropTypes.func
	  },

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

	    _utilCompat2['default'].batchedUpdates(function () {
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
	      var height = this.height();
	      if (height !== this.state.height) this.setState({ height: height });
	    }
	  },

	  render: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var open = _props.open;
	    var dropUp = _props.dropUp;
	    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'open', 'dropUp']);
	    var _state = this.state;
	    var status = _state.status;
	    var height = _state.height;

	    var overflow = OVERFLOW[status] || 'visible',
	        display = status === CLOSED ? 'none' : 'block';

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, props, {
	        style: babelHelpers._extends({ display: display, overflow: overflow, height: height }, props.style),
	        className: _classnames2['default'](className, 'rw-popup-container', {
	          'rw-dropup': dropUp,
	          'rw-popup-animating': this.isTransitioning()
	        })
	      }),
	      this.renderChildren()
	    );
	  },

	  renderChildren: function renderChildren() {
	    if (!this.props.children) return _react2['default'].createElement('span', { className: 'rw-popup rw-widget' });

	    var offset = this.getOffsetForStatus(this.state.status),
	        child = _react2['default'].Children.only(this.props.children);

	    return _react.cloneElement(child, {
	      style: babelHelpers._extends({}, child.props.style, offset, {
	        position: this.isTransitioning() ? 'absolute' : undefined
	      }),
	      className: _classnames2['default'](child.props.className, 'rw-popup rw-widget')
	    });
	  },

	  open: function open() {
	    var _this2 = this;

	    this.cancelNextCallback();
	    var el = _utilCompat2['default'].findDOMNode(this).firstChild,
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
	    var el = _utilCompat2['default'].findDOMNode(this).firstChild,
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
	    var _CLOSED$CLOSING$OPENING$OPEN$status;

	    if (this.state.initialRender) return {};

	    var _in = properties('top', this.props.dropUp ? '100%' : '-100%'),
	        out = properties('top', 0);
	    return (_CLOSED$CLOSING$OPENING$OPEN$status = {}, _CLOSED$CLOSING$OPENING$OPEN$status[CLOSED] = _in, _CLOSED$CLOSING$OPENING$OPEN$status[CLOSING] = out, _CLOSED$CLOSING$OPENING$OPEN$status[OPENING] = _in, _CLOSED$CLOSING$OPENING$OPEN$status[OPEN] = out, _CLOSED$CLOSING$OPENING$OPEN$status)[status] || {};
	  },

	  height: function height() {
	    var container = _utilCompat2['default'].findDOMNode(this),
	        content = container.firstChild,
	        margin = parseInt(_domHelpersStyle2['default'](content, 'margin-top'), 10) + parseInt(_domHelpersStyle2['default'](content, 'margin-bottom'), 10);

	    var old = container.style.display,
	        height = undefined;

	    container.style.display = 'block';
	    height = (_domHelpersQueryHeight2['default'](content) || 0) + (isNaN(margin) ? 0 : margin);
	    container.style.display = old;
	    return height;
	  },

	  isTransitioning: function isTransitioning() {
	    return this.state.status === OPENING || this.state.status === CLOSED;
	  },

	  animate: function animate(el, props, dur, easing, cb) {
	    this._transition = _utilConfiguration2['default'].animate(el, props, dur, easing, this.setNextCallback(cb));
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
	  var nextChildMapping = _react2['default'].Children.map(children, function (c) {
	    return c;
	  });
	  for (var key in nextChildMapping) return key;
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var offset = __webpack_require__(29),
	    getWindow = __webpack_require__(30);

	module.exports = function height(node, client) {
	  var win = getWindow(node);
	  return win ? win.innerHeight : client ? node.clientHeight : offset(node).height;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var contains = __webpack_require__(25),
	    getWindow = __webpack_require__(30),
	    ownerDocument = __webpack_require__(24);

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

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function getWindow(node) {
	  return node === node.window ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : false;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _reactDom = __webpack_require__(32);

	var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

	var _version = _react2['default'].version.split('.').map(parseFloat);

	module.exports = {

	  version: function version() {
	    return _version;
	  },

	  findDOMNode: function findDOMNode(component) {
	    return _reactDom2['default'].findDOMNode(component);
	  },

	  batchedUpdates: function batchedUpdates(cb) {
	    _reactDom2['default'].unstable_batchedUpdates(cb);
	  }
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_32__;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _localizers = __webpack_require__(18);

	var _localizers2 = babelHelpers.interopRequireDefault(_localizers);

	var _filter = __webpack_require__(34);

	var _filter2 = babelHelpers.interopRequireDefault(_filter);

	var filterTypes = Object.keys(_filter2['default']).filter(function (i) {
	  return i !== 'filter';
	});

	function getInteractionPropType(key) {
	  var types = [_react.PropTypes.bool, _react.PropTypes.oneOf([key])],
	      propType = _react.PropTypes.oneOfType(types);

	  propType.acceptsArray = _react.PropTypes.oneOfType(types.concat(_react.PropTypes.array));

	  return propType;
	}

	module.exports = {

	  elementType: createChainableTypeChecker(function (props, propName, componentName) {

	    if (typeof props[propName] !== 'function') {
	      if (_react2['default'].isValidElement(props[propName])) return new Error('Invalid prop `' + propName + '` specified in  `' + componentName + '`.' + ' Expected an Element `type`, not an actual Element');

	      if (typeof props[propName] !== 'string') return new Error('Invalid prop `' + propName + '` specified in  `' + componentName + '`.' + ' Expected an Element `type` such as a tag name or return value of React.createClass(...)');
	    }
	    return null;
	  }),

	  numberFormat: createChainableTypeChecker(function () {
	    var _localizers$number;

	    return (_localizers$number = _localizers2['default'].number).propType.apply(_localizers$number, arguments);
	  }),

	  dateFormat: createChainableTypeChecker(function () {
	    var _localizers$date;

	    return (_localizers$date = _localizers2['default'].date).propType.apply(_localizers$date, arguments);
	  }),

	  disabled: getInteractionPropType('disabled'),
	  readOnly: getInteractionPropType('readOnly'),

	  accessor: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.func]),

	  message: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.func, _react2['default'].PropTypes.string]),

	  filter: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.func, _react2['default'].PropTypes.bool, _react2['default'].PropTypes.oneOf(filterTypes)])
	};

	function createChainableTypeChecker(validate) {

	  function checkType(isRequired, props, propName, componentName, location) {
	    componentName = componentName || '<<anonymous>>';
	    if (props[propName] == null) {
	      if (isRequired) {
	        return new Error('Required prop `' + propName + '` was not specified in  `' + componentName + '`.');
	      }
	    } else return validate(props, propName, componentName, location);
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);

	  return chainedCheckType;
	}

/***/ },
/* 34 */
/***/ function(module, exports) {

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

	exports["default"] = common;
	module.exports = exports["default"];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _ListOption = __webpack_require__(36);

	var _ListOption2 = babelHelpers.interopRequireDefault(_ListOption);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilDataHelpers = __webpack_require__(37);

	var _utilWidgetHelpers = __webpack_require__(38);

	var _utilInteraction = __webpack_require__(39);

	var optionId = function optionId(id, idx) {
	  return id + '__option__' + idx;
	};

	exports['default'] = _react2['default'].createClass({

	  displayName: 'List',

	  mixins: [__webpack_require__(40), __webpack_require__(41)()],

	  propTypes: {
	    data: _react2['default'].PropTypes.array,
	    onSelect: _react2['default'].PropTypes.func,
	    onMove: _react2['default'].PropTypes.func,

	    optionComponent: _utilPropTypes2['default'].elementType,
	    itemComponent: _utilPropTypes2['default'].elementType,

	    selected: _react2['default'].PropTypes.any,
	    focused: _react2['default'].PropTypes.any,
	    valueField: _utilPropTypes2['default'].accessor,
	    textField: _utilPropTypes2['default'].accessor,

	    disabled: _utilPropTypes2['default'].disabled.acceptsArray,
	    readOnly: _utilPropTypes2['default'].readOnly.acceptsArray,

	    messages: _react2['default'].PropTypes.shape({
	      emptyList: _utilPropTypes2['default'].message
	    })
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      onSelect: function onSelect() {},
	      optionComponent: _ListOption2['default'],
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
	    var _props = this.props;
	    var data = _props.data;
	    var focused = _props.focused;
	    var idx = data.indexOf(focused);
	    var activeId = optionId(_utilWidgetHelpers.instanceId(this), idx);

	    this.ariaActiveDescendant(idx !== -1 ? activeId : null);

	    this.move();
	  },

	  render: function render() {
	    var _props2 = this.props;
	    var className = _props2.className;
	    var role = _props2.role;
	    var data = _props2.data;
	    var textField = _props2.textField;
	    var valueField = _props2.valueField;
	    var focused = _props2.focused;
	    var selected = _props2.selected;
	    var messages = _props2.messages;
	    var onSelect = _props2.onSelect;
	    var ItemComponent = _props2.itemComponent;
	    var Option = _props2.optionComponent;
	    var props = babelHelpers.objectWithoutProperties(_props2, ['className', 'role', 'data', 'textField', 'valueField', 'focused', 'selected', 'messages', 'onSelect', 'itemComponent', 'optionComponent']);
	    var id = _utilWidgetHelpers.instanceId(this);
	    var items;

	    items = !data.length ? _react2['default'].createElement(
	      'li',
	      { className: 'rw-list-empty' },
	      _util_2['default'].result(messages.emptyList, this.props)
	    ) : data.map(function (item, idx) {
	      var currentId = optionId(id, idx),
	          isDisabled = _utilInteraction.isDisabledItem(item, props),
	          isReadOnly = _utilInteraction.isReadOnlyItem(item, props);

	      return _react2['default'].createElement(
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
	        ItemComponent ? _react2['default'].createElement(ItemComponent, {
	          item: item,
	          value: _utilDataHelpers.dataValue(item, valueField),
	          text: _utilDataHelpers.dataText(item, textField),
	          disabled: isDisabled,
	          readOnly: isReadOnly
	        }) : _utilDataHelpers.dataText(item, textField)
	      );
	    });

	    return _react2['default'].createElement(
	      'ul',
	      babelHelpers._extends({
	        id: id,
	        tabIndex: '-1',
	        className: _classnames2['default'](className, 'rw-list'),
	        role: role === undefined ? 'listbox' : role
	      }, props),
	      items
	    );
	  },

	  _data: function _data() {
	    return this.props.data;
	  },

	  move: function move() {
	    var list = _utilCompat2['default'].findDOMNode(this),
	        idx = this._data().indexOf(this.props.focused),
	        selected = list.children[idx];

	    if (!selected) return;

	    _utilWidgetHelpers.notify(this.props.onMove, [selected, list, this.props.focused]);
	  }

	});
	module.exports = exports['default'];

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var ListOption = _react2['default'].createClass({
	  displayName: 'ListOption',

	  propTypes: {
	    dataItem: _react2['default'].PropTypes.any,
	    focused: _react2['default'].PropTypes.bool,
	    selected: _react2['default'].PropTypes.bool,
	    disabled: _react2['default'].PropTypes.bool,
	    readOnly: _react2['default'].PropTypes.bool
	  },

	  render: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var children = _props.children;
	    var focused = _props.focused;
	    var selected = _props.selected;
	    var disabled = _props.disabled;
	    var readOnly = _props.readOnly;
	    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'children', 'focused', 'selected', 'disabled', 'readOnly']);

	    var classes = {
	      'rw-state-focus': focused,
	      'rw-state-selected': selected,
	      'rw-state-disabled': disabled,
	      'rw-state-readonly': readOnly
	    };

	    return _react2['default'].createElement(
	      'li',
	      babelHelpers._extends({
	        role: 'option',
	        tabIndex: !(disabled || readOnly) ? '-1' : undefined,
	        'aria-selected': !!selected,
	        className: _classnames2['default']('rw-list-option', className, classes)
	      }, props),
	      children
	    );
	  }
	});

	exports['default'] = ListOption;
	module.exports = exports['default'];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.dataValue = dataValue;
	exports.dataText = dataText;
	exports.dataIndexOf = dataIndexOf;
	exports.valueMatcher = valueMatcher;
	exports.dataItem = dataItem;

	var _ = __webpack_require__(20);

	function accessor(data, field) {
	  var value = data;

	  if (typeof field === 'function') value = field(data);else if (data == null) value = data;else if (typeof field === 'string' && typeof data === 'object' && field in data) value = data[field];

	  return value;
	}

	function dataValue(item, valueField) {
	  return valueField && item && _.has(item, valueField) ? item[valueField] : item;
	}

	function dataText(item, textField) {
	  var value = accessor(item, textField);
	  return value == null ? '' : value + '';
	}

	function dataIndexOf(data, item, valueField) {
	  var idx = -1,
	      len = data.length,
	      finder = function finder(datum) {
	    return valueMatcher(item, datum, valueField);
	  };

	  while (++idx < len) if (finder(data[idx])) return idx;

	  return -1;
	}

	/**
	 * I don't know that the shallow equal makes sense here but am too afraid to
	 * remove it.
	 */

	function valueMatcher(a, b, valueField) {
	  return _.isShallowEqual(dataValue(a, valueField), dataValue(b, valueField));
	}

	function dataItem(data, item, valueField) {
	  var first = data[0],
	      idx;

	  // make an attempt to see if we were passed in dataItem vs just a valueField value
	  // either an object with the right prop, or a primitive
	  // { valueField: 5 } || "hello" [ "hello" ]
	  if (_.has(item, valueField) || typeof first === typeof val) return item;

	  idx = dataIndexOf(data, dataValue(item, valueField), valueField);

	  if (idx !== -1) return data[idx];

	  return item;
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.notify = notify;
	exports.instanceId = instanceId;
	exports.isFirstFocusedRender = isFirstFocusedRender;

	var _ = __webpack_require__(20);

	function notify(handler, args) {
	  handler && handler.apply(null, [].concat(args));
	}

	function instanceId(component) {
	  var suffix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	  component.__id || (component.__id = _.uniqueId('rw_'));
	  return (component.props.id || component.__id) + suffix;
	}

	function isFirstFocusedRender(component) {
	  return component._firstFocus || component.state.focused && (component._firstFocus = true);
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.isDisabled = isDisabled;
	exports.isReadOnly = isReadOnly;
	exports.isDisabledItem = isDisabledItem;
	exports.isReadOnlyItem = isReadOnlyItem;
	exports.contains = contains;
	exports.move = move;

	var _dataHelpers = __webpack_require__(37);

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
	    return _dataHelpers.valueMatcher(item, value, valueField);
	  }) : _dataHelpers.valueMatcher(item, values, valueField);
	}

	function move(dir, item, props, list) {
	  var isDisabledOrReadonly = function isDisabledOrReadonly(item) {
	    return isDisabledItem(item, props) || isReadOnlyItem(item, props);
	  },
	      stop = dir === 'next' ? list.last() : list.first(),
	      next = list[dir](item);

	  while (next !== stop && isDisabledOrReadonly(next)) next = list[dir](next);

	  return isDisabledOrReadonly(next) ? item : next;
	}

	var widgetEnabled = interactionDecorator(true);

	exports.widgetEnabled = widgetEnabled;
	var widgetEditable = interactionDecorator(false);

	exports.widgetEditable = widgetEditable;
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
	      (function () {
	        var init = desc.initializer;
	        desc.initializer = function () {
	          return wrap(init());
	        };
	      })();
	    } else desc.value = wrap(desc.value);
	    return desc;
	  };
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _utilFilter = __webpack_require__(34);

	var _utilFilter2 = babelHelpers.interopRequireDefault(_utilFilter);

	var _utilDataHelpers = __webpack_require__(37);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilInteraction = __webpack_require__(39);

	var EMPTY_VALUE = {};

	var isDisabledOrReadonly = function isDisabledOrReadonly(item, props) {
	  return _utilInteraction.isDisabledItem(item, props) || _utilInteraction.isReadOnlyItem(item, props);
	};

	exports['default'] = {

	  propTypes: {
	    textField: _utilPropTypes2['default'].accessor,
	    valueField: _utilPropTypes2['default'].accessor,
	    disabled: _utilPropTypes2['default'].disabled.acceptsArray,
	    readOnly: _utilPropTypes2['default'].readOnly.acceptsArray
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

	    while (nextIdx > -1 && (isDisabledOrReadonly(data[nextIdx], this.props) || !matches(data[nextIdx]))) nextIdx--;

	    return nextIdx >= 0 ? data[nextIdx] : item;
	  },

	  next: function next(item, word) {
	    var data = this._data(),
	        nextIdx = data.indexOf(item) + 1,
	        len = data.length,
	        matches = matcher(word, item, this.props.textField);

	    while (nextIdx < len && (isDisabledOrReadonly(data[nextIdx], this.props) || !matches(data[nextIdx]))) nextIdx++;

	    return nextIdx < len ? data[nextIdx] : item;
	  }
	};

	function matcher(word, item, textField) {
	  if (!word) return function () {
	    return true;
	  };

	  word = word.toLowerCase();
	  return function (item) {
	    return _utilFilter2['default'].startsWith(_utilDataHelpers.dataText(item, textField).toLowerCase(), word);
	  };
	}
	module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var shape = _react2['default'].PropTypes.shape({
	  //setActive: React.PropTypes.func,
	  reconcile: _react2['default'].PropTypes.func
	});

	function defaultReconcile(key, id) {
	  return id;
	}

	function flushAriaToNode(id, nodeOrComponent, ctx) {
	  var node = typeof nodeOrComponent === 'function' ? nodeOrComponent(ctx) : typeof nodeOrComponent === 'string' ? ctx.refs[nodeOrComponent] : ctx;

	  if (node) {
	    if (id) _utilCompat2['default'].findDOMNode(node).setAttribute('aria-activedescendant', id);else _utilCompat2['default'].findDOMNode(node).removeAttribute('aria-activedescendant');
	  }
	}

	exports['default'] = function (nodeOrComponent) {
	  var reconcileChildren = arguments.length <= 1 || arguments[1] === undefined ? defaultReconcile : arguments[1];

	  return {
	    propTypes: {
	      ariaActiveDescendantKey: _react2['default'].PropTypes.string.isRequired
	    },

	    contextTypes: {
	      activeDescendants: shape
	    },

	    childContextTypes: {
	      activeDescendants: shape
	    },

	    ariaActiveDescendant: function ariaActiveDescendant(id) {
	      var key = arguments.length <= 1 || arguments[1] === undefined ? this.props.ariaActiveDescendantKey : arguments[1];
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

	module.exports = exports['default'];

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _ListOption = __webpack_require__(36);

	var _ListOption2 = babelHelpers.interopRequireDefault(_ListOption);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _warning = __webpack_require__(43);

	var _warning2 = babelHelpers.interopRequireDefault(_warning);

	var _utilDataHelpers = __webpack_require__(37);

	var _utilWidgetHelpers = __webpack_require__(38);

	var _utilInteraction = __webpack_require__(39);

	var optionId = function optionId(id, idx) {
	  return id + '__option__' + idx;
	};

	exports['default'] = _react2['default'].createClass({

	  displayName: 'List',

	  mixins: [__webpack_require__(40), __webpack_require__(41)()],

	  propTypes: {
	    data: _react2['default'].PropTypes.array,
	    onSelect: _react2['default'].PropTypes.func,
	    onMove: _react2['default'].PropTypes.func,

	    optionComponent: _utilPropTypes2['default'].elementType,
	    itemComponent: _utilPropTypes2['default'].elementType,
	    groupComponent: _utilPropTypes2['default'].elementType,

	    selected: _react2['default'].PropTypes.any,
	    focused: _react2['default'].PropTypes.any,

	    valueField: _utilPropTypes2['default'].accessor,
	    textField: _utilPropTypes2['default'].accessor,

	    disabled: _utilPropTypes2['default'].disabled.acceptsArray,
	    readOnly: _utilPropTypes2['default'].readOnly.acceptsArray,

	    groupBy: _utilPropTypes2['default'].accessor,

	    messages: _react2['default'].PropTypes.shape({
	      emptyList: _utilPropTypes2['default'].message
	    })
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      onSelect: function onSelect() {},
	      data: [],
	      optionComponent: _ListOption2['default'],
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

	    var _props = this.props;
	    var className = _props.className;
	    var role = _props.role;
	    var data = _props.data;
	    var messages = _props.messages;
	    var onSelect = _props.onSelect;
	    var selectedIndex = _props.selectedIndex;
	    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'role', 'data', 'messages', 'onSelect', 'selectedIndex']);
	    var id = _utilWidgetHelpers.instanceId(this);var _state = this.state;
	    var sortedKeys = _state.sortedKeys;
	    var groups = _state.groups;

	    var items = [],
	        idx = -1,
	        group = undefined;

	    this._currentActiveID = null;

	    if (data.length) {
	      items = sortedKeys.reduce(function (items, key) {
	        group = groups[key];
	        items.push(_this._renderGroupHeader(key));

	        for (var itemIdx = 0; itemIdx < group.length; itemIdx++) items.push(_this._renderItem(key, group[itemIdx], ++idx));

	        return items;
	      }, []);
	    } else items = _react2['default'].createElement(
	      'li',
	      { className: 'rw-list-empty' },
	      _util_2['default'].result(messages.emptyList, this.props)
	    );

	    return _react2['default'].createElement(
	      'ul',
	      babelHelpers._extends({
	        ref: 'scrollable',
	        id: id,
	        tabIndex: '-1',
	        className: _classnames2['default'](className, 'rw-list', 'rw-list-grouped'),
	        role: role === undefined ? 'listbox' : role
	      }, props),
	      items
	    );
	  },

	  _renderGroupHeader: function _renderGroupHeader(group) {
	    var GroupComponent = this.props.groupComponent,
	        id = _utilWidgetHelpers.instanceId(this);

	    return _react2['default'].createElement(
	      'li',
	      {
	        key: 'item_' + group,
	        tabIndex: '-1',
	        role: 'separator',
	        id: id + '_group_' + group,
	        className: 'rw-list-optgroup'
	      },
	      GroupComponent ? _react2['default'].createElement(GroupComponent, { item: group }) : group
	    );
	  },

	  _renderItem: function _renderItem(group, item, idx) {
	    var _props2 = this.props;
	    var focused = _props2.focused;
	    var selected = _props2.selected;
	    var onSelect = _props2.onSelect;
	    var textField = _props2.textField;
	    var valueField = _props2.valueField;
	    var ItemComponent = _props2.itemComponent;
	    var Option = _props2.optionComponent;

	    var currentID = optionId(_utilWidgetHelpers.instanceId(this), idx),
	        isDisabled = _utilInteraction.isDisabledItem(item, this.props),
	        isReadOnly = _utilInteraction.isReadOnlyItem(item, this.props);

	    if (focused === item) this._currentActiveID = currentID;

	    return _react2['default'].createElement(
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
	      ItemComponent ? _react2['default'].createElement(ItemComponent, {
	        item: item,
	        value: _utilDataHelpers.dataValue(item, valueField),
	        text: _utilDataHelpers.dataText(item, textField),
	        disabled: isDisabled,
	        readOnly: isReadOnly
	      }) : _utilDataHelpers.dataText(item, textField)
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

	    _warning2['default'](typeof groupBy !== 'string' || !data.length || _util_2['default'].has(data[0], groupBy), '[React Widgets] You are seem to be trying to group this list by a ' + ('property `' + groupBy + '` that doesn\'t exist in the dataset items, this may be a typo'));

	    return data.reduce(function (grps, item) {
	      var group = iter(item);

	      _util_2['default'].has(grps, group) ? grps[group].push(item) : (keys.push(group), grps[group] = [item]);

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

	    _utilWidgetHelpers.notify(this.props.onMove, [selected, _utilCompat2['default'].findDOMNode(this), this.props.focused]);
	  },

	  getItemDOMNode: function getItemDOMNode(item) {
	    var list = _utilCompat2['default'].findDOMNode(this),
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

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;
	exports['default'] = validateListComponent;

	var _invariant = __webpack_require__(19);

	var _invariant2 = babelHelpers.interopRequireDefault(_invariant);

	var METHODS = ['next', 'prev', 'first', 'last'];

	function validateListComponent(list) {
	  if (process.env.NODE_ENV !== 'production') {
	    METHODS.forEach(function (method) {
	      return _invariant2['default'](typeof list[method] === 'function', 'List components must implement a `' + method + '()` method');
	    });
	  }
	}

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createUncontrollable = __webpack_require__(46);

	var _createUncontrollable2 = _interopRequireDefault(_createUncontrollable);

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

	  if (component.isMounted()) component.forceUpdate();
	}

	exports['default'] = _createUncontrollable2['default']([mixin], set);
	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = createUncontrollable;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _react = __webpack_require__(21);

	var _react2 = _interopRequireDefault(_react);

	var _utils = __webpack_require__(47);

	var utils = _interopRequireWildcard(_utils);

	function createUncontrollable(mixins, set) {

	  return uncontrollable;

	  function uncontrollable(Component, controlledValues) {
	    var methods = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

	    var displayName = Component.displayName || Component.name || 'Component',
	        basePropTypes = utils.getType(Component).propTypes,
	        propTypes;

	    propTypes = utils.uncontrolledPropTypes(controlledValues, basePropTypes, displayName);

	    methods = utils.transform(methods, function (obj, method) {
	      obj[method] = function () {
	        var _refs$inner;

	        return (_refs$inner = this.refs.inner)[method].apply(_refs$inner, arguments);
	      };
	    }, {});

	    var component = _react2['default'].createClass(_extends({

	      displayName: 'Uncontrolled(' + displayName + ')',

	      mixins: mixins,

	      propTypes: propTypes

	    }, methods, {

	      componentWillMount: function componentWillMount() {
	        var props = this.props,
	            keys = Object.keys(controlledValues);

	        this._values = utils.transform(keys, function (values, key) {
	          values[key] = props[utils.defaultKey(key)];
	        }, {});
	      },

	      /**
	       * If a prop switches from controlled to Uncontrolled
	       * reset its value to the defaultValue
	       */
	      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        var _this = this;

	        var props = this.props,
	            keys = Object.keys(controlledValues);

	        keys.forEach(function (key) {
	          if (utils.getValue(nextProps, key) === undefined && utils.getValue(props, key) !== undefined) {
	            _this._values[key] = nextProps[utils.defaultKey(key)];
	          }
	        });
	      },

	      render: function render() {
	        var _this2 = this;

	        var newProps = {};
	        var _props = this.props;
	        var valueLink = _props.valueLink;
	        var checkedLink = _props.checkedLink;

	        var props = _objectWithoutProperties(_props, ['valueLink', 'checkedLink']);

	        utils.each(controlledValues, function (handle, propName) {
	          var linkPropName = utils.getLinkName(propName),
	              prop = _this2.props[propName];

	          if (linkPropName && !isProp(_this2.props, propName) && isProp(_this2.props, linkPropName)) {
	            prop = _this2.props[linkPropName].value;
	          }

	          newProps[propName] = prop !== undefined ? prop : _this2._values[propName];

	          newProps[handle] = setAndNotify.bind(_this2, propName);
	        });

	        newProps = _extends({}, props, newProps, { ref: 'inner' });

	        return _react2['default'].createElement(Component, newProps);
	      }

	    }));

	    component.ControlledComponent = Component;

	    /**
	     * useful when wrapping a Component and you want to control
	     * everything
	     */
	    component.deferControlTo = function (newComponent, additions, nextMethods) {
	      if (additions === undefined) additions = {};

	      return uncontrollable(newComponent, _extends({}, controlledValues, additions), nextMethods);
	    };

	    return component;

	    function setAndNotify(propName, value) {
	      var linkName = utils.getLinkName(propName),
	          handler = this.props[controlledValues[propName]];

	      if (linkName && isProp(this.props, linkName) && !handler) {
	        handler = this.props[linkName].requestChange;
	      }

	      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        args[_key - 2] = arguments[_key];
	      }

	      set(this, propName, handler, value, args);
	    }

	    function isProp(props, prop) {
	      return props[prop] !== undefined;
	    }
	  }
	}

	module.exports = exports['default'];

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.customPropType = customPropType;
	exports.uncontrolledPropTypes = uncontrolledPropTypes;
	exports.getType = getType;
	exports.getValue = getValue;
	exports.getLinkName = getLinkName;
	exports.defaultKey = defaultKey;
	exports.chain = chain;
	exports.transform = transform;
	exports.each = each;
	exports.has = has;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(21);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(19);

	var _invariant2 = _interopRequireDefault(_invariant);

	function customPropType(handler, propType, name) {

	  return function (props, propName) {

	    if (props[propName] !== undefined) {
	      if (!props[handler]) {
	        return new Error('You have provided a `' + propName + '` prop to ' + '`' + name + '` without an `' + handler + '` handler. This will render a read-only field. ' + 'If the field should be mutable use `' + defaultKey(propName) + '`. Otherwise, set `' + handler + '`');
	      }

	      return propType && propType(props, propName, name);
	    }
	  };
	}

	function uncontrolledPropTypes(controlledValues, basePropTypes, displayName) {
	  var propTypes = {};

	  if (process.env.NODE_ENV !== 'production' && basePropTypes) {
	    transform(controlledValues, function (obj, handler, prop) {
	      var type = basePropTypes[prop];

	      _invariant2['default'](typeof handler === 'string' && handler.trim().length, 'Uncontrollable - [%s]: the prop `%s` needs a valid handler key name in order to make it uncontrollable', displayName, prop);

	      obj[prop] = customPropType(handler, type, displayName);

	      if (type !== undefined) obj[defaultKey(prop)] = type;
	    }, propTypes);
	  }

	  return propTypes;
	}

	var version = _react2['default'].version.split('.').map(parseFloat);

	exports.version = version;

	function getType(component) {
	  if (version[0] === 0 && version[1] >= 13) return component;

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

	  for (var key in obj) if (has(obj, key)) cb.call(thisArg, obj[key], key, obj);
	}

	function has(o, k) {
	  return o ? Object.prototype.hasOwnProperty.call(o, k) : false;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(20);

	var has = _require.has;

	module.exports = {

	  componentWillUnmount: function componentWillUnmount() {
	    var timers = this._timers || {};

	    this._unmounted = true;

	    for (var k in timers) if (has(timers, k)) this.clearTimeout(k);
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

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(20);

	//backport PureRenderEqual
	module.exports = {

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return !_.isShallowEqual(this.props, nextProps) || !_.isShallowEqual(this.state, nextState);
	  }
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _utilFilter = __webpack_require__(34);

	var _utilFilter2 = babelHelpers.interopRequireDefault(_utilFilter);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilDataHelpers = __webpack_require__(37);

	var dflt = function dflt(f) {
	  return f === true ? 'startsWith' : f ? f : 'eq';
	};

	module.exports = {

	  propTypes: {
	    data: _react2['default'].PropTypes.array,
	    value: _react2['default'].PropTypes.any,
	    filter: _utilPropTypes2['default'].filter,
	    caseSensitive: _react2['default'].PropTypes.bool,
	    minLength: _react2['default'].PropTypes.number
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      caseSensitive: false,
	      minLength: 1
	    };
	  },

	  filterIndexOf: function filterIndexOf(items, searchTerm) {
	    var idx = -1,
	        matches = typeof this.props.filter === 'function' ? this.props.filter : getFilter(_utilFilter2['default'][dflt(this.props.filter)], searchTerm, this);

	    if (!searchTerm || !searchTerm.trim() || this.props.filter && searchTerm.length < (this.props.minLength || 1)) return -1;

	    items.every(function (item, i) {
	      if (matches(item, searchTerm, i)) return idx = i, false;

	      return true;
	    });

	    return idx;
	  },

	  filter: function filter(items, searchTerm) {
	    var matches = typeof this.props.filter === 'string' ? getFilter(_utilFilter2['default'][this.props.filter], searchTerm, this) : this.props.filter;

	    if (!matches || !searchTerm || !searchTerm.trim() || searchTerm.length < (this.props.minLength || 1)) return items;

	    return items.filter(function (item, idx) {
	      return matches(item, searchTerm, idx);
	    });
	  }
	};

	function getFilter(matcher, searchTerm, ctx) {
	  searchTerm = !ctx.props.caseSensitive ? searchTerm.toLowerCase() : searchTerm;

	  return function (item) {
	    var val = _utilDataHelpers.dataText(item, ctx.props.textField);

	    if (!ctx.props.caseSensitive) val = val.toLowerCase();

	    return matcher(val, searchTerm);
	  };
	}

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _domHelpersUtilScrollTo = __webpack_require__(52);

	var _domHelpersUtilScrollTo2 = babelHelpers.interopRequireDefault(_domHelpersUtilScrollTo);

	exports['default'] = {

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
	        state.scrollCancel = _domHelpersUtilScrollTo2['default'](selected, list);
	      }
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var getOffset = __webpack_require__(29),
	    height = __webpack_require__(28),
	    getScrollParent = __webpack_require__(53),
	    scrollTop = __webpack_require__(54),
	    raf = __webpack_require__(55),
	    getWindow = __webpack_require__(30);

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

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var css = __webpack_require__(7),
	    height = __webpack_require__(28);

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

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var getWindow = __webpack_require__(30);

	module.exports = function scrollTop(node, val) {
	  var win = getWindow(node);

	  if (val === undefined) return win ? 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop : node.scrollTop;

	  if (win) win.scrollTo('pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft, val);else node.scrollTop = val;
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var canUseDOM = __webpack_require__(15);

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

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(21);

	module.exports = {

	  propTypes: {
	    isRtl: React.PropTypes.bool
	  },

	  contextTypes: {
	    isRtl: React.PropTypes.bool
	  },

	  childContextTypes: {
	    isRtl: React.PropTypes.bool
	  },

	  getChildContext: function getChildContext() {
	    return {
	      isRtl: this.props.isRtl || this.context && this.context.isRtl
	    };
	  },

	  isRtl: function isRtl() {
	    return !!(this.props.isRtl || this.context && this.context.isRtl);
	  }

	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;
	exports['default'] = FocusMixin;

	var _utilWidgetHelpers = __webpack_require__(38);

	var _utilInteraction = __webpack_require__(39);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	function FocusMixin(_ref) {
	  var willHandle = _ref.willHandle;
	  var didHandle = _ref.didHandle;

	  function _handleFocus(inst, focused, event) {
	    var handler = inst.props[focused ? 'onFocus' : 'onBlur'];

	    if (handler && event) event.persist();

	    if (willHandle && willHandle.call(inst, focused, event) === false) return;

	    inst.setTimeout('focus', function () {
	      _utilCompat2['default'].batchedUpdates(function () {
	        if (didHandle) didHandle.call(inst, focused, event);

	        if (focused !== inst.state.focused) {
	          _utilWidgetHelpers.notify(handler, event);
	          if (inst.isMounted()) inst.setState({ focused: focused });
	        }
	      });
	    });
	  }

	  return babelHelpers.createDecoratedObject([{
	    key: 'handleBlur',
	    decorators: [_utilInteraction.widgetEnabled],
	    value: function handleBlur(event) {
	      _handleFocus(this, false, event);
	    }
	  }, {
	    key: 'handleFocus',
	    decorators: [_utilInteraction.widgetEnabled],
	    value: function handleFocus(event) {
	      _handleFocus(this, true, event);
	    }
	  }]);
	}

	module.exports = exports['default'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilFilter = __webpack_require__(34);

	var _utilFilter2 = babelHelpers.interopRequireDefault(_utilFilter);

	var _Popup = __webpack_require__(27);

	var _Popup2 = babelHelpers.interopRequireDefault(_Popup);

	var _WidgetButton = __webpack_require__(59);

	var _WidgetButton2 = babelHelpers.interopRequireDefault(_WidgetButton);

	var _ComboboxInput = __webpack_require__(60);

	var _ComboboxInput2 = babelHelpers.interopRequireDefault(_ComboboxInput);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _List = __webpack_require__(35);

	var _List2 = babelHelpers.interopRequireDefault(_List);

	var _ListGroupable = __webpack_require__(42);

	var _ListGroupable2 = babelHelpers.interopRequireDefault(_ListGroupable);

	var _utilValidateListInterface = __webpack_require__(44);

	var _utilValidateListInterface2 = babelHelpers.interopRequireDefault(_utilValidateListInterface);

	var _uncontrollable = __webpack_require__(45);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _utilDataHelpers = __webpack_require__(37);

	var _utilInteraction = __webpack_require__(39);

	var _utilWidgetHelpers = __webpack_require__(38);

	var defaultSuggest = function defaultSuggest(f) {
	  return f === true ? 'startsWith' : f ? f : 'eq';
	};

	var omit = _util_2['default'].omit;
	var pick = _util_2['default'].pick;

	var propTypes = {
	  //-- controlled props -----------
	  value: _react2['default'].PropTypes.any,
	  onChange: _react2['default'].PropTypes.func,
	  open: _react2['default'].PropTypes.bool,
	  onToggle: _react2['default'].PropTypes.func,
	  //------------------------------------

	  itemComponent: _utilPropTypes2['default'].elementType,
	  listComponent: _utilPropTypes2['default'].elementType,

	  groupComponent: _utilPropTypes2['default'].elementType,
	  groupBy: _utilPropTypes2['default'].accessor,

	  data: _react2['default'].PropTypes.array,
	  valueField: _react2['default'].PropTypes.string,
	  textField: _utilPropTypes2['default'].accessor,
	  name: _react2['default'].PropTypes.string,

	  onSelect: _react2['default'].PropTypes.func,

	  autoFocus: _react2['default'].PropTypes.bool,
	  disabled: _utilPropTypes2['default'].disabled.acceptsArray,
	  readOnly: _utilPropTypes2['default'].readOnly.acceptsArray,

	  suggest: _utilPropTypes2['default'].filter,
	  filter: _utilPropTypes2['default'].filter,

	  busy: _react2['default'].PropTypes.bool,

	  dropUp: _react2['default'].PropTypes.bool,
	  duration: _react2['default'].PropTypes.number, //popup

	  placeholder: _react2['default'].PropTypes.string,

	  messages: _react2['default'].PropTypes.shape({
	    open: _utilPropTypes2['default'].message,
	    emptyList: _utilPropTypes2['default'].message,
	    emptyFilter: _utilPropTypes2['default'].message
	  })
	};

	var ComboBox = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
	  key: 'displayName',
	  initializer: function initializer() {
	    return 'ComboBox';
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(48), __webpack_require__(50), __webpack_require__(51), __webpack_require__(56), __webpack_require__(41)('input'), __webpack_require__(57)({
	      willHandle: function willHandle(focused) {
	        // not suggesting anymore
	        !focused && this.refs.input.accept();
	      },
	      didHandle: function didHandle(focused) {
	        if (!focused) this.close();
	      }
	    })];
	  }
	}, {
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    var _props = this.props;
	    var value = _props.value;
	    var data = _props.data;
	    var valueField = _props.valueField;
	    var items = this.process(data, value);
	    var idx = _utilDataHelpers.dataIndexOf(items, value, valueField);

	    return {
	      selectedItem: items[idx],
	      focusedItem: items[! ~idx ? 0 : idx],
	      processedData: items,
	      open: false
	    };
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {
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
	  }
	}, {
	  key: 'componentDidUpdate',
	  value: function componentDidUpdate() {
	    this.refs.list && _utilValidateListInterface2['default'](this.refs.list);
	  }
	}, {
	  key: 'shouldComponentUpdate',
	  value: function shouldComponentUpdate(nextProps, nextState) {
	    var isSuggesting = this.refs.input && this.refs.input.isSuggesting(),
	        stateChanged = !_util_2['default'].isShallowEqual(nextState, this.state),
	        valueChanged = !_util_2['default'].isShallowEqual(nextProps, this.props);

	    return isSuggesting || stateChanged || valueChanged;
	  }
	}, {
	  key: 'componentWillReceiveProps',
	  value: function componentWillReceiveProps(nextProps) {
	    var value = nextProps.value;
	    var data = nextProps.data;
	    var valueField = nextProps.valueField;
	    var textField = nextProps.textField;

	    var rawIdx = _utilDataHelpers.dataIndexOf(data, value, valueField),
	        valueItem = rawIdx === -1 ? nextProps.value : nextProps.data[rawIdx],
	        isSuggesting = this.refs.input.isSuggesting(),
	        items = this.process(nextProps.data, nextProps.value, (rawIdx === -1 || isSuggesting) && _utilDataHelpers.dataText(valueItem, textField)),
	        idx = _utilDataHelpers.dataIndexOf(items, value, valueField),
	        focused = this.filterIndexOf(items, _utilDataHelpers.dataText(valueItem, textField));

	    this._searchTerm = '';

	    this.setState({
	      processedData: items,
	      selectedItem: items[idx],
	      focusedItem: items[idx === -1 ? focused !== -1 ? focused : 0 // focus the closest match
	      : idx]
	    });
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _cx,
	        _this = this;

	    var _props2 = this.props;
	    var className = _props2.className;
	    var tabIndex = _props2.tabIndex;
	    var filter = _props2.filter;
	    var suggest = _props2.suggest;
	    var valueField = _props2.valueField;
	    var textField = _props2.textField;
	    var groupBy = _props2.groupBy;
	    var messages = _props2.messages;
	    var data = _props2.data;
	    var busy = _props2.busy;
	    var dropUp = _props2.dropUp;
	    var name = _props2.name;
	    var autoFocus = _props2.autoFocus;
	    var placeholder = _props2.placeholder;
	    var value = _props2.value;
	    var open = _props2.open;
	    var List = _props2.listComponent;

	    List = List || groupBy && _ListGroupable2['default'] || _List2['default'];

	    var elementProps = omit(this.props, Object.keys(propTypes));
	    var listProps = pick(this.props, Object.keys(List.propTypes));
	    var popupProps = pick(this.props, Object.keys(_Popup2['default'].propTypes));

	    var _state = this.state;
	    var focusedItem = _state.focusedItem;
	    var selectedItem = _state.selectedItem;
	    var focused = _state.focused;

	    var items = this._data(),
	        disabled = _utilInteraction.isDisabled(this.props),
	        readOnly = _utilInteraction.isReadOnly(this.props),
	        valueItem = _utilDataHelpers.dataItem(data, value, valueField),
	        // take value from the raw data
	    inputID = _utilWidgetHelpers.instanceId(this, '_input'),
	        listID = _utilWidgetHelpers.instanceId(this, '_listbox'),
	        completeType = suggest ? filter ? 'both' : 'inline' : filter ? 'list' : '';

	    var shouldRenderList = _utilWidgetHelpers.isFirstFocusedRender(this) || open;

	    messages = msgs(messages);

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, elementProps, {
	        ref: 'element',
	        onKeyDown: this._keyDown,
	        onBlur: this.handleBlur,
	        onFocus: this.handleFocus,
	        tabIndex: '-1',
	        className: _classnames2['default'](className, 'rw-combobox', 'rw-widget', (_cx = {
	          'rw-state-focus': focused,
	          'rw-state-disabled': disabled,
	          'rw-state-readonly': readOnly,
	          'rw-rtl': this.isRtl()

	        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx))
	      }),
	      _react2['default'].createElement(
	        _WidgetButton2['default'],
	        {
	          tabIndex: '-1',
	          className: 'rw-select',
	          onClick: this.toggle,
	          disabled: !!(disabled || readOnly)
	        },
	        _react2['default'].createElement(
	          'i',
	          { className: _classnames2['default']('rw-i rw-i-caret-down', { 'rw-loading': busy }) },
	          _react2['default'].createElement(
	            'span',
	            { className: 'rw-sr' },
	            _util_2['default'].result(messages.open, this.props)
	          )
	        )
	      ),
	      _react2['default'].createElement(_ComboboxInput2['default'], {
	        ref: 'input',
	        id: inputID,
	        autoFocus: autoFocus,
	        tabIndex: tabIndex,
	        suggest: suggest,
	        name: name,
	        role: 'combobox',
	        'aria-owns': listID,
	        'aria-busy': !!busy,
	        'aria-autocomplete': completeType,
	        'aria-expanded': open,
	        'aria-haspopup': true,
	        placeholder: placeholder,
	        disabled: disabled,
	        readOnly: readOnly,
	        className: 'rw-input',
	        value: _utilDataHelpers.dataText(valueItem, textField),
	        onChange: this._inputTyping,
	        onKeyDown: this._inputKeyDown
	      }),
	      _react2['default'].createElement(
	        _Popup2['default'],
	        babelHelpers._extends({}, popupProps, {
	          onOpening: function () {
	            return _this.refs.list.forceUpdate();
	          }
	        }),
	        _react2['default'].createElement(
	          'div',
	          null,
	          shouldRenderList && _react2['default'].createElement(List, babelHelpers._extends({ ref: 'list'
	          }, listProps, {
	            id: listID,
	            data: items,
	            selected: selectedItem,
	            focused: focusedItem,
	            'aria-hidden': !open,
	            'aria-labelledby': inputID,
	            'aria-live': open && 'polite',
	            onSelect: this._onSelect,
	            onMove: this._scrollTo,
	            messages: {
	              emptyList: data.length ? messages.emptyFilter : messages.emptyList
	            } }))
	        )
	      )
	    );
	  }
	}, {
	  key: '_onSelect',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _onSelect(data) {
	    this.close();
	    _utilWidgetHelpers.notify(this.props.onSelect, data);
	    this.change(data);
	    this.focus();
	  }
	}, {
	  key: '_inputKeyDown',
	  value: function _inputKeyDown(e) {
	    this._deleting = e.key === 'Backspace' || e.key === 'Delete';
	    this._isTyping = true;
	  }
	}, {
	  key: '_inputTyping',
	  value: function _inputTyping(e) {
	    var _props3 = this.props;
	    var data = _props3.data;
	    var textField = _props3.textField;

	    var shouldSuggest = !!this.props.suggest,
	        strVal = e.target.value,
	        suggestion;

	    suggestion = this._deleting || !shouldSuggest ? strVal : this.suggest(this._data(), strVal);

	    suggestion = suggestion || strVal;

	    data = _util_2['default'].find(data, function (item) {
	      return _utilDataHelpers.dataText(item, textField).toLowerCase() === suggestion.toLowerCase();
	    });

	    this.change(!this._deleting && data ? data : strVal, true);

	    this.open();
	  }
	}, {
	  key: 'focus',
	  value: function focus() {
	    this.refs.input.focus();
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
	    var self = this,
	        key = e.key,
	        alt = e.altKey,
	        list = this.refs.list,
	        focusedItem = this.state.focusedItem,
	        selectedItem = this.state.selectedItem,
	        isOpen = this.props.open;

	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (key === 'End') if (isOpen) this.setState({ focusedItem: list.last() });else select(list.last(), true);else if (key === 'Home') if (isOpen) this.setState({ focusedItem: list.first() });else select(list.first(), true);else if (key === 'Escape' && isOpen) this.close();else if (key === 'Enter' && isOpen) {
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
	      if (!item) return self.change(_utilCompat2['default'].findDOMNode(self.refs.input).value, false);

	      self.refs.input.accept(true); //removes caret

	      if (fromList) return self._onSelect(item);

	      self.change(item, false);
	    }
	  }
	}, {
	  key: 'change',
	  value: function change(data, typing) {
	    this._typedChange = !!typing;
	    _utilWidgetHelpers.notify(this.props.onChange, data);
	  }
	}, {
	  key: 'open',
	  value: function open() {
	    if (!this.props.open) _utilWidgetHelpers.notify(this.props.onToggle, true);
	  }
	}, {
	  key: 'close',
	  value: function close() {
	    if (this.props.open) _utilWidgetHelpers.notify(this.props.onToggle, false);
	  }
	}, {
	  key: 'toggle',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function toggle() {
	    this.focus();

	    this.props.open ? this.close() : this.open();
	  }
	}, {
	  key: 'suggest',
	  value: function suggest(data, value) {
	    var _props4 = this.props;
	    var textField = _props4.textField;
	    var suggest = _props4.suggest;
	    var minLength = _props4.minLength;

	    var word = _utilDataHelpers.dataText(value, textField),
	        suggestion;

	    suggest = defaultSuggest(suggest);

	    if (!(word || '').trim() || word.length < (minLength || 1)) return '';

	    suggestion = typeof value === 'string' ? _util_2['default'].find(data, getFilter(suggest, word, textField)) : value;

	    if (suggestion && (!this.state || !this.state.deleting)) return _utilDataHelpers.dataText(suggestion, textField);

	    return '';
	  }
	}, {
	  key: '_data',
	  value: function _data() {
	    return this.state.processedData;
	  }
	}, {
	  key: 'process',
	  value: function process(data, values, searchTerm) {
	    if (this.props.filter && searchTerm) data = this.filter(data, searchTerm);

	    return data;
	  }
	}]));

	exports['default'] = _uncontrollable2['default'](ComboBox, { open: 'onToggle', value: 'onChange' }, ['focus']);

	function msgs(msgs) {
	  return babelHelpers._extends({
	    open: 'open combobox',
	    emptyList: 'There are no items in this list',
	    emptyFilter: 'The filter returned no results'
	  }, msgs);
	}

	function getFilter(suggest, word, textField) {
	  return typeof suggest === 'string' ? function (item) {
	    return _utilFilter2['default'][suggest](_utilDataHelpers.dataText(item, textField).toLowerCase(), word.toLowerCase());
	  } : function (item) {
	    return suggest(item, word);
	  };
	}
	module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	exports['default'] = _react2['default'].createClass({
	  displayName: 'WidgetButton',

	  render: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var children = _props.children;
	    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'children']);

	    return _react2['default'].createElement(
	      'button',
	      babelHelpers._extends({}, props, { type: 'button', className: _classnames2['default'](className, 'rw-btn') }),
	      children
	    );
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _utilCaret = __webpack_require__(61);

	var _utilCaret2 = babelHelpers.interopRequireDefault(_utilCaret);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	exports['default'] = _react2['default'].createClass({

	  displayName: 'ComboboxInput',

	  propTypes: {
	    value: _react2['default'].PropTypes.string,
	    onChange: _react2['default'].PropTypes.func.isRequired
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    var input = _utilCompat2['default'].findDOMNode(this),
	        val = this.props.value;

	    if (this.isSuggesting()) {
	      var start = val.toLowerCase().indexOf(this._last.toLowerCase()) + this._last.length,
	          end = val.length - start;

	      if (start >= 0) {
	        _utilCaret2['default'](input, start, start + end);
	      }
	    }
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      value: ''
	    };
	  },

	  render: function render() {
	    return _react2['default'].createElement('input', babelHelpers._extends({}, this.props, {
	      type: 'text',
	      autoComplete: 'off',
	      'aria-disabled': this.props.disabled,
	      'aria-readonly': this.props.readOnly,
	      className: this.props.className + ' rw-input',
	      onKeyDown: this.props.onKeyDown,
	      onChange: this._change,
	      value: this.props.value == null ? '' : this.props.value
	    }));
	  },

	  isSuggesting: function isSuggesting() {
	    var val = this.props.value,
	        isSuggestion = this._last != null && val.toLowerCase().indexOf(this._last.toLowerCase()) !== -1;

	    return this.props.suggest && isSuggestion;
	  },

	  accept: function accept(removeCaret) {
	    var val = _utilCompat2['default'].findDOMNode(this).value || '',
	        end = val.length;

	    this._last = null;
	    removeCaret && _utilCaret2['default'](_utilCompat2['default'].findDOMNode(this), end, end);
	  },

	  _change: function _change(e) {
	    var val = e.target.value,
	        pl = !!this.props.placeholder;

	    // IE fires input events when setting/unsetting placeholders.
	    // issue #112
	    if (pl && !val && val === (this.props.value || '')) return;

	    this._last = val;
	    this.props.onChange(e, val);
	  },

	  focus: function focus() {
	    _utilCompat2['default'].findDOMNode(this).focus();
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports) {

	/*eslint-disable no-empty */
	'use strict';

	exports.__esModule = true;
	exports['default'] = caret;

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

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _VIEW, _OPPOSITE_DIRECTION, _MULTIPLIER;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _Header = __webpack_require__(63);

	var _Header2 = babelHelpers.interopRequireDefault(_Header);

	var _Footer = __webpack_require__(65);

	var _Footer2 = babelHelpers.interopRequireDefault(_Footer);

	var _Month = __webpack_require__(66);

	var _Month2 = babelHelpers.interopRequireDefault(_Month);

	var _Year = __webpack_require__(70);

	var _Year2 = babelHelpers.interopRequireDefault(_Year);

	var _Decade = __webpack_require__(71);

	var _Decade2 = babelHelpers.interopRequireDefault(_Decade);

	var _Century = __webpack_require__(72);

	var _Century2 = babelHelpers.interopRequireDefault(_Century);

	var _utilLocalizers = __webpack_require__(18);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _uncontrollable = __webpack_require__(45);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _SlideTransition = __webpack_require__(73);

	var _SlideTransition2 = babelHelpers.interopRequireDefault(_SlideTransition);

	var _utilDates = __webpack_require__(67);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _utilConstants = __webpack_require__(69);

	var _utilConstants2 = babelHelpers.interopRequireDefault(_utilConstants);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	//values, omit

	var _utilWidgetHelpers = __webpack_require__(38);

	var _utilInteraction = __webpack_require__(39);

	var dir = _utilConstants2['default'].directions,
	    values = function values(obj) {
	  return Object.keys(obj).map(function (k) {
	    return obj[k];
	  });
	},
	    invert = function invert(obj) {
	  return _util_2['default'].transform(obj, function (o, val, key) {
	    o[val] = key;
	  }, {});
	};

	var views = _utilConstants2['default'].calendarViews,
	    VIEW_OPTIONS = values(views),
	    ALT_VIEW = invert(_utilConstants2['default'].calendarViewHierarchy),
	    NEXT_VIEW = _utilConstants2['default'].calendarViewHierarchy,
	    VIEW_UNIT = _utilConstants2['default'].calendarViewUnits,
	    VIEW = (_VIEW = {}, _VIEW[views.MONTH] = _Month2['default'], _VIEW[views.YEAR] = _Year2['default'], _VIEW[views.DECADE] = _Decade2['default'], _VIEW[views.CENTURY] = _Century2['default'], _VIEW);

	var ARROWS_TO_DIRECTION = {
	  ArrowDown: dir.DOWN,
	  ArrowUp: dir.UP,
	  ArrowRight: dir.RIGHT,
	  ArrowLeft: dir.LEFT
	};

	var OPPOSITE_DIRECTION = (_OPPOSITE_DIRECTION = {}, _OPPOSITE_DIRECTION[dir.LEFT] = dir.RIGHT, _OPPOSITE_DIRECTION[dir.RIGHT] = dir.LEFT, _OPPOSITE_DIRECTION);

	var MULTIPLIER = (_MULTIPLIER = {}, _MULTIPLIER[views.YEAR] = 1, _MULTIPLIER[views.DECADE] = 10, _MULTIPLIER[views.CENTURY] = 100, _MULTIPLIER);

	var format = function format(props, f) {
	  return _utilLocalizers.date.getFormat(f, props[f + 'Format']);
	};

	var propTypes = {

	  disabled: _utilPropTypes2['default'].disabled,
	  readOnly: _utilPropTypes2['default'].readOnly,

	  onChange: _react2['default'].PropTypes.func,
	  value: _react2['default'].PropTypes.instanceOf(Date),

	  min: _react2['default'].PropTypes.instanceOf(Date),
	  max: _react2['default'].PropTypes.instanceOf(Date),

	  currentDate: _react2['default'].PropTypes.instanceOf(Date),
	  onCurrentDateChange: _react2['default'].PropTypes.func,

	  initialView: _react2['default'].PropTypes.oneOf(VIEW_OPTIONS),

	  finalView: function finalView(props, propname, componentName) {
	    var err = _react2['default'].PropTypes.oneOf(VIEW_OPTIONS)(props, propname, componentName);

	    if (err) return err;
	    if (VIEW_OPTIONS.indexOf(props[propname]) < VIEW_OPTIONS.indexOf(props.initialView)) return new Error(('The `' + propname + '` prop: `' + props[propname] + '` cannot be \'lower\' than the `initialView`\n        prop. This creates a range that cannot be rendered.').replace(/\n\t/g, ''));
	  },

	  onNavigate: _react2['default'].PropTypes.func,
	  culture: _react2['default'].PropTypes.string,
	  footer: _react2['default'].PropTypes.bool,

	  dayComponent: _utilPropTypes2['default'].elementType,
	  headerFormat: _utilPropTypes2['default'].dateFormat,
	  footerFormat: _utilPropTypes2['default'].dateFormat,

	  dayFormat: _utilPropTypes2['default'].dateFormat,
	  dateFormat: _utilPropTypes2['default'].dateFormat,
	  monthFormat: _utilPropTypes2['default'].dateFormat,
	  yearFormat: _utilPropTypes2['default'].dateFormat,
	  decadeFormat: _utilPropTypes2['default'].dateFormat,
	  centuryFormat: _utilPropTypes2['default'].dateFormat,

	  messages: _react2['default'].PropTypes.shape({
	    moveBack: _react2['default'].PropTypes.string,
	    moveForward: _react2['default'].PropTypes.string
	  })
	};

	var Calendar = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
	  key: 'displayName',
	  initializer: function initializer() {
	    return 'Calendar';
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(48), __webpack_require__(49), __webpack_require__(56), __webpack_require__(41)(), __webpack_require__(57)({
	      willHandle: function willHandle() {
	        if (+this.props.tabIndex === -1) return false;
	      }
	    })];
	  }
	}, {
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    return {
	      selectedIndex: 0,
	      view: this.props.initialView || 'month'
	    };
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {
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
	  }
	}, {
	  key: 'componentWillMount',
	  value: function componentWillMount() {
	    this.changeCurrentDate(this.props.value);
	  }
	}, {
	  key: 'componentWillReceiveProps',
	  value: function componentWillReceiveProps(nextProps) {
	    var bottom = VIEW_OPTIONS.indexOf(nextProps.initialView),
	        top = VIEW_OPTIONS.indexOf(nextProps.finalView),
	        current = VIEW_OPTIONS.indexOf(this.state.view),
	        view = this.state.view,
	        val = this.inRangeValue(nextProps.value);

	    if (current < bottom) this.setState({ view: view = nextProps.initialView });else if (current > top) this.setState({ view: view = nextProps.finalView });

	    //if the value changes reset views to the new one
	    if (!_utilDates2['default'].eq(val, dateOrNull(this.props.value), VIEW_UNIT[view])) {
	      this.changeCurrentDate(val, nextProps.currentDate);
	    }
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _this = this;

	    var _props = this.props;
	    var className = _props.className;
	    var value = _props.value;
	    var footerFormat = _props.footerFormat;
	    var disabled = _props.disabled;
	    var readOnly = _props.readOnly;
	    var finalView = _props.finalView;
	    var footer = _props.footer;
	    var messages = _props.messages;
	    var min = _props.min;
	    var max = _props.max;
	    var culture = _props.culture;
	    var duration = _props.duration;
	    var currentDate = _props.currentDate;
	    var _state = this.state;
	    var view = _state.view;
	    var slideDirection = _state.slideDirection;
	    var focused = _state.focused;

	    var View = VIEW[view],
	        unit = VIEW_UNIT[view],
	        todaysDate = new Date(),
	        todayNotInRange = !_utilDates2['default'].inRange(todaysDate, min, max, view);

	    unit = unit === 'day' ? 'date' : unit;

	    var viewID = _utilWidgetHelpers.instanceId(this, '_calendar'),
	        labelID = _utilWidgetHelpers.instanceId(this, '_calendar_label'),
	        key = view + '_' + _utilDates2['default'][view](currentDate);

	    var elementProps = _util_2['default'].omit(this.props, Object.keys(propTypes)),
	        viewProps = _util_2['default'].pick(this.props, Object.keys(View.propTypes));

	    var isDisabled = disabled || readOnly;

	    messages = msgs(this.props.messages);

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, elementProps, {
	        role: 'group',
	        onKeyDown: this._keyDown,
	        onBlur: this.handleBlur,
	        onFocus: this.handleFocus,
	        className: _classnames2['default'](className, 'rw-calendar', 'rw-widget', {
	          'rw-state-focus': focused,
	          'rw-state-disabled': disabled,
	          'rw-state-readonly': readOnly,
	          'rw-rtl': this.isRtl()
	        })
	      }),
	      _react2['default'].createElement(_Header2['default'], {
	        label: this._label(),
	        labelId: labelID,
	        messages: messages,
	        upDisabled: isDisabled || view === finalView,
	        prevDisabled: isDisabled || !_utilDates2['default'].inRange(this.nextDate(dir.LEFT), min, max, view),
	        nextDisabled: isDisabled || !_utilDates2['default'].inRange(this.nextDate(dir.RIGHT), min, max, view),
	        onViewChange: this.navigate.bind(null, dir.UP, null),
	        onMoveLeft: this.navigate.bind(null, dir.LEFT, null),
	        onMoveRight: this.navigate.bind(null, dir.RIGHT, null)
	      }),
	      _react2['default'].createElement(
	        _SlideTransition2['default'],
	        {
	          ref: 'animation',
	          duration: duration,
	          direction: slideDirection,
	          onAnimate: function () {
	            return focused && _this.focus();
	          }
	        },
	        _react2['default'].createElement(View, babelHelpers._extends({}, viewProps, {
	          tabIndex: '-1',
	          key: key,
	          id: viewID,
	          className: 'rw-calendar-grid',
	          'aria-labelledby': labelID,
	          today: todaysDate,
	          value: value,
	          focused: currentDate,
	          onChange: this.change,
	          onKeyDown: this._keyDown,
	          ariaActiveDescendantKey: 'calendarView'
	        }))
	      ),
	      footer && _react2['default'].createElement(_Footer2['default'], {
	        value: todaysDate,
	        format: footerFormat,
	        culture: culture,
	        disabled: disabled || todayNotInRange,
	        readOnly: readOnly,
	        onClick: this.select
	      })
	    );
	  }
	}, {
	  key: 'navigate',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function navigate(direction, date) {
	    var view = this.state.view,
	        slideDir = direction === dir.LEFT || direction === dir.UP ? 'right' : 'left';

	    if (!date) date = [dir.LEFT, dir.RIGHT].indexOf(direction) !== -1 ? this.nextDate(direction) : this.props.currentDate;

	    if (direction === dir.DOWN) view = ALT_VIEW[view] || view;

	    if (direction === dir.UP) view = NEXT_VIEW[view] || view;

	    if (this.isValidView(view) && _utilDates2['default'].inRange(date, this.props.min, this.props.max, view)) {
	      _utilWidgetHelpers.notify(this.props.onNavigate, [date, slideDir, view]);
	      this.focus(true);

	      this.changeCurrentDate(date);

	      this.setState({
	        slideDirection: slideDir,
	        view: view
	      });
	    }
	  }
	}, {
	  key: 'focus',
	  value: function focus() {
	    if (+this.props.tabIndex > -1) _utilCompat2['default'].findDOMNode(this).focus();
	  }
	}, {
	  key: 'change',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function change(date) {
	    if (this.state.view === this.props.initialView) {
	      this.changeCurrentDate(date);
	      _utilWidgetHelpers.notify(this.props.onChange, date);
	      this.focus();
	      return;
	    }

	    this.navigate(dir.DOWN, date);
	  }
	}, {
	  key: 'changeCurrentDate',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function changeCurrentDate(date) {
	    var currentDate = arguments.length <= 1 || arguments[1] === undefined ? this.props.currentDate : arguments[1];

	    var inRangeDate = this.inRangeValue(date ? new Date(date) : currentDate);
	    if (_utilDates2['default'].eq(inRangeDate, dateOrNull(currentDate), VIEW_UNIT[this.state.view])) return;
	    _utilWidgetHelpers.notify(this.props.onCurrentDateChange, inRangeDate);
	  }
	}, {
	  key: 'select',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function select(date) {
	    var view = this.props.initialView,
	        slideDir = view !== this.state.view || _utilDates2['default'].gt(date, this.state.currentDate) ? 'left' // move down to a the view
	    : 'right';

	    _utilWidgetHelpers.notify(this.props.onChange, date);

	    if (this.isValidView(view) && _utilDates2['default'].inRange(date, this.props.min, this.props.max, view)) {
	      this.focus();

	      this.changeCurrentDate(date);

	      this.setState({
	        slideDirection: slideDir,
	        view: view
	      });
	    }
	  }
	}, {
	  key: 'nextDate',
	  value: function nextDate(direction) {
	    var method = direction === dir.LEFT ? 'subtract' : 'add',
	        view = this.state.view,
	        unit = view === views.MONTH ? view : views.YEAR,
	        multi = MULTIPLIER[view] || 1;

	    return _utilDates2['default'][method](this.props.currentDate, 1 * multi, unit);
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
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

	        currentDate = _utilDates2['default'].move(currentDate, this.props.min, this.props.max, view, direction);

	        if (!_utilDates2['default'].eq(current, currentDate, unit)) {
	          e.preventDefault();

	          if (_utilDates2['default'].gt(currentDate, current, view)) this.navigate(dir.RIGHT, currentDate);else if (_utilDates2['default'].lt(currentDate, current, view)) this.navigate(dir.LEFT, currentDate);else this.changeCurrentDate(currentDate);
	        }
	      }
	    }

	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);
	  }
	}, {
	  key: '_label',
	  value: function _label() {
	    var _props2 = this.props;
	    var culture = _props2.culture;
	    var props = babelHelpers.objectWithoutProperties(_props2, ['culture']);
	    var view = this.state.view;
	    var dt = this.props.currentDate;

	    if (view === 'month') return _utilLocalizers.date.format(dt, format(props, 'header'), culture);else if (view === 'year') return _utilLocalizers.date.format(dt, format(props, 'year'), culture);else if (view === 'decade') return _utilLocalizers.date.format(_utilDates2['default'].startOf(dt, 'decade'), format(props, 'decade'), culture);else if (view === 'century') return _utilLocalizers.date.format(_utilDates2['default'].startOf(dt, 'century'), format(props, 'century'), culture);
	  }
	}, {
	  key: 'inRangeValue',
	  value: function inRangeValue(_value) {
	    var value = dateOrNull(_value);

	    if (value === null) return value;

	    return _utilDates2['default'].max(_utilDates2['default'].min(value, this.props.max), this.props.min);
	  }
	}, {
	  key: 'isValidView',
	  value: function isValidView(next) {
	    var bottom = VIEW_OPTIONS.indexOf(this.props.initialView),
	        top = VIEW_OPTIONS.indexOf(this.props.finalView),
	        current = VIEW_OPTIONS.indexOf(next);

	    return current >= bottom && current <= top;
	  }
	}]));

	function dateOrNull(dt) {
	  if (dt && !isNaN(dt.getTime())) return dt;
	  return null;
	}

	function msgs(msgs) {
	  return babelHelpers._extends({
	    moveBack: 'navigate back',
	    moveForward: 'navigate forward'
	  }, msgs);
	}

	exports['default'] = _uncontrollable2['default'](Calendar, {
	  value: 'onChange',
	  currentDate: 'onCurrentDateChange',
	  view: 'onViewChange'
	}, ['focus']);
	module.exports = exports['default'];

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _WidgetButton = __webpack_require__(59);

	var _WidgetButton2 = babelHelpers.interopRequireDefault(_WidgetButton);

	exports['default'] = _react2['default'].createClass({
	  displayName: 'Header',
	  propTypes: {
	    label: _react2['default'].PropTypes.string.isRequired,
	    labelId: _react2['default'].PropTypes.string,

	    upDisabled: _react2['default'].PropTypes.bool.isRequired,
	    prevDisabled: _react2['default'].PropTypes.bool.isRequired,
	    nextDisabled: _react2['default'].PropTypes.bool.isRequired,
	    onViewChange: _react2['default'].PropTypes.func.isRequired,
	    onMoveLeft: _react2['default'].PropTypes.func.isRequired,
	    onMoveRight: _react2['default'].PropTypes.func.isRequired,

	    messages: _react2['default'].PropTypes.shape({
	      moveBack: _react2['default'].PropTypes.string,
	      moveForward: _react2['default'].PropTypes.string
	    })
	  },

	  mixins: [__webpack_require__(49), __webpack_require__(64)],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      messages: {
	        moveBack: 'navigate back',
	        moveForward: 'navigate forward'
	      }
	    };
	  },

	  render: function render() {
	    var _props = this.props;
	    var messages = _props.messages;
	    var label = _props.label;
	    var labelId = _props.labelId;
	    var onMoveRight = _props.onMoveRight;
	    var onMoveLeft = _props.onMoveLeft;
	    var onViewChange = _props.onViewChange;
	    var prevDisabled = _props.prevDisabled;
	    var upDisabled = _props.upDisabled;
	    var nextDisabled = _props.nextDisabled;

	    var rtl = this.isRtl();

	    return _react2['default'].createElement(
	      'div',
	      { className: 'rw-header' },
	      _react2['default'].createElement(
	        _WidgetButton2['default'],
	        { className: 'rw-btn-left',
	          tabIndex: '-1',
	          onClick: onMoveLeft,
	          disabled: prevDisabled,
	          'aria-disabled': prevDisabled,
	          'aria-label': messages.moveBack,
	          title: messages.moveBack
	        },
	        _react2['default'].createElement('i', { 'aria-hidden': 'false',
	          className: 'rw-i rw-i-caret-' + (rtl ? 'right' : 'left')
	        })
	      ),
	      _react2['default'].createElement(
	        _WidgetButton2['default'],
	        {
	          id: labelId,
	          tabIndex: '-1',
	          className: 'rw-btn-view',
	          disabled: upDisabled,
	          'aria-disabled': upDisabled,
	          'aria-live': 'polite',
	          'aria-atomic': 'true',
	          onClick: onViewChange
	        },
	        label
	      ),
	      _react2['default'].createElement(
	        _WidgetButton2['default'],
	        { className: 'rw-btn-right',
	          tabIndex: '-1',
	          onClick: onMoveRight,
	          disabled: nextDisabled,
	          title: messages.moveForward,
	          'aria-label': messages.moveForward,
	          'aria-disabled': nextDisabled
	        },
	        _react2['default'].createElement('i', { 'aria-hidden': 'false',
	          className: 'rw-i rw-i-caret-' + (rtl ? 'left' : 'right')
	        })
	      )
	    );
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	exports['default'] = {

	  contextTypes: {
	    isRtl: _react2['default'].PropTypes.bool
	  },

	  isRtl: function isRtl() {
	    return !!this.context.isRtl;
	  }

	};
	module.exports = exports['default'];

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _WidgetButton = __webpack_require__(59);

	var _WidgetButton2 = babelHelpers.interopRequireDefault(_WidgetButton);

	var _utilLocalizers = __webpack_require__(18);

	var format = function format(props) {
	  return _utilLocalizers.date.getFormat('footer', props.format);
	};

	module.exports = _react2['default'].createClass({

	  displayName: 'Footer',

	  render: function render() {
	    var now = this.props.value,
	        formatted = _utilLocalizers.date.format(now, format(this.props), this.props.culture);

	    return _react2['default'].createElement(
	      'div',
	      { className: 'rw-footer' },
	      _react2['default'].createElement(
	        _WidgetButton2['default'],
	        { tabIndex: '-1',
	          'aria-disabled': !!this.props.disabled,
	          'aria-readonly': !!this.props.readOnly,
	          disabled: this.props.disabled,
	          readOnly: this.props.readOnly,
	          onClick: this.props.onClick.bind(null, now)
	        },
	        formatted
	      )
	    );
	  }

	});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilDates = __webpack_require__(67);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _utilLocalizers = __webpack_require__(18);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilWidgetHelpers = __webpack_require__(38);

	var dayFormat = function dayFormat(props) {
	  return _utilLocalizers.date.getFormat('weekday', props.dayFormat);
	},
	    dateFormat = function dateFormat(props) {
	  return _utilLocalizers.date.getFormat('dayOfMonth', props.dateFormat);
	};

	var optionId = function optionId(id, date) {
	  return id + '__month_' + _utilDates2['default'].month(date) + '-' + _utilDates2['default'].date(date);
	};

	var propTypes = {
	  optionID: _react2['default'].PropTypes.func,

	  culture: _react2['default'].PropTypes.string,
	  value: _react2['default'].PropTypes.instanceOf(Date),
	  focused: _react2['default'].PropTypes.instanceOf(Date),
	  min: _react2['default'].PropTypes.instanceOf(Date),
	  max: _react2['default'].PropTypes.instanceOf(Date),

	  dayComponent: _utilPropTypes2['default'].elementType,

	  dayFormat: _utilPropTypes2['default'].dateFormat,
	  dateFormat: _utilPropTypes2['default'].dateFormat,
	  footerFormat: _utilPropTypes2['default'].dateFormat,

	  onChange: _react2['default'].PropTypes.func.isRequired
	};

	var isEqual = function isEqual(dateA, dateB) {
	  return _utilDates2['default'].eq(dateA, dateB, 'day');
	};

	var MonthView = _react2['default'].createClass({

	  displayName: 'MonthView',

	  statics: {
	    isEqual: isEqual
	  },

	  mixins: [__webpack_require__(64), __webpack_require__(41)()],

	  propTypes: propTypes,

	  componentDidUpdate: function componentDidUpdate() {
	    var activeId = optionId(_utilWidgetHelpers.instanceId(this), this.props.focused);
	    this.ariaActiveDescendant(activeId, null);
	  },

	  render: function render() {
	    var _props = this.props;
	    var focused = _props.focused;
	    var culture = _props.culture;
	    var month = _utilDates2['default'].visibleDays(focused, culture);
	    var rows = _util_2['default'].chunk(month, 7);

	    var elementProps = _util_2['default'].omit(this.props, Object.keys(propTypes));

	    return _react2['default'].createElement(
	      'table',
	      babelHelpers._extends({}, elementProps, {
	        role: 'grid'
	      }),
	      _react2['default'].createElement(
	        'thead',
	        null,
	        _react2['default'].createElement(
	          'tr',
	          null,
	          this._headers(rows[0], dayFormat(this.props), culture)
	        )
	      ),
	      _react2['default'].createElement(
	        'tbody',
	        null,
	        rows.map(this._row)
	      )
	    );
	  },

	  _row: function _row(row, rowIdx) {
	    var _this = this;

	    var _props2 = this.props;
	    var focused = _props2.focused;
	    var today = _props2.today;
	    var disabled = _props2.disabled;
	    var onChange = _props2.onChange;
	    var value = _props2.value;
	    var culture = _props2.culture;
	    var min = _props2.min;
	    var max = _props2.max;
	    var Day = _props2.dayComponent;
	    var id = _utilWidgetHelpers.instanceId(this);
	    var labelFormat = _utilLocalizers.date.getFormat('footer');

	    return _react2['default'].createElement(
	      'tr',
	      { key: 'week_' + rowIdx, role: 'row' },
	      row.map(function (day, colIdx) {

	        var isFocused = isEqual(day, focused),
	            isSelected = isEqual(day, value),
	            isToday = isEqual(day, today),
	            date = _utilLocalizers.date.format(day, dateFormat(_this.props), culture),
	            label = _utilLocalizers.date.format(day, labelFormat, culture);

	        var currentID = optionId(id, day);

	        return !_utilDates2['default'].inRange(day, min, max) ? _react2['default'].createElement(
	          'td',
	          { key: 'day_' + colIdx, role: 'presentation', className: 'rw-empty-cell' },
	          ' '
	        ) : _react2['default'].createElement(
	          'td',
	          {
	            key: 'day_' + colIdx,
	            role: 'gridcell',
	            id: currentID,
	            title: label,
	            'aria-selected': isSelected,
	            'aria-label': label,
	            'aria-readonly': disabled
	          },
	          _react2['default'].createElement(
	            'span',
	            {
	              'aria-labelledby': currentID,
	              onClick: onChange.bind(null, day),
	              className: _classnames2['default']('rw-btn', {
	                'rw-off-range': _utilDates2['default'].month(day) !== _utilDates2['default'].month(focused),
	                'rw-state-focus': isFocused,
	                'rw-state-selected': isSelected,
	                'rw-now': isToday
	              })
	            },
	            Day ? _react2['default'].createElement(Day, { date: day, label: date }) : date
	          )
	        );
	      })
	    );
	  },

	  _headers: function _headers(week, format, culture) {
	    return week.map(function (date) {
	      return _react2['default'].createElement(
	        'th',
	        { key: 'header_' + _utilDates2['default'].weekday(date, undefined, _utilLocalizers.date.startOfWeek(culture)) },
	        _utilLocalizers.date.format(date, format, culture)
	      );
	    });
	  }

	});

	exports['default'] = MonthView;
	module.exports = exports['default'];

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _dateArithmetic = __webpack_require__(68);

	var _dateArithmetic2 = babelHelpers.interopRequireDefault(_dateArithmetic);

	var _constants = __webpack_require__(69);

	var _constants2 = babelHelpers.interopRequireDefault(_constants);

	var _localizers = __webpack_require__(18);

	var directions = _constants2['default'].directions;
	var calendarViewUnits = _constants2['default'].calendarViewUnits;

	var dates = babelHelpers._extends(_dateArithmetic2['default'], {

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
	        isUpOrDown = direction === directions.UP || direction === directions.DOWN,
	        rangeUnit = calendarViewUnits[unit],
	        addUnit = isMonth && isUpOrDown ? 'week' : calendarViewUnits[unit],
	        amount = isMonth || !isUpOrDown ? 1 : 4,
	        newDate;

	    if (direction === directions.UP || direction === directions.LEFT) amount *= -1;

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

	exports['default'] = dates;
	module.exports = exports['default'];

/***/ },
/* 68 */
/***/ function(module, exports) {

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
	  }
	}


	function monthMath(date, val){
	  var current = dates.month(date)
	    , newMonth  = (current + val);

	    date = dates.month(date, newMonth)

	    if (newMonth < 0 ) newMonth = 12 + val

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
	  return function (a, b, unit, maybeFoW) {
	    return operator(+dates.startOf(a, unit, maybeFoW), +dates.startOf(b, unit, maybeFoW))
	  };
	}


/***/ },
/* 69 */
/***/ function(module, exports) {

	'use strict';

	var _calendarViewHierarchy, _calendarViewUnits;

	var views = {
	  MONTH: 'month',
	  YEAR: 'year',
	  DECADE: 'decade',
	  CENTURY: 'century'
	};

	module.exports = {

	  directions: {
	    LEFT: 'LEFT',
	    RIGHT: 'RIGHT',
	    UP: 'UP',
	    DOWN: 'DOWN'
	  },

	  datePopups: {
	    TIME: 'time',
	    CALENDAR: 'calendar'
	  },

	  calendarViews: views,

	  calendarViewHierarchy: (_calendarViewHierarchy = {}, _calendarViewHierarchy[views.MONTH] = views.YEAR, _calendarViewHierarchy[views.YEAR] = views.DECADE, _calendarViewHierarchy[views.DECADE] = views.CENTURY, _calendarViewHierarchy),

	  calendarViewUnits: (_calendarViewUnits = {}, _calendarViewUnits[views.MONTH] = 'day', _calendarViewUnits[views.YEAR] = views.MONTH, _calendarViewUnits[views.DECADE] = views.YEAR, _calendarViewUnits[views.CENTURY] = views.DECADE, _calendarViewUnits)
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilDates = __webpack_require__(67);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _utilLocalizers = __webpack_require__(18);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilWidgetHelpers = __webpack_require__(38);

	var format = function format(props) {
	  return _utilLocalizers.date.getFormat('month', props.monthFormat);
	};

	var propTypes = {
	  optionID: _react2['default'].PropTypes.func,
	  culture: _react2['default'].PropTypes.string,
	  value: _react2['default'].PropTypes.instanceOf(Date),
	  focused: _react2['default'].PropTypes.instanceOf(Date),
	  min: _react2['default'].PropTypes.instanceOf(Date),
	  max: _react2['default'].PropTypes.instanceOf(Date),
	  onChange: _react2['default'].PropTypes.func.isRequired,

	  monthFormat: _utilPropTypes2['default'].dateFormat
	};

	var isEqual = function isEqual(dateA, dateB) {
	  return _utilDates2['default'].eq(dateA, dateB, 'month');
	};
	var optionId = function optionId(id, date) {
	  return id + '__year_' + _utilDates2['default'].year(date) + '-' + _utilDates2['default'].month(date);
	};

	var YearView = _react2['default'].createClass({

	  displayName: 'YearView',

	  mixins: [__webpack_require__(64), __webpack_require__(41)()],

	  propTypes: propTypes,

	  componentDidUpdate: function componentDidUpdate() {
	    var activeId = optionId(_utilWidgetHelpers.instanceId(this), this.props.focused);
	    this.ariaActiveDescendant(activeId);
	  },

	  render: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var focused = _props.focused;
	    var months = _utilDates2['default'].monthsInYear(_utilDates2['default'].year(focused));
	    var rows = _util_2['default'].chunk(months, 4);

	    var elementProps = _util_2['default'].omit(this.props, Object.keys(propTypes));

	    return _react2['default'].createElement(
	      'table',
	      babelHelpers._extends({}, elementProps, {
	        role: 'grid',
	        className: _classnames2['default'](className, 'rw-nav-view')
	      }),
	      _react2['default'].createElement(
	        'tbody',
	        null,
	        rows.map(this._row)
	      )
	    );
	  },

	  _row: function _row(row, rowIdx) {
	    var _this = this;

	    var _props2 = this.props;
	    var focused = _props2.focused;
	    var disabled = _props2.disabled;
	    var onChange = _props2.onChange;
	    var value = _props2.value;
	    var today = _props2.today;
	    var culture = _props2.culture;
	    var min = _props2.min;
	    var max = _props2.max;
	    var id = _utilWidgetHelpers.instanceId(this);
	    var labelFormat = _utilLocalizers.date.getFormat('header');

	    return _react2['default'].createElement(
	      'tr',
	      { key: rowIdx, role: 'row' },
	      row.map(function (date, colIdx) {
	        var isFocused = isEqual(date, focused),
	            isSelected = isEqual(date, value),
	            currentMonth = isEqual(date, today),
	            label = _utilLocalizers.date.format(date, labelFormat, culture);

	        var currentID = optionId(id, date);

	        return _utilDates2['default'].inRange(date, min, max, 'month') ? _react2['default'].createElement(
	          'td',
	          {
	            key: colIdx,
	            role: 'gridcell',
	            id: currentID,
	            title: label,
	            'aria-selected': isSelected,
	            'aria-readonly': disabled,
	            'aria-label': label
	          },
	          _react2['default'].createElement(
	            'span',
	            {
	              'aria-labelledby': currentID,
	              onClick: onChange.bind(null, date),
	              className: _classnames2['default']('rw-btn', {
	                'rw-state-focus': isFocused,
	                'rw-state-selected': isSelected,
	                'rw-now': currentMonth
	              })
	            },
	            _utilLocalizers.date.format(date, format(_this.props), culture)
	          )
	        ) : _react2['default'].createElement(
	          'td',
	          { key: colIdx, className: 'rw-empty-cell', role: 'presentation' },
	          ' '
	        );
	      })
	    );
	  }

	});

	exports['default'] = YearView;
	module.exports = exports['default'];

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilDates = __webpack_require__(67);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _utilLocalizers = __webpack_require__(18);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilWidgetHelpers = __webpack_require__(38);

	var propTypes = {
	  optionID: _react2['default'].PropTypes.func,
	  culture: _react2['default'].PropTypes.string,

	  value: _react2['default'].PropTypes.instanceOf(Date),
	  focused: _react2['default'].PropTypes.instanceOf(Date),
	  min: _react2['default'].PropTypes.instanceOf(Date),
	  max: _react2['default'].PropTypes.instanceOf(Date),
	  onChange: _react2['default'].PropTypes.func.isRequired,

	  yearFormat: _utilPropTypes2['default'].dateFormat
	};

	var isEqual = function isEqual(dataA, dateB) {
	  return _utilDates2['default'].eq(dataA, dateB, 'year');
	};
	var optionId = function optionId(id, date) {
	  return id + '__decade_' + _utilDates2['default'].year(date);
	};

	exports['default'] = _react2['default'].createClass({

	  displayName: 'DecadeView',

	  mixins: [__webpack_require__(49), __webpack_require__(64), __webpack_require__(41)()],

	  propTypes: propTypes,

	  componentDidUpdate: function componentDidUpdate() {
	    var activeId = optionId(_utilWidgetHelpers.instanceId(this), this.props.focused);
	    this.ariaActiveDescendant(activeId);
	  },

	  render: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var focused = _props.focused;
	    var years = getDecadeYears(focused);
	    var rows = _util_2['default'].chunk(years, 4);

	    var elementProps = _util_2['default'].omit(this.props, Object.keys(propTypes));

	    return _react2['default'].createElement(
	      'table',
	      babelHelpers._extends({}, elementProps, {
	        role: 'grid',
	        className: _classnames2['default'](className, 'rw-nav-view')
	      }),
	      _react2['default'].createElement(
	        'tbody',
	        null,
	        rows.map(this._row)
	      )
	    );
	  },

	  _row: function _row(row, rowIdx) {
	    var _this = this;

	    var _props2 = this.props;
	    var focused = _props2.focused;
	    var disabled = _props2.disabled;
	    var onChange = _props2.onChange;
	    var value = _props2.value;
	    var today = _props2.today;
	    var culture = _props2.culture;
	    var min = _props2.min;
	    var max = _props2.max;
	    var id = _utilWidgetHelpers.instanceId(this);

	    return _react2['default'].createElement(
	      'tr',
	      { key: 'row_' + rowIdx, role: 'row' },
	      row.map(function (date, colIdx) {
	        var isFocused = isEqual(date, focused),
	            isSelected = isEqual(date, value),
	            currentYear = isEqual(date, today),
	            label = _utilLocalizers.date.format(date, _utilLocalizers.date.getFormat('year', _this.props.yearFormat), culture);

	        var currentID = optionId(id, date);

	        return !_utilDates2['default'].inRange(date, min, max, 'year') ? _react2['default'].createElement(
	          'td',
	          { key: colIdx, role: 'presentation', className: 'rw-empty-cell' },
	          ' '
	        ) : _react2['default'].createElement(
	          'td',
	          {
	            key: colIdx,
	            role: 'gridcell',
	            id: currentID,
	            title: label,
	            'aria-selected': isSelected,
	            'aria-label': label,
	            'aria-readonly': disabled
	          },
	          _react2['default'].createElement(
	            'span',
	            {
	              'aria-labelledby': currentID,
	              onClick: onChange.bind(null, date),
	              className: _classnames2['default']('rw-btn', {
	                'rw-off-range': !inDecade(date, focused),
	                'rw-state-focus': isFocused,
	                'rw-state-selected': isSelected,
	                'rw-now': currentYear
	              })
	            },
	            label
	          )
	        );
	      })
	    );
	  }
	});

	function inDecade(date, start) {
	  return _utilDates2['default'].gte(date, _utilDates2['default'].startOf(start, 'decade'), 'year') && _utilDates2['default'].lte(date, _utilDates2['default'].endOf(start, 'decade'), 'year');
	}

	function getDecadeYears(_date) {
	  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	      date = _utilDates2['default'].add(_utilDates2['default'].startOf(_date, 'decade'), -2, 'year');

	  return days.map(function () {
	    return date = _utilDates2['default'].add(date, 1, 'year');
	  });
	}
	module.exports = exports['default'];

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilDates = __webpack_require__(67);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _utilLocalizers = __webpack_require__(18);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilWidgetHelpers = __webpack_require__(38);

	var format = function format(props) {
	  return _utilLocalizers.date.getFormat('decade', props.decadeFormat);
	};

	var isEqual = function isEqual(dateA, dateB) {
	  return _utilDates2['default'].eq(dateA, dateB, 'decade');
	};
	var optionId = function optionId(id, date) {
	  return id + '__century_' + _utilDates2['default'].year(date);
	};

	var propTypes = {
	  optionID: _react2['default'].PropTypes.func,
	  culture: _react2['default'].PropTypes.string,
	  value: _react2['default'].PropTypes.instanceOf(Date),
	  min: _react2['default'].PropTypes.instanceOf(Date),
	  max: _react2['default'].PropTypes.instanceOf(Date),

	  onChange: _react2['default'].PropTypes.func.isRequired,
	  decadeFormat: _utilPropTypes2['default'].dateFormat
	};

	exports['default'] = _react2['default'].createClass({

	  displayName: 'CenturyView',

	  mixins: [__webpack_require__(49), __webpack_require__(64), __webpack_require__(41)()],

	  propTypes: propTypes,

	  componentDidUpdate: function componentDidUpdate() {
	    var activeId = optionId(_utilWidgetHelpers.instanceId(this), this.props.focused);
	    this.ariaActiveDescendant(activeId);
	  },

	  render: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var focused = _props.focused;
	    var years = getCenturyDecades(focused);
	    var rows = _util_2['default'].chunk(years, 4);

	    var elementProps = _util_2['default'].omit(this.props, Object.keys(propTypes));

	    return _react2['default'].createElement(
	      'table',
	      babelHelpers._extends({}, elementProps, {
	        role: 'grid',
	        className: _classnames2['default'](className, 'rw-nav-view')
	      }),
	      _react2['default'].createElement(
	        'tbody',
	        null,
	        rows.map(this._row)
	      )
	    );
	  },

	  _row: function _row(row, rowIdx) {
	    var _this = this;

	    var _props2 = this.props;
	    var focused = _props2.focused;
	    var disabled = _props2.disabled;
	    var onChange = _props2.onChange;
	    var value = _props2.value;
	    var today = _props2.today;
	    var culture = _props2.culture;
	    var min = _props2.min;
	    var max = _props2.max;
	    var id = _utilWidgetHelpers.instanceId(this, '_century');

	    return _react2['default'].createElement(
	      'tr',
	      { key: 'row_' + rowIdx, role: 'row' },
	      row.map(function (date, colIdx) {
	        var isFocused = isEqual(date, focused),
	            isSelected = isEqual(date, value),
	            currentDecade = isEqual(date, today),
	            label = _utilLocalizers.date.format(_utilDates2['default'].startOf(date, 'decade'), format(_this.props), culture);

	        var currentID = optionId(id, date);

	        return !inRange(date, min, max) ? _react2['default'].createElement(
	          'td',
	          { key: colIdx, role: 'gridcell', className: 'rw-empty-cell' },
	          ' '
	        ) : _react2['default'].createElement(
	          'td',
	          {
	            key: colIdx,
	            role: 'gridcell',
	            id: currentID,
	            title: label,
	            'aria-selected': isSelected,
	            'aria-label': label,
	            'aria-readonly': disabled
	          },
	          _react2['default'].createElement(
	            'span',
	            {
	              'aria-labelledby': currentID,
	              onClick: onChange.bind(null, inRangeDate(date, min, max)),
	              className: _classnames2['default']('rw-btn', {
	                'rw-off-range': !inCentury(date, focused),
	                'rw-state-focus': isFocused,
	                'rw-state-selected': isSelected,
	                'rw-now': currentDecade
	              })
	            },
	            label
	          )
	        );
	      })
	    );
	  }

	});

	function inRangeDate(decade, min, max) {
	  return _utilDates2['default'].max(_utilDates2['default'].min(decade, max), min);
	}

	function inRange(decade, min, max) {
	  return _utilDates2['default'].gte(decade, _utilDates2['default'].startOf(min, 'decade'), 'year') && _utilDates2['default'].lte(decade, _utilDates2['default'].endOf(max, 'decade'), 'year');
	}

	function inCentury(date, start) {
	  return _utilDates2['default'].gte(date, _utilDates2['default'].startOf(start, 'century'), 'year') && _utilDates2['default'].lte(date, _utilDates2['default'].endOf(start, 'century'), 'year');
	}

	function getCenturyDecades(_date) {
	  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	      date = _utilDates2['default'].add(_utilDates2['default'].startOf(_date, 'century'), -20, 'year');

	  return days.map(function () {
	    return date = _utilDates2['default'].add(date, 10, 'year');
	  });
	}
	module.exports = exports['default'];

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var React = __webpack_require__(21),
	    ReplaceTransitionGroup = __webpack_require__(74),
	    compat = __webpack_require__(31),
	    css = __webpack_require__(7),
	    getWidth = __webpack_require__(75),
	    config = __webpack_require__(4);

	var SlideChildGroup = React.createClass({
	  displayName: 'SlideChildGroup',

	  propTypes: {
	    direction: React.PropTypes.oneOf(['left', 'right']),
	    duration: React.PropTypes.number
	  },

	  componentWillEnter: function componentWillEnter(done) {
	    var _this = this;

	    var node = compat.findDOMNode(this),
	        width = getWidth(node),
	        direction = this.props.direction;

	    width = direction === 'left' ? width : -width;

	    this.ORGINAL_POSITION = node.style.position;

	    css(node, { position: 'absolute', left: width + 'px', top: 0 });

	    config.animate(node, { left: 0 }, this.props.duration, function () {

	      css(node, {
	        position: _this.ORGINAL_POSITION,
	        overflow: 'hidden'
	      });

	      _this.ORGINAL_POSITION = null;
	      done && done();
	    });
	  },

	  componentWillLeave: function componentWillLeave(done) {
	    var _this2 = this;

	    var node = compat.findDOMNode(this),
	        width = getWidth(node),
	        direction = this.props.direction;

	    width = direction === 'left' ? -width : width;

	    this.ORGINAL_POSITION = node.style.position;

	    css(node, { position: 'absolute', top: 0, left: 0 });

	    config.animate(node, { left: width + 'px' }, this.props.duration, function () {
	      css(node, {
	        position: _this2.ORGINAL_POSITION,
	        overflow: 'hidden'
	      });

	      _this2.ORGINAL_POSITION = null;
	      done && done();
	    });
	  },

	  render: function render() {
	    return React.Children.only(this.props.children);
	  }

	});

	module.exports = React.createClass({
	  displayName: 'exports',

	  propTypes: {
	    direction: React.PropTypes.oneOf(['left', 'right']),
	    duration: React.PropTypes.number
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      direction: 'left',
	      duration: 250
	    };
	  },

	  _wrapChild: function _wrapChild(child, ref) {
	    return React.createElement(
	      SlideChildGroup,
	      { key: child.key, ref: ref,
	        direction: this.props.direction,
	        duration: this.props.duration },
	      child
	    );
	  },

	  render: function render() {
	    var _props = this.props;
	    var style = _props.style;
	    var children = _props.children;
	    var props = babelHelpers.objectWithoutProperties(_props, ['style', 'children']);

	    style = babelHelpers._extends({}, style, { position: 'relative', overflow: 'hidden' });

	    return React.createElement(
	      ReplaceTransitionGroup,
	      babelHelpers._extends({}, props, {
	        ref: 'container',
	        childFactory: this._wrapChild,
	        style: style,
	        component: 'div' }),
	      children
	    );
	  },

	  isTransitioning: function isTransitioning() {
	    return this.isMounted() && this.refs.container.isTransitioning();
	  }
	});

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A streamlined version of TransitionGroup built for managing at most two active children
	 * also provides additional hooks for animation start/end
	 * https://github.com/facebook/react/blob/master/src/addons/transitions/ReactTransitionGroup.js
	 * relevent code is licensed accordingly
	 */
	'use strict';

	var React = __webpack_require__(21),
	    css = __webpack_require__(7),
	    height = __webpack_require__(28),
	    width = __webpack_require__(75),
	    compat = __webpack_require__(31),
	    _ = __webpack_require__(20);

	module.exports = React.createClass({

	  displayName: 'ReplaceTransitionGroup',

	  propTypes: {
	    component: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.string]),
	    childFactory: React.PropTypes.func,

	    onAnimating: React.PropTypes.func,
	    onAnimate: React.PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      component: 'span',
	      childFactory: function childFactory(a) {
	        return a;
	      },

	      onAnimating: _.noop,
	      onAnimate: _.noop
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      children: _.splat(this.props.children)
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

	  componentDidUpdate: function componentDidUpdate() {
	    var entering = this.entering,
	        leaving = this.leaving,
	        first = this.refs[key(entering) || key(leaving)],
	        node = compat.findDOMNode(this),
	        el = first && compat.findDOMNode(first);

	    if (el) css(node, {
	      overflow: 'hidden',
	      height: height(el) + 'px',
	      width: width(el) + 'px'
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

	    if (this.isMounted()) css(compat.findDOMNode(this), { overflow: 'visible', height: '', width: '' });

	    this.props.onAnimate();
	  },

	  _handleDoneEntering: function _handleDoneEntering(enterkey) {
	    var component = this.refs[enterkey];

	    if (component && component.componentDidEnter) component.componentDidEnter();

	    delete this.animatingKeys[enterkey];

	    if (key(this.props.children) !== enterkey) this.performLeave(enterkey); // This was removed before it had fully entered. Remove it.

	    this._tryFinish();
	  },

	  isTransitioning: function isTransitioning() {
	    return Object.keys(this.animatingKeys).length !== 0;
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

	    else if (this.isMounted()) this.setState({
	        children: this.state.children.filter(function (c) {
	          return key(c) !== leavekey;
	        })
	      });

	    this._tryFinish();
	  },

	  render: function render() {
	    var _this = this;

	    var Component = this.props.component;
	    return React.createElement(
	      Component,
	      this.props,
	      this.state.children.map(function (c) {
	        return _this.props.childFactory(c, key(c));
	      })
	    );
	  }
	});

	function getChild(children) {
	  return React.Children.only(children);
	}

	function key(child) {
	  return child && child.key;
	}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var offset = __webpack_require__(29),
	    getWindow = __webpack_require__(30);

	module.exports = function width(node, client) {
	  var win = getWindow(node);
	  return win ? win.innerWidth : client ? node.clientWidth : offset(node).width;
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _invariant = __webpack_require__(19);

	var _invariant2 = babelHelpers.interopRequireDefault(_invariant);

	var _domHelpersActiveElement = __webpack_require__(23);

	var _domHelpersActiveElement2 = babelHelpers.interopRequireDefault(_domHelpersActiveElement);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	//pick, omit, has

	var _utilDates = __webpack_require__(67);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _utilLocalizers = __webpack_require__(18);

	var _utilConstants = __webpack_require__(69);

	var _utilConstants2 = babelHelpers.interopRequireDefault(_utilConstants);

	var _Popup = __webpack_require__(27);

	var _Popup2 = babelHelpers.interopRequireDefault(_Popup);

	var _Calendar2 = __webpack_require__(62);

	var _Calendar3 = babelHelpers.interopRequireDefault(_Calendar2);

	var _TimeList = __webpack_require__(77);

	var _TimeList2 = babelHelpers.interopRequireDefault(_TimeList);

	var _DateInput = __webpack_require__(78);

	var _DateInput2 = babelHelpers.interopRequireDefault(_DateInput);

	var _WidgetButton = __webpack_require__(59);

	var _WidgetButton2 = babelHelpers.interopRequireDefault(_WidgetButton);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _uncontrollable = __webpack_require__(45);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _utilInteraction = __webpack_require__(39);

	var _utilWidgetHelpers = __webpack_require__(38);

	var views = _utilConstants2['default'].calendarViews;
	var popups = _utilConstants2['default'].datePopups;

	var Calendar = _Calendar3['default'].ControlledComponent;
	var viewEnum = Object.keys(views).map(function (k) {
	  return views[k];
	});

	var omit = _util_2['default'].omit;
	var pick = _util_2['default'].pick;

	var propTypes = babelHelpers._extends({}, Calendar.propTypes, {

	  //-- controlled props -----------
	  value: _react2['default'].PropTypes.instanceOf(Date),
	  onChange: _react2['default'].PropTypes.func,
	  open: _react2['default'].PropTypes.oneOf([false, popups.TIME, popups.CALENDAR]),
	  onToggle: _react2['default'].PropTypes.func,
	  currentDate: _react2['default'].PropTypes.instanceOf(Date),
	  onCurrentDateChange: _react2['default'].PropTypes.func,
	  //------------------------------------

	  onSelect: _react2['default'].PropTypes.func,

	  min: _react2['default'].PropTypes.instanceOf(Date),
	  max: _react2['default'].PropTypes.instanceOf(Date),

	  culture: _react2['default'].PropTypes.string,

	  format: _utilPropTypes2['default'].dateFormat,
	  timeFormat: _utilPropTypes2['default'].dateFormat,
	  editFormat: _utilPropTypes2['default'].dateFormat,

	  calendar: _react2['default'].PropTypes.bool,
	  time: _react2['default'].PropTypes.bool,

	  timeComponent: _utilPropTypes2['default'].elementType,

	  //popup
	  dropUp: _react2['default'].PropTypes.bool,
	  duration: _react2['default'].PropTypes.number,

	  placeholder: _react2['default'].PropTypes.string,
	  name: _react2['default'].PropTypes.string,

	  initialView: _react2['default'].PropTypes.oneOf(viewEnum),
	  finalView: _react2['default'].PropTypes.oneOf(viewEnum),

	  autoFocus: _react2['default'].PropTypes.bool,
	  disabled: _utilPropTypes2['default'].disabled,
	  readOnly: _utilPropTypes2['default'].readOnly,

	  parse: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string), _react2['default'].PropTypes.string, _react2['default'].PropTypes.func]),

	  'aria-labelledby': _react2['default'].PropTypes.string,

	  messages: _react2['default'].PropTypes.shape({
	    calendarButton: _react2['default'].PropTypes.string,
	    timeButton: _react2['default'].PropTypes.string
	  })
	});

	var DateTimePicker = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
	  key: 'displayName',
	  initializer: function initializer() {
	    return 'DateTimePicker';
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(48), __webpack_require__(49), __webpack_require__(51), __webpack_require__(56), __webpack_require__(57)({
	      didHandle: function didHandle(focused) {
	        if (!focused) this.close();
	      }
	    }), __webpack_require__(41)('valueInput', function (key, id) {
	      var open = this.props.open;
	      var current = this.ariaActiveDescendant();
	      var calIsActive = open === popups.CALENDAR && key === 'calendar';
	      var timeIsActive = open === popups.TIME && key === 'timelist';

	      if (!current || timeIsActive || calIsActive) return id;
	    })];
	  }
	}, {
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    return {
	      focused: false
	    };
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {

	    return {
	      value: null,

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
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _cx,
	        _this = this;

	    var _props = this.props;
	    var className = _props.className;
	    var calendar = _props.calendar;
	    var time = _props.time;
	    var open = _props.open;
	    var tabIndex = _props.tabIndex;
	    var value = _props.value;
	    var editFormat = _props.editFormat;
	    var timeFormat = _props.timeFormat;
	    var culture = _props.culture;
	    var duration = _props.duration;
	    var step = _props.step;
	    var messages = _props.messages;
	    var min = _props.min;
	    var max = _props.max;
	    var busy = _props.busy;
	    var placeholder = _props.placeholder;
	    var disabled = _props.disabled;
	    var readOnly = _props.readOnly;
	    var name = _props.name;
	    var dropUp = _props.dropUp;
	    var timeComponent = _props.timeComponent;
	    var autoFocus = _props.autoFocus;
	    var ariaLabelledby = _props['aria-labelledby'];
	    var ariaDescribedby = _props['aria-describedby'];
	    var focused = this.state.focused;

	    var inputID = _utilWidgetHelpers.instanceId(this, '_input'),
	        timeListID = _utilWidgetHelpers.instanceId(this, '_time_listbox'),
	        dateListID = _utilWidgetHelpers.instanceId(this, '_cal'),
	        owns = '';

	    var elementProps = omit(this.props, Object.keys(propTypes)),
	        calProps = pick(this.props, Object.keys(Calendar.propTypes));

	    var shouldRenderList = _utilWidgetHelpers.isFirstFocusedRender(this) || open,
	        disabledOrReadonly = disabled || readOnly,
	        calendarIsOpen = open === popups.CALENDAR,
	        timeIsOpen = open === popups.TIME;

	    if (calendar) owns += dateListID;
	    if (time) owns += ' ' + timeListID;

	    value = dateOrNull(value);

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, elementProps, {
	        ref: 'element',
	        tabIndex: '-1',
	        onKeyDown: this._keyDown,
	        onKeyPress: this._keyPress,
	        onBlur: this.handleBlur,
	        onFocus: this.handleFocus,
	        className: _classnames2['default'](className, 'rw-datetimepicker', 'rw-widget', (_cx = {
	          'rw-state-focus': focused,
	          'rw-state-disabled': disabled,
	          'rw-state-readonly': readOnly,
	          'rw-has-both': calendar && time,
	          'rw-has-neither': !calendar && !time,
	          'rw-rtl': this.isRtl()

	        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx))
	      }),
	      _react2['default'].createElement(_DateInput2['default'], {
	        ref: 'valueInput',
	        id: inputID,
	        autoFocus: autoFocus,
	        tabIndex: tabIndex || 0,
	        role: 'combobox',
	        'aria-labelledby': ariaLabelledby,
	        'aria-describedby': ariaDescribedby,
	        'aria-expanded': !!open,
	        'aria-busy': !!busy,
	        'aria-owns': owns.trim(),
	        'aria-haspopup': true,
	        placeholder: placeholder,
	        name: name,
	        disabled: disabled,
	        readOnly: readOnly,
	        value: value,
	        format: getFormat(this.props),
	        editFormat: editFormat,
	        editing: focused,
	        culture: culture,
	        parse: this._parse,
	        onChange: this._change
	      }),
	      (calendar || time) && _react2['default'].createElement(
	        'span',
	        { className: 'rw-select' },
	        calendar && _react2['default'].createElement(
	          _WidgetButton2['default'],
	          {
	            tabIndex: '-1',
	            className: 'rw-btn-calendar',
	            disabled: disabledOrReadonly,
	            'aria-disabled': disabledOrReadonly,
	            'aria-label': messages.calendarButton,
	            onClick: this._click.bind(null, popups.CALENDAR)
	          },
	          _react2['default'].createElement('i', { className: 'rw-i rw-i-calendar',
	            'aria-hidden': 'true'
	          })
	        ),
	        time && _react2['default'].createElement(
	          _WidgetButton2['default'],
	          {
	            tabIndex: '-1',
	            className: 'rw-btn-time',
	            disabled: disabledOrReadonly,
	            'aria-disabled': disabledOrReadonly,
	            'aria-label': messages.timeButton,
	            onClick: this._click.bind(null, popups.TIME)
	          },
	          _react2['default'].createElement('i', { className: 'rw-i rw-i-clock-o',
	            'aria-hidden': 'true'
	          })
	        )
	      ),
	      _react2['default'].createElement(
	        _Popup2['default'],
	        {
	          dropUp: dropUp,
	          open: timeIsOpen,
	          duration: duration,
	          onOpening: function () {
	            return _this.refs.timePopup.forceUpdate();
	          }
	        },
	        _react2['default'].createElement(
	          'div',
	          null,
	          shouldRenderList && _react2['default'].createElement(_TimeList2['default'], { ref: 'timePopup',
	            id: timeListID,
	            ariaActiveDescendantKey: 'timelist',
	            'aria-labelledby': inputID,
	            'aria-live': open && 'polite',
	            'aria-hidden': !open,
	            value: value,
	            format: timeFormat,
	            step: step,
	            min: min,
	            max: max,
	            currentDate: this.props.currentDate,
	            culture: culture,
	            onMove: this._scrollTo,
	            preserveDate: !!calendar,
	            itemComponent: timeComponent,
	            onSelect: this._selectTime
	          })
	        )
	      ),
	      _react2['default'].createElement(
	        _Popup2['default'],
	        {
	          className: 'rw-calendar-popup',
	          dropUp: dropUp,
	          open: calendarIsOpen,
	          duration: duration
	        },
	        shouldRenderList && _react2['default'].createElement(Calendar, babelHelpers._extends({}, calProps, {
	          ref: 'calPopup',
	          tabIndex: '-1',
	          id: dateListID,
	          value: value,
	          'aria-hidden': !open,
	          'aria-live': 'polite',
	          ariaActiveDescendantKey: 'calendar',
	          onChange: this._selectDate,
	          // #75: need to aggressively reclaim focus from the calendar otherwise
	          // disabled header/footer buttons will drop focus completely from the widget
	          onNavigate: function () {
	            return _this.focus();
	          },
	          currentDate: this.props.currentDate,
	          onCurrentDateChange: this.props.onCurrentDateChange
	        }))
	      )
	    );
	  }
	}, {
	  key: '_change',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _change(date, str, constrain) {
	    var _props2 = this.props;
	    var onChange = _props2.onChange;
	    var value = _props2.value;

	    if (constrain) date = this.inRangeValue(date);

	    if (onChange) {
	      if (date == null || value == null) {
	        if (date != value) //eslint-disable-line eqeqeq
	          onChange(date, str);
	      } else if (!_utilDates2['default'].eq(date, value)) onChange(date, str);
	    }
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
	    var _props3 = this.props;
	    var open = _props3.open;
	    var calendar = _props3.calendar;
	    var time = _props3.time;

	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (e.key === 'Escape' && open) this.close();else if (e.altKey) {
	      e.preventDefault();

	      if (e.key === 'ArrowDown') {
	        if (calendar && time) this.open(open === popups.CALENDAR ? popups.TIME : popups.CALENDAR);else if (time) this.open(popups.TIME);else if (calendar) this.open(popups.CALENDAR);
	      } else if (e.key === 'ArrowUp') this.close();
	    } else if (open) {
	      if (open === popups.CALENDAR) this.refs.calPopup._keyDown(e);
	      if (open === popups.TIME) this.refs.timePopup._keyDown(e);
	    }
	  }
	}, {
	  key: '_keyPress',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyPress(e) {
	    _utilWidgetHelpers.notify(this.props.onKeyPress, [e]);

	    if (e.defaultPrevented) return;

	    if (this.props.open === popups.TIME) this.refs.timePopup._keyPress(e);
	  }
	}, {
	  key: 'focus',
	  value: function focus() {
	    if (_domHelpersActiveElement2['default']() !== _utilCompat2['default'].findDOMNode(this.refs.valueInput)) this.refs.valueInput.focus();
	  }
	}, {
	  key: '_selectDate',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _selectDate(date) {
	    var format = getFormat(this.props),
	        dateTime = _utilDates2['default'].merge(date, this.props.value, this.props.currentDate),
	        dateStr = formatDate(date, format, this.props.culture);

	    this.close();
	    _utilWidgetHelpers.notify(this.props.onSelect, [dateTime, dateStr]);
	    this._change(dateTime, dateStr, true);
	    this.focus();
	  }
	}, {
	  key: '_selectTime',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _selectTime(datum) {
	    var format = getFormat(this.props),
	        dateTime = _utilDates2['default'].merge(this.props.value, datum.date, this.props.currentDate),
	        dateStr = formatDate(datum.date, format, this.props.culture);

	    this.close();
	    _utilWidgetHelpers.notify(this.props.onSelect, [dateTime, dateStr]);
	    this._change(dateTime, dateStr, true);
	    this.focus();
	  }
	}, {
	  key: '_click',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _click(view, e) {
	    this.focus();
	    this.toggle(view, e);
	  }
	}, {
	  key: '_parse',
	  value: function _parse(string) {
	    var format = getFormat(this.props, true),
	        editFormat = this.props.editFormat,
	        parse = this.props.parse,
	        formats = [];

	    if (typeof parse === 'function') return parse(string, this.props.culture);

	    if (typeof format === 'string') formats.push(format);

	    if (typeof editFormat === 'string') formats.push(editFormat);

	    if (parse) formats = formats.concat(this.props.parse);

	    _invariant2['default'](formats.length, 'React Widgets: there are no specified `parse` formats provided and the `format` prop is a function. ' + 'the DateTimePicker is unable to parse `%s` into a dateTime, ' + 'please provide either a parse function or Globalize.js compatible string for `format`', string);

	    return formatsParser(formats, this.props.culture, string);
	  }
	}, {
	  key: 'toggle',
	  value: function toggle(view) {
	    this.props.open ? this.props.open !== view ? this.open(view) : this.close(view) : this.open(view);
	  }
	}, {
	  key: 'open',
	  value: function open(view) {
	    if (this.props.open !== view && this.props[view] === true) _utilWidgetHelpers.notify(this.props.onToggle, view);
	  }
	}, {
	  key: 'close',
	  value: function close() {
	    if (this.props.open) _utilWidgetHelpers.notify(this.props.onToggle, false);
	  }
	}, {
	  key: 'inRangeValue',
	  value: function inRangeValue(value) {
	    if (value == null) return value;

	    return _utilDates2['default'].max(_utilDates2['default'].min(value, this.props.max), this.props.min);
	  }
	}]));

	exports['default'] = _uncontrollable2['default'](DateTimePicker, { open: 'onToggle', value: 'onChange', currentDate: 'onCurrentDateChange' }, ['focus']);

	function getFormat(props) {
	  var cal = props[popups.CALENDAR] != null ? props.calendar : true,
	      time = props[popups.TIME] != null ? props.time : true;

	  return props.format ? props.format : cal && time || !cal && !time ? _utilLocalizers.date.getFormat('default') : _utilLocalizers.date.getFormat(cal ? 'date' : 'time');
	}

	function formatDate(date, format, culture) {
	  var val = '';

	  if (date instanceof Date && !isNaN(date.getTime())) val = _utilLocalizers.date.format(date, format, culture);

	  return val;
	}

	function formatsParser(formats, culture, str) {
	  var date;

	  for (var i = 0; i < formats.length; i++) {
	    date = _utilLocalizers.date.parse(str, formats[i], culture);
	    if (date) return date;
	  }
	  return null;
	}

	function dateOrNull(dt) {
	  if (dt && !isNaN(dt.getTime())) return dt;
	  return null;
	}
	module.exports = exports['default'];

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _utilDates = __webpack_require__(67);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _List = __webpack_require__(35);

	var _List2 = babelHelpers.interopRequireDefault(_List);

	var _utilLocalizers = __webpack_require__(18);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var format = function format(props) {
	  return _utilLocalizers.date.getFormat('time', props.format);
	};

	exports['default'] = _react2['default'].createClass({

	  displayName: 'TimeList',

	  propTypes: {
	    value: _react2['default'].PropTypes.instanceOf(Date),
	    min: _react2['default'].PropTypes.instanceOf(Date),
	    max: _react2['default'].PropTypes.instanceOf(Date),
	    currentDate: _react2['default'].PropTypes.instanceOf(Date),
	    step: _react2['default'].PropTypes.number,
	    itemComponent: _utilPropTypes2['default'].elementType,
	    format: _utilPropTypes2['default'].dateFormat,
	    onSelect: _react2['default'].PropTypes.func,
	    preserveDate: _react2['default'].PropTypes.bool,
	    culture: _react2['default'].PropTypes.string
	  },

	  mixins: [__webpack_require__(48)],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      step: 30,
	      onSelect: function onSelect() {},
	      min: new Date(1900, 0, 1),
	      max: new Date(2099, 11, 31),
	      preserveDate: true,
	      delay: 300
	    };
	  },

	  getInitialState: function getInitialState() {
	    var data = this._dates(this.props),
	        focusedItem = this._closestDate(data, this.props.value);

	    return {
	      focusedItem: focusedItem || data[0],
	      dates: data
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var data = this._dates(nextProps),
	        focusedItem = this._closestDate(data, nextProps.value),
	        valChanged = !_utilDates2['default'].eq(nextProps.value, this.props.value, 'minutes'),
	        minChanged = !_utilDates2['default'].eq(nextProps.min, this.props.min, 'minutes'),
	        maxChanged = !_utilDates2['default'].eq(nextProps.max, this.props.max, 'minutes'),
	        localeChanged = this.props.format !== nextProps.format || this.props.culture !== nextProps.culture;

	    if (valChanged || minChanged || maxChanged || localeChanged) {
	      this.setState({
	        focusedItem: focusedItem || data[0],
	        dates: data
	      });
	    }
	  },

	  render: function render() {
	    var _props = this.props;
	    var min = _props.min;
	    var max = _props.max;
	    var value = _props.value;
	    var step = _props.step;
	    var props = babelHelpers.objectWithoutProperties(_props, ['min', 'max', 'value', 'step']);

	    var times = this.state.dates,
	        date = this._closestDate(times, value);

	    return _react2['default'].createElement(_List2['default'], babelHelpers._extends({}, props, {
	      ref: 'list',
	      data: times,
	      textField: 'label',
	      valueField: 'date',
	      selected: date,
	      focused: this.state.focusedItem
	    }));
	  },

	  _closestDate: function _closestDate(times, date) {
	    var roundTo = 1000 * 60 * this.props.step,
	        inst = null,
	        label;

	    if (!date) return null;

	    date = new Date(Math.floor(date.getTime() / roundTo) * roundTo);
	    label = _utilLocalizers.date.format(date, format(this.props), this.props.culture);

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
	        startDay = _utilDates2['default'].date(start);

	    while (_utilDates2['default'].date(start) === startDay && _utilDates2['default'].lte(start, values.max)) {
	      i++;
	      times.push({ date: start, label: _utilLocalizers.date.format(start, format(props), props.culture) });
	      start = _utilDates2['default'].add(start, props.step || 30, 'minutes');
	    }
	    return times;
	  },

	  _dateValues: function _dateValues(props) {
	    var value = props.value || props.currentDate || _utilDates2['default'].today(),
	        useDate = props.preserveDate,
	        min = props.min,
	        max = props.max,
	        start,
	        end;

	    //compare just the time regradless of whether they fall on the same day
	    if (!useDate) {
	      start = _utilDates2['default'].startOf(_utilDates2['default'].merge(new Date(), min, props.currentDate), 'minutes');
	      end = _utilDates2['default'].startOf(_utilDates2['default'].merge(new Date(), max, props.currentDate), 'minutes');

	      if (_utilDates2['default'].lte(end, start) && _utilDates2['default'].gt(max, min, 'day')) end = _utilDates2['default'].tomorrow();

	      return {
	        min: start,
	        max: end
	      };
	    }

	    start = _utilDates2['default'].today();
	    end = _utilDates2['default'].tomorrow();
	    //date parts are equal
	    return {
	      min: _utilDates2['default'].eq(value, min, 'day') ? _utilDates2['default'].merge(start, min, props.currentDate) : start,
	      max: _utilDates2['default'].eq(value, max, 'day') ? _utilDates2['default'].merge(start, max, props.currentDate) : end
	    };
	  },

	  _keyDown: function _keyDown(e) {
	    var key = e.key,
	        focusedItem = this.state.focusedItem,
	        list = this.refs.list;

	    if (key === 'End') this.setState({ focusedItem: list.last() });else if (key === 'Home') this.setState({ focusedItem: list.first() });else if (key === 'Enter') this.props.onSelect(focusedItem);else if (key === 'ArrowDown') {
	      e.preventDefault();
	      this.setState({ focusedItem: list.next(focusedItem) });
	    } else if (key === 'ArrowUp') {
	      e.preventDefault();
	      this.setState({ focusedItem: list.prev(focusedItem) });
	    }
	  },

	  _keyPress: function _keyPress(e) {
	    var _this = this;

	    e.preventDefault();

	    this.search(String.fromCharCode(e.which), function (item) {
	      _this.isMounted() && _this.setState({ focusedItem: item });
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

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _utilLocalizers = __webpack_require__(18);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	exports['default'] = _react2['default'].createClass({

	  displayName: 'DatePickerInput',

	  propTypes: {
	    format: _utilPropTypes2['default'].dateFormat.isRequired,
	    editFormat: _utilPropTypes2['default'].dateFormat,
	    parse: _react2['default'].PropTypes.func.isRequired,

	    value: _react2['default'].PropTypes.instanceOf(Date),
	    onChange: _react2['default'].PropTypes.func.isRequired,
	    culture: _react2['default'].PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      textValue: ''
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var text = formatDate(nextProps.value, nextProps.editing && nextProps.editFormat ? nextProps.editFormat : nextProps.format, nextProps.culture);

	    this.startValue = text;

	    this.setState({
	      textValue: text
	    });
	  },

	  getInitialState: function getInitialState() {
	    var text = formatDate(this.props.value, this.props.editing && this.props.editFormat ? this.props.editFormat : this.props.format, this.props.culture);

	    this.startValue = text;

	    return {
	      textValue: text
	    };
	  },

	  render: function render() {
	    var value = this.state.textValue;

	    return _react2['default'].createElement('input', babelHelpers._extends({}, this.props, {
	      type: 'text',
	      className: _classnames2['default']({ 'rw-input': true }),
	      value: value,
	      'aria-disabled': this.props.disabled,
	      'aria-readonly': this.props.readOnly,
	      disabled: this.props.disabled,
	      readOnly: this.props.readOnly,
	      onChange: this._change,
	      onBlur: chain(this.props.blur, this._blur, this) }));
	  },

	  _change: function _change(e) {
	    this.setState({ textValue: e.target.value });
	    this._needsFlush = true;
	  },

	  _blur: function _blur(e) {
	    var val = e.target.value,
	        date;

	    if (this._needsFlush) {
	      this._needsFlush = false;
	      date = this.props.parse(val);

	      this.props.onChange(date, formatDate(date, this.props.format, this.props.culture));
	    }
	  },

	  focus: function focus() {
	    _utilCompat2['default'].findDOMNode(this).focus();
	  }

	});

	function isValid(d) {
	  return !isNaN(d.getTime());
	}

	function formatDate(date, format, culture) {
	  var val = '';

	  if (date instanceof Date && isValid(date)) val = _utilLocalizers.date.format(date, format, culture);

	  return val;
	}

	function chain(a, b, thisArg) {
	  return function () {
	    a && a.apply(thisArg, arguments);
	    b && b.apply(thisArg, arguments);
	  };
	}
	module.exports = exports['default'];

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _uncontrollable = __webpack_require__(45);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _utilConstants = __webpack_require__(69);

	var _utilConstants2 = babelHelpers.interopRequireDefault(_utilConstants);

	var _utilRepeater = __webpack_require__(80);

	var _utilRepeater2 = babelHelpers.interopRequireDefault(_utilRepeater);

	var _utilLocalizers = __webpack_require__(18);

	var _NumberInput = __webpack_require__(81);

	var _NumberInput2 = babelHelpers.interopRequireDefault(_NumberInput);

	var _WidgetButton = __webpack_require__(59);

	var _WidgetButton2 = babelHelpers.interopRequireDefault(_WidgetButton);

	var _utilInteraction = __webpack_require__(39);

	var _utilWidgetHelpers = __webpack_require__(38);

	var directions = _utilConstants2['default'].directions;

	var format = function format(props) {
	  return _utilLocalizers.number.getFormat('default', props.format);
	};

	var propTypes = {

	  // -- controlled props -----------
	  value: _react2['default'].PropTypes.number,
	  onChange: _react2['default'].PropTypes.func,
	  //------------------------------------

	  min: _react2['default'].PropTypes.number,
	  max: _react2['default'].PropTypes.number,
	  step: _react2['default'].PropTypes.number,

	  precision: _react2['default'].PropTypes.number,

	  culture: _react2['default'].PropTypes.string,

	  format: _utilPropTypes2['default'].numberFormat,

	  name: _react2['default'].PropTypes.string,

	  parse: _react2['default'].PropTypes.func,

	  autoFocus: _react2['default'].PropTypes.bool,
	  disabled: _utilPropTypes2['default'].disabled,
	  readOnly: _utilPropTypes2['default'].readOnly,

	  messages: _react2['default'].PropTypes.shape({
	    increment: _react2['default'].PropTypes.string,
	    decrement: _react2['default'].PropTypes.string
	  }),

	  placeholder: _react2['default'].PropTypes.string
	};

	var NumberPicker = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
	  key: 'displayName',
	  initializer: function initializer() {
	    return 'NumberPicker';
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(48), __webpack_require__(49), __webpack_require__(56), __webpack_require__(57)({
	      willHandle: function willHandle(focused) {
	        if (focused) this.focus();
	      }
	    })];
	  }
	}, {
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {
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
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    return {
	      focused: false,
	      active: false
	    };
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _$omit = _util_2['default'].omit(this.props, Object.keys(propTypes));

	    var className = _$omit.className;
	    var onKeyPress = _$omit.onKeyPress;
	    var onKeyUp = _$omit.onKeyUp;
	    var props = babelHelpers.objectWithoutProperties(_$omit, ['className', 'onKeyPress', 'onKeyUp']);
	    var val = this.constrainValue(this.props.value);

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, props, {
	        ref: 'element',
	        onKeyDown: this._keyDown,
	        onFocus: this.handleFocus,
	        onBlur: this.handleBlur,
	        tabIndex: '-1',
	        className: _classnames2['default'](className, 'rw-numberpicker', 'rw-widget', {
	          'rw-state-focus': this.state.focused,
	          'rw-state-disabled': this.props.disabled,
	          'rw-state-readonly': this.props.readOnly,
	          'rw-rtl': this.isRtl()
	        }) }),
	      _react2['default'].createElement(
	        'span',
	        { className: 'rw-select' },
	        _react2['default'].createElement(
	          _WidgetButton2['default'],
	          {
	            tabIndex: '-1',
	            className: _classnames2['default']({ 'rw-state-active': this.state.active === directions.UP }),
	            onMouseDown: this._mouseDown.bind(null, directions.UP),
	            onMouseUp: this._mouseUp.bind(null, directions.UP),
	            onMouseLeave: this._mouseUp.bind(null, directions.UP),
	            onClick: this.handleFocus,
	            disabled: val === this.props.max || this.props.disabled,
	            'aria-disabled': val === this.props.max || this.props.disabled },
	          _react2['default'].createElement(
	            'i',
	            { className: 'rw-i rw-i-caret-up' },
	            _react2['default'].createElement(
	              'span',
	              { className: 'rw-sr' },
	              this.props.messages.increment
	            )
	          )
	        ),
	        _react2['default'].createElement(
	          _WidgetButton2['default'],
	          {
	            tabIndex: '-1',
	            className: _classnames2['default']({ 'rw-state-active': this.state.active === directions.DOWN }),
	            onMouseDown: this._mouseDown.bind(null, directions.DOWN),
	            onMouseUp: this._mouseUp.bind(null, directions.DOWN),
	            onMouseLeave: this._mouseUp.bind(null, directions.DOWN),
	            onClick: this.handleFocus,
	            disabled: val === this.props.min || this.props.disabled,
	            'aria-disabled': val === this.props.min || this.props.disabled },
	          _react2['default'].createElement(
	            'i',
	            { className: 'rw-i rw-i-caret-down' },
	            _react2['default'].createElement(
	              'span',
	              { className: 'rw-sr' },
	              this.props.messages.decrement
	            )
	          )
	        )
	      ),
	      _react2['default'].createElement(_NumberInput2['default'], {
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
	  }
	}, {
	  key: '_mouseDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _mouseDown(dir) {
	    var method = dir === directions.UP ? this.increment : this.decrement;

	    this.setState({ active: dir });

	    var val = method.call(this);

	    if (!(dir === directions.UP && val === this.props.max || dir === directions.DOWN && val === this.props.min)) {
	      if (!this._cancelRepeater) this._cancelRepeater = _utilRepeater2['default'](this._mouseDown.bind(null, dir));
	    } else this._mouseUp();
	  }
	}, {
	  key: '_mouseUp',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _mouseUp() {
	    this.setState({ active: false });
	    this._cancelRepeater && this._cancelRepeater();
	    this._cancelRepeater = null;
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
	    var key = e.key;

	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (key === 'End' && isFinite(this.props.max)) this.change(this.props.max);else if (key === 'Home' && isFinite(this.props.min)) this.change(this.props.min);else if (key === 'ArrowDown') {
	      e.preventDefault();
	      this.decrement();
	    } else if (key === 'ArrowUp') {
	      e.preventDefault();
	      this.increment();
	    }
	  }
	}, {
	  key: 'focus',
	  value: function focus() {
	    _utilCompat2['default'].findDOMNode(this.refs.input).focus();
	  }
	}, {
	  key: 'increment',
	  value: function increment() {
	    return this.step(this.props.step);
	  }
	}, {
	  key: 'decrement',
	  value: function decrement() {
	    return this.step(-this.props.step);
	  }
	}, {
	  key: 'step',
	  value: function step(amount) {
	    var value = (this.props.value || 0) + amount;

	    var decimals = this.props.precision != null ? this.props.precision : _utilLocalizers.number.precision(format(this.props));

	    this.change(decimals != null ? round(value, decimals) : value);

	    return value;
	  }
	}, {
	  key: 'change',
	  value: function change(val) {
	    val = this.constrainValue(val);

	    if (this.props.value !== val) _utilWidgetHelpers.notify(this.props.onChange, val);
	  }
	}, {
	  key: 'constrainValue',
	  value: function constrainValue(value) {
	    var max = this.props.max == null ? Infinity : this.props.max,
	        min = this.props.min == null ? -Infinity : this.props.min;

	    if (value == null || value === '') return null;

	    return Math.max(Math.min(value, max), min);
	  }
	}]));

	exports['default'] = _uncontrollable2['default'](NumberPicker, { value: 'onChange' }, ['focus']);

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

	//allow for styling, focus stealing keeping me from the normal what have you

/***/ },
/* 80 */
/***/ function(module, exports) {

	// my tests in ie11/chrome/FF indicate that keyDown repeats
	// at about 35ms+/- 5ms after an initial 500ms delay. callback fires on the leading edge
	"use strict";

	exports.__esModule = true;
	exports["default"] = Repeater;

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

	module.exports = exports["default"];

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilLocalizers = __webpack_require__(18);

	var getFormat = function getFormat(props) {
	  return _utilLocalizers.number.getFormat('default', props.format);
	};

	exports['default'] = _react2['default'].createClass({

	  displayName: 'NumberPickerInput',

	  propTypes: {
	    value: _react2['default'].PropTypes.number,
	    placeholder: _react2['default'].PropTypes.string,

	    format: _utilPropTypes2['default'].numberFormat,

	    parse: _react2['default'].PropTypes.func,
	    culture: _react2['default'].PropTypes.string,

	    min: _react2['default'].PropTypes.number,

	    onChange: _react2['default'].PropTypes.func.isRequired,
	    onKeyDown: _react2['default'].PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      value: null,
	      editing: false
	    };
	  },

	  getDefaultState: function getDefaultState() {
	    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

	    var value = props.value,
	        decimal = _utilLocalizers.number.decimalChar(null, props.culture),
	        format = getFormat(props);

	    this._beginningWithSign = false;

	    if (value == null || isNaN(props.value)) value = '';else value = props.editing ? ('' + value).replace('.', decimal) : _utilLocalizers.number.format(value, format, props.culture);

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

	    return _react2['default'].createElement('input', babelHelpers._extends({}, this.props, {
	      type: 'text',
	      className: 'rw-input',
	      onChange: this._change,
	      onBlur: this._finish,
	      onKeyPress: this._typing,
	      'aria-disabled': this.props.disabled,
	      'aria-readonly': this.props.readOnly,
	      disabled: this.props.disabled,
	      readOnly: this.props.readOnly,
	      placeholder: this.props.placeholder,
	      value: value }));
	  },

	  _typing: function _typing(e) {
	    var current = e.target.value,
	        newVal = e.key;

	    this._beginningWithSign = current.trim() === '' && this.isSign(newVal);

	    this.props.onKeyPress && this.props.onKeyPress(e);
	  },

	  _change: function _change(e) {
	    var val = e.target.value,
	        number = this._parse(e.target.value),
	        atSign = this.isSign(val.trim()),
	        startingWithSign = this._beginningWithSign;

	    this._beginningWithSign = false;

	    if (val == null || val.trim() === '' || atSign && !startingWithSign) {
	      this.current('');
	      return this.props.onChange(null);
	    }

	    if (this.isFlushable(number, val)) {
	      if (number !== this.props.value) return this.props.onChange(number);else this.setState(this.getDefaultState()); // 5. -> 5
	    }

	    if (number < this.props.min || atSign && startingWithSign || this.isAtDelimiter(number, val)) this.current(e.target.value);
	  },

	  _finish: function _finish() {
	    var str = this.state.stringValue,
	        number = this._parse(str);

	    // if number is below the min
	    // we need to flush low values and decimal stops, onBlur means i'm done inputing
	    if (!isNaN(number) && (number < this.props.min || this.isAtDelimiter(number, str))) {
	      this.props.onChange(number);
	    }
	  },

	  _parse: function _parse(strVal) {
	    var culture = this.props.culture,
	        delimChar = _utilLocalizers.number.decimalChar(null, culture),
	        userParse = this.props.parse;

	    if (userParse) return userParse(strVal, culture);

	    strVal = strVal.replace(delimChar, '.');
	    strVal = parseFloat(strVal);

	    return strVal;
	  },

	  isFlushable: function isFlushable(num, str) {
	    return this.isValid(num) && !this.isAtDelimiter(num, str) && !this.isSign(str);
	  },

	  isSign: function isSign(val) {
	    return (val || '').trim() === '-';
	  },

	  isAtDelimiter: function isAtDelimiter(num, str) {
	    var props = arguments.length <= 2 || arguments[2] === undefined ? this.props : arguments[2];

	    var localeChar = _utilLocalizers.number.decimalChar(null, props.culture),
	        lastIndex = str.length - 1,
	        char;

	    if (str.length <= 1) return false;

	    char = str[lastIndex];

	    return char === localeChar && str.indexOf(char) === lastIndex;
	  },

	  isValid: function isValid(num) {
	    if (typeof num !== 'number' || isNaN(num)) return false;
	    return num >= this.props.min;
	  },

	  //this intermediate state is for when one runs into the decimal or are typing the number
	  current: function current(val) {
	    this.setState({ stringValue: val });
	  }

	});
	module.exports = exports['default'];

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _Popup = __webpack_require__(27);

	var _Popup2 = babelHelpers.interopRequireDefault(_Popup);

	var _MultiselectInput = __webpack_require__(83);

	var _MultiselectInput2 = babelHelpers.interopRequireDefault(_MultiselectInput);

	var _MultiselectTagList = __webpack_require__(84);

	var _MultiselectTagList2 = babelHelpers.interopRequireDefault(_MultiselectTagList);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _List = __webpack_require__(35);

	var _List2 = babelHelpers.interopRequireDefault(_List);

	var _ListGroupable = __webpack_require__(42);

	var _ListGroupable2 = babelHelpers.interopRequireDefault(_ListGroupable);

	var _utilValidateListInterface = __webpack_require__(44);

	var _utilValidateListInterface2 = babelHelpers.interopRequireDefault(_utilValidateListInterface);

	var _uncontrollable = __webpack_require__(45);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _utilDataHelpers = __webpack_require__(37);

	var _utilInteraction = __webpack_require__(39);

	var _utilWidgetHelpers = __webpack_require__(38);

	var compatCreate = function compatCreate(props, msgs) {
	  return typeof msgs.createNew === 'function' ? msgs.createNew(props) : [_react2['default'].createElement(
	    'strong',
	    { key: 'dumb' },
	    '"' + props.searchTerm + '"'
	  ), ' ' + msgs.createNew];
	};

	var omit = _util_2['default'].omit;
	var pick = _util_2['default'].pick;
	var splat = _util_2['default'].splat;

	var propTypes = {
	  data: _react2['default'].PropTypes.array,
	  //-- controlled props --
	  value: _react2['default'].PropTypes.array,
	  onChange: _react2['default'].PropTypes.func,

	  searchTerm: _react2['default'].PropTypes.string,
	  onSearch: _react2['default'].PropTypes.func,

	  open: _react2['default'].PropTypes.bool,
	  onToggle: _react2['default'].PropTypes.func,
	  //-------------------------------------------

	  valueField: _react2['default'].PropTypes.string,
	  textField: _utilPropTypes2['default'].accessor,

	  tagComponent: _utilPropTypes2['default'].elementType,
	  itemComponent: _utilPropTypes2['default'].elementType,
	  listComponent: _utilPropTypes2['default'].elementType,

	  groupComponent: _utilPropTypes2['default'].elementType,
	  groupBy: _utilPropTypes2['default'].accessor,

	  createComponent: _utilPropTypes2['default'].elementType,

	  onSelect: _react2['default'].PropTypes.func,
	  onCreate: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.oneOf([false]), _react2['default'].PropTypes.func]),

	  dropUp: _react2['default'].PropTypes.bool,
	  duration: _react2['default'].PropTypes.number, //popup

	  placeholder: _react2['default'].PropTypes.string,

	  autoFocus: _react2['default'].PropTypes.bool,
	  disabled: _utilPropTypes2['default'].disabled.acceptsArray,
	  readOnly: _utilPropTypes2['default'].readOnly.acceptsArray,

	  messages: _react2['default'].PropTypes.shape({
	    open: _utilPropTypes2['default'].message,
	    emptyList: _utilPropTypes2['default'].message,
	    emptyFilter: _utilPropTypes2['default'].message,
	    createNew: _utilPropTypes2['default'].message
	  })
	};

	var Multiselect = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
	  key: 'displayName',
	  initializer: function initializer() {
	    return 'Multiselect';
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(48), __webpack_require__(50), __webpack_require__(51), __webpack_require__(56), __webpack_require__(57)({
	      willHandle: function willHandle(focused) {
	        focused && this.focus();
	      },
	      didHandle: function didHandle(focused) {
	        if (!focused) this.close();

	        if (!focused && this.refs.tagList) this.setState({ focusedTag: null });

	        if (focused && !this.props.open) this.open();
	      }
	    }), __webpack_require__(41)('input', function (key, id) {
	      var myKey = this.props.ariaActiveDescendantKey;

	      var createIsActive = (!this._data().length || this.state.focusedItem === null) && key === myKey;

	      var tagIsActive = this.state.focusedTag != null && key === 'taglist';
	      var listIsActive = this.state.focusedTag == null && key === 'list';

	      if (createIsActive || tagIsActive || listIsActive) return id;
	    })];
	  }
	}, {
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {
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
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    var _props = this.props;
	    var data = _props.data;
	    var value = _props.value;
	    var valueField = _props.valueField;
	    var searchTerm = _props.searchTerm;
	    var dataItems = splat(value).map(function (item) {
	      return _utilDataHelpers.dataItem(data, item, valueField);
	    });
	    var processedData = this.process(data, dataItems, searchTerm);

	    return {
	      focusedTag: null,
	      focusedItem: processedData[0],
	      processedData: processedData,
	      dataItems: dataItems
	    };
	  }
	}, {
	  key: 'componentDidUpdate',
	  value: function componentDidUpdate() {
	    this.ariaActiveDescendant(_utilWidgetHelpers.instanceId(this, '__createlist_option'));

	    this.refs.list && _utilValidateListInterface2['default'](this.refs.list);
	  }
	}, {
	  key: 'componentWillReceiveProps',
	  value: function componentWillReceiveProps(nextProps) {
	    var data = nextProps.data;
	    var value = nextProps.value;
	    var valueField = nextProps.valueField;
	    var searchTerm = nextProps.searchTerm;
	    var values = _util_2['default'].splat(value);
	    var current = this.state.focusedItem;
	    var items = this.process(data, values, searchTerm);

	    this.setState({
	      processedData: items,
	      focusedItem: items.indexOf(current) === -1 ? items[0] : current,
	      dataItems: values.map(function (item) {
	        return _utilDataHelpers.dataItem(data, item, valueField);
	      })
	    });
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _cx,
	        _this = this;

	    var _props2 = this.props;
	    var searchTerm = _props2.searchTerm;
	    var maxLength = _props2.maxLength;
	    var className = _props2.className;
	    var tabIndex = _props2.tabIndex;
	    var textField = _props2.textField;
	    var groupBy = _props2.groupBy;
	    var messages = _props2.messages;
	    var busy = _props2.busy;
	    var dropUp = _props2.dropUp;
	    var open = _props2.open;
	    var disabled = _props2.disabled;
	    var readOnly = _props2.readOnly;
	    var TagComponent = _props2.tagComponent;
	    var List = _props2.listComponent;

	    List = List || groupBy && _ListGroupable2['default'] || _List2['default'];

	    messages = msgs(messages);

	    var elementProps = omit(this.props, Object.keys(propTypes));
	    var tagsProps = pick(this.props, ['valueField', 'textField']);
	    var inputProps = pick(this.props, ['maxLength', 'searchTerm', 'autoFocus']);
	    var listProps = pick(this.props, Object.keys(List.propTypes));
	    var popupProps = pick(this.props, Object.keys(_Popup2['default'].propTypes));

	    var _state = this.state;
	    var focusedTag = _state.focusedTag;
	    var focusedItem = _state.focusedItem;
	    var focused = _state.focused;
	    var dataItems = _state.dataItems;

	    var items = this._data(),
	        tagsID = _utilWidgetHelpers.instanceId(this, '_taglist'),
	        listID = _utilWidgetHelpers.instanceId(this, '__listbox'),
	        createID = _utilWidgetHelpers.instanceId(this, '__createlist'),
	        createOptionID = _utilWidgetHelpers.instanceId(this, '__createlist_option');

	    var shouldRenderTags = !!dataItems.length,
	        shouldRenderPopup = _utilWidgetHelpers.isFirstFocusedRender(this) || open,
	        shouldShowCreate = this._shouldShowCreate(),
	        createIsFocused = !items.length || focusedItem === null;

	    if (focused) {
	      var notify = dataItems.length ? messages.selectedItems + ': ' + dataItems.map(function (item) {
	        return _utilDataHelpers.dataText(item, textField);
	      }).join(', ') : messages.noneSelected;
	    }

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, elementProps, {
	        ref: 'element',
	        id: _utilWidgetHelpers.instanceId(this),
	        onKeyDown: this._keyDown,
	        onBlur: this.handleBlur,
	        onFocus: this.handleFocus,
	        onTouchEnd: this.handleFocus,
	        tabIndex: '-1',
	        className: _classnames2['default'](className, 'rw-widget', 'rw-multiselect', (_cx = {
	          'rw-state-focus': focused,
	          'rw-state-disabled': disabled === true,
	          'rw-state-readonly': readOnly === true,
	          'rw-rtl': this.isRtl()
	        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx)) }),
	      _react2['default'].createElement(
	        'span',
	        {
	          ref: 'status',
	          id: _utilWidgetHelpers.instanceId(this, '__notify'),
	          role: 'status',
	          className: 'rw-sr',
	          'aria-live': 'assertive',
	          'aria-atomic': 'true',
	          'aria-relevant': 'additions removals text'
	        },
	        notify
	      ),
	      _react2['default'].createElement(
	        'div',
	        { className: 'rw-multiselect-wrapper', ref: 'wrapper' },
	        busy && _react2['default'].createElement('i', { className: 'rw-i rw-loading' }),
	        shouldRenderTags && _react2['default'].createElement(_MultiselectTagList2['default'], babelHelpers._extends({}, tagsProps, {
	          ref: 'tagList',
	          id: tagsID,
	          'aria-label': messages.tagsLabel,
	          value: dataItems,
	          focused: focusedTag,
	          disabled: disabled,
	          readOnly: readOnly,
	          onDelete: this._delete,
	          valueComponent: TagComponent,
	          ariaActiveDescendantKey: 'taglist'
	        })),
	        _react2['default'].createElement(_MultiselectInput2['default'], babelHelpers._extends({}, inputProps, {
	          ref: 'input',
	          tabIndex: tabIndex || 0,
	          role: 'listbox',
	          'aria-expanded': open,
	          'aria-busy': !!busy,
	          autoFocus: this.props.autoFocus,
	          'aria-owns': listID + ' ' + _utilWidgetHelpers.instanceId(this, '__notify') + (shouldRenderTags ? ' ' + tagsID : '') + (shouldShowCreate ? ' ' + createID : ''),
	          'aria-haspopup': true,
	          value: searchTerm,
	          maxLength: maxLength,
	          disabled: disabled === true,
	          readOnly: readOnly === true,
	          placeholder: this._placeholder(),
	          onKeyDown: this._searchKeyDown,
	          onKeyUp: this._searchgKeyUp,
	          onChange: this._typing,
	          onClick: this.handleInputInteraction,
	          onTouchEnd: this.handleInputInteraction
	        }))
	      ),
	      _react2['default'].createElement(
	        _Popup2['default'],
	        babelHelpers._extends({}, popupProps, {
	          onOpening: function () {
	            return _this.refs.list.forceUpdate();
	          }
	        }),
	        _react2['default'].createElement(
	          'div',
	          null,
	          shouldRenderPopup && [_react2['default'].createElement(List, babelHelpers._extends({ ref: 'list',
	            key: 0
	          }, listProps, {
	            readOnly: readOnly,
	            disabled: disabled,
	            id: listID,
	            'aria-live': 'polite',
	            'aria-labelledby': _utilWidgetHelpers.instanceId(this),
	            'aria-hidden': !open,
	            ariaActiveDescendantKey: 'list',
	            data: items,
	            focused: focusedItem,
	            onSelect: this._onSelect,
	            onMove: this._scrollTo,
	            messages: {
	              emptyList: this._lengthWithoutValues ? messages.emptyFilter : messages.emptyList
	            }
	          })), shouldShowCreate && _react2['default'].createElement(
	            'ul',
	            { key: 1, role: 'listbox', id: createID, className: 'rw-list rw-multiselect-create-tag' },
	            _react2['default'].createElement(
	              'li',
	              { onClick: this._onCreate.bind(null, searchTerm),
	                role: 'option',
	                id: createOptionID,
	                className: _classnames2['default']({
	                  'rw-list-option': true,
	                  'rw-state-focus': createIsFocused
	                }) },
	              compatCreate(this.props, messages)
	            )
	          )]
	        )
	      )
	    );
	  }
	}, {
	  key: '_data',
	  value: function _data() {
	    return this.state.processedData;
	  }
	}, {
	  key: '_delete',
	  value: function _delete(value) {
	    this.focus();
	    this.change(this.state.dataItems.filter(function (d) {
	      return d !== value;
	    }));
	  }
	}, {
	  key: '_searchKeyDown',
	  value: function _searchKeyDown(e) {
	    if (e.key === 'Backspace' && e.target.value && !this._deletingText) this._deletingText = true;
	  }
	}, {
	  key: '_searchgKeyUp',
	  value: function _searchgKeyUp(e) {
	    if (e.key === 'Backspace' && this._deletingText) this._deletingText = false;
	  }
	}, {
	  key: '_typing',
	  value: function _typing(e) {
	    _utilWidgetHelpers.notify(this.props.onSearch, [e.target.value]);
	    this.open();
	  }
	}, {
	  key: 'handleInputInteraction',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function handleInputInteraction() {
	    this.open();
	  }
	}, {
	  key: '_onSelect',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _onSelect(data) {

	    if (data === undefined) {
	      if (this.props.onCreate) this._onCreate(this.props.searchTerm);

	      return;
	    }

	    _utilWidgetHelpers.notify(this.props.onSelect, data);
	    this.change(this.state.dataItems.concat(data));

	    this.close();
	    this.focus();
	  }
	}, {
	  key: '_onCreate',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _onCreate(tag) {
	    if (tag.trim() === '') return;

	    _utilWidgetHelpers.notify(this.props.onCreate, tag);
	    this.props.searchTerm && _utilWidgetHelpers.notify(this.props.onSearch, ['']);

	    this.close();
	    this.focus();
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
	    var key = e.key;
	    var altKey = e.altKey;
	    var ctrlKey = e.ctrlKey;
	    var noSearch = !this.props.searchTerm && !this._deletingText;
	    var isOpen = this.props.open;var _state2 = this.state;
	    var focusedTag = _state2.focusedTag;
	    var focusedItem = _state2.focusedItem;
	    var _refs = this.refs;
	    var list = _refs.list;
	    var tagList = _refs.tagList;

	    var nullTag = { focusedTag: null };

	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (key === 'ArrowDown') {
	      var next = list.next(focusedItem),
	          creating = this._shouldShowCreate() && focusedItem === next || focusedItem === null;

	      next = creating ? null : next;

	      e.preventDefault();
	      if (isOpen) this.setState(babelHelpers._extends({ focusedItem: next }, nullTag));else this.open();
	    } else if (key === 'ArrowUp') {
	      var prev = focusedItem === null ? list.last() : list.prev(focusedItem);

	      e.preventDefault();

	      if (altKey) this.close();else if (isOpen) this.setState(babelHelpers._extends({ focusedItem: prev }, nullTag));
	    } else if (key === 'End') {
	      e.preventDefault();
	      if (isOpen) this.setState(babelHelpers._extends({ focusedItem: list.last() }, nullTag));else tagList && this.setState({ focusedTag: tagList.last() });
	    } else if (key === 'Home') {
	      e.preventDefault();
	      if (isOpen) this.setState(babelHelpers._extends({ focusedItem: list.first() }, nullTag));else tagList && this.setState({ focusedTag: tagList.first() });
	    } else if (isOpen && key === 'Enter') {
	      e.preventDefault();
	      ctrlKey && this.props.onCreate || focusedItem === null ? this._onCreate(this.props.searchTerm) : this._onSelect(this.state.focusedItem);
	    } else if (key === 'Escape') isOpen ? this.close() : tagList && this.setState(nullTag);else if (noSearch && key === 'ArrowLeft') tagList && this.setState({ focusedTag: tagList.prev(focusedTag) });else if (noSearch && key === 'ArrowRight') tagList && this.setState({ focusedTag: tagList.next(focusedTag) });else if (noSearch && key === 'Delete') tagList && tagList.remove(focusedTag);else if (noSearch && key === 'Backspace') tagList && tagList.removeNext();
	  }
	}, {
	  key: 'change',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function change(data) {
	    _utilWidgetHelpers.notify(this.props.onChange, [data]);
	    _utilWidgetHelpers.notify(this.props.onSearch, ['']);
	  }
	}, {
	  key: 'focus',
	  value: function focus() {
	    this.refs.input.focus();
	  }
	}, {
	  key: 'open',
	  value: function open() {
	    if (!this.props.open) _utilWidgetHelpers.notify(this.props.onToggle, true);
	  }
	}, {
	  key: 'close',
	  value: function close() {
	    _utilWidgetHelpers.notify(this.props.onToggle, false);
	  }
	}, {
	  key: 'toggle',
	  value: function toggle() {
	    this.props.open ? this.close() : this.open();
	  }
	}, {
	  key: 'process',
	  value: function process(data, values, searchTerm) {
	    var valueField = this.props.valueField;

	    var items = data.filter(function (i) {
	      return !values.some(function (v) {
	        return _utilDataHelpers.valueMatcher(i, v, valueField);
	      });
	    });

	    this._lengthWithoutValues = items.length;

	    if (searchTerm) items = this.filter(items, searchTerm);

	    return items;
	  }
	}, {
	  key: '_shouldShowCreate',
	  value: function _shouldShowCreate() {
	    var _props3 = this.props;
	    var textField = _props3.textField;
	    var searchTerm = _props3.searchTerm;
	    var onCreate = _props3.onCreate;

	    if (!onCreate || !searchTerm) return false;

	    // if there is an exact match on textFields: "john" => { name: "john" }, don't show
	    return !this._data().some(function (v) {
	      return _utilDataHelpers.dataText(v, textField) === searchTerm;
	    }) && !this.state.dataItems.some(function (v) {
	      return _utilDataHelpers.dataText(v, textField) === searchTerm;
	    });
	  }
	}, {
	  key: '_placeholder',
	  value: function _placeholder() {
	    return (this.props.value || []).length ? '' : this.props.placeholder || '';
	  }
	}]));

	function msgs(msgs) {
	  return babelHelpers._extends({
	    createNew: '(create new tag)',
	    emptyList: 'There are no items in this list',
	    emptyFilter: 'The filter returned no results',
	    tagsLabel: 'selected items',
	    selectedItems: 'selected items',
	    removeLabel: 'remove selected item'
	  }, msgs);
	}

	exports['default'] = _uncontrollable2['default'](Multiselect, { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' }, ['focus']);
	module.exports = exports['default'];

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	exports['default'] = _react2['default'].createClass({

	  displayName: 'MultiselectInput',

	  propTypes: {
	    value: _react2['default'].PropTypes.string,
	    maxLength: _react2['default'].PropTypes.number,
	    onChange: _react2['default'].PropTypes.func.isRequired,
	    onFocus: _react2['default'].PropTypes.func,

	    disabled: _utilPropTypes2['default'].disabled,
	    readOnly: _utilPropTypes2['default'].readOnly
	  },

	  render: function render() {
	    var value = this.props.value,
	        placeholder = this.props.placeholder,
	        size = Math.max((value || placeholder).length, 1) + 1;

	    return _react2['default'].createElement('input', babelHelpers._extends({}, this.props, {
	      className: 'rw-input',
	      autoComplete: 'off',
	      'aria-disabled': this.props.disabled,
	      'aria-readonly': this.props.readOnly,
	      disabled: this.props.disabled,
	      readOnly: this.props.readOnly,
	      size: size
	    }));
	  },

	  focus: function focus() {
	    _utilCompat2['default'].findDOMNode(this).focus();
	  }

	});
	module.exports = exports['default'];

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilWidgetHelpers = __webpack_require__(38);

	var _utilDataHelpers = __webpack_require__(37);

	var _utilInteraction = __webpack_require__(39);

	var optionId = function optionId(id, idx) {
	  return id + '__option__' + idx;
	};

	exports['default'] = _react2['default'].createClass({

	  displayName: 'MultiselectTagList',

	  mixins: [__webpack_require__(49), __webpack_require__(41)()],

	  propTypes: {
	    value: _react2['default'].PropTypes.array,
	    focused: _react2['default'].PropTypes.number,

	    valueField: _react2['default'].PropTypes.string,
	    textField: _utilPropTypes2['default'].accessor,

	    valueComponent: _react2['default'].PropTypes.func,

	    disabled: _utilPropTypes2['default'].disabled.acceptsArray,
	    readOnly: _utilPropTypes2['default'].readOnly.acceptsArray
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      ariaActiveDescendantKey: 'taglist'
	    };
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    var focused = this.props.focused;
	    var activeId = optionId(_utilWidgetHelpers.instanceId(this), focused);

	    this.ariaActiveDescendant(focused == null || _utilInteraction.isDisabledItem(focused, this.props) ? null : activeId);
	  },

	  render: function render() {
	    var _this = this;

	    var props = _util_2['default'].omit(this.props, ['value', 'disabled', 'readOnly']);
	    var _props = this.props;
	    var focused = _props.focused;
	    var value = _props.value;
	    var textField = _props.textField;
	    var ValueComponent = _props.valueComponent;

	    var id = _utilWidgetHelpers.instanceId(this);

	    return _react2['default'].createElement(
	      'ul',
	      babelHelpers._extends({}, props, {
	        role: 'listbox',
	        tabIndex: '-1',
	        className: 'rw-multiselect-taglist'
	      }),
	      value.map(function (item, i) {
	        var isDisabled = _utilInteraction.isDisabledItem(item, _this.props),
	            isReadonly = _utilInteraction.isReadOnlyItem(item, _this.props),
	            isFocused = !isDisabled && focused === i,
	            currentID = optionId(id, i);

	        return _react2['default'].createElement(
	          'li',
	          {
	            key: i,
	            id: currentID,
	            tabIndex: '-1',
	            role: 'option',
	            className: _classnames2['default']({
	              'rw-state-focus': isFocused,
	              'rw-state-disabled': isDisabled,
	              'rw-state-readonly': isReadonly
	            })
	          },
	          ValueComponent ? _react2['default'].createElement(ValueComponent, { item: item }) : _utilDataHelpers.dataText(item, textField),
	          _react2['default'].createElement(
	            'span',
	            {
	              tabIndex: '-1',
	              onClick: !(isDisabled || isReadonly) ? _this._delete.bind(null, item) : undefined,
	              'aria-disabled': isDisabled,
	              'aria-label': 'Unselect',
	              disabled: isDisabled
	            },
	            _react2['default'].createElement(
	              'span',
	              { className: 'rw-tag-btn', 'aria-hidden': 'true' },
	              '×'
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

	    if (val && !(_utilInteraction.isDisabledItem(val, this.props) || _utilInteraction.isReadOnlyItem(val, this.props))) this.props.onDelete(val);
	  },

	  removeNext: function removeNext() {
	    var val = this.props.value[this.props.value.length - 1];

	    if (val && !(_utilInteraction.isDisabledItem(val, this.props) || _utilInteraction.isReadOnlyItem(val, this.props))) this.props.onDelete(val);
	  },

	  clear: function clear() {
	    this.setState({ focused: null });
	  },

	  first: function first() {
	    var idx = 0,
	        value = this.props.value,
	        l = value.length;

	    while (idx < l && _utilInteraction.isDisabledItem(value[idx], this.props)) idx++;

	    return idx !== l ? idx : null;
	  },

	  last: function last() {
	    var value = this.props.value,
	        idx = value.length - 1;

	    while (idx > -1 && _utilInteraction.isDisabledItem(value[idx], this.props)) idx--;

	    return idx >= 0 ? idx : null;
	  },

	  next: function next(current) {
	    var nextIdx = current + 1,
	        value = this.props.value,
	        l = value.length;

	    while (nextIdx < l && _utilInteraction.isDisabledItem(nextIdx, this.props)) nextIdx++;

	    if (current === null || nextIdx >= l) return null;

	    return nextIdx;
	  },

	  prev: function prev(current) {
	    var nextIdx = current,
	        value = this.props.value;

	    if (nextIdx === null || nextIdx === 0) nextIdx = value.length;

	    nextIdx--;

	    while (nextIdx > -1 && _utilInteraction.isDisabledItem(value[nextIdx], this.props)) nextIdx--;

	    return nextIdx >= 0 ? nextIdx : null;
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _uncontrollable = __webpack_require__(45);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _List = __webpack_require__(35);

	var _List2 = babelHelpers.interopRequireDefault(_List);

	var _ListGroupable = __webpack_require__(42);

	var _ListGroupable2 = babelHelpers.interopRequireDefault(_ListGroupable);

	var _ListOption = __webpack_require__(36);

	var _ListOption2 = babelHelpers.interopRequireDefault(_ListOption);

	var _utilValidateListInterface = __webpack_require__(44);

	var _utilValidateListInterface2 = babelHelpers.interopRequireDefault(_utilValidateListInterface);

	var _domHelpersUtilScrollTo = __webpack_require__(52);

	var _domHelpersUtilScrollTo2 = babelHelpers.interopRequireDefault(_domHelpersUtilScrollTo);

	var _utilDataHelpers = __webpack_require__(37);

	var _utilInteraction = __webpack_require__(39);

	var _utilWidgetHelpers = __webpack_require__(38);

	var omit = _util_2['default'].omit;
	var pick = _util_2['default'].pick;
	var find = _util_2['default'].find;

	var propTypes = {

	  data: _react2['default'].PropTypes.array,
	  value: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.any, _react2['default'].PropTypes.array]),
	  onChange: _react2['default'].PropTypes.func,
	  onMove: _react2['default'].PropTypes.func,

	  multiple: _react2['default'].PropTypes.bool,

	  itemComponent: _utilPropTypes2['default'].elementType,
	  listComponent: _utilPropTypes2['default'].elementType,

	  valueField: _react2['default'].PropTypes.string,
	  textField: _utilPropTypes2['default'].accessor,

	  busy: _react2['default'].PropTypes.bool,

	  filter: _react2['default'].PropTypes.string,
	  delay: _react2['default'].PropTypes.number,

	  disabled: _utilPropTypes2['default'].disabled.acceptsArray,
	  readOnly: _utilPropTypes2['default'].readOnly.acceptsArray,

	  messages: _react2['default'].PropTypes.shape({
	    emptyList: _react2['default'].PropTypes.string
	  })
	};

	function getFirstValue(props) {
	  var data = props.data;
	  var value = props.value;
	  var valueField = props.valueField;

	  value = _util_2['default'].splat(value);

	  if (value.length) return find(data, function (d) {
	    return _utilDataHelpers.dataIndexOf(value, d, valueField) !== -1;
	  }) || null;

	  return null;
	}

	var SelectList = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
	  key: 'displayName',
	  initializer: function initializer() {
	    return 'SelectList';
	  }
	}, {
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(48), __webpack_require__(56), __webpack_require__(41)(), __webpack_require__(57)({
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
	    })];
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {
	    return {
	      delay: 250,
	      value: [],
	      data: [],
	      ariaActiveDescendantKey: 'selectlist',
	      messages: {
	        emptyList: 'There are no items in this list'
	      }
	    };
	  }
	}, {
	  key: 'getDefaultState',
	  value: function getDefaultState(props) {
	    var data = props.data;
	    var value = props.value;
	    var valueField = props.valueField;
	    var multiple = props.multiple;

	    return {
	      dataItems: multiple && _util_2['default'].splat(value).map(function (item) {
	        return _utilDataHelpers.dataItem(data, item, valueField);
	      })
	    };
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    var state = this.getDefaultState(this.props);

	    state.ListItem = getListItem(this);

	    return state;
	  }
	}, {
	  key: 'componentWillReceiveProps',
	  value: function componentWillReceiveProps(nextProps) {
	    return this.setState(this.getDefaultState(nextProps));
	  }
	}, {
	  key: 'componentDidMount',
	  value: function componentDidMount() {
	    _utilValidateListInterface2['default'](this.refs.list);
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var tabIndex = _props.tabIndex;
	    var busy = _props.busy;
	    var groupBy = _props.groupBy;
	    var List = _props.listComponent;

	    List = List || groupBy && _ListGroupable2['default'] || _List2['default'];

	    var elementProps = omit(this.props, Object.keys(propTypes));
	    var listProps = pick(this.props, Object.keys(List.propTypes));

	    var _state = this.state;
	    var ListItem = _state.ListItem;
	    var focusedItem = _state.focusedItem;
	    var focused = _state.focused;

	    var items = this._data(),
	        listID = _utilWidgetHelpers.instanceId(this, '_listbox');

	    focusedItem = focused && !_utilInteraction.isDisabled(this.props) && !_utilInteraction.isReadOnly(this.props) && focusedItem;

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, elementProps, {
	        onKeyDown: this._keyDown,
	        onKeyPress: this._keyPress,
	        onBlur: this.handleBlur,
	        onFocus: this.handleFocus,
	        role: 'radiogroup',
	        'aria-busy': !!busy,
	        'aria-disabled': _utilInteraction.isDisabled(this.props),
	        'aria-readonly': _utilInteraction.isReadOnly(this.props),
	        tabIndex: '-1',
	        className: _classnames2['default'](className, 'rw-widget', 'rw-selectlist', {
	          'rw-state-focus': focused,
	          'rw-state-disabled': _utilInteraction.isDisabled(this.props),
	          'rw-state-readonly': _utilInteraction.isReadOnly(this.props),
	          'rw-rtl': this.isRtl(),
	          'rw-loading-mask': busy
	        })
	      }),
	      _react2['default'].createElement(List, babelHelpers._extends({}, listProps, {
	        ref: 'list',
	        id: listID,
	        role: 'radiogroup',
	        tabIndex: tabIndex || '0',
	        data: items,
	        focused: focusedItem,
	        optionComponent: ListItem,
	        itemComponent: this.props.itemComponent,
	        onMove: this._scrollTo
	      }))
	    );
	  }
	}, {
	  key: '_scrollTo',
	  value: function _scrollTo(selected, list) {
	    var handler = this.props.onMove;

	    if (handler) handler(selected, list);else {
	      this._scrollCancel && this._scrollCancel();
	      // default behavior is to scroll the whole page not just the widget
	      this._scrollCancel = _domHelpersUtilScrollTo2['default'](selected);
	    }
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
	    var _this = this;

	    var key = e.key;
	    var _props2 = this.props;
	    var valueField = _props2.valueField;
	    var multiple = _props2.multiple;
	    var list = this.refs.list;
	    var focusedItem = this.state.focusedItem;

	    var change = function change(item) {
	      if (item) _this._change(item, multiple ? !_utilInteraction.contains(item, _this._values(), valueField) // toggle value
	      : true);
	    };

	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

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
	  }
	}, {
	  key: '_keyPress',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyPress(e) {
	    _utilWidgetHelpers.notify(this.props.onKeyPress, [e]);

	    if (e.defaultPrevented) return;

	    this.search(String.fromCharCode(e.which));
	  }
	}, {
	  key: 'focus',
	  value: function focus() {
	    _utilCompat2['default'].findDOMNode(this.refs.list).focus();
	  }
	}, {
	  key: 'selectAll',
	  value: function selectAll() {
	    var _this2 = this;

	    var _props3 = this.props;
	    var disabled = _props3.disabled;
	    var readOnly = _props3.readOnly;
	    var valueField = _props3.valueField;
	    var values = this.state.dataItems;
	    var data = this._data();
	    var blacklist;

	    disabled = disabled || readOnly;
	    disabled = Array.isArray(disabled) ? disabled : [];
	    //disabled values that are not selected
	    blacklist = disabled.filter(function (v) {
	      return !_utilInteraction.contains(v, values, valueField);
	    });
	    data = data.filter(function (v) {
	      return !_utilInteraction.contains(v, blacklist, valueField);
	    });

	    if (data.length === values.length) {
	      data = disabled.filter(function (item) {
	        return _utilInteraction.contains(item, values, valueField);
	      });
	      data = data.map(function (item) {
	        return _utilDataHelpers.dataItem(_this2._data(), item, valueField);
	      });
	    }

	    _utilWidgetHelpers.notify(this.props.onChange, [data]);
	  }
	}, {
	  key: '_change',
	  value: function _change(item, checked) {
	    var multiple = this.props.multiple;
	    var values = this.state.dataItems;

	    multiple = !!multiple;

	    this.clearTimeout('focusedItem');
	    this.setState({ focusedItem: item });

	    if (!multiple) return _utilWidgetHelpers.notify(this.props.onChange, checked ? item : null);

	    values = checked ? values.concat(item) : values.filter(function (v) {
	      return v !== item;
	    });

	    _utilWidgetHelpers.notify(this.props.onChange, [values || []]);
	  }
	}, {
	  key: 'search',
	  value: function search(character) {
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
	        !multiple ? _this3._change(focusedItem, true) : _this3.setState({ focusedItem: focusedItem });
	      }
	    }, this.props.delay);
	  }
	}, {
	  key: '_data',
	  value: function _data() {
	    return this.props.data;
	  }
	}, {
	  key: '_values',
	  value: function _values() {
	    return this.props.multiple ? this.state.dataItems : this.props.value;
	  }
	}]));

	function getListItem(parent) {

	  return _react2['default'].createClass({

	    displayName: 'SelectItem',

	    render: function render() {
	      var _props4 = this.props;
	      var children = _props4.children;
	      var disabled = _props4.disabled;
	      var readonly = _props4.readonly;
	      var item = _props4.dataItem;
	      var _parent$props = parent.props;
	      var multiple = _parent$props.multiple;
	      var _parent$props$name = _parent$props.name;
	      var name = _parent$props$name === undefined ? _utilWidgetHelpers.instanceId(parent, '_name') : _parent$props$name;

	      var checked = _utilInteraction.contains(item, parent._values(), parent.props.valueField),
	          change = parent._change.bind(null, item),
	          type = multiple ? 'checkbox' : 'radio';

	      return _react2['default'].createElement(
	        _ListOption2['default'],
	        babelHelpers._extends({}, this.props, {
	          role: type,
	          'aria-checked': !!checked
	        }),
	        _react2['default'].createElement(
	          'label',
	          { onMouseDown: onMouseDown },
	          _react2['default'].createElement('input', {
	            name: name,
	            tabIndex: '-1',
	            role: 'presentation',
	            type: type,
	            onChange: onChange,
	            checked: checked,
	            disabled: disabled || readonly
	          }),
	          children
	        )
	      );

	      function onMouseDown() {
	        parent._clicking = true;
	      }

	      function onChange(e) {
	        if (!disabled && !readonly) change(e.target.checked);
	      }
	    }
	  });
	}

	exports['default'] = _uncontrollable2['default'](SelectList, { value: 'onChange' }, ['selectAll', 'focus']);
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;