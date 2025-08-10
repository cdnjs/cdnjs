/*! cnpj-utils v1.0.0 | (c) 2020 by Julio L. Muller */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cnpjUtils"] = factory();
	else
		root["cnpjUtils"] = factory();
})(window, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 984:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "format": function() { return /* binding */ format; },
/* harmony export */   "generate": function() { return /* binding */ generate; },
/* harmony export */   "isValid": function() { return /* binding */ isValid; }
/* harmony export */ });
/* harmony import */ var _lacussoft_cnpj_fmt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(979);
/* harmony import */ var _lacussoft_cnpj_fmt__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lacussoft_cnpj_fmt__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lacussoft_cnpj_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(801);
/* harmony import */ var _lacussoft_cnpj_gen__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lacussoft_cnpj_gen__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lacussoft_cnpj_val__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(105);
/* harmony import */ var _lacussoft_cnpj_val__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lacussoft_cnpj_val__WEBPACK_IMPORTED_MODULE_2__);



var format = (_lacussoft_cnpj_fmt__WEBPACK_IMPORTED_MODULE_0___default());
var generate = (_lacussoft_cnpj_gen__WEBPACK_IMPORTED_MODULE_1___default());
var isValid = (_lacussoft_cnpj_val__WEBPACK_IMPORTED_MODULE_2___default());
/* harmony default export */ __webpack_exports__["default"] = ({
  format: format,
  generate: generate,
  isValid: isValid
});

/***/ }),

/***/ 586:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-env node */
var cnpjUtils = __webpack_require__(984);

module.exports = cnpjUtils;

/***/ }),

/***/ 863:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "escape": function() { return /* binding */ escape; },
/* harmony export */   "unescape": function() { return /* binding */ unescape; }
/* harmony export */ });
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
};

function unescape(un) {
  return replace.call(un, es, cape);
};

function pe(m) {
  return esca[m];
}

function cape(m) {
  return unes[m];
}


/***/ }),

/***/ 341:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


/* eslint-env node */
var numOnly = __webpack_require__(479)/* .default */ .Z;

module.exports = numOnly; // Allow use of default import with ES module syntax

module.exports.default = numOnly;

/***/ }),

/***/ 479:
/***/ (function(__unused_webpack_module, exports) {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
exports.Z = void 0;

var numOnly = function numOnly(target) {
  return String(target).replace(/\D/g, '');
};

var _default = numOnly;
exports.Z = _default;

/***/ }),

/***/ 950:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
exports.Z = void 0;

var _numOnly = _interopRequireDefault(__webpack_require__(341));

var _htmlEscaper = _interopRequireDefault(__webpack_require__(863));

var _mergeOptions = _interopRequireDefault(__webpack_require__(547));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
exports.Z = _default;

/***/ }),

/***/ 979:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


/* eslint-env node */
var cnpjFmt = __webpack_require__(950)/* .default */ .Z;

module.exports = cnpjFmt; // Allow use of default import with ES module syntax

module.exports.default = cnpjFmt;

/***/ }),

/***/ 547:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

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
exports.default = _default;

/***/ }),

/***/ 69:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
exports.default = _default;

/***/ }),

/***/ 377:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
exports.Z = void 0;

var _numOnly = _interopRequireDefault(__webpack_require__(341));

var _cnpjFmt = _interopRequireDefault(__webpack_require__(979));

var _mergeOptions = _interopRequireDefault(__webpack_require__(592));

var _calculateDigit = _interopRequireDefault(__webpack_require__(69));

var _numberGenerator = _interopRequireDefault(__webpack_require__(228));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
exports.Z = _default;

/***/ }),

/***/ 801:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


/* eslint-env node */
var cnpjGen = __webpack_require__(377)/* .default */ .Z;

module.exports = cnpjGen; // Allow use of default import with ES module syntax

module.exports.default = cnpjGen;

/***/ }),

/***/ 592:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
exports.default = _default;

/***/ }),

/***/ 228:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

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
exports.default = _default;

/***/ }),

/***/ 869:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
exports.Z = void 0;

var _cnpjGen = _interopRequireDefault(__webpack_require__(801));

var _numOnly = _interopRequireDefault(__webpack_require__(341));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
exports.Z = _default;

/***/ }),

/***/ 105:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


/* eslint-env node */
var cnpjVal = __webpack_require__(869)/* .default */ .Z;

module.exports = cnpjVal; // Allow use of default import with ES module syntax

module.exports.default = cnpjVal;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(586);
/******/ 	__webpack_exports__ = __webpack_exports__.default;
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});