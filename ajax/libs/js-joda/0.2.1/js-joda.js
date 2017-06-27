(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jsjoda"] = factory();
	else
		root["jsjoda"] = factory();
})(this, function() {
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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _LocalDate = __webpack_require__(1);
	
	exports['default'] = {
	    LocalDate: _LocalDate.LocalDate
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _assert = __webpack_require__(2);
	
	var _MathUtil = __webpack_require__(3);
	
	var _chronoIsoChronology = __webpack_require__(4);
	
	var _temporalChronoField = __webpack_require__(5);
	
	/**
	 * The number of days in a 400 year cycle.
	 */
	var DAYS_PER_CYCLE = 146097;
	
	/**
	 * The number of days from year zero to year 1970.
	 * There are five 400 year cycles from year zero to 2000.
	 * There are 7 leap years from 1970 to 2000.
	 */
	var DAYS_0000_TO_1970 = DAYS_PER_CYCLE * 5 - (30 * 365 + 7);
	
	/**
	 * A date without a time-zone in the ISO-8601 calendar system,
	 * such as 2007-12-03.
	 *
	 * LocalDate is an immutable date-time object that represents a date,
	 * often viewed as year-month-day. Other date fields, such as day-of-year,
	 * day-of-week and week-of-year, can also be accessed.
	 * For example, the value "2nd October 2007" can be stored in a LocalDate.
	 *
	 * This class does not store or represent a time or time-zone.
	 * Instead, it is a description of the date, as used for birthdays.
	 * It cannot represent an instant on the time-line without additional information
	 * such as an offset or time-zone.
	 */
	
	var LocalDate = (function () {
	
	    /**
	     *
	     * @param {number} year
	     * @param {number} month
	     * @param {number} dayOfMonth
	     */
	
	    function LocalDate(year, month, dayOfMonth) {
	        _classCallCheck(this, LocalDate);
	
	        LocalDate.validate(year, month, dayOfMonth);
	        this._year = year;
	        this._month = month;
	        this._day = dayOfMonth;
	    }
	
	    /**
	     *
	     * @return {number} gets the year
	     */
	
	    _createClass(LocalDate, [{
	        key: 'year',
	        value: function year() {
	            return this._year;
	        }
	
	        /**
	         *
	         * @return {number} gets the month
	         */
	    }, {
	        key: 'month',
	        value: function month() {
	            return this._month;
	        }
	
	        /**
	         *
	         * @return {number} gets the day of month
	         */
	    }, {
	        key: 'day',
	        value: function day() {
	            return this._day;
	        }
	
	        /*
	         * Returns a copy of this LocalDate with the specified number of days added.
	         * 
	         * This method adds the specified amount to the days field incrementing the
	         * month and year fields as necessary to ensure the result remains valid.
	         * The result is only invalid if the maximum/minimum year is exceeded.
	         * 
	         * For example, 2008-12-31 plus one day would result in 2009-01-01.
	         * 
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {number} daysToAdd - the days to add, may be negative
	         * @return {LocalDate} a LocalDate based on this date with the days added, not null
	         * @throws AssertionError if the result exceeds the supported date range
	         */
	    }, {
	        key: 'plusDays',
	        value: function plusDays(daysToAdd) {
	            if (daysToAdd === 0) {
	                return this;
	            }
	            var mjDay = this.toEpochDay() + daysToAdd;
	            return LocalDate.ofEpochDay(mjDay);
	        }
	    }, {
	        key: 'toEpochDay',
	
	        /**
	         * Converts this date to the Epoch Day.
	         *
	         * The Epoch Day count is a simple incrementing count of days where day 0 is 1970-01-01 (ISO).
	         * This definition is the same for all chronologies, enabling conversion.
	         *
	         * @return {number} the Epoch Day equivalent to this date
	         */
	        value: function toEpochDay() {
	            var y = this.year();
	            var m = this.month();
	            var total = 0;
	            total += 365 * y;
	            if (y >= 0) {
	                total += _MathUtil.MathUtil.div(y + 3, 4) - _MathUtil.MathUtil.div(y + 99, 100) + _MathUtil.MathUtil.div(y + 399, 400);
	            } else {
	                total -= _MathUtil.MathUtil.div(y, -4) - _MathUtil.MathUtil.div(y, -100) + _MathUtil.MathUtil.div(y, -400);
	            }
	            total += _MathUtil.MathUtil.div(367 * m - 362, 12);
	            total += this.day() - 1;
	            if (m > 2) {
	                total--;
	                if (!_chronoIsoChronology.IsoChronology.isLeapYear(y)) {
	                    total--;
	                }
	            }
	            return total - DAYS_0000_TO_1970;
	        }
	
	        /**
	         * Outputs this date as a String, such as 2007-12-03.
	         * The output will be in the ISO-8601 format uuuu-MM-dd.
	         *
	         * @return {string} a string representation of this date, not null
	         */
	    }, {
	        key: 'toString',
	        value: function toString() {
	            var dayString, monthString, yearString;
	
	            var yearValue = this.year();
	            var monthValue = this.month();
	            var dayValue = this.day();
	
	            var absYear = Math.abs(yearValue);
	
	            if (absYear < 1000) {
	                if (yearValue < 0) {
	                    yearString = "-" + ("" + (yearValue - 10000)).slice(-4);
	                } else {
	                    yearString = ("" + (yearValue + 10000)).slice(-4);
	                }
	            } else {
	                if (yearValue > 9999) {
	                    yearString = "+" + yearValue;
	                } else {
	                    yearString = "" + yearValue;
	                }
	            }
	
	            if (monthValue < 10) {
	                monthString = "-0" + monthValue;
	            } else {
	                monthString = "-" + monthValue;
	            }
	
	            if (dayValue < 10) {
	                dayString = "-0" + dayValue;
	            } else {
	                dayString = "-" + dayValue;
	            }
	
	            return yearString + monthString + dayString;
	        }
	
	        /*
	         * Obtains an instance of LocalDate from the epoch day count.
	         *
	         * This returns a LocalDate with the specified epoch-day.
	         * The {@link ChronoField#EPOCH_DAY EPOCH_DAY} is a simple incrementing count
	         * of days where day 0 is 1970-01-01. Negative numbers represent earlier days.
	         *
	         * @param {number} epochDay - the Epoch Day to convert, based on the epoch 1970-01-01
	         * @return {LocalDate} the local date, not null
	         * @throws AssertionError if the epoch days exceeds the supported date range
	         */
	
	    }], [{
	        key: 'ofEpochDay',
	        value: function ofEpochDay(epochDay) {
	            var adjust, adjustCycles, dom, doyEst, marchDoy0, marchMonth0, month, year, yearEst, zeroDay;
	            zeroDay = epochDay + DAYS_0000_TO_1970;
	            zeroDay -= 60;
	            adjust = 0;
	            if (zeroDay < 0) {
	                adjustCycles = _MathUtil.MathUtil.div(zeroDay + 1, DAYS_PER_CYCLE) - 1;
	                adjust = adjustCycles * 400;
	                zeroDay += -adjustCycles * DAYS_PER_CYCLE;
	            }
	            yearEst = _MathUtil.MathUtil.div(400 * zeroDay + 591, DAYS_PER_CYCLE);
	            doyEst = zeroDay - (365 * yearEst + _MathUtil.MathUtil.div(yearEst, 4) - _MathUtil.MathUtil.div(yearEst, 100) + _MathUtil.MathUtil.div(yearEst, 400));
	            if (doyEst < 0) {
	                yearEst--;
	                doyEst = zeroDay - (365 * yearEst + _MathUtil.MathUtil.div(yearEst, 4) - _MathUtil.MathUtil.div(yearEst, 100) + _MathUtil.MathUtil.div(yearEst, 400));
	            }
	            yearEst += adjust;
	            marchDoy0 = doyEst;
	            marchMonth0 = _MathUtil.MathUtil.div(marchDoy0 * 5 + 2, 153);
	            month = (marchMonth0 + 2) % 12 + 1;
	            dom = marchDoy0 - _MathUtil.MathUtil.div(marchMonth0 * 306 + 5, 10) + 1;
	            yearEst += _MathUtil.MathUtil.div(marchMonth0, 10);
	            year = yearEst;
	            return new LocalDate(year, month, dom);
	        }
	    }, {
	        key: 'validate',
	
	        /**
	         * @private
	         */
	        value: function validate(year, month, dayOfMonth) {
	            var dom;
	            _temporalChronoField.YEAR.checkValidValue(year);
	            _temporalChronoField.MONTH_OF_YEAR.checkValidValue(month);
	            _temporalChronoField.DAY_OF_MONTH.checkValidValue(dayOfMonth);
	            if (dayOfMonth > 28) {
	                dom = 31;
	                switch (month) {
	                    case 2:
	                        dom = _chronoIsoChronology.IsoChronology.isLeapYear(year) ? 29 : 28;
	                        break;
	                    case 4:
	                    case 6:
	                    case 9:
	                    case 11:
	                        dom = 30;
	                }
	                if (dayOfMonth > dom) {
	                    if (dayOfMonth === 29) {
	                        (0, _assert.assert)(false, "Invalid date 'February 29' as '" + year + "' is not a leap year");
	                    } else {
	                        (0, _assert.assert)(false, "Invalid date '" + year + "' '" + month + "' '" + dayOfMonth + "'");
	                    }
	                }
	            }
	        }
	    }]);
	
	    return LocalDate;
	})();

	exports.LocalDate = LocalDate;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.assert = assert;
	
	function assert(assertion, msg) {
	    if (!assertion) {
	        throw new Error(msg);
	    }
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Math helper with static function for integer operations
	 */
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MathUtil = (function () {
	    function MathUtil() {
	        _classCallCheck(this, MathUtil);
	    }
	
	    _createClass(MathUtil, null, [{
	        key: "div",
	        value: function div(a, b) {
	            return ~ ~(a / b);
	        }
	    }]);
	
	    return MathUtil;
	})();

	exports.MathUtil = MathUtil;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var IsoChronology = (function () {
	    function IsoChronology() {
	        _classCallCheck(this, IsoChronology);
	    }
	
	    _createClass(IsoChronology, null, [{
	        key: "isLeapYear",
	
	        /**
	         * Checks if the year is a leap year, according to the ISO proleptic
	         * calendar system rules.
	         *
	         * This method applies the current rules for leap years across the whole time-line.
	         * In general, a year is a leap year if it is divisible by four without
	         * remainder. However, years divisible by 100, are not leap years, with
	         * the exception of years divisible by 400 which are.
	         *
	         * For example, 1904 is a leap year it is divisible by 4.
	         * 1900 was not a leap year as it is divisible by 100, however 2000 was a
	         * leap year as it is divisible by 400.
	         *
	         * The calculation is proleptic - applying the same rules into the far future and far past.
	         * This is historically inaccurate, but is correct for the ISO-8601 standard.
	         *
	         * @param {number} prolepticYear - the ISO proleptic year to check
	         * @return true if the year is leap, false otherwise
	         */
	        value: function isLeapYear(prolepticYear) {
	            return (prolepticYear & 3) === 0 && (prolepticYear % 100 !== 0 || prolepticYear % 400 === 0);
	        }
	    }]);
	
	    return IsoChronology;
	})();

	exports.IsoChronology = IsoChronology;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _ValueRange = __webpack_require__(6);
	
	var ChronoField = (function () {
	    function ChronoField(name, baseUnit, rangeUnit, range, displayNameKey) {
	        _classCallCheck(this, ChronoField);
	
	        this.name = function () {
	            return name;
	        };
	        this.baseUnit = function () {
	            return baseUnit;
	        };
	        this.rangeUnit = function () {
	            return rangeUnit;
	        };
	        this.range = function () {
	            return range;
	        };
	        this.displayNameKey = function () {
	            return displayNameKey;
	        };
	    }
	
	    _createClass(ChronoField, [{
	        key: "checkValidValue",
	        value: function checkValidValue(value) {
	            return this.range().checkValidValue(value, this.name());
	        }
	    }]);
	
	    return ChronoField;
	})();
	
	var DAY_OF_MONTH = new ChronoField("DayOfMonth", null, null, _ValueRange.ValueRange.of(1, 28, 31), "day");
	
	exports.DAY_OF_MONTH = DAY_OF_MONTH;
	var MONTH_OF_YEAR = new ChronoField("MonthOfYear", null, null, _ValueRange.ValueRange.of(1, 12), "month");
	
	exports.MONTH_OF_YEAR = MONTH_OF_YEAR;
	var YEAR = new ChronoField("" + "Year", null, null, _ValueRange.ValueRange.of(-999999, 999999), "year");
	exports.YEAR = YEAR;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _assert = __webpack_require__(2);
	
	/**
	 * The range of valid values for a date-time field.
	 * 
	 * All TemporalField instances have a valid range of values.
	 * For example, the ISO day-of-month runs from 1 to somewhere between 28 and 31.
	 * This class captures that valid range.
	 * 
	 * It is important to be aware of the limitations of this class.
	 * Only the minimum and maximum values are provided.
	 * It is possible for there to be invalid values within the outer range.
	 * For example, a weird field may have valid values of 1, 2, 4, 6, 7, thus
	 * have a range of '1 - 7', despite that fact that values 3 and 5 are invalid.
	 * 
	 * Instances of this class are not tied to a specific field.
	 *
	 */
	
	var ValueRange = (function () {
	    function ValueRange(minSmallest, minLargest, maxSmallest, maxLargest) {
	        _classCallCheck(this, ValueRange);
	
	        (0, _assert.assert)(!(minSmallest > minLargest), "Smallest minimum value '" + minSmallest + "' must be less than largest minimum value '" + minLargest + "'");
	        (0, _assert.assert)(!(maxSmallest > maxLargest), "Smallest maximum value '" + maxSmallest + "' must be less than largest maximum value '" + maxLargest + "'");
	        (0, _assert.assert)(!(minLargest > maxLargest), "Minimum value '" + minLargest + "' must be less than maximum value '" + maxLargest + "'");
	
	        this.minimum = function () {
	            return minSmallest;
	        };
	        this.largestMinimum = function () {
	            return minLargest;
	        };
	        this.maximum = function () {
	            return maxLargest;
	        };
	        this.smallestMaximum = function () {
	            return maxSmallest;
	        };
	    }
	
	    _createClass(ValueRange, [{
	        key: "isValidValue",
	        value: function isValidValue(value) {
	            return this.minimum() <= value && value <= this.maximum();
	        }
	    }, {
	        key: "checkValidValue",
	        value: function checkValidValue(value, field) {
	            var msg;
	            if (!this.isValidValue(value)) {
	                if (field != null) {
	                    msg = "Invalid value for " + field + " (valid values " + this.toString() + "): " + value;
	                } else {
	                    msg = "Invalid value (valid values " + this.toString() + "): " + value;
	                }
	                return (0, _assert.assert)(false, msg);
	            }
	        }
	
	        /*
	         * Outputs this range as a String.
	         * 
	         * The format will be '{min}/{largestMin} - {smallestMax}/{max}',
	         * where the largestMin or smallestMax sections may be omitted, together
	         * with associated slash, if they are the same as the min or max.
	         *
	         * @return {string} a string representation of this range, not null
	         */
	
	    }, {
	        key: "toString",
	        value: function toString() {
	            var str = this.minimum() + (this.minimum() !== this.largestMinimum() ? "/" + this.largestMinimum() : "");
	            str += " - ";
	            str += this.smallestMaximum() + (this.smallestMaximum() !== this.maximum() ? "/" + this.maximum() : "");
	            return str;
	        }
	
	        /*
	         * called with 2 params: Obtains a fixed value range.
	         *
	         * This factory obtains a range where the minimum and maximum values are fixed.
	         * For example, the ISO month-of-year always runs from 1 to 12.
	         *
	         * @param min  the minimum value
	         * @param max  the maximum value
	         * @return the ValueRange for min, max, not null
	          * called with 3 params: Obtains a variable value range.
	         *
	         * This factory obtains a range where the minimum value is fixed and the maximum value may vary.
	         * For example, the ISO day-of-month always starts at 1, but ends between 28 and 31.
	         *
	         * @param min  the minimum value
	         * @param maxSmallest  the smallest maximum value
	         * @param maxLargest  the largest maximum value
	         * @return the ValueRange for min, smallest max, largest max, not null
	          * called with 4 params: Obtains a fully variable value range.
	         *
	         * This factory obtains a range where both the minimum and maximum value may vary.
	         *
	         * @param minSmallest  the smallest minimum value
	         * @param minLargest  the largest minimum value
	         * @param maxSmallest  the smallest maximum value
	         * @param maxLargest  the largest maximum value
	         * @return {ValueRange} the ValueRange for smallest min, largest min, smallest max, largest max, not null
	         */
	
	    }], [{
	        key: "of",
	        value: function of() {
	            if (arguments.length === 2) {
	                return new ValueRange(arguments[0], arguments[0], arguments[1], arguments[1]);
	            } else if (arguments.length === 3) {
	                return new ValueRange(arguments[0], arguments[0], arguments[1], arguments[2]);
	            } else if (arguments.length === 4) {
	                return new ValueRange(arguments[0], arguments[1], arguments[2], arguments[3]);
	            } else {
	                return (0, _assert.assert)(false, "Invalid number of arguments " + arguments.length);
	            }
	        }
	    }]);
	
	    return ValueRange;
	})();

	exports.ValueRange = ValueRange;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=js-joda.js.map