/*! (c) 2014 - present: Jason Quense | https://github.com/jquense/react-widgets/blob/master/LICENSE.md */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define([, ], factory);
	else if(typeof exports === 'object')
		exports["ReactWidgets"] = factory(require("react"), require("react-dom"));
	else
		root["ReactWidgets"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_20__, __WEBPACK_EXTERNAL_MODULE_29__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ((function(modules) {
	// Check all modules for deduplicated modules
	for(var i in modules) {
		if(Object.prototype.hasOwnProperty.call(modules, i)) {
			switch(typeof modules[i]) {
			case "function": break;
			case "object":
				// Module can be created from a template
				modules[i] = (function(_m) {
					var args = _m.slice(1), fn = modules[_m[0]];
					return function (a,b,c) {
						fn.apply(this, [a,b,c].concat(args));
					};
				}(modules[i]));
				break;
			default:
				// Module is a copy of another module
				modules[i] = modules[modules[i]];
				break;
			}
		}
	}
	return modules;
}([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	/* eslint-disable global-require */
	var configure = __webpack_require__(1);
	
	if (false) {
	  [Array.prototype.some, Array.prototype.filter, Array.prototype.reduce].forEach(function (method) {
	    if (!method) throw new Error('One or more ES5 features is not available to ReactWidgets: http://jquense.github.io/react-widgets/docs/#/getting-started/browser');
	  });
	}
	
	module.exports = _extends({}, configure, {
	  DropdownList: __webpack_require__(21),
	  Combobox: __webpack_require__(70),
	  Calendar: __webpack_require__(74),
	  DateTimePicker: __webpack_require__(88),
	  NumberPicker: __webpack_require__(93),
	  Multiselect: __webpack_require__(95),
	  SelectList: __webpack_require__(99),
	
	  utils: {
	    ReplaceTransitionGroup: __webpack_require__(87),
	    SlideTransition: __webpack_require__(85)
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _configuration = __webpack_require__(2);
	
	var _configuration2 = _interopRequireDefault(_configuration);
	
	var _localizers = __webpack_require__(16);
	
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _animate = __webpack_require__(3);
	
	var _animate2 = _interopRequireDefault(_animate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = { animate: _animate2.default };
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _hyphenate = __webpack_require__(4);
	
	var _hyphenate2 = _interopRequireDefault(_hyphenate);
	
	var _style = __webpack_require__(5);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _on = __webpack_require__(14);
	
	var _on2 = _interopRequireDefault(_on);
	
	var _off = __webpack_require__(15);
	
	var _off2 = _interopRequireDefault(_off);
	
	var _properties = __webpack_require__(11);
	
	var _properties2 = _interopRequireDefault(_properties);
	
	var _isTransform = __webpack_require__(13);
	
	var _isTransform2 = _interopRequireDefault(_isTransform);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var reset = {};
	reset[_properties2.default.property] = reset[_properties2.default.duration] = reset[_properties2.default.delay] = reset[_properties2.default.timing] = '';
	
	// super lean animate function for transitions
	// doesn't support all translations to keep it matching the jquery API
	/**
	 * code in part from: Zepto 1.1.4 | zeptojs.com/license
	 */
	function _animate(_ref) {
	  var node = _ref.node;
	  var properties = _ref.properties;
	  var _ref$duration = _ref.duration;
	  var duration = _ref$duration === undefined ? 200 : _ref$duration;
	  var easing = _ref.easing;
	  var callback = _ref.callback;
	
	  var cssProperties = [],
	      fakeEvent = { target: node, currentTarget: node },
	      cssValues = {},
	      transforms = '',
	      fired = void 0;
	
	  if (!_properties2.default.end) duration = 0;
	
	  Object.keys(properties).forEach(function (key) {
	    if ((0, _isTransform2.default)(key)) transforms += key + '(' + properties[key] + ') ';else {
	      cssValues[key] = properties[key];
	      cssProperties.push((0, _hyphenate2.default)(key));
	    }
	  });
	
	  if (transforms) {
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
	
	  //eslint-disable-next-line no-unused-expressions
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
	
	function animate(node, properties, duration, easing, callback) {
	  if (arguments.length === 1 && (typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object') {
	    return _animate(node);
	  }
	
	  if (typeof easing === 'function') {
	    callback = easing;
	    easing = null;
	  }
	
	  return _animate({ node: node, properties: properties, duration: duration, easing: easing, callback: callback });
	}
	
	exports.default = animate;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = hyphenate;
	
	var rUpper = /([A-Z])/g;
	
	function hyphenate(string) {
	  return string.replace(rUpper, '-$1').toLowerCase();
	}
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = style;
	
	var _camelizeStyle = __webpack_require__(6);
	
	var _camelizeStyle2 = _interopRequireDefault(_camelizeStyle);
	
	var _hyphenateStyle = __webpack_require__(8);
	
	var _hyphenateStyle2 = _interopRequireDefault(_hyphenateStyle);
	
	var _getComputedStyle2 = __webpack_require__(9);
	
	var _getComputedStyle3 = _interopRequireDefault(_getComputedStyle2);
	
	var _removeStyle = __webpack_require__(10);
	
	var _removeStyle2 = _interopRequireDefault(_removeStyle);
	
	var _properties = __webpack_require__(11);
	
	var _isTransform = __webpack_require__(13);
	
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = camelizeStyleName;
	
	var _camelize = __webpack_require__(7);
	
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

/***/ },
/* 7 */
/***/ function(module, exports) {

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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = hyphenateStyleName;
	
	var _hyphenate = __webpack_require__(4);
	
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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = _getComputedStyle;
	
	var _camelizeStyle = __webpack_require__(6);
	
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

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = removeStyle;
	function removeStyle(node, key) {
	  return 'removeProperty' in node.style ? node.style.removeProperty(key) : node.style.removeAttribute(key);
	}
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.animationEnd = exports.animationDelay = exports.animationTiming = exports.animationDuration = exports.animationName = exports.transitionEnd = exports.transitionDuration = exports.transitionDelay = exports.transitionTiming = exports.transitionProperty = exports.transform = undefined;
	
	var _inDOM = __webpack_require__(12);
	
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
	      return 'moz' + e;
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
	
	  if (!animationEnd && 'animationName' in style) transitionEnd = 'animationend';
	
	  style = null;
	
	  return { animationEnd: animationEnd, transitionEnd: transitionEnd, prefix: prefix };
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

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

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _inDOM = __webpack_require__(12);
	
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

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _inDOM = __webpack_require__(12);
	
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

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.date = exports.number = exports.setNumber = undefined;
	exports.setDate = setDate;
	
	var _invariant = __webpack_require__(17);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _ = __webpack_require__(18);
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var localePropType = _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.func]);
	
	var REQUIRED_NUMBER_FORMATS = ['default'];
	
	var REQUIRED_DATE_FORMATS = ['default', 'date', 'time', 'header', 'footer', 'dayOfMonth', 'month', 'year', 'decade', 'century'];
	
	function _format(localizer, formatter, value, format, culture) {
	  var result = typeof format === 'function' ? format(value, culture, localizer) : formatter.call(localizer, value, format, culture);
	
	  (0, _invariant2.default)(result == null || typeof result === 'string', '`localizer format(..)` must return a string, null, or undefined');
	
	  return result;
	}
	
	function checkFormats(requiredFormats, formats) {
	  if (false) requiredFormats.forEach(function (f) {
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
	
	  if (false) {
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

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
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
	  if (false) {
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


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.result = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.has = has;
	exports.isShallowEqual = isShallowEqual;
	exports.find = find;
	exports.chunk = chunk;
	exports.splat = splat;
	exports.groupBySortedKeys = groupBySortedKeys;
	
	var _warning = __webpack_require__(19);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function eql(a, b) {
	  return a === b;
	}
	
	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 */
	function _shallowEqual(objA, objB) {
	  if (objA == null || objB == null) return false;
	
	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);
	
	  if (keysA.length !== keysB.length) return false;
	
	  for (var i = 0; i < keysA.length; i++) {
	    if (!has(objB, keysA[i]) || !eql(objA[keysA[i]], objB[keysA[i]])) return false;
	  }return true;
	}
	
	function has(o, k) {
	  return o ? Object.prototype.hasOwnProperty.call(o, k) : false;
	}
	
	var result = exports.result = function result(value) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }
	
	  return typeof value === 'function' ? value.apply(undefined, args) : value;
	};
	
	function isShallowEqual(a, b) {
	  if (a === b) return true;
	  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
	  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== 'object' && (typeof b === 'undefined' ? 'undefined' : _typeof(b)) !== 'object') return a === b;
	  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== (typeof b === 'undefined' ? 'undefined' : _typeof(b))) return false;
	  return _shallowEqual(a, b);
	}
	
	function find(arr, cb) {
	  var result = void 0;
	  arr.every(function (val, idx) {
	    if (cb(val, idx, arr)) {
	      result = val;
	      return false;
	    }
	    return true;
	  });
	  return result;
	}
	
	function chunk(array, chunkSize) {
	  var index = 0,
	      length = array ? array.length : 0,
	      result = [];
	
	  chunkSize = Math.max(+chunkSize || 1, 1);
	
	  while (index < length) {
	    result.push(array.slice(index, index += chunkSize));
	  }return result;
	}
	
	function splat(obj) {
	  return obj == null ? [] : [].concat(obj);
	}
	
	function groupBySortedKeys(groupBy, data, keys) {
	  var iter = typeof groupBy === 'function' ? groupBy : function (item) {
	    return item[groupBy];
	  };
	
	  // the keys array ensures that groups are rendered in the order they came in
	  // which means that if you sort the data array it will render sorted,
	  // so long as you also sorted by group
	  keys = keys || [];
	
	  (0, _warning2.default)(typeof groupBy !== 'string' || !data.length || has(data[0], groupBy), '[React Widgets] You seem to be trying to group this list by a ' + ('property `' + groupBy + '` that doesn\'t exist in the dataset items, this may be a typo'));
	
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

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
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
	
	if (false) {
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


/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_20__;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _activeElement = __webpack_require__(22);
	
	var _activeElement2 = _interopRequireDefault(_activeElement);
	
	var _contains = __webpack_require__(24);
	
	var _contains2 = _interopRequireDefault(_contains);
	
	var _classnames = __webpack_require__(25);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _reactComponentManagers = __webpack_require__(26);
	
	var _uncontrollable = __webpack_require__(34);
	
	var _uncontrollable2 = _interopRequireDefault(_uncontrollable);
	
	var _Widget = __webpack_require__(37);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
	var _WidgetPicker = __webpack_require__(38);
	
	var _WidgetPicker2 = _interopRequireDefault(_WidgetPicker);
	
	var _Select = __webpack_require__(39);
	
	var _Select2 = _interopRequireDefault(_Select);
	
	var _Popup = __webpack_require__(41);
	
	var _Popup2 = _interopRequireDefault(_Popup);
	
	var _List = __webpack_require__(46);
	
	var _List2 = _interopRequireDefault(_List);
	
	var _DropdownListInput = __webpack_require__(59);
	
	var _DropdownListInput2 = _interopRequireDefault(_DropdownListInput);
	
	var _messages = __webpack_require__(60);
	
	var _Props = __webpack_require__(50);
	
	var Props = _interopRequireWildcard(_Props);
	
	var _Filter = __webpack_require__(53);
	
	var Filter = _interopRequireWildcard(_Filter);
	
	var _compat = __webpack_require__(45);
	
	var _compat2 = _interopRequireDefault(_compat);
	
	var _focusManager = __webpack_require__(61);
	
	var _focusManager2 = _interopRequireDefault(_focusManager);
	
	var _listDataManager = __webpack_require__(52);
	
	var _listDataManager2 = _interopRequireDefault(_listDataManager);
	
	var _PropTypes = __webpack_require__(47);
	
	var CustomPropTypes = _interopRequireWildcard(_PropTypes);
	
	var _accessorManager = __webpack_require__(55);
	
	var _accessorManager2 = _interopRequireDefault(_accessorManager);
	
	var _scrollManager = __webpack_require__(62);
	
	var _scrollManager2 = _interopRequireDefault(_scrollManager);
	
	var _withRightToLeft = __webpack_require__(67);
	
	var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);
	
	var _shallowCompare = __webpack_require__(68);
	
	var _shallowCompare2 = _interopRequireDefault(_shallowCompare);
	
	var _interaction = __webpack_require__(69);
	
	var _widgetHelpers = __webpack_require__(51);
	
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
	
	    _initDefineProp(_this, 'handleClick', _descriptor2, _this);
	
	    _initDefineProp(_this, 'handleKeyDown', _descriptor3, _this);
	
	    _initDefineProp(_this, 'handleKeyPress', _descriptor4, _this);
	
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
	
	  DropdownList.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }
	
	    return _shallowCompare2.default.apply(undefined, [this].concat(args));
	  };
	
	  DropdownList.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    this.messages = (0, _messages.getMessages)(nextProps.messages);
	    this.setState(this.getStateFromProps(nextProps));
	  };
	
	  DropdownList.prototype.getStateFromProps = function getStateFromProps(props) {
	    var value = props.value,
	        data = props.data,
	        searchTerm = props.searchTerm,
	        filter = props.filter,
	        minLength = props.minLength,
	        caseSensitive = props.caseSensitive;
	    var accessors = this.accessors,
	        list = this.list;
	
	    var initialIdx = accessors.indexOf(data, value);
	
	    data = Filter.filter(data, {
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
	
	  DropdownList.prototype.renderFilter = function renderFilter(messages) {
	    var _this2 = this;
	
	    return _react2.default.createElement(
	      _WidgetPicker2.default,
	      {
	        ref: 'filterWrapper',
	        className: 'rw-filter-input rw-input'
	      },
	      _react2.default.createElement(_Select2.default, { component: 'span', icon: 'search' }),
	      _react2.default.createElement('input', {
	        ref: 'filter',
	        value: this.props.searchTerm,
	        className: 'rw-input-reset',
	        placeholder: messages.filterPlaceholder(this.props),
	        onChange: function onChange(e) {
	          return (0, _widgetHelpers.notify)(_this2.props.onSearch, e.target.value);
	        }
	      })
	    );
	  };
	
	  DropdownList.prototype.renderList = function renderList(messages) {
	    var _props = this.props,
	        open = _props.open,
	        filter = _props.filter,
	        data = _props.data;
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
	      filter && this.renderFilter(messages),
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
	        } }))
	    );
	  };
	
	  DropdownList.prototype.render = function render() {
	    var _this3 = this;
	
	    var _props2 = this.props,
	        className = _props2.className,
	        tabIndex = _props2.tabIndex,
	        duration = _props2.duration,
	        textField = _props2.textField,
	        data = _props2.data,
	        busy = _props2.busy,
	        dropUp = _props2.dropUp,
	        placeholder = _props2.placeholder,
	        value = _props2.value,
	        open = _props2.open,
	        valueComponent = _props2.valueComponent;
	    var focused = this.state.focused;
	
	
	    var disabled = this.props.disabled === true,
	        readOnly = this.props.readOnly === true,
	        valueItem = this.accessors.findOrSelf(data, value);
	
	    var shouldRenderPopup = open || (0, _widgetHelpers.isFirstFocusedRender)(this);
	
	    var elementProps = _extends(Props.pickElementProps(this), {
	      name: undefined,
	      role: 'combobox',
	      id: this.inputId,
	      tabIndex: tabIndex || 0,
	      'aria-owns': this.listID,
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
	        onBlur: this.focusManager.handleBlur,
	        onFocus: this.focusManager.handleFocus,
	        onClick: this.handleClick,
	        onKeyDown: this.handleKeyDown,
	        onKeyPress: this.handleKeyPress,
	        className: (0, _classnames2.default)(className, 'rw-dropdown-list')
	      }),
	      _react2.default.createElement(
	        _WidgetPicker2.default,
	        {
	          open: open,
	          dropUp: dropUp,
	          focused: focused,
	          disabled: disabled,
	          readOnly: readOnly,
	          className: 'rw-widget-input'
	        },
	        _react2.default.createElement(_DropdownListInput2.default, {
	          value: valueItem,
	          textField: textField,
	          placeholder: placeholder,
	          valueComponent: valueComponent
	        }),
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
	          duration: duration,
	          onOpen: function onOpen() {
	            return _this3.focus();
	          },
	          onOpening: function onOpening() {
	            return _this3.refs.list.forceUpdate();
	          }
	        },
	        this.renderList(messages)
	      )
	    );
	  };
	
	  DropdownList.prototype.change = function change(nextValue, originalEvent) {
	    var _props3 = this.props,
	        onChange = _props3.onChange,
	        onSearch = _props3.onSearch,
	        searchTerm = _props3.searchTerm,
	        lastValue = _props3.value;
	
	
	    if (!this.accessors.matches(nextValue, lastValue)) {
	      (0, _widgetHelpers.notify)(onChange, [nextValue, {
	        originalEvent: originalEvent,
	        lastValue: lastValue,
	        searchTerm: searchTerm
	      }]);
	
	      (0, _widgetHelpers.notify)(onSearch, ['', originalEvent]);
	      this.close();
	    }
	  };
	
	  DropdownList.prototype.focus = function focus(target) {
	    var _props4 = this.props,
	        filter = _props4.filter,
	        open = _props4.open;
	
	    var inst = target || (filter && open ? this.refs.filter : this.refs.input);
	
	    inst = _compat2.default.findDOMNode(inst);
	
	    if (inst && (0, _activeElement2.default)() !== inst) inst.focus();
	  };
	
	  DropdownList.prototype.search = function search(character, cb) {
	    var _this4 = this;
	
	    var word = ((this._searchTerm || '') + character).toLowerCase();
	
	    if (!character) return;
	
	    this._searchTerm = word;
	
	    this.timeouts.set('search', function () {
	      var list = _this4.list,
	          key = _this4.props.open ? 'focusedItem' : 'selectedItem',
	          item = list.next(_this4.state[key], word);
	
	      _this4._searchTerm = '';
	      if (item) cb(item);
	    }, this.props.delay);
	  };
	
	  DropdownList.prototype.open = function open() {
	    (0, _widgetHelpers.notify)(this.props.onToggle, true);
	  };
	
	  DropdownList.prototype.close = function close() {
	    (0, _widgetHelpers.notify)(this.props.onToggle, false);
	  };
	
	  DropdownList.prototype.toggle = function toggle() {
	    this.props.open ? this.close() : this.open();
	  };
	
	  return DropdownList;
	}(_react2.default.Component), _class3.propTypes = _extends({}, Filter.propTypes, {
	
	  //-- controlled props -----------
	  value: _react2.default.PropTypes.any,
	  onChange: _react2.default.PropTypes.func,
	  open: _react2.default.PropTypes.bool,
	  onToggle: _react2.default.PropTypes.func,
	  //------------------------------------
	
	  data: _react2.default.PropTypes.array,
	  valueField: _react2.default.PropTypes.string,
	  textField: CustomPropTypes.accessor,
	
	  valueComponent: CustomPropTypes.elementType,
	  itemComponent: CustomPropTypes.elementType,
	  listComponent: CustomPropTypes.elementType,
	
	  groupComponent: CustomPropTypes.elementType,
	  groupBy: CustomPropTypes.accessor,
	
	  onSelect: _react2.default.PropTypes.func,
	  searchTerm: _react2.default.PropTypes.string,
	  onSearch: _react2.default.PropTypes.func,
	  busy: _react2.default.PropTypes.bool,
	
	  delay: _react2.default.PropTypes.number,
	  dropUp: _react2.default.PropTypes.bool,
	  duration: _react2.default.PropTypes.number,
	
	  placeholder: _react2.default.PropTypes.string,
	
	  disabled: CustomPropTypes.disabled.acceptsArray,
	  readOnly: CustomPropTypes.disabled,
	
	  listProps: _react2.default.PropTypes.object,
	
	  messages: _react2.default.PropTypes.shape({
	    open: _react2.default.PropTypes.string,
	    emptyList: CustomPropTypes.message,
	    emptyFilter: CustomPropTypes.message,
	    filterPlaceholder: _react2.default.PropTypes.string
	  })
	}), _class3.defaultProps = {
	  delay: 500,
	  value: '',
	  open: false,
	  data: [],
	  searchTerm: '',
	  minLength: 1,
	  filter: true,
	  caseSensitive: false,
	  listComponent: _List2.default
	}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'handleSelect', [_interaction.widgetEditable], {
	  enumerable: true,
	  initializer: function initializer() {
	    var _this5 = this;
	
	    return function (data, originalEvent) {
	      _this5.close();
	
	      (0, _widgetHelpers.notify)(_this5.props.onSelect, [data, {
	        originalEvent: originalEvent
	      }]);
	
	      _this5.change(data, originalEvent);
	      _this5.focus(_this5);
	    };
	  }
	}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'handleClick', [_interaction.widgetEditable], {
	  enumerable: true,
	  initializer: function initializer() {
	    var _this6 = this;
	
	    return function (e) {
	      var wrapper = _this6.refs.filterWrapper;
	
	      if (!_this6.props.filter || !_this6.props.open) _this6.toggle();else if (!(0, _contains2.default)(_compat2.default.findDOMNode(wrapper), e.target)) _this6.close();
	
	      (0, _widgetHelpers.notify)(_this6.props.onClick, e);
	    };
	  }
	}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_interaction.widgetEditable], {
	  enumerable: true,
	  initializer: function initializer() {
	    var _this7 = this;
	
	    return function (e) {
	      var key = e.key,
	          alt = e.altKey,
	          list = _this7.list,
	          filtering = _this7.props.filter,
	          focusedItem = _this7.state.focusedItem,
	          selectedItem = _this7.state.selectedItem,
	          isOpen = _this7.props.open;
	
	      var closeWithFocus = function closeWithFocus() {
	        _this7.close();
	        _compat2.default.findDOMNode(_this7).focus();
	      };
	
	      (0, _widgetHelpers.notify)(_this7.props.onKeyDown, [e]);
	
	      var change = function change(item, fromList) {
	        if (item == null) return;
	        fromList ? _this7.handleSelect(item, e) : _this7.change(item, e);
	      };
	
	      if (e.defaultPrevented) return;
	
	      if (key === 'End') {
	        e.preventDefault();
	
	        if (isOpen) _this7.setState({ focusedItem: list.last() });else change(list.last());
	      } else if (key === 'Home') {
	        e.preventDefault();
	
	        if (isOpen) _this7.setState({ focusedItem: list.first() });else change(list.first());
	      } else if (key === 'Escape' && isOpen) {
	        e.preventDefault();
	        closeWithFocus();
	      } else if ((key === 'Enter' || key === ' ' && !filtering) && isOpen) {
	        e.preventDefault();
	        change(_this7.state.focusedItem, true);
	      } else if (key === ' ' && !isOpen) {
	        e.preventDefault();
	        _this7.open();
	      } else if (key === 'ArrowDown') {
	        if (alt) _this7.open();else if (isOpen) _this7.setState({ focusedItem: list.next(focusedItem) });else change(list.next(selectedItem));
	        e.preventDefault();
	      } else if (key === 'ArrowUp') {
	        if (alt) closeWithFocus();else if (isOpen) _this7.setState({ focusedItem: list.prev(focusedItem) });else change(list.prev(selectedItem));
	        e.preventDefault();
	      }
	    };
	  }
	}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyPress', [_interaction.widgetEditable], {
	  enumerable: true,
	  initializer: function initializer() {
	    var _this8 = this;
	
	    return function (e) {
	      (0, _widgetHelpers.notify)(_this8.props.onKeyPress, [e]);
	      if (e.defaultPrevented) return;
	
	      if (!(_this8.props.filter && _this8.props.open)) _this8.search(String.fromCharCode(e.which), function (item) {
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

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = activeElement;
	
	var _ownerDocument = __webpack_require__(23);
	
	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function activeElement() {
	  var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _ownerDocument2.default)();
	
	  try {
	    return doc.activeElement;
	  } catch (e) {/* ie throws if no active element */}
	}
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ownerDocument;
	function ownerDocument(node) {
	  return node && node.ownerDocument || document;
	}
	module.exports = exports["default"];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _inDOM = __webpack_require__(12);
	
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

/***/ },
/* 25 */
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.mixin = exports.spyOnComponent = exports.timeoutManager = exports.mountManager = exports.focusManager = exports.autoFocus = undefined;
	
	var _spyOnComponent = __webpack_require__(27);
	
	var _spyOnComponent2 = _interopRequireDefault(_spyOnComponent);
	
	var _autoFocus = __webpack_require__(28);
	
	var _autoFocus2 = _interopRequireDefault(_autoFocus);
	
	var _focusManager = __webpack_require__(30);
	
	var _focusManager2 = _interopRequireDefault(_focusManager);
	
	var _mountManager = __webpack_require__(32);
	
	var _mountManager2 = _interopRequireDefault(_mountManager);
	
	var _timeoutManager = __webpack_require__(31);
	
	var _timeoutManager2 = _interopRequireDefault(_timeoutManager);
	
	var _mixin = __webpack_require__(33);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.autoFocus = _autoFocus2.default;
	exports.focusManager = _focusManager2.default;
	exports.mountManager = _mountManager2.default;
	exports.timeoutManager = _timeoutManager2.default;
	exports.spyOnComponent = _spyOnComponent2.default;
	exports.mixin = _mixin2.default;

/***/ },
/* 27 */
/***/ function(module, exports) {

	
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


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.PropTypes = undefined;
	exports.default = makeAutoFocusable;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(29);
	
	var _spyOnComponent = __webpack_require__(27);
	
	var _spyOnComponent2 = _interopRequireDefault(_spyOnComponent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PropTypes = exports.PropTypes = {
	  autoFocus: _react2.default.PropTypes.bool
	};
	
	function makeAutoFocusable(instance) {
	  (0, _spyOnComponent2.default)(instance, {
	    componentDidMount: function componentDidMount() {
	      var autoFocus = this.props.autoFocus;
	
	
	      if (autoFocus) this.focus ? this.focus() : (0, _reactDom.findDOMNode)(this).focus();
	    }
	  });
	}

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_29__;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.callFocusEventHandler = callFocusEventHandler;
	exports.default = createFocusManager;
	
	var _reactDom = __webpack_require__(29);
	
	var _timeoutManager = __webpack_require__(31);
	
	var _timeoutManager2 = _interopRequireDefault(_timeoutManager);
	
	var _mountManager = __webpack_require__(32);
	
	var _mountManager2 = _interopRequireDefault(_mountManager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function callFocusEventHandler(inst, focused, e) {
	  var handler = inst.props[focused ? 'onFocus' : 'onBlur'];
	  handler && handler(e);
	}
	
	function createFocusManager(instance, _ref) {
	  var willHandle = _ref.willHandle;
	  var didHandle = _ref.didHandle;
	  var onChange = _ref.onChange;
	  var _ref$isDisabled = _ref.isDisabled;
	  var isDisabled = _ref$isDisabled === undefined ? function () {
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

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = createTimeoutManager;
	
	var _spyOnComponent = __webpack_require__(27);
	
	var _spyOnComponent2 = _interopRequireDefault(_spyOnComponent);
	
	var _mountManager = __webpack_require__(32);
	
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

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = spyOnMount;
	
	var _spyOnComponent = __webpack_require__(27);
	
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

/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.mixin = mixin;
	exports.default = mixIntoClass;
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function mixin(componentClass, _ref) {
	  var propTypes = _ref.propTypes;
	  var contextTypes = _ref.contextTypes;
	  var childContextTypes = _ref.childContextTypes;
	  var getChildContext = _ref.getChildContext;
	
	  var protoSpec = _objectWithoutProperties(_ref, ["propTypes", "contextTypes", "childContextTypes", "getChildContext"]);
	
	  if (propTypes) componentClass.propTypes = _extends({}, componentClass.propTypes, propTypes);
	
	  if (contextTypes) componentClass.contextTypes = _extends({}, componentClass.contextTypes, contextTypes);
	
	  if (childContextTypes) componentClass.childContextTypes = _extends({}, componentClass.childContextTypes, childContextTypes);
	
	  if (getChildContext) {
	    (function () {
	      var baseGCContext = componentClass.prototype.getChildContext;
	
	      componentClass.prototype.getChildContext = function $getChildContext() {
	        return _extends({}, baseGCContext && baseGCContext.call(this), getChildContext.call(this));
	      };
	    })();
	  }
	
	  Object.assign(componentClass.prototype, protoSpec);
	
	  return componentClass;
	}
	
	function mixIntoClass(spec) {
	  return function (componentClass) {
	    return mixin(componentClass, spec);
	  };
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _createUncontrollable = __webpack_require__(35);
	
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
	
	  if (component.isMounted()) component.forceUpdate();
	}
	
	exports.default = (0, _createUncontrollable2.default)([mixin], set);
	module.exports = exports['default'];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = createUncontrollable;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(17);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _utils = __webpack_require__(36);
	
	var utils = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createUncontrollable(mixins, set) {
	
	  return uncontrollable;
	
	  function uncontrollable(Component, controlledValues) {
	    var methods = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
	
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
	
	    var component = _react2.default.createClass(_extends({
	
	      displayName: 'Uncontrolled(' + displayName + ')',
	
	      mixins: mixins,
	
	      propTypes: propTypes
	
	    }, methods, {
	      componentWillMount: function componentWillMount() {
	        var _this = this;
	
	        var props = this.props;
	
	        this._values = {};
	
	        controlledProps.forEach(function (key) {
	          _this._values[key] = props[utils.defaultKey(key)];
	        });
	      },
	
	
	      /**
	       * If a prop switches from controlled to Uncontrolled
	       * reset its value to the defaultValue
	       */
	      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        var _this2 = this;
	
	        var props = this.props;
	
	        controlledProps.forEach(function (key) {
	          if (utils.getValue(nextProps, key) === undefined && utils.getValue(props, key) !== undefined) {
	            _this2._values[key] = nextProps[utils.defaultKey(key)];
	          }
	        });
	      },
	      getControlledInstance: function getControlledInstance() {
	        return this.refs.inner;
	      },
	      render: function render() {
	        var _this3 = this;
	
	        var newProps = {},
	            props = omitProps(this.props);
	
	        utils.each(controlledValues, function (handle, propName) {
	          var linkPropName = utils.getLinkName(propName),
	              prop = _this3.props[propName];
	
	          if (linkPropName && !isProp(_this3.props, propName) && isProp(_this3.props, linkPropName)) {
	            prop = _this3.props[linkPropName].value;
	          }
	
	          newProps[propName] = prop !== undefined ? prop : _this3._values[propName];
	
	          newProps[handle] = setAndNotify.bind(_this3, propName);
	        });
	
	        newProps = _extends({}, props, newProps, {
	          ref: isCompositeComponent ? 'inner' : null
	        });
	
	        return _react2.default.createElement(Component, newProps);
	      }
	    }));
	
	    component.ControlledComponent = Component;
	
	    /**
	     * useful when wrapping a Component and you want to control
	     * everything
	     */
	    component.deferControlTo = function (newComponent) {
	      var additions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
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
	
	      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        args[_key - 2] = arguments[_key];
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

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
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
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(17);
	
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
	
	  if (false) {
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

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(25);
	
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
	        disabled = _props.disabled,
	        readOnly = _props.readOnly,
	        props = _objectWithoutProperties(_props, ['className', 'tabIndex', 'focused', 'disabled', 'readOnly']);
	
	    var isRtl = !!this.context.isRtl;
	    tabIndex = tabIndex != null ? tabIndex : '-1';
	
	    return _react2.default.createElement('div', _extends({}, props, {
	      tabIndex: tabIndex,
	      className: (0, _classnames2.default)(className, 'rw-widget', isRtl && 'rw-rtl', disabled && 'rw-state-disabled', readOnly && 'rw-state-readonly', focused && 'rw-state-focus')
	    }));
	  };
	
	  return Widget;
	}(_react2.default.Component), _class.propTypes = {
	  tabIndex: _react.PropTypes.node,
	  focused: _react.PropTypes.bool,
	  disabled: _react.PropTypes.bool,
	  readOnly: _react.PropTypes.bool
	}, _class.contextTypes = {
	  isRtl: _react.PropTypes.bool
	}, _temp);
	exports.default = Widget;
	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(25);
	
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
	  tabIndex: _react2.default.PropTypes.node,
	  focused: _react2.default.PropTypes.bool,
	  disabled: _react2.default.PropTypes.bool,
	  readOnly: _react2.default.PropTypes.bool,
	  open: _react2.default.PropTypes.bool,
	  dropUp: _react2.default.PropTypes.bool
	}, _temp);
	exports.default = WidgetPicker;
	module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(25);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Button = __webpack_require__(40);
	
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
	  bordered: _react2.default.PropTypes.bool
	}, _temp);
	exports.default = Select;
	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(25);
	
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
	  disabled: _react2.default.PropTypes.bool,
	  label: _react2.default.PropTypes.string,
	  icon: _react2.default.PropTypes.string,
	  busy: _react2.default.PropTypes.bool,
	  active: _react2.default.PropTypes.bool,
	  variant: _react2.default.PropTypes.oneOf(['primary', 'select']),
	  component: _react2.default.PropTypes.any
	}, _temp);
	exports.default = Button;
	module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _OVERFLOW, _class, _temp;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactComponentManagers = __webpack_require__(26);
	
	var _style = __webpack_require__(5);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _properties = __webpack_require__(11);
	
	var _height = __webpack_require__(42);
	
	var _height2 = _interopRequireDefault(_height);
	
	var _configuration = __webpack_require__(2);
	
	var _configuration2 = _interopRequireDefault(_configuration);
	
	var _classnames = __webpack_require__(25);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _compat = __webpack_require__(45);
	
	var _compat2 = _interopRequireDefault(_compat);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CLOSING = 0,
	    CLOSED = 1,
	    OPENING = 2,
	    OPEN = 3;
	
	var OVERFLOW = (_OVERFLOW = {}, _OVERFLOW[CLOSED] = 'hidden', _OVERFLOW[CLOSING] = 'hidden', _OVERFLOW[OPENING] = 'hidden', _OVERFLOW);
	
	var styleTransform = _properties.transform.replace(/(-.)/g, function (str) {
	  return str[1].toUpperCase();
	});
	
	var Popup = (_temp = _class = function (_React$Component) {
	  _inherits(Popup, _React$Component);
	
	  function Popup() {
	    _classCallCheck(this, Popup);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));
	
	    _this.mounted = (0, _reactComponentManagers.mountManager)(_this);
	    _this.state = {
	      initialRender: true,
	      status: _this.props.open ? OPENING : CLOSED
	    };
	    return _this;
	  }
	
	  Popup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    this.setState({
	      contentChanged: childKey(nextProps.children) !== childKey(this.props.children)
	    });
	  };
	
	  Popup.prototype.componentDidMount = function componentDidMount() {
	    var _this2 = this;
	
	    var isOpen = this.state.status === OPENING;
	
	    _compat2.default.batchedUpdates(function () {
	      _this2.setState({ initialRender: false });
	      if (isOpen) {
	        _this2.open();
	      }
	    });
	  };
	
	  Popup.prototype.componentDidUpdate = function componentDidUpdate(pvProps) {
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
	  };
	
	  Popup.prototype.render = function render() {
	    var _this3 = this;
	
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
	        ref: function ref(r) {
	          return _this3.element = r;
	        },
	        className: (0, _classnames2.default)(className, 'rw-popup-container', dropUp && 'rw-dropup', this.isTransitioning() && 'rw-popup-animating')
	      },
	      this.renderChildren()
	    );
	  };
	
	  Popup.prototype.renderChildren = function renderChildren() {
	    var offset = this.getOffsetForStatus(this.state.status),
	        child = _react2.default.Children.only(this.props.children);
	
	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'rw-popup-animation-box',
	        style: offset
	      },
	      (0, _react.cloneElement)(child, {
	        className: (0, _classnames2.default)(child.props.className, 'rw-popup')
	      })
	    );
	  };
	
	  Popup.prototype.open = function open() {
	    var _this4 = this;
	
	    this.cancelNextCallback();
	    var el = this.element.firstChild,
	        height = this.height();
	
	    this.props.onOpening();
	
	    this.safeSetState({ status: OPENING, height: height }, function () {
	      var offset = _this4.getOffsetForStatus(OPEN),
	          duration = _this4.props.duration;
	
	      _this4.animate(el, offset, duration, 'ease-out', function () {
	        _this4.safeSetState({ status: OPEN }, function () {
	          _this4.props.onOpen();
	        });
	      });
	    });
	  };
	
	  Popup.prototype.close = function close() {
	    var _this5 = this;
	
	    this.cancelNextCallback();
	    var el = this.element.firstChild,
	        height = this.height();
	
	    this.props.onClosing();
	
	    this.safeSetState({ status: CLOSING, height: height }, function () {
	      var offset = _this5.getOffsetForStatus(CLOSED),
	          duration = _this5.props.duration;
	
	      _this5.animate(el, offset, duration, 'ease-in', function () {
	        return _this5.safeSetState({ status: CLOSED }, function () {
	          _this5.props.onClose();
	        });
	      });
	    });
	  };
	
	  Popup.prototype.getOffsetForStatus = function getOffsetForStatus(status) {
	    var _enter, _leave, _CLOSED$CLOSING$OPENI;
	
	    if (this.state.initialRender) return {};
	    var dropUp = this.props.dropUp;
	
	
	    var enter = (_enter = {}, _enter[styleTransform] = 'translateY(' + (dropUp ? '100%' : '-100%') + ')', _enter);
	    var leave = (_leave = {}, _leave[styleTransform] = 'translateY(0)', _leave);
	
	    return (_CLOSED$CLOSING$OPENI = {}, _CLOSED$CLOSING$OPENI[CLOSED] = enter, _CLOSED$CLOSING$OPENI[CLOSING] = leave, _CLOSED$CLOSING$OPENI[OPENING] = enter, _CLOSED$CLOSING$OPENI[OPEN] = leave, _CLOSED$CLOSING$OPENI)[status] || {};
	  };
	
	  Popup.prototype.height = function height() {
	    var container = this.element,
	        content = container.firstChild,
	        margin = parseInt((0, _style2.default)(content, 'margin-top'), 10) + parseInt((0, _style2.default)(content, 'margin-bottom'), 10);
	
	    var old = container.style.display,
	        height = void 0;
	
	    container.style.display = 'block';
	    height = ((0, _height2.default)(content) || 0) + (isNaN(margin) ? 0 : margin);
	    container.style.display = old;
	    return height;
	  };
	
	  Popup.prototype.isTransitioning = function isTransitioning() {
	    return this.state.status === OPENING || this.state.status === CLOSED;
	  };
	
	  Popup.prototype.animate = function animate(el, props, dur, easing, cb) {
	    this._transition = _configuration2.default.animate(el, props, dur, easing, this.setNextCallback(cb));
	  };
	
	  Popup.prototype.cancelNextCallback = function cancelNextCallback() {
	    if (this._transition && this._transition.cancel) {
	      this._transition.cancel();
	      this._transition = null;
	    }
	    if (this.nextCallback) {
	      this.nextCallback.cancel();
	      this.nextCallback = null;
	    }
	  };
	
	  Popup.prototype.safeSetState = function safeSetState(nextState, callback) {
	    if (this.mounted()) {
	      this.setState(nextState, this.setNextCallback(callback));
	    }
	  };
	
	  Popup.prototype.setNextCallback = function setNextCallback(callback) {
	    var _this6 = this;
	
	    var active = true;
	
	    this.nextCallback = function (event) {
	      if (active) {
	        active = false;
	        _this6.nextCallback = null;
	        callback(event);
	      }
	    };
	
	    this.nextCallback.cancel = function () {
	      return active = false;
	    };
	    return this.nextCallback;
	  };
	
	  return Popup;
	}(_react2.default.Component), _class.propTypes = {
	  open: _react2.default.PropTypes.bool,
	  dropUp: _react2.default.PropTypes.bool,
	  duration: _react2.default.PropTypes.number,
	
	  onClosing: _react2.default.PropTypes.func,
	  onOpening: _react2.default.PropTypes.func,
	  onClose: _react2.default.PropTypes.func,
	  onOpen: _react2.default.PropTypes.func
	}, _class.defaultProps = {
	  duration: 200,
	  open: false,
	  onClosing: function onClosing() {},
	  onOpening: function onOpening() {},
	  onClose: function onClose() {},
	  onOpen: function onOpen() {}
	}, _temp);
	exports.default = Popup;
	
	
	function childKey(children) {
	  var nextChildMapping = _react2.default.Children.map(children, function (c) {
	    return c;
	  });
	  for (var key in nextChildMapping) {
	    return key;
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = height;
	
	var _offset = __webpack_require__(43);
	
	var _offset2 = _interopRequireDefault(_offset);
	
	var _isWindow = __webpack_require__(44);
	
	var _isWindow2 = _interopRequireDefault(_isWindow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function height(node, client) {
	  var win = (0, _isWindow2.default)(node);
	  return win ? win.innerHeight : client ? node.clientHeight : (0, _offset2.default)(node).height;
	}
	module.exports = exports['default'];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = offset;
	
	var _contains = __webpack_require__(24);
	
	var _contains2 = _interopRequireDefault(_contains);
	
	var _isWindow = __webpack_require__(44);
	
	var _isWindow2 = _interopRequireDefault(_isWindow);
	
	var _ownerDocument = __webpack_require__(23);
	
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

/***/ },
/* 44 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getWindow;
	function getWindow(node) {
	  return node === node.window ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : false;
	}
	module.exports = exports["default"];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(29);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _version = _react2.default.version.split('.').map(parseFloat);
	
	exports.default = {
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
	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _compat = __webpack_require__(45);
	
	var _compat2 = _interopRequireDefault(_compat);
	
	var _PropTypes = __webpack_require__(47);
	
	var CustomPropTypes = _interopRequireWildcard(_PropTypes);
	
	var _Props = __webpack_require__(50);
	
	var Props = _interopRequireWildcard(_Props);
	
	var _widgetHelpers = __webpack_require__(51);
	
	var _listDataManager = __webpack_require__(52);
	
	var _Listbox = __webpack_require__(56);
	
	var _Listbox2 = _interopRequireDefault(_Listbox);
	
	var _ListOption = __webpack_require__(57);
	
	var _ListOption2 = _interopRequireDefault(_ListOption);
	
	var _ListOptionGroup = __webpack_require__(58);
	
	var _ListOptionGroup2 = _interopRequireDefault(_ListOptionGroup);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var EMPTY_DATA_STATE = {};
	
	var propTypes = {
	  data: _react2.default.PropTypes.array,
	  dataState: _react2.default.PropTypes.object,
	  onSelect: _react2.default.PropTypes.func,
	  onMove: _react2.default.PropTypes.func,
	
	  activeId: _react2.default.PropTypes.string,
	  optionComponent: CustomPropTypes.elementType,
	  renderItem: _react2.default.PropTypes.func.isRequired,
	  renderGroup: _react2.default.PropTypes.func,
	
	  focusedItem: _react2.default.PropTypes.any,
	  selectedItem: _react2.default.PropTypes.any,
	
	  isDisabled: _react2.default.PropTypes.func.isRequired,
	  groupBy: CustomPropTypes.accessor,
	
	  messages: _react2.default.PropTypes.shape({
	    emptyList: _react2.default.PropTypes.func.isRequired
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
	
	    return _react2.default.createElement(
	      _Listbox2.default,
	      _extends({}, elementProps, {
	        className: className,
	        emptyListMessage: messages.emptyList(this.props)
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
	        key: 'item_' + group,
	        group: group
	      },
	      renderGroup({ group: group })
	    );
	  };
	
	  List.prototype.renderItem = function renderItem(item, idx) {
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
	        key: 'item_' + idx,
	        activeId: activeId,
	        focused: isFocused,
	        onSelect: onSelect,
	        disabled: isDisabled(item),
	        selected: selectedItem === item
	      },
	      renderItem({ item: item })
	    );
	  };
	
	  List.prototype.move = function move() {
	    var _props4 = this.props,
	        focusedItem = _props4.focusedItem,
	        onMove = _props4.onMove,
	        data = _props4.data,
	        dataState = _props4.dataState;
	
	    var list = _compat2.default.findDOMNode(this);
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

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.message = exports.accessor = exports.disabled = exports.dateFormat = exports.numberFormat = exports.elementType = undefined;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _elementType = __webpack_require__(48);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _createChainableTypeChecker = __webpack_require__(49);
	
	var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);
	
	var _localizers = __webpack_require__(16);
	
	var _localizers2 = _interopRequireDefault(_localizers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.elementType = _elementType2.default;
	var numberFormat = exports.numberFormat = (0, _createChainableTypeChecker2.default)(function () {
	  var _localizers$number;
	
	  return (_localizers$number = _localizers2.default.number).propType.apply(_localizers$number, arguments);
	});
	
	var dateFormat = exports.dateFormat = (0, _createChainableTypeChecker2.default)(function () {
	  var _localizers$date;
	
	  return (_localizers$date = _localizers2.default.date).propType.apply(_localizers$date, arguments);
	});
	
	var disabled = exports.disabled = (0, _createChainableTypeChecker2.default)(function () {
	  return _react.PropTypes.bool.apply(_react.PropTypes, arguments);
	});
	
	disabled.acceptsArray = _react.PropTypes.oneOfType([disabled, _react.PropTypes.array]);
	
	var accessor = exports.accessor = _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.func]);
	
	var message = exports.message = _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.node, _react2.default.PropTypes.string, _react2.default.PropTypes.func]);

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _createChainableTypeChecker = __webpack_require__(49);
	
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

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';
	
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

/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.pick = pick;
	exports.pickElementProps = pickElementProps;
	exports.omitOwn = omitOwn;
	
	var whitelist = ['style', 'className', 'role', 'id', 'autocomplete', 'size'];
	
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
	  var props = omitOwn(component);
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
	
	  for (var _len = arguments.length, others = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    others[_key - 1] = arguments[_key];
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

/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';
	
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

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.normalizeComponent = normalizeComponent;
	exports.defaultGetDataState = defaultGetDataState;
	exports.default = listDataManager;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactComponentManagers = __webpack_require__(26);
	
	var _Filter = __webpack_require__(53);
	
	var _ = __webpack_require__(18);
	
	var _accessorManager = __webpack_require__(55);
	
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
	    var _ret = function () {
	      if (!groupBy) return {
	          v: {}
	        };
	
	      var keys = [];
	      var groups = (0, _.groupBySortedKeys)(groupBy, data, keys);
	
	      return {
	        v: {
	          data: data,
	          groupBy: groupBy,
	          groups: groups,
	          sortedKeys: keys,
	          sequentialData: Object.keys(groups).reduce(function (flat, grp) {
	            return flat.concat(groups[grp]);
	          }, [])
	        }
	      };
	    }();
	
	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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
	          optionComponent = _currentProps.optionComponent;
	
	
	      return _extends({
	        groupBy: groupBy,
	        renderItem: renderItem,
	        renderGroup: renderGroup,
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

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.propTypes = exports.presets = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.indexOf = indexOf;
	exports.filter = filter;
	exports.suggest = suggest;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _PropTypes = __webpack_require__(47);
	
	var CustomPropTypes = _interopRequireWildcard(_PropTypes);
	
	var _dataHelpers = __webpack_require__(54);
	
	var _ = __webpack_require__(18);
	
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
	    var pos = a.length - b.length,
	        lastIndex = a.indexOf(b, pos);
	
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
	  caseSensitive: _react2.default.PropTypes.bool,
	  minLength: _react2.default.PropTypes.number,
	  filter: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.func, _react2.default.PropTypes.bool, _react2.default.PropTypes.oneOf(Object.keys(presets))])
	};
	
	function indexOf(data, _ref2) {
	  var _ref2$searchTerm = _ref2.searchTerm,
	      searchTerm = _ref2$searchTerm === undefined ? '' : _ref2$searchTerm,
	      options = _objectWithoutProperties(_ref2, ['searchTerm']);
	
	  var _normalizeOptions = normalizeOptions(options),
	      filter = _normalizeOptions.filter,
	      minLength = _normalizeOptions.minLength;
	
	  var idx = -1;
	
	  if (!filter || !searchTerm || !searchTerm.trim() || searchTerm.length < minLength) return -1;
	
	  data.every(function (item, i) {
	    if (filter(item, searchTerm, i)) return idx = i, false;
	
	    return true;
	  });
	
	  return idx;
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
	
	  return (0, _.find)(data, function (item, idx) {
	    return filter(item, searchTerm, idx);
	  }) || searchTerm;
	}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.dataValue = dataValue;
	exports.dataText = dataText;
	exports.dataIndexOf = dataIndexOf;
	exports.valueMatcher = valueMatcher;
	exports.dataItem = dataItem;
	
	var _ = __webpack_require__(18);
	
	function accessor(data, field) {
	  var value = data;
	
	  if (typeof field === 'function') value = field(data);else if (data == null) value = data;else if (typeof field === 'string' && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && field in data) value = data[field];
	
	  return value;
	}
	
	function dataValue(item, valueField) {
	  return accessor(item, valueField);
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

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = createAccessorManager;
	
	var _reactComponentManagers = __webpack_require__(26);
	
	var _dataHelpers = __webpack_require__(54);
	
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

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(25);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _widgetHelpers = __webpack_require__(51);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	  className: _react2.default.PropTypes.string,
	  role: _react2.default.PropTypes.string,
	  emptyListMessage: _react2.default.PropTypes.node
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
	        props = _objectWithoutProperties(_props, ['className', 'role', 'children', 'emptyListMessage']);
	
	    var id = (0, _widgetHelpers.instanceId)(this);
	    return _react2.default.createElement(
	      'ul',
	      _extends({
	        id: id,
	        tabIndex: '-1',
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

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp2;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(25);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Props = __webpack_require__(50);
	
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
	
	
	    var props = Props.omitOwn(this);
	
	    var classes = {
	      'rw-state-focus': focused,
	      'rw-state-selected': selected,
	      'rw-state-disabled': disabled
	    };
	
	    var id = focused ? activeId : undefined;
	
	    return _react2.default.createElement(
	      'li',
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
	  activeId: _react2.default.PropTypes.string,
	  dataItem: _react2.default.PropTypes.any,
	  focused: _react2.default.PropTypes.bool,
	  selected: _react2.default.PropTypes.bool,
	  disabled: _react2.default.PropTypes.bool,
	  onSelect: _react2.default.PropTypes.func
	}, _temp2);
	exports.default = ListOption;
	module.exports = exports['default'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _classnames = __webpack_require__(25);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var propTypes = {
	  className: _react2.default.PropTypes.string
	};
	
	function ListOptionGroup(_ref) {
	  var children = _ref.children,
	      className = _ref.className;
	
	  return _react2.default.createElement(
	    'li',
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

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _class, _temp;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _PropTypes = __webpack_require__(47);
	
	var CustomPropTypes = _interopRequireWildcard(_PropTypes);
	
	var _dataHelpers = __webpack_require__(54);
	
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
	  value: _react.PropTypes.any,
	  placeholder: _react.PropTypes.string,
	  textField: CustomPropTypes.accessor,
	  valueComponent: CustomPropTypes.elementType
	}, _temp);
	exports.default = DropdownListInput;
	module.exports = exports['default'];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.getMessages = getMessages;
	
	var _react = __webpack_require__(20);
	
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
	
	  createNewTag: function createNewTag(_ref) {
	    var searchTerm = _ref.searchTerm;
	    return [_react2.default.createElement(
	      'strong',
	      { key: '_' },
	      '"' + searchTerm + '"'
	    ), ' (create new tag)'];
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

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = createFocusManager;
	
	var _reactComponentManagers = __webpack_require__(26);
	
	function createFocusManager(component, options) {
	  var _didHandle = options.didHandle;
	
	  return (0, _reactComponentManagers.focusManager)(component, _extends({}, options, {
	    onChange: function onChange(focused) {
	      return component.setState({ focused: focused });
	    },
	    isDisabled: function isDisabled() {
	      return component.props.disabled === true;
	    },
	    didHandle: function didHandle(focused, event) {
	      var handler = this.props[focused ? 'onFocus' : 'onBlur'];
	      handler && handler(event);
	      _didHandle && _didHandle(focused, event);
	    }
	  }));
	}
	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = createScrollManager;
	
	var _scrollTo = __webpack_require__(63);
	
	var _scrollTo2 = _interopRequireDefault(_scrollTo);
	
	var _reactComponentManagers = __webpack_require__(26);
	
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

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = scrollTo;
	
	var _offset = __webpack_require__(43);
	
	var _offset2 = _interopRequireDefault(_offset);
	
	var _height = __webpack_require__(42);
	
	var _height2 = _interopRequireDefault(_height);
	
	var _scrollParent = __webpack_require__(64);
	
	var _scrollParent2 = _interopRequireDefault(_scrollParent);
	
	var _scrollTop = __webpack_require__(65);
	
	var _scrollTop2 = _interopRequireDefault(_scrollTop);
	
	var _requestAnimationFrame = __webpack_require__(66);
	
	var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);
	
	var _isWindow = __webpack_require__(44);
	
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

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = scrollPrarent;
	
	var _style = __webpack_require__(5);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _height = __webpack_require__(42);
	
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

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = scrollTop;
	
	var _isWindow = __webpack_require__(44);
	
	var _isWindow2 = _interopRequireDefault(_isWindow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function scrollTop(node, val) {
	  var win = (0, _isWindow2.default)(node);
	
	  if (val === undefined) return win ? 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop : node.scrollTop;
	
	  if (win) win.scrollTo('pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft, val);else node.scrollTop = val;
	}
	module.exports = exports['default'];

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _inDOM = __webpack_require__(12);
	
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

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactComponentManagers = __webpack_require__(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _reactComponentManagers.mixin)({
	
	  propTypes: {
	    isRtl: _react2.default.PropTypes.bool
	  },
	
	  contextTypes: {
	    isRtl: _react2.default.PropTypes.bool
	  },
	
	  childContextTypes: {
	    isRtl: _react2.default.PropTypes.bool
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

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	exports.default = function (component, props, state) {
	  return !(0, _.isShallowEqual)(component.props, props) || !(0, _.isShallowEqual)(component.state, state);
	};
	
	var _ = __webpack_require__(18);
	
	module.exports = exports['default'];

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.widgetEditable = exports.widgetEnabled = undefined;
	exports.isDisabledItem = isDisabledItem;
	exports.contains = contains;
	
	var _dataHelpers = __webpack_require__(54);
	
	function isDisabledItem(item, list, value) {
	  return !!(Array.isArray(list) ? ~(0, _dataHelpers.dataIndexOf)(list, item, value) : list);
	}
	
	function contains(item, values, valueField) {
	  return Array.isArray(values) ? values.some(function (value) {
	    return (0, _dataHelpers.valueMatcher)(item, value, valueField);
	  }) : (0, _dataHelpers.valueMatcher)(item, values, valueField);
	}
	
	var widgetEnabled = exports.widgetEnabled = interactionDecorator(true);
	
	var widgetEditable = exports.widgetEditable = interactionDecorator(false);
	
	function interactionDecorator(disabledOnly) {
	  function wrap(method) {
	    return function decoratedMethod() {
	      var _props = this.props,
	          disabled = _props.disabled,
	          readOnly = _props.readOnly;
	
	
	      disabled = disabled == true || !disabledOnly && readOnly === true;
	
	      if (!disabled) {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }
	
	        return method.apply(this, args);
	      }
	    };
	  }
	
	  return function decorate(target, key, desc) {
	    if (desc.initializer) {
	      (function () {
	        var init = desc.initializer;
	
	        desc.initializer = function () {
	          return wrap(init.call(this)).bind(this);
	        };
	      })();
	    } else desc.value = wrap(desc.value);
	    return desc;
	  };
	}

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(25);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _uncontrollable = __webpack_require__(34);
	
	var _uncontrollable2 = _interopRequireDefault(_uncontrollable);
	
	var _Widget = __webpack_require__(37);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
	var _WidgetPicker = __webpack_require__(38);
	
	var _WidgetPicker2 = _interopRequireDefault(_WidgetPicker);
	
	var _List = __webpack_require__(46);
	
	var _List2 = _interopRequireDefault(_List);
	
	var _Popup = __webpack_require__(41);
	
	var _Popup2 = _interopRequireDefault(_Popup);
	
	var _Select = __webpack_require__(39);
	
	var _Select2 = _interopRequireDefault(_Select);
	
	var _ComboboxInput = __webpack_require__(71);
	
	var _ComboboxInput2 = _interopRequireDefault(_ComboboxInput);
	
	var _messages = __webpack_require__(60);
	
	var _compat = __webpack_require__(45);
	
	var _compat2 = _interopRequireDefault(_compat);
	
	var _focusManager = __webpack_require__(61);
	
	var _focusManager2 = _interopRequireDefault(_focusManager);
	
	var _listDataManager = __webpack_require__(52);
	
	var _listDataManager2 = _interopRequireDefault(_listDataManager);
	
	var _PropTypes = __webpack_require__(47);
	
	var CustomPropTypes = _interopRequireWildcard(_PropTypes);
	
	var _accessorManager = __webpack_require__(55);
	
	var _accessorManager2 = _interopRequireDefault(_accessorManager);
	
	var _scrollManager = __webpack_require__(62);
	
	var _scrollManager2 = _interopRequireDefault(_scrollManager);
	
	var _withRightToLeft = __webpack_require__(67);
	
	var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);
	
	var _ = __webpack_require__(18);
	
	var _Props = __webpack_require__(50);
	
	var Props = _interopRequireWildcard(_Props);
	
	var _Filter = __webpack_require__(53);
	
	var Filter = _interopRequireWildcard(_Filter);
	
	var _interaction = __webpack_require__(69);
	
	var _widgetHelpers = __webpack_require__(51);
	
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
	
	  //-- controlled props -----------
	  value: _react2.default.PropTypes.any,
	  onChange: _react2.default.PropTypes.func,
	  open: _react2.default.PropTypes.bool,
	  onToggle: _react2.default.PropTypes.func,
	  //------------------------------------
	
	  itemComponent: CustomPropTypes.elementType,
	  listComponent: CustomPropTypes.elementType,
	
	  groupComponent: CustomPropTypes.elementType,
	  groupBy: CustomPropTypes.accessor,
	
	  data: _react2.default.PropTypes.array,
	  valueField: _react2.default.PropTypes.string,
	  textField: CustomPropTypes.accessor,
	  name: _react2.default.PropTypes.string,
	
	  onSelect: _react2.default.PropTypes.func,
	
	  autoFocus: _react2.default.PropTypes.bool,
	  disabled: CustomPropTypes.disabled.acceptsArray,
	  readOnly: CustomPropTypes.disabled,
	
	  suggest: Filter.propTypes.filter,
	
	  busy: _react2.default.PropTypes.bool,
	
	  delay: _react2.default.PropTypes.number,
	  dropUp: _react2.default.PropTypes.bool,
	  duration: _react2.default.PropTypes.number,
	
	  placeholder: _react2.default.PropTypes.string,
	  inputProps: _react2.default.PropTypes.object,
	  listProps: _react2.default.PropTypes.object,
	  messages: _react2.default.PropTypes.shape({
	    openCombobox: CustomPropTypes.message,
	    emptyList: CustomPropTypes.message,
	    emptyFilter: CustomPropTypes.message
	  })
	});
	
	var Combobox = (0, _withRightToLeft2.default)(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
	  _inherits(Combobox, _React$Component);
	
	  function Combobox(props, context) {
	    _classCallCheck(this, Combobox);
	
	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));
	
	    _this.handleFocusWillChange = function (focused) {
	      if (!focused && _this.refs.input) _this.refs.input.accept();
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
	
	    return _react2.default.createElement(List, _extends({ ref: 'list'
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
	        duration = _props3.duration,
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
	        onBlur: this.focusManager.handleBlur,
	        onFocus: this.focusManager.handleFocus,
	        onKeyDown: this.handleKeyDown,
	        className: (0, _classnames2.default)(className, 'rw-combobox')
	      }),
	      _react2.default.createElement(
	        _WidgetPicker2.default,
	        {
	          open: open,
	          dropUp: dropUp,
	          focused: focused,
	          disabled: disabled,
	          readOnly: readOnly
	        },
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
	          duration: duration,
	          onOpening: function onOpening() {
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
	    this.refs.input && this.refs.input.focus();
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
	      var self = _this4,
	          key = e.key,
	          alt = e.altKey,
	          list = _this4.list,
	          focusedItem = _this4.state.focusedItem,
	          selectedItem = _this4.state.selectedItem,
	          isOpen = _this4.props.open;
	
	      (0, _widgetHelpers.notify)(_this4.props.onKeyDown, [e]);
	
	      if (e.defaultPrevented) return;
	
	      if (key === 'End') {
	        e.preventDefault();
	        if (isOpen) _this4.setState({ focusedItem: list.last() });else select(list.last(), true);
	      } else if (key === 'Home') {
	        e.preventDefault();
	        if (isOpen) _this4.setState({ focusedItem: list.first() });else select(list.first(), true);
	      } else if (key === 'Escape' && isOpen) _this4.close();else if (key === 'Enter' && isOpen) {
	        e.preventDefault();
	        select(_this4.state.focusedItem, true);
	      } else if (key === 'Tab') {
	        _this4.refs.input.accept();
	      } else if (key === 'ArrowDown') {
	        e.preventDefault();
	        if (alt) _this4.open();else {
	          if (isOpen) _this4.setState({ focusedItem: list.next(focusedItem) });else select(list.next(selectedItem), true);
	        }
	      } else if (key === 'ArrowUp') {
	        e.preventDefault();
	        if (alt) _this4.close();else {
	          if (isOpen) _this4.setState({ focusedItem: list.prev(focusedItem) });else select(list.prev(selectedItem), true);
	        }
	      }
	
	      function select(item, fromList) {
	        if (!item) return self.change(_compat2.default.findDOMNode(self.refs.input).value, false);
	
	        self.refs.input.accept();
	
	        if (fromList) return self.handleSelect(item, e);
	
	        self.change(item, false, e);
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

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp2;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(29);
	
	var _caret = __webpack_require__(72);
	
	var _caret2 = _interopRequireDefault(_caret);
	
	var _Input = __webpack_require__(73);
	
	var _Input2 = _interopRequireDefault(_Input);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
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
	
	
	      var stringValue = e.target.value,
	          hasPlaceholder = !!placeholder;
	
	      // IE fires input events when setting/unsetting placeholders.
	      // issue #112
	      if (hasPlaceholder && !stringValue && stringValue === (value || '')) return;
	
	      _this._last = stringValue;
	      onChange(e, stringValue);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  ComboboxInput.prototype.componentDidUpdate = function componentDidUpdate() {
	    var input = (0, _reactDom.findDOMNode)(this),
	        val = this.props.value;
	
	    if (this.isSuggesting()) {
	      var start = val.toLowerCase().indexOf(this._last.toLowerCase()) + this._last.length,
	          end = val.length - start;
	
	      if (start >= 0) {
	        (0, _caret2.default)(input, start, start + end);
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
	    var value = (0, _reactDom.findDOMNode)(this).value || '',
	        end = value.length;
	
	    this._last = null;
	    (0, _caret2.default)((0, _reactDom.findDOMNode)(this), end, end);
	  };
	
	  ComboboxInput.prototype.focus = function focus() {
	    (0, _reactDom.findDOMNode)(this).focus();
	  };
	
	  return ComboboxInput;
	}(_react2.default.Component), _class.propTypes = {
	  value: _react2.default.PropTypes.string,
	  placeholder: _react2.default.PropTypes.string,
	  suggest: _react2.default.PropTypes.bool,
	  onChange: _react2.default.PropTypes.func.isRequired,
	  onKeyDown: _react2.default.PropTypes.func
	}, _class.defaultProps = {
	  value: ''
	}, _temp2);
	exports.default = ComboboxInput;
	module.exports = exports['default'];

/***/ },
/* 72 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = caret;
	/*eslint-disable no-empty */
	function caret(el, start, end) {
	  if (start === undefined) return get(el);
	
	  set(el, start, end);
	}
	
	function get(el) {
	  var start = void 0,
	      end = void 0,
	      rangeEl = void 0,
	      clone = void 0;
	
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
	  var rangeEl = void 0;
	
	  try {
	    if (el.selectionStart !== undefined) {
	      el.setSelectionRange(start, end);
	    } else {
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
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(25);
	
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
	}(_react2.default.Component), _class.propTypes = {
	  disabled: _react2.default.PropTypes.bool,
	  readOnly: _react2.default.PropTypes.bool,
	  value: _react2.default.PropTypes.string,
	  tabIndex: _react2.default.PropTypes.string,
	  component: _react2.default.PropTypes.any
	}, _temp);
	exports.default = Input;
	module.exports = exports['default'];

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _VIEW, _OPPOSITE_DIRECTION, _MULTIPLIER, _class, _desc, _value2, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _class3, _temp;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(25);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _uncontrollable = __webpack_require__(34);
	
	var _uncontrollable2 = _interopRequireDefault(_uncontrollable);
	
	var _reactComponentManagers = __webpack_require__(26);
	
	var _compat = __webpack_require__(45);
	
	var _compat2 = _interopRequireDefault(_compat);
	
	var _Widget = __webpack_require__(37);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
	var _Header = __webpack_require__(75);
	
	var _Header2 = _interopRequireDefault(_Header);
	
	var _Footer = __webpack_require__(76);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	var _Month = __webpack_require__(77);
	
	var _Month2 = _interopRequireDefault(_Month);
	
	var _Year = __webpack_require__(82);
	
	var _Year2 = _interopRequireDefault(_Year);
	
	var _Decade = __webpack_require__(83);
	
	var _Decade2 = _interopRequireDefault(_Decade);
	
	var _Century = __webpack_require__(84);
	
	var _Century2 = _interopRequireDefault(_Century);
	
	var _messages = __webpack_require__(60);
	
	var _SlideTransition = __webpack_require__(85);
	
	var _SlideTransition2 = _interopRequireDefault(_SlideTransition);
	
	var _focusManager = __webpack_require__(61);
	
	var _focusManager2 = _interopRequireDefault(_focusManager);
	
	var _localizers = __webpack_require__(16);
	
	var _PropTypes = __webpack_require__(47);
	
	var CustomPropTypes = _interopRequireWildcard(_PropTypes);
	
	var _constants = __webpack_require__(81);
	
	var constants = _interopRequireWildcard(_constants);
	
	var _Props = __webpack_require__(50);
	
	var Props = _interopRequireWildcard(_Props);
	
	var _dates = __webpack_require__(79);
	
	var _dates2 = _interopRequireDefault(_dates);
	
	var _withRightToLeft = __webpack_require__(67);
	
	var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);
	
	var _widgetHelpers = __webpack_require__(51);
	
	var _interaction = __webpack_require__(69);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
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
	
	var dir = constants.directions,
	    values = function values(obj) {
	  return Object.keys(obj).map(function (k) {
	    return obj[k];
	  });
	};
	
	var last = function last(a) {
	  return a[a.length - 1];
	};
	
	var views = constants.calendarViews,
	    VIEW_OPTIONS = values(views),
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
	
	var propTypes = _extends({}, _reactComponentManagers.autoFocus.propTypes, {
	
	  activeId: _react2.default.PropTypes.string,
	  disabled: CustomPropTypes.disabled,
	  readOnly: CustomPropTypes.disabled,
	
	  onChange: _react2.default.PropTypes.func,
	  value: _react2.default.PropTypes.instanceOf(Date),
	
	  min: _react2.default.PropTypes.instanceOf(Date),
	  max: _react2.default.PropTypes.instanceOf(Date),
	
	  currentDate: _react2.default.PropTypes.instanceOf(Date),
	  onCurrentDateChange: _react2.default.PropTypes.func,
	
	  view: function view(props) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }
	
	    return _react2.default.PropTypes.oneOf(props.views || VIEW_OPTIONS).apply(undefined, [props].concat(args));
	  },
	
	
	  views: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.oneOf(VIEW_OPTIONS)).isRequired,
	
	  onViewChange: _react2.default.PropTypes.func,
	  onNavigate: _react2.default.PropTypes.func,
	  culture: _react2.default.PropTypes.string,
	  footer: _react2.default.PropTypes.bool,
	
	  dayComponent: CustomPropTypes.elementType,
	  headerFormat: CustomPropTypes.dateFormat,
	  footerFormat: CustomPropTypes.dateFormat,
	
	  dayFormat: CustomPropTypes.dateFormat,
	  dateFormat: CustomPropTypes.dateFormat,
	  monthFormat: CustomPropTypes.dateFormat,
	  yearFormat: CustomPropTypes.dateFormat,
	  decadeFormat: CustomPropTypes.dateFormat,
	  centuryFormat: CustomPropTypes.dateFormat,
	
	  messages: _react2.default.PropTypes.shape({
	    moveBack: _react2.default.PropTypes.string,
	    moveForward: _react2.default.PropTypes.string
	  })
	});
	
	var Calendar = (0, _withRightToLeft2.default)(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
	  _inherits(Calendar, _React$Component);
	
	  function Calendar() {
	    _classCallCheck(this, Calendar);
	
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }
	
	    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));
	
	    _this.handleFocusWillChange = function () {
	      if (+_this.props.tabIndex === -1) return false;
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
	    var _this2 = this;
	
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
	        duration = _props.duration,
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
	        prevDisabled: isDisabled || !_dates2.default.inRange(this.nextDate(dir.LEFT), min, max, view),
	        nextDisabled: isDisabled || !_dates2.default.inRange(this.nextDate(dir.RIGHT), min, max, view),
	        onViewChange: this.handleViewChange,
	        onMoveLeft: this.handleMoveBack,
	        onMoveRight: this.handleMoveForward
	      }),
	      _react2.default.createElement(
	        _SlideTransition2.default,
	        {
	          ref: 'animation',
	          duration: duration,
	          direction: slideDirection,
	          onAnimate: function onAnimate() {
	            return focused && _this2.focus();
	          }
	        },
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
	
	
	    var slideDir = direction === dir.LEFT || direction === dir.UP ? 'right' : 'left';
	
	    if (direction === dir.UP) view = views[views.indexOf(view) + 1] || view;
	
	    if (direction === dir.DOWN) view = views[views.indexOf(view) - 1] || view;
	
	    if (!date) date = [dir.LEFT, dir.RIGHT].indexOf(direction) !== -1 ? this.nextDate(direction) : this.getCurrentDate();
	
	    if (_dates2.default.inRange(date, min, max, view)) {
	      (0, _widgetHelpers.notify)(onNavigate, [date, slideDir, view]);
	
	      this.focus(true);
	      this.setCurrentDate(date);
	      (0, _widgetHelpers.notify)(onViewChange, [view]);
	    }
	  };
	
	  Calendar.prototype.focus = function focus() {
	    if (+this.props.tabIndex > -1) _compat2.default.findDOMNode(this).focus();
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
	    var method = direction === dir.LEFT ? 'subtract' : 'add',
	        view = this.state.view,
	        unit = view === views.MONTH ? view : views.YEAR,
	        multi = MULTIPLIER[view] || 1;
	
	    return _dates2.default[method](this.getCurrentDate(), 1 * multi, unit);
	  };
	
	  Calendar.prototype.getHeaderLabel = function getHeaderLabel() {
	    var _props3 = this.props,
	        culture = _props3.culture,
	        props = _objectWithoutProperties(_props3, ['culture']),
	        view = this.state.view,
	        currentDate = this.getCurrentDate();
	
	    switch (view) {
	      case views.MONTH:
	        return _localizers.date.format(currentDate, format(props, 'header'), culture);
	
	      case views.YEAR:
	        return _localizers.date.format(currentDate, format(props, 'year'), culture);
	
	      case views.DECADE:
	        return _localizers.date.format(_dates2.default.startOf(currentDate, 'decade'), format(props, 'decade'), culture);
	      case views.CENTURY:
	        return _localizers.date.format(_dates2.default.startOf(currentDate, 'century'), format(props, 'century'), culture);
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
	}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'handleViewChange', [_interaction.widgetEditable], {
	  enumerable: true,
	  initializer: function initializer() {
	    var _this3 = this;
	
	    return function () {
	      _this3.navigate(dir.UP);
	    };
	  }
	}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'handleMoveBack', [_interaction.widgetEditable], {
	  enumerable: true,
	  initializer: function initializer() {
	    var _this4 = this;
	
	    return function () {
	      _this4.navigate(dir.LEFT);
	    };
	  }
	}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'handleMoveForward', [_interaction.widgetEditable], {
	  enumerable: true,
	  initializer: function initializer() {
	    var _this5 = this;
	
	    return function () {
	      _this5.navigate(dir.RIGHT);
	    };
	  }
	}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'handleChange', [_interaction.widgetEditable], {
	  enumerable: true,
	  initializer: function initializer() {
	    var _this6 = this;
	
	    return function (date) {
	      var _props4 = _this6.props,
	          views = _props4.views,
	          onChange = _props4.onChange;
	      var view = _this6.state.view;
	
	
	      if (views[0] === view) {
	        _this6.setCurrentDate(date);
	
	        (0, _widgetHelpers.notify)(onChange, date);
	
	        _this6.focus();
	        return;
	      }
	
	      _this6.navigate(dir.DOWN, date);
	    };
	  }
	}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'handleFooterClick', [_interaction.widgetEditable], {
	  enumerable: true,
	  initializer: function initializer() {
	    var _this7 = this;
	
	    return function (date) {
	      var _props5 = _this7.props,
	          views = _props5.views,
	          min = _props5.min,
	          max = _props5.max,
	          onViewChange = _props5.onViewChange;
	
	
	      var firstView = views[0];
	
	      (0, _widgetHelpers.notify)(_this7.props.onChange, date);
	
	      if (_dates2.default.inRange(date, min, max, firstView)) {
	        _this7.focus();
	
	        _this7.setCurrentDate(date);
	
	        (0, _widgetHelpers.notify)(onViewChange, [firstView]);
	      }
	    };
	  }
	}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_interaction.widgetEditable], {
	  enumerable: true,
	  initializer: function initializer() {
	    var _this8 = this;
	
	    return function (e) {
	      var ctrl = e.ctrlKey || e.metaKey,
	          key = e.key,
	          direction = ARROWS_TO_DIRECTION[key],
	          currentDate = _this8.getCurrentDate(),
	          view = _this8.state.view,
	          unit = VIEW_UNIT[view];
	
	      if (key === 'Enter') {
	        e.preventDefault();
	        return _this8.handleChange(currentDate);
	      }
	
	      if (direction) {
	        if (ctrl) {
	          e.preventDefault();
	          _this8.navigate(direction);
	        } else {
	          if (_this8.isRtl() && OPPOSITE_DIRECTION[direction]) direction = OPPOSITE_DIRECTION[direction];
	
	          var nextDate = _dates2.default.move(currentDate, _this8.props.min, _this8.props.max, view, direction);
	
	          if (!_dates2.default.eq(currentDate, nextDate, unit)) {
	            e.preventDefault();
	
	            if (_dates2.default.gt(nextDate, currentDate, view)) _this8.navigate(dir.RIGHT, nextDate);else if (_dates2.default.lt(nextDate, currentDate, view)) _this8.navigate(dir.LEFT, nextDate);else _this8.setCurrentDate(nextDate);
	          }
	        }
	      }
	
	      (0, _widgetHelpers.notify)(_this8.props.onKeyDown, [e]);
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

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _class, _temp;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Button = __webpack_require__(40);
	
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
	        icon: 'caret-' + (rtl ? 'right' : 'left')
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
	        icon: 'caret-' + (rtl ? 'left' : 'right')
	      })
	    );
	  };
	
	  return Header;
	}(_react2.default.Component), _class.propTypes = {
	  label: _react2.default.PropTypes.string.isRequired,
	  labelId: _react2.default.PropTypes.string,
	
	  upDisabled: _react2.default.PropTypes.bool.isRequired,
	  prevDisabled: _react2.default.PropTypes.bool.isRequired,
	  nextDisabled: _react2.default.PropTypes.bool.isRequired,
	  onViewChange: _react2.default.PropTypes.func.isRequired,
	  onMoveLeft: _react2.default.PropTypes.func.isRequired,
	  onMoveRight: _react2.default.PropTypes.func.isRequired,
	
	  messages: _react2.default.PropTypes.shape({
	    moveBack: _react2.default.PropTypes.func.isRequired,
	    moveForward: _react2.default.PropTypes.func.isRequired
	  })
	}, _class.contextTypes = {
	  isRtl: _react2.default.PropTypes.bool
	}, _temp);
	exports.default = Header;
	module.exports = exports['default'];

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = Footer;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Button = __webpack_require__(40);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _localizers = __webpack_require__(16);
	
	var _PropTypes = __webpack_require__(47);
	
	var CustomPropTypes = _interopRequireWildcard(_PropTypes);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var propTypes = {
	  disabled: _react2.default.PropTypes.bool,
	  readOnly: _react2.default.PropTypes.bool,
	  value: _react2.default.PropTypes.instanceOf(Date),
	  onClick: _react2.default.PropTypes.func.isRequired,
	  culture: _react2.default.PropTypes.string,
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

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp2;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _CalendarView = __webpack_require__(78);
	
	var _CalendarView2 = _interopRequireDefault(_CalendarView);
	
	var _dates = __webpack_require__(79);
	
	var _dates2 = _interopRequireDefault(_dates);
	
	var _localizers = __webpack_require__(16);
	
	var _PropTypes = __webpack_require__(47);
	
	var CustomPropTypes = _interopRequireWildcard(_PropTypes);
	
	var _ = __webpack_require__(18);
	
	var _Props = __webpack_require__(50);
	
	var Props = _interopRequireWildcard(_Props);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var dayFormat = function dayFormat(props) {
	  return _localizers.date.getFormat('weekday', props.dayFormat);
	},
	    dateFormat = function dateFormat(props) {
	  return _localizers.date.getFormat('dayOfMonth', props.dateFormat);
	};
	
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
	          Day = _this$props.dayComponent;
	
	
	      var labelFormat = _localizers.date.getFormat('footer');
	
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
	    return week.map(function (date) {
	      return _react2.default.createElement(
	        'th',
	        { key: 'header_' + _dates2.default.weekday(date, undefined, _localizers.date.startOfWeek(culture)) },
	        _localizers.date.format(date, format, culture)
	      );
	    });
	  };
	
	  MonthView.prototype.render = function render() {
	    var _props = this.props,
	        focused = _props.focused,
	        culture = _props.culture,
	        activeId = _props.activeId,
	        month = _dates2.default.visibleDays(focused, culture),
	        rows = (0, _.chunk)(month, 7);
	
	    return _react2.default.createElement(
	      _CalendarView2.default,
	      _extends({}, Props.omitOwn(this), {
	        activeId: activeId,
	        className: 'rw-calendar-month'
	      }),
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
	        _CalendarView2.default.Body,
	        null,
	        rows.map(this.renderRow)
	      )
	    );
	  };
	
	  return MonthView;
	}(_react2.default.Component), _class.propTypes = {
	  activeId: _react2.default.PropTypes.string,
	  culture: _react2.default.PropTypes.string,
	  today: _react2.default.PropTypes.instanceOf(Date),
	  value: _react2.default.PropTypes.instanceOf(Date),
	  focused: _react2.default.PropTypes.instanceOf(Date),
	  min: _react2.default.PropTypes.instanceOf(Date),
	  max: _react2.default.PropTypes.instanceOf(Date),
	  onChange: _react2.default.PropTypes.func.isRequired,
	
	  dayComponent: CustomPropTypes.elementType,
	  dayFormat: CustomPropTypes.dateFormat,
	  dateFormat: CustomPropTypes.dateFormat,
	  disabled: _react2.default.PropTypes.bool
	}, _class.isEqual = isEqual, _temp2);
	exports.default = MonthView;
	module.exports = exports['default'];

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp, _class2, _temp3;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(25);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _dates = __webpack_require__(79);
	
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
	  activeId: _react2.default.PropTypes.string
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
	  id: _react2.default.PropTypes.string,
	  activeId: _react2.default.PropTypes.string.isRequired,
	  label: _react2.default.PropTypes.string,
	  now: _react2.default.PropTypes.instanceOf(Date),
	  date: _react2.default.PropTypes.instanceOf(Date),
	  selected: _react2.default.PropTypes.instanceOf(Date),
	  focused: _react2.default.PropTypes.instanceOf(Date),
	  min: _react2.default.PropTypes.instanceOf(Date),
	  max: _react2.default.PropTypes.instanceOf(Date),
	  unit: _react2.default.PropTypes.oneOf(['day'].concat(VIEW_UNITS)),
	  viewUnit: _react2.default.PropTypes.oneOf(VIEW_UNITS),
	  onChange: _react2.default.PropTypes.func.isRequired,
	  disabled: _react2.default.PropTypes.bool
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

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _dateArithmetic = __webpack_require__(80);
	
	var _dateArithmetic2 = _interopRequireDefault(_dateArithmetic);
	
	var _constants = __webpack_require__(81);
	
	var _localizers = __webpack_require__(16);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var dates = _extends(_dateArithmetic2.default, {
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

/***/ },
/* 80 */
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


/***/ },
/* 81 */
/***/ function(module, exports) {

	'use strict';
	
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
	
	// export const calendarViewHierarchy = {
	//   [views.MONTH]:   views.YEAR,
	//   [views.YEAR]:    views.DECADE,
	//   [views.DECADE]:  views.CENTURY
	// }
	
	var calendarViewUnits = exports.calendarViewUnits = (_calendarViewUnits = {}, _calendarViewUnits[views.MONTH] = 'day', _calendarViewUnits[views.YEAR] = views.MONTH, _calendarViewUnits[views.DECADE] = views.YEAR, _calendarViewUnits[views.CENTURY] = views.DECADE, _calendarViewUnits);

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp2;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _CalendarView = __webpack_require__(78);
	
	var _CalendarView2 = _interopRequireDefault(_CalendarView);
	
	var _dates = __webpack_require__(79);
	
	var _dates2 = _interopRequireDefault(_dates);
	
	var _localizers = __webpack_require__(16);
	
	var _ = __webpack_require__(18);
	
	var _Props = __webpack_require__(50);
	
	var Props = _interopRequireWildcard(_Props);
	
	var _PropTypes = __webpack_require__(47);
	
	var CustomPropTypes = _interopRequireWildcard(_PropTypes);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var format = function format(props) {
	  return _localizers.date.getFormat('month', props.monthFormat);
	};
	
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
	          min = _this$props.min,
	          max = _this$props.max;
	
	
	      var labelFormat = _localizers.date.getFormat('header');
	
	      return _react2.default.createElement(
	        _CalendarView2.default.Row,
	        { key: rowIdx },
	        row.map(function (date, colIdx) {
	          var label = _localizers.date.format(date, labelFormat, culture);
	
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
	            _localizers.date.format(date, format(_this.props), culture)
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
	  activeId: _react2.default.PropTypes.string,
	  culture: _react2.default.PropTypes.string,
	  today: _react2.default.PropTypes.instanceOf(Date),
	  value: _react2.default.PropTypes.instanceOf(Date),
	  focused: _react2.default.PropTypes.instanceOf(Date),
	  min: _react2.default.PropTypes.instanceOf(Date),
	  max: _react2.default.PropTypes.instanceOf(Date),
	  onChange: _react2.default.PropTypes.func.isRequired,
	
	  monthFormat: CustomPropTypes.dateFormat,
	  disabled: _react2.default.PropTypes.bool
	}, _temp2);
	exports.default = YearView;
	module.exports = exports['default'];

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp2;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _CalendarView = __webpack_require__(78);
	
	var _CalendarView2 = _interopRequireDefault(_CalendarView);
	
	var _dates = __webpack_require__(79);
	
	var _dates2 = _interopRequireDefault(_dates);
	
	var _localizers = __webpack_require__(16);
	
	var _ = __webpack_require__(18);
	
	var _Props = __webpack_require__(50);
	
	var Props = _interopRequireWildcard(_Props);
	
	var _PropTypes = __webpack_require__(47);
	
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
	  activeId: _react2.default.PropTypes.string,
	  culture: _react2.default.PropTypes.string,
	  today: _react2.default.PropTypes.instanceOf(Date),
	  value: _react2.default.PropTypes.instanceOf(Date),
	  focused: _react2.default.PropTypes.instanceOf(Date),
	  min: _react2.default.PropTypes.instanceOf(Date),
	  max: _react2.default.PropTypes.instanceOf(Date),
	  onChange: _react2.default.PropTypes.func.isRequired,
	
	  yearFormat: CustomPropTypes.dateFormat,
	  disabled: _react2.default.PropTypes.bool
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

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp2;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _CalendarView = __webpack_require__(78);
	
	var _CalendarView2 = _interopRequireDefault(_CalendarView);
	
	var _dates = __webpack_require__(79);
	
	var _dates2 = _interopRequireDefault(_dates);
	
	var _localizers = __webpack_require__(16);
	
	var _ = __webpack_require__(18);
	
	var _Props = __webpack_require__(50);
	
	var Props = _interopRequireWildcard(_Props);
	
	var _PropTypes = __webpack_require__(47);
	
	var CustomPropTypes = _interopRequireWildcard(_PropTypes);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var format = function format(props) {
	  return _localizers.date.getFormat('decade', props.decadeFormat);
	};
	
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
	          max = _this$props.max;
	
	
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
	  activeId: _react2.default.PropTypes.string,
	  culture: _react2.default.PropTypes.string,
	  today: _react2.default.PropTypes.instanceOf(Date),
	  value: _react2.default.PropTypes.instanceOf(Date),
	  focused: _react2.default.PropTypes.instanceOf(Date),
	  min: _react2.default.PropTypes.instanceOf(Date),
	  max: _react2.default.PropTypes.instanceOf(Date),
	  onChange: _react2.default.PropTypes.func.isRequired,
	  decadeFormat: CustomPropTypes.dateFormat,
	  disabled: _react2.default.PropTypes.bool
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

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp, _class2, _temp3;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _style = __webpack_require__(5);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _width = __webpack_require__(86);
	
	var _width2 = _interopRequireDefault(_width);
	
	var _height = __webpack_require__(42);
	
	var _height2 = _interopRequireDefault(_height);
	
	var _ReplaceTransitionGroup = __webpack_require__(87);
	
	var _ReplaceTransitionGroup2 = _interopRequireDefault(_ReplaceTransitionGroup);
	
	var _compat = __webpack_require__(45);
	
	var _compat2 = _interopRequireDefault(_compat);
	
	var _configuration = __webpack_require__(2);
	
	var _configuration2 = _interopRequireDefault(_configuration);
	
	var _Props = __webpack_require__(50);
	
	var Props = _interopRequireWildcard(_Props);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TRANSFORM_MAP = {
	  left: 'translateX', right: 'translateX',
	  top: 'translateY', bottom: 'translateY'
	};
	
	var getDimension = function getDimension(node, direction) {
	  return {
	    left: _width2.default,
	    right: function right(n) {
	      return -(0, _width2.default)(n);
	    },
	    top: _height2.default,
	    bottom: function bottom(n) {
	      return -(0, _height2.default)(n);
	    }
	  }[direction](node);
	};
	
	var SlideChildGroup = (_temp = _class = function (_React$Component) {
	  _inherits(SlideChildGroup, _React$Component);
	
	  function SlideChildGroup() {
	    _classCallCheck(this, SlideChildGroup);
	
	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }
	
	  SlideChildGroup.prototype.componentWillEnter = function componentWillEnter(done) {
	    var _css,
	        _config$animate,
	        _this2 = this;
	
	    var _props = this.props,
	        duration = _props.duration,
	        direction = _props.direction;
	
	
	    var node = _compat2.default.findDOMNode(this);
	    var dimension = getDimension(node, direction);
	    var transform = TRANSFORM_MAP[direction];
	
	    this.ORGINAL_POSITION = node.style.position;
	
	    (0, _style2.default)(node, (_css = { position: 'absolute' }, _css[transform] = dimension + 'px', _css));
	
	    _configuration2.default.animate(node, (_config$animate = {}, _config$animate[transform] = 0, _config$animate), duration, function () {
	      (0, _style2.default)(node, {
	        position: _this2.ORGINAL_POSITION,
	        overflow: 'hidden'
	      });
	
	      _this2.ORGINAL_POSITION = null;
	      done && done();
	    });
	  };
	
	  SlideChildGroup.prototype.componentWillLeave = function componentWillLeave(done) {
	    var _config$animate2,
	        _this3 = this;
	
	    var _props2 = this.props,
	        duration = _props2.duration,
	        direction = _props2.direction;
	
	
	    var node = _compat2.default.findDOMNode(this);
	    var dimension = getDimension(node, direction);
	    var transform = TRANSFORM_MAP[direction];
	
	    this.ORGINAL_POSITION = node.style.position;
	
	    (0, _style2.default)(node, { position: 'absolute' });
	
	    _configuration2.default.animate(node, (_config$animate2 = {}, _config$animate2[transform] = -dimension + 'px', _config$animate2), duration, function () {
	      (0, _style2.default)(node, {
	        position: _this3.ORGINAL_POSITION,
	        overflow: 'hidden'
	      });
	
	      _this3.ORGINAL_POSITION = null;
	      done && done();
	    });
	  };
	
	  SlideChildGroup.prototype.render = function render() {
	    return _react2.default.Children.only(this.props.children);
	  };
	
	  return SlideChildGroup;
	}(_react2.default.Component), _class.propTypes = {
	  direction: _react2.default.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
	  duration: _react2.default.PropTypes.number
	}, _temp);
	var SlideTransition = (_temp3 = _class2 = function (_React$Component2) {
	  _inherits(SlideTransition, _React$Component2);
	
	  function SlideTransition() {
	    var _temp2, _this4, _ret;
	
	    _classCallCheck(this, SlideTransition);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp2 = (_this4 = _possibleConstructorReturn(this, _React$Component2.call.apply(_React$Component2, [this].concat(args))), _this4), _this4._wrapChild = function (child, ref) {
	      return _react2.default.createElement(
	        SlideChildGroup,
	        { key: child.key, ref: ref,
	          direction: _this4.props.direction,
	          duration: _this4.props.duration },
	        child
	      );
	    }, _temp2), _possibleConstructorReturn(_this4, _ret);
	  }
	
	  SlideTransition.prototype.render = function render() {
	    var _props3 = this.props,
	        style = _props3.style,
	        children = _props3.children;
	
	
	    style = _extends({}, style, {
	      position: 'relative',
	      overflow: 'hidden'
	    });
	
	    return _react2.default.createElement(
	      _ReplaceTransitionGroup2.default,
	      _extends({}, Props.omitOwn(this), {
	        ref: 'container',
	        component: 'div',
	        childFactory: this._wrapChild,
	        style: style
	      }),
	      children
	    );
	  };
	
	  return SlideTransition;
	}(_react2.default.Component), _class2.propTypes = {
	  direction: _react2.default.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
	  duration: _react2.default.PropTypes.number
	}, _class2.defaultProps = {
	  direction: 'left',
	  duration: 250
	}, _temp3);
	exports.default = SlideTransition;
	module.exports = exports['default'];

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = width;
	
	var _offset = __webpack_require__(43);
	
	var _offset2 = _interopRequireDefault(_offset);
	
	var _isWindow = __webpack_require__(44);
	
	var _isWindow2 = _interopRequireDefault(_isWindow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function width(node, client) {
	  var win = (0, _isWindow2.default)(node);
	  return win ? win.innerWidth : client ? node.clientWidth : (0, _offset2.default)(node).width;
	}
	module.exports = exports['default'];

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _class, _temp; /**
	                    * A streamlined version of TransitionGroup built for managing at most two active children
	                    * also provides additional hooks for animation start/end
	                    * https://github.com/facebook/react/blob/master/src/addons/transitions/ReactTransitionGroup.js
	                    * relevent code is licensed accordingly
	                    */
	
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(29);
	
	var _style = __webpack_require__(5);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _height = __webpack_require__(42);
	
	var _height2 = _interopRequireDefault(_height);
	
	var _width = __webpack_require__(86);
	
	var _width2 = _interopRequireDefault(_width);
	
	var _reactComponentManagers = __webpack_require__(26);
	
	var _ = __webpack_require__(18);
	
	var _Props = __webpack_require__(50);
	
	var Props = _interopRequireWildcard(_Props);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function getChild(children) {
	  return _react2.default.Children.only(children);
	}
	
	function key(child) {
	  return child && child.key;
	}
	
	var ReplaceTransitionGroup = (_temp = _class = function (_React$Component) {
	  _inherits(ReplaceTransitionGroup, _React$Component);
	
	  function ReplaceTransitionGroup() {
	    _classCallCheck(this, ReplaceTransitionGroup);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));
	
	    _this.mounted = (0, _reactComponentManagers.mountManager)(_this);
	    _this.animatingKeys = {};
	    _this.leaving = null;
	    _this.entering = null;
	
	    _this.state = {
	      children: (0, _.splat)(_this.props.children)
	    };
	    return _this;
	  }
	
	  ReplaceTransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
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
	  };
	
	  ReplaceTransitionGroup.prototype.componentDidUpdate = function componentDidUpdate() {
	    var entering = this.entering,
	        leaving = this.leaving,
	        first = this.refs[key(entering) || key(leaving)],
	        node = (0, _reactDom.findDOMNode)(this),
	        el = first && (0, _reactDom.findDOMNode)(first);
	
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
	  };
	
	  ReplaceTransitionGroup.prototype.performEnter = function performEnter(key) {
	    var _this2 = this;
	
	    var component = this.refs[key];
	
	    if (!component) return;
	
	    this.animatingKeys[key] = true;
	
	    if (component.componentWillEnter) component.componentWillEnter(function () {
	      return _this2._handleDoneEntering(key);
	    });else this._handleDoneEntering(key);
	  };
	
	  ReplaceTransitionGroup.prototype._tryFinish = function _tryFinish() {
	    if (this.isTransitioning()) return;
	
	    if (this.mounted()) (0, _style2.default)((0, _reactDom.findDOMNode)(this), { overflow: 'visible', height: '', width: '' });
	
	    this.props.onAnimate();
	  };
	
	  ReplaceTransitionGroup.prototype._handleDoneEntering = function _handleDoneEntering(enterkey) {
	    var component = this.refs[enterkey];
	
	    if (component && component.componentDidEnter) component.componentDidEnter();
	
	    delete this.animatingKeys[enterkey];
	
	    if (key(this.props.children) !== enterkey) this.performLeave(enterkey); // This was removed before it had fully entered. Remove it.
	
	    this._tryFinish();
	  };
	
	  ReplaceTransitionGroup.prototype.performLeave = function performLeave(key) {
	    var _this3 = this;
	
	    var component = this.refs[key];
	
	    if (!component) return;
	
	    this.animatingKeys[key] = true;
	
	    if (component.componentWillLeave) component.componentWillLeave(function () {
	      return _this3._handleDoneLeaving(key);
	    });else this._handleDoneLeaving(key);
	  };
	
	  ReplaceTransitionGroup.prototype._handleDoneLeaving = function _handleDoneLeaving(leavekey) {
	    var component = this.refs[leavekey];
	
	    if (component && component.componentDidLeave) component.componentDidLeave();
	
	    delete this.animatingKeys[leavekey];
	
	    if (key(this.props.children) === leavekey) this.performEnter(leavekey); // This entered again before it fully left. Add it again.
	
	    else if (this.mounted()) this.setState({
	        children: this.state.children.filter(function (c) {
	          return key(c) !== leavekey;
	        })
	      });
	
	    this._tryFinish();
	  };
	
	  ReplaceTransitionGroup.prototype.isTransitioning = function isTransitioning() {
	    return !!Object.keys(this.animatingKeys).length;
	  };
	
	  ReplaceTransitionGroup.prototype.render = function render() {
	    var _this4 = this;
	
	    var Component = this.props.component;
	
	    return _react2.default.createElement(
	      Component,
	      Props.omitOwn(this),
	      this.state.children.map(function (c) {
	        return _this4.props.childFactory(c, key(c));
	      })
	    );
	  };
	
	  return ReplaceTransitionGroup;
	}(_react2.default.Component), _class.propTypes = {
	  component: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.element, _react2.default.PropTypes.string]),
	  childFactory: _react2.default.PropTypes.func,
	  onAnimating: _react2.default.PropTypes.func,
	  onAnimate: _react2.default.PropTypes.func
	}, _class.defaultProps = {
	  component: 'span',
	  childFactory: function childFactory(a) {
	    return a;
	  },
	  onAnimating: function onAnimating() {},
	  onAnimate: function onAnimate() {}
	}, _temp);
	exports.default = ReplaceTransitionGroup;
	module.exports = exports['default'];

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _NEXT_VIEW, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _class3, _temp;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(17);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _activeElement = __webpack_require__(22);
	
	var _activeElement2 = _interopRequireDefault(_activeElement);
	
	var _classnames = __webpack_require__(25);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _deprecated = __webpack_require__(89);
	
	var _deprecated2 = _interopRequireDefault(_deprecated);
	
	var _uncontrollable = __webpack_require__(34);
	
	var _uncontrollable2 = _interopRequireDefault(_uncontrollable);
	
	var _Widget = __webpack_require__(37);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
	var _WidgetPicker = __webpack_require__(38);
	
	var _WidgetPicker2 = _interopRequireDefault(_WidgetPicker);
	
	var _Popup = __webpack_require__(41);
	
	var _Popup2 = _interopRequireDefault(_Popup);
	
	var _Button = __webpack_require__(40);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _Calendar = __webpack_require__(74);
	
	var _Calendar2 = _interopRequireDefault(_Calendar);
	
	var _DateTimePickerInput = __webpack_require__(91);
	
	var _DateTimePickerInput2 = _interopRequireDefault(_DateTimePickerInput);
	
	var _Select = __webpack_require__(39);
	
	var _Select2 = _interopRequireDefault(_Select);
	
	var _TimeList = __webpack_require__(92);
	
	var _TimeList2 = _interopRequireDefault(_TimeList);
	
	var _messages = __webpack_require__(60);
	
	var _Props = __webpack_require__(50);
	
	var Props = _interopRequireWildcard(_Props);
	
	var _PropTypes = __webpack_require__(47);
	
	var CustomPropTypes = _interopRequireWildcard(_PropTypes);
	
	var _focusManager = __webpack_require__(61);
	
	var _focusManager2 = _interopRequireDefault(_focusManager);
	
	var _scrollManager = __webpack_require__(62);
	
	var _scrollManager2 = _interopRequireDefault(_scrollManager);
	
	var _withRightToLeft = __webpack_require__(67);
	
	var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);
	
	var _interaction = __webpack_require__(69);
	
	var _compat = __webpack_require__(45);
	
	var _compat2 = _interopRequireDefault(_compat);
	
	var _dates = __webpack_require__(79);
	
	var _dates2 = _interopRequireDefault(_dates);
	
	var _localizers = __webpack_require__(16);
	
	var _constants = __webpack_require__(81);
	
	var _widgetHelpers = __webpack_require__(51);
	
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
	
	var Calendar = _Calendar2.default.ControlledComponent;
	
	var viewEnum = Object.keys(_constants.calendarViews).map(function (k) {
	  return _constants.calendarViews[k];
	});
	
	var NEXT_VIEW = (_NEXT_VIEW = {}, _NEXT_VIEW[_constants.datePopups.DATE] = _constants.datePopups.TIME, _NEXT_VIEW[_constants.datePopups.TIME] = _constants.datePopups.DATE, _NEXT_VIEW);
	
	var isBothOrNeither = function isBothOrNeither(a, b) {
	  return a && b || !a && !b;
	};
	
	var propTypes = {
	  //-- controlled props -----------
	  value: _react2.default.PropTypes.instanceOf(Date),
	  onChange: _react2.default.PropTypes.func,
	  open: _react2.default.PropTypes.oneOf([false, _constants.datePopups.TIME, _constants.datePopups.DATE]),
	  onToggle: _react2.default.PropTypes.func,
	  currentDate: _react2.default.PropTypes.instanceOf(Date),
	  onCurrentDateChange: _react2.default.PropTypes.func,
	  //------------------------------------
	
	  onSelect: _react2.default.PropTypes.func,
	
	  min: _react2.default.PropTypes.instanceOf(Date),
	  max: _react2.default.PropTypes.instanceOf(Date),
	  step: _react2.default.PropTypes.number,
	
	  culture: _react2.default.PropTypes.string,
	
	  format: CustomPropTypes.dateFormat,
	  timeFormat: CustomPropTypes.dateFormat,
	  editFormat: CustomPropTypes.dateFormat,
	
	  date: _react2.default.PropTypes.bool,
	  time: _react2.default.PropTypes.bool,
	  calendar: (0, _deprecated2.default)(_react2.default.PropTypes.bool, 'Use `date` instead'),
	
	  timeComponent: CustomPropTypes.elementType,
	
	  delay: _react2.default.PropTypes.number,
	  dropUp: _react2.default.PropTypes.bool,
	  duration: _react2.default.PropTypes.number,
	
	  placeholder: _react2.default.PropTypes.string,
	  name: _react2.default.PropTypes.string,
	
	  initialView: _react2.default.PropTypes.oneOf(viewEnum),
	  finalView: _react2.default.PropTypes.oneOf(viewEnum),
	
	  autoFocus: _react2.default.PropTypes.bool,
	  disabled: CustomPropTypes.disabled,
	  readOnly: CustomPropTypes.disabled,
	
	  parse: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string), _react2.default.PropTypes.string, _react2.default.PropTypes.func]),
	
	  tabIndex: _react2.default.PropTypes.any,
	  'aria-labelledby': _react2.default.PropTypes.string,
	  'aria-describedby': _react2.default.PropTypes.string,
	
	  onKeyDown: _react2.default.PropTypes.func,
	  onKeyPress: _react2.default.PropTypes.func,
	  onBlur: _react2.default.PropTypes.func,
	  onFocus: _react2.default.PropTypes.func,
	
	  inputProps: _react2.default.PropTypes.object,
	  messages: _react2.default.PropTypes.shape({
	    dateButton: _react2.default.PropTypes.string,
	    timeButton: _react2.default.PropTypes.string
	  })
	};
	
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
	
	      var parsers = parse == null ? [] : [].concat(parse);
	
	      if (typeof format === 'string') parsers.push(format);
	      if (typeof editFormat === 'string') parsers.push(editFormat);
	
	      (0, _invariant2.default)(parsers.length, 'React Widgets: there are no specified `parse` formats provided and the `format` prop is a function. ' + 'the DateTimePicker is unable to parse `%s` into a dateTime, ' + 'please provide either a parse function or Globalize.js compatible string for `format`', string);
	
	      parsers.sort(sortFnsFirst);
	
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
	        duration = _props3.duration,
	        dropUp = _props3.dropUp;
	
	
	    var calendarProps = Props.pick(this.props, Calendar);
	
	    return _react2.default.createElement(
	      _Popup2.default,
	      {
	        dropUp: dropUp,
	        duration: duration,
	        open: open === _constants.datePopups.DATE,
	        className: 'rw-calendar-popup'
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
	        currentDate: this.props.currentDate,
	        onCurrentDateChange: this.props.onCurrentDateChange,
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
	        duration = _props4.duration,
	        dropUp = _props4.dropUp,
	        date = _props4.date,
	        culture = _props4.culture,
	        timeFormat = _props4.timeFormat,
	        timeComponent = _props4.timeComponent;
	
	
	    return _react2.default.createElement(
	      _Popup2.default,
	      {
	        dropUp: dropUp,
	        duration: duration,
	        open: open === _constants.datePopups.TIME,
	        onOpening: function onOpening() {
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
	
	
	    var elementProps = Props.pickElementProps(this);
	
	    var shouldRenderList = open || (0, _widgetHelpers.isFirstFocusedRender)(this);
	
	    var owns = '';
	    if (date) owns += this.dateId;
	    if (time) owns += ' ' + this.listId;
	
	    return _react2.default.createElement(
	      _Widget2.default,
	      _extends({}, elementProps, {
	        onKeyDown: this.handleKeyDown,
	        onKeyPress: this.handleKeyPress,
	        onBlur: this.focusManager.handleBlur,
	        onFocus: this.focusManager.handleFocus,
	        className: (0, _classnames2.default)(className, 'rw-datetime-picker')
	      }),
	      _react2.default.createElement(
	        _WidgetPicker2.default,
	        {
	          open: !!open,
	          dropUp: dropUp,
	          focused: focused,
	          disabled: disabled,
	          readOnly: readOnly
	        },
	        this.renderInput(owns.trim()),
	        this.renderButtons()
	      ),
	      !!(shouldRenderList && time) && this.renderTimeList(),
	      !!(shouldRenderList && date) && this.renderCalendar()
	    );
	  };
	
	  DateTimePicker.prototype.focus = function focus() {
	    var valueInput = this.refs.valueInput;
	
	
	    if (valueInput && (0, _activeElement2.default)() !== _compat2.default.findDOMNode(valueInput)) valueInput.focus();
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
	}(_react2.default.Component), _class3.displayName = 'DateTimePicker', _class3.propTypes = propTypes, _class3.defaultProps = {
	  value: null,
	  min: new Date(1900, 0, 1),
	  max: new Date(2099, 11, 31),
	  date: true,
	  time: true,
	  open: false
	}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'handleChange', [_interaction.widgetEditable], {
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
	          if (date != value) //eslint-disable-line eqeqeq
	            onChange(date, str);
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
	  value: 'onChange'
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

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = deprecated;
	
	var _warning = __webpack_require__(90);
	
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

/***/ },
/* 90 */
19,
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp, _initialiseProps;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Input = __webpack_require__(73);
	
	var _Input2 = _interopRequireDefault(_Input);
	
	var _compat = __webpack_require__(45);
	
	var _compat2 = _interopRequireDefault(_compat);
	
	var _localizers = __webpack_require__(16);
	
	var _PropTypes = __webpack_require__(47);
	
	var CustomPropTypes = _interopRequireWildcard(_PropTypes);
	
	var _Props = __webpack_require__(50);
	
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
	    _compat2.default.findDOMNode(this).focus();
	  };
	
	  return DateTimePickerInput;
	}(_react2.default.Component), _class.propTypes = {
	  format: CustomPropTypes.dateFormat.isRequired,
	  editing: _react2.default.PropTypes.bool,
	  editFormat: CustomPropTypes.dateFormat,
	  parse: _react2.default.PropTypes.func.isRequired,
	
	  value: _react2.default.PropTypes.instanceOf(Date),
	  onChange: _react2.default.PropTypes.func.isRequired,
	  onBlur: _react2.default.PropTypes.func,
	  culture: _react2.default.PropTypes.string,
	
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

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactComponentManagers = __webpack_require__(26);
	
	var _List = __webpack_require__(46);
	
	var _List2 = _interopRequireDefault(_List);
	
	var _dates = __webpack_require__(79);
	
	var _dates2 = _interopRequireDefault(_dates);
	
	var _listDataManager = __webpack_require__(52);
	
	var _listDataManager2 = _interopRequireDefault(_listDataManager);
	
	var _localizers = __webpack_require__(16);
	
	var _PropTypes = __webpack_require__(47);
	
	var CustomPropTypes = _interopRequireWildcard(_PropTypes);
	
	var _Props = __webpack_require__(50);
	
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
	        _this.isMounted() && _this.setState({ focusedItem: item });
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
	  value: _react2.default.PropTypes.instanceOf(Date),
	  step: _react2.default.PropTypes.number,
	  min: _react2.default.PropTypes.instanceOf(Date),
	  max: _react2.default.PropTypes.instanceOf(Date),
	  currentDate: _react2.default.PropTypes.instanceOf(Date),
	
	  itemComponent: CustomPropTypes.elementType,
	  format: CustomPropTypes.dateFormat,
	  onSelect: _react2.default.PropTypes.func,
	  preserveDate: _react2.default.PropTypes.bool,
	  culture: _react2.default.PropTypes.string,
	  delay: _react2.default.PropTypes.number
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

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(25);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _uncontrollable = __webpack_require__(34);
	
	var _uncontrollable2 = _interopRequireDefault(_uncontrollable);
	
	var _Widget = __webpack_require__(37);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
	var _WidgetPicker = __webpack_require__(38);
	
	var _WidgetPicker2 = _interopRequireDefault(_WidgetPicker);
	
	var _Select = __webpack_require__(39);
	
	var _Select2 = _interopRequireDefault(_Select);
	
	var _NumberInput = __webpack_require__(94);
	
	var _NumberInput2 = _interopRequireDefault(_NumberInput);
	
	var _Button = __webpack_require__(40);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _messages = __webpack_require__(60);
	
	var _Props = __webpack_require__(50);
	
	var Props = _interopRequireWildcard(_Props);
	
	var _focusManager = __webpack_require__(61);
	
	var _focusManager2 = _interopRequireDefault(_focusManager);
	
	var _interaction = __webpack_require__(69);
	
	var _widgetHelpers = __webpack_require__(51);
	
	var _compat = __webpack_require__(45);
	
	var _compat2 = _interopRequireDefault(_compat);
	
	var _PropTypes = __webpack_require__(47);
	
	var CustomPropTypes = _interopRequireWildcard(_PropTypes);
	
	var _constants = __webpack_require__(81);
	
	var _withRightToLeft = __webpack_require__(67);
	
	var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);
	
	var _localizers = __webpack_require__(16);
	
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
	        onKeyDown: this.handleKeyDown,
	        onBlur: this.focusManager.handleBlur,
	        onFocus: this.focusManager.handleFocus,
	        className: (0, _classnames2.default)(className, 'rw-number-picker')
	      }),
	      _react2.default.createElement(
	        _WidgetPicker2.default,
	        {
	          focused: focused,
	          disabled: disabled,
	          readOnly: readOnly
	        },
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
	    _compat2.default.findDOMNode(this.refs.input).focus();
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
	
	  // -- controlled props -----------
	  value: _react2.default.PropTypes.number,
	  onChange: _react2.default.PropTypes.func,
	  //------------------------------------
	
	  min: _react2.default.PropTypes.number,
	  max: _react2.default.PropTypes.number,
	  step: _react2.default.PropTypes.number,
	  precision: _react2.default.PropTypes.number,
	
	  culture: _react2.default.PropTypes.string,
	  format: CustomPropTypes.numberFormat,
	  parse: _react2.default.PropTypes.func,
	
	  name: _react2.default.PropTypes.string,
	  tabIndex: _react2.default.PropTypes.any,
	  onKeyDown: _react2.default.PropTypes.func,
	  onKeyPress: _react2.default.PropTypes.func,
	  onKeyUp: _react2.default.PropTypes.func,
	  autoFocus: _react2.default.PropTypes.bool,
	  disabled: CustomPropTypes.disabled,
	  readOnly: CustomPropTypes.disabled,
	
	  inputProps: _react2.default.PropTypes.object,
	  messages: _react2.default.PropTypes.shape({
	    increment: _react2.default.PropTypes.string,
	    decrement: _react2.default.PropTypes.string
	  }),
	
	  placeholder: _react2.default.PropTypes.string
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

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Input = __webpack_require__(73);
	
	var _Input2 = _interopRequireDefault(_Input);
	
	var _Props = __webpack_require__(50);
	
	var Props = _interopRequireWildcard(_Props);
	
	var _PropTypes = __webpack_require__(47);
	
	var CustomPropTypes = _interopRequireWildcard(_PropTypes);
	
	var _localizers = __webpack_require__(16);
	
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
	    this.setState(this.getDefaultState(nextProps));
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
	  value: _react2.default.PropTypes.number,
	  editing: _react2.default.PropTypes.bool,
	  placeholder: _react2.default.PropTypes.string,
	
	  format: CustomPropTypes.numberFormat,
	
	  parse: _react2.default.PropTypes.func,
	  culture: _react2.default.PropTypes.string,
	
	  min: _react2.default.PropTypes.number,
	  max: _react2.default.PropTypes.number,
	
	  disabled: CustomPropTypes.disabled,
	  readOnly: CustomPropTypes.disabled,
	
	  onChange: _react2.default.PropTypes.func.isRequired
	}, _class.defaultProps = {
	  value: null,
	  editing: false
	}, _temp);
	exports.default = NumberPickerInput;
	module.exports = exports['default'];

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(25);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _ = __webpack_require__(18);
	
	var _uncontrollable = __webpack_require__(34);
	
	var _uncontrollable2 = _interopRequireDefault(_uncontrollable);
	
	var _Widget = __webpack_require__(37);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
	var _WidgetPicker = __webpack_require__(38);
	
	var _WidgetPicker2 = _interopRequireDefault(_WidgetPicker);
	
	var _Select = __webpack_require__(39);
	
	var _Select2 = _interopRequireDefault(_Select);
	
	var _Popup = __webpack_require__(41);
	
	var _Popup2 = _interopRequireDefault(_Popup);
	
	var _MultiselectInput = __webpack_require__(96);
	
	var _MultiselectInput2 = _interopRequireDefault(_MultiselectInput);
	
	var _MultiselectTagList = __webpack_require__(97);
	
	var _MultiselectTagList2 = _interopRequireDefault(_MultiselectTagList);
	
	var _List = __webpack_require__(46);
	
	var _List2 = _interopRequireDefault(_List);
	
	var _Filter = __webpack_require__(53);
	
	var Filter = _interopRequireWildcard(_Filter);
	
	var _Props = __webpack_require__(50);
	
	var Props = _interopRequireWildcard(_Props);
	
	var _messages = __webpack_require__(60);
	
	var _PropTypes = __webpack_require__(47);
	
	var CustomPropTypes = _interopRequireWildcard(_PropTypes);
	
	var _accessorManager = __webpack_require__(55);
	
	var _accessorManager2 = _interopRequireDefault(_accessorManager);
	
	var _focusManager = __webpack_require__(61);
	
	var _focusManager2 = _interopRequireDefault(_focusManager);
	
	var _listDataManager = __webpack_require__(52);
	
	var _listDataManager2 = _interopRequireDefault(_listDataManager);
	
	var _scrollManager = __webpack_require__(62);
	
	var _scrollManager2 = _interopRequireDefault(_scrollManager);
	
	var _withRightToLeft = __webpack_require__(67);
	
	var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);
	
	var _interaction = __webpack_require__(69);
	
	var _widgetHelpers = __webpack_require__(51);
	
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
	
	var INSERT = 'insert';
	var REMOVE = 'remove';
	
	var propTypes = _extends({}, _Popup2.default.propTypes, Filter.propTypes, {
	
	  data: _react2.default.PropTypes.array,
	  //-- controlled props --
	  value: _react2.default.PropTypes.array,
	  onChange: _react2.default.PropTypes.func,
	
	  searchTerm: _react2.default.PropTypes.string,
	  onSearch: _react2.default.PropTypes.func,
	
	  open: _react2.default.PropTypes.bool,
	  onToggle: _react2.default.PropTypes.func,
	  //-------------------------------------------
	
	  valueField: _react2.default.PropTypes.string,
	  textField: CustomPropTypes.accessor,
	
	  tagComponent: CustomPropTypes.elementType,
	  itemComponent: CustomPropTypes.elementType,
	  listComponent: CustomPropTypes.elementType,
	
	  groupComponent: CustomPropTypes.elementType,
	  groupBy: CustomPropTypes.accessor,
	
	  createComponent: CustomPropTypes.elementType,
	
	  onSelect: _react2.default.PropTypes.func,
	  onCreate: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.oneOf([false]), _react2.default.PropTypes.func]),
	
	  busy: _react2.default.PropTypes.bool,
	  dropUp: _react2.default.PropTypes.bool,
	
	  placeholder: _react2.default.PropTypes.string,
	
	  listProps: _react2.default.PropTypes.object,
	
	  autoFocus: _react2.default.PropTypes.bool,
	  disabled: CustomPropTypes.disabled.acceptsArray,
	  readOnly: CustomPropTypes.disabled,
	
	  messages: _react2.default.PropTypes.shape({
	    open: CustomPropTypes.message,
	    emptyList: CustomPropTypes.message,
	    emptyFilter: CustomPropTypes.message,
	    createNew: CustomPropTypes.message,
	
	    tagsLabel: CustomPropTypes.message,
	    selectedItems: CustomPropTypes.message,
	    noneSelected: CustomPropTypes.message,
	    removeLabel: CustomPropTypes.message
	  })
	});
	
	var Multiselect = (0, _withRightToLeft2.default)(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
	  _inherits(Multiselect, _React$Component);
	
	  function Multiselect() {
	    _classCallCheck(this, Multiselect);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));
	
	    _this.handleFocusWillChange = function (focused) {
	      if (focused) _this.focus();
	    };
	
	    _this.handleFocusDidChange = function (focused) {
	      if (focused) return;
	
	      _this.close();
	
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
	      (0, _widgetHelpers.notify)(_this.props.onSearch, [e.target.value]);
	      _this.open();
	    };
	
	    _initDefineProp(_this, 'handleClick', _descriptor, _this);
	
	    _initDefineProp(_this, 'handleSelect', _descriptor2, _this);
	
	    _initDefineProp(_this, 'handleCreate', _descriptor3, _this);
	
	    _initDefineProp(_this, 'handleKeyDown', _descriptor4, _this);
	
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
	      willHandle: _this.handleFocusWillChange,
	      didHandle: _this.handleFocusDidChange
	    });
	
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
	
	
	    var values = (0, _.splat)(props.value);
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
	
	  Multiselect.prototype.renderCreateItem = function renderCreateItem(messages) {
	    var _this2 = this;
	
	    var searchTerm = this.props.searchTerm;
	
	    var createIsFocused = this.isCreateTagFocused();
	
	    return _react2.default.createElement(
	      'ul',
	      {
	        role: 'listbox',
	        id: this.createId,
	        className: 'rw-list rw-multiselect-create-tag'
	      },
	      _react2.default.createElement(
	        'li',
	        {
	          role: 'option',
	          onClick: function onClick() {
	            return _this2.handleCreate(searchTerm);
	          },
	          id: createIsFocused ? this.activeOptionId : null,
	          className: (0, _classnames2.default)('rw-list-option', 'rw-create-list-option', createIsFocused && 'rw-state-focus')
	        },
	        messages.createNewTag(this.props)
	      )
	    );
	  };
	
	  Multiselect.prototype.renderInput = function renderInput(ownedIds) {
	    var _props = this.props,
	        searchTerm = _props.searchTerm,
	        maxLength = _props.maxLength,
	        tabIndex = _props.tabIndex,
	        busy = _props.busy,
	        autoFocus = _props.autoFocus,
	        open = _props.open;
	    var _state = this.state,
	        focusedItem = _state.focusedItem,
	        focusedTag = _state.focusedTag;
	
	
	    var disabled = this.props.disabled === true;
	    var readOnly = this.props.readOnly === true;
	
	    var active = open ? (focusedItem || this.isCreateTagFocused()) && this.activeOptionId : focusedTag && this.activeTagId;
	
	    return _react2.default.createElement(_MultiselectInput2.default, {
	      ref: 'input',
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
	    });
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
	    var _this3 = this;
	
	    var _state2 = this.state,
	        focused = _state2.focused,
	        dataItems = _state2.dataItems;
	
	
	    var itemLabels = dataItems.map(function (item) {
	      return _this3.accessors.text(item);
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
	    var _props2 = this.props,
	        disabled = _props2.disabled,
	        readOnly = _props2.readOnly;
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
	      disabled: disabled,
	      readOnly: readOnly,
	      focusedItem: focusedTag,
	      onDelete: this.handleDelete,
	      valueComponent: Component
	    });
	  };
	
	  Multiselect.prototype.render = function render() {
	    var _this4 = this;
	
	    var _props3 = this.props,
	        className = _props3.className,
	        busy = _props3.busy,
	        dropUp = _props3.dropUp,
	        open = _props3.open,
	        duration = _props3.duration;
	    var _state4 = this.state,
	        focused = _state4.focused,
	        dataItems = _state4.dataItems;
	
	
	    var elementProps = Props.pickElementProps(this);
	
	    var shouldRenderTags = !!dataItems.length,
	        shouldRenderPopup = (0, _widgetHelpers.isFirstFocusedRender)(this) || open,
	        shouldShowCreate = this.shouldShowCreate();
	
	    var inputOwns = this.listId + ' ' + this.notifyId + ' ' + (shouldRenderTags ? this.tagsId : '') + (shouldShowCreate ? this.createId : '');
	
	    var disabled = this.props.disabled === true;
	    var readOnly = this.props.readOnly === true;
	
	    var messages = this.messages;
	
	    return _react2.default.createElement(
	      _Widget2.default,
	      _extends({}, elementProps, {
	        onKeyDown: this.handleKeyDown,
	        onBlur: this.focusManager.handleBlur,
	        onFocus: this.focusManager.handleFocus,
	        className: (0, _classnames2.default)(className, 'rw-multiselect')
	      }),
	      this.renderNotificationArea(messages),
	      _react2.default.createElement(
	        _WidgetPicker2.default,
	        {
	          open: open,
	          dropUp: dropUp,
	          focused: focused,
	          disabled: disabled,
	          readOnly: readOnly,
	          className: 'rw-widget-input',
	          onClick: this.handleClick,
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
	          duration: duration,
	          onOpening: function onOpening() {
	            return _this4.refs.list.forceUpdate();
	          }
	        },
	        _react2.default.createElement(
	          'div',
	          null,
	          this.renderList(messages),
	          shouldShowCreate && this.renderCreateItem(messages)
	        )
	      )
	    );
	  };
	
	  Multiselect.prototype.change = function change(dataItem, originalEvent, action) {
	    var _props4 = this.props,
	        onChange = _props4.onChange,
	        onSearch = _props4.onSearch,
	        searchTerm = _props4.searchTerm,
	        lastValue = _props4.value;
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
	
	    (0, _widgetHelpers.notify)(onSearch, ['']);
	  };
	
	  Multiselect.prototype.focus = function focus() {
	    this.refs.input && this.refs.input.focus();
	  };
	
	  Multiselect.prototype.open = function open() {
	    if (!this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, true);
	  };
	
	  Multiselect.prototype.close = function close() {
	    (0, _widgetHelpers.notify)(this.props.onToggle, false);
	  };
	
	  Multiselect.prototype.isCreateTagFocused = function isCreateTagFocused() {
	    var _state5 = this.state,
	        data = _state5.data,
	        focusedItem = _state5.focusedItem;
	
	
	    if (!this.shouldShowCreate()) return false;
	
	    return !data.length || focusedItem === null;
	  };
	
	  Multiselect.prototype.shouldShowCreate = function shouldShowCreate() {
	    var _this5 = this;
	
	    var _props5 = this.props,
	        textField = _props5.textField,
	        searchTerm = _props5.searchTerm,
	        onCreate = _props5.onCreate,
	        caseSensitive = _props5.caseSensitive;
	    var _state6 = this.state,
	        data = _state6.data,
	        dataItems = _state6.dataItems;
	
	
	    if (!onCreate || !searchTerm) return false;
	
	    var lower = function lower(text) {
	      return caseSensitive ? text : text.toLowerCase();
	    };
	    var eq = function eq(v) {
	      return lower(_this5.accessors.text(v, textField)) === lower(searchTerm);
	    };
	
	    // if there is an exact match on textFields: "john" => { name: "john" }, don't show
	    return !data.some(eq) && !dataItems.some(eq);
	  };
	
	  Multiselect.prototype.getPlaceholder = function getPlaceholder() {
	    var _props6 = this.props,
	        value = _props6.value,
	        placeholder = _props6.placeholder;
	
	    return (value && value.length ? '' : placeholder) || '';
	  };
	
	  return Multiselect;
	}(_react2.default.Component), _class3.propTypes = propTypes, _class3.defaultProps = {
	  data: [],
	  filter: 'startsWith',
	  value: [],
	  open: false,
	  searchTerm: '',
	  listComponent: _List2.default
	}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'handleClick', [_interaction.widgetEditable], {
	  enumerable: true,
	  initializer: function initializer() {
	    var _this6 = this;
	
	    return function () {
	      _this6.open();
	    };
	  }
	}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'handleSelect', [_interaction.widgetEditable], {
	  enumerable: true,
	  initializer: function initializer() {
	    var _this7 = this;
	
	    return function (dataItem, originalEvent) {
	      if (dataItem === undefined) {
	        if (_this7.props.onCreate) _this7.handleCreate(_this7.props.searchTerm);
	
	        return;
	      }
	
	      (0, _widgetHelpers.notify)(_this7.props.onSelect, [dataItem, { originalEvent: originalEvent }]);
	
	      _this7.change(dataItem, originalEvent, INSERT);
	      _this7.close();
	      _this7.focus();
	    };
	  }
	}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'handleCreate', [_interaction.widgetEditable], {
	  enumerable: true,
	  initializer: function initializer() {
	    var _this8 = this;
	
	    return function (tag) {
	      if (tag.trim() === '') return;
	
	      (0, _widgetHelpers.notify)(_this8.props.onCreate, tag);
	      _this8.props.searchTerm && (0, _widgetHelpers.notify)(_this8.props.onSearch, ['']);
	
	      _this8.close();
	      _this8.focus();
	    };
	  }
	}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_interaction.widgetEditable], {
	  enumerable: true,
	  initializer: function initializer() {
	    var _this9 = this;
	
	    return function (event) {
	      var key = event.key,
	          keyCode = event.keyCode,
	          altKey = event.altKey,
	          ctrlKey = event.ctrlKey;
	
	      var noSearch = !_this9.props.searchTerm && !_this9._deletingText;
	      var isOpen = _this9.props.open;
	
	      var _state7 = _this9.state,
	          focusedTag = _state7.focusedTag,
	          focusedItem = _state7.focusedItem;
	      var list = _this9.list,
	          tagList = _this9.tagList;
	
	      var nullTag = { focusedTag: null };
	
	      (0, _widgetHelpers.notify)(_this9.props.onKeyDown, [event]);
	
	      if (event.defaultPrevented) return;
	
	      if (key === 'ArrowDown') {
	        var next = list.next(focusedItem);
	        var creating = _this9.shouldShowCreate() && focusedItem === next || focusedItem === null;
	
	        next = creating ? null : next;
	
	        event.preventDefault();
	        if (isOpen) _this9.setState(_extends({ focusedItem: next }, nullTag));else _this9.open();
	      } else if (key === 'ArrowUp') {
	        var prev = focusedItem === null ? list.last() : list.prev(focusedItem);
	
	        event.preventDefault();
	
	        if (altKey) _this9.close();else if (isOpen) _this9.setState(_extends({ focusedItem: prev }, nullTag));
	      } else if (key === 'End') {
	        event.preventDefault();
	        if (isOpen) _this9.setState(_extends({ focusedItem: list.last() }, nullTag));else _this9.setState({ focusedTag: tagList.last() });
	      } else if (key === 'Home') {
	        event.preventDefault();
	        if (isOpen) _this9.setState(_extends({ focusedItem: list.first() }, nullTag));else _this9.setState({ focusedTag: tagList.first() });
	      } else if (isOpen && keyCode === 13) {
	        // using keyCode to ignore enter for japanese IME
	        event.preventDefault();
	
	        ctrlKey && _this9.props.onCreate || focusedItem === null ? _this9.handleCreate(_this9.props.searchTerm, event) : _this9.handleSelect(_this9.state.focusedItem, event);
	      } else if (key === 'Escape') {
	        isOpen ? _this9.close() : tagList && _this9.setState(nullTag);
	      } else if (noSearch && key === 'ArrowLeft') {
	        _this9.setState({ focusedTag: tagList.prev(focusedTag) || tagList.last() });
	      } else if (noSearch && key === 'ArrowRight') {
	        var nextTag = focusedTag && tagList.next(focusedTag);
	        if (nextTag === focusedTag) nextTag = null;
	
	        _this9.setState({ focusedTag: nextTag });
	      } else if (noSearch && key === 'Delete' && !tagList.isDisabled(focusedTag)) {
	        _this9.handleDelete(focusedTag, event);
	      } else if (noSearch && key === 'Backspace') {
	        _this9.handleDelete(tagList.last(), event);
	      } else if (noSearch && key === ' ' && !isOpen) {
	        event.preventDefault();
	        _this9.open();
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

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _compat = __webpack_require__(45);
	
	var _compat2 = _interopRequireDefault(_compat);
	
	var _PropTypes = __webpack_require__(47);
	
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
	
	  MultiselectInput.prototype.focus = function focus() {
	    _compat2.default.findDOMNode(this).focus();
	  };
	
	  return MultiselectInput;
	}(_react2.default.Component), _class.propTypes = {
	  value: _react2.default.PropTypes.string,
	  placeholder: _react2.default.PropTypes.string,
	  maxLength: _react2.default.PropTypes.number,
	  onChange: _react2.default.PropTypes.func.isRequired,
	
	  disabled: CustomPropTypes.disabled,
	  readOnly: CustomPropTypes.disabled
	}, _temp);
	exports.default = MultiselectInput;
	module.exports = exports['default'];

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _class, _temp2;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _MultiselectTag = __webpack_require__(98);
	
	var _MultiselectTag2 = _interopRequireDefault(_MultiselectTag);
	
	var _PropTypes = __webpack_require__(47);
	
	var CustomPropTypes = _interopRequireWildcard(_PropTypes);
	
	var _interaction = __webpack_require__(69);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MultiselectTagList = (_temp2 = _class = function (_React$Component) {
	  _inherits(MultiselectTagList, _React$Component);
	
	  function MultiselectTagList() {
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, MultiselectTagList);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleDelete = function (item, event) {
	      if (!_this.props.disabled) _this.props.onDelete(item, event);
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
	            disabled: (0, _interaction.isDisabledItem)(item, disabled, valueAccessor)
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
	  id: _react2.default.PropTypes.string.isRequired,
	  activeId: _react2.default.PropTypes.string.isRequired,
	  label: _react2.default.PropTypes.string,
	
	  value: _react2.default.PropTypes.array,
	  focusedItem: _react2.default.PropTypes.any,
	
	  valueAccessor: _react2.default.PropTypes.func.isRequired,
	  textAccessor: _react2.default.PropTypes.func.isRequired,
	
	  onDelete: _react2.default.PropTypes.func.isRequired,
	  valueComponent: _react2.default.PropTypes.func,
	
	  disabled: CustomPropTypes.disabled.acceptsArray,
	  readOnly: CustomPropTypes.disabled
	}, _temp2);
	exports.default = MultiselectTagList;
	module.exports = exports['default'];

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _class, _temp2;
	
	var _classnames = __webpack_require__(25);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Button = __webpack_require__(40);
	
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
	
	
	      if (disabled) {
	        return;
	      }
	
	      onClick(value, event);
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
	      this.renderDelete()
	    );
	  };
	
	  return MultiselectTag;
	}(_react2.default.Component), _class.propTypes = {
	  id: _react2.default.PropTypes.string,
	  onClick: _react2.default.PropTypes.func.isRequired,
	  focused: _react2.default.PropTypes.bool,
	  disabled: _react2.default.PropTypes.bool,
	  readOnly: _react2.default.PropTypes.bool,
	  label: _react2.default.PropTypes.string,
	  value: _react2.default.PropTypes.any
	}, _temp2);
	exports.default = MultiselectTag;
	module.exports = exports['default'];

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _desc, _value, _class2, _descriptor, _descriptor2, _class3, _temp;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(25);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _reactComponentManagers = __webpack_require__(26);
	
	var _uncontrollable = __webpack_require__(34);
	
	var _uncontrollable2 = _interopRequireDefault(_uncontrollable);
	
	var _List = __webpack_require__(46);
	
	var _List2 = _interopRequireDefault(_List);
	
	var _Widget = __webpack_require__(37);
	
	var _Widget2 = _interopRequireDefault(_Widget);
	
	var _SelectListItem = __webpack_require__(100);
	
	var _SelectListItem2 = _interopRequireDefault(_SelectListItem);
	
	var _messages = __webpack_require__(60);
	
	var _ = __webpack_require__(18);
	
	var _compat = __webpack_require__(45);
	
	var _compat2 = _interopRequireDefault(_compat);
	
	var _Props = __webpack_require__(50);
	
	var Props = _interopRequireWildcard(_Props);
	
	var _PropTypes = __webpack_require__(47);
	
	var CustomPropTypes = _interopRequireWildcard(_PropTypes);
	
	var _listDataManager = __webpack_require__(52);
	
	var _listDataManager2 = _interopRequireDefault(_listDataManager);
	
	var _accessorManager = __webpack_require__(55);
	
	var _accessorManager2 = _interopRequireDefault(_accessorManager);
	
	var _focusManager = __webpack_require__(61);
	
	var _focusManager2 = _interopRequireDefault(_focusManager);
	
	var _scrollManager = __webpack_require__(62);
	
	var _scrollManager2 = _interopRequireDefault(_scrollManager);
	
	var _withRightToLeft = __webpack_require__(67);
	
	var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);
	
	var _interaction = __webpack_require__(69);
	
	var _widgetHelpers = __webpack_require__(51);
	
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
	  var firstValue = null;
	  if (values.length) firstValue = (0, _.find)(data, function (d) {
	    return ~values.indexOf(d);
	  });
	
	  return firstValue || null;
	}
	
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
	          readOnly = _this$props3.readOnly;
	      var dataItems = _this.state.dataItems;
	
	      return _react2.default.createElement(_SelectListItem2.default, _extends({}, itemProps, {
	        name: name || _this.itemName,
	        type: multiple ? 'checkbox' : 'radio',
	        readOnly: readOnly,
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
	      dataItems: (0, _.splat)(value).map(function (item) {
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
	    _compat2.default.findDOMNode(this.refs.list).focus();
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
	}(_react2.default.Component), _class3.propTypes = _extends({}, _reactComponentManagers.autoFocus.propTypes, {
	
	  data: _react2.default.PropTypes.array,
	  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.any, _react2.default.PropTypes.array]),
	  onChange: _react2.default.PropTypes.func,
	  onMove: _react2.default.PropTypes.func,
	
	  multiple: _react2.default.PropTypes.bool,
	
	  itemComponent: CustomPropTypes.elementType,
	  listComponent: CustomPropTypes.elementType,
	
	  valueField: _react2.default.PropTypes.string,
	  textField: CustomPropTypes.accessor,
	
	  busy: _react2.default.PropTypes.bool,
	
	  filter: _react2.default.PropTypes.string,
	  delay: _react2.default.PropTypes.number,
	
	  disabled: CustomPropTypes.disabled.acceptsArray,
	  readOnly: CustomPropTypes.disabled,
	
	  listProps: _react2.default.PropTypes.object,
	  messages: _react2.default.PropTypes.shape({
	    emptyList: CustomPropTypes.message
	  })
	}), _class3.defaultProps = {
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

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _class, _temp2;
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ListOption = __webpack_require__(57);
	
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
	  type: _react2.default.PropTypes.string.isRequired,
	  name: _react2.default.PropTypes.string.isRequired,
	  disabled: _react2.default.PropTypes.bool,
	  readOnly: _react2.default.PropTypes.bool,
	  dataItem: _react2.default.PropTypes.any,
	  checked: _react2.default.PropTypes.bool.isRequired,
	
	  onChange: _react2.default.PropTypes.func.isRequired,
	  onMouseDown: _react2.default.PropTypes.func.isRequired
	}, _temp2);
	exports.default = SelectListItem;
	module.exports = exports['default'];

/***/ }
/******/ ])))
});
;
//# sourceMappingURL=react-widgets.js.map