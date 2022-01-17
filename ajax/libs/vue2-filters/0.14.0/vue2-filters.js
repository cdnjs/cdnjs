(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var string_namespaceObject = {};
__webpack_require__.r(string_namespaceObject);
__webpack_require__.d(string_namespaceObject, "capitalize", function() { return string_capitalize; });
__webpack_require__.d(string_namespaceObject, "uppercase", function() { return string_uppercase; });
__webpack_require__.d(string_namespaceObject, "lowercase", function() { return string_lowercase; });
__webpack_require__.d(string_namespaceObject, "placeholder", function() { return string_placeholder; });
__webpack_require__.d(string_namespaceObject, "truncate", function() { return string_truncate; });
__webpack_require__.d(string_namespaceObject, "repeat", function() { return string_repeat; });
__webpack_require__.d(string_namespaceObject, "wrap", function() { return string_wrap; });
__webpack_require__.d(string_namespaceObject, "reverse", function() { return string_reverse; });
var array_namespaceObject = {};
__webpack_require__.r(array_namespaceObject);
__webpack_require__.d(array_namespaceObject, "limitBy", function() { return array_limitBy; });
__webpack_require__.d(array_namespaceObject, "filterBy", function() { return array_filterBy; });
__webpack_require__.d(array_namespaceObject, "orderBy", function() { return array_orderBy; });
__webpack_require__.d(array_namespaceObject, "find", function() { return array_find; });
var other_namespaceObject = {};
__webpack_require__.r(other_namespaceObject);
__webpack_require__.d(other_namespaceObject, "currency", function() { return other_currency; });
__webpack_require__.d(other_namespaceObject, "bytes", function() { return other_bytes; });
__webpack_require__.d(other_namespaceObject, "pluralize", function() { return other_pluralize; });
__webpack_require__.d(other_namespaceObject, "ordinal", function() { return other_ordinal; });
__webpack_require__.d(other_namespaceObject, "number", function() { return other_number; });
__webpack_require__.d(other_namespaceObject, "percent", function() { return other_percent; });

// CONCATENATED MODULE: ./src/util/index.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ArrayProto = Array.prototype,
    ObjProto = Object.prototype;
var slice = ArrayProto.slice,
    util_toString = ObjProto.toString;
var util = {};

util.isArray = function (obj) {
  return Array.isArray(obj);
};

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

util.isArrayLike = function (obj) {
  if (_typeof(obj) !== 'object' || !obj) {
    return false;
  }

  var length = obj.length;
  return typeof length === 'number' && length % 1 === 0 && length >= 0 && length <= MAX_ARRAY_INDEX;
};

util.isObject = function (obj) {
  var type = _typeof(obj);

  return type === 'function' || type === 'object' && !!obj;
};

util.each = function (obj, callback) {
  var i, len;

  if (util.isArray(obj)) {
    for (i = 0, len = obj.length; i < len; i++) {
      if (callback(obj[i], i, obj) === false) {
        break;
      }
    }
  } else {
    for (i in obj) {
      if (callback(obj[i], i, obj) === false) {
        break;
      }
    }
  }

  return obj;
};

util.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function (name) {
  util['is' + name] = function (obj) {
    return util_toString.call(obj) === '[object ' + name + ']';
  };
});

util.toArray = function (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);

  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
};

util.toNumber = function (value) {
  if (typeof value !== 'string') {
    return value;
  } else {
    var parsed = Number(value);
    return isNaN(parsed) ? value : parsed;
  }
};

util.convertRangeToArray = function (range) {
  return _toConsumableArray(Array(range + 1).keys()).slice(1);
};

util.convertArray = function (value) {
  if (util.isArray(value)) {
    return value;
  } else if (util.isPlainObject(value)) {
    // convert plain object to array.
    var keys = Object.keys(value);
    var i = keys.length;
    var res = new Array(i);
    var key;

    while (i--) {
      key = keys[i];
      res[i] = {
        $key: key,
        $value: value[key]
      };
    }

    return res;
  } else {
    return value || [];
  }
};

function multiIndex(obj, is) {
  // obj,['1','2','3'] -> ((obj['1'])['2'])['3']
  return is.length ? multiIndex(obj[is[0]], is.slice(1)) : obj;
}

util.getPath = function (obj, is) {
  // obj,'1.2.3' -> multiIndex(obj,['1','2','3'])
  return multiIndex(obj, is.split('.'));
};
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 *
 * @param {*} obj
 * @return {Boolean}
 */


var util_toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';

util.isPlainObject = function (obj) {
  return util_toString.call(obj) === OBJECT_STRING;
};

util.exist = function (value) {
  return value !== null && typeof value !== 'undefined';
};

/* harmony default export */ var src_util = (util);
// CONCATENATED MODULE: ./src/string/capitalize.js
/**
 *  Converts a string into Capitalize
 * 
 * 'abc' => 'Abc'
 * 
 * @param {Object} options
 */
function capitalize(value, options) {
  var globalOptions = this && this.capitalize ? this.capitalize : {};
  options = options || globalOptions;
  var onlyFirstLetter = options.onlyFirstLetter != null ? options.onlyFirstLetter : false;
  if (!value && value !== 0) return '';

  if (onlyFirstLetter === true) {
    return value.toString().charAt(0).toUpperCase() + value.toString().slice(1);
  } else {
    value = value.toString().toLowerCase().split(' ');
    return value.map(function (item) {
      return item.charAt(0).toUpperCase() + item.slice(1);
    }).join(' ');
  }
}

/* harmony default export */ var string_capitalize = (capitalize);
// CONCATENATED MODULE: ./src/string/uppercase.js
/**
 * Converts a string to UPPERCASE
 * 
 * 'abc' => 'ABC'
 */
function uppercase(value) {
  return value || value === 0 ? value.toString().toUpperCase() : '';
}

/* harmony default export */ var string_uppercase = (uppercase);
// CONCATENATED MODULE: ./src/string/lowercase.js
/**
 * Converts a string to lowercase
 * 
 * 'AbC' => 'abc'
 */
function lowercase(value) {
  return value || value === 0 ? value.toString().toLowerCase() : '';
}

/* harmony default export */ var string_lowercase = (lowercase);
// CONCATENATED MODULE: ./src/string/placeholder.js
/**
 *  If the value is missing outputs the placeholder text
 * 
 * '' => {placeholder}
 * 'foo' => 'foo'
 */
function placeholder(input, property) {
  return input === undefined || input === '' || input === null ? property : input;
}

/* harmony default export */ var string_placeholder = (placeholder);
// CONCATENATED MODULE: ./src/string/truncate.js
/**
 *  Truncate at the given || default length
 *
 * 'lorem ipsum dolor' => 'lorem ipsum dol...'
 */
function truncate(value, length) {
  length = length || 15;
  if (!value || typeof value !== 'string') return '';
  if (value.length <= length) return value;
  return value.substring(0, length) + '...';
}

/* harmony default export */ var string_truncate = (truncate);
// CONCATENATED MODULE: ./src/string/repeat.js
/**
 * Repeats a given value an x amount of times
 *
 * @author Bastiaan Jansen
 * @param {string | number} value to repeat
 * @param {number} amount
 * @returns repeated string
 */
var repeat = function repeat(value) {
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return amount ? value.toString().repeat(amount) : '';
};

/* harmony default export */ var string_repeat = (repeat);
// CONCATENATED MODULE: ./src/string/wrap.js
/**
 * Wraps a string or number with a string
 *
 * @author Bastiaan Jansen
 * @param {string | number} value to wrap
 * @param {string | number} wrap wrap string
 * @returns wrapped string
 */
var wrap = function wrap(value, _wrap) {
  return [_wrap, value, _wrap].join("");
};

/* harmony default export */ var string_wrap = (wrap);
// CONCATENATED MODULE: ./src/string/reverse.js
/**
 * Reverses a string
 *
 * @author Bastiaan Jansen
 * @param {string} value
 * @returns reversed string
 */
var reverse = function reverse(value) {
  return Array.from(value).reverse().join("");
};

/* harmony default export */ var string_reverse = (reverse);
// CONCATENATED MODULE: ./src/string/index.js









// CONCATENATED MODULE: ./src/array/limitBy.js

/**
 * Limit filter for arrays
 *
 * @param {Number|Array} arr (If Number, decimal expected)
 * @param {Number} n
 * @param {Number} offset (Decimal expected)
 */

function limitBy(arr, n, offset) {
  arr = src_util.isArray(arr) ? arr : src_util.convertRangeToArray(arr);
  offset = offset ? parseInt(offset, 10) : 0;
  n = src_util.toNumber(n);
  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
}

/* harmony default export */ var array_limitBy = (limitBy);
// CONCATENATED MODULE: ./src/array/filterBy.js

/**
 * Filter filter for arrays
 *
 * @param {Array} arr
 * @param {String} prop
 * @param {String|Number} search
 */

function filterBy(arr, search) {
  var arr = src_util.convertArray(arr);

  if (search == null) {
    return arr;
  }

  if (typeof search === 'function') {
    return arr.filter(search);
  } // cast to lowercase string


  search = ('' + search).toLowerCase();
  var n = 2; // extract and flatten keys

  var keys = Array.prototype.concat.apply([], src_util.toArray(arguments, n));
  var res = [];
  var item, key, val, j;

  for (var i = 0, l = arr.length; i < l; i++) {
    item = arr[i];
    val = item && item.$value || item;
    j = keys.length;

    if (j) {
      while (j--) {
        key = keys[j];

        if (key === '$key' && contains(item.$key, search) || contains(src_util.getPath(val, key), search)) {
          res.push(item);
          break;
        }
      }
    } else if (contains(item, search)) {
      res.push(item);
    }
  }

  return res;
}

function contains(val, search) {
  var i;

  if (src_util.isPlainObject(val)) {
    var keys = Object.keys(val);
    i = keys.length;

    while (i--) {
      if (contains(val[keys[i]], search)) {
        return true;
      }
    }
  } else if (src_util.isArray(val)) {
    i = val.length;

    while (i--) {
      if (contains(val[i], search)) {
        return true;
      }
    }
  } else if (val != null) {
    return val.toString().toLowerCase().indexOf(search) > -1;
  }
}

/* harmony default export */ var array_filterBy = (filterBy);
// CONCATENATED MODULE: ./src/array/orderBy.js

/**
 * Filter filter for arrays
 *
 * @param {String|Array<String>|Function} ...sortKeys
 * @param {Number} [order]
 */

function orderBy(arr) {
  var _comparator = null;
  var sortKeys;
  arr = src_util.convertArray(arr); // determine order (last argument)

  var args = src_util.toArray(arguments, 1);
  var order = args[args.length - 1];

  if (typeof order === 'number') {
    order = order < 0 ? -1 : 1;
    args = args.length > 1 ? args.slice(0, -1) : args;
  } else {
    order = 1;
  } // determine sortKeys & comparator


  var firstArg = args[0];

  if (!firstArg) {
    return arr;
  } else if (typeof firstArg === 'function') {
    // custom comparator
    _comparator = function comparator(a, b) {
      return firstArg(a, b) * order;
    };
  } else {
    // string keys. flatten first
    sortKeys = Array.prototype.concat.apply([], args);

    _comparator = function comparator(a, b, i) {
      i = i || 0;
      return i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || _comparator(a, b, i + 1);
    };
  }

  function baseCompare(a, b, sortKeyIndex) {
    var sortKey = sortKeys[sortKeyIndex];

    if (sortKey) {
      if (sortKey !== '$key') {
        if (src_util.isObject(a) && '$value' in a) a = a.$value;
        if (src_util.isObject(b) && '$value' in b) b = b.$value;
      }

      a = src_util.isObject(a) ? src_util.getPath(a, sortKey) : a;
      b = src_util.isObject(b) ? src_util.getPath(b, sortKey) : b;
      a = typeof a === 'string' ? a.toLowerCase() : a;
      b = typeof b === 'string' ? b.toLowerCase() : b;
    }

    return a === b ? 0 : a > b ? order : -order;
  } // sort on a copy to avoid mutating original array


  return arr.slice().sort(_comparator);
}

/* harmony default export */ var array_orderBy = (orderBy);
// CONCATENATED MODULE: ./src/array/find.js

/**
 * Get first matching element from a filtered array
 *
 * @param {Array} arr
 * @param {String|Number} search
 * @returns {mixed}
 */

function find(arr, search) {
  var array = array_filterBy.apply(this, arguments);
  array.splice(1);
  return array;
}

/* harmony default export */ var array_find = (find);
// CONCATENATED MODULE: ./src/array/index.js





// CONCATENATED MODULE: ./src/other/currency.js

/**
 * 
 * 12345 => $12,345.00
 *
 * @param {String} symbol
 * @param {Number} decimals Decimal places
 * @param {Object} options
 */

function currency(value, symbol, decimals, options) {
  var globalOptions = this && this.currency ? this.currency : {};
  symbol = src_util.exist(symbol) ? symbol : globalOptions.symbol;
  decimals = src_util.exist(decimals) ? decimals : globalOptions.decimalDigits;
  options = options || globalOptions;
  var thousandsSeparator, symbolOnLeft, spaceBetweenAmountAndSymbol, showPlusSign;
  var digitsRE = /(\d{3})(?=\d)/g;
  value = parseFloat(value);
  if (!isFinite(value) || !value && value !== 0) return '';
  symbol = typeof symbol !== 'undefined' ? symbol : '$';
  decimals = typeof decimals !== 'undefined' ? decimals : 2;
  thousandsSeparator = options.thousandsSeparator != null ? options.thousandsSeparator : ',';
  symbolOnLeft = options.symbolOnLeft != null ? options.symbolOnLeft : true;
  spaceBetweenAmountAndSymbol = options.spaceBetweenAmountAndSymbol != null ? options.spaceBetweenAmountAndSymbol : false;
  showPlusSign = options.showPlusSign != null ? options.showPlusSign : false;
  var number = Math.abs(value);
  var stringified = toFixed(number, decimals);
  stringified = options.decimalSeparator ? stringified.replace('.', options.decimalSeparator) : stringified;

  var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;

  var i = _int.length % 3;
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? thousandsSeparator : '') : '';

  var _float = decimals ? stringified.slice(-1 - decimals) : '';

  symbol = spaceBetweenAmountAndSymbol ? symbolOnLeft ? symbol + ' ' : ' ' + symbol : symbol;
  symbol = symbolOnLeft ? symbol + head + _int.slice(i).replace(digitsRE, '$1' + thousandsSeparator) + _float : head + _int.slice(i).replace(digitsRE, '$1' + thousandsSeparator) + _float + symbol;
  var sign = value < 0 ? '-' : '';
  var plusSign = value > 0 && showPlusSign ? '+' : '';
  return plusSign + sign + symbol;
}

function toFixed(num, precision) {
  return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
}

/* harmony default export */ var other_currency = (currency);
// CONCATENATED MODULE: ./src/other/bytes.js

/**
 * 1                => '8 byte'
 * 8                => '8 bytes'
 * 1024             => '1.00 kB'
 * 2000000          => '1.90 MB'
 * 2000000000       => '1.86 GB'
 * 2000000000000    => '1.82 TB'
 *
 * @param {Number} value
 * @param {Number} decimals Decimal places (default: 2)
 */

function bytes(value, decimals) {
  var globalOptions = this && this.bytes ? this.bytes : {};
  decimals = src_util.exist(decimals) ? decimals : globalOptions.decimalDigits;
  decimals = typeof decimals !== 'undefined' ? decimals : 2;
  value = value === null || isNaN(value) ? 0 : value;

  if (value >= Math.pow(1024, 4)) {
    // TB
    return "".concat((value / Math.pow(1024, 4)).toFixed(decimals), " TB");
  } else if (value >= Math.pow(1024, 3)) {
    // GB
    return "".concat((value / Math.pow(1024, 3)).toFixed(decimals), " GB");
  } else if (value >= Math.pow(1024, 2)) {
    // MB
    return "".concat((value / Math.pow(1024, 2)).toFixed(decimals), " MB");
  } else if (value >= 1024) {
    // kb
    return "".concat((value / 1024).toFixed(decimals), " kB");
  } // byte


  return value === 1 ? "".concat(value, " byte") : "".concat(value, " bytes");
}

/* harmony default export */ var other_bytes = (bytes);
// CONCATENATED MODULE: ./src/other/pluralize.js

/**
 * 'item' => 'items'
 *
 * @param {String|Array} word
 * @param {Object} options
 *
 */

function pluralize(value, word, options) {
  var globalOptions = this && this.pluralize ? this.pluralize : {};
  options = options || globalOptions;
  var output = '';
  var includeNumber = options.includeNumber != null ? options.includeNumber : false;
  if (includeNumber === true) output += value + ' ';
  if (!value && value !== 0 || !word) return output;

  if (Array.isArray(word)) {
    output += word[value - 1] || word[word.length - 1];
  } else {
    output += word + (value === 1 ? '' : 's');
  }

  return output;
}

/* harmony default export */ var other_pluralize = (pluralize);
// CONCATENATED MODULE: ./src/other/ordinal.js

/**
 * 42 => 'nd'
 *
 * @params {Object} options
 * 
 */

function ordinal(value, options) {
  var globalOptions = this && this.ordinal ? this.ordinal : {};
  options = options || globalOptions;
  var output = '';
  var includeNumber = options.includeNumber != null ? options.includeNumber : false;
  if (includeNumber === true) output += value;
  var j = value % 10,
      k = value % 100;
  if (j == 1 && k != 11) output += 'st';else if (j == 2 && k != 12) output += 'nd';else if (j == 3 && k != 13) output += 'rd';else output += 'th';
  return output;
}

/* harmony default export */ var other_ordinal = (ordinal);
// CONCATENATED MODULE: ./src/other/number.js

/**
 * 123456 => '123,456'
 *
 * @params {Object} options
 *
 */

function number_number(value, format, options) {
  var globalOptions = this && this.number ? this.number : {};
  format = src_util.exist(format) ? format : globalOptions.format;
  options = options || globalOptions;
  var config = parseFormat(format);
  var number = parseNumber(value);
  var thousandsSeparator = options.thousandsSeparator != null ? options.thousandsSeparator : ',';
  var decimalSeparator = options.decimalSeparator != null ? options.decimalSeparator : '.';
  config.sign = config.sign || number.sign;

  if (config.unit) {
    var numberWithUnit = addUnit(number.float, config);
    return config.sign + numberWithUnit;
  }

  var rounded = number_toFixed(number.float, config.decimals);
  var output = addSeparators(rounded, config.base, thousandsSeparator, decimalSeparator);
  return config.sign + output;
}

Math.sign = function (x) {
  x = +x;

  if (x === 0 || isNaN(x)) {
    return x;
  }

  return x > 0 ? 1 : -1;
};

function parseNumber(num) {
  return {
    float: Math.abs(parseFloat(num)),
    int: Math.abs(parseInt(num)),
    sign: Math.sign(num) < 0 ? '-' : ''
  };
}

function parseFormat() {
  var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0';
  var regex = /([\+\-])?([0-9\,]+)?([\.0-9]+)?([a\s]+)?/;
  var matches = string ? string.match(regex) : ['', '', '', '', ''];
  var float = matches[3];
  var decimals = float ? float.match(/0/g).length : 0;
  return {
    sign: matches[1] || '',
    base: matches[2] || '',
    decimals: decimals,
    unit: matches[4] || ''
  };
}

function addUnit(num, config) {
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var si = [{
    value: 1,
    symbol: ''
  }, {
    value: 1e3,
    symbol: 'K'
  }, {
    value: 1e6,
    symbol: 'M'
  }, {
    value: 1e9,
    symbol: 'B'
  }, {
    value: 1e12,
    symbol: 'T'
  }];
  var i;

  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }

  num = (num / si[i].value).toFixed(config.decimals).replace(rx, '$1');
  return num + config.unit.replace('a', si[i].symbol);
}

function addSeparators(num, base, thousandsSeparator, decimalSeparator) {
  var regex = /(\d+)(\d{3})/;
  var string = num.toString();
  var x = string.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? decimalSeparator + x[1] : '';

  switch (base) {
    case '':
      x1 = '';
      break;

    case '0,0':
      while (regex.test(x1)) {
        x1 = x1.replace(regex, '$1' + thousandsSeparator + '$2');
      }

      break;
  }

  return x1 + x2;
}

function getFraction(num, decimals, separator) {
  var fraction = number_toFixed(num, decimals).toString().split('.')[1];
  return fraction ? separator + fraction : '';
}

function number_toFixed(num, precision) {
  return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
}

/* harmony default export */ var other_number = (number_number);
// CONCATENATED MODULE: ./src/other/percent.js

/**
 * 1.2              => '120%'
 * -0.2             => '-20%'
 * 100              => '10000%'
 * 1                => '100%'
 * 0.97             => '97%'
 *
 * @param {Number} value
 * @param {Number} decimals Decimal places (default: 2)
 * @param {Number} multiplier (default: 100)
 * @params {Object} options
 */

function percent(value, decimals, multiplier, options) {
  var globalOptions = this && this.percent ? this.percent : {};
  options = options || globalOptions;
  multiplier = src_util.exist(multiplier) ? multiplier : globalOptions.multiplier;
  multiplier = typeof multiplier !== 'undefined' ? multiplier : 100;
  decimals = src_util.exist(decimals) ? decimals : globalOptions.decimalDigits;
  decimals = typeof decimals !== 'undefined' ? decimals : 0;
  var decimalSeparator = options.decimalSeparator != null ? options.decimalSeparator : '.';
  value = value === null || isNaN(value) ? 0 : value;
  return "".concat((value * multiplier).toFixed(decimals).replace('.', decimalSeparator), "%");
}

/* harmony default export */ var other_percent = (percent);
// CONCATENATED MODULE: ./src/other/index.js







// CONCATENATED MODULE: ./src/index.js
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Vue2Filters = {
  install: function install(Vue, options) {
    src_util.each(string_namespaceObject, function (value, key) {
      Vue.filter(key, value.bind(options));
    });
    src_util.each(other_namespaceObject, function (value, key) {
      Vue.filter(key, value.bind(options));
    });
  },
  mixin: {
    methods: _objectSpread({}, array_namespaceObject)
  }
};
/* harmony default export */ var src = __webpack_exports__["default"] = (Vue2Filters);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vue2Filters);
  window.Vue2Filters = Vue2Filters;
}

/***/ })
/******/ ]);
});