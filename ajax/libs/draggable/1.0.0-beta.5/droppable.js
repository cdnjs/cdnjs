(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Droppable", [], factory);
	else if(typeof exports === 'object')
		exports["Droppable"] = factory();
	else
		root["Droppable"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 60);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(62);

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
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(89);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(93);

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
/* 4 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(34)('wks');
var uid = __webpack_require__(22);
var Symbol = __webpack_require__(6).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(13);
var IE8_DOM_DEFINE = __webpack_require__(43);
var toPrimitive = __webpack_require__(26);
var dP = Object.defineProperty;

exports.f = __webpack_require__(9) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var core = __webpack_require__(4);
var ctx = __webpack_require__(25);
var hide = __webpack_require__(12);
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(16)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 10 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(71);
var defined = __webpack_require__(28);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(17);
module.exports = __webpack_require__(9) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closest = undefined;

var _closest = __webpack_require__(114);

var _closest2 = _interopRequireDefault(_closest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.closest = _closest2.default;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
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
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AbstractEvent = __webpack_require__(96);

var _AbstractEvent2 = _interopRequireDefault(_AbstractEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _AbstractEvent2.default;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sensor = __webpack_require__(130);

var _Sensor2 = _interopRequireDefault(_Sensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Sensor2.default;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SensorEvent = __webpack_require__(133);

Object.keys(_SensorEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SensorEvent[key];
    }
  });
});

/***/ }),
/* 22 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(98);

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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AbstractPlugin = __webpack_require__(123);

var _AbstractPlugin2 = _interopRequireDefault(_AbstractPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _AbstractPlugin2.default;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(65);
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(14);
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
/* 27 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(13);
var dPs = __webpack_require__(70);
var enumBugKeys = __webpack_require__(35);
var IE_PROTO = __webpack_require__(33)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(44)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(74).appendChild(iframe);
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(49);
var enumBugKeys = __webpack_require__(35);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(34)('keys');
var uid = __webpack_require__(22);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f;
var has = __webpack_require__(10);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(28);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var core = __webpack_require__(4);
var LIBRARY = __webpack_require__(29);
var wksExt = __webpack_require__(38);
var defineProperty = __webpack_require__(7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(40);
var createDesc = __webpack_require__(17);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(26);
var has = __webpack_require__(10);
var IE8_DOM_DEFINE = __webpack_require__(43);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(9) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DroppableEvent = __webpack_require__(61);

Object.keys(_DroppableEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DroppableEvent[key];
    }
  });
});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(9) && !__webpack_require__(16)(function () {
  return Object.defineProperty(__webpack_require__(44)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
var document = __webpack_require__(6).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(66);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(79);

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

"use strict";

var $at = __webpack_require__(68)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(47)(String, 'String', function (iterated) {
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(29);
var $export = __webpack_require__(8);
var redefine = __webpack_require__(48);
var hide = __webpack_require__(12);
var has = __webpack_require__(10);
var Iterators = __webpack_require__(18);
var $iterCreate = __webpack_require__(69);
var setToStringTag = __webpack_require__(36);
var getPrototypeOf = __webpack_require__(51);
var ITERATOR = __webpack_require__(5)('iterator');
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
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(10);
var toIObject = __webpack_require__(11);
var arrayIndexOf = __webpack_require__(72)(false);
var IE_PROTO = __webpack_require__(33)('IE_PROTO');

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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(27);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(10);
var toObject = __webpack_require__(37);
var IE_PROTO = __webpack_require__(33)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 52 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(49);
var hiddenKeys = __webpack_require__(35).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(8);
var core = __webpack_require__(4);
var fails = __webpack_require__(16);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DragEvent = __webpack_require__(117);

Object.keys(_DragEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DragEvent[key];
    }
  });
});

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DraggableEvent = __webpack_require__(118);

Object.keys(_DraggableEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DraggableEvent[key];
    }
  });
});

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MirrorEvent = __webpack_require__(119);

Object.keys(_MirrorEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MirrorEvent[key];
    }
  });
});

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Mirror = __webpack_require__(120);

Object.defineProperty(exports, 'Mirror', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Mirror).default;
  }
});
Object.defineProperty(exports, 'defaultMirrorOptions', {
  enumerable: true,
  get: function get() {
    return _Mirror.defaultOptions;
  }
});

var _Announcement = __webpack_require__(124);

Object.defineProperty(exports, 'Announcement', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Announcement).default;
  }
});
Object.defineProperty(exports, 'defaultAnnouncementOptions', {
  enumerable: true,
  get: function get() {
    return _Announcement.defaultOptions;
  }
});

var _Scrollable = __webpack_require__(126);

Object.defineProperty(exports, 'Scrollable', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Scrollable).default;
  }
});
Object.defineProperty(exports, 'defaultScrollableOptions', {
  enumerable: true,
  get: function get() {
    return _Scrollable.defaultOptions;
  }
});

var _Accessibility = __webpack_require__(128);

Object.defineProperty(exports, 'Accessibility', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Accessibility).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sensor = __webpack_require__(20);

Object.defineProperty(exports, 'Sensor', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Sensor).default;
  }
});

var _MouseSensor = __webpack_require__(131);

Object.defineProperty(exports, 'MouseSensor', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MouseSensor).default;
  }
});

var _TouchSensor = __webpack_require__(134);

Object.defineProperty(exports, 'TouchSensor', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TouchSensor).default;
  }
});

var _DragSensor = __webpack_require__(136);

Object.defineProperty(exports, 'DragSensor', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DragSensor).default;
  }
});

var _ForceTouchSensor = __webpack_require__(138);

Object.defineProperty(exports, 'ForceTouchSensor', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ForceTouchSensor).default;
  }
});

var _SensorEvent = __webpack_require__(21);

Object.keys(_SensorEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SensorEvent[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DroppableEvent = __webpack_require__(42);

Object.keys(_DroppableEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DroppableEvent[key];
    }
  });
});

var _Droppable = __webpack_require__(97);

var _Droppable2 = _interopRequireDefault(_Droppable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Droppable2.default;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DroppableOutEvent = exports.DroppableOverEvent = exports.DroppableEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractEvent2 = __webpack_require__(19);

var _AbstractEvent3 = _interopRequireDefault(_AbstractEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base droppable event
 * @class DroppableEvent
 * @module DroppableEvent
 * @extends AbstractEvent
 */
var DroppableEvent = exports.DroppableEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(DroppableEvent, _AbstractEvent);

  function DroppableEvent() {
    (0, _classCallCheck3.default)(this, DroppableEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DroppableEvent.__proto__ || Object.getPrototypeOf(DroppableEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DroppableEvent, [{
    key: 'dragEvent',


    /**
     * Original drag event that triggered this droppable event
     * @property dragEvent
     * @type {DragEvent}
     * @readonly
     */
    get: function get() {
      return this.data.dragEvent;
    }
  }]);
  return DroppableEvent;
}(_AbstractEvent3.default);

/**
 * Droppable over event
 * @class DroppableOverEvent
 * @module DroppableOverEvent
 * @extends DroppableEvent
 */


DroppableEvent.type = 'droppable';

var DroppableOverEvent = exports.DroppableOverEvent = function (_DroppableEvent) {
  (0, _inherits3.default)(DroppableOverEvent, _DroppableEvent);

  function DroppableOverEvent() {
    (0, _classCallCheck3.default)(this, DroppableOverEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DroppableOverEvent.__proto__ || Object.getPrototypeOf(DroppableOverEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DroppableOverEvent, [{
    key: 'droppable',


    /**
     * The droppable element you are over
     * @property droppable
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.droppable;
    }
  }]);
  return DroppableOverEvent;
}(DroppableEvent);

/**
 * Droppable out event
 * @class DroppableOutEvent
 * @module DroppableOutEvent
 * @extends DroppableEvent
 */


DroppableOverEvent.type = 'droppable:over';
DroppableOverEvent.cancelable = true;

var DroppableOutEvent = exports.DroppableOutEvent = function (_DroppableEvent2) {
  (0, _inherits3.default)(DroppableOutEvent, _DroppableEvent2);

  function DroppableOutEvent() {
    (0, _classCallCheck3.default)(this, DroppableOutEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DroppableOutEvent.__proto__ || Object.getPrototypeOf(DroppableOutEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DroppableOutEvent, [{
    key: 'droppable',


    /**
     * The droppable element you _were_ over
     * @property droppable
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.droppable;
    }
  }]);
  return DroppableOutEvent;
}(DroppableEvent);

DroppableOutEvent.type = 'droppable:out';
DroppableOutEvent.cancelable = true;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(64);
var $Object = __webpack_require__(4).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(8);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(9), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(67), __esModule: true };

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(46);
__webpack_require__(75);
module.exports = __webpack_require__(38).f('iterator');


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(27);
var defined = __webpack_require__(28);
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(30);
var descriptor = __webpack_require__(17);
var setToStringTag = __webpack_require__(36);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(12)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var anObject = __webpack_require__(13);
var getKeys = __webpack_require__(31);

module.exports = __webpack_require__(9) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(32);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(11);
var toLength = __webpack_require__(50);
var toAbsoluteIndex = __webpack_require__(73);
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
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(27);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(6).document;
module.exports = document && document.documentElement;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(76);
var global = __webpack_require__(6);
var hide = __webpack_require__(12);
var Iterators = __webpack_require__(18);
var TO_STRING_TAG = __webpack_require__(5)('toStringTag');

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
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(77);
var step = __webpack_require__(78);
var Iterators = __webpack_require__(18);
var toIObject = __webpack_require__(11);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(47)(Array, 'Array', function (iterated, kind) {
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
/* 77 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(80), __esModule: true };

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(81);
__webpack_require__(86);
__webpack_require__(87);
__webpack_require__(88);
module.exports = __webpack_require__(4).Symbol;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(6);
var has = __webpack_require__(10);
var DESCRIPTORS = __webpack_require__(9);
var $export = __webpack_require__(8);
var redefine = __webpack_require__(48);
var META = __webpack_require__(82).KEY;
var $fails = __webpack_require__(16);
var shared = __webpack_require__(34);
var setToStringTag = __webpack_require__(36);
var uid = __webpack_require__(22);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(38);
var wksDefine = __webpack_require__(39);
var enumKeys = __webpack_require__(83);
var isArray = __webpack_require__(84);
var anObject = __webpack_require__(13);
var isObject = __webpack_require__(14);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(26);
var createDesc = __webpack_require__(17);
var _create = __webpack_require__(30);
var gOPNExt = __webpack_require__(85);
var $GOPD = __webpack_require__(41);
var $DP = __webpack_require__(7);
var $keys = __webpack_require__(31);
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
  __webpack_require__(53).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(40).f = $propertyIsEnumerable;
  __webpack_require__(52).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(29)) {
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
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
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
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(22)('meta');
var isObject = __webpack_require__(14);
var has = __webpack_require__(10);
var setDesc = __webpack_require__(7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(16)(function () {
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
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(31);
var gOPS = __webpack_require__(52);
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
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(32);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(11);
var gOPN = __webpack_require__(53).f;
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
/* 86 */
/***/ (function(module, exports) {



/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39)('asyncIterator');


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39)('observable');


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(90), __esModule: true };

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(91);
module.exports = __webpack_require__(4).Object.setPrototypeOf;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(8);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(92).set });


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(14);
var anObject = __webpack_require__(13);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(25)(Function.call, __webpack_require__(41).f(Object.prototype, '__proto__').set, 2);
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
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(94), __esModule: true };

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(95);
var $Object = __webpack_require__(4).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(8);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(30) });


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _canceled = Symbol('canceled');

/**
 * All events fired by draggable inherit this class. You can call `cancel()` to
 * cancel a specific event or you can check if an event has been canceled by
 * calling `canceled()`.
 * @abstract
 * @class AbstractEvent
 * @module AbstractEvent
 */

var AbstractEvent = function () {

  /**
   * AbstractEvent constructor.
   * @constructs AbstractEvent
   * @param {object} data - Event data
   */


  /**
   * Event type
   * @static
   * @abstract
   * @property type
   * @type {String}
   */
  function AbstractEvent(data) {
    (0, _classCallCheck3.default)(this, AbstractEvent);

    this[_canceled] = false;
    this.data = data;
  }

  /**
   * Read-only type
   * @abstract
   * @return {String}
   */


  /**
   * Event cancelable
   * @static
   * @abstract
   * @property cancelable
   * @type {Boolean}
   */


  (0, _createClass3.default)(AbstractEvent, [{
    key: 'cancel',


    /**
     * Cancels the event instance
     * @abstract
     */
    value: function cancel() {
      this[_canceled] = true;
    }

    /**
     * Check if event has been canceled
     * @abstract
     * @return {Boolean}
     */

  }, {
    key: 'canceled',
    value: function canceled() {
      return Boolean(this[_canceled]);
    }
  }, {
    key: 'type',
    get: function get() {
      return this.constructor.type;
    }

    /**
     * Read-only cancelable
     * @abstract
     * @return {Boolean}
     */

  }, {
    key: 'cancelable',
    get: function get() {
      return this.constructor.cancelable;
    }
  }]);
  return AbstractEvent;
}();

AbstractEvent.type = 'event';
AbstractEvent.cancelable = false;
exports.default = AbstractEvent;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(23);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(107);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = __webpack_require__(15);

var _Draggable2 = __webpack_require__(116);

var _Draggable3 = _interopRequireDefault(_Draggable2);

var _DroppableEvent = __webpack_require__(42);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onDragStart = Symbol('onDragStart');
var onDragMove = Symbol('onDragMove');
var onDragStop = Symbol('onDragStop');
var drop = Symbol('drop');
var release = Symbol('release');
var closestDroppable = Symbol('closestDroppable');
var getDroppables = Symbol('getDroppables');

/**
 * Returns an announcement message when the Draggable element is dropped into a Droppable element
 * @param {DroppableOverEvent} droppableEvent
 * @return {String}
 */
function onDroppableOverDefaultAnnouncement(_ref) {
  var dragEvent = _ref.dragEvent,
      droppable = _ref.droppable;

  var sourceText = dragEvent.source.textContent.trim() || dragEvent.source.id || 'draggable element';
  var overText = droppable.textContent.trim() || droppable.id || 'droppable element';

  return 'Dropped ' + sourceText + ' into ' + overText;
}

/**
 * Returns an announcement message when the Draggable element is released from a Droppable element
 * @param {DroppableOutEvent} droppableEvent
 * @return {String}
 */
function onDroppableOutDefaultAnnouncement(_ref2) {
  var dragEvent = _ref2.dragEvent,
      droppable = _ref2.droppable;

  var sourceText = dragEvent.source.textContent.trim() || dragEvent.source.id || 'draggable element';
  var overText = droppable.textContent.trim() || droppable.id || 'droppable element';

  return 'Released ' + sourceText + ' from ' + overText;
}

/**
 * @const {Object} defaultAnnouncements
 * @const {Function} defaultAnnouncements['droppable:over']
 * @const {Function} defaultAnnouncements['droppable:out']
 */
var defaultAnnouncements = {
  'droppable:over': onDroppableOverDefaultAnnouncement,
  'droppable:out': onDroppableOutDefaultAnnouncement
};

var defaultClasses = {
  'droppable:active': 'draggable-droppable--active',
  'droppable:occupied': 'draggable-droppable--occupied'
};

var defaultOptions = {
  droppable: '.draggable-droppable'
};

/**
 * Droppable is built on top of Draggable and allows dropping draggable elements
 * into droppable element
 * @class Droppable
 * @module Droppable
 * @extends Draggable
 */

var Droppable = function (_Draggable) {
  (0, _inherits3.default)(Droppable, _Draggable);

  /**
   * Droppable constructor.
   * @constructs Droppable
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Droppable containers
   * @param {Object} options - Options for Droppable
   */
  function Droppable() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, Droppable);

    /**
     * All droppable elements on drag start
     * @property droppables
     * @type {HTMLElement[]}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (Droppable.__proto__ || Object.getPrototypeOf(Droppable)).call(this, containers, Object.assign({}, defaultOptions, options, {
      classes: Object.assign({}, defaultClasses, options.classes || {}),
      announcements: Object.assign({}, defaultAnnouncements, options.announcements || {})
    })));

    _this.droppables = null;

    /**
     * Last droppable element that the source was dropped into
     * @property lastDroppable
     * @type {HTMLElement}
     */
    _this.lastDroppable = null;

    /**
     * Initial droppable element that the source was drag from
     * @property initialDroppable
     * @type {HTMLElement}
     */
    _this.initialDroppable = null;

    _this[onDragStart] = _this[onDragStart].bind(_this);
    _this[onDragMove] = _this[onDragMove].bind(_this);
    _this[onDragStop] = _this[onDragStop].bind(_this);

    _this.on('drag:start', _this[onDragStart]).on('drag:move', _this[onDragMove]).on('drag:stop', _this[onDragStop]);
    return _this;
  }

  /**
   * Destroys Droppable instance.
   */


  (0, _createClass3.default)(Droppable, [{
    key: 'destroy',
    value: function destroy() {
      (0, _get3.default)(Droppable.prototype.__proto__ || Object.getPrototypeOf(Droppable.prototype), 'destroy', this).call(this);

      this.off('drag:start', this[onDragStart]).off('drag:move', this[onDragMove]).off('drag:stop', this[onDragStop]);
    }

    /**
     * Drag start handler
     * @private
     * @param {DragStartEvent} event - Drag start event
     */

  }, {
    key: onDragStart,
    value: function value(event) {
      if (event.canceled()) {
        return;
      }

      this.droppables = [].concat((0, _toConsumableArray3.default)(this[getDroppables]()));
      var droppable = (0, _utils.closest)(event.sensorEvent.target, this.options.droppable);

      if (!droppable) {
        event.cancel();
        return;
      }

      this.initialDroppable = droppable;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.droppables[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var droppableElement = _step.value;

          if (droppableElement.classList.contains(this.getClassNameFor('droppable:occupied'))) {
            continue;
          }

          droppableElement.classList.add(this.getClassNameFor('droppable:active'));
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

    /**
     * Drag move handler
     * @private
     * @param {DragMoveEvent} event - Drag move event
     */

  }, {
    key: onDragMove,
    value: function value(event) {
      if (event.canceled()) {
        return;
      }

      var droppable = this[closestDroppable](event.sensorEvent.target);
      var overEmptyDroppable = droppable && !droppable.classList.contains(this.getClassNameFor('droppable:occupied'));

      if (overEmptyDroppable && this[drop](event, droppable)) {
        this.lastDroppable = droppable;
      } else if ((!droppable || droppable === this.initialDroppable) && this.lastDroppable) {
        this[release](event);
        this.lastDroppable = null;
      }
    }

    /**
     * Drag stop handler
     * @private
     * @param {DragStopEvent} event - Drag stop event
     */

  }, {
    key: onDragStop,
    value: function value() {
      var occupiedClass = this.getClassNameFor('droppable:occupied');

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.droppables[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var droppable = _step2.value;

          droppable.classList.remove(this.getClassNameFor('droppable:active'));
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

      if (this.lastDroppable && this.lastDroppable !== this.initialDroppable) {
        this.initialDroppable.classList.remove(occupiedClass);
      }

      this.droppables = null;
      this.lastDroppable = null;
      this.initialDroppable = null;
    }

    /**
     * Drop method drops a draggable element into a droppable element
     * @private
     * @param {DragMoveEvent} event - Drag move event
     * @param {HTMLElement} droppable - Droppable element to drop draggable into
     */

  }, {
    key: drop,
    value: function value(event, droppable) {
      var droppableOverEvent = new _DroppableEvent.DroppableOverEvent({
        dragEvent: event,
        droppable: droppable
      });

      this.trigger(droppableOverEvent);

      if (droppableOverEvent.canceled()) {
        return false;
      }

      var occupiedClass = this.getClassNameFor('droppable:occupied');

      if (this.lastDroppable) {
        this.lastDroppable.classList.remove(occupiedClass);
      }

      droppable.appendChild(event.source);
      droppable.classList.add(occupiedClass);

      return true;
    }

    /**
     * Release method moves the previously dropped element back into its original position
     * @private
     * @param {DragMoveEvent} event - Drag move event
     */

  }, {
    key: release,
    value: function value(event) {
      var droppableOutEvent = new _DroppableEvent.DroppableOutEvent({
        dragEvent: event,
        droppable: this.lastDroppable
      });

      this.trigger(droppableOutEvent);

      if (droppableOutEvent.canceled()) {
        return;
      }

      this.initialDroppable.appendChild(event.source);
      this.lastDroppable.classList.remove(this.getClassNameFor('droppable:occupied'));
    }

    /**
     * Returns closest droppable element for even target
     * @private
     * @param {HTMLElement} target - Event target
     * @return {HTMLElement|null}
     */

  }, {
    key: closestDroppable,
    value: function value(target) {
      var _this2 = this;

      if (!this.droppables) {
        return null;
      }

      return (0, _utils.closest)(target, function (element) {
        return _this2.droppables.includes(element);
      });
    }

    /**
     * Returns all current droppable elements for this draggable instance
     * @private
     * @return {NodeList|HTMLElement[]|Array}
     */

  }, {
    key: getDroppables,
    value: function value() {
      var droppables = this.options.droppable;

      if (typeof droppables === 'string') {
        return document.querySelectorAll(droppables);
      } else if (droppables instanceof NodeList || droppables instanceof Array) {
        return droppables;
      } else if (typeof droppables === 'function') {
        return droppables();
      } else {
        return [];
      }
    }
  }]);
  return Droppable;
}(_Draggable3.default);

exports.default = Droppable;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(46);
__webpack_require__(100);
module.exports = __webpack_require__(4).Array.from;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(25);
var $export = __webpack_require__(8);
var toObject = __webpack_require__(37);
var call = __webpack_require__(101);
var isArrayIter = __webpack_require__(102);
var toLength = __webpack_require__(50);
var createProperty = __webpack_require__(103);
var getIterFn = __webpack_require__(104);

$export($export.S + $export.F * !__webpack_require__(106)(function (iter) { Array.from(iter); }), 'Array', {
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
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(13);
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

// check on default Array iterator
var Iterators = __webpack_require__(18);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7);
var createDesc = __webpack_require__(17);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(105);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(18);
module.exports = __webpack_require__(4).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(32);
var TAG = __webpack_require__(5)('toStringTag');
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
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
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
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(108);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(111);

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
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(110);
module.exports = __webpack_require__(4).Object.getPrototypeOf;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(37);
var $getPrototypeOf = __webpack_require__(51);

__webpack_require__(54)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(113);
var $Object = __webpack_require__(4).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(11);
var $getOwnPropertyDescriptor = __webpack_require__(41).f;

__webpack_require__(54)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _closest = __webpack_require__(115);

var _closest2 = _interopRequireDefault(_closest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _closest2.default;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(23);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = closest;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchFunction = Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;

/**
 * Get the closest parent element of a given element that matches the given
 * selector string or matching function
 *
 * @param {Element} element The child element to find a parent of
 * @param {String|Function} selector The string or function to use to match
 *     the parent element
 * @return {Element|null}
 */
function closest(element, value) {
  if (!element) {
    return null;
  }

  var selector = value;
  var callback = value;
  var nodeList = value;
  var singleElement = value;

  var isSelector = Boolean(typeof value === 'string');
  var isFunction = Boolean(typeof value === 'function');
  var isNodeList = Boolean(value instanceof NodeList || value instanceof Array);
  var isElement = Boolean(value instanceof HTMLElement);

  function conditionFn(currentElement) {
    if (!currentElement) {
      return currentElement;
    } else if (isSelector) {
      return matchFunction.call(currentElement, selector);
    } else if (isNodeList) {
      return [].concat((0, _toConsumableArray3.default)(nodeList)).includes(currentElement);
    } else if (isElement) {
      return singleElement === currentElement;
    } else if (isFunction) {
      return callback(currentElement);
    } else {
      return null;
    }
  }

  var current = element;

  do {
    current = current.correspondingUseElement || current.correspondingElement || current;
    if (conditionFn(current)) {
      return current;
    }
    current = current.parentNode;
  } while (current && current !== document.body && current !== document);

  return null;
}

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DragEvent = __webpack_require__(55);

Object.keys(_DragEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DragEvent[key];
    }
  });
});

var _DraggableEvent = __webpack_require__(56);

Object.keys(_DraggableEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DraggableEvent[key];
    }
  });
});

var _MirrorEvent = __webpack_require__(57);

Object.keys(_MirrorEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _MirrorEvent[key];
    }
  });
});

var _Plugins = __webpack_require__(58);

Object.keys(_Plugins).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Plugins[key];
    }
  });
});

var _Sensors = __webpack_require__(59);

Object.keys(_Sensors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Sensors[key];
    }
  });
});

var _Draggable = __webpack_require__(140);

var _Draggable2 = _interopRequireDefault(_Draggable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Draggable2.default;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragStopEvent = exports.DragPressureEvent = exports.DragOutContainerEvent = exports.DragOverContainerEvent = exports.DragOutEvent = exports.DragOverEvent = exports.DragMoveEvent = exports.DragStartEvent = exports.DragEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractEvent2 = __webpack_require__(19);

var _AbstractEvent3 = _interopRequireDefault(_AbstractEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base drag event
 * @class DragEvent
 * @module DragEvent
 * @extends AbstractEvent
 */
var DragEvent = exports.DragEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(DragEvent, _AbstractEvent);

  function DragEvent() {
    (0, _classCallCheck3.default)(this, DragEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragEvent.__proto__ || Object.getPrototypeOf(DragEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DragEvent, [{
    key: 'hasMirror',


    /**
     * Checks if mirror has been created
     * @return {Boolean}
     */
    value: function hasMirror() {
      return Boolean(this.mirror);
    }
  }, {
    key: 'source',


    /**
     * Draggables source element
     * @property source
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.source;
    }

    /**
     * Draggables original source element
     * @property originalSource
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'originalSource',
    get: function get() {
      return this.data.originalSource;
    }

    /**
     * Draggables mirror element
     * @property mirror
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'mirror',
    get: function get() {
      return this.data.mirror;
    }

    /**
     * Draggables source container element
     * @property sourceContainer
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'sourceContainer',
    get: function get() {
      return this.data.sourceContainer;
    }

    /**
     * Sensor event
     * @property sensorEvent
     * @type {SensorEvent}
     * @readonly
     */

  }, {
    key: 'sensorEvent',
    get: function get() {
      return this.data.sensorEvent;
    }

    /**
     * Original event that triggered sensor event
     * @property originalEvent
     * @type {Event}
     * @readonly
     */

  }, {
    key: 'originalEvent',
    get: function get() {
      if (this.sensorEvent) {
        return this.sensorEvent.originalEvent;
      }

      return null;
    }
  }]);
  return DragEvent;
}(_AbstractEvent3.default);

/**
 * Drag start event
 * @class DragStartEvent
 * @module DragStartEvent
 * @extends DragEvent
 */


DragEvent.type = 'drag';

var DragStartEvent = exports.DragStartEvent = function (_DragEvent) {
  (0, _inherits3.default)(DragStartEvent, _DragEvent);

  function DragStartEvent() {
    (0, _classCallCheck3.default)(this, DragStartEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragStartEvent.__proto__ || Object.getPrototypeOf(DragStartEvent)).apply(this, arguments));
  }

  return DragStartEvent;
}(DragEvent);

/**
 * Drag move event
 * @class DragMoveEvent
 * @module DragMoveEvent
 * @extends DragEvent
 */


DragStartEvent.type = 'drag:start';
DragStartEvent.cancelable = true;

var DragMoveEvent = exports.DragMoveEvent = function (_DragEvent2) {
  (0, _inherits3.default)(DragMoveEvent, _DragEvent2);

  function DragMoveEvent() {
    (0, _classCallCheck3.default)(this, DragMoveEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragMoveEvent.__proto__ || Object.getPrototypeOf(DragMoveEvent)).apply(this, arguments));
  }

  return DragMoveEvent;
}(DragEvent);

/**
 * Drag over event
 * @class DragOverEvent
 * @module DragOverEvent
 * @extends DragEvent
 */


DragMoveEvent.type = 'drag:move';

var DragOverEvent = exports.DragOverEvent = function (_DragEvent3) {
  (0, _inherits3.default)(DragOverEvent, _DragEvent3);

  function DragOverEvent() {
    (0, _classCallCheck3.default)(this, DragOverEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragOverEvent.__proto__ || Object.getPrototypeOf(DragOverEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DragOverEvent, [{
    key: 'overContainer',


    /**
     * Draggable container you are over
     * @property overContainer
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.overContainer;
    }

    /**
     * Draggable element you are over
     * @property over
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'over',
    get: function get() {
      return this.data.over;
    }
  }]);
  return DragOverEvent;
}(DragEvent);

/**
 * Drag out event
 * @class DragOutEvent
 * @module DragOutEvent
 * @extends DragEvent
 */


DragOverEvent.type = 'drag:over';
DragOverEvent.cancelable = true;

var DragOutEvent = exports.DragOutEvent = function (_DragEvent4) {
  (0, _inherits3.default)(DragOutEvent, _DragEvent4);

  function DragOutEvent() {
    (0, _classCallCheck3.default)(this, DragOutEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragOutEvent.__proto__ || Object.getPrototypeOf(DragOutEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DragOutEvent, [{
    key: 'overContainer',


    /**
     * Draggable container you are over
     * @property overContainer
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.overContainer;
    }

    /**
     * Draggable element you left
     * @property over
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'over',
    get: function get() {
      return this.data.over;
    }
  }]);
  return DragOutEvent;
}(DragEvent);

/**
 * Drag over container event
 * @class DragOverContainerEvent
 * @module DragOverContainerEvent
 * @extends DragEvent
 */


DragOutEvent.type = 'drag:out';

var DragOverContainerEvent = exports.DragOverContainerEvent = function (_DragEvent5) {
  (0, _inherits3.default)(DragOverContainerEvent, _DragEvent5);

  function DragOverContainerEvent() {
    (0, _classCallCheck3.default)(this, DragOverContainerEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragOverContainerEvent.__proto__ || Object.getPrototypeOf(DragOverContainerEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DragOverContainerEvent, [{
    key: 'overContainer',


    /**
     * Draggable container you are over
     * @property overContainer
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.overContainer;
    }
  }]);
  return DragOverContainerEvent;
}(DragEvent);

/**
 * Drag out container event
 * @class DragOutContainerEvent
 * @module DragOutContainerEvent
 * @extends DragEvent
 */


DragOverContainerEvent.type = 'drag:over:container';

var DragOutContainerEvent = exports.DragOutContainerEvent = function (_DragEvent6) {
  (0, _inherits3.default)(DragOutContainerEvent, _DragEvent6);

  function DragOutContainerEvent() {
    (0, _classCallCheck3.default)(this, DragOutContainerEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragOutContainerEvent.__proto__ || Object.getPrototypeOf(DragOutContainerEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DragOutContainerEvent, [{
    key: 'overContainer',


    /**
     * Draggable container you left
     * @property overContainer
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.overContainer;
    }
  }]);
  return DragOutContainerEvent;
}(DragEvent);

/**
 * Drag pressure event
 * @class DragPressureEvent
 * @module DragPressureEvent
 * @extends DragEvent
 */


DragOutContainerEvent.type = 'drag:out:container';

var DragPressureEvent = exports.DragPressureEvent = function (_DragEvent7) {
  (0, _inherits3.default)(DragPressureEvent, _DragEvent7);

  function DragPressureEvent() {
    (0, _classCallCheck3.default)(this, DragPressureEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragPressureEvent.__proto__ || Object.getPrototypeOf(DragPressureEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DragPressureEvent, [{
    key: 'pressure',


    /**
     * Pressure applied on draggable element
     * @property pressure
     * @type {Number}
     * @readonly
     */
    get: function get() {
      return this.data.pressure;
    }
  }]);
  return DragPressureEvent;
}(DragEvent);

/**
 * Drag stop event
 * @class DragStopEvent
 * @module DragStopEvent
 * @extends DragEvent
 */


DragPressureEvent.type = 'drag:pressure';

var DragStopEvent = exports.DragStopEvent = function (_DragEvent8) {
  (0, _inherits3.default)(DragStopEvent, _DragEvent8);

  function DragStopEvent() {
    (0, _classCallCheck3.default)(this, DragStopEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragStopEvent.__proto__ || Object.getPrototypeOf(DragStopEvent)).apply(this, arguments));
  }

  return DragStopEvent;
}(DragEvent);

DragStopEvent.type = 'drag:stop';

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DraggableDestroyEvent = exports.DraggableInitializedEvent = exports.DraggableEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractEvent2 = __webpack_require__(19);

var _AbstractEvent3 = _interopRequireDefault(_AbstractEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base draggable event
 * @class DraggableEvent
 * @module DraggableEvent
 * @extends AbstractEvent
 */
var DraggableEvent = exports.DraggableEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(DraggableEvent, _AbstractEvent);

  function DraggableEvent() {
    (0, _classCallCheck3.default)(this, DraggableEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DraggableEvent.__proto__ || Object.getPrototypeOf(DraggableEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DraggableEvent, [{
    key: 'draggable',


    /**
     * Draggable instance
     * @property draggable
     * @type {Draggable}
     * @readonly
     */
    get: function get() {
      return this.data.draggable;
    }
  }]);
  return DraggableEvent;
}(_AbstractEvent3.default);

/**
 * Draggable initialized event
 * @class DraggableInitializedEvent
 * @module DraggableInitializedEvent
 * @extends DraggableEvent
 */


DraggableEvent.type = 'draggable';

var DraggableInitializedEvent = exports.DraggableInitializedEvent = function (_DraggableEvent) {
  (0, _inherits3.default)(DraggableInitializedEvent, _DraggableEvent);

  function DraggableInitializedEvent() {
    (0, _classCallCheck3.default)(this, DraggableInitializedEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DraggableInitializedEvent.__proto__ || Object.getPrototypeOf(DraggableInitializedEvent)).apply(this, arguments));
  }

  return DraggableInitializedEvent;
}(DraggableEvent);

/**
 * Draggable destory event
 * @class DraggableInitializedEvent
 * @module DraggableDestroyEvent
 * @extends DraggableDestroyEvent
 */


DraggableInitializedEvent.type = 'draggable:initialize';

var DraggableDestroyEvent = exports.DraggableDestroyEvent = function (_DraggableEvent2) {
  (0, _inherits3.default)(DraggableDestroyEvent, _DraggableEvent2);

  function DraggableDestroyEvent() {
    (0, _classCallCheck3.default)(this, DraggableDestroyEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DraggableDestroyEvent.__proto__ || Object.getPrototypeOf(DraggableDestroyEvent)).apply(this, arguments));
  }

  return DraggableDestroyEvent;
}(DraggableEvent);

DraggableDestroyEvent.type = 'draggable:destroy';

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MirrorDestroyEvent = exports.MirrorMoveEvent = exports.MirrorAttachedEvent = exports.MirrorCreatedEvent = exports.MirrorCreateEvent = exports.MirrorEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractEvent2 = __webpack_require__(19);

var _AbstractEvent3 = _interopRequireDefault(_AbstractEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base mirror event
 * @class MirrorEvent
 * @module MirrorEvent
 * @extends AbstractEvent
 */
var MirrorEvent = exports.MirrorEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(MirrorEvent, _AbstractEvent);

  function MirrorEvent() {
    (0, _classCallCheck3.default)(this, MirrorEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorEvent.__proto__ || Object.getPrototypeOf(MirrorEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(MirrorEvent, [{
    key: 'hasMirror',


    /**
     * Checks if mirror has been created
     * @return {Boolean}
     */
    value: function hasMirror() {
      return Boolean(this.mirror);
    }
  }, {
    key: 'source',


    /**
     * Draggables source element
     * @property source
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.source;
    }

    /**
     * Draggables original source element
     * @property originalSource
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'originalSource',
    get: function get() {
      return this.data.originalSource;
    }

    /**
     * Draggables source container element
     * @property sourceContainer
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'sourceContainer',
    get: function get() {
      return this.data.sourceContainer;
    }

    /**
     * Sensor event
     * @property sensorEvent
     * @type {SensorEvent}
     * @readonly
     */

  }, {
    key: 'sensorEvent',
    get: function get() {
      return this.data.sensorEvent;
    }

    /**
     * Original event that triggered sensor event
     * @property originalEvent
     * @type {Event}
     * @readonly
     */

  }, {
    key: 'originalEvent',
    get: function get() {
      if (this.sensorEvent) {
        return this.sensorEvent.originalEvent;
      }

      return null;
    }
  }]);
  return MirrorEvent;
}(_AbstractEvent3.default);

/**
 * Mirror create event
 * @class MirrorCreateEvent
 * @module MirrorCreateEvent
 * @extends MirrorEvent
 */


var MirrorCreateEvent = exports.MirrorCreateEvent = function (_MirrorEvent) {
  (0, _inherits3.default)(MirrorCreateEvent, _MirrorEvent);

  function MirrorCreateEvent() {
    (0, _classCallCheck3.default)(this, MirrorCreateEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorCreateEvent.__proto__ || Object.getPrototypeOf(MirrorCreateEvent)).apply(this, arguments));
  }

  return MirrorCreateEvent;
}(MirrorEvent);

/**
 * Mirror created event
 * @class MirrorCreatedEvent
 * @module MirrorCreatedEvent
 * @extends MirrorEvent
 */


MirrorCreateEvent.type = 'mirror:create';

var MirrorCreatedEvent = exports.MirrorCreatedEvent = function (_MirrorEvent2) {
  (0, _inherits3.default)(MirrorCreatedEvent, _MirrorEvent2);

  function MirrorCreatedEvent() {
    (0, _classCallCheck3.default)(this, MirrorCreatedEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorCreatedEvent.__proto__ || Object.getPrototypeOf(MirrorCreatedEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(MirrorCreatedEvent, [{
    key: 'mirror',


    /**
     * Draggables mirror element
     * @property mirror
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.mirror;
    }
  }]);
  return MirrorCreatedEvent;
}(MirrorEvent);

/**
 * Mirror attached event
 * @class MirrorAttachedEvent
 * @module MirrorAttachedEvent
 * @extends MirrorEvent
 */


MirrorCreatedEvent.type = 'mirror:created';

var MirrorAttachedEvent = exports.MirrorAttachedEvent = function (_MirrorEvent3) {
  (0, _inherits3.default)(MirrorAttachedEvent, _MirrorEvent3);

  function MirrorAttachedEvent() {
    (0, _classCallCheck3.default)(this, MirrorAttachedEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorAttachedEvent.__proto__ || Object.getPrototypeOf(MirrorAttachedEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(MirrorAttachedEvent, [{
    key: 'mirror',


    /**
     * Draggables mirror element
     * @property mirror
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.mirror;
    }
  }]);
  return MirrorAttachedEvent;
}(MirrorEvent);

/**
 * Mirror move event
 * @class MirrorMoveEvent
 * @module MirrorMoveEvent
 * @extends MirrorEvent
 */


MirrorAttachedEvent.type = 'mirror:attached';

var MirrorMoveEvent = exports.MirrorMoveEvent = function (_MirrorEvent4) {
  (0, _inherits3.default)(MirrorMoveEvent, _MirrorEvent4);

  function MirrorMoveEvent() {
    (0, _classCallCheck3.default)(this, MirrorMoveEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorMoveEvent.__proto__ || Object.getPrototypeOf(MirrorMoveEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(MirrorMoveEvent, [{
    key: 'mirror',


    /**
     * Draggables mirror element
     * @property mirror
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.mirror;
    }
  }]);
  return MirrorMoveEvent;
}(MirrorEvent);

/**
 * Mirror destroy event
 * @class MirrorDestroyEvent
 * @module MirrorDestroyEvent
 * @extends MirrorEvent
 */


MirrorMoveEvent.type = 'mirror:move';
MirrorMoveEvent.cancelable = true;

var MirrorDestroyEvent = exports.MirrorDestroyEvent = function (_MirrorEvent5) {
  (0, _inherits3.default)(MirrorDestroyEvent, _MirrorEvent5);

  function MirrorDestroyEvent() {
    (0, _classCallCheck3.default)(this, MirrorDestroyEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorDestroyEvent.__proto__ || Object.getPrototypeOf(MirrorDestroyEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(MirrorDestroyEvent, [{
    key: 'mirror',


    /**
     * Draggables mirror element
     * @property mirror
     * @type {HTMLElement}
     * @readonly
     */
    get: function get() {
      return this.data.mirror;
    }
  }]);
  return MirrorDestroyEvent;
}(MirrorEvent);

MirrorDestroyEvent.type = 'mirror:destroy';
MirrorDestroyEvent.cancelable = true;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = undefined;

var _Mirror = __webpack_require__(121);

var _Mirror2 = _interopRequireDefault(_Mirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Mirror2.default;
exports.defaultOptions = _Mirror.defaultOptions;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = exports.onScroll = exports.onMirrorMove = exports.onMirrorCreated = exports.onDragStop = exports.onDragStart = undefined;

var _objectWithoutProperties2 = __webpack_require__(122);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractPlugin2 = __webpack_require__(24);

var _AbstractPlugin3 = _interopRequireDefault(_AbstractPlugin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onDragStart = exports.onDragStart = Symbol('onDragStart');
var onDragStop = exports.onDragStop = Symbol('onDragStop');
var onMirrorCreated = exports.onMirrorCreated = Symbol('onMirrorCreated');
var onMirrorMove = exports.onMirrorMove = Symbol('onMirrorMove');
var onScroll = exports.onScroll = Symbol('onScroll');

/**
 * Mirror default options
 * @property {Object} defaultOptions
 * @property {Boolean} defaultOptions.constrainDimensions
 * @property {Boolean} defaultOptions.xAxis
 * @property {Boolean} defaultOptions.yAxis
 * @property {null} defaultOptions.cursorOffsetX
 * @property {null} defaultOptions.cursorOffsetY
 * @type {Object}
 */
var defaultOptions = exports.defaultOptions = {
  constrainDimensions: false,
  xAxis: true,
  yAxis: true,
  cursorOffsetX: null,
  cursorOffsetY: null
};

/**
 * Mirror plugin which controls the mirror positioning while dragging
 * @class Mirror
 * @module Mirror
 * @extends AbstractPlugin
 */

var Mirror = function (_AbstractPlugin) {
  (0, _inherits3.default)(Mirror, _AbstractPlugin);

  /**
   * Mirror constructor.
   * @constructs Mirror
   * @param {Draggable} draggable - Draggable instance
   */
  function Mirror(draggable) {
    (0, _classCallCheck3.default)(this, Mirror);

    /**
     * Mirror options
     * @property {Object} options
     * @property {Boolean} options.constrainDimensions
     * @property {Boolean} options.xAxis
     * @property {Boolean} options.yAxis
     * @property {Number|null} options.cursorOffsetX
     * @property {Number|null} options.cursorOffsetY
     * @type {Object}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (Mirror.__proto__ || Object.getPrototypeOf(Mirror)).call(this, draggable));

    _this.options = Object.assign({}, defaultOptions, _this.getOptions());

    /**
     * Scroll offset for touch devices because the mirror is positioned fixed
     * @property {Object} scrollOffset
     * @property {Number} scrollOffset.x
     * @property {Number} scrollOffset.y
     */
    _this.scrollOffset = { x: 0, y: 0 };

    /**
     * Initial scroll offset for touch devices because the mirror is positioned fixed
     * @property {Object} scrollOffset
     * @property {Number} scrollOffset.x
     * @property {Number} scrollOffset.y
     */
    _this.initialScrollOffset = {
      x: window.scrollX,
      y: window.scrollY
    };

    _this[onDragStart] = _this[onDragStart].bind(_this);
    _this[onDragStop] = _this[onDragStop].bind(_this);
    _this[onMirrorCreated] = _this[onMirrorCreated].bind(_this);
    _this[onMirrorMove] = _this[onMirrorMove].bind(_this);
    _this[onScroll] = _this[onScroll].bind(_this);
    return _this;
  }

  /**
   * Attaches plugins event listeners
   */


  (0, _createClass3.default)(Mirror, [{
    key: 'attach',
    value: function attach() {
      this.draggable.on('drag:start', this[onDragStart]).on('drag:stop', this[onDragStop]).on('mirror:created', this[onMirrorCreated]).on('mirror:move', this[onMirrorMove]);
    }

    /**
     * Detaches plugins event listeners
     */

  }, {
    key: 'detach',
    value: function detach() {
      this.draggable.off('drag:start', this[onDragStart]).off('drag:stop', this[onDragStop]).off('mirror:created', this[onMirrorCreated]).off('mirror:move', this[onMirrorMove]);
    }

    /**
     * Returns options passed through draggable
     * @return {Object}
     */

  }, {
    key: 'getOptions',
    value: function getOptions() {
      return this.draggable.options.mirror || {};
    }
  }, {
    key: onDragStart,
    value: function value() {
      if ('ontouchstart' in window) {
        document.addEventListener('scroll', this[onScroll], true);
      }

      this.initialScrollOffset = {
        x: window.scrollX,
        y: window.scrollY
      };
    }
  }, {
    key: onDragStop,
    value: function value() {
      if ('ontouchstart' in window) {
        document.removeEventListener('scroll', this[onScroll], true);
      }

      this.initialScrollOffset = { x: 0, y: 0 };
      this.scrollOffset = { x: 0, y: 0 };
    }
  }, {
    key: onScroll,
    value: function value() {
      this.scrollOffset = {
        x: window.scrollX - this.initialScrollOffset.x,
        y: window.scrollY - this.initialScrollOffset.y
      };
    }

    /**
     * Mirror created handler
     * @param {MirrorCreatedEvent} mirrorEvent
     * @return {Promise}
     * @private
     */

  }, {
    key: onMirrorCreated,
    value: function value(_ref) {
      var _this2 = this;

      var mirror = _ref.mirror,
          source = _ref.source,
          sensorEvent = _ref.sensorEvent;

      var mirrorClass = this.draggable.getClassNameFor('mirror');

      var setState = function setState(_ref2) {
        var mirrorOffset = _ref2.mirrorOffset,
            initialX = _ref2.initialX,
            initialY = _ref2.initialY,
            args = (0, _objectWithoutProperties3.default)(_ref2, ['mirrorOffset', 'initialX', 'initialY']);

        _this2.mirrorOffset = mirrorOffset;
        _this2.initialX = initialX;
        _this2.initialY = initialY;
        return Object.assign({ mirrorOffset: mirrorOffset, initialX: initialX, initialY: initialY }, args);
      };

      var initialState = {
        mirror: mirror,
        source: source,
        sensorEvent: sensorEvent,
        mirrorClass: mirrorClass,
        scrollOffset: this.scrollOffset,
        options: this.options
      };

      return Promise.resolve(initialState)
      // Fix reflow here
      .then(computeMirrorDimensions).then(calculateMirrorOffset).then(resetMirror).then(addMirrorClasses).then(positionMirror({ initial: true })).then(removeMirrorID).then(setState);
    }

    /**
     * Mirror move handler
     * @param {MirrorMoveEvent} mirrorEvent
     * @return {Promise}
     * @private
     */

  }, {
    key: onMirrorMove,
    value: function value(_ref3) {
      var mirror = _ref3.mirror,
          sensorEvent = _ref3.sensorEvent;

      var initialState = {
        mirror: mirror,
        sensorEvent: sensorEvent,
        mirrorOffset: this.mirrorOffset,
        options: this.options,
        initialX: this.initialX,
        initialY: this.initialY,
        scrollOffset: this.scrollOffset
      };

      return Promise.resolve(initialState).then(positionMirror({ raf: true }));
    }
  }]);
  return Mirror;
}(_AbstractPlugin3.default);

/**
 * Computes mirror dimensions based on the source element
 * Adds sourceRect to state
 * @param {Object} state
 * @param {HTMLElement} state.source
 * @return {Promise}
 * @private
 */


exports.default = Mirror;
function computeMirrorDimensions(_ref4) {
  var source = _ref4.source,
      args = (0, _objectWithoutProperties3.default)(_ref4, ['source']);

  return withPromise(function (resolve) {
    var sourceRect = source.getBoundingClientRect();
    resolve(Object.assign({ source: source, sourceRect: sourceRect }, args));
  });
}

/**
 * Calculates mirror offset
 * Adds mirrorOffset to state
 * @param {Object} state
 * @param {SensorEvent} state.sensorEvent
 * @param {DOMRect} state.sourceRect
 * @return {Promise}
 * @private
 */
function calculateMirrorOffset(_ref5) {
  var sensorEvent = _ref5.sensorEvent,
      sourceRect = _ref5.sourceRect,
      options = _ref5.options,
      args = (0, _objectWithoutProperties3.default)(_ref5, ['sensorEvent', 'sourceRect', 'options']);

  return withPromise(function (resolve) {
    var top = options.cursorOffsetY === null ? sensorEvent.clientY - sourceRect.top : options.cursorOffsetY;
    var left = options.cursorOffsetX === null ? sensorEvent.clientX - sourceRect.left : options.cursorOffsetX;

    var mirrorOffset = { top: top, left: left };

    resolve(Object.assign({ sensorEvent: sensorEvent, sourceRect: sourceRect, mirrorOffset: mirrorOffset, options: options }, args));
  });
}

/**
 * Applys mirror styles
 * @param {Object} state
 * @param {HTMLElement} state.mirror
 * @param {HTMLElement} state.source
 * @param {Object} state.options
 * @return {Promise}
 * @private
 */
function resetMirror(_ref6) {
  var mirror = _ref6.mirror,
      source = _ref6.source,
      options = _ref6.options,
      args = (0, _objectWithoutProperties3.default)(_ref6, ['mirror', 'source', 'options']);

  return withPromise(function (resolve) {
    var offsetHeight = void 0;
    var offsetWidth = void 0;

    if (options.constrainDimensions) {
      var computedSourceStyles = getComputedStyle(source);
      offsetHeight = computedSourceStyles.getPropertyValue('height');
      offsetWidth = computedSourceStyles.getPropertyValue('width');
    }

    mirror.style.position = 'fixed';
    mirror.style.pointerEvents = 'none';
    mirror.style.top = 0;
    mirror.style.left = 0;
    mirror.style.margin = 0;

    if (options.constrainDimensions) {
      mirror.style.height = offsetHeight;
      mirror.style.width = offsetWidth;
    }

    resolve(Object.assign({ mirror: mirror, source: source, options: options }, args));
  });
}

/**
 * Applys mirror class on mirror element
 * @param {Object} state
 * @param {HTMLElement} state.mirror
 * @param {String} state.mirrorClass
 * @return {Promise}
 * @private
 */
function addMirrorClasses(_ref7) {
  var mirror = _ref7.mirror,
      mirrorClass = _ref7.mirrorClass,
      args = (0, _objectWithoutProperties3.default)(_ref7, ['mirror', 'mirrorClass']);

  return withPromise(function (resolve) {
    mirror.classList.add(mirrorClass);
    resolve(Object.assign({ mirror: mirror, mirrorClass: mirrorClass }, args));
  });
}

/**
 * Removes source ID from cloned mirror element
 * @param {Object} state
 * @param {HTMLElement} state.mirror
 * @return {Promise}
 * @private
 */
function removeMirrorID(_ref8) {
  var mirror = _ref8.mirror,
      args = (0, _objectWithoutProperties3.default)(_ref8, ['mirror']);

  return withPromise(function (resolve) {
    mirror.removeAttribute('id');
    delete mirror.id;
    resolve(Object.assign({ mirror: mirror }, args));
  });
}

/**
 * Positions mirror with translate3d
 * @param {Object} state
 * @param {HTMLElement} state.mirror
 * @param {SensorEvent} state.sensorEvent
 * @param {Object} state.mirrorOffset
 * @param {Number} state.initialY
 * @param {Number} state.initialX
 * @param {Object} state.options
 * @return {Promise}
 * @private
 */
function positionMirror() {
  var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref9$withFrame = _ref9.withFrame,
      withFrame = _ref9$withFrame === undefined ? false : _ref9$withFrame,
      _ref9$initial = _ref9.initial,
      initial = _ref9$initial === undefined ? false : _ref9$initial;

  return function (_ref10) {
    var mirror = _ref10.mirror,
        sensorEvent = _ref10.sensorEvent,
        mirrorOffset = _ref10.mirrorOffset,
        initialY = _ref10.initialY,
        initialX = _ref10.initialX,
        scrollOffset = _ref10.scrollOffset,
        options = _ref10.options,
        args = (0, _objectWithoutProperties3.default)(_ref10, ['mirror', 'sensorEvent', 'mirrorOffset', 'initialY', 'initialX', 'scrollOffset', 'options']);

    return withPromise(function (resolve) {
      var result = Object.assign({
        mirror: mirror,
        sensorEvent: sensorEvent,
        mirrorOffset: mirrorOffset,
        options: options
      }, args);

      if (mirrorOffset) {
        var x = sensorEvent.clientX - mirrorOffset.left - scrollOffset.x;
        var y = sensorEvent.clientY - mirrorOffset.top - scrollOffset.y;

        if (options.xAxis && options.yAxis || initial) {
          mirror.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
        } else if (options.xAxis && !options.yAxis) {
          mirror.style.transform = 'translate3d(' + x + 'px, ' + initialY + 'px, 0)';
        } else if (options.yAxis && !options.xAxis) {
          mirror.style.transform = 'translate3d(' + initialX + 'px, ' + y + 'px, 0)';
        }

        if (initial) {
          result.initialX = x;
          result.initialY = y;
        }
      }

      resolve(result);
    }, { frame: withFrame });
  };
}

/**
 * Wraps functions in promise with potential animation frame option
 * @param {Function} callback
 * @param {Object} options
 * @param {Boolean} options.raf
 * @return {Promise}
 * @private
 */
function withPromise(callback) {
  var _ref11 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref11$raf = _ref11.raf,
      raf = _ref11$raf === undefined ? false : _ref11$raf;

  return new Promise(function (resolve, reject) {
    if (raf) {
      requestAnimationFrame(function () {
        callback(resolve, reject);
      });
    } else {
      callback(resolve, reject);
    }
  });
}

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * All draggable plugins inherit from this class.
 * @abstract
 * @class AbstractPlugin
 * @module AbstractPlugin
 */
var AbstractPlugin = function () {

  /**
   * AbstractPlugin constructor.
   * @constructs AbstractPlugin
   * @param {Draggable} draggable - Draggable instance
   */
  function AbstractPlugin(draggable) {
    (0, _classCallCheck3.default)(this, AbstractPlugin);


    /**
     * Draggable instance
     * @property draggable
     * @type {Draggable}
     */
    this.draggable = draggable;
  }

  /**
   * Override to add listeners
   * @abstract
   */


  (0, _createClass3.default)(AbstractPlugin, [{
    key: 'attach',
    value: function attach() {
      throw new Error('Not Implemented');
    }

    /**
     * Override to remove listeners
     * @abstract
     */

  }, {
    key: 'detach',
    value: function detach() {
      throw new Error('Not Implemented');
    }
  }]);
  return AbstractPlugin;
}();

exports.default = AbstractPlugin;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = undefined;

var _Announcement = __webpack_require__(125);

var _Announcement2 = _interopRequireDefault(_Announcement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Announcement2.default;
exports.defaultOptions = _Announcement.defaultOptions;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractPlugin2 = __webpack_require__(24);

var _AbstractPlugin3 = _interopRequireDefault(_AbstractPlugin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onInitialize = Symbol('onInitialize');
var onDestroy = Symbol('onDestroy');
var announceEvent = Symbol('announceEvent');
var announceMessage = Symbol('announceMessage');

var ARIA_RELEVANT = 'aria-relevant';
var ARIA_ATOMIC = 'aria-atomic';
var ARIA_LIVE = 'aria-live';
var ROLE = 'role';

/**
 * Announcement default options
 * @property {Object} defaultOptions
 * @property {Number} defaultOptions.expire
 * @type {Object}
 */
var defaultOptions = exports.defaultOptions = {
  expire: 7000
};

/**
 * Announcement plugin
 * @class Announcement
 * @module Announcement
 * @extends AbstractPlugin
 */

var Announcement = function (_AbstractPlugin) {
  (0, _inherits3.default)(Announcement, _AbstractPlugin);

  /**
   * Announcement constructor.
   * @constructs Announcement
   * @param {Draggable} draggable - Draggable instance
   */
  function Announcement(draggable) {
    (0, _classCallCheck3.default)(this, Announcement);

    /**
     * Plugin options
     * @property options
     * @type {Object}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (Announcement.__proto__ || Object.getPrototypeOf(Announcement)).call(this, draggable));

    _this.options = Object.assign({}, defaultOptions, _this.getOptions());

    /**
     * Original draggable trigger method. Hack until we have onAll or on('all')
     * @property originalTriggerMethod
     * @type {Function}
     */
    _this.originalTriggerMethod = _this.draggable.trigger;

    _this[onInitialize] = _this[onInitialize].bind(_this);
    _this[onDestroy] = _this[onDestroy].bind(_this);
    return _this;
  }

  /**
   * Attaches listeners to draggable
   */


  (0, _createClass3.default)(Announcement, [{
    key: 'attach',
    value: function attach() {
      this.draggable.on('draggable:initialize', this[onInitialize]);
    }

    /**
     * Detaches listeners from draggable
     */

  }, {
    key: 'detach',
    value: function detach() {
      this.draggable.off('draggable:destroy', this[onDestroy]);
    }

    /**
     * Returns passed in options
     */

  }, {
    key: 'getOptions',
    value: function getOptions() {
      return this.draggable.options.announcements || {};
    }

    /**
     * Announces event
     * @private
     * @param {AbstractEvent} event
     */

  }, {
    key: announceEvent,
    value: function value(event) {
      var message = this.options[event.type];

      if (message && typeof message === 'string') {
        this[announceMessage](message);
      }

      if (message && typeof message === 'function') {
        this[announceMessage](message(event));
      }
    }

    /**
     * Announces message to screen reader
     * @private
     * @param {String} message
     */

  }, {
    key: announceMessage,
    value: function value(message) {
      announce(message, { expire: this.options.expire });
    }

    /**
     * Initialize hander
     * @private
     */

  }, {
    key: onInitialize,
    value: function value() {
      var _this2 = this;

      // Hack until there is an api for listening for all events
      this.draggable.trigger = function (event) {
        try {
          _this2[announceEvent](event);
        } finally {
          // Ensure that original trigger is called
          _this2.originalTriggerMethod.call(_this2.draggable, event);
        }
      };
    }

    /**
     * Destroy hander
     * @private
     */

  }, {
    key: onDestroy,
    value: function value() {
      this.draggable.trigger = this.originalTriggerMethod;
    }
  }]);
  return Announcement;
}(_AbstractPlugin3.default);

/**
 * @const {HTMLElement} liveRegion
 */


exports.default = Announcement;
var liveRegion = createRegion();

/**
 * Announces message via live region
 * @param {String} message
 * @param {Object} options
 * @param {Number} options.expire
 */
function announce(message, _ref) {
  var expire = _ref.expire;

  var element = document.createElement('div');
  element.innerHTML = message;
  liveRegion.appendChild(element);
  return setTimeout(function () {
    liveRegion.removeChild(element);
  }, expire);
}

/**
 * Creates region element
 * @return {HTMLElement}
 */
function createRegion() {
  var element = document.createElement('div');

  element.setAttribute('id', 'draggable-live-region');
  element.setAttribute(ARIA_RELEVANT, 'additions');
  element.setAttribute(ARIA_ATOMIC, 'true');
  element.setAttribute(ARIA_LIVE, 'assertive');
  element.setAttribute(ROLE, 'log');

  element.style.position = 'fixed';
  element.style.width = '1px';
  element.style.height = '1px';
  element.style.top = '-1px';
  element.style.overflow = 'hidden';

  return element;
}

// Append live region element as early as possible
document.addEventListener('DOMContentLoaded', function () {
  document.body.appendChild(liveRegion);
});

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = undefined;

var _Scrollable = __webpack_require__(127);

var _Scrollable2 = _interopRequireDefault(_Scrollable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Scrollable2.default;
exports.defaultOptions = _Scrollable.defaultOptions;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = exports.scroll = exports.onDragStop = exports.onDragMove = exports.onDragStart = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractPlugin2 = __webpack_require__(24);

var _AbstractPlugin3 = _interopRequireDefault(_AbstractPlugin2);

var _utils = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onDragStart = exports.onDragStart = Symbol('onDragStart');
var onDragMove = exports.onDragMove = Symbol('onDragMove');
var onDragStop = exports.onDragStop = Symbol('onDragStop');
var scroll = exports.scroll = Symbol('scroll');

/**
 * Scrollable default options
 * @property {Object} defaultOptions
 * @property {Number} defaultOptions.speed
 * @property {Number} defaultOptions.sensitivity
 * @property {HTMLElement[]} defaultOptions.scrollableElements
 * @type {Object}
 */
var defaultOptions = exports.defaultOptions = {
  speed: 10,
  sensitivity: 30,
  scrollableElements: []
};

/**
 * Scrollable plugin which scrolls the closest scrollable parent
 * @class Scrollable
 * @module Scrollable
 * @extends AbstractPlugin
 */

var Scrollable = function (_AbstractPlugin) {
  (0, _inherits3.default)(Scrollable, _AbstractPlugin);

  /**
   * Scrollable constructor.
   * @constructs Scrollable
   * @param {Draggable} draggable - Draggable instance
   */
  function Scrollable(draggable) {
    (0, _classCallCheck3.default)(this, Scrollable);

    /**
     * Scrollable options
     * @property {Object} options
     * @property {Number} options.speed
     * @property {Number} options.sensitivity
     * @property {HTMLElement[]} options.scrollableElements
     * @type {Object}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (Scrollable.__proto__ || Object.getPrototypeOf(Scrollable)).call(this, draggable));

    _this.options = Object.assign({}, defaultOptions, _this.getOptions());

    /**
     * Keeps current mouse position
     * @property {Object} currentMousePosition
     * @property {Number} currentMousePosition.clientX
     * @property {Number} currentMousePosition.clientY
     * @type {Object|null}
     */
    _this.currentMousePosition = null;

    /**
     * Scroll animation frame
     * @property scrollAnimationFrame
     * @type {Number|null}
     */
    _this.scrollAnimationFrame = null;

    /**
     * Closest scrollable element
     * @property scrollableElement
     * @type {HTMLElement|null}
     */
    _this.scrollableElement = null;

    /**
     * Animation frame looking for the closest scrollable element
     * @property findScrollableElementFrame
     * @type {Number|null}
     */
    _this.findScrollableElementFrame = null;

    _this[onDragStart] = _this[onDragStart].bind(_this);
    _this[onDragMove] = _this[onDragMove].bind(_this);
    _this[onDragStop] = _this[onDragStop].bind(_this);
    _this[scroll] = _this[scroll].bind(_this);
    return _this;
  }

  /**
   * Attaches plugins event listeners
   */


  (0, _createClass3.default)(Scrollable, [{
    key: 'attach',
    value: function attach() {
      this.draggable.on('drag:start', this[onDragStart]).on('drag:move', this[onDragMove]).on('drag:stop', this[onDragStop]);
    }

    /**
     * Detaches plugins event listeners
     */

  }, {
    key: 'detach',
    value: function detach() {
      this.draggable.off('drag:start', this[onDragStart]).off('drag:move', this[onDragMove]).off('drag:stop', this[onDragStop]);
    }

    /**
     * Returns options passed through draggable
     * @return {Object}
     */

  }, {
    key: 'getOptions',
    value: function getOptions() {
      return this.draggable.options.scrollable || {};
    }

    /**
     * Returns closest scrollable elements by element
     * @param {HTMLElement} target
     * @return {HTMLElement}
     */

  }, {
    key: 'getScrollableElement',
    value: function getScrollableElement(target) {
      if (this.hasDefinedScrollableElements()) {
        return (0, _utils.closest)(target, this.options.scrollableElements) || document.documentElement;
      } else {
        return closestScrollableElement(target);
      }
    }

    /**
     * Returns true if at least one scrollable element have been defined via options
     * @param {HTMLElement} target
     * @return {Boolean}
     */

  }, {
    key: 'hasDefinedScrollableElements',
    value: function hasDefinedScrollableElements() {
      return Boolean(this.options.scrollableElements.length !== 0);
    }

    /**
     * Drag start handler. Finds closest scrollable parent in separate frame
     * @param {DragStartEvent} dragEvent
     * @private
     */

  }, {
    key: onDragStart,
    value: function value(dragEvent) {
      var _this2 = this;

      this.findScrollableElementFrame = requestAnimationFrame(function () {
        _this2.scrollableElement = _this2.getScrollableElement(dragEvent.source);
      });
    }

    /**
     * Drag move handler. Remembers mouse position and initiates scrolling
     * @param {DragMoveEvent} dragEvent
     * @private
     */

  }, {
    key: onDragMove,
    value: function value(dragEvent) {
      var _this3 = this;

      this.findScrollableElementFrame = requestAnimationFrame(function () {
        _this3.scrollableElement = _this3.getScrollableElement(dragEvent.sensorEvent.target);
      });

      if (!this.scrollableElement) {
        return;
      }

      var sensorEvent = dragEvent.sensorEvent;
      var scrollOffset = { x: 0, y: 0 };

      if ('ontouchstart' in window) {
        scrollOffset.y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        scrollOffset.x = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
      }

      this.currentMousePosition = {
        clientX: sensorEvent.clientX - scrollOffset.x,
        clientY: sensorEvent.clientY - scrollOffset.y
      };

      this.scrollAnimationFrame = requestAnimationFrame(this[scroll]);
    }

    /**
     * Drag stop handler. Cancels scroll animations and resets state
     * @private
     */

  }, {
    key: onDragStop,
    value: function value() {
      cancelAnimationFrame(this.scrollAnimationFrame);
      cancelAnimationFrame(this.findScrollableElementFrame);

      this.scrollableElement = null;
      this.scrollAnimationFrame = null;
      this.findScrollableElementFrame = null;
      this.currentMousePosition = null;
    }

    /**
     * Scroll function that does the heavylifting
     * @private
     */

  }, {
    key: scroll,
    value: function value() {
      if (!this.scrollableElement) {
        return;
      }

      cancelAnimationFrame(this.scrollAnimationFrame);

      var windowHeight = window.innerHeight;
      var windowWidth = window.innerWidth;
      var rect = this.scrollableElement.getBoundingClientRect();
      var right = rect.right,
          left = rect.left;

      var top = void 0;
      var bottom = void 0;

      if (rect.top < 0) {
        top = 0;
      } else {
        top = rect.top;
      }

      if (windowHeight < rect.bottom) {
        if (this.scrollableElement !== document.documentElement) {
          this.scrollableElement = this.getScrollableElement(this.scrollableElement.parentNode);
        }

        bottom = windowHeight;
      } else {
        bottom = rect.bottom;
      }

      var offsetY = (Math.abs(bottom - this.currentMousePosition.clientY) <= this.options.sensitivity) - (Math.abs(top - this.currentMousePosition.clientY) <= this.options.sensitivity);
      var offsetX = (Math.abs(right - this.currentMousePosition.clientX) <= this.options.sensitivity) - (Math.abs(left - this.currentMousePosition.clientX) <= this.options.sensitivity);

      if (!offsetX && !offsetY) {
        offsetX = (windowWidth - this.currentMousePosition.clientX <= this.options.sensitivity) - (this.currentMousePosition.clientX <= this.options.sensitivity);
        offsetY = (windowHeight - this.currentMousePosition.clientY <= this.options.sensitivity) - (this.currentMousePosition.clientY <= this.options.sensitivity);
      }

      this.scrollableElement.scrollTop += offsetY * this.options.speed;
      this.scrollableElement.scrollLeft += offsetX * this.options.speed;

      this.scrollAnimationFrame = requestAnimationFrame(this[scroll]);
    }
  }]);
  return Scrollable;
}(_AbstractPlugin3.default);

/**
 * Checks if element has overflow
 * @param {HTMLElement} element
 * @return {Boolean}
 * @private
 */


exports.default = Scrollable;
function hasOverflow(element) {
  var overflowRegex = /(auto|scroll)/;
  var computedStyles = getComputedStyle(element, null);

  var overflow = computedStyles.getPropertyValue('overflow') + computedStyles.getPropertyValue('overflow-y') + computedStyles.getPropertyValue('overflow-x');

  return overflowRegex.test(overflow);
}

/**
 * Finds closest scrollable element
 * @param {HTMLElement} element
 * @return {HTMLElement}
 * @private
 */
function closestScrollableElement(element) {
  var scrollableElement = (0, _utils.closest)(element, function (currentElement) {
    return hasOverflow(currentElement);
  });

  return scrollableElement || document.scrollingElement || document.documentElement || null;
}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Accessibility = __webpack_require__(129);

var _Accessibility2 = _interopRequireDefault(_Accessibility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Accessibility2.default;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractPlugin2 = __webpack_require__(24);

var _AbstractPlugin3 = _interopRequireDefault(_AbstractPlugin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ARIA_GRABBED = 'aria-grabbed';
var ARIA_DROPEFFECT = 'aria-dropeffect';
var TABINDEX = 'tabindex';

/**
 * __WIP__ Accessibility plugin
 * @class Accessibility
 * @module Accessibility
 * @extends AbstractPlugin
 */

var Accessibility = function (_AbstractPlugin) {
  (0, _inherits3.default)(Accessibility, _AbstractPlugin);

  /**
   * Accessibility constructor.
   * @constructs Accessibility
   * @param {Draggable} draggable - Draggable instance
   */
  function Accessibility(draggable) {
    (0, _classCallCheck3.default)(this, Accessibility);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Accessibility.__proto__ || Object.getPrototypeOf(Accessibility)).call(this, draggable));

    _this._onInit = _this._onInit.bind(_this);
    _this._onDestroy = _this._onDestroy.bind(_this);
    return _this;
  }

  /**
   * Attaches listeners to draggable
   */


  (0, _createClass3.default)(Accessibility, [{
    key: 'attach',
    value: function attach() {
      this.draggable.on('init', this._onInit).on('destroy', this._onDestroy).on('drag:start', _onDragStart).on('drag:stop', _onDragStop);
    }

    /**
     * Detaches listeners from draggable
     */

  }, {
    key: 'detach',
    value: function detach() {
      this.draggable.off('init', this._onInit).off('destroy', this._onDestroy).off('drag:start', _onDragStart).off('drag:stop', _onDragStop);
    }

    /**
     * Intialize handler
     * @private
     * @param {Object} param
     * @param {HTMLElement[]} param.containers
     */

  }, {
    key: '_onInit',
    value: function _onInit(_ref) {
      var containers = _ref.containers;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = containers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var container = _step.value;

          container.setAttribute(ARIA_DROPEFFECT, this.draggable.options.type);

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = container.querySelectorAll(this.draggable.options.draggable)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var element = _step2.value;

              element.setAttribute(TABINDEX, 0);
              element.setAttribute(ARIA_GRABBED, false);
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

    /**
     * Destroy handler handler
     * @private
     * @param {Object} param
     * @param {HTMLElement[]} param.containers
     */

  }, {
    key: '_onDestroy',
    value: function _onDestroy(_ref2) {
      var containers = _ref2.containers;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = containers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var container = _step3.value;

          container.removeAttribute(ARIA_DROPEFFECT);

          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = container.querySelectorAll(this.draggable.options.draggable)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var element = _step4.value;

              element.removeAttribute(TABINDEX, 0);
              element.removeAttribute(ARIA_GRABBED, false);
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
    }
  }]);
  return Accessibility;
}(_AbstractPlugin3.default);

exports.default = Accessibility;


function _onDragStart(_ref3) {
  var source = _ref3.source;

  source.setAttribute(ARIA_GRABBED, true);
}

function _onDragStop(_ref4) {
  var source = _ref4.source;

  source.setAttribute(ARIA_GRABBED, false);
}

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base sensor class. Extend from this class to create a new or custom sensor
 * @class Sensor
 * @module Sensor
 */
var Sensor = function () {

  /**
   * Sensor constructor.
   * @constructs Sensor
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Containers
   * @param {Object} options - Options
   */
  function Sensor() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, Sensor);


    /**
     * Current containers
     * @property containers
     * @type {HTMLElement[]}
     */
    this.containers = containers;

    /**
     * Current options
     * @property options
     * @type {Object}
     */
    this.options = Object.assign({}, options);

    /**
     * Current drag state
     * @property dragging
     * @type {Boolean}
     */
    this.dragging = false;

    /**
     * Current container
     * @property currentContainer
     * @type {HTMLElement}
     */
    this.currentContainer = null;
  }

  /**
   * Attaches sensors event listeners to the DOM
   * @return {Sensor}
   */


  (0, _createClass3.default)(Sensor, [{
    key: 'attach',
    value: function attach() {
      return this;
    }

    /**
     * Detaches sensors event listeners to the DOM
     * @return {Sensor}
     */

  }, {
    key: 'detach',
    value: function detach() {
      return this;
    }

    /**
     * Triggers event on target element
     * @param {HTMLElement} element - Element to trigger event on
     * @param {SensorEvent} sensorEvent - Sensor event to trigger
     */

  }, {
    key: 'trigger',
    value: function trigger(element, sensorEvent) {
      var event = document.createEvent('Event');
      event.detail = sensorEvent;
      event.initEvent(sensorEvent.type, true, true);
      element.dispatchEvent(event);
      this.lastEvent = sensorEvent;
      return sensorEvent;
    }
  }]);
  return Sensor;
}();

exports.default = Sensor;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MouseSensor = __webpack_require__(132);

var _MouseSensor2 = _interopRequireDefault(_MouseSensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _MouseSensor2.default;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = __webpack_require__(15);

var _Sensor2 = __webpack_require__(20);

var _Sensor3 = _interopRequireDefault(_Sensor2);

var _SensorEvent = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onContextMenuWhileDragging = Symbol('onContextMenuWhileDragging');
var onMouseDown = Symbol('onMouseDown');
var onMouseMove = Symbol('onMouseMove');
var onMouseUp = Symbol('onMouseUp');

/**
 * This sensor picks up native browser mouse events and dictates drag operations
 * @class MouseSensor
 * @module MouseSensor
 * @extends Sensor
 */

var MouseSensor = function (_Sensor) {
  (0, _inherits3.default)(MouseSensor, _Sensor);

  /**
   * MouseSensor constructor.
   * @constructs MouseSensor
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Containers
   * @param {Object} options - Options
   */
  function MouseSensor() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, MouseSensor);

    /**
     * Indicates if mouse button is still down
     * @property mouseDown
     * @type {Boolean}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (MouseSensor.__proto__ || Object.getPrototypeOf(MouseSensor)).call(this, containers, options));

    _this.mouseDown = false;

    /**
     * Mouse down timer which will end up triggering the drag start operation
     * @property mouseDownTimeout
     * @type {Number}
     */
    _this.mouseDownTimeout = null;

    /**
     * Indicates if context menu has been opened during drag operation
     * @property openedContextMenu
     * @type {Boolean}
     */
    _this.openedContextMenu = false;

    _this[onContextMenuWhileDragging] = _this[onContextMenuWhileDragging].bind(_this);
    _this[onMouseDown] = _this[onMouseDown].bind(_this);
    _this[onMouseMove] = _this[onMouseMove].bind(_this);
    _this[onMouseUp] = _this[onMouseUp].bind(_this);
    return _this;
  }

  /**
   * Attaches sensors event listeners to the DOM
   */


  (0, _createClass3.default)(MouseSensor, [{
    key: 'attach',
    value: function attach() {
      document.addEventListener('mousedown', this[onMouseDown], true);
    }

    /**
     * Detaches sensors event listeners to the DOM
     */

  }, {
    key: 'detach',
    value: function detach() {
      document.removeEventListener('mousedown', this[onMouseDown], true);
    }

    /**
     * Mouse down handler
     * @private
     * @param {Event} event - Mouse down event
     */

  }, {
    key: onMouseDown,
    value: function value(event) {
      var _this2 = this;

      if (event.button !== 0 || event.ctrlKey || event.metaKey) {
        return;
      }

      document.addEventListener('mouseup', this[onMouseUp]);
      document.addEventListener('dragstart', preventNativeDragStart);

      var target = document.elementFromPoint(event.clientX, event.clientY);
      var container = (0, _utils.closest)(target, this.containers);

      if (!container) {
        return;
      }

      this.mouseDown = true;

      clearTimeout(this.mouseDownTimeout);
      this.mouseDownTimeout = setTimeout(function () {
        if (!_this2.mouseDown) {
          return;
        }

        var dragStartEvent = new _SensorEvent.DragStartSensorEvent({
          clientX: event.clientX,
          clientY: event.clientY,
          target: target,
          container: container,
          originalEvent: event
        });

        _this2.trigger(container, dragStartEvent);

        _this2.currentContainer = container;
        _this2.dragging = !dragStartEvent.canceled();

        if (_this2.dragging) {
          document.addEventListener('contextmenu', _this2[onContextMenuWhileDragging]);
          document.addEventListener('mousemove', _this2[onMouseMove]);
        }
      }, this.options.delay);
    }

    /**
     * Mouse move handler
     * @private
     * @param {Event} event - Mouse move event
     */

  }, {
    key: onMouseMove,
    value: function value(event) {
      if (!this.dragging) {
        return;
      }

      var target = document.elementFromPoint(event.clientX, event.clientY);

      var dragMoveEvent = new _SensorEvent.DragMoveSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragMoveEvent);
    }

    /**
     * Mouse up handler
     * @private
     * @param {Event} event - Mouse up event
     */

  }, {
    key: onMouseUp,
    value: function value(event) {
      this.mouseDown = Boolean(this.openedContextMenu);

      if (this.openedContextMenu) {
        this.openedContextMenu = false;
        return;
      }

      document.removeEventListener('mouseup', this[onMouseUp]);
      document.removeEventListener('dragstart', preventNativeDragStart);

      if (!this.dragging) {
        return;
      }

      var target = document.elementFromPoint(event.clientX, event.clientY);

      var dragStopEvent = new _SensorEvent.DragStopSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragStopEvent);

      document.removeEventListener('contextmenu', this[onContextMenuWhileDragging]);
      document.removeEventListener('mousemove', this[onMouseMove]);

      this.currentContainer = null;
      this.dragging = false;
    }

    /**
     * Context menu handler
     * @private
     * @param {Event} event - Context menu event
     */

  }, {
    key: onContextMenuWhileDragging,
    value: function value(event) {
      event.preventDefault();
      this.openedContextMenu = true;
    }
  }]);
  return MouseSensor;
}(_Sensor3.default);

exports.default = MouseSensor;


function preventNativeDragStart(event) {
  event.preventDefault();
}

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragPressureSensorEvent = exports.DragStopSensorEvent = exports.DragMoveSensorEvent = exports.DragStartSensorEvent = exports.SensorEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractEvent2 = __webpack_require__(19);

var _AbstractEvent3 = _interopRequireDefault(_AbstractEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base sensor event
 * @class SensorEvent
 * @module SensorEvent
 * @extends AbstractEvent
 */
var SensorEvent = exports.SensorEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(SensorEvent, _AbstractEvent);

  function SensorEvent() {
    (0, _classCallCheck3.default)(this, SensorEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SensorEvent.__proto__ || Object.getPrototypeOf(SensorEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(SensorEvent, [{
    key: 'originalEvent',


    /**
     * Original browser event that triggered a sensor
     * @property originalEvent
     * @type {Event}
     * @readonly
     */
    get: function get() {
      return this.data.originalEvent;
    }

    /**
     * Normalized clientX for both touch and mouse events
     * @property clientX
     * @type {Number}
     * @readonly
     */

  }, {
    key: 'clientX',
    get: function get() {
      return this.data.clientX;
    }

    /**
     * Normalized clientY for both touch and mouse events
     * @property clientY
     * @type {Number}
     * @readonly
     */

  }, {
    key: 'clientY',
    get: function get() {
      return this.data.clientY;
    }

    /**
     * Normalized target for both touch and mouse events
     * Returns the element that is behind cursor or touch pointer
     * @property target
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'target',
    get: function get() {
      return this.data.target;
    }

    /**
     * Container that initiated the sensor
     * @property container
     * @type {HTMLElement}
     * @readonly
     */

  }, {
    key: 'container',
    get: function get() {
      return this.data.container;
    }

    /**
     * Trackpad pressure
     * @property pressure
     * @type {Number}
     * @readonly
     */

  }, {
    key: 'pressure',
    get: function get() {
      return this.data.pressure;
    }
  }]);
  return SensorEvent;
}(_AbstractEvent3.default);

/**
 * Drag start sensor event
 * @class DragStartSensorEvent
 * @module DragStartSensorEvent
 * @extends SensorEvent
 */


var DragStartSensorEvent = exports.DragStartSensorEvent = function (_SensorEvent) {
  (0, _inherits3.default)(DragStartSensorEvent, _SensorEvent);

  function DragStartSensorEvent() {
    (0, _classCallCheck3.default)(this, DragStartSensorEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragStartSensorEvent.__proto__ || Object.getPrototypeOf(DragStartSensorEvent)).apply(this, arguments));
  }

  return DragStartSensorEvent;
}(SensorEvent);

/**
 * Drag move sensor event
 * @class DragMoveSensorEvent
 * @module DragMoveSensorEvent
 * @extends SensorEvent
 */


DragStartSensorEvent.type = 'drag:start';

var DragMoveSensorEvent = exports.DragMoveSensorEvent = function (_SensorEvent2) {
  (0, _inherits3.default)(DragMoveSensorEvent, _SensorEvent2);

  function DragMoveSensorEvent() {
    (0, _classCallCheck3.default)(this, DragMoveSensorEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragMoveSensorEvent.__proto__ || Object.getPrototypeOf(DragMoveSensorEvent)).apply(this, arguments));
  }

  return DragMoveSensorEvent;
}(SensorEvent);

/**
 * Drag stop sensor event
 * @class DragStopSensorEvent
 * @module DragStopSensorEvent
 * @extends SensorEvent
 */


DragMoveSensorEvent.type = 'drag:move';

var DragStopSensorEvent = exports.DragStopSensorEvent = function (_SensorEvent3) {
  (0, _inherits3.default)(DragStopSensorEvent, _SensorEvent3);

  function DragStopSensorEvent() {
    (0, _classCallCheck3.default)(this, DragStopSensorEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragStopSensorEvent.__proto__ || Object.getPrototypeOf(DragStopSensorEvent)).apply(this, arguments));
  }

  return DragStopSensorEvent;
}(SensorEvent);

/**
 * Drag pressure sensor event
 * @class DragPressureSensorEvent
 * @module DragPressureSensorEvent
 * @extends SensorEvent
 */


DragStopSensorEvent.type = 'drag:stop';

var DragPressureSensorEvent = exports.DragPressureSensorEvent = function (_SensorEvent4) {
  (0, _inherits3.default)(DragPressureSensorEvent, _SensorEvent4);

  function DragPressureSensorEvent() {
    (0, _classCallCheck3.default)(this, DragPressureSensorEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragPressureSensorEvent.__proto__ || Object.getPrototypeOf(DragPressureSensorEvent)).apply(this, arguments));
  }

  return DragPressureSensorEvent;
}(SensorEvent);

DragPressureSensorEvent.type = 'drag:pressure';

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TouchSensor = __webpack_require__(135);

var _TouchSensor2 = _interopRequireDefault(_TouchSensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _TouchSensor2.default;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = __webpack_require__(15);

var _Sensor2 = __webpack_require__(20);

var _Sensor3 = _interopRequireDefault(_Sensor2);

var _SensorEvent = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onTouchStart = Symbol('onTouchStart');
var onTouchHold = Symbol('onTouchHold');
var onTouchEnd = Symbol('onTouchEnd');
var onTouchMove = Symbol('onTouchMove');
var onScroll = Symbol('onScroll');

/**
 * Adds default document.ontouchmove. Workaround for preventing scrolling on touchmove
 */
document.ontouchmove = document.ontouchmove || function () {
  return true;
};

/**
 * This sensor picks up native browser touch events and dictates drag operations
 * @class TouchSensor
 * @module TouchSensor
 * @extends Sensor
 */

var TouchSensor = function (_Sensor) {
  (0, _inherits3.default)(TouchSensor, _Sensor);

  /**
   * TouchSensor constructor.
   * @constructs TouchSensor
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Containers
   * @param {Object} options - Options
   */
  function TouchSensor() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, TouchSensor);

    /**
     * Closest scrollable container so accidental scroll can cancel long touch
     * @property currentScrollableParent
     * @type {HTMLElement}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (TouchSensor.__proto__ || Object.getPrototypeOf(TouchSensor)).call(this, containers, options));

    _this.currentScrollableParent = null;

    /**
     * TimeoutID for long touch
     * @property tapTimeout
     * @type {Number}
     */
    _this.tapTimeout = null;

    /**
     * touchMoved indicates if touch has moved during tapTimeout
     * @property touchMoved
     * @type {Boolean}
     */
    _this.touchMoved = false;

    _this[onTouchStart] = _this[onTouchStart].bind(_this);
    _this[onTouchHold] = _this[onTouchHold].bind(_this);
    _this[onTouchEnd] = _this[onTouchEnd].bind(_this);
    _this[onTouchMove] = _this[onTouchMove].bind(_this);
    _this[onScroll] = _this[onScroll].bind(_this);
    return _this;
  }

  /**
   * Attaches sensors event listeners to the DOM
   */


  (0, _createClass3.default)(TouchSensor, [{
    key: 'attach',
    value: function attach() {
      document.addEventListener('touchstart', this[onTouchStart]);
    }

    /**
     * Detaches sensors event listeners to the DOM
     */

  }, {
    key: 'detach',
    value: function detach() {
      document.removeEventListener('touchstart', this[onTouchStart]);
    }

    /**
     * Touch start handler
     * @private
     * @param {Event} event - Touch start event
     */

  }, {
    key: onTouchStart,
    value: function value(event) {
      var container = (0, _utils.closest)(event.target, this.containers);

      if (!container) {
        return;
      }

      document.addEventListener('touchmove', this[onTouchMove], { passive: false });
      document.addEventListener('touchend', this[onTouchEnd]);
      document.addEventListener('touchcancel', this[onTouchEnd]);

      // detect if body is scrolling on iOS
      document.addEventListener('scroll', this[onScroll]);
      container.addEventListener('contextmenu', onContextMenu);

      this.currentContainer = container;

      this.currentScrollableParent = (0, _utils.closest)(container, function (element) {
        return element.offsetHeight < element.scrollHeight;
      });

      if (this.currentScrollableParent) {
        this.currentScrollableParent.addEventListener('scroll', this[onScroll]);
      }

      this.tapTimeout = setTimeout(this[onTouchHold](event, container), this.options.delay);
    }

    /**
     * Touch hold handler
     * @private
     * @param {Event} event - Touch start event
     * @param {HTMLElement} container - Container element
     */

  }, {
    key: onTouchHold,
    value: function value(event, container) {
      var _this2 = this;

      return function () {
        if (_this2.touchMoved) {
          return;
        }

        var touch = event.touches[0] || event.changedTouches[0];
        var target = event.target;

        var dragStartEvent = new _SensorEvent.DragStartSensorEvent({
          clientX: touch.pageX,
          clientY: touch.pageY,
          target: target,
          container: container,
          originalEvent: event
        });

        _this2.trigger(container, dragStartEvent);

        _this2.dragging = !dragStartEvent.canceled();
      };
    }

    /**
     * Touch move handler
     * @private
     * @param {Event} event - Touch move event
     */

  }, {
    key: onTouchMove,
    value: function value(event) {
      this.touchMoved = true;

      if (!this.dragging) {
        return;
      }

      // Cancels scrolling while dragging
      event.preventDefault();
      event.stopPropagation();

      var touch = event.touches[0] || event.changedTouches[0];
      var target = document.elementFromPoint(touch.pageX - window.scrollX, touch.pageY - window.scrollY);

      var dragMoveEvent = new _SensorEvent.DragMoveSensorEvent({
        clientX: touch.pageX,
        clientY: touch.pageY,
        target: target,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragMoveEvent);
    }

    /**
     * Touch end handler
     * @private
     * @param {Event} event - Touch end event
     */

  }, {
    key: onTouchEnd,
    value: function value(event) {
      this.touchMoved = false;

      document.removeEventListener('touchend', this[onTouchEnd]);
      document.removeEventListener('touchcancel', this[onTouchEnd]);
      document.removeEventListener('touchmove', this[onTouchMove], { passive: false });

      document.removeEventListener('scroll', this[onScroll]);

      if (this.currentContainer) {
        this.currentContainer.removeEventListener('contextmenu', onContextMenu);
      }

      if (this.currentScrollableParent) {
        this.currentScrollableParent.removeEventListener('scroll', this[onScroll]);
      }

      clearTimeout(this.tapTimeout);

      if (!this.dragging) {
        return;
      }

      var touch = event.touches[0] || event.changedTouches[0];
      var target = document.elementFromPoint(touch.pageX - window.scrollX, touch.pageY - window.scrollY);

      event.preventDefault();

      var dragStopEvent = new _SensorEvent.DragStopSensorEvent({
        clientX: touch.pageX,
        clientY: touch.pageY,
        target: target,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragStopEvent);

      this.currentContainer = null;
      this.dragging = false;
    }

    /**
     * Scroll handler, cancel potential drag and allow scroll on iOS or other touch devices
     * @private
     */

  }, {
    key: onScroll,
    value: function value() {
      clearTimeout(this.tapTimeout);
    }
  }]);
  return TouchSensor;
}(_Sensor3.default);

exports.default = TouchSensor;


function onContextMenu(event) {
  event.preventDefault();
  event.stopPropagation();
}

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DragSensor = __webpack_require__(137);

var _DragSensor2 = _interopRequireDefault(_DragSensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _DragSensor2.default;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _utils = __webpack_require__(15);

var _Sensor2 = __webpack_require__(20);

var _Sensor3 = _interopRequireDefault(_Sensor2);

var _SensorEvent = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onMouseDown = Symbol('onMouseDown');
var onMouseUp = Symbol('onMouseUp');
var onDragStart = Symbol('onDragStart');
var onDragOver = Symbol('onDragOver');
var onDragEnd = Symbol('onDragEnd');
var onDrop = Symbol('onDrop');
var reset = Symbol('reset');

/**
 * This sensor picks up native browser drag events and dictates drag operations
 * @class DragSensor
 * @module DragSensor
 * @extends Sensor
 */

var DragSensor = function (_Sensor) {
  (0, _inherits3.default)(DragSensor, _Sensor);

  /**
   * DragSensor constructor.
   * @constructs DragSensor
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Containers
   * @param {Object} options - Options
   */
  function DragSensor() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, DragSensor);

    /**
     * Mouse down timer which will end up setting the draggable attribute, unless canceled
     * @property mouseDownTimeout
     * @type {Number}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (DragSensor.__proto__ || Object.getPrototypeOf(DragSensor)).call(this, containers, options));

    _this.mouseDownTimeout = null;

    /**
     * Draggable element needs to be remembered to unset the draggable attribute after drag operation has completed
     * @property draggableElement
     * @type {HTMLElement}
     */
    _this.draggableElement = null;

    /**
     * Native draggable element could be links or images, their draggable state will be disabled during drag operation
     * @property nativeDraggableElement
     * @type {HTMLElement}
     */
    _this.nativeDraggableElement = null;

    _this[onMouseDown] = _this[onMouseDown].bind(_this);
    _this[onMouseUp] = _this[onMouseUp].bind(_this);
    _this[onDragStart] = _this[onDragStart].bind(_this);
    _this[onDragOver] = _this[onDragOver].bind(_this);
    _this[onDragEnd] = _this[onDragEnd].bind(_this);
    _this[onDrop] = _this[onDrop].bind(_this);
    return _this;
  }

  /**
   * Attaches sensors event listeners to the DOM
   */


  (0, _createClass3.default)(DragSensor, [{
    key: 'attach',
    value: function attach() {
      document.addEventListener('mousedown', this[onMouseDown], true);
    }

    /**
     * Detaches sensors event listeners to the DOM
     */

  }, {
    key: 'detach',
    value: function detach() {
      document.removeEventListener('mousedown', this[onMouseDown], true);
    }

    /**
     * Drag start handler
     * @private
     * @param {Event} event - Drag start event
     */

  }, {
    key: onDragStart,
    value: function value(event) {
      var _this2 = this;

      // Need for firefox. "text" key is needed for IE
      event.dataTransfer.setData('text', '');
      event.dataTransfer.effectAllowed = this.options.type;

      var target = document.elementFromPoint(event.clientX, event.clientY);
      this.currentContainer = (0, _utils.closest)(event.target, this.containers);

      if (!this.currentContainer) {
        return;
      }

      var dragStartEvent = new _SensorEvent.DragStartSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: this.currentContainer,
        originalEvent: event
      });

      // Workaround
      setTimeout(function () {
        _this2.trigger(_this2.currentContainer, dragStartEvent);

        if (dragStartEvent.canceled()) {
          _this2.dragging = false;
        } else {
          _this2.dragging = true;
        }
      }, 0);
    }

    /**
     * Drag over handler
     * @private
     * @param {Event} event - Drag over event
     */

  }, {
    key: onDragOver,
    value: function value(event) {
      if (!this.dragging) {
        return;
      }

      var target = document.elementFromPoint(event.clientX, event.clientY);
      var container = this.currentContainer;

      var dragMoveEvent = new _SensorEvent.DragMoveSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: container,
        originalEvent: event
      });

      this.trigger(container, dragMoveEvent);

      if (!dragMoveEvent.canceled()) {
        event.preventDefault();
        event.dataTransfer.dropEffect = this.options.type;
      }
    }

    /**
     * Drag end handler
     * @private
     * @param {Event} event - Drag end event
     */

  }, {
    key: onDragEnd,
    value: function value(event) {
      if (!this.dragging) {
        return;
      }

      document.removeEventListener('mouseup', this[onMouseUp], true);

      var target = document.elementFromPoint(event.clientX, event.clientY);
      var container = this.currentContainer;

      var dragStopEvent = new _SensorEvent.DragStopSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: container,
        originalEvent: event
      });

      this.trigger(container, dragStopEvent);

      this.dragging = false;

      this[reset]();
    }

    /**
     * Drop handler
     * @private
     * @param {Event} event - Drop event
     */

  }, {
    key: onDrop,
    value: function value(event) {
      // eslint-disable-line class-methods-use-this
      event.preventDefault();
    }

    /**
     * Mouse down handler
     * @private
     * @param {Event} event - Mouse down event
     */

  }, {
    key: onMouseDown,
    value: function value(event) {
      var _this3 = this;

      // Firefox bug for inputs within draggables https://bugzilla.mozilla.org/show_bug.cgi?id=739071
      if (event.target && (event.target.form || event.target.contenteditable)) {
        return;
      }

      var nativeDraggableElement = (0, _utils.closest)(event.target, function (element) {
        return element.draggable;
      });

      if (nativeDraggableElement) {
        nativeDraggableElement.draggable = false;
        this.nativeDraggableElement = nativeDraggableElement;
      }

      document.addEventListener('mouseup', this[onMouseUp], true);
      document.addEventListener('dragstart', this[onDragStart], false);
      document.addEventListener('dragover', this[onDragOver], false);
      document.addEventListener('dragend', this[onDragEnd], false);
      document.addEventListener('drop', this[onDrop], false);

      var target = (0, _utils.closest)(event.target, this.options.draggable);

      if (!target) {
        return;
      }

      this.mouseDownTimeout = setTimeout(function () {
        target.draggable = true;
        _this3.draggableElement = target;
      }, this.options.delay);
    }

    /**
     * Mouse up handler
     * @private
     * @param {Event} event - Mouse up event
     */

  }, {
    key: onMouseUp,
    value: function value() {
      this[reset]();
    }

    /**
     * Mouse up handler
     * @private
     * @param {Event} event - Mouse up event
     */

  }, {
    key: reset,
    value: function value() {
      clearTimeout(this.mouseDownTimeout);

      document.removeEventListener('mouseup', this[onMouseUp], true);
      document.removeEventListener('dragstart', this[onDragStart], false);
      document.removeEventListener('dragover', this[onDragOver], false);
      document.removeEventListener('dragend', this[onDragEnd], false);
      document.removeEventListener('drop', this[onDrop], false);

      if (this.nativeDraggableElement) {
        this.nativeDraggableElement.draggable = true;
        this.nativeDraggableElement = null;
      }

      if (this.draggableElement) {
        this.draggableElement.draggable = false;
        this.draggableElement = null;
      }
    }
  }]);
  return DragSensor;
}(_Sensor3.default);

exports.default = DragSensor;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ForceTouchSensor = __webpack_require__(139);

var _ForceTouchSensor2 = _interopRequireDefault(_ForceTouchSensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ForceTouchSensor2.default;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(2);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Sensor2 = __webpack_require__(20);

var _Sensor3 = _interopRequireDefault(_Sensor2);

var _SensorEvent = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onMouseForceWillBegin = Symbol('onMouseForceWillBegin');
var onMouseForceDown = Symbol('onMouseForceDown');
var onMouseDown = Symbol('onMouseDown');
var onMouseForceChange = Symbol('onMouseForceChange');
var onMouseMove = Symbol('onMouseMove');
var onMouseUp = Symbol('onMouseUp');
var onMouseForceGlobalChange = Symbol('onMouseForceGlobalChange');

/**
 * This sensor picks up native force touch events and dictates drag operations
 * @class ForceTouchSensor
 * @module ForceTouchSensor
 * @extends Sensor
 */

var ForceTouchSensor = function (_Sensor) {
  (0, _inherits3.default)(ForceTouchSensor, _Sensor);

  /**
   * ForceTouchSensor constructor.
   * @constructs ForceTouchSensor
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Containers
   * @param {Object} options - Options
   */
  function ForceTouchSensor() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, ForceTouchSensor);

    /**
     * Draggable element needs to be remembered to unset the draggable attribute after drag operation has completed
     * @property mightDrag
     * @type {Boolean}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (ForceTouchSensor.__proto__ || Object.getPrototypeOf(ForceTouchSensor)).call(this, containers, options));

    _this.mightDrag = false;

    _this[onMouseForceWillBegin] = _this[onMouseForceWillBegin].bind(_this);
    _this[onMouseForceDown] = _this[onMouseForceDown].bind(_this);
    _this[onMouseDown] = _this[onMouseDown].bind(_this);
    _this[onMouseForceChange] = _this[onMouseForceChange].bind(_this);
    _this[onMouseMove] = _this[onMouseMove].bind(_this);
    _this[onMouseUp] = _this[onMouseUp].bind(_this);
    return _this;
  }

  /**
   * Attaches sensors event listeners to the DOM
   */


  (0, _createClass3.default)(ForceTouchSensor, [{
    key: 'attach',
    value: function attach() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.containers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var container = _step.value;

          container.addEventListener('webkitmouseforcewillbegin', this[onMouseForceWillBegin], false);
          container.addEventListener('webkitmouseforcedown', this[onMouseForceDown], false);
          container.addEventListener('mousedown', this[onMouseDown], true);
          container.addEventListener('webkitmouseforcechanged', this[onMouseForceChange], false);
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

      document.addEventListener('mousemove', this[onMouseMove]);
      document.addEventListener('mouseup', this[onMouseUp]);
    }

    /**
     * Detaches sensors event listeners to the DOM
     */

  }, {
    key: 'detach',
    value: function detach() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.containers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var container = _step2.value;

          container.removeEventListener('webkitmouseforcewillbegin', this[onMouseForceWillBegin], false);
          container.removeEventListener('webkitmouseforcedown', this[onMouseForceDown], false);
          container.removeEventListener('mousedown', this[onMouseDown], true);
          container.removeEventListener('webkitmouseforcechanged', this[onMouseForceChange], false);
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

      document.removeEventListener('mousemove', this[onMouseMove]);
      document.removeEventListener('mouseup', this[onMouseUp]);
    }

    /**
     * Mouse force will begin handler
     * @private
     * @param {Event} event - Mouse force will begin event
     */

  }, {
    key: onMouseForceWillBegin,
    value: function value(event) {
      event.preventDefault();
      this.mightDrag = true;
    }

    /**
     * Mouse force down handler
     * @private
     * @param {Event} event - Mouse force down event
     */

  }, {
    key: onMouseForceDown,
    value: function value(event) {
      if (this.dragging) {
        return;
      }

      var target = document.elementFromPoint(event.clientX, event.clientY);
      var container = event.currentTarget;

      var dragStartEvent = new _SensorEvent.DragStartSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: container,
        originalEvent: event
      });

      this.trigger(container, dragStartEvent);

      this.currentContainer = container;
      this.dragging = !dragStartEvent.canceled();
      this.mightDrag = false;
    }

    /**
     * Mouse up handler
     * @private
     * @param {Event} event - Mouse up event
     */

  }, {
    key: onMouseUp,
    value: function value(event) {
      if (!this.dragging) {
        return;
      }

      var dragStopEvent = new _SensorEvent.DragStopSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: null,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragStopEvent);

      this.currentContainer = null;
      this.dragging = false;
      this.mightDrag = false;
    }

    /**
     * Mouse down handler
     * @private
     * @param {Event} event - Mouse down event
     */

  }, {
    key: onMouseDown,
    value: function value(event) {
      if (!this.mightDrag) {
        return;
      }

      // Need workaround for real click
      // Cancel potential drag events
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.preventDefault();
    }

    /**
     * Mouse move handler
     * @private
     * @param {Event} event - Mouse force will begin event
     */

  }, {
    key: onMouseMove,
    value: function value(event) {
      if (!this.dragging) {
        return;
      }

      var target = document.elementFromPoint(event.clientX, event.clientY);

      var dragMoveEvent = new _SensorEvent.DragMoveSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragMoveEvent);
    }

    /**
     * Mouse force change handler
     * @private
     * @param {Event} event - Mouse force change event
     */

  }, {
    key: onMouseForceChange,
    value: function value(event) {
      if (this.dragging) {
        return;
      }

      var target = event.target;
      var container = event.currentTarget;

      var dragPressureEvent = new _SensorEvent.DragPressureSensorEvent({
        pressure: event.webkitForce,
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: container,
        originalEvent: event
      });

      this.trigger(container, dragPressureEvent);
    }

    /**
     * Mouse force global change handler
     * @private
     * @param {Event} event - Mouse force global change event
     */

  }, {
    key: onMouseForceGlobalChange,
    value: function value(event) {
      if (!this.dragging) {
        return;
      }

      var target = event.target;

      var dragPressureEvent = new _SensorEvent.DragPressureSensorEvent({
        pressure: event.webkitForce,
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragPressureEvent);
    }
  }]);
  return ForceTouchSensor;
}(_Sensor3.default);

exports.default = ForceTouchSensor;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = undefined;

var _toConsumableArray2 = __webpack_require__(23);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(15);

var _Plugins = __webpack_require__(58);

var _Emitter = __webpack_require__(141);

var _Emitter2 = _interopRequireDefault(_Emitter);

var _Sensors = __webpack_require__(59);

var _DraggableEvent = __webpack_require__(56);

var _DragEvent = __webpack_require__(55);

var _MirrorEvent = __webpack_require__(57);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onDragStart = Symbol('onDragStart');
var onDragMove = Symbol('onDragMove');
var onDragStop = Symbol('onDragStop');
var onDragPressure = Symbol('onDragPressure');
var getAppendableContainer = Symbol('getAppendableContainer');

/**
 * @const {Object} defaultAnnouncements
 * @const {Function} defaultAnnouncements['drag:start']
 * @const {Function} defaultAnnouncements['drag:stop']
 */
var defaultAnnouncements = {
  'drag:start': function dragStart(event) {
    return 'Picked up ' + (event.source.textContent.trim() || event.source.id || 'draggable element');
  },
  'drag:stop': function dragStop(event) {
    return 'Released ' + (event.source.textContent.trim() || event.source.id || 'draggable element');
  }
};

var defaultClasses = {
  'container:dragging': 'draggable-container--is-dragging',
  'source:dragging': 'draggable-source--is-dragging',
  'source:placed': 'draggable-source--placed',
  'container:placed': 'draggable-container--placed',
  'body:dragging': 'draggable--is-dragging',
  'draggable:over': 'draggable--over',
  'container:over': 'draggable-container--over',
  'source:original': 'draggable--original',
  mirror: 'draggable-mirror'
};

var defaultOptions = exports.defaultOptions = {
  draggable: '.draggable-source',
  handle: null,
  delay: 100,
  placedTimeout: 800,
  plugins: [],
  sensors: []
};

/**
 * This is the core draggable library that does the heavy lifting
 * @class Draggable
 * @module Draggable
 */

var Draggable = function () {

  /**
   * Draggable constructor.
   * @constructs Draggable
   * @param {HTMLElement[]|NodeList|HTMLElement} containers - Draggable containers
   * @param {Object} options - Options for draggable
   */
  function Draggable() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [document.body];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, Draggable);


    /**
     * Draggable containers
     * @property containers
     * @type {HTMLElement[]}
     */
    if (containers instanceof NodeList || containers instanceof Array) {
      this.containers = [].concat((0, _toConsumableArray3.default)(containers));
    } else if (containers instanceof HTMLElement) {
      this.containers = [containers];
    } else {
      throw new Error('Draggable containers are expected to be of type `NodeList`, `HTMLElement[]` or `HTMLElement`');
    }

    this.options = Object.assign({}, defaultOptions, options, {
      classes: Object.assign({}, defaultClasses, options.classes || {}),
      announcements: Object.assign({}, defaultAnnouncements, options.announcements || {})
    });

    /**
     * Draggables event emitter
     * @property emitter
     * @type {Emitter}
     */
    this.emitter = new _Emitter2.default();

    /**
     * Current drag state
     * @property dragging
     * @type {Boolean}
     */
    this.dragging = false;

    /**
     * Active plugins
     * @property plugins
     * @type {Plugin[]}
     */
    this.plugins = [];

    /**
     * Active sensors
     * @property sensors
     * @type {Sensor[]}
     */
    this.sensors = [];

    this[onDragStart] = this[onDragStart].bind(this);
    this[onDragMove] = this[onDragMove].bind(this);
    this[onDragStop] = this[onDragStop].bind(this);
    this[onDragPressure] = this[onDragPressure].bind(this);

    document.addEventListener('drag:start', this[onDragStart], true);
    document.addEventListener('drag:move', this[onDragMove], true);
    document.addEventListener('drag:stop', this[onDragStop], true);
    document.addEventListener('drag:pressure', this[onDragPressure], true);

    this.addPlugin.apply(this, [_Plugins.Mirror, _Plugins.Accessibility, _Plugins.Scrollable, _Plugins.Announcement].concat((0, _toConsumableArray3.default)(this.options.plugins)));
    this.addSensor.apply(this, [_Sensors.MouseSensor, _Sensors.TouchSensor].concat((0, _toConsumableArray3.default)(this.options.sensors)));

    var draggableInitializedEvent = new _DraggableEvent.DraggableInitializedEvent({
      draggable: this
    });

    this.trigger(draggableInitializedEvent);
  }

  /**
   * Destroys Draggable instance. This removes all internal event listeners and
   * deactivates sensors and plugins
   */


  /**
   * Default plugins draggable uses
   * @static
   * @property {Object} Plugins
   * @property {Mirror} Plugins.Mirror
   * @property {Accessibility} Plugins.Accessibility
   * @property {Scrollable} Plugins.Scrollable
   * @property {Announcement} Plugins.Announcement
   * @type {Object}
   */


  (0, _createClass3.default)(Draggable, [{
    key: 'destroy',
    value: function destroy() {
      document.removeEventListener('drag:start', this[onDragStart], true);
      document.removeEventListener('drag:move', this[onDragMove], true);
      document.removeEventListener('drag:stop', this[onDragStop], true);
      document.removeEventListener('drag:pressure', this[onDragPressure], true);

      var draggableDestroyEvent = new _DraggableEvent.DraggableDestroyEvent({
        draggable: this
      });

      this.trigger(draggableDestroyEvent);

      this.removePlugin.apply(this, (0, _toConsumableArray3.default)(this.plugins.map(function (plugin) {
        return plugin.constructor;
      })));
      this.removeSensor.apply(this, (0, _toConsumableArray3.default)(this.sensors.map(function (sensor) {
        return sensor.constructor;
      })));
    }

    /**
     * Adds plugin to this draggable instance. This will end up calling the attach method of the plugin
     * @param {...typeof Plugin} plugins - Plugins that you want attached to draggable
     * @return {Draggable}
     * @example draggable.addPlugin(CustomA11yPlugin, CustomMirrorPlugin)
     */

  }, {
    key: 'addPlugin',
    value: function addPlugin() {
      var _this = this;

      for (var _len = arguments.length, plugins = Array(_len), _key = 0; _key < _len; _key++) {
        plugins[_key] = arguments[_key];
      }

      var activePlugins = plugins.map(function (Plugin) {
        return new Plugin(_this);
      });
      activePlugins.forEach(function (plugin) {
        return plugin.attach();
      });
      this.plugins = [].concat((0, _toConsumableArray3.default)(this.plugins), (0, _toConsumableArray3.default)(activePlugins));
      return this;
    }

    /**
     * Removes plugins that are already attached to this draggable instance. This will end up calling
     * the detach method of the plugin
     * @param {...typeof Plugin} plugins - Plugins that you want detached from draggable
     * @return {Draggable}
     * @example draggable.removePlugin(MirrorPlugin, CustomMirrorPlugin)
     */

  }, {
    key: 'removePlugin',
    value: function removePlugin() {
      for (var _len2 = arguments.length, plugins = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        plugins[_key2] = arguments[_key2];
      }

      var removedPlugins = this.plugins.filter(function (plugin) {
        return plugins.includes(plugin.constructor);
      });
      removedPlugins.forEach(function (plugin) {
        return plugin.detach();
      });
      this.plugins = this.plugins.filter(function (plugin) {
        return !plugins.includes(plugin.constructor);
      });
      return this;
    }

    /**
     * Adds sensors to this draggable instance. This will end up calling the attach method of the sensor
     * @param {...typeof Sensor} sensors - Sensors that you want attached to draggable
     * @return {Draggable}
     * @example draggable.addSensor(ForceTouchSensor, CustomSensor)
     */

  }, {
    key: 'addSensor',
    value: function addSensor() {
      var _this2 = this;

      for (var _len3 = arguments.length, sensors = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        sensors[_key3] = arguments[_key3];
      }

      var activeSensors = sensors.map(function (Sensor) {
        return new Sensor(_this2.containers, _this2.options);
      });
      activeSensors.forEach(function (sensor) {
        return sensor.attach();
      });
      this.sensors = [].concat((0, _toConsumableArray3.default)(this.sensors), (0, _toConsumableArray3.default)(activeSensors));
      return this;
    }

    /**
     * Removes sensors that are already attached to this draggable instance. This will end up calling
     * the detach method of the sensor
     * @param {...typeof Sensor} sensors - Sensors that you want attached to draggable
     * @return {Draggable}
     * @example draggable.removeSensor(TouchSensor, DragSensor)
     */

  }, {
    key: 'removeSensor',
    value: function removeSensor() {
      for (var _len4 = arguments.length, sensors = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        sensors[_key4] = arguments[_key4];
      }

      var removedSensors = this.sensors.filter(function (sensor) {
        return sensors.includes(sensor.constructor);
      });
      removedSensors.forEach(function (sensor) {
        return sensor.detach();
      });
      this.sensors = this.sensors.filter(function (sensor) {
        return !sensors.includes(sensor.constructor);
      });
      return this;
    }

    /**
     * Adds container to this draggable instance
     * @param {...HTMLElement} containers - Containers you want to add to draggable
     * @return {Draggable}
     * @example draggable.addPlugin(CustomA11yPlugin, CustomMirrorPlugin)
     */

  }, {
    key: 'addContainer',
    value: function addContainer() {
      for (var _len5 = arguments.length, containers = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        containers[_key5] = arguments[_key5];
      }

      this.containers = [].concat((0, _toConsumableArray3.default)(this.containers), containers);
      return this;
    }

    /**
     * Removes container from this draggable instance
     * @param {...HTMLElement} containers - Containers you want to remove from draggable
     * @return {Draggable}
     * @example draggable.removePlugin(MirrorPlugin, CustomMirrorPlugin)
     */

  }, {
    key: 'removeContainer',
    value: function removeContainer() {
      for (var _len6 = arguments.length, containers = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        containers[_key6] = arguments[_key6];
      }

      this.containers = this.containers.filter(function (container) {
        return !containers.includes(container);
      });
      return this;
    }

    /**
     * Adds listener for draggable events
     * @param {String} type - Event name
     * @param {...Function} callbacks - Event callbacks
     * @return {Draggable}
     * @example draggable.on('drag:start', (dragEvent) => dragEvent.cancel());
     */

  }, {
    key: 'on',
    value: function on(type) {
      var _emitter;

      for (var _len7 = arguments.length, callbacks = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        callbacks[_key7 - 1] = arguments[_key7];
      }

      (_emitter = this.emitter).on.apply(_emitter, [type].concat(callbacks));
      return this;
    }

    /**
     * Removes listener from draggable
     * @param {String} type - Event name
     * @param {Function} callback - Event callback
     * @return {Draggable}
     * @example draggable.off('drag:start', handlerFunction);
     */

  }, {
    key: 'off',
    value: function off(type, callback) {
      this.emitter.off(type, callback);
      return this;
    }

    /**
     * Triggers draggable event
     * @param {AbstractEvent} event - Event instance
     * @return {Draggable}
     * @example draggable.trigger(event);
     */

  }, {
    key: 'trigger',
    value: function trigger(event) {
      this.emitter.trigger(event);
      return this;
    }

    /**
     * Returns class name for class identifier
     * @param {String} name - Name of class identifier
     * @return {String|null}
     */

  }, {
    key: 'getClassNameFor',
    value: function getClassNameFor(name) {
      return this.options.classes[name];
    }

    /**
     * Returns true if this draggable instance is currently dragging
     * @return {Boolean}
     */

  }, {
    key: 'isDragging',
    value: function isDragging() {
      return Boolean(this.dragging);
    }

    /**
     * Returns draggable elements for a given container, excluding the mirror and
     * original source element if present
     * @param {HTMLElement} container
     * @return {HTMLElement[]}
     */

  }, {
    key: 'getDraggableElementsForContainer',
    value: function getDraggableElementsForContainer(container) {
      var _this3 = this;

      var allDraggableElements = container.querySelectorAll(this.options.draggable);

      return [].concat((0, _toConsumableArray3.default)(allDraggableElements)).filter(function (childElement) {
        return childElement !== _this3.originalSource && childElement !== _this3.mirror;
      });
    }

    /**
     * Drag start handler
     * @private
     * @param {Event} event - DOM Drag event
     */

  }, {
    key: onDragStart,
    value: function value(event) {
      var _this4 = this;

      var sensorEvent = getSensorEvent(event);
      var target = sensorEvent.target,
          container = sensorEvent.container,
          originalEvent = sensorEvent.originalEvent;


      if (!this.containers.includes(container)) {
        return;
      }

      if (this.options.handle && target && !(0, _utils.closest)(target, this.options.handle)) {
        sensorEvent.cancel();
        return;
      }

      // Find draggable source element
      this.originalSource = (0, _utils.closest)(target, this.options.draggable);
      this.sourceContainer = container;

      if (!this.originalSource) {
        sensorEvent.cancel();
        return;
      }

      if (this.lastPlacedSource && this.lastPlacedContainer) {
        clearTimeout(this.placedTimeoutID);
        this.lastPlacedSource.classList.remove(this.getClassNameFor('source:placed'));
        this.lastPlacedContainer.classList.remove(this.getClassNameFor('container:placed'));
      }

      this.dragging = true;

      this.source = this.originalSource.cloneNode(true);

      var mirrorCreateEvent = new _MirrorEvent.MirrorCreateEvent({
        source: this.source,
        originalSource: this.originalSource,
        sourceContainer: container,
        sensorEvent: sensorEvent
      });

      this.trigger(mirrorCreateEvent);

      if (!isDragEvent(originalEvent) && !mirrorCreateEvent.canceled()) {
        var appendableContainer = this[getAppendableContainer]({ source: this.originalSource });
        this.mirror = this.source.cloneNode(true);

        var mirrorCreatedEvent = new _MirrorEvent.MirrorCreatedEvent({
          source: this.source,
          originalSource: this.originalSource,
          mirror: this.mirror,
          sourceContainer: container,
          sensorEvent: sensorEvent
        });

        var mirrorAttachedEvent = new _MirrorEvent.MirrorAttachedEvent({
          source: this.source,
          originalSource: this.originalSource,
          mirror: this.mirror,
          sourceContainer: container,
          sensorEvent: sensorEvent
        });

        this.trigger(mirrorCreatedEvent);
        appendableContainer.appendChild(this.mirror);
        this.trigger(mirrorAttachedEvent);
      }

      this.originalSource.classList.add(this.getClassNameFor('source:original'));
      this.originalSource.parentNode.insertBefore(this.source, this.originalSource);

      this.originalSource.style.display = 'none';
      this.source.classList.add(this.getClassNameFor('source:dragging'));
      this.sourceContainer.classList.add(this.getClassNameFor('container:dragging'));
      document.body.classList.add(this.getClassNameFor('body:dragging'));
      applyUserSelect(document.body, 'none');

      var dragEvent = new _DragEvent.DragStartEvent({
        source: this.source,
        mirror: this.mirror,
        originalSource: this.originalSource,
        sourceContainer: container,
        sensorEvent: sensorEvent
      });

      this.trigger(dragEvent);

      if (dragEvent.canceled()) {
        this.dragging = false;

        if (this.mirror) {
          this.mirror.parentNode.removeChild(this.mirror);
        }

        this.source.parentNode.removeChild(this.source);
        this.originalSource.style.display = null;

        this.source.classList.remove(this.getClassNameFor('source:dragging'));
        this.sourceContainer.classList.remove(this.getClassNameFor('container:dragging'));
        document.body.classList.remove(this.getClassNameFor('body:dragging'));
      } else {
        requestAnimationFrame(function () {
          return _this4[onDragMove](event);
        });
      }
    }

    /**
     * Drag move handler
     * @private
     * @param {Event} event - DOM Drag event
     */

  }, {
    key: onDragMove,
    value: function value(event) {
      if (!this.dragging) {
        return;
      }

      var sensorEvent = getSensorEvent(event);
      var container = sensorEvent.container;

      var target = sensorEvent.target;

      var dragMoveEvent = new _DragEvent.DragMoveEvent({
        source: this.source,
        mirror: this.mirror,
        originalSource: this.originalSource,
        sourceContainer: container,
        sensorEvent: sensorEvent
      });

      this.trigger(dragMoveEvent);

      if (dragMoveEvent.canceled()) {
        sensorEvent.cancel();
      }

      if (this.mirror && !dragMoveEvent.canceled()) {
        var mirrorMoveEvent = new _MirrorEvent.MirrorMoveEvent({
          source: this.source,
          mirror: this.mirror,
          originalSource: this.originalSource,
          sourceContainer: container,
          sensorEvent: sensorEvent
        });

        this.trigger(mirrorMoveEvent);
      }

      target = (0, _utils.closest)(target, this.options.draggable);
      var withinCorrectContainer = (0, _utils.closest)(sensorEvent.target, this.containers);
      var overContainer = sensorEvent.overContainer || withinCorrectContainer;
      var isLeavingContainer = this.currentOverContainer && overContainer !== this.currentOverContainer;
      var isLeavingDraggable = this.currentOver && target !== this.currentOver;
      var isOverContainer = overContainer && this.currentOverContainer !== overContainer;
      var isOverDraggable = withinCorrectContainer && target && this.currentOver !== target;

      if (isLeavingDraggable) {
        var dragOutEvent = new _DragEvent.DragOutEvent({
          source: this.source,
          mirror: this.mirror,
          originalSource: this.originalSource,
          sourceContainer: container,
          sensorEvent: sensorEvent,
          over: this.currentOver
        });

        this.currentOver.classList.remove(this.getClassNameFor('draggable:over'));
        this.currentOver = null;

        this.trigger(dragOutEvent);
      }

      if (isLeavingContainer) {
        var dragOutContainerEvent = new _DragEvent.DragOutContainerEvent({
          source: this.source,
          mirror: this.mirror,
          originalSource: this.originalSource,
          sourceContainer: container,
          sensorEvent: sensorEvent,
          overContainer: this.currentOverContainer
        });

        this.currentOverContainer.classList.remove(this.getClassNameFor('container:over'));
        this.currentOverContainer = null;

        this.trigger(dragOutContainerEvent);
      }

      if (isOverContainer) {
        overContainer.classList.add(this.getClassNameFor('container:over'));

        var dragOverContainerEvent = new _DragEvent.DragOverContainerEvent({
          source: this.source,
          mirror: this.mirror,
          originalSource: this.originalSource,
          sourceContainer: container,
          sensorEvent: sensorEvent,
          overContainer: overContainer
        });

        this.currentOverContainer = overContainer;

        this.trigger(dragOverContainerEvent);
      }

      if (isOverDraggable) {
        target.classList.add(this.getClassNameFor('draggable:over'));

        var dragOverEvent = new _DragEvent.DragOverEvent({
          source: this.source,
          mirror: this.mirror,
          originalSource: this.originalSource,
          sourceContainer: container,
          sensorEvent: sensorEvent,
          overContainer: overContainer,
          over: target
        });

        this.currentOver = target;

        this.trigger(dragOverEvent);
      }
    }

    /**
     * Drag stop handler
     * @private
     * @param {Event} event - DOM Drag event
     */

  }, {
    key: onDragStop,
    value: function value(event) {
      var _this5 = this;

      if (!this.dragging) {
        return;
      }

      this.dragging = false;

      var sensorEvent = getSensorEvent(event);
      var dragStopEvent = new _DragEvent.DragStopEvent({
        source: this.source,
        mirror: this.mirror,
        originalSource: this.originalSource,
        sensorEvent: event.sensorEvent,
        sourceContainer: this.sourceContainer
      });

      this.trigger(dragStopEvent);

      this.source.parentNode.insertBefore(this.originalSource, this.source);
      this.source.parentNode.removeChild(this.source);
      this.originalSource.style.display = '';

      this.source.classList.remove(this.getClassNameFor('source:dragging'));
      this.originalSource.classList.remove(this.getClassNameFor('source:original'));
      this.originalSource.classList.add(this.getClassNameFor('source:placed'));
      this.sourceContainer.classList.add(this.getClassNameFor('container:placed'));
      this.sourceContainer.classList.remove(this.getClassNameFor('container:dragging'));
      document.body.classList.remove(this.getClassNameFor('body:dragging'));
      applyUserSelect(document.body, '');

      if (this.currentOver) {
        this.currentOver.classList.remove(this.getClassNameFor('draggable:over'));
      }

      if (this.currentOverContainer) {
        this.currentOverContainer.classList.remove(this.getClassNameFor('container:over'));
      }

      if (this.mirror) {
        var mirrorDestroyEvent = new _MirrorEvent.MirrorDestroyEvent({
          source: this.source,
          mirror: this.mirror,
          sourceContainer: sensorEvent.container,
          sensorEvent: sensorEvent
        });

        this.trigger(mirrorDestroyEvent);

        if (!mirrorDestroyEvent.canceled()) {
          this.mirror.parentNode.removeChild(this.mirror);
        }
      }

      this.lastPlacedSource = this.originalSource;
      this.lastPlacedContainer = this.sourceContainer;

      this.placedTimeoutID = setTimeout(function () {
        if (_this5.lastPlacedSource) {
          _this5.lastPlacedSource.classList.remove(_this5.getClassNameFor('source:placed'));
        }

        if (_this5.lastPlacedContainer) {
          _this5.lastPlacedContainer.classList.remove(_this5.getClassNameFor('container:placed'));
        }

        _this5.lastPlacedSource = null;
        _this5.lastPlacedContainer = null;
      }, this.options.placedTimeout);

      this.source = null;
      this.mirror = null;
      this.originalSource = null;
      this.currentOverContainer = null;
      this.currentOver = null;
      this.sourceContainer = null;
    }

    /**
     * Drag pressure handler
     * @private
     * @param {Event} event - DOM Drag event
     */

  }, {
    key: onDragPressure,
    value: function value(event) {
      if (!this.dragging) {
        return;
      }

      var sensorEvent = getSensorEvent(event);
      var source = this.source || (0, _utils.closest)(sensorEvent.originalEvent.target, this.options.draggable);

      var dragPressureEvent = new _DragEvent.DragPressureEvent({
        sensorEvent: sensorEvent,
        source: source,
        pressure: sensorEvent.pressure
      });

      this.trigger(dragPressureEvent);
    }

    /**
     * Returns appendable container for mirror based on the appendTo option
     * @private
     * @param {Object} options
     * @param {HTMLElement} options.source - Current source
     * @return {HTMLElement}
     */

  }, {
    key: getAppendableContainer,
    value: function value(_ref) {
      var source = _ref.source;

      var appendTo = this.options.appendTo;

      if (typeof appendTo === 'string') {
        return document.querySelector(appendTo);
      } else if (appendTo instanceof HTMLElement) {
        return appendTo;
      } else if (typeof appendTo === 'function') {
        return appendTo(source);
      } else {
        return source.parentNode;
      }
    }
  }]);
  return Draggable;
}();

Draggable.Plugins = { Mirror: _Plugins.Mirror, Accessibility: _Plugins.Accessibility, Scrollable: _Plugins.Scrollable, Announcement: _Plugins.Announcement };
exports.default = Draggable;


function getSensorEvent(event) {
  return event.detail;
}

function isDragEvent(event) {
  return (/^drag/.test(event.type)
  );
}

function applyUserSelect(element, value) {
  element.style.webkitUserSelect = value;
  element.style.mozUserSelect = value;
  element.style.msUserSelect = value;
  element.style.oUserSelect = value;
  element.style.userSelect = value;
}

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Emitter = __webpack_require__(142);

var _Emitter2 = _interopRequireDefault(_Emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Emitter2.default;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(23);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The Emitter is a simple emitter class that provides you with `on()`, `off()` and `trigger()` methods
 * @class Emitter
 * @module Emitter
 */
var Emitter = function () {
  function Emitter() {
    (0, _classCallCheck3.default)(this, Emitter);

    this.callbacks = {};
  }

  /**
   * Registers callbacks by event name
   * @param {String} type
   * @param {...Function} callbacks
   */


  (0, _createClass3.default)(Emitter, [{
    key: "on",
    value: function on(type) {
      var _callbacks$type;

      if (!this.callbacks[type]) {
        this.callbacks[type] = [];
      }

      for (var _len = arguments.length, callbacks = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        callbacks[_key - 1] = arguments[_key];
      }

      (_callbacks$type = this.callbacks[type]).push.apply(_callbacks$type, callbacks);

      return this;
    }

    /**
     * Unregisters callbacks by event name
     * @param {String} type
     * @param {Function} callback
     */

  }, {
    key: "off",
    value: function off(type, callback) {
      if (!this.callbacks[type]) {
        return null;
      }

      var copy = this.callbacks[type].slice(0);

      for (var i = 0; i < copy.length; i++) {
        if (callback === copy[i]) {
          this.callbacks[type].splice(i, 1);
        }
      }

      return this;
    }

    /**
     * Triggers event callbacks by event object
     * @param {AbstractEvent} event
     */

  }, {
    key: "trigger",
    value: function trigger(event) {
      if (!this.callbacks[event.type]) {
        return null;
      }

      var callbacks = [].concat((0, _toConsumableArray3.default)(this.callbacks[event.type]));
      var caughtErrors = [];

      for (var i = callbacks.length - 1; i >= 0; i--) {
        var callback = callbacks[i];
        try {
          callback(event);
        } catch (error) {
          caughtErrors.push(error);
        }
      }

      if (caughtErrors.length) {
        throw new Error("Draggable caught errors while triggering '" + event.type + "'", caughtErrors);
      }

      return this;
    }
  }]);
  return Emitter;
}();

exports.default = Emitter;

/***/ })
/******/ ]);
});