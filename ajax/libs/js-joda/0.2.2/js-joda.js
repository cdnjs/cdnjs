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
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _LocalDate = __webpack_require__(1);
	
	Object.defineProperty(exports, 'LocalDate', {
	  enumerable: true,
	  get: function get() {
	    return _LocalDate.LocalDate;
	  }
	});
	
	var _Instant = __webpack_require__(12);
	
	Object.defineProperty(exports, 'Instant', {
	  enumerable: true,
	  get: function get() {
	    return _Instant.Instant;
	  }
	});
	
	var _Clock = __webpack_require__(11);
	
	Object.defineProperty(exports, 'Clock', {
	  enumerable: true,
	  get: function get() {
	    return _Clock.Clock;
	  }
	});
	
	var _ZoneOffset = __webpack_require__(18);
	
	Object.defineProperty(exports, 'ZoneOffset', {
	  enumerable: true,
	  get: function get() {
	    return _ZoneOffset.ZoneOffset;
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LocalDate = undefined;
	
	var _assert = __webpack_require__(2);
	
	var _MathUtil = __webpack_require__(5);
	
	var _errors = __webpack_require__(3);
	
	var _IsoChronology = __webpack_require__(6);
	
	var _ChronoField = __webpack_require__(7);
	
	var _Clock = __webpack_require__(11);
	
	var _Month = __webpack_require__(19);
	
	var _Year = __webpack_require__(10);
	
	var _LocalTime = __webpack_require__(15);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	
	var LocalDate = exports.LocalDate = (function () {
	
	    /**
	     *
	     * @param {number} year
	     * @param {Month, number} month
	     * @param {number} dayOfMonth
	     */
	
	    function LocalDate(year, month, dayOfMonth) {
	        _classCallCheck(this, LocalDate);
	
	        if (month instanceof _Month.Month) {
	            month = month.value();
	        }
	        LocalDate.validate(year, month, dayOfMonth);
	        this._year = year;
	        this._month = month;
	        this._day = dayOfMonth;
	    }
	
	    /**
	     * Obtains an instance of {@code LocalDate} from a year, month and day.
	     * <p>
	     * This returns a {@code LocalDate} with the specified year, month and day-of-month.
	     * The day must be valid for the year and month, otherwise an exception will be thrown.
	     *
	     * @param {number} year  the year to represent, from MIN_YEAR to MAX_YEAR
	     * @param {Month, number} month  the month-of-year to represent, from 1 (January) to 12 (December)
	     * @param {number} dayOfMonth  the day-of-month to represent, from 1 to 31
	     * @return LocalDate the local date, not null
	     * @throws DateTimeException if the value of any field is out of range,
	     *  or if the day-of-month is invalid for the month-year
	     */
	
	    _createClass(LocalDate, [{
	        key: 'year',
	
	        /**
	         *
	         * @return {number} gets the year
	         */
	        value: function year() {
	            return this._year;
	        }
	
	        /**
	         *
	         * @return {number} gets the month
	         */
	
	    }, {
	        key: 'monthValue',
	        value: function monthValue() {
	            return this._month;
	        }
	    }, {
	        key: 'month',
	        value: function month() {
	            return _Month.Month.of(this._month);
	        }
	
	        /**
	         *
	         * @return {number} gets the day of month
	         */
	
	    }, {
	        key: 'dayOfMonth',
	        value: function dayOfMonth() {
	            return this._day;
	        }
	
	        /**
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
	
	        /*
	         * Returns a copy of this LocalDate with the specified number of days subtracted.
	         * 
	         * This method subtracts the specified amount from the days field decrementing the
	         * month and year fields as necessary to ensure the result remains valid.
	         * The result is only invalid if the maximum/minimum year is exceeded.
	         * 
	         * For example, 2009-01-01 minus one day would result in 2008-12-31.
	         * 
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {number} daysToSubtract - the days to subtract, may be negative
	         * @return {LocalDate} a LocalDate based on this date with the days subtracted, not null
	         * @throws AssertionError if the result exceeds the supported date range
	         */
	
	    }, {
	        key: 'minusDays',
	        value: function minusDays(daysToSubtract) {
	            return this.plusDays(daysToSubtract * -1);
	        }
	
	        /**
	         * Converts this date to the Epoch Day.
	         *
	         * The Epoch Day count is a simple incrementing count of days where day 0 is 1970-01-01 (ISO).
	         * This definition is the same for all chronologies, enabling conversion.
	         *
	         * @return {number} the Epoch Day equivalent to this date
	         */
	
	    }, {
	        key: 'toEpochDay',
	        value: function toEpochDay() {
	            var y = this.year();
	            var m = this.monthValue();
	            var total = 0;
	            total += 365 * y;
	            if (y >= 0) {
	                total += _MathUtil.MathUtil.intDiv(y + 3, 4) - _MathUtil.MathUtil.intDiv(y + 99, 100) + _MathUtil.MathUtil.intDiv(y + 399, 400);
	            } else {
	                total -= _MathUtil.MathUtil.intDiv(y, -4) - _MathUtil.MathUtil.intDiv(y, -100) + _MathUtil.MathUtil.intDiv(y, -400);
	            }
	            total += _MathUtil.MathUtil.intDiv(367 * m - 362, 12);
	            total += this.dayOfMonth() - 1;
	            if (m > 2) {
	                total--;
	                if (!_IsoChronology.IsoChronology.isLeapYear(y)) {
	                    total--;
	                }
	            }
	            return total - DAYS_0000_TO_1970;
	        }
	
	        /**
	         * Obtains the current date from the system clock in the default time-zone or
	         * if specified, the current date from the specified clock.
	         *
	         * This will query the specified clock to obtain the current date - today.
	         * Using this method allows the use of an alternate clock for testing.
	         *
	         * @param clock  the clock to use, if null, the system clock and default time-zone is used.
	         * @return the current date, not null
	         */
	
	    }, {
	        key: 'equals',
	
	        /**
	         * Checks if this date is equal to another date.
	         *
	         * Compares this LocalDate with another ensuring that the date is the same.
	         *
	         * Only objects of type LocalDate are compared, other types return false.
	         *
	         * @param otherDate  the object to check, null returns false
	         * @return true if this is equal to the other date
	         */
	        value: function equals(otherDate) {
	            if (this === otherDate) {
	                return true;
	            }
	            if (otherDate instanceof LocalDate) {
	                return this._compareTo(otherDate) === 0;
	            }
	            return false;
	        }
	    }, {
	        key: '_compareTo',
	        value: function _compareTo(otherDate) {
	            var cmp = this.year() - otherDate.year();
	            if (cmp === 0) {
	                cmp = this.monthValue() - otherDate.monthValue();
	                if (cmp === 0) {
	                    cmp = this.dayOfMonth() - otherDate.dayOfMonth();
	                }
	            }
	            return cmp;
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
	            var monthValue = this.monthValue();
	            var dayValue = this.dayOfMonth();
	
	            var absYear = Math.abs(yearValue);
	
	            if (absYear < 1000) {
	                if (yearValue < 0) {
	                    yearString = '-' + ('' + (yearValue - 10000)).slice(-4);
	                } else {
	                    yearString = ('' + (yearValue + 10000)).slice(-4);
	                }
	            } else {
	                if (yearValue > 9999) {
	                    yearString = '+' + yearValue;
	                } else {
	                    yearString = '' + yearValue;
	                }
	            }
	
	            if (monthValue < 10) {
	                monthString = '-0' + monthValue;
	            } else {
	                monthString = '-' + monthValue;
	            }
	
	            if (dayValue < 10) {
	                dayString = '-0' + dayValue;
	            } else {
	                dayString = '-' + dayValue;
	            }
	
	            return yearString + monthString + dayString;
	        }
	
	        /**
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
	
	    }, {
	        key: 'withDayOfMonth',
	
	        /**
	         * Returns a copy of this {@code LocalDate} with the day-of-month altered.
	         * <p>
	         * If the resulting date is invalid, an exception is thrown.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {number} dayOfMonth  the day-of-month to set in the result, from 1 to 28-31
	         * @return {LocalDate} based on this date with the requested day, not null
	         * @throws DateTimeException if the day-of-month value is invalid,
	         *  or if the day-of-month is invalid for the month-year
	         */
	        value: function withDayOfMonth(dayOfMonth) {
	            if (this._day === dayOfMonth) {
	                return this;
	            }
	            return LocalDate.of(this._year, this._month, dayOfMonth);
	        }
	
	        /**
	         * Returns a copy of this {@code LocalDate} with the month-of-year altered.
	         * <p>
	         * If the day-of-month is invalid for the year, it will be changed to the last valid day of the month.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {number} month  the month-of-year to set in the result, from 1 (January) to 12 (December)
	         * @return {@code LocalDate} based on this date with the requested month, not null
	         * @throws DateTimeException if the month-of-year value is invalid
	         */
	
	    }, {
	        key: 'withMonth',
	        value: function withMonth(month) {
	            if (this._month === month) {
	                return this;
	            }
	            return LocalDate.of(this._year, month, this._day);
	        }
	
	        /**
	         * @private
	         */
	
	    }], [{
	        key: 'of',
	        value: function of(year, month, dayOfMonth) {
	            return new LocalDate(year, month, dayOfMonth);
	        }
	    }, {
	        key: 'now',
	        value: function now() {
	            var clock = arguments.length <= 0 || arguments[0] === undefined ? _Clock.Clock.systemDefaultZone() : arguments[0];
	
	            var now = clock.instant();
	            var offset = clock.offset(now);
	            var epochSec = now.epochSecond() + offset.totalSeconds();
	            var epochDay = _MathUtil.MathUtil.floorDiv(epochSec, _LocalTime.LocalTime.SECONDS_PER_DAY);
	            return LocalDate.ofEpochDay(epochDay);
	        }
	    }, {
	        key: 'ofEpochDay',
	        value: function ofEpochDay(epochDay) {
	            var adjust, adjustCycles, dom, doyEst, marchDoy0, marchMonth0, month, year, yearEst, zeroDay;
	            zeroDay = epochDay + DAYS_0000_TO_1970;
	            zeroDay -= 60;
	            adjust = 0;
	            if (zeroDay < 0) {
	                adjustCycles = _MathUtil.MathUtil.intDiv(zeroDay + 1, DAYS_PER_CYCLE) - 1;
	                adjust = adjustCycles * 400;
	                zeroDay += -adjustCycles * DAYS_PER_CYCLE;
	            }
	            yearEst = _MathUtil.MathUtil.intDiv(400 * zeroDay + 591, DAYS_PER_CYCLE);
	            doyEst = zeroDay - (365 * yearEst + _MathUtil.MathUtil.intDiv(yearEst, 4) - _MathUtil.MathUtil.intDiv(yearEst, 100) + _MathUtil.MathUtil.intDiv(yearEst, 400));
	            if (doyEst < 0) {
	                yearEst--;
	                doyEst = zeroDay - (365 * yearEst + _MathUtil.MathUtil.intDiv(yearEst, 4) - _MathUtil.MathUtil.intDiv(yearEst, 100) + _MathUtil.MathUtil.intDiv(yearEst, 400));
	            }
	            yearEst += adjust;
	            marchDoy0 = doyEst;
	            marchMonth0 = _MathUtil.MathUtil.intDiv(marchDoy0 * 5 + 2, 153);
	            month = (marchMonth0 + 2) % 12 + 1;
	            dom = marchDoy0 - _MathUtil.MathUtil.intDiv(marchMonth0 * 306 + 5, 10) + 1;
	            yearEst += _MathUtil.MathUtil.intDiv(marchMonth0, 10);
	            year = yearEst;
	            return new LocalDate(year, month, dom);
	        }
	
	        /**
	         * Obtains an instance of {@code LocalDate} from a year and day-of-year.
	         * <p>
	         * This returns a {@code LocalDate} with the specified year and day-of-year.
	         * The day-of-year must be valid for the year, otherwise an exception will be thrown.
	         *
	         * @param {number} year  the year to represent, from MIN_YEAR to MAX_YEAR
	         * @param {number} dayOfYear  the day-of-year to represent, from 1 to 366
	         * @return LocalDate the local date, not null
	         * @throws DateTimeException if the value of any field is out of range,
	         *  or if the day-of-year is invalid for the year
	         */
	
	    }, {
	        key: 'ofYearDay',
	        value: function ofYearDay(year, dayOfYear) {
	            _ChronoField.ChronoField.YEAR.checkValidValue(year);
	            //TODO: ChronoField.DAY_OF_YEAR.checkValidValue(dayOfYear);
	            var leap = _IsoChronology.IsoChronology.isLeapYear(year);
	            if (dayOfYear === 366 && leap === false) {
	                (0, _assert.assert)(false, 'Invalid date \'DayOfYear 366\' as \'' + year + '\' is not a leap year', _errors.DateTimeException);
	            }
	            var moy = _Month.Month.of(Math.floor((dayOfYear - 1) / 31 + 1));
	            var monthEnd = moy.firstDayOfYear(leap) + moy.length(leap) - 1;
	            if (dayOfYear > monthEnd) {
	                moy = moy.plus(1);
	            }
	            var dom = dayOfYear - moy.firstDayOfYear(leap) + 1;
	            return new LocalDate(year, moy.value(), dom);
	        }
	    }, {
	        key: 'validate',
	        value: function validate(year, month, dayOfMonth) {
	            var dom;
	            _ChronoField.ChronoField.YEAR.checkValidValue(year);
	            _ChronoField.ChronoField.MONTH_OF_YEAR.checkValidValue(month);
	            _ChronoField.ChronoField.DAY_OF_MONTH.checkValidValue(dayOfMonth);
	            if (dayOfMonth > 28) {
	                dom = 31;
	                switch (month) {
	                    case 2:
	                        dom = _IsoChronology.IsoChronology.isLeapYear(year) ? 29 : 28;
	                        break;
	                    case 4:
	                    case 6:
	                    case 9:
	                    case 11:
	                        dom = 30;
	                }
	                if (dayOfMonth > dom) {
	                    if (dayOfMonth === 29) {
	                        (0, _assert.assert)(false, 'Invalid date \'February 29\' as \'' + year + '\' is not a leap year', _errors.DateTimeException);
	                    } else {
	                        (0, _assert.assert)(false, 'Invalid date \'' + year + '\' \'' + month + '\' \'' + dayOfMonth + '\'', _errors.DateTimeException);
	                    }
	                }
	            }
	        }
	    }]);
	
	    return LocalDate;
	})();
	
	/**
	 * The minimum supported {@code LocalDate}
	 * This could be used by an application as a "far past" date.
	 */
	
	LocalDate.MIN = LocalDate.of(_Year.Year.MIN_VALUE, 1, 1);
	/**
	 * The maximum supported {@code LocalDate}
	 * This could be used by an application as a "far future" date.
	 */
	LocalDate.MAX = LocalDate.of(_Year.Year.MAX_VALUE, 12, 31);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.assert = assert;
	exports.requireNonNull = requireNonNull;
	
	var _errors = __webpack_require__(3);
	
	function assert(assertion, msg, error) {
	    if (!assertion) {
	        if (error) {
	            throw new error(msg);
	        } else {
	            throw new Error(msg);
	        }
	    }
	}
	
	function requireNonNull(value, parameterName) {
	    if (value == null) {
	        throw new _errors.NullPointerException(parameterName + ' must not be null');
	    }
	    return value;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.NullPointerException = exports.ArithmeticException = exports.UnsupportedTemporalTypeException = exports.DateTimeParseException = exports.DateTimeException = undefined;
	
	var _es6Error = __webpack_require__(4);
	
	var _es6Error2 = _interopRequireDefault(_es6Error);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DateTimeException = exports.DateTimeException = (function (_ExtendableError) {
	    _inherits(DateTimeException, _ExtendableError);
	
	    function DateTimeException() {
	        var message = arguments.length <= 0 || arguments[0] === undefined ? 'DateTimeException' : arguments[0];
	        var cause = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
	        _classCallCheck(this, DateTimeException);
	
	        var msg = message;
	        if (cause !== null && cause instanceof Error) {
	            msg += '\n-------\nCaused by: ' + cause.stack + '\n-------\n';
	        }
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(DateTimeException).call(this, msg));
	    }
	
	    return DateTimeException;
	})(_es6Error2.default);
	
	var DateTimeParseException = exports.DateTimeParseException = (function (_ExtendableError2) {
	    _inherits(DateTimeParseException, _ExtendableError2);
	
	    function DateTimeParseException() {
	        var message = arguments.length <= 0 || arguments[0] === undefined ? 'DateTimeParseException' : arguments[0];
	        var text = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	        var index = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	        var cause = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	
	        _classCallCheck(this, DateTimeParseException);
	
	        var msg = message + ': ' + text + ', at index: ' + index;
	        if (cause !== null && cause instanceof Error) {
	            msg += '\n-------\nCaused by: ' + cause.stack + '\n-------\n';
	        }
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(DateTimeParseException).call(this, msg));
	    }
	
	    return DateTimeParseException;
	})(_es6Error2.default);
	
	var UnsupportedTemporalTypeException = exports.UnsupportedTemporalTypeException = (function (_ExtendableError3) {
	    _inherits(UnsupportedTemporalTypeException, _ExtendableError3);
	
	    function UnsupportedTemporalTypeException() {
	        var message = arguments.length <= 0 || arguments[0] === undefined ? 'UnsupportedTemporalTypeException' : arguments[0];
	
	        _classCallCheck(this, UnsupportedTemporalTypeException);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(UnsupportedTemporalTypeException).call(this, message));
	    }
	
	    return UnsupportedTemporalTypeException;
	})(_es6Error2.default);
	
	var ArithmeticException = exports.ArithmeticException = (function (_ExtendableError4) {
	    _inherits(ArithmeticException, _ExtendableError4);
	
	    function ArithmeticException() {
	        var message = arguments.length <= 0 || arguments[0] === undefined ? 'ArithmeticException' : arguments[0];
	
	        _classCallCheck(this, ArithmeticException);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ArithmeticException).call(this, message));
	    }
	
	    return ArithmeticException;
	})(_es6Error2.default);
	
	var NullPointerException = exports.NullPointerException = (function (_ExtendableError5) {
	    _inherits(NullPointerException, _ExtendableError5);
	
	    function NullPointerException() {
	        var message = arguments.length <= 0 || arguments[0] === undefined ? 'NullPointerException' : arguments[0];
	
	        _classCallCheck(this, NullPointerException);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NullPointerException).call(this, message));
	    }
	
	    return NullPointerException;
	})(_es6Error2.default);

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ExtendableError = (function (_Error) {
	  _inherits(ExtendableError, _Error);
	
	  function ExtendableError() {
	    var message = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	    _classCallCheck(this, ExtendableError);
	
	    _get(Object.getPrototypeOf(ExtendableError.prototype), 'constructor', this).call(this, message);
	
	    // extending Error is weird and does not propagate `message`
	    Object.defineProperty(this, 'message', {
	      enumerable: false,
	      value: message
	    });
	
	    Object.defineProperty(this, 'name', {
	      enumerable: false,
	      value: this.constructor.name
	    });
	
	    if (Error.hasOwnProperty('captureStackTrace')) {
	      Error.captureStackTrace(this, this.constructor);
	      return;
	    }
	
	    Object.defineProperty(this, 'stack', {
	      enumerable: false,
	      value: new Error(message).stack
	    });
	  }
	
	  return ExtendableError;
	})(Error);
	
	exports['default'] = ExtendableError;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MathUtil = exports.MIN_SAFE_INTEGER = exports.MAX_SAFE_INTEGER = undefined;
	
	var _errors = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MAX_SAFE_INTEGER = exports.MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : Math.pow(2, 53) - 1; // Number.MAX_SAFE_INTEGER not defined in #@#$%! PhantomJS
	var MIN_SAFE_INTEGER = exports.MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : -(Math.pow(2, 53) - 1); // Number.MIN_SAFE_INTEGER not defined in #@#$%! PhantomJS
	
	/**
	 * Math helper with static function for integer operations
	 */
	
	var MathUtil = exports.MathUtil = (function () {
	    function MathUtil() {
	        _classCallCheck(this, MathUtil);
	    }
	
	    _createClass(MathUtil, null, [{
	        key: 'intDiv',
	        value: function intDiv(x, y) {
	            var r = x / y;
	            if (r < 0) {
	                return Math.ceil(r);
	            } else {
	                return Math.floor(r);
	            }
	        }
	    }, {
	        key: 'intMod',
	        value: function intMod(x, y) {
	            var r = x - MathUtil.intDiv(x, y) * y;
	            if (r < 0) {
	                return Math.ceil(r);
	            } else {
	                return Math.floor(r);
	            }
	        }
	    }, {
	        key: 'floorDiv',
	        value: function floorDiv(x, y) {
	            var r = Math.floor(x / y);
	            return r;
	        }
	    }, {
	        key: 'floorMod',
	        value: function floorMod(x, y) {
	            var r = x - MathUtil.floorDiv(x, y) * y;
	            return r;
	        }
	    }, {
	        key: 'safeAdd',
	        value: function safeAdd(x, y) {
	            if (x === 0) {
	                var _r = y;
	                if (_r > MAX_SAFE_INTEGER || _r < MIN_SAFE_INTEGER) {
	                    throw new _errors.ArithmeticException('Invalid addition beyond MAX_SAFE_INTEGER!');
	                }
	                return _r;
	            }
	            if (y === 0) {
	                var _r2 = x;
	                if (_r2 > MAX_SAFE_INTEGER || _r2 < MIN_SAFE_INTEGER) {
	                    throw new _errors.ArithmeticException('Invalid addition beyond MAX_SAFE_INTEGER!');
	                }
	                return _r2;
	            }
	            if (x === undefined || y === undefined) {
	                throw new _errors.ArithmeticException('Invalid addition using undefined as argument');
	            }
	            if (isNaN(x) || isNaN(y)) {
	                throw new _errors.ArithmeticException('Invalid addition using NaN as argument');
	            }
	            var r = x + y;
	            // detect overflow, since neither x nor y are 0 (checked above) r cannot be === x or === y
	            // TODO: is this correct and complete?
	            if (r > MAX_SAFE_INTEGER || r < MIN_SAFE_INTEGER || r === x || r === y) {
	                throw new _errors.ArithmeticException('Invalid addition beyond MAX_SAFE_INTEGER!');
	            }
	            return r;
	        }
	    }, {
	        key: 'safeSubtract',
	        value: function safeSubtract(x, y) {
	            if (x === 0) {
	                var _r3 = y;
	                if (_r3 > MAX_SAFE_INTEGER || _r3 < MIN_SAFE_INTEGER) {
	                    throw new _errors.ArithmeticException('Invalid addition beyond MAX_SAFE_INTEGER!');
	                }
	                return _r3;
	            }
	            if (y === 0) {
	                var _r4 = x;
	                if (_r4 > MAX_SAFE_INTEGER || _r4 < MIN_SAFE_INTEGER) {
	                    throw new _errors.ArithmeticException('Invalid addition beyond MAX_SAFE_INTEGER!');
	                }
	                return _r4;
	            }
	            if (x === undefined || y === undefined) {
	                throw new _errors.ArithmeticException('Invalid subtraction using undefined as argument');
	            }
	            if (isNaN(x) || isNaN(y)) {
	                throw new _errors.ArithmeticException('Invalid subtraction using NaN as argument');
	            }
	            var r = x - y;
	            // detect overflow, since neither x nor y are 0 (checked above) r cannot be === x or === y
	            // TODO: is this correct and complete?
	            if (r < MIN_SAFE_INTEGER || r > MAX_SAFE_INTEGER || r === x || r === y) {
	                throw new _errors.ArithmeticException('Invalid subtraction beyond MIN_SAFE_INTEGER!');
	            }
	            return r;
	        }
	    }, {
	        key: 'safeMultiply',
	        value: function safeMultiply(x, y) {
	            if (x == 1) {
	                return y;
	            }
	            if (y == 1) {
	                return x;
	            }
	            if (x == 0 || y == 0) {
	                return 0;
	            }
	            var r = x * y;
	            if (r < MIN_SAFE_INTEGER || r > MAX_SAFE_INTEGER || r / y != x || x == MIN_SAFE_INTEGER && y == -1 || y == MIN_SAFE_INTEGER && x == -1) {
	                throw new _errors.ArithmeticException('Multiplication overflows: ' + x + ' * ' + y);
	            }
	            return r;
	        }
	
	        /**
	         * Compares two Numbers.
	         *
	         * @param {Number} a  the first value
	         * @param {Number} b  the second value
	         * @return {Number} the result
	         */
	
	    }, {
	        key: 'compareNumbers',
	        value: function compareNumbers(a, b) {
	            if (a < b) {
	                return -1;
	            }
	            if (a > b) {
	                return 1;
	            }
	            return 0;
	        }
	    }]);
	
	    return MathUtil;
	})();

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var IsoChronology = exports.IsoChronology = (function () {
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
	
	IsoChronology.INSTANCE = new IsoChronology();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ChronoField = undefined;
	
	var _MathUtil = __webpack_require__(5);
	
	var _TemporalField2 = __webpack_require__(8);
	
	var _ValueRange = __webpack_require__(9);
	
	var _Year = __webpack_require__(10);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ChronoField = exports.ChronoField = (function (_TemporalField) {
	    _inherits(ChronoField, _TemporalField);
	
	    function ChronoField(name, baseUnit, rangeUnit, range, displayNameKey) {
	        _classCallCheck(this, ChronoField);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChronoField).call(this));
	
	        _this.name = function () {
	            return name;
	        };
	        _this.baseUnit = function () {
	            return baseUnit;
	        };
	        _this.rangeUnit = function () {
	            return rangeUnit;
	        };
	        _this.range = function () {
	            return range;
	        };
	        _this.displayNameKey = function () {
	            return displayNameKey;
	        };
	        return _this;
	    }
	
	    _createClass(ChronoField, [{
	        key: 'checkValidValue',
	        value: function checkValidValue(value) {
	            return this.range().checkValidValue(value, this.name());
	        }
	
	        /**
	         * Get the range of valid values for this field using the temporal object to
	         * refine the result.
	         * <p>
	         * This uses the temporal object to find the range of valid values for the field.
	         * This is similar to {@link #range()}, however this method refines the result
	         * using the temporal. For example, if the field is {@code DAY_OF_MONTH} the
	         * {@code range} method is not accurate as there are four possible month lengths,
	         * 28, 29, 30 and 31 days. Using this method with a date allows the range to be
	         * accurate, returning just one of those four options.
	         * <p>
	         * There are two equivalent ways of using this method.
	         * The first is to invoke this method directly.
	         * The second is to use {@link TemporalAccessor#range(TemporalField)}:
	         * <pre>
	         *   // these two lines are equivalent, but the second approach is recommended
	         *   temporal = thisField.rangeRefinedBy(temporal);
	         *   temporal = temporal.range(thisField);
	         * </pre>
	         * It is recommended to use the second approach, {@code range(TemporalField)},
	         * as it is a lot clearer to read in code.
	         * <p>
	         * Implementations should perform any queries or calculations using the fields
	         * available in {@link ChronoField}.
	         * If the field is not supported a {@code DateTimeException} must be thrown.
	         *
	         * @param {TemporalAccessor} temporal  the temporal object used to refine the result, not null
	         * @return {Va;lueRange} the range of valid values for this field, not null
	         * @throws DateTimeException if the range for the field cannot be obtained
	         */
	
	    }, {
	        key: 'rangeRefinedBy',
	        value: function rangeRefinedBy(temporal) {
	            return temporal.range(this);
	        }
	    }]);
	
	    return ChronoField;
	})(_TemporalField2.TemporalField);
	
	// TODO: why can't we use ChronoUnit.NANOS, ... in these initializers??
	//ChronoField.NANO_OF_SECOND = new ChronoField('NanoOfSecond', ChronoUnit.NANOS, ChronoUnit.SECONDS, ValueRange.of(0, 999999999));
	
	ChronoField.NANO_OF_SECOND = new ChronoField('NanoOfSecond', null, null, _ValueRange.ValueRange.of(0, 999999999));
	
	ChronoField.MICRO_OF_SECOND = new ChronoField('MicroOfSecond', null, null, _ValueRange.ValueRange.of(0, 999999));
	
	ChronoField.MILLI_OF_SECOND = new ChronoField('MilliOfSecond', null, null, _ValueRange.ValueRange.of(0, 999));
	
	ChronoField.DAY_OF_MONTH = new ChronoField('DayOfMonth', null, null, _ValueRange.ValueRange.of(1, 28, 31), 'day');
	
	ChronoField.MONTH_OF_YEAR = new ChronoField('MonthOfYear', null, null, _ValueRange.ValueRange.of(1, 12), 'month');
	
	ChronoField.YEAR = new ChronoField('Year', null, null, _ValueRange.ValueRange.of(_Year.Year.MIN_VALUE, _Year.Year.MAX_VALUE), 'year');
	
	ChronoField.INSTANT_SECONDS = new ChronoField('InstantSeconds', null, null, _ValueRange.ValueRange.of(_MathUtil.MIN_SAFE_INTEGER, _MathUtil.MAX_SAFE_INTEGER));

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TemporalField = exports.TemporalField = function TemporalField() {
	    _classCallCheck(this, TemporalField);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ValueRange = undefined;
	
	var _assert = __webpack_require__(2);
	
	var _errors = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	
	var ValueRange = exports.ValueRange = (function () {
	    function ValueRange(minSmallest, minLargest, maxSmallest, maxLargest) {
	        _classCallCheck(this, ValueRange);
	
	        (0, _assert.assert)(!(minSmallest > minLargest), 'Smallest minimum value \'' + minSmallest + '\' must be less than largest minimum value \'' + minLargest + '\'');
	        (0, _assert.assert)(!(maxSmallest > maxLargest), 'Smallest maximum value \'' + maxSmallest + '\' must be less than largest maximum value \'' + maxLargest + '\'');
	        (0, _assert.assert)(!(minLargest > maxLargest), 'Minimum value \'' + minLargest + '\' must be less than maximum value \'' + maxLargest + '\'');
	
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
	        key: 'isValidValue',
	        value: function isValidValue(value) {
	            return this.minimum() <= value && value <= this.maximum();
	        }
	    }, {
	        key: 'checkValidValue',
	        value: function checkValidValue(value, field) {
	            var msg;
	            if (!this.isValidValue(value)) {
	                if (field != null) {
	                    msg = 'Invalid value for ' + field + ' (valid values ' + this.toString() + '): ' + value;
	                } else {
	                    msg = 'Invalid value (valid values ' + this.toString() + '): ' + value;
	                }
	                return (0, _assert.assert)(false, msg, _errors.DateTimeException);
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
	        key: 'toString',
	        value: function toString() {
	            var str = this.minimum() + (this.minimum() !== this.largestMinimum() ? '/' + this.largestMinimum() : '');
	            str += ' - ';
	            str += this.smallestMaximum() + (this.smallestMaximum() !== this.maximum() ? '/' + this.maximum() : '');
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
	        key: 'of',
	        value: function of() {
	            if (arguments.length === 2) {
	                return new ValueRange(arguments[0], arguments[0], arguments[1], arguments[1]);
	            } else if (arguments.length === 3) {
	                return new ValueRange(arguments[0], arguments[0], arguments[1], arguments[2]);
	            } else if (arguments.length === 4) {
	                return new ValueRange(arguments[0], arguments[1], arguments[2], arguments[3]);
	            } else {
	                return (0, _assert.assert)(false, 'Invalid number of arguments ' + arguments.length);
	            }
	        }
	    }]);
	
	    return ValueRange;
	})();

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * A year in the ISO-8601 calendar system, such as {@code 2007}.
	 * <p>
	 * {@code Year} is an immutable date-time object that represents a year.
	 * Any field that can be derived from a year can be obtained.
	 * <p>
	 * <b>Note that years in the ISO chronology only align with years in the
	 * Gregorian-Julian system for modern years. Parts of Russia did not switch to the
	 * modern Gregorian/ISO rules until 1920.
	 * As such, historical years must be treated with caution.</b>
	 * <p>
	 * This class does not store or represent a month, day, time or time-zone.
	 * For example, the value "2007" can be stored in a {@code Year}.
	 * <p>
	 * Years represented by this class follow the ISO-8601 standard and use
	 * the proleptic numbering system. Year 1 is preceded by year 0, then by year -1.
	 * <p>
	 * The ISO-8601 calendar system is the modern civil calendar system used today
	 * in most of the world. It is equivalent to the proleptic Gregorian calendar
	 * system, in which today's rules for leap years are applied for all time.
	 * For most applications written today, the ISO-8601 rules are entirely suitable.
	 * However, any application that makes use of historical dates, and requires them
	 * to be accurate will find the ISO-8601 approach unsuitable.
	 *
	 */
	
	var Year = exports.Year = function Year() {
	  _classCallCheck(this, Year);
	};
	
	/**
	 * The minimum supported year
	 */
	
	Year.MIN_VALUE = -999999;
	/**
	 * The maximum supported year
	 */
	Year.MAX_VALUE = 999999;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Clock = undefined;
	
	var _Instant = __webpack_require__(12);
	
	var _ZoneOffset = __webpack_require__(18);
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * A clock providing access to the current instant, date and time using a time-zone.
	 * <p>
	 * Instances of this class are used to find the current instant, which can be
	 * interpreted using the stored time-zone to find the current date and time.
	 * As such, a clock can be used instead of {@link System#currentTimeMillis()}
	 * and {@link TimeZone#getDefault()}.
	 * <p>
	 * Use of a {@code Clock} is optional. All key date-time classes also have a
	 * {@code now()} factory method that uses the system clock in the default time zone.
	 * The primary purpose of this abstraction is to allow alternate clocks to be
	 * plugged in as and when required. Applications use an object to obtain the
	 * current time rather than a static method. This can simplify testing.
	 * <p>
	 * Best practice for applications is to pass a {@code Clock} into any method
	 * that requires the current instant.
	 *
	 * This approach allows an alternate clock, such as {@link #fixed(Instant, ZoneId) fixed}
	 * or {@link #offset(Clock, Duration) offset} to be used during testing.
	 * <p>
	 * The {@code system} factory methods provide clocks based on the best available
	 * system clock This may use {@link System#currentTimeMillis()}, or a higher
	 * resolution clock if one is available.
	 */
	
	/**
	 * The javascript Clock implementation differs from the openjdk.
	 *
	 * Javascript only provides the UTC millis of epoch and the ZoneOffset in minutes of the system default time.
	 * Javascript do not provide the system default ZoneId.
	 *
	 * the system default ZoneId is only guessable by the ZoneOffset, like moment-timezone does by returning one ZoneId
	 * with the same ZoneOffset.
	 *
	 * Therefore we are doing a shortcut here, by defining a SystemUTCClock and a SystemDefaultClock, the Clock itself
	 * is returning the ZoneOffset and not the ZoneRules as in the jdk. We should change it, when introducing the iana
	 * timezone database and implementing the timezone domains.
	 *
	 */
	
	var Clock = exports.Clock = (function () {
	    function Clock() {
	        _classCallCheck(this, Clock);
	    }
	
	    _createClass(Clock, [{
	        key: 'millis',
	
	        /**
	          * Gets the current millisecond instant of the clock.
	          * <p>
	          * This returns the millisecond-based instant, measured from 1970-01-01T00:00Z (UTC).
	          * This is equivalent to the definition of {@link Date#getTime()}.
	          * <p>
	          * Most applications should avoid this method and use {@link Instant} to represent
	          * an instant on the time-line rather than a raw millisecond value.
	          * This method is provided to allow the use of the clock in high performance use cases
	          * where the creation of an object would be unacceptable.
	          * <p>
	          * The default implementation currently calls {@link #instant}.
	          *
	          * @return the current millisecond instant from this clock, measured from
	          *  the Java epoch of 1970-01-01T00:00Z (UTC), not null
	          */
	        value: function millis() {
	            throw new TypeError('millis() function is not implemented');
	        }
	
	        /**
	         * Gets the current instant of the clock.
	         * <p>
	         * This returns an instant representing the current instant as defined by the clock.
	         *
	         * @return the current instant from this clock, not null
	         */
	
	    }, {
	        key: 'instant',
	        value: function instant() {
	            throw new TypeError('instant() function is not implemented');
	        }
	
	        /**
	         * in opposite to the jdk implementation the Clock itself returns the offset, that is because
	         * javascript provides only the UTC and the "local" (system default time zone.
	         * it is not possible the get the system default ZoneId without guessing. If we would define ZoneRules, we had to
	         * define something like a virtual, not standard ZoneId like "SystemDefault".
	         * Until we to not have a tzdb, we leave this question open
	         */
	
	    }, {
	        key: 'offset',
	        value: function offset() {
	            throw new TypeError('offset() function is not implemented');
	        }
	    }], [{
	        key: 'systemUTC',
	
	        /**
	         * Obtains a clock that returns the current instant using the
	         * system clock, converting to date and time using the Date.getTime() UTC millis.
	         * <p>
	         * This clock, rather than {@link #systemDefaultZone()}, should be used when
	         * you need the current instant without the date or time.
	         * <p>
	         * @return a clock that uses the system clock in the UTC zone, not null
	         */
	        value: function systemUTC() {
	            return new SystemUTCClock();
	        }
	
	        /**
	         * Obtains a clock that returns the current instant using the best available
	         * system clock, converting to date and time using the default time-zone.
	         * <p>
	         * This clock is based on the available system clock using the Date.getTime() UTC millis
	         * <p>
	         * Using this method hard codes a dependency to the default time-zone into your application.
	         *
	         * The {@link #systemUTC() UTC clock} should be used when you need the current instant
	         * without the date or time.
	         * <p>
	         *
	         * @return a clock that uses the system clock in the default zone, not null
	         * @see ZoneId#systemDefault()
	         */
	
	    }, {
	        key: 'systemDefaultZone',
	        value: function systemDefaultZone() {
	            return new SystemDefaultClock();
	        }
	
	        /**
	         * Obtains a clock that always returns the same instant.
	         * <p>
	         * This clock simply returns the specified instant.
	         * As such, it is not a clock in the conventional sense.
	         * The main use case for this is in testing, where the fixed clock ensures
	         * tests are not dependent on the current clock.
	         *
	         * @param fixedInstant  the instant to use as the clock, not null
	         * @param zoneOffset  the zoneOffset to use as zone Offset, not null
	         * @return a clock that always returns the same instant, not null
	         */
	
	    }, {
	        key: 'fixed',
	        value: function fixed(fixedInstant, zoneOffset) {
	            return new FixedClock(fixedInstant, zoneOffset);
	        }
	    }]);
	
	    return Clock;
	})();
	
	var SystemClock = (function (_Clock) {
	    _inherits(SystemClock, _Clock);
	
	    function SystemClock() {
	        _classCallCheck(this, SystemClock);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(SystemClock).apply(this, arguments));
	    }
	
	    _createClass(SystemClock, [{
	        key: 'millis',
	        value: function millis() {
	            return new Date().getTime();
	        }
	    }, {
	        key: 'instant',
	        value: function instant() {
	            return _Instant.Instant.ofEpochMilli(this.millis());
	        }
	    }, {
	        key: 'offset',
	        value: function offset() {
	            return _ZoneOffset.ZoneOffset.ofTotalSeconds(0);
	        }
	    }]);
	
	    return SystemClock;
	})(Clock);
	
	/**
	 * Implementation of a clock that always returns the latest time from
	 * {@link Date#getTime()}.
	 */
	
	var SystemUTCClock = (function (_SystemClock) {
	    _inherits(SystemUTCClock, _SystemClock);
	
	    function SystemUTCClock() {
	        _classCallCheck(this, SystemUTCClock);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(SystemUTCClock).apply(this, arguments));
	    }
	
	    _createClass(SystemUTCClock, [{
	        key: 'toString',
	        value: function toString() {
	            return 'SystemClock[UTC]';
	        }
	    }]);
	
	    return SystemUTCClock;
	})(SystemClock);
	
	/**
	 * Implementation of a clock that always returns the latest time from
	 * sytem default Zone {@link Date#getTime()} and {@link Date#getTimeZoneOffset()}.
	 */
	
	var SystemDefaultClock = (function (_SystemClock2) {
	    _inherits(SystemDefaultClock, _SystemClock2);
	
	    function SystemDefaultClock() {
	        _classCallCheck(this, SystemDefaultClock);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(SystemDefaultClock).apply(this, arguments));
	    }
	
	    _createClass(SystemDefaultClock, [{
	        key: 'offset',
	        value: function offset(instant) {
	            var offsetInMinutes = new Date().getTimezoneOffset(instant.epochMilli());
	            return _ZoneOffset.ZoneOffset.ofTotalMinutes(offsetInMinutes);
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return 'SystemClock[default]';
	        }
	    }]);
	
	    return SystemDefaultClock;
	})(SystemClock);
	
	/**
	 * Implementation of a clock that always returns the same instant.
	 * This is typically used for testing.
	 */
	
	var FixedClock = (function (_Clock2) {
	    _inherits(FixedClock, _Clock2);
	
	    function FixedClock(fixedInstant, zoneOffset) {
	        _classCallCheck(this, FixedClock);
	
	        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(FixedClock).call(this));
	
	        _this4._instant = fixedInstant;
	        _this4._zoneOffset = zoneOffset;
	        return _this4;
	    }
	
	    _createClass(FixedClock, [{
	        key: 'instant',
	        value: function instant() {
	            return this._instant;
	        }
	    }, {
	        key: 'offset',
	        value: function offset() {
	            return this._zoneOffset;
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return 'FixedClock[]';
	        }
	    }]);
	
	    return FixedClock;
	})(Clock);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Instant = undefined;
	
	var _ChronoField = __webpack_require__(7);
	
	var _ChronoUnit = __webpack_require__(13);
	
	var _Clock = __webpack_require__(11);
	
	var _errors = __webpack_require__(3);
	
	var _LocalTime = __webpack_require__(15);
	
	var _MathUtil = __webpack_require__(5);
	
	var _TemporalAccessor2 = __webpack_require__(16);
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// TODO verify the arbitrary values for min/ max seconds, set to 999_999 Years for now
	var MIN_SECONDS = -31619087596800; // -999999-01-01
	var MAX_SECONDS = 31494784694400; // 999999-12-31
	var NANOS_PER_MILLI = 1000000;
	
	/**
	 * An instantaneous point on the time-line.
	 * 
	 * This class models a single instantaneous point on the time-line.
	 * This might be used to record event time-stamps in the application.
	 * 
	 * Time-scale
	 * 
	 * The length of the solar day is the standard way that humans measure time.
	 * This has traditionally been subdivided into 24 hours of 60 minutes of 60 seconds,
	 * forming a 86400 second day.
	 * 
	 * Modern timekeeping is based on atomic clocks which precisely define an SI second
	 * relative to the transitions of a Caesium atom. The length of an SI second was defined
	 * to be very close to the 86400th fraction of a day.
	 * 
	 * Unfortunately, as the Earth rotates the length of the day varies.
	 * In addition, over time the average length of the day is getting longer as the Earth slows.
	 * As a result, the length of a solar day in 2012 is slightly longer than 86400 SI seconds.
	 * The actual length of any given day and the amount by which the Earth is slowing
	 * are not predictable and can only be determined by measurement.
	 * The UT1 time-scale captures the accurate length of day, but is only available some
	 * time after the day has completed.
	 * 
	 * The UTC time-scale is a standard approach to bundle up all the additional fractions
	 * of a second from UT1 into whole seconds, known as <i>leap-seconds</i>.
	 * A leap-second may be added or removed depending on the Earth's rotational changes.
	 * As such, UTC permits a day to have 86399 SI seconds or 86401 SI seconds where
	 * necessary in order to keep the day aligned with the Sun.
	 * 
	 * The modern UTC time-scale was introduced in 1972, introducing the concept of whole leap-seconds.
	 * Between 1958 and 1972, the definition of UTC was complex, with minor sub-second leaps and
	 * alterations to the length of the notional second. As of 2012, discussions are underway
	 * to change the definition of UTC again, with the potential to remove leap seconds or
	 * introduce other changes.
	 * 
	 * Given the complexity of accurate timekeeping described above, this Java API defines
	 * its own time-scale, the <i>Java Time-Scale</i>.
	 * 
	 * The Java Time-Scale divides each calendar day into exactly 86400
	 * subdivisions, known as seconds.  These seconds may differ from the
	 * SI second.  It closely matches the de facto international civil time
	 * scale, the definition of which changes from time to time.
	 * 
	 * The Java Time-Scale has slightly different definitions for different
	 * segments of the time-line, each based on the consensus international
	 * time scale that is used as the basis for civil time. Whenever the
	 * internationally-agreed time scale is modified or replaced, a new
	 * segment of the Java Time-Scale must be defined for it.  Each segment
	 * must meet these requirements:
	 * <ul>
	 * <li>the Java Time-Scale shall closely match the underlying international
	 *  civil time scale;</li>
	 * <li>the Java Time-Scale shall exactly match the international civil
	 *  time scale at noon each day;</li>
	 * <li>the Java Time-Scale shall have a precisely-defined relationship to
	 *  the international civil time scale.</li>
	 * </ul>
	 * There are currently, as of 2013, two segments in the Java time-scale.
	 * 
	 * For the segment from 1972-11-03 (exact boundary discussed below) until
	 * further notice, the consensus international time scale is UTC (with
	 * leap seconds).  In this segment, the Java Time-Scale is identical to
	 * <a href="http://www.cl.cam.ac.uk/~mgk25/time/utc-sls/">UTC-SLS</a>.
	 * This is identical to UTC on days that do not have a leap second.
	 * On days that do have a leap second, the leap second is spread equally
	 * over the last 1000 seconds of the day, maintaining the appearance of
	 * exactly 86400 seconds per day.
	 * 
	 * For the segment prior to 1972-11-03, extending back arbitrarily far,
	 * the consensus international time scale is defined to be UT1, applied
	 * proleptically, which is equivalent to the (mean) solar time on the
	 * prime meridian (Greenwich). In this segment, the Java Time-Scale is
	 * identical to the consensus international time scale. The exact
	 * boundary between the two segments is the instant where UT1 = UTC
	 * between 1972-11-03T00:00 and 1972-11-04T12:00.
	 * 
	 * Implementations of the Java time-scale using the JSR-310 API are not
	 * required to provide any clock that is sub-second accurate, or that
	 * progresses monotonically or smoothly. Implementations are therefore
	 * not required to actually perform the UTC-SLS slew or to otherwise be
	 * aware of leap seconds. JSR-310 does, however, require that
	 * implementations must document the approach they use when defining a
	 * clock representing the current instant.
	 * See {@link Clock} for details on the available clocks.
	 * 
	 * The Java time-scale is used for all date-time classes.
	 * This includes {@code Instant}, {@code LocalDate}, {@code LocalTime}, {@code OffsetDateTime},
	 * {@code ZonedDateTime} and {@code Duration}.
	 *
	 */
	
	var Instant = exports.Instant = (function (_TemporalAccessor) {
	    _inherits(Instant, _TemporalAccessor);
	
	    function Instant(seconds, nanoOfSecond) {
	        _classCallCheck(this, Instant);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Instant).call(this));
	
	        Instant.validate(seconds, nanoOfSecond);
	        _this._seconds = seconds;
	        _this._nanos = nanoOfSecond;
	        return _this;
	    }
	
	    /**
	     * Gets the number of seconds from the Java epoch of 1970-01-01T00:00:00Z.
	     * 
	     * The epoch second count is a simple incrementing count of seconds where
	     * second 0 is 1970-01-01T00:00:00Z.
	     * The nanosecond part of the day is returned by {@code getNanosOfSecond}.
	     *
	     * @return the seconds from the epoch of 1970-01-01T00:00:00Z
	     */
	
	    _createClass(Instant, [{
	        key: 'epochSecond',
	        value: function epochSecond() {
	            return this._seconds;
	        }
	
	        /**
	         * Gets the number of milli seconds from the Java epoch of 1970-01-01T00:00:00Z.
	         * 
	         * The epoch milli second count is a simple incrementing count of milli seconds where
	         * milli second 0 is 1970-01-01T00:00:00Z.
	         *
	         * @return the milli seconds from the epoch of 1970-01-01T00:00:00Z
	         */
	
	    }, {
	        key: 'epochMilli',
	        value: function epochMilli() {
	            return this._seconds * 1000 + this._nanos / 1000000;
	        }
	
	        /**
	         * Gets the number of nanoseconds, later along the time-line, from the start
	         * of the second.
	         * 
	         * The nanosecond-of-second value measures the total number of nanoseconds from
	         * the second returned by {@code getEpochSecond}.
	         *
	         * @return the nanoseconds within the second, always positive, never exceeds 999,999,999
	         */
	
	    }, {
	        key: 'nano',
	        value: function nano() {
	            return this._nanos;
	        }
	
	        /**
	         * Obtains the current instant from the system clock, or if specified
	         * the current instant from the specified clock.
	         *
	         * This will query the specified clock to obtain the current time.
	         *
	         * @param clock  the clock to use, defaults to the system clock
	         * @return the current instant, not null
	         */
	
	    }, {
	        key: 'plusSeconds',
	
	        /**
	         * Returns a copy of this instant with the specified duration in seconds added.
	         * 
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param secondsToAdd  the seconds to add, positive or negative
	         * @return an {@code Instant} based on this instant with the specified seconds added, not null
	         * @throws DateTimeException if the result exceeds the maximum or minimum instant
	         */
	        value: function plusSeconds(secondsToAdd) {
	            return this._plus(secondsToAdd, 0);
	        }
	
	        /**
	         * Returns a copy of this instant with the specified duration in seconds subtracted.
	         * 
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param secondsToSubtract  the seconds to subtract, positive or negative
	         * @return an {@code Instant} based on this instant with the specified seconds subtracted, not null
	         * @throws DateTimeException if the result exceeds the maximum or minimum instant
	         */
	
	    }, {
	        key: 'minusSeconds',
	        value: function minusSeconds(secondsToSubtract) {
	            return this.plusSeconds(secondsToSubtract * -1);
	        }
	
	        /**
	         * Returns a copy of this instant with the specified duration in nanoseconds added.
	         * 
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param nanosToAdd  the nanoseconds to add, positive or negative
	         * @return an {@code Instant} based on this instant with the specified nanoseconds added, not null
	         * @throws DateTimeException if the result exceeds the maximum or minimum instant
	         */
	
	    }, {
	        key: 'plusNanos',
	        value: function plusNanos(nanosToAdd) {
	            return this._plus(0, nanosToAdd);
	        }
	
	        /**
	         * Returns a copy of this instant with the specified duration added.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param secondsToAdd  the seconds to add, positive or negative
	         * @param nanosToAdd  the nanos to add, positive or negative
	         * @return an {@code Instant} based on this instant with the specified seconds added, not null
	         * @throws DateTimeException if the result exceeds the maximum or minimum instant
	         */
	
	    }, {
	        key: '_plus',
	        value: function _plus(secondsToAdd, nanosToAdd) {
	            if ((secondsToAdd | nanosToAdd) == 0) {
	                return this;
	            }
	            var epochSec = this._seconds + secondsToAdd;
	            epochSec = epochSec + _MathUtil.MathUtil.intDiv(nanosToAdd, _LocalTime.LocalTime.NANOS_PER_SECOND);
	            var _nanosToAdd = nanosToAdd % _LocalTime.LocalTime.NANOS_PER_SECOND;
	            var nanoAdjustment = this._nanos + _nanosToAdd;
	            return Instant.ofEpochSecond(epochSec, nanoAdjustment);
	        }
	
	        /**
	         * Checks if this instant is equal to the specified instant.
	         * <p>
	         * The comparison is based on the time-line position of the instants.
	         *
	         * @param otherInstant  the other instant, null/ undefined returns false
	         * @return true if the other instant is equal to this one
	         */
	
	    }, {
	        key: 'equals',
	        value: function equals(otherInstant) {
	            if (this === otherInstant) {
	                return true;
	            }
	            if (otherInstant instanceof Instant) {
	                return this.epochSecond() === otherInstant.epochSecond() && this.nano() === otherInstant.nano();
	            }
	            return false;
	        }
	
	        /**
	         * Calculates the period between this instant and another instant in
	         * terms of the specified unit.
	         * <p>
	         * This calculates the period between two instants in terms of a single unit.
	         * The start and end points are {@code this} and the specified instant.
	         * The result will be negative if the end is before the start.
	         * The calculation returns a whole number, representing the number of
	         * complete units between the two instants.
	         * The {@code Temporal} passed to this method is converted to a
	         * {@code Instant} using {@link #from(TemporalAccessor)}.
	         * For example, the period in days between two dates can be calculated
	         * using {@code startInstant.until(endInstant, SECONDS)}.
	         * <p>
	         * This method operates in association with {@link TemporalUnit#between}.
	         * The result of this method is a {@code long} representing the amount of
	         * the specified unit. By contrast, the result of {@code between} is an
	         * object that can be used directly in addition/subtraction:
	         * <pre>
	         *   long period = start.until(end, SECONDS);   // this method
	         *   dateTime.plus(SECONDS.between(start, end));      // use in plus/minus
	         * </pre>
	         * <p>
	         * The calculation is implemented in this method for {@link ChronoUnit}.
	         * The units {@code NANOS}, {@code MICROS}, {@code MILLIS}, {@code SECONDS},
	         * {@code MINUTES}, {@code HOURS}, {@code HALF_DAYS} and {@code DAYS}
	         * are supported. Other {@code ChronoUnit} values will throw an exception.
	         * <p>
	         * If the unit is not a {@code ChronoUnit}, then the result of this method
	         * is obtained by invoking {@code TemporalUnit.between(Temporal, Temporal)}
	         * passing {@code this} as the first argument and the input temporal as
	         * the second argument.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Temporal} endExclusive  the end date, which is converted to an {@code Instant}, not null
	         * @param {TemporalUnit} unit  the unit to measure the period in, not null
	         * @return {Number} the amount of the period between this date and the end date
	         * @throws DateTimeException if the period cannot be calculated
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'until',
	        value: function until(endExclusive, unit) {
	            var end = Instant.from(endExclusive);
	            if (unit instanceof _ChronoUnit.ChronoUnit) {
	                switch (unit) {
	                    case _ChronoUnit.ChronoUnit.NANOS:
	                        return this._nanosUntil(end);
	                    case _ChronoUnit.ChronoUnit.MICROS:
	                        return this._nanosUntil(end) / 1000;
	                    case _ChronoUnit.ChronoUnit.MILLIS:
	                        return _MathUtil.MathUtil.safeSubtract(end.toEpochMilli(), this.toEpochMilli());
	                    case _ChronoUnit.ChronoUnit.SECONDS:
	                        return this._secondsUntil(end);
	                    case _ChronoUnit.ChronoUnit.MINUTES:
	                        return _MathUtil.MathUtil.intDiv(this._secondsUntil(end), _LocalTime.LocalTime.SECONDS_PER_MINUTE);
	                    case _ChronoUnit.ChronoUnit.HOURS:
	                        return _MathUtil.MathUtil.intDiv(this._secondsUntil(end), _LocalTime.LocalTime.SECONDS_PER_HOUR);
	                    case _ChronoUnit.ChronoUnit.HALF_DAYS:
	                        return _MathUtil.MathUtil.intDiv(this._secondsUntil(end), 12 * _LocalTime.LocalTime.SECONDS_PER_HOUR);
	                    case _ChronoUnit.ChronoUnit.DAYS:
	                        return _MathUtil.MathUtil.intDiv(this._secondsUntil(end), _LocalTime.LocalTime.SECONDS_PER_DAY);
	                }
	                throw new _errors.UnsupportedTemporalTypeException('Unsupported unit: ' + unit);
	            }
	            return unit.between(this, end);
	        }
	    }, {
	        key: '_nanosUntil',
	        value: function _nanosUntil(end) {
	            var secsDiff = _MathUtil.MathUtil.safeSubtract(end.epochSecond(), this.epochSecond());
	            var totalNanos = _MathUtil.MathUtil.safeMultiply(secsDiff, _LocalTime.LocalTime.NANOS_PER_SECOND);
	            return _MathUtil.MathUtil.safeAdd(totalNanos, end.nano() - this.nano());
	        }
	    }, {
	        key: '_secondsUntil',
	        value: function _secondsUntil(end) {
	            var secsDiff = _MathUtil.MathUtil.safeSubtract(end.epochSecond(), this.epochSecond());
	            var nanosDiff = end.nano() - this.nano();
	            if (secsDiff > 0 && nanosDiff < 0) {
	                secsDiff--;
	            } else if (secsDiff < 0 && nanosDiff > 0) {
	                secsDiff++;
	            }
	            return secsDiff;
	        }
	
	        /**
	         * Gets the value of the specified field from this instant as an {@code int}.
	         * <p>
	         * This queries this instant for the value for the specified field.
	         * The returned value will always be within the valid range of values for the field.
	         * If it is not possible to return the value, because the field is not supported
	         * or for some other reason, an exception is thrown.
	         * <p>
	         * If the field is a {@link ChronoField} then the query is implemented here.
	         * The {@link #isSupported(TemporalField) supported fields} will return valid
	         * values based on this date-time, except {@code INSTANT_SECONDS} which is too
	         * large to fit in an {@code int} and throws a {@code DateTimeException}.
	         * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
	         * <p>
	         * If the field is not a {@code ChronoField}, then the result of this method
	         * is obtained by invoking {@code TemporalField.getFrom(TemporalAccessor)}
	         * passing {@code this} as the argument. Whether the value can be obtained,
	         * and what the value represents, is determined by the field.
	         *
	         * @param {TemporalField} field  the field to get, not null
	         * @return {Number} the value for the field
	         * @throws DateTimeException if a value for the field cannot be obtained
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'get',
	        value: function get(field) {
	            if (field instanceof _ChronoField.ChronoField) {
	                switch (field) {
	                    case _ChronoField.ChronoField.NANO_OF_SECOND:
	                        return this._nanos;
	                    case _ChronoField.ChronoField.MICRO_OF_SECOND:
	                        return _MathUtil.MathUtil.intDiv(this._nanos, 1000);
	                    case _ChronoField.ChronoField.MILLI_OF_SECOND:
	                        return _MathUtil.MathUtil.intDiv(this._nanos, NANOS_PER_MILLI);
	                    case _ChronoField.ChronoField.INSTANT_SECONDS:
	                        _ChronoField.ChronoField.INSTANT_SECONDS.checkValidIntValue(this._seconds);
	                }
	                throw new _errors.UnsupportedTemporalTypeException('Unsupported field: ' + field);
	            }
	            return this.range(field).checkValidIntValue(field.getFrom(this), field);
	        }
	
	        /**
	         * Gets the value of the specified field from this instant as a {@code long}.
	         * <p>
	         * This queries this instant for the value for the specified field.
	         * If it is not possible to return the value, because the field is not supported
	         * or for some other reason, an exception is thrown.
	         * <p>
	         * If the field is a {@link ChronoField} then the query is implemented here.
	         * The {@link #isSupported(TemporalField) supported fields} will return valid
	         * values based on this date-time.
	         * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
	         * <p>
	         * If the field is not a {@code ChronoField}, then the result of this method
	         * is obtained by invoking {@code TemporalField.getFrom(TemporalAccessor)}
	         * passing {@code this} as the argument. Whether the value can be obtained,
	         * and what the value represents, is determined by the field.
	         *
	         * @param {TemporalField} field  the field to get, not null
	         * @return {Number} the value for the field
	         * @throws DateTimeException if a value for the field cannot be obtained
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'getLong',
	        value: function getLong(field) {
	            if (field instanceof _ChronoField.ChronoField) {
	                switch (field) {
	                    case _ChronoField.ChronoField.NANO_OF_SECOND:
	                        return this._nanos;
	                    case _ChronoField.ChronoField.MICRO_OF_SECOND:
	                        return _MathUtil.MathUtil.intDiv(this._nanos, 1000);
	                    case _ChronoField.ChronoField.MILLI_OF_SECOND:
	                        return _MathUtil.MathUtil.intDiv(this._nanos, NANOS_PER_MILLI);
	                    case _ChronoField.ChronoField.INSTANT_SECONDS:
	                        return this._seconds;
	                }
	                throw new _errors.UnsupportedTemporalTypeException('Unsupported field: ' + field);
	            }
	            return field.getFrom(this);
	        }
	
	        /**
	         * Checks if the specified field is supported.
	         * <p>
	         * This checks if this instant can be queried for the specified field.
	         * If false, then calling the {@link #range(TemporalField) range} and
	         * {@link #get(TemporalField) get} methods will throw an exception.
	         * <p>
	         * If the field is a {@link ChronoField} then the query is implemented here.
	         * The supported fields are:
	         * <ul>
	         * <li>{@code NANO_OF_SECOND}
	         * <li>{@code MICRO_OF_SECOND}
	         * <li>{@code MILLI_OF_SECOND}
	         * <li>{@code INSTANT_SECONDS}
	         * </ul>
	         * All other {@code ChronoField} instances will return false.
	         * <p>
	         * If the field is not a {@code ChronoField}, then the result of this method
	         * is obtained by invoking {@code TemporalField.isSupportedBy(TemporalAccessor)}
	         * passing {@code this} as the argument.
	         * Whether the field is supported is determined by the field.
	         *
	         * @param {TemporalField, TemporalUnit} fieldOrUnit  the field to check, null returns false
	         * @return true if the field is supported on this instant, false if not
	         */
	
	    }, {
	        key: 'isSupported',
	        value: function isSupported(fieldOrUnit) {
	            if (fieldOrUnit instanceof _ChronoField.ChronoField) {
	                return fieldOrUnit === _ChronoField.ChronoField.INSTANT_SECONDS || fieldOrUnit === _ChronoField.ChronoField.NANO_OF_SECOND || fieldOrUnit === _ChronoField.ChronoField.MICRO_OF_SECOND || fieldOrUnit === _ChronoField.ChronoField.MILLI_OF_SECOND;
	            }
	            if (fieldOrUnit instanceof _ChronoUnit.ChronoUnit) {
	                return fieldOrUnit.isTimeBased() || fieldOrUnit === _ChronoUnit.ChronoUnit.DAYS;
	            }
	            return fieldOrUnit != null && fieldOrUnit.isSupportedBy(this);
	        }
	
	        /**
	         * Obtains an instance of {@code Instant} from a temporal object.
	         * <p>
	         * A {@code TemporalAccessor} represents some form of date and time information.
	         * This factory converts the arbitrary temporal object to an instance of {@code Instant}.
	         * <p>
	         * The conversion extracts the {@link ChronoField#INSTANT_SECONDS INSTANT_SECONDS}
	         * and {@link ChronoField#NANO_OF_SECOND NANO_OF_SECOND} fields.
	         * <p>
	         * This method matches the signature of the functional interface {@link TemporalQuery}
	         * allowing it to be used as a query via method reference, {@code Instant::from}.
	         *
	         * @param {TemporalAccessor} temporal  the temporal object to convert, not null
	         * @return {Instant} the instant, not null
	         * @throws DateTimeException if unable to convert to an {@code Instant}
	         */
	
	    }], [{
	        key: 'now',
	        value: function now() {
	            var clock = arguments.length <= 0 || arguments[0] === undefined ? _Clock.Clock.systemUTC() : arguments[0];
	
	            return clock.instant();
	        }
	    }, {
	        key: 'from',
	        value: function from(temporal) {
	            try {
	                var instantSecs = temporal.getLong(_ChronoField.ChronoField.INSTANT_SECONDS);
	                var nanoOfSecond = temporal.get(_ChronoField.ChronoField.NANO_OF_SECOND);
	                return Instant.ofEpochSecond(instantSecs, nanoOfSecond);
	            } catch (ex) {
	                throw new _errors.DateTimeException('Unable to obtain Instant from TemporalAccessor: ' + temporal + ', type ' + (typeof temporal === 'undefined' ? 'undefined' : _typeof(temporal)), ex);
	            }
	        }
	
	        /**
	         * Obtains an instance of {@code Instant} using seconds from the
	         * epoch of 1970-01-01T00:00:00Z.
	         *
	         * @param epochSecond  the number of seconds from 1970-01-01T00:00:00Z
	         * @param nanoAdjustment nanoseconds start from the start of epochSecond, if null the nanosecond field is set to zero.
	         * @return an instant, not null
	         * @throws DateTimeException if the instant exceeds the maximum or minimum instant
	         */
	
	    }, {
	        key: 'ofEpochSecond',
	        value: function ofEpochSecond(epochSecond) {
	            var nanoAdjustment = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	            var secs = epochSecond + _MathUtil.MathUtil.floorDiv(nanoAdjustment, _LocalTime.LocalTime.NANOS_PER_SECOND);
	            var nos = _MathUtil.MathUtil.floorMod(nanoAdjustment, _LocalTime.LocalTime.NANOS_PER_SECOND);
	            return Instant._create(secs, nos);
	        }
	
	        /**
	         * Obtains an instance of {@code Instant} using milliseconds from the
	         * epoch of 1970-01-01T00:00:00Z.
	         * <p>
	         * The seconds and nanoseconds are extracted from the specified milliseconds.
	         *
	         * @param epochMilli  the number of milliseconds from 1970-01-01T00:00:00Z
	         * @return an instant, not null
	         * @throws DateTimeException if the instant exceeds the maximum or minimum instant
	         */
	
	    }, {
	        key: 'ofEpochMilli',
	        value: function ofEpochMilli(epochMilli) {
	            var secs = _MathUtil.MathUtil.floorDiv(epochMilli, 1000);
	            var mos = _MathUtil.MathUtil.floorMod(epochMilli, 1000);
	            return Instant._create(secs, mos * 1000000);
	        }
	    }, {
	        key: '_create',
	        value: function _create(seconds, nanoOfSecond) {
	            if (seconds === 0 && nanoOfSecond === 0) {
	                return Instant.EPOCH;
	            }
	            return new Instant(seconds, nanoOfSecond);
	        }
	    }, {
	        key: 'validate',
	        value: function validate(seconds, nanoOfSecond) {
	            if (seconds < MIN_SECONDS || seconds > MAX_SECONDS) {
	                throw new _errors.DateTimeException('Instant exceeds minimum or maximum instant');
	            }
	        }
	    }]);
	
	    return Instant;
	})(_TemporalAccessor2.TemporalAccessor);
	
	Instant.EPOCH = new Instant(0, 0);
	Instant.MIN = Instant.ofEpochSecond(MIN_SECONDS, 0);
	Instant.MAX = Instant.ofEpochSecond(MAX_SECONDS, 999999999);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ChronoUnit = undefined;
	
	var _Duration = __webpack_require__(14);
	
	var _Year = __webpack_require__(10);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * A standard set of date periods units.
	 * <p>
	 * This set of units provide unit-based access to manipulate a date, time or date-time.
	 * The standard set of units can be extended by implementing {@link TemporalUnit}.
	 * <p>
	 * These units are intended to be applicable in multiple calendar systems.
	 * For example, most non-ISO calendar systems define units of years, months and days,
	 * just with slightly different rules.
	 * The documentation of each unit explains how it operates.
	 *
	 */
	
	var ChronoUnit /*implements TemporalUnit*/ = exports.ChronoUnit = (function () {
	
	  /**
	   * 
	   * @param {String} name
	   * @param {Duration} estimatedDuration
	   */
	
	  function ChronoUnit(name, estimatedDuration) {
	    _classCallCheck(this, ChronoUnit);
	
	    this._name = name;
	    this._duration = estimatedDuration;
	  }
	
	  //-----------------------------------------------------------------------
	  /**
	   * Gets the estimated duration of this unit in the ISO calendar system.
	   * <p>
	   * All of the units in this class have an estimated duration.
	   * Days vary due to daylight saving time, while months have different lengths.
	   *
	   * @return {Duration} the estimated duration of this unit, not null
	   */
	
	  _createClass(ChronoUnit, [{
	    key: 'duration',
	    value: function duration() {
	      return this._duration;
	    }
	
	    /**
	     * Checks if the duration of the unit is an estimate.
	     * <p>
	     * All time units in this class are considered to be accurate, while all date
	     * units in this class are considered to be estimated.
	     * <p>
	     * This definition ignores leap seconds, but considers that Days vary due to
	     * daylight saving time and months have different lengths.
	     *
	     * @return {boolean} true if the duration is estimated, false if accurate
	     */
	
	  }, {
	    key: 'isDurationEstimated',
	    value: function isDurationEstimated() {
	      return this.isDateBased() || this === ChronoUnit.FOREVER;
	    }
	
	    //-----------------------------------------------------------------------
	    /**
	     * Checks if this unit is a date unit.
	     *
	     * @return true if a date unit, false if a time unit
	     */
	
	  }, {
	    key: 'isDateBased',
	    value: function isDateBased() {
	      return this.compareTo(ChronoUnit.DAYS) >= 0 && this !== ChronoUnit.FOREVER;
	    }
	
	    /**
	     * Checks if this unit is a time unit.
	     *
	     * @return true if a time unit, false if a date unit
	     */
	
	  }, {
	    key: 'isTimeBased',
	    value: function isTimeBased() {
	      return this.compareTo(ChronoUnit.DAYS) < 0;
	    }
	
	    //-----------------------------------------------------------------------
	    /**
	     * Checks if this unit is supported by the specified temporal object.
	     * <p>
	     * This checks that the implementing date-time can add/subtract this unit.
	     * This can be used to avoid throwing an exception.
	     * <p>
	     * This default implementation derives the value using
	     * {@link Temporal#plus(long, TemporalUnit)}.
	     *
	     * @param {Temporal} temporal  the temporal object to check, not null
	     * @return {boolean} true if the unit is supported
	     */
	
	  }, {
	    key: 'isSupportedBy',
	    value: function isSupportedBy(temporal) {
	      if (this === ChronoUnit.FOREVER) {
	        return false;
	      }
	      /* TODO: classes not implemented yet */
	      /*
	              if (temporal instanceof ChronoLocalDate) {
	                  return isDateBased();
	              }
	              if (temporal instanceof ChronoLocalDateTime || temporal instanceof ChronoZonedDateTime) {
	                  return true;
	              }
	      */
	      try {
	        temporal.plus(1, this);
	        return true;
	      } catch (e) {
	        try {
	          temporal.plus(-1, this);
	          return true;
	        } catch (e2) {
	          return false;
	        }
	      }
	    }
	
	    /**
	     * Returns a copy of the specified temporal object with the specified period added.
	     * <p>
	     * The period added is a multiple of this unit. For example, this method
	     * could be used to add "3 days" to a date by calling this method on the
	     * instance representing "days", passing the date and the period "3".
	     * The period to be added may be negative, which is equivalent to subtraction.
	     * <p>
	     * There are two equivalent ways of using this method.
	     * The first is to invoke this method directly.
	     * The second is to use {@link Temporal#plus(long, TemporalUnit)}:
	     * <pre>
	     *   // these two lines are equivalent, but the second approach is recommended
	     *   temporal = thisUnit.addTo(temporal);
	     *   temporal = temporal.plus(thisUnit);
	     * </pre>
	     * It is recommended to use the second approach, {@code plus(TemporalUnit)},
	     * as it is a lot clearer to read in code.
	     * <p>
	     * Implementations should perform any queries or calculations using the units
	     * available in {@link ChronoUnit} or the fields available in {@link ChronoField}.
	     * If the unit is not supported an {@code UnsupportedTemporalTypeException} must be thrown.
	     * <p>
	     * Implementations must not alter the specified temporal object.
	     * Instead, an adjusted copy of the original must be returned.
	     * This provides equivalent, safe behavior for immutable and mutable implementations.
	     *
	     * @param {Temporal} temporal  the temporal object to adjust, not null
	     * @param {Number} amount  the amount of this unit to add, positive or negative
	     * @return {Temporal} the adjusted temporal object, not null
	     * @throws DateTimeException if the amount cannot be added
	     * @throws UnsupportedTemporalTypeException if the unit is not supported by the temporal
	     */
	
	  }, {
	    key: 'addTo',
	    value: function addTo(temporal, amount) {
	      return temporal.plus(amount, this);
	    }
	
	    //-----------------------------------------------------------------------
	    /**
	     * Calculates the amount of time between two temporal objects.
	     * <p>
	     * This calculates the amount in terms of this unit. The start and end
	     * points are supplied as temporal objects and must be of compatible types.
	     * The implementation will convert the second type to be an instance of the
	     * first type before the calculating the amount.
	     * The result will be negative if the end is before the start.
	     * For example, the amount in hours between two temporal objects can be
	     * calculated using {@code HOURS.between(startTime, endTime)}.
	     * <p>
	     * The calculation returns a whole number, representing the number of
	     * complete units between the two temporals.
	     * For example, the amount in hours between the times 11:30 and 13:29
	     * will only be one hour as it is one minute short of two hours.
	     * <p>
	     * There are two equivalent ways of using this method.
	     * The first is to invoke this method directly.
	     * The second is to use {@link Temporal#until(Temporal, TemporalUnit)}:
	     * <pre>
	     *   // these two lines are equivalent
	     *   between = thisUnit.between(start, end);
	     *   between = start.until(end, thisUnit);
	     * </pre>
	     * The choice should be made based on which makes the code more readable.
	     * <p>
	     * For example, this method allows the number of days between two dates to
	     * be calculated:
	     * <pre>
	     *  daysBetween = DAYS.between(start, end);
	     *  // or alternatively
	     *  daysBetween = start.until(end, DAYS);
	     * </pre>
	     * <p>
	     * Implementations should perform any queries or calculations using the units
	     * available in {@link ChronoUnit} or the fields available in {@link ChronoField}.
	     * If the unit is not supported an {@code UnsupportedTemporalTypeException} must be thrown.
	     * Implementations must not alter the specified temporal objects.
	     *
	     * @implSpec
	     * Implementations must begin by checking to if the two temporals have the
	     * same type using {@code .constructor.name}. If they do not, then the result must be
	     * obtained by calling {@code temporal1.until(temporal2, this)}.
	     *
	     * @param {Temporal} temporal1  the base temporal object, not null
	     * @param {Temporal} temporal2  the other temporal object, exclusive, not null
	     * @return {Number} the amount of time between temporal1 and temporal2
	     *  in terms of this unit; positive if temporal2 is later than
	     *  temporal1, negative if earlier
	     * @throws DateTimeException if the amount cannot be calculated, or the end
	     *  temporal cannot be converted to the same type as the start temporal
	     * @throws UnsupportedTemporalTypeException if the unit is not supported by the temporal
	     * @throws ArithmeticException if numeric overflow occurs
	     */
	
	  }, {
	    key: 'between',
	    value: function between(temporal1, temporal2) {
	      return temporal1.until(temporal2, this);
	    }
	
	    //-----------------------------------------------------------------------
	
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return this._name;
	    }
	
	    /**
	     * Compares this ChronoUnit to the specified {TemporalUnit}.
	     * <p>
	     * The comparison is based on the total length of the durations.
	     *
	     * @param {TemporalUnit} other  the other unit to compare to, not null
	     * @return the comparator value, negative if less, positive if greater
	     */
	
	  }, {
	    key: 'compareTo',
	    value: function compareTo(other) {
	      return this.duration().compareTo(other.duration());
	    }
	  }]);
	
	  return ChronoUnit;
	})();
	/**
	 * Unit that represents the concept of a nanosecond, the smallest supported unit of time.
	 * For the ISO calendar system, it is equal to the 1,000,000,000th part of the second unit.
	 */
	
	ChronoUnit.NANOS = new ChronoUnit('Nanos', _Duration.Duration.ofNanos(1));
	/**
	 * Unit that represents the concept of a microsecond.
	 * For the ISO calendar system, it is equal to the 1,000,000th part of the second unit.
	 */
	ChronoUnit.MICROS = new ChronoUnit('Micros', _Duration.Duration.ofNanos(1000));
	/**
	 * Unit that represents the concept of a millisecond.
	 * For the ISO calendar system, it is equal to the 1000th part of the second unit.
	 */
	ChronoUnit.MILLIS = new ChronoUnit('Millis', _Duration.Duration.ofNanos(1000000));
	/**
	 * Unit that represents the concept of a second.
	 * For the ISO calendar system, it is equal to the second in the SI system
	 * of units, except around a leap-second.
	 */
	ChronoUnit.SECONDS = new ChronoUnit('Seconds', _Duration.Duration.ofSeconds(1));
	/**
	 * Unit that represents the concept of a minute.
	 * For the ISO calendar system, it is equal to 60 seconds.
	 */
	ChronoUnit.MINUTES = new ChronoUnit('Minutes', _Duration.Duration.ofSeconds(60));
	/**
	 * Unit that represents the concept of an hour.
	 * For the ISO calendar system, it is equal to 60 minutes.
	 */
	ChronoUnit.HOURS = new ChronoUnit('Hours', _Duration.Duration.ofSeconds(3600));
	/**
	 * Unit that represents the concept of half a day, as used in AM/PM.
	 * For the ISO calendar system, it is equal to 12 hours.
	 */
	ChronoUnit.HALF_DAYS = new ChronoUnit('HalfDays', _Duration.Duration.ofSeconds(43200));
	/**
	 * Unit that represents the concept of a day.
	 * For the ISO calendar system, it is the standard day from midnight to midnight.
	 * The estimated duration of a day is {@code 24 Hours}.
	 * <p>
	 * When used with other calendar systems it must correspond to the day defined by
	 * the rising and setting of the Sun on Earth. It is not required that days begin
	 * at midnight - when converting between calendar systems, the date should be
	 * equivalent at midday.
	 */
	ChronoUnit.DAYS = new ChronoUnit('Days', _Duration.Duration.ofSeconds(86400));
	/**
	 * Unit that represents the concept of a week.
	 * For the ISO calendar system, it is equal to 7 days.
	 * <p>
	 * When used with other calendar systems it must correspond to an integral number of days.
	 */
	ChronoUnit.WEEKS = new ChronoUnit('Weeks', _Duration.Duration.ofSeconds(7 * 86400));
	/**
	 * Unit that represents the concept of a month.
	 * For the ISO calendar system, the length of the month varies by month-of-year.
	 * The estimated duration of a month is one twelfth of {@code 365.2425 Days}.
	 * <p>
	 * When used with other calendar systems it must correspond to an integral number of days.
	 */
	ChronoUnit.MONTHS = new ChronoUnit('Months', _Duration.Duration.ofSeconds(31556952 / 12));
	/**
	 * Unit that represents the concept of a year.
	 * For the ISO calendar system, it is equal to 12 months.
	 * The estimated duration of a year is {@code 365.2425 Days}.
	 * <p>
	 * When used with other calendar systems it must correspond to an integral number of days
	 * or months roughly equal to a year defined by the passage of the Earth around the Sun.
	 */
	ChronoUnit.YEARS = new ChronoUnit('Years', _Duration.Duration.ofSeconds(31556952));
	/**
	 * Unit that represents the concept of a decade.
	 * For the ISO calendar system, it is equal to 10 years.
	 * <p>
	 * When used with other calendar systems it must correspond to an integral number of days
	 * and is normally an integral number of years.
	 */
	ChronoUnit.DECADES = new ChronoUnit('Decades', _Duration.Duration.ofSeconds(31556952 * 10));
	/**
	 * Unit that represents the concept of a century.
	 * For the ISO calendar system, it is equal to 100 years.
	 * <p>
	 * When used with other calendar systems it must correspond to an integral number of days
	 * and is normally an integral number of years.
	 */
	ChronoUnit.CENTURIES = new ChronoUnit('Centuries', _Duration.Duration.ofSeconds(31556952 * 100));
	/**
	 * Unit that represents the concept of a millennium.
	 * For the ISO calendar system, it is equal to 1000 years.
	 * <p>
	 * When used with other calendar systems it must correspond to an integral number of days
	 * and is normally an integral number of years.
	 */
	ChronoUnit.MILLENNIA = new ChronoUnit('Millennia', _Duration.Duration.ofSeconds(31556952 * 1000));
	/**
	 * Unit that represents the concept of an era.
	 * The ISO calendar system doesn't have eras thus it is impossible to add
	 * an era to a date or date-time.
	 * The estimated duration of the era is artificially defined as {Year.MAX_VALUE} + 1.
	 * <p>
	 * When used with other calendar systems there are no restrictions on the unit.
	 */
	ChronoUnit.ERAS = new ChronoUnit('Eras', _Duration.Duration.ofSeconds(31556952 * (_Year.Year.MAX_VALUE + 1)));
	/**
	 * Artificial unit that represents the concept of forever.
	 * This is primarily used with {@link TemporalField} to represent unbounded fields
	 * such as the year or era.
	 * The estimated duration of the era is artificially defined as the largest duration
	 * supported by {@code Duration}.
	 */
	ChronoUnit.FOREVER = new ChronoUnit('Forever', _Duration.Duration.ofSeconds(Number.MAX_SAFE_INTEGER, 999999999));

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Duration = undefined;
	
	var _assert = __webpack_require__(2);
	
	var _ChronoField = __webpack_require__(7);
	
	var _ChronoUnit = __webpack_require__(13);
	
	var _errors = __webpack_require__(3);
	
	var _LocalTime = __webpack_require__(15);
	
	var _MathUtil = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * A time-based amount of time, such as '34.5 seconds'.
	 * <p>
	 * This class models a quantity or amount of time in terms of seconds and nanoseconds.
	 * It can be accessed using other duration-based units, such as minutes and hours.
	 * In addition, the {@link ChronoUnit#DAYS DAYS} unit can be used and is treated as
	 * exactly equal to 24 hours, thus ignoring daylight savings effects.
	 * See {@link Period} for the date-based equivalent to this class.
	 * <p>
	 * A physical duration could be of infinite length.
	 * For practicality, the duration is stored with constraints similar to {@link Instant}.
	 * The duration uses nanosecond resolution with a maximum value of the seconds that can
	 * be held in a {@code long}. This is greater than the current estimated age of the universe.
	 * <p>
	 * The range of a duration requires the storage of a number larger than a {@code long}.
	 * To achieve this, the class stores a {@code long} representing seconds and an {@code int}
	 * representing nanosecond-of-second, which will always be between 0 and 999,999,999.
	 * <p>
	 * The duration is measured in "seconds", but these are not necessarily identical to
	 * the scientific "SI second" definition based on atomic clocks.
	 * This difference only impacts durations measured near a leap-second and should not affect
	 * most applications.
	 * See {@link Instant} for a discussion as to the meaning of the second and time-scales.
	 *
	 */
	
	var Duration
	/*implements TemporalAmount, Comparable<Duration>, Serializable */ = exports.Duration = (function () {
	
	    /**
	     * Constructs an instance of {@code Duration} using seconds and nanoseconds.
	     *
	     * @param {Number} seconds  the length of the duration in seconds, positive or negative
	     * @param {Number} nanos  the nanoseconds within the second, from 0 to 999,999,999
	     */
	    //TODO: private ?
	
	    function Duration(seconds, nanos) {
	        _classCallCheck(this, Duration);
	
	        //super();
	        this._seconds = seconds;
	        this._nanos = nanos;
	    }
	
	    //-----------------------------------------------------------------------
	    /**
	     * Obtains an instance of {@code Duration} from a number of standard 24 hour days.
	     * <p>
	     * The seconds are calculated based on the standard definition of a day,
	     * where each day is 86400 seconds which implies a 24 hour day.
	     * The nanosecond in second field is set to zero.
	     *
	     * @param {Number} days  the number of days, positive or negative
	     * @return {@code Duration}, not null
	     * @throws ArithmeticException if the input days exceeds the capacity of {@code Duration}
	     */
	
	    _createClass(Duration, [{
	        key: 'get',
	
	        //-----------------------------------------------------------------------
	        /**
	         * Gets the value of the requested unit.
	         * <p>
	         * This returns a value for each of the two supported units,
	         * {@link ChronoUnit#SECONDS SECONDS} and {@link ChronoUnit#NANOS NANOS}.
	         * All other units throw an exception.
	         *
	         * @param {TemporalUnit} unit the {@code TemporalUnit} for which to return the value
	         * @return {Number} the var value of the unit
	         * @throws DateTimeException if the unit is not supported
	         * @throws UnsupportedTemporalTypeException if the unit is not supported
	         */
	        value: function get(unit) {
	            if (unit === _ChronoUnit.ChronoUnit.SECONDS) {
	                return this._seconds;
	            } else if (unit === _ChronoUnit.ChronoUnit.NANOS) {
	                return this._nanos;
	            } else {
	                throw new _errors.UnsupportedTemporalTypeException('Unsupported unit: ' + unit);
	            }
	        }
	    }, {
	        key: 'units',
	        value: function units() {
	            return [_ChronoUnit.ChronoUnit.SECONDS, _ChronoUnit.ChronoUnit.NANOS];
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Checks if this duration is zero length.
	         * <p>
	         * A {@code Duration} represents a directed distance between two points on
	         * the time-line and can therefore be positive, zero or negative.
	         * This method checks whether the length is zero.
	         *
	         * @return {boolean} true if this duration has a total length equal to zero
	         */
	
	    }, {
	        key: 'isZero',
	        value: function isZero() {
	            return (this._seconds | this._nanos) == 0;
	        }
	
	        /**
	         * Checks if this duration is negative, excluding zero.
	         * <p>
	         * A {@code Duration} represents a directed distance between two points on
	         * the time-line and can therefore be positive, zero or negative.
	         * This method checks whether the length is less than zero.
	         *
	         * @return {boolean} true if this duration has a total length less than zero
	         */
	
	    }, {
	        key: 'isNegative',
	        value: function isNegative() {
	            return this._seconds < 0;
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Gets the number of seconds in this duration.
	         * <p>
	         * The length of the duration is stored using two fields - seconds and nanoseconds.
	         * The nanoseconds part is a value from 0 to 999,999,999 that is an adjustment to
	         * the length in seconds.
	         * The total duration is defined by calling this method and {@link #getNano()}.
	         * <p>
	         * A {@code Duration} represents a directed distance between two points on the time-line.
	         * A negative duration is expressed by the negative sign of the seconds part.
	         * A duration of -1 nanosecond is stored as -1 seconds plus 999,999,999 nanoseconds.
	         *
	         * @return {Number} the whole seconds part of the length of the duration, positive or negative
	         */
	
	    }, {
	        key: 'seconds',
	        value: function seconds() {
	            return this._seconds;
	        }
	
	        /**
	         * Gets the number of nanoseconds within the second in this duration.
	         * <p>
	         * The length of the duration is stored using two fields - seconds and nanoseconds.
	         * The nanoseconds part is a value from 0 to 999,999,999 that is an adjustment to
	         * the length in seconds.
	         * The total duration is defined by calling this method and {@link #getSeconds()}.
	         * <p>
	         * A {@code Duration} represents a directed distance between two points on the time-line.
	         * A negative duration is expressed by the negative sign of the seconds part.
	         * A duration of -1 nanosecond is stored as -1 seconds plus 999,999,999 nanoseconds.
	         *
	         * @return {Number} the nanoseconds within the second part of the length of the duration, from 0 to 999,999,999
	         */
	
	    }, {
	        key: 'nano',
	        value: function nano() {
	            return this._nanos;
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Returns a copy of this duration with the specified amount of seconds.
	         * <p>
	         * This returns a duration with the specified seconds, retaining the
	         * nano-of-second part of this duration.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Number} seconds  the seconds to represent, may be negative
	         * @return {@code Duration} based on this period with the requested seconds, not null
	         */
	
	    }, {
	        key: 'withSeconds',
	        value: function withSeconds(seconds) {
	            return Duration.create(seconds, this._nanos);
	        }
	
	        /**
	         * Returns a copy of this duration with the specified nano-of-second.
	         * <p>
	         * This returns a duration with the specified nano-of-second, retaining the
	         * seconds part of this duration.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Number} nanoOfSecond  the nano-of-second to represent, from 0 to 999,999,999
	         * @return {@code Duration} based on this period with the requested nano-of-second, not null
	         * @throws DateTimeException if the nano-of-second is invalid
	         */
	
	    }, {
	        key: 'withNanos',
	        value: function withNanos(nanoOfSecond) {
	            _ChronoField.ChronoField.NANO_OF_SECOND.checkValidIntValue(nanoOfSecond);
	            return Duration.create(this._seconds, nanoOfSecond);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Returns a copy of this duration with the specified duration added.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Duration} duration  the duration to add, positive or negative, not null
	         * @return {@code Duration} based on this duration with the specified duration added, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'plusDuration',
	        value: function plusDuration(duration) {
	            return this.plus(duration.seconds(), duration.nano());
	        }
	
	        /**
	         * to handle function overriding this function accepts two arguments, checks their type and delegates to the appropriate function
	         * 
	         * @param a
	         * @param b
	         */
	
	    }, {
	        key: 'plus',
	        value: function plus(a, b) {
	            if (a instanceof Duration) {
	                (0, _assert.requireNonNull)(a, 'duration');
	                return this.plusDuration(a);
	            }
	            if (b instanceof _ChronoUnit.ChronoUnit) {
	                (0, _assert.requireNonNull)(a, 'amount');
	                (0, _assert.requireNonNull)(b, 'unit');
	                return this.plusAmountUnit(a, b);
	            }
	            (0, _assert.requireNonNull)(a, 'seconds');
	            (0, _assert.requireNonNull)(b, 'nanos');
	            return this.plusSecondsNanos(a, b);
	        }
	
	        /**
	         * Returns a copy of this duration with the specified duration added.
	         * <p>
	         * The duration amount is measured in terms of the specified unit.
	         * Only a subset of units are accepted by this method.
	         * The unit must either have an {@link TemporalUnit#isDurationEstimated() exact duration} or
	         * be {@link ChronoUnit#DAYS} which is treated as 24 hours. Other units throw an exception.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Number} amountToAdd  the amount to add, measured in terms of the unit, positive or negative
	         * @param {TemporalUnit} unit  the unit that the amount is measured in, must have an exact duration, not null
	         * @return {@code Duration} based on this duration with the specified duration added, not null
	         * @throws UnsupportedTemporalTypeException if the unit is not supported
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'plusAmountUnit',
	        value: function plusAmountUnit(amountToAdd, unit) {
	            (0, _assert.requireNonNull)(unit, 'unit');
	            if (unit == _ChronoUnit.ChronoUnit.DAYS) {
	                return this.plusSecondsNanos(_MathUtil.MathUtil.safeMultiply(amountToAdd, _LocalTime.LocalTime.SECONDS_PER_DAY), 0);
	            }
	            if (unit.isDurationEstimated()) {
	                throw new _errors.UnsupportedTemporalTypeException('Unit must not have an estimated duration');
	            }
	            if (amountToAdd == 0) {
	                return this;
	            }
	            if (unit instanceof _ChronoUnit.ChronoUnit) {
	                switch (unit) {
	                    case _ChronoUnit.ChronoUnit.NANOS:
	                        return this.plusNanos(amountToAdd);
	                    case _ChronoUnit.ChronoUnit.MICROS:
	                        return this.plusSecondsNanos(_MathUtil.MathUtil.intDiv(amountToAdd, 1000000 * 1000) * 1000, _MathUtil.MathUtil.intMod(amountToAdd, 1000000 * 1000) * 1000);
	                    case _ChronoUnit.ChronoUnit.MILLIS:
	                        return this.plusMillis(amountToAdd);
	                    case _ChronoUnit.ChronoUnit.SECONDS:
	                        return this.plusSeconds(amountToAdd);
	                }
	                return this.plusSecondsNanos(_MathUtil.MathUtil.safeMultiply(unit.duration().seconds(), amountToAdd), 0);
	            }
	            var duration = unit.duration().multipliedBy(amountToAdd);
	            return this.plusSecondsNanos(duration.seconds(), duration.nano());
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Returns a copy of this duration with the specified duration in 24 hour days added.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Number} daysToAdd  the days to add, positive or negative
	         * @return {@code Duration} based on this duration with the specified days added, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'plusDays',
	        value: function plusDays(daysToAdd) {
	            return this.plusSecondsNanos(_MathUtil.MathUtil.safeMultiply(daysToAdd, _LocalTime.LocalTime.SECONDS_PER_DAY), 0);
	        }
	
	        /**
	         * Returns a copy of this duration with the specified duration in hours added.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Number} hoursToAdd  the hours to add, positive or negative
	         * @return {@code Duration} based on this duration with the specified hours added, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'plusHours',
	        value: function plusHours(hoursToAdd) {
	            return this.plusSecondsNanos(_MathUtil.MathUtil.safeMultiply(hoursToAdd, _LocalTime.LocalTime.SECONDS_PER_HOUR), 0);
	        }
	
	        /**
	         * Returns a copy of this duration with the specified duration in minutes added.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Number} minutesToAdd  the minutes to add, positive or negative
	         * @return {@code Duration} based on this duration with the specified minutes added, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'plusMinutes',
	        value: function plusMinutes(minutesToAdd) {
	            return this.plusSecondsNanos(_MathUtil.MathUtil.safeMultiply(minutesToAdd, _LocalTime.LocalTime.SECONDS_PER_MINUTE), 0);
	        }
	
	        /**
	         * Returns a copy of this duration with the specified duration in seconds added.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Number} secondsToAdd  the seconds to add, positive or negative
	         * @return {@code Duration} based on this duration with the specified seconds added, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'plusSeconds',
	        value: function plusSeconds(secondsToAdd) {
	            return this.plusSecondsNanos(secondsToAdd, 0);
	        }
	
	        /**
	         * Returns a copy of this duration with the specified duration in milliseconds added.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Number} millisToAdd  the milliseconds to add, positive or negative
	         * @return {@code Duration} based on this duration with the specified milliseconds added, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'plusMillis',
	        value: function plusMillis(millisToAdd) {
	            return this.plusSecondsNanos(_MathUtil.MathUtil.intDiv(millisToAdd, 1000), _MathUtil.MathUtil.intMod(millisToAdd, 1000) * 1000000);
	        }
	
	        /**
	         * Returns a copy of this duration with the specified duration in nanoseconds added.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Number} nanosToAdd  the nanoseconds to add, positive or negative
	         * @return {@code Duration} based on this duration with the specified nanoseconds added, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'plusNanos',
	        value: function plusNanos(nanosToAdd) {
	            return this.plusSecondsNanos(0, nanosToAdd);
	        }
	
	        /**
	         * Returns a copy of this duration with the specified duration added.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Number} secondsToAdd  the seconds to add, positive or negative
	         * @param {Number} nanosToAdd  the nanos to add, positive or negative
	         * @return {@code Duration} based on this duration with the specified seconds added, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'plusSecondsNanos',
	        value: function plusSecondsNanos(secondsToAdd, nanosToAdd) {
	            if ((secondsToAdd | nanosToAdd) == 0) {
	                return this;
	            }
	            var epochSec = _MathUtil.MathUtil.safeAdd(this._seconds, secondsToAdd);
	            epochSec = _MathUtil.MathUtil.safeAdd(epochSec, _MathUtil.MathUtil.intDiv(nanosToAdd, _LocalTime.LocalTime.NANOS_PER_SECOND));
	            nanosToAdd = _MathUtil.MathUtil.intMod(nanosToAdd, _LocalTime.LocalTime.NANOS_PER_SECOND);
	            var nanoAdjustment = _MathUtil.MathUtil.safeAdd(this._nanos, nanosToAdd); // safe int+LocalTime.NANOS_PER_SECOND
	            return Duration.ofSeconds(epochSec, nanoAdjustment);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * to handle function overriding this function accepts two arguments, checks their type and delegates to the appropriate function
	         *
	         * @param a
	         * @param b
	         */
	
	    }, {
	        key: 'minus',
	        value: function minus(a, b) {
	            if (a instanceof Duration) {
	                (0, _assert.requireNonNull)(a, 'duration');
	                return this.minusDuration(a);
	            }
	            if (b instanceof _ChronoUnit.ChronoUnit) {
	                (0, _assert.requireNonNull)(a, 'amount');
	                (0, _assert.requireNonNull)(b, 'unit');
	                return this.minusAmountUnit(a, b);
	            }
	            (0, _assert.requireNonNull)(a, 'seconds');
	            (0, _assert.requireNonNull)(b, 'nanos');
	            return this.minusSecondsNanos(a, b);
	        }
	
	        /**
	         * Returns a copy of this duration with the specified duration subtracted.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Duration} duration  the duration to subtract, positive or negative, not null
	         * @return {@code Duration} based on this duration with the specified duration subtracted, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'minusDuration',
	        value: function minusDuration(duration) {
	            var secsToSubtract = duration.seconds();
	            var nanosToSubtract = duration.nano();
	            if (secsToSubtract == _MathUtil.MIN_SAFE_INTEGER) {
	                return this.plus(_MathUtil.MAX_SAFE_INTEGER, -nanosToSubtract).plus(1, 0);
	            }
	            return this.plus(-secsToSubtract, -nanosToSubtract);
	        }
	
	        /**
	         * Returns a copy of this duration with the specified duration subtracted.
	         * <p>
	         * The duration amount is measured in terms of the specified unit.
	         * Only a subset of units are accepted by this method.
	         * The unit must either have an {@link TemporalUnit#isDurationEstimated() exact duration} or
	         * be {@link ChronoUnit#DAYS} which is treated as 24 hours. Other units throw an exception.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Number} amountToSubtract  the amount to subtract, measured in terms of the unit, positive or negative
	         * @param {TemporalUnit} unit  the unit that the amount is measured in, must have an exact duration, not null
	         * @return {@code Duration} based on this duration with the specified duration subtracted, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'minusAmountUnit',
	        value: function minusAmountUnit(amountToSubtract, unit) {
	            return amountToSubtract == _MathUtil.MIN_SAFE_INTEGER ? this.plusAmountUnit(_MathUtil.MAX_SAFE_INTEGER, unit).plus(1, unit) : this.plusAmountUnit(-amountToSubtract, unit);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Returns a copy of this duration with the specified duration in 24 hour days subtracted.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Number} daysToSubtract  the days to subtract, positive or negative
	         * @return {@code Duration} based on this duration with the specified days subtracted, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'minusDays',
	        value: function minusDays(daysToSubtract) {
	            return daysToSubtract == _MathUtil.MIN_SAFE_INTEGER ? this.plusDays(_MathUtil.MAX_SAFE_INTEGER).plusDays(1) : this.plusDays(-daysToSubtract);
	        }
	
	        /**
	         * Returns a copy of this duration with the specified duration in hours subtracted.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Number} hoursToSubtract  the hours to subtract, positive or negative
	         * @return {@code Duration} based on this duration with the specified hours subtracted, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'minusHours',
	        value: function minusHours(hoursToSubtract) {
	            return hoursToSubtract == _MathUtil.MIN_SAFE_INTEGER ? this.plusHours(_MathUtil.MAX_SAFE_INTEGER).plusHours(1) : this.plusHours(-hoursToSubtract);
	        }
	
	        /**
	         * Returns a copy of this duration with the specified duration in minutes subtracted.
	         * <p>
	         * The number of hours is multiplied by 60 to obtain the number of seconds to subtract.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Number} minutesToSubtract  the minutes to subtract, positive or negative
	         * @return {@code Duration} based on this duration with the specified minutes subtracted, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'minusMinutes',
	        value: function minusMinutes(minutesToSubtract) {
	            return minutesToSubtract == _MathUtil.MIN_SAFE_INTEGER ? this.plusMinutes(_MathUtil.MAX_SAFE_INTEGER).plusMinutes(1) : this.plusMinutes(-minutesToSubtract);
	        }
	
	        /**
	         * Returns a copy of this duration with the specified duration in seconds subtracted.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Number} secondsToSubtract  the seconds to subtract, positive or negative
	         * @return {@code Duration} based on this duration with the specified seconds subtracted, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'minusSeconds',
	        value: function minusSeconds(secondsToSubtract) {
	            return secondsToSubtract == _MathUtil.MIN_SAFE_INTEGER ? this.plusSeconds(_MathUtil.MAX_SAFE_INTEGER).plusSeconds(1) : this.plusSeconds(-secondsToSubtract);
	        }
	
	        /**
	         * Returns a copy of this duration with the specified duration in milliseconds subtracted.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Number} millisToSubtract  the milliseconds to subtract, positive or negative
	         * @return {@code Duration} based on this duration with the specified milliseconds subtracted, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'minusMillis',
	        value: function minusMillis(millisToSubtract) {
	            return millisToSubtract == _MathUtil.MIN_SAFE_INTEGER ? this.plusMillis(_MathUtil.MAX_SAFE_INTEGER).plusMillis(1) : this.plusMillis(-millisToSubtract);
	        }
	
	        /**
	         * Returns a copy of this duration with the specified duration in nanoseconds subtracted.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Number} nanosToSubtract  the nanoseconds to subtract, positive or negative
	         * @return {@code Duration} based on this duration with the specified nanoseconds subtracted, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'minusNanos',
	        value: function minusNanos(nanosToSubtract) {
	            return nanosToSubtract == _MathUtil.MIN_SAFE_INTEGER ? this.plusNanos(_MathUtil.MAX_SAFE_INTEGER).plusNanos(1) : this.plusNanos(-nanosToSubtract);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Returns a copy of this duration multiplied by the scalar.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Number} multiplicand  the value to multiply the duration by, positive or negative
	         * @return {@code Duration} based on this duration multiplied by the specified scalar, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'multipliedBy',
	        value: function multipliedBy(multiplicand) {
	            if (multiplicand == 0) {
	                return Duration.ZERO;
	            }
	            if (multiplicand == 1) {
	                return this;
	            }
	            return Duration.create(_MathUtil.MathUtil.safeMultiply(this.toSeconds(), multiplicand));
	        }
	
	        /**
	         * Returns a copy of this duration divided by the specified value.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Number} divisor  the value to divide the duration by, positive or negative, not zero
	         * @return {@code Duration} based on this duration divided by the specified divisor, not null
	         * @throws ArithmeticException if the divisor is zero or if numeric overflow occurs
	         */
	
	    }, {
	        key: 'dividedBy',
	        value: function dividedBy(divisor) {
	            if (divisor == 0) {
	                throw new _errors.ArithmeticException('Cannot divide by zero');
	            }
	            if (divisor == 1) {
	                return this;
	            }
	            return Duration.create(this.toSeconds() / divisor);
	        }
	
	        /**
	         * Converts this duration to the total length in seconds and
	         * fractional nanoseconds expressed as a {@code BigDecimal}.
	         *
	         * @return {Number} the total length of the duration in seconds, with a scale of 9, not null
	         */
	
	    }, {
	        key: 'toSeconds',
	        value: function toSeconds() {
	            var nanoFloat = _MathUtil.MathUtil.safeMultiply(this._nanos, Math.pow(10, -9));
	            return _MathUtil.MathUtil.safeAdd(this._seconds, nanoFloat);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Returns a copy of this duration with the length negated.
	         * <p>
	         * This method swaps the sign of the total length of this duration.
	         * For example, {@code PT1.3S} will be returned as {@code PT-1.3S}.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @return {@code Duration} based on this duration with the amount negated, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'negated',
	        value: function negated() {
	            return this.multipliedBy(-1);
	        }
	
	        /**
	         * Returns a copy of this duration with a positive length.
	         * <p>
	         * This method returns a positive duration by effectively removing the sign from any negative total length.
	         * For example, {@code PT-1.3S} will be returned as {@code PT1.3S}.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @return {@code Duration} based on this duration with an absolute length, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'abs',
	        value: function abs() {
	            return this.isNegative() ? this.negated() : this;
	        }
	
	        //-------------------------------------------------------------------------
	        /**
	         * Adds this duration to the specified temporal object.
	         * <p>
	         * This returns a temporal object of the same observable type as the input
	         * with this duration added.
	         * <p>
	         * In most cases, it is clearer to reverse the calling pattern by using
	         * {@link Temporal#plus(TemporalAmount)}.
	         * <pre>
	         *   // these two lines are equivalent, but the second approach is recommended
	         *   dateTime = thisDuration.addTo(dateTime);
	         *   dateTime = dateTime.plus(thisDuration);
	         * </pre>
	         * <p>
	         * The calculation will add the seconds, then nanos.
	         * Only non-zero amounts will be added.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Temporal} temporal  the temporal object to adjust, not null
	         * @return {Temporal} an object of the same type with the adjustment made, not null
	         * @throws DateTimeException if unable to add
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'addTo',
	        value: function addTo(temporal) {
	            if (this._seconds != 0) {
	                temporal = temporal.plus(this._seconds, _ChronoUnit.ChronoUnit.SECONDS);
	            }
	            if (this._nanos != 0) {
	                temporal = temporal.plus(this._nanos, _ChronoUnit.ChronoUnit.NANOS);
	            }
	            return temporal;
	        }
	
	        /**
	         * Subtracts this duration from the specified temporal object.
	         * <p>
	         * This returns a temporal object of the same observable type as the input
	         * with this duration subtracted.
	         * <p>
	         * In most cases, it is clearer to reverse the calling pattern by using
	         * {@link Temporal#minus(TemporalAmount)}.
	         * <pre>
	         *   // these two lines are equivalent, but the second approach is recommended
	         *   dateTime = thisDuration.subtractFrom(dateTime);
	         *   dateTime = dateTime.minus(thisDuration);
	         * </pre>
	         * <p>
	         * The calculation will subtract the seconds, then nanos.
	         * Only non-zero amounts will be added.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {Temporal} temporal  the temporal object to adjust, not null
	         * @return {Temporal} an object of the same type with the adjustment made, not null
	         * @throws DateTimeException if unable to subtract
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'subtractFrom',
	        value: function subtractFrom(temporal) {
	            if (this._seconds != 0) {
	                temporal = temporal.minus(this._seconds, _ChronoUnit.ChronoUnit.SECONDS);
	            }
	            if (this._nanos != 0) {
	                temporal = temporal.minus(this._nanos, _ChronoUnit.ChronoUnit.NANOS);
	            }
	            return temporal;
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Gets the number of days in this duration.
	         * <p>
	         * This returns the total number of days in the duration by dividing the
	         * number of seconds by 86400.
	         * This is based on the standard definition of a day as 24 hours.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @return the number of days in the duration, may be negative
	         */
	
	    }, {
	        key: 'toDays',
	        value: function toDays() {
	            return this._seconds / _LocalTime.LocalTime.SECONDS_PER_DAY;
	        }
	
	        /**
	         * Gets the number of hours in this duration.
	         * <p>
	         * This returns the total number of hours in the duration by dividing the
	         * number of seconds by 3600.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @return {Number} the number of hours in the duration, may be negative
	         */
	
	    }, {
	        key: 'toHours',
	        value: function toHours() {
	            return this._seconds / _LocalTime.LocalTime.SECONDS_PER_HOUR;
	        }
	
	        /**
	         * Gets the number of minutes in this duration.
	         * <p>
	         * This returns the total number of minutes in the duration by dividing the
	         * number of seconds by 60.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @return {Number} the number of minutes in the duration, may be negative
	         */
	
	    }, {
	        key: 'toMinutes',
	        value: function toMinutes() {
	            return this._seconds / _LocalTime.LocalTime.SECONDS_PER_MINUTE;
	        }
	
	        /**
	         * Converts this duration to the total length in milliseconds.
	         * <p>
	         * If this duration is too large to fit in a {@code long} milliseconds, then an
	         * exception is thrown.
	         * <p>
	         * If this duration has greater than millisecond precision, then the conversion
	         * will drop any excess precision information as though the amount in nanoseconds
	         * was subject to integer division by one million.
	         *
	         * @return {Number} the total length of the duration in milliseconds
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'toMillis',
	        value: function toMillis() {
	            var millis = Math.round(_MathUtil.MathUtil.safeMultiply(this._seconds, 1000));
	            millis = _MathUtil.MathUtil.safeAdd(millis, _MathUtil.MathUtil.intDiv(this._nanos, 1000000));
	            return millis;
	        }
	
	        /**
	         * Converts this duration to the total length in nanoseconds expressed as a {@code long}.
	         * <p>
	         * If this duration is too large to fit in a {@code long} nanoseconds, then an
	         * exception is thrown.
	         *
	         * @return {Number} the total length of the duration in nanoseconds
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'toNanos',
	        value: function toNanos() {
	            var totalNanos = _MathUtil.MathUtil.safeMultiply(this._seconds, _LocalTime.LocalTime.NANOS_PER_SECOND);
	            totalNanos = _MathUtil.MathUtil.safeAdd(totalNanos, this._nanos);
	            return totalNanos;
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Compares this duration to the specified {@code Duration}.
	         * <p>
	         * The comparison is based on the total length of the durations.
	         *
	         * @param {Duration} otherDuration  the other duration to compare to, not null
	         * @return {Number} the comparator value, negative if less, positive if greater
	         */
	
	    }, {
	        key: 'compareTo',
	        value: function compareTo(otherDuration) {
	            (0, _assert.requireNonNull)(otherDuration, 'otherDuration');
	            (0, _assert.assert)(otherDuration instanceof Duration, 'otherDuration must be a Duration');
	            var cmp = _MathUtil.MathUtil.compareNumbers(this._seconds, otherDuration.seconds());
	            if (cmp != 0) {
	                return cmp;
	            }
	            return this._nanos - otherDuration.nano();
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Checks if this duration is equal to the specified {@code Duration}.
	         * <p>
	         * The comparison is based on the total length of the durations.
	         *
	         * @param {Duration} otherDuration  the other duration, null returns false
	         * @return {boolean} true if the other duration is equal to this one
	         */
	
	    }, {
	        key: 'equals',
	        value: function equals(otherDuration) {
	            if (this === otherDuration) {
	                return true;
	            }
	            if (otherDuration instanceof Duration) {
	                return this.seconds() == otherDuration.seconds() && this.nano() == otherDuration.nano();
	            }
	            return false;
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * A string representation of this duration using ISO-8601 seconds
	         * based representation, such as {@code PT8H6M12.345S}.
	         * <p>
	         * The format of the returned string will be {@code PTnHnMnS}, where n is
	         * the relevant hours, minutes or seconds part of the duration.
	         * Any fractional seconds are placed after a decimal povar i the seconds section.
	         * If a section has a zero value, it is omitted.
	         * The hours, minutes and seconds will all have the same sign.
	         * <p>
	         * Examples:
	         * <pre>
	         *    "20.345 seconds"                 -> "PT20.345S
	         *    "15 minutes" (15 * 60 seconds)   -> "PT15M"
	         *    "10 hours" (10 * 3600 seconds)   -> "PT10H"
	         *    "2 days" (2 * 86400 seconds)     -> "PT48H"
	         * </pre>
	         * Note that multiples of 24 hours are not output as days to avoid confusion
	         * with {@code Period}.
	         *
	         * @return an ISO-8601 representation of this duration, not null
	         */
	
	    }, {
	        key: 'toString',
	        value: function toString() {
	            if (this === Duration.ZERO) {
	                return 'PT0S';
	            }
	            var hours = _MathUtil.MathUtil.intDiv(this._seconds, _LocalTime.LocalTime.SECONDS_PER_HOUR);
	            var minutes = _MathUtil.MathUtil.intDiv(_MathUtil.MathUtil.intMod(this._seconds, _LocalTime.LocalTime.SECONDS_PER_HOUR), _LocalTime.LocalTime.SECONDS_PER_MINUTE);
	            var secs = _MathUtil.MathUtil.intMod(this._seconds, _LocalTime.LocalTime.SECONDS_PER_MINUTE);
	            var rval = 'PT';
	            if (hours != 0) {
	                rval += hours + 'H';
	            }
	            if (minutes != 0) {
	                rval += minutes + 'M';
	            }
	            if (secs == 0 && this._nanos == 0 && rval.length > 2) {
	                return rval;
	            }
	            if (secs < 0 && this._nanos > 0) {
	                if (secs == -1) {
	                    rval += '-0';
	                } else {
	                    rval += secs + 1;
	                }
	            } else {
	                rval += secs;
	            }
	            if (this._nanos > 0) {
	                rval += '.';
	                var nanoString = undefined;
	                if (secs < 0) {
	                    nanoString = '' + (2 * _LocalTime.LocalTime.NANOS_PER_SECOND - this._nanos);
	                } else {
	                    nanoString = '' + (_LocalTime.LocalTime.NANOS_PER_SECOND + this._nanos);
	                }
	                // remove the leading '1'
	                nanoString = nanoString.slice(1, nanoString.length);
	                rval += nanoString;
	                while (rval.charAt(rval.length - 1) == '0') {
	                    rval = rval.slice(0, rval.length - 1);
	                }
	            }
	            rval += 'S';
	            return rval;
	        }
	    }], [{
	        key: 'ofDays',
	        value: function ofDays(days) {
	            return Duration.create(_MathUtil.MathUtil.safeMultiply(days, _LocalTime.LocalTime.SECONDS_PER_DAY), 0);
	        }
	
	        /**
	         * Obtains an instance of {@code Duration} from a number of standard hours.
	         * <p>
	         * The seconds are calculated based on the standard definition of an hour,
	         * where each hour is 3600 seconds.
	         * The nanosecond in second field is set to zero.
	         *
	         * @param {Number} hours  the number of hours, positive or negative
	         * @return {@code Duration}, not null
	         * @throws ArithmeticException if the input hours exceeds the capacity of {@code Duration}
	         */
	
	    }, {
	        key: 'ofHours',
	        value: function ofHours(hours) {
	            return Duration.create(_MathUtil.MathUtil.safeMultiply(hours, _LocalTime.LocalTime.SECONDS_PER_HOUR), 0);
	        }
	
	        /**
	         * Obtains an instance of {@code Duration} from a number of standard minutes.
	         * <p>
	         * The seconds are calculated based on the standard definition of a minute,
	         * where each minute is 60 seconds.
	         * The nanosecond in second field is set to zero.
	         *
	         * @param {Number} minutes  the number of minutes, positive or negative
	         * @return {@code Duration}, not null
	         * @throws ArithmeticException if the input minutes exceeds the capacity of {@code Duration}
	         */
	
	    }, {
	        key: 'ofMinutes',
	        value: function ofMinutes(minutes) {
	            return Duration.create(_MathUtil.MathUtil.safeMultiply(minutes, _LocalTime.LocalTime.SECONDS_PER_MINUTE), 0);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Obtains an instance of {@code Duration} from a number of seconds
	         * and an adjustment in nanoseconds.
	         * <p>
	         * This method allows an arbitrary number of nanoseconds to be passed in.
	         * The factory will alter the values of the second and nanosecond in order
	         * to ensure that the stored nanosecond is in the range 0 to 999,999,999.
	         * For example, the following will result in the exactly the same duration:
	         * <pre>
	         *  Duration.ofSeconds(3, 1);
	         *  Duration.ofSeconds(4, -999_999_999);
	         *  Duration.ofSeconds(2, 1000_000_001);
	         * </pre>
	         *
	         * @param {Number} seconds  the number of seconds, positive or negative
	         * @param {Number} nanoAdjustment  the nanosecond adjustment to the number of seconds, positive or negative
	         * @return {@code Duration}, not null
	         * @throws ArithmeticException if the adjustment causes the seconds to exceed the capacity of {@code Duration}
	         */
	
	    }, {
	        key: 'ofSeconds',
	        value: function ofSeconds(seconds) {
	            var nanoAdjustment = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	            var secs = _MathUtil.MathUtil.safeAdd(seconds, _MathUtil.MathUtil.floorDiv(nanoAdjustment, _LocalTime.LocalTime.NANOS_PER_SECOND));
	            var nos = _MathUtil.MathUtil.floorMod(nanoAdjustment, _LocalTime.LocalTime.NANOS_PER_SECOND);
	            return Duration.create(secs, nos);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Obtains an instance of {@code Duration} from a number of milliseconds.
	         * <p>
	         * The seconds and nanoseconds are extracted from the specified milliseconds.
	         *
	         * @param {Number} millis  the number of milliseconds, positive or negative
	         * @return {@code Duration}, not null
	         */
	
	    }, {
	        key: 'ofMillis',
	        value: function ofMillis(millis) {
	            var secs = _MathUtil.MathUtil.intDiv(millis, 1000);
	            var mos = _MathUtil.MathUtil.intMod(millis, 1000);
	            if (mos < 0) {
	                mos += 1000;
	                secs--;
	            }
	            return Duration.create(secs, mos * 1000000);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Obtains an instance of {@code Duration} from a number of nanoseconds.
	         * <p>
	         * The seconds and nanoseconds are extracted from the specified nanoseconds.
	         *
	         * @param {Number} nanos  the number of nanoseconds, positive or negative
	         * @return {@code Duration}, not null
	         */
	
	    }, {
	        key: 'ofNanos',
	        value: function ofNanos(nanos) {
	            var secs = _MathUtil.MathUtil.intDiv(nanos, _LocalTime.LocalTime.NANOS_PER_SECOND);
	            var nos = _MathUtil.MathUtil.intMod(nanos, _LocalTime.LocalTime.NANOS_PER_SECOND);
	            if (nos < 0) {
	                nos += _LocalTime.LocalTime.NANOS_PER_SECOND;
	                secs--;
	            }
	            return this.create(secs, nos);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Obtains an instance of {@code Duration} from a duration in the specified unit.
	         * <p>
	         * The parameters represent the two parts of a phrase like '6 Hours'. For example:
	         * <pre>
	         *  Duration.of(3, SECONDS);
	         *  Duration.of(465, HOURS);
	         * </pre>
	         * Only a subset of units are accepted by this method.
	         * The unit must either have an {@link TemporalUnit#isDurationEstimated() exact duration} or
	         * be {@link ChronoUnit#DAYS} which is treated as 24 hours. Other units throw an exception.
	         *
	         * @param {Number} amount  the amount of the duration, measured in terms of the unit, positive or negative
	         * @param {TemporalUnit} unit  the unit that the duration is measured in, must have an exact duration, not null
	         * @return {@code Duration}, not null
	         * @throws DateTimeException if the period unit has an estimated duration
	         * @throws ArithmeticException if a numeric overflow occurs
	         */
	
	    }, {
	        key: 'of',
	        value: function of(amount, unit) {
	            return Duration.ZERO.plus(amount, unit);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Obtains an instance of {@code Duration} from an amount.
	         * <p>
	         * This obtains a duration based on the specified amount.
	         * A TemporalAmount represents an amount of time, which may be date-based
	         * or time-based, which this factory extracts to a duration.
	         * <p>
	         * The conversion loops around the set of units from the amount and uses
	         * the duration of the unit to calculate the total Duration.
	         * Only a subset of units are accepted by this method.
	         * The unit must either have an exact duration or be ChronoUnit.DAYS which
	         * is treated as 24 hours. If any other units are found then an exception is thrown.
	         *
	         * @param {Number} amount  the temporal amount to convert, not null
	         * @return {Duration} the resulting duration, not null
	         * @throws DateTimeException if the amount cannot be converted
	         * @throws ArithmeticException if a numeric overflow occurs
	         */
	
	    }, {
	        key: 'from',
	        value: function from(amount) {
	            (0, _assert.requireNonNull)(amount, 'amount');
	            var duration = Duration.ZERO;
	            amount.units().forEach(function (unit) {
	                duration = duration.plus(amount.get(unit), unit);
	            });
	            return duration;
	        }
	
	        /**
	         * Obtains an instance of {@code Duration} representing the duration between two instants.
	         * <p>
	         * Obtains a {@code Duration} representing the duration between two instants.
	         * This calculates the duration between two temporal objects of the same type.
	         * The difference in seconds is calculated using {@link Temporal#until(Temporal, TemporalUnit)}.
	         * The difference in nanoseconds is calculated using by querying the
	         * {@link ChronoField#NANO_OF_SECOND NANO_OF_SECOND} field.
	         * <p>
	         * The result of this method can be a negative period if the end is before the start.
	         * To guarantee to obtain a positive duration call abs() on the result.
	         *
	         * @param {Temporal} startInclusive  the start instant, inclusive, not null
	         * @param {Temporal} endExclusive  the end instant, exclusive, not null
	         * @return {@code Duration}, not null
	         * @throws DateTimeException if the seconds between the temporals cannot be obtained
	         * @throws ArithmeticException if the calculation exceeds the capacity of {@code Duration}
	         */
	
	    }, {
	        key: 'between',
	        value: function between(startInclusive, endExclusive) {
	            (0, _assert.requireNonNull)(startInclusive, 'startInclusive');
	            (0, _assert.requireNonNull)(endExclusive, 'endExclusive');
	            var secs = startInclusive.until(endExclusive, _ChronoUnit.ChronoUnit.SECONDS);
	            var nanos = 0;
	            if (startInclusive.isSupported(_ChronoField.ChronoField.NANO_OF_SECOND) && endExclusive.isSupported(_ChronoField.ChronoField.NANO_OF_SECOND)) {
	                try {
	                    var startNos = startInclusive.getLong(_ChronoField.ChronoField.NANO_OF_SECOND);
	                    nanos = endExclusive.getLong(_ChronoField.ChronoField.NANO_OF_SECOND) - startNos;
	                    if (secs > 0 && nanos < 0) {
	                        nanos += _LocalTime.LocalTime.NANOS_PER_SECOND;
	                    } else if (secs < 0 && nanos > 0) {
	                        nanos -= _LocalTime.LocalTime.NANOS_PER_SECOND;
	                    } else if (secs == 0 && nanos != 0) {
	                        // two possible meanings for result, so recalculate secs
	                        var adjustedEnd = endExclusive.with(_ChronoField.ChronoField.NANO_OF_SECOND, startNos);
	                        secs = startInclusive.until(adjustedEnd, _ChronoUnit.ChronoUnit.SECONDS);
	                    }
	                } catch (e) {
	                    // ignore and only use seconds
	                }
	            }
	            return this.ofSeconds(secs, nanos);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Obtains a {@code Duration} from a text string such as {@code PnDTnHnMn.nS}.
	         * <p>
	         * This will parse a textual representation of a duration, including the
	         * string produced by {@code toString()}. The formats accepted are based
	         * on the ISO-8601 duration format {@code PnDTnHnMn.nS} with days
	         * considered to be exactly 24 hours.
	         * <p>
	         * The string starts with an optional sign, denoted by the ASCII negative
	         * or positive symbol. If negative, the whole period is negated.
	         * The ASCII letter "P" is next in upper or lower case.
	         * There are then four sections, each consisting of a number and a suffix.
	         * The sections have suffixes in ASCII of "D", "H", "M" and "S" for
	         * days, hours, minutes and seconds, accepted in upper or lower case.
	         * The suffixes must occur in order. The ASCII letter "T" must occur before
	         * the first occurrence, if any, of an hour, minute or second section.
	         * At least one of the four sections must be present, and if "T" is present
	         * there must be at least one section after the "T".
	         * The number part of each section must consist of one or more ASCII digits.
	         * The number may be prefixed by the ASCII negative or positive symbol.
	         * The number of days, hours and minutes must parse to a {@code long}.
	         * The number of seconds must parse to a {@code long} with optional fraction.
	         * The decimal point may be either a dot or a comma.
	         * The fractional part may have from zero to 9 digits.
	         * <p>
	         * The leading plus/minus sign, and negative values for other units are
	         * not part of the ISO-8601 standard.
	         * <p>
	         * Examples:
	         * <pre>
	         *    "PT20.345S" -> parses as "20.345 seconds"
	         *    "PT15M"     -> parses as "15 minutes" (where a minute is 60 seconds)
	         *    "PT10H"     -> parses as "10 hours" (where an hour is 3600 seconds)
	         *    "P2D"       -> parses as "2 days" (where a day is 24 hours or 86400 seconds)
	         *    "P2DT3H4M"  -> parses as "2 days, 3 hours and 4 minutes"
	         *    "P-6H3M"    -> parses as "-6 hours and +3 minutes"
	         *    "-P6H3M"    -> parses as "-6 hours and -3 minutes"
	         *    "-P-6H+3M"  -> parses as "+6 hours and -3 minutes"
	         * </pre>
	         *
	         * @param {String} text  the text to parse, not null
	         * @return {Duration} the parsed duration, not null
	         * @throws DateTimeParseException if the text cannot be parsed to a duration
	         */
	
	    }, {
	        key: 'parse',
	        value: function parse(text) {
	            (0, _assert.requireNonNull)(text, 'text');
	            /**
	             * The pattern for parsing.
	             */
	            var PATTERN = new RegExp('([-+]?)P(?:([-+]?[0-9]+)D)?(T(?:([-+]?[0-9]+)H)?(?:([-+]?[0-9]+)M)?(?:([-+]?[0-9]+)(?:[.,]([0-9]{0,9}))?S)?)?', 'i');
	            var matches = PATTERN.exec(text);
	            if (matches !== null) {
	                // check for letter T but no time sections
	                if ('T' === matches[3] == false) {
	                    var negate = '-' === matches[1];
	                    var dayMatch = matches[2];
	                    var hourMatch = matches[4];
	                    var minuteMatch = matches[5];
	                    var secondMatch = matches[6];
	                    var fractionMatch = matches[7];
	                    if (dayMatch != null || hourMatch != null || minuteMatch != null || secondMatch != null) {
	                        var daysAsSecs = Duration._parseNumber(text, dayMatch, _LocalTime.LocalTime.SECONDS_PER_DAY, 'days');
	                        var hoursAsSecs = Duration._parseNumber(text, hourMatch, _LocalTime.LocalTime.SECONDS_PER_HOUR, 'hours');
	                        var minsAsSecs = Duration._parseNumber(text, minuteMatch, _LocalTime.LocalTime.SECONDS_PER_MINUTE, 'minutes');
	                        var seconds = Duration._parseNumber(text, secondMatch, 1, 'seconds');
	                        var negativeSecs = secondMatch != null && secondMatch.charAt(0) == '-';
	                        var nanos = Duration._parseFraction(text, fractionMatch, negativeSecs ? -1 : 1);
	                        try {
	                            return Duration.create(negate, daysAsSecs, hoursAsSecs, minsAsSecs, seconds, nanos);
	                        } catch (ex) {
	                            throw new _errors.DateTimeParseException('Text cannot be parsed to a Duration: overflow', text, 0, ex);
	                        }
	                    }
	                }
	            }
	            throw new _errors.DateTimeParseException('Text cannot be parsed to a Duration', text, 0);
	        }
	    }, {
	        key: '_parseNumber',
	        value: function _parseNumber(text, parsed, multiplier, errorText) {
	            // regex limits to [-+]?[0-9]+
	            if (parsed == null) {
	                return 0;
	            }
	            try {
	                if (parsed[0] === '+') {
	                    parsed = parsed.substring(1);
	                }
	                var val = parseFloat(parsed);
	                return _MathUtil.MathUtil.safeMultiply(val, multiplier);
	            } catch (ex) {
	                throw new _errors.DateTimeParseException('Text cannot be parsed to a Duration: ' + errorText, text, 0, ex);
	            }
	        }
	    }, {
	        key: '_parseFraction',
	        value: function _parseFraction(text, parsed, negate) {
	            // regex limits to [0-9]{0,9}
	            if (parsed == null || parsed.length == 0) {
	                return 0;
	            }
	            try {
	                parsed = (parsed + '000000000').substring(0, 9);
	                return parseFloat(parsed) * negate;
	            } catch (ex) {
	                throw new _errors.DateTimeParseException('Text cannot be parsed to a Duration: fraction', text, 0, ex);
	            }
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * to handle function overriding this function accepts any number of arguments, checks their type and delegates to the appropriate function
	         *
	         * @return {Duration}
	         */
	
	    }, {
	        key: 'create',
	        value: function create() {
	            if (arguments.length == 1) {
	                return Duration.createSeconds(arguments[0]);
	            } else if (arguments.length == 2) {
	                return Duration.createSecondsNanos(arguments[0], arguments[1]);
	            } else {
	                return Duration.createNegateDaysHoursMinutesSecondsNanos(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	            }
	        }
	    }, {
	        key: 'createNegateDaysHoursMinutesSecondsNanos',
	        value: function createNegateDaysHoursMinutesSecondsNanos(negate, daysAsSecs, hoursAsSecs, minsAsSecs, secs, nanos) {
	            var seconds = _MathUtil.MathUtil.safeAdd(daysAsSecs, _MathUtil.MathUtil.safeAdd(hoursAsSecs, _MathUtil.MathUtil.safeAdd(minsAsSecs, secs)));
	            if (negate) {
	                return Duration.ofSeconds(seconds, nanos).negated();
	            }
	            return Duration.ofSeconds(seconds, nanos);
	        }
	
	        /**
	         * Obtains an instance of {@code Duration} using seconds and nanoseconds.
	         *
	         * @param {Number} seconds  the length of the duration in seconds, positive or negative
	         * @param {Number} nanoAdjustment  the nanosecond adjustment within the second, from 0 to 999,999,999
	         */
	
	    }, {
	        key: 'createSecondsNanos',
	        value: function createSecondsNanos() {
	            var seconds = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	            var nanoAdjustment = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	            if ((seconds | nanoAdjustment) == 0) {
	                return Duration.ZERO;
	            }
	            // if seconds is a float, we need to adjust the nanos from it as well
	            if (seconds >= 0) {
	                nanoAdjustment += seconds % 1 * _LocalTime.LocalTime.NANOS_PER_SECOND;
	            } else {
	                nanoAdjustment -= seconds % 1 * _LocalTime.LocalTime.NANOS_PER_SECOND;
	            }
	            seconds = Math.floor(seconds);
	            nanoAdjustment = Math.round(nanoAdjustment);
	
	            return new Duration(seconds, nanoAdjustment);
	        }
	
	        /**
	         * Creates an instance of {@code Duration} from a number of seconds.
	         *
	         * @param {Number} seconds  the number of seconds, up to scale 9, positive or negative
	         * @return {Duration}, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'createSeconds',
	        value: function createSeconds(seconds) {
	            var nanos = Math.round(seconds * Math.pow(10, 9));
	            var div = _MathUtil.MathUtil.intDiv(nanos, _LocalTime.LocalTime.NANOS_PER_SECOND);
	            var rem = _MathUtil.MathUtil.intMod(nanos, _LocalTime.LocalTime.NANOS_PER_SECOND);
	            return Duration.ofSeconds(div, rem);
	        }
	    }]);
	
	    return Duration;
	})();
	/**
	 * Constant for a duration of zero.
	 */
	
	Duration.ZERO = new Duration(0, 0);

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LocalTime = exports.LocalTime = function LocalTime() {
	  _classCallCheck(this, LocalTime);
	};
	
	LocalTime.HOURS_PER_DAY = 24;
	LocalTime.MINUTES_PER_HOUR = 60;
	LocalTime.MINUTES_PER_DAY = LocalTime.MINUTES_PER_HOUR * LocalTime.HOURS_PER_DAY;
	
	LocalTime.SECONDS_PER_MINUTE = 60;
	LocalTime.SECONDS_PER_HOUR = LocalTime.SECONDS_PER_MINUTE * LocalTime.MINUTES_PER_HOUR;
	LocalTime.SECONDS_PER_DAY = LocalTime.SECONDS_PER_HOUR * LocalTime.HOURS_PER_DAY;
	
	LocalTime.NANOS_PER_SECOND = 1000000000;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TemporalAccessor = undefined;
	
	var _ChronoField = __webpack_require__(7);
	
	var _TemporalQueries = __webpack_require__(17);
	
	var _errors = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TemporalAccessor = (function () {
	    function TemporalAccessor() {
	        _classCallCheck(this, TemporalAccessor);
	    }
	
	    _createClass(TemporalAccessor, [{
	        key: 'query',
	
	        /**
	         * Queries this date-time.
	         * <p>
	         * This queries this date-time using the specified query strategy object.
	         * <p>
	         * Queries are a key tool for extracting information from date-times.
	         * They exists to externalize the process of querying, permitting different
	         * approaches, as per the strategy design pattern.
	         * Examples might be a query that checks if the date is the day before February 29th
	         * in a leap year, or calculates the number of days to your next birthday.
	         * <p>
	         * The most common query implementations are method references, such as
	         * {@code LocalDate::from} and {@code ZoneId::from}.
	         * Further implementations are on {@link TemporalQueries}.
	         * Queries may also be defined by applications.
	         *
	         * @implSpec
	         * Implementations of this method must behave as follows:
	         * <pre>
	            if (query == TemporalQueries.zoneId()
	                || query == TemporalQueries.chronology()
	                || query == TemporalQueries.precision()) {
	                    return null;
	            }
	            return query.queryFrom(this);
	         * </pre>
	         *
	         * @param {TemporalQuery} query  the query to invoke, not null
	         * @return the query result, null may be returned (defined by the query)
	         * @throws DateTimeException if unable to query
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	        value: function query(_query) {
	            if (_query == _TemporalQueries.TemporalQueries.zoneId() || _query == _TemporalQueries.TemporalQueries.chronology() || _query == _TemporalQueries.TemporalQueries.precision()) {
	                return null;
	            }
	            return _query.queryFrom(this);
	        }
	
	        /**
	         * Gets the range of valid values for the specified field.
	         * <p>
	         * All fields can be expressed as a {@code long} integer.
	         * This method returns an object that describes the valid range for that value.
	         * The value of this temporal object is used to enhance the accuracy of the returned range.
	         * If the date-time cannot return the range, because the field is unsupported or for
	         * some other reason, an exception will be thrown.
	         * <p>
	         * Note that the result only describes the minimum and maximum valid values
	         * and it is important not to read too much into them. For example, there
	         * could be values within the range that are invalid for the field.
	         *
	         * <h3>Specification for implementors</h3>
	         * Implementations must check and handle all fields defined in {@link ChronoField}.
	         * If the field is supported, then the range of the field must be returned.
	         * If unsupported, then a {@code DateTimeException} must be thrown.
	         * <p>
	         * If the field is not a {@code ChronoField}, then the result of this method
	         * is obtained by invoking {@code TemporalField.rangeRefinedBy(TemporalAccessorl)}
	         * passing {@code this} as the argument.
	         * <p>
	         * Implementations must not alter either this object.
	         *
	         * @param {TemporalField} field  the field to query the range for, not null
	         * @return {ValueRange} the range of valid values for the field, not null
	         * @throws DateTimeException if the range for the field cannot be obtained
	         */
	
	    }, {
	        key: 'range',
	        value: function range(field) {
	            if (field instanceof _ChronoField.ChronoField) {
	                if (this.isSupported(field)) {
	                    return field.range();
	                }
	                throw new _errors.UnsupportedTemporalTypeException('Unsupported field: ' + field);
	            }
	            return field.rangeRefinedBy(this);
	        }
	    }]);
	
	    return TemporalAccessor;
	})();

	exports.TemporalAccessor = TemporalAccessor;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Common implementations of {@code TemporalQuery}.
	 * <p>
	 * This class provides common implementations of {@link TemporalQuery}.
	 * These queries are primarily used as optimizations, allowing the internals
	 * of other objects to be extracted effectively. Note that application code
	 * can also use the {@code from(TemporalAccessor)} method on most temporal
	 * objects as a method reference matching the query interface, such as
	 * {@code LocalDate::from} and {@code ZoneId::from}.
	 * <p>
	 * There are two equivalent ways of using a {@code TemporalQuery}.
	 * The first is to invoke the method on the interface directly.
	 * The second is to use {@link TemporalAccessor#query(TemporalQuery)}:
	 * <pre>
	 *   // these two lines are equivalent, but the second approach is recommended
	 *   dateTime = query.queryFrom(dateTime);
	 *   dateTime = dateTime.query(query);
	 * </pre>
	 * It is recommended to use the second approach, {@code query(TemporalQuery)},
	 * as it is a lot clearer to read in code.
	 *
	 */
	
	var TemporalQueries = exports.TemporalQueries = (function () {
	    function TemporalQueries() {
	        _classCallCheck(this, TemporalQueries);
	    }
	
	    _createClass(TemporalQueries, null, [{
	        key: "zoneId",
	
	        /**
	         * A strict query for the {@code ZoneId}.
	         * <p>
	         * This queries a {@code TemporalAccessor} for the zone.
	         * The zone is only returned if the date-time conceptually contains a {@code ZoneId}.
	         * It will not be returned if the date-time only conceptually has an {@code ZoneOffset}.
	         * Thus a {@link ZonedDateTime} will return the result of
	         * {@code getZone()}, but an {@link OffsetDateTime} will
	         * return null.
	         * <p>
	         * In most cases, applications should use {@link #ZONE} as this query is too strict.
	         * <p>
	         * The result from JDK classes implementing {@code TemporalAccessor} is as follows:<br>
	         * {@code LocalDate} returns null<br>
	         * {@code LocalTime} returns null<br>
	         * {@code LocalDateTime} returns null<br>
	         * {@code ZonedDateTime} returns the associated zone<br>
	         * {@code OffsetTime} returns null<br>
	         * {@code OffsetDateTime} returns null<br>
	         * {@code ChronoLocalDate} returns null<br>
	         * {@code ChronoLocalDateTime} returns null<br>
	         * {@code ChronoZonedDateTime} returns the associated zone<br>
	         * {@code Era} returns null<br>
	         * {@code DayOfWeek} returns null<br>
	         * {@code Month} returns null<br>
	         * {@code Year} returns null<br>
	         * {@code YearMonth} returns null<br>
	         * {@code MonthDay} returns null<br>
	         * {@code ZoneOffset} returns null<br>
	         * {@code Instant} returns null<br>
	         *
	         * @return a query that can obtain the zone ID of a temporal, not null
	         */
	        value: function zoneId() {
	            return TemporalQueries.ZONE_ID;
	        }
	
	        /**
	         * A query for the {@code Chronology}.
	         * <p>
	         * This queries a {@code TemporalAccessor} for the chronology.
	         * If the target {@code TemporalAccessor} represents a date, or part of a date,
	         * then it should return the chronology that the date is expressed in.
	         * As a result of this definition, objects only representing time, such as
	         * {@code LocalTime}, will return null.
	         * <p>
	         * The result from js-joda classes implementing {@code TemporalAccessor} is as follows:<br>
	         * {@code LocalDate} returns {@code IsoChronology.INSTANCE}<br>
	         * {@code LocalTime} returns null (does not represent a date)<br>
	         * {@code LocalDateTime} returns {@code IsoChronology.INSTANCE}<br>
	         * {@code ZonedDateTime} returns {@code IsoChronology.INSTANCE}<br>
	         * {@code OffsetTime} returns null (does not represent a date)<br>
	         * {@code OffsetDateTime} returns {@code IsoChronology.INSTANCE}<br>
	         * {@code ChronoLocalDate} returns the associated chronology<br>
	         * {@code ChronoLocalDateTime} returns the associated chronology<br>
	         * {@code ChronoZonedDateTime} returns the associated chronology<br>
	         * {@code Era} returns the associated chronology<br>
	         * {@code DayOfWeek} returns null (shared across chronologies)<br>
	         * {@code Month} returns {@code IsoChronology.INSTANCE}<br>
	         * {@code Year} returns {@code IsoChronology.INSTANCE}<br>
	         * {@code YearMonth} returns {@code IsoChronology.INSTANCE}<br>
	         * {@code MonthDay} returns null {@code IsoChronology.INSTANCE}<br>
	         * {@code ZoneOffset} returns null (does not represent a date)<br>
	         * {@code Instant} returns null (does not represent a date)<br>
	         * <p>
	         * The method {@link Chronology#from(TemporalAccessor)} can be used as a
	         * {@code TemporalQuery}
	         * That method is equivalent to this query, except that it throws an
	         * exception if a chronology cannot be obtained.
	         *
	         * @return a query that can obtain the chronology of a temporal, not null
	         */
	
	    }, {
	        key: "chronology",
	        value: function chronology() {
	            return TemporalQueries.CHRONO;
	        }
	
	        /**
	         * A query for the smallest supported unit.
	         * <p>
	         * This queries a {@code TemporalAccessor} for the time precision.
	         * If the target {@code TemporalAccessor} represents a consistent or complete date-time,
	         * date or time then this must return the smallest precision actually supported.
	         * Note that fields such as {@code NANO_OF_DAY} and {@code NANO_OF_SECOND}
	         * are defined to always return ignoring the precision, thus this is the only
	         * way to find the actual smallest supported unit.
	         * For example, were {@code GregorianCalendar} to implement {@code TemporalAccessor}
	         * it would return a precision of {@code MILLIS}.
	         * <p>
	         * The result from js-joda classes implementing {@code TemporalAccessor} is as follows:<br>
	         * {@code LocalDate} returns {@code DAYS}<br>
	         * {@code LocalTime} returns {@code NANOS}<br>
	         * {@code LocalDateTime} returns {@code NANOS}<br>
	         * {@code ZonedDateTime} returns {@code NANOS}<br>
	         * {@code OffsetTime} returns {@code NANOS}<br>
	         * {@code OffsetDateTime} returns {@code NANOS}<br>
	         * {@code ChronoLocalDate} returns {@code DAYS}<br>
	         * {@code ChronoLocalDateTime} returns {@code NANOS}<br>
	         * {@code ChronoZonedDateTime} returns {@code NANOS}<br>
	         * {@code Era} returns {@code ERAS}<br>
	         * {@code DayOfWeek} returns {@code DAYS}<br>
	         * {@code Month} returns {@code MONTHS}<br>
	         * {@code Year} returns {@code YEARS}<br>
	         * {@code YearMonth} returns {@code MONTHS}<br>
	         * {@code MonthDay} returns null (does not represent a complete date or time)<br>
	         * {@code ZoneOffset} returns null (does not represent a date or time)<br>
	         * {@code Instant} returns {@code NANOS}<br>
	         *
	         * @return a query that can obtain the precision of a temporal, not null
	         */
	
	    }, {
	        key: "precision",
	        value: function precision() {
	            return TemporalQueries.PRECISION;
	        }
	
	        /**
	         * A lenient query for the {@code ZoneId}, falling back to the {@code ZoneOffset}.
	         * <p>
	         * This queries a {@code TemporalAccessor} for the zone.
	         * It first tries to obtain the zone, using {@link #zoneId()}.
	         * If that is not found it tries to obtain the {@link #offset()}.
	         * <p>
	         * In most cases, applications should use this query rather than {@code #zoneId()}.
	         * <p>
	         * This query examines the {@link ChronoField#OFFSET_SECONDS offset-seconds}
	         * field and uses it to create a {@code ZoneOffset}.
	         * <p>
	         * The method {@link ZoneId#from(TemporalAccessor)} can be used as a
	         * {@code TemporalQuery} via a method reference, {@code ZoneId::from}.
	         * That method is equivalent to this query, except that it throws an
	         * exception if a zone cannot be obtained.
	         *
	         * @return a query that can obtain the zone ID or offset of a temporal, not null
	         */
	
	    }, {
	        key: "zone",
	        value: function zone() {
	            return TemporalQueries.ZONE;
	        }
	
	        /**
	         * A query for {@code ZoneOffset} returning null if not found.
	         * <p>
	         * This returns a {@code TemporalQuery} that can be used to query a temporal
	         * object for the offset. The query will return null if the temporal
	         * object cannot supply an offset.
	         * <p>
	         * The query implementation examines the {@link ChronoField#OFFSET_SECONDS OFFSET_SECONDS}
	         * field and uses it to create a {@code ZoneOffset}.
	         * <p>
	         * The method {@link java.time.ZoneOffset#from(TemporalAccessor)} can be used as a
	         * {@code TemporalQuery} via a method reference, {@code ZoneOffset::from}.
	         * This query and {@code ZoneOffset::from} will return the same result if the
	         * temporal object contains an offset. If the temporal object does not contain
	         * an offset, then the method reference will throw an exception, whereas this
	         * query will return null.
	         *
	         * @return a query that can obtain the offset of a temporal, not null
	         */
	
	    }, {
	        key: "offset",
	        value: function offset() {
	            return TemporalQueries.OFFSET;
	        }
	
	        /**
	         * A query for {@code LocalDate} returning null if not found.
	         * <p>
	         * This returns a {@code TemporalQuery} that can be used to query a temporal
	         * object for the local date. The query will return null if the temporal
	         * object cannot supply a local date.
	         * <p>
	         * The query implementation examines the {@link ChronoField#EPOCH_DAY EPOCH_DAY}
	         * field and uses it to create a {@code LocalDate}.
	         *
	         * @return a query that can obtain the date of a temporal, not null
	         */
	
	    }, {
	        key: "localDate",
	        value: function localDate() {
	            return TemporalQueries.LOCAL_DATE;
	        }
	
	        /**
	         * A query for {@code LocalTime} returning null if not found.
	         * <p>
	         * This returns a {@code TemporalQuery} that can be used to query a temporal
	         * object for the local time. The query will return null if the temporal
	         * object cannot supply a local time.
	         * <p>
	         * The query implementation examines the {@link ChronoField#NANO_OF_DAY NANO_OF_DAY}
	         * field and uses it to create a {@code LocalTime}.
	         *
	         * @return a query that can obtain the time of a temporal, not null
	         */
	
	    }, {
	        key: "localTime",
	        value: function localTime() {
	            return TemporalQueries.LOCAL_TIME;
	        }
	    }]);
	
	    return TemporalQueries;
	})();
	
	/** 
	 * Factory to create something similar to the JSR-310 {TemporalQuery} interface, takes a function and returns a new TemporalQuery object that presents that function
	 * as the queryFrom() function.
	 * TODO: maybe should be moved to a separate file?
	 * @param queryFromFunction
	 */
	
	function createTemporalQuery(queryFromFunction) {
	    var TemporalQuery = function TemporalQuery() {
	        _classCallCheck(this, TemporalQuery);
	    };
	
	    TemporalQuery.prototype.queryFrom = queryFromFunction;
	    return new TemporalQuery();
	}
	//-----------------------------------------------------------------------
	/**
	 * A strict query for the {@code ZoneId}.
	 */
	TemporalQueries.ZONE_ID = createTemporalQuery(function (temporal) {
	    return temporal.query(TemporalQueries.ZONE_ID);
	});
	
	/**
	 * A query for the {@code Chronology}.
	 */
	TemporalQueries.CHRONO = createTemporalQuery(function (temporal) {
	    return temporal.query(TemporalQueries.CHRONO);
	});
	
	/**
	 * A query for the smallest supported unit.
	 */
	TemporalQueries.PRECISION = createTemporalQuery(function (temporal) {
	    return temporal.query(TemporalQueries.PRECISION);
	});
	
	//-----------------------------------------------------------------------
	/**
	 * A query for {@code ZoneOffset} returning null if not found.
	 */
	TemporalQueries.OFFSET = createTemporalQuery(function (temporal) {
	    if (temporal.isSupported(TemporalQueries.OFFSET_SECONDS)) {
	        return ZoneOffset.ofTotalSeconds(temporal.get(TemporalQueries.OFFSET_SECONDS));
	    }
	    return null;
	});
	
	/**
	 * A lenient query for the {@code ZoneId}, falling back to the {@code ZoneOffset}.
	 */
	TemporalQueries.ZONE = createTemporalQuery(function (temporal) {
	    var zone = temporal.query(TemporalQueries.ZONE_ID);
	    return zone != null ? zone : temporal.query(TemporalQueries.OFFSET);
	});
	
	/**
	 * A query for {@code LocalDate} returning null if not found.
	 */
	TemporalQueries.LOCAL_DATE = createTemporalQuery(function (temporal) {
	    if (temporal.isSupported(TemporalQueries.EPOCH_DAY)) {
	        return LocalDate.ofEpochDay(temporal.getLong(TemporalQueries.EPOCH_DAY));
	    }
	    return null;
	});
	
	/**
	 * A query for {@code LocalTime} returning null if not found.
	 */
	TemporalQueries.LOCAL_TIME = createTemporalQuery(function (temporal) {
	    if (temporal.isSupported(TemporalQueries.NANO_OF_DAY)) {
	        return LocalTime.ofNanoOfDay(temporal.getLong(TemporalQueries.NANO_OF_DAY));
	    }
	    return null;
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ZoneOffset = undefined;
	
	var _errors = __webpack_require__(3);
	
	var _LocalTime = __webpack_require__(15);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MAX_SECONDS = 18 * _LocalTime.LocalTime.SECONDS_PER_HOUR;
	var SECONDS_CACHE = {};
	
	var ZoneOffset = exports.ZoneOffset = (function () {
	    function ZoneOffset(totalSeconds) {
	        _classCallCheck(this, ZoneOffset);
	
	        ZoneOffset.validateTotalSeconds(totalSeconds);
	        this._totalSeconds = totalSeconds;
	    }
	
	    _createClass(ZoneOffset, [{
	        key: 'totalSeconds',
	        value: function totalSeconds() {
	            return this._totalSeconds;
	        }
	
	        /**
	         * Checks if this offset is equal to another offset.
	         *
	         * The comparison is based on the amount of the offset in seconds.
	         * This is equivalent to a comparison by ID.
	         *
	         * @param obj  the object to check, null returns false
	         * @return true if this is equal to the other offset
	         */
	
	    }, {
	        key: 'equals',
	        value: function equals(obj) {
	            if (this === obj) {
	                return true;
	            }
	            if (obj instanceof ZoneOffset) {
	                return this._totalSeconds === obj._totalSeconds;
	            }
	            return false;
	        }
	    }], [{
	        key: 'validateTotalSeconds',
	        value: function validateTotalSeconds(totalSeconds) {
	            if (Math.abs(totalSeconds) > MAX_SECONDS) {
	                throw new _errors.DateTimeException('Zone offset not in valid range: -18:00 to +18:00');
	            }
	        }
	    }, {
	        key: 'validate',
	        value: function validate(hours, minutes, seconds) {
	            if (hours < -18 || hours > 18) {
	                throw new _errors.DateTimeException('Zone offset hours not in valid range: value ' + hours + ' is not in the range -18 to 18');
	            }
	            if (hours > 0) {
	                if (minutes < 0 || seconds < 0) {
	                    throw new _errors.DateTimeException('Zone offset minutes and seconds must be positive because hours is positive');
	                }
	            } else if (hours < 0) {
	                if (minutes > 0 || seconds > 0) {
	                    throw new _errors.DateTimeException('Zone offset minutes and seconds must be negative because hours is negative');
	                }
	            } else if (minutes > 0 && seconds < 0 || minutes < 0 && seconds > 0) {
	                throw new _errors.DateTimeException('Zone offset minutes and seconds must have the same sign');
	            }
	            if (Math.abs(minutes) > 59) {
	                throw new _errors.DateTimeException('Zone offset minutes not in valid range: abs(value) ' + Math.abs(minutes) + ' is not in the range 0 to 59');
	            }
	            if (Math.abs(seconds) > 59) {
	                throw new _errors.DateTimeException('Zone offset seconds not in valid range: abs(value) ' + Math.abs(seconds) + ' is not in the range 0 to 59');
	            }
	            if (Math.abs(hours) == 18 && (Math.abs(minutes) > 0 || Math.abs(seconds) > 0)) {
	                throw new _errors.DateTimeException('Zone offset not in valid range: -18:00 to +18:00');
	            }
	        }
	    }, {
	        key: 'ofHours',
	        value: function ofHours(hours) {
	            return ZoneOffset.ofHoursMinutesSeconds(hours, 0, 0);
	        }
	    }, {
	        key: 'ofHoursMinutes',
	        value: function ofHoursMinutes(hours, minutes) {
	            return ZoneOffset.ofHoursMinutesSeconds(hours, minutes, 0);
	        }
	    }, {
	        key: 'ofHoursMinutesSeconds',
	        value: function ofHoursMinutesSeconds(hours, minutes, seconds) {
	            ZoneOffset.validate(hours, minutes, seconds);
	            var totalSeconds = hours * _LocalTime.LocalTime.SECONDS_PER_HOUR + minutes * _LocalTime.LocalTime.SECONDS_PER_MINUTE + seconds;
	            return ZoneOffset.ofTotalSeconds(totalSeconds);
	        }
	    }, {
	        key: 'ofTotalMinutes',
	        value: function ofTotalMinutes(totalMinutes) {
	            var totalSeconds = totalMinutes * _LocalTime.LocalTime.SECONDS_PER_MINUTE;
	            return ZoneOffset.ofTotalSeconds(totalSeconds);
	        }
	    }, {
	        key: 'ofTotalSeconds',
	        value: function ofTotalSeconds(totalSeconds) {
	            if (totalSeconds % (15 * _LocalTime.LocalTime.SECONDS_PER_MINUTE) === 0) {
	                var totalSecs = totalSeconds;
	                var result = SECONDS_CACHE[totalSecs];
	                if (result == null) {
	                    result = new ZoneOffset(totalSeconds);
	                    SECONDS_CACHE[totalSecs] = result;
	                }
	                return result;
	            } else {
	                return new ZoneOffset(totalSeconds);
	            }
	        }
	    }]);
	
	    return ZoneOffset;
	})();
	
	ZoneOffset.UTC = ZoneOffset.ofTotalSeconds(0);
	ZoneOffset.MIN = ZoneOffset.ofTotalSeconds(-MAX_SECONDS);
	ZoneOffset.MAX = ZoneOffset.ofTotalSeconds(MAX_SECONDS);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Month = undefined;
	
	var _assert = __webpack_require__(2);
	
	var _ChronoField = __webpack_require__(7);
	
	var _ChronoUnit = __webpack_require__(13);
	
	var _errors = __webpack_require__(3);
	
	var _IsoChronology = __webpack_require__(6);
	
	var _TemporalAccessor2 = __webpack_require__(16);
	
	var _TemporalQueries = __webpack_require__(17);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * A month-of-year, such as 'July'.
	 * <p>
	 * {@code Month} is representing the 12 months of the year -
	 * January, February, March, April, May, June, July, August, September, October,
	 * November and December.
	 * <p>
	 * In addition to the textual name, each month-of-year has an {@code int} value.
	 * The {@code int} value follows normal usage and the ISO-8601 standard,
	 * from 1 (January) to 12 (December). It is recommended that applications use the static values defined by this class
	 * rather than the {@code int} value to ensure code clarity.
	 * <p>
	 * This class represents a common concept that is found in many calendar systems.
	 * As such, this class may be used by any calendar system that has the month-of-year
	 * concept defined exactly equivalent to the ISO-8601 calendar system.
	 *
	 */
	
	var Month = (function (_TemporalAccessor) {
	    _inherits(Month, _TemporalAccessor);
	
	    /**
	     *
	     * @param {number} value
	     */
	
	    function Month(value) {
	        _classCallCheck(this, Month);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Month).call(this));
	
	        _this._value = value;
	        return _this;
	    }
	
	    /**
	     *
	     * @return {number} gets the value
	     */
	
	    _createClass(Month, [{
	        key: 'value',
	        value: function value() {
	            return this._value;
	        }
	
	        /**
	         * Checks if the specified field is supported.
	         * <p>
	         * This checks if this month-of-year can be queried for the specified field.
	         * If false, then calling the {@link #range(TemporalField) range} and
	         * {@link #get(TemporalField) get} methods will throw an exception.
	         * <p>
	         * If the field is {@link ChronoField#MONTH_OF_YEAR MONTH_OF_YEAR} then
	         * this method returns true.
	         * All other {@code ChronoField} instances will return false.
	         * <p>
	         * If the field is not a {@code ChronoField}, then the result of this method
	         * is obtained by invoking {@code TemporalField.isSupportedBy(TemporalAccessor)}
	         * passing {@code this} as the argument.
	         * Whether the field is supported is determined by the field.
	         *
	         * @param {TemporalField} field  the field to check, null returns false
	         * @return {boolean} true if the field is supported on this month-of-year, false if not
	         */
	
	    }, {
	        key: 'isSupported',
	        value: function isSupported(field) {
	            if (null === field) {
	                return false;
	            }
	            if (field instanceof _ChronoField.ChronoField) {
	                return field === _ChronoField.ChronoField.MONTH_OF_YEAR;
	            }
	            return field != null && field.isSupportedBy(this);
	        }
	
	        /**
	         * Gets the value of the specified field from this month-of-year as an {@code int}.
	         * <p>
	         * This queries this month for the value of the specified field.
	         * The returned value will always be within the valid range of values for the field.
	         * If it is not possible to return the value, because the field is not supported
	         * or for some other reason, an exception is thrown.
	         * <p>
	         * If the field is {@link ChronoField#MONTH_OF_YEAR MONTH_OF_YEAR} then the
	         * value of the month-of-year, from 1 to 12, will be returned.
	         * All other {@code ChronoField} instances will throw an {@code UnsupportedTemporalTypeException}.
	         * <p>
	         * If the field is not a {@code ChronoField}, then the result of this method
	         * is obtained by invoking {@code TemporalField.getFrom(TemporalAccessor)}
	         * passing {@code this} as the argument. Whether the value can be obtained,
	         * and what the value represents, is determined by the field.
	         *
	         * @param {TemporalField} field  the field to get, not null
	         * @return {Number} the value for the field, within the valid range of values
	         * @throws DateTimeException if a value for the field cannot be obtained or
	         *         the value is outside the range of valid values for the field
	         * @throws UnsupportedTemporalTypeException if the field is not supported or
	         *         the range of values exceeds an {@code int}
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'get',
	        value: function get(field) {
	            if (field === _ChronoField.ChronoField.MONTH_OF_YEAR) {
	                return this.value();
	            }
	            return range(field).checkValidIntValue(getLong(field), field);
	        }
	
	        /**
	         * Gets the value of the specified field from this month-of-year as a {@code long}.
	         * <p>
	         * This queries this month for the value of the specified field.
	         * If it is not possible to return the value, because the field is not supported
	         * or for some other reason, an exception is thrown.
	         * <p>
	         * If the field is {@link ChronoField#MONTH_OF_YEAR MONTH_OF_YEAR} then the
	         * value of the month-of-year, from 1 to 12, will be returned.
	         * All other {@code ChronoField} instances will throw an {@code UnsupportedTemporalTypeException}.
	         * <p>
	         * If the field is not a {@code ChronoField}, then the result of this method
	         * is obtained by invoking {@code TemporalField.getFrom(TemporalAccessor)}
	         * passing {@code this} as the argument. Whether the value can be obtained,
	         * and what the value represents, is determined by the field.
	         *
	         * @param {TemporalField} field  the field to get, not null
	         * @return {Number} the value for the field
	         * @throws DateTimeException if a value for the field cannot be obtained
	         * @throws UnsupportedTemporalTypeException if the field is not supported
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'getLong',
	        value: function getLong(field) {
	            if (field === _ChronoField.ChronoField.MONTH_OF_YEAR) {
	                return this.value();
	            } else if (field instanceof _ChronoField.ChronoField) {
	                throw new _errors.UnsupportedTemporalTypeException('Unsupported field: ' + field);
	            }
	            return field.getFrom(this);
	        }
	
	        /**
	         * Returns the month-of-year that is the specified number of months after this one.
	         * <p>
	         * The calculation rolls around the end of the year from December to January.
	         * The specified period may be negative.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {number} months  the months to add, positive or negative
	         * @return {Month} the resulting month, not null
	         */
	
	    }, {
	        key: 'plus',
	        value: function plus(months) {
	            var amount = Math.floor(months % 12) + 12; // + 12 to make sure negative arguments are positive, the total is "corrected" by the next % 12
	            var newMonthVal = (this.value() + amount) % 12;
	            /* December is 12, not 0, but 12 % 12 = 0 */
	            newMonthVal = newMonthVal == 0 ? 12 : newMonthVal;
	            return Month.of(newMonthVal);
	        }
	
	        /**
	         * Returns the month-of-year that is the specified number of months before this one.
	         * <p>
	         * The calculation rolls around the start of the year from January to December.
	         * The specified period may be negative.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param {number} months  the months to subtract, positive or negative
	         * @return {Month} the resulting month, not null
	         */
	
	    }, {
	        key: 'minus',
	        value: function minus(months) {
	            return this.plus(-(months % 12));
	        }
	
	        /**
	         * Gets the length of this month in days.
	         * <p>
	         * This takes a flag to determine whether to return the length for a leap year or not.
	         * <p>
	         * February has 28 days in a standard year and 29 days in a leap year.
	         * April, June, September and November have 30 days.
	         * All other months have 31 days.
	         *
	         * @param {boolean} leapYear  true if the length is required for a leap year
	         * @return {number} the length of this month in days, from 28 to 31
	         */
	
	    }, {
	        key: 'length',
	        value: function length(leapYear) {
	            switch (this) {
	                case Month.FEBRUARY:
	                    return leapYear ? 29 : 28;
	                case Month.APRIL:
	                case Month.JUNE:
	                case Month.SEPTEMBER:
	                case Month.NOVEMBER:
	                    return 30;
	                default:
	                    return 31;
	            }
	        }
	
	        /**
	         * Gets the minimum length of this month in days.
	         * <p>
	         * February has a minimum length of 28 days.
	         * April, June, September and November have 30 days.
	         * All other months have 31 days.
	         *
	         * @return {number} the minimum length of this month in days, from 28 to 31
	         */
	
	    }, {
	        key: 'minLength',
	        value: function minLength() {
	            switch (this) {
	                case Month.FEBRUARY:
	                    return 28;
	                case Month.APRIL:
	                case Month.JUNE:
	                case Month.SEPTEMBER:
	                case Month.NOVEMBER:
	                    return 30;
	                default:
	                    return 31;
	            }
	        }
	
	        /**
	         * Gets the maximum length of this month in days.
	         * <p>
	         * February has a maximum length of 29 days.
	         * April, June, September and November have 30 days.
	         * All other months have 31 days.
	         *
	         * @return {number} the maximum length of this month in days, from 29 to 31
	         */
	
	    }, {
	        key: 'maxLength',
	        value: function maxLength() {
	            switch (this) {
	                case Month.FEBRUARY:
	                    return 29;
	                case Month.APRIL:
	                case Month.JUNE:
	                case Month.SEPTEMBER:
	                case Month.NOVEMBER:
	                    return 30;
	                default:
	                    return 31;
	            }
	        }
	
	        /**
	         * Gets the day-of-year corresponding to the first day of this month.
	         * <p>
	         * This returns the day-of-year that this month begins on, using the leap
	         * year flag to determine the length of February.
	         *
	         * @param {boolean} leapYear  true if the length is required for a leap year
	         * @return {number} the day of year corresponding to the first day of this month, from 1 to 336
	         */
	
	    }, {
	        key: 'firstDayOfYear',
	        value: function firstDayOfYear(leapYear) {
	            var leap = leapYear ? 1 : 0;
	            switch (this) {
	                case Month.JANUARY:
	                    return 1;
	                case Month.FEBRUARY:
	                    return 32;
	                case Month.MARCH:
	                    return 60 + leap;
	                case Month.APRIL:
	                    return 91 + leap;
	                case Month.MAY:
	                    return 121 + leap;
	                case Month.JUNE:
	                    return 152 + leap;
	                case Month.JULY:
	                    return 182 + leap;
	                case Month.AUGUST:
	                    return 213 + leap;
	                case Month.SEPTEMBER:
	                    return 244 + leap;
	                case Month.OCTOBER:
	                    return 274 + leap;
	                case Month.NOVEMBER:
	                    return 305 + leap;
	                case Month.DECEMBER:
	                default:
	                    return 335 + leap;
	            }
	        }
	
	        /**
	         * Gets the month corresponding to the first month of this quarter.
	         * <p>
	         * The year can be divided into four quarters.
	         * This method returns the first month of the quarter for the base month.
	         * January, February and March return January.
	         * April, May and June return April.
	         * July, August and September return July.
	         * October, November and December return October.
	         *
	         * @return {Month} the first month of the quarter corresponding to this month, not null
	         */
	
	    }, {
	        key: 'firstMonthOfQuarter',
	        value: function firstMonthOfQuarter() {
	            switch (this) {
	                case Month.JANUARY:
	                case Month.FEBRUARY:
	                case Month.MARCH:
	                    return Month.JANUARY;
	                case Month.APRIL:
	                case Month.MAY:
	                case Month.JUNE:
	                    return Month.APRIL;
	                case Month.JULY:
	                case Month.AUGUST:
	                case Month.SEPTEMBER:
	                    return Month.JULY;
	                case Month.OCTOBER:
	                case Month.NOVEMBER:
	                case Month.DECEMBER:
	                default:
	                    return Month.OCTOBER;
	            }
	        }
	
	        /**
	        * Queries this month-of-year using the specified query.
	        * <p>
	        * This queries this month-of-year using the specified query strategy object.
	        * The {@code TemporalQuery} object defines the logic to be used to
	        * obtain the result. Read the documentation of the query to understand
	        * what the result of this method will be.
	        * <p>
	        * The result of this method is obtained by invoking the
	        * {@link TemporalQuery#queryFrom(TemporalAccessor)} method on the
	        * specified query passing {@code this} as the argument.
	        *
	        * @param {TemporalQuery} query  the query to invoke, not null
	        * @return the query result, null may be returned (defined by the query)
	        * @throws DateTimeException if unable to query (defined by the query)
	        * @throws ArithmeticException if numeric overflow occurs (defined by the query)
	        */
	
	    }, {
	        key: 'query',
	        value: function query(_query) {
	            (0, _assert.assert)(_query != null, 'query() parameter must not be null', _errors.DateTimeException);
	            if (_query === _TemporalQueries.TemporalQueries.chronology()) {
	                return _IsoChronology.IsoChronology.INSTANCE;
	            } else if (_query === _TemporalQueries.TemporalQueries.precision()) {
	                return _ChronoUnit.ChronoUnit.MONTHS;
	            }
	            return _get(Object.getPrototypeOf(Month.prototype), 'query', this).call(this, _query);
	        }
	
	        /**
	         * toString implementation... in JDK this is inherited from the Enum class
	         * 
	         * @returns {String}
	         */
	
	    }, {
	        key: 'toString',
	        value: function toString(leapYear) {
	            var leap = leapYear ? 1 : 0;
	            switch (this) {
	                case Month.JANUARY:
	                    return 'JANUARY';
	                case Month.FEBRUARY:
	                    return 'FEBRUARY';
	                case Month.MARCH:
	                    return 'MARCH';
	                case Month.APRIL:
	                    return 'APRIL';
	                case Month.MAY:
	                    return 'MAY';
	                case Month.JUNE:
	                    return 'JUNE';
	                case Month.JULY:
	                    return 'JULY';
	                case Month.AUGUST:
	                    return 'AUGUST';
	                case Month.SEPTEMBER:
	                    return 'SEPTEMBER';
	                case Month.OCTOBER:
	                    return 'OCTOBER';
	                case Month.NOVEMBER:
	                    return 'NOVEMBER';
	                case Month.DECEMBER:
	                    return 'DECEMBER';
	                default:
	                    return 'unknown Month, value: ' + this.value();
	            }
	        }
	
	        /**
	         *
	         * @param {number} month
	         * @return {Month} not null
	         **/
	
	    }], [{
	        key: 'of',
	        value: function of(month) {
	            if (month < 1 || month > 12) {
	                (0, _assert.assert)(false, 'Invalid value for MonthOfYear: ' + month, _errors.DateTimeException);
	            }
	            return MONTHS[month - 1];
	        }
	    }]);
	
	    return Month;
	})(_TemporalAccessor2.TemporalAccessor);
	
	exports.Month = Month;
	
	Month.JANUARY = new Month(1);
	Month.FEBRUARY = new Month(2);
	Month.MARCH = new Month(3);
	Month.APRIL = new Month(4);
	Month.MAY = new Month(5);
	Month.JUNE = new Month(6);
	Month.JULY = new Month(7);
	Month.AUGUST = new Month(8);
	Month.SEPTEMBER = new Month(9);
	Month.OCTOBER = new Month(10);
	Month.NOVEMBER = new Month(11);
	Month.DECEMBER = new Month(12);
	
	var MONTHS = [Month.JANUARY, Month.FEBRUARY, Month.MARCH, Month.APRIL, Month.MAY, Month.JUNE, Month.JULY, Month.AUGUST, Month.SEPTEMBER, Month.OCTOBER, Month.NOVEMBER, Month.DECEMBER];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=js-joda.js.map