/**
 * core-js 2.4.1
 * https://github.com/zloirock/core-js
 * License: http://rock.mit-license.org
 * © 2016 Denis Pushkarev
 */
!function(__e, __g, undefined){
'use strict';
/******/ (function(modules) { // webpackBootstrap
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

	__webpack_require__(1);
	__webpack_require__(50);
	__webpack_require__(53);
	__webpack_require__(54);
	module.exports = __webpack_require__(61);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(2)
	  , has            = __webpack_require__(3)
	  , DESCRIPTORS    = __webpack_require__(4)
	  , $export        = __webpack_require__(6)
	  , redefine       = __webpack_require__(16)
	  , META           = __webpack_require__(20).KEY
	  , $fails         = __webpack_require__(5)
	  , shared         = __webpack_require__(21)
	  , setToStringTag = __webpack_require__(22)
	  , uid            = __webpack_require__(17)
	  , wks            = __webpack_require__(23)
	  , wksExt         = __webpack_require__(24)
	  , wksDefine      = __webpack_require__(25)
	  , keyOf          = __webpack_require__(27)
	  , enumKeys       = __webpack_require__(40)
	  , isArray        = __webpack_require__(43)
	  , anObject       = __webpack_require__(10)
	  , toIObject      = __webpack_require__(30)
	  , toPrimitive    = __webpack_require__(14)
	  , createDesc     = __webpack_require__(15)
	  , _create        = __webpack_require__(44)
	  , gOPNExt        = __webpack_require__(47)
	  , $GOPD          = __webpack_require__(49)
	  , $DP            = __webpack_require__(9)
	  , $keys          = __webpack_require__(28)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(48).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(42).f  = $propertyIsEnumerable;
	  __webpack_require__(41).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(26)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
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
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(8)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 2 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 3 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(5)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(2)
	  , core      = __webpack_require__(7)
	  , hide      = __webpack_require__(8)
	  , redefine  = __webpack_require__(16)
	  , ctx       = __webpack_require__(18)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target)redefine(target, key, out, type & $export.U);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
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

/***/ },
/* 7 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(9)
	  , createDesc = __webpack_require__(15);
	module.exports = __webpack_require__(4) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(10)
	  , IE8_DOM_DEFINE = __webpack_require__(12)
	  , toPrimitive    = __webpack_require__(14)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(4) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(4) && !__webpack_require__(5)(function(){
	  return Object.defineProperty(__webpack_require__(13)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11)
	  , document = __webpack_require__(2).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(11);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(2)
	  , hide      = __webpack_require__(8)
	  , has       = __webpack_require__(3)
	  , SRC       = __webpack_require__(17)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);

	__webpack_require__(7).inspectSource = function(it){
	  return $toString.call(it);
	};

	(module.exports = function(O, key, val, safe){
	  var isFunction = typeof val == 'function';
	  if(isFunction)has(val, 'name') || hide(val, 'name', key);
	  if(O[key] === val)return;
	  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe){
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if(O[key])O[key] = val;
	      else hide(O, key, val);
	    }
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 17 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(19);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(17)('meta')
	  , isObject = __webpack_require__(11)
	  , has      = __webpack_require__(3)
	  , setDesc  = __webpack_require__(9).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(5)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(9).f
	  , has = __webpack_require__(3)
	  , TAG = __webpack_require__(23)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(21)('wks')
	  , uid        = __webpack_require__(17)
	  , Symbol     = __webpack_require__(2).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(23);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(2)
	  , core           = __webpack_require__(7)
	  , LIBRARY        = __webpack_require__(26)
	  , wksExt         = __webpack_require__(24)
	  , defineProperty = __webpack_require__(9).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(28)
	  , toIObject = __webpack_require__(30);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(29)
	  , enumBugKeys = __webpack_require__(39);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(3)
	  , toIObject    = __webpack_require__(30)
	  , arrayIndexOf = __webpack_require__(34)(false)
	  , IE_PROTO     = __webpack_require__(38)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(31)
	  , defined = __webpack_require__(33);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(32);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(30)
	  , toLength  = __webpack_require__(35)
	  , toIndex   = __webpack_require__(37);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(36)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(36)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(21)('keys')
	  , uid    = __webpack_require__(17);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(28)
	  , gOPS    = __webpack_require__(41)
	  , pIE     = __webpack_require__(42);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 42 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(32);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(10)
	  , dPs         = __webpack_require__(45)
	  , enumBugKeys = __webpack_require__(39)
	  , IE_PROTO    = __webpack_require__(38)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(13)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(46).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(9)
	  , anObject = __webpack_require__(10)
	  , getKeys  = __webpack_require__(28);

	module.exports = __webpack_require__(4) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2).document && document.documentElement;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(30)
	  , gOPN      = __webpack_require__(48).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(29)
	  , hiddenKeys = __webpack_require__(39).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(42)
	  , createDesc     = __webpack_require__(15)
	  , toIObject      = __webpack_require__(30)
	  , toPrimitive    = __webpack_require__(14)
	  , has            = __webpack_require__(3)
	  , IE8_DOM_DEFINE = __webpack_require__(12)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(4) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(6);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(51)});

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(28)
	  , gOPS     = __webpack_require__(41)
	  , pIE      = __webpack_require__(42)
	  , toObject = __webpack_require__(52)
	  , IObject  = __webpack_require__(31)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(5)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(33);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	var $export = __webpack_require__(6);

	$export($export.S, 'Array', {isArray: __webpack_require__(43)});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(55)
	  , step             = __webpack_require__(56)
	  , Iterators        = __webpack_require__(57)
	  , toIObject        = __webpack_require__(30);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(58)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(23)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(8)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(26)
	  , $export        = __webpack_require__(6)
	  , redefine       = __webpack_require__(16)
	  , hide           = __webpack_require__(8)
	  , has            = __webpack_require__(3)
	  , Iterators      = __webpack_require__(57)
	  , $iterCreate    = __webpack_require__(59)
	  , setToStringTag = __webpack_require__(22)
	  , getPrototypeOf = __webpack_require__(60)
	  , ITERATOR       = __webpack_require__(23)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(44)
	  , descriptor     = __webpack_require__(15)
	  , setToStringTag = __webpack_require__(22)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(8)(IteratorPrototype, __webpack_require__(23)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(3)
	  , toObject    = __webpack_require__(52)
	  , IE_PROTO    = __webpack_require__(38)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(6)
	  , $values = __webpack_require__(62)(false);

	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(28)
	  , toIObject = __webpack_require__(30)
	  , isEnum    = __webpack_require__(42).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ }
/******/ ]);
// CommonJS export
if(typeof module != 'undefined' && module.exports)module.exports = __e;
// RequireJS export
else if(typeof define == 'function' && define.amd)define(function(){return __e});
// Export to global object
else __g.core = __e;
}(1, 1);/** 
 * jsPDF AutoTable plugin v2.0.29
 * Copyright (c) 2014 Simon Bengtsson, https://github.com/simonbengtsson/jsPDF-AutoTable 
 * 
 * Licensed under the MIT License. 
 * http://opensource.org/licenses/mit-license 
 * 
 * @preserve 
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jspdf')) :
  typeof define === 'function' && define.amd ? define(['jspdf'], factory) :
  (factory(global.jsPDF));
}(this, function (jsPDF) { 'use strict';

  jsPDF = 'default' in jsPDF ? jsPDF['default'] : jsPDF;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Table = function Table() {
      classCallCheck(this, Table);

      this.height = 0;
      this.width = 0;
      this.contentWidth = 0;
      this.rows = [];
      this.columns = [];
      this.headerRow = null;
      this.settings = {};
      this.pageCount = 1;
  };

  var Row = function Row(raw) {
      classCallCheck(this, Row);

      this.raw = raw || {};
      this.index = 0;
      this.styles = {};
      this.cells = {};
      this.height = 0;
      this.y = 0;
  };

  var Cell = function Cell(raw) {
      classCallCheck(this, Cell);

      this.raw = raw;
      this.styles = {};
      this.text = '';
      this.contentWidth = 0;
      this.textPos = {};
      this.height = 0;
      this.width = 0;
      this.x = 0;
      this.y = 0;
  };

  var Column = function Column(dataKey) {
      classCallCheck(this, Column);

      this.dataKey = dataKey;
      this.options = {};
      this.styles = {};
      this.contentWidth = 0;
      this.width = 0;
      this.x = 0;
  };

  /**
   * Ratio between font size and font height. The number comes from jspdf's source code
   */
  var FONT_ROW_RATIO = 1.15;

  /**
   * Styles for the themes (overriding the default styles)
   */
  var themes = {
      'striped': {
          table: { fillColor: 255, textColor: 80, fontStyle: 'normal', fillStyle: 'F' },
          header: { textColor: 255, fillColor: [41, 128, 185], rowHeight: 23, fontStyle: 'bold' },
          body: {},
          alternateRow: { fillColor: 245 }
      },
      'grid': {
          table: { fillColor: 255, textColor: 80, fontStyle: 'normal', lineWidth: 0.1, fillStyle: 'DF' },
          header: { textColor: 255, fillColor: [26, 188, 156], rowHeight: 23, fillStyle: 'F', fontStyle: 'bold' },
          body: {},
          alternateRow: {}
      },
      'plain': {
          header: { fontStyle: 'bold' }
      }
  };

  function getDefaults() {
      return {
          // Styling
          theme: 'striped', // 'striped', 'grid' or 'plain'
          styles: {},
          headerStyles: {},
          bodyStyles: {},
          alternateRowStyles: {},
          columnStyles: {},

          // Properties
          startY: false, // false indicates the margin.top value
          margin: 40,
          pageBreak: 'auto', // 'auto', 'avoid', 'always'
          tableWidth: 'auto', // number, 'auto', 'wrap'

          // Hooks
          createdHeaderCell: function createdHeaderCell(cell, data) {},
          createdCell: function createdCell(cell, data) {},
          drawHeaderRow: function drawHeaderRow(row, data) {},
          drawRow: function drawRow(row, data) {},
          drawHeaderCell: function drawHeaderCell(cell, data) {},
          drawCell: function drawCell(cell, data) {},
          beforePageContent: function beforePageContent(data) {},
          afterPageContent: function afterPageContent(data) {}
      };
  }

  // Base style for all themes
  function defaultStyles() {
      return {
          cellPadding: 5,
          fontSize: 10,
          font: "helvetica", // helvetica, times, courier
          lineColor: 200,
          lineWidth: 0.1,
          fontStyle: 'normal', // normal, bold, italic, bolditalic
          overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
          fillColor: 255,
          textColor: 20,
          halign: 'left', // left, center, right
          valign: 'top', // top, middle, bottom
          fillStyle: 'F', // 'S', 'F' or 'DF' (stroke, fill or fill then stroke)
          rowHeight: 20,
          columnWidth: 'auto'
      };
  }

  var Config = function () {
      function Config() {
          classCallCheck(this, Config);
      }

      createClass(Config, null, [{
          key: 'initSettings',
          value: function initSettings(userOptions) {
              var settings = Object.assign({}, getDefaults(), userOptions);

              // Options
              if (typeof settings.extendWidth !== 'undefined') {
                  settings.tableWidth = settings.extendWidth ? 'auto' : 'wrap';
                  console.error("Use of deprecated option: extendWidth, use tableWidth instead.");
              }
              if (typeof settings.margins !== 'undefined') {
                  if (typeof settings.margin === 'undefined') settings.margin = settings.margins;
                  console.error("Use of deprecated option: margins, use margin instead.");
              }

              [['padding', 'cellPadding'], ['lineHeight', 'rowHeight'], 'fontSize', 'overflow'].forEach(function (o) {
                  var deprecatedOption = typeof o === 'string' ? o : o[0];
                  var style = typeof o === 'string' ? o : o[1];
                  if (typeof settings[deprecatedOption] !== 'undefined') {
                      if (typeof settings.styles[style] === 'undefined') {
                          settings.styles[style] = settings[deprecatedOption];
                      }
                      console.error("Use of deprecated option: " + deprecatedOption + ", use the style " + style + " instead.");
                  }
              });

              // Unifying
              var marginSetting = settings.margin;
              settings.margin = {};
              if (typeof marginSetting.horizontal === 'number') {
                  marginSetting.right = marginSetting.horizontal;
                  marginSetting.left = marginSetting.horizontal;
              }
              if (typeof marginSetting.vertical === 'number') {
                  marginSetting.top = marginSetting.vertical;
                  marginSetting.bottom = marginSetting.vertical;
              }
              ['top', 'right', 'bottom', 'left'].forEach(function (side, i) {
                  if (typeof marginSetting === 'number') {
                      settings.margin[side] = marginSetting;
                  } else {
                      var key = Array.isArray(marginSetting) ? i : side;
                      settings.margin[side] = typeof marginSetting[key] === 'number' ? marginSetting[key] : 40;
                  }
              });

              return settings;
          }
      }, {
          key: 'styles',
          value: function styles(_styles) {
              _styles.unshift(defaultStyles());
              _styles.unshift({});
              return Object.assign.apply(this, _styles);
          }
      }]);
      return Config;
  }();

  var doc;
  var cursor;
  var styleModifiers;
  var pageSize;
  var settings;
  var table;
  // The current Table instance

  /**
   * Create a table from a set of rows and columns.
   *
   * @param {Object[]|String[]} headers Either as an array of objects or array of strings
   * @param {Object[][]|String[][]} data Either as an array of objects or array of strings
   * @param {Object} [options={}] Options that will override the default ones
   */
  jsPDF.API.autoTable = function (headers, data, options) {
      validateInput(headers, data, options);
      doc = this;

      pageSize = doc.internal.pageSize;
      styleModifiers = {
          fillColor: doc.setFillColor,
          textColor: doc.setTextColor,
          fontStyle: doc.setFontStyle,
          lineColor: doc.setDrawColor,
          lineWidth: doc.setLineWidth,
          font: doc.setFont,
          fontSize: doc.setFontSize
      };

      settings = Config.initSettings(options || {});

      // Need a cursor y as it needs to be reset after each page (row.y can't do that)
      // Also prefer cursor to column.x as the cursor is easier to modify in the hooks
      cursor = {
          x: settings.margin.left,
          y: settings.startY === false ? settings.margin.top : settings.startY
      };

      var userStyles = {
          textColor: 30, // Setting text color to dark gray as it can't be obtained from jsPDF
          fontSize: doc.internal.getFontSize(),
          fontStyle: doc.internal.getFont().fontStyle
      };

      // Create the table model with its columns, rows and cells
      createModels(headers, data);
      calculateWidths(this, pageSize.width);

      // Page break if there is room for only the first data row
      var firstRowHeight = table.rows[0] && settings.pageBreak === 'auto' ? table.rows[0].height : 0;
      var minTableBottomPos = settings.startY + settings.margin.bottom + table.headerRow.height + firstRowHeight;
      if (settings.pageBreak === 'avoid') {
          minTableBottomPos += table.height;
      }
      if (settings.pageBreak === 'always' && settings.startY !== false || settings.startY !== false && minTableBottomPos > pageSize.height) {
          this.addPage(this.addPage);
          cursor.y = settings.margin.top;
      }

      applyStyles(userStyles);
      settings.beforePageContent(hooksData());
      if (settings.drawHeaderRow(table.headerRow, hooksData({ row: table.headerRow })) !== false) {
          printRow(table.headerRow, settings.drawHeaderCell);
      }
      applyStyles(userStyles);
      printRows(this.addPage);
      settings.afterPageContent(hooksData());

      applyStyles(userStyles);

      return this;
  };

  /**
   * Returns the Y position of the last drawn cell
   * @returns int
   */
  jsPDF.API.autoTableEndPosY = function () {
      if (typeof cursor === 'undefined' || typeof cursor.y === 'undefined') {
          return 0;
      }
      return cursor.y;
  };

  /**
   * Parses an html table
   *
   * @param tableElem Html table element
   * @param includeHiddenElements If to include hidden rows and columns (defaults to false)
   * @returns Object Object with two properties, columns and rows
   */
  jsPDF.API.autoTableHtmlToJson = function (tableElem, includeHiddenElements) {
      includeHiddenElements = includeHiddenElements || false;

      var columns = {},
          rows = [];

      var header = tableElem.rows[0];

      for (var k = 0; k < header.cells.length; k++) {
          var cell = header.cells[k];
          var style = window.getComputedStyle(cell);
          if (includeHiddenElements || style.display !== 'none') {
              columns[k] = cell ? cell.textContent.trim() : '';
          }
      }

      for (var i = 1; i < tableElem.rows.length; i++) {
          var tableRow = tableElem.rows[i];
          var style = window.getComputedStyle(tableRow);
          if (includeHiddenElements || style.display !== 'none') {
              var rowData = [];
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                  for (var _iterator = Object.keys(columns)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var j = _step.value;

                      var cell = tableRow.cells[j];
                      var val = cell ? cell.textContent.trim() : '';
                      rowData.push(val);
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

              rows.push(rowData);
          }
      }

      return { columns: Object.values(columns), rows: rows, data: rows }; // data prop deprecated
  };

  /**
   * Add a new page including an autotable header etc. Use this function in the hooks.
   *
   * @param tableElem Html table element
   * @param includeHiddenElements If to include hidden rows and columns (defaults to false)
   * @returns Object Object with two properties, columns and rows
   */
  jsPDF.API.autoTableAddPage = function () {
      addPage(doc.addPage);
  };

  /**
   * Improved text function with halign and valign support
   * Inspiration from: http://stackoverflow.com/questions/28327510/align-text-right-using-jspdf/28433113#28433113
   */
  jsPDF.API.autoTableText = function (text, x, y, styles) {
      if (typeof x !== 'number' || typeof y !== 'number') {
          console.error('The x and y parameters are required. Missing for the text: ', text);
      }
      var fontSize = this.internal.getFontSize() / this.internal.scaleFactor;

      // As defined in jsPDF source code
      var lineHeightProportion = FONT_ROW_RATIO;

      var splitRegex = /\r\n|\r|\n/g;
      var splittedText = null;
      var lineCount = 1;
      if (styles.valign === 'middle' || styles.valign === 'bottom' || styles.halign === 'center' || styles.halign === 'right') {
          splittedText = typeof text === 'string' ? text.split(splitRegex) : text;

          lineCount = splittedText.length || 1;
      }

      // Align the top
      y += fontSize * (2 - lineHeightProportion);

      if (styles.valign === 'middle') y -= lineCount / 2 * fontSize;else if (styles.valign === 'bottom') y -= lineCount * fontSize;

      if (styles.halign === 'center' || styles.halign === 'right') {
          var alignSize = fontSize;
          if (styles.halign === 'center') alignSize *= 0.5;

          if (lineCount >= 1) {
              for (var iLine = 0; iLine < splittedText.length; iLine++) {
                  this.text(splittedText[iLine], x - this.getStringUnitWidth(splittedText[iLine]) * alignSize, y);
                  y += fontSize;
              }
              return doc;
          }
          x -= this.getStringUnitWidth(text) * alignSize;
      }

      this.text(text, x, y);

      return this;
  };

  function validateInput(headers, data, options) {
      if (!headers || (typeof headers === 'undefined' ? 'undefined' : _typeof(headers)) !== 'object') {
          console.error("The headers should be an object or array, is: " + (typeof headers === 'undefined' ? 'undefined' : _typeof(headers)));
      }

      if (!data || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
          console.error("The data should be an object or array, is: " + (typeof data === 'undefined' ? 'undefined' : _typeof(data)));
      }

      if (!!options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
          console.error("The data should be an object or array, is: " + (typeof data === 'undefined' ? 'undefined' : _typeof(data)));
      }

      if (!Array.prototype.forEach) {
          console.error("The current browser does not support Array.prototype.forEach which is required for " + "jsPDF-AutoTable. You can try polyfilling it by including this script " + "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Polyfill");
      }
  }

  /**
   * Create models from the user input
   *
   * @param inputHeaders
   * @param inputData
   */
  function createModels(inputHeaders, inputData) {
      table = new Table();

      var splitRegex = /\r\n|\r|\n/g;

      // Header row and columns
      var headerRow = new Row(inputHeaders);
      headerRow.index = -1;

      var themeStyles = Config.styles([themes[settings.theme].table, themes[settings.theme].header]);
      headerRow.styles = Object.assign({}, themeStyles, settings.styles, settings.headerStyles);

      // Columns and header row
      inputHeaders.forEach(function (rawColumn, dataKey) {
          if ((typeof rawColumn === 'undefined' ? 'undefined' : _typeof(rawColumn)) === 'object') {
              dataKey = typeof rawColumn.dataKey !== 'undefined' ? rawColumn.dataKey : rawColumn.key;
          }

          if (typeof rawColumn.width !== 'undefined') {
              console.error("Use of deprecated option: column.width, use column.styles.columnWidth instead.");
          }

          var col = new Column(dataKey);
          col.styles = settings.columnStyles[col.dataKey] || {};
          table.columns.push(col);

          var cell = new Cell();
          cell.raw = (typeof rawColumn === 'undefined' ? 'undefined' : _typeof(rawColumn)) === 'object' ? rawColumn.title : rawColumn;
          cell.styles = Object.assign({}, headerRow.styles);
          cell.text = '' + cell.raw;
          cell.contentWidth = cell.styles.cellPadding * 2 + getStringWidth(cell.text, cell.styles);
          cell.text = cell.text.split(splitRegex);

          headerRow.cells[dataKey] = cell;
          settings.createdHeaderCell(cell, { column: col, row: headerRow, settings: settings });
      });
      table.headerRow = headerRow;

      // Rows och cells
      inputData.forEach(function (rawRow, i) {
          var row = new Row(rawRow);
          var isAlternate = i % 2 === 0;
          var themeStyles = Config.styles([themes[settings.theme].table, isAlternate ? themes[settings.theme].alternateRow : {}]);
          var userStyles = Object.assign({}, settings.styles, settings.bodyStyles, isAlternate ? settings.alternateRowStyles : {});
          row.styles = Object.assign({}, themeStyles, userStyles);
          row.index = i;
          table.columns.forEach(function (column) {
              var cell = new Cell();
              cell.raw = rawRow[column.dataKey];
              cell.styles = Object.assign({}, row.styles, column.styles);
              cell.text = typeof cell.raw !== 'undefined' ? '' + cell.raw : ''; // Stringify 0 and false, but not undefined
              row.cells[column.dataKey] = cell;
              settings.createdCell(cell, hooksData({ column: column, row: row }));
              cell.contentWidth = cell.styles.cellPadding * 2 + getStringWidth(cell.text, cell.styles);
              cell.text = cell.text.split(splitRegex);
          });
          table.rows.push(row);
      });
  }

  /**
   * Calculate the column widths
   */
  function calculateWidths(doc, pageWidth) {
      // Column and table content width
      var tableContentWidth = 0;
      table.columns.forEach(function (column) {
          column.contentWidth = table.headerRow.cells[column.dataKey].contentWidth;
          table.rows.forEach(function (row) {
              var cellWidth = row.cells[column.dataKey].contentWidth;
              if (cellWidth > column.contentWidth) {
                  column.contentWidth = cellWidth;
              }
          });
          column.width = column.contentWidth;
          tableContentWidth += column.contentWidth;
      });
      table.contentWidth = tableContentWidth;

      var maxTableWidth = pageWidth - settings.margin.left - settings.margin.right;
      var preferredTableWidth = maxTableWidth; // settings.tableWidth === 'auto'
      if (typeof settings.tableWidth === 'number') {
          preferredTableWidth = settings.tableWidth;
      } else if (settings.tableWidth === 'wrap') {
          preferredTableWidth = table.contentWidth;
      }
      table.width = preferredTableWidth < maxTableWidth ? preferredTableWidth : maxTableWidth;

      // To avoid subjecting columns with little content with the chosen overflow method,
      // never shrink a column more than the table divided by column count (its "fair part")
      var dynamicColumns = [];
      var dynamicColumnsContentWidth = 0;
      var fairWidth = table.width / table.columns.length;
      var staticWidth = 0;
      table.columns.forEach(function (column) {
          var colStyles = Config.styles([themes[settings.theme].table, settings.styles, column.styles]);
          if (colStyles.columnWidth === 'wrap') {
              column.width = column.contentWidth;
          } else if (typeof colStyles.columnWidth === 'number') {
              column.width = colStyles.columnWidth;
          } else if (colStyles.columnWidth === 'auto' || true) {
              if (column.contentWidth <= fairWidth && table.contentWidth > table.width) {
                  column.width = column.contentWidth;
              } else {
                  dynamicColumns.push(column);
                  dynamicColumnsContentWidth += column.contentWidth;
                  column.width = 0;
              }
          }
          staticWidth += column.width;
      });

      // Distributes extra width or trims columns down to fit
      distributeWidth(dynamicColumns, staticWidth, dynamicColumnsContentWidth, fairWidth);

      // Row height, table height and text overflow
      table.height = 0;
      var all = table.rows.concat(table.headerRow);
      all.forEach(function (row, i) {
          var lineBreakCount = 0;
          table.columns.forEach(function (col) {
              var cell = row.cells[col.dataKey];
              applyStyles(cell.styles);
              var textSpace = col.width - cell.styles.cellPadding * 2;
              if (cell.styles.overflow === 'linebreak') {
                  // Add one pt to textSpace to fix rounding error
                  try {
                      cell.text = doc.splitTextToSize(cell.text, textSpace + 1, { fontSize: cell.styles.fontSize });
                  } catch (e) {
                      if (e instanceof TypeError && Array.isArray(cell.text)) {
                          cell.text = doc.splitTextToSize(cell.text.join(' '), textSpace + 1, { fontSize: cell.styles.fontSize });
                      } else {
                          throw e;
                      }
                  }
              } else if (cell.styles.overflow === 'ellipsize') {
                  cell.text = ellipsize(cell.text, textSpace, cell.styles);
              } else if (cell.styles.overflow === 'visible') {
                  // Do nothing
              } else if (cell.styles.overflow === 'hidden') {
                      cell.text = ellipsize(cell.text, textSpace, cell.styles, '');
                  } else if (typeof cell.styles.overflow === 'function') {
                      cell.text = cell.styles.overflow(cell.text, textSpace);
                  } else {
                      console.error("Unrecognized overflow type: " + cell.styles.overflow);
                  }
              var count = Array.isArray(cell.text) ? cell.text.length - 1 : 0;
              if (count > lineBreakCount) {
                  lineBreakCount = count;
              }
          });

          row.heightStyle = row.styles.rowHeight;
          // TODO Pick the highest row based on font size as well
          row.height = row.heightStyle + lineBreakCount * row.styles.fontSize * FONT_ROW_RATIO;
          table.height += row.height;
      });
  }

  function distributeWidth(dynamicColumns, staticWidth, dynamicColumnsContentWidth, fairWidth) {
      var extraWidth = table.width - staticWidth - dynamicColumnsContentWidth;
      for (var i = 0; i < dynamicColumns.length; i++) {
          var col = dynamicColumns[i];
          var ratio = col.contentWidth / dynamicColumnsContentWidth;
          // A column turned out to be none dynamic, start over recursively
          var isNoneDynamic = col.contentWidth + extraWidth * ratio < fairWidth;
          if (extraWidth < 0 && isNoneDynamic) {
              dynamicColumns.splice(i, 1);
              dynamicColumnsContentWidth -= col.contentWidth;
              col.width = fairWidth;
              staticWidth += col.width;
              distributeWidth(dynamicColumns, staticWidth, dynamicColumnsContentWidth, fairWidth);
              break;
          } else {
              col.width = col.contentWidth + extraWidth * ratio;
          }
      }
  }

  function addPage(jspdfAddPage) {
      settings.afterPageContent(hooksData());
      jspdfAddPage();
      table.pageCount++;
      cursor = { x: settings.margin.left, y: settings.margin.top };
      settings.beforePageContent(hooksData());
      if (settings.drawHeaderRow(table.headerRow, hooksData({ row: table.headerRow })) !== false) {
          printRow(table.headerRow, settings.drawHeaderCell);
      }
  }

  /**
   * Add a new page if cursor is at the end of page
   */
  function isNewPage(rowHeight) {
      var afterRowPos = cursor.y + rowHeight + settings.margin.bottom;
      return afterRowPos >= pageSize.height;
  }

  function printRows(jspdfAddPage) {
      table.rows.forEach(function (row, i) {
          if (isNewPage(row.height)) {
              var samePageThreshold = 3;
              // TODO Fix cell height > page height
              /*if (row.height > row.heightStyle * samePageThreshold) {
                  var remainingPageSpace = pageSize.height - cursor.y - settings.margin.bottom;
                  var lineCount = Math.floor(remainingPageSpace / (row.styles.fontSize * FONT_ROW_RATIO));
                  table.columns.forEach(function(col) {
                      var arr = row.cells[col.dataKey].text;
                      if (arr.length > lineCount) {
                          arr.splice(lineCount - 1, arr.length, "...");
                      }
                  });
                   row.height = remainingPageSpace;
                  if (settings.drawRow(row, hooksData({row: row})) !== false) {
                      printRow(row, settings.drawCell);
                  }
                  row = new Row(rawRow);
              }*/
              addPage(jspdfAddPage);
          }
          row.y = cursor.y;
          if (settings.drawRow(row, hooksData({ row: row })) !== false) {
              printRow(row, settings.drawCell);
          }
      });
  }

  function printRow(row, hookHandler) {
      cursor.x = settings.margin.left;
      for (var i = 0; i < table.columns.length; i++) {
          var column = table.columns[i];
          var cell = row.cells[column.dataKey];
          if (!cell) {
              continue;
          }
          applyStyles(cell.styles);

          cell.x = cursor.x;
          cell.y = cursor.y;
          cell.height = row.height;
          cell.width = column.width;

          if (cell.styles.valign === 'top') {
              cell.textPos.y = cursor.y + cell.styles.cellPadding;
          } else if (cell.styles.valign === 'bottom') {
              cell.textPos.y = cursor.y + row.height - cell.styles.cellPadding;
          } else {
              cell.textPos.y = cursor.y + row.height / 2;
          }

          if (cell.styles.halign === 'right') {
              cell.textPos.x = cell.x + cell.width - cell.styles.cellPadding;
          } else if (cell.styles.halign === 'center') {
              cell.textPos.x = cell.x + cell.width / 2;
          } else {
              cell.textPos.x = cell.x + cell.styles.cellPadding;
          }

          var data = hooksData({ column: column, row: row });
          if (hookHandler(cell, data) !== false) {
              doc.rect(cell.x, cell.y, cell.width, cell.height, cell.styles.fillStyle);
              doc.autoTableText(cell.text, cell.textPos.x, cell.textPos.y, {
                  halign: cell.styles.halign,
                  valign: cell.styles.valign
              });
          }
          cursor.x += cell.width;
      }

      cursor.y += row.height;
  }

  function applyStyles(styles) {
      Object.keys(styleModifiers).forEach(function (name) {
          var style = styles[name];
          var modifier = styleModifiers[name];
          if (typeof style !== 'undefined') {
              if (style.constructor === Array) {
                  modifier.apply(this, style);
              } else {
                  modifier(style);
              }
          }
      });
  }

  function hooksData(additionalData) {
      return Object.assign({
          pageCount: table.pageCount,
          settings: settings,
          table: table,
          cursor: cursor
      }, additionalData || {});
  }

  function getStringWidth(text, styles) {
      applyStyles(styles);
      var w = doc.getStringUnitWidth(text);
      return w * styles.fontSize;
  }

  /**
   * Ellipsize the text to fit in the width
   */
  function ellipsize(text, width, styles, ellipsizeStr) {
      ellipsizeStr = typeof ellipsizeStr !== 'undefined' ? ellipsizeStr : '...';

      if (Array.isArray(text)) {
          text.forEach(function (str, i) {
              text[i] = ellipsize(str, width, styles, ellipsizeStr);
          });
          return text;
      }

      if (width >= getStringWidth(text, styles)) {
          return text;
      }
      while (width < getStringWidth(text + ellipsizeStr, styles)) {
          if (text.length < 2) {
              break;
          }
          text = text.substring(0, text.length - 1);
      }
      return text.trim() + ellipsizeStr;
  }

}));