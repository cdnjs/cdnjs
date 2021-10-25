(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["FunctionalCalendar"] = factory();
	else
		root["FunctionalCalendar"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "014b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("e53d");
var has = __webpack_require__("07e3");
var DESCRIPTORS = __webpack_require__("8e60");
var $export = __webpack_require__("63b6");
var redefine = __webpack_require__("9138");
var META = __webpack_require__("ebfd").KEY;
var $fails = __webpack_require__("294c");
var shared = __webpack_require__("dbdb");
var setToStringTag = __webpack_require__("45f2");
var uid = __webpack_require__("62a0");
var wks = __webpack_require__("5168");
var wksExt = __webpack_require__("ccb9");
var wksDefine = __webpack_require__("6718");
var enumKeys = __webpack_require__("47ee");
var isArray = __webpack_require__("9003");
var anObject = __webpack_require__("e4ae");
var isObject = __webpack_require__("f772");
var toObject = __webpack_require__("241e");
var toIObject = __webpack_require__("36c3");
var toPrimitive = __webpack_require__("1bc3");
var createDesc = __webpack_require__("aebd");
var _create = __webpack_require__("a159");
var gOPNExt = __webpack_require__("0395");
var $GOPD = __webpack_require__("bf0b");
var $GOPS = __webpack_require__("9aa9");
var $DP = __webpack_require__("d9f6");
var $keys = __webpack_require__("c3a1");
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
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
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
  __webpack_require__("6abf").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("355d").f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("b8e3")) {
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

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
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
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("35e8")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
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
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
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

/***/ "02c4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FunctionalCalendar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0d62");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FunctionalCalendar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FunctionalCalendar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
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

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "0395":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("36c3");
var gOPN = __webpack_require__("6abf").f;
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

/***/ "07e3":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "0a49":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("9b43");
var IObject = __webpack_require__("626a");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var asc = __webpack_require__("cd1c");
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

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
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

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "0d62":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("3a9e");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("bf27fce6", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "0fc9":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("3a38");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "1169":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("2d95");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1654":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("71c1")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("30f1")(String, 'String', function (iterated) {
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

/***/ "1691":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "1af6":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__("63b6");

$export($export.S, 'Array', { isArray: __webpack_require__("9003") });


/***/ }),

/***/ "1bc3":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("f772");
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

/***/ "1ec9":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
var document = __webpack_require__("e53d").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "20d6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__("5ca1");
var $find = __webpack_require__("0a49")(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("9c6c")(KEY);


/***/ }),

/***/ "20fd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("d9f6");
var createDesc = __webpack_require__("aebd");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2350":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
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

/***/ "241e":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("25eb");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "257c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TimePicker_vue_vue_type_style_index_0_id_bac60cee_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("67ac");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TimePicker_vue_vue_type_style_index_0_id_bac60cee_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TimePicker_vue_vue_type_style_index_0_id_bac60cee_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "25eb":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "2621":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "28a5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__("aae3");
var anObject = __webpack_require__("cb7c");
var speciesConstructor = __webpack_require__("ebd6");
var advanceStringIndex = __webpack_require__("0390");
var toLength = __webpack_require__("9def");
var callRegExpExec = __webpack_require__("5f1b");
var regexpExec = __webpack_require__("520a");
var fails = __webpack_require__("79e5");
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__("214f")('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
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
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),

/***/ "294c":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
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

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
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

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2f21":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("79e5");

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),

/***/ "2fdb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__("5ca1");
var context = __webpack_require__("d2c8");
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__("5147")(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "30f1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("b8e3");
var $export = __webpack_require__("63b6");
var redefine = __webpack_require__("9138");
var hide = __webpack_require__("35e8");
var Iterators = __webpack_require__("481b");
var $iterCreate = __webpack_require__("8f60");
var setToStringTag = __webpack_require__("45f2");
var getPrototypeOf = __webpack_require__("53e2");
var ITERATOR = __webpack_require__("5168")('iterator');
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
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
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

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "32fc":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("e53d").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "335c":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("6b4c");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "355d":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "35e8":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("d9f6");
var createDesc = __webpack_require__("aebd");
module.exports = __webpack_require__("8e60") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "36c3":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("335c");
var defined = __webpack_require__("25eb");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "3702":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("481b");
var ITERATOR = __webpack_require__("5168")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "3846":
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__("9e1e") && /./g.flags != 'g') __webpack_require__("86cc").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__("0bfb")
});


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "3a38":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "3a9e":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".vfc-popover-container:focus{outline:none}.vfc-multiple-input input,.vfc-single-input{font-size:inherit;-webkit-transition:width .2s;transition:width .2s;padding:7px;width:143px;color:#aaa;border:1px solid #efefef;text-align:center;outline:none}.vfc-single-input{border-radius:10px}.vfc-multiple-input input:first-child{border-radius:10px 0 0 10px}.vfc-multiple-input input:last-child{border-radius:0 10px 10px 0}.vfc-tags-input{display:-moz-flex;display:-ms-flex;display:-o-flex;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.vfc-tags-input input{-webkit-box-flex:1;-ms-flex:1;flex:1;background:transparent;border:none}.vfc-tags-input input[type=text]{color:#495057}.vfc-tags-input input:focus{outline:none}.vfc-tags-input span{margin-right:.3em;margin-bottom:.3em;padding-right:.75em;padding-left:.6em;border-radius:10em}.vfc-tags-input-wrapper-default{width:295px;padding:.5em .25em;min-height:15px;background:#fff;border:1px solid #dbdbdb;border-radius:10px}.vfc-tags-input-badge{width:85px;background-color:#f0f1f2;position:relative;display:inline-block;padding:.25em .4em;font-size:75%;font-weight:700;line-height:1;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25em;overflow:hidden;text-overflow:ellipsis}.vfc-tags-input-remove{cursor:pointer;position:absolute;display:inline-block;right:.3em;top:.3em;padding:.5em;overflow:hidden}.vfc-tags-input-remove:after,.vfc-tags-input-remove:before{content:\"\";position:absolute;width:75%;left:.15em;background:#ff8498;height:2px;margin-top:-1px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.vfc-tags-input-remove:after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.vfc-dark.vfc-multiple-input input,.vfc-dark .vfc-single-input,.vfc-dark.vfc-tags-input-root .vfc-tags-input-wrapper-default{border-color:#28456c;background-color:#1a202c}.vfc-dark.vfc-tags-input-root .vfc-tags-input-wrapper-default.vfc-tags-input .vfc-tags-input-badge,.vfc-main-container{background-color:#fff}.vfc-main-container{position:relative;border-radius:.28571429rem;-webkit-box-shadow:0 2px 15px 0 rgba(0,0,0,.25);box-shadow:0 2px 15px 0 rgba(0,0,0,.25);font-family:-apple-system,BlinkMacSystemFont,PingFang SC,serif;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-box-sizing:border-box;box-sizing:border-box}.vfc-main-container.vfc-modal{position:absolute;width:inherit;z-index:1000}.vfc-main-container>*{-webkit-box-sizing:border-box;box-sizing:border-box}.vfc-main-container.vfc-dark{background-color:#1a202c}.vfc-main-container.vfc-dark .vfc-navigation-buttons div .vfc-arrow-left,.vfc-main-container.vfc-dark .vfc-navigation-buttons div .vfc-arrow-right,.vfc-main-container.vfc-dark .vfc-separately-navigation-buttons div .vfc-arrow-left,.vfc-main-container.vfc-dark .vfc-separately-navigation-buttons div .vfc-arrow-right{border-color:#fff}.vfc-main-container.vfc-dark .vfc-navigation-buttons div .vfc-arrow-left:active,.vfc-main-container.vfc-dark .vfc-navigation-buttons div .vfc-arrow-right:active,.vfc-main-container.vfc-dark .vfc-separately-navigation-buttons div .vfc-arrow-left:active,.vfc-main-container.vfc-dark .vfc-separately-navigation-buttons div .vfc-arrow-right:active{border-color:#d9d9d9}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar .vfc-months-container .vfc-content{background-color:#fff}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar .vfc-months-container .vfc-content .vfc-navigation-buttons div .vfc-arrow-left,.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar .vfc-months-container .vfc-content .vfc-navigation-buttons div .vfc-arrow-right{border-color:#000}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar .vfc-months-container .vfc-content .vfc-navigation-buttons .vfc-top-date{color:#000}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar .vfc-months-container .vfc-content .vfc-navigation-buttons .vfc-top-date .vfc-popover-caret{background-color:#fff}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar .vfc-months-container .vfc-content .vfc-navigation-buttons .vfc-top-date.vfc-underline{-webkit-text-decoration:underline dotted #66b3cc;text-decoration:underline dotted #66b3cc}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar .vfc-months-container .vfc-content .vfc-months div.vfc-item{color:#000}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar .vfc-months-container .vfc-content .vfc-months div.vfc-item:hover{background-color:hsla(0,0%,44.3%,.3)}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar .vfc-months-container .vfc-content .vfc-months div.vfc-item.vfc-selected{background-color:#4299e1;color:#fff}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-top-date span{color:#fff}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-top-date span.vfc-underline{-webkit-text-decoration:underline #4299e1;text-decoration:underline #4299e1}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-top-date span.vfc-underline.vfc-underline-active{-webkit-text-decoration-color:#fff;text-decoration-color:#fff}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-dayNames span{color:#bfbfbf}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-week .vfc-week-number{border-color:#38b2ac}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-week div.vfc-day .vfc-base-end,.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-week div.vfc-day .vfc-base-start{background-color:#28456c}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-week div.vfc-day span.vfc-span-day{color:#fff}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-week div.vfc-day span.vfc-span-day.vfc-today{background-color:#38b2ac;color:#fff}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-week div.vfc-day span.vfc-span-day.vfc-marked{background-color:#4299e1}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-week div.vfc-day span.vfc-span-day.vfc-marked.vfc-borderd,.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-week div.vfc-day span.vfc-span-day.vfc-marked.vfc-end-marked,.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-week div.vfc-day span.vfc-span-day.vfc-marked.vfc-start-marked{color:#fff}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-week div.vfc-day span.vfc-span-day.vfc-marked:not(.vfc-start-marked):not(.vfc-end-marked):before{background-color:#28456c}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-week div.vfc-day span.vfc-span-day.vfc-marked:after{color:#000}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-week div.vfc-day span.vfc-span-day.vfc-marked.vfc-hide{color:#bfbfbf}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-week div.vfc-day span.vfc-span-day.vfc-hide{color:#464646}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-week div.vfc-day span.vfc-span-day.vfc-disabled{color:hsla(0,0%,52.2%,.2)}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-week div.vfc-day span.vfc-span-day:after{color:#000}.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-week div.vfc-day span.vfc-span-day.vfc-hover:hover,.vfc-main-container.vfc-dark .vfc-calendars .vfc-calendar div.vfc-content .vfc-week div.vfc-day span.vfc-span-day.vfc-hovered{z-index:1;background-color:#4682b4}.vfc-main-container.vfc-dark .vfc-time-picker-container .vfc-time-picker__list .vfc-time-picker__item{color:#fff}.vfc-main-container.vfc-dark .vfc-time-picker-container .vfc-time-picker__list .vfc-time-picker__item--selected{color:#4299e1}.vfc-main-container.vfc-dark .vfc-time-picker-container .vfc-time-picker__list::-webkit-scrollbar-track{background:#28456c}.vfc-main-container.vfc-dark .vfc-time-picker-container .vfc-time-picker__list::-webkit-scrollbar-thumb{background:#4299e1}.vfc-main-container.vfc-dark .vfc-time-picker-container .vfc-close:after,.vfc-main-container.vfc-dark .vfc-time-picker-container .vfc-close:before{background-color:#fff}.vfc-main-container.vfc-dark .vfc-time-picker-container .vfc-modal-time-mechanic .vfc-modal-time-line{background-color:#4299e1;color:#fff}.vfc-time-picker:after{content:\"\";display:table;clear:both}.vfc-time-picker-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.vfc-time-picker__list{float:left;width:50%;height:200px;overflow-y:scroll}.vfc-time-picker__list::-webkit-scrollbar{width:3px}.vfc-time-picker__list::-webkit-scrollbar-track{background:#efefef}.vfc-time-picker__list::-webkit-scrollbar-thumb{background:#ccc}.vfc-time-picker__with-suffix .vfc-time-picker__list{width:33.333333%}.vfc-time-picker__item{padding:10px 0;font-size:20px;text-align:center;cursor:pointer;-webkit-transition:font-size .3s;transition:font-size .3s}.vfc-time-picker__item:hover{font-size:32px}.vfc-time-picker__item--selected{color:#66b3cc;font-size:32px}.vfc-time-picker__item--disabled{opacity:.4;cursor:default;font-size:20px!important}.vfc-close{position:absolute;right:12px;top:16px;width:32px;height:32px;opacity:.3;z-index:100}.vfc-close:hover{opacity:1}.vfc-close:after,.vfc-close:before{position:absolute;left:15px;content:\" \";height:26px;width:2px;background-color:#fff;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.vfc-close:after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.vfc-modal-time-mechanic{position:relative;margin:0 auto;width:100%}.vfc-modal-time-line{width:100%;background-color:#66b3cc;text-align:left;color:#fff;font-size:16px;padding-top:15px;padding-bottom:15px;border-radius:.28571429rem .28571429rem 0 0}.vfc-modal-time-line span{margin-left:15px}.vfc-modal-time-line span span.vfc-active{text-decoration:underline}.vfc-modal-append{color:#7d7d7d;font-weight:400;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.vfc-modal-midle{display:inline-block}.vfc-modal-midle-dig{display:inline-block;text-align:center}.vfc-modal-digits{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;font-size:50px}.vfc-modal-digits select{margin:5px 0;width:100%;text-align:center;-moz-text-align-last:center;text-align-last:center}.vfc-arrow{opacity:.3;-webkit-transition:.2s;transition:.2s}.vfc-arrow:hover{opacity:1}.vfc-arrow-up{border-bottom:20px solid #333}.vfc-arrow-down,.vfc-arrow-up{width:0;height:0;border-left:20px solid transparent;border-right:20px solid transparent}.vfc-arrow-down{border-top:20px solid #333}.vfc-separately-navigation-buttons{margin-bottom:-80px}.vfc-navigation-buttons{width:100%;position:absolute}.vfc-navigation-buttons,.vfc-separately-navigation-buttons{-webkit-box-flex:0;-ms-flex:0 1 15%;flex:0 1 15%;margin-top:-10px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.vfc-navigation-buttons.vfc-left,.vfc-separately-navigation-buttons.vfc-left{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.vfc-navigation-buttons.vfc-right,.vfc-separately-navigation-buttons.vfc-right{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.vfc-navigation-buttons.vfc-space-between,.vfc-separately-navigation-buttons.vfc-space-between{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.vfc-navigation-buttons div,.vfc-separately-navigation-buttons div{z-index:200;display:-webkit-box;display:-ms-flexbox;display:flex;color:#000;font-size:18px;margin:20px 10px}.vfc-navigation-buttons div.vfc-cursor-pointer,.vfc-separately-navigation-buttons div.vfc-cursor-pointer{cursor:pointer}.vfc-navigation-buttons div .vfc-arrow-left,.vfc-separately-navigation-buttons div .vfc-arrow-left{width:12px;height:12px;border-top:2px solid;border-left:2px solid;border-color:#0a0c19;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.vfc-navigation-buttons div .vfc-arrow-left.vfc-disabled,.vfc-navigation-buttons div .vfc-arrow-left:active,.vfc-navigation-buttons div .vfc-arrow-right.vfc-disabled,.vfc-navigation-buttons div .vfc-arrow-right:active,.vfc-separately-navigation-buttons div .vfc-arrow-left.vfc-disabled,.vfc-separately-navigation-buttons div .vfc-arrow-left:active,.vfc-separately-navigation-buttons div .vfc-arrow-right.vfc-disabled,.vfc-separately-navigation-buttons div .vfc-arrow-right:active{border-color:#ddd}.vfc-navigation-buttons div .vfc-arrow-right,.vfc-separately-navigation-buttons div .vfc-arrow-right{width:12px;height:12px;border-top:2px solid;border-right:2px solid;border-color:#0a0c19;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.vfc-calendar{position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1;height:auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch}.vfc-calendar .vfc-content{margin-bottom:20px}.vfc-calendars{-webkit-box-flex:1;-ms-flex:1 1 75%;flex:1 1 75%;-ms-flex-wrap:wrap;flex-wrap:wrap}.vfc-calendars,.vfc-calendars-container{display:-webkit-box;display:-ms-flexbox;display:flex}.vfc-calendars-container{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;height:100%;position:relative;overflow:hidden}.vfc-calendar-fade-enter-active,.vfc-calendar-fade-leave-active,.vfc-calendar-slide-down-enter-active,.vfc-calendar-slide-down-leave-active,.vfc-calendar-slide-left-enter-active,.vfc-calendar-slide-left-leave-active,.vfc-calendar-slide-right-enter-active,.vfc-calendar-slide-right-leave-active,.vfc-calendar-slide-up-enter-active,.vfc-calendar-slide-up-leave-active{-webkit-transition:all .25s ease-in-out;transition:all .25s ease-in-out}.vfc-calendar-fade-leave-active,.vfc-calendar-none-leave-active,.vfc-calendar-slide-down-leave-active,.vfc-calendar-slide-left-leave-active,.vfc-calendar-slide-right-leave-active,.vfc-calendar-slide-up-leave-active{position:absolute}.vfc-calendar-none-enter-active,.vfc-calendar-none-leave-active{-webkit-transition-duration:0s;transition-duration:0s}.vfc-calendar-slide-left-enter,.vfc-calendar-slide-right-leave-to{opacity:0;-webkit-transform:translateX(25px);transform:translateX(25px)}.vfc-calendar-slide-left-leave-to,.vfc-calendar-slide-right-enter{opacity:0;-webkit-transform:translateX(-25px);transform:translateX(-25px)}.vfc-calendar-slide-down-leave-to,.vfc-calendar-slide-up-enter{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}.vfc-calendar-slide-down-enter,.vfc-calendar-slide-up-leave-to{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}.vfc-months{-ms-flex:1 1 75%;flex:1 1 75%;padding:0;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.vfc-months,.vfc-months .vfc-item{-webkit-box-flex:1;display:-webkit-box;display:-ms-flexbox;display:flex}.vfc-months .vfc-item{-ms-flex:1;flex:1;-ms-flex-preferred-size:30%;flex-basis:30%;margin:3px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;text-align:center;outline-style:none;border-radius:5px}.vfc-months .vfc-item:hover{background-color:hsla(0,0%,44.3%,.3);-webkit-transition:background-color .2s ease-in-out;transition:background-color .2s ease-in-out;cursor:pointer}.vfc-months .vfc-item.vfc-selected{background-color:#4299e1;color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,.25)}.vfc-months-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;margin-left:-20px}.vfc-months-container.vfc-left{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;margin-left:0}.vfc-months-container.vfc-left .vfc-content .vfc-navigation-buttons .vfc-top-date .vfc-popover-caret{left:45px}.vfc-months-container.vfc-center{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.vfc-months-container.vfc-right{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.vfc-months-container.vfc-right .vfc-content .vfc-navigation-buttons .vfc-top-date .vfc-popover-caret{left:calc(100% - 90px)}.vfc-months-container .vfc-content{width:45%;min-width:133px;position:absolute;z-index:1000;background-color:#2d3748;border:1px solid;border-radius:5px;top:55px;color:#fff;padding:5px 0}.vfc-months-container .vfc-content .vfc-navigation-buttons{position:unset;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.vfc-months-container .vfc-content .vfc-navigation-buttons div{margin:10px 10px}.vfc-months-container .vfc-content .vfc-navigation-buttons div:hover{cursor:pointer}.vfc-months-container .vfc-content .vfc-navigation-buttons div:hover .vfc-arrow-left,.vfc-months-container .vfc-content .vfc-navigation-buttons div:hover .vfc-arrow-right{border-color:#4299e1}.vfc-months-container .vfc-content .vfc-navigation-buttons div .vfc-arrow-left,.vfc-months-container .vfc-content .vfc-navigation-buttons div .vfc-arrow-right{border-color:#fff;width:8px;height:8px}.vfc-months-container .vfc-content .vfc-navigation-buttons .vfc-top-date{font-size:18px;font-weight:700;margin:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.vfc-months-container .vfc-content .vfc-navigation-buttons .vfc-top-date-has-delta:hover{cursor:pointer}.vfc-months-container .vfc-content .vfc-navigation-buttons .vfc-top-date .vfc-popover-caret{content:\"\";position:absolute;display:block;width:12px;height:12px;border-top:inherit;border-left:inherit;background:inherit;z-index:-1;background-color:#2d3748;-webkit-transform:translateY(-40%) rotate(45deg);transform:translateY(-40%) rotate(45deg);top:0;left:50%}.vfc-months-container .vfc-content .vfc-navigation-buttons .vfc-top-date.vfc-underline{cursor:pointer;-webkit-text-decoration:underline dotted #66b3cc;text-decoration:underline dotted #66b3cc}.vfc-months-container .vfc-content .vfc-months{-webkit-box-flex:1;-ms-flex:1 1 75%;flex:1 1 75%;padding:0;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.vfc-months-container .vfc-content .vfc-months div.vfc-item{-webkit-box-flex:1;-ms-flex:1;flex:1;-ms-flex-preferred-size:30%;flex-basis:30%;margin:3px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;text-align:center;outline-style:none;border-radius:5px}.vfc-months-container .vfc-content .vfc-months div.vfc-item:hover{background-color:hsla(0,0%,44.3%,.3);-webkit-transition:background-color .2s ease-in-out;transition:background-color .2s ease-in-out;cursor:pointer}.vfc-months-container .vfc-content .vfc-months div.vfc-item.vfc-selected{background-color:#4299e1;color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,.25)}.vfc-content{margin:0 20px;z-index:100}.vfc-top-date{margin:25px;font-size:18px;font-weight:400}.vfc-top-date.vfc-left{text-align:left}.vfc-top-date.vfc-right{text-align:right}.vfc-top-date.vfc-center{text-align:center}.vfc-top-date span{cursor:default;text-decoration:unset;margin:0 2px;color:#000}.vfc-top-date span.vfc-cursor-pointer{cursor:pointer}.vfc-top-date span.vfc-underline{cursor:pointer;-webkit-text-decoration:underline #66b3cc;text-decoration:underline #66b3cc}.vfc-top-date span.vfc-underline.vfc-underline-active{-webkit-text-decoration-color:#000;text-decoration-color:#000}.vfc-dayNames,.vfc-week{display:-webkit-box;display:-ms-flexbox;display:flex}.vfc-dayNames{-webkit-box-flex:30px;-ms-flex:30px 0 0px;flex:30px 0 0;margin-bottom:10px}.vfc-dayNames span{width:100%;margin-right:5px;color:#333;text-align:center}.vfc-dayNames span:last-child{margin-right:0}.vfc-week-number{border-right:1px solid #ff8498}.vfc-week .vfc-day{position:relative;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;margin-top:3px}.vfc-week .vfc-day .vfc-base-end,.vfc-week .vfc-day .vfc-base-start{position:absolute;background:#8fd8ec;width:50%!important;border-radius:0!important;border-right-width:0!important;height:100%}.vfc-week .vfc-day .vfc-base-start{right:0}.vfc-week .vfc-day .vfc-base-end{left:0}.vfc-week .vfc-day span.vfc-span-day{display:inline-block;text-align:center;width:30px;line-height:30px;border-radius:50%;margin:0 auto;vertical-align:middle}.vfc-week .vfc-day span.vfc-span-day.vfc-today{background-color:#ff8498;color:#fff}.vfc-week .vfc-day span.vfc-span-day.vfc-cursor-not-allowed{cursor:not-allowed}.vfc-week .vfc-day span.vfc-span-day.vfc-marked{margin:auto;background-color:#66b3cc;border-radius:50%;opacity:1;z-index:1}.vfc-week .vfc-day span.vfc-span-day.vfc-marked.vfc-borderd,.vfc-week .vfc-day span.vfc-span-day.vfc-marked.vfc-end-marked,.vfc-week .vfc-day span.vfc-span-day.vfc-marked.vfc-start-marked{color:#fff}.vfc-week .vfc-day span.vfc-span-day.vfc-marked.vfc-borderd:before,.vfc-week .vfc-day span.vfc-span-day.vfc-marked.vfc-end-marked:before,.vfc-week .vfc-day span.vfc-span-day.vfc-marked.vfc-start-marked:before{background:transparent}.vfc-week .vfc-day span.vfc-span-day.vfc-marked:before{top:0;left:0;content:\"\";position:absolute;background-color:#8fd8ec;width:100%;height:100%;z-index:-1}.vfc-week .vfc-day span.vfc-span-day.vfc-marked:after{color:#000}.vfc-week .vfc-day span.vfc-span-day.vfc-marked.vfc-hide{color:#d9d9d9}.vfc-week .vfc-day span.vfc-span-day.vfc-hide{color:#bfbfbf}.vfc-week .vfc-day span.vfc-span-day.vfc-disabled{margin:auto;color:rgba(0,0,0,.2);border-radius:50%;opacity:1;z-index:2}.vfc-week .vfc-day span.vfc-span-day:after{z-index:2;position:absolute;top:0;left:0;bottom:0;right:0;content:attr(data-date);color:#000;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.vfc-week .vfc-day span.vfc-span-day.vfc-hover:hover,.vfc-week .vfc-day span.vfc-span-day.vfc-hovered{background-color:#dadada;z-index:100}.vfc-week .vfc-day:last-child{color:#000}.rangeCleaner{padding:5px 0 10px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.rangeCleaner span{color:#fff;border-radius:5px;border:none;padding:5px}.rangeCleaner span.active{background-color:#66b3cc}.rangeCleaner span.active:hover{background-color:#4f8a9e;cursor:pointer}.rangeCleaner span.disabled{background-color:#949494}", ""]);

// exports


/***/ }),

/***/ "3fce":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".footerCon[data-v-557145ac]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin:0 20px 20px}", ""]);

// exports


/***/ }),

/***/ "40c3":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("6b4c");
var TAG = __webpack_require__("5168")('toStringTag');
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

/***/ "416f":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".vfc-time-picker-container[data-v-bac60cee]{min-width:250px}.vfc-time-picker-container .vfc-modal-time-line>span>span[data-v-bac60cee]:not(:nth-child(2)):not(.vfc-active):hover{cursor:pointer}.vfc-time-picker-container .titles[data-v-bac60cee]{display:-webkit-box;display:-ms-flexbox;display:flex;padding:10px 0}.vfc-time-picker-container .titles>div[data-v-bac60cee]{-webkit-box-flex:1;-ms-flex:1;flex:1;text-align:center;color:#66b3cc;word-break:break-all;font-size:25px}.vfc-time-picker-container .vfc-time-picker[data-v-bac60cee]{padding-bottom:20px}", ""]);

// exports


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "454f":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("46a7");
var $Object = __webpack_require__("584a").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "45f2":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("d9f6").f;
var has = __webpack_require__("07e3");
var TAG = __webpack_require__("5168")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "4630":
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

/***/ "46a7":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("63b6");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__("8e60"), 'Object', { defineProperty: __webpack_require__("d9f6").f });


/***/ }),

/***/ "47ee":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("c3a1");
var gOPS = __webpack_require__("9aa9");
var pIE = __webpack_require__("355d");
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

/***/ "481b":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "4917":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toLength = __webpack_require__("9def");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");

// @@match logic
__webpack_require__("214f")('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ "496d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Day_vue_vue_type_style_index_0_id_3591d458_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("df44");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Day_vue_vue_type_style_index_0_id_3591d458_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Day_vue_vue_type_style_index_0_id_3591d458_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "499e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ addStylesClient; });

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "4ee1":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("5168")('iterator');
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

/***/ "50ed":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "5147":
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "5168":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("dbdb")('wks');
var uid = __webpack_require__("62a0");
var Symbol = __webpack_require__("e53d").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "53e2":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("07e3");
var toObject = __webpack_require__("241e");
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "549b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__("d864");
var $export = __webpack_require__("63b6");
var toObject = __webpack_require__("241e");
var call = __webpack_require__("b0dc");
var isArrayIter = __webpack_require__("3702");
var toLength = __webpack_require__("b447");
var createProperty = __webpack_require__("20fd");
var getIterFn = __webpack_require__("7cd6");

$export($export.S + $export.F * !__webpack_require__("4ee1")(function (iter) { Array.from(iter); }), 'Array', {
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

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5559":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("dbdb")('keys');
var uid = __webpack_require__("62a0");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "55dd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("5ca1");
var aFunction = __webpack_require__("d8e8");
var toObject = __webpack_require__("4bf8");
var fails = __webpack_require__("79e5");
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__("2f21")($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),

/***/ "584a":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "5b4e":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("36c3");
var toLength = __webpack_require__("b447");
var toAbsoluteIndex = __webpack_require__("0fc9");
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

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
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

/***/ "5d58":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("d8d6");

/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "62a0":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "63b6":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var core = __webpack_require__("584a");
var ctx = __webpack_require__("d864");
var hide = __webpack_require__("35e8");
var has = __webpack_require__("07e3");
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
    if (own && has(exports, key)) continue;
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

/***/ "6718":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var core = __webpack_require__("584a");
var LIBRARY = __webpack_require__("b8e3");
var wksExt = __webpack_require__("ccb9");
var defineProperty = __webpack_require__("d9f6").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "6762":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__("5ca1");
var $includes = __webpack_require__("c366")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__("9c6c")('includes');


/***/ }),

/***/ "67ac":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("416f");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("840ea56a", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "67bb":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("f921");

/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "69d3":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("6718")('asyncIterator');


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
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

/***/ "6abf":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("e6f3");
var hiddenKeys = __webpack_require__("1691").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "6b4c":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "6b54":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("3846");
var anObject = __webpack_require__("cb7c");
var $flags = __webpack_require__("0bfb");
var DESCRIPTORS = __webpack_require__("9e1e");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__("2aba")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__("79e5")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "6c1c":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("c367");
var global = __webpack_require__("e53d");
var hide = __webpack_require__("35e8");
var Iterators = __webpack_require__("481b");
var TO_STRING_TAG = __webpack_require__("5168")('toStringTag');

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

/***/ "71c1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("3a38");
var defined = __webpack_require__("25eb");
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

/***/ "7333":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__("9e1e");
var getKeys = __webpack_require__("0d58");
var gOPS = __webpack_require__("2621");
var pIE = __webpack_require__("52a7");
var toObject = __webpack_require__("4bf8");
var IObject = __webpack_require__("626a");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("79e5")(function () {
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
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "7514":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__("5ca1");
var $find = __webpack_require__("0a49")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("9c6c")(KEY);


/***/ }),

/***/ "765d":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("6718")('observable');


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "774e":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("d2d5");

/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "794b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("8e60") && !__webpack_require__("294c")(function () {
  return Object.defineProperty(__webpack_require__("1ec9")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "79aa":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7cd6":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("40c3");
var ITERATOR = __webpack_require__("5168")('iterator');
var Iterators = __webpack_require__("481b");
module.exports = __webpack_require__("584a").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "7e90":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("d9f6");
var anObject = __webpack_require__("e4ae");
var getKeys = __webpack_require__("c3a1");

module.exports = __webpack_require__("8e60") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "8436":
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "85f2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("454f");

/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
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

/***/ "8e60":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("294c")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "8f60":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("a159");
var descriptor = __webpack_require__("aebd");
var setToStringTag = __webpack_require__("45f2");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("35e8")(IteratorPrototype, __webpack_require__("5168")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "9003":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("6b4c");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "9138":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("35e8");


/***/ }),

/***/ "9aa9":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
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

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "9ee1":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".vfc-day[data-v-3591d458]{position:relative}.vfc-day .times[data-v-3591d458]{position:absolute;top:-5px;background-color:red;color:#fff;border-radius:50%;width:15px;z-index:20;height:15px;line-height:15px}.vfc-day .times[data-v-3591d458]:hover{cursor:pointer;background-color:#c70000}.vfc-day .number[data-v-3591d458]{position:absolute;top:-5px;right:calc(50% + 7px);background-color:green;color:#fff;font-size:10px;border-radius:50%;width:15px;z-index:30;height:15px;line-height:15px}.vfc-day .number[data-v-3591d458]:hover,.vfc-day .toolTip[data-v-3591d458]{background-color:#005e00}.vfc-day .toolTip[data-v-3591d458]{position:absolute;top:-20px;left:0;padding:5px;max-width:108px;word-wrap:break-word;border-radius:5px;z-index:200}", ""]);

// exports


/***/ }),

/***/ "a159":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("e4ae");
var dPs = __webpack_require__("7e90");
var enumBugKeys = __webpack_require__("1691");
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("1ec9")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("32fc").appendChild(iframe);
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

/***/ "a35c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_style_index_0_id_557145ac_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e818");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_style_index_0_id_557145ac_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_style_index_0_id_557145ac_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var toInteger = __webpack_require__("4588");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "a745":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("f410");

/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
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

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
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

/***/ "aebd":
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

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "b0dc":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("e4ae");
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

/***/ "b447":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("3a38");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "b8e3":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "bf0b":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("355d");
var createDesc = __webpack_require__("aebd");
var toIObject = __webpack_require__("36c3");
var toPrimitive = __webpack_require__("1bc3");
var has = __webpack_require__("07e3");
var IE8_DOM_DEFINE = __webpack_require__("794b");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("8e60") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "c207":
/***/ (function(module, exports) {



/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
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

/***/ "c367":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("8436");
var step = __webpack_require__("50ed");
var Iterators = __webpack_require__("481b");
var toIObject = __webpack_require__("36c3");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("30f1")(Array, 'Array', function (iterated, kind) {
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

/***/ "c3a1":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("e6f3");
var enumBugKeys = __webpack_require__("1691");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
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
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
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

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ccb9":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("5168");


/***/ }),

/***/ "cd1c":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("e853");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

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

/***/ "d2c8":
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__("aae3");
var defined = __webpack_require__("be13");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "d2d5":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("1654");
__webpack_require__("549b");
module.exports = __webpack_require__("584a").Array.from;


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d864":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("79aa");
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

/***/ "d8d6":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("1654");
__webpack_require__("6c1c");
module.exports = __webpack_require__("ccb9").f('iterator');


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "d9f6":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e4ae");
var IE8_DOM_DEFINE = __webpack_require__("794b");
var toPrimitive = __webpack_require__("1bc3");
var dP = Object.defineProperty;

exports.f = __webpack_require__("8e60") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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

/***/ "dbdb":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("584a");
var global = __webpack_require__("e53d");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("b8e3") ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "df44":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("9ee1");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("ec6ba082", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e4ae":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "e53d":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "e6f3":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("07e3");
var toIObject = __webpack_require__("36c3");
var arrayIndexOf = __webpack_require__("5b4e")(false);
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');

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

/***/ "e818":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("3fce");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("712083f3", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "e853":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var isArray = __webpack_require__("1169");
var SPECIES = __webpack_require__("2b4c")('species');

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

/***/ "ebd6":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("cb7c");
var aFunction = __webpack_require__("d8e8");
var SPECIES = __webpack_require__("2b4c")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "ebfd":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("62a0")('meta');
var isObject = __webpack_require__("f772");
var has = __webpack_require__("07e3");
var setDesc = __webpack_require__("d9f6").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("294c")(function () {
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

/***/ "f410":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("1af6");
module.exports = __webpack_require__("584a").Array.isArray;


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "f751":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("5ca1");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("7333") });


/***/ }),

/***/ "f772":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "f921":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("014b");
__webpack_require__("c207");
__webpack_require__("69d3");
__webpack_require__("765d");
module.exports = __webpack_require__("584a").Symbol;


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b737400a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FunctionalCalendar.vue?vue&type=template&id=945f28ea&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"popoverElement",staticClass:"vfc-popover-container",attrs:{"tabindex":"0"}},[_c('PickerInputs',{attrs:{"fConfigs":_vm.fConfigs,"singleSelectedDate":_vm.singleSelectedDate,"calendar":_vm.calendar},scopedSlots:_vm._u([{key:"dateRangeInputs",fn:function(props){return [_vm._t("dateRangeInputs",null,{"startDate":props.startDate,"endDate":props.endDate,"isTypeable":_vm.fConfigs.isTypeable})]}},{key:"datePickerInput",fn:function(props){return [_vm._t("datePickerInput",null,{"selectedDate":props.selectedDate,"isTypeable":_vm.fConfigs.isTypeable})]}}],null,true)}),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showCalendar),expression:"showCalendar"}],ref:"mainContainer",staticClass:"vfc-main-container",class:{
      'vfc-modal':
        _vm.fConfigs.isModal &&
        (_vm.fConfigs.isDatePicker ||
          _vm.fConfigs.isDateRange ||
          _vm.fConfigs.isMultipleDatePicker),
      'vfc-dark': _vm.fConfigs.isDark
    }},[(_vm.showTimePicker)?_c('time-picker',{ref:"timePicker",attrs:{"height":_vm.$refs.popoverElement.clientHeight}}):[_c('div',{staticClass:"vfc-calendars-container"},[_c('Arrows',{attrs:{"isMultiple":false,"fConfigs":_vm.fConfigs,"allowPreDate":_vm.allowPreDate,"allowNextDate":_vm.allowNextDate},scopedSlots:_vm._u([{key:"navigationArrowLeft",fn:function(){return [_vm._t("navigationArrowLeft")]},proxy:true},{key:"navigationArrowRight",fn:function(){return [_vm._t("navigationArrowRight")]},proxy:true}],null,true)}),_c('div',{ref:"calendars",staticClass:"vfc-calendars"},_vm._l((_vm.listCalendars),function(calendarItem,key){return _c('div',{key:calendarItem.key,staticClass:"vfc-calendar"},[_c('month-year-picker',{directives:[{name:"show",rawName:"v-show",value:(
                _vm.showMonthPicker === key + 1 || _vm.showYearPicker === key + 1
              ),expression:"\n                showMonthPicker === key + 1 || showYearPicker === key + 1\n              "}],ref:"monthContainer",refInFor:true,class:'vfc-' + _vm.fConfigs.titlePosition,attrs:{"changeYearStep":_vm.changeYearStep,"calendar-key":key}}),_c('div',{staticClass:"vfc-content"},[_c('Arrows',{attrs:{"isMultiple":true,"fConfigs":_vm.fConfigs,"allowPreDate":_vm.allowPreDate,"allowNextDate":_vm.allowNextDate,"calendar-key":key},scopedSlots:_vm._u([{key:"navigationArrowLeft",fn:function(){return [_vm._t("navigationArrowLeft")]},proxy:true},{key:"navigationArrowRight",fn:function(){return [_vm._t("navigationArrowRight")]},proxy:true}],null,true)}),_c('transition',{attrs:{"tag":"div","name":_vm.getTransition_(),"appear":""}},[(_vm.checkHiddenElement('month'))?_c('div',{staticClass:"vfc-top-date",class:'vfc-' + _vm.fConfigs.titlePosition},[_c('span',{class:{
                      'vfc-cursor-pointer vfc-underline':
                        _vm.fConfigs.changeMonthFunction &&
                        _vm.isNotSeparatelyAndFirst(key),
                      'vfc-underline-active': _vm.showMonthPicker === key + 1
                    },on:{"click":function($event){$event.preventDefault();_vm.isNotSeparatelyAndFirst(key) && _vm.openMonthPicker(key + 1)}}},[_vm._v("\n                    "+_vm._s(calendarItem.month))]),_c('span',{class:{
                      'vfc-cursor-pointer vfc-underline':
                        _vm.fConfigs.changeYearFunction &&
                        _vm.isNotSeparatelyAndFirst(key),
                      'vfc-underline-active': _vm.showYearPicker === key + 1
                    },on:{"click":function($event){$event.preventDefault();_vm.isNotSeparatelyAndFirst(key) && _vm.openYearPicker(key + 1)}}},[_vm._v("\n                    "+_vm._s(calendarItem.year)+"\n                  ")])]):_vm._e()]),_c('transition',{attrs:{"tag":"div","name":_vm.getTransition_(),"appear":""}},[_c('div',{staticClass:"vfc-dayNames"},[(_vm.fConfigs.showWeekNumbers)?_c('span'):_vm._e(),_vm._l((_vm.fConfigs.dayNames),function(dayName,dayKey){return _c('span',{key:key + dayKey + 1,staticClass:"vfc-day"},[(_vm.checkHiddenElement('dayNames'))?[_vm._v("\n                      "+_vm._s(dayName)+"\n                    ")]:_vm._e()],2)})],2)]),_c('transition-group',{attrs:{"tag":"div","name":_vm.getTransition_(),"appear":""}},[_vm._l((calendarItem.weeks),function(week,week_key){return _c('div',{key:key + week_key + 1,staticClass:"vfc-week"},[(_vm.showWeekNumbers)?_c('WeekNumbers',{attrs:{"number":week.number,"borderColor":_vm.borderColor}}):_vm._e(),_vm._l((week.days),function(day,day_key){return _c('Day',{key:key + week_key + day_key + 1,ref:"day",refInFor:true,attrs:{"isMultipleDateRange":_vm.isMultipleDateRange,"day":day,"fConfigs":_vm.fConfigs,"calendar":_vm.calendar,"helpCalendar":_vm.helpCalendar,"week":week,"day_key":day_key,"alwaysUseDefaultClasses":_vm.alwaysUseDefaultClasses},on:{"dayMouseOver":_vm.dayMouseOver},scopedSlots:_vm._u([{key:"default",fn:function(props){return [_vm._t("default",null,{"week":props.week,"day":props.day})]}}],null,true)})})],2)}),(
                    calendarItem.weeks.length < 6 &&
                      !_vm.fConfigs.isLayoutExpandable
                  )?_vm._l((6 - calendarItem.weeks.length),function(moreWeekKey){return _c('div',{key:key + moreWeekKey + 'moreWeek',staticStyle:{"height":"32.6px"}},[_vm._v("\n                     \n                  ")])}):_vm._e()],2)],1)],1)}),0),(_vm.canClearRange || _vm.$slots['footer'])?_c('Footer',{scopedSlots:_vm._u([{key:"footer",fn:function(){return [_c('div',{on:{"click":_vm.cleanRange}},[_vm._t("cleaner",function(){return [(_vm.canClearRange && _vm.fConfigs.isDateRange)?_c('div',{staticClass:"rangeCleaner"},[_c('span',{class:[_vm.rangeIsSelected ? 'active' : 'disabled'],on:{"click":_vm.cleanRange}},[_vm._v("Clear Range"+_vm._s(_vm.isMultipleDateRange && 's'))])]):_vm._e()]})],2),_vm._t("footer")]},proxy:true}],null,true)}):_vm._e()],1)]],2)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FunctionalCalendar.vue?vue&type=template&id=945f28ea&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find-index.js
var es6_array_find_index = __webpack_require__("20d6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.array.includes.js
var es7_array_includes = __webpack_require__("6762");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.includes.js
var es6_string_includes = __webpack_require__("2fdb");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js
var is_array = __webpack_require__("a745");
var is_array_default = /*#__PURE__*/__webpack_require__.n(is_array);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithoutHoles.js


function _arrayWithoutHoles(arr) {
  if (is_array_default()(arr)) return _arrayLikeToArray(arr);
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/symbol.js
var symbol = __webpack_require__("67bb");
var symbol_default = /*#__PURE__*/__webpack_require__.n(symbol);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js
var iterator = __webpack_require__("5d58");
var iterator_default = /*#__PURE__*/__webpack_require__.n(iterator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/from.js
var from = __webpack_require__("774e");
var from_default = /*#__PURE__*/__webpack_require__.n(from);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArray.js



function _iterableToArray(iter) {
  if (typeof symbol_default.a !== "undefined" && iter[iterator_default.a] != null || iter["@@iterator"] != null) return from_default()(iter);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/unsupportedIterableToArray.js


function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return from_default()(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js


function typeof_typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof symbol_default.a === "function" && typeof iterator_default.a === "symbol") {
    typeof_typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    typeof_typeof = function _typeof(obj) {
      return obj && typeof symbol_default.a === "function" && obj.constructor === symbol_default.a && obj !== symbol_default.a.prototype ? "symbol" : typeof obj;
    };
  }

  return typeof_typeof(obj);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.match.js
var es6_regexp_match = __webpack_require__("4917");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("6b54");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js
var define_property = __webpack_require__("85f2");
var define_property_default = /*#__PURE__*/__webpack_require__.n(define_property);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js


function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    define_property_default()(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
// CONCATENATED MODULE: ./src/assets/js/helpCalendar.js








Date.prototype.getWeekNumber = function (sundayStart) {
  if (!sundayStart) {
    // ISO week date weeks start on monday
    // so correct the day number
    var dayNumber = (this.getDay() + 6) % 7; // Set the target to the thursday of this week so the
    // target date is in the right year

    this.setDate(this.getDate() - dayNumber + 3);
  }

  var january4 = new Date(this.getFullYear(), 0, 4);
  return Math.ceil(((this - january4) / 86400000 + january4.getDay() + 1) / 7);
};

var helpCalendar_helpCalendar = /*#__PURE__*/function () {
  function helpCalendar(sundayStart, leftAndRightDays, dateFormat, dayNames) {
    _classCallCheck(this, helpCalendar);

    this.sundayStart = sundayStart;
    this.leftAndRightDays = leftAndRightDays;
    this.dateFormat = dateFormat;
    this.dayNames = dayNames;
  }

  _createClass(helpCalendar, [{
    key: "formatDate",
    value: function formatDate(date) {
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      var formattedDate = this.dateFormat.replace('dd', day.toString());
      formattedDate = formattedDate.replace('mm', month.toString());
      formattedDate = formattedDate.replace('yyyy', year.toString());
      return formattedDate.split(' ')[0];
    }
  }, {
    key: "getDateFromFormat",
    value: function getDateFromFormat(date) {
      var format = this.dateFormat.split(' ')[0];
      date = date.split(' ')[0];

      if (format.indexOf('/') !== -1) {
        format = format.split('/');
        date = date.split('/');
      } else if (format.indexOf('-') !== -1) {
        format = format.split('-');
        date = date.split('-');
      } else if (format.indexOf('.') !== -1) {
        format = format.split('.');
        date = date.split('.');
      } else {
        throw new Error('Your date format not valid. Please read documentation.!');
      }

      var year = format.indexOf('yyyy');
      var month = format.indexOf('mm');
      var day = format.indexOf('dd');
      return new Date(date[year], date[month] - 1, date[day]);
    }
  }, {
    key: "checkValidDate",
    value: function checkValidDate(val) {
      val = this.getDateFromFormat(val);

      if (val != 'Invalid Date') {
        return true;
      }

      return false;
    }
  }, {
    key: "getWeeksInMonth",
    value: function getWeeksInMonth(month, year) {
      var weeks = [],
          firstDate = new Date(year, month, 1),
          lastDate = new Date(year, month + 1, 0),
          numDays = lastDate.getDate();
      var start = 1;
      var end = !this.sundayStart ? firstDate.getDay() === 0 ? 1 : 7 - firstDate.getDay() + 1 : 7 - firstDate.getDay();

      while (start <= numDays) {
        weeks.push({
          year: year,
          start: start,
          end: end,
          number: new Date(year, month, start).getWeekNumber(this.sundayStart),
          days: []
        });
        start = end + 1;
        end = end + 7;
        if (end > numDays) end = numDays;
      }

      return {
        weeks: weeks,
        month: lastDate.getMonth(),
        year: lastDate.getFullYear()
      };
    }
  }, {
    key: "getLeftMonthDays",
    value: function getLeftMonthDays(month, year) {
      var weeks = this.getWeeksInMonth(month, year);
      var firstWeek = weeks.weeks[0];
      var weekDaysCount = firstWeek.end - firstWeek.start + 1;
      var days = [];
      var finalYear = 0;
      var finalMonth = 0;

      if (weekDaysCount !== 7) {
        var weeksLeftMonth = this.getWeeksInMonth(month - 1, year);
        var leftMonthLastWeek = weeksLeftMonth.weeks[weeksLeftMonth.weeks.length - 1];

        for (var i = leftMonthLastWeek.start; i <= leftMonthLastWeek.end; i++) {
          days.push(i);
        }

        finalMonth = weeksLeftMonth.month;
        finalYear = weeksLeftMonth.year;
      }

      return {
        days: days.reverse(),
        month: finalMonth,
        year: finalYear
      };
    }
  }, {
    key: "getRightMonthDays",
    value: function getRightMonthDays(month, year) {
      var weeks = this.getWeeksInMonth(month, year);
      var lastWeek = weeks.weeks[weeks.weeks.length - 1];
      var weekDaysCount = lastWeek.end - lastWeek.start + 1;
      var days = [];
      var finalYear = 0;
      var finalMonth = 0;

      if (weekDaysCount !== 7) {
        var weeksRightMonth = this.getWeeksInMonth(month + 1, year);
        var rightMonthFirstWeek = weeksRightMonth.weeks[0];

        for (var i = rightMonthFirstWeek.start; i <= rightMonthFirstWeek.end; i++) {
          days.push(i);
        }

        finalMonth = weeksRightMonth.month;
        finalYear = weeksRightMonth.year;
      }

      return {
        days: days,
        month: finalMonth,
        year: finalYear
      };
    }
  }, {
    key: "getFinalizedWeeks",
    value: function getFinalizedWeeks(month, year) {
      var _this = this;

      var monthWeeks = this.getWeeksInMonth(month, year);
      var leftMonthDays = this.getLeftMonthDays(month, year);
      var rightMonthDays = this.getRightMonthDays(month, year); // Push Current Month Week days

      monthWeeks.weeks.forEach(function (week) {
        for (var i = week.start; i <= week.end; i++) {
          week.days.push({
            day: i,
            month: monthWeeks.month,
            year: monthWeeks.year,
            hide: false,
            hideLeftAndRightDays: false
          });
        }
      }); // Left month days

      if (leftMonthDays.days.length) {
        leftMonthDays.days.forEach(function (day) {
          var hideLeftAndRightDays = false;

          if (!_this.leftAndRightDays) {
            day = '';
            hideLeftAndRightDays = true;
          }

          monthWeeks.weeks[0].days.unshift({
            day: day,
            month: leftMonthDays.month,
            year: leftMonthDays.year,
            hide: true,
            hideLeftAndRightDays: hideLeftAndRightDays
          });
        });
      } // Right month days


      if (rightMonthDays.days.length) {
        rightMonthDays.days.forEach(function (day) {
          var hideLeftAndRightDays = false;

          if (!_this.leftAndRightDays) {
            day = '';
            hideLeftAndRightDays = true;
          }

          monthWeeks.weeks[monthWeeks.weeks.length - 1].days.push({
            day: day,
            month: rightMonthDays.month,
            year: rightMonthDays.year,
            hide: true,
            hideLeftAndRightDays: hideLeftAndRightDays
          });
        });
      } // Remove Week Year


      monthWeeks.weeks.forEach(function (week) {
        delete week.year;
      });
      return monthWeeks.weeks;
    }
  }, {
    key: "mask",
    value: function mask(value) {
      var dayLength = this.getDateFromFormat(value).getDate().toString().length;
      var month = this.getDateFromFormat(value).getMonth();
      var dayMask = '00';

      if (dayLength === 1) {
        dayMask = '0';
      }

      var monthMask = '00';

      if (month + 1 <= 9) {
        monthMask = '0';
      }

      var mask = this.dateFormat.replace('dd', dayMask).replace('mm', monthMask).replace('yyyy', '0000'); // eslint-disable-next-line

      var literalPattern = /[0\*]/;
      var numberPattern = /[0-9]/;
      var newValue = '';

      for (var vId = 0, mId = 0; mId < mask.length;) {
        if (mId >= value.length) break; // Number expected but got a different value, store only the valid portion

        if (mask[mId] === '0' && value[vId].match(numberPattern) == null) {
          break;
        } // Found a literal


        while (mask[mId].match(literalPattern) == null) {
          if (value[vId] === mask[mId]) break;
          newValue += mask[mId++];
        }

        newValue += value[vId++];
        mId++;
      }

      return newValue;
    }
  }]);

  return helpCalendar;
}();


// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// CONCATENATED MODULE: ./src/mixins/propsAndData.js



var undefinedGenerator = function undefinedGenerator() {
  return undefined;
};

var propsAndData = {
  props: {
    borderColor: {
      type: String,
      default: ''
    },
    displayTimeInput: {
      type: Boolean,
      default: false
    },
    configs: {
      type: Object,
      default: function _default() {}
    },
    sundayStart: {
      type: Boolean,
      default: undefinedGenerator
    },
    placeholder: {
      type: [String, Boolean],
      default: undefinedGenerator
    },
    dateFormat: {
      type: String,
      validator: function validator(format) {
        var timeFormat = format.split(' ')[1];

        if (!timeFormat) {
          return true;
        }

        var validFormats = ['HH:MM', 'HH:mm', 'hh:MM', 'hh:mm'];
        return !!~validFormats.indexOf(timeFormat);
      }
    },
    canClearRange: {
      type: Boolean,
      default: false
    },
    isMultiple: {
      type: Boolean,
      default: undefinedGenerator
    },
    isSeparately: {
      type: Boolean,
      default: undefinedGenerator
    },
    isDatePicker: {
      type: Boolean,
      default: undefinedGenerator
    },
    isMultipleDatePicker: {
      type: Boolean,
      default: undefinedGenerator
    },
    isMultipleDateRange: {
      type: Boolean,
      default: undefinedGenerator
    },
    isDateRange: {
      type: Boolean,
      default: undefinedGenerator
    },
    withTimePicker: {
      type: Boolean,
      default: undefinedGenerator
    },
    calendarsCount: {
      type: Number
    },
    isModal: {
      type: Boolean,
      default: undefinedGenerator
    },
    isTypeable: {
      type: Boolean,
      default: undefinedGenerator
    },
    changeMonthFunction: {
      type: Boolean,
      default: undefinedGenerator
    },
    changeYearFunction: {
      type: Boolean,
      default: undefinedGenerator
    },
    changeYearStep: {
      type: Number,
      default: function _default() {
        return 3;
      }
    },
    changeMonthStep: {
      type: Number,
      default: function _default() {
        return 1;
      }
    },
    newCurrentDate: {
      type: Date
    },
    markedDates: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    markedDateRange: {
      type: [Object, Array]
    },
    disabledDayNames: {
      type: Array
    },
    disabledDates: {
      type: Array
    },
    enabledDates: {
      type: Array
    },
    limits: {
      type: [Object, Boolean],
      default: undefinedGenerator
    },
    minSelDays: {
      type: [Number, Boolean],
      default: undefinedGenerator
    },
    maxSelDays: {
      type: [Number, Boolean],
      default: undefinedGenerator
    },
    dayNames: {
      type: Array
    },
    monthNames: {
      type: Array
    },
    shortMonthNames: {
      type: Array
    },
    showWeekNumbers: {
      type: Boolean,
      default: undefinedGenerator
    },
    value: {
      type: Object
    },
    transition: {
      type: Boolean,
      default: undefinedGenerator
    },
    hiddenElements: {
      type: Array
    },
    isAutoCloseable: {
      type: Boolean,
      default: undefined
    },
    isDark: {
      type: Boolean,
      default: undefined
    },
    isLayoutExpandable: {
      type: Boolean,
      default: undefined
    },
    titlePosition: {
      type: String,
      default: 'center'
    },
    arrowsPosition: {
      type: String,
      default: 'space-between'
    },
    alwaysUseDefaultClasses: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      popoverElement: '',
      defaultDateFormat: {
        date: false,
        dateTime: false,
        hour: '00',
        minute: '00'
      },
      hoveredObject: null,
      calendar: {
        currentDate: new Date(),
        selectedDate: false,
        selectedDateTime: false,
        selectedHour: '00',
        selectedMinute: '00',
        selectedDatesItem: '',
        selectedDates: [],
        dateRange: {
          start: '',
          end: ''
        },
        multipleDateRange: []
      },
      transitionPrefix: 'left',
      showCalendar: true,
      showMonthPicker: false,
      showYearPicker: false,
      showTimePicker: false,
      allowPreDate: true,
      allowNextDate: true,
      listCalendars: [],
      fConfigs: {
        sundayStart: false,
        placeholder: false,
        dateFormat: 'dd/mm/yyyy hh:MM',
        isMultipleDateRange: false,
        isDatePicker: false,
        isMultipleDatePicker: false,
        isDateRange: false,
        withTimePicker: false,
        isMultiple: false,
        calendarsCount: 1,
        isSeparately: false,
        isModal: false,
        isTypeable: false,
        changeMonthFunction: false,
        changeYearFunction: false,
        changeYearStep: 3,
        changeMonthStep: 1,
        markedDates: [],
        markedDateRange: {
          start: false,
          end: false
        },
        limits: false,
        minSelDays: false,
        maxSelDays: false,
        disabledDates: [],
        enabledDates: [],
        disabledDayNames: [],
        dayNames: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        shortMonthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        showWeekNumbers: false,
        transition: true,
        hiddenElements: [],
        isAutoCloseable: false,
        isDark: false,
        isLayoutExpandable: false,
        titlePosition: 'center',
        arrowsPosition: 'space-between'
      }
    };
  }
};
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b737400a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/TimePicker.vue?vue&type=template&id=bac60cee&scoped=true&
var TimePickervue_type_template_id_bac60cee_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vfc-time-picker-container"},[_c('div',{staticClass:"vfc-close",on:{"click":function($event){return _vm.close()}}}),_c('div',{staticClass:"vfc-modal-time-mechanic"},[_c('div',{staticClass:"vfc-modal-time-line",attrs:{"id":"time-line"}},[_c('span',[(_vm.$parent.fConfigs.isDateRange)?[_c('span',{class:{ 'vfc-active': _vm.startDateActive },on:{"click":function($event){_vm.startDateActive = true}}},[_vm._v(_vm._s(_vm.$parent.calendar.dateRange.start))]),(_vm.$parent.calendar.dateRange.end)?[_c('span',[_vm._v("-")]),_c('span',{class:{ 'vfc-active': !_vm.startDateActive },on:{"click":function($event){_vm.startDateActive = false}}},[_vm._v(_vm._s(_vm.$parent.calendar.dateRange.end))])]:_vm._e()]:(_vm.$parent.fConfigs.isMultipleDatePicker)?[_vm._v(_vm._s(_vm.getCurrentDateTime))]:[_vm._v(_vm._s(_vm.$parent.calendar.selectedDateTime))]],2)]),_vm._m(0),_c('div',{staticClass:"vfc-time-picker"},[_c('div',{ref:"hourList",staticClass:"vfc-time-picker__list vfc-time-picker__list--hours"},_vm._l((24),function(i){return _c('div',{key:i,staticClass:"vfc-time-picker__item",class:{
            'vfc-time-picker__item--selected': _vm.checkHourActiveClass(i)
          },on:{"click":function($event){_vm.changeHour(_vm.formatTime(i))}}},[_vm._v("\n          "+_vm._s(_vm.formatTime(i))+"\n        ")])}),0),_c('div',{ref:"minuteList",staticClass:"vfc-time-picker__list vfc-time-picker__list--minutes"},_vm._l((60),function(i){return _c('div',{key:i,staticClass:"vfc-time-picker__item",class:{
            'vfc-time-picker__item--selected': _vm.checkMinuteActiveClass(i)
          },on:{"click":function($event){_vm.changeMinute(_vm.formatTime(i))}}},[_vm._v("\n          "+_vm._s(_vm.formatTime(i))+"\n        ")])}),0)])])])}
var TimePickervue_type_template_id_bac60cee_scoped_true_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"titles"},[_c('div',[_vm._v("Hour")]),_c('div',[_vm._v("Minute")])])}]


// CONCATENATED MODULE: ./src/components/TimePicker.vue?vue&type=template&id=bac60cee&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/TimePicker.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var TimePickervue_type_script_lang_js_ = ({
  name: 'TimePicker',
  data: function data() {
    return {
      startDateActive: true,
      currentSelectedDate: ''
    };
  },
  props: {
    height: {
      type: Number,
      required: true
    }
  },
  watch: {
    startDateActive: function startDateActive() {
      this.setScrollPosition();
    }
  },
  computed: {
    getCurrentDate: function getCurrentDate() {
      return this.currentSelectedDate.date;
    },
    getCurrentDateTime: function getCurrentDateTime() {
      return this.currentSelectedDate.dateTime;
    }
  },
  created: function created() {
    var selectedDates = this.$parent.calendar.selectedDates;
    this.currentSelectedDate = selectedDates[selectedDates.length - 1];
  },
  mounted: function mounted() {
    var startDate = this.$parent.calendar.dateRange.start.split(' ')[0];
    var endDate = this.$parent.calendar.dateRange.end.split(' ')[0];

    if (startDate && this.$parent.helpCalendar.getDateFromFormat(startDate) < this.$parent.helpCalendar.getDateFromFormat(endDate)) {
      this.startDateActive = false;
    } else {
      this.startDateActive = true;
    }

    this.setSelectedDateTime();
    this.setStyles();
  },
  methods: {
    formatTime: function formatTime(i) {
      return i <= 10 ? '0' + (i - 1) : i - 1;
    },
    close: function close() {
      this.$parent.showTimePicker = false;
    },
    addMinuteHour: function addMinuteHour(what, val, to) {
      var res = '';
      res += val.split(' ')[0];

      if (what == 'hour') {
        res += ' ' + to + ':';
        res += val.split(' ')[1].split(':')[1];
      } else {
        res += ' ' + val.split(' ')[1].split(':')[0] + ':';
        res += to;
      }

      return res;
    },
    changeHour: function changeHour(hour) {
      var _this = this;

      if (this.$parent.fConfigs.isDateRange) {
        if (this.checkStartDate()) {
          this.$parent.calendar.dateRange.start = this.addMinuteHour('hour', this.$parent.calendar.dateRange.start, hour);
        } else {
          this.$parent.calendar.dateRange.end = this.addMinuteHour('hour', this.$parent.calendar.dateRange.end, hour);
        }
      } else if (this.$parent.fConfigs.isMultipleDatePicker) {
        var currentDate = this.$parent.calendar.selectedDates.find(function (date) {
          return date.date === _this.getCurrentDate;
        });
        currentDate.hour = hour;
      } else {
        this.$parent.calendar.selectedHour = hour;
      }

      this.setSelectedDateTime();
      this.setScrollPosition();
    },
    changeMinute: function changeMinute(minute) {
      var _this2 = this;

      if (this.$parent.fConfigs.isDateRange) {
        if (this.checkStartDate()) {
          this.$parent.calendar.dateRange.start = this.addMinuteHour('minute', this.$parent.calendar.dateRange.start, minute);
        } else {
          this.$parent.calendar.dateRange.end = this.addMinuteHour('minute', this.$parent.calendar.dateRange.end, minute);
        }
      } else if (this.$parent.fConfigs.isMultipleDatePicker) {
        var currentDate = this.$parent.calendar.selectedDates.find(function (date) {
          return date.date === _this2.getCurrentDate;
        });
        currentDate.minute = minute;
      } else {
        this.$parent.calendar.selectedMinute = minute;
      }

      this.setSelectedDateTime();
      this.setScrollPosition();
    },
    setSelectedDateTime: function setSelectedDateTime() {
      var _this3 = this;

      if (this.$parent.fConfigs.isDatePicker) {
        this.$parent.calendar.selectedDateTime = this.$parent.calendar.selectedDate + ' ' + this.$parent.calendar.selectedHour + ':' + this.$parent.calendar.selectedMinute;
      } else if (this.$parent.fConfigs.isMultipleDatePicker) {
        var currentDate = this.$parent.calendar.selectedDates.find(function (date) {
          return date.date === _this3.getCurrentDate;
        });
        currentDate.dateTime = currentDate.date + ' ' + currentDate.hour + ':' + currentDate.minute;
      }
    },
    checkStartDate: function checkStartDate() {
      return this.startDateActive;
    },
    checkHourActiveClass: function checkHourActiveClass(i) {
      var _this4 = this;

      var hour;

      if (this.$parent.fConfigs.isDateRange) {
        if (this.checkStartDate()) {
          hour = this.$parent.calendar.dateRange.start.split(' ')[1].split(':')[0];
        } else {
          hour = this.$parent.calendar.dateRange.end.split(' ')[1].split(':')[0];
        }
      } else if (this.$parent.fConfigs.isMultipleDatePicker) {
        hour = this.$parent.calendar.selectedDates.find(function (date) {
          return date.date === _this4.getCurrentDate;
        }).hour;
      } else {
        hour = this.$parent.calendar.selectedHour;
      }

      return hour == this.formatTime(i);
    },
    checkMinuteActiveClass: function checkMinuteActiveClass(i) {
      var _this5 = this;

      var minute;

      if (this.$parent.fConfigs.isDateRange) {
        if (this.checkStartDate()) {
          minute = this.$parent.calendar.dateRange.start.split(':')[1];
        } else {
          minute = this.$parent.calendar.dateRange.end.split(':')[1];
        }
      } else if (this.$parent.fConfigs.isMultipleDatePicker) {
        minute = this.$parent.calendar.selectedDates.find(function (date) {
          return date.date === _this5.getCurrentDate;
        }).minute;
      } else {
        minute = this.$parent.calendar.selectedMinute;
      }

      return minute == this.formatTime(i);
    },
    setStyles: function setStyles() {
      //let container = this.$parent.$refs.mainContainer
      this.setScrollPosition();
      var timeLineHeight = +this.height - 35 - 85; // - paddings - titles height

      document.getElementsByClassName('vfc-time-picker__list')[0].style.height = timeLineHeight + 'px';
      document.getElementsByClassName('vfc-time-picker__list')[1].style.height = timeLineHeight + 'px';
    },
    setScrollPosition: function setScrollPosition() {
      var container = this.$parent.$refs.mainContainer;
      this.$nextTick(function () {
        var selectedHour = this.$refs.hourList.querySelector('.vfc-time-picker__item--selected');
        var selectedMinute = this.$refs.minuteList.querySelector('.vfc-time-picker__item--selected');
        this.$refs.hourList.scrollTop = selectedHour ? selectedHour.offsetTop - container.clientHeight / 2 : 0;
        this.$refs.minuteList.scrollTop = selectedMinute ? selectedMinute.offsetTop - container.clientHeight / 2 : 0;
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/TimePicker.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_TimePickervue_type_script_lang_js_ = (TimePickervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/TimePicker.vue?vue&type=style&index=0&id=bac60cee&scoped=true&lang=scss&
var TimePickervue_type_style_index_0_id_bac60cee_scoped_true_lang_scss_ = __webpack_require__("257c");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/TimePicker.vue






/* normalize component */

var component = normalizeComponent(
  components_TimePickervue_type_script_lang_js_,
  TimePickervue_type_template_id_bac60cee_scoped_true_render,
  TimePickervue_type_template_id_bac60cee_scoped_true_staticRenderFns,
  false,
  null,
  "bac60cee",
  null
  
)

/* harmony default export */ var TimePicker = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b737400a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Arrows.vue?vue&type=template&id=1035d98b&
var Arrowsvue_type_template_id_1035d98b_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.oneArrows || _vm.manyArrows)?_c('div',{staticClass:"vfc-separately-navigation-buttons",class:'vfc-' + _vm.fConfigs.arrowsPosition},[_c('div',{class:{ 'vfc-cursor-pointer': _vm.allowPreDate },on:{"click":function($event){return _vm.$parent.PreMonth(_vm.oneArrows ? 0 : _vm.calendarKey)}}},[_vm._t("navigationArrowLeft",function(){return [_c('div',{staticClass:"vfc-arrow-left",class:{ 'vfc-disabled': !_vm.allowPreDate }})]})],2),_c('div',{class:{ 'vfc-cursor-pointer': _vm.allowNextDate },on:{"click":function($event){return _vm.$parent.NextMonth(_vm.oneArrows ? 0 : _vm.calendarKey)}}},[_vm._t("navigationArrowRight",function(){return [_c('div',{staticClass:"vfc-arrow-right",class:{ 'vfc-disabled': !_vm.allowNextDate }})]})],2)]):_vm._e()])}
var Arrowsvue_type_template_id_1035d98b_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Arrows.vue?vue&type=template&id=1035d98b&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Arrows.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Arrowsvue_type_script_lang_js_ = ({
  name: 'Arrows',
  props: {
    fConfigs: {
      type: Object,
      required: true
    },
    allowPreDate: {
      type: Boolean,
      required: true
    },
    allowNextDate: {
      type: Boolean,
      required: true
    },
    calendarKey: {
      type: Number,
      default: 0
    },
    isMultiple: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    oneArrows: function oneArrows() {
      return !this.fConfigs.isSeparately && !this.isMultiple;
    },
    manyArrows: function manyArrows() {
      return this.fConfigs.isSeparately && this.isMultiple;
    }
  }
});
// CONCATENATED MODULE: ./src/components/Arrows.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Arrowsvue_type_script_lang_js_ = (Arrowsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Arrows.vue





/* normalize component */

var Arrows_component = normalizeComponent(
  components_Arrowsvue_type_script_lang_js_,
  Arrowsvue_type_template_id_1035d98b_render,
  Arrowsvue_type_template_id_1035d98b_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Arrows = (Arrows_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b737400a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WeekNumbers.vue?vue&type=template&id=7a99a054&scoped=true&
var WeekNumbersvue_type_template_id_7a99a054_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vfc-day vfc-week-number",style:({ borderRightColor: _vm.borderColor })},[_c('span',{staticClass:"vfc-span-day"},[_vm._v(_vm._s(_vm.number))])])}
var WeekNumbersvue_type_template_id_7a99a054_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/WeekNumbers.vue?vue&type=template&id=7a99a054&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WeekNumbers.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
/* harmony default export */ var WeekNumbersvue_type_script_lang_js_ = ({
  name: 'WeekNumbers',
  props: {
    number: {
      tyoe: Number,
      required: true
    },
    borderColor: {
      type: String,
      default: ''
    }
  }
});
// CONCATENATED MODULE: ./src/components/WeekNumbers.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_WeekNumbersvue_type_script_lang_js_ = (WeekNumbersvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/WeekNumbers.vue





/* normalize component */

var WeekNumbers_component = normalizeComponent(
  components_WeekNumbersvue_type_script_lang_js_,
  WeekNumbersvue_type_template_id_7a99a054_scoped_true_render,
  WeekNumbersvue_type_template_id_7a99a054_scoped_true_staticRenderFns,
  false,
  null,
  "7a99a054",
  null
  
)

/* harmony default export */ var WeekNumbers = (WeekNumbers_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b737400a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Day.vue?vue&type=template&id=3591d458&scoped=true&
var Dayvue_type_template_id_3591d458_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vfc-day"},[(_vm.startActive)?_c('div',{staticClass:"vfc-base-start"}):_vm._e(),(_vm.endActive)?_c('div',{staticClass:"vfc-base-end"}):_vm._e(),(!_vm.day.hideLeftAndRightDays)?_c('span',{class:_vm.getClassNames(_vm.day),on:{"click":function($event){if($event.target !== $event.currentTarget){ return null; }return _vm.$parent.$parent.clickDay(_vm.day, _vm.isDisabledDate)},"mouseover":_vm.dayMouseOver}},[_vm._t("default",function(){return [_vm._v(_vm._s(_vm.day.day))]},{"week":_vm.week,"day":_vm.day}),(_vm.timesShow)?_c('span',{staticClass:"times",on:{"click":_vm.clearRange}},[_vm._v("×")]):_vm._e(),(_vm.numberShow)?_c('span',{staticClass:"number",on:{"mouseover":function($event){_vm.toolTip && (_vm.onNumber = true)},"mouseleave":function($event){_vm.onNumber = false}}},[_vm._v(_vm._s(_vm.getDaysNumber)+"\n      "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.toolTip && _vm.onNumber),expression:"toolTip && onNumber"}],staticClass:"toolTip"},[_vm._v("\n        "+_vm._s(_vm.toolTipTxt().join(' '))+"\n      ")])]):_vm._e()],2):_vm._e()])}
var Dayvue_type_template_id_3591d458_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Day.vue?vue&type=template&id=3591d458&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.sort.js
var es6_array_sort = __webpack_require__("55dd");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Day.vue?vue&type=script&lang=js&










//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Dayvue_type_script_lang_js_ = ({
  name: 'Day',
  props: {
    day_key: {
      type: Number,
      required: true
    },
    week: {
      type: Object,
      required: true
    },
    day: {
      type: Object,
      required: true
    },
    helpCalendar: {
      type: Object,
      required: true
    },
    fConfigs: {
      type: Object,
      required: true
    },
    calendar: {
      type: Object,
      required: true
    },
    alwaysUseDefaultClasses: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      toolTip: false,
      onNumber: false // toolTipTxt

    };
  },
  computed: {
    startActive: function startActive() {
      if (!this.fConfigs.isMultipleDateRange) return (this.day.isDateRangeStart || this.day.isMouseToLeft) && !this.day.hideLeftAndRightDays;
      if (!''.inRange) this.inRangeInit();
      var inAnyRange = this.day.date.inRange(this.calendar.multipleDateRange);
      var lastElement = this.calendar.multipleDateRange[this.calendar.multipleDateRange.length - 1];
      if (!lastElement) return inAnyRange;
      var lastHasDayStart = ~this.calendar.multipleDateRange.map(function (range) {
        return range.start;
      }).indexOf(this.day.date);
      var lastHasDayEnd = ~this.calendar.multipleDateRange.map(function (range) {
        return range.end;
      }).indexOf(this.day.date);
      if (lastHasDayStart === lastHasDayEnd && lastHasDayEnd) return inAnyRange;
      if (lastHasDayStart && ~lastHasDayStart > -1 && this.calendar.multipleDateRange[~lastHasDayStart].end) return lastHasDayStart || inAnyRange;

      if (!lastElement.start && !lastElement.end) {
        return lastHasDayStart || inAnyRange;
      } // console.log('lastElement')


      return (this.day.isDateRangeStart || this.day.isMouseToLeft) && !this.day.hideLeftAndRightDays || inAnyRange;
    },
    endActive: function endActive() {
      if (!this.fConfigs.isMultipleDateRange) return (this.day.isDateRangeEnd || this.day.isMouseToRight) && !this.day.hideLeftAndRightDays;
      if (!''.inRange) this.inRangeInit();
      var inAnyRange = this.day.date.inRange(this.calendar.multipleDateRange);
      var lastElement = this.calendar.multipleDateRange[this.calendar.multipleDateRange.length - 1];
      if (!lastElement) return inAnyRange;
      var lastHasDayStart = ~this.calendar.multipleDateRange.map(function (range) {
        return range.start;
      }).indexOf(this.day.date);
      var lastHasDayEnd = ~this.calendar.multipleDateRange.map(function (range) {
        return range.end;
      }).indexOf(this.day.date);
      if (lastHasDayStart === lastHasDayEnd && lastHasDayEnd) return inAnyRange;
      if (lastHasDayEnd) return true;

      if (!lastElement.start && !lastElement.end) {
        if (lastElement.start === lastElement.end) return false;
        return lastHasDayEnd;
      }

      return (this.day.isDateRangeEnd || this.day.isMouseToRight) && !this.day.hideLeftAndRightDays || inAnyRange;
    },
    numberShow: function numberShow() {
      if (!this.fConfigs.isMultipleDateRange) return false;
      var endPos = this.calendar.multipleDateRange.map(function (range) {
        return range.end;
      }).indexOf(this.day.date);
      return !!(~endPos || ~this.calendar.multipleDateRange.map(function (range) {
        return range.start;
      }).indexOf(this.day.date));
    },
    timesShow: function timesShow() {
      var res = this.calendar.multipleDateRange ? ~this.calendar.multipleDateRange.map(function (range) {
        return range.end;
      }).indexOf(this.day.date) : -1;
      return this.fConfigs.isMultipleDateRange && res;
    },
    getDaysNumber: function getDaysNumber() {
      var endPosFirst = this.calendar.multipleDateRange.map(function (range) {
        return range.end;
      }).indexOf(this.day.date);
      var startPosFirst = this.calendar.multipleDateRange.map(function (range) {
        return range.start;
      }).indexOf(this.day.date);
      var endPosLast = this.calendar.multipleDateRange.map(function (range) {
        return range.end;
      }).lastIndexOf(this.day.date);
      var startPosLast = this.calendar.multipleDateRange.map(function (range) {
        return range.start;
      }).lastIndexOf(this.day.date); // eslint-disable-next-line vue/no-side-effects-in-computed-properties

      this.toolTip = endPosFirst !== endPosLast || startPosFirst !== startPosLast || endPosFirst > -1 && startPosFirst > -1 || startPosFirst > -1 && endPosFirst > -1;

      if (this.toolTip) {
        return '·';
      }

      return (endPosFirst > -1 ? Number(endPosFirst) : 0) || startPosFirst;
    }
  },
  methods: {
    toolTipTxt: function toolTipTxt() {
      var numbers = [];
      var endArr = this.calendar.multipleDateRange.map(function (range) {
        return range.end;
      });
      var startArr = this.calendar.multipleDateRange.map(function (range) {
        return range.start;
      });
      var endIndex = 0;
      var startIndex = 0;
      var ind = endArr.indexOf(this.day.date, endIndex);

      while (~endArr.indexOf(this.day.date, endIndex)) {
        ind = endArr.indexOf(this.day.date, endIndex);
        numbers.push(ind);
        endIndex = ind + 1;
      }

      ind = startArr.indexOf(this.day.date, startIndex);

      while (~startArr.indexOf(this.day.date, startIndex)) {
        ind = startArr.indexOf(this.day.date, startIndex);
        numbers.push(ind);
        startIndex = ind + 1;
      }

      return numbers.sort(function (a, b) {
        return a - b;
      });
    },
    inRangeInit: function inRangeInit() {
      //!!!!\\
      var helpCalendar = this.helpCalendar;

      String.prototype.inRange = function (arr) {
        var _this = this;

        var res = false;
        arr.forEach(function (el) {
          var start = +helpCalendar.getDateFromFormat(el.start.split(' ')[0]);
          var end = +helpCalendar.getDateFromFormat(el.end.split(' ')[0]);
          var current = +helpCalendar.getDateFromFormat(_this.split(' ')[0]);
          if (start === end) return;
          if (start && end) res = res || start < current && current < end;
        });
        return res;
      }; //!!!!\\

    },
    clearRange: function clearRange() {
      var _this2 = this;

      //$emit
      var removeIndex = this.calendar.multipleDateRange.findIndex(function (range) {
        return range.end === _this2.day.date;
      });
      this.calendar.multipleDateRange.splice(removeIndex, 1);
    },
    dayMouseOver: function dayMouseOver() {
      this.$emit('dayMouseOver', this.day.date);
    },
    hasSlot: function hasSlot() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
      return !!this.$parent.$parent.$slots[name] || !!this.$parent.$parent.$scopedSlots[name];
    },
    isDisabledDate: function isDisabledDate(date) {
      var datesCollection = this.fConfigs.disabledDates;
      return this.isDateIncludedInDatesCollection(date, datesCollection) || !this.isEnabledDate(date);
    },
    isEnabledDate: function isEnabledDate(date) {
      var datesCollection = this.fConfigs.enabledDates;
      return datesCollection.length === 0 || this.isDateIncludedInDatesCollection(date, datesCollection);
    },
    isDateIncludedInDatesCollection: function isDateIncludedInDatesCollection(date, datesCollection) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      var dateObj = this.helpCalendar.getDateFromFormat(date);
      return datesCollection.includes(date) || datesCollection.includes('beforeToday') && dateObj.getTime() < today.getTime() || datesCollection.includes('afterToday') && dateObj.getTime() > today.getTime();
    },
    getClassNames: function getClassNames(day) {
      var _this3 = this;

      var classes = [];

      if (!this.hasSlot('default') || this.alwaysUseDefaultClasses) {
        classes.push('vfc-span-day');
      } // Disable days of week if set in configuration


      var dateDay = this.helpCalendar.getDateFromFormat(day.date).getDay() - 1;

      if (dateDay === -1) {
        dateDay = 6;
      }

      var dayOfWeekString = this.fConfigs.dayNames[dateDay];

      if (this.fConfigs.disabledDayNames.includes(dayOfWeekString)) {
        day.hide = true;
        classes.push('vfc-cursor-not-allowed');
      }

      var date = this.helpCalendar.getDateFromFormat(day.date);
      var today = new Date();
      today.setHours(0, 0, 0, 0); // Disabled dates

      if (this.isDisabledDate(day.date)) {
        classes.push('vfc-disabled');
        classes.push('vfc-cursor-not-allowed');
      }

      if (this.fConfigs.limits) {
        var min = this.helpCalendar.getDateFromFormat(this.fConfigs.limits.min).getTime();
        var max = this.helpCalendar.getDateFromFormat(this.fConfigs.limits.max).getTime();

        if (date.getTime() < min || date.getTime() > max) {
          classes.push('vfc-disabled');
          classes.push('vfc-cursor-not-allowed');
        }
      }

      if (day.hide) {
        classes.push('vfc-hide');
      } // Today date


      if (day.isToday) {
        classes.push('vfc-today');
      }

      if (!day.hideLeftAndRightDays && !this.fConfigs.disabledDayNames.includes(dayOfWeekString)) {
        // Mark Date
        if (day.isMarked) {
          classes.push('vfc-marked');
        } else if (day.isHovered) {
          classes.push('vfc-hovered');
        }

        if (this.fConfigs.markedDates.includes(day.date)) {
          classes.push('vfc-borderd');
        }

        if (Array.isArray(this.fConfigs.markedDateRange)) {
          this.fConfigs.markedDateRange.forEach(function (range) {
            if (_this3.helpCalendar.getDateFromFormat(range.start) <= _this3.helpCalendar.getDateFromFormat(day.date) && _this3.helpCalendar.getDateFromFormat(range.end) >= _this3.helpCalendar.getDateFromFormat(day.date)) {
              classes.push('vfc-marked');
            }

            if (day.date === range.start) {
              classes.push('vfc-start-marked');
            } else if (day.date === range.end) {
              classes.push('vfc-end-marked');
            }
          });
        } else if (this.fConfigs.markedDateRange.start && this.fConfigs.markedDateRange.end) {
          // Date Range Marked
          if (this.helpCalendar.getDateFromFormat(this.fConfigs.markedDateRange.start) <= this.helpCalendar.getDateFromFormat(day.date) && this.helpCalendar.getDateFromFormat(this.fConfigs.markedDateRange.end) >= this.helpCalendar.getDateFromFormat(day.date)) {
            classes.push('vfc-marked');
          }

          if (day.date === this.fConfigs.markedDateRange.start) {
            classes.push('vfc-start-marked');
          } else if (day.date === this.fConfigs.markedDateRange.end) {
            classes.push('vfc-end-marked');
          }
        } else {
          // Only After Start Marked
          if (this.fConfigs.markedDateRange.start) {
            if (this.helpCalendar.getDateFromFormat(this.fConfigs.markedDateRange.start) <= this.helpCalendar.getDateFromFormat(day.date)) classes.push('vfc-marked');
          } // Only Before End Marked


          if (this.fConfigs.markedDateRange.end) {
            if (this.helpCalendar.getDateFromFormat(this.fConfigs.markedDateRange.end) >= this.helpCalendar.getDateFromFormat(day.date)) classes.push('vfc-marked');
          }
        }

        classes.push('vfc-hover');
      } //Date Multiple Range


      if (this.fConfigs.isMultipleDateRange) {
        if (!''.inRange) this.inRangeInit(); // console.log(day.date.inRange(this.calendar.multipleDateRange))

        if (day.isMarked || ~this.calendar.multipleDateRange.map(function (range) {
          return range.start.split(' ')[0];
        }).indexOf(day.date) || ~this.calendar.multipleDateRange.map(function (range) {
          return range.end.split(' ')[0];
        }).indexOf(day.date) || day.date.inRange(this.calendar.multipleDateRange)) {
          classes.push('vfc-marked');
        } // } else if (day.isHovered) {
        // classes.push('vfc-hovered')
        // }


        if (this.fConfigs.markedDates.includes(day.date)) {
          classes.push('vfc-borderd');
        } // console.log(
        //   ~this.calendar.multipleDateRange
        //     .map(range => range.start)
        //     .indexOf(day.date)
        // )


        if (~this.calendar.multipleDateRange.map(function (range) {
          return range.start.split(' ')[0];
        }).indexOf(day.date)) {
          classes.push('vfc-start-marked');
        }

        if (~this.calendar.multipleDateRange.map(function (range) {
          return range.end.split(' ')[0];
        }).indexOf(day.date)) {
          classes.push('vfc-end-marked');
        }
      } // Date Mark With Custom Classes


      if (typeof_typeof(this.fConfigs.markedDates) === 'object') {
        var checkMarked = this.fConfigs.markedDates.find(function (markDate) {
          return markDate.date === day.date;
        });

        if (typeof checkMarked !== 'undefined') {
          classes.push(checkMarked.class);
        }
      }

      if (day.date === this.calendar.dateRange.start.split(' ')[0]) {
        classes.push('vfc-start-marked');
      }

      if (day.date === this.calendar.dateRange.end.split(' ')[0]) {
        classes.push('vfc-end-marked');
      }

      if (day.date === this.calendar.selectedDate || this.calendar.hasOwnProperty('selectedDates') && this.calendar.selectedDates.find(function (sDate) {
        return sDate.date === day.date;
      })) {
        classes.push('vfc-borderd');
      }

      return classes;
    }
  }
});
// CONCATENATED MODULE: ./src/components/Day.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Dayvue_type_script_lang_js_ = (Dayvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Day.vue?vue&type=style&index=0&id=3591d458&scoped=true&lang=scss&
var Dayvue_type_style_index_0_id_3591d458_scoped_true_lang_scss_ = __webpack_require__("496d");

// CONCATENATED MODULE: ./src/components/Day.vue






/* normalize component */

var Day_component = normalizeComponent(
  components_Dayvue_type_script_lang_js_,
  Dayvue_type_template_id_3591d458_scoped_true_render,
  Dayvue_type_template_id_3591d458_scoped_true_staticRenderFns,
  false,
  null,
  "3591d458",
  null
  
)

/* harmony default export */ var Day = (Day_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b737400a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MonthYearPicker.vue?vue&type=template&id=13f78447&scoped=true&
var MonthYearPickervue_type_template_id_13f78447_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vfc-months-container"},[_c('div',{staticClass:"vfc-content vfc-content-MY-picker"},[_c('div',{staticClass:"vfc-navigation-buttons"},[_c('div',{on:{"click":function($event){return _vm.changePicker('left')}}},[_c('div',{staticClass:"vfc-arrow-left"})]),_c('h2',{class:['vfc-top-date', _vm.delta !== 0 && 'vfc-top-date-has-delta'],on:{"click":function($event){_vm.delta = 0}}},[_c('span',{staticClass:"vfc-popover-caret"}),_vm._v("\n        "+_vm._s(_vm.$parent.listCalendars[_vm.calendarKey].date.getFullYear())+"\n      ")]),_c('div',{on:{"click":function($event){return _vm.changePicker('right')}}},[_c('div',{staticClass:"vfc-arrow-right"})])]),_c('div',{staticClass:"vfc-months"},[(_vm.$parent.showMonthPicker)?_vm._l((_vm.$parent.fConfigs.shortMonthNames),function(month,key){return _c('div',{key:key,staticClass:"vfc-item",class:{
            'vfc-selected':
              _vm.$parent.listCalendars[_vm.calendarKey].date.getMonth() === key
          },on:{"click":function($event){return _vm.$parent.pickMonth(key, _vm.calendarKey)}}},[_vm._v("\n          "+_vm._s(month)+"\n        ")])}):(_vm.$parent.showYearPicker)?_vm._l((_vm.$parent.getYearList(
            _vm.$parent.listCalendars[_vm.calendarKey].date,
            _vm.delta
          )),function(year,key){return _c('div',{key:key,staticClass:"vfc-item",class:{
            'vfc-selected':
              _vm.$parent.listCalendars[_vm.calendarKey].date.getFullYear() ===
              year.year
          },on:{"click":function($event){return _vm.$parent.pickYear(year.year, _vm.calendarKey)}}},[_vm._v("\n          "+_vm._s(year.year)+"\n        ")])}):_vm._e()],2)])])}
var MonthYearPickervue_type_template_id_13f78447_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/MonthYearPicker.vue?vue&type=template&id=13f78447&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MonthYearPicker.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var MonthYearPickervue_type_script_lang_js_ = ({
  name: 'MonthYearPicker',
  props: {
    calendarKey: {
      type: Number,
      default: 0
    },
    changeYearStep: {
      type: Number,
      default: 3
    }
  },
  data: function data() {
    return {
      delta: 0
    };
  },
  watch: {
    delta: function delta(newDelta) {
      if (newDelta < -new Date().getFullYear()) this.delta = 0;
    }
  },
  methods: {
    changePicker: function changePicker(to) {
      if (this.$parent.showMonthPicker) {
        if (to === 'right') this.$parent.NextYear(this.calendarKey);else this.$parent.PreYear(this.calendarKey);
        return;
      }

      if (to === 'right') this.delta += this.changeYearStep;else this.delta -= this.changeYearStep;
    }
  }
});
// CONCATENATED MODULE: ./src/components/MonthYearPicker.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_MonthYearPickervue_type_script_lang_js_ = (MonthYearPickervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/MonthYearPicker.vue





/* normalize component */

var MonthYearPicker_component = normalizeComponent(
  components_MonthYearPickervue_type_script_lang_js_,
  MonthYearPickervue_type_template_id_13f78447_scoped_true_render,
  MonthYearPickervue_type_template_id_13f78447_scoped_true_staticRenderFns,
  false,
  null,
  "13f78447",
  null
  
)

/* harmony default export */ var MonthYearPicker = (MonthYearPicker_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b737400a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PickerInputs.vue?vue&type=template&id=3048ecf6&scoped=true&
var PickerInputsvue_type_template_id_3048ecf6_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.fConfigs.isModal && _vm.fConfigs.isDateRange)?_c('div',{staticClass:"vfc-multiple-input",class:{ 'vfc-dark': _vm.fConfigs.isDark }},[_vm._t("dateRangeInputs",function(){return [_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.dateRangeSelectedStartDate),expression:"dateRangeSelectedStartDate"}],attrs:{"type":"text","title":"Start Date","placeholder":_vm.fConfigs.placeholder.split(' ')[0],"readonly":!_vm.fConfigs.isTypeable,"maxlength":_vm.fConfigs.dateFormat.length},domProps:{"value":(_vm.dateRangeSelectedStartDate)},on:{"input":function($event){if($event.target.composing){ return; }_vm.dateRangeSelectedStartDate=$event.target.value}}}),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.dateRangeSelectedEndDate),expression:"dateRangeSelectedEndDate"}],attrs:{"type":"text","title":"End Date","placeholder":_vm.fConfigs.placeholder.split(' ')[0],"readonly":!_vm.fConfigs.isTypeable,"maxlength":_vm.fConfigs.dateFormat.length},domProps:{"value":(_vm.dateRangeSelectedEndDate)},on:{"input":function($event){if($event.target.composing){ return; }_vm.dateRangeSelectedEndDate=$event.target.value}}})]},{"startDate":_vm.dateRangeSelectedStartDate,"endDate":_vm.dateRangeSelectedEndDate,"isTypeable":_vm.fConfigs.isTypeable})],2):(_vm.fConfigs.isModal && _vm.fConfigs.isDatePicker)?_c('div',{class:{ 'vfc-dark': _vm.fConfigs.isDark }},[_vm._t("datePickerInput",function(){return [_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.singleSelectedDate),expression:"singleSelectedDate"}],staticClass:"vfc-single-input",attrs:{"type":"text","title":"Date","placeholder":_vm.fConfigs.placeholder,"readonly":!_vm.fConfigs.isTypeable,"maxlength":_vm.fConfigs.dateFormat.length},domProps:{"value":(_vm.singleSelectedDate)},on:{"input":function($event){if($event.target.composing){ return; }_vm.singleSelectedDate=$event.target.value}}})]},{"selectedDate":_vm.singleSelectedDate,"isTypeable":_vm.fConfigs.isTypeable})],2):(_vm.fConfigs.isModal && _vm.fConfigs.isMultipleDatePicker)?_c('div',{staticClass:"vfc-tags-input-root",class:{ 'vfc-dark': _vm.fConfigs.isDark }},[_c('div',{staticClass:"vfc-tags-input-wrapper-default vfc-tags-input"},[_vm._l((_vm.calendar.selectedDates),function(date,index){return _c('span',{key:index,staticClass:"vfc-tags-input-badge vfc-tags-input-badge-pill vfc-tags-input-badge-selected-default"},[_c('span',{domProps:{"innerHTML":_vm._s(date.date)}}),_c('a',{staticClass:"vfc-tags-input-remove",attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.removeFromSelectedDates(index)}}})])}),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.calendar.selectedDatesItem),expression:"calendar.selectedDatesItem"}],attrs:{"type":"text","placeholder":"Add a date"},domProps:{"value":(_vm.calendar.selectedDatesItem)},on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.$parent.addToSelectedDates.apply(null, arguments)},"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.calendar, "selectedDatesItem", $event.target.value)}}})],2)]):_vm._e()])}
var PickerInputsvue_type_template_id_3048ecf6_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/PickerInputs.vue?vue&type=template&id=3048ecf6&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PickerInputs.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var PickerInputsvue_type_script_lang_js_ = ({
  name: 'PickerInputs',
  props: {
    fConfigs: {
      type: Object,
      required: true
    },
    singleSelectedDate: {
      type: String,
      required: true
    },
    calendar: {
      type: Object,
      required: true
    }
  },
  computed: {
    dateRangeSelectedStartDate: {
      get: function get() {
        return this.calendar.dateRange.start ? this.calendar.dateRange.start : '';
      },
      set: function set(newValue) {
        newValue = this.helpCalendar.mask(newValue);

        if (this.helpCalendar.getDateFromFormat(newValue).getMonth()) {
          this.calendar.dateRange.start = newValue;
        }
      }
    },
    dateRangeSelectedEndDate: {
      get: function get() {
        return this.calendar.dateRange.end ? this.calendar.dateRange.end : '';
      },
      set: function set(newValue) {
        newValue = this.helpCalendar.mask(newValue);

        if (this.helpCalendar.getDateFromFormat(newValue).getMonth()) {
          this.calendar.dateRange.end = newValue;
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/PickerInputs.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_PickerInputsvue_type_script_lang_js_ = (PickerInputsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/PickerInputs.vue





/* normalize component */

var PickerInputs_component = normalizeComponent(
  components_PickerInputsvue_type_script_lang_js_,
  PickerInputsvue_type_template_id_3048ecf6_scoped_true_render,
  PickerInputsvue_type_template_id_3048ecf6_scoped_true_staticRenderFns,
  false,
  null,
  "3048ecf6",
  null
  
)

/* harmony default export */ var PickerInputs = (PickerInputs_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b737400a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Footer.vue?vue&type=template&id=557145ac&scoped=true&
var Footervue_type_template_id_557145ac_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"footerCon"},[_vm._t("cleaner"),_vm._t("footer")],2)}
var Footervue_type_template_id_557145ac_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Footer.vue?vue&type=template&id=557145ac&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Footer.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
/* harmony default export */ var Footervue_type_script_lang_js_ = ({
  name: 'Footer'
});
// CONCATENATED MODULE: ./src/components/Footer.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Footervue_type_script_lang_js_ = (Footervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Footer.vue?vue&type=style&index=0&id=557145ac&scoped=true&lang=scss&
var Footervue_type_style_index_0_id_557145ac_scoped_true_lang_scss_ = __webpack_require__("a35c");

// CONCATENATED MODULE: ./src/components/Footer.vue






/* normalize component */

var Footer_component = normalizeComponent(
  components_Footervue_type_script_lang_js_,
  Footervue_type_template_id_557145ac_scoped_true_render,
  Footervue_type_template_id_557145ac_scoped_true_staticRenderFns,
  false,
  null,
  "557145ac",
  null
  
)

/* harmony default export */ var Footer = (Footer_component.exports);
// CONCATENATED MODULE: ./src/utils/helpers.js
/**
 * Check Element Contains
 * @param el
 * @param child
 * @returns {boolean|*}
 */
var hElContains = function hElContains(el, child) {
  return !!el && !!child && (el === child || el.contains(child));
};
/**
 * Generate unique ID
 * @returns {number}
 */

var hUniqueID = function hUniqueID() {
  return new Date().getUTCMilliseconds();
};
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FunctionalCalendar.vue?vue&type=script&lang=js&











//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









 // import calendarMethods from '../utils/calendarMethods'

/* harmony default export */ var FunctionalCalendarvue_type_script_lang_js_ = ({
  name: 'FunctionalCalendar',
  components: {
    MonthYearPicker: MonthYearPicker,
    TimePicker: TimePicker,
    PickerInputs: PickerInputs,
    Arrows: Arrows,
    Footer: Footer,
    Day: Day,
    WeekNumbers: WeekNumbers
  },
  mixins: [propsAndData],
  computed: {
    startDMY: function startDMY() {
      //start only with Day Month and Year
      if (this.calendar.dateRange.start) {
        return this.calendar.dateRange.start.split(' ')[0];
      }

      return '';
    },
    endDMY: function endDMY() {
      //end only with Day Month and Year
      if (this.calendar.dateRange.end) {
        return this.calendar.dateRange.end.split(' ')[0];
      }

      return '';
    },
    rangeIsSelected: function rangeIsSelected() {
      if (!this.isMultipleDateRange) return !!(this.calendar.dateRange.end && this.calendar.dateRange.start);
      return this.calendar.multipleDateRange.length > 0;
    },
    helpCalendar: function helpCalendar() {
      return new helpCalendar_helpCalendar(this.fConfigs.sundayStart, this.checkHiddenElement('leftAndRightDays'), this.fConfigs.dateFormat, this.fConfigs.dayNames);
    },
    singleSelectedDate: {
      get: function get() {
        var res = '';

        if (this.displayTimeInput) {
          var validFormats = ['HH:MM', 'HH:mm', 'hh:MM', 'hh:mm', 'MM:HH', 'mm:HH', 'MM:hh', 'mm:hh'];
          var format = this.fConfigs.dateFormat;

          if (this.dateFormat) {
            format = this.dateFormat;
          }

          if (validFormats.indexOf(format.split(' ')[1]) > 3) {
            res += ' ' + [this.calendar.selectedHour, this.calendar.selectedMinute].reverse().join(':');
          } else {
            res += ' ' + [this.calendar.selectedHour, this.calendar.selectedMinute].join(':');
          }
        }

        return this.calendar.selectedDate ? this.calendar.selectedDate + res : '';
      },
      set: function set(newValue) {
        newValue = this.helpCalendar.mask(newValue);

        if (this.helpCalendar.getDateFromFormat(newValue).getMonth()) {
          this.calendar.selectedDate = newValue;
        }
      }
    }
  },
  created: function created() {
    this.setConfigs();
    this.initCalendar();
  },
  mounted: function mounted() {
    //show time placeholder
    if (this.displayTimeInput) {
      var timeFormat = this.fConfigs.placeholder.split(' ')[1];

      if (!timeFormat) {
        this.fConfigs.placeholder += ' hh:mm';
      }
    }

    this.popoverElement = this.$refs.popoverElement; // Event

    this.popoverElement.addEventListener('focusin', this.onFocusIn);
    this.popoverElement.addEventListener('focusout', this.onFocusOut);
    window.addEventListener('click', this.hideMonthYearPicker, {
      capture: true
    }); // Reacts to external selected dates

    this.$watch('value', function (value) {
      if (typeof_typeof(value) === 'object' && (value.hasOwnProperty('dateRange') || value.hasOwnProperty('selectedDate'))) {
        this.calendar = value;
      } else if (typeof_typeof(value) === 'object' && value.hasOwnProperty('multipleDateRange')) {
        this.calendar.multipleDateRange = value.multipleDateRange;
        var lastElement = this.calendar.multipleDateRange[Math.max(0, this.calendar.multipleDateRange.length - 1)];

        if (lastElement && (lastElement.start && !lastElement.end || !lastElement.start && lastElement.end)) {
          throw new Error('Invalid Data Range');
        }
      }
    }, {
      immediate: true,
      deep: true
    });
    this.$watch('showCalendar', function (value) {
      if (value) this.$emit('opened');else this.$emit('closed');
    }, {
      immediate: true,
      deep: true
    });
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('focusin', this.onFocusIn);
    window.removeEventListener('focusout', this.onFocusOut);
    window.removeEventListener('click', this.hideMonthYearPicker);
  },
  watch: {
    enabledDates: {
      handler: function handler() {
        this.fConfigs.enabledDates = this.enabledDates;
      },
      deep: true
    },
    'configs.enabledDates': {
      handler: function handler() {
        this.fConfigs.enabledDates = this.configs.enabledDates;
      },
      deep: true
    },
    fConfigs: {
      handler: function handler() {
        this.markChooseDays();
      },
      deep: true,
      immediate: true
    },
    calendar: {
      handler: function handler() {
        this.markChooseDays();
      },
      deep: true,
      immediate: true
    },
    'calendar.currentDate': {
      handler: function handler(value) {
        this.$emit('input', this.calendar);
        this.checkLimits(value);
      }
    }
  },
  methods: {
    initCalendar: function initCalendar() {
      this.setCalendarData();
      this.listRendering();
      this.markChooseDays();
      this.checkLimits(this.calendar.currentDate);
    },
    updateCalendar: function updateCalendar() {
      this.setExistingCalendarData();
      this.listRendering();
      this.markChooseDays();
    },
    isNotSeparatelyAndFirst: function isNotSeparatelyAndFirst(key) {
      return this.isSeparately || key == 0;
    },
    setCalendarData: function setCalendarData() {
      var date = this.calendar.currentDate;
      date = new Date(date.getFullYear(), date.getMonth() - 1);
      this.listCalendars = [];

      for (var i = 0; i < this.fConfigs.calendarsCount; i++) {
        date = new Date(date.getFullYear(), date.getMonth() + 1);
        var calendar = {
          key: i + hUniqueID(),
          date: date,
          dateTop: "".concat(this.fConfigs.monthNames[date.getMonth()], " ").concat(date.getFullYear()),
          month: this.fConfigs.monthNames[date.getMonth()],
          year: date.getFullYear(),
          weeks: this.helpCalendar.getFinalizedWeeks(date.getMonth(), date.getFullYear())
        };
        this.listCalendars.push(calendar);

        if (!this.fConfigs.isMultiple) {
          break;
        }
      }
    },
    setExistingCalendarData: function setExistingCalendarData() {
      for (var i = 0; i < this.listCalendars.length; i++) {
        var calendar = this.listCalendars[i];
        var date = calendar.date;
        this.$set(this.listCalendars, i, {
          key: calendar.key,
          date: date,
          dateTop: "".concat(this.fConfigs.monthNames[date.getMonth()], " ").concat(date.getFullYear()),
          month: this.fConfigs.monthNames[date.getMonth()],
          year: date.getFullYear(),
          weeks: this.helpCalendar.getFinalizedWeeks(date.getMonth(), date.getFullYear())
        });

        if (!this.fConfigs.isMultiple) {
          break;
        }
      }
    },
    setConfigs: function setConfigs() {
      var _this = this;

      var globalOptions;

      if (typeof this.$getOptions !== 'undefined') {
        // Global Options
        globalOptions = this.$getOptions();
        Object.keys(globalOptions).forEach(function (objectKey) {
          if (typeof _this.fConfigs[objectKey] !== 'undefined') {
            _this.$set(_this.fConfigs, objectKey, globalOptions[objectKey]);
          }
        });
      }

      if (typeof this.configs !== 'undefined') {
        Object.keys(this.fConfigs).forEach(function (objectKey) {
          if (typeof _this.configs[objectKey] !== 'undefined') {
            // Get From Configs
            _this.$set(_this.fConfigs, objectKey, _this.configs[objectKey]);
          }
        });
      } else {
        Object.keys(this.$props).forEach(function (objectKey) {
          if (typeof _this.fConfigs[objectKey] !== 'undefined' && typeof _this.$props[objectKey] !== 'undefined') {
            _this.$set(_this.fConfigs, objectKey, _this.$props[objectKey]);
          }
        });
      } // Is Modal


      if (this.fConfigs.isModal) this.showCalendar = false; // Placeholder

      if (!this.fConfigs.placeholder) this.fConfigs.placeholder = this.fConfigs.dateFormat;

      if (typeof this.newCurrentDate !== 'undefined') {
        this.calendar.currentDate = this.newCurrentDate;
      } // Sunday Start


      if (this.fConfigs.sundayStart) {
        var dayNames = _toConsumableArray(this.fConfigs.dayNames);

        var sundayName = dayNames[dayNames.length - 1];
        dayNames.splice(dayNames.length - 1, 1);
        dayNames.unshift(sundayName);
        this.fConfigs.dayNames = dayNames;
      }
    },
    listRendering: function listRendering() {
      var _this2 = this;

      // Each Calendars
      this.listCalendars.forEach(function (calendar) {
        // Set Calendar Weeks
        calendar.weeks.forEach(function (week) {
          var finalizedDays = [];
          week.days.forEach(function (day) {
            var date = new Date(day.year, day.month, day.day);
            var now = new Date();
            var isToday = false;
            date.setHours(0, 0, 0, 0);
            now.setHours(0, 0, 0, 0);

            if (date.getTime() === now.getTime()) {
              isToday = true;
            }

            var checkMarked; // With Custom Classes

            if (typeof_typeof(_this2.fConfigs.markedDates[0]) === 'object') {
              checkMarked = _this2.fConfigs.markedDates.find(function (markDate) {
                return markDate.date === _this2.helpCalendar.formatDate(date);
              });
            } else {
              // Without Classes
              checkMarked = _this2.fConfigs.markedDates.find(function (markDate) {
                return markDate === _this2.helpCalendar.formatDate(date);
              });
            }

            if (_this2.startDMY === _this2.helpCalendar.formatDate(date)) {
              checkMarked = true;
            }

            var isMarked = false;

            if (typeof checkMarked !== 'undefined') {
              isMarked = true;
            }

            finalizedDays.push({
              day: day.day,
              date: _this2.helpCalendar.formatDate(date),
              hide: day.hide,
              isMouseToLeft: false,
              isMouseToRight: false,
              isHovered: false,
              isDateRangeStart: _this2.checkDateRangeStart(_this2.helpCalendar.formatDate(date)),
              isDateRangeEnd: _this2.checkDateRangeEnd(_this2.helpCalendar.formatDate(date)),
              hideLeftAndRightDays: day.hideLeftAndRightDays,
              isToday: isToday,
              isMarked: isMarked
            });
          });
          week.days = finalizedDays;
        });
      });
    },
    clickDay: function clickDay(item, isDisabledDate) {
      var _this3 = this;

      if (this.fConfigs.withTimePicker && this.fConfigs.isDateRange) {
        item.date = item.date + ' 00:00';
      }

      this.$emit('dayClicked', item);

      if (!this.fConfigs.isDateRange && !this.fConfigs.isDatePicker && !this.fConfigs.isMultipleDatePicker) {
        return false;
      } //Disabled Dates - Start
      // Disable days of week if set in configuration


      var dateDay = this.helpCalendar.getDateFromFormat(item.date).getDay() - 1;

      if (dateDay === -1) {
        dateDay = 6;
      }

      var dayOfWeekString = this.fConfigs.dayNames[dateDay];

      if (this.fConfigs.disabledDayNames.includes(dayOfWeekString) || isDisabledDate(item.date)) {
        return false;
      } //Disabled Dates - End
      // Limits


      if (this.fConfigs.limits) {
        var min = this.helpCalendar.getDateFromFormat(this.fConfigs.limits.min).getTime();
        var max = this.helpCalendar.getDateFromFormat(this.fConfigs.limits.max).getTime();
        var date = this.helpCalendar.getDateFromFormat(item.date).getTime();

        if (date < min || date > max) {
          return false;
        }
      } // Date Multiple Range


      if (this.fConfigs.isMultipleDateRange) {
        var clickDate = this.helpCalendar.getDateFromFormat(item.date.split(' ')[0]).getTime();
        var rangesLength = this.calendar.multipleDateRange.length;
        var lastRange = this.calendar.multipleDateRange[rangesLength - 1];
        var startDate = ''; // if (lastRange) {
        //   // if (lastRange.start && lastRange.end)
        // } else

        if (!lastRange) {
          this.calendar.multipleDateRange.push({
            end: '',
            start: ''
          });
          rangesLength = this.calendar.multipleDateRange.length;
          lastRange = this.calendar.multipleDateRange[rangesLength - 1];
        }

        if (lastRange.start) {
          startDate = this.helpCalendar.getDateFromFormat(lastRange.start);
        } // Two dates is not empty


        if (lastRange.start !== '' && lastRange.end !== '') {
          this.calendar.multipleDateRange.push({
            end: '',
            start: item.date
          }); // lastRange.start = item.date
          // lastRange.end = ''
          // Not date selected
        } else if (lastRange.start === '' && lastRange.end === '') {
          lastRange.start = item.date; // Start Date not empty, chose date > start date
        } else if (lastRange.end === '' && clickDate > startDate.getTime()) {
          lastRange.end = item.date; // Start date not empty, chose date <= start date (also same date range select)
        } else if (lastRange.start !== '' && clickDate <= startDate.getTime()) {
          this.$nextTick(function () {
            if (_this3.calendar.withTimePicker) {
              _this3.$refs['timePicker'].startDateActive = true;
            }
          });
          lastRange.end = lastRange.start;
          lastRange.start = item.date;
        } //Get number of days between date range dates


        if (lastRange.start !== '' && lastRange.end !== '') {
          var oneDay = 24 * 60 * 60 * 1000;
          var firstDate = this.helpCalendar.getDateFromFormat(lastRange.start);
          var secondDate = this.helpCalendar.getDateFromFormat(lastRange.end);
          var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
          var itemTime = this.helpCalendar.getDateFromFormat(item.date).getTime();
          this.$emit('selectedDaysCount', diffDays); // Is Auto Closeable

          if (this.fConfigs.isModal && this.fConfigs.isAutoCloseable) {
            this.showCalendar = false;
          } // Minimum Selected Days


          var minSelDays = this.fConfigs.minSelDays;

          if (minSelDays && itemTime >= startDate.getTime() && diffDays < minSelDays) {
            startDate.setDate(startDate.getDate() + (minSelDays - 1));
            lastRange.end = this.helpCalendar.formatDate(startDate);
          }

          if (minSelDays && itemTime < startDate.getTime() && diffDays < minSelDays) {
            startDate.setDate(startDate.getDate() - (minSelDays - 1));
            lastRange.start = this.helpCalendar.formatDate(startDate);
          } // Maximum Selected Days


          var maxSelDays = this.fConfigs.maxSelDays;

          if (maxSelDays && itemTime >= startDate.getTime() && diffDays >= maxSelDays) {
            startDate.setDate(startDate.getDate() + (maxSelDays - 1));
            lastRange.end = this.helpCalendar.formatDate(startDate);
          }

          if (maxSelDays && itemTime < startDate.getTime() && diffDays >= maxSelDays) {
            startDate.setDate(startDate.getDate() - (maxSelDays - 1));
            lastRange.start = this.helpCalendar.formatDate(startDate);
          }
        }

        this.$emit('input', this.calendar);
      } // Date Range
      else if (this.fConfigs.isDateRange) {
        var _clickDate = this.helpCalendar.getDateFromFormat(item.date.split(' ')[0]).getTime();

        var _startDate = '';

        if (this.calendar.dateRange.start) {
          _startDate = this.helpCalendar.getDateFromFormat(this.calendar.dateRange.start);
        } // Two dates is not empty


        if (this.calendar.dateRange.start !== '' && this.calendar.dateRange.end !== '') {
          this.calendar.dateRange.start = item.date;
          this.calendar.dateRange.end = ''; // Not date selected
        } else if (this.calendar.dateRange.start === '' && this.calendar.dateRange.end === '') {
          this.calendar.dateRange.start = item.date; // Start Date not empty, chose date > start date
        } else if (this.calendar.dateRange.end === '' && _clickDate > _startDate.getTime()) {
          this.calendar.dateRange.end = item.date; // Start date not empty, chose date <= start date (also same date range select)
        } else if (this.calendar.dateRange.start !== '' && _clickDate <= _startDate.getTime()) {
          this.$nextTick(function () {
            if (_this3.calendar.dateRange && _this3.calendar.withTimePicker) {
              _this3.$refs['timePicker'].startDateActive = true;
            }
          });
          this.calendar.dateRange.end = this.calendar.dateRange.start;
          this.calendar.dateRange.start = item.date;
        } //Get number of days between date range dates


        if (this.calendar.dateRange.start !== '' && this.calendar.dateRange.end !== '') {
          var _oneDay = 24 * 60 * 60 * 1000;

          var _firstDate = this.helpCalendar.getDateFromFormat(this.calendar.dateRange.start);

          var _secondDate = this.helpCalendar.getDateFromFormat(this.calendar.dateRange.end);

          var _diffDays = Math.round(Math.abs((_firstDate.getTime() - _secondDate.getTime()) / _oneDay));

          var _itemTime = this.helpCalendar.getDateFromFormat(item.date).getTime();

          this.$emit('selectedDaysCount', _diffDays); // Is Auto Closeable

          if (this.fConfigs.isModal && this.fConfigs.isAutoCloseable) {
            this.showCalendar = false;
          } // Minimum Selected Days


          var _minSelDays = this.fConfigs.minSelDays;

          if (_minSelDays && _itemTime >= _startDate.getTime() && _diffDays < _minSelDays) {
            _startDate.setDate(_startDate.getDate() + (_minSelDays - 1));

            this.calendar.dateRange.end = this.helpCalendar.formatDate(_startDate);
          }

          if (_minSelDays && _itemTime < _startDate.getTime() && _diffDays < _minSelDays) {
            _startDate.setDate(_startDate.getDate() - (_minSelDays - 1));

            this.calendar.dateRange.start = this.helpCalendar.formatDate(_startDate);
          } // Maximum Selected Days


          var _maxSelDays = this.fConfigs.maxSelDays;

          if (_maxSelDays && _itemTime >= _startDate.getTime() && _diffDays >= _maxSelDays) {
            _startDate.setDate(_startDate.getDate() + (_maxSelDays - 1));

            this.calendar.dateRange.end = this.helpCalendar.formatDate(_startDate);
          }

          if (_maxSelDays && _itemTime < _startDate.getTime() && _diffDays >= _maxSelDays) {
            _startDate.setDate(_startDate.getDate() - (_maxSelDays - 1));

            this.calendar.dateRange.start = this.helpCalendar.formatDate(_startDate);
          }
        }

        this.$emit('input', this.calendar);
      } else if (this.fConfigs.isDatePicker) {
        this.calendar.selectedDate = item.date;
        this.$emit('input', this.calendar); // Is Auto Closeable

        if (this.fConfigs.isModal && this.fConfigs.isAutoCloseable) {
          this.showCalendar = false;
        }
      } else if (this.fConfigs.isMultipleDatePicker) {
        if (this.calendar.hasOwnProperty('selectedDates') && this.calendar.selectedDates.find(function (date) {
          return date.date === item.date;
        })) {
          var dateIndex = this.calendar.selectedDates.findIndex(function (date) {
            return date.date === item.date;
          });
          this.calendar.selectedDates.splice(dateIndex, 1);
        } else {
          var _date = Object.assign({}, this.defaultDateFormat);

          _date.date = item.date;

          if (!this.calendar.hasOwnProperty('selectedDates')) {
            this.calendar.selectedDates = [];
          }

          this.calendar.selectedDates.push(_date);
        }

        this.$emit('input', this.calendar);
      }

      this.markChooseDays(); // Time Picker

      if (this.fConfigs.withTimePicker) {
        if (this.fConfigs.isDateRange || this.fConfigs.isDatePicker) {
          this.openTimePicker();
        }

        if (this.calendar.selectedDates.find(function (date) {
          return date.date === item.date;
        }) && this.fConfigs.isMultipleDatePicker) {
          this.openTimePicker();
        }
      }

      this.$emit('choseDay', item);
    },
    markChooseDays: function markChooseDays() {
      var _this4 = this;

      var startDate = this.startDMY;
      var endDate = this.endDMY;
      this.listCalendars.forEach(function (calendar) {
        calendar.weeks.forEach(function (week) {
          week.days.forEach(function (day) {
            day.isMarked = false;
            day.date = day.date.split(' ')[0]; // Date Picker

            if (_this4.fConfigs.isDatePicker) {
              if (_this4.calendar.selectedDate === day.date) day.isMarked = true;
            } else if (_this4.fConfigs.isMultipleDatePicker) {
              if (_this4.calendar.hasOwnProperty('selectedDates') && _this4.calendar.selectedDates.find(function (date) {
                return date.date === day.date;
              })) day.isMarked = true;
            } else {
              day.isMouseToLeft = false;
              day.isMouseToRight = false; // Date Range

              if (startDate === day.date) {
                day.isMouseToLeft = !!endDate;
                day.isMarked = true;
              }

              if (endDate === day.date) {
                day.isMouseToRight = !!endDate;
                day.isMarked = true;
              } //Multiple Range


              if (_this4.calendar.multipleDateRange) {
                if (~_this4.calendar.multipleDateRange.map(function (range) {
                  return range.start.split(' ')[0];
                }).indexOf(day.date)) {
                  day.isMouseToLeft = !!endDate;
                  day.isMarked = true;
                }

                if (~_this4.calendar.multipleDateRange.map(function (range) {
                  return range.end.split(' ')[0];
                }).indexOf(day.date)) {
                  day.isMouseToRight = !!endDate;
                  day.isMarked = true;
                }

                _this4.calendar.multipleDateRange.forEach(function (range) {
                  if (range.start && range.start === range.end) {
                    day.isMouseToLeft = false;
                    day.isMouseToRight = false;
                  }

                  if (range.start && range.end) {
                    if (_this4.helpCalendar.getDateFromFormat(day.date).getTime() > _this4.helpCalendar.getDateFromFormat(range.start) && _this4.helpCalendar.getDateFromFormat(day.date) < _this4.helpCalendar.getDateFromFormat(range.end)) {
                      day.isMarked = true;
                    }
                  }
                });
              }

              if (startDate && startDate === endDate) {
                day.isMouseToLeft = false;
                day.isMouseToRight = false;
              }

              if (startDate && endDate) {
                if (_this4.helpCalendar.getDateFromFormat(day.date).getTime() > _this4.helpCalendar.getDateFromFormat(startDate) && _this4.helpCalendar.getDateFromFormat(day.date) < _this4.helpCalendar.getDateFromFormat(endDate)) {
                  day.isMarked = true;
                }
              }
            }

            if (_this4.fConfigs.markedDates.includes(day.date)) day.isMarked = true;
          });
        });
      });
    },
    dayMouseOver: function dayMouseOver(date) {
      this.$emit('dayMouseOver', date);

      if (!this.fConfigs.isDateRange) {
        return false;
      } // Limits


      if (this.fConfigs.limits) {
        var limitMin = this.helpCalendar.getDateFromFormat(this.fConfigs.limits.min).getTime();
        var limitMax = this.helpCalendar.getDateFromFormat(this.fConfigs.limits.max).getTime();
        var limitDate = this.helpCalendar.getDateFromFormat(date).getTime();

        if (limitDate < limitMin || limitDate > limitMax) {
          return false;
        }
      } //Multiple Range


      if ((this.calendar.dateRange.start === '' || this.calendar.dateRange.end === '') && (this.calendar.dateRange.start !== '' || this.calendar.dateRange.end !== '')) {
        for (var e = 0; e < this.listCalendars.length; e++) {
          var calendar = this.listCalendars[e];

          for (var f = 0; f < calendar.weeks.length; f++) {
            var week = calendar.weeks[f];

            for (var i = 0; i < week.days.length; i++) {
              var item = week.days[i];
              this.listCalendars[e].weeks[f].days[i].isHovered = false;

              if (item.date !== this.startDMY && !this.fConfigs.markedDates.includes(item.date)) {
                this.listCalendars[e].weeks[f].days[i].isMarked = false;
              }

              if (this.calendar.dateRange.start) {
                var itemDate = this.helpCalendar.getDateFromFormat(item.date).getTime();
                var thisDate = this.helpCalendar.getDateFromFormat(date).getTime();
                var startDate = this.helpCalendar.getDateFromFormat(this.calendar.dateRange.start);
                this.listCalendars[e].weeks[f].days[i].isMouseToLeft = itemDate === startDate.getTime() && thisDate > startDate.getTime() || itemDate === thisDate && thisDate < startDate.getTime();
                this.listCalendars[e].weeks[f].days[i].isMouseToRight = itemDate === startDate.getTime() && thisDate < startDate.getTime() || itemDate === thisDate && thisDate > startDate.getTime();
                var dateDay = this.helpCalendar.getDateFromFormat(item.date).getDay() - 1;

                if (dateDay === -1) {
                  dateDay = 6;
                }

                var dayOfWeekString = this.fConfigs.dayNames[dateDay];

                if (!this.fConfigs.disabledDayNames.includes(dayOfWeekString) && (itemDate > startDate.getTime() && itemDate < thisDate || itemDate < startDate.getTime() && itemDate > thisDate)) {
                  this.listCalendars[e].weeks[f].days[i].isMarked = true;
                }

                if (!this.calendar.dateRange.end && itemDate === thisDate) {
                  this.listCalendars[e].weeks[f].days[i].isHovered = false;
                }

                if (this.checkSelDates('min', this.calendar.dateRange.start, item.date, date)) {
                  this.listCalendars[e].weeks[f].days[i].isMarked = true;
                  var minDateToRight = void 0,
                      minDateToLeft = void 0;
                  minDateToLeft = new Date(startDate.getTime());
                  minDateToRight = new Date(startDate.getTime());
                  minDateToLeft.setDate(minDateToLeft.getDate() - this.fConfigs.minSelDays + 1);
                  minDateToRight.setDate(minDateToRight.getDate() + this.fConfigs.minSelDays - 1);

                  if (thisDate >= minDateToLeft.getTime() && this.helpCalendar.formatDate(minDateToLeft) === item.date) {
                    this.listCalendars[e].weeks[f].days[i].isMarked = false;
                    this.listCalendars[e].weeks[f].days[i].isMouseToLeft = true;
                    this.listCalendars[e].weeks[f].days[i].isHovered = true;
                  } else if (thisDate <= minDateToRight.getTime() && this.helpCalendar.formatDate(minDateToRight) === item.date) {
                    this.listCalendars[e].weeks[f].days[i].isMarked = false;
                    this.listCalendars[e].weeks[f].days[i].isMouseToRight = true;
                    this.listCalendars[e].weeks[f].days[i].isHovered = true;
                  }
                }

                if (this.checkSelDates('max', this.calendar.dateRange.start, item.date, date)) {
                  this.listCalendars[e].weeks[f].days[i].isMarked = false;
                  this.listCalendars[e].weeks[f].days[i].isHovered = false;
                  this.listCalendars[e].weeks[f].days[i].isMouseToLeft = false;
                  this.listCalendars[e].weeks[f].days[i].isMouseToRight = false;
                  var maxDateToLeft = void 0,
                      maxDateToRight = void 0;
                  maxDateToLeft = new Date(startDate.getTime());
                  maxDateToRight = new Date(startDate.getTime());
                  maxDateToLeft.setDate(maxDateToLeft.getDate() - this.fConfigs.maxSelDays + 1);
                  maxDateToRight.setDate(maxDateToRight.getDate() + this.fConfigs.maxSelDays - 1);

                  if (thisDate <= maxDateToLeft.getTime()) {
                    if (this.helpCalendar.formatDate(maxDateToLeft) === item.date) {
                      this.listCalendars[e].weeks[f].days[i].isHovered = true;
                      this.listCalendars[e].weeks[f].days[i].isMouseToLeft = true;
                    }
                  }

                  if (thisDate >= maxDateToRight.getTime()) {
                    if (this.helpCalendar.formatDate(maxDateToRight) === item.date) {
                      this.listCalendars[e].weeks[f].days[i].isHovered = true;
                      this.listCalendars[e].weeks[f].days[i].isMouseToRight = true;
                    }
                  }
                }
              }
            }
          }
        }
      }

      if (this.calendar.multipleDateRange) {
        var range = this.calendar.multipleDateRange[this.calendar.multipleDateRange.length - 1];
        if (!range) return; // this.calendar.multipleDateRange.forEach((range, index) => {

        if ((range.start === '' || range.end === '') && (range.start !== '' || range.end !== '')) {
          for (var _e = 0; _e < this.listCalendars.length; _e++) {
            var _calendar = this.listCalendars[_e];

            for (var _f = 0; _f < _calendar.weeks.length; _f++) {
              var _week = _calendar.weeks[_f];

              for (var _i = 0; _i < _week.days.length; _i++) {
                var _item = _week.days[_i];
                this.listCalendars[_e].weeks[_f].days[_i].isHovered = false;

                if (_item.date !== this.startDMY && !this.fConfigs.markedDates.includes(_item.date)) {
                  this.listCalendars[_e].weeks[_f].days[_i].isMarked = false;
                }

                if (range.start) {
                  var _itemDate = this.helpCalendar.getDateFromFormat(_item.date).getTime();

                  var _thisDate = this.helpCalendar.getDateFromFormat(date).getTime();

                  var _startDate2 = this.helpCalendar.getDateFromFormat(range.start);

                  this.listCalendars[_e].weeks[_f].days[_i].isMouseToLeft = _itemDate === _startDate2.getTime() && _thisDate > _startDate2.getTime() || _itemDate === _thisDate && _thisDate < _startDate2.getTime();
                  this.listCalendars[_e].weeks[_f].days[_i].isMouseToRight = _itemDate === _startDate2.getTime() && _thisDate < _startDate2.getTime() || _itemDate === _thisDate && _thisDate > _startDate2.getTime();

                  var _dateDay = this.helpCalendar.getDateFromFormat(_item.date).getDay() - 1;

                  if (_dateDay === -1) {
                    _dateDay = 6;
                  }

                  var _dayOfWeekString = this.fConfigs.dayNames[_dateDay];

                  if (!this.fConfigs.disabledDayNames.includes(_dayOfWeekString) && (_itemDate > _startDate2.getTime() && _itemDate < _thisDate || _itemDate < _startDate2.getTime() && _itemDate > _thisDate)) {
                    this.listCalendars[_e].weeks[_f].days[_i].isMarked = true;
                  }

                  if (!range.end && _itemDate === _thisDate) {
                    this.listCalendars[_e].weeks[_f].days[_i].isHovered = false;
                  }

                  if (this.checkSelDates('min', range.start, _item.date, date)) {
                    this.listCalendars[_e].weeks[_f].days[_i].isMarked = true;

                    var _minDateToRight = void 0,
                        _minDateToLeft = void 0;

                    _minDateToLeft = new Date(_startDate2.getTime());
                    _minDateToRight = new Date(_startDate2.getTime());

                    _minDateToLeft.setDate(_minDateToLeft.getDate() - this.fConfigs.minSelDays + 1);

                    _minDateToRight.setDate(_minDateToRight.getDate() + this.fConfigs.minSelDays - 1);

                    if (_thisDate >= _minDateToLeft.getTime() && this.helpCalendar.formatDate(_minDateToLeft) === _item.date) {
                      this.listCalendars[_e].weeks[_f].days[_i].isMarked = false;
                      this.listCalendars[_e].weeks[_f].days[_i].isMouseToLeft = true;
                      this.listCalendars[_e].weeks[_f].days[_i].isHovered = true;
                    } else if (_thisDate <= _minDateToRight.getTime() && this.helpCalendar.formatDate(_minDateToRight) === _item.date) {
                      this.listCalendars[_e].weeks[_f].days[_i].isMarked = false;
                      this.listCalendars[_e].weeks[_f].days[_i].isMouseToRight = true;
                      this.listCalendars[_e].weeks[_f].days[_i].isHovered = true;
                    }
                  }

                  if (this.checkSelDates('max', range.start, _item.date, date)) {
                    this.listCalendars[_e].weeks[_f].days[_i].isMarked = false;
                    this.listCalendars[_e].weeks[_f].days[_i].isHovered = false;
                    this.listCalendars[_e].weeks[_f].days[_i].isMouseToLeft = false;
                    this.listCalendars[_e].weeks[_f].days[_i].isMouseToRight = false;

                    var _maxDateToLeft = void 0,
                        _maxDateToRight = void 0;

                    _maxDateToLeft = new Date(_startDate2.getTime());
                    _maxDateToRight = new Date(_startDate2.getTime());

                    _maxDateToLeft.setDate(_maxDateToLeft.getDate() - this.fConfigs.maxSelDays + 1);

                    _maxDateToRight.setDate(_maxDateToRight.getDate() + this.fConfigs.maxSelDays - 1);

                    if (_thisDate <= _maxDateToLeft.getTime()) {
                      if (this.helpCalendar.formatDate(_maxDateToLeft) === _item.date) {
                        this.listCalendars[_e].weeks[_f].days[_i].isHovered = true;
                        this.listCalendars[_e].weeks[_f].days[_i].isMouseToLeft = true;
                      }
                    }

                    if (_thisDate >= _maxDateToRight.getTime()) {
                      if (this.helpCalendar.formatDate(_maxDateToRight) === _item.date) {
                        this.listCalendars[_e].weeks[_f].days[_i].isHovered = true;
                        this.listCalendars[_e].weeks[_f].days[_i].isMouseToRight = true;
                      }
                    }
                  }
                }
              }
            }
          }
        } // })

      }
    },

    /**
     * @return {boolean}
     */
    PreMonth: function PreMonth() {
      var calendarKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (!this.allowPreDate) return false;
      this.transitionPrefix = 'right';
      var step = this.fConfigs.changeMonthStep;
      calendarKey = calendarKey !== null ? calendarKey : 0;
      var currentCalendar = this.listCalendars[calendarKey];
      currentCalendar.date = new Date(currentCalendar.date.getFullYear(), currentCalendar.date.getMonth() - step);
      currentCalendar.key -= hUniqueID();
      this.updateCalendar();

      if (!this.fConfigs.isSeparately) {
        this.calendar.currentDate = currentCalendar.date;
        this.initCalendar();
      }

      this.$emit('changedMonth', currentCalendar.date);
    },

    /**
     * @return {boolean}
     */
    NextMonth: function NextMonth() {
      var calendarKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (!this.allowNextDate) return false;
      this.transitionPrefix = 'left';
      var step = this.fConfigs.changeMonthStep;
      calendarKey = calendarKey !== null ? calendarKey : 0;
      var currentCalendar = this.listCalendars[calendarKey];
      currentCalendar.date = new Date(currentCalendar.date.getFullYear(), currentCalendar.date.getMonth() + step);
      currentCalendar.key += hUniqueID();
      this.updateCalendar();

      if (!this.fConfigs.isSeparately) {
        this.calendar.currentDate = currentCalendar.date;
        this.initCalendar();
      }

      this.$emit('changedMonth', currentCalendar.date);
    },

    /**
     * @return {boolean}
     */
    PreYear: function PreYear() {
      var calendarKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (!this.allowPreDate) return false;
      var step = this.showYearPicker ? this.fConfigs.changeYearStep : 1;
      calendarKey = calendarKey !== null ? calendarKey : 0;
      var currentCalendar = this.listCalendars[calendarKey];
      currentCalendar.date = new Date(currentCalendar.date.getFullYear() - step, currentCalendar.date.getMonth());
      this.updateCalendar();

      if (!this.fConfigs.isSeparately) {
        this.calendar.currentDate = currentCalendar.date;
        this.initCalendar();
      }

      this.$emit('changedYear', currentCalendar.date);
    },

    /**
     * @return {boolean}
     */
    NextYear: function NextYear() {
      var calendarKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (!this.allowNextDate) return false;
      var step = this.showYearPicker ? this.fConfigs.changeYearStep : 1;
      calendarKey = calendarKey !== null ? calendarKey : 0;
      var currentCalendar = this.listCalendars[calendarKey];
      currentCalendar.date = new Date(currentCalendar.date.getFullYear() + step, currentCalendar.date.getMonth());
      this.updateCalendar();

      if (!this.fConfigs.isSeparately) {
        this.calendar.currentDate = currentCalendar.date;
        this.initCalendar();
      }

      this.$emit('changedYear', currentCalendar.date);
    },
    ChooseDate: function ChooseDate(date) {
      var newDate = this.helpCalendar.getDateFromFormat(date);

      if (date === 'today') {
        newDate = new Date();
      }

      this.listCalendars[0].date = this.calendar.currentDate = newDate;
      this.updateCalendar();
      this.initCalendar();
    },
    openMonthPicker: function openMonthPicker(key) {
      if (this.fConfigs.changeMonthFunction) {
        this.showMonthPicker = key === this.showMonthPicker ? false : key;
        this.showYearPicker = false;
      }
    },
    openYearPicker: function openYearPicker(key) {
      if (this.fConfigs.changeYearFunction) {
        this.showYearPicker = key === this.showYearPicker ? false : key;
        this.showMonthPicker = false;
      }
    },
    openTimePicker: function openTimePicker() {
      this.showTimePicker = true;
    },
    pickMonth: function pickMonth(key, calendarKey) {
      this.showMonthPicker = false;

      if (!this.isSeparately) {
        this.listCalendars.forEach(function (currentCalendar, index) {
          var date = currentCalendar.date;
          currentCalendar.date = new Date(date.getFullYear(), key + 1 + index, 0);
          currentCalendar.key += hUniqueID();
        });
      } else {
        var _currentCalendar = this.listCalendars[calendarKey];
        var date = _currentCalendar.date;
        _currentCalendar.date = new Date(date.getFullYear(), key + 1, 0);
        _currentCalendar.key += hUniqueID();
      }

      var currentCalendar = this.listCalendars[calendarKey];
      this.$emit('changedMonth', currentCalendar.date);
      this.updateCalendar();
    },
    pickYear: function pickYear(year, calendarKey) {
      this.showYearPicker = false;

      if (!this.isSeparately) {
        this.listCalendars.forEach(function (currentCalendar) {
          var date = currentCalendar.date;
          currentCalendar.date = new Date(year, date.getMonth() + 1, 0);
          currentCalendar.key += hUniqueID();
        });
      } else {
        var currentCalendar = this.listCalendars[calendarKey];
        var date = currentCalendar.date;
        currentCalendar.date = new Date(year, date.getMonth() + 1, 0);
        currentCalendar.key += hUniqueID();
      }

      this.updateCalendar();
    },
    getYearList: function getYearList(date, delta) {
      var years = [];
      var year = date.getFullYear() - 4 + delta;

      for (var i = 0; i < 12; i++) {
        var finalYear = year + i;
        years.push({
          year: finalYear
        });
      }

      return years;
    },

    /**
     * Add date to selectedDates list
     * @param index
     */
    addToSelectedDates: function addToSelectedDates() {
      if (this.helpCalendar.checkValidDate(this.calendar.selectedDatesItem)) {
        var date = Object.assign({}, this.defaultDateFormat);
        date.date = this.calendar.selectedDatesItem;
        this.calendar.selectedDates.push(date);
        this.calendar.selectedDatesItem = '';
        this.markChooseDays();
      }
    },

    /**
     * Remove date from selectedDates list
     * @param index
     */
    removeFromSelectedDates: function removeFromSelectedDates(index) {
      this.calendar.selectedDates.splice(index, 1);
      this.markChooseDays();
    },
    checkDateRangeEnd: function checkDateRangeEnd(date) {
      if (Array.isArray(this.fConfigs.markedDateRange)) {
        return this.fConfigs.markedDateRange.findIndex(function (range) {
          return range.end === date;
        }) !== -1;
      }

      return date === this.fConfigs.markedDateRange.end;
    },
    checkSelDates: function checkSelDates(type, startDate, itemDate, hoverDate) {
      var startTime = this.helpCalendar.getDateFromFormat(startDate).getTime();
      var itemTime = this.helpCalendar.getDateFromFormat(itemDate).getTime();
      var hoverTime = this.helpCalendar.getDateFromFormat(hoverDate).getTime();
      var days = type === 'min' ? this.fConfigs.minSelDays : this.fConfigs.maxSelDays - 2;
      var minTime = days * 1000 * 60 * 60 * 24;
      var rightTime = startTime + minTime;
      var leftTime = startTime - minTime;
      var result;

      if (hoverTime > startTime) {
        if (type === 'min') result = itemTime < rightTime && itemTime > startTime && this.fConfigs.minSelDays;else result = itemTime > rightTime && itemTime > startTime && this.fConfigs.maxSelDays;
      } else if (hoverTime < startTime) {
        if (type === 'min') result = itemTime > leftTime && itemTime < startTime && this.fConfigs.minSelDays;else result = itemTime < leftTime && itemTime < startTime && this.fConfigs.maxSelDays;
      }

      return result;
    },
    checkLimits: function checkLimits(value) {
      if (this.fConfigs.limits) {
        var min = new Date(this.helpCalendar.getDateFromFormat(this.fConfigs.limits.min));
        min.setDate(1);
        min.setHours(0, 0, 0, 0);
        var max = new Date(this.helpCalendar.getDateFromFormat(this.fConfigs.limits.max));
        max.setDate(1);
        max.setHours(0, 0, 0, 0);
        this.allowPreDate = true;
        this.allowNextDate = true;
        var current = new Date(value);
        current.setDate(1);
        current.setHours(0, 0, 0, 0);

        if (current <= min) {
          this.allowPreDate = false;
        }

        if (current >= max) {
          this.allowNextDate = false;
        }
      }
    },
    getTransition_: function getTransition_() {
      if (!this.fConfigs.transition) return '';
      var name = '';

      if (this.transitionPrefix === 'left') {
        name = 'vfc-calendar-slide-left';
      } else if (this.transitionPrefix === 'right') {
        name = 'vfc-calendar-slide-right';
      }

      return name;
    },
    checkHiddenElement: function checkHiddenElement(elementName) {
      return !this.fConfigs.hiddenElements.includes(elementName);
    },
    onFocusIn: function onFocusIn() {
      if (this.fConfigs.isModal) {
        this.showCalendar = true;
      }
    },
    onFocusOut: function onFocusOut(e) {
      if (this.fConfigs.isModal && !hElContains(this.popoverElement, e.relatedTarget)) {
        return this.showCalendar = this.showMonthPicker = this.showYearPicker = false;
      }
    },
    hideMonthYearPicker: function hideMonthYearPicker(e) {
      var _this5 = this;

      this.$nextTick(function () {
        if (_this5.showMonthPicker || _this5.showYearPicker) {
          var key = _this5.showMonthPicker ? _this5.showMonthPicker - 1 : _this5.showYearPicker - 1;

          var MYactive = _this5.$refs.calendars.querySelectorAll(".vfc-content-MY-picker")[key];

          if (MYactive.contains(e.target)) {
            return;
          }

          return _this5.showMonthPicker = _this5.showYearPicker = false;
        }
      });
    },
    checkDateRangeStart: function checkDateRangeStart(date) {
      if (Array.isArray(this.fConfigs.markedDateRange)) {
        return this.fConfigs.markedDateRange.findIndex(function (range) {
          return range.start === date;
        }) !== -1;
      }

      return date === this.fConfigs.markedDateRange.start;
    },
    cleanRange: function cleanRange() {
      if (!this.isMultipleDateRange) {
        this.calendar.dateRange.end = '';
        this.calendar.dateRange.start = '';
        return;
      }

      this.calendar.multipleDateRange = []; // this.calendar.multipleDateRange.push({
      //   start: '',
      //   end: ''
      // })
    }
  }
});
// CONCATENATED MODULE: ./src/components/FunctionalCalendar.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FunctionalCalendarvue_type_script_lang_js_ = (FunctionalCalendarvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/FunctionalCalendar.vue?vue&type=style&index=0&lang=scss&
var FunctionalCalendarvue_type_style_index_0_lang_scss_ = __webpack_require__("02c4");

// CONCATENATED MODULE: ./src/components/FunctionalCalendar.vue






/* normalize component */

var FunctionalCalendar_component = normalizeComponent(
  components_FunctionalCalendarvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FunctionalCalendar = (FunctionalCalendar_component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (FunctionalCalendar);



/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=FunctionalCalendar.umd.js.map