(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["expect"] = factory();
	else
		root["expect"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Expectation = __webpack_require__(1);

	var _Expectation2 = _interopRequireDefault(_Expectation);

	var _SpyUtils = __webpack_require__(18);

	var _assert = __webpack_require__(16);

	var _assert2 = _interopRequireDefault(_assert);

	var _extend = __webpack_require__(20);

	var _extend2 = _interopRequireDefault(_extend);

	function expect(actual) {
	  return new _Expectation2['default'](actual);
	}

	expect.createSpy = _SpyUtils.createSpy;
	expect.spyOn = _SpyUtils.spyOn;
	expect.isSpy = _SpyUtils.isSpy;
	expect.restoreSpies = _SpyUtils.restoreSpies;
	expect.assert = _assert2['default'];
	expect.extend = _extend2['default'];

	exports['default'] = expect;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _isEqual = __webpack_require__(2);

	var _isEqual2 = _interopRequireDefault(_isEqual);

	var _isRegex = __webpack_require__(11);

	var _isRegex2 = _interopRequireDefault(_isRegex);

	var _assert = __webpack_require__(16);

	var _assert2 = _interopRequireDefault(_assert);

	var _SpyUtils = __webpack_require__(18);

	var _TestUtils = __webpack_require__(19);

	/**
	 * An Expectation is a wrapper around an assertion that allows it to be written
	 * in a more natural style, without the need to remember the order of arguments.
	 * This helps prevent you from making mistakes when writing tests.
	 */

	var Expectation = (function () {
	  function Expectation(actual) {
	    _classCallCheck(this, Expectation);

	    this.actual = actual;

	    if (_TestUtils.isFunction(actual)) {
	      this.context = null;
	      this.args = [];
	    }
	  }

	  Expectation.prototype.toExist = function toExist(message) {
	    _assert2['default'](this.actual, message || 'Expected %s to exist', this.actual);

	    return this;
	  };

	  Expectation.prototype.toNotExist = function toNotExist(message) {
	    _assert2['default'](!this.actual, message || 'Expected %s to not exist', this.actual);

	    return this;
	  };

	  Expectation.prototype.toBe = function toBe(value, message) {
	    _assert2['default'](this.actual === value, message || 'Expected %s to be %s', this.actual, value);

	    return this;
	  };

	  Expectation.prototype.toNotBe = function toNotBe(value, message) {
	    _assert2['default'](this.actual !== value, message || 'Expected %s to not be %s', this.actual, value);

	    return this;
	  };

	  Expectation.prototype.toEqual = function toEqual(value, message) {
	    try {
	      _assert2['default'](_isEqual2['default'](this.actual, value), message || 'Expected %s to equal %s', this.actual, value);
	    } catch (e) {
	      // These attributes are consumed by Mocha to produce a diff output.
	      e.showDiff = true;
	      e.actual = this.actual;
	      e.expected = value;
	      throw e;
	    }

	    return this;
	  };

	  Expectation.prototype.toNotEqual = function toNotEqual(value, message) {
	    _assert2['default'](!_isEqual2['default'](this.actual, value), message || 'Expected %s to not equal %s', this.actual, value);

	    return this;
	  };

	  Expectation.prototype.toThrow = function toThrow(value, message) {
	    _assert2['default'](_TestUtils.isFunction(this.actual), 'The "actual" argument in expect(actual).toThrow() must be a function, %s was given', this.actual);

	    _assert2['default'](_TestUtils.functionThrows(this.actual, this.context, this.args, value), message || 'Expected %s to throw %s', this.actual, value || 'an error');

	    return this;
	  };

	  Expectation.prototype.toNotThrow = function toNotThrow(value, message) {
	    _assert2['default'](_TestUtils.isFunction(this.actual), 'The "actual" argument in expect(actual).toNotThrow() must be a function, %s was given', this.actual);

	    _assert2['default'](!_TestUtils.functionThrows(this.actual, this.context, this.args, value), message || 'Expected %s to not throw %s', this.actual, value || 'an error');

	    return this;
	  };

	  Expectation.prototype.toBeA = function toBeA(value, message) {
	    _assert2['default'](_TestUtils.isFunction(value) || typeof value === 'string', 'The "value" argument in toBeA(value) must be a function or a string');

	    _assert2['default'](_TestUtils.isA(this.actual, value), message || 'Expected %s to be a %s', this.actual, value);

	    return this;
	  };

	  Expectation.prototype.toNotBeA = function toNotBeA(value, message) {
	    _assert2['default'](_TestUtils.isFunction(value) || typeof value === 'string', 'The "value" argument in toNotBeA(value) must be a function or a string');

	    _assert2['default'](!_TestUtils.isA(this.actual, value), message || 'Expected %s to be a %s', this.actual, value);

	    return this;
	  };

	  Expectation.prototype.toMatch = function toMatch(pattern, message) {
	    _assert2['default'](typeof this.actual === 'string', 'The "actual" argument in expect(actual).toMatch() must be a string');

	    _assert2['default'](_isRegex2['default'](pattern), 'The "value" argument in toMatch(value) must be a RegExp');

	    _assert2['default'](pattern.test(this.actual), message || 'Expected %s to match %s', this.actual, pattern);

	    return this;
	  };

	  Expectation.prototype.toNotMatch = function toNotMatch(pattern, message) {
	    _assert2['default'](typeof this.actual === 'string', 'The "actual" argument in expect(actual).toNotMatch() must be a string');

	    _assert2['default'](_isRegex2['default'](pattern), 'The "value" argument in toNotMatch(value) must be a RegExp');

	    _assert2['default'](!pattern.test(this.actual), message || 'Expected %s to not match %s', this.actual, pattern);

	    return this;
	  };

	  Expectation.prototype.toBeLessThan = function toBeLessThan(value, message) {
	    _assert2['default'](typeof this.actual === 'number', 'The "actual" argument in expect(actual).toBeLessThan() must be a number');

	    _assert2['default'](typeof value === 'number', 'The "value" argument in toBeLessThan(value) must be a number');

	    _assert2['default'](this.actual < value, message || 'Expected %s to be less than %s', this.actual, value);

	    return this;
	  };

	  Expectation.prototype.toBeLessThanOrEqualTo = function toBeLessThanOrEqualTo(value, message) {
	    _assert2['default'](typeof this.actual === 'number', 'The "actual" argument in expect(actual).toBeLessThanOrEqualTo() must be a number');

	    _assert2['default'](typeof value === 'number', 'The "value" argument in toBeLessThanOrEqualTo(value) must be a number');

	    _assert2['default'](this.actual <= value, message || 'Expected %s to be less than or equal to %s', this.actual, value);

	    return this;
	  };

	  Expectation.prototype.toBeGreaterThan = function toBeGreaterThan(value, message) {
	    _assert2['default'](typeof this.actual === 'number', 'The "actual" argument in expect(actual).toBeGreaterThan() must be a number');

	    _assert2['default'](typeof value === 'number', 'The "value" argument in toBeGreaterThan(value) must be a number');

	    _assert2['default'](this.actual > value, message || 'Expected %s to be greater than %s', this.actual, value);

	    return this;
	  };

	  Expectation.prototype.toBeGreaterThanOrEqualTo = function toBeGreaterThanOrEqualTo(value, message) {
	    _assert2['default'](typeof this.actual === 'number', 'The "actual" argument in expect(actual).toBeGreaterThanOrEqualTo() must be a number');

	    _assert2['default'](typeof value === 'number', 'The "value" argument in toBeGreaterThanOrEqualTo(value) must be a number');

	    _assert2['default'](this.actual >= value, message || 'Expected %s to be greater than or equal to %s', this.actual, value);

	    return this;
	  };

	  Expectation.prototype.toInclude = function toInclude(value, compareValues, message) {
	    _assert2['default'](_TestUtils.isArray(this.actual) || typeof this.actual === 'string', 'The "actual" argument in expect(actual).toInclude() must be an array or a string');

	    if (typeof compareValues === 'string') {
	      message = compareValues;
	      compareValues = null;
	    }

	    message = message || 'Expected %s to include %s';

	    if (_TestUtils.isArray(this.actual)) {
	      _assert2['default'](_TestUtils.arrayContains(this.actual, value, compareValues), message, this.actual, value);
	    } else {
	      _assert2['default'](_TestUtils.stringContains(this.actual, value), message, this.actual, value);
	    }

	    return this;
	  };

	  Expectation.prototype.toExclude = function toExclude(value, compareValues, message) {
	    _assert2['default'](_TestUtils.isArray(this.actual) || typeof this.actual === 'string', 'The "actual" argument in expect(actual).toExclude() must be an array or a string');

	    if (typeof compareValues === 'string') {
	      message = compareValues;
	      compareValues = null;
	    }

	    message = message || 'Expected %s to exclude %s';

	    if (_TestUtils.isArray(this.actual)) {
	      _assert2['default'](!_TestUtils.arrayContains(this.actual, value, compareValues), message, this.actual, value);
	    } else {
	      _assert2['default'](!_TestUtils.stringContains(this.actual, value), message, this.actual, value);
	    }

	    return this;
	  };

	  Expectation.prototype.toHaveBeenCalled = function toHaveBeenCalled(message) {
	    var spy = this.actual;

	    _assert2['default'](_SpyUtils.isSpy(spy), 'The "actual" argument in expect(actual).toHaveBeenCalled() must be a spy');

	    _assert2['default'](spy.calls.length > 0, message || 'spy was not called');

	    return this;
	  };

	  Expectation.prototype.toHaveBeenCalledWith = function toHaveBeenCalledWith() {
	    var spy = this.actual;

	    _assert2['default'](_SpyUtils.isSpy(spy), 'The "actual" argument in expect(actual).toHaveBeenCalledWith() must be a spy');

	    var expectedArgs = Array.prototype.slice.call(arguments, 0);

	    _assert2['default'](spy.calls.some(function (call) {
	      return _isEqual2['default'](call.arguments, expectedArgs);
	    }), 'spy was never called with %s', expectedArgs);

	    return this;
	  };

	  Expectation.prototype.toNotHaveBeenCalled = function toNotHaveBeenCalled(message) {
	    var spy = this.actual;

	    _assert2['default'](_SpyUtils.isSpy(spy), 'The "actual" argument in expect(actual).toNotHaveBeenCalled() must be a spy');

	    _assert2['default'](spy.calls.length === 0, message || 'spy was not supposed to be called');

	    return this;
	  };

	  Expectation.prototype.withContext = function withContext(context) {
	    _assert2['default'](_TestUtils.isFunction(this.actual), 'The "actual" argument in expect(actual).withContext() must be a function');

	    this.context = context;

	    return this;
	  };

	  Expectation.prototype.withArgs = function withArgs() {
	    _assert2['default'](_TestUtils.isFunction(this.actual), 'The "actual" argument in expect(actual).withArgs() must be a function');

	    if (arguments.length) this.args = this.args.concat(Array.prototype.slice.call(arguments, 0));

	    return this;
	  };

	  return Expectation;
	})();

	var aliases = {
	  toBeAn: 'toBeA',
	  toNotBeAn: 'toNotBeA',
	  toBeTruthy: 'toExist',
	  toBeFalsy: 'toNotExist',
	  toBeFewerThan: 'toBeLessThan',
	  toBeMoreThan: 'toBeGreaterThan',
	  toContain: 'toInclude',
	  toNotContain: 'toExclude'
	};

	for (var alias in aliases) {
	  Expectation.prototype[alias] = Expectation.prototype[aliases[alias]];
	}exports['default'] = Expectation;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ObjectPrototype = Object.prototype;
	var toStr = ObjectPrototype.toString;
	var booleanValue = Boolean.prototype.valueOf;
	var has = __webpack_require__(3);
	var isArrowFunction = __webpack_require__(5);
	var isBoolean = __webpack_require__(7);
	var isDate = __webpack_require__(8);
	var isGenerator = __webpack_require__(9);
	var isNumber = __webpack_require__(10);
	var isRegex = __webpack_require__(11);
	var isString = __webpack_require__(12);
	var isSymbol = __webpack_require__(13);
	var isCallable = __webpack_require__(6);

	var isProto = Object.prototype.isPrototypeOf;

	var foo = function foo() {};
	var functionsHaveNames = foo.name === 'foo';

	var symbolValue = typeof Symbol === 'function' ? Symbol.prototype.valueOf : null;
	var symbolIterator = __webpack_require__(14)();

	var collectionsForEach = __webpack_require__(15)();

	var getPrototypeOf = Object.getPrototypeOf;
	if (!getPrototypeOf) {
		/* eslint-disable no-proto */
		if (typeof 'test'.__proto__ === 'object') {
			getPrototypeOf = function (obj) {
				return obj.__proto__;
			};
		} else {
			getPrototypeOf = function (obj) {
				var constructor = obj.constructor,
					oldConstructor;
				if (has(obj, 'constructor')) {
					oldConstructor = constructor;
					if (!(delete obj.constructor)) { // reset constructor
						return null; // can't delete obj.constructor, return null
					}
					constructor = obj.constructor; // get real constructor
					obj.constructor = oldConstructor; // restore constructor
				}
				return constructor ? constructor.prototype : ObjectPrototype; // needed for IE
			};
		}
		/* eslint-enable no-proto */
	}

	var isArray = Array.isArray || function (value) {
		return toStr.call(value) === '[object Array]';
	};

	var normalizeFnWhitespace = function normalizeFnWhitespace(fnStr) {
		// this is needed in IE 9, at least, which has inconsistencies here.
		return fnStr.replace(/^function ?\(/, 'function (').replace('){', ') {');
	};

	var tryMapSetEntries = function tryMapSetEntries(collection) {
		var foundEntries = [];
		try {
			collectionsForEach.Map.call(collection, function (key, value) {
				foundEntries.push([key, value]);
			});
		} catch (notMap) {
			try {
				collectionsForEach.Set.call(collection, function (value) {
					foundEntries.push([value]);
				});
			} catch (notSet) {
				return false;
			}
		}
		return foundEntries;
	};

	module.exports = function isEqual(value, other) {
		if (value === other) { return true; }
		if (value == null || other == null) { return value === other; }

		if (toStr.call(value) !== toStr.call(other)) { return false; }

		var valIsBool = isBoolean(value);
		var otherIsBool = isBoolean(other);
		if (valIsBool || otherIsBool) {
			return valIsBool && otherIsBool && booleanValue.call(value) === booleanValue.call(other);
		}

		var valIsNumber = isNumber(value);
		var otherIsNumber = isNumber(value);
		if (valIsNumber || otherIsNumber) {
			return valIsNumber && otherIsNumber && (Number(value) === Number(other) || (isNaN(value) && isNaN(other)));
		}

		var valIsString = isString(value);
		var otherIsString = isString(other);
		if (valIsString || otherIsString) {
			return valIsString && otherIsString && String(value) === String(other);
		}

		var valIsDate = isDate(value);
		var otherIsDate = isDate(other);
		if (valIsDate || otherIsDate) {
			return valIsDate && otherIsDate && +value === +other;
		}

		var valIsRegex = isRegex(value);
		var otherIsRegex = isRegex(other);
		if (valIsRegex || otherIsRegex) {
			return valIsRegex && otherIsRegex && String(value) === String(other);
		}

		var valIsArray = isArray(value);
		var otherIsArray = isArray(other);
		if (valIsArray || otherIsArray) {
			if (!valIsArray || !otherIsArray) { return false; }
			if (value.length !== other.length) { return false; }
			if (String(value) !== String(other)) { return false; }

			var index = value.length - 1;
			var equal = true;
			while (equal && index >= 0) {
				equal = has(value, index) && has(other, index) && isEqual(value[index], other[index]);
				index -= 1;
			}
			return equal;
		}

		var valueIsSym = isSymbol(value);
		var otherIsSym = isSymbol(other);
		if (valueIsSym !== otherIsSym) { return false; }
		if (valueIsSym && otherIsSym) {
			return symbolValue.call(value) === symbolValue.call(other);
		}

		var valueIsGen = isGenerator(value);
		var otherIsGen = isGenerator(other);
		if (valueIsGen !== otherIsGen) { return false; }

		var valueIsArrow = isArrowFunction(value);
		var otherIsArrow = isArrowFunction(other);
		if (valueIsArrow !== otherIsArrow) { return false; }

		if (isCallable(value) || isCallable(other)) {
			if (functionsHaveNames && !isEqual(value.name, other.name)) { return false; }
			if (!isEqual(value.length, other.length)) { return false; }

			var valueStr = normalizeFnWhitespace(String(value));
			var otherStr = normalizeFnWhitespace(String(other));
			if (isEqual(valueStr, otherStr)) { return true; }

			if (!valueIsGen && !valueIsArrow) {
				return isEqual(valueStr.replace(/\)\s*\{/, '){'), otherStr.replace(/\)\s*\{/, '){'));
			}
			return isEqual(valueStr, otherStr);
		}

		if (typeof value === 'object' || typeof other === 'object') {
			if (typeof value !== typeof other) { return false; }
			if (isProto.call(value, other) || isProto.call(other, value)) { return false; }
			if (getPrototypeOf(value) !== getPrototypeOf(other)) { return false; }

			if (symbolIterator) {
				var valueIteratorFn = value[symbolIterator];
				var valueIsIterable = isCallable(valueIteratorFn);
				var otherIteratorFn = other[symbolIterator];
				var otherIsIterable = isCallable(otherIteratorFn);
				if (valueIsIterable !== otherIsIterable) {
					return false;
				}
				if (valueIsIterable && otherIsIterable) {
					var valueIterator = valueIteratorFn.call(value);
					var otherIterator = otherIteratorFn.call(other);
					var valueNext, otherNext;
					do {
						valueNext = valueIterator.next();
						otherNext = otherIterator.next();
						if (!valueNext.done && !otherNext.done && !isEqual(valueNext, otherNext)) {
							return false;
						}
					} while (!valueNext.done && !otherNext.done);
					return valueNext.done === otherNext.done;
				}
			} else if (collectionsForEach.Map || collectionsForEach.Set) {
				var valueEntries = tryMapSetEntries(value);
				var otherEntries = tryMapSetEntries(other);
				if (isArray(valueEntries) !== isArray(otherEntries)) {
					return false; // either: neither is a Map/Set, or one is and the other isn't.
				}
				if (valueEntries && otherEntries) {
					return isEqual(valueEntries, otherEntries);
				}
			}

			var key, valueKeyIsRecursive, otherKeyIsRecursive;
			for (key in value) {
				if (has(value, key)) {
					if (!has(other, key)) { return false; }
					valueKeyIsRecursive = value[key] && value[key][key] === value;
					otherKeyIsRecursive = other[key] && other[key][key] === other;
					if (valueKeyIsRecursive !== otherKeyIsRecursive) {
						return false;
					}
					if (!valueKeyIsRecursive && !otherKeyIsRecursive && !isEqual(value[key], other[key])) {
						return false;
					}
				}
			}
			for (key in other) {
				if (has(other, key)) {
					if (!has(value, key)) { return false; }
					valueKeyIsRecursive = value[key] && value[key][key] === value;
					otherKeyIsRecursive = other[key] && other[key][key] === other;
					if (valueKeyIsRecursive !== otherKeyIsRecursive) {
						return false;
					}
					if (!valueKeyIsRecursive && !otherKeyIsRecursive && !isEqual(other[key], value[key])) {
						return false;
					}
				}
			}
			return true;
		}

		return false;
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var bind = __webpack_require__(4);

	module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ },
/* 4 */
/***/ function(module, exports) {

	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var slice = Array.prototype.slice;
	var toStr = Object.prototype.toString;
	var funcType = '[object Function]';

	module.exports = function bind(that) {
	    var target = this;
	    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
	        throw new TypeError(ERROR_MESSAGE + target);
	    }
	    var args = slice.call(arguments, 1);

	    var binder = function () {
	        if (this instanceof bound) {
	            var result = target.apply(
	                this,
	                args.concat(slice.call(arguments))
	            );
	            if (Object(result) === result) {
	                return result;
	            }
	            return this;
	        } else {
	            return target.apply(
	                that,
	                args.concat(slice.call(arguments))
	            );
	        }
	    };

	    var boundLength = Math.max(0, target.length - args.length);
	    var boundArgs = [];
	    for (var i = 0; i < boundLength; i++) {
	        boundArgs.push('$' + i);
	    }

	    var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

	    if (target.prototype) {
	        var Empty = function Empty() {};
	        Empty.prototype = target.prototype;
	        bound.prototype = new Empty();
	        Empty.prototype = null;
	    }

	    return bound;
	};



/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isCallable = __webpack_require__(6);
	var fnToStr = Function.prototype.toString;
	var isNonArrowFnRegex = /^\s*function/;
	var isArrowFnWithParensRegex = /^\([^\)]*\) *=>/;
	var isArrowFnWithoutParensRegex = /^[^=]*=>/;

	module.exports = function isArrowFunction(fn) {
		if (!isCallable(fn)) { return false; }
		var fnStr = fnToStr.call(fn);
		return fnStr.length > 0 &&
			!isNonArrowFnRegex.test(fnStr) &&
			(isArrowFnWithParensRegex.test(fnStr) || isArrowFnWithoutParensRegex.test(fnStr));
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var constructorRegex = /\s*class /;
	var isNonES6ClassFn = function isNonES6ClassFn(value) {
		try {
			return !constructorRegex.test(value);
		} catch (e) {
			return false; // not a function
		}
	};

	var fnToStr = Function.prototype.toString;
	var tryFunctionObject = function tryFunctionObject(value) {
		try {
			if (constructorRegex.test(value)) { return false; }
			fnToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var fnClass = '[object Function]';
	var genClass = '[object GeneratorFunction]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	module.exports = function isCallable(value) {
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (!isNonES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		return strClass === fnClass || strClass === genClass;
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var boolToStr = Boolean.prototype.toString;

	var tryBooleanObject = function tryBooleanObject(value) {
		try {
			boolToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var boolClass = '[object Boolean]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	module.exports = function isBoolean(value) {
		if (typeof value === 'boolean') { return true; }
		if (typeof value !== 'object') { return false; }
		return hasToStringTag ? tryBooleanObject(value) : toStr.call(value) === boolClass;
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	var getDay = Date.prototype.getDay;
	var tryDateObject = function tryDateObject(value) {
		try {
			getDay.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};

	var toStr = Object.prototype.toString;
	var dateClass = '[object Date]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	module.exports = function isDateObject(value) {
		if (typeof value !== 'object' || value === null) { return false; }
		return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var toStr = Object.prototype.toString;
	var fnToStr = Function.prototype.toString;
	var isFnRegex = /^\s*function\*/;

	module.exports = function isGeneratorFunction(fn) {
		if (typeof fn !== 'function') { return false; }
		var fnStr = toStr.call(fn);
		return (fnStr === '[object Function]' || fnStr === '[object GeneratorFunction]') && isFnRegex.test(fnToStr.call(fn));
	};



/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	var numToStr = Number.prototype.toString;
	var tryNumberObject = function tryNumberObject(value) {
		try {
			numToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var numClass = '[object Number]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	module.exports = function isNumberObject(value) {
		if (typeof value === 'number') { return true; }
		if (typeof value !== 'object') { return false; }
		return hasToStringTag ? tryNumberObject(value) : toStr.call(value) === numClass;
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	var regexExec = RegExp.prototype.exec;
	var tryRegexExec = function tryRegexExec(value) {
		try {
			regexExec.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var regexClass = '[object RegExp]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	module.exports = function isRegex(value) {
		if (typeof value !== 'object') { return false; }
		return hasToStringTag ? tryRegexExec(value) : toStr.call(value) === regexClass;
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	var strValue = String.prototype.valueOf;
	var tryStringObject = function tryStringObject(value) {
		try {
			strValue.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var strClass = '[object String]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	module.exports = function isString(value) {
		if (typeof value === 'string') { return true; }
		if (typeof value !== 'object') { return false; }
		return hasToStringTag ? tryStringObject(value) : toStr.call(value) === strClass;
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	var toStr = Object.prototype.toString;
	var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

	if (hasSymbols) {
		var symToStr = Symbol.prototype.toString;
		var symStringRegex = /^Symbol\(.*\)$/;
		var isSymbolObject = function isSymbolObject(value) {
			if (typeof value.valueOf() !== 'symbol') { return false; }
			return symStringRegex.test(symToStr.call(value));
		};
		module.exports = function isSymbol(value) {
			if (typeof value === 'symbol') { return true; }
			if (toStr.call(value) !== '[object Symbol]') { return false; }
			try {
				return isSymbolObject(value);
			} catch (e) {
				return false;
			}
		};
	} else {
		module.exports = function isSymbol(value) {
			// this environment does not support Symbols.
			return false;
		};
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isSymbol = __webpack_require__(13);

	module.exports = function getSymbolIterator() {
		var symbolIterator = typeof Symbol === 'function' && isSymbol(Symbol.iterator) ? Symbol.iterator : null;

		if (typeof Object.getOwnPropertyNames === 'function' && typeof Map === 'function' && typeof Map.prototype.entries === 'function') {
			Object.getOwnPropertyNames(Map.prototype).forEach(function (name) {
				if (name !== 'entries' && name !== 'size' && Map.prototype[name] === Map.prototype.entries) {
					symbolIterator = name;
				}
			});
		}

		return symbolIterator;
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		var mapForEach = (function () {
			if (typeof Map !== 'function') { return null; }
			try {
				Map.prototype.forEach.call({}, function () {});
			} catch (e) {
				return Map.prototype.forEach;
			}
			return null;
		}());

		var setForEach = (function () {
			if (typeof Set !== 'function') { return null; }
			try {
				Set.prototype.forEach.call({}, function () {});
			} catch (e) {
				return Set.prototype.forEach;
			}
			return null;
		}());

		return { Map: mapForEach, Set: setForEach };
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _objectInspect = __webpack_require__(17);

	var _objectInspect2 = _interopRequireDefault(_objectInspect);

	function assert(condition, messageFormat) {
	  for (var _len = arguments.length, extraArgs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    extraArgs[_key - 2] = arguments[_key];
	  }

	  if (condition) return;

	  var index = 0;

	  throw new Error(messageFormat.replace(/%s/g, function () {
	    return _objectInspect2['default'](extraArgs[index++]);
	  }));
	}

	exports['default'] = assert;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	var hasMap = typeof Map === 'function' && Map.prototype;
	var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
	var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
	var mapForEach = hasMap && Map.prototype.forEach;
	var hasSet = typeof Set === 'function' && Set.prototype;
	var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
	var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
	var setForEach = hasSet && Set.prototype.forEach;

	module.exports = function inspect_ (obj, opts, depth, seen) {
	    if (!opts) opts = {};
	    
	    var maxDepth = opts.depth === undefined ? 5 : opts.depth;
	    if (depth === undefined) depth = 0;
	    if (depth >= maxDepth && maxDepth > 0
	    && obj && typeof obj === 'object') {
	        return '[Object]';
	    }
	    
	    if (seen === undefined) seen = [];
	    else if (indexOf(seen, obj) >= 0) {
	        return '[Circular]';
	    }
	    
	    function inspect (value, from) {
	        if (from) {
	            seen = seen.slice();
	            seen.push(from);
	        }
	        return inspect_(value, opts, depth + 1, seen);
	    }
	    
	    if (typeof obj === 'string') {
	        return inspectString(obj);
	    }
	    else if (typeof obj === 'function') {
	        var name = nameOf(obj);
	        return '[Function' + (name ? ': ' + name : '') + ']';
	    }
	    else if (obj === null) {
	        return 'null';
	    }
	    else if (isSymbol(obj)) {
	        var symString = Symbol.prototype.toString.call(obj);
	        return typeof obj === 'object' ? 'Object(' + symString + ')' : symString;
	    }
	    else if (isElement(obj)) {
	        var s = '<' + String(obj.nodeName).toLowerCase();
	        var attrs = obj.attributes || [];
	        for (var i = 0; i < attrs.length; i++) {
	            s += ' ' + attrs[i].name + '="' + quote(attrs[i].value) + '"';
	        }
	        s += '>';
	        if (obj.childNodes && obj.childNodes.length) s += '...';
	        s += '</' + String(obj.nodeName).toLowerCase() + '>';
	        return s;
	    }
	    else if (isArray(obj)) {
	        if (obj.length === 0) return '[]';
	        var xs = Array(obj.length);
	        for (var i = 0; i < obj.length; i++) {
	            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
	        }
	        return '[ ' + xs.join(', ') + ' ]';
	    }
	    else if (isError(obj)) {
	        var parts = [];
	        for (var key in obj) {
	            if (!has(obj, key)) continue;
	            
	            if (/[^\w$]/.test(key)) {
	                parts.push(inspect(key) + ': ' + inspect(obj[key]));
	            }
	            else {
	                parts.push(key + ': ' + inspect(obj[key]));
	            }
	        }
	        if (parts.length === 0) return '[' + obj + ']';
	        return '{ [' + obj + '] ' + parts.join(', ') + ' }';
	    }
	    else if (typeof obj === 'object' && typeof obj.inspect === 'function') {
	        return obj.inspect();
	    }
	    else if (isMap(obj)) {
	        var parts = [];
	        mapForEach.call(obj, function (value, key) {
	            parts.push(inspect(key, obj) + ' => ' + inspect(value, obj));
	        });
	        return 'Map (' + mapSize.call(obj) + ') {' + parts.join(', ') + '}';
	    }
	    else if (isSet(obj)) {
	        var parts = [];
	        setForEach.call(obj, function (value ) {
	            parts.push(inspect(value, obj));
	        });
	        return 'Set (' + setSize.call(obj) + ') {' + parts.join(', ') + '}';
	    }
	    else if (typeof obj === 'object' && !isDate(obj) && !isRegExp(obj)) {
	        var xs = [], keys = [];
	        for (var key in obj) {
	            if (has(obj, key)) keys.push(key);
	        }
	        keys.sort();
	        for (var i = 0; i < keys.length; i++) {
	            var key = keys[i];
	            if (/[^\w$]/.test(key)) {
	                xs.push(inspect(key) + ': ' + inspect(obj[key], obj));
	            }
	            else xs.push(key + ': ' + inspect(obj[key], obj));
	        }
	        if (xs.length === 0) return '{}';
	        return '{ ' + xs.join(', ') + ' }';
	    }
	    else return String(obj);
	};

	function quote (s) {
	    return String(s).replace(/"/g, '&quot;');
	}

	function isArray (obj) { return toStr(obj) === '[object Array]' }
	function isDate (obj) { return toStr(obj) === '[object Date]' }
	function isRegExp (obj) { return toStr(obj) === '[object RegExp]' }
	function isError (obj) { return toStr(obj) === '[object Error]' }
	function isSymbol (obj) { return toStr(obj) === '[object Symbol]' }

	var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
	function has (obj, key) {
	    return hasOwn.call(obj, key);
	}

	function toStr (obj) {
	    return Object.prototype.toString.call(obj);
	}

	function nameOf (f) {
	    if (f.name) return f.name;
	    var m = f.toString().match(/^function\s*([\w$]+)/);
	    if (m) return m[1];
	}

	function indexOf (xs, x) {
	    if (xs.indexOf) return xs.indexOf(x);
	    for (var i = 0, l = xs.length; i < l; i++) {
	        if (xs[i] === x) return i;
	    }
	    return -1;
	}

	function isMap (x) {
	    if (!mapSize) {
	        return false;
	    }
	    try {
	        mapSize.call(x);
	        return true;
	    } catch (e) {}
	    return false;
	}

	function isSet (x) {
	    if (!setSize) {
	        return false;
	    }
	    try {
	        setSize.call(x);
	        return true;
	    } catch (e) {}
	    return false;
	}

	function isElement (x) {
	    if (!x || typeof x !== 'object') return false;
	    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
	        return true;
	    }
	    return typeof x.nodeName === 'string'
	        && typeof x.getAttribute === 'function'
	    ;
	}

	function inspectString (str) {
	    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
	    return "'" + s + "'";
	    
	    function lowbyte (c) {
	        var n = c.charCodeAt(0);
	        var x = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[n];
	        if (x) return '\\' + x;
	        return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
	    }
	}


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.createSpy = createSpy;
	exports.spyOn = spyOn;
	exports.isSpy = isSpy;
	exports.restoreSpies = restoreSpies;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _assert = __webpack_require__(16);

	var _assert2 = _interopRequireDefault(_assert);

	var _TestUtils = __webpack_require__(19);

	function noop() {}

	var spies = [];

	function createSpy(fn) {
	  var restore = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];

	  if (fn == null) fn = noop;

	  _assert2['default'](_TestUtils.isFunction(fn), 'createSpy needs a function');

	  var targetFn = undefined,
	      thrownValue = undefined,
	      returnValue = undefined;

	  var spy = function spy() {
	    spy.calls.push({
	      context: this,
	      arguments: Array.prototype.slice.call(arguments, 0)
	    });

	    if (targetFn) return targetFn.apply(this, arguments);

	    if (thrownValue) throw thrownValue;

	    return returnValue;
	  };

	  spy.calls = [];

	  spy.andCall = function (fn) {
	    targetFn = fn;
	    return spy;
	  };

	  spy.andCallThrough = function () {
	    return spy.andCall(fn);
	  };

	  spy.andThrow = function (object) {
	    thrownValue = object;
	    return spy;
	  };

	  spy.andReturn = function (value) {
	    returnValue = value;
	    return spy;
	  };

	  spy.getLastCall = function () {
	    return spy.calls[spy.calls.length - 1];
	  };

	  spy.reset = function () {
	    spy.calls = [];
	  };

	  spy.restore = spy.destroy = restore;

	  spy.__isSpy = true;

	  spies.push(spy);

	  return spy;
	}

	function spyOn(object, methodName) {
	  var original = object[methodName];

	  if (!isSpy(original)) {
	    _assert2['default'](_TestUtils.isFunction(original), 'Cannot spyOn the %s property; it is not a function', methodName);

	    object[methodName] = createSpy(original, function () {
	      object[methodName] = original;
	    });
	  }

	  return object[methodName];
	}

	function isSpy(object) {
	  return object && object.__isSpy === true;
	}

	function restoreSpies() {
	  for (var i = spies.length - 1; i >= 0; i--) {
	    spies[i].restore();
	  }spies = [];
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.functionThrows = functionThrows;
	exports.arrayContains = arrayContains;
	exports.stringContains = stringContains;
	exports.isArray = isArray;
	exports.isFunction = isFunction;
	exports.isA = isA;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _isEqual = __webpack_require__(2);

	var _isEqual2 = _interopRequireDefault(_isEqual);

	var _isRegex = __webpack_require__(11);

	var _isRegex2 = _interopRequireDefault(_isRegex);

	/**
	 * Returns true if the given function throws the given value
	 * when invoked. The value may be:
	 *
	 * - undefined, to merely assert there was a throw
	 * - a constructor function, for comparing using instanceof
	 * - a regular expression, to compare with the error message
	 * - a string, to find in the error message
	 */

	function functionThrows(fn, context, args, value) {
	  try {
	    fn.apply(context, args);
	  } catch (error) {
	    if (value == null) return true;

	    if (isFunction(value) && error instanceof value) return true;

	    var message = error.message || error;

	    if (typeof message === 'string') {
	      if (_isRegex2['default'](value) && value.test(error.message)) return true;

	      if (typeof value === 'string' && message.indexOf(value) !== -1) return true;
	    }
	  }

	  return false;
	}

	/**
	 * Returns true if the given array contains the value, false
	 * otherwise. The compareValues function must return false to
	 * indicate a non-match.
	 */

	function arrayContains(array, value, compareValues) {
	  if (compareValues == null) compareValues = _isEqual2['default'];

	  return array.some(function (item) {
	    return compareValues(item, value) !== false;
	  });
	}

	/**
	 * Returns true if the given string contains the value, false otherwise.
	 */

	function stringContains(string, value) {
	  return string.indexOf(value) !== -1;
	}

	/**
	 * Returns true if the given object is an array.
	 */

	function isArray(object) {
	  return Array.isArray(object);
	}

	/**
	 * Returns true if the given object is a function.
	 */

	function isFunction(object) {
	  return typeof object === 'function';
	}

	/**
	 * Returns true if the given object is an instanceof value
	 * or its typeof is the given value.
	 */

	function isA(object, value) {
	  if (isFunction(value)) return object instanceof value;

	  if (value === 'array') return Array.isArray(object);

	  return typeof object === value;
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Expectation = __webpack_require__(1);

	var _Expectation2 = _interopRequireDefault(_Expectation);

	var Extensions = [];

	function extend(extension) {
	  if (Extensions.indexOf(extension) === -1) {
	    Extensions.push(extension);

	    for (var p in extension) {
	      if (extension.hasOwnProperty(p)) _Expectation2['default'].prototype[p] = extension[p];
	    }
	  }
	}

	exports['default'] = extend;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;