/*! (c) 2015 Jason Quense | https://github.com/jquense/react-widgets/blob/master/License.txt */
/******/ (function(modules) { // webpackBootstrap
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

	'use strict';

	var babelHelpers = __webpack_require__(1);

	exports.__esModule = true;

	var _configure = __webpack_require__(3);

	var _configure2 = babelHelpers.interopRequireDefault(_configure);

	function endOfDecade(date) {
	  date = new Date(date);
	  date.setFullYear(date.getFullYear() + 10);
	  date.setMilliseconds(date.getMilliseconds() - 1);
	  return date;
	}

	function endOfCentury(date) {
	  date = new Date(date);
	  date.setFullYear(date.getFullYear() + 100);
	  date.setMilliseconds(date.getMilliseconds() - 1);
	  return date;
	}

	exports['default'] = function (moment) {
	  if (typeof moment !== 'function') throw new TypeError('You must provide a valid moment object');

	  var localField = typeof moment().locale === 'function' ? 'locale' : 'lang',
	      hasLocaleData = !!moment.localeData;

	  if (!hasLocaleData) throw new TypeError('The Moment localizer depends on the `localeData` api, please provide a moment object v2.2.0 or higher');

	  function getMoment(culture, value, format) {
	    return culture ? moment(value, format)[localField](culture) : moment(value, format);
	  }

	  var localizer = {
	    formats: {
	      date: 'L',
	      time: 'LT',
	      'default': 'lll',
	      header: 'MMMM YYYY',
	      footer: 'LL',
	      weekday: 'dd',
	      dayOfMonth: 'DD',
	      month: 'MMM',
	      year: 'YYYY',

	      decade: function decade(date, culture, localizer) {
	        return localizer.format(date, 'YYYY', culture) + ' - ' + localizer.format(endOfDecade(date), 'YYYY', culture);
	      },

	      century: function century(date, culture, localizer) {
	        return localizer.format(date, 'YYYY', culture) + ' - ' + localizer.format(endOfCentury(date), 'YYYY', culture);
	      }
	    },

	    firstOfWeek: function firstOfWeek(culture) {
	      return moment.localeData(culture).firstDayOfWeek();
	    },

	    parse: function parse(value, format, culture) {
	      return getMoment(culture, value, format).toDate();
	    },

	    format: function format(value, _format, culture) {
	      return getMoment(culture, value, _format).format(_format);
	    }
	  };

	  _configure2['default'].setDateLocalizer(localizer);

	  return localizer;
	};

	module.exports = exports['default'];

/***/ },
/* 1 */
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
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	module.exports = window.ReactWidgets;

/***/ }
/******/ ]);