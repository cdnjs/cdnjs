(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["feather"] = factory();
	else
		root["feather"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 49);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(36)('wks');
var uid = __webpack_require__(15);
var Symbol = __webpack_require__(1).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(7);
var hide = __webpack_require__(8);
var redefine = __webpack_require__(10);
var ctx = __webpack_require__(11);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(29);
var toPrimitive = __webpack_require__(31);
var dP = Object.defineProperty;

exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(12)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var createDesc = __webpack_require__(14);
module.exports = __webpack_require__(5) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var hide = __webpack_require__(8);
var has = __webpack_require__(6);
var SRC = __webpack_require__(15)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(7).inspectSource = function (it) {
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(32);
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
/* 12 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(34);
var defined = __webpack_require__(19);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(11);
var call = __webpack_require__(38);
var isArrayIter = __webpack_require__(39);
var anObject = __webpack_require__(9);
var toLength = __webpack_require__(22);
var getIterFn = __webpack_require__(40);
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
/* 18 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(52);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(10);
var hide = __webpack_require__(8);
var has = __webpack_require__(6);
var Iterators = __webpack_require__(13);
var $iterCreate = __webpack_require__(53);
var setToStringTag = __webpack_require__(24);
var getPrototypeOf = __webpack_require__(59);
var ITERATOR = __webpack_require__(0)('iterator');
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(55);
var enumBugKeys = __webpack_require__(37);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(18);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(36)('keys');
var uid = __webpack_require__(15);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(4).f;
var has = __webpack_require__(6);
var TAG = __webpack_require__(0)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(19);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(35);
var TAG = __webpack_require__(0)('toStringTag');
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = __webpack_require__(86);

var _icon2 = _interopRequireDefault(_icon);

var _icons = __webpack_require__(88);

var _icons2 = _interopRequireDefault(_icons);

var _tags = __webpack_require__(89);

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Object.keys(_icons2.default).map(function (key) {
  return new _icon2.default(key, _icons2.default[key], _tags2.default[key]);
}).reduce(function (object, icon) {
  object[icon.name] = icon;
  return object;
}, {});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(51)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(20)(String, 'String', function (iterated) {
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(5) && !__webpack_require__(12)(function () {
  return Object.defineProperty(__webpack_require__(30)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(2);
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
/* 32 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(9);
var dPs = __webpack_require__(54);
var enumBugKeys = __webpack_require__(37);
var IE_PROTO = __webpack_require__(23)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(30)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(58).appendChild(iframe);
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(35);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(9);
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(13);
var ITERATOR = __webpack_require__(0)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(26);
var ITERATOR = __webpack_require__(0)('iterator');
var Iterators = __webpack_require__(13);
module.exports = __webpack_require__(7).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(0)('iterator');
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
/* 42 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(10);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(15)('meta');
var isObject = __webpack_require__(2);
var has = __webpack_require__(6);
var setDesc = __webpack_require__(4).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(12)(function () {
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var classNames = (function () {
		// don't inherit from Object so we can skip hasOwnProperty check later
		// http://stackoverflow.com/questions/15518328/creating-js-object-with-object-createnull#answer-21079232
		function StorageObject() {}
		StorageObject.prototype = Object.create(null);

		function _parseArray (resultSet, array) {
			var length = array.length;

			for (var i = 0; i < length; ++i) {
				_parse(resultSet, array[i]);
			}
		}

		var hasOwn = {}.hasOwnProperty;

		function _parseNumber (resultSet, num) {
			resultSet[num] = true;
		}

		function _parseObject (resultSet, object) {
			for (var k in object) {
				if (hasOwn.call(object, k)) {
					// set value to false instead of deleting it to avoid changing object structure
					// https://www.smashingmagazine.com/2012/11/writing-fast-memory-efficient-javascript/#de-referencing-misconceptions
					resultSet[k] = !!object[k];
				}
			}
		}

		var SPACE = /\s+/;
		function _parseString (resultSet, str) {
			var array = str.split(SPACE);
			var length = array.length;

			for (var i = 0; i < length; ++i) {
				resultSet[array[i]] = true;
			}
		}

		function _parse (resultSet, arg) {
			if (!arg) return;
			var argType = typeof arg;

			// 'foo bar'
			if (argType === 'string') {
				_parseString(resultSet, arg);

			// ['foo', 'bar', ...]
			} else if (Array.isArray(arg)) {
				_parseArray(resultSet, arg);

			// { 'foo': true, ... }
			} else if (argType === 'object') {
				_parseObject(resultSet, arg);

			// '130'
			} else if (argType === 'number') {
				_parseNumber(resultSet, arg);
			}
		}

		function _classNames () {
			// don't leak arguments
			// https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
			var len = arguments.length;
			var args = Array(len);
			for (var i = 0; i < len; i++) {
				args[i] = arguments[i];
			}

			var classSet = new StorageObject();
			_parseArray(classSet, args);

			var list = [];

			for (var k in classSet) {
				if (classSet[k]) {
					list.push(k)
				}
			}

			return list.join(' ');
		}

		return _classNames;
	})();

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(50);
__webpack_require__(62);
__webpack_require__(66);
module.exports = __webpack_require__(85);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28);
__webpack_require__(60);
module.exports = __webpack_require__(7).Array.from;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(18);
var defined = __webpack_require__(19);
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
/* 52 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(33);
var descriptor = __webpack_require__(14);
var setToStringTag = __webpack_require__(24);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(8)(IteratorPrototype, __webpack_require__(0)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var anObject = __webpack_require__(9);
var getKeys = __webpack_require__(21);

module.exports = __webpack_require__(5) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(6);
var toIObject = __webpack_require__(16);
var arrayIndexOf = __webpack_require__(56)(false);
var IE_PROTO = __webpack_require__(23)('IE_PROTO');

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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(16);
var toLength = __webpack_require__(22);
var toAbsoluteIndex = __webpack_require__(57);
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(18);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1).document;
module.exports = document && document.documentElement;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(6);
var toObject = __webpack_require__(25);
var IE_PROTO = __webpack_require__(23)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(11);
var $export = __webpack_require__(3);
var toObject = __webpack_require__(25);
var call = __webpack_require__(38);
var isArrayIter = __webpack_require__(39);
var toLength = __webpack_require__(22);
var createProperty = __webpack_require__(61);
var getIterFn = __webpack_require__(40);

$export($export.S + $export.F * !__webpack_require__(41)(function (iter) { Array.from(iter); }), 'Array', {
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(4);
var createDesc = __webpack_require__(14);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(63);
module.exports = __webpack_require__(7).Object.assign;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(3);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(64) });


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(21);
var gOPS = __webpack_require__(65);
var pIE = __webpack_require__(42);
var toObject = __webpack_require__(25);
var IObject = __webpack_require__(34);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(12)(function () {
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
/* 65 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(67);
__webpack_require__(28);
__webpack_require__(68);
__webpack_require__(71);
__webpack_require__(78);
__webpack_require__(81);
__webpack_require__(83);
module.exports = __webpack_require__(7).Set;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(26);
var test = {};
test[__webpack_require__(0)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(10)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(69);
var getKeys = __webpack_require__(21);
var redefine = __webpack_require__(10);
var global = __webpack_require__(1);
var hide = __webpack_require__(8);
var Iterators = __webpack_require__(13);
var wks = __webpack_require__(0);
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
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(70);
var step = __webpack_require__(43);
var Iterators = __webpack_require__(13);
var toIObject = __webpack_require__(16);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(20)(Array, 'Array', function (iterated, kind) {
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
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(0)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(8)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(72);
var validate = __webpack_require__(47);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(74)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(4).f;
var create = __webpack_require__(33);
var redefineAll = __webpack_require__(44);
var ctx = __webpack_require__(11);
var anInstance = __webpack_require__(45);
var forOf = __webpack_require__(17);
var $iterDefine = __webpack_require__(20);
var step = __webpack_require__(43);
var setSpecies = __webpack_require__(73);
var DESCRIPTORS = __webpack_require__(5);
var fastKey = __webpack_require__(46).fastKey;
var validate = __webpack_require__(47);
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
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(1);
var dP = __webpack_require__(4);
var DESCRIPTORS = __webpack_require__(5);
var SPECIES = __webpack_require__(0)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(1);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(10);
var redefineAll = __webpack_require__(44);
var meta = __webpack_require__(46);
var forOf = __webpack_require__(17);
var anInstance = __webpack_require__(45);
var isObject = __webpack_require__(2);
var fails = __webpack_require__(12);
var $iterDetect = __webpack_require__(41);
var setToStringTag = __webpack_require__(24);
var inheritIfRequired = __webpack_require__(75);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
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
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
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
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
var setPrototypeOf = __webpack_require__(76).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(2);
var anObject = __webpack_require__(9);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(11)(Function.call, __webpack_require__(77).f(Object.prototype, '__proto__').set, 2);
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
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(42);
var createDesc = __webpack_require__(14);
var toIObject = __webpack_require__(16);
var toPrimitive = __webpack_require__(31);
var has = __webpack_require__(6);
var IE8_DOM_DEFINE = __webpack_require__(29);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(5) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(3);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(79)('Set') });


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(26);
var from = __webpack_require__(80);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(17);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(82)('Set');


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(3);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(84)('Set');


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(3);
var aFunction = __webpack_require__(32);
var ctx = __webpack_require__(11);
var forOf = __webpack_require__(17);

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
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _icons = __webpack_require__(27);

var _icons2 = _interopRequireDefault(_icons);

var _toSvg = __webpack_require__(90);

var _toSvg2 = _interopRequireDefault(_toSvg);

var _replace = __webpack_require__(91);

var _replace2 = _interopRequireDefault(_replace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = { icons: _icons2.default, toSvg: _toSvg2.default, replace: _replace2.default };

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dedupe = __webpack_require__(48);

var _dedupe2 = _interopRequireDefault(_dedupe);

var _defaultAttrs = __webpack_require__(87);

var _defaultAttrs2 = _interopRequireDefault(_defaultAttrs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Icon = function () {
  function Icon(name, contents) {
    var tags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, Icon);

    this.name = name;
    this.contents = contents;
    this.tags = tags;
    this.attrs = _extends({}, _defaultAttrs2.default, { class: 'feather feather-' + name });
  }

  /**
   * Create an SVG string.
   * @param {Object} attrs
   * @returns {string}
   */


  _createClass(Icon, [{
    key: 'toSvg',
    value: function toSvg() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var combinedAttrs = _extends({}, this.attrs, attrs, { class: (0, _dedupe2.default)(this.attrs.class, attrs.class) });

      return '<svg ' + attrsToString(combinedAttrs) + '>' + this.contents + '</svg>';
    }

    /**
     * Return string representation of an `Icon`.
     *
     * Added for backward compatibility. If old code expects `feather.icons.<name>`
     * to be a string, `toString()` will get implicitly called.
     *
     * @returns {string}
     */

  }, {
    key: 'toString',
    value: function toString() {
      return this.contents;
    }
  }]);

  return Icon;
}();

/**
 * Convert attributes object to string of HTML attributes.
 * @param {Object} attrs
 * @returns {string}
 */


function attrsToString(attrs) {
  return Object.keys(attrs).map(function (key) {
    return key + '="' + attrs[key] + '"';
  }).join(' ');
}

exports.default = Icon;

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"}

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = {"activity":"\n  <polyline points=\"22 12 18 12 15 21 9 3 6 12 2 12\"></polyline>\n","airplay":"\n  <path d=\"M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1\"></path>\n  <polygon points=\"12 15 17 21 7 21 12 15\"></polygon>\n","alert-circle":"\n  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n  <line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"></line>\n  <line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"16\"></line>\n","alert-octagon":"\n  <polygon points=\"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2\"></polygon>\n  <line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"></line>\n  <line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"16\"></line>\n","alert-triangle":"\n  <path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"></path>\n  <line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"></line>\n  <line x1=\"12\" y1=\"17\" x2=\"12\" y2=\"17\"></line>\n","align-center":"\n  <line x1=\"18\" y1=\"10\" x2=\"6\" y2=\"10\"></line>\n  <line x1=\"21\" y1=\"6\" x2=\"3\" y2=\"6\"></line>\n  <line x1=\"21\" y1=\"14\" x2=\"3\" y2=\"14\"></line>\n  <line x1=\"18\" y1=\"18\" x2=\"6\" y2=\"18\"></line>\n","align-justify":"\n  <line x1=\"21\" y1=\"10\" x2=\"3\" y2=\"10\"></line>\n  <line x1=\"21\" y1=\"6\" x2=\"3\" y2=\"6\"></line>\n  <line x1=\"21\" y1=\"14\" x2=\"3\" y2=\"14\"></line>\n  <line x1=\"21\" y1=\"18\" x2=\"3\" y2=\"18\"></line>\n","align-left":"\n  <line x1=\"17\" y1=\"10\" x2=\"3\" y2=\"10\"></line>\n  <line x1=\"21\" y1=\"6\" x2=\"3\" y2=\"6\"></line>\n  <line x1=\"21\" y1=\"14\" x2=\"3\" y2=\"14\"></line>\n  <line x1=\"17\" y1=\"18\" x2=\"3\" y2=\"18\"></line>\n","align-right":"\n  <line x1=\"21\" y1=\"10\" x2=\"7\" y2=\"10\"></line>\n  <line x1=\"21\" y1=\"6\" x2=\"3\" y2=\"6\"></line>\n  <line x1=\"21\" y1=\"14\" x2=\"3\" y2=\"14\"></line>\n  <line x1=\"21\" y1=\"18\" x2=\"7\" y2=\"18\"></line>\n","anchor":"\n  <circle cx=\"12\" cy=\"5\" r=\"3\"></circle>\n  <line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"8\"></line>\n  <path d=\"M5 12H2a10 10 0 0 0 20 0h-3\"></path>\n","aperture":"\n  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n  <line x1=\"14.31\" y1=\"8\" x2=\"20.05\" y2=\"17.94\"></line>\n  <line x1=\"9.69\" y1=\"8\" x2=\"21.17\" y2=\"8\"></line>\n  <line x1=\"7.38\" y1=\"12\" x2=\"13.12\" y2=\"2.06\"></line>\n  <line x1=\"9.69\" y1=\"16\" x2=\"3.95\" y2=\"6.06\"></line>\n  <line x1=\"14.31\" y1=\"16\" x2=\"2.83\" y2=\"16\"></line>\n  <line x1=\"16.62\" y1=\"12\" x2=\"10.88\" y2=\"21.94\"></line>\n","arrow-down-left":"\n  <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n  <polyline points=\"15 18 6 18 6 9\"></polyline>\n","arrow-down-right":"\n  <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n  <polyline points=\"9 18 18 18 18 9\"></polyline>\n","arrow-down":"\n  <line x1=\"12\" y1=\"4\" x2=\"12\" y2=\"20\"></line>\n  <polyline points=\"18 14 12 20 6 14\"></polyline>\n","arrow-left":"\n  <line x1=\"20\" y1=\"12\" x2=\"4\" y2=\"12\"></line>\n  <polyline points=\"10 18 4 12 10 6\"></polyline>\n","arrow-right":"\n  <line x1=\"4\" y1=\"12\" x2=\"20\" y2=\"12\"></line>\n  <polyline points=\"14 6 20 12 14 18\"></polyline>\n","arrow-up-left":"\n  <line x1=\"18\" y1=\"18\" x2=\"6\" y2=\"6\"></line>\n  <polyline points=\"15 6 6 6 6 15\"></polyline>\n","arrow-up-right":"\n  <line x1=\"6\" y1=\"18\" x2=\"18\" y2=\"6\"></line>\n  <polyline points=\"9 6 18 6 18 15\"></polyline>\n","arrow-up":"\n  <line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"4\"></line>\n  <polyline points=\"6 10 12 4 18 10\"></polyline>\n","at-sign":"\n  <circle cx=\"12\" cy=\"12\" r=\"4\"></circle>\n  <path d=\"M16 12v1a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94\"></path>\n","award":"\n  <circle cx=\"12\" cy=\"8\" r=\"7\"></circle>\n  <polyline points=\"8.21 13.89 7 23 12 20 17 23 15.79 13.88\"></polyline>\n","bar-chart-2":"\n  <rect x=\"10\" y=\"3\" width=\"4\" height=\"18\"></rect>\n  <rect x=\"18\" y=\"8\" width=\"4\" height=\"13\"></rect>\n  <rect x=\"2\" y=\"13\" width=\"4\" height=\"8\"></rect>\n","bar-chart":"\n  <rect x=\"18\" y=\"3\" width=\"4\" height=\"18\"></rect>\n  <rect x=\"10\" y=\"8\" width=\"4\" height=\"13\"></rect>\n  <rect x=\"2\" y=\"13\" width=\"4\" height=\"8\"></rect>\n","battery-charging":"\n  <path d=\"M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19\"></path>\n  <line x1=\"23\" y1=\"13\" x2=\"23\" y2=\"11\"></line>\n  <polyline points=\"11 6 7 12 13 12 9 18\"></polyline>\n","battery":"\n  <rect x=\"1\" y=\"6\" width=\"18\" height=\"12\" rx=\"2\" ry=\"2\"></rect>\n  <line x1=\"23\" y1=\"13\" x2=\"23\" y2=\"11\"></line>\n","bell-off":"\n  <path d=\"M8.56 2.9A7 7 0 0 1 19 9v4m-2 4H2a3 3 0 0 0 3-3V9a7 7 0 0 1 .78-3.22M13.73 21a2 2 0 0 1-3.46 0\"></path>\n  <line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>\n","bell":"\n  <path d=\"M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0\"></path>\n","bluetooth":"\n  <polyline points=\"6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5\"></polyline>\n","bold":"\n  <path d=\"M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z\"></path>\n  <path d=\"M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z\"></path>\n","book":"\n  <path d=\"M4 19.5A2.5 2.5 0 0 1 6.5 17H20\"></path>\n  <path d=\"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z\"></path>\n","bookmark":"\n  <path d=\"M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z\"></path>\n","box":"\n  <path d=\"M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z\"></path>\n  <polyline points=\"2.32 6.16 12 11 21.68 6.16\"></polyline>\n  <line x1=\"12\" y1=\"22.76\" x2=\"12\" y2=\"11\"></line>\n","briefcase":"\n  <rect x=\"2\" y=\"7\" width=\"20\" height=\"14\" rx=\"2\" ry=\"2\"></rect>\n  <path d=\"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16\"></path>\n","calendar":"\n  <rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>\n  <line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"></line>\n  <line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"></line>\n  <line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"></line>\n","camera-off":"\n  <line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>\n  <path d=\"M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56\"></path>\n","camera":"\n  <path d=\"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z\"></path>\n  <circle cx=\"12\" cy=\"13\" r=\"4\"></circle>\n","cast":"\n  <path d=\"M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6\"></path>\n  <line x1=\"2\" y1=\"20\" x2=\"2\" y2=\"20\"></line>\n","check-circle":"\n  <path d=\"M22 11.07V12a10 10 0 1 1-5.93-9.14\"></path>\n  <polyline points=\"23 3 12 14 9 11\"></polyline>\n","check-square":"\n  <polyline points=\"9 11 12 14 23 3\"></polyline>\n  <path d=\"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11\"></path>\n","check":"\n  <polyline points=\"20 6 9 17 4 12\"></polyline>\n","chevron-down":"\n  <polyline points=\"6 9 12 15 18 9\"></polyline>\n","chevron-left":"\n  <polyline points=\"15 18 9 12 15 6\"></polyline>\n","chevron-right":"\n  <polyline points=\"9 18 15 12 9 6\"></polyline>\n","chevron-up":"\n  <polyline points=\"18 15 12 9 6 15\"></polyline>\n","chevrons-down":"\n  <polyline points=\"7 13 12 18 17 13\"></polyline>\n  <polyline points=\"7 6 12 11 17 6\"></polyline>\n","chevrons-left":"\n  <polyline points=\"11 17 6 12 11 7\"></polyline>\n  <polyline points=\"18 17 13 12 18 7\"></polyline>\n","chevrons-right":"\n  <polyline points=\"13 17 18 12 13 7\"></polyline>\n  <polyline points=\"6 17 11 12 6 7\"></polyline>\n","chevrons-up":"\n  <polyline points=\"17 11 12 6 7 11\"></polyline>\n  <polyline points=\"17 18 12 13 7 18\"></polyline>\n","chrome":"\n  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n  <circle cx=\"12\" cy=\"12\" r=\"4\"></circle>\n  <line x1=\"21.17\" y1=\"8\" x2=\"12\" y2=\"8\"></line>\n  <line x1=\"3.95\" y1=\"6.06\" x2=\"8.54\" y2=\"14\"></line>\n  <line x1=\"10.88\" y1=\"21.94\" x2=\"15.46\" y2=\"14\"></line>\n","circle":"\n  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n","clipboard":"\n  <path d=\"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2\"></path>\n  <rect x=\"8\" y=\"2\" width=\"8\" height=\"4\" rx=\"1\" ry=\"1\"></rect>\n","clock":"\n  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n  <polyline points=\"12 6 12 12 15 15\"></polyline>\n","cloud-drizzle":"\n  <line x1=\"8\" y1=\"19\" x2=\"8\" y2=\"21\"></line>\n  <line x1=\"8\" y1=\"13\" x2=\"8\" y2=\"15\"></line>\n  <line x1=\"16\" y1=\"19\" x2=\"16\" y2=\"21\"></line>\n  <line x1=\"16\" y1=\"13\" x2=\"16\" y2=\"15\"></line>\n  <line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"23\"></line>\n  <line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"17\"></line>\n  <path d=\"M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25\"></path>\n","cloud-lightning":"\n  <path d=\"M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9\"></path>\n  <polyline points=\"13 11 9 17 15 17 11 23\"></polyline>\n","cloud-off":"\n  <path d=\"M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3\"></path>\n  <line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>\n","cloud-rain":"\n  <line x1=\"16\" y1=\"13\" x2=\"16\" y2=\"21\"></line>\n  <line x1=\"8\" y1=\"13\" x2=\"8\" y2=\"21\"></line>\n  <line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"23\"></line>\n  <path d=\"M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25\"></path>\n","cloud-snow":"\n  <path d=\"M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25\"></path>\n  <line x1=\"8\" y1=\"16\" x2=\"8\" y2=\"16\"></line>\n  <line x1=\"8\" y1=\"20\" x2=\"8\" y2=\"20\"></line>\n  <line x1=\"12\" y1=\"18\" x2=\"12\" y2=\"18\"></line>\n  <line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"22\"></line>\n  <line x1=\"16\" y1=\"16\" x2=\"16\" y2=\"16\"></line>\n  <line x1=\"16\" y1=\"20\" x2=\"16\" y2=\"20\"></line>\n","cloud":"\n  <path d=\"M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z\"></path>\n","codepen":"\n  <polygon points=\"12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2\"></polygon>\n  <line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"15.5\"></line>\n  <polyline points=\"22 8.5 12 15.5 2 8.5\"></polyline>\n  <polyline points=\"2 15.5 12 8.5 22 15.5\"></polyline>\n  <line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"8.5\"></line>\n","command":"\n  <path d=\"M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z\"></path>\n","compass":"\n  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n  <polygon points=\"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76\"></polygon>\n","copy":"\n  <rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect>\n  <path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path>\n","corner-down-left":"\n  <polyline points=\"9 10 4 15 9 20\"></polyline>\n  <path d=\"M20 4v7a4 4 0 0 1-4 4H4\"></path>\n","corner-down-right":"\n  <polyline points=\"15 10 20 15 15 20\"></polyline>\n  <path d=\"M4 4v7a4 4 0 0 0 4 4h12\"></path>\n","corner-left-down":"\n  <polyline points=\"14 15 9 20 4 15\"></polyline>\n  <path d=\"M20 4h-7a4 4 0 0 0-4 4v12\"></path>\n","corner-left-up":"\n  <polyline points=\"14 9 9 4 4 9\"></polyline>\n  <path d=\"M20 20h-7a4 4 0 0 1-4-4V4\"></path>\n","corner-right-down":"\n  <polyline points=\"10 15 15 20 20 15\"></polyline>\n  <path d=\"M4 4h7a4 4 0 0 1 4 4v12\"></path>\n","corner-right-up":"\n  <polyline points=\"10 9 15 4 20 9\"></polyline>\n  <path d=\"M4 20h7a4 4 0 0 0 4-4V4\"></path>\n","corner-up-left":"\n  <polyline points=\"9 14 4 9 9 4\"></polyline>\n  <path d=\"M20 20v-7a4 4 0 0 0-4-4H4\"></path>\n","corner-up-right":"\n  <polyline points=\"15 14 20 9 15 4\"></polyline>\n  <path d=\"M4 20v-7a4 4 0 0 1 4-4h12\"></path>\n","cpu":"\n  <rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"2\" ry=\"2\"></rect>\n  <rect x=\"9\" y=\"9\" width=\"6\" height=\"6\"></rect>\n  <line x1=\"9\" y1=\"1\" x2=\"9\" y2=\"4\"></line>\n  <line x1=\"15\" y1=\"1\" x2=\"15\" y2=\"4\"></line>\n  <line x1=\"9\" y1=\"20\" x2=\"9\" y2=\"23\"></line>\n  <line x1=\"15\" y1=\"20\" x2=\"15\" y2=\"23\"></line>\n  <line x1=\"20\" y1=\"9\" x2=\"23\" y2=\"9\"></line>\n  <line x1=\"20\" y1=\"14\" x2=\"23\" y2=\"14\"></line>\n  <line x1=\"1\" y1=\"9\" x2=\"4\" y2=\"9\"></line>\n  <line x1=\"1\" y1=\"14\" x2=\"4\" y2=\"14\"></line>\n","credit-card":"\n  <rect x=\"1\" y=\"4\" width=\"22\" height=\"16\" rx=\"2\" ry=\"2\"></rect>\n  <line x1=\"1\" y1=\"10\" x2=\"23\" y2=\"10\"></line>\n","crop":"\n  <path d=\"M6.13 1L6 16a2 2 0 0 0 2 2h15\"></path>\n  <path d=\"M1 6.13L16 6a2 2 0 0 1 2 2v15\"></path>\n","crosshair":"\n  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n  <line x1=\"22\" y1=\"12\" x2=\"18\" y2=\"12\"></line>\n  <line x1=\"6\" y1=\"12\" x2=\"2\" y2=\"12\"></line>\n  <line x1=\"12\" y1=\"6\" x2=\"12\" y2=\"2\"></line>\n  <line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"18\"></line>\n","delete":"\n  <path d=\"M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z\"></path>\n  <line x1=\"18\" y1=\"9\" x2=\"12\" y2=\"15\"></line>\n  <line x1=\"12\" y1=\"9\" x2=\"18\" y2=\"15\"></line>\n","disc":"\n  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n  <circle cx=\"12\" cy=\"12\" r=\"3\"></circle>\n","download-cloud":"\n  <polyline points=\"8 17 12 21 16 17\"></polyline>\n  <line x1=\"12\" y1=\"12\" x2=\"12\" y2=\"21\"></line>\n  <path d=\"M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29\"></path>\n","download":"\n  <path d=\"M3 17v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3\"></path>\n  <polyline points=\"8 12 12 16 16 12\"></polyline>\n  <line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"16\"></line>\n","droplet":"\n  <path d=\"M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z\"></path>\n","edit-2":"\n  <polygon points=\"16 3 21 8 8 21 3 21 3 16 16 3\"></polygon>\n","edit-3":"\n  <polygon points=\"14 2 18 6 7 17 3 17 3 13 14 2\"></polygon>\n  <line x1=\"3\" y1=\"22\" x2=\"21\" y2=\"22\"></line>\n","edit":"\n  <path d=\"M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34\"></path>\n  <polygon points=\"18 2 22 6 12 16 8 16 8 12 18 2\"></polygon>\n","external-link":"\n  <path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"></path>\n  <polyline points=\"15 3 21 3 21 9\"></polyline>\n  <line x1=\"10\" y1=\"14\" x2=\"21\" y2=\"3\"></line>\n","eye-off":"\n  <path d=\"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24\"></path>\n  <line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>\n","eye":"\n  <path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\"></path>\n  <circle cx=\"12\" cy=\"12\" r=\"3\"></circle>\n","facebook":"\n  <path d=\"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z\"></path>\n","fast-forward":"\n  <polygon points=\"13 19 22 12 13 5 13 19\"></polygon>\n  <polygon points=\"2 19 11 12 2 5 2 19\"></polygon>\n","feather":"\n  <path d=\"M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z\"></path>\n  <line x1=\"16\" y1=\"8\" x2=\"2\" y2=\"22\"></line>\n  <line x1=\"17\" y1=\"15\" x2=\"9\" y2=\"15\"></line>\n","file-minus":"\n  <path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"></path>\n  <polyline points=\"14 2 14 8 20 8\"></polyline>\n  <line x1=\"9\" y1=\"15\" x2=\"15\" y2=\"15\"></line>\n","file-plus":"\n  <path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"></path>\n  <polyline points=\"14 2 14 8 20 8\"></polyline>\n  <line x1=\"12\" y1=\"18\" x2=\"12\" y2=\"12\"></line>\n  <line x1=\"9\" y1=\"15\" x2=\"15\" y2=\"15\"></line>\n","file-text":"\n  <path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"></path>\n  <polyline points=\"14 2 14 8 20 8\"></polyline>\n  <line x1=\"16\" y1=\"13\" x2=\"8\" y2=\"13\"></line>\n  <line x1=\"16\" y1=\"17\" x2=\"8\" y2=\"17\"></line>\n  <polyline points=\"10 9 9 9 8 9\"></polyline>\n","file":"\n  <path d=\"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z\"></path>\n  <polyline points=\"13 2 13 9 20 9\"></polyline>\n","film":"\n  <rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"2.18\" ry=\"2.18\"></rect>\n  <line x1=\"7\" y1=\"2\" x2=\"7\" y2=\"22\"></line>\n  <line x1=\"17\" y1=\"2\" x2=\"17\" y2=\"22\"></line>\n  <line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"></line>\n  <line x1=\"2\" y1=\"7\" x2=\"7\" y2=\"7\"></line>\n  <line x1=\"2\" y1=\"17\" x2=\"7\" y2=\"17\"></line>\n  <line x1=\"17\" y1=\"17\" x2=\"22\" y2=\"17\"></line>\n  <line x1=\"17\" y1=\"7\" x2=\"22\" y2=\"7\"></line>\n","filter":"\n  <polygon points=\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\"></polygon>\n","flag":"\n  <path d=\"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z\"></path>\n  <line x1=\"4\" y1=\"22\" x2=\"4\" y2=\"15\"></line>\n","folder":"\n  <path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"></path>\n","github":"\n  <path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\"></path>\n","gitlab":"\n  <path d=\"M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z\"></path>\n","globe":"\n  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n  <line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"></line>\n  <path d=\"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z\"></path>\n","grid":"\n  <rect x=\"3\" y=\"3\" width=\"7\" height=\"7\"></rect>\n  <rect x=\"14\" y=\"3\" width=\"7\" height=\"7\"></rect>\n  <rect x=\"14\" y=\"14\" width=\"7\" height=\"7\"></rect>\n  <rect x=\"3\" y=\"14\" width=\"7\" height=\"7\"></rect>\n","hash":"\n  <line x1=\"4\" y1=\"9\" x2=\"20\" y2=\"9\"></line>\n  <line x1=\"4\" y1=\"15\" x2=\"20\" y2=\"15\"></line>\n  <line x1=\"10\" y1=\"3\" x2=\"8\" y2=\"21\"></line>\n  <line x1=\"16\" y1=\"3\" x2=\"14\" y2=\"21\"></line>\n","headphones":"\n  <path d=\"M3 18v-6a9 9 0 0 1 18 0v6\"></path>\n  <path d=\"M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z\"></path>\n","heart":"\n  <path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"></path>\n","help-circle":"\n  <path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\"></path>\n  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n  <line x1=\"12\" y1=\"17\" x2=\"12\" y2=\"17\"></line>\n","home":"\n  <path d=\"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>\n  <polyline points=\"9 22 9 12 15 12 15 22\"></polyline>\n","image":"\n  <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>\n  <circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\"></circle>\n  <polyline points=\"21 15 16 10 5 21\"></polyline>\n","inbox":"\n  <polyline points=\"22 13 16 13 14 16 10 16 8 13 2 13\"></polyline>\n  <path d=\"M5.47 5.19L2 13v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5l-3.47-7.81A2 2 0 0 0 16.7 4H7.3a2 2 0 0 0-1.83 1.19z\"></path>\n","info":"\n  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n  <line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\"></line>\n  <line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"8\"></line>\n","instagram":"\n  <rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"5\" ry=\"5\"></rect>\n  <path d=\"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z\"></path>\n  <line x1=\"17.5\" y1=\"6.5\" x2=\"17.5\" y2=\"6.5\"></line>\n","italic":"\n  <line x1=\"19\" y1=\"4\" x2=\"10\" y2=\"4\"></line>\n  <line x1=\"14\" y1=\"20\" x2=\"5\" y2=\"20\"></line>\n  <line x1=\"15\" y1=\"4\" x2=\"9\" y2=\"20\"></line>\n","layers":"\n  <polygon points=\"12 2 2 7 12 12 22 7 12 2\"></polygon>\n  <polyline points=\"2 17 12 22 22 17\"></polyline>\n  <polyline points=\"2 12 12 17 22 12\"></polyline>\n","layout":"\n  <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>\n  <line x1=\"3\" y1=\"9\" x2=\"21\" y2=\"9\"></line>\n  <line x1=\"9\" y1=\"21\" x2=\"9\" y2=\"9\"></line>\n","life-buoy":"\n  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n  <circle cx=\"12\" cy=\"12\" r=\"4\"></circle>\n  <line x1=\"4.93\" y1=\"4.93\" x2=\"9.17\" y2=\"9.17\"></line>\n  <line x1=\"14.83\" y1=\"14.83\" x2=\"19.07\" y2=\"19.07\"></line>\n  <line x1=\"14.83\" y1=\"9.17\" x2=\"19.07\" y2=\"4.93\"></line>\n  <line x1=\"14.83\" y1=\"9.17\" x2=\"18.36\" y2=\"5.64\"></line>\n  <line x1=\"4.93\" y1=\"19.07\" x2=\"9.17\" y2=\"14.83\"></line>\n","link-2":"\n  <path d=\"M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3\"></path>\n  <line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>\n","link":"\n  <path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"></path>\n  <path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"></path>\n","list":"\n  <line x1=\"8\" y1=\"6\" x2=\"21\" y2=\"6\"></line>\n  <line x1=\"8\" y1=\"12\" x2=\"21\" y2=\"12\"></line>\n  <line x1=\"8\" y1=\"18\" x2=\"21\" y2=\"18\"></line>\n  <line x1=\"3\" y1=\"6\" x2=\"3\" y2=\"6\"></line>\n  <line x1=\"3\" y1=\"12\" x2=\"3\" y2=\"12\"></line>\n  <line x1=\"3\" y1=\"18\" x2=\"3\" y2=\"18\"></line>\n","loader":"\n  <line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"6\"></line>\n  <line x1=\"12\" y1=\"18\" x2=\"12\" y2=\"22\"></line>\n  <line x1=\"4.93\" y1=\"4.93\" x2=\"7.76\" y2=\"7.76\"></line>\n  <line x1=\"16.24\" y1=\"16.24\" x2=\"19.07\" y2=\"19.07\"></line>\n  <line x1=\"2\" y1=\"12\" x2=\"6\" y2=\"12\"></line>\n  <line x1=\"18\" y1=\"12\" x2=\"22\" y2=\"12\"></line>\n  <line x1=\"4.93\" y1=\"19.07\" x2=\"7.76\" y2=\"16.24\"></line>\n  <line x1=\"16.24\" y1=\"7.76\" x2=\"19.07\" y2=\"4.93\"></line>\n","lock":"\n  <rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"></rect>\n  <path d=\"M7 11V7a5 5 0 0 1 10 0v4\"></path>\n","log-in":"\n  <path d=\"M14 22h5a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-5\"></path>\n  <polyline points=\"11 16 15 12 11 8\"></polyline>\n  <line x1=\"15\" y1=\"12\" x2=\"3\" y2=\"12\"></line>\n","log-out":"\n  <path d=\"M10 22H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5\"></path>\n  <polyline points=\"17 16 21 12 17 8\"></polyline>\n  <line x1=\"21\" y1=\"12\" x2=\"9\" y2=\"12\"></line>\n","mail":"\n  <path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path>\n  <polyline points=\"22,6 12,13 2,6\"></polyline>\n","map-pin":"\n  <path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path>\n  <circle cx=\"12\" cy=\"10\" r=\"3\"></circle>\n","map":"\n  <polygon points=\"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6\"></polygon>\n  <line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"18\"></line>\n  <line x1=\"16\" y1=\"6\" x2=\"16\" y2=\"22\"></line>\n","maximize-2":"\n  <polyline points=\"15 3 21 3 21 9\"></polyline>\n  <polyline points=\"9 21 3 21 3 15\"></polyline>\n  <line x1=\"21\" y1=\"3\" x2=\"14\" y2=\"10\"></line>\n  <line x1=\"3\" y1=\"21\" x2=\"10\" y2=\"14\"></line>\n","maximize":"\n  <path d=\"M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3\"></path>\n","menu":"\n  <line x1=\"3\" y1=\"12\" x2=\"21\" y2=\"12\"></line>\n  <line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"></line>\n  <line x1=\"3\" y1=\"18\" x2=\"21\" y2=\"18\"></line>\n","message-circle":"\n  <path d=\"M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z\"></path>\n","message-square":"\n  <path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"></path>\n","mic-off":"\n  <line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>\n  <path d=\"M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6\"></path>\n  <path d=\"M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23\"></path>\n  <line x1=\"12\" y1=\"19\" x2=\"12\" y2=\"23\"></line>\n  <line x1=\"8\" y1=\"23\" x2=\"16\" y2=\"23\"></line>\n","mic":"\n  <path d=\"M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z\"></path>\n  <path d=\"M19 10v2a7 7 0 0 1-14 0v-2\"></path>\n  <line x1=\"12\" y1=\"19\" x2=\"12\" y2=\"23\"></line>\n  <line x1=\"8\" y1=\"23\" x2=\"16\" y2=\"23\"></line>\n","minimize-2":"\n  <polyline points=\"4 14 10 14 10 20\"></polyline>\n  <polyline points=\"20 10 14 10 14 4\"></polyline>\n  <line x1=\"14\" y1=\"10\" x2=\"21\" y2=\"3\"></line>\n  <line x1=\"3\" y1=\"21\" x2=\"10\" y2=\"14\"></line>\n","minimize":"\n  <path d=\"M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3\"></path>\n","minus-circle":"\n  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n  <line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>\n","minus-square":"\n  <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>\n  <line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>\n","minus":"\n  <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\n","monitor":"\n  <rect x=\"2\" y=\"3\" width=\"20\" height=\"14\" rx=\"2\" ry=\"2\"></rect>\n  <line x1=\"8\" y1=\"21\" x2=\"16\" y2=\"21\"></line>\n  <line x1=\"12\" y1=\"17\" x2=\"12\" y2=\"21\"></line>\n","moon":"\n  <path d=\"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z\"></path>\n","more-horizontal":"\n  <circle cx=\"12\" cy=\"12\" r=\"2\"></circle>\n  <circle cx=\"20\" cy=\"12\" r=\"2\"></circle>\n  <circle cx=\"4\" cy=\"12\" r=\"2\"></circle>\n","more-vertical":"\n  <circle cx=\"12\" cy=\"12\" r=\"2\"></circle>\n  <circle cx=\"12\" cy=\"4\" r=\"2\"></circle>\n  <circle cx=\"12\" cy=\"20\" r=\"2\"></circle>\n","move":"\n  <polyline points=\"5 9 2 12 5 15\"></polyline>\n  <polyline points=\"9 5 12 2 15 5\"></polyline>\n  <polyline points=\"15 19 12 22 9 19\"></polyline>\n  <polyline points=\"19 9 22 12 19 15\"></polyline>\n  <line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"></line>\n  <line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"22\"></line>\n","music":"\n  <path d=\"M9 17H5a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm12-2h-4a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z\"></path>\n  <polyline points=\"9 17 9 5 21 3 21 15\"></polyline>\n","navigation-2":"\n  <polygon points=\"12 2 19 21 12 17 5 21 12 2\"></polygon>\n","navigation":"\n  <polygon points=\"3 11 22 2 13 21 11 13 3 11\"></polygon>\n","octagon":"\n  <polygon points=\"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2\"></polygon>\n","package":"\n  <path d=\"M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z\"></path>\n  <polyline points=\"2.32 6.16 12 11 21.68 6.16\"></polyline>\n  <line x1=\"12\" y1=\"22.76\" x2=\"12\" y2=\"11\"></line>\n  <line x1=\"7\" y1=\"3.5\" x2=\"17\" y2=\"8.5\"></line>\n","paperclip":"\n  <path d=\"M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48\"></path>\n","pause-circle":"\n  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n  <line x1=\"10\" y1=\"15\" x2=\"10\" y2=\"9\"></line>\n  <line x1=\"14\" y1=\"15\" x2=\"14\" y2=\"9\"></line>\n","pause":"\n  <rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect>\n  <rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect>\n","percent":"\n  <line x1=\"19\" y1=\"5\" x2=\"5\" y2=\"19\"></line>\n  <circle cx=\"6.5\" cy=\"6.5\" r=\"2.5\"></circle>\n  <circle cx=\"17.5\" cy=\"17.5\" r=\"2.5\"></circle>\n","phone-call":"\n  <path d=\"M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>\n","phone-forwarded":"\n  <polyline points=\"19 1 23 5 19 9\"></polyline>\n  <line x1=\"15\" y1=\"5\" x2=\"23\" y2=\"5\"></line>\n  <path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>\n","phone-incoming":"\n  <polyline points=\"16 2 16 8 22 8\"></polyline>\n  <line x1=\"23\" y1=\"1\" x2=\"16\" y2=\"8\"></line>\n  <path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>\n","phone-missed":"\n  <line x1=\"23\" y1=\"1\" x2=\"17\" y2=\"7\"></line>\n  <line x1=\"17\" y1=\"1\" x2=\"23\" y2=\"7\"></line>\n  <path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>\n","phone-off":"\n  <path d=\"M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91\"></path>\n  <line x1=\"23\" y1=\"1\" x2=\"1\" y2=\"23\"></line>\n","phone-outgoing":"\n  <polyline points=\"23 7 23 1 17 1\"></polyline>\n  <line x1=\"16\" y1=\"8\" x2=\"23\" y2=\"1\"></line>\n  <path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>\n","phone":"\n  <path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>\n","pie-chart":"\n  <path d=\"M21.21 15.89A10 10 0 1 1 8 2.83\"></path>\n  <path d=\"M22 12A10 10 0 0 0 12 2v10z\"></path>\n","play-circle":"\n  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n  <polygon points=\"10 8 16 12 10 16 10 8\"></polygon>\n","play":"\n  <polygon points=\"5 3 19 12 5 21 5 3\"></polygon>\n","plus-circle":"\n  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n  <line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"16\"></line>\n  <line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>\n","plus-square":"\n  <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>\n  <line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"16\"></line>\n  <line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>\n","plus":"\n  <line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line>\n  <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\n","pocket":"\n  <path d=\"M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z\"></path>\n  <polyline points=\"8 10 12 14 16 10\"></polyline>\n","power":"\n  <path d=\"M18.36 6.64a9 9 0 1 1-12.73 0\"></path>\n  <line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"12\"></line>\n","printer":"\n  <polyline points=\"6 9 6 2 18 2 18 9\"></polyline>\n  <path d=\"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2\"></path>\n  <rect x=\"6\" y=\"14\" width=\"12\" height=\"8\"></rect>\n","radio":"\n  <circle cx=\"12\" cy=\"12\" r=\"2\"></circle>\n  <path d=\"M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14\"></path>\n","refresh-ccw":"\n  <polyline points=\"1 4 1 10 7 10\"></polyline>\n  <polyline points=\"23 20 23 14 17 14\"></polyline>\n  <path d=\"M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15\"></path>\n","refresh-cw":"\n  <polyline points=\"23 4 23 10 17 10\"></polyline>\n  <polyline points=\"1 20 1 14 7 14\"></polyline>\n  <path d=\"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15\"></path>\n","repeat":"\n  <polyline points=\"17 1 21 5 17 9\"></polyline>\n  <path d=\"M3 11V9a4 4 0 0 1 4-4h14\"></path>\n  <polyline points=\"7 23 3 19 7 15\"></polyline>\n  <path d=\"M21 13v2a4 4 0 0 1-4 4H3\"></path>\n","rewind":"\n  <polygon points=\"11 19 2 12 11 5 11 19\"></polygon>\n  <polygon points=\"22 19 13 12 22 5 22 19\"></polygon>\n","rotate-ccw":"\n  <polyline points=\"1 4 1 10 7 10\"></polyline>\n  <path d=\"M3.51 15a9 9 0 1 0 2.13-9.36L1 10\"></path>\n","rotate-cw":"\n  <polyline points=\"23 4 23 10 17 10\"></polyline>\n  <path d=\"M20.49 15a9 9 0 1 1-2.12-9.36L23 10\"></path>\n","save":"\n  <path d=\"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z\"></path>\n  <polyline points=\"17 21 17 13 7 13 7 21\"></polyline>\n  <polyline points=\"7 3 7 8 15 8\"></polyline>\n","scissors":"\n  <circle cx=\"6\" cy=\"6\" r=\"3\"></circle>\n  <circle cx=\"6\" cy=\"18\" r=\"3\"></circle>\n  <line x1=\"20\" y1=\"4\" x2=\"8.12\" y2=\"15.88\"></line>\n  <line x1=\"14.47\" y1=\"14.48\" x2=\"20\" y2=\"20\"></line>\n  <line x1=\"8.12\" y1=\"8.12\" x2=\"12\" y2=\"12\"></line>\n","search":"\n  <circle cx=\"10.5\" cy=\"10.5\" r=\"7.5\"></circle>\n  <line x1=\"21\" y1=\"21\" x2=\"15.8\" y2=\"15.8\"></line>\n","server":"\n  <rect x=\"2\" y=\"2\" width=\"20\" height=\"8\" rx=\"2\" ry=\"2\"></rect>\n  <rect x=\"2\" y=\"14\" width=\"20\" height=\"8\" rx=\"2\" ry=\"2\"></rect>\n  <line x1=\"6\" y1=\"6\" x2=\"6\" y2=\"6\"></line>\n  <line x1=\"6\" y1=\"18\" x2=\"6\" y2=\"18\"></line>\n","settings":"\n  <circle cx=\"12\" cy=\"12\" r=\"3\"></circle>\n  <path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\"></path>\n","share-2":"\n  <circle cx=\"18\" cy=\"5\" r=\"3\"></circle>\n  <circle cx=\"6\" cy=\"12\" r=\"3\"></circle>\n  <circle cx=\"18\" cy=\"19\" r=\"3\"></circle>\n  <line x1=\"8.59\" y1=\"13.51\" x2=\"15.42\" y2=\"17.49\"></line>\n  <line x1=\"15.41\" y1=\"6.51\" x2=\"8.59\" y2=\"10.49\"></line>\n","share":"\n  <path d=\"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8\"></path>\n  <polyline points=\"16 6 12 2 8 6\"></polyline>\n  <line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"15\"></line>\n","shield":"\n  <path d=\"M12 22s8-4 8-10V4l-8-2-8 2v8c0 6 8 10 8 10z\"></path>\n","shopping-cart":"\n  <circle cx=\"8\" cy=\"21\" r=\"2\"></circle>\n  <circle cx=\"20\" cy=\"21\" r=\"2\"></circle>\n  <path d=\"M5.67 6H23l-1.68 8.39a2 2 0 0 1-2 1.61H8.75a2 2 0 0 1-2-1.74L5.23 2.74A2 2 0 0 0 3.25 1H1\"></path>\n","shuffle":"\n  <polyline points=\"16 3 21 3 21 8\"></polyline>\n  <line x1=\"4\" y1=\"20\" x2=\"21\" y2=\"3\"></line>\n  <polyline points=\"21 16 21 21 16 21\"></polyline>\n  <line x1=\"15\" y1=\"15\" x2=\"21\" y2=\"21\"></line>\n  <line x1=\"4\" y1=\"4\" x2=\"9\" y2=\"9\"></line>\n","sidebar":"\n  <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>\n  <line x1=\"9\" y1=\"3\" x2=\"9\" y2=\"21\"></line>\n","skip-back":"\n  <polygon points=\"19 20 9 12 19 4 19 20\"></polygon>\n  <line x1=\"5\" y1=\"19\" x2=\"5\" y2=\"5\"></line>\n","skip-forward":"\n  <polygon points=\"5 4 15 12 5 20 5 4\"></polygon>\n  <line x1=\"19\" y1=\"5\" x2=\"19\" y2=\"19\"></line>\n","slack":"\n  <path d=\"M22.08 9C19.81 1.41 16.54-.35 9 1.92S-.35 7.46 1.92 15 7.46 24.35 15 22.08 24.35 16.54 22.08 9z\"></path>\n  <line x1=\"12.57\" y1=\"5.99\" x2=\"16.15\" y2=\"16.39\"></line>\n  <line x1=\"7.85\" y1=\"7.61\" x2=\"11.43\" y2=\"18.01\"></line>\n  <line x1=\"16.39\" y1=\"7.85\" x2=\"5.99\" y2=\"11.43\"></line>\n  <line x1=\"18.01\" y1=\"12.57\" x2=\"7.61\" y2=\"16.15\"></line>\n","slash":"\n  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n  <line x1=\"4.93\" y1=\"4.93\" x2=\"19.07\" y2=\"19.07\"></line>\n","sliders":"\n  <line x1=\"4\" y1=\"21\" x2=\"4\" y2=\"14\"></line>\n  <line x1=\"4\" y1=\"10\" x2=\"4\" y2=\"3\"></line>\n  <line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"12\"></line>\n  <line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"3\"></line>\n  <line x1=\"20\" y1=\"21\" x2=\"20\" y2=\"16\"></line>\n  <line x1=\"20\" y1=\"12\" x2=\"20\" y2=\"3\"></line>\n  <line x1=\"1\" y1=\"14\" x2=\"7\" y2=\"14\"></line>\n  <line x1=\"9\" y1=\"8\" x2=\"15\" y2=\"8\"></line>\n  <line x1=\"17\" y1=\"16\" x2=\"23\" y2=\"16\"></line>\n","smartphone":"\n  <rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\" ry=\"2\"></rect>\n  <line x1=\"12\" y1=\"18\" x2=\"12\" y2=\"18\"></line>\n","speaker":"\n  <rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2\" ry=\"2\"></rect>\n  <circle cx=\"12\" cy=\"14\" r=\"4\"></circle>\n  <line x1=\"12\" y1=\"6\" x2=\"12\" y2=\"6\"></line>\n","square":"\n  <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>\n","star":"\n  <polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"></polygon>\n","stop-circle":"\n  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n  <rect x=\"9\" y=\"9\" width=\"6\" height=\"6\"></rect>\n","sun":"\n  <circle cx=\"12\" cy=\"12\" r=\"5\"></circle>\n  <line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"3\"></line>\n  <line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"23\"></line>\n  <line x1=\"4.22\" y1=\"4.22\" x2=\"5.64\" y2=\"5.64\"></line>\n  <line x1=\"18.36\" y1=\"18.36\" x2=\"19.78\" y2=\"19.78\"></line>\n  <line x1=\"1\" y1=\"12\" x2=\"3\" y2=\"12\"></line>\n  <line x1=\"21\" y1=\"12\" x2=\"23\" y2=\"12\"></line>\n  <line x1=\"4.22\" y1=\"19.78\" x2=\"5.64\" y2=\"18.36\"></line>\n  <line x1=\"18.36\" y1=\"5.64\" x2=\"19.78\" y2=\"4.22\"></line>\n","sunrise":"\n  <path d=\"M17 18a5 5 0 0 0-10 0\"></path>\n  <line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"9\"></line>\n  <line x1=\"4.22\" y1=\"10.22\" x2=\"5.64\" y2=\"11.64\"></line>\n  <line x1=\"1\" y1=\"18\" x2=\"3\" y2=\"18\"></line>\n  <line x1=\"21\" y1=\"18\" x2=\"23\" y2=\"18\"></line>\n  <line x1=\"18.36\" y1=\"11.64\" x2=\"19.78\" y2=\"10.22\"></line>\n  <line x1=\"23\" y1=\"22\" x2=\"1\" y2=\"22\"></line>\n  <polyline points=\"8 6 12 2 16 6\"></polyline>\n","sunset":"\n  <path d=\"M17 18a5 5 0 0 0-10 0\"></path>\n  <line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"2\"></line>\n  <line x1=\"4.22\" y1=\"10.22\" x2=\"5.64\" y2=\"11.64\"></line>\n  <line x1=\"1\" y1=\"18\" x2=\"3\" y2=\"18\"></line>\n  <line x1=\"21\" y1=\"18\" x2=\"23\" y2=\"18\"></line>\n  <line x1=\"18.36\" y1=\"11.64\" x2=\"19.78\" y2=\"10.22\"></line>\n  <line x1=\"23\" y1=\"22\" x2=\"1\" y2=\"22\"></line>\n  <polyline points=\"16 5 12 9 8 5\"></polyline>\n","tablet":"\n  <rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2\" ry=\"2\" transform=\"rotate(180 12 12)\"></rect>\n  <line x1=\"12\" y1=\"18\" x2=\"12\" y2=\"18\"></line>\n","tag":"\n  <path d=\"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z\"></path>\n  <line x1=\"7\" y1=\"7\" x2=\"7\" y2=\"7\"></line>\n","target":"\n  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n  <circle cx=\"12\" cy=\"12\" r=\"6\"></circle>\n  <circle cx=\"12\" cy=\"12\" r=\"2\"></circle>\n","thermometer":"\n  <path d=\"M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z\"></path>\n","thumbs-down":"\n  <path d=\"M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17\"></path>\n","thumbs-up":"\n  <path d=\"M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3\"></path>\n","toggle-left":"\n  <rect x=\"1\" y=\"5\" width=\"22\" height=\"14\" rx=\"7\" ry=\"7\"></rect>\n  <circle cx=\"8\" cy=\"12\" r=\"3\"></circle>\n","toggle-right":"\n  <rect x=\"1\" y=\"5\" width=\"22\" height=\"14\" rx=\"7\" ry=\"7\"></rect>\n  <circle cx=\"16\" cy=\"12\" r=\"3\"></circle>\n","trash-2":"\n  <polyline points=\"3 6 5 6 21 6\"></polyline>\n  <path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></path>\n  <line x1=\"10\" y1=\"11\" x2=\"10\" y2=\"17\"></line>\n  <line x1=\"14\" y1=\"11\" x2=\"14\" y2=\"17\"></line>\n","trash":"\n  <polyline points=\"3 6 5 6 21 6\"></polyline>\n  <path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></path>\n","trending-down":"\n  <polyline points=\"23 18 13.5 8.5 8.5 13.5 1 6\"></polyline>\n  <polyline points=\"17 18 23 18 23 12\"></polyline>\n","trending-up":"\n  <polyline points=\"23 6 13.5 15.5 8.5 10.5 1 18\"></polyline>\n  <polyline points=\"17 6 23 6 23 12\"></polyline>\n","triangle":"\n  <path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"></path>\n","tv":"\n  <rect x=\"2\" y=\"7\" width=\"20\" height=\"15\" rx=\"2\" ry=\"2\"></rect>\n  <polyline points=\"17 2 12 7 7 2\"></polyline>\n","twitter":"\n  <path d=\"M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z\"></path>\n","type":"\n  <polyline points=\"4 7 4 4 20 4 20 7\"></polyline>\n  <line x1=\"9\" y1=\"20\" x2=\"15\" y2=\"20\"></line>\n  <line x1=\"12\" y1=\"4\" x2=\"12\" y2=\"20\"></line>\n","umbrella":"\n  <path d=\"M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7\"></path>\n","underline":"\n  <path d=\"M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3\"></path>\n  <line x1=\"4\" y1=\"21\" x2=\"20\" y2=\"21\"></line>\n","unlock":"\n  <rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"></rect>\n  <path d=\"M7 11V7a5 5 0 0 1 9.9-1\"></path>\n","upload-cloud":"\n  <polyline points=\"16 16 12 12 8 16\"></polyline>\n  <line x1=\"12\" y1=\"12\" x2=\"12\" y2=\"21\"></line>\n  <path d=\"M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3\"></path>\n  <polyline points=\"16 16 12 12 8 16\"></polyline>\n","upload":"\n  <path d=\"M3 17v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3\"></path>\n  <polyline points=\"16 6 12 2 8 6\"></polyline>\n  <line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"16\"></line>\n","user-check":"\n  <path d=\"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path>\n  <circle cx=\"8.5\" cy=\"7\" r=\"4\"></circle>\n  <polyline points=\"17 11 19 13 23 9\"></polyline>\n","user-minus":"\n  <path d=\"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path>\n  <circle cx=\"8.5\" cy=\"7\" r=\"4\"></circle>\n  <line x1=\"23\" y1=\"11\" x2=\"17\" y2=\"11\"></line>\n","user-plus":"\n  <path d=\"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path>\n  <circle cx=\"8.5\" cy=\"7\" r=\"4\"></circle>\n  <line x1=\"20\" y1=\"8\" x2=\"20\" y2=\"14\"></line>\n  <line x1=\"23\" y1=\"11\" x2=\"17\" y2=\"11\"></line>\n","user-x":"\n  <path d=\"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path>\n  <circle cx=\"8.5\" cy=\"7\" r=\"4\"></circle>\n  <line x1=\"18\" y1=\"8\" x2=\"23\" y2=\"13\"></line>\n  <line x1=\"23\" y1=\"8\" x2=\"18\" y2=\"13\"></line>\n","user":"\n  <path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path>\n  <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>\n","users":"\n  <path d=\"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path>\n  <circle cx=\"9\" cy=\"7\" r=\"4\"></circle>\n  <path d=\"M23 21v-2a4 4 0 0 0-3-3.87\"></path>\n  <path d=\"M16 3.13a4 4 0 0 1 0 7.75\"></path>\n","video-off":"\n  <path d=\"M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10\"></path>\n  <line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>\n","video":"\n  <polygon points=\"23 7 16 12 23 17 23 7\"></polygon>\n  <rect x=\"1\" y=\"5\" width=\"15\" height=\"14\" rx=\"2\" ry=\"2\"></rect>\n","voicemail":"\n  <circle cx=\"5.5\" cy=\"11.5\" r=\"4.5\"></circle>\n  <circle cx=\"18.5\" cy=\"11.5\" r=\"4.5\"></circle>\n  <line x1=\"5.5\" y1=\"16\" x2=\"18.5\" y2=\"16\"></line>\n","volume-1":"\n  <polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon>\n  <path d=\"M15.54 8.46a5 5 0 0 1 0 7.07\"></path>\n","volume-2":"\n  <polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon>\n  <path d=\"M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07\"></path>\n","volume-x":"\n  <polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon>\n  <line x1=\"23\" y1=\"9\" x2=\"17\" y2=\"15\"></line>\n  <line x1=\"17\" y1=\"9\" x2=\"23\" y2=\"15\"></line>\n","volume":"\n  <polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon>\n","watch":"\n  <circle cx=\"12\" cy=\"12\" r=\"7\"></circle>\n  <polyline points=\"12 9 12 12 13.5 13.5\"></polyline>\n  <path d=\"M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83\"></path>\n","wifi-off":"\n  <line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>\n  <path d=\"M16.72 11.06A10.94 10.94 0 0 1 19 12.55\"></path>\n  <path d=\"M5 12.55a10.94 10.94 0 0 1 5.17-2.39\"></path>\n  <path d=\"M10.71 5.05A16 16 0 0 1 22.58 9\"></path>\n  <path d=\"M1.42 9a15.91 15.91 0 0 1 4.7-2.88\"></path>\n  <path d=\"M8.53 16.11a6 6 0 0 1 6.95 0\"></path>\n  <line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"20\"></line>\n","wifi":"\n  <path d=\"M5 12.55a11 11 0 0 1 14.08 0\"></path>\n  <path d=\"M1.42 9a16 16 0 0 1 21.16 0\"></path>\n  <path d=\"M8.53 16.11a6 6 0 0 1 6.95 0\"></path>\n  <line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"20\"></line>\n","wind":"\n  <path d=\"M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2\"></path>\n","x-circle":"\n  <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n  <line x1=\"15\" y1=\"9\" x2=\"9\" y2=\"15\"></line>\n  <line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"15\"></line>\n","x-square":"\n  <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>\n  <line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"15\"></line>\n  <line x1=\"15\" y1=\"9\" x2=\"9\" y2=\"15\"></line>\n","x":"\n  <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n  <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n","zap":"\n  <polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"></polygon>\n","zoom-in":"\n  <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n  <line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line>\n  <line x1=\"11\" y1=\"8\" x2=\"11\" y2=\"14\"></line>\n  <line x1=\"8\" y1=\"11\" x2=\"14\" y2=\"11\"></line>\n","zoom-out":"\n  <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\n  <line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line>\n  <line x1=\"8\" y1=\"11\" x2=\"14\" y2=\"11\"></line>\n"}

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = {"airplay":["stream"],"bell":["alarm","notification"],"settings":["cog","edit","gear","preferences"],"star":["bookmark"],"x":["cancel","close","delete","remove"]}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icons = __webpack_require__(27);

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create an SVG string.
 * @deprecated
 * @param {string} name
 * @param {Object} attrs
 * @returns {string}
 */
function toSvg(name) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  console.warn('feather.toSvg() is deprecated. Please use feather.icons[name].toSvg() instead.');

  if (!name) {
    throw new Error('The required `key` (icon name) parameter is missing.');
  }

  if (!_icons2.default[name]) {
    throw new Error('No icon matching \'' + name + '\'. See the complete list of icons at https://feathericons.com');
  }

  return _icons2.default[name].toSvg(attrs);
}

exports.default = toSvg;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-env browser */


var _dedupe = __webpack_require__(48);

var _dedupe2 = _interopRequireDefault(_dedupe);

var _icons = __webpack_require__(27);

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Replace all HTML elements that have a `data-feather` attribute with SVG markup
 * corresponding to the element's `data-feather` attribute value.
 * @param {Object} attrs
 */
function replace() {
  var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (typeof document === 'undefined') {
    throw new Error('`feather.replace()` only works in a browser environment.');
  }

  var elementsToReplace = document.querySelectorAll('[data-feather]');

  Array.from(elementsToReplace).forEach(function (element) {
    return replaceElement(element, attrs);
  });
}

/**
 * Replace a single HTML element with SVG markup
 * corresponding to the element's `data-feather` attribute value.
 * @param {HTMLElement} element
 * @param {Object} attrs
 */
function replaceElement(element) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var elementAttrs = getAttrs(element);
  var name = elementAttrs['data-feather'];
  delete elementAttrs['data-feather'];

  var svgString = _icons2.default[name].toSvg(_extends({}, attrs, elementAttrs, { class: (0, _dedupe2.default)(attrs.class, elementAttrs.class) }));
  var svgDocument = new DOMParser().parseFromString(svgString, 'image/svg+xml');
  var svgElement = svgDocument.querySelector('svg');

  element.parentNode.replaceChild(svgElement, element);
}

/**
 * Get the attributes of an HTML element.
 * @param {HTMLElement} element
 * @returns {Object}
 */
function getAttrs(element) {
  return Array.from(element.attributes).reduce(function (attrs, attr) {
    attrs[attr.name] = attr.value;
    return attrs;
  }, {});
}

exports.default = replace;

/***/ })
/******/ ]);
});
//# sourceMappingURL=feather.js.map