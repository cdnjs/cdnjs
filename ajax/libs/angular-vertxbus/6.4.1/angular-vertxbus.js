/*! angular-vertxbus - v6.4.1 - 2018-02-23
 * https://github.com/knalli/angular-vertxbus
 * Copyright (c) 2018 Jan Philipp
 * @license MIT */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vertx-eventbus"));
	else if(typeof define === 'function' && define.amd)
		define(["vertx-eventbus"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("vertx-eventbus")) : factory(root["EventBus"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_96__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 53);
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

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(61);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(24)('wks');
var uid = __webpack_require__(16);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(38);
var toPrimitive = __webpack_require__(25);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(13)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(69);
var defined = __webpack_require__(22);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var ctx = __webpack_require__(37);
var hide = __webpack_require__(10);
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var createDesc = __webpack_require__(17);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var moduleName = 'knalli.angular-vertxbus';

exports.moduleName = moduleName;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ }),
/* 16 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(40);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(44);
var enumBugKeys = __webpack_require__(30);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(88);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(92);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(40);

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
/* 22 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(24)('keys');
var uid = __webpack_require__(16);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(12);
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
/* 26 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(11);
var dPs = __webpack_require__(68);
var enumBugKeys = __webpack_require__(30);
var IE_PROTO = __webpack_require__(23)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(39)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(73).appendChild(iframe);
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
/* 29 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(6).f;
var has = __webpack_require__(5);
var TAG = __webpack_require__(4)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(4);


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(27);
var wksExt = __webpack_require__(32);
var defineProperty = __webpack_require__(6).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(22);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(5);
var toObject = __webpack_require__(35);
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(60);
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(13)(function () {
  return Object.defineProperty(__webpack_require__(39)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(64);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(77);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(66)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(42)(String, 'String', function (iterated) {
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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(27);
var $export = __webpack_require__(9);
var redefine = __webpack_require__(43);
var hide = __webpack_require__(10);
var has = __webpack_require__(5);
var Iterators = __webpack_require__(19);
var $iterCreate = __webpack_require__(67);
var setToStringTag = __webpack_require__(31);
var getPrototypeOf = __webpack_require__(36);
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(5);
var toIObject = __webpack_require__(8);
var arrayIndexOf = __webpack_require__(70)(false);
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(74);
var global = __webpack_require__(2);
var hide = __webpack_require__(10);
var Iterators = __webpack_require__(19);
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
/* 46 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(44);
var hiddenKeys = __webpack_require__(30).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(34);
var createDesc = __webpack_require__(17);
var toIObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(25);
var has = __webpack_require__(5);
var IE8_DOM_DEFINE = __webpack_require__(38);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseAdapter = function () {
  function BaseAdapter($q) {
    (0, _classCallCheck3.default)(this, BaseAdapter);

    this.$q = $q;
  }

  (0, _createClass3.default)(BaseAdapter, [{
    key: "configureConnection",
    value: function configureConnection() {}
  }, {
    key: "connect",
    value: function connect() {
      return this.$q.reject();
    }
  }, {
    key: "reconnect",
    value: function reconnect() {}
  }, {
    key: "close",
    value: function close() {}
  }, {
    key: "send",
    value: function send() {}
  }, {
    key: "publish",
    value: function publish() {}
  }, {
    key: "registerHandler",
    value: function registerHandler() {}
  }, {
    key: "unregisterHandler",
    value: function unregisterHandler() {}
  }, {
    key: "readyState",
    value: function readyState() {}
  }, {
    key: "getOptions",
    value: function getOptions() {
      return {};
    }

    // empty: can be overriden by externals

  }, {
    key: "onopen",
    value: function onopen() {}

    // empty: can be overriden by externals

  }, {
    key: "onclose",
    value: function onclose() {}

    // private

  }, {
    key: "getDefaultHeaders",
    value: function getDefaultHeaders() {
      return this.defaultHeaders;
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBus
     * @name .#applyDefaultHeaders
     *
     * @description
     * Stores the given default headers
     *
     * @param {object} headers additional standard headers
     */

  }, {
    key: "applyDefaultHeaders",
    value: function applyDefaultHeaders() {
      var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.defaultHeaders = angular.extend({}, headers);
    }

    // private

  }, {
    key: "getMergedHeaders",
    value: function getMergedHeaders() {
      var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return angular.extend({}, this.defaultHeaders, headers);
    }
  }]);
  return BaseAdapter;
}();

exports.default = BaseAdapter;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConnectionConfigHolder = function () {
  function ConnectionConfigHolder(_ref) {
    var urlServer = _ref.urlServer,
        urlPath = _ref.urlPath;
    (0, _classCallCheck3.default)(this, ConnectionConfigHolder);

    this._urlServer = urlServer;
    this._urlPath = urlPath;
  }

  (0, _createClass3.default)(ConnectionConfigHolder, [{
    key: "urlServer",
    get: function get() {
      return this._urlServer;
    }
  }, {
    key: "urlPath",
    get: function get() {
      return this._urlPath;
    }
  }]);
  return ConnectionConfigHolder;
}();

exports.default = ConnectionConfigHolder;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseDelegate = function () {
  function BaseDelegate() {
    (0, _classCallCheck3.default)(this, BaseDelegate);
  }

  (0, _createClass3.default)(BaseDelegate, [{
    key: "observe",
    value: function observe() {}
  }, {
    key: "getConnectionState",
    value: function getConnectionState() {
      return 3; // CLOSED
    }
  }, {
    key: "isConnectionOpen",
    value: function isConnectionOpen() {
      return false;
    }
  }, {
    key: "isAuthorized",
    value: function isAuthorized() {
      return false;
    }
  }, {
    key: "isEnabled",
    value: function isEnabled() {
      return false;
    }
  }, {
    key: "isConnected",
    value: function isConnected() {
      return false;
    }
  }, {
    key: "send",
    value: function send() {}
  }, {
    key: "publish",
    value: function publish() {}
  }]);
  return BaseDelegate;
}();

exports.default = BaseDelegate;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _module = __webpack_require__(54);

var _module2 = _interopRequireDefault(_module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _module2.default;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(14);

var _VertxEventBusWrapperProvider = __webpack_require__(55);

var _VertxEventBusWrapperProvider2 = _interopRequireDefault(_VertxEventBusWrapperProvider);

var _VertxEventBusServiceProvider = __webpack_require__(97);

var _VertxEventBusServiceProvider2 = _interopRequireDefault(_VertxEventBusServiceProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @ngdoc overview
 * @module knalli.angular-vertxbus
 * @name knalli.angular-vertxbus
 * @description
 *
 * Client side library using VertX Event Bus as an Angular Service module
 *
 * You have to define the module dependency, this module is named `knalli.angular-vertxbus`.
 *
 * <pre>
 *   angular.module('app', ['knalli.angular-vertxbus'])
 *     .controller('MyCtrl', function(vertxEventBus, vertxEventBusService) {
 *
 *       // using the EventBus directly
 *       vertxEventBus.send('my.address', {data: 123}, function (reply) {
 *         // your reply comes here
 *       });
 *
 *       // using the service
 *       vertxEventBusService.send('my.address', {data: 123}, {timeout: 500})
 *         .then(function (reply) {
 *           // your reply comes here
 *         })
 *         .catch(function (err) {
 *           // something went wrong, no connection, no login, timed out, or so
 *         });
 *     });
 * </pre>
 *
 * The module itself provides following components:
 * - {@link knalli.angular-vertxbus.vertxEventBus vertxEventBus}: a low level wrapper around `vertx.EventBus`
 * - {@link knalli.angular-vertxbus.vertxEventBusService vertxEventBusService}: a high level service around the wrapper
 *
 * While the wrapper only provides one single instance (even on reconnects), the service supports automatically
 * reconnect management, authorization and a clean promise based api.
 *
 * If you are looking for a low integration of `vertxbus.EventBus` as an AngularJS component, the wrapper will be your
 * choice. The only difference (and requirement for the wrapper actually) is how it will manage and replace the
 * underlying instance of the current `vertx.EventBus`.
 *
 * However, if you are looking for a simple, clean and promised based high api, the service is much better you.
 */
exports.default = angular.module(_config.moduleName, ['ng']).provider('vertxEventBus', _VertxEventBusWrapperProvider2.default).provider('vertxEventBusService', _VertxEventBusServiceProvider2.default).name;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EventBusAdapter = __webpack_require__(56);

var _EventBusAdapter2 = _interopRequireDefault(_EventBusAdapter);

var _NoopAdapter = __webpack_require__(95);

var _NoopAdapter2 = _interopRequireDefault(_NoopAdapter);

var _ConnectionConfigHolder = __webpack_require__(50);

var _ConnectionConfigHolder2 = _interopRequireDefault(_ConnectionConfigHolder);

var _vertxEventbus = __webpack_require__(96);

var _vertxEventbus2 = _interopRequireDefault(_vertxEventbus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @ngdoc service
 * @module knalli.angular-vertxbus
 * @name knalli.angular-vertxbus.vertxEventBusProvider
 * @description
 * An AngularJS wrapper for projects using the VertX Event Bus
 */

var DEFAULTS = {
  enabled: true,
  debugEnabled: false,
  initialConnectEnabled: true,
  urlServer: location.protocol + '//' + location.hostname + (function () {
    if (location.port) {
      return ':' + location.port;
    }
  }() || ''),
  urlPath: '/eventbus',
  reconnectEnabled: true,
  sockjsReconnectInterval: 10000,
  sockjsOptions: {}
};

var VertxEventBusWrapperProvider = function VertxEventBusWrapperProvider() {
  var _this = this;

  // options (globally, application-wide)
  var options = angular.extend({}, DEFAULTS);

  /**
   * @ngdoc method
   * @module knalli.angular-vertxbus
   * @methodOf knalli.angular-vertxbus.vertxEventBusProvider
   * @name .#enable
   *
   * @description
   * Enables or disables the service. This setup is immutable.
   *
   * @param {boolean} [value=true] service is enabled on startup
   * @returns {object} this
   */
  this.enable = function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULTS.enabled;

    options.enabled = value === true;
    return _this;
  };

  /**
   * @ngdoc method
   * @module knalli.angular-vertxbus
   * @methodOf knalli.angular-vertxbus.vertxEventBusProvider
   * @name .#disableAutoConnect
   *
   * @description
   * Disables the auto connection feature.
   *
   * This feature will be only available if `enable == true`.
   *
   * @param {boolean} [value=true] auto connect on startup
   * @returns {object} this
   */
  this.disableAutoConnect = function () {
    options.initialConnectEnabled = false;
    return _this;
  };

  /**
   * @ngdoc method
   * @module knalli.angular-vertxbus
   * @methodOf knalli.angular-vertxbus.vertxEventBusProvider
   * @name .#useDebug
   *
   * @description
   * Enables a verbose mode in which certain events will be logged to `$log`.
   *
   * @param {boolean} [value=false] verbose mode (using `$log`)
   * @returns {object} this
   */
  this.useDebug = function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULTS.debugEnabled;

    options.debugEnabled = value === true;
    return _this;
  };

  /**
   * @ngdoc method
   * @module knalli.angular-vertxbus
   * @methodOf knalli.angular-vertxbus.vertxEventBusProvider
   * @name .#useUrlServer
   *
   * @description
   * Overrides the url part "server" for connecting. The default is based on
   * - `location.protocol`
   * - `location.hostname`
   * - `location.port`
   *
   * i.e. `http://domain.tld` or `http://domain.tld:port`
   *
   * @param {boolean} [value=$computed] server to connect (default based on `location.protocol`, `location.hostname` and `location.port`)
   * @returns {object} this
   */
  this.useUrlServer = function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULTS.urlServer;

    options.urlServer = value;
    return _this;
  };

  /**
   * @ngdoc method
   * @module knalli.angular-vertxbus
   * @methodOf knalli.angular-vertxbus.vertxEventBusProvider
   * @name .#useUrlPath
   *
   * @description
   * Overrides the url part "path" for connection.
   *
   * @param {boolean} [value='/eventbus'] path to connect
   * @returns {object} this
   */
  this.useUrlPath = function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULTS.urlPath;

    options.urlPath = value;
    return _this;
  };

  /**
   * @ngdoc method
   * @module knalli.angular-vertxbus
   * @methodOf knalli.angular-vertxbus.vertxEventBusProvider
   * @name .#useReconnect
   *
   * @description
   * Enables or disables the automatic reconnect handling.
   *
   * @param {boolean} [value=true] if a disconnect was being noted, a reconnect will be enforced automatically
   * @returns {object} this
   */
  this.useReconnect = function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULTS.reconnectEnabled;

    options.reconnectEnabled = value;
    return _this;
  };

  /**
   * @ngdoc method
   * @module knalli.angular-vertxbus
   * @methodOf knalli.angular-vertxbus.vertxEventBusProvider
   * @name .#useSockJsReconnectInterval
   *
   * @description
   * Overrides the timeout for reconnecting after a disconnect was found.
   *
   * @param {boolean} [value=10000] time between a disconnect and the next try to reconnect (in ms)
   * @returns {object} this
   */
  this.useSockJsReconnectInterval = function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULTS.sockjsReconnectInterval;

    options.sockjsReconnectInterval = value;
    return _this;
  };

  /**
   * @ngdoc method
   * @module knalli.angular-vertxbus
   * @methodOf knalli.angular-vertxbus.vertxEventBusProvider
   * @name .#useSockJsOptions
   *
   * @description
   * Sets additional params for the `SockJS` instance.
   *
   * Internally, it will be applied (as `options`) like `new SockJS(url, undefined, options)`.
   *
   * @param {boolean} [value={}]  optional params for raw SockJS options
   * @returns {object} this
   */
  this.useSockJsOptions = function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULTS.sockjsOptions;

    options.sockjsOptions = value;
    return _this;
  };

  /**
   * @ngdoc service
   * @module knalli.angular-vertxbus
   * @name knalli.angular-vertxbus.vertxEventBus
   * @description
   * A stub representing the Vert.x EventBus (core functionality)
   *
   * Because the Event Bus cannot handle a reconnect (because of the underlaying SockJS), a
   * new instance of the bus have to be created.
   * This stub ensures only one object holding the current active instance of the bus.
   *
   * The stub supports theses Vert.x Event Bus APIs:
   *  - {@link knalli.angular-vertxbus.vertxEventBus#methods_close close()}
   *  - {@link knalli.angular-vertxbus.vertxEventBus#methods_send send(address, message, handler)}
   *  - {@link knalli.angular-vertxbus.vertxEventBus#methods_publish publish(address, message)}
   *  - {@link knalli.angular-vertxbus.vertxEventBus#methods_registerHandler registerHandler(adress, handler)}
   *  - {@link knalli.angular-vertxbus.vertxEventBus#methods_unregisterHandler unregisterHandler(address, handler)}
   *  - {@link knalli.angular-vertxbus.vertxEventBus#methods_readyState readyState()}
   *
   * Furthermore, the stub supports theses extra APIs:
   *  - {@link knalli.angular-vertxbus.vertxEventBus#methods_reconnect reconnect()}
   *
   * @requires $timeout
   * @requires $log
   */
  /* @ngInject */
  this.$get = function ($timeout, $log, $q) {
    // Current options (merged defaults with application-wide settings)
    var instanceOptions = angular.extend({}, DEFAULTS, options);
    if (instanceOptions.enabled && _vertxEventbus2.default) {
      if (instanceOptions.debugEnabled) {
        $log.debug('[Vert.x EB Stub] Enabled');
      }

      // aggregate server connection params
      instanceOptions.connectionConfig = new _ConnectionConfigHolder2.default({
        urlServer: instanceOptions.urlServer,
        urlPath: instanceOptions.urlPath
      });
      delete instanceOptions.urlServer;
      delete instanceOptions.urlPath;

      return new _EventBusAdapter2.default(_vertxEventbus2.default, $timeout, $log, $q, instanceOptions);
    } else {
      if (instanceOptions.debugEnabled) {
        $log.debug('[Vert.x EB Stub] Disabled');
      }
      return new _NoopAdapter2.default(_vertxEventbus2.default, $q);
    }
  };
  this.$get.$inject = ["$timeout", "$log", "$q"];
};

exports.default = VertxEventBusWrapperProvider;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(15);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(18);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _config = __webpack_require__(14);

var _BaseAdapter2 = __webpack_require__(49);

var _BaseAdapter3 = _interopRequireDefault(_BaseAdapter2);

var _ConnectionConfigHolder = __webpack_require__(50);

var _ConnectionConfigHolder2 = _interopRequireDefault(_ConnectionConfigHolder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @ngdoc service
 * @module global
 * @name global.EventBus
 *
 * @description
 * This is the interface of `EventBus`. It is not included.
 */

/**
 * @ngdoc method
 * @module global
 * @methodOf global.EventBus
 * @name .#close
 */

/**
 * @ngdoc method
 * @module global
 * @methodOf global.EventBus
 * @name .#send
 *
 * @param {string} address target address
 * @param {object} message payload message
 * @param {object=} headers headers
 * @param {function=} replyHandler optional callback
 * @param {function=} failureHandler optional callback
 */

/**
 * @ngdoc method
 * @module global
 * @methodOf global.EventBus
 * @name .#publish
 *
 * @param {string} address target address
 * @param {object} message payload message
 * @param {object=} headers headers
 */

/**
 * @ngdoc method
 * @module global
 * @methodOf global.EventBus
 * @name .#registerHandler
 *
 * @param {string} address target address
 * @param {function} handler callback handler
 * @param {object=} headers headers
 */

/**
 * @ngdoc method
 * @module global
 * @methodOf global.EventBus
 * @name .#unregisterHandler
 *
 * @param {string} address target address
 * @param {function} handler callback handler to be removed
 * @param {object=} headers headers
 */

/**
 * @ngdoc property
 * @module global
 * @propertyOf global.EventBus
 * @name .#onopen
 * @description
 * Defines the callback called on opening the connection.
 */

/**
 * @ngdoc property
 * @module global
 * @propertyOf global.EventBus
 * @name .#onclose
 * @description
 * Defines the callback called on closing the connection.
 */

/**
 * @ngdoc property
 * @module global
 * @propertyOf global.EventBus
 * @name .#onerror
 * @description
 * Defines the callback called on any error.
 */

/**
 * @ngdoc property
 * @module global
 * @propertyOf global.EventBus
 * @name .#onreconnect
 * @description
 * Defines the callback called on reconnecting the connection (after onopen).
 */

var EventBusAdapter = function (_BaseAdapter) {
  (0, _inherits3.default)(EventBusAdapter, _BaseAdapter);

  function EventBusAdapter(EventBus, $timeout, $log, $q, _ref) {
    var enabled = _ref.enabled,
        debugEnabled = _ref.debugEnabled,
        initialConnectEnabled = _ref.initialConnectEnabled,
        connectionConfig = _ref.connectionConfig,
        reconnectEnabled = _ref.reconnectEnabled,
        sockjsReconnectInterval = _ref.sockjsReconnectInterval,
        sockjsOptions = _ref.sockjsOptions;
    (0, _classCallCheck3.default)(this, EventBusAdapter);

    // actual EventBus type
    var _this = (0, _possibleConstructorReturn3.default)(this, (EventBusAdapter.__proto__ || (0, _getPrototypeOf2.default)(EventBusAdapter)).call(this, $q));

    _this.EventBus = EventBus;
    _this.$timeout = $timeout;
    _this.$log = $log;
    _this.$q = $q;
    _this.options = {
      enabled: enabled,
      debugEnabled: debugEnabled,
      initialConnectEnabled: initialConnectEnabled,
      connectionConfig: connectionConfig,
      reconnectEnabled: reconnectEnabled,
      sockjsReconnectInterval: sockjsReconnectInterval,
      sockjsOptions: sockjsOptions
    };
    _this.nativeReconnectAvailable = false;
    _this.disconnectTimeoutEnabled = true;
    _this.applyDefaultHeaders();
    if (initialConnectEnabled) {
      // asap create connection
      _this.connect();
    }
    return _this;
  }

  /**
   * @ngdoc method
   * @module knalli.angular-vertxbus
   * @methodOf knalli.angular-vertxbus.vertxEventBus
   * @name .#configureConnect
   *
   * @description
   * Reconfigure the connection details.
   *
   * @param {string} urlServer see {@link knalli.angular-vertxbus.vertxEventBusProvider#methods_useUrlServer vertxEventBusProvider.useUrlServer()}
   * @param {string} [urlPath=/eventbus] see {@link knalli.angular-vertxbus.vertxEventBusProvider#methods_useUrlPath vertxEventBusProvider.useUrlPath()}
   */


  (0, _createClass3.default)(EventBusAdapter, [{
    key: 'configureConnection',
    value: function configureConnection(urlServer) {
      var urlPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/eventbus';

      this.options.connectionConfig = new _ConnectionConfigHolder2.default({ urlServer: urlServer, urlPath: urlPath });
      return this;
    }
  }, {
    key: 'connect',
    value: function connect() {
      var _this2 = this;

      // connect promise
      var deferred = this.$q.defer();
      // currently valid url
      var url = '' + this.options.connectionConfig.urlServer + this.options.connectionConfig.urlPath;
      if (this.options.debugEnabled) {
        this.$log.debug('[Vert.x EB Stub] Enabled: connecting \'' + url + '\'');
      }
      // Because we have rebuild an EventBus object (because it have to rebuild a SockJS object)
      // we must wrap the object. Therefore, we have to mimic the behavior of onopen and onclose each time.
      this.instance = new this.EventBus(url, this.options.sockjsOptions);
      // Since vertx-eventbus 3.5.0 support for "native" reconnect is available
      this.nativeReconnectAvailable = typeof this.instance.enableReconnect === 'function';
      if (this.nativeReconnectAvailable && this.options.reconnectEnabled) {
        this.instance.enableReconnect(true);
      }
      this.instance.onopen = function () {
        if (_this2.options.debugEnabled) {
          _this2.$log.debug('[Vert.x EB Stub] Connected');
        }
        if (angular.isFunction(_this2.onopen)) {
          _this2.onopen();
        }
        deferred.resolve();
      };
      // instance onClose handler
      this.instance.onclose = function () {
        // Since vertx-eventbus@3.5.0, the EventBus itself can handle reconnects
        if (_this2.nativeReconnectAvailable && _this2.instance.reconnectTimerID) {
          // 'reconnectTimerID' will be only set if reconnect is enabled
          if (_this2.options.debugEnabled) {
            _this2.$log.debug('[Vert.x EB Stub] Reconnect required, but seems to be handled by EventBus itself');
          }
          return;
        }
        if (_this2.options.debugEnabled) {
          _this2.$log.debug('[Vert.x EB Stub] Reconnect in ' + _this2.options.sockjsReconnectInterval + 'ms');
        }
        if (angular.isFunction(_this2.onclose)) {
          _this2.onclose();
        }
        _this2.instance = undefined;

        if (!_this2.disconnectTimeoutEnabled) {
          // reconnect required asap
          if (_this2.options.debugEnabled) {
            _this2.$log.debug('[Vert.x EB Stub] Reconnect immediately');
          }
          _this2.disconnectTimeoutEnabled = true;
          _this2.connect();
        } else if (_this2.options.reconnectEnabled) {
          // automatic reconnect after timeout
          if (_this2.options.debugEnabled) {
            _this2.$log.debug('[Vert.x EB Stub] Reconnect in ' + _this2.options.sockjsReconnectInterval + 'ms');
          }
          _this2.$timeout(function () {
            return _this2.connect();
          }, _this2.options.sockjsReconnectInterval);
        }
      };
      // instance onError handler
      this.instance.onerror = function (message) {
        if (angular.isFunction(_this2.onerror)) {
          _this2.onerror(message);
        }
      };
      // instance onReconnect handler
      this.instance.onreconnect = function (message) {
        if (angular.isFunction(_this2.onreconnect)) {
          _this2.onreconnect(message);
        }
      };
      return deferred.promise;
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBus
     * @name .#reconnect
     *
     * @description
     * Reconnects the underlying connection.
     *
     * Unless a connection is open, it will connect using a new one.
     *
     * If a connection is already open, it will close this one and opens a new one. If `immediately` is `true`, the
     * default timeout for reconnect will be skipped.
     *
     * @param {boolean} [immediately=false] optionally enforce a reconnect asap instead of using the timeout
     */

  }, {
    key: 'reconnect',
    value: function reconnect() {
      var immediately = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.instance && this.instance.state === this.EventBus.OPEN) {
        if (immediately) {
          this.disconnectTimeoutEnabled = false;
        }
        this.instance.close();
      } else {
        this.connect();
      }
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBus
     * @name .#close
     *
     * @description
     * Closes the underlying connection.
     *
     * Note: If automatic reconnection is active, a new connection will be established after the {@link knalli.angular-vertxbus.vertxEventBusProvider#methods_useReconnect reconnect timeout}.
     *
     * See also:
     * - {@link EventBus#methods_close EventBus.close()}
     */

  }, {
    key: 'close',
    value: function close() {
      if (this.instance) {
        this.instance.close();
      }
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBus
     * @name .#send
     *
     * @description
     * Sends a message
     *
     * See also:
     * - {@link global.EventBus#methods_send EventBus.send()}
     *
     * @param {string} address target address
     * @param {object} message payload message
     * @param {object} headers optional headers
     * @param {function=} replyHandler optional callback
     */

  }, {
    key: 'send',
    value: function send(address, message, headers, replyHandler) {
      if (this.instance) {
        var mergedHeaders = this.getMergedHeaders(headers);
        this.instance.send(address, message, mergedHeaders, replyHandler);
      }
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBus
     * @name .#publish
     *
     * @description
     * Publishes a message
     *
     * See also:
     * - {@link global.EventBus#methods_publish EventBus.publish()}
     *
     * @param {string} address target address
     * @param {object} message payload message
     * @param {object=} headers optional headers
     */

  }, {
    key: 'publish',
    value: function publish(address, message, headers) {
      if (this.instance) {
        var mergedHeaders = this.getMergedHeaders(headers);
        this.instance.publish(address, message, mergedHeaders);
      }
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBus
     * @name .#registerHandler
     *
     * @description
     * Registers a listener
     *
     * See also:
     * - {@link global.EventBus#methods_registerHandler EventBus.registerHandler()}
     *
     * @param {string} address target address
     * @param {object=} headers optional headers
     * @param {function} handler callback handler
     */

  }, {
    key: 'registerHandler',
    value: function registerHandler(address, headers, handler) {
      var _this3 = this;

      if (this.instance) {
        if (angular.isFunction(headers) && !handler) {
          handler = headers;
          headers = undefined;
        }
        var mergedHeaders = this.getMergedHeaders(headers);
        this.instance.registerHandler(address, mergedHeaders, handler);
        // and return the deregister callback
        var deconstructor = function deconstructor() {
          _this3.unregisterHandler(address, mergedHeaders, handler);
        };
        deconstructor.displayName = _config.moduleName + '.wrapper.eventbus.registerHandler.deconstructor';
        return deconstructor;
      }
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBus
     * @name .#unregisterHandler
     *
     * @description
     * Removes a registered a listener
     *
     * See also:
     * - {@link global.EventBus#methods_unregisterHandler EventBus.unregisterHandler()}
     *
     * @param {string} address target address
     * @param {object=} headers optional headers
     * @param {function} handler callback handler to be removed
     */

  }, {
    key: 'unregisterHandler',
    value: function unregisterHandler(address, headers, handler) {
      if (this.instance && this.instance.state === this.EventBus.OPEN) {
        if (angular.isFunction(headers) && !handler) {
          handler = headers;
          headers = undefined;
        }
        var mergedHeaders = this.getMergedHeaders(headers);
        this.instance.unregisterHandler(address, mergedHeaders, handler);
      }
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBus
     * @name .#readyState
     *
     * @description
     * Returns the current connection state
     *
     * @returns {number} value of vertx-eventbus connection states
     */

  }, {
    key: 'readyState',
    value: function readyState() {
      if (this.instance) {
        return this.instance.state;
      } else {
        return this.EventBus.CLOSED;
      }
    }
  }, {
    key: 'getOptions',


    // private
    value: function getOptions() {
      // clone options
      return angular.extend({}, this.options);
    }
  }, {
    key: 'state',
    get: function get() {
      return this.readyState();
    }
  }]);
  return EventBusAdapter;
}(_BaseAdapter3.default);

exports.default = EventBusAdapter;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(58);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(35);
var $getPrototypeOf = __webpack_require__(36);

__webpack_require__(59)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(9);
var core = __webpack_require__(0);
var fails = __webpack_require__(13);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(62), __esModule: true };

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(63);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(9);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(6).f });


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41);
__webpack_require__(45);
module.exports = __webpack_require__(32).f('iterator');


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var defined = __webpack_require__(22);
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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(28);
var descriptor = __webpack_require__(17);
var setToStringTag = __webpack_require__(31);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(10)(IteratorPrototype, __webpack_require__(4)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var anObject = __webpack_require__(11);
var getKeys = __webpack_require__(20);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(29);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(8);
var toLength = __webpack_require__(71);
var toAbsoluteIndex = __webpack_require__(72);
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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(26);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(75);
var step = __webpack_require__(76);
var Iterators = __webpack_require__(19);
var toIObject = __webpack_require__(8);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(42)(Array, 'Array', function (iterated, kind) {
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
/* 75 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(78), __esModule: true };

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(79);
__webpack_require__(85);
__webpack_require__(86);
__webpack_require__(87);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(5);
var DESCRIPTORS = __webpack_require__(7);
var $export = __webpack_require__(9);
var redefine = __webpack_require__(43);
var META = __webpack_require__(80).KEY;
var $fails = __webpack_require__(13);
var shared = __webpack_require__(24);
var setToStringTag = __webpack_require__(31);
var uid = __webpack_require__(16);
var wks = __webpack_require__(4);
var wksExt = __webpack_require__(32);
var wksDefine = __webpack_require__(33);
var keyOf = __webpack_require__(81);
var enumKeys = __webpack_require__(82);
var isArray = __webpack_require__(83);
var anObject = __webpack_require__(11);
var toIObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(25);
var createDesc = __webpack_require__(17);
var _create = __webpack_require__(28);
var gOPNExt = __webpack_require__(84);
var $GOPD = __webpack_require__(48);
var $DP = __webpack_require__(6);
var $keys = __webpack_require__(20);
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
  __webpack_require__(47).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(34).f = $propertyIsEnumerable;
  __webpack_require__(46).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(27)) {
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
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(16)('meta');
var isObject = __webpack_require__(12);
var has = __webpack_require__(5);
var setDesc = __webpack_require__(6).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(13)(function () {
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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(20);
var toIObject = __webpack_require__(8);
module.exports = function (object, el) {
  var O = toIObject(object);
  var keys = getKeys(O);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) if (O[key = keys[index++]] === el) return key;
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(20);
var gOPS = __webpack_require__(46);
var pIE = __webpack_require__(34);
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
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(29);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(8);
var gOPN = __webpack_require__(47).f;
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
/* 85 */
/***/ (function(module, exports) {



/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('asyncIterator');


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('observable');


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(90);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(9);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(91).set });


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(12);
var anObject = __webpack_require__(11);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(37)(Function.call, __webpack_require__(48).f(Object.prototype, '__proto__').set, 2);
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
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(94);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(9);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(28) });


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(15);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(18);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseAdapter2 = __webpack_require__(49);

var _BaseAdapter3 = _interopRequireDefault(_BaseAdapter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NoopAdapter = function (_BaseAdapter) {
  (0, _inherits3.default)(NoopAdapter, _BaseAdapter);

  function NoopAdapter(EventBus, $q) {
    (0, _classCallCheck3.default)(this, NoopAdapter);

    // actual EventBus type
    var _this = (0, _possibleConstructorReturn3.default)(this, (NoopAdapter.__proto__ || (0, _getPrototypeOf2.default)(NoopAdapter)).call(this, $q));

    _this.EventBus = EventBus;
    return _this;
  }

  return NoopAdapter;
}(_BaseAdapter3.default);

exports.default = NoopAdapter;

/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_96__;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EventBusDelegate = __webpack_require__(98);

var _EventBusDelegate2 = _interopRequireDefault(_EventBusDelegate);

var _NoopDelegate = __webpack_require__(105);

var _NoopDelegate2 = _interopRequireDefault(_NoopDelegate);

var _Delegator = __webpack_require__(106);

var _Delegator2 = _interopRequireDefault(_Delegator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @ngdoc service
 * @module knalli.angular-vertxbus
 * @name knalli.angular-vertxbus.vertxEventBusServiceProvider
 * @description
 * This is the configuration provider for {@link knalli.angular-vertxbus.vertxEventBusService}.
 */

var DEFAULTS = {
  enabled: true,
  debugEnabled: false,
  authRequired: false,
  prefix: 'vertx-eventbus.',
  sockjsStateInterval: 10000,
  messageBuffer: 10000
};

var VertxEventBusServiceProvider = function VertxEventBusServiceProvider() {
  var _this = this;

  // options (globally, application-wide)
  var options = angular.extend({}, DEFAULTS);

  /**
   * @ngdoc method
   * @module knalli.angular-vertxbus
   * @methodOf knalli.angular-vertxbus.vertxEventBusServiceProvider
   * @name .#enable
   *
   * @description
   * Enables or disables the service. This setup is immutable.
   *
   * @param {boolean} [value=true] service is enabled on startup
   * @returns {object} this
   */
  this.enable = function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULTS.enabled;

    options.enabled = value === true;
    return _this;
  };

  /**
   * @ngdoc method
   * @module knalli.angular-vertxbus
   * @methodOf knalli.angular-vertxbus.vertxEventBusServiceProvider
   * @name .#useDebug
   *
   * @description
   * Enables a verbose mode in which certain events will be logged to `$log`.
   *
   * @param {boolean} [value=false] verbose mode (using `$log`)
   * @returns {object} this
   */
  this.useDebug = function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULTS.debugEnabled;

    options.debugEnabled = value === true;
    return _this;
  };

  /**
   * @ngdoc method
   * @module knalli.angular-vertxbus
   * @methodOf knalli.angular-vertxbus.vertxEventBusServiceProvider
   * @name .#usePrefix
   *
   * @description
   * Overrides the default prefix which will be used for emitted events.
   *
   * @param {string} [value='vertx-eventbus.'] prefix used in event names
   * @returns {object} this
   */
  this.usePrefix = function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULTS.prefix;

    options.prefix = value;
    return _this;
  };

  /**
   * @ngdoc method
   * @methodOf knalli.angular-vertxbus.vertxEventBusServiceProvider
   * @name .#useSockJsStateInterval
   *
   *
   * @description
   * Overrides the interval of checking the connection is still valid (required for reconnecting automatically).
   *
   * @param {boolean} [value=10000] interval of checking the underlying connection's state (in ms)
   * @returns {object} this
   */
  this.useSockJsStateInterval = function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULTS.sockjsStateInterval;

    options.sockjsStateInterval = value;
    return _this;
  };

  /**
   * @ngdoc method
   * @methodOf knalli.angular-vertxbus.vertxEventBusServiceProvider
   * @name .#useMessageBuffer
   *
   * @description
   * Enables buffering of (sending) messages.
   *
   * The setting defines the total amount of buffered messages (`0` no buffering). A message will be buffered if
   * connection is still in progress, the connection is stale or a login is required/pending.
   *
   * @param {boolean} [value=0] allowed total amount of messages in the buffer
   * @returns {object} this
   */
  this.useMessageBuffer = function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULTS.messageBuffer;

    options.messageBuffer = value;
    return _this;
  };

  /**
   * @ngdoc method
   * @module knalli.angular-vertxbus
   * @methodOf knalli.angular-vertxbus.vertxEventBusServiceProvider
   * @name .#authHandler
   *
   * @description
   * Function or service reference name for function checking the authorization state.
   *
   * The result of the function must be a boolean or promise. The handler can (but is not required) to create authorization on demand.
   * If it is resolved, the authorization is valid.
   * If it is rejected, the authorization is invalid.
   *
   * @param {string|function} value authorization handler (either a function or a service name)
   * @returns {object} promise
   */
  this.authHandler = function (value) {
    options.authHandler = value;
    options.authRequired = !!value;
    return _this;
  };

  /**
   * @ngdoc service
   * @module knalli.angular-vertxbus
   * @name knalli.angular-vertxbus.vertxEventBusService
   * @description
   * A service utilizing an underlying Vert.x Event Bus
   *
   * The advanced features of this service are:
   *  - broadcasting the connection changes (vertx-eventbus.system.connected, vertx-eventbus.system.disconnected) on $rootScope
   *  - registering all handlers again when a reconnect had been required
   *  - supporting a promise when using send()
   *  - adding aliases on (registerHandler), un (unregisterHandler) and emit (publish)
   *
   * Basic usage:
   * <pre>
   * module.controller('MyController', function('vertxEventService') {
  *   vertxEventService.on('my.address', function(message) {
  *     console.log("JSON Message received: ", message)
  *   });
  *   vertxEventService.publish('my.other.address', {type: 'foo', data: 'bar'});
  * });
   * </pre>
   *
   * Note the additional {@link knalli.angular-vertxbus.vertxEventBusServiceProvider configuration} of the module itself.
   *
   * @requires knalli.angular-vertxbus.vertxEventBus
   * @requires $rootScope
   * @requires $q
   * @requires $interval
   * @requires $log
   * @requires $injector
   */
  /* @ngInject */
  this.$get = function ($rootScope, $q, $interval, vertxEventBus, $log, $injector) {
    // Current options (merged defaults with application-wide settings)
    var instanceOptions = angular.extend({}, vertxEventBus.getOptions(), options);
    if (instanceOptions.enabled) {
      return new _Delegator2.default(new _EventBusDelegate2.default($rootScope, $interval, $log, $q, $injector, vertxEventBus, instanceOptions), $log);
    } else {
      return new _Delegator2.default(new _NoopDelegate2.default());
    }
  };
  this.$get.$inject = ["$rootScope", "$q", "$interval", "vertxEventBus", "$log", "$injector"];
};

exports.default = VertxEventBusServiceProvider;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = __webpack_require__(51);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _getPrototypeOf = __webpack_require__(15);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(18);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _config = __webpack_require__(14);

var _Queue = __webpack_require__(103);

var _Queue2 = _interopRequireDefault(_Queue);

var _SimpleMap = __webpack_require__(104);

var _SimpleMap2 = _interopRequireDefault(_SimpleMap);

var _BaseDelegate2 = __webpack_require__(52);

var _BaseDelegate3 = _interopRequireDefault(_BaseDelegate2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @ngdoc event
 * @module knalli.angular-vertxbus
 * @eventOf knalli.angular-vertxbus.vertxEventBusService
 * @eventType broadcast on $rootScope
 * @name disconnected
 *
 * @description
 * After a connection was being terminated.
 *
 * Event name is `prefix + 'system.disconnected'` (see {@link knalli.angular-vertxbus.vertxEventBusServiceProvider#methods_usePrefix prefix})
 */

/**
 * @ngdoc event
 * @module knalli.angular-vertxbus
 * @eventOf knalli.angular-vertxbus.vertxEventBusService
 * @eventType broadcast on $rootScope
 * @name connected
 *
 * @description
 * After a connection was being established
 *
 * Event name is `prefix + 'system.connected'` (see {@link knalli.angular-vertxbus.vertxEventBusServiceProvider#methods_usePrefix prefix})
 */

/**
 * @ngdoc event
 * @module knalli.angular-vertxbus
 * @eventOf knalli.angular-vertxbus.vertxEventBusService
 * @eventType broadcast on $rootScope
 * @name reconnected
 *
 * @description
 * After a connection was being re-established
 *
 * Event name is `prefix + 'system.reconnected'` (see {@link knalli.angular-vertxbus.vertxEventBusServiceProvider#methods_usePrefix prefix})
 */

/**
 * @ngdoc event
 * @module knalli.angular-vertxbus
 * @eventOf knalli.angular-vertxbus.vertxEventBusService
 * @eventType broadcast on $rootScope
 * @name login-succeeded
 *
 * @description
 * After a login has been validated successfully
 *
 * Event name is `prefix + 'system.login.succeeded'` (see {@link knalli.angular-vertxbus.vertxEventBusServiceProvider#methods_usePrefix prefix})
 *
 * @param {object} data data
 * @param {boolean} data.status must be `'ok'`
 */

/**
 * @ngdoc event
 * @module knalli.angular-vertxbus
 * @eventOf knalli.angular-vertxbus.vertxEventBusService
 * @eventType broadcast on $rootScope
 * @name login-failed
 *
 * @description
 * After a login has been destroyed or was invalidated
 *
 * Event name is `prefix + 'system.login.failed'` (see {@link knalli.angular-vertxbus.vertxEventBusServiceProvider#methods_usePrefix prefix})
 *
 * @param {object} data data
 * @param {boolean} data.status must be not`'ok'`
 */

var EventBusDelegate = function (_BaseDelegate) {
  (0, _inherits3.default)(EventBusDelegate, _BaseDelegate);

  function EventBusDelegate($rootScope, $interval, $log, $q, $injector, eventBus, _ref) {
    var enabled = _ref.enabled,
        debugEnabled = _ref.debugEnabled,
        prefix = _ref.prefix,
        sockjsStateInterval = _ref.sockjsStateInterval,
        messageBuffer = _ref.messageBuffer,
        authRequired = _ref.authRequired,
        authHandler = _ref.authHandler;
    (0, _classCallCheck3.default)(this, EventBusDelegate);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EventBusDelegate.__proto__ || (0, _getPrototypeOf2.default)(EventBusDelegate)).call(this));

    _this.$rootScope = $rootScope;
    _this.$interval = $interval;
    _this.$log = $log;
    _this.$q = $q;
    _this.eventBus = eventBus;
    _this.options = {
      enabled: enabled,
      debugEnabled: debugEnabled,
      prefix: prefix,
      sockjsStateInterval: sockjsStateInterval,
      messageBuffer: messageBuffer,
      authRequired: authRequired
    };
    if (angular.isFunction(authHandler)) {
      _this.authHandler = authHandler;
    } else if (angular.isString(authHandler)) {
      try {
        _this.authHandler = $injector.get(authHandler);
      } catch (e) {
        if (_this.options.debugEnabled) {
          _this.$log.debug('[Vert.x EB Service] Failed to resolve authHandler: %s', e.message);
        }
      }
    }
    _this.connectionState = _this.eventBus.EventBus.CLOSED;
    _this.states = {
      connected: false,
      authorized: false
    };
    _this.observers = [];
    // internal store of buffered messages
    _this.messageQueue = new _Queue2.default(_this.options.messageBuffer);
    // internal map of callbacks
    _this.callbackMap = new _SimpleMap2.default();
    // asap
    _this.initialize();
    return _this;
  }

  // internal


  (0, _createClass3.default)(EventBusDelegate, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.eventBus.onopen = function () {
        return _this2.onEventbusOpen();
      };
      this.eventBus.onclose = function () {
        return _this2.onEventbusClose();
      };
      this.eventBus.onreconnect = function () {
        return _this2.onEventbusReconnect();
      };

      // Update the current connection state periodically.
      var connectionIntervalCheck = function connectionIntervalCheck() {
        return _this2.getConnectionState(true);
      };
      connectionIntervalCheck.displayName = 'connectionIntervalCheck';
      this.$interval(function () {
        return connectionIntervalCheck();
      }, this.options.sockjsStateInterval);
    }

    // internal

  }, {
    key: 'onEventbusOpen',
    value: function onEventbusOpen() {
      var connectionStateFlipped = false;
      this.getConnectionState(true);
      if (!this.states.connected) {
        this.states.connected = true;
        connectionStateFlipped = true;
      }
      // Ensure all events will be re-attached
      this.afterEventbusConnected();
      // Everything is online and registered again, let's notify everybody
      if (connectionStateFlipped) {
        this.$rootScope.$broadcast(this.options.prefix + 'system.connected');
      }
      this.$rootScope.$digest(); // explicitly
      // consume message queue?
      if (this.options.messageBuffer && this.messageQueue.size()) {
        while (this.messageQueue.size()) {
          var fn = this.messageQueue.first();
          if (angular.isFunction(fn)) {
            fn();
          }
        }
        this.$rootScope.$digest();
      }
    }

    // internal

  }, {
    key: 'onEventbusClose',
    value: function onEventbusClose() {
      this.getConnectionState(true);
      if (this.states.connected) {
        this.states.connected = false;
        this.$rootScope.$broadcast(this.options.prefix + 'system.disconnected');
      }
    }

    // internal

  }, {
    key: 'onEventbusReconnect',
    value: function onEventbusReconnect() {
      // will be fired after a onEventbusOpen
      if (this.states.connected) {
        this.$rootScope.$broadcast(this.options.prefix + 'system.reconnected');
      }
    }

    // internal

  }, {
    key: 'observe',
    value: function observe(observer) {
      this.observers.push(observer);
    }

    // internal

  }, {
    key: 'afterEventbusConnected',
    value: function afterEventbusConnected() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(this.observers), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var observer = _step.value;

          if (angular.isFunction(observer.afterEventbusConnected)) {
            observer.afterEventbusConnected();
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
  }, {
    key: 'registerHandler',
    value: function registerHandler(address, headers, callback) {
      var _this3 = this;

      if (angular.isFunction(headers) && !callback) {
        callback = headers;
        headers = undefined;
      }
      if (!angular.isFunction(callback)) {
        return;
      }
      if (this.options.debugEnabled) {
        this.$log.debug('[Vert.x EB Service] Register handler for ' + address);
      }
      var callbackWrapper = function callbackWrapper(err, _ref2, replyTo) {
        var body = _ref2.body;

        callback(body, replyTo);
        _this3.$rootScope.$digest();
      };
      callbackWrapper.displayName = _config.moduleName + '.service.delegate.live.registerHandler.callbackWrapper';
      this.callbackMap.put(callback, callbackWrapper);
      return this.eventBus.registerHandler(address, headers, callbackWrapper);
    }
  }, {
    key: 'unregisterHandler',
    value: function unregisterHandler(address, headers, callback) {
      if (angular.isFunction(headers) && !callback) {
        callback = headers;
        headers = undefined;
      }
      if (!angular.isFunction(callback)) {
        return;
      }
      if (this.options.debugEnabled) {
        this.$log.debug('[Vert.x EB Service] Unregister handler for ' + address);
      }
      this.eventBus.unregisterHandler(address, headers, this.callbackMap.get(callback));
      this.callbackMap.remove(callback);
    }
  }, {
    key: 'send',
    value: function send(address, message, headers) {
      var _this4 = this;

      var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10000;
      var expectReply = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

      var deferred = this.$q.defer();
      var next = function next() {
        if (expectReply) {
          // Register timeout for promise rejecting
          var timer = _this4.$interval(function () {
            if (_this4.options.debugEnabled) {
              _this4.$log.debug('[Vert.x EB Service] send(\'' + address + '\') timed out');
            }
            deferred.reject();
          }, timeout, 1);
          // Send message
          try {
            _this4.eventBus.send(address, message, headers, function (err, reply) {
              _this4.$interval.cancel(timer); // because it's resolved
              if (err) {
                deferred.reject(err);
              } else {
                deferred.resolve(reply);
              }
            });
          } catch (e) {
            _this4.$interval.cancel(timer); // because it's resolved
            deferred.reject(e);
          }
        } else {
          try {
            _this4.eventBus.send(address, message, headers);
            deferred.resolve();
          } catch (e) {
            deferred.reject(e);
          }
        }
      };
      next.displayName = _config.moduleName + '.service.delegate.live.send.next';
      this.ensureOpenAuthConnection(next).then(null, deferred.reject);
      return deferred.promise;
    }
  }, {
    key: 'publish',
    value: function publish(address, message, headers) {
      var _this5 = this;

      return this.ensureOpenAuthConnection(function () {
        return _this5.eventBus.publish(address, message, headers);
      });
    }

    /**
     * Ensures the callback will be performed with an open connection.
     *
     * Unless an open connection was found, the callback will be queued in the message buffer (if available).
     *
     * @param {function} fn callback
     * @returns {object} promise (resolved on either performed or queued)
     */

  }, {
    key: 'ensureOpenConnection',
    value: function ensureOpenConnection(fn) {
      var deferred = this.$q.defer();
      if (this.isConnectionOpen()) {
        try {
          fn();
        } catch (e) {
          deferred.reject(e);
        }
        deferred.resolve({
          inQueue: false
        });
      } else if (this.options.messageBuffer) {
        this.messageQueue.push(fn);
        deferred.resolve({
          inQueue: true
        });
      } else {
        deferred.reject();
      }
      return deferred.promise;
    }

    /**
     * Ensures the callback will be performed with a valid session.
     *
     * Unless `authRequired` is enabled, this will be simple forward.
     *
     * Unless a valid session exist (but required), the callback will be not invoked.
     *
     * @param {function} fn callback
     * @returns {object} promise (resolved on either performed or queued)
     */

  }, {
    key: 'ensureOpenAuthConnection',
    value: function ensureOpenAuthConnection(fn) {
      var _this6 = this;

      if (!this.options.authRequired) {
        // easy: no login required
        return this.ensureOpenConnection(fn);
      } else {
        var fnWrapper = function fnWrapper() {
          if (_this6.authHandler) {
            var onValidAuth = function onValidAuth() {
              _this6.states.authorized = true;
              fn();
            };
            var onInvalidAuth = function onInvalidAuth() {
              _this6.states.authorized = false;
              if (_this6.options.debugEnabled) {
                _this6.$log.debug('[Vert.x EB Service] Message was not sent due authHandler rejected');
              }
            };
            var authResult = _this6.authHandler(_this6.eventBus);
            if (!(authResult && angular.isFunction(authResult.then))) {
              if (_this6.options.debugEnabled) {
                _this6.$log.debug('[Vert.x EB Service] Message was not sent because authHandler is returning not a promise');
              }
              return false;
            }
            authResult.then(onValidAuth, onInvalidAuth);
            return true;
          } else {
            // ignore this message
            if (_this6.options.debugEnabled) {
              _this6.$log.debug('[Vert.x EB Service] Message was not sent because no authHandler is defined');
            }
            return false;
          }
        };
        fnWrapper.displayName = _config.moduleName + '.service.delegate.live.ensureOpenAuthConnection.fnWrapper';
        return this.ensureOpenConnection(fnWrapper);
      }
    }

    /**
     * Returns the current connection state. The state is being cached internally.
     *
     * @param {boolean=} [immediate=false] if true, the connection state will be queried directly.
     * @returns {number} state type of vertx.EventBus
     */

  }, {
    key: 'getConnectionState',
    value: function getConnectionState(immediate) {
      if (this.options.enabled) {
        if (immediate) {
          this.connectionState = this.eventBus.state;
        }
      } else {
        this.connectionState = this.eventBus.EventBus.CLOSED;
      }
      return this.connectionState;
    }

    /**
     * Returns true if the current connection state ({@link knalli.angular-vertxbus.vertxEventBusService#methods_getConnectionState getConnectionState()}) is `OPEN`.
     *
     * @returns {boolean} connection open state
     */

  }, {
    key: 'isConnectionOpen',
    value: function isConnectionOpen() {
      return this.getConnectionState() === this.eventBus.EventBus.OPEN;
    }

    /**
     * Returns true if the session is valid
     *
     * @returns {boolean} state
     */

  }, {
    key: 'isAuthorized',
    value: function isAuthorized() {
      return this.states.authorized;
    }

    // internal

  }, {
    key: 'isConnected',
    value: function isConnected() {
      return this.states.connected;
    }
  }, {
    key: 'isEnabled',
    value: function isEnabled() {
      return this.options.enabled;
    }

    /**
     * Returns the current amount of messages in the internal buffer.
     *
     * @returns {number} amount
     */

  }, {
    key: 'getMessageQueueLength',
    value: function getMessageQueueLength() {
      return this.messageQueue.size();
    }
  }]);
  return EventBusDelegate;
}(_BaseDelegate3.default);

exports.default = EventBusDelegate;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45);
__webpack_require__(41);
module.exports = __webpack_require__(100);


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var get = __webpack_require__(101);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(102);
var ITERATOR = __webpack_require__(4)('iterator');
var Iterators = __webpack_require__(19);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(29);
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
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Simple queue implementation

 FIFO: #push() + #first()
 LIFO: #push() + #last()
 */
var Queue = function () {
  function Queue() {
    var maxSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    (0, _classCallCheck3.default)(this, Queue);

    this.maxSize = maxSize;
    this.items = [];
  }

  (0, _createClass3.default)(Queue, [{
    key: "push",
    value: function push(item) {
      this.items.push(item);
      return this.recalibrateBufferSize();
    }
  }, {
    key: "recalibrateBufferSize",
    value: function recalibrateBufferSize() {
      while (this.items.length > this.maxSize) {
        this.first();
      }
      return this;
    }
  }, {
    key: "last",
    value: function last() {
      return this.items.pop();
    }
  }, {
    key: "first",
    value: function first() {
      return this.items.shift(0);
    }
  }, {
    key: "size",
    value: function size() {
      return this.items.length;
    }
  }]);
  return Queue;
}();

exports.default = Queue;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Simple Map implementation

 This implementation allows usage of non serializable keys for values.
 */
var SimpleMap = function () {
  function SimpleMap() {
    (0, _classCallCheck3.default)(this, SimpleMap);

    this.clear();
  }

  // Stores the value under the key.
  // Chainable


  (0, _createClass3.default)(SimpleMap, [{
    key: "put",
    value: function put(key, value) {
      var idx = this._indexForKey(key);
      if (idx > -1) {
        this.values[idx] = value;
      } else {
        this.keys.push(key);
        this.values.push(value);
      }
      return this;
    }

    // Returns value for key, otherwise undefined.

  }, {
    key: "get",
    value: function get(key) {
      var idx = this._indexForKey(key);
      if (idx > -1) {
        return this.values[idx];
      }
    }

    // Returns true if the key exists.

  }, {
    key: "containsKey",
    value: function containsKey(key) {
      var idx = this._indexForKey(key);
      return idx > -1;
    }

    // Returns true if the value exists.

  }, {
    key: "containsValue",
    value: function containsValue(value) {
      var idx = this._indexForValue(value);
      return idx > -1;
    }

    // Removes the key and its value.

  }, {
    key: "remove",
    value: function remove(key) {
      var idx = this._indexForKey(key);
      if (idx > -1) {
        this.keys[idx] = undefined;
        this.values[idx] = undefined;
      }
    }

    // Clears all keys and values.

  }, {
    key: "clear",
    value: function clear() {
      this.keys = [];
      this.values = [];
      return this;
    }

    // Returns index of key, otherwise -1.

  }, {
    key: "_indexForKey",
    value: function _indexForKey(key) {
      for (var i in this.keys) {
        if (key === this.keys[i]) {
          return i;
        }
      }
      return -1;
    }
  }, {
    key: "_indexForValue",
    value: function _indexForValue(value) {
      for (var i in this.values) {
        if (value === this.values[i]) {
          return i;
        }
      }
      return -1;
    }
  }]);
  return SimpleMap;
}();

exports.default = SimpleMap;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(15);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(18);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseDelegate2 = __webpack_require__(52);

var _BaseDelegate3 = _interopRequireDefault(_BaseDelegate2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NoopDelegate = function (_BaseDelegate) {
  (0, _inherits3.default)(NoopDelegate, _BaseDelegate);

  function NoopDelegate() {
    (0, _classCallCheck3.default)(this, NoopDelegate);
    return (0, _possibleConstructorReturn3.default)(this, (NoopDelegate.__proto__ || (0, _getPrototypeOf2.default)(NoopDelegate)).apply(this, arguments));
  }

  return NoopDelegate;
}(_BaseDelegate3.default);

exports.default = NoopDelegate;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = __webpack_require__(51);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _config = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Delegator = function () {
  function Delegator(delegate, $log) {
    var _this = this;

    (0, _classCallCheck3.default)(this, Delegator);

    this.delegate = delegate;
    this.$log = $log;
    this.handlers = {};
    this.delegate.observe({
      afterEventbusConnected: function afterEventbusConnected() {
        return _this.afterEventbusConnected();
      }
    });
  }

  (0, _createClass3.default)(Delegator, [{
    key: 'afterEventbusConnected',
    value: function afterEventbusConnected() {
      for (var address in this.handlers) {
        if (Object.prototype.hasOwnProperty.call(this.handlers, address)) {
          var callbacks = this.handlers[address];
          if (callbacks && callbacks.length) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = (0, _getIterator3.default)(callbacks), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _ref = _step.value;
                var headers = _ref.headers;
                var callback = _ref.callback;

                this.delegate.registerHandler(address, headers, callback);
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
        }
      }
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBusService
     * @name .#registerHandler
     *
     * @description
     * Registers a callback handler for the specified address match.
     *
     * @param {string} address target address
     * @param {object} headers optional headers
     * @param {function} callback handler with params `(message, replyTo)`
     * @returns {function} deconstructor
     */

  }, {
    key: 'registerHandler',
    value: function registerHandler(address, headers, callback) {
      var _this2 = this;

      if (!this.handlers[address]) {
        this.handlers[address] = [];
      }
      var handler = { headers: headers, callback: callback };
      this.handlers[address].push(handler);
      var unregisterFn = null;
      if (this.delegate.isConnectionOpen()) {
        this.delegate.registerHandler(address, headers, callback);
        unregisterFn = function unregisterFn() {
          return _this2.delegate.unregisterHandler(address, headers, callback);
        };
      }
      // and return the deregister callback
      var deconstructor = function deconstructor() {
        if (unregisterFn) {
          unregisterFn();
          unregisterFn = undefined;
        }
        // Remove from internal map
        if (_this2.handlers[address]) {
          var index = _this2.handlers[address].indexOf(handler);
          if (index > -1) {
            _this2.handlers[address].splice(index, 1);
          }
          if (_this2.handlers[address].length < 1) {
            _this2.handlers[address] = undefined;
          }
        }
      };
      deconstructor.displayName = _config.moduleName + '.service.registerHandler.deconstructor';
      return deconstructor;
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBusService
     * @name .#on
     *
     * @description
     * See (using {@link knalli.angular-vertxbus.vertxEventBusService#methods_registerHandler registerHandler()})
     */

  }, {
    key: 'on',
    value: function on(address, headers, callback) {
      return this.registerHandler(address, headers, callback);
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBusService
     * @name .#addListener
     *
     * @description
     * See (using {@link knalli.angular-vertxbus.vertxEventBusService#methods_registerHandler registerHandler()})
     */

  }, {
    key: 'addListener',
    value: function addListener(address, headers, callback) {
      return this.registerHandler(address, headers, callback);
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBusService
     * @name .#unregisterHandler
     *
     * @description
     * Removes a callback handler for the specified address match.
     *
     * @param {string} address target address
     * @param {object} headers optional headers
     * @param {function} callback handler with params `(message, replyTo)`
     */

  }, {
    key: 'unregisterHandler',
    value: function unregisterHandler(address, headers, callback) {
      // Remove from internal map
      if (this.handlers[address]) {
        var index = this.handlers[address].indexOf({ headers: headers, callback: callback });
        if (index > -1) {
          this.handlers[address].splice(index, 1);
        }
        if (this.handlers[address].length < 1) {
          this.handlers[address] = undefined;
        }
      }
      // Remove from real instance
      if (this.delegate.isConnectionOpen()) {
        this.delegate.unregisterHandler(address, headers, callback);
      }
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBusService
     * @name .#un
     *
     * @description
     * See (using {@link knalli.angular-vertxbus.vertxEventBusService#methods_registerHandler unregisterHandler()})
     */

  }, {
    key: 'un',
    value: function un(address, headers, callback) {
      return this.unregisterHandler(address, headers, callback);
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBusService
     * @name .#removeListener
     *
     * @description
     * See (using {@link knalli.angular-vertxbus.vertxEventBusService#methods_registerHandler unregisterHandler()})
     */

  }, {
    key: 'removeListener',
    value: function removeListener(address, headers, callback) {
      return this.unregisterHandler(address, headers, callback);
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBusService
     * @name .#send
     *
     * @description
     * Sends a message to the specified address (using {@link knalli.angular-vertxbus.vertxEventBus#methods_send vertxEventBus.send()}).
     *
     * @param {string} address target address
     * @param {object} message payload message
     * @param {object} headers headers
     * @param {Object} options additional options
     * @param {number=} [options.timeout=10000] (in ms) after which the promise will be rejected
     * @param {boolean=} [options.expectReply=true] if false, the promise will be resolved directly and
     *                                       no replyHandler will be created
     * @returns {object} promise
     */

  }, {
    key: 'send',
    value: function send(address, message) {
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { timeout: 10000, expectReply: true };

      return this.delegate.send(address, message, headers, options.timeout, options.expectReply);
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBusService
     * @name .#publish
     *
     * @description
     * Publishes a message to the specified address (using {@link knalli.angular-vertxbus.vertxEventBus#methods_publish vertxEventBus.publish()}).
     *
     * @param {string} address target address
     * @param {object} message payload message
     * @param {object=} headers headers
     * @returns {object} promise (resolved on either performed or queued)
     */

  }, {
    key: 'publish',
    value: function publish(address, message) {
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this.delegate.publish(address, message, headers);
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBusService
     * @name .#emit
     *
     * @description
     * See (using {@link knalli.angular-vertxbus.vertxEventBusService#methods_publish publish()})
     */

  }, {
    key: 'emit',
    value: function emit(address, message) {
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this.publish(address, message, headers);
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBusService
     * @name .#getConnectionState
     *
     * @description
     * Returns the current connection state. The state is being cached internally.
     *
     * @returns {number} state type of vertx.EventBus
     */

  }, {
    key: 'getConnectionState',
    value: function getConnectionState() {
      return this.delegate.getConnectionState();
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBusService
     * @name .#readyState
     *
     * @description
     * See (using {@link knalli.angular-vertxbus.vertxEventBusService#methods_getConnectionState getConnectionState()})
     */

  }, {
    key: 'readyState',
    value: function readyState() {
      return this.getConnectionState();
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBusService
     * @name .#isConnectionOpen
     *
     * @description
     * Returns true if the current connection state ({@link knalli.angular-vertxbus.vertxEventBusService#methods_getConnectionState getConnectionState()}) is `OPEN`.
     *
     * @returns {boolean} connection open state
     */

  }, {
    key: 'isConnectionOpen',
    value: function isConnectionOpen() {
      return this.isConnectionOpen();
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBusService
     * @name .#isEnabled
     *
     * @description
     * Returns true if service is being enabled.
     *
     * @returns {boolean} state
     */

  }, {
    key: 'isEnabled',
    value: function isEnabled() {
      return this.delegate.isEnabled();
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBusService
     * @name .#isConnected
     *
     * @description
     * Returns true if service (and the eventbus) is being connected.
     *
     * @returns {boolean} state
     */

  }, {
    key: 'isConnected',
    value: function isConnected() {
      return this.delegate.isConnected();
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBusService
     * @name .#isAuthorized
     *
     * @description
     * Returns true if the authorization is valid
     *
     * @returns {boolean} state
     */

  }, {
    key: 'isAuthorized',
    value: function isAuthorized() {
      return this.delegate.isAuthorized();
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBusService
     * @name .#isValidSession
     *
     * See (using {@link knalli.angular-vertxbus.vertxEventBusService#methods_isAuthorized isAuthorized()})
     */

  }, {
    key: 'isValidSession',
    value: function isValidSession() {
      return this.delegate.isAuthorized();
    }

    /**
     * @ngdoc method
     * @module knalli.angular-vertxbus
     * @methodOf knalli.angular-vertxbus.vertxEventBusService
     * @name .#getMessageQueueLength
     *
     * @description
     * Returns the current amount of messages in the internal buffer.
     *
     * @returns {number} amount
     */

  }, {
    key: 'getMessageQueueLength',
    value: function getMessageQueueLength() {
      return this.delegate.getMessageQueueLength();
    }
  }]);
  return Delegator;
}();

exports.default = Delegator;

/***/ })
/******/ ]);
});
//# sourceMappingURL=angular-vertxbus.js.map