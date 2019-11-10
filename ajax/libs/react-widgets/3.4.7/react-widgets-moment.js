/*! (c) 2017 Jason Quense | https://github.com/jquense/react-widgets/blob/master/License.txt */
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
/***/ (function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	var module = __webpack_require__(1);
	var args = [moment];


	if (typeof module === 'function') {
	  module.apply(null, args || [])
	}



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	exports.default = function (moment) {
	  if (typeof moment !== 'function') throw new TypeError('You must provide a valid moment object');

	  var localField = typeof moment().locale === 'function' ? 'locale' : 'lang',
	      hasLocaleData = !!moment.localeData;

	  if (!hasLocaleData) throw new TypeError('The Moment localizer depends on the `localeData` api, please provide a moment object v2.2.0 or higher');

	  function getMoment(culture, value, format) {
	    return culture ? moment(value, format)[localField](culture) : moment(value, format);
	  }

	  function endOfDecade(date) {
	    return moment(date).add(10, 'year').add(-1, 'millisecond').toDate();
	  }

	  function endOfCentury(date) {
	    return moment(date).add(100, 'year').add(-1, 'millisecond').toDate();
	  }

	  var localizer = {
	    formats: {
	      date: 'L',
	      time: 'LT',
	      default: 'lll',
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
	      if (!value) return null;
	      var m = getMoment(culture, value, format);
	      if (m.isValid()) return m.toDate();
	      return null;
	    },
	    format: function format(value, _format, culture) {
	      return getMoment(culture, value).format(_format);
	    }
	  };

	  _configure2.default.setDateLocalizer(localizer);

	  return localizer;
	};

	var _configure = __webpack_require__(2);

	var _configure2 = _interopRequireDefault(_configure);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = window.ReactWidgets;

/***/ })
/******/ ]);