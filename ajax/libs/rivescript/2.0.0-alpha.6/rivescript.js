var RiveScript =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 128);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var core = __webpack_require__(21);
var hide = __webpack_require__(12);
var redefine = __webpack_require__(13);
var ctx = __webpack_require__(18);
var PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
$export.U = 64; // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self
// eslint-disable-next-line no-new-func
: Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var store = __webpack_require__(50)('wks');
var uid = __webpack_require__(32);
var _Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof _Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(91);
var toPrimitive = __webpack_require__(22);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.15 ToLength
var toInteger = __webpack_require__(24);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.13 ToObject(argument)
var defined = __webpack_require__(23);
module.exports = function (it) {
  return Object(defined(it));
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(7);
var createDesc = __webpack_require__(31);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var has = __webpack_require__(11);
var SRC = __webpack_require__(32)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(21).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var fails = __webpack_require__(3);
var defined = __webpack_require__(23);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function createHTML(string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(46);
var defined = __webpack_require__(23);
module.exports = function (it) {
  return IObject(defined(it));
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pIE = __webpack_require__(47);
var createDesc = __webpack_require__(31);
var toIObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(22);
var has = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(91);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) {/* empty */}
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(11);
var toObject = __webpack_require__(9);
var IE_PROTO = __webpack_require__(66)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// optional / simple context binding
var aFunction = __webpack_require__(10);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };
    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function () /* ...args */{
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () {/* empty */}, 1) : method.call(null);
  });
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(21);
var fails = __webpack_require__(3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () {
    fn(1);
  }), 'Object', exp);
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(18);
var IObject = __webpack_require__(46);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var asc = __webpack_require__(83);
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
    for (; length > index; index++) {
      if (NO_HOLES || index in self) {
        val = self[index];
        res = f(val, index, O);
        if (TYPE) {
          if (IS_MAP) result[index] = res; // map
          else if (res) switch (TYPE) {
              case 3:
                return true; // some
              case 5:
                return val; // find
              case 6:
                return index; // findIndex
              case 2:
                result.push(val); // filter
            } else if (IS_EVERY) return false; // every
        }
      }
    }return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (__webpack_require__(6)) {
  var LIBRARY = __webpack_require__(33);
  var global = __webpack_require__(2);
  var fails = __webpack_require__(3);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(60);
  var $buffer = __webpack_require__(89);
  var ctx = __webpack_require__(18);
  var anInstance = __webpack_require__(39);
  var propertyDesc = __webpack_require__(31);
  var hide = __webpack_require__(12);
  var redefineAll = __webpack_require__(41);
  var toInteger = __webpack_require__(24);
  var toLength = __webpack_require__(8);
  var toIndex = __webpack_require__(117);
  var toAbsoluteIndex = __webpack_require__(35);
  var toPrimitive = __webpack_require__(22);
  var has = __webpack_require__(11);
  var classof = __webpack_require__(48);
  var isObject = __webpack_require__(4);
  var toObject = __webpack_require__(9);
  var isArrayIter = __webpack_require__(80);
  var create = __webpack_require__(36);
  var getPrototypeOf = __webpack_require__(17);
  var gOPN = __webpack_require__(37).f;
  var getIterFn = __webpack_require__(82);
  var uid = __webpack_require__(32);
  var wks = __webpack_require__(5);
  var createArrayMethod = __webpack_require__(26);
  var createArrayIncludes = __webpack_require__(51);
  var speciesConstructor = __webpack_require__(58);
  var ArrayIterators = __webpack_require__(85);
  var Iterators = __webpack_require__(44);
  var $iterDetect = __webpack_require__(55);
  var setSpecies = __webpack_require__(38);
  var arrayFill = __webpack_require__(84);
  var arrayCopyWithin = __webpack_require__(107);
  var $DP = __webpack_require__(7);
  var $GOPD = __webpack_require__(16);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function toOffset(it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function validate(it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function allocate(C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    }return new C(length);
  };

  var speciesFromList = function speciesFromList(O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function fromList(C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) {
      result[index] = list[index++];
    }return result;
  };

  var addGetter = function addGetter(it, key, internal) {
    dP(it, key, { get: function get() {
        return this._d[internal];
      } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      }O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of() /* ...items */{
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) {
      result[index] = arguments[index++];
    }return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () {
    arrayToLocaleString.call(new Uint8Array(1));
  });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) {
      // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) {
      // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) {
      // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) {
      // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) {
      // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      }return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin));
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) {
      this[offset + index] = src[index++];
    }
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function isTAIndex(target, key) {
    return isObject(target) && target[TYPED_ARRAY] && (typeof key === 'undefined' ? 'undefined' : _typeof(key)) != 'symbol' && key in target && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true)) ? propertyDesc(2, target[key]) : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc) && has(desc, 'value') && !has(desc, 'get') && !has(desc, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !desc.configurable && (!has(desc, 'writable') || desc.writable) && (!has(desc, 'enumerable') || desc.enumerable)) {
      target[key] = desc.value;
      return target;
    }return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () {
    arrayToString.call({});
  })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function constructor() {/* noop */},
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function get() {
      return this[TYPED_ARRAY];
    }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function getter(that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function setter(that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function addElement(that, index) {
      dP(that, index, {
        get: function get() {
          return getter(this, index);
        },
        set: function set(value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) {
          addElement(that, index++);
        }
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined ? new Base(data, toOffset($offset, BYTES), $length) : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function get() {
          return NAME;
        }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () {
      Base.of.call(TypedArray, 1);
    }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () {/* empty */};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Map = __webpack_require__(112);
var $export = __webpack_require__(0);
var shared = __webpack_require__(50)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(115))());

var getOrCreateMetadataMap = function getOrCreateMetadataMap(target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  }return keyMetadata;
};
var ordinaryHasOwnMetadata = function ordinaryHasOwnMetadata(MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function ordinaryGetOwnMetadata(MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function ordinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function ordinaryOwnMetadataKeys(target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) {
    keys.push(key);
  });
  return keys;
};
var toMetaKey = function toMetaKey(it) {
  return it === undefined || (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : String(it);
};
var exp = function exp(O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var META = __webpack_require__(32)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(11);
var setDesc = __webpack_require__(7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function setMeta(it) {
  setDesc(it, META, { value: {
      i: 'O' + ++id, // object ID
      w: {} // weak collections IDs
    } });
};
var fastKey = function fastKey(it, create) {
  // return primitive with prefix
  if (!isObject(it)) return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
    // return object ID
  }return it[META].i;
};
var getWeak = function getWeak(it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
    // return hash weak collections IDs
  }return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function onFreeze(it) {
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(12)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = false;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(93);
var enumBugKeys = __webpack_require__(67);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(24);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1);
var dPs = __webpack_require__(94);
var enumBugKeys = __webpack_require__(67);
var IE_PROTO = __webpack_require__(66)('IE_PROTO');
var Empty = function Empty() {/* empty */};
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var _createDict = function createDict() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(64)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(68).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  _createDict = iframeDocument.F;
  while (i--) {
    delete _createDict[PROTOTYPE][enumBugKeys[i]];
  }return _createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = _createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(93);
var hiddenKeys = __webpack_require__(67).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var dP = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function get() {
      return this;
    }
  });
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
    throw TypeError(name + ': incorrect invocation!');
  }return it;
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ctx = __webpack_require__(18);
var call = __webpack_require__(105);
var isArrayIter = __webpack_require__(80);
var anObject = __webpack_require__(1);
var toLength = __webpack_require__(8);
var getIterFn = __webpack_require__(82);
var BREAK = {};
var RETURN = {};
var _exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () {
    return iterable;
  } : getIterFn(iterable);
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
_exports.BREAK = BREAK;
_exports.RETURN = RETURN;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var redefine = __webpack_require__(13);
module.exports = function (target, src, safe) {
  for (var key in src) {
    redefine(target, key, src[key], safe);
  }return target;
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var def = __webpack_require__(7).f;
var has = __webpack_require__(11);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var defined = __webpack_require__(23);
var fails = __webpack_require__(3);
var spaces = __webpack_require__(70);
var space = '[' + spaces + ']';
var non = '\u200B\x85';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function exporter(KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(19);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(19);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () {
  return arguments;
}()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (e) {/* empty */}
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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// RiveScript.js
// https://www.rivescript.com/

// This code is released under the MIT License.
// See the "LICENSE" file for more information.



/**
Miscellaneous utility functions.
*/

/**
string strip (string)

Strip extra whitespace from both ends of the string, and remove
line breaks anywhere in the string.
*/

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.strip = function (text) {
	text = text.replace(/^[\s\t]+/, "").replace(/[\s\t]+$/, "").replace(/[\x0D\x0A]+/, "");
	return text;
};

/**
string trim (string)

Compatible implementation of `String.prototype.trim()`. Strips whitespace
from the beginning and end of the string, but doesn't remove any
whitespace inside the string like `strip()` does.
*/
exports.trim = function (text) {
	text = text.replace(/^[\x0D\x0A\s\t]+/, "").replace(/[\x0D\x0A\s\t]+$/, "");
	return text;
};

/**
void extend (object a, object b)

Combine the properties of both objects into one. The properties from
object 'b' are inserted into 'a'.
*/
exports.extend = function (a, b) {
	var attr, results, value;
	results = [];
	for (attr in b) {
		value = b[attr];
		if (!b.hasOwnProperty(attr)) {
			continue;
		}
		results.push(a[attr] = value);
	}
	return results;
};

/**
int word_count (string)

Count the number of real words in a string.
*/
exports.word_count = function (trigger, all) {
	var i, len, wc, word, words;
	words = [];
	if (all) {
		words = trigger.split(/\s+/);
	} else {
		words = trigger.split(/[\s\*\#_\|]+/);
	}
	wc = 0;
	for (i = 0, len = words.length; i < len; i++) {
		word = words[i];
		if (word.length > 0) {
			wc++;
		}
	}
	return wc;
};

/**
string stripNasties (string, bool utf8)

Stip special characters out of a string.
*/
exports.stripNasties = function (string, utf8) {
	if (utf8) {
		// Allow most things in UTF8 mode.
		string = string.replace(/[\\<>]+/g, "");
		return string;
	}
	string = string.replace(/[^A-Za-z0-9 ]/g, "");
	return string;
};

/**
string quotemeta (string)

Escape a string for a regexp.
*/
exports.quotemeta = function (string) {
	var char, i, len, unsafe;
	unsafe = "\\.+*?[^]$(){}=!<>|:".split("");
	for (i = 0, len = unsafe.length; i < len; i++) {
		char = unsafe[i];
		string = string.replace(new RegExp("\\" + char, "g"), "\\" + char);
	}
	return string;
};

/**
bool isAtomic (string trigger)

Determine whether a trigger is atomic.
*/
exports.isAtomic = function (trigger) {
	var i, len, ref, special;
	ref = ["*", "#", "_", "(", "[", "<", "@"];
	// Atomic triggers don't contain any wildcards or parenthesis or anything of
	// the sort. We don't need to test the full character set, just left brackets
	// will do.
	for (i = 0, len = ref.length; i < len; i++) {
		special = ref[i];
		if (trigger.indexOf(special) > -1) {
			return false;
		}
	}
	return true;
};

/**
string stringFormat (string type, string)

Formats a string according to one of the following types:
- formal
- sentence
- uppercase
- lowercase
*/
exports.stringFormat = function (type, string) {
	var first, i, len, result, word, words;
	if (type === "uppercase") {
		return string.toUpperCase();
	} else if (type === "lowercase") {
		return string.toLowerCase();
	} else if (type === "sentence") {
		string += "";
		first = string.charAt(0).toUpperCase();
		return first + string.substring(1);
	} else if (type === "formal") {
		words = string.split(/\s+/);
		result = [];
		for (i = 0, len = words.length; i < len; i++) {
			word = words[i];
			first = word.charAt(0).toUpperCase();
			result.push(first + word.substring(1));
		}
		return result.join(" ");
	}
	return content;
};

/**
[]string parseCallArgs

Parse a string and return shell-like arguments as an array. Normally this
means each word in the string becomes an item in the result, but quoted
sections of the input will come back as a single item.

Example:

```javascript
console.log( parseCallArgs('please google "writing chat bot"'));
// ["please", "google", "writing chat bot"]
```
*/
exports.parseCallArgs = function (str) {
	var buff, c, doubleQuoteRe, flushBuffer, i, insideAString, len, result, spaceRe;
	result = [];
	buff = "";
	insideAString = false;
	spaceRe = /\s/ig;
	doubleQuoteRe = /"/ig;
	flushBuffer = function flushBuffer() {
		if (buff.length !== 0) {
			result.push(buff);
		}
		return buff = "";
	};
	for (i = 0, len = str.length; i < len; i++) {
		c = str[i];
		if (c.match(spaceRe) && !insideAString) {
			flushBuffer();
			continue;
		}
		if (c.match(doubleQuoteRe)) {
			if (insideAString) {
				flushBuffer();
			}
			insideAString = !insideAString;
			continue;
		}
		buff += c;
	}
	flushBuffer();
	return result;
};

/**
object clone (object)

Clone an object.
*/
exports.clone = function (obj) {
	var copy, key;
	if (obj === null || (typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== "object") {
		return obj;
	}
	copy = obj.constructor();
	for (key in obj) {
		if (!obj.hasOwnProperty(key)) {
			continue;
		}
		copy[key] = exports.clone(obj[key]);
	}
	return copy;
};

/**
int nIndexOf (string, string match, int index)

Finds a match in a string at a given index

Usage:
string = "My name is Rive"
match = " "
index = 2
return = 7

Summary: It will look for a second space in the string
*/
exports.nIndexOf = function (string, match, index) {
	return string.split(match, index).join(match).length;
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(15);
var toLength = __webpack_require__(8);
var toAbsoluteIndex = __webpack_require__(35);
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
    } else for (; length > index; index++) {
      if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
    }return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.2.2 IsArray(argument)
var cof = __webpack_require__(19);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4);
var cof = __webpack_require__(19);
var MATCH = __webpack_require__(5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () {
    SAFE_CLOSING = true;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () {
    throw 2;
  });
} catch (e) {/* empty */}

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () {
      return { done: safe = true };
    };
    arr[ITERATOR] = function () {
      return iter;
    };
    exec(arr);
  } catch (e) {/* empty */}
  return safe;
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags

var anObject = __webpack_require__(1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hide = __webpack_require__(12);
var redefine = __webpack_require__(13);
var fails = __webpack_require__(3);
var defined = __webpack_require__(23);
var wks = __webpack_require__(5);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () {
      return 7;
    };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
    // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
    ? function (string, arg) {
      return rxfn.call(string, this, arg);
    }
    // 21.2.5.6 RegExp.prototype[@@match](string)
    // 21.2.5.9 RegExp.prototype[@@search](string)
    : function (string) {
      return rxfn.call(string, this);
    });
  }
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var redefineAll = __webpack_require__(41);
var meta = __webpack_require__(29);
var forOf = __webpack_require__(40);
var anInstance = __webpack_require__(39);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var $iterDetect = __webpack_require__(55);
var setToStringTag = __webpack_require__(42);
var inheritIfRequired = __webpack_require__(71);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function fixMethod(KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY, KEY == 'delete' ? function (a) {
      return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'has' ? function has(a) {
      return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'get' ? function get(a) {
      return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'add' ? function add(a) {
      fn.call(this, a === 0 ? 0 : a);return this;
    } : function set(a, b) {
      fn.call(this, a === 0 ? 0 : a, b);return this;
    });
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () {
      instance.has(1);
    });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) {
      new C(iter);
    }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) {
        $instance[ADDER](index, index);
      }return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var uid = __webpack_require__(32);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods

module.exports = __webpack_require__(33) || !__webpack_require__(3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () {/* empty */});
  delete __webpack_require__(2)[K];
});

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/

var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
      var length = arguments.length;
      var A = Array(length);
      while (length--) {
        A[length] = arguments[length];
      }return new this(A);
    } });
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var ctx = __webpack_require__(18);
var forOf = __webpack_require__(40);

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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var core = __webpack_require__(21);
var LIBRARY = __webpack_require__(33);
var wksExt = __webpack_require__(92);
var defineProperty = __webpack_require__(7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var shared = __webpack_require__(50)('keys');
var uid = __webpack_require__(32);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// IE 8- don't enum bug keys
module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);
var check = function check(O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
  function (test, buggy, set) {
    try {
      set = __webpack_require__(18)(Function.call, __webpack_require__(16).f(Object.prototype, '__proto__').set, 2);
      set(test, []);
      buggy = !(test instanceof Array);
    } catch (e) {
      buggy = true;
    }
    return function setPrototypeOf(O, proto) {
      check(O, proto);
      if (buggy) O.__proto__ = proto;else set(O, proto);
      return O;
    };
  }({}, false) : undefined),
  check: check
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = '\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(4);
var setPrototypeOf = __webpack_require__(69).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  }return that;
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(24);
var defined = __webpack_require__(23);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (; n > 0; (n >>>= 1) && (str += str)) {
    if (n & 1) res += str;
  }return res;
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = !$expm1
// Old FF bug
|| $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
// Tor Browser bug
|| $expm1(-2e-17) != -2e-17 ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(24);
var defined = __webpack_require__(23);
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
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LIBRARY = __webpack_require__(33);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var hide = __webpack_require__(12);
var has = __webpack_require__(11);
var Iterators = __webpack_require__(44);
var $iterCreate = __webpack_require__(77);
var setToStringTag = __webpack_require__(42);
var getPrototypeOf = __webpack_require__(17);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function returnThis() {
  return this;
};

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function getMethod(kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS:
        return function keys() {
          return new Constructor(this, kind);
        };
      case VALUES:
        return function values() {
          return new Constructor(this, kind);
        };
    }return function entries() {
      return new Constructor(this, kind);
    };
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
    $default = function values() {
      return $native.call(this);
    };
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
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var create = __webpack_require__(36);
var descriptor = __webpack_require__(31);
var setToStringTag = __webpack_require__(42);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(12)(IteratorPrototype, __webpack_require__(5)('iterator'), function () {
  return this;
});

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(54);
var defined = __webpack_require__(23);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MATCH = __webpack_require__(5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) {/* empty */}
  }return true;
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// check on default Array iterator
var Iterators = __webpack_require__(44);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $defineProperty = __webpack_require__(7);
var createDesc = __webpack_require__(31);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(48);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(44);
module.exports = __webpack_require__(21).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(221);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)


var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) {
    O[index++] = value;
  }return O;
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addToUnscopables = __webpack_require__(30);
var step = __webpack_require__(108);
var Iterators = __webpack_require__(44);
var toIObject = __webpack_require__(15);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(76)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0; // next index
  this._k = kind; // kind
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
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ctx = __webpack_require__(18);
var invoke = __webpack_require__(98);
var html = __webpack_require__(68);
var cel = __webpack_require__(64);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function run() {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function listener(event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) {
      args.push(arguments[i++]);
    }queue[++counter] = function () {
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
  if (__webpack_require__(19)(process) == 'process') {
    defer = function defer(id) {
      process.nextTick(ctx(run, id, 1));
    };
    // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function defer(id) {
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
    defer = function defer(id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
    // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function defer(id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
    // Rest old browsers
  } else {
    defer = function defer(id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var macrotask = __webpack_require__(86).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(19)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function flush() {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();else last = undefined;
        throw e;
      }
    }last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function notify() {
      process.nextTick(flush);
    };
    // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function notify() {
      node.data = toggle = !toggle;
    };
    // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function notify() {
      promise.then(flush);
    };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
  } else {
    notify = function notify() {
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
    }last = task;
  };
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)

var aFunction = __webpack_require__(10);

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
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(6);
var LIBRARY = __webpack_require__(33);
var $typed = __webpack_require__(60);
var hide = __webpack_require__(12);
var redefineAll = __webpack_require__(41);
var fails = __webpack_require__(3);
var anInstance = __webpack_require__(39);
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(8);
var toIndex = __webpack_require__(117);
var gOPN = __webpack_require__(37).f;
var dP = __webpack_require__(7).f;
var arrayFill = __webpack_require__(84);
var setToStringTag = __webpack_require__(42);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8) {}
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8) {}
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8) {}
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8) {}
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  }return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function get() {
      return this[internal];
    } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) {
    store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
  }
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = !__webpack_require__(6) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(64)('div'), 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.f = __webpack_require__(5);

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = __webpack_require__(11);
var toIObject = __webpack_require__(15);
var arrayIndexOf = __webpack_require__(51)(false);
var IE_PROTO = __webpack_require__(66)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) {
    if (key != IE_PROTO) has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys
  while (names.length > i) {
    if (has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  }return result;
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(7);
var anObject = __webpack_require__(1);
var getKeys = __webpack_require__(34);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) {
    dP.f(O, P = keys[i++], Properties[P]);
  }return O;
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(15);
var gOPN = __webpack_require__(37).f;
var toString = {}.toString;

var windowNames = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function getWindowNames(it) {
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
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)

var getKeys = __webpack_require__(34);
var gOPS = __webpack_require__(52);
var pIE = __webpack_require__(47);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(46);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) {
    B[k] = k;
  });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
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
    while (length > j) {
      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    }
  }return T;
} : $assign;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aFunction = __webpack_require__(10);
var isObject = __webpack_require__(4);
var invoke = __webpack_require__(98);
var arraySlice = [].slice;
var factories = {};

var construct = function construct(F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) {
      n[i] = 'a[' + i + ']';
    } // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  }return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function bound() /* args... */{
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
                  var un = that === undefined;
                  switch (args.length) {
                                    case 0:
                                                      return un ? fn() : fn.call(that);
                                    case 1:
                                                      return un ? fn(args[0]) : fn.call(that, args[0]);
                                    case 2:
                                                      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
                                    case 3:
                                                      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
                                    case 4:
                                                      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
                  }return fn.apply(that, args);
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $parseInt = __webpack_require__(2).parseInt;
var $trim = __webpack_require__(43).trim;
var ws = __webpack_require__(70);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
} : $parseInt;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $parseFloat = __webpack_require__(2).parseFloat;
var $trim = __webpack_require__(43).trim;

module.exports = 1 / $parseFloat(__webpack_require__(70) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cof = __webpack_require__(19);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(73);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function roundTiesToEven(n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
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
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(46);
var toLength = __webpack_require__(8);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (; isRight ? index >= 0 : length > index; index += i) {
    if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
  }return memo;
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)


var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];else delete O[to];
    to += inc;
    from += inc;
  }return O;
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (done, value) {
  return { value: value, done: !!done };
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(6) && /./g.flags != 'g') __webpack_require__(7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(56)
});

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(88);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var strong = __webpack_require__(113);
var validate = __webpack_require__(45);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(59)(MAP, function (get) {
  return function Map() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
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
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(7).f;
var create = __webpack_require__(36);
var redefineAll = __webpack_require__(41);
var ctx = __webpack_require__(18);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var $iterDefine = __webpack_require__(76);
var step = __webpack_require__(108);
var setSpecies = __webpack_require__(38);
var DESCRIPTORS = __webpack_require__(6);
var fastKey = __webpack_require__(29).fastKey;
var validate = __webpack_require__(45);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function getEntry(that, key) {
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
  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME; // collection type
      that._i = create(null); // index
      that._f = undefined; // first entry
      that._l = undefined; // last entry
      that[SIZE] = 0; // size
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
      'delete': function _delete(key) {
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
        }return !!entry;
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
          while (entry && entry.r) {
            entry = entry.p;
          }
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function get() {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function def(that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
      // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key, // <- key
        v: value, // <- value
        p: prev = that._l, // <- previous entry
        n: undefined, // <- next entry
        r: false // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    }return that;
  },
  getEntry: getEntry,
  setStrong: function setStrong(C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind; // kind
      this._l = undefined; // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) {
        entry = entry.p;
      } // get next entry
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
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var strong = __webpack_require__(113);
var validate = __webpack_require__(45);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(59)(SET, function (get) {
  return function Set() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var each = __webpack_require__(26)(0);
var redefine = __webpack_require__(13);
var meta = __webpack_require__(29);
var assign = __webpack_require__(96);
var weak = __webpack_require__(116);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var validate = __webpack_require__(45);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function wrapper(get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(59)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () {
  return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7;
})) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
        // store all the rest on native weakmap
      }return method.call(this, a, b);
    });
  });
}

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var redefineAll = __webpack_require__(41);
var getWeak = __webpack_require__(29).getWeak;
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var createArrayMethod = __webpack_require__(26);
var $has = __webpack_require__(11);
var validate = __webpack_require__(45);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function uncaughtFrozenStore(that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function UncaughtFrozenStore() {
  this.a = [];
};
var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function get(key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function has(key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function set(key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;else this.a.push([key, value]);
  },
  'delete': function _delete(key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME; // collection type
      that._i = id++; // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function _delete(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function def(that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(8);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(37);
var gOPS = __webpack_require__(52);
var anObject = __webpack_require__(1);
var Reflect = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray

var isArray = __webpack_require__(53);
var isObject = __webpack_require__(4);
var toLength = __webpack_require__(8);
var ctx = __webpack_require__(18);
var IS_CONCAT_SPREADABLE = __webpack_require__(5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(8);
var repeat = __webpack_require__(72);
var defined = __webpack_require__(23);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getKeys = __webpack_require__(34);
var toIObject = __webpack_require__(15);
var isEnum = __webpack_require__(47).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      if (isEnum.call(O, key = keys[i++])) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }return result;
  };
};

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(48);
var from = __webpack_require__(123);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forOf = __webpack_require__(40);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (arguments.length === 0
  // eslint-disable-next-line no-self-compare
  || x != x
  // eslint-disable-next-line no-self-compare
  || inLow != inLow
  // eslint-disable-next-line no-self-compare
  || inHigh != inHigh
  // eslint-disable-next-line no-self-compare
  || outLow != outLow
  // eslint-disable-next-line no-self-compare
  || outHigh != outHigh) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
function defaultClearTimeout() {
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
})();
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
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
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
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
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
    while (len) {
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

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// RiveScript.js
// https://www.rivescript.com/

// This code is released under the MIT License.
// See the "LICENSE" file for more information.



/**
Topic inheritance functions.

These are helper functions to assist with topic inheritance and includes.
*/

/**
string[] getTopicTriggers (RiveScript rs, string topic, object triglvl,
int depth, int inheritance, int inherited)

Recursively scan through a topic and retrieve a listing of all triggers in
that topic and in all included/inherited topics. Some triggers will come out
with an {inherits} tag to signify inheritance depth.

* topic: The name of the topic
* thats: Boolean, are we getting replies with %Previous or not?
* triglvl: reference to this._topics or this._thats
* depth: recursion depth counter

Each "trigger" returned from this function is actually an array, where index
0 is the trigger text and index 1 is the pointer to the trigger's data within
the original topic structure.
*/

var getTopicTriggers = function getTopicTriggers(rs, topic, thats, depth, inheritance, inherited) {
	var self = this;

	// Initialize default triggers.
	if (thats == null) {
		thats = false;
	}
	if (depth == null) {
		depth = 0;
	}
	if (inheritance == null) {
		inheritance = 0;
	}
	if (inherited == null) {
		inherited = 0;
	}

	// Break if we're in too deep.
	if (depth > rs._depth) {
		rs.warn("Deep recursion while scanning topic inheritance (gave up in topic " + topic + ")!");
		return [];
	}

	// Keep in mind here that there is a difference between 'includes' and
	// 'inherits' -- topics that inherit other topics are able to OVERRIDE
	// triggers that appear in the inherited topic. This means that if the top
	// topic has a trigger of simply '*', then NO triggers are capable of
	// matching in ANY inherited topic, because even though * has the lowest
	// priority, it has an automatic priority over all inherited topics.

	// The getTopicTriggers method takes this into account. All topics that
	// inherit other topics will have their triggers prefixed with a fictional
	// {inherits} tag, which would start at {inherits=0} and increment if this
	// topic has other inheriting topics. So we can use this tag to make sure
	// topics that inherit things will have their triggers always be on top of
	// the stack, from inherits=0 to inherits=n.

	// Important info about the depth vs. inheritance params to this function:
	// depth increments by 1 each time this function recursively calls itself.
	// inheritance increments by 1 only when this topic inherits another topic.

	// This way, '> topic alpha includes beta inherits gamma' will have this
	// effect:
	//  alpha and beta's triggers are combined together into one matching pool,
	//  and then those triggers have higher priority than gamma's.

	// The inherited option is true if this is a recursive call, from a topic
	// that inherits other topics. This forces the {inherits} tag to be added to
	// the triggers. This only applies when the top topic 'includes' another
	// topic.

	rs.say("Collecting trigger list for topic " + topic + " (depth=" + depth + "; " + ("inheritance=" + inheritance + "; inherited=" + inherited + ")"));

	// Topic doesn't exist?
	if (rs._topics[topic] == null) {
		rs.warn("Inherited or included topic '" + topic + "' doesn't exist or " + "has no triggers");
		return [];
	}

	// Collect an array of triggers to return.
	var triggers = [];

	// Get those that exist in this topic directly.
	var inThisTopic = [];
	if (!thats) {
		// The non-that structure is: {topics}->[ array of triggers ]
		if (rs._topics[topic] != null) {
			for (var i = 0, len = rs._topics[topic].length; i < len; i++) {
				var trigger = rs._topics[topic][i];
				inThisTopic.push([trigger.trigger, trigger]);
			}
		}
	} else {
		// The 'that' structure is: {topic}->{cur trig}->{prev trig}->{trigger info}
		if (rs._thats[topic] != null) {
			for (var curTrig in rs._thats[topic]) {
				if (!rs._thats[topic].hasOwnProperty(curTrig)) {
					continue;
				}

				for (var previous in rs._thats[topic][curTrig]) {
					if (!rs._thats[topic][curTrig].hasOwnProperty(previous)) {
						continue;
					}
					var pointer = rs._thats[topic][curTrig][previous];
					inThisTopic.push([pointer.trigger, pointer]);
				}
			}
		}
	}

	// Does this topic include others?
	if (Object.keys(rs._includes[topic]).length > 0) {
		// Check every included topic.
		for (var includes in rs._includes[topic]) {
			if (!rs._includes[topic].hasOwnProperty(includes)) {
				continue;
			}

			rs.say("Topic " + topic + " includes " + includes);
			triggers.push.apply(triggers, getTopicTriggers(rs, includes, thats, depth + 1, inheritance + 1, false));
		}
	}

	// Does this topic inherit others?
	if (Object.keys(rs._inherits[topic]).length > 0) {
		// Check every inherited topic
		for (var inherits in rs._inherits[topic]) {
			if (!rs._inherits[topic].hasOwnProperty(inherits)) {
				continue;
			}

			rs.say("Topic " + topic + " inherits " + inherits);
			triggers.push.apply(triggers, getTopicTriggers(rs, inherits, thats, depth + 1, inheritance + 1, true));
		}
	}

	// Collect the triggers for *this* topic. If this topic inherits any other
	// topics, it means that this topic's triggers have higher priority than
	// those in any inherited topics. Enforce this with an {inherits} tag.
	if (Object.keys(rs._inherits[topic]).length > 0 || inherited) {
		for (var j = 0, len1 = inThisTopic.length; j < len1; j++) {
			var _trigger = inThisTopic[j];

			rs.say("Prefixing trigger with {inherits=" + inheritance + "} " + _trigger);
			triggers.push.apply(triggers, [["{inherits=" + inheritance + "}" + _trigger[0], _trigger[1]]]);
		}
	} else {
		triggers.push.apply(triggers, inThisTopic);
	}
	return triggers;
};

/**
string[] getTopicTree (RiveScript rs, string topic, int depth)

Given a topic, this returns an array of every topic related to it (all the
topics it includes or inherits, plus all the topics included or inherited
by those topics, and so on). The array includes the original topic, too.
*/
var getTopicTree = function getTopicTree(rs, topic, depth) {
	var self = this;

	// Default depth
	if (depth == null) {
		depth = 0;
	}

	// Break if we're in too deep.
	if (depth > rs._depth) {
		rs.warn("Deep recursion while scanning topic tree!");
		return [];
	}

	// Collect an array of all topics.
	var topics = [topic];
	for (var includes in rs._topics[topic].includes) {
		if (!rs._topics[topic].includes.hasOwnProperty(includes)) {
			continue;
		}
		topics.push.apply(topics, getTopicTree(rs, includes, depth + 1));
	}
	for (var inherits in rs._topics[topic].inherits) {
		if (!rs._topics[topic].inherits.hasOwnProperty(inherits)) {
			continue;
		}
		topics.push.apply(topics, getTopicTree(rs, inherits, depth + 1));
	}

	return topics;
};

exports.getTopicTriggers = getTopicTriggers;
exports.getTopicTree = getTopicTree;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(129);
module.exports = __webpack_require__(332);


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(130);

__webpack_require__(327);

__webpack_require__(329);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(90)))

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(131);
__webpack_require__(133);
__webpack_require__(134);
__webpack_require__(135);
__webpack_require__(136);
__webpack_require__(137);
__webpack_require__(138);
__webpack_require__(139);
__webpack_require__(140);
__webpack_require__(141);
__webpack_require__(142);
__webpack_require__(143);
__webpack_require__(144);
__webpack_require__(145);
__webpack_require__(146);
__webpack_require__(147);
__webpack_require__(149);
__webpack_require__(150);
__webpack_require__(151);
__webpack_require__(152);
__webpack_require__(153);
__webpack_require__(154);
__webpack_require__(155);
__webpack_require__(156);
__webpack_require__(157);
__webpack_require__(158);
__webpack_require__(159);
__webpack_require__(160);
__webpack_require__(161);
__webpack_require__(162);
__webpack_require__(163);
__webpack_require__(164);
__webpack_require__(165);
__webpack_require__(166);
__webpack_require__(167);
__webpack_require__(168);
__webpack_require__(169);
__webpack_require__(170);
__webpack_require__(171);
__webpack_require__(172);
__webpack_require__(173);
__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(211);
__webpack_require__(212);
__webpack_require__(214);
__webpack_require__(215);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(85);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(109);
__webpack_require__(237);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(112);
__webpack_require__(114);
__webpack_require__(115);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(323);
__webpack_require__(324);
__webpack_require__(325);
__webpack_require__(326);
module.exports = __webpack_require__(21);

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var global = __webpack_require__(2);
var has = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var META = __webpack_require__(29).KEY;
var $fails = __webpack_require__(3);
var shared = __webpack_require__(50);
var setToStringTag = __webpack_require__(42);
var uid = __webpack_require__(32);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(92);
var wksDefine = __webpack_require__(65);
var enumKeys = __webpack_require__(132);
var isArray = __webpack_require__(53);
var anObject = __webpack_require__(1);
var toIObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(22);
var createDesc = __webpack_require__(31);
var _create = __webpack_require__(36);
var gOPNExt = __webpack_require__(95);
var $GOPD = __webpack_require__(16);
var $DP = __webpack_require__(7);
var $keys = __webpack_require__(34);
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
    get: function get() {
      return dP(this, 'a', { value: 7 }).a;
    }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function wrap(tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && _typeof($Symbol.iterator) == 'symbol' ? function (it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol';
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
    }return setSymbolDesc(it, key, D);
  }return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) {
    $defineProperty(it, key = keys[i++], P[key]);
  }return it;
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
  }return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  }return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function _Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function $set(value) {
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
  __webpack_require__(37).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(47).f = $propertyIsEnumerable;
  __webpack_require__(52).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(33)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols =
// 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), j = 0; es6Symbols.length > j;) {
  wks(es6Symbols[j++]);
}for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) {
  wksDefine(wellKnownSymbols[k++]);
}$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function _for(key) {
    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) {
      if (SymbolRegistry[key] === sym) return key;
    }
  },
  useSetter: function useSetter() {
    setter = true;
  },
  useSimple: function useSimple() {
    setter = false;
  }
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
    while (arguments.length > i) {
      args.push(arguments[i++]);
    }replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function replacer(key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(12)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(34);
var gOPS = __webpack_require__(52);
var pIE = __webpack_require__(47);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) {
      if (isEnum.call(it, key = symbols[i++])) result.push(key);
    }
  }return result;
};

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(36) });

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(7).f });

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperties: __webpack_require__(94) });

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(15);
var $getOwnPropertyDescriptor = __webpack_require__(16).f;

__webpack_require__(25)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(9);
var $getPrototypeOf = __webpack_require__(17);

__webpack_require__(25)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(9);
var $keys = __webpack_require__(34);

__webpack_require__(25)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(25)('getOwnPropertyNames', function () {
  return __webpack_require__(95).f;
});

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(29).onFreeze;

__webpack_require__(25)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(29).onFreeze;

__webpack_require__(25)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(29).onFreeze;

__webpack_require__(25)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(96) });

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(148) });

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(69).set });

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()

var classof = __webpack_require__(48);
var test = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(13)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(97) });

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(7).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
  configurable: true,
  get: function get() {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(4);
var getPrototypeOf = __webpack_require__(17);
var HAS_INSTANCE = __webpack_require__(5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(7).f(FunctionProto, HAS_INSTANCE, { value: function value(O) {
    if (typeof this != 'function' || !isObject(O)) return false;
    if (!isObject(this.prototype)) return O instanceof this;
    // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
    while (O = getPrototypeOf(O)) {
      if (this.prototype === O) return true;
    }return false;
  } });

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(99);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(100);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var has = __webpack_require__(11);
var cof = __webpack_require__(19);
var inheritIfRequired = __webpack_require__(71);
var toPrimitive = __webpack_require__(22);
var fails = __webpack_require__(3);
var gOPN = __webpack_require__(37).f;
var gOPD = __webpack_require__(16).f;
var dP = __webpack_require__(7).f;
var $trim = __webpack_require__(43).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(36)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function toNumber(argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66:case 98:
          radix = 2;maxCode = 49;break; // fast equal /^0b[01]+$/i
        case 79:case 111:
          radix = 8;maxCode = 55;break; // fast equal /^0o[0-7]+$/i
        default:
          return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      }return parseInt(digits, radix);
    }
  }return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
    // check on 1..constructor(foo) case
    && (BROKEN_COF ? fails(function () {
      proto.valueOf.call(that);
    }) : cof(that) != NUMBER) ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(6) ? gOPN(Base) : (
  // ES3:
  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
  // ES6 (in case, if modules with ES6 Number statics required before):
  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(13)(global, NUMBER, $Number);
}

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toInteger = __webpack_require__(24);
var aNumberValue = __webpack_require__(101);
var repeat = __webpack_require__(72);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function multiply(n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function divide(n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = c % n * 1e7;
  }
};
var numToString = function numToString() {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  }return s;
};
var pow = function pow(x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function log(x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  }return n;
};

$export($export.P + $export.F * (!!$toFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128.0.toFixed(0) !== '1000000000000000128') || !__webpack_require__(3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    }return m;
  }
});

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $fails = __webpack_require__(3);
var aNumberValue = __webpack_require__(101);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(102) });

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(102);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(100);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(99);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(103);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
// V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
&& Math.floor($acosh(Number.MAX_VALUE)) == 710
// Tor Browser bug: Math.acosh(Infinity) -> NaN
&& $acosh(Infinity) == Infinity), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(73);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(74);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(104) });

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) {
    // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(103) });

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(73) });

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(74);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(74);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(35);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) {
    // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
    }return res.join('');
  }
});

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var toLength = __webpack_require__(8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    }return res.join('');
  }
});

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()

__webpack_require__(43)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $at = __webpack_require__(75)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(76)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0; // next index
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
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $at = __webpack_require__(75)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])


var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(78);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(79)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
  }
});

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)


var $export = __webpack_require__(0);
var context = __webpack_require__(78);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(79)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(72)
});

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])


var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(78);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(79)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
  }
});

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)

__webpack_require__(14)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()

__webpack_require__(14)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()

__webpack_require__(14)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()

__webpack_require__(14)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()

__webpack_require__(14)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)

__webpack_require__(14)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)

__webpack_require__(14)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()

__webpack_require__(14)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)

__webpack_require__(14)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()

__webpack_require__(14)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()

__webpack_require__(14)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()

__webpack_require__(14)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()

__webpack_require__(14)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function now() {
    return new Date().getTime();
  } });

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(22);

$export($export.P + $export.F * __webpack_require__(3)(function () {
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function toISOString() {
      return 1;
    } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(210);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()

var fails = __webpack_require__(3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function lz(num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
}) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(13)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(12)(proto, TO_PRIMITIVE, __webpack_require__(213));

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(22);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(53) });

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ctx = __webpack_require__(18);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var call = __webpack_require__(105);
var isArrayIter = __webpack_require__(80);
var toLength = __webpack_require__(8);
var createProperty = __webpack_require__(81);
var getIterFn = __webpack_require__(82);

$export($export.S + $export.F * !__webpack_require__(55)(function (iter) {
  Array.from(iter);
}), 'Array', {
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
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var createProperty = __webpack_require__(81);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function () {
  function F() {/* empty */}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of() /* ...args */{
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) {
      createProperty(result, index, arguments[index++]);
    }result.length = aLen;
    return result;
  }
});

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(46) != Object || !__webpack_require__(20)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var html = __webpack_require__(68);
var cof = __webpack_require__(19);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = Array(size);
    var i = 0;
    for (; i < size; i++) {
      cloned[i] = klass == 'String' ? this.charAt(start + i) : this[start + i];
    }return cloned;
  }
});

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var fails = __webpack_require__(3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(20)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined ? $sort.call(toObject(this)) : $sort.call(toObject(this), aFunction(comparefn));
  }
});

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $forEach = __webpack_require__(26)(0);
var STRICT = __webpack_require__(20)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(4);
var isArray = __webpack_require__(53);
var SPECIES = __webpack_require__(5)('species');

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
  }return C === undefined ? Array : C;
};

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $map = __webpack_require__(26)(1);

$export($export.P + $export.F * !__webpack_require__(20)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $filter = __webpack_require__(26)(2);

$export($export.P + $export.F * !__webpack_require__(20)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $some = __webpack_require__(26)(3);

$export($export.P + $export.F * !__webpack_require__(20)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $every = __webpack_require__(26)(4);

$export($export.P + $export.F * !__webpack_require__(20)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $reduce = __webpack_require__(106);

$export($export.P + $export.F * !__webpack_require__(20)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $reduce = __webpack_require__(106);

$export($export.P + $export.F * !__webpack_require__(20)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(51)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(20)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
    // convert -0 to +0
    ? $native.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
  }
});

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(8);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(20)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (; index >= 0; index--) {
      if (index in O) if (O[index] === searchElement) return index || 0;
    }return -1;
  }
});

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(107) });

__webpack_require__(30)('copyWithin');

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(84) });

__webpack_require__(30)('fill');

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

var $export = __webpack_require__(0);
var $find = __webpack_require__(26)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () {
  forced = false;
});
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(30)(KEY);

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

var $export = __webpack_require__(0);
var $find = __webpack_require__(26)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () {
  forced = false;
});
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(30)(KEY);

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(38)('Array');

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var inheritIfRequired = __webpack_require__(71);
var dP = __webpack_require__(7).f;
var gOPN = __webpack_require__(37).f;
var isRegExp = __webpack_require__(54);
var $flags = __webpack_require__(56);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(3)(function () {
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : inheritIfRequired(CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f), tiRE ? this : proto, $RegExp);
  };
  var proxy = function proxy(key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function get() {
        return Base[key];
      },
      set: function set(it) {
        Base[key] = it;
      }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) {
    proxy(keys[i++]);
  }proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(13)(global, 'RegExp', $RegExp);
}

__webpack_require__(38)('RegExp');

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(109);
var anObject = __webpack_require__(1);
var $flags = __webpack_require__(56);
var DESCRIPTORS = __webpack_require__(6);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function define(fn) {
  __webpack_require__(13)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(3)(function () {
  return $toString.call({ source: 'a', flags: 'b' }) != '/a/b';
})) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
  // FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @@match logic
__webpack_require__(57)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';

    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @@replace logic
__webpack_require__(57)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';

    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @@search logic
__webpack_require__(57)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';

    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @@split logic
__webpack_require__(57)('split', 2, function (defined, SPLIT, $split) {
  'use strict';

  var isRegExp = __webpack_require__(54);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function $split(separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) {
              if (arguments[i] === undefined) match[i] = undefined;
            }
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
    // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function $split(separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LIBRARY = __webpack_require__(33);
var global = __webpack_require__(2);
var ctx = __webpack_require__(18);
var classof = __webpack_require__(48);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(10);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var speciesConstructor = __webpack_require__(58);
var task = __webpack_require__(86).set;
var microtask = __webpack_require__(87)();
var newPromiseCapabilityModule = __webpack_require__(88);
var perform = __webpack_require__(110);
var promiseResolve = __webpack_require__(111);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function empty() {/* empty */};
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) {/* empty */}
}();

// helpers
var isThenable = function isThenable(it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function notify(promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function run(reaction) {
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
          if (handler === true) result = value;else {
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
    while (chain.length > i) {
      run(chain[i++]);
    } // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function onUnhandled(promise) {
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
    }promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function isUnhandled(promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  }return true;
};
var onHandleUnhandled = function onHandleUnhandled(promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function $reject(value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function $resolve(value) {
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
    this._c = []; // <- awaiting reactions
    this._a = undefined; // <- checked in isUnhandled reactions
    this._s = 0; // <- state
    this._d = false; // <- done
    this._v = undefined; // <- value
    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false; // <- notify
  };
  Internal.prototype = __webpack_require__(41)($Promise.prototype, {
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
    'catch': function _catch(onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function OwnPromiseCapability() {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function newPromiseCapability(C) {
    return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(42)($Promise, PROMISE);
__webpack_require__(38)(PROMISE);
Wrapper = __webpack_require__(21)[PROMISE];

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
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(55)(function (iter) {
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
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var weak = __webpack_require__(116);
var validate = __webpack_require__(45);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(59)(WEAK_SET, function (get) {
  return function WeakSet() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $typed = __webpack_require__(60);
var buffer = __webpack_require__(89);
var anObject = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);
var isObject = __webpack_require__(4);
var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
var speciesConstructor = __webpack_require__(58);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    }return result;
  }
});

__webpack_require__(38)(ARRAY_BUFFER);

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(60).ABV, {
  DataView: __webpack_require__(89).DataView
});

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(27)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(27)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(27)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(27)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(27)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(27)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(27)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(27)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(27)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var rApply = (__webpack_require__(2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function () {
  rApply(function () {/* empty */});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(36);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var bind = __webpack_require__(97);
var rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() {/* empty */}
  return !(rConstruct(function () {/* empty */}, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () {/* empty */});
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0:
          return new Target();
        case 1:
          return new Target(args[0]);
        case 2:
          return new Target(args[0], args[1]);
        case 3:
          return new Target(args[0], args[1], args[2]);
        case 4:
          return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(7);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(22);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(16).f;
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)

var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var Enumerate = function Enumerate(iterated) {
  this._t = anObject(iterated); // target
  this._i = 0; // next index
  var keys = this._k = []; // keys
  var key;
  for (key in iterated) {
    keys.push(key);
  }
};
__webpack_require__(77)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(16);
var getPrototypeOf = __webpack_require__(17);
var has = __webpack_require__(11);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(16);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(17);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(118) });

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(7);
var gOPD = __webpack_require__(16);
var getPrototypeOf = __webpack_require__(17);
var has = __webpack_require__(11);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(31);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(69);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes

var $export = __webpack_require__(0);
var $includes = __webpack_require__(51)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(30)('includes');

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap

var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(119);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var aFunction = __webpack_require__(10);
var arraySpeciesCreate = __webpack_require__(83);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(30)('flatMap');

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten

var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(119);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var toInteger = __webpack_require__(24);
var arraySpeciesCreate = __webpack_require__(83);

$export($export.P, 'Array', {
  flatten: function flatten() /* depthArg = 1 */{
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(30)('flatten');

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at

var $export = __webpack_require__(0);
var $at = __webpack_require__(75)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end

var $export = __webpack_require__(0);
var $pad = __webpack_require__(120);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end

var $export = __webpack_require__(0);
var $pad = __webpack_require__(120);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim

__webpack_require__(43)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim

__webpack_require__(43)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/

var $export = __webpack_require__(0);
var defined = __webpack_require__(23);
var toLength = __webpack_require__(8);
var isRegExp = __webpack_require__(54);
var getFlags = __webpack_require__(56);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function $RegExpStringIterator(regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(77)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(65)('asyncIterator');

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(65)('observable');

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(118);
var toIObject = __webpack_require__(15);
var gOPD = __webpack_require__(16);
var createProperty = __webpack_require__(81);

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
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(121)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(121)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(6) && $export($export.P + __webpack_require__(61), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(6) && $export($export.P + __webpack_require__(61), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(17);
var getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(61), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(17);
var getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(61), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(122)('Map') });

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(122)('Set') });

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(62)('Map');

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(62)('Set');

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(62)('WeakMap');

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(62)('WeakSet');

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(63)('Map');

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(63)('Set');

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(63)('WeakMap');

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(63)('WeakSet');

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(2) });

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(2) });

/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(19);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(124);
var fround = __webpack_require__(104);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(124) });

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
    // eslint-disable-next-line no-self-compare
    return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
  } });

/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally


var $export = __webpack_require__(0);
var core = __webpack_require__(21);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(58);
var promiseResolve = __webpack_require__(111);

$export($export.P + $export.R, 'Promise', { 'finally': function _finally(onFinally) {
    var C = speciesConstructor(this, core.Promise || global.Promise);
    var isFunction = typeof onFinally == 'function';
    return this.then(isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () {
        return x;
      });
    } : onFinally, isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () {
        throw e;
      });
    } : onFinally);
  } });

/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try

var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(88);
var perform = __webpack_require__(110);

$export($export.S, 'Promise', { 'try': function _try(callbackfn) {
    var promiseCapability = newPromiseCapability.f(this);
    var result = perform(callbackfn);
    (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
    return promiseCapability.promise;
  } });

/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
    ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
  } });

/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
    var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
    if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
    if (metadataMap.size) return true;
    var targetMetadata = store.get(target);
    targetMetadata['delete'](targetKey);
    return !!targetMetadata.size || store['delete'](target);
  } });

/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function ordinaryGetMetadata(MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
    return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
  } });

/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Set = __webpack_require__(114);
var from = __webpack_require__(123);
var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function ordinaryMetadataKeys(O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
    return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
  } });

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
    return ordinaryGetOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
  } });

/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
    return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
  } });

/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function ordinaryHasMetadata(MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
    return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
  } });

/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
    return ordinaryHasOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
  } });

/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
    return function decorator(target, targetKey) {
      ordinaryDefineOwnMetadata(metadataKey, metadataValue, (targetKey !== undefined ? anObject : aFunction)(target), toMetaKey(targetKey));
    };
  } });

/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(87)();
var process = __webpack_require__(2).process;
var isNode = __webpack_require__(19)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable

var $export = __webpack_require__(0);
var global = __webpack_require__(2);
var core = __webpack_require__(21);
var microtask = __webpack_require__(87)();
var OBSERVABLE = __webpack_require__(5)('observable');
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var anInstance = __webpack_require__(39);
var redefineAll = __webpack_require__(41);
var hide = __webpack_require__(12);
var forOf = __webpack_require__(40);
var RETURN = forOf.RETURN;

var getMethod = function getMethod(fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function cleanupSubscription(subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function subscriptionClosed(subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function closeSubscription(subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function Subscription(observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function cleanup() {
        subscription.unsubscribe();
      };else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  }if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() {
    closeSubscription(this);
  }
});

var SubscriptionObserver = function SubscriptionObserver(subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    }cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      }cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function next(value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          }observer.complete();
        }
      });
      return function () {
        done = true;
      };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = Array(l); i < l;) {
      items[i] = arguments[i++];
    }return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          }observer.complete();
        }
      });
      return function () {
        done = true;
      };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () {
  return this;
});

$export($export.G, { Observable: $Observable });

__webpack_require__(38)('Observable');

/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var navigator = global.navigator;
var slice = [].slice;
var MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function wrap(set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $task = __webpack_require__(86);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $iterators = __webpack_require__(85);
var getKeys = __webpack_require__(34);
var redefine = __webpack_require__(13);
var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var Iterators = __webpack_require__(44);
var wks = __webpack_require__(5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) {
      if (!proto[key]) redefine(proto, key, $iterators[key], true);
    }
  }
}

/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!function (global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = ( false ? "undefined" : _typeof(module)) === "object";
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
  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
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
  runtime.awrap = function (arg) {
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
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function (unwrapped) {
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

    if (_typeof(global.process) === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function (resolve, reject) {
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
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
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
  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
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
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

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
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
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

    if (!info) {
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
  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
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

  runtime.keys = function (object) {
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
        var i = -1,
            next = function next() {
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

    reset: function reset(skipTempReset) {
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
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
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

        return !!caught;
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

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
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

    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
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

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function _catch(tryLoc) {
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

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
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
}(
// Among the various tricks for obtaining a reference to the global
// object, this seems to be the most reliable technique that does not
// use indirect eval (which violates Content Security Policy).
(typeof global === "undefined" ? "undefined" : _typeof(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" ? self : undefined);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(90), __webpack_require__(328)(module)))

/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(330);
module.exports = __webpack_require__(21).RegExp.escape;

/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(331)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) {
    return $re(it);
  } });

/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};

/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {// RiveScript.js
// https://www.rivescript.com/

// This code is released under the MIT License.
// See the "LICENSE" file for more information.



/**
Notice to Developers

The methods prefixed with the word "private" *should not be used* by you. They
are documented here to help the RiveScript library developers understand the
code; they are not considered 'stable' API functions and they may change or
be removed at any time, for any reason, and with no advance notice.

The most commonly used private function I've seen developers use is the
`parse()` function, when they want to load RiveScript code from a string
instead of a file. **Do not use this function.** The public API equivalent
function is `stream()`. The parse function will probably be removed in the
near future.
*/

// Constants

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VERSION = "2.0.0-alpha.6";

// Helper modules
var Parser = __webpack_require__(333);
var Brain = __webpack_require__(334);
var utils = __webpack_require__(49);
var sorting = __webpack_require__(335);
var inherit_utils = __webpack_require__(126);

var _require = __webpack_require__(336),
    MemorySessionManager = _require.MemorySessionManager;

var JSObjectHandler = __webpack_require__(337);
var readDir = __webpack_require__(338);

/**
RiveScript (hash options)

Create a new RiveScript interpreter. `options` is an object with the
following keys:

```
* bool debug:     Debug mode               (default false)
* int  depth:     Recursion depth limit    (default 50)
* bool strict:    Strict mode              (default true)
* bool utf8:      Enable UTF-8 mode        (default false, see below)
* bool forceCase: Force-lowercase triggers (default false, see below)
* func onDebug:   Set a custom handler to catch debug log messages (default null)
* obj  errors:    Customize certain error messages (see below)
* str  concat:    Globally replace the default concatenation mode when parsing
                  RiveScript source files (default `null`. be careful when
                  setting this option if using somebody else's RiveScript
                  personality; see below)
* sessionManager: provide a custom session manager to store user variables.
                  The default is to store variables in memory, but you may
                  use any async data store by providing an implementation of
                  RiveScript's SessionManager. See the
                  [sessions](./sessions.md) documentation.
```

## UTF-8 Mode

In UTF-8 mode, most characters in a user's message are left intact, except for
certain metacharacters like backslashes and common punctuation characters like
`/[.,!?;:]/`.

If you want to override the punctuation regexp, you can provide a new one by
assigning the `unicodePunctuation` attribute of the bot object after
initialization. Example:

```javascript
var bot = new RiveScript({utf8: true});
bot.unicodePunctuation = new RegExp(/[.,!?;:]/g);
```

## Force Case

This option to the constructor will make RiveScript lowercase all the triggers
it sees during parse time. This may ease the pain point that authors
experience when they need to write a lowercase "i" in triggers, for example
a trigger of `i am *`, where the lowercase `i` feels unnatural to type.

By default a capital ASCII letter in a trigger would raise a parse error.
Setting the `forceCase` option to `true` will instead silently lowercase the
trigger and thus avoid the error.

Do note, however, that this can have side effects with certain Unicode symbols
in triggers, see [case folding in Unicode](https://www.w3.org/International/wiki/Case_folding).
If you need to support Unicode symbols in triggers this may cause problems with
certain symbols when made lowercase.

## Global Concat Mode

The concat (short for concatenation) mode controls how RiveScript joins two
lines of code together when a `^Continue` command is used in a source file.
By default, RiveScript simply joins them together with no symbols inserted in
between ("none"); the other options are "newline" which joins them with line
breaks, or "space" which joins them with a single space character.

RiveScript source files can define a *local, file-scoped* setting for this
by using e.g. `! local concat = newline`, which affects how the continuations
are joined in the lines that follow.

Be careful when changing the global concat setting if you're using a RiveScript
personality written by somebody else; if they were relying on the default
concat behavior (didn't specify a `! local concat` option), then changing the
global default will potentially cause formatting issues or trigger matching
issues when using that personality.

I strongly recommend that you **do not** use this option if you intend to ever
share your RiveScript personality with others; instead, explicitly spell out
the local concat mode in each source file. It might sound like it will save
you a lot of typing by not having to copy and paste a `! local concat` option,
but it will likely lead to misbehavior in your RiveScript personality when you
give it to somebody else to use in their bot.

## Custom Error Messages

You can provide any or all of the following properties in the `errors`
argument to the constructor to override certain internal error messages:

* `replyNotMatched`: The message returned when the user's message does not
match any triggers in your RiveScript code.

The default is "ERR: No Reply Matched"

**Note:** the recommended way to handle this case is to provide a trigger of
simply `*`, which serves as the catch-all trigger and is the default one
that will match if nothing else matches the user's message. Example:

```
+ *
- I don't know what to say to that!
```
* `replyNotFound`: This message is returned when the user *did* in fact match
a trigger, but no response was found for the user. For example, if a trigger
only checks a set of conditions that are all false and provides no "normal"
reply, this error message is given to the user instead.

The default is "ERR: No Reply Found"

**Note:** the recommended way to handle this case is to provide at least one
normal reply (with the `-` command) to every trigger to cover the cases
where none of the conditions are true. Example:

```
+ hello
* <get name> != undefined => Hello there, <get name>.
- Hi there.
```
* `objectNotFound`: This message is inserted into the bot's reply in-line when
it attempts to call an object macro which does not exist (for example, its
name was invalid or it was written in a programming language that the bot
couldn't parse, or that it had compile errors).

The default is "[ERR: Object Not Found]"
* `deepRecursion`: This message is inserted when the bot encounters a deep
recursion situation, for example when a reply redirects to a trigger which
redirects back to the first trigger, creating an infinite loop.

The default is "ERR: Deep Recursion Detected"

These custom error messages can be provided during the construction of the
RiveScript object, or set afterwards on the object's `errors` property.

Examples:

```javascript
var bot = new RiveScript({
errors: {
replyNotFound: "I don't know how to reply to that."
}
});

bot.errors.objectNotFound = "Something went terribly wrong.";
```
*/
var RiveScript = function () {
	var RiveScript = function () {
		////////////////////////////////////////////////////////////////////////
		// Constructor and Debug Methods                                      //
		////////////////////////////////////////////////////////////////////////
		function RiveScript(opts) {
			_classCallCheck(this, RiveScript);

			var self = this;
			if (opts == null) {
				opts = {};
			}

			// Default parameters
			self._debug = opts.debug ? opts.debug : false;
			self._strict = opts.strict ? opts.strict : true;
			self._depth = opts.depth ? parseInt(opts.depth) : 50;
			self._utf8 = opts.utf8 ? opts.utf8 : false;
			self._forceCase = opts.forceCase ? opts.forceCase : false;
			self._onDebug = opts.onDebug ? opts.onDebug : null;
			self._concat = opts.concat ? opts.concat : null;

			// UTF-8 punctuation, overridable by the user.
			self.unicodePunctuation = new RegExp(/[.,!?;:]/g);

			// Customized error messages.
			self.errors = {
				replyNotMatched: "ERR: No Reply Matched",
				replyNotFound: "ERR: No Reply Found",
				objectNotFound: "[ERR: Object Not Found]",
				deepRecursion: "ERR: Deep Recursion Detected"
			};
			if (_typeof(opts.errors) === "object") {
				var ref = opts.errors;
				for (var key in ref) {
					var value = ref[key];
					if (opts.errors.hasOwnProperty(key)) {
						self.errors[key] = value;
					}
				}
			}
			// Identify our runtime environment. Web, or node?
			self._node = {}; // NodeJS objects
			self._runtime = self.runtime();

			// Sub-module helpers.
			self.parser = new Parser(self);
			self.brain = new Brain(self);

			// Loading files in will be asynchronous, so we'll need to abe able to
			// identify when we've finished loading files! This will be an object
			// to keep track of which files are still pending.
			self._pending = [];
			self._loadCount = 0;

			// Internal data structures
			self._global = {}; // 'global' variables
			self._var = {}; // 'bot' variables
			self._sub = {}; // 'sub' substitutions
			self._submax = 1; // 'submax' max words in sub object
			self._person = {}; // 'person' substitutions
			self._personmax = 1; // 'personmax' max words in person object
			self._array = {}; // 'array' variables
			self._session = null; // session manager for user variables
			self._includes = {}; // included topics
			self._inherits = {}; // inherited topics
			self._handlers = {}; // object handlers
			self._objlangs = {}; // map objects to their languages
			self._topics = {}; // main reply structure
			self._thats = {}; // %Previous reply structure (pointers into @_topics)
			self._sorted = {}; // Sorted buffers

			// Given any options?
			if ((typeof opts === "undefined" ? "undefined" : _typeof(opts)) === "object") {
				if (opts.debug) {
					self._debug = true;
				}
				if (opts.strict) {
					self._strict = true;
				}
				if (opts.depth) {
					self._depth = parseInt(opts.depth);
				}
				if (opts.utf8) {
					self._utf8 = true;
				}
				if (opts.sessionManager) {
					self._session = opts.sessionManager;
				}
			}

			// Initialize the default session manager.
			if (self._session === null) {
				self._session = new MemorySessionManager();
			}

			// Set the default JavaScript language handler.
			self._handlers.javascript = new JSObjectHandler(self);
			self.say("RiveScript Interpreter v" + VERSION + " Initialized.");
			self.say("Runtime Environment: " + self._runtime);
		}

		/**
  string version ()
  	Returns the version number of the RiveScript.js library.
  */


		_createClass(RiveScript, [{
			key: "version",
			value: function version() {
				return VERSION;
			}

			/**
   private void runtime ()
   	Detect the runtime environment of this module, to determine if we're
   running in a web browser or from node.
   */

		}, {
			key: "runtime",
			value: function runtime() {
				var self = this;

				// Webpack and browserify define `process.browser` so this is the best place
				// to check if we're running in a web environment.
				if (process.browser) {
					return "web";
				}

				// Import the Node filesystem library.
				self._node.fs = __webpack_require__(127);
				return "node";
			}

			/**
   private void say (string message)
   	This is the debug function. If debug mode is enabled, the 'message' will be
   sent to the console via console.log (if available), or to your `onDebug`
   handler if you defined one.
   */

		}, {
			key: "say",
			value: function say(message) {
				var self = this;
				if (self._debug !== true) {
					return;
				}

				// Debug log handler defined?
				if (self._onDebug) {
					return self._onDebug(message);
				} else {
					return console.log(message);
				}
			}

			/**
   private void warn (string message[, filename, lineno])
   	Print a warning or error message. This is like debug, except it's GOING to
   be given to the user one way or another. If the `onDebug` handler is
   defined, this is sent there. If `console` is available, this will be sent
   there. In a worst case scenario, an alert box is shown.
   */

		}, {
			key: "warn",
			value: function warn(message, filename, lineno) {
				var self = this;

				// Provided a file and line?
				if (filename != null && lineno != null) {
					message += " at " + filename + " line " + lineno;
				}
				if (self._onDebug) {
					return self._onDebug("[WARNING] " + message);
				} else if (console) {
					if (console.error) {
						return console.error(message);
					} else {
						return console.log("[WARNING] " + message);
					}
				} else if (window) {
					return window.alert(message);
				}
			}

			////////////////////////////////////////////////////////////////////////
			// Loading and Parsing Methods                                        //
			////////////////////////////////////////////////////////////////////////

			/**
   async loadFile(string path || array path)
   	Load a RiveScript document from a file. The path can either be a string that
   contains the path to a single file, or an array of paths to load multiple
   files. The Promise resolves when all of the files have been parsed and
   loaded. The Promise rejects on error.
   	This loading method is asynchronous so you must resolve the promise or
   await it before you go on to sort the replies.
   	For backwards compatibility, this function can take callbacks instead
   of returning a Promise:
   	> `rs.loadDirectory(path, onSuccess(), onError(err, filename, lineno))`
   	* resolves: `()`
   * rejects: `(string error)`
   */

		}, {
			key: "loadFile",
			value: function () {
				var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path, onSuccess, onError) {
					var self, promises, i, len, file, promise;
					return regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									self = this;

									// Did they give us a single path?

									if (typeof path === "string") {
										path = [path];
									}

									promises = new Array();

									for (i = 0, len = path.length; i < len; i++) {
										file = path[i];

										self.say("Request to load file: " + file);
										promises.push(function (f) {
											// This function returns a Promise. How are we going to load
											// the file?
											if (self._runtime === "web") {
												// Via ajax!
												return self._ajaxLoadFile(f);
											} else {
												// With node fs module!
												return self._nodeLoadFile(f);
											}
										}(file));
									}

									// The final Promise to return.
									promise = new Promise(function (resolve, reject) {
										Promise.all(promises).then(resolve).catch(reject);
									});

									// Legacy callback style?

									if (!(typeof onSuccess === "function")) {
										_context.next = 10;
										break;
									}

									self.warn("DEPRECATED: RiveScript.loadFile() now returns a Promise instead of using callbacks");
									return _context.abrupt("return", promise.then(onSuccess).catch(function (err, filename, lineno) {
										if (typeof onError === "function") {
											onError.call(null, err, filename, lineno);
										}
									}));

								case 10:
									return _context.abrupt("return", promise);

								case 11:
								case "end":
									return _context.stop();
							}
						}
					}, _callee, this);
				}));

				function loadFile(_x, _x2, _x3) {
					return _ref.apply(this, arguments);
				}

				return loadFile;
			}()

			// Load a file using ajax. DO NOT CALL THIS DIRECTLY.
			// Returns a Promise.

		}, {
			key: "_ajaxLoadFile",
			value: function () {
				var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(file) {
					var self;
					return regeneratorRuntime.wrap(function _callee2$(_context2) {
						while (1) {
							switch (_context2.prev = _context2.next) {
								case 0:
									self = this;
									return _context2.abrupt("return", new Promise(function (resolve, reject) {
										var xhr = new XMLHttpRequest();
										xhr.open("GET", file, true);
										xhr.onreadystatechange = function () {
											var ref;
											if (xhr.readyState === 4) {
												var _ref3 = xhr.status;
												if (_ref3 === 200) {
													self.say("Loading file " + file + " complete.");

													// Parse it!
													var ok = self.parse(file, xhr.responseText, function (err) {
														reject(err);
													});
													if (ok) {
														resolve();
													} else {
														reject("parser error");
													}
												} else {
													self.warn("Network error in XMLHttpRequest for file " + file);
													reject("Failed to load file " + file + ": network error");
												}
											}
										};
										xhr.send(null);
									}));

								case 2:
								case "end":
									return _context2.stop();
							}
						}
					}, _callee2, this);
				}));

				function _ajaxLoadFile(_x4) {
					return _ref2.apply(this, arguments);
				}

				return _ajaxLoadFile;
			}()

			// Load a file using node. DO NOT CALL THIS DIRECTLY.
			// Returns a Promise.

		}, {
			key: "_nodeLoadFile",
			value: function () {
				var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(file) {
					var self;
					return regeneratorRuntime.wrap(function _callee3$(_context3) {
						while (1) {
							switch (_context3.prev = _context3.next) {
								case 0:
									self = this;
									return _context3.abrupt("return", new Promise(function (resolve, reject) {
										// Load the file.
										return self._node.fs.readFile(file, function (err, data) {
											if (err) {
												reject(err);
												return;
											}

											// Parse it!
											var ok = self.parse(file, "" + data, function (err) {
												reject(err);
											});
											if (ok) {
												resolve();
											} else {
												reject("parser error");
											}
										});
									}));

								case 2:
								case "end":
									return _context3.stop();
							}
						}
					}, _callee3, this);
				}));

				function _nodeLoadFile(_x5) {
					return _ref4.apply(this, arguments);
				}

				return _nodeLoadFile;
			}()

			/**
   async loadDirectory (string path)
   	Load RiveScript documents from a directory recursively.
   	For backwards compatibility, this function can take callbacks instead
   of returning a Promise:
   	> `rs.loadDirectory(path, onSuccess(), onError(err, filename, lineno))`
   	This function is not supported in a web environment.
   */

		}, {
			key: "loadDirectory",
			value: function () {
				var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(path, onSuccess, onError) {
					var self, promise;
					return regeneratorRuntime.wrap(function _callee4$(_context4) {
						while (1) {
							switch (_context4.prev = _context4.next) {
								case 0:
									self = this;
									promise = new Promise(function (resolve, reject) {
										// Can't be done on the web!
										if (self._runtime === "web") {
											reject("loadDirectory can't be used on the web!");
											return;
										}

										// Verify the directory exists.
										self._node.fs.stat(path, function (err, stats) {
											if (err) {
												reject(err);
												return;
											}
											if (!stats.isDirectory()) {
												reject(path + " is not a directory");
												return;
											}
											self.say("Loading from directory " + path);

											// Load all the files.
											var files = readDir(path);
											var toLoad = new Array();
											for (var i = 0, len = files.length; i < len; i++) {
												var file = files[i];
												if (file.match(/\.(rive|rs)$/i)) {
													// Keep track of the file's status.
													toLoad.push(path + "/" + file);
												}
											}
											self.loadFile(toLoad).then(resolve).catch(reject);
										});
									});

									// Legacy callback-style?

									if (!(typeof onSuccess === "function")) {
										_context4.next = 5;
										break;
									}

									self.warn("DEPRECATED: RiveScript.loadDirectory() now returns a Promise instead of using callbacks");
									return _context4.abrupt("return", promise.then(onSuccess).catch(function (err, filename, lineno) {
										if (typeof onError === "function") {
											onError.call(null, err, filename, lineno);
										}
									}));

								case 5:
									return _context4.abrupt("return", promise);

								case 6:
								case "end":
									return _context4.stop();
							}
						}
					}, _callee4, this);
				}));

				function loadDirectory(_x6, _x7, _x8) {
					return _ref5.apply(this, arguments);
				}

				return loadDirectory;
			}()

			/**
   bool stream (string code[, func onError])
   	Load RiveScript source code from a string. `code` should be the raw
   RiveScript source code, with line breaks separating each line.
   	This function is synchronous, meaning it does not return a Promise. It
   parses the code immediately and returns. Do not fear: the parser runs
   very quickly.
   	Returns `true` if the code parsed with no error.
   	onError function receives: `(err string[, filename str, line_no int])`
   */

		}, {
			key: "stream",
			value: function stream(code, onError) {
				var self = this;
				return self.parse("stream()", code, onError);
			}

			/**
   private bool parse (string name, string code[, func onError(string)])
   	Parse RiveScript code and load it into memory. `name` is a file name in case
   syntax errors need to be pointed out. `code` is the source code.
   	Returns `true` if the code parsed with no error.
   */

		}, {
			key: "parse",
			value: function parse(filename, code, onError) {
				var self = this;
				self.say("Parsing code!");

				// Get the "abstract syntax tree"
				var ok = true;
				var ast = self.parser.parse(filename, code, function (err, fn, ln) {
					if (typeof onError === "function") {
						onError.call(null, err, fn, ln);
					}
					ok = false;
				});

				// Get all of the "begin" type variables: global, var, sub, person, array..
				for (var type in ast.begin) {
					var vars = ast.begin[type];
					if (!ast.begin.hasOwnProperty(type)) {
						continue;
					}
					var internal = "_" + type; // so "global" maps to self._global

					for (var name in vars) {
						var value = vars[name];
						if (type === 'sub' || type === 'person') {
							self[internal + "max"] = Math.max(self[internal + "max"], name.split(" ").length);
						}
						if (!vars.hasOwnProperty(name)) {
							continue;
						}

						if (value === "<undef>") {
							delete self[internal][name];
						} else {
							self[internal][name] = value;
						}
					}
				}

				// Let the scripts set the debug mode and other internals.
				if (self._global.debug != null) {
					self._debug = self._global.debug === "true";
				}
				if (self._global.depth != null) {
					self._depth = parseInt(self._global.depth) || 50;
				}

				// Consume all the parsed triggers.
				for (var topic in ast.topics) {
					var data = ast.topics[topic];
					if (!ast.topics.hasOwnProperty(topic)) {
						continue;
					}

					// Keep a map of the topics that are included/inherited under self topic.
					if (self._includes[topic] == null) {
						self._includes[topic] = {};
					}
					if (self._inherits[topic] == null) {
						self._inherits[topic] = {};
					}
					utils.extend(self._includes[topic], data.includes);
					utils.extend(self._inherits[topic], data.inherits);

					// Consume the triggers.
					if (self._topics[topic] == null) {
						self._topics[topic] = [];
					}
					for (var i = 0, len = data.triggers.length; i < len; i++) {
						var trigger = data.triggers[i];
						self._topics[topic].push(trigger);

						// Does this trigger have a %Previous? If so, make a pointer to this
						// exact trigger in @_thats.
						if (trigger.previous != null) {
							// Initialize the @_thats structure first.
							if (self._thats[topic] == null) {
								self._thats[topic] = {};
							}
							if (self._thats[topic][trigger.trigger] == null) {
								self._thats[topic][trigger.trigger] = {};
							}
							self._thats[topic][trigger.trigger][trigger.previous] = trigger;
						}
					}
				}

				// Load all the parsed objects.
				var results = [];
				for (var j = 0, _len = ast.objects.length; j < _len; j++) {
					var object = ast.objects[j];

					// Have a handler for it?
					if (self._handlers[object.language]) {
						self._objlangs[object.name] = object.language;
						results.push(self._handlers[object.language].load(object.name, object.code));
					}
				}

				return ok;
			}

			/**
   void sortReplies()
   	After you have finished loading your RiveScript code, call this method to
   populate the various sort buffers. This is absolutely necessary for reply
   matching to work efficiently!
   */

		}, {
			key: "sortReplies",
			value: function sortReplies() {
				var self = this;

				// (Re)initialize the sort cache.
				self._sorted.topics = {};
				self._sorted.thats = {};

				self.say("Sorting triggers...");

				// Loop through all the topics.
				for (var topic in self._topics) {
					if (!self._topics.hasOwnProperty(topic)) {
						continue;
					}
					self.say("Analyzing topic " + topic + "...");

					// Collect a list of all the triggers we're going to worry about. If this
					// topic inherits another topic, we need to recursively add those to the
					// list as well.
					var allTriggers = inherit_utils.getTopicTriggers(self, topic);

					// Sort these triggers.
					self._sorted.topics[topic] = sorting.sortTriggerSet(allTriggers, true);

					// Get all of the %Previous triggers for this topic.
					var thatTriggers = inherit_utils.getTopicTriggers(self, topic, true);

					// And sort them, too.
					self._sorted.thats[topic] = sorting.sortTriggerSet(thatTriggers, false);
				}

				// Sort the substitution lists.
				self._sorted.sub = sorting.sortList(Object.keys(self._sub));
				return self._sorted.person = sorting.sortList(Object.keys(self._person));
			}

			/**
   data deparse()
   	Translate the in-memory representation of the loaded RiveScript documents
   into a JSON-serializable data structure. This may be useful for developing
   a user interface to edit RiveScript replies without having to edit the
   RiveScript code manually, in conjunction with the `write()` method.
   	The format of the deparsed data structure is out of scope for this document,
   but there is additional information and examples available in the `eg/`
   directory of the source distribution. You can read the documentation on
   GitHub here: [RiveScript Deparse](https://github.com/aichaos/rivescript-js/tree/master/eg/deparse)
   */

		}, {
			key: "deparse",
			value: function deparse() {
				var self = this;

				// Data to return from this function.
				var result = {
					begin: {
						global: utils.clone(self._global),
						var: utils.clone(self._var),
						sub: utils.clone(self._sub),
						person: utils.clone(self._person),
						array: utils.clone(self._array),
						triggers: []
					},
					topics: utils.clone(self._topics),
					inherits: utils.clone(self._inherits),
					includes: utils.clone(self._includes),
					objects: {}
				};

				for (var key in self._handlers) {
					result.objects[key] = {
						_objects: utils.clone(self._handlers[key]._objects)
					};
				}

				// Begin topic.
				if (result.topics.__begin__ != null) {
					result.begin.triggers = result.topics.__begin__;
					delete result.topics.__begin__;
				}

				// Populate config fields if they differ from the defaults.
				if (self._debug) {
					result.begin.global.debug = self._debug;
				}
				if (self._depth !== 50) {
					result.begin.global.depth = self._depth;
				}

				return result;
			}

			/**
   string stringify([data deparsed])
   	Translate the in-memory representation of the RiveScript brain back into
   RiveScript source code. This is like `write()`, but it returns the text of
   the source code as a string instead of writing it to a file.
   	You can optionally pass the parameter `deparsed`, which should be a data
   structure of the same format that the `deparse()` method returns. If not
   provided, the current internal data is used (this function calls `deparse()`
   itself and uses that).
   	Warning: the output of this function won't be pretty. For example, no word
   wrapping will be done for your longer replies. The only guarantee is that
   what comes out of this function is valid RiveScript code that can be loaded
   back in later.
   */

		}, {
			key: "stringify",
			value: function stringify(deparsed) {
				var self = this;
				return self.parser.stringify(deparsed);
			}

			/**
   void write (string filename[, data deparsed])
   	Write the in-memory RiveScript data into a RiveScript text file. This
   method can not be used on the web; it requires filesystem access and can
   only run from a Node environment.
   	This calls the `stringify()` method and writes the output into the filename
   specified. You can provide your own deparse-compatible data structure,
   or else the current state of the bot's brain is used instead.
   */

		}, {
			key: "write",
			value: function write(filename, deparsed) {
				var self = this;

				// Can't be done on the web!
				if (self._runtime === "web") {
					self.warn("write() can't be used on the web!");
					return;
				}

				return self._node.fs.writeFile(filename, self.stringify(deparsed), function (err) {
					if (err) {
						return self.warn("Error writing to file " + filename + ": " + err);
					}
				});
			}

			////////////////////////////////////////////////////////////////////////
			// Public Configuration Methods                                       //
			////////////////////////////////////////////////////////////////////////

			/**
   void setHandler(string lang, object)
   	Set a custom language handler for RiveScript object macros. See the source
   for the built-in JavaScript handler (src/lang/javascript.coffee) as an
   example.
   	By default, JavaScript object macros are enabled. If you want to disable
   these (e.g. for security purposes when loading untrusted third-party code),
   just set the JavaScript handler to null:
   	```javascript
   var bot = new RiveScript();
   bot.setHandler("javascript", null);
   ```
   */

		}, {
			key: "setHandler",
			value: function setHandler(lang, obj) {
				var self = this;

				if (obj === void 0) {
					return delete self._handlers[lang];
				} else {
					return self._handlers[lang] = obj;
				}
			}

			/**
   void setSubroutine(string name, function)
   	Define a JavaScript object macro from your program.
   	This is equivalent to having a JS object defined in the RiveScript code,
   except your JavaScript code is defining it instead.
   */

		}, {
			key: "setSubroutine",
			value: function setSubroutine(name, code) {
				var self = this;

				// Do we have a JS handler?
				if (self._handlers.javascript) {
					self._objlangs[name] = "javascript";
					return self._handlers.javascript.load(name, code);
				}
			}

			/**
   void setGlobal (string name, string value)
   	Set a global variable. This is equivalent to `! global` in RiveScript.
   Set the value to `undefined` to delete a global.
   */

		}, {
			key: "setGlobal",
			value: function setGlobal(name, value) {
				var self = this;

				if (value === void 0) {
					return delete self._global[name];
				} else {
					return self._global[name] = value;
				}
			}

			/**
   void setVariable (string name, string value)
   	Set a bot variable. This is equivalent to `! var` in RiveScript.
   Set the value to `undefined` to delete a bot variable.
   */

		}, {
			key: "setVariable",
			value: function setVariable(name, value) {
				var self = this;

				if (value === void 0) {
					return delete self._var[name];
				} else {
					return self._var[name] = value;
				}
			}

			/**
   void setSubstitution (string name, string value)
   	Set a substitution. This is equivalent to `! sub` in RiveScript.
   Set the value to `undefined` to delete a substitution.
   */

		}, {
			key: "setSubstitution",
			value: function setSubstitution(name, value) {
				var self = this;

				if (value === void 0) {
					return delete self._sub[name];
				} else {
					self._submax = Math.max(name.split(' ').length, self._submax);
					return self._sub[name] = value;
				}
			}

			/**
   void setPerson (string name, string value)
   	Set a person substitution. This is equivalent to `! person` in RiveScript.
   Set the value to `undefined` to delete a person substitution.
   */

		}, {
			key: "setPerson",
			value: function setPerson(name, value) {
				var self = this;

				if (value === void 0) {
					return delete self._person[name];
				} else {
					self._personmax = Math.max(name.split(' ').length, self._personmax);
					return self._person[name] = value;
				}
			}

			/**
   async setUservar (string user, string name, string value)
   	Set a user variable for a user.
   */

		}, {
			key: "setUservar",
			value: function () {
				var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(user, name, value) {
					var self, fields;
					return regeneratorRuntime.wrap(function _callee5$(_context5) {
						while (1) {
							switch (_context5.prev = _context5.next) {
								case 0:
									self = this;

									// Are we setting the topic and are we forcing case?

									if (name === "topic" && self._forceCase) {
										value = value.toLowerCase();
									}

									fields = {};

									fields[name] = value;
									return _context5.abrupt("return", self._session.set(user, fields));

								case 5:
								case "end":
									return _context5.stop();
							}
						}
					}, _callee5, this);
				}));

				function setUservar(_x9, _x10, _x11) {
					return _ref6.apply(this, arguments);
				}

				return setUservar;
			}()

			/**
   async setUservars (string user, object data)
   	Set multiple user variables by providing an object of key/value pairs.
   Equivalent to calling `setUservar()` for each pair in the object.
   */

		}, {
			key: "setUservars",
			value: function () {
				var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(user, data) {
					var self;
					return regeneratorRuntime.wrap(function _callee6$(_context6) {
						while (1) {
							switch (_context6.prev = _context6.next) {
								case 0:
									self = this;
									return _context6.abrupt("return", self._session.set(user, data));

								case 2:
								case "end":
									return _context6.stop();
							}
						}
					}, _callee6, this);
				}));

				function setUservars(_x12, _x13) {
					return _ref7.apply(this, arguments);
				}

				return setUservars;
			}()

			/**
   string getVariable (string name)
   	Gets a variable. This is equivalent to `<bot name>` in RiveScript.
   */

		}, {
			key: "getVariable",
			value: function getVariable(name) {
				var self = this;

				// The var exists?
				if (typeof self._var[name] !== "undefined") {
					return self._var[name];
				} else {
					return "undefined";
				}
			}

			/**
   async getUservar (string user, string name) -> value
   	Get a variable from a user. Returns the string "undefined" if it isn't
   defined.
   */

		}, {
			key: "getUservar",
			value: function () {
				var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(user, name) {
					var self;
					return regeneratorRuntime.wrap(function _callee7$(_context7) {
						while (1) {
							switch (_context7.prev = _context7.next) {
								case 0:
									self = this;
									return _context7.abrupt("return", self._session.get(user, name));

								case 2:
								case "end":
									return _context7.stop();
							}
						}
					}, _callee7, this);
				}));

				function getUservar(_x14, _x15) {
					return _ref8.apply(this, arguments);
				}

				return getUservar;
			}()

			/**
   async getUservars ([string user]) -> object
   	Get all variables about a user. If no user is provided, returns all data
   about all users.
   */

		}, {
			key: "getUservars",
			value: function () {
				var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(user) {
					var self;
					return regeneratorRuntime.wrap(function _callee8$(_context8) {
						while (1) {
							switch (_context8.prev = _context8.next) {
								case 0:
									self = this;

									if (!(user === undefined)) {
										_context8.next = 5;
										break;
									}

									return _context8.abrupt("return", self._session.getAny(user));

								case 5:
									return _context8.abrupt("return", self._session.getAll());

								case 6:
								case "end":
									return _context8.stop();
							}
						}
					}, _callee8, this);
				}));

				function getUservars(_x16) {
					return _ref9.apply(this, arguments);
				}

				return getUservars;
			}()

			/**
   async clearUservars ([string user])
   	Clear all a user's variables. If no user is provided, clears all variables
   for all users.
   */

		}, {
			key: "clearUservars",
			value: function () {
				var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(user) {
					var self;
					return regeneratorRuntime.wrap(function _callee9$(_context9) {
						while (1) {
							switch (_context9.prev = _context9.next) {
								case 0:
									self = this;

									if (!(user === undefined)) {
										_context9.next = 5;
										break;
									}

									return _context9.abrupt("return", self._session.resetAll());

								case 5:
									return _context9.abrupt("return", self._session.reset(user));

								case 6:
								case "end":
									return _context9.stop();
							}
						}
					}, _callee9, this);
				}));

				function clearUservars(_x17) {
					return _ref10.apply(this, arguments);
				}

				return clearUservars;
			}()

			/**
   async freezeUservars (string user)
   	Freeze the variable state of a user. This will clone and preserve the user's
   entire variable state, so that it can be restored later with
   `thawUservars()`
   */

		}, {
			key: "freezeUservars",
			value: function () {
				var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(user) {
					var self;
					return regeneratorRuntime.wrap(function _callee10$(_context10) {
						while (1) {
							switch (_context10.prev = _context10.next) {
								case 0:
									self = this;
									return _context10.abrupt("return", self._session.freeze(user));

								case 2:
								case "end":
									return _context10.stop();
							}
						}
					}, _callee10, this);
				}));

				function freezeUservars(_x18) {
					return _ref11.apply(this, arguments);
				}

				return freezeUservars;
			}()

			/**
   async thawUservars (string user[, string action])
   	Thaw a user's frozen variables. The action can be one of the following:
   * discard: Don't restore the variables, just delete the frozen copy.
   * keep: Keep the frozen copy after restoring
   * thaw: Restore the variables and delete the frozen copy (default)
   */

		}, {
			key: "thawUservars",
			value: function () {
				var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(user) {
					var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "thaw";
					var self;
					return regeneratorRuntime.wrap(function _callee11$(_context11) {
						while (1) {
							switch (_context11.prev = _context11.next) {
								case 0:
									self = this;
									return _context11.abrupt("return", self._session.thaw(user, action));

								case 2:
								case "end":
									return _context11.stop();
							}
						}
					}, _callee11, this);
				}));

				function thawUservars(_x20) {
					return _ref12.apply(this, arguments);
				}

				return thawUservars;
			}()

			/**
   async lastMatch (string user) -> string
   	Retrieve the trigger that the user matched most recently.
   */

		}, {
			key: "lastMatch",
			value: function () {
				var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(user) {
					var self;
					return regeneratorRuntime.wrap(function _callee12$(_context12) {
						while (1) {
							switch (_context12.prev = _context12.next) {
								case 0:
									self = this;
									return _context12.abrupt("return", self._session.get(user, "__lastmatch__"));

								case 2:
								case "end":
									return _context12.stop();
							}
						}
					}, _callee12, this);
				}));

				function lastMatch(_x21) {
					return _ref13.apply(this, arguments);
				}

				return lastMatch;
			}()

			/**
   async initialMatch (string user) -> string
   	Retrieve the trigger that the user matched initially. This will return
   only the first matched trigger and will not include subsequent redirects.
   	This value is reset on each `reply()` call.
   */

		}, {
			key: "initialMatch",
			value: function () {
				var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(user) {
					var self;
					return regeneratorRuntime.wrap(function _callee13$(_context13) {
						while (1) {
							switch (_context13.prev = _context13.next) {
								case 0:
									self = this;
									return _context13.abrupt("return", self._session.get(user, "__initialmatch__"));

								case 2:
								case "end":
									return _context13.stop();
							}
						}
					}, _callee13, this);
				}));

				function initialMatch(_x22) {
					return _ref14.apply(this, arguments);
				}

				return initialMatch;
			}()

			/**
   async lastTriggers (string user) -> object
   	Retrieve the triggers that have been matched for the last reply. This
   will contain all matched trigger with every subsequent redirects.
   	This value is reset on each `reply()` or `replyAsync()` call.
   */

		}, {
			key: "lastTriggers",
			value: function () {
				var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(user) {
					var self;
					return regeneratorRuntime.wrap(function _callee14$(_context14) {
						while (1) {
							switch (_context14.prev = _context14.next) {
								case 0:
									self = this;
									return _context14.abrupt("return", self._session.get(user, "__last_triggers__"));

								case 2:
								case "end":
									return _context14.stop();
							}
						}
					}, _callee14, this);
				}));

				function lastTriggers(_x23) {
					return _ref15.apply(this, arguments);
				}

				return lastTriggers;
			}()

			/**
   async getUserTopicTriggers (string username) -> object
   	Retrieve the triggers in the current topic for the specified user. It can
   be used to create a UI that gives the user options based on trigges, e.g.
   using buttons, select boxes and other UI resources. This also includes the
   triggers available in any topics inherited or included by the user's current
   topic.
   	This will return `undefined` if the user cant be find
   */

		}, {
			key: "getUserTopicTriggers",
			value: function () {
				var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(user) {
					var self;
					return regeneratorRuntime.wrap(function _callee15$(_context15) {
						while (1) {
							switch (_context15.prev = _context15.next) {
								case 0:
									self = this;
									return _context15.abrupt("return", new Promise(function (resolve, reject) {
										self._session.get(user, "topic").then(function (topic) {
											resolve(inherit_utils.getTopicTriggers(self, topic));
										});
									}));

								case 2:
								case "end":
									return _context15.stop();
							}
						}
					}, _callee15, this);
				}));

				function getUserTopicTriggers(_x24) {
					return _ref16.apply(this, arguments);
				}

				return getUserTopicTriggers;
			}()

			/**
   string currentUser ()
   	Retrieve the current user's ID. This is most useful within a JavaScript
   object macro to get the ID of the user who invoked the macro (e.g. to
   get/set user variables for them).
   	This will return undefined if called from outside of a reply context
   (the value is unset at the end of the `reply()` method)
   */

		}, {
			key: "currentUser",
			value: function currentUser() {
				var self = this;

				if (self.brain._currentUser === null) {
					self.warn("currentUser() is intended to be called from within a JS object macro!");
				}
				return self.brain._currentUser;
			}

			////////////////////////////////////////////////////////////////////////
			// Reply Fetching Methods                                             //
			////////////////////////////////////////////////////////////////////////

			/**
   Promise reply (string username, string message[, scope])
   	Fetch a reply from the RiveScript brain. The message doesn't require any
   special pre-processing to be done to it, i.e. it's allowed to contain
   punctuation and weird symbols. The username is arbitrary and is used to
   uniquely identify the user, in the case that you may have multiple
   distinct users chatting with your bot.
   	**Changed in version 2.0.0:** this function used to return a string, but
   therefore didn't support async object macros or session managers. This
   function now returns a Promise (obsoleting the `replyAsync()` function).
   	The optional `scope` parameter will be passed down into any JavaScript
   object macros that the RiveScript code executes. If you pass the special
   variable `this` as the scope parameter, then `this` in the context of an
   object macro will refer to the very same `this` as the one you passed in,
   so for example the object macro will have access to any local functions
   or attributes that your code has access to, from the location that `reply()`
   was called. For an example of this, refer to the `eg/scope` directory in
   the source distribution of RiveScript-JS.
   	Example:
   	```javascript
   // Normal usage as a promise
   bot.reply(username, message, this).then(function(reply) {
       console.log("Bot>", reply);
   });
   	// Async-Await usage in an async function.
   async function getReply(username, message) {
       var reply = await bot.reply(username, message);
       console.log("Bot>", reply);
   }
   ```
   */

		}, {
			key: "reply",
			value: function () {
				var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(user, msg, scope) {
					var self;
					return regeneratorRuntime.wrap(function _callee16$(_context16) {
						while (1) {
							switch (_context16.prev = _context16.next) {
								case 0:
									self = this;
									_context16.next = 3;
									return self.brain.reply(user, msg, scope);

								case 3:
									return _context16.abrupt("return", _context16.sent);

								case 4:
								case "end":
									return _context16.stop();
							}
						}
					}, _callee16, this);
				}));

				function reply(_x25, _x26, _x27) {
					return _ref17.apply(this, arguments);
				}

				return reply;
			}()

			/**
   Promise replyAsync (string username, string message [[, scope], callback])
   	**Obsolete as of v2.0.0** -- use `reply()` instead in new code.
   	Asyncronous version of reply. Use replyAsync if at least one of the subroutines
   used with the `<call>` tag returns a promise.
   	Example: using promises
   	```javascript
   rs.replyAsync(user, message).then(function(reply) {
     console.log("Bot>", reply);
   }).catch(function(error) {
     console.error("Error: ", error);
   });
   ```
   	Example: using the callback
   	```javascript
   rs.replyAsync(username, msg, this, function(error, reply) {
     if (!error) {
       console.log("Bot>", reply);
     } else {
       console.error("Error: ", error);
     }
   });
   ```
   */

		}, {
			key: "replyAsync",
			value: function replyAsync(user, msg, scope, callback) {
				var self = this;
				self.warn("DEPRECATED FUNCTION: RiveScript.replyAsync() is deprecated; use reply() instead");

				var reply = self.brain.reply(user, msg, scope);
				if (callback) {
					reply.then(function (result) {
						return callback.call(self, null, result);
					}).catch(function (error) {
						return callback.call(self, error, null);
					});
				}
				return reply;
			}
		}]);

		return RiveScript;
	}();

	;

	/**
 Promise Promise
 	**DEPRECATED**
 	Backwards compatible alias to the native JavaScript `Promise` object.
 	`rs.Promise` used to refer to an `RSVP.Promise` which acted as a polyfill
 for older systems. In new code, return a native Promise directly from your
 object macros.
 	This enables you to create a JavaScript object macro that returns a promise
 for asynchronous tasks (e.g. polling a web API or database). Example:
 	```javascript
 rs.setSubroutine("asyncHelper", function (rs, args) {
  return new rs.Promise(function (resolve, reject) {
    resolve(42);
  });
 });
 ```
 	If you're using promises in your object macros, you need to get a reply from
 the bot using the `replyAsync()` method instead of `reply()`, for example:
 	```javascript
 rs.replyAsync(username, message, this).then(function(reply) {
    console.log("Bot> ", reply);
 });
 ```
 */
	RiveScript.prototype.Promise = Promise;

	return RiveScript;
}();

module.exports = RiveScript;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(125)))

/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// RiveScript.js
// https://www.rivescript.com/

// This code is released under the MIT License.
// See the "LICENSE" file for more information.



// Parser for RiveScript syntax.

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = __webpack_require__(49);

// The version of the RiveScript language we support.
var RS_VERSION = "2.0";

/**
Parser (RiveScript master)

Create a parser object to handle parsing RiveScript code.
*/
var Parser = function () {
	function Parser(master) {
		_classCallCheck(this, Parser);

		var self = this;
		self.master = master;
		self.strict = master._strict;
		self.utf8 = master._utf8;
	}

	// Proxy functions


	_createClass(Parser, [{
		key: "say",
		value: function say(message) {
			return this.master.say(message);
		}
	}, {
		key: "warn",
		value: function warn(message, filename, lineno) {
			return this.master.warn(message, filename, lineno);
		}

		/**
  object parse (string filename, string code[, func onError])
  	Read and parse a RiveScript document. Returns a data structure that
  represents all of the useful contents of the document, in this format:
  	```javascript
  {
    "begin": { // "begin" data
      "global": {}, // ! global vars
      "var": {},    // ! bot vars
      "sub": {},    // ! sub substitutions
      "person": {}, // ! person substitutions
      "array": {},  // ! array lists
    },
    "topics": { // main reply data
      "random": { // (topic name)
        "includes": {}, // included topics
        "inherits": {}, // inherited topics
        "triggers": [ // array of triggers
          {
            "trigger": "hello bot",
            "reply": [], // array of replies
            "condition": [], // array of conditions
            "redirect": "",  // @ redirect command
            "previous": null, // % previous command
          },
          ...
        ]
      }
    },
    "objects": [ // parsed object macros
      {
        "name": "",     // object name
        "language": "", // programming language
        "code": [],     // object source code (in lines)
      }
    ]
  }
  ```
  	onError function receives: `(err string[, filename str, line_no int])`
  */

	}, {
		key: "parse",
		value: function parse(filename, code, onError) {
			var self = this;

			if (onError === undefined) {
				onError = function onError(err, filename, lineno) {
					self.warn(err, filename, lineno);
				};
			}

			// Eventual return structure ("abstract syntax tree" except not really)
			var ast = {
				begin: {
					global: {},
					var: {},
					sub: {},
					person: {},
					array: {}
				},
				topics: {},
				objects: []
			};

			// Track temporary variables.
			var topic = "random"; // Default topic = random
			var comment = false; // In a multi-line comment.
			var inobj = false; // In an object macro
			var objName = ""; // Name of the object we're in
			var objLang = ""; // The programming language of the object
			var objBuf = []; // Source code buffer of the object
			var curTrig = null; // Pointer to the current trigger in the ast.topics
			var lastcmd = ""; // Last command code
			var isThat = null; // Is a %Previous trigger

			// Local (file scoped) parser options
			var localOptions = {
				concat: self.master._concat != null ? self.master._concat : "none"
			};

			// Supported concat modes for `! local concat`
			var concatModes = {
				none: "",
				newline: "\n",
				space: " "
			};

			// Go through the lines of code.
			var lines = code.split("\n");
			for (var lp = 0, len = lines.length; lp < len; lp++) {
				var line = lines[lp];
				var lineno = lp + 1;

				// Strip the line.
				line = utils.strip(line);
				if (line.length === 0) {
					continue; // Skip blank lines!
				}

				//-----------------------------
				// Are we inside an `> object`?
				//-----------------------------
				if (inobj) {
					// End of the object?
					if (line.indexOf("< object") > -1 || line.indexOf("<object") > -1) {
						// TODO
						// End the object.
						if (objName.length > 0) {
							ast.objects.push({
								name: objName,
								language: objLang,
								code: objBuf
							});
						}
						objName = objLang = "";
						objBuf = [];
						inobj = false;
					} else {
						objBuf.push(line);
					}
					continue;
				}

				//------------------
				// Look for comments
				//------------------
				if (line.indexOf("//") === 0) {
					// Single line comment
					continue;
				} else if (line.indexOf("#") === 0) {
					// Old style single line comment
					self.warn("Using the # symbol for comments is deprecated", filename, lineno);
					continue;
				} else if (line.indexOf("/*") === 0) {
					// Start of a multi-line comment.
					if (line.indexOf("*/") > -1) {
						// The end comment is on the same line!
						continue;
					}

					// We're now inside a multi-line comment.
					comment = true;
					continue;
				} else if (line.indexOf("*/") > -1) {
					// End of a multi-line comment.
					comment = false;
					continue;
				}
				if (comment) {
					continue;
				}

				// Separate the command from the data
				if (line.length < 2) {
					self.warn("Weird single-character line '" + line + "' found (in topic " + topic + ")", filename, lineno);
					continue;
				}

				var cmd = line.substring(0, 1);
				line = utils.strip(line.substring(1));

				// Ignore in-line comments if there's a space before and after the "//"
				if (line.indexOf(" //") > -1) {
					line = utils.strip(line.split(" //")[0]);
				}

				// Allow the ?Keyword command to work around UTF-8 bugs for users who
				// wanted to use `+ [*] keyword [*]` with Unicode symbols that don't match
				// properly with the usual "optional wildcard" syntax.
				if (cmd === "?") {
					// The ?Keyword command is really an alias to +Trigger with some workarounds
					// to make it match the keyword _anywhere_, in every variation so it works
					// with Unicode strings.
					var variants = [line, "[*]" + line + "[*]", "*" + line + "*", "[*]" + line + "*", "*" + line + "[*]", line + "*", "*" + line];
					cmd = "+";
					line = "(" + variants.join("|") + ")";
					self.say("Rewrote ?Keyword as +Trigger: " + line);
				}

				// In the event of a +Trigger, if we are force-lowercasing it, then do so
				// now before the syntax check.
				if (self.master._forceCase === true && cmd === "+") {
					line = line.toLowerCase();
				}

				// Run a syntax check on this line.
				var syntaxError = self.checkSyntax(cmd, line);
				if (syntaxError !== "") {
					if (self.strict) {
						onError.call(null, "Syntax error: " + syntaxError + " at " + filename + " line " + lineno + " near " + cmd + " " + line);
					} else {
						self.warn("Syntax error: " + syntaxError + " at " + filename + " line " + lineno + " near " + cmd + " " + line + " (in topic " + topic + ")");
					}
				}

				// Reset the %Previous state if this is a new +Trigger.
				if (cmd === "+") {
					isThat = null;
				}

				self.say("Cmd: " + cmd + "; line: " + line);
				// Do a look-ahead for ^Continue and %Previous commands.
				for (var li = lp + 1, len2 = lines.length; li < len2; li++) {
					var lookahead = lines[li];
					lookahead = utils.strip(lookahead);
					if (lookahead.length < 2) {
						continue;
					}

					var lookCmd = lookahead.substring(0, 1);
					lookahead = utils.strip(lookahead.substring(1));

					// We only care about a couple lookahead command types.
					if (lookCmd !== "%" && lookCmd !== "^") {
						break;
					}

					// Only continue if the lookahead has any data.
					if (lookahead.length === 0) {
						break;
					}

					self.say("\tLookahead " + li + ": " + lookCmd + " " + lookahead);

					// If the current command is a +, see if the following is a %.
					if (cmd === "+") {
						if (lookCmd === "%") {
							isThat = lookahead;
							break;
						} else {
							isThat = null;
						}
					}

					// If the current command is a ! and the next command(s) are ^ we'll
					// tack each extension on as a line break (which is useful information
					// for arrays).
					if (cmd === "!") {
						if (lookCmd === "^") {
							line += "<crlf>" + lookahead;
						}
						continue;
					}

					// If the current command is not a ^, and the line after is not a %,
					// but the line after IS a ^, then tack it on to the end of the current
					// line.
					if (cmd !== "^" && lookCmd !== "%") {
						if (lookCmd === "^") {
							// Which character to concatenate with?
							if (concatModes[localOptions.concat] !== void 0) {
								line += concatModes[localOptions.concat] + lookahead;
							} else {
								line += lookahead;
							}
						} else {
							break;
						}
					}
				}

				var type = "",
				    name = "";

				// Handle the types of RiveScript commands.
				switch (cmd) {
					case "!":
						// ! Define
						var halves = line.split("=", 2);
						var left = utils.strip(halves[0]).split(" ");
						var value = "";
						name = "";
						type = "";
						if (halves.length === 2) {
							value = utils.strip(halves[1]);
						}

						if (left.length >= 1) {
							type = utils.strip(left[0]);
							if (left.length >= 2) {
								left.shift();
								name = utils.strip(left.join(" "));
							}
						}

						// Remove 'fake' line breaks unless this is an array.
						if (type !== "array") {
							value = value.replace(/<crlf>/g, "");
						}

						// Handle version numbers.
						if (type === "version") {
							if (parseFloat(value) > parseFloat(RS_VERSION)) {
								onError.call(null, "Unsupported RiveScript version. We only support " + RS_VERSION + " at " + filename + " line " + lineno, filename, lineno);
								return ast;
							}
							continue;
						}

						// All other types of defines require a value and variable name.
						if (name.length === 0) {
							self.warn("Undefined variable name", filename, lineno);
							continue;
						}
						if (value.length === 0) {
							self.warn("Undefined variable value", filename, lineno);
							continue;
						}

						// Handle the rest of the !Define types.
						switch (type) {
							case "local":
								// Local file-scoped parser options.
								self.say("\tSet local parser option " + name + " = " + value);
								localOptions[name] = value;
								break;
							case "global":
								// Set a 'global' variable.
								self.say("\tSet global " + name + " = " + value);
								ast.begin.global[name] = value;
								break;
							case "var":
								// Bot variables.
								self.say("\tSet bot variable " + name + " = " + value);
								ast.begin.var[name] = value;
								break;
							case "array":
								// Arrays
								if (value === "<undef>") {
									ast.begin.array[name] = "<undef>";
									continue;
								}

								// Did this have multiple parts?
								var parts = value.split("<crlf>");

								// Process each line of array data.
								var _fields = [];
								for (var l = 0, _len = parts.length; l < _len; l++) {
									var val = parts[l];
									if (val.indexOf("|") > -1) {
										_fields.push.apply(_fields, val.split("|"));
									} else {
										_fields.push.apply(_fields, val.split(" "));
									}
								}

								// Convert any remaining '\s' over.
								for (var i = 0, len3 = _fields.length; i < len3; i++) {
									var field = _fields[i];
									_fields[i] = _fields[i].replace(/\\s/ig, " ");
								}

								// Delete any empty fields.
								_fields = _fields.filter(function (val) {
									return val !== '';
								});

								self.say("\tSet array " + name + " = " + JSON.stringify(_fields));
								ast.begin.array[name] = _fields;
								break;
							case "sub":
								// Substitutions
								self.say("\tSet substitution " + name + " = " + value);
								ast.begin.sub[name] = value;
								break;
							case "person":
								// Person substitutions
								self.say("\tSet person substitution " + name + " = " + value);
								ast.begin.person[name] = value;
								break;
							default:
								self.warn("Unknown definition type " + type, filename, lineno);
						}
						break;
					case ">":
						// > Label
						var temp = utils.strip(line).split(" ");
						type = temp.shift();
						name = "";
						var fields = [];
						if (temp.length > 0) {
							name = temp.shift();
						}
						if (temp.length > 0) {
							fields = temp;
						}

						// Handle the label types.
						switch (type) {
							case "begin":
							case "topic":
								if (type === "begin") {
									self.say("Found the BEGIN block.");
									type = "topic";
									name = "__begin__";
								}

								// Force case on topics.
								if (self.master._forceCase === true) {
									name = name.toLowerCase();
								}

								// Starting a new topic.
								self.say("Set topic to " + name);
								curTrig = null;
								topic = name;

								// Initialize the topic tree.
								self.initTopic(ast.topics, topic);

								// Does this topic include or inherit another one?
								var mode = "";
								if (fields.length >= 2) {
									for (var n = 0, len4 = fields.length; n < len4; n++) {
										var _field = fields[n];
										if (_field === "includes" || _field === "inherits") {
											mode = _field;
										} else if (mode !== "") {
											// This topic is either inherited or included.
											ast.topics[topic][mode][_field] = 1;
										}
									}
								}
								break;
							case "object":
								// If a field was provided, it should be the programming language.
								var lang = "";
								if (fields.length > 0) {
									lang = fields[0].toLowerCase();
								}

								// Missing language, try to assume it's JS.
								if (lang === "") {
									self.warn("Trying to parse unknown programming language", filename, lineno);
									lang = "javascript";
								}

								// Start reading the object code.
								objName = name;
								objLang = lang;
								objBuf = [];
								inobj = true;
								break;
							default:
								self.warn("Unknown label type " + type, filename, lineno);
						}
						break;
					case "<":
						// < Label
						type = line;
						if (type === "begin" || type === "topic") {
							self.say("\tEnd the topic label.");
							topic = "random";
						} else if (type === "object") {
							self.say("\tEnd the object label.");
							inobj = false;
						}
						break;
					case "+":
						// + Trigger
						self.say("\tTrigger pattern: " + line);

						// Initialize the trigger tree.
						self.initTopic(ast.topics, topic);
						curTrig = {
							trigger: line,
							reply: [],
							condition: [],
							redirect: null,
							previous: isThat
						};
						ast.topics[topic].triggers.push(curTrig);
						break;
					case "-":
						// - Response
						if (curTrig === null) {
							self.warn("Response found before trigger", filename, lineno);
							continue;
						}

						// Warn if we also saw a hard redirect.
						if (curTrig.redirect !== null) {
							self.warn("You can't mix @Redirects with -Replies", filename, lineno);
						}

						self.say("\tResponse: " + line);
						curTrig.reply.push(line);
						break;
					case "*":
						// * Condition
						if (curTrig === null) {
							self.warn("Condition found before trigger", filename, lineno);
							continue;
						}

						// Warn if we also saw a hard redirect.
						if (curTrig.redirect !== null) {
							self.warn("You can't mix @Redirects with *Conditions", filename, lineno);
						}

						self.say("\tCondition: " + line);
						curTrig.condition.push(line);
						break;
					case "%":
						// % Previous
						continue; // This was handled above
					case "^":
						// ^ Continue
						continue; // This was handled above
					case "@":
						// @ Redirect
						// Make sure they didn't mix them with incompatible commands.
						if (curTrig.reply.length > 0 || curTrig.condition.length > 0) {
							self.warn("You can't mix @Redirects with -Replies or *Conditions", filename, lineno);
						}
						self.say("\tRedirect response to: " + line);
						curTrig.redirect = utils.strip(line);
						break;
					default:
						self.warn("Unknown command '" + cmd + "' (in topic " + topic + ")", filename, lineno);
				}
			}

			return ast;
		}

		/**
  string stringify (data deparsed)
  	Translate deparsed data into the source code of a RiveScript document.
  See the `stringify()` method on the parent RiveScript class; this is its
  implementation.
  */

	}, {
		key: "stringify",
		value: function stringify(deparsed) {
			var self = this;

			if (deparsed == null) {
				deparsed = self.master.deparse();
			}

			// Helper function to write out the contents of triggers.
			var _writeTriggers = function _writeTriggers(triggers, indent) {
				var id = indent ? "\t" : "";
				var output = [];
				for (var j = 0, len = triggers.length; j < len; j++) {
					var t = triggers[j];
					output.push(id + "+ " + t.trigger);
					if (t.previous) {
						output.push(id + "% " + t.previous);
					}
					if (t.condition) {
						for (var _k = 0, _len2 = t.condition.length; _k < _len2; _k++) {
							var c = t.condition[_k];
							output.push(id + "* " + c.replace(/\n/mg, "\\n"));
						}
					}
					if (t.redirect) {
						output.push(id + "@ " + t.redirect);
					}
					if (t.reply) {
						for (var l = 0, len2 = t.reply.length; l < len2; l++) {
							var r = t.reply[l];
							if (r) {
								output.push(id + "- " + r.replace(/\n/mg, "\\n"));
							}
						}
					}
					output.push("");
				}
				return output;
			};

			// Lines of code to return.
			var source = ["! version = 2.0", "! local concat = none", ""];
			var ref = ["global", "var", "sub", "person", "array"];

			// Stringify begin-like data first.
			for (var j = 0, len = ref.length; j < len; j++) {
				var begin = ref[j];
				if (deparsed.begin[begin] != null && Object.keys(deparsed.begin[begin]).length) {
					for (key in deparsed.begin[begin]) {
						var value = deparsed.begin[begin][key];
						if (!deparsed.begin[begin].hasOwnProperty(key)) {
							continue;
						}

						// Arrays need special treatment, all others are simple.
						if (begin !== "array") {
							source.push("! " + begin + " " + key + " = " + value);
						} else {
							// Array elements need to be joined by either spaces or pipes.
							var pipes = " ";
							for (k = 0, len1 = value.length; k < len1; k++) {
								var test = value[k];
								if (test.match(/\s+/)) {
									pipes = "|";
									break;
								}
							}
							source.push("! " + begin + " " + key + " = " + value.join(pipes));
						}
					}
					source.push("");
				}
			}

			// Do objects. Requires stripping out the actual function wrapper
			if (deparsed.objects) {
				for (var lang in deparsed.objects) {
					if (deparsed.objects[lang] && deparsed.objects[lang]._objects) {
						for (var func in deparsed.objects[lang]._objects) {
							source.push("> object " + func + " " + lang);
							source.push(deparsed.objects[lang]._objects[func].toString().match(/function[^{]+\{\n*([\s\S]*)\}\;?\s*$/m)[1].trim().split("\n").map(function (ln) {
								return "\t" + ln;
							}).join("\n"));
							source.push("< object\n");
						}
					}
				}
			}

			if (deparsed.begin.triggers && deparsed.begin.triggers.length > 0) {
				source.push("> begin\n");
				source.push.apply(source, _writeTriggers(deparsed.begin.triggers, "indent"));
				source.push("< begin\n");
			}

			// Do the topics. Random first!
			var topics = Object.keys(deparsed.topics).sort(function (a, b) {
				return a - b;
			});
			topics.unshift("random");
			var doneRandom = false;
			for (var l = 0, len2 = topics.length; l < len2; l++) {
				var topic = topics[l];
				if (!deparsed.topics.hasOwnProperty(topic)) {
					continue;
				}
				if (topic === "random" && doneRandom) {
					continue;
				}
				if (topic === "random") {
					doneRandom = 1;
				}

				var tagged = false; // Use `> topic` tag; not for random, usually
				var tagline = [];
				if (topic !== "random" || Object.keys(deparsed.inherits[topic]).length > 0 || Object.keys(deparsed.includes[topic]).length > 0) {
					// Topics other than "random" are *always* tagged. Otherwise (for random)
					// it's only tagged if it's found to have includes or inherits. But we
					// wait to see if this is the case because those things are kept in JS
					// objects and third party JS libraries like to inject junk into the root
					// Object prototype...
					if (topic !== "random") {
						tagged = true;
					}

					// Start building the tag line.
					var inherits = [];
					var includes = [];
					for (var i in deparsed.inherits[topic]) {
						if (!deparsed.inherits[topic].hasOwnProperty(i)) {
							continue;
						}
						inherits.push(i);
					}
					for (var _i in deparsed.includes[topic]) {
						if (!deparsed.includes[topic].hasOwnProperty(_i)) {
							continue;
						}
						includes.push(_i);
					}
					if (includes.length > 0) {
						includes.unshift("includes");
						tagline.push.apply(tagline, includes);
						tagged = true;
					}
					if (inherits.length > 0) {
						inherits.unshift("inherits");
						tagline.push.apply(tagline, inherits);
						tagged = true;
					}
				}

				if (tagged) {
					source.push(("> topic " + topic + " " + tagline.join(" ")).trim() + "\n");
				}

				source.push.apply(source, _writeTriggers(deparsed.topics[topic], tagged));

				if (tagged) {
					source.push("< topic\n");
				}
			}
			return source.join("\n");
		}

		/**
  string checkSyntax (char command, string line)
  	Check the syntax of a RiveScript command. `command` is the single character
  command symbol, and `line` is the rest of the line after the command.
  	Returns an empty string on success, or a description of the error on error.
  */

	}, {
		key: "checkSyntax",
		value: function checkSyntax(cmd, line) {
			var self = this;

			// Run syntax tests based on the command used.
			if (cmd === "!") {
				// ! Definition
				// - Must be formatted like this:
				//   ! type name = value
				//   OR
				//   ! type = value
				if (!line.match(/^.+(?:\s+.+|)\s*=\s*.+?$/)) {
					return "Invalid format for !Definition line: must be '! type name = value' OR '! type = value'";
				} else if (line.match(/^array/)) {
					if (line.match(/\=\s?\||\|\s?$/)) {
						return "Piped arrays can't begin or end with a |";
					} else if (line.match(/\|\|/)) {
						return "Piped arrays can't include blank entries";
					}
				}
			} else if (cmd === ">") {
				// > Label
				// - The "begin" label must have only one argument ("begin")
				// - The "topic" label must be lowercased but can inherit other topics
				// - The "object" label must follow the same rules as "topic", but don't
				//   need to be lowercased.
				var parts = line.split(/\s+/);
				if (parts[0] === "begin" && parts.length > 1) {
					return "The 'begin' label takes no additional arguments";
				} else if (parts[0] === "topic") {
					if (!self.master._forceCase && line.match(/[^a-z0-9_\-\s]/)) {
						return "Topics should be lowercased and contain only letters and numbers";
					} else if (line.match(/[^A-Za-z0-9_\-\s]/)) {
						return "Topics should contain only letters and numbers in forceCase mode";
					}
				} else if (parts[0] === "object") {
					if (line.match(/[^A-Za-z0-9_\-\s]/)) {
						return "Objects can only contain numbers and letters";
					}
				}
			} else if (cmd === "+" || cmd === "%" || cmd === "@") {
				// + Trigger, % Previous, @ Redirect
				// This one is strict. The triggers are to be run through the regexp
				// engine, therefore it should be acceptable for the regexp engine.
				// - Entirely lowercase
				// - No symbols except: ( | ) [ ] * _ # { } < > =
				// - All brackets should be matched.
				var parens = 0,
				    square = 0,
				    curly = 0,
				    angle = 0;

				// Look for obvious errors first.
				if (self.utf8) {
					// In UTF-8 mode, most symbols are allowed.
					if (line.match(/[A-Z\\.]/)) {
						return "Triggers can't contain uppercase letters, backslashes or dots in UTF-8 mode";
					}
				} else if (line.match(/[^a-z0-9(|)\[\]*_#@{}<>=\/\s]/)) {
					return "Triggers may only contain lowercase letters, numbers, and these symbols: ( | ) [ ] * _ # { } < > = /";
				} else if (line.match(/\(\||\|\)/)) {
					return "Piped alternations can't begin or end with a |";
				} else if (line.match(/\([^\)].+\|\|.+\)/)) {
					return "Piped alternations can't include blank entries";
				} else if (line.match(/\[\||\|\]/)) {
					return "Piped optionals can't begin or end with a |";
				} else if (line.match(/\[[^\]].+\|\|.+\]/)) {
					return "Piped optionals can't include blank entries";
				}

				// Count the brackets.
				var chars = line.split("");
				for (var j = 0, len = chars.length; j < len; j++) {
					var char = chars[j];
					switch (char) {
						case "(":
							parens++;
							break;
						case ")":
							parens--;
							break;
						case "[":
							square++;
							break;
						case "]":
							square--;
							break;
						case "{":
							curly++;
							break;
						case "}":
							curly--;
							break;
						case "<":
							angle++;
							break;
						case ">":
							angle--;
							break;
					}
				}

				// Any mismatches?
				if (parens !== 0) {
					return "Unmatched parenthesis brackets";
				}
				if (square !== 0) {
					return "Unmatched square brackets";
				}
				if (curly !== 0) {
					return "Unmatched curly brackets";
				}
				if (angle !== 0) {
					return "Unmatched angle brackets";
				}
			} else if (cmd === "*") {
				// * Condition
				// Syntax for a conditional is as follows:
				// * value symbol value => response
				if (!line.match(/^.+?\s*(?:==|eq|!=|ne|<>|<|<=|>|>=)\s*.+?=>.+?$/)) {
					return "Invalid format for !Condition: should be like '* value symbol value => response'";
				}
			}

			// No problems!
			return "";
		}

		/**
  private void initTopic (object topics, string name)
  	Initialize the topic tree for the parsing phase. Sets up the topic under
  ast.topics with all its relevant keys and sub-keys, etc.
  */

	}, {
		key: "initTopic",
		value: function initTopic(topics, name) {
			var self = this;
			if (topics[name] === undefined) {
				topics[name] = {
					includes: {},
					inherits: {},
					triggers: []
				};
			}
		}
	}]);

	return Parser;
}();

module.exports = Parser;

/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// RiveScript.js
// https://www.rivescript.com/

// This code is released under the MIT License.
// See the "LICENSE" file for more information.

// Brain logic for RiveScript



var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = __webpack_require__(49);
var inherit_utils = __webpack_require__(126);

/**
Brain (RiveScript master)

Create a Brain object which handles the actual process of fetching a reply.
*/

var Brain = function () {
	function Brain(master) {
		_classCallCheck(this, Brain);

		var self = this;

		self.master = master;
		self.strict = master._strict;
		self.utf8 = master._utf8;

		// Private variables only relevant to the reply-answering part of RiveScript.
		self._currentUser = null; // The current user asking for a message
	}

	// Proxy functions


	_createClass(Brain, [{
		key: "say",
		value: function say(message) {
			return this.master.say(message);
		}
	}, {
		key: "warn",
		value: function warn(message, filename, lineno) {
			return this.master.warn(message, filename, lineno);
		}

		/**
  async reply (string user, string msg[, scope])
  	Fetch a reply for the user. This returns a Promise that may be awaited on.
  */

	}, {
		key: "reply",
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user, msg, scope) {
				var self, reply, begin, history;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								self = this;


								self.say("Asked to reply to [" + user + "] " + msg);

								// Store the current user's ID.
								self._currentUser = user;

								// Format their message.
								msg = self.formatMessage(msg);
								reply = "";

								// Set initial match to be undefined

								_context.next = 7;
								return self.master._session.set(user, {
									__initialmatch__: null
								});

							case 7:
								if (!self.master._topics.__begin__) {
									_context.next = 21;
									break;
								}

								_context.next = 10;
								return self._getReply(user, "request", "begin", 0, scope);

							case 10:
								begin = _context.sent;

								if (!(begin.indexOf("{ok}") > -1)) {
									_context.next = 16;
									break;
								}

								_context.next = 14;
								return self._getReply(user, msg, "normal", 0, scope);

							case 14:
								reply = _context.sent;

								begin = begin.replace(/\{ok\}/g, reply);

							case 16:
								_context.next = 18;
								return self.processTags(user, msg, begin, [], [], 0, scope);

							case 18:
								reply = _context.sent;
								_context.next = 24;
								break;

							case 21:
								_context.next = 23;
								return self._getReply(user, msg, "normal", 0, scope);

							case 23:
								reply = _context.sent;

							case 24:
								_context.next = 26;
								return self.master._session.get(user, "__history__");

							case 26:
								history = _context.sent;

								if (history == "undefined") {
									// purposeful typecast
									history = newHistory();
								}
								try {
									// If modifying it fails, the data was bad, and reset it.
									history.input.pop();
									history.input.unshift(msg);
									history.reply.pop();
									history.reply.unshift(reply);
								} catch (e) {
									history = newHistory();
								}
								_context.next = 31;
								return self.master._session.set(user, {
									__history__: history
								});

							case 31:

								// Unset the current user ID.
								self._currentUser = null;

								return _context.abrupt("return", reply);

							case 33:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function reply(_x, _x2, _x3) {
				return _ref.apply(this, arguments);
			}

			return reply;
		}()

		/**
  async _getReply (string user, string msg, string context, int step, scope)
  	The internal reply method. DO NOT CALL THIS DIRECTLY.
  	* user, msg and scope are the same as reply()
  * context = "normal" or "begin"
  * step = the recursion depth
  * scope = the call scope for object macros
  */

	}, {
		key: "_getReply",
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user, msg, context, step, scope) {
				var self, topic, stars, thatstars, reply, history, matched, matchedTrigger, foundMatch, allTopics, j, len, top, lastReply, k, len1, trig, pattern, botside, match, userSide, regexp, isAtomic, isMatch, _match, l, _len, _trig, _pattern, _regexp, _isAtomic, _isMatch, _match2, i, _len2, lastTriggers, n, redirect, o, len4, row, halves, condition, left, eq, right, potreply, passed, bucket, q, len5, rep, weight, _match3, _i, choice, _match4, giveup, name, _name, value;

				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								self = this;

								// Needed to sort replies?

								if (self.master._sorted.topics) {
									_context2.next = 4;
									break;
								}

								self.warn("You forgot to call sortReplies()!");
								return _context2.abrupt("return", "ERR: Replies Not Sorted");

							case 4:
								_context2.next = 6;
								return self.master.getUservar(user, "topic");

							case 6:
								topic = _context2.sent;

								if (topic === null || topic === "undefined") {
									topic = "random";
								}

								stars = [];
								thatstars = []; // For %Previous

								reply = "";

								// Avoid letting them fall into a missing topic.

								if (self.master._topics[topic]) {
									_context2.next = 16;
									break;
								}

								self.warn("User " + user + " was in an empty topic named '" + topic + "'");
								topic = "random";
								_context2.next = 16;
								return self.master.setUservar(user, "topic", topic);

							case 16:
								if (!(step > self.master._depth)) {
									_context2.next = 18;
									break;
								}

								return _context2.abrupt("return", self.master.errors.deepRecursion);

							case 18:

								// Are we in the BEGIN block?
								if (context === "begin") {
									topic = "__begin__";
								}

								// Initialize this user's history.
								_context2.next = 21;
								return self.master._session.get(user, "__history__");

							case 21:
								history = _context2.sent;

								if (!(history == "undefined")) {
									_context2.next = 26;
									break;
								}

								// purposeful typecast
								history = newHistory();
								_context2.next = 26;
								return self.master._session.set(user, {
									__history__: history
								});

							case 26:
								if (self.master._topics[topic]) {
									_context2.next = 28;
									break;
								}

								return _context2.abrupt("return", "ERR: No default topic 'random' was found!");

							case 28:

								// Create a pointer for the matched data when we find it.
								matched = null;
								matchedTrigger = null;
								foundMatch = false;

								// See if there were any %Previous's in this topic, or any topic related
								// to it. This should only be done the first time -- not during a recursive
								// redirection. This is because in a redirection, "lastreply" is still gonna
								// be the same as it was the first time, resulting in an infinite loop!

								if (!(step === 0)) {
									_context2.next = 78;
									break;
								}

								allTopics = [topic];

								if (self.master._topics[topic].includes || self.master._topics[topic].inherits) {
									// Get ALL the topics!
									allTopics = inherit_utils.getTopicTree(self.master, topic);
								}

								// Scan them all.
								j = 0, len = allTopics.length;

							case 35:
								if (!(j < len)) {
									_context2.next = 78;
									break;
								}

								top = allTopics[j];

								self.say("Checking topic " + top + " for any %Previous's");

								if (!self.master._sorted.thats[top].length) {
									_context2.next = 74;
									break;
								}

								// There's one here!
								self.say("There's a %Previous in this topic!");

								// Do we have history yet?
								lastReply = history.reply ? history.reply[0] : "undefined";

								// Format the bot's last reply the same way as the human's.

								lastReply = self.formatMessage(lastReply, true);
								self.say("Last reply: " + lastReply);

								// See if it's a match
								k = 0, len1 = self.master._sorted.thats[top].length;

							case 44:
								if (!(k < len1)) {
									_context2.next = 72;
									break;
								}

								trig = self.master._sorted.thats[top][k];
								pattern = trig[1].previous;
								_context2.next = 49;
								return self.triggerRegexp(user, pattern);

							case 49:
								botside = _context2.sent;


								self.say("Try to match lastReply (" + lastReply + ") to " + botside);

								// Match?
								match = lastReply.match(new RegExp("^" + botside + "$"));

								if (!match) {
									_context2.next = 69;
									break;
								}

								// Huzzah! See if OUR message is right too.
								self.say("Bot side matched!");

								thatstars = match; // Collect the bot stars in case we need them
								thatstars.shift();

								// Compare the triggers to the user's message.
								userSide = trig[1];
								_context2.next = 59;
								return self.triggerRegexp(user, userSide.trigger);

							case 59:
								regexp = _context2.sent;

								self.say("Try to match \"" + msg + "\" against " + userSide.trigger + " (" + regexp + ")");

								// If the trigger is atomic, we don't need to bother with the regexp engine.
								isAtomic = utils.isAtomic(userSide.trigger);
								isMatch = false;

								if (isAtomic) {
									if (msg === regexp) {
										isMatch = true;
									}
								} else {
									_match = msg.match(new RegExp("^" + regexp + "$"));

									if (_match) {
										isMatch = true;
										// Get the stars
										stars = _match;
										if (stars.length >= 1) {
											stars.shift();
										}
									}
								}

								// Was it a match?

								if (!isMatch) {
									_context2.next = 69;
									break;
								}

								// Keep the trigger pointer.
								matched = userSide;
								foundMatch = true;
								matchedTrigger = userSide.trigger;
								return _context2.abrupt("break", 72);

							case 69:
								k++;
								_context2.next = 44;
								break;

							case 72:
								_context2.next = 75;
								break;

							case 74:
								self.say("No %Previous in this topic!");

							case 75:
								j++;
								_context2.next = 35;
								break;

							case 78:
								if (foundMatch) {
									_context2.next = 100;
									break;
								}

								self.say("Searching their topic for a match...");
								l = 0, _len = self.master._sorted.topics[topic].length;

							case 81:
								if (!(l < _len)) {
									_context2.next = 100;
									break;
								}

								_trig = self.master._sorted.topics[topic][l];
								_pattern = _trig[0];
								_context2.next = 86;
								return self.triggerRegexp(user, _pattern);

							case 86:
								_regexp = _context2.sent;


								self.say("Try to match \"" + msg + "\" against " + _pattern + " (" + _regexp + ")");

								// If the trigger is atomic, we don't need to bother with the regexp engine.
								_isAtomic = utils.isAtomic(_pattern);
								_isMatch = false;

								if (_isAtomic) {
									if (msg === _regexp) {
										_isMatch = true;
									}
								} else {
									// Non-atomic triggers always need the regexp.
									_match2 = msg.match(new RegExp("^" + _regexp + "$"));

									if (_match2) {
										// The regexp matched!
										_isMatch = true;

										// Collect the stars
										stars = [];
										if (_match2.length > 1) {
											for (i = 1, _len2 = _match2.length; i < _len2; i++) {
												stars.push(_match2[i]);
											}
										}
									}
								}

								// A match somehow?

								if (!_isMatch) {
									_context2.next = 97;
									break;
								}

								self.say("Found a match!");

								// Keep the pointer to this trigger's data.
								matched = _trig[1];
								foundMatch = true;
								matchedTrigger = _pattern;
								return _context2.abrupt("break", 100);

							case 97:
								l++;
								_context2.next = 81;
								break;

							case 100:
								_context2.next = 102;
								return self.master._session.set(user, { __lastmatch__: matchedTrigger });

							case 102:
								lastTriggers = [];

								if (!(step === 0)) {
									_context2.next = 106;
									break;
								}

								_context2.next = 106;
								return self.master._session.set(user, {
									// Store initial matched trigger. Like __lastmatch__, this can be undefined.
									__initialmatch__: matchedTrigger,

									// Also initialize __last_triggers__ which will keep all matched triggers
									__last_triggers__: lastTriggers
								});

							case 106:
								if (!matched) {
									_context2.next = 160;
									break;
								}

								// Keep the current match
								lastTriggers.push(matched);
								_context2.next = 110;
								return self.master._session.set(user, { __last_triggers__: lastTriggers });

							case 110:
								n = 0;

							case 111:
								if (!(n < 1)) {
									_context2.next = 160;
									break;
								}

								if (!(matched.redirect != null)) {
									_context2.next = 122;
									break;
								}

								self.say("Redirecting us to " + matched.redirect);
								_context2.next = 116;
								return self.processTags(user, msg, matched.redirect, stars, thatstars, step, scope);

							case 116:
								redirect = _context2.sent;


								self.say("Pretend user said: " + redirect);
								_context2.next = 120;
								return self._getReply(user, redirect, context, step + 1, scope);

							case 120:
								reply = _context2.sent;
								return _context2.abrupt("break", 160);

							case 122:
								o = 0, len4 = matched.condition.length;

							case 123:
								if (!(o < len4)) {
									_context2.next = 150;
									break;
								}

								row = matched.condition[o];
								halves = row.split(/\s*=>\s*/);

								if (!(halves && halves.length === 2)) {
									_context2.next = 147;
									break;
								}

								condition = halves[0].match(/^(.+?)\s+(==|eq|!=|ne|<>|<|<=|>|>=)\s+(.*?)$/);

								if (!condition) {
									_context2.next = 147;
									break;
								}

								left = utils.strip(condition[1]);
								eq = condition[2];
								right = utils.strip(condition[3]);
								potreply = halves[1].trim();

								// Process tags all around

								_context2.next = 135;
								return self.processTags(user, msg, left, stars, thatstars, step, scope);

							case 135:
								left = _context2.sent;
								_context2.next = 138;
								return self.processTags(user, msg, right, stars, thatstars, step, scope);

							case 138:
								right = _context2.sent;


								// Defaults?
								if (left.length === 0) {
									left = "undefined";
								}
								if (right.length === 0) {
									right = "undefined";
								}

								self.say("Check if " + left + " " + eq + " " + right);

								// Validate it
								passed = false;

								if (eq === "eq" || eq === "==") {
									if (left === right) {
										passed = true;
									}
								} else if (eq === "ne" || eq === "!=" || eq === "<>") {
									if (left !== right) {
										passed = true;
									}
								} else {
									try {
										// Dealing with numbers here
										left = parseInt(left);
										right = parseInt(right);
										if (eq === "<" && left < right) {
											passed = true;
										} else if (eq === "<=" && left <= right) {
											passed = true;
										} else if (eq === ">" && left > right) {
											passed = true;
										} else if (eq === ">=" && left >= right) {
											passed = true;
										}
									} catch (error) {
										e = error;
										self.warn("Failed to evaluate numeric condition!");
									}
								}

								// OK?

								if (!passed) {
									_context2.next = 147;
									break;
								}

								reply = potreply;
								return _context2.abrupt("break", 150);

							case 147:
								o++;
								_context2.next = 123;
								break;

							case 150:
								if (!(reply !== null && reply.length > 0)) {
									_context2.next = 152;
									break;
								}

								return _context2.abrupt("break", 160);

							case 152:

								// Process weights in the replies.
								bucket = [];

								for (q = 0, len5 = matched.reply.length; q < len5; q++) {
									rep = matched.reply[q];
									weight = 1;
									_match3 = rep.match(/\{weight=(\d+?)\}/i);

									if (_match3) {
										weight = _match3[1];
										if (weight <= 0) {
											self.warn("Can't have a weight <= 0!");
											weight = 1;
										}
									}

									for (_i = 0; _i < weight; _i++) {
										bucket.push(rep);
									}
								}

								// Get a random reply.
								choice = parseInt(Math.random() * bucket.length);

								reply = bucket[choice];
								return _context2.abrupt("break", 160);

							case 157:
								n++;
								_context2.next = 111;
								break;

							case 160:

								// Still no reply?
								if (!foundMatch) {
									reply = self.master.errors.replyNotMatched;
								} else if (reply === void 0 || reply.length === 0) {
									reply = self.master.errors.replyNotFound;
								}

								self.say("Reply: " + reply);

								// Process tags for the BEGIN block.

								if (!(context === "begin")) {
									_context2.next = 194;
									break;
								}

								// The BEGIN block can set {topic} and user vars.

								// Topic setter
								_match4 = reply.match(/\{topic=(.+?)\}/i);
								giveup = 0;

							case 165:
								if (!_match4) {
									_context2.next = 177;
									break;
								}

								giveup++;

								if (!(giveup >= 50)) {
									_context2.next = 170;
									break;
								}

								self.warn("Infinite loop looking for topic tag!");
								return _context2.abrupt("break", 177);

							case 170:
								name = _match4[1];
								_context2.next = 173;
								return self.master.setUservar(user, "topic", name);

							case 173:
								reply = reply.replace(new RegExp("{topic=" + utils.quotemeta(name) + "}", "ig"), "");
								_match4 = reply.match(/\{topic=(.+?)\}/i);
								_context2.next = 165;
								break;

							case 177:

								// Set user vars
								_match4 = reply.match(/<set (.+?)=(.+?)>/i);
								giveup = 0;

							case 179:
								if (!_match4) {
									_context2.next = 192;
									break;
								}

								giveup++;

								if (!(giveup >= 50)) {
									_context2.next = 184;
									break;
								}

								self.warn("Infinite loop looking for set tag!");
								return _context2.abrupt("break", 192);

							case 184:
								_name = _match4[1];
								value = _match4[2];
								_context2.next = 188;
								return self.master.setUservar(user, _name, value);

							case 188:
								reply = reply.replace(new RegExp("<set " + utils.quotemeta(_name) + "=" + utils.quotemeta(value) + ">", "ig"), "");
								_match4 = reply.match(/<set (.+?)=(.+?)>/i);
								_context2.next = 179;
								break;

							case 192:
								_context2.next = 195;
								break;

							case 194:
								// Process all the tags.
								reply = self.processTags(user, msg, reply, stars, thatstars, step, scope);

							case 195:
								return _context2.abrupt("return", reply);

							case 196:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function _getReply(_x4, _x5, _x6, _x7, _x8) {
				return _ref2.apply(this, arguments);
			}

			return _getReply;
		}()

		/**
  string formatMessage (string msg)
  	Format a user's message for safe processing.
  */

	}, {
		key: "formatMessage",
		value: function formatMessage(msg, botreply) {
			var self = this;

			// Lowercase it.
			msg = "" + msg;
			msg = msg.toLowerCase();

			// Run substitutions and sanitize what's left.
			msg = self.substitute(msg, "sub");

			// In UTF-8 mode, only strip metacharcters and HTML brackets (to protect
			// against obvious XSS attacks).
			if (self.utf8) {
				msg = msg.replace(/[\\<>]+/, "");

				if (self.master.unicodePunctuation != null) {
					msg = msg.replace(self.master.unicodePunctuation, "");
				}

				// For the bot's reply, also strip common punctuation.
				if (botreply != null) {
					msg = msg.replace(/[.?,!;:@#$%^&*()]/, "");
				}
			} else {
				// For everything else, strip all non-alphanumerics
				msg = utils.stripNasties(msg, self.utf8);
			}

			// cut leading and trailing blanks once punctuation dropped office
			msg = msg.trim();
			msg = msg.replace(/\s+/g, " ");
			return msg;
		}

		/**
  async triggerRegexp (string user, string trigger)
  	Prepares a trigger for the regular expression engine.
  */

	}, {
		key: "triggerRegexp",
		value: function () {
			var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(user, regexp) {
				var self, match, giveup, parts, opts, j, len, p, pipes, _match5, name, rep, _match6, _name2, _rep, _match7, _name3, _rep2, history, ref, k, len1, type, i;

				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								self = this;

								// If the trigger is simply '*' then the * needs to become (.*?)
								// to match the blank string too.

								regexp = regexp.replace(/^\*$/, "<zerowidthstar>");

								// Simple replacements.
								regexp = regexp.replace(/\*/g, "(.+?)"); // Convert * into (.+?)
								regexp = regexp.replace(/#/g, "(\\d+?)"); // Convert # into (\d+?)
								regexp = regexp.replace(/_/g, "(\\w+?)"); // Convert _ into (\w+?)
								regexp = regexp.replace(/\s*\{weight=\d+\}\s*/g, ""); // Remove {weight} tags
								regexp = regexp.replace(/<zerowidthstar>/g, "(.*?)");
								regexp = regexp.replace(/\|{2,}/, '|'); // Remove empty entities
								regexp = regexp.replace(/(\(|\[)\|/g, '$1'); // Remove empty entities from start of alt/opts
								regexp = regexp.replace(/\|(\)|\])/g, '$1'); // Remove empty entities from end of alt/opts

								// UTF-8 mode special characters.
								if (self.utf8) {
									regexp = regexp.replace(/\\@/, "\\u0040"); // @ symbols conflict w/ arrays
								}

								// Optionals.
								match = regexp.match(/\[(.+?)\]/);
								giveup = 0;

							case 13:
								if (!match) {
									_context3.next = 29;
									break;
								}

								if (!(giveup++ > 50)) {
									_context3.next = 17;
									break;
								}

								self.warn("Infinite loop when trying to process optionals in a trigger!");
								return _context3.abrupt("return", "");

							case 17:

								// The resulting regexp needs to work in two scenarios:
								// 1) The user included the optional word(s) in which case they must be
								//    in the message surrounded by a space or a word boundary (e.g. the
								//    end or beginning of their message)
								// 2) The user did not include the word, meaning the whole entire set of
								//    words should be "OR'd" with a word boundary or one or more spaces.
								//
								// The resulting regexp ends up looking like this, for a given input
								// trigger of: what is your [home|office] number
								// what is your(?:(?:\s|\b)+home(?:\s|\b)+|(?:\s|\b)+office(?:\s|\b)+|(?:\b|\s)+)number
								//
								// See https://github.com/aichaos/rivescript-js/issues/48

								parts = match[1].split("|");
								opts = [];

								for (j = 0, len = parts.length; j < len; j++) {
									p = parts[j];

									opts.push("(?:\\s|\\b)+" + p + "(?:\\s|\\b)+");
								}

								// If this optional had a star or anything in it, make it non-matching.
								pipes = opts.join("|");

								pipes = pipes.replace(new RegExp(utils.quotemeta("(.+?)"), "g"), "(?:.+?)");
								pipes = pipes.replace(new RegExp(utils.quotemeta("(\\d+?)"), "g"), "(?:\\d+?)");
								pipes = pipes.replace(new RegExp(utils.quotemeta("(\\w+?)"), "g"), "(?:\\w+?)");

								// Temporarily dummy out the literal square brackets so we don't loop forever
								// thinking that the [\s\b] part is another optional.
								pipes = pipes.replace(/\[/g, "__lb__").replace(/\]/g, "__rb__");
								regexp = regexp.replace(new RegExp("\\s*\\[" + utils.quotemeta(match[1]) + "\\]\\s*"), "(?:" + pipes + "|(?:\\b|\\s)+)");
								match = regexp.match(/\[(.+?)\]/);
								_context3.next = 13;
								break;

							case 29:

								// Restore the literal square brackets.
								regexp = regexp.replace(/__lb__/g, "[").replace(/__rb__/g, "]");

								// _ wildcards can't match numbers! Quick note on why I did it this way:
								// the initial replacement above (_ => (\w+?)) needs to be \w because the
								// square brackets in [\s\d] will confuse the optionals logic just above.
								// So then we switch it back down here. Also, we don't just use \w+ because
								// that matches digits, and similarly [A-Za-z] doesn't work with Unicode,
								// so this regexp excludes spaces and digits instead of including letters.
								regexp = regexp.replace(/\\w/, "[^\\s\\d]");

								// Filter in arrays.
								giveup = 0;

							case 32:
								if (!(regexp.indexOf("@") > -1)) {
									_context3.next = 39;
									break;
								}

								if (!(giveup++ > 50)) {
									_context3.next = 35;
									break;
								}

								return _context3.abrupt("break", 39);

							case 35:
								_match5 = regexp.match(/\@(.+?)\b/);

								if (_match5) {
									name = _match5[1];
									rep = "";

									if (self.master._array[name]) {
										rep = "(?:" + self.master._array[name].join("|") + ")";
									}
									regexp = regexp.replace(new RegExp("@" + utils.quotemeta(name) + "\\b"), rep);
								}
								_context3.next = 32;
								break;

							case 39:

								// Filter in bot variables.
								giveup = 0;

							case 40:
								if (!(regexp.indexOf("<bot") > -1)) {
									_context3.next = 47;
									break;
								}

								if (!(giveup++ > 50)) {
									_context3.next = 43;
									break;
								}

								return _context3.abrupt("break", 47);

							case 43:
								_match6 = regexp.match(/<bot (.+?)>/i);

								if (_match6) {
									_name2 = _match6[1];
									_rep = '';

									if (self.master._var[_name2]) {
										_rep = utils.stripNasties(self.master._var[_name2]);
									}
									regexp = regexp.replace(new RegExp("<bot " + utils.quotemeta(_name2) + ">"), _rep.toLowerCase());
								}
								_context3.next = 40;
								break;

							case 47:
								// Filter in user variables.
								giveup = 0;

							case 48:
								if (!(regexp.indexOf("<get") > -1)) {
									_context3.next = 60;
									break;
								}

								if (!(giveup++ > 50)) {
									_context3.next = 51;
									break;
								}

								return _context3.abrupt("break", 60);

							case 51:
								_match7 = regexp.match(/<get (.+?)>/i);

								if (!_match7) {
									_context3.next = 58;
									break;
								}

								_name3 = _match7[1];
								_context3.next = 56;
								return self.master.getUservar(user, _name3);

							case 56:
								_rep2 = _context3.sent;

								regexp = regexp.replace(new RegExp("<get " + utils.quotemeta(_name3) + ">", "ig"), _rep2.toLowerCase());

							case 58:
								_context3.next = 48;
								break;

							case 60:
								// Filter in input/reply tags.
								giveup = 0;
								regexp = regexp.replace(/<input>/i, "<input1>");
								regexp = regexp.replace(/<reply>/i, "<reply1>");
								_context3.next = 65;
								return self.master._session.get(user, "__history__");

							case 65:
								history = _context3.sent;

								if (history == "undefined") {
									// purposeful typecast
									history = newHistory();
								}

							case 67:
								if (!(regexp.indexOf("<input") > -1 || regexp.indexOf("<reply") > -1)) {
									_context3.next = 74;
									break;
								}

								if (!(giveup++ > 50)) {
									_context3.next = 70;
									break;
								}

								return _context3.abrupt("break", 74);

							case 70:
								ref = ["input", "reply"];

								for (k = 0, len1 = ref.length; k < len1; k++) {
									type = ref[k];

									for (i = 1; i <= 9; i++) {
										if (regexp.indexOf("<" + type + i + ">") > -1) {
											regexp = regexp.replace(new RegExp("<" + type + i + ">", "g"), history[type][i - 1]);
										}
									}
								}
								_context3.next = 67;
								break;

							case 74:

								// Recover escaped Unicode symbols.
								if (self.utf8 && regexp.indexOf("\\u") > -1) {
									regexp = regexp.replace(/\\u([A-Fa-f0-9]{4})/, function (match, grp) {
										return String.fromCharCode(parseInt(grp, 16));
									});
								}

								// Prevent accidental wildcard match due to double-pipe (e.g. /hi||hello/)
								regexp = regexp.replace(/\|{2,}/mg, '|');
								return _context3.abrupt("return", regexp);

							case 77:
							case "end":
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function triggerRegexp(_x9, _x10) {
				return _ref3.apply(this, arguments);
			}

			return triggerRegexp;
		}()

		/**
  string processTags (string user, string msg, string reply, string[] stars,
                      string[] botstars, int step, scope)
  	Process tags in a reply element.
  */

	}, {
		key: "processTags",
		value: function () {
			var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(user, msg, reply, st, bst, step, scope) {
				var self, stars, botstars, match, giveup, name, result, i, len, _i2, _len3, history, _i3, random, text, output, formats, m, _len4, type, content, replace, parts, tag, data, insert, target, _name4, value, existingValue, _result, _name5, _target, subreply, _parts, _output, obj, args, lang;

				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								self = this;

								// Prepare the stars and botstars.

								stars = [""];

								stars.push.apply(stars, st);
								botstars = [""];

								botstars.push.apply(botstars, bst);
								if (stars.length === 1) {
									stars.push("undefined");
								}
								if (botstars.length === 1) {
									botstars.push("undefined");
								}

								// Turn arrays into randomized sets.
								match = reply.match(/\(@([A-Za-z0-9_]+)\)/i);
								giveup = 0;

							case 9:
								if (!match) {
									_context4.next = 20;
									break;
								}

								if (!(giveup++ > self.master._depth)) {
									_context4.next = 13;
									break;
								}

								self.warn("Infinite loop looking for arrays in reply!");
								return _context4.abrupt("break", 20);

							case 13:
								name = match[1];
								result = void 0;

								if (self.master._array[name]) {
									result = "{random}" + self.master._array[name].join("|") + "{/random}";
								} else {
									// Dummy it out so we can reinsert it later.
									result = "\0@" + name + "\0";
								}

								reply = reply.replace(new RegExp("\\(@" + utils.quotemeta(name) + "\\)", "ig"), result);
								match = reply.match(/\(@([A-Za-z0-9_]+)\)/i);
								_context4.next = 9;
								break;

							case 20:

								// Restore literal arrays that didn't exist.
								reply = reply.replace(/\x00@([A-Za-z0-9_]+)\x00/g, "(@$1)");

								// Tag shortcuts.
								reply = reply.replace(/<person>/ig, "{person}<star>{/person}");
								reply = reply.replace(/<@>/ig, "{@<star>}");
								reply = reply.replace(/<formal>/ig, "{formal}<star>{/formal}");
								reply = reply.replace(/<sentence>/ig, "{sentence}<star>{/sentence}");
								reply = reply.replace(/<uppercase>/ig, "{uppercase}<star>{/uppercase}");
								reply = reply.replace(/<lowercase>/ig, "{lowercase}<star>{/lowercase}");

								// Weight and star tags.
								reply = reply.replace(/\{weight=\d+\}/ig, ""); // Remove {weight}s
								reply = reply.replace(/<star>/ig, stars[1]);
								reply = reply.replace(/<botstar>/ig, botstars[1]);
								for (i = 1, len = stars.length; i <= len; i++) {
									reply = reply.replace(new RegExp("<star" + i + ">", "ig"), stars[i]);
								}
								for (_i2 = 1, _len3 = botstars.length; _i2 <= _len3; _i2++) {
									reply = reply.replace(new RegExp("<botstar" + _i2 + ">", "ig"), botstars[_i2]);
								}

								// <input> and <reply>
								_context4.next = 34;
								return self.master._session.get(user, "__history__");

							case 34:
								history = _context4.sent;

								if (history == "undefined") {
									// purposeful typecast for `undefined` too
									history = newHistory();
								}
								reply = reply.replace(/<input>/ig, history.input ? history.input[0] : "undefined");
								reply = reply.replace(/<reply>/ig, history.reply ? history.reply[0] : "undefined");
								for (_i3 = 1; _i3 <= 9; _i3++) {
									if (reply.indexOf("<input" + _i3 + ">") > -1) {
										reply = reply.replace(new RegExp("<input" + _i3 + ">", "ig"), history.input[_i3 - 1]);
									}
									if (reply.indexOf("<reply" + _i3 + ">") > -1) {
										reply = reply.replace(new RegExp("<reply" + _i3 + ">", "ig"), history.reply[_i3 - 1]);
									}
								}

								// <id> and escape codes
								reply = reply.replace(/<id>/ig, user);
								reply = reply.replace(/\\s/ig, " ");
								reply = reply.replace(/\\n/ig, "\n");
								reply = reply.replace(/\\#/ig, "#");

								// {random}
								match = reply.match(/\{random\}(.+?)\{\/random\}/i);
								giveup = 0;

							case 45:
								if (!match) {
									_context4.next = 57;
									break;
								}

								if (!(giveup++ > self.master._depth)) {
									_context4.next = 49;
									break;
								}

								self.warn("Infinite loop looking for random tag!");
								return _context4.abrupt("break", 57);

							case 49:
								random = [];
								text = match[1];

								if (text.indexOf("|") > -1) {
									random = text.split("|");
								} else {
									random = text.split(" ");
								}

								output = random[parseInt(Math.random() * random.length)];

								reply = reply.replace(new RegExp("\\{random\\}" + utils.quotemeta(text) + "\\{\\/random\\}", "ig"), output);
								match = reply.match(/\{random\}(.+?)\{\/random\}/i);
								_context4.next = 45;
								break;

							case 57:

								// Person substitutions & string formatting
								formats = ["person", "formal", "sentence", "uppercase", "lowercase"];
								m = 0, _len4 = formats.length;

							case 59:
								if (!(m < _len4)) {
									_context4.next = 78;
									break;
								}

								type = formats[m];

								match = reply.match(new RegExp("{" + type + "}(.+?){/" + type + "}", "i"));
								giveup = 0;

							case 63:
								if (!match) {
									_context4.next = 75;
									break;
								}

								giveup++;

								if (!(giveup >= 50)) {
									_context4.next = 68;
									break;
								}

								self.warn("Infinite loop looking for " + type + " tag!");
								return _context4.abrupt("break", 75);

							case 68:
								content = match[1];
								replace = void 0;

								if (type === "person") {
									replace = self.substitute(content, "person");
								} else {
									replace = utils.stringFormat(type, content);
								}

								reply = reply.replace(new RegExp("{" + type + "}" + utils.quotemeta(content) + ("{/" + type + "}"), "ig"), replace);
								match = reply.match(new RegExp("{" + type + "}(.+?){/" + type + "}", "i"));
								_context4.next = 63;
								break;

							case 75:
								m++;
								_context4.next = 59;
								break;

							case 78:

								// Handle all variable-related tags with an iterative regexp approach, to
								// allow for nesting of tags in arbitrary ways (think <set a=<get b>>)
								// Dummy out the <call> tags first, because we don't handle them right here.
								reply = reply.replace(/<call>/ig, "«__call__»");
								reply = reply.replace(/<\/call>/ig, "«/__call__»");

							case 80:
								if (false) {
									_context4.next = 136;
									break;
								}

								// This regexp will match a <tag> which contains no other tag inside it,
								// i.e. in the case of <set a=<get b>> it will match <get b> but not the
								// <set> tag, on the first pass. The second pass will get the <set> tag,
								// and so on.
								match = reply.match(/<([^<]+?)>/);

								if (match) {
									_context4.next = 84;
									break;
								}

								return _context4.abrupt("break", 136);

							case 84:

								match = match[1];
								parts = match.split(" ");
								tag = parts[0].toLowerCase();
								data = "";

								if (parts.length > 1) {
									data = parts.slice(1).join(" ");
								}
								insert = "";

								// Handle the tags.

								if (!(tag === "bot" || tag === "env")) {
									_context4.next = 95;
									break;
								}

								// <bot> and <env> tags are similar
								target = tag === "bot" ? self.master._var : self.master._global;

								if (data.indexOf("=") > -1) {
									// Assigning a variable
									parts = data.split("=", 2);
									self.say("Set " + tag + " variable " + parts[0] + " = " + parts[1]);
									target[parts[0]] = parts[1];
								} else {
									// Getting a bot/env variable
									insert = target[data] || "undefined";
								}
								_context4.next = 133;
								break;

							case 95:
								if (!(tag === "set")) {
									_context4.next = 102;
									break;
								}

								// <set> user vars
								parts = data.split("=", 2);
								self.say("Set uservar " + parts[0] + " = " + parts[1]);
								_context4.next = 100;
								return self.master.setUservar(user, parts[0], parts[1]);

							case 100:
								_context4.next = 133;
								break;

							case 102:
								if (!(tag === "add" || tag === "sub" || tag === "mult" || tag === "div")) {
									_context4.next = 126;
									break;
								}

								// Math operator tags
								parts = data.split("=");
								_name4 = parts[0];
								value = parts[1];

								// Initialize the variable?

								_context4.next = 108;
								return self.master.getUservar(user, _name4);

							case 108:
								existingValue = _context4.sent;

								if (existingValue === "undefined") {
									existingValue = 0;
								}

								// Sanity check
								value = parseInt(value);

								if (!isNaN(value)) {
									_context4.next = 115;
									break;
								}

								insert = "[ERR: Math can't '" + tag + "' non-numeric value '" + value + "']";
								_context4.next = 124;
								break;

							case 115:
								if (!isNaN(parseInt(existingValue))) {
									_context4.next = 119;
									break;
								}

								insert = "[ERR: Math can't '" + tag + "' non-numeric user variable '" + _name4 + "']";
								_context4.next = 124;
								break;

							case 119:
								_result = parseInt(existingValue);

								if (tag === "add") {
									_result += value;
								} else if (tag === "sub") {
									_result -= value;
								} else if (tag === "mult") {
									_result *= value;
								} else if (tag === "div") {
									if (value === 0) {
										insert = "[ERR: Can't Divide By Zero]";
									} else {
										_result /= value;
									}
								}

								// No errors?

								if (!(insert === "")) {
									_context4.next = 124;
									break;
								}

								_context4.next = 124;
								return self.master.setUservar(user, _name4, _result);

							case 124:
								_context4.next = 133;
								break;

							case 126:
								if (!(tag === "get")) {
									_context4.next = 132;
									break;
								}

								_context4.next = 129;
								return self.master.getUservar(user, data);

							case 129:
								insert = _context4.sent;
								_context4.next = 133;
								break;

							case 132:
								// Unrecognized tag, preserve it
								insert = "\0" + match + "\x01";

							case 133:
								reply = reply.replace(new RegExp("<" + utils.quotemeta(match) + ">"), insert);
								_context4.next = 80;
								break;

							case 136:

								// Recover mangled HTML-like tags
								reply = reply.replace(/\x00/g, "<");
								reply = reply.replace(/\x01/g, ">");

								// Topic setter
								match = reply.match(/\{topic=(.+?)\}/i);
								giveup = 0;

							case 140:
								if (!match) {
									_context4.next = 152;
									break;
								}

								giveup++;

								if (!(giveup >= 50)) {
									_context4.next = 145;
									break;
								}

								self.warn("Infinite loop looking for topic tag!");
								return _context4.abrupt("break", 152);

							case 145:
								_name5 = match[1];
								_context4.next = 148;
								return self.master.setUservar(user, "topic", _name5);

							case 148:
								reply = reply.replace(new RegExp("{topic=" + utils.quotemeta(_name5) + "}", "ig"), "");
								match = reply.match(/\{topic=(.+?)\}/i); // Look for more
								_context4.next = 140;
								break;

							case 152:

								// Inline redirector
								match = reply.match(/\{@([^\}]*?)\}/);
								giveup = 0;

							case 154:
								if (!match) {
									_context4.next = 168;
									break;
								}

								giveup++;

								if (!(giveup >= 50)) {
									_context4.next = 159;
									break;
								}

								self.warn("Infinite loop looking for redirect tag!");
								return _context4.abrupt("break", 168);

							case 159:
								_target = utils.strip(match[1]);

								self.say("Inline redirection to: " + _target);

								_context4.next = 163;
								return self._getReply(user, _target, "normal", step + 1, scope);

							case 163:
								subreply = _context4.sent;

								reply = reply.replace(new RegExp("\\{@" + utils.quotemeta(match[1]) + "\\}", "i"), subreply);
								match = reply.match(/\{@([^\}]*?)\}/);
								_context4.next = 154;
								break;

							case 168:

								// Object caller
								reply = reply.replace(/«__call__»/g, "<call>");
								reply = reply.replace(/«\/__call__»/g, "</call>");
								match = reply.match(/<call>([\s\S]+?)<\/call>/);
								giveup = 0;

							case 172:
								if (!match) {
									_context4.next = 202;
									break;
								}

								giveup++;

								if (!(giveup >= 50)) {
									_context4.next = 177;
									break;
								}

								self.warn("Infinite loop looking for call tags!");
								return _context4.abrupt("break", 202);

							case 177:
								_parts = utils.trim(match[1]).split(" ");
								_output = self.master.errors.objectNotFound;
								obj = _parts[0];

								// Make the args shell-like.

								args = [];

								if (_parts.length > 1) {
									args = utils.parseCallArgs(_parts.slice(1).join(" "));
								}

								// Do we know self object?

								if (!(obj in self.master._objlangs)) {
									_context4.next = 198;
									break;
								}

								// We do, but do we have a handler for that language?
								lang = self.master._objlangs[obj];

								if (!(lang in self.master._handlers)) {
									_context4.next = 197;
									break;
								}

								_context4.prev = 185;
								_context4.next = 188;
								return self.master._handlers[lang].call(self.master, obj, args, scope);

							case 188:
								_output = _context4.sent;
								_context4.next = 195;
								break;

							case 191:
								_context4.prev = 191;
								_context4.t0 = _context4["catch"](185);

								if (_context4.t0 != undefined) {
									self.warn(_context4.t0);
								}
								_output = "[ERR: Error raised by object macro]";

							case 195:
								_context4.next = 198;
								break;

							case 197:
								_output = "[ERR: No Object Handler]";

							case 198:
								reply = reply.replace(match[0], _output);
								match = reply.match(/<call>(.+?)<\/call>/);
								_context4.next = 172;
								break;

							case 202:
								return _context4.abrupt("return", reply);

							case 203:
							case "end":
								return _context4.stop();
						}
					}
				}, _callee4, this, [[185, 191]]);
			}));

			function processTags(_x11, _x12, _x13, _x14, _x15, _x16, _x17) {
				return _ref4.apply(this, arguments);
			}

			return processTags;
		}()

		/**
  string substitute (string msg, string type)
  	Run substitutions against a message. `type` is either "sub" or "person" for
  the type of substitution to run.
  */

	}, {
		key: "substitute",
		value: function substitute(msg, type) {
			var self = this;

			// Safety checking.
			if (!self.master._sorted[type]) {
				self.master.warn("You forgot to call sortReplies()!");
				return "";
			}

			// Get the substitutions map.
			var subs = type === "sub" ? self.master._sub : self.master._person;

			// Get the max number of words in sub/person to minimize interations
			var maxwords = type === "sub" ? self.master._submax : self.master._personmax;
			var result = "";

			// Take the original message with no punctuation
			var pattern;
			if (self.master.unicodePunctuation != null) {
				pattern = msg.replace(self.master.unicodePunctuation, "");
			} else {
				pattern = msg.replace(/[.,!?;:]/g, "");
			}

			var tries = 0;
			var giveup = 0;
			var subgiveup = 0;

			// Look for words/phrases until there is no "spaces" in pattern
			while (pattern.indexOf(" ") > -1) {
				giveup++;
				// Give up if there are too many substitutions (for safety)
				if (giveup >= 1000) {
					self.warn("Too many loops when handling substitutions!");
					break;
				}

				var li = utils.nIndexOf(pattern, " ", maxwords);
				var subpattern = pattern.substring(0, li);

				// If finds the pattern in sub object replace and stop to look
				result = subs[subpattern];
				if (result !== undefined) {
					msg = msg.replace(subpattern, result);
				} else {
					// Otherwise Look for substitutions in a subpattern
					while (subpattern.indexOf(" ") > -1) {
						subgiveup++;

						// Give up if there are too many substitutions (for safety)
						if (subgiveup >= 1000) {
							self.warn("Too many loops when handling substitutions!");
							break;
						}

						li = subpattern.lastIndexOf(" ");
						subpattern = subpattern.substring(0, li);

						// If finds the subpattern in sub object replace and stop to look
						result = subs[subpattern];
						if (result !== undefined) {
							msg = msg.replace(subpattern, result);
							break;
						}

						tries++;
					}
				}

				var fi = pattern.indexOf(" ");
				pattern = pattern.substring(fi + 1);
				tries++;
			}

			// After all loops, see if just one word is in the pattern
			result = subs[pattern];
			if (result !== undefined) {
				msg = msg.replace(pattern, result);
			}

			return msg;
		}
	}]);

	return Brain;
}();

;

function newHistory() {
	return {
		input: ["undefined", "undefined", "undefined", "undefined", "undefined", "undefined", "undefined", "undefined", "undefined", "undefined"],
		reply: ["undefined", "undefined", "undefined", "undefined", "undefined", "undefined", "undefined", "undefined", "undefined", "undefined"]
	};
}

module.exports = Brain;

/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// RiveScript.js
// https://www.rivescript.com/

// This code is released under the MIT License.
// See the "LICENSE" file for more information.



/**
Data sorting functions
*/

var utils = __webpack_require__(49);

/**
string[] sortTriggerSet (string[] triggers[, exclude_previous[, func say]])

Sort a group of triggers in an optimal sorting order. The `say` parameter is
a reference to RiveScript.say() or provide your own function (or not) for
debug logging from within this function.

This function has two use cases:

1. create a sort buffer for "normal" (matchable) triggers, which are triggers
   which are NOT accompanied by a %Previous tag.
2. create a sort buffer for triggers that had %Previous tags.

Use the `exclude_previous` parameter to control which one is being done.
This function will return a list of items in the format of
`[ "trigger text", trigger pointer ]` and it's intended to have no duplicate
trigger patterns (unless the source RiveScript code explicitly uses the
same duplicate pattern twice, which is a user error).
*/
exports.sortTriggerSet = function (triggers, exclude_previous, say) {
	var self = this;
	var match;

	if (say == null) {
		say = function say(what) {};
	}
	if (exclude_previous == null) {
		exclude_previous = true;
	}

	// KEEP IN MIND: the `triggers` array is composed of array elements of the form
	// ["trigger text", pointer to trigger data]
	// So this code will use e.g. `trig[0]` when referring to the trigger text.

	// Create a priority map.
	var prior = {
		"0": []
	};

	// Sort triggers by their weights.
	for (var i = 0, len = triggers.length; i < len; i++) {
		var trig = triggers[i];

		// If we're excluding triggers with "previous" values, skip them here.
		if (exclude_previous && trig[1].previous != null) {
			continue;
		}

		match = trig[0].match(/\{weight=(\d+)\}/i);
		var weight = 0;
		if (match && match[1]) {
			weight = match[1];
		}
		if (prior[weight] == null) {
			prior[weight] = [];
		}
		prior[weight].push(trig);
	}

	// Keep a running list of sorted triggers for this topic.
	var running = [];
	var prior_sort = Object.keys(prior).sort(function (a, b) {
		return b - a;
	});
	for (var j = 0, len1 = prior_sort.length; j < len1; j++) {
		var p = prior_sort[j];
		say("Sorting triggers with priority " + p);

		// So, some of these triggers may include an {inherits} tag, if they came
		// from a topic which inherits another topic. Lower inherits values mean
		// higher priority on the stack.
		var inherits = -1; // -1 means no {inherits} tag
		var highest_inherits = -1; // highest number seen so far

		// Loop through and categorize these triggers.
		var track = {};
		track[inherits] = initSortTrack();
		for (var k = 0, len2 = prior[p].length; k < len2; k++) {
			var _trig = prior[p][k];
			var pattern = _trig[0];
			say("Looking at trigger: " + pattern);

			// See if it has an inherits tag.
			match = pattern.match(/\{inherits=(\d+)\}/i);
			if (match) {
				inherits = parseInt(match[1]);
				if (inherits > highest_inherits) {
					highest_inherits = inherits;
				}
				say("Trigger belongs to a topic that inherits other topics. Level=" + inherits);
				pattern = pattern.replace(/\{inherits=\d+\}/ig, "");
				_trig[0] = pattern;
			} else {
				inherits = -1;
			}

			// If this is the first time we've seen this inheritance level,
			// initialize its sort track structure.
			if (track[inherits] == null) {
				track[inherits] = initSortTrack();
			}

			// Start inspecting the trigger's contents.
			if (pattern.indexOf("_") > -1) {
				// Alphabetic wildcard included.
				var cnt = utils.word_count(pattern);
				say("Has a _ wildcard with " + cnt + " words.");
				if (cnt > 0) {
					if (track[inherits].alpha[cnt] == null) {
						track[inherits].alpha[cnt] = [];
					}
					track[inherits].alpha[cnt].push(_trig);
				} else {
					track[inherits].under.push(_trig);
				}
			} else if (pattern.indexOf("#") > -1) {
				// Numeric wildcard included.
				var _cnt = utils.word_count(pattern);
				say("Has a # wildcard with " + _cnt + " words.");
				if (_cnt > 0) {
					if (track[inherits].number[_cnt] == null) {
						track[inherits].number[_cnt] = [];
					}
					track[inherits].number[_cnt].push(_trig);
				} else {
					track[inherits].pound.push(_trig);
				}
			} else if (pattern.indexOf("*") > -1) {
				// Wildcard included.
				var _cnt2 = utils.word_count(pattern);
				say("Has a * wildcard with " + _cnt2 + " words.");
				if (_cnt2 > 0) {
					if (track[inherits].wild[_cnt2] == null) {
						track[inherits].wild[_cnt2] = [];
					}
					track[inherits].wild[_cnt2].push(_trig);
				} else {
					track[inherits].star.push(_trig);
				}
			} else if (pattern.indexOf("[") > -1) {
				// Optionals included.
				var _cnt3 = utils.word_count(pattern);
				say("Has optionals with " + _cnt3 + " words.");
				if (track[inherits].option[_cnt3] == null) {
					track[inherits].option[_cnt3] = [];
				}
				track[inherits].option[_cnt3].push(_trig);
			} else {
				// Totally atomic
				var _cnt4 = utils.word_count(pattern);
				say("Totally atomic trigger with " + _cnt4 + " words.");
				if (track[inherits].atomic[_cnt4] == null) {
					track[inherits].atomic[_cnt4] = [];
				}
				track[inherits].atomic[_cnt4].push(_trig);
			}
		}

		// Move the no-{inherits} triggers to the bottom of the stack.
		track[highest_inherits + 1] = track['-1'];
		delete track['-1'];

		// Add this group to the sort track.
		var track_sorted = Object.keys(track).sort(function (a, b) {
			return a - b;
		});
		for (var l = 0, len3 = track_sorted.length; l < len3; l++) {
			var ip = track_sorted[l];
			say("ip=" + ip);

			var groups = ["atomic", "option", "alpha", "number", "wild"];
			// Sort each of the main kinds of triggers by their word counts.
			for (var m = 0, len4 = groups.length; m < len4; m++) {
				var kind = groups[m];
				var kind_sorted = Object.keys(track[ip][kind]).sort(function (a, b) {
					return b - a;
				});

				for (var n = 0, len5 = kind_sorted.length; n < len5; n++) {
					var wordcnt = kind_sorted[n];

					// Triggers with equal word lengths should be sorted by overall
					// trigger length.
					var sorted_by_length = track[ip][kind][wordcnt].sort(function (a, b) {
						return b.length - a.length;
					});
					running.push.apply(running, sorted_by_length);
				}
			}

			// Add the single wildcard triggers.
			var under_sorted = track[ip].under.sort(function (a, b) {
				return b.length - a.length;
			});
			var pound_sorted = track[ip].pound.sort(function (a, b) {
				return b.length - a.length;
			});
			var star_sorted = track[ip].star.sort(function (a, b) {
				return b.length - a.length;
			});
			running.push.apply(running, under_sorted);
			running.push.apply(running, pound_sorted);
			running.push.apply(running, star_sorted);
		}
	}

	return running;
};

/**
string[] sortList (string[] items)

Sort a list of strings by their word counts and lengths.
*/
exports.sortList = function (items) {
	var self = this;

	// Track by number of words.
	var track = {};

	// Loop through each item.
	for (var i = 0, len = items.length; i < len; i++) {
		var item = items[i];
		var cnt = utils.word_count(item, true);
		if (track[cnt] == null) {
			track[cnt] = [];
		}
		track[cnt].push(item);
	}

	// Sort them.
	var output = [];
	var sorted = Object.keys(track).sort(function (a, b) {
		return b - a;
	});
	for (var j = 0, len1 = sorted.length; j < len1; j++) {
		var count = sorted[j];
		var bylen = track[count].sort(function (a, b) {
			return b.length - a.length;
		});
		output.push.apply(output, bylen);
	}

	return output;
};

/**
private object initSortTrack ()

Returns a new object for keeping track of triggers for sorting.
*/
var initSortTrack = function initSortTrack() {
	return {
		atomic: {},
		option: {},
		alpha: {},
		number: {},
		wild: {},
		pound: [],
		under: [],
		star: []
	};
};

/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// RiveScript.js
// https://www.rivescript.com/

// This code is released under the MIT License.
// See the "LICENSE" file for more information.



var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var noop = function () {
	var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(resp) {
		return regeneratorRuntime.wrap(function _callee25$(_context25) {
			while (1) {
				switch (_context25.prev = _context25.next) {
					case 0:
						return _context25.abrupt("return", new Promise(function (resolve, reject) {
							resolve(resp);
						}));

					case 1:
					case "end":
						return _context25.stop();
				}
			}
		}, _callee25, this);
	}));

	return function noop(_x28) {
		return _ref25.apply(this, arguments);
	};
}();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = __webpack_require__(49);

/**
SessionManager

This is the interface for session managers that store user variables for
RiveScript. User variables include those set with the `<set>` tag or the
`setUservar()` function, as well as recent reply history and private internal
state variables.

The default session manager keeps the variables in memory. This means the bot
doesn't remember users after you restart the program; but the functions
`getUservars()` and `setUservars()` are available to export and import the
variables yourself.

If you prefer a more active session manager that stores and retrieves user
variables from a MySQL, MongoDB or Redis database, you can replace the default
session manager with one that implements that backend (or write one yourself
that implements this SessionManager API).

To use a session manager, you'd typically do something like:

```javascript
const RedisSessions = require("rivescript-contrib-redis");

// Provide the sessionManager option to use this instead of
// the default MemorySessionManager.
var bot = new RiveScript({
	sessionManager: new RedisSessions("localhost:6379")
});
```

To implement your own session manager, you should extend the
`SessionManager` class and implement a compatible object.
*/

var SessionManager = function () {
	function SessionManager() {
		_classCallCheck(this, SessionManager);
	}

	_createClass(SessionManager, [{
		key: "set",

		/**
  void set(string username, object data)
  	Set user variables for the user `username`. The `args` should be an object
  of key/value pairs. The values are usually strings, but they can be other
  types as well (e.g. arrays or other objects) for some internal data
  structures such as input/reply history.
  	A value of `null` for a variable means it should be deleted from the
  user's session store.
  */
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(username, data) {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								throw "Not Implemented";

							case 1:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function set(_x, _x2) {
				return _ref.apply(this, arguments);
			}

			return set;
		}()

		/**
  async get(string username, string key) -> string
  	Retrieve a stored variable for a user.
  	If the user doesn't exist, this should resolve `null`. If the user *does*
  exist, but the key does not, this function should resolve the
  string value `"undefined"`.
  */

	}, {
		key: "get",
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(username, key) {
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								throw "Not Implemented";

							case 1:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function get(_x3, _x4) {
				return _ref2.apply(this, arguments);
			}

			return get;
		}()

		/**
  async getAny(string username) -> object
  	Retrieve all stored user variables for the user `username`.
  	This should resolve an object of the key/value pairs you have stored for
  the user. If the user doesn't exist, resolve `null`.
  */

	}, {
		key: "getAny",
		value: function () {
			var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(username) {
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								throw "Not Implemented";

							case 1:
							case "end":
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function getAny(_x5) {
				return _ref3.apply(this, arguments);
			}

			return getAny;
		}()

		/**
  async getAll() -> object
  	Retrieve all variables about all users.
  	This should return an object that maps usernames to an object of their
  variables. For example:
  	```json
  { "user1": {
      "topic": "random",
         "name": "Alice"
    },
    "user2": {
      "topic": "random",
      "name": "Bob"
    }
  }
  ```
  */

	}, {
		key: "getAll",
		value: function () {
			var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								throw "Not Implemented";

							case 1:
							case "end":
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function getAll() {
				return _ref4.apply(this, arguments);
			}

			return getAll;
		}()

		/**
  async reset(string username)
  	Reset all variables stored about a particular user.
  */

	}, {
		key: "reset",
		value: function () {
			var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(username) {
				return regeneratorRuntime.wrap(function _callee5$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								throw "Not Implemented";

							case 1:
							case "end":
								return _context5.stop();
						}
					}
				}, _callee5, this);
			}));

			function reset(_x6) {
				return _ref5.apply(this, arguments);
			}

			return reset;
		}()

		/**
  async resetAll()
  	Reset all data about all users.
  */

	}, {
		key: "resetAll",
		value: function () {
			var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
				return regeneratorRuntime.wrap(function _callee6$(_context6) {
					while (1) {
						switch (_context6.prev = _context6.next) {
							case 0:
								throw "Not Implemented";

							case 1:
							case "end":
								return _context6.stop();
						}
					}
				}, _callee6, this);
			}));

			function resetAll() {
				return _ref6.apply(this, arguments);
			}

			return resetAll;
		}()

		/**
  async freeze(string username)
  	Make a snapshot of the user's variables so that they can be restored
  later via `thaw()`. This is the implementation for
  `RiveScript.freezeUservars()`
  */

	}, {
		key: "freeze",
		value: function () {
			var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(username) {
				return regeneratorRuntime.wrap(function _callee7$(_context7) {
					while (1) {
						switch (_context7.prev = _context7.next) {
							case 0:
								throw "Not Implemented";

							case 1:
							case "end":
								return _context7.stop();
						}
					}
				}, _callee7, this);
			}));

			function freeze(_x7) {
				return _ref7.apply(this, arguments);
			}

			return freeze;
		}()

		/**
  async thaw(string username, string action)
  	Restore the frozen snapshot of variables for a user.
  	This should replace _all_ of a user's variables with the frozen copy
  that was snapshotted with `freeze()`. If there are no frozen variables,
  this function should be a no-op (maybe print a warning?)
  	Valid options for `action` reflect the usage of `rs.thawUservars()`:
  	* `thaw`: Restore the variables and delete the frozen copy (default)
  * `discard`: Do not restore the variables, but delete the frozen copy
  * `keep`: Restore the variables and keep the frozen copy
  */

	}, {
		key: "thaw",
		value: function () {
			var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(username, action) {
				return regeneratorRuntime.wrap(function _callee8$(_context8) {
					while (1) {
						switch (_context8.prev = _context8.next) {
							case 0:
								throw "Not Implemented";

							case 1:
							case "end":
								return _context8.stop();
						}
					}
				}, _callee8, this);
			}));

			function thaw(_x8, _x9) {
				return _ref8.apply(this, arguments);
			}

			return thaw;
		}()

		/**
  object defaultSession()
  	You do not need to override this method. This returns the default session
  variables for a new user, e.g. with the variable `topic="random"` as per
  the RiveScript spec.
  */

	}, {
		key: "defaultSession",
		value: function defaultSession() {
			return {
				"topic": "random"
			};
		}
	}]);

	return SessionManager;
}();

/**
MemorySessionManager

This is the default in-memory session store for RiveScript.

It keeps all user variables in an object in memory and does not persist them
to disk. This means it won't remember user variables between reboots of your
bot's program, but it remembers just fine during its lifetime.

The RiveScript methods `getUservars()` and `setUservars()` are available to
export and import user variables as JSON-serializable objects so that your
program could save them to disk on its own.

See the documentation for `SessionManager` for information on extending
RiveScript with an alternative session store.
*/


var MemorySessionManager = function (_SessionManager) {
	_inherits(MemorySessionManager, _SessionManager);

	function MemorySessionManager() {
		_classCallCheck(this, MemorySessionManager);

		var _this = _possibleConstructorReturn(this, (MemorySessionManager.__proto__ || Object.getPrototypeOf(MemorySessionManager)).call(this));

		var self = _this;
		self._users = {};
		self._frozen = {};
		return _this;
	}

	// init makes sure a user exists in the session store.


	_createClass(MemorySessionManager, [{
		key: "init",
		value: function init(username) {
			var self = this;
			if (self._users[username] === undefined) {
				self._users[username] = self.defaultSession();
			}
		}
	}, {
		key: "set",
		value: function () {
			var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(username, data) {
				var self;
				return regeneratorRuntime.wrap(function _callee9$(_context9) {
					while (1) {
						switch (_context9.prev = _context9.next) {
							case 0:
								self = this;
								return _context9.abrupt("return", new Promise(function (resolve, reject) {
									self.init(username);
									for (var key in data) {
										if (data.hasOwnProperty(key)) {
											self._users[username][key] = data[key];
										}
									}
									resolve();
								}));

							case 2:
							case "end":
								return _context9.stop();
						}
					}
				}, _callee9, this);
			}));

			function set(_x10, _x11) {
				return _ref9.apply(this, arguments);
			}

			return set;
		}()
	}, {
		key: "get",
		value: function () {
			var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(username, key) {
				var self;
				return regeneratorRuntime.wrap(function _callee10$(_context10) {
					while (1) {
						switch (_context10.prev = _context10.next) {
							case 0:
								self = this;
								return _context10.abrupt("return", new Promise(function (resolve, reject) {
									if (self._users[username] === undefined) {
										resolve(null);
									} else if (self._users[username][key] !== undefined) {
										resolve(self._users[username][key]);
									} else {
										resolve("undefined");
									}
								}));

							case 2:
							case "end":
								return _context10.stop();
						}
					}
				}, _callee10, this);
			}));

			function get(_x12, _x13) {
				return _ref10.apply(this, arguments);
			}

			return get;
		}()
	}, {
		key: "getAny",
		value: function () {
			var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(username) {
				var self;
				return regeneratorRuntime.wrap(function _callee11$(_context11) {
					while (1) {
						switch (_context11.prev = _context11.next) {
							case 0:
								self = this;
								return _context11.abrupt("return", new Promise(function (resolve, reject) {
									if (self._users[username] === undefined) {
										resolve(null);
									} else {
										resolve(utils.clone(self._users[username]));
									}
								}));

							case 2:
							case "end":
								return _context11.stop();
						}
					}
				}, _callee11, this);
			}));

			function getAny(_x14) {
				return _ref11.apply(this, arguments);
			}

			return getAny;
		}()
	}, {
		key: "getAll",
		value: function () {
			var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
				var self;
				return regeneratorRuntime.wrap(function _callee12$(_context12) {
					while (1) {
						switch (_context12.prev = _context12.next) {
							case 0:
								self = this;
								return _context12.abrupt("return", new Promise(function (resolve, reject) {
									resolve(utils.clone(self._users));
								}));

							case 2:
							case "end":
								return _context12.stop();
						}
					}
				}, _callee12, this);
			}));

			function getAll() {
				return _ref12.apply(this, arguments);
			}

			return getAll;
		}()
	}, {
		key: "reset",
		value: function () {
			var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(username) {
				var self;
				return regeneratorRuntime.wrap(function _callee13$(_context13) {
					while (1) {
						switch (_context13.prev = _context13.next) {
							case 0:
								self = this;
								return _context13.abrupt("return", new Promise(function (resolve, reject) {
									if (self._users[username] !== undefined) {
										delete self._users[username];
									}
									if (self._frozen[username] !== undefined) {
										delete self._frozen[username];
									}
									resolve();
								}));

							case 2:
							case "end":
								return _context13.stop();
						}
					}
				}, _callee13, this);
			}));

			function reset(_x15) {
				return _ref13.apply(this, arguments);
			}

			return reset;
		}()
	}, {
		key: "resetAll",
		value: function () {
			var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
				var self;
				return regeneratorRuntime.wrap(function _callee14$(_context14) {
					while (1) {
						switch (_context14.prev = _context14.next) {
							case 0:
								self = this;
								return _context14.abrupt("return", new Promise(function (resolve, reject) {
									self._users = {};
									self._frozen = {};
									resolve();
								}));

							case 2:
							case "end":
								return _context14.stop();
						}
					}
				}, _callee14, this);
			}));

			function resetAll() {
				return _ref14.apply(this, arguments);
			}

			return resetAll;
		}()
	}, {
		key: "freeze",
		value: function () {
			var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(username) {
				var self;
				return regeneratorRuntime.wrap(function _callee15$(_context15) {
					while (1) {
						switch (_context15.prev = _context15.next) {
							case 0:
								self = this;
								return _context15.abrupt("return", new Promise(function (resolve, reject) {
									if (self._users[username] !== undefined) {
										self._frozen[username] = utils.clone(self._users[username]);
										resolve();
									} else {
										reject("freeze(" + username + "): user not found");
									}
								}));

							case 2:
							case "end":
								return _context15.stop();
						}
					}
				}, _callee15, this);
			}));

			function freeze(_x16) {
				return _ref15.apply(this, arguments);
			}

			return freeze;
		}()
	}, {
		key: "thaw",
		value: function () {
			var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(username) {
				var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "thaw";
				var self;
				return regeneratorRuntime.wrap(function _callee16$(_context16) {
					while (1) {
						switch (_context16.prev = _context16.next) {
							case 0:
								self = this;
								return _context16.abrupt("return", new Promise(function (resolve, reject) {
									if (self._frozen[username] !== undefined) {
										// OK what are we doing?
										switch (action) {
											case "thaw":
												self._users[username] = utils.clone(self._frozen[username]);
												delete self._frozen[username];
												break;
											case "discard":
												delete self._frozen[username];
												break;
											case "keep":
												self._users[username] = utils.clone(self._frozen[username]);
												break;
											default:
												reject("bad thaw action");
										}
										resolve();
									} else {
										reject("thaw(" + username + "): no frozen variables found");
									}
								}));

							case 2:
							case "end":
								return _context16.stop();
						}
					}
				}, _callee16, this);
			}));

			function thaw(_x18) {
				return _ref16.apply(this, arguments);
			}

			return thaw;
		}()
	}]);

	return MemorySessionManager;
}(SessionManager);

/**
NullSessionManager

This is a session manager implementation that does not remember any user
variables. It is mostly useful for unit tests.
*/


var NullSessionManager = function (_SessionManager2) {
	_inherits(NullSessionManager, _SessionManager2);

	function NullSessionManager() {
		_classCallCheck(this, NullSessionManager);

		return _possibleConstructorReturn(this, (NullSessionManager.__proto__ || Object.getPrototypeOf(NullSessionManager)).apply(this, arguments));
	}

	_createClass(NullSessionManager, [{
		key: "set",
		value: function () {
			var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(username, data) {
				return regeneratorRuntime.wrap(function _callee17$(_context17) {
					while (1) {
						switch (_context17.prev = _context17.next) {
							case 0:
								return _context17.abrupt("return", noop());

							case 1:
							case "end":
								return _context17.stop();
						}
					}
				}, _callee17, this);
			}));

			function set(_x19, _x20) {
				return _ref17.apply(this, arguments);
			}

			return set;
		}()
	}, {
		key: "get",
		value: function () {
			var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(username, key) {
				return regeneratorRuntime.wrap(function _callee18$(_context18) {
					while (1) {
						switch (_context18.prev = _context18.next) {
							case 0:
								return _context18.abrupt("return", noop("undefined"));

							case 1:
							case "end":
								return _context18.stop();
						}
					}
				}, _callee18, this);
			}));

			function get(_x21, _x22) {
				return _ref18.apply(this, arguments);
			}

			return get;
		}()
	}, {
		key: "getAny",
		value: function () {
			var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(username) {
				return regeneratorRuntime.wrap(function _callee19$(_context19) {
					while (1) {
						switch (_context19.prev = _context19.next) {
							case 0:
								return _context19.abrupt("return", noop(null));

							case 1:
							case "end":
								return _context19.stop();
						}
					}
				}, _callee19, this);
			}));

			function getAny(_x23) {
				return _ref19.apply(this, arguments);
			}

			return getAny;
		}()
	}, {
		key: "getAll",
		value: function () {
			var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
				return regeneratorRuntime.wrap(function _callee20$(_context20) {
					while (1) {
						switch (_context20.prev = _context20.next) {
							case 0:
								return _context20.abrupt("return", noop(new Object()));

							case 1:
							case "end":
								return _context20.stop();
						}
					}
				}, _callee20, this);
			}));

			function getAll() {
				return _ref20.apply(this, arguments);
			}

			return getAll;
		}()
	}, {
		key: "reset",
		value: function () {
			var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(username) {
				return regeneratorRuntime.wrap(function _callee21$(_context21) {
					while (1) {
						switch (_context21.prev = _context21.next) {
							case 0:
								return _context21.abrupt("return", noop());

							case 1:
							case "end":
								return _context21.stop();
						}
					}
				}, _callee21, this);
			}));

			function reset(_x24) {
				return _ref21.apply(this, arguments);
			}

			return reset;
		}()
	}, {
		key: "resetAll",
		value: function () {
			var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
				return regeneratorRuntime.wrap(function _callee22$(_context22) {
					while (1) {
						switch (_context22.prev = _context22.next) {
							case 0:
								return _context22.abrupt("return", noop());

							case 1:
							case "end":
								return _context22.stop();
						}
					}
				}, _callee22, this);
			}));

			function resetAll() {
				return _ref22.apply(this, arguments);
			}

			return resetAll;
		}()
	}, {
		key: "freeze",
		value: function () {
			var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(username) {
				return regeneratorRuntime.wrap(function _callee23$(_context23) {
					while (1) {
						switch (_context23.prev = _context23.next) {
							case 0:
								return _context23.abrupt("return", noop());

							case 1:
							case "end":
								return _context23.stop();
						}
					}
				}, _callee23, this);
			}));

			function freeze(_x25) {
				return _ref23.apply(this, arguments);
			}

			return freeze;
		}()
	}, {
		key: "thaw",
		value: function () {
			var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(username, action) {
				return regeneratorRuntime.wrap(function _callee24$(_context24) {
					while (1) {
						switch (_context24.prev = _context24.next) {
							case 0:
								return _context24.abrupt("return", noop());

							case 1:
							case "end":
								return _context24.stop();
						}
					}
				}, _callee24, this);
			}));

			function thaw(_x26, _x27) {
				return _ref24.apply(this, arguments);
			}

			return thaw;
		}()
	}]);

	return NullSessionManager;
}(SessionManager);

module.exports.SessionManager = SessionManager;
module.exports.MemorySessionManager = MemorySessionManager;
module.exports.NullSessionManager = NullSessionManager;

/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Generated by CoffeeScript 2.0.0
// RiveScript.js

// This code is released under the MIT License.
// See the "LICENSE" file for more information.

// http://www.rivescript.com/


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JSObjectHandler;

/**
JSObjectHandler (RiveScript master)

JavaScript Language Support for RiveScript Macros. This support is enabled by
default in RiveScript.js; if you don't want it, override the `javascript`
language handler to null, like so:

```javascript
bot.setHandler("javascript", null);
```
*/
JSObjectHandler = function () {
	function JSObjectHandler(master) {
		_classCallCheck(this, JSObjectHandler);

		this._master = master;
		this._objects = {};
	}

	/**
 void load (string name, string[]|function code)
 	Called by the RiveScript object to load JavaScript code.
 */


	_createClass(JSObjectHandler, [{
		key: "load",
		value: function load(name, code) {
			var e, source;
			if (typeof code === "function") {
				// If code is just a js function, store the reference as is
				return this._objects[name] = code;
			} else {
				// We need to make a dynamic JavaScript function.
				source = "this._objects[\"" + name + "\"] = function(rs, args) {\n" + code.join("\n") + "}\n";
				try {
					return eval(source);
				} catch (error) {
					e = error;
					return this._master.warn("Error evaluating JavaScript object: " + e.message);
				}
			}
		}

		/**
  string call (RiveScript rs, string name, string[] fields)
  	Called by the RiveScript object to execute JavaScript code.
  */

	}, {
		key: "call",
		value: function call(rs, name, fields, scope) {
			var e, func, reply;
			// We have it?
			if (!this._objects[name]) {
				return this._master.errors.objectNotFound;
			}
			// Call the dynamic method.
			func = this._objects[name];
			reply = "";
			try {
				reply = func.call(scope, rs, fields);
			} catch (error) {
				e = error;
				reply = "[ERR: Error when executing JavaScript object: " + e.message + "]";
			}
			// Allow undefined responses.
			if (reply === void 0) {
				reply = "";
			}
			return reply;
		}
	}]);

	return JSObjectHandler;
}();

module.exports = JSObjectHandler;

/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fs = __webpack_require__(127);
var path = __webpack_require__(339);

module.exports = read;

function read(root, filter, files, prefix) {
  prefix = prefix || '';
  files = files || [];
  filter = filter || noDotFiles;

  var dir = path.join(root, prefix);
  if (!fs.existsSync(dir)) return files;
  if (fs.statSync(dir).isDirectory()) fs.readdirSync(dir).filter(function (name, index) {
    return filter(name, index, dir);
  }).forEach(function (name) {
    read(root, filter, files, path.join(prefix, name));
  });else files.push(prefix);

  return files;
}

function noDotFiles(x) {
  return x[0] !== '.';
}

/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

// Copyright Joyent, Inc. and other Node contributors.
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

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function splitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function () {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = i >= 0 ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function (path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function (p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function (path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function () {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function (p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};

// path.relative(from, to)
// posix version
exports.relative = function (from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};

exports.basename = function (path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  return splitPath(path)[3];
};

function filter(xs, f) {
  if (xs.filter) return xs.filter(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (f(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
  return str.substr(start, len);
} : function (str, start, len) {
  if (start < 0) start = str.length + start;
  return str.substr(start, len);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(125)))

/***/ })
/******/ ]);