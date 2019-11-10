(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("moment"));
	else if(typeof define === 'function' && define.amd)
		define("moment-range", ["moment"], factory);
	else if(typeof exports === 'object')
		exports["moment-range"] = factory(require("moment"));
	else
		root["moment-range"] = factory(root["moment"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(15)() ? Symbol : __webpack_require__(17);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign        = __webpack_require__(3)
  , normalizeOpts = __webpack_require__(10)
  , isCallable    = __webpack_require__(6)
  , contains      = __webpack_require__(12)

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(4)()
	? Object.assign
	: __webpack_require__(5);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== 'function') return false;
	obj = { foo: 'raz' };
	assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
	return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys  = __webpack_require__(7)
  , value = __webpack_require__(11)

  , max = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, l = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try { dest[key] = src[key]; } catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < l; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Deprecated



module.exports = function (obj) { return typeof obj === 'function'; };


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(8)()
	? Object.keys
	: __webpack_require__(9);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	try {
		Object.keys('primitive');
		return true;
	} catch (e) { return false; }
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = Object.keys;

module.exports = function (object) {
	return keys(object == null ? object : Object(object));
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

module.exports = function (options/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (options == null) return;
		process(Object(options), result);
	});
	return result;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (value) {
	if (value == null) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(13)()
	? String.prototype.contains
	: __webpack_require__(14);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = 'razdwatrzy';

module.exports = function () {
	if (typeof str.contains !== 'function') return false;
	return ((str.contains('dwa') === true) && (str.contains('foo') === false));
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var validTypes = { object: true, symbol: true };

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (x) {
	if (!x) return false;
	if (typeof x === 'symbol') return true;
	if (!x.constructor) return false;
	if (x.constructor.name !== 'Symbol') return false;
	return (x[x.constructor.toStringTag] === 'Symbol');
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// ES2015 Symbol polyfill for environments that do not support it (or partially support it)



var d              = __webpack_require__(2)
  , validateSymbol = __webpack_require__(18)

  , create = Object.create, defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
  , isNativeSafe;

if (typeof Symbol === 'function') {
	NativeSymbol = Symbol;
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
}

var generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0, name, ie11BugWorkaround;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		}));
		return name;
	};
}());

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('TypeError: Symbol is not a constructor');
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError('TypeError: Symbol is not a constructor');
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(SymbolPolyfill, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return (globalSymbols[key] = SymbolPolyfill(String(key)));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
	}),

	// If there's native implementation of given symbol, let's fallback to it
	// to ensure proper interoperability with other native functions e.g. Array.from
	hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
	isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
		SymbolPolyfill('isConcatSpreadable')),
	iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
	match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
	replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
	search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
	species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
	split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
	toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
	toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
	unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
});

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d('', function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
	var symbol = validateSymbol(this);
	if (typeof symbol === 'symbol') return symbol;
	return symbol.toString();
}));
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isSymbol = __webpack_require__(16);

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateRange = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.extendMoment = extendMoment;

var _moment = __webpack_require__(1);

var _moment2 = _interopRequireDefault(_moment);

var _es6Symbol = __webpack_require__(0);

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//-----------------------------------------------------------------------------
// Constants
//-----------------------------------------------------------------------------

var INTERVALS = {
  year: true,
  quarter: true,
  month: true,
  week: true,
  day: true,
  hour: true,
  minute: true,
  second: true
};

//-----------------------------------------------------------------------------
// Date Ranges
//-----------------------------------------------------------------------------

var DateRange = exports.DateRange = function () {
  function DateRange(start, end) {
    _classCallCheck(this, DateRange);

    var s = start;
    var e = end;

    if (arguments.length === 1 || end === undefined) {
      if ((typeof start === 'undefined' ? 'undefined' : _typeof(start)) === 'object' && start.length === 2) {
        var _start = _slicedToArray(start, 2);

        s = _start[0];
        e = _start[1];
      } else if (typeof start === 'string') {
        var _start$split = start.split('/');

        var _start$split2 = _slicedToArray(_start$split, 2);

        s = _start$split2[0];
        e = _start$split2[1];
      }
    }

    this.start = s === null ? (0, _moment2.default)(-8640000000000000) : (0, _moment2.default)(s);
    this.end = e === null ? (0, _moment2.default)(8640000000000000) : (0, _moment2.default)(e);
  }

  _createClass(DateRange, [{
    key: 'adjacent',
    value: function adjacent(other) {
      var sameStartEnd = this.start.isSame(other.end);
      var sameEndStart = this.end.isSame(other.start);

      return sameStartEnd && other.start.valueOf() <= this.start.valueOf() || sameEndStart && other.end.valueOf() >= this.end.valueOf();
    }
  }, {
    key: 'add',
    value: function add(other) {
      if (this.overlaps(other)) {
        return new this.constructor(_moment2.default.min(this.start, other.start), _moment2.default.max(this.end, other.end));
      }

      return null;
    }
  }, {
    key: 'by',
    value: function by(interval) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { exclusive: false, step: 1 };

      var range = this;

      return _defineProperty({}, _es6Symbol2.default.iterator, function () {
        var exclusive = options.exclusive || false;
        var step = options.step || 1;
        var diff = Math.abs(range.start.diff(range.end, interval)) / step;
        var iteration = 0;

        return {
          next: function next() {
            var current = range.start.clone().add(iteration * step, interval);
            var done = exclusive ? !(iteration < diff) : !(iteration <= diff);

            iteration++;

            return {
              done: done,
              value: done ? undefined : current
            };
          }
        };
      });
    }
  }, {
    key: 'byRange',
    value: function byRange(interval) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { exclusive: false, step: 1 };

      var range = this;
      var step = options.step || 1;
      var diff = this.valueOf() / interval.valueOf() / step;
      var exclusive = options.exclusive || false;
      var unit = Math.floor(diff);
      var iteration = 0;

      return _defineProperty({}, _es6Symbol2.default.iterator, function () {
        if (unit === Infinity) {
          return { done: true };
        }

        return {
          next: function next() {
            var current = (0, _moment2.default)(range.start.valueOf() + interval.valueOf() * iteration * step);
            var done = unit === diff && exclusive ? !(iteration < unit) : !(iteration <= unit);

            iteration++;

            return {
              done: done,
              value: done ? undefined : current
            };
          }
        };
      });
    }
  }, {
    key: 'center',
    value: function center() {
      var center = this.start.valueOf() + this.diff() / 2;

      return (0, _moment2.default)(center);
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new this.constructor(this.start, this.end);
    }
  }, {
    key: 'contains',
    value: function contains(other) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { exclusive: false };

      var start = this.start.valueOf();
      var end = this.end.valueOf();
      var oStart = other.valueOf();
      var oEnd = other.valueOf();

      if (other instanceof DateRange) {
        oStart = other.start.valueOf();
        oEnd = other.end.valueOf();
      }

      var startInRange = start < oStart || start <= oStart && !options.exclusive;
      var endInRange = end > oEnd || end >= oEnd && !options.exclusive;

      return startInRange && endInRange;
    }
  }, {
    key: 'diff',
    value: function diff(unit, rounded) {
      return this.end.diff(this.start, unit, rounded);
    }
  }, {
    key: 'duration',
    value: function duration(unit, rounded) {
      return this.diff(unit, rounded);
    }
  }, {
    key: 'intersect',
    value: function intersect(other) {
      var start = this.start.valueOf();
      var end = this.end.valueOf();
      var oStart = other.start.valueOf();
      var oEnd = other.end.valueOf();

      if (start <= oStart && oStart < end && end < oEnd) {
        return new this.constructor(oStart, end);
      } else if (oStart < start && start < oEnd && oEnd <= end) {
        return new this.constructor(start, oEnd);
      } else if (oStart < start && start <= end && end < oEnd) {
        return this;
      } else if (start <= oStart && oStart <= oEnd && oEnd <= end) {
        return other;
      }

      return null;
    }
  }, {
    key: 'isEqual',
    value: function isEqual(other) {
      return this.start.isSame(other.start) && this.end.isSame(other.end);
    }
  }, {
    key: 'isSame',
    value: function isSame(other) {
      return this.isEqual(other);
    }
  }, {
    key: 'overlaps',
    value: function overlaps(other) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { adjacent: false };

      var intersect = this.intersect(other) !== null;

      if (options.adjacent && !intersect) {
        return this.adjacent(other);
      }

      return intersect;
    }
  }, {
    key: 'reverseBy',
    value: function reverseBy(interval) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { exclusive: false, step: 1 };

      var range = this;

      return _defineProperty({}, _es6Symbol2.default.iterator, function () {
        var exclusive = options.exclusive || false;
        var step = options.step || 1;
        var diff = Math.abs(range.start.diff(range.end, interval)) / step;
        var iteration = 0;

        return {
          next: function next() {
            var current = range.end.clone().subtract(iteration * step, interval);
            var done = exclusive ? !(iteration < diff) : !(iteration <= diff);

            iteration++;

            return {
              done: done,
              value: done ? undefined : current
            };
          }
        };
      });
    }
  }, {
    key: 'reverseByRange',
    value: function reverseByRange(interval) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { exclusive: false, step: 1 };

      var range = this;
      var step = options.step || 1;
      var diff = this.valueOf() / interval.valueOf() / step;
      var exclusive = options.exclusive || false;
      var unit = Math.floor(diff);
      var iteration = 0;

      return _defineProperty({}, _es6Symbol2.default.iterator, function () {
        if (unit === Infinity) {
          return { done: true };
        }

        return {
          next: function next() {
            var current = (0, _moment2.default)(range.end.valueOf() - interval.valueOf() * iteration * step);
            var done = unit === diff && exclusive ? !(iteration < unit) : !(iteration <= unit);

            iteration++;

            return {
              done: done,
              value: done ? undefined : current
            };
          }
        };
      });
    }
  }, {
    key: 'subtract',
    value: function subtract(other) {
      var start = this.start.valueOf();
      var end = this.end.valueOf();
      var oStart = other.start.valueOf();
      var oEnd = other.end.valueOf();

      if (this.intersect(other) === null) {
        return [this];
      } else if (oStart <= start && start < end && end <= oEnd) {
        return [];
      } else if (oStart <= start && start < oEnd && oEnd < end) {
        return [new this.constructor(oEnd, end)];
      } else if (start < oStart && oStart < end && end <= oEnd) {
        return [new this.constructor(start, oStart)];
      } else if (start < oStart && oStart < oEnd && oEnd < end) {
        return [new this.constructor(start, oStart), new this.constructor(oEnd, end)];
      } else if (start < oStart && oStart < end && oEnd < end) {
        return [new this.constructor(start, oStart), new this.constructor(oStart, end)];
      }

      return [];
    }
  }, {
    key: 'toDate',
    value: function toDate() {
      return [this.start.toDate(), this.end.toDate()];
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.start.format() + '/' + this.end.format();
    }
  }, {
    key: 'valueOf',
    value: function valueOf() {
      return this.end.valueOf() - this.start.valueOf();
    }
  }]);

  return DateRange;
}();

//-----------------------------------------------------------------------------
// Moment Extensions
//-----------------------------------------------------------------------------

function extendMoment(moment) {
  /**
   * Build a date range.
   */
  moment.range = function range(start, end) {
    var m = this;

    if (INTERVALS.hasOwnProperty(start)) {
      return new DateRange(moment(m).startOf(start), moment(m).endOf(start));
    }

    return new DateRange(start, end);
  };

  /**
   * Alias of static constructor.
   */
  moment.fn.range = moment.range;

  /**
   * Expose constructor
   */
  moment.range.constructor = DateRange;

  /**
   * Check if the current moment is within a given date range.
   */
  moment.fn.within = function (range) {
    return range.contains(this.toDate());
  };

  return moment;
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=moment-range.js.map