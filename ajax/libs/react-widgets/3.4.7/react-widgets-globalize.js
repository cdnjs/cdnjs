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
	var args = [Globalize];


	if (typeof module === 'function') {
	  module.apply(null, args || [])
	}



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = globalizeLocalizers;

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _configure = __webpack_require__(7);

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

	    propType: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object, _propTypes2.default.func]),

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

	    propType: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	if (false) {
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
	  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(3)();
	}


/***/ }),
/* 3 */
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

	var emptyFunction = __webpack_require__(4);
	var invariant = __webpack_require__(5);
	var ReactPropTypesSecret = __webpack_require__(6);

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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/**
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

	if (false) {
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

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports) {

	module.exports = window.ReactWidgets;

/***/ })
/******/ ]);