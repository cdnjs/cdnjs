/*! (c) 2016 Jason Quense | https://github.com/jquense/react-widgets/blob/master/License.txt */
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

	/*** IMPORTS FROM imports-loader ***/
	var module = __webpack_require__(1);
	var args = [Globalize];


	if (typeof module === 'function') {
	  module.apply(null, args || [])
	}



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = globalizeLocalizers;

	var _react = __webpack_require__(2);

	var _configure = __webpack_require__(3);

	var _configure2 = _interopRequireDefault(_configure);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	function globalizeLocalizers(globalize) {
	  var localizers = globalize.locale && !globalize.cultures ? newGlobalize(globalize) : oldGlobalize(globalize);

	  _configure2.default.setLocalizers(localizers);
	  return localizers;
	}

	function newGlobalize(globalize) {
	  var locale = function locale(culture) {
	    return culture ? globalize(culture) : globalize;
	  };

	  var date = {

	    formats: {
	      date: { date: 'short' },
	      time: { time: 'short' },
	      default: { datetime: 'medium' },
	      header: 'MMMM yyyy',
	      footer: { date: 'full' },
	      weekday: 'eeeeee',
	      dayOfMonth: 'dd',
	      month: 'MMM',
	      year: 'yyyy',

	      decade: function decade(dt, culture, l) {
	        return l.format(dt, l.formats.year, culture) + ' - ' + l.format(endOfDecade(dt), l.formats.year, culture);
	      },

	      century: function century(dt, culture, l) {
	        return l.format(dt, l.formats.year, culture) + ' - ' + l.format(endOfCentury(dt), l.formats.year, culture);
	      }
	    },

	    propType: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object, _react.PropTypes.func]),

	    firstOfWeek: function firstOfWeek(culture) {
	      var date = new Date();
	      //cldr-data doesn't seem to be zero based
	      var localeDay = Math.max(parseInt(locale(culture).formatDate(date, { raw: 'e' }), 10) - 1, 0);

	      return Math.abs(date.getDay() - localeDay);
	    },
	    parse: function parse(value, format, culture) {
	      format = typeof format === 'string' ? { raw: format } : format;
	      return locale(culture).parseDate(value, format);
	    },
	    format: function format(value, _format, culture) {
	      _format = typeof _format === 'string' ? { raw: _format } : _format;
	      return locale(culture).formatDate(value, _format);
	    }
	  };

	  var number = {
	    formats: {
	      default: { maximumFractionDigits: 0 }
	    },

	    propType: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),

	    // TODO major bump consistent ordering
	    parse: function parse(value, culture) {
	      return locale(culture).parseNumber(value);
	    },
	    format: function format(value, _format2, culture) {
	      if (value == null) return value;

	      if (_format2 && _format2.currency) return locale(culture).formatCurrency(value, _format2.currency, _format2);

	      return locale(culture).formatNumber(value, _format2);
	    },
	    decimalChar: function decimalChar(format, culture) {
	      var str = this.format(1.1, { raw: '0.0' }, culture);
	      return str[str.length - 2] || '.';
	    },
	    precision: function precision(format) {
	      return !format || format.maximumFractionDigits == null ? null : format.maximumFractionDigits;
	    }
	  };
	  return { date: date, number: number };
	}

	function oldGlobalize(globalize) {
	  var shortNames = Object.create(null);

	  function getCulture(culture) {
	    return culture ? globalize.findClosestCulture(culture) : globalize.culture();
	  }

	  function firstOfWeek(culture) {
	    culture = getCulture(culture);
	    return culture && culture.calendar.firstDay || 0;
	  }

	  function shortDay(dayOfTheWeek) {
	    var culture = getCulture(arguments[1]),
	        name = culture.name,
	        days = function days() {
	      return culture.calendar.days.namesShort.slice();
	    };

	    var names = shortNames[name] || (shortNames[name] = days());

	    return names[dayOfTheWeek.getDay()];
	  }

	  var date = {

	    formats: {
	      date: 'd',
	      time: 't',
	      default: 'f',
	      header: 'MMMM yyyy',
	      footer: 'D',
	      weekday: shortDay,
	      dayOfMonth: 'dd',
	      month: 'MMM',
	      year: 'yyyy',

	      decade: function decade(dt, culture, l) {
	        return l.format(dt, l.formats.year, culture) + ' - ' + l.format(endOfDecade(dt), l.formats.year, culture);
	      },

	      century: function century(dt, culture, l) {
	        return l.format(dt, l.formats.year, culture) + ' - ' + l.format(endOfCentury(dt), l.formats.year, culture);
	      }
	    },

	    firstOfWeek: firstOfWeek,

	    parse: function parse(value, format, culture) {
	      return globalize.parseDate(value, format, culture);
	    },
	    format: function format(value, _format3, culture) {
	      return globalize.format(value, _format3, culture);
	    }
	  };

	  function formatData(format, _culture) {
	    var culture = getCulture(_culture),
	        numFormat = culture.numberFormat;

	    if (typeof format === 'string') {
	      if (format.indexOf('p') !== -1) numFormat = numFormat.percent;
	      if (format.indexOf('c') !== -1) numFormat = numFormat.curency;
	    }

	    return numFormat;
	  }

	  var number = {

	    formats: {
	      default: 'D'
	    },

	    // TODO major bump consistent ordering
	    parse: function parse(value, culture) {
	      return globalize.parseFloat(value, 10, culture);
	    },
	    format: function format(value, _format4, culture) {
	      return globalize.format(value, _format4, culture);
	    },
	    decimalChar: function decimalChar(format, culture) {
	      var data = formatData(format, culture);
	      return data['.'] || '.';
	    },
	    precision: function precision(format, _culture) {
	      var data = formatData(format, _culture);

	      if (typeof format === 'string' && format.length > 1) return parseFloat(format.substr(1));

	      return data ? data.decimals : null;
	    }
	  };

	  return { date: date, number: number };
	}
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = window.React;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = window.ReactWidgets;

/***/ }
/******/ ]);