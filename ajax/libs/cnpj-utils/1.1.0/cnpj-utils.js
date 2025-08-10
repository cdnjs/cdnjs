/**
 * cnpj-utils v1.1.0
 *
 * @author Julio L. Muller.
 * @license MIT - 2020-2021
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.cnpjUtils = factory());
}(this, (function () { 'use strict';

	function getAugmentedNamespace(n) {
		if (n.__esModule) return n;
		var a = Object.defineProperty({}, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var build$2 = {exports: {}};

	var cnpjFmt$1 = {};

	/**
	 * num-only v1.1.0
	 *
	 * @author Julio L. Muller.
	 * @license MIT - 2020-2021
	 */

	function numOnly(target) {
	  return String(target).replace(/\D/g, '');
	}

	var index_cjs = numOnly;

	/**
	 * Copyright (C) 2017-present by Andrea Giammarchi - @WebReflection
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */
	var replace = ''.replace;
	var ca = /[&<>'"]/g;
	var es = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g;
	var esca = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  "'": '&#39;',
	  '"': '&quot;'
	};
	var unes = {
	  '&amp;': '&',
	  '&#38;': '&',
	  '&lt;': '<',
	  '&#60;': '<',
	  '&gt;': '>',
	  '&#62;': '>',
	  '&apos;': "'",
	  '&#39;': "'",
	  '&quot;': '"',
	  '&#34;': '"'
	};
	function escape(es) {
	  return replace.call(es, ca, pe);
	}
	function unescape(un) {
	  return replace.call(un, es, cape);
	}

	function pe(m) {
	  return esca[m];
	}

	function cape(m) {
	  return unes[m];
	}

	var esm = /*#__PURE__*/Object.freeze({
		__proto__: null,
		escape: escape,
		unescape: unescape
	});

	var require$$1 = /*@__PURE__*/getAugmentedNamespace(esm);

	var mergeOptions$1 = {};

	(function (exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports["default"] = void 0;
	  /* eslint-disable prefer-const */

	  var DEFAULT_DOT_SYMBOL = '.';
	  var DEFAULT_SLASH_SYMBOL = '/';
	  var DEFAULT_DASH_SYMBOL = '-';
	  var DEFAULT_HIDDEN_START = 5;
	  var DEFAULT_HIDDEN_END = 13;
	  var DEFAULT_HIDDEN_SYMBOL = '*';
	  var DEFAULT_HIDDEN_STATE = false;
	  var DEFAULT_ESCAPE_STATE = false;
	  /**
	   * Merge custom options to the default ones.
	   *
	   * @param {CnpjFormattingOptions} options
	   * @return {CnpjFormattingOptions}
	   */

	  function mergeOptions() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var _options$delimiters = options.delimiters;
	    _options$delimiters = _options$delimiters === void 0 ? {} : _options$delimiters;
	    var _options$delimiters$d = _options$delimiters.dot,
	        dot = _options$delimiters$d === void 0 ? DEFAULT_DOT_SYMBOL : _options$delimiters$d,
	        _options$delimiters$s = _options$delimiters.slash,
	        slash = _options$delimiters$s === void 0 ? DEFAULT_SLASH_SYMBOL : _options$delimiters$s,
	        _options$delimiters$d2 = _options$delimiters.dash,
	        dash = _options$delimiters$d2 === void 0 ? DEFAULT_DASH_SYMBOL : _options$delimiters$d2,
	        _options$hiddenRange = options.hiddenRange;
	    _options$hiddenRange = _options$hiddenRange === void 0 ? {} : _options$hiddenRange;
	    var _options$hiddenRange$ = _options$hiddenRange.start,
	        start = _options$hiddenRange$ === void 0 ? DEFAULT_HIDDEN_START : _options$hiddenRange$,
	        _options$hiddenRange$2 = _options$hiddenRange.end,
	        end = _options$hiddenRange$2 === void 0 ? DEFAULT_HIDDEN_END : _options$hiddenRange$2,
	        _options$hiddenSymbol = options.hiddenSymbol,
	        hiddenSymbol = _options$hiddenSymbol === void 0 ? DEFAULT_HIDDEN_SYMBOL : _options$hiddenSymbol,
	        _options$hidden = options.hidden,
	        hidden = _options$hidden === void 0 ? DEFAULT_HIDDEN_STATE : _options$hidden,
	        _options$escape = options.escape,
	        escape = _options$escape === void 0 ? DEFAULT_ESCAPE_STATE : _options$escape,
	        _options$onFail = options.onFail,
	        onFail = _options$onFail === void 0 ? function (value) {
	      return value;
	    } : _options$onFail;

	    if (hidden) {
	      if (isNaN(start) || start < 0 || start > 13) {
	        throw new TypeError('Option "hiddenRange.start" must be a number between 0 and 13.');
	      }

	      if (isNaN(end) || end < 0 || end > 13) {
	        throw new TypeError('Option "hiddenRange.end" must be a number between 0 and 13.');
	      }

	      if (start > end) {
	        var aux = start;
	        start = end;
	        end = aux;
	      }
	    }

	    if (typeof onFail !== 'function') {
	      throw new TypeError('The option "onFail" must be a callback function.');
	    }

	    return {
	      delimiters: {
	        dot: dot,
	        slash: slash,
	        dash: dash
	      },
	      hiddenRange: {
	        start: start,
	        end: end
	      },
	      hiddenSymbol: hiddenSymbol,
	      hidden: hidden,
	      escape: escape,
	      onFail: onFail
	    };
	  }

	  var _default = mergeOptions;
	  exports["default"] = _default;
	})(mergeOptions$1);

	(function (exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports["default"] = void 0;

	  var _numOnly = _interopRequireDefault(index_cjs);

	  var _htmlEscaper = _interopRequireDefault(require$$1);

	  var _mergeOptions = _interopRequireDefault(mergeOptions$1);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  }
	  /**
	   * Validate a given CNPJ char sequence.
	   *
	   * @param {string} cnpjString
	   * @param {CnpjFormattingOptions} [options]
	   * @return {string}
	   */


	  function cnpjFmt(cnpjString) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var CNPJ_LENGTH = 14;
	    var cnpjArray = (0, _numOnly["default"])(cnpjString).split('');
	    var userOptions = (0, _mergeOptions["default"])(options);

	    if (cnpjArray.length !== CNPJ_LENGTH) {
	      return userOptions.onFail(cnpjString);
	    }

	    if (userOptions.hidden) {
	      for (var i = userOptions.hiddenRange.start; i <= userOptions.hiddenRange.end; i++) {
	        cnpjArray[i] = userOptions.hiddenSymbol;
	      }
	    }

	    cnpjArray.splice(12, 0, userOptions.delimiters.dash);
	    cnpjArray.splice(8, 0, userOptions.delimiters.slash);
	    cnpjArray.splice(5, 0, userOptions.delimiters.dot);
	    cnpjArray.splice(2, 0, userOptions.delimiters.dot);
	    var cnpjPretty = cnpjArray.join('');

	    if (userOptions.escape) {
	      return _htmlEscaper["default"].escape(cnpjPretty);
	    }

	    return cnpjPretty;
	  }

	  var _default = cnpjFmt;
	  exports["default"] = _default;
	})(cnpjFmt$1);

	(function (module) {
	  /* eslint-env node */

	  var cnpjFmt = cnpjFmt$1["default"];
	  module.exports = cnpjFmt; // Allow use of default import with ES module syntax

	  module.exports["default"] = cnpjFmt;
	})(build$2);

	var cnpjFmt = build$2.exports;

	var build$1 = {exports: {}};

	var cnpjGen$1 = {};

	var mergeOptions = {};

	(function (exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports["default"] = void 0;

	  function ownKeys(object, enumerableOnly) {
	    var keys = Object.keys(object);

	    if (Object.getOwnPropertySymbols) {
	      var symbols = Object.getOwnPropertySymbols(object);

	      if (enumerableOnly) {
	        symbols = symbols.filter(function (sym) {
	          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
	        });
	      }

	      keys.push.apply(keys, symbols);
	    }

	    return keys;
	  }

	  function _objectSpread(target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i] != null ? arguments[i] : {};

	      if (i % 2) {
	        ownKeys(Object(source), true).forEach(function (key) {
	          _defineProperty(target, key, source[key]);
	        });
	      } else if (Object.getOwnPropertyDescriptors) {
	        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
	      } else {
	        ownKeys(Object(source)).forEach(function (key) {
	          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	        });
	      }
	    }

	    return target;
	  }

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
	        value: value,
	        enumerable: true,
	        configurable: true,
	        writable: true
	      });
	    } else {
	      obj[key] = value;
	    }

	    return obj;
	  }

	  var DEFAULT_OPTIONS = {
	    format: false,
	    prefix: ''
	  };
	  /**
	   * Merge custom options to the default ones.
	   *
	   * @param {CnpjGeneratorOptions} options
	   * @return {CnpjGeneratorOptions}
	   */

	  function mergeOptions(options) {
	    return _objectSpread(_objectSpread({}, DEFAULT_OPTIONS), options);
	  }

	  var _default = mergeOptions;
	  exports["default"] = _default;
	})(mergeOptions);

	var calculateDigit = {};

	(function (exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports["default"] = void 0;

	  function _toConsumableArray(arr) {
	    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
	  }

	  function _nonIterableSpread() {
	    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	  }

	  function _unsupportedIterableToArray(o, minLen) {
	    if (!o) return;
	    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	    var n = Object.prototype.toString.call(o).slice(8, -1);
	    if (n === "Object" && o.constructor) n = o.constructor.name;
	    if (n === "Map" || n === "Set") return Array.from(o);
	    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	  }

	  function _iterableToArray(iter) {
	    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
	  }

	  function _arrayWithoutHoles(arr) {
	    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
	  }

	  function _arrayLikeToArray(arr, len) {
	    if (len == null || len > arr.length) len = arr.length;

	    for (var i = 0, arr2 = new Array(len); i < len; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  }
	  /**
	   * Calculate the verifier digit based on CNPJ base numeric sequence.
	   *
	   * @param {number[]} cnpjSequence
	   * @return {number}
	   */


	  function calculateDigit(cnpjSequence) {
	    var index = 2;

	    var sum = _toConsumableArray(cnpjSequence).reverse().reduce(function (previousResult, number) {
	      var result = previousResult + number * index;
	      index = index === 9 ? 2 : index + 1;
	      return result;
	    }, 0);

	    var remainder = sum % 11;
	    return remainder < 2 ? 0 : 11 - remainder;
	  }

	  var _default = calculateDigit;
	  exports["default"] = _default;
	})(calculateDigit);

	var numberGenerator = {};

	(function (exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports["default"] = void 0;
	  /**
	   * Generate an array of random numbers (as string) between 0 and  9.
	   *
	   * @param {number} length
	   * @return {number[]}
	   */

	  function numberGenerator(length) {
	    var numericSequence = [];

	    while (numericSequence.length < length) {
	      var random = Math.random() * 10;
	      var integer = Math.floor(random);
	      numericSequence.push(integer);
	    }

	    return numericSequence;
	  }

	  var _default = numberGenerator;
	  exports["default"] = _default;
	})(numberGenerator);

	(function (exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports["default"] = void 0;

	  var _numOnly = _interopRequireDefault(index_cjs);

	  var _cnpjFmt = _interopRequireDefault(build$2.exports);

	  var _mergeOptions = _interopRequireDefault(mergeOptions);

	  var _calculateDigit = _interopRequireDefault(calculateDigit);

	  var _numberGenerator = _interopRequireDefault(numberGenerator);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  }
	  /**
	   * Generate a valid CNPJ (Brazilian employer ID) numeric sequence.
	   *
	   * @param {CnpjGeneratorOptions} [options]
	   * @return {string}
	   */


	  function cnpjGen() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var userOptions = (0, _mergeOptions["default"])(options);
	    var baseSequence = (0, _numOnly["default"])(userOptions.prefix);
	    var prefixLength = baseSequence.length;

	    if (prefixLength < 0 || prefixLength > 12) {
	      throw new Error('Option "prefix" must be a string containing between 1 and 12 digits.');
	    }

	    if (prefixLength > 8 && baseSequence.slice(8) === '0000') {
	      throw new Error('The branch ID (characters 8 to 11) cannot be "0000".');
	    }

	    var branchID = "000".concat(Math.ceil(Math.random() * 9));
	    var cnpjSequence = baseSequence.split('').map(Number).concat((0, _numberGenerator["default"])(8 - prefixLength)).concat(branchID.slice(0, 12 - prefixLength).split(''));
	    cnpjSequence.push((0, _calculateDigit["default"])(cnpjSequence));
	    cnpjSequence.push((0, _calculateDigit["default"])(cnpjSequence));
	    return userOptions.format ? (0, _cnpjFmt["default"])(cnpjSequence.join('')) : cnpjSequence.join('');
	  }

	  var _default = cnpjGen;
	  exports["default"] = _default;
	})(cnpjGen$1);

	(function (module) {
	  /* eslint-env node */

	  var cnpjGen = cnpjGen$1["default"];
	  module.exports = cnpjGen; // Allow use of default import with ES module syntax

	  module.exports["default"] = cnpjGen;
	})(build$1);

	var cnpjGen = build$1.exports;

	var build = {exports: {}};

	var cnpjVal$1 = {};

	(function (exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports["default"] = void 0;

	  var _cnpjGen = _interopRequireDefault(build$1.exports);

	  var _numOnly = _interopRequireDefault(index_cjs);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  }
	  /**
	   * Validate a given CNPJ (Brazilian employer ID) char sequence.
	   *
	   * @param {string} cnpjString
	   * @return {boolean}
	   */


	  function cnpjVal(cnpjString) {
	    var CNPJ_LENGTH = 14;
	    var cnpjDigits = (0, _numOnly["default"])(cnpjString);

	    if (cnpjDigits.length !== CNPJ_LENGTH) {
	      return false;
	    }

	    return cnpjDigits === (0, _cnpjGen["default"])({
	      prefix: cnpjDigits.slice(0, 12)
	    });
	  }

	  var _default = cnpjVal;
	  exports["default"] = _default;
	})(cnpjVal$1);

	(function (module) {
	  /* eslint-env node */

	  var cnpjVal = cnpjVal$1["default"];
	  module.exports = cnpjVal; // Allow use of default import with ES module syntax

	  module.exports["default"] = cnpjVal;
	})(build);

	var cnpjVal = build.exports;

	var format = cnpjFmt;
	var generate = cnpjGen;
	var isValid = cnpjVal;
	var module = { format: format, generate: generate, isValid: isValid };

	return module;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY25wai11dGlscy5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL2h0bWwtZXNjYXBlci9lc20vaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvQGxhY3Vzc29mdC9jbnBqLWZtdC9idWlsZC9tZXJnZS1vcHRpb25zLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BsYWN1c3NvZnQvY25wai1mbXQvYnVpbGQvY25wai1mbXQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGxhY3Vzc29mdC9jbnBqLWZtdC9idWlsZC9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AbGFjdXNzb2Z0L2NucGotZ2VuL2J1aWxkL21lcmdlLW9wdGlvbnMuanMiLCIuLi9ub2RlX21vZHVsZXMvQGxhY3Vzc29mdC9jbnBqLWdlbi9idWlsZC9jYWxjdWxhdGUtZGlnaXQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGxhY3Vzc29mdC9jbnBqLWdlbi9idWlsZC9udW1iZXItZ2VuZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BsYWN1c3NvZnQvY25wai1nZW4vYnVpbGQvY25wai1nZW4uanMiLCIuLi9ub2RlX21vZHVsZXMvQGxhY3Vzc29mdC9jbnBqLWdlbi9idWlsZC9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AbGFjdXNzb2Z0L2NucGotdmFsL2J1aWxkL2NucGotdmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BsYWN1c3NvZnQvY25wai12YWwvYnVpbGQvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTctcHJlc2VudCBieSBBbmRyZWEgR2lhbW1hcmNoaSAtIEBXZWJSZWZsZWN0aW9uXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG52YXIgcmVwbGFjZSA9ICcnLnJlcGxhY2U7XG5cbnZhciBjYSA9IC9bJjw+J1wiXS9nO1xudmFyIGVzID0gLyYoPzphbXB8IzM4fGx0fCM2MHxndHwjNjJ8YXBvc3wjMzl8cXVvdHwjMzQpOy9nO1xuXG52YXIgZXNjYSA9IHtcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG4gIFwiJ1wiOiAnJiMzOTsnLFxuICAnXCInOiAnJnF1b3Q7J1xufTtcbnZhciB1bmVzID0ge1xuICAnJmFtcDsnOiAnJicsXG4gICcmIzM4Oyc6ICcmJyxcbiAgJyZsdDsnOiAnPCcsXG4gICcmIzYwOyc6ICc8JyxcbiAgJyZndDsnOiAnPicsXG4gICcmIzYyOyc6ICc+JyxcbiAgJyZhcG9zOyc6IFwiJ1wiLFxuICAnJiMzOTsnOiBcIidcIixcbiAgJyZxdW90Oyc6ICdcIicsXG4gICcmIzM0Oyc6ICdcIidcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGUoZXMpIHtcbiAgcmV0dXJuIHJlcGxhY2UuY2FsbChlcywgY2EsIHBlKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmVzY2FwZSh1bikge1xuICByZXR1cm4gcmVwbGFjZS5jYWxsKHVuLCBlcywgY2FwZSk7XG59O1xuXG5mdW5jdGlvbiBwZShtKSB7XG4gIHJldHVybiBlc2NhW21dO1xufVxuXG5mdW5jdGlvbiBjYXBlKG0pIHtcbiAgcmV0dXJuIHVuZXNbbV07XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItY29uc3QgKi9cbnZhciBERUZBVUxUX0RPVF9TWU1CT0wgPSAnLic7XG52YXIgREVGQVVMVF9TTEFTSF9TWU1CT0wgPSAnLyc7XG52YXIgREVGQVVMVF9EQVNIX1NZTUJPTCA9ICctJztcbnZhciBERUZBVUxUX0hJRERFTl9TVEFSVCA9IDU7XG52YXIgREVGQVVMVF9ISURERU5fRU5EID0gMTM7XG52YXIgREVGQVVMVF9ISURERU5fU1lNQk9MID0gJyonO1xudmFyIERFRkFVTFRfSElEREVOX1NUQVRFID0gZmFsc2U7XG52YXIgREVGQVVMVF9FU0NBUEVfU1RBVEUgPSBmYWxzZTtcbi8qKlxyXG4gKiBNZXJnZSBjdXN0b20gb3B0aW9ucyB0byB0aGUgZGVmYXVsdCBvbmVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NucGpGb3JtYXR0aW5nT3B0aW9uc30gb3B0aW9uc1xyXG4gKiBAcmV0dXJuIHtDbnBqRm9ybWF0dGluZ09wdGlvbnN9XHJcbiAqL1xuXG5mdW5jdGlvbiBtZXJnZU9wdGlvbnMoKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgdmFyIF9vcHRpb25zJGRlbGltaXRlcnMgPSBvcHRpb25zLmRlbGltaXRlcnM7XG4gIF9vcHRpb25zJGRlbGltaXRlcnMgPSBfb3B0aW9ucyRkZWxpbWl0ZXJzID09PSB2b2lkIDAgPyB7fSA6IF9vcHRpb25zJGRlbGltaXRlcnM7XG4gIHZhciBfb3B0aW9ucyRkZWxpbWl0ZXJzJGQgPSBfb3B0aW9ucyRkZWxpbWl0ZXJzLmRvdCxcbiAgICAgIGRvdCA9IF9vcHRpb25zJGRlbGltaXRlcnMkZCA9PT0gdm9pZCAwID8gREVGQVVMVF9ET1RfU1lNQk9MIDogX29wdGlvbnMkZGVsaW1pdGVycyRkLFxuICAgICAgX29wdGlvbnMkZGVsaW1pdGVycyRzID0gX29wdGlvbnMkZGVsaW1pdGVycy5zbGFzaCxcbiAgICAgIHNsYXNoID0gX29wdGlvbnMkZGVsaW1pdGVycyRzID09PSB2b2lkIDAgPyBERUZBVUxUX1NMQVNIX1NZTUJPTCA6IF9vcHRpb25zJGRlbGltaXRlcnMkcyxcbiAgICAgIF9vcHRpb25zJGRlbGltaXRlcnMkZDIgPSBfb3B0aW9ucyRkZWxpbWl0ZXJzLmRhc2gsXG4gICAgICBkYXNoID0gX29wdGlvbnMkZGVsaW1pdGVycyRkMiA9PT0gdm9pZCAwID8gREVGQVVMVF9EQVNIX1NZTUJPTCA6IF9vcHRpb25zJGRlbGltaXRlcnMkZDIsXG4gICAgICBfb3B0aW9ucyRoaWRkZW5SYW5nZSA9IG9wdGlvbnMuaGlkZGVuUmFuZ2U7XG4gIF9vcHRpb25zJGhpZGRlblJhbmdlID0gX29wdGlvbnMkaGlkZGVuUmFuZ2UgPT09IHZvaWQgMCA/IHt9IDogX29wdGlvbnMkaGlkZGVuUmFuZ2U7XG4gIHZhciBfb3B0aW9ucyRoaWRkZW5SYW5nZSQgPSBfb3B0aW9ucyRoaWRkZW5SYW5nZS5zdGFydCxcbiAgICAgIHN0YXJ0ID0gX29wdGlvbnMkaGlkZGVuUmFuZ2UkID09PSB2b2lkIDAgPyBERUZBVUxUX0hJRERFTl9TVEFSVCA6IF9vcHRpb25zJGhpZGRlblJhbmdlJCxcbiAgICAgIF9vcHRpb25zJGhpZGRlblJhbmdlJDIgPSBfb3B0aW9ucyRoaWRkZW5SYW5nZS5lbmQsXG4gICAgICBlbmQgPSBfb3B0aW9ucyRoaWRkZW5SYW5nZSQyID09PSB2b2lkIDAgPyBERUZBVUxUX0hJRERFTl9FTkQgOiBfb3B0aW9ucyRoaWRkZW5SYW5nZSQyLFxuICAgICAgX29wdGlvbnMkaGlkZGVuU3ltYm9sID0gb3B0aW9ucy5oaWRkZW5TeW1ib2wsXG4gICAgICBoaWRkZW5TeW1ib2wgPSBfb3B0aW9ucyRoaWRkZW5TeW1ib2wgPT09IHZvaWQgMCA/IERFRkFVTFRfSElEREVOX1NZTUJPTCA6IF9vcHRpb25zJGhpZGRlblN5bWJvbCxcbiAgICAgIF9vcHRpb25zJGhpZGRlbiA9IG9wdGlvbnMuaGlkZGVuLFxuICAgICAgaGlkZGVuID0gX29wdGlvbnMkaGlkZGVuID09PSB2b2lkIDAgPyBERUZBVUxUX0hJRERFTl9TVEFURSA6IF9vcHRpb25zJGhpZGRlbixcbiAgICAgIF9vcHRpb25zJGVzY2FwZSA9IG9wdGlvbnMuZXNjYXBlLFxuICAgICAgZXNjYXBlID0gX29wdGlvbnMkZXNjYXBlID09PSB2b2lkIDAgPyBERUZBVUxUX0VTQ0FQRV9TVEFURSA6IF9vcHRpb25zJGVzY2FwZSxcbiAgICAgIF9vcHRpb25zJG9uRmFpbCA9IG9wdGlvbnMub25GYWlsLFxuICAgICAgb25GYWlsID0gX29wdGlvbnMkb25GYWlsID09PSB2b2lkIDAgPyBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0gOiBfb3B0aW9ucyRvbkZhaWw7XG5cbiAgaWYgKGhpZGRlbikge1xuICAgIGlmIChpc05hTihzdGFydCkgfHwgc3RhcnQgPCAwIHx8IHN0YXJ0ID4gMTMpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09wdGlvbiBcImhpZGRlblJhbmdlLnN0YXJ0XCIgbXVzdCBiZSBhIG51bWJlciBiZXR3ZWVuIDAgYW5kIDEzLicpO1xuICAgIH1cblxuICAgIGlmIChpc05hTihlbmQpIHx8IGVuZCA8IDAgfHwgZW5kID4gMTMpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09wdGlvbiBcImhpZGRlblJhbmdlLmVuZFwiIG11c3QgYmUgYSBudW1iZXIgYmV0d2VlbiAwIGFuZCAxMy4nKTtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnQgPiBlbmQpIHtcbiAgICAgIHZhciBhdXggPSBzdGFydDtcbiAgICAgIHN0YXJ0ID0gZW5kO1xuICAgICAgZW5kID0gYXV4O1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2Ygb25GYWlsICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIG9wdGlvbiBcIm9uRmFpbFwiIG11c3QgYmUgYSBjYWxsYmFjayBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZGVsaW1pdGVyczoge1xuICAgICAgZG90OiBkb3QsXG4gICAgICBzbGFzaDogc2xhc2gsXG4gICAgICBkYXNoOiBkYXNoXG4gICAgfSxcbiAgICBoaWRkZW5SYW5nZToge1xuICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgZW5kOiBlbmRcbiAgICB9LFxuICAgIGhpZGRlblN5bWJvbDogaGlkZGVuU3ltYm9sLFxuICAgIGhpZGRlbjogaGlkZGVuLFxuICAgIGVzY2FwZTogZXNjYXBlLFxuICAgIG9uRmFpbDogb25GYWlsXG4gIH07XG59XG5cbnZhciBfZGVmYXVsdCA9IG1lcmdlT3B0aW9ucztcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9udW1Pbmx5ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwibnVtLW9ubHlcIikpO1xuXG52YXIgX2h0bWxFc2NhcGVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiaHRtbC1lc2NhcGVyXCIpKTtcblxudmFyIF9tZXJnZU9wdGlvbnMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL21lcmdlLW9wdGlvbnNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuLyoqXHJcbiAqIFZhbGlkYXRlIGEgZ2l2ZW4gQ05QSiBjaGFyIHNlcXVlbmNlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY25walN0cmluZ1xyXG4gKiBAcGFyYW0ge0NucGpGb3JtYXR0aW5nT3B0aW9uc30gW29wdGlvbnNdXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXG5mdW5jdGlvbiBjbnBqRm10KGNucGpTdHJpbmcpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICB2YXIgQ05QSl9MRU5HVEggPSAxNDtcbiAgdmFyIGNucGpBcnJheSA9ICgwLCBfbnVtT25seVtcImRlZmF1bHRcIl0pKGNucGpTdHJpbmcpLnNwbGl0KCcnKTtcbiAgdmFyIHVzZXJPcHRpb25zID0gKDAsIF9tZXJnZU9wdGlvbnNbXCJkZWZhdWx0XCJdKShvcHRpb25zKTtcblxuICBpZiAoY25wakFycmF5Lmxlbmd0aCAhPT0gQ05QSl9MRU5HVEgpIHtcbiAgICByZXR1cm4gdXNlck9wdGlvbnMub25GYWlsKGNucGpTdHJpbmcpO1xuICB9XG5cbiAgaWYgKHVzZXJPcHRpb25zLmhpZGRlbikge1xuICAgIGZvciAodmFyIGkgPSB1c2VyT3B0aW9ucy5oaWRkZW5SYW5nZS5zdGFydDsgaSA8PSB1c2VyT3B0aW9ucy5oaWRkZW5SYW5nZS5lbmQ7IGkrKykge1xuICAgICAgY25wakFycmF5W2ldID0gdXNlck9wdGlvbnMuaGlkZGVuU3ltYm9sO1xuICAgIH1cbiAgfVxuXG4gIGNucGpBcnJheS5zcGxpY2UoMTIsIDAsIHVzZXJPcHRpb25zLmRlbGltaXRlcnMuZGFzaCk7XG4gIGNucGpBcnJheS5zcGxpY2UoOCwgMCwgdXNlck9wdGlvbnMuZGVsaW1pdGVycy5zbGFzaCk7XG4gIGNucGpBcnJheS5zcGxpY2UoNSwgMCwgdXNlck9wdGlvbnMuZGVsaW1pdGVycy5kb3QpO1xuICBjbnBqQXJyYXkuc3BsaWNlKDIsIDAsIHVzZXJPcHRpb25zLmRlbGltaXRlcnMuZG90KTtcbiAgdmFyIGNucGpQcmV0dHkgPSBjbnBqQXJyYXkuam9pbignJyk7XG5cbiAgaWYgKHVzZXJPcHRpb25zLmVzY2FwZSkge1xuICAgIHJldHVybiBfaHRtbEVzY2FwZXJbXCJkZWZhdWx0XCJdLmVzY2FwZShjbnBqUHJldHR5KTtcbiAgfVxuXG4gIHJldHVybiBjbnBqUHJldHR5O1xufVxuXG52YXIgX2RlZmF1bHQgPSBjbnBqRm10O1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogZXNsaW50LWVudiBub2RlICovXG52YXIgY25wakZtdCA9IHJlcXVpcmUoJy4vY25wai1mbXQnKVtcImRlZmF1bHRcIl07XG5cbm1vZHVsZS5leHBvcnRzID0gY25wakZtdDsgLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHdpdGggRVMgbW9kdWxlIHN5bnRheFxuXG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBjbnBqRm10OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbmZ1bmN0aW9uIG93bktleXMob2JqZWN0LCBlbnVtZXJhYmxlT25seSkgeyB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpOyBpZiAoZW51bWVyYWJsZU9ubHkpIHsgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyB9IGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTsgfSByZXR1cm4ga2V5czsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTsgaWYgKGkgJSAyKSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSksIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTsgfSk7IH0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMpIHsgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhzb3VyY2UpKTsgfSBlbHNlIHsgb3duS2V5cyhPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpOyB9KTsgfSB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIERFRkFVTFRfT1BUSU9OUyA9IHtcbiAgZm9ybWF0OiBmYWxzZSxcbiAgcHJlZml4OiAnJ1xufTtcbi8qKlxyXG4gKiBNZXJnZSBjdXN0b20gb3B0aW9ucyB0byB0aGUgZGVmYXVsdCBvbmVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NucGpHZW5lcmF0b3JPcHRpb25zfSBvcHRpb25zXHJcbiAqIEByZXR1cm4ge0NucGpHZW5lcmF0b3JPcHRpb25zfVxyXG4gKi9cblxuZnVuY3Rpb24gbWVyZ2VPcHRpb25zKG9wdGlvbnMpIHtcbiAgcmV0dXJuIF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7fSwgREVGQVVMVF9PUFRJT05TKSwgb3B0aW9ucyk7XG59XG5cbnZhciBfZGVmYXVsdCA9IG1lcmdlT3B0aW9ucztcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikgeyByZXR1cm4gX2FycmF5V2l0aG91dEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF9ub25JdGVyYWJsZVNwcmVhZCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikgeyBpZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyW1N5bWJvbC5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShhcnIpOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSB2ZXJpZmllciBkaWdpdCBiYXNlZCBvbiBDTlBKIGJhc2UgbnVtZXJpYyBzZXF1ZW5jZS5cclxuICpcclxuICogQHBhcmFtIHtudW1iZXJbXX0gY25walNlcXVlbmNlXHJcbiAqIEByZXR1cm4ge251bWJlcn1cclxuICovXG5mdW5jdGlvbiBjYWxjdWxhdGVEaWdpdChjbnBqU2VxdWVuY2UpIHtcbiAgdmFyIGluZGV4ID0gMjtcblxuICB2YXIgc3VtID0gX3RvQ29uc3VtYWJsZUFycmF5KGNucGpTZXF1ZW5jZSkucmV2ZXJzZSgpLnJlZHVjZShmdW5jdGlvbiAocHJldmlvdXNSZXN1bHQsIG51bWJlcikge1xuICAgIHZhciByZXN1bHQgPSBwcmV2aW91c1Jlc3VsdCArIG51bWJlciAqIGluZGV4O1xuICAgIGluZGV4ID0gaW5kZXggPT09IDkgPyAyIDogaW5kZXggKyAxO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sIDApO1xuXG4gIHZhciByZW1haW5kZXIgPSBzdW0gJSAxMTtcbiAgcmV0dXJuIHJlbWFpbmRlciA8IDIgPyAwIDogMTEgLSByZW1haW5kZXI7XG59XG5cbnZhciBfZGVmYXVsdCA9IGNhbGN1bGF0ZURpZ2l0O1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG4vKipcclxuICogR2VuZXJhdGUgYW4gYXJyYXkgb2YgcmFuZG9tIG51bWJlcnMgKGFzIHN0cmluZykgYmV0d2VlbiAwIGFuZCAgOS5cclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxyXG4gKiBAcmV0dXJuIHtudW1iZXJbXX1cclxuICovXG5mdW5jdGlvbiBudW1iZXJHZW5lcmF0b3IobGVuZ3RoKSB7XG4gIHZhciBudW1lcmljU2VxdWVuY2UgPSBbXTtcblxuICB3aGlsZSAobnVtZXJpY1NlcXVlbmNlLmxlbmd0aCA8IGxlbmd0aCkge1xuICAgIHZhciByYW5kb20gPSBNYXRoLnJhbmRvbSgpICogMTA7XG4gICAgdmFyIGludGVnZXIgPSBNYXRoLmZsb29yKHJhbmRvbSk7XG4gICAgbnVtZXJpY1NlcXVlbmNlLnB1c2goaW50ZWdlcik7XG4gIH1cblxuICByZXR1cm4gbnVtZXJpY1NlcXVlbmNlO1xufVxuXG52YXIgX2RlZmF1bHQgPSBudW1iZXJHZW5lcmF0b3I7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfbnVtT25seSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIm51bS1vbmx5XCIpKTtcblxudmFyIF9jbnBqRm10ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGxhY3Vzc29mdC9jbnBqLWZtdFwiKSk7XG5cbnZhciBfbWVyZ2VPcHRpb25zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9tZXJnZS1vcHRpb25zXCIpKTtcblxudmFyIF9jYWxjdWxhdGVEaWdpdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vY2FsY3VsYXRlLWRpZ2l0XCIpKTtcblxudmFyIF9udW1iZXJHZW5lcmF0b3IgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL251bWJlci1nZW5lcmF0b3JcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuLyoqXHJcbiAqIEdlbmVyYXRlIGEgdmFsaWQgQ05QSiAoQnJhemlsaWFuIGVtcGxveWVyIElEKSBudW1lcmljIHNlcXVlbmNlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NucGpHZW5lcmF0b3JPcHRpb25zfSBbb3B0aW9uc11cclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cbmZ1bmN0aW9uIGNucGpHZW4oKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgdmFyIHVzZXJPcHRpb25zID0gKDAsIF9tZXJnZU9wdGlvbnNbXCJkZWZhdWx0XCJdKShvcHRpb25zKTtcbiAgdmFyIGJhc2VTZXF1ZW5jZSA9ICgwLCBfbnVtT25seVtcImRlZmF1bHRcIl0pKHVzZXJPcHRpb25zLnByZWZpeCk7XG4gIHZhciBwcmVmaXhMZW5ndGggPSBiYXNlU2VxdWVuY2UubGVuZ3RoO1xuXG4gIGlmIChwcmVmaXhMZW5ndGggPCAwIHx8IHByZWZpeExlbmd0aCA+IDEyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdPcHRpb24gXCJwcmVmaXhcIiBtdXN0IGJlIGEgc3RyaW5nIGNvbnRhaW5pbmcgYmV0d2VlbiAxIGFuZCAxMiBkaWdpdHMuJyk7XG4gIH1cblxuICBpZiAocHJlZml4TGVuZ3RoID4gOCAmJiBiYXNlU2VxdWVuY2Uuc2xpY2UoOCkgPT09ICcwMDAwJykge1xuICAgIHRocm93IG5ldyBFcnJvcignVGhlIGJyYW5jaCBJRCAoY2hhcmFjdGVycyA4IHRvIDExKSBjYW5ub3QgYmUgXCIwMDAwXCIuJyk7XG4gIH1cblxuICB2YXIgYnJhbmNoSUQgPSBcIjAwMFwiLmNvbmNhdChNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDkpKTtcbiAgdmFyIGNucGpTZXF1ZW5jZSA9IGJhc2VTZXF1ZW5jZS5zcGxpdCgnJykubWFwKE51bWJlcikuY29uY2F0KCgwLCBfbnVtYmVyR2VuZXJhdG9yW1wiZGVmYXVsdFwiXSkoOCAtIHByZWZpeExlbmd0aCkpLmNvbmNhdChicmFuY2hJRC5zbGljZSgwLCAxMiAtIHByZWZpeExlbmd0aCkuc3BsaXQoJycpKTtcbiAgY25walNlcXVlbmNlLnB1c2goKDAsIF9jYWxjdWxhdGVEaWdpdFtcImRlZmF1bHRcIl0pKGNucGpTZXF1ZW5jZSkpO1xuICBjbnBqU2VxdWVuY2UucHVzaCgoMCwgX2NhbGN1bGF0ZURpZ2l0W1wiZGVmYXVsdFwiXSkoY25walNlcXVlbmNlKSk7XG4gIHJldHVybiB1c2VyT3B0aW9ucy5mb3JtYXQgPyAoMCwgX2NucGpGbXRbXCJkZWZhdWx0XCJdKShjbnBqU2VxdWVuY2Uuam9pbignJykpIDogY25walNlcXVlbmNlLmpvaW4oJycpO1xufVxuXG52YXIgX2RlZmF1bHQgPSBjbnBqR2VuO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogZXNsaW50LWVudiBub2RlICovXG52YXIgY25wakdlbiA9IHJlcXVpcmUoJy4vY25wai1nZW4nKVtcImRlZmF1bHRcIl07XG5cbm1vZHVsZS5leHBvcnRzID0gY25wakdlbjsgLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHdpdGggRVMgbW9kdWxlIHN5bnRheFxuXG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBjbnBqR2VuOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5cbnZhciBfY25wakdlbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBsYWN1c3NvZnQvY25wai1nZW5cIikpO1xuXG52YXIgX251bU9ubHkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJudW0tb25seVwiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfVxuXG4vKipcclxuICogVmFsaWRhdGUgYSBnaXZlbiBDTlBKIChCcmF6aWxpYW4gZW1wbG95ZXIgSUQpIGNoYXIgc2VxdWVuY2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbnBqU3RyaW5nXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqL1xuZnVuY3Rpb24gY25walZhbChjbnBqU3RyaW5nKSB7XG4gIHZhciBDTlBKX0xFTkdUSCA9IDE0O1xuICB2YXIgY25wakRpZ2l0cyA9ICgwLCBfbnVtT25seVtcImRlZmF1bHRcIl0pKGNucGpTdHJpbmcpO1xuXG4gIGlmIChjbnBqRGlnaXRzLmxlbmd0aCAhPT0gQ05QSl9MRU5HVEgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gY25wakRpZ2l0cyA9PT0gKDAsIF9jbnBqR2VuW1wiZGVmYXVsdFwiXSkoe1xuICAgIHByZWZpeDogY25wakRpZ2l0cy5zbGljZSgwLCAxMilcbiAgfSk7XG59XG5cbnZhciBfZGVmYXVsdCA9IGNucGpWYWw7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBlc2xpbnQtZW52IG5vZGUgKi9cbnZhciBjbnBqVmFsID0gcmVxdWlyZSgnLi9jbnBqLXZhbCcpW1wiZGVmYXVsdFwiXTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbnBqVmFsOyAvLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgd2l0aCBFUyBtb2R1bGUgc3ludGF4XG5cbm1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGNucGpWYWw7Il0sIm5hbWVzIjpbInJlcGxhY2UiLCJjYSIsImVzIiwiZXNjYSIsInVuZXMiLCJlc2NhcGUiLCJjYWxsIiwicGUiLCJ1bmVzY2FwZSIsInVuIiwiY2FwZSIsIm0iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwiZXhwb3J0cyIsIkRFRkFVTFRfRE9UX1NZTUJPTCIsIkRFRkFVTFRfU0xBU0hfU1lNQk9MIiwiREVGQVVMVF9EQVNIX1NZTUJPTCIsIkRFRkFVTFRfSElEREVOX1NUQVJUIiwiREVGQVVMVF9ISURERU5fRU5EIiwiREVGQVVMVF9ISURERU5fU1lNQk9MIiwiREVGQVVMVF9ISURERU5fU1RBVEUiLCJERUZBVUxUX0VTQ0FQRV9TVEFURSIsIm1lcmdlT3B0aW9ucyIsIm9wdGlvbnMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJfb3B0aW9ucyRkZWxpbWl0ZXJzIiwiZGVsaW1pdGVycyIsIl9vcHRpb25zJGRlbGltaXRlcnMkZCIsImRvdCIsIl9vcHRpb25zJGRlbGltaXRlcnMkcyIsInNsYXNoIiwiX29wdGlvbnMkZGVsaW1pdGVycyRkMiIsImRhc2giLCJfb3B0aW9ucyRoaWRkZW5SYW5nZSIsImhpZGRlblJhbmdlIiwiX29wdGlvbnMkaGlkZGVuUmFuZ2UkIiwic3RhcnQiLCJfb3B0aW9ucyRoaWRkZW5SYW5nZSQyIiwiZW5kIiwiX29wdGlvbnMkaGlkZGVuU3ltYm9sIiwiaGlkZGVuU3ltYm9sIiwiX29wdGlvbnMkaGlkZGVuIiwiaGlkZGVuIiwiX29wdGlvbnMkZXNjYXBlIiwiX29wdGlvbnMkb25GYWlsIiwib25GYWlsIiwiaXNOYU4iLCJUeXBlRXJyb3IiLCJhdXgiLCJfZGVmYXVsdCIsIl9udW1Pbmx5IiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUkJDAiLCJfaHRtbEVzY2FwZXIiLCJyZXF1aXJlJCQxIiwiX21lcmdlT3B0aW9ucyIsInJlcXVpcmUkJDIiLCJvYmoiLCJfX2VzTW9kdWxlIiwiY25wakZtdCIsImNucGpTdHJpbmciLCJDTlBKX0xFTkdUSCIsImNucGpBcnJheSIsInNwbGl0IiwidXNlck9wdGlvbnMiLCJpIiwic3BsaWNlIiwiY25walByZXR0eSIsImpvaW4iLCJtb2R1bGUiLCJvd25LZXlzIiwib2JqZWN0IiwiZW51bWVyYWJsZU9ubHkiLCJrZXlzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwic3ltYm9scyIsImZpbHRlciIsInN5bSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJwdXNoIiwiYXBwbHkiLCJfb2JqZWN0U3ByZWFkIiwidGFyZ2V0Iiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJERUZBVUxUX09QVElPTlMiLCJmb3JtYXQiLCJwcmVmaXgiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJhcnIiLCJfYXJyYXlXaXRob3V0SG9sZXMiLCJfaXRlcmFibGVUb0FycmF5IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwiX25vbkl0ZXJhYmxlU3ByZWFkIiwibyIsIm1pbkxlbiIsIl9hcnJheUxpa2VUb0FycmF5IiwibiIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJBcnJheSIsImZyb20iLCJ0ZXN0IiwiaXRlciIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiaXNBcnJheSIsImxlbiIsImFycjIiLCJjYWxjdWxhdGVEaWdpdCIsImNucGpTZXF1ZW5jZSIsImluZGV4Iiwic3VtIiwicmV2ZXJzZSIsInJlZHVjZSIsInByZXZpb3VzUmVzdWx0IiwibnVtYmVyIiwicmVzdWx0IiwicmVtYWluZGVyIiwibnVtYmVyR2VuZXJhdG9yIiwibnVtZXJpY1NlcXVlbmNlIiwicmFuZG9tIiwiTWF0aCIsImludGVnZXIiLCJmbG9vciIsIl9jbnBqRm10IiwiX2NhbGN1bGF0ZURpZ2l0IiwicmVxdWlyZSQkMyIsIl9udW1iZXJHZW5lcmF0b3IiLCJyZXF1aXJlJCQ0IiwiY25wakdlbiIsImJhc2VTZXF1ZW5jZSIsInByZWZpeExlbmd0aCIsIkVycm9yIiwiYnJhbmNoSUQiLCJjb25jYXQiLCJjZWlsIiwibWFwIiwiTnVtYmVyIiwiX2NucGpHZW4iLCJjbnBqVmFsIiwiY25wakRpZ2l0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBQUE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBRUEsSUFBSUEsT0FBTyxHQUFHLEdBQUdBLE9BQWpCO0NBRUEsSUFBSUMsRUFBRSxHQUFHLFVBQVQ7Q0FDQSxJQUFJQyxFQUFFLEdBQUcsZ0RBQVQ7Q0FFQSxJQUFJQyxJQUFJLEdBQUc7Q0FDVCxPQUFLLE9BREk7Q0FF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
