(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["JSJoda"] = factory();
	else
		root["JSJoda"] = factory();
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
	exports.ZoneOffset = exports.Year = exports.Period = exports.Month = exports.MathUtil = exports.LocalTime = exports.LocalDate = exports.Instant = exports.DateTimeParseException = exports.DateTimeException = exports.Duration = exports.Clock = undefined;
	
	var _Clock = __webpack_require__(1);
	
	Object.defineProperty(exports, 'Clock', {
	  enumerable: true,
	  get: function get() {
	    return _Clock.Clock;
	  }
	});
	
	var _Duration = __webpack_require__(8);
	
	Object.defineProperty(exports, 'Duration', {
	  enumerable: true,
	  get: function get() {
	    return _Duration.Duration;
	  }
	});
	
	var _errors = __webpack_require__(5);
	
	Object.defineProperty(exports, 'DateTimeException', {
	  enumerable: true,
	  get: function get() {
	    return _errors.DateTimeException;
	  }
	});
	Object.defineProperty(exports, 'DateTimeParseException', {
	  enumerable: true,
	  get: function get() {
	    return _errors.DateTimeParseException;
	  }
	});
	
	var _Instant = __webpack_require__(2);
	
	Object.defineProperty(exports, 'Instant', {
	  enumerable: true,
	  get: function get() {
	    return _Instant.Instant;
	  }
	});
	
	var _LocalDate = __webpack_require__(19);
	
	Object.defineProperty(exports, 'LocalDate', {
	  enumerable: true,
	  get: function get() {
	    return _LocalDate.LocalDate;
	  }
	});
	
	var _LocalTime = __webpack_require__(11);
	
	Object.defineProperty(exports, 'LocalTime', {
	  enumerable: true,
	  get: function get() {
	    return _LocalTime.LocalTime;
	  }
	});
	
	var _MathUtil = __webpack_require__(4);
	
	Object.defineProperty(exports, 'MathUtil', {
	  enumerable: true,
	  get: function get() {
	    return _MathUtil.MathUtil;
	  }
	});
	
	var _Month = __webpack_require__(29);
	
	Object.defineProperty(exports, 'Month', {
	  enumerable: true,
	  get: function get() {
	    return _Month.Month;
	  }
	});
	
	var _Period = __webpack_require__(30);
	
	Object.defineProperty(exports, 'Period', {
	  enumerable: true,
	  get: function get() {
	    return _Period.Period;
	  }
	});
	
	var _Year = __webpack_require__(31);
	
	Object.defineProperty(exports, 'Year', {
	  enumerable: true,
	  get: function get() {
	    return _Year.Year;
	  }
	});
	
	var _ZoneOffset = __webpack_require__(22);
	
	Object.defineProperty(exports, 'ZoneOffset', {
	  enumerable: true,
	  get: function get() {
	    return _ZoneOffset.ZoneOffset;
	  }
	});

	__webpack_require__(34);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Clock = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _Instant = __webpack_require__(2);
	
	var _ZoneOffset = __webpack_require__(22);
	
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
	
	var Clock = exports.Clock = function () {
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
	}();
	
	var SystemClock = function (_Clock) {
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
	}(Clock);
	
	/**
	 * Implementation of a clock that always returns the latest time from
	 * {@link Date#getTime()}.
	 */
	
	
	var SystemUTCClock = function (_SystemClock) {
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
	}(SystemClock);
	
	/**
	 * Implementation of a clock that always returns the latest time from
	 * sytem default Zone {@link Date#getTime()} and {@link Date#getTimeZoneOffset()}.
	 */
	
	
	var SystemDefaultClock = function (_SystemClock2) {
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
	}(SystemClock);
	
	/**
	 * Implementation of a clock that always returns the same instant.
	 * This is typically used for testing.
	 */
	
	
	var FixedClock = function (_Clock2) {
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
	}(Clock);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Instant = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports._init = _init;
	
	var _ChronoField = __webpack_require__(3);
	
	var _ChronoUnit = __webpack_require__(7);
	
	var _Clock = __webpack_require__(1);
	
	var _errors = __webpack_require__(5);
	
	var _LocalTime = __webpack_require__(11);
	
	var _MathUtil = __webpack_require__(4);
	
	var _TemporalAccessor2 = __webpack_require__(23);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
	// TODO verify the arbitrary values for min/ max seconds, set to 999_999 Years for now
	var MIN_SECONDS = -31619087596800; // -999999-01-01T00:00:00
	var MAX_SECONDS = 31494784780799; // +999999-12-31T23:59:59
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
	
	var Instant = exports.Instant = function (_TemporalAccessor) {
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
	            if ((secondsToAdd | nanosToAdd) === 0) {
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
	}(_TemporalAccessor2.TemporalAccessor);
	
	function _init() {
	    Instant.EPOCH = new Instant(0, 0);
	    Instant.MIN = Instant.ofEpochSecond(MIN_SECONDS, 0);
	    Instant.MAX = Instant.ofEpochSecond(MAX_SECONDS, 999999999);
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ChronoField = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports._init = _init;
	
	var _MathUtil = __webpack_require__(4);
	
	var _ChronoUnit = __webpack_require__(7);
	
	var _TemporalField2 = __webpack_require__(32);
	
	var _ValueRange = __webpack_require__(33);
	
	var _Year = __webpack_require__(31);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
	var ChronoField = exports.ChronoField = function (_TemporalField) {
	    _inherits(ChronoField, _TemporalField);
	
	    function ChronoField(name, baseUnit, rangeUnit, range) {
	        _classCallCheck(this, ChronoField);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChronoField).call(this));
	
	        _this._name = name;
	        _this._baseUnit = baseUnit;
	        _this._rangeUnit = rangeUnit;
	        _this._range = range;
	        return _this;
	    }
	
	    _createClass(ChronoField, [{
	        key: 'name',
	        value: function name() {
	            return this._name;
	        }
	    }, {
	        key: 'baseUnit',
	        value: function baseUnit() {
	            return this._baseUnit;
	        }
	    }, {
	        key: 'rangeUnit',
	        value: function rangeUnit() {
	            return this._rangeUnit;
	        }
	    }, {
	        key: 'range',
	        value: function range() {
	            return this._range;
	        }
	    }, {
	        key: 'displayName',
	        value: function displayName() {
	            return this.toString();
	        }
	    }, {
	        key: 'checkValidValue',
	        value: function checkValidValue(value) {
	            return this.range().checkValidValue(value, this.name());
	        }
	
	        /**
	         * Checks if this field represents a component of a date.
	         *
	         * @return true if it is a component of a date
	         */
	
	    }, {
	        key: 'isDateBased',
	        value: function isDateBased() {
	            var dateBased =
	            //this === ChronoField.DAY_OF_WEEK ||
	            //this === ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH ||
	            //this === ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR ||
	            this === ChronoField.DAY_OF_MONTH || this === ChronoField.DAY_OF_YEAR || this === ChronoField.EPOCH_DAY ||
	            //this === ChronoField.ALIGNED_WEEK_OF_MONTH ||
	            //this === ChronoField.ALIGNED_WEEK_OF_YEAR ||
	            this === ChronoField.MONTH_OF_YEAR ||
	            //this === ChronoField.EPOCH_MONTH ||
	            //this === ChronoField.YEAR_OF_ERA ||
	            this === ChronoField.YEAR || this === ChronoField.ERA;
	            return dateBased;
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
	
	        /**
	         * Checks that the specified value is valid and fits in an {@code int}.
	         * <p>
	         * This validates that the value is within the outer range of valid values
	         * returned by {@link #range()}.
	         * It also checks that all valid values are within the bounds of an {@code int}.
	         * <p>
	         * This method checks against the range of the field in the ISO-8601 calendar system.
	         * This range may be incorrect for other calendar systems.
	         * Use {@link Chronology#range(ChronoField)} to access the correct range
	         * for a different calendar system.
	         *
	         * @param value  the value to check
	         * @return the value that was passed in
	         */
	
	    }, {
	        key: 'checkValidIntValue',
	        value: function checkValidIntValue(value) {
	            return this.range().checkValidIntValue(value, this);
	        }
	    }, {
	        key: 'getFrom',
	        value: function getFrom(temporal) {
	            return temporal.getLong(this);
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return this.name();
	        }
	    }, {
	        key: 'equals',
	        value: function equals(other) {
	            return this === other;
	        }
	    }]);
	
	    return ChronoField;
	}(_TemporalField2.TemporalField);
	
	function _init() {
	
	    ChronoField.NANO_OF_SECOND = new ChronoField('NanoOfSecond', _ChronoUnit.ChronoUnit.NANOS, _ChronoUnit.ChronoUnit.SECONDS, _ValueRange.ValueRange.of(0, 999999999));
	
	    ChronoField.NANO_OF_DAY = new ChronoField('NanoOfDay', _ChronoUnit.ChronoUnit.NANOS, _ChronoUnit.ChronoUnit.DAYS, _ValueRange.ValueRange.of(0, 86400 * 1000000000 - 1));
	
	    ChronoField.MICRO_OF_SECOND = new ChronoField('MicroOfSecond', _ChronoUnit.ChronoUnit.MICROS, _ChronoUnit.ChronoUnit.SECONDS, _ValueRange.ValueRange.of(0, 999999));
	
	    ChronoField.MICRO_OF_DAY = new ChronoField('MicroOfDay', _ChronoUnit.ChronoUnit.MICROS, _ChronoUnit.ChronoUnit.DAYS, _ValueRange.ValueRange.of(0, 86400 * 1000000 - 1));
	
	    ChronoField.MILLI_OF_SECOND = new ChronoField('MilliOfSecond', _ChronoUnit.ChronoUnit.MILLIS, _ChronoUnit.ChronoUnit.SECONDS, _ValueRange.ValueRange.of(0, 999));
	
	    ChronoField.MILLI_OF_DAY = new ChronoField('MilliOfDay', _ChronoUnit.ChronoUnit.MILLIS, _ChronoUnit.ChronoUnit.DAYS, _ValueRange.ValueRange.of(0, 86400 * 1000 - 1));
	
	    ChronoField.SECOND_OF_MINUTE = new ChronoField('SecondOfMinute', _ChronoUnit.ChronoUnit.SECONDS, _ChronoUnit.ChronoUnit.MINUTES, _ValueRange.ValueRange.of(0, 59));
	
	    ChronoField.SECOND_OF_DAY = new ChronoField('SecondOfDay', _ChronoUnit.ChronoUnit.SECONDS, _ChronoUnit.ChronoUnit.DAYS, _ValueRange.ValueRange.of(0, 86400 - 1));
	
	    ChronoField.MINUTE_OF_HOUR = new ChronoField('MinuteOfHour', _ChronoUnit.ChronoUnit.MINUTES, _ChronoUnit.ChronoUnit.HOURS, _ValueRange.ValueRange.of(0, 59));
	
	    ChronoField.MINUTE_OF_DAY = new ChronoField('MinuteOfDay', _ChronoUnit.ChronoUnit.MINUTES, _ChronoUnit.ChronoUnit.DAYS, _ValueRange.ValueRange.of(0, 24 * 60 - 1));
	
	    ChronoField.HOUR_OF_AMPM = new ChronoField('HourOfAmPm', _ChronoUnit.ChronoUnit.HOURS, _ChronoUnit.ChronoUnit.HALF_DAYS, _ValueRange.ValueRange.of(0, 11));
	
	    ChronoField.CLOCK_HOUR_OF_AMPM = new ChronoField('ClockHourOfAmPm', _ChronoUnit.ChronoUnit.HOURS, _ChronoUnit.ChronoUnit.HALF_DAYS, _ValueRange.ValueRange.of(1, 12));
	
	    ChronoField.HOUR_OF_DAY = new ChronoField('HourOfDay', _ChronoUnit.ChronoUnit.HOURS, _ChronoUnit.ChronoUnit.DAYS, _ValueRange.ValueRange.of(0, 23));
	
	    ChronoField.CLOCK_HOUR_OF_DAY = new ChronoField('ClockHourOfDay', _ChronoUnit.ChronoUnit.HOURS, _ChronoUnit.ChronoUnit.DAYS, _ValueRange.ValueRange.of(1, 24));
	
	    ChronoField.AMPM_OF_DAY = new ChronoField('AmPmOfDay', _ChronoUnit.ChronoUnit.HALF_DAYS, _ChronoUnit.ChronoUnit.DAYS, _ValueRange.ValueRange.of(0, 1));
	
	    ChronoField.DAY_OF_WEEK = new ChronoField('DayOfWeek', _ChronoUnit.ChronoUnit.DAYS, _ChronoUnit.ChronoUnit.WEEKS, _ValueRange.ValueRange.of(1, 7));
	
	    ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH = new ChronoField('AlignedDayOfWeekInMonth', _ChronoUnit.ChronoUnit.DAYS, _ChronoUnit.ChronoUnit.WEEKS, _ValueRange.ValueRange.of(1, 7));
	
	    ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR = new ChronoField('AlignedDayOfWeekInYear', _ChronoUnit.ChronoUnit.DAYS, _ChronoUnit.ChronoUnit.WEEKS, _ValueRange.ValueRange.of(1, 7));
	
	    ChronoField.DAY_OF_MONTH = new ChronoField('DayOfMonth', _ChronoUnit.ChronoUnit.DAYS, _ChronoUnit.ChronoUnit.MONTHS, _ValueRange.ValueRange.of(1, 28, 31), 'day');
	
	    ChronoField.DAY_OF_YEAR = new ChronoField('DayOfYear', _ChronoUnit.ChronoUnit.DAYS, _ChronoUnit.ChronoUnit.YEARS, _ValueRange.ValueRange.of(1, 365, 366));
	
	    ChronoField.EPOCH_DAY = new ChronoField('EpochDay', _ChronoUnit.ChronoUnit.DAYS, _ChronoUnit.ChronoUnit.FOREVER, _ValueRange.ValueRange.of(Math.floor(_Year.Year.MIN_VALUE * 365.25), Math.floor(_Year.Year.MAX_VALUE * 365.25)));
	
	    ChronoField.ALIGNED_WEEK_OF_MONTH = new ChronoField('AlignedWeekOfMonth', _ChronoUnit.ChronoUnit.WEEKS, _ChronoUnit.ChronoUnit.MONTHS, _ValueRange.ValueRange.of(1, 4, 5));
	
	    ChronoField.ALIGNED_WEEK_OF_YEAR = new ChronoField('AlignedWeekOfYear', _ChronoUnit.ChronoUnit.WEEKS, _ChronoUnit.ChronoUnit.YEARS, _ValueRange.ValueRange.of(1, 53));
	
	    ChronoField.MONTH_OF_YEAR = new ChronoField('MonthOfYear', _ChronoUnit.ChronoUnit.MONTHS, _ChronoUnit.ChronoUnit.YEARS, _ValueRange.ValueRange.of(1, 12), 'month');
	
	    ChronoField.PROLEPTIC_MONTH = new ChronoField('ProlepticMonth', _ChronoUnit.ChronoUnit.MONTHS, _ChronoUnit.ChronoUnit.FOREVER, _ValueRange.ValueRange.of(_Year.Year.MIN_VALUE * 12, _Year.Year.MAX_VALUE * 12 + 11));
	
	    ChronoField.YEAR_OF_ERA = new ChronoField('YearOfEra', _ChronoUnit.ChronoUnit.YEARS, _ChronoUnit.ChronoUnit.FOREVER, _ValueRange.ValueRange.of(1, _Year.Year.MAX_VALUE, _Year.Year.MAX_VALUE + 1));
	
	    ChronoField.YEAR = new ChronoField('Year', _ChronoUnit.ChronoUnit.YEARS, _ChronoUnit.ChronoUnit.FOREVER, _ValueRange.ValueRange.of(_Year.Year.MIN_VALUE, _Year.Year.MAX_VALUE), 'year');
	
	    ChronoField.ERA = new ChronoField('Era', _ChronoUnit.ChronoUnit.ERAS, _ChronoUnit.ChronoUnit.FOREVER, _ValueRange.ValueRange.of(0, 1));
	
	    ChronoField.INSTANT_SECONDS = new ChronoField('InstantSeconds', _ChronoUnit.ChronoUnit.SECONDS, _ChronoUnit.ChronoUnit.FOREVER, _ValueRange.ValueRange.of(_MathUtil.MIN_SAFE_INTEGER, _MathUtil.MAX_SAFE_INTEGER));
	
	    ChronoField.OFFSET_SECONDS = new ChronoField('OffsetSeconds', _ChronoUnit.ChronoUnit.SECONDS, _ChronoUnit.ChronoUnit.FOREVER, _ValueRange.ValueRange.of(-18 * 3600, 18 * 3600));
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MathUtil = exports.MIN_SAFE_INTEGER = exports.MAX_SAFE_INTEGER = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _errors = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MAX_SAFE_INTEGER = exports.MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : Math.pow(2, 53) - 1; // Number.MAX_SAFE_INTEGER not defined in #@#$%! PhantomJS
	var MIN_SAFE_INTEGER = exports.MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : -(Math.pow(2, 53) - 1); // Number.MIN_SAFE_INTEGER not defined in #@#$%! PhantomJS
	
	/**
	 * Math helper with static function for integer operations
	 */
	
	var MathUtil = exports.MathUtil = function () {
	    function MathUtil() {
	        _classCallCheck(this, MathUtil);
	    }
	
	    _createClass(MathUtil, null, [{
	        key: 'intDiv',
	        value: function intDiv(x, y) {
	            var r = x / y;
	            if (r === 0) {
	                return 0;
	            } else if (r < 0) {
	                return Math.ceil(r);
	            } else {
	                return Math.floor(r);
	            }
	        }
	    }, {
	        key: 'intMod',
	        value: function intMod(x, y) {
	            var r = x - MathUtil.intDiv(x, y) * y;
	            if (r === 0) {
	                return 0;
	            } else if (r < 0) {
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
	                return -1 * _r3;
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
	            if (r < MIN_SAFE_INTEGER || r > MAX_SAFE_INTEGER) {
	                throw new _errors.ArithmeticException('Invalid subtraction beyond MIN_SAFE_INTEGER! ' + x + '-' + y);
	            }
	            return r;
	        }
	    }, {
	        key: 'safeMultiply',
	        value: function safeMultiply(x, y) {
	            if (x === 1) {
	                return y;
	            }
	            if (y === 1) {
	                return x;
	            }
	            if (x === 0 || y === 0) {
	                return 0;
	            }
	            var r = x * y;
	            if (r < MIN_SAFE_INTEGER || r > MAX_SAFE_INTEGER || r / y !== x || x === MIN_SAFE_INTEGER && y === -1 || y === MIN_SAFE_INTEGER && x === -1) {
	                throw new _errors.ArithmeticException('Multiplication overflows: ' + x + ' * ' + y);
	            }
	            return r;
	        }
	    }, {
	        key: 'safeToInt',
	        value: function safeToInt(value) {
	            if (value === 0) {
	                return 0;
	            }
	            if (isNaN(value)) {
	                throw new _errors.ArithmeticException('Invalid int value, using NaN as argument');
	            }
	            if (value > MAX_SAFE_INTEGER || value < MIN_SAFE_INTEGER) {
	                throw new _errors.ArithmeticException('Calculation overflows an int: ' + value);
	            }
	            return value;
	        }
	    }, {
	        key: 'parseInt',
	        value: function (_parseInt) {
	            function parseInt(_x) {
	                return _parseInt.apply(this, arguments);
	            }
	
	            parseInt.toString = function () {
	                return _parseInt.toString();
	            };
	
	            return parseInt;
	        }(function (value) {
	            var int = parseInt(value);
	            if (isNaN(int)) {
	                throw new _errors.ArithmeticException('Invalid int value parse to NaN: ' + value);
	            }
	            if (int > MAX_SAFE_INTEGER || int < MIN_SAFE_INTEGER) {
	                throw new _errors.ArithmeticException('Calculation overflows an int: ' + value);
	            }
	            return int;
	        })
	
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
	}();
	
	MathUtil.MAX_SAFE_INTEGER = MAX_SAFE_INTEGER;
	MathUtil.MIN_SAFE_INTEGER = MIN_SAFE_INTEGER;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.NullPointerException = exports.IllegalArgumentException = exports.ArithmeticException = exports.UnsupportedTemporalTypeException = exports.DateTimeParseException = exports.DateTimeException = undefined;
	
	var _es6Error = __webpack_require__(6);
	
	var _es6Error2 = _interopRequireDefault(_es6Error);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
	var DateTimeException = exports.DateTimeException = function (_ExtendableError) {
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
	}(_es6Error2.default);
	
	var DateTimeParseException = exports.DateTimeParseException = function (_ExtendableError2) {
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
	}(_es6Error2.default);
	
	var UnsupportedTemporalTypeException = exports.UnsupportedTemporalTypeException = function (_DateTimeException) {
	    _inherits(UnsupportedTemporalTypeException, _DateTimeException);
	
	    function UnsupportedTemporalTypeException() {
	        var message = arguments.length <= 0 || arguments[0] === undefined ? 'UnsupportedTemporalTypeException' : arguments[0];
	
	        _classCallCheck(this, UnsupportedTemporalTypeException);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(UnsupportedTemporalTypeException).call(this, message));
	    }
	
	    return UnsupportedTemporalTypeException;
	}(DateTimeException);
	
	var ArithmeticException = exports.ArithmeticException = function (_ExtendableError3) {
	    _inherits(ArithmeticException, _ExtendableError3);
	
	    function ArithmeticException() {
	        var message = arguments.length <= 0 || arguments[0] === undefined ? 'ArithmeticException' : arguments[0];
	
	        _classCallCheck(this, ArithmeticException);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ArithmeticException).call(this, message));
	    }
	
	    return ArithmeticException;
	}(_es6Error2.default);
	
	var IllegalArgumentException = exports.IllegalArgumentException = function (_ExtendableError4) {
	    _inherits(IllegalArgumentException, _ExtendableError4);
	
	    function IllegalArgumentException() {
	        var message = arguments.length <= 0 || arguments[0] === undefined ? 'IllegalArgumentException' : arguments[0];
	
	        _classCallCheck(this, IllegalArgumentException);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(IllegalArgumentException).call(this, message));
	    }
	
	    return IllegalArgumentException;
	}(_es6Error2.default);
	
	var NullPointerException = exports.NullPointerException = function (_ExtendableError5) {
	    _inherits(NullPointerException, _ExtendableError5);
	
	    function NullPointerException() {
	        var message = arguments.length <= 0 || arguments[0] === undefined ? 'NullPointerException' : arguments[0];
	
	        _classCallCheck(this, NullPointerException);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NullPointerException).call(this, message));
	    }
	
	    return NullPointerException;
	}(_es6Error2.default);

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ChronoUnit = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	exports._init = _init;
	
	var _Duration = __webpack_require__(8);
	
	var _Year = __webpack_require__(31);
	
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
	
	var ChronoUnit /*implements TemporalUnit*/ = exports.ChronoUnit = function () {
	
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
	}();
	
	function _init() {
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
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Duration = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports._init = _init;
	
	var _assert = __webpack_require__(9);
	
	var _errors = __webpack_require__(5);
	
	var _MathUtil = __webpack_require__(4);
	
	var _ChronoField = __webpack_require__(3);
	
	var _ChronoUnit = __webpack_require__(7);
	
	var _TemporalAmount2 = __webpack_require__(10);
	
	var _LocalTime = __webpack_require__(11);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
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
	
	var Duration = exports.Duration = function (_TemporalAmount) {
	    _inherits(Duration, _TemporalAmount);
	
	    /**
	     * Constructs an instance of {@code Duration} using seconds and nanoseconds.
	     *
	     * @param {Number} seconds  the length of the duration in seconds, positive or negative
	     * @param {Number} nanos  the nanoseconds within the second, from 0 to 999,999,999
	     */
	    //TODO: private ?
	
	    function Duration(seconds, nanos) {
	        _classCallCheck(this, Duration);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Duration).call(this));
	
	        _this._seconds = seconds;
	        _this._nanos = nanos;
	        return _this;
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
	            return (this._seconds | this._nanos) === 0;
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
	            if (unit === _ChronoUnit.ChronoUnit.DAYS) {
	                return this.plusSecondsNanos(_MathUtil.MathUtil.safeMultiply(amountToAdd, _LocalTime.LocalTime.SECONDS_PER_DAY), 0);
	            }
	            if (unit.isDurationEstimated()) {
	                throw new _errors.UnsupportedTemporalTypeException('Unit must not have an estimated duration');
	            }
	            if (amountToAdd === 0) {
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
	            if ((secondsToAdd | nanosToAdd) === 0) {
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
	            if (secsToSubtract === _MathUtil.MIN_SAFE_INTEGER) {
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
	            return amountToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusAmountUnit(_MathUtil.MAX_SAFE_INTEGER, unit).plus(1, unit) : this.plusAmountUnit(-amountToSubtract, unit);
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
	            return daysToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusDays(_MathUtil.MAX_SAFE_INTEGER).plusDays(1) : this.plusDays(-daysToSubtract);
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
	            return hoursToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusHours(_MathUtil.MAX_SAFE_INTEGER).plusHours(1) : this.plusHours(-hoursToSubtract);
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
	            return minutesToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusMinutes(_MathUtil.MAX_SAFE_INTEGER).plusMinutes(1) : this.plusMinutes(-minutesToSubtract);
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
	            return secondsToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusSeconds(_MathUtil.MAX_SAFE_INTEGER).plusSeconds(1) : this.plusSeconds(-secondsToSubtract);
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
	            return millisToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusMillis(_MathUtil.MAX_SAFE_INTEGER).plusMillis(1) : this.plusMillis(-millisToSubtract);
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
	            return nanosToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusNanos(_MathUtil.MAX_SAFE_INTEGER).plusNanos(1) : this.plusNanos(-nanosToSubtract);
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
	            if (multiplicand === 0) {
	                return Duration.ZERO;
	            }
	            if (multiplicand === 1) {
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
	            if (divisor === 0) {
	                throw new _errors.ArithmeticException('Cannot divide by zero');
	            }
	            if (divisor === 1) {
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
	            (0, _assert.requireNonNull)(temporal, 'temporal');
	            if (this._seconds !== 0) {
	                temporal = temporal.plus(this._seconds, _ChronoUnit.ChronoUnit.SECONDS);
	            }
	            if (this._nanos !== 0) {
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
	            (0, _assert.requireNonNull)(temporal, 'temporal');
	            if (this._seconds !== 0) {
	                temporal = temporal.minus(this._seconds, _ChronoUnit.ChronoUnit.SECONDS);
	            }
	            if (this._nanos !== 0) {
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
	            (0, _assert.requireInstance)(otherDuration, Duration, 'otherDuration');
	            var cmp = _MathUtil.MathUtil.compareNumbers(this._seconds, otherDuration.seconds());
	            if (cmp !== 0) {
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
	                return this.seconds() === otherDuration.seconds() && this.nano() === otherDuration.nano();
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
	            if (hours !== 0) {
	                rval += hours + 'H';
	            }
	            if (minutes !== 0) {
	                rval += minutes + 'M';
	            }
	            if (secs === 0 && this._nanos === 0 && rval.length > 2) {
	                return rval;
	            }
	            if (secs < 0 && this._nanos > 0) {
	                if (secs === -1) {
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
	                while (rval.charAt(rval.length - 1) === '0') {
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
	                    } else if (secs === 0 && nanos !== 0) {
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
	                if ('T' === matches[3] === false) {
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
	                        var negativeSecs = secondMatch != null && secondMatch.charAt(0) === '-';
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
	            if (parsed == null || parsed.length === 0) {
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
	            if (arguments.length === 1) {
	                return Duration.createSeconds(arguments[0]);
	            } else if (arguments.length === 2) {
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
	
	            if ((seconds | nanoAdjustment) === 0) {
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
	}(_TemporalAmount2.TemporalAmount
	/*implements TemporalAmount, Comparable<Duration>, Serializable */);
	
	function _init() {
	    /**
	     * Constant for a duration of zero.
	     */
	    Duration.ZERO = new Duration(0, 0);
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.assert = assert;
	exports.requireNonNull = requireNonNull;
	exports.requireInstance = requireInstance;
	
	var _errors = __webpack_require__(5);
	
	function assert(assertion, msg, error) {
	    if (!assertion) {
	        if (error) {
	            throw new error(msg);
	        } else {
	            throw new Error(msg);
	        }
	    }
	} /**
	   * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	   * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	   */
	
	
	function requireNonNull(value, parameterName) {
	    if (value == null) {
	        throw new _errors.NullPointerException(parameterName + ' must not be null');
	    }
	    return value;
	}
	
	function requireInstance(value, _class, parameterName) {
	    if (!(value instanceof _class)) {
	        throw new _errors.IllegalArgumentException(parameterName + ' must be an instance of ' + (_class.name ? _class.name : _class));
	    }
	    return value;
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
	 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	 */
	
	var TemporalAmount = exports.TemporalAmount = function TemporalAmount() {
	  _classCallCheck(this, TemporalAmount);
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LocalTime = undefined;
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports._init = _init;
	
	var _MathUtil = __webpack_require__(4);
	
	var _assert = __webpack_require__(9);
	
	var _errors = __webpack_require__(5);
	
	var _Clock = __webpack_require__(1);
	
	var _DateTimeFormatter = __webpack_require__(12);
	
	var _ChronoField = __webpack_require__(3);
	
	var _ChronoUnit = __webpack_require__(7);
	
	var _TemporalAccessor2 = __webpack_require__(23);
	
	var _TemporalQueries = __webpack_require__(21);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	/**
	 * A time without time-zone in the ISO-8601 calendar system,
	 * such as {@code 10:15:30}.
	 * <p>
	 * {@code LocalTime} is an immutable date-time object that represents a time,
	 * often viewed as hour-minute-second.
	 * Time is represented to nanosecond precision.
	 * For example, the value '13:45.30.123456789' can be stored in a {@code LocalTime}.
	 * <p>
	 * It does not store or represent a date or time-zone.
	 * Instead, it is a description of the local time as seen on a wall clock.
	 * It cannot represent an instant on the time-line without additional information
	 * such as an offset or time-zone.
	 * <p>
	 * The ISO-8601 calendar system is the modern civil calendar system used today
	 * in most of the world. This API assumes that all calendar systems use the same
	 * representation, this class, for time-of-day.
	 *
	 * <h3>Specification for implementors</h3>
	 * This class is immutable and thread-safe.
	 */
	
	var LocalTime = function (_TemporalAccessor) {
	    _inherits(LocalTime, _TemporalAccessor);
	
	    _createClass(LocalTime, null, [{
	        key: 'now',
	
	        /**
	         * Obtains the current time from the specified clock.
	         * <p>
	         * This will query the specified clock to obtain the current time.
	         * Using this method allows the use of an alternate clock for testing.
	         * The alternate clock may be introduced using {@link Clock dependency injection}.
	         *
	         * @param clock  the clock to use, not null
	         * @return the current time, not null
	         */
	        value: function now() {
	            var clock = arguments.length <= 0 || arguments[0] === undefined ? _Clock.Clock.systemDefaultZone() : arguments[0];
	
	            (0, _assert.requireNonNull)(clock, 'clock');
	            // inline OffsetTime factory to avoid creating object and InstantProvider checks
	            var now = clock.instant(); // called once
	            var offset = clock.offset(now);
	            var secsOfDay = _MathUtil.MathUtil.intMod(now.epochSecond(), LocalTime.SECONDS_PER_DAY);
	            secsOfDay = _MathUtil.MathUtil.intMod(secsOfDay + offset.totalSeconds(), LocalTime.SECONDS_PER_DAY);
	            if (secsOfDay < 0) {
	                secsOfDay += LocalTime.SECONDS_PER_DAY;
	            }
	            return LocalTime.ofSecondOfDay(secsOfDay, now.nano());
	        }
	
	        /**
	         * Obtains an instance of {@code LocalTime} from an hour, minute, second and nanosecond.
	         * <p>
	         * This factory may return a cached value, but applications must not rely on this.
	         *
	         * @param hour  the hour-of-day to represent, from 0 to 23
	         * @param minute  the minute-of-hour to represent, from 0 to 59
	         * @param second  the second-of-minute to represent, from 0 to 59
	         * @param nanoOfSecond  the nano-of-second to represent, from 0 to 999,999,999
	         * @return the local time, not null
	         * @throws DateTimeException if the value of any field is out of range
	         */
	
	    }, {
	        key: 'of',
	        value: function of(hour, minute, second, nanoOfSecond) {
	            return new LocalTime(hour, minute, second, nanoOfSecond);
	        }
	
	        /**
	         * Obtains an instance of {@code LocalTime} from a second-of-day value, with
	         * associated nanos of second.
	         * <p>
	         * This factory may return a cached value, but applications must not rely on this.
	         *
	         * @param secondOfDay  the second-of-day, from {@code 0} to {@code 24 * 60 * 60 - 1}
	         * @param nanoOfSecond  the nano-of-second, from 0 to 999,999,999
	         * @return the local time, not null
	         * @throws DateTimeException if the either input value is invalid
	         */
	
	    }, {
	        key: 'ofSecondOfDay',
	        value: function ofSecondOfDay() {
	            var secondOfDay = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	            var nanoOfSecond = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	            _ChronoField.ChronoField.SECOND_OF_DAY.checkValidValue(secondOfDay);
	            _ChronoField.ChronoField.NANO_OF_SECOND.checkValidValue(nanoOfSecond);
	            var hours = _MathUtil.MathUtil.intDiv(secondOfDay, LocalTime.SECONDS_PER_HOUR);
	            secondOfDay -= hours * LocalTime.SECONDS_PER_HOUR;
	            var minutes = _MathUtil.MathUtil.intDiv(secondOfDay, LocalTime.SECONDS_PER_MINUTE);
	            secondOfDay -= minutes * LocalTime.SECONDS_PER_MINUTE;
	            return new LocalTime(hours, minutes, secondOfDay, nanoOfSecond);
	        }
	
	        /**
	         * Obtains an instance of {@code LocalTime} from a nanos-of-day value.
	         * <p>
	         * This factory may return a cached value, but applications must not rely on this.
	         *
	         * @param nanoOfDay  the nano of day, from {@code 0} to {@code 24 * 60 * 60 * 1,000,000,000 - 1}
	         * @return the local time, not null
	         * @throws DateTimeException if the nanos of day value is invalid
	         */
	
	    }, {
	        key: 'ofNanoOfDay',
	        value: function ofNanoOfDay() {
	            var nanoOfDay = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	            _ChronoField.ChronoField.NANO_OF_DAY.checkValidValue(nanoOfDay);
	            var hours = _MathUtil.MathUtil.intDiv(nanoOfDay, LocalTime.NANOS_PER_HOUR);
	            nanoOfDay -= hours * LocalTime.NANOS_PER_HOUR;
	            var minutes = _MathUtil.MathUtil.intDiv(nanoOfDay, LocalTime.NANOS_PER_MINUTE);
	            nanoOfDay -= minutes * LocalTime.NANOS_PER_MINUTE;
	            var seconds = _MathUtil.MathUtil.intDiv(nanoOfDay, LocalTime.NANOS_PER_SECOND);
	            nanoOfDay -= seconds * LocalTime.NANOS_PER_SECOND;
	            return new LocalTime(hours, minutes, seconds, nanoOfDay);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Obtains an instance of {@code LocalTime} from a temporal object.
	         * <p>
	         * A {@code TemporalAccessor} represents some form of date and time information.
	         * This factory converts the arbitrary temporal object to an instance of {@code LocalTime}.
	         * <p>
	         * The conversion uses the {@link TemporalQueries#localTime()} query, which relies
	         * on extracting the {@link ChronoField#NANO_OF_DAY NANO_OF_DAY} field.
	         * <p>
	         * This method matches the signature of the functional interface {@link TemporalQuery}
	         * allowing it to be used in queries via method reference, {@code LocalTime::from}.
	         *
	         * @param temporal  the temporal object to convert, not null
	         * @return the local time, not null
	         * @throws DateTimeException if unable to convert to a {@code LocalTime}
	         */
	
	    }, {
	        key: 'from',
	        value: function from(temporal) {
	            (0, _assert.requireNonNull)(temporal, 'temporal');
	            var time = temporal.query(_TemporalQueries.TemporalQueries.localTime());
	            if (time == null) {
	                throw new _errors.DateTimeException('Unable to obtain LocalTime from TemporalAccessor: ' + temporal + ', type ' + temporal);
	            }
	            return time;
	        }
	
	        /**
	         * Obtains an instance of {@code LocalTime} from a text string using a specific formatter.
	         * <p>
	         * The text is parsed using the formatter, returning a time.
	         *
	         * @param text  the text to parse, not null
	         * @param formatter  the formatter to use, not null
	         * @return the parsed local time, not null
	         * @throws DateTimeParseException if the text cannot be parsed
	         */
	
	    }, {
	        key: 'parse',
	        value: function parse(text) {
	            var formatter = arguments.length <= 1 || arguments[1] === undefined ? _DateTimeFormatter.DateTimeFormatter.ISO_LOCAL_TIME : arguments[1];
	
	            (0, _assert.requireNonNull)(formatter, 'formatter');
	            return formatter.parse(text, LocalTime.FROM);
	        }
	
	        /**
	         * Constructor, previously validated.
	         *
	         * @param hour  the hour-of-day to represent, validated from 0 to 23
	         * @param minute  the minute-of-hour to represent, validated from 0 to 59
	         * @param second  the second-of-minute to represent, validated from 0 to 59
	         * @param nanoOfSecond  the nano-of-second to represent, validated from 0 to 999,999,999
	         */
	
	    }]);
	
	    function LocalTime() {
	        var hour = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var minute = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	        var second = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	        var nanoOfSecond = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	
	        _classCallCheck(this, LocalTime);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LocalTime).call(this));
	
	        LocalTime._validate(hour, minute, second, nanoOfSecond);
	        if ((minute | second | nanoOfSecond) === 0) {
	            var _ret;
	
	            return _ret = LocalTime.HOURS[hour], _possibleConstructorReturn(_this, _ret);
	        }
	        _this._hour = hour;
	        _this._minute = minute;
	        _this._second = second;
	        _this._nano = nanoOfSecond;
	        return _this;
	    }
	
	    _createClass(LocalTime, [{
	        key: 'isSupported',
	
	        //-----------------------------------------------------------------------
	        /**
	         * Checks if the specified field is supported.
	         * <p>
	         * This checks if this time can be queried for the specified field.
	         * If false, then calling the {@link #range(TemporalField) range} and
	         * {@link #get(TemporalField) get} methods will throw an exception.
	         * <p>
	         * If the field is a {@link ChronoField} then the query is implemented here.
	         * The supported fields are:
	         * <ul>
	         * <li>{@code NANO_OF_SECOND}
	         * <li>{@code NANO_OF_DAY}
	         * <li>{@code MICRO_OF_SECOND}
	         * <li>{@code MICRO_OF_DAY}
	         * <li>{@code MILLI_OF_SECOND}
	         * <li>{@code MILLI_OF_DAY}
	         * <li>{@code SECOND_OF_MINUTE}
	         * <li>{@code SECOND_OF_DAY}
	         * <li>{@code MINUTE_OF_HOUR}
	         * <li>{@code MINUTE_OF_DAY}
	         * <li>{@code HOUR_OF_AMPM}
	         * <li>{@code CLOCK_HOUR_OF_AMPM}
	         * <li>{@code HOUR_OF_DAY}
	         * <li>{@code CLOCK_HOUR_OF_DAY}
	         * <li>{@code AMPM_OF_DAY}
	         * </ul>
	         * All other {@code ChronoField} instances will return false.
	         * <p>
	         * If the field is not a {@code ChronoField}, then the result of this method
	         * is obtained by invoking {@code TemporalField.isSupportedBy(TemporalAccessor)}
	         * passing {@code this} as the argument.
	         * Whether the field is supported is determined by the field.
	         *
	         * @param fieldOrUnit  the field to check, null returns false
	         * @return true if the field is supported on this time, false if not
	         */
	        value: function isSupported(fieldOrUnit) {
	            if (fieldOrUnit instanceof _ChronoField.ChronoField) {
	                return fieldOrUnit.isTimeBased();
	            } else if (fieldOrUnit instanceof _ChronoUnit.ChronoUnit) {
	                return fieldOrUnit.isTimeBased();
	            }
	            return fieldOrUnit != null && fieldOrUnit.isSupportedBy(this);
	        }
	
	        /**
	         * Gets the range of valid values for the specified field.
	         * <p>
	         * The range object expresses the minimum and maximum valid values for a field.
	         * This time is used to enhance the accuracy of the returned range.
	         * If it is not possible to return the range, because the field is not supported
	         * or for some other reason, an exception is thrown.
	         * <p>
	         * If the field is a {@link ChronoField} then the query is implemented here.
	         * The {@link #isSupported(TemporalField) supported fields} will return
	         * appropriate range instances.
	         * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
	         * <p>
	         * If the field is not a {@code ChronoField}, then the result of this method
	         * is obtained by invoking {@code TemporalField.rangeRefinedBy(TemporalAccessor)}
	         * passing {@code this} as the argument.
	         * Whether the range can be obtained is determined by the field.
	         *
	         * @param field  the field to query the range for, not null
	         * @return the range of valid values for the field, not null
	         * @throws DateTimeException if the range for the field cannot be obtained
	         */
	
	    }, {
	        key: 'range',
	        value: function range(field) {
	            (0, _assert.requireNonNull)(field);
	            return _get(Object.getPrototypeOf(LocalTime.prototype), 'range', this).call(this, field);
	        }
	
	        /**
	         * Gets the value of the specified field from this time as an {@code int}.
	         * <p>
	         * This queries this time for the value for the specified field.
	         * The returned value will always be within the valid range of values for the field.
	         * If it is not possible to return the value, because the field is not supported
	         * or for some other reason, an exception is thrown.
	         * <p>
	         * If the field is a {@link ChronoField} then the query is implemented here.
	         * The {@link #isSupported(TemporalField) supported fields} will return valid
	         * values based on this time, except {@code NANO_OF_DAY} and {@code MICRO_OF_DAY}
	         * which are too large to fit in an {@code int} and throw a {@code DateTimeException}.
	         * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
	         * <p>
	         * If the field is not a {@code ChronoField}, then the result of this method
	         * is obtained by invoking {@code TemporalField.getFrom(TemporalAccessor)}
	         * passing {@code this} as the argument. Whether the value can be obtained,
	         * and what the value represents, is determined by the field.
	         *
	         * @param field  the field to get, not null
	         * @return the value for the field
	         * @throws DateTimeException if a value for the field cannot be obtained
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'get',
	        value: function get(field) {
	            return this.getLong(field);
	        }
	
	        /**
	         * Gets the value of the specified field from this time as a {@code long}.
	         * <p>
	         * This queries this time for the value for the specified field.
	         * If it is not possible to return the value, because the field is not supported
	         * or for some other reason, an exception is thrown.
	         * <p>
	         * If the field is a {@link ChronoField} then the query is implemented here.
	         * The {@link #isSupported(TemporalField) supported fields} will return valid
	         * values based on this time.
	         * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
	         * <p>
	         * If the field is not a {@code ChronoField}, then the result of this method
	         * is obtained by invoking {@code TemporalField.getFrom(TemporalAccessor)}
	         * passing {@code this} as the argument. Whether the value can be obtained,
	         * and what the value represents, is determined by the field.
	         *
	         * @param field  the field to get, not null
	         * @return the value for the field
	         * @throws DateTimeException if a value for the field cannot be obtained
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'getLong',
	        value: function getLong(field) {
	            (0, _assert.requireNonNull)(field, 'field');
	            if (field instanceof _ChronoField.ChronoField) {
	                return this._get0(field);
	            }
	            return field.getFrom(this);
	        }
	    }, {
	        key: '_get0',
	        value: function _get0(field) {
	            switch (field) {
	                case _ChronoField.ChronoField.NANO_OF_SECOND:
	                    return this._nano;
	                case _ChronoField.ChronoField.NANO_OF_DAY:
	                    return this.toNanoOfDay();
	                case _ChronoField.ChronoField.MICRO_OF_SECOND:
	                    return _MathUtil.MathUtil.intDiv(this._nano, 1000);
	                case _ChronoField.ChronoField.MICRO_OF_DAY:
	                    return _MathUtil.MathUtil.intDiv(this.toNanoOfDay(), 1000);
	                case _ChronoField.ChronoField.MILLI_OF_SECOND:
	                    return _MathUtil.MathUtil.intDiv(this._nano, 1000000);
	                case _ChronoField.ChronoField.MILLI_OF_DAY:
	                    return _MathUtil.MathUtil.intDiv(this.toNanoOfDay(), 1000000);
	                case _ChronoField.ChronoField.SECOND_OF_MINUTE:
	                    return this._second;
	                case _ChronoField.ChronoField.SECOND_OF_DAY:
	                    return this.toSecondOfDay();
	                case _ChronoField.ChronoField.MINUTE_OF_HOUR:
	                    return this._minute;
	                case _ChronoField.ChronoField.MINUTE_OF_DAY:
	                    return this._hour * 60 + this._minute;
	                case _ChronoField.ChronoField.HOUR_OF_AMPM:
	                    return this._hour % 12;
	                case _ChronoField.ChronoField.CLOCK_HOUR_OF_AMPM:
	                    var ham = _MathUtil.MathUtil.intMod(this._hour, 12);return ham % 12 === 0 ? 12 : ham;
	                case _ChronoField.ChronoField.HOUR_OF_DAY:
	                    return this._hour;
	                case _ChronoField.ChronoField.CLOCK_HOUR_OF_DAY:
	                    return this._hour === 0 ? 24 : this._hour;
	                case _ChronoField.ChronoField.AMPM_OF_DAY:
	                    return this._hour / 12;
	            }
	            throw new _errors.UnsupportedTemporalTypeException('Unsupported field: ' + field);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Gets the hour-of-day field.
	         *
	         * @return the hour-of-day, from 0 to 23
	         */
	
	    }, {
	        key: 'hour',
	        value: function hour() {
	            return this._hour;
	        }
	
	        /**
	         * Gets the minute-of-hour field.
	         *
	         * @return the minute-of-hour, from 0 to 59
	         */
	
	    }, {
	        key: 'minute',
	        value: function minute() {
	            return this._minute;
	        }
	
	        /**
	         * Gets the second-of-minute field.
	         *
	         * @return the second-of-minute, from 0 to 59
	         */
	
	    }, {
	        key: 'second',
	        value: function second() {
	            return this._second;
	        }
	
	        /**
	         * Gets the nano-of-second field.
	         *
	         * @return the nano-of-second, from 0 to 999,999,999
	         */
	
	    }, {
	        key: 'nano',
	        value: function nano() {
	            return this._nano;
	        }
	
	        /**
	         * functional overloading for with
	         */
	
	    }, {
	        key: 'with',
	        value: function _with() {
	            if (arguments.length < 2) {
	                return this._with1.apply(this, arguments);
	            } else {
	                return this._with2.apply(this, arguments);
	            }
	        }
	
	        /**
	         * Returns an adjusted copy of this time.
	         * <p>
	         * This returns a new {@code LocalTime}, based on this one, with the time adjusted.
	         * The adjustment takes place using the specified adjuster strategy object.
	         * Read the documentation of the adjuster to understand what adjustment will be made.
	         * <p>
	         * A simple adjuster might simply set the one of the fields, such as the hour field.
	         * A more complex adjuster might set the time to the last hour of the day.
	         * <p>
	         * The result of this method is obtained by invoking the
	         * {@link TemporalAdjuster#adjustInto(Temporal)} method on the
	         * specified adjuster passing {@code this} as the argument.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param adjuster the adjuster to use, not null
	         * @return a {@code LocalTime} based on {@code this} with the adjustment made, not null
	         * @throws DateTimeException if the adjustment cannot be made
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: '_with1',
	        value: function _with1(adjuster) {
	            (0, _assert.requireNonNull)(adjuster, 'adjuster');
	            // optimizations
	            if (adjuster instanceof LocalTime) {
	                return adjuster;
	            }
	            (0, _assert.assert)(typeof adjuster.adjustInto === 'function', 'adjuster', _errors.IllegalArgumentException);
	            return adjuster.adjustInto(this);
	        }
	
	        /**
	         * Returns a copy of this time with the specified field set to a new value.
	         * <p>
	         * This returns a new {@code LocalTime}, based on this one, with the value
	         * for the specified field changed.
	         * This can be used to change any supported field, such as the hour, minute or second.
	         * If it is not possible to set the value, because the field is not supported or for
	         * some other reason, an exception is thrown.
	         * <p>
	         * If the field is a {@link ChronoField} then the adjustment is implemented here.
	         * The supported fields behave as follows:
	         * <ul>
	         * <li>{@code NANO_OF_SECOND} -
	         *  Returns a {@code LocalTime} with the specified nano-of-second.
	         *  The hour, minute and second will be unchanged.
	         * <li>{@code NANO_OF_DAY} -
	         *  Returns a {@code LocalTime} with the specified nano-of-day.
	         *  This completely replaces the time and is equivalent to {@link #ofNanoOfDay(long)}.
	         * <li>{@code MICRO_OF_SECOND} -
	         *  Returns a {@code LocalTime} with the nano-of-second replaced by the specified
	         *  micro-of-second multiplied by 1,000.
	         *  The hour, minute and second will be unchanged.
	         * <li>{@code MICRO_OF_DAY} -
	         *  Returns a {@code LocalTime} with the specified micro-of-day.
	         *  This completely replaces the time and is equivalent to using {@link #ofNanoOfDay(long)}
	         *  with the micro-of-day multiplied by 1,000.
	         * <li>{@code MILLI_OF_SECOND} -
	         *  Returns a {@code LocalTime} with the nano-of-second replaced by the specified
	         *  milli-of-second multiplied by 1,000,000.
	         *  The hour, minute and second will be unchanged.
	         * <li>{@code MILLI_OF_DAY} -
	         *  Returns a {@code LocalTime} with the specified milli-of-day.
	         *  This completely replaces the time and is equivalent to using {@link #ofNanoOfDay(long)}
	         *  with the milli-of-day multiplied by 1,000,000.
	         * <li>{@code SECOND_OF_MINUTE} -
	         *  Returns a {@code LocalTime} with the specified second-of-minute.
	         *  The hour, minute and nano-of-second will be unchanged.
	         * <li>{@code SECOND_OF_DAY} -
	         *  Returns a {@code LocalTime} with the specified second-of-day.
	         *  The nano-of-second will be unchanged.
	         * <li>{@code MINUTE_OF_HOUR} -
	         *  Returns a {@code LocalTime} with the specified minute-of-hour.
	         *  The hour, second-of-minute and nano-of-second will be unchanged.
	         * <li>{@code MINUTE_OF_DAY} -
	         *  Returns a {@code LocalTime} with the specified minute-of-day.
	         *  The second-of-minute and nano-of-second will be unchanged.
	         * <li>{@code HOUR_OF_AMPM} -
	         *  Returns a {@code LocalTime} with the specified hour-of-am-pm.
	         *  The AM/PM, minute-of-hour, second-of-minute and nano-of-second will be unchanged.
	         * <li>{@code CLOCK_HOUR_OF_AMPM} -
	         *  Returns a {@code LocalTime} with the specified clock-hour-of-am-pm.
	         *  The AM/PM, minute-of-hour, second-of-minute and nano-of-second will be unchanged.
	         * <li>{@code HOUR_OF_DAY} -
	         *  Returns a {@code LocalTime} with the specified hour-of-day.
	         *  The minute-of-hour, second-of-minute and nano-of-second will be unchanged.
	         * <li>{@code CLOCK_HOUR_OF_DAY} -
	         *  Returns a {@code LocalTime} with the specified clock-hour-of-day.
	         *  The minute-of-hour, second-of-minute and nano-of-second will be unchanged.
	         * <li>{@code AMPM_OF_DAY} -
	         *  Returns a {@code LocalTime} with the specified AM/PM.
	         *  The hour-of-am-pm, minute-of-hour, second-of-minute and nano-of-second will be unchanged.
	         * </ul>
	         * <p>
	         * In all cases, if the new value is outside the valid range of values for the field
	         * then a {@code DateTimeException} will be thrown.
	         * <p>
	         * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
	         * <p>
	         * If the field is not a {@code ChronoField}, then the result of this method
	         * is obtained by invoking {@code TemporalField.adjustInto(Temporal, long)}
	         * passing {@code this} as the argument. In this case, the field determines
	         * whether and how to adjust the instant.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param field  the field to set in the result, not null
	         * @param newValue  the new value of the field in the result
	         * @return a {@code LocalTime} based on {@code this} with the specified field set, not null
	         * @throws DateTimeException if the field cannot be set
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: '_with2',
	        value: function _with2(field, newValue) {
	            (0, _assert.requireNonNull)(field, 'field');
	            if (field instanceof _ChronoField.ChronoField) {
	                field.checkValidValue(newValue);
	                switch (field) {
	                    case _ChronoField.ChronoField.NANO_OF_SECOND:
	                        return this.withNano(newValue);
	                    case _ChronoField.ChronoField.NANO_OF_DAY:
	                        return LocalTime.ofNanoOfDay(newValue);
	                    case _ChronoField.ChronoField.MICRO_OF_SECOND:
	                        return this.withNano(newValue * 1000);
	                    case _ChronoField.ChronoField.MICRO_OF_DAY:
	                        return LocalTime.ofNanoOfDay(newValue * 1000);
	                    case _ChronoField.ChronoField.MILLI_OF_SECOND:
	                        return this.withNano(newValue * 1000000);
	                    case _ChronoField.ChronoField.MILLI_OF_DAY:
	                        return LocalTime.ofNanoOfDay(newValue * 1000000);
	                    case _ChronoField.ChronoField.SECOND_OF_MINUTE:
	                        return this.withSecond(newValue);
	                    case _ChronoField.ChronoField.SECOND_OF_DAY:
	                        return this.plusSeconds(newValue - this.toSecondOfDay());
	                    case _ChronoField.ChronoField.MINUTE_OF_HOUR:
	                        return this.withMinute(newValue);
	                    case _ChronoField.ChronoField.MINUTE_OF_DAY:
	                        return this.plusMinutes(newValue - (this._hour * 60 + this._minute));
	                    case _ChronoField.ChronoField.HOUR_OF_AMPM:
	                        return this.plusHours(newValue - _MathUtil.MathUtil.intMod(this._hour, 12));
	                    case _ChronoField.ChronoField.CLOCK_HOUR_OF_AMPM:
	                        return this.plusHours((newValue === 12 ? 0 : newValue) - _MathUtil.MathUtil.intMod(this._hour, 12));
	                    case _ChronoField.ChronoField.HOUR_OF_DAY:
	                        return this.withHour(newValue);
	                    case _ChronoField.ChronoField.CLOCK_HOUR_OF_DAY:
	                        return this.withHour(newValue === 24 ? 0 : newValue);
	                    case _ChronoField.ChronoField.AMPM_OF_DAY:
	                        return this.plusHours((newValue - _MathUtil.MathUtil.intDiv(this._hour, 12)) * 12);
	                }
	                throw new _errors.UnsupportedTemporalTypeException('Unsupported field: ' + field);
	            }
	            return field.adjustInto(this, newValue);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Returns a copy of this {@code LocalTime} with the hour-of-day value altered.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param hour  the hour-of-day to set in the result, from 0 to 23
	         * @return a {@code LocalTime} based on this time with the requested hour, not null
	         * @throws DateTimeException if the hour value is invalid
	         */
	
	    }, {
	        key: 'withHour',
	        value: function withHour() {
	            var hour = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	            if (this._hour === hour) {
	                return this;
	            }
	            return new LocalTime(hour, this._minute, this._second, this._nano);
	        }
	
	        /**
	         * Returns a copy of this {@code LocalTime} with the minute-of-hour value altered.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param minute  the minute-of-hour to set in the result, from 0 to 59
	         * @return a {@code LocalTime} based on this time with the requested minute, not null
	         * @throws DateTimeException if the minute value is invalid
	         */
	
	    }, {
	        key: 'withMinute',
	        value: function withMinute() {
	            var minute = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	            if (this._minute === minute) {
	                return this;
	            }
	            return new LocalTime(this._hour, minute, this._second, this._nano);
	        }
	
	        /**
	         * Returns a copy of this {@code LocalTime} with the second-of-minute value altered.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param second  the second-of-minute to set in the result, from 0 to 59
	         * @return a {@code LocalTime} based on this time with the requested second, not null
	         * @throws DateTimeException if the second value is invalid
	         */
	
	    }, {
	        key: 'withSecond',
	        value: function withSecond() {
	            var second = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	            if (this._second === second) {
	                return this;
	            }
	            return new LocalTime(this._hour, this._minute, second, this._nano);
	        }
	
	        /**
	         * Returns a copy of this {@code LocalTime} with the nano-of-second value altered.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param nanoOfSecond  the nano-of-second to set in the result, from 0 to 999,999,999
	         * @return a {@code LocalTime} based on this time with the requested nanosecond, not null
	         * @throws DateTimeException if the nanos value is invalid
	         */
	
	    }, {
	        key: 'withNano',
	        value: function withNano(nanoOfSecond) {
	            if (this._nano === nanoOfSecond) {
	                return this;
	            }
	            return new LocalTime(this._hour, this._minute, this._second, nanoOfSecond);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Returns a copy of this {@code LocalTime} with the time truncated.
	         * <p>
	         * Truncating the time returns a copy of the original time with fields
	         * smaller than the specified unit set to zero.
	         * For example, truncating with the {@link ChronoUnit#MINUTES minutes} unit
	         * will set the second-of-minute and nano-of-second field to zero.
	         * <p>
	         * The unit must have a {@linkplain TemporalUnit#getDuration() duration}
	         * that divides into the length of a standard day without remainder.
	         * This includes all supplied time units on {@link ChronoUnit} and
	         * {@link ChronoUnit#DAYS DAYS}. Other units throw an exception.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param unit  the unit to truncate to, not null
	         * @return a {@code LocalTime} based on this time with the time truncated, not null
	         * @throws DateTimeException if unable to truncate
	         */
	
	    }, {
	        key: 'truncatedTo',
	        value: function truncatedTo(unit) {
	            (0, _assert.requireNonNull)(unit, 'unit');
	            if (unit === _ChronoUnit.ChronoUnit.NANOS) {
	                return this;
	            }
	            var unitDur = unit.duration();
	            if (unitDur.seconds() > LocalTime.SECONDS_PER_DAY) {
	                throw new _errors.DateTimeException('Unit is too large to be used for truncation');
	            }
	            var dur = unitDur.toNanos();
	            if (_MathUtil.MathUtil.intMod(LocalTime.NANOS_PER_DAY, dur) !== 0) {
	                throw new _errors.DateTimeException('Unit must divide into a standard day without remainder');
	            }
	            var nod = this.toNanoOfDay();
	            return LocalTime.ofNanoOfDay(_MathUtil.MathUtil.intDiv(nod, dur) * dur);
	        }
	
	        //-----------------------------------------------------------------------
	
	    }, {
	        key: 'plus',
	        value: function plus() {
	            if (arguments.length < 2) {
	                return this._plus1.apply(this, arguments);
	            } else {
	                return this._plus2.apply(this, arguments);
	            }
	        }
	        /**
	         * Returns a copy of this date with the specified period added.
	         * <p>
	         * This method returns a new time based on this time with the specified period added.
	         * The amount is typically {@link Period} but may be any other type implementing
	         * the {@link TemporalAmount} interface.
	         * The calculation is delegated to the specified adjuster, which typically calls
	         * back to {@link #plus(long, TemporalUnit)}.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param amount  the amount to add, not null
	         * @return a {@code LocalTime} based on this time with the addition made, not null
	         * @throws DateTimeException if the addition cannot be made
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: '_plus1',
	        value: function _plus1(amount) {
	            (0, _assert.requireNonNull)(amount, 'amount');
	            return amount.addTo(this);
	        }
	
	        /**
	         * Returns a copy of this time with the specified period added.
	         * <p>
	         * This method returns a new time based on this time with the specified period added.
	         * This can be used to add any period that is defined by a unit, for example to add hours, minutes or seconds.
	         * The unit is responsible for the details of the calculation, including the resolution
	         * of any edge cases in the calculation.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param amountToAdd  the amount of the unit to add to the result, may be negative
	         * @param unit  the unit of the period to add, not null
	         * @return a {@code LocalTime} based on this time with the specified period added, not null
	         * @throws DateTimeException if the unit cannot be added to this type
	         */
	
	    }, {
	        key: '_plus2',
	        value: function _plus2(amountToAdd, unit) {
	            (0, _assert.requireNonNull)(unit, 'unit');
	            if (unit instanceof _ChronoUnit.ChronoUnit) {
	                switch (unit) {
	                    case _ChronoUnit.ChronoUnit.NANOS:
	                        return this.plusNanos(amountToAdd);
	                    case _ChronoUnit.ChronoUnit.MICROS:
	                        return this.plusNanos(_MathUtil.MathUtil.intMod(amountToAdd, LocalTime.MICROS_PER_DAY) * 1000);
	                    case _ChronoUnit.ChronoUnit.MILLIS:
	                        return this.plusNanos(_MathUtil.MathUtil.intMod(amountToAdd, LocalTime.MILLIS_PER_DAY) * 1000000);
	                    case _ChronoUnit.ChronoUnit.SECONDS:
	                        return this.plusSeconds(amountToAdd);
	                    case _ChronoUnit.ChronoUnit.MINUTES:
	                        return this.plusMinutes(amountToAdd);
	                    case _ChronoUnit.ChronoUnit.HOURS:
	                        return this.plusHours(amountToAdd);
	                    case _ChronoUnit.ChronoUnit.HALF_DAYS:
	                        return this.plusHours(_MathUtil.MathUtil.intMod(amountToAdd, 2) * 12);
	                }
	                throw new _errors.UnsupportedTemporalTypeException('Unsupported unit: ' + unit);
	            }
	            return unit.addTo(this, amountToAdd);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Returns a copy of this {@code LocalTime} with the specified period in hours added.
	         * <p>
	         * This adds the specified number of hours to this time, returning a new time.
	         * The calculation wraps around midnight.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param hoursToAdd  the hours to add, may be negative
	         * @return a {@code LocalTime} based on this time with the hours added, not null
	         */
	
	    }, {
	        key: 'plusHours',
	        value: function plusHours(hoursToAdd) {
	            if (hoursToAdd === 0) {
	                return this;
	            }
	
	            var newHour = _MathUtil.MathUtil.intMod(_MathUtil.MathUtil.intMod(hoursToAdd, LocalTime.HOURS_PER_DAY) + this._hour + LocalTime.HOURS_PER_DAY, LocalTime.HOURS_PER_DAY);
	            return new LocalTime(newHour, this._minute, this._second, this._nano);
	        }
	
	        /**
	         * Returns a copy of this {@code LocalTime} with the specified period in minutes added.
	         * <p>
	         * This adds the specified number of minutes to this time, returning a new time.
	         * The calculation wraps around midnight.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param minutesToAdd  the minutes to add, may be negative
	         * @return a {@code LocalTime} based on this time with the minutes added, not null
	         */
	
	    }, {
	        key: 'plusMinutes',
	        value: function plusMinutes(minutesToAdd) {
	            if (minutesToAdd === 0) {
	                return this;
	            }
	            var mofd = this._hour * LocalTime.MINUTES_PER_HOUR + this._minute;
	            var newMofd = _MathUtil.MathUtil.intMod(_MathUtil.MathUtil.intMod(minutesToAdd, LocalTime.MINUTES_PER_DAY) + mofd + LocalTime.MINUTES_PER_DAY, LocalTime.MINUTES_PER_DAY);
	            if (mofd === newMofd) {
	                return this;
	            }
	            var newHour = _MathUtil.MathUtil.intDiv(newMofd, LocalTime.MINUTES_PER_HOUR);
	            var newMinute = _MathUtil.MathUtil.intMod(newMofd, LocalTime.MINUTES_PER_HOUR);
	            return new LocalTime(newHour, newMinute, this._second, this._nano);
	        }
	
	        /**
	         * Returns a copy of this {@code LocalTime} with the specified period in seconds added.
	         * <p>
	         * This adds the specified number of seconds to this time, returning a new time.
	         * The calculation wraps around midnight.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param secondstoAdd  the seconds to add, may be negative
	         * @return a {@code LocalTime} based on this time with the seconds added, not null
	         */
	
	    }, {
	        key: 'plusSeconds',
	        value: function plusSeconds(secondstoAdd) {
	            if (secondstoAdd === 0) {
	                return this;
	            }
	            var sofd = this._hour * LocalTime.SECONDS_PER_HOUR + this._minute * LocalTime.SECONDS_PER_MINUTE + this._second;
	            var newSofd = _MathUtil.MathUtil.intMod(_MathUtil.MathUtil.intMod(secondstoAdd, LocalTime.SECONDS_PER_DAY) + sofd + LocalTime.SECONDS_PER_DAY, LocalTime.SECONDS_PER_DAY);
	            if (sofd === newSofd) {
	                return this;
	            }
	            var newHour = _MathUtil.MathUtil.intDiv(newSofd, LocalTime.SECONDS_PER_HOUR);
	            var newMinute = _MathUtil.MathUtil.intMod(_MathUtil.MathUtil.intDiv(newSofd, LocalTime.SECONDS_PER_MINUTE), LocalTime.MINUTES_PER_HOUR);
	            var newSecond = _MathUtil.MathUtil.intMod(newSofd, LocalTime.SECONDS_PER_MINUTE);
	            return new LocalTime(newHour, newMinute, newSecond, this._nano);
	        }
	
	        /**
	         * Returns a copy of this {@code LocalTime} with the specified period in nanoseconds added.
	         * <p>
	         * This adds the specified number of nanoseconds to this time, returning a new time.
	         * The calculation wraps around midnight.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param nanosToAdd  the nanos to add, may be negative
	         * @return a {@code LocalTime} based on this time with the nanoseconds added, not null
	         */
	
	    }, {
	        key: 'plusNanos',
	        value: function plusNanos(nanosToAdd) {
	            if (nanosToAdd === 0) {
	                return this;
	            }
	            var nofd = this.toNanoOfDay();
	            var newNofd = _MathUtil.MathUtil.intMod(_MathUtil.MathUtil.intMod(nanosToAdd, LocalTime.NANOS_PER_DAY) + nofd + LocalTime.NANOS_PER_DAY, LocalTime.NANOS_PER_DAY);
	            if (nofd === newNofd) {
	                return this;
	            }
	            var newHour = _MathUtil.MathUtil.intDiv(newNofd, LocalTime.NANOS_PER_HOUR);
	            var newMinute = _MathUtil.MathUtil.intMod(_MathUtil.MathUtil.intDiv(newNofd, LocalTime.NANOS_PER_MINUTE), LocalTime.MINUTES_PER_HOUR);
	            var newSecond = _MathUtil.MathUtil.intMod(_MathUtil.MathUtil.intDiv(newNofd, LocalTime.NANOS_PER_SECOND), LocalTime.SECONDS_PER_MINUTE);
	            var newNano = _MathUtil.MathUtil.intMod(newNofd, LocalTime.NANOS_PER_SECOND);
	            return new LocalTime(newHour, newMinute, newSecond, newNano);
	        }
	
	        //-----------------------------------------------------------------------
	
	    }, {
	        key: 'minus',
	        value: function minus() {
	            if (arguments.length < 2) {
	                return this._minus1.apply(this, arguments);
	            } else {
	                return this._minus2.apply(this, arguments);
	            }
	        }
	        /**
	         * Returns a copy of this time with the specified period subtracted.
	         * <p>
	         * This method returns a new time based on this time with the specified period subtracted.
	         * The amount is typically {@link Period} but may be any other type implementing
	         * the {@link TemporalAmount} interface.
	         * The calculation is delegated to the specified adjuster, which typically calls
	         * back to {@link #minus(long, TemporalUnit)}.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param amount  the amount to subtract, not null
	         * @return a {@code LocalTime} based on this time with the subtraction made, not null
	         * @throws DateTimeException if the subtraction cannot be made
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: '_minus1',
	        value: function _minus1(amount) {
	            (0, _assert.requireNonNull)(amount, 'amount');
	            return amount.subtractFrom(this);
	        }
	
	        /**
	         * Returns a copy of this time with the specified period subtracted.
	         * <p>
	         * This method returns a new time based on this time with the specified period subtracted.
	         * This can be used to subtract any period that is defined by a unit, for example to subtract hours, minutes or seconds.
	         * The unit is responsible for the details of the calculation, including the resolution
	         * of any edge cases in the calculation.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param amountToSubtract  the amount of the unit to subtract from the result, may be negative
	         * @param unit  the unit of the period to subtract, not null
	         * @return a {@code LocalTime} based on this time with the specified period subtracted, not null
	         * @throws DateTimeException if the unit cannot be added to this type
	         */
	
	    }, {
	        key: '_minus2',
	        value: function _minus2(amountToSubtract, unit) {
	            (0, _assert.requireNonNull)(unit, 'unit');
	            return this._plus2(-1 * amountToSubtract, unit);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Returns a copy of this {@code LocalTime} with the specified period in hours subtracted.
	         * <p>
	         * This subtracts the specified number of hours from this time, returning a new time.
	         * The calculation wraps around midnight.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param hoursToSubtract  the hours to subtract, may be negative
	         * @return a {@code LocalTime} based on this time with the hours subtracted, not null
	         */
	
	    }, {
	        key: 'minusHours',
	        value: function minusHours(hoursToSubtract) {
	            return this.plusHours(-1 * _MathUtil.MathUtil.intMod(hoursToSubtract, LocalTime.HOURS_PER_DAY));
	        }
	
	        /**
	         * Returns a copy of this {@code LocalTime} with the specified period in minutes subtracted.
	         * <p>
	         * This subtracts the specified number of minutes from this time, returning a new time.
	         * The calculation wraps around midnight.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param minutesToSubtract  the minutes to subtract, may be negative
	         * @return a {@code LocalTime} based on this time with the minutes subtracted, not null
	         */
	
	    }, {
	        key: 'minusMinutes',
	        value: function minusMinutes(minutesToSubtract) {
	            return this.plusMinutes(-1 * _MathUtil.MathUtil.intMod(minutesToSubtract, LocalTime.MINUTES_PER_DAY));
	        }
	
	        /**
	         * Returns a copy of this {@code LocalTime} with the specified period in seconds subtracted.
	         * <p>
	         * This subtracts the specified number of seconds from this time, returning a new time.
	         * The calculation wraps around midnight.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param secondsToSubtract  the seconds to subtract, may be negative
	         * @return a {@code LocalTime} based on this time with the seconds subtracted, not null
	         */
	
	    }, {
	        key: 'minusSeconds',
	        value: function minusSeconds(secondsToSubtract) {
	            return this.plusSeconds(-1 * _MathUtil.MathUtil.intMod(secondsToSubtract, LocalTime.SECONDS_PER_DAY));
	        }
	
	        /**
	         * Returns a copy of this {@code LocalTime} with the specified period in nanoseconds subtracted.
	         * <p>
	         * This subtracts the specified number of nanoseconds from this time, returning a new time.
	         * The calculation wraps around midnight.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param nanosToSubtract  the nanos to subtract, may be negative
	         * @return a {@code LocalTime} based on this time with the nanoseconds subtracted, not null
	         */
	
	    }, {
	        key: 'minusNanos',
	        value: function minusNanos(nanosToSubtract) {
	            return this.plusNanos(-1 * _MathUtil.MathUtil.intMod(nanosToSubtract, LocalTime.NANOS_PER_DAY));
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Queries this time using the specified query.
	         * <p>
	         * This queries this time using the specified query strategy object.
	         * The {@code TemporalQuery} object defines the logic to be used to
	         * obtain the result. Read the documentation of the query to understand
	         * what the result of this method will be.
	         * <p>
	         * The result of this method is obtained by invoking the
	         * {@link TemporalQuery#queryFrom(TemporalAccessor)} method on the
	         * specified query passing {@code this} as the argument.
	         *
	         * @param query  the query to invoke, not null
	         * @return the query result, null may be returned (defined by the query)
	         * @throws DateTimeException if unable to query (defined by the query)
	         * @throws ArithmeticException if numeric overflow occurs (defined by the query)
	         */
	
	    }, {
	        key: 'query',
	        value: function query(_query) {
	            (0, _assert.requireNonNull)(_query, 'query');
	            if (_query === _TemporalQueries.TemporalQueries.precision()) {
	                return _ChronoUnit.ChronoUnit.NANOS;
	            } else if (_query === _TemporalQueries.TemporalQueries.localTime()) {
	                return this;
	            }
	            // inline TemporalAccessor.super.query(query) as an optimization
	            if (_query === _TemporalQueries.TemporalQueries.chronology() || _query === _TemporalQueries.TemporalQueries.zoneId() || _query === _TemporalQueries.TemporalQueries.zone() || _query === _TemporalQueries.TemporalQueries.offset() || _query === _TemporalQueries.TemporalQueries.localDate()) {
	                return null;
	            }
	            return _query.queryFrom(this);
	        }
	
	        /**
	         * Adjusts the specified temporal object to have the same time as this object.
	         * <p>
	         * This returns a temporal object of the same observable type as the input
	         * with the time changed to be the same as this.
	         * <p>
	         * The adjustment is equivalent to using {@link Temporal#with(TemporalField, long)}
	         * passing {@link ChronoField#NANO_OF_DAY} as the field.
	         * <p>
	         * In most cases, it is clearer to reverse the calling pattern by using
	         * {@link Temporal#with(TemporalAdjuster)}:
	         * <pre>
	         *   // these two lines are equivalent, but the second approach is recommended
	         *   temporal = thisLocalTime.adjustInto(temporal);
	         *   temporal = temporal.with(thisLocalTime);
	         * </pre>
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param temporal  the target object to be adjusted, not null
	         * @return the adjusted object, not null
	         * @throws DateTimeException if unable to make the adjustment
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'adjustInto',
	        value: function adjustInto(temporal) {
	            return temporal.with(LocalTime.NANO_OF_DAY, this.toNanoOfDay());
	        }
	
	        /**
	         * Calculates the period between this time and another time in
	         * terms of the specified unit.
	         * <p>
	         * This calculates the period between two times in terms of a single unit.
	         * The start and end points are {@code this} and the specified time.
	         * The result will be negative if the end is before the start.
	         * The {@code Temporal} passed to this method must be a {@code LocalTime}.
	         * For example, the period in hours between two times can be calculated
	         * using {@code startTime.until(endTime, HOURS)}.
	         * <p>
	         * The calculation returns a whole number, representing the number of
	         * complete units between the two times.
	         * For example, the period in hours between 11:30 and 13:29 will only
	         * be one hour as it is one minute short of two hours.
	         * <p>
	         * This method operates in association with {@link TemporalUnit#between}.
	         * The result of this method is a {@code long} representing the amount of
	         * the specified unit. By contrast, the result of {@code between} is an
	         * object that can be used directly in addition/subtraction:
	         * <pre>
	         *   long period = start.until(end, HOURS);   // this method
	         *   dateTime.plus(HOURS.between(start, end));      // use in plus/minus
	         * </pre>
	         * <p>
	         * The calculation is implemented in this method for {@link ChronoUnit}.
	         * The units {@code NANOS}, {@code MICROS}, {@code MILLIS}, {@code SECONDS},
	         * {@code MINUTES}, {@code HOURS} and {@code HALF_DAYS} are supported.
	         * Other {@code ChronoUnit} values will throw an exception.
	         * <p>
	         * If the unit is not a {@code ChronoUnit}, then the result of this method
	         * is obtained by invoking {@code TemporalUnit.between(Temporal, Temporal)}
	         * passing {@code this} as the first argument and the input temporal as
	         * the second argument.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param endExclusive  the end time, which is converted to a {@code LocalTime}, not null
	         * @param unit  the unit to measure the period in, not null
	         * @return the amount of the period between this time and the end time
	         * @throws DateTimeException if the period cannot be calculated
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'until',
	        value: function until(endExclusive, unit) {
	            var end = LocalTime.from(endExclusive);
	            if (unit instanceof _ChronoUnit.ChronoUnit) {
	                var nanosUntil = end.toNanoOfDay() - this.toNanoOfDay(); // no overflow
	                switch (unit) {
	                    case _ChronoUnit.ChronoUnit.NANOS:
	                        return nanosUntil;
	                    case _ChronoUnit.ChronoUnit.MICROS:
	                        return _MathUtil.MathUtil.intDiv(nanosUntil, 1000);
	                    case _ChronoUnit.ChronoUnit.MILLIS:
	                        return _MathUtil.MathUtil.intDiv(nanosUntil, 1000000);
	                    case _ChronoUnit.ChronoUnit.SECONDS:
	                        return _MathUtil.MathUtil.intDiv(nanosUntil, LocalTime.NANOS_PER_SECOND);
	                    case _ChronoUnit.ChronoUnit.MINUTES:
	                        return _MathUtil.MathUtil.intDiv(nanosUntil, LocalTime.NANOS_PER_MINUTE);
	                    case _ChronoUnit.ChronoUnit.HOURS:
	                        return _MathUtil.MathUtil.intDiv(nanosUntil, LocalTime.NANOS_PER_HOUR);
	                    case _ChronoUnit.ChronoUnit.HALF_DAYS:
	                        return _MathUtil.MathUtil.intDiv(nanosUntil, 12 * LocalTime.NANOS_PER_HOUR);
	                }
	                throw new _errors.UnsupportedTemporalTypeException('Unsupported unit: ' + unit);
	            }
	            return unit.between(this, end);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Combines this time with a date to create a {@code LocalDateTime}.
	         * <p>
	         * This returns a {@code LocalDateTime} formed from this time at the specified date.
	         * All possible combinations of date and time are valid.
	         *
	         * @param date  the date to combine with, not null
	         * @return the local date-time formed from this time and the specified date, not null
	         */
	
	    }, {
	        key: 'atDate',
	        value: function atDate(date) {
	            return LocalDateTime.of(date, this);
	        }
	
	        /**
	         * Combines this time with an offset to create an {@code OffsetTime}.
	         * <p>
	         * This returns an {@code OffsetTime} formed from this time at the specified offset.
	         * All possible combinations of time and offset are valid.
	         *
	         * @param offset  the offset to combine with, not null
	         * @return the offset time formed from this time and the specified offset, not null
	         */
	
	    }, {
	        key: 'atOffset',
	        value: function atOffset(offset) {
	            return OffsetTime.of(this, offset);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Extracts the time as seconds of day,
	         * from {@code 0} to {@code 24 * 60 * 60 - 1}.
	         *
	         * @return the second-of-day equivalent to this time
	         */
	
	    }, {
	        key: 'toSecondOfDay',
	        value: function toSecondOfDay() {
	            var total = this._hour * LocalTime.SECONDS_PER_HOUR;
	            total += this._minute * LocalTime.SECONDS_PER_MINUTE;
	            total += this._second;
	            return total;
	        }
	
	        /**
	         * Extracts the time as nanos of day,
	         * from {@code 0} to {@code 24 * 60 * 60 * 1,000,000,000 - 1}.
	         *
	         * @return the nano of day equivalent to this time
	         */
	
	    }, {
	        key: 'toNanoOfDay',
	        value: function toNanoOfDay() {
	            var total = this._hour * LocalTime.NANOS_PER_HOUR;
	            total += this._minute * LocalTime.NANOS_PER_MINUTE;
	            total += this._second * LocalTime.NANOS_PER_SECOND;
	            total += this._nano;
	            return total;
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Compares this {@code LocalTime} to another time.
	         * <p>
	         * The comparison is based on the time-line position of the local times within a day.
	         * It is 'consistent with equals', as defined by {@link Comparable}.
	         *
	         * @param other  the other time to compare to, not null
	         * @return the comparator value, negative if less, positive if greater
	         * @throws NullPointerException if {@code other} is null
	         */
	
	    }, {
	        key: 'compareTo',
	        value: function compareTo(other) {
	            (0, _assert.requireNonNull)(other, 'other');
	            (0, _assert.requireInstance)(other, LocalTime, 'other');
	            var cmp = _MathUtil.MathUtil.compareNumbers(this._hour, other._hour);
	            if (cmp === 0) {
	                cmp = _MathUtil.MathUtil.compareNumbers(this._minute, other._minute);
	                if (cmp === 0) {
	                    cmp = _MathUtil.MathUtil.compareNumbers(this._second, other._second);
	                    if (cmp === 0) {
	                        cmp = _MathUtil.MathUtil.compareNumbers(this._nano, other._nano);
	                    }
	                }
	            }
	            return cmp;
	        }
	
	        /**
	         * Checks if this {@code LocalTime} is after the specified time.
	         * <p>
	         * The comparison is based on the time-line position of the time within a day.
	         *
	         * @param other  the other time to compare to, not null
	         * @return true if this is after the specified time
	         * @throws NullPointerException if {@code other} is null
	         */
	
	    }, {
	        key: 'isAfter',
	        value: function isAfter(other) {
	            return this.compareTo(other) > 0;
	        }
	
	        /**
	         * Checks if this {@code LocalTime} is before the specified time.
	         * <p>
	         * The comparison is based on the time-line position of the time within a day.
	         *
	         * @param other  the other time to compare to, not null
	         * @return true if this point is before the specified time
	         * @throws NullPointerException if {@code other} is null
	         */
	
	    }, {
	        key: 'isBefore',
	        value: function isBefore(other) {
	            return this.compareTo(other) < 0;
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Checks if this time is equal to another time.
	         * <p>
	         * The comparison is based on the time-line position of the time within a day.
	         * <p>
	         * Only objects of type {@code LocalTime} are compared, other types return false.
	         * To compare the date of two {@code TemporalAccessor} instances, use
	         * {@link ChronoField#NANO_OF_DAY} as a comparator.
	         *
	         * @param other  the object to check, null returns false
	         * @return true if this is equal to the other time
	         */
	
	    }, {
	        key: 'equals',
	        value: function equals(other) {
	            if (this === other) {
	                return true;
	            }
	            if (other instanceof LocalTime) {
	                return this._hour === other._hour && this._minute === other._minute && this._second === other._second && this._nano === other._nano;
	            }
	            return false;
	        }
	
	        /**
	         * A hash code for this time.
	         *
	         * @return a suitable hash code
	         */
	
	    }, {
	        key: 'hashCode',
	        value: function hashCode() {
	            var nod = this.toNanoOfDay();
	            return nod ^ nod >>> 24;
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Outputs this time as a {@code String}, such as {@code 10:15}.
	         * <p>
	         * The output will be one of the following ISO-8601 formats:
	         * <p><ul>
	         * <li>{@code HH:mm}</li>
	         * <li>{@code HH:mm:ss}</li>
	         * <li>{@code HH:mm:ss.SSS}</li>
	         * <li>{@code HH:mm:ss.SSSSSS}</li>
	         * <li>{@code HH:mm:ss.SSSSSSSSS}</li>
	         * </ul><p>
	         * The format used will be the shortest that outputs the full value of
	         * the time where the omitted parts are implied to be zero.
	         *
	         * @return a string representation of this time, not null
	         */
	
	    }, {
	        key: 'toString',
	        value: function toString() {
	            var buf = '';
	            var hourValue = this._hour;
	            var minuteValue = this._minute;
	            var secondValue = this._second;
	            var nanoValue = this._nano;
	            buf += hourValue < 10 ? '0' : '';
	            buf += hourValue;
	            buf += minuteValue < 10 ? ':0' : ':';
	            buf += minuteValue;
	            if (secondValue > 0 || nanoValue > 0) {
	                buf += secondValue < 10 ? ':0' : ':';
	                buf += secondValue;
	                if (nanoValue > 0) {
	                    buf += '.';
	                    if (_MathUtil.MathUtil.intMod(nanoValue, 1000000) === 0) {
	                        buf += ('' + (_MathUtil.MathUtil.intDiv(nanoValue, 1000000) + 1000)).substring(1);
	                    } else if (_MathUtil.MathUtil.intMod(nanoValue, 1000) === 0) {
	                        buf += ('' + (_MathUtil.MathUtil.intDiv(nanoValue, 1000) + 1000000)).substring(1);
	                    } else {
	                        buf += ('' + (nanoValue + 1000000000)).substring(1);
	                    }
	                }
	            }
	            return buf;
	        }
	
	        /**
	         * Outputs this time as a {@code String} using the formatter.
	         * <p>
	         * This time will be passed to the formatter
	         * {@link DateTimeFormatter#format(TemporalAccessor) print method}.
	         *
	         * @param formatter  the formatter to use, not null
	         * @return the formatted time string, not null
	         * @throws DateTimeException if an error occurs during printing
	         */
	
	    }, {
	        key: 'format',
	        value: function format(formatter) {
	            (0, _assert.requireNonNull)(formatter, 'formatter');
	            return formatter.format(this);
	        }
	    }], [{
	        key: '_validate',
	        value: function _validate(hour, minute, second, nanoOfSecond) {
	            _ChronoField.ChronoField.HOUR_OF_DAY.checkValidValue(hour);
	            _ChronoField.ChronoField.MINUTE_OF_HOUR.checkValidValue(minute);
	            _ChronoField.ChronoField.SECOND_OF_MINUTE.checkValidValue(second);
	            _ChronoField.ChronoField.NANO_OF_SECOND.checkValidValue(nanoOfSecond);
	        }
	    }]);
	
	    return LocalTime;
	}(_TemporalAccessor2.TemporalAccessor /** implements Temporal, TemporalAdjuster */);
	
	exports.LocalTime = LocalTime;
	function _init() {
	    /**
	     * Constants for the local time of each hour.
	     */
	    LocalTime.HOURS = [];
	    for (var i = 0; i < 24; i++) {
	        LocalTime.HOURS[i] = makeLocalTimeConst(i);
	    }
	
	    function makeLocalTimeConst() {
	        var hour = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var minute = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	        var second = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	        var nano = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	
	        var localTime = Object.create(LocalTime.prototype);
	        _TemporalAccessor2.TemporalAccessor.call(localTime);
	        localTime._hour = hour;
	        localTime._minute = minute;
	        localTime._second = second;
	        localTime._nano = nano;
	        return localTime;
	    }
	
	    /**
	     * The minimum supported {@code LocalTime}, '00:00'.
	     * This is the time of midnight at the start of the day.
	     */
	    LocalTime.MIN = LocalTime.HOURS[0];
	    /**
	     * The maximum supported {@code LocalTime}, '23:59:59.999999999'.
	     * This is the time just before midnight at the end of the day.
	     */
	    LocalTime.MAX = makeLocalTimeConst(23, 59, 59, 999999999);
	    /**
	     * The time of midnight at the start of the day, '00:00'.
	     */
	    LocalTime.MIDNIGHT = LocalTime.HOURS[0];
	    /**
	     * The time of noon in the middle of the day, '12:00'.
	     */
	    LocalTime.NOON = LocalTime.HOURS[12];
	
	    var FROM;
	    LocalTime.FROM = function () {
	        return FROM || (FROM = (0, _TemporalQueries.createTemporalQuery)('LocalTime.FROM', function (temporal) {
	            return LocalTime.from(temporal);
	        }));
	    };
	
	    /**
	     * Hours per day.
	     */
	    LocalTime.HOURS_PER_DAY = 24;
	    /**
	     * Minutes per hour.
	     */
	    LocalTime.MINUTES_PER_HOUR = 60;
	    /**
	     * Minutes per day.
	     */
	    LocalTime.MINUTES_PER_DAY = LocalTime.MINUTES_PER_HOUR * LocalTime.HOURS_PER_DAY;
	    /**
	     * Seconds per minute.
	     */
	    LocalTime.SECONDS_PER_MINUTE = 60;
	    /**
	     * Seconds per hour.
	     */
	    LocalTime.SECONDS_PER_HOUR = LocalTime.SECONDS_PER_MINUTE * LocalTime.MINUTES_PER_HOUR;
	    /**
	     * Seconds per day.
	     */
	    LocalTime.SECONDS_PER_DAY = LocalTime.SECONDS_PER_HOUR * LocalTime.HOURS_PER_DAY;
	    /**
	     * Milliseconds per day.
	     */
	    LocalTime.MILLIS_PER_DAY = LocalTime.SECONDS_PER_DAY * 1000;
	    /**
	     * Microseconds per day.
	     */
	    LocalTime.MICROS_PER_DAY = LocalTime.SECONDS_PER_DAY * 1000000;
	    /**
	     * Nanos per second.
	     */
	    LocalTime.NANOS_PER_SECOND = 1000000000;
	    /**
	     * Nanos per minute.
	     */
	    LocalTime.NANOS_PER_MINUTE = LocalTime.NANOS_PER_SECOND * LocalTime.SECONDS_PER_MINUTE;
	    /**
	     * Nanos per hour.
	     */
	    LocalTime.NANOS_PER_HOUR = LocalTime.NANOS_PER_MINUTE * LocalTime.MINUTES_PER_HOUR;
	    /**
	     * Nanos per day.
	     */
	    LocalTime.NANOS_PER_DAY = LocalTime.NANOS_PER_HOUR * LocalTime.HOURS_PER_DAY;
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DateTimeFormatter = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	exports._init = _init;
	
	var _assert = __webpack_require__(9);
	
	var _errors = __webpack_require__(5);
	
	var _ParsePosition = __webpack_require__(13);
	
	var _DateTimeParseContext = __webpack_require__(14);
	
	var _DateTimeFormatterBuilder = __webpack_require__(25);
	
	var _SignStyle = __webpack_require__(27);
	
	var _ResolverStyle = __webpack_require__(28);
	
	var _IsoChronology = __webpack_require__(17);
	
	var _ChronoField = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DateTimeFormatter = exports.DateTimeFormatter = function () {
	
	    //-----------------------------------------------------------------------
	    /**
	     * Constructor.
	     *
	     * @param printerParser  the printer/parser to use, not null
	     * @param locale  the locale to use, not null
	     * @param decimalStyle  the decimal style to use, not null
	     * @param resolverStyle  the resolver style to use, not null
	     * @param resolverFields  the fields to use during resolving, null for all fields
	     * @param chrono  the chronology to use, null for no override
	     * @param zone  the zone to use, null for no override
	     */
	
	    function DateTimeFormatter(printerParser, locale, decimalStyle, resolverStyle, resolverFields, chrono, zone) {
	        _classCallCheck(this, DateTimeFormatter);
	
	        (0, _assert.assert)(printerParser != null);
	        (0, _assert.assert)(decimalStyle != null);
	        (0, _assert.assert)(resolverStyle != null);
	        /**
	         * The printer and/or parser to use, not null.
	         */
	        this._printerParser = printerParser;
	        /**
	         * The locale to use for formatting. // nyi
	         */
	        this._locale = locale;
	        /**
	         * The symbols to use for formatting, not null.
	         */
	        this._decimalStyle = decimalStyle;
	        /**
	         * The resolver style to use, not null.
	         */
	        this._resolverStyle = resolverStyle;
	        /**
	         * The fields to use in resolving, null for all fields.
	         */
	        this._resolverFields = resolverFields;
	        /**
	         * The chronology to use for formatting, null for no override.
	         */
	        this._chrono = chrono;
	        /**
	         * The zone to use for formatting, null for no override. // nyi
	         */
	        this._zone = zone;
	    }
	
	    _createClass(DateTimeFormatter, [{
	        key: 'locale',
	        value: function locale() {
	            return this._locale;
	        }
	    }, {
	        key: 'decimalStyle',
	        value: function decimalStyle() {
	            return this._decimalStyle;
	        }
	    }, {
	        key: 'chronology',
	        value: function chronology() {
	            return this._chrono;
	        }
	
	        /**
	         * Returns a copy of this formatter with a new override chronology.
	         *
	         * This returns a formatter with similar state to this formatter but
	         * with the override chronology set.
	         * By default, a formatter has no override chronology, returning null.
	         *
	         * If an override is added, then any date that is printed or parsed will be affected.
	         *
	         * When printing, if the {@code Temporal} object contains a date then it will
	         * be converted to a date in the override chronology.
	         * Any time or zone will be retained unless overridden.
	         * The converted result will behave in a manner equivalent to an implementation
	         * of {@code ChronoLocalDate},{@code ChronoLocalDateTime} or {@code ChronoZonedDateTime}.
	         *
	         * When parsing, the override chronology will be used to interpret the
	         * {@linkplain ChronoField fields} into a date unless the
	         * formatter directly parses a valid chronology.
	         *
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param chrono  the new chronology, not null
	         * @return a formatter based on this formatter with the requested override chronology, not null
	         */
	
	    }, {
	        key: 'withChronology',
	        value: function withChronology(chrono) {
	            if (this._chrono != null && this._chrono.equals(chrono)) {
	                return this;
	            }
	            return new DateTimeFormatter(this._printerParser, this._locale, this._decimalStyle, this._resolverStyle, this._resolverFields, chrono, this._zone);
	        }
	
	        /**
	         * not yet supported
	         * @returns {DateTimeFormatter}
	         */
	
	    }, {
	        key: 'withLocal',
	        value: function withLocal() {
	            return this;
	        }
	
	        /**
	         * Fully parses the text producing a temporal object.
	         *
	         * This parses the entire text producing a temporal object.
	         * It is typically more useful to use {@link #parse(CharSequence, TemporalQuery)}.
	         * The result of this method is {@code TemporalAccessor} which has been resolved,
	         * applying basic validation checks to help ensure a valid date-time.
	         *
	         * If the parse completes without reading the entire length of the text,
	         * or a problem occurs during parsing or merging, then an exception is thrown.
	         *
	         * @param text  the text to parse, not null
	         * @param type the type to extract, not null
	        * @return the parsed temporal object, not null
	         * @throws DateTimeParseException if unable to parse the requested result
	         */
	
	    }, {
	        key: 'parse',
	        value: function parse(text, type) {
	            (0, _assert.assert)(text != null, 'text', _errors.NullPointerException);
	            (0, _assert.assert)(type != null, 'type', _errors.NullPointerException);
	            try {
	                var builder = this._parseToBuilder(text, null).resolve(this._resolverStyle, this._resolverFields);
	                return builder.build(type);
	            } catch (ex) {
	                if (ex instanceof _errors.DateTimeParseException) {
	                    throw ex;
	                } else {
	                    throw this._createError(text, ex);
	                }
	            }
	        }
	    }, {
	        key: '_createError',
	        value: function _createError(text, ex) {
	            var abbr = '';
	            if (text.length > 64) {
	                abbr = text.subString(0, 64) + '...';
	            } else {
	                abbr = text;
	            }
	            return new _errors.DateTimeParseException('Text \'' + abbr + '\' could not be parsed: ' + ex.message, text, 0, ex);
	        }
	
	        /**
	         * Parses the text to a builder.
	         * <p>
	         * This parses to a {@code DateTimeBuilder} ensuring that the text is fully parsed.
	         * This method throws {@link DateTimeParseException} if unable to parse, or
	         * some other {@code DateTimeException} if another date/time problem occurs.
	         *
	         * @param text  the text to parse, not null
	         * @param position  the position to parse from, updated with length parsed
	         *  and the index of any error, null if parsing whole string
	         * @return the engine representing the result of the parse, not null
	         * @throws DateTimeParseException if the parse fails
	         */
	
	    }, {
	        key: '_parseToBuilder',
	        value: function _parseToBuilder(text, position) {
	            var pos = position != null ? position : new _ParsePosition.ParsePosition(0);
	            var result = this._parseUnresolved0(text, pos);
	            if (result == null || pos.getErrorIndex() >= 0 || position == null && pos.getIndex() < text.length) {
	                var abbr = '';
	                if (text.length > 64) {
	                    abbr = text.substr(0, 64).toString() + '...';
	                } else {
	                    abbr = text;
	                }
	                if (pos.getErrorIndex() >= 0) {
	                    throw new _errors.DateTimeParseException('Text \'' + abbr + '\' could not be parsed at index ' + pos.getErrorIndex(), text, pos.getErrorIndex());
	                } else {
	                    throw new _errors.DateTimeParseException('Text \'' + abbr + '\' could not be parsed, unparsed text found at index ' + pos.getIndex(), text, pos.getIndex());
	                }
	            }
	            return result.toBuilder();
	        }
	
	        /**
	         * Parses the text using this formatter, without resolving the result, intended
	         * for advanced use cases.
	         * <p>
	         * Parsing is implemented as a two-phase operation.
	         * First, the text is parsed using the layout defined by the formatter, producing
	         * a {@code Map} of field to value, a {@code ZoneId} and a {@code Chronology}.
	         * Second, the parsed data is <em>resolved</em>, by validating, combining and
	         * simplifying the various fields into more useful ones.
	         * This method performs the parsing stage but not the resolving stage.
	         * <p>
	         * The result of this method is {@code TemporalAccessor} which represents the
	         * data as seen in the input. Values are not validated, thus parsing a date string
	         * of '2012-00-65' would result in a temporal with three fields - year of '2012',
	         * month of '0' and day-of-month of '65'.
	         * <p>
	         * The text will be parsed from the specified start {@code ParsePosition}.
	         * The entire length of the text does not have to be parsed, the {@code ParsePosition}
	         * will be updated with the index at the end of parsing.
	         * <p>
	         * Errors are returned using the error index field of the {@code ParsePosition}
	         * instead of {@code DateTimeParseException}.
	         * The returned error index will be set to an index indicative of the error.
	         * Callers must check for errors before using the context.
	         * <p>
	         * If the formatter parses the same field more than once with different values,
	         * the result will be an error.
	         * <p>
	         * This method is intended for advanced use cases that need access to the
	         * internal state during parsing. Typical application code should use
	         * {@link #parse(CharSequence, TemporalQuery)} or the parse method on the target type.
	         *
	         * @param text  the text to parse, not null
	         * @param position  the position to parse from, updated with length parsed
	         *  and the index of any error, not null
	         * @return the parsed text, null if the parse results in an error
	         * @throws DateTimeException if some problem occurs during parsing
	         * @throws IndexOutOfBoundsException if the position is invalid
	         */
	
	    }, {
	        key: 'parseUnresolved',
	        value: function parseUnresolved(text, position) {
	            return this._parseUnresolved0(text, position);
	        }
	    }, {
	        key: '_parseUnresolved0',
	        value: function _parseUnresolved0(text, position) {
	            (0, _assert.assert)(text != null, 'text', _errors.NullPointerException);
	            (0, _assert.assert)(position != null, 'position', _errors.NullPointerException);
	            var context = new _DateTimeParseContext.DateTimeParseContext(this);
	            var pos = position.getIndex();
	            pos = this._printerParser.parse(context, text, pos);
	            if (pos < 0) {
	                position.setErrorIndex(~pos); // index not updated from input
	                return null;
	            }
	            position.setIndex(pos); // errorIndex not updated from input
	            return context.toParsed();
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            var pattern = this._printerParser.toString();
	            return pattern.indexOf('[') === 0 ? pattern : pattern.substring(1, pattern.length - 1);
	        }
	    }]);
	
	    return DateTimeFormatter;
	}();
	
	function _init() {
	    DateTimeFormatter.ISO_LOCAL_DATE = new _DateTimeFormatterBuilder.DateTimeFormatterBuilder().appendValue(_ChronoField.ChronoField.YEAR, 4, 10, _SignStyle.SignStyle.EXCEEDS_PAD).appendLiteral('-').appendValue(_ChronoField.ChronoField.MONTH_OF_YEAR, 2).appendLiteral('-').appendValue(_ChronoField.ChronoField.DAY_OF_MONTH, 2).toFormatter(_ResolverStyle.ResolverStyle.STRICT).withChronology(_IsoChronology.IsoChronology.INSTANCE);
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
	 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	 */
	
	var ParsePosition = exports.ParsePosition = function () {
	    function ParsePosition(index) {
	        _classCallCheck(this, ParsePosition);
	
	        this._index = index;
	        this._errorIndex = -1;
	    }
	
	    _createClass(ParsePosition, [{
	        key: "getIndex",
	        value: function getIndex() {
	            return this._index;
	        }
	    }, {
	        key: "setIndex",
	        value: function setIndex(index) {
	            this._index = index;
	        }
	    }, {
	        key: "getErrorIndex",
	        value: function getErrorIndex() {
	            return this._errorIndex;
	        }
	    }, {
	        key: "setErrorIndex",
	        value: function setErrorIndex(errorIndex) {
	            this._errorIndex = errorIndex;
	        }
	    }]);
	
	    return ParsePosition;
	}();

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DateTimeParseContext = undefined;
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _assert = __webpack_require__(9);
	
	var _DateTimeBuilder = __webpack_require__(15);
	
	var _EnumMap = __webpack_require__(16);
	
	var _IsoChronology = __webpack_require__(17);
	
	var _TemporalAccessor2 = __webpack_require__(23);
	
	var _TemporalQueries = __webpack_require__(21);
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DateTimeParseContext = exports.DateTimeParseContext = function () {
	    function DateTimeParseContext() {
	        _classCallCheck(this, DateTimeParseContext);
	
	        if (arguments.length === 1) {
	            this._constructorFormatter.apply(this, arguments);
	        } else {
	            this._constructorParam.apply(this, arguments);
	        }
	
	        this._caseSensitive = true;
	        this._strict = true;
	        this._parsed = [new Parsed(this)];
	    }
	
	    _createClass(DateTimeParseContext, [{
	        key: '_constructorParam',
	        value: function _constructorParam(locale, symbols, chronology) {
	            this._locale = locale;
	            this._symbols = symbols;
	            this._overrideChronology = chronology;
	        }
	    }, {
	        key: '_constructorFormatter',
	        value: function _constructorFormatter(formatter) {
	            this._locale = formatter.locale();
	            this._symbols = formatter.decimalStyle();
	            this._overrideChronology = formatter.chronology();
	        }
	    }, {
	        key: 'symbols',
	        value: function symbols() {
	            return this._symbols;
	        }
	    }, {
	        key: 'isStrict',
	        value: function isStrict() {
	            return this._strict;
	        }
	    }, {
	        key: 'setStrict',
	        value: function setStrict(strict) {
	            this._strict = strict;
	        }
	
	        /**
	         * Checks if parsing is case sensitive.
	         *
	         * @return true if parsing is case sensitive, false if case insensitive
	         */
	
	    }, {
	        key: 'isCaseSensitive',
	        value: function isCaseSensitive() {
	            return this._caseSensitive;
	        }
	
	        /**
	         * Sets whether the parsing is case sensitive or not.
	         *
	         * @param caseSensitive  changes the parsing to be case sensitive or not from now on
	         */
	
	    }, {
	        key: 'setCaseSensitive',
	        value: function setCaseSensitive(caseSensitive) {
	            this._caseSensitive = caseSensitive;
	        }
	
	        /**
	         * Helper to compare two {@code CharSequence} instances.
	         * This uses {@link #isCaseSensitive()}.
	         *
	         * @param cs1  the first character sequence, not null
	         * @param offset1  the offset into the first sequence, valid
	         * @param cs2  the second character sequence, not null
	         * @param offset2  the offset into the second sequence, valid
	         * @param length  the length to check, valid
	         * @return true if equal
	         */
	
	    }, {
	        key: 'subSequenceEquals',
	        value: function subSequenceEquals(cs1, offset1, cs2, offset2, length) {
	            if (offset1 + length > cs1.length || offset2 + length > cs2.length) {
	                return false;
	            }
	            if (!this.isCaseSensitive()) {
	                cs1 = cs1.toLowerCase();
	                cs2 = cs2.toLowerCase();
	            }
	            for (var i = 0; i < length; i++) {
	                var ch1 = cs1[offset1 + i];
	                var ch2 = cs2[offset2 + i];
	                if (ch1 !== ch2) {
	                    return false;
	                }
	            }
	            return true;
	        }
	
	        /**
	         * Helper to compare two {@code char}.
	         * This uses {@link #isCaseSensitive()}.
	         *
	         * @param ch1  the first character
	         * @param ch2  the second character
	         * @return true if equal
	         */
	
	    }, {
	        key: 'charEquals',
	        value: function charEquals(ch1, ch2) {
	            if (this.isCaseSensitive()) {
	                return ch1 === ch2;
	            }
	            return this.charEqualsIgnoreCase(ch1, ch2);
	        }
	
	        /**
	         * Compares two characters ignoring case.
	         *
	         * @param c1  the first
	         * @param c2  the second
	         * @return true if equal
	         */
	
	    }, {
	        key: 'charEqualsIgnoreCase',
	        value: function charEqualsIgnoreCase(c1, c2) {
	            return c1 === c2 || c1.toLowerCase() === c2.toLowerCase();
	        }
	    }, {
	        key: 'setParsedField',
	        value: function setParsedField(field, value, errorPos, successPos) {
	            var currentParsedFieldValues = this.currentParsed().fieldValues;
	            var old = currentParsedFieldValues.get(field);
	            currentParsedFieldValues.set(field, value);
	            return old != null && old !== value ? ~errorPos : successPos;
	        }
	    }, {
	        key: 'getParsed',
	        value: function getParsed(field) {
	            return this.currentParsed().fieldValues.get(field);
	        }
	    }, {
	        key: 'toParsed',
	        value: function toParsed() {
	            return this.currentParsed();
	        }
	    }, {
	        key: 'currentParsed',
	        value: function currentParsed() {
	            return this._parsed[this._parsed.length - 1];
	        }
	
	        /**
	         * Gets the effective chronology during parsing.
	         *
	         * @return the effective parsing chronology, not null
	         */
	
	    }, {
	        key: 'getEffectiveChronology',
	        value: function getEffectiveChronology() {
	            var chrono = this.currentParsed().chrono;
	            if (chrono == null) {
	                chrono = this._overrideChronology;
	                if (chrono == null) {
	                    chrono = _IsoChronology.IsoChronology.INSTANCE;
	                }
	            }
	            return chrono;
	        }
	    }]);
	
	    return DateTimeParseContext;
	}();
	
	var Parsed = function (_TemporalAccessor) {
	    _inherits(Parsed, _TemporalAccessor);
	
	    function Parsed(dateTimeParseContext) {
	        _classCallCheck(this, Parsed);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Parsed).call(this));
	
	        _this.chrono = null;
	        _this.zone = null;
	        _this.fieldValues = new _EnumMap.EnumMap();
	        _this.leapSecond = false;
	        _this.dateTimeParseContext = dateTimeParseContext;
	        return _this;
	    }
	
	    _createClass(Parsed, [{
	        key: 'copy',
	        value: function copy() {
	            var cloned = new Parsed();
	            cloned.chrono = this.chrono;
	            cloned.zone = this.zone;
	            cloned.fieldValues.putAll(this.fieldValues);
	            cloned.leapSecond = this.leapSecond;
	            return cloned;
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return this.fieldValues + ', ' + this.chrono + ', ' + this.zone;
	        }
	    }, {
	        key: 'isSupported',
	        value: function isSupported(field) {
	            return this.fieldValues.containsKey(field);
	        }
	    }, {
	        key: 'get',
	        value: function get(field) {
	            var val = this.fieldValues.get(field);
	            (0, _assert.assert)(val != null);
	            return val;
	        }
	    }, {
	        key: 'query',
	        value: function query(_query) {
	            if (_query === _TemporalQueries.TemporalQueries.chronology()) {
	                return this.chrono;
	            }
	            if (_query === _TemporalQueries.TemporalQueries.zoneId() || _query === _TemporalQueries.TemporalQueries.zone()) {
	                return this.zone;
	            }
	            return _get(Object.getPrototypeOf(Parsed.prototype), 'query', this).call(this, _query);
	        }
	    }, {
	        key: 'toBuilder',
	        value: function toBuilder() {
	            var builder = new _DateTimeBuilder.DateTimeBuilder();
	            builder.fieldValues.putAll(this.fieldValues);
	            builder.chrono = this.dateTimeParseContext.getEffectiveChronology();
	            if (this.zone != null) {
	                builder.zone = this.zone;
	            } else {
	                builder.zone = this.overrideZone;
	            }
	            builder.leapSecond = this.leapSecond;
	            builder.excessDays = this.excessDays;
	            return builder;
	        }
	    }]);
	
	    return Parsed;
	}(_TemporalAccessor2.TemporalAccessor);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DateTimeBuilder = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _errors = __webpack_require__(5);
	
	var _EnumMap = __webpack_require__(16);
	
	var _IsoChronology = __webpack_require__(17);
	
	var _ChronoLocalDate = __webpack_require__(20);
	
	var _ChronoField = __webpack_require__(3);
	
	var _TemporalAccessor2 = __webpack_require__(23);
	
	var _TemporalQueries = __webpack_require__(21);
	
	var _LocalTime = __webpack_require__(11);
	
	var _LocalDate = __webpack_require__(19);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	//import {ZoneOffset} from '../ZoneOffset';
	
	/**
	 * Builder that can holds date and time fields and related date and time objects.
	 * <p>
	 * The builder is used to hold onto different elements of date and time.
	 * It is designed as two separate maps:
	 * <p><ul>
	 * <li>from {@link TemporalField} to {@code long} value, where the value may be
	 * outside the valid range for the field
	 * <li>from {@code Class} to {@link TemporalAccessor}, holding larger scale objects
	 * like {@code LocalDateTime}.
	 * </ul><p>
	 *
	 * <h3>Specification for implementors</h3>
	 * This class is mutable and not thread-safe.
	 * It should only be used from a single thread.
	 */
	
	var DateTimeBuilder = function (_TemporalAccessor) {
	    _inherits(DateTimeBuilder, _TemporalAccessor);
	
	    function DateTimeBuilder() {
	        _classCallCheck(this, DateTimeBuilder);
	
	        /**
	         * The map of other fields.
	         */
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DateTimeBuilder).call(this));
	
	        _this.fieldValues = new _EnumMap.EnumMap();
	        /**
	         * The chronology.
	         */
	        _this.chrono = null;
	        /**
	         * The zone.
	         */
	        _this.zone = null;
	        /**
	         * The date.
	         */
	        _this.date = null;
	        /**
	         * The time.
	         */
	        _this.time = null;
	        /**
	         * The leap second flag.
	         */
	        _this.leapSecond = false;
	        /**
	         * The excess days.
	         */
	        _this.excessDays = null;
	        return _this;
	    }
	
	    /**
	     * Resolves the builder, evaluating the date and time.
	     * <p>
	     * This examines the contents of the builder and resolves it to produce the best
	     * available date and time, throwing an exception if a problem occurs.
	     * Calling this method changes the state of the builder.
	     *
	     * @param resolverStyle how to resolve
	     * @param resolverFields
	    * @return {@code this}, for method chaining
	     */
	
	
	    _createClass(DateTimeBuilder, [{
	        key: 'resolve',
	        value: function resolve(resolverStyle, resolverFields) {
	            if (resolverFields != null) {
	                this.fieldValues.retainAll(resolverFields);
	            }
	            // handle standard fields
	            // this._mergeInstantFields();
	            this._mergeDate(resolverStyle);
	            //mergeTime(resolverStyle);
	            //if (resolveFields(resolverStyle)) {
	            //    mergeInstantFields();
	            //    mergeDate(resolverStyle);
	            //    mergeTime(resolverStyle);
	            //}
	            //resolveTimeInferZeroes(resolverStyle);
	            //crossCheck();
	            //if (excessDays != null && excessDays.isZero() == false && date != null && time != null) {
	            //    date = date.plus(excessDays);
	            //    excessDays = Period.ZERO;
	            //}
	            //resolveFractional();
	            //resolveInstant();
	            return this;
	        }
	    }, {
	        key: '_mergeDate',
	        value: function _mergeDate(resolverStyle) {
	            //if (this.chrono instanceof IsoChronology) {
	            this._checkDate(_IsoChronology.IsoChronology.INSTANCE.resolveDate(this.fieldValues, resolverStyle));
	            //} else {
	            //    if (this.fieldValues.containsKey(ChronoField.EPOCH_DAY)) {
	            //        this._checkDate(LocalDate.ofEpochDay(this.fieldValues.remove(ChronoField.EPOCH_DAY)));
	            //        return;
	            //    }
	            //}
	        }
	    }, {
	        key: '_checkDate',
	        value: function _checkDate(date) {
	            if (date != null) {
	                this._addObject(date);
	                for (var field in this.fieldValues.keySet()) {
	                    if (field instanceof _ChronoField.ChronoField) {
	                        if (field.isDateBased()) {
	                            var val1;
	                            try {
	                                val1 = date.getLong(field);
	                            } catch (ex) {
	                                if (ex instanceof _errors.DateTimeException) {
	                                    continue;
	                                } else {
	                                    throw ex;
	                                }
	                            }
	                            var val2 = this.fieldValues.get(field);
	                            if (val1 !== val2) {
	                                throw new _errors.DateTimeException('Conflict found: Field ' + field + ' ' + val1 + ' differs from ' + field + ' ' + val2 + ' derived from ' + date);
	                            }
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_addObject',
	        value: function _addObject(dateOrTime) {
	            if (dateOrTime instanceof _ChronoLocalDate.ChronoLocalDate) {
	                this.date = dateOrTime;
	            } else if (dateOrTime instanceof _LocalTime.LocalTime) {
	                this.time = dateOrTime;
	            }
	        }
	
	        /**
	         * Builds the specified type from the values in this builder.
	         *
	         * This attempts to build the specified type from this builder.
	         * If the builder cannot return the type, an exception is thrown.
	         *
	         * @param type  the type to invoke {@code from} on, not null
	         * @return the extracted value, not null
	         * @throws DateTimeException if an error occurs
	         */
	
	    }, {
	        key: 'build',
	        value: function build(type) {
	            return type.queryFrom(this);
	        }
	    }, {
	        key: 'query',
	        value: function query(_query) {
	            if (_query === _TemporalQueries.TemporalQueries.zoneId()) {
	                return this.zone;
	            } else if (_query === _TemporalQueries.TemporalQueries.chronology()) {
	                return this.chrono;
	            } else if (_query === _TemporalQueries.TemporalQueries.localDate()) {
	                return this.date != null ? _LocalDate.LocalDate.from(this.date) : null;
	            } else if (_query === _TemporalQueries.TemporalQueries.localTime()) {
	                return this.time;
	            } else if (_query === _TemporalQueries.TemporalQueries.zone() || _query === _TemporalQueries.TemporalQueries.offset()) {
	                return _query.queryFrom(this);
	            } else if (_query === _TemporalQueries.TemporalQueries.precision()) {
	                return null; // not a complete date/time
	            }
	            // inline TemporalAccessor.super.query(query) as an optimization
	            // non-JDK classes are not permitted to make this optimization
	            return _query.queryFrom(this);
	        }
	    }]);
	
	    return DateTimeBuilder;
	}(_TemporalAccessor2.TemporalAccessor);

	exports.DateTimeBuilder = DateTimeBuilder;

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
	 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	 */
	
	var EnumMap = exports.EnumMap = function () {
	    function EnumMap() {
	        _classCallCheck(this, EnumMap);
	
	        this._map = {};
	    }
	
	    _createClass(EnumMap, [{
	        key: "putAll",
	        value: function putAll(otherMap) {
	            for (var key in otherMap._map) {
	                this._map[key] = otherMap._map[key];
	            }
	            return this;
	        }
	    }, {
	        key: "containsKey",
	        value: function containsKey(key) {
	            return this._map.hasOwnProperty(key.name());
	        }
	    }, {
	        key: "get",
	        value: function get(key) {
	            return this._map[key.name()];
	        }
	    }, {
	        key: "set",
	        value: function set(key, val) {
	            this._map[key.name()] = val;
	            return this;
	        }
	    }, {
	        key: "retainAll",
	        value: function retainAll(keyList) {
	            var map = {};
	            for (var i = 0; i < keyList.length; i++) {
	                var key = keyList[i].name();
	                map[key] = this._map[key];
	            }
	            this._map = map;
	            return this;
	        }
	
	        /**
	         * due to the bad performance of delete we just set the key entry to undefined.
	         *
	         * this might lead to issues with "null" entries. Calling clear in the end might solve the issue
	         * @param key
	         * @returns {*}
	         */
	
	    }, {
	        key: "remove",
	        value: function remove(key) {
	            var keyName = key.name();
	            var val = this._map[keyName];
	            this._map[keyName] = undefined;
	            return val;
	        }
	    }, {
	        key: "keySet",
	        value: function keySet() {
	            return this._map;
	        }
	    }, {
	        key: "clear",
	        value: function clear() {
	            this._map = {};
	        }
	    }]);
	
	    return EnumMap;
	}();

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.IsoChronology = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports._init = _init;
	
	var _Enum2 = __webpack_require__(18);
	
	var _LocalDate = __webpack_require__(19);
	
	var _Month = __webpack_require__(29);
	
	var _Year = __webpack_require__(31);
	
	var _ChronoField = __webpack_require__(3);
	
	var _ResolverStyle = __webpack_require__(28);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var IsoChronology = exports.IsoChronology = function (_Enum) {
	    _inherits(IsoChronology, _Enum);
	
	    function IsoChronology() {
	        _classCallCheck(this, IsoChronology);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(IsoChronology).apply(this, arguments));
	    }
	
	    _createClass(IsoChronology, [{
	        key: 'resolveDate',
	        value: function resolveDate(fieldValues, resolverStyle) {
	            if (fieldValues.containsKey(_ChronoField.ChronoField.EPOCH_DAY)) {
	                return _LocalDate.LocalDate.ofEpochDay(fieldValues.remove(_ChronoField.ChronoField.EPOCH_DAY));
	            }
	
	            // normalize fields
	            /*
	                    var prolepticMonth = fieldValues.remove(PROLEPTIC_MONTH);
	                    if (prolepticMonth != null) {
	                        if (resolverStyle != ResolverStyle.LENIENT) {
	                            PROLEPTIC_MONTH.checkValidValue(prolepticMonth);
	                        }
	                        updateResolveMap(fieldValues, ChronoField.MONTH_OF_YEAR, Jdk8Methods.floorMod(prolepticMonth, 12) + 1);
	                        updateResolveMap(fieldValues, ChronoField.YEAR, Jdk8Methods.floorDiv(prolepticMonth, 12));
	                    }
	            */
	
	            // eras
	            /*
	                    Long yoeLong = fieldValues.remove(YEAR_OF_ERA);
	                    if (yoeLong != null) {
	                        if (resolverStyle != ResolverStyle.LENIENT) {
	                            YEAR_OF_ERA.checkValidValue(yoeLong);
	                        }
	                        Long era = fieldValues.remove(ERA);
	                        if (era == null) {
	                            Long year = fieldValues.get(ChronoField.YEAR);
	                            if (resolverStyle == ResolverStyle.STRICT) {
	                                // do not invent era if strict, but do cross-check with year
	                                if (year != null) {
	                                    updateResolveMap(fieldValues, ChronoField.YEAR, (year > 0 ? yoeLong: Jdk8Methods.safeSubtract(1, yoeLong)));
	                                } else {
	                                    // reinstate the field removed earlier, no cross-check issues
	                                    fieldValues.put(YEAR_OF_ERA, yoeLong);
	                                }
	                            } else {
	                                // invent era
	                                updateResolveMap(fieldValues, ChronoField.YEAR, (year == null || year > 0 ? yoeLong: Jdk8Methods.safeSubtract(1, yoeLong)));
	                            }
	                        } else if (era.longValue() == 1L) {
	                            updateResolveMap(fieldValues, ChronoField.YEAR, yoeLong);
	                        } else if (era.longValue() == 0L) {
	                            updateResolveMap(fieldValues, ChronoField.YEAR, Jdk8Methods.safeSubtract(1, yoeLong));
	                        } else {
	                            throw new DateTimeException("Invalid value for era: " + era);
	                        }
	                    } else if (fieldValues.containsKey(ERA)) {
	                        ERA.checkValidValue(fieldValues.get(ERA));  // always validated
	                    }
	            */
	
	            // build date
	            if (fieldValues.containsKey(_ChronoField.ChronoField.YEAR)) {
	                if (fieldValues.containsKey(_ChronoField.ChronoField.MONTH_OF_YEAR)) {
	                    if (fieldValues.containsKey(_ChronoField.ChronoField.DAY_OF_MONTH)) {
	                        var y = _ChronoField.ChronoField.YEAR.checkValidIntValue(fieldValues.remove(_ChronoField.ChronoField.YEAR));
	                        var moy = fieldValues.remove(_ChronoField.ChronoField.MONTH_OF_YEAR);
	                        var dom = fieldValues.remove(_ChronoField.ChronoField.DAY_OF_MONTH);
	                        if (resolverStyle === _ResolverStyle.ResolverStyle.LENIENT) {
	                            var months = moy - 1;
	                            var days = dom - 1;
	                            return _LocalDate.LocalDate.of(y, 1, 1).plusMonths(months).plusDays(days);
	                        } else if (resolverStyle === _ResolverStyle.ResolverStyle.SMART) {
	                            _ChronoField.ChronoField.DAY_OF_MONTH.checkValidValue(dom);
	                            if (moy === 4 || moy === 6 || moy === 9 || moy === 11) {
	                                dom = Math.min(dom, 30);
	                            } else if (moy === 2) {
	                                dom = Math.min(dom, _Month.Month.FEBRUARY.length(_Year.Year.isLeap(y)));
	                            }
	                            return _LocalDate.LocalDate.of(y, moy, dom);
	                        } else {
	                            return _LocalDate.LocalDate.of(y, moy, dom);
	                        }
	                    }
	                    /*
	                                    if (fieldValues.containsKey(ALIGNED_WEEK_OF_MONTH)) {
	                                        if (fieldValues.containsKey(ALIGNED_DAY_OF_WEEK_IN_MONTH)) {
	                                            int y = ChronoField.YEAR.checkValidIntValue(fieldValues.remove(ChronoField.YEAR));
	                                            if (resolverStyle == ResolverStyle.LENIENT) {
	                                                long months = Jdk8Methods.safeSubtract(fieldValues.remove(ChronoField.MONTH_OF_YEAR), 1);
	                                                long weeks = Jdk8Methods.safeSubtract(fieldValues.remove(ALIGNED_WEEK_OF_MONTH), 1);
	                                                long days = Jdk8Methods.safeSubtract(fieldValues.remove(ALIGNED_DAY_OF_WEEK_IN_MONTH), 1);
	                                                return LocalDate.of(y, 1, 1).plusMonths(months).plusWeeks(weeks).plusDays(days);
	                                            }
	                                            int moy = ChronoField.MONTH_OF_YEAR.checkValidIntValue(fieldValues.remove(ChronoField.MONTH_OF_YEAR));
	                                            int aw = ALIGNED_WEEK_OF_MONTH.checkValidIntValue(fieldValues.remove(ALIGNED_WEEK_OF_MONTH));
	                                            int ad = ALIGNED_DAY_OF_WEEK_IN_MONTH.checkValidIntValue(fieldValues.remove(ALIGNED_DAY_OF_WEEK_IN_MONTH));
	                                            LocalDate date = LocalDate.of(y, moy, 1).plusDays((aw - 1) * 7 + (ad - 1));
	                                            if (resolverStyle == ResolverStyle.STRICT && date.get(ChronoField.MONTH_OF_YEAR) != moy) {
	                                                throw new DateTimeException("Strict mode rejected date parsed to a different month");
	                                            }
	                                            return date;
	                                        }
	                                        if (fieldValues.containsKey(DAY_OF_WEEK)) {
	                                            int y = ChronoField.YEAR.checkValidIntValue(fieldValues.remove(ChronoField.YEAR));
	                                            if (resolverStyle == ResolverStyle.LENIENT) {
	                                                long months = Jdk8Methods.safeSubtract(fieldValues.remove(ChronoField.MONTH_OF_YEAR), 1);
	                                                long weeks = Jdk8Methods.safeSubtract(fieldValues.remove(ALIGNED_WEEK_OF_MONTH), 1);
	                                                long days = Jdk8Methods.safeSubtract(fieldValues.remove(DAY_OF_WEEK), 1);
	                                                return LocalDate.of(y, 1, 1).plusMonths(months).plusWeeks(weeks).plusDays(days);
	                                            }
	                                            int moy = ChronoField.MONTH_OF_YEAR.checkValidIntValue(fieldValues.remove(ChronoField.MONTH_OF_YEAR));
	                                            int aw = ALIGNED_WEEK_OF_MONTH.checkValidIntValue(fieldValues.remove(ALIGNED_WEEK_OF_MONTH));
	                                            int dow = DAY_OF_WEEK.checkValidIntValue(fieldValues.remove(DAY_OF_WEEK));
	                                            LocalDate date = LocalDate.of(y, moy, 1).plusWeeks(aw - 1).with(nextOrSame(DayOfWeek.of(dow)));
	                                            if (resolverStyle == ResolverStyle.STRICT && date.get(ChronoField.MONTH_OF_YEAR) != moy) {
	                                                throw new DateTimeException("Strict mode rejected date parsed to a different month");
	                                            }
	                                            return date;
	                                        }
	                                    }
	                    */
	                }
	                /*
	                            if (fieldValues.containsKey(DAY_OF_YEAR)) {
	                                int y = ChronoField.YEAR.checkValidIntValue(fieldValues.remove(ChronoField.YEAR));
	                                if (resolverStyle == ResolverStyle.LENIENT) {
	                                    long days = Jdk8Methods.safeSubtract(fieldValues.remove(DAY_OF_YEAR), 1);
	                                    return LocalDate.ofYearDay(y, 1).plusDays(days);
	                                }
	                                int doy = DAY_OF_YEAR.checkValidIntValue(fieldValues.remove(DAY_OF_YEAR));
	                                return LocalDate.ofYearDay(y, doy);
	                            }
	                */
	                /*
	                            if (fieldValues.containsKey(ALIGNED_WEEK_OF_YEAR)) {
	                                if (fieldValues.containsKey(ALIGNED_DAY_OF_WEEK_IN_YEAR)) {
	                                    int y = ChronoField.YEAR.checkValidIntValue(fieldValues.remove(ChronoField.YEAR));
	                                    if (resolverStyle == ResolverStyle.LENIENT) {
	                                        long weeks = Jdk8Methods.safeSubtract(fieldValues.remove(ALIGNED_WEEK_OF_YEAR), 1);
	                                        long days = Jdk8Methods.safeSubtract(fieldValues.remove(ALIGNED_DAY_OF_WEEK_IN_YEAR), 1);
	                                        return LocalDate.of(y, 1, 1).plusWeeks(weeks).plusDays(days);
	                                    }
	                                    int aw = ALIGNED_WEEK_OF_YEAR.checkValidIntValue(fieldValues.remove(ALIGNED_WEEK_OF_YEAR));
	                                    int ad = ALIGNED_DAY_OF_WEEK_IN_YEAR.checkValidIntValue(fieldValues.remove(ALIGNED_DAY_OF_WEEK_IN_YEAR));
	                                    LocalDate date = LocalDate.of(y, 1, 1).plusDays((aw - 1) * 7 + (ad - 1));
	                                    if (resolverStyle == ResolverStyle.STRICT && date.get(ChronoField.YEAR) != y) {
	                                        throw new DateTimeException("Strict mode rejected date parsed to a different year");
	                                    }
	                                    return date;
	                                }
	                                if (fieldValues.containsKey(DAY_OF_WEEK)) {
	                                    int y = ChronoField.YEAR.checkValidIntValue(fieldValues.remove(ChronoField.YEAR));
	                                    if (resolverStyle == ResolverStyle.LENIENT) {
	                                        long weeks = Jdk8Methods.safeSubtract(fieldValues.remove(ALIGNED_WEEK_OF_YEAR), 1);
	                                        long days = Jdk8Methods.safeSubtract(fieldValues.remove(DAY_OF_WEEK), 1);
	                                        return LocalDate.of(y, 1, 1).plusWeeks(weeks).plusDays(days);
	                                    }
	                                    int aw = ALIGNED_WEEK_OF_YEAR.checkValidIntValue(fieldValues.remove(ALIGNED_WEEK_OF_YEAR));
	                                    int dow = DAY_OF_WEEK.checkValidIntValue(fieldValues.remove(DAY_OF_WEEK));
	                                    LocalDate date = LocalDate.of(y, 1, 1).plusWeeks(aw - 1).with(nextOrSame(DayOfWeek.of(dow)));
	                                    if (resolverStyle == ResolverStyle.STRICT && date.get(ChronoField.YEAR) != y) {
	                                        throw new DateTimeException("Strict mode rejected date parsed to a different month");
	                                    }
	                                    return date;
	                                }
	                            }
	                */
	            }
	            return null;
	        }
	    }], [{
	        key: 'isLeapYear',
	
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
	}(_Enum2.Enum);
	
	function _init() {
	    IsoChronology.INSTANCE = new IsoChronology('IsoChronology');
	}

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	 */
	/***
	 * Base class for a pseudo enum
	 */
	
	var Enum = exports.Enum = function () {
	    function Enum(name) {
	        _classCallCheck(this, Enum);
	
	        this._name = name;
	    }
	
	    _createClass(Enum, [{
	        key: "equals",
	        value: function equals(other) {
	            return this === other;
	        }
	    }, {
	        key: "toString",
	        value: function toString() {
	            return this._name;
	        }
	    }]);
	
	    return Enum;
	}();

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LocalDate = undefined;
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports._init = _init;
	
	var _assert = __webpack_require__(9);
	
	var _MathUtil = __webpack_require__(4);
	
	var _errors = __webpack_require__(5);
	
	var _IsoChronology = __webpack_require__(17);
	
	var _ChronoField = __webpack_require__(3);
	
	var _ChronoUnit = __webpack_require__(7);
	
	var _ChronoLocalDate2 = __webpack_require__(20);
	
	var _TemporalQueries = __webpack_require__(21);
	
	var _DateTimeFormatter = __webpack_require__(12);
	
	var _Clock = __webpack_require__(1);
	
	var _DayOfWeek = __webpack_require__(24);
	
	var _Month = __webpack_require__(29);
	
	var _Period = __webpack_require__(30);
	
	var _Year = __webpack_require__(31);
	
	var _LocalTime = __webpack_require__(11);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
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
	 *
	 * The ISO-8601 calendar system is the modern civil calendar system used today
	 * in most of the world. It is equivalent to the proleptic Gregorian calendar
	 * system, in which today's rules for leap years are applied for all time.
	 * For most applications written today, the ISO-8601 rules are entirely suitable.
	 * However, any application that makes use of historical dates, and requires them
	 * to be accurate will find the ISO-8601 approach unsuitable.
	 */
	
	var LocalDate = function (_ChronoLocalDate) {
	    _inherits(LocalDate, _ChronoLocalDate);
	
	    _createClass(LocalDate, null, [{
	        key: 'now',
	
	
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
	        value: function now() {
	            var clock = arguments.length <= 0 || arguments[0] === undefined ? _Clock.Clock.systemDefaultZone() : arguments[0];
	
	            (0, _assert.assert)(clock != null, 'clock', _errors.NullPointerException);
	            var now = clock.instant();
	            var offset = clock.offset(now);
	            var epochSec = now.epochSecond() + offset.totalSeconds();
	            var epochDay = _MathUtil.MathUtil.floorDiv(epochSec, _LocalTime.LocalTime.SECONDS_PER_DAY);
	            return LocalDate.ofEpochDay(epochDay);
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
	
	    }, {
	        key: 'of',
	        value: function of(year, month, dayOfMonth) {
	            return new LocalDate(year, month, dayOfMonth);
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
	         * Obtains an instance of {@code LocalDate} from a temporal object.
	         * <p>
	         * A {@code TemporalAccessor} represents some form of date and time information.
	         * This factory converts the arbitrary temporal object to an instance of {@code LocalDate}.
	         * <p>
	         * The conversion uses the {@link TemporalQueries#localDate()} query, which relies
	         * on extracting the {@link ChronoField#EPOCH_DAY EPOCH_DAY} field.
	         * <p>
	         * This method matches the signature of the functional interface {@link TemporalQuery}
	         * allowing it to be used as a query via method reference, {@code LocalDate::from}.
	         *
	         * @param temporal  the temporal object to convert, not null
	         * @return the local date, not null
	         * @throws DateTimeException if unable to convert to a {@code LocalDate}
	         */
	
	    }, {
	        key: 'from',
	        value: function from(temporal) {
	            (0, _assert.assert)(temporal != null, '', _errors.NullPointerException);
	            var date = temporal.query(_TemporalQueries.TemporalQueries.localDate());
	            if (date == null) {
	                throw new _errors.DateTimeException('Unable to obtain LocalDate from TemporalAccessor: ' + temporal + ', type ' + (temporal.constructor != null ? temporal.constructor.name : ''));
	            }
	            return date;
	        }
	
	        /**
	         * Obtains an instance of {@code LocalDate} from a text string using a specific formatter.
	         *
	         * The text is parsed using the formatter, returning a date.
	         *
	         * @param text  the text to parse, not null
	         * @param formatter  the formatter to use, default is DateTimeFormatter.ISO_LOCAL_DATE
	         * @return the parsed local date, not null
	         * @throws DateTimeParseException if the text cannot be parsed
	         */
	
	    }, {
	        key: 'parse',
	        value: function parse(text) {
	            var formatter = arguments.length <= 1 || arguments[1] === undefined ? _DateTimeFormatter.DateTimeFormatter.ISO_LOCAL_DATE : arguments[1];
	
	            (0, _assert.assert)(formatter != null, 'formatter', _errors.NullPointerException);
	            return formatter.parse(text, LocalDate.FROM);
	        }
	
	        /**
	         * Resolves the date, resolving days past the end of month.
	         *
	         * @param year  the year to represent, validated from MIN_YEAR to MAX_YEAR
	         * @param month  the month-of-year to represent, validated from 1 to 12
	         * @param day  the day-of-month to represent, validated from 1 to 31
	         * @return LocalDate resolved date, not null
	         */
	
	    }, {
	        key: '_resolvePreviousValid',
	        value: function _resolvePreviousValid(year, month, day) {
	            switch (month) {
	                case 2:
	                    day = Math.min(day, _IsoChronology.IsoChronology.isLeapYear(year) ? 29 : 28);
	                    break;
	                case 4:
	                case 6:
	                case 9:
	                case 11:
	                    day = Math.min(day, 30);
	                    break;
	            }
	            return LocalDate.of(year, month, day);
	        }
	
	        /**
	         *
	         * @param {number} year
	         * @param {Month, number} month
	         * @param {number} dayOfMonth
	         */
	
	    }]);
	
	    function LocalDate(year, month, dayOfMonth) {
	        _classCallCheck(this, LocalDate);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LocalDate).call(this));
	
	        if (month instanceof _Month.Month) {
	            month = month.value();
	        }
	        LocalDate._validate(year, month, dayOfMonth);
	        _this._year = year;
	        _this._month = month;
	        _this._day = dayOfMonth;
	        return _this;
	    }
	
	    /**
	      * @private
	      */
	
	
	    _createClass(LocalDate, [{
	        key: 'isSupported',
	
	
	        /**
	         * Checks if the specified field is supported.
	         * <p>
	         * This checks if this date can be queried for the specified field.
	         * If false, then calling the {@link #range(TemporalField) range} and
	         * {@link #get(TemporalField) get} methods will throw an exception.
	         * <p>
	         * If the field is a {@link ChronoField} then the query is implemented here.
	         * The {@link #isSupported(TemporalField) supported fields} will return valid
	         * values based on this date-time.
	         * The supported fields are:
	         * <ul>
	         * <li>{@code DAY_OF_WEEK}
	         * <li>{@code ALIGNED_DAY_OF_WEEK_IN_MONTH}
	         * <li>{@code ALIGNED_DAY_OF_WEEK_IN_YEAR}
	         * <li>{@code DAY_OF_MONTH}
	         * <li>{@code DAY_OF_YEAR}
	         * <li>{@code EPOCH_DAY}
	         * <li>{@code ALIGNED_WEEK_OF_MONTH}
	         * <li>{@code ALIGNED_WEEK_OF_YEAR}
	         * <li>{@code MONTH_OF_YEAR}
	         * <li>{@code EPOCH_MONTH}
	         * <li>{@code YEAR_OF_ERA}
	         * <li>{@code YEAR}
	         * <li>{@code ERA}
	         * </ul>
	         * All other {@code ChronoField} instances will return false.
	         * <p>
	         * If the field is not a {@code ChronoField}, then the result of this method
	         * is obtained by invoking {@code TemporalField.isSupportedBy(TemporalAccessor)}
	         * passing {@code this} as the argument.
	         * Whether the field is supported is determined by the field.
	         *
	         * @param field  the field to check, null returns false
	         * @return true if the field is supported on this date, false if not
	         */
	        value: function isSupported(field) {
	            return _get(Object.getPrototypeOf(LocalDate.prototype), 'isSupported', this).call(this, field);
	        }
	    }, {
	        key: 'get',
	        value: function get(field) {
	            return this.getLong(field);
	        }
	    }, {
	        key: 'getLong',
	        value: function getLong(field) {
	            (0, _assert.assert)(field != null, '', _errors.NullPointerException);
	            if (field instanceof _ChronoField.ChronoField) {
	                return this._get0(field);
	            }
	            return field.getFrom(this);
	        }
	    }, {
	        key: '_get0',
	        value: function _get0(field) {
	            switch (field) {
	                case _ChronoField.ChronoField.DAY_OF_WEEK:
	                    return this.dayOfWeek().value();
	                case _ChronoField.ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH:
	                    return (this._day - 1) % 7 + 1;
	                case _ChronoField.ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR:
	                    return (this.dayOfYear() - 1) % 7 + 1;
	                case _ChronoField.ChronoField.DAY_OF_MONTH:
	                    return this._day;
	                case _ChronoField.ChronoField.DAY_OF_YEAR:
	                    return this.dayOfYear();
	                case _ChronoField.ChronoField.EPOCH_DAY:
	                    return this.toEpochDay();
	                case _ChronoField.ChronoField.ALIGNED_WEEK_OF_MONTH:
	                    return (this._day - 1) / 7 + 1;
	                case _ChronoField.ChronoField.ALIGNED_WEEK_OF_YEAR:
	                    return (this.dayOfYear() - 1) / 7 + 1;
	                case _ChronoField.ChronoField.MONTH_OF_YEAR:
	                    return this._month;
	                case _ChronoField.ChronoField.PROLEPTIC_MONTH:
	                    return this._prolepticMonth();
	                case _ChronoField.ChronoField.YEAR_OF_ERA:
	                    return this._year >= 1 ? this._year : 1 - this._year;
	                case _ChronoField.ChronoField.YEAR:
	                    return this._year;
	                case _ChronoField.ChronoField.ERA:
	                    return this._year >= 1 ? 1 : 0;
	            }
	            throw new _errors.UnsupportedTemporalTypeException('Unsupported field: ' + field);
	        }
	    }, {
	        key: '_prolepticMonth',
	        value: function _prolepticMonth() {
	            return this._year * 12 + (this._month - 1);
	        }
	
	        /**
	         * Gets the chronology of this date, which is the ISO calendar system.
	         * <p>
	         * The {@code Chronology} represents the calendar system in use.
	         * The ISO-8601 calendar system is the modern civil calendar system used today
	         * in most of the world. It is equivalent to the proleptic Gregorian calendar
	         * system, in which todays's rules for leap years are applied for all time.
	         *
	         * @return the ISO chronology, not null
	         */
	
	    }, {
	        key: 'chronology',
	        value: function chronology() {
	            return _IsoChronology.IsoChronology.INSTANCE;
	        }
	
	        /**
	         *
	         * @return {number} gets the year
	         */
	
	    }, {
	        key: 'year',
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
	          * Gets the day-of-year field.
	          * <p>
	          * This method returns the primitive {@code int} value for the day-of-year.
	          *
	          * @return the day-of-year, from 1 to 365, or 366 in a leap year
	          */
	
	    }, {
	        key: 'dayOfYear',
	        value: function dayOfYear() {
	            return this.month().firstDayOfYear(this.isLeapYear()) + this._day - 1;
	        }
	
	        /**
	         * Gets the day-of-week field, which is an enum {@code DayOfWeek}.
	         * <p>
	         * This method returns the enum {@link DayOfWeek} for the day-of-week.
	         * This avoids confusion as to what {@code int} values mean.
	         * If you need access to the primitive {@code int} value then the enum
	         * provides the {@link DayOfWeek#getValue() int value}.
	         * <p>
	         * Additional information can be obtained from the {@code DayOfWeek}.
	         * This includes textual names of the values.
	         *
	         * @return the day-of-week, not null
	         */
	
	    }, {
	        key: 'dayOfWeek',
	        value: function dayOfWeek() {
	            var dow0 = _MathUtil.MathUtil.floorMod(this.toEpochDay() + 3, 7);
	            return _DayOfWeek.DayOfWeek.of(dow0 + 1);
	        }
	
	        /**
	         * Checks if the year is a leap year, according to the ISO proleptic
	         * calendar system rules.
	         * <p>
	         * This method applies the current rules for leap years across the whole time-line.
	         * In general, a year is a leap year if it is divisible by four without
	         * remainder. However, years divisible by 100, are not leap years, with
	         * the exception of years divisible by 400 which are.
	         * <p>
	         * For example, 1904 is a leap year it is divisible by 4.
	         * 1900 was not a leap year as it is divisible by 100, however 2000 was a
	         * leap year as it is divisible by 400.
	         * <p>
	         * The calculation is proleptic - applying the same rules into the far future and far past.
	         * This is historically inaccurate, but is correct for the ISO-8601 standard.
	         *
	         * @return true if the year is leap, false otherwise
	         */
	
	    }, {
	        key: 'isLeapYear',
	        value: function isLeapYear() {
	            return _IsoChronology.IsoChronology.isLeapYear(this._year);
	        }
	
	        /**
	         * Returns the length of the month represented by this date.
	         * <p>
	         * This returns the length of the month in days.
	         * For example, a date in January would return 31.
	         *
	         * @return the length of the month in days
	         */
	
	    }, {
	        key: 'lengthOfMonth',
	        value: function lengthOfMonth() {
	            switch (this._month) {
	                case 2:
	                    return this.isLeapYear() ? 29 : 28;
	                case 4:
	                case 6:
	                case 9:
	                case 11:
	                    return 30;
	                default:
	                    return 31;
	            }
	        }
	
	        /**
	         * Returns the length of the year represented by this date.
	         * <p>
	         * This returns the length of the year in days, either 365 or 366.
	         *
	         * @return 366 if the year is leap, 365 otherwise
	         */
	
	    }, {
	        key: 'lengthOfYear',
	        value: function lengthOfYear() {
	            return this.isLeapYear() ? 366 : 365;
	        }
	
	        /**
	         * function overloading for the with method.
	         *
	         * calling "with" with one (or less) argument, assumes that the argument is an TemporalAdjuster,
	         * otherwise a field and newValue argument is expected.
	         *
	         * @param fieldOrAdjuster
	         * @param newValue
	         */
	
	    }, {
	        key: 'with',
	        value: function _with(fieldOrAdjuster, newValue) {
	            if (arguments.length < 2) {
	                return this._withTemporalAdjuster(fieldOrAdjuster);
	            } else {
	                return this._with2(fieldOrAdjuster, newValue);
	            }
	        }
	
	        /**
	         * Returns an adjusted copy of this date.
	         * <p>
	         * This returns a new {@code LocalDate}, based on this one, with the date adjusted.
	         * The adjustment takes place using the specified adjuster strategy object.
	         * Read the documentation of the adjuster to understand what adjustment will be made.
	         * <p>
	         * A simple adjuster might simply set the one of the fields, such as the year field.
	         * A more complex adjuster might set the date to the last day of the month.
	         * A selection of common adjustments is provided in {@link TemporalAdjusters}.
	         * These include finding the "last day of the month" and "next Wednesday".
	         * Key date-time classes also implement the {@code TemporalAdjuster} interface,
	         * such as {@link Month} and {@link MonthDay}.
	         * The adjuster is responsible for handling special cases, such as the varying
	         * lengths of month and leap years.
	         * <p>
	         * For example this code returns a date on the last day of July:
	         * <pre>
	         *  import static org.threeten.bp.Month.*;
	         *  import static org.threeten.bp.temporal.Adjusters.*;
	         *
	         *  result = localDate.with(JULY).with(lastDayOfMonth());
	         * </pre>
	         * <p>
	         * The result of this method is obtained by invoking the
	         * {@link TemporalAdjuster#adjustInto(Temporal)} method on the
	         * specified adjuster passing {@code this} as the argument.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param adjuster the adjuster to use, not null
	         * @return a {@code LocalDate} based on {@code this} with the adjustment made, not null
	         * @throws DateTimeException if the adjustment cannot be made
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: '_withTemporalAdjuster',
	        value: function _withTemporalAdjuster(adjuster) {
	            (0, _assert.assert)(adjuster != null, 'adjuster', _errors.NullPointerException);
	            (0, _assert.assert)(typeof adjuster.adjustInto === 'function', adjuster + 'is mot an adjuster', _errors.IllegalArgumentException);
	            // optimizations
	            if (adjuster instanceof LocalDate) {
	                return adjuster;
	            }
	            return adjuster.adjustInto(this);
	        }
	
	        /**
	         * Returns a copy of this date with the specified field set to a new value.
	         * <p>
	         * This returns a new {@code LocalDate}, based on this one, with the value
	         * for the specified field changed.
	         * This can be used to change any supported field, such as the year, month or day-of-month.
	         * If it is not possible to set the value, because the field is not supported or for
	         * some other reason, an exception is thrown.
	         * <p>
	         * In some cases, changing the specified field can cause the resulting date to become invalid,
	         * such as changing the month from 31st January to February would make the day-of-month invalid.
	         * In cases like this, the field is responsible for resolving the date. Typically it will choose
	         * the previous valid date, which would be the last valid day of February in this example.
	         * <p>
	         * If the field is a {@link ChronoField} then the adjustment is implemented here.
	         * The supported fields behave as follows:
	         * <ul>
	         * <li>{@code DAY_OF_WEEK} -
	         *  Returns a {@code LocalDate} with the specified day-of-week.
	         *  The date is adjusted up to 6 days forward or backward within the boundary
	         *  of a Monday to Sunday week.
	         * <li>{@code ALIGNED_DAY_OF_WEEK_IN_MONTH} -
	         *  Returns a {@code LocalDate} with the specified aligned-day-of-week.
	         *  The date is adjusted to the specified month-based aligned-day-of-week.
	         *  Aligned weeks are counted such that the first week of a given month starts
	         *  on the first day of that month.
	         *  This may cause the date to be moved up to 6 days into the following month.
	         * <li>{@code ALIGNED_DAY_OF_WEEK_IN_YEAR} -
	         *  Returns a {@code LocalDate} with the specified aligned-day-of-week.
	         *  The date is adjusted to the specified year-based aligned-day-of-week.
	         *  Aligned weeks are counted such that the first week of a given year starts
	         *  on the first day of that year.
	         *  This may cause the date to be moved up to 6 days into the following year.
	         * <li>{@code DAY_OF_MONTH} -
	         *  Returns a {@code LocalDate} with the specified day-of-month.
	         *  The month and year will be unchanged. If the day-of-month is invalid for the
	         *  year and month, then a {@code DateTimeException} is thrown.
	         * <li>{@code DAY_OF_YEAR} -
	         *  Returns a {@code LocalDate} with the specified day-of-year.
	         *  The year will be unchanged. If the day-of-year is invalid for the
	         *  year, then a {@code DateTimeException} is thrown.
	         * <li>{@code EPOCH_DAY} -
	         *  Returns a {@code LocalDate} with the specified epoch-day.
	         *  This completely replaces the date and is equivalent to {@link #ofEpochDay(long)}.
	         * <li>{@code ALIGNED_WEEK_OF_MONTH} -
	         *  Returns a {@code LocalDate} with the specified aligned-week-of-month.
	         *  Aligned weeks are counted such that the first week of a given month starts
	         *  on the first day of that month.
	         *  This adjustment moves the date in whole week chunks to match the specified week.
	         *  The result will have the same day-of-week as this date.
	         *  This may cause the date to be moved into the following month.
	         * <li>{@code ALIGNED_WEEK_OF_YEAR} -
	         *  Returns a {@code LocalDate} with the specified aligned-week-of-year.
	         *  Aligned weeks are counted such that the first week of a given year starts
	         *  on the first day of that year.
	         *  This adjustment moves the date in whole week chunks to match the specified week.
	         *  The result will have the same day-of-week as this date.
	         *  This may cause the date to be moved into the following year.
	         * <li>{@code MONTH_OF_YEAR} -
	         *  Returns a {@code LocalDate} with the specified month-of-year.
	         *  The year will be unchanged. The day-of-month will also be unchanged,
	         *  unless it would be invalid for the new month and year. In that case, the
	         *  day-of-month is adjusted to the maximum valid value for the new month and year.
	         * <li>{@code PROLEPTIC_MONTH} -
	         *  Returns a {@code LocalDate} with the specified proleptic-month.
	         *  The day-of-month will be unchanged, unless it would be invalid for the new month
	         *  and year. In that case, the day-of-month is adjusted to the maximum valid value
	         *  for the new month and year.
	         * <li>{@code YEAR_OF_ERA} -
	         *  Returns a {@code LocalDate} with the specified year-of-era.
	         *  The era and month will be unchanged. The day-of-month will also be unchanged,
	         *  unless it would be invalid for the new month and year. In that case, the
	         *  day-of-month is adjusted to the maximum valid value for the new month and year.
	         * <li>{@code YEAR} -
	         *  Returns a {@code LocalDate} with the specified year.
	         *  The month will be unchanged. The day-of-month will also be unchanged,
	         *  unless it would be invalid for the new month and year. In that case, the
	         *  day-of-month is adjusted to the maximum valid value for the new month and year.
	         * <li>{@code ERA} -
	         *  Returns a {@code LocalDate} with the specified era.
	         *  The year-of-era and month will be unchanged. The day-of-month will also be unchanged,
	         *  unless it would be invalid for the new month and year. In that case, the
	         *  day-of-month is adjusted to the maximum valid value for the new month and year.
	         * </ul>
	         * <p>
	         * In all cases, if the new value is outside the valid range of values for the field
	         * then a {@code DateTimeException} will be thrown.
	         * <p>
	         * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
	         * <p>
	         * If the field is not a {@code ChronoField}, then the result of this method
	         * is obtained by invoking {@code TemporalField.adjustInto(Temporal, long)}
	         * passing {@code this} as the argument. In this case, the field determines
	         * whether and how to adjust the instant.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param field  the field to set in the result, not null
	         * @param newValue  the new value of the field in the result
	         * @return a {@code LocalDate} based on {@code this} with the specified field set, not null
	         * @throws DateTimeException if the field cannot be set
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: '_with2',
	        value: function _with2(field, newValue) {
	            (0, _assert.assert)(field != null, 'field', _errors.NullPointerException);
	            if (field instanceof _ChronoField.ChronoField) {
	                var f = field;
	                f.checkValidValue(newValue);
	                switch (f) {
	                    case _ChronoField.ChronoField.DAY_OF_WEEK:
	                        return this.plusDays(newValue - this.getDayOfWeek().value());
	                    case _ChronoField.ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH:
	                        return this.plusDays(newValue - this.getLong(_ChronoField.ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH));
	                    case _ChronoField.ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR:
	                        return this.plusDays(newValue - this.getLong(_ChronoField.ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR));
	                    case _ChronoField.ChronoField.DAY_OF_MONTH:
	                        return this.withDayOfMonth(newValue);
	                    case _ChronoField.ChronoField.DAY_OF_YEAR:
	                        return this.withDayOfYear(newValue);
	                    case _ChronoField.ChronoField.EPOCH_DAY:
	                        return LocalDate.ofEpochDay(newValue);
	                    case _ChronoField.ChronoField.ALIGNED_WEEK_OF_MONTH:
	                        return this.plusWeeks(newValue - this.getLong(_ChronoField.ChronoField.ALIGNED_WEEK_OF_MONTH));
	                    case _ChronoField.ChronoField.ALIGNED_WEEK_OF_YEAR:
	                        return this.plusWeeks(newValue - this.getLong(_ChronoField.ChronoField.ALIGNED_WEEK_OF_YEAR));
	                    case _ChronoField.ChronoField.MONTH_OF_YEAR:
	                        return this.withMonth(newValue);
	                    case _ChronoField.ChronoField.PROLEPTIC_MONTH:
	                        return this.plusMonths(newValue - this.getLong(_ChronoField.ChronoField.PROLEPTIC_MONTH));
	                    case _ChronoField.ChronoField.YEAR_OF_ERA:
	                        return this.withYear(this._year >= 1 ? newValue : 1 - newValue);
	                    case _ChronoField.ChronoField.YEAR:
	                        return this.withYear(newValue);
	                    case _ChronoField.ChronoField.ERA:
	                        return this.getLong(_ChronoField.ChronoField.ERA) === newValue ? this : this.withYear(1 - this._year);
	                }
	                throw new _errors.UnsupportedTemporalTypeException('Unsupported field: ' + field);
	            }
	            return field.adjustInto(this, newValue);
	        }
	
	        /**
	         * Returns a copy of this date with the year altered.
	         * If the day-of-month is invalid for the year, it will be changed to the last valid day of the month.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param year  the year to set in the result, from MIN_YEAR to MAX_YEAR
	         * @return a {@code LocalDate} based on this date with the requested year, not null
	         * @throws DateTimeException if the year value is invalid
	         */
	
	    }, {
	        key: 'withYear',
	        value: function withYear(year) {
	            if (this._year === year) {
	                return this;
	            }
	            _ChronoField.ChronoField.YEAR.checkValidValue(year);
	            return LocalDate._resolvePreviousValid(year, this._month, this._day);
	        }
	
	        /**
	         * Returns a copy of this date with the month-of-year altered.
	         * If the day-of-month is invalid for the year, it will be changed to the last valid day of the month.
	         *
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param month  the month-of-year to set in the result, from 1 (January) to 12 (December)
	         * @return a {@code LocalDate} based on this date with the requested month, not null
	         * @throws DateTimeException if the month-of-year value is invalid
	         */
	
	    }, {
	        key: 'withMonth',
	        value: function withMonth(month) {
	            var m = month instanceof _Month.Month ? month.value() : month;
	            if (this._month === m) {
	                return this;
	            }
	            _ChronoField.ChronoField.MONTH_OF_YEAR.checkValidValue(m);
	            return LocalDate._resolvePreviousValid(this._year, m, this._day);
	        }
	
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
	
	    }, {
	        key: 'withDayOfMonth',
	        value: function withDayOfMonth(dayOfMonth) {
	            if (this._day === dayOfMonth) {
	                return this;
	            }
	            return LocalDate.of(this._year, this._month, dayOfMonth);
	        }
	
	        /**
	         * Returns a copy of this date with the day-of-year altered.
	         * If the resulting date is invalid, an exception is thrown.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param dayOfYear  the day-of-year to set in the result, from 1 to 365-366
	         * @return a {@code LocalDate} based on this date with the requested day, not null
	         * @throws DateTimeException if the day-of-year value is invalid
	         * @throws DateTimeException if the day-of-year is invalid for the year
	         */
	
	    }, {
	        key: 'withDayOfYear',
	        value: function withDayOfYear(dayOfYear) {
	            if (this.dayOfYear() === dayOfYear) {
	                return this;
	            }
	            return LocalDate.ofYearDay(this._year, dayOfYear);
	        }
	
	        /**
	         * function overloading for plus
	         */
	
	    }, {
	        key: 'plus',
	        value: function plus(p1, p2) {
	            if (arguments.length < 2) {
	                return this._plus1(p1);
	            } else {
	                return this._plus2(p1, p2);
	            }
	        }
	
	        /**
	         * Returns a copy of this date with the specified period added.
	         * <p>
	         * This method returns a new date based on this date with the specified period added.
	         * The amount is typically {@link Period} but may be any other type implementing
	         * the {@link TemporalAmount} interface.
	         * The calculation is delegated to the specified adjuster, which typically calls
	         * back to {@link #plus(long, TemporalUnit)}.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param amount  the amount to add, not null
	         * @return a {@code LocalDate} based on this date with the addition made, not null
	         * @throws DateTimeException if the addition cannot be made
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: '_plus1',
	        value: function _plus1(amount) {
	            (0, _assert.requireNonNull)(amount, 'amount');
	            return amount.addTo(this);
	        }
	
	        /**
	         * Returns a copy of this date with the specified period added.
	         * <p>
	         * This method returns a new date based on this date with the specified period added.
	         * This can be used to add any period that is defined by a unit, for example to add years, months or days.
	         * The unit is responsible for the details of the calculation, including the resolution
	         * of any edge cases in the calculation.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param amountToAdd  the amount of the unit to add to the result, may be negative
	         * @param unit  the unit of the period to add, not null
	         * @return a {@code LocalDate} based on this date with the specified period added, not null
	         * @throws DateTimeException if the unit cannot be added to this type
	         */
	
	    }, {
	        key: '_plus2',
	        value: function _plus2(amountToAdd, unit) {
	            (0, _assert.requireNonNull)(amountToAdd, 'amountToAdd');
	            (0, _assert.requireNonNull)(unit, 'unit');
	            if (unit instanceof _ChronoUnit.ChronoUnit) {
	                switch (unit) {
	                    case _ChronoUnit.ChronoUnit.DAYS:
	                        return this.plusDays(amountToAdd);
	                    case _ChronoUnit.ChronoUnit.WEEKS:
	                        return this.plusWeeks(amountToAdd);
	                    case _ChronoUnit.ChronoUnit.MONTHS:
	                        return this.plusMonths(amountToAdd);
	                    case _ChronoUnit.ChronoUnit.YEARS:
	                        return this.plusYears(amountToAdd);
	                    case _ChronoUnit.ChronoUnit.DECADES:
	                        return this.plusYears(_MathUtil.MathUtil.safeMultiply(amountToAdd, 10));
	                    case _ChronoUnit.ChronoUnit.CENTURIES:
	                        return this.plusYears(_MathUtil.MathUtil.safeMultiply(amountToAdd, 100));
	                    case _ChronoUnit.ChronoUnit.MILLENNIA:
	                        return this.plusYears(_MathUtil.MathUtil.safeMultiply(amountToAdd, 1000));
	                    case _ChronoUnit.ChronoUnit.ERAS:
	                        return this.with(_ChronoField.ChronoField.ERA, _MathUtil.MathUtil.safeAdd(this.getLong(_ChronoField.ChronoField.ERA), amountToAdd));
	                }
	                throw new _errors.UnsupportedTemporalTypeException('Unsupported unit: ' + unit);
	            }
	            return unit.addTo(this, amountToAdd);
	        }
	
	        /**
	         * Returns a copy of this {@code LocalDate} with the specified period in years added.
	         * <p>
	         * This method adds the specified amount to the years field in three steps:
	         * <ol>
	         * <li>Add the input years to the year field</li>
	         * <li>Check if the resulting date would be invalid</li>
	         * <li>Adjust the day-of-month to the last valid day if necessary</li>
	         * </ol>
	         * <p>
	         * For example, 2008-02-29 (leap year) plus one year would result in the
	         * invalid date 2009-02-29 (standard year). Instead of returning an invalid
	         * result, the last valid day of the month, 2009-02-28, is selected instead.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param yearsToAdd  the years to add, may be negative
	         * @return a {@code LocalDate} based on this date with the years added, not null
	         * @throws DateTimeException if the result exceeds the supported date range
	         */
	
	    }, {
	        key: 'plusYears',
	        value: function plusYears(yearsToAdd) {
	            if (yearsToAdd === 0) {
	                return this;
	            }
	            var newYear = _ChronoField.ChronoField.YEAR.checkValidIntValue(this._year + yearsToAdd); // safe overflow
	            return LocalDate._resolvePreviousValid(newYear, this._month, this._day);
	        }
	
	        /**
	         * Returns a copy of this {@code LocalDate} with the specified period in months added.
	         * <p>
	         * This method adds the specified amount to the months field in three steps:
	         * <ol>
	         * <li>Add the input months to the month-of-year field</li>
	         * <li>Check if the resulting date would be invalid</li>
	         * <li>Adjust the day-of-month to the last valid day if necessary</li>
	         * </ol>
	         * <p>
	         * For example, 2007-03-31 plus one month would result in the invalid date
	         * 2007-04-31. Instead of returning an invalid result, the last valid day
	         * of the month, 2007-04-30, is selected instead.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param monthsToAdd  the months to add, may be negative
	         * @return a {@code LocalDate} based on this date with the months added, not null
	         * @throws DateTimeException if the result exceeds the supported date range
	         */
	
	    }, {
	        key: 'plusMonths',
	        value: function plusMonths(monthsToAdd) {
	            if (monthsToAdd === 0) {
	                return this;
	            }
	            var monthCount = this._year * 12 + (this._month - 1);
	            var calcMonths = monthCount + monthsToAdd; // safe overflow
	            var newYear = _ChronoField.ChronoField.YEAR.checkValidIntValue(_MathUtil.MathUtil.floorDiv(calcMonths, 12));
	            var newMonth = _MathUtil.MathUtil.floorMod(calcMonths, 12) + 1;
	            return LocalDate._resolvePreviousValid(newYear, newMonth, this._day);
	        }
	
	        /**
	         * Returns a copy of this {@code LocalDate} with the specified period in weeks added.
	         * <p>
	         * This method adds the specified amount in weeks to the days field incrementing
	         * the month and year fields as necessary to ensure the result remains valid.
	         * The result is only invalid if the maximum/minimum year is exceeded.
	         * <p>
	         * For example, 2008-12-31 plus one week would result in 2009-01-07.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param weeksToAdd  the weeks to add, may be negative
	         * @return a {@code LocalDate} based on this date with the weeks added, not null
	         * @throws DateTimeException if the result exceeds the supported date range
	         */
	
	    }, {
	        key: 'plusWeeks',
	        value: function plusWeeks(weeksToAdd) {
	            return this.plusDays(_MathUtil.MathUtil.safeMultiply(weeksToAdd, 7));
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
	            var mjDay = _MathUtil.MathUtil.safeAdd(this.toEpochDay(), daysToAdd);
	            return LocalDate.ofEpochDay(mjDay);
	        }
	
	        /**
	         * function overloading for minus
	         */
	
	    }, {
	        key: 'minus',
	        value: function minus(p1, p2) {
	            if (arguments.length < 2) {
	                return this._minus1(p1);
	            } else {
	                return this._minus2(p1, p2);
	            }
	        }
	
	        /**
	         * Returns a copy of this date with the specified period subtracted.
	         * <p>
	         * This method returns a new date based on this date with the specified period subtracted.
	         * The amount is typically {@link Period} but may be any other type implementing
	         * the {@link TemporalAmount} interface.
	         * The calculation is delegated to the specified adjuster, which typically calls
	         * back to {@link #minus(long, TemporalUnit)}.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param amount  the amount to subtract, not null
	         * @return a {@code LocalDate} based on this date with the subtraction made, not null
	         * @throws DateTimeException if the subtraction cannot be made
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: '_minus1',
	        value: function _minus1(amount) {
	            (0, _assert.requireNonNull)(amount, 'amount');
	            return amount.subtractFrom(this);
	        }
	
	        /**
	         * Returns a copy of this date with the specified period subtracted.
	         * <p>
	         * This method returns a new date based on this date with the specified period subtracted.
	         * This can be used to subtract any period that is defined by a unit, for example to subtract years, months or days.
	         * The unit is responsible for the details of the calculation, including the resolution
	         * of any edge cases in the calculation.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param amountToSubtract  the amount of the unit to subtract from the result, may be negative
	         * @param unit  the unit of the period to subtract, not null
	         * @return a {@code LocalDate} based on this date with the specified period subtracted, not null
	         * @throws DateTimeException if the unit cannot be added to this type
	         */
	
	    }, {
	        key: '_minus2',
	        value: function _minus2(amountToSubtract, unit) {
	            (0, _assert.requireNonNull)(amountToSubtract, 'amountToSubtract');
	            (0, _assert.requireNonNull)(unit, 'unit');
	            return this._plus2(-1 * amountToSubtract, unit);
	        }
	
	        /**
	         * Returns a copy of this {@code LocalDate} with the specified period in years subtracted.
	         * <p>
	         * This method subtracts the specified amount from the years field in three steps:
	         * <ol>
	         * <li>Subtract the input years to the year field</li>
	         * <li>Check if the resulting date would be invalid</li>
	         * <li>Adjust the day-of-month to the last valid day if necessary</li>
	         * </ol>
	         * <p>
	         * For example, 2008-02-29 (leap year) minus one year would result in the
	         * invalid date 2007-02-29 (standard year). Instead of returning an invalid
	         * result, the last valid day of the month, 2007-02-28, is selected instead.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param yearsToSubtract  the years to subtract, may be negative
	         * @return a {@code LocalDate} based on this date with the years subtracted, not null
	         * @throws DateTimeException if the result exceeds the supported date range
	         */
	
	    }, {
	        key: 'minusYears',
	        value: function minusYears(yearsToSubtract) {
	            return this.plusYears(yearsToSubtract * -1);
	        }
	
	        /**
	         * Returns a copy of this {@code LocalDate} with the specified period in months subtracted.
	         * <p>
	         * This method subtracts the specified amount from the months field in three steps:
	         * <ol>
	         * <li>Subtract the input months to the month-of-year field</li>
	         * <li>Check if the resulting date would be invalid</li>
	         * <li>Adjust the day-of-month to the last valid day if necessary</li>
	         * </ol>
	         * <p>
	         * For example, 2007-03-31 minus one month would result in the invalid date
	         * 2007-02-31. Instead of returning an invalid result, the last valid day
	         * of the month, 2007-02-28, is selected instead.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param monthsToSubtract  the months to subtract, may be negative
	         * @return a {@code LocalDate} based on this date with the months subtracted, not null
	         * @throws DateTimeException if the result exceeds the supported date range
	         */
	
	    }, {
	        key: 'minusMonths',
	        value: function minusMonths(monthsToSubtract) {
	            return this.plusMonths(monthsToSubtract * -1);
	        }
	
	        /**
	         * Returns a copy of this {@code LocalDate} with the specified period in weeks subtracted.
	         * <p>
	         * This method subtracts the specified amount in weeks from the days field decrementing
	         * the month and year fields as necessary to ensure the result remains valid.
	         * The result is only invalid if the maximum/minimum year is exceeded.
	         * <p>
	         * For example, 2009-01-07 minus one week would result in 2008-12-31.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param weeksToSubtract  the weeks to subtract, may be negative
	         * @return a {@code LocalDate} based on this date with the weeks subtracted, not null
	         * @throws DateTimeException if the result exceeds the supported date range
	         */
	
	    }, {
	        key: 'minusWeeks',
	        value: function minusWeeks(weeksToSubtract) {
	            return this.plusWeeks(weeksToSubtract * -1);
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
	         * Queries this date using the specified query.
	         *
	         * This queries this date using the specified query strategy object.
	         * The {@code TemporalQuery} object defines the logic to be used to
	         * obtain the result. Read the documentation of the query to understand
	         * what the result of this method will be.
	         *
	         * The result of this method is obtained by invoking the
	         * {@link TemporalQuery#queryFrom(TemporalAccessor)} method on the
	         * specified query passing {@code this} as the argument.
	         *
	         * @param query  the query to invoke, not null
	         * @return the query result, null may be returned (defined by the query)
	         * @throws DateTimeException if unable to query (defined by the query)
	         * @throws ArithmeticException if numeric overflow occurs (defined by the query)
	         */
	
	    }, {
	        key: 'query',
	        value: function query(_query) {
	            (0, _assert.assert)(_query != null, '', _errors.NullPointerException);
	            if (_query === _TemporalQueries.TemporalQueries.localDate()) {
	                return this;
	            }
	            return _get(Object.getPrototypeOf(LocalDate.prototype), 'query', this).call(this, _query);
	        }
	
	        /**
	         * Adjusts the specified temporal object to have the same date as this object.
	         * <p>
	         * This returns a temporal object of the same observable type as the input
	         * with the date changed to be the same as this.
	         * <p>
	         * The adjustment is equivalent to using {@link Temporal#with(TemporalField, long)}
	         * passing {@link ChronoField#EPOCH_DAY} as the field.
	         * <p>
	         * In most cases, it is clearer to reverse the calling pattern by using
	         * {@link Temporal#with(TemporalAdjuster)}:
	         * <pre>
	         *   // these two lines are equivalent, but the second approach is recommended
	         *   temporal = thisLocalDate.adjustInto(temporal);
	         *   temporal = temporal.with(thisLocalDate);
	         * </pre>
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param temporal  the target object to be adjusted, not null
	         * @return the adjusted object, not null
	         * @throws DateTimeException if unable to make the adjustment
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'adjustInto',
	        value: function adjustInto(temporal) {
	            return _get(Object.getPrototypeOf(LocalDate.prototype), 'adjustInto', this).call(this, temporal);
	        }
	
	        /**
	         * until function overloading
	         */
	
	    }, {
	        key: 'until',
	        value: function until(p1, p2) {
	            if (arguments.length < 2) {
	                return this._until1(p1);
	            } else {
	                return this._until2(p1, p2);
	            }
	        }
	
	        /**
	         * Calculates the period between this date and another date in
	         * terms of the specified unit.
	         * <p>
	         * This calculates the period between two dates in terms of a single unit.
	         * The start and end points are {@code this} and the specified date.
	         * The result will be negative if the end is before the start.
	         * The {@code Temporal} passed to this method must be a {@code LocalDate}.
	         * For example, the period in days between two dates can be calculated
	         * using {@code startDate.until(endDate, DAYS)}.
	         * <p>
	         * The calculation returns a whole number, representing the number of
	         * complete units between the two dates.
	         * For example, the period in months between 2012-06-15 and 2012-08-14
	         * will only be one month as it is one day short of two months.
	         * <p>
	         * This method operates in association with {@link TemporalUnit#between}.
	         * The result of this method is a {@code long} representing the amount of
	         * the specified unit. By contrast, the result of {@code between} is an
	         * object that can be used directly in addition/subtraction:
	         * <pre>
	         *   long period = start.until(end, MONTHS);   // this method
	         *   dateTime.plus(MONTHS.between(start, end));      // use in plus/minus
	         * </pre>
	         * <p>
	         * The calculation is implemented in this method for {@link ChronoUnit}.
	         * The units {@code DAYS}, {@code WEEKS}, {@code MONTHS}, {@code YEARS},
	         * {@code DECADES}, {@code CENTURIES}, {@code MILLENNIA} and {@code ERAS}
	         * are supported. Other {@code ChronoUnit} values will throw an exception.
	         * <p>
	         * If the unit is not a {@code ChronoUnit}, then the result of this method
	         * is obtained by invoking {@code TemporalUnit.between(Temporal, Temporal)}
	         * passing {@code this} as the first argument and the input temporal as
	         * the second argument.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param endExclusive  the end date, which is converted to a {@code LocalDate}, not null
	         * @param unit  the unit to measure the period in, not null
	         * @return the amount of the period between this date and the end date
	         * @throws DateTimeException if the period cannot be calculated
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: '_until2',
	        value: function _until2(endExclusive, unit) {
	            var end = LocalDate.from(endExclusive);
	            if (unit instanceof _ChronoUnit.ChronoUnit) {
	                switch (unit) {
	                    case _ChronoUnit.ChronoUnit.DAYS:
	                        return this.daysUntil(end);
	                    case _ChronoUnit.ChronoUnit.WEEKS:
	                        return this.daysUntil(end) / 7;
	                    case _ChronoUnit.ChronoUnit.MONTHS:
	                        return this.monthsUntil(end);
	                    case _ChronoUnit.ChronoUnit.YEARS:
	                        return this.monthsUntil(end) / 12;
	                    case _ChronoUnit.ChronoUnit.DECADES:
	                        return this.monthsUntil(end) / 120;
	                    case _ChronoUnit.ChronoUnit.CENTURIES:
	                        return this.monthsUntil(end) / 1200;
	                    case _ChronoUnit.ChronoUnit.MILLENNIA:
	                        return this.monthsUntil(end) / 12000;
	                    case _ChronoUnit.ChronoUnit.ERAS:
	                        return end.getLong(_ChronoField.ChronoField.ERA) - this.getLong(_ChronoField.ChronoField.ERA);
	                }
	                throw new _errors.UnsupportedTemporalTypeException('Unsupported unit: ' + unit);
	            }
	            return unit.between(this, end);
	        }
	    }, {
	        key: 'daysUntil',
	        value: function daysUntil(end) {
	            return end.toEpochDay() - this.toEpochDay(); // no overflow
	        }
	    }, {
	        key: 'monthsUntil',
	        value: function monthsUntil(end) {
	            var packed1 = this._prolepticMonth() * 32 + this.dayOfMonth(); // no overflow
	            var packed2 = end._prolepticMonth() * 32 + end.dayOfMonth(); // no overflow
	            return _MathUtil.MathUtil.floorDiv(packed2 - packed1, 32);
	        }
	
	        /**
	         * Calculates the period between this date and another date as a {@code Period}.
	         * <p>
	         * This calculates the period between two dates in terms of years, months and days.
	         * The start and end points are {@code this} and the specified date.
	         * The result will be negative if the end is before the start.
	         * <p>
	         * The calculation is performed using the ISO calendar system.
	         * If necessary, the input date will be converted to ISO.
	         * <p>
	         * The start date is included, but the end date is not.
	         * The period is calculated by removing complete months, then calculating
	         * the remaining number of days, adjusting to ensure that both have the same sign.
	         * The number of months is then normalized into years and months based on a 12 month year.
	         * A month is considered to be complete if the end day-of-month is greater
	         * than or equal to the start day-of-month.
	         * For example, from {@code 2010-01-15} to {@code 2011-03-18} is "1 year, 2 months and 3 days".
	         * <p>
	         * The result of this method can be a negative period if the end is before the start.
	         * The negative sign will be the same in each of year, month and day.
	         * <p>
	         * There are two equivalent ways of using this method.
	         * The first is to invoke this method.
	         * The second is to use {@link Period#between(LocalDate, LocalDate)}:
	         * <pre>
	         *   // these two lines are equivalent
	         *   period = start.until(end);
	         *   period = Period.between(start, end);
	         * </pre>
	         * The choice should be made based on which makes the code more readable.
	         *
	         * @param endDate  the end date, exclusive, which may be in any chronology, not null
	         * @return the period between this date and the end date, not null
	         */
	
	    }, {
	        key: '_until1',
	        value: function _until1(endDate) {
	            var end = LocalDate.from(endDate);
	            var totalMonths = end._prolepticMonth() - this._prolepticMonth(); // safe
	            var days = end._day - this._day;
	            if (totalMonths > 0 && days < 0) {
	                totalMonths--;
	                var calcDate = this.plusMonths(totalMonths);
	                days = end.toEpochDay() - calcDate.toEpochDay(); // safe
	            } else if (totalMonths < 0 && days > 0) {
	                    totalMonths++;
	                    days -= end.lengthOfMonth();
	                }
	            var years = _MathUtil.MathUtil.intDiv(totalMonths, 12); // safe
	            var months = _MathUtil.MathUtil.intMod(totalMonths, 12); // safe
	            return _Period.Period.of(_MathUtil.MathUtil.safeToInt(years), months, days);
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
	         * Compares this date to another date.
	         * <p>
	         * The comparison is primarily based on the date, from earliest to latest.
	         * It is "consistent with equals", as defined by {@link Comparable}.
	         * <p>
	         * If all the dates being compared are instances of {@code LocalDate},
	         * then the comparison will be entirely based on the date.
	         * If some dates being compared are in different chronologies, then the
	         * chronology is also considered, see {@link ChronoLocalDate#compareTo}.
	         *
	         * @param other  the other date to compare to, not null
	         * @return the comparator value, negative if less, positive if greater
	         */
	
	    }, {
	        key: 'compareTo',
	        value: function compareTo(other) {
	            (0, _assert.requireNonNull)(other, 'other');
	            (0, _assert.requireInstance)(other, LocalDate, 'other');
	            if (other instanceof LocalDate) {
	                return this._compareTo0(other);
	            }
	            // super.compareTo(other);
	        }
	    }, {
	        key: '_compareTo0',
	        value: function _compareTo0(otherDate) {
	            var cmp = this._year - otherDate._year;
	            if (cmp === 0) {
	                cmp = this._month - otherDate._month;
	                if (cmp === 0) {
	                    cmp = this._day - otherDate._day;
	                }
	            }
	            return cmp;
	        }
	
	        /**
	         * Checks if this date is after the specified date.
	         * <p>
	         * This checks to see if this date represents a point on the
	         * local time-line after the other date.
	         * <pre>
	         *   LocalDate a = LocalDate.of(2012, 6, 30);
	         *   LocalDate b = LocalDate.of(2012, 7, 1);
	         *   a.isAfter(b) == false
	         *   a.isAfter(a) == false
	         *   b.isAfter(a) == true
	         * </pre>
	         * <p>
	         * This method only considers the position of the two dates on the local time-line.
	         * It does not take into account the chronology, or calendar system.
	         * This is different from the comparison in {@link #compareTo(ChronoLocalDate)},
	         * but is the same approach as {@link #DATE_COMPARATOR}.
	         *
	         * @param other  the other date to compare to, not null
	         * @return true if this date is after the specified date
	         */
	
	    }, {
	        key: 'isAfter',
	        value: function isAfter(other) {
	            return this.compareTo(other) > 0;
	            // return super.isAfter(other) if not instanceof LocalDate
	        }
	
	        /**
	         * Checks if this date is before the specified date.
	         * <p>
	         * This checks to see if this date represents a point on the
	         * local time-line before the other date.
	         * <pre>
	         *   LocalDate a = LocalDate.of(2012, 6, 30);
	         *   LocalDate b = LocalDate.of(2012, 7, 1);
	         *   a.isBefore(b) == true
	         *   a.isBefore(a) == false
	         *   b.isBefore(a) == false
	         * </pre>
	         * <p>
	         * This method only considers the position of the two dates on the local time-line.
	         * It does not take into account the chronology, or calendar system.
	         * This is different from the comparison in {@link #compareTo(ChronoLocalDate)},
	         * but is the same approach as {@link #DATE_COMPARATOR}.
	         *
	         * @param other  the other date to compare to, not null
	         * @return true if this date is before the specified date
	         */
	
	    }, {
	        key: 'isBefore',
	        value: function isBefore(other) {
	            return this.compareTo(other) < 0;
	            // return super.isBefore(other) if not instanceof LocalDate
	        }
	
	        /**
	         * Checks if this date is equal to the specified date.
	         * <p>
	         * This checks to see if this date represents the same point on the
	         * local time-line as the other date.
	         * <pre>
	         *   LocalDate a = LocalDate.of(2012, 6, 30);
	         *   LocalDate b = LocalDate.of(2012, 7, 1);
	         *   a.isEqual(b) == false
	         *   a.isEqual(a) == true
	         *   b.isEqual(a) == false
	         * </pre>
	         * <p>
	         * This method only considers the position of the two dates on the local time-line.
	         * It does not take into account the chronology, or calendar system.
	         * This is different from the comparison in {@link #compareTo(ChronoLocalDate)}
	         * but is the same approach as {@link #DATE_COMPARATOR}.
	         *
	         * @param other  the other date to compare to, not null
	         * @return true if this date is equal to the specified date
	         */
	
	    }, {
	        key: 'isEqual',
	        value: function isEqual(other) {
	            return this.compareTo(other) === 0;
	            // return super.isEqual(other) if not instanceof LocalDate
	        }
	
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
	
	    }, {
	        key: 'equals',
	        value: function equals(otherDate) {
	            if (this === otherDate) {
	                return true;
	            }
	            if (otherDate instanceof LocalDate) {
	                return this._compareTo0(otherDate) === 0;
	            }
	            return false;
	        }
	
	        /**
	         * A hash code for this date.
	         *
	         * @return a suitable hash code
	         */
	
	    }, {
	        key: 'hashCode',
	        value: function hashCode() {
	            var yearValue = this._year;
	            var monthValue = this._month;
	            var dayValue = this._day;
	            return yearValue & 0xFFFFF800 ^ (yearValue << 11) + (monthValue << 6) + dayValue;
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
	    }], [{
	        key: '_validate',
	        value: function _validate(year, month, dayOfMonth) {
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
	}(_ChronoLocalDate2.ChronoLocalDate);
	
	exports.LocalDate = LocalDate;
	function _init() {
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
	
	    LocalDate.FROM = (0, _TemporalQueries.createTemporalQuery)('LocalDate.FROM', function (temporal) {
	        return LocalDate.from(temporal);
	    });
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ChronoLocalDate = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _ChronoField = __webpack_require__(3);
	
	var _ChronoUnit = __webpack_require__(7);
	
	var _TemporalQueries = __webpack_require__(21);
	
	var _TemporalAccessor2 = __webpack_require__(23);
	
	var _LocalDate = __webpack_require__(19);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ChronoLocalDate = function (_TemporalAccessor) {
	    _inherits(ChronoLocalDate, _TemporalAccessor);
	
	    function ChronoLocalDate() {
	        _classCallCheck(this, ChronoLocalDate);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ChronoLocalDate).apply(this, arguments));
	    }
	
	    _createClass(ChronoLocalDate, [{
	        key: 'isSupported',
	        value: function isSupported(fieldOrUnit) {
	            if (fieldOrUnit instanceof _ChronoField.ChronoField) {
	                return fieldOrUnit.isDateBased();
	            } else if (fieldOrUnit instanceof _ChronoUnit.ChronoUnit) {
	                return fieldOrUnit.isDateBased();
	            }
	            return fieldOrUnit != null && fieldOrUnit.isSupportedBy(this);
	        }
	    }, {
	        key: 'query',
	        value: function query(_query) {
	            if (_query === _TemporalQueries.TemporalQueries.chronology()) {
	                return this.chronology();
	            } else if (_query === _TemporalQueries.TemporalQueries.precision()) {
	                return _ChronoUnit.ChronoUnit.DAYS;
	            } else if (_query === _TemporalQueries.TemporalQueries.localDate()) {
	                return _LocalDate.LocalDate.ofEpochDay(this.toEpochDay());
	            } else if (_query === _TemporalQueries.TemporalQueries.localTime() || _query === _TemporalQueries.TemporalQueries.zone() || _query === _TemporalQueries.TemporalQueries.zoneId() || _query === _TemporalQueries.TemporalQueries.offset()) {
	                return null;
	            }
	            return _get(Object.getPrototypeOf(ChronoLocalDate.prototype), 'query', this).call(this, _query);
	        }
	    }, {
	        key: 'adjustInto',
	        value: function adjustInto(temporal) {
	            return temporal.with(_ChronoField.ChronoField.EPOCH_DAY, this.toEpochDay());
	        }
	    }]);
	
	    return ChronoLocalDate;
	}(_TemporalAccessor2.TemporalAccessor);

	exports.ChronoLocalDate = ChronoLocalDate;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TemporalQueries = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	exports.createTemporalQuery = createTemporalQuery;
	exports._init = _init;
	
	var _Enum2 = __webpack_require__(18);
	
	var _ChronoField = __webpack_require__(3);
	
	var _LocalDate = __webpack_require__(19);
	
	var _LocalTime = __webpack_require__(11);
	
	var _ZoneOffset = __webpack_require__(22);
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
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
	
	var TemporalQueries = exports.TemporalQueries = function () {
	    function TemporalQueries() {
	        _classCallCheck(this, TemporalQueries);
	    }
	
	    _createClass(TemporalQueries, null, [{
	        key: 'zoneId',
	
	
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
	        key: 'chronology',
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
	        key: 'precision',
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
	        key: 'zone',
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
	        key: 'offset',
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
	        key: 'localDate',
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
	        key: 'localTime',
	        value: function localTime() {
	            return TemporalQueries.LOCAL_TIME;
	        }
	    }]);
	
	    return TemporalQueries;
	}();
	
	/** 
	 * Factory to create something similar to the JSR-310 {TemporalQuery} interface, takes a function and returns a new TemporalQuery object that presents that function
	 * as the queryFrom() function.
	 * TODO: maybe should be moved to a separate file?
	 * @param name
	 * @param queryFromFunction
	 */
	
	
	function createTemporalQuery(name, queryFromFunction) {
	    var TemporalQuery = function (_Enum) {
	        _inherits(TemporalQuery, _Enum);
	
	        function TemporalQuery() {
	            _classCallCheck(this, TemporalQuery);
	
	            return _possibleConstructorReturn(this, Object.getPrototypeOf(TemporalQuery).apply(this, arguments));
	        }
	
	        return TemporalQuery;
	    }(_Enum2.Enum);
	
	    TemporalQuery.prototype.queryFrom = queryFromFunction;
	    return new TemporalQuery(name);
	}
	
	function _init() {
	    //-----------------------------------------------------------------------
	    /**
	     * A strict query for the {@code ZoneId}.
	     */
	    TemporalQueries.ZONE_ID = createTemporalQuery('ZONE_ID', function (temporal) {
	        return temporal.query(TemporalQueries.ZONE_ID);
	    });
	
	    /**
	     * A query for the {@code Chronology}.
	     */
	    TemporalQueries.CHRONO = createTemporalQuery('CHRONO', function (temporal) {
	        return temporal.query(TemporalQueries.CHRONO);
	    });
	
	    /**
	     * A query for the smallest supported unit.
	     */
	    TemporalQueries.PRECISION = createTemporalQuery('PRECISION', function (temporal) {
	        return temporal.query(TemporalQueries.PRECISION);
	    });
	
	    //-----------------------------------------------------------------------
	    /**
	     * A query for {@code ZoneOffset} returning null if not found.
	     */
	    TemporalQueries.OFFSET = createTemporalQuery('OFFSET', function (temporal) {
	        if (temporal.isSupported(_ChronoField.ChronoField.OFFSET_SECONDS)) {
	            return _ZoneOffset.ZoneOffset.ofTotalSeconds(temporal.get(TemporalQueries.OFFSET_SECONDS));
	        }
	        return null;
	    });
	
	    /**
	     * A lenient query for the {@code ZoneId}, falling back to the {@code ZoneOffset}.
	     */
	    TemporalQueries.ZONE = createTemporalQuery('ZONE', function (temporal) {
	        var zone = temporal.query(TemporalQueries.ZONE_ID);
	        return zone != null ? zone : temporal.query(TemporalQueries.OFFSET);
	    });
	
	    /**
	     * A query for {@code LocalDate} returning null if not found.
	     */
	    TemporalQueries.LOCAL_DATE = createTemporalQuery('LOCAL_DATE', function (temporal) {
	        if (temporal.isSupported(_ChronoField.ChronoField.EPOCH_DAY)) {
	            return _LocalDate.LocalDate.ofEpochDay(temporal.getLong(TemporalQueries.EPOCH_DAY));
	        }
	        return null;
	    });
	
	    /**
	     * A query for {@code LocalTime} returning null if not found.
	     */
	    TemporalQueries.LOCAL_TIME = createTemporalQuery('LOCAL_TIME', function (temporal) {
	        if (temporal.isSupported(_ChronoField.ChronoField.NANO_OF_DAY)) {
	            return _LocalTime.LocalTime.ofNanoOfDay(temporal.getLong(TemporalQueries.NANO_OF_DAY));
	        }
	        return null;
	    });
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ZoneOffset = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	exports._init = _init;
	
	var _errors = __webpack_require__(5);
	
	var _LocalTime = __webpack_require__(11);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ZoneOffset = exports.ZoneOffset = function () {
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
	            if (Math.abs(totalSeconds) > ZoneOffset.MAX_SECONDS) {
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
	            if (Math.abs(hours) === 18 && (Math.abs(minutes) > 0 || Math.abs(seconds) > 0)) {
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
	                var result = ZoneOffset.SECONDS_CACHE[totalSecs];
	                if (result == null) {
	                    result = new ZoneOffset(totalSeconds);
	                    ZoneOffset.SECONDS_CACHE[totalSecs] = result;
	                }
	                return result;
	            } else {
	                return new ZoneOffset(totalSeconds);
	            }
	        }
	    }]);
	
	    return ZoneOffset;
	}();
	
	function _init() {
	    ZoneOffset.MAX_SECONDS = 18 * _LocalTime.LocalTime.SECONDS_PER_HOUR;
	    ZoneOffset.SECONDS_CACHE = {};
	    ZoneOffset.UTC = ZoneOffset.ofTotalSeconds(0);
	    ZoneOffset.MIN = ZoneOffset.ofTotalSeconds(-ZoneOffset.MAX_SECONDS);
	    ZoneOffset.MAX = ZoneOffset.ofTotalSeconds(ZoneOffset.MAX_SECONDS);
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TemporalAccessor = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _ChronoField = __webpack_require__(3);
	
	var _TemporalQueries = __webpack_require__(21);
	
	var _errors = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TemporalAccessor = function () {
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
	            if (_query === _TemporalQueries.TemporalQueries.zoneId() || _query === _TemporalQueries.TemporalQueries.chronology() || _query === _TemporalQueries.TemporalQueries.precision()) {
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
	}();

	exports.TemporalAccessor = TemporalAccessor;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DayOfWeek = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports._init = _init;
	
	var _errors = __webpack_require__(5);
	
	var _MathUtil = __webpack_require__(4);
	
	var _assert = __webpack_require__(9);
	
	var _DateTimeFormatterBuilder = __webpack_require__(25);
	
	var _ChronoField = __webpack_require__(3);
	
	var _ChronoUnit = __webpack_require__(7);
	
	var _TemporalAccessor2 = __webpack_require__(23);
	
	var _TemporalQueries = __webpack_require__(21);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper                 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos  
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var DayOfWeek = function (_TemporalAccessor) {
	    _inherits(DayOfWeek, _TemporalAccessor);
	
	    function DayOfWeek(ordinal, name) {
	        _classCallCheck(this, DayOfWeek);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DayOfWeek).call(this));
	
	        _this._ordinal = ordinal;
	        _this._name = name;
	        return _this;
	    }
	
	    _createClass(DayOfWeek, [{
	        key: 'ordinal',
	        value: function ordinal() {
	            return this._ordinal;
	        }
	    }, {
	        key: 'name',
	        value: function name() {
	            return this._name;
	        }
	    }, {
	        key: 'value',
	
	
	        /**
	         * Gets the day-of-week {@code int} value.
	         * <p>
	         * The values are numbered following the ISO-8601 standard, from 1 (Monday) to 7 (Sunday).
	         * See {@link WeekFields#dayOfWeek} for localized week-numbering.
	         *
	         * @return the day-of-week, from 1 (Monday) to 7 (Sunday)
	         */
	        value: function value() {
	            return this._ordinal + 1;
	        }
	
	        /**
	         * Gets the textual representation, such as 'Mon' or 'Friday'.
	         * <p>
	         * This returns the textual name used to identify the day-of-week.
	         * The parameters control the length of the returned text and the locale.
	         * <p>
	         * If no textual mapping is found then the {@link #getValue() numeric value} is returned.
	         *
	         * @param style  the length of the text required, not null
	         * @param locale  the locale to use, not null
	         * @return the text value of the day-of-week, not null
	         */
	
	    }, {
	        key: 'getDisplayName',
	        value: function getDisplayName(style, locale) {
	            return new _DateTimeFormatterBuilder.DateTimeFormatterBuilder().appendText(_ChronoField.ChronoField.DAY_OF_WEEK, style).toFormatter(locale).format(this);
	        }
	
	        /**
	         * Checks if the specified field is supported.
	         * <p>
	         * This checks if this day-of-week can be queried for the specified field.
	         * If false, then calling the {@link #range(TemporalField) range} and
	         * {@link #get(TemporalField) get} methods will throw an exception.
	         * <p>
	         * If the field is {@link ChronoField#DAY_OF_WEEK DAY_OF_WEEK} then
	         * this method returns true.
	         * All other {@code ChronoField} instances will return false.
	         * <p>
	         * If the field is not a {@code ChronoField}, then the result of this method
	         * is obtained by invoking {@code TemporalField.isSupportedBy(TemporalAccessor)}
	         * passing {@code this} as the argument.
	         * Whether the field is supported is determined by the field.
	         *
	         * @param field  the field to check, null returns false
	         * @return true if the field is supported on this day-of-week, false if not
	         */
	
	    }, {
	        key: 'isSupported',
	        value: function isSupported(field) {
	            if (field instanceof _ChronoField.ChronoField) {
	                return field === _ChronoField.ChronoField.DAY_OF_WEEK;
	            }
	            return field != null && field.isSupportedBy(this);
	        }
	
	        /**
	         * Gets the range of valid values for the specified field.
	         * <p>
	         * The range object expresses the minimum and maximum valid values for a field.
	         * This day-of-week is used to enhance the accuracy of the returned range.
	         * If it is not possible to return the range, because the field is not supported
	         * or for some other reason, an exception is thrown.
	         * <p>
	         * If the field is {@link ChronoField#DAY_OF_WEEK DAY_OF_WEEK} then the
	         * range of the day-of-week, from 1 to 7, will be returned.
	         * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
	         * <p>
	         * If the field is not a {@code ChronoField}, then the result of this method
	         * is obtained by invoking {@code TemporalField.rangeRefinedBy(TemporalAccessor)}
	         * passing {@code this} as the argument.
	         * Whether the range can be obtained is determined by the field.
	         *
	         * @param field  the field to query the range for, not null
	         * @return the range of valid values for the field, not null
	         * @throws DateTimeException if the range for the field cannot be obtained
	         */
	
	    }, {
	        key: 'range',
	        value: function range(field) {
	            if (field === _ChronoField.ChronoField.DAY_OF_WEEK) {
	                return field.range();
	            } else if (field instanceof _ChronoField.ChronoField) {
	                throw new _errors.UnsupportedTemporalTypeException('Unsupported field: ' + field);
	            }
	            return field.rangeRefinedBy(this);
	        }
	
	        /**
	         * Gets the value of the specified field from this day-of-week as an {@code int}.
	         * <p>
	         * This queries this day-of-week for the value for the specified field.
	         * The returned value will always be within the valid range of values for the field.
	         * If it is not possible to return the value, because the field is not supported
	         * or for some other reason, an exception is thrown.
	         * <p>
	         * If the field is {@link ChronoField#DAY_OF_WEEK DAY_OF_WEEK} then the
	         * value of the day-of-week, from 1 to 7, will be returned.
	         * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
	         * <p>
	         * If the field is not a {@code ChronoField}, then the result of this method
	         * is obtained by invoking {@code TemporalField.getFrom(TemporalAccessor)}
	         * passing {@code this} as the argument. Whether the value can be obtained,
	         * and what the value represents, is determined by the field.
	         *
	         * @param field  the field to get, not null
	         * @return the value for the field, within the valid range of values
	         * @throws DateTimeException if a value for the field cannot be obtained
	         * @throws DateTimeException if the range of valid values for the field exceeds an {@code int}
	         * @throws DateTimeException if the value is outside the range of valid values for the field
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'get',
	        value: function get(field) {
	            if (field === _ChronoField.ChronoField.DAY_OF_WEEK) {
	                return this.value();
	            }
	            return this.range(field).checkValidIntValue(this.getLong(field), field);
	        }
	
	        /**
	         * Gets the value of the specified field from this day-of-week as a {@code long}.
	         * <p>
	         * This queries this day-of-week for the value for the specified field.
	         * If it is not possible to return the value, because the field is not supported
	         * or for some other reason, an exception is thrown.
	         * <p>
	         * If the field is {@link ChronoField#DAY_OF_WEEK DAY_OF_WEEK} then the
	         * value of the day-of-week, from 1 to 7, will be returned.
	         * All other {@code ChronoField} instances will throw a {@code DateTimeException}.
	         * <p>
	         * If the field is not a {@code ChronoField}, then the result of this method
	         * is obtained by invoking {@code TemporalField.getFrom(TemporalAccessor)}
	         * passing {@code this} as the argument. Whether the value can be obtained,
	         * and what the value represents, is determined by the field.
	         *
	         * @param field  the field to get, not null
	         * @return the value for the field
	         * @throws DateTimeException if a value for the field cannot be obtained
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'getLong',
	        value: function getLong(field) {
	            if (field === _ChronoField.ChronoField.DAY_OF_WEEK) {
	                return this.value();
	            } else if (field instanceof _ChronoField.ChronoField) {
	                throw new _errors.UnsupportedTemporalTypeException('Unsupported field: ' + field);
	            }
	            return field.getFrom(this);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Returns the day-of-week that is the specified number of days after this one.
	         * <p>
	         * The calculation rolls around the end of the week from Sunday to Monday.
	         * The specified period may be negative.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param days  the days to add, positive or negative
	         * @return the resulting day-of-week, not null
	         */
	
	    }, {
	        key: 'plus',
	        value: function plus(days) {
	            var amount = _MathUtil.MathUtil.floorMod(days, 7);
	            return ENUMS[_MathUtil.MathUtil.floorMod(this._ordinal + (amount + 7), 7)];
	        }
	
	        /**
	         * Returns the day-of-week that is the specified number of days before this one.
	         * <p>
	         * The calculation rolls around the start of the year from Monday to Sunday.
	         * The specified period may be negative.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param days  the days to subtract, positive or negative
	         * @return the resulting day-of-week, not null
	         */
	
	    }, {
	        key: 'minus',
	        value: function minus(days) {
	            return this.plus(-1 * _MathUtil.MathUtil.floorMod(days, 7));
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Queries this day-of-week using the specified query.
	         * <p>
	         * This queries this day-of-week using the specified query strategy object.
	         * The {@code TemporalQuery} object defines the logic to be used to
	         * obtain the result. Read the documentation of the query to understand
	         * what the result of this method will be.
	         * <p>
	         * The result of this method is obtained by invoking the
	         * {@link TemporalQuery#queryFrom(TemporalAccessor)} method on the
	         * specified query passing {@code this} as the argument.
	         *
	         * @param query  the query to invoke, not null
	         * @return the query result, null may be returned (defined by the query)
	         * @throws DateTimeException if unable to query (defined by the query)
	         * @throws ArithmeticException if numeric overflow occurs (defined by the query)
	         */
	
	    }, {
	        key: 'query',
	        value: function query(_query) {
	            if (_query === _TemporalQueries.TemporalQueries.precision()) {
	                return _ChronoUnit.ChronoUnit.DAYS;
	            } else if (_query === _TemporalQueries.TemporalQueries.localDate() || _query === _TemporalQueries.TemporalQueries.localTime() || _query === _TemporalQueries.TemporalQueries.chronology() || _query === _TemporalQueries.TemporalQueries.zone() || _query === _TemporalQueries.TemporalQueries.zoneId() || _query === _TemporalQueries.TemporalQueries.offset()) {
	                return null;
	            }
	            (0, _assert.assert)(_query != null, 'query', _errors.NullPointerException);
	            return _query.queryFrom(this);
	        }
	
	        /**
	         * Adjusts the specified temporal object to have this day-of-week.
	         * <p>
	         * This returns a temporal object of the same observable type as the input
	         * with the day-of-week changed to be the same as this.
	         * <p>
	         * The adjustment is equivalent to using {@link Temporal#with(TemporalField, long)}
	         * passing {@link ChronoField#DAY_OF_WEEK} as the field.
	         * Note that this adjusts forwards or backwards within a Monday to Sunday week.
	         * See {@link WeekFields#dayOfWeek} for localized week start days.
	         * See {@link TemporalAdjusters} for other adjusters
	         * with more control, such as {@code next(MONDAY)}.
	         * <p>
	         * In most cases, it is clearer to reverse the calling pattern by using
	         * {@link Temporal#with(TemporalAdjuster)}:
	         * <pre>
	         *   // these two lines are equivalent, but the second approach is recommended
	         *   temporal = thisDayOfWeek.adjustInto(temporal);
	         *   temporal = temporal.with(thisDayOfWeek);
	         * </pre>
	         * <p>
	         * For example, given a date that is a Wednesday, the following are output:
	         * <pre>
	         *   dateOnWed.with(MONDAY);     // two days earlier
	         *   dateOnWed.with(TUESDAY);    // one day earlier
	         *   dateOnWed.with(WEDNESDAY);  // same date
	         *   dateOnWed.with(THURSDAY);   // one day later
	         *   dateOnWed.with(FRIDAY);     // two days later
	         *   dateOnWed.with(SATURDAY);   // three days later
	         *   dateOnWed.with(SUNDAY);     // four days later
	         * </pre>
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param temporal  the target object to be adjusted, not null
	         * @return the adjusted object, not null
	         * @throws DateTimeException if unable to make the adjustment
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'adjustInto',
	        value: function adjustInto(temporal) {
	            return temporal.with(_ChronoField.ChronoField.DAY_OF_WEEK, this.value());
	        }
	    }, {
	        key: 'equal',
	        value: function equal() {
	            return this._name;
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return this._name;
	        }
	    }], [{
	        key: 'values',
	        value: function values() {
	            return ENUMS.slice();
	        }
	    }, {
	        key: 'valueOf',
	        value: function valueOf(name) {
	            for (var ordinal = 0; ordinal < ENUMS.length; ordinal++) {
	                if (ENUMS[ordinal].name() === name) {
	                    break;
	                }
	            }
	            return DayOfWeek.of(ordinal + 1);
	        }
	
	        /**
	         * Obtains an instance of {@code DayOfWeek} from an {@code int} value.
	         * <p>
	         * {@code DayOfWeek} is an enum representing the 7 days of the week.
	         * This factory allows the enum to be obtained from the {@code int} value.
	         * The {@code int} value follows the ISO-8601 standard, from 1 (Monday) to 7 (Sunday).
	         *
	         * @param dayOfWeek  the day-of-week to represent, from 1 (Monday) to 7 (Sunday)
	         * @return the day-of-week singleton, not null
	         * @throws DateTimeException if the day-of-week is invalid
	         */
	
	    }, {
	        key: 'of',
	        value: function of(dayOfWeek) {
	            if (dayOfWeek < 1 || dayOfWeek > 7) {
	                throw new _errors.DateTimeException('Invalid value for DayOfWeek: ' + dayOfWeek);
	            }
	            return ENUMS[dayOfWeek - 1];
	        }
	
	        /**
	         * Obtains an instance of {@code DayOfWeek} from a temporal object.
	         * <p>
	         * A {@code TemporalAccessor} represents some form of date and time information.
	         * This factory converts the arbitrary temporal object to an instance of {@code DayOfWeek}.
	         * <p>
	         * The conversion extracts the {@link ChronoField#DAY_OF_WEEK DAY_OF_WEEK} field.
	         * <p>
	         * This method matches the signature of the functional interface {@link TemporalQuery}
	         * allowing it to be used as a query via method reference, {@code DayOfWeek::from}.
	         *
	         * @param temporal  the temporal object to convert, not null
	         * @return the day-of-week, not null
	         * @throws DateTimeException if unable to convert to a {@code DayOfWeek}
	         */
	
	    }, {
	        key: 'from',
	        value: function from(temporal) {
	            (0, _assert.assert)(temporal != null, 'temporal', _errors.NullPointerException);
	            if (temporal instanceof DayOfWeek) {
	                return temporal;
	            }
	            try {
	                return DayOfWeek.of(temporal.get(_ChronoField.ChronoField.DAY_OF_WEEK));
	            } catch (ex) {
	                if (ex instanceof _errors.DateTimeException) {
	                    throw new _errors.DateTimeException('Unable to obtain DayOfWeek from TemporalAccessor: ' + temporal + ', type ' + temporal.name(), ex);
	                } else {
	                    throw ex;
	                }
	            }
	        }
	    }]);
	
	    return DayOfWeek;
	}(_TemporalAccessor2.TemporalAccessor);
	
	exports.DayOfWeek = DayOfWeek;
	
	
	var ENUMS;
	
	function _init() {
	    DayOfWeek.MONDAY = new DayOfWeek(0, 'MONDAY');
	    DayOfWeek.TUESDAY = new DayOfWeek(1, 'TUESDAY');
	    DayOfWeek.WEDNESDAY = new DayOfWeek(2, 'WEDNESDAY');
	    DayOfWeek.THURSDAY = new DayOfWeek(3, 'THURSDAY');
	    DayOfWeek.FRIDAY = new DayOfWeek(4, 'FRIDAY');
	    DayOfWeek.SATURDAY = new DayOfWeek(5, 'SATURDAY');
	    DayOfWeek.SUNDAY = new DayOfWeek(6, 'SUNDAY');
	
	    DayOfWeek.FROM = (0, _TemporalQueries.createTemporalQuery)('DayOfWeek.FROM', function (temporal) {
	        return DayOfWeek.from(temporal);
	    });
	
	    ENUMS = [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY];
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DateTimeFormatterBuilder = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _assert = __webpack_require__(9);
	
	var _errors = __webpack_require__(5);
	
	var _Enum2 = __webpack_require__(18);
	
	var _DateTimeFormatter = __webpack_require__(12);
	
	var _DecimalStyle = __webpack_require__(26);
	
	var _SignStyle = __webpack_require__(27);
	
	var _ResolverStyle = __webpack_require__(28);
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MAX_WIDTH = 15; // can't parse all numbers with more then 15 digits in javascript
	
	var DateTimeFormatterBuilder = exports.DateTimeFormatterBuilder = function () {
	    function DateTimeFormatterBuilder() {
	        _classCallCheck(this, DateTimeFormatterBuilder);
	
	        /**
	         * The currently active builder, used by the outermost builder.
	         */
	        this._active = this;
	        /**
	         * The parent builder, null for the outermost builder.
	         */
	        this._parent = null;
	
	        /**
	         * The list of printers that will be used.
	         */
	        this._printerParsers = [];
	
	        /**
	         * Whether this builder produces an optional formatter.
	         */
	        this._optional = false;
	        /**
	         * The width to pad the next field to.
	         */
	        this._padNextWidth = 0;
	
	        /**
	         * The character to pad the next field with.
	         */
	        this._padNextChar = null;
	
	        /**
	         * The index of the last variable width value parser.
	         */
	        this._valueParserIndex = -1;
	    }
	
	    /**
	     * Changes the parse style to be case sensitive for the remainder of the formatter.
	     * 
	     * Parsing can be case sensitive or insensitive - by default it is case sensitive.
	     * This method allows the case sensitivity setting of parsing to be changed.
	     * 
	     * Calling this method changes the state of the builder such that all
	     * subsequent builder method calls will parse text in case sensitive mode.
	     * See {@link #parseCaseInsensitive} for the opposite setting.
	     * The parse case sensitive/insensitive methods may be called at any point
	     * in the builder, thus the parser can swap between case parsing modes
	     * multiple times during the parse.
	     * 
	     * Since the default is case sensitive, this method should only be used after
	     * a previous call to {@code #parseCaseInsensitive}.
	     *
	     * @return this, for chaining, not null
	     */
	
	
	    _createClass(DateTimeFormatterBuilder, [{
	        key: 'parseCaseSensitive',
	        value: function parseCaseSensitive() {
	            this._appendInternalPrinterParser(SettingsParser.SENSITIVE);
	            return this;
	        }
	
	        /**
	         * Changes the parse style to be case insensitive for the remainder of the formatter.
	         * 
	         * Parsing can be case sensitive or insensitive - by default it is case sensitive.
	         * This method allows the case sensitivity setting of parsing to be changed.
	         * 
	         * Calling this method changes the state of the builder such that all
	         * subsequent builder method calls will parse text in case sensitive mode.
	         * See {@link #parseCaseSensitive()} for the opposite setting.
	         * The parse case sensitive/insensitive methods may be called at any point
	         * in the builder, thus the parser can swap between case parsing modes
	         * multiple times during the parse.
	         *
	         * @return this, for chaining, not null
	         */
	
	    }, {
	        key: 'parseCaseInsensitive',
	        value: function parseCaseInsensitive() {
	            this._appendInternalPrinterParser(SettingsParser.INSENSITIVE);
	            return this;
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Changes the parse style to be strict for the remainder of the formatter.
	         * 
	         * Parsing can be strict or lenient - by default its strict.
	         * This controls the degree of flexibility in matching the text and sign styles.
	         * 
	         * When used, this method changes the parsing to be strict from this point onwards.
	         * As strict is the default, this is normally only needed after calling {@link #parseLenient()}.
	         * The change will remain in force until the end of the formatter that is eventually
	         * constructed or until {@code parseLenient} is called.
	         *
	         * @return this, for chaining, not null
	         */
	
	    }, {
	        key: 'parseStrict',
	        value: function parseStrict() {
	            this._appendInternalPrinterParser(SettingsParser.STRICT);
	            return this;
	        }
	
	        /**
	         * Changes the parse style to be lenient for the remainder of the formatter.
	         * Note that case sensitivity is set separately to this method.
	         * 
	         * Parsing can be strict or lenient - by default its strict.
	         * This controls the degree of flexibility in matching the text and sign styles.
	         * Applications calling this method should typically also call {@link #parseCaseInsensitive()}.
	         * 
	         * When used, this method changes the parsing to be strict from this point onwards.
	         * The change will remain in force until the end of the formatter that is eventually
	         * constructed or until {@code parseStrict} is called.
	         *
	         * @return this, for chaining, not null
	         */
	
	    }, {
	        key: 'parseLenient',
	        value: function parseLenient() {
	            this._appendInternalPrinterParser(SettingsParser.LENIENT);
	            return this;
	        }
	
	        /**
	         * appendValue function overloading
	         */
	
	    }, {
	        key: 'appendValue',
	        value: function appendValue() {
	            if (arguments.length === 1) {
	                return this._appendValue1.apply(this, arguments);
	            } else if (arguments.length === 2) {
	                return this._appendValue2.apply(this, arguments);
	            } else {
	                return this._appendValue4.apply(this, arguments);
	            }
	        }
	
	        /**
	         * Appends the value of a date-time field to the formatter using a normal
	         * output style.
	         * 
	         * The value of the field will be output during a print.
	         * If the value cannot be obtained then an exception will be thrown.
	         * 
	         * The value will be printed as per the normal print of an integer value.
	         * Only negative numbers will be signed. No padding will be added.
	         * 
	         * The parser for a variable width value such as this normally behaves greedily,
	         * requiring one digit, but accepting as many digits as possible.
	         * This behavior can be affected by 'adjacent value parsing'.
	         * See {@link #appendValue(TemporalField, int)} for full details.
	         *
	         * @param field  the field to append, not null
	         * @return this, for chaining, not null
	         */
	
	    }, {
	        key: '_appendValue1',
	        value: function _appendValue1(field) {
	            (0, _assert.assert)(field != null);
	            this._appendValuePrinterParser(new NumberPrinterParser(field, 1, MAX_WIDTH, _SignStyle.SignStyle.NORMAL));
	            return this;
	        }
	
	        /**
	         * Appends the value of a date-time field to the formatter using a fixed
	         * width, zero-padded approach.
	         * 
	         * The value of the field will be output during a print.
	         * If the value cannot be obtained then an exception will be thrown.
	         * 
	         * The value will be zero-padded on the left. If the size of the value
	         * means that it cannot be printed within the width then an exception is thrown.
	         * If the value of the field is negative then an exception is thrown during printing.
	         * 
	         * This method supports a special technique of parsing known as 'adjacent value parsing'.
	         * This technique solves the problem where a variable length value is followed by one or more
	         * fixed length values. The standard parser is greedy, and thus it would normally
	         * steal the digits that are needed by the fixed width value parsers that follow the
	         * variable width one.
	         * 
	         * No action is required to initiate 'adjacent value parsing'.
	         * When a call to {@code appendValue} with a variable width is made, the builder
	         * enters adjacent value parsing setup mode. If the immediately subsequent method
	         * call or calls on the same builder are to this method, then the parser will reserve
	         * space so that the fixed width values can be parsed.
	         * 
	         * For example, consider {@code builder.appendValue(YEAR).appendValue(MONTH_OF_YEAR, 2);}
	         * The year is a variable width parse of between 1 and 19 digits.
	         * The month is a fixed width parse of 2 digits.
	         * Because these were appended to the same builder immediately after one another,
	         * the year parser will reserve two digits for the month to parse.
	         * Thus, the text '201106' will correctly parse to a year of 2011 and a month of 6.
	         * Without adjacent value parsing, the year would greedily parse all six digits and leave
	         * nothing for the month.
	         * 
	         * Adjacent value parsing applies to each set of fixed width not-negative values in the parser
	         * that immediately follow any kind of variable width value.
	         * Calling any other append method will end the setup of adjacent value parsing.
	         * Thus, in the unlikely event that you need to avoid adjacent value parsing behavior,
	         * simply add the {@code appendValue} to another {@code DateTimeFormatterBuilder}
	         * and add that to this builder.
	         * 
	         * If adjacent parsing is active, then parsing must match exactly the specified
	         * number of digits in both strict and lenient modes.
	         * In addition, no positive or negative sign is permitted.
	         *
	         * @param field  the field to append, not null
	         * @param width  the width of the printed field, from 1 to 19
	         * @return this, for chaining, not null
	         * @throws IllegalArgumentException if the width is invalid
	         */
	
	    }, {
	        key: '_appendValue2',
	        value: function _appendValue2(field, width) {
	            (0, _assert.assert)(field != null);
	            if (width < 1 || width > MAX_WIDTH) {
	                throw new _errors.IllegalArgumentException('The width must be from 1 to ' + MAX_WIDTH + ' inclusive but was ' + width);
	            }
	            var pp = new NumberPrinterParser(field, width, width, _SignStyle.SignStyle.NOT_NEGATIVE);
	            this._appendValuePrinterParser(pp);
	            return this;
	        }
	
	        /**
	         * Appends the value of a date-time field to the formatter providing full
	         * control over printing.
	         * 
	         * The value of the field will be output during a print.
	         * If the value cannot be obtained then an exception will be thrown.
	         * 
	         * This method provides full control of the numeric formatting, including
	         * zero-padding and the positive/negative sign.
	         * 
	         * The parser for a variable width value such as this normally behaves greedily,
	         * accepting as many digits as possible.
	         * This behavior can be affected by 'adjacent value parsing'.
	         * See {@link #appendValue(TemporalField, int)} for full details.
	         * 
	         * In strict parsing mode, the minimum number of parsed digits is {@code minWidth}.
	         * In lenient parsing mode, the minimum number of parsed digits is one.
	         * 
	         * If this method is invoked with equal minimum and maximum widths and a sign style of
	         * {@code NOT_NEGATIVE} then it delegates to {@code appendValue(TemporalField,int)}.
	         * In this scenario, the printing and parsing behavior described there occur.
	         *
	         * @param field  the field to append, not null
	         * @param minWidth  the minimum field width of the printed field, from 1 to 19
	         * @param maxWidth  the maximum field width of the printed field, from 1 to 19
	         * @param signStyle  the positive/negative output style, not null
	         * @return this, for chaining, not null
	         * @throws IllegalArgumentException if the widths are invalid
	         */
	
	    }, {
	        key: '_appendValue4',
	        value: function _appendValue4(field, minWidth, maxWidth, signStyle) {
	            (0, _assert.assert)(field != null);
	            if (minWidth === maxWidth && signStyle === _SignStyle.SignStyle.NOT_NEGATIVE) {
	                return this._appendValue2(field, maxWidth);
	            }
	            if (minWidth < 1 || minWidth > MAX_WIDTH) {
	                throw new _errors.IllegalArgumentException('The minimum width must be from 1 to ' + MAX_WIDTH + ' inclusive but was ' + minWidth);
	            }
	            if (maxWidth < 1 || maxWidth > MAX_WIDTH) {
	                throw new _errors.IllegalArgumentException('The minimum width must be from 1 to ' + MAX_WIDTH + ' inclusive but was ' + maxWidth);
	            }
	            if (maxWidth < minWidth) {
	                throw new _errors.IllegalArgumentException('The maximum width must exceed or equal the minimum width but ' + maxWidth + ' < ' + minWidth);
	            }
	            var pp = new NumberPrinterParser(field, minWidth, maxWidth, signStyle);
	            this._appendValuePrinterParser(pp);
	            return this;
	        }
	
	        /**
	         * Appends a fixed width printer-parser.
	         *
	         * @param width  the width
	         * @param pp  the printer-parser, not null
	         * @return this, for chaining, not null
	         */
	
	    }, {
	        key: '_appendValuePrinterParser',
	        value: function _appendValuePrinterParser(pp) {
	            (0, _assert.assert)(pp != null);
	            if (this._active._valueParserIndex >= 0 && this._active._printerParsers[this._active._valueParserIndex] instanceof NumberPrinterParser) {
	                var activeValueParser = this._active._valueParserIndex;
	
	                // adjacent parsing mode, update setting in previous parsers
	                var basePP = this._active._printerParsers[activeValueParser];
	                if (pp.minWidth() === pp.maxWidth() && pp.signStyle() === _SignStyle.SignStyle.NOT_NEGATIVE) {
	                    // Append the width to the subsequentWidth of the active parser
	                    basePP = basePP.withSubsequentWidth(pp.maxWidth());
	                    // Append the new parser as a fixed width
	                    this._appendInternal(pp.withFixedWidth());
	                    // Retain the previous active parser
	                    this._active._valueParserIndex = activeValueParser;
	                } else {
	                    // Modify the active parser to be fixed width
	                    basePP = basePP.withFixedWidth();
	                    // The new parser becomes the mew active parser
	                    this._active._valueParserIndex = this._appendInternal(pp);
	                }
	                // Replace the modified parser with the updated one
	                this._active._printerParsers[activeValueParser] = basePP;
	            } else {
	                // The new Parser becomes the active parser
	                this._active._valueParserIndex = this._appendInternal(pp);
	            }
	            return this;
	        }
	
	        /**
	         * Appends a printer and/or parser to the internal list handling padding.
	         *
	         * @param pp  the printer-parser to add, not null
	         * @return the index into the active parsers list
	         */
	
	    }, {
	        key: '_appendInternal',
	        value: function _appendInternal(pp) {
	            (0, _assert.assert)(pp != null);
	            if (this._active._padNextWidth > 0) {
	                if (pp != null) {
	                    pp = new PadPrinterParserDecorator(pp, this._active._padNextWidth, this._active._padNextChar);
	                }
	                this._active._padNextWidth = 0;
	                this._active._padNextChar = 0;
	            }
	            this._active._printerParsers.push(pp);
	            this._active._valueParserIndex = -1;
	            return this._active._printerParsers.length - 1;
	        }
	
	        /**
	         * Appends a string literal to the formatter.
	         * 
	         * This string will be output during a print.
	         * 
	         * If the literal is empty, nothing is added to the formatter.
	         *
	         * @param literal  the literal to append, not null
	         * @return this, for chaining, not null
	         */
	
	    }, {
	        key: 'appendLiteral',
	        value: function appendLiteral(literal) {
	            (0, _assert.assert)(literal != null);
	            this._appendInternalPrinterParser(new StringLiteralPrinterParser(literal));
	            return this;
	        }
	
	        /**
	         * Appends a printer and/or parser to the internal list handling padding.
	         *
	         * @param pp  the printer-parser to add, not null
	         * @return the index into the active parsers list
	         */
	
	    }, {
	        key: '_appendInternalPrinterParser',
	        value: function _appendInternalPrinterParser(pp) {
	            (0, _assert.assert)(pp != null);
	            if (this._active._padNextWidth > 0) {
	                if (pp != null) {
	                    pp = new PadPrinterParserDecorator(pp, this._active._padNextWidth, this._active._padNextChar);
	                }
	                this._active._padNextWidth = 0;
	                this._active._padNextChar = 0;
	            }
	            this._active._printerParsers.push(pp);
	            this._active._valueParserIndex = -1;
	            return this._active._printerParsers.length - 1;
	        }
	
	        /**
	         * Completes this builder by creating the DateTimeFormatter.
	         * 
	         * This will create a formatter with the specified locale.
	         * Numbers will be printed and parsed using the standard non-localized set of symbols.
	         * 
	         * Calling this method will end any open optional sections by repeatedly
	         * calling {@link #optionalEnd()} before creating the formatter.
	         * 
	         * This builder can still be used after creating the formatter if desired,
	         * although the state may have been changed by calls to {@code optionalEnd}.
	         *
	         * @param resolverStyle  the new resolver style
	         * @return the created formatter, not null
	         */
	
	    }, {
	        key: 'toFormatter',
	        value: function toFormatter() {
	            var resolverStyle = arguments.length <= 0 || arguments[0] === undefined ? _ResolverStyle.ResolverStyle.SMART : arguments[0];
	
	            while (this._active._parent != null) {
	                this.optionalEnd();
	            }
	            var pp = new CompositePrinterParser(this._printerParsers, false);
	            return new _DateTimeFormatter.DateTimeFormatter(pp, null, _DecimalStyle.DecimalStyle.STANDARD, resolverStyle, null, null, null);
	        }
	    }]);
	
	    return DateTimeFormatterBuilder;
	}();
	
	var EXCEED_POINTS = [0, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000];
	
	var CompositePrinterParser = function () {
	    function CompositePrinterParser(printerParsers, optional) {
	        _classCallCheck(this, CompositePrinterParser);
	
	        this._printerParsers = printerParsers;
	        this._optional = optional;
	    }
	
	    /**
	     * Returns a copy of this printer-parser with the optional flag changed.
	     *
	     * @param optional  the optional flag to set in the copy
	     * @return the new printer-parser, not null
	     */
	
	
	    _createClass(CompositePrinterParser, [{
	        key: 'withOptional',
	        value: function withOptional(optional) {
	            if (optional === this._optional) {
	                return this;
	            }
	            return new CompositePrinterParser(this._printerParsers, optional);
	        }
	    }, {
	        key: 'print',
	        value: function print(context, buf) {
	            var length = buf.length();
	            if (this._optional) {
	                context.startOptional();
	            }
	            try {
	                for (var i = 0; i < this._printerParsers.length; i++) {
	                    var pp = this._printerParsers[i];
	                    if (pp.print(context, buf) === false) {
	                        buf.setLength(length); // reset buffer
	                        return true;
	                    }
	                }
	            } finally {
	                if (this._optional) {
	                    context.endOptional();
	                }
	            }
	            return true;
	        }
	    }, {
	        key: 'parse',
	        value: function parse(context, text, position) {
	            if (this._optional) {
	                context.startOptional();
	                var pos = position;
	                for (var i = 0; i < this._printerParsers.length; i++) {
	                    var pp = this._printerParsers[i];
	                    pos = pp.parse(context, text, pos);
	                    if (pos < 0) {
	                        context.endOptional(false);
	                        return position; // return original position
	                    }
	                }
	                context.endOptional(true);
	                return pos;
	            } else {
	                for (var i = 0; i < this._printerParsers.length; i++) {
	                    var pp = this._printerParsers[i];
	                    position = pp.parse(context, text, position);
	                    if (position < 0) {
	                        break;
	                    }
	                }
	                return position;
	            }
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            var buf = '';
	            if (this._printerParsers != null) {
	                buf += this._optional ? '[' : '(';
	                for (var i = 0; i < this._printerParsers.length; i++) {
	                    var pp = this._printerParsers[i];
	                    buf += pp.toString();
	                }
	                buf += this._optional ? ']' : ')';
	            }
	            return buf;
	        }
	    }]);
	
	    return CompositePrinterParser;
	}();
	
	var SettingsParser = function (_Enum) {
	    _inherits(SettingsParser, _Enum);
	
	    function SettingsParser() {
	        _classCallCheck(this, SettingsParser);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(SettingsParser).apply(this, arguments));
	    }
	
	    _createClass(SettingsParser, [{
	        key: 'print',
	        value: function print(context, buf) {
	            return true; // nothing to do here
	        }
	    }, {
	        key: 'parse',
	        value: function parse(context, text, position) {
	            // using ordinals to avoid javac synthetic inner class
	            switch (this) {
	                case SettingsParser.SENSITIVE:
	                    context.setCaseSensitive(true);break;
	                case SettingsParser.INSENSITIVE:
	                    context.setCaseSensitive(false);break;
	                case SettingsParser.STRICT:
	                    context.setStrict(true);break;
	                case SettingsParser.LENIENT:
	                    context.setStrict(false);break;
	            }
	            return position;
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            // using ordinals to avoid javac synthetic inner class
	            switch (this) {
	                case SettingsParser.SENSITIVE:
	                    return 'ParseCaseSensitive(true)';
	                case SettingsParser.INSENSITIVE:
	                    return 'ParseCaseSensitive(false)';
	                case SettingsParser.STRICT:
	                    return 'ParseStrict(true)';
	                case SettingsParser.LENIENT:
	                    return 'ParseStrict(false)';
	            }
	        }
	    }]);
	
	    return SettingsParser;
	}(_Enum2.Enum);
	
	SettingsParser.SENSITIVE = new SettingsParser('SENSITIVE');
	SettingsParser.INSENSITIVE = new SettingsParser('INSENSITIVE');
	SettingsParser.STRICT = new SettingsParser('STRICT');
	SettingsParser.LENIENT = new SettingsParser('LENIENT');
	
	var NumberPrinterParser = function () {
	
	    /**
	     * Constructor.
	     *
	     * @param field  the field to print, not null
	     * @param minWidth  the minimum field width, from 1 to 19
	     * @param maxWidth  the maximum field width, from minWidth to 19
	     * @param signStyle  the positive/negative sign style, not null
	     * @param subsequentWidth  the width of subsequent non-negative numbers, 0 or greater,
	     *  -1 if fixed width due to active adjacent parsing
	     */
	
	    function NumberPrinterParser(field, minWidth, maxWidth, signStyle) {
	        var subsequentWidth = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
	
	        _classCallCheck(this, NumberPrinterParser);
	
	        this._field = field;
	        this._minWidth = minWidth;
	        this._maxWidth = maxWidth;
	        this._signStyle = signStyle;
	        this._subsequentWidth = subsequentWidth;
	    }
	
	    _createClass(NumberPrinterParser, [{
	        key: 'field',
	        value: function field() {
	            return this._field;
	        }
	    }, {
	        key: 'minWidth',
	        value: function minWidth() {
	            return this._minWidth;
	        }
	    }, {
	        key: 'maxWidth',
	        value: function maxWidth() {
	            return this._maxWidth;
	        }
	    }, {
	        key: 'signStyle',
	        value: function signStyle() {
	            return this._signStyle;
	        }
	    }, {
	        key: 'withSubsequentWidth',
	        value: function withSubsequentWidth(subsequentWidth) {
	            return new NumberPrinterParser(this._field, this._minWidth, this._maxWidth, this._signStyle, this._subsequentWidth + subsequentWidth);
	        }
	    }, {
	        key: '_isFixedWidth',
	        value: function _isFixedWidth() {
	            return this._subsequentWidth === -1 || this._subsequentWidth > 0 && this._minWidth === this._maxWidth && this._signStyle === _SignStyle.SignStyle.NOT_NEGATIVE;
	        }
	    }, {
	        key: 'print',
	        value: function print(context, buf) {
	            var value = context.getValue(this._field);
	            if (value == null) {
	                return false;
	            }
	            var symbols = context.symbols();
	            var str = '' + Math.abs(value);
	            if (str.length > this._maxWidth) {
	                throw new _errors.DateTimeException('Field ' + this._field + ' cannot be printed as the value ' + value + ' exceeds the maximum print width of ' + this._maxWidth);
	            }
	            str = symbols.convertNumberToI18N(str);
	
	            if (value >= 0) {
	                switch (this._signStyle) {
	                    case _SignStyle.SignStyle.EXCEEDS_PAD:
	                        if (this._minWidth < MAX_WIDTH && value >= EXCEED_POINTS[this._minWidth]) {
	                            buf.append(symbols.positiveSign());
	                        }
	                        break;
	                    case _SignStyle.SignStyle.ALWAYS:
	                        buf.append(symbols.positiveSign());
	                        break;
	                }
	            } else {
	                switch (this._signStyle) {
	                    case _SignStyle.SignStyle.NORMAL:
	                    case _SignStyle.SignStyle.EXCEEDS_PAD:
	                    case _SignStyle.SignStyle.ALWAYS:
	                        buf.append(symbols.negativeSign());
	                        break;
	                    case _SignStyle.SignStyle.NOT_NEGATIVE:
	                        throw new _errors.DateTimeException('Field ' + this._field + ' cannot be printed as the value ' + value + ' cannot be negative according to the SignStyle');
	                }
	            }
	            for (var i = 0; i < this._minWidth - str.length; i++) {
	                buf.append(symbols.zeroDigit());
	            }
	            buf.append(str);
	            return true;
	        }
	    }, {
	        key: 'parse',
	        value: function parse(context, text, position) {
	            var length = text.length;
	            if (position === length) {
	                return ~position;
	            }
	            (0, _assert.assert)(position >= 0 && position < length);
	            var sign = text.charAt(position); // IOOBE if invalid position
	            var negative = false;
	            var positive = false;
	            if (sign === context.symbols().positiveSign()) {
	                if (this._signStyle.parse(true, context.isStrict(), this._minWidth === this._maxWidth) === false) {
	                    return ~position;
	                }
	                positive = true;
	                position++;
	            } else if (sign === context.symbols().negativeSign()) {
	                if (this._signStyle.parse(false, context.isStrict(), this._minWidth === this._maxWidth) === false) {
	                    return ~position;
	                }
	                negative = true;
	                position++;
	            } else {
	                if (this._signStyle === _SignStyle.SignStyle.ALWAYS && context.isStrict()) {
	                    return ~position;
	                }
	            }
	            var effMinWidth = context.isStrict() || this._isFixedWidth() ? this._minWidth : 1;
	            var minEndPos = position + effMinWidth;
	            if (minEndPos > length) {
	                return ~position;
	            }
	            var effMaxWidth = (context.isStrict() || this._isFixedWidth() ? this._maxWidth : 9) + Math.max(this._subsequentWidth, 0);
	            var total = 0;
	            var pos = position;
	            for (var pass = 0; pass < 2; pass++) {
	                var maxEndPos = Math.min(pos + effMaxWidth, length);
	                while (pos < maxEndPos) {
	                    var ch = text.charAt(pos++);
	                    var digit = context.symbols().convertToDigit(ch);
	                    if (digit < 0) {
	                        pos--;
	                        if (pos < minEndPos) {
	                            return ~position; // need at least min width digits
	                        }
	                        break;
	                    }
	                    if (pos - position > MAX_WIDTH) {
	                        throw new _errors.ArithmeticException('number text exceeds length');
	                    } else {
	                        total = total * 10 + digit;
	                    }
	                }
	                if (this._subsequentWidth > 0 && pass === 0) {
	                    // re-parse now we know the correct width
	                    var parseLen = pos - position;
	                    effMaxWidth = Math.max(effMinWidth, parseLen - this._subsequentWidth);
	                    pos = position;
	                    total = 0;
	                } else {
	                    break;
	                }
	            }
	            if (negative) {
	                if (total === 0 && context.isStrict()) {
	                    return ~(position - 1); // minus zero not allowed
	                }
	                if (total !== 0) {
	                    total = -total;
	                }
	            } else if (this._signStyle === _SignStyle.SignStyle.EXCEEDS_PAD && context.isStrict()) {
	                var parseLen = pos - position;
	                if (positive) {
	                    if (parseLen <= this._minWidth) {
	                        return ~(position - 1); // '+' only parsed if minWidth exceeded
	                    }
	                } else {
	                        if (parseLen > this._minWidth) {
	                            return ~position; // '+' must be parsed if minWidth exceeded
	                        }
	                    }
	            }
	            return this._setValue(context, total, position, pos);
	        }
	
	        /**
	         * Stores the value.
	         *
	         * @param context  the context to store into, not null
	         * @param value  the value
	         * @param errorPos  the position of the field being parsed
	         * @param successPos  the position after the field being parsed
	         * @return the new position
	         */
	
	    }, {
	        key: '_setValue',
	        value: function _setValue(context, value, errorPos, successPos) {
	            return context.setParsedField(this._field, value, errorPos, successPos);
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            if (this._minWidth === 1 && this._maxWidth === MAX_WIDTH && this._signStyle === _SignStyle.SignStyle.NORMAL) {
	                return 'Value(' + this._field + ')';
	            }
	            if (this._minWidth === this._maxWidth && this._signStyle === _SignStyle.SignStyle.NOT_NEGATIVE) {
	                return 'Value(' + this._field + ',' + this._minWidth + ')';
	            }
	            return 'Value(' + this._field + ',' + this._minWidth + ',' + this._maxWidth + ',' + this._signStyle + ')';
	        }
	    }]);
	
	    return NumberPrinterParser;
	}();
	
	/**
	 * Pads the output to a fixed width.
	 */
	
	
	var PadPrinterParserDecorator = function () {
	
	    /**
	     * Constructor.
	     *
	     * @param printerParser  the printer, not null
	     * @param padWidth  the width to pad to, 1 or greater
	     * @param padChar  the pad character
	     */
	
	    function PadPrinterParserDecorator(printerParser, padWidth, padChar) {
	        _classCallCheck(this, PadPrinterParserDecorator);
	
	        // input checked by DateTimeFormatterBuilder
	        this._printerParser = printerParser;
	        this._padWidth = padWidth;
	        this._padChar = padChar;
	    }
	
	    _createClass(PadPrinterParserDecorator, [{
	        key: 'print',
	        value: function print(context, buf) {
	            var preLen = buf.length();
	            if (this._printerParser.print(context, buf) === false) {
	                return false;
	            }
	            var len = buf.length() - preLen;
	            if (len > this._padWidth) {
	                throw new _errors.DateTimeException('Cannot print as output of ' + len + ' characters exceeds pad width of ' + this._padWidth);
	            }
	            for (var i = 0; i < this._padWidth - len; i++) {
	                buf.insert(preLen, this._padChar);
	            }
	            return true;
	        }
	    }, {
	        key: 'parse',
	        value: function parse(context, text, position) {
	            // cache context before changed by decorated parser
	            var strict = context.isStrict();
	            var caseSensitive = context.isCaseSensitive();
	            // parse
	            (0, _assert.assert)(!(position > text.length));
	            if (position === text.length) {
	                return ~position; // no more characters in the string
	            }
	            var endPos = position + this._padWidth;
	            if (endPos > text.length) {
	                if (strict) {
	                    return ~position; // not enough characters in the string to meet the parse width
	                }
	                endPos = text.length;
	            }
	            var pos = position;
	            while (pos < endPos && (caseSensitive ? text[pos] === this._padChar : context.charEquals(text[pos], this._padChar))) {
	                pos++;
	            }
	            text = text.substring(0, endPos);
	            var resultPos = this._printerParser.parse(context, text, pos);
	            if (resultPos !== endPos && strict) {
	                return ~(position + pos); // parse of decorated field didn't parse to the end
	            }
	            return resultPos;
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return 'Pad(' + this._printerParser + ',' + this._padWidth + (this._padChar === ' ' ? ')' : ',\'' + this._padChar + '\')');
	        }
	    }]);
	
	    return PadPrinterParserDecorator;
	}();
	
	/**
	* Prints or parses a string literal.
	*/
	
	
	var StringLiteralPrinterParser = function () {
	    function StringLiteralPrinterParser(literal) {
	        _classCallCheck(this, StringLiteralPrinterParser);
	
	        this._literal = literal;
	    }
	
	    _createClass(StringLiteralPrinterParser, [{
	        key: 'print',
	        value: function print(context, buf) {
	            buf.append(this._literal);
	            return true;
	        }
	    }, {
	        key: 'parse',
	        value: function parse(context, text, position) {
	            var length = text.length;
	            (0, _assert.assert)(!(position > length || position < 0));
	
	            if (context.subSequenceEquals(text, position, this._literal, 0, this._literal.length) === false) {
	                return ~position;
	            }
	            return position + this._literal.length;
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return '\'' + this._literal + '\'';
	        }
	    }]);
	
	    return StringLiteralPrinterParser;
	}();
	
	var StringBuilder = function () {
	    function StringBuilder() {
	        _classCallCheck(this, StringBuilder);
	
	        this._str = '';
	    }
	
	    _createClass(StringBuilder, [{
	        key: 'append',
	        value: function append(str) {
	            this._str += str;
	        }
	    }, {
	        key: 'insert',
	        value: function insert(offset, str) {
	            this._str = this._str.slice(0, offset) + str + this._str.slice(offset);
	        }
	    }, {
	        key: 'length',
	        value: function length() {
	            return this._str.length;
	        }
	    }, {
	        key: 'setLength',
	        value: function setLength(length) {
	            this._str = this._str.slice(0, length);
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return this._str;
	        }
	    }]);
	
	    return StringBuilder;
	}();
	
	DateTimeFormatterBuilder.CompositePrinterParser = CompositePrinterParser;
	DateTimeFormatterBuilder.SettingsParser = SettingsParser;
	DateTimeFormatterBuilder.NumberPrinterParser = NumberPrinterParser;
	DateTimeFormatterBuilder.StringLiteralPrinterParser = StringLiteralPrinterParser;
	DateTimeFormatterBuilder.CharLiteralPrinterParser = StringLiteralPrinterParser;
	DateTimeFormatterBuilder.PadPrinterParserDecorator = PadPrinterParserDecorator;
	DateTimeFormatterBuilder.StringBuilder = StringBuilder;

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	 */
	
	var DecimalStyle = exports.DecimalStyle = function () {
	    function DecimalStyle(zeroChar, positiveSignChar, negativeSignChar, decimalPointChar) {
	        _classCallCheck(this, DecimalStyle);
	
	        this._zeroDigit = zeroChar;
	        this._zeroDigitCharCode = zeroChar.charCodeAt(0);
	        this._positiveSign = positiveSignChar;
	        this._negativeSign = negativeSignChar;
	        this._decimalSeparator = decimalPointChar;
	    }
	
	    _createClass(DecimalStyle, [{
	        key: 'positiveSign',
	        value: function positiveSign() {
	            return this._positiveSign;
	        }
	    }, {
	        key: 'withPositiveSign',
	        value: function withPositiveSign(positiveSign) {
	            if (positiveSign === this._positiveSign) {
	                return this;
	            }
	            return new DecimalStyle(this._zeroDigit, positiveSign, this._negativeSign, this._decimalSeparator);
	        }
	    }, {
	        key: 'negativeSign',
	        value: function negativeSign() {
	            return this._negativeSign;
	        }
	    }, {
	        key: 'withNegativeSign',
	        value: function withNegativeSign(negativeSign) {
	            if (negativeSign === this._negativeSign) {
	                return this;
	            }
	            return new DecimalStyle(this._zeroDigit, this._positiveSign, negativeSign, this._decimalSeparator);
	        }
	    }, {
	        key: 'zeroDigit',
	        value: function zeroDigit() {
	            return this._zeroDigit;
	        }
	    }, {
	        key: 'withZeroDigit',
	        value: function withZeroDigit(zeroDigit) {
	            if (zeroDigit === this._zeroDigit) {
	                return this;
	            }
	            return new DecimalStyle(zeroDigit, this._positiveSign, this._negativeSign, this._decimalSeparator);
	        }
	    }, {
	        key: 'decimalSeparator',
	        value: function decimalSeparator() {
	            return this._decimalSeparator;
	        }
	    }, {
	        key: 'withDecimalSeparator',
	        value: function withDecimalSeparator(decimalSeparator) {
	            if (decimalSeparator === this._decimalSeparator) {
	                return this;
	            }
	            return new DecimalStyle(this._zeroDigit, this._positiveSign, this._negativeSign, decimalSeparator);
	        }
	    }, {
	        key: 'convertToDigit',
	        value: function convertToDigit(char) {
	            var val = char.charCodeAt(0) - this._zeroDigitCharCode;
	            return val >= 0 && val <= 9 ? val : -1;
	        }
	    }, {
	        key: 'convertNumberToI18N',
	        value: function convertNumberToI18N(numericText) {
	            if (this._zeroDigit === '0') {
	                return numericText;
	            }
	            var diff = this._zeroDigitCharCode - '0'.charCodeAt(0);
	            var convertedText = '';
	            for (var i = 0; i < numericText.length; i++) {
	                convertedText += String.fromCharCode(numericText.charCodeAt(i) + diff);
	            }
	            return convertedText;
	        }
	    }, {
	        key: 'equals',
	        value: function equals(other) {
	            if (this === other) {
	                return true;
	            }
	            if (other instanceof DecimalStyle) {
	                return this._zeroDigit === other._zeroDigit && this._positiveSign === other._positiveSign && this._negativeSign === other._negativeSign && this._decimalSeparator == other._decimalSeparator;
	            }
	            return false;
	        }
	    }, {
	        key: 'hashCode',
	        value: function hashCode() {
	            return this._zeroDigit + this._positiveSign + this._negativeSign + this._decimalSeparator;
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return 'DecimalStyle[' + this._zeroDigit + this._positiveSign + this._negativeSign + this._decimalSeparator + ']';
	        }
	    }], [{
	        key: 'of',
	        value: function of() {
	            throw new Error('not yet supported');
	        }
	    }, {
	        key: 'availableLocales',
	        value: function availableLocales() {
	            throw new Error('not yet supported');
	        }
	    }]);
	
	    return DecimalStyle;
	}();
	
	DecimalStyle.STANDARD = new DecimalStyle('0', '+', '-', '.');

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SignStyle = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Enum2 = __webpack_require__(18);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var SignStyle = exports.SignStyle = function (_Enum) {
	    _inherits(SignStyle, _Enum);
	
	    function SignStyle() {
	        _classCallCheck(this, SignStyle);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(SignStyle).apply(this, arguments));
	    }
	
	    _createClass(SignStyle, [{
	        key: 'parse',
	
	        /**
	         * Parse helper.
	         *
	         * @param positive  true if positive sign parsed, false for negative sign
	         * @param strict  true if strict, false if lenient
	         * @param fixedWidth  true if fixed width, false if not
	         * @return true if valid
	         */
	        value: function parse(positive, strict, fixedWidth) {
	            switch (this) {
	                case SignStyle.NORMAL:
	                    // NORMAL
	                    // valid if negative or (positive and lenient)
	                    return !positive || !strict;
	                case SignStyle.ALWAYS: // ALWAYS
	                case SignStyle.EXCEEDS_PAD:
	                    // EXCEEDS_PAD
	                    return true;
	                default:
	                    // valid if lenient and not fixed width
	                    return !strict && !fixedWidth;
	            }
	        }
	    }]);
	
	    return SignStyle;
	}(_Enum2.Enum);
	
	SignStyle.NORMAL = new SignStyle('NORMAL');
	SignStyle.NEVER = new SignStyle('NEVER');
	SignStyle.ALWAYS = new SignStyle('ALWAYS');
	SignStyle.EXCEEDS_PAD = new SignStyle('EXCEEDS_PAD');
	SignStyle.NOT_NEGATIVE = new SignStyle('NOT_NEGATIVE');

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ResolverStyle = undefined;
	
	var _Enum2 = __webpack_require__(18);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Enumeration of different ways to resolve dates and times.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Parsing a text string occurs in two phases.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Phase 1 is a basic text parse according to the fields added to the builder.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Phase 2 resolves the parsed field-value pairs into date and/or time objects.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This style is used to control how phase 2, resolving, happens.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
	var ResolverStyle = exports.ResolverStyle = function (_Enum) {
	  _inherits(ResolverStyle, _Enum);
	
	  function ResolverStyle() {
	    _classCallCheck(this, ResolverStyle);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ResolverStyle).apply(this, arguments));
	  }
	
	  return ResolverStyle;
	}(_Enum2.Enum);
	
	/**
	 * Style to resolve dates and times strictly.
	 * 
	 * Using strict resolution will ensure that all parsed values are within
	 * the outer range of valid values for the field. Individual fields may
	 * be further processed for strictness.
	 * 
	 * For example, resolving year-month and day-of-month in the ISO calendar
	 * system using strict mode will ensure that the day-of-month is valid
	 * for the year-month, rejecting invalid values.
	 */
	
	
	ResolverStyle.STRICT = new ResolverStyle('STRICT');
	/**
	 * Style to resolve dates and times in a smart, or intelligent, manner.
	 * 
	 * Using smart resolution will perform the sensible default for each
	 * field, which may be the same as strict, the same as lenient, or a third
	 * behavior. Individual fields will interpret this differently.
	 * 
	 * For example, resolving year-month and day-of-month in the ISO calendar
	 * system using smart mode will ensure that the day-of-month is from
	 * 1 to 31, converting any value beyond the last valid day-of-month to be
	 * the last valid day-of-month.
	 */
	ResolverStyle.SMART = new ResolverStyle('SMART');
	/**
	 * Style to resolve dates and times leniently.
	 * 
	 * Using lenient resolution will resolve the values in an appropriate
	 * lenient manner. Individual fields will interpret this differently.
	 * 
	 * For example, lenient mode allows the month in the ISO calendar system
	 * to be outside the range 1 to 12.
	 * For example, month 15 is treated as being 3 months after month 12.
	 */
	ResolverStyle.LENIENT = new ResolverStyle('LENIENT');

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Month = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	exports._init = _init;
	
	var _assert = __webpack_require__(9);
	
	var _ChronoField = __webpack_require__(3);
	
	var _ChronoUnit = __webpack_require__(7);
	
	var _errors = __webpack_require__(5);
	
	var _IsoChronology = __webpack_require__(17);
	
	var _TemporalAccessor2 = __webpack_require__(23);
	
	var _TemporalQueries = __webpack_require__(21);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
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
	
	var Month = function (_TemporalAccessor) {
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
	            return this.range(field).checkValidIntValue(this.getLong(field), field);
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
	            newMonthVal = newMonthVal === 0 ? 12 : newMonthVal;
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
	        value: function toString() {
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
	         * replacement for enum values
	         */
	
	    }], [{
	        key: 'values',
	        value: function values() {
	            return MONTHS.slice();
	        }
	
	        /**
	         *
	         * @param {number} month
	         * @return {Month} not null
	         **/
	
	    }, {
	        key: 'of',
	        value: function of(month) {
	            if (month < 1 || month > 12) {
	                (0, _assert.assert)(false, 'Invalid value for MonthOfYear: ' + month, _errors.DateTimeException);
	            }
	            return MONTHS[month - 1];
	        }
	    }]);
	
	    return Month;
	}(_TemporalAccessor2.TemporalAccessor);
	
	exports.Month = Month;
	
	
	var MONTHS;
	
	function _init() {
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
	
	    MONTHS = [Month.JANUARY, Month.FEBRUARY, Month.MARCH, Month.APRIL, Month.MAY, Month.JUNE, Month.JULY, Month.AUGUST, Month.SEPTEMBER, Month.OCTOBER, Month.NOVEMBER, Month.DECEMBER];
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Period = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports._init = _init;
	
	var _MathUtil = __webpack_require__(4);
	
	var _assert = __webpack_require__(9);
	
	var _errors = __webpack_require__(5);
	
	var _IsoChronology = __webpack_require__(17);
	
	var _ChronoUnit = __webpack_require__(7);
	
	var _TemporalAmount2 = __webpack_require__(10);
	
	var _LocalDate = __webpack_require__(19);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper                 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos  
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	/**
	 * A date-based amount of time, such as '2 years, 3 months and 4 days'.
	 * <p>
	 * This class models a quantity or amount of time in terms of years, months and days.
	 * See {@link Duration} for the time-based equivalent to this class.
	 * <p>
	 * Durations and period differ in their treatment of daylight savings time
	 * when added to {@link ZonedDateTime}. A {@code Duration} will add an exact
	 * number of seconds, thus a duration of one day is always exactly 24 hours.
	 * By contrast, a {@code Period} will add a conceptual day, trying to maintain
	 * the local time.
	 * <p>
	 * For example, consider adding a period of one day and a duration of one day to
	 * 18:00 on the evening before a daylight savings gap. The {@code Period} will add
	 * the conceptual day and result in a {@code ZonedDateTime} at 18:00 the following day.
	 * By contrast, the {@code Duration} will add exactly 24 hours, resulting in a
	 * {@code ZonedDateTime} at 19:00 the following day (assuming a one hour DST gap).
	 * <p>
	 * The supported units of a period are {@link ChronoUnit#YEARS YEARS},
	 * {@link ChronoUnit#MONTHS MONTHS} and {@link ChronoUnit#DAYS DAYS}.
	 * All three fields are always present, but may be set to zero.
	 * <p>
	 * The period may be used with any calendar system.
	 * The meaning of a 'year' or 'month' is only applied when the object is added to a date.
	 * <p>
	 * The period is modeled as a directed amount of time, meaning that individual parts of the
	 * period may be negative.
	 * <p>
	 * The months and years fields may be {@linkplain #normalized() normalized}.
	 * The normalization assumes a 12 month year, so is not appropriate for all calendar systems.
	 *
	 * <h3>Specification for implementors</h3>
	 * This class is immutable and thread-safe.
	 */
	
	/**
	 * The pattern for parsing.
	 */
	var PATTERN = /([-+]?)P(?:([-+]?[0-9]+)Y)?(?:([-+]?[0-9]+)M)?(?:([-+]?[0-9]+)W)?(?:([-+]?[0-9]+)D)?/;
	
	var Period = exports.Period = function (_TemporalAmount) {
	    _inherits(Period, _TemporalAmount);
	
	    /**
	     * do not call the constructor directly
	     * use a factory method instead
	     *
	     * @param years
	     * @param months
	     * @param days
	     * @private
	     */
	
	    function Period(years, months, days) {
	        _classCallCheck(this, Period);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Period).call(this));
	
	        if ((years | months | days) === 0) {
	            var _ret;
	
	            return _ret = Period.ZERO, _possibleConstructorReturn(_this, _ret);
	        }
	        Period._validate(years, months, days);
	        /**
	         * The number of years.
	         */
	        _this._years = years;
	        /**
	         * The number of months.
	         */
	        _this._months = months;
	        /**
	         * The number of days.
	         */
	        _this._days = days;
	        return _this;
	    }
	
	    _createClass(Period, [{
	        key: 'units',
	
	
	        //-----------------------------------------------------------------------
	        value: function units() {
	            return [_ChronoUnit.ChronoUnit.YEARS, _ChronoUnit.ChronoUnit.MONTHS, _ChronoUnit.ChronoUnit.DAYS];
	        }
	    }, {
	        key: 'chronology',
	        value: function chronology() {
	            return _IsoChronology.IsoChronology.INSTANCE;
	        }
	    }, {
	        key: 'get',
	        value: function get(unit) {
	            if (unit === _ChronoUnit.ChronoUnit.YEARS) {
	                return this._years;
	            }
	            if (unit === _ChronoUnit.ChronoUnit.MONTHS) {
	                return this._months;
	            }
	            if (unit === _ChronoUnit.ChronoUnit.DAYS) {
	                return this._days;
	            }
	            throw new _errors.UnsupportedTemporalTypeException('Unsupported unit: ' + unit);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Checks if all three units of this period are zero.
	         * <p>
	         * A zero period has the value zero for the years, months and days units.
	         *
	         * @return true if this period is zero-length
	         */
	
	    }, {
	        key: 'isZero',
	        value: function isZero() {
	            return this === Period.ZERO;
	        }
	
	        /**
	         * Checks if any of the three units of this period are negative.
	         * <p>
	         * This checks whether the years, months or days units are less than zero.
	         *
	         * @return true if any unit of this period is negative
	         */
	
	    }, {
	        key: 'isNegative',
	        value: function isNegative() {
	            return this._years < 0 || this._months < 0 || this._days < 0;
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Gets the amount of years of this period.
	         * <p>
	         * This returns the years unit.
	         * <p>
	         * The months unit is not normalized with the years unit.
	         * This means that a period of '15 months' is different to a period
	         * of '1 year and 3 months'.
	         *
	         * @return the amount of years of this period, may be negative
	         */
	
	    }, {
	        key: 'years',
	        value: function years() {
	            return this._years;
	        }
	
	        /**
	         * Gets the amount of months of this period.
	         * <p>
	         * This returns the months unit.
	         * <p>
	         * The months unit is not normalized with the years unit.
	         * This means that a period of '15 months' is different to a period
	         * of '1 year and 3 months'.
	         *
	         * @return the amount of months of this period, may be negative
	         */
	
	    }, {
	        key: 'months',
	        value: function months() {
	            return this._months;
	        }
	
	        /**
	         * Gets the amount of days of this period.
	         * <p>
	         * This returns the days unit.
	         *
	         * @return the amount of days of this period, may be negative
	         */
	
	    }, {
	        key: 'days',
	        value: function days() {
	            return this._days;
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Returns a copy of this period with the specified amount of years.
	         * <p>
	         * This sets the amount of the years unit in a copy of this period.
	         * The months and days units are unaffected.
	         * <p>
	         * The months unit is not normalized with the years unit.
	         * This means that a period of '15 months' is different to a period
	         * of '1 year and 3 months'.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param years  the years to represent, may be negative
	         * @return a {@code Period} based on this period with the requested years, not null
	         */
	
	    }, {
	        key: 'withYears',
	        value: function withYears(years) {
	            if (years === this._years) {
	                return this;
	            }
	            return Period.create(years, this._months, this._days);
	        }
	
	        /**
	         * Returns a copy of this period with the specified amount of months.
	         * <p>
	         * This sets the amount of the months unit in a copy of this period.
	         * The years and days units are unaffected.
	         * <p>
	         * The months unit is not normalized with the years unit.
	         * This means that a period of '15 months' is different to a period
	         * of '1 year and 3 months'.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param months  the months to represent, may be negative
	         * @return a {@code Period} based on this period with the requested months, not null
	         */
	
	    }, {
	        key: 'withMonths',
	        value: function withMonths(months) {
	            if (months === this._months) {
	                return this;
	            }
	            return Period.create(this._years, months, this._days);
	        }
	
	        /**
	         * Returns a copy of this period with the specified amount of days.
	         * <p>
	         * This sets the amount of the days unit in a copy of this period.
	         * The years and months units are unaffected.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param days  the days to represent, may be negative
	         * @return a {@code Period} based on this period with the requested days, not null
	         */
	
	    }, {
	        key: 'withDays',
	        value: function withDays(days) {
	            if (days === this._days) {
	                return this;
	            }
	            return Period.create(this._years, this._months, days);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Returns a copy of this period with the specified amount added.
	         * <p>
	         * This input amount is converted to a {@code Period} using {@code from(TemporalAmount)}.
	         * This operates separately on the years, months and days.
	         * <p>
	         * For example, '1 year, 6 months and 3 days' plus '2 years, 2 months and 2 days'
	         * returns '3 years, 8 months and 5 days'.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param amountToAdd  the period to add, not null
	         * @return a {@code Period} based on this period with the requested period added, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'plus',
	        value: function plus(amountToAdd) {
	            var amount = Period.from(amountToAdd);
	            return Period.create(_MathUtil.MathUtil.safeAdd(this._years, amount._years), _MathUtil.MathUtil.safeAdd(this._months, amount._months), _MathUtil.MathUtil.safeAdd(this._days, amount._days));
	        }
	
	        /**
	         * Returns a copy of this period with the specified years added.
	         * <p>
	         * This adds the amount to the years unit in a copy of this period.
	         * The months and days units are unaffected.
	         * For example, '1 year, 6 months and 3 days' plus 2 years returns '3 years, 6 months and 3 days'.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param yearsToAdd  the years to add, positive or negative
	         * @return a {@code Period} based on this period with the specified years added, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'plusYears',
	        value: function plusYears(yearsToAdd) {
	            if (yearsToAdd === 0) {
	                return this;
	            }
	            return Period.create(_MathUtil.MathUtil.safeToInt(_MathUtil.MathUtil.safeAdd(this._years, yearsToAdd)), this._months, this._days);
	        }
	
	        /**
	         * Returns a copy of this period with the specified months added.
	         * <p>
	         * This adds the amount to the months unit in a copy of this period.
	         * The years and days units are unaffected.
	         * For example, '1 year, 6 months and 3 days' plus 2 months returns '1 year, 8 months and 3 days'.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param monthsToAdd  the months to add, positive or negative
	         * @return a {@code Period} based on this period with the specified months added, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'plusMonths',
	        value: function plusMonths(monthsToAdd) {
	            if (monthsToAdd === 0) {
	                return this;
	            }
	            return Period.create(this._years, _MathUtil.MathUtil.safeToInt(_MathUtil.MathUtil.safeAdd(this._months, monthsToAdd)), this._days);
	        }
	
	        /**
	         * Returns a copy of this period with the specified days added.
	         * <p>
	         * This adds the amount to the days unit in a copy of this period.
	         * The years and months units are unaffected.
	         * For example, '1 year, 6 months and 3 days' plus 2 days returns '1 year, 6 months and 5 days'.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param daysToAdd  the days to add, positive or negative
	         * @return a {@code Period} based on this period with the specified days added, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'plusDays',
	        value: function plusDays(daysToAdd) {
	            if (daysToAdd === 0) {
	                return this;
	            }
	            return Period.create(this._years, this._months, _MathUtil.MathUtil.safeToInt(_MathUtil.MathUtil.safeAdd(this._days, daysToAdd)));
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Returns a copy of this period with the specified amount subtracted.
	         * <p>
	         * This input amount is converted to a {@code Period} using {@code from(TemporalAmount)}.
	         * This operates separately on the years, months and days.
	         * <p>
	         * For example, '1 year, 6 months and 3 days' minus '2 years, 2 months and 2 days'
	         * returns '-1 years, 4 months and 1 day'.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param amountToSubtract  the period to subtract, not null
	         * @return a {@code Period} based on this period with the requested period subtracted, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'minus',
	        value: function minus(amountToSubtract) {
	            var amount = Period.from(amountToSubtract);
	            return Period.create(_MathUtil.MathUtil.safeSubtract(this._years, amount._years), _MathUtil.MathUtil.safeSubtract(this._months, amount._months), _MathUtil.MathUtil.safeSubtract(this._days, amount._days));
	        }
	
	        /**
	         * Returns a copy of this period with the specified years subtracted.
	         * <p>
	         * This subtracts the amount from the years unit in a copy of this period.
	         * The months and days units are unaffected.
	         * For example, '1 year, 6 months and 3 days' minus 2 years returns '-1 years, 6 months and 3 days'.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param yearsToSubtract  the years to subtract, positive or negative
	         * @return a {@code Period} based on this period with the specified years subtracted, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'minusYears',
	        value: function minusYears(yearsToSubtract) {
	            return this.plusYears(-1 * yearsToSubtract);
	        }
	
	        /**
	         * Returns a copy of this period with the specified months subtracted.
	         * <p>
	         * This subtracts the amount from the months unit in a copy of this period.
	         * The years and days units are unaffected.
	         * For example, '1 year, 6 months and 3 days' minus 2 months returns '1 year, 4 months and 3 days'.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param monthsToSubtract  the years to subtract, positive or negative
	         * @return a {@code Period} based on this period with the specified months subtracted, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'minusMonths',
	        value: function minusMonths(monthsToSubtract) {
	            return this.plusMonths(-1 * monthsToSubtract);
	        }
	
	        /**
	         * Returns a copy of this period with the specified days subtracted.
	         * <p>
	         * This subtracts the amount from the days unit in a copy of this period.
	         * The years and months units are unaffected.
	         * For example, '1 year, 6 months and 3 days' minus 2 days returns '1 year, 6 months and 1 day'.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param daysToSubtract  the months to subtract, positive or negative
	         * @return a {@code Period} based on this period with the specified days subtracted, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'minusDays',
	        value: function minusDays(daysToSubtract) {
	            return this.plusDays(-1 * daysToSubtract);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Returns a new instance with each element in this period multiplied
	         * by the specified scalar.
	         * <p>
	         * This simply multiplies each field, years, months, days and normalized time,
	         * by the scalar. No normalization is performed.
	         *
	         * @param scalar  the scalar to multiply by, not null
	         * @return a {@code Period} based on this period with the amounts multiplied by the scalar, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'multipliedBy',
	        value: function multipliedBy(scalar) {
	            if (this === Period.ZERO || scalar === 1) {
	                return this;
	            }
	            return Period.create(_MathUtil.MathUtil.safeMultiply(this._years, scalar), _MathUtil.MathUtil.safeMultiply(this._months, scalar), _MathUtil.MathUtil.safeMultiply(this._days, scalar));
	        }
	
	        /**
	         * Returns a new instance with each amount in this period negated.
	         *
	         * @return a {@code Period} based on this period with the amounts negated, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'negated',
	        value: function negated() {
	            return this.multipliedBy(-1);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Returns a copy of this period with the years and months normalized
	         * using a 12 month year.
	         * <p>
	         * This normalizes the years and months units, leaving the days unit unchanged.
	         * The months unit is adjusted to have an absolute value less than 11,
	         * with the years unit being adjusted to compensate. For example, a period of
	         * '1 Year and 15 months' will be normalized to '2 years and 3 months'.
	         * <p>
	         * The sign of the years and months units will be the same after normalization.
	         * For example, a period of '1 year and -25 months' will be normalized to
	         * '-1 year and -1 month'.
	         * <p>
	         * This normalization uses a 12 month year which is not valid for all calendar systems.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @return a {@code Period} based on this period with excess months normalized to years, not null
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'normalized',
	        value: function normalized() {
	            var totalMonths = this.toTotalMonths();
	            var splitYears = _MathUtil.MathUtil.intDiv(totalMonths, 12);
	            var splitMonths = _MathUtil.MathUtil.intMod(totalMonths, 12); // no overflow
	            if (splitYears === this._years && splitMonths === this._months) {
	                return this;
	            }
	            return Period.create(_MathUtil.MathUtil.safeToInt(splitYears), splitMonths, this._days);
	        }
	
	        /**
	         * Gets the total number of months in this period using a 12 month year.
	         * <p>
	         * This returns the total number of months in the period by multiplying the
	         * number of years by 12 and adding the number of months.
	         * <p>
	         * This uses a 12 month year which is not valid for all calendar systems.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @return the total number of months in the period, may be negative
	         */
	
	    }, {
	        key: 'toTotalMonths',
	        value: function toTotalMonths() {
	            return this._years * 12 + this._months; // no overflow
	        }
	
	        //-------------------------------------------------------------------------
	        /**
	         * Adds this period to the specified temporal object.
	         * <p>
	         * This returns a temporal object of the same observable type as the input
	         * with this period added.
	         * <p>
	         * In most cases, it is clearer to reverse the calling pattern by using
	         * {@link Temporal#plus(TemporalAmount)}.
	         * <pre>
	         *   // these two lines are equivalent, but the second approach is recommended
	         *   dateTime = thisPeriod.addTo(dateTime);
	         *   dateTime = dateTime.plus(thisPeriod);
	         * </pre>
	         * <p>
	         * The calculation will add the years, then months, then days.
	         * Only non-zero amounts will be added.
	         * If the date-time has a calendar system with a fixed number of months in a
	         * year, then the years and months will be combined before being added.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param temporal  the temporal object to adjust, not null
	         * @return an object of the same type with the adjustment made, not null
	         * @throws DateTimeException if unable to add
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'addTo',
	        value: function addTo(temporal) {
	            (0, _assert.requireNonNull)(temporal, 'temporal');
	            if (this._years !== 0) {
	                if (this._months !== 0) {
	                    temporal = temporal.plus(this.toTotalMonths(), _ChronoUnit.ChronoUnit.MONTHS);
	                } else {
	                    temporal = temporal.plus(this._years, _ChronoUnit.ChronoUnit.YEARS);
	                }
	            } else if (this._months !== 0) {
	                temporal = temporal.plus(this._months, _ChronoUnit.ChronoUnit.MONTHS);
	            }
	            if (this._days !== 0) {
	                temporal = temporal.plus(this._days, _ChronoUnit.ChronoUnit.DAYS);
	            }
	            return temporal;
	        }
	
	        /**
	         * Subtracts this period from the specified temporal object.
	         * <p>
	         * This returns a temporal object of the same observable type as the input
	         * with this period subtracted.
	         * <p>
	         * In most cases, it is clearer to reverse the calling pattern by using
	         * {@link Temporal#minus(TemporalAmount)}.
	         * <pre>
	         *   // these two lines are equivalent, but the second approach is recommended
	         *   dateTime = thisPeriod.subtractFrom(dateTime);
	         *   dateTime = dateTime.minus(thisPeriod);
	         * </pre>
	         * <p>
	         * The calculation operates as follows.
	         * First, the chronology of the temporal is checked to ensure it is ISO chronology or null.
	         * Second, if the months are zero, the years are added if non-zero, otherwise
	         * the combination of years and months is added if non-zero.
	         * Finally, any days are added.
	         * 
	         * The calculation will subtract the years, then months, then days.
	         * Only non-zero amounts will be subtracted.
	         * If the date-time has a calendar system with a fixed number of months in a
	         * year, then the years and months will be combined before being subtracted.
	         * <p>
	         * This instance is immutable and unaffected by this method call.
	         *
	         * @param temporal  the temporal object to adjust, not null
	         * @return an object of the same type with the adjustment made, not null
	         * @throws DateTimeException if unable to subtract
	         * @throws ArithmeticException if numeric overflow occurs
	         */
	
	    }, {
	        key: 'subtractFrom',
	        value: function subtractFrom(temporal) {
	            (0, _assert.requireNonNull)(temporal, 'temporal');
	            if (this._years !== 0) {
	                if (this._months !== 0) {
	                    temporal = temporal.minus(this.toTotalMonths(), _ChronoUnit.ChronoUnit.MONTHS);
	                } else {
	                    temporal = temporal.minus(this._years, _ChronoUnit.ChronoUnit.YEARS);
	                }
	            } else if (this._months !== 0) {
	                temporal = temporal.minus(this._months, _ChronoUnit.ChronoUnit.MONTHS);
	            }
	            if (this._days !== 0) {
	                temporal = temporal.minus(this._days, _ChronoUnit.ChronoUnit.DAYS);
	            }
	            return temporal;
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Checks if this period is equal to another period.
	         * <p>
	         * The comparison is based on the amounts held in the period.
	         * To be equal, the years, months and days units must be individually equal.
	         * Note that this means that a period of '15 Months' is not equal to a period
	         * of '1 Year and 3 Months'.
	         *
	         * @param obj  the object to check, null returns false
	         * @return true if this is equal to the other period
	         */
	
	    }, {
	        key: 'equals',
	        value: function equals(obj) {
	            if (this === obj) {
	                return true;
	            }
	            if (obj instanceof Period) {
	                var other = obj;
	                return this._years === other._years && this._months === other._months && this._days === other._days;
	            }
	            return false;
	        }
	
	        /**
	         * A hash code for this period.
	         *
	         * @return a suitable hash code
	         */
	
	    }, {
	        key: 'hashCode',
	        value: function hashCode() {
	            return this._years + (this._months << 8) + (this._days << 16);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Outputs this period as a {@code String}, such as {@code P6Y3M1D}.
	         * <p>
	         * The output will be in the ISO-8601 period format.
	         * A zero period will be represented as zero days, 'P0D'.
	         *
	         * @return a string representation of this period, not null
	         */
	
	    }, {
	        key: 'toString',
	        value: function toString() {
	            if (this === Period.ZERO) {
	                return 'P0D';
	            } else {
	                var buf = 'P';
	                if (this._years !== 0) {
	                    buf += '' + this._years + 'Y';
	                }
	                if (this._months !== 0) {
	                    buf += '' + this._months + 'M';
	                }
	                if (this._days !== 0) {
	                    buf += '' + this._days + 'D';
	                }
	                return buf;
	            }
	        }
	    }], [{
	        key: '_validate',
	        value: function _validate(years, month, days) {
	            (0, _assert.requireNonNull)(years, 'years');
	            (0, _assert.requireNonNull)(month, 'month');
	            (0, _assert.requireNonNull)(days, 'days');
	            _MathUtil.MathUtil.safeToInt(years);
	            _MathUtil.MathUtil.safeToInt(month);
	            _MathUtil.MathUtil.safeToInt(days);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Obtains a {@code Period} representing a number of years.
	         * <p>
	         * The resulting period will have the specified years.
	         * The months and days units will be zero.
	         *
	         * @param years  the number of years, positive or negative
	         * @return the period of years, not null
	         */
	
	    }, {
	        key: 'ofYears',
	        value: function ofYears(years) {
	            return Period.create(years, 0, 0);
	        }
	
	        /**
	         * Obtains a {@code Period} representing a number of months.
	         * <p>
	         * The resulting period will have the specified months.
	         * The years and days units will be zero.
	         *
	         * @param months  the number of months, positive or negative
	         * @return the period of months, not null
	         */
	
	    }, {
	        key: 'ofMonths',
	        value: function ofMonths(months) {
	            return Period.create(0, months, 0);
	        }
	
	        /**
	         * Obtains a {@code Period} representing a number of weeks.
	         * <p>
	         * The resulting period will have days equal to the weeks multiplied by seven.
	         * The years and months units will be zero.
	         *
	         * @param weeks  the number of weeks, positive or negative
	         * @return the period of days, not null
	         */
	
	    }, {
	        key: 'ofWeeks',
	        value: function ofWeeks(weeks) {
	            return Period.create(0, 0, _MathUtil.MathUtil.safeMultiply(weeks, 7));
	        }
	
	        /**
	         * Obtains a {@code Period} representing a number of days.
	         * <p>
	         * The resulting period will have the specified days.
	         * The years and months units will be zero.
	         *
	         * @param days  the number of days, positive or negative
	         * @return the period of days, not null
	         */
	
	    }, {
	        key: 'ofDays',
	        value: function ofDays(days) {
	            return Period.create(0, 0, days);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Obtains a {@code Period} representing a number of years, months and days.
	         * <p>
	         * This creates an instance based on years, months and days.
	         *
	         * @param years  the amount of years, may be negative
	         * @param months  the amount of months, may be negative
	         * @param days  the amount of days, may be negative
	         * @return the period of years, months and days, not null
	         */
	
	    }, {
	        key: 'of',
	        value: function of(years, months, days) {
	            return Period.create(years, months, days);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Obtains an instance of {@code Period} from a temporal amount.
	         * <p>
	         * This obtains a period based on the specified amount.
	         * A {@code TemporalAmount} represents an  amount of time, which may be
	         * date-based or time-based, which this factory extracts to a {@code Period}.
	         * <p>
	         * The conversion loops around the set of units from the amount and uses
	         * the {@link ChronoUnit#YEARS YEARS}, {@link ChronoUnit#MONTHS MONTHS}
	         * and {@link ChronoUnit#DAYS DAYS} units to create a period.
	         * If any other units are found then an exception is thrown.
	         * <p>
	         * If the amount is a {@code ChronoPeriod} then it must use the ISO chronology.
	         *
	         * @param amount  the temporal amount to convert, not null
	         * @return the equivalent period, not null
	         * @throws DateTimeException if unable to convert to a {@code Period}
	         * @throws ArithmeticException if the amount of years, months or days exceeds an int
	         */
	
	    }, {
	        key: 'from',
	        value: function from(amount) {
	            if (amount instanceof Period) {
	                return amount;
	            }
	            /*
	                    if (amount instanceof ChronoPeriod) {
	                        if (IsoChronology.INSTANCE !== amount.chronology()) {
	                            throw new DateTimeException('Period requires ISO chronology: ' + amount);
	                        }
	                    }
	            */
	            (0, _assert.requireNonNull)(amount, 'amount');
	            var years = 0;
	            var months = 0;
	            var days = 0;
	            var units = amount.units();
	            for (var i = 0; i < units.length; i++) {
	                var unit = units[i];
	                var unitAmount = amount.get(unit);
	                if (unit === _ChronoUnit.ChronoUnit.YEARS) {
	                    years = _MathUtil.MathUtil.safeToInt(unitAmount);
	                } else if (unit === _ChronoUnit.ChronoUnit.MONTHS) {
	                    months = _MathUtil.MathUtil.safeToInt(unitAmount);
	                } else if (unit === _ChronoUnit.ChronoUnit.DAYS) {
	                    days = _MathUtil.MathUtil.safeToInt(unitAmount);
	                } else {
	                    throw new _errors.DateTimeException('Unit must be Years, Months or Days, but was ' + unit);
	                }
	            }
	            return Period.create(years, months, days);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Obtains a {@code Period} consisting of the number of years, months,
	         * and days between two dates.
	         * <p>
	         * The start date is included, but the end date is not.
	         * The period is calculated by removing complete months, then calculating
	         * the remaining number of days, adjusting to ensure that both have the same sign.
	         * The number of months is then split into years and months based on a 12 month year.
	         * A month is considered if the end day-of-month is greater than or equal to the start day-of-month.
	         * For example, from {@code 2010-01-15} to {@code 2011-03-18} is one year, two months and three days.
	         * <p>
	         * The result of this method can be a negative period if the end is before the start.
	         * The negative sign will be the same in each of year, month and day.
	         *
	         * @param startDate  the start date, inclusive, not null
	         * @param endDate  the end date, exclusive, not null
	         * @return the period between this date and the end date, not null
	         * @see ChronoLocalDate#until(ChronoLocalDate)
	         */
	
	    }, {
	        key: 'between',
	        value: function between(startDate, endDate) {
	            (0, _assert.requireNonNull)(startDate, 'startDate');
	            (0, _assert.requireNonNull)(endDate, 'endDate');
	            (0, _assert.requireInstance)(startDate, _LocalDate.LocalDate, 'startDate');
	            (0, _assert.requireInstance)(endDate, _LocalDate.LocalDate, 'endDate');
	            return startDate.until(endDate);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Obtains a {@code Period} from a text string such as {@code PnYnMnD}.
	         * <p>
	         * This will parse the string produced by {@code toString()} which is
	         * based on the ISO-8601 period formats {@code PnYnMnD} and {@code PnW}.
	         * <p>
	         * The string starts with an optional sign, denoted by the ASCII negative
	         * or positive symbol. If negative, the whole period is negated.
	         * The ASCII letter 'P' is next in upper or lower case.
	         * There are then four sections, each consisting of a number and a suffix.
	         * At least one of the four sections must be present.
	         * The sections have suffixes in ASCII of 'Y', 'M', 'W' and 'D' for
	         * years, months, weeks and days, accepted in upper or lower case.
	         * The suffixes must occur in order.
	         * The number part of each section must consist of ASCII digits.
	         * The number may be prefixed by the ASCII negative or positive symbol.
	         * The number must parse to an {@code int}.
	         * <p>
	         * The leading plus/minus sign, and negative values for other units are
	         * not part of the ISO-8601 standard. In addition, ISO-8601 does not
	         * permit mixing between the {@code PnYnMnD} and {@code PnW} formats.
	         * Any week-based input is multiplied by 7 and treated as a number of days.
	         * <p>
	         * For example, the following are valid inputs:
	         * <pre>
	         *   'P2Y'             -- Period.ofYears(2)
	         *   'P3M'             -- Period.ofMonths(3)
	         *   'P4W'             -- Period.ofWeeks(4)
	         *   'P5D'             -- Period.ofDays(5)
	         *   'P1Y2M3D'         -- Period.of(1, 2, 3)
	         *   'P1Y2M3W4D'       -- Period.of(1, 2, 25)
	         *   'P-1Y2M'          -- Period.of(-1, 2, 0)
	         *   '-P1Y2M'          -- Period.of(-1, -2, 0)
	         * </pre>
	         *
	         * @param text  the text to parse, not null
	         * @return the parsed period, not null
	         * @throws DateTimeParseException if the text cannot be parsed to a period
	         */
	
	    }, {
	        key: 'parse',
	        value: function parse(text) {
	            (0, _assert.requireNonNull)(text, 'text');
	            try {
	                return Period._parse(text);
	            } catch (ex) {
	                if (ex instanceof _errors.ArithmeticException) {
	                    throw new _errors.DateTimeParseException('Text cannot be parsed to a Period', text, 0, ex);
	                } else {
	                    throw ex;
	                }
	            }
	        }
	
	        /**
	         * because functions that containing a try/ catch block cant be optimized,
	         * we put the code in a sub function.
	         */
	
	    }, {
	        key: '_parse',
	        value: function _parse(text) {
	            var matches = PATTERN.exec(text);
	            if (matches != null) {
	                var negate = '-' === matches[1] ? -1 : 1;
	                var yearMatch = matches[2];
	                var monthMatch = matches[3];
	                var weekMatch = matches[4];
	                var dayMatch = matches[5];
	                if (yearMatch != null || monthMatch != null || weekMatch != null || dayMatch != null) {
	                    var years = Period._parseNumber(text, yearMatch, negate);
	                    var months = Period._parseNumber(text, monthMatch, negate);
	                    var weeks = Period._parseNumber(text, weekMatch, negate);
	                    var days = Period._parseNumber(text, dayMatch, negate);
	                    days = _MathUtil.MathUtil.safeAdd(days, _MathUtil.MathUtil.safeMultiply(weeks, 7));
	                    return Period.create(years, months, days);
	                }
	            }
	            throw new _errors.DateTimeParseException('Text cannot be parsed to a Period', text, 0);
	        }
	    }, {
	        key: '_parseNumber',
	        value: function _parseNumber(text, str, negate) {
	            if (str == null) {
	                return 0;
	            }
	            var val = _MathUtil.MathUtil.parseInt(str);
	            return _MathUtil.MathUtil.safeMultiply(val, negate);
	        }
	
	        //-----------------------------------------------------------------------
	        /**
	         * Creates an instance.
	         *
	         * @param years  the amount
	         * @param months  the amount
	         * @param days  the amount
	         */
	
	    }, {
	        key: 'create',
	        value: function create(years, months, days) {
	            return new Period(years, months, days);
	        }
	    }]);
	
	    return Period;
	}(_TemporalAmount2.TemporalAmount /* extends ChronoPeriod */);
	
	function _init() {
	    /**
	     * A constant for a period of zero.
	     */
	    Period.ZERO = makeZeroPeriod();
	
	    function makeZeroPeriod() {
	        var zero = Object.create(Period.prototype);
	        _TemporalAmount2.TemporalAmount.call(zero);
	        zero._years = 0;
	        zero._months = 0;
	        zero._days = 0;
	        return zero;
	    }
	}

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._init = _init;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	 */
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
	
	function _init() {
	  /**
	   * The minimum supported year
	   */
	  Year.MIN_VALUE = -999999;
	  /**
	   * The maximum supported year
	   */
	  Year.MAX_VALUE = 999999;
	}

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	 */
	
	var TemporalField = exports.TemporalField = function TemporalField() {
	    _classCallCheck(this, TemporalField);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ValueRange = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _assert = __webpack_require__(9);
	
	var _errors = __webpack_require__(5);
	
	var _MathUtil = __webpack_require__(4);
	
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
	
	var ValueRange = exports.ValueRange = function () {
	    function ValueRange(minSmallest, minLargest, maxSmallest, maxLargest) {
	        _classCallCheck(this, ValueRange);
	
	        (0, _assert.assert)(!(minSmallest > minLargest), 'Smallest minimum value \'' + minSmallest + '\' must be less than largest minimum value \'' + minLargest + '\'');
	        (0, _assert.assert)(!(maxSmallest > maxLargest), 'Smallest maximum value \'' + maxSmallest + '\' must be less than largest maximum value \'' + maxLargest + '\'');
	        (0, _assert.assert)(!(minLargest > maxLargest), 'Minimum value \'' + minLargest + '\' must be less than maximum value \'' + maxLargest + '\'');
	
	        this._minSmallest = minSmallest;
	        this._minLargest = minLargest;
	        this._maxLargest = maxLargest;
	        this._maxSmallest = maxSmallest;
	    }
	
	    _createClass(ValueRange, [{
	        key: 'minimum',
	        value: function minimum() {
	            return this._minSmallest;
	        }
	    }, {
	        key: 'largestMinimum',
	        value: function largestMinimum() {
	            return this._minLargest;
	        }
	    }, {
	        key: 'maximum',
	        value: function maximum() {
	            return this._maxLargest;
	        }
	    }, {
	        key: 'smallestMaximum',
	        value: function smallestMaximum() {
	            return this._maxSmallest;
	        }
	    }, {
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
	
	        /**
	         * Checks that the specified value is valid and fits in an {@code int}.
	         * <p>
	         * This validates that the value is within the valid range of values and that
	         * all valid values are within the bounds of an {@code int}.
	         * The field is only used to improve the error message.
	         *
	         * @param value  the value to check
	         * @param field  the field being checked, may be null
	         * @return the value that was passed in
	         * @see #isValidIntValue(long)
	         */
	
	    }, {
	        key: 'checkValidIntValue',
	        value: function checkValidIntValue(value, field) {
	            if (this.isValidIntValue(value) === false) {
	                throw new _errors.DateTimeException('Invalid int value for ' + field + ': ' + value);
	            }
	            return value;
	        }
	
	        /**
	         * Checks if the value is within the valid range and that all values
	         * in the range fit in an {@code int}.
	         * <p>
	         * This method combines {@link #isIntValue()} and {@link #isValidValue(long)}.
	         *
	         * @param value  the value to check
	         * @return true if the value is valid and fits in an {@code int}
	         */
	
	    }, {
	        key: 'isValidIntValue',
	        value: function isValidIntValue(value) {
	            return this.isIntValue() && this.isValidValue(value);
	        }
	
	        /**
	         * Checks if all values in the range fit in an {@code int}.
	         * <p>
	         * This checks that all valid values are within the bounds of an {@code int}.
	         * <p>
	         * For example, the ISO month-of-year has values from 1 to 12, which fits in an {@code int}.
	         * By comparison, ISO nano-of-day runs from 1 to 86,400,000,000,000 which does not fit in an {@code int}.
	         * <p>
	         * This implementation uses {@link #getMinimum()} and {@link #getMaximum()}.
	         *
	         * @return boolean if a valid value always fits in an {@code int}
	         */
	
	    }, {
	        key: 'isIntValue',
	        value: function isIntValue() {
	            return this.minimum() >= _MathUtil.MathUtil.MIN_SAFE_INTEGER && this.maximum() <= _MathUtil.MathUtil.MAX_SAFE_INTEGER;
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
	}();

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _DayOfWeek = __webpack_require__(24);
	
	var _Duration = __webpack_require__(8);
	
	var _Instant = __webpack_require__(2);
	
	var _LocalDate = __webpack_require__(19);
	
	var _LocalTime = __webpack_require__(11);
	
	var _Month = __webpack_require__(29);
	
	var _Period = __webpack_require__(30);
	
	var _Year = __webpack_require__(31);
	
	var _ZoneOffset = __webpack_require__(22);
	
	var _IsoChronology = __webpack_require__(17);
	
	var _DateTimeFormatter = __webpack_require__(12);
	
	var _ChronoField = __webpack_require__(3);
	
	var _ChronoUnit = __webpack_require__(7);
	
	var _TemporalQueries = __webpack_require__(21);
	
	/*
	 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	 */
	
	var isInit = false;
	
	function init() {
	
	    if (isInit) {
	        return;
	    }
	
	    isInit = true;
	
	    (0, _Year._init)();
	    (0, _Duration._init)();
	    (0, _LocalTime._init)();
	    (0, _ChronoUnit._init)();
	    (0, _ChronoField._init)();
	    (0, _TemporalQueries._init)();
	    (0, _DayOfWeek._init)();
	    (0, _Instant._init)();
	    (0, _LocalDate._init)();
	    (0, _Month._init)();
	    (0, _Period._init)();
	    (0, _ZoneOffset._init)();
	    (0, _IsoChronology._init)();
	    (0, _DateTimeFormatter._init)();
	}
	
	init();

/***/ }
/******/ ])
});
;
//# sourceMappingURL=js-joda.js.map