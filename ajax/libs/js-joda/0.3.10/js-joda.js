//! @version js-joda - 0.3.10
//! @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
//! @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
//! @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
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
	exports.TemporalAdjusters = exports.ChronoUnit = exports.ChronoField = exports.ZoneOffset = exports.Year = exports.Period = exports.Month = exports.MathUtil = exports.LocalDateTime = exports.LocalTime = exports.LocalDate = exports.Instant = exports.Duration = exports.DayOfWeek = exports.DateTimeParseException = exports.DateTimeException = exports.Clock = undefined;
	
	var _Clock = __webpack_require__(1);
	
	Object.defineProperty(exports, 'Clock', {
	  enumerable: true,
	  get: function get() {
	    return _Clock.Clock;
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
	
	var _DayOfWeek = __webpack_require__(35);
	
	Object.defineProperty(exports, 'DayOfWeek', {
	  enumerable: true,
	  get: function get() {
	    return _DayOfWeek.DayOfWeek;
	  }
	});
	
	var _Duration = __webpack_require__(8);
	
	Object.defineProperty(exports, 'Duration', {
	  enumerable: true,
	  get: function get() {
	    return _Duration.Duration;
	  }
	});
	
	var _Instant = __webpack_require__(2);
	
	Object.defineProperty(exports, 'Instant', {
	  enumerable: true,
	  get: function get() {
	    return _Instant.Instant;
	  }
	});
	
	var _LocalDate = __webpack_require__(13);
	
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
	
	var _LocalDateTime = __webpack_require__(12);
	
	Object.defineProperty(exports, 'LocalDateTime', {
	  enumerable: true,
	  get: function get() {
	    return _LocalDateTime.LocalDateTime;
	  }
	});
	
	var _MathUtil = __webpack_require__(4);
	
	Object.defineProperty(exports, 'MathUtil', {
	  enumerable: true,
	  get: function get() {
	    return _MathUtil.MathUtil;
	  }
	});
	
	var _Month = __webpack_require__(16);
	
	Object.defineProperty(exports, 'Month', {
	  enumerable: true,
	  get: function get() {
	    return _Month.Month;
	  }
	});
	
	var _Period = __webpack_require__(31);
	
	Object.defineProperty(exports, 'Period', {
	  enumerable: true,
	  get: function get() {
	    return _Period.Period;
	  }
	});
	
	var _Year = __webpack_require__(22);
	
	Object.defineProperty(exports, 'Year', {
	  enumerable: true,
	  get: function get() {
	    return _Year.Year;
	  }
	});
	
	var _ZoneOffset = __webpack_require__(21);
	
	Object.defineProperty(exports, 'ZoneOffset', {
	  enumerable: true,
	  get: function get() {
	    return _ZoneOffset.ZoneOffset;
	  }
	});
	
	var _ChronoField = __webpack_require__(3);
	
	Object.defineProperty(exports, 'ChronoField', {
	  enumerable: true,
	  get: function get() {
	    return _ChronoField.ChronoField;
	  }
	});
	
	var _ChronoUnit = __webpack_require__(7);
	
	Object.defineProperty(exports, 'ChronoUnit', {
	  enumerable: true,
	  get: function get() {
	    return _ChronoUnit.ChronoUnit;
	  }
	});
	
	var _TemporalAdjusters = __webpack_require__(39);
	
	Object.defineProperty(exports, 'TemporalAdjusters', {
	  enumerable: true,
	  get: function get() {
	    return _TemporalAdjusters.TemporalAdjusters;
	  }
	});

	__webpack_require__(41);

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
	
	var _ZoneOffset = __webpack_require__(21);
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Clock = exports.Clock = function () {
	    function Clock() {
	        _classCallCheck(this, Clock);
	    }
	
	    _createClass(Clock, [{
	        key: 'millis',
	        value: function millis() {
	            throw new TypeError('millis() function is not implemented');
	        }
	    }, {
	        key: 'instant',
	        value: function instant() {
	            throw new TypeError('instant() function is not implemented');
	        }
	    }, {
	        key: 'offset',
	        value: function offset() {
	            throw new TypeError('offset() function is not implemented');
	        }
	    }], [{
	        key: 'systemUTC',
	        value: function systemUTC() {
	            return new SystemUTCClock();
	        }
	    }, {
	        key: 'systemDefaultZone',
	        value: function systemDefaultZone() {
	            return new SystemDefaultClock();
	        }
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
	            return _ZoneOffset.ZoneOffset.ofTotalMinutes(offsetInMinutes * -1);
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return 'SystemClock[default]';
	        }
	    }]);
	
	    return SystemDefaultClock;
	}(SystemClock);
	
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
	
	var _Temporal2 = __webpack_require__(17);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
	var NANOS_PER_MILLI = 1000000;
	
	var Instant = exports.Instant = function (_Temporal) {
	    _inherits(Instant, _Temporal);
	
	    function Instant(seconds, nanoOfSecond) {
	        _classCallCheck(this, Instant);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Instant).call(this));
	
	        Instant._validate(seconds, nanoOfSecond);
	        _this._seconds = seconds;
	        _this._nanos = nanoOfSecond;
	        return _this;
	    }
	
	    _createClass(Instant, [{
	        key: 'epochSecond',
	        value: function epochSecond() {
	            return this._seconds;
	        }
	    }, {
	        key: 'epochMilli',
	        value: function epochMilli() {
	            return this._seconds * 1000 + _MathUtil.MathUtil.intDiv(this._nanos, 1000000);
	        }
	    }, {
	        key: 'nano',
	        value: function nano() {
	            return this._nanos;
	        }
	    }, {
	        key: 'plusSeconds',
	        value: function plusSeconds(secondsToAdd) {
	            return this._plus(secondsToAdd, 0);
	        }
	    }, {
	        key: 'minusSeconds',
	        value: function minusSeconds(secondsToSubtract) {
	            return this.plusSeconds(secondsToSubtract * -1);
	        }
	    }, {
	        key: 'plusNanos',
	        value: function plusNanos(nanosToAdd) {
	            return this._plus(0, nanosToAdd);
	        }
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
	    }, {
	        key: 'ofEpochSecond',
	        value: function ofEpochSecond(epochSecond) {
	            var nanoAdjustment = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	            var secs = epochSecond + _MathUtil.MathUtil.floorDiv(nanoAdjustment, _LocalTime.LocalTime.NANOS_PER_SECOND);
	            var nos = _MathUtil.MathUtil.floorMod(nanoAdjustment, _LocalTime.LocalTime.NANOS_PER_SECOND);
	            return Instant._create(secs, nos);
	        }
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
	        key: '_validate',
	        value: function _validate(seconds, nanoOfSecond) {
	            if (seconds < Instant.MIN_SECONDS || seconds > Instant.MAX_SECONDS) {
	                throw new _errors.DateTimeException('Instant exceeds minimum or maximum instant');
	            }
	            if (nanoOfSecond < 0 || nanoOfSecond > _LocalTime.LocalTime.NANOS_PER_SECOND) {
	                throw new _errors.DateTimeException('Instant exceeds minimum or maximum instant');
	            }
	        }
	    }]);
	
	    return Instant;
	}(_Temporal2.Temporal);
	
	function _init() {
	    Instant.MIN_SECONDS = -31619087596800;
	    Instant.MAX_SECONDS = 31494784780799;
	    Instant.EPOCH = new Instant(0, 0);
	    Instant.MIN = Instant.ofEpochSecond(Instant.MIN_SECONDS, 0);
	    Instant.MAX = Instant.ofEpochSecond(Instant.MAX_SECONDS, 999999999);
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
	
	var _TemporalField2 = __webpack_require__(38);
	
	var _ValueRange = __webpack_require__(25);
	
	var _Year = __webpack_require__(22);
	
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
	    }, {
	        key: 'isDateBased',
	        value: function isDateBased() {
	            var dateBased = this === ChronoField.DAY_OF_WEEK || this === ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH || this === ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR || this === ChronoField.DAY_OF_MONTH || this === ChronoField.DAY_OF_YEAR || this === ChronoField.EPOCH_DAY || this === ChronoField.ALIGNED_WEEK_OF_MONTH || this === ChronoField.ALIGNED_WEEK_OF_YEAR || this === ChronoField.MONTH_OF_YEAR || this === ChronoField.YEAR_OF_ERA || this === ChronoField.YEAR || this === ChronoField.ERA;
	            return dateBased;
	        }
	    }, {
	        key: 'isTimeBased',
	        value: function isTimeBased() {
	            var timeBased = this === ChronoField.NANO_OF_SECOND || this === ChronoField.NANO_OF_DAY || this === ChronoField.MICRO_OF_SECOND || this === ChronoField.MICRO_OF_DAY || this === ChronoField.MILLI_OF_SECOND || this === ChronoField.MILLI_OF_DAY || this === ChronoField.SECOND_OF_MINUTE || this === ChronoField.SECOND_OF_DAY || this === ChronoField.MINUTE_OF_HOUR || this === ChronoField.MINUTE_OF_DAY || this === ChronoField.HOUR_OF_AMPM || this === ChronoField.CLOCK_HOUR_OF_AMPM || this === ChronoField.HOUR_OF_DAY || this === ChronoField.CLOCK_HOUR_OF_DAY || this === ChronoField.AMPM_OF_DAY;
	            return timeBased;
	        }
	    }, {
	        key: 'rangeRefinedBy',
	        value: function rangeRefinedBy(temporal) {
	            return temporal.range(this);
	        }
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
	
	var MAX_SAFE_INTEGER = exports.MAX_SAFE_INTEGER = 9007199254740991;
	var MIN_SAFE_INTEGER = exports.MIN_SAFE_INTEGER = -9007199254740991;
	
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
	                r = Math.ceil(r);
	            } else {
	                r = Math.floor(r);
	            }
	            return MathUtil.safeZero(r);
	        }
	    }, {
	        key: 'intMod',
	        value: function intMod(x, y) {
	            var r = x - MathUtil.intDiv(x, y) * y;
	            if (r === 0) {
	                return 0;
	            } else if (r < 0) {
	                r = Math.ceil(r);
	            } else {
	                r = Math.floor(r);
	            }
	            return MathUtil.safeZero(r);
	        }
	    }, {
	        key: 'floorDiv',
	        value: function floorDiv(x, y) {
	            var r = Math.floor(x / y);
	            return MathUtil.safeZero(r);
	        }
	    }, {
	        key: 'floorMod',
	        value: function floorMod(x, y) {
	            var r = x - MathUtil.floorDiv(x, y) * y;
	            return MathUtil.safeZero(r);
	        }
	    }, {
	        key: 'safeAdd',
	        value: function safeAdd(x, y) {
	            MathUtil.verifyInt(x);
	            MathUtil.verifyInt(y);
	            if (x === 0) {
	                return MathUtil.safeZero(y);
	            }
	            if (y === 0) {
	                return MathUtil.safeZero(x);
	            }
	            var r = MathUtil.safeToInt(x + y);
	            if (r === x || r === y) {
	                throw new _errors.ArithmeticException('Invalid addition beyond MAX_SAFE_INTEGER!');
	            }
	            return r;
	        }
	    }, {
	        key: 'safeSubtract',
	        value: function safeSubtract(x, y) {
	            MathUtil.verifyInt(x);
	            MathUtil.verifyInt(y);
	            if (x === 0 && y === 0) {
	                return 0;
	            } else if (x === 0) {
	                return MathUtil.safeZero(-1 * y);
	            } else if (y === 0) {
	                return MathUtil.safeZero(x);
	            }
	            return MathUtil.safeToInt(x - y);
	        }
	    }, {
	        key: 'safeMultiply',
	        value: function safeMultiply(x, y) {
	            MathUtil.verifyInt(x);
	            MathUtil.verifyInt(y);
	            if (x === 1) {
	                return MathUtil.safeZero(y);
	            }
	            if (y === 1) {
	                return MathUtil.safeZero(x);
	            }
	            if (x === 0 || y === 0) {
	                return 0;
	            }
	            var r = MathUtil.safeToInt(x * y);
	            if (r / y !== x || x === MIN_SAFE_INTEGER && y === -1 || y === MIN_SAFE_INTEGER && x === -1) {
	                throw new _errors.ArithmeticException('Multiplication overflows: ' + x + ' * ' + y);
	            }
	            return r;
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
	            var r = parseInt(value);
	            return MathUtil.safeToInt(r);
	        })
	    }, {
	        key: 'safeToInt',
	        value: function safeToInt(value) {
	            MathUtil.verifyInt(value);
	            return MathUtil.safeZero(value);
	        }
	    }, {
	        key: 'verifyInt',
	        value: function verifyInt(value) {
	            if (value == null) {
	                throw new _errors.ArithmeticException('Invalid value: \'' + value + '\', using null or undefined as argument');
	            }
	            if (isNaN(value)) {
	                throw new _errors.ArithmeticException('Invalid int value, using NaN as argument');
	            }
	            if (value > MAX_SAFE_INTEGER || value < MIN_SAFE_INTEGER) {
	                throw new _errors.ArithmeticException('Calculation overflows an int: ' + value);
	            }
	        }
	    }, {
	        key: 'safeZero',
	        value: function safeZero(value) {
	            return value === 0 ? 0 : value;
	        }
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
	exports.NullPointerException = exports.IllegalStateException = exports.IllegalArgumentException = exports.ArithmeticException = exports.UnsupportedTemporalTypeException = exports.DateTimeParseException = exports.DateTimeException = undefined;
	
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
	
	var IllegalStateException = exports.IllegalStateException = function (_ExtendableError5) {
	    _inherits(IllegalStateException, _ExtendableError5);
	
	    function IllegalStateException() {
	        var message = arguments.length <= 0 || arguments[0] === undefined ? 'IllegalStateException' : arguments[0];
	
	        _classCallCheck(this, IllegalStateException);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(IllegalStateException).call(this, message));
	    }
	
	    return IllegalStateException;
	}(_es6Error2.default);
	
	var NullPointerException = exports.NullPointerException = function (_ExtendableError6) {
	    _inherits(NullPointerException, _ExtendableError6);
	
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports._init = _init;
	
	var _MathUtil = __webpack_require__(4);
	
	var _Duration = __webpack_require__(8);
	
	var _Year = __webpack_require__(22);
	
	var _TemporalUnit2 = __webpack_require__(37);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var ChronoUnit = exports.ChronoUnit = function (_TemporalUnit) {
	  _inherits(ChronoUnit, _TemporalUnit);
	
	  function ChronoUnit(name, estimatedDuration) {
	    _classCallCheck(this, ChronoUnit);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChronoUnit).call(this));
	
	    _this._name = name;
	    _this._duration = estimatedDuration;
	    return _this;
	  }
	
	  _createClass(ChronoUnit, [{
	    key: 'duration',
	    value: function duration() {
	      return this._duration;
	    }
	  }, {
	    key: 'isDurationEstimated',
	    value: function isDurationEstimated() {
	      return this.isDateBased() || this === ChronoUnit.FOREVER;
	    }
	  }, {
	    key: 'isDateBased',
	    value: function isDateBased() {
	      return this.compareTo(ChronoUnit.DAYS) >= 0 && this !== ChronoUnit.FOREVER;
	    }
	  }, {
	    key: 'isTimeBased',
	    value: function isTimeBased() {
	      return this.compareTo(ChronoUnit.DAYS) < 0;
	    }
	  }, {
	    key: 'isSupportedBy',
	    value: function isSupportedBy(temporal) {
	      if (this === ChronoUnit.FOREVER) {
	        return false;
	      }
	
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
	  }, {
	    key: 'addTo',
	    value: function addTo(temporal, amount) {
	      return temporal.plus(amount, this);
	    }
	  }, {
	    key: 'between',
	    value: function between(temporal1, temporal2) {
	      return temporal1.until(temporal2, this);
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return this._name;
	    }
	  }, {
	    key: 'compareTo',
	    value: function compareTo(other) {
	      return this.duration().compareTo(other.duration());
	    }
	  }]);
	
	  return ChronoUnit;
	}(_TemporalUnit2.TemporalUnit);
	
	function _init() {
	  ChronoUnit.NANOS = new ChronoUnit('Nanos', _Duration.Duration.ofNanos(1));
	
	  ChronoUnit.MICROS = new ChronoUnit('Micros', _Duration.Duration.ofNanos(1000));
	
	  ChronoUnit.MILLIS = new ChronoUnit('Millis', _Duration.Duration.ofNanos(1000000));
	
	  ChronoUnit.SECONDS = new ChronoUnit('Seconds', _Duration.Duration.ofSeconds(1));
	
	  ChronoUnit.MINUTES = new ChronoUnit('Minutes', _Duration.Duration.ofSeconds(60));
	
	  ChronoUnit.HOURS = new ChronoUnit('Hours', _Duration.Duration.ofSeconds(3600));
	
	  ChronoUnit.HALF_DAYS = new ChronoUnit('HalfDays', _Duration.Duration.ofSeconds(43200));
	
	  ChronoUnit.DAYS = new ChronoUnit('Days', _Duration.Duration.ofSeconds(86400));
	
	  ChronoUnit.WEEKS = new ChronoUnit('Weeks', _Duration.Duration.ofSeconds(7 * 86400));
	
	  ChronoUnit.MONTHS = new ChronoUnit('Months', _Duration.Duration.ofSeconds(31556952 / 12));
	
	  ChronoUnit.YEARS = new ChronoUnit('Years', _Duration.Duration.ofSeconds(31556952));
	
	  ChronoUnit.DECADES = new ChronoUnit('Decades', _Duration.Duration.ofSeconds(31556952 * 10));
	
	  ChronoUnit.CENTURIES = new ChronoUnit('Centuries', _Duration.Duration.ofSeconds(31556952 * 100));
	
	  ChronoUnit.MILLENNIA = new ChronoUnit('Millennia', _Duration.Duration.ofSeconds(31556952 * 1000));
	
	  ChronoUnit.ERAS = new ChronoUnit('Eras', _Duration.Duration.ofSeconds(31556952 * (_Year.Year.MAX_VALUE + 1)));
	
	  ChronoUnit.FOREVER = new ChronoUnit('Forever', _Duration.Duration.ofSeconds(_MathUtil.MathUtil.MAX_SAFE_INTEGER, 999999999));
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
	
	
	var Duration = exports.Duration = function (_TemporalAmount) {
	    _inherits(Duration, _TemporalAmount);
	
	    function Duration(seconds, nanos) {
	        _classCallCheck(this, Duration);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Duration).call(this));
	
	        _this._seconds = seconds;
	        _this._nanos = nanos;
	        return _this;
	    }
	
	    _createClass(Duration, [{
	        key: 'get',
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
	    }, {
	        key: 'isZero',
	        value: function isZero() {
	            return (this._seconds | this._nanos) === 0;
	        }
	    }, {
	        key: 'isNegative',
	        value: function isNegative() {
	            return this._seconds < 0;
	        }
	    }, {
	        key: 'seconds',
	        value: function seconds() {
	            return this._seconds;
	        }
	    }, {
	        key: 'nano',
	        value: function nano() {
	            return this._nanos;
	        }
	    }, {
	        key: 'withSeconds',
	        value: function withSeconds(seconds) {
	            return Duration.create(seconds, this._nanos);
	        }
	    }, {
	        key: 'withNanos',
	        value: function withNanos(nanoOfSecond) {
	            _ChronoField.ChronoField.NANO_OF_SECOND.checkValidIntValue(nanoOfSecond);
	            return Duration.create(this._seconds, nanoOfSecond);
	        }
	    }, {
	        key: 'plusDuration',
	        value: function plusDuration(duration) {
	            return this.plus(duration.seconds(), duration.nano());
	        }
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
	    }, {
	        key: 'plusDays',
	        value: function plusDays(daysToAdd) {
	            return this.plusSecondsNanos(_MathUtil.MathUtil.safeMultiply(daysToAdd, _LocalTime.LocalTime.SECONDS_PER_DAY), 0);
	        }
	    }, {
	        key: 'plusHours',
	        value: function plusHours(hoursToAdd) {
	            return this.plusSecondsNanos(_MathUtil.MathUtil.safeMultiply(hoursToAdd, _LocalTime.LocalTime.SECONDS_PER_HOUR), 0);
	        }
	    }, {
	        key: 'plusMinutes',
	        value: function plusMinutes(minutesToAdd) {
	            return this.plusSecondsNanos(_MathUtil.MathUtil.safeMultiply(minutesToAdd, _LocalTime.LocalTime.SECONDS_PER_MINUTE), 0);
	        }
	    }, {
	        key: 'plusSeconds',
	        value: function plusSeconds(secondsToAdd) {
	            return this.plusSecondsNanos(secondsToAdd, 0);
	        }
	    }, {
	        key: 'plusMillis',
	        value: function plusMillis(millisToAdd) {
	            return this.plusSecondsNanos(_MathUtil.MathUtil.intDiv(millisToAdd, 1000), _MathUtil.MathUtil.intMod(millisToAdd, 1000) * 1000000);
	        }
	    }, {
	        key: 'plusNanos',
	        value: function plusNanos(nanosToAdd) {
	            return this.plusSecondsNanos(0, nanosToAdd);
	        }
	    }, {
	        key: 'plusSecondsNanos',
	        value: function plusSecondsNanos(secondsToAdd, nanosToAdd) {
	            if ((secondsToAdd | nanosToAdd) === 0) {
	                return this;
	            }
	            var epochSec = _MathUtil.MathUtil.safeAdd(this._seconds, secondsToAdd);
	            epochSec = _MathUtil.MathUtil.safeAdd(epochSec, _MathUtil.MathUtil.intDiv(nanosToAdd, _LocalTime.LocalTime.NANOS_PER_SECOND));
	            nanosToAdd = _MathUtil.MathUtil.intMod(nanosToAdd, _LocalTime.LocalTime.NANOS_PER_SECOND);
	            var nanoAdjustment = _MathUtil.MathUtil.safeAdd(this._nanos, nanosToAdd);
	            return Duration.ofSeconds(epochSec, nanoAdjustment);
	        }
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
	    }, {
	        key: 'minusAmountUnit',
	        value: function minusAmountUnit(amountToSubtract, unit) {
	            return amountToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusAmountUnit(_MathUtil.MAX_SAFE_INTEGER, unit).plus(1, unit) : this.plusAmountUnit(-amountToSubtract, unit);
	        }
	    }, {
	        key: 'minusDays',
	        value: function minusDays(daysToSubtract) {
	            return daysToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusDays(_MathUtil.MAX_SAFE_INTEGER).plusDays(1) : this.plusDays(-daysToSubtract);
	        }
	    }, {
	        key: 'minusHours',
	        value: function minusHours(hoursToSubtract) {
	            return hoursToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusHours(_MathUtil.MAX_SAFE_INTEGER).plusHours(1) : this.plusHours(-hoursToSubtract);
	        }
	    }, {
	        key: 'minusMinutes',
	        value: function minusMinutes(minutesToSubtract) {
	            return minutesToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusMinutes(_MathUtil.MAX_SAFE_INTEGER).plusMinutes(1) : this.plusMinutes(-minutesToSubtract);
	        }
	    }, {
	        key: 'minusSeconds',
	        value: function minusSeconds(secondsToSubtract) {
	            return secondsToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusSeconds(_MathUtil.MAX_SAFE_INTEGER).plusSeconds(1) : this.plusSeconds(-secondsToSubtract);
	        }
	    }, {
	        key: 'minusMillis',
	        value: function minusMillis(millisToSubtract) {
	            return millisToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusMillis(_MathUtil.MAX_SAFE_INTEGER).plusMillis(1) : this.plusMillis(-millisToSubtract);
	        }
	    }, {
	        key: 'minusNanos',
	        value: function minusNanos(nanosToSubtract) {
	            return nanosToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusNanos(_MathUtil.MAX_SAFE_INTEGER).plusNanos(1) : this.plusNanos(-nanosToSubtract);
	        }
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
	    }, {
	        key: 'toSeconds',
	        value: function toSeconds() {
	            var nanoFloat = _MathUtil.MathUtil.safeMultiply(this._nanos, Math.pow(10, -9));
	            return _MathUtil.MathUtil.safeAdd(this._seconds, nanoFloat);
	        }
	    }, {
	        key: 'negated',
	        value: function negated() {
	            return this.multipliedBy(-1);
	        }
	    }, {
	        key: 'abs',
	        value: function abs() {
	            return this.isNegative() ? this.negated() : this;
	        }
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
	    }, {
	        key: 'toDays',
	        value: function toDays() {
	            return this._seconds / _LocalTime.LocalTime.SECONDS_PER_DAY;
	        }
	    }, {
	        key: 'toHours',
	        value: function toHours() {
	            return this._seconds / _LocalTime.LocalTime.SECONDS_PER_HOUR;
	        }
	    }, {
	        key: 'toMinutes',
	        value: function toMinutes() {
	            return this._seconds / _LocalTime.LocalTime.SECONDS_PER_MINUTE;
	        }
	    }, {
	        key: 'toMillis',
	        value: function toMillis() {
	            var millis = Math.round(_MathUtil.MathUtil.safeMultiply(this._seconds, 1000));
	            millis = _MathUtil.MathUtil.safeAdd(millis, _MathUtil.MathUtil.intDiv(this._nanos, 1000000));
	            return millis;
	        }
	    }, {
	        key: 'toNanos',
	        value: function toNanos() {
	            var totalNanos = _MathUtil.MathUtil.safeMultiply(this._seconds, _LocalTime.LocalTime.NANOS_PER_SECOND);
	            totalNanos = _MathUtil.MathUtil.safeAdd(totalNanos, this._nanos);
	            return totalNanos;
	        }
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
	    }, {
	        key: 'ofHours',
	        value: function ofHours(hours) {
	            return Duration.create(_MathUtil.MathUtil.safeMultiply(hours, _LocalTime.LocalTime.SECONDS_PER_HOUR), 0);
	        }
	    }, {
	        key: 'ofMinutes',
	        value: function ofMinutes(minutes) {
	            return Duration.create(_MathUtil.MathUtil.safeMultiply(minutes, _LocalTime.LocalTime.SECONDS_PER_MINUTE), 0);
	        }
	    }, {
	        key: 'ofSeconds',
	        value: function ofSeconds(seconds) {
	            var nanoAdjustment = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	            var secs = _MathUtil.MathUtil.safeAdd(seconds, _MathUtil.MathUtil.floorDiv(nanoAdjustment, _LocalTime.LocalTime.NANOS_PER_SECOND));
	            var nos = _MathUtil.MathUtil.floorMod(nanoAdjustment, _LocalTime.LocalTime.NANOS_PER_SECOND);
	            return Duration.create(secs, nos);
	        }
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
	    }, {
	        key: 'of',
	        value: function of(amount, unit) {
	            return Duration.ZERO.plus(amount, unit);
	        }
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
	                        var adjustedEnd = endExclusive.with(_ChronoField.ChronoField.NANO_OF_SECOND, startNos);
	                        secs = startInclusive.until(adjustedEnd, _ChronoUnit.ChronoUnit.SECONDS);
	                    }
	                } catch (e) {}
	            }
	            return this.ofSeconds(secs, nanos);
	        }
	    }, {
	        key: 'parse',
	        value: function parse(text) {
	            (0, _assert.requireNonNull)(text, 'text');
	
	            var PATTERN = new RegExp('([-+]?)P(?:([-+]?[0-9]+)D)?(T(?:([-+]?[0-9]+)H)?(?:([-+]?[0-9]+)M)?(?:([-+]?[0-9]+)(?:[.,]([0-9]{0,9}))?S)?)?', 'i');
	            var matches = PATTERN.exec(text);
	            if (matches !== null) {
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
	    }, {
	        key: 'createSecondsNanos',
	        value: function createSecondsNanos() {
	            var seconds = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	            var nanoAdjustment = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	            if ((seconds | nanoAdjustment) === 0) {
	                return Duration.ZERO;
	            }
	
	            if (seconds >= 0) {
	                nanoAdjustment += seconds % 1 * _LocalTime.LocalTime.NANOS_PER_SECOND;
	            } else {
	                nanoAdjustment -= seconds % 1 * _LocalTime.LocalTime.NANOS_PER_SECOND;
	            }
	            seconds = Math.floor(seconds);
	            nanoAdjustment = Math.round(nanoAdjustment);
	
	            return new Duration(seconds, nanoAdjustment);
	        }
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
	}(_TemporalAmount2.TemporalAmount);
	
	function _init() {
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
	
	var _LocalDateTime = __webpack_require__(12);
	
	var _DateTimeFormatter = __webpack_require__(26);
	
	var _ChronoField = __webpack_require__(3);
	
	var _ChronoUnit = __webpack_require__(7);
	
	var _Temporal2 = __webpack_require__(17);
	
	var _TemporalQueries = __webpack_require__(19);
	
	var _TemporalQuery = __webpack_require__(20);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var LocalTime = function (_Temporal) {
	    _inherits(LocalTime, _Temporal);
	
	    _createClass(LocalTime, null, [{
	        key: 'now',
	        value: function now() {
	            var clock = arguments.length <= 0 || arguments[0] === undefined ? _Clock.Clock.systemDefaultZone() : arguments[0];
	
	            (0, _assert.requireNonNull)(clock, 'clock');
	
	            var now = clock.instant();
	            var offset = clock.offset(now);
	            var secsOfDay = _MathUtil.MathUtil.intMod(now.epochSecond(), LocalTime.SECONDS_PER_DAY);
	            secsOfDay = _MathUtil.MathUtil.intMod(secsOfDay + offset.totalSeconds(), LocalTime.SECONDS_PER_DAY);
	            if (secsOfDay < 0) {
	                secsOfDay += LocalTime.SECONDS_PER_DAY;
	            }
	            return LocalTime.ofSecondOfDay(secsOfDay, now.nano());
	        }
	    }, {
	        key: 'of',
	        value: function of(hour, minute, second, nanoOfSecond) {
	            return new LocalTime(hour, minute, second, nanoOfSecond);
	        }
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
	    }, {
	        key: 'from',
	        value: function from(temporal) {
	            (0, _assert.requireNonNull)(temporal, 'temporal');
	            var time = temporal.query(_TemporalQueries.TemporalQueries.localTime());
	            if (time == null) {
	                throw new _errors.DateTimeException('Unable to obtain LocalTime TemporalAccessor: ' + temporal + ', type ' + (temporal.constructor != null ? temporal.constructor.name : ''));
	            }
	            return time;
	        }
	    }, {
	        key: 'parse',
	        value: function parse(text) {
	            var formatter = arguments.length <= 1 || arguments[1] === undefined ? _DateTimeFormatter.DateTimeFormatter.ISO_LOCAL_TIME : arguments[1];
	
	            (0, _assert.requireNonNull)(formatter, 'formatter');
	            return formatter.parse(text, LocalTime.FROM);
	        }
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
	        value: function isSupported(fieldOrUnit) {
	            if (fieldOrUnit instanceof _ChronoField.ChronoField) {
	                return fieldOrUnit.isTimeBased();
	            } else if (fieldOrUnit instanceof _ChronoUnit.ChronoUnit) {
	                return fieldOrUnit.isTimeBased();
	            }
	            return fieldOrUnit != null && fieldOrUnit.isSupportedBy(this);
	        }
	    }, {
	        key: 'range',
	        value: function range(field) {
	            (0, _assert.requireNonNull)(field);
	            return _get(Object.getPrototypeOf(LocalTime.prototype), 'range', this).call(this, field);
	        }
	    }, {
	        key: 'get',
	        value: function get(field) {
	            return this.getLong(field);
	        }
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
	                    return _MathUtil.MathUtil.intMod(this._hour, 12);
	                case _ChronoField.ChronoField.CLOCK_HOUR_OF_AMPM:
	                    var ham = _MathUtil.MathUtil.intMod(this._hour, 12);return ham % 12 === 0 ? 12 : ham;
	                case _ChronoField.ChronoField.HOUR_OF_DAY:
	                    return this._hour;
	                case _ChronoField.ChronoField.CLOCK_HOUR_OF_DAY:
	                    return this._hour === 0 ? 24 : this._hour;
	                case _ChronoField.ChronoField.AMPM_OF_DAY:
	                    return _MathUtil.MathUtil.intDiv(this._hour, 12);
	            }
	            throw new _errors.UnsupportedTemporalTypeException('Unsupported field: ' + field);
	        }
	    }, {
	        key: 'hour',
	        value: function hour() {
	            return this._hour;
	        }
	    }, {
	        key: 'minute',
	        value: function minute() {
	            return this._minute;
	        }
	    }, {
	        key: 'second',
	        value: function second() {
	            return this._second;
	        }
	    }, {
	        key: 'nano',
	        value: function nano() {
	            return this._nano;
	        }
	    }, {
	        key: 'with',
	        value: function _with(adjusterOrField, newValue) {
	            if (arguments.length < 2) {
	                return this.withTemporalAdjuster(adjusterOrField);
	            } else {
	                return this.with2(adjusterOrField, newValue);
	            }
	        }
	    }, {
	        key: 'withTemporalAdjuster',
	        value: function withTemporalAdjuster(adjuster) {
	            (0, _assert.requireNonNull)(adjuster, 'adjuster');
	
	            if (adjuster instanceof LocalTime) {
	                return adjuster;
	            }
	            (0, _assert.assert)(typeof adjuster.adjustInto === 'function', 'adjuster', _errors.IllegalArgumentException);
	            return adjuster.adjustInto(this);
	        }
	    }, {
	        key: 'with2',
	        value: function with2(field, newValue) {
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
	    }, {
	        key: 'withHour',
	        value: function withHour() {
	            var hour = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	            if (this._hour === hour) {
	                return this;
	            }
	            return new LocalTime(hour, this._minute, this._second, this._nano);
	        }
	    }, {
	        key: 'withMinute',
	        value: function withMinute() {
	            var minute = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	            if (this._minute === minute) {
	                return this;
	            }
	            return new LocalTime(this._hour, minute, this._second, this._nano);
	        }
	    }, {
	        key: 'withSecond',
	        value: function withSecond() {
	            var second = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	            if (this._second === second) {
	                return this;
	            }
	            return new LocalTime(this._hour, this._minute, second, this._nano);
	        }
	    }, {
	        key: 'withNano',
	        value: function withNano() {
	            var nanoOfSecond = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	            if (this._nano === nanoOfSecond) {
	                return this;
	            }
	            return new LocalTime(this._hour, this._minute, this._second, nanoOfSecond);
	        }
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
	    }, {
	        key: 'plus',
	        value: function plus(amount, unit) {
	            if (arguments.length < 2) {
	                return this.plus1(amount);
	            } else {
	                return this.plus2(amount, unit);
	            }
	        }
	    }, {
	        key: 'plus1',
	        value: function plus1(amount) {
	            (0, _assert.requireNonNull)(amount, 'amount');
	            return amount.addTo(this);
	        }
	    }, {
	        key: 'plus2',
	        value: function plus2(amountToAdd, unit) {
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
	    }, {
	        key: 'plusHours',
	        value: function plusHours(hoursToAdd) {
	            if (hoursToAdd === 0) {
	                return this;
	            }
	
	            var newHour = _MathUtil.MathUtil.intMod(_MathUtil.MathUtil.intMod(hoursToAdd, LocalTime.HOURS_PER_DAY) + this._hour + LocalTime.HOURS_PER_DAY, LocalTime.HOURS_PER_DAY);
	            return new LocalTime(newHour, this._minute, this._second, this._nano);
	        }
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
	    }, {
	        key: 'minus',
	        value: function minus(amount, unit) {
	            if (arguments.length < 2) {
	                return this.minus1(amount);
	            } else {
	                return this.minus2(amount, unit);
	            }
	        }
	    }, {
	        key: 'minus1',
	        value: function minus1(amount) {
	            (0, _assert.requireNonNull)(amount, 'amount');
	            return amount.subtractFrom(this);
	        }
	    }, {
	        key: 'minus2',
	        value: function minus2(amountToSubtract, unit) {
	            (0, _assert.requireNonNull)(unit, 'unit');
	            return this.plus2(-1 * amountToSubtract, unit);
	        }
	    }, {
	        key: 'minusHours',
	        value: function minusHours(hoursToSubtract) {
	            return this.plusHours(-1 * _MathUtil.MathUtil.intMod(hoursToSubtract, LocalTime.HOURS_PER_DAY));
	        }
	    }, {
	        key: 'minusMinutes',
	        value: function minusMinutes(minutesToSubtract) {
	            return this.plusMinutes(-1 * _MathUtil.MathUtil.intMod(minutesToSubtract, LocalTime.MINUTES_PER_DAY));
	        }
	    }, {
	        key: 'minusSeconds',
	        value: function minusSeconds(secondsToSubtract) {
	            return this.plusSeconds(-1 * _MathUtil.MathUtil.intMod(secondsToSubtract, LocalTime.SECONDS_PER_DAY));
	        }
	    }, {
	        key: 'minusNanos',
	        value: function minusNanos(nanosToSubtract) {
	            return this.plusNanos(-1 * _MathUtil.MathUtil.intMod(nanosToSubtract, LocalTime.NANOS_PER_DAY));
	        }
	    }, {
	        key: 'query',
	        value: function query(_query) {
	            (0, _assert.requireNonNull)(_query, 'query');
	            if (_query === _TemporalQueries.TemporalQueries.precision()) {
	                return _ChronoUnit.ChronoUnit.NANOS;
	            } else if (_query === _TemporalQueries.TemporalQueries.localTime()) {
	                return this;
	            }
	
	            if (_query === _TemporalQueries.TemporalQueries.chronology() || _query === _TemporalQueries.TemporalQueries.zoneId() || _query === _TemporalQueries.TemporalQueries.zone() || _query === _TemporalQueries.TemporalQueries.offset() || _query === _TemporalQueries.TemporalQueries.localDate()) {
	                return null;
	            }
	            return _query.queryFrom(this);
	        }
	    }, {
	        key: 'adjustInto',
	        value: function adjustInto(temporal) {
	            return temporal.with(LocalTime.NANO_OF_DAY, this.toNanoOfDay());
	        }
	    }, {
	        key: 'until',
	        value: function until(endExclusive, unit) {
	            var end = LocalTime.from(endExclusive);
	            if (unit instanceof _ChronoUnit.ChronoUnit) {
	                var nanosUntil = end.toNanoOfDay() - this.toNanoOfDay();
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
	    }, {
	        key: 'atDate',
	        value: function atDate(date) {
	            return _LocalDateTime.LocalDateTime.of(date, this);
	        }
	    }, {
	        key: 'toSecondOfDay',
	        value: function toSecondOfDay() {
	            var total = this._hour * LocalTime.SECONDS_PER_HOUR;
	            total += this._minute * LocalTime.SECONDS_PER_MINUTE;
	            total += this._second;
	            return total;
	        }
	    }, {
	        key: 'toNanoOfDay',
	        value: function toNanoOfDay() {
	            var total = this._hour * LocalTime.NANOS_PER_HOUR;
	            total += this._minute * LocalTime.NANOS_PER_MINUTE;
	            total += this._second * LocalTime.NANOS_PER_SECOND;
	            total += this._nano;
	            return total;
	        }
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
	    }, {
	        key: 'isAfter',
	        value: function isAfter(other) {
	            return this.compareTo(other) > 0;
	        }
	    }, {
	        key: 'isBefore',
	        value: function isBefore(other) {
	            return this.compareTo(other) < 0;
	        }
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
	    }, {
	        key: 'hashCode',
	        value: function hashCode() {
	            var nod = this.toNanoOfDay();
	            return nod ^ nod >>> 24;
	        }
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
	}(_Temporal2.Temporal);
	
	exports.LocalTime = LocalTime;
	function _init() {
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
	        _Temporal2.Temporal.call(localTime);
	        localTime._hour = hour;
	        localTime._minute = minute;
	        localTime._second = second;
	        localTime._nano = nano;
	        return localTime;
	    }
	
	    LocalTime.MIN = LocalTime.HOURS[0];
	
	    LocalTime.MAX = makeLocalTimeConst(23, 59, 59, 999999999);
	
	    LocalTime.MIDNIGHT = LocalTime.HOURS[0];
	
	    LocalTime.NOON = LocalTime.HOURS[12];
	
	    LocalTime.FROM = (0, _TemporalQuery.createTemporalQuery)('LocalTime.FROM', function (temporal) {
	        return LocalTime.from(temporal);
	    });
	
	    LocalTime.HOURS_PER_DAY = 24;
	
	    LocalTime.MINUTES_PER_HOUR = 60;
	
	    LocalTime.MINUTES_PER_DAY = LocalTime.MINUTES_PER_HOUR * LocalTime.HOURS_PER_DAY;
	
	    LocalTime.SECONDS_PER_MINUTE = 60;
	
	    LocalTime.SECONDS_PER_HOUR = LocalTime.SECONDS_PER_MINUTE * LocalTime.MINUTES_PER_HOUR;
	
	    LocalTime.SECONDS_PER_DAY = LocalTime.SECONDS_PER_HOUR * LocalTime.HOURS_PER_DAY;
	
	    LocalTime.MILLIS_PER_DAY = LocalTime.SECONDS_PER_DAY * 1000;
	
	    LocalTime.MICROS_PER_DAY = LocalTime.SECONDS_PER_DAY * 1000000;
	
	    LocalTime.NANOS_PER_SECOND = 1000000000;
	
	    LocalTime.NANOS_PER_MINUTE = LocalTime.NANOS_PER_SECOND * LocalTime.SECONDS_PER_MINUTE;
	
	    LocalTime.NANOS_PER_HOUR = LocalTime.NANOS_PER_MINUTE * LocalTime.MINUTES_PER_HOUR;
	
	    LocalTime.NANOS_PER_DAY = LocalTime.NANOS_PER_HOUR * LocalTime.HOURS_PER_DAY;
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LocalDateTime = undefined;
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports._init = _init;
	
	var _MathUtil = __webpack_require__(4);
	
	var _assert = __webpack_require__(9);
	
	var _errors = __webpack_require__(5);
	
	var _Clock = __webpack_require__(1);
	
	var _LocalDate = __webpack_require__(13);
	
	var _LocalTime = __webpack_require__(11);
	
	var _DateTimeFormatter = __webpack_require__(26);
	
	var _ChronoField = __webpack_require__(3);
	
	var _ChronoUnit = __webpack_require__(7);
	
	var _TemporalQueries = __webpack_require__(19);
	
	var _TemporalQuery = __webpack_require__(20);
	
	var _ChronoLocalDateTime2 = __webpack_require__(36);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var LocalDateTime = function (_ChronoLocalDateTime) {
	    _inherits(LocalDateTime, _ChronoLocalDateTime);
	
	    _createClass(LocalDateTime, null, [{
	        key: 'now',
	        value: function now() {
	            var clock = arguments.length <= 0 || arguments[0] === undefined ? _Clock.Clock.systemDefaultZone() : arguments[0];
	
	            (0, _assert.requireNonNull)(clock, 'clock');
	            var now = clock.instant();
	            var offset = clock.offset(now);
	            return LocalDateTime.ofEpochSecond(now.epochSecond(), now.nano(), offset);
	        }
	    }, {
	        key: 'of',
	        value: function of() {
	            if (arguments.length === 2 && (arguments[0] instanceof _LocalDate.LocalDate || arguments[1] instanceof _LocalTime.LocalTime)) {
	                return LocalDateTime.ofDateAndTime.apply(this, arguments);
	            } else {
	                return LocalDateTime.ofNumbers.apply(this, arguments);
	            }
	        }
	    }, {
	        key: 'ofNumbers',
	        value: function ofNumbers() {
	            var year = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	            var month = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	            var dayOfMonth = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	            var hour = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	            var minute = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
	            var second = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];
	            var nanoOfSecond = arguments.length <= 6 || arguments[6] === undefined ? 0 : arguments[6];
	
	            var date = _LocalDate.LocalDate.of(year, month, dayOfMonth);
	            var time = _LocalTime.LocalTime.of(hour, minute, second, nanoOfSecond);
	            return new LocalDateTime(date, time);
	        }
	    }, {
	        key: 'ofDateAndTime',
	        value: function ofDateAndTime(date, time) {
	            (0, _assert.requireNonNull)(date, 'date');
	            (0, _assert.requireNonNull)(time, 'time');
	            return new LocalDateTime(date, time);
	        }
	    }, {
	        key: 'ofInstant',
	        value: function ofInstant(instant, zone) {
	            (0, _assert.requireNonNull)(instant, 'instant');
	            (0, _assert.requireNonNull)(zone, 'zone');
	            var rules = zone.getRules();
	            var offset = rules.getOffset(instant);
	            return LocalDateTime.ofEpochSecond(instant.epochSecond(), instant.nano(), offset);
	        }
	    }, {
	        key: 'ofEpochSecond',
	        value: function ofEpochSecond() {
	            var epochSecond = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	            var nanoOfSecond = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	            var offset = arguments[2];
	
	            (0, _assert.requireNonNull)(offset, 'offset');
	            var localSecond = epochSecond + offset.totalSeconds();
	            var localEpochDay = _MathUtil.MathUtil.floorDiv(localSecond, _LocalTime.LocalTime.SECONDS_PER_DAY);
	            var secsOfDay = _MathUtil.MathUtil.floorMod(localSecond, _LocalTime.LocalTime.SECONDS_PER_DAY);
	            var date = _LocalDate.LocalDate.ofEpochDay(localEpochDay);
	            var time = _LocalTime.LocalTime.ofSecondOfDay(secsOfDay, nanoOfSecond);
	            return new LocalDateTime(date, time);
	        }
	    }, {
	        key: 'from',
	        value: function from(temporal) {
	            (0, _assert.requireNonNull)(temporal, 'temporal');
	            if (temporal instanceof LocalDateTime) {
	                return temporal;
	            }
	            try {
	                var date = _LocalDate.LocalDate.from(temporal);
	                var time = _LocalTime.LocalTime.from(temporal);
	                return new LocalDateTime(date, time);
	            } catch (ex) {
	                throw new _errors.DateTimeException('Unable to obtain LocalDateTime TemporalAccessor: ' + temporal + ', type ' + (temporal.constructor != null ? temporal.constructor.name : ''));
	            }
	        }
	    }, {
	        key: 'parse',
	        value: function parse(text) {
	            var formatter = arguments.length <= 1 || arguments[1] === undefined ? _DateTimeFormatter.DateTimeFormatter.ISO_LOCAL_DATE_TIME : arguments[1];
	
	            return formatter.parse(text, LocalDateTime.FROM);
	        }
	    }]);
	
	    function LocalDateTime(date, time) {
	        _classCallCheck(this, LocalDateTime);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LocalDateTime).call(this));
	
	        (0, _assert.requireInstance)(date, _LocalDate.LocalDate, 'date');
	        (0, _assert.requireInstance)(time, _LocalTime.LocalTime, 'time');
	        _this._date = date;
	        _this._time = time;
	        return _this;
	    }
	
	    _createClass(LocalDateTime, [{
	        key: '_withDateTime',
	        value: function _withDateTime(newDate, newTime) {
	            if (this._date === newDate && this._time === newTime) {
	                return this;
	            }
	            return new LocalDateTime(newDate, newTime);
	        }
	    }, {
	        key: 'isSupported',
	        value: function isSupported(fieldOrUnit) {
	            if (fieldOrUnit instanceof _ChronoField.ChronoField) {
	                return fieldOrUnit.isDateBased() || fieldOrUnit.isTimeBased();
	            } else if (fieldOrUnit instanceof _ChronoUnit.ChronoUnit) {
	                return fieldOrUnit.isDateBased() || fieldOrUnit.isTimeBased();
	            }
	            return fieldOrUnit != null && fieldOrUnit.isSupportedBy(this);
	        }
	    }, {
	        key: 'range',
	        value: function range(field) {
	            if (field instanceof _ChronoField.ChronoField) {
	                return field.isTimeBased() ? this._time.range(field) : this._date.range(field);
	            }
	            return field.rangeRefinedBy(this);
	        }
	    }, {
	        key: 'get',
	        value: function get(field) {
	            if (field instanceof _ChronoField.ChronoField) {
	                return field.isTimeBased() ? this._time.get(field) : this._date.get(field);
	            }
	            return _get(Object.getPrototypeOf(LocalDateTime.prototype), 'get', this).call(this, field);
	        }
	    }, {
	        key: 'getLong',
	        value: function getLong(field) {
	            (0, _assert.requireNonNull)(field, 'field');
	            if (field instanceof _ChronoField.ChronoField) {
	                return field.isTimeBased() ? this._time.getLong(field) : this._date.getLong(field);
	            }
	            return field.getFrom(this);
	        }
	    }, {
	        key: 'year',
	        value: function year() {
	            return this._date.year();
	        }
	    }, {
	        key: 'monthValue',
	        value: function monthValue() {
	            return this._date.monthValue();
	        }
	    }, {
	        key: 'month',
	        value: function month() {
	            return this._date.month();
	        }
	    }, {
	        key: 'dayOfMonth',
	        value: function dayOfMonth() {
	            return this._date.dayOfMonth();
	        }
	    }, {
	        key: 'dayOfYear',
	        value: function dayOfYear() {
	            return this._date.dayOfYear();
	        }
	    }, {
	        key: 'dayOfWeek',
	        value: function dayOfWeek() {
	            return this._date.dayOfWeek();
	        }
	    }, {
	        key: 'hour',
	        value: function hour() {
	            return this._time.hour();
	        }
	    }, {
	        key: 'minute',
	        value: function minute() {
	            return this._time.minute();
	        }
	    }, {
	        key: 'second',
	        value: function second() {
	            return this._time.second();
	        }
	    }, {
	        key: 'nano',
	        value: function nano() {
	            return this._time.nano();
	        }
	    }, {
	        key: 'with',
	        value: function _with(adjusterOrField, newValue) {
	            if (arguments.length === 1) {
	                return this.withTemporalAdjuster(adjusterOrField);
	            } else {
	                return this.with2(adjusterOrField, newValue);
	            }
	        }
	    }, {
	        key: 'withTemporalAdjuster',
	        value: function withTemporalAdjuster(adjuster) {
	            (0, _assert.requireNonNull)(adjuster, 'adjuster');
	
	            if (adjuster instanceof _LocalDate.LocalDate) {
	                return this._withDateTime(adjuster, this._time);
	            } else if (adjuster instanceof _LocalTime.LocalTime) {
	                return this._withDateTime(this._date, adjuster);
	            } else if (adjuster instanceof LocalDateTime) {
	                return adjuster;
	            }
	            (0, _assert.assert)(typeof adjuster.adjustInto === 'function', 'adjuster', _errors.IllegalArgumentException);
	            return adjuster.adjustInto(this);
	        }
	    }, {
	        key: 'with2',
	        value: function with2(field, newValue) {
	            (0, _assert.requireNonNull)(field, 'field');
	            if (field instanceof _ChronoField.ChronoField) {
	                if (field.isTimeBased()) {
	                    return this._withDateTime(this._date, this._time.with(field, newValue));
	                } else {
	                    return this._withDateTime(this._date.with(field, newValue), this._time);
	                }
	            }
	            return field.adjustInto(this, newValue);
	        }
	    }, {
	        key: 'withYear',
	        value: function withYear(year) {
	            return this._withDateTime(this._date.withYear(year), this._time);
	        }
	    }, {
	        key: 'withMonth',
	        value: function withMonth(month) {
	            return this._withDateTime(this._date.withMonth(month), this._time);
	        }
	    }, {
	        key: 'withDayOfMonth',
	        value: function withDayOfMonth(dayOfMonth) {
	            return this._withDateTime(this._date.withDayOfMonth(dayOfMonth), this._time);
	        }
	    }, {
	        key: 'withDayOfYear',
	        value: function withDayOfYear(dayOfYear) {
	            return this._withDateTime(this._date.withDayOfYear(dayOfYear), this._time);
	        }
	    }, {
	        key: 'withHour',
	        value: function withHour(hour) {
	            var newTime = this._time.withHour(hour);
	            return this._withDateTime(this._date, newTime);
	        }
	    }, {
	        key: 'withMinute',
	        value: function withMinute(minute) {
	            var newTime = this._time.withMinute(minute);
	            return this._withDateTime(this._date, newTime);
	        }
	    }, {
	        key: 'withSecond',
	        value: function withSecond(second) {
	            var newTime = this._time.withSecond(second);
	            return this._withDateTime(this._date, newTime);
	        }
	    }, {
	        key: 'withNano',
	        value: function withNano(nanoOfSecond) {
	            var newTime = this._time.withNano(nanoOfSecond);
	            return this._withDateTime(this._date, newTime);
	        }
	    }, {
	        key: 'truncatedTo',
	        value: function truncatedTo(unit) {
	            return this._withDateTime(this._date, this._time.truncatedTo(unit));
	        }
	    }, {
	        key: 'plus',
	        value: function plus(amount, unit) {
	            if (arguments.length === 1) {
	                return this.plusTemporalAmount(amount);
	            } else {
	                return this.plus2(amount, unit);
	            }
	        }
	    }, {
	        key: 'plusTemporalAmount',
	        value: function plusTemporalAmount(amount) {
	            (0, _assert.requireNonNull)(amount, 'amount');
	            return amount.addTo(this);
	        }
	    }, {
	        key: 'plus2',
	        value: function plus2(amountToAdd, unit) {
	            (0, _assert.requireNonNull)(unit, 'unit');
	            if (unit instanceof _ChronoUnit.ChronoUnit) {
	                switch (unit) {
	                    case _ChronoUnit.ChronoUnit.NANOS:
	                        return this.plusNanos(amountToAdd);
	                    case _ChronoUnit.ChronoUnit.MICROS:
	                        return this.plusDays(_MathUtil.MathUtil.intDiv(amountToAdd, _LocalTime.LocalTime.MICROS_PER_DAY)).plusNanos(_MathUtil.MathUtil.intMod(amountToAdd, _LocalTime.LocalTime.MICROS_PER_DAY) * 1000);
	                    case _ChronoUnit.ChronoUnit.MILLIS:
	                        return this.plusDays(amountToAdd / _LocalTime.LocalTime.MILLIS_PER_DAY).plusNanos(_MathUtil.MathUtil.intMod(amountToAdd, _LocalTime.LocalTime.MILLIS_PER_DAY) * 1000000);
	                    case _ChronoUnit.ChronoUnit.SECONDS:
	                        return this.plusSeconds(amountToAdd);
	                    case _ChronoUnit.ChronoUnit.MINUTES:
	                        return this.plusMinutes(amountToAdd);
	                    case _ChronoUnit.ChronoUnit.HOURS:
	                        return this.plusHours(amountToAdd);
	                    case _ChronoUnit.ChronoUnit.HALF_DAYS:
	                        return this.plusDays(_MathUtil.MathUtil.intDiv(amountToAdd, 256)).plusHours(_MathUtil.MathUtil.intMod(amountToAdd, 256) * 12);}
	                return this._withDateTime(this._date.plus(amountToAdd, unit), this._time);
	            }
	            return unit.addTo(this, amountToAdd);
	        }
	    }, {
	        key: 'plusYears',
	        value: function plusYears(years) {
	            var newDate = this._date.plusYears(years);
	            return this._withDateTime(newDate, this._time);
	        }
	    }, {
	        key: 'plusMonths',
	        value: function plusMonths(months) {
	            var newDate = this._date.plusMonths(months);
	            return this._withDateTime(newDate, this._time);
	        }
	    }, {
	        key: 'plusWeeks',
	        value: function plusWeeks(weeks) {
	            var newDate = this._date.plusWeeks(weeks);
	            return this._withDateTime(newDate, this._time);
	        }
	    }, {
	        key: 'plusDays',
	        value: function plusDays(days) {
	            var newDate = this._date.plusDays(days);
	            return this._withDateTime(newDate, this._time);
	        }
	    }, {
	        key: 'plusHours',
	        value: function plusHours(hours) {
	            return this._plusWithOverflow(this._date, hours, 0, 0, 0, 1);
	        }
	    }, {
	        key: 'plusMinutes',
	        value: function plusMinutes(minutes) {
	            return this._plusWithOverflow(this._date, 0, minutes, 0, 0, 1);
	        }
	    }, {
	        key: 'plusSeconds',
	        value: function plusSeconds(seconds) {
	            return this._plusWithOverflow(this._date, 0, 0, seconds, 0, 1);
	        }
	    }, {
	        key: 'plusNanos',
	        value: function plusNanos(nanos) {
	            return this._plusWithOverflow(this._date, 0, 0, 0, nanos, 1);
	        }
	    }, {
	        key: 'minus',
	        value: function minus(amount, unit) {
	            if (arguments.length === 1) {
	                return this.minusTemporalAmount(amount);
	            } else {
	                return this.minus2(amount, unit);
	            }
	        }
	    }, {
	        key: 'minusTemporalAmount',
	        value: function minusTemporalAmount(amount) {
	            (0, _assert.requireNonNull)(amount, 'amount');
	            return amount.subtractFrom(this);
	        }
	    }, {
	        key: 'minus2',
	        value: function minus2(amountToSubtract, unit) {
	            (0, _assert.requireNonNull)(unit, 'unit');
	            return this.plus2(-1 * amountToSubtract, unit);
	        }
	    }, {
	        key: 'minusYears',
	        value: function minusYears(years) {
	            return this.plusYears(-1 * years);
	        }
	    }, {
	        key: 'minusMonths',
	        value: function minusMonths(months) {
	            return this.plusMonths(-1 * months);
	        }
	    }, {
	        key: 'minusWeeks',
	        value: function minusWeeks(weeks) {
	            return this.plusWeeks(-1 * weeks);
	        }
	    }, {
	        key: 'minusDays',
	        value: function minusDays(days) {
	            return this.plusDays(-1 * days);
	        }
	    }, {
	        key: 'minusHours',
	        value: function minusHours(hours) {
	            return this._plusWithOverflow(this._date, hours, 0, 0, 0, -1);
	        }
	    }, {
	        key: 'minusMinutes',
	        value: function minusMinutes(minutes) {
	            return this._plusWithOverflow(this._date, 0, minutes, 0, 0, -1);
	        }
	    }, {
	        key: 'minusSeconds',
	        value: function minusSeconds(seconds) {
	            return this._plusWithOverflow(this._date, 0, 0, seconds, 0, -1);
	        }
	    }, {
	        key: 'minusNanos',
	        value: function minusNanos(nanos) {
	            return this._plusWithOverflow(this._date, 0, 0, 0, nanos, -1);
	        }
	    }, {
	        key: '_plusWithOverflow',
	        value: function _plusWithOverflow(newDate, hours, minutes, seconds, nanos, sign) {
	            if ((hours | minutes | seconds | nanos) === 0) {
	                return this._withDateTime(newDate, this._time);
	            }
	            var totDays = _MathUtil.MathUtil.intDiv(nanos, _LocalTime.LocalTime.NANOS_PER_DAY) + _MathUtil.MathUtil.intDiv(seconds, _LocalTime.LocalTime.SECONDS_PER_DAY) + _MathUtil.MathUtil.intDiv(minutes, _LocalTime.LocalTime.MINUTES_PER_DAY) + _MathUtil.MathUtil.intDiv(hours, _LocalTime.LocalTime.HOURS_PER_DAY);
	            totDays *= sign;
	            var totNanos = _MathUtil.MathUtil.intMod(nanos, _LocalTime.LocalTime.NANOS_PER_DAY) + _MathUtil.MathUtil.intMod(seconds, _LocalTime.LocalTime.SECONDS_PER_DAY) * _LocalTime.LocalTime.NANOS_PER_SECOND + _MathUtil.MathUtil.intMod(minutes, _LocalTime.LocalTime.MINUTES_PER_DAY) * _LocalTime.LocalTime.NANOS_PER_MINUTE + _MathUtil.MathUtil.intMod(hours, _LocalTime.LocalTime.HOURS_PER_DAY) * _LocalTime.LocalTime.NANOS_PER_HOUR;
	            var curNoD = this._time.toNanoOfDay();
	            totNanos = totNanos * sign + curNoD;
	            totDays += _MathUtil.MathUtil.floorDiv(totNanos, _LocalTime.LocalTime.NANOS_PER_DAY);
	            var newNoD = _MathUtil.MathUtil.floorMod(totNanos, _LocalTime.LocalTime.NANOS_PER_DAY);
	            var newTime = newNoD === curNoD ? this._time : _LocalTime.LocalTime.ofNanoOfDay(newNoD);
	            return this._withDateTime(newDate.plusDays(totDays), newTime);
	        }
	    }, {
	        key: 'query',
	        value: function query(_query) {
	            (0, _assert.requireNonNull)(_query, 'query');
	            if (_query === _TemporalQueries.TemporalQueries.localDate()) {
	                return this.toLocalDate();
	            }
	            return _get(Object.getPrototypeOf(LocalDateTime.prototype), 'query', this).call(this, _query);
	        }
	    }, {
	        key: 'adjustInto',
	        value: function adjustInto(temporal) {
	            return _get(Object.getPrototypeOf(LocalDateTime.prototype), 'adjustInto', this).call(this, temporal);
	        }
	    }, {
	        key: 'until',
	        value: function until(endExclusive, unit) {
	            (0, _assert.requireNonNull)(endExclusive, 'endExclusive');
	            (0, _assert.requireNonNull)(unit, 'unit');
	            var end = LocalDateTime.from(endExclusive);
	            if (unit instanceof _ChronoUnit.ChronoUnit) {
	                if (unit.isTimeBased()) {
	                    var daysUntil = this._date.daysUntil(end._date);
	                    var timeUntil = end._time.toNanoOfDay() - this._time.toNanoOfDay();
	                    if (daysUntil > 0 && timeUntil < 0) {
	                        daysUntil--;
	                        timeUntil += _LocalTime.LocalTime.NANOS_PER_DAY;
	                    } else if (daysUntil < 0 && timeUntil > 0) {
	                        daysUntil++;
	                        timeUntil -= _LocalTime.LocalTime.NANOS_PER_DAY;
	                    }
	                    var amount = daysUntil;
	                    switch (unit) {
	                        case _ChronoUnit.ChronoUnit.NANOS:
	                            amount = _MathUtil.MathUtil.safeMultiply(amount, _LocalTime.LocalTime.NANOS_PER_DAY);
	                            return _MathUtil.MathUtil.safeAdd(amount, timeUntil);
	                        case _ChronoUnit.ChronoUnit.MICROS:
	                            amount = _MathUtil.MathUtil.safeMultiply(amount, _LocalTime.LocalTime.MICROS_PER_DAY);
	                            return _MathUtil.MathUtil.safeAdd(amount, _MathUtil.MathUtil.intDiv(timeUntil, 1000));
	                        case _ChronoUnit.ChronoUnit.MILLIS:
	                            amount = _MathUtil.MathUtil.safeMultiply(amount, _LocalTime.LocalTime.MILLIS_PER_DAY);
	                            return _MathUtil.MathUtil.safeAdd(amount, _MathUtil.MathUtil.intDiv(timeUntil, 1000000));
	                        case _ChronoUnit.ChronoUnit.SECONDS:
	                            amount = _MathUtil.MathUtil.safeMultiply(amount, _LocalTime.LocalTime.SECONDS_PER_DAY);
	                            return _MathUtil.MathUtil.safeAdd(amount, _MathUtil.MathUtil.intDiv(timeUntil, _LocalTime.LocalTime.NANOS_PER_SECOND));
	                        case _ChronoUnit.ChronoUnit.MINUTES:
	                            amount = _MathUtil.MathUtil.safeMultiply(amount, _LocalTime.LocalTime.MINUTES_PER_DAY);
	                            return _MathUtil.MathUtil.safeAdd(amount, _MathUtil.MathUtil.intDiv(timeUntil, _LocalTime.LocalTime.NANOS_PER_MINUTE));
	                        case _ChronoUnit.ChronoUnit.HOURS:
	                            amount = _MathUtil.MathUtil.safeMultiply(amount, _LocalTime.LocalTime.HOURS_PER_DAY);
	                            return _MathUtil.MathUtil.safeAdd(amount, _MathUtil.MathUtil.intDiv(timeUntil, _LocalTime.LocalTime.NANOS_PER_HOUR));
	                        case _ChronoUnit.ChronoUnit.HALF_DAYS:
	                            amount = _MathUtil.MathUtil.safeMultiply(amount, 2);
	                            return _MathUtil.MathUtil.safeAdd(amount, _MathUtil.MathUtil.intDiv(timeUntil, _LocalTime.LocalTime.NANOS_PER_HOUR * 12));
	                    }
	                    throw new _errors.UnsupportedTemporalTypeException('Unsupported unit: ' + unit);
	                }
	                var endDate = end._date;
	                var endTime = end._time;
	                if (endDate.isAfter(this._date) && endTime.isBefore(this._time)) {
	                    endDate = endDate.minusDays(1);
	                } else if (endDate.isBefore(this._date) && endTime.isAfter(this._time)) {
	                    endDate = endDate.plusDays(1);
	                }
	                return this._date.until(endDate, unit);
	            }
	            return unit.between(this, end);
	        }
	    }, {
	        key: 'toLocalDate',
	        value: function toLocalDate() {
	            return this._date;
	        }
	    }, {
	        key: 'toLocalTime',
	        value: function toLocalTime() {
	            return this._time;
	        }
	    }, {
	        key: 'compareTo',
	        value: function compareTo(other) {
	            (0, _assert.requireNonNull)(other, 'other');
	            (0, _assert.requireInstance)(other, LocalDateTime, 'other');
	            return this._compareTo0(other);
	        }
	    }, {
	        key: '_compareTo0',
	        value: function _compareTo0(other) {
	            var cmp = this._date.compareTo(other.toLocalDate());
	            if (cmp === 0) {
	                cmp = this._time.compareTo(other.toLocalTime());
	            }
	            return cmp;
	        }
	    }, {
	        key: 'isAfter',
	        value: function isAfter(other) {
	            (0, _assert.requireNonNull)(other, 'other');
	            (0, _assert.requireInstance)(other, LocalDateTime, 'other');
	            return this._compareTo0(other) > 0;
	        }
	    }, {
	        key: 'isBefore',
	        value: function isBefore(other) {
	            (0, _assert.requireNonNull)(other, 'other');
	            (0, _assert.requireInstance)(other, LocalDateTime, 'other');
	            return this._compareTo0(other) < 0;
	        }
	    }, {
	        key: 'isEqual',
	        value: function isEqual(other) {
	            if (other instanceof LocalDateTime) {
	                return this._compareTo0(other) === 0;
	            }
	            return _get(Object.getPrototypeOf(LocalDateTime.prototype), 'isEqual', this).call(this, other);
	        }
	    }, {
	        key: 'equals',
	        value: function equals(other) {
	            if (this === other) {
	                return true;
	            }
	            if (other instanceof LocalDateTime) {
	                return this._date.equals(other._date) && this._time.equals(other._time);
	            }
	            return false;
	        }
	    }, {
	        key: 'hashCode',
	        value: function hashCode() {
	            return this._date.hashCode() ^ this._time.hashCode();
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return this._date.toString() + 'T' + this._time.toString();
	        }
	    }, {
	        key: 'format',
	        value: function format(formatter) {
	            (0, _assert.requireNonNull)(formatter, 'formatter');
	            return formatter.format(this);
	        }
	    }]);
	
	    return LocalDateTime;
	}(_ChronoLocalDateTime2.ChronoLocalDateTime);
	
	exports.LocalDateTime = LocalDateTime;
	function _init() {
	    LocalDateTime.MIN = LocalDateTime.of(_LocalDate.LocalDate.MIN, _LocalTime.LocalTime.MIN);
	
	    LocalDateTime.MAX = LocalDateTime.of(_LocalDate.LocalDate.MAX, _LocalTime.LocalTime.MAX);
	
	    LocalDateTime.FROM = (0, _TemporalQuery.createTemporalQuery)('LocalDateTime.FROM', function (temporal) {
	        return LocalDateTime.from(temporal);
	    });
	}

/***/ },
/* 13 */
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
	
	var _IsoChronology = __webpack_require__(14);
	
	var _ChronoField = __webpack_require__(3);
	
	var _ChronoUnit = __webpack_require__(7);
	
	var _ChronoLocalDate2 = __webpack_require__(24);
	
	var _TemporalQueries = __webpack_require__(19);
	
	var _TemporalQuery = __webpack_require__(20);
	
	var _ValueRange = __webpack_require__(25);
	
	var _DateTimeFormatter = __webpack_require__(26);
	
	var _Clock = __webpack_require__(1);
	
	var _DayOfWeek = __webpack_require__(35);
	
	var _Month = __webpack_require__(16);
	
	var _Period = __webpack_require__(31);
	
	var _Year = __webpack_require__(22);
	
	var _LocalTime = __webpack_require__(11);
	
	var _LocalDateTime = __webpack_require__(12);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
	var DAYS_PER_CYCLE = 146097;
	
	var DAYS_0000_TO_1970 = DAYS_PER_CYCLE * 5 - (30 * 365 + 7);
	
	var LocalDate = function (_ChronoLocalDate) {
	    _inherits(LocalDate, _ChronoLocalDate);
	
	    _createClass(LocalDate, null, [{
	        key: 'now',
	        value: function now() {
	            var clock = arguments.length <= 0 || arguments[0] === undefined ? _Clock.Clock.systemDefaultZone() : arguments[0];
	
	            (0, _assert.assert)(clock != null, 'clock', _errors.NullPointerException);
	            var now = clock.instant();
	            var offset = clock.offset(now);
	            var epochSec = now.epochSecond() + offset.totalSeconds();
	            var epochDay = _MathUtil.MathUtil.floorDiv(epochSec, _LocalTime.LocalTime.SECONDS_PER_DAY);
	            return LocalDate.ofEpochDay(epochDay);
	        }
	    }, {
	        key: 'of',
	        value: function of(year, month, dayOfMonth) {
	            return new LocalDate(year, month, dayOfMonth);
	        }
	    }, {
	        key: 'ofYearDay',
	        value: function ofYearDay(year, dayOfYear) {
	            _ChronoField.ChronoField.YEAR.checkValidValue(year);
	
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
	        key: 'ofEpochDay',
	        value: function ofEpochDay() {
	            var epochDay = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
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
	    }, {
	        key: 'from',
	        value: function from(temporal) {
	            (0, _assert.requireNonNull)(temporal, 'temporal');
	            var date = temporal.query(_TemporalQueries.TemporalQueries.localDate());
	            if (date == null) {
	                throw new _errors.DateTimeException('Unable to obtain LocalDate from TemporalAccessor: ' + temporal + ', type ' + (temporal.constructor != null ? temporal.constructor.name : ''));
	            }
	            return date;
	        }
	    }, {
	        key: 'parse',
	        value: function parse(text) {
	            var formatter = arguments.length <= 1 || arguments[1] === undefined ? _DateTimeFormatter.DateTimeFormatter.ISO_LOCAL_DATE : arguments[1];
	
	            (0, _assert.assert)(formatter != null, 'formatter', _errors.NullPointerException);
	            return formatter.parse(text, LocalDate.FROM);
	        }
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
	    }]);
	
	    function LocalDate(year, month, dayOfMonth) {
	        _classCallCheck(this, LocalDate);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LocalDate).call(this));
	
	        if (month instanceof _Month.Month) {
	            month = month.value();
	        }
	        LocalDate._validate(year, month, dayOfMonth);
	        _this._year = _MathUtil.MathUtil.safeZero(year);
	        _this._month = _MathUtil.MathUtil.safeZero(month);
	        _this._day = _MathUtil.MathUtil.safeZero(dayOfMonth);
	        return _this;
	    }
	
	    _createClass(LocalDate, [{
	        key: 'isSupported',
	        value: function isSupported(field) {
	            return _get(Object.getPrototypeOf(LocalDate.prototype), 'isSupported', this).call(this, field);
	        }
	    }, {
	        key: 'range',
	        value: function range(field) {
	            if (field instanceof _ChronoField.ChronoField) {
	                if (field.isDateBased()) {
	                    switch (field) {
	                        case _ChronoField.ChronoField.DAY_OF_MONTH:
	                            return _ValueRange.ValueRange.of(1, this.lengthOfMonth());
	                        case _ChronoField.ChronoField.DAY_OF_YEAR:
	                            return _ValueRange.ValueRange.of(1, this.lengthOfYear());
	                        case _ChronoField.ChronoField.ALIGNED_WEEK_OF_MONTH:
	                            return _ValueRange.ValueRange.of(1, this.month() === _Month.Month.FEBRUARY && this.isLeapYear() === false ? 4 : 5);
	                        case _ChronoField.ChronoField.YEAR_OF_ERA:
	                            return this._year <= 0 ? _ValueRange.ValueRange.of(1, _Year.Year.MAX_VALUE + 1) : _ValueRange.ValueRange.of(1, _Year.Year.MAX_VALUE);
	                    }
	                    return field.range();
	                }
	                throw new _errors.UnsupportedTemporalTypeException('Unsupported field: ' + field);
	            }
	            return field.rangeRefinedBy(this);
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
	                    return _MathUtil.MathUtil.intMod(this._day - 1, 7) + 1;
	                case _ChronoField.ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR:
	                    return _MathUtil.MathUtil.intMod(this.dayOfYear() - 1, 7) + 1;
	                case _ChronoField.ChronoField.DAY_OF_MONTH:
	                    return this._day;
	                case _ChronoField.ChronoField.DAY_OF_YEAR:
	                    return this.dayOfYear();
	                case _ChronoField.ChronoField.EPOCH_DAY:
	                    return this.toEpochDay();
	                case _ChronoField.ChronoField.ALIGNED_WEEK_OF_MONTH:
	                    return _MathUtil.MathUtil.intDiv(this._day - 1, 7) + 1;
	                case _ChronoField.ChronoField.ALIGNED_WEEK_OF_YEAR:
	                    return _MathUtil.MathUtil.intDiv(this.dayOfYear() - 1, 7) + 1;
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
	    }, {
	        key: 'chronology',
	        value: function chronology() {
	            return _IsoChronology.IsoChronology.INSTANCE;
	        }
	    }, {
	        key: 'year',
	        value: function year() {
	            return this._year;
	        }
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
	    }, {
	        key: 'dayOfMonth',
	        value: function dayOfMonth() {
	            return this._day;
	        }
	    }, {
	        key: 'dayOfYear',
	        value: function dayOfYear() {
	            return this.month().firstDayOfYear(this.isLeapYear()) + this._day - 1;
	        }
	    }, {
	        key: 'dayOfWeek',
	        value: function dayOfWeek() {
	            var dow0 = _MathUtil.MathUtil.floorMod(this.toEpochDay() + 3, 7);
	            return _DayOfWeek.DayOfWeek.of(dow0 + 1);
	        }
	    }, {
	        key: 'isLeapYear',
	        value: function isLeapYear() {
	            return _IsoChronology.IsoChronology.isLeapYear(this._year);
	        }
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
	    }, {
	        key: 'lengthOfYear',
	        value: function lengthOfYear() {
	            return this.isLeapYear() ? 366 : 365;
	        }
	    }, {
	        key: 'with',
	        value: function _with(fieldOrAdjuster, newValue) {
	            if (arguments.length < 2) {
	                return this.withTemporalAdjuster(fieldOrAdjuster);
	            } else {
	                return this.withFieldAndValue(fieldOrAdjuster, newValue);
	            }
	        }
	    }, {
	        key: 'withTemporalAdjuster',
	        value: function withTemporalAdjuster(adjuster) {
	            (0, _assert.requireNonNull)(adjuster, 'adjuster');
	
	            if (adjuster instanceof LocalDate) {
	                return adjuster;
	            }
	            (0, _assert.assert)(typeof adjuster.adjustInto === 'function', 'adjuster', _errors.IllegalArgumentException);
	            return adjuster.adjustInto(this);
	        }
	    }, {
	        key: 'withFieldAndValue',
	        value: function withFieldAndValue(field, newValue) {
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
	    }, {
	        key: 'withYear',
	        value: function withYear(year) {
	            if (this._year === year) {
	                return this;
	            }
	            _ChronoField.ChronoField.YEAR.checkValidValue(year);
	            return LocalDate._resolvePreviousValid(year, this._month, this._day);
	        }
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
	    }, {
	        key: 'withDayOfMonth',
	        value: function withDayOfMonth(dayOfMonth) {
	            if (this._day === dayOfMonth) {
	                return this;
	            }
	            return LocalDate.of(this._year, this._month, dayOfMonth);
	        }
	    }, {
	        key: 'withDayOfYear',
	        value: function withDayOfYear(dayOfYear) {
	            if (this.dayOfYear() === dayOfYear) {
	                return this;
	            }
	            return LocalDate.ofYearDay(this._year, dayOfYear);
	        }
	    }, {
	        key: 'plus',
	        value: function plus(p1, p2) {
	            if (arguments.length < 2) {
	                return this.plus1(p1);
	            } else {
	                return this.plus2(p1, p2);
	            }
	        }
	    }, {
	        key: 'plus1',
	        value: function plus1(amount) {
	            (0, _assert.requireNonNull)(amount, 'amount');
	            return amount.addTo(this);
	        }
	    }, {
	        key: 'plus2',
	        value: function plus2(amountToAdd, unit) {
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
	    }, {
	        key: 'plusYears',
	        value: function plusYears(yearsToAdd) {
	            if (yearsToAdd === 0) {
	                return this;
	            }
	            var newYear = _ChronoField.ChronoField.YEAR.checkValidIntValue(this._year + yearsToAdd);
	            return LocalDate._resolvePreviousValid(newYear, this._month, this._day);
	        }
	    }, {
	        key: 'plusMonths',
	        value: function plusMonths(monthsToAdd) {
	            if (monthsToAdd === 0) {
	                return this;
	            }
	            var monthCount = this._year * 12 + (this._month - 1);
	            var calcMonths = monthCount + monthsToAdd;
	            var newYear = _ChronoField.ChronoField.YEAR.checkValidIntValue(_MathUtil.MathUtil.floorDiv(calcMonths, 12));
	            var newMonth = _MathUtil.MathUtil.floorMod(calcMonths, 12) + 1;
	            return LocalDate._resolvePreviousValid(newYear, newMonth, this._day);
	        }
	    }, {
	        key: 'plusWeeks',
	        value: function plusWeeks(weeksToAdd) {
	            return this.plusDays(_MathUtil.MathUtil.safeMultiply(weeksToAdd, 7));
	        }
	    }, {
	        key: 'plusDays',
	        value: function plusDays(daysToAdd) {
	            if (daysToAdd === 0) {
	                return this;
	            }
	            var mjDay = _MathUtil.MathUtil.safeAdd(this.toEpochDay(), daysToAdd);
	            return LocalDate.ofEpochDay(mjDay);
	        }
	    }, {
	        key: 'minus',
	        value: function minus(p1, p2) {
	            if (arguments.length < 2) {
	                return this.minus1(p1);
	            } else {
	                return this.minus2(p1, p2);
	            }
	        }
	    }, {
	        key: 'minus1',
	        value: function minus1(amount) {
	            (0, _assert.requireNonNull)(amount, 'amount');
	            return amount.subtractFrom(this);
	        }
	    }, {
	        key: 'minus2',
	        value: function minus2(amountToSubtract, unit) {
	            (0, _assert.requireNonNull)(amountToSubtract, 'amountToSubtract');
	            (0, _assert.requireNonNull)(unit, 'unit');
	            return this.plus2(-1 * amountToSubtract, unit);
	        }
	    }, {
	        key: 'minusYears',
	        value: function minusYears(yearsToSubtract) {
	            return this.plusYears(yearsToSubtract * -1);
	        }
	    }, {
	        key: 'minusMonths',
	        value: function minusMonths(monthsToSubtract) {
	            return this.plusMonths(monthsToSubtract * -1);
	        }
	    }, {
	        key: 'minusWeeks',
	        value: function minusWeeks(weeksToSubtract) {
	            return this.plusWeeks(weeksToSubtract * -1);
	        }
	    }, {
	        key: 'minusDays',
	        value: function minusDays(daysToSubtract) {
	            return this.plusDays(daysToSubtract * -1);
	        }
	    }, {
	        key: 'query',
	        value: function query(_query) {
	            (0, _assert.requireNonNull)(_query, 'query');
	            if (_query === _TemporalQueries.TemporalQueries.localDate()) {
	                return this;
	            }
	            return _get(Object.getPrototypeOf(LocalDate.prototype), 'query', this).call(this, _query);
	        }
	    }, {
	        key: 'adjustInto',
	        value: function adjustInto(temporal) {
	            return _get(Object.getPrototypeOf(LocalDate.prototype), 'adjustInto', this).call(this, temporal);
	        }
	    }, {
	        key: 'until',
	        value: function until(p1, p2) {
	            if (arguments.length < 2) {
	                return this.until1(p1);
	            } else {
	                return this.until2(p1, p2);
	            }
	        }
	    }, {
	        key: 'until2',
	        value: function until2(endExclusive, unit) {
	            var end = LocalDate.from(endExclusive);
	            if (unit instanceof _ChronoUnit.ChronoUnit) {
	                switch (unit) {
	                    case _ChronoUnit.ChronoUnit.DAYS:
	                        return this.daysUntil(end);
	                    case _ChronoUnit.ChronoUnit.WEEKS:
	                        return _MathUtil.MathUtil.intDiv(this.daysUntil(end), 7);
	                    case _ChronoUnit.ChronoUnit.MONTHS:
	                        return this._monthsUntil(end);
	                    case _ChronoUnit.ChronoUnit.YEARS:
	                        return _MathUtil.MathUtil.intDiv(this._monthsUntil(end), 12);
	                    case _ChronoUnit.ChronoUnit.DECADES:
	                        return _MathUtil.MathUtil.intDiv(this._monthsUntil(end), 120);
	                    case _ChronoUnit.ChronoUnit.CENTURIES:
	                        return _MathUtil.MathUtil.intDiv(this._monthsUntil(end), 1200);
	                    case _ChronoUnit.ChronoUnit.MILLENNIA:
	                        return _MathUtil.MathUtil.intDiv(this._monthsUntil(end), 12000);
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
	            return end.toEpochDay() - this.toEpochDay();
	        }
	    }, {
	        key: '_monthsUntil',
	        value: function _monthsUntil(end) {
	            var packed1 = this._prolepticMonth() * 32 + this.dayOfMonth();
	            var packed2 = end._prolepticMonth() * 32 + end.dayOfMonth();
	            return _MathUtil.MathUtil.intDiv(packed2 - packed1, 32);
	        }
	    }, {
	        key: 'until1',
	        value: function until1(endDate) {
	            var end = LocalDate.from(endDate);
	            var totalMonths = end._prolepticMonth() - this._prolepticMonth();
	            var days = end._day - this._day;
	            if (totalMonths > 0 && days < 0) {
	                totalMonths--;
	                var calcDate = this.plusMonths(totalMonths);
	                days = end.toEpochDay() - calcDate.toEpochDay();
	            } else if (totalMonths < 0 && days > 0) {
	                    totalMonths++;
	                    days -= end.lengthOfMonth();
	                }
	            var years = _MathUtil.MathUtil.intDiv(totalMonths, 12);
	            var months = _MathUtil.MathUtil.intMod(totalMonths, 12);
	            return _Period.Period.of(_MathUtil.MathUtil.safeToInt(years), months, days);
	        }
	    }, {
	        key: 'atTime',
	        value: function atTime() {
	            if (arguments.length === 1) {
	                return this.atTime1.apply(this, arguments);
	            } else {
	                return this.atTime4.apply(this, arguments);
	            }
	        }
	    }, {
	        key: 'atTime1',
	        value: function atTime1(time) {
	            return _LocalDateTime.LocalDateTime.of(this, time);
	        }
	    }, {
	        key: 'atTime4',
	        value: function atTime4(hour, minute) {
	            var second = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	            var nanoOfSecond = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	
	            return this.atTime1(_LocalTime.LocalTime.of(hour, minute, second, nanoOfSecond));
	        }
	    }, {
	        key: 'atStartOfDay',
	        value: function atStartOfDay() {
	            return _LocalDateTime.LocalDateTime.of(this, _LocalTime.LocalTime.MIDNIGHT);
	        }
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
	    }, {
	        key: 'compareTo',
	        value: function compareTo(other) {
	            (0, _assert.requireNonNull)(other, 'other');
	            (0, _assert.requireInstance)(other, LocalDate, 'other');
	            if (other instanceof LocalDate) {
	                return this._compareTo0(other);
	            }
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
	    }, {
	        key: 'isAfter',
	        value: function isAfter(other) {
	            return this.compareTo(other) > 0;
	        }
	    }, {
	        key: 'isBefore',
	        value: function isBefore(other) {
	            return this.compareTo(other) < 0;
	        }
	    }, {
	        key: 'isEqual',
	        value: function isEqual(other) {
	            return this.compareTo(other) === 0;
	        }
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
	    }, {
	        key: 'hashCode',
	        value: function hashCode() {
	            var yearValue = this._year;
	            var monthValue = this._month;
	            var dayValue = this._day;
	            return yearValue & 0xFFFFF800 ^ (yearValue << 11) + (monthValue << 6) + dayValue;
	        }
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
	    LocalDate.MIN = LocalDate.of(_Year.Year.MIN_VALUE, 1, 1);
	
	    LocalDate.MAX = LocalDate.of(_Year.Year.MAX_VALUE, 12, 31);
	
	    LocalDate.FROM = (0, _TemporalQuery.createTemporalQuery)('LocalDate.FROM', function (temporal) {
	        return LocalDate.from(temporal);
	    });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.IsoChronology = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports._init = _init;
	
	var _Enum2 = __webpack_require__(15);
	
	var _LocalDate = __webpack_require__(13);
	
	var _Month = __webpack_require__(16);
	
	var _Year = __webpack_require__(22);
	
	var _ChronoField = __webpack_require__(3);
	
	var _ResolverStyle = __webpack_require__(23);
	
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
	                }
	            }
	            return null;
	        }
	    }], [{
	        key: 'isLeapYear',
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
/* 15 */
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
/* 16 */
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
	
	var _MathUtil = __webpack_require__(4);
	
	var _ChronoField = __webpack_require__(3);
	
	var _ChronoUnit = __webpack_require__(7);
	
	var _errors = __webpack_require__(5);
	
	var _IsoChronology = __webpack_require__(14);
	
	var _Temporal2 = __webpack_require__(17);
	
	var _TemporalQueries = __webpack_require__(19);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var Month = function (_Temporal) {
	    _inherits(Month, _Temporal);
	
	    function Month(value) {
	        _classCallCheck(this, Month);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Month).call(this));
	
	        _this._value = value;
	        return _this;
	    }
	
	    _createClass(Month, [{
	        key: 'value',
	        value: function value() {
	            return this._value;
	        }
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
	    }, {
	        key: 'get',
	        value: function get(field) {
	            if (field === _ChronoField.ChronoField.MONTH_OF_YEAR) {
	                return this.value();
	            }
	            return this.range(field).checkValidIntValue(this.getLong(field), field);
	        }
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
	    }, {
	        key: 'plus',
	        value: function plus(months) {
	            var amount = _MathUtil.MathUtil.intMod(months, 12) + 12;
	            var newMonthVal = _MathUtil.MathUtil.intMod(this.value() + amount, 12);
	
	            newMonthVal = newMonthVal === 0 ? 12 : newMonthVal;
	            return Month.of(newMonthVal);
	        }
	    }, {
	        key: 'minus',
	        value: function minus(months) {
	            return this.plus(-1 * _MathUtil.MathUtil.intMod(months, 12));
	        }
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
	    }], [{
	        key: 'values',
	        value: function values() {
	            return MONTHS.slice();
	        }
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
	}(_Temporal2.Temporal);
	
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Temporal = undefined;
	
	var _TemporalAccessor2 = __webpack_require__(18);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var Temporal = exports.Temporal = function (_TemporalAccessor) {
	  _inherits(Temporal, _TemporalAccessor);

	  function Temporal() {
	    _classCallCheck(this, Temporal);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Temporal).apply(this, arguments));
	  }

	  return Temporal;
	}(_TemporalAccessor2.TemporalAccessor);

/***/ },
/* 18 */
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
	
	var _TemporalQueries = __webpack_require__(19);
	
	var _errors = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TemporalAccessor = function () {
	    function TemporalAccessor() {
	        _classCallCheck(this, TemporalAccessor);
	    }
	
	    _createClass(TemporalAccessor, [{
	        key: 'query',
	        value: function query(_query) {
	            if (_query === _TemporalQueries.TemporalQueries.zoneId() || _query === _TemporalQueries.TemporalQueries.chronology() || _query === _TemporalQueries.TemporalQueries.precision()) {
	                return null;
	            }
	            return _query.queryFrom(this);
	        }
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
/* 19 */
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
	
	exports._init = _init;
	
	var _ChronoField = __webpack_require__(3);
	
	var _TemporalQuery = __webpack_require__(20);
	
	var _LocalDate = __webpack_require__(13);
	
	var _LocalTime = __webpack_require__(11);
	
	var _ZoneOffset = __webpack_require__(21);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TemporalQueries = exports.TemporalQueries = function () {
	    function TemporalQueries() {
	        _classCallCheck(this, TemporalQueries);
	    }
	
	    _createClass(TemporalQueries, null, [{
	        key: 'zoneId',
	        value: function zoneId() {
	            return TemporalQueries.ZONE_ID;
	        }
	    }, {
	        key: 'chronology',
	        value: function chronology() {
	            return TemporalQueries.CHRONO;
	        }
	    }, {
	        key: 'precision',
	        value: function precision() {
	            return TemporalQueries.PRECISION;
	        }
	    }, {
	        key: 'zone',
	        value: function zone() {
	            return TemporalQueries.ZONE;
	        }
	    }, {
	        key: 'offset',
	        value: function offset() {
	            return TemporalQueries.OFFSET;
	        }
	    }, {
	        key: 'localDate',
	        value: function localDate() {
	            return TemporalQueries.LOCAL_DATE;
	        }
	    }, {
	        key: 'localTime',
	        value: function localTime() {
	            return TemporalQueries.LOCAL_TIME;
	        }
	    }]);
	
	    return TemporalQueries;
	}();
	
	function _init() {
	    TemporalQueries.ZONE_ID = (0, _TemporalQuery.createTemporalQuery)('ZONE_ID', function (temporal) {
	        return temporal.query(TemporalQueries.ZONE_ID);
	    });
	
	    TemporalQueries.CHRONO = (0, _TemporalQuery.createTemporalQuery)('CHRONO', function (temporal) {
	        return temporal.query(TemporalQueries.CHRONO);
	    });
	
	    TemporalQueries.PRECISION = (0, _TemporalQuery.createTemporalQuery)('PRECISION', function (temporal) {
	        return temporal.query(TemporalQueries.PRECISION);
	    });
	
	    TemporalQueries.OFFSET = (0, _TemporalQuery.createTemporalQuery)('OFFSET', function (temporal) {
	        if (temporal.isSupported(_ChronoField.ChronoField.OFFSET_SECONDS)) {
	            return _ZoneOffset.ZoneOffset.ofTotalSeconds(temporal.get(TemporalQueries.OFFSET_SECONDS));
	        }
	        return null;
	    });
	
	    TemporalQueries.ZONE = (0, _TemporalQuery.createTemporalQuery)('ZONE', function (temporal) {
	        var zone = temporal.query(TemporalQueries.ZONE_ID);
	        return zone != null ? zone : temporal.query(TemporalQueries.OFFSET);
	    });
	
	    TemporalQueries.LOCAL_DATE = (0, _TemporalQuery.createTemporalQuery)('LOCAL_DATE', function (temporal) {
	        if (temporal.isSupported(_ChronoField.ChronoField.EPOCH_DAY)) {
	            return _LocalDate.LocalDate.ofEpochDay(temporal.getLong(TemporalQueries.EPOCH_DAY));
	        }
	        return null;
	    });
	
	    TemporalQueries.LOCAL_TIME = (0, _TemporalQuery.createTemporalQuery)('LOCAL_TIME', function (temporal) {
	        if (temporal.isSupported(_ChronoField.ChronoField.NANO_OF_DAY)) {
	            return _LocalTime.LocalTime.ofNanoOfDay(temporal.getLong(TemporalQueries.NANO_OF_DAY));
	        }
	        return null;
	    });
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TemporalQuery = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.createTemporalQuery = createTemporalQuery;
	
	var _Enum2 = __webpack_require__(15);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/*
	 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	 */
	
	var TemporalQuery = exports.TemporalQuery = function (_Enum) {
	  _inherits(TemporalQuery, _Enum);
	
	  function TemporalQuery() {
	    _classCallCheck(this, TemporalQuery);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(TemporalQuery).apply(this, arguments));
	  }
	
	  _createClass(TemporalQuery, [{
	    key: 'queryFrom',
	    value: function queryFrom(temporal) {
	      throw new Error('abstract class');
	    }
	  }]);
	
	  return TemporalQuery;
	}(_Enum2.Enum);
	
	function createTemporalQuery(name, queryFromFunction) {
	  var ExtendedTemporalQuery = function (_TemporalQuery) {
	    _inherits(ExtendedTemporalQuery, _TemporalQuery);
	
	    function ExtendedTemporalQuery() {
	      _classCallCheck(this, ExtendedTemporalQuery);
	
	      return _possibleConstructorReturn(this, Object.getPrototypeOf(ExtendedTemporalQuery).apply(this, arguments));
	    }
	
	    return ExtendedTemporalQuery;
	  }(TemporalQuery);
	
	  ExtendedTemporalQuery.prototype.queryFrom = queryFromFunction;
	  return new ExtendedTemporalQuery(name);
	}

/***/ },
/* 21 */
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
	
	        ZoneOffset._validateTotalSeconds(totalSeconds);
	        this._totalSeconds = totalSeconds;
	    }
	
	    _createClass(ZoneOffset, [{
	        key: 'totalSeconds',
	        value: function totalSeconds() {
	            return this._totalSeconds;
	        }
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
	        key: '_validateTotalSeconds',
	        value: function _validateTotalSeconds(totalSeconds) {
	            if (Math.abs(totalSeconds) > ZoneOffset.MAX_SECONDS) {
	                throw new _errors.DateTimeException('Zone offset not in valid range: -18:00 to +18:00');
	            }
	        }
	    }, {
	        key: '_validate',
	        value: function _validate(hours, minutes, seconds) {
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
	            ZoneOffset._validate(hours, minutes, seconds);
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
/* 22 */
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
	
	var Year = exports.Year = function Year() {
	  _classCallCheck(this, Year);
	};
	
	function _init() {
	  Year.MIN_VALUE = -999999;
	
	  Year.MAX_VALUE = 999999;
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ResolverStyle = undefined;
	
	var _Enum2 = __webpack_require__(15);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ResolverStyle = exports.ResolverStyle = function (_Enum) {
	  _inherits(ResolverStyle, _Enum);
	
	  function ResolverStyle() {
	    _classCallCheck(this, ResolverStyle);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ResolverStyle).apply(this, arguments));
	  }
	
	  return ResolverStyle;
	}(_Enum2.Enum);
	
	ResolverStyle.STRICT = new ResolverStyle('STRICT');
	
	ResolverStyle.SMART = new ResolverStyle('SMART');
	
	ResolverStyle.LENIENT = new ResolverStyle('LENIENT');

/***/ },
/* 24 */
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
	
	var _TemporalQueries = __webpack_require__(19);
	
	var _Temporal2 = __webpack_require__(17);
	
	var _LocalDate = __webpack_require__(13);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var ChronoLocalDate = function (_Temporal) {
	    _inherits(ChronoLocalDate, _Temporal);
	
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
	}(_Temporal2.Temporal);

	exports.ChronoLocalDate = ChronoLocalDate;

/***/ },
/* 25 */
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
	
	var ValueRange = exports.ValueRange = function () {
	    function ValueRange(minSmallest, minLargest, maxSmallest, maxLargest) {
	        _classCallCheck(this, ValueRange);
	
	        (0, _assert.assert)(!(minSmallest > minLargest), 'Smallest minimum value \'' + minSmallest + '\' must be less than largest minimum value \'' + minLargest + '\'', _errors.IllegalArgumentException);
	        (0, _assert.assert)(!(maxSmallest > maxLargest), 'Smallest maximum value \'' + maxSmallest + '\' must be less than largest maximum value \'' + maxLargest + '\'', _errors.IllegalArgumentException);
	        (0, _assert.assert)(!(minLargest > maxLargest), 'Minimum value \'' + minLargest + '\' must be less than maximum value \'' + maxLargest + '\'', _errors.IllegalArgumentException);
	
	        this._minSmallest = minSmallest;
	        this._minLargest = minLargest;
	        this._maxLargest = maxLargest;
	        this._maxSmallest = maxSmallest;
	    }
	
	    _createClass(ValueRange, [{
	        key: 'isFixed',
	        value: function isFixed() {
	            return this._minSmallest === this._minLargest && this._maxSmallest === this._maxLargest;
	        }
	    }, {
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
	    }, {
	        key: 'checkValidIntValue',
	        value: function checkValidIntValue(value, field) {
	            if (this.isValidIntValue(value) === false) {
	                throw new _errors.DateTimeException('Invalid int value for ' + field + ': ' + value);
	            }
	            return value;
	        }
	    }, {
	        key: 'isValidIntValue',
	        value: function isValidIntValue(value) {
	            return this.isIntValue() && this.isValidValue(value);
	        }
	    }, {
	        key: 'isIntValue',
	        value: function isIntValue() {
	            return this.minimum() >= _MathUtil.MathUtil.MIN_SAFE_INTEGER && this.maximum() <= _MathUtil.MathUtil.MAX_SAFE_INTEGER;
	        }
	    }, {
	        key: 'equals',
	        value: function equals(other) {
	            if (other === this) {
	                return true;
	            }
	            if (other instanceof ValueRange) {
	                return this._minSmallest === other._minSmallest && this._minLargest === other._minLargest && this._maxSmallest === other._maxSmallest && this._maxLargest === other._maxLargest;
	            }
	            return false;
	        }
	    }, {
	        key: 'hashCode',
	        value: function hashCode() {
	            var hash = this._minSmallest + this._minLargest << 16 + this._minLargest >> 48 + this._maxSmallest << 32 + this._maxSmallest >> 32 + this._maxLargest << 48 + this._maxLargest >> 16;
	            return hash ^ hash >>> 32;
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            var str = this.minimum() + (this.minimum() !== this.largestMinimum() ? '/' + this.largestMinimum() : '');
	            str += ' - ';
	            str += this.smallestMaximum() + (this.smallestMaximum() !== this.maximum() ? '/' + this.maximum() : '');
	            return str;
	        }
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
	                return (0, _assert.assert)(false, 'Invalid number of arguments ' + arguments.length, _errors.IllegalArgumentException);
	            }
	        }
	    }]);
	
	    return ValueRange;
	}();

/***/ },
/* 26 */
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
	
	var _ParsePosition = __webpack_require__(27);
	
	var _DateTimeParseContext = __webpack_require__(28);
	
	var _DateTimeFormatterBuilder = __webpack_require__(32);
	
	var _SignStyle = __webpack_require__(34);
	
	var _ResolverStyle = __webpack_require__(23);
	
	var _IsoChronology = __webpack_require__(14);
	
	var _ChronoField = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DateTimeFormatter = exports.DateTimeFormatter = function () {
	    function DateTimeFormatter(printerParser, locale, decimalStyle, resolverStyle, resolverFields, chrono, zone) {
	        _classCallCheck(this, DateTimeFormatter);
	
	        (0, _assert.assert)(printerParser != null);
	        (0, _assert.assert)(decimalStyle != null);
	        (0, _assert.assert)(resolverStyle != null);
	
	        this._printerParser = printerParser;
	
	        this._locale = locale;
	
	        this._decimalStyle = decimalStyle;
	
	        this._resolverStyle = resolverStyle;
	
	        this._resolverFields = resolverFields;
	
	        this._chrono = chrono;
	
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
	    }, {
	        key: 'withChronology',
	        value: function withChronology(chrono) {
	            if (this._chrono != null && this._chrono.equals(chrono)) {
	                return this;
	            }
	            return new DateTimeFormatter(this._printerParser, this._locale, this._decimalStyle, this._resolverStyle, this._resolverFields, chrono, this._zone);
	        }
	    }, {
	        key: 'withLocal',
	        value: function withLocal() {
	            return this;
	        }
	    }, {
	        key: 'parse',
	        value: function parse(text, type) {
	            (0, _assert.requireNonNull)(text, 'text');
	            (0, _assert.requireNonNull)(type, 'type');
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
	                position.setErrorIndex(~pos);
	                return null;
	            }
	            position.setIndex(pos);
	            return context.toParsed();
	        }
	    }, {
	        key: 'toPrinterParser',
	        value: function toPrinterParser(optional) {
	            return this._printerParser.withOptional(optional);
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
	
	    DateTimeFormatter.ISO_LOCAL_TIME = new _DateTimeFormatterBuilder.DateTimeFormatterBuilder().appendValue(_ChronoField.ChronoField.HOUR_OF_DAY, 2).appendLiteral(':').appendValue(_ChronoField.ChronoField.MINUTE_OF_HOUR, 2).optionalStart().appendLiteral(':').appendValue(_ChronoField.ChronoField.SECOND_OF_MINUTE, 2).optionalStart().appendFraction(_ChronoField.ChronoField.NANO_OF_SECOND, 0, 9, true).toFormatter(_ResolverStyle.ResolverStyle.STRICT);
	
	    DateTimeFormatter.ISO_LOCAL_DATE_TIME = new _DateTimeFormatterBuilder.DateTimeFormatterBuilder().parseCaseInsensitive().append(DateTimeFormatter.ISO_LOCAL_DATE).appendLiteral('T').append(DateTimeFormatter.ISO_LOCAL_TIME).toFormatter(_ResolverStyle.ResolverStyle.STRICT).withChronology(_IsoChronology.IsoChronology.INSTANCE);
	}

/***/ },
/* 27 */
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
/* 28 */
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
	
	var _DateTimeBuilder = __webpack_require__(29);
	
	var _EnumMap = __webpack_require__(30);
	
	var _IsoChronology = __webpack_require__(14);
	
	var _Temporal2 = __webpack_require__(17);
	
	var _TemporalQueries = __webpack_require__(19);
	
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
	    }, {
	        key: 'startOptional',
	        value: function startOptional() {
	            this._parsed.push(this.currentParsed().copy());
	        }
	    }, {
	        key: 'endOptional',
	        value: function endOptional(successful) {
	            if (successful) {
	                this._parsed.splice(this._parsed.length - 2, 1);
	            } else {
	                this._parsed.splice(this._parsed.length - 1, 1);
	            }
	        }
	    }, {
	        key: 'isCaseSensitive',
	        value: function isCaseSensitive() {
	            return this._caseSensitive;
	        }
	    }, {
	        key: 'setCaseSensitive',
	        value: function setCaseSensitive(caseSensitive) {
	            this._caseSensitive = caseSensitive;
	        }
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
	    }, {
	        key: 'charEquals',
	        value: function charEquals(ch1, ch2) {
	            if (this.isCaseSensitive()) {
	                return ch1 === ch2;
	            }
	            return this.charEqualsIgnoreCase(ch1, ch2);
	        }
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
	
	var Parsed = function (_Temporal) {
	    _inherits(Parsed, _Temporal);
	
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
	            cloned.dateTimeParseContext = this.dateTimeParseContext;
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
	}(_Temporal2.Temporal);

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DateTimeBuilder = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _assert = __webpack_require__(9);
	
	var _errors = __webpack_require__(5);
	
	var _MathUtil = __webpack_require__(4);
	
	var _EnumMap = __webpack_require__(30);
	
	var _ResolverStyle = __webpack_require__(23);
	
	var _IsoChronology = __webpack_require__(14);
	
	var _ChronoLocalDate = __webpack_require__(24);
	
	var _ChronoField = __webpack_require__(3);
	
	var _Temporal2 = __webpack_require__(17);
	
	var _TemporalQueries = __webpack_require__(19);
	
	var _LocalTime = __webpack_require__(11);
	
	var _LocalDate = __webpack_require__(13);
	
	var _Period = __webpack_require__(31);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var DateTimeBuilder = function (_Temporal) {
	    _inherits(DateTimeBuilder, _Temporal);
	
	    function DateTimeBuilder() {
	        _classCallCheck(this, DateTimeBuilder);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DateTimeBuilder).call(this));
	
	        _this.fieldValues = new _EnumMap.EnumMap();
	
	        _this.chrono = null;
	
	        _this.zone = null;
	
	        _this.date = null;
	
	        _this.time = null;
	
	        _this.leapSecond = false;
	
	        _this.excessDays = null;
	        return _this;
	    }
	
	    _createClass(DateTimeBuilder, [{
	        key: 'getFieldValue0',
	        value: function getFieldValue0(field) {
	            return this.fieldValues.get(field);
	        }
	    }, {
	        key: '_addFieldValue',
	        value: function _addFieldValue(field, value) {
	            (0, _assert.requireNonNull)(field, 'field');
	            var old = this.getFieldValue0(field);
	            if (old != null && old.longValue() !== value) {
	                throw new _errors.DateTimeException('Conflict found: ' + field + ' ' + old + ' differs from ' + field + ' ' + value + ': ' + this);
	            }
	            return this._putFieldValue0(field, value);
	        }
	    }, {
	        key: '_putFieldValue0',
	        value: function _putFieldValue0(field, value) {
	            this.fieldValues.put(field, value);
	            return this;
	        }
	    }, {
	        key: 'resolve',
	        value: function resolve(resolverStyle, resolverFields) {
	            if (resolverFields != null) {
	                this.fieldValues.retainAll(resolverFields);
	            }
	
	            this._mergeDate(resolverStyle);
	            this._mergeTime(resolverStyle);
	
	            this._resolveTimeInferZeroes(resolverStyle);
	
	            if (this.excessDays != null && this.excessDays.isZero() === false && this.date != null && this.time != null) {
	                this.date = this.date.plus(this.excessDays);
	                this.excessDays = _Period.Period.ZERO;
	            }
	
	            return this;
	        }
	    }, {
	        key: '_mergeDate',
	        value: function _mergeDate(resolverStyle) {
	            this._checkDate(_IsoChronology.IsoChronology.INSTANCE.resolveDate(this.fieldValues, resolverStyle));
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
	        key: '_mergeTime',
	        value: function _mergeTime(resolverStyle) {
	            if (this.fieldValues.containsKey(_ChronoField.ChronoField.CLOCK_HOUR_OF_DAY)) {
	                var ch = this.fieldValues.remove(_ChronoField.ChronoField.CLOCK_HOUR_OF_DAY);
	                if (resolverStyle !== _ResolverStyle.ResolverStyle.LENIENT) {
	                    if (resolverStyle === _ResolverStyle.ResolverStyle.SMART && ch === 0) {} else {
	                            _ChronoField.ChronoField.CLOCK_HOUR_OF_DAY.checkValidValue(ch);
	                        }
	                }
	                this._addFieldValue(_ChronoField.ChronoField.HOUR_OF_DAY, ch === 24 ? 0 : ch);
	            }
	            if (this.fieldValues.containsKey(_ChronoField.ChronoField.CLOCK_HOUR_OF_AMPM)) {
	                var ch = this.fieldValues.remove(_ChronoField.ChronoField.CLOCK_HOUR_OF_AMPM);
	                if (resolverStyle !== _ResolverStyle.ResolverStyle.LENIENT) {
	                    if (resolverStyle === _ResolverStyle.ResolverStyle.SMART && ch === 0) {} else {
	                            _ChronoField.ChronoField.CLOCK_HOUR_OF_AMPM.checkValidValue(ch);
	                        }
	                }
	                this._addFieldValue(_ChronoField.ChronoField.HOUR_OF_AMPM, ch === 12 ? 0 : ch);
	            }
	            if (resolverStyle !== _ResolverStyle.ResolverStyle.LENIENT) {
	                if (this.fieldValues.containsKey(_ChronoField.ChronoField.AMPM_OF_DAY)) {
	                    _ChronoField.ChronoField.AMPM_OF_DAY.checkValidValue(this.fieldValues.get(_ChronoField.ChronoField.AMPM_OF_DAY));
	                }
	                if (this.fieldValues.containsKey(_ChronoField.ChronoField.HOUR_OF_AMPM)) {
	                    _ChronoField.ChronoField.HOUR_OF_AMPM.checkValidValue(this.fieldValues.get(_ChronoField.ChronoField.HOUR_OF_AMPM));
	                }
	            }
	            if (this.fieldValues.containsKey(_ChronoField.ChronoField.AMPM_OF_DAY) && this.fieldValues.containsKey(_ChronoField.ChronoField.HOUR_OF_AMPM)) {
	                var ap = this.fieldValues.remove(_ChronoField.ChronoField.AMPM_OF_DAY);
	                var hap = this.fieldValues.remove(_ChronoField.ChronoField.HOUR_OF_AMPM);
	                this._addFieldValue(_ChronoField.ChronoField.HOUR_OF_DAY, ap * 12 + hap);
	            }
	
	            if (this.fieldValues.containsKey(_ChronoField.ChronoField.NANO_OF_DAY)) {
	                var nod = this.fieldValues.remove(_ChronoField.ChronoField.NANO_OF_DAY);
	                if (resolverStyle !== _ResolverStyle.ResolverStyle.LENIENT) {
	                    _ChronoField.ChronoField.NANO_OF_DAY.checkValidValue(nod);
	                }
	                this._addFieldValue(_ChronoField.ChronoField.SECOND_OF_DAY, _MathUtil.MathUtil.intDiv(nod, 1000000000));
	                this._addFieldValue(_ChronoField.ChronoField.NANO_OF_SECOND, _MathUtil.MathUtil.intMod(nod, 1000000000));
	            }
	            if (this.fieldValues.containsKey(_ChronoField.ChronoField.MICRO_OF_DAY)) {
	                var cod = this.fieldValues.remove(_ChronoField.ChronoField.MICRO_OF_DAY);
	                if (resolverStyle !== _ResolverStyle.ResolverStyle.LENIENT) {
	                    _ChronoField.ChronoField.MICRO_OF_DAY.checkValidValue(cod);
	                }
	                this._addFieldValue(_ChronoField.ChronoField.SECOND_OF_DAY, _MathUtil.MathUtil.intDiv(cod, 1000000));
	                this._addFieldValue(_ChronoField.ChronoField.MICRO_OF_SECOND, _MathUtil.MathUtil.intMod(cod, 1000000));
	            }
	            if (this.fieldValues.containsKey(_ChronoField.ChronoField.MILLI_OF_DAY)) {
	                var lod = this.fieldValues.remove(_ChronoField.ChronoField.MILLI_OF_DAY);
	                if (resolverStyle !== _ResolverStyle.ResolverStyle.LENIENT) {
	                    _ChronoField.ChronoField.MILLI_OF_DAY.checkValidValue(lod);
	                }
	                this._addFieldValue(_ChronoField.ChronoField.SECOND_OF_DAY, _MathUtil.MathUtil.intDiv(lod, 1000));
	                this._addFieldValue(_ChronoField.ChronoField.MILLI_OF_SECOND, _MathUtil.MathUtil.intMod(lod, 1000));
	            }
	            if (this.fieldValues.containsKey(_ChronoField.ChronoField.SECOND_OF_DAY)) {
	                var sod = this.fieldValues.remove(_ChronoField.ChronoField.SECOND_OF_DAY);
	                if (resolverStyle !== _ResolverStyle.ResolverStyle.LENIENT) {
	                    _ChronoField.ChronoField.SECOND_OF_DAY.checkValidValue(sod);
	                }
	                this._addFieldValue(_ChronoField.ChronoField.HOUR_OF_DAY, _MathUtil.MathUtil.intDiv(sod, 3600));
	                this._addFieldValue(_ChronoField.ChronoField.MINUTE_OF_HOUR, _MathUtil.MathUtil.intMod(_MathUtil.MathUtil.intDiv(sod, 60), 60));
	                this._addFieldValue(_ChronoField.ChronoField.SECOND_OF_MINUTE, _MathUtil.MathUtil.intMod(sod, 60));
	            }
	            if (this.fieldValues.containsKey(_ChronoField.ChronoField.MINUTE_OF_DAY)) {
	                var mod = this.fieldValues.remove(_ChronoField.ChronoField.MINUTE_OF_DAY);
	                if (resolverStyle !== _ResolverStyle.ResolverStyle.LENIENT) {
	                    _ChronoField.ChronoField.MINUTE_OF_DAY.checkValidValue(mod);
	                }
	                this._addFieldValue(_ChronoField.ChronoField.HOUR_OF_DAY, _MathUtil.MathUtil.intDiv(mod, 60));
	                this._addFieldValue(_ChronoField.ChronoField.MINUTE_OF_HOUR, _MathUtil.MathUtil.intMod(mod, 60));
	            }
	
	            if (resolverStyle !== _ResolverStyle.ResolverStyle.LENIENT) {
	                if (this.fieldValues.containsKey(_ChronoField.ChronoField.MILLI_OF_SECOND)) {
	                    _ChronoField.ChronoField.MILLI_OF_SECOND.checkValidValue(this.fieldValues.get(_ChronoField.ChronoField.MILLI_OF_SECOND));
	                }
	                if (this.fieldValues.containsKey(_ChronoField.ChronoField.MICRO_OF_SECOND)) {
	                    _ChronoField.ChronoField.MICRO_OF_SECOND.checkValidValue(this.fieldValues.get(_ChronoField.ChronoField.MICRO_OF_SECOND));
	                }
	            }
	            if (this.fieldValues.containsKey(_ChronoField.ChronoField.MILLI_OF_SECOND) && this.fieldValues.containsKey(_ChronoField.ChronoField.MICRO_OF_SECOND)) {
	                var los = this.fieldValues.remove(_ChronoField.ChronoField.MILLI_OF_SECOND);
	                var cos = this.fieldValues.get(_ChronoField.ChronoField.MICRO_OF_SECOND);
	                this._addFieldValue(_ChronoField.ChronoField.MICRO_OF_SECOND, los * 1000 + _MathUtil.MathUtil.intMod(cos, 1000));
	            }
	            if (this.fieldValues.containsKey(_ChronoField.ChronoField.MICRO_OF_SECOND) && this.fieldValues.containsKey(_ChronoField.ChronoField.NANO_OF_SECOND)) {
	                var nos = this.fieldValues.get(_ChronoField.ChronoField.NANO_OF_SECOND);
	                this._addFieldValue(_ChronoField.ChronoField.MICRO_OF_SECOND, _MathUtil.MathUtil.intDiv(nos, 1000));
	                this.fieldValues.remove(_ChronoField.ChronoField.MICRO_OF_SECOND);
	            }
	            if (this.fieldValues.containsKey(_ChronoField.ChronoField.MILLI_OF_SECOND) && this.fieldValues.containsKey(_ChronoField.ChronoField.NANO_OF_SECOND)) {
	                var nos = this.fieldValues.get(_ChronoField.ChronoField.NANO_OF_SECOND);
	                this._addFieldValue(_ChronoField.ChronoField.MILLI_OF_SECOND, _MathUtil.MathUtil.intDiv(nos, 1000000));
	                this.fieldValues.remove(_ChronoField.ChronoField.MILLI_OF_SECOND);
	            }
	            if (this.fieldValues.containsKey(_ChronoField.ChronoField.MICRO_OF_SECOND)) {
	                var cos = this.fieldValues.remove(_ChronoField.ChronoField.MICRO_OF_SECOND);
	                this._addFieldValue(_ChronoField.ChronoField.NANO_OF_SECOND, cos * 1000);
	            } else if (this.fieldValues.containsKey(_ChronoField.ChronoField.MILLI_OF_SECOND)) {
	                var los = this.fieldValues.remove(_ChronoField.ChronoField.MILLI_OF_SECOND);
	                this._addFieldValue(_ChronoField.ChronoField.NANO_OF_SECOND, los * 1000000);
	            }
	        }
	    }, {
	        key: '_resolveTimeInferZeroes',
	        value: function _resolveTimeInferZeroes(resolverStyle) {
	            var hod = this.fieldValues.get(_ChronoField.ChronoField.HOUR_OF_DAY);
	            var moh = this.fieldValues.get(_ChronoField.ChronoField.MINUTE_OF_HOUR);
	            var som = this.fieldValues.get(_ChronoField.ChronoField.SECOND_OF_MINUTE);
	            var nos = this.fieldValues.get(_ChronoField.ChronoField.NANO_OF_SECOND);
	            if (hod == null) {
	                return;
	            }
	            if (moh == null && (som != null || nos != null)) {
	                return;
	            }
	            if (moh != null && som == null && nos != null) {
	                return;
	            }
	            if (resolverStyle !== _ResolverStyle.ResolverStyle.LENIENT) {
	                if (hod != null) {
	                    if (resolverStyle === _ResolverStyle.ResolverStyle.SMART && hod.longValue() === 24 && (moh == null || moh.longValue() === 0) && (som == null || som.longValue() === 0) && (nos == null || nos.longValue() === 0)) {
	                        hod = 0;
	                        this.excessDays = _Period.Period.ofDays(1);
	                    }
	                    var hodVal = _ChronoField.ChronoField.HOUR_OF_DAY.checkValidIntValue(hod);
	                    if (moh != null) {
	                        var mohVal = _ChronoField.ChronoField.MINUTE_OF_HOUR.checkValidIntValue(moh);
	                        if (som != null) {
	                            var somVal = _ChronoField.ChronoField.SECOND_OF_MINUTE.checkValidIntValue(som);
	                            if (nos != null) {
	                                var nosVal = _ChronoField.ChronoField.NANO_OF_SECOND.checkValidIntValue(nos);
	                                this._addObject(_LocalTime.LocalTime.of(hodVal, mohVal, somVal, nosVal));
	                            } else {
	                                this._addObject(_LocalTime.LocalTime.of(hodVal, mohVal, somVal));
	                            }
	                        } else {
	                            if (nos == null) {
	                                this._addObject(_LocalTime.LocalTime.of(hodVal, mohVal));
	                            }
	                        }
	                    } else {
	                        if (som == null && nos == null) {
	                            this._addObject(_LocalTime.LocalTime.of(hodVal, 0));
	                        }
	                    }
	                }
	            } else {
	                if (hod != null) {
	                    var hodVal = hod;
	                    if (moh != null) {
	                        if (som != null) {
	                            if (nos == null) {
	                                nos = 0;
	                            }
	                            var totalNanos = _MathUtil.MathUtil.safeMultiply(hodVal, 3600000000000);
	                            totalNanos = _MathUtil.MathUtil.safeAdd(totalNanos, _MathUtil.MathUtil.safeMultiply(moh, 60000000000));
	                            totalNanos = _MathUtil.MathUtil.safeAdd(totalNanos, _MathUtil.MathUtil.safeMultiply(som, 1000000000));
	                            totalNanos = _MathUtil.MathUtil.safeAdd(totalNanos, nos);
	                            var excessDays = _MathUtil.MathUtil.floorDiv(totalNanos, 86400000000000);
	                            var nod = _MathUtil.MathUtil.floorMod(totalNanos, 86400000000000);
	                            this._addObject(_LocalTime.LocalTime.ofNanoOfDay(nod));
	                            this.excessDays = _Period.Period.ofDays(excessDays);
	                        } else {
	                            var totalSecs = _MathUtil.MathUtil.safeMultiply(hodVal, 3600);
	                            totalSecs = _MathUtil.MathUtil.safeAdd(totalSecs, _MathUtil.MathUtil.safeMultiply(moh, 60));
	                            var excessDays = _MathUtil.MathUtil.floorDiv(totalSecs, 86400);
	                            var sod = _MathUtil.MathUtil.floorMod(totalSecs, 86400);
	                            this._addObject(_LocalTime.LocalTime.ofSecondOfDay(sod));
	                            this.excessDays = _Period.Period.ofDays(excessDays);
	                        }
	                    } else {
	                        var excessDays = _MathUtil.MathUtil.safeToInt(_MathUtil.MathUtil.floorDiv(hodVal, 24));
	                        hodVal = _MathUtil.MathUtil.floorMod(hodVal, 24);
	                        this._addObject(_LocalTime.LocalTime.of(hodVal, 0));
	                        this.excessDays = _Period.Period.ofDays(excessDays);
	                    }
	                }
	            }
	            this.fieldValues.remove(_ChronoField.ChronoField.HOUR_OF_DAY);
	            this.fieldValues.remove(_ChronoField.ChronoField.MINUTE_OF_HOUR);
	            this.fieldValues.remove(_ChronoField.ChronoField.SECOND_OF_MINUTE);
	            this.fieldValues.remove(_ChronoField.ChronoField.NANO_OF_SECOND);
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
	                return null;
	            }
	
	            return _query.queryFrom(this);
	        }
	    }]);
	
	    return DateTimeBuilder;
	}(_Temporal2.Temporal);

	exports.DateTimeBuilder = DateTimeBuilder;

/***/ },
/* 30 */
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
/* 31 */
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
	
	var _IsoChronology = __webpack_require__(14);
	
	var _ChronoUnit = __webpack_require__(7);
	
	var _TemporalAmount2 = __webpack_require__(10);
	
	var _LocalDate = __webpack_require__(13);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper                 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos  
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var PATTERN = /([-+]?)P(?:([-+]?[0-9]+)Y)?(?:([-+]?[0-9]+)M)?(?:([-+]?[0-9]+)W)?(?:([-+]?[0-9]+)D)?/;
	
	var Period = exports.Period = function (_TemporalAmount) {
	    _inherits(Period, _TemporalAmount);
	
	    function Period(years, months, days) {
	        _classCallCheck(this, Period);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Period).call(this));
	
	        if ((years | months | days) === 0) {
	            var _ret;
	
	            return _ret = Period.ZERO, _possibleConstructorReturn(_this, _ret);
	        }
	        Period._validate(years, months, days);
	
	        _this._years = years;
	
	        _this._months = months;
	
	        _this._days = days;
	        return _this;
	    }
	
	    _createClass(Period, [{
	        key: 'units',
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
	    }, {
	        key: 'isZero',
	        value: function isZero() {
	            return this === Period.ZERO;
	        }
	    }, {
	        key: 'isNegative',
	        value: function isNegative() {
	            return this._years < 0 || this._months < 0 || this._days < 0;
	        }
	    }, {
	        key: 'years',
	        value: function years() {
	            return this._years;
	        }
	    }, {
	        key: 'months',
	        value: function months() {
	            return this._months;
	        }
	    }, {
	        key: 'days',
	        value: function days() {
	            return this._days;
	        }
	    }, {
	        key: 'withYears',
	        value: function withYears(years) {
	            if (years === this._years) {
	                return this;
	            }
	            return Period.create(years, this._months, this._days);
	        }
	    }, {
	        key: 'withMonths',
	        value: function withMonths(months) {
	            if (months === this._months) {
	                return this;
	            }
	            return Period.create(this._years, months, this._days);
	        }
	    }, {
	        key: 'withDays',
	        value: function withDays(days) {
	            if (days === this._days) {
	                return this;
	            }
	            return Period.create(this._years, this._months, days);
	        }
	    }, {
	        key: 'plus',
	        value: function plus(amountToAdd) {
	            var amount = Period.from(amountToAdd);
	            return Period.create(_MathUtil.MathUtil.safeAdd(this._years, amount._years), _MathUtil.MathUtil.safeAdd(this._months, amount._months), _MathUtil.MathUtil.safeAdd(this._days, amount._days));
	        }
	    }, {
	        key: 'plusYears',
	        value: function plusYears(yearsToAdd) {
	            if (yearsToAdd === 0) {
	                return this;
	            }
	            return Period.create(_MathUtil.MathUtil.safeToInt(_MathUtil.MathUtil.safeAdd(this._years, yearsToAdd)), this._months, this._days);
	        }
	    }, {
	        key: 'plusMonths',
	        value: function plusMonths(monthsToAdd) {
	            if (monthsToAdd === 0) {
	                return this;
	            }
	            return Period.create(this._years, _MathUtil.MathUtil.safeToInt(_MathUtil.MathUtil.safeAdd(this._months, monthsToAdd)), this._days);
	        }
	    }, {
	        key: 'plusDays',
	        value: function plusDays(daysToAdd) {
	            if (daysToAdd === 0) {
	                return this;
	            }
	            return Period.create(this._years, this._months, _MathUtil.MathUtil.safeToInt(_MathUtil.MathUtil.safeAdd(this._days, daysToAdd)));
	        }
	    }, {
	        key: 'minus',
	        value: function minus(amountToSubtract) {
	            var amount = Period.from(amountToSubtract);
	            return Period.create(_MathUtil.MathUtil.safeSubtract(this._years, amount._years), _MathUtil.MathUtil.safeSubtract(this._months, amount._months), _MathUtil.MathUtil.safeSubtract(this._days, amount._days));
	        }
	    }, {
	        key: 'minusYears',
	        value: function minusYears(yearsToSubtract) {
	            return this.plusYears(-1 * yearsToSubtract);
	        }
	    }, {
	        key: 'minusMonths',
	        value: function minusMonths(monthsToSubtract) {
	            return this.plusMonths(-1 * monthsToSubtract);
	        }
	    }, {
	        key: 'minusDays',
	        value: function minusDays(daysToSubtract) {
	            return this.plusDays(-1 * daysToSubtract);
	        }
	    }, {
	        key: 'multipliedBy',
	        value: function multipliedBy(scalar) {
	            if (this === Period.ZERO || scalar === 1) {
	                return this;
	            }
	            return Period.create(_MathUtil.MathUtil.safeMultiply(this._years, scalar), _MathUtil.MathUtil.safeMultiply(this._months, scalar), _MathUtil.MathUtil.safeMultiply(this._days, scalar));
	        }
	    }, {
	        key: 'negated',
	        value: function negated() {
	            return this.multipliedBy(-1);
	        }
	    }, {
	        key: 'normalized',
	        value: function normalized() {
	            var totalMonths = this.toTotalMonths();
	            var splitYears = _MathUtil.MathUtil.intDiv(totalMonths, 12);
	            var splitMonths = _MathUtil.MathUtil.intMod(totalMonths, 12);
	            if (splitYears === this._years && splitMonths === this._months) {
	                return this;
	            }
	            return Period.create(_MathUtil.MathUtil.safeToInt(splitYears), splitMonths, this._days);
	        }
	    }, {
	        key: 'toTotalMonths',
	        value: function toTotalMonths() {
	            return this._years * 12 + this._months;
	        }
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
	    }, {
	        key: 'hashCode',
	        value: function hashCode() {
	            return this._years + (this._months << 8) + (this._days << 16);
	        }
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
	    }, {
	        key: 'ofYears',
	        value: function ofYears(years) {
	            return Period.create(years, 0, 0);
	        }
	    }, {
	        key: 'ofMonths',
	        value: function ofMonths(months) {
	            return Period.create(0, months, 0);
	        }
	    }, {
	        key: 'ofWeeks',
	        value: function ofWeeks(weeks) {
	            return Period.create(0, 0, _MathUtil.MathUtil.safeMultiply(weeks, 7));
	        }
	    }, {
	        key: 'ofDays',
	        value: function ofDays(days) {
	            return Period.create(0, 0, days);
	        }
	    }, {
	        key: 'of',
	        value: function of(years, months, days) {
	            return Period.create(years, months, days);
	        }
	    }, {
	        key: 'from',
	        value: function from(amount) {
	            if (amount instanceof Period) {
	                return amount;
	            }
	
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
	    }, {
	        key: 'between',
	        value: function between(startDate, endDate) {
	            (0, _assert.requireNonNull)(startDate, 'startDate');
	            (0, _assert.requireNonNull)(endDate, 'endDate');
	            (0, _assert.requireInstance)(startDate, _LocalDate.LocalDate, 'startDate');
	            (0, _assert.requireInstance)(endDate, _LocalDate.LocalDate, 'endDate');
	            return startDate.until(endDate);
	        }
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
	    }, {
	        key: 'create',
	        value: function create(years, months, days) {
	            return new Period(years, months, days);
	        }
	    }]);
	
	    return Period;
	}(_TemporalAmount2.TemporalAmount);
	
	function _init() {
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
/* 32 */
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
	
	var _Enum2 = __webpack_require__(15);
	
	var _DateTimeFormatter = __webpack_require__(26);
	
	var _DecimalStyle = __webpack_require__(33);
	
	var _SignStyle = __webpack_require__(34);
	
	var _ResolverStyle = __webpack_require__(23);
	
	var _MathUtil = __webpack_require__(4);
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MAX_WIDTH = 15;
	var DateTimeFormatterBuilder = exports.DateTimeFormatterBuilder = function () {
	    function DateTimeFormatterBuilder() {
	        var parent = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	        var optional = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	        _classCallCheck(this, DateTimeFormatterBuilder);
	
	        this._active = this;
	
	        this._parent = parent;
	
	        this._printerParsers = [];
	
	        this._optional = optional;
	
	        this._padNextWidth = 0;
	
	        this._padNextChar = null;
	
	        this._valueParserIndex = -1;
	    }
	
	    _createClass(DateTimeFormatterBuilder, [{
	        key: 'parseCaseSensitive',
	        value: function parseCaseSensitive() {
	            this._appendInternalPrinterParser(SettingsParser.SENSITIVE);
	            return this;
	        }
	    }, {
	        key: 'parseCaseInsensitive',
	        value: function parseCaseInsensitive() {
	            this._appendInternalPrinterParser(SettingsParser.INSENSITIVE);
	            return this;
	        }
	    }, {
	        key: 'parseStrict',
	        value: function parseStrict() {
	            this._appendInternalPrinterParser(SettingsParser.STRICT);
	            return this;
	        }
	    }, {
	        key: 'parseLenient',
	        value: function parseLenient() {
	            this._appendInternalPrinterParser(SettingsParser.LENIENT);
	            return this;
	        }
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
	    }, {
	        key: '_appendValue1',
	        value: function _appendValue1(field) {
	            (0, _assert.assert)(field != null);
	            this._appendValuePrinterParser(new NumberPrinterParser(field, 1, MAX_WIDTH, _SignStyle.SignStyle.NORMAL));
	            return this;
	        }
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
	    }, {
	        key: '_appendValuePrinterParser',
	        value: function _appendValuePrinterParser(pp) {
	            (0, _assert.assert)(pp != null);
	            if (this._active._valueParserIndex >= 0 && this._active._printerParsers[this._active._valueParserIndex] instanceof NumberPrinterParser) {
	                var activeValueParser = this._active._valueParserIndex;
	
	                var basePP = this._active._printerParsers[activeValueParser];
	                if (pp.minWidth() === pp.maxWidth() && pp.signStyle() === _SignStyle.SignStyle.NOT_NEGATIVE) {
	                    basePP = basePP.withSubsequentWidth(pp.maxWidth());
	
	                    this._appendInternal(pp.withFixedWidth());
	
	                    this._active._valueParserIndex = activeValueParser;
	                } else {
	                    basePP = basePP.withFixedWidth();
	
	                    this._active._valueParserIndex = this._appendInternal(pp);
	                }
	
	                this._active._printerParsers[activeValueParser] = basePP;
	            } else {
	                this._active._valueParserIndex = this._appendInternal(pp);
	            }
	            return this;
	        }
	    }, {
	        key: 'appendFraction',
	        value: function appendFraction(field, minWidth, maxWidth, decimalPoint) {
	            this._appendInternal(new FractionPrinterParser(field, minWidth, maxWidth, decimalPoint));
	            return this;
	        }
	    }, {
	        key: 'optionalStart',
	        value: function optionalStart() {
	            this._active.valueParserIndex = -1;
	            this._active = new DateTimeFormatterBuilder(this._active, true);
	            return this;
	        }
	    }, {
	        key: 'optionalEnd',
	        value: function optionalEnd() {
	            if (this._active._parent == null) {
	                throw new _errors.IllegalStateException('Cannot call optionalEnd() as there was no previous call to optionalStart()');
	            }
	            if (this._active._printerParsers.length > 0) {
	                var cpp = new CompositePrinterParser(this._active._printerParsers, this._active._optional);
	                this._active = this._active._parent;
	                this._appendInternal(cpp);
	            } else {
	                this._active = this._active._parent;
	            }
	            return this;
	        }
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
	    }, {
	        key: 'appendLiteral',
	        value: function appendLiteral(literal) {
	            (0, _assert.assert)(literal != null);
	            this._appendInternalPrinterParser(new StringLiteralPrinterParser(literal));
	            return this;
	        }
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
	    }, {
	        key: 'append',
	        value: function append(formatter) {
	            (0, _assert.requireNonNull)(formatter, 'formatter');
	            this._appendInternal(formatter.toPrinterParser(false));
	            return this;
	        }
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
	                        buf.setLength(length);
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
	                        return position;
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
	
	var PadPrinterParserDecorator = function () {
	    function PadPrinterParserDecorator(printerParser, padWidth, padChar) {
	        _classCallCheck(this, PadPrinterParserDecorator);
	
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
	            var strict = context.isStrict();
	            var caseSensitive = context.isCaseSensitive();
	
	            (0, _assert.assert)(!(position > text.length));
	            if (position === text.length) {
	                return ~position;
	            }
	            var endPos = position + this._padWidth;
	            if (endPos > text.length) {
	                if (strict) {
	                    return ~position;
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
	                return ~(position + pos);
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
	
	var SettingsParser = function (_Enum) {
	    _inherits(SettingsParser, _Enum);
	
	    function SettingsParser() {
	        _classCallCheck(this, SettingsParser);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(SettingsParser).apply(this, arguments));
	    }
	
	    _createClass(SettingsParser, [{
	        key: 'print',
	        value: function print() {
	            return true;
	        }
	    }, {
	        key: 'parse',
	        value: function parse(context, text, position) {
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
	
	var NumberPrinterParser = function () {
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
	            var sign = text.charAt(position);
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
	                            return ~position;
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
	                    return ~(position - 1);
	                }
	                if (total !== 0) {
	                    total = -total;
	                }
	            } else if (this._signStyle === _SignStyle.SignStyle.EXCEEDS_PAD && context.isStrict()) {
	                var parseLen = pos - position;
	                if (positive) {
	                    if (parseLen <= this._minWidth) {
	                        return ~(position - 1);
	                    }
	                } else {
	                        if (parseLen > this._minWidth) {
	                            return ~position;
	                        }
	                    }
	            }
	            return this._setValue(context, total, position, pos);
	        }
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
	
	var FractionPrinterParser = function () {
	    function FractionPrinterParser(field, minWidth, maxWidth, decimalPoint) {
	        _classCallCheck(this, FractionPrinterParser);
	
	        (0, _assert.requireNonNull)(field, 'field');
	        if (field.range().isFixed() === false) {
	            throw new _errors.IllegalArgumentException('Field must have a fixed set of values: ' + field);
	        }
	        if (minWidth < 0 || minWidth > 9) {
	            throw new _errors.IllegalArgumentException('Minimum width must be from 0 to 9 inclusive but was ' + minWidth);
	        }
	        if (maxWidth < 1 || maxWidth > 9) {
	            throw new _errors.IllegalArgumentException('Maximum width must be from 1 to 9 inclusive but was ' + maxWidth);
	        }
	        if (maxWidth < minWidth) {
	            throw new _errors.IllegalArgumentException('Maximum width must exceed or equal the minimum width but ' + maxWidth + ' < ' + minWidth);
	        }
	        this.field = field;
	        this.minWidth = minWidth;
	        this.maxWidth = maxWidth;
	        this.decimalPoint = decimalPoint;
	    }
	
	    _createClass(FractionPrinterParser, [{
	        key: 'print',
	        value: function print(context, buf) {
	            var value = context.getValue(this.field);
	            if (value === null) {
	                return false;
	            }
	            var symbols = context.symbols();
	            if (value === 0) {
	                if (this.minWidth > 0) {
	                    if (this.decimalPoint) {
	                        buf.append(symbols.decimalSeparator());
	                    }
	                    for (var i = 0; i < this.minWidth; i++) {
	                        buf.append(symbols.zeroDigit());
	                    }
	                }
	            } else {
	                var fraction = this.convertToFraction(value, symbols.zeroDigit());
	                var outputScale = Math.min(Math.max(fraction.length, this.minWidth), this.maxWidth);
	                fraction = fraction.substr(0, outputScale);
	                if (fraction * 1 > 0) {
	                    while (fraction.length > this.minWidth && fraction[fraction.length - 1] === '0') {
	                        fraction = fraction.substr(0, fraction.length - 1);
	                    }
	                }
	                var str = fraction;
	                str = symbols.convertNumberToI18N(str);
	                if (this.decimalPoint) {
	                    buf.append(symbols.decimalSeparator());
	                }
	                buf.append(str);
	            }
	            return true;
	        }
	    }, {
	        key: 'parse',
	        value: function parse(context, text, position) {
	            var effectiveMin = context.isStrict() ? this.minWidth : 0;
	            var effectiveMax = context.isStrict() ? this.maxWidth : 9;
	            var length = text.length;
	            if (position === length) {
	                return effectiveMin > 0 ? ~position : position;
	            }
	            if (this.decimalPoint) {
	                if (text[position] !== context.symbols().decimalSeparator()) {
	                    return effectiveMin > 0 ? ~position : position;
	                }
	                position++;
	            }
	            var minEndPos = position + effectiveMin;
	            if (minEndPos > length) {
	                return ~position;
	            }
	            var maxEndPos = Math.min(position + effectiveMax, length);
	            var total = 0;
	            var pos = position;
	            while (pos < maxEndPos) {
	                var ch = text.charAt(pos++);
	                var digit = context.symbols().convertToDigit(ch);
	                if (digit < 0) {
	                    if (pos < minEndPos) {
	                        return ~position;
	                    }
	                    pos--;
	                    break;
	                }
	                total = total * 10 + digit;
	            }
	            var moveLeft = pos - position;
	            var scale = Math.pow(10, moveLeft);
	            var value = this.convertFromFraction(total, scale);
	            return context.setParsedField(this.field, value, position, pos);
	        }
	    }, {
	        key: 'convertToFraction',
	        value: function convertToFraction(value, zeroDigit) {
	            var range = this.field.range();
	            range.checkValidValue(value, this.field);
	            var _min = range.minimum();
	            var _range = range.maximum() - _min + 1;
	            var _value = value - _min;
	            var _scaled = _MathUtil.MathUtil.intDiv(_value * 1000000000, _range);
	            var fraction = '' + _scaled;
	            while (fraction.length < 9) {
	                fraction = zeroDigit + fraction;
	            }
	            return fraction;
	        }
	    }, {
	        key: 'convertFromFraction',
	        value: function convertFromFraction(total, scale) {
	            var range = this.field.range();
	            var _min = range.minimum();
	            var _range = range.maximum() - _min + 1;
	            var _value = _MathUtil.MathUtil.intDiv(total * _range, scale);
	            return _value;
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            var decimal = this.decimalPoint ? ',DecimalPoint' : '';
	            return 'Fraction(' + this.field + ',' + this.minWidth + ',' + this.maxWidth + decimal + ')';
	        }
	    }]);
	
	    return FractionPrinterParser;
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
	DateTimeFormatterBuilder.PadPrinterParserDecorator = PadPrinterParserDecorator;
	DateTimeFormatterBuilder.SettingsParser = SettingsParser;
	DateTimeFormatterBuilder.CharLiteralPrinterParser = StringLiteralPrinterParser;
	DateTimeFormatterBuilder.StringLiteralPrinterParser = StringLiteralPrinterParser;
	DateTimeFormatterBuilder.NumberPrinterParser = NumberPrinterParser;
	DateTimeFormatterBuilder.FractionPrinterParser = FractionPrinterParser;
	DateTimeFormatterBuilder.StringBuilder = StringBuilder;

/***/ },
/* 33 */
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SignStyle = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Enum2 = __webpack_require__(15);
	
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
	        value: function parse(positive, strict, fixedWidth) {
	            switch (this) {
	                case SignStyle.NORMAL:
	                    return !positive || !strict;
	                case SignStyle.ALWAYS:
	                case SignStyle.EXCEEDS_PAD:
	                    return true;
	                default:
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
/* 35 */
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
	
	var _DateTimeFormatterBuilder = __webpack_require__(32);
	
	var _ChronoField = __webpack_require__(3);
	
	var _ChronoUnit = __webpack_require__(7);
	
	var _Temporal2 = __webpack_require__(17);
	
	var _TemporalQueries = __webpack_require__(19);
	
	var _TemporalQuery = __webpack_require__(20);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper                 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos  
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var DayOfWeek = function (_Temporal) {
	    _inherits(DayOfWeek, _Temporal);
	
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
	        value: function value() {
	            return this._ordinal + 1;
	        }
	    }, {
	        key: 'getDisplayName',
	        value: function getDisplayName(style, locale) {
	            return new _DateTimeFormatterBuilder.DateTimeFormatterBuilder().appendText(_ChronoField.ChronoField.DAY_OF_WEEK, style).toFormatter(locale).format(this);
	        }
	    }, {
	        key: 'isSupported',
	        value: function isSupported(field) {
	            if (field instanceof _ChronoField.ChronoField) {
	                return field === _ChronoField.ChronoField.DAY_OF_WEEK;
	            }
	            return field != null && field.isSupportedBy(this);
	        }
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
	    }, {
	        key: 'get',
	        value: function get(field) {
	            if (field === _ChronoField.ChronoField.DAY_OF_WEEK) {
	                return this.value();
	            }
	            return this.range(field).checkValidIntValue(this.getLong(field), field);
	        }
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
	    }, {
	        key: 'plus',
	        value: function plus(days) {
	            var amount = _MathUtil.MathUtil.floorMod(days, 7);
	            return ENUMS[_MathUtil.MathUtil.floorMod(this._ordinal + (amount + 7), 7)];
	        }
	    }, {
	        key: 'minus',
	        value: function minus(days) {
	            return this.plus(-1 * _MathUtil.MathUtil.floorMod(days, 7));
	        }
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
	    }, {
	        key: 'adjustInto',
	        value: function adjustInto(temporal) {
	            return temporal.with(_ChronoField.ChronoField.DAY_OF_WEEK, this.value());
	        }
	    }, {
	        key: 'equals',
	        value: function equals(other) {
	            return this === other;
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
	    }, {
	        key: 'of',
	        value: function of(dayOfWeek) {
	            if (dayOfWeek < 1 || dayOfWeek > 7) {
	                throw new _errors.DateTimeException('Invalid value for DayOfWeek: ' + dayOfWeek);
	            }
	            return ENUMS[dayOfWeek - 1];
	        }
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
	}(_Temporal2.Temporal);
	
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
	
	    DayOfWeek.FROM = (0, _TemporalQuery.createTemporalQuery)('DayOfWeek.FROM', function (temporal) {
	        return DayOfWeek.from(temporal);
	    });
	
	    ENUMS = [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY];
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ChronoLocalDateTime = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _assert = __webpack_require__(9);
	
	var _MathUtil = __webpack_require__(4);
	
	var _LocalDate = __webpack_require__(13);
	
	var _ChronoUnit = __webpack_require__(7);
	
	var _Temporal2 = __webpack_require__(17);
	
	var _TemporalQueries = __webpack_require__(19);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var ChronoLocalDateTime = function (_Temporal) {
	    _inherits(ChronoLocalDateTime, _Temporal);
	
	    function ChronoLocalDateTime() {
	        _classCallCheck(this, ChronoLocalDateTime);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ChronoLocalDateTime).apply(this, arguments));
	    }
	
	    _createClass(ChronoLocalDateTime, [{
	        key: 'chronology',
	        value: function chronology() {
	            return this.toLocalDate().chronology();
	        }
	    }, {
	        key: 'query',
	        value: function query(_query) {
	            if (_query === _TemporalQueries.TemporalQueries.chronology()) {
	                return this.chronology();
	            } else if (_query === _TemporalQueries.TemporalQueries.precision()) {
	                return _ChronoUnit.ChronoUnit.NANOS;
	            } else if (_query === _TemporalQueries.TemporalQueries.localDate()) {
	                return _LocalDate.LocalDate.ofEpochDay(this.toLocalDate().toEpochDay());
	            } else if (_query === _TemporalQueries.TemporalQueries.localTime()) {
	                return this.toLocalTime();
	            } else if (_query === _TemporalQueries.TemporalQueries.zone() || _query === _TemporalQueries.TemporalQueries.zoneId() || _query === _TemporalQueries.TemporalQueries.offset()) {
	                return null;
	            }
	            return _get(Object.getPrototypeOf(ChronoLocalDateTime.prototype), 'query', this).call(this, _query);
	        }
	    }, {
	        key: 'adjustInto',
	        value: function adjustInto(temporal) {
	            return temporal.with(_ChronoUnit.ChronoUnit.EPOCH_DAY, this.toLocalDate().toEpochDay()).with(_ChronoUnit.ChronoUnit.NANO_OF_DAY, this.toLocalTime().toNanoOfDay());
	        }
	    }, {
	        key: 'toEpochSecond',
	        value: function toEpochSecond(offset) {
	            (0, _assert.requireNonNull)(offset, 'offset');
	            var epochDay = this.toLocalDate().toEpochDay();
	            var secs = epochDay * 86400 + this.toLocalTime().toSecondOfDay();
	            secs -= offset.totalSeconds();
	            return _MathUtil.MathUtil.safeToInt(secs);
	        }
	    }]);
	
	    return ChronoLocalDateTime;
	}(_Temporal2.Temporal);

	exports.ChronoLocalDateTime = ChronoLocalDateTime;

/***/ },
/* 37 */
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
	
	var TemporalUnit = exports.TemporalUnit = function TemporalUnit() {
	  _classCallCheck(this, TemporalUnit);
	};

/***/ },
/* 38 */
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TemporalAdjusters = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _assert = __webpack_require__(9);
	
	var _errors = __webpack_require__(5);
	
	var _TemporalAdjuster4 = __webpack_require__(40);
	
	var _ChronoField = __webpack_require__(3);
	
	var _ChronoUnit = __webpack_require__(7);
	
	var _MathUtil = __webpack_require__(4);
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TemporalAdjusters = exports.TemporalAdjusters = function () {
	    function TemporalAdjusters() {
	        _classCallCheck(this, TemporalAdjusters);
	    }
	
	    _createClass(TemporalAdjusters, null, [{
	        key: 'firstDayOfMonth',
	        value: function firstDayOfMonth() {
	            return Impl.FIRST_DAY_OF_MONTH;
	        }
	    }, {
	        key: 'lastDayOfMonth',
	        value: function lastDayOfMonth() {
	            return Impl.LAST_DAY_OF_MONTH;
	        }
	    }, {
	        key: 'firstDayOfNextMonth',
	        value: function firstDayOfNextMonth() {
	            return Impl.FIRST_DAY_OF_NEXT_MONTH;
	        }
	    }, {
	        key: 'firstDayOfYear',
	        value: function firstDayOfYear() {
	            return Impl.FIRST_DAY_OF_YEAR;
	        }
	    }, {
	        key: 'lastDayOfYear',
	        value: function lastDayOfYear() {
	            return Impl.LAST_DAY_OF_YEAR;
	        }
	    }, {
	        key: 'firstDayOfNextYear',
	        value: function firstDayOfNextYear() {
	            return Impl.FIRST_DAY_OF_NEXT_YEAR;
	        }
	    }, {
	        key: 'firstInMonth',
	        value: function firstInMonth(dayOfWeek) {
	            (0, _assert.requireNonNull)(dayOfWeek, 'dayOfWeek');
	            return new DayOfWeekInMonth(1, dayOfWeek);
	        }
	    }, {
	        key: 'lastInMonth',
	        value: function lastInMonth(dayOfWeek) {
	            (0, _assert.requireNonNull)(dayOfWeek, 'dayOfWeek');
	            return new DayOfWeekInMonth(-1, dayOfWeek);
	        }
	    }, {
	        key: 'dayOfWeekInMonth',
	        value: function dayOfWeekInMonth(ordinal, dayOfWeek) {
	            (0, _assert.requireNonNull)(dayOfWeek, 'dayOfWeek');
	            return new DayOfWeekInMonth(ordinal, dayOfWeek);
	        }
	    }, {
	        key: 'next',
	        value: function next(dayOfWeek) {
	            return new RelativeDayOfWeek(2, dayOfWeek);
	        }
	    }, {
	        key: 'nextOrSame',
	        value: function nextOrSame(dayOfWeek) {
	            return new RelativeDayOfWeek(0, dayOfWeek);
	        }
	    }, {
	        key: 'previous',
	        value: function previous(dayOfWeek) {
	            return new RelativeDayOfWeek(3, dayOfWeek);
	        }
	    }, {
	        key: 'previousOrSame',
	        value: function previousOrSame(dayOfWeek) {
	            return new RelativeDayOfWeek(1, dayOfWeek);
	        }
	    }]);
	
	    return TemporalAdjusters;
	}();
	
	var Impl = function (_TemporalAdjuster) {
	    _inherits(Impl, _TemporalAdjuster);
	
	    function Impl(ordinal) {
	        _classCallCheck(this, Impl);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Impl).call(this));
	
	        _this._ordinal = ordinal;
	        return _this;
	    }
	
	    _createClass(Impl, [{
	        key: 'adjustInto',
	        value: function adjustInto(temporal) {
	            switch (this._ordinal) {
	                case 0:
	                    return temporal.with(_ChronoField.ChronoField.DAY_OF_MONTH, 1);
	                case 1:
	                    return temporal.with(_ChronoField.ChronoField.DAY_OF_MONTH, temporal.range(_ChronoField.ChronoField.DAY_OF_MONTH).maximum());
	                case 2:
	                    return temporal.with(_ChronoField.ChronoField.DAY_OF_MONTH, 1).plus(1, _ChronoUnit.ChronoUnit.MONTHS);
	                case 3:
	                    return temporal.with(_ChronoField.ChronoField.DAY_OF_YEAR, 1);
	                case 4:
	                    return temporal.with(_ChronoField.ChronoField.DAY_OF_YEAR, temporal.range(_ChronoField.ChronoField.DAY_OF_YEAR).maximum());
	                case 5:
	                    return temporal.with(_ChronoField.ChronoField.DAY_OF_YEAR, 1).plus(1, _ChronoUnit.ChronoUnit.YEARS);
	            }
	            throw new _errors.IllegalStateException('Unreachable');
	        }
	    }]);
	
	    return Impl;
	}(_TemporalAdjuster4.TemporalAdjuster);
	
	Impl.FIRST_DAY_OF_MONTH = new Impl(0);
	
	Impl.LAST_DAY_OF_MONTH = new Impl(1);
	
	Impl.FIRST_DAY_OF_NEXT_MONTH = new Impl(2);
	
	Impl.FIRST_DAY_OF_YEAR = new Impl(3);
	
	Impl.LAST_DAY_OF_YEAR = new Impl(4);
	
	Impl.FIRST_DAY_OF_NEXT_YEAR = new Impl(5);
	
	var DayOfWeekInMonth = function (_TemporalAdjuster2) {
	    _inherits(DayOfWeekInMonth, _TemporalAdjuster2);
	
	    function DayOfWeekInMonth(ordinal, dow) {
	        _classCallCheck(this, DayOfWeekInMonth);
	
	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(DayOfWeekInMonth).call(this));
	
	        _this2._ordinal = ordinal;
	        _this2._dowValue = dow.value();
	        return _this2;
	    }
	
	    _createClass(DayOfWeekInMonth, [{
	        key: 'adjustInto',
	        value: function adjustInto(temporal) {
	            if (this._ordinal >= 0) {
	                var temp = temporal.with(_ChronoField.ChronoField.DAY_OF_MONTH, 1);
	                var curDow = temp.get(_ChronoField.ChronoField.DAY_OF_WEEK);
	                var dowDiff = _MathUtil.MathUtil.intMod(this._dowValue - curDow + 7, 7);
	                dowDiff += (this._ordinal - 1) * 7;
	                return temp.plus(dowDiff, _ChronoUnit.ChronoUnit.DAYS);
	            } else {
	                var temp = temporal.with(_ChronoField.ChronoField.DAY_OF_MONTH, temporal.range(_ChronoField.ChronoField.DAY_OF_MONTH).maximum());
	                var curDow = temp.get(_ChronoField.ChronoField.DAY_OF_WEEK);
	                var daysDiff = this._dowValue - curDow;
	                daysDiff = daysDiff === 0 ? 0 : daysDiff > 0 ? daysDiff - 7 : daysDiff;
	                daysDiff -= (-this._ordinal - 1) * 7;
	                return temp.plus(daysDiff, _ChronoUnit.ChronoUnit.DAYS);
	            }
	        }
	    }]);
	
	    return DayOfWeekInMonth;
	}(_TemporalAdjuster4.TemporalAdjuster);
	
	var RelativeDayOfWeek = function (_TemporalAdjuster3) {
	    _inherits(RelativeDayOfWeek, _TemporalAdjuster3);
	
	    function RelativeDayOfWeek(relative, dayOfWeek) {
	        _classCallCheck(this, RelativeDayOfWeek);
	
	        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(RelativeDayOfWeek).call(this));
	
	        (0, _assert.requireNonNull)(dayOfWeek, 'dayOfWeek');
	
	        _this3._relative = relative;
	
	        _this3._dowValue = dayOfWeek.value();
	        return _this3;
	    }
	
	    _createClass(RelativeDayOfWeek, [{
	        key: 'adjustInto',
	        value: function adjustInto(temporal) {
	            var calDow = temporal.get(_ChronoField.ChronoField.DAY_OF_WEEK);
	            if (this._relative < 2 && calDow === this._dowValue) {
	                return temporal;
	            }
	            if ((this._relative & 1) === 0) {
	                var daysDiff = calDow - this._dowValue;
	                return temporal.plus(daysDiff >= 0 ? 7 - daysDiff : -daysDiff, _ChronoUnit.ChronoUnit.DAYS);
	            } else {
	                var daysDiff = this._dowValue - calDow;
	                return temporal.minus(daysDiff >= 0 ? 7 - daysDiff : -daysDiff, _ChronoUnit.ChronoUnit.DAYS);
	            }
	        }
	    }]);
	
	    return RelativeDayOfWeek;
	}(_TemporalAdjuster4.TemporalAdjuster);

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';
	
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
	
	var TemporalAdjuster = exports.TemporalAdjuster = function () {
	  function TemporalAdjuster() {
	    _classCallCheck(this, TemporalAdjuster);
	  }
	
	  _createClass(TemporalAdjuster, [{
	    key: 'adjustInto',
	    value: function adjustInto(temporal) {
	      throw Error('abstract');
	    }
	  }]);
	
	  return TemporalAdjuster;
	}();

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _DayOfWeek = __webpack_require__(35);
	
	var _Duration = __webpack_require__(8);
	
	var _Instant = __webpack_require__(2);
	
	var _LocalDate = __webpack_require__(13);
	
	var _LocalTime = __webpack_require__(11);
	
	var _LocalDateTime = __webpack_require__(12);
	
	var _Month = __webpack_require__(16);
	
	var _Period = __webpack_require__(31);
	
	var _Year = __webpack_require__(22);
	
	var _ZoneOffset = __webpack_require__(21);
	
	var _IsoChronology = __webpack_require__(14);
	
	var _DateTimeFormatter = __webpack_require__(26);
	
	var _ChronoField = __webpack_require__(3);
	
	var _ChronoUnit = __webpack_require__(7);
	
	var _TemporalQueries = __webpack_require__(19);
	
	var isInit = false; /*
	                     * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                     * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                     */
	
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
	    (0, _LocalDateTime._init)();
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