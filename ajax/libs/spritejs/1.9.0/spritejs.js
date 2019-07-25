(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["spritejs"] = factory();
	else
		root["spritejs"] = factory();
})(this, function() {
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
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 138);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.0' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var ctx = __webpack_require__(15);
var hide = __webpack_require__(19);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(150);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(21);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(76)('wks');
var uid = __webpack_require__(53);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(63);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(89);
var isBuffer = __webpack_require__(225);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(12);
var IE8_DOM_DEFINE = __webpack_require__(98);
var toPrimitive = __webpack_require__(78);
var dP = Object.defineProperty;

exports.f = __webpack_require__(13) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLinearGradients = exports.copyContext = exports.createPath = exports.appendUnit = exports.getTextSize = exports.rectVertices = exports.rectToBox = exports.boxUnion = exports.boxEqual = exports.boxToRect = exports.boxIntersect = exports.parseStringTransform = exports.fourValuesShortCut = exports.parseColorString = exports.parseStringFloat = exports.parseStringInt = exports.oneOrTwoValues = exports.parseColor = undefined;

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = __webpack_require__(11);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _decorators = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Color = function () {
  function Color(color) {
    (0, _classCallCheck3.default)(this, Color);

    if (typeof color === 'string') {
      var canvas = document.createElement('canvas'),
          context = canvas.getContext('2d');

      context.fillStyle = color;
      context.fillRect(0, 0, 1, 1);
      var data = context.getImageData(0, 0, 1, 1).data;

      this.red = data[0];
      this.green = data[1];
      this.blue = data[2];
      this.alpha = data[3] / 255;
    } else {
      this.red = Math.round(color.red);
      this.green = Math.round(color.green);
      this.blue = Math.round(color.blue);
      this.alpha = color.alpha != null ? color.alpha : 1;
    }
  }

  (0, _createClass3.default)(Color, [{
    key: 'toString',
    value: function toString() {
      var red = this.red,
          green = this.green,
          blue = this.blue,
          alpha = this.alpha;

      return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
    }
  }, {
    key: 'str',
    get: function get() {
      return String(this);
    }
  }]);
  return Color;
}();

var parseColor = (0, _decorators.memoize)(function (color) {
  return new Color(color);
});

function parseColorString(color) {
  return parseColor(color).toString();
}

function parseStringTransform(str) {
  if (typeof str !== 'string') return str;

  var rules = str.match(/((?:scale|rotate|translate|skew|matrix)\([^()]+\))/g);
  var ret = {};
  if (rules) {
    rules.forEach(function (rule) {
      var matched = rule.match(/(scale|rotate|translate|skew|matrix)\(([^()]+)\)/);
      if (matched) {
        var _matched = (0, _slicedToArray3.default)(matched, 3),
            r = _matched[0],
            m = _matched[1],
            v = _matched[2];

        if (m === 'rotate') {
          ret[m] = parseStringFloat(v)[0];
        } else {
          ret[m] = parseStringFloat(v);
        }
      }
    });
  }

  return ret;
}

function parseValuesString(str) {
  var isInt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (typeof str === 'string') {
    var values = str.split(/[\s,]+/g);
    return values.map(function (v) {
      return isInt ? parseInt(v, 10) : parseFloat(v);
    });
  }
  return str;
}

function parseStringInt(str) {
  return parseValuesString(str, true);
}

function parseStringFloat(str) {
  return parseValuesString(str, false);
}

function oneOrTwoValues(val) {
  if (!Array.isArray(val)) {
    return [val, val];
  } else if (val.length === 1) {
    return [val[0], val[0]];
  }
  return val;
}

function fourValuesShortCut(val) {
  if (!Array.isArray(val)) {
    return [val, val, val, val];
  } else if (val.length === 1) {
    return [val[0], val[0], val[0], val[0]];
  } else if (val.length === 2) {
    return [val[0], val[1], val[0], val[1]];
  }
  return [].concat((0, _toConsumableArray3.default)(val), [0, 0, 0, 0]).slice(0, 4);
}

function boxIntersect(box1, box2) {
  // left, top, right, buttom
  var _ref = [box1[0], box1[1], box1[2], box1[3]],
      l1 = _ref[0],
      t1 = _ref[1],
      r1 = _ref[2],
      b1 = _ref[3],
      _ref2 = [box2[0], box2[1], box2[2], box2[3]],
      l2 = _ref2[0],
      t2 = _ref2[1],
      r2 = _ref2[2],
      b2 = _ref2[3];


  var t = Math.max(t1, t2),
      r = Math.min(r1, r2),
      b = Math.min(b1, b2),
      l = Math.max(l1, l2);

  if (b >= t && r >= l) {
    return [l, t, r, b];
  }
  return null;
}

function boxToRect(box) {
  return [box[0], box[1], Math.round(box[2] - box[0]), Math.round(box[3] - box[1])];
}

function boxEqual(box1, box2) {
  return box1[0] === box2[0] && box1[1] === box2[1] && box1[2] === box2[2] && box1[3] === box2[3];
}

function rectToBox(rect) {
  return [rect[0], rect[1], Math.round(rect[0] + rect[2]), Math.round(rect[1] + rect[3])];
}

function rectVertices(rect) {
  var _rectToBox = rectToBox(rect),
      _rectToBox2 = (0, _slicedToArray3.default)(_rectToBox, 4),
      x1 = _rectToBox2[0],
      y1 = _rectToBox2[1],
      x2 = _rectToBox2[2],
      y2 = _rectToBox2[3];

  return [[x1, y1], [x2, y1], [x2, y2], [x1, y2]];
}

function boxUnion(box1, box2) {
  if (!box1) return box2;
  if (!box2) return box1;

  return [Math.min(box1[0], box2[0]), Math.min(box1[1], box2[1]), Math.max(box1[2], box2[2]), Math.max(box1[3], box2[3])];
}

var getTextSize = (0, _decorators.memoize)(function (text, font) {
  var lineHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var tmpEl = document.createElement('font');

  if (font) tmpEl.style.font = font;

  if (!isNaN(lineHeight)) {
    lineHeight += 'px';
  }

  (0, _assign2.default)(tmpEl.style, {
    position: 'absolute',
    left: 0,
    top: 0,
    visibility: 'hidden',
    display: 'inline-block',
    lineHeight: lineHeight,
    padding: '0',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap'
  });

  tmpEl.innerHTML = text;
  document.documentElement.appendChild(tmpEl);
  var size = [tmpEl.clientWidth, tmpEl.clientHeight];

  tmpEl.style.lineHeight = '';
  size.push(tmpEl.clientHeight);

  document.documentElement.removeChild(tmpEl);

  return size;
});

function appendUnit(value) {
  var defaultUnit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'px';

  if (typeof value === 'string' && isNaN(value)) {
    return value;
  }
  return value + defaultUnit;
}

// get svg path object
function createPath(d) {
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);

  return path;
}

function gradientBox(angle, rect) {
  var _rect = (0, _slicedToArray3.default)(rect, 4),
      x = _rect[0],
      y = _rect[1],
      w = _rect[2],
      h = _rect[3];

  angle %= 360;
  if (angle < 0) {
    angle += 360;
  }

  if (angle >= 0 && angle < 90) {
    var tan = Math.tan(Math.PI * angle / 180);

    var d = tan * w;

    if (d <= h) {
      return [x, y, x + w, y + d];
    }
    d = h / tan;
    return [x, y, x + d, y + h];
  } else if (angle >= 90 && angle < 180) {
    var _tan = Math.tan(Math.PI * (angle - 90) / 180);

    var _d = _tan * h;

    if (_d <= w) {
      return [x + w, y, x + w - _d, y + h];
    }
    _d = w / _tan;
    return [x + w, y, x, y + _d];
  } else if (angle >= 180 && angle < 270) {
    var _tan2 = Math.tan(Math.PI * (angle - 180) / 180);

    var _d2 = _tan2 * w;

    if (_d2 <= h) {
      return [x + w, y + h, x, y + h - _d2];
    }
    _d2 = h / _tan2;
    return [x + w, y + h, x + w - _d2, y];
  } else if (angle >= 270 && angle < 360) {
    var _tan3 = Math.tan(Math.PI * (angle - 270) / 180);

    var _d3 = _tan3 * h;

    if (_d3 <= w) {
      return [x, y + h, x + _d3, y];
    }
    _d3 = w / _tan3;
    return [x, y + h, x + w, y + h - _d3];
  }

  return [x, y, x + w, y + h];
}

function copyContext(context) {
  var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');

  canvas.width = context.canvas.width;
  canvas.height = context.canvas.height;

  ctx.drawImage(context.canvas, 0, 0);

  return ctx;
}

function getLinearGradients(context, rect, linearGradients) {
  var colors = linearGradients.colors,
      direction = linearGradients.direction || 0,
      _rect2 = (0, _slicedToArray3.default)(rect, 4),
      x = _rect2[0],
      y = _rect2[1],
      w = _rect2[2],
      h = _rect2[3];

  var _gradientBox = gradientBox(direction, [x, y, w, h]),
      _gradientBox2 = (0, _slicedToArray3.default)(_gradientBox, 4),
      x0 = _gradientBox2[0],
      y0 = _gradientBox2[1],
      x1 = _gradientBox2[2],
      y1 = _gradientBox2[3];

  var gradient = context.createLinearGradient(x0, y0, x1, y1);

  colors.forEach(function (o) {
    gradient.addColorStop(o.offset, o.color);
  });

  return gradient;
}

exports.parseColor = parseColor;
exports.oneOrTwoValues = oneOrTwoValues;
exports.parseStringInt = parseStringInt;
exports.parseStringFloat = parseStringFloat;
exports.parseColorString = parseColorString;
exports.fourValuesShortCut = fourValuesShortCut;
exports.parseStringTransform = parseStringTransform;
exports.boxIntersect = boxIntersect;
exports.boxToRect = boxToRect;
exports.boxEqual = boxEqual;
exports.boxUnion = boxUnion;
exports.rectToBox = rectToBox;
exports.rectVertices = rectVertices;
exports.getTextSize = getTextSize;
exports.appendUnit = appendUnit;
exports.createPath = createPath;
exports.copyContext = copyContext;
exports.getLinearGradients = getLinearGradients;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(174), __esModule: true };

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(149);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(26)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(68);
var defined = __webpack_require__(65);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(37);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(163), __esModule: true };

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(169), __esModule: true };

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var createDesc = __webpack_require__(41);
module.exports = __webpack_require__(13) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(62);

var _stringify2 = _interopRequireDefault(_stringify);

exports.attr = attr;
exports.readonly = readonly;
exports.parseValue = parseValue;
exports.memoize = memoize;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deepEqual = __webpack_require__(222);

/**
  attr
  attr('repaint')
 */
function attr() {
  var repaint = void 0;

  function decorator(target, prop, descriptor) {
    descriptor.enumerable = true;

    var setter = descriptor.set,
        getter = descriptor.get;

    descriptor.set = function (val) {
      var subject = this.subject || this,
          oldVal = this.get(prop);

      setter.call(this, val);

      var newVal = this.get(prop);

      if (!deepEqual(newVal, oldVal)) {
        if (repaint === 'repaint') {
          subject.cache = null;
        }

        subject.forceUpdate();
      }

      if (subject.attributeChangedCallback) {
        subject.attributeChangedCallback(prop, newVal, oldVal, this);
      }
    };

    return descriptor;
  }

  if (arguments.length === 1) {
    repaint = arguments.length <= 0 ? undefined : arguments[0];
    return decorator;
  }
  return decorator.apply(undefined, arguments);
}

function readonly(target, prop, descriptor) {
  descriptor.enumerable = true;
}

function parseValue() {
  for (var _len = arguments.length, parsers = Array(_len), _key = 0; _key < _len; _key++) {
    parsers[_key] = arguments[_key];
  }

  return function (target, prop, descriptor) {
    var setter = descriptor.set;

    descriptor.set = function (val) {
      val = parsers.reduce(function (v, parser) {
        return parser(v);
      }, val);

      setter.call(this, val);
    };

    return descriptor;
  };
}

// export function defaultValue(val){
//   return function(target, prop, descriptor){
//     const getter = descriptor.get

//     descriptor.get = function () {
//       const ret = getter.call(this)
//       return ret != null ? ret : val
//     }

//     return descriptor
//   }
// }

// functional decorators

function memoize(fn) {
  var serializer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _stringify2.default;

  var cache = {};
  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var key = serializer(args);
    if (!(key in cache)) {
      cache[key] = fn.apply(this, args);
    }

    return cache[key];
  };
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(159), __esModule: true };

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(166), __esModule: true };

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(18);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(31);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(154);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(151);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(45);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(45);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(105);
var enumBugKeys = __webpack_require__(67);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(193)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(69)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(162), __esModule: true };

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(167), __esModule: true };

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(65);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(198);
var global = __webpack_require__(3);
var hide = __webpack_require__(19);
var Iterators = __webpack_require__(32);
var TO_STRING_TAG = __webpack_require__(4)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(11);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = __webpack_require__(156);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _typeof2 = __webpack_require__(45);

var _typeof3 = _interopRequireDefault(_typeof2);

var _set = __webpack_require__(92);

var _set2 = _interopRequireDefault(_set);

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty4 = __webpack_require__(63);

var _defineProperty5 = _interopRequireDefault(_defineProperty4);

var _entries = __webpack_require__(22);

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = __webpack_require__(21);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getOwnPropertyDescriptors = __webpack_require__(152);

var _getOwnPropertyDescriptors2 = _interopRequireDefault(_getOwnPropertyDescriptors);

var _getPrototypeOf = __webpack_require__(18);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(25);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(23);

var _get3 = _interopRequireDefault(_get2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(24);

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = __webpack_require__(10);

var _symbol2 = _interopRequireDefault(_symbol);

var _class, _temp;

var _attr12 = __webpack_require__(136);

var _attr13 = _interopRequireDefault(_attr12);

var _basenode = __webpack_require__(90);

var _basenode2 = _interopRequireDefault(_basenode);

var _matrix = __webpack_require__(61);

var _matrix2 = _interopRequireDefault(_matrix);

var _vector = __webpack_require__(145);

var _vector2 = _interopRequireDefault(_vector);

var _animation = __webpack_require__(135);

var _animation2 = _interopRequireDefault(_animation);

var _utils = __webpack_require__(9);

var _decorators = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _attr = (0, _symbol2.default)('attr'),
    _eventHandlers = (0, _symbol2.default)('eventHandlers'),
    _animations = (0, _symbol2.default)('animations'),
    _context = (0, _symbol2.default)('context'),
    _renderers = (0, _symbol2.default)('renderers'),
    _paths = (0, _symbol2.default)('paths');

var BaseSprite = (_temp = _class = function (_BaseNode) {
  (0, _inherits3.default)(BaseSprite, _BaseNode);
  (0, _createClass3.default)(BaseSprite, null, [{
    key: 'defineAttributes',
    value: function defineAttributes(attrs) {
      var SubAttr = function (_Attr) {
        (0, _inherits3.default)(SubAttr, _Attr);

        function SubAttr() {
          (0, _classCallCheck3.default)(this, SubAttr);
          return (0, _possibleConstructorReturn3.default)(this, (SubAttr.__proto__ || (0, _getPrototypeOf2.default)(SubAttr)).apply(this, arguments));
        }

        return SubAttr;
      }(this.Attr);
      var descriptors = (0, _getOwnPropertyDescriptors2.default)(attrs);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(descriptors)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;

          var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

          var prop = _ref2[0];
          var descriptor = _ref2[1];

          (0, _defineProperty5.default)(SubAttr.prototype, prop, (0, _decorators.attr)(SubAttr.prototype, prop, descriptor));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.Attr = SubAttr;
    }

    /**
      new Sprite({
        attr: {
          ...
        },
        attributeChangedCallback: function(prop, oldValue, newValue){
         }
      })
     */

  }]);

  function BaseSprite() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { attr: {} };
    (0, _classCallCheck3.default)(this, BaseSprite);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BaseSprite.__proto__ || (0, _getPrototypeOf2.default)(BaseSprite)).call(this));

    _this[_attr] = new _this.constructor.Attr(_this);

    _this.attr(opts.attr);
    delete opts.attr;
    (0, _assign2.default)(_this, opts);
    _this[_eventHandlers] = {};
    _this[_animations] = new _set2.default();
    _this[_context] = null;
    _this[_renderers] = [];
    _this[_paths] = [];
    return _this;
  }

  (0, _createClass3.default)(BaseSprite, [{
    key: 'initAttributes',
    value: function initAttributes(attrs) {
      this[_attr].merge(attrs);
    }

    // create and save path

  }, {
    key: 'createPath',
    value: function createPath() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var path = new (Function.prototype.bind.apply(Path2D, [null].concat(args)))();
      this[_paths].push(path);
      return path;
    }
  }, {
    key: 'findPath',
    value: function findPath(offsetX, offsetY) {
      var context = this.context;

      if (context) {
        var paths = this[_paths].filter(function (path) {
          return context.isPointInPath(path, offsetX, offsetY);
        });
        return paths;
      }
      return [];
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      var nodeType = this.nodeType,
          attrs = this[_attr].serialize(),
          id = this.id;

      return {
        nodeType: nodeType,
        attrs: attrs,
        id: id
      };
    }
  }, {
    key: 'cloneNode',
    value: function cloneNode() {
      var node = new this.constructor();
      node.initAttributes(this[_attr].serialize());
      return node;
    }
  }, {
    key: 'getAttribute',
    value: function getAttribute(prop) {
      return this.attr(prop);
    }
  }, {
    key: 'setAttribute',
    value: function setAttribute(prop, val) {
      return this.attr(prop, val);
    }
  }, {
    key: 'removeAttribute',
    value: function removeAttribute(prop) {
      return this.attr(prop, null);
    }
  }, {
    key: 'attr',
    value: function attr(props, val) {
      if ((typeof props === 'undefined' ? 'undefined' : (0, _typeof3.default)(props)) === 'object') {
        (0, _assign2.default)(this[_attr], props);
        return this;
      } else if (typeof props === 'string') {
        if (val !== undefined) {
          (0, _assign2.default)(this[_attr], (0, _defineProperty3.default)({}, props, val));
          return this;
        }
        return this[_attr][props];
      }
      var ret = {};
      for (var prop in this[_attr]) {
        ret[prop] = this[_attr][prop];
      }
      return ret;
    }
  }, {
    key: 'animate',
    value: function animate(frames, timing) {
      var _this3 = this;

      var animation = new _animation2.default(this, frames, timing);
      if (this.parent) {
        animation.baseTimeline = this.parent.timeline;
        animation.play();
        animation.finished.then(function () {
          _this3[_animations].delete(animation);
        });
      }
      this[_animations].add(animation);
      return animation;
    }
  }, {
    key: 'connect',
    value: function connect(parent, zOrder) {
      var _this4 = this;

      (0, _get3.default)(BaseSprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseSprite.prototype), 'connect', this).call(this, parent, zOrder);

      var _loop = function _loop(animation) {
        animation.baseTimeline = parent.timeline;
        animation.play();
        animation.finished.then(function () {
          _this4[_animations].delete(animation);
        });
      };

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(this[_animations]), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var animation = _step2.value;

          _loop(animation);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: 'disconnect',
    value: function disconnect(parent) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = (0, _getIterator3.default)(this[_animations]), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var animation = _step3.value;

          animation.cancel();
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      (0, _get3.default)(BaseSprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseSprite.prototype), 'disconnect', this).call(this, parent);
    }

    // content width / height

  }, {
    key: 'OBBCollision',


    // OBB: http://blog.csdn.net/silangquan/article/details/50812425
    value: function OBBCollision(sprite) {
      var _vertices = (0, _slicedToArray3.default)(this.vertices, 4),
          p11 = _vertices[0],
          p12 = _vertices[1],
          p13 = _vertices[2],
          p14 = _vertices[3],
          _sprite$vertices = (0, _slicedToArray3.default)(sprite.vertices, 4),
          p21 = _sprite$vertices[0],
          p22 = _sprite$vertices[1],
          p23 = _sprite$vertices[2],
          p24 = _sprite$vertices[3];

      var a1 = new _vector2.default(p12, p11).unit(),
          a2 = new _vector2.default(p13, p12).unit(),
          a3 = new _vector2.default(p22, p21).unit(),
          a4 = new _vector2.default(p23, p22).unit();

      // The projection of the axis of a vertex in a certain direction
      function verticesProjection(vertices, axis) {
        var _vertices$map = vertices.map(function (v) {
          return axis.dot(new _vector2.default(v));
        }),
            _vertices$map2 = (0, _slicedToArray3.default)(_vertices$map, 4),
            p1 = _vertices$map2[0],
            p2 = _vertices$map2[1],
            p3 = _vertices$map2[2],
            p4 = _vertices$map2[3];

        return [Math.min(p1, p2, p3, p4), Math.max(p1, p2, p3, p4)];
      }

      function projectionIntersect(p1, p2) {
        var m1 = (p1[0] + p1[1]) / 2,
            l1 = Math.abs(p1[1] - p1[0]),
            m2 = (p2[0] + p2[1]) / 2,
            l2 = Math.abs(p2[1] - p2[0]);

        return Math.abs(m2 - m1) <= (l1 + l2) / 2;
      }

      return projectionIntersect(verticesProjection(this.vertices, a1), verticesProjection(sprite.vertices, a1)) && projectionIntersect(verticesProjection(this.vertices, a2), verticesProjection(sprite.vertices, a2)) && projectionIntersect(verticesProjection(this.vertices, a3), verticesProjection(sprite.vertices, a3)) && projectionIntersect(verticesProjection(this.vertices, a4), verticesProjection(sprite.vertices, a4));
    }
  }, {
    key: 'remove',
    value: function remove() {
      if (!this.parent) return false;
      this.parent.removeChild(this);
      return true;
    }
  }, {
    key: 'appendTo',
    value: function appendTo(parent) {
      parent.appendChild(this);
    }
  }, {
    key: 'forceUpdate',
    value: function forceUpdate() {
      var clearCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var parent = this.parent;
      if (parent) {
        if (parent.forceUpdate) {
          parent.forceUpdate(clearCache);
        } else if (parent.update && parent.parent) {
          if (clearCache) {
            this.cache = null;
          }
          if (!this.parent.isDirty(this)) {
            this.parent.update(this);
          }
        }
      }
    }

    /** abstract
      connectedCallback() { }
      disconnectedCallback() { }
      attributeChangedCallback() { }
    */

    // layer position to sprite offset

  }, {
    key: 'pointToOffset',
    value: function pointToOffset(layerX, layerY) {
      var attr = this.attr();
      var dx = layerX - attr.x,
          dy = layerY - attr.y;

      var transform = this.transform;
      return transform.inverse().transformPoint(dx, dy);
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      var layerX = evt.layerX,
          layerY = evt.layerY;

      var _renderRect = (0, _slicedToArray3.default)(this.renderRect, 4),
          x = _renderRect[0],
          y = _renderRect[1],
          w = _renderRect[2],
          h = _renderRect[3];

      if (layerX >= x && layerX - x < w && layerY >= y && layerY - y < h) {
        var _originRect = (0, _slicedToArray3.default)(this.originRect, 4),
            ox = _originRect[0],
            oy = _originRect[1],
            ow = _originRect[2],
            oh = _originRect[3];

        var _pointToOffset = this.pointToOffset(layerX, layerY),
            _pointToOffset2 = (0, _slicedToArray3.default)(_pointToOffset, 2),
            nx = _pointToOffset2[0],
            ny = _pointToOffset2[1];

        if (nx >= ox && nx - ox < ow && ny >= oy && ny - oy < oh) {
          evt.offsetX = nx;
          evt.offsetY = ny;

          return true;
        }
      }
    }
  }, {
    key: 'draw',
    value: function draw(fn) {
      var clearCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var remove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this[_renderers].push({ fn: fn, remove: remove });
      this.forceUpdate(clearCache);
    }
  }, {
    key: 'drawOnce',
    value: function drawOnce(fn) {
      this.draw(fn, true, true);
    }

    // call by layer

  }, {
    key: 'userRender',
    value: function userRender(t, context) {
      var _this5 = this;

      if (this[_renderers].length) {
        var renderType = void 0;
        var renderers = [];

        this[_renderers].forEach(function (renderer) {
          var fn = renderer.fn,
              remove = renderer.remove;

          fn.call(_this5, context, t, renderer);
          if (!remove) {
            renderers.push(renderer);
          }
        });

        this[_renderers] = renderers;
      }
    }
  }, {
    key: 'render',
    value: function render(t) {
      this[_paths] = [];

      var attr = this.attr(),
          bgcolor = attr.bgcolor,
          linearGradients = attr.linearGradients,
          _offsetSize = (0, _slicedToArray3.default)(this.offsetSize, 2),
          offsetWidth = _offsetSize[0],
          offsetHeight = _offsetSize[1],
          _clientSize = (0, _slicedToArray3.default)(this.clientSize, 2),
          clientWidth = _clientSize[0],
          clientHeight = _clientSize[1];


      if (offsetWidth === 0 || offsetHeight === 0) {
        return; // don't need to render
      }

      var box = document.createElement('canvas'),

      // bound = this.boundRect
      bound = this.originRect;

      box.width = bound[2];
      box.height = bound[3];

      var boxctx = box.getContext('2d');

      var _attr$border = (0, _slicedToArray3.default)(attr.border, 2),
          borderWidth = _attr$border[0],
          borderColor = _attr$border[1];

      var borderRadius = attr.borderRadius;

      boxctx.save();

      // draw border
      if (borderWidth || linearGradients && linearGradients.border) {
        boxctx.lineWidth = borderWidth;

        var x = borderWidth / 2,
            y = borderWidth / 2,
            w = offsetWidth - borderWidth,
            h = offsetHeight - borderWidth,
            r = borderRadius;


        boxctx.beginPath();
        boxctx.moveTo(x + r, y);
        boxctx.arcTo(x + w, y, x + w, y + h, r);
        boxctx.arcTo(x + w, y + h, x, y + h, r);
        boxctx.arcTo(x, y + h, x, y, r);
        boxctx.arcTo(x, y, x + w, y, r);
        boxctx.closePath();

        if (linearGradients && linearGradients.border) {
          boxctx.strokeStyle = (0, _utils.getLinearGradients)(boxctx, [x, y, w, h], linearGradients.border);
        } else if (borderColor) {
          boxctx.strokeStyle = borderColor;
        }

        boxctx.stroke();
        boxctx.clip();
      }

      // draw bgcolor
      if (bgcolor || linearGradients && linearGradients.bgcolor) {
        var _ref3 = [borderWidth, borderWidth, clientWidth, clientHeight, Math.max(0, borderRadius - borderWidth / 2)],
            _x5 = _ref3[0],
            _y = _ref3[1],
            _w = _ref3[2],
            _h = _ref3[3],
            _r = _ref3[4];


        boxctx.beginPath();
        boxctx.moveTo(_x5 + _r, _y);
        boxctx.arcTo(_x5 + _w, _y, _x5 + _w, _y + _h, _r);
        boxctx.arcTo(_x5 + _w, _y + _h, _x5, _y + _h, _r);
        boxctx.arcTo(_x5, _y + _h, _x5, _y, _r);
        boxctx.arcTo(_x5, _y, _x5 + _w, _y, _r);
        boxctx.closePath();

        if (linearGradients && linearGradients.bgcolor) {
          boxctx.fillStyle = (0, _utils.getLinearGradients)(boxctx, [_x5, _y, _w, _h], linearGradients.bgcolor);
        } else if (bgcolor) {
          boxctx.fillStyle = bgcolor;
        }

        boxctx.fill();
      }

      boxctx.restore();

      var padding = attr.padding,
          paddingTop = padding[0],
          paddingLeft = padding[3];

      boxctx.translate(paddingTop, paddingLeft);
      this[_context] = boxctx;

      return boxctx;
    }
  }, {
    key: 'context',
    get: function get() {
      return this[_context];
    }
  }, {
    key: 'nodeType',
    get: function get() {
      return this.constructor.nodeType;
    }
  }, {
    key: 'id',
    set: function set(val) {
      this.attr('id', val);
    },
    get: function get() {
      return this.attr('id');
    }
  }, {
    key: 'name',
    set: function set(val) {
      this.attr('name', val);
    },
    get: function get() {
      return this.attr('name');
    }
  }, {
    key: 'transform',
    get: function get() {
      return new _matrix2.default(this[_attr].get('transform'));
    }
  }, {
    key: 'contentSize',
    get: function get() {
      var _attr2 = this.attr('size'),
          _attr3 = (0, _slicedToArray3.default)(_attr2, 2),
          width = _attr3[0],
          height = _attr3[1];

      return [width | 0, height | 0];
    }

    // content + padding

  }, {
    key: 'clientSize',
    get: function get() {
      var _attr4 = this.attr('padding'),
          _attr5 = (0, _slicedToArray3.default)(_attr4, 4),
          top = _attr5[0],
          right = _attr5[1],
          bottom = _attr5[2],
          left = _attr5[3],
          _contentSize = (0, _slicedToArray3.default)(this.contentSize, 2),
          width = _contentSize[0],
          height = _contentSize[1];

      return [left + width + right, top + height + bottom];
    }

    // content + padding + border

  }, {
    key: 'offsetSize',
    get: function get() {
      var _attr6 = this.attr('border'),
          _attr7 = (0, _slicedToArray3.default)(_attr6, 1),
          borderWidth = _attr7[0],
          _clientSize2 = (0, _slicedToArray3.default)(this.clientSize, 2),
          width = _clientSize2[0],
          height = _clientSize2[1];

      return [width + 2 * borderWidth, height + 2 * borderWidth];
    }
  }, {
    key: 'innerSize',
    get: function get() {
      return this.contentSize;
    }
  }, {
    key: 'outerSize',
    get: function get() {
      return this.offsetSize;
    }
  }, {
    key: 'boundRect',
    get: function get() {
      var anchor = this.attr('anchor'),
          transform = this.transform;

      var _offsetSize2 = (0, _slicedToArray3.default)(this.offsetSize, 2),
          width = _offsetSize2[0],
          height = _offsetSize2[1];

      var _anchor = (0, _slicedToArray3.default)(anchor, 2),
          anchorX = _anchor[0],
          anchorY = _anchor[1];

      var vertexs = [[-anchorX * width, -anchorY * height], [(1 - anchorX) * width, -anchorY * height], [-anchorX * width, (1 - anchorY) * height], [(1 - anchorX) * width, (1 - anchorY) * height]];

      var transformed = vertexs.map(function (v) {
        return transform.transformPoint(v[0], v[1]);
      });
      var vx = transformed.map(function (v) {
        return v[0];
      }),
          vy = transformed.map(function (v) {
        return v[1];
      });

      var minX = Math.min.apply(Math, (0, _toConsumableArray3.default)(vx)),
          minY = Math.min.apply(Math, (0, _toConsumableArray3.default)(vy)),
          maxX = Math.max.apply(Math, (0, _toConsumableArray3.default)(vx)),
          maxY = Math.max.apply(Math, (0, _toConsumableArray3.default)(vy));

      return [].concat((0, _toConsumableArray3.default)([minX, minY].map(Math.floor)), (0, _toConsumableArray3.default)([maxX - minX, maxY - minY].map(Math.ceil)));
    }

    // rect before transform

  }, {
    key: 'originRect',
    get: function get() {
      var _offsetSize3 = (0, _slicedToArray3.default)(this.offsetSize, 2),
          width = _offsetSize3[0],
          height = _offsetSize3[1],
          _attr8 = this.attr('anchor'),
          _attr9 = (0, _slicedToArray3.default)(_attr8, 2),
          anchorX = _attr9[0],
          anchorY = _attr9[1];

      return [Math.floor(-anchorX * width), Math.floor(-anchorY * height), width, height];
    }
  }, {
    key: 'originRenderRect',
    get: function get() {
      var bound = this.originRect,
          pos = this.attr('pos');

      return [pos[0] + bound[0], pos[1] + bound[1], bound[2], bound[3]];
    }
  }, {
    key: 'renderBox',
    get: function get() {
      var bound = this.boundRect,
          pos = this.attr('pos');

      return [pos[0] + bound[0] - 1, pos[1] + bound[1] - 1, pos[0] + bound[0] + bound[2] + 1, pos[1] + bound[1] + bound[3] + 1];
    }
  }, {
    key: 'renderRect',
    get: function get() {
      var bound = this.boundRect,
          pos = this.attr('pos');

      return [pos[0] + bound[0], pos[1] + bound[1], bound[2], bound[3]];
    }
  }, {
    key: 'vertices',
    get: function get() {
      var vertices = (0, _utils.rectVertices)(this.originRect),
          transform = this.transform,
          _attr10 = this.attr('pos'),
          _attr11 = (0, _slicedToArray3.default)(_attr10, 2),
          x0 = _attr11[0],
          y0 = _attr11[1];


      return vertices.map(function (v) {
        var _transform$transformP = transform.transformPoint(v[0], v[1]),
            _transform$transformP2 = (0, _slicedToArray3.default)(_transform$transformP, 2),
            x = _transform$transformP2[0],
            y = _transform$transformP2[1];

        return [Math.round(x0 + x), Math.round(y0 + y)];
      });
    }
  }, {
    key: 'cache',
    set: function set(context) {
      this.cacheContext = context;
    },
    get: function get() {
      return this.cacheContext;
    }
  }]);
  return BaseSprite;
}(_basenode2.default), _class.Attr = _attr13.default, _temp);
exports.default = BaseSprite;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(172), __esModule: true };

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(15);
var call = __webpack_require__(101);
var isArrayIter = __webpack_require__(99);
var anObject = __webpack_require__(12);
var toLength = __webpack_require__(52);
var getIterFn = __webpack_require__(82);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(8).f;
var has = __webpack_require__(27);
var TAG = __webpack_require__(4)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timeline = exports.Effects = exports.Easings = exports.Animator = undefined;

var _promise = __webpack_require__(36);

var _promise2 = _interopRequireDefault(_promise);

var _entries = __webpack_require__(22);

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = __webpack_require__(21);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _keys = __webpack_require__(153);

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = __webpack_require__(11);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = __webpack_require__(10);

var _symbol2 = _interopRequireDefault(_symbol);

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

var _utils = __webpack_require__(91);

var _effect2 = __webpack_require__(147);

var _effect3 = _interopRequireDefault(_effect2);

var _spriteTimeline = __webpack_require__(148);

var _spriteTimeline2 = _interopRequireDefault(_spriteTimeline);

var _easing = __webpack_require__(146);

var _easing2 = _interopRequireDefault(_easing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = __webpack_require__(116);

// 计算 offset
function calculateFramesOffset(keyframes) {
  keyframes = keyframes.slice(0);

  var firstFrame = keyframes[0],
      lastFrame = keyframes[keyframes.length - 1];

  lastFrame.offset = lastFrame.offset || 1;
  firstFrame.offset = firstFrame.offset || 0;

  var offset = 0,
      offsetFrom = -1;

  for (var i = 0; i < keyframes.length; i++) {
    var frame = keyframes[i];
    if (frame.offset != null) {
      var dis = i - offsetFrom;
      if (dis > 1) {
        var delta = (frame.offset - offset) / dis;
        for (var j = 0; j < dis - 1; j++) {
          keyframes[offsetFrom + j + 1].offset = offset + delta * (j + 1);
        }
      }
      offset = frame.offset;
      offsetFrom = i;
    }
    if (i > 0) {
      // 如果中间某个属性没有了，需要从前一帧复制过来
      keyframes[i] = (0, _assign2.default)({}, keyframes[i - 1], keyframes[i]);
    }
  }

  return keyframes;
}

var _timing = (0, _symbol2.default)('timing'),
    _keyframes = (0, _symbol2.default)('keyframes'),
    _initState = (0, _symbol2.default)('initState'),
    _readyDefer = (0, _symbol2.default)('readyDefer'),
    _finishedDefer = (0, _symbol2.default)('finishedDefer'),
    _effects = (0, _symbol2.default)('_effects');

/**
  easing: {
    type: 'cubic-bezier',
    value: [...]
  }
  easing: {
    type: 'steps',
    step: 1,
    pos: 'end'
  }
 */
var defaultTiming = {
  delay: 0,
  endDelay: 0,
  fill: 'auto',
  iterations: 1.0,
  playbackRate: 1.0,
  direction: 'normal',
  easing: 'linear',
  effect: null

  /**
    animation: play --> delay --> effect --> endDelay
    playState: idle --> pending --> running --> pending --> finished
   */
};
var Animator = function () {
  function Animator(initState, keyframes, timing) {
    var _this = this;

    (0, _classCallCheck3.default)(this, Animator);

    if (Array.isArray(initState)) {
      var _ref = [initState[0], initState, keyframes];
      // 如果 initState 缺省，默认 keyframes 的第一帧为 initState

      initState = _ref[0];
      keyframes = _ref[1];
      timing = _ref[2];
    }

    if (typeof timing === 'number') {
      timing = { duration: timing };
    }

    this[_timing] = (0, _assign2.default)({}, defaultTiming, timing);

    var easing = this[_timing].easing;
    if (typeof easing === 'string') {
      if (!_easing2.default[easing]) {
        this[_timing].easing = (0, _utils.parseEasingStr)(easing);
      } else {
        this[_timing].easing = _easing2.default[easing];
      }
    } else if (this[_timing].easing.type === 'cubic-bezier') {
      this[_timing].easing = _utils.getBezierEasing.apply(undefined, (0, _toConsumableArray3.default)(easing.value));
    } else if (this[_timing].easing.type === 'steps') {
      this[_timing].easing = (0, _utils.getStepsEasing)(easing.step, easing.pos);
    }

    this[_keyframes] = calculateFramesOffset(keyframes);

    var lastFrame = this[_keyframes][this[_keyframes].length - 1];

    this[_initState] = {}; // 初始状态

    (0, _keys2.default)(lastFrame).forEach(function (key) {
      if (Object.prototype.hasOwnProperty.call(initState, key)) {
        _this[_initState][key] = initState[key];
      }
    });

    if (this[_keyframes][0].offset !== 0) {
      // 要补第一帧
      var startFrame = (0, _assign2.default)({}, this[_initState], { offset: 0 });
      this[_keyframes].unshift(startFrame);
    }
    if (lastFrame.offset < 1) {
      // 要补最后一帧
      var endFrame = (0, _assign2.default)({}, lastFrame, { offset: 1 });
      this[_keyframes].push(endFrame);
    }

    this[_effects] = {};
    this.timeline = null; // idle, no effect
  }

  (0, _createClass3.default)(Animator, [{
    key: 'pause',
    value: function pause() {
      this.timeline.playbackRate = 0;
    }
  }, {
    key: 'play',
    value: function play() {
      var _this2 = this;

      if (this.playState === 'finished') {
        this.cancel();
      }

      if (this.playState === 'idle') {
        var _timing2 = this[_timing],
            delay = _timing2.delay,
            duration = _timing2.duration,
            iterations = _timing2.iterations,
            endDelay = _timing2.endDelay,
            playbackRate = _timing2.playbackRate,
            timeline = _timing2.timeline;

        this.timeline = new _spriteTimeline2.default({
          originTime: delay,
          playbackRate: playbackRate
        }, timeline);

        if (this[_readyDefer] && !this[_readyDefer].timerID) {
          this[_readyDefer].timerID = this.timeline.setTimeout(function () {
            _this2[_readyDefer].resolve();
            assert(_this2.playState === 'running', 'An error occured: ' + _this2.playState);
            delete _this2[_readyDefer];
          }, { entropy: -this.timeline.entropy });
        }

        if (this[_finishedDefer] && !this[_finishedDefer].timerID) {
          this[_finishedDefer].timerID = this.timeline.setTimeout(function () {
            _this2[_finishedDefer].resolve();
          }, { entropy: duration * iterations + endDelay - this.timeline.entropy });
        }
      } else if (this.playState === 'paused') {
        this.timeline.playbackRate = this.playbackRate;
        if (this[_readyDefer] && !this[_readyDefer].timerID) {
          this[_readyDefer].resolve();
          delete this[_readyDefer];
        }
      }
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      if (this[_readyDefer]) {
        if (this.timeline) {
          this.timeline.clearTimeout(this[_readyDefer].timerID);
        }
        delete this[_readyDefer];
      }
      if (this[_finishedDefer]) {
        if (this.timeline) {
          this.timeline.clearTimeout(this[_finishedDefer].timerID);
        }
        delete this[_finishedDefer];
      }
      this.timeline = null;
    }
  }, {
    key: 'finish',
    value: function finish() {
      if (this.playState !== 'idle') {
        this.timeline.entropy = Infinity;
        if (this[_readyDefer]) {
          this.timeline.clearTimeout(this[_readyDefer].timerID);
          delete this[_readyDefer];
        }
        if (this[_finishedDefer]) {
          this.timeline.clearTimeout(this[_finishedDefer].timerID);
          this[_finishedDefer].resolve();
          delete this[_finishedDefer];
        }
      } else {
        if (this[_readyDefer]) {
          delete this[_readyDefer];
        }
        if (this[_finishedDefer]) {
          this[_finishedDefer].resolve();
          delete this[_finishedDefer];
        }
      }
    }
  }, {
    key: 'applyEffects',
    value: function applyEffects(effects) {
      return (0, _assign2.default)(this[_effects], effects);
    }
  }, {
    key: 'playbackRate',
    get: function get() {
      return this[_timing].playbackRate;
    },
    set: function set(rate) {
      if (this.timeline && this.playState !== 'paused') {
        this.timeline.playbackRate = rate;
      }
      this[_timing].playbackRate = rate;
    }
  }, {
    key: 'playState',
    get: function get() {
      var timeline = this.timeline,
          _timing3 = this[_timing],
          iterations = _timing3.iterations,
          duration = _timing3.duration,
          endDelay = _timing3.endDelay;


      if (timeline == null) {
        return 'idle';
      }

      if (timeline.playbackRate === 0) {
        return 'paused';
      }

      if (timeline.entropy < 0) {
        // 开始 pending
        return 'pending';
      }

      var ed = timeline.entropy - iterations * duration;
      if (ed > 0 && ed < endDelay) {
        // 结束 pending
        return 'pending';
      }

      if (ed >= endDelay) {
        return 'finished';
      }

      return 'running';
    }
  }, {
    key: 'progress',
    get: function get() {
      var _timing4 = this[_timing],
          duration = _timing4.duration,
          iterations = _timing4.iterations;

      var timeline = this.timeline,
          entropy = timeline ? timeline.entropy : 0,
          playState = this.playState;

      var p = void 0;

      if (playState === 'idle') {
        p = 0;
      } else if (playState === 'paused' && entropy < 0) {
        p = 0;
      } else if (playState === 'pending') {
        if (entropy < 0) {
          p = 0;
        } else {
          // return periodicity(iterations, 1)
          var time = timeline.seekLocalTime(iterations * duration);
          p = (0, _utils.periodicity)(time, duration) / duration;
        }
      } else if (playState === 'running' || playState === 'paused') {
        p = (0, _utils.periodicity)(timeline.currentTime, duration) / duration;
      }

      if (playState === 'finished') {
        p = (0, _utils.periodicity)(iterations, 1);
      }

      return p;
    }
  }, {
    key: 'frame',
    get: function get() {
      var p = this.progress;

      var playState = this.playState,
          initState = this[_initState],
          _timing5 = this[_timing],
          fill = _timing5.fill,
          direction = _timing5.direction,
          duration = _timing5.duration,
          easing = _timing5.easing,
          effect = _timing5.effect;


      if (playState === 'idle') {
        return initState;
      }

      var entropy = this.timeline.entropy,
          keyframes = this[_keyframes].slice(0);

      var inversed = false;

      if (direction === 'reverse') {
        p = 1 - p;
        inversed = true;
      } else if (direction === 'alternate' || direction === 'alternate-reverse') {
        var period = Math.floor(entropy / duration);

        if (p === 1) period--;
        period = Math.max(0, period);

        if (period % 2 ^ direction === 'alternate-reverse') {
          p = 1 - p;
          inversed = true;
        }
      }

      var ret = {};

      if (entropy < 0 && playState === 'pending') {
        if (fill === 'backwards' || fill === 'both') {
          return inversed ? keyframes[keyframes.length - 1] : keyframes[0];
        }
        return initState;
      }

      if (playState === 'pending' || playState === 'finished') {
        if (fill !== 'forwards' && fill !== 'both') {
          return initState;
        }
      }

      var effects = this[_effects];

      p = easing(p, keyframes);

      for (var i = 1; i < keyframes.length; i++) {
        var frame = keyframes[i],
            offset = frame.offset;

        if (offset >= p || i === keyframes.length - 1) {
          var previousFrame = keyframes[i - 1],
              previousOffset = previousFrame.offset;

          if (effect) {
            ret = effect(previousFrame, frame, p, previousOffset, offset);
          } else {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(frame)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _ref2 = _step.value;

                var _ref3 = (0, _slicedToArray3.default)(_ref2, 2);

                var key = _ref3[0];
                var value = _ref3[1];

                if (key !== 'offset') {
                  var _effect = effects[key] || _effect3.default[key] || _effect3.default.default;

                  var v = _effect(previousFrame[key], value, p, previousOffset, offset);

                  if (v != null) {
                    ret[key] = v;
                  }
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          }
          break;
        }
      }

      return ret;
    }
  }, {
    key: 'baseTimeline',
    set: function set(timeline) {
      this[_timing].timeline = timeline;
    },
    get: function get() {
      return this[_timing].timeline;
    }
  }, {
    key: 'ready',
    get: function get() {
      var _this3 = this;

      if (this[_readyDefer]) {
        return this[_readyDefer].promise;
      }

      if (this.timeline && this.timeline.entropy >= 0) {
        if (this.playState !== 'paused') {
          return _promise2.default.resolve();
        }
        this[_readyDefer] = (0, _utils.defer)();
        return this[_readyDefer].promise;
      }
      this[_readyDefer] = (0, _utils.defer)();

      if (this.timeline) {
        // 已经在 pending 状态
        this[_readyDefer].timerID = this.timeline.setTimeout(function () {
          _this3[_readyDefer].resolve();
          assert(_this3.playState === 'running', 'An error occured: ' + _this3.playState);
          delete _this3[_readyDefer];
        }, { entropy: -this.timeline.entropy });
      }

      return this[_readyDefer].promise;
    }
  }, {
    key: 'finished',
    get: function get() {
      var _this4 = this;

      if (this.playState === 'finished') {
        return _promise2.default.resolve();
      }
      if (!this[_finishedDefer]) {
        this[_finishedDefer] = (0, _utils.defer)();

        var _timing6 = this[_timing],
            duration = _timing6.duration,
            iterations = _timing6.iterations,
            endDelay = _timing6.endDelay;

        if (this.timeline) {
          this[_finishedDefer].timerID = this.timeline.setTimeout(function () {
            _this4[_finishedDefer].resolve();
          }, { entropy: duration * iterations + endDelay - this.timeline.entropy });
        }
      }

      return this[_finishedDefer].promise;
    }
  }]);
  return Animator;
}();

exports.Animator = Animator;
exports.Easings = _easing2.default;
exports.Effects = _effect3.default;
exports.Timeline = _spriteTimeline2.default;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(36);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(155);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(10);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(226);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(38);
var TAG = __webpack_require__(4)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(12);
var dPs = __webpack_require__(188);
var enumBugKeys = __webpack_require__(67);
var IE_PROTO = __webpack_require__(75)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(66)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(97).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(40);
var createDesc = __webpack_require__(41);
var toIObject = __webpack_require__(14);
var toPrimitive = __webpack_require__(78);
var has = __webpack_require__(27);
var IE8_DOM_DEFINE = __webpack_require__(98);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(13) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(77);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 54 */
/***/ (function(module, exports) {



/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get2 = __webpack_require__(23);

var _get3 = _interopRequireDefault(_get2);

var _getOwnPropertyDescriptor = __webpack_require__(31);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getPrototypeOf = __webpack_require__(18);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(25);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(24);

var _inherits3 = _interopRequireDefault(_inherits2);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _desc, _value, _class, _class2, _temp;

var _basesprite = __webpack_require__(35);

var _basesprite2 = _interopRequireDefault(_basesprite);

var _decorators = __webpack_require__(20);

var _utils = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function calculTextboxSize(text, font, lineHeight) {
  var lines = text.split(/\n/);
  var width = 0,
      height = 0;

  lines.forEach(function (line) {
    var _getTextSize = (0, _utils.getTextSize)(line, font, lineHeight),
        _getTextSize2 = (0, _slicedToArray3.default)(_getTextSize, 2),
        w = _getTextSize2[0],
        h = _getTextSize2[1];

    width = Math.max(width, w);
    height += h;
  });

  return [width, height];
}

var LabelSpriteAttr = (_dec = (0, _decorators.attr)('repaint'), _dec2 = (0, _decorators.attr)('repaint'), _dec3 = (0, _decorators.attr)('repaint'), _dec4 = (0, _decorators.attr)('repaint'), _dec5 = (0, _decorators.attr)('repaint'), _dec6 = (0, _decorators.attr)('repaint'), (_class = function (_BaseSprite$Attr) {
  (0, _inherits3.default)(LabelSpriteAttr, _BaseSprite$Attr);

  function LabelSpriteAttr(subject) {
    (0, _classCallCheck3.default)(this, LabelSpriteAttr);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LabelSpriteAttr.__proto__ || (0, _getPrototypeOf2.default)(LabelSpriteAttr)).call(this, subject));

    _this.merge({
      font: '16px Arial',
      textAlign: 'left',
      color: (0, _utils.parseColorString)('black'),
      lineHeight: '',
      renderMode: 'fill',
      text: '',
      textboxSize: [0, 0]
    });
    return _this;
  }

  (0, _createClass3.default)(LabelSpriteAttr, [{
    key: 'text',
    set: function set(val) {
      val = String(val);
      this.set('textboxSize', calculTextboxSize(val, this.font, this.lineHeight));
      this.set('text', val);
    },
    get: function get() {
      return this.get('text');
    }
  }, {
    key: 'textboxSize',
    get: function get() {
      return this.get('textboxSize');
    }
  }, {
    key: 'font',
    set: function set(val) {
      this.set('textboxSize', calculTextboxSize(this.text, val, this.lineHeight));
      this.set('font', val);
    },
    get: function get() {
      return this.get('font');
    }
  }, {
    key: 'lineHeight',
    set: function set(val) {
      this.set('textboxSize', calculTextboxSize(this.text, this.font, val));
      this.set('lineHeight', val);
    },
    get: function get() {
      return this.get('lineHeight');
    }
  }, {
    key: 'textAlign',
    set: function set(val) {
      this.set('textAlign', val);
    },
    get: function get() {
      return this.get('textAlign');
    }
  }, {
    key: 'renderMode',
    set: function set(val) {
      this.set('renderMode', val);
    },
    get: function get() {
      return this.get('renderMode');
    }
  }, {
    key: 'color',
    set: function set(val) {
      this.set('color', (0, _utils.parseColorString)(val));
    },
    get: function get() {
      return this.get('color');
    }
  }]);
  return LabelSpriteAttr;
}(_basesprite2.default.Attr), (_applyDecoratedDescriptor(_class.prototype, 'text', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'text'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'textboxSize', [_decorators.readonly], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'textboxSize'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'font', [_dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'font'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'lineHeight', [_dec3], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'lineHeight'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'textAlign', [_dec4], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'textAlign'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'renderMode', [_dec5], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'renderMode'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'color', [_dec6], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'color'), _class.prototype)), _class));
var Label = (_temp = _class2 = function (_BaseSprite) {
  (0, _inherits3.default)(Label, _BaseSprite);

  function Label(text, opts) {
    (0, _classCallCheck3.default)(this, Label);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Label.__proto__ || (0, _getPrototypeOf2.default)(Label)).call(this, opts));

    _this2.text = String(text);
    return _this2;
  }

  (0, _createClass3.default)(Label, [{
    key: 'render',
    value: function render(t) {
      var context = (0, _get3.default)(Label.prototype.__proto__ || (0, _getPrototypeOf2.default)(Label.prototype), 'render', this).call(this, t),
          attr = this.attr(),
          text = this.text,
          font = attr.font,
          renderMode = attr.renderMode;

      if (text) {
        context.font = attr.font;
        var color = attr.color;
        var lines = this.text.split(/\n/);

        context.textBaseline = 'top';

        var align = attr.textAlign,
            _contentSize = (0, _slicedToArray3.default)(this.contentSize, 2),
            width = _contentSize[0],
            height = _contentSize[1];


        context.strokeStyle = context.fillStyle = color;

        var _attr = this.attr('border'),
            _attr2 = (0, _slicedToArray3.default)(_attr, 1),
            borderWidth = _attr2[0];

        var linearGradients = attr.linearGradients;

        if (linearGradients && linearGradients.text) {
          context.strokeStyle = context.fillStyle = (0, _utils.getLinearGradients)(context, [borderWidth, borderWidth, width, height], linearGradients.text);
        }

        var top = borderWidth;

        lines.forEach(function (line) {
          var left = borderWidth;

          var _getTextSize3 = (0, _utils.getTextSize)(line, font, attr.lineHeight),
              _getTextSize4 = (0, _slicedToArray3.default)(_getTextSize3, 3),
              w = _getTextSize4[0],
              h = _getTextSize4[1],
              textHeight = _getTextSize4[2];

          if (align === 'center') {
            left += (width - w) / 2;
          } else if (align === 'right') {
            left += width - w;
          }

          if (renderMode === 'fill') {
            context.fillText(line, left, top + (h - textHeight) / 2);
          } else {
            context.strokeText(line, left, top + (h - textHeight) / 2);
          }

          top += h;
        });
      }

      return context;
    }
  }, {
    key: 'text',
    set: function set(val) {
      this.attr('text', val);
    },
    get: function get() {
      return this.attr('text');
    }

    // override to adapt content size

  }, {
    key: 'contentSize',
    get: function get() {
      var _attr3 = this.attr('size'),
          _attr4 = (0, _slicedToArray3.default)(_attr3, 2),
          width = _attr4[0],
          height = _attr4[1];

      var boxSize = this.attr('textboxSize');

      if (width === '') {
        width = boxSize[0] | 0;
      }
      if (height === '') {
        height = boxSize[1] | 0;
      }

      return [width, height];
    }
  }]);
  return Label;
}(_basesprite2.default), _class2.Attr = LabelSpriteAttr, _temp);
exports.default = Label;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = __webpack_require__(30);

var _map2 = _interopRequireDefault(_map);

exports.registerNodeType = registerNodeType;
exports.createNode = createNode;
exports.getNodeType = getNodeType;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodeTypes = new _map2.default();

function registerNodeType(type, Class) {
  Object.defineProperty(Class, 'nodeType', {
    get: function get() {
      return type;
    }
  });
  nodeTypes.set(type, Class);
}

function createNode(type, attrs) {
  var Class = nodeTypes.get(type);
  if (Class) {
    var sprite = new Class();
    if (attrs) {
      sprite.initAttributes(attrs);
    }
    return sprite;
  }
  return null;
}

function getNodeType(type) {
  return nodeTypes.get(type);
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PathSpriteAttr = undefined;

var _get2 = __webpack_require__(23);

var _get3 = _interopRequireDefault(_get2);

var _getOwnPropertyDescriptor = __webpack_require__(31);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getPrototypeOf = __webpack_require__(18);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(25);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(24);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _desc, _value, _class, _class2, _temp;

var _basesprite = __webpack_require__(35);

var _basesprite2 = _interopRequireDefault(_basesprite);

var _decorators = __webpack_require__(20);

var _utils = __webpack_require__(9);

var _spriteAnimator = __webpack_require__(43);

var _index = __webpack_require__(141);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

_spriteAnimator.Effects.d = _index2.default;

function getBoundingBox(attr) {
  var path = attr.loadObj('path');
  var d = attr.d;

  if (!path) {
    if (d) {
      // Deserialized sprite may have d value but no path obj
      path = (0, _utils.createPath)(d);
      attr.saveObj('path', path);
    } else {
      return [0, 0, 0, 0];
    }
  }

  var lw = Math.ceil(attr.lineWidth / 2);

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.visibility = 'hidden';
  svg.style.position = 'absolute';
  svg.style.top = 0;
  svg.style.left = 0;
  // svg.setAttribute('width', 1000)
  // svg.setAttribute('height', 1000)
  // svg.setAttribute('preserveAspectRatio', 'none')
  path.setAttribute('stroke-width', attr.lineWidth);
  path.setAttribute('stroke', '#f00');
  svg.appendChild(path);
  document.body.appendChild(svg);

  var _svg$getBoundingClien = svg.getBoundingClientRect(),
      x0 = _svg$getBoundingClien.x,
      y0 = _svg$getBoundingClien.y;

  var _path$getBoundingClie = path.getBoundingClientRect(),
      x = _path$getBoundingClie.x,
      y = _path$getBoundingClie.y,
      width = _path$getBoundingClie.width,
      height = _path$getBoundingClie.height;

  var ox = x - x0,
      oy = y - y0;

  document.body.removeChild(svg);

  return [-lw, -lw, ox + width + lw, oy + height + lw];
}

var PathSpriteAttr = exports.PathSpriteAttr = (_dec = (0, _decorators.attr)('repaint'), _dec2 = (0, _decorators.attr)('repaint'), _dec3 = (0, _decorators.attr)('repaint'), _dec4 = (0, _decorators.attr)('repaint'), _dec5 = (0, _decorators.attr)('repaint'), _dec6 = (0, _decorators.attr)('repaint'), (_class = function (_BaseSprite$Attr) {
  (0, _inherits3.default)(PathSpriteAttr, _BaseSprite$Attr);

  function PathSpriteAttr(subject) {
    (0, _classCallCheck3.default)(this, PathSpriteAttr);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PathSpriteAttr.__proto__ || (0, _getPrototypeOf2.default)(PathSpriteAttr)).call(this, subject));

    _this.merge({
      lineWidth: 1,
      strokeColor: (0, _utils.parseColorString)('black'),
      fillColor: '',
      renderMode: 'stroke', // stroke, fill
      // d: path2d,
      boxSize: [0, 0]
    });
    return _this;
  }

  (0, _createClass3.default)(PathSpriteAttr, [{
    key: 'boundingBox',
    get: function get() {
      return getBoundingBox(this);
    }
  }, {
    key: 'd',
    set: function set(val) {
      var path = (0, _utils.createPath)(val);
      this.set('d', path.getAttribute('d'));
      this.saveObj('path', path);

      var box = this.boundingBox;
      this.set('boxSize', [box[2] - box[0], box[3] - box[1]]);

      var _translate = (0, _slicedToArray3.default)(this.translate, 2),
          x0 = _translate[0],
          y0 = _translate[1];

      var offset = this.get('dOffset') || [0, 0];

      this.translate = [x0 + box[0] - offset[0], y0 + box[1] - offset[1]];
      this.set('dOffset', [box[0], box[1]]);
    },
    get: function get() {
      return this.get('d');
    }
  }, {
    key: 'boxSize',
    get: function get() {
      return this.get('boxSize');
    }
  }, {
    key: 'lineWidth',
    set: function set(val) {
      this.set('lineWidth', Math.round(val));

      if (this.d) {
        var box = this.boundingBox;
        this.set('boxSize', [box[2] - box[0], box[3] - box[1]]);
      }
    },
    get: function get() {
      return this.get('lineWidth');
    }
  }, {
    key: 'renderMode',
    set: function set(val) {
      this.set('renderMode', val);
    },
    get: function get() {
      return this.get('renderMode');
    }
  }, {
    key: 'color',
    set: function set(val) {
      this.strokeColor = val;
    },
    get: function get() {
      return this.strokeColor;
    }
  }, {
    key: 'strokeColor',
    set: function set(val) {
      this.set('strokeColor', (0, _utils.parseColorString)(val));
    },
    get: function get() {
      return this.get('strokeColor');
    }
  }, {
    key: 'fillColor',
    set: function set(val) {
      this.set('fillColor', (0, _utils.parseColorString)(val));
    },
    get: function get() {
      return this.get('fillColor');
    }
  }]);
  return PathSpriteAttr;
}(_basesprite2.default.Attr), (_applyDecoratedDescriptor(_class.prototype, 'boundingBox', [_decorators.readonly], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'boundingBox'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'd', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'd'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'boxSize', [_decorators.readonly], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'boxSize'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'lineWidth', [_dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'lineWidth'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'renderMode', [_dec3], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'renderMode'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'color', [_dec4], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'color'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'strokeColor', [_dec5], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'strokeColor'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'fillColor', [_dec6], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'fillColor'), _class.prototype)), _class));
var Path = (_temp = _class2 = function (_BaseSprite) {
  (0, _inherits3.default)(Path, _BaseSprite);

  function Path(d, opts) {
    (0, _classCallCheck3.default)(this, Path);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Path.__proto__ || (0, _getPrototypeOf2.default)(Path)).call(this, opts));

    if (d) {
      _this2.attr({ d: d });
    }
    return _this2;
  }

  (0, _createClass3.default)(Path, [{
    key: 'render',
    value: function render(t) {
      var context = (0, _get3.default)(Path.prototype.__proto__ || (0, _getPrototypeOf2.default)(Path.prototype), 'render', this).call(this, t),
          attr = this.attr();

      if (attr.d) {
        var box = attr.boundingBox;

        context.translate(-box[0], -box[1]);

        var p = this.createPath(attr.d),
            strokeColor = attr.strokeColor,
            fillColor = attr.fillColor;


        context.lineWidth = attr.lineWidth;

        var _contentSize = (0, _slicedToArray3.default)(this.contentSize, 2),
            width = _contentSize[0],
            height = _contentSize[1],
            _attr$border = (0, _slicedToArray3.default)(attr.border, 1),
            borderWidth = _attr$border[0];

        var linearGradients = attr.linearGradients;

        if (linearGradients && linearGradients.strokeColor) {
          context.strokeStyle = (0, _utils.getLinearGradients)(context, [borderWidth, borderWidth, width, height], linearGradients.strokeColor);
        } else {
          context.strokeStyle = strokeColor;
        }

        context.stroke(p);

        if (attr.renderMode === 'fill') {
          if (linearGradients && linearGradients.fillColor) {
            context.fillStyle = (0, _utils.getLinearGradients)(context, [borderWidth, borderWidth, width, height], linearGradients.fillColor);
          } else {
            context.fillStyle = fillColor || strokeColor;
          }

          context.fill(p);
        }

        this.path = p;
      }

      return context;
    }
  }, {
    key: 'contentSize',
    get: function get() {
      var _attr = this.attr('size'),
          _attr2 = (0, _slicedToArray3.default)(_attr, 2),
          width = _attr2[0],
          height = _attr2[1];

      var boxSize = this.attr('boxSize');

      if (width === '') {
        width = boxSize[0] | 0;
      }
      if (height === '') {
        height = boxSize[1] | 0;
      }

      return [width, height];
    }
  }]);
  return Path;
}(_basesprite2.default), _class2.Attr = PathSpriteAttr, _temp);
exports.default = Path;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(46);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(44);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = __webpack_require__(36);

var _promise2 = _interopRequireDefault(_promise);

var _map = __webpack_require__(30);

var _map2 = _interopRequireDefault(_map);

var _basesprite = __webpack_require__(35);

var _basesprite2 = _interopRequireDefault(_basesprite);

var _nodetype = __webpack_require__(56);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = __webpack_require__(117);

var loadedResources = new _map2.default();

var Resource = {
  loadTexture: function loadTexture(texture) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30000;

    if (typeof texture === 'string' || texture instanceof _basesprite2.default) {
      texture = { src: texture };
    }
    if (typeof texture.src !== 'string' && texture.src.id == null) {
      texture.src.id = 'texture' + Math.random();
    }
    if (texture.src && texture.src.id) {
      texture.id = texture.src.id;
    }

    var mapKey = texture.id || texture.src;
    if (!loadedResources.has(mapKey)) {
      return new _promise2.default(function (resolve, reject) {
        if (typeof texture.src !== 'string') {
          // support sprites as textures
          if (!(texture.src instanceof _basesprite2.default)) {
            var node = (0, _nodetype.createNode)(texture.src.nodeType, texture.src.attrs);
            node.id = texture.id;
            texture.src = node;
          }
          _promise2.default.resolve(texture.src.render()).then(function (context) {
            resolve({ img: context.canvas, texture: texture });
            loadedResources.set(mapKey, context.canvas);
          });
          texture.src = texture.src.serialize();
        } else {
          var img = document.createElement('img');
          img.crossOrigin = 'anonymous';

          var timer = setTimeout(function () {
            reject(new Error('load img timeout'));
          }, timeout);

          img.src = texture.src;
          img.onload = function () {
            var width = img.width,
                height = img.height;

            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var imgRect = void 0;

            canvas.width = width;
            canvas.height = height;

            if (imgRect) {
              ctx.drawImage(img, imgRect[0], imgRect[1], width, height);
            } else {
              ctx.drawImage(img, 0, 0);
            }
            resolve({ img: canvas, texture: texture });
            loadedResources.set(mapKey, canvas);
            clearTimeout(timer);
          };
        }
      });
    }
    return _promise2.default.resolve({ img: loadedResources.get(mapKey),
      texture: texture });
  },

  /**
    u3d-json compatible: https://www.codeandweb.com/texturepacker
    {
      frames: {
        key: {
          frame: {x, y, w, h},
          trimmed: ...,
          rotated: true|false,
          spriteSourceSize: {x, y, w, h},
          sourceSize: {w, h}
        }
      }
    }
   */
  loadFrames: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(src, frameData) {
      var texture, frames, key, frame, _frame$sourceSize, w, h, canvas, srcRect, rect, context, rotated, tmp;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof frameData === 'string')) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return axios.get(frameData);

            case 3:
              frameData = _context.sent;

              frameData = frameData.data;

            case 5:
              _context.next = 7;
              return this.loadTexture(src);

            case 7:
              texture = _context.sent;
              frames = frameData.frames;


              for (key in frames) {
                frame = frames[key], _frame$sourceSize = frame.sourceSize, w = _frame$sourceSize.w, h = _frame$sourceSize.h;
                canvas = document.createElement('canvas'), srcRect = frame.frame, rect = frame.spriteSourceSize, context = canvas.getContext('2d');
                rotated = frame.rotated;


                canvas.width = w;
                canvas.height = h;

                context.save();

                if (rotated) {
                  context.translate(0, h);
                  context.rotate(-0.5 * Math.PI);

                  tmp = rect.y;

                  rect.y = rect.x;
                  rect.x = h - srcRect.h - tmp;

                  context.drawImage(texture.img, srcRect.x, srcRect.y, srcRect.h, srcRect.w, rect.x, rect.y, rect.h, rect.w);
                } else {
                  context.drawImage(texture.img, srcRect.x, srcRect.y, srcRect.w, srcRect.h, rect.x, rect.y, rect.w, rect.h);
                }

                context.restore();

                loadedResources.set(key, canvas);
              }
              return _context.abrupt('return', texture);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function loadFrames(_x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return loadFrames;
  }()
};

exports.default = Resource;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _stringify = __webpack_require__(62);

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = __webpack_require__(46);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(44);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = __webpack_require__(11);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _map = __webpack_require__(30);

var _map2 = _interopRequireDefault(_map);

var _get2 = __webpack_require__(23);

var _get3 = _interopRequireDefault(_get2);

var _getOwnPropertyDescriptor = __webpack_require__(31);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = __webpack_require__(36);

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = __webpack_require__(18);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(25);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(24);

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = __webpack_require__(10);

var _symbol2 = _interopRequireDefault(_symbol);

var _desc, _value, _class, _class2, _temp;

var _basesprite = __webpack_require__(35);

var _basesprite2 = _interopRequireDefault(_basesprite);

var _resource = __webpack_require__(58);

var _resource2 = _interopRequireDefault(_resource);

var _filters = __webpack_require__(137);

var _filters2 = _interopRequireDefault(_filters);

var _decorators = __webpack_require__(20);

var _utils = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var _texturesCache = (0, _symbol2.default)('_texturesCache');

var TextureAttr = (_class = function (_BaseSprite$Attr) {
  (0, _inherits3.default)(TextureAttr, _BaseSprite$Attr);

  function TextureAttr() {
    (0, _classCallCheck3.default)(this, TextureAttr);
    return (0, _possibleConstructorReturn3.default)(this, (TextureAttr.__proto__ || (0, _getPrototypeOf2.default)(TextureAttr)).apply(this, arguments));
  }

  (0, _createClass3.default)(TextureAttr, [{
    key: 'textures',
    set: function set(textures) {
      var _this2 = this;

      if (!Array.isArray(textures)) {
        textures = [textures];
      }
      var subject = this.subject;

      textures = textures.map(function (texture) {
        if (typeof texture === 'string') {
          texture = { src: texture };
        } else if (texture instanceof _basesprite2.default) {
          texture = { src: texture };
        }

        return texture;
      });

      // adaptive textures
      var promises = textures.map(function (texture) {
        return _resource2.default.loadTexture(texture);
      });
      _promise2.default.all(promises).then(function (textures) {
        var width = 0,
            height = 0;
        textures.forEach(function (_ref) {
          var img = _ref.img,
              texture = _ref.texture;

          var w = void 0,
              h = void 0;
          if (texture && texture.rect) {
            w = texture.rect[2] + texture.rect[0];
            h = texture.rect[3] + texture.rect[1];
          } else if (texture && texture.srcRect) {
            w = texture.srcRect[2];
            h = texture.srcRect[3];
          } else {
            w = img.width;
            h = img.height;
          }
          if (width < w) {
            width = w;
          }
          if (height < h) {
            height = h;
          }
        });

        var _texturesSize = (0, _slicedToArray3.default)(_this2.texturesSize, 2),
            ow = _texturesSize[0],
            oh = _texturesSize[1];

        _this2.set('texturesSize', [width, height]);

        // Asynchronously loaded new texture
        if (ow !== width || oh !== height) {
          subject.forceUpdate(true);
        }
      });

      this.set('textures', textures);
    },
    get: function get() {
      return this.get('textures');
    }
  }, {
    key: 'texturesSize',
    get: function get() {
      return this.get('texturesSize') || [0, 0];
    }
  }]);
  return TextureAttr;
}(_basesprite2.default.Attr), (_applyDecoratedDescriptor(_class.prototype, 'textures', [_decorators.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'textures'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'texturesSize', [_decorators.readonly], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'texturesSize'), _class.prototype)), _class);
var Sprite = (_temp = _class2 = function (_BaseSprite) {
  (0, _inherits3.default)(Sprite, _BaseSprite);

  /**
    new Sprite({
      attr: {
        ...
      },
      attributeChangedCallback: function(prop, oldValue, newValue){
       }
    })
   */
  function Sprite(textures) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { attr: {} };
    var AttrModel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TextureAttr;
    (0, _classCallCheck3.default)(this, Sprite);

    if (typeof textures === 'string') {
      textures = [textures];
    } else if (textures && !Array.isArray(textures)) {
      opts = textures;
      textures = opts.textures;
    }
    var attr = opts.attr;
    delete opts.attr;

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (Sprite.__proto__ || (0, _getPrototypeOf2.default)(Sprite)).call(this, opts, AttrModel));

    _this3[_texturesCache] = new _map2.default();
    if (textures) {
      _this3.textures = textures;
    }
    if (attr) {
      _this3.attr(attr);
    }
    return _this3;
  }

  (0, _createClass3.default)(Sprite, [{
    key: 'pointCollision',
    value: function pointCollision(evt) {
      var _this4 = this;

      if ((0, _get3.default)(Sprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(Sprite.prototype), 'pointCollision', this).call(this, evt)) {
        var textures = this.textures;

        if (textures) {
          var offsetX = evt.offsetX,
              offsetY = evt.offsetY;

          evt.targetTextures = [];

          var _attr = this.attr('anchor'),
              _attr2 = (0, _slicedToArray3.default)(_attr, 2),
              anchorX = _attr2[0],
              anchorY = _attr2[1],
              _contentSize = (0, _slicedToArray3.default)(this.contentSize, 2),
              width = _contentSize[0],
              height = _contentSize[1];

          offsetX += width * anchorX;
          offsetY += height * anchorY;

          textures.forEach(function (texture) {
            var _ref2 = texture.rect || [0, 0].concat((0, _toConsumableArray3.default)(_this4.innerSize)),
                _ref3 = (0, _slicedToArray3.default)(_ref2, 4),
                x = _ref3[0],
                y = _ref3[1],
                w = _ref3[2],
                h = _ref3[3];

            if (offsetX >= x && offsetX - x < w && offsetY >= y && offsetY - y < h) {
              // touched textures
              evt.targetTextures.push(texture);
            }
          });
        }
        return true;
      }
    }
  }, {
    key: 'render',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(t) {
        var _this5 = this;

        var context, textures, _attr3, borderWidth, promises, texturesWithImg;

        return _regenerator2.default.wrap(function _callee$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                context = void 0;
                textures = this.textures;

                if (!textures) {
                  _context4.next = 12;
                  break;
                }

                _attr3 = this.attr(), borderWidth = _attr3.border[0];

                // load textures

                promises = textures.map(function (texture) {
                  return _resource2.default.loadTexture(texture);
                });
                _context4.next = 7;
                return _promise2.default.all(promises);

              case 7:
                texturesWithImg = _context4.sent;


                context = (0, _get3.default)(Sprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(Sprite.prototype), 'render', this).call(this, t);

                texturesWithImg.forEach(function (_ref5) {
                  var texture = _ref5.texture,
                      img = _ref5.img;

                  var rect = (texture.rect || [0, 0].concat((0, _toConsumableArray3.default)(_this5.innerSize))).slice(0);
                  var srcRect = texture.srcRect;

                  rect[0] += borderWidth;
                  rect[1] += borderWidth;

                  var imgCanvas = document.createElement('canvas');
                  var imgContext = imgCanvas.getContext('2d');

                  if (texture.filter) {
                    var _context;

                    var outterRect = void 0;
                    var imgRect = srcRect ? [0, 0, srcRect[2], srcRect[3]] : [0, 0, img.width, img.height];

                    if (texture.filter.dropShadow) {
                      var dsArr = texture.filter.dropShadow;
                      var shadowRect = [Math.round(dsArr[0] - 2 * dsArr[2]), Math.round(dsArr[1] - 2 * dsArr[2]), imgRect[2] + 4 * dsArr[2], imgRect[3] + 4 * dsArr[2]];

                      outterRect = (0, _utils.boxToRect)((0, _utils.boxUnion)((0, _utils.rectToBox)(shadowRect), (0, _utils.rectToBox)(imgRect))).map(function (val) {
                        return Math.abs(val);
                      });
                    } else {
                      outterRect = imgRect;
                    }
                    imgCanvas.width = outterRect[2];
                    imgCanvas.height = outterRect[3];

                    imgContext.filter = _filters2.default.compile(texture.filter);

                    if (srcRect) {
                      imgContext.drawImage.apply(imgContext, [img].concat((0, _toConsumableArray3.default)(srcRect), [outterRect[0], outterRect[1], srcRect[2], srcRect[3]]));
                    } else {
                      imgContext.drawImage(img, outterRect[0], outterRect[1], img.width, img.height);
                    }
                    (_context = context).drawImage.apply(_context, [imgCanvas].concat((0, _toConsumableArray3.default)(rect)));
                  } else if (srcRect) {
                    var _context2;

                    (_context2 = context).drawImage.apply(_context2, [img].concat((0, _toConsumableArray3.default)(srcRect), (0, _toConsumableArray3.default)(rect)));
                  } else {
                    var _context3;

                    (_context3 = context).drawImage.apply(_context3, [img].concat((0, _toConsumableArray3.default)(rect)));
                  }
                });
                _context4.next = 13;
                break;

              case 12:
                context = (0, _get3.default)(Sprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(Sprite.prototype), 'render', this).call(this, t);

              case 13:
                return _context4.abrupt('return', context);

              case 14:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee, this);
      }));

      function render(_x3) {
        return _ref4.apply(this, arguments);
      }

      return render;
    }()
  }, {
    key: 'textures',
    set: function set(textures) {
      this.attr('textures', textures);
    },
    get: function get() {
      return this.attr('textures');
    }

    // override to adapt textures' size

  }, {
    key: 'contentSize',
    get: function get() {
      var _attr4 = this.attr('size'),
          _attr5 = (0, _slicedToArray3.default)(_attr4, 2),
          width = _attr5[0],
          height = _attr5[1];

      var boxSize = this.attr('texturesSize');

      if (width === '') {
        width = boxSize[0] | 0;
      }
      if (height === '') {
        height = boxSize[1] | 0;
      }

      return [width, height];
    }
  }, {
    key: 'cache',
    set: function set(context) {
      if (context == null) {
        this[_texturesCache].clear();
        return;
      }

      var key = (0, _stringify2.default)(this.textures),
          cacheMap = this[_texturesCache];

      if (!cacheMap.has(key)) {
        cacheMap.set(key, context);
      }
    },
    get: function get() {
      var key = (0, _stringify2.default)(this.textures),
          cacheMap = this[_texturesCache];
      if (cacheMap.has(key)) {
        return cacheMap.get(key);
      }
    }
  }]);
  return Sprite;
}(_basesprite2.default), _class2.Attr = TextureAttr, _temp);
exports.default = Sprite;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(7);
var normalizeHeaderName = __webpack_require__(132);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(85);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(85);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(83)))

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// from https://github.com/chrisaljoudi/transformatrix.js
/**
  default:
          (1, 0, 0)
          (0, 1, 0)
 */
var Matrix = function Matrix(m) {
  m = m || [1, 0, 0, 1, 0, 0];
  this.m = m.slice(0);
};

Matrix.prototype.unit = function () {
  this.m = [1, 0, 0, 1, 0, 0];
  return this;
};

Matrix.prototype.multiply = function (m) {
  var m1 = this.m;
  var m2 = void 0;

  if (m instanceof Matrix) {
    m2 = m.m;
  } else {
    m2 = m;
  }

  var m11 = m1[0] * m2[0] + m1[2] * m2[1],
      m12 = m1[1] * m2[0] + m1[3] * m2[1],
      m21 = m1[0] * m2[2] + m1[2] * m2[3],
      m22 = m1[1] * m2[2] + m1[3] * m2[3];

  var dx = m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
      dy = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];

  m1[0] = m11;
  m1[1] = m12;
  m1[2] = m21;
  m1[3] = m22;
  m1[4] = dx;
  m1[5] = dy;

  return this;
};

Matrix.prototype.inverse = function () {
  var inv = new Matrix(this.m),
      invm = inv.m;

  var d = 1 / (invm[0] * invm[3] - invm[1] * invm[2]),
      m0 = invm[3] * d,
      m1 = -invm[1] * d,
      m2 = -invm[2] * d,
      m3 = invm[0] * d,
      m4 = d * (invm[2] * invm[5] - invm[3] * invm[4]),
      m5 = d * (invm[1] * invm[4] - invm[0] * invm[5]);

  invm[0] = m0;
  invm[1] = m1;
  invm[2] = m2;
  invm[3] = m3;
  invm[4] = m4;
  invm[5] = m5;

  return inv;
};

/**
  (1, 0, sx)
  (0, 1, sy)
 * */
Matrix.prototype.translate = function (x, y) {
  return this.multiply([1, 0, 0, 1, x, y]);
};

/**
    (cos, -sin, 0)
    (sin, cos, 0)
 */
Matrix.prototype.rotate = function (deg) {
  var rad = deg * Math.PI / 180,
      c = Math.cos(rad),
      s = Math.sin(rad);

  return this.multiply([c, s, -s, c, 0, 0]);
};

/**
    (1, tx, 0)
    (ty, 1, 0)
 */
Matrix.prototype.skew = function (degX, degY) {
  degY |= 0;
  var radX = degX * Math.PI / 180,
      radY = degY * Math.PI / 180;
  var tx = Math.tan(radX),
      ty = Math.tan(radY);

  return this.multiply([1, ty, tx, 1, 0, 0]);
};

/**
  (sx, 0, 0)
  (0, sy, 0)
 */
Matrix.prototype.scale = function (sx, sy) {
  return this.multiply([sx, 0, 0, sy, 0, 0]);
};

Matrix.prototype.transformPoint = function (px, py) {
  var x = px,
      y = py;
  px = x * this.m[0] + y * this.m[2] + this.m[4];
  py = x * this.m[1] + y * this.m[3] + this.m[5];

  return [px, py];
};

Matrix.prototype.transformVector = function (px, py) {
  var x = px,
      y = py;
  px = x * this.m[0] + y * this.m[2];
  py = x * this.m[1] + y * this.m[3];

  return [px, py];
};

exports.default = Matrix;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(161), __esModule: true };

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(165), __esModule: true };

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 65 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 67 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(38);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(48);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(108);
var hide = __webpack_require__(19);
var has = __webpack_require__(27);
var Iterators = __webpack_require__(32);
var $iterCreate = __webpack_require__(184);
var setToStringTag = __webpack_require__(42);
var getPrototypeOf = __webpack_require__(104);
var ITERATOR = __webpack_require__(4)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(53)('meta');
var isObject = __webpack_require__(16);
var has = __webpack_require__(27);
var setDesc = __webpack_require__(8).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(26)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(37);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(105);
var hiddenKeys = __webpack_require__(67).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var fails = __webpack_require__(26);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(19);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(76)('keys');
var uid = __webpack_require__(53);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 77 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(16);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(48);
var wksExt = __webpack_require__(81);
var defineProperty = __webpack_require__(8).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(4);


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(47);
var ITERATOR = __webpack_require__(4)('iterator');
var Iterators = __webpack_require__(32);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 83 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _get2 = __webpack_require__(23);

var _get3 = _interopRequireDefault(_get2);

var _getOwnPropertyDescriptor = __webpack_require__(31);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getPrototypeOf = __webpack_require__(18);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(25);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(24);

var _inherits3 = _interopRequireDefault(_inherits2);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _symbol = __webpack_require__(10);

var _symbol2 = _interopRequireDefault(_symbol);

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _desc, _value, _class, _class2, _temp;

var _path = __webpack_require__(57);

var _path2 = _interopRequireDefault(_path);

var _label = __webpack_require__(55);

var _label2 = _interopRequireDefault(_label);

var _sprite = __webpack_require__(59);

var _sprite2 = _interopRequireDefault(_sprite);

var _decorators = __webpack_require__(20);

var _utils = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var _axisPath = (0, _symbol2.default)('axisPath'),
    _labels = (0, _symbol2.default)('labels');

function ticksToD(axis) {
  if (!axis) return;

  var _axis$attr = axis.attr(),
      direction = _axis$attr.direction,
      ticks = _axis$attr.ticks,
      length = _axis$attr.length,
      vLength = _axis$attr.vLength,
      font = _axis$attr.font,
      lineWidth = _axis$attr.lineWidth,
      color = _axis$attr.color,
      axisScales = _axis$attr.axisScales;

  var originTicks = ticks.slice(0);

  var axisTicks = ticks.slice(0);
  if (axisScales.length) {
    axisTicks = axisTicks.map(function (tick) {
      return axisScales.reduce(function (v, s) {
        return s(v);
      }, tick);
    });
    axisTicks = axisTicks.filter(function (tick) {
      return tick >= 0;
    });
  }

  if (axisTicks.length <= 0) {
    return;
  }
  ticks = ticks.slice(-axisTicks.length);

  if (axisScales.length) {
    var scale = axisScales[axisScales.length - 1],
        _scale$range = scale.range(),
        _scale$range2 = (0, _slicedToArray3.default)(_scale$range, 2),
        start = _scale$range2[0],
        end = _scale$range2[1],
        _scale$domain = scale.domain(),
        _scale$domain2 = (0, _slicedToArray3.default)(_scale$domain, 2),
        from = _scale$domain2[0],
        to = _scale$domain2[1];


    if (start < axisTicks[0]) {
      ticks.unshift(from);
      axisTicks.unshift(start);
    }
    if (end > axisTicks[axisTicks.length - 1]) {
      ticks.push(to);
      axisTicks.push(end);
    }
  }

  var dist = axisTicks[axisTicks.length - 1] - axisTicks[0];
  if (length === 'auto') length = dist;

  var rect = void 0,
      d = void 0;
  var textures = [];

  var points = axisTicks.map(function (tick) {
    return length * (tick - axisTicks[0]) / dist;
  });

  var offsetY = 0,
      offsetX = 0,
      offsetX0 = 0;

  ticks.forEach(function (data, i) {
    if (originTicks.indexOf(data) === -1) return;

    var label = axis[_labels][i];
    if (!label) {
      label = new _label2.default();
      axis[_labels][i] = label;
    }
    label.text = data;

    label.attr({ font: font, color: color });

    var _label$contentSize = (0, _slicedToArray3.default)(label.contentSize, 2),
        w = _label$contentSize[0],
        h = _label$contentSize[1];

    offsetY = Math.max(offsetY, h);
    offsetX = Math.max(offsetX, w);

    if (i === 0) {
      offsetX0 = w;
    }

    var x = points[i];
    if (x != null) {
      if (direction === 'top') {
        textures.push({ src: label, rect: [offsetX0 + x - Math.round(w / 2), 0, w, h] });
      } else if (direction === 'bottom') {
        textures.push({ src: label, rect: [offsetX0 + x - Math.round(w / 2), vLength + 5, w, h] });
      } else if (direction === 'left') {
        textures.push({ src: label, rect: [vLength + 5, x, w, h] });
      } else if (direction === 'right') {
        textures.push({ src: label, rect: [0, x, w, h] });
      }
    }
  });

  if (direction === 'top') {
    d = 'M0 ' + vLength + ' h' + length;
    points.forEach(function (point) {
      d += 'M' + point + ' 0 v' + vLength;
    });
    rect = [offsetX0, offsetY + 5, length, vLength];
  } else if (direction === 'bottom') {
    d = 'M0 0 h' + length;
    points.forEach(function (point) {
      d += 'M' + point + ' 0 v' + vLength;
    });
    rect = [offsetX0, 0, length, vLength];
  } else if (direction === 'left') {
    d = 'M0 0 v' + length;
    points.forEach(function (point) {
      d += 'M0 ' + point + ' h' + vLength;
    });
    rect = [0, offsetY / 2, vLength, length];
  } else if (direction === 'right') {
    d = 'M' + (offsetX + 5) + ' 0 v' + length;
    points.forEach(function (point) {
      d += 'M' + (offsetX + 5 - vLength) + ' ' + point + ' h' + vLength;
    });

    rect = [offsetX + 5, offsetY / 2, vLength, length];
  }

  var path = axis[_axisPath];
  path.attr({
    d: d,
    lineWidth: lineWidth,
    color: color
  });
  textures.push({ src: path, rect: rect });

  axis.attr({ textures: textures });
}

var AxisSpriteAttr = (_dec = (0, _decorators.attr)('repaint'), _dec2 = (0, _decorators.attr)('repaint'), _dec3 = (0, _decorators.attr)('repaint'), _dec4 = (0, _decorators.attr)('repaint'), _dec5 = (0, _decorators.attr)('repaint'), _dec6 = (0, _decorators.parseValue)(_utils.parseStringFloat), _dec7 = (0, _decorators.attr)('repaint'), _dec8 = (0, _decorators.attr)('repaint'), _dec9 = (0, _decorators.attr)('repaint'), _dec10 = (0, _decorators.parseValue)(_utils.parseColorString), (_class = function (_Sprite$Attr) {
  (0, _inherits3.default)(AxisSpriteAttr, _Sprite$Attr);

  function AxisSpriteAttr(subject) {
    (0, _classCallCheck3.default)(this, AxisSpriteAttr);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AxisSpriteAttr.__proto__ || (0, _getPrototypeOf2.default)(AxisSpriteAttr)).call(this, subject));

    _this.merge({
      length: 'auto',
      vLength: 10,
      ticks: [0, 100],
      direction: 'top',

      lineWidth: 1,
      color: 'black',
      renderMode: 'stroke', // stroke, fill

      font: '24px Arial',
      axisScales: []
    });
    return _this;
  }

  (0, _createClass3.default)(AxisSpriteAttr, [{
    key: 'font',
    set: function set(val) {
      this.set('font', val);
      ticksToD(this.subject);
    },
    get: function get() {
      return this.get('font');
    }
  }, {
    key: 'direction',
    set: function set(val) {
      this.set('direction', val);
      ticksToD(this.subject);
    },
    get: function get() {
      return this.get('direction');
    }
  }, {
    key: 'length',
    set: function set(val) {
      if (isNaN(val)) {
        val = Math.round(val);
      }
      this.set('length', val);
      ticksToD(this.subject);
    },
    get: function get() {
      return this.get('length');
    }
  }, {
    key: 'vLength',
    set: function set(val) {
      this.set('vLength', Math.round(val));
      ticksToD(this.subject);
    },
    get: function get() {
      return this.get('vLength');
    }
  }, {
    key: 'ticks',
    set: function set(ticks) {
      this.set('ticks', ticks.sort(function (a, b) {
        return a - b;
      }));
      ticksToD(this.subject);
    },
    get: function get() {
      return this.get('ticks');
    }

    // set d3 scales

  }, {
    key: 'axisScales',
    set: function set(val) {
      this.set('axisScales', val);
      ticksToD(this.subject);
    },
    get: function get() {
      return this.get('axisScales');
    }
  }, {
    key: 'd',
    get: function get() {
      if (this.subject && this.subject[_axisPath]) {
        return this.subject[_axisPath].d;
      }
    }
  }, {
    key: 'lineWidth',
    set: function set(val) {
      this.set('lineWidth', val);
      ticksToD(this.subject);
    },
    get: function get() {
      return this.get('lineWidth');
    }
  }, {
    key: 'color',
    set: function set(val) {
      this.set('color', val);
      ticksToD(this.subject);
    },
    get: function get() {
      return this.get('color');
    }
  }]);
  return AxisSpriteAttr;
}(_sprite2.default.Attr), (_applyDecoratedDescriptor(_class.prototype, 'font', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'font'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'direction', [_dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'direction'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'length', [_dec3], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'length'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'vLength', [_dec4], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'vLength'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'ticks', [_dec5, _dec6], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'ticks'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'axisScales', [_dec7], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'axisScales'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'd', [_decorators.readonly], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'd'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'lineWidth', [_dec8], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'lineWidth'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'color', [_dec9, _dec10], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'color'), _class.prototype)), _class));
var Axis = (_temp = _class2 = function (_Sprite) {
  (0, _inherits3.default)(Axis, _Sprite);

  function Axis() {
    var ticks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 100];
    var opts = arguments[1];
    (0, _classCallCheck3.default)(this, Axis);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Axis.__proto__ || (0, _getPrototypeOf2.default)(Axis)).call(this, null, opts));

    _this2[_axisPath] = new _path2.default();
    _this2[_labels] = [];
    if (ticks) {
      _this2.attr({ ticks: ticks });
    }
    return _this2;
  }

  (0, _createClass3.default)(Axis, [{
    key: 'render',
    value: function render(t) {
      var context = (0, _get3.default)(Axis.prototype.__proto__ || (0, _getPrototypeOf2.default)(Axis.prototype), 'render', this).call(this, t);
      return context;
    }
  }, {
    key: 'initAttributes',
    value: function initAttributes(attrs) {
      (0, _get3.default)(Axis.prototype.__proto__ || (0, _getPrototypeOf2.default)(Axis.prototype), 'initAttributes', this).call(this, attrs);
      ticksToD(this);
    }
  }]);
  return Axis;
}(_sprite2.default), _class2.Attr = AxisSpriteAttr, _temp);
exports.default = Axis;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(7);
var settle = __webpack_require__(124);
var buildURL = __webpack_require__(127);
var parseHeaders = __webpack_require__(133);
var isURLSameOrigin = __webpack_require__(131);
var createError = __webpack_require__(88);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(126);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(129);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(83)))

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(123);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = __webpack_require__(10);

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _eventHandlers = (0, _symbol2.default)('eventHandlers'),
    _collisionState = (0, _symbol2.default)('collisionState');

var BaseNode = function () {
  function BaseNode() {
    (0, _classCallCheck3.default)(this, BaseNode);

    this[_eventHandlers] = {};
  }

  (0, _createClass3.default)(BaseNode, [{
    key: 'on',
    value: function on(type, handler) {
      this[_eventHandlers][type] = this[_eventHandlers][type] || [];
      this[_eventHandlers][type].push(handler);
    }
  }, {
    key: 'off',
    value: function off(type, handler) {
      if (handler && this[_eventHandlers][type]) {
        var idx = this[_eventHandlers][type].indexOf(handler);

        if (idx >= 0) {
          this[_eventHandlers][type].splice(idx, 1);
        }
      } else {
        delete this[_eventHandlers][type];
      }
    }
    // d3-friendly

  }, {
    key: 'addEventListener',
    value: function addEventListener(type, handler) {
      return this.on(type, handler);
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener(type, handler) {
      return this.off(type, handler);
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      throw Error('you mast override this method');
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(type, evt) {
      var _this = this;

      var forceTrigger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!evt.terminated && (forceTrigger || this.pointCollision(evt))) {
        evt.target = this;
        if (evt.type !== type) {
          if (evt.type) {
            evt.originalType = evt.type;
          }
          evt.type = type;
        }

        var handlers = this[_eventHandlers][type];
        if (handlers) {
          handlers.forEach(function (handler) {
            return handler.call(_this, evt);
          });
        }

        if (type === 'mousemove') {
          if (!this[_collisionState]) {
            var _evt = (0, _assign2.default)({}, evt);
            _evt.type = 'mouseenter';
            _evt.terminated = false;

            this.dispatchEvent('mouseenter', _evt);
          }
          this[_collisionState] = true;
        }
      } else if (type === 'mousemove') {
        if (this[_collisionState]) {
          var _evt2 = (0, _assign2.default)({}, evt);
          _evt2.type = 'mouseleave';
          _evt2.target = this;
          _evt2.terminated = false;

          this.dispatchEvent('mouseleave', _evt2, true);
        }
        this[_collisionState] = false;
      }

      return this[_collisionState];
    }
    // called when layer appendChild

  }, {
    key: 'connect',
    value: function connect(parent, zOrder) {
      if (this.parent) {
        throw new Error('This node belongs to another parent node! Remove it first...');
      }

      Object.defineProperty(this, 'zOrder', {
        value: zOrder,
        writable: false,
        configurable: true
      });

      Object.defineProperty(this, 'parent', {
        get: function get() {
          return parent;
        },
        configurable: true
      });

      if (this.connectedCallback) {
        this.connectedCallback(parent);
      }

      return this;
    }

    // override to recycling resources

  }, {
    key: 'disconnect',
    value: function disconnect(parent) {
      if (!this.parent || parent !== this.parent) {
        throw new Error('Invalid node to disconnect');
      }

      delete this.zOrder;

      if (this.disconnectedCallback) {
        this.disconnectedCallback(this.parent);
      }

      delete this.parent;

      return this;
    }
  }]);
  return BaseNode;
}();

exports.default = BaseNode;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = __webpack_require__(11);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _map = __webpack_require__(30);

var _map2 = _interopRequireDefault(_map);

var _promise = __webpack_require__(36);

var _promise2 = _interopRequireDefault(_promise);

exports.defer = defer;
exports.periodicity = periodicity;
exports.getBezierEasing = getBezierEasing;
exports.getStepsEasing = getStepsEasing;
exports.parseEasingStr = parseEasingStr;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defer() {
  var ret = {};
  ret.promise = new _promise2.default(function (resolve, reject) {
    ret.resolve = resolve;
    ret.reject = reject;
  });
  return ret;
}

function periodicity(val, dur) {
  var t = Math.floor(val / dur);
  if (t) {
    val -= t * dur;
    return val || dur; //周期值，0 的时候是 0，dur 的时候是 1，所以要分 t 是否为 0
  } else {
    return val;
  }
}

var BezierEasing = __webpack_require__(157);
var bezierFuncCache = new _map2.default();

function getBezierEasing() {
  for (var _len = arguments.length, value = Array(_len), _key = 0; _key < _len; _key++) {
    value[_key] = arguments[_key];
  }

  var easing = bezierFuncCache.get(value);
  if (easing) {
    return easing;
  }
  easing = BezierEasing.apply(undefined, value);
  bezierFuncCache.set(value, easing);
  return easing;
}

function getStepsEasing(step) {
  var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'end';

  return function (p, frames) {
    for (var i = 1; i < frames.length; i++) {
      var offset = frames[i].offset;

      if (p <= offset) {
        var start = frames[i - 1].offset,
            end = offset;
        var fp = (p - start) / (end - start),
            d = 1 / step;

        var t = fp / d;
        if (pos === 'end') {
          t = Math.floor(t);
        } else {
          t = Math.ceil(t);
        }

        return d * t * (end - start) + start;
      }
    }
    return 0;
  };
}

function parseEasingStr(easingStr) {
  var pattern = /^cubic-bezier\((.*)\)/,
      matched = easingStr.match(pattern);

  if (matched) {
    var _value = matched[1].trim();
    _value = _value.split(',').map(function (v) {
      return parseFloat(v.trim());
    });
    return getBezierEasing.apply(undefined, (0, _toConsumableArray3.default)(_value));
  }

  pattern = /^steps\((.*)\)/;
  matched = easingStr.match(pattern);

  if (matched) {
    var _value2 = matched[1].trim();
    _value2 = _value2.split(',').map(function (v) {
      return v.trim();
    });

    var _value3 = _value2,
        _value4 = (0, _slicedToArray3.default)(_value3, 2),
        step = _value4[0],
        pos = _value4[1];

    return getStepsEasing(parseInt(step, 10), pos);
  }
  return easingStr;
}

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(173), __esModule: true };

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(8).f;
var create = __webpack_require__(49);
var redefineAll = __webpack_require__(74);
var ctx = __webpack_require__(15);
var anInstance = __webpack_require__(64);
var forOf = __webpack_require__(39);
var $iterDefine = __webpack_require__(69);
var step = __webpack_require__(103);
var setSpecies = __webpack_require__(111);
var DESCRIPTORS = __webpack_require__(13);
var fastKey = __webpack_require__(70).fastKey;
var validate = __webpack_require__(79);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(47);
var from = __webpack_require__(177);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var $export = __webpack_require__(1);
var meta = __webpack_require__(70);
var fails = __webpack_require__(26);
var hide = __webpack_require__(19);
var redefineAll = __webpack_require__(74);
var forOf = __webpack_require__(39);
var anInstance = __webpack_require__(64);
var isObject = __webpack_require__(16);
var setToStringTag = __webpack_require__(42);
var dP = __webpack_require__(8).f;
var each = __webpack_require__(179)(0);
var DESCRIPTORS = __webpack_require__(13);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(8);
var createDesc = __webpack_require__(41);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(13) && !__webpack_require__(26)(function () {
  return Object.defineProperty(__webpack_require__(66)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(32);
var ITERATOR = __webpack_require__(4)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(38);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(12);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(4)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(27);
var toObject = __webpack_require__(33);
var IE_PROTO = __webpack_require__(75)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(27);
var toIObject = __webpack_require__(14);
var arrayIndexOf = __webpack_require__(178)(false);
var IE_PROTO = __webpack_require__(75)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var newPromiseCapability = __webpack_require__(71);

module.exports = function (C, x) {
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(19);


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);
var aFunction = __webpack_require__(37);
var ctx = __webpack_require__(15);
var forOf = __webpack_require__(39);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var dP = __webpack_require__(8);
var DESCRIPTORS = __webpack_require__(13);
var SPECIES = __webpack_require__(4)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(12);
var aFunction = __webpack_require__(37);
var SPECIES = __webpack_require__(4)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(15);
var invoke = __webpack_require__(183);
var html = __webpack_require__(97);
var cel = __webpack_require__(66);
var global = __webpack_require__(3);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(38)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 114 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(46);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _entries = __webpack_require__(22);

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = __webpack_require__(21);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = __webpack_require__(11);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = __webpack_require__(44);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = __webpack_require__(10);

var _symbol2 = _interopRequireDefault(_symbol);

var _layer = __webpack_require__(139);

var _layer2 = _interopRequireDefault(_layer);

var _resource = __webpack_require__(58);

var _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _layerMap = (0, _symbol2.default)('layerMap'),
    _zOrder = (0, _symbol2.default)('zOrder'),
    _layers = (0, _symbol2.default)('layers');

function sortLayer(paper) {
  var layers = [];

  for (var key in paper[_layerMap]) {
    var layer = paper[_layerMap][key];

    layers.push(layer);
  }

  layers.sort(function (a, b) {
    if (b.zIndex === a.zIndex) {
      return b.zOrder - a.zOrder;
    }
    return b.zIndex - a.zIndex;
  });

  paper[_layers] = layers;
}

var Paper = function () {
  function Paper(container, width, height) {
    (0, _classCallCheck3.default)(this, Paper);

    if (typeof container === 'string') {
      container = document.querySelector(container);
    }
    if (!container) {
      throw new Error('Container is not defined or cannot found.');
    }

    this.container = container;

    this.viewport = [width || container.clientWidth, height || container.clientHeight];

    this.resolution = [this.viewport[0], this.viewport[1]];

    this[_zOrder] = 0;
    this[_layerMap] = {};
    this[_layers] = [];

    // d3-friendly
    this.namespaceURI = 'http://spritejs.org/paper2D';
    var that = this;
    this.ownerDocument = {
      createElementNS: function createElementNS(uri, name) {
        return that.layer(name);
      }
    };

    var events = ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchend', 'touchmove', 'click', 'dblclick'];

    this.delegateEvent.apply(this, events);
  }

  // d3-friendly


  (0, _createClass3.default)(Paper, [{
    key: 'insertBefore',
    value: function insertBefore(node, next) {
      if (this.container) {
        return this.container.insertBefore(node, next);
      }
    }
  }, {
    key: 'appendChild',
    value: function appendChild(layer) {
      return this.appendLayer(layer);
    }
  }, {
    key: 'removeChild',
    value: function removeChild(layer) {
      return this.removeLayer(layer);
    }
  }, {
    key: 'setViewport',
    value: function setViewport(width, height) {
      if (width === 'auto') {
        width = this.container.clientWidth;
      }
      if (height === 'auto') {
        height = this.container.clientHeight;
      }
      this.viewport = [width, height];
      this[_layers].forEach(function (layer) {
        return layer.updateResolution();
      });
      return this;
    }
  }, {
    key: 'setResolution',
    value: function setResolution(width, height) {
      this.resolution = [width, height];
      this[_layers].forEach(function (layer) {
        return layer.updateResolution();
      });
      return this;
    }
  }, {
    key: 'toGlobalPos',
    value: function toGlobalPos(x, y) {
      var resolution = this.resolution,
          viewport = this.viewport;

      x = x * viewport[0] / resolution[0];
      y = y * viewport[1] / resolution[1];

      return [x, y];
    }
  }, {
    key: 'toLocalPos',
    value: function toLocalPos(x, y) {
      var resolution = this.resolution,
          viewport = this.viewport;

      x = x * resolution[0] / viewport[0];
      y = y * resolution[1] / viewport[1];

      return [x, y];
    }
  }, {
    key: 'delegateEvent',
    value: function delegateEvent() {
      var _this = this;

      for (var _len = arguments.length, events = Array(_len), _key = 0; _key < _len; _key++) {
        events[_key] = arguments[_key];
      }

      events.forEach(function (event) {
        if (typeof event === 'string') {
          event = { type: event, passive: true };
        }

        var _event = event,
            type = _event.type,
            passive = _event.passive;


        _this.container.addEventListener(type, function (e) {
          var layers = _this[_layers];
          var evtArgs = {
            originalEvent: e,
            type: type,
            stopDispatch: function stopDispatch() {
              this.terminated = true;
            }
          };

          var originalX = e.layerX != null ? e.layerX : e.offsetX;
          var originalY = e.layerY != null ? e.layerY : e.offsetY;

          if (originalX == null || originalY == null) {
            var _e$changedTouches$ = e.changedTouches[0],
                clientX = _e$changedTouches$.clientX,
                clientY = _e$changedTouches$.clientY;

            var _e$target$getBounding = e.target.getBoundingClientRect(),
                left = _e$target$getBounding.left,
                top = _e$target$getBounding.top;

            originalX = clientX - left;
            originalY = clientY - top;
          }

          var _toLocalPos = _this.toLocalPos(originalX, originalY),
              _toLocalPos2 = (0, _slicedToArray3.default)(_toLocalPos, 2),
              layerX = _toLocalPos2[0],
              layerY = _toLocalPos2[1];

          (0, _assign2.default)(evtArgs, { layerX: layerX, layerY: layerY, originalX: originalX, originalY: originalY });

          for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];

            if (layer.handleEvent) {
              layer.dispatchEvent(type, evtArgs);
            }
          }
        }, { passive: passive });
      });
    }
  }, {
    key: 'preload',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        for (var _len2 = arguments.length, resources = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          resources[_key2] = arguments[_key2];
        }

        var ret, i, res, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref2, _ref3, id, src;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ret = [];
                i = 0;

              case 2:
                if (!(i < resources.length)) {
                  _context.next = 55;
                  break;
                }

                res = resources[i];

                if (!(typeof res === 'string')) {
                  _context.next = 12;
                  break;
                }

                _context.t0 = ret;
                _context.next = 8;
                return _resource2.default.loadTexture(res);

              case 8:
                _context.t1 = _context.sent;

                _context.t0.push.call(_context.t0, _context.t1);

                _context.next = 52;
                break;

              case 12:
                if (!Array.isArray(res)) {
                  _context.next = 20;
                  break;
                }

                _context.t2 = ret;
                _context.next = 16;
                return _resource2.default.loadFrames.apply(_resource2.default, (0, _toConsumableArray3.default)(res));

              case 16:
                _context.t3 = _context.sent;

                _context.t2.push.call(_context.t2, _context.t3);

                _context.next = 52;
                break;

              case 20:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 23;
                _iterator = (0, _getIterator3.default)((0, _entries2.default)(res));

              case 25:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 38;
                  break;
                }

                _ref2 = _step.value;
                _ref3 = (0, _slicedToArray3.default)(_ref2, 2);
                id = _ref3[0];
                src = _ref3[1];
                _context.t4 = ret;
                _context.next = 33;
                return _resource2.default.loadTexture({ id: id, src: src });

              case 33:
                _context.t5 = _context.sent;

                _context.t4.push.call(_context.t4, _context.t5);

              case 35:
                _iteratorNormalCompletion = true;
                _context.next = 25;
                break;

              case 38:
                _context.next = 44;
                break;

              case 40:
                _context.prev = 40;
                _context.t6 = _context['catch'](23);
                _didIteratorError = true;
                _iteratorError = _context.t6;

              case 44:
                _context.prev = 44;
                _context.prev = 45;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 47:
                _context.prev = 47;

                if (!_didIteratorError) {
                  _context.next = 50;
                  break;
                }

                throw _iteratorError;

              case 50:
                return _context.finish(47);

              case 51:
                return _context.finish(44);

              case 52:
                i++;
                _context.next = 2;
                break;

              case 55:
                return _context.abrupt('return', ret);

              case 56:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[23, 40, 44, 52], [45,, 47, 51]]);
      }));

      function preload() {
        return _ref.apply(this, arguments);
      }

      return preload;
    }()
  }, {
    key: 'layer',
    value: function layer() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { handleEvent: true };

      if (typeof opts === 'number') {
        opts = { zIndex: opts };
      }
      if (!this.hasLayer(id)) {
        var zIndex = 0;
        if (opts.zIndex != null) {
          zIndex = opts.zIndex;
          delete opts.zIndex;
        }
        var layer = new _layer2.default(id, opts);
        this.appendLayer(layer, zIndex);
      }

      return this[_layerMap][id];
    }
  }, {
    key: 'appendLayer',
    value: function appendLayer(layer) {
      var zIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var id = layer.id;

      if (this.hasLayer(id) && this[_layerMap][id] !== layer) {
        throw new Error('layer ' + id + ' already exists! remove first...');
      }

      this.removeLayer(layer);

      this[_layerMap][id] = layer;
      layer.connect(this, this[_zOrder]++, zIndex);

      sortLayer(this);
      return layer;
    }
  }, {
    key: 'removeLayer',
    value: function removeLayer(layer) {
      var layerID = void 0;
      if (typeof layer === 'string') {
        layerID = layer;
        layer = this[_layerMap][layer];
      } else {
        layerID = layer.id;
      }

      if (this.hasLayer(layer)) {
        layer.disconnect(this);
        delete this[_layerMap][layerID];
        sortLayer(this);
        return layer;
      }

      return null;
    }
  }, {
    key: 'hasLayer',
    value: function hasLayer(layer) {
      var layerID = void 0;
      if (typeof layer === 'string') {
        layerID = layer;
        layer = this[_layerMap][layer];
      } else {
        layerID = layer.id;
      }
      return layer && this[_layerMap][layerID] === layer;
    }
  }, {
    key: 'distortion',
    get: function get() {
      return this.viewport[1] * this.resolution[0] / (this.viewport[0] * this.resolution[1]);
    }
  }]);
  return Paper;
}();

var paper = {
  Paper2D: function Paper2D() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return new (Function.prototype.bind.apply(Paper, [null].concat((0, _toConsumableArray3.default)(args))))();
  }
};

exports.default = paper;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = __webpack_require__(231);
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(114)))

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(118);

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(7);
var bind = __webpack_require__(89);
var Axios = __webpack_require__(120);
var defaults = __webpack_require__(60);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(86);
axios.CancelToken = __webpack_require__(119);
axios.isCancel = __webpack_require__(87);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(134);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(86);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(60);
var utils = __webpack_require__(7);
var InterceptorManager = __webpack_require__(121);
var dispatchRequest = __webpack_require__(122);
var isAbsoluteURL = __webpack_require__(130);
var combineURLs = __webpack_require__(128);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(7);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(7);
var transformData = __webpack_require__(125);
var isCancel = __webpack_require__(87);
var defaults = __webpack_require__(60);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(88);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(7);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(7);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(7);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(7);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(7);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(7);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(18);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(25);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(23);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(24);

var _inherits3 = _interopRequireDefault(_inherits2);

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = __webpack_require__(11);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _entries = __webpack_require__(22);

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = __webpack_require__(21);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _spriteAnimator = __webpack_require__(43);

var _matrix = __webpack_require__(61);

var _matrix2 = _interopRequireDefault(_matrix);

var _utils = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultEffect = _spriteAnimator.Effects.default;

function arrayEffect(arr1, arr2, p, start, end) {
  if (Array.isArray(arr1)) {
    return arr1.map(function (o, i) {
      return defaultEffect(o, arr2[i], p, start, end);
    });
  }
  return defaultEffect(arr1, arr2, p, start, end);
}

function transformMatrix(trans) {
  if (Array.isArray(trans)) {
    return trans;
  }
  var transform = new _matrix2.default();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(trans)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

      var key = _ref2[0];
      var value = _ref2[1];

      if (Array.isArray(value)) {
        transform[key].apply(transform, (0, _toConsumableArray3.default)(value));
      } else {
        transform[key](value);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return transform;
}

function objectEffect(obj1, obj2, p, start, end) {
  var t1 = (0, _assign2.default)({}, obj2, obj1),
      t2 = (0, _assign2.default)({}, obj1, obj2);

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _getIterator3.default)((0, _entries2.default)(t1)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _ref3 = _step2.value;

      var _ref4 = (0, _slicedToArray3.default)(_ref3, 2);

      var key = _ref4[0];
      var value = _ref4[1];

      t1[key] = arrayEffect(value, t2[key], p, start, end);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return t1;
}

function transformEffect(trans1, trans2, p, start, end) {
  trans1 = (0, _utils.parseStringTransform)(trans1);
  trans2 = (0, _utils.parseStringTransform)(trans2);

  if (Array.isArray(trans1) || Array.isArray(trans2)) {
    trans1 = transformMatrix(trans1);
    trans2 = transformMatrix(trans2);
    return arrayEffect(trans1, trans2, p, start, end);
  }
  return objectEffect(trans1, trans2, p, start, end);
}

function colorEffect(color1, color2, p, start, end) {
  color1 = (0, _utils.parseColor)(color1);
  color2 = (0, _utils.parseColor)(color2);

  return objectEffect(color1, color2, p, start, end);
}

(0, _assign2.default)(_spriteAnimator.Effects, {
  pos: arrayEffect,
  size: arrayEffect,
  transform: transformEffect,
  bgcolor: colorEffect,
  border: function border(v1, v2, p, start, end) {
    return [defaultEffect(v1[0], v2[0], p, start, end), colorEffect(v1[1], v2[1], p, start, end)];
  },

  scale: arrayEffect,
  translate: arrayEffect,
  skew: arrayEffect,
  zIndex: function zIndex(v1, v2, p, start, end) {
    return Math.round(defaultEffect(v1, v2, p, start, end));
  },

  color: colorEffect
});

var _default = function (_Animator) {
  (0, _inherits3.default)(_default, _Animator);

  function _default(sprite, frames, timing) {
    (0, _classCallCheck3.default)(this, _default);

    var _this = (0, _possibleConstructorReturn3.default)(this, (_default.__proto__ || (0, _getPrototypeOf2.default)(_default)).call(this, sprite.attr(), frames, timing));

    _this.target = sprite;
    return _this;
  }

  (0, _createClass3.default)(_default, [{
    key: 'play',
    value: function play() {
      if (!this.target.parent || this.playState === 'running') {
        return;
      }

      (0, _get3.default)(_default.prototype.__proto__ || (0, _getPrototypeOf2.default)(_default.prototype), 'play', this).call(this);

      var sprite = this.target,
          layer = sprite.parent;

      if (!layer) {
        throw new Error('no context');
      }

      sprite.attr(this.frame);

      var that = this;
      this.ready.then(function () {
        requestAnimationFrame(function update() {
          if (that.playState === 'idle') return;
          sprite.attr(that.frame);
          if (that.playState === 'running') {
            requestAnimationFrame(update);
          } else if (that.playState === 'paused') {
            that.ready.then(function () {
              requestAnimationFrame(update);
            });
          }
        });
      });
    }

    // 防止异步设置了不该设置的属性

  }, {
    key: 'cancel',
    value: function cancel() {
      (0, _get3.default)(_default.prototype.__proto__ || (0, _getPrototypeOf2.default)(_default.prototype), 'cancel', this).call(this);
      this.target.attr(this.frame);
    }
  }, {
    key: 'playState',
    get: function get() {
      if (!this.target.parent) {
        return 'idle';
      }
      return (0, _get3.default)(_default.prototype.__proto__ || (0, _getPrototypeOf2.default)(_default.prototype), 'playState', this);
    }
  }]);
  return _default;
}(_spriteAnimator.Animator);

exports.default = _default;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = __webpack_require__(31);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _toConsumableArray2 = __webpack_require__(11);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _entries = __webpack_require__(22);

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = __webpack_require__(21);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _stringify = __webpack_require__(62);

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = __webpack_require__(45);

var _typeof3 = _interopRequireDefault(_typeof2);

var _map = __webpack_require__(30);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = __webpack_require__(10);

var _symbol2 = _interopRequireDefault(_symbol);

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _desc, _value, _class;

var _decorators = __webpack_require__(20);

var _matrix = __webpack_require__(61);

var _matrix2 = _interopRequireDefault(_matrix);

var _utils = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var Immutable = __webpack_require__(228).static;
var _attr = (0, _symbol2.default)('attr'),
    _temp = (0, _symbol2.default)('store'),
    _subject = (0, _symbol2.default)('subject');

var SpriteAttr = (_dec = (0, _decorators.parseValue)(_utils.parseStringFloat, _utils.oneOrTwoValues), _dec2 = (0, _decorators.parseValue)(_utils.parseStringInt), _dec3 = (0, _decorators.attr)('repaint'), _dec4 = (0, _decorators.parseValue)(_utils.parseColorString), _dec5 = (0, _decorators.attr)('repaint'), _dec6 = (0, _decorators.attr)('repaint'), _dec7 = (0, _decorators.parseValue)(_utils.parseStringInt), _dec8 = (0, _decorators.attr)('repaint'), _dec9 = (0, _decorators.attr)('repaint'), _dec10 = (0, _decorators.parseValue)(_utils.parseStringInt, _utils.fourValuesShortCut), _dec11 = (0, _decorators.attr)('repaint'), _dec12 = (0, _decorators.parseValue)(_utils.parseStringTransform), _dec13 = (0, _decorators.attr)('repaint'), (_class = function () {
  function SpriteAttr(subject) {
    (0, _classCallCheck3.default)(this, SpriteAttr);

    this[_subject] = subject;
    this[_attr] = Immutable({
      anchor: [0, 0],
      x: 0,
      y: 0,
      opacity: 1,
      width: '',
      height: '',
      bgcolor: '',
      rotate: 0,
      scale: [1, 1],
      translate: [0, 0],
      skew: [0, 0],
      transform: [1, 0, 0, 1, 0, 0],
      border: '',
      borderRadius: 0,
      padding: [0, 0, 0, 0],
      zIndex: 0,
      offsetRotate: 'auto',
      linearGradients: {}
    });
    this[_temp] = new _map2.default(); // save non-serialized values
  }

  (0, _createClass3.default)(SpriteAttr, [{
    key: 'getAttrState',
    value: function getAttrState() {
      return this[_attr];
    }
  }, {
    key: 'saveObj',
    value: function saveObj(key, val) {
      this[_temp].set(key, val);
    }
  }, {
    key: 'loadObj',
    value: function loadObj(key) {
      return this[_temp].get(key);
    }
  }, {
    key: 'set',
    value: function set(key, val) {
      this[_attr] = Immutable.set(this[_attr], key, val);
    }
  }, {
    key: 'get',
    value: function get(key) {
      var obj = this[_attr][key];

      if (obj && (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object') {
        return Immutable.asMutable(obj, { deep: true });
      }
      return obj;
    }
  }, {
    key: 'clearCache',
    value: function clearCache() {
      if (this.subject) {
        this.subject.cache = null;
      }
      return this;
    }
  }, {
    key: 'forceUpdate',
    value: function forceUpdate(clearCache) {
      if (this.subject) {
        this.subject.forceUpdate(clearCache);
      }

      return this;
    }
  }, {
    key: 'merge',
    value: function merge(attrs) {
      if (typeof attrs === 'string') {
        attrs = JSON.parse(attrs);
      }

      this[_attr] = Immutable.merge(this[_attr], attrs);

      return this;
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      var attrs = (0, _assign2.default)({}, this[_attr]);
      return (0, _stringify2.default)(attrs);
    }
  }, {
    key: 'resetOffset',
    value: function resetOffset() {
      var offsetPath = this.get('offsetPath');
      var dis = this.offsetDistance;

      if (offsetPath) {
        var pathObj = this.loadObj('offsetPath');
        if (pathObj) {
          offsetPath = pathObj;
        } else {
          offsetPath = (0, _utils.createPath)(offsetPath);
          this.saveObj('offsetPath', offsetPath);
        }
      }

      if (offsetPath != null) {
        var len = dis * offsetPath.getTotalLength(),
            _offsetPath$getPointA = offsetPath.getPointAtLength(len),
            x = _offsetPath$getPointA.x,
            y = _offsetPath$getPointA.y;


        var angle = this.offsetRotate;
        if (angle === 'auto' || angle === 'reverse') {
          var delta = offsetPath.getPointAtLength(angle === 'auto' ? len + 1 : len - 1);
          var x1 = delta.x,
              y1 = delta.y;

          angle = 180 * Math.atan2(y1 - y, x1 - x) / Math.PI;

          if (this.offsetRotate === 'reverse') {
            angle = -angle;
          }
        }

        var offsetAngle = this.get('offsetAngle');

        if (offsetAngle) {
          this.rotate -= offsetAngle;
        }

        this.set('offsetAngle', angle);
        this.rotate += angle;

        var offsetPoint = this.get('offsetPoint');
        if (offsetPoint) {
          this.pos = [this.x - offsetPoint[0], this.y - offsetPoint[1]];
        }

        this.set('offsetPoint', [x, y]);
        this.pos = [this.x + x, this.y + y];
      }
    }
  }, {
    key: 'subject',
    get: function get() {
      return this[_subject];
    }
  }, {
    key: 'anchor',
    set: function set(val) {
      this.set('anchor', val);
    },
    get: function get() {
      return this.get('anchor');
    }
  }, {
    key: 'x',
    set: function set(val) {
      this.set('x', Math.round(val));
    },
    get: function get() {
      return this.get('x');
    }
  }, {
    key: 'y',
    set: function set(val) {
      this.set('y', Math.round(val));
    },
    get: function get() {
      return this.get('y');
    }
  }, {
    key: 'pos',
    set: function set(val) {
      var _val = (0, _slicedToArray3.default)(val, 2),
          x = _val[0],
          y = _val[1];

      this.x = x;
      this.y = y;
    },
    get: function get() {
      return [this.x, this.y];
    }
  }, {
    key: 'bgcolor',
    set: function set(val) {
      this.set('bgcolor', val);
    },
    get: function get() {
      return this.get('bgcolor');
    }
  }, {
    key: 'opacity',
    set: function set(val) {
      this.set('opacity', val);
    },
    get: function get() {
      return this.get('opacity');
    }
  }, {
    key: 'width',
    set: function set(val) {
      this.set('width', Math.round(val));
    },
    get: function get() {
      return this.get('width');
    }
  }, {
    key: 'height',
    set: function set(val) {
      this.set('height', Math.round(val));
    },
    get: function get() {
      return this.get('height');
    }
  }, {
    key: 'size',
    set: function set(val) {
      var _val2 = (0, _slicedToArray3.default)(val, 2),
          width = _val2[0],
          height = _val2[1];

      this.width = width;
      this.height = height;
    },
    get: function get() {
      return [this.width, this.height];
    }
  }, {
    key: 'border',
    set: function set(val) {
      var _val3 = (0, _slicedToArray3.default)(val, 2),
          width = _val3[0],
          color = _val3[1];

      this.set('border', [width, (0, _utils.parseColorString)(color)]);
    },
    get: function get() {
      return this.get('border') || [0, 'rgba(0,0,0,0)'];
    }
  }, {
    key: 'padding',
    set: function set(val) {
      this.set('padding', val);
    },
    get: function get() {
      return this.get('padding');
    }
  }, {
    key: 'borderRadius',
    set: function set(val) {
      this.set('borderRadius', val);
    },
    get: function get() {
      return this.get('borderRadius');
    }

    // transform attributes

  }, {
    key: 'transform',
    set: function set(val) {
      /*
        rotate: 0,
        scale: [1, 1],
        translate: [0, 0],
        skew: [0, 0],
        matrix: [1,0,0,1,0,0],
       */
      this.merge({
        rotate: 0,
        scale: [1, 1],
        translate: [0, 0],
        skew: [0, 0]
      });

      if (Array.isArray(val)) {
        this.set('transform', val);
        this.set('transformStr', 'matrix(' + val + ')');
      } else {
        this.set('transform', [1, 0, 0, 1, 0, 0]);
        var transformStr = [];

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(val)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;

            var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

            var key = _ref2[0];
            var value = _ref2[1];

            if (key === 'matrix' && Array.isArray(value)) {
              this.set('transform', new _matrix2.default(value).m);
            } else {
              this[key] = value;
            }
            transformStr.push(key + '(' + value + ')');
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        this.set('transformStr', transformStr.join(' '));
      }
    },
    get: function get() {
      return this.get('transformStr') || 'matrix(1,0,0,1,0,0)';
    }
  }, {
    key: 'rotate',
    set: function set(val) {
      var delta = this.get('rotate') - val;
      this.set('rotate', val);
      var transform = new _matrix2.default(this.get('transform')).rotate(-delta);
      this.set('transform', transform.m);
    },
    get: function get() {
      return this.get('rotate');
    }
  }, {
    key: 'scale',
    set: function set(val) {
      val = (0, _utils.oneOrTwoValues)(val);
      var oldVal = this.get('scale');
      var delta = [val[0] / oldVal[0], val[1] / oldVal[1]];
      this.set('scale', val);

      var offsetAngle = this.get('offsetAngle');
      if (offsetAngle) {
        this.rotate -= offsetAngle;
      }

      var transform = new _matrix2.default(this.get('transform'));
      transform.scale.apply(transform, delta);
      this.set('transform', transform.m);

      if (offsetAngle) {
        this.rotate += offsetAngle;
      }
    },
    get: function get() {
      return this.get('scale');
    }
  }, {
    key: 'translate',
    set: function set(val) {
      var oldVal = this.get('translate');
      var delta = [val[0] - oldVal[0], val[1] - oldVal[1]];
      this.set('translate', val);
      var transform = new _matrix2.default(this.get('transform'));
      transform.translate.apply(transform, delta);
      this.set('transform', transform.m);
    },
    get: function get() {
      return this.get('translate');
    }
  }, {
    key: 'skew',
    set: function set(val) {
      var _ref3, _transform$multiply;

      var oldVal = this.get('skew');
      var invm = (_ref3 = new _matrix2.default()).skew.apply(_ref3, (0, _toConsumableArray3.default)(oldVal)).inverse();
      this.set('skew', val);
      var transform = new _matrix2.default(this.get('transform'));
      (_transform$multiply = transform.multiply(invm)).skew.apply(_transform$multiply, (0, _toConsumableArray3.default)(val));
      this.set('transform', transform.m);
    },
    get: function get() {
      return this.get('skew');
    }
  }, {
    key: 'zIndex',
    set: function set(val) {
      this.set('zIndex', val);
    },
    get: function get() {
      return this.get('zIndex');
    }

    /**
      linearGradients : {
        bgcolor: {
          direction: 30,  //angle，[0,360)
          colors: [
            {offset: 0, color: 'red'},
            {offset: 1, color: 'black'}
          ]
        }
      }
     */

  }, {
    key: 'linearGradients',
    set: function set(val) {
      this.set('linearGradients', val);
    },
    get: function get() {
      return this.get('linearGradients');
    }
  }, {
    key: 'offsetPath',
    set: function set(val) {
      var offsetPath = (0, _utils.createPath)(val);

      this.set('offsetPath', offsetPath.getAttribute('d'));
      this.saveObj('offsetPath', offsetPath);
      this.resetOffset();
    },
    get: function get() {
      return this.get('offsetPath');
    }
  }, {
    key: 'offsetDistance',
    set: function set(val) {
      this.set('offsetDistance', val);
      this.resetOffset();
    },
    get: function get() {
      return this.get('offsetDistance') || 0;
    }
  }, {
    key: 'offsetRotate',
    set: function set(val) {
      this.set('offsetRotate', val);
      this.resetOffset();
    },
    get: function get() {
      return this.get('offsetRotate');
    }
  }]);
  return SpriteAttr;
}(), (_applyDecoratedDescriptor(_class.prototype, 'anchor', [_decorators.attr, _dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'anchor'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'x', [_decorators.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'x'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'y', [_decorators.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'y'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'pos', [_decorators.attr, _dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'pos'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'bgcolor', [_dec3, _dec4], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'bgcolor'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'opacity', [_decorators.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'opacity'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'width', [_dec5], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'width'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'height', [_dec6], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'height'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'size', [_decorators.attr, _dec7], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'size'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'border', [_dec8], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'border'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'padding', [_dec9, _dec10], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'padding'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'borderRadius', [_dec11], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'borderRadius'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'transform', [_decorators.attr, _dec12], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'transform'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'rotate', [_decorators.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'rotate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'scale', [_decorators.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'scale'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'translate', [_decorators.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'translate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'skew', [_decorators.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'skew'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'zIndex', [_decorators.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'zIndex'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'linearGradients', [_dec13], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'linearGradients'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'offsetPath', [_decorators.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'offsetPath'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'offsetDistance', [_decorators.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'offsetDistance'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'offsetRotate', [_decorators.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'offsetRotate'), _class.prototype)), _class));
exports.default = SpriteAttr;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _entries = __webpack_require__(22);

var _entries2 = _interopRequireDefault(_entries);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _utils = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  blur: function blur(px) {
    return 'blur(' + (0, _utils.appendUnit)(px) + ')';
  },
  brightness: function brightness(percent) {
    return 'brightness(' + percent + ')';
  },
  contrast: function contrast(percent) {
    return 'contrast(' + percent + ')';
  },
  dropShadow: function dropShadow(_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 4),
        offsetX = _ref2[0],
        offsetY = _ref2[1],
        shadowRadius = _ref2[2],
        color = _ref2[3];

    return 'drop-shadow(' + (0, _utils.appendUnit)(offsetX) + ' ' + (0, _utils.appendUnit)(offsetY) + ' ' + (0, _utils.appendUnit)(shadowRadius) + ' ' + color + ')';
  },
  grayscale: function grayscale(percent) {
    return 'grayscale(' + percent + ')';
  },
  hueRotate: function hueRotate(value) {
    return 'hue-rotate(' + (0, _utils.appendUnit)(value, 'deg') + ')';
  },
  invert: function invert(percent) {
    return 'invert(' + percent + ')';
  },
  opacity: function opacity(percent) {
    return 'opacity(' + percent + ')';
  },
  saturate: function saturate(percent) {
    return 'saturate(' + percent + ')';
  },
  sepia: function sepia(percent) {
    return 'sepia(' + percent + ')';
  },
  url: function url(path) {
    return 'url(' + path + ')';
  },
  compile: function compile() {
    var _this = this;

    var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return (0, _entries2.default)(filter).reduce(function (accumulator, curVal) {
      return accumulator.concat(_this[curVal[0]](curVal[1]));
    }, []).join(' ');
  }
}; // http://www.runoob.com/cssref/css3-pr-filter.html

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Effects = exports.createNode = exports.registerNodeType = exports.Axis = exports.Color = exports.Path = exports.Label = exports.Resource = exports.Paper2D = exports.Sprite = exports.BaseSprite = undefined;

var _basesprite = __webpack_require__(35);

var _basesprite2 = _interopRequireDefault(_basesprite);

var _sprite = __webpack_require__(59);

var _sprite2 = _interopRequireDefault(_sprite);

var _label = __webpack_require__(55);

var _label2 = _interopRequireDefault(_label);

var _paper = __webpack_require__(115);

var _paper2 = _interopRequireDefault(_paper);

var _resource = __webpack_require__(58);

var _resource2 = _interopRequireDefault(_resource);

var _path = __webpack_require__(57);

var _path2 = _interopRequireDefault(_path);

var _utils = __webpack_require__(9);

var _axis = __webpack_require__(84);

var _axis2 = _interopRequireDefault(_axis);

var _nodetype = __webpack_require__(56);

var _spriteAnimator = __webpack_require__(43);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Paper2D = _paper2.default.Paper2D,
    Color = _utils.parseColor;
exports.BaseSprite = _basesprite2.default;
exports.Sprite = _sprite2.default;
exports.Paper2D = Paper2D;
exports.Resource = _resource2.default;
exports.Label = _label2.default;
exports.Path = _path2.default;
exports.Color = Color;
exports.Axis = _axis2.default;
exports.registerNodeType = _nodetype.registerNodeType;
exports.createNode = _nodetype.createNode;
exports.Effects = _spriteAnimator.Effects;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(11);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = __webpack_require__(46);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(44);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _entries = __webpack_require__(22);

var _entries2 = _interopRequireDefault(_entries);

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = __webpack_require__(21);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _set = __webpack_require__(92);

var _set2 = _interopRequireDefault(_set);

var _getPrototypeOf = __webpack_require__(18);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(25);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(23);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(24);

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = __webpack_require__(10);

var _symbol2 = _interopRequireDefault(_symbol);

var _basenode = __webpack_require__(90);

var _basenode2 = _interopRequireDefault(_basenode);

var _utils = __webpack_require__(9);

var _spriteAnimator = __webpack_require__(43);

var _sprite = __webpack_require__(59);

var _sprite2 = _interopRequireDefault(_sprite);

var _label = __webpack_require__(55);

var _label2 = _interopRequireDefault(_label);

var _path = __webpack_require__(57);

var _path2 = _interopRequireDefault(_path);

var _axis = __webpack_require__(84);

var _axis2 = _interopRequireDefault(_axis);

var _nodetype = __webpack_require__(56);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _children = (0, _symbol2.default)('children'),
    _updateSet = (0, _symbol2.default)('updateSet'),
    _zOrder = (0, _symbol2.default)('zOrder'),
    _state = (0, _symbol2.default)('state'),
    _tRecord = (0, _symbol2.default)('tRecord'),
    _timeline = (0, _symbol2.default)('_timeline');

(0, _nodetype.registerNodeType)('sprite', _sprite2.default);
(0, _nodetype.registerNodeType)('label', _label2.default);
(0, _nodetype.registerNodeType)('path', _path2.default);
(0, _nodetype.registerNodeType)('axis', _axis2.default);

var Layer = function (_BaseNode) {
  (0, _inherits3.default)(Layer, _BaseNode);

  function Layer(id, _ref) {
    var handleEvent = _ref.handleEvent,
        evaluateFPS = _ref.evaluateFPS,
        renderMode = _ref.renderMode;
    (0, _classCallCheck3.default)(this, Layer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Layer.__proto__ || (0, _getPrototypeOf2.default)(Layer)).call(this));

    _this.handleEvent = handleEvent !== false;
    _this.evaluateFPS = !!evaluateFPS;

    // renderMode: repaintAll | repaintDirty
    _this.renderMode = renderMode || 'repaintAll';

    var canvas = document.createElement('canvas');
    canvas.dataset.layerId = id;
    canvas.style.position = 'absolute';
    canvas.style.left = 0;
    canvas.style.top = 0;

    var shadowCanvas = canvas.cloneNode(true);
    _this.shadowContext = shadowCanvas.getContext('2d');
    _this.outputContext = canvas.getContext('2d');

    _this[_children] = [];
    _this[_updateSet] = new _set2.default();
    _this[_zOrder] = 0;
    _this[_tRecord] = []; // calculate FPS
    _this[_state] = {};
    _this[_timeline] = new _spriteAnimator.Timeline();

    // d3-friendly
    _this.namespaceURI = 'http://spritejs.org/layer';
    var that = _this;
    _this.ownerDocument = {
      createElementNS: function createElementNS(uri, name) {
        var sprite = (0, _nodetype.createNode)(name);
        if (sprite) {
          return that.appendChild(sprite);
        }
        return null;
      }
    };

    _this.updateResolution();
    return _this;
  }

  (0, _createClass3.default)(Layer, [{
    key: 'getElementById',
    value: function getElementById(id) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(this[_children]), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var child = _step.value;

          if (child.id === id) {
            return child;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return null;
    }
  }, {
    key: 'getElementsByName',
    value: function getElementsByName(name) {
      return this[_children].filter(function (c) {
        return c.name === name;
      });
    }

    /*
      d3-friendly
      *, nodeType, checker
    */

  }, {
    key: 'querySelector',
    value: function querySelector(selector) {
      if (!selector || selector === '*') {
        return this[_children][0];
      } else if (typeof selector === 'string') {
        // querySelector('nodeType')
        // querySelector('#id')
        // querySelector(':name')
        if (selector.startsWith('#')) {
          return this.getElementById(selector.slice(1));
        }
        if (selector.startsWith(':')) {
          var name = selector.slice(1);
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = (0, _getIterator3.default)(this[_children]), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var child = _step2.value;

              if (child.name === name) {
                return child;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          return null;
        }
        var nodeType = (0, _nodetype.getNodeType)(selector);
        if (nodeType) {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = (0, _getIterator3.default)(this[_children]), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _child = _step3.value;

              if (_child instanceof nodeType) {
                return _child;
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          return null;
        }
        return null;
      }
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = (0, _getIterator3.default)(this[_children]), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _child2 = _step4.value;
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = (0, _getIterator3.default)((0, _entries2.default)(selector)), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var _ref2 = _step5.value;

              var _ref3 = (0, _slicedToArray3.default)(_ref2, 2);

              var type = _ref3[0];
              var checker = _ref3[1];

              var _nodeType = (0, _nodetype.getNodeType)(type);
              if (_nodeType && _child2 instanceof _nodeType && checker.call(this, _child2)) {
                return _child2;
              }
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return null;
    }
  }, {
    key: 'querySelectorAll',
    value: function querySelectorAll(selector) {
      var _this2 = this;

      if (!selector || selector === '*') {
        return this[_children];
      } else if (typeof selector === 'string') {
        if (selector.startsWith('#')) {
          var sprite = this.getElementById(selector.slice(1));
          return sprite ? [sprite] : [];
        }
        if (selector.startsWith(':')) {
          return this.getElementsByName(selector.slice(1));
        }
        var nodeType = (0, _nodetype.getNodeType)(selector);
        if (nodeType) {
          return this[_children].filter(function (child) {
            return child instanceof nodeType;
          });
        }
        return null;
      }
      return this[_children].filter(function (child) {
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = (0, _getIterator3.default)((0, _entries2.default)(selector)), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var _ref4 = _step6.value;

            var _ref5 = (0, _slicedToArray3.default)(_ref4, 2);

            var type = _ref5[0];
            var checker = _ref5[1];

            var _nodeType2 = (0, _nodetype.getNodeType)(type);
            if (!_nodeType2 || !(child instanceof _nodeType2)) {
              return false;
            }

            if (!checker.call(_this2, child)) {
              return false;
            }
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }

        return true;
      });
    }
  }, {
    key: 'insertBefore',
    value: function insertBefore(newchild, refchild) {
      var idx = this[_children].indexOf(refchild);
      if (idx >= 0) {
        this.removeChild(newchild);
        this[_children].splice(idx, 0, newchild);
        newchild.connect(this, refchild.zOrder);
        this.update(newchild);

        for (var i = idx + 1; i < this[_children].length; i++) {
          var child = this[_children][i],
              zOrder = child.zOrder + 1;

          delete child.zOrder;
          Object.defineProperty(this, 'zOrder', {
            value: zOrder,
            writable: false,
            configurable: true
          });

          this.update(child);
        }

        this[_zOrder]++;
      }

      return newchild;
    }
  }, {
    key: 'isDirty',
    value: function isDirty(target) {
      return this[_updateSet].has(target);
    }
  }, {
    key: 'prepareRender',
    value: function prepareRender() {
      if (!this[_state].prepareRender) {
        this[_state].prepareRender = true;

        var that = this,
            _dispatchEvent = (0, _get3.default)(Layer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Layer.prototype), 'dispatchEvent', this);
        requestAnimationFrame(function () {
          var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(t) {
            var renderer;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (parent) {
                      _context.next = 3;
                      break;
                    }

                    // already removed from paper
                    that[_state].prepareRender = false;
                    return _context.abrupt('return');

                  case 3:

                    if (that.evaluateFPS) {
                      that[_tRecord].push(t);
                      that[_tRecord] = that[_tRecord].slice(-10);
                    }

                    renderer = void 0;

                    if (!(that.renderMode === 'repaintDirty')) {
                      _context.next = 9;
                      break;
                    }

                    renderer = that.renderRepaintDirty.bind(that);
                    _context.next = 14;
                    break;

                  case 9:
                    if (!(that.renderMode === 'repaintAll')) {
                      _context.next = 13;
                      break;
                    }

                    renderer = that.renderRepaintAll.bind(that);
                    _context.next = 14;
                    break;

                  case 13:
                    throw new Error('unknown render mode!');

                  case 14:
                    if (!that[_updateSet].size) {
                      _context.next = 18;
                      break;
                    }

                    _context.next = 17;
                    return renderer(t);

                  case 17:

                    if (that.handleEvent) {
                      _dispatchEvent.call(that, 'update', { target: that, timeline: that.timeline, currentTime: that.timeline.currentTime }, true);
                    }

                  case 18:

                    if (that[_updateSet].size) {
                      requestAnimationFrame(step);
                    } else {
                      that[_state].prepareRender = false;
                    }

                  case 19:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function step(_x) {
            return _ref6.apply(this, arguments);
          }

          return step;
        }());
      }
    }
  }, {
    key: 'update',
    value: function update(target) {
      var parent = this.parent;

      // already removed from paper
      if (!parent) {
        this[_updateSet].clear();
        return;
      }
      if (target && this[_updateSet].has(target)) return;

      // invisible... return
      if (!target.lastRenderBox && !this.isVisible(target)) return;

      if (target) this[_updateSet].add(target);

      this.prepareRender();
    }
  }, {
    key: 'isVisible',
    value: function isVisible(sprite) {
      var opacity = sprite.attr('opacity');
      if (opacity <= 0) {
        return false;
      }

      var _sprite$offsetSize = (0, _slicedToArray3.default)(sprite.offsetSize, 2),
          width = _sprite$offsetSize[0],
          height = _sprite$offsetSize[1];

      if (width <= 0 || height <= 0) {
        return false;
      }

      var _resolution = (0, _slicedToArray3.default)(this.resolution, 2),
          maxWidth = _resolution[0],
          maxHeigth = _resolution[1];

      var box = sprite.renderBox;
      if (box[0] > maxWidth || box[1] > maxHeigth || box[2] < 0 || box[3] < 0) {
        return false;
      }

      return true;
    }
  }, {
    key: 'sortChildren',
    value: function sortChildren(children) {
      children.sort(function (a, b) {
        var a_zidx = a.attr('zIndex'),
            b_zidx = b.attr('zIndex');
        if (a_zidx === b_zidx) {
          return a.zOrder - b.zOrder;
        }
        return a_zidx - b_zidx;
      });
    }
  }, {
    key: 'drawSprites',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(shadowContext, renderEls, t) {
        var i, child, context, transform, pos, bound;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                i = 0;

              case 1:
                if (!(i < renderEls.length)) {
                  _context2.next = 27;
                  break;
                }

                child = renderEls[i];

                if (!(child.parent === this)) {
                  _context2.next = 24;
                  break;
                }

                if (!this.isVisible(child)) {
                  _context2.next = 23;
                  break;
                }

                context = child.cache;

                if (context) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 9;
                return child.render(t);

              case 9:
                context = _context2.sent;

                child.userRender(t, context);
                child.cache = context;

              case 12:

                if (this.handleEvent) {
                  child.dispatchEvent('update', { target: child, context: context, renderBox: child.renderBox, lastRenderBox: child.lastRenderBox }, true);
                }

                child.lastRenderBox = child.renderBox;

                transform = child.transform.m, pos = child.attr('pos'), bound = child.originRect;


                shadowContext.save();
                shadowContext.translate(pos[0], pos[1]);
                shadowContext.transform.apply(shadowContext, (0, _toConsumableArray3.default)(transform));
                shadowContext.globalAlpha = child.attr('opacity');
                shadowContext.drawImage(context.canvas, bound[0], bound[1]);
                shadowContext.restore();
                _context2.next = 24;
                break;

              case 23:
                // invisible, only need to remove lastRenderBox
                delete child.lastRenderBox;

              case 24:
                i++;
                _context2.next = 1;
                break;

              case 27:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function drawSprites(_x2, _x3, _x4) {
        return _ref7.apply(this, arguments);
      }

      return drawSprites;
    }()
  }, {
    key: 'renderRepaintAll',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(t) {
        var _this3 = this;

        var renderEls, _resolution2, width, height, shadowContext, outputContext, shadowCanvas;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                renderEls = this[_children].filter(function (e) {
                  return _this3.isVisible(e);
                });
                _resolution2 = (0, _slicedToArray3.default)(this.resolution, 2), width = _resolution2[0], height = _resolution2[1];
                shadowContext = this.shadowContext;
                outputContext = this.outputContext;
                shadowCanvas = shadowContext.canvas;


                shadowContext.clearRect(0, 0, width, height);
                outputContext.clearRect(0, 0, width, height);

                this.sortChildren(renderEls);
                _context3.next = 10;
                return this.drawSprites(shadowContext, renderEls, t);

              case 10:

                outputContext.drawImage(shadowCanvas, 0, 0);

                this[_updateSet].clear();

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function renderRepaintAll(_x5) {
        return _ref8.apply(this, arguments);
      }

      return renderRepaintAll;
    }()
  }, {
    key: 'renderRepaintDirty',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(t) {
        var _this4 = this;

        var _resolution3, width, height, updateSet, children, shadowContext, outputContext, shadowCanvas, restEls, affectedEls, unaffectedEls, i, unaffectedEl, affected, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, affectedEl, box1, box2, box3, changed, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, _affectedEl, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, _unaffectedEl, _box, _box2, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, updateEl, box, dirtyBox, dirtyRect, lastRenderBox, _dirtyRect, _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, _affectedEl2, _dirtyRect2, renderEls;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _resolution3 = (0, _slicedToArray3.default)(this.resolution, 2), width = _resolution3[0], height = _resolution3[1];
                updateSet = this[_updateSet];
                children = this[_children].filter(function (e) {
                  return _this4.isVisible(e);
                });
                shadowContext = this.shadowContext;
                outputContext = this.outputContext;
                shadowCanvas = shadowContext.canvas;
                restEls = children.filter(function (el) {
                  return !updateSet.has(el);
                });
                affectedEls = new _set2.default(), unaffectedEls = new _set2.default();
                i = 0;

              case 9:
                if (!(i < restEls.length)) {
                  _context4.next = 44;
                  break;
                }

                unaffectedEl = restEls[i];
                affected = false;
                _iteratorNormalCompletion7 = true;
                _didIteratorError7 = false;
                _iteratorError7 = undefined;
                _context4.prev = 15;
                _iterator7 = (0, _getIterator3.default)(updateSet);

              case 17:
                if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                  _context4.next = 26;
                  break;
                }

                affectedEl = _step7.value;
                box1 = affectedEl.renderBox, box2 = unaffectedEl.renderBox, box3 = affectedEl.lastRenderBox;

                if (!((0, _utils.boxIntersect)(box1, box2) || box3 && (0, _utils.boxIntersect)(box3, box2))) {
                  _context4.next = 23;
                  break;
                }

                affected = true;
                return _context4.abrupt('break', 26);

              case 23:
                _iteratorNormalCompletion7 = true;
                _context4.next = 17;
                break;

              case 26:
                _context4.next = 32;
                break;

              case 28:
                _context4.prev = 28;
                _context4.t0 = _context4['catch'](15);
                _didIteratorError7 = true;
                _iteratorError7 = _context4.t0;

              case 32:
                _context4.prev = 32;
                _context4.prev = 33;

                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                  _iterator7.return();
                }

              case 35:
                _context4.prev = 35;

                if (!_didIteratorError7) {
                  _context4.next = 38;
                  break;
                }

                throw _iteratorError7;

              case 38:
                return _context4.finish(35);

              case 39:
                return _context4.finish(32);

              case 40:
                if (affected) affectedEls.add(unaffectedEl);else unaffectedEls.add(unaffectedEl);

              case 41:
                i++;
                _context4.next = 9;
                break;

              case 44:
                if (!(affectedEls.size > 0 && unaffectedEls.size > 0)) {
                  _context4.next = 91;
                  break;
                }

                changed = void 0;

              case 46:
                changed = false;
                _iteratorNormalCompletion8 = true;
                _didIteratorError8 = false;
                _iteratorError8 = undefined;
                _context4.prev = 50;
                _iterator8 = (0, _getIterator3.default)(affectedEls);

              case 52:
                if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
                  _context4.next = 76;
                  break;
                }

                _affectedEl = _step8.value;
                _iteratorNormalCompletion9 = true;
                _didIteratorError9 = false;
                _iteratorError9 = undefined;
                _context4.prev = 57;

                for (_iterator9 = (0, _getIterator3.default)(unaffectedEls); !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                  _unaffectedEl = _step9.value;
                  _box = _affectedEl.renderBox, _box2 = _unaffectedEl.renderBox;


                  if ((0, _utils.boxIntersect)(_box, _box2)) {
                    affectedEls.add(_unaffectedEl);
                    unaffectedEls.delete(_unaffectedEl);
                    changed = true;
                  }
                }
                _context4.next = 65;
                break;

              case 61:
                _context4.prev = 61;
                _context4.t1 = _context4['catch'](57);
                _didIteratorError9 = true;
                _iteratorError9 = _context4.t1;

              case 65:
                _context4.prev = 65;
                _context4.prev = 66;

                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                  _iterator9.return();
                }

              case 68:
                _context4.prev = 68;

                if (!_didIteratorError9) {
                  _context4.next = 71;
                  break;
                }

                throw _iteratorError9;

              case 71:
                return _context4.finish(68);

              case 72:
                return _context4.finish(65);

              case 73:
                _iteratorNormalCompletion8 = true;
                _context4.next = 52;
                break;

              case 76:
                _context4.next = 82;
                break;

              case 78:
                _context4.prev = 78;
                _context4.t2 = _context4['catch'](50);
                _didIteratorError8 = true;
                _iteratorError8 = _context4.t2;

              case 82:
                _context4.prev = 82;
                _context4.prev = 83;

                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                  _iterator8.return();
                }

              case 85:
                _context4.prev = 85;

                if (!_didIteratorError8) {
                  _context4.next = 88;
                  break;
                }

                throw _iteratorError8;

              case 88:
                return _context4.finish(85);

              case 89:
                return _context4.finish(82);

              case 90:
                if (changed) {
                  _context4.next = 46;
                  break;
                }

              case 91:

                shadowContext.save();
                outputContext.save();

                shadowContext.beginPath();
                outputContext.beginPath();

                _iteratorNormalCompletion10 = true;
                _didIteratorError10 = false;
                _iteratorError10 = undefined;
                _context4.prev = 98;
                for (_iterator10 = (0, _getIterator3.default)(updateSet); !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                  updateEl = _step10.value;
                  box = updateEl.renderBox;
                  dirtyBox = (0, _utils.boxIntersect)(box, [0, 0, width, height]);


                  if (dirtyBox) {
                    dirtyRect = (0, _utils.boxToRect)(dirtyBox);


                    shadowContext.rect.apply(shadowContext, (0, _toConsumableArray3.default)(dirtyRect));
                    outputContext.rect.apply(outputContext, (0, _toConsumableArray3.default)(dirtyRect));
                  }

                  lastRenderBox = updateEl.lastRenderBox;

                  if (lastRenderBox && !(0, _utils.boxEqual)(lastRenderBox, box)) {
                    dirtyBox = (0, _utils.boxIntersect)(lastRenderBox, [0, 0, width, height]);

                    if (dirtyBox) {
                      _dirtyRect = (0, _utils.boxToRect)(dirtyBox);


                      shadowContext.rect.apply(shadowContext, (0, _toConsumableArray3.default)(_dirtyRect));
                      outputContext.rect.apply(outputContext, (0, _toConsumableArray3.default)(_dirtyRect));
                    }
                  }
                }

                _context4.next = 106;
                break;

              case 102:
                _context4.prev = 102;
                _context4.t3 = _context4['catch'](98);
                _didIteratorError10 = true;
                _iteratorError10 = _context4.t3;

              case 106:
                _context4.prev = 106;
                _context4.prev = 107;

                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                  _iterator10.return();
                }

              case 109:
                _context4.prev = 109;

                if (!_didIteratorError10) {
                  _context4.next = 112;
                  break;
                }

                throw _iteratorError10;

              case 112:
                return _context4.finish(109);

              case 113:
                return _context4.finish(106);

              case 114:
                _iteratorNormalCompletion11 = true;
                _didIteratorError11 = false;
                _iteratorError11 = undefined;
                _context4.prev = 117;
                for (_iterator11 = (0, _getIterator3.default)(affectedEls); !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                  _affectedEl2 = _step11.value;
                  box = _affectedEl2.renderBox;
                  dirtyBox = (0, _utils.boxIntersect)(box, [0, 0, width, height]);


                  if (dirtyBox) {
                    _dirtyRect2 = (0, _utils.boxToRect)(dirtyBox);


                    shadowContext.rect.apply(shadowContext, (0, _toConsumableArray3.default)(_dirtyRect2));
                    outputContext.rect.apply(outputContext, (0, _toConsumableArray3.default)(_dirtyRect2));
                  }
                }

                _context4.next = 125;
                break;

              case 121:
                _context4.prev = 121;
                _context4.t4 = _context4['catch'](117);
                _didIteratorError11 = true;
                _iteratorError11 = _context4.t4;

              case 125:
                _context4.prev = 125;
                _context4.prev = 126;

                if (!_iteratorNormalCompletion11 && _iterator11.return) {
                  _iterator11.return();
                }

              case 128:
                _context4.prev = 128;

                if (!_didIteratorError11) {
                  _context4.next = 131;
                  break;
                }

                throw _iteratorError11;

              case 131:
                return _context4.finish(128);

              case 132:
                return _context4.finish(125);

              case 133:
                shadowContext.clip();
                outputContext.clip();

                shadowContext.clearRect(0, 0, width, height);
                outputContext.clearRect(0, 0, width, height);

                renderEls = [].concat((0, _toConsumableArray3.default)(updateSet), (0, _toConsumableArray3.default)(affectedEls));


                this.sortChildren(renderEls);
                _context4.next = 141;
                return this.drawSprites(shadowContext, renderEls, t);

              case 141:

                outputContext.drawImage(shadowCanvas, 0, 0);

                shadowContext.restore();
                outputContext.restore();

                this[_updateSet].clear();

              case 145:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[15, 28, 32, 40], [33,, 35, 39], [50, 78, 82, 90], [57, 61, 65, 73], [66,, 68, 72], [83,, 85, 89], [98, 102, 106, 114], [107,, 109, 113], [117, 121, 125, 133], [126,, 128, 132]]);
      }));

      function renderRepaintDirty(_x6) {
        return _ref9.apply(this, arguments);
      }

      return renderRepaintDirty;
    }()
  }, {
    key: 'appendChild',
    value: function appendChild(sprite) {
      this.removeChild(sprite);
      this[_children].push(sprite);
      sprite.connect(this, this[_zOrder]++);
      this.update(sprite);
      return sprite;
    }
  }, {
    key: 'append',
    value: function append() {
      var _this5 = this;

      for (var _len = arguments.length, sprites = Array(_len), _key = 0; _key < _len; _key++) {
        sprites[_key] = arguments[_key];
      }

      sprites.forEach(function (sprite) {
        return _this5.appendChild(sprite);
      });
    }
  }, {
    key: 'removeChild',
    value: function removeChild(sprite) {
      var idx = this[_children].indexOf(sprite);
      if (idx === -1) {
        return null;
      }
      this[_children].splice(idx, 1);
      if (this.isVisible(sprite) || sprite.lastRenderBox) {
        sprite.forceUpdate();
      }
      sprite.disconnect(this);
      return sprite;
    }
  }, {
    key: 'remove',
    value: function remove() {
      var _this6 = this;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (args.length === 0) {
        args = this[_children].slice(0);
      }
      return args.map(function (child) {
        return _this6.removeChild(child);
      });
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      var layerX = evt.layerX,
          layerY = evt.layerY;

      var _resolution4 = (0, _slicedToArray3.default)(this.resolution, 2),
          width = _resolution4[0],
          height = _resolution4[1];

      if (layerX >= 0 && layerY >= 0 && layerX < width && layerY < height) {
        return [layerX, layerY];
      }
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(type, evt) {
      evt.layer = this;
      var sprites = this[_children].slice(0);
      sprites.sort(function (a, b) {
        var a_zidx = a.attr('zIndex'),
            b_zidx = b.attr('zIndex');

        if (a_zidx === b_zidx) {
          return b.zOrder - a.zOrder;
        }
        return b_zidx - a_zidx;
      });

      var targetSprites = [];
      for (var i = 0; i < sprites.length; i++) {
        var sprite = sprites[i];
        var hit = sprite.dispatchEvent(type, evt);
        if (hit) {
          targetSprites.push(sprite);
        }
      }

      evt.targetSprites = targetSprites;
      (0, _get3.default)(Layer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Layer.prototype), 'dispatchEvent', this).call(this, type, evt);
    }
  }, {
    key: 'updateResolution',
    value: function updateResolution() {
      if (!this.parent) return;

      var resolution = this.resolution,
          viewport = this.viewport;

      var container = this.parent.container,
          shadowCanvas = this.shadowContext.canvas,
          outputCanvas = this.outputContext.canvas;

      outputCanvas.width = resolution[0];
      outputCanvas.height = resolution[1];
      shadowCanvas.width = resolution[0];
      shadowCanvas.height = resolution[1];

      outputCanvas.style.width = viewport[0] + 'px';
      outputCanvas.style.height = viewport[1] + 'px';

      this.outputContext.clearRect(0, 0, resolution[0], resolution[1]);
      this.shadowContext.clearRect(0, 0, resolution[0], resolution[1]);

      if (container !== outputCanvas.parentNode) {
        container.appendChild(outputCanvas);
      }

      this[_children].forEach(function (child) {
        delete child.lastRenderBox;
        child.forceUpdate();
      });
    }
  }, {
    key: 'connect',
    value: function connect(parent, zOrder, zIndex) {
      (0, _get3.default)(Layer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Layer.prototype), 'connect', this).call(this, parent, zOrder);
      this.zIndex = zIndex;
      this.updateResolution();
      return this;
    }
  }, {
    key: 'disconnect',
    value: function disconnect(parent) {
      this.outputContext.canvas.remove();
      return (0, _get3.default)(Layer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Layer.prototype), 'disconnect', this).call(this, parent);
    }
  }, {
    key: 'timeline',
    get: function get() {
      return this[_timeline];
    }
  }, {
    key: 'canvas',
    get: function get() {
      return this.outputContext.canvas;
    }
  }, {
    key: 'container',
    get: function get() {
      return this.parent ? this.parent.container : null;
    }
  }, {
    key: 'resolution',
    get: function get() {
      return this.parent ? this.parent.resolution : [0, 0];
    }
  }, {
    key: 'viewport',
    get: function get() {
      return this.parent ? this.parent.viewport : [0, 0];
    }
  }, {
    key: 'id',
    get: function get() {
      return this.canvas.dataset.layerId;
    }
  }, {
    key: 'fps',
    get: function get() {
      if (!this.evaluateFPS) {
        return NaN;
      }
      var sum = 0;
      var tr = this[_tRecord].slice(-10);
      var len = tr.length;

      if (tr.length <= 5) {
        return NaN;
      }
      tr.reduceRight(function (a, b, i) {
        sum += i * (a - b);return b;
      });
      return Math.round(1000 * ((len - 1) * len / 2) / sum);
    }
  }, {
    key: 'zIndex',
    get: function get() {
      return this.outputContext.canvas.style.zIndex;
    },
    set: function set(zIndex) {
      this.outputContext.canvas.style.zIndex = zIndex;
    }
  }]);
  return Layer;
}(_basenode2.default);

exports.default = Layer;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/colinmeinke/svg-arc-to-cubic-bezier

var TAU = Math.PI * 2;

var mapToEllipse = function mapToEllipse(_ref, rx, ry, cosphi, sinphi, centerx, centery) {
  var x = _ref.x,
      y = _ref.y;

  x *= rx;
  y *= ry;

  var xp = cosphi * x - sinphi * y;
  var yp = sinphi * x + cosphi * y;

  return {
    x: xp + centerx,
    y: yp + centery
  };
};

var approxUnitArc = function approxUnitArc(ang1, ang2) {
  var a = 4 / 3 * Math.tan(ang2 / 4);

  var x1 = Math.cos(ang1);
  var y1 = Math.sin(ang1);
  var x2 = Math.cos(ang1 + ang2);
  var y2 = Math.sin(ang1 + ang2);

  return [{
    x: x1 - y1 * a,
    y: y1 + x1 * a
  }, {
    x: x2 + y2 * a,
    y: y2 - x2 * a
  }, {
    x: x2,
    y: y2
  }];
};

var vectorAngle = function vectorAngle(ux, uy, vx, vy) {
  var sign = ux * vy - uy * vx < 0 ? -1 : 1;
  var umag = Math.sqrt(ux * ux + uy * uy);
  var vmag = Math.sqrt(ux * ux + uy * uy);
  var dot = ux * vx + uy * vy;

  var div = dot / (umag * vmag);

  if (div > 1) {
    div = 1;
  }

  if (div < -1) {
    div = -1;
  }

  return sign * Math.acos(div);
};

var getArcCenter = function getArcCenter(px, py, cx, cy, rx, ry, largeArcFlag, sweepFlag, sinphi, cosphi, pxp, pyp) {
  var rxsq = Math.pow(rx, 2);
  var rysq = Math.pow(ry, 2);
  var pxpsq = Math.pow(pxp, 2);
  var pypsq = Math.pow(pyp, 2);

  var radicant = rxsq * rysq - rxsq * pypsq - rysq * pxpsq;

  if (radicant < 0) {
    radicant = 0;
  }

  radicant /= rxsq * pypsq + rysq * pxpsq;
  radicant = Math.sqrt(radicant) * (largeArcFlag === sweepFlag ? -1 : 1);

  var centerxp = radicant * rx / ry * pyp;
  var centeryp = radicant * -ry / rx * pxp;

  var centerx = cosphi * centerxp - sinphi * centeryp + (px + cx) / 2;
  var centery = sinphi * centerxp + cosphi * centeryp + (py + cy) / 2;

  var vx1 = (pxp - centerxp) / rx;
  var vy1 = (pyp - centeryp) / ry;
  var vx2 = (-pxp - centerxp) / rx;
  var vy2 = (-pyp - centeryp) / ry;

  var ang1 = vectorAngle(1, 0, vx1, vy1);
  var ang2 = vectorAngle(vx1, vy1, vx2, vy2);

  if (sweepFlag === 0 && ang2 > 0) {
    ang2 -= TAU;
  }

  if (sweepFlag === 1 && ang2 < 0) {
    ang2 += TAU;
  }

  return [centerx, centery, ang1, ang2];
};

var arcToBezier = function arcToBezier(_ref2) {
  var px = _ref2.px,
      py = _ref2.py,
      cx = _ref2.cx,
      cy = _ref2.cy,
      rx = _ref2.rx,
      ry = _ref2.ry,
      _ref2$xAxisRotation = _ref2.xAxisRotation,
      xAxisRotation = _ref2$xAxisRotation === undefined ? 0 : _ref2$xAxisRotation,
      _ref2$largeArcFlag = _ref2.largeArcFlag,
      largeArcFlag = _ref2$largeArcFlag === undefined ? 0 : _ref2$largeArcFlag,
      _ref2$sweepFlag = _ref2.sweepFlag,
      sweepFlag = _ref2$sweepFlag === undefined ? 0 : _ref2$sweepFlag;

  var curves = [];

  if (rx === 0 || ry === 0) {
    return [];
  }

  var sinphi = Math.sin(xAxisRotation * TAU / 360);
  var cosphi = Math.cos(xAxisRotation * TAU / 360);

  var pxp = cosphi * (px - cx) / 2 + sinphi * (py - cy) / 2;
  var pyp = -sinphi * (px - cx) / 2 + cosphi * (py - cy) / 2;

  if (pxp === 0 && pyp === 0) {
    return [];
  }

  rx = Math.abs(rx);
  ry = Math.abs(ry);

  var lambda = Math.pow(pxp, 2) / Math.pow(rx, 2) + Math.pow(pyp, 2) / Math.pow(ry, 2);

  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }

  var _getArcCenter = getArcCenter(px, py, cx, cy, rx, ry, largeArcFlag, sweepFlag, sinphi, cosphi, pxp, pyp),
      _getArcCenter2 = (0, _slicedToArray3.default)(_getArcCenter, 4),
      centerx = _getArcCenter2[0],
      centery = _getArcCenter2[1],
      ang1 = _getArcCenter2[2],
      ang2 = _getArcCenter2[3];

  var segments = Math.max(Math.ceil(Math.abs(ang2) / (TAU / 4)), 1);

  ang2 /= segments;

  for (var i = 0; i < segments; i++) {
    curves.push(approxUnitArc(ang1, ang2));
    ang1 += ang2;
  }

  return curves.map(function (curve) {
    var _mapToEllipse = mapToEllipse(curve[0], rx, ry, cosphi, sinphi, centerx, centery),
        x1 = _mapToEllipse.x,
        y1 = _mapToEllipse.y;

    var _mapToEllipse2 = mapToEllipse(curve[1], rx, ry, cosphi, sinphi, centerx, centery),
        x2 = _mapToEllipse2.x,
        y2 = _mapToEllipse2.y;

    var _mapToEllipse3 = mapToEllipse(curve[2], rx, ry, cosphi, sinphi, centerx, centery),
        x = _mapToEllipse3.x,
        y = _mapToEllipse3.y;

    return { x1: x1, y1: y1, x2: x2, y2: y2, x: x, y: y };
  });
};

exports.default = arcToBezier;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = function (pathA, pathB, p, s, e) {
  var ep = (p - s) / (e - s);
  if (ep <= 0) return pathA;
  if (ep >= 1) return pathB;
  return lerp(pathA, pathB, ep);
};

var _path2shapes = __webpack_require__(143);

var _path2shapes2 = _interopRequireDefault(_path2shapes);

var _sort = __webpack_require__(144);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/AlloyTeam/pasition

function _subShapes(shapes, count) {
  var _loop = function _loop(i) {
    var shape = shapes[shapes.length - 1];
    var newShape = [];
    var x = shape[0][0],
        y = shape[0][1];
    shape.forEach(function () {
      newShape.push([x, y, x, y, x, y, x, y]);
    });

    shapes.push(newShape);
  };

  for (var i = 0; i < count; i++) {
    _loop(i);
  }
}

function _upShapes(shapes, count) {
  var _loop2 = function _loop2(i) {
    var shape = shapes[shapes.length - 1];
    var newShape = [];

    shape.forEach(function (curve) {
      newShape.push(curve.slice(0));
    });
    shapes.push(newShape);
  };

  for (var i = 0; i < count; i++) {
    _loop2(i);
  }
}

function split(x1, y1, x2, y2, x3, y3, x4, y4, t) {
  return {
    left: _split(x1, y1, x2, y2, x3, y3, x4, y4, t),
    right: _split(x4, y4, x3, y3, x2, y2, x1, y1, 1 - t, true)
  };
}

function _split(x1, y1, x2, y2, x3, y3, x4, y4, t, reverse) {
  var x12 = (x2 - x1) * t + x1;
  var y12 = (y2 - y1) * t + y1;

  var x23 = (x3 - x2) * t + x2;
  var y23 = (y3 - y2) * t + y2;

  var x34 = (x4 - x3) * t + x3;
  var y34 = (y4 - y3) * t + y3;

  var x123 = (x23 - x12) * t + x12;
  var y123 = (y23 - y12) * t + y12;

  var x234 = (x34 - x23) * t + x23;
  var y234 = (y34 - y23) * t + y23;

  var x1234 = (x234 - x123) * t + x123;
  var y1234 = (y234 - y123) * t + y123;

  if (reverse) {
    return [x1234, y1234, x123, y123, x12, y12, x1, y1];
  }
  return [x1, y1, x12, y12, x123, y123, x1234, y1234];
}

function _splitCurves(curves, count) {
  var i = 0,
      index = 0;

  for (; i < count; i++) {
    var curve = curves[index];
    var cs = split(curve[0], curve[1], curve[2], curve[3], curve[4], curve[5], curve[6], curve[7], 0.5);
    curves.splice(index, 1);
    curves.splice(index, 0, cs.left, cs.right);

    index += 2;
    if (index >= curves.length - 1) {
      index = 0;
    }
  }
}

// 将两段 path 对齐
function match(pathA, pathB) {
  var minCurves = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

  var shapesA = (0, _path2shapes2.default)(pathA);
  var shapesB = (0, _path2shapes2.default)(pathB);

  var lenA = shapesA.length,
      lenB = shapesB.length;

  if (lenA > lenB) {
    _subShapes(shapesB, lenA - lenB);
  } else if (lenA < lenB) {
    _upShapes(shapesA, lenB - lenA);
  }

  shapesA = (0, _sort.sort)(shapesA, shapesB);

  shapesA.forEach(function (curves, index) {
    var lenA = curves.length,
        lenB = shapesB[index].length;

    if (lenA > lenB) {
      if (lenA < minCurves) {
        _splitCurves(curves, minCurves - lenA);
        _splitCurves(shapesB[index], minCurves - lenB);
      } else {
        _splitCurves(shapesB[index], lenA - lenB);
      }
    } else if (lenA < lenB) {
      if (lenB < minCurves) {
        _splitCurves(curves, minCurves - lenA);
        _splitCurves(shapesB[index], minCurves - lenB);
      } else {
        _splitCurves(curves, lenB - lenA);
      }
    }
  });

  shapesA.forEach(function (curves, index) {
    shapesA[index] = (0, _sort.sortCurves)(curves, shapesB[index]);
  });

  return [shapesA, shapesB];
}

function lerpPoints(x1, y1, x2, y2, t) {
  return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
}

function lerpCurve(curveA, curveB, t) {
  return lerpPoints(curveA[0], curveA[1], curveB[0], curveB[1], t).concat(lerpPoints(curveA[2], curveA[3], curveB[2], curveB[3], t)).concat(lerpPoints(curveA[4], curveA[5], curveB[4], curveB[5], t)).concat(lerpPoints(curveA[6], curveA[7], curveB[6], curveB[7], t));
}

function lerp(pathA, pathB, t) {
  var _match = match(pathA, pathB),
      _match2 = (0, _slicedToArray3.default)(_match, 2),
      shapesA = _match2[0],
      shapesB = _match2[1];

  return shapesA.map(function (shapeA, i) {
    var shapeB = shapesB[i];
    return shapeA.map(function (curveA, i) {
      var curveB = shapeB[i];
      var curve = lerpCurve(curveA, curveB, t);
      if (i === 0) {
        return 'M' + curve[0] + ' ' + curve[1] + ' C' + curve[2] + ' ' + curve[3] + ', ' + curve[4] + ' ' + curve[5] + ', ' + curve[6] + ' ' + curve[7];
      }
      return curve[2] + ' ' + curve[3] + ', ' + curve[4] + ' ' + curve[5] + ', ' + curve[6] + ' ' + curve[7];
    });
  }).join(' ') + 'z';
}

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// https://github.com/jkroso/parse-svg-path/blob/master/index.js
/**
 * expected argument lengths
 * @type {Object}
 */

var length = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0

  /**
   * segment pattern
   * @type {RegExp}
   */

};var segment = /([astvzqmhlc])([^astvzqmhlc]*)/ig;

/**
 * parse an svg path data string. Generates an Array
 * of commands where each command is an Array of the
 * form `[command, arg1, arg2, ...]`
 *
 * @param {String} path
 * @return {Array}
 */

function parse(path) {
  var data = [];
  path.replace(segment, function (_, command, args) {
    var type = command.toLowerCase();
    args = parseValues(args);

    // overloaded moveTo
    if (type === 'm' && args.length > 2) {
      data.push([command].concat(args.splice(0, 2)));
      type = 'l';
      command = command === 'm' ? 'l' : 'L';
    }

    while (true) {
      if (args.length === length[type]) {
        args.unshift(command);
        return data.push(args);
      }
      if (args.length < length[type]) throw new Error('malformed path data');
      data.push([command].concat(args.splice(0, length[type])));
    }
  });
  return data;
}

var number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;

function parseValues(args) {
  var numbers = args.match(number);
  return numbers ? numbers.map(Number) : [];
}

exports.default = parse;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (path) {
  // https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths
  // M = moveto
  // L = lineto
  // H = horizontal lineto
  // V = vertical lineto
  // C = curveto
  // S = smooth curveto
  // Q = quadratic Belzier curve
  // T = smooth quadratic Belzier curveto
  // A = elliptical Arc
  // Z = closepath
  // 以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位(从上一个点开始)。
  var cmds = (0, _parser2.default)(path),
      len = cmds.length,
      shapes = [];

  var preX = 0,
      preY = 0,
      j = 0,
      current = null,
      closeX = void 0,
      closeY = void 0,
      preCX = void 0,
      preCY = void 0,
      sLen = void 0,
      curves = void 0,
      lastCurve = void 0;

  for (; j < len; j++) {
    var item = cmds[j];
    var action = item[0];
    var preItem = cmds[j - 1];

    switch (action) {
      case 'm':
        sLen = shapes.length;
        shapes[sLen] = [];
        current = shapes[sLen];
        preX += item[1];
        preY += item[2];
        break;
      case 'M':

        sLen = shapes.length;
        shapes[sLen] = [];
        current = shapes[sLen];
        preX = item[1];
        preY = item[2];
        break;

      case 'l':
        current.push([preX, preY, preX, preY, preX, preY, preX + item[1], preY + item[2]]);
        preX += item[1];
        preY += item[2];
        break;

      case 'L':

        current.push([preX, preY, item[1], item[2], item[1], item[2], item[1], item[2]]);
        preX = item[1];
        preY = item[2];

        break;

      case 'h':

        current.push([preX, preY, preX, preY, preX, preY, preX + item[1], preY]);
        preX += item[1];
        break;

      case 'H':
        current.push([preX, preY, item[1], preY, item[1], preY, item[1], preY]);
        preX = item[1];
        break;

      case 'v':
        current.push([preX, preY, preX, preY, preX, preY, preX, preY + item[1]]);
        preY += item[1];
        break;

      case 'V':
        current.push([preX, preY, preX, item[1], preX, item[1], preX, item[1]]);
        preY = item[1];
        break;

      case 'C':

        current.push([preX, preY, item[1], item[2], item[3], item[4], item[5], item[6]]);
        preX = item[5];
        preY = item[6];
        break;
      case 'S':
        if (preItem[0] === 'C' || preItem[0] === 'c') {
          current.push([preX, preY, preX + preItem[5] - preItem[3], preY + preItem[6] - preItem[4], item[1], item[2], item[3], item[4]]);
        } else if (preItem[0] === 'S' || preItem[0] === 's') {
          current.push([preX, preY, preX + preItem[3] - preItem[1], preY + preItem[4] - preItem[2], item[1], item[2], item[3], item[4]]);
        }
        preX = item[3];
        preY = item[4];
        break;

      case 'c':
        current.push([preX, preY, preX + item[1], preY + item[2], preX + item[3], preY + item[4], preX + item[5], preY + item[6]]);
        preX += item[5];
        preY += item[6];
        break;
      case 's':
        if (preItem[0] === 'C' || preItem[0] === 'c') {
          current.push([preX, preY, preX + preItem[5] - preItem[3], preY + preItem[6] - preItem[4], preX + item[1], preY + item[2], preX + item[3], preY + item[4]]);
        } else if (preItem[0] === 'S' || preItem[0] === 's') {
          current.push([preX, preY, preX + preItem[3] - preItem[1], preY + preItem[4] - preItem[2], preX + item[1], preY + item[2], preX + item[3], preY + item[4]]);
        }

        preX += item[3];
        preY += item[4];

        break;
      case 'a':
        curves = (0, _arc2bezier2.default)({
          rx: item[1],
          ry: item[2],
          px: preX,
          py: preY,
          xAxisRotation: item[3],
          largeArcFlag: item[4],
          sweepFlag: item[5],
          cx: preX + item[6],
          cy: preX + item[7]
        });
        lastCurve = curves[curves.length - 1];

        curves.forEach(function (curve, index) {
          if (index === 0) {
            current.push([preX, preY, curve.x1, curve.y1, curve.x2, curve.y2, curve.x, curve.y]);
          } else {
            current.push([curves[index - 1].x, curves[index - 1].y, curve.x1, curve.y1, curve.x2, curve.y2, curve.x, curve.y]);
          }
        });

        preX = lastCurve.x;
        preY = lastCurve.y;

        break;

      case 'A':

        curves = (0, _arc2bezier2.default)({
          rx: item[1],
          ry: item[2],
          px: preX,
          py: preY,
          xAxisRotation: item[3],
          largeArcFlag: item[4],
          sweepFlag: item[5],
          cx: item[6],
          cy: item[7]
        });
        lastCurve = curves[curves.length - 1];

        curves.forEach(function (curve, index) {
          if (index === 0) {
            current.push([preX, preY, curve.x1, curve.y1, curve.x2, curve.y2, curve.x, curve.y]);
          } else {
            current.push([curves[index - 1].x, curves[index - 1].y, curve.x1, curve.y1, curve.x2, curve.y2, curve.x, curve.y]);
          }
        });

        preX = lastCurve.x;
        preY = lastCurve.y;

        break;
      case 'Q':
        current.push(q2b(preX, preY, item[1], item[2], item[3], item[4]));
        preX = item[3];
        preY = item[4];

        break;
      case 'q':
        current.push(q2b(preX, preY, preX + item[1], preY + item[2], item[3] + preX, item[4] + preY));
        preX += item[3];
        preY += item[4];
        break;

      case 'T':

        if (preItem[0] === 'Q' || preItem[0] === 'q') {
          preCX = preX + preItem[3] - preItem[1];
          preCY = preY + preItem[4] - preItem[2];
          current.push(q2b(preX, preY, preCX, preCY, item[1], item[2]));
        } else if (preItem[0] === 'T' || preItem[0] === 't') {
          current.push(q2b(preX, preY, preX + preX - preCX, preY + preY - preCY, item[1], item[2]));
          preCX = preX + preX - preCX;
          preCY = preY + preY - preCY;
        }

        preX = item[1];
        preY = item[2];
        break;

      case 't':
        if (preItem[0] === 'Q' || preItem[0] === 'q') {
          preCX = preX + preItem[3] - preItem[1];
          preCY = preY + preItem[4] - preItem[2];
          current.push(q2b(preX, preY, preCX, preCY, preX + item[1], preY + item[2]));
        } else if (preItem[0] === 'T' || preItem[0] === 't') {
          current.push(q2b(preX, preY, preX + preX - preCX, preY + preY - preCY, preX + item[1], preY + item[2]));
          preCX = preX + preX - preCX;
          preCY = preY + preY - preCY;
        }

        preX += item[1];
        preY += item[2];
        break;

      case 'Z':
        closeX = current[0][0];
        closeY = current[0][1];
        current.push([preX, preY, closeX, closeY, closeX, closeY, closeX, closeY]);
        break;
      case 'z':
        closeX = current[0][0];
        closeY = current[0][1];
        current.push([preX, preY, closeX, closeY, closeX, closeY, closeX, closeY]);
        break;

      default:
        throw new Error('unknown action');
    }
  }

  return shapes;
};

var _arc2bezier = __webpack_require__(140);

var _arc2bezier2 = _interopRequireDefault(_arc2bezier);

var _parser = __webpack_require__(142);

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/AlloyTeam/pasition

function q2b(x1, y1, x2, y2, x3, y3) {
  return [x1, y1, (x1 + 2 * x2) / 3, (y1 + 2 * y2) / 3, (x3 + 2 * x2) / 3, (y3 + 2 * y2) / 3, x3, y3];
}

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// https://github.com/AlloyTeam/pasition

function shapeBox(shape) {
  var minX = shape[0][0],
      minY = shape[0][1],
      maxX = minX,
      maxY = minY;
  shape.forEach(function (curve) {
    var x1 = curve[0],
        x2 = curve[2],
        x3 = curve[4],
        x4 = curve[6],
        y1 = curve[1],
        y2 = curve[3],
        y3 = curve[5],
        y4 = curve[7];

    minX = Math.min(minX, x1, x2, x3, x4);
    minY = Math.min(minY, y1, y2, y3, y4);
    maxX = Math.max(maxX, x1, x2, x3, x4);
    maxY = Math.max(maxY, y1, y2, y3, y4);
  });

  return [minX, minY, maxX, maxY];
}

function boxDistance(boxA, boxB) {
  return Math.sqrt(Math.pow(boxA[0] - boxB[0], 2) + Math.pow(boxA[1] - boxB[1], 2)) + Math.sqrt(Math.pow(boxA[2] - boxB[2], 2) + Math.pow(boxA[3] - boxB[3], 2));
}

function curveDistance(curveA, curveB) {
  var x1 = curveA[0],
      x2 = curveA[2],
      x3 = curveA[4],
      x4 = curveA[6],
      y1 = curveA[1],
      y2 = curveA[3],
      y3 = curveA[5],
      y4 = curveA[7],
      xb1 = curveB[0],
      xb2 = curveB[2],
      xb3 = curveB[4],
      xb4 = curveB[6],
      yb1 = curveB[1],
      yb2 = curveB[3],
      yb3 = curveB[5],
      yb4 = curveB[7];

  return Math.sqrt(Math.pow(xb1 - x1, 2) + Math.pow(yb1 - y1, 2)) + Math.sqrt(Math.pow(xb2 - x2, 2) + Math.pow(yb2 - y2, 2)) + Math.sqrt(Math.pow(xb3 - x3, 2) + Math.pow(yb3 - y3, 2)) + Math.sqrt(Math.pow(xb4 - x4, 2) + Math.pow(yb4 - y4, 2));
}

function sortCurves(curvesA, curvesB) {
  var arrList = permuteCurveNum(curvesA.length);

  var list = [];
  arrList.forEach(function (arr) {
    var distance = 0;
    var i = 0;
    arr.forEach(function (index) {
      distance += curveDistance(curvesA[index], curvesB[i++]);
    });
    list.push({ index: arr, distance: distance });
  });

  list.sort(function (a, b) {
    return a.distance - b.distance;
  });

  var result = [];

  list[0].index.forEach(function (index) {
    result.push(curvesA[index]);
  });

  return result;
}

function sort(pathA, pathB) {
  var arrList = permuteNum(pathA.length);

  var list = [];
  arrList.forEach(function (arr) {
    var distance = 0;
    arr.forEach(function (index) {
      distance += boxDistance(shapeBox(pathA[index]), shapeBox(pathB[index]));
    });
    list.push({ index: arr, distance: distance });
  });

  list.sort(function (a, b) {
    return a.distance - b.distance;
  });

  var result = [];

  list[0].index.forEach(function (index) {
    result.push(pathA[index]);
  });

  return result;
}

function permuteCurveNum(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    var indexArr = [];
    for (var j = 0; j < num; j++) {
      var index = j + i;
      if (index > num - 1) index -= num;
      indexArr[index] = j;
    }

    arr.push(indexArr);
  }

  return arr;
}

function permuteNum(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(i);
  }

  return permute(arr);
}

function permute(input) {
  var permArr = [],
      usedChars = [];
  function main(input) {
    var i = void 0,
        ch = void 0;
    for (i = 0; i < input.length; i++) {
      ch = input.splice(i, 1)[0];
      usedChars.push(ch);
      if (input.length === 0) {
        permArr.push(usedChars.slice());
      }
      main(input);
      input.splice(i, 0, ch);
      usedChars.pop();
    }
    return permArr;
  }
  return main(input);
}

exports.sort = sort;
exports.sortCurves = sortCurves;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Vector = function () {
  function Vector(p1) {
    var p2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0, 0];
    (0, _classCallCheck3.default)(this, Vector);

    var _p = (0, _slicedToArray3.default)(p1, 3),
        x1 = _p[0],
        y1 = _p[1],
        z1 = _p[2],
        _p2 = (0, _slicedToArray3.default)(p2, 3),
        x2 = _p2[0],
        y2 = _p2[1],
        z2 = _p2[2];

    z1 = z1 || 0;
    z2 = z2 || 0;

    this.x = x1 - x2;
    this.y = y1 - y2;
    this.z = z1 - z2;
  }

  (0, _createClass3.default)(Vector, [{
    key: "unit",
    value: function unit() {
      var length = this.length;
      return new Vector([this.x / length, this.y / length, this.z / length]);
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    }
  }, {
    key: "cross",
    value: function cross(v) {
      var x1 = this.x,
          y1 = this.y,
          z1 = this.z,
          x2 = v.x,
          y2 = v.y,
          z2 = v.z;

      return new Vector([y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - x2 * y1]);
    }
  }, {
    key: "length",
    get: function get() {
      var x = this.x,
          y = this.y,
          z = this.z;

      return Math.sqrt(x * x + y * y + z * z);
    }
  }]);
  return Vector;
}();

exports.default = Vector;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(91);

exports.default = {
  linear: function linear(p) {
    return p;
  },

  ease: (0, _utils.getBezierEasing)(0.25, 0.1, 0.25, 1),
  'ease-in': (0, _utils.getBezierEasing)(0.42, 0, 1, 1),
  'ease-out': (0, _utils.getBezierEasing)(0, 0, 0.58, 1),
  'ease-in-out': (0, _utils.getBezierEasing)(0.42, 0, 0.58, 1),
  // 'step-start': function(p, frames){
  //   let ret = 0
  //   for(let i = 0; i < frames.length; i++){
  //     const {offset} = frames[i]
  //     ret = offset
  //     if(p < offset){
  //       break
  //     }
  //   }
  //   return ret
  // },
  // 'step-end': function(p, frames){
  //   let ret = 0
  //   for(let i = 0; i < frames.length; i++){
  //     const {offset} = frames[i]
  //     if(p < offset){
  //       break
  //     }
  //     ret = offset
  //   }
  //   return ret
  // }
  'step-start': (0, _utils.getStepsEasing)(1, 'start'),
  'step-end': (0, _utils.getStepsEasing)(1, 'end')
};

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  // s - startFrame, e - endFrame
  default: function _default(from, to, p, s, e) {
    if (typeof from === 'number' && typeof to === 'number') {
      return from + (p - s) / (e - s) * (to - from);
    }

    if (p - s > e - p) {
      return to;
    }
    return from;
  }
};

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray2 = __webpack_require__(2);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = __webpack_require__(11);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _map = __webpack_require__(30);

var _map2 = _interopRequireDefault(_map);

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = __webpack_require__(10);

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nowtime() {
  if (typeof performance !== 'undefined' && performance.now) {
    return performance.now();
  }
  return Date.now ? Date.now() : new Date().getTime();
}

var defaultOptions = {
  originTime: 0,
  playbackRate: 1.0
};

var _timeMark = (0, _symbol2.default)('timeMark'),
    _playbackRate = (0, _symbol2.default)('playbackRate'),
    _timers = (0, _symbol2.default)('timers'),
    _originTime = (0, _symbol2.default)('originTime'),
    _timerID = (0, _symbol2.default)('timerID'),
    _setTimer = (0, _symbol2.default)('setTimer'),
    _parent = (0, _symbol2.default)('parent');

var Timeline = function () {
  function Timeline(options, parent) {
    (0, _classCallCheck3.default)(this, Timeline);

    if (options instanceof Timeline) {
      parent = options;
      options = {};
    }

    options = (0, _assign2.default)({}, defaultOptions, options);

    if (parent) {
      this[_parent] = parent;
    }

    // timeMark records the reference points on timeline
    // Each time we change the playbackRate or currentTime or entropy
    // A new timeMark will be generated
    // timeMark sorted by entropy
    // If you reset entropy, all the timeMarks behind the new entropy
    // should be dropped
    this[_timeMark] = [{
      globalTime: this.globalTime,
      localTime: -options.originTime,
      entropy: -options.originTime,
      playbackRate: options.playbackRate
    }];

    if (this[_parent]) {
      this[_timeMark][0].globalEntropy = this[_parent].entropy;
    }

    this[_originTime] = options.originTime;
    this[_playbackRate] = options.playbackRate;
    this[_timers] = new _map2.default();
    this[_timerID] = 0;
  }

  (0, _createClass3.default)(Timeline, [{
    key: 'fork',
    value: function fork(options) {
      return new Timeline(options, this);
    }
  }, {
    key: 'seekGlobalTime',
    value: function seekGlobalTime(seekEntropy) {
      var idx = this.seekTimeMark(seekEntropy),
          timeMark = this[_timeMark][idx];

      var entropy = timeMark.entropy,
          playbackRate = timeMark.playbackRate,
          globalTime = timeMark.globalTime;


      return globalTime + (seekEntropy - entropy) / Math.abs(playbackRate);
    }
  }, {
    key: 'seekLocalTime',
    value: function seekLocalTime(seekEntropy) {
      var idx = this.seekTimeMark(seekEntropy),
          timeMark = this[_timeMark][idx];

      var localTime = timeMark.localTime,
          entropy = timeMark.entropy,
          playbackRate = timeMark.playbackRate;


      if (playbackRate > 0) {
        return localTime + (seekEntropy - entropy);
      }
      return localTime - (seekEntropy - entropy);
    }
  }, {
    key: 'seekTimeMark',
    value: function seekTimeMark(entropy) {
      var timeMark = this[_timeMark];

      var l = 0,
          r = timeMark.length - 1;

      if (entropy <= timeMark[l].entropy) {
        return l;
      }
      if (entropy >= timeMark[r].entropy) {
        return r;
      }

      var m = Math.floor((l + r) / 2); // binary search

      while (m > l && m < r) {
        if (entropy === timeMark[m].entropy) {
          return m;
        } else if (entropy < timeMark[m].entropy) {
          r = m;
        } else if (entropy > timeMark[m].entropy) {
          l = m;
        }
        m = Math.floor((l + r) / 2);
      }

      return l;
    }
  }, {
    key: 'clearTimeout',
    value: function (_clearTimeout) {
      function clearTimeout(_x) {
        return _clearTimeout.apply(this, arguments);
      }

      clearTimeout.toString = function () {
        return _clearTimeout.toString();
      };

      return clearTimeout;
    }(function (id) {
      var timer = this[_timers].get(id);
      if (timer && timer.timerID != null) {
        if (this[_parent]) {
          this[_parent].clearTimeout(timer.timerID);
        } else {
          clearTimeout(timer.timerID);
        }
      }
      this[_timers].delete(id);
    })
  }, {
    key: 'clearInterval',
    value: function clearInterval(id) {
      return this.clearTimeout(id);
    }
  }, {
    key: 'setTimeout',
    value: function setTimeout(handler) {
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { time: 0 };

      return this[_setTimer](handler, time, 'timeout');
    }
  }, {
    key: 'setInterval',
    value: function setInterval(handler) {
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { time: 0 };

      return this[_setTimer](handler, time, 'interval');
    }
  }, {
    key: _setTimer,
    value: function value(handler, time) {
      var _this = this;

      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'timeout';

      if (typeof time === 'number') {
        time = { time: time };
      }

      var currentTime = this.currentTime,
          entropy = this.entropy;

      var id = ++this[_timerID];

      var timerID = null;
      var delay = void 0;

      if (time.time == null) {
        // entropy
        delay = time.entropy / Math.abs(this.playbackRate);
      } else {
        delay = time.time / this.playbackRate;
      }

      if (isFinite(delay)) {
        var parent = this[_parent],
            globalTimeout = parent ? parent.setTimeout.bind(parent) : setTimeout,
            globalInterval = parent ? parent.setInterval.bind(parent) : setInterval;

        delay = Math.ceil(delay);

        if (this[_parent]) {
          delay = { entropy: delay };
        }

        if (type === 'timeout') {
          timerID = globalTimeout(function () {
            _this[_timers].delete(id);
            handler();
          }, delay);
        } else if (type === 'interval') {
          timerID = globalInterval(function () {
            var timer = _this[_timers].get(id);
            timer.active = true;
            handler();
            timer.active = false;
          }, delay);
        }
      }

      this[_timers].set(id, {
        timerID: timerID,
        handler: handler,
        time: time,
        currentTime: currentTime,
        entropy: entropy,
        type: type
      });

      return id;
    }
  }, {
    key: 'currentTime',
    get: function get() {
      var _timeMark2 = this[_timeMark][this[_timeMark].length - 1],
          localTime = _timeMark2.localTime,
          globalTime = _timeMark2.globalTime;

      return localTime + (this.globalTime - globalTime) * this.playbackRate;
    },
    set: function set(time) {
      var timeMark = {
        globalTime: this.globalTime,
        localTime: time,
        entropy: this.entropy,
        playbackRate: this.playbackRate
      };

      if (this[_parent]) {
        timeMark.globalEntropy = this[_parent].entropy;
      }

      this[_timeMark].push(timeMark);
    }
    // Both currentTime and entropy should be influenced by playbackRate.
    // If current playbackRate is negative, the currentTime should go backwards
    // while the entropy remain to go forwards.
    // Both of the initial values is set to -originTime

  }, {
    key: 'entropy',
    get: function get() {
      var _timeMark3 = this[_timeMark][this[_timeMark].length - 1],
          globalTime = _timeMark3.globalTime,
          entropy = _timeMark3.entropy,
          globalEntropy = _timeMark3.globalEntropy;

      if (this[_parent]) {
        return entropy + Math.abs((this[_parent].entropy - globalEntropy) * this.playbackRate);
      }
      return entropy + Math.abs((this.globalTime - globalTime) * this.playbackRate);
    },

    // change entropy will NOT cause currentTime changing but may influence the pass
    // and the future of the timeline. (It may change the result of seek***Time)
    // While entropy is set, all the marks behind will be droped
    set: function set(entropy) {
      var idx = this.seekTimeMark(entropy);
      this[_timeMark].length = idx + 1;

      this[_timeMark].push({
        globalTime: this.globalTime,
        localTime: this.currentTime,
        entropy: entropy,
        playbackRate: this.playbackRate
      });
    }
  }, {
    key: 'globalTime',
    get: function get() {
      if (this[_parent]) {
        return this[_parent].currentTime;
      }

      return nowtime();
    }
  }, {
    key: 'playbackRate',
    get: function get() {
      return this[_playbackRate];
    },
    set: function set(rate) {
      var _this2 = this;

      if (rate !== this.playbackRate) {
        var currentTime = this.currentTime;
        // force currentTime updating
        this.currentTime = currentTime;
        this[_playbackRate] = rate;
        // set new playbackRate in new time mark
        this[_timeMark][this[_timeMark].length - 1].playbackRate = rate;

        // This should be asynchronous because we may reset playbackRate
        // in the timer handler ?
        if (this[_timers].size) {
          var timers = [].concat((0, _toConsumableArray3.default)(this[_timers]));
          timers.forEach(function (_ref) {
            var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
                id = _ref2[0],
                timer = _ref2[1];

            _this2.clearTimeout(id);

            var entropy = _this2.entropy,
                time = timer.time,
                handler = timer.handler,
                type = timer.type,
                active = timer.active;


            var timerID = null;

            var delay = void 0;
            if (time.time == null) {
              delay = time.entropy - (entropy - timer.entropy);
              delay /= Math.abs(_this2.playbackRate);
            } else {
              delay = time.time - (currentTime - timer.currentTime);
              delay /= _this2.playbackRate;
            }

            if (isFinite(delay)) {
              var parent = _this2[_parent],
                  globalTimeout = parent ? parent.setTimeout.bind(parent) : setTimeout,
                  globalInterval = parent ? parent.setInterval.bind(parent) : setInterval;

              delay = Math.ceil(delay);

              if (_this2[_parent]) {
                delay = { entropy: delay };
              }

              if (type === 'timeout') {
                timerID = globalTimeout(function () {
                  _this2[_timers].delete(id);
                  handler();
                }, delay);
              } else if (type === 'interval') {
                timerID = globalTimeout(function () {
                  if (!active) {
                    handler();
                  }
                  if (time.time == null) {
                    delay = time.entropy / Math.abs(_this2.playbackRate);
                  } else {
                    delay = time.time / _this2.playbackRate;
                  }
                  if (_this2[_timers].has(id)) {
                    timerID = globalInterval(function () {
                      handler();
                    }, delay);
                    _this2[_timers].get(id).timerID = timerID;
                  }
                }, delay);
              }
            }

            _this2[_timers].set(id, {
              timerID: timerID,
              handler: handler,
              time: time,
              currentTime: currentTime,
              entropy: entropy,
              type: type
            });
          });
        }
      }
    }
  }]);
  return Timeline;
}();

module.exports = Timeline;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(158), __esModule: true };

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(160), __esModule: true };

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(164), __esModule: true };

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(168), __esModule: true };

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(170), __esModule: true };

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(171), __esModule: true };

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(175), __esModule: true };

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(63);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 157 */
/***/ (function(module, exports) {

/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */

// These values are established by empiricism with tests (tradeoff: performance VS precision)
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

var float32ArraySupported = typeof Float32Array === 'function';

function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
function C (aA1)      { return 3.0 * aA1; }

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); }

function binarySubdivide (aX, aA, aB, mX1, mX2) {
  var currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}

function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
 for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
   var currentSlope = getSlope(aGuessT, mX1, mX2);
   if (currentSlope === 0.0) {
     return aGuessT;
   }
   var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
   aGuessT -= currentX / currentSlope;
 }
 return aGuessT;
}

module.exports = function bezier (mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error('bezier x values must be in [0, 1] range');
  }

  // Precompute samples table
  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  if (mX1 !== mY1 || mX2 !== mY2) {
    for (var i = 0; i < kSplineTableSize; ++i) {
      sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
    }
  }

  function getTForX (aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    // Interpolate to provide an initial guess for t
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;

    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function BezierEasing (x) {
    if (mX1 === mY1 && mX2 === mY2) {
      return x; // linear
    }
    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29);
__webpack_require__(197);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34);
__webpack_require__(29);
module.exports = __webpack_require__(195);


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34);
__webpack_require__(29);
module.exports = __webpack_require__(196);


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(54);
__webpack_require__(29);
__webpack_require__(34);
__webpack_require__(199);
__webpack_require__(212);
__webpack_require__(211);
__webpack_require__(210);
module.exports = __webpack_require__(0).Map;


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(200);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(201);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(202);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(213);
module.exports = __webpack_require__(0).Object.entries;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(203);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(214);
module.exports = __webpack_require__(0).Object.getOwnPropertyDescriptors;


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(204);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(205);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(206);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(54);
__webpack_require__(29);
__webpack_require__(34);
__webpack_require__(207);
__webpack_require__(215);
__webpack_require__(216);
module.exports = __webpack_require__(0).Promise;


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(54);
__webpack_require__(29);
__webpack_require__(34);
__webpack_require__(208);
__webpack_require__(219);
__webpack_require__(218);
__webpack_require__(217);
module.exports = __webpack_require__(0).Set;


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(209);
__webpack_require__(54);
__webpack_require__(220);
__webpack_require__(221);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29);
__webpack_require__(34);
module.exports = __webpack_require__(81).f('iterator');


/***/ }),
/* 176 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(39);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(14);
var toLength = __webpack_require__(52);
var toAbsoluteIndex = __webpack_require__(194);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(15);
var IObject = __webpack_require__(68);
var toObject = __webpack_require__(33);
var toLength = __webpack_require__(52);
var asc = __webpack_require__(181);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
var isArray = __webpack_require__(100);
var SPECIES = __webpack_require__(4)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(180);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(28);
var gOPS = __webpack_require__(51);
var pIE = __webpack_require__(40);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 183 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(49);
var descriptor = __webpack_require__(41);
var setToStringTag = __webpack_require__(42);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(19)(IteratorPrototype, __webpack_require__(4)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(28);
var toIObject = __webpack_require__(14);
module.exports = function (object, el) {
  var O = toIObject(object);
  var keys = getKeys(O);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) if (O[key = keys[index++]] === el) return key;
};


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var macrotask = __webpack_require__(113).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(38)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(28);
var gOPS = __webpack_require__(51);
var pIE = __webpack_require__(40);
var toObject = __webpack_require__(33);
var IObject = __webpack_require__(68);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(26)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var anObject = __webpack_require__(12);
var getKeys = __webpack_require__(28);

module.exports = __webpack_require__(13) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(14);
var gOPN = __webpack_require__(72).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(28);
var toIObject = __webpack_require__(14);
var isEnum = __webpack_require__(40).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(72);
var gOPS = __webpack_require__(51);
var anObject = __webpack_require__(12);
var Reflect = __webpack_require__(3).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(16);
var anObject = __webpack_require__(12);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(15)(Function.call, __webpack_require__(50).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(77);
var defined = __webpack_require__(65);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(77);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(12);
var get = __webpack_require__(82);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(47);
var ITERATOR = __webpack_require__(4)('iterator');
var Iterators = __webpack_require__(32);
module.exports = __webpack_require__(0).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(15);
var $export = __webpack_require__(1);
var toObject = __webpack_require__(33);
var call = __webpack_require__(101);
var isArrayIter = __webpack_require__(99);
var toLength = __webpack_require__(52);
var createProperty = __webpack_require__(96);
var getIterFn = __webpack_require__(82);

$export($export.S + $export.F * !__webpack_require__(102)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(176);
var step = __webpack_require__(103);
var Iterators = __webpack_require__(32);
var toIObject = __webpack_require__(14);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(69)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(93);
var validate = __webpack_require__(79);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(95)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(1);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(187) });


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(49) });


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(13), 'Object', { defineProperty: __webpack_require__(8).f });


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(14);
var $getOwnPropertyDescriptor = __webpack_require__(50).f;

__webpack_require__(73)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(33);
var $getPrototypeOf = __webpack_require__(104);

__webpack_require__(73)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(33);
var $keys = __webpack_require__(28);

__webpack_require__(73)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(1);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(192).set });


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(48);
var global = __webpack_require__(3);
var ctx = __webpack_require__(15);
var classof = __webpack_require__(47);
var $export = __webpack_require__(1);
var isObject = __webpack_require__(16);
var aFunction = __webpack_require__(37);
var anInstance = __webpack_require__(64);
var forOf = __webpack_require__(39);
var speciesConstructor = __webpack_require__(112);
var task = __webpack_require__(113).set;
var microtask = __webpack_require__(186)();
var newPromiseCapabilityModule = __webpack_require__(71);
var perform = __webpack_require__(106);
var promiseResolve = __webpack_require__(107);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(4)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var sameConstructor = LIBRARY ? function (a, b) {
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
} : function (a, b) {
  return a === b;
};
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(74)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return sameConstructor($Promise, C)
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(42)($Promise, PROMISE);
__webpack_require__(111)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
    return promiseResolve(this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(102)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(93);
var validate = __webpack_require__(79);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(95)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(3);
var has = __webpack_require__(27);
var DESCRIPTORS = __webpack_require__(13);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(108);
var META = __webpack_require__(70).KEY;
var $fails = __webpack_require__(26);
var shared = __webpack_require__(76);
var setToStringTag = __webpack_require__(42);
var uid = __webpack_require__(53);
var wks = __webpack_require__(4);
var wksExt = __webpack_require__(81);
var wksDefine = __webpack_require__(80);
var keyOf = __webpack_require__(185);
var enumKeys = __webpack_require__(182);
var isArray = __webpack_require__(100);
var anObject = __webpack_require__(12);
var toIObject = __webpack_require__(14);
var toPrimitive = __webpack_require__(78);
var createDesc = __webpack_require__(41);
var _create = __webpack_require__(49);
var gOPNExt = __webpack_require__(189);
var $GOPD = __webpack_require__(50);
var $DP = __webpack_require__(8);
var $keys = __webpack_require__(28);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(72).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(40).f = $propertyIsEnumerable;
  __webpack_require__(51).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(48)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key) {
    if (isSymbol(key)) return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(19)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(109)('Map');


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(110)('Map');


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(1);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(94)('Map') });


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(1);
var $entries = __webpack_require__(190)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(1);
var ownKeys = __webpack_require__(191);
var toIObject = __webpack_require__(14);
var gOPD = __webpack_require__(50);
var createProperty = __webpack_require__(96);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var global = __webpack_require__(3);
var speciesConstructor = __webpack_require__(112);
var promiseResolve = __webpack_require__(107);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(1);
var newPromiseCapability = __webpack_require__(71);
var perform = __webpack_require__(106);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(109)('Set');


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(110)('Set');


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(1);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(94)('Set') });


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(80)('asyncIterator');


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(80)('observable');


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__(224);
var isArguments = __webpack_require__(223);

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}


/***/ }),
/* 223 */
/***/ (function(module, exports) {

var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};


/***/ }),
/* 224 */
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}


/***/ }),
/* 225 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(227);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 227 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;(function() {
  "use strict";

function immutableInit(config) {

  // https://github.com/facebook/react/blob/v15.0.1/src/isomorphic/classic/element/ReactElement.js#L21
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element');
  var REACT_ELEMENT_TYPE_FALLBACK = 0xeac7;

  var globalConfig = {
    use_static: false
  };
  if (isObject(config)) {
      if (config.use_static !== undefined) {
          globalConfig.use_static = Boolean(config.use_static);
      }
  }

  function isObject(data) {
    return (
      typeof data === 'object' &&
      !Array.isArray(data) &&
      data !== null
    );
  }

  function instantiateEmptyObject(obj) {
      var prototype = Object.getPrototypeOf(obj);
      if (!prototype) {
          return {};
      } else {
          return Object.create(prototype);
      }
  }

  function addPropertyTo(target, methodName, value) {
    Object.defineProperty(target, methodName, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: value
    });
  }

  function banProperty(target, methodName) {
    addPropertyTo(target, methodName, function() {
      throw new ImmutableError("The " + methodName +
        " method cannot be invoked on an Immutable data structure.");
    });
  }

  var immutabilityTag = "__immutable_invariants_hold";

  function addImmutabilityTag(target) {
    addPropertyTo(target, immutabilityTag, true);
  }

  function isImmutable(target) {
    if (typeof target === "object") {
      return target === null || Boolean(
        Object.getOwnPropertyDescriptor(target, immutabilityTag)
      );
    } else {
      // In JavaScript, only objects are even potentially mutable.
      // strings, numbers, null, and undefined are all naturally immutable.
      return true;
    }
  }

  function isEqual(a, b) {
    // Avoid false positives due to (NaN !== NaN) evaluating to true
    return (a === b || (a !== a && b !== b));
  }

  function isMergableObject(target) {
    return target !== null && typeof target === "object" && !(Array.isArray(target)) && !(target instanceof Date);
  }

  var mutatingObjectMethods = [
    "setPrototypeOf"
  ];

  var nonMutatingObjectMethods = [
    "keys"
  ];

  var mutatingArrayMethods = mutatingObjectMethods.concat([
    "push", "pop", "sort", "splice", "shift", "unshift", "reverse"
  ]);

  var nonMutatingArrayMethods = nonMutatingObjectMethods.concat([
    "map", "filter", "slice", "concat", "reduce", "reduceRight"
  ]);

  var mutatingDateMethods = mutatingObjectMethods.concat([
    "setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds",
    "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes",
    "setUTCMonth", "setUTCSeconds", "setYear"
  ]);

  function ImmutableError(message) {
    this.name = 'MyError';
    this.message = message;
    this.stack = (new Error()).stack;
  }
  ImmutableError.prototype = new Error();
  ImmutableError.prototype.constructor = Error;

  function makeImmutable(obj, bannedMethods) {
    // Tag it so we can quickly tell it's immutable later.
    addImmutabilityTag(obj);

    if (true) {
      // Make all mutating methods throw exceptions.
      for (var index in bannedMethods) {
        if (bannedMethods.hasOwnProperty(index)) {
          banProperty(obj, bannedMethods[index]);
        }
      }

      // Freeze it and return it.
      Object.freeze(obj);
    }

    return obj;
  }

  function makeMethodReturnImmutable(obj, methodName) {
    var currentMethod = obj[methodName];

    addPropertyTo(obj, methodName, function() {
      return Immutable(currentMethod.apply(obj, arguments));
    });
  }

  function arraySet(idx, value, config) {
    var deep          = config && config.deep;

    if (idx in this) {
      if (deep && this[idx] !== value && isMergableObject(value) && isMergableObject(this[idx])) {
        value = Immutable.merge(this[idx], value, {deep: true, mode: 'replace'});
      }
      if (isEqual(this[idx], value)) {
        return this;
      }
    }

    var mutable = asMutableArray.call(this);
    mutable[idx] = Immutable(value);
    return makeImmutableArray(mutable);
  }

  var immutableEmptyArray = Immutable([]);

  function arraySetIn(pth, value, config) {
    var head = pth[0];

    if (pth.length === 1) {
      return arraySet.call(this, head, value, config);
    } else {
      var tail = pth.slice(1);
      var thisHead = this[head];
      var newValue;

      if (typeof(thisHead) === "object" && thisHead !== null) {
        // Might (validly) be object or array
        newValue = Immutable.setIn(thisHead, tail, value);
      } else {
        var nextHead = tail[0];
        // If the next path part is a number, then we are setting into an array, else an object.
        if (nextHead !== '' && isFinite(nextHead)) {
          newValue = arraySetIn.call(immutableEmptyArray, tail, value);
        } else {
          newValue = objectSetIn.call(immutableEmptyObject, tail, value);
        }
      }

      if (head in this && thisHead === newValue) {
        return this;
      }

      var mutable = asMutableArray.call(this);
      mutable[head] = newValue;
      return makeImmutableArray(mutable);
    }
  }

  function makeImmutableArray(array) {
    // Don't change their implementations, but wrap these functions to make sure
    // they always return an immutable value.
    for (var index in nonMutatingArrayMethods) {
      if (nonMutatingArrayMethods.hasOwnProperty(index)) {
        var methodName = nonMutatingArrayMethods[index];
        makeMethodReturnImmutable(array, methodName);
      }
    }

    if (!globalConfig.use_static) {
      addPropertyTo(array, "flatMap",  flatMap);
      addPropertyTo(array, "asObject", asObject);
      addPropertyTo(array, "asMutable", asMutableArray);
      addPropertyTo(array, "set", arraySet);
      addPropertyTo(array, "setIn", arraySetIn);
      addPropertyTo(array, "update", update);
      addPropertyTo(array, "updateIn", updateIn);
      addPropertyTo(array, "getIn", getIn);
    }

    for(var i = 0, length = array.length; i < length; i++) {
      array[i] = Immutable(array[i]);
    }

    return makeImmutable(array, mutatingArrayMethods);
  }

  function makeImmutableDate(date) {
    if (!globalConfig.use_static) {
      addPropertyTo(date, "asMutable", asMutableDate);
    }

    return makeImmutable(date, mutatingDateMethods);
  }

  function asMutableDate() {
    return new Date(this.getTime());
  }

  /**
   * Effectively performs a map() over the elements in the array, using the
   * provided iterator, except that whenever the iterator returns an array, that
   * array's elements are added to the final result instead of the array itself.
   *
   * @param {function} iterator - The iterator function that will be invoked on each element in the array. It will receive three arguments: the current value, the current index, and the current object.
   */
  function flatMap(iterator) {
    // Calling .flatMap() with no arguments is a no-op. Don't bother cloning.
    if (arguments.length === 0) {
      return this;
    }

    var result = [],
        length = this.length,
        index;

    for (index = 0; index < length; index++) {
      var iteratorResult = iterator(this[index], index, this);

      if (Array.isArray(iteratorResult)) {
        // Concatenate Array results into the return value we're building up.
        result.push.apply(result, iteratorResult);
      } else {
        // Handle non-Array results the same way map() does.
        result.push(iteratorResult);
      }
    }

    return makeImmutableArray(result);
  }

  /**
   * Returns an Immutable copy of the object without the given keys included.
   *
   * @param {array} keysToRemove - A list of strings representing the keys to exclude in the return value. Instead of providing a single array, this method can also be called by passing multiple strings as separate arguments.
   */
  function without(remove) {
    // Calling .without() with no arguments is a no-op. Don't bother cloning.
    if (typeof remove === "undefined" && arguments.length === 0) {
      return this;
    }

    if (typeof remove !== "function") {
      // If we weren't given an array, use the arguments list.
      var keysToRemoveArray = (Array.isArray(remove)) ?
         remove.slice() : Array.prototype.slice.call(arguments);

      // Convert numeric keys to strings since that's how they'll
      // come from the enumeration of the object.
      keysToRemoveArray.forEach(function(el, idx, arr) {
        if(typeof(el) === "number") {
          arr[idx] = el.toString();
        }
      });

      remove = function(val, key) {
        return keysToRemoveArray.indexOf(key) !== -1;
      };
    }

    var result = instantiateEmptyObject(this);

    for (var key in this) {
      if (this.hasOwnProperty(key) && remove(this[key], key) === false) {
        result[key] = this[key];
      }
    }

    return makeImmutableObject(result);
  }

  function asMutableArray(opts) {
    var result = [], i, length;

    if(opts && opts.deep) {
      for(i = 0, length = this.length; i < length; i++) {
        result.push(asDeepMutable(this[i]));
      }
    } else {
      for(i = 0, length = this.length; i < length; i++) {
        result.push(this[i]);
      }
    }

    return result;
  }

  /**
   * Effectively performs a [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) over the elements in the array, expecting that the iterator function
   * will return an array of two elements - the first representing a key, the other
   * a value. Then returns an Immutable Object constructed of those keys and values.
   *
   * @param {function} iterator - A function which should return an array of two elements - the first representing the desired key, the other the desired value.
   */
  function asObject(iterator) {
    // If no iterator was provided, assume the identity function
    // (suggesting this array is already a list of key/value pairs.)
    if (typeof iterator !== "function") {
      iterator = function(value) { return value; };
    }

    var result = {},
        length = this.length,
        index;

    for (index = 0; index < length; index++) {
      var pair  = iterator(this[index], index, this),
          key   = pair[0],
          value = pair[1];

      result[key] = value;
    }

    return makeImmutableObject(result);
  }

  function asDeepMutable(obj) {
    if (
      (!obj) ||
      (typeof obj !== 'object') ||
      (!Object.getOwnPropertyDescriptor(obj, immutabilityTag)) ||
      (obj instanceof Date)
    ) { return obj; }
    return Immutable.asMutable(obj, {deep: true});
  }

  function quickCopy(src, dest) {
    for (var key in src) {
      if (Object.getOwnPropertyDescriptor(src, key)) {
        dest[key] = src[key];
      }
    }

    return dest;
  }

  /**
   * Returns an Immutable Object containing the properties and values of both
   * this object and the provided object, prioritizing the provided object's
   * values whenever the same key is present in both objects.
   *
   * @param {object} other - The other object to merge. Multiple objects can be passed as an array. In such a case, the later an object appears in that list, the higher its priority.
   * @param {object} config - Optional config object that contains settings. Supported settings are: {deep: true} for deep merge and {merger: mergerFunc} where mergerFunc is a function
   *                          that takes a property from both objects. If anything is returned it overrides the normal merge behaviour.
   */
  function merge(other, config) {
    // Calling .merge() with no arguments is a no-op. Don't bother cloning.
    if (arguments.length === 0) {
      return this;
    }

    if (other === null || (typeof other !== "object")) {
      throw new TypeError("Immutable#merge can only be invoked with objects or arrays, not " + JSON.stringify(other));
    }

    var receivedArray = (Array.isArray(other)),
        deep          = config && config.deep,
        mode          = config && config.mode || 'merge',
        merger        = config && config.merger,
        result;

    // Use the given key to extract a value from the given object, then place
    // that value in the result object under the same key. If that resulted
    // in a change from this object's value at that key, set anyChanges = true.
    function addToResult(currentObj, otherObj, key) {
      var immutableValue = Immutable(otherObj[key]);
      var mergerResult = merger && merger(currentObj[key], immutableValue, config);
      var currentValue = currentObj[key];

      if ((result !== undefined) ||
        (mergerResult !== undefined) ||
        (!currentObj.hasOwnProperty(key)) ||
        !isEqual(immutableValue, currentValue)) {

        var newValue;

        if (mergerResult) {
          newValue = mergerResult;
        } else if (deep && isMergableObject(currentValue) && isMergableObject(immutableValue)) {
          newValue = Immutable.merge(currentValue, immutableValue, config);
        } else {
          newValue = immutableValue;
        }

        if (!isEqual(currentValue, newValue) || !currentObj.hasOwnProperty(key)) {
          if (result === undefined) {
            // Make a shallow clone of the current object.
            result = quickCopy(currentObj, instantiateEmptyObject(currentObj));
          }

          result[key] = newValue;
        }
      }
    }

    function clearDroppedKeys(currentObj, otherObj) {
      for (var key in currentObj) {
        if (!otherObj.hasOwnProperty(key)) {
          if (result === undefined) {
            // Make a shallow clone of the current object.
            result = quickCopy(currentObj, instantiateEmptyObject(currentObj));
          }
          delete result[key];
        }
      }
    }

    var key;

    // Achieve prioritization by overriding previous values that get in the way.
    if (!receivedArray) {
      // The most common use case: just merge one object into the existing one.
      for (key in other) {
        if (Object.getOwnPropertyDescriptor(other, key)) {
          addToResult(this, other, key);
        }
      }
      if (mode === 'replace') {
        clearDroppedKeys(this, other);
      }
    } else {
      // We also accept an Array
      for (var index = 0, length = other.length; index < length; index++) {
        var otherFromArray = other[index];

        for (key in otherFromArray) {
          if (otherFromArray.hasOwnProperty(key)) {
            addToResult(result !== undefined ? result : this, otherFromArray, key);
          }
        }
      }
    }

    if (result === undefined) {
      return this;
    } else {
      return makeImmutableObject(result);
    }
  }

  function objectReplace(value, config) {
    var deep          = config && config.deep;

    // Calling .replace() with no arguments is a no-op. Don't bother cloning.
    if (arguments.length === 0) {
      return this;
    }

    if (value === null || typeof value !== "object") {
      throw new TypeError("Immutable#replace can only be invoked with objects or arrays, not " + JSON.stringify(value));
    }

    return Immutable.merge(this, value, {deep: deep, mode: 'replace'});
  }

  var immutableEmptyObject = Immutable({});

  function objectSetIn(path, value, config) {
    if (!(path instanceof Array) || path.length === 0) {
      throw new TypeError("The first argument to Immutable#setIn must be an array containing at least one \"key\" string.");
    }

    var head = path[0];
    if (path.length === 1) {
      return objectSet.call(this, head, value, config);
    }

    var tail = path.slice(1);
    var newValue;
    var thisHead = this[head];

    if (this.hasOwnProperty(head) && typeof(thisHead) === "object" && thisHead !== null) {
      // Might (validly) be object or array
      newValue = Immutable.setIn(thisHead, tail, value);
    } else {
      newValue = objectSetIn.call(immutableEmptyObject, tail, value);
    }

    if (this.hasOwnProperty(head) && thisHead === newValue) {
      return this;
    }

    var mutable = quickCopy(this, instantiateEmptyObject(this));
    mutable[head] = newValue;
    return makeImmutableObject(mutable);
  }

  function objectSet(property, value, config) {
    var deep          = config && config.deep;

    if (this.hasOwnProperty(property)) {
      if (deep && this[property] !== value && isMergableObject(value) && isMergableObject(this[property])) {
        value = Immutable.merge(this[property], value, {deep: true, mode: 'replace'});
      }
      if (isEqual(this[property], value)) {
        return this;
      }
    }

    var mutable = quickCopy(this, instantiateEmptyObject(this));
    mutable[property] = Immutable(value);
    return makeImmutableObject(mutable);
  }

  function update(property, updater) {
    var restArgs = Array.prototype.slice.call(arguments, 2);
    var initialVal = this[property];
    return Immutable.set(this, property, updater.apply(initialVal, [initialVal].concat(restArgs)));
  }

  function getInPath(obj, path) {
    /*jshint eqnull:true */
    for (var i = 0, l = path.length; obj != null && i < l; i++) {
      obj = obj[path[i]];
    }

    return (i && i == l) ? obj : undefined;
  }

  function updateIn(path, updater) {
    var restArgs = Array.prototype.slice.call(arguments, 2);
    var initialVal = getInPath(this, path);

    return Immutable.setIn(this, path, updater.apply(initialVal, [initialVal].concat(restArgs)));
  }

  function getIn(path, defaultValue) {
    var value = getInPath(this, path);
    return value === undefined ? defaultValue : value;
  }

  function asMutableObject(opts) {
    var result = instantiateEmptyObject(this), key;

    if(opts && opts.deep) {
      for (key in this) {
        if (this.hasOwnProperty(key)) {
          result[key] = asDeepMutable(this[key]);
        }
      }
    } else {
      for (key in this) {
        if (this.hasOwnProperty(key)) {
          result[key] = this[key];
        }
      }
    }

    return result;
  }

  // Creates plain object to be used for cloning
  function instantiatePlainObject() {
    return {};
  }

  // Finalizes an object with immutable methods, freezes it, and returns it.
  function makeImmutableObject(obj) {
    if (!globalConfig.use_static) {
      addPropertyTo(obj, "merge", merge);
      addPropertyTo(obj, "replace", objectReplace);
      addPropertyTo(obj, "without", without);
      addPropertyTo(obj, "asMutable", asMutableObject);
      addPropertyTo(obj, "set", objectSet);
      addPropertyTo(obj, "setIn", objectSetIn);
      addPropertyTo(obj, "update", update);
      addPropertyTo(obj, "updateIn", updateIn);
      addPropertyTo(obj, "getIn", getIn);
    }

    return makeImmutable(obj, mutatingObjectMethods);
  }

  // Returns true if object is a valid react element
  // https://github.com/facebook/react/blob/v15.0.1/src/isomorphic/classic/element/ReactElement.js#L326
  function isReactElement(obj) {
    return typeof obj === 'object' &&
           obj !== null &&
           (obj.$$typeof === REACT_ELEMENT_TYPE_FALLBACK || obj.$$typeof === REACT_ELEMENT_TYPE);
  }

  function isFileObject(obj) {
    return typeof File !== 'undefined' &&
           obj instanceof File;
  }

  function isPromise(obj) {
    return typeof obj === 'object' &&
           typeof obj.then === 'function';
  }

  function isError(obj) {
    return obj instanceof Error;
  }

  function Immutable(obj, options, stackRemaining) {
    if (isImmutable(obj) || isReactElement(obj) || isFileObject(obj) || isError(obj)) {
      return obj;
    } else if (isPromise(obj)) {
      return obj.then(Immutable);
    } else if (Array.isArray(obj)) {
      return makeImmutableArray(obj.slice());
    } else if (obj instanceof Date) {
      return makeImmutableDate(new Date(obj.getTime()));
    } else {
      // Don't freeze the object we were given; make a clone and use that.
      var prototype = options && options.prototype;
      var instantiateEmptyObject =
        (!prototype || prototype === Object.prototype) ?
          instantiatePlainObject : (function() { return Object.create(prototype); });
      var clone = instantiateEmptyObject();

      if (true) {
        /*jshint eqnull:true */
        if (stackRemaining == null) {
          stackRemaining = 64;
        }
        if (stackRemaining <= 0) {
          throw new ImmutableError("Attempt to construct Immutable from a deeply nested object was detected." +
            " Have you tried to wrap an object with circular references (e.g. React element)?" +
            " See https://github.com/rtfeldman/seamless-immutable/wiki/Deeply-nested-object-was-detected for details.");
        }
        stackRemaining -= 1;
      }

      for (var key in obj) {
        if (Object.getOwnPropertyDescriptor(obj, key)) {
          clone[key] = Immutable(obj[key], undefined, stackRemaining);
        }
      }

      return makeImmutableObject(clone);
    }
  }

  // Wrapper to allow the use of object methods as static methods of Immutable.
  function toStatic(fn) {
    function staticWrapper() {
      var args = [].slice.call(arguments);
      var self = args.shift();
      return fn.apply(self, args);
    }

    return staticWrapper;
  }

  // Wrapper to allow the use of object methods as static methods of Immutable.
  // with the additional condition of choosing which function to call depending
  // if argument is an array or an object.
  function toStaticObjectOrArray(fnObject, fnArray) {
    function staticWrapper() {
      var args = [].slice.call(arguments);
      var self = args.shift();
      if (Array.isArray(self)) {
          return fnArray.apply(self, args);
      } else {
          return fnObject.apply(self, args);
      }
    }

    return staticWrapper;
  }

  // Wrapper to allow the use of object methods as static methods of Immutable.
  // with the additional condition of choosing which function to call depending
  // if argument is an array or an object or a date.
  function toStaticObjectOrDateOrArray(fnObject, fnArray, fnDate) {
    function staticWrapper() {
      var args = [].slice.call(arguments);
      var self = args.shift();
      if (Array.isArray(self)) {
          return fnArray.apply(self, args);
      } else if (self instanceof Date) {
          return fnDate.apply(self, args);
      } else {
          return fnObject.apply(self, args);
      }
    }

    return staticWrapper;
  }

  // Export the library
  Immutable.from           = Immutable;
  Immutable.isImmutable    = isImmutable;
  Immutable.ImmutableError = ImmutableError;
  Immutable.merge          = toStatic(merge);
  Immutable.replace        = toStatic(objectReplace);
  Immutable.without        = toStatic(without);
  Immutable.asMutable      = toStaticObjectOrDateOrArray(asMutableObject, asMutableArray, asMutableDate);
  Immutable.set            = toStaticObjectOrArray(objectSet, arraySet);
  Immutable.setIn          = toStaticObjectOrArray(objectSetIn, arraySetIn);
  Immutable.update         = toStatic(update);
  Immutable.updateIn       = toStatic(updateIn);
  Immutable.getIn          = toStatic(getIn);
  Immutable.flatMap        = toStatic(flatMap);
  Immutable.asObject       = toStatic(asObject);
  if (!globalConfig.use_static) {
      Immutable.static = immutableInit({
          use_static: true
      });
  }

  Object.freeze(Immutable);

  return Immutable;
}

  var Immutable = immutableInit();
  /* istanbul ignore if */
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return Immutable;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof module === "object") {
    module.exports = Immutable;
  } else if (typeof exports === "object") {
    exports.Immutable = Immutable;
  } else if (typeof window === "object") {
    window.Immutable = Immutable;
  } else if (typeof global === "object") {
    global.Immutable = Immutable;
  }
})();


/***/ }),
/* 229 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 230 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(230);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(229);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(114), __webpack_require__(83)))

/***/ })
/******/ ]);
});