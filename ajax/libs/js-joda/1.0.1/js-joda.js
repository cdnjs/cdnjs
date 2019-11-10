//! @version js-joda - 1.0.1
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
	
	exports.__esModule = true;
	exports.ResolverStyle = exports.DateTimeFormatterBuilder = exports.DateTimeFormatter = exports.TemporalQueries = exports.TemporalAdjusters = exports.IsoFields = exports.ChronoUnit = exports.ChronoField = exports.nativeJs = exports.ZoneId = exports.ZoneOffset = exports.ZonedDateTime = exports.Year = exports.Period = exports.Month = exports.LocalDateTime = exports.LocalTime = exports.LocalDate = exports.Instant = exports.Duration = exports.DayOfWeek = exports.DateTimeParseException = exports.DateTimeException = exports.Clock = undefined;
	
	var _Clock = __webpack_require__(1);
	
	Object.defineProperty(exports, 'Clock', {
	  enumerable: true,
	  get: function get() {
	    return _Clock.Clock;
	  }
	});
	
	var _errors = __webpack_require__(3);
	
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
	
	var _DayOfWeek = __webpack_require__(45);
	
	Object.defineProperty(exports, 'DayOfWeek', {
	  enumerable: true,
	  get: function get() {
	    return _DayOfWeek.DayOfWeek;
	  }
	});
	
	var _Duration = __webpack_require__(14);
	
	Object.defineProperty(exports, 'Duration', {
	  enumerable: true,
	  get: function get() {
	    return _Duration.Duration;
	  }
	});
	
	var _Instant = __webpack_require__(4);
	
	Object.defineProperty(exports, 'Instant', {
	  enumerable: true,
	  get: function get() {
	    return _Instant.Instant;
	  }
	});
	
	var _LocalDate = __webpack_require__(8);
	
	Object.defineProperty(exports, 'LocalDate', {
	  enumerable: true,
	  get: function get() {
	    return _LocalDate.LocalDate;
	  }
	});
	
	var _LocalTime = __webpack_require__(5);
	
	Object.defineProperty(exports, 'LocalTime', {
	  enumerable: true,
	  get: function get() {
	    return _LocalTime.LocalTime;
	  }
	});
	
	var _LocalDateTime = __webpack_require__(7);
	
	Object.defineProperty(exports, 'LocalDateTime', {
	  enumerable: true,
	  get: function get() {
	    return _LocalDateTime.LocalDateTime;
	  }
	});
	
	var _Month = __webpack_require__(11);
	
	Object.defineProperty(exports, 'Month', {
	  enumerable: true,
	  get: function get() {
	    return _Month.Month;
	  }
	});
	
	var _Period = __webpack_require__(27);
	
	Object.defineProperty(exports, 'Period', {
	  enumerable: true,
	  get: function get() {
	    return _Period.Period;
	  }
	});
	
	var _Year = __webpack_require__(16);
	
	Object.defineProperty(exports, 'Year', {
	  enumerable: true,
	  get: function get() {
	    return _Year.Year;
	  }
	});
	
	var _ZonedDateTime = __webpack_require__(46);
	
	Object.defineProperty(exports, 'ZonedDateTime', {
	  enumerable: true,
	  get: function get() {
	    return _ZonedDateTime.ZonedDateTime;
	  }
	});
	
	var _ZoneOffset = __webpack_require__(36);
	
	Object.defineProperty(exports, 'ZoneOffset', {
	  enumerable: true,
	  get: function get() {
	    return _ZoneOffset.ZoneOffset;
	  }
	});
	
	var _ZoneId = __webpack_require__(37);
	
	Object.defineProperty(exports, 'ZoneId', {
	  enumerable: true,
	  get: function get() {
	    return _ZoneId.ZoneId;
	  }
	});
	
	var _NativeJsTemporal = __webpack_require__(49);
	
	Object.defineProperty(exports, 'nativeJs', {
	  enumerable: true,
	  get: function get() {
	    return _NativeJsTemporal.nativeJs;
	  }
	});
	
	var _ChronoField = __webpack_require__(12);
	
	Object.defineProperty(exports, 'ChronoField', {
	  enumerable: true,
	  get: function get() {
	    return _ChronoField.ChronoField;
	  }
	});
	
	var _ChronoUnit = __webpack_require__(13);
	
	Object.defineProperty(exports, 'ChronoUnit', {
	  enumerable: true,
	  get: function get() {
	    return _ChronoUnit.ChronoUnit;
	  }
	});
	
	var _IsoFields = __webpack_require__(50);
	
	Object.defineProperty(exports, 'IsoFields', {
	  enumerable: true,
	  get: function get() {
	    return _IsoFields.IsoFields;
	  }
	});
	
	var _TemporalAdjusters = __webpack_require__(51);
	
	Object.defineProperty(exports, 'TemporalAdjusters', {
	  enumerable: true,
	  get: function get() {
	    return _TemporalAdjusters.TemporalAdjusters;
	  }
	});
	
	var _TemporalQueries = __webpack_require__(22);
	
	Object.defineProperty(exports, 'TemporalQueries', {
	  enumerable: true,
	  get: function get() {
	    return _TemporalQueries.TemporalQueries;
	  }
	});
	
	var _DateTimeFormatter = __webpack_require__(26);
	
	Object.defineProperty(exports, 'DateTimeFormatter', {
	  enumerable: true,
	  get: function get() {
	    return _DateTimeFormatter.DateTimeFormatter;
	  }
	});
	
	var _DateTimeFormatterBuilder = __webpack_require__(33);
	
	Object.defineProperty(exports, 'DateTimeFormatterBuilder', {
	  enumerable: true,
	  get: function get() {
	    return _DateTimeFormatterBuilder.DateTimeFormatterBuilder;
	  }
	});
	
	var _ResolverStyle = __webpack_require__(23);
	
	Object.defineProperty(exports, 'ResolverStyle', {
	  enumerable: true,
	  get: function get() {
	    return _ResolverStyle.ResolverStyle;
	  }
	});
	
	__webpack_require__(53);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.Clock = undefined;
	
	var _assert = __webpack_require__(2);
	
	var _Instant = __webpack_require__(4);
	
	var _ZoneId = __webpack_require__(37);
	
	var _ZoneOffset = __webpack_require__(36);
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                           * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                           * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                           */
	
	var Clock = exports.Clock = function () {
	    function Clock() {
	        _classCallCheck(this, Clock);
	    }
	
	    Clock.systemUTC = function systemUTC() {
	        return new SystemClock(_ZoneOffset.ZoneOffset.UTC);
	    };
	
	    Clock.systemDefaultZone = function systemDefaultZone() {
	        return new SystemClock(_ZoneId.ZoneId.systemDefault());
	    };
	
	    Clock.system = function system(zone) {
	        return new SystemClock(zone);
	    };
	
	    Clock.fixed = function fixed(fixedInstant, zoneOffset) {
	        return new FixedClock(fixedInstant, zoneOffset);
	    };
	
	    Clock.prototype.millis = function millis() {
	        (0, _assert.abstractMethodFail)('Clock.millis');
	    };
	
	    Clock.prototype.instant = function instant() {
	        (0, _assert.abstractMethodFail)('Clock.instant');
	    };
	
	    Clock.prototype.zone = function zone() {
	        (0, _assert.abstractMethodFail)('Clock.zone');
	    };
	
	    return Clock;
	}();
	
	var SystemClock = function (_Clock) {
	    _inherits(SystemClock, _Clock);
	
	    function SystemClock(zone) {
	        _classCallCheck(this, SystemClock);
	
	        (0, _assert.requireNonNull)(zone, 'zone');
	
	        var _this = _possibleConstructorReturn(this, _Clock.call(this));
	
	        _this._zone = zone;
	        return _this;
	    }
	
	    SystemClock.prototype.zone = function zone() {
	        return this._zone;
	    };
	
	    SystemClock.prototype.millis = function millis() {
	        return new Date().getTime();
	    };
	
	    SystemClock.prototype.instant = function instant() {
	        return _Instant.Instant.ofEpochMilli(this.millis());
	    };
	
	    SystemClock.prototype.toString = function toString() {
	        return 'SystemClock[' + this._zone.toString() + ']';
	    };
	
	    return SystemClock;
	}(Clock);
	
	var FixedClock = function (_Clock2) {
	    _inherits(FixedClock, _Clock2);
	
	    function FixedClock(fixedInstant, zoneId) {
	        _classCallCheck(this, FixedClock);
	
	        var _this2 = _possibleConstructorReturn(this, _Clock2.call(this));
	
	        _this2._instant = fixedInstant;
	        _this2._zoneId = zoneId;
	        return _this2;
	    }
	
	    FixedClock.prototype.instant = function instant() {
	        return this._instant;
	    };
	
	    FixedClock.prototype.millis = function millis() {
	        return this._instant.toEpochMilli();
	    };
	
	    FixedClock.prototype.zone = function zone() {
	        return this._zoneId;
	    };
	
	    FixedClock.prototype.toString = function toString() {
	        return 'FixedClock[]';
	    };
	
	    return FixedClock;
	}(Clock);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.assert = assert;
	exports.requireNonNull = requireNonNull;
	exports.requireInstance = requireInstance;
	exports.abstractMethodFail = abstractMethodFail;
	
	var _errors = __webpack_require__(3);
	
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
	
	function abstractMethodFail(methodName) {
	    throw new TypeError('abstract mehod "' + methodName + '" is not implemented');
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	/**
	 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	 */
	
	function createErrorType(name, init) {
	    var superErrorClass = arguments.length <= 2 || arguments[2] === undefined ? Error : arguments[2];
	
	    function E(message) {
	        if (!Error.captureStackTrace) {
	            this.stack = new Error().stack;
	        } else {
	            Error.captureStackTrace(this, this.constructor);
	        }
	        this.message = message;
	        init && init.apply(this, arguments);
	    }
	    E.prototype = new superErrorClass();
	    E.prototype.name = name;
	    E.prototype.constructor = E;
	    return E;
	}
	
	var DateTimeException = exports.DateTimeException = createErrorType('DateTimeException', messageWithCause);
	var DateTimeParseException = exports.DateTimeParseException = createErrorType('DateTimeParseException', messageForDateTimeParseException);
	var UnsupportedTemporalTypeException = exports.UnsupportedTemporalTypeException = createErrorType('UnsupportedTemporalTypeException', null, DateTimeException);
	var ArithmeticException = exports.ArithmeticException = createErrorType('ArithmeticException');
	var IllegalArgumentException = exports.IllegalArgumentException = createErrorType('IllegalArgumentException');
	var IllegalStateException = exports.IllegalStateException = createErrorType('IllegalStateException');
	var NullPointerException = exports.NullPointerException = createErrorType('NullPointerException');
	
	function messageWithCause(message) {
	    var cause = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
	    var msg = message || this.name;
	    if (cause !== null && cause instanceof Error) {
	        msg += '\n-------\nCaused by: ' + cause.stack + '\n-------\n';
	    }
	    this.message = msg;
	}
	
	function messageForDateTimeParseException(message) {
	    var text = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	    var index = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	    var cause = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	
	    var msg = message || this.name;
	    msg += ': ' + text + ', at index: ' + index;
	    if (cause !== null && cause instanceof Error) {
	        msg += '\n-------\nCaused by: ' + cause.stack + '\n-------\n';
	    }
	    this.message = msg;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.Instant = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports._init = _init;
	
	var _assert = __webpack_require__(2);
	
	var _errors = __webpack_require__(3);
	
	var _Clock = __webpack_require__(1);
	
	var _LocalTime = __webpack_require__(5);
	
	var _MathUtil = __webpack_require__(6);
	
	var _Temporal2 = __webpack_require__(20);
	
	var _ChronoField = __webpack_require__(12);
	
	var _ChronoUnit = __webpack_require__(13);
	
	var _TemporalQueries = __webpack_require__(22);
	
	var _TemporalQuery = __webpack_require__(25);
	
	var _DateTimeFormatter = __webpack_require__(26);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var NANOS_PER_MILLI = 1000000;
	
	var Instant = function (_Temporal) {
	    _inherits(Instant, _Temporal);
	
	    Instant.now = function now() {
	        var clock = arguments.length <= 0 || arguments[0] === undefined ? _Clock.Clock.systemUTC() : arguments[0];
	
	        return clock.instant();
	    };
	
	    Instant.ofEpochSecond = function ofEpochSecond(epochSecond) {
	        var nanoAdjustment = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	        var secs = epochSecond + _MathUtil.MathUtil.floorDiv(nanoAdjustment, _LocalTime.LocalTime.NANOS_PER_SECOND);
	        var nos = _MathUtil.MathUtil.floorMod(nanoAdjustment, _LocalTime.LocalTime.NANOS_PER_SECOND);
	        return Instant._create(secs, nos);
	    };
	
	    Instant.ofEpochMilli = function ofEpochMilli(epochMilli) {
	        var secs = _MathUtil.MathUtil.floorDiv(epochMilli, 1000);
	        var mos = _MathUtil.MathUtil.floorMod(epochMilli, 1000);
	        return Instant._create(secs, mos * 1000000);
	    };
	
	    Instant.from = function from(temporal) {
	        try {
	            var instantSecs = temporal.getLong(_ChronoField.ChronoField.INSTANT_SECONDS);
	            var nanoOfSecond = temporal.get(_ChronoField.ChronoField.NANO_OF_SECOND);
	            return Instant.ofEpochSecond(instantSecs, nanoOfSecond);
	        } catch (ex) {
	            throw new _errors.DateTimeException('Unable to obtain Instant from TemporalAccessor: ' + temporal + ', type ' + (typeof temporal === 'undefined' ? 'undefined' : _typeof(temporal)), ex);
	        }
	    };
	
	    Instant.parse = function parse(text) {
	        return _DateTimeFormatter.DateTimeFormatter.ISO_INSTANT.parse(text, Instant.FROM);
	    };
	
	    Instant._create = function _create(seconds, nanoOfSecond) {
	        if (seconds === 0 && nanoOfSecond === 0) {
	            return Instant.EPOCH;
	        }
	        return new Instant(seconds, nanoOfSecond);
	    };
	
	    Instant._validate = function _validate(seconds, nanoOfSecond) {
	        if (seconds < Instant.MIN_SECONDS || seconds > Instant.MAX_SECONDS) {
	            throw new _errors.DateTimeException('Instant exceeds minimum or maximum instant');
	        }
	        if (nanoOfSecond < 0 || nanoOfSecond > _LocalTime.LocalTime.NANOS_PER_SECOND) {
	            throw new _errors.DateTimeException('Instant exceeds minimum or maximum instant');
	        }
	    };
	
	    function Instant(seconds, nanoOfSecond) {
	        _classCallCheck(this, Instant);
	
	        var _this = _possibleConstructorReturn(this, _Temporal.call(this));
	
	        Instant._validate(seconds, nanoOfSecond);
	        _this._seconds = seconds;
	        _this._nanos = nanoOfSecond;
	        return _this;
	    }
	
	    Instant.prototype.isSupported = function isSupported(fieldOrUnit) {
	        if (fieldOrUnit instanceof _ChronoField.ChronoField) {
	            return fieldOrUnit === _ChronoField.ChronoField.INSTANT_SECONDS || fieldOrUnit === _ChronoField.ChronoField.NANO_OF_SECOND || fieldOrUnit === _ChronoField.ChronoField.MICRO_OF_SECOND || fieldOrUnit === _ChronoField.ChronoField.MILLI_OF_SECOND;
	        }
	        if (fieldOrUnit instanceof _ChronoUnit.ChronoUnit) {
	            return fieldOrUnit.isTimeBased() || fieldOrUnit === _ChronoUnit.ChronoUnit.DAYS;
	        }
	        return fieldOrUnit != null && fieldOrUnit.isSupportedBy(this);
	    };
	
	    Instant.prototype.range = function range(field) {
	        return _Temporal.prototype.range.call(this, field);
	    };
	
	    Instant.prototype.get = function get(field) {
	        return this.getLong(field);
	    };
	
	    Instant.prototype.getLong = function getLong(field) {
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
	    };
	
	    Instant.prototype.epochSecond = function epochSecond() {
	        return this._seconds;
	    };
	
	    Instant.prototype.nano = function nano() {
	        return this._nanos;
	    };
	
	    Instant.prototype.with = function _with(adjusterOrField, newValue) {
	        if (arguments.length === 1) {
	            return this.withTemporalAdjuster(adjusterOrField);
	        } else {
	            return this.with2(adjusterOrField, newValue);
	        }
	    };
	
	    Instant.prototype.withTemporalAdjuster = function withTemporalAdjuster(adjuster) {
	        (0, _assert.requireNonNull)(adjuster, 'adjuster');
	        return adjuster.adjustInto(this);
	    };
	
	    Instant.prototype.with2 = function with2(field, newValue) {
	        (0, _assert.requireNonNull)(field, 'field');
	        if (field instanceof _ChronoField.ChronoField) {
	            field.checkValidValue(newValue);
	            switch (field) {
	                case _ChronoField.ChronoField.MILLI_OF_SECOND:
	                    {
	                        var nval = newValue * NANOS_PER_MILLI;
	                        return nval !== this._nanos ? Instant._create(this._seconds, nval) : this;
	                    }
	                case _ChronoField.ChronoField.MICRO_OF_SECOND:
	                    {
	                        var _nval = newValue * 1000;
	                        return _nval !== this._nanos ? Instant._create(this._seconds, _nval) : this;
	                    }
	                case _ChronoField.ChronoField.NANO_OF_SECOND:
	                    return newValue !== this._nanos ? Instant._create(this._seconds, newValue) : this;
	                case _ChronoField.ChronoField.INSTANT_SECONDS:
	                    return newValue !== this._seconds ? Instant._create(newValue, this._nanos) : this;
	            }
	            throw new _errors.UnsupportedTemporalTypeException('Unsupported field: ' + field);
	        }
	        return field.adjustInto(this, newValue);
	    };
	
	    Instant.prototype.truncatedTo = function truncatedTo(unit) {
	        (0, _assert.requireNonNull)(unit, 'unit');
	        if (unit === _ChronoUnit.ChronoUnit.NANOS) {
	            return this;
	        }
	        var unitDur = unit.duration();
	        if (unitDur.seconds() > _LocalTime.LocalTime.SECONDS_PER_DAY) {
	            throw new _errors.DateTimeException('Unit is too large to be used for truncation');
	        }
	        var dur = unitDur.toNanos();
	        if (_MathUtil.MathUtil.intMod(_LocalTime.LocalTime.NANOS_PER_DAY, dur) !== 0) {
	            throw new _errors.DateTimeException('Unit must divide into a standard day without remainder');
	        }
	        var nod = _MathUtil.MathUtil.intMod(this._seconds, _LocalTime.LocalTime.SECONDS_PER_DAY) * _LocalTime.LocalTime.NANOS_PER_SECOND + this._nanos;
	        var result = _MathUtil.MathUtil.intDiv(nod, dur) * dur;
	        return this.plusNanos(result - nod);
	    };
	
	    Instant.prototype.plus = function plus(amount, unit) {
	        if (arguments.length === 1) {
	            return this.plus1(amount);
	        } else {
	            return this.plus2(amount, unit);
	        }
	    };
	
	    Instant.prototype.plus1 = function plus1(amount) {
	        (0, _assert.requireNonNull)(amount, 'amount');
	        return amount.addTo(this);
	    };
	
	    Instant.prototype.plus2 = function plus2(amountToAdd, unit) {
	        if (unit instanceof _ChronoUnit.ChronoUnit) {
	            switch (unit) {
	                case _ChronoUnit.ChronoUnit.NANOS:
	                    return this.plusNanos(amountToAdd);
	                case _ChronoUnit.ChronoUnit.MICROS:
	                    return this._plus(_MathUtil.MathUtil.intDiv(amountToAdd, 1000000), _MathUtil.MathUtil.intMod(amountToAdd, 1000000) * 1000);
	                case _ChronoUnit.ChronoUnit.MILLIS:
	                    return this.plusMillis(amountToAdd);
	                case _ChronoUnit.ChronoUnit.SECONDS:
	                    return this.plusSeconds(amountToAdd);
	                case _ChronoUnit.ChronoUnit.MINUTES:
	                    return this.plusSeconds(_MathUtil.MathUtil.safeMultiply(amountToAdd, _LocalTime.LocalTime.SECONDS_PER_MINUTE));
	                case _ChronoUnit.ChronoUnit.HOURS:
	                    return this.plusSeconds(_MathUtil.MathUtil.safeMultiply(amountToAdd, _LocalTime.LocalTime.SECONDS_PER_HOUR));
	                case _ChronoUnit.ChronoUnit.HALF_DAYS:
	                    return this.plusSeconds(_MathUtil.MathUtil.safeMultiply(amountToAdd, _LocalTime.LocalTime.SECONDS_PER_DAY / 2));
	                case _ChronoUnit.ChronoUnit.DAYS:
	                    return this.plusSeconds(_MathUtil.MathUtil.safeMultiply(amountToAdd, _LocalTime.LocalTime.SECONDS_PER_DAY));
	            }
	            throw new _errors.UnsupportedTemporalTypeException('Unsupported unit: ' + unit);
	        }
	        return unit.addTo(this, amountToAdd);
	    };
	
	    Instant.prototype.plusSeconds = function plusSeconds(secondsToAdd) {
	        return this._plus(secondsToAdd, 0);
	    };
	
	    Instant.prototype.plusMillis = function plusMillis(millisToAdd) {
	        return this._plus(_MathUtil.MathUtil.intDiv(millisToAdd, 1000), _MathUtil.MathUtil.intMod(millisToAdd, 1000) * NANOS_PER_MILLI);
	    };
	
	    Instant.prototype.plusNanos = function plusNanos(nanosToAdd) {
	        return this._plus(0, nanosToAdd);
	    };
	
	    Instant.prototype._plus = function _plus(secondsToAdd, nanosToAdd) {
	        if ((secondsToAdd | nanosToAdd) === 0) {
	            return this;
	        }
	        var epochSec = this._seconds + secondsToAdd;
	        epochSec = epochSec + _MathUtil.MathUtil.intDiv(nanosToAdd, _LocalTime.LocalTime.NANOS_PER_SECOND);
	        var _nanosToAdd = nanosToAdd % _LocalTime.LocalTime.NANOS_PER_SECOND;
	        var nanoAdjustment = this._nanos + _nanosToAdd;
	        return Instant.ofEpochSecond(epochSec, nanoAdjustment);
	    };
	
	    Instant.prototype.minus = function minus(amount, unit) {
	        if (arguments.length === 1) {
	            return this.minus1(amount);
	        } else {
	            return this.minus2(amount, unit);
	        }
	    };
	
	    Instant.prototype.minus1 = function minus1(amount) {
	        (0, _assert.requireNonNull)(amount, 'amount');
	        return amount.subtractFrom(this);
	    };
	
	    Instant.prototype.minus2 = function minus2(amountToSubtract, unit) {
	        return this.plus2(-1 * amountToSubtract, unit);
	    };
	
	    Instant.prototype.minusSeconds = function minusSeconds(secondsToSubtract) {
	        return this.plusSeconds(secondsToSubtract * -1);
	    };
	
	    Instant.prototype.minusMillis = function minusMillis(millisToSubtract) {
	        return this.plusMillis(-1 * millisToSubtract);
	    };
	
	    Instant.prototype.minusNanos = function minusNanos(nanosToSubtract) {
	        return this.plusNanos(-1 * nanosToSubtract);
	    };
	
	    Instant.prototype.query = function query(_query) {
	        (0, _assert.requireNonNull)(_query, 'query');
	        if (_query === _TemporalQueries.TemporalQueries.precision()) {
	            return _ChronoUnit.ChronoUnit.NANOS;
	        }
	
	        if (_query === _TemporalQueries.TemporalQueries.localDate() || _query === _TemporalQueries.TemporalQueries.localTime() || _query === _TemporalQueries.TemporalQueries.chronology() || _query === _TemporalQueries.TemporalQueries.zoneId() || _query === _TemporalQueries.TemporalQueries.zone() || _query === _TemporalQueries.TemporalQueries.offset()) {
	            return null;
	        }
	        return _query.queryFrom(this);
	    };
	
	    Instant.prototype.adjustInto = function adjustInto(temporal) {
	        (0, _assert.requireNonNull)(temporal, 'temporal');
	        return temporal.with(_ChronoField.ChronoField.INSTANT_SECONDS, this._seconds).with(_ChronoField.ChronoField.NANO_OF_SECOND, this._nanos);
	    };
	
	    Instant.prototype.until = function until(endExclusive, unit) {
	        var end = Instant.from(endExclusive);
	        if (unit instanceof _ChronoUnit.ChronoUnit) {
	            switch (unit) {
	                case _ChronoUnit.ChronoUnit.NANOS:
	                    return this._nanosUntil(end);
	                case _ChronoUnit.ChronoUnit.MICROS:
	                    return _MathUtil.MathUtil.intDiv(this._nanosUntil(end), 1000);
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
	    };
	
	    Instant.prototype._nanosUntil = function _nanosUntil(end) {
	        var secsDiff = _MathUtil.MathUtil.safeSubtract(end.epochSecond(), this.epochSecond());
	        var totalNanos = _MathUtil.MathUtil.safeMultiply(secsDiff, _LocalTime.LocalTime.NANOS_PER_SECOND);
	        return _MathUtil.MathUtil.safeAdd(totalNanos, end.nano() - this.nano());
	    };
	
	    Instant.prototype._secondsUntil = function _secondsUntil(end) {
	        var secsDiff = _MathUtil.MathUtil.safeSubtract(end.epochSecond(), this.epochSecond());
	        var nanosDiff = end.nano() - this.nano();
	        if (secsDiff > 0 && nanosDiff < 0) {
	            secsDiff--;
	        } else if (secsDiff < 0 && nanosDiff > 0) {
	            secsDiff++;
	        }
	        return secsDiff;
	    };
	
	    Instant.prototype.toEpochMilli = function toEpochMilli() {
	        var millis = _MathUtil.MathUtil.safeMultiply(this._seconds, 1000);
	        return millis + _MathUtil.MathUtil.intDiv(this._nanos, NANOS_PER_MILLI);
	    };
	
	    Instant.prototype.compareTo = function compareTo(otherInstant) {
	        (0, _assert.requireNonNull)(otherInstant, 'otherInstant');
	        (0, _assert.requireInstance)(otherInstant, Instant, 'otherInstant');
	        var cmp = _MathUtil.MathUtil.compareNumbers(this._seconds, otherInstant._seconds);
	        if (cmp !== 0) {
	            return cmp;
	        }
	        return this._nanos - otherInstant._nanos;
	    };
	
	    Instant.prototype.isAfter = function isAfter(otherInstant) {
	        return this.compareTo(otherInstant) > 0;
	    };
	
	    Instant.prototype.isBefore = function isBefore(otherInstant) {
	        return this.compareTo(otherInstant) < 0;
	    };
	
	    Instant.prototype.equals = function equals(otherInstant) {
	        if (this === otherInstant) {
	            return true;
	        }
	        if (otherInstant instanceof Instant) {
	            return this.epochSecond() === otherInstant.epochSecond() && this.nano() === otherInstant.nano();
	        }
	        return false;
	    };
	
	    Instant.prototype.hashCode = function hashCode() {
	        return (this._seconds ^ this._seconds >>> 24) + 51 * this._nanos;
	    };
	
	    Instant.prototype.toString = function toString() {
	        return _DateTimeFormatter.DateTimeFormatter.ISO_INSTANT.format(this);
	    };
	
	    return Instant;
	}(_Temporal2.Temporal);
	
	exports.Instant = Instant;
	function _init() {
	    Instant.MIN_SECONDS = -31619119219200;
	    Instant.MAX_SECONDS = 31494816403199;
	    Instant.EPOCH = new Instant(0, 0);
	    Instant.MIN = Instant.ofEpochSecond(Instant.MIN_SECONDS, 0);
	    Instant.MAX = Instant.ofEpochSecond(Instant.MAX_SECONDS, 999999999);
	    Instant.FROM = (0, _TemporalQuery.createTemporalQuery)('Instant.FROM', function (temporal) {
	        return Instant.from(temporal);
	    });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.LocalTime = undefined;
	exports._init = _init;
	
	var _MathUtil = __webpack_require__(6);
	
	var _assert = __webpack_require__(2);
	
	var _errors = __webpack_require__(3);
	
	var _Clock = __webpack_require__(1);
	
	var _LocalDateTime = __webpack_require__(7);
	
	var _ZoneId = __webpack_require__(37);
	
	var _DateTimeFormatter = __webpack_require__(26);
	
	var _ChronoField = __webpack_require__(12);
	
	var _ChronoUnit = __webpack_require__(13);
	
	var _Temporal2 = __webpack_require__(20);
	
	var _TemporalQueries = __webpack_require__(22);
	
	var _TemporalQuery = __webpack_require__(25);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var LocalTime = function (_Temporal) {
	    _inherits(LocalTime, _Temporal);
	
	    LocalTime.now = function now(clockOrZone) {
	        if (clockOrZone == null) {
	            return LocalTime._now(_Clock.Clock.systemDefaultZone());
	        } else if (clockOrZone instanceof _Clock.Clock) {
	            return LocalTime._now(clockOrZone);
	        } else {
	            return LocalTime._now(_Clock.Clock.system(clockOrZone));
	        }
	    };
	
	    LocalTime._now = function _now() {
	        var clock = arguments.length <= 0 || arguments[0] === undefined ? _Clock.Clock.systemDefaultZone() : arguments[0];
	
	        (0, _assert.requireNonNull)(clock, 'clock');
	        return LocalTime.ofInstant(clock.instant(), clock.zone());
	    };
	
	    LocalTime.ofInstant = function ofInstant(instant) {
	        var zone = arguments.length <= 1 || arguments[1] === undefined ? _ZoneId.ZoneId.systemDefault() : arguments[1];
	
	        var offset = zone.rules().offset(instant);
	        var secsOfDay = _MathUtil.MathUtil.intMod(instant.epochSecond(), LocalTime.SECONDS_PER_DAY);
	        secsOfDay = _MathUtil.MathUtil.intMod(secsOfDay + offset.totalSeconds(), LocalTime.SECONDS_PER_DAY);
	        if (secsOfDay < 0) {
	            secsOfDay += LocalTime.SECONDS_PER_DAY;
	        }
	        return LocalTime.ofSecondOfDay(secsOfDay, instant.nano());
	    };
	
	    LocalTime.of = function of(hour, minute, second, nanoOfSecond) {
	        return new LocalTime(hour, minute, second, nanoOfSecond);
	    };
	
	    LocalTime.ofSecondOfDay = function ofSecondOfDay() {
	        var secondOfDay = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var nanoOfSecond = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	        _ChronoField.ChronoField.SECOND_OF_DAY.checkValidValue(secondOfDay);
	        _ChronoField.ChronoField.NANO_OF_SECOND.checkValidValue(nanoOfSecond);
	        var hours = _MathUtil.MathUtil.intDiv(secondOfDay, LocalTime.SECONDS_PER_HOUR);
	        secondOfDay -= hours * LocalTime.SECONDS_PER_HOUR;
	        var minutes = _MathUtil.MathUtil.intDiv(secondOfDay, LocalTime.SECONDS_PER_MINUTE);
	        secondOfDay -= minutes * LocalTime.SECONDS_PER_MINUTE;
	        return new LocalTime(hours, minutes, secondOfDay, nanoOfSecond);
	    };
	
	    LocalTime.ofNanoOfDay = function ofNanoOfDay() {
	        var nanoOfDay = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	        _ChronoField.ChronoField.NANO_OF_DAY.checkValidValue(nanoOfDay);
	        var hours = _MathUtil.MathUtil.intDiv(nanoOfDay, LocalTime.NANOS_PER_HOUR);
	        nanoOfDay -= hours * LocalTime.NANOS_PER_HOUR;
	        var minutes = _MathUtil.MathUtil.intDiv(nanoOfDay, LocalTime.NANOS_PER_MINUTE);
	        nanoOfDay -= minutes * LocalTime.NANOS_PER_MINUTE;
	        var seconds = _MathUtil.MathUtil.intDiv(nanoOfDay, LocalTime.NANOS_PER_SECOND);
	        nanoOfDay -= seconds * LocalTime.NANOS_PER_SECOND;
	        return new LocalTime(hours, minutes, seconds, nanoOfDay);
	    };
	
	    LocalTime.from = function from(temporal) {
	        (0, _assert.requireNonNull)(temporal, 'temporal');
	        var time = temporal.query(_TemporalQueries.TemporalQueries.localTime());
	        if (time == null) {
	            throw new _errors.DateTimeException('Unable to obtain LocalTime TemporalAccessor: ' + temporal + ', type ' + (temporal.constructor != null ? temporal.constructor.name : ''));
	        }
	        return time;
	    };
	
	    LocalTime.parse = function parse(text) {
	        var formatter = arguments.length <= 1 || arguments[1] === undefined ? _DateTimeFormatter.DateTimeFormatter.ISO_LOCAL_TIME : arguments[1];
	
	        (0, _assert.requireNonNull)(formatter, 'formatter');
	        return formatter.parse(text, LocalTime.FROM);
	    };
	
	    function LocalTime() {
	        var hour = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var minute = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	        var second = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	        var nanoOfSecond = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	
	        _classCallCheck(this, LocalTime);
	
	        var _this = _possibleConstructorReturn(this, _Temporal.call(this));
	
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
	
	    LocalTime._validate = function _validate(hour, minute, second, nanoOfSecond) {
	        _ChronoField.ChronoField.HOUR_OF_DAY.checkValidValue(hour);
	        _ChronoField.ChronoField.MINUTE_OF_HOUR.checkValidValue(minute);
	        _ChronoField.ChronoField.SECOND_OF_MINUTE.checkValidValue(second);
	        _ChronoField.ChronoField.NANO_OF_SECOND.checkValidValue(nanoOfSecond);
	    };
	
	    LocalTime.prototype.isSupported = function isSupported(fieldOrUnit) {
	        if (fieldOrUnit instanceof _ChronoField.ChronoField) {
	            return fieldOrUnit.isTimeBased();
	        } else if (fieldOrUnit instanceof _ChronoUnit.ChronoUnit) {
	            return fieldOrUnit.isTimeBased();
	        }
	        return fieldOrUnit != null && fieldOrUnit.isSupportedBy(this);
	    };
	
	    LocalTime.prototype.range = function range(field) {
	        (0, _assert.requireNonNull)(field);
	        return _Temporal.prototype.range.call(this, field);
	    };
	
	    LocalTime.prototype.get = function get(field) {
	        return this.getLong(field);
	    };
	
	    LocalTime.prototype.getLong = function getLong(field) {
	        (0, _assert.requireNonNull)(field, 'field');
	        if (field instanceof _ChronoField.ChronoField) {
	            return this._get0(field);
	        }
	        return field.getFrom(this);
	    };
	
	    LocalTime.prototype._get0 = function _get0(field) {
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
	    };
	
	    LocalTime.prototype.hour = function hour() {
	        return this._hour;
	    };
	
	    LocalTime.prototype.minute = function minute() {
	        return this._minute;
	    };
	
	    LocalTime.prototype.second = function second() {
	        return this._second;
	    };
	
	    LocalTime.prototype.nano = function nano() {
	        return this._nano;
	    };
	
	    LocalTime.prototype.with = function _with(adjusterOrField, newValue) {
	        if (arguments.length < 2) {
	            return this.withTemporalAdjuster(adjusterOrField);
	        } else {
	            return this.with2(adjusterOrField, newValue);
	        }
	    };
	
	    LocalTime.prototype.withTemporalAdjuster = function withTemporalAdjuster(adjuster) {
	        (0, _assert.requireNonNull)(adjuster, 'adjuster');
	
	        if (adjuster instanceof LocalTime) {
	            return adjuster;
	        }
	        (0, _assert.assert)(typeof adjuster.adjustInto === 'function', 'adjuster', _errors.IllegalArgumentException);
	        return adjuster.adjustInto(this);
	    };
	
	    LocalTime.prototype.with2 = function with2(field, newValue) {
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
	    };
	
	    LocalTime.prototype.withHour = function withHour() {
	        var hour = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	        if (this._hour === hour) {
	            return this;
	        }
	        return new LocalTime(hour, this._minute, this._second, this._nano);
	    };
	
	    LocalTime.prototype.withMinute = function withMinute() {
	        var minute = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	        if (this._minute === minute) {
	            return this;
	        }
	        return new LocalTime(this._hour, minute, this._second, this._nano);
	    };
	
	    LocalTime.prototype.withSecond = function withSecond() {
	        var second = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	        if (this._second === second) {
	            return this;
	        }
	        return new LocalTime(this._hour, this._minute, second, this._nano);
	    };
	
	    LocalTime.prototype.withNano = function withNano() {
	        var nanoOfSecond = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	        if (this._nano === nanoOfSecond) {
	            return this;
	        }
	        return new LocalTime(this._hour, this._minute, this._second, nanoOfSecond);
	    };
	
	    LocalTime.prototype.truncatedTo = function truncatedTo(unit) {
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
	    };
	
	    LocalTime.prototype.plus = function plus(amount, unit) {
	        if (arguments.length < 2) {
	            return this.plus1(amount);
	        } else {
	            return this.plus2(amount, unit);
	        }
	    };
	
	    LocalTime.prototype.plus1 = function plus1(amount) {
	        (0, _assert.requireNonNull)(amount, 'amount');
	        return amount.addTo(this);
	    };
	
	    LocalTime.prototype.plus2 = function plus2(amountToAdd, unit) {
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
	    };
	
	    LocalTime.prototype.plusHours = function plusHours(hoursToAdd) {
	        if (hoursToAdd === 0) {
	            return this;
	        }
	
	        var newHour = _MathUtil.MathUtil.intMod(_MathUtil.MathUtil.intMod(hoursToAdd, LocalTime.HOURS_PER_DAY) + this._hour + LocalTime.HOURS_PER_DAY, LocalTime.HOURS_PER_DAY);
	        return new LocalTime(newHour, this._minute, this._second, this._nano);
	    };
	
	    LocalTime.prototype.plusMinutes = function plusMinutes(minutesToAdd) {
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
	    };
	
	    LocalTime.prototype.plusSeconds = function plusSeconds(secondstoAdd) {
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
	    };
	
	    LocalTime.prototype.plusNanos = function plusNanos(nanosToAdd) {
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
	    };
	
	    LocalTime.prototype.minus = function minus(amount, unit) {
	        if (arguments.length < 2) {
	            return this.minus1(amount);
	        } else {
	            return this.minus2(amount, unit);
	        }
	    };
	
	    LocalTime.prototype.minus1 = function minus1(amount) {
	        (0, _assert.requireNonNull)(amount, 'amount');
	        return amount.subtractFrom(this);
	    };
	
	    LocalTime.prototype.minus2 = function minus2(amountToSubtract, unit) {
	        (0, _assert.requireNonNull)(unit, 'unit');
	        return this.plus2(-1 * amountToSubtract, unit);
	    };
	
	    LocalTime.prototype.minusHours = function minusHours(hoursToSubtract) {
	        return this.plusHours(-1 * _MathUtil.MathUtil.intMod(hoursToSubtract, LocalTime.HOURS_PER_DAY));
	    };
	
	    LocalTime.prototype.minusMinutes = function minusMinutes(minutesToSubtract) {
	        return this.plusMinutes(-1 * _MathUtil.MathUtil.intMod(minutesToSubtract, LocalTime.MINUTES_PER_DAY));
	    };
	
	    LocalTime.prototype.minusSeconds = function minusSeconds(secondsToSubtract) {
	        return this.plusSeconds(-1 * _MathUtil.MathUtil.intMod(secondsToSubtract, LocalTime.SECONDS_PER_DAY));
	    };
	
	    LocalTime.prototype.minusNanos = function minusNanos(nanosToSubtract) {
	        return this.plusNanos(-1 * _MathUtil.MathUtil.intMod(nanosToSubtract, LocalTime.NANOS_PER_DAY));
	    };
	
	    LocalTime.prototype.query = function query(_query) {
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
	    };
	
	    LocalTime.prototype.adjustInto = function adjustInto(temporal) {
	        return temporal.with(LocalTime.NANO_OF_DAY, this.toNanoOfDay());
	    };
	
	    LocalTime.prototype.until = function until(endExclusive, unit) {
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
	    };
	
	    LocalTime.prototype.atDate = function atDate(date) {
	        return _LocalDateTime.LocalDateTime.of(date, this);
	    };
	
	    LocalTime.prototype.toSecondOfDay = function toSecondOfDay() {
	        var total = this._hour * LocalTime.SECONDS_PER_HOUR;
	        total += this._minute * LocalTime.SECONDS_PER_MINUTE;
	        total += this._second;
	        return total;
	    };
	
	    LocalTime.prototype.toNanoOfDay = function toNanoOfDay() {
	        var total = this._hour * LocalTime.NANOS_PER_HOUR;
	        total += this._minute * LocalTime.NANOS_PER_MINUTE;
	        total += this._second * LocalTime.NANOS_PER_SECOND;
	        total += this._nano;
	        return total;
	    };
	
	    LocalTime.prototype.compareTo = function compareTo(other) {
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
	    };
	
	    LocalTime.prototype.isAfter = function isAfter(other) {
	        return this.compareTo(other) > 0;
	    };
	
	    LocalTime.prototype.isBefore = function isBefore(other) {
	        return this.compareTo(other) < 0;
	    };
	
	    LocalTime.prototype.equals = function equals(other) {
	        if (this === other) {
	            return true;
	        }
	        if (other instanceof LocalTime) {
	            return this._hour === other._hour && this._minute === other._minute && this._second === other._second && this._nano === other._nano;
	        }
	        return false;
	    };
	
	    LocalTime.prototype.hashCode = function hashCode() {
	        var nod = this.toNanoOfDay();
	        return nod ^ nod >>> 24;
	    };
	
	    LocalTime.prototype.toString = function toString() {
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
	    };
	
	    LocalTime.prototype.format = function format(formatter) {
	        (0, _assert.requireNonNull)(formatter, 'formatter');
	        return formatter.format(this);
	    };
	
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.MathUtil = exports.MIN_SAFE_INTEGER = exports.MAX_SAFE_INTEGER = undefined;
	
	var _errors = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                           * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                           * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                           */
	
	
	var MAX_SAFE_INTEGER = exports.MAX_SAFE_INTEGER = 9007199254740991;
	var MIN_SAFE_INTEGER = exports.MIN_SAFE_INTEGER = -9007199254740991;
	
	var MathUtil = exports.MathUtil = function () {
	    function MathUtil() {
	        _classCallCheck(this, MathUtil);
	    }
	
	    MathUtil.intDiv = function intDiv(x, y) {
	        var r = x / y;
	        r = MathUtil.roundDown(r);
	        return MathUtil.safeZero(r);
	    };
	
	    MathUtil.intMod = function intMod(x, y) {
	        var r = x - MathUtil.intDiv(x, y) * y;
	        r = MathUtil.roundDown(r);
	        return MathUtil.safeZero(r);
	    };
	
	    MathUtil.roundDown = function roundDown(r) {
	        if (r < 0) {
	            return Math.ceil(r);
	        } else {
	            return Math.floor(r);
	        }
	    };
	
	    MathUtil.floorDiv = function floorDiv(x, y) {
	        var r = Math.floor(x / y);
	        return MathUtil.safeZero(r);
	    };
	
	    MathUtil.floorMod = function floorMod(x, y) {
	        var r = x - MathUtil.floorDiv(x, y) * y;
	        return MathUtil.safeZero(r);
	    };
	
	    MathUtil.safeAdd = function safeAdd(x, y) {
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
	    };
	
	    MathUtil.safeSubtract = function safeSubtract(x, y) {
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
	    };
	
	    MathUtil.safeMultiply = function safeMultiply(x, y) {
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
	    };
	
	    MathUtil.parseInt = function (_parseInt) {
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
	    });
	
	    MathUtil.safeToInt = function safeToInt(value) {
	        MathUtil.verifyInt(value);
	        return MathUtil.safeZero(value);
	    };
	
	    MathUtil.verifyInt = function verifyInt(value) {
	        if (value == null) {
	            throw new _errors.ArithmeticException('Invalid value: \'' + value + '\', using null or undefined as argument');
	        }
	        if (isNaN(value)) {
	            throw new _errors.ArithmeticException('Invalid int value, using NaN as argument');
	        }
	        if (value > MAX_SAFE_INTEGER || value < MIN_SAFE_INTEGER) {
	            throw new _errors.ArithmeticException('Calculation overflows an int: ' + value);
	        }
	    };
	
	    MathUtil.safeZero = function safeZero(value) {
	        return value === 0 ? 0 : value;
	    };
	
	    MathUtil.compareNumbers = function compareNumbers(a, b) {
	        if (a < b) {
	            return -1;
	        }
	        if (a > b) {
	            return 1;
	        }
	        return 0;
	    };
	
	    return MathUtil;
	}();
	
	MathUtil.MAX_SAFE_INTEGER = MAX_SAFE_INTEGER;
	MathUtil.MIN_SAFE_INTEGER = MIN_SAFE_INTEGER;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.LocalDateTime = undefined;
	exports._init = _init;
	
	var _MathUtil = __webpack_require__(6);
	
	var _assert = __webpack_require__(2);
	
	var _errors = __webpack_require__(3);
	
	var _Clock = __webpack_require__(1);
	
	var _LocalDate = __webpack_require__(8);
	
	var _LocalTime = __webpack_require__(5);
	
	var _ZonedDateTime = __webpack_require__(46);
	
	var _ZoneId = __webpack_require__(37);
	
	var _ZoneOffset = __webpack_require__(36);
	
	var _DateTimeFormatter = __webpack_require__(26);
	
	var _ChronoField = __webpack_require__(12);
	
	var _ChronoUnit = __webpack_require__(13);
	
	var _TemporalQueries = __webpack_require__(22);
	
	var _TemporalQuery = __webpack_require__(25);
	
	var _ChronoLocalDateTime2 = __webpack_require__(48);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var LocalDateTime = function (_ChronoLocalDateTime) {
	    _inherits(LocalDateTime, _ChronoLocalDateTime);
	
	    LocalDateTime.now = function now(clockOrZone) {
	        if (clockOrZone == null) {
	            return LocalDateTime._now(_Clock.Clock.systemDefaultZone());
	        } else if (clockOrZone instanceof _Clock.Clock) {
	            return LocalDateTime._now(clockOrZone);
	        } else {
	            return LocalDateTime._now(_Clock.Clock.system(clockOrZone));
	        }
	    };
	
	    LocalDateTime._now = function _now(clock) {
	        (0, _assert.requireNonNull)(clock, 'clock');
	        return LocalDateTime.ofInstant(clock.instant(), clock.zone());
	    };
	
	    LocalDateTime._ofEpochMillis = function _ofEpochMillis(epochMilli, offset) {
	        var localSecond = _MathUtil.MathUtil.floorDiv(epochMilli, 1000) + offset.totalSeconds();
	        var localEpochDay = _MathUtil.MathUtil.floorDiv(localSecond, _LocalTime.LocalTime.SECONDS_PER_DAY);
	        var secsOfDay = _MathUtil.MathUtil.floorMod(localSecond, _LocalTime.LocalTime.SECONDS_PER_DAY);
	        var nanoOfSecond = _MathUtil.MathUtil.floorMod(epochMilli, 1000) * 1000000;
	        var date = _LocalDate.LocalDate.ofEpochDay(localEpochDay);
	        var time = _LocalTime.LocalTime.ofSecondOfDay(secsOfDay, nanoOfSecond);
	        return new LocalDateTime(date, time);
	    };
	
	    LocalDateTime.of = function of() {
	        if (arguments.length === 2 && (arguments[0] instanceof _LocalDate.LocalDate || arguments[1] instanceof _LocalTime.LocalTime)) {
	            return LocalDateTime.ofDateAndTime.apply(this, arguments);
	        } else {
	            return LocalDateTime.ofNumbers.apply(this, arguments);
	        }
	    };
	
	    LocalDateTime.ofNumbers = function ofNumbers() {
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
	    };
	
	    LocalDateTime.ofDateAndTime = function ofDateAndTime(date, time) {
	        (0, _assert.requireNonNull)(date, 'date');
	        (0, _assert.requireNonNull)(time, 'time');
	        return new LocalDateTime(date, time);
	    };
	
	    LocalDateTime.ofInstant = function ofInstant(instant) {
	        var zone = arguments.length <= 1 || arguments[1] === undefined ? _ZoneId.ZoneId.systemDefault() : arguments[1];
	
	        (0, _assert.requireNonNull)(instant, 'instant');
	        (0, _assert.requireNonNull)(zone, 'zone');
	        var rules = zone.rules();
	        var offset = rules.offset(instant);
	        return LocalDateTime.ofEpochSecond(instant.epochSecond(), instant.nano(), offset);
	    };
	
	    LocalDateTime.ofEpochSecond = function ofEpochSecond() {
	        var epochSecond = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var nanoOfSecond = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	        var offset = arguments[2];
	
	        if (arguments.length === 2 && nanoOfSecond instanceof _ZoneOffset.ZoneOffset) {
	            offset = nanoOfSecond;
	            nanoOfSecond = 0;
	        }
	        (0, _assert.requireNonNull)(offset, 'offset');
	        var localSecond = epochSecond + offset.totalSeconds();
	        var localEpochDay = _MathUtil.MathUtil.floorDiv(localSecond, _LocalTime.LocalTime.SECONDS_PER_DAY);
	        var secsOfDay = _MathUtil.MathUtil.floorMod(localSecond, _LocalTime.LocalTime.SECONDS_PER_DAY);
	        var date = _LocalDate.LocalDate.ofEpochDay(localEpochDay);
	        var time = _LocalTime.LocalTime.ofSecondOfDay(secsOfDay, nanoOfSecond);
	        return new LocalDateTime(date, time);
	    };
	
	    LocalDateTime.from = function from(temporal) {
	        (0, _assert.requireNonNull)(temporal, 'temporal');
	        if (temporal instanceof LocalDateTime) {
	            return temporal;
	        } else if (temporal instanceof _ZonedDateTime.ZonedDateTime) {
	            return temporal.toLocalDateTime();
	        }
	        try {
	            var date = _LocalDate.LocalDate.from(temporal);
	            var time = _LocalTime.LocalTime.from(temporal);
	            return new LocalDateTime(date, time);
	        } catch (ex) {
	            throw new _errors.DateTimeException('Unable to obtain LocalDateTime TemporalAccessor: ' + temporal + ', type ' + (temporal.constructor != null ? temporal.constructor.name : ''));
	        }
	    };
	
	    LocalDateTime.parse = function parse(text) {
	        var formatter = arguments.length <= 1 || arguments[1] === undefined ? _DateTimeFormatter.DateTimeFormatter.ISO_LOCAL_DATE_TIME : arguments[1];
	
	        return formatter.parse(text, LocalDateTime.FROM);
	    };
	
	    function LocalDateTime(date, time) {
	        _classCallCheck(this, LocalDateTime);
	
	        var _this = _possibleConstructorReturn(this, _ChronoLocalDateTime.call(this));
	
	        (0, _assert.requireInstance)(date, _LocalDate.LocalDate, 'date');
	        (0, _assert.requireInstance)(time, _LocalTime.LocalTime, 'time');
	        _this._date = date;
	        _this._time = time;
	        return _this;
	    }
	
	    LocalDateTime.prototype._withDateTime = function _withDateTime(newDate, newTime) {
	        if (this._date === newDate && this._time === newTime) {
	            return this;
	        }
	        return new LocalDateTime(newDate, newTime);
	    };
	
	    LocalDateTime.prototype.isSupported = function isSupported(fieldOrUnit) {
	        if (fieldOrUnit instanceof _ChronoField.ChronoField) {
	            return fieldOrUnit.isDateBased() || fieldOrUnit.isTimeBased();
	        } else if (fieldOrUnit instanceof _ChronoUnit.ChronoUnit) {
	            return fieldOrUnit.isDateBased() || fieldOrUnit.isTimeBased();
	        }
	        return fieldOrUnit != null && fieldOrUnit.isSupportedBy(this);
	    };
	
	    LocalDateTime.prototype.range = function range(field) {
	        if (field instanceof _ChronoField.ChronoField) {
	            return field.isTimeBased() ? this._time.range(field) : this._date.range(field);
	        }
	        return field.rangeRefinedBy(this);
	    };
	
	    LocalDateTime.prototype.get = function get(field) {
	        if (field instanceof _ChronoField.ChronoField) {
	            return field.isTimeBased() ? this._time.get(field) : this._date.get(field);
	        }
	        return _ChronoLocalDateTime.prototype.get.call(this, field);
	    };
	
	    LocalDateTime.prototype.getLong = function getLong(field) {
	        (0, _assert.requireNonNull)(field, 'field');
	        if (field instanceof _ChronoField.ChronoField) {
	            return field.isTimeBased() ? this._time.getLong(field) : this._date.getLong(field);
	        }
	        return field.getFrom(this);
	    };
	
	    LocalDateTime.prototype.year = function year() {
	        return this._date.year();
	    };
	
	    LocalDateTime.prototype.monthValue = function monthValue() {
	        return this._date.monthValue();
	    };
	
	    LocalDateTime.prototype.month = function month() {
	        return this._date.month();
	    };
	
	    LocalDateTime.prototype.dayOfMonth = function dayOfMonth() {
	        return this._date.dayOfMonth();
	    };
	
	    LocalDateTime.prototype.dayOfYear = function dayOfYear() {
	        return this._date.dayOfYear();
	    };
	
	    LocalDateTime.prototype.dayOfWeek = function dayOfWeek() {
	        return this._date.dayOfWeek();
	    };
	
	    LocalDateTime.prototype.hour = function hour() {
	        return this._time.hour();
	    };
	
	    LocalDateTime.prototype.minute = function minute() {
	        return this._time.minute();
	    };
	
	    LocalDateTime.prototype.second = function second() {
	        return this._time.second();
	    };
	
	    LocalDateTime.prototype.nano = function nano() {
	        return this._time.nano();
	    };
	
	    LocalDateTime.prototype.with = function _with(adjusterOrField, newValue) {
	        if (arguments.length === 1) {
	            return this.withTemporalAdjuster(adjusterOrField);
	        } else {
	            return this.with2(adjusterOrField, newValue);
	        }
	    };
	
	    LocalDateTime.prototype.withTemporalAdjuster = function withTemporalAdjuster(adjuster) {
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
	    };
	
	    LocalDateTime.prototype.with2 = function with2(field, newValue) {
	        (0, _assert.requireNonNull)(field, 'field');
	        if (field instanceof _ChronoField.ChronoField) {
	            if (field.isTimeBased()) {
	                return this._withDateTime(this._date, this._time.with(field, newValue));
	            } else {
	                return this._withDateTime(this._date.with(field, newValue), this._time);
	            }
	        }
	        return field.adjustInto(this, newValue);
	    };
	
	    LocalDateTime.prototype.withYear = function withYear(year) {
	        return this._withDateTime(this._date.withYear(year), this._time);
	    };
	
	    LocalDateTime.prototype.withMonth = function withMonth(month) {
	        return this._withDateTime(this._date.withMonth(month), this._time);
	    };
	
	    LocalDateTime.prototype.withDayOfMonth = function withDayOfMonth(dayOfMonth) {
	        return this._withDateTime(this._date.withDayOfMonth(dayOfMonth), this._time);
	    };
	
	    LocalDateTime.prototype.withDayOfYear = function withDayOfYear(dayOfYear) {
	        return this._withDateTime(this._date.withDayOfYear(dayOfYear), this._time);
	    };
	
	    LocalDateTime.prototype.withHour = function withHour(hour) {
	        var newTime = this._time.withHour(hour);
	        return this._withDateTime(this._date, newTime);
	    };
	
	    LocalDateTime.prototype.withMinute = function withMinute(minute) {
	        var newTime = this._time.withMinute(minute);
	        return this._withDateTime(this._date, newTime);
	    };
	
	    LocalDateTime.prototype.withSecond = function withSecond(second) {
	        var newTime = this._time.withSecond(second);
	        return this._withDateTime(this._date, newTime);
	    };
	
	    LocalDateTime.prototype.withNano = function withNano(nanoOfSecond) {
	        var newTime = this._time.withNano(nanoOfSecond);
	        return this._withDateTime(this._date, newTime);
	    };
	
	    LocalDateTime.prototype.truncatedTo = function truncatedTo(unit) {
	        return this._withDateTime(this._date, this._time.truncatedTo(unit));
	    };
	
	    LocalDateTime.prototype.plus = function plus(amount, unit) {
	        if (arguments.length === 1) {
	            return this.plusTemporalAmount(amount);
	        } else {
	            return this.plus2(amount, unit);
	        }
	    };
	
	    LocalDateTime.prototype.plusTemporalAmount = function plusTemporalAmount(amount) {
	        (0, _assert.requireNonNull)(amount, 'amount');
	        return amount.addTo(this);
	    };
	
	    LocalDateTime.prototype.plus2 = function plus2(amountToAdd, unit) {
	        (0, _assert.requireNonNull)(unit, 'unit');
	        if (unit instanceof _ChronoUnit.ChronoUnit) {
	            switch (unit) {
	                case _ChronoUnit.ChronoUnit.NANOS:
	                    return this.plusNanos(amountToAdd);
	                case _ChronoUnit.ChronoUnit.MICROS:
	                    return this.plusDays(_MathUtil.MathUtil.intDiv(amountToAdd, _LocalTime.LocalTime.MICROS_PER_DAY)).plusNanos(_MathUtil.MathUtil.intMod(amountToAdd, _LocalTime.LocalTime.MICROS_PER_DAY) * 1000);
	                case _ChronoUnit.ChronoUnit.MILLIS:
	                    return this.plusDays(_MathUtil.MathUtil.intDiv(amountToAdd, _LocalTime.LocalTime.MILLIS_PER_DAY)).plusNanos(_MathUtil.MathUtil.intMod(amountToAdd, _LocalTime.LocalTime.MILLIS_PER_DAY) * 1000000);
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
	    };
	
	    LocalDateTime.prototype.plusYears = function plusYears(years) {
	        var newDate = this._date.plusYears(years);
	        return this._withDateTime(newDate, this._time);
	    };
	
	    LocalDateTime.prototype.plusMonths = function plusMonths(months) {
	        var newDate = this._date.plusMonths(months);
	        return this._withDateTime(newDate, this._time);
	    };
	
	    LocalDateTime.prototype.plusWeeks = function plusWeeks(weeks) {
	        var newDate = this._date.plusWeeks(weeks);
	        return this._withDateTime(newDate, this._time);
	    };
	
	    LocalDateTime.prototype.plusDays = function plusDays(days) {
	        var newDate = this._date.plusDays(days);
	        return this._withDateTime(newDate, this._time);
	    };
	
	    LocalDateTime.prototype.plusHours = function plusHours(hours) {
	        return this._plusWithOverflow(this._date, hours, 0, 0, 0, 1);
	    };
	
	    LocalDateTime.prototype.plusMinutes = function plusMinutes(minutes) {
	        return this._plusWithOverflow(this._date, 0, minutes, 0, 0, 1);
	    };
	
	    LocalDateTime.prototype.plusSeconds = function plusSeconds(seconds) {
	        return this._plusWithOverflow(this._date, 0, 0, seconds, 0, 1);
	    };
	
	    LocalDateTime.prototype.plusNanos = function plusNanos(nanos) {
	        return this._plusWithOverflow(this._date, 0, 0, 0, nanos, 1);
	    };
	
	    LocalDateTime.prototype.minus = function minus(amount, unit) {
	        if (arguments.length === 1) {
	            return this.minusTemporalAmount(amount);
	        } else {
	            return this.minus2(amount, unit);
	        }
	    };
	
	    LocalDateTime.prototype.minusTemporalAmount = function minusTemporalAmount(amount) {
	        (0, _assert.requireNonNull)(amount, 'amount');
	        return amount.subtractFrom(this);
	    };
	
	    LocalDateTime.prototype.minus2 = function minus2(amountToSubtract, unit) {
	        (0, _assert.requireNonNull)(unit, 'unit');
	        return this.plus2(-1 * amountToSubtract, unit);
	    };
	
	    LocalDateTime.prototype.minusYears = function minusYears(years) {
	        return this.plusYears(-1 * years);
	    };
	
	    LocalDateTime.prototype.minusMonths = function minusMonths(months) {
	        return this.plusMonths(-1 * months);
	    };
	
	    LocalDateTime.prototype.minusWeeks = function minusWeeks(weeks) {
	        return this.plusWeeks(-1 * weeks);
	    };
	
	    LocalDateTime.prototype.minusDays = function minusDays(days) {
	        return this.plusDays(-1 * days);
	    };
	
	    LocalDateTime.prototype.minusHours = function minusHours(hours) {
	        return this._plusWithOverflow(this._date, hours, 0, 0, 0, -1);
	    };
	
	    LocalDateTime.prototype.minusMinutes = function minusMinutes(minutes) {
	        return this._plusWithOverflow(this._date, 0, minutes, 0, 0, -1);
	    };
	
	    LocalDateTime.prototype.minusSeconds = function minusSeconds(seconds) {
	        return this._plusWithOverflow(this._date, 0, 0, seconds, 0, -1);
	    };
	
	    LocalDateTime.prototype.minusNanos = function minusNanos(nanos) {
	        return this._plusWithOverflow(this._date, 0, 0, 0, nanos, -1);
	    };
	
	    LocalDateTime.prototype._plusWithOverflow = function _plusWithOverflow(newDate, hours, minutes, seconds, nanos, sign) {
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
	    };
	
	    LocalDateTime.prototype.query = function query(_query) {
	        (0, _assert.requireNonNull)(_query, 'query');
	        if (_query === _TemporalQueries.TemporalQueries.localDate()) {
	            return this.toLocalDate();
	        }
	        return _ChronoLocalDateTime.prototype.query.call(this, _query);
	    };
	
	    LocalDateTime.prototype.adjustInto = function adjustInto(temporal) {
	        return _ChronoLocalDateTime.prototype.adjustInto.call(this, temporal);
	    };
	
	    LocalDateTime.prototype.until = function until(endExclusive, unit) {
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
	    };
	
	    LocalDateTime.prototype.atZone = function atZone(zone) {
	        return _ZonedDateTime.ZonedDateTime.of(this, zone);
	    };
	
	    LocalDateTime.prototype.toLocalDate = function toLocalDate() {
	        return this._date;
	    };
	
	    LocalDateTime.prototype.toLocalTime = function toLocalTime() {
	        return this._time;
	    };
	
	    LocalDateTime.prototype.compareTo = function compareTo(other) {
	        (0, _assert.requireNonNull)(other, 'other');
	        (0, _assert.requireInstance)(other, LocalDateTime, 'other');
	        return this._compareTo0(other);
	    };
	
	    LocalDateTime.prototype._compareTo0 = function _compareTo0(other) {
	        var cmp = this._date.compareTo(other.toLocalDate());
	        if (cmp === 0) {
	            cmp = this._time.compareTo(other.toLocalTime());
	        }
	        return cmp;
	    };
	
	    LocalDateTime.prototype.isAfter = function isAfter(other) {
	        (0, _assert.requireNonNull)(other, 'other');
	        (0, _assert.requireInstance)(other, LocalDateTime, 'other');
	        return this._compareTo0(other) > 0;
	    };
	
	    LocalDateTime.prototype.isBefore = function isBefore(other) {
	        (0, _assert.requireNonNull)(other, 'other');
	        (0, _assert.requireInstance)(other, LocalDateTime, 'other');
	        return this._compareTo0(other) < 0;
	    };
	
	    LocalDateTime.prototype.isEqual = function isEqual(other) {
	        if (other instanceof LocalDateTime) {
	            return this._compareTo0(other) === 0;
	        }
	        return _ChronoLocalDateTime.prototype.isEqual.call(this, other);
	    };
	
	    LocalDateTime.prototype.equals = function equals(other) {
	        if (this === other) {
	            return true;
	        }
	        if (other instanceof LocalDateTime) {
	            return this._date.equals(other._date) && this._time.equals(other._time);
	        }
	        return false;
	    };
	
	    LocalDateTime.prototype.hashCode = function hashCode() {
	        return this._date.hashCode() ^ this._time.hashCode();
	    };
	
	    LocalDateTime.prototype.toString = function toString() {
	        return this._date.toString() + 'T' + this._time.toString();
	    };
	
	    LocalDateTime.prototype.format = function format(formatter) {
	        (0, _assert.requireNonNull)(formatter, 'formatter');
	        return formatter.format(this);
	    };
	
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.LocalDate = undefined;
	exports._init = _init;
	
	var _assert = __webpack_require__(2);
	
	var _MathUtil = __webpack_require__(6);
	
	var _errors = __webpack_require__(3);
	
	var _IsoChronology = __webpack_require__(9);
	
	var _ChronoField = __webpack_require__(12);
	
	var _ChronoUnit = __webpack_require__(13);
	
	var _ChronoLocalDate2 = __webpack_require__(24);
	
	var _TemporalQueries = __webpack_require__(22);
	
	var _TemporalQuery = __webpack_require__(25);
	
	var _ValueRange = __webpack_require__(19);
	
	var _DateTimeFormatter = __webpack_require__(26);
	
	var _Clock = __webpack_require__(1);
	
	var _DayOfWeek = __webpack_require__(45);
	
	var _Month = __webpack_require__(11);
	
	var _Period = __webpack_require__(27);
	
	var _Year = __webpack_require__(16);
	
	var _LocalTime = __webpack_require__(5);
	
	var _LocalDateTime = __webpack_require__(7);
	
	var _ZoneId = __webpack_require__(37);
	
	var _ZonedDateTime = __webpack_require__(46);
	
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
	
	    LocalDate.now = function now(clockOrZone) {
	        var clock;
	        if (clockOrZone == null) {
	            clock = _Clock.Clock.systemDefaultZone();
	        } else if (clockOrZone instanceof _ZoneId.ZoneId) {
	            clock = _Clock.Clock.system(clockOrZone);
	        } else {
	            clock = clockOrZone;
	        }
	        return LocalDate.ofInstant(clock.instant(), clock.zone());
	    };
	
	    LocalDate.ofInstant = function ofInstant(instant) {
	        var zone = arguments.length <= 1 || arguments[1] === undefined ? _ZoneId.ZoneId.systemDefault() : arguments[1];
	
	        (0, _assert.requireNonNull)(instant, 'instant');
	        var offset = zone.rules().offset(instant);
	        var epochSec = instant.epochSecond() + offset.totalSeconds();
	        var epochDay = _MathUtil.MathUtil.floorDiv(epochSec, _LocalTime.LocalTime.SECONDS_PER_DAY);
	        return LocalDate.ofEpochDay(epochDay);
	    };
	
	    LocalDate.of = function of(year, month, dayOfMonth) {
	        return new LocalDate(year, month, dayOfMonth);
	    };
	
	    LocalDate.ofYearDay = function ofYearDay(year, dayOfYear) {
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
	    };
	
	    LocalDate.ofEpochDay = function ofEpochDay() {
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
	    };
	
	    LocalDate.from = function from(temporal) {
	        (0, _assert.requireNonNull)(temporal, 'temporal');
	        var date = temporal.query(_TemporalQueries.TemporalQueries.localDate());
	        if (date == null) {
	            throw new _errors.DateTimeException('Unable to obtain LocalDate from TemporalAccessor: ' + temporal + ', type ' + (temporal.constructor != null ? temporal.constructor.name : ''));
	        }
	        return date;
	    };
	
	    LocalDate.parse = function parse(text) {
	        var formatter = arguments.length <= 1 || arguments[1] === undefined ? _DateTimeFormatter.DateTimeFormatter.ISO_LOCAL_DATE : arguments[1];
	
	        (0, _assert.assert)(formatter != null, 'formatter', _errors.NullPointerException);
	        return formatter.parse(text, LocalDate.FROM);
	    };
	
	    LocalDate._resolvePreviousValid = function _resolvePreviousValid(year, month, day) {
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
	    };
	
	    function LocalDate(year, month, dayOfMonth) {
	        _classCallCheck(this, LocalDate);
	
	        var _this = _possibleConstructorReturn(this, _ChronoLocalDate.call(this));
	
	        if (month instanceof _Month.Month) {
	            month = month.value();
	        }
	        LocalDate._validate(year, month, dayOfMonth);
	        _this._year = _MathUtil.MathUtil.safeZero(year);
	        _this._month = _MathUtil.MathUtil.safeZero(month);
	        _this._day = _MathUtil.MathUtil.safeZero(dayOfMonth);
	        return _this;
	    }
	
	    LocalDate._validate = function _validate(year, month, dayOfMonth) {
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
	    };
	
	    LocalDate.prototype.isSupported = function isSupported(field) {
	        return _ChronoLocalDate.prototype.isSupported.call(this, field);
	    };
	
	    LocalDate.prototype.range = function range(field) {
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
	    };
	
	    LocalDate.prototype.get = function get(field) {
	        return this.getLong(field);
	    };
	
	    LocalDate.prototype.getLong = function getLong(field) {
	        (0, _assert.assert)(field != null, '', _errors.NullPointerException);
	        if (field instanceof _ChronoField.ChronoField) {
	            return this._get0(field);
	        }
	        return field.getFrom(this);
	    };
	
	    LocalDate.prototype._get0 = function _get0(field) {
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
	    };
	
	    LocalDate.prototype._prolepticMonth = function _prolepticMonth() {
	        return this._year * 12 + (this._month - 1);
	    };
	
	    LocalDate.prototype.chronology = function chronology() {
	        return _IsoChronology.IsoChronology.INSTANCE;
	    };
	
	    LocalDate.prototype.year = function year() {
	        return this._year;
	    };
	
	    LocalDate.prototype.monthValue = function monthValue() {
	        return this._month;
	    };
	
	    LocalDate.prototype.month = function month() {
	        return _Month.Month.of(this._month);
	    };
	
	    LocalDate.prototype.dayOfMonth = function dayOfMonth() {
	        return this._day;
	    };
	
	    LocalDate.prototype.dayOfYear = function dayOfYear() {
	        return this.month().firstDayOfYear(this.isLeapYear()) + this._day - 1;
	    };
	
	    LocalDate.prototype.dayOfWeek = function dayOfWeek() {
	        var dow0 = _MathUtil.MathUtil.floorMod(this.toEpochDay() + 3, 7);
	        return _DayOfWeek.DayOfWeek.of(dow0 + 1);
	    };
	
	    LocalDate.prototype.isLeapYear = function isLeapYear() {
	        return _IsoChronology.IsoChronology.isLeapYear(this._year);
	    };
	
	    LocalDate.prototype.lengthOfMonth = function lengthOfMonth() {
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
	    };
	
	    LocalDate.prototype.lengthOfYear = function lengthOfYear() {
	        return this.isLeapYear() ? 366 : 365;
	    };
	
	    LocalDate.prototype.with = function _with(fieldOrAdjuster, newValue) {
	        if (arguments.length < 2) {
	            return this.withTemporalAdjuster(fieldOrAdjuster);
	        } else {
	            return this.withFieldAndValue(fieldOrAdjuster, newValue);
	        }
	    };
	
	    LocalDate.prototype.withTemporalAdjuster = function withTemporalAdjuster(adjuster) {
	        (0, _assert.requireNonNull)(adjuster, 'adjuster');
	
	        if (adjuster instanceof LocalDate) {
	            return adjuster;
	        }
	        (0, _assert.assert)(typeof adjuster.adjustInto === 'function', 'adjuster', _errors.IllegalArgumentException);
	        return adjuster.adjustInto(this);
	    };
	
	    LocalDate.prototype.withFieldAndValue = function withFieldAndValue(field, newValue) {
	        (0, _assert.assert)(field != null, 'field', _errors.NullPointerException);
	        if (field instanceof _ChronoField.ChronoField) {
	            var f = field;
	            f.checkValidValue(newValue);
	            switch (f) {
	                case _ChronoField.ChronoField.DAY_OF_WEEK:
	                    return this.plusDays(newValue - this.dayOfWeek().value());
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
	    };
	
	    LocalDate.prototype.withYear = function withYear(year) {
	        if (this._year === year) {
	            return this;
	        }
	        _ChronoField.ChronoField.YEAR.checkValidValue(year);
	        return LocalDate._resolvePreviousValid(year, this._month, this._day);
	    };
	
	    LocalDate.prototype.withMonth = function withMonth(month) {
	        var m = month instanceof _Month.Month ? month.value() : month;
	        if (this._month === m) {
	            return this;
	        }
	        _ChronoField.ChronoField.MONTH_OF_YEAR.checkValidValue(m);
	        return LocalDate._resolvePreviousValid(this._year, m, this._day);
	    };
	
	    LocalDate.prototype.withDayOfMonth = function withDayOfMonth(dayOfMonth) {
	        if (this._day === dayOfMonth) {
	            return this;
	        }
	        return LocalDate.of(this._year, this._month, dayOfMonth);
	    };
	
	    LocalDate.prototype.withDayOfYear = function withDayOfYear(dayOfYear) {
	        if (this.dayOfYear() === dayOfYear) {
	            return this;
	        }
	        return LocalDate.ofYearDay(this._year, dayOfYear);
	    };
	
	    LocalDate.prototype.plus = function plus(p1, p2) {
	        if (arguments.length < 2) {
	            return this.plus1(p1);
	        } else {
	            return this.plus2(p1, p2);
	        }
	    };
	
	    LocalDate.prototype.plus1 = function plus1(amount) {
	        (0, _assert.requireNonNull)(amount, 'amount');
	        return amount.addTo(this);
	    };
	
	    LocalDate.prototype.plus2 = function plus2(amountToAdd, unit) {
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
	    };
	
	    LocalDate.prototype.plusYears = function plusYears(yearsToAdd) {
	        if (yearsToAdd === 0) {
	            return this;
	        }
	        var newYear = _ChronoField.ChronoField.YEAR.checkValidIntValue(this._year + yearsToAdd);
	        return LocalDate._resolvePreviousValid(newYear, this._month, this._day);
	    };
	
	    LocalDate.prototype.plusMonths = function plusMonths(monthsToAdd) {
	        if (monthsToAdd === 0) {
	            return this;
	        }
	        var monthCount = this._year * 12 + (this._month - 1);
	        var calcMonths = monthCount + monthsToAdd;
	        var newYear = _ChronoField.ChronoField.YEAR.checkValidIntValue(_MathUtil.MathUtil.floorDiv(calcMonths, 12));
	        var newMonth = _MathUtil.MathUtil.floorMod(calcMonths, 12) + 1;
	        return LocalDate._resolvePreviousValid(newYear, newMonth, this._day);
	    };
	
	    LocalDate.prototype.plusWeeks = function plusWeeks(weeksToAdd) {
	        return this.plusDays(_MathUtil.MathUtil.safeMultiply(weeksToAdd, 7));
	    };
	
	    LocalDate.prototype.plusDays = function plusDays(daysToAdd) {
	        if (daysToAdd === 0) {
	            return this;
	        }
	        var mjDay = _MathUtil.MathUtil.safeAdd(this.toEpochDay(), daysToAdd);
	        return LocalDate.ofEpochDay(mjDay);
	    };
	
	    LocalDate.prototype.minus = function minus(p1, p2) {
	        if (arguments.length < 2) {
	            return this.minus1(p1);
	        } else {
	            return this.minus2(p1, p2);
	        }
	    };
	
	    LocalDate.prototype.minus1 = function minus1(amount) {
	        (0, _assert.requireNonNull)(amount, 'amount');
	        return amount.subtractFrom(this);
	    };
	
	    LocalDate.prototype.minus2 = function minus2(amountToSubtract, unit) {
	        (0, _assert.requireNonNull)(amountToSubtract, 'amountToSubtract');
	        (0, _assert.requireNonNull)(unit, 'unit');
	        return this.plus2(-1 * amountToSubtract, unit);
	    };
	
	    LocalDate.prototype.minusYears = function minusYears(yearsToSubtract) {
	        return this.plusYears(yearsToSubtract * -1);
	    };
	
	    LocalDate.prototype.minusMonths = function minusMonths(monthsToSubtract) {
	        return this.plusMonths(monthsToSubtract * -1);
	    };
	
	    LocalDate.prototype.minusWeeks = function minusWeeks(weeksToSubtract) {
	        return this.plusWeeks(weeksToSubtract * -1);
	    };
	
	    LocalDate.prototype.minusDays = function minusDays(daysToSubtract) {
	        return this.plusDays(daysToSubtract * -1);
	    };
	
	    LocalDate.prototype.query = function query(_query) {
	        (0, _assert.requireNonNull)(_query, 'query');
	        if (_query === _TemporalQueries.TemporalQueries.localDate()) {
	            return this;
	        }
	        return _ChronoLocalDate.prototype.query.call(this, _query);
	    };
	
	    LocalDate.prototype.adjustInto = function adjustInto(temporal) {
	        return _ChronoLocalDate.prototype.adjustInto.call(this, temporal);
	    };
	
	    LocalDate.prototype.until = function until(p1, p2) {
	        if (arguments.length < 2) {
	            return this.until1(p1);
	        } else {
	            return this.until2(p1, p2);
	        }
	    };
	
	    LocalDate.prototype.until2 = function until2(endExclusive, unit) {
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
	    };
	
	    LocalDate.prototype.daysUntil = function daysUntil(end) {
	        return end.toEpochDay() - this.toEpochDay();
	    };
	
	    LocalDate.prototype._monthsUntil = function _monthsUntil(end) {
	        var packed1 = this._prolepticMonth() * 32 + this.dayOfMonth();
	        var packed2 = end._prolepticMonth() * 32 + end.dayOfMonth();
	        return _MathUtil.MathUtil.intDiv(packed2 - packed1, 32);
	    };
	
	    LocalDate.prototype.until1 = function until1(endDate) {
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
	    };
	
	    LocalDate.prototype.atTime = function atTime() {
	        if (arguments.length === 1) {
	            return this.atTime1.apply(this, arguments);
	        } else {
	            return this.atTime4.apply(this, arguments);
	        }
	    };
	
	    LocalDate.prototype.atTime1 = function atTime1(time) {
	        return _LocalDateTime.LocalDateTime.of(this, time);
	    };
	
	    LocalDate.prototype.atTime4 = function atTime4(hour, minute) {
	        var second = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	        var nanoOfSecond = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	
	        return this.atTime1(_LocalTime.LocalTime.of(hour, minute, second, nanoOfSecond));
	    };
	
	    LocalDate.prototype.atStartOfDay = function atStartOfDay(zone) {
	        if (zone != null) {
	            return this.atStartOfDayWithZone(zone);
	        } else {
	            return _LocalDateTime.LocalDateTime.of(this, _LocalTime.LocalTime.MIDNIGHT);
	        }
	    };
	
	    LocalDate.prototype.atStartOfDayWithZone = function atStartOfDayWithZone(zone) {
	        (0, _assert.requireNonNull)(zone, 'zone');
	        var ldt = this.atTime(_LocalTime.LocalTime.MIDNIGHT);
	
	        return _ZonedDateTime.ZonedDateTime.of(ldt, zone);
	    };
	
	    LocalDate.prototype.toEpochDay = function toEpochDay() {
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
	    };
	
	    LocalDate.prototype.compareTo = function compareTo(other) {
	        (0, _assert.requireNonNull)(other, 'other');
	        (0, _assert.requireInstance)(other, LocalDate, 'other');
	        if (other instanceof LocalDate) {
	            return this._compareTo0(other);
	        }
	    };
	
	    LocalDate.prototype._compareTo0 = function _compareTo0(otherDate) {
	        var cmp = this._year - otherDate._year;
	        if (cmp === 0) {
	            cmp = this._month - otherDate._month;
	            if (cmp === 0) {
	                cmp = this._day - otherDate._day;
	            }
	        }
	        return cmp;
	    };
	
	    LocalDate.prototype.isAfter = function isAfter(other) {
	        return this.compareTo(other) > 0;
	    };
	
	    LocalDate.prototype.isBefore = function isBefore(other) {
	        return this.compareTo(other) < 0;
	    };
	
	    LocalDate.prototype.isEqual = function isEqual(other) {
	        return this.compareTo(other) === 0;
	    };
	
	    LocalDate.prototype.equals = function equals(otherDate) {
	        if (this === otherDate) {
	            return true;
	        }
	        if (otherDate instanceof LocalDate) {
	            return this._compareTo0(otherDate) === 0;
	        }
	        return false;
	    };
	
	    LocalDate.prototype.hashCode = function hashCode() {
	        var yearValue = this._year;
	        var monthValue = this._month;
	        var dayValue = this._day;
	        return yearValue & 0xFFFFF800 ^ (yearValue << 11) + (monthValue << 6) + dayValue;
	    };
	
	    LocalDate.prototype.toString = function toString() {
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
	    };
	
	    return LocalDate;
	}(_ChronoLocalDate2.ChronoLocalDate);
	
	exports.LocalDate = LocalDate;
	function _init() {
	    LocalDate.MIN = LocalDate.of(_Year.Year.MIN_VALUE, 1, 1);
	
	    LocalDate.MAX = LocalDate.of(_Year.Year.MAX_VALUE, 12, 31);
	
	    LocalDate.EPOCH_0 = LocalDate.ofEpochDay(0);
	
	    LocalDate.FROM = (0, _TemporalQuery.createTemporalQuery)('LocalDate.FROM', function (temporal) {
	        return LocalDate.from(temporal);
	    });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.IsoChronology = undefined;
	exports._init = _init;
	
	var _Enum2 = __webpack_require__(10);
	
	var _LocalDate = __webpack_require__(8);
	
	var _Month = __webpack_require__(11);
	
	var _Year = __webpack_require__(16);
	
	var _ChronoField = __webpack_require__(12);
	
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
	
	        return _possibleConstructorReturn(this, _Enum.apply(this, arguments));
	    }
	
	    IsoChronology.isLeapYear = function isLeapYear(prolepticYear) {
	        return (prolepticYear & 3) === 0 && (prolepticYear % 100 !== 0 || prolepticYear % 400 === 0);
	    };
	
	    IsoChronology.prototype.resolveDate = function resolveDate(fieldValues, resolverStyle) {
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
	    };
	
	    return IsoChronology;
	}(_Enum2.Enum);
	
	function _init() {
	    IsoChronology.INSTANCE = new IsoChronology('IsoChronology');
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
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
	
	    Enum.prototype.equals = function equals(other) {
	        return this === other;
	    };
	
	    Enum.prototype.toString = function toString() {
	        return this._name;
	    };
	
	    return Enum;
	}();

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.Month = undefined;
	exports._init = _init;
	
	var _assert = __webpack_require__(2);
	
	var _MathUtil = __webpack_require__(6);
	
	var _ChronoField = __webpack_require__(12);
	
	var _ChronoUnit = __webpack_require__(13);
	
	var _errors = __webpack_require__(3);
	
	var _IsoChronology = __webpack_require__(9);
	
	var _Temporal2 = __webpack_require__(20);
	
	var _TemporalQueries = __webpack_require__(22);
	
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
	
	        var _this = _possibleConstructorReturn(this, _Temporal.call(this));
	
	        _this._value = value;
	        return _this;
	    }
	
	    Month.prototype.value = function value() {
	        return this._value;
	    };
	
	    Month.prototype.isSupported = function isSupported(field) {
	        if (null === field) {
	            return false;
	        }
	        if (field instanceof _ChronoField.ChronoField) {
	            return field === _ChronoField.ChronoField.MONTH_OF_YEAR;
	        }
	        return field != null && field.isSupportedBy(this);
	    };
	
	    Month.prototype.get = function get(field) {
	        if (field === _ChronoField.ChronoField.MONTH_OF_YEAR) {
	            return this.value();
	        }
	        return this.range(field).checkValidIntValue(this.getLong(field), field);
	    };
	
	    Month.prototype.getLong = function getLong(field) {
	        if (field === _ChronoField.ChronoField.MONTH_OF_YEAR) {
	            return this.value();
	        } else if (field instanceof _ChronoField.ChronoField) {
	            throw new _errors.UnsupportedTemporalTypeException('Unsupported field: ' + field);
	        }
	        return field.getFrom(this);
	    };
	
	    Month.prototype.plus = function plus(months) {
	        var amount = _MathUtil.MathUtil.intMod(months, 12) + 12;
	        var newMonthVal = _MathUtil.MathUtil.intMod(this.value() + amount, 12);
	
	        newMonthVal = newMonthVal === 0 ? 12 : newMonthVal;
	        return Month.of(newMonthVal);
	    };
	
	    Month.prototype.minus = function minus(months) {
	        return this.plus(-1 * _MathUtil.MathUtil.intMod(months, 12));
	    };
	
	    Month.prototype.length = function length(leapYear) {
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
	    };
	
	    Month.prototype.minLength = function minLength() {
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
	    };
	
	    Month.prototype.maxLength = function maxLength() {
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
	    };
	
	    Month.prototype.firstDayOfYear = function firstDayOfYear(leapYear) {
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
	    };
	
	    Month.prototype.firstMonthOfQuarter = function firstMonthOfQuarter() {
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
	    };
	
	    Month.prototype.query = function query(_query) {
	        (0, _assert.assert)(_query != null, 'query() parameter must not be null', _errors.DateTimeException);
	        if (_query === _TemporalQueries.TemporalQueries.chronology()) {
	            return _IsoChronology.IsoChronology.INSTANCE;
	        } else if (_query === _TemporalQueries.TemporalQueries.precision()) {
	            return _ChronoUnit.ChronoUnit.MONTHS;
	        }
	        return _Temporal.prototype.query.call(this, _query);
	    };
	
	    Month.prototype.toString = function toString() {
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
	    };
	
	    Month.prototype.adjustInto = function adjustInto(temporal) {
	        return temporal.with(_ChronoField.ChronoField.MONTH_OF_YEAR, this.value());
	    };
	
	    Month.values = function values() {
	        return MONTHS.slice();
	    };
	
	    Month.of = function of(month) {
	        if (month < 1 || month > 12) {
	            (0, _assert.assert)(false, 'Invalid value for MonthOfYear: ' + month, _errors.DateTimeException);
	        }
	        return MONTHS[month - 1];
	    };
	
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ChronoField = undefined;
	exports._init = _init;
	
	var _MathUtil = __webpack_require__(6);
	
	var _ChronoUnit = __webpack_require__(13);
	
	var _TemporalField2 = __webpack_require__(18);
	
	var _ValueRange = __webpack_require__(19);
	
	var _Year = __webpack_require__(16);
	
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
	
	        var _this = _possibleConstructorReturn(this, _TemporalField.call(this));
	
	        _this._name = name;
	        _this._baseUnit = baseUnit;
	        _this._rangeUnit = rangeUnit;
	        _this._range = range;
	        return _this;
	    }
	
	    ChronoField.prototype.name = function name() {
	        return this._name;
	    };
	
	    ChronoField.prototype.baseUnit = function baseUnit() {
	        return this._baseUnit;
	    };
	
	    ChronoField.prototype.rangeUnit = function rangeUnit() {
	        return this._rangeUnit;
	    };
	
	    ChronoField.prototype.range = function range() {
	        return this._range;
	    };
	
	    ChronoField.prototype.displayName = function displayName() {
	        return this.toString();
	    };
	
	    ChronoField.prototype.checkValidValue = function checkValidValue(value) {
	        return this.range().checkValidValue(value, this.name());
	    };
	
	    ChronoField.prototype.isDateBased = function isDateBased() {
	        var dateBased = this === ChronoField.DAY_OF_WEEK || this === ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH || this === ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR || this === ChronoField.DAY_OF_MONTH || this === ChronoField.DAY_OF_YEAR || this === ChronoField.EPOCH_DAY || this === ChronoField.ALIGNED_WEEK_OF_MONTH || this === ChronoField.ALIGNED_WEEK_OF_YEAR || this === ChronoField.MONTH_OF_YEAR || this === ChronoField.YEAR_OF_ERA || this === ChronoField.YEAR || this === ChronoField.ERA;
	        return dateBased;
	    };
	
	    ChronoField.prototype.isTimeBased = function isTimeBased() {
	        var timeBased = this === ChronoField.NANO_OF_SECOND || this === ChronoField.NANO_OF_DAY || this === ChronoField.MICRO_OF_SECOND || this === ChronoField.MICRO_OF_DAY || this === ChronoField.MILLI_OF_SECOND || this === ChronoField.MILLI_OF_DAY || this === ChronoField.SECOND_OF_MINUTE || this === ChronoField.SECOND_OF_DAY || this === ChronoField.MINUTE_OF_HOUR || this === ChronoField.MINUTE_OF_DAY || this === ChronoField.HOUR_OF_AMPM || this === ChronoField.CLOCK_HOUR_OF_AMPM || this === ChronoField.HOUR_OF_DAY || this === ChronoField.CLOCK_HOUR_OF_DAY || this === ChronoField.AMPM_OF_DAY;
	        return timeBased;
	    };
	
	    ChronoField.prototype.rangeRefinedBy = function rangeRefinedBy(temporal) {
	        return temporal.range(this);
	    };
	
	    ChronoField.prototype.checkValidIntValue = function checkValidIntValue(value) {
	        return this.range().checkValidIntValue(value, this);
	    };
	
	    ChronoField.prototype.getFrom = function getFrom(temporal) {
	        return temporal.getLong(this);
	    };
	
	    ChronoField.prototype.toString = function toString() {
	        return this.name();
	    };
	
	    ChronoField.prototype.equals = function equals(other) {
	        return this === other;
	    };
	
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ChronoUnit = undefined;
	exports._init = _init;
	
	var _MathUtil = __webpack_require__(6);
	
	var _Duration = __webpack_require__(14);
	
	var _Year = __webpack_require__(16);
	
	var _TemporalUnit2 = __webpack_require__(17);
	
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
	
	    var _this = _possibleConstructorReturn(this, _TemporalUnit.call(this));
	
	    _this._name = name;
	    _this._duration = estimatedDuration;
	    return _this;
	  }
	
	  ChronoUnit.prototype.duration = function duration() {
	    return this._duration;
	  };
	
	  ChronoUnit.prototype.isDurationEstimated = function isDurationEstimated() {
	    return this.isDateBased() || this === ChronoUnit.FOREVER;
	  };
	
	  ChronoUnit.prototype.isDateBased = function isDateBased() {
	    return this.compareTo(ChronoUnit.DAYS) >= 0 && this !== ChronoUnit.FOREVER;
	  };
	
	  ChronoUnit.prototype.isTimeBased = function isTimeBased() {
	    return this.compareTo(ChronoUnit.DAYS) < 0;
	  };
	
	  ChronoUnit.prototype.isSupportedBy = function isSupportedBy(temporal) {
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
	  };
	
	  ChronoUnit.prototype.addTo = function addTo(temporal, amount) {
	    return temporal.plus(amount, this);
	  };
	
	  ChronoUnit.prototype.between = function between(temporal1, temporal2) {
	    return temporal1.until(temporal2, this);
	  };
	
	  ChronoUnit.prototype.toString = function toString() {
	    return this._name;
	  };
	
	  ChronoUnit.prototype.compareTo = function compareTo(other) {
	    return this.duration().compareTo(other.duration());
	  };
	
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.Duration = undefined;
	exports._init = _init;
	
	var _assert = __webpack_require__(2);
	
	var _errors = __webpack_require__(3);
	
	var _MathUtil = __webpack_require__(6);
	
	var _ChronoField = __webpack_require__(12);
	
	var _ChronoUnit = __webpack_require__(13);
	
	var _TemporalAmount2 = __webpack_require__(15);
	
	var _LocalTime = __webpack_require__(5);
	
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
	
	        var _this = _possibleConstructorReturn(this, _TemporalAmount.call(this));
	
	        _this._seconds = seconds;
	        _this._nanos = nanos;
	        return _this;
	    }
	
	    Duration.ofDays = function ofDays(days) {
	        return Duration._create(_MathUtil.MathUtil.safeMultiply(days, _LocalTime.LocalTime.SECONDS_PER_DAY), 0);
	    };
	
	    Duration.ofHours = function ofHours(hours) {
	        return Duration._create(_MathUtil.MathUtil.safeMultiply(hours, _LocalTime.LocalTime.SECONDS_PER_HOUR), 0);
	    };
	
	    Duration.ofMinutes = function ofMinutes(minutes) {
	        return Duration._create(_MathUtil.MathUtil.safeMultiply(minutes, _LocalTime.LocalTime.SECONDS_PER_MINUTE), 0);
	    };
	
	    Duration.ofSeconds = function ofSeconds(seconds) {
	        var nanoAdjustment = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	        var secs = _MathUtil.MathUtil.safeAdd(seconds, _MathUtil.MathUtil.floorDiv(nanoAdjustment, _LocalTime.LocalTime.NANOS_PER_SECOND));
	        var nos = _MathUtil.MathUtil.floorMod(nanoAdjustment, _LocalTime.LocalTime.NANOS_PER_SECOND);
	        return Duration._create(secs, nos);
	    };
	
	    Duration.ofMillis = function ofMillis(millis) {
	        var secs = _MathUtil.MathUtil.intDiv(millis, 1000);
	        var mos = _MathUtil.MathUtil.intMod(millis, 1000);
	        if (mos < 0) {
	            mos += 1000;
	            secs--;
	        }
	        return Duration._create(secs, mos * 1000000);
	    };
	
	    Duration.ofNanos = function ofNanos(nanos) {
	        var secs = _MathUtil.MathUtil.intDiv(nanos, _LocalTime.LocalTime.NANOS_PER_SECOND);
	        var nos = _MathUtil.MathUtil.intMod(nanos, _LocalTime.LocalTime.NANOS_PER_SECOND);
	        if (nos < 0) {
	            nos += _LocalTime.LocalTime.NANOS_PER_SECOND;
	            secs--;
	        }
	        return this._create(secs, nos);
	    };
	
	    Duration.of = function of(amount, unit) {
	        return Duration.ZERO.plus(amount, unit);
	    };
	
	    Duration.from = function from(amount) {
	        (0, _assert.requireNonNull)(amount, 'amount');
	        var duration = Duration.ZERO;
	        amount.units().forEach(function (unit) {
	            duration = duration.plus(amount.get(unit), unit);
	        });
	        return duration;
	    };
	
	    Duration.between = function between(startInclusive, endExclusive) {
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
	    };
	
	    Duration.parse = function parse(text) {
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
	                        return Duration._create(negate, daysAsSecs, hoursAsSecs, minsAsSecs, seconds, nanos);
	                    } catch (ex) {
	                        throw new _errors.DateTimeParseException('Text cannot be parsed to a Duration: overflow', text, 0, ex);
	                    }
	                }
	            }
	        }
	        throw new _errors.DateTimeParseException('Text cannot be parsed to a Duration', text, 0);
	    };
	
	    Duration._parseNumber = function _parseNumber(text, parsed, multiplier, errorText) {
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
	    };
	
	    Duration._parseFraction = function _parseFraction(text, parsed, negate) {
	        if (parsed == null || parsed.length === 0) {
	            return 0;
	        }
	        try {
	            parsed = (parsed + '000000000').substring(0, 9);
	            return parseFloat(parsed) * negate;
	        } catch (ex) {
	            throw new _errors.DateTimeParseException('Text cannot be parsed to a Duration: fraction', text, 0, ex);
	        }
	    };
	
	    Duration._create = function _create() {
	        if (arguments.length <= 2) {
	            return Duration._createSecondsNanos(arguments[0], arguments[1]);
	        } else {
	            return Duration._createNegateDaysHoursMinutesSecondsNanos(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
	        }
	    };
	
	    Duration._createNegateDaysHoursMinutesSecondsNanos = function _createNegateDaysHoursMinutesSecondsNanos(negate, daysAsSecs, hoursAsSecs, minsAsSecs, secs, nanos) {
	        var seconds = _MathUtil.MathUtil.safeAdd(daysAsSecs, _MathUtil.MathUtil.safeAdd(hoursAsSecs, _MathUtil.MathUtil.safeAdd(minsAsSecs, secs)));
	        if (negate) {
	            return Duration.ofSeconds(seconds, nanos).negated();
	        }
	        return Duration.ofSeconds(seconds, nanos);
	    };
	
	    Duration._createSecondsNanos = function _createSecondsNanos() {
	        var seconds = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var nanoAdjustment = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	        if ((seconds | nanoAdjustment) === 0) {
	            return Duration.ZERO;
	        }
	        return new Duration(seconds, nanoAdjustment);
	    };
	
	    Duration.prototype.get = function get(unit) {
	        if (unit === _ChronoUnit.ChronoUnit.SECONDS) {
	            return this._seconds;
	        } else if (unit === _ChronoUnit.ChronoUnit.NANOS) {
	            return this._nanos;
	        } else {
	            throw new _errors.UnsupportedTemporalTypeException('Unsupported unit: ' + unit);
	        }
	    };
	
	    Duration.prototype.units = function units() {
	        return [_ChronoUnit.ChronoUnit.SECONDS, _ChronoUnit.ChronoUnit.NANOS];
	    };
	
	    Duration.prototype.isZero = function isZero() {
	        return (this._seconds | this._nanos) === 0;
	    };
	
	    Duration.prototype.isNegative = function isNegative() {
	        return this._seconds < 0;
	    };
	
	    Duration.prototype.seconds = function seconds() {
	        return this._seconds;
	    };
	
	    Duration.prototype.nano = function nano() {
	        return this._nanos;
	    };
	
	    Duration.prototype.withSeconds = function withSeconds(seconds) {
	        return Duration._create(seconds, this._nanos);
	    };
	
	    Duration.prototype.withNanos = function withNanos(nanoOfSecond) {
	        _ChronoField.ChronoField.NANO_OF_SECOND.checkValidIntValue(nanoOfSecond);
	        return Duration._create(this._seconds, nanoOfSecond);
	    };
	
	    Duration.prototype.plusDuration = function plusDuration(duration) {
	        return this.plus(duration.seconds(), duration.nano());
	    };
	
	    Duration.prototype.plus = function plus(a, b) {
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
	    };
	
	    Duration.prototype.plusAmountUnit = function plusAmountUnit(amountToAdd, unit) {
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
	    };
	
	    Duration.prototype.plusDays = function plusDays(daysToAdd) {
	        return this.plusSecondsNanos(_MathUtil.MathUtil.safeMultiply(daysToAdd, _LocalTime.LocalTime.SECONDS_PER_DAY), 0);
	    };
	
	    Duration.prototype.plusHours = function plusHours(hoursToAdd) {
	        return this.plusSecondsNanos(_MathUtil.MathUtil.safeMultiply(hoursToAdd, _LocalTime.LocalTime.SECONDS_PER_HOUR), 0);
	    };
	
	    Duration.prototype.plusMinutes = function plusMinutes(minutesToAdd) {
	        return this.plusSecondsNanos(_MathUtil.MathUtil.safeMultiply(minutesToAdd, _LocalTime.LocalTime.SECONDS_PER_MINUTE), 0);
	    };
	
	    Duration.prototype.plusSeconds = function plusSeconds(secondsToAdd) {
	        return this.plusSecondsNanos(secondsToAdd, 0);
	    };
	
	    Duration.prototype.plusMillis = function plusMillis(millisToAdd) {
	        return this.plusSecondsNanos(_MathUtil.MathUtil.intDiv(millisToAdd, 1000), _MathUtil.MathUtil.intMod(millisToAdd, 1000) * 1000000);
	    };
	
	    Duration.prototype.plusNanos = function plusNanos(nanosToAdd) {
	        return this.plusSecondsNanos(0, nanosToAdd);
	    };
	
	    Duration.prototype.plusSecondsNanos = function plusSecondsNanos(secondsToAdd, nanosToAdd) {
	        if ((secondsToAdd | nanosToAdd) === 0) {
	            return this;
	        }
	        var epochSec = _MathUtil.MathUtil.safeAdd(this._seconds, secondsToAdd);
	        epochSec = _MathUtil.MathUtil.safeAdd(epochSec, _MathUtil.MathUtil.intDiv(nanosToAdd, _LocalTime.LocalTime.NANOS_PER_SECOND));
	        nanosToAdd = _MathUtil.MathUtil.intMod(nanosToAdd, _LocalTime.LocalTime.NANOS_PER_SECOND);
	        var nanoAdjustment = _MathUtil.MathUtil.safeAdd(this._nanos, nanosToAdd);
	        return Duration.ofSeconds(epochSec, nanoAdjustment);
	    };
	
	    Duration.prototype.minus = function minus(a, b) {
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
	    };
	
	    Duration.prototype.minusDuration = function minusDuration(duration) {
	        var secsToSubtract = duration.seconds();
	        var nanosToSubtract = duration.nano();
	        if (secsToSubtract === _MathUtil.MIN_SAFE_INTEGER) {
	            return this.plus(_MathUtil.MAX_SAFE_INTEGER, -nanosToSubtract).plus(1, 0);
	        }
	        return this.plus(-secsToSubtract, -nanosToSubtract);
	    };
	
	    Duration.prototype.minusAmountUnit = function minusAmountUnit(amountToSubtract, unit) {
	        return amountToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusAmountUnit(_MathUtil.MAX_SAFE_INTEGER, unit).plus(1, unit) : this.plusAmountUnit(-amountToSubtract, unit);
	    };
	
	    Duration.prototype.minusDays = function minusDays(daysToSubtract) {
	        return daysToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusDays(_MathUtil.MAX_SAFE_INTEGER).plusDays(1) : this.plusDays(-daysToSubtract);
	    };
	
	    Duration.prototype.minusHours = function minusHours(hoursToSubtract) {
	        return hoursToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusHours(_MathUtil.MAX_SAFE_INTEGER).plusHours(1) : this.plusHours(-hoursToSubtract);
	    };
	
	    Duration.prototype.minusMinutes = function minusMinutes(minutesToSubtract) {
	        return minutesToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusMinutes(_MathUtil.MAX_SAFE_INTEGER).plusMinutes(1) : this.plusMinutes(-minutesToSubtract);
	    };
	
	    Duration.prototype.minusSeconds = function minusSeconds(secondsToSubtract) {
	        return secondsToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusSeconds(_MathUtil.MAX_SAFE_INTEGER).plusSeconds(1) : this.plusSeconds(-secondsToSubtract);
	    };
	
	    Duration.prototype.minusMillis = function minusMillis(millisToSubtract) {
	        return millisToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusMillis(_MathUtil.MAX_SAFE_INTEGER).plusMillis(1) : this.plusMillis(-millisToSubtract);
	    };
	
	    Duration.prototype.minusNanos = function minusNanos(nanosToSubtract) {
	        return nanosToSubtract === _MathUtil.MIN_SAFE_INTEGER ? this.plusNanos(_MathUtil.MAX_SAFE_INTEGER).plusNanos(1) : this.plusNanos(-nanosToSubtract);
	    };
	
	    Duration.prototype.multipliedBy = function multipliedBy(multiplicand) {
	        if (multiplicand === 0) {
	            return Duration.ZERO;
	        }
	        if (multiplicand === 1) {
	            return this;
	        }
	        var secs = _MathUtil.MathUtil.safeMultiply(this._seconds, multiplicand);
	        var nos = _MathUtil.MathUtil.safeMultiply(this._nanos, multiplicand);
	        secs = secs + _MathUtil.MathUtil.intDiv(nos, _LocalTime.LocalTime.NANOS_PER_SECOND);
	        nos = _MathUtil.MathUtil.intMod(nos, _LocalTime.LocalTime.NANOS_PER_SECOND);
	        return Duration.ofSeconds(secs, nos);
	    };
	
	    Duration.prototype.dividedBy = function dividedBy(divisor) {
	        if (divisor === 0) {
	            throw new _errors.ArithmeticException('Cannot divide by zero');
	        }
	        if (divisor === 1) {
	            return this;
	        }
	        var secs = _MathUtil.MathUtil.intDiv(this._seconds, divisor);
	        var secsMod = _MathUtil.MathUtil.roundDown((this._seconds / divisor - secs) * _LocalTime.LocalTime.NANOS_PER_SECOND);
	        var nos = _MathUtil.MathUtil.intDiv(this._nanos, divisor);
	        nos = secsMod + nos;
	        return Duration.ofSeconds(secs, nos);
	    };
	
	    Duration.prototype.negated = function negated() {
	        return this.multipliedBy(-1);
	    };
	
	    Duration.prototype.abs = function abs() {
	        return this.isNegative() ? this.negated() : this;
	    };
	
	    Duration.prototype.addTo = function addTo(temporal) {
	        (0, _assert.requireNonNull)(temporal, 'temporal');
	        if (this._seconds !== 0) {
	            temporal = temporal.plus(this._seconds, _ChronoUnit.ChronoUnit.SECONDS);
	        }
	        if (this._nanos !== 0) {
	            temporal = temporal.plus(this._nanos, _ChronoUnit.ChronoUnit.NANOS);
	        }
	        return temporal;
	    };
	
	    Duration.prototype.subtractFrom = function subtractFrom(temporal) {
	        (0, _assert.requireNonNull)(temporal, 'temporal');
	        if (this._seconds !== 0) {
	            temporal = temporal.minus(this._seconds, _ChronoUnit.ChronoUnit.SECONDS);
	        }
	        if (this._nanos !== 0) {
	            temporal = temporal.minus(this._nanos, _ChronoUnit.ChronoUnit.NANOS);
	        }
	        return temporal;
	    };
	
	    Duration.prototype.toDays = function toDays() {
	        return _MathUtil.MathUtil.intDiv(this._seconds, _LocalTime.LocalTime.SECONDS_PER_DAY);
	    };
	
	    Duration.prototype.toHours = function toHours() {
	        return _MathUtil.MathUtil.intDiv(this._seconds, _LocalTime.LocalTime.SECONDS_PER_HOUR);
	    };
	
	    Duration.prototype.toMinutes = function toMinutes() {
	        return _MathUtil.MathUtil.intDiv(this._seconds, _LocalTime.LocalTime.SECONDS_PER_MINUTE);
	    };
	
	    Duration.prototype.toMillis = function toMillis() {
	        var millis = Math.round(_MathUtil.MathUtil.safeMultiply(this._seconds, 1000));
	        millis = _MathUtil.MathUtil.safeAdd(millis, _MathUtil.MathUtil.intDiv(this._nanos, 1000000));
	        return millis;
	    };
	
	    Duration.prototype.toNanos = function toNanos() {
	        var totalNanos = _MathUtil.MathUtil.safeMultiply(this._seconds, _LocalTime.LocalTime.NANOS_PER_SECOND);
	        totalNanos = _MathUtil.MathUtil.safeAdd(totalNanos, this._nanos);
	        return totalNanos;
	    };
	
	    Duration.prototype.compareTo = function compareTo(otherDuration) {
	        (0, _assert.requireNonNull)(otherDuration, 'otherDuration');
	        (0, _assert.requireInstance)(otherDuration, Duration, 'otherDuration');
	        var cmp = _MathUtil.MathUtil.compareNumbers(this._seconds, otherDuration.seconds());
	        if (cmp !== 0) {
	            return cmp;
	        }
	        return this._nanos - otherDuration.nano();
	    };
	
	    Duration.prototype.equals = function equals(otherDuration) {
	        if (this === otherDuration) {
	            return true;
	        }
	        if (otherDuration instanceof Duration) {
	            return this.seconds() === otherDuration.seconds() && this.nano() === otherDuration.nano();
	        }
	        return false;
	    };
	
	    Duration.prototype.toString = function toString() {
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
	            var nanoString = void 0;
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
	    };
	
	    return Duration;
	}(_TemporalAmount2.TemporalAmount);
	
	function _init() {
	    Duration.ZERO = new Duration(0, 0);
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.TemporalAmount = undefined;
	
	var _assert = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
	                                                                                                                                                           * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                           * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                           * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                           */
	
	var TemporalAmount = exports.TemporalAmount = function () {
	  function TemporalAmount() {
	    _classCallCheck(this, TemporalAmount);
	  }
	
	  TemporalAmount.prototype.get = function get(unit) {
	    (0, _assert.abstractMethodFail)('adjustInto');
	  };
	
	  TemporalAmount.prototype.getUnits = function getUnits() {
	    (0, _assert.abstractMethodFail)('adjustInto');
	  };
	
	  TemporalAmount.prototype.addTo = function addTo(temporal) {
	    (0, _assert.abstractMethodFail)('adjustInto');
	  };
	
	  TemporalAmount.prototype.subtractFrom = function subtractFrom(temporal) {
	    (0, _assert.abstractMethodFail)('adjustInto');
	  };
	
	  return TemporalAmount;
	}();

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
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
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
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
/* 18 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ValueRange = undefined;
	
	var _assert = __webpack_require__(2);
	
	var _errors = __webpack_require__(3);
	
	var _MathUtil = __webpack_require__(6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                           * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                           * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                           */
	
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
	
	    ValueRange.prototype.isFixed = function isFixed() {
	        return this._minSmallest === this._minLargest && this._maxSmallest === this._maxLargest;
	    };
	
	    ValueRange.prototype.minimum = function minimum() {
	        return this._minSmallest;
	    };
	
	    ValueRange.prototype.largestMinimum = function largestMinimum() {
	        return this._minLargest;
	    };
	
	    ValueRange.prototype.maximum = function maximum() {
	        return this._maxLargest;
	    };
	
	    ValueRange.prototype.smallestMaximum = function smallestMaximum() {
	        return this._maxSmallest;
	    };
	
	    ValueRange.prototype.isValidValue = function isValidValue(value) {
	        return this.minimum() <= value && value <= this.maximum();
	    };
	
	    ValueRange.prototype.checkValidValue = function checkValidValue(value, field) {
	        var msg;
	        if (!this.isValidValue(value)) {
	            if (field != null) {
	                msg = 'Invalid value for ' + field + ' (valid values ' + this.toString() + '): ' + value;
	            } else {
	                msg = 'Invalid value (valid values ' + this.toString() + '): ' + value;
	            }
	            return (0, _assert.assert)(false, msg, _errors.DateTimeException);
	        }
	    };
	
	    ValueRange.prototype.checkValidIntValue = function checkValidIntValue(value, field) {
	        if (this.isValidIntValue(value) === false) {
	            throw new _errors.DateTimeException('Invalid int value for ' + field + ': ' + value);
	        }
	        return value;
	    };
	
	    ValueRange.prototype.isValidIntValue = function isValidIntValue(value) {
	        return this.isIntValue() && this.isValidValue(value);
	    };
	
	    ValueRange.prototype.isIntValue = function isIntValue() {
	        return this.minimum() >= _MathUtil.MathUtil.MIN_SAFE_INTEGER && this.maximum() <= _MathUtil.MathUtil.MAX_SAFE_INTEGER;
	    };
	
	    ValueRange.prototype.equals = function equals(other) {
	        if (other === this) {
	            return true;
	        }
	        if (other instanceof ValueRange) {
	            return this._minSmallest === other._minSmallest && this._minLargest === other._minLargest && this._maxSmallest === other._maxSmallest && this._maxLargest === other._maxLargest;
	        }
	        return false;
	    };
	
	    ValueRange.prototype.hashCode = function hashCode() {
	        var hash = this._minSmallest + this._minLargest << 16 + this._minLargest >> 48 + this._maxSmallest << 32 + this._maxSmallest >> 32 + this._maxLargest << 48 + this._maxLargest >> 16;
	        return hash ^ hash >>> 32;
	    };
	
	    ValueRange.prototype.toString = function toString() {
	        var str = this.minimum() + (this.minimum() !== this.largestMinimum() ? '/' + this.largestMinimum() : '');
	        str += ' - ';
	        str += this.smallestMaximum() + (this.smallestMaximum() !== this.maximum() ? '/' + this.maximum() : '');
	        return str;
	    };
	
	    ValueRange.of = function of() {
	        if (arguments.length === 2) {
	            return new ValueRange(arguments[0], arguments[0], arguments[1], arguments[1]);
	        } else if (arguments.length === 3) {
	            return new ValueRange(arguments[0], arguments[0], arguments[1], arguments[2]);
	        } else if (arguments.length === 4) {
	            return new ValueRange(arguments[0], arguments[1], arguments[2], arguments[3]);
	        } else {
	            return (0, _assert.assert)(false, 'Invalid number of arguments ' + arguments.length, _errors.IllegalArgumentException);
	        }
	    };
	
	    return ValueRange;
	}();

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.Temporal = undefined;
	
	var _TemporalAccessor2 = __webpack_require__(21);
	
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

	    return _possibleConstructorReturn(this, _TemporalAccessor.apply(this, arguments));
	  }

	  return Temporal;
	}(_TemporalAccessor2.TemporalAccessor);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.TemporalAccessor = undefined;
	
	var _errors = __webpack_require__(3);
	
	var _ChronoField = __webpack_require__(12);
	
	var _TemporalQueries = __webpack_require__(22);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                           * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                           * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                           */
	
	var TemporalAccessor = function () {
	    function TemporalAccessor() {
	        _classCallCheck(this, TemporalAccessor);
	    }
	
	    TemporalAccessor.prototype.query = function query(_query) {
	        if (_query === _TemporalQueries.TemporalQueries.zoneId() || _query === _TemporalQueries.TemporalQueries.chronology() || _query === _TemporalQueries.TemporalQueries.precision()) {
	            return null;
	        }
	        return _query.queryFrom(this);
	    };
	
	    TemporalAccessor.prototype.get = function get(field) {
	        return this.range(field).checkValidIntValue(this.getLong(field), field);
	    };
	
	    TemporalAccessor.prototype.range = function range(field) {
	        if (field instanceof _ChronoField.ChronoField) {
	            if (this.isSupported(field)) {
	                return field.range();
	            }
	            throw new _errors.UnsupportedTemporalTypeException('Unsupported field: ' + field);
	        }
	        return field.rangeRefinedBy(this);
	    };
	
	    return TemporalAccessor;
	}();

	exports.TemporalAccessor = TemporalAccessor;

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	 */
	
	var TemporalQueries = exports.TemporalQueries = function () {
	  function TemporalQueries() {
	    _classCallCheck(this, TemporalQueries);
	  }
	
	  TemporalQueries.zoneId = function zoneId() {
	    return TemporalQueries.ZONE_ID;
	  };
	
	  TemporalQueries.chronology = function chronology() {
	    return TemporalQueries.CHRONO;
	  };
	
	  TemporalQueries.precision = function precision() {
	    return TemporalQueries.PRECISION;
	  };
	
	  TemporalQueries.zone = function zone() {
	    return TemporalQueries.ZONE;
	  };
	
	  TemporalQueries.offset = function offset() {
	    return TemporalQueries.OFFSET;
	  };
	
	  TemporalQueries.localDate = function localDate() {
	    return TemporalQueries.LOCAL_DATE;
	  };
	
	  TemporalQueries.localTime = function localTime() {
	    return TemporalQueries.LOCAL_TIME;
	  };
	
	  return TemporalQueries;
	}();

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ResolverStyle = undefined;
	
	var _Enum2 = __webpack_require__(10);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var ResolverStyle = exports.ResolverStyle = function (_Enum) {
	  _inherits(ResolverStyle, _Enum);
	
	  function ResolverStyle() {
	    _classCallCheck(this, ResolverStyle);
	
	    return _possibleConstructorReturn(this, _Enum.apply(this, arguments));
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
	
	exports.__esModule = true;
	exports.ChronoLocalDate = undefined;
	
	var _ChronoField = __webpack_require__(12);
	
	var _ChronoUnit = __webpack_require__(13);
	
	var _TemporalQueries = __webpack_require__(22);
	
	var _Temporal2 = __webpack_require__(20);
	
	var _LocalDate = __webpack_require__(8);
	
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
	
	        return _possibleConstructorReturn(this, _Temporal.apply(this, arguments));
	    }
	
	    ChronoLocalDate.prototype.isSupported = function isSupported(fieldOrUnit) {
	        if (fieldOrUnit instanceof _ChronoField.ChronoField) {
	            return fieldOrUnit.isDateBased();
	        } else if (fieldOrUnit instanceof _ChronoUnit.ChronoUnit) {
	            return fieldOrUnit.isDateBased();
	        }
	        return fieldOrUnit != null && fieldOrUnit.isSupportedBy(this);
	    };
	
	    ChronoLocalDate.prototype.query = function query(_query) {
	        if (_query === _TemporalQueries.TemporalQueries.chronology()) {
	            return this.chronology();
	        } else if (_query === _TemporalQueries.TemporalQueries.precision()) {
	            return _ChronoUnit.ChronoUnit.DAYS;
	        } else if (_query === _TemporalQueries.TemporalQueries.localDate()) {
	            return _LocalDate.LocalDate.ofEpochDay(this.toEpochDay());
	        } else if (_query === _TemporalQueries.TemporalQueries.localTime() || _query === _TemporalQueries.TemporalQueries.zone() || _query === _TemporalQueries.TemporalQueries.zoneId() || _query === _TemporalQueries.TemporalQueries.offset()) {
	            return null;
	        }
	        return _Temporal.prototype.query.call(this, _query);
	    };
	
	    ChronoLocalDate.prototype.adjustInto = function adjustInto(temporal) {
	        return temporal.with(_ChronoField.ChronoField.EPOCH_DAY, this.toEpochDay());
	    };
	
	    return ChronoLocalDate;
	}(_Temporal2.Temporal);

	exports.ChronoLocalDate = ChronoLocalDate;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.TemporalQuery = undefined;
	exports.createTemporalQuery = createTemporalQuery;
	
	var _assert = __webpack_require__(2);
	
	var _Enum2 = __webpack_require__(10);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var TemporalQuery = exports.TemporalQuery = function (_Enum) {
	  _inherits(TemporalQuery, _Enum);
	
	  function TemporalQuery() {
	    _classCallCheck(this, TemporalQuery);
	
	    return _possibleConstructorReturn(this, _Enum.apply(this, arguments));
	  }
	
	  TemporalQuery.prototype.queryFrom = function queryFrom(temporal) {
	    (0, _assert.abstractMethodFail)('queryFrom');
	  };
	
	  return TemporalQuery;
	}(_Enum2.Enum);
	
	function createTemporalQuery(name, queryFromFunction) {
	  var ExtendedTemporalQuery = function (_TemporalQuery) {
	    _inherits(ExtendedTemporalQuery, _TemporalQuery);
	
	    function ExtendedTemporalQuery() {
	      _classCallCheck(this, ExtendedTemporalQuery);
	
	      return _possibleConstructorReturn(this, _TemporalQuery.apply(this, arguments));
	    }
	
	    return ExtendedTemporalQuery;
	  }(TemporalQuery);
	
	  ExtendedTemporalQuery.prototype.queryFrom = queryFromFunction;
	  return new ExtendedTemporalQuery(name);
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.DateTimeFormatter = undefined;
	exports._init = _init;
	
	var _assert = __webpack_require__(2);
	
	var _errors = __webpack_require__(3);
	
	var _Period = __webpack_require__(27);
	
	var _ParsePosition = __webpack_require__(28);
	
	var _DateTimeBuilder = __webpack_require__(29);
	
	var _DateTimeParseContext = __webpack_require__(31);
	
	var _DateTimePrintContext = __webpack_require__(32);
	
	var _DateTimeFormatterBuilder = __webpack_require__(33);
	
	var _SignStyle = __webpack_require__(43);
	
	var _StringBuilder = __webpack_require__(44);
	
	var _ResolverStyle = __webpack_require__(23);
	
	var _IsoChronology = __webpack_require__(9);
	
	var _ChronoField = __webpack_require__(12);
	
	var _TemporalQuery = __webpack_require__(25);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                           * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                           * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                           */
	
	var DateTimeFormatter = exports.DateTimeFormatter = function () {
	    DateTimeFormatter.parsedExcessDays = function parsedExcessDays() {
	        return DateTimeFormatter.PARSED_EXCESS_DAYS;
	    };
	
	    DateTimeFormatter.parsedLeapSecond = function parsedLeapSecond() {
	        return DateTimeFormatter.PARSED_LEAP_SECOND;
	    };
	
	    function DateTimeFormatter(printerParser, locale, decimalStyle, resolverStyle, resolverFields) {
	        var chrono = arguments.length <= 5 || arguments[5] === undefined ? _IsoChronology.IsoChronology.INSTANCE : arguments[5];
	        var zone = arguments[6];
	
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
	
	    DateTimeFormatter.prototype.locale = function locale() {
	        return this._locale;
	    };
	
	    DateTimeFormatter.prototype.decimalStyle = function decimalStyle() {
	        return this._decimalStyle;
	    };
	
	    DateTimeFormatter.prototype.chronology = function chronology() {
	        return this._chrono;
	    };
	
	    DateTimeFormatter.prototype.withChronology = function withChronology(chrono) {
	        if (this._chrono != null && this._chrono.equals(chrono)) {
	            return this;
	        }
	        return new DateTimeFormatter(this._printerParser, this._locale, this._decimalStyle, this._resolverStyle, this._resolverFields, chrono, this._zone);
	    };
	
	    DateTimeFormatter.prototype.withLocal = function withLocal() {
	        return this;
	    };
	
	    DateTimeFormatter.prototype.format = function format(temporal) {
	        var buf = new _StringBuilder.StringBuilder(32);
	        this._formatTo(temporal, buf);
	        return buf.toString();
	    };
	
	    DateTimeFormatter.prototype._formatTo = function _formatTo(temporal, appendable) {
	        (0, _assert.requireNonNull)(temporal, 'temporal');
	        (0, _assert.requireNonNull)(appendable, 'appendable');
	        var context = new _DateTimePrintContext.DateTimePrintContext(temporal, this);
	        this._printerParser.print(context, appendable);
	    };
	
	    DateTimeFormatter.prototype.parse = function parse(text, type) {
	        if (arguments.length === 1) {
	            return this.parse1(text);
	        } else {
	            return this.parse2(text, type);
	        }
	    };
	
	    DateTimeFormatter.prototype.parse1 = function parse1(text) {
	        (0, _assert.requireNonNull)(text, 'text');
	        try {
	            return this._parseToBuilder(text, null).resolve(this._resolverStyle, this._resolverFields);
	        } catch (ex) {
	            if (ex instanceof _errors.DateTimeParseException) {
	                throw ex;
	            } else {
	                throw this._createError(text, ex);
	            }
	        }
	    };
	
	    DateTimeFormatter.prototype.parse2 = function parse2(text, type) {
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
	    };
	
	    DateTimeFormatter.prototype._createError = function _createError(text, ex) {
	        var abbr = '';
	        if (text.length > 64) {
	            abbr = text.subString(0, 64) + '...';
	        } else {
	            abbr = text;
	        }
	        return new _errors.DateTimeParseException('Text \'' + abbr + '\' could not be parsed: ' + ex.message, text, 0, ex);
	    };
	
	    DateTimeFormatter.prototype._parseToBuilder = function _parseToBuilder(text, position) {
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
	    };
	
	    DateTimeFormatter.prototype.parseUnresolved = function parseUnresolved(text, position) {
	        return this._parseUnresolved0(text, position);
	    };
	
	    DateTimeFormatter.prototype._parseUnresolved0 = function _parseUnresolved0(text, position) {
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
	    };
	
	    DateTimeFormatter.prototype.toPrinterParser = function toPrinterParser(optional) {
	        return this._printerParser.withOptional(optional);
	    };
	
	    DateTimeFormatter.prototype.toString = function toString() {
	        var pattern = this._printerParser.toString();
	        return pattern.indexOf('[') === 0 ? pattern : pattern.substring(1, pattern.length - 1);
	    };
	
	    return DateTimeFormatter;
	}();
	
	function _init() {
	
	    DateTimeFormatter.ISO_LOCAL_DATE = new _DateTimeFormatterBuilder.DateTimeFormatterBuilder().appendValue(_ChronoField.ChronoField.YEAR, 4, 10, _SignStyle.SignStyle.EXCEEDS_PAD).appendLiteral('-').appendValue(_ChronoField.ChronoField.MONTH_OF_YEAR, 2).appendLiteral('-').appendValue(_ChronoField.ChronoField.DAY_OF_MONTH, 2).toFormatter(_ResolverStyle.ResolverStyle.STRICT).withChronology(_IsoChronology.IsoChronology.INSTANCE);
	
	    DateTimeFormatter.ISO_LOCAL_TIME = new _DateTimeFormatterBuilder.DateTimeFormatterBuilder().appendValue(_ChronoField.ChronoField.HOUR_OF_DAY, 2).appendLiteral(':').appendValue(_ChronoField.ChronoField.MINUTE_OF_HOUR, 2).optionalStart().appendLiteral(':').appendValue(_ChronoField.ChronoField.SECOND_OF_MINUTE, 2).optionalStart().appendFraction(_ChronoField.ChronoField.NANO_OF_SECOND, 0, 9, true).toFormatter(_ResolverStyle.ResolverStyle.STRICT);
	
	    DateTimeFormatter.ISO_LOCAL_DATE_TIME = new _DateTimeFormatterBuilder.DateTimeFormatterBuilder().parseCaseInsensitive().append(DateTimeFormatter.ISO_LOCAL_DATE).appendLiteral('T').append(DateTimeFormatter.ISO_LOCAL_TIME).toFormatter(_ResolverStyle.ResolverStyle.STRICT).withChronology(_IsoChronology.IsoChronology.INSTANCE);
	
	    DateTimeFormatter.ISO_INSTANT = new _DateTimeFormatterBuilder.DateTimeFormatterBuilder().parseCaseInsensitive().appendInstant().toFormatter(_ResolverStyle.ResolverStyle.STRICT);
	
	    DateTimeFormatter.ISO_OFFSET_DATE_TIME = new _DateTimeFormatterBuilder.DateTimeFormatterBuilder().parseCaseInsensitive().append(DateTimeFormatter.ISO_LOCAL_DATE_TIME).appendOffsetId().toFormatter(_ResolverStyle.ResolverStyle.STRICT).withChronology(_IsoChronology.IsoChronology.INSTANCE);
	
	    DateTimeFormatter.ISO_ZONED_DATE_TIME = new _DateTimeFormatterBuilder.DateTimeFormatterBuilder().append(DateTimeFormatter.ISO_OFFSET_DATE_TIME).optionalStart().appendLiteral('[').parseCaseSensitive().appendZoneId().appendLiteral(']').toFormatter(_ResolverStyle.ResolverStyle.STRICT).withChronology(_IsoChronology.IsoChronology.INSTANCE);
	
	    DateTimeFormatter.PARSED_EXCESS_DAYS = (0, _TemporalQuery.createTemporalQuery)('PARSED_EXCESS_DAYS', function (temporal) {
	        if (temporal instanceof _DateTimeBuilder.DateTimeBuilder) {
	            return temporal.excessDays;
	        } else {
	            return _Period.Period.ZERO;
	        }
	    });
	
	    DateTimeFormatter.PARSED_LEAP_SECOND = (0, _TemporalQuery.createTemporalQuery)('PARSED_LEAP_SECOND', function (temporal) {
	        if (temporal instanceof _DateTimeBuilder.DateTimeBuilder) {
	            return temporal.leapSecond;
	        } else {
	            return false;
	        }
	    });
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.Period = undefined;
	exports._init = _init;
	
	var _MathUtil = __webpack_require__(6);
	
	var _assert = __webpack_require__(2);
	
	var _errors = __webpack_require__(3);
	
	var _IsoChronology = __webpack_require__(9);
	
	var _ChronoUnit = __webpack_require__(13);
	
	var _TemporalAmount2 = __webpack_require__(15);
	
	var _LocalDate = __webpack_require__(8);
	
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
	
	        var _this = _possibleConstructorReturn(this, _TemporalAmount.call(this));
	
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
	
	    Period._validate = function _validate(years, month, days) {
	        (0, _assert.requireNonNull)(years, 'years');
	        (0, _assert.requireNonNull)(month, 'month');
	        (0, _assert.requireNonNull)(days, 'days');
	        _MathUtil.MathUtil.safeToInt(years);
	        _MathUtil.MathUtil.safeToInt(month);
	        _MathUtil.MathUtil.safeToInt(days);
	    };
	
	    Period.ofYears = function ofYears(years) {
	        return Period.create(years, 0, 0);
	    };
	
	    Period.ofMonths = function ofMonths(months) {
	        return Period.create(0, months, 0);
	    };
	
	    Period.ofWeeks = function ofWeeks(weeks) {
	        return Period.create(0, 0, _MathUtil.MathUtil.safeMultiply(weeks, 7));
	    };
	
	    Period.ofDays = function ofDays(days) {
	        return Period.create(0, 0, days);
	    };
	
	    Period.of = function of(years, months, days) {
	        return Period.create(years, months, days);
	    };
	
	    Period.from = function from(amount) {
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
	    };
	
	    Period.between = function between(startDate, endDate) {
	        (0, _assert.requireNonNull)(startDate, 'startDate');
	        (0, _assert.requireNonNull)(endDate, 'endDate');
	        (0, _assert.requireInstance)(startDate, _LocalDate.LocalDate, 'startDate');
	        (0, _assert.requireInstance)(endDate, _LocalDate.LocalDate, 'endDate');
	        return startDate.until(endDate);
	    };
	
	    Period.parse = function parse(text) {
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
	    };
	
	    Period._parse = function _parse(text) {
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
	    };
	
	    Period._parseNumber = function _parseNumber(text, str, negate) {
	        if (str == null) {
	            return 0;
	        }
	        var val = _MathUtil.MathUtil.parseInt(str);
	        return _MathUtil.MathUtil.safeMultiply(val, negate);
	    };
	
	    Period.create = function create(years, months, days) {
	        return new Period(years, months, days);
	    };
	
	    Period.prototype.units = function units() {
	        return [_ChronoUnit.ChronoUnit.YEARS, _ChronoUnit.ChronoUnit.MONTHS, _ChronoUnit.ChronoUnit.DAYS];
	    };
	
	    Period.prototype.chronology = function chronology() {
	        return _IsoChronology.IsoChronology.INSTANCE;
	    };
	
	    Period.prototype.get = function get(unit) {
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
	    };
	
	    Period.prototype.isZero = function isZero() {
	        return this === Period.ZERO;
	    };
	
	    Period.prototype.isNegative = function isNegative() {
	        return this._years < 0 || this._months < 0 || this._days < 0;
	    };
	
	    Period.prototype.years = function years() {
	        return this._years;
	    };
	
	    Period.prototype.months = function months() {
	        return this._months;
	    };
	
	    Period.prototype.days = function days() {
	        return this._days;
	    };
	
	    Period.prototype.withYears = function withYears(years) {
	        if (years === this._years) {
	            return this;
	        }
	        return Period.create(years, this._months, this._days);
	    };
	
	    Period.prototype.withMonths = function withMonths(months) {
	        if (months === this._months) {
	            return this;
	        }
	        return Period.create(this._years, months, this._days);
	    };
	
	    Period.prototype.withDays = function withDays(days) {
	        if (days === this._days) {
	            return this;
	        }
	        return Period.create(this._years, this._months, days);
	    };
	
	    Period.prototype.plus = function plus(amountToAdd) {
	        var amount = Period.from(amountToAdd);
	        return Period.create(_MathUtil.MathUtil.safeAdd(this._years, amount._years), _MathUtil.MathUtil.safeAdd(this._months, amount._months), _MathUtil.MathUtil.safeAdd(this._days, amount._days));
	    };
	
	    Period.prototype.plusYears = function plusYears(yearsToAdd) {
	        if (yearsToAdd === 0) {
	            return this;
	        }
	        return Period.create(_MathUtil.MathUtil.safeToInt(_MathUtil.MathUtil.safeAdd(this._years, yearsToAdd)), this._months, this._days);
	    };
	
	    Period.prototype.plusMonths = function plusMonths(monthsToAdd) {
	        if (monthsToAdd === 0) {
	            return this;
	        }
	        return Period.create(this._years, _MathUtil.MathUtil.safeToInt(_MathUtil.MathUtil.safeAdd(this._months, monthsToAdd)), this._days);
	    };
	
	    Period.prototype.plusDays = function plusDays(daysToAdd) {
	        if (daysToAdd === 0) {
	            return this;
	        }
	        return Period.create(this._years, this._months, _MathUtil.MathUtil.safeToInt(_MathUtil.MathUtil.safeAdd(this._days, daysToAdd)));
	    };
	
	    Period.prototype.minus = function minus(amountToSubtract) {
	        var amount = Period.from(amountToSubtract);
	        return Period.create(_MathUtil.MathUtil.safeSubtract(this._years, amount._years), _MathUtil.MathUtil.safeSubtract(this._months, amount._months), _MathUtil.MathUtil.safeSubtract(this._days, amount._days));
	    };
	
	    Period.prototype.minusYears = function minusYears(yearsToSubtract) {
	        return this.plusYears(-1 * yearsToSubtract);
	    };
	
	    Period.prototype.minusMonths = function minusMonths(monthsToSubtract) {
	        return this.plusMonths(-1 * monthsToSubtract);
	    };
	
	    Period.prototype.minusDays = function minusDays(daysToSubtract) {
	        return this.plusDays(-1 * daysToSubtract);
	    };
	
	    Period.prototype.multipliedBy = function multipliedBy(scalar) {
	        if (this === Period.ZERO || scalar === 1) {
	            return this;
	        }
	        return Period.create(_MathUtil.MathUtil.safeMultiply(this._years, scalar), _MathUtil.MathUtil.safeMultiply(this._months, scalar), _MathUtil.MathUtil.safeMultiply(this._days, scalar));
	    };
	
	    Period.prototype.negated = function negated() {
	        return this.multipliedBy(-1);
	    };
	
	    Period.prototype.normalized = function normalized() {
	        var totalMonths = this.toTotalMonths();
	        var splitYears = _MathUtil.MathUtil.intDiv(totalMonths, 12);
	        var splitMonths = _MathUtil.MathUtil.intMod(totalMonths, 12);
	        if (splitYears === this._years && splitMonths === this._months) {
	            return this;
	        }
	        return Period.create(_MathUtil.MathUtil.safeToInt(splitYears), splitMonths, this._days);
	    };
	
	    Period.prototype.toTotalMonths = function toTotalMonths() {
	        return this._years * 12 + this._months;
	    };
	
	    Period.prototype.addTo = function addTo(temporal) {
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
	    };
	
	    Period.prototype.subtractFrom = function subtractFrom(temporal) {
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
	    };
	
	    Period.prototype.equals = function equals(obj) {
	        if (this === obj) {
	            return true;
	        }
	        if (obj instanceof Period) {
	            var other = obj;
	            return this._years === other._years && this._months === other._months && this._days === other._days;
	        }
	        return false;
	    };
	
	    Period.prototype.hashCode = function hashCode() {
	        return this._years + (this._months << 8) + (this._days << 16);
	    };
	
	    Period.prototype.toString = function toString() {
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
	    };
	
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
/* 28 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
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
	
	    ParsePosition.prototype.getIndex = function getIndex() {
	        return this._index;
	    };
	
	    ParsePosition.prototype.setIndex = function setIndex(index) {
	        this._index = index;
	    };
	
	    ParsePosition.prototype.getErrorIndex = function getErrorIndex() {
	        return this._errorIndex;
	    };
	
	    ParsePosition.prototype.setErrorIndex = function setErrorIndex(errorIndex) {
	        this._errorIndex = errorIndex;
	    };
	
	    return ParsePosition;
	}();

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.DateTimeBuilder = undefined;
	
	var _assert = __webpack_require__(2);
	
	var _errors = __webpack_require__(3);
	
	var _MathUtil = __webpack_require__(6);
	
	var _EnumMap = __webpack_require__(30);
	
	var _ResolverStyle = __webpack_require__(23);
	
	var _IsoChronology = __webpack_require__(9);
	
	var _ChronoLocalDate = __webpack_require__(24);
	
	var _ChronoField = __webpack_require__(12);
	
	var _Temporal2 = __webpack_require__(20);
	
	var _TemporalQueries = __webpack_require__(22);
	
	var _LocalTime = __webpack_require__(5);
	
	var _LocalDate = __webpack_require__(8);
	
	var _Period = __webpack_require__(27);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var DateTimeBuilder = function (_Temporal) {
	    _inherits(DateTimeBuilder, _Temporal);
	
	    DateTimeBuilder.create = function create(field, value) {
	        var dtb = new DateTimeBuilder();
	        dtb._addFieldValue(field, value);
	        return dtb;
	    };
	
	    function DateTimeBuilder() {
	        _classCallCheck(this, DateTimeBuilder);
	
	        var _this = _possibleConstructorReturn(this, _Temporal.call(this));
	
	        _this.fieldValues = new _EnumMap.EnumMap();
	
	        _this.chrono = null;
	
	        _this.zone = null;
	
	        _this.date = null;
	
	        _this.time = null;
	
	        _this.leapSecond = false;
	
	        _this.excessDays = null;
	        return _this;
	    }
	
	    DateTimeBuilder.prototype.getFieldValue0 = function getFieldValue0(field) {
	        return this.fieldValues.get(field);
	    };
	
	    DateTimeBuilder.prototype._addFieldValue = function _addFieldValue(field, value) {
	        (0, _assert.requireNonNull)(field, 'field');
	        var old = this.getFieldValue0(field);
	        if (old != null && old.longValue() !== value) {
	            throw new _errors.DateTimeException('Conflict found: ' + field + ' ' + old + ' differs from ' + field + ' ' + value + ': ' + this);
	        }
	        return this._putFieldValue0(field, value);
	    };
	
	    DateTimeBuilder.prototype._putFieldValue0 = function _putFieldValue0(field, value) {
	        this.fieldValues.put(field, value);
	        return this;
	    };
	
	    DateTimeBuilder.prototype.resolve = function resolve(resolverStyle, resolverFields) {
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
	    };
	
	    DateTimeBuilder.prototype._mergeDate = function _mergeDate(resolverStyle) {
	        this._checkDate(_IsoChronology.IsoChronology.INSTANCE.resolveDate(this.fieldValues, resolverStyle));
	    };
	
	    DateTimeBuilder.prototype._checkDate = function _checkDate(date) {
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
	    };
	
	    DateTimeBuilder.prototype._mergeTime = function _mergeTime(resolverStyle) {
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
	            var _ch = this.fieldValues.remove(_ChronoField.ChronoField.CLOCK_HOUR_OF_AMPM);
	            if (resolverStyle !== _ResolverStyle.ResolverStyle.LENIENT) {
	                if (resolverStyle === _ResolverStyle.ResolverStyle.SMART && _ch === 0) {} else {
	                        _ChronoField.ChronoField.CLOCK_HOUR_OF_AMPM.checkValidValue(_ch);
	                    }
	            }
	            this._addFieldValue(_ChronoField.ChronoField.HOUR_OF_AMPM, _ch === 12 ? 0 : _ch);
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
	            var _nos = this.fieldValues.get(_ChronoField.ChronoField.NANO_OF_SECOND);
	            this._addFieldValue(_ChronoField.ChronoField.MILLI_OF_SECOND, _MathUtil.MathUtil.intDiv(_nos, 1000000));
	            this.fieldValues.remove(_ChronoField.ChronoField.MILLI_OF_SECOND);
	        }
	        if (this.fieldValues.containsKey(_ChronoField.ChronoField.MICRO_OF_SECOND)) {
	            var _cos = this.fieldValues.remove(_ChronoField.ChronoField.MICRO_OF_SECOND);
	            this._addFieldValue(_ChronoField.ChronoField.NANO_OF_SECOND, _cos * 1000);
	        } else if (this.fieldValues.containsKey(_ChronoField.ChronoField.MILLI_OF_SECOND)) {
	            var _los = this.fieldValues.remove(_ChronoField.ChronoField.MILLI_OF_SECOND);
	            this._addFieldValue(_ChronoField.ChronoField.NANO_OF_SECOND, _los * 1000000);
	        }
	    };
	
	    DateTimeBuilder.prototype._resolveTimeInferZeroes = function _resolveTimeInferZeroes(resolverStyle) {
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
	                if (resolverStyle === _ResolverStyle.ResolverStyle.SMART && hod === 24 && (moh == null || moh === 0) && (som == null || som === 0) && (nos == null || nos === 0)) {
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
	                var _hodVal = hod;
	                if (moh != null) {
	                    if (som != null) {
	                        if (nos == null) {
	                            nos = 0;
	                        }
	                        var totalNanos = _MathUtil.MathUtil.safeMultiply(_hodVal, 3600000000000);
	                        totalNanos = _MathUtil.MathUtil.safeAdd(totalNanos, _MathUtil.MathUtil.safeMultiply(moh, 60000000000));
	                        totalNanos = _MathUtil.MathUtil.safeAdd(totalNanos, _MathUtil.MathUtil.safeMultiply(som, 1000000000));
	                        totalNanos = _MathUtil.MathUtil.safeAdd(totalNanos, nos);
	                        var excessDays = _MathUtil.MathUtil.floorDiv(totalNanos, 86400000000000);
	                        var nod = _MathUtil.MathUtil.floorMod(totalNanos, 86400000000000);
	                        this._addObject(_LocalTime.LocalTime.ofNanoOfDay(nod));
	                        this.excessDays = _Period.Period.ofDays(excessDays);
	                    } else {
	                        var totalSecs = _MathUtil.MathUtil.safeMultiply(_hodVal, 3600);
	                        totalSecs = _MathUtil.MathUtil.safeAdd(totalSecs, _MathUtil.MathUtil.safeMultiply(moh, 60));
	                        var _excessDays = _MathUtil.MathUtil.floorDiv(totalSecs, 86400);
	                        var sod = _MathUtil.MathUtil.floorMod(totalSecs, 86400);
	                        this._addObject(_LocalTime.LocalTime.ofSecondOfDay(sod));
	                        this.excessDays = _Period.Period.ofDays(_excessDays);
	                    }
	                } else {
	                    var _excessDays2 = _MathUtil.MathUtil.safeToInt(_MathUtil.MathUtil.floorDiv(_hodVal, 24));
	                    _hodVal = _MathUtil.MathUtil.floorMod(_hodVal, 24);
	                    this._addObject(_LocalTime.LocalTime.of(_hodVal, 0));
	                    this.excessDays = _Period.Period.ofDays(_excessDays2);
	                }
	            }
	        }
	        this.fieldValues.remove(_ChronoField.ChronoField.HOUR_OF_DAY);
	        this.fieldValues.remove(_ChronoField.ChronoField.MINUTE_OF_HOUR);
	        this.fieldValues.remove(_ChronoField.ChronoField.SECOND_OF_MINUTE);
	        this.fieldValues.remove(_ChronoField.ChronoField.NANO_OF_SECOND);
	    };
	
	    DateTimeBuilder.prototype._addObject = function _addObject(dateOrTime) {
	        if (dateOrTime instanceof _ChronoLocalDate.ChronoLocalDate) {
	            this.date = dateOrTime;
	        } else if (dateOrTime instanceof _LocalTime.LocalTime) {
	            this.time = dateOrTime;
	        }
	    };
	
	    DateTimeBuilder.prototype.build = function build(type) {
	        return type.queryFrom(this);
	    };
	
	    DateTimeBuilder.prototype.isSupported = function isSupported(field) {
	        if (field == null) {
	            return false;
	        }
	        return this.fieldValues.containsKey(field) || this.date != null && this.date.isSupported(field) || this.time != null && this.time.isSupported(field);
	    };
	
	    DateTimeBuilder.prototype.getLong = function getLong(field) {
	        (0, _assert.requireNonNull)(field, 'field');
	        var value = this.getFieldValue0(field);
	        if (value == null) {
	            if (this.date != null && this.date.isSupported(field)) {
	                return this.date.getLong(field);
	            }
	            if (this.time != null && this.time.isSupported(field)) {
	                return this.time.getLong(field);
	            }
	            throw new _errors.DateTimeException('Field not found: ' + field);
	        }
	        return value;
	    };
	
	    DateTimeBuilder.prototype.query = function query(_query) {
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
	    };
	
	    return DateTimeBuilder;
	}(_Temporal2.Temporal);

	exports.DateTimeBuilder = DateTimeBuilder;

/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
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
	
	    EnumMap.prototype.putAll = function putAll(otherMap) {
	        for (var key in otherMap._map) {
	            this._map[key] = otherMap._map[key];
	        }
	        return this;
	    };
	
	    EnumMap.prototype.containsKey = function containsKey(key) {
	        return this._map.hasOwnProperty(key.name());
	    };
	
	    EnumMap.prototype.get = function get(key) {
	        return this._map[key.name()];
	    };
	
	    EnumMap.prototype.put = function put(key, val) {
	        return this.set(key, val);
	    };
	
	    EnumMap.prototype.set = function set(key, val) {
	        this._map[key.name()] = val;
	        return this;
	    };
	
	    EnumMap.prototype.retainAll = function retainAll(keyList) {
	        var map = {};
	        for (var i = 0; i < keyList.length; i++) {
	            var key = keyList[i].name();
	            map[key] = this._map[key];
	        }
	        this._map = map;
	        return this;
	    };
	
	    EnumMap.prototype.remove = function remove(key) {
	        var keyName = key.name();
	        var val = this._map[keyName];
	        this._map[keyName] = undefined;
	        return val;
	    };
	
	    EnumMap.prototype.keySet = function keySet() {
	        return this._map;
	    };
	
	    EnumMap.prototype.clear = function clear() {
	        this._map = {};
	    };
	
	    return EnumMap;
	}();

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.DateTimeParseContext = undefined;
	
	var _assert = __webpack_require__(2);
	
	var _DateTimeBuilder = __webpack_require__(29);
	
	var _EnumMap = __webpack_require__(30);
	
	var _IsoChronology = __webpack_require__(9);
	
	var _Temporal2 = __webpack_require__(20);
	
	var _TemporalQueries = __webpack_require__(22);
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
	                                                                                                                                                           * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                           * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                           * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                           */
	
	var DateTimeParseContext = exports.DateTimeParseContext = function () {
	    function DateTimeParseContext() {
	        _classCallCheck(this, DateTimeParseContext);
	
	        if (arguments.length === 1) {
	            if (arguments[0] instanceof DateTimeParseContext) {
	                this._constructorSelf.apply(this, arguments);
	                return;
	            } else {
	                this._constructorFormatter.apply(this, arguments);
	            }
	        } else {
	            this._constructorParam.apply(this, arguments);
	        }
	
	        this._caseSensitive = true;
	        this._strict = true;
	        this._parsed = [new Parsed(this)];
	    }
	
	    DateTimeParseContext.prototype._constructorParam = function _constructorParam(locale, symbols, chronology) {
	        this._locale = locale;
	        this._symbols = symbols;
	        this._overrideChronology = chronology;
	    };
	
	    DateTimeParseContext.prototype._constructorFormatter = function _constructorFormatter(formatter) {
	        this._locale = formatter.locale();
	        this._symbols = formatter.decimalStyle();
	        this._overrideChronology = formatter.chronology();
	    };
	
	    DateTimeParseContext.prototype._constructorSelf = function _constructorSelf(other) {
	        this._locale = other._locale;
	        this._symbols = other._symbols;
	        this._overrideChronology = other._overrideChronology;
	        this._overrideZone = other._overrideZone;
	        this._caseSensitive = other._caseSensitive;
	        this._strict = other._strict;
	        this._parsed = [new Parsed(this)];
	    };
	
	    DateTimeParseContext.prototype.copy = function copy() {
	        return new DateTimeParseContext(this);
	    };
	
	    DateTimeParseContext.prototype.symbols = function symbols() {
	        return this._symbols;
	    };
	
	    DateTimeParseContext.prototype.isStrict = function isStrict() {
	        return this._strict;
	    };
	
	    DateTimeParseContext.prototype.setStrict = function setStrict(strict) {
	        this._strict = strict;
	    };
	
	    DateTimeParseContext.prototype.startOptional = function startOptional() {
	        this._parsed.push(this.currentParsed().copy());
	    };
	
	    DateTimeParseContext.prototype.endOptional = function endOptional(successful) {
	        if (successful) {
	            this._parsed.splice(this._parsed.length - 2, 1);
	        } else {
	            this._parsed.splice(this._parsed.length - 1, 1);
	        }
	    };
	
	    DateTimeParseContext.prototype.isCaseSensitive = function isCaseSensitive() {
	        return this._caseSensitive;
	    };
	
	    DateTimeParseContext.prototype.setCaseSensitive = function setCaseSensitive(caseSensitive) {
	        this._caseSensitive = caseSensitive;
	    };
	
	    DateTimeParseContext.prototype.subSequenceEquals = function subSequenceEquals(cs1, offset1, cs2, offset2, length) {
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
	    };
	
	    DateTimeParseContext.prototype.charEquals = function charEquals(ch1, ch2) {
	        if (this.isCaseSensitive()) {
	            return ch1 === ch2;
	        }
	        return this.charEqualsIgnoreCase(ch1, ch2);
	    };
	
	    DateTimeParseContext.prototype.charEqualsIgnoreCase = function charEqualsIgnoreCase(c1, c2) {
	        return c1 === c2 || c1.toLowerCase() === c2.toLowerCase();
	    };
	
	    DateTimeParseContext.prototype.setParsedField = function setParsedField(field, value, errorPos, successPos) {
	        var currentParsedFieldValues = this.currentParsed().fieldValues;
	        var old = currentParsedFieldValues.get(field);
	        currentParsedFieldValues.set(field, value);
	        return old != null && old !== value ? ~errorPos : successPos;
	    };
	
	    DateTimeParseContext.prototype.setParsedZone = function setParsedZone(zone) {
	        (0, _assert.requireNonNull)(zone, 'zone');
	        this.currentParsed().zone = zone;
	    };
	
	    DateTimeParseContext.prototype.getParsed = function getParsed(field) {
	        return this.currentParsed().fieldValues.get(field);
	    };
	
	    DateTimeParseContext.prototype.toParsed = function toParsed() {
	        return this.currentParsed();
	    };
	
	    DateTimeParseContext.prototype.currentParsed = function currentParsed() {
	        return this._parsed[this._parsed.length - 1];
	    };
	
	    DateTimeParseContext.prototype.setParsedLeapSecond = function setParsedLeapSecond() {
	        this.currentParsed().leapSecond = true;
	    };
	
	    DateTimeParseContext.prototype.getEffectiveChronology = function getEffectiveChronology() {
	        var chrono = this.currentParsed().chrono;
	        if (chrono == null) {
	            chrono = this._overrideChronology;
	            if (chrono == null) {
	                chrono = _IsoChronology.IsoChronology.INSTANCE;
	            }
	        }
	        return chrono;
	    };
	
	    return DateTimeParseContext;
	}();
	
	var Parsed = function (_Temporal) {
	    _inherits(Parsed, _Temporal);
	
	    function Parsed(dateTimeParseContext) {
	        _classCallCheck(this, Parsed);
	
	        var _this = _possibleConstructorReturn(this, _Temporal.call(this));
	
	        _this.chrono = null;
	        _this.zone = null;
	        _this.fieldValues = new _EnumMap.EnumMap();
	        _this.leapSecond = false;
	        _this.dateTimeParseContext = dateTimeParseContext;
	        return _this;
	    }
	
	    Parsed.prototype.copy = function copy() {
	        var cloned = new Parsed();
	        cloned.chrono = this.chrono;
	        cloned.zone = this.zone;
	        cloned.fieldValues.putAll(this.fieldValues);
	        cloned.leapSecond = this.leapSecond;
	        cloned.dateTimeParseContext = this.dateTimeParseContext;
	        return cloned;
	    };
	
	    Parsed.prototype.toString = function toString() {
	        return this.fieldValues + ', ' + this.chrono + ', ' + this.zone;
	    };
	
	    Parsed.prototype.isSupported = function isSupported(field) {
	        return this.fieldValues.containsKey(field);
	    };
	
	    Parsed.prototype.get = function get(field) {
	        var val = this.fieldValues.get(field);
	        (0, _assert.assert)(val != null);
	        return val;
	    };
	
	    Parsed.prototype.query = function query(_query) {
	        if (_query === _TemporalQueries.TemporalQueries.chronology()) {
	            return this.chrono;
	        }
	        if (_query === _TemporalQueries.TemporalQueries.zoneId() || _query === _TemporalQueries.TemporalQueries.zone()) {
	            return this.zone;
	        }
	        return _Temporal.prototype.query.call(this, _query);
	    };
	
	    Parsed.prototype.toBuilder = function toBuilder() {
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
	    };
	
	    return Parsed;
	}(_Temporal2.Temporal);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.DateTimePrintContext = undefined;
	
	var _errors = __webpack_require__(3);
	
	var _DateTimeFormatter = __webpack_require__(26);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
	                                                                                                                                                           * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                           * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                           * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                           */
	
	var DateTimePrintContext = exports.DateTimePrintContext = function () {
	    function DateTimePrintContext(temporal, localeOrFormatter, symbols) {
	        _classCallCheck(this, DateTimePrintContext);
	
	        if (arguments.length === 2 && arguments[1] instanceof _DateTimeFormatter.DateTimeFormatter) {
	            this._temporal = DateTimePrintContext.adjust(temporal, localeOrFormatter);
	            this._locale = localeOrFormatter.locale();
	            this._symbols = localeOrFormatter.decimalStyle();
	        } else {
	            this._temporal = temporal;
	            this._locale = localeOrFormatter;
	            this._symbols = symbols;
	        }
	        this._optional = 0;
	    }
	
	    DateTimePrintContext.adjust = function adjust(temporal, formatter) {
	        return temporal;
	    };
	
	    DateTimePrintContext.prototype.symbols = function symbols() {
	        return this._symbols;
	    };
	
	    DateTimePrintContext.prototype.startOptional = function startOptional() {
	        this._optional++;
	    };
	
	    DateTimePrintContext.prototype.endOptional = function endOptional() {
	        this._optional--;
	    };
	
	    DateTimePrintContext.prototype.getValueQuery = function getValueQuery(query) {
	        var result = this._temporal.query(query);
	        if (result == null && this._optional === 0) {
	            throw new _errors.DateTimeException('Unable to extract value: ' + this._temporal);
	        }
	        return result;
	    };
	
	    DateTimePrintContext.prototype.getValue = function getValue(field) {
	        try {
	            return this._temporal.getLong(field);
	        } catch (ex) {
	            if (ex instanceof _errors.DateTimeException && this._optional > 0) {
	                return null;
	            }
	            throw ex;
	        }
	    };
	
	    DateTimePrintContext.prototype.temporal = function temporal() {
	        return this._temporal;
	    };
	
	    DateTimePrintContext.prototype.setDateTime = function setDateTime(temporal) {
	        this._temporal = temporal;
	    };
	
	    return DateTimePrintContext;
	}();

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.DateTimeFormatterBuilder = undefined;
	
	var _assert = __webpack_require__(2);
	
	var _errors = __webpack_require__(3);
	
	var _Enum2 = __webpack_require__(10);
	
	var _ZoneIdFactory = __webpack_require__(34);
	
	var _LocalDateTime = __webpack_require__(7);
	
	var _ZoneOffset = __webpack_require__(36);
	
	var _ZoneId = __webpack_require__(37);
	
	var _ChronoField = __webpack_require__(12);
	
	var _TemporalQueries = __webpack_require__(22);
	
	var _DateTimeFormatter = __webpack_require__(26);
	
	var _DecimalStyle = __webpack_require__(42);
	
	var _SignStyle = __webpack_require__(43);
	
	var _ResolverStyle = __webpack_require__(23);
	
	var _MathUtil = __webpack_require__(6);
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                           * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                           * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                           */
	
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
	
	    DateTimeFormatterBuilder.prototype.parseCaseSensitive = function parseCaseSensitive() {
	        this._appendInternalPrinterParser(SettingsParser.SENSITIVE);
	        return this;
	    };
	
	    DateTimeFormatterBuilder.prototype.parseCaseInsensitive = function parseCaseInsensitive() {
	        this._appendInternalPrinterParser(SettingsParser.INSENSITIVE);
	        return this;
	    };
	
	    DateTimeFormatterBuilder.prototype.parseStrict = function parseStrict() {
	        this._appendInternalPrinterParser(SettingsParser.STRICT);
	        return this;
	    };
	
	    DateTimeFormatterBuilder.prototype.parseLenient = function parseLenient() {
	        this._appendInternalPrinterParser(SettingsParser.LENIENT);
	        return this;
	    };
	
	    DateTimeFormatterBuilder.prototype.appendValue = function appendValue() {
	        if (arguments.length === 1) {
	            return this._appendValue1.apply(this, arguments);
	        } else if (arguments.length === 2) {
	            return this._appendValue2.apply(this, arguments);
	        } else {
	            return this._appendValue4.apply(this, arguments);
	        }
	    };
	
	    DateTimeFormatterBuilder.prototype._appendValue1 = function _appendValue1(field) {
	        (0, _assert.assert)(field != null);
	        this._appendValuePrinterParser(new NumberPrinterParser(field, 1, MAX_WIDTH, _SignStyle.SignStyle.NORMAL));
	        return this;
	    };
	
	    DateTimeFormatterBuilder.prototype._appendValue2 = function _appendValue2(field, width) {
	        (0, _assert.assert)(field != null);
	        if (width < 1 || width > MAX_WIDTH) {
	            throw new _errors.IllegalArgumentException('The width must be from 1 to ' + MAX_WIDTH + ' inclusive but was ' + width);
	        }
	        var pp = new NumberPrinterParser(field, width, width, _SignStyle.SignStyle.NOT_NEGATIVE);
	        this._appendValuePrinterParser(pp);
	        return this;
	    };
	
	    DateTimeFormatterBuilder.prototype._appendValue4 = function _appendValue4(field, minWidth, maxWidth, signStyle) {
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
	    };
	
	    DateTimeFormatterBuilder.prototype._appendValuePrinterParser = function _appendValuePrinterParser(pp) {
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
	    };
	
	    DateTimeFormatterBuilder.prototype.appendFraction = function appendFraction(field, minWidth, maxWidth, decimalPoint) {
	        this._appendInternal(new FractionPrinterParser(field, minWidth, maxWidth, decimalPoint));
	        return this;
	    };
	
	    DateTimeFormatterBuilder.prototype.appendInstant = function appendInstant() {
	        var fractionalDigits = arguments.length <= 0 || arguments[0] === undefined ? -2 : arguments[0];
	
	        if (fractionalDigits < -2 || fractionalDigits > 9) {
	            throw new _errors.IllegalArgumentException('Invalid fractional digits: ' + fractionalDigits);
	        }
	        this._appendInternal(new InstantPrinterParser(fractionalDigits));
	        return this;
	    };
	
	    DateTimeFormatterBuilder.prototype.appendOffsetId = function appendOffsetId() {
	        this._appendInternal(OffsetIdPrinterParser.INSTANCE_ID);
	        return this;
	    };
	
	    DateTimeFormatterBuilder.prototype.appendZoneId = function appendZoneId() {
	        this._appendInternal(new ZoneIdPrinterParser(_TemporalQueries.TemporalQueries.zoneId(), 'ZoneId()'));
	        return this;
	    };
	
	    DateTimeFormatterBuilder.prototype.optionalStart = function optionalStart() {
	        this._active.valueParserIndex = -1;
	        this._active = new DateTimeFormatterBuilder(this._active, true);
	        return this;
	    };
	
	    DateTimeFormatterBuilder.prototype.optionalEnd = function optionalEnd() {
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
	    };
	
	    DateTimeFormatterBuilder.prototype._appendInternal = function _appendInternal(pp) {
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
	    };
	
	    DateTimeFormatterBuilder.prototype.appendLiteral = function appendLiteral(literal) {
	        (0, _assert.assert)(literal != null);
	        this._appendInternalPrinterParser(new StringLiteralPrinterParser(literal));
	        return this;
	    };
	
	    DateTimeFormatterBuilder.prototype._appendInternalPrinterParser = function _appendInternalPrinterParser(pp) {
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
	    };
	
	    DateTimeFormatterBuilder.prototype.append = function append(formatter) {
	        (0, _assert.requireNonNull)(formatter, 'formatter');
	        this._appendInternal(formatter.toPrinterParser(false));
	        return this;
	    };
	
	    DateTimeFormatterBuilder.prototype.toFormatter = function toFormatter() {
	        var resolverStyle = arguments.length <= 0 || arguments[0] === undefined ? _ResolverStyle.ResolverStyle.SMART : arguments[0];
	
	        while (this._active._parent != null) {
	            this.optionalEnd();
	        }
	        var pp = new CompositePrinterParser(this._printerParsers, false);
	        return new _DateTimeFormatter.DateTimeFormatter(pp, null, _DecimalStyle.DecimalStyle.STANDARD, resolverStyle, null, null, null);
	    };
	
	    return DateTimeFormatterBuilder;
	}();
	
	var EXCEED_POINTS = [0, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000];
	
	var CompositePrinterParser = function () {
	    function CompositePrinterParser(printerParsers, optional) {
	        _classCallCheck(this, CompositePrinterParser);
	
	        this._printerParsers = printerParsers;
	        this._optional = optional;
	    }
	
	    CompositePrinterParser.prototype.withOptional = function withOptional(optional) {
	        if (optional === this._optional) {
	            return this;
	        }
	        return new CompositePrinterParser(this._printerParsers, optional);
	    };
	
	    CompositePrinterParser.prototype.print = function print(context, buf) {
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
	    };
	
	    CompositePrinterParser.prototype.parse = function parse(context, text, position) {
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
	            for (var _i = 0; _i < this._printerParsers.length; _i++) {
	                var _pp = this._printerParsers[_i];
	                position = _pp.parse(context, text, position);
	                if (position < 0) {
	                    break;
	                }
	            }
	            return position;
	        }
	    };
	
	    CompositePrinterParser.prototype.toString = function toString() {
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
	    };
	
	    return CompositePrinterParser;
	}();
	
	var PadPrinterParserDecorator = function () {
	    function PadPrinterParserDecorator(printerParser, padWidth, padChar) {
	        _classCallCheck(this, PadPrinterParserDecorator);
	
	        this._printerParser = printerParser;
	        this._padWidth = padWidth;
	        this._padChar = padChar;
	    }
	
	    PadPrinterParserDecorator.prototype.print = function print(context, buf) {
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
	    };
	
	    PadPrinterParserDecorator.prototype.parse = function parse(context, text, position) {
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
	    };
	
	    PadPrinterParserDecorator.prototype.toString = function toString() {
	        return 'Pad(' + this._printerParser + ',' + this._padWidth + (this._padChar === ' ' ? ')' : ',\'' + this._padChar + '\')');
	    };
	
	    return PadPrinterParserDecorator;
	}();
	
	var SettingsParser = function (_Enum) {
	    _inherits(SettingsParser, _Enum);
	
	    function SettingsParser() {
	        _classCallCheck(this, SettingsParser);
	
	        return _possibleConstructorReturn(this, _Enum.apply(this, arguments));
	    }
	
	    SettingsParser.prototype.print = function print() {
	        return true;
	    };
	
	    SettingsParser.prototype.parse = function parse(context, text, position) {
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
	    };
	
	    SettingsParser.prototype.toString = function toString() {
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
	    };
	
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
	
	    StringLiteralPrinterParser.prototype.print = function print(context, buf) {
	        buf.append(this._literal);
	        return true;
	    };
	
	    StringLiteralPrinterParser.prototype.parse = function parse(context, text, position) {
	        var length = text.length;
	        (0, _assert.assert)(!(position > length || position < 0));
	
	        if (context.subSequenceEquals(text, position, this._literal, 0, this._literal.length) === false) {
	            return ~position;
	        }
	        return position + this._literal.length;
	    };
	
	    StringLiteralPrinterParser.prototype.toString = function toString() {
	        return '\'' + this._literal + '\'';
	    };
	
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
	
	    NumberPrinterParser.prototype.field = function field() {
	        return this._field;
	    };
	
	    NumberPrinterParser.prototype.minWidth = function minWidth() {
	        return this._minWidth;
	    };
	
	    NumberPrinterParser.prototype.maxWidth = function maxWidth() {
	        return this._maxWidth;
	    };
	
	    NumberPrinterParser.prototype.signStyle = function signStyle() {
	        return this._signStyle;
	    };
	
	    NumberPrinterParser.prototype.withSubsequentWidth = function withSubsequentWidth(subsequentWidth) {
	        return new NumberPrinterParser(this._field, this._minWidth, this._maxWidth, this._signStyle, this._subsequentWidth + subsequentWidth);
	    };
	
	    NumberPrinterParser.prototype._isFixedWidth = function _isFixedWidth() {
	        return this._subsequentWidth === -1 || this._subsequentWidth > 0 && this._minWidth === this._maxWidth && this._signStyle === _SignStyle.SignStyle.NOT_NEGATIVE;
	    };
	
	    NumberPrinterParser.prototype.print = function print(context, buf) {
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
	    };
	
	    NumberPrinterParser.prototype.parse = function parse(context, text, position) {
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
	            var _parseLen = pos - position;
	            if (positive) {
	                if (_parseLen <= this._minWidth) {
	                    return ~(position - 1);
	                }
	            } else {
	                    if (_parseLen > this._minWidth) {
	                        return ~position;
	                    }
	                }
	        }
	        return this._setValue(context, total, position, pos);
	    };
	
	    NumberPrinterParser.prototype._setValue = function _setValue(context, value, errorPos, successPos) {
	        return context.setParsedField(this._field, value, errorPos, successPos);
	    };
	
	    NumberPrinterParser.prototype.toString = function toString() {
	        if (this._minWidth === 1 && this._maxWidth === MAX_WIDTH && this._signStyle === _SignStyle.SignStyle.NORMAL) {
	            return 'Value(' + this._field + ')';
	        }
	        if (this._minWidth === this._maxWidth && this._signStyle === _SignStyle.SignStyle.NOT_NEGATIVE) {
	            return 'Value(' + this._field + ',' + this._minWidth + ')';
	        }
	        return 'Value(' + this._field + ',' + this._minWidth + ',' + this._maxWidth + ',' + this._signStyle + ')';
	    };
	
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
	
	    FractionPrinterParser.prototype.print = function print(context, buf) {
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
	    };
	
	    FractionPrinterParser.prototype.parse = function parse(context, text, position) {
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
	    };
	
	    FractionPrinterParser.prototype.convertToFraction = function convertToFraction(value, zeroDigit) {
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
	    };
	
	    FractionPrinterParser.prototype.convertFromFraction = function convertFromFraction(total, scale) {
	        var range = this.field.range();
	        var _min = range.minimum();
	        var _range = range.maximum() - _min + 1;
	        var _value = _MathUtil.MathUtil.intDiv(total * _range, scale);
	        return _value;
	    };
	
	    FractionPrinterParser.prototype.toString = function toString() {
	        var decimal = this.decimalPoint ? ',DecimalPoint' : '';
	        return 'Fraction(' + this.field + ',' + this.minWidth + ',' + this.maxWidth + decimal + ')';
	    };
	
	    return FractionPrinterParser;
	}();
	
	var SECONDS_PER_10000_YEARS = 146097 * 25 * 86400;
	var SECONDS_0000_TO_1970 = (146097 * 5 - (30 * 365 + 7)) * 86400;
	
	var InstantPrinterParser = function () {
	    function InstantPrinterParser(fractionalDigits) {
	        _classCallCheck(this, InstantPrinterParser);
	
	        this.fractionalDigits = fractionalDigits;
	    }
	
	    InstantPrinterParser.prototype.print = function print(context, buf) {
	        var inSecs = context.getValue(_ChronoField.ChronoField.INSTANT_SECONDS);
	        var inNanos = 0;
	        if (context.temporal().isSupported(_ChronoField.ChronoField.NANO_OF_SECOND)) {
	            inNanos = context.temporal().getLong(_ChronoField.ChronoField.NANO_OF_SECOND);
	        }
	        if (inSecs == null) {
	            return false;
	        }
	        var inSec = inSecs;
	        var inNano = _ChronoField.ChronoField.NANO_OF_SECOND.checkValidIntValue(inNanos);
	        if (inSec >= -SECONDS_0000_TO_1970) {
	            var zeroSecs = inSec - SECONDS_PER_10000_YEARS + SECONDS_0000_TO_1970;
	            var hi = _MathUtil.MathUtil.floorDiv(zeroSecs, SECONDS_PER_10000_YEARS) + 1;
	            var lo = _MathUtil.MathUtil.floorMod(zeroSecs, SECONDS_PER_10000_YEARS);
	            var ldt = _LocalDateTime.LocalDateTime.ofEpochSecond(lo - SECONDS_0000_TO_1970, 0, _ZoneOffset.ZoneOffset.UTC);
	            if (hi > 0) {
	                buf.append('+').append(hi);
	            }
	            buf.append(ldt);
	            if (ldt.second() === 0) {
	                buf.append(':00');
	            }
	        } else {
	            var _zeroSecs = inSec + SECONDS_0000_TO_1970;
	            var _hi = _MathUtil.MathUtil.intDiv(_zeroSecs, SECONDS_PER_10000_YEARS);
	            var _lo = _MathUtil.MathUtil.intMod(_zeroSecs, SECONDS_PER_10000_YEARS);
	            var _ldt = _LocalDateTime.LocalDateTime.ofEpochSecond(_lo - SECONDS_0000_TO_1970, 0, _ZoneOffset.ZoneOffset.UTC);
	            var pos = buf.length();
	            buf.append(_ldt);
	            if (_ldt.second() === 0) {
	                buf.append(':00');
	            }
	            if (_hi < 0) {
	                if (_ldt.year() === -10000) {
	                    buf.replace(pos, pos + 2, '' + (_hi - 1));
	                } else if (_lo === 0) {
	                    buf.insert(pos, _hi);
	                } else {
	                    buf.insert(pos + 1, Math.abs(_hi));
	                }
	            }
	        }
	
	        if (this.fractionalDigits === -2) {
	            if (inNano !== 0) {
	                buf.append('.');
	                if (_MathUtil.MathUtil.intMod(inNano, 1000000) === 0) {
	                    buf.append(('' + (_MathUtil.MathUtil.intDiv(inNano, 1000000) + 1000)).substring(1));
	                } else if (_MathUtil.MathUtil.intMod(inNano, 1000) === 0) {
	                    buf.append(('' + (_MathUtil.MathUtil.intDiv(inNano, 1000) + 1000000)).substring(1));
	                } else {
	                    buf.append(('' + (inNano + 1000000000)).substring(1));
	                }
	            }
	        } else if (this.fractionalDigits > 0 || this.fractionalDigits === -1 && inNano > 0) {
	            buf.append('.');
	            var div = 100000000;
	            for (var i = 0; this.fractionalDigits === -1 && inNano > 0 || i < this.fractionalDigits; i++) {
	                var digit = _MathUtil.MathUtil.intDiv(inNano, div);
	                buf.append(digit);
	                inNano = inNano - digit * div;
	                div = _MathUtil.MathUtil.intDiv(div, 10);
	            }
	        }
	        buf.append('Z');
	        return true;
	    };
	
	    InstantPrinterParser.prototype.parse = function parse(context, text, position) {
	        var newContext = context.copy();
	        var minDigits = this.fractionalDigits < 0 ? 0 : this.fractionalDigits;
	        var maxDigits = this.fractionalDigits < 0 ? 9 : this.fractionalDigits;
	        var parser = new DateTimeFormatterBuilder().append(_DateTimeFormatter.DateTimeFormatter.ISO_LOCAL_DATE).appendLiteral('T').appendValue(_ChronoField.ChronoField.HOUR_OF_DAY, 2).appendLiteral(':').appendValue(_ChronoField.ChronoField.MINUTE_OF_HOUR, 2).appendLiteral(':').appendValue(_ChronoField.ChronoField.SECOND_OF_MINUTE, 2).appendFraction(_ChronoField.ChronoField.NANO_OF_SECOND, minDigits, maxDigits, true).appendLiteral('Z').toFormatter().toPrinterParser(false);
	        var pos = parser.parse(newContext, text, position);
	        if (pos < 0) {
	            return pos;
	        }
	
	        var yearParsed = newContext.getParsed(_ChronoField.ChronoField.YEAR);
	        var month = newContext.getParsed(_ChronoField.ChronoField.MONTH_OF_YEAR);
	        var day = newContext.getParsed(_ChronoField.ChronoField.DAY_OF_MONTH);
	        var hour = newContext.getParsed(_ChronoField.ChronoField.HOUR_OF_DAY);
	        var min = newContext.getParsed(_ChronoField.ChronoField.MINUTE_OF_HOUR);
	        var secVal = newContext.getParsed(_ChronoField.ChronoField.SECOND_OF_MINUTE);
	        var nanoVal = newContext.getParsed(_ChronoField.ChronoField.NANO_OF_SECOND);
	        var sec = secVal != null ? secVal : 0;
	        var nano = nanoVal != null ? nanoVal : 0;
	        var year = _MathUtil.MathUtil.intMod(yearParsed, 10000);
	        var days = 0;
	        if (hour === 24 && min === 0 && sec === 0 && nano === 0) {
	            hour = 0;
	            days = 1;
	        } else if (hour === 23 && min === 59 && sec === 60) {
	            context.setParsedLeapSecond();
	            sec = 59;
	        }
	        var instantSecs;
	        try {
	            var ldt = _LocalDateTime.LocalDateTime.of(year, month, day, hour, min, sec, 0).plusDays(days);
	            instantSecs = ldt.toEpochSecond(_ZoneOffset.ZoneOffset.UTC);
	            instantSecs += _MathUtil.MathUtil.safeMultiply(_MathUtil.MathUtil.intDiv(yearParsed, 10000), SECONDS_PER_10000_YEARS);
	        } catch (ex) {
	            return ~position;
	        }
	        var successPos = pos;
	        successPos = context.setParsedField(_ChronoField.ChronoField.INSTANT_SECONDS, instantSecs, position, successPos);
	        return context.setParsedField(_ChronoField.ChronoField.NANO_OF_SECOND, nano, position, successPos);
	    };
	
	    InstantPrinterParser.prototype.toString = function toString() {
	        return 'Instant()';
	    };
	
	    return InstantPrinterParser;
	}();
	
	var PATTERNS = ['+HH', '+HHmm', '+HH:mm', '+HHMM', '+HH:MM', '+HHMMss', '+HH:MM:ss', '+HHMMSS', '+HH:MM:SS'];
	
	var OffsetIdPrinterParser = function () {
	    function OffsetIdPrinterParser(noOffsetText, pattern) {
	        _classCallCheck(this, OffsetIdPrinterParser);
	
	        (0, _assert.requireNonNull)(noOffsetText, 'noOffsetText');
	        (0, _assert.requireNonNull)(pattern, 'pattern');
	        this.noOffsetText = noOffsetText;
	        this.type = this._checkPattern(pattern);
	    }
	
	    OffsetIdPrinterParser.prototype._checkPattern = function _checkPattern(pattern) {
	        for (var i = 0; i < PATTERNS.length; i++) {
	            if (PATTERNS[i] === pattern) {
	                return i;
	            }
	        }
	        throw new _errors.IllegalArgumentException('Invalid zone offset pattern: ' + pattern);
	    };
	
	    OffsetIdPrinterParser.prototype.print = function print(context, buf) {
	        var offsetSecs = context.getValue(_ChronoField.ChronoField.OFFSET_SECONDS);
	        if (offsetSecs == null) {
	            return false;
	        }
	        var totalSecs = _MathUtil.MathUtil.safeToInt(offsetSecs);
	        if (totalSecs === 0) {
	            buf.append(this.noOffsetText);
	        } else {
	            var absHours = Math.abs(_MathUtil.MathUtil.intMod(_MathUtil.MathUtil.intDiv(totalSecs, 3600), 100));
	            var absMinutes = Math.abs(_MathUtil.MathUtil.intMod(_MathUtil.MathUtil.intDiv(totalSecs, 60), 60));
	            var absSeconds = Math.abs(_MathUtil.MathUtil.intMod(totalSecs, 60));
	            var bufPos = buf.length();
	            var output = absHours;
	            buf.append(totalSecs < 0 ? '-' : '+').appendChar(_MathUtil.MathUtil.intDiv(absHours, 10) + '0').appendChar(_MathUtil.MathUtil.intMod(absHours, 10) + '0');
	            if (this.type >= 3 || this.type >= 1 && absMinutes > 0) {
	                buf.append(this.type % 2 === 0 ? ':' : '').appendChar(_MathUtil.MathUtil.intDiv(absMinutes, 10) + '0').appendChar(absMinutes % 10 + '0');
	                output += absMinutes;
	                if (this.type >= 7 || this.type >= 5 && absSeconds > 0) {
	                    buf.append(this.type % 2 === 0 ? ':' : '').appendChar(_MathUtil.MathUtil.intDiv(absSeconds, 10) + '0').appendChar(absSeconds % 10 + '0');
	                    output += absSeconds;
	                }
	            }
	            if (output === 0) {
	                buf.setLength(bufPos);
	                buf.append(this.noOffsetText);
	            }
	        }
	        return true;
	    };
	
	    OffsetIdPrinterParser.prototype.parse = function parse(context, text, position) {
	        var length = text.length;
	        var noOffsetLen = this.noOffsetText.length;
	        if (noOffsetLen === 0) {
	            if (position === length) {
	                return context.setParsedField(_ChronoField.ChronoField.OFFSET_SECONDS, 0, position, position);
	            }
	        } else {
	            if (position === length) {
	                return ~position;
	            }
	            if (context.subSequenceEquals(text, position, this.noOffsetText, 0, noOffsetLen)) {
	                return context.setParsedField(_ChronoField.ChronoField.OFFSET_SECONDS, 0, position, position + noOffsetLen);
	            }
	        }
	
	        var sign = text[position];
	        if (sign === '+' || sign === '-') {
	            var negative = sign === '-' ? -1 : 1;
	            var array = [0, 0, 0, 0];
	            array[0] = position + 1;
	            if ((this._parseNumber(array, 1, text, true) || this._parseNumber(array, 2, text, this.type >= 3) || this._parseNumber(array, 3, text, false)) === false) {
	                var offsetSecs = _MathUtil.MathUtil.safeZero(negative * (array[1] * 3600 + array[2] * 60 + array[3]));
	                return context.setParsedField(_ChronoField.ChronoField.OFFSET_SECONDS, offsetSecs, position, array[0]);
	            }
	        }
	
	        if (noOffsetLen === 0) {
	            return context.setParsedField(_ChronoField.ChronoField.OFFSET_SECONDS, 0, position, position + noOffsetLen);
	        }
	        return ~position;
	    };
	
	    OffsetIdPrinterParser.prototype._parseNumber = function _parseNumber(array, arrayIndex, parseText, required) {
	        if ((this.type + 3) / 2 < arrayIndex) {
	            return false;
	        }
	        var pos = array[0];
	        if (this.type % 2 === 0 && arrayIndex > 1) {
	            if (pos + 1 > parseText.length || parseText[pos] !== ':') {
	                return required;
	            }
	            pos++;
	        }
	        if (pos + 2 > parseText.length) {
	            return required;
	        }
	        var ch1 = parseText[pos++];
	        var ch2 = parseText[pos++];
	        if (ch1 < '0' || ch1 > '9' || ch2 < '0' || ch2 > '9') {
	            return required;
	        }
	        var value = (ch1.charCodeAt(0) - 48) * 10 + (ch2.charCodeAt(0) - 48);
	        if (value < 0 || value > 59) {
	            return required;
	        }
	        array[arrayIndex] = value;
	        array[0] = pos;
	        return false;
	    };
	
	    OffsetIdPrinterParser.prototype.toString = function toString() {
	        var converted = this.noOffsetText.replace('\'', '\'\'');
	        return 'Offset(' + PATTERNS[this.type] + ',"' + converted + '")';
	    };
	
	    return OffsetIdPrinterParser;
	}();
	
	OffsetIdPrinterParser.INSTANCE_ID = new OffsetIdPrinterParser('Z', '+HH:MM:ss');
	
	var ZoneIdPrinterParser = function () {
	    function ZoneIdPrinterParser(query, description) {
	        _classCallCheck(this, ZoneIdPrinterParser);
	
	        this.query = query;
	        this.description = description;
	    }
	
	    ZoneIdPrinterParser.prototype.print = function print(context, buf) {
	        var zone = context.getValueQuery(this.query);
	        if (zone == null) {
	            return false;
	        }
	        buf.append(zone.id());
	        return true;
	    };
	
	    ZoneIdPrinterParser.prototype.parse = function parse(context, text, position) {
	        var length = text.length;
	        if (position > length) {
	            return ~position;
	        }
	        if (position === length) {
	            return ~position;
	        }
	
	        var nextChar = text.charAt(position);
	        if (nextChar === '+' || nextChar === '-') {
	            var newContext = context.copy();
	            var endPos = OffsetIdPrinterParser.INSTANCE_ID.parse(newContext, text, position);
	            if (endPos < 0) {
	                return endPos;
	            }
	            var offset = newContext.getParsed(_ChronoField.ChronoField.OFFSET_SECONDS);
	            var zone = _ZoneOffset.ZoneOffset.ofTotalSeconds(offset);
	            context.setParsedZone(zone);
	            return endPos;
	        } else if (length >= position + 2) {
	            var nextNextChar = text.charAt(position + 1);
	            if (context.charEquals(nextChar, 'U') && context.charEquals(nextNextChar, 'T')) {
	                if (length >= position + 3 && context.charEquals(text.charAt(position + 2), 'C')) {
	                    return this._parsePrefixedOffset(context, text, position, position + 3);
	                }
	                return this._parsePrefixedOffset(context, text, position, position + 2);
	            } else if (context.charEquals(nextChar, 'G') && length >= position + 3 && context.charEquals(nextNextChar, 'M') && context.charEquals(text.charAt(position + 2), 'T')) {
	                return this._parsePrefixedOffset(context, text, position, position + 3);
	            }
	        }
	
	        if (text.substr(position, 6) === 'SYSTEM') {
	            context.setParsedZone(_ZoneId.ZoneId.systemDefault());
	            return position + 6;
	        }
	
	        if (context.charEquals(nextChar, 'Z')) {
	            context.setParsedZone(_ZoneOffset.ZoneOffset.UTC);
	            return position + 1;
	        }
	
	        return ~position;
	    };
	
	    ZoneIdPrinterParser.prototype._parsePrefixedOffset = function _parsePrefixedOffset(context, text, prefixPos, position) {
	        var prefix = text.substring(prefixPos, position).toUpperCase();
	        var newContext = context.copy();
	        if (position < text.length && context.charEquals(text.charAt(position), 'Z')) {
	            context.setParsedZone(_ZoneIdFactory.ZoneIdFactory.ofOffset(prefix, _ZoneOffset.ZoneOffset.UTC));
	            return position;
	        }
	        var endPos = OffsetIdPrinterParser.INSTANCE_ID.parse(newContext, text, position);
	        if (endPos < 0) {
	            context.setParsedZone(_ZoneIdFactory.ZoneIdFactory.ofOffset(prefix, _ZoneOffset.ZoneOffset.UTC));
	            return position;
	        }
	        var offsetSecs = newContext.getParsed(_ChronoField.ChronoField.OFFSET_SECONDS);
	        var offset = _ZoneOffset.ZoneOffset.ofTotalSeconds(offsetSecs);
	        context.setParsedZone(_ZoneIdFactory.ZoneIdFactory.ofOffset(prefix, offset));
	        return endPos;
	    };
	
	    ZoneIdPrinterParser.prototype.toString = function toString() {
	        return this.description;
	    };
	
	    return ZoneIdPrinterParser;
	}();
	
	DateTimeFormatterBuilder.CompositePrinterParser = CompositePrinterParser;
	DateTimeFormatterBuilder.PadPrinterParserDecorator = PadPrinterParserDecorator;
	DateTimeFormatterBuilder.SettingsParser = SettingsParser;
	DateTimeFormatterBuilder.CharLiteralPrinterParser = StringLiteralPrinterParser;
	DateTimeFormatterBuilder.StringLiteralPrinterParser = StringLiteralPrinterParser;
	DateTimeFormatterBuilder.NumberPrinterParser = NumberPrinterParser;
	DateTimeFormatterBuilder.FractionPrinterParser = FractionPrinterParser;
	DateTimeFormatterBuilder.OffsetIdPrinterParser = OffsetIdPrinterParser;
	DateTimeFormatterBuilder.ZoneIdPrinterParser = ZoneIdPrinterParser;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ZoneIdFactory = undefined;
	exports._init = _init;
	
	var _assert = __webpack_require__(2);
	
	var _errors = __webpack_require__(3);
	
	var _StringUtil = __webpack_require__(35);
	
	var _ZoneOffset = __webpack_require__(36);
	
	var _ZoneRegion = __webpack_require__(39);
	
	var _ZoneId = __webpack_require__(37);
	
	var _TemporalQueries = __webpack_require__(22);
	
	var _SystemDefaultZoneId = __webpack_require__(40);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
	                                                                                                                                                           * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                           * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                           * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                           */
	
	var ZoneIdFactory = exports.ZoneIdFactory = function () {
	    function ZoneIdFactory() {
	        _classCallCheck(this, ZoneIdFactory);
	    }
	
	    ZoneIdFactory.systemDefault = function systemDefault() {
	        return SYSTEM_DEFAULT_ZONE_ID_INSTANCE;
	    };
	
	    ZoneIdFactory.of = function of(zoneId) {
	        (0, _assert.requireNonNull)(zoneId, 'zoneId');
	        if (zoneId === 'Z') {
	            return _ZoneOffset.ZoneOffset.UTC;
	        }
	        if (zoneId.length === 1) {
	            throw new _errors.DateTimeException('Invalid zone: ' + zoneId);
	        }
	        if (_StringUtil.StringUtil.startsWith(zoneId, '+') || _StringUtil.StringUtil.startsWith(zoneId, '-')) {
	            return _ZoneOffset.ZoneOffset.of(zoneId);
	        }
	        if (zoneId === 'UTC' || zoneId === 'GMT' || zoneId === 'UT') {
	            return new _ZoneRegion.ZoneRegion(zoneId, _ZoneOffset.ZoneOffset.UTC.rules());
	        }
	        if (_StringUtil.StringUtil.startsWith(zoneId, 'UTC+') || _StringUtil.StringUtil.startsWith(zoneId, 'GMT+') || _StringUtil.StringUtil.startsWith(zoneId, 'UTC-') || _StringUtil.StringUtil.startsWith(zoneId, 'GMT-')) {
	            var offset = _ZoneOffset.ZoneOffset.of(zoneId.substring(3));
	            if (offset.totalSeconds() === 0) {
	                return new _ZoneRegion.ZoneRegion(zoneId.substring(0, 3), offset.rules());
	            }
	            return new _ZoneRegion.ZoneRegion(zoneId.substring(0, 3) + offset.id(), offset.rules());
	        }
	        if (_StringUtil.StringUtil.startsWith(zoneId, 'UT+') || _StringUtil.StringUtil.startsWith(zoneId, 'UT-')) {
	            var _offset = _ZoneOffset.ZoneOffset.of(zoneId.substring(2));
	            if (_offset.totalSeconds() === 0) {
	                return new _ZoneRegion.ZoneRegion('UT', _offset.rules());
	            }
	            return new _ZoneRegion.ZoneRegion('UT' + _offset.id(), _offset.rules());
	        }
	
	        if (zoneId === 'SYSTEM') {
	            return _ZoneId.ZoneId.systemDefault();
	        }
	        return _ZoneRegion.ZoneRegion.ofId(zoneId, true);
	    };
	
	    ZoneIdFactory.ofOffset = function ofOffset(prefix, offset) {
	        (0, _assert.requireNonNull)(prefix, 'prefix');
	        (0, _assert.requireNonNull)(offset, 'offset');
	        if (prefix.length === 0) {
	            return offset;
	        }
	        if (prefix === 'GMT' || prefix === 'UTC' || prefix === 'UT') {
	            if (offset.totalSeconds() === 0) {
	                return new _ZoneRegion.ZoneRegion(prefix, offset.rules());
	            }
	            return new _ZoneRegion.ZoneRegion(prefix + offset.id(), offset.rules());
	        }
	        throw new _errors.IllegalArgumentException('Invalid prefix, must be GMT, UTC or UT: ' + prefix);
	    };
	
	    ZoneIdFactory.from = function from(temporal) {
	        (0, _assert.requireNonNull)(temporal, 'temporal');
	        var obj = temporal.query(_TemporalQueries.TemporalQueries.zone());
	        if (obj == null) {
	            throw new _errors.DateTimeException('Unable to obtain ZoneId from TemporalAccessor: ' + temporal + ', type ' + (temporal.constructor != null ? temporal.constructor.name : ''));
	        }
	        return obj;
	    };
	
	    return ZoneIdFactory;
	}();
	
	var SYSTEM_DEFAULT_ZONE_ID_INSTANCE = null;
	
	function _init() {
	    SYSTEM_DEFAULT_ZONE_ID_INSTANCE = new _SystemDefaultZoneId.SystemDefaultZoneId();
	
	    _ZoneId.ZoneId.systemDefault = ZoneIdFactory.systemDefault;
	    _ZoneId.ZoneId.of = ZoneIdFactory.of;
	    _ZoneId.ZoneId.ofOffset = ZoneIdFactory.ofOffset;
	    _ZoneId.ZoneId.from = ZoneIdFactory.from;
	    _ZoneOffset.ZoneOffset.from = ZoneIdFactory.from;
	
	    _ZoneId.ZoneId.SYSTEM = SYSTEM_DEFAULT_ZONE_ID_INSTANCE;
	    _ZoneId.ZoneId.UTC = _ZoneOffset.ZoneOffset.ofTotalSeconds(0);
	}

/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
	 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	 */
	
	var StringUtil = exports.StringUtil = function () {
	    function StringUtil() {
	        _classCallCheck(this, StringUtil);
	    }
	
	    StringUtil.startsWith = function startsWith(text, pattern) {
	        return text.indexOf(pattern) === 0;
	    };
	
	    StringUtil.hashCode = function hashCode(text) {
	        var hash = 0,
	            i,
	            chr,
	            len;
	        if (text.length === 0) return hash;
	        for (i = 0, len = text.length; i < len; i++) {
	            chr = text.charCodeAt(i);
	            hash = (hash << 5) - hash + chr;
	            hash |= 0;
	        }
	        return hash;
	    };
	
	    return StringUtil;
	}();

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ZoneOffset = undefined;
	exports._init = _init;
	
	var _assert = __webpack_require__(2);
	
	var _errors = __webpack_require__(3);
	
	var _MathUtil = __webpack_require__(6);
	
	var _LocalTime = __webpack_require__(5);
	
	var _ZoneId2 = __webpack_require__(37);
	
	var _ChronoField = __webpack_require__(12);
	
	var _TemporalQueries = __webpack_require__(22);
	
	var _ZoneRules = __webpack_require__(38);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var SECONDS_CACHE = {};
	var ID_CACHE = {};
	
	var ZoneOffset = function (_ZoneId) {
	    _inherits(ZoneOffset, _ZoneId);
	
	    function ZoneOffset(totalSeconds) {
	        _classCallCheck(this, ZoneOffset);
	
	        var _this = _possibleConstructorReturn(this, _ZoneId.call(this));
	
	        ZoneOffset._validateTotalSeconds(totalSeconds);
	        _this._totalSeconds = totalSeconds;
	        _this._rules = _ZoneRules.ZoneRules.of(_this);
	        _this._id = ZoneOffset._buildId(totalSeconds);
	        return _this;
	    }
	
	    ZoneOffset.prototype.totalSeconds = function totalSeconds() {
	        return this._totalSeconds;
	    };
	
	    ZoneOffset.prototype.id = function id() {
	        return this._id;
	    };
	
	    ZoneOffset._buildId = function _buildId(totalSeconds) {
	        if (totalSeconds === 0) {
	            return 'Z';
	        } else {
	            var absTotalSeconds = Math.abs(totalSeconds);
	            var absHours = _MathUtil.MathUtil.intDiv(absTotalSeconds, _LocalTime.LocalTime.SECONDS_PER_HOUR);
	            var absMinutes = _MathUtil.MathUtil.intMod(_MathUtil.MathUtil.intDiv(absTotalSeconds, _LocalTime.LocalTime.SECONDS_PER_MINUTE), _LocalTime.LocalTime.MINUTES_PER_HOUR);
	            var buf = '' + (totalSeconds < 0 ? '-' : '+') + (absHours < 10 ? '0' : '') + absHours + (absMinutes < 10 ? ':0' : ':') + absMinutes;
	            var absSeconds = _MathUtil.MathUtil.intMod(absTotalSeconds, _LocalTime.LocalTime.SECONDS_PER_MINUTE);
	            if (absSeconds !== 0) {
	                buf += (absSeconds < 10 ? ':0' : ':') + absSeconds;
	            }
	            return buf;
	        }
	    };
	
	    ZoneOffset._validateTotalSeconds = function _validateTotalSeconds(totalSeconds) {
	        if (Math.abs(totalSeconds) > ZoneOffset.MAX_SECONDS) {
	            throw new _errors.DateTimeException('Zone offset not in valid range: -18:00 to +18:00');
	        }
	    };
	
	    ZoneOffset._validate = function _validate(hours, minutes, seconds) {
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
	    };
	
	    ZoneOffset.of = function of(offsetId) {
	        (0, _assert.requireNonNull)(offsetId, 'offsetId');
	
	        var offset = ID_CACHE[offsetId];
	        if (offset != null) {
	            return offset;
	        }
	
	        var hours, minutes, seconds;
	        switch (offsetId.length) {
	            case 2:
	                offsetId = offsetId[0] + '0' + offsetId[1];
	            case 3:
	                hours = ZoneOffset._parseNumber(offsetId, 1, false);
	                minutes = 0;
	                seconds = 0;
	                break;
	            case 5:
	                hours = ZoneOffset._parseNumber(offsetId, 1, false);
	                minutes = ZoneOffset._parseNumber(offsetId, 3, false);
	                seconds = 0;
	                break;
	            case 6:
	                hours = ZoneOffset._parseNumber(offsetId, 1, false);
	                minutes = ZoneOffset._parseNumber(offsetId, 4, true);
	                seconds = 0;
	                break;
	            case 7:
	                hours = ZoneOffset._parseNumber(offsetId, 1, false);
	                minutes = ZoneOffset._parseNumber(offsetId, 3, false);
	                seconds = ZoneOffset._parseNumber(offsetId, 5, false);
	                break;
	            case 9:
	                hours = ZoneOffset._parseNumber(offsetId, 1, false);
	                minutes = ZoneOffset._parseNumber(offsetId, 4, true);
	                seconds = ZoneOffset._parseNumber(offsetId, 7, true);
	                break;
	            default:
	                throw new _errors.DateTimeException('Invalid ID for ZoneOffset, invalid format: ' + offsetId);
	        }
	        var first = offsetId[0];
	        if (first !== '+' && first !== '-') {
	            throw new _errors.DateTimeException('Invalid ID for ZoneOffset, plus/minus not found when expected: ' + offsetId);
	        }
	        if (first === '-') {
	            return ZoneOffset.ofHoursMinutesSeconds(-hours, -minutes, -seconds);
	        } else {
	            return ZoneOffset.ofHoursMinutesSeconds(hours, minutes, seconds);
	        }
	    };
	
	    ZoneOffset._parseNumber = function _parseNumber(offsetId, pos, precededByColon) {
	        if (precededByColon && offsetId[pos - 1] !== ':') {
	            throw new _errors.DateTimeException('Invalid ID for ZoneOffset, colon not found when expected: ' + offsetId);
	        }
	        var ch1 = offsetId[pos];
	        var ch2 = offsetId[pos + 1];
	        if (ch1 < '0' || ch1 > '9' || ch2 < '0' || ch2 > '9') {
	            throw new _errors.DateTimeException('Invalid ID for ZoneOffset, non numeric characters found: ' + offsetId);
	        }
	        return (ch1.charCodeAt(0) - 48) * 10 + (ch2.charCodeAt(0) - 48);
	    };
	
	    ZoneOffset.ofHours = function ofHours(hours) {
	        return ZoneOffset.ofHoursMinutesSeconds(hours, 0, 0);
	    };
	
	    ZoneOffset.ofHoursMinutes = function ofHoursMinutes(hours, minutes) {
	        return ZoneOffset.ofHoursMinutesSeconds(hours, minutes, 0);
	    };
	
	    ZoneOffset.ofHoursMinutesSeconds = function ofHoursMinutesSeconds(hours, minutes, seconds) {
	        ZoneOffset._validate(hours, minutes, seconds);
	        var totalSeconds = hours * _LocalTime.LocalTime.SECONDS_PER_HOUR + minutes * _LocalTime.LocalTime.SECONDS_PER_MINUTE + seconds;
	        return ZoneOffset.ofTotalSeconds(totalSeconds);
	    };
	
	    ZoneOffset.ofTotalMinutes = function ofTotalMinutes(totalMinutes) {
	        var totalSeconds = totalMinutes * _LocalTime.LocalTime.SECONDS_PER_MINUTE;
	        return ZoneOffset.ofTotalSeconds(totalSeconds);
	    };
	
	    ZoneOffset.ofTotalSeconds = function ofTotalSeconds(totalSeconds) {
	        if (totalSeconds % (15 * _LocalTime.LocalTime.SECONDS_PER_MINUTE) === 0) {
	            var totalSecs = totalSeconds;
	            var result = SECONDS_CACHE[totalSecs];
	            if (result == null) {
	                result = new ZoneOffset(totalSeconds);
	                SECONDS_CACHE[totalSecs] = result;
	                ID_CACHE[result.id()] = result;
	            }
	            return result;
	        } else {
	            return new ZoneOffset(totalSeconds);
	        }
	    };
	
	    ZoneOffset.prototype.rules = function rules() {
	        return this._rules;
	    };
	
	    ZoneOffset.prototype.get = function get(field) {
	        return this.getLong(field);
	    };
	
	    ZoneOffset.prototype.getLong = function getLong(field) {
	        if (field === _ChronoField.ChronoField.OFFSET_SECONDS) {
	            return this._totalSeconds;
	        } else if (field instanceof _ChronoField.ChronoField) {
	            throw new _errors.DateTimeException('Unsupported field: ' + field);
	        }
	        return field.getFrom(this);
	    };
	
	    ZoneOffset.prototype.query = function query(_query) {
	        (0, _assert.requireNonNull)(_query, 'query');
	        if (_query === _TemporalQueries.TemporalQueries.offset() || _query === _TemporalQueries.TemporalQueries.zone()) {
	            return this;
	        } else if (_query === _TemporalQueries.TemporalQueries.localDate() || _query === _TemporalQueries.TemporalQueries.localTime() || _query === _TemporalQueries.TemporalQueries.precision() || _query === _TemporalQueries.TemporalQueries.chronology() || _query === _TemporalQueries.TemporalQueries.zoneId()) {
	            return null;
	        }
	        return _query.queryFrom(this);
	    };
	
	    ZoneOffset.prototype.adjustInto = function adjustInto(temporal) {
	        return temporal.with(_ChronoField.ChronoField.OFFSET_SECONDS, this._totalSeconds);
	    };
	
	    ZoneOffset.prototype.compareTo = function compareTo(other) {
	        (0, _assert.requireNonNull)(other, 'other');
	        return other._totalSeconds - this._totalSeconds;
	    };
	
	    ZoneOffset.prototype.equals = function equals(obj) {
	        if (this === obj) {
	            return true;
	        }
	        if (obj instanceof ZoneOffset) {
	            return this._totalSeconds === obj._totalSeconds;
	        }
	        return false;
	    };
	
	    ZoneOffset.prototype.hashCode = function hashCode() {
	        return this._totalSeconds;
	    };
	
	    ZoneOffset.prototype.id = function id() {
	        return this._id;
	    };
	
	    ZoneOffset.prototype.toString = function toString() {
	        return this._id;
	    };
	
	    return ZoneOffset;
	}(_ZoneId2.ZoneId);
	
	exports.ZoneOffset = ZoneOffset;
	function _init() {
	    ZoneOffset.MAX_SECONDS = 18 * _LocalTime.LocalTime.SECONDS_PER_HOUR;
	    ZoneOffset.UTC = ZoneOffset.ofTotalSeconds(0);
	    ZoneOffset.MIN = ZoneOffset.ofTotalSeconds(-ZoneOffset.MAX_SECONDS);
	    ZoneOffset.MAX = ZoneOffset.ofTotalSeconds(ZoneOffset.MAX_SECONDS);
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ZoneId = undefined;
	
	var _assert = __webpack_require__(2);
	
	var _StringUtil = __webpack_require__(35);
	
	var _Instant = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
	                                                                                                                                                           * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                           * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                           * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                           */
	
	var ZoneId = exports.ZoneId = function () {
	    function ZoneId() {
	        _classCallCheck(this, ZoneId);
	    }
	
	    ZoneId.prototype.rules = function rules() {
	        (0, _assert.abstractMethodFail)('ZoneId.rules');
	    };
	
	    ZoneId.prototype.normalized = function normalized() {
	        var rules = this.rules();
	        if (rules.isFixedOffset()) {
	            return rules.offset(_Instant.Instant.EPOCH);
	        }
	
	        return this;
	    };
	
	    ZoneId.prototype.equals = function equals(other) {
	        if (this === other) {
	            return true;
	        }
	        if (other instanceof ZoneId) {
	            return this.id() === other.id();
	        }
	        return false;
	    };
	
	    ZoneId.prototype.hashCode = function hashCode() {
	        return _StringUtil.StringUtil.hashCode(this.id());
	    };
	
	    ZoneId.prototype.toString = function toString() {
	        return this.id();
	    };
	
	    return ZoneId;
	}();

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ZoneRules = undefined;
	
	var _assert = __webpack_require__(2);
	
	var _Instant = __webpack_require__(4);
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
	                                                                                                                                                           * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                           * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                           * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                           */
	
	var ZoneRules = exports.ZoneRules = function () {
	    function ZoneRules() {
	        _classCallCheck(this, ZoneRules);
	    }
	
	    ZoneRules.of = function of(offset) {
	        (0, _assert.requireNonNull)(offset, 'offset');
	        return new Fixed(offset);
	    };
	
	    ZoneRules.prototype.isFixedOffset = function isFixedOffset() {
	        (0, _assert.abstractMethodFail)('ZoneRules.isFixedOffset');
	    };
	
	    ZoneRules.prototype.offset = function offset(instantOrLocalDateTime) {
	        if (instantOrLocalDateTime instanceof _Instant.Instant) {
	            return this.offsetOfInstant(instantOrLocalDateTime);
	        } else {
	            return this.offsetOfLocalDateTime(instantOrLocalDateTime);
	        }
	    };
	
	    ZoneRules.prototype.offsetOfInstant = function offsetOfInstant(instant) {
	        (0, _assert.abstractMethodFail)('ZoneRules.offsetInstant');
	    };
	
	    ZoneRules.prototype.offsetOfEpochMilli = function offsetOfEpochMilli(epochMilli) {
	        (0, _assert.abstractMethodFail)('ZoneRules.offsetOfEpochMilli');
	    };
	
	    ZoneRules.prototype.offsetOfLocalDateTime = function offsetOfLocalDateTime(localDateTime) {
	        (0, _assert.abstractMethodFail)('ZoneRules.offsetLocalDateTime');
	    };
	
	    ZoneRules.prototype.isValidOffset = function isValidOffset(localDateTime, offset) {
	        (0, _assert.abstractMethodFail)('ZoneRules.isValidOffset');
	    };
	
	    return ZoneRules;
	}();
	
	var Fixed = function (_ZoneRules) {
	    _inherits(Fixed, _ZoneRules);
	
	    function Fixed(offset) {
	        _classCallCheck(this, Fixed);
	
	        var _this = _possibleConstructorReturn(this, _ZoneRules.call(this));
	
	        _this._offset = offset;
	        return _this;
	    }
	
	    Fixed.prototype.isFixedOffset = function isFixedOffset() {
	        return true;
	    };
	
	    Fixed.prototype.offsetOfInstant = function offsetOfInstant() {
	        return this._offset;
	    };
	
	    Fixed.prototype.offsetOfEpochMilli = function offsetOfEpochMilli() {
	        return this._offset;
	    };
	
	    Fixed.prototype.offsetOfLocalDateTime = function offsetOfLocalDateTime() {
	        return this._offset;
	    };
	
	    Fixed.prototype.isValidOffset = function isValidOffset(dateTime, offset) {
	        return this._offset.equals(offset);
	    };
	
	    Fixed.prototype.equals = function equals(other) {
	        if (this === other) {
	            return true;
	        }
	        if (other instanceof Fixed) {
	            return this._offset.equals(other._offset);
	        }
	        return false;
	    };
	
	    Fixed.prototype.toString = function toString() {
	        return 'FixedRules:' + this._offset.toString();
	    };
	
	    return Fixed;
	}(ZoneRules);

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ZoneRegion = undefined;
	
	var _errors = __webpack_require__(3);
	
	var _ZoneId2 = __webpack_require__(37);
	
	var _ZoneOffset = __webpack_require__(36);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var ZoneRegion = exports.ZoneRegion = function (_ZoneId) {
	  _inherits(ZoneRegion, _ZoneId);
	
	  ZoneRegion.ofId = function ofId(zoneId) {
	    if (zoneId === 'GMT0') {
	      var rules = _ZoneOffset.ZoneOffset.UTC.rules();
	      return new ZoneRegion(zoneId, rules);
	    }
	    throw new _errors.DateTimeException('ZoneRegion.ofId() is not yet implemented');
	  };
	
	  function ZoneRegion(id, rules) {
	    _classCallCheck(this, ZoneRegion);
	
	    var _this = _possibleConstructorReturn(this, _ZoneId.call(this));
	
	    _this._id = id;
	    _this._rules = rules;
	    return _this;
	  }
	
	  ZoneRegion.prototype.id = function id() {
	    return this._id;
	  };
	
	  ZoneRegion.prototype.rules = function rules() {
	    return this._rules;
	  };
	
	  return ZoneRegion;
	}(_ZoneId2.ZoneId);

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.SystemDefaultZoneId = undefined;
	
	var _SystemDefaultZoneRules = __webpack_require__(41);
	
	var _ZoneId2 = __webpack_require__(37);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var SystemDefaultZoneId = exports.SystemDefaultZoneId = function (_ZoneId) {
	    _inherits(SystemDefaultZoneId, _ZoneId);
	
	    function SystemDefaultZoneId() {
	        _classCallCheck(this, SystemDefaultZoneId);
	
	        var _this = _possibleConstructorReturn(this, _ZoneId.call(this));
	
	        _this._rules = new _SystemDefaultZoneRules.SystemDefaultZoneRules();
	        return _this;
	    }
	
	    SystemDefaultZoneId.prototype.rules = function rules() {
	        return this._rules;
	    };
	
	    SystemDefaultZoneId.prototype.equals = function equals(other) {
	        if (this === other) {
	            return true;
	        }
	        return false;
	    };
	
	    SystemDefaultZoneId.prototype.id = function id() {
	        return 'SYSTEM';
	    };
	
	    return SystemDefaultZoneId;
	}(_ZoneId2.ZoneId);

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.SystemDefaultZoneRules = undefined;
	
	var _ZoneRules2 = __webpack_require__(38);
	
	var _ZoneOffset = __webpack_require__(36);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var SystemDefaultZoneRules = exports.SystemDefaultZoneRules = function (_ZoneRules) {
	    _inherits(SystemDefaultZoneRules, _ZoneRules);
	
	    function SystemDefaultZoneRules() {
	        _classCallCheck(this, SystemDefaultZoneRules);
	
	        return _possibleConstructorReturn(this, _ZoneRules.apply(this, arguments));
	    }
	
	    SystemDefaultZoneRules.prototype.isFixedOffset = function isFixedOffset() {
	        return false;
	    };
	
	    SystemDefaultZoneRules.prototype.offsetOfInstant = function offsetOfInstant(instant) {
	        var offsetInMinutes = new Date(instant.toEpochMilli()).getTimezoneOffset();
	        return _ZoneOffset.ZoneOffset.ofTotalMinutes(offsetInMinutes * -1);
	    };
	
	    SystemDefaultZoneRules.prototype.offsetOfEpochMilli = function offsetOfEpochMilli(epochMilli) {
	        var offsetInMinutes = new Date(epochMilli).getTimezoneOffset();
	        return _ZoneOffset.ZoneOffset.ofTotalMinutes(offsetInMinutes * -1);
	    };
	
	    SystemDefaultZoneRules.prototype.offsetOfLocalDateTime = function offsetOfLocalDateTime(localDateTime) {
	        var epochMilli = localDateTime.toEpochSecond(_ZoneOffset.ZoneOffset.UTC) * 1000;
	        var offsetInMinutesBeforePossibleTransition = new Date(epochMilli).getTimezoneOffset();
	        var epochMilliSystemZone = epochMilli + offsetInMinutesBeforePossibleTransition * 60000;
	        var offsetInMinutesAfterPossibleTransition = new Date(epochMilliSystemZone).getTimezoneOffset();
	        return _ZoneOffset.ZoneOffset.ofTotalMinutes(offsetInMinutesAfterPossibleTransition * -1);
	    };
	
	    SystemDefaultZoneRules.prototype.isValidOffset = function isValidOffset(dateTime, offset) {
	        return this.offsetOfLocalDateTime(dateTime).equals(offset);
	    };
	
	    SystemDefaultZoneRules.prototype.equals = function equals(other) {
	        if (this === other || other instanceof SystemDefaultZoneRules) {
	            return true;
	        } else {
	            return false;
	        }
	    };
	
	    SystemDefaultZoneRules.prototype.toString = function toString() {
	        return 'SYSTEM';
	    };
	
	    return SystemDefaultZoneRules;
	}(_ZoneRules2.ZoneRules);

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	
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
	
	    DecimalStyle.prototype.positiveSign = function positiveSign() {
	        return this._positiveSign;
	    };
	
	    DecimalStyle.prototype.withPositiveSign = function withPositiveSign(positiveSign) {
	        if (positiveSign === this._positiveSign) {
	            return this;
	        }
	        return new DecimalStyle(this._zeroDigit, positiveSign, this._negativeSign, this._decimalSeparator);
	    };
	
	    DecimalStyle.prototype.negativeSign = function negativeSign() {
	        return this._negativeSign;
	    };
	
	    DecimalStyle.prototype.withNegativeSign = function withNegativeSign(negativeSign) {
	        if (negativeSign === this._negativeSign) {
	            return this;
	        }
	        return new DecimalStyle(this._zeroDigit, this._positiveSign, negativeSign, this._decimalSeparator);
	    };
	
	    DecimalStyle.prototype.zeroDigit = function zeroDigit() {
	        return this._zeroDigit;
	    };
	
	    DecimalStyle.prototype.withZeroDigit = function withZeroDigit(zeroDigit) {
	        if (zeroDigit === this._zeroDigit) {
	            return this;
	        }
	        return new DecimalStyle(zeroDigit, this._positiveSign, this._negativeSign, this._decimalSeparator);
	    };
	
	    DecimalStyle.prototype.decimalSeparator = function decimalSeparator() {
	        return this._decimalSeparator;
	    };
	
	    DecimalStyle.prototype.withDecimalSeparator = function withDecimalSeparator(decimalSeparator) {
	        if (decimalSeparator === this._decimalSeparator) {
	            return this;
	        }
	        return new DecimalStyle(this._zeroDigit, this._positiveSign, this._negativeSign, decimalSeparator);
	    };
	
	    DecimalStyle.prototype.convertToDigit = function convertToDigit(char) {
	        var val = char.charCodeAt(0) - this._zeroDigitCharCode;
	        return val >= 0 && val <= 9 ? val : -1;
	    };
	
	    DecimalStyle.prototype.convertNumberToI18N = function convertNumberToI18N(numericText) {
	        if (this._zeroDigit === '0') {
	            return numericText;
	        }
	        var diff = this._zeroDigitCharCode - '0'.charCodeAt(0);
	        var convertedText = '';
	        for (var i = 0; i < numericText.length; i++) {
	            convertedText += String.fromCharCode(numericText.charCodeAt(i) + diff);
	        }
	        return convertedText;
	    };
	
	    DecimalStyle.prototype.equals = function equals(other) {
	        if (this === other) {
	            return true;
	        }
	        if (other instanceof DecimalStyle) {
	            return this._zeroDigit === other._zeroDigit && this._positiveSign === other._positiveSign && this._negativeSign === other._negativeSign && this._decimalSeparator == other._decimalSeparator;
	        }
	        return false;
	    };
	
	    DecimalStyle.prototype.hashCode = function hashCode() {
	        return this._zeroDigit + this._positiveSign + this._negativeSign + this._decimalSeparator;
	    };
	
	    DecimalStyle.prototype.toString = function toString() {
	        return 'DecimalStyle[' + this._zeroDigit + this._positiveSign + this._negativeSign + this._decimalSeparator + ']';
	    };
	
	    DecimalStyle.of = function of() {
	        throw new Error('not yet supported');
	    };
	
	    DecimalStyle.availableLocales = function availableLocales() {
	        throw new Error('not yet supported');
	    };
	
	    return DecimalStyle;
	}();
	
	DecimalStyle.STANDARD = new DecimalStyle('0', '+', '-', '.');

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.SignStyle = undefined;
	
	var _Enum2 = __webpack_require__(10);
	
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
	
	        return _possibleConstructorReturn(this, _Enum.apply(this, arguments));
	    }
	
	    SignStyle.prototype.parse = function parse(positive, strict, fixedWidth) {
	        switch (this) {
	            case SignStyle.NORMAL:
	                return !positive || !strict;
	            case SignStyle.ALWAYS:
	            case SignStyle.EXCEEDS_PAD:
	                return true;
	            default:
	                return !strict && !fixedWidth;
	        }
	    };
	
	    return SignStyle;
	}(_Enum2.Enum);
	
	SignStyle.NORMAL = new SignStyle('NORMAL');
	SignStyle.NEVER = new SignStyle('NEVER');
	SignStyle.ALWAYS = new SignStyle('ALWAYS');
	SignStyle.EXCEEDS_PAD = new SignStyle('EXCEEDS_PAD');
	SignStyle.NOT_NEGATIVE = new SignStyle('NOT_NEGATIVE');

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
	 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	 */
	
	var StringBuilder = exports.StringBuilder = function () {
	    function StringBuilder() {
	        _classCallCheck(this, StringBuilder);
	
	        this._str = '';
	    }
	
	    StringBuilder.prototype.append = function append(str) {
	        this._str += str;
	        return this;
	    };
	
	    StringBuilder.prototype.appendChar = function appendChar(str) {
	        this._str += str[0];
	        return this;
	    };
	
	    StringBuilder.prototype.insert = function insert(offset, str) {
	        this._str = this._str.slice(0, offset) + str + this._str.slice(offset);
	        return this;
	    };
	
	    StringBuilder.prototype.replace = function replace(start, end, str) {
	        this._str = this._str.slice(0, start) + str + this._str.slice(end);
	        return this;
	    };
	
	    StringBuilder.prototype.length = function length() {
	        return this._str.length;
	    };
	
	    StringBuilder.prototype.setLength = function setLength(length) {
	        this._str = this._str.slice(0, length);
	        return this;
	    };
	
	    StringBuilder.prototype.toString = function toString() {
	        return this._str;
	    };
	
	    return StringBuilder;
	}();

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.DayOfWeek = undefined;
	exports._init = _init;
	
	var _errors = __webpack_require__(3);
	
	var _MathUtil = __webpack_require__(6);
	
	var _assert = __webpack_require__(2);
	
	var _DateTimeFormatterBuilder = __webpack_require__(33);
	
	var _ChronoField = __webpack_require__(12);
	
	var _ChronoUnit = __webpack_require__(13);
	
	var _Temporal2 = __webpack_require__(20);
	
	var _TemporalQueries = __webpack_require__(22);
	
	var _TemporalQuery = __webpack_require__(25);
	
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
	
	        var _this = _possibleConstructorReturn(this, _Temporal.call(this));
	
	        _this._ordinal = ordinal;
	        _this._name = name;
	        return _this;
	    }
	
	    DayOfWeek.prototype.ordinal = function ordinal() {
	        return this._ordinal;
	    };
	
	    DayOfWeek.prototype.name = function name() {
	        return this._name;
	    };
	
	    DayOfWeek.values = function values() {
	        return ENUMS.slice();
	    };
	
	    DayOfWeek.valueOf = function valueOf(name) {
	        for (var ordinal = 0; ordinal < ENUMS.length; ordinal++) {
	            if (ENUMS[ordinal].name() === name) {
	                break;
	            }
	        }
	        return DayOfWeek.of(ordinal + 1);
	    };
	
	    DayOfWeek.of = function of(dayOfWeek) {
	        if (dayOfWeek < 1 || dayOfWeek > 7) {
	            throw new _errors.DateTimeException('Invalid value for DayOfWeek: ' + dayOfWeek);
	        }
	        return ENUMS[dayOfWeek - 1];
	    };
	
	    DayOfWeek.from = function from(temporal) {
	        (0, _assert.assert)(temporal != null, 'temporal', _errors.NullPointerException);
	        if (temporal instanceof DayOfWeek) {
	            return temporal;
	        }
	        try {
	            return DayOfWeek.of(temporal.get(_ChronoField.ChronoField.DAY_OF_WEEK));
	        } catch (ex) {
	            if (ex instanceof _errors.DateTimeException) {
	                throw new _errors.DateTimeException('Unable to obtain DayOfWeek from TemporalAccessor: ' + temporal + ', type ' + (temporal.constructor != null ? temporal.constructor.name : ''), ex);
	            } else {
	                throw ex;
	            }
	        }
	    };
	
	    DayOfWeek.prototype.value = function value() {
	        return this._ordinal + 1;
	    };
	
	    DayOfWeek.prototype.getDisplayName = function getDisplayName(style, locale) {
	        return new _DateTimeFormatterBuilder.DateTimeFormatterBuilder().appendText(_ChronoField.ChronoField.DAY_OF_WEEK, style).toFormatter(locale).format(this);
	    };
	
	    DayOfWeek.prototype.isSupported = function isSupported(field) {
	        if (field instanceof _ChronoField.ChronoField) {
	            return field === _ChronoField.ChronoField.DAY_OF_WEEK;
	        }
	        return field != null && field.isSupportedBy(this);
	    };
	
	    DayOfWeek.prototype.range = function range(field) {
	        if (field === _ChronoField.ChronoField.DAY_OF_WEEK) {
	            return field.range();
	        } else if (field instanceof _ChronoField.ChronoField) {
	            throw new _errors.UnsupportedTemporalTypeException('Unsupported field: ' + field);
	        }
	        return field.rangeRefinedBy(this);
	    };
	
	    DayOfWeek.prototype.get = function get(field) {
	        if (field === _ChronoField.ChronoField.DAY_OF_WEEK) {
	            return this.value();
	        }
	        return this.range(field).checkValidIntValue(this.getLong(field), field);
	    };
	
	    DayOfWeek.prototype.getLong = function getLong(field) {
	        if (field === _ChronoField.ChronoField.DAY_OF_WEEK) {
	            return this.value();
	        } else if (field instanceof _ChronoField.ChronoField) {
	            throw new _errors.UnsupportedTemporalTypeException('Unsupported field: ' + field);
	        }
	        return field.getFrom(this);
	    };
	
	    DayOfWeek.prototype.plus = function plus(days) {
	        var amount = _MathUtil.MathUtil.floorMod(days, 7);
	        return ENUMS[_MathUtil.MathUtil.floorMod(this._ordinal + (amount + 7), 7)];
	    };
	
	    DayOfWeek.prototype.minus = function minus(days) {
	        return this.plus(-1 * _MathUtil.MathUtil.floorMod(days, 7));
	    };
	
	    DayOfWeek.prototype.query = function query(_query) {
	        if (_query === _TemporalQueries.TemporalQueries.precision()) {
	            return _ChronoUnit.ChronoUnit.DAYS;
	        } else if (_query === _TemporalQueries.TemporalQueries.localDate() || _query === _TemporalQueries.TemporalQueries.localTime() || _query === _TemporalQueries.TemporalQueries.chronology() || _query === _TemporalQueries.TemporalQueries.zone() || _query === _TemporalQueries.TemporalQueries.zoneId() || _query === _TemporalQueries.TemporalQueries.offset()) {
	            return null;
	        }
	        (0, _assert.assert)(_query != null, 'query', _errors.NullPointerException);
	        return _query.queryFrom(this);
	    };
	
	    DayOfWeek.prototype.adjustInto = function adjustInto(temporal) {
	        return temporal.with(_ChronoField.ChronoField.DAY_OF_WEEK, this.value());
	    };
	
	    DayOfWeek.prototype.equals = function equals(other) {
	        return this === other;
	    };
	
	    DayOfWeek.prototype.toString = function toString() {
	        return this._name;
	    };
	
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ZonedDateTime = undefined;
	exports._init = _init;
	
	var _assert = __webpack_require__(2);
	
	var _errors = __webpack_require__(3);
	
	var _Clock = __webpack_require__(1);
	
	var _Instant = __webpack_require__(4);
	
	var _LocalDate = __webpack_require__(8);
	
	var _LocalDateTime = __webpack_require__(7);
	
	var _LocalTime = __webpack_require__(5);
	
	var _ZoneId = __webpack_require__(37);
	
	var _ZoneOffset = __webpack_require__(36);
	
	var _ChronoZonedDateTime2 = __webpack_require__(47);
	
	var _DateTimeFormatter = __webpack_require__(26);
	
	var _ChronoField = __webpack_require__(12);
	
	var _ChronoUnit = __webpack_require__(13);
	
	var _TemporalQuery = __webpack_require__(25);
	
	var _TemporalQueries = __webpack_require__(22);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var ZonedDateTime = function (_ChronoZonedDateTime) {
	    _inherits(ZonedDateTime, _ChronoZonedDateTime);
	
	    ZonedDateTime.now = function now(clockOrZone) {
	        var clock;
	        if (clockOrZone instanceof _ZoneId.ZoneId) {
	            clock = _Clock.Clock.system(clockOrZone);
	        } else {
	            clock = clockOrZone == null ? _Clock.Clock.systemDefaultZone() : clockOrZone;
	        }
	        return ZonedDateTime.ofInstant(clock.instant(), clock.zone());
	    };
	
	    ZonedDateTime.of = function of() {
	        if (arguments.length <= 2) {
	            return ZonedDateTime.of2.apply(this, arguments);
	        } else if (arguments.length === 3 && arguments[0] instanceof _LocalDate.LocalDate) {
	            return ZonedDateTime.of3.apply(this, arguments);
	        } else {
	            return ZonedDateTime.of8.apply(this, arguments);
	        }
	    };
	
	    ZonedDateTime.of3 = function of3(date, time, zone) {
	        return ZonedDateTime.of2(_LocalDateTime.LocalDateTime.of(date, time), zone);
	    };
	
	    ZonedDateTime.of2 = function of2(localDateTime, zone) {
	        return ZonedDateTime.ofLocal(localDateTime, zone, null);
	    };
	
	    ZonedDateTime.of8 = function of8(year, month, dayOfMonth, hour, minute, second, nanoOfSecond, zone) {
	        var dt = _LocalDateTime.LocalDateTime.of(year, month, dayOfMonth, hour, minute, second, nanoOfSecond);
	        return ZonedDateTime.ofLocal(dt, zone, null);
	    };
	
	    ZonedDateTime.ofLocal = function ofLocal(localDateTime, zone, preferredOffset) {
	        (0, _assert.requireNonNull)(localDateTime, 'localDateTime');
	        (0, _assert.requireNonNull)(zone, 'zone');
	        if (zone instanceof _ZoneOffset.ZoneOffset) {
	            return new ZonedDateTime(localDateTime, zone, zone);
	        }
	        var rules = zone.rules();
	        var offset = rules.offsetOfLocalDateTime(localDateTime);
	
	        return new ZonedDateTime(localDateTime, offset, zone);
	    };
	
	    ZonedDateTime.ofInstant = function ofInstant() {
	        if (arguments.length === 2) {
	            return ZonedDateTime.ofInstant2.apply(this, arguments);
	        } else {
	            return ZonedDateTime.ofInstant3.apply(this, arguments);
	        }
	    };
	
	    ZonedDateTime.ofInstant2 = function ofInstant2(instant, zone) {
	        (0, _assert.requireNonNull)(instant, 'instant');
	        (0, _assert.requireNonNull)(zone, 'zone');
	        return ZonedDateTime._create(instant.epochSecond(), instant.nano(), zone);
	    };
	
	    ZonedDateTime.ofInstant3 = function ofInstant3(localDateTime, offset, zone) {
	        (0, _assert.requireNonNull)(localDateTime, 'localDateTime');
	        (0, _assert.requireNonNull)(offset, 'offset');
	        (0, _assert.requireNonNull)(zone, 'zone');
	        return ZonedDateTime._create(localDateTime.toEpochSecond(offset), localDateTime.nano(), zone);
	    };
	
	    ZonedDateTime._create = function _create(epochSecond, nanoOfSecond, zone) {
	        var rules = zone.rules();
	        var instant = _Instant.Instant.ofEpochSecond(epochSecond, nanoOfSecond);
	        var offset = rules.offset(instant);
	        var ldt = _LocalDateTime.LocalDateTime.ofEpochSecond(epochSecond, nanoOfSecond, offset);
	        return new ZonedDateTime(ldt, offset, zone);
	    };
	
	    ZonedDateTime.ofStrict = function ofStrict(localDateTime, offset, zone) {
	        (0, _assert.requireNonNull)(localDateTime, 'localDateTime');
	        (0, _assert.requireNonNull)(offset, 'offset');
	        (0, _assert.requireNonNull)(zone, 'zone');
	        var rules = zone.rules();
	        if (rules.isValidOffset(localDateTime, offset) === false) {
	            throw new _errors.DateTimeException('ZoneOffset "' + offset + '" is not valid for LocalDateTime "' + localDateTime + '" in zone "' + zone + '"');
	        }
	        return new ZonedDateTime(localDateTime, offset, zone);
	    };
	
	    ZonedDateTime._ofLenient = function _ofLenient(localDateTime, offset, zone) {
	        (0, _assert.requireNonNull)(localDateTime, 'localDateTime');
	        (0, _assert.requireNonNull)(offset, 'offset');
	        (0, _assert.requireNonNull)(zone, 'zone');
	        if (zone instanceof _ZoneOffset.ZoneOffset && offset.equals(zone) === false) {
	            throw new _errors.IllegalArgumentException('ZoneId must match ZoneOffset');
	        }
	        return new ZonedDateTime(localDateTime, offset, zone);
	    };
	
	    ZonedDateTime.from = function from(temporal) {
	        (0, _assert.requireNonNull)(temporal, 'temporal');
	        if (temporal instanceof ZonedDateTime) {
	            return temporal;
	        }
	        var zone = _ZoneId.ZoneId.from(temporal);
	        if (temporal.isSupported(_ChronoField.ChronoField.INSTANT_SECONDS)) {
	            var zdt = ZonedDateTime._from(temporal, zone);
	            if (zdt != null) return zdt;
	        }
	        var ldt = _LocalDateTime.LocalDateTime.from(temporal);
	        return ZonedDateTime.of2(ldt, zone);
	    };
	
	    ZonedDateTime._from = function _from(temporal, zone) {
	        try {
	            return ZonedDateTime.__from(temporal, zone);
	        } catch (ex) {
	            if (!(ex instanceof _errors.DateTimeException)) throw ex;
	        }
	    };
	
	    ZonedDateTime.__from = function __from(temporal, zone) {
	        var epochSecond = temporal.getLong(_ChronoField.ChronoField.INSTANT_SECONDS);
	        var nanoOfSecond = temporal.get(_ChronoField.ChronoField.NANO_OF_SECOND);
	        return ZonedDateTime._create(epochSecond, nanoOfSecond, zone);
	    };
	
	    ZonedDateTime.parse = function parse(text) {
	        var formatter = arguments.length <= 1 || arguments[1] === undefined ? _DateTimeFormatter.DateTimeFormatter.ISO_ZONED_DATE_TIME : arguments[1];
	
	        (0, _assert.requireNonNull)(formatter, 'fromatter');
	        return formatter.parse(text, ZonedDateTime.FROM);
	    };
	
	    function ZonedDateTime(dateTime, offset, zone) {
	        _classCallCheck(this, ZonedDateTime);
	
	        (0, _assert.requireNonNull)(dateTime, 'dateTime');
	        (0, _assert.requireNonNull)(offset, 'offset');
	        (0, _assert.requireNonNull)(zone, 'zone');
	
	        var _this = _possibleConstructorReturn(this, _ChronoZonedDateTime.call(this));
	
	        _this._dateTime = dateTime;
	
	        _this._offset = offset;
	
	        _this._zone = zone;
	        return _this;
	    }
	
	    ZonedDateTime.prototype._resolveLocal = function _resolveLocal(newDateTime) {
	        (0, _assert.requireNonNull)(newDateTime, 'newDateTime');
	        return ZonedDateTime.ofLocal(newDateTime, this._zone, this._offset);
	    };
	
	    ZonedDateTime.prototype._resolveInstant = function _resolveInstant(newDateTime) {
	        return ZonedDateTime.ofInstant3(newDateTime, this._offset, this._zone);
	    };
	
	    ZonedDateTime.prototype._resolveOffset = function _resolveOffset(offset) {
	        if (offset.equals(this._offset) === false && this._zone.rules().isValidOffset(this._dateTime, this._offset)) {
	            return new ZonedDateTime(this._dateTime, this._offset, this._zone);
	        }
	        return this;
	    };
	
	    ZonedDateTime.prototype.isSupported = function isSupported(fieldOrUnit) {
	        if (fieldOrUnit instanceof _ChronoField.ChronoField) {
	            return true;
	        } else if (fieldOrUnit instanceof _ChronoUnit.ChronoUnit) {
	            return fieldOrUnit.isDateBased() || fieldOrUnit.isTimeBased();
	        }
	        return fieldOrUnit != null && fieldOrUnit.isSupportedBy(this);
	    };
	
	    ZonedDateTime.prototype.range = function range(field) {
	        if (field instanceof _ChronoField.ChronoField) {
	            if (field === _ChronoField.ChronoField.INSTANT_SECONDS || field === _ChronoField.ChronoField.OFFSET_SECONDS) {
	                return field.range();
	            }
	            return this._dateTime.range(field);
	        }
	        return field.rangeRefinedBy(this);
	    };
	
	    ZonedDateTime.prototype.get = function get(field) {
	        return this.getLong(field);
	    };
	
	    ZonedDateTime.prototype.getLong = function getLong(field) {
	        if (field instanceof _ChronoField.ChronoField) {
	            switch (field) {
	                case _ChronoField.ChronoField.INSTANT_SECONDS:
	                    return this.toEpochSecond();
	                case _ChronoField.ChronoField.OFFSET_SECONDS:
	                    return this._offset.totalSeconds();
	            }
	            return this._dateTime.getLong(field);
	        }
	        (0, _assert.requireNonNull)(field, 'field');
	        return field.getFrom(this);
	    };
	
	    ZonedDateTime.prototype.offset = function offset() {
	        return this._offset;
	    };
	
	    ZonedDateTime.prototype.zone = function zone() {
	        return this._zone;
	    };
	
	    ZonedDateTime.prototype.withZoneSameLocal = function withZoneSameLocal(zone) {
	        (0, _assert.requireNonNull)(zone, 'zone');
	        return this._zone.equals(zone) ? this : ZonedDateTime.ofLocal(this._dateTime, zone, this._offset);
	    };
	
	    ZonedDateTime.prototype.withZoneSameInstant = function withZoneSameInstant(zone) {
	        (0, _assert.requireNonNull)(zone, 'zone');
	        return this._zone.equals(zone) ? this : ZonedDateTime._create(this._dateTime.toEpochSecond(this._offset), this._dateTime.nano(), zone);
	    };
	
	    ZonedDateTime.prototype.withFixedOffsetZone = function withFixedOffsetZone() {
	        return this._zone.equals(this._offset) ? this : new ZonedDateTime(this._dateTime, this._offset, this._offset);
	    };
	
	    ZonedDateTime.prototype.year = function year() {
	        return this._dateTime.year();
	    };
	
	    ZonedDateTime.prototype.monthValue = function monthValue() {
	        return this._dateTime.monthValue();
	    };
	
	    ZonedDateTime.prototype.month = function month() {
	        return this._dateTime.month();
	    };
	
	    ZonedDateTime.prototype.dayOfMonth = function dayOfMonth() {
	        return this._dateTime.dayOfMonth();
	    };
	
	    ZonedDateTime.prototype.dayOfYear = function dayOfYear() {
	        return this._dateTime.dayOfYear();
	    };
	
	    ZonedDateTime.prototype.dayOfWeek = function dayOfWeek() {
	        return this._dateTime.dayOfWeek();
	    };
	
	    ZonedDateTime.prototype.hour = function hour() {
	        return this._dateTime.hour();
	    };
	
	    ZonedDateTime.prototype.minute = function minute() {
	        return this._dateTime.minute();
	    };
	
	    ZonedDateTime.prototype.second = function second() {
	        return this._dateTime.second();
	    };
	
	    ZonedDateTime.prototype.nano = function nano() {
	        return this._dateTime.nano();
	    };
	
	    ZonedDateTime.prototype.with = function _with() {
	        if (arguments.length === 1) {
	            return this.withTemporalAdjuster.apply(this, arguments);
	        } else {
	            return this.with2.apply(this, arguments);
	        }
	    };
	
	    ZonedDateTime.prototype.withTemporalAdjuster = function withTemporalAdjuster(adjuster) {
	        if (adjuster instanceof _LocalDate.LocalDate) {
	            return this._resolveLocal(_LocalDateTime.LocalDateTime.of(adjuster, this._dateTime.toLocalTime()));
	        } else if (adjuster instanceof _LocalTime.LocalTime) {
	            return this._resolveLocal(_LocalDateTime.LocalDateTime.of(this._dateTime.toLocalDate(), adjuster));
	        } else if (adjuster instanceof _LocalDateTime.LocalDateTime) {
	            return this._resolveLocal(adjuster);
	        } else if (adjuster instanceof _Instant.Instant) {
	            var instant = adjuster;
	            return ZonedDateTime._create(instant.epochSecond(), instant.nano(), this._zone);
	        } else if (adjuster instanceof _ZoneOffset.ZoneOffset) {
	            return this._resolveOffset(adjuster);
	        }
	        (0, _assert.requireNonNull)(adjuster, 'adjuster');
	        return adjuster.adjustInto(this);
	    };
	
	    ZonedDateTime.prototype.with2 = function with2(field, newValue) {
	        if (field instanceof _ChronoField.ChronoField) {
	            switch (field) {
	                case _ChronoField.ChronoField.INSTANT_SECONDS:
	                    return ZonedDateTime._create(newValue, this.nano(), this._zone);
	                case _ChronoField.ChronoField.OFFSET_SECONDS:
	                    {
	                        var offset = _ZoneOffset.ZoneOffset.ofTotalSeconds(field.checkValidIntValue(newValue));
	                        return this._resolveOffset(offset);
	                    }
	            }
	            return this._resolveLocal(this._dateTime.with(field, newValue));
	        }
	        return field.adjustInto(this, newValue);
	    };
	
	    ZonedDateTime.prototype.withYear = function withYear(year) {
	        return this._resolveLocal(this._dateTime.withYear(year));
	    };
	
	    ZonedDateTime.prototype.withMonth = function withMonth(month) {
	        return this._resolveLocal(this._dateTime.withMonth(month));
	    };
	
	    ZonedDateTime.prototype.withDayOfMonth = function withDayOfMonth(dayOfMonth) {
	        return this._resolveLocal(this._dateTime.withDayOfMonth(dayOfMonth));
	    };
	
	    ZonedDateTime.prototype.withDayOfYear = function withDayOfYear(dayOfYear) {
	        return this._resolveLocal(this._dateTime.withDayOfYear(dayOfYear));
	    };
	
	    ZonedDateTime.prototype.withHour = function withHour(hour) {
	        return this._resolveLocal(this._dateTime.withHour(hour));
	    };
	
	    ZonedDateTime.prototype.withMinute = function withMinute(minute) {
	        return this._resolveLocal(this._dateTime.withMinute(minute));
	    };
	
	    ZonedDateTime.prototype.withSecond = function withSecond(second) {
	        return this._resolveLocal(this._dateTime.withSecond(second));
	    };
	
	    ZonedDateTime.prototype.withNano = function withNano(nanoOfSecond) {
	        return this._resolveLocal(this._dateTime.withNano(nanoOfSecond));
	    };
	
	    ZonedDateTime.prototype.truncatedTo = function truncatedTo(unit) {
	        return this._resolveLocal(this._dateTime.truncatedTo(unit));
	    };
	
	    ZonedDateTime.prototype.plus = function plus() {
	        if (arguments.length === 1) {
	            return this.plusTemporalAmount.apply(this, arguments);
	        } else {
	            return this.plus2.apply(this, arguments);
	        }
	    };
	
	    ZonedDateTime.prototype.plusTemporalAmount = function plusTemporalAmount(amount) {
	        (0, _assert.requireNonNull)(amount);
	        return amount.addTo(this);
	    };
	
	    ZonedDateTime.prototype.plus2 = function plus2(amountToAdd, unit) {
	        if (unit instanceof _ChronoUnit.ChronoUnit) {
	            if (unit.isDateBased()) {
	                return this._resolveLocal(this._dateTime.plus(amountToAdd, unit));
	            } else {
	                return this._resolveInstant(this._dateTime.plus(amountToAdd, unit));
	            }
	        }
	        (0, _assert.requireNonNull)(unit, 'unit');
	        return unit.addTo(this, amountToAdd);
	    };
	
	    ZonedDateTime.prototype.plusYears = function plusYears(years) {
	        return this._resolveLocal(this._dateTime.plusYears(years));
	    };
	
	    ZonedDateTime.prototype.plusMonths = function plusMonths(months) {
	        return this._resolveLocal(this._dateTime.plusMonths(months));
	    };
	
	    ZonedDateTime.prototype.plusWeeks = function plusWeeks(weeks) {
	        return this._resolveLocal(this._dateTime.plusWeeks(weeks));
	    };
	
	    ZonedDateTime.prototype.plusDays = function plusDays(days) {
	        return this._resolveLocal(this._dateTime.plusDays(days));
	    };
	
	    ZonedDateTime.prototype.plusHours = function plusHours(hours) {
	        return this._resolveInstant(this._dateTime.plusHours(hours));
	    };
	
	    ZonedDateTime.prototype.plusMinutes = function plusMinutes(minutes) {
	        return this._resolveInstant(this._dateTime.plusMinutes(minutes));
	    };
	
	    ZonedDateTime.prototype.plusSeconds = function plusSeconds(seconds) {
	        return this._resolveInstant(this._dateTime.plusSeconds(seconds));
	    };
	
	    ZonedDateTime.prototype.plusNanos = function plusNanos(nanos) {
	        return this._resolveInstant(this._dateTime.plusNanos(nanos));
	    };
	
	    ZonedDateTime.prototype.minus = function minus() {
	        if (arguments.length === 1) {
	            return this.minusTemporalAmount.apply(this, arguments);
	        } else {
	            return this.minus2.apply(this, arguments);
	        }
	    };
	
	    ZonedDateTime.prototype.minusTemporalAmount = function minusTemporalAmount(amount) {
	        (0, _assert.requireNonNull)(amount, 'amount');
	        return amount.subtractFrom(this);
	    };
	
	    ZonedDateTime.prototype.minus2 = function minus2(amountToSubtract, unit) {
	        return this.plus2(-1 * amountToSubtract, unit);
	    };
	
	    ZonedDateTime.prototype.minusYears = function minusYears(years) {
	        return this.plusYears(-1 * years);
	    };
	
	    ZonedDateTime.prototype.minusMonths = function minusMonths(months) {
	        return this.plusMonths(-1 * months);
	    };
	
	    ZonedDateTime.prototype.minusWeeks = function minusWeeks(weeks) {
	        return this.plusWeeks(-1 * weeks);
	    };
	
	    ZonedDateTime.prototype.minusDays = function minusDays(days) {
	        return this.plusDays(-1 * days);
	    };
	
	    ZonedDateTime.prototype.minusHours = function minusHours(hours) {
	        return this.plusHours(-1 * hours);
	    };
	
	    ZonedDateTime.prototype.minusMinutes = function minusMinutes(minutes) {
	        return this.plusMinutes(-1 * minutes);
	    };
	
	    ZonedDateTime.prototype.minusSeconds = function minusSeconds(seconds) {
	        return this.plusSeconds(-1 * seconds);
	    };
	
	    ZonedDateTime.prototype.minusNanos = function minusNanos(nanos) {
	        return this.plusNanos(-1 * nanos);
	    };
	
	    ZonedDateTime.prototype.query = function query(_query) {
	        if (_query === _TemporalQueries.TemporalQueries.localDate()) {
	            return this.toLocalDate();
	        }
	        (0, _assert.requireNonNull)(_query, 'query');
	        return _ChronoZonedDateTime.prototype.query.call(this, _query);
	    };
	
	    ZonedDateTime.prototype.until = function until(endExclusive, unit) {
	        var end = ZonedDateTime.from(endExclusive);
	        if (unit instanceof _ChronoUnit.ChronoUnit) {
	            end = end.withZoneSameInstant(this._zone);
	            if (unit.isDateBased()) {
	                return this._dateTime.until(end.dateTime, unit);
	            } else {}
	        }
	        return unit.between(this, end);
	    };
	
	    ZonedDateTime.prototype.toLocalDateTime = function toLocalDateTime() {
	        return this._dateTime;
	    };
	
	    ZonedDateTime.prototype.toLocalDate = function toLocalDate() {
	        return this._dateTime.toLocalDate();
	    };
	
	    ZonedDateTime.prototype.toLocalTime = function toLocalTime() {
	        return this._dateTime.toLocalTime();
	    };
	
	    ZonedDateTime.prototype.toOffsetDateTime = function toOffsetDateTime() {
	        return OffsetDateTime.of(this._dateTime, this._offset);
	    };
	
	    ZonedDateTime.prototype.equals = function equals(other) {
	        if (this === other) {
	            return true;
	        }
	        if (other instanceof ZonedDateTime) {
	            return this._dateTime.equals(other._dateTime) && this._offset.equals(other._offset) && this._zone.equals(other._zone);
	        }
	        return false;
	    };
	
	    ZonedDateTime.prototype.hashCode = function hashCode() {
	        var r = 17;
	        r = 31 * r + this._dateTime.hashCode();
	        r = 31 * r + this._offset.hashCode();
	        r = 31 * r + this._zone.hashCode();
	        return r;
	    };
	
	    ZonedDateTime.prototype.toString = function toString() {
	        var str = this._dateTime.toString() + this._offset.toString();
	        if (this._offset !== this._zone) {
	            str += '[' + this._zone.toString() + ']';
	        }
	        return str;
	    };
	
	    ZonedDateTime.prototype.format = function format(formatter) {
	        return _ChronoZonedDateTime.prototype.format.call(this, formatter);
	    };
	
	    return ZonedDateTime;
	}(_ChronoZonedDateTime2.ChronoZonedDateTime);
	
	exports.ZonedDateTime = ZonedDateTime;
	function _init() {
	    ZonedDateTime.FROM = (0, _TemporalQuery.createTemporalQuery)('ZonedDateTime.FROM', function (temporal) {
	        return ZonedDateTime.from(temporal);
	    });
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ChronoZonedDateTime = undefined;
	
	var _assert = __webpack_require__(2);
	
	var _Instant = __webpack_require__(4);
	
	var _LocalDate = __webpack_require__(8);
	
	var _MathUtil = __webpack_require__(6);
	
	var _ChronoUnit = __webpack_require__(13);
	
	var _Temporal2 = __webpack_require__(20);
	
	var _TemporalQueries = __webpack_require__(22);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var ChronoZonedDateTime = function (_Temporal) {
	    _inherits(ChronoZonedDateTime, _Temporal);
	
	    function ChronoZonedDateTime() {
	        _classCallCheck(this, ChronoZonedDateTime);
	
	        return _possibleConstructorReturn(this, _Temporal.apply(this, arguments));
	    }
	
	    ChronoZonedDateTime.prototype.query = function query(_query) {
	        if (_query === _TemporalQueries.TemporalQueries.zoneId() || _query === _TemporalQueries.TemporalQueries.zone()) {
	            return this.zone();
	        } else if (_query === _TemporalQueries.TemporalQueries.chronology()) {
	            return this.toLocalDate().chronology();
	        } else if (_query === _TemporalQueries.TemporalQueries.precision()) {
	            return _ChronoUnit.ChronoUnit.NANOS;
	        } else if (_query === _TemporalQueries.TemporalQueries.offset()) {
	            return this.offset();
	        } else if (_query === _TemporalQueries.TemporalQueries.localDate()) {
	            return _LocalDate.LocalDate.ofEpochDay(this.toLocalDate().toEpochDay());
	        } else if (_query === _TemporalQueries.TemporalQueries.localTime()) {
	            return this.toLocalTime();
	        }
	        return _Temporal.prototype.query.call(this, _query);
	    };
	
	    ChronoZonedDateTime.prototype.format = function format(formatter) {
	        (0, _assert.requireNonNull)(formatter, 'formatter');
	        return formatter.format(this);
	    };
	
	    ChronoZonedDateTime.prototype.toInstant = function toInstant() {
	        return _Instant.Instant.ofEpochSecond(this.toEpochSecond(), this.toLocalTime().nano());
	    };
	
	    ChronoZonedDateTime.prototype.toEpochSecond = function toEpochSecond() {
	        var epochDay = this.toLocalDate().toEpochDay();
	        var secs = epochDay * 86400 + this.toLocalTime().toSecondOfDay();
	        secs -= this.offset().totalSeconds();
	        return secs;
	    };
	
	    ChronoZonedDateTime.prototype.compareTo = function compareTo(other) {
	        (0, _assert.requireNonNull)(other, 'other');
	        var cmp = _MathUtil.MathUtil.compareNumbers(this.toEpochSecond(), other.toEpochSecond());
	        if (cmp === 0) {
	            cmp = this.toLocalTime().nano() - other.toLocalTime().nano();
	            if (cmp === 0) {
	                cmp = this.toLocalDateTime().compareTo(other.toLocalDateTime());
	                if (cmp === 0) {
	                    cmp = strcmp(this.zone().id(), other.zone().id());
	                }
	            }
	        }
	        return cmp;
	    };
	
	    ChronoZonedDateTime.prototype.isAfter = function isAfter(other) {
	        (0, _assert.requireNonNull)(other, 'other');
	        var thisEpochSec = this.toEpochSecond();
	        var otherEpochSec = other.toEpochSecond();
	        return thisEpochSec > otherEpochSec || thisEpochSec === otherEpochSec && this.toLocalTime().nano() > other.toLocalTime().nano();
	    };
	
	    ChronoZonedDateTime.prototype.isBefore = function isBefore(other) {
	        (0, _assert.requireNonNull)(other, 'other');
	        var thisEpochSec = this.toEpochSecond();
	        var otherEpochSec = other.toEpochSecond();
	        return thisEpochSec < otherEpochSec || thisEpochSec === otherEpochSec && this.toLocalTime().nano() < other.toLocalTime().nano();
	    };
	
	    ChronoZonedDateTime.prototype.isEqual = function isEqual(other) {
	        (0, _assert.requireNonNull)(other, 'other');
	        return this.toEpochSecond() === other.toEpochSecond() && this.toLocalTime().nano() === other.toLocalTime().nano();
	    };
	
	    ChronoZonedDateTime.prototype.equals = function equals(other) {
	        if (this === other) {
	            return true;
	        }
	        if (other instanceof ChronoZonedDateTime) {
	            return this.compareTo(other) === 0;
	        }
	        return false;
	    };
	
	    return ChronoZonedDateTime;
	}(_Temporal2.Temporal);
	
	exports.ChronoZonedDateTime = ChronoZonedDateTime;
	
	
	function strcmp(a, b) {
	    if (a < b) {
	        return -1;
	    }
	    if (a > b) {
	        return 1;
	    }
	    return 0;
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ChronoLocalDateTime = undefined;
	
	var _assert = __webpack_require__(2);
	
	var _MathUtil = __webpack_require__(6);
	
	var _LocalDate = __webpack_require__(8);
	
	var _Instant = __webpack_require__(4);
	
	var _ChronoUnit = __webpack_require__(13);
	
	var _ChronoField = __webpack_require__(12);
	
	var _Temporal2 = __webpack_require__(20);
	
	var _TemporalQueries = __webpack_require__(22);
	
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
	
	        return _possibleConstructorReturn(this, _Temporal.apply(this, arguments));
	    }
	
	    ChronoLocalDateTime.prototype.chronology = function chronology() {
	        return this.toLocalDate().chronology();
	    };
	
	    ChronoLocalDateTime.prototype.query = function query(_query) {
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
	        return _Temporal.prototype.query.call(this, _query);
	    };
	
	    ChronoLocalDateTime.prototype.adjustInto = function adjustInto(temporal) {
	        return temporal.with(_ChronoField.ChronoField.EPOCH_DAY, this.toLocalDate().toEpochDay()).with(_ChronoField.ChronoField.NANO_OF_DAY, this.toLocalTime().toNanoOfDay());
	    };
	
	    ChronoLocalDateTime.prototype.toInstant = function toInstant(offset) {
	        return _Instant.Instant.ofEpochSecond(this.toEpochSecond(offset), this.toLocalTime().nano());
	    };
	
	    ChronoLocalDateTime.prototype.toEpochSecond = function toEpochSecond(offset) {
	        (0, _assert.requireNonNull)(offset, 'offset');
	        var epochDay = this.toLocalDate().toEpochDay();
	        var secs = epochDay * 86400 + this.toLocalTime().toSecondOfDay();
	        secs -= offset.totalSeconds();
	        return _MathUtil.MathUtil.safeToInt(secs);
	    };
	
	    return ChronoLocalDateTime;
	}(_Temporal2.Temporal);

	exports.ChronoLocalDateTime = ChronoLocalDateTime;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.nativeJs = nativeJs;
	
	var _assert = __webpack_require__(2);
	
	var _errors = __webpack_require__(3);
	
	var _Instant = __webpack_require__(4);
	
	var _LocalDate = __webpack_require__(8);
	
	var _LocalTime = __webpack_require__(5);
	
	var _MathUtil = __webpack_require__(6);
	
	var _ZoneId = __webpack_require__(37);
	
	var _ChronoField = __webpack_require__(12);
	
	var _TemporalQueries = __webpack_require__(22);
	
	var _TemporalAccessor2 = __webpack_require__(21);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var NativeJsTemporal = function (_TemporalAccessor) {
	    _inherits(NativeJsTemporal, _TemporalAccessor);
	
	    function NativeJsTemporal(date) {
	        var zone = arguments.length <= 1 || arguments[1] === undefined ? _ZoneId.ZoneId.systemDefault() : arguments[1];
	
	        _classCallCheck(this, NativeJsTemporal);
	
	        var _this = _possibleConstructorReturn(this, _TemporalAccessor.call(this));
	
	        _this._zone = zone;
	        if (date instanceof Date) {
	            _this._epochMilli = date.getTime();
	            return _possibleConstructorReturn(_this);
	        } else if (typeof date.toDate === 'function' && date.toDate() instanceof Date) {
	            _this._epochMilli = date.toDate().getTime();
	            return _possibleConstructorReturn(_this);
	        }
	        (0, _assert.assert)(false, 'date must be either a javascript date or a moment');
	        return _this;
	    }
	
	    NativeJsTemporal.prototype.query = function query(_query) {
	        (0, _assert.requireNonNull)(_query, 'query');
	        if (_query === _TemporalQueries.TemporalQueries.localDate()) {
	            return _LocalDate.LocalDate.ofInstant(_Instant.Instant.ofEpochMilli(this._epochMilli), this._zone);
	        } else if (_query === _TemporalQueries.TemporalQueries.localTime()) {
	            return _LocalTime.LocalTime.ofInstant(_Instant.Instant.ofEpochMilli(this._epochMilli), this._zone);
	        } else if (_query === _TemporalQueries.TemporalQueries.zone()) {
	            return _LocalTime.LocalTime.ofInstant(_Instant.Instant.ofEpochMilli(this._epochMilli), this._zone);
	        }
	        return _TemporalAccessor.prototype.query.call(this, _query);
	    };
	
	    NativeJsTemporal.prototype.get = function get(field) {
	        return this.getLong(field);
	    };
	
	    NativeJsTemporal.prototype.getLong = function getLong(field) {
	        (0, _assert.requireNonNull)(field, 'field');
	        if (field instanceof _ChronoField.ChronoField) {
	            switch (field) {
	                case _ChronoField.ChronoField.NANO_OF_SECOND:
	                    return _MathUtil.MathUtil.floorMod(this._epochMilli, 1000) * 1000000;
	                case _ChronoField.ChronoField.INSTANT_SECONDS:
	                    return _MathUtil.MathUtil.floorDiv(this._epochMilli, 1000);
	            }
	            throw new _errors.UnsupportedTemporalTypeException('Unsupported field: ' + field);
	        }
	        return field.getFrom(this);
	    };
	
	    return NativeJsTemporal;
	}(_TemporalAccessor2.TemporalAccessor);
	
	function nativeJs(date, zone) {
	    return new NativeJsTemporal(date, zone);
	}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.IsoFields = undefined;
	exports._init = _init;
	
	var _errors = __webpack_require__(3);
	
	var _DayOfWeek = __webpack_require__(45);
	
	var _Duration = __webpack_require__(14);
	
	var _MathUtil = __webpack_require__(6);
	
	var _LocalDate = __webpack_require__(8);
	
	var _ChronoField = __webpack_require__(12);
	
	var _ChronoUnit = __webpack_require__(13);
	
	var _TemporalField2 = __webpack_require__(18);
	
	var _TemporalUnit2 = __webpack_require__(17);
	
	var _ValueRange = __webpack_require__(19);
	
	var _IsoChronology = __webpack_require__(9);
	
	var _ResolverStyle = __webpack_require__(23);
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
	                                                                                                                                                           * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                           * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                           * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                           */
	
	var IsoFields = exports.IsoFields = function IsoFields() {
	    _classCallCheck(this, IsoFields);
	};
	
	var QUARTER_DAYS = [0, 90, 181, 273, 0, 91, 182, 274];
	
	var Field = function (_TemporalField) {
	    _inherits(Field, _TemporalField);
	
	    function Field() {
	        _classCallCheck(this, Field);
	
	        return _possibleConstructorReturn(this, _TemporalField.apply(this, arguments));
	    }
	
	    Field.prototype.resolve = function resolve() {
	        return null;
	    };
	
	    Field.prototype.isDateBased = function isDateBased() {
	        return true;
	    };
	
	    Field.prototype.isTimeBased = function isTimeBased() {
	        return false;
	    };
	
	    Field.prototype._isIso = function _isIso() {
	        return true;
	    };
	
	    Field._getWeekRangeByLocalDate = function _getWeekRangeByLocalDate(date) {
	        var wby = Field._getWeekBasedYear(date);
	        return _ValueRange.ValueRange.of(1, Field._getWeekRangeByYear(wby));
	    };
	
	    Field._getWeekRangeByYear = function _getWeekRangeByYear(wby) {
	        var date = _LocalDate.LocalDate.of(wby, 1, 1);
	
	        if (date.dayOfWeek() === _DayOfWeek.DayOfWeek.THURSDAY || date.dayOfWeek() === _DayOfWeek.DayOfWeek.WEDNESDAY && date.isLeapYear()) {
	            return 53;
	        }
	        return 52;
	    };
	
	    Field._getWeek = function _getWeek(date) {
	        var dow0 = date.dayOfWeek().ordinal();
	        var doy0 = date.dayOfYear() - 1;
	        var doyThu0 = doy0 + (3 - dow0);
	        var alignedWeek = _MathUtil.MathUtil.intDiv(doyThu0, 7);
	        var firstThuDoy0 = doyThu0 - alignedWeek * 7;
	        var firstMonDoy0 = firstThuDoy0 - 3;
	        if (firstMonDoy0 < -3) {
	            firstMonDoy0 += 7;
	        }
	        if (doy0 < firstMonDoy0) {
	            return Field._getWeekRangeByLocalDate(date.withDayOfYear(180).minusYears(1)).maximum();
	        }
	        var week = _MathUtil.MathUtil.intDiv(doy0 - firstMonDoy0, 7) + 1;
	        if (week === 53) {
	            if ((firstMonDoy0 === -3 || firstMonDoy0 === -2 && date.isLeapYear()) === false) {
	                week = 1;
	            }
	        }
	        return week;
	    };
	
	    Field._getWeekBasedYear = function _getWeekBasedYear(date) {
	        var year = date.year();
	        var doy = date.dayOfYear();
	        if (doy <= 3) {
	            var dow = date.dayOfWeek().ordinal();
	            if (doy - dow < -2) {
	                year--;
	            }
	        } else if (doy >= 363) {
	            var _dow = date.dayOfWeek().ordinal();
	            doy = doy - 363 - (date.isLeapYear() ? 1 : 0);
	            if (doy - _dow >= 0) {
	                year++;
	            }
	        }
	        return year;
	    };
	
	    Field.prototype.getDisplayName = function getDisplayName() {
	        return this.toString();
	    };
	
	    Field.prototype.resolve = function resolve() {
	        return null;
	    };
	
	    Field.prototype.name = function name() {
	        return this.toString();
	    };
	
	    return Field;
	}(_TemporalField2.TemporalField);
	
	var DAY_OF_QUARTER_FIELD = function (_Field) {
	    _inherits(DAY_OF_QUARTER_FIELD, _Field);
	
	    function DAY_OF_QUARTER_FIELD() {
	        _classCallCheck(this, DAY_OF_QUARTER_FIELD);
	
	        return _possibleConstructorReturn(this, _Field.apply(this, arguments));
	    }
	
	    DAY_OF_QUARTER_FIELD.prototype.toString = function toString() {
	        return 'DayOfQuarter';
	    };
	
	    DAY_OF_QUARTER_FIELD.prototype.baseUnit = function baseUnit() {
	        return _ChronoUnit.ChronoUnit.DAYS;
	    };
	
	    DAY_OF_QUARTER_FIELD.prototype.rangeUnit = function rangeUnit() {
	        return QUARTER_YEARS;
	    };
	
	    DAY_OF_QUARTER_FIELD.prototype.range = function range() {
	        return _ValueRange.ValueRange.of(1, 90, 92);
	    };
	
	    DAY_OF_QUARTER_FIELD.prototype.isSupportedBy = function isSupportedBy(temporal) {
	        return temporal.isSupported(_ChronoField.ChronoField.DAY_OF_YEAR) && temporal.isSupported(_ChronoField.ChronoField.MONTH_OF_YEAR) && temporal.isSupported(_ChronoField.ChronoField.YEAR) && this._isIso(temporal);
	    };
	
	    DAY_OF_QUARTER_FIELD.prototype.rangeRefinedBy = function rangeRefinedBy(temporal) {
	        if (temporal.isSupported(this) === false) {
	            throw new _errors.UnsupportedTemporalTypeException('Unsupported field: DayOfQuarter');
	        }
	        var qoy = temporal.getLong(QUARTER_OF_YEAR);
	        if (qoy === 1) {
	            var year = temporal.getLong(_ChronoField.ChronoField.YEAR);
	            return _IsoChronology.IsoChronology.isLeapYear(year) ? _ValueRange.ValueRange.of(1, 91) : _ValueRange.ValueRange.of(1, 90);
	        } else if (qoy === 2) {
	            return _ValueRange.ValueRange.of(1, 91);
	        } else if (qoy === 3 || qoy === 4) {
	            return _ValueRange.ValueRange.of(1, 92);
	        }
	        return this.range();
	    };
	
	    DAY_OF_QUARTER_FIELD.prototype.getFrom = function getFrom(temporal) {
	        if (temporal.isSupported(this) === false) {
	            throw new _errors.UnsupportedTemporalTypeException('Unsupported field: DayOfQuarter');
	        }
	        var doy = temporal.get(_ChronoField.ChronoField.DAY_OF_YEAR);
	        var moy = temporal.get(_ChronoField.ChronoField.MONTH_OF_YEAR);
	        var year = temporal.getLong(_ChronoField.ChronoField.YEAR);
	        return doy - QUARTER_DAYS[_MathUtil.MathUtil.intDiv(moy - 1, 3) + (_IsoChronology.IsoChronology.isLeapYear(year) ? 4 : 0)];
	    };
	
	    DAY_OF_QUARTER_FIELD.prototype.adjustInto = function adjustInto(temporal, newValue) {
	        var curValue = this.getFrom(temporal);
	        this.range().checkValidValue(newValue, this);
	        return temporal.with(_ChronoField.ChronoField.DAY_OF_YEAR, temporal.getLong(_ChronoField.ChronoField.DAY_OF_YEAR) + (newValue - curValue));
	    };
	
	    DAY_OF_QUARTER_FIELD.prototype.resolve = function resolve(fieldValues, partialTemporal, resolverStyle) {
	        var yearLong = fieldValues.get(_ChronoField.ChronoField.YEAR);
	        var qoyLong = fieldValues.get(QUARTER_OF_YEAR);
	        if (yearLong == null || qoyLong == null) {
	            return null;
	        }
	        var y = _ChronoField.ChronoField.YEAR.checkValidIntValue(yearLong);
	        var doq = fieldValues.get(DAY_OF_QUARTER);
	        var date;
	        if (resolverStyle === _ResolverStyle.ResolverStyle.LENIENT) {
	            var qoy = qoyLong;
	            date = _LocalDate.LocalDate.of(y, 1, 1);
	            date = date.plusMonths(_MathUtil.MathUtil.safeMultiply(_MathUtil.MathUtil.safeSubtract(qoy, 1), 3));
	            date = date.plusDays(_MathUtil.MathUtil.safeSubtract(doq, 1));
	        } else {
	            var _qoy = QUARTER_OF_YEAR.range().checkValidIntValue(qoyLong, QUARTER_OF_YEAR);
	            if (resolverStyle === _ResolverStyle.ResolverStyle.STRICT) {
	                var max = 92;
	                if (_qoy === 1) {
	                    max = _IsoChronology.IsoChronology.isLeapYear(y) ? 91 : 90;
	                } else if (_qoy === 2) {
	                    max = 91;
	                }
	                _ValueRange.ValueRange.of(1, max).checkValidValue(doq, this);
	            } else {
	                this.range().checkValidValue(doq, this);
	            }
	            date = _LocalDate.LocalDate.of(y, (_qoy - 1) * 3 + 1, 1).plusDays(doq - 1);
	        }
	        fieldValues.remove(this);
	        fieldValues.remove(_ChronoField.ChronoField.YEAR);
	        fieldValues.remove(QUARTER_OF_YEAR);
	        return date;
	    };
	
	    return DAY_OF_QUARTER_FIELD;
	}(Field);
	
	var QUARTER_OF_YEAR_FIELD = function (_Field2) {
	    _inherits(QUARTER_OF_YEAR_FIELD, _Field2);
	
	    function QUARTER_OF_YEAR_FIELD() {
	        _classCallCheck(this, QUARTER_OF_YEAR_FIELD);
	
	        return _possibleConstructorReturn(this, _Field2.apply(this, arguments));
	    }
	
	    QUARTER_OF_YEAR_FIELD.prototype.toString = function toString() {
	        return 'QuarterOfYear';
	    };
	
	    QUARTER_OF_YEAR_FIELD.prototype.baseUnit = function baseUnit() {
	        return QUARTER_YEARS;
	    };
	
	    QUARTER_OF_YEAR_FIELD.prototype.rangeUnit = function rangeUnit() {
	        return _ChronoUnit.ChronoUnit.YEARS;
	    };
	
	    QUARTER_OF_YEAR_FIELD.prototype.range = function range() {
	        return _ValueRange.ValueRange.of(1, 4);
	    };
	
	    QUARTER_OF_YEAR_FIELD.prototype.isSupportedBy = function isSupportedBy(temporal) {
	        return temporal.isSupported(_ChronoField.ChronoField.MONTH_OF_YEAR) && this._isIso(temporal);
	    };
	
	    QUARTER_OF_YEAR_FIELD.prototype.rangeRefinedBy = function rangeRefinedBy(temporal) {
	        return this.range();
	    };
	
	    QUARTER_OF_YEAR_FIELD.prototype.getFrom = function getFrom(temporal) {
	        if (temporal.isSupported(this) === false) {
	            throw new _errors.UnsupportedTemporalTypeException('Unsupported field: QuarterOfYear');
	        }
	        var moy = temporal.getLong(_ChronoField.ChronoField.MONTH_OF_YEAR);
	        return _MathUtil.MathUtil.intDiv(moy + 2, 3);
	    };
	
	    QUARTER_OF_YEAR_FIELD.prototype.adjustInto = function adjustInto(temporal, newValue) {
	        var curValue = this.getFrom(temporal);
	        this.range().checkValidValue(newValue, this);
	        return temporal.with(_ChronoField.ChronoField.MONTH_OF_YEAR, temporal.getLong(_ChronoField.ChronoField.MONTH_OF_YEAR) + (newValue - curValue) * 3);
	    };
	
	    return QUARTER_OF_YEAR_FIELD;
	}(Field);
	
	var WEEK_OF_WEEK_BASED_YEAR_FIELD = function (_Field3) {
	    _inherits(WEEK_OF_WEEK_BASED_YEAR_FIELD, _Field3);
	
	    function WEEK_OF_WEEK_BASED_YEAR_FIELD() {
	        _classCallCheck(this, WEEK_OF_WEEK_BASED_YEAR_FIELD);
	
	        return _possibleConstructorReturn(this, _Field3.apply(this, arguments));
	    }
	
	    WEEK_OF_WEEK_BASED_YEAR_FIELD.prototype.toString = function toString() {
	        return 'WeekOfWeekBasedYear';
	    };
	
	    WEEK_OF_WEEK_BASED_YEAR_FIELD.prototype.baseUnit = function baseUnit() {
	        return _ChronoUnit.ChronoUnit.WEEKS;
	    };
	
	    WEEK_OF_WEEK_BASED_YEAR_FIELD.prototype.rangeUnit = function rangeUnit() {
	        return WEEK_BASED_YEARS;
	    };
	
	    WEEK_OF_WEEK_BASED_YEAR_FIELD.prototype.range = function range() {
	        return _ValueRange.ValueRange.of(1, 52, 53);
	    };
	
	    WEEK_OF_WEEK_BASED_YEAR_FIELD.prototype.isSupportedBy = function isSupportedBy(temporal) {
	        return temporal.isSupported(_ChronoField.ChronoField.EPOCH_DAY) && this._isIso(temporal);
	    };
	
	    WEEK_OF_WEEK_BASED_YEAR_FIELD.prototype.rangeRefinedBy = function rangeRefinedBy(temporal) {
	        if (temporal.isSupported(this) === false) {
	            throw new _errors.UnsupportedTemporalTypeException('Unsupported field: WeekOfWeekBasedYear');
	        }
	        return Field._getWeekRangeByLocalDate(_LocalDate.LocalDate.from(temporal));
	    };
	
	    WEEK_OF_WEEK_BASED_YEAR_FIELD.prototype.getFrom = function getFrom(temporal) {
	        if (temporal.isSupported(this) === false) {
	            throw new _errors.UnsupportedTemporalTypeException('Unsupported field: WeekOfWeekBasedYear');
	        }
	        return Field._getWeek(_LocalDate.LocalDate.from(temporal));
	    };
	
	    WEEK_OF_WEEK_BASED_YEAR_FIELD.prototype.adjustInto = function adjustInto(temporal, newValue) {
	        this.range().checkValidValue(newValue, this);
	        return temporal.plus(_MathUtil.MathUtil.safeSubtract(newValue, this.getFrom(temporal)), _ChronoUnit.ChronoUnit.WEEKS);
	    };
	
	    WEEK_OF_WEEK_BASED_YEAR_FIELD.prototype.resolve = function resolve(fieldValues, partialTemporal, resolverStyle) {
	        var wbyLong = fieldValues.get(WEEK_BASED_YEAR);
	        var dowLong = fieldValues.get(_ChronoField.ChronoField.DAY_OF_WEEK);
	        if (wbyLong == null || dowLong == null) {
	            return null;
	        }
	        var wby = WEEK_BASED_YEAR.range().checkValidIntValue(wbyLong, WEEK_BASED_YEAR);
	        var wowby = fieldValues.get(WEEK_OF_WEEK_BASED_YEAR);
	        var date;
	        if (resolverStyle === _ResolverStyle.ResolverStyle.LENIENT) {
	            var dow = dowLong;
	            var weeks = 0;
	            if (dow > 7) {
	                weeks = _MathUtil.MathUtil.intDiv(dow - 1, 7);
	                dow = _MathUtil.MathUtil.intMod(dow - 1, 7) + 1;
	            } else if (dow < 1) {
	                weeks = _MathUtil.MathUtil.intDiv(dow, 7) - 1;
	                dow = _MathUtil.MathUtil.intMod(dow, 7) + 7;
	            }
	            date = _LocalDate.LocalDate.of(wby, 1, 4).plusWeeks(wowby - 1).plusWeeks(weeks).with(_ChronoField.ChronoField.DAY_OF_WEEK, dow);
	        } else {
	            var _dow2 = _ChronoField.ChronoField.DAY_OF_WEEK.checkValidIntValue(dowLong);
	            if (resolverStyle === _ResolverStyle.ResolverStyle.STRICT) {
	                var temp = _LocalDate.LocalDate.of(wby, 1, 4);
	                var range = Field._getWeekRangeByLocalDate(temp);
	                range.checkValidValue(wowby, this);
	            } else {
	                this.range().checkValidValue(wowby, this);
	            }
	            date = _LocalDate.LocalDate.of(wby, 1, 4).plusWeeks(wowby - 1).with(_ChronoField.ChronoField.DAY_OF_WEEK, _dow2);
	        }
	        fieldValues.remove(this);
	        fieldValues.remove(WEEK_BASED_YEAR);
	        fieldValues.remove(_ChronoField.ChronoField.DAY_OF_WEEK);
	        return date;
	    };
	
	    WEEK_OF_WEEK_BASED_YEAR_FIELD.prototype.getDisplayName = function getDisplayName() {
	        return 'Week';
	    };
	
	    return WEEK_OF_WEEK_BASED_YEAR_FIELD;
	}(Field);
	
	var WEEK_BASED_YEAR_FIELD = function (_Field4) {
	    _inherits(WEEK_BASED_YEAR_FIELD, _Field4);
	
	    function WEEK_BASED_YEAR_FIELD() {
	        _classCallCheck(this, WEEK_BASED_YEAR_FIELD);
	
	        return _possibleConstructorReturn(this, _Field4.apply(this, arguments));
	    }
	
	    WEEK_BASED_YEAR_FIELD.prototype.toString = function toString() {
	        return 'WeekBasedYear';
	    };
	
	    WEEK_BASED_YEAR_FIELD.prototype.baseUnit = function baseUnit() {
	        return WEEK_BASED_YEARS;
	    };
	
	    WEEK_BASED_YEAR_FIELD.prototype.rangeUnit = function rangeUnit() {
	        return _ChronoUnit.ChronoUnit.FOREVER;
	    };
	
	    WEEK_BASED_YEAR_FIELD.prototype.range = function range() {
	        return _ChronoField.ChronoField.YEAR.range();
	    };
	
	    WEEK_BASED_YEAR_FIELD.prototype.isSupportedBy = function isSupportedBy(temporal) {
	        return temporal.isSupported(_ChronoField.ChronoField.EPOCH_DAY) && this._isIso(temporal);
	    };
	
	    WEEK_BASED_YEAR_FIELD.prototype.rangeRefinedBy = function rangeRefinedBy(temporal) {
	        return _ChronoField.ChronoField.YEAR.range();
	    };
	
	    WEEK_BASED_YEAR_FIELD.prototype.getFrom = function getFrom(temporal) {
	        if (temporal.isSupported(this) === false) {
	            throw new _errors.UnsupportedTemporalTypeException('Unsupported field: WeekBasedYear');
	        }
	        return Field._getWeekBasedYear(_LocalDate.LocalDate.from(temporal));
	    };
	
	    WEEK_BASED_YEAR_FIELD.prototype.adjustInto = function adjustInto(temporal, newValue) {
	        if (this.isSupportedBy(temporal) === false) {
	            throw new _errors.UnsupportedTemporalTypeException('Unsupported field: WeekBasedYear');
	        }
	        var newWby = this.range().checkValidIntValue(newValue, WEEK_BASED_YEAR);
	        var date = _LocalDate.LocalDate.from(temporal);
	        var dow = date.get(_ChronoField.ChronoField.DAY_OF_WEEK);
	        var week = Field._getWeek(date);
	        if (week === 53 && Field._getWeekRangeByYear(newWby) === 52) {
	            week = 52;
	        }
	        var resolved = _LocalDate.LocalDate.of(newWby, 1, 4);
	        var days = dow - resolved.get(_ChronoField.ChronoField.DAY_OF_WEEK) + (week - 1) * 7;
	        resolved = resolved.plusDays(days);
	        return temporal.with(resolved);
	    };
	
	    return WEEK_BASED_YEAR_FIELD;
	}(Field);
	
	var Unit = function (_TemporalUnit) {
	    _inherits(Unit, _TemporalUnit);
	
	    function Unit(name, estimatedDuration) {
	        _classCallCheck(this, Unit);
	
	        var _this6 = _possibleConstructorReturn(this, _TemporalUnit.call(this));
	
	        _this6._name = name;
	        _this6._duration = estimatedDuration;
	        return _this6;
	    }
	
	    Unit.prototype.duration = function duration() {
	        return this._duration;
	    };
	
	    Unit.prototype.isDurationEstimated = function isDurationEstimated() {
	        return true;
	    };
	
	    Unit.prototype.isDateBased = function isDateBased() {
	        return true;
	    };
	
	    Unit.prototype.isTimeBased = function isTimeBased() {
	        return false;
	    };
	
	    Unit.prototype.isSupportedBy = function isSupportedBy(temporal) {
	        return temporal.isSupported(_ChronoField.ChronoField.EPOCH_DAY);
	    };
	
	    Unit.prototype.addTo = function addTo(temporal, periodToAdd) {
	        switch (this) {
	            case WEEK_BASED_YEARS:
	                var added = _MathUtil.MathUtil.safeAdd(temporal.get(WEEK_BASED_YEAR), periodToAdd);
	                return temporal.with(WEEK_BASED_YEAR, added);
	            case QUARTER_YEARS:
	                return temporal.plus(_MathUtil.MathUtil.intDiv(periodToAdd, 256), _ChronoUnit.ChronoUnit.YEARS).plus(_MathUtil.MathUtil.intMod(periodToAdd, 256) * 3, _ChronoUnit.ChronoUnit.MONTHS);
	            default:
	                throw new _errors.IllegalStateException('Unreachable');
	        }
	    };
	
	    Unit.prototype.between = function between(temporal1, temporal2) {
	        switch (this) {
	            case WEEK_BASED_YEARS:
	                return _MathUtil.MathUtil.safeSubtract(temporal2.getLong(WEEK_BASED_YEAR), temporal1.getLong(WEEK_BASED_YEAR));
	            case QUARTER_YEARS:
	                return _MathUtil.MathUtil.intDiv(temporal1.until(temporal2, _ChronoUnit.ChronoUnit.MONTHS), 3);
	            default:
	                throw new _errors.IllegalStateException('Unreachable');
	        }
	    };
	
	    Unit.prototype.toString = function toString() {
	        return name;
	    };
	
	    return Unit;
	}(_TemporalUnit2.TemporalUnit);
	
	var DAY_OF_QUARTER = null;
	var QUARTER_OF_YEAR = null;
	var WEEK_OF_WEEK_BASED_YEAR = null;
	var WEEK_BASED_YEAR = null;
	var WEEK_BASED_YEARS = null;
	var QUARTER_YEARS = null;
	
	function _init() {
	    DAY_OF_QUARTER = new DAY_OF_QUARTER_FIELD();
	    QUARTER_OF_YEAR = new QUARTER_OF_YEAR_FIELD();
	    WEEK_OF_WEEK_BASED_YEAR = new WEEK_OF_WEEK_BASED_YEAR_FIELD();
	    WEEK_BASED_YEAR = new WEEK_BASED_YEAR_FIELD();
	
	    WEEK_BASED_YEARS = new Unit('WeekBasedYears', _Duration.Duration.ofSeconds(31556952));
	    QUARTER_YEARS = new Unit('QuarterYears', _Duration.Duration.ofSeconds(31556952 / 4));
	
	    IsoFields.DAY_OF_QUARTER = DAY_OF_QUARTER;
	    IsoFields.QUARTER_OF_YEAR = QUARTER_OF_YEAR;
	    IsoFields.WEEK_OF_WEEK_BASED_YEAR = WEEK_OF_WEEK_BASED_YEAR;
	    IsoFields.WEEK_BASED_YEAR = WEEK_BASED_YEAR;
	    IsoFields.WEEK_BASED_YEARS = WEEK_BASED_YEARS;
	    IsoFields.QUARTER_YEARS = QUARTER_YEARS;
	}
	
	_LocalDate.LocalDate.prototype.isoWeekOfWeekyear = function () {
	    return this.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR);
	};
	
	_LocalDate.LocalDate.prototype.isoWeekyear = function () {
	    return this.get(IsoFields.WEEK_BASED_YEAR);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.TemporalAdjusters = undefined;
	
	var _assert = __webpack_require__(2);
	
	var _errors = __webpack_require__(3);
	
	var _TemporalAdjuster4 = __webpack_require__(52);
	
	var _ChronoField = __webpack_require__(12);
	
	var _ChronoUnit = __webpack_require__(13);
	
	var _MathUtil = __webpack_require__(6);
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
	                                                                                                                                                           * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                           * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	                                                                                                                                                           * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                           */
	
	var TemporalAdjusters = exports.TemporalAdjusters = function () {
	    function TemporalAdjusters() {
	        _classCallCheck(this, TemporalAdjusters);
	    }
	
	    TemporalAdjusters.firstDayOfMonth = function firstDayOfMonth() {
	        return Impl.FIRST_DAY_OF_MONTH;
	    };
	
	    TemporalAdjusters.lastDayOfMonth = function lastDayOfMonth() {
	        return Impl.LAST_DAY_OF_MONTH;
	    };
	
	    TemporalAdjusters.firstDayOfNextMonth = function firstDayOfNextMonth() {
	        return Impl.FIRST_DAY_OF_NEXT_MONTH;
	    };
	
	    TemporalAdjusters.firstDayOfYear = function firstDayOfYear() {
	        return Impl.FIRST_DAY_OF_YEAR;
	    };
	
	    TemporalAdjusters.lastDayOfYear = function lastDayOfYear() {
	        return Impl.LAST_DAY_OF_YEAR;
	    };
	
	    TemporalAdjusters.firstDayOfNextYear = function firstDayOfNextYear() {
	        return Impl.FIRST_DAY_OF_NEXT_YEAR;
	    };
	
	    TemporalAdjusters.firstInMonth = function firstInMonth(dayOfWeek) {
	        (0, _assert.requireNonNull)(dayOfWeek, 'dayOfWeek');
	        return new DayOfWeekInMonth(1, dayOfWeek);
	    };
	
	    TemporalAdjusters.lastInMonth = function lastInMonth(dayOfWeek) {
	        (0, _assert.requireNonNull)(dayOfWeek, 'dayOfWeek');
	        return new DayOfWeekInMonth(-1, dayOfWeek);
	    };
	
	    TemporalAdjusters.dayOfWeekInMonth = function dayOfWeekInMonth(ordinal, dayOfWeek) {
	        (0, _assert.requireNonNull)(dayOfWeek, 'dayOfWeek');
	        return new DayOfWeekInMonth(ordinal, dayOfWeek);
	    };
	
	    TemporalAdjusters.next = function next(dayOfWeek) {
	        return new RelativeDayOfWeek(2, dayOfWeek);
	    };
	
	    TemporalAdjusters.nextOrSame = function nextOrSame(dayOfWeek) {
	        return new RelativeDayOfWeek(0, dayOfWeek);
	    };
	
	    TemporalAdjusters.previous = function previous(dayOfWeek) {
	        return new RelativeDayOfWeek(3, dayOfWeek);
	    };
	
	    TemporalAdjusters.previousOrSame = function previousOrSame(dayOfWeek) {
	        return new RelativeDayOfWeek(1, dayOfWeek);
	    };
	
	    return TemporalAdjusters;
	}();
	
	var Impl = function (_TemporalAdjuster) {
	    _inherits(Impl, _TemporalAdjuster);
	
	    function Impl(ordinal) {
	        _classCallCheck(this, Impl);
	
	        var _this = _possibleConstructorReturn(this, _TemporalAdjuster.call(this));
	
	        _this._ordinal = ordinal;
	        return _this;
	    }
	
	    Impl.prototype.adjustInto = function adjustInto(temporal) {
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
	    };
	
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
	
	        var _this2 = _possibleConstructorReturn(this, _TemporalAdjuster2.call(this));
	
	        _this2._ordinal = ordinal;
	        _this2._dowValue = dow.value();
	        return _this2;
	    }
	
	    DayOfWeekInMonth.prototype.adjustInto = function adjustInto(temporal) {
	        if (this._ordinal >= 0) {
	            var temp = temporal.with(_ChronoField.ChronoField.DAY_OF_MONTH, 1);
	            var curDow = temp.get(_ChronoField.ChronoField.DAY_OF_WEEK);
	            var dowDiff = _MathUtil.MathUtil.intMod(this._dowValue - curDow + 7, 7);
	            dowDiff += (this._ordinal - 1) * 7;
	            return temp.plus(dowDiff, _ChronoUnit.ChronoUnit.DAYS);
	        } else {
	            var _temp = temporal.with(_ChronoField.ChronoField.DAY_OF_MONTH, temporal.range(_ChronoField.ChronoField.DAY_OF_MONTH).maximum());
	            var _curDow = _temp.get(_ChronoField.ChronoField.DAY_OF_WEEK);
	            var daysDiff = this._dowValue - _curDow;
	            daysDiff = daysDiff === 0 ? 0 : daysDiff > 0 ? daysDiff - 7 : daysDiff;
	            daysDiff -= (-this._ordinal - 1) * 7;
	            return _temp.plus(daysDiff, _ChronoUnit.ChronoUnit.DAYS);
	        }
	    };
	
	    return DayOfWeekInMonth;
	}(_TemporalAdjuster4.TemporalAdjuster);
	
	var RelativeDayOfWeek = function (_TemporalAdjuster3) {
	    _inherits(RelativeDayOfWeek, _TemporalAdjuster3);
	
	    function RelativeDayOfWeek(relative, dayOfWeek) {
	        _classCallCheck(this, RelativeDayOfWeek);
	
	        var _this3 = _possibleConstructorReturn(this, _TemporalAdjuster3.call(this));
	
	        (0, _assert.requireNonNull)(dayOfWeek, 'dayOfWeek');
	
	        _this3._relative = relative;
	
	        _this3._dowValue = dayOfWeek.value();
	        return _this3;
	    }
	
	    RelativeDayOfWeek.prototype.adjustInto = function adjustInto(temporal) {
	        var calDow = temporal.get(_ChronoField.ChronoField.DAY_OF_WEEK);
	        if (this._relative < 2 && calDow === this._dowValue) {
	            return temporal;
	        }
	        if ((this._relative & 1) === 0) {
	            var daysDiff = calDow - this._dowValue;
	            return temporal.plus(daysDiff >= 0 ? 7 - daysDiff : -daysDiff, _ChronoUnit.ChronoUnit.DAYS);
	        } else {
	            var _daysDiff = this._dowValue - calDow;
	            return temporal.minus(_daysDiff >= 0 ? 7 - _daysDiff : -_daysDiff, _ChronoUnit.ChronoUnit.DAYS);
	        }
	    };
	
	    return RelativeDayOfWeek;
	}(_TemporalAdjuster4.TemporalAdjuster);

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.TemporalAdjuster = undefined;
	
	var _assert = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
	                                                                                                                                                           * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                                                                                                                                           * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos  
	                                                                                                                                                           * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	                                                                                                                                                           */
	
	var TemporalAdjuster = exports.TemporalAdjuster = function () {
	  function TemporalAdjuster() {
	    _classCallCheck(this, TemporalAdjuster);
	  }
	
	  TemporalAdjuster.prototype.adjustInto = function adjustInto(temporal) {
	    (0, _assert.abstractMethodFail)('adjustInto');
	  };
	
	  return TemporalAdjuster;
	}();

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ZoneOffset = __webpack_require__(36);
	
	var _DayOfWeek = __webpack_require__(45);
	
	var _Duration = __webpack_require__(14);
	
	var _Instant = __webpack_require__(4);
	
	var _LocalDate = __webpack_require__(8);
	
	var _LocalTime = __webpack_require__(5);
	
	var _LocalDateTime = __webpack_require__(7);
	
	var _Month = __webpack_require__(11);
	
	var _Period = __webpack_require__(27);
	
	var _Year = __webpack_require__(16);
	
	var _ZonedDateTime = __webpack_require__(46);
	
	var _IsoChronology = __webpack_require__(9);
	
	var _DateTimeFormatter = __webpack_require__(26);
	
	var _ChronoField = __webpack_require__(12);
	
	var _ChronoUnit = __webpack_require__(13);
	
	var _IsoFields = __webpack_require__(50);
	
	var _TemporalQueriesFactory = __webpack_require__(54);
	
	var _ZoneIdFactory = __webpack_require__(34);
	
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
	    (0, _IsoFields._init)();
	    (0, _TemporalQueriesFactory._init)();
	    (0, _DayOfWeek._init)();
	    (0, _Instant._init)();
	    (0, _LocalDate._init)();
	    (0, _LocalDateTime._init)();
	    (0, _Month._init)();
	    (0, _Period._init)();
	    (0, _ZoneOffset._init)();
	    (0, _ZonedDateTime._init)();
	    (0, _ZoneIdFactory._init)();
	    (0, _IsoChronology._init)();
	    (0, _DateTimeFormatter._init)();
	}
	
	init();

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports._init = _init;
	
	var _ChronoField = __webpack_require__(12);
	
	var _TemporalQuery = __webpack_require__(25);
	
	var _TemporalQueries = __webpack_require__(22);
	
	var _LocalDate = __webpack_require__(8);
	
	var _LocalTime = __webpack_require__(5);
	
	var _ZoneOffset = __webpack_require__(36);
	
	/*
	 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	 * @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
	 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	 */
	
	function _init() {
	    _TemporalQueries.TemporalQueries.ZONE_ID = (0, _TemporalQuery.createTemporalQuery)('ZONE_ID', function (temporal) {
	        return temporal.query(_TemporalQueries.TemporalQueries.ZONE_ID);
	    });
	
	    _TemporalQueries.TemporalQueries.CHRONO = (0, _TemporalQuery.createTemporalQuery)('CHRONO', function (temporal) {
	        return temporal.query(_TemporalQueries.TemporalQueries.CHRONO);
	    });
	
	    _TemporalQueries.TemporalQueries.PRECISION = (0, _TemporalQuery.createTemporalQuery)('PRECISION', function (temporal) {
	        return temporal.query(_TemporalQueries.TemporalQueries.PRECISION);
	    });
	
	    _TemporalQueries.TemporalQueries.OFFSET = (0, _TemporalQuery.createTemporalQuery)('OFFSET', function (temporal) {
	        if (temporal.isSupported(_ChronoField.ChronoField.OFFSET_SECONDS)) {
	            return _ZoneOffset.ZoneOffset.ofTotalSeconds(temporal.get(_ChronoField.ChronoField.OFFSET_SECONDS));
	        }
	        return null;
	    });
	
	    _TemporalQueries.TemporalQueries.ZONE = (0, _TemporalQuery.createTemporalQuery)('ZONE', function (temporal) {
	        var zone = temporal.query(_TemporalQueries.TemporalQueries.ZONE_ID);
	        return zone != null ? zone : temporal.query(_TemporalQueries.TemporalQueries.OFFSET);
	    });
	
	    _TemporalQueries.TemporalQueries.LOCAL_DATE = (0, _TemporalQuery.createTemporalQuery)('LOCAL_DATE', function (temporal) {
	        if (temporal.isSupported(_ChronoField.ChronoField.EPOCH_DAY)) {
	            return _LocalDate.LocalDate.ofEpochDay(temporal.getLong(_ChronoField.ChronoField.EPOCH_DAY));
	        }
	        return null;
	    });
	
	    _TemporalQueries.TemporalQueries.LOCAL_TIME = (0, _TemporalQuery.createTemporalQuery)('LOCAL_TIME', function (temporal) {
	        if (temporal.isSupported(_ChronoField.ChronoField.NANO_OF_DAY)) {
	            return _LocalTime.LocalTime.ofNanoOfDay(temporal.getLong(_ChronoField.ChronoField.NANO_OF_DAY));
	        }
	        return null;
	    });
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=js-joda.js.map